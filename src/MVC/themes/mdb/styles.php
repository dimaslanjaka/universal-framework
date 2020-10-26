<link rel='stylesheet' href='https://dimaslanjaka.github.io/Web-Manajemen/css/compiled.block.css' type='text/css' media='all' />
<link rel='stylesheet' href='https://dimaslanjaka.github.io/Web-Manajemen/css/compiled.min.css' type='text/css' media='all' />
<style>
  #mlbb .card {
    min-height: 500px;
  }

  div.ads {
    margin: 3px;
    padding: 2px;
  }

  .fb-comments,
  .fb-comments iframe[style],
  .fb-like-box,
  .fb-like-box iframe[style] {
    width: 100% !important;
  }

  .fb-comments span,
  .fb-comments iframe span[style],
  .fb-like-box span,
  .fb-like-box iframe span[style] {
    width: 100% !important;
  }

  pre {
    white-space: pre-wrap;
    /* css-3 */
    white-space: -moz-pre-wrap;
    /* Mozilla, since 1999 */
    white-space: -pre-wrap;
    /* Opera 4-6 */
    white-space: -o-pre-wrap;
    /* Opera 7 */
    word-wrap: break-word;
    /* Internet Explorer 5.5+ */
  }

  pre:before {
    color: #ccc;
    font-family: "Font Awesome 5 Pro";
    content: attr(title) "\00a0\f101\00a0\a";
    white-space: pre;
  }

  .btn {
    padding: 0.5rem 1rem;
    margin: 0;
  }

  *[before]::before {
    color: #ccc;
    font-family: "Font Awesome 5 Pro";
    content: attr(before) "\00a0\f101\00a0\A";
    white-space: pre;
  }
</style>
<?php
if (isset($var['css']) && $var['css'] && file_exists($var['css'])) {
  echo '<style>';
  include $var['css'];
  echo '</style>';
}
if ($contentCSS = preg_replace('/\.php$/s', '.css', $content)) {
  echo '<style>';
  \MVC\helper::include_asset($contentCSS);
  echo '</style>';
}
?>