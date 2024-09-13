from newsletter_app import db
from newsletter_app.models.user_newsletter import UserNewsletter

class NewsLetter(db.Model):
    __tablename__ = 'newsletters'

    id = db.Column("id", db.Integer, primary_key=True, autoincrement=True)
    title = db.Column("title", db.String(255), nullable=False)
    subscribers = db.relationship("User", secondary='user_newsletter', back_populates="subscriptions", passive_deletes=True)

    def __init__(self, title):
        self.title = title