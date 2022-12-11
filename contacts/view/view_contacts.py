from flask import Flask, request, json, Blueprint
from flask_restful import Resource, Api, reqparse
import path
import time
import sys
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from contacts.controller.controller_contacts import *

contacts = Blueprint('contacts',__name__, url_prefix = '/contacts')

@contacts.route("/addContact",methods=["POST"])
def addContact():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    contactName = data["contactName"]
    contactPhno = data["contactPhno"]
    contactEmail = data["contactEmail"]
    if username == "" or contactName == "" or contactPhno == "" or contactEmail == "" :
        return "One or more fields are missing",404
    else:
        checkUserExists(username, contactName, contactPhno, contactEmail)
        return "Contact added!"
    

@contacts.route("/getcontact", methods =["GET"])
def getContact():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    getAllContacts(username)
    return "Contact found!"

@contacts.route('/getSingleContact', methods = ["GET"])
def getOneItem():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    contactId = data["contactId"]
    getSingleContactFromCollection(username, contactId)
    return "Contact found!"

@contacts.route('/deleteContact', methods = ["POST"])
def deleteContact():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    contact_id = data["contact_id"]
    deleteUserContact(username, contact_id)
    return "Contact deleted!"

@contacts.route('/updatePhno', methods=["POST"])
def updatePhno():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    contact_id = data["contact_id"]
    phno_update = data["phno_update"]
    updateUserPhno(username, contact_id, phno_update)
    return "Contact Phno updated!"

@contacts.route('/updateEmail', methods=["POST"])
def updateEmail():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    contact_id = data["contact_id"]
    email_update = data["email_update"]
    updateUserEmail(username, contact_id, email_update)
    return "Contact email updated!"

@contacts.route('/checkPhno', methods=["GET"])
def checkPhno():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    phno_check = data["phno_check"]
    checkContactPhno(username, phno_check)
    return "Contact phno exists!"

@contacts.route('/checkEmail', methods=["GET"])
def checkEmail():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    email_check = data["email_check"]
    checkContactEmail(username, email_check)
    return "Contact email exists!"

@contacts.route('/checkName', methods=["GET"])
def checkName():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    name_check = data["name_check"]
    checkContactName(username, name_check)
    return "Contact name exists!"