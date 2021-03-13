<?php

$pr = new Proxy();
$pr->src(__DIR__ . '/proxy.txt');
$pr->out(__DIR__ . '/proxy.txt');
if ($pr->is_cli()) {
  echo "CLI\n";
  $pr->add_default(3);
  $pr->getProxies(true);
  $pr->check();
} else {
  if (ob_get_status()) {
    ob_clean();
  }
  echo "WEB\n";
  if (isset($_REQUEST['add'])) {
    $pr->add_default(3);
    $pr->getProxies(true);
  } else {
    $pr->webcheck();
  }
  if (!headers_sent()) {
    $pr->quit();
  }
}

class Proxy
{
  public $init;
  public $result;
  public $string;
  public $src;
  public $out;
  public $regex_ip_port = '/([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}):?([0-9]{1,6})?/m';
  public $regex_br = '#(.*?):(\d{1,4})<br />\n#';
  public $regex_a = '#(.*?):(\d{1,4})</a>\n#';
  public $regex_all = '#(.*?):(\d{1,4}).*?\n#';
  public $regex_td = '#<td>(.*?):(\d{1,4})</td>#';
  public $regex_ip = '/([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/m';

  public function __construct()
  {
    if (!$this->src) {
      $this->src = 'proxy.txt';
    }
    if (!$this->out) {
      $this->out = 'proxy.txt';
    }
    $this->headers = [];
    $this->init = [];
    if (!headers_sent()) {
      header('Content-Type: text/plain; charset=utf-8');
    }
  }

  public function quit()
  {
    exit();
  }

  public function is_cli()
  {
    return 'cli' == php_sapi_name();
  }

  public function add_default($n)
  {
    $url = ['http://spys.one/en/https-ssl-proxy/', 'https://www.my-proxy.com/free-proxy-list.html', 'https://www.my-proxy.com/free-transparent-proxy.html', 'https://www.my-proxy.com/free-elite-proxy.html', 'https://www.my-proxy.com/free-anonymous-proxy.html', 'http://www.httptunnel.ge/ProxyListForFree.aspx', 'http://spys.me/proxy.txt', 'https://www.proxy-list.download/api/v1/get?type=https&anon=elite'];
    shuffle($url);
    for ($i = 0; $i < $n; ++$i) {
      $this->add($url[$i], $this->regex_ip_port);
      $this->add($url[$i], $this->regex_br);
    }

    return $this;
  }

  public function add($url, $regex)
  {
    $this->init[] = ['url' => $url, 'rgx' => $regex];

    return $this;
  }

  public function src($file)
  {
    $this->src = $file;
    if (file_exists($file)) {
      $this->string .= file_get_contents($this->src);
      $x = explode("\n", $this->string);
      if (!empty($x)) {
        foreach ($x as $s) {
          $this->result[] = $s;
        }
      }
    } else {
      file_put_contents($file, '');
    }

    return $this;
  }

  public function out($file)
  {
    $this->out = $file;

    return $this;
  }

  public function getProxies($save = false)
  {
    if (!empty($this->init)) {
      foreach ($this->init as $proxy) {
        $result = $this->curl($proxy['url']);
        if (preg_match_all($proxy['rgx'], $result, $match)) {
          foreach ($match[0] as $m) {
            $this->result[] = $m;
          }
          $this->unique();
        }
      }
      $this->save();
    }

    return $this;
  }

  public function save()
  {
    if ($this->out) {
      @file_put_contents($this->out, implode("\n", $this->result), FILE_APPEND);
    }
    $this->filter_proxy();

    return $this;
  }

  public function filter_proxy()
  {
    $lines = file($this->out, FILE_SKIP_EMPTY_LINES);
    $lines = array_unique($lines);
    file_put_contents($this->out, implode($lines));
  }

  public function unique()
  {
    if (is_array($this->result)) {
      $this->result = array_unique($this->result);
      for ($i = 0; $i < count($this->result); ++$i) {
        if (isset($this->result[$i]) && (false === strpos($this->result[$i], ':') || empty($this->result[$i]))) {
          unset($this->result[$i]);
        }
      }
    }

    return $this;
  }

