from flask import Flask, request, json, Blueprint
from flask_restful import Resource, Api, reqparse
import pandas as pd
import path
import time
import sys
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from controller.controller_to_do_list import *
from WorkFlow1.workflow1 import updateStatusToStarted, updateStatusFinished

todolist = Blueprint('todolist',__name__, url_prefix = '/todolist')

@todolist.route("/addtolist",methods=["POST"])
def addToList():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    status = data["status"]
    activity_name = data["activity_name"]
    if username == "" or status == "" or activity_name == "" :
        return "One or more fields are missing",404
    else:
        return checkUserExists(username, activity_name, status)

@todolist.route("/gettodolist", methods =["GET","POST"])
def getList():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    return getAllItems(username)

@todolist.route('/getparticularitem', methods = ["GET"])
def getOneItem():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    item_id = data["item_id"]
    return getOneItemFromList(username, item_id)

@todolist.route('/deleteparticularitem', methods = ["POST"])
def deleteOneItem():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    item_id = data["item_id"]
    return deleteItem(username, item_id)

@todolist.route('/updateStatus', methods=["POST"])
def updateStatus():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    item_id = data["item_id"]
    status_update = data["status_update"]
    case_id = data["case_id"]
    task_id = data["task_id"]
    if status_update == "in-progress":
        updateStatusToStarted(case_id,task_id)
    elif status_update == "completed":
       updateStatusFinished(case_id,task_id)

    addNotificationsForUpdate(case_id, username, task_id, status_update)
    return updateStatusCtrl(username, item_id, status_update)

@todolist.route('/updateActivity', methods=["POST"])
def updateActivity():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    item_id = data["item_id"]
    activity_update = data["activity_update"]
    return updateActivityCtrl(username, item_id, activity_update)
