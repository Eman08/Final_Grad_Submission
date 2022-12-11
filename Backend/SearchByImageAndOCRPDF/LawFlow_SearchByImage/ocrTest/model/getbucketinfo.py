import path 
import sys
import os
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from google.cloud import storage
os.environ["GCLOUD_PROJECT"] = "lawflow-3c5b7"

def blob_metadata(bucket_name, blob_name):
    """Prints out a blob's metadata."""
    # bucket_name = 'your-bucket-name'
    # blob_name = 'your-object-name'
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)

    # Retrieve a blob, and its metadata, from Google Cloud Storage.
    # Note that `get_blob` differs from `Bucket.blob`, which does not
    # make an HTTP request.
    blob = bucket.get_blob(blob_name)
    print(f"ID: {blob.id}")

    return blob.id



#blob_metadata("lawflow","OCR/posttest2")