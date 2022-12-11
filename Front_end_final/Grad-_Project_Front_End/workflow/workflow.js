// import {notification_for_app} from '../notifications/notification.js'
// notification_for_app()
var username = localStorage.getItem("username")
document.getElementById("heading_main").innerText=`Hello, ${username}`

const Swal = require('sweetalert2')
var sub_completeARRAY = [0];
function createEvent(newLi, caseID,){

}
var number = 0;
function showSpinner(){
    document.getElementById('cover-spin').style.display = 'block';
}
  function closeSpinner(){
    document.getElementById('cover-spin').style.display = 'none';
  }
  
var case_id = localStorage.getItem("case_id")
var body = document.getElementById("workflow")
var caseID =  localStorage.getItem("case_id")
var back_button = document.getElementById("chevron")
back_button.onclick= async function(){
    window.history.back()
}
var lawyers=[]
var arr = [];
const targetDiv1 = document.getElementById("full");
const targetDiv2 = document.getElementById("subtaskForm");
const targetDiv3 = document.getElementById("edit_workflow")

async function getAssignedLawyers(caseID){
    showSpinner();
var obj_lawyers = {"case_id":caseID}
var json_lawyers = JSON.stringify(obj_lawyers)
const options_lawyers = {
    method: 'POST',
    body: json_lawyers,
    headers: {
        'Content-Type': 'application/json', 
      }
}

const response_lawyers = await fetch(
    'https://lawflow-3c5b7.uc.r.appspot.com/case/getAssignedLawyers', options_lawyers);

if(response_lawyers.status==200){
    closeSpinner();
    var lawyers_get = await response_lawyers.json()
    for(var i =0;i<lawyers_get["Lawyers"].length;i++){
        lawyers.push(lawyers_get["Lawyers"][i])
    }
}
}
async function getSubtasks(taskid, workflowid) {
    showSpinner();
    var obj = {"TaskID":taskid.toString(), "WFid":caseID}
    var json = JSON.stringify(obj)
    const options = {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type': 'application/json', 
          }
    };
    const response = await fetch(
        'https://lawflow-3c5b7.uc.r.appspot.com/WF/getSubForMain', options);

    if(response.status==200){
        closeSpinner();
        var val = await response.json()
        const length = Object.keys(val).length
        var subtasks = []
        //console.log(taskid,length)
        if(length>=1){
        
            for(var i=0; i<length; i++){
                subtasks.push(val[`${taskid}.${i+1}`])
            }
        }
        console.log(subtasks)
      
    }
    return subtasks
}

