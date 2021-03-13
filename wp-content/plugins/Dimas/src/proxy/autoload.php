<?php
$_GLOBAL['ROOT_DIR'] = __DIR__;
ini_set("display_errors", true);

spl_autoload_register(function ($name) {
    $name = str_replace("DimasProxyParser", "src", $name);
    $name = str_replace("\\", DIRECTORY_SEPARATOR, $name);
    $name .= ".php";
    if (file_exists(__DIR__ . "/" . $name)) {
        include_once(__DIR__ . "/" . $name);
    }
});

include_once __DIR__ . DIRECTORY_SEPARATOR . "vendor" . DIRECTORY_SEPARATOR . "autoload.php";
