/* ------------------------------------------ BEFORE EXTRACT ----------------------------------------------------*/

(function () {
    var out = {};
    var selector_jobs = "div.jobs-list > div.job-item.job-items-4.clearfix";
    var selector_desc = "#job > div.job-description";
    var selec_btn_paginac = 'li.paging-item.paging-item-active +li >a';
    //var selector_click_Job = "a";
    if (typeof pass_it == "undefined")
        pass_it = {};
    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 0,
            "salir": false,
            "pagination": false,
            "selec_btn_paginac": selec_btn_paginac,
            "selector_jobs": selector_jobs,
            // "selector_click_Job": selector_click_Job,
            "selector_desc": selector_desc
        };
    } else {
        out["pass_it"] = pass_it;
    }

    msg(document.querySelectorAll(out["pass_it"]["selector_jobs"]).length);
    msg("Current jobs--> " + [out["pass_it"]["cont"]]);

    var elemento = out["pass_it"]["selector_jobs"];
    var elem = document.querySelectorAll(elemento)[out["pass_it"]["cont"]];
    if (elem) {
        var title = elem.querySelector("div.job-item-job-title.has-data > span").textContent.trim();
        //var url = elem.querySelector("").href.trim();
        var location = elem.querySelector("div.job-item-detail.job-item-location.has-data.has-next > span").textContent.trim();
        //var reqid = elem.querySelector("[id*='p'] > li.title > span").textContent.trim().split(": ")[1];
        /*var fecha = elem.querySelector("div.job-item-detail.job-item-location.has-data.has-next > span").textContent.trim().split("/");
        var dateposted_raw = fecha[1]+'/'+fecha[0]+'/'+fecha[2];*/
        var dateposted_raw = elem.querySelector("div.job-item-detail.job-item-post-date.has-data > span").textContent.trim();
        var day = dateposted_raw.split(" ")[1].replace(",", " ").trim();
        var month = dateposted_raw.split(" ")[0];
        var year = dateposted_raw.split(", ")[1];
        dateposted_raw = month + "/" + day + "/" + year;
        //var dateclosed_raw = elem.querySelector("").textContent.trim();       
        //var logo = elem.querySelector("").getAttribute("src").trim();
        //var source_apply_email = elem.querySelector("").textContent.trim();
        //var source_empname = elem.querySelector("").textContent.trim();
        var source_jobtype = elem.querySelector("div.job-item-detail.job-item-job-type.has-data.has-next > span").textContent.trim();
        //var source_salary = elem.querySelector("").textContent.trim();
        out["pass_it"]["title"] = title;
        out["pass_it"]["location"] = location;
        //out["pass_it"]["reqid"] = reqid;
        //out["pass_it"]["url"] = url;
        out["pass_it"]["dateposted_raw"] = dateposted_raw;
        //out["pass_it"]["dateclosed_raw"] = dateclosed_raw;
        //out["pass_it"]["logo"] = logo;
        //out["pass_it"]["source_apply_email"] = source_apply_email;  
        //out["pass_it"]["source_empname"] = source_empname; 
        out["pass_it"]["source_jobtype"] = source_jobtype;
        //out["pass_it"]["source_salary"] = source_salary;
        if (typeof (selector_click_Job) == 'undefined') {
            elem.click();
            out.waitFor = out["pass_it"]["selector_desc"];
        } else {
            elem.querySelector(selector_click_Job).click();
            out.waitFor = out["pass_it"]["selector_desc"];
        }

    } else {
        msg("Ultimo job o/ no tiene jobs");
        msg(elemento);
        msg(elem);
        if (document.querySelector(out["pass_it"].selec_btn_paginac)) {
            msg('Hay paginacion')
            out["pass_it"]["paginacion"] = true;
        } else if (!elem) {
            out["pass_it"]["salir"] = true;
        }
    }

    out.waitFor = "#job > div.job-description"; // --> selector de la descripcion
    out["wait"] = true;
    out.pic = true;
    out.html = true;
    return out;
})();


