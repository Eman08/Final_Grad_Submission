from venv import create
import jwt
import sys
import path
import sys
import datetime
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from models.model_login import *
from controller.controller_signup import *

def checkUserRecord(username : str, password : str):
    objLogin = LawyerSignIn(username) #Create temp object with username
    if(objLogin.getLawyer() == 'true'):
        return authenticateUser(username,password)
    else:
        return {"Error":"Incorrect Credentials"},404

def authenticateUser(username : str, password : str):
    objLogin = LawyerSignIn(username) #Create temp object with username
    authenticateExists = objLogin.checkPassword(password) #Returns true or false depending on password entered by user
    if(authenticateExists):
        print("Correct password, ACCESS GRANTED")
        token = createToken(username)
        return {"access_token": token}
    else:
        print("Wrong password, ACCESS DENIED")
        return {"Error": "Incorrect Credentials"},404
def deleteUser(username:str):
    objLogin = LawyerSignIn(username) #Create temp object with username
    if(objLogin.getLawyer() == 'true'):
        objLogin.deleteLawyer(username)
        return "Deleted user from records!",200
    else:
        return {"Error":"Lawyer doesnt exist"},404

def getSignedImageUrl(username:str):
    objLogin = LawyerSignIn()
    return {"Signed_url": objLogin.getProfileSignedLink(username)}

def getLawyerDetailsController(username:str):
    obj = LawyerSignIn()
    return obj.getLawyerDetails(username)

#print(checkUserRecord("Es110","10/10/2000")) #True Scenario
#print(checkUserRecord("kwoderShaad","321Test")) #True Scenario
#checkUserRecord("kwoderShaad","321Tes$") #False Scenario
