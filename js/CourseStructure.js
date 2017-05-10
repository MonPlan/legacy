function CourseStructure(domTable, commencementYear, graduationYear) {
    this.domTable = domTable;
    this.teachingPeriods = [];
    this.totalCredits = 0;

    this.clearTable();

    if(typeof commencementYear !== "undefined") {
        this.commencementYear = commencementYear;
        this.graduationYear = graduationYear;

        this.populateTable();
    }
}

CourseStructure.prototype.populateTable = function() {
    var year = this.commencementYear;
    while(year <= this.graduationYear) {
        this.addTeachingPeriod(new TeachingPeriod(this, year, "S1-01"));
        this.addTeachingPeriod(new TeachingPeriod(this, year, "S2-02"));
        year ++;
    }
};

CourseStructure.prototype.clearTable = function() {
    while(this.domTable.rows.length > 0) {
        this.domTable.deleteRow(-1);
    }
};

CourseStructure.prototype.populateTotalCredits = function(credits) {
    this.domCredits = credits;
    this.updateTotalCredits();
};

CourseStructure.prototype.updateTotalCredits = function() {
    if(typeof this.domCredits === "undefined") {
        console.warn("Total credits not populated");
        return;
    }

    this.domCredits.textContent = this.totalCredits;
};

CourseStructure.prototype.addTeachingPeriod = function(teachingPeriod) {
    if(typeof teachingPeriod === "undefined") {
        if(this.teachingPeriods.length > 0) {
            var oldTeachingPeriod = this.teachingPeriods[this.teachingPeriods.length - 1];
            if(oldTeachingPeriod.type === "S1-01") {
                teachingPeriod = new TeachingPeriod(this, oldTeachingPeriod.year, "S2-02");
            } else {
                teachingPeriod = new TeachingPeriod(this, oldTeachingPeriod.year + 1, "S1-01");
            }
        } else {
            teachingPeriod = new TeachingPeriod(this, new Date().getFullYear(), "S1-01");
        }
    }

    this.teachingPeriods.push(teachingPeriod);

    var row = this.domTable.insertRow(-1);
    teachingPeriod.populate(row);
};

CourseStructure.prototype.deleteTeachingPeriod = function() {
  if(this.domTable.rows.length > 2) {
    this.domTable.deleteRow(-1);
  }
};

CourseStructure.prototype.addUnit = function() {
  var tblHeadObj = document.getElementById("fullTable").tHead;
  for (var h=0; h<tblHeadObj.rows.length; h++) {
    var newTH = document.createElement("th");
    tblHeadObj.rows[h].appendChild(newTH);
    newTH.innerHTML = "Unit"
  }

  var tblBodyObj = document.getElementById("fullTable").tBodies[0];
  for (var i=0; i<tblBodyObj.rows.length; i++) {
    var newCell = tblBodyObj.rows[i].insertCell(-1);
  }
};

CourseStructure.prototype.promptUserToAddUnit = function(unit, callback) {
    this.onDismissAddUnits = callback;

    for(var i = 0; i < this.teachingPeriods.length; i++) {
        this.teachingPeriods[i].highlightEmptyUnitSlots(unit);
    }
};

CourseStructure.prototype.dismissPromptUserToAddUnits = function() {
    for(var i = 0; i < this.teachingPeriods.length; i++) {
        this.teachingPeriods[i].unhighlightEmptyUnitSlots();
    }

    if(this.onDismissAddUnits) {
        this.onDismissAddUnits();
    }
};

CourseStructure.prototype.serialise = function() {
    var serialised = {teachingPeriods: []};

    for(var i = 0; i < this.teachingPeriods.length; i++) {
        serialised.teachingPeriods.push(this.teachingPeriods[i].serialise());
    }

    return serialised;
};

CourseStructure.deserialise = function(domTable, serialised) {
    var courseStructure = new CourseStructure(domTable);

    for(var i = 0; i < serialised.teachingPeriods.length; i++) {
        var teachingPeriod = TeachingPeriod.deserialise(courseStructure, serialised.teachingPeriods[i]);
        courseStructure.addTeachingPeriod(teachingPeriod);
    }

    return courseStructure;
};
