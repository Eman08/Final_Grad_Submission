import os
import path
import sys
from flask import Flask, request, json, Blueprint
from flask_restful import Resource, Api, reqparse
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent)
from delete_files.delete_files_controller import *


delete_file = Blueprint('deleteFile',__name__, url_prefix='/deleteFile')
@delete_file.route("/deleteFileById",methods=["POST"])
def deleteFileView():
    data=json.loads(request.data)
    time.sleep(1)
    fileId = data["fileID"]
    return deletefileController(fileId)
