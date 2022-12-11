const { off } = require("process");
const Swal = require('sweetalert2')
const date = new Date();
// import {notification_for_app} from '../notifications/notification.js'
// notification_for_app()

var username = localStorage.getItem("username")

document.getElementById("heading_main").innerText=`Hello, ${username}`
function deleteAppointment(){
  let arrayElements = document.getElementsByClassName('delete');
for (let element of arrayElements) {
    console.log(element.getAttribute('id'));
    element.addEventListener("click", async function() {
      console.log(element.getAttribute('id'))
      var obj = {"username":username,"id":element.getAttribute('id')}; 
      var json = JSON.stringify(obj);
      let getAptUrl = new URL (`https://lawflow-3c5b7.uc.r.appspot.com/Appointments/DeleteAppointments`)
      console.log(getAptUrl)
  
      const options = {
          method : 'POST',
          body: json,
          headers:{
              'Content-Type': 'application/json',
          }
      }
  
      const response = await fetch(
          'https://lawflow-3c5b7.uc.r.appspot.com/Appointments/DeleteAppointments', options);
      if(response.status == 200){
        alertser("Appointment successfully deleted!");
        setTimeout(() => {
          location.reload();
        }, "3000");
      }
    });
}
}
function showSpinner(){
  document.getElementById('cover-spin').style.display = 'block';
}
function closeSpinner(){
  document.getElementById('cover-spin').style.display = 'none';
}
document.getElementById('cover-spin').style.display = "block";
const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";
  const x = new Date();
  const currDate = x.getDate()

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }
  for (let i = 1; i <= lastDay; i++) {
    if (
      i == new Date().getDate() &&
      date.getMonth() == new Date().getMonth()
    ){
      days += `<div class="currentday" data-date="${i}-${date.getMonth() + 1}">${i}</div>`;
      continue;
    }
    if (
      i >= new Date().getDate() &&
      date.getMonth() >= new Date().getMonth()
    ) {
      days += `<div class="green day" data-date="${i}-${date.getMonth() + 1}">${i}</div>`;
    } else {
      days += `<div class="red day" data-date="${i}-${date.getMonth() + 1}">${i}</div>`;
    }
  }
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    
  }
  monthDays.innerHTML = days;
};
function alertser(titleInfo){
  const { value: text } =
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: titleInfo,
      footer: '<a href="">Why do I have this issue?</a>'
    })

};
function servererror(){
  Swal.fire({
    title: 'Internal Error!',
    text: "There is an error with the server, please contact db admin",
    icon: 'warning',
    fontsize: "25px",
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'OK!'
});
}
document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();
var recent = "";
function removeborder(){
  if(recent != ""){
  recent.style.border = "";
  recent.style.cursor = "";
  }
}

