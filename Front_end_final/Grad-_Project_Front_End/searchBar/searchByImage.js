const Swal = require('sweetalert2')
var pdf = 0;

var username = localStorage.getItem("username")
document.getElementById("heading_main").innerText=`Hello, ${username}`


document.getElementById("showCAT").style.display = "none";
function alertser(titleInfo){
  const { value: text } =
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: titleInfo,
      footer: '<a href="">Why do I have this issue?</a>'
    })

};

function showSpinner(){
  var coverspin = document.getElementById('cover-spin')
  coverspin.style.display = 'block';
}
function closeSpinner(){
  document.getElementById('cover-spin').style.display = 'none';
}


var link1 = 'https://lawflowsearch.herokuapp.com/search/searchByImage';;
var back_button = document.getElementById("chevron")
back_button.onclick= async function(){
    window.history.back()
   
}
var categories =["Others","Business","Born"]
const date = new Date();
var file_id=""

var today = new Date()
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
const date_format = year+"_"+month+"_"+day
console.log(date_format)
const time = today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
const total_time = date_format+"_"+time
console.log(total_time)

var imagePath = "";
var filenameImage = "";
//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions
var selector = document.querySelector("#browse")
selector.onclick = ()=>{
  input.click(); //if user click on the button then the input also clicked
}

input.addEventListener("change", function(){
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(); //calling function
});


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";

});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); 
  file = event.dataTransfer.files[0];
  imagePath = file.path;
  console.log(file.path)
  showFile(); //calling function

});

function showFile(){
  let inputElem = document.getElementById("file");    
  let filename = inputElem.files[0];
  let fileType = file.type;
  let imgTag = ""
  let validExtensions = ["image/jpeg", "image/jpg", "image/png", "application/pdf"]; 
  if(validExtensions.includes(fileType)){ 
    let fileReader = new FileReader(); 
    fileReader.onload = ()=>{
      let inputElem = document.getElementById("drag-area");    
      let fileURL = fileReader.result; 
      if(pdf == 0){
      imgTag = `<img src="${fileURL}" alt="../assets/pdf.png">`; 
      }
      else 
      {
      imgTag = `<img src="../assets/pdf.png" style="height:100px; width:100px"> ${filename.name}`;
    
      }
      dropArea.innerHTML = imgTag; 
    }
    fileReader.readAsDataURL(file);
  }else{
  
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}

document.getElementById("file").addEventListener("change",async () => {
  let inputElem = document.getElementById("file");    
  let filename = inputElem.files[0];
  document.getElementById("drag-area").src = filename.path;
  imagePath = filename;
  console.log(filename.path)
});

document.getElementById("drag-area").addEventListener("change",async()=>{
  var hidden = document.getElementById("chooseimg");
  var hidden_submit = document.getElementById("nextpg")
  hidden_submit.style.display="block";
  hidden.style.display="block";
 

})

document.getElementById("chooseimg").addEventListener("click",async()=>{
  window.location.reload();
})


//------------------------------------------------------------------------------------------------------------------------------

var display_categories = document.getElementById("workflow_display")
var show_categories = document.getElementById("show_cat_display")



document.getElementById("nextpg").addEventListener("click",async()=>{
  
  var folder2 = "searchImage-";
  var fileName2 = folder2 + total_time + imagePath.name
  let formData2 = new FormData();
  formData2.append('file', imagePath,fileName2);
  showSpinner()
  const searchFolder = await fetch("https://upload-to-bucket.onrender.com/upload-file-to-cloud-storage",{
      method:'POST',
      body: formData2,
  });
  const data2 = await searchFolder.text();        //The public url will be displyed for file uploaded to search image folder
  console.log(data2); 
  // Now we try to search if that image already exists by calling the search by image api
  var object_searchImageAPI ={
      "username":username,
      "filename":total_time+imagePath.name,
      "forwhat":"1" //0 or 1 , 1 is for searching by image, 0 is for checking for duplictes
  }
  let response_fromImageAPI = "";
  var value = ""
  console.log(pdf);
  if(searchFolder.status==200){
    setTimeout(async () => {
        response_fromImageAPI= await fetch('https://lawflowsearch.herokuapp.com/search/searchByImage',{
        method:'POST',
        body:JSON.stringify(object_searchImageAPI),
        headers: {
            'Content-Type': 'application/json', 
          }
      });
      closeSpinner();
      value = await response_fromImageAPI.json();
      console.log(value);
      if(value.length == 0){
        show_categories.style.margin = "auto";
        show_categories.style.width = "100%";
        show_categories.style.padding = "18vh";
        show_categories.style.color = "grey";
        show_categories.style.fontSize = "18px";
        show_categories.style.marginLeft = "1vw";
        show_categories.innerHTML = "No results found..";
      }else{
      for(let i = 0;i<value[1].length;i++){
         var div1 = document.createElement("div");
         div1.className = "boxshadowforcategory";
         //icon.innerHTML = value[1][i]
         div1.onclick = ()=>{
          window.open(value[2][i], '_blank').focus()
        }
        // icon.style.position = "absolute";
        // icon.style.marginLeft = "50px";
         div1.innerHTML="<img src=\"../assets/picSmall.png\"><span style = \"position:absoluge;margin-left:2vw\">"+value[1][i]+"</span>";
         div1.style.cursor = "pointer";
  
         show_categories.appendChild(div1);
      }
    }
      document.getElementById("showCAT").style.display = "block";
    }
,5000
);  }})