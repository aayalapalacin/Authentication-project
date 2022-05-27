"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

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