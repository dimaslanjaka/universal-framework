<?php

namespace Crypto;

const SALT = 'salt'; //salt
const IV = '1111111111111111'; //pass salt minimum length 12 chars or it'll be show warning messages
const ITERATIONS = 999; //iterations

class crypt
{
  public static $iv = '1111111111111111';
  public static $iteration = '999';
  public static $salt = 'salt';
  public static $opensslrawdata = 1;

  /**
   * Encrypt.
   *
   * @see https://web-manajemen.blogspot.com/2019/07/phpjs-cryptojs-encrypt-decrypt.html
   *
   * @param string $passphrase
   * @param string $plainText
   *
   * @return string
   */
  public static function EN($plainText, $passphrase = 'dimaslanjaka')
  {
    $key = \hash_pbkdf2('sha256', $passphrase, SALT, ITERATIONS, 64);
    $encryptedData = \openssl_encrypt($plainText, 'AES-256-CBC', \hex2bin($key), OPENSSL_RAW_DATA, IV);

    return \base64_encode($encryptedData);
  }

  /**
   * Decrypt.
   *
   * @see https://web-manajemen.blogspot.com/2019/07/phpjs-cryptojs-encrypt-decrypt.html
   *
   * @param string $passphrase
   * @param string $plaintext
   *
   * @return string
   */
  public static function DE($plaintext, $passphrase = 'dimaslanjaka')
  {
    $encryptedText = \base64_decode($plaintext);
    $key = \hash_pbkdf2('sha256', $passphrase, self::$salt, self::$iteration, 64);
    $decryptedText = \openssl_decrypt($encryptedText, 'AES-256-CBC', \hex2bin($key), OPENSSL_RAW_DATA, self::$iv);

    return $decryptedText;
  }

  public function encrypt($passphrase, $plainText)
  {
    $key = \hash_pbkdf2('sha256', $passphrase, SALT, ITERATIONS, 64);
    $encryptedData = \openssl_encrypt($plainText, 'AES-256-CBC', \hex2bin($key), OPENSSL_RAW_DATA, IV);

    return \base64_encode($encryptedData);
  }

  public function decrypt($passphrase, $plaintext)
  {
    $encryptedText = \base64_decode($plaintext);
    $key = \hash_pbkdf2('sha256', $passphrase, SALT, ITERATIONS, 64);
    $decryptedText = \openssl_decrypt($encryptedText, 'AES-256-CBC', \hex2bin($key), OPENSSL_RAW_DATA, IV);

    return $decryptedText;
  }
}
