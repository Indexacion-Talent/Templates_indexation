// remover scripts, styles
removeSelector('script, style, a, img', document);
function removeSelector(selectorDom, elements) {
    selectorDom.split(',').forEach(selector => { elements.querySelectorAll(selector).forEach(function (elem) { elem.remove() }) })
}