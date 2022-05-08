<?php

namespace agc_service;

use Curl\Curl;
use Exception;
use gtrans;
use simplehtmldom\simple_html_dom;
use simplehtmldom\HtmlDocument;

if (!defined('DEFAULT_TARGET_CHARSET')) {
  define('DEFAULT_TARGET_CHARSET', 'UTF-8');
}
if (!defined('DEFAULT_BR_TEXT')) {
  define('DEFAULT_BR_TEXT', "\r\n");
}
if (!defined('DEFAULT_SPAN_TEXT')) {
  define('DEFAULT_SPAN_TEXT', ' ');
}
if (!defined('MAX_FILE_SIZE')) {
  define('MAX_FILE_SIZE', 2621440);
}
if (!defined('HDOM_SMARTY_AS_TEXT')) {
  define('HDOM_SMARTY_AS_TEXT', 1);
}
if (!defined('SALT')) {
  define('SALT', 'salt');
}
if (!defined('IV')) {
  define('IV', '1111111111111111');
} //pass salt minimum length 12 chars or it'll be show warning messages
if (!defined('ITERATIONS')) {
  define('ITERATIONS', 999);
} //iterations

class Service
{
  public $serviceList;
  /**
   * instance of simple_html_dom\str_get_html.
   *
   * @var HtmlDocument
   */
  public $dom;
  public $url;
  /**
   * parseURL.
   *
   * @var parse_url
   */
  public $parse_url;
  /**
   * AGC Receiver URL.
   *
   * @var string
   */
  public $receiver_url = 'http://dimaslanjaka.000webhostapp.com/receiver/receiver.php';
  public $contentHTML;
  /**
   * Title AGC.
   *
   * @var string
   */
  public $title;
  /**
   * Gtrans instance.
   *
   * @var gtrans
   */
  public $gtrans;
  /**
   * Niche.
   *
   * @var string
   */
  public $niche = 'general';
  /**
   * Href lang : source language.
   *
   * @var string
   */
  public $hl;
  /**
   * Source language : href lang.
   *
   * @var string
   */
  public $sl;
  /**
   * To language / target language.
   *
   * @var string
   */
  public $tl;
  /**
   * Restrict domain from creation class.
   */
  private $restrict_domain = '/liputan6\.|google\.|googleusercontent\.|weblight\.|spotify\.|soundcloud\.|facebook\.|twitter\.|linkedin\.|instagram\.|websiteoutlook\.|wikipedia\.(org|com)$|^localhost$/m';
  /**
   * Source URL of targeted translated.
   *
   * @var string
   */
  private $source_url;
  /**
   * Curl static.
   *
   * @var \Curl\Curl
   */
  private $curl;
  private $session_hash;
  private $uid;
  private $domainList;

  public function __construct($curl = false)
  {
    if (!$curl) {
      $curl = $this->cURL();
    }
    $this->getServices();
    $this->gtrans = new gtrans();
    $this->curl = $curl;
    $this->uid = uniqid(rand());
  }

  /**
   * Get contents.
   */
  public function content()
  {
  }

  /**
   * alternative str_get_html.
   *
   * @param string $str
   * @param bool   $lowercase
   * @param bool   $forceTagsClosed
   * @param [type] $target_charset
   * @param bool   $stripRN
   * @param [type] $defaultBRText
   * @param [type] $defaultSpanText
   */
  public function str_get_html(
    string $str,
    $lowercase = true,
    $forceTagsClosed = true,
    $target_charset = DEFAULT_TARGET_CHARSET,
    $stripRN = true,
    $defaultBRText = DEFAULT_BR_TEXT,
    $defaultSpanText = DEFAULT_SPAN_TEXT
  ) {
    $domx = new simple_html_dom();

    return $domx->str_get_html(
      $str,
      $lowercase,
      $forceTagsClosed,
      $target_charset,
      $stripRN,
      $defaultBRText,
      $defaultSpanText
    );
  }

  public function removeElement($selector)
  {
    if ($this->dom->find($selector)) {
      foreach ($this->dom->find($selector) as $c) {
        $c->outertext = '';
      }
    }
  }

