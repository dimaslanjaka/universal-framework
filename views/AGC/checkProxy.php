<?php
error_reporting(-1);
header('Access-Control-Allow-Origin: *'); 
//include('../download/func.php');
//include('../download/config.php');
//include('../download/ads.php');
function clean($string, $replaceto) {
   $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.
   $string = preg_replace('/[^A-Za-z0-9\-]/', $replaceto, $string); // Removes special chars.

   return preg_replace('/-+/', '-', $string); // Replaces multiple hyphens with single one.
}
function HOST($T){
$parse = parse_url($T);
return $parse['host'];
}

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
$reflist = array($_SERVER["HTTP_HOST"], "codepen", "tuyul");
if (isset($_SERVER['HTTP_REFERER'])){
$ref = $_SERVER['HTTP_REFERER'];
$refData = parse_url($ref);
$refmatch = $refData['host'];
} else {
$ref = $_COOKIE['admin'];
}
$validate = $ref;

if (!preg_match('(dimaslanjaka|000webhostapp|codepen|webmanajemen|jsbin|jsfiddle|localhost)', $validate))
{
    die("Access Denied!");
} else {
if(isset($_POST['submit'])) {
if (filter_var($_POST['targethost'], FILTER_VALIDATE_URL) === FALSE) {
    die('Not a valid URL');
} else {
    $_SESSION['targethost'] =$_POST['targethost'];
}
}
}
}
ob_start();
?>
<html><head>
<meta charset="utf-8"> 
<title>Working Proxy Results For PHP cURL</title> 
<link rel="canonical" href="<?php echo $_SERVER['PHP_SELF']; ?>"> <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"> 
<style>
a[title="000webhost logo"] { display: none !important }
.fw{width:100%}
label[for="basic-url"]{text-decoration:underline;color:white;font-weight:bold}
input{margin-left:0px;margin-right:0px}
div#preloader { position: fixed; left: 0; top: 0; z-index: 999; width: 100%; height: 100%; overflow: visible; background: #fff url('https://res.cloudinary.com/dimaslanjaka/image/fetch/http://datainflow.com/wp-content/uploads/2017/09/loader.gif') no-repeat center center; background-size: 100% 100%; }
div#preloader-submit { position: fixed; left: 0; top: 0; z-index: 999; width: 100%; height: 100%; overflow: visible; background: #fff url('https://res.cloudinary.com/dimaslanjaka/image/fetch/http://www.ipcopia.com/plugin-images/submitting.gif') no-repeat center center; background-size: 100% 100%; }
.none{display:none}
</style>
<?php
if (!isset($_COOKIE['noads'])){
setcookie('noads', true, time() + (60 * 5), "/");
//$_COOKIE['noads'] = $cookie;
//echo $pagead;
}
?>
</head><body>
<div id="preloader" class="none"></div>
<div id="preloader-submit" class="none"></div>
<main role="main" class="container">
<?php
/** Initialization **/
$file="proxy.txt";
$f_contents = file($file);
$line = $f_contents[array_rand($f_contents)];
$end = 100;
if (isset($_GET['page'])){
switch ($_GET['page']) {
       default:
          $start = (strlen($_GET["page"])<=2 ? $_GET["page"] . '00' : $_GET["page"]);
          break;
       case 1:
          $start = 1;
          break;
       case 2:
          $start = '102';
          break;
       case 3:
          $start = '204';
          break;
       case 4:
          $start = '306';
          break;
       case 5:
          $start = '408';
          break;
       case 6:
          $start = '500';
          break;
       case 7:
          $start = '602';
          break;
       case 8:
          $start = '704';
          break;
       case 9:
          $start = '806';
          break;
       case 10:
          $start = '908';
          break;
} //End case
} else {
$start = 1;
}
$jumlah = $start+$end;
$build = array();
for ($i = $start; $i <= $jumlah; $i++) {
   $build[] = $f_contents[$i];
}
$proxies = $build;
/*
$proxies = file("proxy.txt");
*/
$randP = $proxies[array_rand($proxies)];
//*** Define Host target and write file ***//
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
     $targetHost = $_POST['targethost'];
$writeto = clean(HOST($_POST['targethost']), "-") . ".txt";
} else if (isset($_SESSION['targethost'])){
     $targetHost = $_SESSION['targethost'];
$writeto = clean(HOST($targetHost), "-") . ".txt";
} else if (isset($_GET['target'])){
$_SESSION['targethost'] = $_GET['target'];
$targetHost = $_GET['target'];
$writeto = clean(HOST($targetHost), "-") . ".txt";
}
if (isset($writeto)){
  define("writeto", $writeto, true);
}

$mc = curl_multi_init();

//-count line
$linecount = 0;
$handle = fopen($file, "r");
while(!feof($handle)){
  $line = fgets($handle);
  $linecount++;
}

fclose($handle);

