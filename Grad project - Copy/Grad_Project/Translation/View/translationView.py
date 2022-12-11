import imp
import json
import datetime
import sys
import os
from flask import Flask, request, json, Blueprint
import time
import path
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
print(directory.parent.parent)
from flask_restful import Resource, Api, reqparse
from google.cloud import storage
#from Translation import *
from Controller.getFile import *
from Model.updateFirestore import *
from Controller.Translation import *
os.environ["GCLOUD_PROJECT"] = "lawflow-new"


Translation = Blueprint('translate',__name__, url_prefix = '/translate')

@Translation.route("/translateDoc",methods=["POST"])

def translateDoc():
    data=json.loads(request.data)
    time.sleep(1)
    idd=data["idd"]
    docName,Docurl=getDocNameFromId(str(idd))
    batch_translate_document(str(Docurl),"gs://lawflow/Translate/"+str(idd)+'/',"lawflow-3c5b7")
    newGsutil="gs://lawflow/Translate/"+str(idd)+'/'+"lawflow_OCR_"+str(docName)[:-4]+"_ar-AR_translation.pdf"
    fileBlobName=str("Translate/"+str(idd)+'/'+"lawflow_OCR_"+str(docName)[:-4]+'_ar-AR_translation.pdf')
    updateToFirestoreTranslate(newGsutil,idd)
    
    set_blob_metadata('lawflow', fileBlobName )
    
    return {"Success":"Updated and Translated"}

    
    