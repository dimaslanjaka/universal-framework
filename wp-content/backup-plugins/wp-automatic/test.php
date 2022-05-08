<?php
 
 
 
//curl get
$x='error';
$url='https://ijoo.org/';
curl_setopt($ch, CURLOPT_HTTPGET, 1);
curl_setopt($ch, CURLOPT_URL, trim($url));
$exec=curl_exec($ch);
$x=curl_error($ch);

echo $exec.$x;

exit;

$post_parent = $post_topic_id = 42686;
$post_forum_id = 278;

$reply_data = array('post_parent'=>$post_parent, 'post_content' =>'de de de ddddd' , 'post_author' => false );
$reply_meta = array('forum_id'=>$post_forum_id, 'topic_id' => $post_topic_id , 'anonymous_name' =>'helpawy');
$ret = bbp_insert_reply($reply_data,$reply_meta);

var_dump($ret);

exit; 
//curl ini
$ch = curl_init();
curl_setopt($ch, CURLOPT_HEADER,0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
curl_setopt($ch, CURLOPT_TIMEOUT,20);
curl_setopt($ch, CURLOPT_REFERER, 'http://www.bing.com/');
curl_setopt($ch, CURLOPT_USERAGENT, 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:61.0) Gecko/20100101 Firefox/61.0');
curl_setopt($ch, CURLOPT_MAXREDIRS, 5); // Good leeway for redirections.
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); // Many login forms redirect at least once.
curl_setopt($ch, CURLOPT_COOKIEJAR , "cookie.txt");

//curl get
$x='error';
$url='https://www.behance.net/gallery/67050131/Ville-Savoye';
curl_setopt($ch, CURLOPT_HTTPGET, 1);
curl_setopt($ch, CURLOPT_URL, trim($url));
$exec=curl_exec($ch);
$x=curl_error($ch);

curl_setopt($ch,CURLOPT_COOKIE,' gk_suid=77332781; ilo0=true; bcp=334fafd0-b63b-4dd4-952f-9666ec859e6d');

echo $exec.$x;


  exit;
//curl get
$x='error';
$url='https://www.google.com/search?ei=-3g6W4_-GauX6AS6mYrYAg&q=pizza';
curl_setopt($ch, CURLOPT_HTTPGET, 1);
curl_setopt($ch, CURLOPT_URL, trim($url));
$exec=curl_exec($ch);
$x=curl_error($ch);

echo $exec.$x;

exit;


echo base64_decode(urldecode('aHR0cDovL2xvY2FsaG9zdC93b3JkcHJlc3Mvd3AtYWRtaW4vZWRpdC5waHA%2FcG9zdF90eXBlPXdwX2F1dG9tYXRpYyZwYWdlPWdtX3NldHRpbmc%3D'));
exit;

$enc =  base64_encode('welcome omigo to the land without end');

echo ' enc '.$enc;

echo ' '.base64_decode($enc);
exit;

exit; 
echo file_get_contents('https://buff.ly/2yh628C');

 echo time('now');
 exit;

 //curl ini
 $ch = curl_init();
 curl_setopt($ch, CURLOPT_HEADER,0);
 curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
 curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
 curl_setopt($ch, CURLOPT_TIMEOUT,20);
 curl_setopt($ch, CURLOPT_REFERER, 'http://www.bing.com/');
 curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36');
 curl_setopt($ch, CURLOPT_MAXREDIRS, 5); // Good leeway for redirections.
 curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); // Many login forms redirect at least once.
 curl_setopt($ch, CURLOPT_COOKIEJAR , "cookie.txt");
 
 //curl get
 $x='error';
 $url='https://duckduckgo.com/?q=site%3Aezinearticles.com+best+home+security+gadgets&t=h_&ia=web';
 curl_setopt($ch, CURLOPT_HTTPGET, 1);
 curl_setopt($ch, CURLOPT_URL, trim($url));
 $exec=curl_exec($ch);
 $x=curl_error($ch);
 
 echo $exec.$x; 

 exit;
//curl ini
$ch = curl_init();
curl_setopt($ch, CURLOPT_HEADER,0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
curl_setopt($ch, CURLOPT_TIMEOUT,20);
curl_setopt($ch, CURLOPT_REFERER, 'http://www.bing.com/');
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.8) Gecko/2009032609 Firefox/3.0.8');
curl_setopt($ch, CURLOPT_MAXREDIRS, 5); // Good leeway for redirections.
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); // Many login forms redirect at least once.
curl_setopt($ch, CURLOPT_COOKIEJAR , "cookie.txt");
curl_setopt($ch, CURLOPT_IGNORE_CONTENT_LENGTH, true);

 
$path = '//*[@id="list-container"]/div[3]/div[2]/div[4]/div/div[2]/div[1]/div/div[1]/a/div[3]';
$path = '//*[@id="news-article-list"]/article[1]/header/h2/a';
$path = '//*[@id="react-view"]/div/div[2]/div/div[2]/div/div[3]/div/div/div/div[2]/ul/li[1]/div/div/div[1]/div[2]/h3/a';

$path = '//*[@id="articles-wrapper"]/div/section[1]/a/h2';
$url = 'http://www.newsdogshare.com/entertainment/';

$path = '/html/body/main/section[2]/div/div/div/div[1]/div[2]/div[2]/div/h3/a';
$url = 'https://www.liveleak.com/';

$path = '//*[@id="list-container"]/div[3]/div[2]/div[4]/div/div[2]/div[1]/div/div[1]/a/div[3]';
$url = 'https://www.ajmadison.com/cooking-appliances/wall-ovens';

$path = '//*[@id="hs-below-list-items"]/li[1]/div/div[3]/h3/a' ;
$url = 'https://www.aliexpress.com/af/cover.html?d=y&origin=n&blanktest=0&jump=afs&SearchText=cover&initiative_id=SB_20180319061136&isViewCP=y&catId=0';

$path = '//*[@id="news-article-list"]/article[1]/header/h2/a';
$url = 'http://www.imdb.com/news/movie';

require_once 'inc/class.dom.php';
$html =  file_get_contents($url );

$wpAutomaticDom = new wpAutomaticDom( $html );

try {
	
	echo '<br><pre>';
	print_r($wpAutomaticDom->getSimilarLinks($path));
	
} catch (Exception $e) {
	echo '<br>Error:'.$e->getMessage();
	
}

   