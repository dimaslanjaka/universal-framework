<?php

/**
 * Created by Dimas Lanjaka.
 * Date: 13.05.2018
 * Time: 11:25
 */

namespace DimasProxyParser;

use DimasProxyParser\Service\Service;
use GuzzleHttp\Client;
use PHPHtmlParser\Dom;
use App\Services\Connector;

class DimasProxyParser
{
  private $list = [];
  private $lastService;
  private $servicesConfig = [];
  private $disabledServices = [];
  private $checkedList = [];
  private static $_instance = null;
  public $serviceList;

  public static function getInstance()
  {
    if (self::$_instance === null) {
      self::$_instance = new self;
    }

    return self::$_instance;
  }

  public static function i()
  {
    return self::getInstance();
  }

  public function getList()
  {
    return $this->list;
  }

  public function startParsing($limit = 1000, $selfRun = false)
  {
    if (count($this->list) >= $limit) {
      return;
    }

    if (!$selfRun) {
      $this->lastService = null;
      $this->list = [];
      $this->checkedList = [];
    }

    if ($this->executeService()) {
      $this->startParsing($limit, true);
    }
  }

  public function checkListForValid($url = "https://google.com", $timeout = 5)
  {
    $this->checkedList = [];

    foreach ($this->list as $item) {
      //var_dump($item);
      try {
        $code = $this->createRequest($url, $item, $timeout)->getStatusCode();
      } catch (\GuzzleHttp\Exception\RequestException $exception) {
        $code = $exception->getCode();
      }

      $this->checkedList[] = array(
        "proxy" => $item,
        "valid" => $code == 200 ? true : false,
        "response" => $code
      );
    }
  }

  public static function proxyIsValid($proxy, $url = "https://google.com", $timeout = 5)
  {
    try {
      $parser = new DimasProxyParser();
      $code = $parser->createRequest($url, $proxy, $timeout)->getStatusCode();
    } catch (\GuzzleHttp\Exception\RequestException $exception) {
      $code = $exception->getCode();
    }

    return $code == 200 ? true : false;
  }

  public static function googleIsValid($proxy, $timeout = 5, $max = 10)
  {
    $url = "https://google.com";
    $proxy = (array) $proxy;
    $result = [];
    for ($i = 0; $i < $max; $i++) {
      $start = time();
      try {
        $parser = new Client();
        $request = $parser->head($url, [
          "proxy" => $proxy[$i],
          "timeout" => (int) $timeout
        ]);
        $body  = $request->getBody()->getContents();
        $dom = str_get_html($body);
        $code = $request->getStatusCode();
        $title = false;
        if ($dom->find('title')) {
          $title = $dom->find('title', 0)->innertext;
        }
        var_dump($title, $body);
        $result[] = [$parser->parseProxy($proxy[$i]) => strtolower($title) == 'google' && $code == 200 ? true : false, 'speed' => time() - $start];
      } catch (\GuzzleHttp\Exception\RequestException $exception) {
        $code = $exception->getCode();
        var_dump($code);
      }
    }

    return $result;
  }

  public function parseProxy($proxy)
  {
    if (preg_match_all('/([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}):?([0-9]{1,6})?/m', $proxy, $m)) {
      if (isset($m[0])) {
        if (strpos($m[0], ':')) {
          return $m[0];
        }
      }
    }
    return false;
  }

  public function truncateList($limit = 10)
  {
    $this->list = array_slice($this->list, 0, $limit);
  }

  public function getCheckedList()
  {
    return $this->checkedList;
  }

  public function getValidList()
  {
    if (empty($this->checkedList)) {
      return [];
    }

    $list = [];

    foreach ($this->checkedList as $item) {
      if ($item["valid"]) {
        $list[] = $item["proxy"];
      }
    }

    return $list;
  }

  public function getInvalidList()
  {
    if (empty($this->checkedList)) {
      return [];
    }

    $list = [];

    foreach ($this->checkedList as $item) {
      if (!$item["valid"]) {
        $list[] = $item["proxy"];
      }
    }

    return $list;
  }

  private function createRequest($url, $proxy, $timeout)
  {
    $client = new Client();
    $response = $client->head($url, [
      "proxy" => $proxy,
      "timeout" => (int) $timeout
    ]);

    return $response;
  }

  public function disableService($service)
  {
    if (in_array($service, $this->disabledServices)) {
      return;
    }

    $this->disabledServices[] = $service;
  }

  public function enableService($service)
  {
    //var_dump($service);
    if (($key = array_search($service, $this->disabledServices)) !== false) {
      unset($this->disabledServices[$key]);
    }
  }

  public function disableAllServices()
  {
    $this->disabledServices = $this->getServices();
  }

  public function enableAlLServices()
  {
    $this->disabledServices = [];
  }

  public function setConfig($service, $config = [])
  {
    $this->servicesConfig[$service] = $config;
  }

  private function executeService()
  {
    $services = $this->getServices();

    $enabledServices = [];

    foreach ($services as $service) {
      if (in_array($service, $this->disabledServices) === false) {
        $enabledServices[] = $service;
      }
    }

    if (empty($enabledServices)) {
      return false;
    }

    if ($this->lastService == $enabledServices[count($enabledServices) - 1]) {
      return false;
    }

    $lastServiceKey = 0;

    foreach ($enabledServices as $key => $service) {
      if ($service == $this->lastService) {
        $lastServiceKey = $key;
      }
    }

    if (!empty($this->lastService)) {
      $key = $lastServiceKey + 1;
    } else {
      $key = 0;
    }

    $service = "DimasProxyParser\\Service\\" . $enabledServices[$key];
    $config = !empty($this->servicesConfig[$enabledServices[$key]]) ? $this->servicesConfig[$enabledServices[$key]] : [];
    $service = new $service($config);
    $service->startParse();
    $this->list = array_merge($this->list, $service->getList());

    return true;
  }

  private function getServices()
  {
    $files = scandir(__DIR__ . "/Service/ext");

    $services = [];

    foreach ($files as $file) {
      if (strpos($file, "Service") <= 0) {
        continue;
      }

      $services[] = explode(".php", $file)[0];
    }
    $this->serviceList = $services;
    return $services;
  }
}
