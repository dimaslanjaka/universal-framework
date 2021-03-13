// @ts-nocheck
const WINDOW_NAME = "AGC";
if (typeof AUTH_URL == 'undefined') {
  var U = "/AGC/callback";
  var Uv = U + "?verify=true";
} else {
  var U = AUTH_URL;
  var Uv = "/AGC/callback?verify=true";
}
if (window.location.pathname.indexOf('callback') > -1) {
  $("#loading, #verification").fadeIn("fast");
  $("#google").fadeOut("fast");
  var myWindow = window.open(U, 'WINDOW_NAME').focus();
  checkData(myWindow);
} else {
  $("#loading, #verification").fadeOut("fast");
  $("#google").fadeIn("fast");
}
$("#video-e").fadeOut("fast");
$("#show-v").click(function () {
  $(this).fadeOut("fast");
  $("#video-e").fadeIn("fast");
});
$("h1").click(function () {
  $("#google").fadeOut(1500, function () {
    $("#loading, #verification").fadeIn(1500);
    var myWindow = window.open(U, 'WINDOW_NAME').focus();
    checkData(myWindow);
  });
});
$("#google, #auth").click(function () {
  var myWindow = window.open(U, 'WINDOW_NAME').focus();
  $(this).fadeOut(1500);
  $("#loading, #verification").fadeIn(1500);
  checkData(myWindow);
});
$("#verify").click(function () {
  win = window.open(Uv, 'WINDOW_NAME').focus();
});


function checkData(myWindow) {
  $.ajax({
    url: '/AGC/callback?verify=true',
    complete: function (point) {
      var rtext;
      var error = false;

      if (isJSON(point.responseText)) {
        var x = JSON.parse(point.responseText);
        if (x.success) {
          rtext = "Verification Successful<hr/>Enjoy Creating Blogger Article Instantly";
          myWindow.close();
          error = true;
          setTimeout(function () {
            window.location.href = "/AGC/lists";
          }, 3000);
        } else {
          rtext = "Not Verified<hr/>Subscribe First To Access";
        }
      } else {
        console.log(x);
        error = true;
        rtext = "Event Listener Breaks<hr/>Please Contact Admin on +6285655667573";
      }

      console.log(rtext);
      if (!error) {
        setTimeout(checkData(myWindow), 1000);
      }
    },
    cache: false
  });
}


$.ajax({
  url: "https://www.googleapis.com/youtube/v3/channels?part=snippet&id=UCGNaoefvJRfd15fo-LQ0zvg&key=" + keys,
  complete: function (data) {
    var resp = data.responseText;
    console.log(data.responseText);
    if (isJSON(resp)) {
      resp = JSON.parse(resp);
    }
    var items = resp.items[0].snippet;
    var img_src = items.thumbnails.high.url;
    var title = items.title;
    var desc = items.description;
    var htm = '<img src="' + img_src + '" id="rounded" />';
    htm += '<div>' + title + '<br/>' + desc + '</div>';
    var c = document.getElementById("channels");
    if (c) {
      c.innerHTML = htm;
    }
  }
});

function appendHtml(el, str) {
  var div = document.createElement('div');
  div.innerHTML = str;
  while (div.children.length > 0) {
    el.appendChild(div.children[0]);
  }
}

function isJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}