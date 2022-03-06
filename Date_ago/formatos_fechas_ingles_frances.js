function dateFrench(month) {
    if (month == "January" || month == "janvier") {
        month = "1";
    } else if (month == "February" || month == "février") {
        month = "2";
    } else if (month == "March" || month == "Mars") {
        month = "3";
    } else if (month == "April" || month == "avril") {
        month = "4";
    } else if (month == "May" || month == "Mai") {
        month = "5";
    } else if (month == "June" || month == "juin") {
        month = "6";
    } else if (month == "July" || month == "juillet") {
        month = "7";
    } else if (month == "August" || month == "août") {
        month = "8";
    } else if (month == "September" || month == "septembre") {
        month = "9";
    } else if (month == "October" || month == "Octobre") {
        month = "10";
    } else if (month == "November" || month == "novembre") {
        month = "11";
    } else if (month == "December" || month == "décembre") {
        month = "12";
    }
    return month;
}