  /**
   * Get niche by url.
   *
   * @param string $url
   *
   * @return string
   */
  public function getNiche($url = null)
  {
    if (!$url) {
      $url = $this->url;
    }
    if (!isURL($url)) {
      throw new Exception('niche parser must be URL instead of ' . gettype($url));
    }
    $p = parse_url($url);
    if (!isset($p['host'])) {
      throw new Exception('Host not match any parts');
    }
    $H = $p['host'];
    $niche = 'general';
    if (preg_match('/(bagas31|kuyhaa\-me|igg\-games)\.(info|com)$/m', $H)) {
      $niche = 'download';
    } elseif (preg_match('/popmama\.com|hellosehat\.com/m', $H)) {
      $niche = 'tips';
    } elseif (preg_match('/drakorstation\.(net|com)/m', $H)) {
      $niche = 'movies';
    }

    $this->niche = $niche;

    return $niche;
  }

  public function setNiche($str)
  {
    if (empty($str)) {
      return $this;
    }
    $this->niche = $str;

    return $this;
  }

  /**
   * get available Class.
   *
   * @param string $url
   *
   * @return $this
   */
  public function getClass($url)
  {
    if (!isURL($url)) {
      throw new Exception('Classname must be url');
    }
    $parse = parse_url2($url);
    if (isset($parse['host'])) {
      if ($this->isRestrictedDomain($parse['host'])) {
        return;
      }
      $classList = $this->getServices();
      $className = str_replace(['.', '-'], '_', $parse['host']);
      if (in_array($className, $classList)) {
        $cName = '\\agc_service\\' . $className;
        if (class_exists($cName)) {
          $this->domainList[$className] = $parse['host'];
          return new $cName();
        }
      } else {
        _file_(__DIR__ . "/{$className}.php", "<?php\n\n//$url");
      }
      //var_dump($className, $classList);
    }

    return false;
  }

  public function isRestrictedDomain($host)
  {
    return preg_match($this->restrict_domain, $host);
  }

  /**
   * Set AGC URL.
   *
   * @param string    $url
   * @param Curl\Curl $curl
   */
  public function set($url, $curl = null)
  {
    if (!$curl) {
      $curl = $this->cURL();
    }
    $this->url = $url;
    $this->parse_url = parse_url2($url);
    if ('general' == $this->niche || empty($this->niche)) {
      $this->getNiche($url);
    }
    $responseCurl = $this->fetch_contents($curl, $url, $this->niche);
    if (!$curl->error) {
      $this->dom = $this->getHTML($responseCurl->response);
      $this->title();
    } else {
      throw new Exception('Curl error: (' . $curl->errorCode . ') ' . $curl->errorMessage);
    }

    return $this;
  }

  /**
   * Generate session.
   *
   * @param string $key
   *
   * @return $this->session_hash
   */
  public function genSession($key = null, $val = null)
  {
    $this->session_hash = $this->encrypt(WP_HOST, $this->url . $key);
    sess($this->session_hash, []);

    return $this->session_hash;
  }

  /**
   * Crypto Encrypt.
   *
   * @param string $passphrase
   * @param string $plainText
   */
  public function encrypt($passphrase, $plainText)
  {
    $key = \hash_pbkdf2('sha256', $passphrase, SALT, ITERATIONS, 64);
    $encryptedData = \openssl_encrypt($plainText, 'AES-256-CBC', \hex2bin($key), OPENSSL_RAW_DATA, IV);

    return \base64_encode($encryptedData);
  }

  /**
   * Crypto Decrypt.
   *
   * @param string $passphrase
   * @param string $encryptedTextBase64
   */
  public function decrypt($passphrase, $encryptedTextBase64)
  {
    $encryptedText = \base64_decode($encryptedTextBase64);
    $key = \hash_pbkdf2('sha256', $passphrase, SALT, ITERATIONS, 64);
    $decryptedText = \openssl_decrypt($encryptedText, 'AES-256-CBC', \hex2bin($key), OPENSSL_RAW_DATA, IV);

    return $decryptedText;
  }

