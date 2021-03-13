<?php
/**
 * Created by Dimas Lanjaka.
 * Date: 15.05.2018
 * Time: 15:28
 */

namespace DimasProxyParser\Service;


class SpysMeService extends Service
{
    protected $url = "http://spys.me/proxy.txt";

    public function startParse($nextPage = null, $prepareDom = true)
    {
        parent::startParse($nextPage, false);
    }

    protected function findProxiesInDom($dom)
    {
        $list= [];

        $content = explode("\n", $dom);

        foreach ($content as $line) {
            preg_match("/^([0-9.]*):([0-9]*) (.*)/", $line, $matches);

            if(empty($matches)){
                continue;
            }

            list($line, $ip, $port, $flags) = $matches;

            $flags = trim($flags);

            $flags = explode("-", $flags);

            if(!empty($flags[2]) && strpos($flags[2], "S") === false){
                continue;
            }

            $list[] = [
                "ip" => $ip,
                "port" => $port,
                "protocol" => empty($flags[2]) ? "http" : "https"
            ];
        }

        return $list;
    }
}