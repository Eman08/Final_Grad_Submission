from ast import Num, Str
import json
import bcrypt
import path
import sys
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from db_connection import *


def getWorkflowIds(username):
    workflow_ids=[]
    doc_ref = return_db().collection('Cases').stream()
    for doc in doc_ref:
            for var in doc.to_dict()["assignedLawyers"]:
                if var == username:
                    workflow_ids.append(doc.id)
    print(workflow_ids)
    return getTasksDone(workflow_ids)
    

def getTasksDone(workflow_ids):
    all_values={}

    for i in workflow_ids:
        total_tasks=0
        in_progress = 0
        completed = 0
        not_started = 0
        cases_ref = return_db().collection('Cases').document(i).get()
        case_name = cases_ref.to_dict()["CaseName"]
        doc_ref = return_db().collection('Workflow').document(i).get()
        var = doc_ref.to_dict()
        if(var != None):
            total_tasks=(len(var))
            for j in doc_ref.to_dict():
                if doc_ref.to_dict()[j]["Status"] == "Not Started":
                        not_started=not_started+1
                elif doc_ref.to_dict()[j]["Status"] == "Completed":
                        completed=completed+1
                elif doc_ref.to_dict()[j]["Status"] == "Started":
                        in_progress=in_progress+1
            
            value = {"workflow_id":case_name, "total_tasks":total_tasks, "completed":completed, "started":in_progress, "not-started":not_started}
            all_values[i] = value
    
    return all_values
        
           
        
