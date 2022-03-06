/* ------------ EXTRACT ----------------*/

(function () {
    var out = {};

    if (typeof pass_it == "undefined") pass_it = {};

    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 50,
            "jobs": 0
        };
    } else {
        out["pass_it"] = pass_it;
    }

    var element = document.querySelector("pre").textContent;
    var json = JSON.parse(element);
    var jobs = json.body.children[0].children[0].listItems;
    var returnedJobs = [];
    for (j in jobs) {
        var job = {};

        var loc = jobs[j].subtitles[1].instances[0].text;

        job.title = jobs[j].title.instances[0].text;
        job.reqid = jobs[j].subtitles[0].instances[0].text;
        job.dateposted_raw = jobs[j].subtitles[2].instances[0].text.replace("Posted", " ").trim();
        job.dateposted_raw = dateAgo(job.dateposted_raw.replace(/\s+/gi, ' ').trim(), " ", 0, 1);
        if (typeof loc != 'undefined') {
            if (loc.indexOf("(") > 0) {
                job.location = loc.substring(loc.indexOf(""), loc.lastIndexOf("(")).trim();
            } else {
                job.location = loc;
            }
        }
        job.location = job.location.replace(", More...", "");
        job.location = job.location.replace(" - ", ", ");


        job.url = window.location.protocol + "//" + window.location.hostname + jobs[j].title.commandLink;

        job.temp = 100;
        returnedJobs.push(job);

    }
    //    msg(jobs);
    //    msg(returnedJobs.length);

    out["pass_it"]["jobs"] = returnedJobs.length;
    out["jobs"] = returnedJobs;
    return out;
})();

/* ------- DATE AGO --------- */

function dateAgo(text, char_separator, position_value_DWMY, position_word_DWMY) {
    var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY], 10); //obtengo el valor numerico del dia, sem, mes o año
    if (typeof text.split(char_separator)[position_word_DWMY] !== 'undefined') {
        var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
    } else { var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1] };
    var date_Now = new Date();  //declaro un objeto tipo fecha
    var nDays = 0;
    if (dayWeekMonthYear.toUpperCase().search(/TODAY|NOW|HOUR/g) > -1) { nDays = 0; }
    if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY') > -1) { nDays = 1; }
    if (dayWeekMonthYear.toUpperCase().indexOf('DAYS') > -1) { nDays = numberDWMY; }
    if (dayWeekMonthYear.toUpperCase().indexOf('WEEK') > -1) { nDays = numberDWMY * 7; }
    if (dayWeekMonthYear.toUpperCase().indexOf('MONTH') > -1) { nDays = numberDWMY * 30; }
    if (dayWeekMonthYear.toUpperCase().indexOf('YEAR') > -1) { nDays = numberDWMY * 365; }
    var dateJob = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
    var get_date = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
    var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
    //Obtengo dia mes y Año
    var dd = datePosted.getDate();                //devuelve el numero del dia del mes.
    var mm = datePosted.getMonth() + 1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
    var yyyy = datePosted.getFullYear().toString(); //devuelve el año.
    if (dd < 10) { dd = '0' + dd; }
    if (mm < 10) { mm = '0' + mm; }
    dateJob = mm + '/' + dd + '/' + yyyy;
    return dateJob;
}


/* ---------- PAGINATION --------- */

(function () {
    var out = {};

    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function (x) { return x; };

    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 0,
            "jobs": 0
        };
    } else {
        out["pass_it"] = pass_it;
    }

    if (out["pass_it"]["jobs"] == 50) {


        var dom = window.location.protocol + "//" + window.location.hostname;
        var pagConstant = window.location.pathname.split("be/").shift() + "be/";
        var clientRequestID = window.location.href.split("clientRequestID=").pop().trim();

        var url = dom + pagConstant + out["pass_it"].cont + "?clientRequestID=" + clientRequestID;



        out["pass_it"].cont += 50;
        window.location.href = url;
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }
    return out;
})();


/* --------------- JOB DESCRIPTION ----------- */

