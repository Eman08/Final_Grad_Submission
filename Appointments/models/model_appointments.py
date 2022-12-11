import uuid
import path
import sys
import json
from datetime import datetime
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent.parent)
from db_connection import *

class Appointment(object):
    def __init__(self, username=None, name=None, desc=None, date=None, sTime=None, eTime=None, arrPcpt=None):
        self.username=username
        self.name=name
        self.desc=desc
        self.date=date
        self.sTime=sTime
        self.eTime=eTime
        self.arrPcpt=arrPcpt
        

    def setApt(self):
        ref = return_db().collection(u'Appointments').document(self.username)

        id = str(uuid.uuid1())
        data = {
            u'id': id,
            u'name': self.name,
            u'desc': self.desc,
            u'date': self.date,
            u'sTime': self.sTime,
            u'eTime': self.eTime,
            u'Pcpt': self.arrPcpt
        }

        ref.update({u'Appt': firestore.ArrayUnion([data])})
    def setAptCol(self,username):
        return_db().collection(u'Appointments').document(username).set({})
        id = str(uuid.uuid1())
        data = {
            u'id': id,
            u'name': self.name,
            u'desc': self.desc,
            u'date': self.date,
            u'sTime': self.sTime,
            u'eTime': self.eTime,
            u'Pcpt': self.arrPcpt
        }
        return_db().collection(u'Appointments').document(username).update({u'Appt': firestore.ArrayUnion([data])})
    def getAllAppointments(self, username):
        doc_ref = return_db().collection(u'Appointments').document(username).get()
        #print(doc_ref.to_dict()["Appt"])
        return doc_ref.to_dict()["Appt"]


    def getAptWithID(self, username, AptID=str):
        doc_ref = return_db().collection(u'Appointments').document(username).get()
        arr = []

        for doc in doc_ref.to_dict()["Appt"]:
            arr.append(doc)

        for variable in arr:
            if variable["id"] == AptID:
                return variable

        return "Error", 404



    def deleteApt(self, username, AptID=str):

        docs = return_db().collection(u'Appointments').document(username).get()
        arr = []
        for doc in docs.to_dict()["Appt"]:
            arr.append(doc)
            for field in arr:
                if field["id"] == AptID:
                    arr.remove(field)


        return_db().collection(u'Appointments').document(username).update({u'Appt': arr})

        return {"Success":"Appointment Deleted" }, 200



    def updateField(self, username=str, AptID=str, field=str):

        data = json.loads(field)
        print(data)
        for key, value in data.items():
            docs = return_db().collection(u'Appointments').document(username).get()
            arr = []
            for doc in docs.to_dict()["Appt"]:
                arr.append(doc)
            for field in arr:
                if field["id"] == AptID:
                    if key != "username":
                        field[key] = value

            return_db().collection(u'Appointments').document(username).update({u'Appt': arr})
      

        return "Fields updated", 200


    def AddPcpt(self, username, AptID, field):

        data = json.loads(field)
        for key, value in data.items():
            docs = return_db().collection(u'Appointments').document(username).get()
            arr = []
            for doc in docs.to_dict()["Appt"]:
                arr.append(doc)
            for field in arr:
                if field["id"] == AptID:
                    if key == "Pcpt":
                        field[key].extend(value)

            return_db().collection(u'Appointments').document(username).update({u'Appt': arr})

        return "Pcpt Added", 200



    def removePcpt(self, username, AptID, field):

        data = json.loads(field)
        for key, value in data.items():
            docs = return_db().collection(u'Appointments').document(username).get()
            arr = []
            for doc in docs.to_dict()["Appt"]:
                arr.append(doc)
            for field in arr:
                if field["id"] == AptID:
                    if key == "Pcpt":
                        ind = field[key].index(value)
                        field[key].pop(ind)

            return_db().collection(u'Appointments').document(username).update({u'Appt': arr})
            
        return "Pcpt Removed", 200

    def overlaps(self,interval1, interval2):
        results = []
        for timestamp in interval1:
            results.append(interval2[0] <= timestamp <= interval2[1])
        for timestamp in interval2:
            results.append(interval1[0] <= timestamp <= interval1[1])
        return True in results

    def get_stime(self,appointments):
        return appointments.get('sTime')
    def getDateAppointment(self, username, date):
        docs = return_db().collection(u'Appointments').document(username).get()
        result = []
        for i in docs.to_dict()["Appt"]:
            if i["date"] == date:
                result.append(i)
        result.sort(key = Appointment().get_stime)
        return result         
    def AppointmentExists(self,username, date, sTime, eTime):
        docs = return_db().collection(u'Appointments').document(username).get()
        result = []
        startTime = ""
        endTime = ""
        edateANDtime = ""
        sdateANDtime = ""
        flag = 0
        for i in docs.to_dict()["Appt"]:
            if i["date"] == date:
                flag = 1
                startTime = i["sTime"]
                endTime = i["eTime"]
                edateANDtime = date + " "+endTime
                sdateANDtime = date + " "+startTime
                timerange1 = {'ending_time': edateANDtime, 'starting_time': sdateANDtime}
                edateANDtime = date + " "+eTime
                sdateANDtime = date + " "+sTime
                timerange2 = {'ending_time': edateANDtime, 'starting_time': sdateANDtime}
                interval1 = [datetime.strptime(timerange1['starting_time'], "%d/%m/%Y %H:%M"),
                            datetime.strptime(timerange1['ending_time'], "%d/%m/%Y %H:%M")]
                interval2 = [datetime.strptime(timerange2['starting_time'], "%d/%m/%Y %H:%M"),
                            datetime.strptime(timerange2['ending_time'], "%d/%m/%Y %H:%M")]
        if flag == 1:
            return Appointment().overlaps(interval1,interval2)
        return "2"




                

#arr = ["abeera.amir@hotmail.com", "emanmulla@hotmail.com"]

#obj1 = Appointment(username="AbeeraAmir", name="Meeting 5000", desc="This is my first meeting", date="13/10/2022", sTime="13:00", eTime="14:00", arrPcpt=["abeera","shaad"])

#obj2 = Appointment(username="AbeeraAmir", name="Test", desc="Second", date="13/10/2022", sTime="13:00", eTime="14:00", arrPcpt=["me1","her2"])

#obj = Appointment(username="AyushiAgnihori", name="Emaan Mdeeting", desc="1111", date="13/10/2022", sTime="13:00", eTime="14:00", arrPcpt=["me1","her2"])

#obj2.updateField("c1ebc46a-375a-11ed-8a8a-dca26666330c",'{"date":"24/10/2001", "startTime":"OK", "desc":"Hello Abeera"}')

#obj1.getAppointments()

#obj2.setApt()

#obj2.deleteApt("d3be3212-41df-11ed-9ba9-dca26666330c")

#obj2.removePcpt("AbeeraAmir", "22f64a09-41b5-11ed-bf84-dca26666330c", '{"Pcpt":"uni"}')

#obj2.getAptWithID("AbeeraAmir", "22f64a09-41b5-11ed-bf84-dca26666330c")
