from newsletter_app.models import news_letter
from flask import request, jsonify
from newsletter_app import db
from flask import Blueprint


newsletter_blueprint = Blueprint('newsletter', __name__)


@newsletter_blueprint.route('/add-newsletter', methods=['POST'])
def create_newsletter():
    data = request.get_json()
    new_newsletter = news_letter.NewsLetter(title=data['title'])
    db.session.add(new_newsletter)
    db.session.commit()
    return jsonify({'message': 'New newsletter created!'}), 201


@newsletter_blueprint.route('/newsletters', methods=['GET'])
def get_newsletters():
    newsletters = db.session.query(news_letter.NewsLetter).all()
    newsletters_list = [n.to_dict() for n in newsletters]
    return jsonify(newsletters_list), 200

