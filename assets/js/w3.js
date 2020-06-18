  var loadCSSFiles  = function() {
    var links = ["//www.w3schools.com/w3css/4/w3.css"], headElement = document.getElementsByTagName("head")[0], linkElement, i;
    for (i = 0; i < links.length; i++) {
      linkElement = document.createElement("link");
      linkElement.rel = "stylesheet";
      linkElement.href = links[i];
      headElement.appendChild(linkElement);
    }
  };
  var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;
  if (raf) {
    raf(loadCSSFiles);
  }
  else {
    window.addEventListener("load", loadCSSFiles);
  }
