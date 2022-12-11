from os import remove
import time
from flask import Flask, request, json, Blueprint
from flask_restful import Resource, Api, reqparse
import pandas as pd
import ast 
import sys
import path
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent)
from add_documents_controller import *

addDocs = Blueprint('addDoc',__name__,url_prefix="/addDocs")

@addDocs.route("/addDocument",methods=["POST"])
def addDocsView():
    data = json.loads(request.data)
    time.sleep(1)
    case_id = data["case_id"]
    file_name = data["file_name"]
    time_created = data["time_created"]
    file_type = data["file_type"]
    gsutil = data["gsutil"]
    if case_id == "" or file_name =="" or time_created == "" or file_type == "" or gsutil == "":
        return {"Error":"One or more fields missing"},404
    else:
        return addDocuments(case_id,file_name,time_created,file_type,gsutil)
    
@addDocs.route("/deleteDoc",methods=["POST"])
def deleteDocumentView():
    data = json.loads(request.data)
    time.sleep(1)
    case_id = data["case_id"]
    file_type = data["file_type"]
    if case_id == "" or file_type == "":
        return {"Error":"One or more fields missing"},404
    else:
        return deleteDocument(file_type, case_id)

@addDocs.route("/getAllDocs", methods=["POST"])
def getAllDocsView():
    data = json.loads(request.data)
    time.sleep(1)
    case_id = data["case_id"]
    if case_id == "":
        return {"Error":"One or more fields missing"},404
    else:
        return getDocuments(case_id)

@addDocs.route("/getPdfDocs",methods=["POST"])
def getPDFDocs():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    if username == "":
        return {"Error":"One or more fields missing"},404
    else:
        return getPdfDocumentsController(username)


@addDocs.route("/getTranslatedDocs",methods=["POST"])
def checkForDocs():
    data = json.loads(request.data)
    time.sleep(1)
    docId = data["docId"]
    if docId == "":
        return {"Error":"One or more fields missing"},404
    else:
        return checkForTranslatedDoc(docId)