const Swal = require('sweetalert2')

import {notification_for_app} from '../notifications/notification.js'
notification_for_app()


var username = localStorage.getItem("username")
document.getElementById("heading_main").innerText=`Hello, ${username}`

function showSpinner(){
  //document.getElementById('cover-spin').style.display = 'block';
}
function closeSpinner(){
  //document.getElementById('cover-spin').style.display = 'none';
}
const ele = document.getElementById("logout")
ele.addEventListener('click', (e)=>{

  const Store = require('electron-store');
  Store.clear()
  localStorage.clear()
  window.location.href="../signup/signup.html"


})


document.querySelector(".privacy").addEventListener('click',()=>{

  Swal.fire({
            icon: 'warning',
            title: 'Page Under Construction',
            text: "Our application is still being built by our developers! Sorry for the inconvenience",
          })
})


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