if (defined("writeto")){
$writeproxy = writeto;
}
if (isset($writeproxy)){
define("writefile", $writeproxy, true);
$fprxx = fopen(writefile, 'w');
fclose($fprxx);
}
echo "Read: ". $start ." - ". $jumlah ." Lines, from Total: " . $linecount . " lines<hr/>";
?>
<blockquote class="blockquote container">
<p class="blockquote-footer mb-0">
<?php if (isset($targetHost)){ ?>
<span class="text-dark">Proxy Requested To </span><span class="text-alert"><?php echo $targetHost; ?></span>
<?php } ?>
</p>
</blockquote>
<form action="" method="POST" class="form-group jumbotron bg-info fw">
<label for="basic-url">Send Custom Proxy Request URL</label>
<div class="input-group mb-3">
<div class="input-group-prepend">
<span class="input-group-text" id="basic-addon3">URL</span>
</div>
<input type="url" name="targethost" class="form-control" id="basic-url" aria-describedby="basic-addon3" required value="<?php echo (isset($_GET['target']) ? url_parser($_GET['target']) : isset($_SESSION['targethost']) ? url_parser($_SESSION['targethost']) : 'http://google.me'); ?>">
<input type="submit" name="submit" value="Send" class="btn btn-danger" />
</div>
</form>
<?php
echo '<nav aria-label="Page navigation example">
  <ul class="pagination">';
$pageNum = 10;
for ($j=1; $j < $pageNum; $j++) { 
 echo "<li class=\"page-item\"><a class=\"page-link\" href=\"?working&page=".$j."\">".$j."</a></li>";
}
echo '</ul>
</nav>';

if (isset($_GET['working'])){
echo '
  <div class="form-group">
    <label for="exampleTextarea">Working Proxies</label>
    <textarea class="form-control" id="exampleTextarea" rows="3" onclick="this.focus();this.select()" readonly="readonly">
';
} else {
echo '
<header role="banner">
	<h1>Proxy Checker Results</h1>
</header>
';
}
if (isset($targetHost)){
for ($thread_no = 0; $thread_no < count($proxies); $thread_no++)
{
$c[$thread_no] = curl_init();
curl_setopt ($c[$thread_no], CURLOPT_URL, url_parser($targetHost));
curl_setopt ($c[$thread_no], CURLOPT_HEADER, 0);
curl_setopt ($c[$thread_no], CURLOPT_RETURNTRANSFER, 1);
curl_setopt ($c[$thread_no], CURLOPT_CONNECTTIMEOUT, 5);
curl_setopt ($c[$thread_no], CURLOPT_TIMEOUT, 10);
curl_setopt ($c[$thread_no], CURLOPT_PROXY, trim($proxies[$thread_no]));
curl_setopt ($c[$thread_no], CURLOPT_PROXYTYPE, 0);
curl_multi_add_handle($mc, $c[$thread_no]);
}

do {
while (($execrun = curl_multi_exec($mc, $running)) == CURLM_CALL_MULTI_PERFORM);
if ($execrun != CURLM_OK) break;
while ($done = curl_multi_info_read($mc))
{
$info = curl_getinfo($done['handle']);

if(isset($_GET['working'])){
if ($info['http_code'] == 200) {
$workingproxy=trim($proxies[array_search($done['handle'], $c)]);
$savefile = fopen(writeto, "a+");
fwrite($savefile, $workingproxy . "\n");
fclose($savefile);
echo $workingproxy."\n";
}
} else {
if ($info['http_code'] == 301) {
echo trim($proxies[array_search($done['handle'], $c)])." 301 Moved Permanently <br/>";
} else if ($info['http_code'] == 200) {
echo trim($proxies[array_search($done['handle'], $c)])." 200 OK <br/>";
} else if ($info['http_code'] == 302) {
echo trim($proxies[array_search($done['handle'], $c)])." 302 Found <br/>";
} else if ($info['http_code'] == 400) {
echo trim($proxies[array_search($done['handle'], $c)])." 400 Bad Request <br/>";
} else if ($info['http_code'] == 401) {
echo trim($proxies[array_search($done['handle'], $c)])." 401 Unauthorized <br/>";
} else if ($info['http_code'] == 404) {
echo trim($proxies[array_search($done['handle'], $c)])." 404 Not Found <br/>";
} else if ($info['http_code'] == 403) {
echo trim($proxies[array_search($done['handle'], $c)])." 403 Forbidden <br/>";
} else if ($info['http_code'] == 405) {
echo trim($proxies[array_search($done['handle'], $c)])." 405 Method Not Allowed <br/>";
} else if ($info['http_code'] == 407) {
echo trim($proxies[array_search($done['handle'], $c)])." 407 Proxy Authentication Required <br/>";
} else if ($info['http_code'] == 500) {
echo trim($proxies[array_search($done['handle'], $c)])." 500 Internal Server Error <br/>";
} else if ($info['http_code'] == 501) {
echo trim($proxies[array_search($done['handle'], $c)])." 501 Not Implemented <br/>";
} else if ($info['http_code'] == 502) {
echo trim($proxies[array_search($done['handle'], $c)])." 502 Bad Gateway <br/>";
} else if ($info['http_code'] == 503) {
echo trim($proxies[array_search($done['handle'], $c)])." 503 Service Unavailable <br/>";
} else if ($info['http_code'] == 504) {
echo trim($proxies[array_search($done['handle'], $c)])." 504 Gateway Timeout <br/>";
} else if ($info['http_code'] == 505) {
echo trim($proxies[array_search($done['handle'], $c)])." 505 HTTP Version Not Supported <br/>";
} else if ($info['http_code'] == 511) {
echo trim($proxies[array_search($done['handle'], $c)])." 511 Network Authentication Required <br/>";
} else {
echo trim($proxies[array_search($done['handle'], $c)])." <span class='text-danger'>Dead</span><br/>";
}

} //Endif check queryUrl

curl_multi_remove_handle($mc, $done['handle']);
}
} while ($running);
curl_multi_close($mc);
}
if (isset($_GET['working'])){
echo '</textarea></div>';
}
//echo $adres2;
?>
</main>

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/js/bootstrap.min.js"></script>

