let selectorExpre = 'div#job-details'; //Selector del jobdata (también puede ser p, div, span)
let regextwo = '[0-9]{1,2}[+] years|[0-9]{1,2} à [0-9]{1,2} années |[0-9]{1,2} ans|[0-9]{1,2} an minimum|[0-9]{1,2}ans|[0-9]{1,2}an|[0-9]{1,2} an |[0-9]{1,2}-[0-9]{1,2} years|> [0-9]{1,2} ans|[0-9]{1,2}–[0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} year|[0-9]{1,2} years|[0-9]{1,2} ans |[0-9]{1,2} à [0-9]{1,2} ans' // Validaciones
for (const a of document.querySelectorAll(selectorExpre)) {
    if (a.textContent.match(/years in|expérience|experience|Experience|Expérience/gi)) {
        if (a.textContent.match(regextwo)) {
            job.experience_required = a.innerText.match(regextwo)[0];
            job.experience_required = job.experience_required.replace("18+ years", "").trim();
            job.experience_required = job.experience_required.replace("60 years", "").trim();
        } else {
            job.experience_required = '';
        }
    }
}