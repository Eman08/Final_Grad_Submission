import {notification_for_app} from '../notifications/notification.js'
notification_for_app()

var body = document.getElementById("makeCases");

// localStorage.removeItem("caseID")
var CaseID = "";
var username = localStorage.getItem("username")
document.getElementById("heading_main").innerText=`Hello, ${username}`

var TaskList = []
var taskDescriptionList = []
var taskPartiesList = []
var Maincounter = 0
var i=0

var SubtaskMap = new Map();
var SubtaskList = []
var SubtaskName = []
var SubTaskAssgnTo = []
var SubtaskDescp = []
var subTasks=[]
var subTasksArray=[]



function formCaseDetails(){
    console.log("hi")

    const parent = document.getElementById("DisplayPcpt")

    //AddPcpt
    const prtp = []
    const but = document.getElementById("addPcpt")
    but.addEventListener('click',function(){

        const users = document.createElement("div");
        users.style.id="toDelete"
        const del = document.createElement("img");
        del.src = '../assets/del.png';

        const delRed = document.createElement("img");
        delRed.src= '../assets/delRed.png';

        var pcpt = document.getElementById('lawyers').value;
        prtp.push(pcpt);


        del.style.float="right"
        del.style.width="12px"
        del.style.height="12px"
        del.style.position="relative"
        del.style.marginTop="3px"
        del.style.marginLeft="3px"

        delRed.style.float="right"
        delRed.style.width="12px"
        delRed.style.height="12px"
        delRed.style.position="relative"
        delRed.style.marginTop="3px"
        delRed.style.marginLeft="3px"

        users.style.position="relative"
        users.style.margin="2px 2px 2px 2px"
        users.style.marginTop="5px"
        users.style.borderWidth="1px"
        users.style.borderStyle="solid"
        users.style.borderColor="grey"
        users.style.fontWeight='400'
        users.style.borderRadius="30px"
        users.style.padding="5px"
        users.style.display="inline-block"
        users.style.backgroundColor="white"
        
        DisplayPcpt.appendChild(users)

        var i=0
        for (i = 0; i < prtp.length; i++){//fpr
            users.innerHTML=prtp[i];
            users.appendChild(del)
        

            users.addEventListener("mouseover", () => {
            users.style.borderColor = "black";
            users.style.borderWidth="1px"
            del.src='../assets/delRed.png'

            })
            users.addEventListener("mouseout", () => {
            users.style.borderColor = "grey";
            del.src='../assets/del.png'
            })

            users.addEventListener("click", () => {
            users.style.display="none";
            var k =0;
            for(k = 0; k<prtp.length; k++){
                var check = users.innerText
                if (prtp[k]==check){
                    prtp.pop(prtp[i]);
                    //console.log("POPPED")
                }
            }
            })

        //To empty after added
        document.getElementById('lawyers').value='';
        }//end for
        
    }) //button call
   
    const submitCase = document.getElementById("submitCase")
    submitCase.addEventListener('click',function(){
        const caseName = document.getElementById('cname').value;
        const e = document.getElementById('selectCaseType');
        const caseType = e.options[e.selectedIndex].innerText;
        const ct = document.getElementById('selectCourtType');
        const courtType = ct.options[ct.selectedIndex].innerText;
        const allPcpt = prtp;
        const desc = document.getElementById('descpCase').value;

        const deleteDisplay = document.getElementById("DisplayPcpt");
        deleteDisplay.style.display="none";

        const date = new Date();
        var today = new Date()
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        const date_format = day+"/"+month+"/"+year

        sendCaseToDB(caseName, caseType, courtType, allPcpt, desc, date_format );

    
     })

}

//Adds Case to Database
async function sendCaseToDB(caseName, caseType, courtType, allPcpt, desc, startdate){

    // var CaseID = "";

    var obj = {"username":username,"caseName":caseName,"lawyers":allPcpt, "start_date":startdate, "description":desc,"case_type":caseType, "court_type":courtType}

    var json = JSON.stringify(obj);
    const options = {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type':'application/json',
       }
   };

   const response = await fetch(
       'https://lawflow-3c5b7.uc.r.appspot.com/case/createcase', options);
       
   if (response.status==200){
       var value = await response.json();
       console.log(response.status)
       CaseID=value["CaseID"]
       localStorage.removeItem("CaseID")
       localStorage.setItem("CaseID",CaseID)
       console.log(CaseID)

   }

   workflowAssignedTo(username, allPcpt);
}

