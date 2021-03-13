<?php
const SALT = 'salt';
const IV = '1111111111111111';
const ITERATIONS = 999;
function userPHPEncrypt($passphrase, $plainText)
{
    $key = \hash_pbkdf2("sha256", $passphrase, SALT, ITERATIONS, 64);
    $encryptedData = \openssl_encrypt($plainText, 'AES-256-CBC', \hex2bin($key), OPENSSL_RAW_DATA, IV);
    return \base64_encode($encryptedData);
}
function userPHPDecrypt($passphrase, $encryptedTextBase64)
{
    $encryptedText = \base64_decode($encryptedTextBase64);
    $key = \hash_pbkdf2("sha256", $passphrase, SALT, ITERATIONS, 64);
    $decryptedText = \openssl_decrypt($encryptedText, 'AES-256-CBC', \hex2bin($key), OPENSSL_RAW_DATA, IV);
    return $decryptedText;
}
$passPhrase = "dimas";
$plainText = "text";
$phpEncryptedText = userPHPEncrypt($passPhrase, $plainText);
?>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Cipher</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
</head>

<body>
    <h3>PHP</h3>
    <div>PlainText : <?php echo $plainText ?></div>
    <div>EncryptedText : <?php echo $phpEncryptedText ?></div>
    <div>DecryptedText : <?php echo userPHPDecrypt($passPhrase, $phpEncryptedText) ?></div>
    <br>
    <h3>JS</h3>
    <div id="crypto-js"></div>
    <br>
    <h3>Form JS</h3>
    <div>
        <form method="POST">
            <label for="input-passphrase">Passphrase : </label>
            <input type="text" name="passphrase" id="input-passphrase" style="width:300px;">
            <br>
            <label for="input-encrypted">Encrypted : </label>
            <input type="text" name="encrypted" id="input-encrypted" style="width:300px;">
            <br>
            <span id="form-decrypted-text"></span>
            <br>
            <button type="submit">Submit</button>
        </form>
        <div>
<?php
if (!empty($_POST) && isset($_POST["passphrase"]) && isset($_POST["encrypted"])) {
    echo 'PHP Decode :';
    echo userPHPDecrypt($_POST["passphrase"], $_POST["encrypted"]);
}
?>
        </div>
    </div>
    <script type="text/javascript">
        var plainText = '<?php echo $plainText ?>';
        var salt = '<?php echo SALT ?>';
        var iv = '<?php echo IV ?>';
        var iterations = '<?php echo ITERATIONS ?>';
        var passphrase = '<?php echo $passPhrase ?>';
        function getKey(passphrase, salt){
            var key = CryptoJS.PBKDF2(passphrase, salt, {
                hasher: CryptoJS.algo.SHA256,
                keySize: 64 / 8,
                iterations: iterations
            });
            return key;
        }
        function userJSEncrypt(passphrase, plainText){
            var key = getKey(passphrase, salt);
            var encrypted = CryptoJS.AES.encrypt(plainText, key, {
                iv: CryptoJS.enc.Utf8.parse(iv)
            });
            return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
        }
        function userJSDecrypt(passphrase, encryptedText){
            var key = getKey(passphrase, salt);
            var decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
                iv: CryptoJS.enc.Utf8.parse(iv)
            });
            return decrypted.toString(CryptoJS.enc.Utf8);
        }

        var div = document.createElement('div');
        div.innerText = userJSDecrypt(passphrase, plainText);
        document.getElementById('crypto-js').appendChild(div);
        document.getElementById('input-passphrase').value = passphrase;
        document.getElementById('input-encrypted').value = userJSEncrypt(passphrase, plainText);
        document.getElementById('form-decrypted-text').innerText = userJSDecrypt(passphrase, document.getElementById('input-encrypted').value);

    </script>
</body>

</html>