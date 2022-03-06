/* ------- extraer campos desde la descripcion ------------------ */

var full_html = getDescription(job.url);
var temp_html = document.createElement("div");
temp_html.innerHTML = full_html;
job.source_jobtype = temp_html.querySelector('dl:nth-child(3) > dd > span').textContent.trim(); // se reemplaza el selector

/* ---------------------------------------------------- */

function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
    var response = "";
    xhrrequest.onreadystatechange = function() {
        if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
            //console.log(xhrrequest.responseText);
            response = xhrrequest.responseText;
        }
    };
    xhrrequest.send();
    return response;
}



