from array import array
from venv import create
import jwt
import sys
import path
import sys
import datetime
import random, string
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from filters.filter_model import *

def getCaseByDate(username, date):
    obj = filter()
    return obj.filterBasedOnDate(username, date)

def getCaseByCourtType(username, courtType):
    obj = filter()
    return obj.getByCourtType(username, courtType)

def getCaseByCaseType(username, caseType):
    obj = filter()
    return obj.getByCaseType(username, caseType)

def filterFilesByDates(docID, date_sent):
    obj = filter()
    return obj.filterByCaseDates(docID, date_sent)

def filterByAscending(caseID):
    obj = filter()
    return obj.filterByAlphabeticAZ(caseID)

def filterByDescending(caseID):
    obj = filter()
    return obj.filterByAlphabeticZA(caseID)