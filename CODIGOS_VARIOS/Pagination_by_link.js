/* -------------------------- EXTRACT ------------------------------ */

var jobs = [];

if (typeof pass_it == "undefined") pass_it = {};
if (typeof msg == "undefined") msg = console.log;

if (!pass_it["cont"]) {
    out["pass_it"] = {
        "cont": 0,
        "limit": 7,
        "flag": true
    };
} else {
    out["pass_it"] = pass_it;
}


/* --------------------- PAGINATION --------------------------------------------- */
(function () {
    var out = {};
    out["pass_it"] = pass_it;

    msg(out["pass_it"].limit + " --> " + out["pass_it"].cont);

    if (out["pass_it"].limit > out["pass_it"].cont) {
        //if( out["pass_it"].flag){
        out["pass_it"].cont += 1;
        let url = "https://avalign.com/careers-open-positions.php?p=" + out["pass_it"].cont;
        //let url = "https://elcn.fa.us2.oraclecloud.com/hcmRestApi/resources/latest/recruitingCEJobRequisitions?onlyData=true&expand=requisitionList.secondaryLocations,flexFieldsFacet.values&finder=findReqs;siteNumber=CX,facetsList=LOCATIONS%3BWORK_LOCATIONS%3BTITLES%3BCATEGORIES%3BPOSTING_DATES%3BFLEX_FIELDS,limit=24,offset="+ out["pass_it"].cont;
        window.location.href = url;
        out["has_next_page"] = true;
    } else {
        //try again
        out["has_next_page"] = false;
    }



    out.waitFor = "";
    return out;
})();


(function () {
    var out = {};
    out["pass_it"] = pass_it;

    msg(out["pass_it"].limit + " --> " + out["pass_it"].cont);

    if (out["pass_it"].limit > out["pass_it"].cont) {
        //if( out["pass_it"].flag){
            out["pass_it"].cont += 1;
        var next_page_selector = 'a[title="Go to page' + out["pass_it"].cont+ '"]';
        msg(next_page_selector);
        var clickable_elem = document.querySelector(next_page_selector);
        if (clickable_elem) {
            //go to next page
            clickable_elem.click();
            out["has_next_page"] = true;
        } else {
            //try again
            out["has_next_page"] = true;
        }
    } else {
        //try again
        out["has_next_page"] = false;
    }
    out.waitFor = "";
    return out;
})();
