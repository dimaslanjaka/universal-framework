//console.log disabler
console.log = function() {alert('Fuck Dumpers');window.location.href=kembali;}

//Backspace Disabler
$(function(){
    
    var rx = /INPUT|SELECT|TEXTAREA/i;

    $(document).bind("keydown keypress", function(e){
        if( e.which == 8 ){ // 8 == backspace
            if(!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly ){
                e.preventDefault();
            }
        }
    });
});

//Keyboard Functions Disabler
window.onload = function() {
    document.addEventListener("contextmenu", function(e){
      e.preventDefault();
    }, false);
    document.addEventListener("keydown", function(e) {
    //document.onkeydown = function(e) {
      // "I" key
      if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
        disabledEvent(e);
      }
      // "J" key
      if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
        disabledEvent(e);
      }
      // "S" key + macOS
      if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        disabledEvent(e);
      }
      // "U" key
      if (e.ctrlKey && e.keyCode == 85) {
        disabledEvent(e);
      }
      // "F12" key
      if (event.keyCode == 123) {
        disabledEvent(e);
      }
    }, false);
    function disabledEvent(e){
      if (e.stopPropagation){
        e.stopPropagation();
      } else if (window.event){
        window.event.cancelBubble = true;
      }
      e.preventDefault();
      return false;
    }
  };

//Right Click Disabler
var message = "Right Click Disabled";
///////////////////////////////////
function clickIE() {
    if (document.all) {
        (message);
        return false;
    }
}

function clickNS(e) {
    if (document.layers || (document.getElementById && !document.all)) {
        if (e.which == 2 || e.which == 3) {
            (message);
            return false;
        }
    }
}
if (document.layers) {
    document.captureEvents(Event.MOUSEDOWN);
    document.onmousedown = clickNS;
} else {
    document.onmouseup = clickNS;
    document.oncontextmenu = clickIE;
}

document.oncontextmenu = new Function("return false");
