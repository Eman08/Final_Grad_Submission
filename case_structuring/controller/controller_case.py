from array import array
from venv import create
import jwt
import sys
import path
import sys
import datetime
import random, string
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from models.model_case import *
from notifications.notifications_model import *

# following function checks if the user mentioned in the lawyer access exists
def checkLawyer(username:str,caseName:str,Lawyer: array,caseDescription:str, docs:array, date:str, case_type:str, court_type:str): 
    notFoundLawyers=[] 
    obj = CaseDetails()
    for i in Lawyer:
        value = obj.checkLawyers(i)
        if value == "False":
            notFoundLawyers.append(i)
    
    if not notFoundLawyers: 
        caseID = generateCaseId()
        RegisterCase(caseID, username, caseName, Lawyer, caseDescription, docs, date, case_type, court_type)
        return {"CaseID":caseID}
    else:
        return {"Error":"Following usernames do not exist"+ ''.join(notFoundLawyers)}, 404

#API should be check if lawyers exists, then check if case ID exists then we generate a case
def generateCaseId(): #Why are we generating here instead of this being a class function where it is automatically generated and 
    #generates random alphanumeric case id of 16 charachters
    randomCaseID = ''.join(random.choices(string.ascii_letters+ string.digits, k=16))
    objCase = CaseDetails()
    value = objCase.getCaseId(randomCaseID)
    while value == "False":
        randomCaseID = ''.join(random.choices(string.ascii_letters+ string.digits, k=16))
        value = objCase.getCaseId(randomCaseID)
    return randomCaseID

# Register the case in the database   
def RegisterCase(caseId:str, username:str,caseName:str,lawyer: array,caseDescription:str, docs:array, date:str, case_type:str, court_type:str):
    caseObj = CaseDetails(caseId, username, caseName, lawyer, caseDescription, docs, date, case_type, court_type)
    caseObj.createCase()
    return {"Added to db"}

def removeCase(caseId:str):
    caseObj = CaseDetails(caseId) #Initialize an object, with the caseID given, then search for that caseID in the DB
    NotExists = caseObj.getCaseId(caseId)
    print(NotExists)    #If it does exist, then function will return false and move to the else statement where the document will be deleted from the DB
    if(NotExists == 'True'):
        return {"Error, No such case exists"} #Return Error that it doesnt exist
    else:
        return caseObj.deleteCase()

def getCaseForLawyer(lawyerUsername : str):
    caseObj = CaseDetails()
    value = caseObj.getCasesFromLawyerId(lawyerUsername)
    return {"cases": value}

def getCaseDetailsFromId(caseID : str):
    caseObj = CaseDetails()
    value = caseObj.getCaseFromId(caseID)
    return value

def callNotification(assignedLawyers, casename,  username):
    title = "New Case"
    message = f"You have been added to a new case ({casename}) by {username}"
    for i in assignedLawyers:
        addNotificationforOneUser(i, message, title)

def getAssignedLawyersController(caseID):
    obj = CaseDetails()
    return {"Lawyers":obj.getAssignedLawyersForCase(caseID)}
