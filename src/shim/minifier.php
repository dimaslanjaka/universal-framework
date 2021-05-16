<?php

/**
 * Minify HTML.
 *
 * @return string
 */
function htmlmin(string $ori)
{
  //return preg_replace('/<!--.*?-->|\s+/s', ' ', $ori);
  $no_tab = preg_replace('/\n|\t|\n+|\t+/m', '', $ori);
  $no_comments = preg_replace('/<!--.*?-->/m', '', $no_tab);
  $between_tags = preg_replace('/\>\s+\</', '><', $no_comments);

  return $between_tags;
}

/**
 * Minify inline css from buffer.
 *
 * @param string $css
 *
 * @return string
 */
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

// pretext filter and syntax highlighter
$syntaxHighlighter = null;
/**
 * Fix <pre/> syntax highlight.
 *
 * @return string
 */
function prefilter(string $c)
{
  global $syntaxHighlighter;
  $dom = new SmartDOMDocument('1.0', 'ISO-8859-15');
  $dom->preserveWhiteSpace = true;
  $dom->formatOutput = false;

  if (!$dom->loadHTML($c)) {
    \HTML\js::var('HTML_ERROR', json_encode(['error' => true, 'message' => 'HTML Optimizer failed']));
    echo $c;

    return;
  }

  $xpath = new SmartDOMXpath($dom);

  $title = getTitle($dom);
  $pres = $xpath->query('//pre');
  if (!empty($pres)) {
    foreach ($pres as $pre) {
      if (is_json($pre->innerHTML)) {
        $pre->innerHTML = \JSON\json::beautify(json_decode($pre->innerHTML));
        if (!$syntaxHighlighter) {
          $syntaxHighlighter = true;
          insertBodyFirst($xpath, createScript($dom, ['src' => '/assets/highlight.js/loader.js', 'cache' => 'true']));
        }
        if (empty(trim($pre->getAttribute('class')))) {
          $pre->setAttribute('class', 'json');
        }
      }
      if (empty(trim($pre->getAttribute('title')))) {
        $pre->setAttribute('title', $title);
      }
    }
  }

  $textareas = $xpath->query('//textarea');
  if (!empty($textareas)) {
    foreach ($textareas as $area) {
      if ($area->hasAttribute('innerhtml')) {
        $area->innerHTML = base64_decode($area->getAttribute('innerhtml'));
        $area->removeAttribute('innerhtml');
      }
    }
  }

  return $dom->saveHTML();
}
