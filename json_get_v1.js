/* ------------------- EXTRACT --------------------------------------*/
(function () {
    var out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    var element = document.querySelector("pre").textContent;
    var json = JSON.parse(element);
    var expected_jobs_str = json.total;
    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 0,
            "jobs": 0,
            "total_jobs": 104,
            "expected_jobs": expected_jobs_str
        };
    } else {
        out["pass_it"] = pass_it;
    }
    var jobs = json.data;
    var returnedJobs = [];
    for (i in jobs) {
        var job = {}; /*init*/
        job.title = jobs[i].title;
        job.url = "https://visionairepartners.com/wp-content/plugins/bullhorn-oscp/#/jobs/" + jobs[i].id;
        job.location = jobs[i].address.city + ", " + jobs[i].address.state;
        job.reqid = jobs[i].id;
        job.source_jobtype = jobs[i].employmentType;
        //job.dateposted_raw = jobs[i].dateLastPublished;
        //job.dateposted_raw = Date.parse();
        job.temp = 2;
        returnedJobs.push(job);
    }
    //msg(jobs);
    //msg(returnedJobs.length);
    out["pass_it"].jobs = returnedJobs.length;
    //out["pass_it"].total_jobs = out["pass_it"].total_jobs + out["pass_it"].jobs;
    out["jobs"] = returnedJobs;
    return out;
})();

/* ---------------------------------- PAGINATION ----------------------------------------------*/

(function () {
    var out = {};
    if (typeof msg == "undefined") msg = function (x) { return x; };
    out["pass_it"] = pass_it;
    if (out["pass_it"].expected_jobs <= (out["pass_it"].cont + 30)) {
        out["has_next_page"] = false;
    } else if (out["pass_it"].jobs > 0) {
        out["pass_it"].cont += 30;
        var url = "https://public-rest33.bullhornstaffing.com/rest-services/17EG1/search/JobOrder?start=" + out["pass_it"].cont + "&query=(isOpen:1)%20AND%20(isDeleted:0)&fields=id,title,publishedCategory(id,name),address(city,state,countryName),employmentType,dateLastPublished,publicDescription,isOpen,isPublic,isDeleted,publishedZip,salary,salaryUnit&count=30&sort=-dateLastPublished&showTotalMatched=true";
        //msg('\x1b[32m URL--> ' + url);
        window.location.href = url;
        out["has_next_page"] = true;
    }
    out.waitFor = 'pre';
    return out;
})();

/* ----------------------------------------- JOB DESCRIPTION --------------------------------------------------------- */

(function () {
    var out = {};
    var job = {};
    var selector = "body > app-root > div > app-job-details > div > div > div.job-description-text";
    var remove_selectors = [];
    job.dateposted_raw = document.querySelector("body > app-root > div > app-job-details > div > div > div.job-header > div > span:nth-child(3)").textContent.trim();
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
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => { if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove(); });
    if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
    if (typeof msg == "undefined") msg = console.log;

    job.html = full_html.innerHTML.trim();
    job.html = removeTextBefore(job.html, 'RESPONSIBILITIES:', false);
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
