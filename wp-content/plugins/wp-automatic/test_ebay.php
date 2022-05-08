<?php

echo time();
exit;

//curl ini
$ch = curl_init();
curl_setopt($ch, CURLOPT_HEADER,0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
curl_setopt($ch, CURLOPT_TIMEOUT,20);
curl_setopt($ch, CURLOPT_REFERER, 'http://www.bing.com/');
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.8) Gecko/2009032609 Firefox/3.0.8');
curl_setopt($ch, CURLOPT_MAXREDIRS, 5); // Good leeway for redirections.
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); // Many login forms redirect at least once.
curl_setopt($ch, CURLOPT_COOKIEJAR , "cookie.txt");



//generate token 
$hash = base64_encode('Mohammed-mytestAP-PRD-1d7490b6a-c6a9fb25:PRD-d7490b6aba63-119a-4cdc-9433-0e6d');
 
 //curl post
 $curlurl="https://api.ebay.com/identity/v1/oauth2/token";
 $curlpost="grant_type=client_credentials&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope"; // q=urlencode(data)
 curl_setopt($ch, CURLOPT_URL, $curlurl);
 curl_setopt($ch, CURLOPT_POST, true);
 curl_setopt($ch, CURLOPT_POSTFIELDS, $curlpost); 
curl_setopt($ch,CURLOPT_HTTPHEADER,array('Authorization: Basic '.$hash));


 
 $x='error';
 $exec=curl_exec($ch);
 $x=curl_error($ch);
 
 $token_json = json_decode($exec);
 
 $access_token = ($token_json->access_token);
  
//curl get
$x='error';
$url='https://api.ebay.com/buy/browse/v1/item_summary/search?q=drone&limit=3';
curl_setopt($ch, CURLOPT_HTTPGET, 1);
curl_setopt($ch, CURLOPT_URL, trim($url));

curl_setopt($ch,CURLOPT_HTTPHEADER, array( 'Authorization:Bearer '.$access_token));


$exec=curl_exec($ch);
$x=curl_error($ch);

echo '<pre>';
 print_r(json_decode($exec));