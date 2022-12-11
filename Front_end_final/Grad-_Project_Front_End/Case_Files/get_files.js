
var case_id = localStorage.getItem("case_id")
var body = document.getElementById("cases")
body.onload = async function getFiles(){

    var obj = {"case_id":"10pF3di4LJeBQXrP"}
    var json = JSON.stringify(obj)
    const response_backend= await fetch('https://lawflow-3c5b7.uc.r.appspot.com/case/getDocuments',{
        method:'POST',
        body:JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json', 
          }
      });

    if(response_backend.status == 200){
        var val = await response_backend.json()
        const UI = document.getElementById("allfiles");
        for(let i = 0; i < val.length; i++){
            var maindiv = document.createElement('div');
            maindiv.setAttribute("id",i);
            maindiv.style.textAlign ="center";
            maindiv.style.height = "20vh";
            maindiv.style.width = "20vw";
            maindiv.style.boxShadow ="1px 1px 1px 1px grey";
            maindiv.style.borderRadius = "10px";
            maindiv.style.color = "white";
            maindiv.style.marginLeft = "90.5vh";
            var url = val[i][1]
            var h3 = document.createElement('h3');
            h3.className = "heading3";
            h3.innerHTML = "File number "+(i+1)+" :";
            var icon = document.createElement('img');
            var para = document.createElement('div')
            icon.style.float="left"
            para.innerHTML = val[i][0]  
            // if(val[i][0].split('.')[1] == 'pdf'){
            //     icon.src = '../../assets/pdf.png'
            // }
            // else
            // icon.src='../assets/img.png'
            //icon.style.height = "10px";
            para.style.marginTop="1vh";
            para.style.marginLeft="5vw";
            para.style.fontSize = "18px";
            maindiv.style.height="3vw";
            maindiv.style.borderRadius="5px"
            maindiv.style.padding="3.5vh"
            maindiv.style.marginBottom ="5.5vh"
            maindiv.style.color ="#023020"
            maindiv.style.cursor = "pointer";
            maindiv.appendChild(h3);
            maindiv.appendChild(icon)
            maindiv.appendChild(para)
            maindiv.onclick = function async(){
                    window.open(url, '_blank').focus()
            }
            UI.appendChild(maindiv)
        }

    }


}