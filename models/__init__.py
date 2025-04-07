from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)  # ✅ Add this line
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)



class Feedback(db.Model):
    __tablename__ = 'feedback'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)


class Meal(db.Model):
    __tablename__ = 'meals'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    is_healthy = db.Column(db.Boolean, default=False)


class ScholarshipCandidate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    gpa = db.Column(db.Float, nullable=False)
    extracurriculars = db.Column(db.Integer, nullable=False)
    family_income = db.Column(db.Float, nullable=False)

class EligibleStudent(db.Model):
    __tablename__ = "eligible_students"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    cgpa = db.Column(db.Float, nullable=False)
    extracurricular = db.Column(db.Integer, nullable=False)
    family_income = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f"<EligibleStudent {self.name} - CGPA: {self.cgpa}>"