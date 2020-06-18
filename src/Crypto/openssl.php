<?php

namespace Crypto;

use Exception;

class openssl
{
  protected $method = 'aes-128-ctr'; // default cipher method if none supplied
  private $key;

  protected function iv_bytes()
  {
    return openssl_cipher_iv_length($this->method);
  }

  public function __construct($key = false, $method = false)
  {
    if (!$key) {
      $key = php_uname(); // default encryption key if none supplied
    }
    if (ctype_print($key)) {
      // convert ASCII keys to binary format
      $this->key = openssl_digest($key, 'SHA256', true);
    } else {
      $this->key = $key;
    }
    if ($method) {
      if (in_array(strtolower($method), openssl_get_cipher_methods())) {
        $this->method = $method;
      } else {
        throw new Exception(__METHOD__ . ": unrecognised cipher method: {$method}", 1);
      }
    }
  }

  /**
   * encrypt plaintext string
   *
   * @param string $data
   * @return string
   */
  public function encrypt(string $data)
  {
    $iv = openssl_random_pseudo_bytes($this->iv_bytes());

    return bin2hex($iv) . openssl_encrypt($data, $this->method, $this->key, 0, $iv);
  }

  /**
   * decrypt encrypted string
   *
   * @param string $data
   * @return string|false
   */
  public function decrypt(string $data)
  {
    $iv_strlen = 2 * $this->iv_bytes();
    if (preg_match('/^(.{' . $iv_strlen . '})(.+)$/', $data, $regs)) {
      list(, $iv, $crypted_string) = $regs;
      if (ctype_xdigit($iv) && 0 == strlen($iv) % 2) {
        return openssl_decrypt($crypted_string, $this->method, $this->key, 0, hex2bin($iv));
      }
    }

    return false; // failed to decrypt
  }

  public static $static_key = 'CKXH2U9RPY3EFD70TLS1ZG4N8WQBOVI6AMJ5';
  private static $_instance = null;
  /**
   * static instances
   *
   * @param boolean $restart
   * @return $this
   */
  public static function instance(bool $restart = false)
  {
    if (self::$_instance === null || $restart) {
      self::$_instance = new self(self::$static_key);
    }

    return self::$_instance;
  }
}
