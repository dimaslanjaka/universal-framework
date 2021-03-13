<?php
class curl
{
  public $proxy;
  public $result;
  public $cookie;
  public $temp;

  public function __construct()
  {
    global $option;
    $this->temp = 'cache';
    if (!is_dir($this->temp)) {
      $oldmask = umask(0);
      mkdir($this->temp, 0777);
      umask($oldmask);
    }

    //($option ? global $option : false);
    $this->proxy = ($option['proxy'] ? $option['proxy'] : false);
    $this->result = ($option['result'] ? $option['result'] : false);
    $this->cookie = ($option['cookiefile'] ? $option['cookiefile'] : ($option['cookie'] ? $option['cookie'] : false));
  }

  public function fetch($url, $option = null)
  {
    $_SESSION['peek'] = $url;
    $ch = curl_init();
    if (false !== strpos($url, 'https://')) {
      curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    }
    $useragent = isset($option['useragent']) ? $option['useragent'] : 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:10.0.2) Gecko/20100101 Firefox/10.0.2';
    if (isset($option['dump'])) {
      curl_setopt($ch, CURLOPT_HEADER, 1);
    }
    if (isset($option['headers'])) {
      curl_setopt($ch, CURLOPT_HTTPHEADER, $option['headers']);
    }
    curl_setopt($ch, CURLOPT_URL, $url) or die('URL NOT FOUND');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_AUTOREFERER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_POST, isset($option['post']));

    if (isset($option['post'])) {
      curl_setopt($ch, CURLOPT_POSTFIELDS, $option['post']);
    }
    if (isset($option['refer'])) {
      curl_setopt($ch, CURLOPT_REFERER, $option['refer']);
    }

    if (isset($option['proxy'])) {
      curl_setopt($ch, CURLOPT_PROXY, $option['proxy']);
    }
    curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, (isset($option['timeout']) ? $option['timeout'] : 5));

    $cookie = (isset($option['cookiefile']) ? $option['cookiefile'] : realpath($this->temp . '/current_cookies.txt'));
    curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie);
    curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie);

    if (isset($option['verbose'])) {
      curl_setopt($ch, CURLOPT_VERBOSE, true);
    }
    $result = curl_exec($ch);
    $contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
    $_SESSION['ContentType'] = $contentType;
    $info = curl_getinfo($ch);
    if (isset($option['dumpinfo'])) {
      var_dump($info);
    }
    curl_close($ch);
    if (200 == $info['http_code']) {
      /*
       if (!isset($_SESSION["prxwork"])){
       $_SESSION["prxwork"] = $option["proxy"];
       }
       */
      return $result;
    } else {
      return curl_error($ch);
    }
  }
}

class Proxy
{
  // Stores proxies.
  public $store = [];

  // Cache store for proxies.
  private $file = '';

  public function http_get_contents($url)
  {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_TIMEOUT, 1);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    if (false === ($retval = curl_exec($ch))) {
      return curl_error($ch);
    } else {
      return $retval;
    }
  }

  public function get_contents($url)
  {
    $file = $url;
    $contents = preg_match('/^http/', $file) ? $this->http_get_contents($file) : file_get_contents($file);

    return $contents;
  }

  // Constructs the class.
  // @param $f File cache location for proxies, this file will have an array of proxies that are working. You may specify it as EMPTY( '' ) if you dont want to cache proxy list! File extension must be .php.
  //           By default it generates a file called __FILE_PROXY_CACHE.php that contains the proxies cached.
  public function __construct($f = 'cache/cache.php')
  {
    if ($f) {
      $this->file = $f;
    }

    if ($this->file && file_exists($this->file)) {
      include $this->file;

      if (isset($s) && is_array($s)) {
        $this->store = $s;
      }
    }
  }

  // Adds default proxy list, these sites may be down so you must maybe create your own handlers...
  public function initDefaultProxies()
  {
    $this->add(
      'http://www.ip-adress.com/proxy_list/',
      "#<td>(.*?):(\d{1,4})</td>#"
    );

    $this->add(
      'http://www.digitalcybersoft.com/ProxyList/fresh-proxy-list.shtml?',
      "#(.*?):(\d{1,4}).*?\n#"
    );

    $this->add(
      'http://www.secretip.com/proxylist.php',
      "#(.*?):(\d{1,4})<br />\n#"
    );

    $this->add(
      'http://www.proxyserverprivacy.com/free-proxy-list.shtml',
      "#(.*?):(\d{1,4})<br />\n#"
    );
  }

  // Gets the proxies in associve array ( ip:port )
  public function getProxies()
  {
    $ip = [];
    foreach ($this->store as $p) {
      if ($p['port']) {
        $ip[] = $p['proxy'] . ':' . $p['port'];
      } else {
        //$ip[0]="NO PORT FOUND \n";
        $ip[] = $p['proxy'];
      }
    }

    return $ip;
  }

  // Use this when adding own handlers to add proxy to list.
  public function debugadd($adr, $regexp)
  {
    unset($this->store);
    $this->add($adr, $regexp);
    echo '<pre>', print_r($this->store), '</pre>';

    die();
  }

  public function html($url)
  {
    return $this->get_contents($url);
  }

  public function getIP($url, $re)
  {
  }

  // Use this to add a site to the proxy array.
  public function add($adr, $regexp)
  {
    if (!$this->timeupdate($adr)) {
      return false;
    }
    if (false !== strpos($adr, '<body>')) {
      $c = $adr;
    } else {
      $c = file_get_contents($adr);
      if (!$c) {
        $c = $this->get_contents($adr);
      }
      if (!$c) {
        $curl = new curl();
        $c = $curl->fetch($adr);
      }
    }
    if ($c) {
      $matches = [];
      preg_match_all($regexp, $c, $matches);
      if (count($matches) > 0) {
        foreach ($matches[0] as $k => $m) {
          //if (!$iponly){
          $port = intval($matches[2][$k]) or null;

          $ip = trim($matches[1][$k]);
          $st = ['proxy' => $ip, 'port' => $port, 'site' => md5($adr), 'time' => time()];
          /* } else {
             $port = null;
             $ip = trim($matches[1][$k]);
             $st = array('proxy' => $ip, 'port' => $port, 'site' => md5($adr), 'time' => time());
            }*/
          if (/*$port && */!$this->inStore($st)) {
            $this->store[] = $st;
          }
        }

        if (count($this->store) > 0) {
          $this->dump();
        }
      }
      // return "Added OK!";
    } // end if $c
  }

  private function inStore($st)
  {
    foreach ($this->store as $s) {
      if ($s['proxy'] == $st['proxy'] && $s['port'] == $st['port']) {
        return true;
      }
    }

    return false;
  }

  private function dump()
  {
    if ($this->file) {
      file_put_contents($this->file, '<?php $s = ' . var_export($this->store, true) . '; ?>');
    }
  }

  private function timeupdate($adr)
  {
    foreach ($this->store as $s) {
      if ($s['site'] == md5($adr)) {
        if (time() > ($s['time'] + (60 * 60 * 2))) {
          return false;
        }
      }
    }

    return true;
  }
}
