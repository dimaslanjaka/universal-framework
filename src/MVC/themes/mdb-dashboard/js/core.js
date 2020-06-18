$(document).ready(function() {
  setTimeout(() => {
    $('.mdb-select').not('.select-wrapper').materialSelect();
    $('input,textarea').each(function(i, el) {
      if (!empty($(el).val())) {
        var labels = $(el).closest('div').find('label');
        if (labels.length) {
          if (!labels.hasClass('active')) {
            labels.addClass('active');
          }
        }
      }
    });
    $('[data-toggle="modal"]').each(function(i, el) {
      if (!$(el).attr('data-backdrop')) {
        $(el).attr('data-backdrop', 'true');
      }
    });
  }, 2000);

  $("#button-collapse").sideNav();
  new WOW().init();
  var target = $(location).attr("hash");
  var offset = ($(this).attr('data-offset') ? $(this).attr('data-offset') : 0);
  if ($(target).length) {
    $('body,html').animate({
      scrollTop: $(target).offset().top - offset
    }, 700);
  }

  setTimeout(() => {
    framework().js('/node_modules/ua-parser-js/dist/ua-parser.min.js', function() {
      window.addEventListener("resize", function() {
        getDebugInfo();
      }, false);

      window.addEventListener("orientationchange", function() {
        getDebugInfo();
      }, false);

      getDebugInfo();
    });
  }, 670);
});

function getDebugInfo() {
  var infoSections = [];
  var parser = new UAParser();
  var userOs = parser.getOS();
  var userDevice = parser.getDevice();
  var userBrowser = parser.getBrowser();
  var debugContainer = document.getElementById("debug-container");

  if (userOs && userOs.name && userOs.version) {
    infoSections.push({
      name: 'OS',
      value: userOs.name + ' ' + userOs.version
    });
  }

  if (userBrowser && userBrowser.name && userBrowser.version) {
    infoSections.push({
      name: 'Browser',
      value: userBrowser.name + ' ' + userBrowser.version
    });
  }

  if (userDevice && userDevice.vendor && userDevice.model) {
    infoSections.push({
      name: 'Device',
      value: userBrowser.vendor + ' ' + userBrowser.model
    });
  } else {
    infoSections.push({
      name: 'Device',
      value: 'N/A'
    });
  }

  ip.get(function(Ip) {
    infoSections.push({
      name: 'IP',
      value: Ip
    });
  });

  if (window) {
    if (window.screen) {
      infoSections.push({
        name: 'Screen resolution',
        value: window.screen.width + 'x' + window.screen.height
      });
      infoSections.push({
        name: 'Available screen space',
        value: window.screen.availWidth + 'x' + window.screen.availHeight
      });
    }

    infoSections.push({
      name: 'Browser window size',
      value: window.innerWidth + 'x' + window.innerHeight
    });
    infoSections.push({
      name: 'Device pixel ratio',
      value: window.devicePixelRatio
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