<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
if (!file_exists(__DIR__ . '/proxy.txt')) {
    file_put_contents(__DIR__ . '/proxy.txt', '');
}
if (isset($_REQUEST['save'])) {
    if (preg_match_all('/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\:\d{2,8}/m', $_REQUEST['save'], $match)) {
        if (isset($match[0])) {
            if (is_string($match[0])) {
                $content = $match[0] . PHP_EOL;
            } else {
                $content = implode(PHP_EOL, $match[0]) . PHP_EOL;
            }
            file_put_contents(__DIR__ . '/proxy.txt', $content, FILE_APPEND | LOCK_EX);
        }
    }
} else {
    $lines = file(__DIR__ . '/proxy.txt');
    $lines = array_filter($lines);
    $lines = array_unique($lines);
    if (!empty(array_filter($lines))) {
        file_put_contents(__DIR__ . '/proxy.txt', implode($lines), LOCK_EX);
    }
    print_r($lines);
}