<script>
$('a').on('click', function(){
   var target = "preloader";
$("#"+target).fadeIn('slow',function(){
   $("#"+target).show().siblings("div").hide();
});
});
$('input[type="submit"]').on('click', function(){
   var target = "preloader-submit";
$("#"+target).fadeIn('slow',function(){
   $("#"+target).show().siblings("div").hide();
});
});
</script>
</body></html>
<?php
/*
$output = ob_get_contents();
ob_clean();
ob_start("sanitize_output");

$doc = new DOMDocument;
libxml_use_internal_errors(true);
$doc->loadHTML($output); 
libxml_clear_errors();
$doc->preserveWhiteSpace = false;
$doc->formatOutput = true;
$formated = $doc->saveHTML();
echo $output;
*/

function url_parser($url) {

// multiple /// messes up parse_url, replace 2+ with 2
$url = preg_replace('/(\/{2,})/','//',$url);

$parse_url = parse_url($url);

if(empty($parse_url["scheme"])) {
    $parse_url["scheme"] = "http";
}
if(empty($parse_url["host"]) && !empty($parse_url["path"])) {
    // Strip slash from the beginning of path
    $parse_url["host"] = ltrim($parse_url["path"], '\/');
    $parse_url["path"] = "";
}   

$return_url = "";

// Check if scheme is correct
if(!in_array($parse_url["scheme"], array("http", "https", "gopher"))) {
    $return_url .= 'http'.'://';
} else {
    $return_url .= $parse_url["scheme"].'://';
}

// Check if the right amount of "www" is set.
$explode_host = explode(".", $parse_url["host"]);

// Remove empty entries
$explode_host = array_filter($explode_host);
// And reassign indexes
$explode_host = array_values($explode_host);

// Contains subdomain
if(count($explode_host) > 2) {
    // Check if subdomain only contains the letter w(then not any other subdomain).
    if(substr_count($explode_host[0], 'w') == strlen($explode_host[0])) {
        // Replace with "www" to avoid "ww" or "wwww", etc.
        $explode_host[0] = "www";

    }
}
$return_url .= implode(".",$explode_host);

if(!empty($parse_url["port"])) {
    $return_url .= ":".$parse_url["port"];
}
if(!empty($parse_url["path"])) {
    $return_url .= $parse_url["path"];
}
if(!empty($parse_url["query"])) {
    $return_url .= '?'.$parse_url["query"];
}
if(!empty($parse_url["fragment"])) {
    $return_url .= '#'.$parse_url["fragment"];
}


return $return_url;
}

function sanitize_output($buffer) {

    // Searching textarea and pre
    preg_match_all('#\<textarea.*\>.*\<\/textarea\>#Uis', $buffer, $foundTxt);
    preg_match_all('#\<pre.*\>.*\<\/pre\>#Uis', $buffer, $foundPre);

    // replacing both with <textarea>$index</textarea> / <pre>$index</pre>
    $buffer = str_replace($foundTxt[0], array_map(function($el){ return '<textarea>'.$el.'</textarea>'; }, array_keys($foundTxt[0])), $buffer);
    $buffer = str_replace($foundPre[0], array_map(function($el){ return '<pre>'.$el.'</pre>'; }, array_keys($foundPre[0])), $buffer);

    // your stuff
    $search = array(
        '/\>[^\S ]+/s',  // strip whitespaces after tags, except space
        '/[^\S ]+\</s',  // strip whitespaces before tags, except space
        '/(\s)+/s'       // shorten multiple whitespace sequences
    );

    $replace = array(
        '>',
        '<',
        '\\1'
    );

    $buffer = preg_replace($search, $replace, $buffer);

    // Replacing back with content
    $buffer = str_replace(array_map(function($el){ return '<textarea>'.$el.'</textarea>'; }, array_keys($foundTxt[0])), $foundTxt[0], $buffer);
    $buffer = str_replace(array_map(function($el){ return '<pre>'.$el.'</pre>'; }, array_keys($foundPre[0])), $foundPre[0], $buffer);

    return $buffer;
}

?>