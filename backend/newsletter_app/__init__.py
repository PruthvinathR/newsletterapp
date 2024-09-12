from flask import Flask


from newsletter_app.controllers.register_controller import register_controller_bp

def create_app():
    app = Flask(__name__)

    # Register blueprints
    app.register_blueprint(register_controller_bp)

    return app
