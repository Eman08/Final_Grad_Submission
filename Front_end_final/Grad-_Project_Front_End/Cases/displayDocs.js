
const Swal = require('sweetalert2')
import {notification_for_app} from '../notifications/notification.js'
notification_for_app()

var body = document.getElementById("files");


var CaseID = localStorage.getItem("ExistCase");
var CaseName = localStorage.getItem("ExistCaseName");
var username = localStorage.getItem("username")
document.getElementById("heading_main").innerText=`Hello, ${username}`


var catName = localStorage.getItem("catName");

var filename =""
var current_doc_id = ""

async function displayHeader(){

    const Main = document.getElementById("HeaderDisplay")

    const Name = document.getElementById("casename")
    const ID = document.getElementById("caseid")

    Name.innerHTML=CaseName
    ID.innerHTML=CaseID

    Main.appendChild(Name)
    Main.appendChild(ID)


}

async function Translate(current_document_id){

    var obj = {"idd":current_document_id}
    console.log(CaseID)
    var json = JSON.stringify(obj);
    const options1 = {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type':'application/json',
       }
   };

   const response1 = await fetch(
       'https://lawflow-3c5b7.uc.r.appspot.com/translate/translateDoc', options1);
       
   if (response1.status==200){
       var value = await response1.json();
    //    console.log(value[0]["url"])
    var object = {"docId":current_document_id}
    console.log(CaseID)
    var json = JSON.stringify(obj);
    const options1 = {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type':'application/json',
       }
    };
    
    const response1 = await fetch(
       'https://lawflow-3c5b7.uc.r.appspot.com/addDocs/getTranslatedDocs', options1);
       
    if (response1.status==200){
       var value = await response1.json();
    //    console.log(value[0]["url"])
    //    if(value[0]!="Error"){
    //    window.open(value[0]["url"], '_blank').focus()
    //    }
    }

}}

async function displayGENDocuments(value){

    const catPlaceholder = document.getElementById("catPlaceholder")
    catPlaceholder.innerHTML=catName

    var array = value

    const DocViewer = document.getElementById("DocViewer")
    const docSummary = document.getElementById("docSummary")

    const detailsTitle = document.createElement("p");
    const detailsType = document.createElement("p");
    const sumText = document.createElement("p");


    DocViewer.innerHTML=""

    for (var i=0; i<array.length; i++){

        

        var docName = array[i]["name"]
        var URL = array[i]["URL"]
        var time = array[i]["time"]
        //var summary = array[i]["summary"][0]
        console.log(`docnName ${docName}`)
        var ext = docName.split(".")[1];
        console.log(ext)

        const docBox = document.createElement("div");

        const fileIcon = document.createElement("img");
        fileIcon.style.height="7vh";
        fileIcon.style.width="auto"
        fileIcon.style.marginTop="1vh"



        if (ext=="pdf"){
            fileIcon.src="../assets/p1.png"
        }
        else if(ext=="docx"|| ext=="doc"){
            fileIcon.src="../assets/w1.png"
        }
        else if(ext=="jpeg"|| ext== "jpg"|| ext=="png"){
            fileIcon.src="../assets/i1.png"
        }
        

        //const docBoxTop = document.createElement("div");
        const docBoxText = document.createElement("div");

        console.log("hi")

        docBoxText.innerHTML=docName
        docBox.value=i
        docBox.style.height="12vh"
        docBox.style.width="7vw"
        // docBox.style.border="1px solid black"
        docBox.style.backgroundColor="white"
        docBox.style.display="inline-block"
        docBox.style.margin="20px 20px 20px 20px"
        docBox.style.textAlign="center"
        docBox.style.cursor="pointer"

        docBoxText.style.textAlign="center"
        docBoxText.style.marginTop="1vh"
        docBoxText.style.fontSize="13px"
        docBoxText.style.height="auto"
        docBoxText.style.width="100%"
        docBoxText.style.overflowWrap="break-word"



        docBox.addEventListener('click',function(){
            var ind = docBox.value
            //var doc_id = array[ind]["doc_id"]
            //current_doc_id = doc_id
            var doc_url = array[ind]["url"]
            var name = array[ind]["name"]
            var time = array[ind]["time"]
            var extension = name.split(".").pop();
           
            if(extension == "pdf" || extension == "PDF"){
                document.getElementById("translate").style.visibility="visible"
            }
            detailsTitle.innerHTML=name
            detailsType.innerHTML=extension+" File"
            //sumText.innerHTML=array[ind]["summary"]
            const dlt = document.getElementById("deleteFile")
            dlt.style.visibility="visible"
            const openFile = document.getElementById("openFile")
            openFile.addEventListener('click',(e)=>{
                console.log("opening file")
                console.log(doc_url)
                window.open(doc_url, '_blank').focus()
            })


            dlt.addEventListener('mouseover',function(){
                const dltIcon = document.getElementById("trash")
                dltIcon.src="../assets/trash_red.png"

            })

            dlt.addEventListener('mouseout',function(){
                const dltIcon = document.getElementById("trash")
                dltIcon.src="../assets/trash.png"

            })

            dlt.addEventListener('click',function(){
                deleteFile(value, doc_id)


            })



        })


        docBox.addEventListener('mouseover',function(){
            docBox.style.backgroundColor="#F5F5F5"

        })

        docBox.addEventListener('mouseout',function(){
            docBox.style.backgroundColor="transparent"

        })

        detailsTitle.style.color="#4B4A48"
        detailsTitle.style.fontSize="18px"
        
        detailsType.style.color="grey"
        detailsType.style.fontSize="14px"

        sumText.style.color="grey"
        sumText.style.fontSize="14px"

        // var checkbox = document.createElement('input');
        // checkbox.type="checkbox"
        // checkbox.style.marginLeft="4vw"
        // checkbox.style.position="absolute"
        // checkbox.style.visibility="hidden"




        // docSummary.appendChild(detailsTitle)
        // docSummary.appendChild(detailsType)
        docSummary.appendChild(detailsTitle)
        docSummary.appendChild(detailsType)
        docSummary.appendChild(sumText)
        // docBox.appendChild(checkbox)
        docBox.appendChild(fileIcon)
        docBox.appendChild(docBoxText);
        DocViewer.appendChild(docBox);




        




     

    }

    

}

