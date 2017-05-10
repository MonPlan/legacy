function TeachingPeriod(courseStructure, year, type) {
    this.courseStructure = courseStructure;
    this.year = year;
    this.type = type;
    this.numberOfUnits = 4;
    this.units = new Array(this.numberOfUnits);
    this.numberOfCredits = 24;

    this.domRow = false;
}

TeachingPeriod.typeStrings = {
    "S1-01": "Semester One",
    "S2-02": "Semester Two",
    "FY-01": "Full-Year",
    "SSA-02": "Summer Semester A",
    "SSB-01": "Summer Semester B",
    "WS-01": "Winter Semester"
};

TeachingPeriod.prototype.toString = function() {
    return this.year + " " + TeachingPeriod.typeStrings[this.type];
};

TeachingPeriod.prototype.toStringCode = function() {
    return this.year + "-" + this.type;
};

TeachingPeriod.prototype.populate = function(row) {
    this.domRow = row;

    // First column - row header
    var teachingPeriodCell = row.insertCell();
    teachingPeriodCell.classList.add("teachingPeriod", "cell");
    teachingPeriodCell.textContent = this.toString();
    teachingPeriodCell.dataset.popupId = this.toStringCode() + "-cell";

    for(var i = 0; i < this.numberOfUnits; i++) {
        var cell = row.insertCell();

        var unit = this.units[i];
        cell.id = this.toStringCode() + "-unit-" + i;
        cell.dataset.unitIndex = i;

        if(typeof unit !== "undefined") {
            cell.textContent = unit.code;
        }
    }

    var self = this;

    this.domRow.addEventListener("mouseover", function(e) {
        if(typeof e.target.dataset.unitIndex !== "undefined" && self.active) {
            var index = parseInt(e.target.dataset.unitIndex);
            if(typeof self.units[index] === "undefined") {
                e.target.classList.add("positive");
                e.target.classList.remove("active");
            }
        }
    });

    this.domRow.addEventListener("mouseout", function(e) {
        if(typeof e.target.dataset.unitIndex !== "undefined" && self.active) {
            var index = parseInt(e.target.dataset.unitIndex);
            if(typeof self.units[index] === "undefined") {
                e.target.classList.add("active");
                e.target.classList.remove("positive");
            }
        }
    });

    this.domRow.addEventListener("click", function(e) {
        if(typeof e.target.dataset.unitIndex !== "undefined" && self.active) {
            var index = parseInt(e.target.dataset.unitIndex);
            if(typeof self.units[index] !== "undefined") {
                /* Unit slot is not empty, do not replace unit */
                return;
            }

            self.addUnit(self.unitToBeAdded, index);
            e.target.setAttribute("class", "");
            self.courseStructure.dismissPromptUserToAddUnits();
        }
    });
};

TeachingPeriod.prototype.addUnit = function(unit, index) {
    this.units[index] = unit;
    this.active = false;
    this.domRow.cells[index + 1].textContent = this.unitToBeAdded.code;
    this.courseStructure.totalCredits += unit.creditPoints;
    this.courseStructure.updateTotalCredits();
};

TeachingPeriod.prototype.checkIfPopulated = function() {
    if(!this.domRow) {
        console.warn("TeachingPeriod not populated.");
        return false;
    }

    return true;
};

TeachingPeriod.prototype.appendUnitPlaceholder = function(tblId) {
	var tblHeadObj = document.getElementById(tblId).tHead;
	for (var h=0; h<tblHeadObj.rows.length; h++) {
		var newTH = document.createElement("th");
		tblHeadObj.rows[h].appendChild(newTH);
		newTH.innerHTML = "[th] row:" + h + ", cell: " + (tblHeadObj.rows[h].cells.length - 1)
	}

	var tblBodyObj = document.getElementById(tblId).tBodies[0];
	for (var i=0; i<tblBodyObj.rows.length; i++) {
		var newCell = tblBodyObj.rows[i].insertCell(-1);
		newCell.innerHTML = "[td] row:" + i + ", cell: " + (tblBodyObj.rows[i].cells.length - 1)
	}
};

TeachingPeriod.prototype.popUnitPlaceholder = function(tblId) {
	var allRows = document.getElementById(tblId).rows;
	for (var i = 0; i < allRows.length; i++) {
		if (allRows[i].cells.length > 1) {
			allRows[i].deleteCell(-1);
		}
	}
};

TeachingPeriod.prototype.highlightEmptyUnitSlots = function(unit) {
    if(!this.checkIfPopulated()) {
        return;
    }

    this.active = true;
    this.unitToBeAdded = unit;

    // index i is the ith unit
    for(var i = 0; i < this.domRow.cells.length - 1; i++) {
        if(typeof this.units[i] === "undefined") {
            this.domRow.cells[i + 1].setAttribute("class", "active");
        }
    }
};

TeachingPeriod.prototype.unhighlightEmptyUnitSlots = function() {
    if(!this.checkIfPopulated()) {
        return;
    }

    this.active = false;

    for(var i = 0; i < this.domRow.cells.length - 1; i++) {
        if(typeof this.units[i] === "undefined") {
            this.domRow.cells[i + 1].setAttribute("class", "");
        }
    }
};

TeachingPeriod.prototype.serialise = function() {
    var serialised = {
        year: this.year,
        type: this.type,
        numberOfUnits: this.numberOfUnits,
        units: []
    };

    for(var i = 0; i < this.numberOfUnits; i++) {
        if(typeof this.units[i] === "undefined") {
            serialised.units.push(undefined);
        } else {
            serialised.units.push(this.units[i].serialise());
        }
    }

    return serialised;
};

TeachingPeriod.deserialise = function(courseStructure, serialised) {
    var teachingPeriod = new TeachingPeriod(courseStructure, serialised.year, serialised.type);
    teachingPeriod.numberOfUnits = serialised.numberOfUnits;

    for(var i = 0; i < serialised.numberOfUnits; i++) {
        var unitCode = serialised.units[i];

        if(unitCode === undefined || unitCode === null) {
            teachingPeriod.units[i] = undefined;
        } else {
            var unit = Unit.deserialise(unitCode);
            teachingPeriod.units[i] = unit;
            courseStructure.totalCredits += unit.creditPoints;
        }
    }

    return teachingPeriod;
};
