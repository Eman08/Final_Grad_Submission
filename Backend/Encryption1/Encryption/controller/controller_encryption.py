
import os
import base64
import re
import json
import path
import sys
import time
import tempfile
from cryptography.fernet import Fernet
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent.parent)
from db_connection import *
from Encryption.models.model_encryption import *
from uploadDoc import *

#will be used in decryption
def checkPIN(pwd:str):
    #pwd = int(pwd1)
    #print(pwd)
    regex = "^[0-9]{4}$"
    p = re.compile(regex)

    if (pwd == ''):
        return "False"
    matchPass = re.match(p, pwd)

    if matchPass is None:
        print("Invalid! Your PIN must be 4 digits")
        return "False"
    else:
        print("PIN Accepted")
        return "True"


#Function to encrypt
def encrypt(caseid:str, pincode:str):
    objEnc = PIN(caseid, pincode)
    key = objEnc.getKey()

    f = Fernet(key)
    allDocs = objEnc.getDocIDs()

    for i in allDocs:
        bucket_name = 'lawflow'
        blob_name = "OCR/"
        dest = tempfile.TemporaryDirectory(dir = "C:/encTest")  #PLEASE CHECK ON FRONTEND & CHANGE DIR 
        print(i)
        doc_name = return_db().collection(u'Documents').document(i).get({u'doc_name'}).to_dict()['doc_name']
        #-----------------------------------------------------
        blob_name+=doc_name
        dest+=doc_name
        print(dest)

        download_blob_into_memory(bucket_name, blob_name, dest)

        with open(dest, 'rb') as file:
            original = file.read()
        encrypted = f.encrypt(original)

        with open(dest, 'wb') as enc_file:
            enc_file.write(encrypted)
            

        delete_blob(bucket_name, blob_name)
        upload_blob(bucket_name,dest,blob_name)

        os.remove(dest)

#Function to decrypt
def decrypt(caseid:str, pincode:str):
    objEnc = PIN(caseid, pincode)
    key = objEnc.getKey()

    f = Fernet(key)
    allDocs = objEnc.getDocIDs()

    for i in allDocs:
        bucket_name = 'lawflow'
        blob_name = "OCR/"
        # dest = 'C:/Users/fujitsu/Desktop/Temp/'  #PLEASE CHECK ON FRONTEND & CHANGE DIR 
        dest = tempfile.TemporaryDirectory(dir = "C:/encTest")
        print(i)
        doc_name = return_db().collection(u'Documents').document(i).get({u'doc_name'}).to_dict()['doc_name']

        #-----------------------------------------------------
        
        blob_name+=doc_name
        dest+=doc_name
        print(dest)

        download_blob_into_memory(bucket_name, blob_name, dest)

        with open(dest, 'rb') as file:
            original = file.read()
        decrypted = f.decrypt(original)

        with open(dest, 'wb') as enc_file:
            enc_file.write(decrypted)
            

        delete_blob(bucket_name, blob_name)
        upload_blob(bucket_name,dest,blob_name)

        os.remove(dest)


        
caseID = "0gP9fcHoYFyd3bI4"
PinCode = "2314"

encrypt(caseID, PinCode)
#decrypt(caseID, PinCode)

