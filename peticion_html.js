(function () {
    var jobs = [];
    var out = {};
    var data = {};
    $.ajax({
        url: 'https://jobs.basic-fit.com/nl-be/vacatures/club-vacatures/',
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en,es;q=0.9,en-CA;q=0.8,es-419;q=0.7,en-US;q=0.6",
            "cache-control": "max-age=0",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "cross-site",
            "sec-fetch-user": "?1",
            "sec-gpc": "1",
            "upgrade-insecure-requests": "1",
            "cookie": "utm_source=jobs.basic-fit.com; CookieConsent={stamp:%27lzye2SvSPPMbj9lBoBFmXseSwlZprvpI9YKknQKLdsCZ10XhgpQlcg==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cver:1%2Cutc:1618255549631%2Cregion:%27co%27}; cxs-maps-position=%7B%22coords%22%3A%7B%22latitude%22%3A50.47367380052657%2C%22longitude%22%3A4.462925499999972%7D%2C%22zoom%22%3A8%7D"
        },
        type: 'GET',
        //data : JSON.stringify(data),
        data: data,
        dataType: "html",
        async: false,
        success: function (result) {
            var tmp = document.createElement('div');
            //let html_result= result.split('<html>').pop().trim();
            //html_result= html_result.split('</html>').shift().trim();           
            tmp.innerHTML = result;
            var html_jobs = tmp.querySelectorAll("article.col-md-12.cxs-list-vacancy");

            for (var x in html_jobs) {
                if (typeof html_jobs[x] == "function") continue;
                if (typeof html_jobs[x] == "number") continue;
                var job = {};
                var elem = html_jobs[x];
                job.title = elem.querySelector("header.entry-header a").textContent.trim();
                job.url = elem.querySelector("header.entry-header a").href.trim();
                job.location = elem.querySelector("ul > li:nth-child(1) > span").textContent.trim() + ", BE";
                job.reqid = job.url.split('-').pop();
                //job.reqid = job.url.split("-").reverse().shift().trim();
                //job.dateposted_raw = elem.querySelector("").textContent.trim();
                //job.logo = elem.querySelector("").getAttribute("src").trim();
                //job.source_apply_email = elem.querySelector("").textContent.trim();
                //job.source_empname = elem.querySelector("").textContent.trim();
                //job.source_jobtype = elem.querySelector("div.entry-meta  ul.classic--facets li:nth-child(2)").textContent.trim();
                //job.source_salary = elem.querySelector("").textContent.trim();
                job.temp = 1;
                jobs.push(job);

            }
        },
        error: function (error) {
            msg(error);
        }
    });

    out["jobs"] = jobs;
    return out;
})();