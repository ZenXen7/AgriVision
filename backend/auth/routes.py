from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User, db
from datetime import datetime

auth_bp = Blueprint('auth', __name__)

# Register Route
@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        first_name = data.get('firstName')
        last_name = data.get('lastName')
        birth_date = data.get('birthDate')
        
        if not all([email, password, first_name, last_name, birth_date]):
            return jsonify({"error": "All fields are required"}), 400

        
        # if password != confirmPass:
        #     return jsonify({"error": "Passwords do not match"}), 400
        
        birth_date = datetime.strptime(birth_date, "%Y-%m-%d").date()

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"error": "Email already in use"}), 400
        
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

        new_user = User(email=email, password=hashed_password,first_name=first_name, last_name=last_name, birth_date=birth_date)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "message": "User registered successfully",
            "userId": new_user.id
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Login Route
@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not all([email, password]):
            return jsonify({"error": "Email and password are required"}), 400

        user = User.query.filter_by(email=email).first()
        if not user or not check_password_hash(user.password, password):
            return jsonify({"error": "Invalid email or password"}), 401

        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "email": user.email,
                "firstName": user.first_name,
                "lastName": user.last_name
            }
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Logout Route
@auth_bp.route('/logout', methods=['POST'])
def logout():
    try:
        return jsonify({"message": "Logged out successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
