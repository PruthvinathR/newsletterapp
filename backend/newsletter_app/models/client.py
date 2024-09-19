from newsletter_app import db
from newsletter_app.models.category import Category

class Client(db.Model):
    __tablename__ = 'clients'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    industry = db.Column(db.String(255), nullable=False)
    contact_person = db.Column(db.String(255), nullable=False)
    contact_email = db.Column(db.String(255), nullable=False)
    contact_phone = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), nullable=False, index=True)

    user = db.relationship("User", back_populates="clients")
    categories = db.relationship("Category", back_populates="client")


    def __init__(self, name, location, industry, contact_person, contact_email, contact_phone, user_id):
        self.name = name
        self.location = location
        self.industry = industry
        self.contact_person = contact_person
        self.contact_email = contact_email
        self.contact_phone = contact_phone
        self.user_id = user_id

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'industry': self.industry,
            'contact_person': self.contact_person,
            'contact_email': self.contact_email,
            'contact_phone': self.contact_phone,
            'user_id': self.user_id
        }
