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
from controller.controller_searchFile import *
print(datetime.datetime.now().strftime("%d_%m_%Y %H_%M_%S"))

searchFile = Blueprint('searchFile', __name__, url_prefix= '/searchFile')
@searchFile.route("/search_filename", methods=['POST'])
def search_filename():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    filename =data["filename"]
    if username == "" or filename == "":
        return "One or more fields are missing",404
    else:
        return findfile(username, filename)


