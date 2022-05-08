<?php
// This file just contains a bunch of settings that should be maintained globally

$GLOBALS['PAGEFROG_STYLING_PAGE_SLUG'] = 'PageFrog-styling';
$GLOBALS['PAGEFROG_SETUP_PAGE_SLUG'] = 'PageFrog-setup';
$GLOBALS['PAGEFROG_ANALYTICS_PAGE_SLUG'] = 'PageFrog-analytics';
$GLOBALS['PAGEFROG_CONTACT_PAGE_SLUG'] = 'PageFrog-help';
$GLOBALS['PAGEFROG_SETTINGS_PAGE_SLUG'] = 'PageFrog-settings';
$GLOBALS['PAGEFROG_ADS_PAGE_SLUG'] = 'PageFrog-ads';
$GLOBALS['PAGEFROG_FBIA_FEED_NAME'] = 'pagefrog_instant_articles';
$GLOBALS['PAGEFROG_PREVIEW_VAR'] = 'pagefrog_preview';

function debug_print() {
    $trace = debug_backtrace();
    $rootPath = dirname(dirname(__FILE__));
    $file = str_replace($rootPath, '', $trace[0]['file']);
    $line = $trace[0]['line'];
    $var = $trace[0]['args'][0];
    $lineInfo = sprintf('<div><strong>%s</strong> (line <strong>%s</strong>)</div>', $file, $line);
    $debugInfo = sprintf('<pre>%s</pre>', print_r($var, true));
    print_r($lineInfo.$debugInfo);
}
?>