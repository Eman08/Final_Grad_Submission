from enum import unique
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
import nltk
import time
from nltk.corpus import stopwords
import numpy as np     
import path
import json
import sys
import datetime
from random import random
from random import seed

from google.cloud import storage
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from db_connection import *
from ocrTest.controller.OCRforNLP import getOCRToken
from pdfReader.pdfMain import readPdfFromURL
import pdfReader.pdfMain as PDFmodule
#from ocrTest.controller.ocr1 import detect_text
from nltk.tokenize import sent_tokenize, word_tokenize
from sklearn.metrics.pairwise import cosine_similarity
import string
from nltk.stem import WordNetLemmatizer
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('punkt')
nltk.download('omw-1.4')
start1 = time.time()
end1 = time.time()
stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()

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






def tokenizeSingleDoc(singleDoc, idds,wordList):
    #singleDoc1=detect_text(singleDoc)[0]
    lowered=str.lower(wordList)
    word_tokens = word_tokenize(lowered)
    words=[]
    for w in word_tokens:
            if w not in stop_words:
                if w not in string.punctuation:
                    if len(w) > 1:
                        lemmatized = lemmatizer.lemmatize(w)
                        words.append(lemmatized)
    wordsJoin=" ".join(words)
    saveTokenizeToFirestore(wordsJoin, idds)
    return wordsJoin

def tokenizeSearchDoc(wordList):
    #singleDoc1=detect_text(singleDoc)[0]
    if wordList=="None":
        seed(time.time())
        return str(random())
    lowered=str.lower(wordList)
    word_tokens = word_tokenize(lowered)
    words=[]
    for w in word_tokens:
            if w not in stop_words:
                if w not in string.punctuation:
                    if len(w) > 1:
                        lemmatized = lemmatizer.lemmatize(w)
                        words.append(lemmatized)
    wordsJoin=" ".join(words)
    return wordsJoin



#Saves takes documents in as a full string, tokenize them, and save in firestore
def saveTokenizeToFirestore(document,docID):
    data={
        u'token':document   
    }
    return_db().collection(u'Document Tokens').document(docID).set(data)


def getTokens(username:str):
    doc_id=[]
    tokens=[]
    allReturn = []
    doc = return_db().collection(u'Cases').stream()
    for var in doc:
        for lawyer in var.to_dict()["assignedLawyers"]:
            if lawyer == username:
                for docIds in var.to_dict()["DocIds"]:
                    doc_id.append(docIds)
    # print("in token Doc id: ",doc_id)

    for i in doc_id:
        doc_ref = return_db().collection(u'Document Tokens').document(i)
        doc_get = doc_ref.get()
        if doc_get.exists:
            tokens.append(doc_get.to_dict()["token"])  

    allReturn.append(tokens)
    allReturn.append(doc_id)
    # print("in token len: ",len(tokens))
    
    return allReturn



