/* ---------------------------- INFINITY PAGINATION ------------------------------------------ */

(function () {
    var out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = console.log;

    var multilink = document.querySelectorAll("li.hj-custom-sector-icon >a");
    var urls = []
    for (var x in multilink) {
        if (typeof multilink[x] == "function") continue;
        if (typeof multilink[x] == "number") continue;
        var elem = multilink[x];
        urls.push(elem.href.trim())
    }

    if (!pass_it["urls"]) {
        out["pass_it"] = {
            "currentUrl": 0,
            "urls": urls
        };
    } else {
        out["pass_it"] = pass_it;
    }

    window.location.href = urls[0];

    return out;
})();


/* ----- Paginaciones -------- */

(function () {
    var out = {};

    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function (x) { return x; };

    msg("-----------PAGINATION--------------");
    msg(pass_it);
    msg("-----------/PAGINATION----------------");


    if (!pass_it["urls"]) {
        out["pass_it"] = {
            // Esta variable se usa en el pagination (Cuando los jobs sean > 0 se debe seguir paginando, en caso contrario se debe ir al siguiente link)
            "jobs": 0,
            // Arreglo de URLs
            "urls": [""],
            "currentUrl": 0
        };
    } else {
        out["pass_it"] = pass_it;
    }

    if (out["pass_it"]["jobs"] > 0) {
        // Tiene siguiente página!!! -- Codificar la paginación
        out["has_next_page"] = true;
    } else {
        // No tiene siguiente página!! (y se procede a preguntar por el multilink)
        out["pass_it"]["currentUrl"] += 1;
        // Pregunta si la siguiente url existe
        if (out["pass_it"]["currentUrl"] < out["pass_it"]["urls"].length) {
            //var url = out["pass_it"].urls[out["pass_it"]["currentUrl"]];
            // window.location.href = url;
            out["has_next_page"] = true;
        } else {
            out["has_next_page"] = false;
        }
    }

    out["wait"] = true;
    return out;
})();


/* ----------- CON PAGINAS step pagination ---------*/

(function () {
    var out = {};
    if (!pass_it["urls"]) {
        out["pass_it"] = {
            "currentUrl": 0,
            "urls": [
                "https://www.pertemps-doctors.co.uk/jobs",
                "https://www.pertemps-ahp.co.uk/",
                "https://www.pertemps-nurses.co.uk/"
            ]
        };
    } else {
        out["pass_it"] = pass_it;
    }
    var next_page_selector = "li.active + li > a"; // SELECTOR DE LA PAGINA INTERNA DE CADA URL
    var clickable_elem = document.querySelector(next_page_selector);
    if (clickable_elem) {
        //msg("go to next page...");
        clickable_elem.click();
        out["has_next_page"] = true;
    } else {
        //codigo multilink  
        out["pass_it"]["currentUrl"] += 1;
        if (out["pass_it"]["currentUrl"] < out["pass_it"]["urls"].length) {
            //msg("next URL:>");
            var url = out["pass_it"].urls[out["pass_it"]["currentUrl"]];
            window.location.href = url;
            out["has_next_page"] = true;
        } else {
            out["has_next_page"] = false;
        }
    }
    out.waitFor = "div.widget.widget-job";  // Selector de los jobs
    return out;
})();