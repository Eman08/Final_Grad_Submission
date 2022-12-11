from ast import Str
import datetime
from pandas import array
import path
import sys
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

class searchFilesInCase(object):
    def __init__(self, caseID = None):
        self.caseID = caseID
    
    def getFilesForAcase(self, filename):
        doc_array = []
        doc_ref = return_db().collection(u'Cases').document(self.caseID).get()
        for i in doc_ref.to_dict()["DocIds"]:
            temp_dict={}
            doc = return_db().collection(u"Documents").document(i).get()
            if(doc.to_dict()["doc_name"].__contains__(filename)):
                temp_dict["name"] = doc.to_dict()["doc_name"]
                temp_dict["summary"] = doc.to_dict()["summary"]
                gsurl = doc.to_dict()["doc_url"]
                sliced = gsurl[13:len(gsurl)]
                temp_dict["signed_url"] = getSignedUrl(sliced)
                doc_array.append(temp_dict)
        return doc_array
