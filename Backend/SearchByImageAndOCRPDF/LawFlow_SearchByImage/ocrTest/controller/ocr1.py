import imp
import os
import io
from google.cloud import vision
#from model.getbucketinfo import *
from google.cloud import storage
import sys
import path
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent.parent)
from SeachByImage.NLP1 import *
from controller.summary import *


OCR_credentials = {
  "type": "service_account",
  "project_id": "lawflow-3c5b7",
  "private_key_id": "3de15fa1f9b94a080f0a2ea070f6c6fdeb944bf6",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCi3nVXXhpMvKt0\naNjPz2pDww8yWnWcVYS1Qn0FmGSptBwyghGJ3InaUCxeAsGCnNHElCgFOVCtroa0\nCYPfunXOGNeZPOaNcwQQegTlHYxBKhj/znW1AeNodev2EM94zxVTvzCPzpCr3V2H\nejB8fnOmAPcEpz2aTJp2hLPZxTjKq0AusB7Ys24MS9OMCK+meUW9kBM6gs1O7luA\nV/aStWKf46spXtF4+Lx0IoY+5YqtyCp7Ncu2fdwFBz3b97L58bqzNaAmhUmD7qNt\nlAjXzZRy2FMDynOY6tOaGGgoCi1fhWTtrHqStWz73UB9qElEvWUO2IwHvSxrKGVl\nzL1y9E+fAgMBAAECggEAFrRMR1Gm+OuUOzYig1W2ypt2kt5pZtHFHj+WjiEgZ0fk\nZmYba8yCqxxiEvjvYPXbiDvfGFtVE+EwhgiNibLEmWZ9J6+FtFJETsezxvzHgI4N\nzhtJ7WHGAdnueu78/SphHruYWXPCVzMUxr4R5Ej8djfMN6nYvJnRLpRxPfpwYFAm\nOnDbQs09SFaK9/+/zvzCzMEG3Cq7rsqT0VVVFd8aKfF+orMN04pqW1L+waRrwusg\n4IchTqIcx8MzI0upCV7oLXy4/TTo6Tu3ggE7rWvVu7VkP/qbaYhTwdZbm+u5L+of\n1aB57KN8kbrsmxqNHkxYt6eD27S0dn3OvzvBMx46AQKBgQDTx2mCPsw0eKLX64FK\nwI/xgi4n5L/FHvRDRRSc91zveYylFeigxEkPxab0s9XRS87IaSPpa+3qoVg3h/iq\nDSx4VGITCqW0QOfjb6riMqLc6mmrIyXE8QFcEiqLHvLHcisuwY4SeUqYeOdiZpaK\n/9+6w1iTr9ICTpTsHHl0QhnJrwKBgQDE4JOQ14kSak5TirVanyuh+dF0J/ylvCF5\nopKGkyh6EdaPJj6U8sYmd9wgbroqKGTgn4UOERRUpLFox7NeaofLNsmBn0t17ilA\nR6QsEBvVXC7+QYQVNXtAjJPRw2TRM6X8ytIzuYu/ve5K3e4YIvm2vHle7BP1V7Fd\nko7nCWqFEQKBgQCDndkqwxByQ88g1hJifM54z+kTjgzI23X/IL2w1+MASdBpAPa0\ng4jMrpAWYHWwP6bh0sYo2ZThTyjeSjj2pn1Ow1K4dtOI9RWoucvADKw/E8hcPdnJ\nTecEa53ZHIDSB1hjFJPRU2RS4kEbXJqPBHrtPV6dWpXwLRpMq12oLTSNrQKBgQCc\njcCKQvpazHHweLJxl3TI3rCx30JGQG2WHbLKlKZxO1IUjuLg6pSq7lD68VHUSD6/\nZ9oUL3ytOjFhErwNbkUBUVW3X4ZQBsyCsvVXnI+lgCJWSJ7Rhq+1ypOZD/lRafKq\nLFYuj3MTS+L7YbL9OoK7zu/sjWnphIwjznEYQyKTIQKBgAjIp8WfN4h226BSnaBG\nFtixqzilv/KBwCbXfEN5Peu/6a2MN+rGZwnynVGfgkqc3SvBJwtpQmW/oN/Z/XL+\nGHa3H5RKF1NtPRVCnnygTC4+hBdI0rLGWgGilT033a2NNG9S0UylPpFKr5c+16Fn\nUVr/aQaVfUGfK65QeedIUbCl\n-----END PRIVATE KEY-----\n",
  "client_email": "ocrunderlawflow@lawflow-3c5b7.iam.gserviceaccount.com",
  "client_id": "105861408114696624037",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/ocrunderlawflow%40lawflow-3c5b7.iam.gserviceaccount.com"
}