async function displayDocuments(value){

    const catPlaceholder = document.getElementById("catPlaceholder")
    catPlaceholder.innerHTML=catName

    var array = value

    const DocViewer = document.getElementById("DocViewer")
    const docSummary = document.getElementById("docSummary")

    const detailsTitle = document.createElement("p");
    const detailsType = document.createElement("p");
    const sumText = document.createElement("p");


    DocViewer.innerHTML=""

    for (var i=0; i<array.length; i++){

        

        var docName = array[i]["doc_name"]
        var URL = array[i]["URL"]
        var summary = array[i]["summary"][0]
        console.log(`docnName ${docName}`)
        var ext = docName.split(".")[1];
        console.log(ext)

        const docBox = document.createElement("div");

        const fileIcon = document.createElement("img");
        fileIcon.style.height="7vh";
        fileIcon.style.width="auto"
        fileIcon.style.marginTop="1vh"



        if (ext=="pdf"){
            fileIcon.src="../assets/p1.png"
        }
        else if(ext=="docx"|| ext=="doc"){
            fileIcon.src="../assets/w1.png"
        }
        else if(ext=="jpeg"|| ext== "jpg"|| ext=="png"){
            fileIcon.src="../assets/i1.png"
        }
        

        //const docBoxTop = document.createElement("div");
        const docBoxText = document.createElement("div");

        console.log("hi")

        docBoxText.innerHTML=docName
        docBox.value=i
        docBox.style.height="12vh"
        docBox.style.width="7vw"
        // docBox.style.border="1px solid black"
        docBox.style.backgroundColor="white"
        docBox.style.display="inline-block"
        docBox.style.margin="20px 20px 20px 20px"
        docBox.style.textAlign="center"
        docBox.style.cursor="pointer"

        docBoxText.style.textAlign="center"
        docBoxText.style.marginTop="1vh"
        docBoxText.style.fontSize="13px"
        docBoxText.style.height="auto"
        docBoxText.style.width="100%"
        docBoxText.style.overflowWrap="break-word"



        docBox.addEventListener('click',function(){
            var ind = docBox.value
            var doc_id = array[ind]["doc_id"]
            current_doc_id = doc_id
            var doc_url = array[ind]["url"]
            var name = array[ind]["doc_name"]
            var extension = name.split(".").pop();
           
            if(extension == "pdf" || extension == "PDF"){
                document.getElementById("translate").style.visibility="visible"
            }
            detailsTitle.innerHTML=name
            detailsType.innerHTML=extension+" File"
            sumText.innerHTML=array[ind]["summary"]
            const dlt = document.getElementById("deleteFile")
            dlt.style.visibility="visible"
            const openFile = document.getElementById("openFile")
            openFile.addEventListener('click',(e)=>{
                console.log("opening file")
                console.log(doc_url)
                window.open(doc_url, '_blank').focus()
            })


            dlt.addEventListener('mouseover',function(){
                const dltIcon = document.getElementById("trash")
                dltIcon.src="../assets/trash_red.png"

            })

            dlt.addEventListener('mouseout',function(){
                const dltIcon = document.getElementById("trash")
                dltIcon.src="../assets/trash.png"

            })

            dlt.addEventListener('click',function(){
                deleteFile(value, doc_id)


            })



        })


        docBox.addEventListener('mouseover',function(){
            docBox.style.backgroundColor="#F5F5F5"

        })

        docBox.addEventListener('mouseout',function(){
            docBox.style.backgroundColor="transparent"

        })

        detailsTitle.style.color="#4B4A48"
        detailsTitle.style.fontSize="18px"
        
        detailsType.style.color="grey"
        detailsType.style.fontSize="14px"

        sumText.style.color="grey"
        sumText.style.fontSize="14px"

        // var checkbox = document.createElement('input');
        // checkbox.type="checkbox"
        // checkbox.style.marginLeft="4vw"
        // checkbox.style.position="absolute"
        // checkbox.style.visibility="hidden"




        // docSummary.appendChild(detailsTitle)
        // docSummary.appendChild(detailsType)
        docSummary.appendChild(detailsTitle)
        docSummary.appendChild(detailsType)
        docSummary.appendChild(sumText)
        // docBox.appendChild(checkbox)
        docBox.appendChild(fileIcon)
        docBox.appendChild(docBoxText);
        DocViewer.appendChild(docBox);




        




     

    }

    





}


