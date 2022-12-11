from posixpath import abspath
from cryptography.fernet import Fernet
import os.path
from os import path
import bcrypt
from getpass import getpass


def processPIN(pinCode):
    check = pinCode.encode('utf-8')

    with open('userHash.key', 'rb') as Auth:
        myHash=Auth.read()
        
    
    if bcrypt.checkpw(check, myHash) is True:
        print("PIN Verified!")
        return True

    else:
        print("Invalid PIN. Please try again!")
        return False
    



#Function to encrypt
def encrypt(fn):


        key = 'Fe88Z5fkvbxCMLElEqb12BRdN9hCGvERtcg9uvIdzek='
        f = Fernet(key)

        # using the generated key
        with open(fn, 'rb') as file:
            original = file.read()
        encrypted = f.encrypt(original)
        os.remove(fn)

        with open(fn, 'wb') as enc_file:
            enc_file.write(encrypted)


#Function to decrypt
def decrypt(fn):

    #with open('C:/Users/fujitsu/Desktop/PythonVSC/userKey.key', 'rb') as filekey:
        key = 'Fe88Z5fkvbxCMLElEqb12BRdN9hCGvERtcg9uvIdzek='
        f = Fernet(key)

        # using the generated key
        with open(fn, 'rb') as file:
            encText = file.read()
        decrypted = f.decrypt(encText)
        #os.remove(fn)

        with open(fn, 'wb') as enc_file:
            enc_file.write(decrypted)

                    

#------------------------------------MAIN------------------------------

#User is asked for a PIN
#password = getpass('Enter your PIN: ')

#Loop until user meets pincode criteria
#while True:
    #checkPIN(enterPIN)
 #   if processPIN(password):
  #      break

   # else:
    #    password = getpass('Enter your PIN again: ')



directory = 'C:\\Users\\fujitsu\\Desktop\\CheckPython'

#Encrypting all files in a given directory
for root, subdirectories, files in os.walk(directory):

    for subdirectory in subdirectories:
        os.path.join(root, subdirectory)

    for file in files:
        f = os.path.join(root, file)
        #print(f)
        #encrypt(f)
        #decrypt(f)
  
        

f = 'C:/Users/fujitsu/Desktop/EncCheck/AbeeraTest.pdf'
encrypt(f)