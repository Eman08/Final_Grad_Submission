import sys
from tabnanny import check
import path
import sys
import random
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from model.model_to_do_list import *
from notifications.notifications_model import *
from db_connection import *


def checkUserExists(username=str, activityName=str, activityDescription= str, assigned_by=str, status=str, case_id=str, workflow_id=str):
    obj = ToDoListRegister()
    if obj.checkUserExists(username):
       return assignRandomActivityId(username, activityName,activityDescription, assigned_by, status, case_id, workflow_id)
    else:
        return "Sorry this user doesnt exist", 404


def assignRandomActivityId(username=str, activityName=str, activityDescription=str, assigned_by=str, status=str,case_id=str, workflow_id=str):
    activity_id = random.randint(1000, 9999)
    obj = ToDoListRegister(username)
    value = obj.getCaseId(activity_id)
    while value == "False":
        activity_id = random.randint(1000, 9999)
        value = obj.getCaseId(activity_id)
    activity_id_number = str(activity_id)
    return createObject(username, activityName, status, activity_id_number, activityDescription, assigned_by, case_id, workflow_id)


def createObject(username=str, activityName=str, status=str, activityIdNumber=str, activityDescription=str, assigned_by=str,  case_id=str, workflow_id=str):
    obj = ToDoListRegister(username, activityName, activityIdNumber, status, activityDescription, assigned_by,  case_id, workflow_id)
    check = obj.setTodoList()
    if check == "Added":
        return {"Success":"To do list item added successfully"}, 200
    else:
        return "Error", 404

def getAllItems(username = str):
    obj = ToDoListRegister(username)
    return obj.getTodoList()

def getOneItemFromList (username = str, itemId= str):
    obj = ToDoListRegister(username)
    return obj.getParticularCase(itemId)

def deleteItem(username = str, id = str):
    obj = ToDoListRegister(username)
    return obj.deleteToDoListItems(id)

def updateStatusCtrl(username = str, id = str, updateValue = str, case_id= str, task_id=str):
   
    obj = ToDoListRegister(username)
    return obj.updateStatus(id, updateValue)
    
def updateActivityCtrl(username = str, id = str, updateValue = str):
    obj = ToDoListRegister(username)
    return obj.updateActivity(id, updateValue)
    
def addNotificationsForUpdate(caseID = str, username =str, task_id=str, status=str):
    assignedLawyers = []
    task_name = ""
    doc = return_db().collection(u'Cases').document(caseID).get()
    assignedLawyers = doc.to_dict()["assignedLawyers"]
    for i in assignedLawyers:
        if i == username:
            assignedLawyers.remove(i)
    
    doc_wf = return_db().collection(u'Workflow').document(caseID).get()
    for i in doc_wf.to_dict():
        if doc_wf.to_dict()[i]["Task_id"] == task_id:
            task_name = doc_wf.to_dict()[i]["Task"]
    
    message = f"{task_name} is now {status} by {username}"
    title = "Task Progress"
    addNotificationsForMultipleUsers(assignedLawyers,message,title)
