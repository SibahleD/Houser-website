from flask import Flask, render_template, request, jsonify, redirect, url_for
from models import db, Property, Agent

app = Flask(__name__, template_folder='templates', static_folder='static')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Create tables before first request
@app.before_first_request
def create_tables():
    db.create_all()
    # Add some sample data if the database is empty
    if not Agent.query.first():
        sample_agent = Agent(
            name="Jane Doe",
            specialization="Residential Properties",
            email="jane@example.com",
            phone="+254 712 345678",
            experience=10,
            bio="Experienced real estate agent with over 10 years in the industry.",
            image_url="https://placehold.co/300x250"
        )
        db.session.add(sample_agent)
        
        sample_property = Property(
            title="Modern Villa in Nairobi",
            location="Nairobi",
            bedrooms=4,
            bathrooms=3,
            sqft=2500,
            amenities="Pool, Garage, Garden",
            price=250000,
            image_url="https://placehold.co/600x400",
            description="Beautiful modern villa with excellent amenities.",
            agent_id=1
        )
        db.session.add(sample_property)
        db.session.commit()

# Frontend Routes
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/home.html')
def home_alt():
    return render_template('home.html')

@app.route('/properties.html')
def properties():
    return render_template('properties.html')

@app.route('/listings.html')
def listings():
    return render_template('listings.html')

@app.route('/agents.html')
def agents():
    return render_template('agents.html')

@app.route('/about.html')
def about():
    return render_template('about.html')

@app.route('/agent-details.html')
def agent_details():
    return render_template('agent-details.html')

# API Routes
@app.route('/api/properties', methods=['GET'])
def get_properties():
    properties = Property.query.all()
    return jsonify([prop.to_dict() for prop in properties])

@app.route('/api/properties/<int:id>', methods=['GET'])
def get_property(id):
    property = Property.query.get_or_404(id)
    return jsonify(property.to_dict())

@app.route('/api/agents', methods=['GET'])
def get_agents():
    agents = Agent.query.all()
    return jsonify([agent.to_dict() for agent in agents])

@app.route('/api/agents/<int:id>', methods=['GET'])
def get_agent(id):
    agent = Agent.query.get_or_404(id)
    return jsonify(agent.to_dict())

@app.route('/api/agents/<int:id>/properties', methods=['GET'])
def get_agent_properties(id):
    properties = Property.query.filter_by(agent_id=id).all()
    return jsonify([prop.to_dict() for prop in properties])

if __name__ == '__main__':
    app.run(debug=True)