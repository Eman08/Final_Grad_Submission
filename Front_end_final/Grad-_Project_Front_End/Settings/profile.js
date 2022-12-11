var username = localStorage.getItem("username")
document.getElementById("heading_main").innerText=`Hello, ${username}`
import {notification_for_app} from '../notifications/notification.js'
notification_for_app()
function showSpinner(){
  document.getElementById('cover-spin').style.display = 'block';
}
function closeSpinner(){
  document.getElementById('cover-spin').style.display = 'none';
}
console.log(`username ${username}`)

var body = document.getElementById("cases_profile")
    showSpinner()
    var obj = {"username": username}
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
        'https://lawflow-3c5b7.uc.r.appspot.com/login/getLawyerDetails', options);
    
    
    
      
    if(response.status == 200){
        closeSpinner();
      var res = await response.json()
      console.log(res)
      var birthday = res["DOB"]
      var email = res["email"]
      var username = res["username"]
      var fname = res["FirstName"]
      var lname = res["LastName"]
    
      console.log(birthday, email, username, fname, lname)
      document.getElementById("userHeading").innerHTML=username
      document.getElementById("birthday").innerHTML=birthday
      document.getElementById("email").innerHTML = email
      document.getElementById("fname").innerHTML = fname
      document.getElementById("lname").innerHTML = lname


}

showSpinner()
var imgObj = {"username": username}
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
        console.log(url)
        
        var img = document.createElement("img");
          img.src = url;
          img.style.height="5rem"
          img.style.width="5rem"
          img.style.borderRadius="50%"
          document.getElementById("profile").appendChild(img)
       
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
