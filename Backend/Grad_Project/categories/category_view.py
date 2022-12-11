from venv import create
import jwt
import sys
import path
import sys
import datetime
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from categories.category_controller import *
from flask import Flask, request, json, Blueprint
from flask_restful import Resource, Api, reqparse

categoriesDocs = Blueprint('categoriesDocs',__name__, url_prefix = '/categoriesDocs')

@categoriesDocs.route("/getAllCategories", methods=['POST'])
def getCategoriesView():
    data = json.loads(request.data)
    time.sleep(1)
    caseID = data["caseID"]
    if caseID == "":
        return {"Error":"CASE id is null"},404
    else:
        return getAllCategories(caseID)

@categoriesDocs.route("/getDocsForCategory", methods=['POST'])
def getDocsForCategoryView():
    data = json.loads(request.data)
    time.sleep(1)
    caseID = data["caseID"]
    category = data["category"]
    if caseID == "" or category == "":
        return {"Error":"Case id or category is null"},404
    else:
        return getAllDocumentsForEachCategory(caseID, category)

@categoriesDocs.route("/getCategoriesInDescending",methods=["POST"])
def getDescendingCategoryView():
    data = json.loads(request.data)
    time.sleep(1)
    caseID = data["caseID"]
    if caseID == "":
        return {"Error":"CASE id is null"},404
    else:
        return getAllCategoriesDescending(caseID)

@categoriesDocs.route("/getCategoriesDesc", methods=["POST"])
def getCategoiresDescView():
    data = json.loads(request.data)
    time.sleep(1)
    caseID = data["caseID"]
    category = data["category"]
    if caseID == "":
        return {"Error":"CASE id is null"},404
    else:
        return getDocsDescendingbyCat(caseID, category)

@categoriesDocs.route("/getCategoriesAsc", methods=["POST"])
def getCategoiresAscView():
    data = json.loads(request.data)
    time.sleep(1)
    caseID = data["caseID"]
    category = data["category"]
    if caseID == "":
        return {"Error":"CASE id is null"},404
    else:
        return getDocsAscendingbyCat(caseID, category)


