from newsletter_app import db


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'), nullable=False)

    client = db.relationship("Client", back_populates="categories")
    
    

    def __init__(self, name, description):
        self.name = name
        self.description = description

    def __repr__(self):
        return f'<Category {self.name}>'
    
