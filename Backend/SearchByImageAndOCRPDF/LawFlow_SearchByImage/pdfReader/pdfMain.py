import PyPDF2
import requests
from io import BytesIO
import os 
from google.cloud import storage
import os 
import datetime
import json
import urllib.request
import io

os.environ["GCLOUD_PROJECT"] = "lawflow-3c5b7"

lawflowNew_credentials = {
  "type": "service_account",
  "project_id": "lawflow-3c5b7",
  "private_key_id": "08bab7a9d43e2926cfe9096adfea0f1a9715b0e5",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC6nkXXDsbdGroG\nhDqzh8D6cfaanw2SPonp6pnbywvUl1uUy9mneJe16qcGRdh7nKs8DESARDohMaN4\nYfGNyisFS79ufDgoJRh5WcDlRiHxwKubd+XF3BogXKDxg1WMI5iqAUpjjhnN/3dN\nkSrdoqWvbfW1/RXOE9Gtl3dBAr1pKx60g7pTr8G6Qsi24w6G9HjygMZBndSDPQ/9\nQhsRPtBPM2HSCZ+dvEVbxeR+EQECvtN3oCSN/tE2UUDAuMd20yvrtGFtpz1HWwaA\nhkDaNjtiZJNxt49SHeBvsexUzm1OdO5oyCK88OMMy4iXpln6RVwEAIZ4wJIytHLh\n+uPb7Ei1AgMBAAECggEAA+scILqCoSbeTBIERTvBRFfNhvoIsSEymtdnazM+utjL\nB2kBxSjKarI4spTzADTgbrMgq6fwzDyg8P+BedecpzUrvlPJ0KRCwe/STIvTpn2f\nhfTyvYCY0mlGWddHC6KZIjpntYb/qUe02YJPKeRUvUYHbxe79B3XapgLXOhNUfoG\naA6J1q/udWmNNHxSVCBWs8pJbNjq99+uqVSBZa/xESQRoeFdTrrKVSN48NlxLM0o\nisTxIaOSdxbVvlUvr+VnQMS7yaqT6bq4S8dglrb58B+ZHZ0R9w6Ven/5LhiXyqeM\n15RgG3Z1iea1Wds/NQdi+mHUgGuqXQOGu8C99nmx0QKBgQDiPXNWBJeonirELoF/\nrmH0bTu6p5rkwMMR1sATDd8mDfcJ5ddbE/gR97JkwnQttxMwmS9Wwi6OD6tLZiJE\n2jgP0867QVhzFtzBIhkhZC06/QUJauv1Tt/BZ0vBD8gXTn4f5SWYfRIUrCxwnsrt\nDL1fQGLJ9kT8RxcZ4fxlvDqZyQKBgQDTKpLBtewZjP1dtDN7Y2QiIuKDFCkbwZyC\nZMyaY2l25K8GMgpeI/xs6oYpoYXU/bZPLddr88lwdfa3W+4JburCSQo1Sz3RsX+U\n8JDac2slvogCxzqqDfvb4m4RlWiH+J5VYUwXVd0NRUSXyz8hIgrnIkPPJX/q/7a/\ntPIzYFNtjQKBgQCqOCv4Ezp8PozU0FzU0UKYIjunY4WSCUp7uIUJkQ1NV4KAavMO\nbsbd1ezeDMRWxQDmNss8TpuyfS2XbD/qZ/l4RxerIi5HYXM0yM/5pKK3WDma7Vyd\nU/vcSzjfCF2203Ln0oPn6GpbLXO+RGtP0Z8F9K6fX/Blk6NY8QPzE51PqQKBgQCm\nAjgxtZWRWLfvLLW0cSTNeWNd7UGMIp+qGxiG31SQNaQrWLex3tSZw54JqIQQOA1V\nHhLXOWbJ1NNKvyjZnatNZiJyV16YNdS5AI7ATjCUEb/Xf0ztV+UCrnYduLne+2Nu\nd/lb9xK7VhNgylYs9BhiMRviA/cWhkXjXJt0LGwqGQKBgA7kMFTSQKnbsDuKcVZs\nyOqdV3OJnzNHEdRB3+/c1KI3EYrN/kvVG44jDvbOsaTBsV/za4ANVlw58iNd/R2m\n/6Occ6lFAy8XkjuIWpSgD59Nf/IEJUdnW2oHfC60+rfDsPYKEBz0h/bIYWqcKcIy\n1QdR3DurSjqIWs4ttyNbQXV6\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-uqo36@lawflow-3c5b7.iam.gserviceaccount.com",
  "client_id": "113812304719422117792",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-uqo36%40lawflow-3c5b7.iam.gserviceaccount.com"
}