async function workflowAssignedTo(username, allPcpt){

    const select1 = document.getElementById('assignSelect');
    const select2 = document.getElementById('assignToSub');

    var Text = username;
    var option = new Option(Text, Text)
    option.selected="true";

    select1.add(option)
    for (var i = 0; i<allPcpt.length; i++){
        Text=allPcpt[i];
        var option1 = new Option(Text, Text)
        select1.add(option1)
    }


    var Text2 = username;
    var option2 = new Option(Text2, Text2)
    option2.selected="true";
    select2.add(option2)
    for (var i = 0; i<allPcpt.length; i++){
        Text2=allPcpt[i];
        var option2 = new Option(Text2, Text2)
        select2.add(option2)
    }



} //function end







































//------------------------------------------------------------------------------------

async function workflowSubtaskDetails(){

    const subtasks = document.getElementById("mytasks")

    // const SubtaskMap = new Map();

    var TaskCounter =0;


    const but = document.getElementById("addSub")
    but.addEventListener('click',function(){
        TaskCounter++;

        console.log("Task Counter is " + TaskCounter)

        const tasks = document.createElement("ul");
        const del = document.createElement("img");
        del.src = '../assets/del.png';

        const taskIcon = document.createElement("img");
        taskIcon.src= '../assets/Tasks.png';

        del.style.display="inline-block"
        del.style.float="right"
        del.style.width="12px"
        del.style.height="12px"
        del.style.position="relative"
        del.style.top="50%"
        del.style.bottom="50%"

        taskIcon.style.display="inline-block"
        taskIcon.style.float="left"
        taskIcon.style.width="2vw"
        taskIcon.style.height="auto"
        taskIcon.style.position="relative"
    

        var subName = document.createElement("p")
        var subSelect = document.createElement("p")
        var SubDesc = document.createElement("p")


        var in1 = document.getElementById('taskNameSub').value;
        subName.innerHTML=in1
        var in2 = document.getElementById('assignToSub').value;
        subSelect.innerHTML=in2
        var in3 = document.getElementById('DescpSub').value;
        SubDesc.innerHTML=in3


        var check = String(Maincounter)

        //subTasksArray.push([[i,[['maintask',check], ['subtask', in1],['subtaskdesc', in3], ['assigntedto', in2]]]])

        subTasksArray.push([i,[["maintask",check], ["subtask", in1],["subtaskdesc", in3], ["assigntedto", in2]]])
        //SubtaskMap.set(i,[['maintask',check], ['subtask', in1],['subtaskdesc', in3], ['assigntedto', in2]])
       
       // [0, [["maintask","0"], ["subtask","main1 SUBTASK 1"], ["subtaskdesc","hello"], ["assigntedto","Emaan"]]]
        console.log("This is SubtaskArray before API")
        console.log(subTasksArray)

        i=i+1

        //PLEASE CHECK HOW TO PUSH SUBTASKS OR REMOVE ARRAYY


        subName.style.color="black"
        subName.style.fontWeight="bold"

        subSelect.style.fontStyle="italic"
        subSelect.style.fontSize="11px"

        tasks.style.textAlign="left"
        tasks.style.boxSizing="border-box"
        tasks.style.position="relative" 
        tasks.style.margin="7px 15px 7px 15px"
        tasks.style.border="thin solid #a9a9a9"
        tasks.style.backgroundColor="white"
        tasks.style.color="black"
        tasks.style.borderRadius="5px"
        tasks.style.display="block"
        tasks.style.whiteSpace="normal"
        tasks.style.overflowWrap="breakWord"
        tasks.style.padding="10px"
        tasks.style.boxShadow="1px 1px 1px 1px grey"
   

        subtasks.appendChild(tasks)
  

        tasks.appendChild(subName)
        tasks.appendChild(subSelect)
        tasks.appendChild(SubDesc)
        

        tasks.addEventListener("mouseover", () => {
            tasks.style.borderColor = "black";
            tasks.style.borderWidth="1px"
            del.src='../assets/delRed.png'

            })
        tasks.addEventListener("mouseout", () => {
            tasks.style.borderColor = "grey";
            // tasks.appendChild(del)
            del.src='../assets/del.png'
            })

        tasks.addEventListener("click", () => {
            tasks.style.display="none";
            var check = tasks.value
            //SubtaskMap.delete(check)
            })


        document.getElementById('taskNameSub').value='';
        document.getElementById('assignToSub').value='';
        document.getElementById('DescpSub').value='';


    }) //Button close



    const submitWF = document.getElementById("createWorkFlow")
    submitWF.addEventListener('click',function(){


        console.log("CLicked, now pushing to array")
        const TaskName = document.getElementById('tname').value;
        const e = document.getElementById('assignSelect');
        const AssignedTo = e.options[e.selectedIndex].innerText;
        //var allSubtasks = SubtaskMap;
        const WFdesc = document.getElementById('workflowDescp').value;

        const deleteDisplay = document.getElementById("mytasks");
        deleteDisplay.replaceChildren()

        TaskList.push(TaskName)
        taskDescriptionList.push(WFdesc)
        taskPartiesList.push(AssignedTo)

        console.log("TaskList:")
        console.log(TaskList)
        console.log("taskDescriptionList:")
        console.log(taskDescriptionList)
        console.log("taskPartiesList:")
        console.log(taskPartiesList)
        Maincounter++

        document.getElementById('tname').value='';
        document.getElementById('assignSelect').value='';
        document.getElementById('workflowDescp').value='';


        // console.log(taskDescriptionList)
        // console.log(taskPartiesList)
        // console.log(TaskList)

        // console.log("Printing before yes function")
        // console.log(SubtaskMap)

        // var newMap = new Map ();
        // newMap = SubtaskMap;

        // const yes = document.getElementById("yes")
        // yes.addEventListener('click',function(){
        //     console.log("no more adding")
        //     console.log("i have been called")
        //     setWF(TaskList,taskDescriptionList,taskPartiesList)
        //     console.log("This is subtask map when im sending to API")
        //     console.log(newMap)
        //     makeSubtasks(newMap)
        // })
    
     })

    //  console.log("Printing before yes function")
    //  console.log(SubtaskMap)

     var newMap = new Map ();
     const yes = document.getElementById("yes")
     yes.addEventListener('click',async function(){
        //newMap = SubtaskMap;
        console.log("no more adding")
        console.log("i have been called")
        await setWF(TaskList,taskDescriptionList,taskPartiesList)
        console.log("This is subtask map when im sending to API")
        console.log(subTasksArray)
        await makeSubtasks(subTasksArray)
     })
 

    console.log("SUCESSFUL SUBTASK")
   // AddAllWFtoList(SubtaskMap)


    
}

