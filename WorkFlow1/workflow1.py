from decimal import *
import decimal
from pydoc import doc
import sys
import path
import os
import bcrypt
import collections
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from db_connection import *
from datetime import datetime
from to_do_lists.controller.controller_to_do_list import checkUserExists
from notifications.notifications_model import *



# Add data to firestore
flow= ["task1","task2","task3","task4","task5"]
flowDescription=['Task1 Description','Task2 Description','Task3 Description','Task4 Description','Task5 Description']
flowParties=['Task1 Parties Involved','Task2 Parties Involved','Task3 Parties Involved','Task4 Parties Involved','Task5 Parties Involved']

                                    #Task list will be passed through frontend 
def createWorkFlow(tasksList,taskDescriptionList,taskPartiesList):      #Takes in List of main tasks and converts it into dict with stauts
    flowtoMap=[]            
    time=datetime.now()        
    for count,i in enumerate (tasksList):
        tempMap={"Task":i,
                 "Status":"Not_Started",
                 "Start_Time":"0.0",
                 "End_Time":"0.0",
                 "Descriptions":taskDescriptionList[count],
                 "Parties_Involved":taskPartiesList[count],
                 "Assigned_To":"None",
                 "Task_Type":"Parent",
                 "Task_id":str(count)}   #Converts Status of task 0 to Started instead of Pending, Might come usefull when starting tracking 
        flowtoMap.append(tempMap)
    flowtoMap[0]["Status"]="Started"
    flowtoMap[0]['Start_Time']=time.strftime("%x,%X")
    
    return flowtoMap
    


def addWorkFlow(taskList,taskDescriptionList,taskPartiesList,docId):            #Takes the task list, runs the creatWorkflow function-> gets the tasks dict -> puts it in another dict with numbers as Key->Upload
    flowtoMap=createWorkFlow(taskList,taskDescriptionList,taskPartiesList)
    flowDict={}
    for i in range (len(flowtoMap)):
        flowDict[str(i)]=flowtoMap[i]
    #doc_ref = return_db().collection(u'Workflow').document(str(docId))
    return_db().collection(u'Workflow').document(str(docId)).set(flowDict)
# initialize_app()
# addWorkFlow(flow,flowDescription,flowParties,"7777")

def ChangeParties(docId,Taskid,newMember):
    doc_ref=return_db().collection(u'Workflow').document(str(docId))
    doc = doc_ref.get()
    tempdict=doc.to_dict()
    # print(tempdict[Taskid]['Parties Involved'])
    # print(type(tempdict[Taskid]['Parties Involved']))
    partyList=[]
    if isinstance( (tempdict[Taskid]['Parties Involved']) ,list):
        # print("in")
        tempdict[Taskid]['Parties Involved'].append(newMember)
    else:
        partyList.append(tempdict[Taskid]['Parties Involved'])
        partyList.append(newMember)
        tempdict[Taskid]['Parties Involved']=partyList
    
    return_db().collection(u'Workflow').document(str(docId)).set(tempdict)
    #tempdict[str(decimal.Decimal(taskId.rpartition('.')[0]))]['Status'] != "Finished":   


# def updateTaskName(workflowID,taskID,newTaskName):
#     doc_ref=return_db().collection(u'Workflow').document(str(workflowID))
#     update= float(taskID)+'.Task'
#     print(update)
#     doc_ref.update({
#                     update:newTaskName
#                     })


def updateTaskName(workflowID,taskID,newTaskName):
    doc_ref=return_db().collection(u'Workflow').document(str(workflowID))
    doc = doc_ref.get()
    tempdict=doc.to_dict()
    print(tempdict[taskID])
    tempdict[taskID]['Task']=newTaskName
    return_db().collection(u'Workflow').document(str(workflowID)).set(tempdict)





def updateTaskDescription(workflowID,taskID,newTaskDescription):
    doc_ref=return_db().collection(u'Workflow').document(str(workflowID))
    doc = doc_ref.get()
    tempdict=doc.to_dict()
    print(tempdict[taskID])
    tempdict[taskID]['Descriptions']=newTaskDescription
    return_db().collection(u'Workflow').document(str(workflowID)).set(tempdict)


