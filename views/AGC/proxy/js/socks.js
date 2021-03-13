var checked = [], queue = [], indeq = 0;

$('#proxies').on('change', function () {
  var data = parse_proxy($(this).val());
  $(this).val(data.join("\n"));
});
var formSocks = $('form#f'), queued = [];
formSocks.submit(function (e) {
  e.preventDefault();
  var p = $('#proxies').val();
  var px = parse_proxy(p);
  var data = $(this).serialize();
  var dataa = $(this).serializeArray().reduce(function (obj, item) {
    obj[item.name] = item.value;
    return obj;
  }, {});
  if (!dataa.hasOwnProperty('socks4') && !dataa.hasOwnProperty('socks5')) {
    return false;
  }
  px.forEach(function (val, i) {
    if (queued.includes(val)) {
      toastr.warning(val + ' Already In Check Queue. Skip', 'Duplicate proxy');
      return;
    }
    queued.push(val);
    queue.push(val);
    if (i == px.length - 1) {
      runSocks();
    }
  });
});
var socks5html = '', socks4html = '', progress = $('.progress-bar');
progress.closest('div.row').fadeOut();
function runSocks() {
  var start = new Date().getTime();
  var btn = formSocks.find('button');
  btn[0].setAttribute('disabled', true);
  queue = array_unique(queue);
  toastr.info('Checking proxy ' + queue[indeq]);
  var percent = Math.round(100 * (indeq + 1) / queue.length);
  progress.closest('div.row').fadeIn('slow');
  progress.text(percent + '%');
  progress.css({ 'width': percent + '%' });
  $.post('/AGC/proxy/socks?p=' + queue[indeq], $('form#f').serialize()).done(function (res) {
    console.log(res);
    if (res) {
      if (res.hasOwnProperty('socks5')) {
        var socks5 = res.socks5;
        if (socks5.hasOwnProperty('code') && socks5.code == 200) {
          var additional = socialMedia(socks5);
          var end = new Date().getTime();
          var time = end - start;
          additional += '<i class="fas fa-clock"></i><i>' + ms2minsecs(time) + '</i>';
          socks5html += '<tr><td>' + queue[indeq] + '</td><td>' + additional + '</td><td>' + socks5.anon + '</td></tr>';
          $('table#socks5 tbody').html(socks5html);
        }
      }
      if (res.hasOwnProperty('socks4')) {
        var socks4 = res.socks4;
        if (socks4.hasOwnProperty('code') && socks4.code == 200) {
          var additional = socialMedia(socks4);
          var end = new Date().getTime();
          var time = end - start;
          additional += '<i class="fas fa-clock"></i><i>' + ms2minsecs(time) + '</i>';
          socks4html += '<tr><td>' + queue[indeq] + '</td><td>' + additional + '</td><td>' + socks4.anon + '</td></tr>';
          $('table#socks4 tbody').html(socks4html);
        }
      }
    }
  }).fail(function () {
    toastr.error('Proxy ' + queue[indeq] + ' failed', 'Proxy failed');
  }).always(function () {
    indeq++;
    if (indeq < queue.length) {
      runSocks();
    }

    if (indeq == queue.length) {
      progress.closest('div.row').fadeOut();
      progress.text('0%');
      progress.css({ 'width': '0%' });
      indeq = 0;
      toastr.success('All proxies checked successfully', 'Checked');
      btn[0].removeAttribute('disabled');
      $('table#socks5 tbody').html(socks5html);
      $('table#socks4 tbody').html(socks4html);
    }
  });
}
/**
 * social media parser
 * @param {jqXHR} response
 */
function socialMedia(response) {
  var additional = '';
  if (response.hasOwnProperty('telegram') && response.telegram == true) {
    additional += '<i class="fab fa-telegram"></i>';
  }
  if (response.hasOwnProperty('google') && response.google == true) {
    additional += '<i class="fab fa-google"></i>';
  }
  if (response.hasOwnProperty('facebook') && response.facebook == true) {
    additional += '<i class="fab fa-facebook"></i>';
  }
  if (response.hasOwnProperty('youtube') && response.youtube == true) {
    additional += '<i class="fab fa-youtube"></i>';
  }
  if (response.hasOwnProperty('instagram') && response.instagram == true) {
    additional += '<i class="fab fa-instagram"></i>';
  }
  if (response.hasOwnProperty('https')) {
    if (response.https == true) {
      additional += '<i class="fas fa-lock text-success"></i>';
    } else {
      additional += '<i class="fas fa-lock-open text-danger"></i>';
    }
  }
  return additional;
}

function ms2minsecs(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}