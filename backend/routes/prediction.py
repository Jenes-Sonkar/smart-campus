from flask import Blueprint, jsonify

prediction_bp = Blueprint("prediction", __name__)

@prediction_bp.route("/predict-demand", methods=["GET"])
def predict_demand():
    # Dummy AI logic for now
    predicted_demand = {
        "rice": 120,
        "dal": 100,
        "roti": 150,
        "salad": 80
    }
    return jsonify({"predicted_demand": predicted_demand}), 200
