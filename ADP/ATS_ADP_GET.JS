/* --------------------Extract----------------- */ 


(function () {
    var out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    var element = document.querySelector("pre").textContent;
    var json = JSON.parse(element);
    var expected_jobs_str = json.meta.totalNumber;
    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 1,
            "jobs": 0,
            //"total_jobs":0,
            "expected_jobs": expected_jobs_str
        };
    } else {
        out["pass_it"] = pass_it;
    }
    var jobs = json.jobRequisitions;
    var returnedJobs = [];
    for (i in jobs) {
        var job = {}; /*init*/
        if (typeof jobs[i].requisitionTitle != 'undefined') {
            job.title = jobs[i].requisitionTitle;
            job.title = job.title.replace(/\([^)]*\)/g, "").replace(/[.*+?^${}()|[\]\\]/g, "").trim();
            job.title = job.title.replace(/part time|full time|part-time|full-time|H\/F/gi, '').trim();
            if (jobs[i].requisitionLocations[0]) {
                if (jobs[i].requisitionLocations[0].nameCode.shortName) {
                    job.location = jobs[i].requisitionLocations[0].nameCode.shortName;
                } else if (jobs[i].requisitionLocations[0].address.cityName)
                    job.location = jobs[i].requisitionLocations[0].address.cityName;
            } else {
                job.location = 'Moncton, Canada';
            }
            //if(job.location)job.location +=', Canada';
            job.dateposted_raw = jobs[i].postDate;
            if (job.title && jobs[i].workLevelCode) {
                job.source_jobtype = jobs[i].workLevelCode.shortName;
            }
            let id = jobs[i].customFieldGroup.stringFields[0].stringValue;
            job.url = "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=a5d768f8-9498-4650-940d-bf5e9cba3859&ccId=19000101_000001&jobId=" + id + '&lang=en_US&source=TW';

            job.temp = 9900159999;
            returnedJobs.push(job);
        }
    }
    //msg(jobs);
    //msg(returnedJobs.length);
    out["pass_it"].jobs = returnedJobs.length;
    //out["pass_it"].total_jobs = out["pass_it"].total_jobs + out["pass_it"].jobs;
    out["jobs"] = returnedJobs;
    return out;
})();


/* ----------------------------------- PAGINATION ------------------------------------------ */

(function () {
    var out = {};
    if (typeof msg == "undefined") msg = function (x) { return x; };
    out["pass_it"] = pass_it;
    if (out["pass_it"].expected_jobs <= (out["pass_it"].cont + 20)) {
        out["has_next_page"] = false;
    } else if (out["pass_it"].jobs > 0) {
        out["pass_it"].cont += 20;
        var url = "https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions?cid=a5d768f8-9498-4650-940d-bf5e9cba3859&timeStamp=1581698537927&lang=en_US&ccId=19000101_000001&locale=en_US&$skip=" + out["pass_it"].cont;
        msg('\x1b[32m URL--> ' + url);
        window.location.href = url;
        out["has_next_page"] = true;
    }
    out.waitFor = 'pre';
    return out;
})();


/* --------------------------------------- JOB DESCRIPTION --------------------------------------- */

(function () {
    var out = {};
    var job = {};
    var selector = "div.job-description-data";
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => { if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove(); });
    if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
    if (typeof msg == "undefined") msg = console.log;
    if (document.querySelector('span.job-description-salary')) {
        job.source_salary = document.querySelector('span.job-description-salary').textContent.trim();
    }
    job.html = full_html.innerHTML.trim();
    job.html = removeTextBefore(job.html, "The Opportunity", false);
    job.html = removeTextBefore(job.html, "Job Description", false);
    job.html = removeTextAfter(job.html, "The Rewards", true);
    //Organizational Structure:

    var temp_html = document.createElement("div");
    temp_html.innerHTML = job.html;
    job.jobdesc = temp_html.textContent.trim();
    job.html = cleanHTML(job.html);
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



