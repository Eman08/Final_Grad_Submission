import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import path
import sys
import urllib.parse
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent)
print(directory.parent)

def initialize_app():
    cred = credentials.Certificate('lawflow.json')

    firebase_admin.initialize_app(cred)
    print("---Connecting to database...---")

def return_db():

    # cred = credentials.Certificate("C:/Users/Eman/Desktop/Grad project/Grad_Project/lawflow.json")
    # firebase_admin.initialize_app(cred)
    db=firestore.client()   
    return db