//    [0, [["maintask","0"], ["subtask","main1 SUBTASK 1"], ["subtaskdesc","hello"], ["assigntedto","Emaan"]]],
//    [1, [["maintask",'0'], ["subtask","main1 SUBTASK 2"], ["subtaskdesc","hi"], ["assigntedto","Abeera"]]],
//    [2, [["maintask",'1'], ["subtask","main2 SUBTASK 1"], ["subtaskdesc","two"], ["assigntedto","Abeera"]]]
    
//   ]);




    async function setWF(TaskName, WFdesc, AssignedTo, SubtaskMap){

    
        // CaseID='78910'
        TaskList = TaskName
        taskPartiesList= AssignedTo 
        taskDescriptionList = WFdesc
    
        console.log("printing data")
    
        console.log(TaskList)
        console.log(taskPartiesList)
        console.log(taskDescriptionList)
        console.log(CaseID)
    
        ///////////////////////////////////////////////////////////////////////////////////
        var obj = {"TaskList":TaskList,"taskDescriptionList":taskDescriptionList,"taskPartiesList":taskPartiesList, "WFid":CaseID}
        console.log(obj)
        var json = JSON.stringify(obj);
        const options2 = {
            method: 'POST',
            body: json,
            headers: {
                'Content-Type':'application/json',
           }
       };
        
       const response2 = await fetch(
           'https://lawflow-3c5b7.uc.r.appspot.com/WF/makeWF', options2);
       
       if (response2.status==200){
           var value = await response2.json();
                console.log(response2.status)
                console.log("made MAIN WF")
       }



        ///////////////////////////////////////////////////////////////////////////////////
    
    //     var map1 = new Map();
    //     map1=SubtaskMap


    //     for(let [key,value] of map1.entries()){
    //         console.log(key,value)

    //     }

    
         
    //        var test= map1.get(0)
    //     //    console.log(test[0][1])
    //     //    console.log(map1.size)
           
    
    //        for (var i=0;i<=map1.size-1;i++){
    //          var mapGet=map1.get(i)
    //          console.log(`MAP GET ${mapGet}`)
    //          var tempmainTaskIndex=mapGet[0][1]
    
    //          console.log("index",tempmainTaskIndex)
    //          var tempSubtaskName= mapGet[1][1]
    //          var tempSubtaskDesc= mapGet[2][1]
    //          var tempSubtaskAssigned= mapGet[3][1]
             
    //          var tempSubTaskList= [tempSubtaskName,tempSubtaskDesc,tempSubtaskAssigned]
         
    
    //          var obj = {"Subtask":tempSubTaskList,"MainTask":tempmainTaskIndex,"WFid":CaseID}
    
    //          var json = JSON.stringify(obj);
    //          const options = {
    //              method: 'POST',
    //              body: json,
    //              headers: {
    //                  'Content-Type':'application/json',
    //             }
    //         };
             
    //         const response = await fetch(
    //             'https://lawflow-3c5b7.uc.r.appspot.com/WF/addSubTasksNEW', options);
            
    //         if (response.status==200){
    //             var value = await response.json();
    //             console.log(response.status)
    //             console.log("Added all Subtasks for MAIN tasks")
    //         }
    
         
    //        }
    
    //    taskDescriptionList=[]
    //    taskPartiesList=[]
    //    TaskList=[]
    //    SubtaskList=[]
    //    SubtaskName = []
    //    SubtaskDescp = []
    //    SubTaskAssgnTo = []
    //    subTasks=[]
    //    SubtaskMap.clear()
    
    //     }
    }



