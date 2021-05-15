CREATE TABLE `userdata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `display_name` varchar(255) NOT NULL DEFAULT 'user',
  `email` varchar(255) NOT NULL DEFAULT 'default@webmanajemen.com',
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created` datetime DEFAULT current_timestamp(),
  `number` text DEFAULT NULL,
  `role` set('superadmin','admin','client','guess','pegawai gudang','kepala gudang') NOT NULL,
  `last_login` datetime DEFAULT current_timestamp(),
  `last_seen` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COMMENT='User Profile and login information';

