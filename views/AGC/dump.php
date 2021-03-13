<?php
header('Content-Type: text/plain; charset=utf-8');
require __DIR__ . '/vendor/autoload.php';
session_start();
var_dump($_SESSION);