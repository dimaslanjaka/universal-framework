<?php

use Stichoza\GoogleTranslate\GoogleTranslate;
use Curl\Curl;

/**
 * Google AGC init.
 *
 * @param curl_init $curl = curl_instance or null
 */
class gtrans extends dimas
{
  private $curl;
  public $string;
  private static $_instance = null;
  public $logtxt;

  public function __construct($curl = null)
  {
    $this->curl = ($curl ? $curl : $this->cURL(false));
    parent::__construct($curl);
  }

  public static function i()
  {
    if (null === self::$_instance) {
      self::$_instance = new self();
    }

    return self::$_instance;
  }

  public function getLogTxt()
  {
    $log = '';
    $folder = ROOT . '/views/AGC';
    if (is_dir($folder)) {
      foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($folder)) as $entry) {
        //var_dump($entry->getPathname());
        if ($entry->isFile() && $entry->isWritable() && preg_match('/log[0-9]*\.txt$/m', $entry)) {
          $log .= file_get_contents(smartFilePath($entry->getPathname())) . "\r\n\r\n";
        }
      }
    }
    $this->logtxt = $log;

    return $log;
  }

  /**
   * Generate index.json.
   *
   * @param simple_html_dom $html              DOM simple_html_dom instance
   * @param url             $homepage          homepage URL
   * @param regexp          $paths             define index/page regex
   * @param array           $options
   * @param URLPathName     $options['router']
   * @param string          $options['niche']
   */
  public function generateIndex($html, $homepage, $paths, $options = ['router' => '', 'niche' => 'general', 'echo' => true])
  {
    if (!isAdmin() && !isBot()) {
      echo 'Only staff';

      return;
    }
    if (!isset($options['echo'])) {
      $options['echo'] = true;
    }
    $json_cfg = [];
    $pagination = [];
    $sent = [];
    $unsent = [];
    $log = $this->getLogTxt();
    if (!isURL($homepage)) {
      throw new \Exception('homepage must be url');
    }
    $parse_url = parse_url($homepage);
    //exit(var_dump($parse_url));
    //ev(count($html->find('a')));
    foreach ($html->find('a') as $a) {
      if (!isset($a->href) || !isURL($a->href)) {
        continue;
      }
      $href = parse_url($a->href);
      //precom($href);
      $href_url = $a->href;
      $sameHost = $href['host'] == $parse_url['host'];
      //precom($sameHost, $href['host'], $parse_url['host']);
      if ($sameHost) {
        if (!empty($a->href)) {
          //precom($href);
          if (isset($href['path']) && !empty($href['path']) && !preg_match('/<img|Comments?$|^Read Post|^Read more/m', trim(html_entity_decode($a->innertext)))) {
            $pathResolver = (isset($href['query']) ? '?query=' . urlencode($href['query']) . '&path=' . urlencode($href['path']) : '?path=' . urlencode($href['path']));
            $json_cfg[md5($href_url)] = [
              'href' => $options['router'] . $pathResolver,
              'innertext' => $a->innertext,
              'origins' => $a->href,
              'rel' => $a->hasAttribute('rel') ? $a->rel : false,
              'sent' => false,
              'source_lang' => 'id',
            ];
            $needle = str_replace('/', '', $href['path']);
            $notSend = (!empty($needle) ? !strpos($log, $needle) : false) && !preg_match($paths, $href['path']);
            if ($notSend && !preg_match($paths, $a->href)) {
              $a->href = $options['router'] . $pathResolver;
              $a->id = 'newtab';
              $a->{'data-name'} = 'drakorstation';
              $json_cfg[md5($href_url)]['type'] = 'post';
              if (!in_array($a->outertext, $unsent)) {
                $unsent[] = $a->outertext;
              }
            } else {
              if (preg_match('/^\/page/m', $href['path'])) {
                $post_type = 'page';
              } elseif (preg_match('/^\/author\//m', $href['path'])) {
                $post_type = 'author';
              } elseif (preg_match($paths, $href['path'])) {
                $post_type = 'category';
              } elseif (!$notSend) {
                $post_type = 'post';
                $json_cfg[md5($href_url)]['sent'] = true;
              } else {
                $post_type = false;
              }
              if (isset($post_type)) {
                $json_cfg[md5($href_url)]['type'] = $post_type;
              }
              $a->href = $options['router'] . $pathResolver;
              $arrs = '<a href="' . $a->href . '" id="newtab" data-name="AGC" class="m-1">' . $a->innertext . '</a>';
              if (!in_array($arrs, $pagination) && preg_match($paths, $href['path'])) {
                $pagination[] = $arrs;
              } elseif (!in_array($arrs, $sent) && !preg_match($paths, $href['path'])) {
                $sent[] = $arrs;
              }
              //precom(!in_array($arrs, $sent), !preg_match($paths, $href['path']), !$notSend);
            }
          }
        }
      }
    }
    if ($options['echo']) {
      echo '<div id="pagination" class="p-1 mb-1 border border-success"><center>Available</center><hr style="border-top: 1px dashed #8c8b8b;"> ' . implode('<br/>', $unsent) . '</div>';
      echo '<div id="pagination" class="p-1 mb-1 border border-primary"><center>Pagination</center><hr style="border-top: 1px dashed #8c8b8b;"> ' . implode(' ', $pagination) . '</div>';
      if (isAdmin()) {
        echo '<div id="sents" class="p-1 mb-1 border border-warning"><center>Already Sent</center><hr style="border-top: 1px dashed #8c8b8b;"> ' . implode('<br/>', $sent) . '</div>';
      }
    }
    $this->create_index_AGC($homepage, $json_cfg, $options['niche']);
  }

  /**
   * @todo Create index json AGC
   *
   * @param url          $url
   * @param array|object $content
   *
   * @return string|int $dirpath
   */
  public function create_index_AGC($url, $content, $niche)
  {
    $p = parse_url($url);
    $dirpath = ROOT . '/views/AGC/saved/' . $niche . '/' . $p['host'] . '/index.json';
    if (is_array($content) || is_object($content)) {
      ksort($content);
      if (!file_exists($dirpath)) {
        _file_($dirpath, $content, true);
      } else {
        $c = file_get_contents($dirpath);
        if (!empty($c)) {
          $j = json_decode($c);
          $content = array_merge((array) $j, (array) $content);
          //precom($content);
        }
        _file_($dirpath, $content, true);
      }

      return $dirpath;
    }
  }

  public function build_url($url, $hl = 'auto', $tl = 'en')
  {
    $usg1 = substr(md5(microtime()), rand(0, 26), 5);
    $usg2 = substr(md5(microtime()), rand(0, 26), 5);
    $usg3 = substr(md5(microtime()), rand(0, 26), 5);
    $multiplehash = '1000,1500002,15700002,15700022,15700122,15700124,15700149,15700168,15700173,15700186,15700201';

    return 'https://translate.googleusercontent.com/translate_c?depth=3&nv=1&rurl=translate.google.com&sl=' . $hl . '&sp=nmt4&tl=' . $tl . '&u=' . $url . '&xid=' . $multiplehash . '&usg=' . $usg1 . '_' . $usg2 . '-' . $usg3;
  }

  public function build_url_2($url, $sourcelang = 'auto', $tolang)
  {
    //return "https://translate.google.co.id/translate?hl=id&sl=$sourcelang&tl=$tolang&u=https%3A%2F%2Fblog.akarmas.com";
    $U2 = "https://translate.google.co.id/translate?sl=$sourcelang&tl=$tolang&u=" . urlencode($url);
    sess('translator_url', $U2);

    return $U2;
  }

  public function verify_article($filter)
  {
    $rgx = '/\<\!\-\-original\-\-\>|id\=agcontent|id\=[\'|"]agcontent[\'|"]|id\=[\'|"]A\-G\-C[\'|"]|for\=[\'|"]title[\'|"]|A\-G\-C/m';
    if (false === strpos($filter, 'Sorry, we are unable to access the page you requested')) {
      return preg_match($rgx, $filter);
    } elseif (strpos($filter, 'The page you have attempted to translate is already')) {
      exit('AGC Couldn\'t be translated (Already translated)');
    } elseif (preg_match('/(Additional, a 404 error found to handle the request|The server encountered an internal error or misconfiguration and was unable to complete your request|404\. That\'s an error|The document has moved)/m', $filter, $matches)) {
      $admin = is_user_logged_in() && current_user_can('administrator') ? json_encode($matches) : '';
      exit('<div id="error" class="alert alert-danger">AGC Failed [Unable Access] ' . $admin . '</div>');
    }

    return true;
  }

  public function translate($url, $hl = 'auto', $tl = 'en')
  {
    $curl = $this->curl;
    $url = $this->build_url_2($url, $hl, $tl); //build_url
    if (isses('proxy') && preg_match('/([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}):?([0-9]{1,6})?/m', isses('proxy'))) {
      $curl->setProxy(trim(isses('proxy')));
      $curl->setProxyTunnel(true);
    }
    $thetr = $curl->get($url);
    $filter = $this->parsetry($thetr);
    if (isset($_REQUEST['method']) && 'loop' == $_REQUEST['method']) {
      for ($i = 0; $i < 5; ++$i) {
        if (!$this->verify_article($filter)) {
          $filter = $this->parsetry($filter);
        } else {
          break;
        }
      }
    } else {
      if (!$this->verify_article($filter)) {
        $filter = $this->parsetry($filter);
      }
      if (!$this->verify_article($filter)) {
        $filter = $this->parsetry($filter);
      }
    }
    if (empty($filter)) {
      die('<div id="error" class="alert alert-danger">Translator contents not exist</div>');
    }
    //$this->dump($filter);

    $domnew = new \DOMDocument('1.0', 'UTF-8');
    libxml_use_internal_errors(true);
    $domnew->loadHTML(mb_convert_encoding($filter, 'HTML-ENTITIES', 'UTF-8'));
    $xpath = new DOMXpath($domnew);

    $head = $domnew->getElementsByTagName('head')->item(0);
    /**
     * @var \DomNode
     */
    $body = $domnew->getElementsByTagName('body')->item(0);

    $modlink = $xpath->query('//a');
    foreach ($modlink as $link) {
      $href = $link->getAttribute('href');
      $url_parts = parse_url($href);
      if (isset($url_parts['query'])) {
        if (false !== parse_str($url_parts['query'], $url_query)) {
          if (false === strpos($link->getAttribute('rel'), 'related')) {
            if (!isset($url_query['lang'])) {
              if (isset($url_query['u'])) {
                $hrefd = urldecode($url_query['u']);
              }
            } else {
              if (isset($url_query['u'])) {
                $hrefd = urldecode($url_query['u']) . '&lang=' . $url_query['lang'];
              }
            }
          }
          $link->setAttribute('href', $hrefd);
        } else {
          die('<div id="error" class="alert alert-danger">Reload pagenya gan, Server Overload</div>');
        }
      }
    }

    $spans = $xpath->query('//span');
    foreach ($spans as $span) {
      if (false !== strpos($span->getAttribute('class'), 'google-src-text')) {
        $span->parentNode->removeChild($span);
      }
    }

    $iframes = $xpath->query('//iframe');
    foreach ($iframes as $iframe) {
      if (false !== strpos($iframe->getAttribute('id'), 'gt-nvframe')) {
        $iframe->parentNode->removeChild($iframe);
      }
    }

    $scripts = $xpath->query('//script');
    foreach ($scripts as $script) {
      $transreg = [$script->nodeValue, $script->getAttribute('src')];
      foreach ($transreg as $matches) {
        if (preg_match('/(translate|wtsrt\_|\_addload|\_addload\(function\(\)\{\_setupIW)/mi', $matches)) {
          $script->parentNode->removeChild($script);
        }
      } //End array each
      if ($script->hasAttribute('data-cf-settings')) {
        $script->parentNode->removeChild($script);
      }
    }

    $getalltags = $xpath->query('//*');
    foreach ($getalltags as $tag) {
      if (preg_match('(iframe|audio|embed|video)', $tag->tagName)) {
        if ($tag->hasAttribute('src')) {
          $src = $tag->getAttribute('src');
          $url_parts = parse_url($src);
          parse_str($url_parts['query'], $url_query);
          $src = urldecode($url_query['u']);
          $tag->setAttribute('src', $src);
        }
      }
      if ('h1' == $tag->tagName && $tag->hasAttribute('for') && 'title' == $tag->getAttribute('for')) {
        $_SESSION['title'] = $tag->textContent;
        //$nodeDiv = $domnew->createElement("title", $tag->textContent);
        //$tag->parentNode->replaceChild($nodeDiv, $tag->parentNode);
      }
      if (!empty($tag->getAttribute('onmouseover'))) {
        $tag->removeAttribute('onmouseover');
      }
      if (!empty($tag->getAttribute('onmouseout'))) {
        $tag->removeAttribute('onmouseout');
      }
      if (false !== strpos($tag->getAttribute('title'), '000webhost')) {
        $tag->parentNode->removeChild($tag);
      }
      if (preg_match('/(X-Translated-By)/mi', $tag->getAttribute('http-equiv'))) {
        $tag->parentNode->removeChild($tag);
      }
    }
    /**
     * @var mixed $body
     */
    if ($body->hasAttribute('style')) {
      $body->removeAttribute('style');
    }
    //return $body->ownerDocument->saveHTML($body);

    if (!defined('NO_TITLE_TRANSLATE')) {
      $a_html_titles = $domnew->getElementsByTagName('title');
      if ($a_html_titles && !empty($a_html_titles)) {
        $a_html_title = isset($a_html_titles->item(0)->nodeValue) ? $a_html_titles->item(0)->nodeValue : false;
        if (!empty($a_html_title)) {
          $_SESSION['title'] = trim($this->decode_html($a_html_title));
        }
      }
    }

    $res = $domnew->savehtml($body);
    $res = $this->clean($res);
    $res = $this->grammar($hl . '-' . $tl, $res);
    $fres = str_get_html($res);
    if ($fres->find('title')) {
      foreach ($fres->find('title') as $title) {
        $title->outertext = '<br/><center><small data-agc="title">' . $title->plaintext . '</small></center><br/>';
      }
    }
    if (!$fres->find('div#A-G-C')) {
      echo '<div id="error" class="alert alert-danger">Element AGC Wrapper not found</div>';
      echo '<br/>';
      echo $res;

      return;
    }
    $res = $fres->find('div#A-G-C', 0)->outertext;
    //$res .= '<small></small>';

    return $this->filter_result('<div id="XXX-AGX">' . $res . '</div>');
    // return $domnew->saveHTML();
  }

  public function filter_result($htmlt)
  {
    $html = str_get_html($htmlt);
    if ($html->find('script')) {
      foreach ($html->find('script') as $del) {
        if (preg_match_all('/\{\_setupIW/m', $del->plaintext)) {
          $del->outertext = '';
        }
      }
    }
    if ($html->find('h1,h2,h3,h4,h5')) {
      foreach ($html->find('h1,h2,h3,h4,h5') as $header) {
        if (count($header->children()) > 0) {
          $header->innertext = trim($header->plaintext);
        }
      }
    }
    $result = $html->find('#XXX-AGX', 0)->innertext;
    if (!$html->find('pre,code')) {
      $result = html_entity_decode($result);
      $result = htmlspecialchars_decode($result);
    }
    $_SESSION['body_translated'] = $result;

    return $result;
  }

  /**
   * Return string.
   */
  public function __toString()
  {
    return $this->string;
  }

  public function decode_html($string)
  {
    $string = html_entity_decode($string);
    $string = htmlspecialchars_decode($string);
    if (preg_match('/&(?:[a-z]+|#x?\d+);/i', $string, $m)) {
      if (is_string($m[0])) {
        $string = htmlspecialchars_decode($m[0]);
      } else {
        foreach ($m[0] as $n) {
          $string = htmlspecialchars_decode($n);
        }
      }
    }

    return $string;
  }

  public function download_site($c)
  {
    $p = parse_url($c);

    return preg_match_all('/(racaty|okedrive|verystream|openload|zippyshare|uptobox|mega|mediafire|userscloud|sendit|sfile|drive\.google|solidfiles|downace|subscene|oload|vidoza|mirrorace|public\.upera|uppit|rapidvideo|www\.mp4upload)\.[cloudnetmzvipsrabz]{1,7}/m', strtolower($p['host']));
  }

  /**
   * Fix grammar.
   *
   * @param string $t     id-en
   * @param string $word  word to be fixed
   * @param bool   $chain chainning mode
   */
  public function grammar($t, $word, $chain = false)
  {
    $h = '<a href="//web-manajemen.blogspot.com" rel="follow" alt="Website Development Indonesia" title="Website Development Indonesia">Website Development Indonesia</a>';
    $arr = [
      'ttrouble' => 'trouble',
      ' [BAGAS31] ' => " [$h] ",
      ' [GRATIS31] ' => " [$h] ",
      'GRATIS31.com ' => "[$h] ",
      'BAGAS31 -' => "[$h] -",
      '>drakorstation.com<' => '> Website Manajemen Indonesia <',
      '>Drakorstation.com<' => '> Website Manajemen Indonesia <',
      '>DrakorStation.com<' => '> Website Manajemen Indonesia <',
      '\1' => '\ 1',
      '404-596-7925' => '+62 856-5566-7573',
      /*
   * Malas Ngoding Start
   */
      '>www.malasngoding.com<' => '>web-manajemen.blogspot.com<',
      '&gt;www.malasngoding.com&lt;' => '&gt;web-manajemen.blogspot.com&lt;',
      '-malasngoding' => '',
      '_malasngoding' => '',
      '- Malas Ngoding' => '',
      'di malasngoding.com' => '',
      'di www.malasngoding.com' => '',
      //' malasngoding</li>', '</li>',
      '- www.malasngoding.com' => '- web-manajemen.blogspot.com',
    ];
    switch ($t) {
      case 'id-en':
        $arr['>di sini<'] = '>HERE<';
        $arr['>Disini<'] = '>HERE<';
        $arr['>Di sini<'] = '>HERE<';
        $arr['>disini<'] = '>HERE<';
        $arr['error-nya'] = 'error';
        $arr['Begini bunyi'] = 'Seems like this';
        break;
    }
    $s = strtr($word, $arr); //php intelipense goblok
    if (!is_string($s)) {
      exit(var_dump($s));
    }
    if (isset($this)) {
      $this->string .= $s;
    }

    return !$chain ? $s : $this;
  }

  /**
   * Cleaning body html tags.
   *
   * @param string $html
   *
   * @return mixed
   */
  protected function clean($html)
  {
    return preg_replace('/\<body\>|\<\/body\>/m', '', $html);
  }

  protected function parsetry($thetr)
  {
    $curl = $this->curl;
    $dom = new DOMDocument();
    libxml_use_internal_errors(true);
    if (!empty($thetr)) {
      $dom->loadHTML($thetr);
      //$this->dump($dom->getElementsByTagName('a'));
      if (0 !== $dom->getElementsByTagName('iframe')->length) {
        /**
         * @var string
         */
        $iFrame = $dom->getElementsByTagName('iframe')->item(0);
        if (empty($iFrame)) {
          throw new Exception('The field is undefined.');
        }
        $iFramesrc = $iFrame->getAttribute('src');
        if (preg_match('/googleusercontent|translate\.google\.com/m', $iFramesrc)) {
          $thetr2 = $curl->get($iFramesrc);
          $filter = $thetr2;
        }
      }
      $_SESSION['translating']['iframe'] = $dom->getElementsByTagName('iframe')->length;
      if (0 !== $dom->getElementsByTagName('a')->length) {
        /**
         * @var string
         */
        //$A = $dom->getElementsByTagName('a')->item(0);
        $A = $dom->getElementsByTagName('a');
        foreach ($A as $al) {
          $Ahref = $al->getAttribute('href');
          $parse = parse_url($Ahref);
          //var_dump($parse, $Ahref);
          //$this->dump($A->getAttribute('href'));
          if (isset($parse['host']) && preg_match('/translate\.googleusercontent\.com|translate\.google\.com/m', $parse['host'])) {
            $thetr2 = $curl->get($Ahref);
            //$this->dump($thetr2);
            $filter = $thetr2;
            break;
          }
        }
      }
      $_SESSION['translating']['a'] = $dom->getElementsByTagName('a')->length;
      $dom->saveHTML();
    }
    if (!isset($filter)) {
      $this->refresh_proxy();
      exit('<div id="error" class="alert alert-danger">AGC Failed [filter null]</div>');
    }
    $_SESSION['translating']['filter'] = $filter;

    return $filter;
  }

  public function refresh_proxy()
  {
    if (!isses('proxy')) {
      $ajax = '
      $.get("/AGC/proxy?set", function(o){
        location.reload(1);
      });';
    } else {
      $ajax = '
      $.get("/AGC/proxy?del=' . isses('proxy') . '", function(p){
        $.get("/AGC/proxy?set", function(o){
          location.reload(1);
        });
      });
      ';
    }
    echo '<div id="loadingio-wrapper" class="ld-over-full">
    <span class="ld">
      <span class="ld ld-ball ld-bounce"></span>
      <span id="loadingio-text" class="text pt-3">Please wait...</span>
    </span></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script>
    $("#loadingio-wrapper").addClass("running");
      var loading_text = $("#loadingio-text");
      loading_text.html("Fetching proxies...");
      ' . $ajax . '
    </script>';
  }

  public function addtitle($title)
  {
    $this->string .= '<title>' . $title . '</title>';

    return $this;
  }

  public function single_translate($sl, $tl, $text)
  {
    $tr = new GoogleTranslate(); // Translates to 'en' from auto-detected language by default
    $tr->setSource($sl); // Translate from English
    //$tr->setSource(); // Detect language automatically
    $tr->setTarget($tl); // Translate to Georgian
    return $tr->translate($text);
  }

  public function amp($html)
  {
    $post = str_get_html('<div id="AgCx">' . $html . '</div>');
    foreach ($post->find('amp-img,amp-iframe,amp-youtube') as $amp) {
      if ('amp-img' == $amp->tag) {
        $amp->outertext = '<img src="' . imgCDN($amp->src) . '" title="' . $amp->title . '" width="100%" height="auto" />';
      } elseif ('amp-iframe' == $amp->tag) {
        $amp->outertext = '<div class="embed-container"><iframe src="' . $amp->src . '" frameborder="0" width="100%" height="auto"></iframe></div>';
      } elseif ('amp-youtube' == $amp->tag) {
        $amp->outertext = '<div class="embed-container"><iframe src="https://www.youtube.com/embed/' . $amp->{'data-videoid'} . '" frameborder="0" width="420" height="270" frameborder="0" allowfullscreen></iframe></div>';
      }
    }
    $post->save();

    return $post->find('#AgCx', 0)->innertext;
  }

  public function cURL($verbose = true)
  {
    $curl = new Curl();
    $headers = ['Accept: text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5', 'Connection: Keep-Alive', 'Cache-Control: max-age=0', 'Upgrade-Insecure-Requests: 1', 'DNT: 1', 'Keep-Alive: 300', 'Content-type: */*;charset=UTF-8', 'Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7', 'Accept-Language: en-us,en;q=0.5', 'Pragma: no-cache', 'Origins: https://translate.google.co.id'];
    $curl->setHeaders($headers);
    $useragent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : 'Opera/9.80 (J2ME/MIDP; Opera Mini/4.2.14912/870; U; id) Presto/2.4.15';
    $curl->setUserAgent($useragent);
    $curl->setReferrer('https://translate.google.co.id/m/translate');
    $curl->setOpt(CURLOPT_ENCODING, 'gzip');
    $curl->setOpt(CURLOPT_AUTOREFERER, true);
    $curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
    $curl->setOpt(CURLOPT_CAINFO, __DIR__ . '/cacert.pem');
    $curl->setOpt(CURLOPT_COOKIESESSION, true);
    $curl->setOpt(CURLOPT_RETURNTRANSFER, true);
    $curl->setOpt(CURLOPT_FOLLOWLOCATION, true);
    $cookie = defined('COOKIEFILE') ? COOKIEFILE : __DIR__ . '/cookie.txt';
    $curl->setCookieFile($cookie);
    $curl->setCookieJar($cookie);
    if ($verbose) {
      $curl->setOpt(CURLOPT_VERBOSE, true);
    }
    if (isses('proxy') && !empty(isses('proxy'))) {
      $curl->setProxy(trim(isses('proxy')));
      $curl->setProxyTunnel(true);
    }

    return $curl;
  }

  /**
   * Handle curl error.
   *
   * @param Curl $curl
   *
   * @return Curl
   */
  public function curl_err($curl)
  {
    if ($curl->error) {
      echo 'Error (' . $curl->errorCode . '): ' . $curl->errorMessage . "\n";

      return $curl;
      exit;
    }
  }

  /**
   * fetch content based file time created.
   *
   * @param Curl   $curl
   * @param url    $url
   * @param string $niche              folder name
   * @param array  $option
   * @param int    $option['filehour'] time expired in hour default 24
   *
   * @return Curl
   */
  public function fetch_contents($curl, $url, $niche = 'general', $option = ['filehour' => 24, 'fileExt' => 'html'])
  {
    if (!is_string($niche)) {
      throw new Exception('niche must be string instead of ' . gettype($niche));
    }
    sess('target', $url);
    unses('translating');
    if (!isset($option['filehour'])) {
      $option['filehour'] = 0;
    }
    if (!isset($option['fileExt'])) {
      $option['fileExt'] = 'html';
    }
    if (!$option['filehour']) {
      $option['filehour'] = (int) 0;
    }
    $parse_url = parse_url($url);
    if (isset($parse_url['host'])) {
      $upath = isset($parse_url['path']) ? str_replace('/', '', $parse_url['path']) : md5($url);
      $upath = preg_replace('/\.html$/m', '', $upath);
      $dpath = $_SERVER['DOCUMENT_ROOT'] . "/views/AGC/saved/$niche/" . $parse_url['host'] . '/' . $upath . (isset($parse_url['query']) ? md5($parse_url['query']) : '') . '.src.' . $option['fileExt'];
      $_SESSION['article_source'] = $dpath;
      $crawl = true;

      if (file_exists($dpath)) {
        $old = filemtime($dpath);
        if ($old < $option['filehour'] * 60 * 60 || empty(file_get_contents($dpath))) {
          $crawl = true;
        } else {
          $ext = pathinfo($dpath, PATHINFO_EXTENSION);
          $content = file_get_contents($dpath);

          switch ($ext) {
            case 'json':
              $curl->response = json_decode($content);
              break;
            default:
              $curl->response = $content;
              break;
          }
          //var_dump($ext, $curl->response);
          $curl->error = false;
          $crawl = false;
        }
      }
      //$crawl = 1;
      if ($crawl) {
        $curl->get($url);
        if (!$curl->error) {
          if (is_object($curl->response)) {
            //$curl->response = $this->cj($curl->response);
          }
          //var_dump($curl->responseHeaders['content-type']);
          switch ($curl->responseHeaders['content-type']) {
            case 'application/json':
              _file_($dpath, $curl->response, true);
              break;

            case 'text/html':
              _file_($dpath, htmlcom(getDatetimeNow()) . $curl->response, true);
              break;

            default:
              _file_($dpath, $curl->response, true);
              break;
          }
        } else {
          return $this->curl_err($curl);
        }
      }

      $curl->filename = $dpath;

      if (is_string($curl->response)) {
        $html = str_get_html($curl->response);
        $T = $html && $html->find('title') ? preg_replace('/\s+/m', ' ', preg_replace('/\/|\\|\s+/m', ' ', html_entity_decode($html->find('title', 0)->plaintext))) : '';
        if (isset($_SESSION['title'])) {
          if ($_SESSION['title'] != $T) {
            //echo '<script>location.reload(1);</script>';
            $_SESSION['title'] = $T;
          }
        }
      }

      return $curl;
    } else {
      echo '<pre class="tx-danger">Host is undefined</pre>';
    }
  }
}

