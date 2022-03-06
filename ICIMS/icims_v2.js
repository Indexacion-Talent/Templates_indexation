(function () {
    var out = {};
    var minSalary;
    var maxSalary;
    out["wait"] = true;
    var jobsSelector = "body > div.iCIMS_MainWrapper.iCIMS_ListingsPage > div.container-fluid.iCIMS_JobsTable > div.row";
    var returnedJobs = [];
    var html_jobs = [];
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = console.log;
    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 0,
            "jobs": 0
        };
    } else {
        out["pass_it"] = pass_it;
    }
    var iframe_selector = "iframe#icims_content_iframe";
    var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
    html_jobs = iframeDocument.querySelectorAll(jobsSelector);
    for (var x in html_jobs) {
        var job = {};
        var elem = html_jobs[x];
        if (typeof elem == "function") continue;
        if (typeof elem == "number") continue;
        job.title = elem.querySelector("div.col-xs-12.title > a > h2").textContent.trim();
        job.url = elem.querySelector("div.col-xs-12.title > a").href.trim();
        job.location = "Glasglow";
        elem.querySelectorAll("div.iCIMS_JobHeaderGroup > dl").forEach(e => {
            if (e.textContent.trim().includes("Location")) {
                job.location = e.textContent.trim().replace(/\s+/gi, ' ').replace("Location ", "");
            }
        }
        );

        elem.querySelectorAll("div.iCIMS_JobHeaderGroup > dl").forEach(e => {
            if (e.textContent.trim().includes("Job ID")) {
                job.reqid = e.textContent.trim().replace(/\s+/gi, ' ').replace("Job ID ", "");
            }
        }
        );

        elem.querySelectorAll("div.iCIMS_JobHeaderGroup > dl").forEach(e => {
            if (e.textContent.trim().includes("Min")) {
                minSalary = e.textContent.trim().replace(/\s+/gi, ' ');
            }
        }
        );

        elem.querySelectorAll("div.iCIMS_JobHeaderGroup > dl").forEach(e => {
            if (e.textContent.trim().includes("Max")) {
                maxSalary = e.textContent.trim().replace(/\s+/gi, ' ');
            }
        }
        );

        job.source_salary = minSalary + " - " + maxSalary;


        job.dateposted_raw = elem.querySelector("div.col-xs-6.header.right > span:nth-child(2)").getAttribute("title").trim().split(" ")[0].split("/");
        job.dateposted_raw = job.dateposted_raw[1] + "/" + job.dateposted_raw[0] + "/" + job.dateposted_raw[2];
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        //job.source_jobtype = elem.querySelector("div.col-xs-12.additionalFields > div > dl:nth-child(3) > dd > span").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();

        job.temp = "223456-656554-2334";
        returnedJobs.push(job);
    }

    out["pass_it"]["jobs"] = returnedJobs.length;
    out["jobs"] = returnedJobs;
    return out;
})();