/* ------------------- fecha v1 ------------------------------- */

if (month == "Januar") {
    month = "1";
} else if (month == "Februar") {
    month = "2";
} else if (month == "März") {
    month = "3";
} else if (month == "April") {
    month = "4";
} else if (month == "Kann") {
    month = "5";
} else if (month == "Juni") {
    month = "6";
} else if (month == "Juli") {
    month = "7";
} else if (month == "August") {
    month = "8";
} else if (month == "September") {
    month = "9";
} else if (month == "Oktober") {
    month = "10";
} else if (month == "November") {
    month = "11";
} else if (month == "Dezember") {
    month = "12";
}




/* ------------------------------ fecha v2 ------------------------------------- */
var day = job.dateposted_raw.split(" ")[1].replace(",", " ").trim();
var month = job.dateposted_raw.split(" ")[0];
var year = job.dateposted_raw.split(", ")[1];
month = Formatmonth(month);
job.dateposted_raw = month + "/" + day + "/" + year;

function Formatmonth(month) {
    if (month == "Jan") {
        month = "1";
    } else if (month == "Feb") {
        month = "2";
    } else if (month == "Mar") {
        month = "3";
    } else if (month == "Apr") {
        month = "4";
    } else if (month == "May") {
        month = "5";
    } else if (month == "Jun") {
        month = "6";
    } else if (month == "Jul") {
        month = "7";
    } else if (month == "Aug") {
        month = "8";
    } else if (month == "Sep") {
        month = "9";
    } else if (month == "Oct") {
        month = "10";
    } else if (month == "Nov") {
        month = "11";
    } else if (month == "Dec") {
        month = "12";
    }

    return month;
}