// function currentday(){
//   var strdate = "";
//   if(new Date().getDate()<10){
//     strdate="0"+new Date().getDate()+"-";
//   }
//   else{
//     strdate = new Date().getDate()+"-";
//   }
//   if(new Date().getMonth()<10){
//     strdate+="0"+new Date().getMonth();
//   }
//   else{
//     strdate+=new Date().getMonth();
//   }
//   return strdate;
// }
const dateEls = Array.from(document.querySelectorAll('.day'));
dateEls.forEach((dateEl) => {
  dateEl.addEventListener('click', async (event) => {
    showSpinner();
    removeborder();
    recent = dateEl;
    dateEl.style.border = "0.2rem solid#283745";
    dateEl.style.cursor = "pointer";
    let i =1;
    while(true){
      var str = "event"+i;
    if(document.getElementById(str)!= null){
    document.getElementById(str)
                .parentNode.removeChild(document.getElementById(str));
    }
    else{
      break;
    }
    i++;
  }
    if(document.getElementById("freeday")!= null){
      document.getElementById("freeday")
                .parentNode.removeChild(document.getElementById("freeday"));
    }
      var clickedDate = event.currentTarget.dataset.date;
      var reformed = clickedDate.split("-");
      if(reformed[0] < 10){
        reformed[0] = "0"+reformed[0];
      }
      if(reformed[1] < 10){
        reformed[1] = "0"+reformed[1];
      }
      var apptdate = reformed[0]+"/"+reformed[1]+"/2022";
      console.log(apptdate);
      var appointments = "";
  var obj = {"username":username,"date":apptdate} //Has to chnage 
            var json = JSON.stringify(obj)
            let getAptUrl = new URL (`https://lawflow-3c5b7.uc.r.appspot.com/Appointments/getApptDate`)
            console.log(getAptUrl)

            const options = {
                method : 'POST',
                body: json,
                headers:{
                    'Content-Type': 'application/json',
                }
            }

            const response = await fetch(
                'https://lawflow-3c5b7.uc.r.appspot.com/Appointments/getApptDate', options);
            if(response.status == 200){
                  closeSpinner()
                  var color = colorCode();
                  document.getElementById('cover-spin').style.display = "none";
                  appointments = await response.json();
                  if(appointments.length == 0){
                    var noAPPT = document.createElement("h1");
                    noAPPT.setAttribute("id","freeday");
                    noAPPT.className = "display-1";
                    noAPPT.style.opacity = "25%";
                    noAPPT.style.paddingTop = "3.5vh";
                    noAPPT.innerHTML = "Wohoo! It's a free day...";
                    document.getElementById("appt").appendChild(noAPPT);
                    return false; //Display no appointment
                  }
                  console.log(appointments);
                  var end = "line h-100";
                  if(appointments.length > 5){
                    document.getElementById("scroller").style.overflowY = "scroll";
                    document.getElementById("scroller").style.height = "300px";
                  }
                  for(let i = 0; i < appointments.length; i++){
                    //console.log(appointments[i]["desc"])
                    if((i+1) == appointments.length){
                          end = "line h-100 d-none";
                    }
                    var event = "event"+(i+1);
                    var majorDIV = document.createElement("div");
                    majorDIV.setAttribute("id",event);
                    majorDIV.className = "d-flex mb-1";
                    document.getElementById("number1").appendChild(majorDIV);
                    color = colorCode();
                    //var div1 = document.getElementById(event);
                    var div2 = document.createElement("div");
                    div2.className = "d-flex flex-column pr-4 align-items-center";
                    majorDIV.appendChild(div2);
                    var div3 = document.createElement("div");
                    var div4 = document.createElement("div");
                    div3.className = "rounded-circle py-3 px-4 "+color+" text-white mb-1";
                    div3.innerHTML = i+1;
                    div2.appendChild(div3);
                    div4.className = end;
                    div2.appendChild(div4);
                    var div5 = document.createElement("div");
                    majorDIV.appendChild(div5);
                    var div6 = document.createElement("h5");
                    div6.className = "text-dark";
                    div6.innerHTML = appointments[i]["name"]+" : "+appointments[i]["desc"] ;
                    div5.appendChild(div6);
                    var div7 = document.createElement("p");
                    div7.className = "lead text-muted pb-3";
                    div7.innerHTML = appointments[i]["date"]+", startime : "+appointments[i]["sTime"]+ ", endtime : "+appointments[i]["eTime"];
                    div5.appendChild(div7);
                    var div8 = document.createElement("button");
                    div8.setAttribute('id',appointments[i]["id"]);
                    div8.setAttribute('class',"delete");
                    //console.log(div8.getAttribute('id'));
                    var div9 = document.createElement("i");
                    div9.className = "fa fa-trash-o";
                    div9.style = "font-size:24px;color:red"
                    div8.style.border = "none";
                    div8.style.size = "5px";
                    div8.style.paddingBottom = "20px";
                    div9.style.paddingBottom = "20px";
                    div8.style.backgroundColor = "#f9f6f0"
                    div9.style.backgroundColor = "#f9f6f0"
                    div9.style.size = "5px";
                    div9.src = "../assets/delRed.png";
                    div8.appendChild(div9);
                    majorDIV.append(div8);
                  };
                  deleteAppointment();
            }
            else{
              closeSpinner();
              alertser("Your account doesn't have any appointments!");
            }
            closeSpinner();
  });
});
// document.querySelector(".days").addEventListener("click", () => {
//   console.log(document.querySelector(".nextday").getAttribute('data-date'));



currentDate=date.getDate()

  var body = document.getElementById("cases");

