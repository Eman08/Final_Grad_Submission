import sys
import path
import datetime
from google.cloud import storage

directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)

from db_connection import *
#initialize_app()

def getSignedUrl(filename):
    storage_client = storage.Client.from_service_account_json('lawflow-new.json')
    bucket = storage_client.bucket('lawflow')
    blob = bucket.blob(f'{filename}')
    print(blob.exists())
    url = blob.generate_signed_url(
        version="v4",
        # This URL is valid for 15 minutes
        expiration=datetime.timedelta(hours=2),
        # Allow GET requests using this URL.
        method="GET",
    )

    return url


def getDocs(tagToSearch, name):
    doc_details = {}
    doc_id =[]
    tagToSearch=tagToSearch.lower()
    toSeachList=tagToSearch.split()
    returnDocList=[]
    doc = return_db().collection(u'Cases').stream()
    for var in doc:
        for lawyer in var.to_dict()["assignedLawyers"]:
            if lawyer == name:
                for docIds in var.to_dict()["DocIds"]:
                    doc_id.append(docIds)
                
              
    for i in doc_id:
        doc=return_db().collection(u'Documents').document(i)
        getkeyword=doc.get({u'keywords'})
        words=getkeyword.to_dict()['keywords']
        check=all(w in words for w in toSeachList)

        if check:
            returnDocList.append(i)
    returnDocList=list(dict.fromkeys(returnDocList)) 
    endResult="Result Found"
    if not returnDocList:
        endResult="No result Found"
        
    if endResult=="Result Found":
         for var in returnDocList:
             doc = return_db().collection(u'Documents').document(var).get()
             name_doc = doc.to_dict()["doc_url"]
             url = getSignedUrl(name_doc[13:len(name_doc)])
             doc_details["name"] = doc.to_dict()["doc_name"]
             doc_details["url"]= url
    print(doc_details)
    return [doc_details,endResult]

