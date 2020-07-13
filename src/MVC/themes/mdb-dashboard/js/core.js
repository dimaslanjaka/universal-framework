$(document).ready(function () {
  setTimeout(() => {
    $(".mdb-select").not(".select-wrapper").materialSelect();
    $("input,textarea").each(function (i, el) {
      if (!empty($(el).val())) {
        var labels = $(el).closest("div").find("label");
        if (labels.length) {
          if (!labels.hasClass("active")) {
            labels.addClass("active");
          }
        }
      }
    });
    $('[data-toggle="modal"]').each(function (i, el) {
      if (!$(el).attr("data-backdrop")) {
        $(el).attr("data-backdrop", "true");
      }
    });
  }, 2000);

  $("#button-collapse").sideNav();
  new WOW().init();
  var target = $(location).attr("hash");
  var offset = $(this).attr("data-offset") ? $(this).attr("data-offset") : 0;
  if ($(target).length) {
    $("body,html").animate(
      {
        scrollTop: $(target).offset().top - offset,
      },
      700
    );
  }

  setTimeout(() => {
    framework().js(
      "/node_modules/ua-parser-js/dist/ua-parser.min.js",
      function () {
        window.addEventListener(
          "resize",
          function () {
            getDebugInfo();
          },
          false
        );

        window.addEventListener(
          "orientationchange",
          function () {
            getDebugInfo();
          },
          false
        );

        getDebugInfo();
      }
    );
  }, 670);

  var $img = [
    "https://csshint.com/wp-content/uploads/2020/01/CSS-Animated-Backgrounds-2.gif",
    "https://images.squarespace-cdn.com/content/v1/57e38eac46c3c4b30fb01f60/1540770673639-40TXHKSVXKBUX2GB65EF/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/maxresdefault.jpg?format=2500w",
    "https://thumbs.gfycat.com/FlatFancyBufflehead-size_restricted.gif",
    "https://thumbs.gfycat.com/DisguisedTangibleArmyant-max-1mb.gif",
    "https://thumbs.gfycat.com/FortunatePoliticalBluetonguelizard-size_restricted.gif",
    "https://media.giphy.com/media/h6mBh5GMSfAvPec7Of/giphy.gif",
    "https://i.makeagif.com/media/1-17-2017/py-b7X.gif",
  ];

  if (typeof fetch == "function") {
    fetch(`https://source.unsplash.com/1600x900/?beach`).then((response) => {
      $img.push(response.url);
    });
  }
  shuffle($img);
  var random = Math.floor(Math.random() * $img.length);
  var src = $img[random];
  $(".dynamic-bg").css({
    "background-image": "url(" + src + ")",
    "-moz-background-size": "cover",
    "-webkit-background-size": "cover",
    "-o-background-size": "cover",
    "background-size": "cover",
    "background-repeat": "no-repeat",
  });
  /*$(".dynamic-bg").each(function (index, elem) {
    elem.style.backgroundImage = src;
  });*/
  console.log(`background set ${src}`);
});

function getDebugInfo() {
  var infoSections = [];
  if (typeof UAParser == "undefined") {
    return;
  }
  var parser = new UAParser();
  var userOs = parser.getOS();
  var userDevice = parser.getDevice();
  var userBrowser = parser.getBrowser();
  var debugContainer = document.getElementById("debug-container");

  if (userOs && userOs.name && userOs.version) {
    infoSections.push({
      name: "OS",
      value: userOs.name + " " + userOs.version,
    });
  }

  if (userBrowser && userBrowser.name && userBrowser.version) {
    infoSections.push({
      name: "Browser",
      value: userBrowser.name + " " + userBrowser.version,
    });
  }

  if (userDevice && userDevice.vendor && userDevice.model) {
    infoSections.push({
      name: "Device",
      value: userBrowser.vendor + " " + userBrowser.model,
    });
  } else {
    infoSections.push({
      name: "Device",
      value: "N/A",
    });
  }

  ip.get(function (Ip) {
    infoSections.push({
      name: "IP",
      value: Ip,
    });
  });

  if (window) {
    if (window.screen) {
      infoSections.push({
        name: "Screen resolution",
        value: window.screen.width + "x" + window.screen.height,
      });
      infoSections.push({
        name: "Available screen space",
        value: window.screen.availWidth + "x" + window.screen.availHeight,
      });
    }

    infoSections.push({
      name: "Browser window size",
      value: window.innerWidth + "x" + window.innerHeight,
    });
    infoSections.push({
      name: "Device pixel ratio",
      value: window.devicePixelRatio,
    });
  }

  //Old-school JS without jQuery or another framework, just for fun
  while (debugContainer.hasChildNodes()) {
    debugContainer.removeChild(debugContainer.lastChild);
  }

  for (var i = 0; i < infoSections.length; i++) {
    var debugInfo = document.createElement("div");
    debugInfo.setAttribute("class", "form-row");
    var debugName = document.createElement("div");
    debugName.setAttribute("class", "col");
    debugName.appendChild(document.createTextNode(infoSections[i].name));
    var debugValue = document.createElement("div");
    debugValue.setAttribute("class", "col");
    debugValue.appendChild(document.createTextNode(infoSections[i].value));
    debugInfo.appendChild(debugName);
    debugInfo.appendChild(debugValue);
    debugContainer.appendChild(debugInfo);
  }
}
