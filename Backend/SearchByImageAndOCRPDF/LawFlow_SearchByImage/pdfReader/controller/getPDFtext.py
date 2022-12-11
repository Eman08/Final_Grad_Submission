import sys
import os
import time
import path
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.stem import WordNetLemmatizer
import string
nltk.download('stopwords')
nltk.download('wordnet')
from collections import defaultdict
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent.parent)

from ocrTest.model.checkCategory import *
from pdfReader.pdfMain import *
from pdfReader.model.FirebasePdf import storeToFirebasePDF
from SeachByImage.NLP1 import saveTokenizeToFirestore
from ocrTest.controller.summary import *


# def getCommonWordsPDF():
#     file_read=open("D:\HDD APPS\CODE\Google Stuf\Grad_Project\ocrTest\commonWords.txt")
#     line=file_read.readline()
#     words=[]
#     for line in file_read:
#         words.append(line.strip())
#     return words

# def PDFremoveCommon(gsutil):
#     commonList=getCommonWordsPDF()
#     pdfList=strToList(gsutil)
#     for i in pdfList:
#         if i in commonList:
#             pdfList=[x for x in pdfList if x!=i]
#     first100=[]
#     for x in pdfList:
#         if x.lower() not in first100:
#             first100.append(x.lower())
#             if len(first100)==101:break
#     return first100

#print(PDFremoveCommon('Grad_Project\pdfReader\pdfTest.pdf'))



def removeStopWords(url,idds):
    fulltext=readPdfFromURL(url)
    if len(fulltext)>50:
        summary=generate_summary(fulltext,1)
        
    else: summary=['None']
    lowered=str.lower(fulltext)
    word_tokens = word_tokenize(lowered)
    lemmatizer = WordNetLemmatizer()
    stop_words = set(stopwords.words('english'))
    words=[]
    for w in word_tokens:
            if w not in stop_words:
                if w not in string.punctuation:
                    if len(w) > 1:
                        lemmatized = lemmatizer.lemmatize(w)
                        words.append(lemmatized)
    wordsJoin=" ".join(words)
    saveTokenizeToFirestore(wordsJoin,idds)
    return words,summary








def matchwithCategoryPDF(url,gsutil,idds,name):
    matchedDict=defaultdict(list)
    catDict=getCategories()
    stopGone,summary=removeStopWords(url,idds)
    
    for k, dv in catDict.items():
        for x in dv:
            #print(x)
            if x.lower() in stopGone:
                matchedDict[k].append(x)
    matchedDict["Other"].append("Others")
    storeToFirebasePDF(gsutil,idds,name,url,stopGone[:101],summary)
    return matchedDict

#print(dict(matchwithCategoryPDF("Grad_Project\pdfReader\pdfTest.pdf")))
