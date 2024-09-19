from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from newsletter_app import db
from newsletter_app.models.category import Category
from newsletter_app.models.client import Client
from newsletter_app.controllers.schemas.category import CategorySchema

category_bp = Blueprint('category', __name__)

category_schema = CategorySchema()

@category_bp.route('/create_category', methods=['POST'])
@jwt_required()
def create_category():
    current_user_id = get_jwt_identity()
    data = request.get_json()

    # Validate and deserialize input
    errors = category_schema.validate(data, session=db.session)
    if errors:
        return jsonify({"errors": errors}), 400

    # Check if the client belongs to the current user
    client = Client.query.filter_by(user_id=current_user_id).first()
    if not client:
        return jsonify({"error": "Client not found or does not belong to the current user"}), 404

    # Create new category
    new_category = Category(
        name=data['name'],
        description=data['description']
    )
    new_category.client_id = client.id

    db.session.add(new_category)
    db.session.commit()

    return jsonify(category_schema.dump(new_category)), 201


@category_bp.route('/get_categories', methods=['GET'])
@jwt_required()
def get_categories():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    client_id = data.get('client_id')

    if not client_id:
        return jsonify({"error": "client_id is required"}), 400

    # Check if the client belongs to the current user
    client = Client.query.filter_by(id=client_id, user_id=current_user_id).first()
    if not client:
        return jsonify({"error": "Client not found or does not belong to the current user"}), 404

    categories = Category.query.filter_by(client_id=client_id).all()
    return jsonify(category_schema.dump(categories, many=True)), 200


@category_bp.route('/get_category', methods=['GET'])
@jwt_required()
def get_category():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    category_id = data.get('id')

    if not category_id:
        return jsonify({"error": "category_id is required"}), 400

    category = Category.query.join(Client).filter(
        Category.id == category_id,
        Client.user_id == current_user_id
    ).first()

    if not category:
        return jsonify({"error": "Category not found or does not belong to the current user"}), 404

    return jsonify(category_schema.dump(category)), 200

@category_bp.route('/update_category', methods=['PUT'])
@jwt_required()
def update_category():
    current_user_id = get_jwt_identity()
    data = request.get_json()

    category = Category.query.join(Client).filter(
        Category.id == data['id'],
        Client.user_id == current_user_id
    ).first()

    if not category:
        return jsonify({"error": "Category not found or does not belong to the current user"}), 404

    # Validate and deserialize input
    errors = category_schema.validate(data, partial=True, session=db.session)
    if errors:
        return jsonify({"errors": errors}), 400

    # Update category
    if 'name' in data:
        category.name = data['name']
    if 'description' in data:
        category.description = data['description']

    db.session.commit()

    return jsonify(category_schema.dump(category)), 200

@category_bp.route('/delete_category', methods=['DELETE'])
@jwt_required()
def delete_category():
    current_user_id = get_jwt_identity()
    data = request.get_json()

    category = Category.query.join(Client).filter(
        Category.id == data['category_id'],
        Client.user_id == current_user_id
    ).first()

    if not category:
        return jsonify({"error": "Category not found or does not belong to the current user"}), 404

    db.session.delete(category)
    db.session.commit()

    return jsonify({"message": "Category deleted successfully"}), 200
