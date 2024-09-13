from newsletter_app import db

class UserNewsletter(db.Model):
    __tablename__ = 'user_newsletter'

    # primary key is a combination of user_id and newsletter_id. This is a composite primary key. This is a convention when using pivot tables.
    user_id = db.Column("user_id", db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), primary_key=True, nullable=False)
    newsletter_id = db.Column("newsletter_id", db.Integer, db.ForeignKey('newsletters.id', ondelete='CASCADE'), primary_key=True, nullable=False)

    def __init__(self, user_id, newsletter_id):
        self.user_id = user_id
        self.newsletter_id = newsletter_id
