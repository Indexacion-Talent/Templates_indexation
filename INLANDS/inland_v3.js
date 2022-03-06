/*------------------ BEFORE EXTRACT --------------------------------*/

(function () {
    var out = {};
    var selector_jobs = "tr[id*='ctl00_CPH1_vcyS_vsGrid_ctl00__']";
    var selector_desc = "td.descWidth";
    var selec_btn_paginac = 'li.paging-item.paging-item-active +li >a';
    var selector_click_Job = "input[id*='_ViewVacancyButton']";

    if (typeof pass_it == "undefined")
        pass_it = {};
    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 0,
            "salir": false,
            "pagination": false,
            //"selec_btn_paginac" : selec_btn_paginac,
            "selector_jobs": selector_jobs,
            "selector_click_Job": selector_click_Job,
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
        var title = elem.querySelector("[id*='_VacancyTitleLabel']").textContent.trim().split(" - ")[1];
        //var url = elem.querySelector("").href.trim();
        var location = "Glasgow, Scotland, UK";
        var reqid = elem.querySelector("[id*='_VacancyTitleLabel']").textContent.trim().split(" - ")[0];
        /*var fecha = elem.querySelector("").textContent.trim().split("/");
        var dateposted_raw = fecha[1]+'/'+fecha[0]+'/'+fecha[2];*/
        //var dateposted_raw = elem.querySelector("div.job-item-post-date").textContent.trim();
        var dateclosed_raw = elem.querySelector("td:nth-child(3)").textContent.trim();
        //var logo = elem.querySelector("").getAttribute("src").trim();
        //var source_apply_email = elem.querySelector("").textContent.trim();
        //var source_empname = elem.querySelector("").textContent.trim();
        //var source_jobtype = elem.querySelector("").textContent.trim();
        //var source_salary = elem.querySelector("").textContent.trim();
        out["pass_it"]["title"] = title;
        out["pass_it"]["location"] = location;
        out["pass_it"]["reqid"] = reqid;
        //out["pass_it"]["url"] = url;
        //out["pass_it"]["dateposted_raw"] = dateposted_raw;
        out["pass_it"]["dateclosed_raw"] = dateclosed_raw;
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
        msg("Ultimo job o/ no tiene jobs");
        msg(elemento);
        msg(elem);
        if (document.querySelector(out["pass_it"].selec_btn_paginac)) {
            msg('Ejecutando PAGINACION...')
            out["pass_it"]["paginacion"] = true;
        } else if (!elem) {
            out["pass_it"]["salir"] = true;
        }

    }
    out.pic = true;
    out.html = true;
    return out;
})();


/* ----------------------------------------- EXTRACT ---------------------------------------- */


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
            job.reqid = out["pass_it"]["reqid"];
            job.url = window.location.href;
            //job.dateposted_raw = out["pass_it"]["dateposted_raw"];
            job.dateclosed_raw = out["pass_it"]["dateclosed_raw"];
            //job.logo = out["pass_it"]["logo"];
            //job.source_apply_email = out["pass_it"]["source_apply_email"];
            //job.source_empname = out["pass_it"]["source_empname"];
            if (document.querySelector("[id*='ctl00_CPH1_vcyS_vsGrid_ctl00_ctl06_Detail10__'] > td > div > div.left.unorderListPadding > p:nth-child(5) > span")) {
                job.source_jobtype = document.querySelector("[id*='ctl00_CPH1_vcyS_vsGrid_ctl00_ctl06_Detail10__'] > td > div > div.left.unorderListPadding > p:nth-child(5) > span").textContent.trim();
            }

            if (document.querySelector("[id*='ctl00_CPH1_vcyS_vsGrid_ctl00_ctl06_Detail10__'] > td > div > div.left.unorderListPadding > p:nth-child(7) > span")) {
                job.source_salary = document.querySelector("[id*='ctl00_CPH1_vcyS_vsGrid_ctl00_ctl06_Detail10__'] > td > div > div.left.unorderListPadding > p:nth-child(7) > span").textContent.trim();
            }
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
            job.html = removeTextAfter(job.html, "Successful applicant", true);
            job.html = removeTextAfter(job.html, "Successful applicants", true);
            //job.html = job.html.replace("Loading...", "").trim();
            job.html = removeTextBefore(job.html, "You will assist", false);
            job.html = removeTextBefore(job.html, "This holder of this position", false);
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



/* -------------------------------- PAGINATION ---------------------------------------*/


(function () {
    var out = {};
    out["pass_it"] = pass_it;
    out["pass_it"].cont += 1;


    if (document.querySelector("input[id*='_ViewVacancyButton']")) {
        document.querySelector("input[id*='_ViewVacancyButton']").click();
    }
    //window.backhistory  
    //window.location.href = "https://recruitregion.durham.ca/psc/recruit_rmd/EMPLOYEE/HRMS/c/HRS_HRAM_FL.HRS_CG_SEARCH_FL.GBL?Page=HRS_APP_SCHJOB_FL&Action=U";

    if (out["pass_it"]["salir"]) {
        out["has_next_page"] = false;
    } else {
        out["has_next_page"] = true;
    }
    //out.waitFor = "[id*='_VacancyTitleLabel']";
    out["wait"] = true;
    return out;
})();