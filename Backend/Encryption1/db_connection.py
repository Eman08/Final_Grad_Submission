import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# cred = credentials.Certificate("Grad_Project/lawflow.json")
# firebase_admin.initialize_app(cred)

# db=firestore.client()
def initialize_app():
    #cred = credentials.Certificate("C:/Users/SHAMS/Desktop/twilio/LoginModule/Grad_Project-1/lawflow.json")
    cred = credentials.Certificate("Grad_Project\lawflow.json")
    firebase_admin.initialize_app(cred)
    print("---Connecting to database...---")

def return_db():
    # cred = credentials.Certificate("C:/Users/Eman/Desktop/Grad project/Grad_Project/lawflow.json")
    # firebase_admin.initialize_app(cred)
    db=firestore.client()   
    print("---Retrieving Collection---") 
    return db




initialize_app()