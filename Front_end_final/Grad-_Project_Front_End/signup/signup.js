const jwt_decode = require('jwt-decode')
const Swal = require('sweetalert2')
const settings = require('electron-settings');
const electron = require('electron');
const Store = require('electron-store');
const store = new Store();
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
var imagePath = "";
var value = 0;
function showSpinner(){
    document.getElementById('cover-spin').style.display = 'block';
  }
  function closeSpinner(){
    document.getElementById('cover-spin').style.display = 'none';
  }
signUpButton.addEventListener('click', () => {
    document.getElementById("username").style.border = "";
    document.getElementById("password").style.border = "";
    document.getElementById("email").style.border = "";
    document.getElementById("DOB").style.border = "";
    document.querySelector(".error3").innerHTML = "";
    document.querySelector(".error3").style.display = "none";
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    document.getElementById('username_Login').style.border="";
    document.getElementById('password_Login').style.border="";
    document.querySelector(".error2").innerHTML = "";
    document.querySelector(".error2").style.display = "none";
	container.classList.remove("right-panel-active");
});
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
function returnsValue(val){
    value = val;
}
async function main(username){
    var obj = {"username": username};
    var json = JSON.stringify(obj);
    console.log(json)
    let loginURL = new URL(`https://lawflow-3c5b7.uc.r.appspot.com/login/usernameCheck`);
    console.log(loginURL);
    const options = {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type': 'application/json',
          },
    };

    const response = await fetch(
        'https://lawflow-3c5b7.uc.r.appspot.com/login/usernameCheck', options);
       
    
    if(response.status == 200){
        var result = await response.json();
        result = String(result);
        console.log(result);
        if(result == "false"){
            returnsValue(1);
        }
        else{
            returnsValue(0);
        }
        
    }
}
var button = document.getElementById("signup");
button.onclick =  async function onClick(event){
    //Place code for loading here
    showSpinner();
    var username = document.getElementById("username").value;
    if(username == ""){
        document.getElementById("username").style.border = "2px solid red";
        document.querySelector(".error3").innerHTML = "Username cannot be empty, Please try again";
        document.querySelector(".error3").style.display = "block";
        closeSpinner();
        //Place code for displayng error
    }
    else{
        if(!(/^[a-zA-Z0-9]((?!(\.|))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/.test(username))){
            document.getElementById("username").style.border = "2px solid red";
            document.querySelector(".error3").innerHTML = "Username needs to be 6-18 chars, Please try again";
            document.querySelector(".error3").style.display = "block";
            closeSpinner();
        }
        else{
    await main(username);
    if(value == 0){
        document.getElementById("username").style.border = "2px solid red";
        document.querySelector(".error3").innerHTML = "Username exists, Please try again";
        document.querySelector(".error3").style.display = "block";
        closeSpinner();
    }
    var firstName = document.getElementById("fname").value;
    var LastName = document.getElementById("lname").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var paswd=  /^(?=.[0-9])(?=.[!@#$%^&])[a-zA-Z0-9!@#$%^&]{7,15}$/;
    var date = document.getElementById("DOB").value;
    console.log(email);
    //var check = main(username);
    if(value == 1){
        document.getElementById("username").style.border = "";
        document.getElementById("fname").style.border = "";
        document.getElementById("lname").style.border = "";
        document.getElementById("email").style.border = "";
        document.getElementById("password").style.border = "";
        document.getElementById("DOB").style.border = "";
    if(firstName == "" ){
        document.getElementById("fname").style.border = "2px solid red";
        document.querySelector(".error3").innerHTML = "First name is required";
        document.querySelector(".error3").style.display = "block";
        closeSpinner();
    }
    else if(LastName == "" ){
        document.getElementById("lname").style.border = "2px solid red";
        document.querySelector(".error3").innerHTML = "Last name is required";
        document.querySelector(".error3").style.display = "block";
        closeSpinner();
    }
    else if(!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) || email == ""){
        document.getElementById("email").style.border = "2px solid red";
        document.querySelector(".error3").innerHTML = "Invalid email, Please try again";
        document.querySelector(".error3").style.display = "block";
        closeSpinner();
    }
    else if(password==""){
        document.getElementById('password').style.border="2px solid red";
        document.querySelector(".error3").innerHTML = "Password cannot be empty, Please try again";
        document.querySelector(".error3").style.display = "block";
        closeSpinner();
    }
    // else if(!(password.match(paswd))){
    //     document.getElementById("password").style.border = "2px solid red";
    //     document.querySelector(".error3").innerHTML = "Password should contain one special character and one number, Please try again";
    //     document.querySelector(".error3").style.display = "block";
    //     console.log(password.match(paswd));
    //     closeSpinner();
    // }
    else if(!(underAgeValidate(date))){
        document.getElementById("DOB").style.border = "2px solid red";
        document.querySelector(".error3").innerHTML = "Age should be greater than 18, Please try again";
        document.querySelector(".error3").style.display = "block";
        closeSpinner();
    }
    else{
        if(imagePath!=""){
        var preFile = "PICS-"; //This is gonna be OCR or PICS 
        var fileName = preFile + "pic_"+username +"."+imagePath.path.split('.').pop();
        // Build the form data - You can add other input values to this i.e descriptions, make sure img is appended last
        let formData = new FormData();
        formData.append('file', imagePath,fileName);
        const response = await fetch("https://upload-to-bucket.onrender.com/upload-file-to-cloud-storage",{
          method:'POST',
          body: formData,
        });
        const data = await response.text();
        console.log(data);
        }
        console.log(firstName+"  :"+LastName)
        var obj = {"firstname":firstName,"lastname":LastName,"username":username,"email":email, "password":password,"dob":date,"imagePath":imagePath};
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
    
        const response2 = await fetch(
            'https://lawflow-3c5b7.uc.r.appspot.com/login/signup', options);
            
            
        if(response2.status == 200){
            closeSpinner();
            var access_token = await response2.json();
            localStorage.setItem("jwttoken",access_token);
            var decoded = jwt_decode(String(access_token.access_token))
            store.set("email", decoded["email"])
            store.set("username",decoded["username"])
            localStorage.setItem("username",decoded["username"])
            store.set("loggedIn","True")
            window.location.href = "../dashboard/dashboard_1.html"
            
            }
            else{
                closeSpinner();
            }
    }
}
        }
    }
    event.preventDefault();
}
document.getElementById("SIGNIN").onclick = async function onClick(){
    showSpinner();
    var username = document.getElementById("username_Login").value;
    var password = document.getElementById("password_Login").value;

   
    if(username == ""){
        document.getElementById('username_Login').style.border="2px solid red";
        document.querySelector(".error2").innerHTML = "Username cannot be empty, Please try again";
        document.querySelector(".error2").style.display = "block";
        closeSpinner();
    }

    else if(password==""){
        document.getElementById('username_Login').style.border="";
        document.getElementById('password_Login').style.border="2px solid red";
        document.querySelector(".error2").innerHTML = "Password cannot be empty, Please try again";
        document.querySelector(".error2").style.display = "block";
        closeSpinner();
    }

    else{
        document.getElementById('username_Login').style.border="";
        document.getElementById('password_Login').style.border="";
    console.log(username);
    var obj = {"username":username, "password":password};
    var json = JSON.stringify(obj);
    let loginURL = new URL(`https://lawflow-3c5b7.uc.r.appspot.com/login/loginUser`);
    console.log(loginURL);
    const options = {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type': 'application/json',
           
          },
    };

    const response = await fetch(
        'https://lawflow-3c5b7.uc.r.appspot.com/login/loginUser', options);
       
    
    if(response.status == 200){
        closeSpinner();
        var access_token = await response.json();
        localStorage.setItem("jwttoken",access_token);
        var decoded = jwt_decode(String(access_token.access_token));
        store.set("email", decoded["email"])
        localStorage.setItem("username",decoded["username"])
        store.set("username",decoded["username"])
        store.set("loggedIn","True")
        window.location.href = "../dashboard/dashboard_1.html";
        
        
    }
        
    else if(response.status == 400 || response.status==404){
        document.querySelector(".error2").innerHTML = "Invalid Credentials, Please try again";
        document.querySelector(".error2").style.display = "block";
        document.getElementById('username_Login').style.border="2px solid red";
        document.getElementById('password_Login').style.border="2px solid red";
        closeSpinner();
    }
    }

}


