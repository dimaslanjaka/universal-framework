<?php

if (isset($_POST['md5'])) {
  JSON\json::json(['result' => md5(trim($_POST['md5']))]);
  exit;
}
