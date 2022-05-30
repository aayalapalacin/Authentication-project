"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required,get_jwt_identity




api = Blueprint('api', __name__)


@api.route('/signup', methods=['POST'])
def signup_user():
    body = request
    email = request.json.get('email')
    password = request.json.get('password')
    if body is None:
        return "body is empty", 400
    if not email:
        return "email is empty", 400
    if not password:
        return "password is empty", 400
    
    check_user = User.query.filter_by(email=email).first()
    if check_user is not None:
        return "user already exists", 409
    user = User(email= email, password=password, is_active=True)
    db.session.add(user)
    db.session.commit()

    response_body = {
        "message": "Your account has been registered successfully", "user": user.serialize()
    }

    return jsonify(response_body ), 200

@api.route('/login', methods=['POST'])
def handle_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({
            "msg": "No account was found. Please check the email used or create an account."
        }), 401
    
    if password != user.password:
        return jsonify({"msg": "Incorrect password. Please try again."}), 401

    access_token = create_access_token(identity=email)
    payload = {
        'token': access_token,
        # .decode("utf-8")
        'user': user.serialize()
    }

    return jsonify(payload), 200