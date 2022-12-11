document.getElementById("submitBtn").addEventListener("click",async () => {
  //let postid = uuidv4();
  let inputElem = document.getElementById("imgfile");
  let file = inputElem.files[0];
  var imagePath = "PICS-" ; //This is gonna be OCR or PICS or s2t whatever..
  var fileName = imagePath+ "pic_UseShaad";
  // Build the form data - You can add other input values to this i.e descriptions, make sure img is appended last
  let formData = new FormData();
  formData.append('file', inputElem.files[0],fileName);
  const response = await fetch("http://localhost:5000/upload-file-to-cloud-storage",{
    method:'POST',
    body: formData,
  });
  const data = await response.text();
  return data;
});