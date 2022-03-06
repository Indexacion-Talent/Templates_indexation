/* ------------------------- BEFORE EXTRACT ----------------------------------------- */

(function () {
    var out = {};
    out.waitFor = "div.jscroll-inner div.oracletaleocwsv2-accordion.oracletaleocwsv2-accordion-expandable"
    return out;
})();


/* ------------------------------------ EXTRACT -------------------------------------------------- */

(function () {
    var out = {};
    var html_jobs = document.querySelectorAll("div.jscroll-inner div.oracletaleocwsv2-accordion.oracletaleocwsv2-accordion-expandable");
    var jobs = []; for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.querySelector("div > div.oracletaleocwsv2-accordion-head > div.oracletaleocwsv2-accordion-head-info > h4 > a").textContent.trim();
        job.url = elem.querySelector("div > div.oracletaleocwsv2-accordion-head > div.oracletaleocwsv2-accordion-head-info > h4 > a").href.trim();
        job.location = elem.querySelector("div > div.oracletaleocwsv2-accordion-head > div.oracletaleocwsv2-accordion-head-info > div:nth-child(2)").textContent.trim();
        job.reqid = job.url.split("&rid=")[1];
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        job.source_jobtype = elem.querySelector("div > div.oracletaleocwsv2-accordion-head > div.oracletaleocwsv2-accordion-head-info > div:nth-child(4)").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();
        job.temp = 1;
        jobs.push(job);
    }

    out["jobs"] = jobs;
    return out;
})();


/* ------------------------------------------ PAGINATION ------------------------------------------------------------ */

(function() {
    var out = {};  
    out["has_next_page"] = false;  
    out["wait"] = false;
    return out;
})();


/* -------------------------------------- INFINITY PAGINATION ----------------------------------------------------- */

(function () {
    var out = {};

    msg(pass_it);
    if (!pass_it["heights"]) out["pass_it"] = { "heights": [] };
    else out["pass_it"] = pass_it;

    out["has_next_page"] = true;
    if (out["pass_it"]["heights"].length > 3) {
        var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3);
        if (last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])
            out["has_next_page"] = false;
    }

    window.scrollBy(0, document.body.scrollHeight);

    out["wait"] = true;
    //out["pic"] 	= true;
    //out["html"] 	= true;
    out["pass_it"]["heights"].push(document.body.scrollHeight);
    return out;
})();




