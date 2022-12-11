from os import remove
import time
from flask import Flask, request, json, Blueprint
from flask_restful import Resource, Api, reqparse
import pandas as pd
import ast 
import sys
import path
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from controller.controller_case import *
from models.model_case import *

case = Blueprint('case',__name__, url_prefix="/case")

@case.route("/createcase", methods=['POST'])
def createCase():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    caseName = data["caseName"]
    lawyers = data["lawyers"]
    start_date = data["start_date"]
    description = data["description"]
    case_type = data["case_type"]
    court_type= data["court_type"]
    docs = []
    if username == "" or caseName == "" or description == "" or case_type == "" or court_type == "":
        return "One or more fields are missing",404
    else:
        callNotification(lawyers,caseName, username)
        return checkLawyer(username,caseName,lawyers,description, docs, start_date, case_type, court_type),200

@case.route("/getAllLawyerCases", methods = ['POST','GET'])
def getCasesForLawyer():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    if username == "":
        return "Username is missing"
    else:
        return getCaseForLawyer(username)

@case.route("/deletecase", methods=['POST'])
def deleteCase():
    data = json.loads(request.data)
    time.sleep(1)
    caseID = data["caseID"]
    if caseID == "":
        return {"Error":"One or more fields are missing"},404
    else:
        return removeCase(caseID),200

@case.route("/getCaseById",methods=["POST"])
def getCaseDetails():
    data = json.loads(request.data)
    time.sleep(1)
    caseID = data["caseID"]
    if caseID == "":
        return {"Error":"One or more fields are missing"},404
    else:
        return getCaseDetailsFromId(caseID)

@case.route("/addClient",methods=["POST"])
def addClientDetails():
    data = json.loads(request.data)
    time.sleep(1)
    caseID = data["case_id"]
    client_name = data["client_name"]
    client_email = data["client_email"]
    client_phonenumber = data["client_phonenumber"]
    client_address = data["client_address"]
    client_dob = data["client_dob"]
    opposing_party = data["opposing_party"]
    opposing_address = data["oppositing_address"]
    opposing_counsel = data["opposing_counsel"]
    obj = CaseDetails()
    if caseID == "" or client_name=="" or client_email=="" or client_phonenumber=="":
        return {"Error":"One or more fields are missing"},404
    else:
        obj.createClientDetails(caseID, client_name, client_email, client_phonenumber, client_address, client_dob, opposing_party, opposing_address, opposing_counsel )
        return {"Success":"Client added"},200
        
@case.route("/getClients",methods=["POST"])
def getClientDetails():
    data = json.loads(request.data)
    time.sleep(1)
    case_id = data["case_id"]
    obj = CaseDetails()
    if case_id == "":
        return {"Error":"One or more fields are missing"},404
    else:
        return obj.getClientDetails(case_id)

@case.route("/getDocuments",methods=["POST"])
def getDocuments():
    data = json.loads(request.data)
    time.sleep(1)
    case_id = data["case_id"]
    obj = CaseDetails()
    if case_id == "":
        return {"Error":"One or more fields are missing"},404
    else:
        return obj.getDocumentsForCase(case_id)

@case.route("/getAssignedLawyers",methods=["POST"])
def getAssignedLawyersView():
    data = json.loads(request.data)
    time.sleep(1)
    case_id = data["case_id"]
    if case_id == "":
        return {"Error":"One or more fields are missing"},404
    else:
        return getAssignedLawyersController(case_id)