  /**
   * Send plain html to external source.
   *
   * @param string $html
   *
   * @return $this
   */
  public function sendHTML($html, $force = false)
  {
    $this->genSession();
    $saver = _file_(_PPATH_ . 'tmp/sentHTML.json', new \stdClass());
    $saver = file_get_contents($saver);
    $saver = json_decode($saver);
    $saverArray = (array) $saver;
    if (isset($saverArray[$this->session_hash]) && !empty($saverArray[$this->session_hash]) && isset($saverArray[$this->session_hash]->source_url)) {
      if (isURL($saverArray[$this->session_hash]->source_url)) {
        $this->source_url = $saverArray[$this->session_hash]->source_url;

        return $saverArray[$this->session_hash]->source_url;
      }
    }

    $b = '<div id="A-G-C" date="' . date('d M Y H:i:s') . '">';
    $b .= $html;
    $b .= '</div>';
    $curl = $this->cURL();
    $url = $this->receiver_url;
    $dir = $this->niche;
    $filename = preg_replace('/\.html$|\/$|\/|\@/m', '', $this->parse_url['path']) . '.html';
    $curl->post($url, [
      'dir' => $dir,
      'content' => $b,
      'filename' => $filename,
      'force' => $force,
    ]);
    $this->curl = $curl;
    if (!$curl->error) {
      $json = $curl->response;
      if (isset($json->url)) {
        $this->source_url = $json->url;
        if (!property_exists($saver, $this->session_hash)) {
          $saverArray[$this->session_hash]['source_url'] = $json->url;
        } elseif (!isset($saverArray[$this->session_hash]->source_url) || empty($saverArray[$this->session_hash]->source_url)) {
          $saverArray[$this->session_hash]->source_url = $json->url;
        }
        $saver = $saverArray;
        //ev($saver);
        _file_(_PPATH_ . 'tmp/sentHTML.json', $saver, true);
      } elseif (isAdmin()) {
        var_dump($json);
      }
    } else {
      exit($curl->errorMessage);
    }

    //ev($curl);

    return $this;
  }

  public function translate($filename = null, $rewrite = false)
  {
    if (!$filename) {
      $filename = parse_url2($this->source_url);
      $filename = basename($filename['path']);
    }

    if (!$this->tl) {
      return '<div id="error" class="alert alert-danger">Target language empty</div>';
    }
    if (!$this->sl) {
      return '<div id="error" class="alert alert-danger">Source language empty</div>';
    }
    sess('file_basename', $filename);

    $file_translated = ROOT . '/views/AGC/saved/translated/' . $this->niche . '/' . $this->sl . '-' . $this->tl . '/' . $filename;
    $sestrans = $this->encrypt(WP_HOST, $file_translated);
    if (file_exists($file_translated) && false === $rewrite) {
      sess($sestrans, file_get_contents($file_translated));

      return isses($sestrans);
    }
    if (isses($sestrans) && !empty(isses($sestrans)) && false === $rewrite) {
      return isses($sestrans);
    }
    $curl = $this->cURL();
    sess('proxy', $this->randProxy());
    $proxy = isses('proxy') ? trim(isses('proxy')) : $this->randProxy();
    if (!$proxy) {
      throw new Exception('Proxy Empty');
    }
    //exit($proxy);
    sess(__FUNCTION__ . '_proxy', $proxy);
    $curl->setProxy($proxy);
    $curl->setProxyTunnel(true);
    $translate = new \gtrans($curl);
    $c = $translate->translate($this->source_url, $this->sl, $this->tl);
    sess($sestrans, $c);
    _file_($file_translated, $c . PHP_EOL, $rewrite);

    return $c;
  }

  public function setTargetLang($str)
  {
    $this->tl = trim($str);

    return $this;
  }

  /**
   * Get proxy list.
   *
   * @return array
   */
  public function getProxy()
  {
    $f = file(ROOT . '/views/AGC/forms/proxy.txt', FILE_SKIP_EMPTY_LINES);
    $f = array_map('trim', $f);
    $f = array_unique($f);
    $f = array_filter($f);
    shuffle($f);

    return $f;
  }

  public function randProxy()
  {
    $items = $this->getProxy();
    if (empty($items)) {
      throw new Exception("Proxy empty. (" . __FUNCTION__ . ")");
    }

    return trim($items[array_rand($items)]);
  }

  /**
   * Delete proxy.
   *
   * @param string $proxy
   *
   * @return $this
   */
  public function delProxy($proxy)
  {
    $f = file_get_contents(__DIR__ . '/Service-proxy.txt');
    $f = str_replace($proxy, '', $f);
    file_put_contents(__DIR__ . '/Service-proxy.txt', $f);

    return $this;
  }

  public function getSource()
  {
    return [
      'source_url' => $this->source_url,
      'curl' => [
        'error' => [
          'status' => $this->curl->error,
          'code' => $this->curl->errorCode,
          'msg' => $this->curl->errorMessage,
        ],
      ],
    ];
  }

  public function setSourceLang($str)
  {
    $this->sl = $this->hl = $str;

    return $this;
  }

