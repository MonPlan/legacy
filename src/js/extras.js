function togglePrivacy(){
  $("#privacy").modal("toggle");
}

function toggleToS(){
  $("#termsOfUse").modal("toggle");
}

function displayStatus(mode, title, message){
  /*
  <div id="displayMessage" class="ui item pop" data-title="Everything looks good" data-content="As you add units, we will inform you of any
      conflicts, such as missing prerequisites.">
      Status: <span id="statusTag">OK</span> <i id="statusIcon" class="icon green checkmark"></i>
  </div>
  */
  var displayMessage      = document.getElementById("displayMessage");
  var statusIcon          = document.getElementById("statusIcon");

  if(mode === "error") {
    displayMessage.setAttribute("data-title", title);
    displayMessage.setAttribute("data-content", message);
    $("#statusTag").text("Error");
    statusIcon.setAttribute("class", "icon red warning");
  } else if (mode === "warn") {
    displayMessage.setAttribute("data-title", title);
    displayMessage.setAttribute("data-content", message);
    $("#statusTag").text("Warning");
    statusIcon.setAttribute("class", "icon orange warning");
  }
}

//this function does a getRequest to the target URL, then saves it to the sessionStorage value that the attribute is called to within the function 
function getRequest(fileAddress, sessionStorageTitle){
     var xhr = new XMLHttpRequest();

     xhr.onreadystatechange = function() {
         if(xhr.readyState === 4){
             if(xhr.status === 200){
                console.info("Successful");
                console.log(xhr.responseText);
                sessionStorage.setItem(sessionStorageTitle,xhr.responseText);
             }
             else if(xhr.status === 404){
               console.error("Invalid Address");
             }
         }
     };
     xhr.open("GET",fileAddress,true);
     xhr.send();
 }
