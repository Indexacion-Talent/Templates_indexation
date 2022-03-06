/* -------------------------- EXTRACT ------------------------------- */

(function () {
    var jobs = [];
    var out = {};
    var counter = 1;
    var limit = 0;
    var json;
    do {

        //var dat = '{"JobTitle":[],"GradeBucket":[],"JobCategoryCode":[],"JobCategoryFamily":[],"LocationName":[],"PostingChannel":[],"Department":[],"Agency":[],"PositionOfferingTypeCode":[],"TravelPercentage":[],"PositionScheduleTypeCode":[],"SecurityClearanceRequired":[],"ShowAllFilters":[],"HiringPath":["fed-competitive"],"SocTitle":[],"Page":"' + counter + '","UniqueSearchID":"5e62a7ed-6b0f-400d-b25f-dfcd3fa8631d","IsAuthenticated":false}';
        var dat = '{"JobTitle":[],"GradeBucket":[],"JobCategoryCode":[],"JobCategoryFamily":[],"LocationName":[],"PostingChannel":[],"Department":[],"Agency":["HE70"],"PositionOfferingTypeCode":[],"TravelPercentage":[],"PositionScheduleTypeCode":[],"SecurityClearanceRequired":[],"PositionSensitivity":[],"ShowAllFilters":[],"HiringPath":["public"],"SocTitle":[],"MCOTags":[],"CustomWhoMayApply":"15509","Page":"1","UniqueSearchID":"c02d0690-240c-4dd2-a538-22ac45f5fa07","IsAuthenticated":false}';

        var data = JSON.parse(dat);
        $.ajax({
            url: 'https://www.usajobs.gov/Search/ExecuteSearch',                                            // 1) url
            headers: {
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "Content-Type": "application/json; charset=utf-8"    // 2) headers
            },
            type: 'POST',
            data: JSON.stringify(data),
            dataType: "json",
            async: false,
            success: function (result) {
                msg("SUCCES");
                json = result.Jobs;
                limit = result.Pager.NumberOfPages + 1;
                for (var i = 0; i < json.length; i++) {
                    var job = {};
                    job.title = json[i].Title;
                    job.url = 'https://www.usajobs.gov/GetJob/ViewDetails/' + json[i].DocumentID;
                    job.location = json[i].Location;// + ", " + json[i].state;
                    job.location = job.location.replace(/IRS Nationwide Locations,|Location Negotiable After Selection,/gi, "").trim();
                    job.location = job.location.replace("Multiple Locations", "United States");
                    job.location = job.location.replace("Location Negotiable After Selection,", "").trim();
                    job.reqid = json[i].PositionID;

                    job.source_empname = json[i].Agency;
                    //job.source_empname = json[i].PositionID;


                    job.source_jobtype = json[i].WorkSchedule;
                    job.source_salary = json[i].SalaryDisplay;
                    job.dateposted_raw = json[i].DateDisplay.split('to')[0].replace('Open', '').trim();
                    job.dateclosed_raw = json[i].DateDisplay.split('to')[1].trim();
                    job.temp = 2021007;
                    jobs.push(job);
                }
                counter = counter + 1;
            },
            error: function (error) {
                msg(error);
            }
        });
    } while (counter < limit);

    out["jobs"] = jobs;
    return out;
})();


/* --------------------------- PAGINATION ------------------------------ */


(function () {
    var out = {};
    out["has_next_page"] = false;
    out["wait"] = false;
    return out;
})();


/* -------------------------------- JOB DESCRIPTION -------------------------- */

(function () {
    var out = {};
    var job = {};
    var selector = "ul.usa-unstyled-list";
    //var remove_selector = "div.usajobs-joa-occupations";
    var remove_selectors = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a",
        "input",
        "div.alert",
        "div.usajobs-joa-occupations",
        "#next-steps", "#rmjs-3",
        "#qualifications > div > strong",
        "a.usajobs-joa-section__help"];
    //var job = pass_it["job"];

    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    //full_html.querySelector('a').remove();
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
        if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();
    });

    if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
    if (typeof msg == "undefined") msg = console.log;
    if (typeof msg == "undefined") msg = console.log;
    if (typeof msg == "undefined") msg = console.log;
    for (const a of full_html.querySelectorAll("strong > a")) {
        if (a.textContent.includes("www")) { //tambien se puede usar search o match
            a.remove();
        }
    }
    for (const a of full_html.querySelectorAll("a")) {
        if (a.textContent.includes("https")) { //tambien se puede usar search o match
            a.remove();
        }
    }
    for (const a of full_html.querySelectorAll("a.usajobs-joa-section__help")) {
        if (a.textContent.includes("Help ")) { //tambien se puede usar search o match
            a.remove();
        }
    }
    job.html = full_html.innerHTML.trim();
    job.html = removeTextBefore(job.html, "Summary", false);
    job.html = removeTextAfter(job.html, "How to Apply", true);

    job.html = cleanHTML(job.html);
    var tmp = document.createElement("DIV");
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();

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