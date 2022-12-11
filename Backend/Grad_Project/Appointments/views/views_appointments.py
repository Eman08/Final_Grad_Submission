import time
from flask import Flask, request, json, Blueprint
from flask_restful import Resource, Api, reqparse
import ast 
import sys
import path
import  datetime 
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from Controller.controller_appointments import *

Appointments = Blueprint('Appointments',__name__, url_prefix = '/Appointments')

@Appointments.route("/SetAppointments", methods=['POST'])
def newApt():
    data = json.loads(request.data)
    time.sleep(1)
    username=data["username"]
    Name=data["name"]
    Desc=data["desc"]
    Date=data["date"]
    sTime=data["sTime"]
    eTime=data["eTime"]
    Participants=data["Pcpt"]
    return setAppointments(username, Name, Desc, Date, sTime, eTime, Participants)

   
@Appointments.route("/UpdateAppointments", methods=['POST'])
def updateApt():
    data = json.loads(request.data)
    time.sleep(1)
    username=data["username"]
    AptID = data["id"]
    field = request.data
    object = Appointment(username, AptID, field )

    return object.updateField(username,AptID,field)

@Appointments.route("/getApptDate", methods=['POST'])
def AptDate():
    data = json.loads(request.data)
    time.sleep(1)
    username=data["username"]
    date = data["date"]
    return getApptwithDate(username,date)
@Appointments.route("/getExistingAppt", methods=['POST'])
def Apptexists():
    data = json.loads(request.data)
    time.sleep(1)
    username=data["username"]
    date = data["date"]
    sTime = data["sTime"]
    eTime = data["etime"]
    return getExistingAppts(username, date, sTime, eTime)

@Appointments.route("/DeleteAppointments", methods=['POST'])
def deleteApt():
    data = json.loads(request.data)
    print(data)
    time.sleep(1)
    username=data["username"]
    AptID = data["id"]
    object = Appointment(username, AptID)

    return object.deleteApt(username,AptID)


@Appointments.route("/AddParticipant", methods=['POST'])
def addPcpt():
    data = json.loads(request.data)
    print(data)
    time.sleep(1)
    username=data["username"]
    AptID = data["id"]
    Pcpt = request.data
    object = Appointment(username, AptID, Pcpt)

    return object.AddPcpt(username, AptID, Pcpt)


@Appointments.route("/RemoveParticipant", methods=['POST'])
def remPcpt():
    data = json.loads(request.data)
    print(data)
    time.sleep(1)
    username=data["username"]
    AptID = data["id"]
    Pcpt = request.data
    object = Appointment(username, AptID, Pcpt)

    return object.removePcpt(username, AptID, Pcpt)



@Appointments.route("/GetAllApt", methods=['POST'])
def getAllApt():
    data = json.loads(request.data)
    print(data)
    time.sleep(1)
    username=data["username"]
    object = Appointment(username)
    return object.getAllAppointments(username)



@Appointments.route("/GetAptWithID", methods=['POST'])
def getAptWithID():
    data = json.loads(request.data)
    print(data)
    time.sleep(1)
    username=data["username"]
    AptID = data["id"]
    object = Appointment(username, AptID)

    return object.getAptWithID(username, AptID)

@Appointments.route("/createCollection", methods=['POST'])
def createDoc():
      data = json.loads(request.data)
      time.sleep(1)
      username=data["username"]
      object  = Appointment("00","00", "00", "00", "00", "00","00")
      return object.setAptCol(username)
