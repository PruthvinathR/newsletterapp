

from marshmallow import validate, validates_schema, ValidationError
from marshmallow.fields import String, Integer
from newsletter_app.models import category
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

class CategorySchema(SQLAlchemyAutoSchema):
    name = String(required=True, error_messages={"required": "Name is required."})
    description = String(required=True, error_messages={"required": "Description is required."})
    client_id = Integer(required=True, load_only=True)

    class Meta:
        model = category.Category
        load_instance = True
        include_fk = True