class agcparser
{
  public static $string;
  public static $backup_html;
  private static $_instance = null;

  private function __construct()
  {
  }

  public static function getInstance()
  {
    if (null === self::$_instance) {
      self::$_instance = new self();
    }

    return self::$_instance;
  }

  /**
   * Clean inline style from tags.
   *
   * @param array $elements
   */
  public function clean_inline_style(...$elements)
  {
    $str = self::$string;
    $html = str_get_html('<div id="xGc">' . $str . '</div>');
    foreach ($elements as $itag) {
      //precom($itag);
      if ($html->find($itag)) {
        foreach ($html->find($itag) as $tag) {
          if ($tag->hasAttribute('style')) {
            $tag->removeAttribute('style');
          }
        }
      }
    }
    self::$string = $html->find('#xGc', 0)->innertext;

    return $this;
  }

  public static function detecturl($string)
  {
    $regex_url = '#\bhttps?://[^,\s()<>]+(?:\([\w\d]+\)|([^,[:punct:]\s]|/))#';
    if (preg_match_all($regex_url, $string, $match)) {
      return $match[0];
      /*
      for ($i = 0; $i < count($match[0]); ++$i) {
      //imgCDN(trim($match[0][$i]))
      $t = trim($match[0][$i]);
      $string = str_replace($t, $t, $string);
      }
      */
    }
  }