#updateTaskDescription(78910,'0','new task 1 Description')

#ChangeParties("7777777","0","new member 1")


#addWorkFlow(flow,flowDescription,flowParties,"78910")

# Add Sub task to firestore 
subTask=["Task1.3","Task1.3 Description","Task 1.3 Parties Involved"]
mainTaskIndex1="3"

def addSubTaskToWorkflow(subTask,mainTaskIndex,docId):
    doc_ref = return_db().collection(u'Workflow').document(str(docId))
    doc = doc_ref.get()
    tempdict=doc.to_dict()
    tempList=[]
    for i in tempdict.keys():
        if i.rpartition('.')[0] == mainTaskIndex:            #Check if other sub branches exist from main branch 
            #print(i , "true")
            tempList.append(i)
            
    getcontext().prec=2
    subTaskDict={"Task":subTask[0],
                 "Status":"Not Started ",
                 "Start_Time":"0.0",
                 "End_Time":"0.0",
                 "Descriptions":subTask[1],
                 "Parties Involved":subTask[2],
                 "Assigned_To":"None",
                 "Task_Type":"Sub-task",
                 "Task_id":'0',
                 "Main_task_id":str(mainTaskIndex)}
    if (not tempList):                                          #If no sub branches exist of main, add 0.1 to main and upload 
        subTaskDict['Task_id']=str(float(mainTaskIndex)+0.1)
        tempdict[str(float(mainTaskIndex)+0.1)]=subTaskDict
    else:
        
        subTaskDict['Task_id']=str(  decimal.Decimal.from_float(float(max(tempList)) ) + decimal.Decimal('0.1') )
        tempdict[str(  decimal.Decimal.from_float(float(max(tempList)) ) + decimal.Decimal('0.1') )]=subTaskDict    #if subbranches do exist of main, add 0.1 to the highest subbranch and upload 
    return_db().collection(u'Workflow').document(str(docId)).set(tempdict)

#initialize_app()
# addSubTaskToWorkflow(subTask,'1','111111111')

# subTaskMap=[
#     [0, [["maintask","0"], ["subtask","main0 SUBTASK 1"], ["subtaskdesc","hello"], ["assigntedto","Emaan"]]],
#     [1, [["maintask","0"], ["subtask","main0 SUBTASK 2"], ["subtaskdesc","hello"], ["assigntedto","Emaan"]]],
#     [2, [["maintask","1"], ["subtask","main1 SUBTASK 1"], ["subtaskdesc","hello"], ["assigntedto","Emaan"]]],
#     [3, [["maintask","1"], ["subtask","main1 SUBTASK 2"], ["subtaskdesc","hello"], ["assigntedto","Emaan"]]],
# ]


