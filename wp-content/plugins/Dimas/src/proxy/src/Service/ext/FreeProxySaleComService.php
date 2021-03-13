<?php

/**
 * Created by Dimas Lanjaka.
 * Date: 15.05.2018
 * Time: 15:28
 */

namespace DimasProxyParser\Service;

class FreeProxySaleComService extends Service
{
  protected $url = "https://free.proxy-sale.com/";

  protected function findProxiesInDom($dom)
  {
    $table = $dom->find("table");
    $list = [];
    if (!empty($table)) {
      $rows = $table->find("tbody tr");
      foreach ($rows as $row) {
        $port = 0;
        $proxy = trim($row->find(".ip")->text);
        if (isset($row->find("td img")[0])) {
          $port = $row->find("td img")[0]->getAttribute("src");
          $port = explode("/", $port);
          $port = end($port);
          switch ($port) {
            case 'a1d3cebf33ed2852e5410946c9beb04b.png':
              $port = 4145;
              break;

            case '89b09fc0f66997e8421d8061030c983a.png':
              $port = 8080;
              break;
          }
        } else {
          $port = $row->find('div')[0]->text;
        }
        $type = $row->find("td a")[0]->text;

        if ($type != "http" && $type != "https") {
          continue;
        }

        $list[] = [
          "ip" => $proxy,
          "port" => $port,
          "protocol" => $type
        ];
      }
    }

    return $list;
  }

  protected function findNextPage()
  {
    $res =  $this->sendRequest();

    $dom = $this->htmlToDomObject($res);

    $links = $dom->find(".pagination a");

    foreach ($links as $link) {
      if ((int) $link->text > $this->currentPage) {
        $this->url = preg_replace("/\?pg\=(.*)/", "", $this->url);
        return $this->url . "?pg=" . (int) $link->text;
      }
    }

    return null;
  }
}
