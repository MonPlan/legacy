function errorHandler(errorCode){
    if(errorCode !== "" || errorCode !== null){
        var errorMsg;
        if(errorCode === "SUBYRLWR"){
            errorMsg = "Starting year is smaller than the minimum threshold year (current year - 7 years). You must be a current student";
            errorCode = "Error " + errorCode + " (startingYear < minThreshold)";
        } else {
            //if an unknown error has occured
            errorCode = "An Unknown Error has Occured";
            errorMsg = ("An unknown error has occured, if this problem persists please contact the developers or log an issue request at https://gitreports.com/issue/MonashUnitPlanner/monPlan/");
        }
        $("#errorCode").text(errorCode)
        $("#errorMessage").text(errorMsg);
        $("#errorModal").modal("show");
        console.error(errorCode + ": " + errorMsg);
    }
}

var courseStructure;

//document onLoad instructions
window.addEventListener("load", function() {
    var startYr       = document.getElementById("startYr");
    var endYr         = document.getElementById("gradYr");
    var main          = document.getElementById("main");
    var startPlanning = document.getElementById("startPlanning");
    var startPlanningEmpty = document.getElementById("startPlanningEmpty");
    var save = document.getElementById("save");
    var addSemester = document.getElementById("addSemester");
    var addSummerSemesterA = document.getElementById("addSummerSemesterA");
    var addSummerSemesterB = document.getElementById("addSummerSemesterB");
    var addWinterSemester = document.getElementById("addWinterSemester");
    var addFullYear = document.getElementById("addFullYear");
    var addUnit = document.getElementById("addUnit");
    var myTable = document.getElementById("myTable");
    var credits = document.getElementById("credits");

    //hides main div upon load
    main.style.display="none";

    //enables popup message
    $("#displayMessage").popup();
    $("#unitSearch").hide();
    $("#creditCounter").hide();

    // Load course structure if it exists
    var serialised = localStorage.getItem("courseStructure");
    if(serialised !== null) {
      $("#unitSearch").show();
      $("#creditCounter").show();
        // Restore saved course structure
        welcome.style.display = "none";
        main.style.display = "block";
        courseStructure = CourseStructure.deserialise(myTable, JSON.parse(serialised));
        courseStructure.populateTotalCredits(credits);
    } else {
      $("#unitSearch").hide();
      $("#creditCounter").hide();
    }

    startPlanning.addEventListener("click", function() {
        welcome.style.display = "none";
        main.style.display = "block";
        var currentYear = new Date().getFullYear();
        courseStructure = new CourseStructure(myTable, parseInt(startYr.value) || currentYear, parseInt(endYr.value) || (currentYear + 2));
        courseStructure.populateTotalCredits(credits);
        $("#unitSearch").show();
        $("#creditCounter").show();
    });

    startPlanningEmpty.addEventListener("click", function() {
        welcome.style.display = "none";
        main.style.display = "block";
        courseStructure = new CourseStructure(myTable);
        courseStructure.populateTotalCredits(credits);
        $("#unitSearch").show();
        $("#creditCounter").show();
    });

    save.addEventListener("click", function() {
        if(typeof courseStructure !== "undefined") {
            localStorage.setItem("courseStructure", JSON.stringify(courseStructure.serialise()));
        }
    });

    addSemester.addEventListener("click", function() {
        if(typeof courseStructure !== "undefined") {
            courseStructure.addTeachingPeriod();
        }
    });

    addSummerSemesterA.addEventListener("click", function() {
        if(typeof courseStructure !== "undefined") {
            courseStructure.addTeachingPeriod(new TeachingPeriod(courseStructure, 2016, "SSA-02"));
        }
    });

    addSummerSemesterB.addEventListener("click", function() {
        if(typeof courseStructure !== "undefined") {
            courseStructure.addTeachingPeriod(new TeachingPeriod(courseStructure, 2016, "SSB-01"));
        }
    });

    addWinterSemester.addEventListener("click", function() {
        if(typeof courseStructure !== "undefined") {
            courseStructure.addTeachingPeriod(new TeachingPeriod(courseStructure, 2016, "WS-01"));
        }
    });

    addFullYear.addEventListener("click", function() {
        if(typeof courseStructure !== "undefined") {
            courseStructure.addTeachingPeriod(new TeachingPeriod(courseStructure, 2016, "FY-01"));
        }
    });

    $(".ui.checkbox").checkbox();
    $(".ui.modal").modal();
    $(".ui.pop").popup();
    $(".ui.normal.dropdown").dropdown({
        fullTextSearch: true
    });

    $(".teachingPeriod.cell").each(function() {
        var id = $(this).attr("data-popup-id");
        $.get("templates/teachingPeriodPopup.ejs", function(template) {
            var renderedString = ejs.render(template,
                {
                    id: id,
                    title: id
                }
            );
            $("body").append($(renderedString));
        });

        $(this).popup({
            popup: "#" + id,
            hoverable: true
        });
    });
});