def addSubTaskToWorkflowNEW(subTaskMap,docId):
    doc_ref = return_db().collection(u'Workflow').document(str(docId))
    doc = doc_ref.get()
    tempdict=doc.to_dict()
    tempList=[]

    getcontext().prec=2
    # print(len(subTaskMap))
    for i in range (0,len(subTaskMap)):
        
        # print(subTaskMap[i])
        mainTaskid=subTaskMap[i][1][0][1]   #Gets main task id 
        subtaskName=subTaskMap[i][1][1][1]       #Gets subtask name
        subtaskDesc=subTaskMap[i][1][2][1]       #Gets Subtask desc
        subtaskAssigned=subTaskMap[i][1][3][1]      #Gets subtask assigned to
    
        subTaskDict={"Task":subtaskName,
                    "Status":"Not Started ",
                    "Start_Time":"0.0",
                    "End_Time":"0.0",
                    "Descriptions":subtaskDesc,
                    "Parties Involved":subtaskAssigned,
                    "Assigned_To":"None",
                    "Task_Type":"Sub-task",
                    "Task_id":'0',
                    "Main_task_id":str(mainTaskid)}
        
        if i==0:
            subTaskDict['Task_id']=str(float(mainTaskid)+0.1)
            tempdict[str(float(mainTaskid)+0.1)]=subTaskDict
            
        if i!=0: 
            # print("in loop 1")
            if mainTaskid==subTaskMap[i-1][1][0][1]:
                # print(subtaskName)
                for x in tempdict:
                    if x.rpartition('.')[0] == mainTaskid:  
                        tempList.append(x)
                
                if mainTaskid=='0':
                    subTaskDict['Task_id']=(str(  decimal.Decimal.from_float(float(max(tempList)) ) + decimal.Decimal('0.1') ))[0:3]
                    tempdict[(str(  decimal.Decimal.from_float(float(max(tempList)) ) + decimal.Decimal('0.1') ))[0:3]]=subTaskDict
                else:
                
                # print("TempList ",tempList)               
                    subTaskDict['Task_id']=str(  decimal.Decimal.from_float(float(max(tempList)) ) + decimal.Decimal('0.1') )
                    tempdict[str(  decimal.Decimal.from_float(float(max(tempList)) ) + decimal.Decimal('0.1') )]=subTaskDict
            # print(type(mainTaskid))
            # print(type(i))
            # print(type(subTaskMap[i-1][1][0][1]))

            if mainTaskid!=subTaskMap[int(i)-1][1][0][1]:           #Check if current maintask was not = previous
                # print("TRUE")
                tempList=[]
                subTaskDict['Task_id']=str(float(mainTaskid)+0.1)
                tempdict[str(float(mainTaskid)+0.1)]=subTaskDict
    
    # for x in tempdict:
    #     print("TempDict: ",x)
    # for k,v in tempdict.items():
    #     print( k , v )
    # print(tempdict)
    return_db().collection(u'Workflow').document(str(docId)).set(tempdict)     
        
        
    # if (not tempList):                                          #If no sub branches exist of main, add 0.1 to main and upload 
    #     subTaskDict['Task_id']=str(float(mainTaskIndex)+0.1)
    #     tempdict[str(float(mainTaskIndex)+0.1)]=subTaskDict
    # else:
        
    #     subTaskDict['Task_id']=str(  decimal.Decimal.from_float(float(max(tempList)) ) + decimal.Decimal('0.1') )
    #     tempdict[str(  decimal.Decimal.from_float(float(max(tempList)) ) + decimal.Decimal('0.1') )]=subTaskDict    #if subbranches do exist of main, add 0.1 to the highest subbranch and upload 
    # return_db().collection(u'Workflow').document(str(docId)).set(tempdict)

   


# addSubTaskToWorkflowNEW(subTaskMap,'111111111')




def ChangeAssignedTo(docId,Taskid,newMember):
    # doc_ref=return_db().collection(u'Workflow').document(str(docId))
    # doc_ref.update({
    #                 str(Taskid)+"."+"Assigned_To":newMember
    #                 })
    
    doc_ref=return_db().collection(u'Workflow').document(str(docId))
    doc = doc_ref.get()
    tempdict=doc.to_dict()
    # print(tempdict[Taskid])
    tempdict[Taskid]['Assigned_To']=newMember
    return_db().collection(u'Workflow').document(str(docId)).set(tempdict)
    
    if doc_ref.get().id == docId:
        print(Taskid)
        description = doc_ref.get().to_dict()[Taskid]["Descriptions"]
        task = doc_ref.get().to_dict()[Taskid]["Task"]
        assigned_to = newMember
        status = doc_ref.get().to_dict()[Taskid]["Status"]
        assigned_by = newMember
        case = doc_ref.get().id
        task_id = Taskid
        title="New Task"
        notification = f"You have been assigned {task} of case {case} "
        addNotificationforOneUser(newMember, notification, title)
        checkUserExists(assigned_to, task, description, assigned_by,status,task_id,case)