async function deleteFile (value, id){

    console.log(value, id) //Delete file here

    var obj = {"caseID":CaseID, "fileID":id}
    console.log(CaseID)
    var json = JSON.stringify(obj);
    const options1 = {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type':'application/json',
       }
   };

   const response1 = await fetch(
       'https://lawflow-3c5b7.uc.r.appspot.com/deleteFile/deleteFileById', options1);
       
   if (response1.status==200){
       var value = await response1.json();
       console.log(value)
       location.reload();


       //displayDocuments(value);


   }



}



body.onload = async function getAllDocs(){

    console.log("func2")

    if (catName=="General"){

        
    var obj = {"case_id":CaseID}
    console.log(CaseID)
    var json = JSON.stringify(obj);
    const options = {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type':'application/json',
       }
   };

        const response = await fetch(
            'https://lawflow-3c5b7.uc.r.appspot.com/addDocs/getAllDocs', options);
            
        if (response.status==200){
            var value = await response.json();
            console.log(value)
            displayGENDocuments(value)
        }
    }

    else if (catName!=null && catName!="General"){

    var cat = catName.toLowerCase()

    console.log(cat)

    var obj = {"caseID":CaseID, "category":cat}
    console.log(CaseID)
    var json = JSON.stringify(obj);
    const options8 = {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type':'application/json',
       }
   };

   const response8 = await fetch(
       'https://lawflow-3c5b7.uc.r.appspot.com/categoriesDocs/getDocsForCategory', options8);
       
   if (response8.status==200){
       var value = await response8.json();
       console.log(value)

       displayDocuments(value);


   }

}

displayHeader()


// const searchBut = document.getElementById("searchBut")
// searchBut.addEventListener('click',function(){
//     var textField = document.getElementById("searchFile").value
//     filename=textField
//     searchByFilename(filename)
// })

}


var translate = document.getElementById("translate")
// translate.addEventListener('click',async()=>{
    
// var obj = {"docId":current_doc_id}
// console.log(CaseID)
// var json = JSON.stringify(obj);
// const options1 = {
//     method: 'POST',
//     body: json,
//     headers: {
//         'Content-Type':'application/json',
//    }
// };

// const response1 = await fetch(
//    'https://lawflow-3c5b7.uc.r.appspot.com/addDocs/getTranslatedDocs', options1);
   
// if (response1.status==200){
//    var value = await response1.json();
//    console.log(value)
//    if(!(value["Error"])){
//    window.open(value[0]["url"], '_blank').focus()
//    }

