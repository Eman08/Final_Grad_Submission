import time
from flask import Flask, request, json, Blueprint
from flask_restful import Resource, Api, reqparse
import pandas as pd
import ast 
import sys
import path
import  datetime 
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from controller.controller_signup import *
from controller.controller_login import *

login = Blueprint('login', __name__, url_prefix= '/login')
@login.route("/signup", methods=['POST'])
def signUp():
    data = json.loads(request.data)
    time.sleep(1)
    firstname = data["firstname"]
    lastname = data["lastname"]
    username = data["username"]
    email =data["email"]
    password = data["password"]
    dob = data["dob"]
    imagePath = data["imagePath"]
    if username == "" or email == "" or password == "" or dob == "":
        return "One or more fields are missing",404
    elif imagePath != "":
        return checkUserSignUp(username, email, dob,password,imagePath,firstname,lastname)
    else:
        return checkUserSignUp(username, email, dob,password,"",firstname,lastname)

@login.route("/usernameCheck", methods=['POST'])
def signUpCheck():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    if username == "":
        return "Username fields are missing",404
    else:
        return checkusername(username,"","","","","")

@login.route("/loginUser", methods=['POST'])
def loginUser():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    password = data["password"]
    if username == "" or  password == "":
        return "One or more fields are missing",404
    else:
        return checkUserRecord(username, password)

@login.route("/delete", methods=['POST'])
def deleteUsername():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    if username == "":
        return "One or more fields are missing",404
    else:
        return deleteUser(username)

@login.route("/getProfileImage",methods=["POST"])
def getSignedProfileImageLink():
    data= json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    if username == "":
        return "One or more fields are missing",404
    else:
        return getSignedImageUrl(username)

@login.route("/getLawyerDetails",methods=["POST"])
def getLawyerDetailsView():
    data= json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    if username == "":
        return "One or more fields are missing",404
    else:
        return getLawyerDetailsController(username)
