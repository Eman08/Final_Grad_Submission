import {notification_for_app} from '../notifications/notification.js'
notification_for_app()

var body = document.getElementById("category");

var CaseID = localStorage.getItem("ExistCase");
var CaseName = localStorage.getItem("ExistCaseName");

console.log(CaseID)
console.log(CaseName)
var username = localStorage.getItem("username")
document.getElementById("heading_main").innerText=`Hello, ${username}`
var catName = ""

async function displayHeader(){

    const Main = document.getElementById("HeaderDisplay")

    const Name = document.getElementById("casename")
    const ID = document.getElementById("caseid")

    Name.innerHTML=CaseName
    ID.innerHTML=CaseID

    Main.appendChild(Name)
    Main.appendChild(ID)


}


async function displayCategories(value){

    const displayCategories = document.getElementById("displayCategories")

    for(var i = 0; i<value.length; i++){
        console.log(i)

        const mainDiv = document.createElement('div')
        const fileIcon = document.createElement("img");
        fileIcon.src = '../assets/folder.png'

        const categoryText = document.createElement("p");
        const modifyText = document.createElement("p");
        const typeText = document.createElement("p");

    
        categoryText.innerHTML=value[i]
        categoryText.style.marginLeft="4vw"
        categoryText.style.marginTop="-2.8vh"
        categoryText.style.fontSize="14px"
        categoryText.style.color ="#4B4A48"
        categoryText.style.width ="5vw"
        categoryText.style.position ="absolute"

        typeText.innerHTML="Folder"

        typeText.style.marginLeft="69.5vw"
        typeText.style.marginTop="-2.8vh"
        typeText.style.fontSize="14px"
        typeText.style.color ="#4B4A48"
        typeText.style.width ="5vw"
        typeText.style.position ="absolute"

        fileIcon.style.marginLeft="2vh";
        fileIcon.style.marginTop="1vw";

        //#283745 - Blue
        mainDiv.value = value[i]
        mainDiv.style.color="grey";
        mainDiv.style.marginBottom="2vh"
        mainDiv.style.display="inline-block"
        mainDiv.style.marginLeft="1vw";
        mainDiv.style.border="thin solid #a9a9a9";
        mainDiv.style.position="relative";
        mainDiv.style.height="7vh";
        mainDiv.style.width="79.5vw";
        mainDiv.style.borderRadius="5px 5px 5px 5px";
        mainDiv.style.cursor="pointer"
        mainDiv.style.boxShadow="0px 1px 0px 0px grey"
        mainDiv.style.backgroundColor="#F9F6F0"

        mainDiv.addEventListener("mouseover", (event) => {
            mainDiv.style.border="thin solid #283745"
            mainDiv.style.boxShadow="0px 0px 0px 0px grey"
            categoryText.style.textDecoration="underline"
            fileIcon.src = '../assets/opened_folder.png'
        }, false);

        mainDiv.addEventListener("mouseout", (event) => {
            mainDiv.style.border="thin solid #a9a9a9"
            mainDiv.style.boxShadow="0px 1px 0px 0px grey"
            categoryText.style.textDecoration="none"
            fileIcon.src = '../assets/folder.png'

        }, false);



        //a.appendChild(mainDiv);
        mainDiv.addEventListener("click", (event) => {
            catName = mainDiv.value
            localStorage.setItem("catName",catName)
            location.href = "../Cases/displayDocs.html"; 
            getAllDocs()

        
            

        }, false);
 
        mainDiv.appendChild(fileIcon)
        mainDiv.appendChild(categoryText)
        mainDiv.appendChild(typeText)
        displayCategories.appendChild(mainDiv)       
    }


}



// async function getAllDocs(){

//     console.log("func2")

//     if (cat!=null){

//     var cat = catName.toLowerCase()

//     console.log(cat)

//     var obj = {"caseID":CaseID, "category":cat}
//     var json = JSON.stringify(obj);
//     const options1 = {
//         method: 'POST',
//         body: json,
//         headers: {
//             'Content-Type':'application/json',
//        }
//    };

//    const response1 = await fetch(
//        'https://lawflow-3c5b7.uc.r.appspot.com/categoriesDocs/getDocsForCategory', options1);
       
//    if (response1.status==200){
//        var value = await response1.json();
//        console.log(value)
//    }

// }


// }





//-------------------------------------------------------


async function getCategoryByCaseID(){

    var obj = {"caseID":CaseID}
    var json = JSON.stringify(obj);
    const options = {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type':'application/json',
       }
   };

   const response = await fetch(
       'https://lawflow-3c5b7.uc.r.appspot.com/categoriesDocs/getAllCategories', options);
       
   if (response.status==200){
       var value = await response.json();
       console.log(value)

       displayCategories(value);
   }
}


async function displaySearch(value){

    const ele = document.getElementById("results")
    ele.style.visibility="visible"
    ele.style.transition=""
    
    // const catPlaceholder = document.getElementById("catPlaceholder")
    // catPlaceholder.innerHTML=catName

    var array = value

    const DocViewer = document.getElementById("viewer")
    // const docSummary = document.getElementById("docSummary")

    // const detailsTitle = document.createElement("p");
    // const detailsType = document.createElement("p");
    // const sumText = document.createElement("p");


    for (var i=0; i<array.length; i++){

        var docName = array[i]["name"]
        // var URL = array[i]["URL"]
        // var summary = array[i]["summary"][0]
        console.log(docName)
        var ext = docName.split(".").pop();

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
            // var name = array[ind]["name"]
            var doc_url = array[ind]["signed_url"]
            

            window.open(doc_url, '_blank').focus()


        })


        docBox.addEventListener('mouseover',function(){
            docBox.style.backgroundColor="#F5F5F5"

        })

        docBox.addEventListener('mouseout',function(){
            docBox.style.backgroundColor="transparent"

        })


        const close = document.getElementById("closeWindow")

        close.addEventListener('mouseover',function(){
            close.src="../assets/delRed.png"
        })

        close.addEventListener('mouseout',function(){
            close.src="../assets/del.png"
        })

        
        close.addEventListener('click',function(){
            ele.style.visibility="hidden"
        })



        docBox.appendChild(fileIcon)
        docBox.appendChild(docBoxText);
        DocViewer.appendChild(docBox);




        




     

    }

    

}

var filename =""

const searchBut = document.getElementById("searchBut")
searchBut.addEventListener('click',function(){
    const viewer = document.getElementById("viewer")
    viewer.innerHTML=""
    var textField = document.getElementById("searchFile").value
    filename=textField
    searchByFilename(filename)
})




async function searchByFilename (filename){

    console.log(filename)

    if(filename!=""){
        
        var obj = {"caseID":CaseID, "filename":filename}
        var json = JSON.stringify(obj);
        const options3 = {
            method: 'POST',
            body: json,
            headers: {
                'Content-Type':'application/json',
            }
        };

        const response3 = await fetch(
            'https://lawflow-3c5b7.uc.r.appspot.com/caseSearch/caseSearchFilename', options3);
            
        if (response3.status==200){
            var value = await response3.json();
            console.log(value)

            displaySearch(value);


        }

    } 

}


body.onload = async function call() {
    getCategoryByCaseID()
    displayHeader()
}
