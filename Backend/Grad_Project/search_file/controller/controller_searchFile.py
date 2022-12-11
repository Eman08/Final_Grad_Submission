from venv import create
import jwt
import sys
import path
import sys
import datetime
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from models.model_searchFile import *
def getSignedUrl(filename):
    storage_client = storage.Client.from_service_account_json('lawflow-new.json')
    bucket = storage_client.bucket('lawflow')
    blob = bucket.blob(filename)
    url = blob.generate_signed_url(
        version="v4",
        # This URL is valid for 15 minutes
        expiration=datetime.timedelta(hours=2),
        # Allow GET requests using this URL.
        method="GET",
    )

    return url
def findfile(username:str , filename:str):
    output = []
    fileSearch = Lawyersearch(username, filename)
    fileSearch.findCases()
    if(len(fileSearch.casesAssignedTo) != 0):
        fileSearch.findDocuments()
        if(len(fileSearch.documents)!=0):
            result = fileSearch.searchList()
            if result != 'false':
                if len(result)>2:
                    for i in range(len(result)):
                        if i%2 == 0:
                            result[i] = getSignedUrl(result[i])
                        else:
                            continue
                else:
                    result[0] = getSignedUrl(result[0])
                return result
            else:
                return {"Error":"File not found"},404 ;
        else:
            return{"Error":"Cases dont have any documents"},404    
    else:
        return {"Error": "Lawyer not assigned any case"},404

