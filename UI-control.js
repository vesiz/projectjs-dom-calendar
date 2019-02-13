var actionGetCurrentWeek   = DOMlib.get("get-current-week");
var actionGetCurrentMonth  = DOMlib.get("get-current-month");
var actionGetSpecificWeek  = DOMlib.get("submit-searched-week");
var actionGetSpecificMonth = DOMlib.get("submit-searched-month");
var actionGetPrevMonth     = DOMlib.get("get-prev-month");
var actionGetNextMonth     = DOMlib.get("get-next-month");
var actionGetPrevYear      = DOMlib.get("get-prev-year");
var actionGetNextYear      = DOMlib.get("get-next-year");


var createWeekWrapper = function(_weekId){
    DOMlib.addChild("calender-cells-wrapper", "div", _weekId);
    DOMlib.changeElementAttr(_weekId,"class", "row");

    return DOMlib.get(_weekId);
};

var createDayCell = function(_weekId, _dayId, _cellInfo){
    DOMlib.addChild(_weekId, "div", _dayId);
    DOMlib.changeElementAttr(_dayId, "class", "column");
    DOMlib.changeinnerHTML(_dayId, _cellInfo);

    return DOMlib.get(_dayId);
}

var colorCell = function(_givenDate, _dayId){
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if(_givenDate.getDay() == 6 || _givenDate.getDay() == 0){
        DOMlib.changeElementAttr(_dayId, "style", {"background" : "lightgray"});
    }

    if(currentDate.getTime() === _givenDate.getTime()){
        DOMlib.changeElementAttr(_dayId, "style", {"background" : "yellow"});
    }
};

var printWeek = function(_weeknumber, _yearnumber){
    var weekId = "week" + _weeknumber;
    var weekStartingDate = dateFunctions.getDateOfWeekNumber(_weeknumber, _yearnumber);

    createWeekWrapper(weekId);

    for(var i = 1; i <=7; i++){
        var dayId = "date" + weekStartingDate.getDate();
        var cellInfo = dateFunctions.getDayName(weekStartingDate.getDay()) + ", " + weekStartingDate.getDate();

        createDayCell(weekId, dayId, cellInfo);
        colorCell(weekStartingDate, dayId);

        weekStartingDate.setDate(weekStartingDate.getDate() + 1);
    }

    DOMlib.changeinnerHTML("currently-showing", "Currently showing: Week " + _weeknumber + " of " + _yearnumber);
};

var printMonth = function(_month, _year){
    var date = new Date(_year, _month, 1);
    var daysInMonth = dateFunctions.getMonthDays(_month + 1, _year);

    weekIdCounter = dateFunctions.getWeekNumber(date) + 1;
    var weekId = "week" + weekIdCounter;

    createWeekWrapper(weekId);

    for(var i = 1; i <= daysInMonth; i++){
        dayId = "day" + i;
        var cellInfo = dateFunctions.getDayName(date.getDay()) + ", " + date.getDate();

        createDayCell(weekId, dayId, cellInfo);
        colorCell(date, dayId);

        date.setDate(date.getDate() + 1);

        if(i % 7 == 0){
            weekIdCounter++;
            weekId = "week" + weekIdCounter;

            createWeekWrapper(weekId);
        }
    }    

    DOMlib.changeinnerHTML("currently-showing", "Currently showing: " + dateFunctions.getMonthName(_month) + " " + _year);
};

actionGetCurrentWeek.addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById("calender-cells-wrapper").innerHTML = "";

    var currentDate = new Date();

    var searchedWeek = dateFunctions.getWeekNumber(currentDate);
    var searchedYear = currentDate.getFullYear();

    printWeek(searchedWeek, searchedYear);
});

actionGetCurrentMonth.addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById("calender-cells-wrapper").innerHTML = "";

    var currentDate = new Date();

    var searchedMonth = currentDate.getMonth();
    var searchedYear = currentDate.getFullYear();

    printMonth(searchedMonth, searchedYear);
});

