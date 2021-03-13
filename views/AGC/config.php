<?php
//** CONFIG START **//

$domain = $_SERVER['HTTP_HOST']; //Your Domain
$youtube_api = ""; //Youtube API
$recaptcha_api = ""; //Recaptcha API
$tagmanager = "GTM-NXVCJCW"; //Google Tag Manager https://tagmanager.google.com/?hl=en
$analytics = "UA-104256209-1"; //Google Analytics
$youtube_channel = 'https://youtu.be/YourChannel';
$adsense_run = true; //true for displaying adsense ads.php

//** CONFIG END **//
$cfg=["a"=>$domain,"b"=>$youtube_api,"c"=>$recaptcha_api,"d"=>$tagmanager,"e"=>$analytics];
$working_domain=$cfg["a"];
$ytapi=$cfg["b"];
$recaptha=$cfg["c"];
$gtag=$cfg["d"];
$anal=$cfg["e"];
$youtube=$youtube_channel;

/****/
    define('working_domain', baseurls($_SERVER['HTTP_HOST']), true);
    define('my_domain', $domain, true);
    define('gtag', $gtag, true);
    define('anal', $analytics, true);
    define('dir_name', dirname(__FILE__), true);
    define('current_dir', RealSubdir(), true);
    define('userip', getUserIP(), true);
    define('fullurl', (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]", true);
if (!preg_match('(/apk/|/ios/|/windows/|/android/)', fullurl)){
     define('adsense_run', $adsense_run, $adsense_run);
} else {
     define('adsense_run', false, true);
}
/****/
?>