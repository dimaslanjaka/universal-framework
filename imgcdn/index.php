<?php

require __DIR__ . '/function.php';
header('Access-Control-Allow-Origin: *');
header('X-Robots-Tag: noindex, nofollow', true);

if (isset($_REQUEST['url'])) {
  $url = trim($_REQUEST['url']);
  if (base64_encode(base64_decode(urldecode($url))) === urldecode($url) && !isset($_REQUEST['json'])) {
    if (isset($_REQUEST['key'])) {
      $url = enc_decrypt(urldecode($url), trim(urldecode($_REQUEST['key'])));
    } else {
      $url = enc_decrypt(urldecode($url));
    }
    $decode = $url;
  } else {
    $decode = urldecode($url);
  }

  $parse = parse_url(trim($url));
  $scheme = $parse['scheme'];
  $host = md5($parse['host']);
  if ($host == $_SERVER['HTTP_HOST']) {
    createjson(['error' => 'HOST same-origin']);
  }
  $path = $parse['path'];
  $ext = (new SplFileInfo($path))->getExtension();

  $dir = __DIR__ . '/';
  if (!is_dir($dir . $scheme)) {
    md($dir . $scheme);
  }
  $dimg = $dir . $scheme . '/' . $host;
  if (!is_dir($dimg)) {
    md($dimg);
  }
  $img = $dimg . '/' . md5($decode) . '.' . $ext;
  if (!file_exists($img)) {
    $curl = cURLinit();
    $curl->setReferrer($decode);
    $curl->get($decode);
    $content = $curl->response;
    $types = $curl->responseHeaders['Content-Type'];
    $ext = preg_split('/[\/|\+]/', $types)[1];
    //exit(var_dump($ext));
    $img = $dimg . '/' . md5($decode) . '.' . $ext;

    if (false !== $content) {
      file_put_contents($img, $content);
      if (isset($_REQUEST['json'])) {
        createjson($img);
      } else {
        header('Content-type: ' . $types);
        echo $content;
      }
    } else {
      var_dump($url, $types, $proxy, $content);
    }
    exit;
  } elseif (isset($_REQUEST['json'])) {
    createjson($img);
  } elseif ($ext) {
    header("content-type: image/$ext");
    //echo file_get_contents($img);
    include $img;
  }
} else {
  header("Location: https://web-manajemen.blogspot.com");
}
