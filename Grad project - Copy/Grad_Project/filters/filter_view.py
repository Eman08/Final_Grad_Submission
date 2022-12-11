from venv import create
import jwt
import sys
import path
import sys
import datetime
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from categories.category_controller import *
from flask import Flask, request, json, Blueprint
from flask_restful import Resource, Api, reqparse
from filters.filter_controller import *


filter = Blueprint('filter',__name__, url_prefix = '/filter')

@filter.route("/getCaseByDate",methods=["POST"])
def getCaseByDateView():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    date = data["date"]  #here the date is passed as 2022-11-16
    if username == "" or date == "":
        return{"Error":"One or more fields missing"}, 404
    else:
        return getCaseByDate(username, date)

@filter.route("/getCaseByCourtType",methods=["POST"])
def getCaseByCourtView():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    courtType = data["courtType"]
    if username == "" or courtType == "":
        return{"Error":"One or more fields missing"}, 404
    else:
        return getCaseByCourtType(username, courtType)

@filter.route("/getCaseByCaseType",methods=["POST"])
def getCaseByCaseTypeView():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    caseType = data["caseType"]
    if username == "" or caseType == "":
        return{"Error":"One or more fields missing"}, 404
    else:
        return getCaseByCaseType(username, caseType)

@filter.route("/filterFilesByDates",methods=["POST"])
def getFilesByDateView():
    data = json.loads(request.data)
    time.sleep(1)
    docID = data["docID"]
    date_sent = data["date_sent"]  #here the date is passed as 2022-11-26
    if docID == "" or date_sent == "":
        return{"Error":"One or more fields missing"}, 404
    else:
        return filterFilesByDates(docID, date_sent)

@filter.route("/filterByAscending",methods=["POST"])
def getFilesAsceningView():
    data = json.loads(request.data)
    time.sleep(1)
    caseID = data["caseID"]
    if caseID == "":
        return{"Error":"One or more fields missing"}, 404
    else:
        return filterByAscending(caseID)

@filter.route("/filterByDescending",methods=["POST"])
def getFilesDescendingView():
    data = json.loads(request.data)
    time.sleep(1)
    caseID = data["caseID"]
    if caseID == "":
        return{"Error":"One or more fields missing"}, 404
    else:
        return filterByDescending(caseID)



