## Usage

#### With Random IV

```php
$string     = 'The quick brown fox jumps over to the lazy dog.';
$secretyKey = 'BlVssQKxzAHFAUNZbqvwS+yKw/m';

$encryption = new \Crypto\Cipher();

$cipher  = $encryption->encryptPlainTextWithRandomIV($string, $secretyKey);
echo 'Cipher: ' . $cipher . PHP_EOL;

$plainText = $encryption->decryptCipherTextWithRandomIV($cipher, $secretyKey);
echo 'Decrypted: ' . $plainText . PHP_EOL;
```

#### With Generated IV

```php
$string     = 'The quick brown fox jumps over to the lazy dog.';
$secretyKey = 'BlVssQKxzAHFAUNZbqvwS+yKw/m';

$encryption = new \Crypto\Cipher();
$iv         = $encryption->generateRandomIV();

$cipher = $encryption->encrypt($string, $secretyKey, $iv);
echo 'Cipher: ' . $cipher . PHP_EOL;

$plainText = $encryption->decrypt($cipher, $secretyKey, $iv);
echo 'Decrypted: ' . $plainText . PHP_EOL;
```
