<?php
/**
 * Created by Dimas Lanjaka.
 * Date: 15.05.2018
 * Time: 15:28
 */

namespace DimasProxyParser\Service;

/**
 * Class UxProxyOrgService
 * @package DimasProxyParser\Service
 */
class UxProxyOrgService extends Service
{
    /**
     * UxProxyOrgService constructor.
     * @param $config
     * @throws \Exception
     */
    public function __construct($config)
    {
        if (empty($config['url'])) {
            throw new \Exception('Config property \'url\' must be configured.');
        }
        $this->url = $config['url'];
        parent::__construct($config);
    }

    public function startParse($nextPage = null, $prepareDom = false)
    {
        parent::startParse($nextPage, $prepareDom);
    }

    protected function findProxiesInDom($dom)
    {
        $lines = explode("\n", $dom);
        $lines = array_filter($lines);

        $list = [];

        foreach ($lines as $line) {
            list($ip, $port) = explode(":", $line);
            $list[] = [
                "ip" => $ip,
                "port" => $port,
                "protocol" => "http"
            ];
        }

        return $list;
    }

}