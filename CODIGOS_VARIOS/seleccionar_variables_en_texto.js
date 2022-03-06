
//imprimir el siguiente elemento del coincidiente
document.querySelectorAll("div.job-info > p > span").forEach(e => {
    if (e.textContent.trim().includes("Reference No.")) {
        console.log(e.nextElementSibling.textContent.trim())
    }
}
);

//imprimir el elemento que coincide
document.querySelectorAll("#main > div > div > div > div:nth-child(2) > section > div:nth-child(1) > article > div.article__content.article__content--jobdetail > div > p").forEach(e => {
    if (e.textContent.trim().includes("Position Type:")) {
        job.source_jobtype = e.textContent.trim().split(":")[1];
    }
})

