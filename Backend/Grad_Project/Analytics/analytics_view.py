from flask import Flask, request, json, Blueprint
from flask_restful import Resource, Api, reqparse
import path
import time
import sys
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from Analytics.analytics_model import *

analytics = Blueprint('analytics',__name__, url_prefix = '/analytics')
@analytics.route("/getAnalysis", methods = ["POST","GET"])
def getAnalysis():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    if username == "":
        return {"Error":"One or more fields are missing"},404
    else:
        return getWorkflowIds(username)