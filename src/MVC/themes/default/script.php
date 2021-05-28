<?php

use Filemanager\file;

if (!defined('THEME_DIR')) {
  define('THEME_DIR', __DIR__);
}
?>
<script src='/node_modules/sweetalert/dist/sweetalert.min.js'></script>
<script src='/node_modules/toastr/build/toastr.min.js'></script>
<link rel="stylesheet" href='/node_modules/toastr/build/toastr.min.css'>
<script src='/node_modules/crypto-js/crypto-js.js'></script>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

<!--script src="<?php echo path2url(THEME_DIR . '/js/core.min.js'); ?>" async></script>
<script>
  let scriptsrc = `<?php echo path2url(THEME_DIR . '/../assets/js/app.min.js'); ?>`;
  let myScript = document.createElement("script");
  myScript.setAttribute("src", scriptsrc);
  document.body.appendChild(myScript);
</script-->
<?php
$element = new HTML\element();
// datatables is defined
if (defined('datatables')) {
  include THEME_DIR . '/../assets/partial/datatables.php';
}
//if select2 defined
if (defined('select2')) {
  echo '<link rel="stylesheet" href="/node_modules/select2/dist/css/select2.min.css">' . PHP_EOL;
  echo '<script src="/node_modules/select2/dist/js/select2.min.js"></script>' . PHP_EOL;
  $element->link([
    [THEME_DIR . '/assets/style.select2.min.css', THEME_DIR . '/assets/style.select2.css'],
  ], true, true, 'stylesheet');
  $element->script([
    [THEME_DIR . '/assets/select2.parser.min.js', THEME_DIR . '/assets/select2.parser.js'],
  ], true, true);
}

//if materialize defined
if (defined('materialize')) {
  echo '<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">' . PHP_EOL;
}

// application javascript
echo $element->js([
  \MVC\helper::get_url_path(\MVC\helper::asset_find([
    THEME_DIR . '/../assets/js/app.min.js', THEME_DIR . '/../assets/js/app.js',
  ])),
  \MVC\helper::get_url_path(\MVC\helper::asset_find([
    THEME_DIR . '/js/core.min.js', THEME_DIR . '/js/core.js',
  ])),
]) . PHP_EOL;

if (defined('jquery-ui')) {
  echo '<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>' . PHP_EOL;
}

/**
 * defined custom script src.
 *
 * @todo Dynamic include script src
 */
$scriptsrc = defined('SCRIPTSRC') ? SCRIPTSRC : (defined('scriptsrc') ? scriptsrc : null);

if (null !== $scriptsrc) {
  if (is_string($scriptsrc)) {
    if (startsWith($scriptsrc, 'http')) {
      echo '<script src="' . $scriptsrc . '"></script>' . PHP_EOL;
    } elseif (file_exists($scriptsrc)) {
      $scriptsrc = \MVC\helper::get_url_path($scriptsrc, true);
      if (!empty(trim($scriptsrc))) {
        echo '<script src="' . $scriptsrc . '"></script>' . PHP_EOL;
      }
    }
  } elseif (is_array($scriptsrc)) {
    foreach ($scriptsrc as $src) {
      if (is_string($src)) {
        $src = \MVC\helper::get_url_path($src, true);
        if (!empty(trim($src))) {
          echo '<script srce="' . $src . '?cache=' . CONFIG['cache']['key'] . '"></script>' . PHP_EOL;
        } else {
          echo htmlcomment("$src not exists") . PHP_EOL;
        }
      } elseif (is_array($src)) {
        foreach ($src as $find) {
          if (file_exists($find)) {
            $find = \MVC\helper::get_url_path($find, true);
            if (!empty(trim($find))) {
              echo '<script srcx="' . $find . '?cache=' . CONFIG['cache']['key'] . '"></script>' . PHP_EOL;
            }
          } else {
            echo htmlcomment("$find not exists") . PHP_EOL;
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
    echo '<link rel="stylesheet" href="' . $stylesrc . '">' . PHP_EOL;
  } elseif (is_array($stylesrc)) {
    foreach ($stylesrc as $src) {
      if (is_string($src)) {
        if ($src = \MVC\helper::get_url_path($src, true) && !empty(trim($src))) {
          echo '<link rel="stylesheet" href="' . $src . '?cache=' . CONFIG['cache']['key'] . '">' . PHP_EOL;
        } else {
          echo htmlcomment("$src not exists") . PHP_EOL;
        }
      } elseif (is_array($src)) {
        foreach ($src as $find) {
          if (file_exists($find) && $find = \MVC\helper::get_url_path($find, true) && !empty(trim($find))) {
            echo '<link rel="stylesheet" href="' . $find . '?cache=' . CONFIG['cache']['key'] . '">' . PHP_EOL;
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
        echo '</style>' . PHP_EOL;
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
    echo $element->css([$href]) . PHP_EOL;
  }
}

// process views content js
if (isset($content) && file_exists($content)) {
  $contentMinJS = preg_replace('/\.php$/s', '.min.js', $content);
  $contentJS = preg_replace('/\.php$/s', '.js', $content);
  //$contentBABELJS = preg_replace('/\.php$/s', '.babel.js', $content);
  ///\MVC\helper::babel($contentBABELJS);
  $contentModule = preg_replace('/\.php$/s', '.module.js', $content);
  if (file_exists($contentModule)) {
    $getModule = file::get($contentModule);
    if (!empty($getModule)) {
      echo "<script type='module'>\n$getModule\n</script>\n";
    }
  }

  $src = \MVC\helper::get_url_path([$contentMinJS, $contentJS], true);

  if (!empty(trim($src))) {
    echo "<script src='$src' async></script>\n";
  } else if (!file_exists($contentModule)) {
    echo "<comment style=\"display:none\">$src, $contentMinJS, $contentJS not found</comment>\n";
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
