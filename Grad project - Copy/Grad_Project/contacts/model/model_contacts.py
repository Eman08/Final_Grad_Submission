
from ast import Str
import json
import bcrypt
import path
import sys
import random
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent.parent)
from db_connection import *
#initialize_app()

class Contact(object):
    def __init__(self, username = None, contactName = None, contactId = None,contactPhno = None, contactEmail = None) :
        self.username = username
        self.contactName = contactName
        self.contactId = contactId
        self.contactPhno = contactPhno
        self.contactEmail = contactEmail
        
    def setContact(self):
        data = {
            u'contactName': self.contactName,
            u'contactId': self.contactId,
            u'contactPhno': self.contactPhno,
            u'contactEmail': self.contactEmail
            }

        return_db().collection(u'Contacts').document(self.contactId).set(data)
        return_db().collection(u'laywers').document(self.username).update({u'contacts': firestore.ArrayUnion([self.contactId])})
        return "Contact added!"

    def getContact(self): 
        doc_ref= return_db().collection(u'laywers').document(self.username).get()

        for doc in doc_ref.to_dict()["contacts"]:
            doc_contacts = return_db().collection(u'Contacts').document(doc).get()
            print(doc_contacts.to_dict())

        
    
    def PhnoCheck(self, checkPhno = str): 
        doc_ref= return_db().collection(u'laywers').document(self.username).get()
      
        for doc in doc_ref.to_dict()["contacts"]:
            doc_contacts = return_db().collection(u'Contacts').document(doc).get()
            if doc_contacts.to_dict()["contactPhno"] == checkPhno:
                print(doc_contacts.to_dict())
            else:
                return "Not found!"

    def EmailCheck(self, checkEmail = str ): 
        doc_ref= return_db().collection(u'laywers').document(self.username).get()
     

        for doc in doc_ref.to_dict()["contacts"]:
            doc_contacts = return_db().collection(u'Contacts').document(doc).get()
            if doc_contacts.to_dict()["contactEmail"] == checkEmail:
                print(doc_contacts.to_dict())
            else:
                return "Not found!"
    
    def NameCheck(self, checkName = str ): 
        doc_ref= return_db().collection(u'laywers').document(self.username).get()
        contact_array = []

        for doc in doc_ref.to_dict()["contacts"]:
            doc_contacts = return_db().collection(u'Contacts').document(doc).get()
            if doc_contacts.to_dict()["contactName"] == checkName:
                print(doc_contacts.to_dict())
            else:
                return "Not found!"


    def getSingleContact(self, id=str):
        doc_ref= return_db().collection(u'laywers').document(self.username).get()
        for doc in doc_ref.to_dict()["contacts"]:
            if doc == id:
                doc_contacts = return_db().collection(u'Contacts').document(doc).get()
                print(doc_contacts.to_dict())

       
        
    
    def getContactId(self, id = str):
        doc_ref= return_db().collection(u'laywers').document(self.username).get()
        contact_array = []       
        for doc in doc_ref.to_dict()["contacts"]:
            contact_array.append(doc)
        for value in contact_array:
            if value == id:
                return "False"
        return "True"    
    
    def deleteContact(self, contactId = str):
        doc_ref= return_db().collection(u'laywers').document(self.username).get()
        contact_array = []
        for doc in doc_ref.to_dict()["contacts"]:
            contact_array.append(doc)
        for value in contact_array:
            if value == contactId:
                contact_array.remove(value)
               
        return_db().collection(u'laywers').document(self.username).update({u'contacts': contact_array})
        return_db().collection(u'Contacts').document(contactId).delete()
        return "Successfully deleted the contact!"
        
        
    def updateContactPhno(self, contactId = str, newPhno = str):
        doc_ref= return_db().collection(u'laywers').document(self.username).get()
     
        for doc in doc_ref.to_dict()["contacts"]:
            if doc == contactId:
                x = return_db().collection(u'Contacts').document(doc)
                x.update({u'contactPhno':newPhno})
            
        return "Contact Phone Number updated!",200
    
    def updateContactEmail(self, contactId = str, newEmail = str):
        doc_ref= return_db().collection(u'laywers').document(self.username).get()
      
        for doc in doc_ref.to_dict()["contacts"]:
            if doc == contactId:
                x = return_db().collection(u'Contacts').document(doc)
                x.update({u'contactEmail':newEmail})
        
        return "Contact Email updated!",200

    def checkUserExists(self, username=str):
        doc_ref = return_db().collection(u'laywers').stream()
        for doc in doc_ref:
            if doc.id == username:
                return 'True'
        return 'False'

