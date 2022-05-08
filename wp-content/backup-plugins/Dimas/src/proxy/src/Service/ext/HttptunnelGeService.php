<?php
/**
 * Created by Dimas Lanjaka.
 * Date: 15.05.2018
 * Time: 15:28
 */

namespace DimasProxyParser\Service;


class HttptunnelGeService extends Service
{
    protected $url = "http://www.httptunnel.ge/ProxyListForFree.aspx";

    protected function findProxiesInDom($dom)
    {
        $table = $dom->find("#ctl00_ContentPlaceHolder1_GridViewNEW");

        $rows = $table->find("tr");

        $list = array();

        foreach ($rows as $row) {
            $columns = $row->find("td");

            if(count($columns) == 0){
                continue;
            }

            $allowGet = $columns[1]->find("input");
            $allowPost = $columns[2]->find("input");

            if(empty($allowGet) || empty($allowPost)){
                continue;
            }

            $allowGet = $allowGet[0]->getAttribute("checked");
            $allowPost = $allowPost[0]->getAttribute("checked");

            if(empty($allowGet) || empty($allowPost)){
                continue;
            }

            $proxy = $columns[0]->find("a")[0]->text;

            list($ip, $port) = explode(":", $proxy);

            $list[] = array(
                "ip" => $ip,
                "port" => $port,
                "protocol" => "http"
            );
        }

        return $list;
    }
}