  public function cURL($verbose = true)
  {
    $curl = new Curl();
    $headers = ['Accept: text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5', 'Connection: Keep-Alive', 'Cache-Control: max-age=0', 'Upgrade-Insecure-Requests: 1', 'DNT: 1', 'Keep-Alive: 300', 'Content-type: */*;charset=UTF-8', 'Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7', 'Accept-Language: en-us,en;q=0.5', 'Pragma: no-cache', 'Origins: https://translate.google.co.id'];
    $curl->setHeaders($headers);
    $curl->setUserAgent(!isset($_SERVER['HTTP_USER_AGENT']) ? 'Mozilla/5.0 (Linux; Android 7.0; Redmi Note 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Mobile Safari/537.36' : $_SERVER['HTTP_USER_AGENT']);
    $curl->setReferrer('https://translate.google.co.id/m/translate');
    $curl->setOpt(CURLOPT_ENCODING, 'gzip');
    $curl->setOpt(CURLOPT_AUTOREFERER, true);
    $curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
    $curl->setOpt(CURLOPT_CAINFO, realpath(__DIR__ . '/cacert.pem'));
    $curl->setOpt(CURLOPT_COOKIESESSION, true);
    $curl->setOpt(CURLOPT_RETURNTRANSFER, true);
    $curl->setOpt(CURLOPT_FOLLOWLOCATION, true);
    if ($verbose) {
      $curl->setOpt(CURLOPT_VERBOSE, true);
    }
    $curl->setCookieFile(_file_(_PPATH_ . 'tmp/cookie.txt'));
    $curl->setCookieJar(_file_(_PPATH_ . 'tmp/cookie.txt'));

    return $curl;
  }

  /**
   * Fix images.
   */
  public function fixImageDom($callback = null)
  {
    $this->verifydom();
    if ($this->dom->find('img')) {
      foreach ($this->dom->find('img') as $img) {
        if (!isset($img->src)) {
          $img->outertext = '';
          continue;
        }
        $img->itemprop = 'image';
        if ($img->hasAttribute('data-cfsrc')) {
          if (false === strpos($img->getAttribute('data-cfsrc'), 'data:image')) {
            $img->src = $img->getAttribute('data-cfsrc');
          } elseif ($img->hasAttribute('data-lazy-src')) {
            $img->src = $img->getAttribute('data-lazy-src');
            $img->removeAttribute('data-lazy-src');
          }
          $img->removeAttribute('data-cfsrc');
        }
        if ($img->hasAttribute('data-lazy-src')) {
          if (false === strpos($img->getAttribute('data-lazy-src'), 'data:image')) {
            $img->src = $img->getAttribute('data-lazy-src');
          }
          $img->removeAttribute('data-lazy-src');
        }
        //var_dump($img->hasAttribute('data-lazy-srcset'));
        if ($img->hasAttribute('data-lazy-srcset')) {
          //$img->setAttribute('srcset', $img->getAttribute('data-lazy-srcset'));
          $img->removeAttribute('data-lazy-srcset');
        }
        if ($img->hasAttribute('data-lazy-type')) {
          $img->removeAttribute('data-lazy-type');
        }
        if ($img->hasAttribute('data-lazy-sizes')) {
          $img->removeAttribute('data-lazy-sizes');
        }
        if ($img->hasAttribute('data-src') && isURL($img->getAttribute('data-src'))) {
          $img->src = $img->getAttribute('data-src');
          $img->removeAttribute('data-src');
        }
        if ($img->hasAttribute('srcset')) {
          $img->removeAttribute('srcset');
        }
        if ($img->hasAttribute('sizes')) {
          $img->removeAttribute('sizes');
        }
        if ($img->hasAttribute('data-lazy-srcset')) {
          $img->removeAttribute('data-lazy-srcset');
        }
        if ($img->hasAttribute('data-lazy-sizes')) {
          $img->removeAttribute('data-lazy-sizes');
        }
        if ($img->hasAttribute('lazy-sizes')) {
          $img->removeAttribute('lazy-sizes');
        }
        if (!preg_match('/\.svg$/s', basename($img->src))) {
          $img->height = 'auto';
          $img->width = '100%';
        }
        $urlimg = parse_url2($img->src);
        if (!isset($urlimg['scheme'])) {
          $urlimg['scheme'] = $this->parse_url['scheme'];
        }
        if (!isset($urlimg['host'])) {
          $urlimg['host'] = $this->parse_url['host'];
        }
        $img->src = $this->build_url($urlimg);
        if (!isURL($img->src)) {
          continue;
        }
        $img->itemprop = 'image';
        $img->src = imgCDN($img->src);
        //$img->setAttribute('class', '');
        if (is_callable($callback)) {
          call_user_func($callback, $img);
        }
      }
    }
  }

