from flask import Flask
import os
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from passlib.context import CryptContext
from newsletter_app import config
from flask_marshmallow import Marshmallow
from datetime import timedelta
from flask_jwt_extended import JWTManager



db = SQLAlchemy()  # Initialize the db object
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
ma = Marshmallow()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = config.config.SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = config.config.SQLALCHEMY_TRACK_MODIFICATIONS
    app.config['JWT_SECRET_KEY'] = config.config.JWT_SECRET_KEY
    app.config['JWT_TOKEN_LOCATION'] = config.config.JWT_TOKEN_LOCATION
    app.config['JWT_IDENTITY_CLAIM'] = config.config.JWT_IDENTITY_CLAIM
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
    app.config['JWT_BLOCKLIST_ENABLED'] = True

    db.init_app(app)
    ma.init_app(app)
    jwt.init_app(app)

    # Register blueprints
    from newsletter_app.controllers.register_controller import register_blueprint

    app.register_blueprint(register_blueprint)
    
    migrate = Migrate(app, db)

    return app
    
