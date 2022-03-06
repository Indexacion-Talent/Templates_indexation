/* ---------------------- recruiting.ultipro ----------------------------------*/

/* ---------------------- EXTRACT ---------------------------------------------*/

(function () {
    var out = {};
    var html_jobs = document.querySelectorAll("#Opportunities > div:nth-child(3) > div");
    var jobs = []; for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.querySelector("div:nth-child(1) > div.col-lg-20.col-md-19.col-sm-18.col-xs-18 > h3 > a").textContent.trim();
        job.url = elem.querySelector("div:nth-child(1) > div.col-lg-20.col-md-19.col-sm-18.col-xs-18 > h3 > a").href.trim();
        job.location = elem.querySelector("div:nth-child(3) > div.col-lg-20.col-md-19.col-sm-18.col-xs-16 > div > div > candidate-physical-location > address > span:nth-child(5) > span").textContent.trim();
        job.dateposted_raw = elem.querySelector("div:nth-child(1) > div.col-lg-4.col-md-5.col-sm-6.col-xs-6.text-right > h3").textContent.trim();
        var day = job.dateposted_raw.split(" ")[1].replace(",", " ").trim();
        var month = job.dateposted_raw.split(" ")[0];
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
        var year = job.dateposted_raw.split(", ")[1];
        job.dateposted_raw = month + "/" + day + "/" + year;
        job.reqid = elem.querySelector("div:nth-child(2) > div:nth-child(2) > span > span").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        job.source_jobtype = elem.querySelector("div:nth-child(2) > div:nth-child(3) > span > span").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();
        job.temp = 1;
        jobs.push(job);
    }

    out["jobs"] = jobs;
    return out;
})();



/* ------------------------ INFINITY PAGINATION -------------------------------------------- */

(function () {
    var out = {};
    var selector = "span:not([style*='display: none;']) > a#LoadMoreJobs";
    var partial_text = "";
    out["has_next_page"] = false;

    var all_elems = document.querySelectorAll(selector);
    [].forEach.call(all_elems, function (elemento) {
        if (out["has_next_page"]) return out;
        if (elemento.textContent.trim().indexOf(partial_text) != -1) {
            elemento.click();
            out["has_next_page"] = true;
        }
    });

    out["wait"] = true;
    return out;
})();


/* ---------------------------------  JOB DESCRIPTION -------------------------------------------------- */

(function () {
    var out = {};
    var job = {};
    var selector = "#opportunityDetailView > div:nth-child(3) > div > div > div > div.col-md-18";
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => { if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove(); });
    if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
    if (typeof msg == "undefined") msg = console.log;

    job.html = full_html.innerHTML.trim();
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    //job.html = removeTextAfter(job.html, 'Application Instructions', true);
    job.html = cleanHTML(job.html);
    var tmp = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);
    out["job"] = job;
    return out;

})();
function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
            newHtml = "<h3>" + text + "</h3>" + newHtml;
        }
    }
    return newHtml;
}
function removeTextAfter(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).shift();
        if (!flag) {
            newHtml = newHtml + "<p>" + text + "</p>";
        }
    }
    return newHtml;
}