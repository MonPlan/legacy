function specialisation(code, name, type, faculty, currentSpecialisation) {
    this.code = code;
    this.name = name;
    this.faculty = faculty;
    this.type = type;
    this.currentSpecialisation = currentSpecialisation;
}

specialisation.prototype.populateTable = function() {

}

specialisation.prototype.addSpecialisation = function() {
  if($.inArray(code, currentSpecialisation) !== -1){
    //append specialisation if not present in array
    currentSpecialisation.append(code)
  }
}

specialisation.prototype.removeSpecialisation = function() {
  var tbrCourse = $.inArray(code, currentSpecialisation)

  if(tbrCourse !== -1){
    //only remove if it exists
    currentSpecialisation.splice(tbrCourse, 1); //remove using splice tool
  }
}


function addSpecialisation(){
  var table = document.getElementById("special");

  var tgtSpecial = $("#specialisationSearch").search("get value");
  // add row to bottom of table
  var row = table.insertRow(-1);

  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);

  // Add some text to the new cells:
  cell1.innerHTML = tgtSpecial;
  cell2.innerHTML = "";
}
