

from newsletter_app.models import user, auth

from flask import request, jsonify
from newsletter_app import db, pwd_context, jwt

from flask import Blueprint

from newsletter_app.controllers.schemas.user import UserCreateSchema, UserSchema
from marshmallow import ValidationError

from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, decode_token, get_jwt
from datetime import datetime
from newsletter_app import config
from sqlalchemy.orm.exc import NoResultFound
from newsletter_app.utilities import auth_helpers

register_blueprint = Blueprint('register', __name__)


@register_blueprint.route('/register', methods=['POST'])
def create_user():
    data = request.json

    schema = UserCreateSchema()

    user_data = schema.load(data, session=db.session)
    db.session.add(user_data)
    db.session.commit()

    user_found = user.User.query.filter_by(email=data.get('email')).first()
    access_token = create_access_token(identity=user_found.id)
    refresh_token = create_refresh_token(identity=user_found.id)

    auth_helpers.add_token_to_database(access_token)

    schema = UserSchema()

    return jsonify({'access_token': access_token, 'refresh_token': refresh_token, 'user': schema.dump(user_data)}), 201


@register_blueprint.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user_found = user.User.query.filter_by(email=email).first()

    if not user_found or not pwd_context.verify(password, user_found.password):
        return jsonify({'message': 'Invalid credentials'}), 400

    access_token = create_access_token(identity=user_found.id)
    refresh_token = create_refresh_token(identity=user_found.id)

    auth_helpers.add_token_to_database(access_token)

    schema = UserSchema()

    return jsonify({'access_token': access_token, 'refresh_token': refresh_token, 'user': schema.dump(user_found)}), 200


@register_blueprint.route('/revoke_access', methods=['DELETE'])
@jwt_required()
def revoke_access_token():
    jti = get_jwt()['jti']
    user_id = get_jwt_identity()
    auth_helpers.revoke_token(jti, user_id)
    return jsonify({'message': 'Access token revoked'}), 200


@register_blueprint.route('/revoke_refresh', methods=['DELETE'])
@jwt_required(refresh=True)
def revoke_refresh_token():
    jti = get_jwt()['jti']
    user_id = get_jwt_identity()
    auth_helpers.revoke_token(jti, user_id)
    return jsonify({'message': 'Refresh token revoked'}), 200


@register_blueprint.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    user_id = get_jwt_identity()
    access_token = create_access_token(identity=user_id)
    return jsonify({'access_token': access_token}), 200


@register_blueprint.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    users = db.session.query(user.User).all()
    users_list = [u.to_dict() for u in users]  # Convert user objects to dictionaries
    return jsonify(users_list), 200
    


