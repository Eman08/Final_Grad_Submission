import {notification_for_app} from '../notifications/notification.js'
notification_for_app()

var username = localStorage.getItem("username")
const moment = require('moment')

function showSpinner(){
  //document.getElementById('cover-spin').style.display = 'block';
}
function closeSpinner(){
  //document.getElementById('cover-spin').style.display = 'none';
}



var elem = document.getElementById("welcome-back")
elem.innerText=`Welcome Back ${username}!`
elem.style.marginLeft="1px"
var obj_clear = {"username":username}
var json = JSON.stringify(obj_clear)
const options_clear_notifs = {
    method: 'POST',
    body: json,
    headers: {
        'Content-Type': 'application/json', 
      }
};
const response_clear_notifs = await fetch(
    'https://lawflow-3c5b7.uc.r.appspot.com/notifications/autoDelete', options_clear_notifs);


function defineEachChart(array){
var data = [{
    values: [array[1], array[2],array[3]],
    labels: ['Completed', 'In Progress', 'Not Started' ],
    domain: {column: 0},
    name: 'Tasks',
    hoverinfo: 'label+percent+name',
    hole: .4,
    type: 'pie'
  }];
  
  var layout = {
    title: `Case ${array[0]}`,
        font: {
          size: 13,
          family: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
        },
        showarrow: false,
        text: '',
        x: 0,
        y: 0.9
      ,
    
    height: 370,
    width: 600,
    
    showlegend: false,
    grid: {rows: 1, columns: 1}
  };
  
 var myDiv = document.getElementById("wf_display")
 myDiv.innerHTML=""
 Plotly.newPlot(myDiv, data, layout);
}

showSpinner()
var obj = {"username":username}
var json = JSON.stringify(obj)
const options = {
    method: 'POST',
    body: json,
    headers: {
        'Content-Type': 'application/json', 
      }
};
const response = await fetch(
    'https://lawflow-3c5b7.uc.r.appspot.com/analytics/getAnalysis', options);

if(response.status==200){
  closeSpinner()
  var array=[]
  var total_tasks=0
  var completed = 0;
  var inp = 0;
  var not_started = 0;
  var keyarray=[]
  var value_analysis = await response.json()
 if(Object.keys(value_analysis).length != 0 ){
  var next_bar = document.createElement("div")
  var prev_bar = document.createElement("div")
  var current_pointer = -1
  //console.log(Object.keys(val).length)
  var wf_display = document.getElementById("wf")
  for (const [key, value] of Object.entries(value_analysis)) {
    keyarray.push(key)
  }

  next_bar.style.cursor="pointer"
  prev_bar.style.cursor="pointer"

 // console.log(`Key array value: ${keyarray.length}`)
  if(keyarray.length >1){
    prev_bar.innerHTML='<i class="fa fa-chevron-left fa-lg" aria-hidden="true"></i>'
    next_bar.innerHTML='<i class="fa fa-chevron-right fa-lg" aria-hidden="true"></i>'
    prev_bar.style.color="black"
    prev_bar.style.height="17.33102253032929vh"
    prev_bar.style.width="7.8125vw"
    prev_bar.style.marginTop="29.462738301559792vh"
    prev_bar.style.position="fixed"
    prev_bar.style.marginLeft="0.78125vw"
    
    next_bar.style.height="17.33102253032929vh"
    next_bar.style.width="7.8125vw"
    next_bar.style.marginTop="29.462738301559792vh"
    next_bar.style.marginLeft="28.15625vw"
    next_bar.style.position="fixed"
    wf_display.appendChild(prev_bar)
    wf_display.appendChild(next_bar)
    
  }
 
  prev_bar.addEventListener("click",async function(){
   if(current_pointer>=1){
    current_pointer = current_pointer-1;
    if(keyarray.length > 1){
      for(const[key,value] of Object.entries(value_analysis)){
        if (keyarray[current_pointer] == key ){
          array = []
          array.push(value["workflow_id"])
          completed = (value["completed"]/value["total_tasks"])*100
          inp = (value["started"]/value["total_tasks"])*100
          not_started= (value["not-started"]/value["total_tasks"])*100
          //console.log(completed, inp, not_started)
          array.push(completed)
          array.push(inp)
          array.push(not_started)
          var div = document.createElement("div")
          div.style.float="left"
          array.push(div)
          defineEachChart(array)
        }
      }
    
    }
   }
    else current_pointer.style.color="grey"
  })
  next_bar.addEventListener("click",async function(){
    if(current_pointer<=keyarray.length-1){
      current_pointer = current_pointer+1
        for(const[key,value] of Object.entries(value_analysis)){
       
          if (keyarray[current_pointer] == key ){
            
            array = []
            array.push(value["workflow_id"])
            completed = (value["completed"]/value["total_tasks"])*100
            inp = (value["started"]/value["total_tasks"])*100
            not_started= (value["not-started"]/value["total_tasks"])*100
            //console.log(completed, inp, not_started)
            array.push(completed)
            array.push(inp)
            array.push(not_started)
            var div = document.createElement("div")
            div.style.float="left"
            array.push(div)
            defineEachChart(array)
          }
        }
    }
    else
    current_pointer.style.color="grey"
  })

  
  if(keyarray.length>=1){
    current_pointer+=1
  for (const [key, value] of Object.entries(value_analysis)) {
    array = []
    array.push(value["workflow_id"])
    completed = (value["completed"]/value["total_tasks"])*100
    inp = (value["started"]/value["total_tasks"])*100
    not_started= (value["not-started"]/value["total_tasks"])*100
    //console.log(completed, inp, not_started)
    array.push(completed)
    array.push(inp)
    array.push(not_started)
    var div = document.createElement("div")
    div.style.float="left"
    array.push(div)
    defineEachChart(array)
    break
    //wf_display.appendChild(div)
  }
}
 }
 else{
  var myDiv = document.getElementById("wf_display")
  myDiv.style.backgroundColor="white"
  myDiv.style.width="60vw"
  myDiv.style.height="55vh"
  var error_msg = document.createElement("p")
  var heading=document.createElement("p")
  heading.innerText="Case Insights"
  heading.style.marginLeft="20vw"
  heading.style.fontWeight="600"
  heading.style.fontSize="20px"
  heading.style.marginBottom="3vh"
  heading.style.fontFamily="'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
  error_msg.innerText="Sorry you have not been assigned to any case!"
  error_msg.style.color="grey"
  error_msg.style.marginLeft="10vw"
  error_msg.style.alignItems="center"
  error_msg.style.fontSize="15px"
  error_msg.style.marginTop="4vh"
  myDiv.appendChild(heading)
  myDiv.appendChild(error_msg)
 }



 
}

