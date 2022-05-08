<?php 
exit;
//wp-load
require_once('../../../wp-load.php');

echo get_date_from_gmt(1531942039);
exit;

$wp_rankie_googlecustom_key = 'AIzaSyAKw3TbEbJNGX_HI8Ov_ek52EKzaAPJol0halmos';
$wp_rankie_googlecustom_id = '013156076200156289477:aavh3lmtysahalmos';
$wp_rankie_ezmlm_gl = 'google.com';
$startIndex =31;
$keyword = 'site:ezinearticles.com category inurl:"id"';

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

//curl get
$x='error';
$url ="https://www.googleapis.com/customsearch/v1?key=" . urlencode(  trim($wp_rankie_googlecustom_key) ) . "&cx=" . urlencode(  trim($wp_rankie_googlecustom_id) ) . "&q=".urlencode(trim($keyword)).'&googlehost='.urlencode($wp_rankie_ezmlm_gl).'&start='.$startIndex;
curl_setopt($ch, CURLOPT_HTTPGET, 1);
curl_setopt($ch, CURLOPT_URL, trim($url));
$exec=curl_exec($ch);
$x=curl_error($ch);

$json = json_decode($exec);

echo '<pre>';
print_r($json);

exit;

echo $exec.$x;

?>