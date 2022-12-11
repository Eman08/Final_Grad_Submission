import time
from flask import Flask, request, json
from flask_restful import Resource, Api, reqparse
import pandas as pd
import ast 
import sys
import path
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from controller.controller_case import *

app = Flask(__name__)
api = Api(app)

@app.route("/createCase", methods=['POST'])
def createCase():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    caseName = data["caseName"]
    lawyers = data["lawyers"]
    description = data["description"]
    if username == "" or caseName == "" or len(lawyers) == 0 or description == "":
        return "One or more fields are missing",404
    else:
        return checkLawyer(username,caseName,lawyers,description),200

app.run()