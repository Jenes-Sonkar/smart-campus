from .auth import auth_bp

from .meals import meals_bp
from .suggestion import suggestion_bp
from .prediction import prediction_bp
from .canteen import canteen_bp
from .scholarship import scholarship_bp

def register_blueprints(app):
    app.register_blueprint(auth_bp)
    app.register_blueprint(meals_bp)
    app.register_blueprint(suggestion_bp)
    app.register_blueprint(prediction_bp)
    app.register_blueprint(canteen_bp)
    app.register_blueprint(scholarship_bp)