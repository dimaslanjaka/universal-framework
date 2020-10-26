<!--<script src='<?= path2url(__DIR__ . '/src/ajax.min.js') ?>'></script>-->
<script src='/node_modules/sweetalert/dist/sweetalert.min.js'></script>
<script src='/node_modules/toastr/build/toastr.min.js'></script>
<link rel="stylesheet" href='/node_modules/toastr/build/toastr.min.css'>
<script src='/node_modules/crypto-js/crypto-js.js'></script>
<!--<script src='/node_modules/requirejs/require.js'></script>-->
<script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.19/js/jquery.dataTables.min.js'></script>
<script src='https://cdn.datatables.net/responsive/2.2.3/js/dataTables.responsive.min.js'></script>
<script src='https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js'></script>

<?php

// application javascript
echo $element->js([
  /*
  \MVC\helper::get_url_path(\MVC\helper::asset_find([
    __DIR__ . '/../assets/js/app.min.js', __DIR__ . '/../assets/js/app.js'
  ]))
  */
  path2url(__DIR__ . '/../assets/js/app.js')
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
