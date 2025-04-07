from flask import Blueprint, request, jsonify
from models import db, User
from utils.jwt_utils import generate_token

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    full_name = data.get("name")  # ✅ Match frontend field
    email = data.get("email")
    password = data.get("password")

    if not full_name or not email or not password:
        return jsonify({"msg": "Full name, email, and password are required", "success": False}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "User already exists", "success": False}), 409

    new_user = User(full_name=full_name, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Registration successful", "success": True}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        token = generate_token(identity=user.id)
        return jsonify({"token": token, "success": True}), 200

    return jsonify({"msg": "Invalid email or password", "success": False}), 401
