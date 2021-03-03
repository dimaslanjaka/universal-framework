<?php

error_reporting(E_ALL); // Error/Exception engine, always use E_ALL
ini_set('ignore_repeated_errors', TRUE); // always use TRUE
ini_set('display_errors', FALSE); // Error/Exception display, use FALSE only in production environment or real server. Use TRUE in development environment
ini_set('log_errors', TRUE); // Error/Exception file logging engine.
ini_set("error_log", $_SERVER['DOCUMENT_ROOT'] . "/error_log"); // Logging file path

// fix utility
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../src/init.php';
require_once __DIR__ . '/libs/autoload.php';

// app core
require_once 'core/App.php';
require_once 'core/Controller.php';
require_once 'core/Database.php';
require_once 'core/Session.php';

// config
require_once 'config/config.php';
require_once 'config/whatsapp.php';
require_once 'config/function.php';
require_once 'config/csrf_token.php';
require_once 'config/ovo-class.php';
require_once 'config/bca-class.php';
require_once 'config/gopay-class.php';
require_once 'config/class.phpmailer.php';