with open("OCR_credentials.json", "w") as write_file:
    json.dump(OCR_credentials, write_file)



#os.environ['GOOGLE_APPLICATION_CREDENTIALS']= os.environ['ocrunderLawflowKEY']
os.environ['GOOGLE_APPLICATION_CREDENTIALS']= 'OCR_credentials.json'
# [START vision_text_detection]
def detect_text(uri):
    wordList=[]

    """Detects text in the file located in Google Cloud Storage or on the Web.
    """
    from google.cloud import vision
    client = vision.ImageAnnotatorClient()
    image = vision.Image()
    image.source.image_uri = uri

    response = client.text_detection(image=image)
    texts = response.text_annotations
    
    #print('Texts:')
   
    for text in texts:
        #print('\n"{}"'.format(text.description))
        wordList.append(text.description)

    #     vertices = (['({},{})'.format(vertex.x, vertex.y)
    #                 for vertex in text.bounding_poly.vertices])

        #print('bounds: {}'.format(','.join(vertices)))   #prints the location of the text in the image

    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))
    # [END vision_python_migration_text_detection]
    return wordList
# [END vision_text_detection]


#ocrFile=r"ocrTest\test2.jpeg"
#detect_text("gs://lawflow/OCR/test2.jpeg30_08_2022 19_33_38")
def getOCRlist(gsutil):
    wordList=detect_text(gsutil)
    #del wordList[0]
    
    if len(wordList)==0:
        wordList.append('0')
    
    return wordList

def getOCRTokenize(gsutil,idds):
    #initialize_app()
    noneList=['None']
    wordList=detect_text(gsutil)
    if len(wordList)==0:
        wordList.append('0')
    if len(wordList[0])>500:
        summary = generate_summary(wordList[0],1)
    else: summary=noneList
    tokenizeSingleDoc(gsutil,idds,wordList[0])
    return  summary
    
    
    
# teststr="ss running mem=558M(109.1%)2022-11-28T18:58:30.213907+00:00 heroku[web.1]: Error R14 (Memory quota exceeded)2022-11-28T18:58:50.274223+00:00 heroku[web.1]: Process running mem=558M(109.1%)2022-11-28T18:58:50.282557+00:00 heroku[web.1]: Error R14 (Memory quota exceeded)2022-11-28T18:59:10.345438+00:00 heroku[web.1]: Process running mem=558M(109.1%)2022-11-28T18:59:10.347370+00:00 heroku[web.1]: Error R14 (Memory quota exceeded)"    
    
# print(len(teststr))   
    
# def getOCRToken(gsutil):
#     wordList=detect_text(gsutil)
#     return wordList[0]

# 
#print(detect_text("https://storage.googleapis.com/storage/v1/lawflow/OCR/2022_10_29 02_44_26OCR_test2.jpg"))

#getOCRTokenize("gs://lawflow/OCR/2022_10_29 02_44_26OCR_test2.jpg","213213163")

# def getOCRlist(gsutil):
#     detect_text(gsutil)
#     del wordList[0]
#     first100=[]
#     temp100=[]
#     temp100=wordList[0:101]
#     for x in temp100:
#         if x.lower() not in first100:
#             first100.append(x.lower())
#     #print(first100)
#     return first100

# print(gsutil)
# print(getOCRlist())
