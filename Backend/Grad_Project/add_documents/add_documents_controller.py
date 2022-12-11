import path
import sys
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from add_documents_model import *


def addDocuments(caseID, name, time, type, gsutil):
    obj = AddDocuments(caseID,name,time,type,gsutil)
    return obj.addDetails()

def deleteDocument(type, caseID):
    obj = AddDocuments()
    return obj.deleteDocument(type,caseID)

def getDocuments(caseId):
    obj = AddDocuments()
    return obj.getAllDocuments(caseId)

def getPdfDocumentsController(username):
    obj = AddDocuments()
    return obj.getPdfDocuments(username)

def checkForTranslatedDoc(docid):
    obj = AddDocuments()
    return obj.checkIfDocTranslated(docid)