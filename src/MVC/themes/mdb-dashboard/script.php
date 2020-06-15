<script src='/node_modules/sweetalert/dist/sweetalert.min.js'></script>
<script src='/node_modules/toastr/build/toastr.min.js'></script>
<link rel="stylesheet" href='/node_modules/toastr/build/toastr.min.css'>
<script src='/node_modules/crypto-js/crypto-js.js'></script>
<?php
$element = new HTML\element();
// datatables is defined
if (defined('datatables')) {
  include __DIR__ . '/../assets/partial/datatables.php';
}
//if select2 defined
if (defined('select2')) {
  echo '<link rel="stylesheet" href="/node_modules/select/dist/css/select2.min.css">';
  echo '<script src="/node_modules/select/dist/js/select2.min.js"></script>';
  $element->link([
    [__DIR__ . '/assets/style.select2.min.css', __DIR__ . '/assets/style.select2.css'],
  ], true, true, 'stylesheet');
  $element->script([
    [__DIR__ . '/assets/select2.parser.min.js', __DIR__ . '/assets/select2.parser.js'],
  ], true, true);
}

if (defined('jquery-ui')) {
  echo '<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>';
}

//if materialize defined
if (defined('materialize')) {
  echo '<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">'; /*$element->css([
  //'/node_modules/materialize-css/dist/css/materialize.min.css',
  '',
  ]);*/
  //echo $element->js(['/node_modules/materialize-css/dist/js/materialize.min.js']);
}
// include content css
if (isset($content) && file_exists($content)) {
  $contentSCSS = preg_replace('/\.php$/s', '.scss', $content);
  $contentCSS = preg_replace('/\.php$/s', '.css', $content);
  $contentMinCSS = preg_replace('/\.php$/s', '.min.css', $content);
  echo '<style>';
  \MVC\helper::sass($contentSCSS);
  \MVC\helper::include_asset($contentMinCSS, $contentCSS);
  echo '</style>';
}
// defined custom script
if (defined('SCRIPTSRC')) {
  $element->script(SCRIPTSRC, true, true);
} else {
  define('SCRIPTSRC', []);
}

/**
 * defined custom style src.
 *
 * @todo Dynamic include link rel stylesheet
 */
$stylesrc = defined('STYLESRC') ? STYLESRC : (defined('stylesrc') ? stylesrc : null);
if (null !== $stylesrc) {
  if (is_string($stylesrc)) {
    echo '<link rel="stylesheet" href="' . $stylesrc . '">';
  } elseif (is_array($stylesrc)) {
    foreach ($stylesrc as $src) {
      if (is_string($src) && $src = \MVC\helper::get_url_path($src)) {
        echo '<link rel="stylesheet" href="' . $src . '?cache=' . CONFIG['cache']['key'] . '">';
      } elseif (is_array($src)) {
        foreach ($src as $find) {
          if (file_exists($find) && $find = \MVC\helper::get_url_path($find)) {
            echo '<link rel="stylesheet" href="' . $find . '?cache=' . CONFIG['cache']['key'] . '">';
          }
        }
      }
    }
  }
} else {
  define('stylesrc', []);
  define('STYLESRC', []);
}

$style = defined('STYLE') && is_array(STYLE) ? STYLE : (defined('style') && is_array(style) ? style : null);
if ($style) {
  foreach (STYLE as $style) {
    if (is_string($style)) {
      if (file_exists($style)) {
        echo '<style>';
        include $style;
        echo '</style>';
      }
    }
  }
} else {
  define('style', []);
  define('STYLE', []);
}

// application javascript
echo $element->js([
  \MVC\helper::get_url_path(\MVC\helper::asset_find([
    __DIR__ . '/../assets/js/app.min.js', __DIR__ . '/../assets/js/app.js',
  ])),
]);
?>
<script>
  <?php
  //\MVC\helper::include_asset(__DIR__ . '/../assets/js/app.min.js', __DIR__ . '/../assets/js/app.js');
  if (isset($content) && file_exists($content)) {
    \MVC\helper::include_asset(__DIR__ . '/js/core.min.js', __DIR__ . '/js/core.js');
    if (isset($var['script']) && $var['script'] && file_exists($var['script'])) {
      include $var['script'];
    }
    if (isset($var['js']) && $var['js'] && file_exists($var['js'])) {
      include $var['js'];
    }
    $contentMinJS = preg_replace('/\.php$/s', '.min.js', $content);
    $contentJS = preg_replace('/\.php$/s', '.js', $content);
    $contentBABELJS = preg_replace('/\.php$/s', '.babel.js', $content);
    \MVC\helper::babel($contentBABELJS);
    \MVC\helper::include_asset($contentMinJS, $contentJS);
  }
  ?>
</script>

<script>
  <?php
  if (defined('SCRIPT')) {
    foreach (SCRIPT as $primary => $secondary) {
      \MVC\helper::include_asset($primary, $secondary);
    }
  } else {
    define('SCRIPT', '');
  }
  ?>
</script>
<?php
//include __DIR__ . '/bg.php';