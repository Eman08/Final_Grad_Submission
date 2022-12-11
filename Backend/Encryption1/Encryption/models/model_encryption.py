import os
import base64
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.backends import default_backend
from getpass import getpass
import re
import json
import path
import sys
import time
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent.parent)
from db_connection import *


class PIN(object):
    def __init__(self, caseID, encryptPIN=str):
        self.caseID=caseID       
        self.encryptPIN=encryptPIN
#---------------------------------------------------------------------------------------------------


#need to get token for current username and set accordingly
    def setPIN(self):
        bytePwd=self.encryptPIN.encode('utf-8')
        salt = os.urandom(16)
        #This is a key generation function that generates a 128-bit key for fernet encryption
        kdf = PBKDF2HMAC(algorithm=hashes.SHA256(),length=32,salt=salt,iterations=100000,backend=default_backend())
        genkey = base64.urlsafe_b64encode(kdf.derive(bytePwd))
        key = genkey.decode('utf-8')
        return_db().collection(u'Cases').document(self.caseID).update({u'encryptPIN': key})


    def getKey(self):
        encKey = u'{}'.format(return_db().collection(u'Cases').document(self.caseID).get({u'encryptPIN'}).to_dict()['encryptPIN'])
        return encKey
        

    def checkEncStatus(self):
        encStatus = return_db().collection(u'Cases').document(self.caseID).get({u'enc'})
        enc = u'{}'.format(encStatus.to_dict()['enc'])
        print(enc)
        if enc == 'True':
            print('There is encryption')

        else: 
            print('No encryption')


    def getDocIDs(self):
        
        encdocs = return_db().collection(u'Cases').document(self.caseID).get({u'DocIds'}).to_dict()['DocIds']
        return encdocs
    
    


        