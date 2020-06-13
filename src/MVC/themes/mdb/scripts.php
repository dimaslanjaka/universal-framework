<script src='https://dimaslanjaka.github.io/Web-Manajemen/js/compiled.gzip.js'></script>
<script src='https://dimaslanjaka.github.io/Web-Manajemen/js/compiled.min.js'></script>
<script src='https://dimaslanjaka.github.io/Web-Manajemen/js/compiled.footer.js'></script>
<script src='https://dimaslanjaka.github.io/Web-Manajemen/js/jquery.validate.js'></script>
<!-- DataTables CSS -->
<link href="https://dimaslanjaka.github.io/Web-Manajemen/css/addons/datatables.min.css?hash=APL009" rel="stylesheet">
<!-- DataTables JS -->
<script src="https://dimaslanjaka.github.io/Web-Manajemen/js/addons/datatables.min.js?hash=APL009" type="text/javascript"></script>
<!-- DataTables Select CSS -->
<link href="https://dimaslanjaka.github.io/Web-Manajemen/css/addons/datatables-select.min.css?hash=APL009" rel="stylesheet">
<!-- DataTables Select JS -->
<script src="https://dimaslanjaka.github.io/Web-Manajemen/js/addons/datatables-select.min.js?hash=APL009" type="text/javascript"></script>
<!--RSS as Nav and Grid-->
<script src='https://dimaslanjaka.github.io/Web-Manajemen/js/compiled.rss.min.js?hash=APL009'></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert"></script>
<!--<script src="js/adsense.js?hash=APL009"></script>-->
<script src="https://dimaslanjaka.github.io/Web-Manajemen/WMI/safelink/safelink.js?hash=APL009"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
<!--<script src="https://www.google.com/recaptcha/api.js"></script>-->
<script>
  <?php
  \MVC\helper::include_asset(__DIR__ . '/../assets/js/utility.min.js', __DIR__ . '/../assets/js/utility.js');
  //include_asset(__DIR__ . '/views/rss.min.js', __DIR__ . '/views/rss.js');

  ?>
</script>
<!--Nav Collapse Controller-->
<script>
  $(document).ready(function() {
    $("html, body").animate({
      scrollTop: 0
    }, "slow");
    $(".button-collapse").sideNav();
    var el = document.querySelector('.custom-scrollbar');
    var ps = new PerfectScrollbar(el);
    <?php
  \MVC\helper::include_asset(__DIR__ . '/js/core.min.js', __DIR__ . '/js/core.js');
  if (isset($var['script']) && $var['script'] && file_exists($var['script'])) {
    include $var['script'];
  }
  if (isset($var['js']) && $var['js'] && file_exists($var['js'])) {
    include $var['js'];
  }
  $contentJS = preg_replace('/\.php$/s', '.js', $content);
  \MVC\helper::include_asset($contentJS);

  ?>
  });
</script>
<script type="text/javascript">
  var _Hasync = _Hasync || [];
  _Hasync.push(['Histats.start', '1,3860842,4,0,0,0,00010000']);
  _Hasync.push(['Histats.fasi', '1']);
  _Hasync.push(['Histats.track_hits', '']);
  (function() {
    var hs = document.createElement('script');
    hs.type = 'text/javascript';
    hs.async = true;
    hs.src = ('//s10.histats.com/js15_as.js');
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
  })();
</script>
<noscript>
  <a href="/" target="_blank"><img src="//sstatic1.histats.com/0.gif?3860842&101" alt="" class="d-none"></a>
</noscript>