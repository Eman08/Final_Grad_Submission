
import imp
import json
import path 
import sys
import datetime
from google.cloud import storage
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
print(directory.parent.parent)
from Controller.getFile import *
from db_connection import *

#gs://lawflow/Translate/1663507176553456/lawflow_PDF_18_09_2022 17_19_34pdfTest_fr-FR_translation.pdf

# idd=str(1663507176553456)
# newGsutil="gs://lawflow/Translate/"+str(idd)+'/'+"lawflow_PDF_"+str(getDocNameFromId(str(idd))[0])[:-4]+"_fr-FR_translation.pdf"

#print(newGsutil)


def updateToFirestoreTranslate(newGsutil,idds):
    docUpdate=return_db().collection(u'Documents').document(idds)
    docUpdate.update({u'Translated':[newGsutil]})

#updateToFirestorePDF(newGsutil,idd)


def set_blob_metadata(bucket_name, blob_name):
    """Set a blob's metadata."""
    # bucket_name = 'your-bucket-name'
    # blob_name = 'your-object-name'

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.get_blob(blob_name)
    # metadata = {'Content-type': 'pdf'}
    # blob.metadata = metadata
    
    blob.content_type='application/pdf'
    blob.patch()

    # print(f"The metadata for the blob {blob.name} is {blob.metadata}")
    