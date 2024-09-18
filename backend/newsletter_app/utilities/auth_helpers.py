from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt, create_access_token, decode_token
from flask import jsonify
from newsletter_app import jwt, db, config
from newsletter_app.models import auth, user
from sqlalchemy.orm.exc import NoResultFound
from datetime import datetime


def revoke_token(token_jti, user_id):
    try:
        token = db.session.query(auth.TokenBlocklist).filter_by(jti=token_jti, user_id=user_id).one()
        token.revoked_at = datetime.now()
        db.session.commit()
    except NoResultFound as e:
        raise Exception(f'Could not find token {token_jti} in the database')

def is_token_revoked(jwt_payload):
    jti = jwt_payload['jti']
    user_id = jwt_payload[config.config.JWT_IDENTITY_CLAIM]

    try:
        token = db.session.query(auth.TokenBlocklist).filter_by(jti=jti, user_id=user_id).one()
        return token.revoked_at is not None
    except NoResultFound:
       raise Exception(f'Could not find token {jti} in the database')

@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    try:
        return is_token_revoked(jwt_payload)
    except Exception as e:
        return True

@jwt.user_lookup_loader
def load_user(_jwt_header, jwt_data):
    identity = jwt_data[config.config.JWT_IDENTITY_CLAIM]
    return user.User.query.filter_by(id=identity).first()


def add_token_to_database(access_token):
    decoded_token = decode_token(access_token)
    db_token = auth.TokenBlocklist(
        jti=decoded_token['jti'],
        token_type=decoded_token['type'],
        user_id=decoded_token[config.config.JWT_IDENTITY_CLAIM],
        expires_at=datetime.fromtimestamp(decoded_token['exp'])
    )
    db.session.add(db_token)
    db.session.commit()
