import sys
import os
import time
import path
from collections import defaultdict
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent.parent)

from ocrTest.model.checkCategory import *
from pdfReader.pdfMain import *


def getCommonWordsPDF():
    file_read=open("D:\HDD APPS\CODE\Google Stuf\Grad_Project\ocrTest\commonWords.txt")
    line=file_read.readline()
    words=[]
    for line in file_read:
        words.append(line.strip())
    return words

def PDFremoveCommon(gsutil):
    commonList=getCommonWordsPDF()
    pdfList=strToList(gsutil)
    for i in pdfList:
        if i in commonList:
            pdfList=[x for x in pdfList if x!=i]
    first100=[]
    for x in pdfList:
        if x.lower() not in first100:
            first100.append(x.lower())
            if len(first100)==101:break
    return first100

#print(PDFremoveCommon('Grad_Project\pdfReader\pdfTest.pdf'))

matchedDict=defaultdict(list)

def matchwithCategoryPDF(PDFpath):
    catDict=getCategories()
    commonGone=PDFremoveCommon(PDFpath)
    for k, dv in catDict.items():
        for x in dv:
            #print(x)
            if x.lower() in commonGone:
                matchedDict[k].append(x)
    matchedDict["Other"].append("Others")
    return matchedDict

#print(dict(matchwithCategoryPDF("Grad_Project\pdfReader\pdfTest.pdf")))
