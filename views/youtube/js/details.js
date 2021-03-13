/** AREA CHART **/
var ctx = document.getElementById('chartArea').getContext('2d');

var gradient = ctx.createLinearGradient(0, 240, 0, 0);
gradient.addColorStop(0, 'rgba(0,123,255,0)');
gradient.addColorStop(1, 'rgba(0,123,255,.3)');

if (ctx) {
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: (typeof dataCount != 'undefined' ? dataCount : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
      datasets: [{
        data: (typeof dataChart != 'undefined' ? dataChart : [12, 15, 18, 40, 35, 38, 32, 20, 25, 29, 34, 31]),
        borderColor: '#007bff',
        borderWidth: 1,
        backgroundColor: gradient
      }]
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
        labels: {
          display: false
        }
      },
      scales: {
        yAxes: [{
          display: false,
          ticks: {
            beginAtZero: true,
            fontSize: 10,
            max: 80
          }
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true,
            fontSize: 11,
            fontFamily: 'Arial'
          }
        }]
      }
    }
  });
}

var parse_url = function (href) {
  var l = document.createElement("a");
  l.href = href;
  return l;
};
var mp3mp4 = jQuery('button#mp3, button#mp4');

if (mp3mp4.length) {
  var id = mp3mp4.attr('data-id');
  if (id && (SECS && SECS < 1000)) {
    jQuery.post('/youtube/engine', { id: id, mp3: true }, function(){
      remx();
    });
  } else{
    remx();
    jQuery('button#mp3').attr('disabled', true).html('Unavailable');
  }
}

mp3mp4.on('click', function (E) {
  var t = jQuery(this),
    tid = t.attr('id'),
    ID = t.attr('data-id'),
    du = t.attr('data-url'),
    fn = t.attr('data-title'),
    rn = 'running',
    pdata = {},
    ttext = '',
    clicked = E.type == 'click';

  if (tid == 'mp3') {
    pdata = {
      id: ID,
      mp3: true
    }
    ttext = 'Download MP3';
  } else if (tid == 'mp4') {
    pdata = {
      id: ID,
      mp4: true
    }
    ttext = 'Download MP4';
  }
  t.addClass(rn);
  //console.log(du, clicked);

  if (du && clicked) {
    var tkn = GC('session_id'),
      ys = du + '&cookie=' + tkn,
      yu = ys + '&filename=' + fn;
    var mdown = '/youtube/engine?download=' + location.host + '&url=' + encodeURIComponent(yu);
    var o = window.open(mdown, 'mp3');
    o.focus();
    setTimeout(function () {
      o.close();
      location.reload();
    }, 5000);
  } else {
    jQuery.post('/youtube/engine', pdata, function (data) { console.log(data);
      data = data.hasOwnProperty(0) ? data[0] : data;// (data[0]||data);
      if (data.hasOwnProperty('file')) {
        if (tid == 'mp3') {
          t.text(ttext);
          t.attr({
            'data-url': data.file,
            'data-title': TITLE
          });
        }
      } else if (tid == 'mp4' && data !== false && data.length > 0) {
        t.prop('disabled', true);
        t.text('Choose Format');
        var btnh = '<div class="text-success">Available</div>';
        for (var index = 0; index < data.length; index++) {
          var ed = data[index];
          var type = /[video|audio]\/([a-z0-9]{1,5})/gm.exec(ed.type);
          if (ed.hasOwnProperty('label') || ed.hasOwnProperty('quality_label') || type) {
            var txt = (ed.hasOwnProperty('label') ? ed.label : (ed.hasOwnProperty('quality_label') ? ed.quality_label : type[1]))
            var ad = {
              ext: type[1],
              filename: TITLE,
              url: '00680074007400700073003a002f002f00720065006400690072006500630074006f0072002e0067006f006f0067006c00650076006900640065006f002e0063006f006d'.hexD() + parse_url(ed.url).pathname + parse_url(ed.url).search
            }
            var ret = [];
            for (var d in ad)
              ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(ad[d]));
            var udown = '/youtube/engine?download&' + ret.join('&');
            btnh += '<div class="m-2"><button class="btn btn-primary" style="width:150px" onclick="window.open(\'' + udown + '\', \'ext\').focus()">' + txt + ' | ' + ad.ext + '</button></div>';
          }
        }
        var btng = jQuery('div#btn-g'),
          btnw = jQuery('div#video-wrap');
        btnw.removeAttr('disabled');
        btng.html(btnh);
      }
      t.removeClass(rn);
    });
  }
  setTimeout(function () {
    if (t.hasClass(rn)) {
      t.removeClass(rn);
    }
  }, 10000);
});


function GOTO(url) {
  var a = document.createElement("a");
  if (!a.click) //for IE
  {
    window.location = url;
    return;
  }
  a.setAttribute("href", url);
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
}

function GC(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}