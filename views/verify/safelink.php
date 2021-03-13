<?php

$str = isset($_GET['e']) && !empty($_GET['e']) ? urldecode($_GET['e']) : (isset($subrequest[2]) ? $subrequest[2] : 'null');
$str = base64_decode($str);
const SALT = 'salt'; //salt
const IV = '1111111111111111'; //pass salt
const ITERATIONS = 999; //iterations
function userPHPEncrypt($passphrase, $plainText)
{
  $key = \hash_pbkdf2('sha256', $passphrase, SALT, ITERATIONS, 64);
  $encryptedData = \openssl_encrypt($plainText, 'AES-256-CBC', \hex2bin($key), OPENSSL_RAW_DATA, IV);

  return \base64_encode($encryptedData);
}
function userPHPDecrypt($passphrase, $encryptedTextBase64)
{
  $encryptedText = \base64_decode($encryptedTextBase64);
  $key = \hash_pbkdf2('sha256', $passphrase, SALT, ITERATIONS, 64);
  $decryptedText = \openssl_decrypt($encryptedText, 'AES-256-CBC', \hex2bin($key), OPENSSL_RAW_DATA, IV);

  return $decryptedText;
}
$D = userPHPDecrypt('dimaslanjaka', $str);
$E = userPHPEncrypt('dimaslanjaka', $D);
?>

<center>
  <div countdown="10" data-callback="sfr" class="m-2"></div>
  <div id="msg"></div>
</center>

<script>
  const is_url = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  function sfr() {
    let u = '<?=$D; ?>',
      msg = document.getElementById('msg');
    if (is_url(u)) {
      let h = u.parse_url().hostname;
      msg.innerHTML = `Your link <a href="${u}" alt="${h}" title="${h}" class="btn btn-success">Visit ${h}</a>`;
    } else if (msg) {
      msg.innerHTML = 'INVALID URL';
    }
  }
</script>