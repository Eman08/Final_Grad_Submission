from google.cloud import storage
import os
import io
import glob
import path
import sys
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)

os.environ['GOOGLE_APPLICATION_CREDENTIALS']= './gcloudconnection.json'

def delete_blob(bucket_name, blob_name):

    storage_client = storage.Client()

    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(blob_name)
    blob.delete()

    print(f"Blob {blob_name} deleted.")

#---------------------------------------------------------------

def upload_blob(bucket_name, source_file_name, destination_blob_name):

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)
    gslink = "gs://"+bucket_name+"/"+destination_blob_name

    return gslink

#---------------------------------------------------------------

def download_blob_into_memory(bucket_name, blob_name, dest):

    storage_client = storage.Client()

    bucket = storage_client.bucket(bucket_name)

    blob = bucket.blob(blob_name)
    contents = blob.download_as_string()

    blob.download_to_filename(dest)




#bucket_name='lawflow'
#OG_blob='OCR/testDoc.pdf'
#download_blob_into_memory(bucket_name, OG_blob)


#source_file_name = 'C:/Users/fujitsu/Desktop/EncCheck/testDoc.pdf'
#destination_blob_name = 'OCR/testDoc.pdf'
#upload_blob(bucket_name, source_file_name, destination_blob_name)