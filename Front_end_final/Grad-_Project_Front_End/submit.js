

document.getElementById("submitBtn").addEventListener("click", () => {
  let postid = uuidv4();
  let inputElem = document.getElementById("imgfile");
  let file = inputElem.files[0];
  console.log(file)
  // Create new file so we can rename the file
  let blob = file.slice(0, file.size, "image/jpeg");
  newFile = new File([blob], `${postid}_post.jpeg`, { type: "image/jpeg" });
  // Build the form data - You can add other input values to this i.e descriptions, make sure img is appended last
  let formData = new FormData();
  formData.append("imgfile", newFile);
  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.text());
});
// Loads the posts on page load