  public function print_out()
  {
    if ($this->string) {
      echo $this->string;
    }
  }

  public function import_proxy()
  {
    if (!$this->src && !$this->out) {
      throw new Exception('Error Processing Request', 1);

      return null;
    }
    $proxy = explode("\n", file_get_contents($this->src));
    $proxy = array_unique($proxy);
    $proxy = array_filter($proxy);

    return $proxy;
  }

  public function get_web_page($url, $proxy)
  {
    $user_agent = 'Mozilla/5.0 (Windows NT 6.1; rv:8.0) Gecko/20100101 Firefox/8.0';

    $options = [
      CURLOPT_CUSTOMREQUEST => 'GET',        //set request type post or get
      CURLOPT_POST => false,        //set to GET
      CURLOPT_USERAGENT => $user_agent, //set user agent
      CURLOPT_COOKIEFILE => __DIR__ . '/cookie.txt', //set cookie file
      CURLOPT_COOKIEJAR => __DIR__ . '/cookie.txt', //set cookie jar
      CURLOPT_RETURNTRANSFER => true,     // return web page
      CURLOPT_HEADER => false,    // don't return headers
      CURLOPT_FOLLOWLOCATION => true,     // follow redirects
      CURLOPT_ENCODING => '',       // handle all encodings
      CURLOPT_AUTOREFERER => true,     // set referer on redirect
      CURLOPT_CONNECTTIMEOUT => 120,      // timeout on connect
      CURLOPT_TIMEOUT => 120,      // timeout on response
      CURLOPT_MAXREDIRS => 10,       // stop after 10 redirects
      CURLOPT_SSL_VERIFYPEER => 0,
      CURLOPT_SSL_VERIFYHOST => 0,
      CURLOPT_PROXY => $proxy,
    ];

    $ch = curl_init($url);
    curl_setopt_array($ch, $options);
    $content = curl_exec($ch);
    $err = curl_errno($ch);
    $errmsg = curl_error($ch);
    $header = curl_getinfo($ch);
    curl_close($ch);

    $header['errno'] = $err;
    $header['errmsg'] = $errmsg;
    $header['content'] = $content;

    return $header;
  }

  public function webcheck()
  {
    $total = 0;
    $ip = $this->import_proxy();
    $working = [];
    for ($i = 0; $i <= count($ip) - 1; ++$i) {
      $c = $this->get_web_page('https://www.google.com.tr', trim($ip[$i]));
      if (isset($c['content']) && $c['content']) {
        if (preg_match('#calendar\?tab=wc#si', $c['content'])) {
          ++$total;
          $working[] = trim($ip[$i]);
          echo '[~]Proxy works -> ' . trim($ip[$i]) . "\n";
          if (headers_sent() && !$this->is_cli()) {
            echo '<br/>';
          }
        }
      }
    }
    $this->result = $working;
    $this->save();
    echo "\nWorking Proxies: $total";
    //file_put_contents($this->out, implode("\n", $working));
  }

  public function check()
  {
    echo "Checking\n";
    $fh = fopen($this->out, 'a');
    $proxy = $this->import_proxy();
    for ($i = 0; $i < count($proxy) - 1; ++$i) {
      if (!empty($proxy[$i]) && preg_match($this->regex_ip_port, $proxy[$i], $match)) {
        $splited = explode(':', $match[0]);
        echo $match[0];
        if ($con = @fsockopen($splited[0], $splited[1], $eroare, $eroare_str, 3)) {
          fwrite($fh, $match[0] . "\n");
          echo " worked\n";
          fclose($con);
        } else {
          echo " dead\n";
        }
      }
    }
    fclose($fh);
    $this->filter_proxy();
  }

  public function curl($url, $type = 'GET')
  {
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 0);
    curl_setopt($curl, CURLOPT_TIMEOUT, 400); //timeout in second
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $this->headers);
    if ('POST' == $type) {
      curl_setopt($curl, CURLOPT_POST, 1);
      curl_setopt($curl, CURLOPT_POSTFIELDS, $this->query);
    }

    return curl_exec($curl);
    curl_close($curl);
  }
}