def process_tfidf_similarity(documentWithIds,base_document,forwhat):
    if  documentWithIds==[[],[]]:
        return []
    # print("DOCWITHID",documentWithIds)
    # print("BASEDOC",base_document)
    documents = documentWithIds[0]
    idds=documentWithIds[1]
    # print(idds)
    vectorizer = TfidfVectorizer()
	# To make uniformed vectors, both documents need to be combined first.
    documents.insert(0, base_document)
    embeddings = vectorizer.fit_transform(documents)

    # if not embeddings[1:]:
    #     return []
    # print("embeding",embeddings)
    # print("Documents IDS length: ",len(idds))
    # print("Documents length: ",len(documents))
    # print(embeddings.shape[0])
    # print("Given Set",embeddings[0:1].shape[0])
    # print("Whole Set",embeddings[1:].shape[0])
    
    
    cosine_similarities = cosine_similarity(embeddings[0:1], embeddings[1:]).flatten()
    

    highest_score = 0
    highest_score_index = 0
    highest_score_index_list=[]
    highest_score_list=[]
    for i, score in enumerate(cosine_similarities):
        highest_score_index_list.append(i)
        highest_score_list.append(score)
        if highest_score < score:
            highest_score = score
            highest_score_index = i
            
            
        
    most_similar_document = documents[highest_score_index]
    # print(highest_score)
    # print("docs",len(documents))
    # #print(most_similar_document)
    # print("Most similar document by TF-IDF with the score:",highest_score,"Index of doc ",highest_score_index)
    # print("Id of the doc ",idds[highest_score_index-1])
    # print("Score index List  ",highest_score_index_list)
    
    # print("Score List ",highest_score_list)
    # print("cosine_similarities ",cosine_similarities)
    limit=0.5
    #if forwhat = 0 for check duplicate 
    if forwhat==0:
        limit=0.9

    scoreList=[]
    scoreIdslist=[]
    for i, score in enumerate(highest_score_list):
        if score >= limit:
            scoreList.append(i)
            scoreIdslist.append(idds[i])
    
    # print(scoreIdslist)
    return getSignedUrl(scoreIdslist)
    #return scoreIdslist






def getSignedUrl(filename):
    filenames = []
    file_name_db = []
    url =[]
    final_return = []
    if len(filename)>0:
        for i in filename:
            
            doc = return_db().collection("Documents").document(i).get()
            filenames.append(doc.to_dict()['doc_url'])
            file_name_db.append(doc.to_dict()["doc_name"])
        #storage_client = storage.Client.from_service_account_json(os.environ['lawflow_new'])
        storage_client = storage.Client.from_service_account_json('lawflowNew_credentials.json')
        bucket = storage_client.bucket('lawflow')
        for i in filenames:
            #print("i:",i)
            file_name = i.rsplit('/', 2)
            #filename=i[13:len(i)]
            blob = bucket.blob(f"{file_name[-2]}/{file_name[-1]}")
            #blob = bucket.blob(f"OCR/test3.jpeg01_09_2022 14_55_41")
            # print(blob)
            # print(f"{file_name[-2]}/{file_name[-1]} ")
            # print("filename:",file_name)
            # print("filename2:",file_name[-2])
            # print("filename1:",file_name[-1])
            #blob = bucket.blob(f'{searchtype}/{file_name}')
            #print(blob.exists())
            url_gen = blob.generate_signed_url(
                version="v4",
                # This URL is valid for 15 minutes
                expiration=datetime.timedelta(hours=2),
                # Allow GET requests using this URL.
                method="GET",
            )
            # print(url_gen)
            url.append(url_gen)
            final_return.append(filename)
            final_return.append(file_name_db)
            final_return.append(url)
            
        #print(url)
        return final_return
    else:
        return []

# initialize_app()
# getSignedUrl(['1662029742408043'])

def passSearchImageToOcr(filename):
    url = f"gs://lawflow/searchImage/{filename}"
    text = getOCRToken(url)
    tokenized_doc = tokenizeSearchDoc(text)
    return tokenized_doc

def getAllTokenizedDocs(username):
    tokens = getTokens(username)
    return tokens

def checkSimilarityOCR(filename, username,forwhat):
    tokens = getAllTokenizedDocs(username)
    tokenized_search_doc = passSearchImageToOcr(filename)
    return process_tfidf_similarity(tokens, tokenized_search_doc,forwhat)
    
    
def passSearchPDFtoReader(filename):
    gsutil = f"searchImage/{filename}" 
    url=PDFmodule.getSignedUrl(gsutil)
    text=readPdfFromURL(url)
    tokenizedDoc=tokenizeSearchDoc(text)
    return tokenizedDoc
    

 
def checkSimilarityPDF(filename,username,forwhat):
    tokens = getAllTokenizedDocs(username)
    tokenized_search_doc = passSearchPDFtoReader(filename)
    return process_tfidf_similarity(tokens,tokenized_search_doc,forwhat)
#checkSimilarity("match.JPG","AbeeraAmir")