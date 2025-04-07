from flask import Blueprint, request, jsonify
from models import db, Meal

meals_bp = Blueprint("meals", __name__)

@meals_bp.route("/meals", methods=["POST"])
def add_meal():
    data = request.get_json()
    name = data.get("name")
    description = data.get("description", "")
    is_healthy = data.get("is_healthy", False)

    if not name:
        return jsonify({"msg": "Meal name is required"}), 400

    meal = Meal(name=name, description=description, is_healthy=is_healthy)
    db.session.add(meal)
    db.session.commit()
    return jsonify({"msg": "Meal added"}), 201

@meals_bp.route("/meals", methods=["GET"])
def get_meals():
    meals = Meal.query.all()
    return jsonify([{"id": m.id, "name": m.name, "description": m.description, "is_healthy": m.is_healthy} for m in meals]), 200
