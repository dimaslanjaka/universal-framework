<table class="table" itemscope itemtype="http://schema.org/Table">
  <h2 itemprop="about">Proxy information<?= isreq('q') ? ' ' . trim(isreq('q')) : false ?></h2>
  <thead>
    <tr>
      <th>IP</th>
      <th>PORT</th>
      <th>Country</th>
      <th>type</th>
      <th>Headers Leaked</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody itemscope itemtype="http://schema.org/ItemList">
    <meta itemprop="url" href="<?= FULL_URL ?>" />
    <?php
    if (!isreq('p')) {
      $file = file(__DIR__ . '/../forms/proxy.txt', FILE_SKIP_EMPTY_LINES);
      $str = grab_proxy();
      $file = array_unique(array_merge($file, parse_proxy($str)));
    } else {
      $str = isreq('p');
      $file = preg_split('/[\,\;]/', $str);
      $file = array_unique($file);
    }
    $file = array_map('trim', $file);

    //exit(var_dump($file, isreq('p')));
    shuffle($file);
    $a = new gtrans();
    $curl = $a->cURL(true);
    foreach ($file as $i => $proxy) {
      $proxy = trim($proxy);
      if (!strpos($proxy, ':')) continue;
      $ex = explode(':', $proxy);
      $ip = $ex[0];
      $port = $ex[1];
      $gate = "https://freegeoip.app/json/$ip";
      $curl = $a->fetch_contents($curl, $gate, 'proxy', ['filehour' => 467, 'fileExt' => 'json']);
      if ($curl->error) {
        continue;
      } else {
        $response = $curl->response;
        if (is_string($response)) {
          $response = json_decode($response);
        }
        $response->port = $port;
        if (empty($response->country_code)) {
          $response->country_code = 'global';
        }
        if (isset($response->country_code)) {
          $response->country_img = '/assets/img/countries/flags/' . strtolower($response->country_code) . '.png';
          if (!file_exists(ROOT . $response->country_img)) {
            $response->country_img = '/assets/img/countries/flags/global.png';
          }
        }
        $cname = country_name($response->country_code);
        if (!isset($response->checked) || isreq('retry')) {
          $response->https = false;
          $response->http = false;
          $response->socks5 = false;
          $response->socks4 = false;
          $response->checked = true;
          $curl->setOpt(CURLOPT_TIMEOUT, 60);
          $curl->setOpt(CURLOPT_PROXY, $proxy);
          $curl->setOpt(CURLOPT_PROXYTYPE, CURLPROXY_HTTP);
          $curl->setOpt(CURLOPT_HTTPHEADER, array(
            "accept: application/json",
            "content-type: application/json"
          ));
          $curl->get('https://wp.webmanajemen.com/receiver/gate.php?json');
          if (!$curl->error) {
            $response->https = true;
            $response->http = true;
            $response->gate = $curl->response;
          } else if (!isset($response->http)) {
            $curl->get('http://agcontents.000webhostapp.com/gate.php?json');
            if (!$curl->error) {
              $response->http = true;
            }
          }
          $curl->setOpt(CURLOPT_PROXYTYPE, CURLPROXY_SOCKS5);
          $curl->setOpt(CURLOPT_FAILONERROR, true);
          $curl->get('http://agcontents.000webhostapp.com/gate.php?json');
          if (!$curl->error) {
            $response->socks5 = true;
            $curl->get('https://wp.webmanajemen.com/receiver/gate.php?json');
            if (!$curl->error) {
              $response->https = true;
            }
          } else {
            $curl->setOpt(CURLOPT_PROXYTYPE, CURLPROXY_SOCKS4);
            $curl->get('http://agcontents.000webhostapp.com/gate.php?json');
            if (!$curl->error) {
              $response->socks4 = true;
              $curl->get('https://wp.webmanajemen.com/receiver/gate.php?json');
              if (!$curl->error) {
                $response->https = true;
              }
            }
          }
          if (is_object($curl->response)) {
            foreach ($curl->response as $key => $value) {
              if (preg_match('/HTTP\_\d{1,3}|^(PATH|HTTPS|HTTP_HOST|json|HTTP_X_DOCUMENT_ROOT|HTTP_X_SERVER_NAME|HTTP_X_SERVER_ADMIN|HTTP_REFERER)$|^(SERVER|UNIQUE|PHP|GATEWAY|QUERY|DOCUMENT|REQUEST|CONTEXT|SCRIPT)/m', $key)) {
                unset($curl->response->{$key});
              }
              if ($key == 'HTTP_USER_AGENT') {
                $value = $_SERVER['HTTP_USER_AGENT'];
              }
              /*
              else {
                unset($curl->response->{$key});
                if ($key == 'HTTP_USER_AGENT') {
                  $value = $_SERVER['HTTP_USER_AGENT'];
                }
                $key = str_replace(['HTTP_', 'REMOTE_'], '', $key);
                $key = str_replace('_', '-', $key);
                $key = ucwords($key);
                $curl->response->{$key} = $value;
              }
               */
            }
          }
          $response->gate = $curl->response;
          _file_($curl->filename, $response, true);
        }
        $response->type = 'HTTPS: ' . ($response->https ? 'YES' : 'NO') . ' | SOCKS: (4) ' . ($response->socks4 ? 'YES' : 'NO') . ' / (5) ' . ($response->socks5 ? 'YES' : 'NO');
        $json = isset($response->gate) ? '<pre style="max-width:200px;overflow:auto;word-wrap:break-word">' . $core->cj($response->gate) . '</pre>' : 'Because not support HTTPS, we cannot track these proxy';
        $url_proxy = get_bloginfo('url') . '/AGC/proxy/info?p=' . $proxy;
        relatedLinks([$proxy => $url_proxy]);
        $pos = $i + 1;
        echo "<tr><td>$ip</td><td>$port</td><td>
        <div itemprop=\"itemListElement\" itemscope itemtype=\"http://schema.org/WebPage\">
          <a href='$url_proxy'><img src='{$response->country_img}' itemprop='image' alt='proxy from {$cname}' width='20px' height='20px' class='mr-2' /> {$cname}</a>
          <meta itemprop='url' content='$url_proxy'>
          <meta itemprop='name' content='$proxy from $cname' />
          <meta itemprop='position' content='$pos'>
        </div>
        </td><td>{$response->type}</td><td>{$json}</td><td><form action='/AGC/proxy/info?p=$proxy' method='POST'><input type='hidden' name='retry' value='1'><button class='btn btn-info btn-sm'>Retry Check</button></form></td></tr>";
      }
      if (!isreq('p')) {
        if ($i + 1 >= (isreq('max') && ctype_digit(isreq('max')) ? (int) isreq('max') : 1)) break;
      }
    }
    ?>
  </tbody>
</table>
<?php
if (!isreq('p')) {
?>
  <form action="/AGC/proxy/info" method="post" class="form-inline">
    <input type="number" name="max" id="" value="1" placeholder="maximum result" class="form-control">
    <button type="submit" class="btn btn-primary">Filter</button>
  </form>
<?php
}
relatedLinks(['Google proxy' => WP_ORIGIN . '/AGC/proxy/index']);
?>