async function makeSubtasks(subTasksArray){

    // var map1 = new Map();
    // map1= ([


    //     [0, [["maintask","0"], ["subtask","main1 SUBTASK 1"], ["subtaskdesc","hello"], ["assigntedto","Emaan"]]],
    //     [1, [["maintask",'0'], ["subtask","main1 SUBTASK 2"], ["subtaskdesc","hi"], ["assigntedto","Abeera"]]],
    //     [2, [["maintask",'1'], ["subtask","main2 SUBTASK 1"], ["subtaskdesc","two"], ["assigntedto","Abeera"]]]

    // ]);

    // console.log("map1")
    // for(let [key,value] of map1.entries()){
    //     console.log(key,value)

    // }


    //    console.log(test[0][1])
    //    console.log(map1.size)
       

    //    for (var i=0;i<=map1.size-1;i++){
    //      var mapGet=map1.get(i)
    //      console.log(`MAP GET ${mapGet}`)
    //      var tempmainTaskIndex=mapGet[0][1]

    //      console.log("index",tempmainTaskIndex)
    //      var tempSubtaskName= mapGet[1][1]
    //      var tempSubtaskDesc= mapGet[2][1]
    //      var tempSubtaskAssigned= mapGet[3][1]
         
    //      var tempSubTaskList= [tempSubtaskName,tempSubtaskDesc,tempSubtaskAssigned]
         

         var obj = {"SubtaskMap":subTasksArray,"WFid":CaseID}
         console.log("printing array ")
        //  console.log(subTasksArray)
        for(var i =0;i<subTasksArray.length;i++){
            console.log(subTasksArray[i])
        }


         console.log("printing obj")
         console.log(obj)

         var json = JSON.stringify(obj);
         const options11 = {
             method: 'POST',
             body: json,
             headers: {
                 'Content-Type':'application/json',
            }
        };
         
        const response11 = await fetch(
            'https://lawflow-3c5b7.uc.r.appspot.com/WF/addSubTasksNEW', options11);
        
        if (response11.status==200){
            var value = await response11.json();
            console.log(response11.status)
            console.log("Added all Subtasks for MAIN tasks")
            
            taskDescriptionList=[]
            taskPartiesList=[]
            TaskList=[]
            SubtaskList=[]
            SubtaskName = []
            SubtaskDescp = []
            SubTaskAssgnTo = []
            subTasks=[]
            SubtaskMap.clear()

        }

     
       //}

    

}



























































