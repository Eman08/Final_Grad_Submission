import imp
import os
import io
from google.cloud import vision
#from model.getbucketinfo import *
from google.cloud import storage


os.environ['GOOGLE_APPLICATION_CREDENTIALS']= r"Grad_Project/ocrTest/ocrunderLawflowKEY.json"


# [START vision_text_detection]
def detect_text(uri):
    wordList=[]
    # """Detects text in the file."""
    # client = vision.ImageAnnotatorClient()

    # # [START vision_python_migration_text_detection]
    # with io.open(path, 'rb') as image_file:
    #     content = image_file.read()

    # image = vision.Image(content=content)

    # response = client.text_detection(image=image)
    # texts = response.text_annotations
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
    del wordList[0]
    
    return wordList


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
