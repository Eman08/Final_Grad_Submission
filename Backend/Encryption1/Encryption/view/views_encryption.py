import time
from flask import Flask, request, json, Blueprint
from flask_restful import Resource, Api, reqparse
import ast 
import sys
import path
import  datetime 
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from controller.controller_encryption import *
print(datetime.datetime.now().strftime("%d_%m_%Y %H_%M_%S"))

app = Flask(__name__)
api = Api(app)

@app.route("/encrypt", methods=['POST'])
def encryptDoc():
    data = json.loads(request.data)
    time.sleep(1)
    caseID=data["caseID"]
    PinCode=data["PinCode"]
    check=checkPIN(PinCode)
    if check =='True':
        encrypt(caseID,PinCode)
        return "PIN Accepted"

    else:
        return "PIN not accepted"


app.run()
