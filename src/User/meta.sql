CREATE TABLE IF NOT EXISTS `usermeta` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL COMMENT 'User ID',
  `key` text DEFAULT NULL,
  `value` text DEFAULT NULL,
  `other` text DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = 'User metadata';
ALTER TABLE
  `usermeta`
ADD
  PRIMARY KEY (`id`);
ALTER TABLE
  `usermeta`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 2;
COMMIT;