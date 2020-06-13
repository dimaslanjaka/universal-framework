<?php

use JSON\json;

$date = $_SESSION['session_started']->format('c');

json::json($date);
