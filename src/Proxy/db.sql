CREATE TABLE `proxies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `proxy` varchar(50) NOT NULL,
  `ip` varchar(50) NOT NULL,
  `port` int(10) NOT NULL,
  `type` text NOT NULL,
  `status` set('active','inactive') NOT NULL DEFAULT 'active',
  `country` varchar(50) DEFAULT NULL,
  `anonimity` set('transparent','anonymous','elite') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `proxy_port` (`proxy`),
  UNIQUE KEY `ip` (`ip`)
) ENGINE=InnoDB AUTO_INCREMENT=957 DEFAULT CHARSET=utf8mb4;