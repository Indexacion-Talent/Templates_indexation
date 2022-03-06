(function () {
    var returnedJobs = [];
    var out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 0,
            "jobs": 0,
            "expected_jobs": 0
        };
    } else {
        out["pass_it"] = pass_it;
    }
    //let endpoint = window.location.href.split("/0/").shift().split("/fs/").shift()+"/fs/searchPagination/318c8bb6f553100021d223d9780d30be/"+out["pass_it"].cont;
    let endpoint = window.location.origin + window.location.pathname + "/fs/searchPagination/318c8bb6f553100021d223d9780d30be/" + out["pass_it"].cont;
    msg(endpoint);
    var data = {};
    $.ajax({
        url: endpoint,
        "headers": {
            "accept": "application/json,application/xml",
            "accept-language": "es-419,es;q=0.9,en;q=0.8",
            "content-type": "application/x-www-form-urlencoded",
            "sec-ch-ua": "\"Google Chrome\";v=\"93\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"93\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sessionsecuretoken": "hq3vu62eo8b3a2d87cpeemvkdr",
            "stats-perf": "92cab7324ec34e1285c777497d32169c,666,,0",
            "x-workday-client": "2021.37.013"
        },
        type: 'GET',
        //data : JSON.stringify(data),
        dataType: "json",
        async: false,
        success: function (json) {
            if (out["pass_it"].cont == 0) {
                //extract total jobs in first pagination
                var expected_jobs_str = json.body.children[0].facetContainer.paginationCount.value;
                out["pass_it"].expected_jobs = expected_jobs_str;
            }

            var jobs = json.body.children[0].children[0].listItems;
            for (i in jobs) {
                var job = {}; /*init*/
                job.title = jobs[i].title.instances[0].text.split("-")[0];
                job.reqid = jobs[i].subtitles[0].instances[0].text;
                //job.reqid = jobs[i].subtitles[1].instances[0].text;
                if (job.title) {
                    jobs[i].subtitles.forEach(item => {
                        let text = item.instances[0].text;				//&& text.search(/[0-9]/)== -1
                        if (!text.includes('Full time') && !text.includes('Permanent') && !text.includes('Posted')) {
                            job.location = text.trim();
                        }
                    });
                }
                job.url = window.location.protocol + "//" + window.location.hostname + jobs[i].title.commandLink;
                if (job.location) {
                    //-----------DESCRIPTION---------
                    var json = JSON.parse(getDescription(job.url));
                    job.html = JSON.parse(json.structuredDataAttributes.data).description;
                    job.html = cleanHTML(job.html);
                    var tmp = document.createElement("DIV");
                    tmp.innerHTML = job.html;
                    job.jobdesc = tmp.textContent.trim();
                    //job.dateclosed_raw = dateclosed_returned(tmp);  //sent element with html description - enviar elemento con el html de la descripcion.        
                    if (job.html.toLowerCase().indexOf("part time") > -1) { job.source_jobtype = "Part time"; }
                    if (job.html.toLowerCase().indexOf("part-time") > -1) { job.source_jobtype = "Part time"; }
                    if (job.html.toLowerCase().indexOf("full time") > -1) { job.source_jobtype = "Full time"; }
                    if (job.html.toLowerCase().indexOf("full-time") > -1) { job.source_jobtype = "Full time"; }

                    job.html = removeTextBefore(job.html, "Key responsibilities:", false);
                    job.html = removeTextAfter(job.html, "George Weston Limited recognizes", true);
                    job.html = cleanHTML(job.html);
                    var tmp = document.createElement('div');
                    tmp.innerHTML = job.html;
                    job.jobdesc = tmp.textContent.trim();
                    job.jobdesc = cleanHTML(job.jobdesc);

                    //---------MULTILOCATION-------------------
                    job.temp = 1;
                    var array = json.body.children[1].children[1].children;
                    var array2 = json.body.children[1].children[0].children;
                    array = array2.concat(array);
                    array = array.sort().reverse();
                    let locations = [];
                    for (var i in array) {
                        if (array[i].iconName) {
                            if (array[i].iconName.trim().toUpperCase() == 'JOB_TYPE') {
                                job.source_jobtype = array[i].imageLabel;
                            }
                            if (array[i].iconName.trim().toUpperCase() == 'POSTED_DATE') {
                                let date = array[i].imageLabel.replace("Posted", "").trim();
                                date = dateAgo(date.replace(/\s+/gi, ' ').trim(), " ", 0, 1);
                                job.dateposted_raw = date;
                            }
                            if (array[i].iconName.trim().toUpperCase() == 'LOCATION') {
                                locations.push(array[i].imageLabel.replace(/1|2|3|4|5|6|7|8|9|0/gi, ""));
                            }
                            if (i == array.length - 1) {
                                locations.map(loc => {
                                    var jobx = { ...job };
                                    jobx.source_location = loc.trim();
                                    jobx.location = loc.trim().replace("Remote", "").trim();
                                    returnedJobs.push(jobx);
                                })
                            }

                        }
                    }
                }
                if (!job.location) {
                    // job without LOCATION
                    job.location = "HQ, Company";
                    returnedJobs.push(job);
                }//end if job.location
            }
        },
        error: function (error) {
            msg(error);
        }
    });
    out['pass_it'].jobs = returnedJobs.length;
    out["jobs"] = returnedJobs;
    return out;
})();


function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
    xhrrequest.setRequestHeader("Accept", "application/json,application/xml");
    xhrrequest.setRequestHeader("Accept-Language", "en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
    xhrrequest.setRequestHeader("Cache-Control", "no-cache");
    xhrrequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhrrequest.setRequestHeader("Pragma", "no-cache");
    var response = "";
    xhrrequest.onreadystatechange = function () {
        if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
            response = xhrrequest.responseText;
        }
    };
    xhrrequest.send();
    return response;
}
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


function month_validator(month) {
    let newmoth = month;
    if (newmoth.search(/jan/i) > -1) { newmoth = "01"; }
    if (newmoth.search(/feb/i) > -1) { newmoth = "02"; }
    if (newmoth.search(/mar/i) > -1) { newmoth = "03"; }
    if (newmoth.search(/apr/i) > -1) { newmoth = "04"; }
    if (newmoth.search(/may/i) > -1) { newmoth = "05"; }
    if (newmoth.search(/jun/i) > -1) { newmoth = "06"; }
    if (newmoth.search(/jul/i) > -1) { newmoth = "07"; }
    if (newmoth.search(/aug/i) > -1) { newmoth = "08"; }
    if (newmoth.search(/sep/i) > -1) { newmoth = "09"; }
    if (newmoth.search(/oct/i) > -1) { newmoth = "10"; }
    if (newmoth.search(/nov/i) > -1) { newmoth = "11"; }
    if (newmoth.search(/dec/i) > -1) { newmoth = "12"; }
    newmoth = newmoth.replace('January', '01');
    newmoth = newmoth.replace('Febrary', '02');
    newmoth = newmoth.replace('March', '03');
    newmoth = newmoth.replace('April', '04');
    newmoth = newmoth.replace('May', '05');
    newmoth = newmoth.replace('June', '06');
    newmoth = newmoth.replace('July', '07');
    newmoth = newmoth.replace('August', '08');
    newmoth = newmoth.replace('September', '09');
    newmoth = newmoth.replace('October', '10');
    newmoth = newmoth.replace('November', '11');
    newmoth = newmoth.replace('December', '12');
    return newmoth;
}
