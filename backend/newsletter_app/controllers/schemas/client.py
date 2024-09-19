from marshmallow import validate, validates_schema, ValidationError
from marshmallow.fields import Email, String, Integer, Boolean
from newsletter_app.models import client
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

class ClientSchema(SQLAlchemyAutoSchema):
    name = String(required=True, error_messages={"required": "Name is required."})
    location = String(required=True, error_messages={"required": "Location is required."})
    industry = String(required=True, error_messages={"required": "Industry is required."})
    contact_person = String(required=True, error_messages={"required": "Contact person is required."})
    contact_email = Email(required=True, error_messages={"required": "Contact email is required."})
    contact_phone = String(required=True, error_messages={"required": "Contact phone is required."})
    user_id = Integer(required=True, load_only=True)

    class Meta:
        model = client.Client
        load_instance = True
        include_fk = True
