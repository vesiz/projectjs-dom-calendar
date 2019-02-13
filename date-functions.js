var dateFunctions = {
    
    // function used to get the the week number of a specified date
    // src: https://weeknumber.net/how-to/javascript

    getWeekNumber : function(_date) {
        var date = new Date(_date);

        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);

        var week1 = new Date(date.getFullYear(), 0, 4);

        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    },



    // function used to get the starting date of any week from given week number
    // scr: https://stackoverflow.com/questions/16590500/javascript-calculate-date-from-week-number

    getDateOfWeekNumber : function (_weekNumber, _year) {
        var days = ((_weekNumber - 1) * 7);
    
        return new Date(_year, 0, days);
    },

    getDayName : function(_number){
        switch(_number){
            case 0: return "Sun";
            case 1: return "Mon";
            case 2: return "Tue";
            case 3: return "Wed";
            case 4: return "Thu";
            case 5: return "Fri";
            case 6: return "Sat";
        }
    },

    getMonthName : function(_number){
        switch(_number){
            case 0:  return "January"  ;
            case 1:  return "February" ;
            case 2:  return "March"    ;
            case 3:  return "April"    ;
            case 4:  return "May"      ;
            case 5:  return "June"     ;
            case 6:  return "July"     ;
            case 7:  return "August"   ;
            case 8:  return "September";
            case 9:  return "October"  ;
            case 10: return "November" ;
            case 11: return "December" ;
        }
    },

    getMonthNumber : function(_name){
        switch(_name){
            case "January"   : return 0;
            case "February"  : return 1; 
            case "March"     : return 2;
            case "April"     : return 3; 
            case "May"       : return 4;
            case "June"      : return 5; 
            case "July"      : return 6; 
            case "August"    : return 7; 
            case "September" : return 8;
            case "October"   : return 9;
            case "November"  : return 10;
            case "December"  : return 11;

        }
    },

    getMonthDays : function(_month, _year){
        return new Date(_year, _month, 0).getDate();
    },
    

};
