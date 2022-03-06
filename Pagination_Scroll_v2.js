/* -------------------- BEFORE EXTRACT --------------------------------------*/

(function () {
    var out = {};
    out.waitFor = "[id*='win0div'] > div.ps_grid-list > ul > li[id*='HRS_AGNT_RSLT_I$0_row_']"
    return out;
})();


/* ------------------------- EXTRACT ------------------------------------------- */

(function () {
    var out = {};
    var html_jobs = document.querySelectorAll("[id*='win0div'] > div.ps_grid-list > ul > li[id*='HRS_AGNT_RSLT_I$0_row_']");
    var jobs = []; for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.querySelector("span[id*='SCH_JOB_TITLE']").textContent.trim();
        job.reqid = elem.querySelector("span[id*='HRS_APP_JBSCH_I_HRS_JOB_OPENING_ID']").textContent.trim();
        job.url = "https://recruit.jefferson.edu/psc/hcmp/EMPLOYEE/HRMS/c/HRS_HRAM_FL.HRS_CG_SEARCH_FL.GBL?Page=HRS_APP_JBPST_FL&Action=U&FOCUS=Applicant&SiteId=1&JobOpeningId=" + job.reqid + "&PostingSeq=1";
        job.location = elem.querySelector("span[id*='LOCATION']").textContent.trim();
        job.dateposted_raw = elem.querySelector("span[id*='SCH_OPENED']").textContent.trim();
        job.dateclosed_raw = elem.querySelector("span[id*='HRS_JO_PST_CLS']").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();
        job.temp = 1;
        jobs.push(job);
    }

    out["jobs"] = jobs;
    return out;
})();


/* ------------------------ INFINITY PAGINATION -------------------------------------- */


(function () {
    var out = {};
    var selectorscroll = "[id*='win0divHRS_AGNT_RSLT_I$grid']";
    var selectorjobs = "[id*='win0div'] > div.ps_grid-list > ul";
    msg(pass_it);
    if (!pass_it["jobs_lengths"]) out["pass_it"] = { "jobs_lengths": [] };
    else out["pass_it"] = pass_it;

    out["has_next_page"] = true;
    if (out["pass_it"]["jobs_lengths"].length > 3) {
        var last_three_jobs = out["pass_it"]["jobs_lengths"].slice(-3);
        if (last_three_jobs[0] == last_three_jobs[1] && last_three_jobs[1] == last_three_jobs[2])
            out["has_next_page"] = false;
    }

    //var next_page_selector = "div.container.job-list-wrapper > div.paginator > button";
    //var clickable_elem = document.querySelector(next_page_selector);  
    //if(clickable_elem)clickable_elem.click();      	


    //window.scrollBy(0, document.body.scrollHeight);   //ESTO SOLO FUNCIONA CUANDO EL SCROLL ES A TODA LA PÃGINA (BODY)
    document.querySelector(selectorscroll).scrollBy(0, document.querySelector(selectorscroll).scrollHeight)

    out["wait"] = true;
    out["pic"] = true;
    //out["html"]   = true;
    out["pass_it"]["jobs_lengths"].push(document.querySelectorAll(selectorjobs).length);
    return out;
})();


/* --------------------------------- JOB DESCRIPTION --------------------------------------------------- */

(function () {
    var out = {};
    var job = {};
    var selector = "[id*='win0divHRS_SCH_PSTDSC']";
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => { if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove(); });
    if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
    if (typeof msg == "undefined") msg = console.log;

    job.html = full_html.innerHTML.trim();
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    job.html = removeTextAfter(job.html, 'Closing Statement', true);
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