<?php

namespace Proxy;

class parser
{
    public static function parse($proxy)
    {
        if (preg_match('/^(\d[\d.]+):(\d+)\b/', $proxy, $matches)) {
            $ip = $matches[1];
            $port = $matches[2];

            return "$ip:$port";
        }
    }

    public function bulk($proxies)
    {
        $result = [];
        if (preg_match_all('/^(\d[\d.]+):(\d+)\b/', $proxies, $matches)) {
            if (isset($matches[0])) {
                $result = $matches[0];
            }
        } elseif (preg_match_all('~\b([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}):([0-9]{1,5}\b)~', $proxies, $matches)) {
            if (isset($matches[0])) {
                $result = $matches[0];
            }
        } elseif (preg_match_all('/(\d+(?(?!\:)\.)){4}\:\d+/m', $proxies, $matches)) {
            if (isset($matches[0])) {
                $result = $matches[0];
            }
        }

        return $result;
    }
}
