job.html = splitDescriptionRemovetor(job.html);

function splitDescriptionRemovetor(html, split_w = ' ') {
    var NewHtml = html;
    var expression1 = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex1 = new RegExp(expression1);
    var regex = new RegExp(expression);
    var t = html.split(split_w);
    for (const a of t) {
        if (a.match(regex) || a.match(regex1)) {
            NewHtml = NewHtml.replace(a, '').trim();
        }
    }
    return NewHtml;
}