  public static function precode($string)
  {
    $result = $string;
    $breaks = ['<br />', '<br>', '<br/>'];
    $text = str_ireplace($breaks, "\r\n", html_entity_decode($string));
    $pre = str_get_html('<div id="preCodeAGC">' . $text . '</div>');
    foreach ($pre->find('*') as $tag) {
      if ('img' == $tag->tag || 'amp-img' == $tag->tag) {
        $src = parse_url($tag->src);
        if (isset($src['host'])) {
          if ('imgcdn.000webhostapp.com' != $src['host']) {
            $result = str_replace($tag->src, imgCDN($tag->src), $string);
          }
        }
      }
    }

    return $result;
  }

  public function removeSchema($html)
  {
    $htm = str_get_html('<div id="A-Gc>' . $html . '</div>');
    if ($htm->find('[itemprop]')) {
      foreach ($html->find('[itemprop]') as $x) {
        $x->removeAttribute('itemprop');
      }
    }
    if ($htm->find('[itemscope]')) {
      foreach ($html->find('[itemscope]') as $x) {
        $x->removeAttribute('itemscope');
      }
    }
    return $htm->find('#A-Gc', 0)->innertext;
  }

  /**
   * Parsing view for translated agc.
   *
   * @param array $option $option['highlight']=true|false
   * @param $str string to be fixed
   * @param bool $reverse reverse needles translator
   */
  public function parsingview($str, $reverse = false, $option = [])
  {
    $backup = '';
    $arr = [
      '<s+c+r+i+p+t>' => '<script>',
      '<s+c+r+i+p+t src' => '<script src',
      '</s+c+r+i+p+t>' => '</script>',
    ];
    if (!$reverse) {
      $arr['</s>+c+r+i+p+t&gt;'] = '</script>';
      $arr['<s src'] = '<script src';
      $arr['</s>+c+r+i+p+t>'] = '</script>';
    }
    if ($reverse) {
      $arr = array_flip((array) $arr);
    }
    $str = strtr($str, $arr);
    if (!$reverse) {
      $g = str_get_html('<div id="AXSO">' . $str . '</div>');
      if ($g->find('link,script')) {
        foreach ($g->find('link,script') as $add) {
          $backup .= $add->outertext;
          $add->outertext = '';
        }
      }

      if (isset($option['highlight'])) {
        foreach ($g->find('pre,code,pre code') as $opt) {
          if (!$option['highlight']) {
            if (isset($opt->class)) {
              $opt->{'data-class'} = $opt->class;
              $opt->class = 'nohighlight';
              $opt->{'data-highlight'} = 'false';
            }
          } else {
            if (isset($opt->class)) {
              if (isset($opt->{'data-class'})) {
                $opt->class = $opt->{'data-class'};
                unset($opt->{'data-class'});
              }
              $opt->{'data-highlight'} = 'true';
            }
          }
        }
      }

      $str = $g->find('#AXSO', 0)->innertext;
    }
    self::$string = $str;
    self::$backup_html = $backup;
    $this->save_depencies();

    return $this;
  }

  /**
   * save stylesheet and scripts
   * * Calling this after parsingview().
   */
  public function save_depencies()
  {
    $_SESSION['depencies'] = self::$backup_html;

    return $this;
  }

  /**
   * load stylesheet and scripts
   * * Calling this after parsingview().
   */
  public function load_depencies()
  {
    if (isset($_SESSION['depencies'])) {
      self::$backup_html = $_SESSION['depencies'];
    }

    return $this;
  }

  /**
   * combining string and stylesheet and scripts
   * * Calling this after parsingview().
   */
  public function combine()
  {
    self::$string .= self::$backup_html;
    if (false !== strpos($_SERVER['REQUEST_URI'], '/send') || 'POST' == $_SERVER['REQUEST_METHOD']) {
      $_SESSION['body_translated'] = trim(self::$string);
    }

    return $this;
  }

  /**
   * print self::$string.
   *
   * @return string self::$string
   */
  public function __toString()
  {
    ///exit(self::$string);
    return trim(self::$string);
  }
}
