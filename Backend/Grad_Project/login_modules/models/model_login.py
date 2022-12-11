from ast import Str
import json
import bcrypt
import path
import sys
import os
from google.cloud import storage
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent.parent)
from db_connection import *
from case_structuring.models.model_case import *
os.environ['GOOGLE_APPLICATION_CREDENTIALS']= 'gcloudconnection.json'


class LawyerSignIn(object):
    def __init__(self, userName = None, email = None, DOB = None, password = str, FirstName = None,LastName = None) :
        self.userName = userName
        self.email = email
        self.DOB = DOB
        salt = bcrypt.gensalt() #Generating salt
        self.bytes = password.encode('utf-8')
        self.hashPassword = bcrypt.hashpw(self.bytes, salt)
        self.FirstName = FirstName
        self.LastName = LastName

    def setLawyer(self):
        data = {
            u'FirstName': self.FirstName,
            u'LastName': self.LastName,
            u'username': self.userName,
            u'email': self.email,
            u'DOB': self.DOB,
            u'profileLink':"",
            u'password': self.hashPassword.decode('utf-8'),
            u'todolist':[]
            }
        
        
        return_db().collection(u'laywers').document(self.userName).set(data)
        return_db().collection(u'Notification').document(self.userName).set({u'Notifs':[]})

    def getLawyer(self): #checks for a single lawyer
        check = 'false'
        doc_ref= return_db().collection(u'laywers').document(self.userName)
        doc = doc_ref.get()
        if doc.exists:
           check = 'true'
           return check
        else:
           check ='false'
           return check

    def EmailCheck(self): #checks for emails of all lawyers
        doc_ref= return_db().collection(u'laywers').stream()
        for doc in doc_ref:
            if(f'{doc.to_dict()["email"]}'.__eq__(self.email)):
                return 'true'
        return 'false'
        
    def checkPassword(self,password = str): #Object and a password that is to be verified is provided
        doc_ref= return_db().collection(u'laywers').document(self.userName)
        doc = doc_ref.get() 
        DBpass = f'{doc.to_dict()["password"]}' #Get passwordhash of specific lawyer
        DBpass = DBpass.encode('utf-8') #Encode it as the record is stored as string
        # encoding user password
        userBytes = password.encode('utf-8')
        # checking 
        result = bcrypt.checkpw(userBytes, DBpass)#get the pwd from db, rn we are using the same password uploaded to db
        return result

    def getLawyerProperties(self, username=str):
        doc_ref= return_db().collection(u'laywers').document(username)
        doc = doc_ref.get()
        values=[]
        if doc.exists:
            values.append(f'{doc.to_dict()["email"]}')
            values.append(f'{doc.to_dict()["username"]}')
            return values
        else:
            return "Sorry this username doesnt exist"

    def deleteLawyer(self, username=str):
        return_db().collection(u'laywers').document(username).delete()
        obj = CaseDetails()
        obj.removeLawyerFromCase(username)
        
    def checkBucket(self):
        storage_client = storage.Client()
        bucket_name = "lawflow"
        destination_blob_name = "PICS/pic_"+self.userName+".jpg"
        bucket = storage_client.bucket(bucket_name)
        blob = bucket.blob(destination_blob_name)
        #blob.upload_from_filename(self.imageURL)   DONT UPLOAD, From front end
        print(blob.exists())
        if(blob.exists()):
            gslink = "gs://"+bucket_name+"/"+destination_blob_name
            UpdateProfile = return_db().collection(u'laywers').document(self.userName)
            UpdateProfile.update({u'profileLink': gslink})
        
    def getProfileSignedLink(self, username):
        doc_ref = return_db().collection(u'laywers').document(username).get()
        profile_link = doc_ref.to_dict()["profileLink"]
        print(profile_link)
        sliced = profile_link[13:len(profile_link)]
        storage_client = storage.Client.from_service_account_json('lawflow-new.json')
        bucket = storage_client.bucket('lawflow')
        blob = bucket.blob(sliced)
        url = blob.generate_signed_url(
            version="v4",
            # This URL is valid for 15 minutes
            expiration=datetime.timedelta(hours=24),
            # Allow GET requests using this URL.
            method="GET",
        )
    
        return url

    def getLawyerDetails(self, username):
        doc_ref = return_db().collection(u'laywers').document(username).get()
        return doc_ref.to_dict()


