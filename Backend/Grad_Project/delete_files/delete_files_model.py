import operator
from flask import Flask, request, json, Blueprint
from flask_restful import Resource, Api, reqparse
import path
import time
import sys
import datetime
import random
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from db_connection import *
from datetime import datetime

class deleteFile(object):
    def __init__(self, fileId=None):
        self.fileID = fileId
    

    def deleteFiles(self, fileId):
        doc_cases = return_db().collection(u'Cases').stream()
        for doc in doc_cases:
            for i in doc.to_dict()["DocIds"]:
                if i == fileId:
                    return_db().collection(u'Cases').document(doc.id).update({u"DocIds": firestore.ArrayRemove([i])})
            
        return_db().collection(u'Documents').document(fileId).delete()
        return {"Success":"File has been deleted"}

