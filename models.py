from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Property(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    bedrooms = db.Column(db.Integer, nullable=False)
    bathrooms = db.Column(db.Integer, nullable=False)
    sqft = db.Column(db.Integer, nullable=False)
    amenities = db.Column(db.String(200))
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(200))
    description = db.Column(db.Text)
    agent_id = db.Column(db.Integer, db.ForeignKey('agent.id'))
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'location': self.location,
            'bedrooms': self.bedrooms,
            'bathrooms': self.bathrooms,
            'sqft': self.sqft,
            'amenities': self.amenities,
            'price': self.price,
            'image_url': self.image_url,
            'description': self.description,
            'agent_id': self.agent_id
        }

class Agent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    specialization = db.Column(db.String(100))
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    experience = db.Column(db.Integer)
    bio = db.Column(db.Text)
    image_url = db.Column(db.String(200))
    properties = db.relationship('Property', backref='agent', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'specialization': self.specialization,
            'email': self.email,
            'phone': self.phone,
            'experience': self.experience,
            'bio': self.bio,
            'image_url': self.image_url
        }