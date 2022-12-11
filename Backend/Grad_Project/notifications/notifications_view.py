import os
import path
import sys
from flask import Flask, request, json, Blueprint
from flask_restful import Resource, Api, reqparse
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent)
from notifications.notifications_model import *


notifications = Blueprint('notifications',__name__, url_prefix='/notifications')
@notifications.route("/getNotifications",methods=["POST"])
def getNotifs():
    data=json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    return getAllNotificationsForUsername(username)

@notifications.route("/deleteNotifications",methods=["POST"])
def deleteNotifs():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    notification_id = data["notification_id"]
    return deleteNotification(username,notification_id)

@notifications.route("/autoDelete",methods=["POST"])
def deleteAutoNotifs():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    deleteNotifDate(username)
    return {"Success":"Notification Deleted"}

@notifications.route("/changeDelivered", methods=["POST"])
def changeDeliveredToView():
    data = json.loads(request.data)
    time.sleep(1)
    username = data["username"]
    notif_id = data["notif_id"]
    changeDeliveredToTrue(username, notif_id)
