 <?php
 
 exit;
 //header("Content-Type: text/html; charset=EUC-KR");
 
 
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
 $url='http://job.heykorean.com/hk_job/job_view.asp?id=841143&page=1&oc_code=101&oc_type=&area_code=&keyword=&sponser_chk=&id_keyword=';
 curl_setopt($ch, CURLOPT_HTTPGET, 1);
 curl_setopt($ch, CURLOPT_URL, trim($url));
 $exec=curl_exec($ch);
 
 $exec = iconv(  'EUC-KR' , "UTF-8", $exec);
 
 $x=curl_error($ch);
 
 echo $exec.$x;
 
 exit;
 
require_once 'inc/class.dom.php';

$wpAutomaticDom = new wpAutomaticDom(file_get_contents('test.txt'));

 

//$regexMatchs = $wpAutomaticDom->getContentByXPath("//*[@class='user-html']");
//$regexMatchs = $wpAutomaticDom->getContentByXPath('//table[contains(concat (" ", normalize-space(@class), " "), " outer ")]/tbody/tr[2]/td/table/tbody/tr/td[1]');
//$regexMatchs = $wpAutomaticDom->getContentByXPath('/html/body/table/tr/td');
//$regexMatchs = $wpAutomaticDom->getContentByXPath('//table');
//$regexMatchs = $wpAutomaticDom->getContentByXPath('/html/body/table/tr[2]/td/table/tr/td[1]/table/tr[1]/td/table');
//$regexMatchs = $wpAutomaticDom->getContentByXPath('/html/body/table/tbody/tr/td[3]/font[2]',false);
//$regexMatchs = $wpAutomaticDom->getContentByXPath('//*[@id="selDistrict1"]/div[3]/a' , false);

$regexMatchs = $wpAutomaticDom->getContentByClass('subbuzz',false);



////html/body/table/tbody/tr[2]/td/table/tbody/tr/td[1]

print_r($regexMatchs);


?>