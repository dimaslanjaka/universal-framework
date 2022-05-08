<?php

use Curl\Curl;

/**
 * Is session set, return session value.
 *
 * @param string $x session name
 */
function isses($x)
{
  if (isset($_SESSION[$x]) && !empty($_SESSION[$x])) {
    return $_SESSION[$x];
  }

  return false;
}

/**
 * Create session.
 *
 * @param mixed $name  session names
 * @param mixed $value session values
 */
function sess($name, $value)
{
  return $_SESSION[$name] = $value;
}

/*
const SALT = 'salt'; //salt
const IV = '1111111111111111'; //pass salt minimum length 12 chars or it'll be show warning messages
const ITERATIONS = 999; //iterations
*/
if (isset($_SERVER['HTTP_X_SALT'])) {
  $salt = trim($_SERVER['HTTP_X_SALT']);
} else {
  $salt = 'salt';
}
if (!isses('salt')) {
  $_SESSION['salt'] = $salt;
}
if (isset($_SERVER['HTTP_X_IV'])) {
  $iv = trim($_SERVER['HTTP_X_IV']);
} else {
  $iv = '1111111111111111';
}
if (strlen($iv) < 16) {
  $digits = (16 - strlen($iv));
  $iv .= rand(pow(10, $digits - 1), pow(10, $digits) - 1);
}
if (!isses('iv')) {
  $_SESSION['iv'] = $iv;
}

define('SALT', $salt);
define('IV', $iv);
define('ITERATIONS', 999);

function CryptoSALT()
{
  return isses('csrf-salt') ? isses('csrf-salt') : SALT;
}

function CryptoIV()
{
  $iv = isses('csrf-iv') ? isses('csrf-iv') : IV;
  if (strlen($iv) < 16) {
    $digits = (16 - strlen($iv));
    $iv .= rand(pow(10, $digits - 1), pow(10, $digits) - 1);
    $_SESSION['csrf-iv'] = $iv;
  }

  return $iv;
}

function CryptoKey()
{
  return isses('csrf-key') ? isses('csrf-key') : null;
}

/**
 * CryptoJS PHP Encrypt.
 *
 * @param string $passphrase password
 * @param string $plainText  string to be encrypted
 *
 * @return string
 */
function CryptoE($passphrase, $plainText)
{
  $key = \hash_pbkdf2('sha256', $passphrase, CryptoSALT(), ITERATIONS, 64);
  $encryptedData = \openssl_encrypt($plainText, 'AES-256-CBC', \hex2bin($key), OPENSSL_RAW_DATA, CryptoIV());

  return \base64_encode($encryptedData);
}

/**
 * CryptoJS PHP Decrypt.
 *
 * @param string $passphrase          password
 * @param string $encryptedTextBase64 hash to be decrypted
 *
 * @return string
 */
function CryptoD($passphrase, $encryptedTextBase64)
{
  $encryptedText = \base64_decode($encryptedTextBase64);
  $key = \hash_pbkdf2('sha256', $passphrase, CryptoSALT(), ITERATIONS, 64);
  $decryptedText = \openssl_decrypt($encryptedText, 'AES-256-CBC', \hex2bin($key), OPENSSL_RAW_DATA, CryptoIV());

  return $decryptedText;
}

add_action('init', 'CSRF');
function CSRF()
{
  if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
    if (isset($_SERVER['HTTP_X_SET'])) {
      header('x-requested-with: ' . CryptoD($_SERVER['HTTP_X_SET'], $_SERVER['HTTP_X_REQUESTED_WITH']));
      $_SESSION['csrf'] = $_SERVER['HTTP_X_SET'];
      $_SESSION['csrf-expire'] = getDatetimeNow();
      if (isset($_SERVER['HTTP_X_SALT']) && isset($_SERVER['HTTP_X_IV'])) {
        /*
         * Determine CSRF frontend
         */
        if (!isses('csrf-key')) {
          $_SESSION['csrf-key'] = $_SERVER['HTTP_X_SALT'] . $_SERVER['HTTP_X_IV'];
        }
        if (!isses('csrf-salt')) {
          $_SESSION['csrf-salt'] = $_SERVER['HTTP_X_SALT'];
        }
        if (!isses('csrf-iv')) {
          $_SESSION['csrf-iv'] = $_SERVER['HTTP_X_IV'];
        }
        header('x-csrf: ' . CryptoE($_SESSION['csrf-key'], $_SERVER['HTTP_X_SET']));
      }
      if (isses('csrf-key') && isses('csrf-iv') && isses('csrf-expire') && isses('csrf-salt') && isses('csrf')) {
        sess('csrf-set', true);
      } else {
        sess('csrf-set', false);
      }
    }
  }
}
/*
if (!isLocalhost() && !iscookie('updateSite')) {
  define('WP_HOME', 'http://' . $_SERVER['HTTP_HOST']);
  define('WP_SITEURL', 'http://' . $_SERVER['HTTP_HOST']);
  cook('updateSite', 1, 18970);
}
*/
/**
 * create safelink.
 */
function safelink($url)
{
  return 'https://dimaslanjaka.github.io/page/safelink.html?url=' . base64_encode($url);
}
/**
 * Get current date format Y-m-d H:i:s.
 *
 * @param string $timeZone Default Asia/Jakarta
 */
function getDatetimeNow($timeZone = 'Asia/Jakarta', $format = 'Y\-m\-d\ H:i:s')
{
  $tz_object = new DateTimeZone($timeZone);
  //date_default_timezone_set('Brazil/East');

  $datetime = new DateTime();
  $datetime->setTimezone($tz_object);
  if ('timestamp' == $format) {
    return $datetime->getTimestamp();
  }

  return $datetime->format($format);
}
/**
 * Create html comments.
 *
 * @param array $str
 */
