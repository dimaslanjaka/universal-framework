CREATE TABLE `usermeta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT 'User ID',
  `key` text DEFAULT NULL,
  `value` text DEFAULT NULL,
  `other` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='User metadata';
