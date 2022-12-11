#from crypt import methods
import json
import datetime
import path 
import sys
import os
from flask import Flask, request, json, Blueprint
import time
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from controller.uploadtobucket import *
from controller.ocr1 import *
from controller.getOcrText import *
from google.cloud import storage
from model.savetoFirebase import *
from flask_restful import Resource, Api, reqparse

os.environ["GCLOUD_PROJECT"] = "lawflow-3c5b7"


ocr = Blueprint('ocr',__name__, url_prefix='/ocr')
@ocr.route("/getimageCat",methods=["POST"])

def getimage():
    data=json.loads(request.data)
    time.sleep(1)
    #url=data["url"]
    name=data["name"]
    dtime=data["time"]
    nameWithDT="OCR/"+dtime+name
    #prnt(url)
    # templist=url.split("/")
    # urlFileName=templist[len(templist)-1]
    # today=datetime.datetime.now()
    # dt_string = today.strftime("%d_%m_%Y %H_%M_%S")
    # nameWithDT="OCR/"+urlFileName+dt_string
    # upload_blob("lawflow",url,nameWithDT)
    #gs://lawflow/OCR/test2.jpeg30_08_2022 19_33_38
    gsutil="gs://lawflow/"+nameWithDT
    #getOCRlist(gsutil)
    storage_client=storage.Client()
    bucket = storage_client.bucket("lawflow")
    blob = bucket.get_blob(nameWithDT)
    #print(blob.id)
    idslice=blob.id.split("/")
    idds=idslice[len(idslice)-1]
    #newpath="https://storage.googleapis.com/storage/v1/"+nameWithDT
    #storeToFirebase(gsutil,idds,name)
    return [matchWithCategory(gsutil,idds,name),idds]
#app.run()


@ocr.route("/pickCat",methods=["POST"])
def multCat():
    data=json.loads(request.data)
    time.sleep(1)
    category=data["category"]
    idds=data["idds"]
    caseid=data["caseid"]
    
    updateToFirestore(category,idds,caseid)
    return "updated" 


