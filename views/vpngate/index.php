<?php
//header('Content-Type: text/plain');
$tmp = __DIR__ . '/../../tmp/ovpn/';
$log = $tmp . 'log';



$list = hajar()[1];
$list = preg_replace("/#HostName,IP,Score,Ping,Speed,CountryLong,CountryShort,NumVpnSessions,Uptime,TotalUsers,TotalTraffic,LogType,Operator,Message,OpenVPN_ConfigData_Base64/", "", $list);

echo '<div class="row">';

$i = 1;
foreach ($list as $vpn) {
  $vpn = explode(",", $vpn);
  if (isset($vpn[14]) && (isset($vpn[6]))) {
    $loc = $tmp . $vpn[0] . "_" . $vpn[6] . ".ovpn";
    $conf = base64_decode($vpn[14]);
    \Filemanager\file::file($loc, $conf);
    echo '<a href="' . \MVC\helper::getOrigin() . \MVC\helper::get_url_path(realpath($loc)) . '" class="btn btn-sm text-white ovpn" style="background-color: ' . rand_color() . '">' . basename($loc) . '</a>';
    $i++;
  }
}
echo '</div>';


function rand_color()
{
  $rand = array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');
  $color = '#' . $rand[rand(0, 15)] . $rand[rand(0, 15)] . $rand[rand(0, 15)] . $rand[rand(0, 15)] . $rand[rand(0, 15)] . $rand[rand(0, 15)];

  return $color;
}

function hajar($yuerel = "http://www.vpngate.net/api/iphone/", $dataAing = null)
{
  $tmp = __DIR__ . '/../../tmp/ovpn/';
  $log = $tmp . 'log';

  $modified = null;
  if (file_exists($log)) {
    $modified = filectime($log);
    $eks = \Filemanager\file::get($log);
  }
  $expired = date("U", $modified <= time() - (60 * 30)); // 30 mins
  // if log created 30 mins ago, rewrite it
  if ($expired || isset($_REQUEST['rewrite'])) {
    $cuih = curl_init();
    curl_setopt($cuih, CURLOPT_URL, $yuerel);
    if ($dataAing !== null) {
      curl_setopt($cuih, CURLOPT_POST, true);
      curl_setopt($cuih, CURLOPT_POSTFIELDS, $dataAing);
    }
    curl_setopt($cuih, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($cuih, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($cuih, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($cuih, CURLOPT_COOKIESESSION, true);
    curl_setopt($cuih, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1");
    if ($eks = curl_exec($cuih)) {
      \Filemanager\file::file($log, $eks, true);
    }
    curl_close($cuih);
  }
  return array($eks, explode("\n", $eks));
}
