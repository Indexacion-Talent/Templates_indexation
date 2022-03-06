(function(){
    var out = {};
    var button_more = 'button.btn.btn--blue.btn-load-more.active';  //1) SELECTOR DEl BOTON VER MAS JOBS
  var selector_jobs = 'ol li.block-offer';  //2)  SELECTOR DE LOS JOBS
    
    msg(pass_it);
    if(!pass_it["heights"])	out["pass_it"] = {"heights":[] , "cont":1};
    else 					out["pass_it"] = pass_it;
    
    out["has_next_page"] = true;

if (document.querySelectorAll(button_more).length == 1)	
  document.querySelector(button_more).click();
else
    out["has_next_page"] = false;


var targetPage = document.querySelectorAll(selector_jobs).length;


    if (out["pass_it"]["heights"][out["pass_it"]["heights"].length-1] == document.querySelectorAll(selector_jobs).length)
    out["has_next_page"] = false;
    else{
    out.waitForFunction = {
    "function": waitForPage.toString(),
  "args": [targetPage,selector_jobs]
};
  }

    out["pass_it"]["heights"].push(document.querySelectorAll(selector_jobs).length);  
    return out;
})();

function waitForPage (target, jobs) {
  var current = document.querySelectorAll(jobs).length;
    msg(parseInt(target) < parseInt(current));	
  return parseInt(target) < parseInt(current)

}