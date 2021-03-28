<script src='/node_modules/sweetalert/dist/sweetalert.min.js'></script>
<script src='/node_modules/toastr/build/toastr.min.js'></script>
<link rel="stylesheet" href='/node_modules/toastr/build/toastr.min.css'>
<script src='/node_modules/crypto-js/crypto-js.js'></script>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<!-- Compiled and minified CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">


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
//if materialize defined
if (defined('materialize')) {
  echo '<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">';
  echo '<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>';
}
// application javascript
echo $element->js([
  \MVC\helper::get_url_path(\MVC\helper::asset_find([
    __DIR__ . '/../assets/js/app.min.js', __DIR__ . '/../assets/js/app.js'
  ])),
  \MVC\helper::get_url_path(\MVC\helper::asset_find([
    __DIR__ . '/js/core.min.js', __DIR__ . '/js/core.js'
  ]))
]);

if (defined('jquery-ui')) {
  echo '<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>';
}

/**
 * defined custom script src.
 *
 * @todo Dynamic include script src
 */
$scriptsrc = defined('SCRIPTSRC') ? SCRIPTSRC : (defined('scriptsrc') ? scriptsrc : null);
if (null !== $scriptsrc) {
  if (is_string($scriptsrc)) {
    if (file_exists($scriptsrc)) {
      $scriptsrc = \MVC\helper::get_url_path($scriptsrc, true);
      if (!empty(trim($scriptsrc))) {
        echo '<script src="' . $scriptsrc . '"></script>';
      }
    }
  } elseif (is_array($scriptsrc)) {
    foreach ($scriptsrc as $src) {
      if (is_string($src)) {
        $src = \MVC\helper::get_url_path($src, true);
        if (!empty(trim($src))) {
          echo '<script srce="' . $src . '?cache=' . CONFIG['cache']['key'] . '"></script>';
        } else {
          echo htmlcomment("$src not exists");
        }
      } elseif (is_array($src)) {
        foreach ($src as $find) {
          if (file_exists($find)) {
            $find = \MVC\helper::get_url_path($find, true);
            if (!empty(trim($find))) {
              echo '<script srcx="' . $find . '?cache=' . CONFIG['cache']['key'] . '"></script>';
            }
          } else {
            echo htmlcomment("$find not exists");
          }
        }
      }
    }
  }
} else {
  define('scriptsrc', []);
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
    if (file_exists($stylesrc)) {
      $stylesrc = \MVC\helper::get_url_path($stylesrc, true);
    }
    echo '<link rel="stylesheet" href="' . $stylesrc . '">';
  } elseif (is_array($stylesrc)) {
    foreach ($stylesrc as $src) {
      if (is_string($src)) {
        if ($src = \MVC\helper::get_url_path($src, true) && !empty(trim($src))) {
          echo '<link rel="stylesheet" href="' . $src . '?cache=' . CONFIG['cache']['key'] . '">';
        } else {
          echo htmlcomment("$src not exists");
        }
      } elseif (is_array($src)) {
        foreach ($src as $find) {
          if (file_exists($find) && $find = \MVC\helper::get_url_path($find, true) && !empty(trim($find))) {
            echo '<link rel="stylesheet" href="' . $find . '?cache=' . CONFIG['cache']['key'] . '">';
          } else {
            echo htmlcomment("$find not exists");
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
<script>
  <?php
  if (defined('SCRIPT')) {
    foreach (SCRIPT as $primary => $secondary) {
      \MVC\helper::include_asset($primary, $secondary);
    }
  } else {
    define('SCRIPT', []);
  }
  ?>
</script>
<?php

//render stacked alert
//\MVC\alert::init()->final(true);
