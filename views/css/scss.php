<?php
require __DIR__ . '/../../vendor/scssphp/scssphp/scss.inc.php';

use ScssPhp\ScssPhp\Compiler;

$scss = new Compiler();

echo $scss->compile(file_get_contents(__DIR__ . '/bg.scss'));
