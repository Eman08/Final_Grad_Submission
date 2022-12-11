from ast import Str
import json
import path 
import sys
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent.parent)
from db_connection import *


categoryDict={}
def getCategories():
    doc_ref= return_db().collection(u'Categories').stream()
    for doc in doc_ref:
        v=list(doc.to_dict().values())
        for i in v:
            categoryDict[doc.id]=i
    return categoryDict



