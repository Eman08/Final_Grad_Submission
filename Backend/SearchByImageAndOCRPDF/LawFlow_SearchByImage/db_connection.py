import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import path
import sys
import os
import json
import urllib.parse
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent)
#print(directory.parent)

firebase_credentials = {
  "type": "service_account",
  "project_id": "lawflow-1afd9",
  "private_key_id": "b7b9a2d4b703a2481601c6edf0df58a2ccc665b6",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDKBmrelqHId2QN\nxpH2w1fr/dC9s/aeyE4cGY+vOjZXu8LVYF97yu0GAvEkZ+Ylat6RUEPhaYMsVWEO\nh8sQ/YaDU/92+JWlRKxv1F62UxQ6GAsLLWQrk+DW18Rcqj/gWTcNBUD+W/7J7yF1\ne5ctaEOcbGh6dLdkjxThEQG8y+WKAUrMZfqnK1qmbfeI/yCK5VbyqfRKRU0BZ9N2\nu7zQUdFuNCvUm3lmT2spfslQtlZWVEIRjuWOOZTTALK6S6wZYCYK0MqKBqLPlM0J\nAG5vOrgA0kwbh7la8ch1ystJO+IyykUCUJ2f+LEkH+EFAxhNpAqyREnvghozJpCq\n9GO7+1cDAgMBAAECggEARQacTSE6dbwVO3+1L5Le34sBX0+129qklYVGSqChIKjO\nkQk0lp9nDL7ElaPKRs6U7SF3j/T1FJi3aLeM8mktJIH2rzeQKb+lCzCMi88nAhJk\n85S2vQzxrXZbaS3iVU0mOhSpeD8Gdwh1biakKKePMkr4B58JahpZD+03osIn01ax\nfFA0BB0Qq0lf95/2jYL+NF1wloc8pB7yxtInZh4wS3O6WMPGsqcDT8aq+hqaYQqU\nDu8/sJPl2OqzEqwutoBUNdQmMN25Ml//8kkjkG52op9dLP95MATWTjt/uBut+yBb\nYmptkfxZME4vRSH7/B8I/PGXX4GQin66fGhR8xn9AQKBgQD7oSIzoCyeecR+Q/cA\nedAGbUnGEh+LzFg0OfI9BYSI2LbwlIQxnu7WEoyhGvvMd1QVGvHeYhu+PTnnrfD4\nqxYJN3J//xcUFzr+1purmmD8RTEolXiNrrjLNKIgMKwcvq4gH2up8WYI2IaL1SD8\nMQvF6TQzh1IIneWDuQfSEcqysQKBgQDNiLgFWsLdXvE7y9itfqLaooKa1HTshYGA\n/UGzGU2fLdFPOp/t+1p6Tip3OTtbLyfPvz3VJR/eTeG6hhkEEaZ1G1geCQQc2Ymc\n9u5vTzPVVGSAlNKk3VwhKeg2KtCjoGVr64RHC0rqXlsNcYm+18gLZMq15yAP+1VM\nSrNsrOOJ8wKBgFOY8/Ds3QYFdGdykwQgdCE+e80HRl2+lOs8+SKWy7JfNV/2J3kI\n0VZjsT7w5QjH+DJO0l5Mf+UTGELFQhKLXHXRawPlLripAxuZFvzK/D+ziSJvji6c\nBp7ULKy/Ht8p5lWburwqC/kSXpjkROIkNUIaORKJeZKNSqwZc+SxroLxAoGAHUA6\n6FAtcXHkpRzyvmZKaRE9wyk/ZrXtY10nr4SHXoMXyc3PGwBttQBQ3NzhTK3eXZub\nAi2hZnLxECmrf7+/T+VPWh7wXea7xgIClwbPmqnDD+WeQOZcCUA8kxDu1oqqRHyl\nO7Mou0gobzZcYzO0faKfktnM31lmn0/2Tx4f1+8CgYBGHNjFAkGK/P8tUOShjZcf\nuQK18SWKAOEDF5T2sFUW2l0BrQdfXlNkLPspwRp1vW6O2eGMSSz9LQmfZ8czNnhj\nvQP6HfswvyIOXyfSAQGBotNweaT/i+hua0ByzXLUF2YsHRrE1NLn+wAwXJ43VO9c\n8fCFysO5BzTyXtl8XFIKHA==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-eugbz@lawflow-1afd9.iam.gserviceaccount.com",
  "client_id": "102913434782884192145",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-eugbz%40lawflow-1afd9.iam.gserviceaccount.com"
}
with open("firebase_credentials.json", "w") as write_file:
    json.dump(firebase_credentials, write_file)

def initialize_app():
    #cred = credentials.Certificate(os.environ['lawflow'])
    cred = credentials.Certificate('firebase_credentials.json')

    firebase_admin.initialize_app(cred)
    print("---Connecting to database...---")

def return_db():

    # cred = credentials.Certificate("C:/Users/Eman/Desktop/Grad project/Grad_Project/lawflow.json")
    # firebase_admin.initialize_app(cred)
    db=firestore.client()   
    return db
