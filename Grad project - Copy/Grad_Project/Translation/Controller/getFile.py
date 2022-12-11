from ast import Str
from fileinput import filename
import os
import json
import path 
import time
import sys
import datetime
from google.cloud import storage
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from db_connection import *


os.environ["GCLOUD_PROJECT"] = "lawflow-3c5b7"


#initialize_app()
def getDocNameFromId(idd):
    doc_ref=return_db().collection(u'Documents').document(idd)
    getGutil=doc_ref.get({u'doc_url'})
    DocUrl=getGutil.to_dict()['doc_url']
    docUrlList=DocUrl.split('/')
    docName=docUrlList[len(docUrlList)-1]
    return docName,DocUrl

#1662284972374343

#print(getDocNameFromId("1663507176553456")[0])

def donwloadFromBucket(idd):
    fileName=getDocNameFromId(idd)[0]
    time.sleep(1)
    storage_client = storage.Client()
    bucket = storage_client.bucket('lawflow')
    blob=bucket.get_blob("PDF/"+fileName)
   
    now=datetime.datetime.now()
    #dt_string=now.strftime("%d_%m_%Y %H_%M_%S")
    blob.download_to_filename(fileName)
    return(fileName)


#donwloadFromBucket("1662284972374343")