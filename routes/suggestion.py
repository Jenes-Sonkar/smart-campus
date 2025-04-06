from flask import Blueprint, jsonify
from models import Meal

suggestion_bp = Blueprint("suggestion", __name__)

@suggestion_bp.route("/suggest-meals", methods=["GET"])
def suggest_meals():
    healthy_meals = Meal.query.filter_by(is_healthy=True).all()
    suggestions = [{"id": m.id, "name": m.name, "description": m.description} for m in healthy_meals]

    if not suggestions:
        return jsonify({"msg": "No healthy meals available"}), 404

    return jsonify({"suggestions": suggestions}), 200
