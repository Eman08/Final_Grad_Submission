
async function files(){
var username = localStorage.getItem("username")
var imgObj = {"username":username}
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
  var img = document.createElement("img");
    img.src = url;
    img.style.height="20vh"
    img.style.width="10vw"
    img.style.borderRadius="100px"
   
  document.getElementById("dp").appendChild(img)
}
}

export {files}