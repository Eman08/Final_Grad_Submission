import datetime
from ftplib import FTP
from io import BytesIO
from random import randint
from google.cloud import storage
from google.cloud import speech
from pydub import AudioSegment
import os
import io
import glob
import path
import sys
import datetime
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from speech_to_text.transcribe_api import *
from pydub import AudioSegment
os.environ['GOOGLE_APPLICATION_CREDENTIALS']= r'C:/Users/Eman/Desktop/Grad project/Grad_Project/gcloudconnection.json'

def upload_blob(bucket_name, source_file_name, destination_blob_name, caseID, date, lan):

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_filename(source_file_name)
    gslink = "gs://"+bucket_name+"/"+destination_blob_name
    return_db().collection(u'Cases').document(caseID).update({u'S2T': firestore.ArrayUnion([os.path.basename(blob.id)])})
    return speech_to_text_long_audio(gslink,os.path.basename(blob.id),destination_blob_name, date, lan)


def Cconvert(fpath = str, caseID = str, name = str, lan =str):
    checkCase = return_db().collection(u'Cases').document(caseID) 
    mp3_filename = os.path.splitext(os.path.basename("C:/Users/Eman/Desktop"))[0] + '.wav'     #path of new converted file
    AudioSegment.from_file(fpath).export(mp3_filename, format='wav') #path to mp3 or other file
    url = r"C:\Users\Eman\Desktop\Grad project\Grad_Project\Desktop.wav" #localpath
    date = datetime.datetime.now().strftime("%d_%m_%y %H %M %Y")
    name = "S2T/" + name +date+ "/audio_" + name #S2T/EmanRec/audio_EmanRec
    return upload_blob('lawflow',url, name, caseID, date, lan)

