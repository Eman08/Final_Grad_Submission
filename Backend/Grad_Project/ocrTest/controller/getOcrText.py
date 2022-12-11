from ast import Str
import json
#import bcrypt
import path 
import sys
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
#from db_connection import *
from controller.ocr1 import *
from model.checkCategory import *
from collections import defaultdict



def getCommonWords():
    file_read=open("Grad_Project\ocrTest\commonWords.txt")
    line=file_read.readline()
    words=[]
    for line in file_read:
        words.append(line.strip())
    return words



def removeCommon(gsutil):
    commonList=getCommonWords()
    OCRlist=getOCRlist(gsutil)
    for i in OCRlist:
        if i in commonList:
            OCRlist=[x for x in OCRlist if x!=i]
    first100=[]
    for x in OCRlist:
        if x.lower() not in first100:
            first100.append(x.lower())
            if len(first100)==101:break
    return first100

matchedDict=defaultdict(list)
def matchWithCategory(gsutil):
    catDict=getCategories()
    commonGone=removeCommon(gsutil)
    for k, dv in catDict.items():
        for x in dv:
            if x in commonGone:
                matchedDict[k].append(x)
    matchedDict["Other"].append("Others")
    return matchedDict

#print(sorted(matchWithCategory().items()))
#ict=matchWithCategory(gsutil)
#print(sorted(matchedDict.items()))
def checkIfMultipleCategory():
    for k,dv in sorted(matchedDict.items()):
        if len(dv)>1:
            print("Chose 1") #User choses 1
            print(dv[0])
            return dv[0],k
        else: return dv[0],k


#Using normal dicts   Can remove later 
# matchedDict={}
# def matchWithCategory():
#     catDict=getCategories()
#     commonGone=removeCommon()
#     for k, dv in catDict.items():
#         for x in dv:
#             if x in commonGone:
#                 matchedDict[k]=x
#     return matchedDict

