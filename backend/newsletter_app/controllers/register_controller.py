

from newsletter_app.models import user

from flask import request, jsonify
from newsletter_app import db

from flask import Blueprint

register_blueprint = Blueprint('register', __name__)


@register_blueprint.route('/register', methods=['POST'])
def create_user():
    data = request.json
    new_user = user.User(first_name=data['first_name'], last_name=data['last_name'], email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'New user created!'}), 201


@register_blueprint.route('/users', methods=['GET'])
def get_users():
    users = db.session.query(user.User).all()
    users_list = [u.to_dict() for u in users]  # Convert user objects to dictionaries
    return jsonify(users_list), 200
