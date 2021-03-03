<?php

require_once('../app/init.php');

if (isDev()) {
  session_start();
  dumpJSON($_SESSION);
}
