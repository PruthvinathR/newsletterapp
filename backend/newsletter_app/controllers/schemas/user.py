from marshmallow import validate, validates_schema, ValidationError
from marshmallow.fields import Email, String, Field
from newsletter_app.models import user
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

class UserSchema(SQLAlchemyAutoSchema):
    first_name = String(required=True, error_messages={"required": "First Name is required."})
    last_name = String(required=True, error_messages={"required": "Last Name is required."})
    organization = String(required=True, error_messages={"required": "Organization is required."})
    email = Email(required=True, error_messages={"required": "Email is required."})
    password = String(required=True, load_only=True, error_messages={"required": "Password is required."})

    @validates_schema
    def validate_email(self, data, **kwargs):
        email = data.get('email')
        if user.User.query.filter_by(email=email).first():
            raise ValidationError(f"Email {email} already exists.")
        return data

    @validates_schema
    def validate_organization(self, data, **kwargs):
        organization = data.get('organization')
        if user.User.query.filter_by(organization=organization).first():
            raise ValidationError(f"Organization {organization} already exists.")
        return data

    class Meta:
        model = user.User
        load_instance = True
        exclude = ("id", "_password")


class UserCreateSchema(UserSchema):
    password = String(required=True, 
                      validate=[validate.Length(min=8), 
                                validate.Regexp(r"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")],
                      load_only=True,
                      error_messages={"required": "Password is required.",
                                      "invalid": "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
                                      }
                      )
    

