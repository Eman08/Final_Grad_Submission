const Swal = require('sweetalert2');
import {notification_for_app} from '../notifications/notification.js'
notification_for_app()

function showSpinner(){
    document.getElementById('cover-spin').style.display = 'block';
  }
  function closeSpinner(){
    document.getElementById('cover-spin').style.display = 'none';
  }
  

var username = localStorage.getItem("username")
document.getElementById("heading_main").innerText=`Hello, ${username}`



const api_url =  'https://lawflow-3c5b7.uc.r.appspot.com/todolist';
const api_gettodolist =  'https://lawflow-3c5b7.uc.r.appspot.com/gettodolist';
const api_updateActivityTodoList ='https://lawflow-3c5b7.uc.r.appspot.com/todolist/updateActivity';
var todoList = [];
var body = document.getElementById("main-body");
body.onload= async function getToDoList(){

    var obj = {"username":username}
    var json= JSON.stringify(obj);
   
    const options = {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type': 'application/json', 
          }
    };

    const response = await fetch(
        'https://lawflow-3c5b7.uc.r.appspot.com/todolist/gettodolist', options);
    
    if(response.status==200){
        var value = await response.json();
        
        CSSproperties(value);
         
    } 

}


async function updateList(new_value, id, username){
  
    var obj={"username":username, "activity_update":new_value, "item_id":id};
    var json = JSON.stringify(obj);
    const options = {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type': 'application/json', 
          }
    };

    const response = await fetch(
        'https://lawflow-3c5b7.uc.r.appspot.com/todolist/updateActivity', options
    );
    console.log(response);

}

async function deleteItem( id, username){

    var obj={"username":username, "item_id":id}
    var json = JSON.stringify(obj);
    const options = {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type': 'application/json', 
          }
    };
    const response = await fetch(
        'https://lawflow-3c5b7.uc.r.appspot.com/todolist/deleteparticularitem',options
    )
    console.log(response);
    window.location.reload();
}


async function updateActivityStatus(username, item_id, status, case_id, task_id){
    

    var obj = {"username":username, "item_id": item_id, "status_update":status, "case_id":case_id, "task_id":task_id}
    var json = JSON.stringify(obj)

    const options = {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type': 'application/json', 
          }
    };

    const response = await fetch(
        'https://lawflow-3c5b7.uc.r.appspot.com/todolist/updateStatus', options);
    
    if(response.status==200){
        closeSpinner()
        window.location.reload();
    } 


}

