/* ------------------- fecha v1 ------------------------------- */

if (month == "January") {
    month = "1";
} else if (month == "February") {
    month = "2";
} else if (month == "March") {
    month = "3";
} else if (month == "April") {
    month = "4";
} else if (month == "May") {
    month = "5";
} else if (month == "June") {
    month = "6";
} else if (month == "July") {
    month = "7";
} else if (month == "August") {
    month = "8";
} else if (month == "September") {
    month = "9";
} else if (month == "October") {
    month = "10";
} else if (month == "November") {
    month = "11";
} else if (month == "December") {
    month = "12";
}


/* ------------------------------ fecha v2 ------------------------------------- */

var month = job.dateposted_raw.split(" ")[0];
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


/*--------------MESES EN NEETHERLANDS -------------------------- */

if (month == "januari") {
    month = "1";
} else if (month == "februari") {
    month = "2";
} else if (month == "maart") {
    month = "3";
} else if (month == "april") {
    month = "4";
} else if (month == "mei") {
    month = "5";
} else if (month == "juni") {
    month = "6";
} else if (month == "juli") {
    month = "7";
} else if (month == "augustus") {
    month = "8";
} else if (month == "september") {
    month = "9";
} else if (month == "oktober") {
    month = "10";
} else if (month == "november") {
    month = "11";
} else if (month == "december") {
    month = "12";
}





