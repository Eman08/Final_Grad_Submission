from ast import Num, Str
import json
import bcrypt
import path
import sys
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent.parent)
from db_connection import *

class ToDoListRegister(object):
    def __init__(self, username=None, todoListItem=None, todoListId=None, status=None, activityDescription = None, assigned_by=None, task_id=None, case_id=None):
        self.username = username
        self.todoListItem = todoListItem
        self.todoListId = todoListId
        self.status = status
        self.activity_description = activityDescription
        self.assigned_by = assigned_by
        self.task_id=task_id
        self.case_id=case_id

    def setTodoList(self):
        
        data = {
            u'id': self.todoListId,
            u'todoListItem': self.todoListItem,
            u'status': self.status,
            u'acitvity_description':self.activity_description,
            u'assigned_by':self.assigned_by,
            u'task_id':self.task_id,
            u'case_id':self.case_id
    
        }
        print(data)
        return_db().collection(u'laywers').document(self.username).update(
            {u'todolist': firestore.ArrayUnion([data])})
        return "Added"

    def getTodoList(self):
        doc_ref = return_db().collection(u'laywers').document(self.username).get()
        for doc in doc_ref.to_dict():
            if doc == "todolist":
                return doc_ref.to_dict()["todolist"]

        return []
        

    def getParticularCase(self, id=str):
        docs = return_db().collection(u'laywers').document(self.username).get()
        # for doc in docs:
        original_array = []

        for doc in docs.to_dict()["todolist"]:
            original_array.append(doc)

        for variable in original_array:
            if variable["id"] == id:
                return variable

        return {"Error"}, 404

    def deleteToDoListItems(self, todolistId=str):
        docs = return_db().collection(u'laywers').document(self.username).get()
        # for doc in docs:
        original_array = []

        for doc in docs.to_dict()["todolist"]:
            original_array.append(doc)

        for variable in original_array:
            if variable["id"] == todolistId:
                original_array.remove(variable)

        return_db().collection(u'laywers').document(
            self.username).update({u'todolist': original_array})

        return {"Success":"Item has been deleted"},200

    def updateStatus(self, todolistId=str, updateValue=str):
        docs = return_db().collection(u'laywers').document(self.username).get()
        original_array = []

        for doc in docs.to_dict()["todolist"]:
            original_array.append(doc)

        for variable in original_array:
            if variable["id"] == todolistId:
                variable["status"] = updateValue

        return_db().collection(u'laywers').document(
            self.username).update({u'todolist': original_array})
        
        return {"Success":"Status has been updated"},200

    def updateActivity(self, todolistId=str, updateValue=str):
        docs = return_db().collection(u'laywers').document(self.username).get()
        original_array = []

        for doc in docs.to_dict()["todolist"]:
            original_array.append(doc)

        for variable in original_array:
            if variable["id"] == todolistId:
                variable["todoListItem"] = updateValue

        return_db().collection(u'laywers').document(
            self.username).update({u'todolist': original_array})
        
        return {"Success":"To do list activity has been updated"},200

    def checkUserExists(self, username=str):
        docs = return_db().collection(u'laywers').stream()
        for doc in docs:
            if doc.id == username:
                return 'True'
        return 'False'

    def getCaseId(self, id=str):
        
        print(id)
        docs = return_db().collection(u'laywers').document(self.username).get()
        original_array=[]
        for doc in docs.to_dict():
            if doc == "todolist":
                for doc in docs.to_dict()["todolist"]:
                    original_array.append(doc)

                for variable in original_array:
                    if variable["id"] == id:
                        return "False"
 
        return "True"
