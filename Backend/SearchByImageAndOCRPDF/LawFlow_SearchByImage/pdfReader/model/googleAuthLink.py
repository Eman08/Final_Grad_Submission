import os 
from google.cloud import storage
os.environ["GCLOUD_PROJECT"] = "lawflow-3c5b7"


# def sign_url():
#     from google.cloud import storage
#     from datetime import datetime, timedelta

#     import google.auth
#     credentials, project_id = google.auth.default()

#     # Perform a refresh request to get the access token of the current credentials (Else, it's None)
#     from google.auth.transport import requests
#     r = requests.Request()
#     credentials.refresh(r)

#     client = storage.Client()
#     bucket = client.get_bucket('lawflow')
#     blob = bucket.get_blob('PDF/18_09_2022 17_10_11pdfTest.pdf')
#     expires = datetime.now() + timedelta(seconds=86400)

#     # In case of user credential use, define manually the service account to use (for development purpose only)
#     service_account_email = "YOUR DEV SERVICE ACCOUNT"
#     # If you use a service account credential, you can use the embedded email
#     if hasattr(credentials, "harmanhssingh2001@gmail.com"):
#         service_account_email = credentials.service_account_email

#     url = blob.generate_signed_url(expiration=expires,service_account_email=service_account_email, access_token=credentials.token)
#     return url, 200


# http(s)://storage.googleapis.com/lawflow/PDF/18_09_2022%17_10_11pdfTest.pdf

# bucket = 'lawflow'
# file = '18_09_2022%17_10_11pdfTest.pdf'
# gcs_url = 'https://%(bucket)s.storage.googleapis.com/%(file)s' % {'bucket':bucket, 'file':file}
# print (gcs_url)

def enable_uniform_bucket_level_access(bucket_name):
    """Enable uniform bucket-level access for a bucket"""
    # bucket_name = "my-bucket"

    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)

    bucket.iam_configuration.uniform_bucket_level_access_enabled = True
    bucket.patch()

    print(
        f"Uniform bucket-level access was enabled for {bucket.name}."
    )



def disable_uniform_bucket_level_access(bucket_name):
    """Disable uniform bucket-level access for a bucket"""
    # bucket_name = "my-bucket"

    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)

    bucket.iam_configuration.uniform_bucket_level_access_enabled = False
    bucket.patch()

    print(
        f"Uniform bucket-level access was disabled for {bucket.name}."
    )
    

def make_blob_public(bucket_name, blob_name):
    """Makes a blob publicly accessible."""
    # bucket_name = "your-bucket-name"
    # blob_name = "your-object-name"

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(blob_name)

    blob.make_public()

    print(
        f"Blob {blob.name} is publicly accessible at {blob.public_url}"
    )
    
    
    
# disable_uniform_bucket_level_access("lawflow")
    
# make_blob_public("lawflow","PDF/18_09_2022 17_10_11pdfTest.pdf")

# enable_uniform_bucket_level_access("lawflow")
