from flask import Flask, request, json, Blueprint
from flask_restful import Resource, Api, reqparse
import path
import time
import sys
import datetime
import string
from operator import itemgetter
import random
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from db_connection import *
import datetime
from google.cloud import storage



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


class getCategories(object):
    def __init__(self, caseID = None):
        self.caseID = caseID

    def getAllCategories(self):
        categories = ["General"]
        new_cat_array=[]
        doc_ref = return_db().collection('Cases').document(self.caseID).get()
        docs = doc_ref.to_dict()["DocIds"]
        if docs != None:
            for i in docs:
                temp_dict = {}
                docid_ref = return_db().collection('Documents').document(i).get()
                for j in docid_ref.to_dict()["category"]:
                    categories.append(j)
                categories = [*set(categories)]

        if len(categories)!=0:
            for i in categories:
                i = string.capwords(i)
                new_cat_array.append(i)
            new_cat_array.sort()
            return new_cat_array

        return categories
    
    def getDocsPerCategory(self, category):
        all_doc_info = []
        doc_ref = return_db().collection('Cases').document(self.caseID).get()
        docs = doc_ref.to_dict()["DocIds"]
        if docs != None:
            for i in docs:
                temp_dict={}
                docid_ref = return_db().collection('Documents').document(i).get()
                for j in docid_ref.to_dict()["category"]:
                    if j.lower() == category.lower():
                        temp_dict["summary"] = docid_ref.to_dict()["summary"]
                        temp_dict["doc_name"] = docid_ref.to_dict()["doc_name"]
                        temp_dict["doc_id"] = docid_ref.id
                        gsutil = docid_ref.to_dict()["doc_url"]
                        gsutil_1 = docid_ref.to_dict()["doc_url"]
                        gsutil_1= gsutil_1.rsplit("/")
                        sliced = gsutil[13:len(gsutil)]
                        temp_dict["url"] = getSignedUrl(sliced)
                        all_doc_info.append(temp_dict)

        
        return all_doc_info

    def getAllCategoriesDescending(self):
        categories = ["General"]
        new_cat_array=[]
        doc_ref = return_db().collection('Cases').document(self.caseID).get()
        docs = doc_ref.to_dict()["DocIds"]
        if docs != None:
            for i in docs:
                temp_dict = {}
                docid_ref = return_db().collection('Documents').document(i).get()
                for j in docid_ref.to_dict()["category"]:
                    categories.append(j)
                categories = [*set(categories)]

        if len(categories)!=0:
            for i in categories:
                i = string.capwords(i)
                new_cat_array.append(i)
            new_cat_array.sort(reverse=True)
            print(new_cat_array)
            return new_cat_array

        return categories

    def sortAccordingToCategoriesAscending1(self, category):
        all_doc_info = []
        new_list = []
        doc_ref = return_db().collection('Cases').document(self.caseID).get()
        docs = doc_ref.to_dict()["DocIds"]
        if docs != None:
            for i in docs:
                temp_dict={}
                docid_ref = return_db().collection('Documents').document(i).get()
                for j in docid_ref.to_dict()["category"]:
                    if j.lower() == category.lower():
                        temp_dict["summary"] = docid_ref.to_dict()["summary"]
                        temp_dict["doc_name"] = docid_ref.to_dict()["doc_name"]
                        temp_dict["doc_id"] = docid_ref.id
                        gsutil = docid_ref.to_dict()["doc_url"]
                        gsutil_1 = docid_ref.to_dict()["doc_url"]
                        gsutil_1= gsutil_1.rsplit("/")
                        sliced = gsutil[13:len(gsutil)]
                        temp_dict["url"] = getSignedUrl(sliced)
                        all_doc_info.append(temp_dict)

        new_list= sorted(all_doc_info, key=itemgetter('doc_name'))
        return new_list

    def sortAccordingToCategoriesDescending(self, category):
            all_doc_info = []
            new_list = []
            doc_ref = return_db().collection('Cases').document(self.caseID).get()
            docs = doc_ref.to_dict()["DocIds"]
            if docs != None:
                for i in docs:
                    temp_dict={}
                    docid_ref = return_db().collection('Documents').document(i).get()
                    for j in docid_ref.to_dict()["category"]:
                        if j.lower() == category.lower():
                            temp_dict["summary"] = docid_ref.to_dict()["summary"]
                            temp_dict["doc_name"] = docid_ref.to_dict()["doc_name"]
                            temp_dict["doc_id"] = docid_ref.id
                            gsutil = docid_ref.to_dict()["doc_url"]
                            gsutil_1 = docid_ref.to_dict()["doc_url"]
                            gsutil_1= gsutil_1.rsplit("/")
                            sliced = gsutil[13:len(gsutil)]
                            temp_dict["url"] = getSignedUrl(sliced)
                            all_doc_info.append(temp_dict)

            new_list= sorted(all_doc_info, key=itemgetter('doc_name'), reverse=True)
            return new_list

    