const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const formattedToday = dd + '/' + mm + '/' + yyyy;
showSpinner()
var dateObj = {"username":username,"date":formattedToday}
var json_date = JSON.stringify(dateObj)
const options_date = {
    method: 'POST',
    body: json_date ,
    headers: {
        'Content-Type': 'application/json', 
    }}
const response_appt = await fetch(
      'https://lawflow-3c5b7.uc.r.appspot.com/Appointments/getApptDate', options_date);

const weekday = ["Sun","Mon","Tue","Wed","Thurs","Fri","Sat"];
const d = new Date();
let day = weekday[d.getDay()];
let dayss = d.getDate()
var appt_display = document.getElementById("appt_display")
if(response_appt.status == 500){
  var para = document.createElement("p")
  para.innerText="No meetings have been created!"
  para.style.fontSize="15px"
  para.style.color="grey"
  para.style.fontFamily="'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
  appt_display.appendChild(para)
}

if(response_appt.status==200){
  closeSpinner()
  var val = await response_appt.json()
  //console.log(val)

  if(val.length==0){
    var para = document.createElement("p")
    para.innerText="No meetings scheduled for today"
    para.style.fontSize="15px"
    para.style.color="grey"
    para.style.fontFamily="'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
    appt_display.appendChild(para)
  }
  
  for(var i=0; i<val.length; i++){
    var mainDiv = document.createElement("div")
    mainDiv.style.marginBottom="2vh"
    var div = document.createElement("div")
    var dates = document.createElement("div")
    var dayweek = document.createElement("p")
    var dateNumber = document.createElement("p")
    dayweek.innerText = day
    dayweek.style.fontSize="17px"
    dayweek.style.textAlign="center"
    dayweek.style.marginTop="1vh"
    dayweek.style.fontWeight="560"
    dateNumber.innerText=dayss
    dateNumber.style.marginLeft="1.7vw"
    dateNumber.style.marginTop="-0.25vh"
    dates.appendChild(dayweek)
    dates.appendChild(dateNumber)
    dates.style.padding="3px"
    dates.style.paddingLeft="0.3vw"
    dates.style.backgroundColor="lightgrey"
    dates.style.height="10.5vh"
    dates.style.width="3.9vw"
    dates.style.marginTop="-10.55vh"
    dates.style.marginBottom="2.25vh"
    dates.style.marginLeft="0.6vw"
    
    var nameapt = document.createElement("p")
    nameapt.innerText = val[i].name
    nameapt.style.fontSize="17px"
    nameapt.style.fontWeight="600"
    var desc = document.createElement("p")
    desc.innerText = `${val[i].desc}`
    var starttime = document.createElement("p")
    starttime.innerText = `${val[i].sTime}`
    //starttime.style.marginTop="-10px"
    var endTime = document.createElement("p")
    starttime.innerText += " - "+ val[i].eTime
    var pcpts =  document.createElement("p")
    starttime.style.fontSize="10px"
    pcpts.innerText = ` ${val[i].Pcpt.split(",").join("\n")}`
    div.style.fontSize="12px"
    mainDiv.style.boxShadow="1px 1px 1px 1px grey"
    div.style.fontFamily="'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
    div.style.height="auto"
    div.style.padding="1vh"
    desc.style.marginTop="-1.5vh"
    pcpts.style.marginTop="-1.5vh"
    mainDiv.style.border="1px solid lightgrey"
    mainDiv.style.borderRadius="5px"
    mainDiv.style.height="auto"
    div.style.borderRadius="5px"
    
    div.style.marginLeft="5.208333333333333vw"
    dates.style.fontSize="13px"
    div.appendChild(dates)
    div.appendChild(nameapt)
    div.appendChild(desc)
    div.appendChild(pcpts)
    dates.appendChild(starttime)
    mainDiv.appendChild(div)
    mainDiv.appendChild(dates)
    appt_display.appendChild(mainDiv)



  }
  
}

