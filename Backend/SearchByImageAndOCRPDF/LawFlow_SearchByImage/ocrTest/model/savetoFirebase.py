from ast import Str
import imp
import json
import path 
import sys
import datetime
from google.cloud import storage
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent.parent)
from db_connection import *
#from ocrTest.controller.getOcrText import *
from ocrTest.controller.ocr1 import getOCRTokenize
from ocrTest.controller.OCRforNLP import *


def storeToFirebase(gsutil,idds,urlFileName,words,namedEntity):
    
    summary=getOCRTokenize(gsutil,idds)
    data={
        u'doc_name' : urlFileName,
        u'doc_url' :  gsutil,
        u'keywords':  words,
        u'summary':summary,
        u'Date': datetime.datetime.now(),
        u'named_entities':namedEntity,
        u'Translated':"None"
        
    }
    
    return_db().collection(u'Documents').document(idds).set(data)


def updateToFirestore(category,idds,caseid):
    docUpdate=return_db().collection(u'Documents').document(idds)
    docUpdate.update({u'category': firestore.ArrayUnion([category])})
    caseUpdate=return_db().collection(u'Cases').document(caseid)
    caseUpdate.update({u'DocIds':firestore.ArrayUnion([idds])})
