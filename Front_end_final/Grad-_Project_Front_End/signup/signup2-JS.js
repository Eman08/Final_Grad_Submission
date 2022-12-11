const jwt_decode = require('jwt-decode')
const Swal = require('sweetalert2')
const settings = require('electron-settings');
const electron = require('electron');
console.log(localStorage.getItem("userN")+" password is:"+localStorage.getItem("pass")+" email is:"+localStorage.getItem("email"));
var path = require("path");
var imagePath = "";
function underAgeValidate(birthday){
	// it will accept two types of format yyyy-mm-dd and yyyy/mm/dd
	var optimizedBirthday = birthday.replace(/-/g, "/");

    //set date based on birthday at 01:00:00 hours GMT+0100 (CET)
	var myBirthday = new Date(optimizedBirthday);

	// set current day on 01:00:00 hours GMT+0100 (CET)
	var currentDate = new Date().toJSON().slice(0,10)+' 01:00:00';

	// calculate age comparing current date and borthday
	var myAge = ~~((Date.now(currentDate) - myBirthday) / (31557600000));

	if(myAge < 18) {
     	    return false;
        }else{
	    return true;
	}

} 
document.getElementById("file").addEventListener("change",async () => {
    let inputElem = document.getElementById("file");    
    let filename = inputElem.files[0];
    document.getElementById("photo").src = filename.path;
    imagePath = filename;
});
  

document.getElementById("sign-submit").onclick = async function onClick(){
    document.getElementById("loader").style.display = "block";
    var preFile = "PICS-"; //This is gonna be OCR or PICS 
    var fileName = preFile + "pic_"+localStorage.getItem("userN");
    // Build the form data - You can add other input values to this i.e descriptions, make sure img is appended last
    let formData = new FormData();
    formData.append('file', imagePath,fileName);
    const response = await fetch("https://upload-to-bucket.onrender.com/upload-file-to-cloud-storage",{
      method:'POST',
      body: formData,
    });
    const data = await response.text();
    console.log(data);
    var date = document.getElementById("DOB").value;
    console.log(date);
    if(underAgeValidate(date)){
        var obj = {"username":localStorage.getItem("userN"),"email":localStorage.getItem("email"), "password":localStorage.getItem("pass"),"dob":date,"imagePath":imagePath};
        var json = JSON.stringify(obj);
        let loginURL = new URL(`https://lawflow-3c5b7.uc.r.appspot.com/login/signup`);
        console.log(loginURL);
        const options = {
            method: 'POST',
            body: json,
            headers: {
                'Content-Type': 'application/json',
            
            },
        };

        const response = await fetch(
            'https://lawflow-3c5b7.uc.r.appspot.com/login/signup', options);
        
        
        if(response.status == 200){
            var access_token = await response.json();
            localStorage.setItem("jwttoken",access_token);
            var decoded = jwt_decode(String(access_token.access_token));
            window.location.href = "../dashboard/dashboard.html";
            win.reload();
            
        }
        
    }
    else{
        document.getElementById("span_login_invalid").innerHTML = "Age needs to be greater than 18!";
    }
    localStorage.clear();

}
//declearing html elemen
//localStorage.clear();