//-------------------------------------------------------------------------------------
function underAgeValidate(birthday){
	// it will accept two types of format yyyy-mm-dd and yyyy/mm/dd
	var optimizedBirthday = birthday.replace(/-/g, "/");

    //set date based on birthday at 01:00:00 hours GMT+0100 (CET)
	var myBirthday = new Date(optimizedBirthday);

	// set current day on 01:00:00 hours GMT+0100 (CET)
	var currentDate = new Date().toJSON().slice(0,10)+' 01:00:00';

	// calculate age comparing current date and borthday
	var myAge = ~~((Date.now(currentDate) - myBirthday) / (31557600000));

	if(myAge < 18) {
     	    return false;
        }else{
	    return true;
	}

} 


async function clientPartyInput(){

    console.log("in client party input")

    const addClient = document.getElementById('clientSubmit')
    addClient.addEventListener("click", () => {
        // onclick="window.location.href='#invis2'"
    const cName =  document.getElementById('clientName').value;
    const cPhone= document.getElementById('clientPhone').value;
    const cEmail= document.getElementById('clientEmail').value;
    const cDob= document.getElementById('clientDob').value;
    const cAddress= document.getElementById('clientAddress').value;
    const Oname = document.getElementById('partyName').value;
    const Oaddress = document.getElementById('OPaddress').value;
    const Olawyer= document.getElementById('OPlawyer').value;

    if(cName == ""){
        document.getElementById("clientName").style.border="2px solid red"
        var client_name = document.getElementById("name_regex")
        client_name.innerHTML = "Name cannot be empty, Please try again";
        client_name.style.fontSize="10px"
        client_name.style.float="left"
        client_name.style.color="red"
        client_name.style.display = "block";

    }

    else if(!(underAgeValidate(cDob))){
        document.getElementById("clientDob").style.border = "2px solid red";
        var dob_regex = document.getElementById("dob_regex")
        dob_regex.style.color = "red";
        dob_regex.style.fontSize="10px"
        dob_regex.innerHTML = "Age should be greater than 18, Please try again";
        dob_regex.style.display = "block";
       
    }

    else if(!(/^(?:\+971|0(0971)?)(?:[234679]|5[01256])[0-9]{7}$/).test(cPhone) || cPhone == ""){
        document.getElementById("clientPhone").style.border="2px solid red";
        var phone_regex = document.getElementById("phone_regex")
        phone_regex.innerHTML = "Invalid email, Please try again";
        phone_regex.style.fontSize="10px"
        phone_regex.style.float="left"
        phone_regex.style.color="red"
        phone_regex.style.display = "block";
    }

    else if(!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(cEmail)) || cEmail == ""){
        document.getElementById("clientEmail").style.border = "2px solid red";
        var email_regex = document.querySelector("#email_regex")
        email_regex.innerHTML = "Invalid email, Please try again";
        email_regex.style.fontSize="10px"
        email_regex.style.float="left"
        email_regex.style.color="red"
        email_regex.style.display = "block";
    }



    else if(cAddress == ""){
        document.getElementById("clientAddress").style.border="2px solid red"
        var client_address = document.getElementById("address_regex")
        client_address.innerHTML = "Address cannot be empty, Please try again";
        client_address.style.fontSize="10px"
        client_address.style.float="left"
        client_address.style.color="red"
        client_address.style.display = "block";

    }

    else if(Oname==""){
        document.getElementById("partyName").style.border="2px solid red"
        var opp_name = document.getElementById("oppName_regex")
        opp_name.innerHTML = "Name cannot be empty, Please try again";
        opp_name.style.fontSize="10px"
        opp_name.style.float="left"
        opp_name.style.color="red"
        opp_name.style.display = "block";

    }

    else if(Oaddress==""){
        document.getElementById("OPaddress").style.border="2px solid red"
        var opp_add = document.getElementById("oppAdd_regex")
        opp_add.innerHTML = "Name cannot be empty, Please try again";
        opp_add.style.fontSize="10px"
        opp_add.style.float="left"
        opp_add.style.color="red"
        opp_add.style.display = "block";
    }

    else if(Olawyer==""){
        document.getElementById("OPlawyer").style.border="2px solid red"
        var oppCouncil_regex = document.getElementById("oppCounc_regex")
        oppCouncil_regex.innerHTML = "Name cannot be empty, Please try again";
        oppCouncil_regex.style.fontSize="10px"
        oppCouncil_regex.style.float="left"
        oppCouncil_regex.style.color="red"
        oppCouncil_regex.style.display = "block";
    }

    else{
    addClient.addEventListener("click", () => {
    clientPartySubmit(cName, cPhone, cEmail, cDob, cAddress, Oname, Oaddress, Olawyer)
    location.href='#invis2'
    })
   }
})


}


