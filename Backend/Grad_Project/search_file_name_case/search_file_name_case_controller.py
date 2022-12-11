from array import array
from venv import create
import jwt
import sys
import path
import sys
import datetime
import random, string
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from search_file_name_case.search_file_name_case_model import *

def getFilesBasedOnCase(caseID, filename):
    obj = searchFilesInCase(caseID)
    return obj.getFilesForAcase(filename)