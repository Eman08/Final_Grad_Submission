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
from models.model_case import *
from delete_files.delete_files_model import *

def deletefileController(fileID):
    obj = deleteFile()
    return obj.deleteFiles(fileID)