"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import hashlib
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

api = Blueprint('api', __name__)


# @api.route("/token", methods=["POST"])
# def create_token():
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)
#     if email != "test" or password != "test":
#         return jsonify({"msg": "Bad email or password"}), 401

#     access_token = create_access_token(identity=email)
#     return jsonify(access_token=access_token)

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    expiration = datetime.timedelta(days=3)
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify("Email/Password are incorrect"),401
    if not check_password_hash(user.password,password):
        return jsonify("Email/Password are incorrect"),401
    
    access_token = create_access_token(identity=email,expires_delta=expiration)
    return jsonify(access_token=access_token),200
    
@api.route("/signup", methods=["POST"])
def signup():
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "user already exist"}), 401
    new_user = User(
        name=name,
        email=email,
        password= generate_password_hash(password)
    )
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify("user created successfully")

@api.route("/user", methods=["GET"])
@jwt_required()
def get_user():
    user_email = get_jwt_identity() 
    print(user_email,"user!!!!!!!!!!!!!")
    user = User.query.filter_by(email=user_email).first()
    return jsonify(user.serialize())