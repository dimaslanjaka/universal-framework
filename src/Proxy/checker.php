<?php

namespace Proxy;

use Curl\Curl;

class checker extends Curl
{
  public function __construct($base = 'https://www.google.com')
  {
    parent::__construct($base);
  }

  public function getCountry($proxy, \DB\pdo $pdo)
  {
    parent::__construct('http://ip-api.com');
    $this->setProxy($proxy);
    $this->setProxyTunnel(true);
    $this->get('/json/');
    if (!$this->error) {
      $result = (array) $this->response;
      $result['type'] = $this->getOpt(CURLOPT_PROXYTYPE);
      if (isset($result['country'])) {
        $pdo->update(
                    'proxies',
                    [
                      'country' => $result['country'],
                      //'type' => $this->getOpt(CURLOPT_PROXYTYPE)
                    ],
                    [
                      'proxy' => $proxy,
                    ]
                )->exec();
      }
    } else {
      $pdo->update(
                'proxies',
                [
                  'status' => 'inactive',
                ],
                [
                  'proxy' => $proxy,
                ]
            )->exec();
      $result = [
        'error' => true,
        'message' => $proxy . ' Proxy Dead',
      ];
    }

    return $result;
  }
}