async function CSSproperties(value){
    const UI = document.getElementById("Display-todo")
    const UIIP = document.getElementById("Display-inprogress")
    const UIC = document.getElementById("Display-completed")
    const elem = document.createElement("hr");
    const scrollToDo = document.querySelector(".todo12")

    for(var i=0;i<value.length;i++){
        
        if(value[i].status=="To-do" || value[i].status=="pending" || value[i].status == "Not Started" || value[i].status == "Not_Started"){
        console.log(value[i].acitvity_description.length)
        const case_id_variable= value[i].case_id
        const task_id = value[i].task_id
        const item_id= value[i].id
        var onClickVar = false;

        const newLi = document.createElement("ul");
        const mainDiv = document.createElement("div")
        const headingdiv = document.createElement("div")
        const heading = document.createElement("p")
        const task_description = document.createElement("p")
        const case_id=document.createElement("p")
        const assigned_by_div= document.createElement("div")
        const assigned_by_text = document.createElement("p")
        const assigned_by_icon = document.createElement("div")
        var div = document.createElement("div")
        var hr = document.createElement("hr")
        const button= document.createElement("button")
        const dropdown = document.createElement("div")
        const option1 = document.createElement("p")
        const option2 = document.createElement("p")
        option1.innerText="Move to in progress"
        option1.style.fontSize="12px"
        //option2.innerText="Move to completed"
        // option1.style.paddingTop="5px"
        // option2.style.paddingBottom="5px"
        // option1.style.paddingLeft="2px"
        // option1.style.paddingRight="2px"
        option1.style.textAlign="center"
        // option2.style.textAlign="center"
        // option2.style.padding="4px"
        dropdown.appendChild(option1)
       // dropdown.appendChild(hr)
        dropdown.appendChild(option2)
        dropdown.style.backgroundColor="white"
        dropdown.style.border="1px solid lightgrey"
        dropdown.style.width="12vw"
        dropdown.style.height="5vh"
        dropdown.style.textAlign="centre"
        dropdown.style.color="black"
        dropdown.style.marginLeft="8.110300081103vw"
        dropdown.style.marginTop="9.852216748768473vh"
        dropdown.style.fontFamily="Segoe UI"
        dropdown.style.fontWeight="400"
       // dropdown.style.zIndex="-1"
        dropdown.style.cursor="pointer"
        //dropdown.style.display="none"
        dropdown.style.position="fixed"
        dropdown.style.display="none"

        dropdown.addEventListener("mouseover",(e)=>{
          dropdown.style.border="1px solid grey"
          


        })

        dropdown.addEventListener("mouseout",(e)=>{
          dropdown.style.border="1px solid lightgrey"
          


        })

        option1.addEventListener("click",(e)=>{
          showSpinner()
          console.log(item_id, case_id_variable, task_id)
          updateActivityStatus(username, item_id,"in-progress",case_id_variable, task_id)
        })

        option2.addEventListener("click",(e)=>{
            console.log("I reach here") 
            console.log(item_id, case_id_variable, task_id)
            updateActivityStatus(username, item_id,"completed",case_id_variable, task_id)
          })
        div.appendChild(dropdown);
        // div.style.position="sticky"
        !onClickVar?button.style.backgroundColor="transparent":button.style.backgroundColor="#aeaeae"
        // dropdown.style.border="solid"
        // dropdown.style.borderWidth="1px"
        dropdown.style.backgroundColor="white"
        button.style.border="none"
     
        button.addEventListener('click',(event)=>{
            onClickVar = !onClickVar;
            console.log("clicked")
            if(onClickVar == false){
            button.style.backgroundColor="transparent"
            dropdown.style.display="none"
            }
            else{
            button.style.backgroundColor="#aeaeae"
            dropdown.style.display="block"
            }

            if (!button.contains(event.target)) {
                dropdown.style.display = 'none';
              }
            
        }

        );
        mainDiv.addEventListener("click",(event)=>{
            if (!button.contains(event.target)) {
                dropdown.style.display = 'none';
                button.style.backgroundColor="transparent"
              }
            
        })
        scrollToDo.addEventListener("scroll",(e)=>{
            dropdown.style.display="none"
            onClickVar = false
            if(onClickVar == false){
                button.style.backgroundColor="transparent"
                dropdown.style.display="none"
                }
        })

        
        heading.innerText = value[i].todoListItem
        heading.style.fontSize="17px"
        heading.style.marginTop="3.5vh"
        heading.style.fontWeight="100px"
        heading.style.textAlign="left"
        heading.style.padding="10px"
        heading.style.color="black"
        heading.style.fontFamily="'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"

        task_description.innerText=value[i].acitvity_description
        task_description.style.textAlign="left"
        task_description.style.paddingLeft="0.8110300081103001vw"
        task_description.style.fontSize="15px"
        task_description.style.color="#656565"
        task_description.style.fontWeight="400"
        task_description.style.fontFamily="Segoe UI"

        assigned_by_icon.innerHTML='<i class="fa fa-user" aria-hidden="true" ></i>';
        assigned_by_icon.style.fontSize="17px"
        assigned_by_icon.style.color="grey"
        assigned_by_icon.style.marginLeft="0.8110300081103001vw"
        assigned_by_icon.style.alignItems="left"
        assigned_by_text.innerText=value[i].assigned_by
        assigned_by_icon.style.float="left"
        assigned_by_text.style.fontSize="15px"
        assigned_by_text.style.fontWeight="100"
        assigned_by_text.style.color="#a9a9a9"
        assigned_by_text.style.marginLeft="3.2441200324412005vw"
        assigned_by_text.style.textAlign="left"
    
        button.innerHTML='<i class="fa fa-ellipsis-h" aria-hidden="true"></i>'
        button.style.float="right"
        button.style.height="4.105090311986864vh"
        button.style.marginTop="5.41871921182266vh"
        button.style.borderRadius="50px"
        case_id.style.marginTop="-4.926108374384237vh"
        case_id.innerText="Case Number: "+value[i].case_id
        case_id.style.fontFamily="'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;"
        case_id.style.textAlign="left"
        case_id.style.paddingLeft=" 0.8110300081103001vw"
        case_id.style.color="#a9a9a9"
        case_id.style.fontSize="13px"
        case_id.style.fontWeight="100"
        case_id.style.marginTop="0vh"
        mainDiv.style.backgroundColor="#ffffff"
        mainDiv.style.height="auto"
        mainDiv.style.width="21.49229521492295vw"
        mainDiv.style.marginLeft="1.2165450121654502vw"
        mainDiv.style.borderRadius="5px"
        mainDiv.style.borderLeft="10px solid orange"
        mainDiv.style.borderRight="1px solid grey"
        mainDiv.style.borderTop="1px solid grey"
        mainDiv.style.borderBottom="1px solid grey"
        mainDiv.style.marginBottom="3.466204506065858vh"
        mainDiv.style.boxShadow="2px 2px 2px 1px grey";
        assigned_by_div.addEventListener("mouseover",(event))
        assigned_by_div.style.paddingBottom="0.16420361247947454vh"
        assigned_by_text.style.fontFamily="Segoe UI"
        assigned_by_div.appendChild(assigned_by_icon)
        assigned_by_div.appendChild(assigned_by_text)
       
        headingdiv.style.paddingRight="0.8110300081103001vw"
        headingdiv.style.display="flex"
        headingdiv.style.justifyContent="space-between"
        headingdiv.appendChild(heading)
        headingdiv.appendChild(button)
        headingdiv.appendChild(dropdown)
        //mainDiv.appendChild(dropdown)
        mainDiv.appendChild(headingdiv)
        mainDiv.appendChild(case_id)
        mainDiv.appendChild(task_description)
        mainDiv.appendChild(assigned_by_div)
        mainDiv.appendChild(newLi)

        UI.appendChild(mainDiv);    
    }
    if(value[i].status == "in-progress" || value[i].status == "Started"){
        
        var array = ["Move to in progress","Move to completed"]
        const case_id_variable= value[i].case_id
        const task_id = value[i].task_id
        const item_id= value[i].id
        var onClickVar = false;
        const newLi = document.createElement("ul");
        const mainDiv = document.createElement("div")
        const headingdiv = document.createElement("div")
        const heading = document.createElement("p")
        const task_description = document.createElement("p")
        const case_id=document.createElement("p")
        const assigned_by_div= document.createElement("div")
        const assigned_by_text = document.createElement("p")
        const assigned_by_icon = document.createElement("div")
        var div = document.createElement("div")
        var hr = document.createElement("hr")
        const button= document.createElement("button")
        const dropdown = document.createElement("div")
        const option2 = document.createElement("p")
       
        option2.style.fontSize="12px"
        option2.innerText="Move to completed"
        option2.style.paddingBottom="10px"
        option2.style.textAlign="center"
        option2.style.paddingLeft="2px"
        option2.style.paddingRight="2px"
        dropdown.appendChild(option2)
        dropdown.style.backgroundColor="white"
        dropdown.style.width="12vw"
        dropdown.style.textAlign="centre"
        dropdown.style.color="black"
        dropdown.style.height="5vh"
        dropdown.style.border="1px solid lightgrey"
        dropdown.style.marginLeft="8.110300081103vw"
        dropdown.style.marginTop="9.852216748768473vh"
        dropdown.style.fontFamily="Segoe UI"
        dropdown.style.fontWeight="400"

        dropdown.addEventListener("mouseover",(e)=>{
          dropdown.style.border="1px solid grey"
          


        })

        dropdown.addEventListener("mouseout",(e)=>{
          dropdown.style.border="1px solid lightgrey"
          


        })
       // dropdown.style.zIndex="-1"
        dropdown.style.cursor="pointer"
        //dropdown.style.display="none"
        dropdown.style.position="fixed"
        dropdown.style.display="none"
        
        
        div.appendChild(dropdown);
        // div.style.position="sticky"
        option2.addEventListener("click",(e)=>{
            showSpinner()
            console.log(item_id, case_id_variable, task_id)
            updateActivityStatus(username, item_id,"completed",case_id_variable, task_id)
          })

        
        heading.innerText = value[i].todoListItem
        heading.style.fontSize="17px"
        heading.style.fontWeight="100px"
        heading.style.textAlign="left"
        heading.style.padding="10px"
        heading.style.color="black"
        heading.style.fontFamily="Segoe UI"

        task_description.innerText=value[i].acitvity_description
        task_description.style.textAlign="left"
        task_description.style.paddingLeft="0.78125vw"
        task_description.style.fontSize="15px"
        task_description.style.color="#656565"
        task_description.style.fontWeight="400"
        task_description.style.fontFamily="Segoe UI"

        assigned_by_icon.innerHTML='<i class="fa fa-user" aria-hidden="true" ></i>';
        assigned_by_icon.style.fontSize="17px"
        assigned_by_icon.style.color="grey"
        assigned_by_icon.style.marginLeft= "0.78125vw"
        assigned_by_icon.style.alignItems="left"
        assigned_by_text.innerText=value[i].assigned_by
        assigned_by_icon.style.float="left"
        assigned_by_text.style.fontSize="15px"
        assigned_by_text.style.fontWeight="100"
        assigned_by_text.style.color="#a9a9a9"
        assigned_by_text.style.marginLeft="3.125vw"
        assigned_by_text.style.textAlign="left"
    
        button.innerHTML='<i class="fa fa-ellipsis-h" aria-hidden="true"></i>'
        button.style.float="right"
        button.style.height="4.332755632582322vh"
        button.style.marginTop="5.719237435008665vh"
        button.style.borderRadius="50px"
        case_id.style.marginTop="-5.1993067590987865vh"
        case_id.innerText="Case Number: "+value[i].case_id
        case_id.style.fontFamily="'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;"
        case_id.style.textAlign="left"
        case_id.style.paddingLeft="0.78125vw"
        case_id.style.marginTop="1vh"
        case_id.style.color="#a9a9a9"
        case_id.style.fontSize="13px"
        case_id.style.fontWeight="100"
        mainDiv.style.backgroundColor="#ffffff"
        mainDiv.style.height="auto"
        mainDiv.style.width="20.703125vw"
        mainDiv.style.marginLeft="1.171875vw"
        mainDiv.style.borderRadius="5px"
        mainDiv.style.borderLeft="10px solid grey"
        mainDiv.style.boxShadow="1px 1px 1px 1px grey"
        assigned_by_div.style.paddingBottom="1px"
        assigned_by_text.style.fontFamily="Segoe UI"
        assigned_by_div.appendChild(assigned_by_icon)
        assigned_by_div.appendChild(assigned_by_text)
        button.style.backgroundColor="transparent"
        button.style.border="none"
        button.addEventListener('click',(event)=>{
            onClickVar = !onClickVar;
            
            if(onClickVar == false){
            button.style.backgroundColor="transparent"
            dropdown.style.display="none"
            }
            else{
            button.style.backgroundColor="#aeaeae"
            dropdown.style.display="block"
            }

            if (!button.contains(event.target)) {
                dropdown.style.display = 'none';
              }
            
        }

        );
        mainDiv.addEventListener("click",(event)=>{
            if (!button.contains(event.target)) {
                dropdown.style.display = 'none';
                button.style.backgroundColor="transparent"
              }
            
        })
        headingdiv.style.paddingRight="10px"
        headingdiv.style.display="flex"
        headingdiv.style.justifyContent="space-between"
        headingdiv.appendChild(dropdown)
        headingdiv.appendChild(heading)
        headingdiv.appendChild(button)
        mainDiv.appendChild(headingdiv)
        mainDiv.appendChild(case_id)
        mainDiv.appendChild(task_description)
        mainDiv.appendChild(assigned_by_div)
        mainDiv.appendChild(newLi)
    
        UIIP.appendChild(mainDiv);    
        
    }
    if(value[i].status == "completed" || value[i].status == "Finished"){
      
        var array = ["Move to in progress","Move to completed"]
        const case_id_variable= value[i].case_id
        const task_id = value[i].task_id
        const item_id= value[i].id

        const newLi = document.createElement("ul");
        const mainDiv = document.createElement("div")
        const headingdiv = document.createElement("div")
        const heading = document.createElement("p")
        const task_description = document.createElement("p")
        const case_id=document.createElement("p")
        const assigned_by_div= document.createElement("div")
        const assigned_by_text = document.createElement("p")
        const assigned_by_icon = document.createElement("div")
        var div = document.createElement("div")
        var hr = document.createElement("hr")
        const button= document.createElement("button")
        const dropdown = document.createElement("div")
        const option1 = document.createElement("p")
        const option2 = document.createElement("p")
        option1.innerText="Move to in progress"
        option1.style.fontSize="12px"
        option2.style.fontSize="12px"
        option2.innerText="Move to completed"
        option1.style.paddingTop="2.5996533795493932vh"
        option2.style.paddingBottom="1.733102253032929vh"
        option1.style.paddingLeft="0.15625vw"
        option1.style.paddingRight="0.15625vw"
        option1.style.textAlign="center"
        option2.style.textAlign="center"
        option2.style.paddingLeft="0.15625vw"
        option2.style.paddingRight="0.15625vw"
        option1.addEventListener('click',(e)=>{

        })
        
        
        
        heading.innerText = value[i].todoListItem
        heading.style.fontSize="17px"
        heading.style.fontWeight="100px"
        heading.style.textAlign="left"
        heading.style.padding="10px"
        heading.style.color="black"
        heading.style.fontFamily="Segoe UI"

        task_description.innerText=value[i].acitvity_description
        task_description.style.textAlign="left"
        task_description.style.paddingLeft="0.78125vw"
        task_description.style.fontSize="15px"
        task_description.style.color="#656565"
        task_description.style.fontWeight="400"
        task_description.style.fontFamily="Segoe UI"

        assigned_by_icon.innerHTML='<i class="fa fa-user" aria-hidden="true" ></i>';
        assigned_by_icon.style.fontSize="17px"
        assigned_by_icon.style.color="grey"
        assigned_by_icon.style.marginLeft="0.78125vw"
        assigned_by_icon.style.alignItems="left"
        assigned_by_text.innerText=value[i].assigned_by
        assigned_by_icon.style.float="left"
        assigned_by_text.style.fontSize="15px"
        assigned_by_text.style.fontWeight="100"
        assigned_by_text.style.color="#a9a9a9"
        assigned_by_text.style.marginLeft="3.125vw"
        assigned_by_text.style.textAlign="left"
    
        
        case_id.style.marginTop="-5.1993067590987865vh"
        case_id.innerText="Case Number: "+value[i].case_id
        case_id.style.fontFamily="'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;"
        case_id.style.textAlign="left"
        case_id.style.paddingLeft="0.78125vw"
        case_id.style.color="#a9a9a9"
        case_id.style.fontSize="13px"
        case_id.style.marginTop="1vh"
        case_id.style.fontWeight="100"
        mainDiv.style.backgroundColor="#ffffff"
        mainDiv.style.height="auto"
        mainDiv.style.boxShadow="1px 1px 1px 1px grey"
        mainDiv.style.width="20.703125vw"
        mainDiv.style.marginLeft="1.171875vw"
        mainDiv.style.borderRadius="5px"
        mainDiv.style.borderLeft="0.78125vw solid #006d5b"
        assigned_by_div.addEventListener("mouseover",(event))
        assigned_by_div.style.paddingBottom="1px"
        assigned_by_text.style.fontFamily="Segoe UI"
        assigned_by_div.appendChild(assigned_by_icon)
        assigned_by_div.appendChild(assigned_by_text)
        button.style.backgroundColor="transparent"
        button.style.border="none"
        button.addEventListener('click',(event)=>{
           
            button.style.backgroundColor="#aeaeae"
            dropdown.style.display="block"
        }

        );
        headingdiv.style.paddingRight="0.78125vw"
        headingdiv.style.display="flex"
        headingdiv.style.justifyContent="space-between"
        headingdiv.appendChild(heading)
        headingdiv.appendChild(button)
        mainDiv.style.marginBottom="5.1993067590987865vh"
        mainDiv.appendChild(headingdiv)
        mainDiv.appendChild(case_id)
        mainDiv.appendChild(task_description)
        mainDiv.appendChild(assigned_by_div)
        mainDiv.appendChild(newLi)
        UIC.appendChild(mainDiv);    
}
}
}

