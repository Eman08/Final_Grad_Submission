import json
import os
from flask import Flask, request, json, Blueprint
import time
import sys
import path
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent)
from SearchByTag_Model import *
from flask_restful import Resource,Api, reqparse

searchByTag=Blueprint('searchByTag',__name__,url_prefix='/searchByTag')
@searchByTag.route("/takeKeywords",methods=['POST'])
def takeKeywords(): 
    data=json.loads(request.data)
    time.sleep(1)
    username = data ["username"]
    text=data["text"]
    result = getDocs(text, username)
    print(result)
    if(result[1]=="No result Found"):
        return result,404
    else:
        return result