async function clientPartySubmit(cName, cPhone, cEmail, cDob, cAddress, Oname, Oaddress, Olawyer){

    console.log(CaseID, cName, cPhone, cEmail, cDob, cAddress, Oname, Oaddress, Olawyer)

    var obj = {"case_id": CaseID, "client_name":cName, "client_email":cEmail, "client_phonenumber":cPhone, "client_address":cAddress, "client_dob":cDob, "opposing_party":Oname, "oppositing_address":Oaddress, "opposing_counsel":Olawyer}                                                                      

    var json = JSON.stringify(obj);
    const options3 = {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type':'application/json',
       }
   };
    
   const response3 = await fetch(
       'https://lawflow-3c5b7.uc.r.appspot.com/case/addClient', options3);
   
   if (response3.status==200){
       var value = await response3.json();
       console.log(response3.status)
       console.log("Added new Client")
   }


}


async function disclaimer(){

    const targetDiv111 = document.getElementById("full");
    const targetDiv222 = document.getElementById("disclaimer");


    targetDiv111.style.visibility = "visible";
    targetDiv222.style.visibility = "visible";

    const closeWindow = document.getElementById("closeWindow")
    closeWindow.addEventListener("mouseover", () => {
        closeWindow.src=''
        closeWindow.src = '../assets/delRed.png';

    })

    closeWindow.addEventListener("mouseout", () => {
        closeWindow.src=''
        closeWindow.src = '../assets/del.png';
    })

    const acceptContinue = document.getElementById("accept");
    acceptContinue.addEventListener("click", () => {
        targetDiv111.style.visibility = "hidden";
        targetDiv222.style.visibility = "hidden";

    })




}


async function subT(){
const addSubtaskButton = document.getElementById('addTask1')
const targetDiv1 = document.getElementById("full");
const targetDiv2 = document.getElementById("subtaskForm");

    addSubtaskButton.addEventListener("click", () => {
        targetDiv1.style.visibility = "visible";
        targetDiv2.style.visibility = "visible";
        body.style.overflow="hidden"
    })

  const closeForm = document.getElementById("addSub")
  closeForm.addEventListener("click", () => {
        targetDiv1.style.visibility = "hidden";
        targetDiv2.style.visibility = "hidden";
        body.style.overflowY="visible"
    })
    

const closeWindow = document.getElementById('cross')
    closeWindow.addEventListener("click", () => {
        targetDiv1.style.visibility = "hidden";
        targetDiv2.style.visibility = "hidden";
        body.style.overflowY="visible"
    })

//---------------------------------------------------------------------------------------------

const finalSubmit = document.getElementById('finalSubmit')
const targetDiv11 = document.getElementById("full");
const targetDiv22 = document.getElementById("successfulSubmit");

finalSubmit.addEventListener("click", () => {
        targetDiv11.style.visibility = "visible";
        targetDiv22.style.visibility = "visible";
        //body.style.overflow="hidden"


    })

const chekc1 = document.getElementById("addSub")
chekc1.addEventListener("click", () => {
    targetDiv11.style.visibility = "hidden";
    targetDiv22.style.visibility = "hidden";
    body.style.overflowY="visible"


})
    

const check2 = document.getElementById('cross')
check2.addEventListener("click", () => {
    targetDiv11.style.visibility = "hidden";
    targetDiv22.style.visibility = "hidden";
    body.style.overflowY="visible"
})
    
}



