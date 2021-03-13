<div class="row">
  <div class="col">
    <div class="jumbotron">
      <h1 class="az-logo">Youtube <span>Downloader</span></h1>
      <?=(get_option('a1') ? get_option('a1') : '<hr>'); ?>
      <div countdown="5" data-callback="durl"></div>
      <div class="row">
        <div class="col-md-3 text-center">
          <span class="tx-info" id="TXT">please wait...</span>
          <button id="linked" class="btn btn-outline-success btn-block" disabled>Visit Link</button>
        </div>
        <div class="col-md-9">
          <?=(get_option('yt-ads') ? get_option('yt-ads') : '<img src="https://imgdb.net/images/6015.png" class="img-responsive" width="100%" height="100%"/>'); ?>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="row">
  <?php
  $f = file(ROOT . '/config/sitemap/sitemap.txt', FILE_SKIP_EMPTY_LINES);
  rsort($f);
  foreach ($f as $W) {
    //echo $core->precom(trim($W)) . '<hr/>';
  }
  ?>
</div>



<script>
  var eurl = '<?=urldecode($subrequest[2]); ?>';

  function durl() {
    if (eurl) {
      LS('/assets/components/crypto-js/crypto-js.js', function() {
        var d = CryptoJS.AES.decrypt(atob(eurl), (typeof hash_pass != 'undefined' ? hash_pass : location.host))
          .toString(
            CryptoJS.enc.Utf8);
        var s = document.getElementById('linked')
        s.setAttribute('data-redirect', d);
        s.removeAttribute('disabled');
        document.getElementById('TXT').innerHTML = 'Here is your link <i class="fas fa-arrow-down"></i>';
      });
    }
  }

  function LS(url, callback) {
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onreadystatechange = callback;
    script.onload = callback;
    head.appendChild(script);
  }
</script>