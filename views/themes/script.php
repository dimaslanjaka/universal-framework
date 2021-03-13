<?php
header('Content-Type: application/javascript; charset=utf-8');
$require = json_decode(file_get_contents(__DIR__. '/require.json'));
?>
  define(["jquery", "xor", "bootstrap-bundle", "ionicons", "select2", "websocket", "searchjs"], function ($) {
    return this;
  });

require(<?= json_encode($require -> require) ?>, require_exec);

function require_exec(<?= $require -> function ?>) {
  function XORe(pass, text) {
    return XORCipher.encode(pass, text);
  }

  function XORd(pass, enc) {
    return XORCipher.decode(pass, enc);
  }
  var environtment = '<?= $core->environtment; ?>';
  $(function () {
    'use strict'

    $('.az-iconbar .nav-link').on('click', function (e) {
      e.preventDefault();

      $(this).addClass('active');
      $(this).siblings().removeClass('active');

      $('.az-iconbar-aside').addClass('show');

      var targ = $(this).attr('href');
      $(targ).addClass('show');
      $(targ).siblings().removeClass('show');
    });

    $('.az-iconbar-toggle-menu').on('click', function (e) {
      e.preventDefault();

      if (window.matchMedia('(min-width: 992px)').matches) {
        $('.az-iconbar .nav-link.active').removeClass('active');
        $('.az-iconbar-aside').removeClass('show');
      } else {
        $('body').removeClass('az-iconbar-show');
      }
    })

    $('#azIconbarShow').on('click', function (e) {
      e.preventDefault();
      $('body').toggleClass('az-iconbar-show');

      var targ = $('.az-iconbar .nav-link.active').attr('href');
      $(targ).addClass('show');
    });

    $(document).bind('click touchstart', function (e) {
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
<?= javascript($script); ?>
});
}
if (location.host == 'cdpn.io') {
  console.clear();
}