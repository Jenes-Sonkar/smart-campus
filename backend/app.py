from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db  # Ensure ScholarshipCandidate is defined in models.py
from routes import register_blueprints
from config import Config

# App Factory
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    JWTManager(app)
    CORS(app)

    # Register all route blueprints
    register_blueprints(app)

    # Create database tables
    with app.app_context():
        db.create_all()

    return app

# Run the app
if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all()  # ✅ This creates the tables
    app.run(debug=True)