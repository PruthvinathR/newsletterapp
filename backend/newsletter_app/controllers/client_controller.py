from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from newsletter_app import db
from newsletter_app.models import client
from newsletter_app.controllers.schemas.client import ClientSchema

client_blueprint = Blueprint('client', __name__)

@client_blueprint.route('/clients', methods=['GET'])
@jwt_required()
def get_clients():
    current_user = get_jwt_identity()
    clients = client.Client.query.filter_by(user_id=current_user).all()
    return jsonify(clients=[client.to_dict() for client in clients]), 200


@client_blueprint.route('/add_client', methods=['POST'])
@jwt_required()
def add_client():
    data = request.json
    schema = ClientSchema()
    client_data = schema.load(data, session=db.session)
    db.session.add(client_data)
    db.session.commit()
    return jsonify({'message': 'Client added successfully', 'client': schema.dump(client_data)}), 201


@client_blueprint.route('/get_client', methods=['GET'])
@jwt_required()
def get_client():
    data = request.json
    client_id = data.get('id')
    retrieved_client = client.Client.query.filter_by(id=client_id).first()
    return jsonify(retrieved_client.to_dict()), 200


@client_blueprint.route('/update_client', methods=['PUT'])
@jwt_required()
def update_client():
    data = request.json
    client_id = data.get('id')
    retrieved_client = client.Client.query.filter_by(id=client_id).first()
    schema = ClientSchema()
    client_data = schema.load(data, session=db.session, instance=retrieved_client)
    db.session.commit()
    return jsonify({'message': 'Client updated successfully', 'client': schema.dump(client_data)}), 200


@client_blueprint.route('/delete_client', methods=['DELETE'])
@jwt_required()
def delete_client():
    data = request.json
    client_id = data.get('id')
    retrieved_client = client.Client.query.filter_by(id=client_id).first()
    db.session.delete(retrieved_client)
    db.session.commit()
    return jsonify({'message': 'Client deleted successfully'}), 200

