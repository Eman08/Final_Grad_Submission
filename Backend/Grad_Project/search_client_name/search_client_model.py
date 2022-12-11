from ast import Str
import datetime
from pandas import array
import path
import sys
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from db_connection import *
from google.cloud import storage

class client_search(object):
    def __init__(self, client_name = None):
        self.clientName = client_name
    
    def getClientSearchResult(self):
        return_result = []
        doc_ref = return_db().collection(u'Clients').stream()
        for doc in doc_ref:
            if doc.to_dict()["Client_Name"] == self.clientName:
                temp_dict = {}
                print(doc.id)
                doc_case = return_db().collection(u'Cases').document(doc.id).get()
                temp_dict["case_name"] = doc_case.to_dict()["CaseName"]
                temp_dict["description"] = doc_case.to_dict()["description"]
                temp_dict["court_type"] = doc_case.to_dict()["court_type"]
                temp_dict["case_type"] = doc_case.to_dict()["case_type"]
                return_result.append(temp_dict)
        return return_result

