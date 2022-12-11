
import os
import sys
import path
from flask import Flask, request, json, Blueprint
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS, cross_origin
from db_connection import *
initialize_app()
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent)
from Appointments.views.views_appointments import Appointments

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_main():
    return "Hello!"

app.register_blueprint(Appointments)

app.run()