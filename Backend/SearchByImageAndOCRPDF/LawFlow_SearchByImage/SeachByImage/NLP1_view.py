import json
import datetime
import path 
import sys
import os
from flask import Flask, request, json, Blueprint
import time
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from SeachByImage.NLP1 import *

search = Blueprint('search',__name__, url_prefix='/search')

@search.route("/searchByImage",methods=["POST"])
def searchImage():
    data=json.loads(request.data)
    time.sleep(1)
    #url=data["url"]
    username=data["username"]
    filename = data["filename"]
    forwhat=data['forwhat']
    searchtype="OCR"
    return checkSimilarityOCR(filename, username,forwhat)

@search.route("/searchByPDF",methods=["POST"])
def searchPdf():
    data=json.loads(request.data)
    time.sleep(1)
    username=data["username"]
    filename = data["filename"]
    forwhat=data['forwhat']

    searchtype="PDF"
    return checkSimilarityPDF(filename, username,forwhat)