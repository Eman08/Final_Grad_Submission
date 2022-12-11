from ast import Str
import datetime
from pandas import array
import path
import sys
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent.parent)
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

def checkDupli(arr = array):
    i = 0 #Index first loop
    k = 0 #Index second loop, should always be declared inside second loop so its reinitialized
    while i < len(arr):
        while k < len(arr):
            if(i == k): # 0 == 0 if both indexes are same we dont want compare as it is first instance of word
                k = k + 1
                continue
            if(arr[i] == arr[k]): #Mg == Mg at other instance
                arr.remove(arr[k])
                continue
            k = k + 1
        k = 0
        i = i + 1
    return arr

class CaseDetails(object):
    def __init__(self, caseID = None, username = None, caseName = None, lawyers = None, description = None, docID = None, date = None, case_type=None, court_type=None):
        self.caseID = caseID
        self.username= username
        self.caseName = caseName
        self.lawyers = lawyers
        if(lawyers != None):
            self.lawyers.append(self.username)
            self.lawyers = checkDupli(self.lawyers)
        self.description = description #amazing typos
#        if(docID != None):
 #           self.docID = docID
  #      else:
        self.docID = []
        self.date = date
        self.case_type=case_type
        self.court_type=court_type


    def createCase(self):
        data={
            u'Createdby':self.username,
            u'CaseName':self.caseName,
            u'description':self.description,
            u'assignedLawyers':self.lawyers,
            u'DocIds' : self.docID,
            u'date':self.date,
            u'case_type':self.case_type,
            u'court_type':self.court_type
        }
        return_db().collection(u'Workflow').document(self.caseID).set({})
        return_db().collection(u'Cases').document(self.caseID).set(data)
        return_db().collection(u'GeneralDocuments').document(self.caseID).set({})

    def checkLawyers(self, username):
        lawyer = return_db().collection(u'laywers').document(username)
        lawyerGet = lawyer.get()
        if lawyerGet.exists:
            return "True"
        else:
            return "False"
    
    def createClientDetails(self, caseId, clientName, clientEmail, clientPhoneNumber, client_address,client_dob, opposing_party, opposing_address, opposing_counsel):
        obj = {
            "Client_Name": clientName,
            "Client_Email":clientEmail,
            "Client_PhoneNumber":clientPhoneNumber,
            "Client_Address":client_address,
            "Client_dob":client_dob,
            "Opposing_Party":opposing_party,
            "Opposing_address":opposing_address,
            "Opposing_Counsel":opposing_counsel
        }
        return_db().collection(u'Clients').document(caseId).set(obj)
        return {"Client has been created"}
    
    def getClientDetails(self, caseId):
        client = return_db().collection(u'Clients').document(caseId).get().to_dict()
        return client

    def getCaseId(self, caseId):
        caseIdInDataBase = return_db().collection(u'Cases').document(caseId)
        caseIdExists = caseIdInDataBase.get()
        if caseIdExists.exists:
            return "False"
        else:
            return "True"
    
    def deleteCase(self):
        return_db().collection(u'Cases').document(self.caseID).delete()
        return "Successfully deleted the case"
    
    def getCasesFromLawyerId(self, lawyerUsername):
        doc_ref = return_db().collection('Cases').stream()
        cases = []
        doc_info = []
        for doc in doc_ref:
            for var in doc.to_dict()["assignedLawyers"]:
                if var == lawyerUsername:
                    cases.append(doc.id)
        
        for var in cases:
            print(var)
            doc_ref = return_db().collection('Cases').document(var).get()
            case_details={}
            case_details["case_id"]=var
            case_details["case_name"]= doc_ref.to_dict()['CaseName']
            case_details["description"]= doc_ref.to_dict()['description']
            case_details['assigned_lawyers']= doc_ref.to_dict()['assignedLawyers']
            case_details["created_by"]=doc_ref.to_dict()['Createdby']
            case_details["date"]=doc_ref.to_dict()['date']
            doc_info.append(case_details)
    

        return doc_info
        
    
    def removeLawyerFromCase(self,username):
        docs = return_db().collection(u'Cases').stream()
        lawyerName = ""
        for doc in docs:
            #print(f'{doc.id}{doc.to_dict()["assignedlawyers"]}')
            for name in doc.to_dict()["assignedLawyers"]:
                if name == username:
                    lawyerName = username
            lawyer_update = return_db().collection(u'Cases').document(doc.id)
            print(lawyerName)
            lawyer_update.update({
                "assignedLawyers": firestore.ArrayRemove([lawyerName])
            })

    def getCaseFromId(self, caseID):
        docs = return_db().collection(u'Cases').document(caseID).get()
        return docs.to_dict()


    def getDocumentsForCase(self, caseID):
        maps = []
        docs = return_db().collection(u'Cases').document(caseID).get()
        document_ids = docs.to_dict()["DocIds"]
        if len(document_ids) != 0:
            for i in document_ids:
                var = []
                document_id = return_db().collection(u'Documents').document(i).get()
                var.append(document_id.to_dict()["doc_name"])
                gsurl = document_id.to_dict()["doc_url"]
                #if document_id.to_dict()["summariation"]:
                keys = [k for k, v in document_id.to_dict().items() if k=='summary']
                sliced = gsurl[13:len(gsurl)]
                signed_url = getSignedUrl(sliced)
                var.append(signed_url)
                if len(keys) == 1:
                    var.append(document_id.to_dict()["summary"][0])
                maps.append(var)

                #print(sliced)
        return maps
                
    def getAssignedLawyersForCase(self, caseID):
        doc_ref = return_db().collection('Cases').document(caseID).get()
        print(doc_ref.to_dict()["assignedLawyers"])
        return doc_ref.to_dict()["assignedLawyers"]