with open("lawflowNew_credentials.json", "w") as write_file:
    json.dump(lawflowNew_credentials, write_file)




# gcs_file_system = gcsfs.GCSFileSystem(project="lawflow-3c5b7")
# gcs_pdf_path = "gs://lawflow/PDF/legal.pdf04_09_2022 10_59_36"


def readPdfFile(path):
    pdfFileObj = open(path, 'rb')
    # creating a pdf reader object
    pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
    # pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
    # creating a page object
    pageObj = pdfReader.getPage(0)
    # extracting text from page
    pdfToStr=pageObj.extract_text()
    # closing the pdf file object
    pdfFileObj.close()
    return pdfToStr

#print(readPdfFile("Grad_Project\pdfReader\legal.pdf"))

def strToList(path):
    pdfStr=readPdfFile(path)
    pdfList=pdfStr.split()
    pdfList.append("testimonal")
    return pdfList
#strToList("Grad_Project\pdfReader\legal.pdf")


def getSignedUrl(filename):
    #storage_client = storage.Client.from_service_account_json(os.environ['lawflow_new'])
    storage_client = storage.Client.from_service_account_json('lawflowNew_credentials.json')
    bucket = storage_client.bucket('lawflow')
    blob = bucket.blob(f'{filename}')
    print(blob.exists())
    url = blob.generate_signed_url(
        version="v4",
        # This URL is valid for 15 minutes
        expiration=datetime.timedelta(hours=2),
        # Allow GET requests using this URL.
        method="GET",
    )

    return url

# def getSignedUrlforSearch(filename):
#     #storage_client = storage.Client.from_service_account_json(os.environ['lawflow_new'])
#     storage_client = storage.Client.from_service_account_json('lawflowNew_credentials.json')
#     bucket = storage_client.bucket('lawflow')
#     blob = bucket.blob(f'searchImage/'+'{filename}')
#     print(blob.exists())
#     url = blob.generate_signed_url(
#         version="v4",
#         # This URL is valid for 15 minutes
#         expiration=datetime.timedelta(hours=2),
#         # Allow GET requests using this URL.
#         method="GET",
#     )

#     return url

#print(getSignedUrl("OCR/test3.jpeg01_09_2022 14_55_41"))

# def readPdfFromURL(url):
#     print(url)
#     # url=getSignedUrl('PDF/legal.pdf')
#     req = urllib.request.Request(url, headers={'User-Agent' : "Magic Browser"})
#     remote_file = urllib.request.urlopen(req).read()
#     remote_file_bytes = io.BytesIO(remote_file)
#     pdfdoc_remote = PyPDF2.PdfFileReader(remote_file_bytes)
#     fulltext=''
#     for i in range(pdfdoc_remote.numPages):
#         current_page = pdfdoc_remote.getPage(i)
#         # print("===================")
#         # print("Content on page:" + str(i + 1))
#         # print("===================")
#         # print(current_page.extractText())
#         fulltext=fulltext+current_page.extractText()

    
#     return fulltext
    

def readPdfFromURL(url):
    # url=getSignedUrl('PDF/legal.pdf')
    pagelist=[]
    fulltext=''
    #url='https://storage.cloud.google.com/lawflow/PDF/legal.pdf'
    response = requests.get(url)
    my_raw_data = response.content

    with BytesIO(my_raw_data) as data:
        read_pdf = PyPDF2.PdfFileReader(data)

        for page in range(read_pdf.getNumPages()):
            #print(read_pdf.getPage(page).extractText())
            pagelist.append(read_pdf.getPage(page).extractText())
            # print(type(read_pdf.getPage(page).extractText()))
    for i in pagelist:
        fulltext=fulltext+i
    return fulltext


# url=getSignedUrl('OCR/2022_12_7_0_4_19SIT321-Proposal SHAAE-256 .pdf')
# import codecs
# response = requests.get(url)
# my_raw_data = response.content
# print(type(my_raw_data))
# # print(my_raw_data.decode())
# pagelist=[]
# with BytesIO(my_raw_data) as data:
#     read_pdf = PyPDF2.PdfFileReader(data)
#     for page in range(read_pdf.getNumPages()):
#         pagelist.append(read_pdf.getPage(page).extractText())

# fulltext=''

# for i in pagelist:
#     fulltext=fulltext+i
    
# print(fulltext)
# with open(file.pdf,'rb') as f:
#     extracted_text = slate.PDF(f)
# print(extracted_text)


# print(readPdfFromURL(getSignedUrl('OCR/2022_12_7_0_4_19CreditcardscomIncAffiliate Agreement.pdf')))
