<?php

/**
 * Encrypt string with key
 *
 * @param string $string
 * @param string $key
 * @return string
 */
function enc_encrypt($string, $key = 'DimasLanjaka')
{
  $result = '';
  for ($i = 0; $i < strlen($string); $i++) {
    $char = substr($string, $i, 1);
    $keychar = substr($key, ($i % strlen($key)) - 1, 1);
    $char = chr(ord($char) + ord($keychar));
    $result .= $char;
  }

  return base64_encode($result);
}

/**
 * Decrypt from enc_encrypt
 *
 * @param string $string
 * @param string $key
 * @return string
 */
function enc_decrypt($string, $key = 'DimasLanjaka')
{
  $result = '';
  $string = base64_decode($string);

  for ($i = 0; $i < strlen($string); $i++) {
    $char = substr($string, $i, 1);
    $keychar = substr($key, ($i % strlen($key)) - 1, 1);
    $char = chr(ord($char) - ord($keychar));
    $result .= $char;
  }

  return $result;
}
