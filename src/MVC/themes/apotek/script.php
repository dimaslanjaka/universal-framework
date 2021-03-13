<!--<script src='<?= path2url(__DIR__ . '/src/ajax.min.js') ?>'></script>-->
<script src='/node_modules/sweetalert/dist/sweetalert.min.js'></script>
<script src='/node_modules/toastr/build/toastr.min.js'></script>
<link rel="stylesheet" href='/node_modules/toastr/build/toastr.min.css'>
<script src='/node_modules/crypto-js/crypto-js.js'></script>
<!--<script src='/node_modules/requirejs/require.js'></script>-->
<script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.19/js/jquery.dataTables.min.js'></script>

<!-- datatables -->
<script src='https://cdn.datatables.net/responsive/2.2.3/js/dataTables.responsive.min.js'></script>
<script src='https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js'></script>
<!-- Buttons bootstrap4 -->
<link rel='stylesheet' href='https://cdn.datatables.net/buttons/1.5.2/css/buttons.bootstrap4.min.css'>
<script src='https://cdn.datatables.net/buttons/1.5.2/js/dataTables.buttons.min.js'></script>
<script src='https://cdn.datatables.net/buttons/1.5.2/js/buttons.bootstrap4.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js'></script>
<script src='https://cdn.datatables.net/buttons/1.5.2/js/buttons.html5.min.js'></script>
<script src='https://cdn.datatables.net/buttons/1.5.2/js/buttons.print.min.js'></script>
<script src='https://cdn.datatables.net/buttons/1.5.2/js/buttons.colVis.min.js'></script>
<script>
  /* disable alert warning */
  $.fn.dataTable.ext.errMode = 'none';
</script>
<!-- /datatables -->

<!-- select2 -->
<script src='https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.full.js'></script>
<script>
  /* set default theme to bootstrap */
  $.fn.select2.defaults.set("theme", "bootstrap");
</script>
<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css'>
<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/select2-bootstrap-theme/0.1.0-beta.7/select2-bootstrap.min.css'>
<!-- /select2 -->

<!-- Fancybox -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css" />
<script src="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js"></script>
<!-- /Fancybox -->

<?php

// application javascript
echo $element->js([
  \MVC\helper::get_url_path(\MVC\helper::asset_find([
    __DIR__ . '/../assets/js/app.min.js', __DIR__ . '/../assets/js/app.js'
  ]))
  //path2url(__DIR__ . '/../assets/js/app.js')
]);

// process view content css
if (isset($content) && file_exists($content)) {
  $contentCSS = preg_replace('/\.php$/s', '.css', $content);
  $contentMinCSS = preg_replace('/\.php$/s', '.min.css', $content);
  //$href = \MVC\helper::get_url_path(\MVC\helper::asset_find([$contentMinCSS, $contentCSS]));
  $href = \MVC\helper::get_url_path([$contentMinCSS, $contentCSS]);
  if (!empty($href)) {
    echo $element->css([$href]);
  }
}

// process views content js
if (isset($content) && file_exists($content)) {
  $contentMinJS = preg_replace('/\.php$/s', '.min.js', $content);
  $contentJS = preg_replace('/\.php$/s', '.js', $content);
  //$contentBABELJS = preg_replace('/\.php$/s', '.babel.js', $content);
  ///\MVC\helper::babel($contentBABELJS);
  $src = \MVC\helper::get_url_path([$contentMinJS, $contentJS]);

  if (!empty(trim($src))) {
    echo $element->js([$src]);
  } else {
    echo "<comment style=\"display:none\">$src, $contentMinJS, $contentJS not found</comment>";
  }
}
?>

<!-- Custom -->
<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
<script type="text/javascript">
  <?php
  include __DIR__ . '/custom/custom.min.js';
  ?>
</script>
<!-- /Custom -->