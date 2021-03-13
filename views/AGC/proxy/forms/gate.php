<?php

/**
 * PHPProxyChecker gate.
 * @author Dimas Lanjaka <dimaslanjaka[at]gmail.com>
 * @created 1.1.2020
 * @version 1.5
 */
if (!isset($_REQUEST['json'])) {
   echo (json_encode($_SERVER)) . '<br>';
   echo (json_encode($_GET)) . '<br>';
   echo (json_encode($_POST)) . '<br>';
} else {
   header('Content-Type: application/json');
   echo json_encode(array_merge($_SERVER, $_REQUEST), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}