function htmlcom(...$str)
{
  return '<!--' . implode("\n", $str) . '-->';
}
/*
* create image CDN from URL
*/
function imgCDN($imgDom)
{
  $dom = false;
  if (is_object($imgDom) && isset($imgDom->src)) {
    $dom = $imgDom->src;
  } elseif (isURL($imgDom)) {
    $dom = $imgDom;
  } elseif ('boolean' == gettype($dom)) {
    return $imgDom;
  }
  if (!$dom) {
    throw new Exception("Source image must URL: {$dom} instead of type " . gettype($dom));
  }
  $log_img = _file_($_SERVER['DOCUMENT_ROOT'] . '/assets/img/cdn.json', []);
  if (!file_exists($log_img)) {
    file_put_contents($log_img, '');
  }
  $log = json_decode(file_get_contents($log_img));
  if (isset($log->{$dom})) {
    return $log->{$dom};
  }
  $img_a = new AGCURL();
  $img_b = $img_a->imgcdn($dom);
  //precom($img_b);
  if (isset($img_b->url)) {
    $log->{$dom} = $img_b->url;
    file_put_contents($log_img, json_encode($log, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

    return $img_b->url;
  } else {
    $items = array_unique(['haaretz-trial', 'simpleview', 'thefader', 'reverb', 'ssp', 'dimaslanjaka', 'mapmyfitness', 'wego', 'practicaldev', 'purity', 'twelve-stone-church', 'hy4kyit2a', 'indiegogo-media-prod-cld', 'christekh', 'devex', 'teamtailor-development', 'tamas-demo', 'caplan', 'bayuajie-com', 'test123', 'acloud-guru', 'drbgxq5pt', 'ctv', 'kanaxx']);
    $log->{$dom} = 'https://res.cloudinary.com/' . $items[array_rand($items)] . '/image/fetch/' . $dom;
    file_put_contents($log_img, json_encode($log, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

    return $log->{$dom};
  }
}

/**
 * Replace space with separate commas.
 *
 * @param string $string
 */
function replacecomma($string)
{
  $string = preg_replace('#\s+#', ', ', trim($string));

  return $string;
}
/**
 * Remove special characters.
 */
function removespecial($string, $replacement = '')
{
  $string = preg_replace('/[0-9]+/', $replacement, $string); //number
  $string = str_replace(['Rp '], $replacement, $string);
  $string = preg_replace("/[^ \w]+/", $replacement, $string); //special
  return $string;
}

/**
 * Image dom from html string.
 *
 * @param string $str
 *
 * @return string
 */
function imgDOM($str)
{
  $html = str_get_html('<div id="aGC">' . $str . '</div>');
  foreach ($html->find('img') as $imgDom) {
    $source = false;
    if ($imgDom->hasAttribute('srcset')) {
      //$imgDom->removeAttribute('srcset');
      $regex_url = '#\bhttps?://[^,\s()<>]+(?:\([\w\d]+\)|([^,[:punct:]\s]|/))#';
      if (preg_match_all($regex_url, $imgDom->srcset, $match)) {
        for ($i = 0; $i < count($match[0]); ++$i) {
          //$match[0][$i] = imgCDN($match[0][$i]);
          $source = end($match[0]);
          $imgDom->srcset = str_replace(trim($match[0][$i]), imgCDN(trim($match[0][$i])), $imgDom->srcset);
        }
      }
    }
    if ($imgDom->hasAttribute('src')) {
      $srcp = parse_url($imgDom->src);
      $src = imgCDN($imgDom->src);
      $srcx = parse_url($src);
      $imgDom->src = $src;
      if ($source) {
        if (false !== strpos($src, 'cloudinary.com') || $srcx['host'] == $srcp['host']) {
          $imgDom->src = imgCDN($source);
        }
      }
    }
    if ($imgDom->hasAttribute('sizes')) {
      $imgDom->removeAttribute('sizes');
    }
    if ($imgDom->hasAttribute('aria-describedby')) {
      $imgDom->removeAttribute('aria-describedby');
    }
    $imgDom->width = '100%';
    $imgDom->height = 'auto';
    $imgDom->setAttribute('max-width', '100%');
    if (!isset($imgDom->title)) {
      $imgDom->title = $_SESSION['title'];
    }
  }
  //exit($html->find('#aGC', 0)->innertext);
  return $html->find('#aGC', 0)->innertext;
}

function get_web_page($url, $proxy = null, $ref = null, $post = null, $header = [])
{
  $user_agent = 'Mozilla/5.0 (Windows NT 6.1; rv:8.0) Gecko/20100101 Firefox/8.0';

  $options = [
    CURLOPT_CUSTOMREQUEST => 'GET',        //set request type post or get
    CURLOPT_POST => !empty($post),        //set to GET
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
    CURLOPT_HTTPHEADER => $header,
  ];
  if ($proxy) {
    $options[CURLOPT_PROXY] = $proxy;
  }
  if ($ref) {
    $options[CURLOPT_REFERER] = $ref;
  }
  if ($post) {
    $options[CURLOPT_POSTFIELDS] = http_build_query($post);
  }

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

function api_($url, $ref, $post = false)
{
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_REFERER, $ref);
  curl_setopt($ch, CURLOPT_USERAGENT, (isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'));
  if ($post) {
    curl_setopt($ch, CURLOPT_POST, (isset($post) && (is_array($post) || is_object($post))));
    curl_setopt(
      $ch,
      CURLOPT_POSTFIELDS,
      http_build_query($post)
    );
  }

  $x = curl_exec($ch);
  curl_close($ch);

  return json_decode($x);
}

function isJsDump()
{
  return isset($_REQUEST['jsdump']);
}

function time_elapsed($time, $lastxt = null)
{
  $time = time() - (!is_numeric($time) ? strtotime($time) : $time);
  $time = ($time < 1) ? 1 : $time;
  $tokens = [
    31536000 => 'year',
    2592000 => 'month',
    604800 => 'week',
    86400 => 'day',
    3600 => 'hour',
    60 => 'minute',
    1 => 'second',
  ];

  foreach ($tokens as $unit => $text) {
    if ($time < $unit) {
      continue;
    }
    $numberOfUnits = floor($time / $unit);

    return $numberOfUnits . ' ' . $text . (($numberOfUnits > 1) ? 's' : '') . ($lastxt ? ' ' . $lastxt : false);
  }
}

function calcAge($birthDate)
{
  //explode the date to get month, day and year
  $birthDate = explode('/', date('m/d/Y', strtotime($birthDate)));
  //get age from date or birthdate
  $age = (date('md', date('U', mktime(0, 0, 0, $birthDate[0], $birthDate[1], $birthDate[2]))) > date('md')
    ? ((date('Y') - $birthDate[2]) - 1)
    : (date('Y') - $birthDate[2]));

  return $age;
}
function minimizeCSSsimple($css)
{
  $css = preg_replace('/\/\*((?!\*\/).)*\*\//', '', $css); // negative look ahead
  $css = preg_replace('/\s{2,}/', ' ', $css);
  $css = preg_replace('/\s*([:;{}])\s*/', '$1', $css);
  $css = preg_replace('/;}/', '}', $css);

  return $css;
}
function attr_login_disabled()
{
  return is_user_logged_in() ? true : 'disabled';
}
$countries = [
  'AF' => 'Afghanistan',
  'AX' => 'Aland Islands',
  'AL' => 'Albania',
  'DZ' => 'Algeria',
  'AS' => 'American Samoa',
  'AD' => 'Andorra',
  'AO' => 'Angola',
  'AI' => 'Anguilla',
  'AQ' => 'Antarctica',
  'AG' => 'Antigua And Barbuda',
  'AR' => 'Argentina',
  'AM' => 'Armenia',
  'AW' => 'Aruba',
  'AU' => 'Australia',
  'AT' => 'Austria',
  'AZ' => 'Azerbaijan',
  'BS' => 'Bahamas',
  'BH' => 'Bahrain',
  'BD' => 'Bangladesh',
  'BB' => 'Barbados',
  'BY' => 'Belarus',
  'BE' => 'Belgium',
  'BZ' => 'Belize',
  'BJ' => 'Benin',
  'BM' => 'Bermuda',
  'BT' => 'Bhutan',
  'BO' => 'Bolivia',
  'BA' => 'Bosnia And Herzegovina',
  'BW' => 'Botswana',
  'BV' => 'Bouvet Island',
  'BR' => 'Brazil',
  'IO' => 'British Indian Ocean Territory',
  'BN' => 'Brunei Darussalam',
  'BG' => 'Bulgaria',
  'BF' => 'Burkina Faso',
  'BI' => 'Burundi',
  'KH' => 'Cambodia',
  'CM' => 'Cameroon',
  'CA' => 'Canada',
  'CV' => 'Cape Verde',
  'KY' => 'Cayman Islands',
  'CF' => 'Central African Republic',
  'TD' => 'Chad',
  'CL' => 'Chile',
  'CN' => 'China',
  'CX' => 'Christmas Island',
  'CC' => 'Cocos (Keeling) Islands',
  'CO' => 'Colombia',
  'KM' => 'Comoros',
  'CG' => 'Congo',
  'CD' => 'Congo, Democratic Republic',
  'CK' => 'Cook Islands',
  'CR' => 'Costa Rica',
  'CI' => 'Cote D\'Ivoire',
  'HR' => 'Croatia',
  'CU' => 'Cuba',
  'CY' => 'Cyprus',
  'CZ' => 'Czech Republic',
  'DK' => 'Denmark',
  'DJ' => 'Djibouti',
  'DM' => 'Dominica',
  'DO' => 'Dominican Republic',
  'EC' => 'Ecuador',
  'EG' => 'Egypt',
  'SV' => 'El Salvador',
  'GQ' => 'Equatorial Guinea',
  'ER' => 'Eritrea',
  'EE' => 'Estonia',
  'ET' => 'Ethiopia',
  'FK' => 'Falkland Islands (Malvinas)',
  'FO' => 'Faroe Islands',
  'FJ' => 'Fiji',
  'FI' => 'Finland',
  'FR' => 'France',
  'GF' => 'French Guiana',
  'PF' => 'French Polynesia',
  'TF' => 'French Southern Territories',
  'GA' => 'Gabon',
  'GM' => 'Gambia',
  'GE' => 'Georgia',
  'DE' => 'Germany',
  'GH' => 'Ghana',
  'GI' => 'Gibraltar',
  'GR' => 'Greece',
  'GL' => 'Greenland',
  'GD' => 'Grenada',
  'GP' => 'Guadeloupe',
  'GU' => 'Guam',
  'GT' => 'Guatemala',
  'GG' => 'Guernsey',
  'GN' => 'Guinea',
  'GW' => 'Guinea-Bissau',
  'GY' => 'Guyana',
  'HT' => 'Haiti',
  'HM' => 'Heard Island & Mcdonald Islands',
  'VA' => 'Holy See (Vatican City State)',
  'HN' => 'Honduras',
  'HK' => 'Hong Kong',
  'HU' => 'Hungary',
  'IS' => 'Iceland',
  'IN' => 'India',
  'ID' => 'Indonesia',
  'IR' => 'Iran, Islamic Republic Of',
  'IQ' => 'Iraq',
  'IE' => 'Ireland',
  'IM' => 'Isle Of Man',
  'IL' => 'Israel',
  'IT' => 'Italy',
  'JM' => 'Jamaica',
  'JP' => 'Japan',
  'JE' => 'Jersey',
  'JO' => 'Jordan',
  'KZ' => 'Kazakhstan',
  'KE' => 'Kenya',
  'KI' => 'Kiribati',
  'KR' => 'Korea',
  'KW' => 'Kuwait',
  'KG' => 'Kyrgyzstan',
  'LA' => 'Lao People\'s Democratic Republic',
  'LV' => 'Latvia',
  'LB' => 'Lebanon',
  'LS' => 'Lesotho',
  'LR' => 'Liberia',
  'LY' => 'Libyan Arab Jamahiriya',
  'LI' => 'Liechtenstein',
  'LT' => 'Lithuania',
  'LU' => 'Luxembourg',
  'MO' => 'Macao',
  'MK' => 'Macedonia',
  'MG' => 'Madagascar',
  'MW' => 'Malawi',
  'MY' => 'Malaysia',
  'MV' => 'Maldives',
  'ML' => 'Mali',
  'MT' => 'Malta',
  'MH' => 'Marshall Islands',
  'MQ' => 'Martinique',
  'MR' => 'Mauritania',
  'MU' => 'Mauritius',
  'YT' => 'Mayotte',
  'MX' => 'Mexico',
  'FM' => 'Micronesia, Federated States Of',
  'MD' => 'Moldova',
  'MC' => 'Monaco',
  'MN' => 'Mongolia',
  'ME' => 'Montenegro',
  'MS' => 'Montserrat',
  'MA' => 'Morocco',
  'MZ' => 'Mozambique',
  'MM' => 'Myanmar',
  'NA' => 'Namibia',
  'NR' => 'Nauru',
  'NP' => 'Nepal',
  'NL' => 'Netherlands',
  'AN' => 'Netherlands Antilles',
  'NC' => 'New Caledonia',
  'NZ' => 'New Zealand',
  'NI' => 'Nicaragua',
  'NE' => 'Niger',
  'NG' => 'Nigeria',
  'NU' => 'Niue',
  'NF' => 'Norfolk Island',
  'MP' => 'Northern Mariana Islands',
  'NO' => 'Norway',
  'OM' => 'Oman',
  'PK' => 'Pakistan',
  'PW' => 'Palau',
  'PS' => 'Palestinian Territory, Occupied',
  'PA' => 'Panama',
  'PG' => 'Papua New Guinea',
  'PY' => 'Paraguay',
  'PE' => 'Peru',
  'PH' => 'Philippines',
  'PN' => 'Pitcairn',
  'PL' => 'Poland',
  'PT' => 'Portugal',
  'PR' => 'Puerto Rico',
  'QA' => 'Qatar',
  'RE' => 'Reunion',
  'RO' => 'Romania',
  'RU' => 'Russian Federation',
  'RW' => 'Rwanda',
  'BL' => 'Saint Barthelemy',
  'SH' => 'Saint Helena',
  'KN' => 'Saint Kitts And Nevis',
  'LC' => 'Saint Lucia',
  'MF' => 'Saint Martin',
  'PM' => 'Saint Pierre And Miquelon',
  'VC' => 'Saint Vincent And Grenadines',
  'WS' => 'Samoa',
  'SM' => 'San Marino',
  'ST' => 'Sao Tome And Principe',
  'SA' => 'Saudi Arabia',
  'SN' => 'Senegal',
  'RS' => 'Serbia',
  'SC' => 'Seychelles',
  'SL' => 'Sierra Leone',
  'SG' => 'Singapore',
  'SK' => 'Slovakia',
  'SI' => 'Slovenia',
  'SB' => 'Solomon Islands',
  'SO' => 'Somalia',
  'ZA' => 'South Africa',
  'GS' => 'South Georgia And Sandwich Isl.',
  'ES' => 'Spain',
  'LK' => 'Sri Lanka',
  'SD' => 'Sudan',
  'SR' => 'Suriname',
  'SJ' => 'Svalbard And Jan Mayen',
  'SZ' => 'Swaziland',
  'SE' => 'Sweden',
  'CH' => 'Switzerland',
  'SY' => 'Syrian Arab Republic',
  'TW' => 'Taiwan',
  'TJ' => 'Tajikistan',
  'TZ' => 'Tanzania',
  'TH' => 'Thailand',
  'TL' => 'Timor-Leste',
  'TG' => 'Togo',
  'TK' => 'Tokelau',
  'TO' => 'Tonga',
  'TT' => 'Trinidad And Tobago',
  'TN' => 'Tunisia',
  'TR' => 'Turkey',
  'TM' => 'Turkmenistan',
  'TC' => 'Turks And Caicos Islands',
  'TV' => 'Tuvalu',
  'UG' => 'Uganda',
  'UA' => 'Ukraine',
  'AE' => 'United Arab Emirates',
  'GB' => 'United Kingdom',
  'US' => 'United States',
  'UM' => 'United States Outlying Islands',
  'UY' => 'Uruguay',
  'UZ' => 'Uzbekistan',
  'VU' => 'Vanuatu',
  'VE' => 'Venezuela',
  'VN' => 'Viet Nam',
  'VG' => 'Virgin Islands, British',
  'VI' => 'Virgin Islands, U.S.',
  'WF' => 'Wallis And Futuna',
  'EH' => 'Western Sahara',
  'YE' => 'Yemen',
  'ZM' => 'Zambia',
  'ZW' => 'Zimbabwe',
];
define('COUNTRIES', serialize($countries));
/**
 * Get country name from country code.
 *
 * @param string $m
 *
 * @return string
 */
function country_name($m)
{
  $m = strtoupper($m);
  $c = unserialize(COUNTRIES);

  return isset($c[$m]) ? $c[$m] : 'Global';
}
function country_code($match)
{
  $countries = unserialize(COUNTRIES);

  return isset($countries[$match]) ? $match : 'ID';
}
/**
 * List of country names and codes.
 */
function list_country()
{
  return unserialize(COUNTRIES);
}

function list_languages()
{
  $f = _PPATH_ . 'assets/languages.json';
  $j = json_decode(file_get_contents($f));

  return $j;
}
/**
 * Google analystics script.
 *
 * @param mixed $notag
 *                     * true: javascript without html tags
 *                     * url: return google tag manager script source
 *                     * id: return google analystic id
 */
function ganalystic($notag = false)
{
  $gid = (get_option('yt-analystic') ? get_option('yt-analystic') : 'UA-106238155-1');
  if ($gid) {
    if (headers_sent()) {
      $isrc = "https://www.googletagmanager.com/gtag/js?id=$gid";
      $is = "
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      var gconf = {
        'link_attribution': {
          'cookie_name': '_links',
          'cookie_expires': 60,
          'levels': 3
        },
        'linker': {
          'domains': [location.host],
          'accept_incoming': true
        },
        'cookie_prefix': 'GA_'+location.host,
        'cookie_domain': location.host,
        'cookie_expires': 28 * 24 * 60 * 60, /*28 days in seconds*/
        'cookie_update': true,
        'user_id': (typeof USER_ID == 'string' ? USER_ID.trim() : navigator.userAgent),
        'page_title' : document.getElementsByTagName('title')[0].innerHTML,
        'page_path': location.pathname,
        'page_query': location.search,
        'page_domain': location.host,
        'page_hash': location.hash,
        'page_location': document.URL
      }
      if (typeof navigator.sendBeacon == 'function'){
        gconf.transport_type = 'beacon';
      }
      //console.log({'google_analystic_config': gconf});
      gtag('config', '$gid', gconf);
      if (typeof TIMER_START != 'undefined'){
        gtag('event', 'timing_complete', {
          'name' : 'load',
          'value' : Date.now()-TIMER_START,
          'event_category' : 'JS Dependencies'
        });
      } else {
        // Feature detects Navigation Timing API support.
        if (window.performance) {
          // Gets the number of milliseconds since page load
          // (and rounds the result since the value must be an integer).
          var timeSincePageLoad = Math.round(performance.now());

          // Sends the timing event to Google Analytics.
          gtag('event', 'timing_complete', {
            'name': 'load',
            'value': timeSincePageLoad,
            'event_category': 'JS Dependencies'
          });
        }
      }
      ";
      if (true === $notag) {
        echo $is;
      } elseif (!$notag) {
        echo "<script async src=\"$isrc\"></script><script>$is</script>";
      } elseif ('url' == $notag) {
        return $isrc;
      } elseif ('id' == $notag) {
        return $gid;
      }
    }
  }
}

if (function_exists('add_shortcode')) {
  add_shortcode('analystic', 'ganalystic');
}
/**
 * Load 404 template.html.
 */
function template404($title, $content)
{
  $html = new simple_html_dom();
  $html->load_file(ROOT . '/template.html');

  $html->find('title', 0)->innertext = get_bloginfo('name') . ' | ' . $title;
  $html->find('#ContentPage', 0)->innertext = $content;
  echo $html->save();
  exit;
}
/**
 * Validate recaptcha.
 */
function reCaptcha()
{
  $validate = verify_recaptchav3();
  if (is_wp_error($validate)) {
    if (!headers_sent()) {
      http_response_code(404);
    }
    $error_string = $validate->get_error_message();
    $error = '<div id="message" class="error"><p>' . $error_string . '</p></div>';
    template404('Recaptcha Error', $error);
    exit;
  }
}
/**
 * Redirect with delay.
 *
 * @param string $url
 * @param int    $secs
 */
function redirect_delay($url, $secs = 5)
{
  return header("Refresh:$secs; url=$url", true, 303);
}

/**
 * Setup google client default.
 *
 * @return wpgoogle
 */
function google_client()
{
  $google = new wpgoogle();
  $google->Google_Client(['scope' => 'default', 'redirect' => get_home_url() . '/AGC/callback']);
  $google->client = $google->Google_Client(['scope' => 'blogger', 'redirect' => get_home_url() . '/AGC/callback']);
  $google->setTokenFile();
  $google->google_process_token();

  return $google;
}
/**
 * Setup blogger client.
 */
function blogger_client()
{
  $google = new wpgoogle();
  $google->client = $google->Google_Client(['scope' => 'blogger', 'redirect' => get_home_url() . '/AGC/blogger/callback']);
  $google->reset = true;
  $google->setTokenFile('blogger/');
  $google->google_process_token();

  return $google;
}

/**
 * validate url.
 */
function isURL($url)
{
  if (!$url || !is_string($url)) {
    return false;
  }
  if (preg_match('/^https?\%3A\%2F\%2F/m', $url)) {
    $url = urldecode($url);
  }

  return filter_var($url, FILTER_VALIDATE_URL);
}

/**
 * Build Stylesheet themes.
 */
function stylesheet($style, $echo = true, $js = false)
{
  $r = '';
  $core = new dimas();
  if (isset($style) && !empty($style)) {
    if (!is_array($style)) {
      if (file_exists($style)) {
        $r .= '<link rel="stylesheet" href="' . $core->path_to_url($style) . '">';
        unset($style);
      } elseif (isCSS($style)) {
        $r .= '<link rel="stylesheet" href="' . $style . '">';
      } else {
        echo 'not exists';
      }
    } else {
      $style = array_filter($style);
      $i = 0;
      foreach ($style as $css) {
        if (file_exists($css)) {
          unset($style[$i]);
          $r .= '<link rel="stylesheet" href="' . $core->path_to_url($css) . '">';
        } elseif (isCSS($css)) {
          unset($style[$i]);
          $r .= '<link rel="stylesheet" href="' . $css . '">';
        } else {
          echo "\n$css not exists\n";
        }
        ++$i;
      }
    }
  }
  if ($echo) {
    echo $r;
  }

  return $r;
}
/**
 * Stylesheet asynchronous load builder.
 *
 * @param mixed $u
 *
 * @return string
 */
function stylesheetjs(...$u)
{
  $core = new dimas();
  $r = [];
  foreach ($u as $x) {
    if (!isURL($x)) {
      $x = $core->path_to_url($x);
    }
    $r[] = "loadCSS('$x');";
  }

  return join(' ', $r);
}

/**
 * Check if valid css.
 */
function isCSS($css)
{
  return filter_var($css, FILTER_VALIDATE_URL) && preg_match('/^https?\:\/\/fonts\.googleapis\.com|\.css$/m', $css);
}

/**
 * Javascript Caller.
 */
function javascript($script)
{
  if (isset($script) && !empty($script)) {
    if (!is_array($script)) {
      if (file_exists($script)) {
        echo "\n";
        include $script;
        echo "\n";
      } elseif (isJS($script)) {
        downloadJS($script);
      }
    } else {
      $i = 0;
      $jsarr = array_filter($script);
      foreach ($jsarr as $js) {
        if (file_exists($js)) {
          echo "\n";
          include $js;
          echo "\n";
          unset($jsarr[$i]);
        }
      }
      if (!empty($jsarr)) {
        downloadJS($jsarr);
      }
      ++$i;
    }
  }
}

/**
 * Download JS to local.
 */
function downloadJS($js)
{
  $root = $_SERVER['DOCUMENT_ROOT'] . '/tmp/';
  $arr = [];
  if (is_string($js)) {
    if (isJS($js)) {
      $arr[] = $js;
    }
  } else {
    foreach ($js as $x) {
      if (isJS($x)) {
        $arr[] = $x;
      }
    }
  }
  if (!empty($arr)) {
    foreach ($arr as $jsk) {
      $jsname = basename($jsk);
      $jspath = $root . $jsname;
      if (!file_exists($jspath) || (file_exists($jspath) && empty(file_get_contents($jspath)))) {
        $c = new gtrans();
        $cc = $c->cURL();
        $cc->get($jsk);
        if (!$cc->error) {
          _file_($jspath, $cc->response, true);
          echo "\n";
          include $jspath;
          echo "\n";
        }
      } else {
        echo "\n";
        include $jspath;
        echo "\n";
      }
    }
  }
}
/**
 * Asynchronous Javascript Builder.
 */
function asyncJS($script)
{
  $js = 'function downloadJSAtOnload() {';
  if (is_string($script) && isJS($script)) {
    $js .= '
      var element2 = document.createElement("script");
      element2.src = "' . $script . '";
      document.body.appendChild(element2);';
  } elseif (is_array($script)) {
    $i = 0;
    foreach ($script as $jsn) {
      if (isJS($jsn)) {
        $js .= '
      var element' . $i . ' = document.createElement("script");
      element' . $i . '.src = "' . $jsn . '";
      document.body.appendChild(element' . $i . ');';
      }
      ++$i;
    }
  }
  $js .= '
}
if (window.addEventListener) {
  window.addEventListener("load", downloadJSAtOnload, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", downloadJSAtOnload);
} else {
  window.onload = downloadJSAtOnload;
}';
  echo $js;
}
/**
 * Validate Javascript Source.
 */
function isJS($js)
{
  return filter_var($js, FILTER_VALIDATE_URL) && preg_match('/^https?\:\/\/(cdn\.jsdelivr\.net|(cdn\.)?rawgit\.com)|\.js$/m', $js);
}

/**
 * check if windows server (OS).
 */
function isWIN()
{
  return 'WIN' === strtoupper(substr(PHP_OS, 0, 3));
}

/*
 * given a string - it will simply add / strip slashes
 * given an array - it will recursively add / strip slashes from the array and all of it subarrays.
 * if the value is not a string or array - it will remain unmodified!
 */
if (!function_exists('add_slashes_recursive')) {
  function add_slashes_recursive($variable)
  {
    if (is_string($variable)) {
      return addslashes($variable);
    } elseif (is_array($variable)) {
      foreach ($variable as $i => $value) {
        $variable[$i] = add_slashes_recursive($value);
      }
    }

    return $variable;
  }
}

/**
 * given a string - it will simply add / strip slashes
 * given an array - it will recursively add / strip slashes from the array and all of it subarrays.
 * if the value is not a string or array - it will remain unmodified!
 */
function strip_slashes_recursive($variable)
{
  if (is_string($variable)) {
    return stripslashes($variable);
  }
  if (is_array($variable)) {
    foreach ($variable as $i => $value) {
      $variable[$i] = strip_slashes_recursive($value);
    }
  }

  return $variable;
}

function create_folder_recursive($dirname, $root)
{
  if (strpos($dirname, '/')) {
    $exploder = explode('/', $dirname);
    foreach ($exploder as $d) {
      _folder_($root . '/' . $d);
    }
  }
}

function parseTags($str)
{
  $str = preg_replace('/[^a-zA-Z0-9\']/m', ' ', strtolower(html_entity_decode($str)));
  $str = preg_replace('/[0-9]/m', '', $str);
  $n = preg_split("/\s/m", preg_replace('/\s+/m', ' ', $str));
  $return = [];
  $key = ['for', 'is', 'at', 'xd', 'days', 'me', 'subtitle', 'full', 'this', 'that', 'and', 'if', 'else', 'count', 'hello', 'ends', 'days', 'end', 'my', 'way', 'object', 'array', 'filter', 'merge', 'tag', 'category', 'tags', 'categories', 'fight'];
  for ($i = 0; $i < count($n); ++$i) {
    if (in_array($n[$i], $key)) {
      unset($n[$i]);
    } else {
      $return[] = $n[$i];
    }
  }

  return $return;
}

function isLocalhost()
{
  return preg_match('/^(localhost|agc\.io|127\.0\.0\.1)/m', $_SERVER['HTTP_HOST']);
}

function onlyLocalhost()
{
  if (!isLocalhost()) {
    exit;
  }
}
/**
 * delete file is exist.
 *
 * @param string $path filepath
 */
function delfile($path)
{
  if (file_exists($path)) {
    @unlink($path);
  }
}
/**
 * Exit var_dump.
 */
function ev(...$str)
{
  echo '<pre>';
  var_dump($str);
  exit('</pre>');
}
/**
 * Detect if user is bot.
 */
function isBot()
{
  return isset($_SERVER['HTTP_USER_AGENT'])
    && preg_match('/bot|crawl|slurp|spider|mediapartners/i', $_SERVER['HTTP_USER_AGENT']);
}

/**
 * if user logged in and is administrator.
 *
 * @return bool
 */
function isAdmin()
{
  return is_user_logged_in() && current_user_can('administrator');
}

/**
 * Cors domain verify and detect AJAX.
 *
 * @todo only allow CORS request
 */
function cors($print_server = false)
{
  //header('Content-type: application/json; charset=utf-8');
  header('Access-Control-Allow-Origin: *'); //allow all AJAX REQUEST

  if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
    if ('xmlhttprequest' != strtolower($_SERVER['HTTP_X_REQUESTED_WITH'])) {
      return __LINE__ . false;
    } else {
      if (isset($_SERVER['HTTP_SEC_FETCH_SITE']) && isset($_SERVER['HTTP_SEC_FETCH_MODE']) && isset($_SERVER['HTTP_REFERER']) && isset($_SERVER['HTTP_ORIGIN']) && isset($_SERVER['HTTP_USER_AGENT'])) {
        $parseRef = parse_url($_SERVER['HTTP_REFERER']);
        $parseOri = parse_url($_SERVER['HTTP_ORIGIN']);
        if (!isset($parseOri['host']) || !isset($parseRef['host'])) {
          return __LINE__ . false;
        }
        if ($parseOri['host'] != $parseRef['host']) {
          return __LINE__ . false;
        }
        if ('same-origin' == $_SERVER['HTTP_SEC_FETCH_SITE'] && 'cors' == $_SERVER['HTTP_SEC_FETCH_MODE']) {
          return $parseOri['host'] == $parseRef['host'];
        } else {
          if ($print_server) {
            $_SERVER['PHP_LINE'] = __LINE__;

            return $_SERVER;
          } else {
            return false;
          }
        }
      }
    }
  }
  if (isset($_SERVER['HTTP_ORIGIN'])) {
    header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
    header('Access-Control-Expose-Headers: date,content-type,transfer-encoding,connection,access-control-allow-origin,server,x-xss-protection,x-content-type-options,x-request-id,content-encoding,x-final-url');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
    if (isset($_SERVER['HTTP_REFERER'])) {
      $parseRef = parse_url($_SERVER['HTTP_REFERER']);
      $parseOri = parse_url($_SERVER['HTTP_ORIGIN']);
      if (!isset($parseOri['host']) || !isset($parseRef['host'])) {
        return __LINE__ . false;
      }
      if ($parseOri['host'] != $parseRef['host']) {
        return __LINE__ . false;
      }
    } else {
      return __LINE__ . false;
    }
  }
  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
    // may also be using PUT, PATCH, HEAD etc
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
  }

  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
    header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
  } else {
    header('Access-Control-Allow-Headers: X-Requested-With');
  }

  $final = isset($_SERVER['HTTP_ACCEPT']) && isset($_SERVER['HTTP_ORIGIN']) && isset($_SERVER['HTTP_REFERER']) && isset($_SERVER['HTTP_ACCEPT_ENCODING']) && isset($_SERVER['CONTENT_TYPE']) && isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) && isset($_SERVER['HTTP_USER_AGENT']) && isset($_SERVER['UNIQUE_ID']);
  if (!$final && $print_server) {
    $_SERVER['PHP_LINE'] = __LINE__;

    return $_SERVER;
  }
  if ($final) {
    return true;
  }

  return false;
}

/**
 * Grab proxies.
 *
 * @return string
 */
function grab_proxy()
{
  $web = ['http://www.httptunnel.ge/ProxyListForFree.aspx', 'https://miniproxy-php.appspot.com/index.php?http://www.proxyserverlist24.top/feeds/posts/default?redirect=false&max-results=4'];
  for ($i = 0; $i < 10; ++$i) {
    $web[] = 'http://proxy-list.org/english/index.php?p=' . ($i + 1);
  }
  $res = '';
  foreach ($web as $url) {
    $agc = new gtrans();
    $curl = $agc->cURL(true);
    $curl = $agc->fetch_contents($curl, $url, 'proxy', ['filehour' => 6]);
    if (!$curl->error) {
      $res .= $curl->response;
    }
  }

  return $res;
}

/**
 * Proxy parser.
 *
 * @param string $str proxy string / html string / etc
 */
function parse_proxy($str)
{
  if (empty($str)) {
    return false;
  }
  $r = '/([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}):?([0-9]{1,6})?/m';
  $array = [];
  if (preg_match_all($r, $str, $m)) {
    if (isset($m[0])) {
      $array = array_merge($array, $m[0]);
    }
  }
  if (preg_match_all('/Proxy\(\'(.*)\'\)/m', $str, $m)) {
    if (isset($m[1])) {
      foreach ($m[1] as $n) {
        try {
          if (base64_encode(base64_decode($n)) == $n) {
            array_push($array, base64_decode($n));
          }
        } catch (\Throwable $th) {
          //throw $th;
        }
      }
    }
  }

  return !empty($array) ? array_unique($array) : false;
}

/**
 * No index robots tag.
 */
function no_index()
{
  if (!headers_sent()) {
    header('X-Robots-Tag: noindex, nofollow', true);
  }
}

/**
 * Rich snippets related links.
 *
 * @param array ...$url
 *
 * @return void
 */
function relatedLinks($url)
{
  foreach ($url as $name => $link) {
    echo '<meta itemprop="relatedLink" content="' . $link . '" />';
  }
}

/**
 * User IP.
 */
function getUIP()
{
  // Get real visitor IP behind CloudFlare network
  if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) {
    $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_CF_CONNECTING_IP'];
    $_SERVER['HTTP_CLIENT_IP'] = $_SERVER['HTTP_CF_CONNECTING_IP'];
  }
  $req_ip = (isset($_REQUEST['set-ip']) && filter_var($_REQUEST['set-ip'], FILTER_VALIDATE_IP) ? $_REQUEST['set-ip'] : false);
  if ($req_ip) {
    setcookie('ip', $req_ip, time() + 3600);
    exit(json_encode($_REQUEST['set-ip']));
  }
  $client = (isset($_SERVER['HTTP_CLIENT_IP']) ? $_SERVER['HTTP_CLIENT_IP'] : false); //@
  $forward = (isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : false); //@
  $forward2 = (isset($_SERVER['HTTP_X_FORWARDED']) ? $_SERVER['HTTP_X_FORWARDED'] : false);
  $remote = $_SERVER['REMOTE_ADDR'];
  $forward3 = (isset($_SERVER['HTTP_FORWARDED']) ? $_SERVER['HTTP_FORWARDED'] : false);
  $cluster = (isset($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']) ? $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'] : false);
  $cookie = (isset($_COOKIE['ip']) ? $_COOKIE['ip'] : false);

  if (filter_var($cookie, FILTER_VALIDATE_IP)) {
    $ip = $cookie;
  } elseif (filter_var($client, FILTER_VALIDATE_IP)) {
    $ip = $client;
  } elseif (filter_var($forward, FILTER_VALIDATE_IP)) {
    $ip = $forward;
  } elseif (filter_var($forward3, FILTER_VALIDATE_IP)) {
    $ip = $forward3;
  } elseif (filter_var($forward2, FILTER_VALIDATE_IP)) {
    $ip = $forward2;
  } elseif (filter_var($cluster, FILTER_VALIDATE_IP)) {
    $ip = $cluster;
  } else {
    $ip = $remote;
  }
  //var_dump($client, $forward, $forward2, $forward3, $remote, $cluster, $cookie);

  return $ip;
}

/**
 * JSON.
 */
function CJSON($array = [])
{
  return json_encode($array, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}

/**
 * Wordpress cURL.
 */
function wp_curl($useProxy = false, $verbose = true)
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
  if (isset($_SESSION['proxy']) && !empty($_SESSION['proxy']) && $useProxy) {
    $curl->setProxy(trim($_SESSION['proxy']));
    $curl->setProxyTunnel(true);
  }

  return $curl;
}
/**
 * \Curl\Curl Initializer.
 */
function CuRL($useProxy = false)
{
  return wp_curl($useProxy);
}

function array_remove($key, $value)
{
  precom($value);
  $value = trim($value);
  if (is_string($value)) {
    if (is_array($key)) {
      if (isset($key[$value])) {
        unset($key[$value]);
      }
    } elseif (is_object($key)) {
      if (isset($key->{"$value"})) {
        unset($key->{"$value"});
      }
    }
  } elseif (is_array($value)) {
    $value = array_filter($value);
    foreach ($value as $n) {
      $n = trim($n);
      if (is_array($key)) {
        if (isset($key[$n])) {
          unset($key[$n]);
        }
      } elseif (is_object($key)) {
        if (isset($key->{"$n"})) {
          unset($key->{"$n"});
        }
      }
    }
  }

  return array_filter($key);
}

/**
 * Check user has subscribed to youtube channel
 * $client googleapis instance
 * $cid channel id.
 * $only_get_url = return URL.
 */
function check_subscriber($client, $cid = 'UCGNaoefvJRfd15fo-LQ0zvg', $only_get_url = false)
{
  if (!$only_get_url) {
    $service = new Google_Service_YouTube($client);
    $response = $service->subscriptions->listSubscriptions(
      'snippet,contentDetails',
      array_filter(['forChannelId' => $cid, 'mine' => true])
    );

    $result = count($response['items']);
    if ($result > 0) {
      $output['success'] = true;
      $output['data'] = $response['items'];
      $_SESSION['subscribed'] = 1;
      if (is_user_logged_in()) {
        update_user_meta(get_current_user_id(), 'subscribed', 1);
      }
    } else {
      $output['error'] = true;
      $output['data'] = 'Belum Subscribe';
      $output['msg'] = 'Belum Subscribe';
      $_SESSION['subscribed'] = 0;
      if (is_user_logged_in()) {
        update_user_meta(get_current_user_id(), 'subscribed', 0);
      }
    }
  } else {
    $output = 'https://www.youtube.com/channel/' . $cid;
  }

  return $output;
}

/**
 * Create cookie.
 *
 * @param string $name    cookie name
 * @param mixed  $value   cookie value
 * @param int    $expired expires value in seconds
 *
 * @return void
 */
function cook($name, $value, $expired = 3600)
{
  if (!headers_sent()) {
    return setcookie($name, $value, time() + $expired);
  } else {
    $functionJS = uniqid('_'); ?>
    <script>
      /**
       * Create Cookie Immediately by arguments
       */
      function Cookie<?= $functionJS; ?>() {
        if (typeof username != 'undefined') {
          jsCookies.set("username", username, 0.1);
        }
        jsCookies.set("<?= $name; ?>",
          <?= is_numeric($value) ? $value : (is_string($value) ? "$value" : (is_array($value) || is_object($value) ? dimas::cj($value) : false)); ?>, 86400 /
          <?= $expired; ?>
        );
      }
      if (typeof jsCookies == 'undefined') {
        var headTag = document.getElementsByTagName("head")[0];
        var jqTag = document.createElement('script');
        jqTag.type = 'text/javascript';
        jqTag.src = 'https://gistcdn.githack.com/jrivero/949141/raw/df5484d6bac7032f5bf737eac7753fd551471cde/jsCookies.js';
        jqTag.onload = Cookie<?= $functionJS; ?>;
        headTag.appendChild(jqTag);
      } else {
        Cookie<?= $functionJS; ?>();
      }
    </script>
  <?php
  }
}

/**
 * Get index.json and log.txt.
 *
 * @param string        $hash
 * @param function|null $callback
 *
 * @return array
 */
function getLog($hash = null, $callback = null)
{
  $folder = ROOT . '/views/AGC/saved';
  $jsoncfg = [];
  if (is_dir($folder)) {
    $iterator = new RecursiveDirectoryIterator($folder);
    $directoryIterator = new RecursiveIteratorIterator($iterator);
    /*
     * @var SplFileInfo
     */
    foreach ($directoryIterator as $ev => $entry) {
      $ev = smartFilePath($ev);
      if ($entry->isFile() && $entry->isWritable() && 'index.json' == $entry->getFilename()) {
        $pName = smartFilePath($entry->getPathname());
        $json = json_decode(file_get_contents($entry));
        $cfg = ['parent' => $folder, 'entry' => $pName, 'content' => $json, 'hash' => $hash];
        krsort($cfg);
        if ($hash) {
          foreach ($json as $key => $value) {
            if ($key == $hash) {
              $cfg['matched'] = ['value' => $value, 'key' => $key];
            }
          }
        }
        $jsoncfg[] = $cfg;
      }
    }
  }
  if (is_callable($callback)) {
    return call_user_func($callback, $jsoncfg);
  }

  return $jsoncfg;
}
/**
 * Try catch.
 *
 * @param function $callback
 *
 * @return void
 */
function trycatch($callback, $die = false)
{
  try {
    $callback();
  } catch (\Throwable $e) {
    $trace = $e->getTrace();
    $trace = array_map(function ($k) {
      isset($k['file']) && file_exists($k['file']) ? $k['file'] = smartFilePath($k['file']) : false;
      !isAdmin() && isset($k['file']) ? $k['file'] = md5($k['file']) : false;
      //isset($k['function']) && $k['function'] == 'trycatch' ? unset($trace[]) : false;
      return $k;
    }, $trace);
    $exception = "<pre class='alert alert-danger'><h6>Caught exception: </h6>"
      . $e->getMessage()
      . "\n on line <b>"
      . $e->getLine()
      . '</b> of <i>'
      . $e->getFile()
      . '</i>'
      . "\n Trace \n"
      . dimas::i()->cj($trace)
      . '</pre>';
    file_put_contents(ROOT . '/tmp/error.log', $e->getTraceAsString() . PHP_EOL, FILE_APPEND);

    echo $exception;
    if ($die) {
      exit;
    }
  }
}

/**
 * echo print_r in pretext.
 *
 * @param mixed $str
 */
function printr($str, $str1 = 0, $str2 = 0)
{
  echo '<pre>';
  print_r($str);
  if ($str1) {
    print_r($str1);
  }
  if ($str2) {
    print_r($str2);
  }
  echo '</pre>';
}

/**
 * echo json_encode in pretext.
 */
function precom(...$str)
{
  $D = json_encode($str, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
  if (headers_sent()) {
    echo '<pre class="notranslate">';
    echo $D;
    echo '</pre>';
  } else {
    return $D;
  }
}
/**
 * Javascript function caller programmatically.
 *
 * @param string $name
 * @param mixed  $args
 * @param mixed  $callback
 *
 * @return void
 */
function jsfunc($name, $args, $callback = null)
{
  $args = add_slashes_recursive($args);
  echo "__call('$name', \"$args\");";
}

/**
 * Create javascript variable object builder.
 *
 * @param string $var variable name
 * @param mixed  $val variable value
 * @param bool @withTag true: return with <script/> tag
 *
 * @return echo $variable
 */
function jscfg($var, $val, $withTag = false)
{
  $brackets = false;
  if (is_array($val) || is_object($val)) {
    $string = json_encode($val, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
  } else {
    $string = addslashes($val);
    $brackets = true;
  }
  if ($brackets) {
    $string = '"' . $string . '"';
  }
  if (!$withTag) {
    $variable = 'var ' . $var . ' = ' . $string . ';';
  } else {
    $variable = '<script>var ' . $var . ' = ' . $string . ';</script>';
  }
  echo $variable;
  //return $variable;
}

/**
 * Create youtube channel URL.
 */
function ytURL($cid = 'UCGNaoefvJRfd15fo-LQ0zvg')
{
  return 'https://www.youtube.com/channel/' . $cid;
}

/**
 * Get visitor ip.
 */
function get_client_ip()
{
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
    $ipaddress = 'UNKNOWN';
  }

  return $ipaddress;
}

/**
 * Unset session.
 */
function unses($x)
{
  if (isset($_SESSION[$x])) {
    unset($_SESSION[$x]);
  }
}

/**
 * Is cookie set, return cookie value.
 *
 * @param string $name cookie name
 *
 * @return string
 */
function iscookie($name)
{
  if (isset($_COOKIE[$name]) && !empty($_COOKIE[$name])) {
    return $_COOKIE[$name];
  }
}
/**
 * Wordpress redirect support headers_sent().
 *
 * @param string $url
 *
 * @return void
 */
function wp_redirect2($url)
{
  if (!headers_sent()) {
    return wp_redirect($url);
  } else {
  ?>
    <script>
      location.replace('<?= $url; ?>');
    </script>
<?php
  }
}

/**
 * Parse URL deeper.
 */
function parse_url2($url, $encoded = false)
{
  if ($encoded) {
    $url = urldecode($url);
  }
  $url = html_entity_decode($url);
  $parts = parse_url($url);
  if (isset($parts['query'])) {
    parse_str($parts['query'], $query);
    $parts['original_query'] = $parts['query'];
    $parts['query'] = $query;
  }

  return array_merge($parts);
}
/**
 * Create filename.
 *
 * @param string   $path
 * @param function $callback
 *
 * @return void
 */
function createFilename($str, $callback = false)
{
  if (isURL($str)) {
    $url = parse_url2($str);
    $str = $url['path'];
  }
  $f = remove_specialchars($str, '-'); //specialchars remover
  if (!$callback) {
    return $f;
  } elseif (is_callable($callback)) {
    return call_user_func($callback, $f);
  }
}
/**
 * remove special characters from string.
 *
 * @param string $string
 * @param string $replace_space_with
 * @param array  $replacer           str_ireplace style
 *
 * @return string $string
 */
function remove_specialchars($string, $replace_space_with = false, $replacer = [])
{
  $string = preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
  $string = preg_replace('/-+/', '-', $string); // Replaces multiple hyphens with single one.
  if ($replace_space_with) {
    $string = str_replace(' ', $replace_space_with, $string); // Replaces all spaces with hyphens.
  }
  if (!empty($replacer) && is_array($replacer)) {
    $string = str_ireplace(array_keys($replacer), array_values($replacer), $string);
  }

  return $string;
}
function createAGCFile($path)
{
  return createFilename(preg_replace('/\.html$/m', '', $path), function ($path_res) {
    if (!preg_match('/\.html$/m', $path_res)) {
      return $path_res . '.html';
    } else {
      return $path_res;
    }
  });
}
/**
 * is request header set, return requested header.
 *
 * @param string $x
 * @param string $method
 *                       * GET, POST
 * @param bool   $empty  Allow empty ?
 */
function isreq($x, $method = null, $empty = false)
{
  if ($method) {
    $method = strtoupper(strtolower($method));
    if ($_SERVER['REQUEST_METHOD'] != $method) {
      return false;
    }
  }
  $x = trim($x);
  if (isset($_REQUEST[$x])) {
    return strip_slashes_recursive($_REQUEST[$x]);
  } else {
    return false;
  }
}
/**
 * define request method type.
 */
function isreqtype($x)
{
  return $_SERVER['REQUEST_METHOD'] == strtoupper($x);
}

//posts
function get_first_image($post)
{
  $first_img = '';
  //ob_start();
  //ob_end_clean();
  $output = preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post, $matches);
  $first_img = $matches[1][0];
  $first_img = preg_replace('/http?s\:\/\/www\.neferchichi\.tk/m', '', $first_img);

  if (empty($first_img)) { //Defines a default image
    $first_img = 'https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
  }

  return $first_img;
}