/*Search Bar*/

var maindiv = "";
var removemore = "";
document.getElementById("check1").onclick= function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
  function deleteKeyword(){
    if(document.getElementById("0")!= null){
      document.getElementById("0")
                  .parentNode.removeChild(document.getElementById("0"));
      }
  }
  function deleteFilename(){
    let i = 0;
    while(true){
    if(document.getElementById(i)!= null){
      document.getElementById(i)
                  .parentNode.removeChild(document.getElementById(i));
      }
      else{
        break;
      }
      i++;
    }
    removemore = 0;
  }
  document.getElementById("searchclosebtn").addEventListener('click', (e)=>{
    const UI = document.getElementById('results');
    UI.innerHTML = "";
    document.getElementById("search2").value = null;
    document.getElementById("mySidenav").style.width = "0";
    if(removemore == 0){
      deleteKeyword();
    }
    else{
      deleteFilename();
    }
      var radiobox = document.getElementsByName("radio");
      for(let i = 0; i < radiobox.length; i++){
        if(radiobox[i].checked){
          radiobox[i].checked = false;
        }
      }
  })
 
   

document.getElementById("img").addEventListener('click',()=>{
  window.open("../searchBar/searchByImage.html","_self");
});
async function showFilenameResults(searchField){
  if(removemore == 0)deleteKeyword();
  else deleteFilename();
  var filename = [];
  var j = 0;
  var obj = {"username":username, "filename":searchField}
        var json = JSON.stringify(obj)
        let searchByKeywordURL = new URL (`https://lawflow-3c5b7.uc.r.appspot.com/searchFile/search_filename`)
        console.log(searchByKeywordURL)

        const options = {
            method : 'POST',
            body: json,
            headers:{
                'Content-Type': 'application/json',
            }
        }

        const response = await fetch(
            'https://lawflow-3c5b7.uc.r.appspot.com/searchFile/search_filename', options);

        if(response.status == 200){
            var files = await response.json();
            console.log(files);
            if(files.length > 2){
              removemore = 1;
            }
            for(let i = 0; i < files.length;i=i+2){
             var split = files[i+1].split('/')
             var file_name_split = split[1]
             var case_name = split[0]
            const extension = files[i+1].split('.')
            const UI = document.getElementById('results');
            const name_of_file = document.createElement("p")
            name_of_file.innerText=file_name_split
            name_of_file.style.fontSize="14px"
            name_of_file.style.color="white"
            name_of_file.style.marginTop="-2.5vh"
            name_of_file.style.marginLeft="-1vw"
            const case_name1 = document.createElement("p")
            case_name1.innerText=case_name
            case_name1.style.fontSize="12px"
            case_name1.style.color="grey"
            case_name1.style.marginTop="-3vh"
            case_name1.style.marginLeft="-1vw"
            
            maindiv = document.createElement('div');
            maindiv.setAttribute('id',j+"");
            var icon = document.createElement('img');
            icon.style.marginLeft="-1vw"
            var para = document.createElement('div');
            para.style.height="5vh"
            name_of_file.style.overflowWrap="break-word"
            case_name1.style.overflowWrap="break-word"
        
            para.appendChild(name_of_file)
            para.appendChild(case_name1)
            icon.style.float="left";
            icon.style.width = "3.5vh";
           // para.innerHTML = files[i+1];
            if(extension[1] == 'pdf'){
            icon.src = '../assets/pdf_new.png';
            }
            else
            icon.src='../assets/img_new.png';
            icon.style.marginTop="-2vh"
            //para.style.marginLeft="2vw";
            maindiv.style.height="auto";
            maindiv.style.borderRadius="5px"
            maindiv.style.padding="3.5vh"
            maindiv.style.marginBottom="2vh"
            maindiv.style.boxShadow="1px 1px 1px 1px #455f77"
            maindiv.style.width="18vw"
            //maindiv.style.border="1px solid white"

          
            maindiv.appendChild(icon)
            maindiv.appendChild(para)
            maindiv.onclick = function async(){
                window.open(files[i], '_blank').focus()
            }
            UI.appendChild(maindiv);
            UI.style.marginTop="2vh"
            j++;
          }
            
        }
        else if(response.status == 404){
          const UI = document.getElementById('results');
          UI.innerHTML = "No file found";
        }
}
async function showKeywordResults(searchField){
  if(removemore == 0)deleteKeyword();
  else deleteFilename();
    var obj = {"username":username, "text":searchField}
        var json = JSON.stringify(obj)
        let searchByKeywordURL = new URL (`https://lawflow-3c5b7.uc.r.appspot.com/searchByTag/takeKeywords`)
        console.log(searchByKeywordURL)

        const options = {
            method : 'POST',
            body: json,
            headers:{
                'Content-Type': 'application/json',
            }
        }

        const response = await fetch(
            'https://lawflow-3c5b7.uc.r.appspot.com/searchByTag/takeKeywords', options);

        if(response.status == 200){
            var files = await response.json()
            var names = files[0].name
            var url = files[0].url
            const extension = names.split('.').pop()
            const UI = document.getElementById('results');
            maindiv = document.createElement('div');
            maindiv.setAttribute('id',"0");
            var icon = document.createElement('img');
            var para = document.createElement('div');
            icon.style.float="left";
            icon.style.width = "3.5vh";
            para.innerHTML = names;
            if(extension == 'pdf'){
            icon.src = '../assets/pdf_new.png';
            }
            else
            icon.src='../assets/img_new.png';
            icon.style.cursor = "pointer"
            para.style.cursor = "pointer"
            para.style.marginTop="0.5vh";
            para.style.marginLeft="2vw";
            icon.style.marginLeft="-1vw"
            icon.style.marginTop="-1.5vh"
            para.style.marginTop="-1vh"
            maindiv.style.height="3vw";
            maindiv.style.width="18vw"
            maindiv.style.borderRadius="5px"
            maindiv.style.padding="3.5vh"
            maindiv.style.boxShadow="1px 1px 1px 1px #455f77"
            maindiv.appendChild(icon)
            maindiv.appendChild(para)
            maindiv.onclick = function async(){
                window.open(url, '_blank').focus()
            }
            UI.appendChild(maindiv);
        }
        else if(response.status == 404){
          const UI = document.getElementById('results');
          UI.style.marginLeft = "15px";
          UI.innerHTML = "No file found";
        }
}

document.getElementById("searchALL").addEventListener('click',()=>{
  var radiobox = document.getElementsByName("radio");
  var flag = 0;
  var sOption = "";
  for(let i = 0; i < radiobox.length; i++){
    if(radiobox[i].checked){
      console.log(radiobox[i].value);
      sOption = radiobox[i].value;
      flag = 1;
    }
  }
  if(flag != 1){
    console.log("Please select a search option before searching");
  }
  else{
    var searchText = document.getElementById("search2").value;
    if(searchText == null || searchText == ""){
      console.log("Please enter a value before searching");
    }
    if(sOption == "keyword"){
      console.log("Keyword API should be called");
      showKeywordResults(searchText);
    }
    else if(sOption == "filename"){
      console.log("filename API should be called");
      showFilenameResults(searchText);
    }
  }
});
//search

