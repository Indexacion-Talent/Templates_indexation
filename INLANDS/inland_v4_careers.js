/*_________________________ BEFORE EXTRACT _____________________________________*/

(function () {
    var out = {};
    var selector_jobs = "div.jobs-list > div.job-item.job-items-3.clearfix";
    var selector_desc = "#job > div.job-description";

    if (typeof pass_it == "undefined")
        pass_it = {};
    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 0,
            "salir": false,
            "pagination": false,
            //"selec_btn_paginac" : selec_btn_paginac,
            "selector_jobs": selector_jobs,
            //"selector_click_Job": selector_click_Job,
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
        var title = elem.querySelector("div.job-item-job-title.has-data > span").textContent;//.trim().split(" - ")[1];
        //var url = elem.querySelector("").href.trim();
        var location = elem.querySelector("div.job-item-detail.job-item-location.has-data.has-next > span").textContent.trim();
        //var reqid = elem.querySelector("[id*='_VacancyTitleLabel']").textContent.trim().split(" - ")[0];
        /*var fecha = elem.querySelector("div.job-item-detail.job-item-location.has-data.has-next > span").textContent.trim().split("/");
        var dateposted_raw = fecha[1]+'/'+fecha[0]+'/'+fecha[2];*/
        //var dateposted_raw = elem.querySelector("div.job-item-post-date").textContent.trim();
        var dateposted_raw = elem.querySelector("div.job-item-detail.job-item-post-date.has-data > span").textContent.trim();
        //var logo = elem.querySelector("").getAttribute("src").trim();
        //var source_apply_email = elem.querySelector("").textContent.trim();
        //var source_empname = elem.querySelector("").textContent.trim();
        //var source_jobtype = elem.querySelector("").textContent.trim();
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
        //out["pass_it"]["source_jobtype"] = source_jobtype;
        //out["pass_it"]["source_salary"] = source_salary;   
        if (typeof (selector_click_Job) == 'undefined') {
            elem.click();
            out.waitFor = out["pass_it"]["selector_desc"];
        } else {
            elem.querySelector(selector_click_Job).click();
            out.waitFor = out["pass_it"]["selector_desc"];
        }

    } else {

        msg("EN EL FALSE DE BEFORE");
        msg(elemento);
        msg(elem);
        out["pass_it"]["salir"] = true;
    }

    out.waitFor = "#job > div.job-description"; // --> selector de la descripcion
    out["wait"] = true;
    out.pic = true;
    out.html = true;
    return out;
})();


/* _________________________________________________ EXTRACT __________________________________________________________*/

(function () {
    var out = {};
    var jobs = [];
    out["pass_it"] = pass_it;

    if (out["pass_it"]["salir"]) {
        var job = {};
        job.title = 'boo';
        jobs.push(job);
    } else {
        // msg(out["pass_it"]["selector"]);
        if (document.querySelector(out["pass_it"]["selector_desc"])) {
            var job = {};
            var remove_selectors = ["a", "script", "style"];
            job.title = out["pass_it"]["title"];
            job.location = out["pass_it"]["location"];
            //job.reqid = out["pass_it"]["reqid"];
            job.url = document.querySelector("div.job-url a").href.trim() // --> En este caso se encuentra en la misma descripcion;
            job.dateposted_raw = out["pass_it"]["dateposted_raw"];
            //job.dateclosed_raw = out["pass_it"]["dateclosed_raw"];    
            //job.logo = out["pass_it"]["logo"];
            //job.source_apply_email = out["pass_it"]["source_apply_email"];
            //job.source_empname = out["pass_it"]["source_empname"];
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
            //job.html = removeTextAfter(job.html, "Successful applicant", true);
            //job.html = removeTextAfter(job.html, "Successful applicants", true);
            //job.html = job.html.replace("Loading...", "").trim();
            //job.html = removeTextBefore(job.html, "You will assist", false);
            //job.html = removeTextBefore(job.html, "This holder of this position", false);
            //job.jobdesc = removeTextAfter(job.html, "", true);
            job.html = cleanHTML(job.html);
            var tmp = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim();
            job.jobdesc = cleanHTML(job.jobdesc);
            job.temp = 1;
            jobs.push(job);
        } else

            msg("Selector de la descripcion no encontrado");
    }
    out["pic"] = true;
    out["jobs"] = jobs;
    out.waitFor = "div.jobs-list > div.job-item.job-items-3.clearfix" // --> selector de un job;
    out["wait"] = true;
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

/* _____________________________________________ PAGINATION SIMPLE ______________________________________________________*/

(function () {
    var out = {};
    out["pass_it"] = pass_it;
    out["pass_it"].cont += 1;
    window.location.href = 'https://hire.myavionte.com/app/careers/#/jobs/EtnB8FiDM4U/MoaInVnOAMg//' // --> se utiliza este en caso de que no hayan una forma de volver atras;
    //window.history.back();
    /*if (document.querySelector("span.icon"))
                document.querySelector("span.icon").click();*/

    if (out["pass_it"]["salir"])
        out["has_next_page"] = false;
    else
        out["has_next_page"] = true;

    //out.waitFor = out["pass_it"]["selector_jobs"];
    out.waitFor = "div.jobs-list > div.job-item.job-items-3.clearfix" // selector de uno de los jobs;
    return out;
})();




/*________________________________________________ JOB DESCRIPTION ______________________________________________________*/


/*
En estos casos no hay, se pone el job data en no 
*/