from flask import Blueprint, request, jsonify
from models import db, EligibleStudent
import pickle
import pandas as pd

scholarship_bp = Blueprint("scholarship", __name__)

# === Load Model and Scaler ===
with open("utils/scholarship_model.pkl", "rb") as f:
    scholarship_model = pickle.load(f)
with open("utils/scholarship_scaler.pkl", "rb") as f:
    scholarship_scaler = pickle.load(f)

@scholarship_bp.route("/scholarship/predict", methods=["POST"])
def predict_scholarship():
    try:
        data = request.get_json()
        required_fields = ['name', 'GPA', 'Extracurriculars', 'FamilyIncome']

        if not all(field in data for field in required_fields):
            return jsonify({"msg": "Missing input fields"}), 400

        # === Preprocess input ===
        input_df = pd.DataFrame([{
            "GPA": float(data["GPA"]),
            "Extracurriculars": int(data["Extracurriculars"]),
            "FamilyIncome": float(data["FamilyIncome"])
        }])

        scaled_input = scholarship_scaler.transform(input_df)
        prediction = scholarship_model.predict(scaled_input)[0]

        if prediction == 1:
            student = EligibleStudent(
                name=data["name"],
                cgpa=float(data["GPA"]),
                extracurricular=int(data["Extracurriculars"]),
                family_income=float(data["FamilyIncome"])
            )
            db.session.add(student)
            db.session.commit()

        return jsonify({"eligible": bool(prediction)})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
