const { FILE } = require("dns");
const { fileURLToPath } = require("url");
import {notification_for_app} from '../notifications/notification.js'
notification_for_app()
// import {notification_for_app} from '../notifications/notification.js'
// notification_for_app()
var CaseID = localStorage.getItem("ExistCase");
var body = document.getElementById("cases");
var case_id1=""
localStorage.removeItem("ExistCase")
localStorage.removeItem("ExistCaseName")
function showSpinner(){
    document.getElementById('cover-spin').style.display = 'block';
  }
  function closeSpinner(){
    document.getElementById('cover-spin').style.display = 'none';
  }
var ExistCase = ""
var ExistCaseName = ""
var username = localStorage.getItem("username")
document.getElementById("heading_main").innerText=`Hello, ${username}`
document.getElementById("closeFSclient").addEventListener('click',async()=>{
    document.getElementById("client_details").style.visibility="hidden"
    document.getElementById("full").style.visibility="hidden"

})

var client_details = document.getElementById("view_clients")
client_details.addEventListener('click',async()=>{
    showSpinner();
    console.log(`THIS IS THE CASE ID ${case_id1}`)
    document.getElementById("full").style.visibility="visible"
    document.getElementById("client_details").style.visibility="visible"
    var obj = {"case_id":case_id1} //Has to chnage 
            var json = JSON.stringify(obj)

            const options = {
                method : 'POST',
                body: json,
                headers:{
                    'Content-Type': 'application/json',
                }
            }

            const response = await fetch(
                'https://lawflow-3c5b7.uc.r.appspot.com/case/getClients', options);
   
if(response.status==200)
{
    closeSpinner();
    var val = await response.json()
    document.getElementById("clientname_1").value = val["Client_Name"]
    document.getElementById("dob_1").value = val["Client_dob"]
    document.getElementById("phone_1").value = val["Client_PhoneNumber"]
    document.getElementById("email_1").value = val["Client_Email"]
    document.getElementById("address_1").value = val["Client_Address"]
}
closeSpinner();
})


