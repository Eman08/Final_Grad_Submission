from venv import create
import jwt
import sys
import path
import sys
import datetime
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from models.model_login import *
def checkusername(username: str,email:str, dob: str, password:str,firstname:str,lastname:str):
    objCheckUserSignUp = LawyerSignIn(username, email, dob, password,"","")
    usernameExists = objCheckUserSignUp.getLawyer()
    if(usernameExists == 'true'):
        return "true"
    else:
        return "false"
def checkUserSignUp(username: str, email:str, dob: str, password:str,imagePath:str,firstname:str,lastname:str):
    imagePathData = ""
    if imagePath == "":
        imagePathData = ""
    else:
        imagePathData = imagePath
    objCheckUserSignUp = LawyerSignIn(username, email, dob, password,firstname,lastname)
    val = objCheckUserSignUp.getLawyer()
    if(val == 'true'):
        return {"Error":"Username already in use"},404
    else:
        check=objCheckUserSignUp.EmailCheck()
        if(check=='true'):
            return {"Error": "Email is already in use"},404
    objCheckUserSignUp.setLawyer()
    if(imagePathData != ""):
        objCheckUserSignUp.checkBucket()
    token=createToken(username)
    return {"access_token": token}


def createToken(username:str):
    today = datetime.datetime.now()
    date_time = round(today.timestamp())
    expire_time = datetime.datetime.now() + datetime.timedelta(hours = 24)
    expire_time= round(expire_time.timestamp())
    objCheckUserSignUp= LawyerSignIn()
    val= objCheckUserSignUp.getLawyerProperties(username)
    token = jwt.encode({"email": val[0], "username":val[1], "created_at":str(date_time), "expire_time": str(expire_time)},"secret", algorithm="HS256")
    return token
#checkUserSignUp("dsjksjds","punjabi","sdkskd","sdnjdsn","","njdsjnsd","dmsooas")