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

api = Blueprint('api', __name__)


@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    user = User.query.filter_by(email=email).first()
    if user and user.password == hashed_password:
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token),200
    else:
        return "login failed", 401
        # Login failed

@api.route("/signup", methods=["POST"])
def signup():
    email = request.json.get("email", None)
    name = request.json.get("name", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "user already exist"}), 401
    new_user = User(
        email=email,
        name=name,
        password= hashlib.sha256(password.encode()).hexdigest()
    )
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify("user created successfully")

@api.route("/hello", methods=["GET"])
@jwt_required
def get_hello():
    dictionary ={
        "message": "hello world"
    }
    return jsonify(dictionary)