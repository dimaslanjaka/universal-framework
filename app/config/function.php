<?php
include __DIR__ . '/mysql.php';

function tanggal_indo($tanggal)
{
  $bulan = [
    1 => 'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  $split = explode('-', $tanggal);

  return $split[2] . ' ' . $bulan[(int) $split[1]] . ' ' . $split[0];
}

function filter($data)
{
  $filter = stripslashes(strip_tags(htmlspecialchars(htmlentities($data, ENT_QUOTES))));

  return $filter;
}

function acak($length)
{
  $str = '';
  $karakter = array_merge(range('A', 'Z'), range('a', 'z'), range('0', '9'));
  $max_karakter = count($karakter) - 1;
  for ($i = 0; $i < $length; ++$i) {
    $rand = mt_rand(0, $max_karakter);
    $str .= $karakter[$rand];
  }

  return $str;
}

function acak_nomor($length)
{
  $str = '';
  $karakter = array_merge(range('0', '9'));
  $max_karakter = count($karakter) - 1;
  for ($i = 0; $i < $length; ++$i) {
    $rand = mt_rand(0, $max_karakter);
    $str .= $karakter[$rand];
  }

  return $str;
}

function time_elapsed_string($datetime, $full = false)
{
  $now = new DateTime();
  $ago = new DateTime($datetime);
  $diff = $now->diff($ago);

  $diff->w = floor($diff->d / 7);
  $diff->d -= $diff->w * 7;

  $string = [
    'y' => 'Tahun',
    'm' => 'Bulan',
    'w' => 'Minggu',
    'd' => 'Hari',
    'h' => 'Jam',
    'i' => 'Menit',
    's' => 'Detik',
  ];
  foreach ($string as $k => &$v) {
    if ($diff->$k) {
      $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? '' : '');
    } else {
      unset($string[$k]);
    }
  }

  if (!$full) {
    $string = array_slice($string, 0, 1);
  }

  return $string ? implode(', ', $string) . ' Yang Lalu' : 'Baru Saja';
}
/**
 * Powerful php function to get ip address of client
 */
function get_client_ip()
{
  if (isset($_COOKIE['ip']) && !empty($_COOKIE['ip'])) {
    return trim($_COOKIE['ip']);
  }
  $ipaddress = '';
  if (isset($_SERVER['HTTP_CLIENT_IP'])) {
    $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
  } elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
  } elseif (isset($_SERVER['HTTP_X_FORWARDED'])) {
    $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
  } elseif (isset($_SERVER['HTTP_FORWARDED_FOR'])) {
    $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
  } elseif (isset($_SERVER['HTTP_FORWARDED'])) {
    $ipaddress = $_SERVER['HTTP_FORWARDED'];
  } elseif (isset($_SERVER['REMOTE_ADDR'])) {
    $ipaddress = $_SERVER['REMOTE_ADDR'];
  } else {
    if (!isset($_COOKIE['ip'])) {
      $ipaddress = 'IP tidak dikenali';
    }
  }

  return $ipaddress;
}

function validate_date($date)
{
  $d = DateTime::createFromFormat('Y-m-d', $date);

  return $d && $d->format('Y-m-d') == $date;
}

function infojson($url)
{
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
  $data = curl_exec($ch);
  curl_close($ch);

  return $data;
}

function Show($tabel, $limit)
{
  global $conn;
  $CallData = mysqli_query($conn, 'SELECT * FROM ' . $tabel . ' WHERE ' . $limit);
  $ThisData = mysqli_fetch_assoc($CallData);

  return $ThisData;
}

function followers_count($data)
{
  $id = file_get_contents('https://instagram.com/web/search/topsearch/?query=' . $data);
  $id = json_decode($id, true);
  $count = $id['users'][0]['user']['follower_count'];

  return $count;
}

function likes_count($data)
{
  $id = file_get_contents('' . $data . '?&__a=1');
  $id = json_decode($id, true);
  $count = $id['graphql']['shortcode_media']['edge_media_preview_like']['count'];

  return $count;
}

function views_count($data)
{
  $id = file_get_contents('' . $data . '?&__a=1');
  $id = json_decode($id, true);
  $count = $id['graphql']['shortcode_media']['video_view_count'];

  return $count;
}

/**
 * Easy encoding JSON object
 */
function json($object)
{
  if (is_array($object) || is_object($object)) {
    return json_encode($object, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  }
}

/**
 * PHP Code Snippet
 * Convert Number to Rupiah & vice versa
 * https://gist.github.com/845309
 *
 * Copyright 2011-2012, Faisalman
 * Licensed under The MIT License
 * http://www.opensource.org/licenses/mit-license
 */

/**
 *
 * @param integer $angka number
 * @return string
 *
 * Usage example:
 * echo convert_to_rupiah(10000000); -> "Rp. 10.000.000"
 */
function convert_to_rupiah($angka)
{
  return 'Rp. ' . strrev(implode('.', str_split(strrev(strval($angka)), 3)));
}

/**
 *
 * @param string $rupiah
 * @return integer
 *
 * Usage example:
 * echo convert_to_number("Rp. 10.000.123,00"); -> 10000123
 */
function convert_to_number($rupiah)
{
  return intval(preg_replace('/,.*|[^0-9]/', '', $rupiah));
}

/**
 * Get cookie value by name
 */
function get_cookie($name)
{
  if (isset($_COOKIE[$name])) return $_COOKIE[$name];
  return null;
}

/**
 * Check cookie by name
 */
function has_cookie($name)
{
  return get_cookie($name) !== null;
}

/**
 * Set cookie
 */
function set_cookie($name, $value, $mins = 1, $path = '/', $domain = null)
{
  if ($domain == null) {
    $domain = $_SERVER['HTTP_HOST'];
  }
  setcookie($name, $value, time() + (60 * $mins), $path, $domain);
}

function escape_mysql_string($value)
{
  $search = array("\\",  "\x00", "\n",  "\r",  "'",  '"', "\x1a");
  $replace = array("\\\\", "\\0", "\\n", "\\r", "\'", '\"', "\\Z");

  return str_replace($search, $replace, $value);
}

function escape_non_ascii($value)
{
  $return = '';
  for ($i = 0; $i < strlen($value); ++$i) {
    $char = $value[$i];
    $ord = ord($char);
    if ($char !== "'" && $char !== "\"" && $char !== '\\' && $ord >= 32 && $ord <= 126)
      $return .= $char;
    else
      $return .= '\\x' . dechex($ord);
  }
  return $return;
}
