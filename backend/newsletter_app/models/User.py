from newsletter_app import db, pwd_context
from newsletter_app.models.news_letter import NewsLetter
from newsletter_app.models.user_newsletter import UserNewsletter
from sqlalchemy.ext.hybrid import hybrid_property



class User(db.Model):
    __tablename__ = 'users'

    id = db.Column("id", db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column("firstname", db.String(255), nullable=False)
    last_name = db.Column("lastname", db.String(255), nullable=False)
    email = db.Column("email", db.String(255), nullable=False, unique=True)
    _password = db.Column("password", db.String(255), nullable=False)
    subscriptions = db.relationship("NewsLetter", secondary='user_newsletter', back_populates="subscribers", passive_deletes=True)

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, value):
        self._password = pwd_context.hash(value)

    def __init__(self, first_name, last_name, email, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'password': self.password,
            'subscriptions': [subscription.title for subscription in self.subscriptions]
        }