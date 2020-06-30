if (typeof loadScript == "undefined") {
  function loadScript(src, callback) {
    var s, r, t;
    r = false;
    s = document.createElement("script");
    s.type = "text/javascript";
    s.src = src;
    s.onload = s.onreadystatechange = function () {
      //console.log( this.readyState ); //uncomment this line to see which ready states are called.
      if (!r && (!this.readyState || this.readyState == "complete")) {
        r = true;
        callback();
      }
    };
    t = document.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(s, t);
  }
}
if (typeof loadCSS == "undefined") {
  function loadCSS(href) {
    const link = document.createElement("link");
    link.media = "print";
    link.rel = "stylesheet";
    link.href = href;
    link.onload = () => {
      link.media = "all";
    };
    document.head.appendChild(link);
  }
}
loadScript("/assets/highlight.js/highlight.pack.js", function () {
  loadCSS("/assets/highlight.js/styles/github.css");
  hljs.initHighlightingOnLoad();
  //hljs.configure({ useBR: true });

  document.addEventListener("DOMContentLoaded", prettyprint);
  prettyprint();
});

function prettyprint(event) {
  console.log("highlight.js", event);
  document.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightBlock(block);
  });
  document.querySelectorAll("pre").forEach((block) => {
    hljs.highlightBlock(block);
  });
}