function colorCode(){
  var array = ["bg-primary","bg-secondary","bg-warning","bg-danger","bg-info","bg-success","bg-dark"];
  var index = Math.floor(Math.random()*7);
  return array[index];
}
async function getAppointments(){
  showSpinner();
  var date = new Date();
  var day = date.getDate();
  if(day < 10){
    day = "0"+date.getDate();
  }
  var month = date.getMonth()+1;
  if(month < 10){
    month = "0"+date.getMonth();
  }
  var tdate = day+"/"+month+"/"+date.getFullYear();
  console.log(tdate);
  var appointments = "";
  var obj = {"username":username,"date":tdate} //Has to chnage 
            var json = JSON.stringify(obj)
            let getAptUrl = new URL (`https://lawflow-3c5b7.uc.r.appspot.com/Appointments/getApptDate`)
            console.log(getAptUrl)

            const options = {
                method : 'POST',
                body: json,
                headers:{
                    'Content-Type': 'application/json',
                }
            }

            const response = await fetch(
                'https://lawflow-3c5b7.uc.r.appspot.com/Appointments/getApptDate', options);
            if(response.status == 200){
                  closeSpinner();
                  var color = colorCode();
                  appointments = await response.json();
                  if(appointments.length == 0){
                    return false;
                  }
                  console.log(appointments);
                  var end = "line h-100";
                  if(appointments.length > 5){
                    document.getElementById("scroller").style.overflowY = "scroll";
                    document.getElementById("scroller").style.height = "300px";
                  }
                  for(let i = 0; i < appointments.length; i++){
                    //console.log(appointments[i]["desc"])
                    if((i+1) == appointments.length){
                          end = "line h-100 d-none";
                    }
                    var event = "event"+(i+1);
                    var majorDIV = document.createElement("div");
                    majorDIV.setAttribute("id",event);
                    majorDIV.className = "d-flex mb-1";
                    document.getElementById("number1").appendChild(majorDIV);
                    color = colorCode();
                    //var div1 = document.getElementById(event);
                    var div2 = document.createElement("div");
                    div2.className = "d-flex flex-column pr-4 align-items-center";
                    majorDIV.appendChild(div2);
                    var div3 = document.createElement("div");
                    var div4 = document.createElement("div");
                    div3.className = "rounded-circle py-3 px-4 "+color+" text-white mb-1";
                    div3.innerHTML = i+1;
                    div2.appendChild(div3);
                    div4.className = end;
                    div2.appendChild(div4);
                    var div5 = document.createElement("div");
                    majorDIV.appendChild(div5);
                    var div6 = document.createElement("h5");
                    div6.className = "text-dark";
                    div6.innerHTML = appointments[i]["name"]+" : "+appointments[i]["desc"] ;
                    div5.appendChild(div6);
                    var div7 = document.createElement("p");
                    div7.className = "lead text-muted pb-3";
                    div7.innerHTML = appointments[i]["date"]+", startime : "+appointments[i]["sTime"]+ ", endtime : "+appointments[i]["eTime"];
                    div5.appendChild(div7);
                    var div8 = document.createElement("button");
                    div8.setAttribute('id',appointments[i]["id"]);
                    div8.setAttribute('class',"delete");
                    //console.log(div8.getAttribute('id'));
                    var div9 = document.createElement("i");
                    div9.className = "fa fa-trash-o";
                    div9.style = "font-size:24px;color:red"
                    div8.style.border = "none";
                    div8.style.size = "5px";
                    div8.style.paddingBottom = "20px";
                    div9.style.paddingBottom = "20px";
                    //div9.style.paddingBottom = "20px";
                    div8.style.backgroundColor = "#f9f6f0"
                    div9.style.backgroundColor = "#f9f6f0"
                    div9.style.size = "5px";
                    div9.src = "../assets/delRed.png";
                    div8.appendChild(div9);
                    majorDIV.append(div8);
                  };
                  deleteAppointment();
            }
            else{
              closeSpinner();
              alertser("Your account doesn't have any appointments");
              var obj = {"username":username} //Has to chnage 
              var json = JSON.stringify(obj)
              let getAptUrl = new URL (`https://lawflow-3c5b7.uc.r.appspot.com/Appointments/createCollection`)
              console.log(getAptUrl)
  
              const options = {
                  method : 'POST',
                  body: json,
                  headers:{
                      'Content-Type': 'application/json',
                  }
              }
  
              const response = await fetch(
                  'https://lawflow-3c5b7.uc.r.appspot.com/Appointments/createCollection', options);
            }
            closeSpinner();
}
getAppointments();
function compareTime(startTime, endTime){
  const [hours1, minutes1] = startTime.split(':');  
  const [hours2, minutes2] = endTime.split(':');
  const date1 = new Date(new Date().getFullYear(), 0, 1, +hours1, +minutes1, 0);
  const date2 = new Date(new Date().getFullYear(), 0, 1, +hours2, +minutes2, 0);
  if(date2.getTime() < date1.getTime()){
    return false;
  }
  return true;
}
function deleteElem(){
  document.getElementById("name").value = "";
  document.getElementById("date").value = "";
  document.getElementById("stime").value = "";
  document.getElementById("etime").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("ptcp").value = "";
}
function addEvent() {
  document.getElementById("myForm").style.display = "block";
  deleteElem();
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  deleteElem();
}
function isFutureDate(idate){
  var CurrentDate = new Date();
  GivenDate = new Date(idate);
  if(GivenDate > CurrentDate){
    return true;
  }
  else{
    return false;
  }
}
async function checkTime(date, startTime, endTime){
  var obj = {"username":username, "date":date,"sTime":startTime,"etime":endTime}
            var json = JSON.stringify(obj)
            let existUrl = new URL (`https://lawflow-3c5b7.uc.r.appspot.com/Appointments/getExistingAppt`)
            console.log(existUrl)

            const options = {
                method : 'POST',
                body: json,
                headers:{
                    'Content-Type': 'application/json',
                }
            }

            const response = await fetch(
                'https://lawflow-3c5b7.uc.r.appspot.com/Appointments/getExistingAppt', options);
            if(response.status == 200){
              var result = await response.json();
              if(result == "1"){
                return false;
              }
            }
            else{
                return true;

          }
    return true;
}
async function sentEmail(name,desc,participants){
  var arr = [];
  if(participants.search(",") != -1){
      arr = participants.split(',');
  }
  else{
    arr[0] = participants.trim();
  }
  var obj = {"subject":name,"body":desc,"receiver":arr}
  var json = JSON.stringify(obj)
  let sendEmailURL = new URL (`https://lawflow-3c5b7.uc.r.appspot.com/email/sendEmail`)
  console.log(sendEmailURL);
  const options = {
      method : 'POST',
      body: json,
      headers:{
          'Content-Type': 'application/json',
      }
  }

  const response = await fetch(
      'https://lawflow-3c5b7.uc.r.appspot.com/email/sendEmail', options);
  if(response.status == 200){
          Swal.fire({
            icon: 'success',
            title: 'Email sent!',
            showConfirmButton: false,
            timer: 1500
          })
  }
  else{
    alertser("The email cannot be sent, appointment was created...");
  }
  
}
document.getElementById("createEvent").addEventListener("click",async () =>{ 

  var name = document.getElementById("name").value;   //Retrieving user input data
  var date = document.getElementById("date").value;
  var startTime = document.getElementById("stime").value;
  var endTime = document.getElementById("etime").value;
  var description = document.getElementById("desc").value;
  var participants = document.getElementById("ptcp").value;
  var CurrentDate = new Date();
  GivenDate = new Date(date);
  if(name == ""){
    closeSpinner();
    alertser("Yikes! Enter a name for the appointment");
    return false;
  }
  if(date == ""){
    closeSpinner();
    alertser("Please enter a date for the appointment");
    return false;
  }
  if(startTime == ""){
    alertser("Please enter a start time for the appointment");
    return false;
  }
  if(endTime == ""){
    alertser("Please enter a end time for the appointment");
    return false;
  }
  if(description.length < 5 || description == ""){
    alertser("Please enter a description");
    return false;
  }
  if(participants == ""){
    alertser("Please enter participants");
    return false;
  }
  if(isFutureDate(date) == false){
    if(GivenDate.setHours(0,0,0,0) == CurrentDate.setHours(0,0,0,0)){
      var cdate = new Date();
      var current_time = "";
      if(cdate.getMinutes() < 10){
        current_time = cdate.getHours()+":0"+cdate.getMinutes();
      }
      else{
        current_time = cdate.getHours()+":"+cdate.getMinutes();
      }
      if(compareTime(current_time, startTime) == false){
        alertser("The Start time is before the current time");
        return false;
      }
    }
    else{
      alertser("Please enter a future date");
       return false;
    }
  }
  if(!(compareTime(startTime,endTime))){
    alertser("End time cannot be before the start time of an appointment");
    return false;
  }
  const arr = date.split("-");
  date = arr[2]+"/"+arr[1]+"/"+arr[0];
  var getExisting = await checkTime(date, startTime, endTime);
  if(getExisting == false){
    alertser("Appointment already exists in this time period");
    deleteElem();
    return false;
  }
  showSpinner();
  var obj = {"username":username, "name":name,"desc":description,"date":date,"sTime":startTime,"eTime":endTime,"Pcpt":participants}
            var json = JSON.stringify(obj)
            let newAptUrl = new URL (`https://lawflow-3c5b7.uc.r.appspot.com/Appointments/SetAppointments`)
            console.log(newAptUrl)

            const options = {
                method : 'POST',
                body: json,
                headers:{
                    'Content-Type': 'application/json',
                }
            }

            const response = await fetch(
                'https://lawflow-3c5b7.uc.r.appspot.com/Appointments/SetAppointments', options);
              
            if(response.status == 200){
              closeSpinner();
              sentEmail(name,description,participants);
              deleteElem();
              getAppointments();
                Swal.fire({
                  icon: 'success',
                  title: 'Event created!',
                  showConfirmButton: false,
                  timer: 1500
                })
              }
              else{
                closeSpinner();
                servererror();
              }
closeSpinner();
  //document.getElementById("name").innerHTML = "";   //Retrieving user input data
});


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