function viewCaseDetail(id, value) {

    const parent = document.getElementById("viewCase")

    console.log("Success")

    const users = document.createElement("img");
    users.src = '../assets/users.png';
    const dateimg = document.createElement("img");
    dateimg.src = '../assets/cal.png';
    const creator = document.createElement("img");
    creator.src = '../assets/creator.png';

    dateimg.style.position="absolute"
    dateimg.style.marginTop="110px"
    dateimg.style.marginLeft="40px"

    users.style.position="absolute"
    users.style.marginTop="145px"
    users.style.marginLeft="40px"

    creator.style.position="absolute"
    creator.style.marginTop="177px"
    creator.style.marginLeft="40px"
    creator.style.width="30px"
    creator.style.height="auto"


    const viewBox = document.createElement("div");
    const key = document.createElement("p");
    const val = document.createElement("p");
    const workflow_button = document.createElement("button")
    const IDKey = document.createElement("p")
    const NameKey = document.createElement("p")
    const dateCreatedKey = document.createElement("p")
    const assgnLawyersKey = document.createElement("p")
    const createdByKey = document.createElement("p")
    const descriptionKey = document.createElement("p");

    const idVal = document.createElement("p")
    const nameVal = document.createElement("p")
    const dateCreatedVal = document.createElement("p")
    const assgnLawyersVal = document.createElement("p")
    const createdByVal = document.createElement("p")
    const descriptionVal = document.createElement("p");

    var name = (value.CaseName);
    var assgnLawyers = (value.assignedLawyers);
    var createdBy = (value.Createdby);
    var description = (value.description);
    

    NameKey.innerHTML= "Case Name"
    nameVal.innerHTML = name

    nameVal.style.position="absolute"
    nameVal.style.justifyContent="left"
    nameVal.style.paddingLeft="4%"
    nameVal.style.fontWeight="bold"
    nameVal.style.fontSize="35px"
    
    workflow_button.style.backgroundColor="white"
    workflow_button.innerText="View Case Progress"
    workflow_button.style.height="6vh"
    workflow_button.style.border="none"
    workflow_button.style.borderRadius="5px"
    workflow_button.style.fontSize="12px"
    workflow_button.style.width="10vw"
    workflow_button.style.position="absolute"
    workflow_button.style.zIndex="1"
    workflow_button.style.marginLeft="30vw"
    workflow_button.style.fontFamily="'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; "
    workflow_button.style.marginTop="-5vh"

    workflow_button.addEventListener(('click'),e=>{
        window.location.href='../workflow/workflow.html'
    })
    workflow_button.addEventListener(("mouseover"),(e)=>{
       workflow_button.style.backgroundColor="#C1B189"
       workflow_button.style.cursor="pointer"
    })
    workflow_button.addEventListener(("mouseout"),(e)=>{
        workflow_button.style.backgroundColor="white"
        workflow_button.style.cursor="auto"
    })

    dateCreatedKey.innerHTML = "Date Created"
    dateCreatedVal.innerHTML = "16/11/2022"
    assgnLawyersKey.innerHTML = "Assigned Lawyers"
    assgnLawyersVal.innerHTML = assgnLawyers
    createdByKey.innerHTML = "Created By"
    createdByVal.innerHTML = createdBy
    descriptionKey.innerHTML = "Case Description"
    descriptionVal.innerHTML = description

    descriptionVal.style.position="absolute"
    descriptionVal.style.color="black"
    descriptionVal.style.marginLeft="25px"
    descriptionVal.style.paddingRight="20px"

    descriptionVal.style.marginTop="5px"
    descriptionVal.style.fontWeight="light"
    descriptionVal.style.zIndex="1"
    descriptionVal.style.fontSize="14px"


    val.style.position="absolute"
    val.style.fontSize="15px";
    val.style.whiteSpace="in-line"
    val.style.color="white"
    val.style.fontWeight="light"
    val.style.marginLeft="100px"
    val.style.marginTop="12%"

    
    key.appendChild(IDKey)
    key.appendChild(NameKey)
    key.appendChild(dateCreatedKey)
    key.appendChild(assgnLawyersKey)
    key.appendChild(createdByKey)
    key.appendChild(descriptionKey)
    
    
    val.appendChild(idVal)
    //val.appendChild(nameVal)
    val.appendChild(dateCreatedVal)
    val.appendChild(assgnLawyersVal)
    val.appendChild(createdByVal)
    //val.appendChild(workflow_button)
    //val.appendChild(descriptionVal)

    //viewBox.appendChild(key)
    viewBox.appendChild(val)
    viewBox.appendChild(nameVal)
    viewBox.appendChild(users)
    viewBox.appendChild(dateimg)
    viewBox.appendChild(creator)

    const summary = document.getElementById("summary")
    const sum = document.createElement("div")
    //fix overflow of text 

    sum.appendChild(descriptionVal)
    summary.appendChild(sum)
    viewCase.appendChild(viewBox)


    body.addEventListener('click',function(){
        viewBox.style.content="";
        viewBox.style.display="none";
        sum.style.content="";
        sum.style.display="none"
    })

  }

  async function getCaseById(id){
    showSpinner();
    var obj = {"caseID":id}
    var json = JSON.stringify(obj);
    const options = {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type':'application/json',
        }
    };

    const response = await fetch(
        'https://lawflow-3c5b7.uc.r.appspot.com/case/getCaseById', options);
        
    if (response.status==200){
        closeSpinner();
        var value = await response.json();
        viewCaseDetail(id, value);
    }
}



