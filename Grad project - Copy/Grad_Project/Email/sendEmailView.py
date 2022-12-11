from flask import Flask, request, json, Blueprint
from flask_restful import Resource, Api, reqparse
import path
import time
import sys
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from Email.sendEmail import *

Email = Blueprint('email',__name__, url_prefix = '/email')

@Email.route("/sendEmail", methods = ["POST","GET"])
def sendEmails():
    data = json.loads(request.data)
    time.sleep(1)
    receiver = data["receiver"]
    subject = data["subject"]
    body = data["body"]
    if receiver == "" or subject == "" or body == "":
        return {"Error":"One or more fields missing"},404
    else:
        sendEmail(subject,body,receiver)
        return {"Success":"Email Has been sent"},200