//When body loads, ask case details
body.onload = async function createCase(){
    disclaimer()
    formCaseDetails()
    workflowSubtaskDetails()
    subT()
        //uploadFiles()
        //read()
    // setWF()
    clientPartyInput()
}


// localStorage.setItem("CaseID",CaseID)
// console.log(CaseID)

export { CaseID };

/*Search Bar*/

// var maindiv = "";
// var removemore = "";
// document.getElementById("searhopennav").onclick= function openNav() {
//     document.getElementById("mySidenav").style.width = "250px";
// }
//   function deleteKeyword(){
//     if(document.getElementById("0")!= null){
//       document.getElementById("0")
//                   .parentNode.removeChild(document.getElementById("0"));
//       }
//   }
//   function deleteFilename(){
//     let i = 0;
//     while(true){
//     if(document.getElementById(i)!= null){
//       document.getElementById(i)
//                   .parentNode.removeChild(document.getElementById(i));
//       }
//       else{
//         break;
//       }
//       i++;
//     }
//     removemore = 0;
//   }
//   document.getElementById("searchclosebtn").addEventListener('click', (e)=>{
//     const UI = document.getElementById('results');
//     UI.innerHTML = "";
//     document.getElementById("search2").value = null;
//     document.getElementById("mySidenav").style.width = "0";
//     if(removemore == 0){
//       deleteKeyword();
//     }
//     else{
//       deleteFilename();
//     }
//       var radiobox = document.getElementsByName("radio");
//       for(let i = 0; i < radiobox.length; i++){
//         if(radiobox[i].checked){
//           radiobox[i].checked = false;
//         }
//       }
//   })
 
   

// document.getElementById("img").addEventListener('click',()=>{
//   window.open("../searchBar/searchByImage.html","_self");
// });
// async function showFilenameResults(searchField){
//   if(removemore == 0)deleteKeyword();
//   else deleteFilename();
//   var filename = [];
//   var j = 0;
//   var obj = {"username":username, "filename":searchField}
//         var json = JSON.stringify(obj)
//         let searchByKeywordURL = new URL (`https://lawflow-3c5b7.uc.r.appspot.com/searchFile/search_filename`)
//         console.log(searchByKeywordURL)

//         const options = {
//             method : 'POST',
//             body: json,
//             headers:{
//                 'Content-Type': 'application/json',
//             }
//         }

//         const response = await fetch(
//             'https://lawflow-3c5b7.uc.r.appspot.com/searchFile/search_filename', options);

//         if(response.status == 200){
//             var files = await response.json();
//             console.log(files);
//             if(files.length > 2){
//               removemore = 1;
//             }
//             for(let i = 0; i < files.length;i=i+2){
//              var split = files[i+1].split('/')
//              var file_name_split = split[1]
//              var case_name = split[0]
//             const extension = files[i+1].split('.')
//             const UI = document.getElementById('results');
//             const name_of_file = document.createElement("p")
//             name_of_file.innerText=file_name_split
//             name_of_file.style.fontSize="14px"
//             name_of_file.style.color="white"
//             name_of_file.style.marginTop="-2.5vh"
//             name_of_file.style.marginLeft="-1vw"
//             const case_name1 = document.createElement("p")
//             case_name1.innerText=case_name
//             case_name1.style.fontSize="12px"
//             case_name1.style.color="grey"
//             case_name1.style.marginTop="-3vh"
//             case_name1.style.marginLeft="-1vw"
            
//             maindiv = document.createElement('div');
//             maindiv.setAttribute('id',j+"");
//             var icon = document.createElement('img');
//             icon.style.marginLeft="-1vw"
//             var para = document.createElement('div');
//             para.style.height="5vh"
//             name_of_file.style.overflowWrap="break-word"
//             case_name1.style.overflowWrap="break-word"
        
