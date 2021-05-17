<?php

namespace Proxy;

/**
 * Proxy Gate
 * * Anonimity checker.
 *
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 */
class gate
{
    public function run()
    {
        $result = [
            'method' => $_SERVER['REQUEST_METHOD'],
            'proxy' => false,
            'get' => false,
            'cookie' => false,
            'post' => false,
            'UA' => false,
            'referer' => false,
            'anonimity' => false,
            'server' => false,
        ];
        if (!empty($_GET)) {
            $result['get'] = true;
            $result['data']['get'] = $_GET;
        }

        if (!empty($_POST)) {
            $result['post'] = true;
            $result['data']['post'] = $_POST;
        }

        if (!empty($_COOKIE)) {
            $result['cookie'] = true;
            $result['data']['cookie'] = $_COOKIE;
        }

        if (isset($_SERVER['HTTP_REFERER']) && !empty($_SERVER['HTTP_REFERER'])) {
            $result['referer'] = true;
        }

        if (isset($_SERVER['HTTP_USER_AGENT']) && !empty($_SERVER['HTTP_USER_AGENT'])) {
            $result['UA'] = true;
        }

        // Anonimity
        if (!isset($_SERVER['HTTP_X_FORWARDED_FOR']) && !isset($_SERVER['HTTP_VIA']) && !isset($_SERVER['HTTP_PROXY_CONNECTION'])) {
            $result['anonimity'] = 'elite';
        } elseif (!isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $result['anonimity'] = 'anonymous';
        } else {
            $result['anonimity'] = 'transparent';
        }

        $proxy_headers = [
            'HTTP_VIA',
            'HTTP_X_FORWARDED_FOR',
            'HTTP_FORWARDED_FOR',
            'HTTP_X_FORWARDED',
            'HTTP_FORWARDED',
            'HTTP_CLIENT_IP',
            'HTTP_FORWARDED_FOR_IP',
            'VIA',
            'X_FORWARDED_FOR',
            'FORWARDED_FOR',
            'X_FORWARDED',
            'FORWARDED',
            'CLIENT_IP',
            'FORWARDED_FOR_IP',
            'HTTP_PROXY_CONNECTION',
        ];
        foreach ($proxy_headers as $x) {
            if (isset($_SERVER[$x]) && filter_var($_SERVER[$x], FILTER_VALIDATE_IP)) {
                $result['proxy']['ip'] = $_SERVER[$x];
                $result['proxy']['header'] = $x;
            }
        }

        $result['server'] = $_SERVER;

        /*
        $ports = array(8080, 80, 81, 1080, 6588, 8000, 3128, 553, 554, 4480);
        foreach ($ports as $port) {
          if (@fsockopen($_SERVER['REMOTE_ADDR'], $port, $errno, $errstr, 30)) {
          die("You are using a proxy!");
          }
        }
        */
        ksort($result);

        return $result;
    }
}
