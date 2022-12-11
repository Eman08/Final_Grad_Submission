import time
from flask import Flask, request, json, Blueprint
from flask_restful import Resource, Api, reqparse
import pandas as pd
import ast 
import sys
import path
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from speech_to_text.upload_to_cloud import *
from speech_to_text.docUpload import *

speech2Text = Blueprint('speech2Text', __name__, url_prefix= '/speech2Text')
@speech2Text.route("/convert", methods=['POST'])
def convert():
    data = json.loads(request.data)
    time.sleep(1)
    apath = data["apath"]
    fpath = data["fpath"]
    caseID = data["caseID"]
    name = data["name"]
    lan = data["lan"]
    if fpath == "" and apath == "" and caseID == "" and name == "" and lan == "":
        return "Fields are missing",404
    elif fpath != "" and apath == "":
        return Cconvert(fpath, caseID, name, lan)
    else:
        return uploadDoc1(apath, caseID)


