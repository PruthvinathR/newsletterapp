from flask import Flask
import os
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from passlib.context import CryptContext
from newsletter_app import config
from flask_marshmallow import Marshmallow


db = SQLAlchemy()  # Initialize the db object
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
ma = Marshmallow()

def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = config.config.SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = config.config.SQLALCHEMY_TRACK_MODIFICATIONS
    app.config['JWT_SECRET_KEY'] = config.config.JWT_SECRET_KEY
    app.config['JWT_TOKEN_LOCATION'] = config.config.JWT_TOKEN_LOCATION
    app.config['JWT_IDENTITY_CLAIM'] = config.config.JWT_IDENTITY_CLAIM

    db.init_app(app)
    ma.init_app(app)

    # Register blueprints
    from newsletter_app.controllers.register_controller import register_blueprint
    from newsletter_app.controllers.subscription_controller import subscription_blueprint
    from newsletter_app.controllers.newsletter_controller import newsletter_blueprint

    app.register_blueprint(register_blueprint)
    app.register_blueprint(subscription_blueprint)
    app.register_blueprint(newsletter_blueprint)

    migrate = Migrate(app, db)

    jwt = JWTManager(app)

    return app
    
