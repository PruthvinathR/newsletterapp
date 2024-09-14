from flask import Flask
import os
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


db = SQLAlchemy()  # Initialize the db object

def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SUPABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)


    # Register blueprints
    from newsletter_app.controllers.register_controller import register_blueprint
    from newsletter_app.controllers.subscription_controller import subscription_blueprint
    from newsletter_app.controllers.newsletter_controller import newsletter_blueprint

    app.register_blueprint(register_blueprint)
    app.register_blueprint(subscription_blueprint)
    app.register_blueprint(newsletter_blueprint)

    migrate = Migrate(app, db)

    return app
    
