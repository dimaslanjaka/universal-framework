<?php

/**
 * Created by Dimas Lanjaka.
 * Date: 15.05.2018
 * Time: 15:28
 */

namespace DimasProxyParser\Service;


use GuzzleHttp\Client;
use PHPHtmlParser\Dom;

class Service
{
    protected $url = null;
    protected $list = [];
    protected $currentPage = 1;
    protected $proxyLimit = 100;

    public function __construct($config = ['limit' => 100])
    {
        if (isset($config["limit"])) {
            $this->proxyLimit = (int) $config["limit"];
        }
    }

    public function startParse($nextPage = null, $prepareDom = true)
    {
        if (!empty($nextPage)) {
            $this->url = $nextPage;
        }

        $response = $this->sendRequest();

        if ($prepareDom) {
            $dom = $this->htmlToDomObject($response);
        } else {
            $dom = $response;
        }

        $proxies = $this->findProxiesInDom($dom);
        $this->list = array_merge($this->list, $proxies);

        if ($this->proxyLimit > count($this->list)) {
            $nextPage = $this->findNextPage();

            if (!empty($nextPage)) {
                $this->currentPage++;
                $this->startParse($nextPage);
            }
        }
    }

    protected function findNextPage()
    {
        return null;
    }

    protected function htmlToDomObject($html)
    {
        $dom = new Dom();

        return $dom->load($html, [
            "removeScripts" => false
        ]);
    }

    protected function findProxiesInDom($dom)
    {
        return [];
    }

    public function getList()
    {
        $list = [];

        foreach ($this->list as $item) {
            $list[] = $item["protocol"] . "://" . $item["ip"] . ":" . $item["port"];
        }

        return $list;
    }

    protected function sendRequest($data = array(), $type = "get", $url = "")
    {
        if (empty($this->url) && empty($url)) {
            return false;
        }

        if (empty($url)) {
            $url = $this->url;
        }

        if ($type == "get") {
            foreach ($data as $param => $value) {
                $data[$param] = $param . "=" . $value;
            }

            $data = implode("&", $data);
        }

        $client = new Client();

        $requestOptions = [
            "headers" => [
                "user-agent" => "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36"
            ]
        ];

        if ($type == "get") {
            $url = !empty($data) ? $url . "?" . $data : $url;
            $response = $client->get($url, $requestOptions);
        } else {
            $requestOptions = array_merge($requestOptions, ["form_params" => $data]);
            $response = $client->post($url, $requestOptions);
        }

        return $response->getBody()->getContents();
    }
}
