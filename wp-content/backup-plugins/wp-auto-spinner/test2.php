<?php 


$test = file_get_contents('test.txt');

echo mb_detect_encoding($test);

exit;

//api test
$url = "http://api.spinnerchief.com:443/apikey=5adb5b9077d04b14b&username=sweetheatmn2&password=0129212211";

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

//curl post
$curlurl=$url;
$curlpost="i am in a very good condition";

curl_setopt($ch, CURLOPT_URL, $curlurl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $curlpost); 
$x='error';
 
	$exec=curl_exec($ch);
	$x=curl_error($ch);
 
	print_r($exec.$x);
	exit;



exit;
$file = file('test.txt');
foreach ($file as $line){
	
	$line=trim($line);
	echo "<br>\${$line} 	    = get_option('$line','');";
	
}

?>