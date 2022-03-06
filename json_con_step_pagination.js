(function () {
    var jobs = [];
    var out = { };
    if (document.querySelector("div#csrfToken")) {
        var csrf_token = document.querySelector("div#csrfToken").textContent;
    }
    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 0,
            "total": 0,
            "categoria": ['Technology &amp; Engineering'],
            "nombreReal": ["Technology & Engineering"],
            "idpage": ['page33']
        };
    } else {
        out["pass_it"] = pass_it;
    }
    //document.querySelectorAll('head > script[type="text/javascript"]').forEach(e=>if( e.textContent.trim()))
    //var data = {"lang":"en_global","deviceType":"desktop","country":"global","pageName":"Business Processes","ddoKey":"refineSearch","sortBy":"Most recent","subsearch":"","from": out["pass_it"].cont,"jobs":true,"counts":true,"all_fields":["category","location","empStatus","industryName","minExp"],"size":500,"clearAll":false,"jdsource":"facets","isSliderEnable":false,"pageId":"page1","siteType":"external","keywords":"","global":true,"selected_fields":{"category":["Business Processes","Consulting","Digital","Technology & Engineering","Delivery Management","IT Infrastructure","Corporate","Sales & Marketing"]},"sort":{"order":"desc","field":"postedDate"}};
    var data = { "lang": "en_global", "deviceType": "desktop", "country": "global", "pageName": out["pass_it"].categoria, "ddoKey": "refineSearch", "sortBy": "Most recent", "subsearch": "", "from": out["pass_it"].cont, "jobs": true, "counts": true, "all_fields": ["category", "location", "empStatus", "industryName", "minExp"], "pageType": "category", "size": 500, "clearAll": false, "jdsource": "facets", "isSliderEnable": false, "pageId": out["pass_it"].idpage, "siteType": "external", "keywords": "", "global": true, "selected_fields": { "category": out["pass_it"].nombreReal, "empStatus": ["Full Time Employee", "Fixed Term Contractor", "Contractor"] }, "sort": { "order": "desc", "field": "postedDate" } }
    $.ajax({
        url: 'https://careers.cognizant.com/widgets',
        headers: {
            "accept": "*/*",
            "accept-language": "es-ES,es;q=0.9",
            "content-type": "application/json",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\", \"Opera GX\";v=\"78\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-csrf-token": csrf_token
        },
        type: 'POST',
        data: JSON.stringify(data),
        dataType: "json",
        async: false,
        success: function (result) {
            out["expected_jobs"] = result.refineSearch.hits;
            var json = result.refineSearch.data.jobs;
            var total = result.refineSearch.totalHits;
            out["pass_it"].total = total;
            //json = result.jobs;  //6) ruta de los trabajos
            //msg(json);
            // out["expected_jobs"] = result.totalCount;
            for (var i = 0; i < json.length; i++) {
                var job = { };

                job.title = json[i].title;
                job.url = json[i].applyUrl;
                job.location = json[i].location;
                job.reqid = json[i].jobId;
                //job.logo = elem.querySelector("").getAttribute("src").trim();
                //job.source_apply_email = elem.querySelector("").textContent.trim();
                //job.source_empname = elem.querySelector("").textContent.trim();
                job.source_jobtype = json[i].type;
                //job.source_salary = elem.querySelector("").textContent.trim();

                job.temp = 1;
                jobs.push(job);
            }
            //msg("request successfull");
            //msg(result);
        },
        error: function (error) {
            msg(error);
        }
    });

    out["jobs"] = jobs;
    return out;
})();


/* pagination */

(function () {
    var out = { };
    //var arrayCategorias = ['Business Processes', 'Consulting', 'Corporate', 'Delivery Management', 'Digital', 'IT Infrastructure', 'Technology &amp; Engineering'];
    //var arrayIdPages = ['page36', 'page31', 'page34', 'page37', 'page28', 'page35', 'page33'];
    out["pass_it"] = pass_it;
    out["pass_it"].cont += 500;
    //out["pass_it"].categoria = "Technology &amp; Engineering";
    //out["pass_it"].idpage = "page33";
    msg(out["pass_it"].cont + "<----->" + out["pass_it"].total);
    if (out["pass_it"].cont < out["pass_it"].total) {
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }

    return out;
})();

