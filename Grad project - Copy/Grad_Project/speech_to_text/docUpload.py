from ast import Str
from asyncio.windows_events import NULL
from email.mime import audio
from pandas import array
import path
import sys
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from db_connection import *
from google.cloud import speech
from google.cloud import storage
import os
import io
import datetime
from random import randint
os.environ['GOOGLE_APPLICATION_CREDENTIALS']= r'C:/Users/Eman/Desktop/Grad project/Grad_Project/gcloudconnection.json'

def uploadDoc1(path,caseID):
    storage_client = storage.Client()
    bucket = storage_client.bucket('lawflow')
    Today_date = datetime.datetime.now().strftime("%d_%m_%y %H %M %Y")
    docname = "DOCS/"+os.path.basename(path)+ Today_date
    blob = bucket.blob(docname)
    blob.upload_from_filename(path)
    checkCase = return_db().collection(u'Cases').document(caseID)
    if checkCase.get().exists:
        checkCase.update({u'docs': firestore.ArrayUnion([int(os.path.basename(blob.id))])})
    else:
        return "Case with such ID not found",404
    gslink = "gs://lawflow"+"/"+docname
    return uploadDB1(gslink,path,os.path.basename(blob.id))

def uploadDoc(AUDgslink,path,num, date):
    storage_client = storage.Client()
    bucket = storage_client.bucket('lawflow')
    name_of_File = path[6:path.rfind('_')]
    path = os.path.basename(path)
    blob = bucket.blob("S2T/"+name_of_File+date+"/" + path)

    blob.upload_from_filename(path)
    gslink = "gs://lawflow"+"/"+"S2T/"+name_of_File+date+"/"+path
    return uploadDB(AUDgslink, gslink,num)

def uploadDB1(gslink,path,num):
    data = {
            u'doc_name': os.path.basename(path),
            u'doc_url': gslink
        }
    return_db().collection(u'Documents').document(str(num)).set(data)
    return "Uploaded to DB"  

def uploadDB(audio_gslink,DOC_gslink,num):
    data = {
            u'audio': audio_gslink,
            u'has_audio': True,
            u'document': DOC_gslink,
        }
    return_db().collection(u'SPEECH_TO_TEXT').document(str(num)).set(data)
    return "Uploaded to DB" 


