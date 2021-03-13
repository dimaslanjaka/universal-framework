<?php
function getRequestHeaders() {
    $headers = array();
    foreach($_SERVER as $key => $value) {
        if (substr($key, 0, 5) <> 'HTTP_') {
            continue;
        }
        $header = str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))));
        $headers[$header] = $value;
    }
    return $headers;
}

$headers = getRequestHeaders();
$headerx=array();
foreach ($headers as $header => $value) {
  if (!preg_match("/(encoding|cookie|host)/m",strtolower($header))){
    header("$header: $value");
  }
}

$pubid = '7975270895217217';
$s1 = '5860334959';
$pn1 = 'com.consultations.personalinjurylawyer';
function gen($pn1,$pubid,$s1){
$banner1 = array("https://googleads.g.doubleclick.net/mads/gma?preqs=0&u_sd=1.5&u_w=320&msid=", "&cap=a&js=afma-sdk-a-v3.3.0&toar=0&isu=W" . floor(rand() * 9) . "EEABB8EE" . floor(rand() * 99) . "C2BE770B684D" . floor(rand() * 99999) . "ECB&cipa=0&format=320x50_mb&net=wi&app_name=1.android.", "&hl=en&u_h=" . floor(rand() * 999) . "&carrier=" . floor(rand() * 999999) . "&ptime=0&u_audio=4&u_so=p&output=html&region=mobile_app&u_tz=-" . floor(rand() * 999) . "&client_sdk=1&ex=1&client=ca-app-pub-", "&slotname=", "&caps=inlineVideo_interactiveVideo_mraid1_clickTracking_sdkAdmobApiForAds&jsv=18", "height=\"55\" width=\"325\" frameborder=\"0\" scrolling=\"no\" width=\"0\" height=\"0\" marginwidth=\"0\" marginheight=\"0\" ");
$src1 = $banner1[0] . $pn1 . $banner1[1] . $pn1 . $banner1[2] . $pubid . $banner1[3] . $s1 . $banner1[4];
return $src1;
}

$src1 = gen($pn1,$pubid,$s1);
$html = '<center><iframe src="'.$src1.'" height="55" width="325" frameborder="2" scrolling="no" width="0" height="0" marginwidth="0" marginheight="0"></iframe></center>';

echo str_repeat($html, 10);