(function () {
    var out = {};
    var job = {};

    var selector = ".GWTCKEditor-Disabled:eq(1)";

    // selector alterno --> [id*='jobDescription-input--uid53-input'] > div.GWTCKEditor-Disabled

    var full_html = $(selector);


    //---------INFO-------------------------------------

    var html_2 = $("#workdayApplicationFrame").text();


    if (html_2.toLowerCase().indexOf("part time") > -1) { job.source_jobtype = "Part time"; }
    if (html_2.toLowerCase().indexOf("part-time") > -1) { job.source_jobtype = "Part time"; }
    if (html_2.toLowerCase().indexOf("full time") > -1) { job.source_jobtype = "Full time"; }
    if (html_2.toLowerCase().indexOf("full-time") > -1) { job.source_jobtype = "Full time"; }

    //job.location       = $("").text().trim();
    //job.source_jobtype = $("").text().trim();

    //job.source_empname = $("").text().trim();
    //job.logo           = $("").attr("src");

    //job.source_salary  = $("").text().trim();



    //---------REMOVE---------------------------------------
    full_html.find("div[id^=labeledImage]").remove().end().html();
    full_html.find("li:has(button)").remove().end().html();
    full_html.find('a').remove().end().html();
    full_html.find('style, script').remove().end().html();
    full_html.find('input, img, button').remove().end().html();
    full_html.find('div.alert, form').remove().end().html();

    full_html.find("h1").remove().end().html();

    full_html.find("footer").remove().end().html();
    full_html.find("li:has(svg)").remove().end().html();
    full_html.find("ul.WGYM.WIYM, .wd-player-media").remove().end().html();
    //


    // full_html.find("li:first").remove().end().html();
    //full_html.find("").remove().end().html();

    //full_html.find("p:contains()").remove().end().html();
    //full_html.find("p:contains()").remove().end().html();
    //full_html.find("p:contains()").remove().end().html();
    //full_html.find("p:contains()").remove().end().html();

    //----------------------------------------------------- 

    var full_html = full_html.html();

    job.html = full_html.trim();

    job.html = removeTextBefore(job.html, "Essential Duties and Responsibilities", false);
    job.html = removeTextAfter(job.html, "#LI", true);
    job.html = removeTextBefore(job.html, "SUMMARY", false);
    job.html = removeTextBefore(job.html, "Job Summary", false);

    job.html = job.html.split("An Award Winning Company")[0];
    //job.html = job.html.split("")[0];
    //job.html = job.html.split("")[0];
    //job.html = job.html.split("")[0];

    //job.html = job.html.replace("","");
    //job.html = job.html.replace("","");
    //job.html = job.html.replace("","");
    //job.html = job.html.replace("","");




    //CLEAN EMOJIS
    //job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();


    job.html = cleanHTML(job.html);
    job.jobdesc = job.html.replace(/&nbsp;/g, " ").replace(/\<(.*?)\>/g, ""); // clean tags
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






(function () {
    var out = {};
    var html_jobs = document.querySelectorAll('span[id*="LblTitolo"] > div');
    var title_jobs = document.querySelectorAll('iframe[spparentobjid]')
    var iframes = []
    var title_jobs = document.querySelectorAll('iframe[spparentobjid]')
    title_jobs.forEach(elem => iframes.push(elem))

    var tmp = iframes.map(elem => elem.contentWindow.document) // array de jobdatas

    var jobs = []; for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.textContent.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').trim();

        job.url = title_jobs[x].getAttribute('src').split('&APPLY=').shift().trim();
        job.reqid = job.url.split("NUM=")[1];
            job.html = tmp[x].querySelector('div[id*="label2tbl"]').innerHTML;
            if (job.html.match(/Location:\D+/gi))
                job.location = job.html.match(/Location:\D+/gi)[0].split('Department:').shift().split('Location:').pop().trim().replace(/<[^>]*>?/g, '').trim();
            if (job.html.match(/Contract Duration:\D+/gi))
                job.source_jobtype = job.html.match(/Contract Duration:\D+/gi)[0].split('Ferrari offers:').shift().trim().replace(/<[^>]*>?/g, '').split('Contract duration:').pop().trim();
            job.html = removeTextAfter(job.html, 'We are an Equal Opportunity Employer', true);

            /*   if(job.html.match(/experience\D+/gi))
                job.experience_required = job.html.match(/at least\D+/gi)[1].split('of').shift().trim();*/


            if (job.html.includes('experience')) {
                job.experience_required = job.html.split("at least").pop().split("of").shift();
            }



            if (job.title.indexOf('Internship') != -1) continue;

            job.jobdesc = job.html.replace(/<[^>]*>?/g, '');
            job.temp = 813 - 2;
            jobs.push(job);
    }

    out["pic"] = 1;
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









