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
from search_client_name.search_client_model import *

def getClientDetails(clientName:str):
    obj = client_search(clientName)
    return obj.getClientSearchResult()