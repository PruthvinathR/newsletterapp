from newsletter_app.models import news_letter
from flask import request, jsonify
from newsletter_app import db
from flask import Blueprint
from newsletter_app.utilities import read_emails, summarize_emails, send_email


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


@newsletter_blueprint.route('/summarize-newsletters', methods=['GET'])
def summarize_newsletters():
    # data = request.get_json()
    emails = read_emails.read_emails()
    email_summaries = []

    for email in emails:
        response_summary = summarize_emails.summarize(email)
        email_summaries.append({"subject": email["subject"], "summary": response_summary.content})

    send_email.send_email(email_summaries)

    return jsonify(email_summaries), 200