def updateStatusToStarted(docId, taskId):                                            #from pending to Finish
    doc_ref = return_db().collection(u'Workflow').document(str(docId))
    time=datetime.now()
    doc = doc_ref.get()
    tempdict=doc.to_dict()
    IDisZero=False
  

    if taskId in tempdict.keys():
        #print("Requested ID exists ")
        taskCompleteFlag=True
    else: 
        print("ID doesnt exist")
        return 

    if taskId != "0":
        print("Task id is not 0 ")
    else:
        print('Task ID is 0')
        taskCompleteFlag = True
        IDisZero=True
        return
          
    if IDisZero==False:   
        if "."  in taskId:
            #print(taskId,"it is decimal ")
            if tempdict[str(decimal.Decimal(taskId.rpartition('.')[0]))]['Status'] != "Started":       #Check the whole number for Started status 
                #print(taskId.rpartition('.')[0])
                print("Main task not yet started ")
                taskCompleteFlag=False                
        else:
            if tempdict[str(decimal.Decimal(taskId)-1)]['Status'] != "Finished":  #print(taskId):       #Check the previous whole number for finished status 
                #print("it is not decimal ")
                print("Previous Task not yet finished ")
                taskCompleteFlag=False
            
            
            for i in tempdict.keys():
                if i.rpartition('.')[0] == str((decimal.Decimal(taskId)-1)):                        #Check if all sub of previous number is finished 
                    #print(i)
                    if tempdict[i]['Status']!="Finished":
                        #print(tempdict[i],"Decimal Part not finished")
                        taskCompleteFlag=False
    
        
    if taskCompleteFlag == False:
        return {"Error":"Task Status not Changed"}      
            
    if taskCompleteFlag == True:
        #print('Previous task finished ')
        dateobj=datetime.now()
        tempdict[taskId]['Status']='Started'
        tempdict[taskId]['Start_Time']= str(dateobj.date())
              
        return_db().collection(u'Workflow').document(str(docId)).set(tempdict)
        return{"Succes":"Task Status Changed"}

    #print(tempdict[taskId])




def updateStatusFinished(docId, taskId):                                            #from pending to Finish
    doc_ref = return_db().collection(u'Workflow').document(str(docId))
    time=datetime.now()
    doc = doc_ref.get()
    tempdict=doc.to_dict()
    IDisZero=False
    dateobj2=datetime.now()
    
    taskCompleteFlag=False
    print(tempdict)
    # print("1:",taskCompleteFlag)
    
    if taskId in tempdict.keys():
        #print("Requested ID exists ")
        taskCompleteFlag=True
        # print("2:",taskCompleteFlag)
    else: 
        print("ID doesnt exist")
        return {"Fail":"ID doesnt exist"}

    if taskId != "0":
        print("Task id is not 0 ")
        taskCompleteFlag=True
        # print("3:",taskCompleteFlag)
    else:
        print('Task ID is 0')
        taskCompleteFlag = True
        # print("4:",taskCompleteFlag)
        IDisZero=True
          
    if IDisZero==False:   
        
        if tempdict[str(decimal.Decimal(taskId))]['Status'] != "Started":
            print("task cannot not started, cannot finish")
            return {"Fail":"Task Status not Changed"}
            
        
        
        
        if "."  in taskId:
            #print(taskId,"it is decimal ")
            if tempdict[str(decimal.Decimal(taskId.rpartition('.')[0]))]['Status'] != "Started":       #Check the whole number for Finished status 
                #print(taskId.rpartition('.')[0])
                print("Previous Task not yet Started ")
                taskCompleteFlag=False
                # print("5:",taskCompleteFlag)                
        else:
            if tempdict[str(decimal.Decimal(taskId)-1)]['Status'] != "Finished":  #print(taskId):       #Check the previous whole number for finished status 
                #print("it is not decimal ")
                #print("Previous Task not yet finished ")
                taskCompleteFlag=False
                # print("6:",taskCompleteFlag)
            
            
            for i in tempdict.keys():
                if i.rpartition('.')[0] == str((decimal.Decimal(taskId)-1)):                        #Check if all sub of previous number is finished 
                    #print(i)
                    if tempdict[i]['Status']!="Finished":
                        # print(tempdict[i],"Decimal Part not finished")
                        taskCompleteFlag=False
                        # print("7:",taskCompleteFlag)
            
        
        for i in tempdict.keys():
            if taskId+'.' in i: 
                if tempdict[i]['Status']!='Finished':
                    print("task ",i," not yet finished ")
                    taskCompleteFlag=False
                    # print("8:",taskCompleteFlag)
      
        
    # print("9:",taskCompleteFlag)

    if taskCompleteFlag == True:
        #print('Previous task finished ')
        tempdict[taskId]['Status']='Finished'
        tempdict[taskId]['End_Time']= str(dateobj2.date())
        
        decimalcount=0
        for i in tempdict.keys():
            if taskId+"." in i:
                tempdict[i]['Start_Time']= str(dateobj2.date())
                decimalcount=+1

        # tempList=[]
        # for i in tempdict.keys():
        #     if i.rpartition('.')[0] == taskId:            #Check if other sub branches exist from main branch 
        #         #print(i , "true")
        #         tempList.append(i)
        #         print(i)
        # print(tempList)
        allSubList=[]
        allSubFinishFlag=True
        if "." in taskId:
            if tempdict[str(decimal.Decimal(taskId.rpartition('.')[0]))]['Status'] == "Started":
                for i in tempdict.keys():
                    if taskId.rpartition('.')[0]+'.' in i:  
                        #allSubList.append(i)
                        print(i)
                        if tempdict[i]['Status']!='Finished':
                            allSubFinishFlag=False
                            
            print(allSubFinishFlag)
            if allSubFinishFlag==True:
                tempdict[taskId.rpartition('.')[0]]['Status']='Finished'
                tempdict[taskId.rpartition('.')[0]]['End_Time']= str(dateobj2.date())
                #for i in allSubList:
                    
                        # if tempdict[i]['Status']=='Finished':
                            
                        #     tempdict[taskId.rpartition('.')[0]]['Status']='Finished'
                        #     tempdict[taskId.rpartition('.')[0]]['End_Time']= str(dateobj2.date())
        
    
        print(tempdict)
        return_db().collection(u'Workflow').document(str(docId)).set(tempdict)
        return {"Success":"Task Status Changed"}
    
    if taskCompleteFlag == False:
        return {"Fail":"Task Status not Changed"}
    #print(tempdict[taskId])

