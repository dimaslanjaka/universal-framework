<?php

namespace Facebook;

//require __DIR__ . '/dom.php';

use MVC\Exception;
use Extender\request;
use HTML\dom;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use function HTML\str_get_html;

class client extends request
{
  private $email;
  private $password;
  private $logFile;
  public $htmlreturn = '';

  public function __construct()
  {
    parent::__construct('https://mbasic.facebook.com');
    $me = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : 'okhttp/3.1.10';
    $this->setUserAgent($me);
  }

  public function getEmail()
  {
    return $this->email;
  }

  public function setEmail($email)
  {
    $this->email = $email;
    $_SESSION['fb_email'] = $email;
    $this->setHeader(CURLOPT_COOKIEJAR, $this->cookie_file($email));
    $this->setHeader(CURLOPT_COOKIEFILE, $this->cookie_file($email));
    $this->setCookieFile($this->cookie_file($email));
    $this->setCookieJar($this->cookie_file($email));
    $this->cookiefile = $this->cookie_file($email);
    $this->logFile = \Filemanager\file::file(__DIR__ . '/tmp/log/' . $this->email, '');
    $_SESSION['fb_cookie'] = $this->cookie_file($email);

    return $this;
  }

  public function get_cookieFile()
  {
    return $this->getOpt(CURLOPT_COOKIEFILE);
  }

  public function get_instance()
  {
    if (isset($_SESSION['fb_email'])) {
      $this->setEmail($_SESSION['fb_email']);
    }

    return $this;
  }

  public function is_loggedin()
  {
    return isset($_SESSION['fb_email']);
  }

  public function cookie_file($email)
  {
    return $this->putfile(__DIR__ . '/tmp/cookies/' . $email, '');
  }

  public function setPass($pw)
  {
    $this->password = $pw;

    return $this;
  }

  public function loginform()
  {
    return [
      'email' => $this->email,
      'pass' => $this->password,
      'login' => 'Masuk',
    ];
  }

  public function login($username, $password)
  {
    $cookieFile = $this->getOpt(CURLOPT_COOKIEFILE);
    if (!$this->getOpt(CURLOPT_COOKIEFILE) || empty($this->getOpt(CURLOPT_COOKIEFILE))) {
      $cookieFile = $this->putfile(__DIR__ . "/tmp/cookies/$username", '');
    }
    // access to facebook home page (to get the cookies)
    $curl = curl_init();

    if ($username && $password) {
      curl_setopt($curl, CURLOPT_URL, 'http://www.facebook.com');
      curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($curl, CURLOPT_ENCODING, '');
      curl_setopt($curl, CURLOPT_COOKIEJAR, $cookieFile);
      curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
      $curlData = curl_exec($curl);

      // do get some parameters for login to facebook
      $this->curlarsetTest = substr($curlData, strpos($curlData, 'name="charset_test"'));
      $this->curlarsetTest = substr($this->curlarsetTest, strpos($this->curlarsetTest, 'value=') + 7);
      $this->curlarsetTest = substr($this->curlarsetTest, 0, strpos($this->curlarsetTest, '"'));

      $locale = substr($curlData, strpos($curlData, 'name="locale"'));
      $locale = substr($locale, strpos($locale, 'value=') + 7);
      $locale = substr($locale, 0, strpos($locale, '"'));

      $lsd = substr($curlData, strpos($curlData, 'name="locale"'));
      $lsd = substr($lsd, strpos($lsd, 'value=') + 7);
      $lsd = substr($lsd, 0, strpos($lsd, '"'));

      //Login

      curl_setopt($curl, CURLOPT_URL, 'https://mbasic.facebook.com/login.php?login_attempt=1');
      curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($curl, CURLOPT_POST, 1);
      curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
      curl_setopt($curl, CURLOPT_POSTFIELDS, 'charset_test=' . $this->curlarsetTest . '&locale=' . $locale . '&non_com_login=&email=' . $username . '&pass=' . $password . '&charset_test=' . $this->curlarsetTest . '&lsd=' . $lsd);
      curl_setopt($curl, CURLOPT_ENCODING, '');
      curl_setopt($curl, CURLOPT_COOKIEFILE, $cookieFile);
      curl_setopt($curl, CURLOPT_COOKIEJAR, $cookieFile);
      curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
      //$curlData is the html of your facebook page
      $curlData = curl_exec($curl);
      if (strpos($curlData, 'approvals_code')) {
        $loginhtml = $this->putfile(__DIR__ . "/tmp/html/$username.html", $curlData, false, true);
        $_SESSION['loginhtml'] = $loginhtml;
        $html = dom::str_get_html(file_get_contents($loginhtml));
        $this->htmlreturn = $this->getAsset('login/checkpoint.html', [
          'approvals_code' => $html->find('[name="approvals_code"]', 0)->outertext,
          'nh' => $html->find('[name="nh"]', 0)->outertext,
          'fb_dtsg' => $html->find('[name="fb_dtsg"]', 0)->outertext,
          'checkpoint_data' => $html->find('[name="checkpoint_data"]', 0)->outertext,
          'codes_submitted' => $html->find('[name="codes_submitted"]', 0)->outertext,
          'submit' => $html->find('[name="submit[Submit Code]"]', 0)->outertext,
        ]);
      } else {
        $this->htmlreturn = file_get_contents($loginhtml);
      }
    }

    $this->response = $curlData;

    //print $curlData;

    curl_close($curl);

    return $this;
  }

