<?php
header('Access-Control-Allow-Origin: *');
header("X-Robots-Tag: index, nofollow", true);
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

include ("func.php");
include ("config.php");
//include ("engine.php");
include ("ads.php");
//include ("format.php");

$urlx = (isset($_SESSION["revdownload"]) ? $_SESSION["revdownload"] : (isset($_POST["revdownload"]) ? $_POST["revdownload"] : (isset($_GET["revdownload"]) ? $_GET["revdownload"] : die("Url Download Required"))));
//var_dump($urlx);
/*
$f_contents = file("../proxy/revdownload-com.txt");
if(filesize("../proxy/revdownload-com.txt")) {
$dataline = $f_contents[array_rand($f_contents)];
$proxy = $dataline;
} else {
//$proxy = (isset($_SESSION["proxyfor"]) ? $_SESSION["proxyfor"] : "104.24.126.129:80");
*/
$proxy = "104.24.127.129:80";
$title = (isset($_SESSION["title"]) ? $_SESSION["title"] : (isset($_POST["title"]) ? $_POST["title"] : (isset($_GET["title"]) ? $_GET["title"] : "Download Now")));
$referer = (isset($_SESSION["victim"]) ? $_SESSION["victim"] : (isset($_POST["victim"]) ? $_POST["victim"] : (isset($_GET["victim"]) ? $_GET["victim"] : "https://www.revdl.com")));
//var_dump($referer);
/*** Get Content ***/
$cookie = "cookie.txt";
$opt["cookiefile"] =$cookie;
$opt["referer"] = $referer;
//$opt["proxy"] = $proxy;
$opt["agent"] = $opt["useragent"] = "Mozilla/5.0 (Linux; Android 7.0; Redmi Note 4 Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3387.0 Mobile Safari/537.36";

$html = fetch($urlx, $opt);
//echo $html;
/*
$htm1 = explode ('<div id="dlbox">', $html);
if (empty($htm1)){
echo $html;
} else {
$htm2 = explode ('</div>', $htm1[1]);
$htm = $htm2[0];
?>
<!DOCTYPE HTML>
<html>
<head>
<title>Continue Transfer</title>
<?php 
include("meta.php"); 
echo pagead;
?>
<noscript><link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" /></noscript>
<script src="//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<style>
[title="000webhost logo"], [title="000webhost logo"] {
display: none;
}
</style>
</head>
<body>
<?php echo $htm; ?>
</body>
</html>
<?php } 
*/
?>
<?php
/*** Test ***/

$dom = new DOMDocument();
libxml_use_internal_errors(true);
@$dom->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));
libxml_clear_errors();
$xpath = new DOMXpath($dom);

$head = $dom->getElementsByTagName('head')->item(0);
$body = $dom->getElementsByTagName('body')->item(0);

$link = array();
$linknode = array();
$getlink = $xpath->query ('//a');
foreach ($getlink as $a){
//var_dump($a);
$link[] = $a->getAttribute("href");
$linknode[] = $a->nodeValue;
}
?>
<!DOCTYPE HTML>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Continue Transfer <?php echo $title; ?></title>
<style>
[title="000webhost logo"], [title="000webhost logo"] {
display: none;
}
*{
  word-wrap: break-word;
  }
div {
  overflow-wrap: break-word;
  }
button,a,.btn,a span {
  white-space: normal;
}
</style>
<?php echo pagead; ?>
</head>
<body>
<header role="banner" class="container">
<h1><?php echo $title; ?></h1>
<center>
<small class="text-muted">
<!-- Histats.com  (div with counter) -->
<div id="histats_counter">
</div>
<!-- Histats.com  START  (aync)-->
<script type="text/javascript">var _Hasync= _Hasync|| [];
  _Hasync.push(['Histats.startgif', '1,3860842,4,10045,"div#histatsC {position: absolute;top:0px;left:0px;}body>div#histatsC {position: fixed;}"']);
  _Hasync.push(['Histats.fasi', '1']);
  _Hasync.push(['Histats.track_hits', '']);
  (function() {
    var hs = document.createElement('script');
    hs.type = 'text/javascript';
    hs.async = true;
    hs.src = ('//s10.histats.com/js15_gif_as.js');
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
  }
  )();
</script>
<noscript>
  <a href="/" alt="" target="_blank" >
    <div id="histatsC">
      <img border="0" src="http://s4is.histats.com/stats/i/3860842.gif?3860842&103">
    </div>
  </a>
</noscript>
<!-- Histats.com  END  -->

</small>
</center>
</header>
<?php echo adres1; ?>
<div class="container">
<center>
<?php
$a=$link;
$b=$linknode;
//var_dump($a);
$index = 0;
for ($i = 0; $i < sizeof($a); $i++)
{
  if (!preg_match('/(dl1.revdownload|s1.revdownload)/mi', $a[$i])){
    
  }
if (preg_match('(revdownload)', strtolower($a[$i]))){
$url = $a[$i];
$text = $b[$i];
    echo '<a class="btn btn-block btn-primary ml-1" href="'.$url.'" title="'.$_SESSION["title"].'" alt="'.$_SESSION["title"].'"><span>'.$text.'</span></a>';
    
    echo '<div class="row"><center><ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-7975270895217217"
     data-ad-slot="4894289831"
     data-ad-format="link"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script></center></div>';
    
}
}
?>
</center>
</div>
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.1';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<center><div class="fb-page" data-href="https://www.facebook.com/secretnetworkforces" data-tabs="timeline" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/secretnetworkforces" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/secretnetworkforces">Google</a></blockquote></div></center>
<?php echo adres2; ?>
<script src="//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
head=document.head||document.getElementsByTagName('head')[0];
var csslist = ["https://fonts.googleapis.com/css?family=Playfair+Display|Raleway|Roboto","https://www.bagas31.com/wp-content/themes/silver-mag-lite/style.css","https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/css/bootstrap.min.css","https://www.bagas31.com/wp-content/themes/silver-mag-lite/custom.css"];
csslist.forEach(function(css) {
var cdn = document.createElement( "link" );
cdn.rel = "stylesheet";
cdn.href = css;
head.insertBefore( cdn, head.childNodes[ head.childNodes.length - 1 ].nextSibling );
});
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" async></script>
</body></html>