import uuid
import path
import sys
import json
import datetime
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from db_connection import *
from google.cloud import storage


def getSignedUrl(filename):
       storage_client = storage.Client.from_service_account_json('lawflow-new.json')
       bucket = storage_client.bucket('lawflow')
       blob = bucket.blob(filename)
       url = blob.generate_signed_url(
            version="v4",
            # This URL is valid for 15 minutes
            expiration=datetime.timedelta(hours=2),
            # Allow GET requests using this URL.
            method="GET",
        )
       return url



class AddDocuments(object):
    def __init__(self, caseID=None, name =None, time=None, type = None, gsutil = None ):
        self.caseID = caseID
        self.name = name
        self.time = time
        self.type = type
        self.gsutil = gsutil
    
    def addDetails(self):
        obj= {
            "gsutil":self.gsutil,
            "time":self.time,
            "name":self.name,
            "type":self.type
        }

        ref = return_db().collection(u'GeneralDocuments').document(self.caseID)
        ref.update({f'{self.type}': obj})
        return {"Success":"Document has been added"}
    
    def deleteDocument(self, type, caseID):
        ref = return_db().collection(u'GeneralDocuments').document(caseID)
        ref.update({f'{type}':firestore.DELETE_FIELD})
        return {"Success":"Document Deleted"}


    def getAllDocuments(self, caseId):
        dict=[]
        ref = return_db().collection(u'GeneralDocuments').document(caseId).get()
        for docs in ref.to_dict():
            temp_dict={}
            temp_dict["name"]=ref.to_dict()[docs]["name"]
            temp_dict["time"] = ref.to_dict()[docs]["time"]
            gsutil = ref.to_dict()[docs]["gsutil"]
            sliced = gsutil[13:len(gsutil)]
            temp_dict["url"] = getSignedUrl(sliced)
            dict.append(temp_dict)
        return dict

    def getPdfDocuments(self, username):
        ref = return_db().collection(u'Cases').stream()
        docIds = []
        dict = []
        for doc in ref:
            for i in doc.to_dict()["assignedLawyers"]:
                if i == username:
                    for j in doc.to_dict()["DocIds"]:
                        docIds.append(j)
        
        for i in docIds:
            ref_docs = return_db().collection(u'Documents').document(i).get()
            filename = ref_docs.to_dict()["doc_name"]
            temp_dict = {}
            if filename.rsplit('.',1)[1] == "pdf" or filename.rsplit('.',1)[1] == "PDF":
                temp_dict["filename"] = filename
                temp_dict["id"] = i
                temp_dict["summary"] = ref_docs.to_dict()["summary"]
                gsutil = ref_docs.to_dict()["doc_url"]
                sliced = gsutil[13:len(gsutil)]
                temp_dict["url"] = getSignedUrl(sliced)
                dict.append(temp_dict)

        return dict

    def checkIfDocTranslated(self, docId):
        dict = []
        ref = return_db().collection(u'Documents').document(docId).get()
        if ref.to_dict()["Translated"][0] == "None" or ref.to_dict()["Translated"] == "None":
            return {"Error":"False"}, 200
        
        else:
            temp_dict={}
            gsutil = ref.to_dict()["Translated"][0]
            sliced = gsutil[13:len(gsutil)]
            temp_dict["url"] = getSignedUrl(sliced)
            temp_dict["name"] = ref.to_dict()["doc_name"]
            dict.append(temp_dict)
            return dict
    

