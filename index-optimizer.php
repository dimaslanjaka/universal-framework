<?php

/**
 * HTML Optimizer and Obfuscator.
 *
 * @param \MVC\router $router
 * @param string      $buffer_content
 * @param bool        $obfuscatejs
 * @param string      $uri
 * @param bool        $is_development
 * @param bool        $is_reloaded
 * @param string      $filesave
 *
 * @return void
 */
function optimize(string $buffer_content, bool $obfuscatejs, string $uri, bool $is_development, bool $is_reloaded, string $filesave)
{
  $dom = \simplehtmldom\helper::str_get_html($buffer_content);
  $scripts = $dom->find('script');
  if ($scripts) {
    $script_index = 0;
    foreach ($scripts as $js) {
      ++$script_index;
      $scriptText = trim($js->innertext);
      if ($js->src || empty($scriptText)) {
        continue;
      } elseif ('application/ld+json' == $js->type) {
        $js->innertext = preg_replace('/\s+/m', '', $scriptText);
        continue;
      }

      // begin obfuscate and minify
      $folder = normalize_path(ROOT) . '/processed/js/';
      $input = $folder . md5($uri . $script_index) . '.js';
      $output = $folder . md5($uri . $script_index) . '-obfuscated.js';

      /**
       * @todo Save for prepare obfuscate (forced if reloaded or development mode)
       */
      if (!is_file($input) || $is_reloaded || $is_development) {
        Filemanager\file::file($input, $scriptText, LOCAL);
      }

      /**
       * @todo Minify input js if detected commentsJS
       */
      if (preg_match('/\/\*[\s\S]*?\*\//m', $scriptText)) {
        $minify_input = shell_exec("terser $input"); // minify input
        if ($minify_input) {
          Filemanager\file::file($input, $minify_input, LOCAL);
          $js->innertext = $minify_input;
        }
      }

      /**
       * @todo Begin obfuscation
       */
      if ($obfuscatejs && !\JSON\json::is_json($scriptText) && !empty($scriptText) && ($is_reloaded || $is_development)) {
        $string = "javascript-obfuscator $input --compact true --self-defending false --debug-protection false --disable-console-output false --debug-protection-interval false --rename-globals false --identifier-names-generator mangled --string-array true --shuffle-string-array true --rotate-string-array true --string-array-encoding rc4"; //complete not working at all
        $string = "javascript-obfuscator $input --compact false --control-flow-flattening true --output $output";
        $string = "javascript-obfuscator $input --compact true --control-flow-flattening true --string-array true --shuffle-string-array true --rotate-string-array true --string-array-encoding rc4 --debug-protection false --disable-console-output false --debug-protection-interval false --output $output";

        if (null === shell_exec($string)) { // obfuscate input
          $js->innertext .= "/* $string */";
        }

        $minify_output = shell_exec("terser $output");
        if (null !== $minify_output) { // minify output
          Filemanager\file::file($output, $minify_output, LOCAL);
        }

        if (file_exists($output)) {
          $obfuscated = \Filemanager\file::get($output);
          if (!empty(trim($obfuscated))) {
            $js->innertext = trim($obfuscated);
          }
        }
      } else {
        if (file_exists($output)) {
          unlink($output);
        }
      }
    }
  }

  $styles = $dom->find('style');
  if ($styles) {
    $css_index = 0;
    foreach ($styles as $css) {
      ++$css_index;
      $cache = ROOT . '/processed/css/' . md5($uri . $css_index) . '.css';
      if (!empty($css->innertext) && $is_development) {
        \Filemanager\file::file($cache, trim(mincss($css->innertext)), LOCAL);
      }
      if (file_exists($cache)) {
        $css->innertext = \Filemanager\file::get($cache);
      }
    }
  }

  $imgs = $dom->find('img');
  if ($imgs) {
    foreach ($imgs as $img) {
      if (!$img->title) {
        $img->title = $dom->title();
      }
      if (!$img->alt) {
        $img->alt = $dom->title();
      }
      if (!$img->rel) {
        $img->rel = 'image';
      }
    }
  }

  /**
   * @todo Apply HTML Minification only on production
   */
  if (!$is_development) {
    // minify page
    $dom->find('html', 0)->outertext = htmlmin($dom->find('html', 0)->outertext);
    // save minified
    $result = $dom->save();
    // release
    unset($dom);
    // new dom
    $dom = \simplehtmldom\helper::str_get_html($result);
  }

  // prettyprint pretext
  $pres = $dom->find('pre');
  if ($pres) {
    $pre_index = 0;
    foreach ($pres as $pre) {
      ++$pre_index;
      $inner = $pre->innertext;
      if (!$pre->title) {
        $pre->title = "pre($pre_index)";
      }
      if (\JSON\json::is_json($inner)) {
        $pre->innertext = \JSON\json::beautify(json_decode($inner));
      }
    }
  }

  $result = $dom->save();
  file_put_contents($filesave, $result);

  return $result;
}

function mincss($css)
{
  $css = preg_replace('/\/\*[^*]*\*+([^\/][^*]*\*+)*\//m', '', $css); // remove comments in beautify css
  $css = preg_replace('/\/\*((?!\*\/).)*\*\//', '', $css); // negative look ahead
  $css = preg_replace('/\s{2,}/', ' ', $css);
  $css = preg_replace('/\s*([:;{}])\s*/', '$1', $css);
  $css = preg_replace('/;}/', '}', $css);
  // clean whitespaces
  /*$css = preg_replace(
  "/(\t|\n|\v|\f|\r| |\xC2\x85|\xc2\xa0|\xe1\xa0\x8e|\xe2\x80[\x80-\x8D]|\xe2\x80\xa8|\xe2\x80\xa9|\xe2\x80\xaF|\xe2\x81\x9f|\xe2\x81\xa0|\xe3\x80\x80|\xef\xbb\xbf)+/",
  "",
  $css
  );*/
  $css = preg_replace('/\s+/m', ' ', $css);

  return $css;
}
