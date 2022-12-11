from venv import create
import jwt
import sys
import path
import sys
import datetime
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from model.model_contacts import *

def checkUserExists(username = str, contactName=str, contactPhno=str, contactEmail=str):
    obj = Contact()
    if obj.checkUserExists(username):
        assignContactId(username, contactName, contactPhno, contactEmail)
        return "User exists!"
    else:
        return "Sorry this user doesnt exist", 404


def assignContactId(username = str, contactName=str, contactPhno=str, contactEmail=str):
    contact_id = random.randint(1000, 9999)
    obj = Contact(username)
    value = obj.getContactId(contact_id)
    while value == "False":
        contact_id = random.randint(1000, 9999)
        value = obj.getContactId(contact_id)
    contact_id_number = str(contact_id)
    createObject(username, contactName, contact_id_number ,contactPhno, contactEmail)

def createObject(username = str, name=str, contactid=str, phno=str, email=str):
    obj = Contact(username, name, contactid, phno, email)
    check = obj.setContact()
    if check == "Contact added!":
        return "Contact added successfully!", 200
    else:
        return "Error", 404

def getAllContacts(username = str):
    obj = Contact(username)
    return obj.getContact()

def getSingleContactFromCollection(username = str, contactId = str):
    obj = Contact(username)
    return obj.getSingleContact(contactId)

def deleteUserContact(username = str, contactId = str):
    obj = Contact(username)
    return obj.deleteContact(contactId)

def updateUserPhno(username = str, id = str, updatePhno= str):
    obj = Contact(username)
    return obj.updateContactPhno(id, updatePhno)

def updateUserEmail(username = str, id = str, updateEmail= str):
    obj = Contact(username)
    return obj.updateContactEmail(id, updateEmail)

def checkContactPhno(username = str, phno = str):
    obj = Contact(username)
    return obj.PhnoCheck(phno)

def checkContactEmail(username = str, email = str):
    obj = Contact(username)
    return obj.EmailCheck(email)

def checkContactName(username = str, name = str):
    obj = Contact(username)
    return obj.NameCheck(name)

