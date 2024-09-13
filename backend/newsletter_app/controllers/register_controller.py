

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


@register_blueprint.route('/users/subscribe', methods=['POST'])
def add_subscription():
    data = request.json
    user_id = data['user_id']
    newsletter_id = data['newsletter_id']
    user = db.session.query(user.User).filter_by(id=user_id).first()
    newsletter = db.session.query(newsletter.NewsLetter).filter_by(id=newsletter_id).first()
    user.subscriptions.append(newsletter)
    db.session.commit()
    return jsonify({'message': 'Subscription added!'}), 200

