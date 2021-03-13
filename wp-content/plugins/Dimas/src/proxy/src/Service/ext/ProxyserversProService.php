<?php
/**
 * Created by Dimas Lanjaka.
 * Date: 15.05.2018
 * Time: 15:28
 */

namespace DimasProxyParser\Service;


class ProxyserversProService extends Service
{
    protected $url = "https://proxyservers.pro/proxy/list/protocol/http%2Chttps/order/updated/";

    protected function findProxiesInDom($dom)
    {
        $table = $dom->find(".table-responsive table");
        $chash = $dom->find(".listdata-data script")[0]->text;
        preg_match("/\'(.*)\'/", $chash, $mathches);
        $chash = $mathches[1];

        $rows = $table->find("tbody tr");

        $list = [];

        foreach ($rows as $row) {
            $columns = $row->find("td");

            if(count($columns) < 7){
                continue;
            }

            $proxy = $columns[1]->find("a")->text;
            $port = $columns[2]->find("span")[0]->getAttribute("data-port");
            $port = $this->decodePort($port, $chash);
            $protocol = $columns[6]->text;

            $list[] = [
                "ip" => $proxy,
                "port" => $port,
                "protocol" => strpos($protocol, "HTTPS") !== false ? "https" : "http"
            ];
        }

        return $list;
    }

    protected function findNextPage()
    {
        $res =  $this->sendRequest();

        $dom = $this->htmlToDomObject($res);

        $links = $dom->find(".pagination a");

        foreach ($links as $link){
            if((int)$link->text > $this->currentPage){
                $this->url = preg_replace("/order_dir\/asc\/page\/(.*)/", "", $this->url);
                return $this->url . "order_dir/asc/page/" . (int)$link->text;
            }
        }

        return null;
    }

    private function decodePort($e, $t){
        for($n = [], $a = 0, $o = 0; $a < strlen($e) - 1; $a += 2, $o ++) {
            $n[$o] = intval(substr($e, $a, 2), 16);
        }

        for($r = [], $a = 0; $a < strlen($t); $a ++){
            $r[$a] = $this->utf8_char_code_at($t, $a);
        }

        for($a = 0; $a < count($n); $a ++){
            $n[$a] = $n[$a] ^ $r[$a % count($r)];
        }

        for($a = 0; $a < count($n); $a ++){
            $n[$a] = chr($n[$a]);
        }

        return implode("", $n);
    }

    private function utf8_char_code_at($str, $index)
    {
        $char = mb_substr($str, $index, 1, 'UTF-8');

        if (mb_check_encoding($char, 'UTF-8')) {
            $ret = mb_convert_encoding($char, 'UTF-32BE', 'UTF-8');
            return hexdec(bin2hex($ret));
        } else {
            return null;
        }
    }
}