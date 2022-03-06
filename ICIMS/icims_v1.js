/* --------------- BEFORE EXTRACT ------------ */

(function () {
    var out = {};
    out.iframeSelector = "iframe#icims_content_iframe"
    out.iframeWaitFor = "body > div.iCIMS_MainWrapper.iCIMS_ListingsPage > div.container-fluid.iCIMS_JobsTable > div.row" // se pone el selector de una de las cajas de los jobs, en este caso fue el titulo del job 
    return out;
})();


/* --------- EXTRACT ------------ */

(function () {
    var out = {};

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
        job.reqid = elem.querySelector("div.col-xs-12.additionalFields > div > dl:nth-child(1) > dd > span").textContent.trim();
        job.location = elem.querySelector("div.col-xs-12.additionalFields > div > dl:nth-child(2) > dd > span").textContent.trim().split("-").reverse().join(", ").trim();
        job.dateposted_raw = elem.querySelector("div.col-xs-6.header.right > span:nth-child(2)").getAttribute("title").trim().split(" ").shift().trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        job.source_jobtype = elem.querySelector("div.col-xs-12.additionalFields > div > dl:nth-child(3) > dd > span").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();

        job.temp = 20210803;
        returnedJobs.push(job);
    }

    out["pass_it"]["jobs"] = returnedJobs.length;
    out["jobs"] = returnedJobs;
    return out;
})();


/* -------------------- PAGINATION ------------------- */


(function () {
    var out = {};
    var iframe_selector = "iframe#icims_content_iframe";
    var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;

    var next_page_selector = "li.pagination__item.pagination__item--current.pagination__item--page +li >a"; //selector to identify the next button	 	
    var clickable_elem = iframeDocument.querySelector(next_page_selector);

    if (clickable_elem) {
        //go to next page
        clickable_elem.click();
        out["has_next_page"] = true;
    } else {
        //try again
        out["has_next_page"] = false;
    }

    out.waitFor = "";
    return out;
})();


/* --------------------- JOB DESCRIPTION --------------------------- */


(function () {
    var out = {};
    var job = {};
    var selector = "div.iCIMS_MainWrapper.iCIMS_JobPage.iCIMS_Desktop  div.iCIMS_JobContent";
    var remove_selector = "body > div.iCIMS_MainWrapper.iCIMS_JobPage.iCIMS_Desktop > div.iCIMS_JobContainer > div.iCIMS_JobContent > div.container-fluid.iCIMS_JobsTable > div > div.col-xs-12.additionalFields > div";
    //var job = pass_it["job"];
    var iframe_selector = "iframe#icims_content_iframe";
    var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
    if (iframeDocument.querySelector("body > div.iCIMS_MainWrapper.iCIMS_JobPage.iCIMS_Desktop > div.iCIMS_JobContainer > div.iCIMS_JobContent > div.container-fluid.iCIMS_JobsTable > div > div.col-xs-12.additionalFields > div > dl:nth-child(3) > dd > span")) {
        job.source_jobtype = iframeDocument.querySelector("body > div.iCIMS_MainWrapper.iCIMS_JobPage.iCIMS_Desktop > div.iCIMS_JobContainer > div.iCIMS_JobContent > div.container-fluid.iCIMS_JobsTable > div > div.col-xs-12.additionalFields > div > dl:nth-child(3) > dd > span").textContent.trim();
        //job.location =  iframeDocument.querySelector("div > div.col-xs-6.header.left > span:nth-child(2)").textContent.trim().split("-").reverse().join(", ").trim();
    }
    var full_html = iframeDocument.querySelector(selector);

    job.html = full_html.innerHTML.trim();
    //To view all benefits offered by Room & Board, please visit:
    job.html = cleanHTML(job.html);
    job.html = removeTextBefore(job.html, "Overview", false);
    job.html = removeTextAfter(job.html, "#", true);
    job.html = removeTextAfter(job.html, "Options", true);
    //job.html = removeTextAfter(job.html, "At ViacomCBS, the spirit of inclusion feed", true);
    //job.html = removeTextAfter(job.html, "At ViacomCBS, the spirit of inclusion feeds", true);    

    job.html = cleanHTML(job.html);
    var tmp = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);

    out["job"] = job;
    return out;
    function removeTextBefore(html, text, flag) {
        var newHtml = html;
        if (newHtml.indexOf(text) > -1) {
            newHtml = newHtml.split(text).pop();
            if (!flag) {
                newHtml = text + " " + newHtml;
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
})();


/* ---- extraer variables icims en las descripciones */

for (const dl of iframeDocument.querySelectorAll("div.col-xs-12.additionalFields > div > dl")) {
    if (dl.textContent.trim().includes("Position Number")) {
        job.reqid = dl.querySelector("dd").textContent.trim();
    }
    if (dl.textContent.trim().includes("Employment Type")) {
        job.source_jobtype = dl.querySelector("dd").textContent.trim();
    }
    if (dl.textContent.trim().includes("Closing Date")) {
        let dateclosed = dl.querySelector("dd").textContent.trim();
        if (dateclosed.match(/[0-9]/)) {
            job.daclosed_raw = dateclosed;
        }
    }

}


/* Paginacion alternativa  */


(function () {
    var out = {};
    //out["pic"]=true;
    var jobs_number = 50;    // n�mero de jobs por p�gina. Jobs amount per page
    var url_base = "https://careers-perficient.icims.com/jobs/search?pr=";
    var selector = "a.glyph.invisible > span.halflings-menu-right";

    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = console.log;

    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 0,
            "jobs": jobs_number
        };
    } else {
        out["pass_it"] = pass_it;
    }

    var iframe_selector = "#icims_iframe_span > iframe";
    var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
    //msg(document.querySelector(selector));
    if (iframeDocument.querySelector(selector)) {
        // condici�n de parada. Stop condition
        out["has_next_page"] = false;
    } else if (out["pass_it"]["jobs"] > 0) {
        out["pass_it"].cont += 1;
        var url = url_base + out["pass_it"].cont;

        window.location.href = url;
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = true;
    }

    out["wait"] = true;
    return out;
})();






