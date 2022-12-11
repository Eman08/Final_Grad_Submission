const Swal = require('sweetalert2')
var pdf = 0;
var names = []
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
var link2 = 'https://lawflowsearch.herokuapp.com/ocr/getimageCat';
function decideLink1(){
  if(pdf == 0){
      link1 = 'https://lawflowsearch.herokuapp.com/search/searchByImage';
      //link2 = 'https://lawflowsearch.herokuapp.com/ocr/getimageCat';
  }
  else{
    link1 = 'https://lawflowsearch.herokuapp.com/search/searchByPDF'; //PDF LINKS
    //link2 = 'https://lawflowsearch.herokuapp.com/ocr/getimageCat';    
  }
  return link1;
}
function decideLink2(){
  if(pdf == 0){
      //link1 = 'https://lawflowsearch.herokuapp.com/search/searchByImage';
      link2 = 'https://lawflowsearch.herokuapp.com/ocr/getimageCat';
  }
  else{
    //link1 = 'https://lawflowsearch.herokuapp.com/search/searchByImage'; //PDF LINKS
    link2 = 'https://lawflowsearch.herokuapp.com/pdf/getpdf';    
  }
  return link2;
}
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
var uploaded_image;
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
  if(file.path.split('.').pop() == "pdf"){
    pdf = 1;
  }
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
  console.log(filename.name)
  if(file.name.split('.').pop() == "pdf"){
    pdf = 1;
  }
  filenameImage = filename.name

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



document.getElementById("workflow").onload = async()=>{
  
          console.log("I reach here")
          const radioButtonsWrapElem = document.getElementById("radioButtonsWrapElem");
          
            for(var i=0;i<categories.length;i++){
              var main_category = document.createElement("div")
              var newLi = document.createElement("ul")
              var category_name = document.createElement("p");
              names[i] = document.createElement("input")
              names[i].setAttribute("type","radio")
              names[i].name ="btn"
              names[i].value=categories[i]
              var check = categories[i];
              category_name.innerText=categories[i];
              //var input = document.querySelector('input[name="btn"]:checked').value
              
      
              
              newLi.value = categories[i]
              names[i].setAttribute("id",i);
              category_name.style.fontSize="14px"

              category_name.value=check
              category_name.innerText=categories[i]
              category_name.style.float="right"
              category_name.style.position="absolute"
              category_name.style.marginLeft="3vw"
              category_name.style.marginTop="2.5vh"
              
              newLi.style.alignItems="center"
              newLi.style.justifyItems="center"    
              newLi.style.border="1px solid lightgrey"   

              newLi.style.height="7vh"
              newLi.style.accentColor="#283745";
              newLi.style.boxShadow="2px 2px lightgrey"
              newLi.style.width="26vw"
              newLi.style.borderRadius="5px"
              newLi.style.marginLeft="1vh"
              category_name.style.fontFamily="'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"

              names[i].style.borderRadius="50px"
              names[i].style.height="2.5vh"
              names[i].style.width="1vw"
              names[i].style.marginTop="2.5vh"
              //names[i].style.marginLeft="8.5vw"
              names[i].style.cursor="pointer"
              names[i].style.border="none"
              names[i].style.fontSize="1px"
              names[i].style.position="absolute"
        
              
              newLi.appendChild(names[i])
              newLi.appendChild(category_name)

              radioButtonsWrapElem.appendChild(newLi)
            //   main_category.appendChild(newLi)
            //   show_categories.appendChild(main_category)
        
              
            }
            // for(let i = 0;i<names.length;i++){
            //   names[i].addEventListener('click',(e)=>{
            //     console.log(names[i].getAttribute("name"));
            //   })   
            //  }

            const ele = document.getElementById("confirm")
              ele.addEventListener('click',(e)=>{
                var input = document.querySelector("input[name=btn]:checked").value
                console.log(input)


              })

          
          var object_to_createID = {
              "category": "Others",
              "idds": file_id,
              "caseid":"10pF3di4LJeBQXrP"
          }
          let response_fromIDAPI ="";
        //   if(response_createCat.status==200){
        //       console.log(object_to_createID)
        //       setTimeout(async () => {
        //       response_fromIDAPI = await fetch('https://lawflowsearch.herokuapp.com/ocr/pickCat',{
        //       method:'POST',
        //       body:JSON.stringify(object_to_createID),
        //       headers: {
        //           'Content-Type': 'application/json', 
        //       }
        //       })});
        //   }
          // if fetch ends
            
          }
          
