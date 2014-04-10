function toggle(id) {
    var el = document.getElementById(id);
    var img = document.getElementById("arrow");
    var box = el.getAttribute("class");
    if(box == "hide"){
        el.setAttribute("class", "show");
        delay(img, "/home/andrea/Documents/htmltest/images/Back24.gif", 400);
    }
    else{
        el.setAttribute("class", "hide");
        delay(img, "/home/andrea/Documents/htmltest/images/Forward24.gif", 400);
    }
}

function delay(elem, src, delayTime){
    window.setTimeout(function() {elem.setAttribute("src", src);}, delayTime);
}