/* ------------------------------------ EXTRACT -------------------------------------------------- */

(function () {
    var out = {};
    var jobs = [];
    out["pass_it"] = pass_it;

    if (out["pass_it"]["salir"]) {
        var job = {};
        job.title = 'BOO';
        jobs.push(job);
    } else {
        // msg(out["pass_it"]["selector"]);
        if (document.querySelector(out["pass_it"]["selector_desc"])) {
            var job = {};
            var remove_selectors = ["a", "script", "style"];
            job.title = out["pass_it"]["title"];
            job.location = out["pass_it"]["location"];
            //job.reqid = out["pass_it"]["reqid"];
            job.url = document.querySelector("#job > div.job-url > a").href.trim();
            job.dateposted_raw = out["pass_it"]["dateposted_raw"];
            //job.dateclosed_raw = out["pass_it"]["dateclosed_raw"];    
            //job.logo = out["pass_it"]["logo"];
            //job.source_apply_email = out["pass_it"]["source_apply_email"];
            //job.source_empname = out["pass_it"]["source_empname"];
            job.source_jobtype = out["pass_it"]["source_jobtype"];
            //job.source_salary = out["pass_it"]["source_salary"];
            var full_html = document.querySelector(out["pass_it"]["selector_desc"]);
            // remove something from the jobdatata
            if (remove_selectors.length > 0) {
                remove_selectors.forEach(remove_selector => {
                    let salir
                    do {
                        salir = false;
                        if (full_html.querySelector(remove_selector)) {
                            full_html.querySelector(remove_selector).remove();
                            salir = true;
                        }
                    } while (salir);
                });
            }

            job.html = full_html.innerHTML.trim();
            //job.html = removeTextAfter(job.html, "Loading...", false);
            //job.html = removeTextAfter(job.html, "Loading...", false);
            //job.html = job.html.replace("Loading...", "").trim();
            //job.jobdesc = removeTextBefore(job.html, "", false);
            //job.html = removeTextAfter(job.html, "", true);
            //job.jobdesc = removeTextAfter(job.html, "", true);
            job.html = cleanHTML(job.html);
            var tmp = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim();
            job.jobdesc = cleanHTML(job.jobdesc);
            job.temp = 1;
            jobs.push(job);
        } else

            msg("Description selector not found");
    }
    //out["pic"] = true;
    out.waitFor = "div.jobs-list > div.job-item.job-items-4.clearfix"
    out["jobs"] = jobs;
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


/* -------------------------------------- PAGINATION SIMPLE --------------------------------------------------- */

(function () {
    var out = {};
    out["pass_it"] = pass_it;
    out["pass_it"].cont += 1;

    //window.location.href = 'https://hire.myavionte.com/app/careers/#/jobs/BhwCDlLPhUA/BBH2PZF8yko//';
    //window.history.back();
    if (document.querySelector("#job > div.job-actions.job-actions-top > div.job-actions-back > button"))
        document.querySelector("#job > div.job-actions.job-actions-top > div.job-actions-back > button").click();


    if (out["pass_it"]["paginacion"]) {
        //---------paginacion normal----------
        var next_page_selector = out["pass_it"].selec_btn_paginac;
        var clickable_elem = document.querySelector(next_page_selector);
        if (clickable_elem) {
            //go to next page
            clickable_elem.click();
            out["pass_it"].cont = 0;
            out["pass_it"]["salir"] = false;
            out.waitFor = out["pass_it"]["selector_jobs"];
            out.wait = 3000;
            out["has_next_page"] = true;
        } else {
            //try again
            out["has_next_page"] = false;
        }
        //--------------------------

    } else {
        /*if (document.querySelector("div.job-actions-back >button"))
            document.querySelector("div.job-actions-back >button").click();*/
        if (out["pass_it"]["salir"])
            out["has_next_page"] = false;
        else
            out["has_next_page"] = true;
    }


    out.waitFor = "div.jobs-list > div.job-item.job-items-4.clearfix" // --> SELECTOR DE LOS JOBS
    return out;
})();