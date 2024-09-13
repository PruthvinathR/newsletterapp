
from newsletter_app.models import user, news_letter

from flask import request, jsonify
from newsletter_app import db

from flask import Blueprint

subscription_blueprint = Blueprint('subscription', __name__)


@subscription_blueprint.route('/subscribe', methods=['POST'])
def add_subscription():
    data = request.get_json()
    user_id = data['user_id']
    newsletter_title = data['newsletter_title']
    found_user = db.session.query(user.User).filter_by(id=user_id).first()

    if found_user is None:
        return jsonify({'message': 'User not found!'}), 404

    found_newsletter = db.session.query(news_letter.NewsLetter).filter_by(title=newsletter_title).first()
    print(f'found_newsletter: {found_newsletter}')
    if found_newsletter:
        found_user.subscriptions.append(found_newsletter)
    else:
        found_user.subscriptions.append(news_letter.NewsLetter(title=newsletter_title))

    db.session.commit()
    return jsonify({'message': 'Subscription added!'}), 200


@subscription_blueprint.route('/unsubscribe', methods=['POST'])
def remove_subscription():
    data = request.get_json()
    user_id = data['user_id']
    newsletter_id = data['newsletter_id']
    found_user = db.session.query(user.User).filter_by(id=user_id).first()
    found_newsletter = db.session.query(news_letter.NewsLetter).filter_by(id=newsletter_id).first()
    found_user.subscriptions.remove(found_newsletter)
    db.session.commit()
    return jsonify({'message': 'Subscription removed!'}), 200