async function CSSproperties(value) {

    console.log(value)

    const AllCases = document.getElementById("AllCases")
    for (var i=0;i<value["cases"].length;i++){

        const box = document.createElement("div");
        //box.style.value= String (value["cases"][i].case_id);
        box.value= String (value["cases"][i].case_name);
        box.id=String (value["cases"][i].case_id);
        const img = document.createElement("img");
        const key = document.createElement("p");
        const val = document.createElement("p");
        img.src = '../assets/gavelBlue.png';


        box.style.height="23%"
        box.style.width="90%"
        box.style.borderRadius="5px"
        box.style.margin="auto"
        box.style.marginTop="20px"
        box.style.marginBottom="5px"
        box.style.content=""
        //box.style.boxShadow="1px 1px 1px 1px grey"
        //box.style.boxShadow="inset 0 0 3000px rgba(255,255,255,0.9)"
        box.style.border="thin solid #a9a9a9"
        box.style.backgroundColor="white"
        box.style.verticalAlign="basline"
        box.style.cursor="pointer"
        img.style.position="absolute"
        img.style.marginTop="50px"
        img.style.marginLeft="15px"
        box.style.textAlign="left"
        


        box.addEventListener("mouseover", (event) => {
            box.style.border="2px solid #a9a9a9"
            //box.style.boxShadow="1px 1px 1px 1px grey"
        }, false);

        box.addEventListener("mouseout", (event) => {
            box.style.border="thin solid #a9a9a9"
            box.style.boxShadow="0px 0px 0px 0px grey"

        }, false);


        var id = (value["cases"][i].case_id);
        var name = (value["cases"][i].case_name);
        var dateCreated = (value["cases"][i].date);


        const IDKey = document.createElement("p")
        const NameKey = document.createElement("p")
        const dateCreatedKey = document.createElement("p")

        const idVal = document.createElement("p")
        const nameVal = document.createElement("p")
        const dateCreatedVal = document.createElement("p")


        IDKey.innerHTML = "Case ID"
        idVal.innerHTML = id
        NameKey.innerHTML="Case Name"
        nameVal.innerHTML = name
        dateCreatedKey.innerHTML = "Date Created"
        dateCreatedVal.innerHTML = dateCreated

        key.style.position="absolute"
        key.style.fontSize="12px";
        key.style.whiteSpace="in-line"
        key.style.color="#4B4A48"
        key.style.fontWeight="Bold"
        key.style.paddingLeft="15%"
        key.style.paddingTop="2px"

        val.style.position="absolute"
        val.style.fontSize="12px";
        val.style.whiteSpace="in-line"
        val.style.color="black"
        val.style.fontWeight="light"
        val.style.paddingLeft="50%"
        val.style.marginBottom="40%"

        key.appendChild(IDKey)
        key.appendChild(NameKey)
        key.appendChild(dateCreatedKey)

        val.appendChild(idVal)
        val.appendChild(nameVal)
        val.appendChild(dateCreatedVal)

        AllCases.appendChild(box);
        box.appendChild(img);
        box.appendChild(key);
        box.appendChild(val);

        

        box.addEventListener('click',function(){

            var casename = box.value
            var caseid = box.id
            console.log(casename)
            console.log(caseid)
            case_id1 = caseid
            ExistCase=caseid
            ExistCaseName=casename
            console.log(ExistCase)
            localStorage.setItem("ExistCase",ExistCase )
            localStorage.setItem("ExistCaseName",ExistCaseName )
            getCaseById(caseid)
            localStorage.removeItem("case_id")
            localStorage.setItem("case_id",caseid)
            setTimeout(console.log(localStorage.getItem("case_id")),30)
            
        })



        



        
    }
}

body.onload = async function getAllCases(){
    showSpinner();
     var obj = {"username":username}
     var json = JSON.stringify(obj);
     const options = {
         method: 'POST',
         body: json,
         headers: {
             'Content-Type':'application/json',
        }
    };

    const response = await fetch(
        'https://lawflow-3c5b7.uc.r.appspot.com/case/getAllLawyerCases', options);
        
    if (response.status==200){
        closeSpinner();
        var value = await response.json();

        CSSproperties(value);
        filterCases();
    }


}

async function sendAPICase(caseType){

    console.log("i called caseType")
    showSpinner();
    var obj = {"username":"AbeeraAmir", "caseType":caseType}
     var json = JSON.stringify(obj);
     const options = {
         method: 'POST',
         body: json,
         headers: {
             'Content-Type':'application/json',
        }
    };

    const response = await fetch(
        'https://lawflow-3c5b7.uc.r.appspot.com/filter/getCaseByCaseType', options);
        
    if (response.status==200){
        closeSpinner();
        var value = await response.json();
        console.log(value)

        const ele = document.getElementById("AllCases")
        ele.innerHTML=""

        CSSproperties(value);
        filterCases();
    }

}

