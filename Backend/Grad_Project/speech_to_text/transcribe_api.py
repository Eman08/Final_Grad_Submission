from ast import Str
from pandas import array
import path
import sys
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent.parent)
from db_connection import *
from speech_to_text.docUpload import *
from google.cloud import speech
from google.cloud import storage
import os
import io
os.environ['GOOGLE_APPLICATION_CREDENTIALS']= r'C:/Users/Eman/Desktop/Grad project/Grad_Project/gcloudconnection.json'
client = speech.SpeechClient()
from google.cloud import speech
from google.cloud import storage
import soundfile as sf

#def getn_Channels():
    #storage_client = storage.Client()
    #bucket = storage_client.bucket('lawflow')
    #blob = bucket.blob('audio-book')
    #file_as_string = blob.download_as_string()
    #data, sample_rate = sf.read(io.BytesIO(file_as_string))
    #sf.info(io.BytesIO(file_as_string)).duration
    #sf.info(io.BytesIO(file_as_string)).channels
    

def speech_to_text_long_audio(google_link,num,destination_name, date, lan):
    language = dict()
    language["arabic"] = "ar-AE"
    language["english"] = "en-GB"
    language["spanish"] = "es-ES"
    language["hindi"] = "hi-IN"
    language["urdu"] = "ur-PK"
    storage_client = storage.Client()
    client = speech.SpeechClient()
    media_url = google_link
    bucket = storage_client.bucket('lawflow')
    blob = bucket.blob(destination_name)
    file_as_string = blob.download_as_string()
    duration = sf.info(io.BytesIO(file_as_string)).duration
    number = sf.info(io.BytesIO(file_as_string)).channels
    audio = speech.RecognitionAudio(uri=media_url)
    config_wav_enhanced = speech.RecognitionConfig(
    encoding = speech.RecognitionConfig.AudioEncoding.LINEAR16,
    enable_automatic_punctuation = True,
    audio_channel_count = number,
    language_code = language[lan], #how will we detect which language this is
    )
    if(duration>60): #If audio length above a minute then call the long running function
        operation = client.long_running_recognize(
        config = config_wav_enhanced,
        audio = audio
        )
    else:
        operation = client.recognize(
        config = config_wav_enhanced,
        audio = audio
        )
    response = operation.result()
    fname = (os.path.basename(destination_name+"_DOC"))+".txt" #audio_EmanRec_DOC.txt
    with open(fname, 'w') as f:
        for result in response.results:
        # The first alternative is the most likely one for this portion.
            f.write(u"Transcript: {}".format(result.alternatives[0].transcript))
            f.write('\n')
            f.write("Confidence: {}".format(result.alternatives[0].confidence))
            f.write('\n')
    return uploadDoc(google_link,fname,num, date)
    #return "Successfully transcribed",200