#initialize_app()
#updateStatusToStarted('78910','2')
#updateStatusFinished('78910','2.2')


def getWorkflowModelMainTasks(workflowID):
    doc = return_db().collection(u'Workflow').document(workflowID).get()
    WF_dict=doc.to_dict()
    maintaskDict={}
    print(WF_dict.keys())
    od=collections.OrderedDict(sorted(WF_dict.items()))
    for k,v in od.items():
        #print("------",k)
        if "." not in k:
            #print("=======",k,v)
            maintaskDict[k]=v
    return maintaskDict
    # if doc is not None:
    #     return {"Workflow":doc.to_dict()}
    # else:
    #     return {"Error":"Workflow ID not found"}
    
#getWorkflowModelMainTasks("78910")


def checkIfSubTaskForMain(workflowID,maintask):
    doc_ref = return_db().collection(u'Workflow').document(str(workflowID))
    doc = doc_ref.get()
    tempdict=doc.to_dict()
    subDict={}
    tempList=[]
    for i in tempdict.keys():
        if i.rpartition('.')[0] == maintask:     #Check if other sub branches exist from main branch 
            #print(i , "true")
            tempList.append(i)
            subDict[i]=tempdict[i]
    #print(tempList)
    return subDict

#print(checkIfSubTaskForMain('78910','2'))


# def deleteTask(workflowID,taskid):
#     doc_ref = return_db().collection(u'Workflow').document(str(workflowID))
#     doc = doc_ref.get()
#     tempdict=doc.to_dict()
#     isSubTask= False
#     tempSubTaskList=[]
#     if "." in taskid:
#         isSubTask=True
    
#     if isSubTask==False:
#         for i in tempdict.keys():
#             if i.rpartition('.')[0] == taskid:
#                 tempSubTaskList.append(i)
#         if len(tempSubTaskList)==0:
#             del tempdict[taskid]
#         else:
#             print("Task contains sub task therfore cannot be deleted")
#             return
    
#     print(tempdict.keys())
                

# initialize_app()
# deleteTask(78910,"1")