async function sendAPICourt(courtType){

    console.log("i called Court")
    showSpinner();
    var obj = {"username":"AbeeraAmir", "courtType":courtType}
     var json = JSON.stringify(obj);
     const options = {
         method: 'POST',
         body: json,
         headers: {
             'Content-Type':'application/json',
        }
    };

    const response = await fetch(
        'https://lawflow-3c5b7.uc.r.appspot.com/filter/getCaseByCourtType', options);
        
    if (response.status==200){
        closeSpinner();
        var value = await response.json();
        console.log(value)

        const ele = document.getElementById("AllCases")
        ele.innerHTML=""

        CSSproperties(value);
    }

}

async function sendAPIDate(date){
    console.log("i called Date")

    var obj = {"username":"AbeeraAmir", "date":date}
     var json = JSON.stringify(obj);
     const options = {
         method: 'POST',
         body: json,
         headers: {
             'Content-Type':'application/json',
        }
    };

    const response = await fetch(
        'https://lawflow-3c5b7.uc.r.appspot.com/filter/getCaseByDate', options);
        
    if (response.status==200){
        var value = await response.json();
        console.log(value)

        const ele = document.getElementById("AllCases")
        ele.innerHTML=""

        CSSproperties(value);
    }

}

async function displayFilter(word){

    if (word!="All"){

    const fil = document.createElement("div")
    const holder = document.getElementById("casesFS")

    fil.style.fontWeight='400'
    fil.style.borderRadius="20vh";
    fil.style.border="1px solid grey";
    fil.style.color="grey"
    fil.style.marginTop="5vh;"
    fil.style.fontSize="12px"
    fil.style.float="left"
    fil.style.width="auto"
    fil.style.height = "3.5vh";
    fil.style.backgroundColor = "white";
    fil.style.padding="1vh 1vw 0.5vh 1vw";
    fil.style.cursor="pointer"

    fil.innerHTML=word

    holder.appendChild(fil)

    fil.addEventListener('click',function(){
        holder.removeChild(fil)
        getAllCases()
    })

    
    fil.addEventListener('mouseover',function(){
        fil.style.border="2px solid grey";

    })

    fil.addEventListener('mouseout',function(){
        fil.style.border="1px solid grey";

    })

    

    

    }

}


async function filterCases(){

    const targetDiv1 = document.getElementById("full")
    const targetDiv2 = document.getElementById("filterAppear")


    const filter = document.getElementById("FSbutton")
    filter.addEventListener('click',function(){
        targetDiv1.style.visibility="visible"
        targetDiv2.style.visibility="visible"

        const closeFS = document.getElementById("closeFSwindow")
        closeFS.addEventListener('mouseover',function(){  
            closeFS.src="../assets/delRed.png"

        })

        closeFS.addEventListener('mouseout',function(){  
            closeFS.src="../assets/del.png"

        })

        closeFS.addEventListener('click',function(){  
            closeFS.src="../assets/delRed.png"
            targetDiv1.style.visibility="hidden"
            targetDiv2.style.visibility="hidden"

        })


        const addFilter = document.getElementById("filterSubmit")
        addFilter.addEventListener('click',function(){            
            var val = document.querySelector("input[name=radio]:checked").value

            targetDiv1.style.visibility="hidden"
            targetDiv2.style.visibility="hidden"

            if (val == "Civil" || val == "Family" || val == "Criminal"){
                sendAPICase(val)
            }

            else if (val == "Court of Appeal" || val == "Court of First Instance" || val == "Federal Supreme Court"){
                sendAPICourt(val)
            }
            else {
                val = document.getElementById("filterDate").value
                sendAPIDate(val)
            } 

            displayFilter(val)
        })

      

})


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







