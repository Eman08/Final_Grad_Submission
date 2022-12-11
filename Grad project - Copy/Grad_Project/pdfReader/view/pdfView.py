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


os.environ["GCLOUD_PROJECT"] = "lawflow-3c5b7"

pdf = Blueprint('pdfReader',__name__, url_prefix='/scanPdf')
@pdf.route("/getpdf",methods=["POST"])

def postPDF():
    data=json.loads(request.data)
    time.sleep(1)
    url=data["url"]
    tempurl=url.split("/")
    fileName=tempurl[len(tempurl)-1]
    now=datetime.datetime.now()
    dt_string=now.strftime("%d_%m_%Y %H_%M_%S")
    nameWithDT="PDF/"+dt_string+fileName
    upload_blob("lawflow",url,nameWithDT)
    storage_client = storage.Client()
    bucket = storage_client.bucket('lawflow')
    blob=bucket.get_blob(nameWithDT)
    blob.download_to_filename(dt_string+fileName)
    PDFpath=dt_string+fileName
    gsutil = "gs://lawflow/"+nameWithDT
    #strToList(gcs_pdf_path)
    storage_client=storage.Client()
    bucket = storage_client.bucket("lawflow")
    blob = bucket.get_blob(nameWithDT)
    idslice=blob.id.split("/")
    idds=idslice[len(idslice)-1]
    storeToFirebasePDF(gsutil,idds,fileName,PDFpath)
    
    return [matchwithCategoryPDF(PDFpath),idds], os.remove(dt_string+fileName)

@pdf.route("/pickPDFcate",methods=["POST"]) 

def getCate():
    data=json.loads(request.data)
    time.sleep(1)
    category=data["category"]
    idds=data["idds"]
    caseid=data["caseid"]
    
    updateToFirestorePDF(category,idds,caseid)
    return "updated firestore"

