from ast import Return
from decimal import *
import decimal
from db_connection import *
from datetime import datetime
from flask import Flask, request, json, Blueprint
import path 
import sys
import time
import os
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from WorkFlow1.workflow1 import *
from flask_restful import Resource, Api, reqparse
os.environ["GCLOUD_PROJECT"] = "lawflow-3c5b7"


WF = Blueprint('WF',__name__, url_prefix='/WF')
@WF.route("/makeWF",methods=["POST"])

def getTasks():
    data=json.loads(request.data)
    time.sleep(1)
    taskList=data['TaskList']
    taskDescriptionList=data['taskDescriptionList']
    taskPartiesList=data['taskPartiesList']
    WFid=data['WFid']
    
    addWorkFlow(taskList,taskDescriptionList,taskPartiesList,WFid)
    return {"Success":"Task Uploaded"}
    


@WF.route("/addSubTasks",methods=["POST"])
def makeSubTasks():
    data=json.loads(request.data)
    time.sleep(1)
    subtaskInfo=data["Subtask"]
    mainTask=data["MainTask"]
    WFid=data['WFid']
    
    addSubTaskToWorkflow(subtaskInfo,mainTask,WFid)
    return {"Success":"Subtask Added"}

@WF.route("/addSubTasksNEW",methods=["POST"])
def makeSubTasksNEW():
    data=json.loads(request.data)
    time.sleep(1)
    subtaskInfo=data['SubtaskMap']
    WFid=data['WFid']
    
    addSubTaskToWorkflowNEW(subtaskInfo,WFid)
    return {"Success":"Subtask Added"}




@WF.route("/updateStatusToStarted",methods=["POST"])
def ChangeStatusToStarted():
    data=json.loads(request.data)
    time.sleep(1)
    TaskID=data['TaskID']
    WFid=data['WFid']
    return updateStatusToStarted(WFid,TaskID)

@WF.route("/updateStatusToFinished",methods=["POST"])
def ChangeStatusToFinished():
    data=json.loads(request.data)
    time.sleep(1)
    TaskID=data['TaskID']
    WFid=data['WFid']
    
    
    return updateStatusFinished(WFid,TaskID)


@WF.route("/changeAssignedTo",methods=["POST"])
def changeAssignedTo():
    data=json.loads(request.data)
    time.sleep(1)
    TaskID=data['TaskID']
    WFid=data['WFid']
    newMember=data['newMember']
    ChangeAssignedTo(WFid,TaskID,newMember)
    return {"Success":"Task Assiged"}

@WF.route("/getWorkflow",methods=["POST"])
def getWorkflowMainTasks():
    data = json.loads(request.data)
    time.sleep(1)
    WFid= data["WFid"]
    return getWorkflowModelMainTasks(WFid)


@WF.route("/getSubForMain",methods=["POST"])
def getSubForMain():
    data=json.loads(request.data)
    time.sleep(1)
    TaskID=data['TaskID']
    WFid=data['WFid']
    return checkIfSubTaskForMain(WFid,TaskID)
   

@WF.route("/updateTaskName",methods=['POST'])
def changeTaskName():
    data=json.loads(request.data)
    time.sleep(1)
    TaskID=data['TaskID']
    WFid=data['WFid']
    newName=data['NewName']
    updateTaskName(WFid,TaskID,newName)
    return {"Success":"TaskName Changed"} 
    
    
@WF.route("/updateTaskDescription",methods=['POST'])
def changeTaskDescription():
    data=json.loads(request.data)
    time.sleep(1)
    TaskID=data['TaskID']
    WFid=data['WFid']
    newDesc=data['newDesc']
    updateTaskDescription(WFid,TaskID,newDesc)
    return {"Success":"TaskName Changed"} 

@WF.route("/updateTaskParties",methods=['POST'])
def changeTaskParties():
    data=json.loads(request.data)
    time.sleep(1)
    TaskID=data['TaskID']
    WFid=data['WFid']
    newMember=data['newMember']
    ChangeParties(WFid,TaskID,newMember)
    return {"Success":"TaskName Changed"} 
