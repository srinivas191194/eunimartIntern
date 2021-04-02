from flask import Flask, request, Response, jsonify
from flask_sqlalchemy import SQLAlchemy

# creating an instance of the flask app
app = Flask(__name__)


# Configure database

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://admin:2526@localhost:3306/movie"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
