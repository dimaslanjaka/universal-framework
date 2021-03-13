<?php
include __DIR__ . '/modal.php';
?>
<!--
  <script src="/assets/components/flot.curvedlines/curvedLines.js"></script>
  <script src="/assets/components/jquery.flot/jquery.flot.js"></script>
<script src="/assets/components/jquery.flot/jquery.flot.categories.js"></script>
<script src="/assets/components/jquery.flot/jquery.flot.resize.js"></script>
  <script src="/assets/components/jquery/dist/jquery.min.js"></script>
<script src="/assets/components/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ionicons/4.5.6/ionicons.js"></script>
  <script src="/assets/components/datatables.net-dt/js/dataTables.dataTables.min.js"></script>
<script src="/assets/components/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
<script src="/assets/components/datatables.net-responsive-dt/js/responsive.dataTables.min.js"></script>
  <script src="/assets/components/select2/dist/js/select2.min.js"></script>
  <script src="/assets/components/datatables.net/js/jquery.dataTables.min.js"></script>
  <script src="/assets/components/chart.js/dist/Chart.bundle.min.js"></script>
  <script src="/views/js/websocket.js"></script>
<script src="/views/js/search.js"></script>
-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.3/require.min.js"></script>
<?php
$packages = json_decode(file_get_contents(__DIR__ . '/packages.json'));
if (defined('PACKAGES')) {
  if (is_iterable(constant('PACKAGES'))) $packages = array_merge($packages, constant('PACKAGES'));
}
$require = json_decode(file_get_contents(__DIR__ . '/require.json'));
?>
<script id="rendered-js">
  require.config(<?= json_encode($packages, JSON_PRETTY_PRINT) ?>);
  <?php
  if (isLocalhost()) {
  ?>
    require.config({
      urlArgs: "v=" + (new Date()).getTime()
    });
  <?php
  }
  ?>
  require(["jquery", "crypto-js", "xor", "bootstrap-bundle", "ionicons", "websocket", "searchjs"], function($, CryptoJS) {
    //require(<?= json_encode($require->require) ?>, require_exec);
    function XORe(pass, text) {
      return XORCipher.encode(pass, text);
    }

    function XORd(pass, enc) {
      return XORCipher.decode(pass, enc);
    }
    var environtment = '<?= $core->environtment; ?>';
    $(function() {
      'use strict'

      $('.az-iconbar .nav-link').on('click', function(e) {
        e.preventDefault();

        $(this).addClass('active');
        $(this).siblings().removeClass('active');

        $('.az-iconbar-aside').addClass('show');

        var targ = $(this).attr('href');
        $(targ).addClass('show');
        $(targ).siblings().removeClass('show');
      });

      $('.az-iconbar-toggle-menu').on('click', function(e) {
        e.preventDefault();

        if (window.matchMedia('(min-width: 992px)').matches) {
          $('.az-iconbar .nav-link.active').removeClass('active');
          $('.az-iconbar-aside').removeClass('show');
        } else {
          $('body').removeClass('az-iconbar-show');
        }
      })

      $('#azIconbarShow').on('click', function(e) {
        e.preventDefault();
        $('body').toggleClass('az-iconbar-show');

        var targ = $('.az-iconbar .nav-link.active').attr('href');
        $(targ).addClass('show');
      });

      $(document).bind('click touchstart', function(e) {
        e.stopPropagation();

        var azContent = $(e.target).closest('.az-content').length;
        var azIconBarMenu = $(e.target).closest('.az-header-menu-icon').length;

        if (azContent) {
          $('.az-iconbar-aside').removeClass('show');

          // for mobile
          if (!azIconBarMenu) {
            $('body').removeClass('az-iconbar-show');
          }
        }
      });

      //include script
      <?= javascript($script);
      short_recaptcha(true);
      ganalystic(true); ?>
    });
  });
  <?php
  $bname = basename($content, '.php');
  $dname = dirname($content);

  if (file_exists($dname . '/js/' . $bname . '.require.js')) {
    include $dname . '/js/' . $bname . '.require.js';
  }
  ?>
</script>

</body>

</html>