  public function fixStyle($selector)
  {
    $this->verifydom();
    if ($sel = $this->dom->find($selector)) {
      foreach ($sel as $el) {
        if ($el->hasAttribute('style')) {
          $el->removeAttribute('style');
        }
      }
    }
  }

  /**
   * Build URL from parse_url.
   *
   * @param array $parts
   */
  public function build_url(array $parts)
  {
    if (isset($parts['query']) && !is_string($parts['query'])) {
      $parts['query'] = http_build_query($parts['query']);
    }

    return (isset($parts['scheme']) ? "{$parts['scheme']}:" : '') .
      ((isset($parts['user']) || isset($parts['host'])) ? '//' : '') .
      (isset($parts['user']) ? "{$parts['user']}" : '') .
      (isset($parts['pass']) ? ":{$parts['pass']}" : '') .
      (isset($parts['user']) ? '@' : '') .
      (isset($parts['host']) ? "{$parts['host']}" : '') .
      (isset($parts['port']) ? ":{$parts['port']}" : '') .
      (isset($parts['path']) ? "{$parts['path']}" : '') .
      (isset($parts['query']) ? "?{$parts['query']}" : '') .
      (isset($parts['fragment']) ? "#{$parts['fragment']}" : '');
  }

  public function fixAnchors()
  {
    $this->verifydom();
    if ($this->dom->find('a')) {
      foreach ($this->dom->find('a') as $a) {
        $a->rel = 'nofollow noopener';
        $a->target = '_blank';
        if (!isset($a->title)) {
          $a->title = $this->title;
        }
        if (isset($a->href)) {
          $parse = parse_url2($a->href);
          if (isset($parse['host'])) {
            if ($parse['host'] == $this->parse_url['host']) {
              if (isset($parse['path'])) {
                $exp = array_filter(explode('/', $parse['path']));
                $a->href = 'https://www.google.com/search?q=' . removespecial(end($exp), '+');
              }
            } else {
              $a->href = 'https://dimaslanjaka.github.io/page/safelink.html?gclid=' . $this->uid . '&u=' . base64_encode($a->href);
            }
          }
        }
      }
    }
  }

