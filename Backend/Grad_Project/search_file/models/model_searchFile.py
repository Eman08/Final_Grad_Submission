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

class Lawyersearch(object):
    def __init__(self, userName = None, filename = str) :
        self.userName = userName
        self.filename = filename
        self.casesAssignedTo = []
        self.documents = []
        self.cases = []

    def findCases(self):
        listLawyers = []
        doc_ref= return_db().collection(u'Cases').stream()
        for doc in doc_ref:
            listLawyers = (doc.to_dict()["assignedLawyers"])
            for x in range(len(listLawyers)):
                if listLawyers[x] == self.userName:
                    self.casesAssignedTo.append(doc.id)
        #print(self.casesAssignedTo)  
        listLawyers = []
        
    def findDocuments(self):
        listDocument = []
        for x in range(len(self.casesAssignedTo)):
            doc_ref= return_db().collection(u'Cases').document(self.casesAssignedTo[x])
            listDocument = doc_ref.get().to_dict()["DocIds"]
            for i in range(len(listDocument)):
                self.cases.append(self.casesAssignedTo[x])
                self.cases.append(listDocument[i])
                self.documents.append(listDocument[i])
        listDocument = []

    def searchList(self):
            glob = 0
            result = []
            caseID = ""
            casename = ""
            for i in range(len(self.documents)):
                doc_ref= return_db().collection(u'Documents').document(self.documents[i])
                docname = doc_ref.get().to_dict()["doc_name"]
                index = docname.rfind('.')
                if self.filename.lower() in docname[0:index].lower():
                    glob = 1                       
                    gsurl = doc_ref.get().to_dict()["doc_url"]
                    result.append(gsurl[13:len(gsurl)])
                    for j in range(len(self.cases)):
                          if self.cases[j] == self.documents[i]:
                            caseID = self.cases[j-1]
                            casename = return_db().collection(u'Cases').document(caseID).get().to_dict()["CaseName"]
                    result.append(casename+"/"+docname)
            print(result)
            if(glob == 1):
                return result
            else:
                return 'false'
# if(f'{doc.to_dict()["assignedLawyers"]}'.__eq__(self.email)):
              #  return 'true'
        #return 'false'

#objCheckUserSignUp = LawyerSignIn("FormData123", "KeepTesting123@gmail.com", "24/09/2001", "TEST123")
#objCheckUserSignUp.checkBucket()
