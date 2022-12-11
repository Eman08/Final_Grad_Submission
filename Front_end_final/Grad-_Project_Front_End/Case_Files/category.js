var display_categories = document.getElementById("category_select")
//window.location.href='cases_step2.html'
function category(categories, file_id){
    if(categories.length>=1){
        for(var i=0;i<categories.length;i++){
          var newLi = document.createElement("ul")
          var category_div = document.createElement("div")
          var category_name = document.createElement("p")
          category_div.style.height="200px"
          category_div.style.width="200px"
          category_div.style.boxShadow="1px 1px 1px 1px grey"
          category_div.style.borderRadius="5px"
          category_div.style.textAlign="center"
          category_name.innerText=categories[i]
          newLi.style.display="flex"
          newLi.style.justifyContent="space-evenly"
          newLi.append(category_div)
          display_categories.append(newLi)
        } //for loop ends
      }//if statements ends
  
}