<?php

$ip = mt_rand(0, 255) . '.' . mt_rand(0, 255) . '.' . mt_rand(0, 255) . '.' . mt_rand(0, 255);
echo http_socket::download('https://ipapi.co/json/', '54.39.148.240');

final class http_socket
{
  public static function download($url, string $bind_ip = null, int $port = 80)
  {
    $components = parse_url($url);
    if (!isset($components['query'])) {
      $components['query'] = false;
    }

    if (!$bind_ip) {
      $bind_ip = $_SERVER['SERVER_ADDR'];
    }

    $header = [];
    $header[] = 'GET ' . $components['path'] . ($components['query'] ? '?' . $components['query'] : '');
    $header[] = 'Host: ' . $components['host'];
    $header[] = 'User-Agent: Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1.7) Gecko/20100106 Ubuntu/9.10 (karmic) Firefox/3.5.7';
    $header[] = 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
    $header[] = 'Accept-Language: en-us,en;q=0.5';
    $header[] = 'Accept-Encoding: gzip,deflate';
    $header[] = 'Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7';
    $header[] = 'Keep-Alive: 300';
    $header[] = 'Connection: keep-alive';
    $header = implode("\n", $header) . "\n\n";
    $packet = $header;

    //----------------------------------------------------------------------
    // Connect to server
    //----------------------------------------------------------------------
    $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
    socket_bind($socket, $bind_ip);
    socket_connect($socket, $components['host'], $port);

    //----------------------------------------------------------------------
    // Send First Packet to Server
    //----------------------------------------------------------------------
    socket_write($socket, $packet);
    //----------------------------------------------------------------------
    // Receive First Packet to Server
    //----------------------------------------------------------------------
    $html = '';
    while (1) {
      socket_recv($socket, $packet, 4096, MSG_WAITALL);
      if (empty($packet)) {
        break;
      }
      $html .= $packet;
    }
    socket_close($socket);

    return $html;
  }

  public static function split_proxy(string $proxy)
  {
    $e = explode(':', $proxy);
    $r = array_map('trim', $e);

    return [
      'ip' => $r[0],
      'port' => $r[1],
    ];
  }
}
