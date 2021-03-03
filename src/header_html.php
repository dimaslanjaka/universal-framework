<?php

$appMode = 'development';
if ('chandra.smm' != $_SERVER['HTTP_HOST']) {
  $appMode = 'production';
}

function isDev()
{
  global $appMode;
  return $appMode == 'development';
}

/**
 * Disable forms.
 */
function disableForm()
{
  global $appMode;
  echo <<<EOF
  <script>$(document).on("submit", "form", function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    console.log(data);
  });</script>
EOF;
}

/**
 * Debug included files.
 */
function debugIncludedFiles()
{
  global $appMode;
  if ('development' == $appMode) {
    $included_files = get_included_files();
    $json = json_encode($included_files, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    echo <<<EOF
  <!--
  $json
  -->
EOF;
  }
}


function headerJSON()
{
  header('Content-Type: application/json');
}

/**
 * Intercept return json
 */
function returnJSON($jsonString)
{
  headerJSON();
  echo $jsonString;
}

/**
 * Intercept json with disable all codes execution below this function trigger line
 */
function dumpJSON($jsonObject)
{
  if (is_string($jsonObject)) {
    returnJSON($jsonObject);
  } else if (is_array($jsonObject)) {
    returnJSON(json_encode($jsonObject, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
  }
  exit(); // for testing debug invalid update deposite
}
