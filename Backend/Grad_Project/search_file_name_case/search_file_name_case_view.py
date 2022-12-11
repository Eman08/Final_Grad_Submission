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
from search_file_name_case.search_file_name_case_controller import *

caseSearch = Blueprint('caseSearch',__name__, url_prefix="/caseSearch")

@caseSearch.route("/caseSearchFilename", methods=['POST'])
def getFiles():
    data = json.loads(request.data)
    time.sleep(1)
    caseID = data["caseID"]
    filename = data["filename"]
    if caseID == "" or filename == "":
        return {"Error":"One or more fields missing"},404
    else:
        return getFilesBasedOnCase(caseID, filename)