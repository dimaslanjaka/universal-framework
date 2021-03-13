<?php

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
      $this->src = _file_(TEMP . '/src.txt');
    }
    if (!$this->out) {
      $this->out = _file_(TEMP . '/work.txt');
    }
    $this->headers = [];
    $this->init = [];
    if (!headers_sent()) {
      header('Content-Type: text/plain; charset=utf-8');
    }
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
    $this->string .= file_get_contents($this->src);

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
          $this->result[] = $match[0];
        }
      }
      if ($save) {
        $this->save();
      }
    }

    return $this;
  }

  public function save()
  {
    $A = isset($this->result[0]) && !empty($this->result[0]) ? $this->result[0] : $this->result;
    if (!empty($A)) {
      $this->result = array_unique($A);
    }
    foreach ($this->result as $prx) {
      if (empty($prx) || strlen($prx) < 10) {
        continue;
      }
      $this->string .= trim($prx) . "\n";
    }
    //$this->string .= implode("\n", $this->result);
    if ($this->out) {
      @file_put_contents($this->out, $this->string, FILE_APPEND);
    }

    return $this;
  }

  public function unique()
  {
    if (is_array($this->result)) {
      $this->result = array_unique($this->result);
    }

    return $this;
  }

  public function print_out()
  {
    if ($this->string) {
      echo $this->string;
    }
  }

  public function check()
  {
    if (!$this->src && !$this->out) {
      throw new Exception('Error Processing Request', 1);

      return null;
    }
    $proxy = explode("\n", file_get_contents($this->src));
    $fh = fopen($this->out, 'w');
    $proxy = array_unique($proxy);
    $proxy = array_filter($proxy);
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
    $lines = file($this->out, FILE_SKIP_EMPTY_LINES);
    $lines = array_unique($lines);
    file_put_contents($this->out, implode($lines));
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