//    else{
//     Swal.fire({
//         icon: 'warning',
//         title: 'Translate Document',
//         text: "Current Translation only happens from Arabic to English and may take up to a few minutes!",
//         showCancelButton: true,
//         confirmButtonText: 'Continue',
//       }).then((result) => {
//         /* Read more about isConfirmed, isDenied below */
//         if (result.isConfirmed) {
//           Translate(current_doc_id)
//         } else if (result.isDenied) {
//           Swal.fire('Changes are not saved', '', 'info')
//         }
//       })
//     }
// }
// })





async function sortDocAsc(){

    if (catName!=null){

        var cat = catName.toLowerCase()

    var obj = {"caseID":CaseID, "category":cat}
    console.log(CaseID)
    var json = JSON.stringify(obj);
    const options = {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type':'application/json',
       }
   };

   const response = await fetch(
       'https://lawflow-3c5b7.uc.r.appspot.com/categoriesDocs/getCategoriesAsc', options);
       
   if (response.status==200){
       var value = await response.json();
       console.log(value)
       displayDocuments(value)
   }
}

}

async function sortDocDesc(){
    if (catName!=null){

        var cat = catName.toLowerCase()

    var obj = {"caseID":CaseID, "category":cat}
    console.log(CaseID)
    var json = JSON.stringify(obj);
    const options = {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type':'application/json',
       }
   };

   const response = await fetch(
       'https://lawflow-3c5b7.uc.r.appspot.com/categoriesDocs/getCategoriesDesc', options);
       
   if (response.status==200){
       var value = await response.json();
       console.log(value)
       displayDocuments(value)
   }
}
    
}

async function sortDocDate(){
    

    var obj = {"caseID":CaseID}
    console.log(CaseID)
    var json = JSON.stringify(obj);
    const options = {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type':'application/json',
       }
   };

   const response = await fetch(
       'https://lawflow-3c5b7.uc.r.appspot.com/filter/filterFilesByDates', options);
       
   if (response.status==200){
       var value = await response.json();
       console.log(value)
       displayDocuments(value)
   }

}


// async function displayGeneralDocs(){

//     if(catName=="General"){

    
    


// }

// }

  


  // Close the dropdown if the user clicks outside of it
//   window.onclick = function(event) {
//     if (!event.target.matches('.dropdown')) {
        
  
//     }}



    // const ele = document.getElementById("dropbtn")
    // ele.addEventListener('click',function(){
    //     document.getElementById("myDropdown").style.visibility="visible"
    // })


var flag = 0;

    const ele1 = document.getElementById("dropbtn")
    ele1.addEventListener('click',function(){
        console.log(`click1 }`)
        document.getElementById("myDropdown").classList.toggle("show");

        // if(flag ==0){
        // document.getElementById("myDropdown").style.visibility="visible"
        // // document.getElementById("myDropdown").style.display="inline"
        
        // flag = 1;
        //console.log(`flag ${flag}`)
        // }
    })




    const ele = document.getElementById("submitSort")
    ele.addEventListener('click',function(){
        //console.log(`click2 }`)

        var selected = document.querySelector("input[name=radio]:checked").value

        console.log(selected)
        

        if (selected=="Descending"){
            sortDocDesc();
        }
        else if (selected=="Ascending"){
            sortDocAsc();
        }
        else if (selected=="Date") {

            sortDocDate()
        }

    console.log(`flag2 ${flag}`)
        if(flag == 1){
    // document.getElementById("myDropdown").style.display="none"

        document.getElementById("myDropdown").style.visibility="collapse"
        flag=0;
        console.log(`flag3 ${flag}`)
    }
    
})



// close();
// closeDD();



var translate = document.getElementById("translate")
translate.addEventListener('click',async()=>{
    
var obj = {"docId":current_doc_id}
console.log(CaseID)
var json = JSON.stringify(obj);
const options1 = {
    method: 'POST',
    body: json,
    headers: {
        'Content-Type':'application/json',
   }
};

const response1 = await fetch(
   'https://lawflow-3c5b7.uc.r.appspot.com/addDocs/getTranslatedDocs', options1);
   
if (response1.status==200){
   var value = await response1.json();
   console.log(value)
   if(!(value["Error"])){
   window.open(value[0]["url"], '_blank').focus()
   }

   else{
    Swal.fire({
        icon: 'warning',
        title: 'Translate Document',
        text: "Current Translation only happens from English to Arabic and may take up to a few minutes!",
        showCancelButton: true,
        confirmButtonText: 'Continue',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Translate(current_doc_id)
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }
}
})

