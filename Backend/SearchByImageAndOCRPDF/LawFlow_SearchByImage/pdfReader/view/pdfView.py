import imp
import json
import datetime
import sys
import os
from unicodedata import category
from flask import Flask, request, json, Blueprint
import time
import path
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent.parent)
from ocrTest.controller.uploadtobucket import *
from pdfReader.controller.getPDFtext import *
from pdfReader.pdfMain import*
from pdfReader.model.FirebasePdf import *
from flask_restful import Resource, Api, reqparse
from google.cloud import storage


os.environ["GCLOUD_PROJECT"] = "lawflow-1afd9"

# app = Flask(__name__)
# api = Api(app)

pdf = Blueprint('pdf',__name__, url_prefix='/pdf')

@pdf.route("/getpdf",methods=["POST"])

def postPDF():
    data=json.loads(request.data)
    time.sleep(1)
    # url=data["url"]
    
    #get name and time of the uploaded file
    #combine name and time with the PDF/ so it matches path in bucket
    #uses path to find the file in bucket and download it locally for PDFreader to work on it
    #use gsutil path to find the id of the file and store id to firestore
    #remove the locally downloaded File
    #
    
    
    
    name=data["name"]                                              
    uploadtime=data["time"]
    
    nameWithDT="OCR/"+uploadtime+name               #pdf file being stored under OCR folder
    storage_client = storage.Client()
    bucket = storage_client.bucket('lawflow')
    blob=bucket.get_blob(nameWithDT)
    #blob.download_to_filename(time+name)
    #PDFpath=time+name
    gsutil = "gs://lawflow/"+nameWithDT
    url=getSignedUrl(nameWithDT)
    #initialize_app()
    idslice=blob.id.split("/")
    idds=idslice[len(idslice)-1]
    #storeToFirebasePDF(gsutil,idds,name,url)
    
    return [matchwithCategoryPDF(url,gsutil,idds,name),idds]

@pdf.route("/pickPDFcate",methods=["POST"]) 

def getCate():
    data=json.loads(request.data)
    time.sleep(1)
    category=data["category"]
    idds=data["idds"]
    caseid=data["caseid"]
    
    updateToFirestorePDF(category,idds,caseid)
    return "updated firestore"

#app.run()



