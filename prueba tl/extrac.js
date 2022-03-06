(function () {
    const out = {};
    const jobs = [];
    const element = document.querySelector('pre').textContent;
    const json = JSON.parse(element);
    const json_jobs = json.documents;
    for (let x in json_jobs) {
        const job = {};
        const elem = json_jobs[x];
        job.title = elem.title;
        job.url = elem._links.detail_de.href;
        job.reqid = elem.job_id;
        if (elem.place) {
            job.location = elem.place;
        }
        else {
            job.location = 'CH';
        }
        //job.source_jobtype = elem.positionOfJobtype;
        //job.source_salary = elem.positionOfSalary;
        //job.experienced_required = elem.positionExperienced;
        if (elem.publication_date) {
            job.dateposted_raw = elem.publication_date.split('T')[0].split('-');
            job.dateposted_raw = job.dateposted_raw[1] + '/' + job.dateposted_raw[2] + '/' + job.dateposted_raw[0];
        }
        //job.dateclosed_raw = elem.positionOfDateClosed;
        if (elem.company_name) {
            job.source_empname = elem.company_name;
        }

        if (elem.images[0]) {
            job.logo = elem.images[0].url;
        }
        //job.source_apply_email = elem.positionOfEmail;
        job.temp = '1';

        if (job.location.indexOf("/") > -1) {
            let loc = job.location.split("/");
            for (let i of loc) {
                let jobx = { ...job };
                jobx.location = i.trim();
                jobs.push(jobx);
            }
        } else {
            jobs.push(job);
        }
    }
    out['jobs'] = jobs;
    return out;
})();