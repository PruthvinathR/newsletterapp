import os

import dotenv

dotenv.load_dotenv(override=True)

class Config:
    # Database configuration
    SQLALCHEMY_DATABASE_URI = os.getenv('SUPABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # API keys
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    SENDGRID_API_KEY = os.getenv('SENDGRID_API_KEY')

    # Email configuration
    GMAIL_USERNAME = os.getenv('GMAIL_USERNAME')
    GMAIL_PASSWORD = os.getenv('GMAIL_PASSWORD')

    # JWT configuration
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    JWT_TOKEN_LOCATION = os.getenv('JWT_TOKEN_LOCATION')
    JWT_IDENTITY_CLAIM = os.getenv('JWT_IDENTITY_CLAIM')

config = Config()