//             para.appendChild(name_of_file)
//             para.appendChild(case_name1)
//             icon.style.float="left";
//             icon.style.width = "3.5vh";
//            // para.innerHTML = files[i+1];
//             if(extension[1] == 'pdf'){
//             icon.src = '../assets/pdf_new.png';
//             }
//             else
//             icon.src='../assets/img_new.png';
//             icon.style.marginTop="-2vh"
//             //para.style.marginLeft="2vw";
//             maindiv.style.height="auto";
//             maindiv.style.borderRadius="5px"
//             maindiv.style.padding="3.5vh"
//             maindiv.style.marginBottom="2vh"
//             maindiv.style.boxShadow="1px 1px 1px 1px #455f77"
//             maindiv.style.width="18vw"
//             //maindiv.style.border="1px solid white"

          
//             maindiv.appendChild(icon)
//             maindiv.appendChild(para)
//             maindiv.onclick = function async(){
//                 window.open(files[i], '_blank').focus()
//             }
//             UI.appendChild(maindiv);
//             UI.style.marginTop="2vh"
//             j++;
//           }
            
//         }
//         else if(response.status == 404){
//           const UI = document.getElementById('results');
//           UI.innerHTML = "No file found";
//         }
// }
// async function showKeywordResults(searchField){
//   if(removemore == 0)deleteKeyword();
//   else deleteFilename();
//     var obj = {"username":username, "text":searchField}
//         var json = JSON.stringify(obj)
//         let searchByKeywordURL = new URL (`https://lawflow-3c5b7.uc.r.appspot.com/searchByTag/takeKeywords`)
//         console.log(searchByKeywordURL)

//         const options = {
//             method : 'POST',
//             body: json,
//             headers:{
//                 'Content-Type': 'application/json',
//             }
//         }

//         const response = await fetch(
//             'https://lawflow-3c5b7.uc.r.appspot.com/searchByTag/takeKeywords', options);

//         if(response.status == 200){
//             var files = await response.json()
//             var names = files[0].name
//             var url = files[0].url
//             const extension = names.split('.').pop()
//             const UI = document.getElementById('results');
//             maindiv = document.createElement('div');
//             maindiv.setAttribute('id',"0");
//             var icon = document.createElement('img');
//             var para = document.createElement('div');
//             icon.style.float="left";
//             icon.style.width = "3.5vh";
//             para.innerHTML = names;
//             if(extension == 'pdf'){
//             icon.src = '../assets/pdf_new.png';
//             }
//             else
//             icon.src='../assets/img_new.png';
//             icon.style.cursor = "pointer"
//             para.style.cursor = "pointer"
//             para.style.marginTop="0.5vh";
//             para.style.marginLeft="2vw";
//             icon.style.marginLeft="-1vw"
//             icon.style.marginTop="-1.5vh"
//             para.style.marginTop="-1vh"
//             maindiv.style.height="3vw";
//             maindiv.style.width="18vw"
//             maindiv.style.borderRadius="5px"
//             maindiv.style.padding="3.5vh"
//             maindiv.style.boxShadow="1px 1px 1px 1px #455f77"
//             maindiv.appendChild(icon)
//             maindiv.appendChild(para)
//             maindiv.onclick = function async(){
//                 window.open(url, '_blank').focus()
//             }
//             UI.appendChild(maindiv);
//         }
//         else if(response.status == 404){
//           const UI = document.getElementById('results');
//           UI.style.marginLeft = "15px";
//           UI.innerHTML = "No file found";
//         }
// }

// document.getElementById("searchALL").addEventListener('click',()=>{
//   var radiobox = document.getElementsByName("radio");
//   var flag = 0;
//   var sOption = "";
//   for(let i = 0; i < radiobox.length; i++){
//     if(radiobox[i].checked){
//       console.log(radiobox[i].value);
//       sOption = radiobox[i].value;
//       flag = 1;
//     }
//   }
//   if(flag != 1){
//     console.log("Please select a search option before searching");
//   }
//   else{
//     var searchText = document.getElementById("search2").value;
//     if(searchText == null || searchText == ""){
//       console.log("Please enter a value before searching");
//     }
//     if(sOption == "keyword"){
//       console.log("Keyword API should be called");
//       showKeywordResults(searchText);
//     }
//     else if(sOption == "filename"){
//       console.log("filename API should be called");
//       showFilenameResults(searchText);
//     }
//   }
// });
// //search

