(function () {
    const out = {};

    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function (x) { return x; };
    msg("-----------PAGINACIÓN--------------");
    msg(pass_it);
    msg("-----------/PAGINACIÓN----------------");

    if (!pass_it["urls"]) {
        out["pass_it"] = {
            "cont": 1,
            "categorias": ["100", "110", "108", "106", "114", "105"],
            "urls": ["https://www.jobs.ch/api/v1/public/search?category-ids%5B%5D=100&page=1&rows=20",
                "https://www.jobs.ch/api/v1/public/search?category-ids%5B%5D=110&page=1&rows=20",
                "https://www.jobs.ch/api/v1/public/search?category-ids%5B%5D=108&page=1&rows=20",
                "https://www.jobs.ch/api/v1/public/search?category-ids%5B%5D=105&page=1&rows=20",
                "https://www.jobs.ch/api/v1/public/search?category-ids%5B%5D=114&page=1&rows=20",
                "https://www.jobs.ch/api/v1/public/search?category-ids%5B%5D=106&page=1&rows=20"
            ],
            "currentUrl": 0
        };
    } else {
        out["pass_it"] = pass_it;
    }
    if (out["pass_it"].cont < 100) {
        out["pass_it"].cont++;
        var newUrlCompany = "https://www.jobs.ch/api/v1/public/search?category-ids%5B%5D=" + out["pass_it"].categorias[out["pass_it"]["currentUrl"]] + '&page=' + out["pass_it"].cont + '&rows=20&sort=date';
        window.location.href = newUrlCompany;
        out["has_next_page"] = true;
        msg(newUrlCompany)
    } else {
        out["pass_it"]["currentUrl"] += 1;
        if (out["pass_it"]["currentUrl"] < out["pass_it"]["urls"].length) {
            var url = out["pass_it"].urls[out["pass_it"]["currentUrl"]];
            window.location.href = url;
            out["pass_it"].cont = 1;
            out["has_next_page"] = true;
        } else {
            out["has_next_page"] = false;
        }

    }
    out.waitFor = 'pre';
    out.pic = true;
    return out;
})();
