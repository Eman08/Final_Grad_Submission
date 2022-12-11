#to controller
from ast import Str
import imp
import json
#import bcrypt
import path 
import sys
from google.cloud import storage
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent.parent)
from db_connection import *
# from ocr1 import *
# from model.checkCategory import *
# from controller.getOcrText import *
# from collections import defaultdict

def upload_blob(bucket_name, source_file_name, destination_blob_name):
    """Uploads a file to the bucket."""
    # The ID of your GCS bucket
    # bucket_name = "your-bucket-name"
    # The path to your file to upload
    # source_file_name = "local/path/to/file"
    # The ID of your GCS object
    # destination_blob_name = "storage-object-name"

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)
    
    print(
        f"File {source_file_name} uploaded to {destination_blob_name}."
    )
    
    
# namewithCat=ocrFile+"__"+checkIfMultipleCategory()[0]
# blobname="OCR/"+ocrFile+"__"+checkIfMultipleCategory()[0]

#upload_blob("lawflow",ocrFile,blobname)