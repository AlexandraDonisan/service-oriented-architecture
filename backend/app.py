import json
import requests

from flask import Flask, jsonify, request, redirect, url_for
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from pymongo import MongoClient

from utils import JSONEncoder


client = MongoClient("mongodb://host.docker.internal:27018/")
db = client["cocktails"]
user = db["User"]
cocktail = db["Cocktail"]


app = Flask(__name__)
jwt = JWTManager(app)

app.config["JWT_SECRET_KEY"] = "this-is-secret-key"


@app.route("/", methods=['GET'])
@jwt_required()
def dasboard():
    return jsonify(message="Welcome Den San!")


@app.route("/register", methods=["POST"])
def register():
    email = request.form["email"]
    # test = User.query.filter_by(email=email).first()
    test = user.find_one({"email": email})
    if test:
        return jsonify(message="User Already Exists"), 409
    else:
        first_name, last_name = request.form["name"].split(" ")
        password = request.form["password"]
        user_info = dict(first_name=first_name, last_name=last_name, email=email, password=password)
        user.insert_one(user_info)
        access_token = create_access_token(identity=email)
        return jsonify(message="User added sucessfully", access_token=access_token), 201


@app.route("/login", methods=["POST"])
def login():
    if request.is_json:
        email = request.json["email"]
        password = request.json["password"]
    else:
        email = request.form["email"]
        password = request.form["password"]

    test = user.find_one({"email": email, "password": password})
    if test:
        access_token = create_access_token(identity=email)
        return jsonify(message="Login Succeeded!", access_token=access_token), 201
    else:
        return jsonify(message="Bad Email or Password"), 401
        

@app.route("/cocktails", methods=["GET"])
def get_existing_cocktails():
    cocktails = cocktail.find()
    if cocktails:
        response = [{item: beverage[item] for item in beverage if item != '_id'} for beverage in cocktails]
        return jsonify(response)
    else:
        return jsonify(message="No cocktails in the DB"), 401


@app.route("/cocktail/<name>", methods=["GET"])
@jwt_required()
def get_cocktail_by_name(name):
    beverage = cocktail.find_one({"strDrink": name})
    if beverage:
        return JSONEncoder().encode(beverage)
    else:
        url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + name
        response = requests.get(url).json()
        if response["drinks"] == "null" or not response["drinks"]:
            return jsonify(message="Cocktail NOT found!"), 404
        else:
            content = response["drinks"][0]
            response = cocktail.insert_one(content)
            print(content)
            return JSONEncoder().encode(content)


@app.route("/cocktail", methods=["POST"])
def add_cocktail():
    content = request.json["drinks"][0]
    beverage_name = content["strDrink"]
    test = cocktail.find_one({"strDrink": beverage_name})
    if test:
        return jsonify(message="Cocktail Already Exists"), 409
    else:
        response = cocktail.insert_one(content)
        output = {'Status': 'Successfully Inserted Cocktail',
                    'Cocktail_ID': str(response.inserted_id)}
        return output


@app.route("/cocktail/<name>", methods=["DELETE"])
def delete_cocktail(name):
    response = cocktail.delete_one({"strDrink": name})
    output = {'Status': 'Successfully Deleted' if response.deleted_count > 0 else "Cocktail not found."}
    return output