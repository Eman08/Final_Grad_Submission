from ast import Str
import datetime
from pandas import array
import path
import sys
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


class filter(object):
    def __init__(self, username= None):
        self.username = username
    
    def filterBasedOnDate(self, username, date):
        cases = []
        doc_info=[]
        doc_ref = return_db().collection(u'Cases').stream()
        for doc in doc_ref:
            for var in doc.to_dict()["assignedLawyers"]:
                if var == username:
                    cases.append(doc.id)
        format = '%Y-%m-%d'
        for var in cases:
            temp_map = {}
            doc_cases = return_db().collection(u'Cases').document(var).get()
            if date == datetime.datetime.strptime(doc_cases.to_dict()["date"], "%d/%m/%Y").strftime("%Y-%m-%d"):
                case_details={}
                case_details["case_id"]=var
                case_details["case_name"]= doc_cases.to_dict()['CaseName']
                case_details["description"]= doc_cases.to_dict()['description']
                case_details['assigned_lawyers']= doc_cases.to_dict()['assignedLawyers']
                case_details["created_by"]=doc_cases.to_dict()['Createdby']
                case_details["date"]=doc_cases.to_dict()['date']
                doc_info.append(case_details)
        return {"cases":doc_info}

    def getByCourtType(self, username, courtType):
        doc_info = []
        cases = []
        case_map=[]
        doc_ref = return_db().collection(u'Cases').stream()
        for doc in doc_ref:
            for var in doc.to_dict()["assignedLawyers"]:
                if var == username:
                    cases.append(doc.id)
        for var in cases:
            doc_cases = return_db().collection(u'Cases').document(var).get()
            if courtType == doc_cases.to_dict()["court_type"]:
                case_details={}
                case_details["case_id"]=var
                case_details["case_name"]= doc_cases.to_dict()['CaseName']
                case_details["description"]= doc_cases.to_dict()['description']
                case_details['assigned_lawyers']= doc_cases.to_dict()['assignedLawyers']
                case_details["created_by"]=doc_cases.to_dict()['Createdby']
                case_details["date"]=doc_cases.to_dict()['date']
                doc_info.append(case_details)

        return {"cases":doc_info}


    def getByCaseType(self, username, caseType):
        cases = []
        doc_info = []
        doc_ref = return_db().collection(u'Cases').stream()
        for doc in doc_ref:
            for var in doc.to_dict()["assignedLawyers"]:
                if var == username:
                    cases.append(doc.id)

        for var in cases:
            case_details={}
            doc_cases = return_db().collection(u'Cases').document(var).get()
            if caseType == doc_cases.to_dict()["case_type"]: 
                 case_details={}
                 case_details["case_id"]=var
                 case_details["case_name"]= doc_cases.to_dict()['CaseName']
                 case_details["description"]= doc_cases.to_dict()['description']
                 case_details['assigned_lawyers']= doc_cases.to_dict()['assignedLawyers']
                 case_details["created_by"]=doc_cases.to_dict()['Createdby']
                 case_details["date"]=doc_cases.to_dict()['date']
                 doc_info.append(case_details)

        return {"cases":doc_info}

    def filterByCaseDates(self, docID, date_sent):
        doc = []
        doc_ref = return_db().collection(u'Documents').document(docID).get()
        date = doc_ref.to_dict()["Date"]
        format = '%Y-%m-%d'
        datetime.datetime.strptime(input, format)
        if date_sent == str(datetime.datetime.strptime(input, format)):
            dict={}
            dict["name"] = doc_ref.to_dict()["doc_name"]
            gsutil = doc_ref.to_dict()["doc_url"]
            sliced = gsutil[13:len(gsutil)]
            dict["url"] = getSignedUrl(sliced)
            dict["summary"] = doc_ref.to_dict()["summary"]
            doc.append(dict)
        return doc
        
    def filterByAlphabeticAZ(self, caseID):
        docs_sub = []
        doc_case = return_db().collection(u'Cases').document(caseID).get()
        docs = doc_case.to_dict()["DocIds"] 
        for i in docs:
            doc_ref = return_db().collection(u'Documents').document(i).get()
            dict={}
            dict["name"] = doc_ref.to_dict()["doc_name"]
            gsutil = doc_ref.to_dict()["doc_url"]
            sliced = gsutil[13:len(gsutil)]
            dict["url"] = getSignedUrl(sliced)
            dict["summary"] = doc_ref.to_dict()["summary"]
            docs_sub.append(dict)
        
        newlist = sorted(docs_sub, key=lambda d: d['name']) 
        return newlist

    def filterByAlphabeticZA(self, caseID):
        docs_sub = []
        doc_case = return_db().collection(u'Cases').document(caseID).get()
        docs = doc_case.to_dict()["DocIds"] 
        for i in docs:
            doc_ref = return_db().collection(u'Documents').document(i).get()
            dict={}
            dict["name"] = doc_ref.to_dict()["doc_name"]
            gsutil = doc_ref.to_dict()["doc_url"]
            sliced = gsutil[13:len(gsutil)]
            dict["url"] = getSignedUrl(sliced)
            dict["summary"] = doc_ref.to_dict()["summary"]
            docs_sub.append(dict)
        
        newlist = sorted(docs_sub, key=lambda d: d['name'], reverse=True) 
        print(newlist)
        return newlist