showSpinner()
var imgObj = {"username":username}
var json_notif = JSON.stringify(imgObj)
const options_img = {
    method: 'POST',
    body: json_notif ,
    headers: {
        'Content-Type': 'application/json', 
    }}
const response_img = await fetch(
      'https://lawflow-3c5b7.uc.r.appspot.com/login/getProfileImage', options_img);

if(response_img.status == 200){
  closeSpinner()
  var value = await response_img.json()
  var url = value["Signed_url"]
  var img = document.createElement("img");
    img.src = url;
    img.style.height="20vh"
    img.style.width="10vw"
    img.style.borderRadius="100px"
   
  document.getElementById("pfp").appendChild(img)
}

showSpinner()
var NotifObj = {"username":username}
var json_notification = JSON.stringify(NotifObj)
const options_notifications = {
    method: 'POST',
    body: json_notification ,
    headers: {
        'Content-Type': 'application/json', 
    }}
const response_notif_obj = await fetch(
      'https://lawflow-3c5b7.uc.r.appspot.com/notifications/getNotifications', options_notifications);

if(response_notif_obj.status == 200){
  closeSpinner()
  var value_notifications = await response_notif_obj.json()
  
  var notifs = value_notifications
  var length_of_notifs = value_notifications.length
  var notification_display = document.getElementById("notification_display")
  const todaysDate = yyyy +"-"+mm+"-"+dd
  console.log(`Todays date is ${todaysDate}`)
  var depDate = moment(todaysDate);

  console.log(nbDays)
  if(length_of_notifs >= 1){
  for(var i=0;i<length_of_notifs;i++){
    var arrDate = moment(notifs[i]["time"]);
    var nbDays = depDate.diff(arrDate, 'days');
    var hr = document.createElement('hr');
    console.log(notifs[i]["notification"])
    var main_notif_div = document.createElement("div")
    main_notif_div.style.height="10vh"
    main_notif_div.style.width="24vw"
    main_notif_div.style.paddingLeft="1vw"
    main_notif_div.style.marginBottom="1vh"
    var notification = document.createElement("p")
    var notification_parent_div = document.createElement("div")
    notification_parent_div.style.height="10vh"
    notification_parent_div.style.width="13vw"
    var time = document.createElement("p")
    
    if(nbDays>=1){
    time.innerText=`${nbDays} Day(s) Ago`
    }
    else 
    time.innerText="Today"
    hr.style.marginTop="6.024096385542169vh"
    time.style.fontSize="10px"
    time.style.marginLeft="15.5vw"
    time.style.marginTop="-10vh"
    notification.innerText = notifs[i]["notification"]
    notification.style.fontSize = "13px"
    notification.style.fontFamily="'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
    notification_parent_div.appendChild(notification)
    main_notif_div.appendChild(notification_parent_div)
    main_notif_div.appendChild(time)
    main_notif_div.appendChild(hr)

    notification_display.appendChild(main_notif_div)
    
  }
}
else{
  var no_notifications = document.createElement("p")
    no_notifications.innerText="No notifications for now!"
    no_notifications.style.fontSize="15px"
    no_notifications.style.fontWeight="'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
    no_notifications.style.color="White"
    no_notifications.style.marginLeft="5vw"
    notification_display.appendChild(no_notifications)

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
      console.log(radiobox);
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

