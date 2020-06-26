<?php

use MVC\helper;

session_destroy();

if (isset($_SERVER['HTTP_REFERER']) && $_SERVER['HTTP_REFERER'] != helper::geturl()) {
  header('Location: ' . $_SERVER['HTTP_REFERER']);
} else {
  header('Location: /signin');
}

exit;
