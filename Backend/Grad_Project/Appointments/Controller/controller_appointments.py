import os
import base64
import re
import json
import path
import sys
from datetime import datetime
from cryptography.fernet import Fernet
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent.parent)
from db_connection import *
from Appointments.models.model_appointments import *
#initialize_app()
def setAppointments(username, Name, Desc, Date, sTime, eTime, Participants):
    obj1 = Appointment(username, Name, Desc, Date, sTime, eTime, Participants)
    obj1.setApt()
    return "Appointment Created",200

def getApptwithDate(username, date):
    obj1 = Appointment()
    return obj1.getDateAppointment(username,date)

def getExistingAppts(username, date, sTime, eTime):
    obj1 = Appointment()
    return str(int(obj1.AppointmentExists(username, date, sTime, eTime))),200

#arr = getApptwithDate("AbeeraAmir","25/10/2022")
#print(arr)
# def overlaps(interval1, interval2):
#     results = []
#     for timestamp in interval1:
#         results.append(interval2[0] < timestamp < interval2[1])
#     for timestamp in interval2:
#         results.append(interval1[0] < timestamp < interval1[1])
#     return True in results

# timerange1 = {'ending_time': '26/02/2016 17:11', 'starting_time': '26/02/2016 06:10'}
# timerange2 = {'ending_time': '26/02/2016 17:15', 'starting_time': '26/02/2016 17:12'}

# interval1 = [datetime.strptime(timerange1['starting_time'], "%d/%m/%Y %H:%M"),
#              datetime.strptime(timerange1['ending_time'], "%d/%m/%Y %H:%M")]
# interval2 = [datetime.strptime(timerange2['starting_time'], "%d/%m/%Y %H:%M"),
#              datetime.strptime(timerange2['ending_time'], "%d/%m/%Y %H:%M")]
#print(overlaps(interval1,interval2))
