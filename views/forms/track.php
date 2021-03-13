<?php

$core->hj();
if ('POST' == $_SERVER['REQUEST_METHOD']) {
  _file_($_SERVER['DOCUMENT_ROOT'] . '/log/visitor/' . md5((isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : (isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : 'default-' . date('dmYHis')))) . '.json', json_encode($_POST));
}
exit;
