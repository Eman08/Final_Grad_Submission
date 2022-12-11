// //var back_button = document.getElementById("chevron")
// back_button.onclick= async function(){
//     window.history.back()
   
// }

import { CaseID } from './cases2.js'
//var CaseID = localStorage.getItem("CaseID")
console.log(`case id from search ${CaseID}`)
const date = new Date();
var today = new Date()
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
const date_format = year+"_"+month+"_"+day
//console.log(date_format)
const time = today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
const total_time =date_format+" "+time
//console.log(total_time)

var gsUtilURL = ""
var text = ""
var array = []

var fileName=""
let imgTag = ""
let fileURL=""
var imagePath = "";
var filenameImage = "";
var uploaded_image;
const butDis = document.getElementById(browse)
const ele = document.getElementById("imageShow")
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
  showFile(); //calling function

});

function showFile(){
  let fileType = file.type;
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; 
  if(validExtensions.includes(fileType)){ 
    let fileReader = new FileReader(); 
    fileReader.onload = ()=>{
      let inputElem = document.getElementById("drag-area");    
      fileURL = fileReader.result; 
      //console.log(fileURL)
      imgTag = `<img src="${fileURL}" alt="image">`; 
      ele.innerHTML = imgTag
      //dropArea.innerHTML = imgTag; 
      //butDis.style.display="hidden"
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
  //console.log(filename.name)
  filenameImage = filename.name

});

document.getElementById("drag-area").addEventListener("change",async()=>{
  var hidden = document.getElementById("chooseimg");
  var hidden_submit = document.getElementById("nextpg")
  hidden_submit.style.display="block";
  hidden.style.display="block";
 

})

document.getElementById("chooseimg").addEventListener("click",async()=>{
  ele.innerHTML=""
  butDis.style.display="block"
  
})

document.getElementById("nextpg").addEventListener("click",async()=>{
  var folder = "GeneralDocs-";
  var fileName = folder + total_time + filenameImage
  var path = total_time + filenameImage
  let formData = new FormData()
  gsUtilURL = `gs://lawflow/GeneralDocs/${path}`

  formData.append('file', imagePath,fileName);
  // console.log(formData)

  var obj1 ={
    "name":filenameImage,
    "time":total_time
  }

  var obj = JSON.stringify(obj1)

  const response = await fetch("https://upload-to-bucket.onrender.com/upload-file-to-cloud-storage",{
          method:'POST',
          body: formData,
        });
        const data = await response.text();
        //console.log(data);  


  //console.log(obj)

  
})




async function uploadFiles(){

  const docArea = document.getElementById("uploadedDocuments")

  const selectedDocument = document.getElementById('fileSelect');

  const uploadButton = document.getElementById("nextpg")
  uploadButton.addEventListener("click", () => {

      const fileBox = document.createElement("div");
      const del = document.createElement("img");
      del.src = '../assets/del.png';

      del.style.display="inline-block"
      del.style.float="right"
      del.style.width="12px"
      del.style.height="12px"
      del.style.position="relative"
      del.style.top="45%"

      fileBox.style.textAlign="left"
      fileBox.style.boxSizing="border-box"
      fileBox.style.position="relative" 
      fileBox.style.margin="15px 15px 15px 15px"
      fileBox.style.border="thin solid #a9a9a9"
      fileBox.style.backgroundColor="white"
      fileBox.style.color="black"
      fileBox.style.borderRadius="5px"
      fileBox.style.display="block"
      fileBox.style.whiteSpace="normal"
      fileBox.style.overflowWrap="breakWord"
      fileBox.style.padding="10px"
      fileBox.style.boxShadow="1px 1px 1px 1px grey"
      fileBox.style.height="10vh"

      const imgholder = document.createElement("div")
      const image = document.createElement("img")
      const imageText = document.createElement("p")
      const imagePath = document.createElement("p")

      imgholder.style.float="left";
      imgholder.style.border="2px"
      imgholder.style.borderStyle="dashed"
      imgholder.style.borderColor="grey"
      imgholder.style.height="6.5vh";
      imgholder.style.width="3.7vw";

      imageText.style.color="grey"
      imageText.style.position="absolute"
      imageText.style.margin="0"
      imageText.style.marginLeft="14vw"
      imageText.style.top="45%"
      imageText.style.fontWeight="500"
      imageText.style.width="auto"
      imageText.style.textAlign="left"

      imagePath.style.color="black"
      imagePath.style.position="absolute"
      imagePath.style.marginTop="2vh"
      imagePath.style.margin="0"
      imagePath.style.top="45%"
      imagePath.style.marginLeft="5vw"
      imagePath.style.fontWeight="500"
      imagePath.style.overflowWrap="break-word"
      imagePath.style.width="10vw"

      text = selectedDocument.options[selectedDocument.selectedIndex].text;

      console.log(CaseID) //Check if global variable is initialized from cases2.js

      let m = new Map([["case_id", CaseID], 
      ["file_name", filenameImage],
      ["time_created", total_time], 
      ["file_type", text], 
      ["gsutil", gsUtilURL]])

      array.push(m)
  
      imageText.innerHTML=text;
      imagePath.innerHTML=filenameImage

      //image.innerHTML=imgTag;

      image.src=fileURL

      image.style.height="6.5vh"
      image.style.width="3.7vw"
      
      //imgholder.innerHTML=imgTag;
      imgholder.appendChild(image)

      //imgholder.appendChild(image)
      fileBox.appendChild(imagePath)
      fileBox.appendChild(imageText)
      fileBox.appendChild(imgholder)
      fileBox.appendChild(del)
      docArea.appendChild(fileBox)
      
      fileBox.addEventListener("mouseover", () => {
          fileBox.style.borderColor = "red";
          fileBox.style.borderWidth="2px"
          del.src='../assets/delRed.png'

          })
      fileBox.addEventListener("mouseout", () => {
          fileBox.style.borderColor = "grey";
          del.src='../assets/del.png'
          })

      fileBox.addEventListener("click", () => {
          fileBox.style.display="none";
          var addBack = document.createElement("option");
          addBack.text = text;
          selectedDocument.add(addBack)
          var compare = text
          for (var i=0; i<array.length; i++){
            for(const[key,value] of array[i]){
              if (key=="file_type"){
                if(compare==value){
                  array.pop(i)
                  console.log("popped" + value)
                }
              }
            }
          }
      
          })
      selectedDocument.remove(selectedDocument.selectedIndex)
  }) 
}


async function FinalSubmit(){

  console.log(array)

  for(var i=0; i<array.length; i++){

      //console.log(array[i].get("file_type"))

      var obj = {"case_id":array[i].get("case_id"),"file_name":array[i].get("file_name"),"time_created":array[i].get("time_created"),"file_type":array[i].get("file_type"),"gsutil":array[i].get("gsutil")}     
      
      console.log(obj)

      var json = JSON.stringify(obj);
      const options1 = {
          method: 'POST',
          body: json,
          headers: {
              'Content-Type':'application/json',
        }
    };
      
    const response1 = await fetch(
        'https://lawflow-3c5b7.uc.r.appspot.com/addDocs/addDocument', options1);
    
    if (response1.status==200){
        var val = await response1.json();
        console.log(response1.status)
        console.log("Added all files to database")
    }

}

}




uploadFiles();

const submitAllDocs = document.getElementById("finalSubmit")
submitAllDocs.addEventListener("click", () => {
  FinalSubmit();
})