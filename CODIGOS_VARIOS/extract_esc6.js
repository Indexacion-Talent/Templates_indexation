var simpleExtract = () => {
    let out = {};
    let html_jobs = document.querySelectorAll("");
    const jobs = [];
    html_jobs.forEach(elem => {
        if (typeof html_jobs[elem] == "function") return;
        if (typeof html_jobs[elem] == "number") return;
        let job = {};
        job.title = elem.querySelector("").textContent.trim();
        job.url = elem.querySelector("").href.trim();
        job.location = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        //job.source_jobtype = elem.querySelector("").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();
        job.temp = 1;
        jobs.push(job);
    });
    out["jobs"] = jobs;
    return out;
}

// call function
simpleExtract();

