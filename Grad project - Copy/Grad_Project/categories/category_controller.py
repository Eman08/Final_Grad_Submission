from venv import create
import jwt
import sys
import path
import sys
import datetime
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from categories.categories_model import *

def getAllCategories(caseID):
    obj = getCategories(caseID)
    return obj.getAllCategories()

def getAllDocumentsForEachCategory(caseID, category):
    obj = getCategories(caseID)
    return obj.getDocsPerCategory(category)

def getAllCategoriesDescending(caseID):
    obj = getCategories(caseID)
    return obj.getAllCategoriesDescending()

def getDocsAscendingbyCat(caseID, category):
    obj = getCategories(caseID)
    return obj.sortAccordingToCategoriesAscending1(category)

def getDocsDescendingbyCat(caseID, category):
    obj = getCategories(caseID)
    return obj.sortAccordingToCategoriesDescending(category)