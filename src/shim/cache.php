<?php

/**
 * Get page cache.
 *
 * @return string
 */
function page_cache()
{
  $path = ROOT . '/tmp/html/';
  $path .= \MVC\helper::get_clean_uri(\MVC\helper::geturl());
  $path .= '/' . identifier();
  $path .= '.html';
  $path = normalize_path($path);

  return $path;
}

/**
 * Identify cached page by hour.
 *
 * @return bool
 */
function cache_expired(int $hour = 24)
{
  $file_indicator = normalize_path(page_cache());

  if (file_exists($file_indicator)) {
    $is_24hours = time() - filemtime($file_indicator) > $hour * 3600;
    if ($is_24hours) {
      \Filemanager\file::delete($file_indicator);

      return true;
    } else {
      return false; // cache valid
    }
  } else {
    return true;
  }
}

/**
 * Render theme.
 *
 * @param \MVC\themes $theme
 *
 * @return void
 */
function render(MVC\themes $theme)
{
    //global $theme;
    // render view in theme
    $theme->render();

    if (!CORS && $theme->meta['theme']) {
        process_page($theme->meta['obfuscate'], $theme);
        if ('development' == get_env() && $theme->meta['theme']) {
            echo '<!--' . get_includes() . '-->';
        }
  }
}

/**
 * Get page identifier.
 *
 * @return string
 */
function identifier()
{
  return md5(UID . serialize(\Session\session::gets(['login', 'coupon'])));
}

/**
 * Process page to using obfuscate mode or not.
 *
 * @param \MVC\themes $theme
 *
 * @return void
 */
function process_page(bool $obfuscatejs, MVC\themes $theme)
{
    //global $theme;
    $dom = new SmartDOMDocument('1.0', 'ISO-8859-15');
    $dom->preserveWhiteSpace = true;
    $dom->formatOutput = true;

    $c = ob_get();

    if (!$dom->loadHTML($c)) {
        \HTML\js::var('HTML_ERROR', json_encode(['error' => true, 'message' => 'HTML Optimizer failed']));
    echo $c;

    return;
  }

  $xpath = new SmartDOMXpath($dom);
  $title = getTitle($dom);

  $scripts = $xpath->query('//script');
  if (!empty($scripts)) {
    foreach ($scripts as $script) {
      if ($script->hasAttribute('type') && 'application/ld+json' == $script->getAttribute('type')) {
        $script->innerHTML = json_encode(json_decode(innerHTML($script)));
      }
    }
  }

  $imgs = $xpath->query('//img');
  if (!empty($imgs)) {
    foreach ($imgs as $img) {
      if (!$img->hasAttribute('title')) {
        $img->setAttribute('title', $title);
      }
      if (!$img->hasAttribute('alt')) {
        $img->setAttribute('alt', $title);
      }
      if (!$img->hasAttribute('rel')) {
        $img->setAttribute('rel', 'image');
      }
    }
  }

  $styles = $xpath->query('//style');
  if (!empty($styles)) {
    foreach ($styles as $style) {
      $style->innerHTML = trim(mincss(innerHTML($style)));
    }
  }

  $textareas = $xpath->query('//textarea');
  if (!empty($textareas)) {
    foreach ($textareas as $area) {
      $inner = trim(html_entity_decode($area->innerHTML));
      if (is_json(trim($inner))) {
        $area->setAttribute('innerhtml', base64_encode(\JSON\json::json($inner, false, false)));
      }
    }
  }

  $result = $dom->saveHTML();
  $result = prefilter(htmlmin($result));
  resolve_dir(dirname(page_cache()));
  \Filemanager\file::file(page_cache(), $result, true);
  /**
   * @var string Load admin toolbox
   */
  $result = str_replace('</html>', '', $result);
  echo $result;
  //$theme->load_admin_tools();

  echo '</html>';
}
