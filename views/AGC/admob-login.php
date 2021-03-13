<?php
header("Content-type: application/json; charset=utf-8");

$email = (isset($_GET["email"]) ? $_GET["email"] : "dimaslanjaka@gmail.com");
$pass = (isset($_GET["password"]) ? $_GET["password"] : "password");

$ar = array("result" => array("collegeData" => array("status" => "active")));

$js = json_encode($ar);
echo $js;