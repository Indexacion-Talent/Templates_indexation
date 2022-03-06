/* ---------------------------- MULTILOCATION V1 ----------------------- */

job.location = job.location.split("/")
job.location.map(location => {
    var jobx = {};
    jobx = { ...job }
    jobx.location = location;
    jobs.push(jobx);
})


/* ------------ MULTILOCATION V2 -------------------------------------- */

if (job.location.indexOf(',') > -1) {
    let locs = job.location.split(',');
    msg(locs)
    for (let loc of locs) {
        let jobx = {};
        jobx.title = job.title;
        jobx.url = job.url;
        jobx.location = loc;
        jobx.source_jobtype = job.source_jobtype;
        jobx.temp = job.temp;
        jobx.html = job.html;
        jobx.jobdesc = job.jobdesc;
        jobs.push(jobx);
    }
} else {
    jobs.push(job);
}



