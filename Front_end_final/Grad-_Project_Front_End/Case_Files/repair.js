document.getElementById("nextpg").addEventListener("click",async()=>{
    var folder = "OCR-";
    var folder2 = "searchImage-";
    var fileName = folder + total_time + filenameImage
    var fileName2 = folder2 + total_time + filenameImage
  
    let formData = new FormData();
  
    formData.append('file', imagePath,fileName);
    let formData2 = new FormData();
    formData2.append('file', imagePath,fileName2);
    const searchFolder = await fetch("https://upload-to-bucket.onrender.com/upload-file-to-cloud-storage",{
        method:'POST',
        body: formData2,
      });
    const data2 = await searchFolder.text();        //The public url will be displyed for file uploaded to search image folder
    console.log(data2); 
    // Now we try to search if that image already exists by calling the search by image api
    var object_searchImageAPI ={
        "username":"AbeeraAmir",
        "filename":total_time+filenameImage,
        "forwhat":"0" //0 or 1 , 1 is for searching by image, 0 is for checking for duplictes
    }
    let response_fromImageAPI = "";
    if(searchFolder.status==200){
        setTimeout(async () => {
          response_fromImageAPI= await fetch('https://lawflowsearch.herokuapp.com/search/searchByImage',{
          method:'POST',
          body:JSON.stringify(object_searchImageAPI),
          headers: {
              'Content-Type': 'application/json', 
            }
        });
      });
      var val = await response_fromImageAPI.json();
        if(val.length != 0){
          console.log("File already exists in database "+ val);
          return false;
        }
        //If file already exists return a message saying file is already present, not uploading
        //We need to write the upload file code function now 
        const response_UploadOCR = await fetch("https://upload-to-bucket.onrender.com/upload-file-to-cloud-storage",{
          method:'POST',
          body: formData,
        });
        const data = await response_UploadOCR.text();
        console.log(data); //Public URL OF file upload code
        var object_to_getCategory ={
            "name":filenameImage,
            "time":total_time
        }
        //Now we call the category API to create tokens 
        var response_createCat = "";
        if(response_UploadOCR.status==200){
            display_categories.innerHTML=''
            console.log(object_to_getCategory);
            setTimeout(async () => {
                response_createCat = await fetch('https://lawflowsearch.herokuapp.com/ocr/getimageCat',{
                method:'POST',
                body:JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json', 
                  }
              })
              var val = await response_createCat.json()
              console.log("RESPONSE")
              console.log(val)
              file_id = val[1]
              var variable = val[0]
              var length = Object.keys(val[0]).length
              for (const [key, value] of Object.entries(val[0])) {
                for(var i=0;i<value.length;i++)
                {
                  categories.push(value[i])
                }
              }
              console.log(categories)
              var names = []
              display_categories.style.display="flex"
              display_categories.style.flexDirection="row"
              display_categories.style.justifyContent="space-between"
            
              for(var i=0;i<categories.length;i++){
                var main_category = document.createElement("div")
                var newLi = document.createElement("ul")
                var category_name = document.createElement("p");
                names[i] = document.createElement("button")
                var check = categories[i]
                category_name.innerText=categories[i]
                names[i].setAttribute("name",categories[i]);
                names[i].innerText ="select"
                newLi.value = categories[i]
                names[i].setAttribute("id",i);
                category_name.style.fontSize="18px"
                category_name.value=check
                category_name.innerText=categories[i]
                category_name.style.marginLeft="80px"
                category_name.style.marginTop="80px"
                main_category.style.display="flex"
                main_category.style.flexDirection="row"
                main_category.style.justifyContent="space-between"
                main_category.style.marginTop="80px"
                newLi.style.boxShadow="1px 1px 1px 1px grey"
                newLi.style.alignItems="center"
                newLi.style.justifyItems="center"    
                newLi.style.height="200px"
                newLi.style.width="250px"
                newLi.style.borderRadius="5px"
                newLi.style.marginLeft="30px"
          
                names[i].style.borderRadius="50px"
                names[i].style.backgroundColor="#283745"
                names[i].style.color="white"
                names[i].style.height="30px"
                names[i].style.width="160px"
                names[i].style.marginTop="10px"
                names[i].style.marginLeft="30px"
                names[i].style.cursor="pointer"
                names[i].style.border="none"
                names[i].innerText="Select Category"
                names[i].style.fontSize="12px"
          
                newLi.appendChild(category_name)
                newLi.appendChild(names[i])
                main_category.appendChild(newLi)
                display_categories.appendChild(main_category)
          
                
              }
              for(let i = 0;i<names.length;i++){
                names[i].addEventListener('click',(e)=>{
                  console.log(names[i].getAttribute("name"));
                })   
               }
            
            var object_to_createID = {
                "category": "Others",
                "idds": file_id,
                "caseid":"10pF3di4LJeBQXrP"
            }
            let response_fromIDAPI ="";
            if(response_createCat.status==200){
                console.log(obj3)
                setTimeout(async () => {
                response_fromIDAPI = await fetch('https://lawflowsearch.herokuapp.com/ocr/pickCat',{
                method:'POST',
                body:JSON.stringify(object_to_createID),
                headers: {
                    'Content-Type': 'application/json', 
                }
                })});
            }
            // if fetch ends
              
            }, 5000);
            
          }
        }
    }
);   