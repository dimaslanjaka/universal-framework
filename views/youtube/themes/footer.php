<div class="az-footer">
  <div class="container">
    <span>&copy; 2018 <?= (get_option('yt-site-title') ? get_option('yt-site-title') : 'Youtube Downloader'); ?>
      || Developed By <a href="//web-manajemen.blogspot.com" target="_blank">L3n4r0x</a></span>
    <span><small>This site is
        protected by reCAPTCHA and the Google
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
      </small></span>
  </div><!-- container -->
</div><!-- az-footer -->

<script src="/assets/components/jquery/dist/jquery.min.js"></script>
<script src="/assets/components/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ionicons/4.5.6/ionicons.js"></script>
<script src="/assets/components/jquery.flot/jquery.flot.js"></script>
<script src="/assets/components/jquery.flot/jquery.flot.categories.js"></script>
<script src="/assets/components/jquery.flot/jquery.flot.resize.js"></script>
<script src="/assets/components/chart.js/dist/Chart.bundle.min.js"></script>
<script src="/assets/components/linkifyjs/dist/linkify.min.js"></script>
<script src="/assets/components/linkifyjs/dist/linkify-jquery.min.js"></script>
<script src="/assets/components/crypto-js/crypto-js.js"></script>
<?php
if (is_dir(ROOT . '/template')) {
  echo '<script src="/template/js/chart.flot.sampledata.js"></script>';
}
?>
<?php do_shortcode('[recaptcha]');
do_shortcode('[analystic]'); ?>
<script>
  var environtment = '<?= $core->environtment; ?>';
  $(function() {
    'use strict'

    <?php
    if (isset($script) && !empty($script)) {
      if (!is_array($script)) {
        if (file_exists($script)) {
          echo "\n";
          include $script;
          echo "\n";
        }
      } else {
        foreach (array_filter($script) as $js) {
          if (file_exists($js)) {
            echo "\n";
            include $js;
            echo "\n";
          }
        }
      }
    }
    ?>
    var nav = $("#<?= $subrequest[1]; ?>-nav");
    nav.length && (nav.hasClass("active") || nav.addClass("active"));
  });
</script>
<script src="/views/js/websocket.js"> </script>
<?php
if (!isLocalhost()) {
  echo '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>';
}
?>
</body>

</html>