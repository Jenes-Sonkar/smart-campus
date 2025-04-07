from flask import Blueprint, request, jsonify
import pickle
import pandas as pd
import math



canteen_bp = Blueprint("canteen", __name__)

# === Load Meal Demand Prediction Model ===
with open("utils/random_forest_model.pkl", "rb") as f:
    demand_model = pickle.load(f)

with open("utils/scaler.pkl", "rb") as f:
    demand_scaler = pickle.load(f)

with open("utils/feature_columns.pkl", "rb") as f:
    demand_feature_columns = pickle.load(f)

# # === Load Nutrition Suggestion Model Pipeline ===
# with open("utils/food_recommender.pkl", "rb") as f:
#     nutrition_pipeline = pickle.load(f)


# === Preprocessing for Demand Prediction ===
def preprocess_demand_input(data):
    df = pd.DataFrame([data])
    df_encoded = pd.get_dummies(df, drop_first=True)
    df_aligned = df_encoded.reindex(columns=demand_feature_columns, fill_value=0)
    df_scaled = demand_scaler.transform(df_aligned)
    return df_scaled


@canteen_bp.route("/canteen/predict-demand", methods=["POST"])
def predict_demand():
    try:
        data = request.get_json()
        required_fields = ['day_of_week', 'season', 'is_holiday', 'special_event', 'menu_type']

        if not all(field in data for field in required_fields):
            return jsonify({"msg": "Missing fields in input", "error": True}), 400

        processed_input = preprocess_demand_input(data)
        prediction = demand_model.predict(processed_input)
        predicted_demand = math.ceil(prediction[0])

        return jsonify({"predicted_meal_demand": predicted_demand})

    except Exception as e:
        return jsonify({"msg": "Prediction failed", "error": str(e)}), 500

