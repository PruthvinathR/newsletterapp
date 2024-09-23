from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from newsletter_app import db
from newsletter_app.utilities.chat_helpers import reply_to_message


chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/chat_with_bot', methods=['POST'])
def chat_with_bot():
    data = request.get_json()
    user_message = data.get('query')

    chat_history = data.get('chat_history', [])

    bot_response = reply_to_message(user_message, chat_history)

    return jsonify({"response": bot_response})