workflow.onload = async function getWorkflow(){
    showSpinner();
    await getAssignedLawyers(caseID)
    var obj = {"WFid": caseID}
    var document_cross = document.getElementById("cross")
    var json= JSON.stringify(obj);
    const options = {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type': 'application/json', 
          }
    };
    const response = await fetch(
        'https://lawflow-3c5b7.uc.r.appspot.com/WF/getWorkflow', options);
    
    if(response.status==200){
        closeSpinner();
        var val = await response.json()
        console.log(val)
        const length = Object.keys(val).length
        var cross = document.querySelector(".cross")
        document.querySelector('.case_id').innerText= `#${case_id}`
        console.log(length)
        const UI = document.getElementById("workflow_display")
        const subtask_display = document.getElementById("display_subtasks")
        for(var i =0; i<length;i++){
            const divBar = document.createElement("div")
            const assigned_to_field = document.createElement("p")
            const second_assigned_to = document.createElement("p")
            const start_date = document.createElement("p")
            const task_name = document.createElement("p")
            const task_description= document.createElement("p")
            const end_time = document.createElement("p")
            const main_div_wf = document.createElement("div")
            const assign_lawyer = document.createElement("button")
            const status = document.createElement("p")
            const dropdowndiv = document.createElement("div")
            const dropdownselect = document.createElement("select")
            const genericOption = document.createElement("option")
            // genericOption.text ="Select Lawyer"
            // genericOption.disabled="true"
            // genericOption.selected="true"
            // genericOption.hidden="true"
            dropdowndiv.style.marginTop="-3vh"
            dropdownselect.appendChild(genericOption)
            const id = val[i].Task_id
            if(val[i].Assigned_To == "None"){
            genericOption.text ="Select Lawyer"
            }
            else genericOption.text = val[i].Assigned_To
            for(var k=0;k<lawyers.length;k++){
                const option = document.createElement("option")
                option.value = lawyers[k]
                option.text = lawyers[k]
                dropdownselect.appendChild(option)
            }
            // dropdownselect.style.marginLeft="55vw"
            // dropdownselect.style.overflow="auto"
           dropdowndiv.style.marginLeft="52vw"
           dropdowndiv.style.backgroundColor="pink"
           dropdowndiv.style.border="4px solid purple"
           dropdowndiv.style.width="4vw"
           //dropdowndiv.appendChild(dropdownselect)
           dropdownselect.style.marginRight="15vw"
           dropdownselect.style.marginTop="-8vh"
           dropdownselect.style.float="right"

            
           assign_lawyer.style.height="4.5vh"
           assign_lawyer.style.width="10vw"
           assign_lawyer.style.borderRadius="50px"
           assign_lawyer.style.border="none"
           assign_lawyer.style.backgroundColor="white"
           assign_lawyer.style.color="#283745"
           assign_lawyer.innerText="Assign"
           assign_lawyer.style.marginRight="1.3vw"
           assign_lawyer.style.marginTop="-7.2vh"
           assign_lawyer.style.float="right"
           assign_lawyer.style.cursor="pointer"

           assign_lawyer.addEventListener('click',async()=>{
           var assigned_lawyer_name = dropdownselect.selectedOptions[0].value
           var obj_task = {"WFid": caseID,"TaskID":id, "newMember":assigned_lawyer_name}
           var json= JSON.stringify(obj_task);
           const options = {
               method: 'POST',
               body: json,
               headers: {
                   'Content-Type': 'application/json', 
               }
           };
           const response_task = await fetch(
               'https://lawflow-3c5b7.uc.r.appspot.com/WF/changeAssignedTo', options);
           console.log(response_task.status)
           if(response.status==200){
           var text_msg = `Task ${id} has been assigned to ${assigned_lawyer_name}`
           await Swal.fire({
            icon: 'success',
            title: 'Task Assigned',
            text: text_msg,
          })
          window.location.reload()
        }
           
           })




           var index = 1000;
       

            const div_circle = document.createElement("div")
            const tool_tip = document.createElement("div")
            const edit = document.createElement("div")
            const tool_tip_text = document.createElement("span")
            const view_more_button = document.createElement("button")
            const start_main_task_btn = document.createElement("button")
            view_more_button.style.fontFamily="'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
            start_main_task_btn.style.height="5vh"
            start_main_task_btn.style.width="10vw"
            start_main_task_btn.style.backgroundColor="white"
            start_main_task_btn.style.color="black"
            start_main_task_btn.style.border="none"
            start_main_task_btn.style.borderRadius="20px"
            start_main_task_btn.innerText="Start Task"
            start_main_task_btn.style.marginLeft="67vw"
            start_main_task_btn.addEventListener("mouseover",(e)=>{
                start_main_task_btn.style.backgroundColor="#C1B189"
                start_main_task_btn.style.cursor="pointer"
            })

            start_main_task_btn.addEventListener("mouseout",(e)=>{
                start_main_task_btn.style.backgroundColor="white"
                start_main_task_btn.style.cursor="auto"
            })

            start_main_task_btn.addEventListener("click",async(e)=>{
                showSpinner();
                console.log(id)
                var obj={"TaskID":id, "WFid":caseID}
                var json = JSON.stringify(obj)
                const options = {
                    method: 'POST',
                    body: json,
                    headers: {
                        'Content-Type': 'application/json', 
                      }
                };
                const response = await fetch(
                    'https://lawflow-3c5b7.uc.r.appspot.com/WF/updateStatusToStarted', options);
            
                console.log(response.status)
                if(response.status==200){
                    var val = await response.json()
                    if(val["Error"] == "Task Status not Changed")
                    {
                        var text_msg = `Previous Tasks have not been completed`
                        await Swal.fire({
                            icon: 'warning',
                            title: 'Cannot Start Task',
                            text: text_msg,
                        })

                    }
                    else{
                    window.location.reload()
                    start_main_task_btn.innerText="Mark As Completed"
                    }
                }

            })
            
           
            

            var cross = document.getElementById("crosswf")
            cross.addEventListener('click',(e)=>{
                targetDiv3.style.visibility="hidden"
                showSpinner()
                window.location.reload();
                closeSpinner()
            })

            var sub_tasks=[]
            sub_tasks = await getSubtasks(id, caseID)
            var length_subs = sub_tasks.length

            if(val[i].Status=="Finished" && length_subs == 0){
                view_more_button.style.visibility="hidden"
            }
            if(val[i].Status!="Finished" && length_subs == 0 ){

                view_more_button.addEventListener("click",async(e)=>{
                    showSpinner();
                    console.log(id)
                    var obj ={"TaskID":id, "WFid":caseID}
                    var json = JSON.stringify(obj)
                    const options = {
                        method: 'POST',
                        body: json,
                        headers: {
                            'Content-Type': 'application/json', 
                          }
                    };
                    const response = await fetch(
                        'https://lawflow-3c5b7.uc.r.appspot.com/WF/updateStatusToFinished', options);
                
                    if(response.status==200){
                        closeSpinner();
                        var val = await response.json()
                        console.log(val)
                        view_more_button.style.display="none"
                        sub_complete.style.display = "none";
                        div_circle.innerHTML='<i class="fa fa-check fa-lg" style="color:green" aria-hidden="true"></i>'
                        
                    }

                })
            }
            view_more_button.style.height="5vh"
            view_more_button.style.width="10vw"
            view_more_button.style.backgroundColor="white"
            view_more_button.style.color="black"
            view_more_button.style.border="none"
            view_more_button.style.borderRadius="20px"
            length_subs>=1?view_more_button.innerText="View More Details":view_more_button.innerText="Mark As Completed"
            view_more_button.style.marginLeft="67vw"
            view_more_button.addEventListener("mouseover",(e)=>{
                view_more_button.style.backgroundColor="#C1B189"
                view_more_button.style.cursor="pointer"
            })
            view_more_button.addEventListener("mouseout",(e)=>{
                view_more_button.style.backgroundColor="white"
                view_more_button.style.cursor="auto"
            })
            
            if(length_subs>=1){
            view_more_button.addEventListener("click",async function(){
               
                //targetDiv1.style.visibility="visible"

                targetDiv2.style.visibility = "visible";
                targetDiv2.style.zIndex="30000"
                divBar.style.zIndex="-1000"
                subtask_display.innerHTML=''
                var sub_tasks=[]
                var subTasksCompleted="False"
                var count = 0 
                sub_tasks = await getSubtasks(id, caseID)
                var sub_task_div=document.createElement("div")
                var complete_MainTask = document.createElement("button")
                complete_MainTask.style.backgroundColor="#283745"
                complete_MainTask.style.color="white"
                complete_MainTask.style.border="none"
                complete_MainTask.innerText="Mark As Completed"
                complete_MainTask.style.height="30px"
                complete_MainTask.style.marginLeft="-40px"
                complete_MainTask.style.borderRadius="50px"
                if(sub_tasks.length==0){
                    console.log("no_children")
                    var no_subs = document.createElement("div")
                    var completed = document.createElement("button")
                    no_subs.innerText="Sorry No subtasks exist for this Task"
                    no_subs.style.fontFamily="'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
                    no_subs.style.color="black"
                    no_subs.style.marginTop="10vh"
                    no_subs.style.borderRadius="5px"
                    no_subs.style.textAlign="center"
                    no_subs.style.fontSize="17px"
                    completed.style.height="3.466204506065858vh"
                    completed.style.width="11.71875vw"
                    completed.style.backgroundColor="#283745"

                    subtask_display.style.height="100px"
                    subtask_display.appendChild(no_subs)
                }
                if(sub_tasks.length >=1){
                    var index2 = 200;
                    var index3 = 1000;
                for(var j=0;j<sub_tasks.length;j++){
                    console.log(sub_tasks[j].Status)
                    if(sub_tasks[j].Status == "Finished")
                    {
                        count++;
                    }
                    console.log(sub_tasks[j].Task)
                    var task_name = sub_tasks[j].Task
                    const edit_subs = document.createElement("div")
                    edit_subs.setAttribute('id',j);
                    var newLii = "";
                    var newLiii = "";
                    const newLi = document.createElement("ul");
                    const dropdownselectsub = document.createElement("select")
                    dropdownselectsub.style.zIndex = "10000";
                    var sub_div=document.createElement("div")
                    newLi.style.marginTop="2vh"
                    newLi.style.borderRadius="5px"
                    newLi.style.boxShadow="1px 1px 1px 1px grey"
                    newLi.style.padding="2vh 2vh 2vh 2vh"
                    newLi.style.marginBottom="3vh"
                    newLi.style.height="37vh"
                    newLi.style.width="28vw"
                    var sub_description = document.createElement("p")
                    var sub_task = document.createElement("p")
                    var sub_start_time = document.createElement("p")
                    var sub_end_time = document.createElement("p")
                    var sub_status = document.createElement("p")
                    var sub_complete = document.createElement("button");
                    var sub_inprogress = document.createElement("button");
                    var assign_lawyer_sub = document.createElement("button")
                    
                    const genericOptionsub = document.createElement("option")
                    genericOptionsub.text ="Select Lawyer"
                    genericOptionsub.disabled="true"
                    genericOptionsub.selected="true"
                    
                    genericOptionsub.hidden="true"
                    dropdownselectsub.appendChild(genericOption)
                    dropdownselectsub.style.position="absolute"
                    dropdownselectsub.style.marginLeft="-15vh"
                    dropdownselectsub.style.marginTop="3vh"
                    dropdownselectsub.style.fontSize="11px"
                    dropdownselectsub.style.fontFamily="'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
                    assign_lawyer_sub.style.position="absolute"
                    assign_lawyer_sub.style.height="3vh"
                    assign_lawyer_sub.style.width="4vw"
                    assign_lawyer_sub.style.backgroundColor="#283745"
                    assign_lawyer_sub.style.color="white"
                    assign_lawyer_sub.innerText="Assign"
                    assign_lawyer_sub.style.fontSize="10px"
                    assign_lawyer_sub.style.marginLeft="-1vh"
                    assign_lawyer_sub.style.marginTop="2.5vh"
                    assign_lawyer_sub.style.border="none"
                    assign_lawyer_sub.style.borderRadius="10px"
                    assign_lawyer_sub.style.cursor="pointer"

                    for(var k=0;k<lawyers.length;k++){
                        const option = document.createElement("option")
                        option.value = lawyers[k]
                        option.text = lawyers[k]
                        dropdownselectsub.appendChild(option)
                    }


                    assign_lawyer_sub.addEventListener('click',async()=>{
                        console.log(newLi.value)
                        var assigned_lawyer_name = dropdownselectsub.selectedOptions[0].value
                        var obj_task = {"WFid": caseID,"TaskID":newLi.value, "newMember":assigned_lawyer_name}
                        var json= JSON.stringify(obj_task);
                        const options = {
                            method: 'POST',
                            body: json,
                            headers: {
                                'Content-Type': 'application/json', 
                            }
                        };
                        const response_task = await fetch(
                            'https://lawflow-3c5b7.uc.r.appspot.com/WF/changeAssignedTo', options);
                        console.log(response_task.status)
                        if(response.status==200){
                        var text_msg = `Task ${newLi.value} has been assigned to ${assigned_lawyer_name}`
                        await Swal.fire({
                            icon: 'success',
                            title: 'Task Assigned',
                            text: text_msg,
                        })
                        window.location.reload()
                    }

                    })


                    sub_inprogress.addEventListener('click',async function abc(){
                        var obj ={"TaskID":newLi.value, "WFid":caseID}
                        var json = JSON.stringify(obj)
                        const options = {
                            method: 'POST',
                            body: json,
                            headers: {
                                'Content-Type': 'application/json', 
                              }
                        };
                        const response = await fetch(
                            'https://lawflow-3c5b7.uc.r.appspot.com/WF/updateStatusToStarted', options);
                    
                        if(response.status==200){
                            
                            var val = await response.json()
                            //console.log(status_sub_field.getAttribute('id'));
                            status_sub_field =  document.getElementById(newLi.value);
                            status_sub_field.innerText="Started"
                            sub_inprogress = document.getElementById(newLi.value+".1");
                            //console.log(newLi.value+".1");
                            console.log(document.getElementById(newLi.value+".2") == null);
                            sub_inprogress.style.display="none";
                            sub_complete = sub_completeARRAY[parseInt(newLi.value.split('.').pop())];
                            sub_complete.style.display = "block";
                            //sub_completeARRAY[parseInt(newLi.value.split('.').pop())].style.display = "block"; 
                            window.location.reload()     
                        }

                    })
                    var assigned_to = document.createElement("div")
                    var assigned_to_icon_sub = document.createElement("div")
                    var field_assigned_to_sub = document.createElement("p")
                    var status_icon= document.createElement("div")
                    var status_overall = document.createElement("div")     
                    var time_div = document.createElement("div")   
                    newLi.value=sub_tasks[j].Task_id;
                    newLii = newLi.value + ".1"
                    newLiii = newLi.value + ".2";
                    sub_inprogress.setAttribute('id',newLii);
                    sub_complete.setAttribute('id',newLiii);
                    sub_completeARRAY.push(sub_complete);
                    console.log(sub_complete.getAttribute('id'));
                    console.log(newLiii);
                    arr.push(newLi.value);
                    console.log(`newLi value ${newLi.value}`)
                    sub_complete.style.borderRadius="50px"
                    sub_complete.style.cursor="pointer"
                    sub_complete.style.backgroundColor="#283745"
                    sub_complete.style.color="white"
                    sub_complete.style.border="none"
                    sub_complete.style.height="3.9vh"
                    sub_complete.style.fontSize="11px"
                    sub_complete.innerText = "Mark As Completed"
                    //sub_complete.setAttribute('id',newLiii);
                    sub_inprogress.style.borderRadius="50px"
                    sub_inprogress.style.cursor="pointer"
                    sub_inprogress.style.backgroundColor="#283745"
                    sub_inprogress.style.color="white"
                    sub_inprogress.style.position="absolute"
                    sub_inprogress.style.border="none"
                    sub_inprogress.style.height="3.932409012131716vh"
                    sub_inprogress.style.fontSize="11px"
                    sub_inprogress.innerText = "Mark As In progress"
                    sub_inprogress.style.marginLeft="10vw"
                    sub_inprogress.style.marginTop="4vh"
                    // if(sub_tasks[j].Status == "Not Started"){
                    //     sub_inprogress.style.display="visible"
                    //     sub_complete.style.display="none"
                    // }

                    // if(sub_tasks[j].Status == "Started"){
                    //     sub_inprogress.style.display="none"
                    //     sub_complete.style.display="visible"
                    // }
                   

                    document_cross.addEventListener('click',(e)=>{
                       targetDiv2.style.visibility="hidden"
                    })

                    
                    sub_complete.addEventListener('click',async function abc(){
                        var obj ={"TaskID":newLi.value, "WFid":caseID}
                        var json = JSON.stringify(obj)
                        const options = {
                            method: 'POST',
                            body: json,
                            headers: {
                                'Content-Type': 'application/json', 
                              }
                        };
                        const response = await fetch(
                            'https://lawflow-3c5b7.uc.r.appspot.com/WF/updateStatusToFinished', options);
                    
                        if(response.status==200){
                            
                            var val = await response.json()
                            console.log(sub_complete.getAttribute('id'));
                            status_sub_field = document.getElementById(newLi.value);
                            status_sub_field.innerText="Completed"
                            sub_completeARRAY[parseInt(newLi.value.split('.').pop())]
                            sub_complete.style.visibility="hidden"
                            window.location.reload()
                            
                        }

                    })

                    if(sub_status.innerText=="Finished"){
                        sub_complete.style.display="none"
                        sub_complete.style.visibility="hidden"
                    }

                    console.log(`STATUS IS ${sub_tasks[j].Status}`)

                    sub_description.innerText=`${sub_tasks[j].Descriptions}`
                    sub_description.style.color="grey"
                    sub_task.innerText=`${sub_tasks[j].Task}`
                    sub_task.style.fontWeight="600"
                    sub_task.style.fontSize="20px"
                    sub_start_time.innerText=`Start Date: ${sub_tasks[j].Start_Time}`
                    sub_end_time.innerText=`End Date:${sub_tasks[j].End_Time}`
                    sub_status.style.marginTop="-10vh"
                    sub_status.style.marginLeft="25vw"

                    sub_complete.style.marginLeft="10vw"
                    sub_complete.style.marginTop="8.065857885615252vh"
                    sub_inprogress.style.marginLeft="10vw"
                    sub_inprogress.style.marginTop="8.065857885615252vh"
                    sub_inprogress.style.position="absolute"
                    sub_complete.style.position="absolute"
                    
                    assigned_to_icon_sub.innerHTML='<i class="fa fa-users" aria-hidden="true"></i>'
                    field_assigned_to_sub.innerText=`Assigned To  ${sub_tasks[j].Assigned_To}`
                    
                    field_assigned_to_sub.style.float="left"
                    field_assigned_to_sub.style.marginTop="-2.5vh"
                    field_assigned_to_sub.style.marginBottom="2.5vh"
                    field_assigned_to_sub.style.marginLeft="2vw"
                    assigned_to.appendChild(assigned_to_icon_sub)
                    assigned_to.appendChild(field_assigned_to_sub)
                     
                    status_icon.innerHTML=`<i class="fa fa-spinner" aria-hidden="true"></i>`
                    
                    
                    status_overall.appendChild(status_icon)
                    status_overall.style.marginBottom="2vw"
                    var status_sub_field=document.createElement('p')
                    console.log(index);
                    status_sub_field.setAttribute('id',newLi.value);
                    status_sub_field.style.textAlign="center"
                    status_sub_field.innerText=`${sub_tasks[j].Status}`
                    if(sub_tasks[j].Status!="Finished"){
                       
                        edit_subs.innerHTML='<i class="fa fa-pencil fa-lg " aria-hidden="true"></i>'
                        edit_subs.style.position="relative"
                        edit_subs.style.cursor="pointer"
                        edit_subs.style.marginLeft="26vw"
                        edit_subs.style.marginTop="-5vh"
                        edit_subs.style.zIndex="100000"
                        edit_subs.addEventListener("click",(e)=>{
                            targetDiv2.style.visibility="hidden"
                            console.log(`array j val : ${edit_subs.getAttribute('id')}`)
                        input_title_field.value = sub_tasks[edit_subs.getAttribute('id')].Task;
                        input_desc_field.value = sub_tasks[edit_subs.getAttribute('id')].Descriptions
                        console.log(sub_tasks[edit_subs.getAttribute('id')].Descriptions);
                        document.getElementById("edit_workflow").zIndex="1500"
                        targetDiv3.style.visibility="visible"
                        
                        var submit_btn = document.getElementById("submitbuttontask")
                        submit_btn.addEventListener('click',async function check(){
                          if(task_name.innerText != input_title_field.value){
                            var obj_task = {"WFid": caseID,"TaskID":arr[edit_subs.getAttribute('id')], "NewName":input_title_field.value}
                            var json= JSON.stringify(obj_task);
                            const options = {
                                method: 'POST',
                                body: json,
                                headers: {
                                    'Content-Type': 'application/json', 
                                }
                            };
                            const response_task = await fetch(
                                'https://lawflow-3c5b7.uc.r.appspot.com/WF/updateTaskName', options);
                            
                            if(sub_description.innerText == input_desc_field.value && response_task.status == 200){
                                window.location.reload()
                            }
        
                          }
        
                          if(task_description.innerText != input_desc_field.value){

                            var obj_task_desc = {"WFid": caseID,"TaskID":arr[edit_subs.getAttribute('id')], "newDesc":input_desc_field.value}
                            var json= JSON.stringify(obj_task_desc);
                            const options = {
                                method: 'POST',
                                body: json,
                                headers: {
                                    'Content-Type': 'application/json', 
                                }
                            };
                            const response_task = await fetch(
                                'https://lawflow-3c5b7.uc.r.appspot.com/WF/updateTaskDescription', options);
                            
                            if(response_task.status == 200){
                                window.location.reload()
                            }
                          }
                        })
                    })
                    }
                    status_sub_field.style.marginTop="-2.5vh"
                    status_sub_field.style.marginLeft="2vw"
                    status_sub_field.style.borderRadius="20px"
                    status_sub_field.style.backgroundColor="#C1B189"
                    status_sub_field.style.fontSize="12px"
                    
                    status_sub_field.style.width="4.6875vw"
                    status_sub_field.style.height="3.466204506065858vh"
                    status_sub_field.style.padding="6px"
                    
                    status_overall.appendChild(status_sub_field)
                    assigned_to.style.marginTop="-1vh"
    
                    sub_complete.addEventListener('click',(e)=>{
                        console.log(newLi.value)
                    })
                    sub_div.value=sub_tasks[j].Task_id

                    console.log(sub_div.value)
                    time_div.appendChild(sub_start_time)
                    time_div.appendChild(sub_end_time)
                    time_div.style.marginLeft="17.96875vw"
                    time_div.style.marginTop="-12.131715771230503vh"
                    sub_start_time.style.marginBottom="4.679376083188908vh"
    
                   
                    newLi.appendChild(sub_task)
                    newLi.appendChild(edit_subs)
                    newLi.appendChild(sub_description)
                    newLi.appendChild(status_overall)
                    newLi.appendChild(assigned_to)
                    
                    newLi.appendChild(dropdownselectsub)
                    newLi.appendChild(assign_lawyer_sub)
                    
                    newLi.appendChild(time_div)
                    console.log(status_sub_field.innerText, "hi")
                    if(status_sub_field.innerText.toString() == "Not Started" || status_sub_field.innerText.toString() == "Not_Started" || status_sub_field.innerText.toString() == "Not Started ")
                    {
                    newLi.appendChild(sub_inprogress)
                    }
                    else if(status_sub_field.innerText == "Started")
                    {
                    newLi.appendChild(sub_complete)
                    }
                    
                    
                    targetDiv2.appendChild(newLi)   
    
                }
                console.log(count,"Count",sub_tasks.length)
                if(count == sub_tasks.length){
                    subTasksCompleted="True"
                }
                subtask_display.appendChild(sub_task_div)
                // if(subTasksCompleted=="True"){
                //    subtask_display.appendChild(complete_MainTask)
                // }
            }


            body.style.overflow="hidden"
                console.log(id)
               

            })
        }
            
            var cross = document.querySelector(".cross")
            cross.addEventListener(('click'),()=>{
                targetDiv2.style.visibility="hidden"
                edit.style.zIndex="0"
                
            })
            
            if(val[i].Status == "Finished" || val[i].Assigned_To != "None"){
            assigned_to_field.textContent=`Assigned to :  ${val[i].Assigned_To} `



            }
            else{
                assigned_to_field.textContent=`Assigned to :`
            }
           

            task_name.innerText=val[i].Task 
            task_description.innerText = val[i].Descriptions
            start_date.innerText = `Start Date :\u00a0\u00a0 ${val[i].Start_Time}`
            end_time.innerText = val[i].End_Time
            status.innerText=val[i].Status
            

            var input_title_field = document.getElementById("tasktitle")
            var input_desc_field = document.getElementById("taskDescription")
            
            if(val[i].Status != "Finished"){
                edit.innerHTML='<i class="fa fa-pencil " aria-hidden="true"></i>'
                edit.style.position="relative"
                edit.style.marginLeft="42vw"
                edit.style.marginTop="-5vh"
                edit.style.cursor="pointer"
                edit.style.zIndex="0"
                edit.style.width="5vw"
            edit.addEventListener("click",(e)=>{
                console.log(id)
                targetDiv3.style.visibility="visible"
                input_title_field.value = task_name.innerText 
                input_desc_field.value = task_description.innerText
                var submit_btn = document.getElementById("submitbuttontask")
                submit_btn.addEventListener('click',async function check(){
                  if(task_name.innerText != input_title_field.value){
                    var obj_task = {"WFid": caseID,"TaskID":id, "NewName":input_title_field.value}
                    var json= JSON.stringify(obj_task);
                    const options = {
                        method: 'POST',
                        body: json,
                        headers: {
                            'Content-Type': 'application/json', 
                        }
                    };
                    const response_task = await fetch(
                        'https://lawflow-3c5b7.uc.r.appspot.com/WF/updateTaskName', options);
                    console.log(response_task.status)
                    if(task_description.innerText == input_desc_field.value && response_task.status == 200){
                        window.location.reload()
                    }

                  }

                  if(task_description.innerText != input_desc_field.value){
                    var obj_task_desc = {"WFid": caseID,"TaskID":id, "newDesc":input_desc_field.value}
                    var json= JSON.stringify(obj_task_desc);
                    const options = {
                        method: 'POST',
                        body: json,
                        headers: {
                            'Content-Type': 'application/json', 
                        }
                    };
                    const response_task = await fetch(
                        'https://lawflow-3c5b7.uc.r.appspot.com/WF/updateTaskDescription', options);
                    console.log(response_task.status)
                    if(response_task.status == 200){
                        window.location.reload()
                    }
                  }
                })
            })
        }
            divBar.style.height="20.797227036395146vh"
            divBar.style.width="78.125vw"
            divBar.style.boxShadow="1px 1px 1px 1px grey"
            divBar.style.border="1px solid grey"
            divBar.style.marginBottom="6.065857885615252vh"
            divBar.style.borderRadius="5px"
            start_date.style.marginTop="2vh"
            if(status.innerText == "Completed" || status.innerText=="Finished"){
                div_circle.innerHTML='<i class="fa fa-check fa-lg" style="color:green" aria-hidden="true"></i>'
            
            }

            if(status.innerText=="Started" || status.innerText=="Not Started" || status.innerText=="Not_Started" || status.innerText=="Not Started " ){
                div_circle.style.cursor="auto"
                div_circle.innerHTML='<i class="fa fa-clock-o fa-lg"  aria-hidden="true"></i>'
            }
            div_circle.style.marginBottom="1.7vh"
            div_circle.style.padding="1px"
            div_circle.style.title="hover"
            divBar.style.paddingLeft="0.78125vw"
            task_name.style.marginTop="1.7vh"
            task_description.style.fontSize="13px"
            task_name.style.fontSize="20px"
            divBar.style.background="linear-gradient(to right, white 60%, #283745 40%)"
            assigned_to_field.style.marginLeft="48.828125vw"
            assigned_to_field.style.color="white"
            assigned_to_field.style.fontSize="15px"
            assigned_to_field.style.position="relative"
            assigned_to_field.style.marginTop="-8vh"
            assigned_to_field.style.width="7vw"
            second_assigned_to.style.marginLeft="48.828125vw"
            second_assigned_to.style.color="white"
            second_assigned_to.style.fontSize="15px"
            second_assigned_to.style.marginTop="-10.398613518197573vh"
            start_date.style.marginLeft="48.828125vw"
            start_date.style.color="white"
            start_date.style.fontSize="15px"
            // start_date.style.marginTop="-0.8665511265164645vh"
           
            divBar.appendChild(task_name)
            divBar.appendChild(edit)
            divBar.appendChild(task_description)
            if((val[i].Status == "Not Started" && val[i].Assigned_To == "None") || (val[i].Status == "Not_Started" && val[i].Assigned_To == "None") || (val[i].Status == "Not Started " && val[i].Assigned_To == "None")){
            divBar.append(dropdownselect)
            }
            
            divBar.appendChild(assigned_to_field)
            if((val[i].Status == "Not Started" && val[i].Assigned_To == "None" )||(val[i].Status == "Not_Started" && val[i].Assigned_To == "None" ) || (val[i].Status == "Not Started " && val[i].Assigned_To == "None" )){
                divBar.appendChild(assign_lawyer)
                }
            
            divBar.appendChild(start_date)
           
            status.innerText=="Not Started" || status.innerText=="Not_Started" || status.innerText=="Not Started "?divBar.appendChild(start_main_task_btn) : divBar.appendChild(view_more_button)

            UI.appendChild(div_circle)
            UI.appendChild(divBar)
            
        }

    }

    
}
