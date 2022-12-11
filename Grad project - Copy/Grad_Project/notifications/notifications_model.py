import operator
from flask import Flask, request, json, Blueprint
from flask_restful import Resource, Api, reqparse
import path
import time
import sys
import datetime
import random
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from db_connection import *
from datetime import datetime

def getContactId(username, id):
        doc_ref= return_db().collection(u'Notification').document(username).get()
        contact_array = []  
        notifs = (doc_ref.to_dict()["Notifs"])
        if(len(notifs)>1):
            for doc in doc_ref.to_dict()["Notifs"]:
                contact_array.append(doc["notif_id"])
            for value in contact_array:
                if value == id:
                    return "False"
        return "True"   
        

def addNotificationsForMultipleUsers(usernames, notification, title):
    for i in usernames:
        doc_ref = return_db().collection('Notification').document(i)
        notif_id = random.randint(1, 9999)
        var = getContactId(i, notif_id)
        while var == "False":
            notif_id = random.randint(1, 9999)
            var = getContactId(i, notif_id)

        obj ={
            "title":title,
            "delivered":"false",
            "notification": notification,
            "notif_id": notif_id,
            "time": datetime.today().strftime('%Y-%m-%d')
        }
        doc_ref.update({u'Notifs':firestore.ArrayUnion([obj])})
    return {"Added Succesfully"}


def addNotificationforOneUser(username, notification, title):
    doc_ref = return_db().collection('Notification').document(username)
    notif_id = random.randint(1, 9999)
    var = getContactId(username, notif_id)
    while var == "False":
        notif_id = random.randint(1, 9999)
        var = getContactId(username, notif_id)

    obj ={
            "title":title,
            "delivered":"false",
            "notification": notification,
            "time": datetime.today().strftime('%Y-%m-%d'),
            "notif_id":notif_id
        }
    doc_ref.update({u'Notifs':firestore.ArrayUnion([obj])})
    return {"Added Successfully"}


def deleteNotification(username, notificationID):
    doc_ref = return_db().collection('Notification').document(username)
    document = doc_ref.get().to_dict()['Notifs']
    new_arr=[]
    for d in document:
        if d["id"] != notificationID:
            new_arr.append(d)
    
    doc_ref.update({u'Notifs': new_arr})
    return {"Notification deleted"}
            
def deleteNotifDate(username):
    doc_ref = return_db().collection('Notification').document(username)
    document= doc_ref.get().to_dict()['Notifs']

    for var in document:
        todays_date = datetime.today().strftime('%Y-%m-%d')
        result = datetime.strptime(todays_date, '%Y-%m-%d').date() - datetime.strptime(var["time"], '%Y-%m-%d').date()
        split_result = str(result).split('days')[0]
        if split_result != "0:00:00":
            if int(split_result) >= 5:
                doc_ref.update({u'Notifs':firestore.ArrayRemove([var])})
    return {"Success"}
       
def getAllNotificationsForUsername(username):
    doc_ref = return_db().collection('Notification').document(username).get()
    arranged_notifs = []
    for i in doc_ref.to_dict()["Notifs"]:
        arranged_notifs.append(i)
    arranged_notifs.sort(key=operator.itemgetter('time'),reverse=True)
    return arranged_notifs

def changeDeliveredToTrue(username, notifID):
    j = 0
    updatedElement = ""
    doc_ref = return_db().collection('Notification').document(username).get()
    city_ref = return_db().collection(u'Notification').document(username)
    for i in doc_ref.to_dict()["Notifs"]:
        if i["notif_id"] == notifID:
            city_ref.update({u'Notifs': firestore.ArrayRemove([i])})    
            updatedElement = i
            break
        j = j+1
    updatedElement['delivered'] = "true"
    city_ref.update({u'Notifs': firestore.ArrayUnion([updatedElement])})