  public function fixSchema()
  {
    $this->verifydom();
    $schema = $this->dom->find('[itemprop],[itemscope],[itemtype]');
    if ($schema) {
      foreach ($schema as $el) {
        if ($el->hasAttribute('itemscope')) {
          $el->removeAttribute('itemscope');
        }
        if ($el->hasAttribute('itemtype')) {
          $el->removeAttribute('itemtype');
        }
        if ($el->hasAttribute('itemprop')) {
          $el->removeAttribute('itemprop');
        }
      }
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
    if (!isURL($url)) {
      throw new Exception('content to be fetched must be url: ' . $url . ' instead of ' . gettype($url));
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
          return $curl;
        }
      }

      if (is_string($curl->response)) {
        $html = $this->str_get_html($curl->response);
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

  public function agc()
  {
    return new gtrans();
  }

  public function generateIndex($regexPage, $niche)
  {
    $this->validateContent();
    $agc = $this->agc();
    _file_(ROOT . '/views/AGC/' . $this->parse_url['host'] . '.php', '');
    $agc->generateIndex($this->dom, $this->url, $regexPage, ['router' => '/AGC/' . $this->parse_url['host'], 'niche' => $niche, 'echo' => false]);
  }

  public function generateArticle()
  {
    $this->validateContent();
    getLog($this->generateHash(), function ($obj) {
      foreach ($obj as $iobj) {
        if (isset($iobj['matched'])) {
          $m = $iobj['matched'];
          /*
           * if value not sent
           */
          if (!$m['value']->sent) {
            $page = get_page_by_title($this->title, OBJECT, 'post');
            if (!$page) {
              $tag = $category = ucwords(strtolower($this->getNiche()));
              $new_post = [
                'post_title' => $this->title,
                'post_content' => $this->contentHTML,
                'tags_input' => $tag,
                'post_status' => 'publish', // Choose: publish, preview, future, draft, etc.
                'post_type' => 'post',
                'post_category' => $category,
                'meta_input' => [
                  'WMI_translate' => WMI_request('sl', 'post') . '-' . WMI_request('tl', 'post'),
                ],
              ];
            }
          }
          break;

          return;
        }
      }
    });
  }

  public function generateCookie($prefix = WP_HOST)
  {
    return $prefix . (isset($this->parse_url['host']) ? $this->parse_url['host'] : '');
  }

  /**
   * Execute Function if Cookie Not Exists.
   *
   * @param string   $cName
   * @param int      $cLive
   * @param function $callback
   */
  public function exeCookie(string $cName, int $cLive = 86400, $callback)
  {
    if (!iscookie($cName)) {
      if (is_callable($callback)) {
        call_user_func($callback, $cName);
        cook($cName, 1, $cLive);
      }
    }
  }

  public function generateTranslation()
  {
  }

  public function validateContent()
  {
    if (!$this->contentHTML) {
      throw new Exception('Content must be HTML instead of ' . gettype($this->contentHTML));
    }
    if (!$this->title) {
      throw new Exception('Title must be HTML instead of ' . gettype($this->title));
    }
    if (!$this->url) {
      throw new Exception('URL invalid instead of ' . gettype($this->url));
    } elseif (!isset($this->parse_url['host'])) {
      throw new Exception('Host undefined instead of ' . \dimas::i()->cj($this->parse_url));
    }
  }

  /**
   * Parse HTML string into DOMDocument.
   *
   * @param string $string
   *
   * @return str_get_html
   */
  public function getHTML($string)
  {
    if (!is_string($string)) {
      throw new Exception('argument must be string');
    }

    $this->dom = $this->str_get_html($string);
    //var_dump($this->dom);

    return $this->dom;
  }

  /**
   * get all anchors from dom.
   *
   * @return array
   */
  public function anchors()
  {
    $this->verifydom();
    $result = [];
    if ($this->dom->find('a')) {
      foreach ($this->dom->find('a') as $a) {
        if (!isset($a->href) || (isset($a->href) && (preg_match('/^(\s|\#|javascript\:)/m', $a->href) || empty($a->href)))) {
          continue;
        }
        $result[] = $a->href;
      }
    }

    return $result;
  }

  /**
   * Extract title from dom.
   *
   * @param function $callback
   *
   * @return mixed
   */
  public function title($callback = null)
  {
    $this->verifydom(__FUNCTION__);
    if ($this->dom->find('title')) {
      $title = $this->dom->find('title', 0)->innertext;
      if (is_callable($callback)) {
        $title = call_user_func($callback, $title);
      }
      $_SESSION['title'] = $this->title = $title;

      return $title;
    }
  }

  public function fixShare()
  {
    $share = $this->dom->find('.sharing-mobile,.share-now');
    if ($share) {
      foreach ($share as $del) {
        $del->outertext = '';
      }
    }
  }

  /**
   * find element in dom using CSS Selector.
   *
   * @param string $pseudo
   */
  public function find($pseudo)
  {
    $this->verifydom();
    if ($this->dom->find($pseudo)) {
      return $this->dom->find($pseudo);
    }
  }

  /**
   * Validate $this->dom instance of str_get_html.
   */
  public function verifydom($funcname = false)
  {
    if (!$this->dom) {
      throw new Exception(trim('variable must be instance of simplehtmldom\str_get_html instead of ' . gettype($this->dom) . ($funcname ? ' from ' . $funcname : '')));
    }
  }

  public function generateHash()
  {
    if (!$this->url) {
      throw new Exception('URL invalid');
    }

    return md5($this->url);
  }

  public function getDomainServices()
  {
    $this->getServices();
    foreach ($this->serviceList as $key => $value) {
      $domain = str_replace('_', '.', $value);
      $this->getClass('http://' . $domain);
    }
    echo '<div class="alert alert-success">' . implode('<br>', array_map(function ($key) {
      return '<a href="http://' . $key . '" target="_blank" rel="noopener noreferrer">' . $key . '</a>';
    }, array_values($this->domainList))) . '</div>';
  }
  /**
   * Fix output content
   */
  public function output($str)
  {
    $str =  preg_replace('/<!--(.*?)-->/m', '', $str);
    $html = $this->getHTML($str);
    if (!$html->find("#A-G-C")) {
      return '<div id="A-G-C">' . $str . '</div>';
    }
    return $str;
  }

  private function getServices()
  {
    $files = scandir(__DIR__ . '/');

    $services = [];

    foreach ($files as $file) {
      if (strpos($file, 'index.php') || !strpos($file, '.php') || $file == basename(__FILE__)) {
        continue;
      }

      $services[] = explode('.php', $file)[0];
    }
    $this->serviceList = $services;

    return $services;
  }
}