actionGetSpecificWeek.addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById("calender-cells-wrapper").innerHTML = "";
    
    var searchedWeek = DOMlib.get("week-input").value;
    var searchedYear = DOMlib.getAll(".year-input")[0].value;

    if(searchedWeek > 53 || searchedWeek < 1 || searchedYear < 1980){
        alert("Input data is not in correct range. Enter a week number between 1 and 53. Enter a year higher than 1979.");

        DOMlib.get("week-input").value = "";
        DOMlib.getAll(".year-input")[0].value = "";
        DOMlib.changeinnerHTML("currently-showing", "Currently showing: ");

        return;
    }

    printWeek(searchedWeek, searchedYear);

    DOMlib.get("week-input").value = "";
    DOMlib.getAll(".year-input")[0].value = "";
});

actionGetSpecificMonth.addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById("calender-cells-wrapper").innerHTML = "";

    var searchedMonth = DOMlib.get("month-input").selectedIndex;
    var searchedYear = DOMlib.getAll(".year-input")[1].value;

    if(searchedYear < 1900){
        alert("Input data is not in correct range. Enter a year higher than 1979.");

        DOMlib.get("month-input").selectedIndex = 0;
        DOMlib.getAll(".year-input")[1].value = "";
        DOMlib.changeinnerHTML("currently-showing", "Currently showing: ");

        return;
    }

    printMonth(searchedMonth, searchedYear);

    DOMlib.get("month-input").selectedIndex = 0;
    DOMlib.getAll(".year-input")[1].value = "";
});

actionGetPrevMonth.addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById("calender-cells-wrapper").innerHTML = "";
    var infoString = DOMlib.get("currently-showing").innerText.split(" ");

    if(infoString.length == 2 || infoString.length == 6){
        alert("Please choose a specific or current month first.");
        return;
    }

    var searchedMonth = dateFunctions.getMonthNumber(infoString[2]) - 1;
    var searchedYear = infoString[3];

    if(searchedMonth < 0){
        searchedMonth = 11;
        searchedYear--;
    }
    
    printMonth(searchedMonth, searchedYear);
});

actionGetNextMonth.addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById("calender-cells-wrapper").innerHTML = "";
    var infoString = DOMlib.get("currently-showing").innerText.split(" ");

    if(infoString.length == 2 || infoString.length == 6){
        alert("Please choose a specific or current month first.");
        return;
    }

    var searchedMonth = dateFunctions.getMonthNumber(infoString[2]) + 1;
    var searchedYear = infoString[3];

    if(searchedMonth > 11){
        searchedMonth = 0;
        searchedYear++;
    }
    
    printMonth(searchedMonth, searchedYear);
});

actionGetPrevYear.addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById("calender-cells-wrapper").innerHTML = "";
    var infoString = DOMlib.get("currently-showing").innerText.split(" ");

    var searchedWeek;
    var searchedMonth;
    var searchedYear;

    if(infoString.length == 2){
        alert("Please choose a specific or current month or week first.");
        return;
    }
    else if(infoString.length == 4){
        searchedMonth = dateFunctions.getMonthNumber(infoString[2]);
        searchedYear = infoString[3] - 1;

        printMonth(searchedMonth, searchedYear);
    }
    else if(infoString.length == 6){
        searchedWeek = infoString[3];
        searchedYear = infoString[5] - 1;

        printWeek(searchedWeek, searchedYear);
    }
});

actionGetNextYear.addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById("calender-cells-wrapper").innerHTML = "";
    var infoString = DOMlib.get("currently-showing").innerText.split(" ");

    var searchedWeek;
    var searchedMonth;
    var searchedYear;

    if(infoString.length == 2){
        alert("Please choose a specific or current month or week first.");
        return;
    }
    else if(infoString.length == 4){
        searchedMonth = dateFunctions.getMonthNumber(infoString[2]);
        searchedYear = parseInt(infoString[3], 10) + 1;

        printMonth(searchedMonth, searchedYear);
    }
    else if(infoString.length == 6){
        searchedWeek = infoString[3];
        searchedYear = parseInt(infoString[5], 10) + 1;

        printWeek(searchedWeek, searchedYear);
    }
});
