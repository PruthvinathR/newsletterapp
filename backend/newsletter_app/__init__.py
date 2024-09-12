from flask import Flask

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


db = SQLAlchemy()  # Initialize the db object

def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///newsletter.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    with app.app_context():  # Ensure the app context is available
        db.create_all()  # Create all tables

    # Register blueprints
    from newsletter_app.controllers.register_controller import register_blueprint

    app.register_blueprint(register_blueprint)

    migrate = Migrate(app, db)

    return app