  public function base($path)
  {
    return (isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . $path;
  }

  /**
   * Get user ID from Cookie.
   *
   * @param string $cookie
   */
  public function getUserID(string $cookie)
  {
    if (is_file($cookie)) {
      $cookie = file_get_contents($cookie);
    }
    $parser = new \Netscape\parser();
    var_dump($parser->extractCookies($cookie));
    if (preg_match('/c\_user\s+([0-9]{4,20})/m', $cookie, $cookiem)) {
      if (isset($cookiem[1])) {
        return $cookiem[1];
      }
    }
  }

  public function check_cookie($throw = false)
  {
    $scanner = new \Filemanager\scan();
    if ($this->getOpt(CURLOPT_COOKIEFILE)) {
      try {
        //$cookiename = $scanner->scanAllFiles(__DIR__ . '/config')->file;
        //var_dump(is_numeric($cookiename));
        $cookietxt = \Filemanager\file::get($this->getOpt(CURLOPT_COOKIEFILE));
        if (preg_match('/checkpoint\s+deleted|c\_user\s+([0-9]{4,20})/m', $cookietxt, $cookiem)) {
          $this->htmlreturn = $this->getAsset('login/success.htm');
          $this->preg_match = $cookiem;
          if (isset($cookiem[1]) && is_numeric($cookiem[1])) {
            if (basename($this->get_cookieFile()) != $cookiem[1]) {
              $newfile = dirname($this->get_cookieFile()) . '/' . $cookiem[1];
              file_put_contents($newfile, file_get_contents($this->get_cookieFile()));
              unlink($this->get_cookieFile());
              $this->setEmail(basename($this->get_cookieFile()));
            }
          }
        } elseif (preg_match('/c\_user\sdeleted/m', $cookietxt)) {
          $this->error = true;
          $this->errorMessage = $this->email . ' was Logged Out';
          var_dump($cookietxt);
          if ($throw) {
            throw new Exception('Logged out', 1);
          }
        } else {
          $this->htmlreturn = $this->getAsset('login/form.htm', [
            'action' => $this->base('/fb/login'),
          ]);
        }
      } catch (\Throwable $th) {
        $this->htmlreturn = "{$th->getMessage()}";
      }
    }

    return $this;
  }

  public function getAsset($filename, $config = [])
  {
    $filename = preg_replace('/^\//s', '', $filename);
    $content = \Filemanager\file::get(__DIR__ . "/html/$filename");
    //ev($content);
    if (!empty($config)) {
      foreach ($config as $key => $value) {
        if (false !== strpos($content, "%$key%")) {
          $content = str_replace("%$key%", $value, $content);
        }
      }
    }

    return $content;
  }

  public function putfile($path, $content, $append = false, $force = false)
  {
    if (!is_dir(dirname($path))) {
      mkdir(dirname($path), 0777, true);
    }
    $flags = 0;
    if ($append) {
      $flags = FILE_APPEND;
    }
    if ($force || !file_exists($path)) {
      file_put_contents($path, $content, $flags);
    }

    return $path;
  }

  public function clearDump(...$s)
  {
    if (ob_get_level()) {
      ob_end_clean();
      ob_start();
    }
    ev($s);
  }

  public function getTypeReaction(string $type)
  {
    $acak = ['type=1', 'type=2', 'type=3', 'type=4', 'type=7', 'type=8'];
    $siap = $acak[rand(0, count($acak) - 1)];
    if ('1' == $type || 'suka' == $type || 'like' == $type) {
      $siap = 'type=1';
    }
    if ('3' == $type || 'wow' == $type) {
      $siap = 'type=3';
    }
    if ('2' == $type || 'super' == $type || 'love' == $type) {
      $siap = 'type=2';
    }
    if ('4' == $type || 'haha' == $type) {
      $siap = 'type=4';
    }
    if ('7' == $type || 'sad' == $type || 'sedih' == $type) { //sedih
      $siap = 'type=7';
    }
    if ('8' == $type || 'angry' == $type || 'marah' == $type) { //marah
      $siap = 'type=8';
    }
    //var_dump($type);
    return $siap;
  }

  public function getTextReaction(string $type)
  {
    $type = strtolower($type);
    if ('1' == $type || 'suka' == $type || 'like' == $type) {
      $siap = 'Like';
    }
    if ('3' == $type || 'wow' == $type) {
      $siap = 'WOW';
    }
    if ('2' == $type || 'super' == $type || 'love' == $type) {
      $siap = 'LOVE';
    }
    if ('4' == $type || 'haha' == $type) {
      $siap = 'HAHA';
    }
    if ('7' == $type || 'sad' == $type || 'sedih' == $type) { //sedih
      $siap = 'SAD';
    }
    if ('8' == $type || 'angry' == $type || 'marah' == $type) { //marah
      $siap = 'ANGRY';
    }

    return $siap;
  }

  public function getListReactions()
  {
    return [
      1 => 'like',
      3 => 'wow',
      2 => 'love',
      4 => 'haha',
      7 => 'sad',
      8 => 'angry',
    ];
  }

  public function getReaction($idPost, $type, bool $run = false)
  {
    $type = $this->getTypeReaction($type);
    $cookiefile = $this->get_cookieFile();
    $gerr = 'https://mobile.facebook.com/reactions/picker/?ft_id=' . $idPost;
    $sukaa = $this->fbg($gerr, $cookiefile);
    $suka = $this->cut($sukaa, 'tanggapan</h1>', '<div id="static');
    $ha = explode('/ufi/reaction/', $suka);
    $liha = count($ha);
    //echo $sukaa . '<hr>';
    for ($hai = 0; $hai <= $liha; ++$hai) {
      $getha = $this->cut($ha[$hai], $type, '"');
      $getha = trim($getha);
      //echo $getha . '<br>';
      if ($getha) {
        $hajarm = 'https://mobile.facebook.com/ufi/reaction/?ft_ent_identifier=' . $idPost . '&amp;reaction_' . $type . '' . $getha;
        $hajar = str_replace('&amp;', '&', $hajarm);
        $hajar = trim($hajar);
        //echo $hajar . '<br>';
        $idHasLiked = $this->getLog($idPost);
        if ($run && $idHasLiked) {
          $doLike = $this->fbg($hajar, $cookiefile);
          $this->putLog("$idPost reaction type " . $this->getTextReaction($type) . PHP_EOL);
          //var_dump($doLike);
        }
      }
    }
  }

  public function putLog($for_id)
  {
    if (!is_dir(dirname($this->logFile))) {
      mkdir(dirname($this->logFile), 0777, true);
    }
    \Filemanager\file::file($this->logFile, $for_id, false, true, false);

    return;
  }

  public function getLog($for_id)
  {
    var_dump($this->logFile, "=====LOG {$this->email}=====\n\n");
    \Filemanager\file::file($this->logFile, "=====LOG {$this->email}=====\n\n");
    $file = \Filemanager\file::get($this->logFile);

    return strpos($file, $for_id);
  }

  public function get_cookieList()
  {
    $result = [];
    $di = new RecursiveDirectoryIterator(__DIR__ . '/tmp/cookies/');
    foreach (new RecursiveIteratorIterator($di) as $filename => $file) {
      if ('.' == basename($filename) || '..' == basename($filename)) {
        continue;
      }
      if (realpath($filename)) {
        //$this->setEmail(basename(realpath($filename)));
        $result[] = realpath($filename);
      }
      //echo 'full path ' . $filename . ' <br> size ' . $file->getSize() . ' bytes <br/> ' . basename($filename) . '<br>';
    }
    shuffle($result);

    return $result;
  }

  public function get_config()
  {
    $f = __DIR__ . '/config/' . $this->email . '.json';
    if (!is_dir(dirname($f))) {
      mkdir(dirname($f), 0777, true);
    }
    if (!file_exists($f)) {
      \Filemanager\file::file($f, [
        'type' => 1,
        'max' => 5,
        'delay' => 5,
      ]);
    }
    try {
      $fc = \Filemanager\file::get($f);

      return json_decode($fc);
    } catch (\Throwable $th) {
      return false;
    }
  }

  public function put_config($data)
  {
    if (is_array($data)) {
      foreach ($data as $key => $value) {
        if ('g-recaptcha-response' == $key) {
          unset($data[$key]);
        }
        if ('on' == $value || 'off' == $value) {
          $data[$key] = 'on' == $value ? true : false;
        }
      }
      $data = json_encode($data);
    }
    \Filemanager\file::file(__DIR__ . '/config/' . $this->email . '.json', $data, true);
  }

  public $ids = [];

  public function getHomePosts()
  {
    $this->setUserAgent('Opera/9.80 (Series 60; Opera Mini/6.5.27309/34.1445; U; en) Presto/2.8.119 Version/11.10');
    $this->setCookieJar($this->get_cookieFile());
    $this->setCookieFile($this->get_cookieFile());
    curl_setopt($this->curl, CURLOPT_URL, 'https://mbasic.facebook.com/?_rdc=1&_rdr');
    curl_setopt($this->curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($this->curl, CURLOPT_CUSTOMREQUEST, 'GET');
    $headers = [];
    $headers[] = 'Host: mbasic.facebook.com';
    $headers[] = 'Connection: keep-alive';
    $headers[] = 'Dnt: 1';
    $headers[] = 'Upgrade-Insecure-Requests: 1';
    $headers[] = 'User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36';
    $headers[] = 'Sec-Fetch-Dest: document';
    $headers[] = 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9';
    $headers[] = 'Sec-Fetch-Site: none';
    $headers[] = 'Sec-Fetch-Mode: navigate';
    $headers[] = 'Accept-Encoding: gzip, deflate';
    $headers[] = 'Accept-Language: id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7,ms;q=0.6';
    curl_setopt($this->curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($this->curl, CURLOPT_ENCODING, '');

    $content = curl_exec($this->curl);
    //var_dump($content);
    if (curl_errno($this->curl)) {
      echo 'Error:' . curl_error($this->curl);
    }

    $this->htmlreturn = "using cookie {$this->get_cookieFile()}\n";
    if (!empty($content)) {
      //$konten = strstr($content, 'class="_3-8w">');
      //var_dump($konten);
      $ft_id = preg_match_all('/ft_id\=([0-9]{5,20})\&/m', $content, $ids);
      $ft_id = array_unique(array_filter($ids[1]));
      $limit = count($ft_id);
      $this->htmlreturn .= "Total posts: $limit<br>";
      for ($i = 0; $i <= $limit; ++$i) {
        //$id = $this->cut($ft_id[$i], 'ft_id=', '&');
        $this->htmlreturn .= $ft_id[$i] . '<br>';
        $this->ids[] = $ft_id[$i];
        //$this->getReaction($ft_id[$i], $type);
      }
    } else {
      $this->htmlreturn .= "Fail getting home posts\n";
      var_dump($content, $this->getErrorMessage());
    }
    $this->ids = array_unique(array_filter($this->ids));

    return $this;
  }

  public function cut($content, $start, $end)
  {
    if ($content && $start && $end) {
      $r = explode($start, $content);
      if (isset($r[1])) {
        $r = explode($end, $r[1]);

        return $r[0];
      }

      return '';
    }
  }

  /**
   * Facebook GET.
   *
   * @param string $url
   * @param string $cookie
   */
  public function fbg(string $url, $cookie = null)
  {
    if (!$cookie) {
      if ($this->get_cookieFile() && realpath($this->get_cookieFile())) {
        $cookie = $this->get_cookieFile();
      }
      if (!$cookie) {
        throw new Exception('Cookie is needed', 1);
      }
    }
    $me = 'Opera/9.80 (Series 60; Opera Mini/6.5.27309/34.1445; U; en) Presto/2.8.119 Version/11.10';
    $this->setUserAgent($me);
    $this->setOpt(CURLOPT_HEADER, 1);
    $this->setOpt(CURLOPT_ENCODING, '');
    $this->setOpt(CURLOPT_RETURNTRANSFER, 1);
    $this->setCookieFile($cookie);
    $this->setCookieJar($cookie);
    $this->disableSSL();
    $this->get($url);

    return $this->response;
  }

  public function put_tmp($filename, $content)
  {
    if (is_array($content)) {
      $content = json_encode($content);
    }
    $filepath = __DIR__ . '/tmp/save/' . $filename;
    if (!is_dir(dirname($filepath))) {
      mkdir(dirname($filepath), 0777, true);
    }
    file_put_contents($filepath, $content);

    return $this;
  }

  public function echo_response()
  {
    echo "using url {$this->url}<br>";
    echo 'using cookie ' . $this->getOpt(CURLOPT_COOKIEFILE) . '<br>';
    echo 'error ' . ($this->error ? $this->error : 'false') . '<br>';
    var_dump($this->getResponse());
  }

  public function check_error($success, $failed)
  {
    if ($this->error) {
      call_user_func($failed, $this->getMessage());
    } else {
      call_user_func($success, true);
    }
  }

  public function getMessage()
  {
    return $this->getErrorMessage();
  }

  public function cookie_check($cookiefile)
  {
    if (file_exists($cookiefile)) {
      $cookie = file_get_contents($cookiefile);
      //var_dump($cookie);
      if (preg_match('/checkpoint/m', $cookie)) {
        $this->error = true;
        $this->error_label = 'checkpoint';
        $this->errorMessage = 'Account got checkpoint, please verify first';
      }
    }

    return $this;
  }
}
