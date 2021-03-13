<?php

include __DIR__ . '/wp-loader.php';
$S = $_SERVER;
$S['ref'] = $_SERVER['HTTP_REFERER'];
echo $core->dump(getallheaders());
