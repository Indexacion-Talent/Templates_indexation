/* ----------------------------- PAGINATION SIMPLE ---------------------------- */

(function () {
    var out = {};
    out["pass_it"] = pass_it;

    if (typeof msg == "undefined") msg = function (x) { return x; };

    out["pass_it"]["currentUrl"] += 1;
    if (out["pass_it"]["currentUrl"] < out["pass_it"]["urls"].length) {
        var url = out["pass_it"].urls[out["pass_it"]["currentUrl"]];
        window.location.href = url;
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }

    return out;
})();