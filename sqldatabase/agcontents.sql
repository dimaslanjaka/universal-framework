-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 13 Des 2019 pada 22.53
-- Versi server: 10.4.6-MariaDB
-- Versi PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `agcontents`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `agc`
--

CREATE TABLE `agc` (
  `id` mediumint(9) NOT NULL,
  `ids` varchar(255) NOT NULL,
  `author_id` int(255) NOT NULL,
  `title` text DEFAULT NULL,
  `body` longtext DEFAULT NULL,
  `visit` mediumint(11) NOT NULL DEFAULT 0,
  `mp3` mediumint(11) NOT NULL DEFAULT 0,
  `mp4` mediumint(11) NOT NULL DEFAULT 0,
  `google_drive` longtext DEFAULT NULL,
  `base64` longtext DEFAULT NULL,
  `pathname` text DEFAULT NULL,
  `sendto` varchar(255) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `bubo9_commentmeta`
--

CREATE TABLE `bubo9_commentmeta` (
  `meta_id` bigint(20) UNSIGNED NOT NULL,
  `comment_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `meta_key` varchar(255) DEFAULT NULL,
  `meta_value` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur dari tabel `bubo9_comments`
--

CREATE TABLE `bubo9_comments` (
  `comment_ID` bigint(20) UNSIGNED NOT NULL,
  `comment_post_ID` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `comment_author` tinytext NOT NULL,
  `comment_author_email` varchar(100) NOT NULL DEFAULT '',
  `comment_author_url` varchar(200) NOT NULL DEFAULT '',
  `comment_author_IP` varchar(100) NOT NULL DEFAULT '',
  `comment_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_content` text NOT NULL,
  `comment_karma` int(11) NOT NULL DEFAULT 0,
  `comment_approved` varchar(20) NOT NULL DEFAULT '1',
  `comment_agent` varchar(255) NOT NULL DEFAULT '',
  `comment_type` varchar(20) NOT NULL DEFAULT '',
  `comment_parent` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `user_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `bubo9_comments`
--

INSERT INTO `bubo9_comments` (`comment_ID`, `comment_post_ID`, `comment_author`, `comment_author_email`, `comment_author_url`, `comment_author_IP`, `comment_date`, `comment_date_gmt`, `comment_content`, `comment_karma`, `comment_approved`, `comment_agent`, `comment_type`, `comment_parent`, `user_id`) VALUES
(1, 1, 'Mr WordPress', '', 'https://wordpress.org/', '', '2019-12-11 19:04:17', '2019-12-11 19:04:17', 'Hi, this is a comment.\nTo delete a comment, just log in and view the post&#039;s comments. There you will have the option to edit or delete them.', 0, 'post-trashed', '', '', 0, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `bubo9_links`
--

CREATE TABLE `bubo9_links` (
  `link_id` bigint(20) UNSIGNED NOT NULL,
  `link_url` varchar(255) NOT NULL DEFAULT '',
  `link_name` varchar(255) NOT NULL DEFAULT '',
  `link_image` varchar(255) NOT NULL DEFAULT '',
  `link_target` varchar(25) NOT NULL DEFAULT '',
  `link_description` varchar(255) NOT NULL DEFAULT '',
  `link_visible` varchar(20) NOT NULL DEFAULT 'Y',
  `link_owner` bigint(20) UNSIGNED NOT NULL DEFAULT 1,
  `link_rating` int(11) NOT NULL DEFAULT 0,
  `link_updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `link_rel` varchar(255) NOT NULL DEFAULT '',
  `link_notes` mediumtext NOT NULL,
  `link_rss` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur dari tabel `bubo9_options`
--

CREATE TABLE `bubo9_options` (
  `option_id` bigint(20) UNSIGNED NOT NULL,
  `option_name` varchar(191) NOT NULL DEFAULT '',
  `option_value` longtext NOT NULL,
  `autoload` varchar(20) NOT NULL DEFAULT 'yes'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `bubo9_options`
--

INSERT INTO `bubo9_options` (`option_id`, `option_name`, `option_value`, `autoload`) VALUES
(1, 'siteurl', 'http://wp.webmanajemen.com', 'yes'),
(2, 'home', 'http://wp.webmanajemen.com', 'yes'),
(3, 'blogname', 'WMI', 'yes'),
(4, 'blogdescription', 'Website Management Indonesia', 'yes'),
(5, 'users_can_register', '0', 'yes'),
(6, 'admin_email', 'dlanjaka008@gmail.com', 'yes'),
(7, 'start_of_week', '1', 'yes'),
(8, 'use_balanceTags', '0', 'yes'),
(9, 'use_smilies', '1', 'yes'),
(10, 'require_name_email', '1', 'yes'),
(11, 'comments_notify', '1', 'yes'),
(12, 'posts_per_rss', '10', 'yes'),
(13, 'rss_use_excerpt', '0', 'yes'),
(14, 'mailserver_url', 'mail.example.com', 'yes'),
(15, 'mailserver_login', 'login@example.com', 'yes'),
(16, 'mailserver_pass', 'password', 'yes'),
(17, 'mailserver_port', '110', 'yes'),
(18, 'default_category', '1', 'yes'),
(19, 'default_comment_status', 'open', 'yes'),
(20, 'default_ping_status', 'closed', 'yes'),
(21, 'default_pingback_flag', '', 'yes'),
(22, 'posts_per_page', '10', 'yes'),
(23, 'date_format', 'F j, Y', 'yes'),
(24, 'time_format', 'g:i a', 'yes'),
(25, 'links_updated_date_format', 'F j, Y g:i a', 'yes'),
(26, 'comment_moderation', '0', 'yes'),
(27, 'moderation_notify', '1', 'yes'),
(28, 'permalink_structure', '', 'yes'),
(30, 'hack_file', '0', 'yes'),
(31, 'blog_charset', 'UTF-8', 'yes'),
(32, 'moderation_keys', '', 'no'),
(33, 'active_plugins', 'a:2:{i:0;s:17:\"post_inserter.php\";i:1;s:29:\"wp-mail-smtp/wp_mail_smtp.php\";}', 'yes'),
(34, 'category_base', '', 'yes'),
(35, 'ping_sites', 'http://rpc.pingomatic.com/\nhttp://feedburner.google.com/fb/a/pingSubmit?bloglink=http://yourwebsite.com/\nhttp://rpc.weblogs.com/pingSiteForm?name=YourWebsite&url=http://yourwebsite.com\nhttp://bing.com/webmaster/ping.aspx\nhttp://ping.blo.gs/\nhttp://blog.goo.ne.jp/XMLRPC\nhttp://blog.with2.net/ping.php\nhttp://blogping.unidatum.com/RPC2\nhttp://blogpingr.de/ping/rpc2\nhttps://ping.blogs.yandex.ru/RPC2\nhttp://blogsearch.google.ae/ping/RPC2\nhttp://blogsearch.google.at/ping/RPC2\nhttp://blogsearch.google.be/ping/RPC2\nhttp://blogsearch.google.bg/ping/RPC2\nhttp://blogsearch.google.ca/ping/RPC2\nhttp://blogsearch.google.ch/ping/RPC2\nhttp://blogsearch.google.cl/ping/RPC2\nhttp://blogsearch.google.co.cr/ping/RPC2\nhttp://blogsearch.google.co.hu/ping/RPC2\nhttp://blogsearch.google.co.id/ping/RPC2\nhttp://blogsearch.google.co.il/ping/RPC2\nhttp://blogsearch.google.co.in/ping/RPC2\nhttp://blogsearch.google.co.it/ping/RPC2\nhttp://blogsearch.google.co.jp/ping/RPC2\nhttp://blogsearch.google.co.ma/ping/RPC2\nhttp://blogsearch.google.co.nz/ping/RPC2\nhttp://blogsearch.google.co.th/ping/RPC2\nhttp://blogsearch.google.co.uk/ping/RPC2\nhttp://blogsearch.google.co.ve/ping/RPC2\nhttp://blogsearch.google.co.za/ping/RPC2\nhttp://blogsearch.google.com.ar/ping/RPC2\nhttp://blogsearch.google.com.au/ping/RPC2\nhttp://blogsearch.google.com.br/ping/RPC2\nhttp://blogsearch.google.com.co/ping/RPC2\nhttp://blogsearch.google.com.do/ping/RPC2\nhttp://blogsearch.google.com.mx/ping/RPC2\nhttp://blogsearch.google.com.my/ping/RPC2\nhttp://blogsearch.google.com.pe/ping/RPC2\nhttp://blogsearch.google.com.sa/ping/RPC2\nhttp://blogsearch.google.com.sg/ping/RPC2\nhttp://blogsearch.google.com.tr/ping/RPC2\nhttp://blogsearch.google.com.tw/ping/RPC2\nhttp://blogsearch.google.com.ua/ping/RPC2\nhttp://blogsearch.google.com.uy/ping/RPC2\nhttp://blogsearch.google.com.vn/ping/RPC2\nhttp://blogsearch.google.com/ping/RPC2\nhttp://blogsearch.google.de/ping/RPC2\nhttp://blogsearch.google.es/ping/RPC2\nhttp://blogsearch.google.fi/ping/RPC2\nhttp://blogsearch.google.fr/ping/RPC2\nhttp://blogsearch.google.gr/ping/RPC2\nhttp://blogsearch.google.hr/ping/RPC2\nhttp://blogsearch.google.ie/ping/RPC2\nhttp://blogsearch.google.in/ping/RPC2\nhttp://blogsearch.google.it/ping/RPC2\nhttp://blogsearch.google.jp/ping/RPC2\nhttp://blogsearch.google.ki/ping/RPC2\nhttp://blogsearch.google.kz/ping/RPC2\nhttp://blogsearch.google.la/ping/RPC2\nhttp://blogsearch.google.li/ping/RPC2\nhttp://blogsearch.google.lk/ping/RPC2\nhttp://blogsearch.google.lt/ping/RPC2\nhttp://blogsearch.google.lu/ping/RPC2\nhttp://blogsearch.google.md/ping/RPC2\nhttp://blogsearch.google.mn/ping/RPC2\nhttp://blogsearch.google.ms/ping/RPC2\nhttp://blogsearch.google.mu/ping/RPC2\nhttp://blogsearch.google.mv/ping/RPC2\nhttp://blogsearch.google.mw/ping/RPC2\nhttp://blogsearch.google.nl/ping/RPC2\nhttp://blogsearch.google.no/ping/RPC2\nhttp://blogsearch.google.nr/ping/RPC2\nhttp://blogsearch.google.nu/ping/RPC2\nhttp://blogsearch.google.pl/ping/RPC2\nhttp://blogsearch.google.pn/ping/RPC2\nhttp://blogsearch.google.pt/ping/RPC2\nhttp://blogsearch.google.ro/ping/RPC2\nhttp://blogsearch.google.ru/ping/RPC2\nhttp://blogsearch.google.rw/ping/RPC2\nhttp://blogsearch.google.sc/ping/RPC2\nhttp://blogsearch.google.se/ping/RPC2\nhttp://blogsearch.google.sh/ping/RPC2\nhttp://blogsearch.google.si/ping/RPC2\nhttp://blogsearch.google.sk/ping/RPC2\nhttp://blogsearch.google.sm/ping/RPC2\nhttp://blogsearch.google.sn/ping/RPC2\nhttp://blogsearch.google.st/ping/RPC2\nhttp://blogsearch.google.tk/ping/RPC2\nhttp://blogsearch.google.tl/ping/RPC2\nhttp://blogsearch.google.tm/ping/RPC2\nhttp://blogsearch.google.to/ping/RPC2\nhttp://blogsearch.google.tp/ping/RPC2\nhttp://blogsearch.google.tt/ping/RPC2\nhttp://blogsearch.google.tw/ping/RPC2\nhttp://blogsearch.google.us/ping/RPC2\nhttp://blogsearch.google.vg/ping/RPC2\nhttp://blogsearch.google.vu/ping/RPC2\nhttp://blogsearch.google.ws/ping/RPC2\nhttp://news2paper.com/ping\nhttp://ping.bloggers.jp/rpc\nhttp://ping.fc2.com\nhttp://ping.rss.drecom.jp\nhttp://rpc.bloggerei.de/ping/\nhttp://rpc.pingomatic.com\nhttp://rpc.technorati.com/rpc/ping\nhttp://rpc.twingly.com\nhttp://services.newsgator.com/ngws/xmlrpcping.aspx\nhttp://api.feedster.com/ping\nhttp://api.moreover.com/RPC2\nhttp://api.moreover.com/ping\nhttp://www.blogdigger.com/RPC2\nhttp://www.blogshares.com/rpc.php\nhttp://www.blogsnow.com/ping\nhttp://www.blogstreet.com/xrbin/xmlrpc.cgi\nhttp://bulkfeeds.net/rpc\nhttp://www.newsisfree.com/xmlrpctest.php\nhttp://ping.feedburner.com\nhttp://ping.syndic8.com/xmlrpc.php\nhttp://ping.weblogalot.com/rpc.php\nhttp://rpc.blogrolling.com/pinger/\nhttp://rpc.weblogs.com/RPC2\nhttp://www.feedsubmitter.com\nhttp://blo.gs/ping.php\nhttp://www.pingerati.net\nhttp://www.pingmyblog.com\nhttp://geourl.org/ping\nhttp://ipings.com\nhttp://www.weblogalot.com/ping\nhttp://rpc.pingomatic.com/\nhttp://rpc.blogbuzzmachine.com/RPC2\nhttp://ping.fc2.com/\nhttp://blogs.yandex.ru/\nhttp://rpc.bloggerei.de/\nhttp://ping.blogs.yandex.ru/RPC2\nhttp://ping.rss.drecom.jp/\nhttp://rpc.odiogo.com/ping/\nhttp://mod-pubsub.org/kn_apps/blogchatt\nhttp://ping.amagle.com/\nhttp://ping.bloggers.jp/rpc/\nhttp://ping.exblog.jp/xmlrpc\nhttp://bblog.com/ping.php\nhttp://bitacoras.net/ping\nhttp://blogdb.jp/xmlrpc\nhttp://blogmatcher.com/u.php\nhttp://coreblog.org/ping/\nhttp://www.lasermemory.com/lsrpc/\nhttp://ping.rootblog.com/rpc.php\nhttp://pingoat.com/goat/RPC2\nhttp://topicexchange.com/RPC2\nhttp://trackback.bakeinu.jp/bakeping.php\nhttp://www.bitacoles.net/ping.php\nhttp://www.blogoole.com/ping/\nhttp://www.blogpeople.net/servlet/weblogUpdates\nhttp://www.mod-pubsub.org/kn_apps/blogchatter/ping.php\nhttp://www.newsisfree.com/RPCCloud\nhttp://www.snipsnap.org/RPC2\nhttp://www.weblogues.com/RPC/\nhttp://xmlrpc.blogg.de\nhttp://rpc.twingly.com\nhttp://www.blogsnow.com/ping\nhttp://www.blogstreet.com/xrbin/xmlrpc.cgi\nhttp://bulkfeeds.net/rpc\nhttp://www.newsisfree.com/xmlrpctest.php\nhttp://ping.blo.gs/\nhttp://ping.feedburner.com\nhttp://rpc.blogrolling.com/pinger/\nhttp://rpc.technorati.com/rpc/ping\nhttp://rpc.weblogs.com/RPC2\nhttp://www.feedsubmitter.com\nhttp://blo.gs/ping.php\nhttp://www.pingmyblog.com', 'yes'),
(36, 'comment_max_links', '2', 'yes'),
(37, 'gmt_offset', '0', 'yes'),
(38, 'default_email_category', '1', 'yes'),
(39, 'recently_edited', '', 'no'),
(40, 'template', 'twentyseventeen', 'yes'),
(41, 'stylesheet', 'twentyseventeen', 'yes'),
(42, 'comment_whitelist', '1', 'yes'),
(43, 'blacklist_keys', '', 'no'),
(44, 'comment_registration', '0', 'yes'),
(45, 'html_type', 'text/html', 'yes'),
(46, 'use_trackback', '0', 'yes'),
(47, 'default_role', 'subscriber', 'yes'),
(48, 'db_version', '45805', 'yes'),
(49, 'uploads_use_yearmonth_folders', '1', 'yes'),
(50, 'upload_path', '', 'yes'),
(51, 'blog_public', '1', 'yes'),
(52, 'default_link_category', '0', 'yes'),
(53, 'show_on_front', 'posts', 'yes'),
(54, 'tag_base', '', 'yes'),
(55, 'show_avatars', '1', 'yes'),
(56, 'avatar_rating', 'G', 'yes'),
(57, 'upload_url_path', '', 'yes'),
(58, 'thumbnail_size_w', '150', 'yes'),
(59, 'thumbnail_size_h', '150', 'yes'),
(60, 'thumbnail_crop', '1', 'yes'),
(61, 'medium_size_w', '300', 'yes'),
(62, 'medium_size_h', '300', 'yes'),
(63, 'avatar_default', 'mystery', 'yes'),
(64, 'large_size_w', '1024', 'yes'),
(65, 'large_size_h', '1024', 'yes'),
(66, 'image_default_link_type', 'none', 'yes'),
(67, 'image_default_size', '', 'yes'),
(68, 'image_default_align', '', 'yes'),
(69, 'close_comments_for_old_posts', '0', 'yes'),
(70, 'close_comments_days_old', '14', 'yes'),
(71, 'thread_comments', '1', 'yes'),
(72, 'thread_comments_depth', '5', 'yes'),
(73, 'page_comments', '0', 'yes'),
(74, 'comments_per_page', '50', 'yes'),
(75, 'default_comments_page', 'newest', 'yes'),
(76, 'comment_order', 'asc', 'yes'),
(77, 'sticky_posts', 'a:0:{}', 'yes'),
(78, 'widget_categories', 'a:2:{i:2;a:4:{s:5:\"title\";s:0:\"\";s:5:\"count\";i:0;s:12:\"hierarchical\";i:0;s:8:\"dropdown\";i:0;}s:12:\"_multiwidget\";i:1;}', 'yes'),
(79, 'widget_text', 'a:0:{}', 'yes'),
(80, 'widget_rss', 'a:0:{}', 'yes'),
(81, 'uninstall_plugins', 'a:0:{}', 'no'),
(82, 'timezone_string', '', 'yes'),
(83, 'page_for_posts', '0', 'yes'),
(84, 'page_on_front', '0', 'yes'),
(85, 'default_post_format', '0', 'yes'),
(86, 'link_manager_enabled', '0', 'yes'),
(87, 'finished_splitting_shared_terms', '1', 'yes'),
(88, 'site_icon', '0', 'yes'),
(89, 'medium_large_size_w', '768', 'yes'),
(90, 'medium_large_size_h', '0', 'yes'),
(91, 'initial_db_version', '36686', 'yes'),
(92, 'bUBO9_user_roles', 'a:5:{s:13:\"administrator\";a:2:{s:4:\"name\";s:13:\"Administrator\";s:12:\"capabilities\";a:61:{s:13:\"switch_themes\";b:1;s:11:\"edit_themes\";b:1;s:16:\"activate_plugins\";b:1;s:12:\"edit_plugins\";b:1;s:10:\"edit_users\";b:1;s:10:\"edit_files\";b:1;s:14:\"manage_options\";b:1;s:17:\"moderate_comments\";b:1;s:17:\"manage_categories\";b:1;s:12:\"manage_links\";b:1;s:12:\"upload_files\";b:1;s:6:\"import\";b:1;s:15:\"unfiltered_html\";b:1;s:10:\"edit_posts\";b:1;s:17:\"edit_others_posts\";b:1;s:20:\"edit_published_posts\";b:1;s:13:\"publish_posts\";b:1;s:10:\"edit_pages\";b:1;s:4:\"read\";b:1;s:8:\"level_10\";b:1;s:7:\"level_9\";b:1;s:7:\"level_8\";b:1;s:7:\"level_7\";b:1;s:7:\"level_6\";b:1;s:7:\"level_5\";b:1;s:7:\"level_4\";b:1;s:7:\"level_3\";b:1;s:7:\"level_2\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:17:\"edit_others_pages\";b:1;s:20:\"edit_published_pages\";b:1;s:13:\"publish_pages\";b:1;s:12:\"delete_pages\";b:1;s:19:\"delete_others_pages\";b:1;s:22:\"delete_published_pages\";b:1;s:12:\"delete_posts\";b:1;s:19:\"delete_others_posts\";b:1;s:22:\"delete_published_posts\";b:1;s:20:\"delete_private_posts\";b:1;s:18:\"edit_private_posts\";b:1;s:18:\"read_private_posts\";b:1;s:20:\"delete_private_pages\";b:1;s:18:\"edit_private_pages\";b:1;s:18:\"read_private_pages\";b:1;s:12:\"delete_users\";b:1;s:12:\"create_users\";b:1;s:17:\"unfiltered_upload\";b:1;s:14:\"edit_dashboard\";b:1;s:14:\"update_plugins\";b:1;s:14:\"delete_plugins\";b:1;s:15:\"install_plugins\";b:1;s:13:\"update_themes\";b:1;s:14:\"install_themes\";b:1;s:11:\"update_core\";b:1;s:10:\"list_users\";b:1;s:12:\"remove_users\";b:1;s:13:\"promote_users\";b:1;s:18:\"edit_theme_options\";b:1;s:13:\"delete_themes\";b:1;s:6:\"export\";b:1;}}s:6:\"editor\";a:2:{s:4:\"name\";s:6:\"Editor\";s:12:\"capabilities\";a:34:{s:17:\"moderate_comments\";b:1;s:17:\"manage_categories\";b:1;s:12:\"manage_links\";b:1;s:12:\"upload_files\";b:1;s:15:\"unfiltered_html\";b:1;s:10:\"edit_posts\";b:1;s:17:\"edit_others_posts\";b:1;s:20:\"edit_published_posts\";b:1;s:13:\"publish_posts\";b:1;s:10:\"edit_pages\";b:1;s:4:\"read\";b:1;s:7:\"level_7\";b:1;s:7:\"level_6\";b:1;s:7:\"level_5\";b:1;s:7:\"level_4\";b:1;s:7:\"level_3\";b:1;s:7:\"level_2\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:17:\"edit_others_pages\";b:1;s:20:\"edit_published_pages\";b:1;s:13:\"publish_pages\";b:1;s:12:\"delete_pages\";b:1;s:19:\"delete_others_pages\";b:1;s:22:\"delete_published_pages\";b:1;s:12:\"delete_posts\";b:1;s:19:\"delete_others_posts\";b:1;s:22:\"delete_published_posts\";b:1;s:20:\"delete_private_posts\";b:1;s:18:\"edit_private_posts\";b:1;s:18:\"read_private_posts\";b:1;s:20:\"delete_private_pages\";b:1;s:18:\"edit_private_pages\";b:1;s:18:\"read_private_pages\";b:1;}}s:6:\"author\";a:2:{s:4:\"name\";s:6:\"Author\";s:12:\"capabilities\";a:10:{s:12:\"upload_files\";b:1;s:10:\"edit_posts\";b:1;s:20:\"edit_published_posts\";b:1;s:13:\"publish_posts\";b:1;s:4:\"read\";b:1;s:7:\"level_2\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:12:\"delete_posts\";b:1;s:22:\"delete_published_posts\";b:1;}}s:11:\"contributor\";a:2:{s:4:\"name\";s:11:\"Contributor\";s:12:\"capabilities\";a:5:{s:10:\"edit_posts\";b:1;s:4:\"read\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:12:\"delete_posts\";b:1;}}s:10:\"subscriber\";a:2:{s:4:\"name\";s:10:\"Subscriber\";s:12:\"capabilities\";a:2:{s:4:\"read\";b:1;s:7:\"level_0\";b:1;}}}', 'yes'),
(93, 'widget_search', 'a:2:{i:2;a:1:{s:5:\"title\";s:0:\"\";}s:12:\"_multiwidget\";i:1;}', 'yes'),
(94, 'widget_recent-posts', 'a:2:{i:2;a:2:{s:5:\"title\";s:0:\"\";s:6:\"number\";i:5;}s:12:\"_multiwidget\";i:1;}', 'yes'),
(95, 'widget_recent-comments', 'a:2:{i:2;a:2:{s:5:\"title\";s:0:\"\";s:6:\"number\";i:5;}s:12:\"_multiwidget\";i:1;}', 'yes'),
(96, 'widget_archives', 'a:2:{i:2;a:3:{s:5:\"title\";s:0:\"\";s:5:\"count\";i:0;s:8:\"dropdown\";i:1;}s:12:\"_multiwidget\";i:1;}', 'yes'),
(97, 'widget_meta', 'a:1:{s:12:\"_multiwidget\";i:1;}', 'yes'),
(98, 'sidebars_widgets', 'a:5:{s:19:\"wp_inactive_widgets\";a:0:{}s:9:\"sidebar-1\";a:5:{i:0;s:8:\"search-2\";i:1;s:14:\"recent-posts-2\";i:2;s:17:\"recent-comments-2\";i:3;s:10:\"archives-2\";i:4;s:12:\"categories-2\";}s:9:\"sidebar-2\";a:0:{}s:9:\"sidebar-3\";a:0:{}s:13:\"array_version\";i:3;}', 'yes'),
(99, 'widget_pages', 'a:1:{s:12:\"_multiwidget\";i:1;}', 'yes'),
(100, 'widget_calendar', 'a:1:{s:12:\"_multiwidget\";i:1;}', 'yes'),
(101, 'widget_tag_cloud', 'a:1:{s:12:\"_multiwidget\";i:1;}', 'yes'),
(102, 'widget_nav_menu', 'a:1:{s:12:\"_multiwidget\";i:1;}', 'yes'),
(103, 'cron', 'a:7:{i:1576184659;a:1:{s:34:\"wp_privacy_delete_old_export_files\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:6:\"hourly\";s:4:\"args\";a:0:{}s:8:\"interval\";i:3600;}}}i:1576208906;a:2:{s:17:\"wp_update_plugins\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:10:\"twicedaily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:43200;}}s:16:\"wp_update_themes\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:10:\"twicedaily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:43200;}}}i:1576263858;a:1:{s:32:\"recovery_mode_clean_expired_keys\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:5:\"daily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:86400;}}}i:1576263862;a:1:{s:16:\"wp_version_check\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:10:\"twicedaily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:43200;}}}i:1576265055;a:2:{s:19:\"wp_scheduled_delete\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:5:\"daily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:86400;}}s:25:\"delete_expired_transients\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:5:\"daily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:86400;}}}i:1576265588;a:1:{s:30:\"wp_scheduled_auto_draft_delete\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:5:\"daily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:86400;}}}s:7:\"version\";i:2;}', 'yes'),
(105, '_transient_twentysixteen_categories', '1', 'yes'),
(106, 'WPLANG', '', 'yes'),
(107, 'widget_media_audio', 'a:1:{s:12:\"_multiwidget\";i:1;}', 'yes'),
(108, 'widget_media_image', 'a:1:{s:12:\"_multiwidget\";i:1;}', 'yes'),
(109, 'widget_media_gallery', 'a:1:{s:12:\"_multiwidget\";i:1;}', 'yes'),
(110, 'widget_media_video', 'a:1:{s:12:\"_multiwidget\";i:1;}', 'yes'),
(111, 'widget_custom_html', 'a:1:{s:12:\"_multiwidget\";i:1;}', 'yes'),
(113, 'rewrite_rules', '', 'yes'),
(114, 'wp_page_for_privacy_policy', '0', 'yes'),
(115, 'show_comments_cookies_opt_in', '1', 'yes'),
(116, 'admin_email_lifespan', '0', 'yes'),
(117, 'db_upgraded', '', 'yes'),
(118, 'can_compress_scripts', '0', 'yes'),
(119, 'theme_mods_twentyseventeen', 'a:1:{s:18:\"custom_css_post_id\";i:-1;}', 'yes'),
(124, 'recovery_keys', 'a:0:{}', 'yes'),
(129, 'new_admin_email', 'dlanjaka008@gmail.com', 'yes'),
(130, 'adminhash', 'a:2:{s:4:\"hash\";s:32:\"d59cc4c6d5a8d8f34ccf8bfd8d20b1ba\";s:8:\"newemail\";s:22:\"dimaslanjaka@gmail.com\";}', 'yes'),
(142, 'recently_activated', 'a:0:{}', 'yes'),
(146, '_site_transient_timeout_browser_2894fb4dbf964f58ccf3d2e4e372b316', '1576697587', 'no'),
(147, '_site_transient_browser_2894fb4dbf964f58ccf3d2e4e372b316', 'a:10:{s:4:\"name\";s:6:\"Chrome\";s:7:\"version\";s:13:\"78.0.3904.108\";s:8:\"platform\";s:7:\"Windows\";s:10:\"update_url\";s:29:\"https://www.google.com/chrome\";s:7:\"img_src\";s:43:\"http://s.w.org/images/browsers/chrome.png?1\";s:11:\"img_src_ssl\";s:44:\"https://s.w.org/images/browsers/chrome.png?1\";s:15:\"current_version\";s:2:\"18\";s:7:\"upgrade\";b:0;s:8:\"insecure\";b:0;s:6:\"mobile\";b:0;}', 'no'),
(148, '_site_transient_timeout_php_check_cd0d3c01d5de47172fb0980b9e484085', '1576697588', 'no'),
(149, '_site_transient_php_check_cd0d3c01d5de47172fb0980b9e484085', 'a:5:{s:19:\"recommended_version\";s:3:\"7.3\";s:15:\"minimum_version\";s:6:\"5.6.20\";s:12:\"is_supported\";b:1;s:9:\"is_secure\";b:1;s:13:\"is_acceptable\";b:1;}', 'no'),
(153, '_transient_timeout_feed_9bbd59226dc36b9b26cd43f15694c5c3', '1576135992', 'no'),
(156, '_transient_timeout_feed_d117b5738fbd35bd8c0391cda1f2b5d9', '1576135994', 'no'),
(161, 'recovery_mode_email_last_sent', '1576093752', 'yes'),
(162, '_transient_is_multi_author', '0', 'yes'),
(163, 'fresh_site', '0', 'yes'),
(169, 'wp_mail_smtp_initial_version', '1.7.1', 'no'),
(170, 'wp_mail_smtp_version', '1.7.1', 'no'),
(171, 'wp_mail_smtp', 'a:6:{s:4:\"mail\";a:6:{s:10:\"from_email\";s:23:\"dimascyber008@gmail.com\";s:9:\"from_name\";s:3:\"WMI\";s:6:\"mailer\";s:4:\"smtp\";s:11:\"return_path\";b:0;s:16:\"from_email_force\";b:0;s:15:\"from_name_force\";b:0;}s:4:\"smtp\";a:7:{s:7:\"autotls\";b:1;s:4:\"auth\";b:1;s:4:\"host\";s:14:\"smtp.gmail.com\";s:10:\"encryption\";s:3:\"ssl\";s:4:\"port\";i:465;s:4:\"user\";s:23:\"dimascyber008@gmail.com\";s:4:\"pass\";s:0:\"\";}s:10:\"sendinblue\";a:1:{s:7:\"api_key\";s:0:\"\";}s:7:\"mailgun\";a:3:{s:7:\"api_key\";s:0:\"\";s:6:\"domain\";s:0:\"\";s:6:\"region\";s:2:\"US\";}s:8:\"sendgrid\";a:1:{s:7:\"api_key\";s:0:\"\";}s:5:\"gmail\";a:2:{s:9:\"client_id\";s:0:\"\";s:13:\"client_secret\";s:0:\"\";}}', 'no'),
(172, 'wp_mail_smtp_debug', 'a:0:{}', 'no'),
(176, '_site_transient_update_core', 'O:8:\"stdClass\":4:{s:7:\"updates\";a:1:{i:0;O:8:\"stdClass\":10:{s:8:\"response\";s:6:\"latest\";s:8:\"download\";s:57:\"https://downloads.wordpress.org/release/wordpress-5.3.zip\";s:6:\"locale\";s:5:\"en_US\";s:8:\"packages\";O:8:\"stdClass\":5:{s:4:\"full\";s:57:\"https://downloads.wordpress.org/release/wordpress-5.3.zip\";s:10:\"no_content\";s:68:\"https://downloads.wordpress.org/release/wordpress-5.3-no-content.zip\";s:11:\"new_bundled\";s:69:\"https://downloads.wordpress.org/release/wordpress-5.3-new-bundled.zip\";s:7:\"partial\";b:0;s:8:\"rollback\";b:0;}s:7:\"current\";s:3:\"5.3\";s:7:\"version\";s:3:\"5.3\";s:11:\"php_version\";s:6:\"5.6.20\";s:13:\"mysql_version\";s:3:\"5.0\";s:11:\"new_bundled\";s:3:\"5.3\";s:15:\"partial_version\";s:0:\"\";}}s:12:\"last_checked\";i:1576099641;s:15:\"version_checked\";s:3:\"5.3\";s:12:\"translations\";a:0:{}}', 'no'),
(177, '_site_transient_update_plugins', 'O:8:\"stdClass\":4:{s:12:\"last_checked\";i:1576182533;s:8:\"response\";a:1:{s:29:\"wp-mail-smtp/wp_mail_smtp.php\";O:8:\"stdClass\":12:{s:2:\"id\";s:26:\"w.org/plugins/wp-mail-smtp\";s:4:\"slug\";s:12:\"wp-mail-smtp\";s:6:\"plugin\";s:29:\"wp-mail-smtp/wp_mail_smtp.php\";s:11:\"new_version\";s:5:\"1.8.0\";s:3:\"url\";s:43:\"https://wordpress.org/plugins/wp-mail-smtp/\";s:7:\"package\";s:61:\"https://downloads.wordpress.org/plugin/wp-mail-smtp.1.8.0.zip\";s:5:\"icons\";a:2:{s:2:\"2x\";s:65:\"https://ps.w.org/wp-mail-smtp/assets/icon-256x256.png?rev=1755440\";s:2:\"1x\";s:65:\"https://ps.w.org/wp-mail-smtp/assets/icon-128x128.png?rev=1755440\";}s:7:\"banners\";a:2:{s:2:\"2x\";s:68:\"https://ps.w.org/wp-mail-smtp/assets/banner-1544x500.png?rev=2120094\";s:2:\"1x\";s:67:\"https://ps.w.org/wp-mail-smtp/assets/banner-772x250.png?rev=2120094\";}s:11:\"banners_rtl\";a:0:{}s:6:\"tested\";s:3:\"5.3\";s:12:\"requires_php\";s:3:\"5.3\";s:13:\"compatibility\";O:8:\"stdClass\":0:{}}}s:12:\"translations\";a:0:{}s:9:\"no_update\";a:0:{}}', 'no'),
(180, '_site_transient_update_themes', 'O:8:\"stdClass\":4:{s:12:\"last_checked\";i:1576182537;s:7:\"checked\";a:4:{s:14:\"twentynineteen\";s:3:\"1.4\";s:15:\"twentyseventeen\";s:3:\"2.2\";s:13:\"twentysixteen\";s:3:\"2.0\";s:12:\"twentytwenty\";s:3:\"1.0\";}s:8:\"response\";a:0:{}s:12:\"translations\";a:0:{}}', 'no'),
(183, '_site_transient_timeout_theme_roots', '1576184334', 'no'),
(184, '_site_transient_theme_roots', 'a:4:{s:14:\"twentynineteen\";s:7:\"/themes\";s:15:\"twentyseventeen\";s:7:\"/themes\";s:13:\"twentysixteen\";s:7:\"/themes\";s:12:\"twentytwenty\";s:7:\"/themes\";}', 'no');

-- --------------------------------------------------------

--
-- Struktur dari tabel `bubo9_postmeta`
--

CREATE TABLE `bubo9_postmeta` (
  `meta_id` bigint(20) UNSIGNED NOT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `meta_key` varchar(255) DEFAULT NULL,
  `meta_value` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `bubo9_postmeta`
--

INSERT INTO `bubo9_postmeta` (`meta_id`, `post_id`, `meta_key`, `meta_value`) VALUES
(1, 2, '_wp_page_template', 'default'),
(2, 1, '_wp_trash_meta_status', 'publish'),
(3, 1, '_wp_trash_meta_time', '1576092816'),
(4, 1, '_wp_desired_post_slug', 'hello-world'),
(5, 1, '_wp_trash_meta_comments_status', 'a:1:{i:1;s:1:\"1\";}');

-- --------------------------------------------------------

--
-- Struktur dari tabel `bubo9_posts`
--

CREATE TABLE `bubo9_posts` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `post_author` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `post_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content` longtext NOT NULL,
  `post_title` text NOT NULL,
  `post_excerpt` text NOT NULL,
  `post_status` varchar(20) NOT NULL DEFAULT 'publish',
  `comment_status` varchar(20) NOT NULL DEFAULT 'open',
  `ping_status` varchar(20) NOT NULL DEFAULT 'open',
  `post_password` varchar(255) NOT NULL DEFAULT '',
  `post_name` varchar(200) NOT NULL DEFAULT '',
  `to_ping` text NOT NULL,
  `pinged` text NOT NULL,
  `post_modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_modified_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content_filtered` longtext NOT NULL,
  `post_parent` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `guid` varchar(255) NOT NULL DEFAULT '',
  `menu_order` int(11) NOT NULL DEFAULT 0,
  `post_type` varchar(20) NOT NULL DEFAULT 'post',
  `post_mime_type` varchar(100) NOT NULL DEFAULT '',
  `comment_count` bigint(20) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `bubo9_posts`
--

INSERT INTO `bubo9_posts` (`ID`, `post_author`, `post_date`, `post_date_gmt`, `post_content`, `post_title`, `post_excerpt`, `post_status`, `comment_status`, `ping_status`, `post_password`, `post_name`, `to_ping`, `pinged`, `post_modified`, `post_modified_gmt`, `post_content_filtered`, `post_parent`, `guid`, `menu_order`, `post_type`, `post_mime_type`, `comment_count`) VALUES
(1, 1, '2016-05-10 03:48:21', '2016-05-10 03:48:21', 'Welcome to WordPress. This is your first post. Edit or delete it, then start writing!', 'Hello world!', '', 'trash', 'open', 'closed', '', 'hello-world__trashed', '', '', '2019-12-11 19:33:36', '2019-12-11 19:33:36', '', 0, 'http://wp.webmanajemen.com/?p=1', 0, 'post', '', 1),
(2, 1, '2016-05-10 03:48:21', '2016-05-10 03:48:21', 'This is an example page. It\'s different from a blog post because it will stay in one place and will show up in your site navigation (in most themes). Most people start with an About page that introduces them to potential site visitors. It might say something like this:\n\n<blockquote>Hi there! I\'m a bike messenger by day, aspiring actor by night, and this is my website. I live in Los Angeles, have a great dog named Jack, and I like pi&#241;a coladas. (And gettin\' caught in the rain.)</blockquote>\n\n...or something like this:\n\n<blockquote>The XYZ Doohickey Company was founded in 1971, and has been providing quality doohickeys to the public ever since. Located in Gotham City, XYZ employs over 2,000 people and does all kinds of awesome things for the Gotham community.</blockquote>\n\nAs a new WordPress user, you should go to <a href=\"http://wp.webmanajemen.com/wp-admin/\">your dashboard</a> to delete this page and create new pages for your content. Have fun!', 'Sample Page', '', 'publish', 'closed', 'closed', '', 'sample-page', '', '', '2016-05-10 03:48:21', '2016-05-10 03:48:21', '', 0, 'http://wp.webmanajemen.com/?page_id=2', 0, 'page', '', 0),
(3, 1, '2019-12-11 19:33:08', '0000-00-00 00:00:00', '', 'Auto Draft', '', 'auto-draft', 'open', 'closed', '', '', '', '', '2019-12-11 19:33:08', '0000-00-00 00:00:00', '', 0, 'http://wp.webmanajemen.com/?p=3', 0, 'post', '', 0),
(4, 1, '2019-12-11 19:33:36', '2019-12-11 19:33:36', 'Welcome to WordPress. This is your first post. Edit or delete it, then start writing!', 'Hello world!', '', 'inherit', 'closed', 'closed', '', '1-revision-v1', '', '', '2019-12-11 19:33:36', '2019-12-11 19:33:36', '', 1, 'http://wp.webmanajemen.com/?p=4', 0, 'revision', '', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `bubo9_termmeta`
--

CREATE TABLE `bubo9_termmeta` (
  `meta_id` bigint(20) UNSIGNED NOT NULL,
  `term_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `meta_key` varchar(255) DEFAULT NULL,
  `meta_value` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur dari tabel `bubo9_terms`
--

CREATE TABLE `bubo9_terms` (
  `term_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(200) NOT NULL DEFAULT '',
  `slug` varchar(200) NOT NULL DEFAULT '',
  `term_group` bigint(10) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `bubo9_terms`
--

INSERT INTO `bubo9_terms` (`term_id`, `name`, `slug`, `term_group`) VALUES
(1, 'Uncategorized', 'uncategorized', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `bubo9_term_relationships`
--

CREATE TABLE `bubo9_term_relationships` (
  `object_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `term_taxonomy_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `term_order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `bubo9_term_relationships`
--

INSERT INTO `bubo9_term_relationships` (`object_id`, `term_taxonomy_id`, `term_order`) VALUES
(1, 1, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `bubo9_term_taxonomy`
--

CREATE TABLE `bubo9_term_taxonomy` (
  `term_taxonomy_id` bigint(20) UNSIGNED NOT NULL,
  `term_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `taxonomy` varchar(32) NOT NULL DEFAULT '',
  `description` longtext NOT NULL,
  `parent` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `count` bigint(20) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `bubo9_term_taxonomy`
--

INSERT INTO `bubo9_term_taxonomy` (`term_taxonomy_id`, `term_id`, `taxonomy`, `description`, `parent`, `count`) VALUES
(1, 1, 'category', '', 0, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `bubo9_usermeta`
--

CREATE TABLE `bubo9_usermeta` (
  `umeta_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `meta_key` varchar(255) DEFAULT NULL,
  `meta_value` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `bubo9_usermeta`
--

INSERT INTO `bubo9_usermeta` (`umeta_id`, `user_id`, `meta_key`, `meta_value`) VALUES
(1, 1, 'nickname', 'dlanjaka008_o678ybqb'),
(2, 1, 'first_name', 'Dimas'),
(3, 1, 'last_name', 'Lanjaka'),
(4, 1, 'description', ''),
(5, 1, 'rich_editing', 'true'),
(6, 1, 'comment_shortcuts', 'false'),
(7, 1, 'admin_color', 'fresh'),
(8, 1, 'use_ssl', '0'),
(9, 1, 'show_admin_bar_front', 'true'),
(10, 1, 'bUBO9_capabilities', 'a:1:{s:13:\"administrator\";b:1;}'),
(11, 1, 'bUBO9_user_level', '10'),
(12, 1, 'dismissed_wp_pointers', ''),
(13, 1, 'show_welcome_panel', '0'),
(14, 1, 'syntax_highlighting', 'true'),
(15, 1, 'locale', ''),
(16, 1, 'session_tokens', 'a:1:{s:64:\"c8a40a7274e218c6c56b5b76c7e32905118fdf4bde5bba07519ff996f977cafa\";a:4:{s:10:\"expiration\";i:1576265043;s:2:\"ip\";s:12:\"36.82.97.123\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1576092243;}}'),
(17, 1, 'bUBO9_dashboard_quick_press_last_post_id', '3'),
(18, 1, 'community-events-location', 'a:1:{s:2:\"ip\";s:10:\"36.82.97.0\";}'),
(19, 1, 'closedpostboxes_dashboard', 'a:1:{i:0;s:21:\"dashboard_quick_press\";}'),
(20, 1, 'metaboxhidden_dashboard', 'a:0:{}'),
(21, 1, '_new_email', 'a:2:{s:4:\"hash\";s:32:\"a2348607e434bb76891ddb9f88faffad\";s:8:\"newemail\";s:22:\"dimaslanjaka@gmail.com\";}');

-- --------------------------------------------------------

--
-- Struktur dari tabel `bubo9_users`
--

CREATE TABLE `bubo9_users` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `user_login` varchar(60) NOT NULL DEFAULT '',
  `user_pass` varchar(255) NOT NULL DEFAULT '',
  `user_nicename` varchar(50) NOT NULL DEFAULT '',
  `user_email` varchar(100) NOT NULL DEFAULT '',
  `user_url` varchar(100) NOT NULL DEFAULT '',
  `user_registered` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_activation_key` varchar(255) NOT NULL DEFAULT '',
  `user_status` int(11) NOT NULL DEFAULT 0,
  `display_name` varchar(250) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `bubo9_users`
--

INSERT INTO `bubo9_users` (`ID`, `user_login`, `user_pass`, `user_nicename`, `user_email`, `user_url`, `user_registered`, `user_activation_key`, `user_status`, `display_name`) VALUES
(1, 'dlanjaka008_o678ybqb', '$P$BWnLBFAWGPsthFFyuousx9rnMyEWQa/', 'dlanjaka008_o678ybqb', 'dlanjaka008@gmail.com', 'https://web-manajemen.blogspot.com', '2019-12-11 19:04:18', '', 0, 'admin');

-- --------------------------------------------------------

--
-- Struktur dari tabel `wp_commentmeta`
--

CREATE TABLE `wp_commentmeta` (
  `meta_id` bigint(20) UNSIGNED NOT NULL,
  `comment_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `meta_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_value` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `wp_comments`
--

CREATE TABLE `wp_comments` (
  `comment_ID` bigint(20) UNSIGNED NOT NULL,
  `comment_post_ID` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `comment_author` tinytext COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment_author_email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comment_author_url` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comment_author_IP` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comment_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment_karma` int(11) NOT NULL DEFAULT 0,
  `comment_approved` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `comment_agent` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comment_type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comment_parent` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `user_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `wp_comments`
--

INSERT INTO `wp_comments` (`comment_ID`, `comment_post_ID`, `comment_author`, `comment_author_email`, `comment_author_url`, `comment_author_IP`, `comment_date`, `comment_date_gmt`, `comment_content`, `comment_karma`, `comment_approved`, `comment_agent`, `comment_type`, `comment_parent`, `user_id`) VALUES
(1, 1, 'A WordPress Commenter', 'wapuu@wordpress.example', 'https://wordpress.org/', '', '2019-11-29 17:11:37', '2019-11-29 17:11:37', 'Hi, this is a comment.\nTo get started with moderating, editing, and deleting comments, please visit the Comments screen in the dashboard.\nCommenter avatars come from <a href=\"https://gravatar.com\">Gravatar</a>.', 0, '1', '', '', 0, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `wp_links`
--

CREATE TABLE `wp_links` (
  `link_id` bigint(20) UNSIGNED NOT NULL,
  `link_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `link_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `link_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `link_target` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `link_description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `link_visible` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Y',
  `link_owner` bigint(20) UNSIGNED NOT NULL DEFAULT 1,
  `link_rating` int(11) NOT NULL DEFAULT 0,
  `link_updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `link_rel` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `link_notes` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `link_rss` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `wp_options`
--

CREATE TABLE `wp_options` (
  `option_id` bigint(20) UNSIGNED NOT NULL,
  `option_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `option_value` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `autoload` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'yes'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `wp_options`
--

INSERT INTO `wp_options` (`option_id`, `option_name`, `option_value`, `autoload`) VALUES
(1, 'siteurl', 'http://agc.io', 'yes'),
(2, 'home', 'http://agc.io', 'yes'),
(3, 'blogname', 'AGC', 'yes'),
(4, 'blogdescription', 'Just another WordPress site', 'yes'),
(5, 'users_can_register', '0', 'yes'),
(6, 'admin_email', 'dimaslanjaka@gmail.com', 'yes'),
(7, 'start_of_week', '1', 'yes'),
(8, 'use_balanceTags', '0', 'yes'),
(9, 'use_smilies', '1', 'yes'),
(10, 'require_name_email', '1', 'yes'),
(11, 'comments_notify', '1', 'yes'),
(12, 'posts_per_rss', '10', 'yes'),
(13, 'rss_use_excerpt', '0', 'yes'),
(14, 'mailserver_url', 'mail.example.com', 'yes'),
(15, 'mailserver_login', 'login@example.com', 'yes'),
(16, 'mailserver_pass', 'password', 'yes'),
(17, 'mailserver_port', '110', 'yes'),
(18, 'default_category', '1', 'yes'),
(19, 'default_comment_status', 'open', 'yes'),
(20, 'default_ping_status', 'open', 'yes'),
(21, 'default_pingback_flag', '1', 'yes'),
(22, 'posts_per_page', '10', 'yes'),
(23, 'date_format', 'F j, Y', 'yes'),
(24, 'time_format', 'g:i a', 'yes'),
(25, 'links_updated_date_format', 'F j, Y g:i a', 'yes'),
(26, 'comment_moderation', '0', 'yes'),
(27, 'moderation_notify', '1', 'yes'),
(28, 'permalink_structure', '/index.php/%year%/%monthnum%/%day%/%postname%/', 'yes'),
(29, 'rewrite_rules', 'a:75:{s:11:\"^wp-json/?$\";s:22:\"index.php?rest_route=/\";s:14:\"^wp-json/(.*)?\";s:33:\"index.php?rest_route=/$matches[1]\";s:21:\"^index.php/wp-json/?$\";s:22:\"index.php?rest_route=/\";s:24:\"^index.php/wp-json/(.*)?\";s:33:\"index.php?rest_route=/$matches[1]\";s:12:\"robots\\.txt$\";s:18:\"index.php?robots=1\";s:48:\".*wp-(atom|rdf|rss|rss2|feed|commentsrss2)\\.php$\";s:18:\"index.php?feed=old\";s:20:\".*wp-app\\.php(/.*)?$\";s:19:\"index.php?error=403\";s:18:\".*wp-register.php$\";s:23:\"index.php?register=true\";s:42:\"index.php/feed/(feed|rdf|rss|rss2|atom)/?$\";s:27:\"index.php?&feed=$matches[1]\";s:37:\"index.php/(feed|rdf|rss|rss2|atom)/?$\";s:27:\"index.php?&feed=$matches[1]\";s:18:\"index.php/embed/?$\";s:21:\"index.php?&embed=true\";s:30:\"index.php/page/?([0-9]{1,})/?$\";s:28:\"index.php?&paged=$matches[1]\";s:51:\"index.php/comments/feed/(feed|rdf|rss|rss2|atom)/?$\";s:42:\"index.php?&feed=$matches[1]&withcomments=1\";s:46:\"index.php/comments/(feed|rdf|rss|rss2|atom)/?$\";s:42:\"index.php?&feed=$matches[1]&withcomments=1\";s:27:\"index.php/comments/embed/?$\";s:21:\"index.php?&embed=true\";s:54:\"index.php/search/(.+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:40:\"index.php?s=$matches[1]&feed=$matches[2]\";s:49:\"index.php/search/(.+)/(feed|rdf|rss|rss2|atom)/?$\";s:40:\"index.php?s=$matches[1]&feed=$matches[2]\";s:30:\"index.php/search/(.+)/embed/?$\";s:34:\"index.php?s=$matches[1]&embed=true\";s:42:\"index.php/search/(.+)/page/?([0-9]{1,})/?$\";s:41:\"index.php?s=$matches[1]&paged=$matches[2]\";s:24:\"index.php/search/(.+)/?$\";s:23:\"index.php?s=$matches[1]\";s:57:\"index.php/author/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:50:\"index.php?author_name=$matches[1]&feed=$matches[2]\";s:52:\"index.php/author/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:50:\"index.php?author_name=$matches[1]&feed=$matches[2]\";s:33:\"index.php/author/([^/]+)/embed/?$\";s:44:\"index.php?author_name=$matches[1]&embed=true\";s:45:\"index.php/author/([^/]+)/page/?([0-9]{1,})/?$\";s:51:\"index.php?author_name=$matches[1]&paged=$matches[2]\";s:27:\"index.php/author/([^/]+)/?$\";s:33:\"index.php?author_name=$matches[1]\";s:79:\"index.php/([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/feed/(feed|rdf|rss|rss2|atom)/?$\";s:80:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&feed=$matches[4]\";s:74:\"index.php/([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/(feed|rdf|rss|rss2|atom)/?$\";s:80:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&feed=$matches[4]\";s:55:\"index.php/([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/embed/?$\";s:74:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&embed=true\";s:67:\"index.php/([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/page/?([0-9]{1,})/?$\";s:81:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&paged=$matches[4]\";s:49:\"index.php/([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/?$\";s:63:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]\";s:66:\"index.php/([0-9]{4})/([0-9]{1,2})/feed/(feed|rdf|rss|rss2|atom)/?$\";s:64:\"index.php?year=$matches[1]&monthnum=$matches[2]&feed=$matches[3]\";s:61:\"index.php/([0-9]{4})/([0-9]{1,2})/(feed|rdf|rss|rss2|atom)/?$\";s:64:\"index.php?year=$matches[1]&monthnum=$matches[2]&feed=$matches[3]\";s:42:\"index.php/([0-9]{4})/([0-9]{1,2})/embed/?$\";s:58:\"index.php?year=$matches[1]&monthnum=$matches[2]&embed=true\";s:54:\"index.php/([0-9]{4})/([0-9]{1,2})/page/?([0-9]{1,})/?$\";s:65:\"index.php?year=$matches[1]&monthnum=$matches[2]&paged=$matches[3]\";s:36:\"index.php/([0-9]{4})/([0-9]{1,2})/?$\";s:47:\"index.php?year=$matches[1]&monthnum=$matches[2]\";s:53:\"index.php/([0-9]{4})/feed/(feed|rdf|rss|rss2|atom)/?$\";s:43:\"index.php?year=$matches[1]&feed=$matches[2]\";s:48:\"index.php/([0-9]{4})/(feed|rdf|rss|rss2|atom)/?$\";s:43:\"index.php?year=$matches[1]&feed=$matches[2]\";s:29:\"index.php/([0-9]{4})/embed/?$\";s:37:\"index.php?year=$matches[1]&embed=true\";s:41:\"index.php/([0-9]{4})/page/?([0-9]{1,})/?$\";s:44:\"index.php?year=$matches[1]&paged=$matches[2]\";s:23:\"index.php/([0-9]{4})/?$\";s:26:\"index.php?year=$matches[1]\";s:68:\"index.php/[0-9]{4}/[0-9]{1,2}/[0-9]{1,2}/[^/]+/attachment/([^/]+)/?$\";s:32:\"index.php?attachment=$matches[1]\";s:78:\"index.php/[0-9]{4}/[0-9]{1,2}/[0-9]{1,2}/[^/]+/attachment/([^/]+)/trackback/?$\";s:37:\"index.php?attachment=$matches[1]&tb=1\";s:98:\"index.php/[0-9]{4}/[0-9]{1,2}/[0-9]{1,2}/[^/]+/attachment/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:93:\"index.php/[0-9]{4}/[0-9]{1,2}/[0-9]{1,2}/[^/]+/attachment/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:93:\"index.php/[0-9]{4}/[0-9]{1,2}/[0-9]{1,2}/[^/]+/attachment/([^/]+)/comment-page-([0-9]{1,})/?$\";s:50:\"index.php?attachment=$matches[1]&cpage=$matches[2]\";s:74:\"index.php/[0-9]{4}/[0-9]{1,2}/[0-9]{1,2}/[^/]+/attachment/([^/]+)/embed/?$\";s:43:\"index.php?attachment=$matches[1]&embed=true\";s:63:\"index.php/([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/([^/]+)/embed/?$\";s:91:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&name=$matches[4]&embed=true\";s:67:\"index.php/([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/([^/]+)/trackback/?$\";s:85:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&name=$matches[4]&tb=1\";s:87:\"index.php/([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:97:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&name=$matches[4]&feed=$matches[5]\";s:82:\"index.php/([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:97:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&name=$matches[4]&feed=$matches[5]\";s:75:\"index.php/([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/([^/]+)/page/?([0-9]{1,})/?$\";s:98:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&name=$matches[4]&paged=$matches[5]\";s:82:\"index.php/([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/([^/]+)/comment-page-([0-9]{1,})/?$\";s:98:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&name=$matches[4]&cpage=$matches[5]\";s:71:\"index.php/([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/([^/]+)(?:/([0-9]+))?/?$\";s:97:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&name=$matches[4]&page=$matches[5]\";s:57:\"index.php/[0-9]{4}/[0-9]{1,2}/[0-9]{1,2}/[^/]+/([^/]+)/?$\";s:32:\"index.php?attachment=$matches[1]\";s:67:\"index.php/[0-9]{4}/[0-9]{1,2}/[0-9]{1,2}/[^/]+/([^/]+)/trackback/?$\";s:37:\"index.php?attachment=$matches[1]&tb=1\";s:87:\"index.php/[0-9]{4}/[0-9]{1,2}/[0-9]{1,2}/[^/]+/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:82:\"index.php/[0-9]{4}/[0-9]{1,2}/[0-9]{1,2}/[^/]+/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:82:\"index.php/[0-9]{4}/[0-9]{1,2}/[0-9]{1,2}/[^/]+/([^/]+)/comment-page-([0-9]{1,})/?$\";s:50:\"index.php?attachment=$matches[1]&cpage=$matches[2]\";s:63:\"index.php/[0-9]{4}/[0-9]{1,2}/[0-9]{1,2}/[^/]+/([^/]+)/embed/?$\";s:43:\"index.php?attachment=$matches[1]&embed=true\";s:74:\"index.php/([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/comment-page-([0-9]{1,})/?$\";s:81:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&cpage=$matches[4]\";s:61:\"index.php/([0-9]{4})/([0-9]{1,2})/comment-page-([0-9]{1,})/?$\";s:65:\"index.php?year=$matches[1]&monthnum=$matches[2]&cpage=$matches[3]\";s:48:\"index.php/([0-9]{4})/comment-page-([0-9]{1,})/?$\";s:44:\"index.php?year=$matches[1]&cpage=$matches[2]\";s:37:\"index.php/.?.+?/attachment/([^/]+)/?$\";s:32:\"index.php?attachment=$matches[1]\";s:47:\"index.php/.?.+?/attachment/([^/]+)/trackback/?$\";s:37:\"index.php?attachment=$matches[1]&tb=1\";s:67:\"index.php/.?.+?/attachment/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:62:\"index.php/.?.+?/attachment/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:62:\"index.php/.?.+?/attachment/([^/]+)/comment-page-([0-9]{1,})/?$\";s:50:\"index.php?attachment=$matches[1]&cpage=$matches[2]\";s:43:\"index.php/.?.+?/attachment/([^/]+)/embed/?$\";s:43:\"index.php?attachment=$matches[1]&embed=true\";s:26:\"index.php/(.?.+?)/embed/?$\";s:41:\"index.php?pagename=$matches[1]&embed=true\";s:30:\"index.php/(.?.+?)/trackback/?$\";s:35:\"index.php?pagename=$matches[1]&tb=1\";s:50:\"index.php/(.?.+?)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:47:\"index.php?pagename=$matches[1]&feed=$matches[2]\";s:45:\"index.php/(.?.+?)/(feed|rdf|rss|rss2|atom)/?$\";s:47:\"index.php?pagename=$matches[1]&feed=$matches[2]\";s:38:\"index.php/(.?.+?)/page/?([0-9]{1,})/?$\";s:48:\"index.php?pagename=$matches[1]&paged=$matches[2]\";s:45:\"index.php/(.?.+?)/comment-page-([0-9]{1,})/?$\";s:48:\"index.php?pagename=$matches[1]&cpage=$matches[2]\";s:34:\"index.php/(.?.+?)(?:/([0-9]+))?/?$\";s:47:\"index.php?pagename=$matches[1]&page=$matches[2]\";}', 'yes'),
(30, 'hack_file', '0', 'yes'),
(31, 'blog_charset', 'UTF-8', 'yes'),
(32, 'moderation_keys', '', 'no'),
(33, 'active_plugins', 'a:2:{i:0;s:15:\"Dimas/dimas.php\";i:1;s:29:\"wp-mail-smtp/wp_mail_smtp.php\";}', 'yes'),
(34, 'category_base', '', 'yes'),
(35, 'ping_sites', 'http://rpc.pingomatic.com/', 'yes'),
(36, 'comment_max_links', '2', 'yes'),
(37, 'gmt_offset', '0', 'yes'),
(38, 'default_email_category', '1', 'yes'),
(39, 'recently_edited', '', 'no'),
(40, 'template', 'twentytwenty', 'yes'),
(41, 'stylesheet', 'twentytwenty', 'yes'),
(42, 'comment_whitelist', '1', 'yes'),
(43, 'blacklist_keys', '', 'no'),
(44, 'comment_registration', '0', 'yes'),
(45, 'html_type', 'text/html', 'yes'),
(46, 'use_trackback', '0', 'yes'),
(47, 'default_role', 'subscriber', 'yes'),
(48, 'db_version', '45805', 'yes'),
(49, 'uploads_use_yearmonth_folders', '1', 'yes'),
(50, 'upload_path', '', 'yes'),
(51, 'blog_public', '1', 'yes'),
(52, 'default_link_category', '2', 'yes'),
(53, 'show_on_front', 'posts', 'yes'),
(54, 'tag_base', '', 'yes'),
(55, 'show_avatars', '1', 'yes'),
(56, 'avatar_rating', 'G', 'yes'),
(57, 'upload_url_path', '', 'yes'),
(58, 'thumbnail_size_w', '150', 'yes'),
(59, 'thumbnail_size_h', '150', 'yes'),
(60, 'thumbnail_crop', '1', 'yes'),
(61, 'medium_size_w', '300', 'yes'),
(62, 'medium_size_h', '300', 'yes'),
(63, 'avatar_default', 'mystery', 'yes'),
(64, 'large_size_w', '1024', 'yes'),
(65, 'large_size_h', '1024', 'yes'),
(66, 'image_default_link_type', 'none', 'yes'),
(67, 'image_default_size', '', 'yes'),
(68, 'image_default_align', '', 'yes'),
(69, 'close_comments_for_old_posts', '0', 'yes'),
(70, 'close_comments_days_old', '14', 'yes'),
(71, 'thread_comments', '1', 'yes'),
(72, 'thread_comments_depth', '5', 'yes'),
(73, 'page_comments', '0', 'yes'),
(74, 'comments_per_page', '50', 'yes'),
(75, 'default_comments_page', 'newest', 'yes'),
(76, 'comment_order', 'asc', 'yes'),
(77, 'sticky_posts', 'a:0:{}', 'yes'),
(78, 'widget_categories', 'a:2:{i:2;a:4:{s:5:\"title\";s:0:\"\";s:5:\"count\";i:0;s:12:\"hierarchical\";i:0;s:8:\"dropdown\";i:0;}s:12:\"_multiwidget\";i:1;}', 'yes'),
(79, 'widget_text', 'a:0:{}', 'yes'),
(80, 'widget_rss', 'a:0:{}', 'yes'),
(81, 'uninstall_plugins', 'a:0:{}', 'no'),
(82, 'timezone_string', '', 'yes'),
(83, 'page_for_posts', '0', 'yes'),
(84, 'page_on_front', '0', 'yes'),
(85, 'default_post_format', '0', 'yes'),
(86, 'link_manager_enabled', '0', 'yes'),
(87, 'finished_splitting_shared_terms', '1', 'yes'),
(88, 'site_icon', '0', 'yes'),
(89, 'medium_large_size_w', '768', 'yes'),
(90, 'medium_large_size_h', '0', 'yes'),
(91, 'wp_page_for_privacy_policy', '3', 'yes'),
(92, 'show_comments_cookies_opt_in', '1', 'yes'),
(93, 'admin_email_lifespan', '1590599486', 'yes'),
(94, 'initial_db_version', '45805', 'yes'),
(95, 'wp_user_roles', 'a:5:{s:13:\"administrator\";a:2:{s:4:\"name\";s:13:\"Administrator\";s:12:\"capabilities\";a:68:{s:13:\"switch_themes\";b:1;s:11:\"edit_themes\";b:1;s:16:\"activate_plugins\";b:1;s:12:\"edit_plugins\";b:1;s:10:\"edit_users\";b:1;s:10:\"edit_files\";b:1;s:14:\"manage_options\";b:1;s:17:\"moderate_comments\";b:1;s:17:\"manage_categories\";b:1;s:12:\"manage_links\";b:1;s:12:\"upload_files\";b:1;s:6:\"import\";b:1;s:15:\"unfiltered_html\";b:1;s:10:\"edit_posts\";b:1;s:17:\"edit_others_posts\";b:1;s:20:\"edit_published_posts\";b:1;s:13:\"publish_posts\";b:1;s:10:\"edit_pages\";b:1;s:4:\"read\";b:1;s:8:\"level_10\";b:1;s:7:\"level_9\";b:1;s:7:\"level_8\";b:1;s:7:\"level_7\";b:1;s:7:\"level_6\";b:1;s:7:\"level_5\";b:1;s:7:\"level_4\";b:1;s:7:\"level_3\";b:1;s:7:\"level_2\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:17:\"edit_others_pages\";b:1;s:20:\"edit_published_pages\";b:1;s:13:\"publish_pages\";b:1;s:12:\"delete_pages\";b:1;s:19:\"delete_others_pages\";b:1;s:22:\"delete_published_pages\";b:1;s:12:\"delete_posts\";b:1;s:19:\"delete_others_posts\";b:1;s:22:\"delete_published_posts\";b:1;s:20:\"delete_private_posts\";b:1;s:18:\"edit_private_posts\";b:1;s:18:\"read_private_posts\";b:1;s:20:\"delete_private_pages\";b:1;s:18:\"edit_private_pages\";b:1;s:18:\"read_private_pages\";b:1;s:12:\"delete_users\";b:1;s:12:\"create_users\";b:1;s:17:\"unfiltered_upload\";b:1;s:14:\"edit_dashboard\";b:1;s:14:\"update_plugins\";b:1;s:14:\"delete_plugins\";b:1;s:15:\"install_plugins\";b:1;s:13:\"update_themes\";b:1;s:14:\"install_themes\";b:1;s:11:\"update_core\";b:1;s:10:\"list_users\";b:1;s:12:\"remove_users\";b:1;s:13:\"promote_users\";b:1;s:18:\"edit_theme_options\";b:1;s:13:\"delete_themes\";b:1;s:6:\"export\";b:1;s:14:\"ure_edit_roles\";b:1;s:16:\"ure_create_roles\";b:1;s:16:\"ure_delete_roles\";b:1;s:23:\"ure_create_capabilities\";b:1;s:23:\"ure_delete_capabilities\";b:1;s:18:\"ure_manage_options\";b:1;s:15:\"ure_reset_roles\";b:1;}}s:6:\"editor\";a:2:{s:4:\"name\";s:6:\"Editor\";s:12:\"capabilities\";a:34:{s:17:\"moderate_comments\";b:1;s:17:\"manage_categories\";b:1;s:12:\"manage_links\";b:1;s:12:\"upload_files\";b:1;s:15:\"unfiltered_html\";b:1;s:10:\"edit_posts\";b:1;s:17:\"edit_others_posts\";b:1;s:20:\"edit_published_posts\";b:1;s:13:\"publish_posts\";b:1;s:10:\"edit_pages\";b:1;s:4:\"read\";b:1;s:7:\"level_7\";b:1;s:7:\"level_6\";b:1;s:7:\"level_5\";b:1;s:7:\"level_4\";b:1;s:7:\"level_3\";b:1;s:7:\"level_2\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:17:\"edit_others_pages\";b:1;s:20:\"edit_published_pages\";b:1;s:13:\"publish_pages\";b:1;s:12:\"delete_pages\";b:1;s:19:\"delete_others_pages\";b:1;s:22:\"delete_published_pages\";b:1;s:12:\"delete_posts\";b:1;s:19:\"delete_others_posts\";b:1;s:22:\"delete_published_posts\";b:1;s:20:\"delete_private_posts\";b:1;s:18:\"edit_private_posts\";b:1;s:18:\"read_private_posts\";b:1;s:20:\"delete_private_pages\";b:1;s:18:\"edit_private_pages\";b:1;s:18:\"read_private_pages\";b:1;}}s:6:\"author\";a:2:{s:4:\"name\";s:6:\"Author\";s:12:\"capabilities\";a:10:{s:12:\"upload_files\";b:1;s:10:\"edit_posts\";b:1;s:20:\"edit_published_posts\";b:1;s:13:\"publish_posts\";b:1;s:4:\"read\";b:1;s:7:\"level_2\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:12:\"delete_posts\";b:1;s:22:\"delete_published_posts\";b:1;}}s:11:\"contributor\";a:2:{s:4:\"name\";s:11:\"Contributor\";s:12:\"capabilities\";a:5:{s:10:\"edit_posts\";b:1;s:4:\"read\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:12:\"delete_posts\";b:1;}}s:10:\"subscriber\";a:2:{s:4:\"name\";s:10:\"Subscriber\";s:12:\"capabilities\";a:2:{s:4:\"read\";b:1;s:7:\"level_0\";b:1;}}}', 'yes'),
(96, 'fresh_site', '1', 'yes'),
(97, 'widget_search', 'a:2:{i:2;a:1:{s:5:\"title\";s:0:\"\";}s:12:\"_multiwidget\";i:1;}', 'yes'),
(98, 'widget_recent-posts', 'a:2:{i:2;a:2:{s:5:\"title\";s:0:\"\";s:6:\"number\";i:5;}s:12:\"_multiwidget\";i:1;}', 'yes'),
(99, 'widget_recent-comments', 'a:2:{i:2;a:2:{s:5:\"title\";s:0:\"\";s:6:\"number\";i:5;}s:12:\"_multiwidget\";i:1;}', 'yes'),
(100, 'widget_archives', 'a:2:{i:2;a:3:{s:5:\"title\";s:0:\"\";s:5:\"count\";i:0;s:8:\"dropdown\";i:0;}s:12:\"_multiwidget\";i:1;}', 'yes'),
(101, 'widget_meta', 'a:2:{i:2;a:1:{s:5:\"title\";s:0:\"\";}s:12:\"_multiwidget\";i:1;}', 'yes'),
(102, 'sidebars_widgets', 'a:4:{s:19:\"wp_inactive_widgets\";a:0:{}s:9:\"sidebar-1\";a:3:{i:0;s:8:\"search-2\";i:1;s:14:\"recent-posts-2\";i:2;s:17:\"recent-comments-2\";}s:9:\"sidebar-2\";a:3:{i:0;s:10:\"archives-2\";i:1;s:12:\"categories-2\";i:2;s:6:\"meta-2\";}s:13:\"array_version\";i:3;}', 'yes'),
(103, 'cron', 'a:7:{i:1576274096;a:1:{s:34:\"wp_privacy_delete_old_export_files\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:6:\"hourly\";s:4:\"args\";a:0:{}s:8:\"interval\";i:3600;}}}i:1576300302;a:1:{s:16:\"wp_version_check\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:10:\"twicedaily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:43200;}}}i:1576300303;a:2:{s:17:\"wp_update_plugins\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:10:\"twicedaily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:43200;}}s:16:\"wp_update_themes\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:10:\"twicedaily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:43200;}}}i:1576343499;a:1:{s:32:\"recovery_mode_clean_expired_keys\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:5:\"daily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:86400;}}}i:1576344979;a:2:{s:19:\"wp_scheduled_delete\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:5:\"daily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:86400;}}s:25:\"delete_expired_transients\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:5:\"daily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:86400;}}}i:1576344987;a:1:{s:30:\"wp_scheduled_auto_draft_delete\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:5:\"daily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:86400;}}}s:7:\"version\";i:2;}', 'yes'),
(104, 'widget_pages', 'a:1:{s:12:\"_multiwidget\";i:1;}', 'yes'),
(105, 'widget_calendar', 'a:1:{s:12:\"_multiwidget\";i:1;}', 'yes'),
(106, 'widget_media_audio', 'a:1:{s:12:\"_multiwidget\";i:1;}', 'yes'),
(107, 'widget_media_image', 'a:1:{s:12:\"_multiwidget\";i:1;}', 'yes'),
(108, 'widget_media_gallery', 'a:1:{s:12:\"_multiwidget\";i:1;}', 'yes'),
(109, 'widget_media_video', 'a:1:{s:12:\"_multiwidget\";i:1;}', 'yes'),
(110, 'widget_tag_cloud', 'a:1:{s:12:\"_multiwidget\";i:1;}', 'yes'),
(111, 'widget_nav_menu', 'a:1:{s:12:\"_multiwidget\";i:1;}', 'yes'),
(112, 'widget_custom_html', 'a:1:{s:12:\"_multiwidget\";i:1;}', 'yes'),
(114, 'recovery_keys', 'a:0:{}', 'yes'),
(115, 'theme_mods_twentytwenty', 'a:1:{s:18:\"custom_css_post_id\";i:-1;}', 'yes'),
(127, 'can_compress_scripts', '1', 'no'),
(131, 'recently_activated', 'a:0:{}', 'yes'),
(132, '_site_transient_update_core', 'O:8:\"stdClass\":4:{s:7:\"updates\";a:2:{i:0;O:8:\"stdClass\":10:{s:8:\"response\";s:7:\"upgrade\";s:8:\"download\";s:59:\"https://downloads.wordpress.org/release/wordpress-5.3.1.zip\";s:6:\"locale\";s:5:\"en_US\";s:8:\"packages\";O:8:\"stdClass\":5:{s:4:\"full\";s:59:\"https://downloads.wordpress.org/release/wordpress-5.3.1.zip\";s:10:\"no_content\";s:70:\"https://downloads.wordpress.org/release/wordpress-5.3.1-no-content.zip\";s:11:\"new_bundled\";s:71:\"https://downloads.wordpress.org/release/wordpress-5.3.1-new-bundled.zip\";s:7:\"partial\";s:69:\"https://downloads.wordpress.org/release/wordpress-5.3.1-partial-0.zip\";s:8:\"rollback\";b:0;}s:7:\"current\";s:5:\"5.3.1\";s:7:\"version\";s:5:\"5.3.1\";s:11:\"php_version\";s:6:\"5.6.20\";s:13:\"mysql_version\";s:3:\"5.0\";s:11:\"new_bundled\";s:3:\"5.3\";s:15:\"partial_version\";s:3:\"5.3\";}i:1;O:8:\"stdClass\":11:{s:8:\"response\";s:10:\"autoupdate\";s:8:\"download\";s:59:\"https://downloads.wordpress.org/release/wordpress-5.3.1.zip\";s:6:\"locale\";s:5:\"en_US\";s:8:\"packages\";O:8:\"stdClass\":5:{s:4:\"full\";s:59:\"https://downloads.wordpress.org/release/wordpress-5.3.1.zip\";s:10:\"no_content\";s:70:\"https://downloads.wordpress.org/release/wordpress-5.3.1-no-content.zip\";s:11:\"new_bundled\";s:71:\"https://downloads.wordpress.org/release/wordpress-5.3.1-new-bundled.zip\";s:7:\"partial\";s:69:\"https://downloads.wordpress.org/release/wordpress-5.3.1-partial-0.zip\";s:8:\"rollback\";s:70:\"https://downloads.wordpress.org/release/wordpress-5.3.1-rollback-0.zip\";}s:7:\"current\";s:5:\"5.3.1\";s:7:\"version\";s:5:\"5.3.1\";s:11:\"php_version\";s:6:\"5.6.20\";s:13:\"mysql_version\";s:3:\"5.0\";s:11:\"new_bundled\";s:3:\"5.3\";s:15:\"partial_version\";s:3:\"5.3\";s:9:\"new_files\";s:0:\"\";}}s:12:\"last_checked\";i:1576257228;s:15:\"version_checked\";s:3:\"5.3\";s:12:\"translations\";a:0:{}}', 'no'),
(139, 'GRV3K', '6LdSg5gUAAAAAKrfCL7OkHCFrS3m09xoWyvFKieF', 'yes'),
(140, 'GRV3S', '6LdSg5gUAAAAAL7aiyHjXKArlkF0R7HAlA99oMYG', 'yes'),
(153, 'youtube_db_version', '1.0.2', 'yes'),
(154, 'user_role_editor', 'a:1:{s:11:\"ure_version\";s:6:\"4.52.1\";}', 'yes'),
(155, 'wp_backup_user_roles', 'a:5:{s:13:\"administrator\";a:2:{s:4:\"name\";s:13:\"Administrator\";s:12:\"capabilities\";a:61:{s:13:\"switch_themes\";b:1;s:11:\"edit_themes\";b:1;s:16:\"activate_plugins\";b:1;s:12:\"edit_plugins\";b:1;s:10:\"edit_users\";b:1;s:10:\"edit_files\";b:1;s:14:\"manage_options\";b:1;s:17:\"moderate_comments\";b:1;s:17:\"manage_categories\";b:1;s:12:\"manage_links\";b:1;s:12:\"upload_files\";b:1;s:6:\"import\";b:1;s:15:\"unfiltered_html\";b:1;s:10:\"edit_posts\";b:1;s:17:\"edit_others_posts\";b:1;s:20:\"edit_published_posts\";b:1;s:13:\"publish_posts\";b:1;s:10:\"edit_pages\";b:1;s:4:\"read\";b:1;s:8:\"level_10\";b:1;s:7:\"level_9\";b:1;s:7:\"level_8\";b:1;s:7:\"level_7\";b:1;s:7:\"level_6\";b:1;s:7:\"level_5\";b:1;s:7:\"level_4\";b:1;s:7:\"level_3\";b:1;s:7:\"level_2\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:17:\"edit_others_pages\";b:1;s:20:\"edit_published_pages\";b:1;s:13:\"publish_pages\";b:1;s:12:\"delete_pages\";b:1;s:19:\"delete_others_pages\";b:1;s:22:\"delete_published_pages\";b:1;s:12:\"delete_posts\";b:1;s:19:\"delete_others_posts\";b:1;s:22:\"delete_published_posts\";b:1;s:20:\"delete_private_posts\";b:1;s:18:\"edit_private_posts\";b:1;s:18:\"read_private_posts\";b:1;s:20:\"delete_private_pages\";b:1;s:18:\"edit_private_pages\";b:1;s:18:\"read_private_pages\";b:1;s:12:\"delete_users\";b:1;s:12:\"create_users\";b:1;s:17:\"unfiltered_upload\";b:1;s:14:\"edit_dashboard\";b:1;s:14:\"update_plugins\";b:1;s:14:\"delete_plugins\";b:1;s:15:\"install_plugins\";b:1;s:13:\"update_themes\";b:1;s:14:\"install_themes\";b:1;s:11:\"update_core\";b:1;s:10:\"list_users\";b:1;s:12:\"remove_users\";b:1;s:13:\"promote_users\";b:1;s:18:\"edit_theme_options\";b:1;s:13:\"delete_themes\";b:1;s:6:\"export\";b:1;}}s:6:\"editor\";a:2:{s:4:\"name\";s:6:\"Editor\";s:12:\"capabilities\";a:34:{s:17:\"moderate_comments\";b:1;s:17:\"manage_categories\";b:1;s:12:\"manage_links\";b:1;s:12:\"upload_files\";b:1;s:15:\"unfiltered_html\";b:1;s:10:\"edit_posts\";b:1;s:17:\"edit_others_posts\";b:1;s:20:\"edit_published_posts\";b:1;s:13:\"publish_posts\";b:1;s:10:\"edit_pages\";b:1;s:4:\"read\";b:1;s:7:\"level_7\";b:1;s:7:\"level_6\";b:1;s:7:\"level_5\";b:1;s:7:\"level_4\";b:1;s:7:\"level_3\";b:1;s:7:\"level_2\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:17:\"edit_others_pages\";b:1;s:20:\"edit_published_pages\";b:1;s:13:\"publish_pages\";b:1;s:12:\"delete_pages\";b:1;s:19:\"delete_others_pages\";b:1;s:22:\"delete_published_pages\";b:1;s:12:\"delete_posts\";b:1;s:19:\"delete_others_posts\";b:1;s:22:\"delete_published_posts\";b:1;s:20:\"delete_private_posts\";b:1;s:18:\"edit_private_posts\";b:1;s:18:\"read_private_posts\";b:1;s:20:\"delete_private_pages\";b:1;s:18:\"edit_private_pages\";b:1;s:18:\"read_private_pages\";b:1;}}s:6:\"author\";a:2:{s:4:\"name\";s:6:\"Author\";s:12:\"capabilities\";a:10:{s:12:\"upload_files\";b:1;s:10:\"edit_posts\";b:1;s:20:\"edit_published_posts\";b:1;s:13:\"publish_posts\";b:1;s:4:\"read\";b:1;s:7:\"level_2\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:12:\"delete_posts\";b:1;s:22:\"delete_published_posts\";b:1;}}s:11:\"contributor\";a:2:{s:4:\"name\";s:11:\"Contributor\";s:12:\"capabilities\";a:5:{s:10:\"edit_posts\";b:1;s:4:\"read\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:12:\"delete_posts\";b:1;}}s:10:\"subscriber\";a:2:{s:4:\"name\";s:10:\"Subscriber\";s:12:\"capabilities\";a:2:{s:4:\"read\";b:1;s:7:\"level_0\";b:1;}}}', 'no'),
(156, 'ure_tasks_queue', 'a:1:{s:13:\"on_activation\";a:0:{}}', 'yes'),
(157, 'wp_mail_smtp_initial_version', '1.7.1', 'no'),
(158, 'wp_mail_smtp_version', '1.7.1', 'no'),
(159, 'wp_mail_smtp', 'a:6:{s:4:\"mail\";a:6:{s:10:\"from_email\";s:22:\"dimaslanjaka@gmail.com\";s:9:\"from_name\";s:3:\"AGC\";s:6:\"mailer\";s:4:\"smtp\";s:11:\"return_path\";b:0;s:16:\"from_email_force\";b:0;s:15:\"from_name_force\";b:0;}s:4:\"smtp\";a:6:{s:7:\"autotls\";b:1;s:4:\"auth\";b:1;s:4:\"host\";s:14:\"smtp.gmail.com\";s:10:\"encryption\";s:3:\"ssl\";s:4:\"port\";i:465;s:4:\"user\";s:23:\"dimascyber008@gmail.com\";}s:10:\"sendinblue\";a:1:{s:7:\"api_key\";s:0:\"\";}s:7:\"mailgun\";a:3:{s:7:\"api_key\";s:0:\"\";s:6:\"domain\";s:0:\"\";s:6:\"region\";s:2:\"US\";}s:8:\"sendgrid\";a:1:{s:7:\"api_key\";s:0:\"\";}s:5:\"gmail\";a:2:{s:9:\"client_id\";s:72:\"439429450847-2r1oa7oj8r0hghopmaasi1brdbc3f2vj.apps.googleusercontent.com\";s:13:\"client_secret\";s:24:\"mk0QC76LGxW5G7JNe-oQUXW2\";}}', 'no'),
(160, 'wp_mail_smtp_debug', 'a:0:{}', 'no'),
(361, '_site_transient_timeout_php_check_a5b4d2808570efd012607394df5c6fa9', '1576700328', 'no'),
(362, '_site_transient_php_check_a5b4d2808570efd012607394df5c6fa9', 'a:5:{s:19:\"recommended_version\";s:3:\"7.3\";s:15:\"minimum_version\";s:6:\"5.6.20\";s:12:\"is_supported\";b:1;s:9:\"is_secure\";b:1;s:13:\"is_acceptable\";b:1;}', 'no'),
(383, '_site_transient_timeout_browser_2894fb4dbf964f58ccf3d2e4e372b316', '1576761106', 'no'),
(384, '_site_transient_browser_2894fb4dbf964f58ccf3d2e4e372b316', 'a:10:{s:4:\"name\";s:6:\"Chrome\";s:7:\"version\";s:13:\"78.0.3904.108\";s:8:\"platform\";s:7:\"Windows\";s:10:\"update_url\";s:29:\"https://www.google.com/chrome\";s:7:\"img_src\";s:43:\"http://s.w.org/images/browsers/chrome.png?1\";s:11:\"img_src_ssl\";s:44:\"https://s.w.org/images/browsers/chrome.png?1\";s:15:\"current_version\";s:2:\"18\";s:7:\"upgrade\";b:0;s:8:\"insecure\";b:0;s:6:\"mobile\";b:0;}', 'no'),
(410, '_site_transient_update_themes', 'O:8:\"stdClass\":4:{s:12:\"last_checked\";i:1576257229;s:7:\"checked\";a:6:{s:16:\"flatsimplebingit\";s:5:\"1.2.9\";s:7:\"shapely\";s:5:\"1.2.8\";s:14:\"twentynineteen\";s:3:\"1.4\";s:15:\"twentyseventeen\";s:3:\"2.2\";s:13:\"twentysixteen\";s:3:\"2.0\";s:12:\"twentytwenty\";s:3:\"1.0\";}s:8:\"response\";a:1:{s:12:\"twentytwenty\";a:6:{s:5:\"theme\";s:12:\"twentytwenty\";s:11:\"new_version\";s:3:\"1.1\";s:3:\"url\";s:42:\"https://wordpress.org/themes/twentytwenty/\";s:7:\"package\";s:58:\"https://downloads.wordpress.org/theme/twentytwenty.1.1.zip\";s:8:\"requires\";b:0;s:12:\"requires_php\";b:0;}}s:12:\"translations\";a:0:{}}', 'no'),
(411, '_site_transient_update_plugins', 'O:8:\"stdClass\":4:{s:12:\"last_checked\";i:1576257230;s:8:\"response\";a:2:{s:39:\"google-apps-login/google_apps_login.php\";O:8:\"stdClass\":12:{s:2:\"id\";s:31:\"w.org/plugins/google-apps-login\";s:4:\"slug\";s:17:\"google-apps-login\";s:6:\"plugin\";s:39:\"google-apps-login/google_apps_login.php\";s:11:\"new_version\";s:3:\"3.3\";s:3:\"url\";s:48:\"https://wordpress.org/plugins/google-apps-login/\";s:7:\"package\";s:60:\"https://downloads.wordpress.org/plugin/google-apps-login.zip\";s:5:\"icons\";a:2:{s:2:\"2x\";s:70:\"https://ps.w.org/google-apps-login/assets/icon-256x256.png?rev=1401408\";s:2:\"1x\";s:70:\"https://ps.w.org/google-apps-login/assets/icon-128x128.png?rev=1401408\";}s:7:\"banners\";a:2:{s:2:\"2x\";s:73:\"https://ps.w.org/google-apps-login/assets/banner-1544x500.png?rev=1649576\";s:2:\"1x\";s:72:\"https://ps.w.org/google-apps-login/assets/banner-772x250.png?rev=1649576\";}s:11:\"banners_rtl\";a:0:{}s:6:\"tested\";s:5:\"5.3.1\";s:12:\"requires_php\";b:0;s:13:\"compatibility\";O:8:\"stdClass\":0:{}}s:29:\"wp-mail-smtp/wp_mail_smtp.php\";O:8:\"stdClass\":12:{s:2:\"id\";s:26:\"w.org/plugins/wp-mail-smtp\";s:4:\"slug\";s:12:\"wp-mail-smtp\";s:6:\"plugin\";s:29:\"wp-mail-smtp/wp_mail_smtp.php\";s:11:\"new_version\";s:5:\"1.8.1\";s:3:\"url\";s:43:\"https://wordpress.org/plugins/wp-mail-smtp/\";s:7:\"package\";s:61:\"https://downloads.wordpress.org/plugin/wp-mail-smtp.1.8.1.zip\";s:5:\"icons\";a:2:{s:2:\"2x\";s:65:\"https://ps.w.org/wp-mail-smtp/assets/icon-256x256.png?rev=1755440\";s:2:\"1x\";s:65:\"https://ps.w.org/wp-mail-smtp/assets/icon-128x128.png?rev=1755440\";}s:7:\"banners\";a:2:{s:2:\"2x\";s:68:\"https://ps.w.org/wp-mail-smtp/assets/banner-1544x500.png?rev=2120094\";s:2:\"1x\";s:67:\"https://ps.w.org/wp-mail-smtp/assets/banner-772x250.png?rev=2120094\";}s:11:\"banners_rtl\";a:0:{}s:6:\"tested\";s:5:\"5.3.1\";s:12:\"requires_php\";s:3:\"5.3\";s:13:\"compatibility\";O:8:\"stdClass\":0:{}}}s:12:\"translations\";a:0:{}s:9:\"no_update\";a:22:{s:27:\"ad-inserter/ad-inserter.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:25:\"w.org/plugins/ad-inserter\";s:4:\"slug\";s:11:\"ad-inserter\";s:6:\"plugin\";s:27:\"ad-inserter/ad-inserter.php\";s:11:\"new_version\";s:6:\"2.5.10\";s:3:\"url\";s:42:\"https://wordpress.org/plugins/ad-inserter/\";s:7:\"package\";s:61:\"https://downloads.wordpress.org/plugin/ad-inserter.2.5.10.zip\";s:5:\"icons\";a:2:{s:2:\"2x\";s:64:\"https://ps.w.org/ad-inserter/assets/icon-256x256.jpg?rev=1502039\";s:2:\"1x\";s:64:\"https://ps.w.org/ad-inserter/assets/icon-128x128.jpg?rev=1502039\";}s:7:\"banners\";a:1:{s:2:\"1x\";s:66:\"https://ps.w.org/ad-inserter/assets/banner-772x250.png?rev=1708001\";}s:11:\"banners_rtl\";a:0:{}}s:11:\"amp/amp.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:17:\"w.org/plugins/amp\";s:4:\"slug\";s:3:\"amp\";s:6:\"plugin\";s:11:\"amp/amp.php\";s:11:\"new_version\";s:5:\"1.4.1\";s:3:\"url\";s:34:\"https://wordpress.org/plugins/amp/\";s:7:\"package\";s:52:\"https://downloads.wordpress.org/plugin/amp.1.4.1.zip\";s:5:\"icons\";a:2:{s:2:\"2x\";s:56:\"https://ps.w.org/amp/assets/icon-256x256.png?rev=1987390\";s:2:\"1x\";s:56:\"https://ps.w.org/amp/assets/icon-128x128.png?rev=1987390\";}s:7:\"banners\";a:2:{s:2:\"2x\";s:59:\"https://ps.w.org/amp/assets/banner-1544x500.png?rev=1987390\";s:2:\"1x\";s:58:\"https://ps.w.org/amp/assets/banner-772x250.png?rev=1987390\";}s:11:\"banners_rtl\";a:0:{}}s:31:\"amp-supremacy/amp-supremacy.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:27:\"w.org/plugins/amp-supremacy\";s:4:\"slug\";s:13:\"amp-supremacy\";s:6:\"plugin\";s:31:\"amp-supremacy/amp-supremacy.php\";s:11:\"new_version\";s:6:\"2.0.13\";s:3:\"url\";s:44:\"https://wordpress.org/plugins/amp-supremacy/\";s:7:\"package\";s:63:\"https://downloads.wordpress.org/plugin/amp-supremacy.2.0.13.zip\";s:5:\"icons\";a:1:{s:2:\"1x\";s:66:\"https://ps.w.org/amp-supremacy/assets/icon-128x128.png?rev=1465081\";}s:7:\"banners\";a:1:{s:2:\"1x\";s:68:\"https://ps.w.org/amp-supremacy/assets/banner-772x250.jpg?rev=1472333\";}s:11:\"banners_rtl\";a:0:{}}s:34:\"async-js-and-css/asyncJSandCSS.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:30:\"w.org/plugins/async-js-and-css\";s:4:\"slug\";s:16:\"async-js-and-css\";s:6:\"plugin\";s:34:\"async-js-and-css/asyncJSandCSS.php\";s:11:\"new_version\";s:6:\"1.7.13\";s:3:\"url\";s:47:\"https://wordpress.org/plugins/async-js-and-css/\";s:7:\"package\";s:59:\"https://downloads.wordpress.org/plugin/async-js-and-css.zip\";s:5:\"icons\";a:1:{s:7:\"default\";s:60:\"https://s.w.org/plugins/geopattern-icon/async-js-and-css.svg\";}s:7:\"banners\";a:0:{}s:11:\"banners_rtl\";a:0:{}}s:33:\"classic-editor/classic-editor.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:28:\"w.org/plugins/classic-editor\";s:4:\"slug\";s:14:\"classic-editor\";s:6:\"plugin\";s:33:\"classic-editor/classic-editor.php\";s:11:\"new_version\";s:3:\"1.5\";s:3:\"url\";s:45:\"https://wordpress.org/plugins/classic-editor/\";s:7:\"package\";s:61:\"https://downloads.wordpress.org/plugin/classic-editor.1.5.zip\";s:5:\"icons\";a:2:{s:2:\"2x\";s:67:\"https://ps.w.org/classic-editor/assets/icon-256x256.png?rev=1998671\";s:2:\"1x\";s:67:\"https://ps.w.org/classic-editor/assets/icon-128x128.png?rev=1998671\";}s:7:\"banners\";a:2:{s:2:\"2x\";s:70:\"https://ps.w.org/classic-editor/assets/banner-1544x500.png?rev=1998671\";s:2:\"1x\";s:69:\"https://ps.w.org/classic-editor/assets/banner-772x250.png?rev=1998676\";}s:11:\"banners_rtl\";a:0:{}}s:21:\"cybersyn/cybersyn.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:22:\"w.org/plugins/cybersyn\";s:4:\"slug\";s:8:\"cybersyn\";s:6:\"plugin\";s:21:\"cybersyn/cybersyn.php\";s:11:\"new_version\";s:4:\"6.17\";s:3:\"url\";s:39:\"https://wordpress.org/plugins/cybersyn/\";s:7:\"package\";s:51:\"https://downloads.wordpress.org/plugin/cybersyn.zip\";s:5:\"icons\";a:2:{s:2:\"2x\";s:61:\"https://ps.w.org/cybersyn/assets/icon-256x256.png?rev=2042021\";s:2:\"1x\";s:61:\"https://ps.w.org/cybersyn/assets/icon-128x128.png?rev=2042021\";}s:7:\"banners\";a:2:{s:2:\"2x\";s:64:\"https://ps.w.org/cybersyn/assets/banner-1544x500.png?rev=2072951\";s:2:\"1x\";s:63:\"https://ps.w.org/cybersyn/assets/banner-772x250.png?rev=2072951\";}s:11:\"banners_rtl\";a:0:{}}s:93:\"de-updraftplus-backup-exclude-image-thumbnails/de-updraft-backup-exclude-image-thumbnails.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:60:\"w.org/plugins/de-updraftplus-backup-exclude-image-thumbnails\";s:4:\"slug\";s:46:\"de-updraftplus-backup-exclude-image-thumbnails\";s:6:\"plugin\";s:93:\"de-updraftplus-backup-exclude-image-thumbnails/de-updraft-backup-exclude-image-thumbnails.php\";s:11:\"new_version\";s:5:\"1.0.2\";s:3:\"url\";s:77:\"https://wordpress.org/plugins/de-updraftplus-backup-exclude-image-thumbnails/\";s:7:\"package\";s:89:\"https://downloads.wordpress.org/plugin/de-updraftplus-backup-exclude-image-thumbnails.zip\";s:5:\"icons\";a:2:{s:2:\"2x\";s:99:\"https://ps.w.org/de-updraftplus-backup-exclude-image-thumbnails/assets/icon-256x256.png?rev=1844415\";s:2:\"1x\";s:99:\"https://ps.w.org/de-updraftplus-backup-exclude-image-thumbnails/assets/icon-128x128.png?rev=1844415\";}s:7:\"banners\";a:2:{s:2:\"2x\";s:102:\"https://ps.w.org/de-updraftplus-backup-exclude-image-thumbnails/assets/banner-1544x500.png?rev=1912850\";s:2:\"1x\";s:101:\"https://ps.w.org/de-updraftplus-backup-exclude-image-thumbnails/assets/banner-772x250.png?rev=1912850\";}s:11:\"banners_rtl\";a:0:{}}s:33:\"fancy-admin-ui/fancy-admin-ui.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:28:\"w.org/plugins/fancy-admin-ui\";s:4:\"slug\";s:14:\"fancy-admin-ui\";s:6:\"plugin\";s:33:\"fancy-admin-ui/fancy-admin-ui.php\";s:11:\"new_version\";s:3:\"2.1\";s:3:\"url\";s:45:\"https://wordpress.org/plugins/fancy-admin-ui/\";s:7:\"package\";s:57:\"https://downloads.wordpress.org/plugin/fancy-admin-ui.zip\";s:5:\"icons\";a:2:{s:2:\"1x\";s:59:\"https://ps.w.org/fancy-admin-ui/assets/icon.svg?rev=1579506\";s:3:\"svg\";s:59:\"https://ps.w.org/fancy-admin-ui/assets/icon.svg?rev=1579506\";}s:7:\"banners\";a:2:{s:2:\"2x\";s:70:\"https://ps.w.org/fancy-admin-ui/assets/banner-1544x500.jpg?rev=1164944\";s:2:\"1x\";s:69:\"https://ps.w.org/fancy-admin-ui/assets/banner-772x250.jpg?rev=1164944\";}s:11:\"banners_rtl\";a:0:{}}s:50:\"google-analytics-for-wordpress/googleanalytics.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:44:\"w.org/plugins/google-analytics-for-wordpress\";s:4:\"slug\";s:30:\"google-analytics-for-wordpress\";s:6:\"plugin\";s:50:\"google-analytics-for-wordpress/googleanalytics.php\";s:11:\"new_version\";s:6:\"7.10.1\";s:3:\"url\";s:61:\"https://wordpress.org/plugins/google-analytics-for-wordpress/\";s:7:\"package\";s:80:\"https://downloads.wordpress.org/plugin/google-analytics-for-wordpress.7.10.1.zip\";s:5:\"icons\";a:3:{s:2:\"2x\";s:83:\"https://ps.w.org/google-analytics-for-wordpress/assets/icon-256x256.png?rev=1598927\";s:2:\"1x\";s:75:\"https://ps.w.org/google-analytics-for-wordpress/assets/icon.svg?rev=1598927\";s:3:\"svg\";s:75:\"https://ps.w.org/google-analytics-for-wordpress/assets/icon.svg?rev=1598927\";}s:7:\"banners\";a:2:{s:2:\"2x\";s:86:\"https://ps.w.org/google-analytics-for-wordpress/assets/banner-1544x500.png?rev=2159532\";s:2:\"1x\";s:85:\"https://ps.w.org/google-analytics-for-wordpress/assets/banner-772x250.png?rev=2159532\";}s:11:\"banners_rtl\";a:0:{}}s:36:\"google-sitemap-generator/sitemap.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:38:\"w.org/plugins/google-sitemap-generator\";s:4:\"slug\";s:24:\"google-sitemap-generator\";s:6:\"plugin\";s:36:\"google-sitemap-generator/sitemap.php\";s:11:\"new_version\";s:5:\"4.1.0\";s:3:\"url\";s:55:\"https://wordpress.org/plugins/google-sitemap-generator/\";s:7:\"package\";s:73:\"https://downloads.wordpress.org/plugin/google-sitemap-generator.4.1.0.zip\";s:5:\"icons\";a:2:{s:2:\"2x\";s:77:\"https://ps.w.org/google-sitemap-generator/assets/icon-256x256.png?rev=1701944\";s:2:\"1x\";s:77:\"https://ps.w.org/google-sitemap-generator/assets/icon-128x128.png?rev=1701944\";}s:7:\"banners\";a:1:{s:2:\"1x\";s:79:\"https://ps.w.org/google-sitemap-generator/assets/banner-772x250.png?rev=1701944\";}s:11:\"banners_rtl\";a:0:{}}s:25:\"gtranslate/gtranslate.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:24:\"w.org/plugins/gtranslate\";s:4:\"slug\";s:10:\"gtranslate\";s:6:\"plugin\";s:25:\"gtranslate/gtranslate.php\";s:11:\"new_version\";s:6:\"2.8.50\";s:3:\"url\";s:41:\"https://wordpress.org/plugins/gtranslate/\";s:7:\"package\";s:60:\"https://downloads.wordpress.org/plugin/gtranslate.2.8.50.zip\";s:5:\"icons\";a:2:{s:2:\"2x\";s:63:\"https://ps.w.org/gtranslate/assets/icon-256x256.png?rev=1625219\";s:2:\"1x\";s:63:\"https://ps.w.org/gtranslate/assets/icon-128x128.png?rev=1579941\";}s:7:\"banners\";a:2:{s:2:\"2x\";s:66:\"https://ps.w.org/gtranslate/assets/banner-1544x500.png?rev=2034820\";s:2:\"1x\";s:65:\"https://ps.w.org/gtranslate/assets/banner-772x250.png?rev=2034820\";}s:11:\"banners_rtl\";a:0:{}}s:49:\"hreflang-tags-by-dcgws/hreflang-tags-by-dcgws.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:36:\"w.org/plugins/hreflang-tags-by-dcgws\";s:4:\"slug\";s:22:\"hreflang-tags-by-dcgws\";s:6:\"plugin\";s:49:\"hreflang-tags-by-dcgws/hreflang-tags-by-dcgws.php\";s:11:\"new_version\";s:5:\"1.8.6\";s:3:\"url\";s:53:\"https://wordpress.org/plugins/hreflang-tags-by-dcgws/\";s:7:\"package\";s:71:\"https://downloads.wordpress.org/plugin/hreflang-tags-by-dcgws.1.8.6.zip\";s:5:\"icons\";a:2:{s:2:\"2x\";s:75:\"https://ps.w.org/hreflang-tags-by-dcgws/assets/icon-256x256.png?rev=1447081\";s:2:\"1x\";s:75:\"https://ps.w.org/hreflang-tags-by-dcgws/assets/icon-128x128.png?rev=1447081\";}s:7:\"banners\";a:1:{s:2:\"1x\";s:77:\"https://ps.w.org/hreflang-tags-by-dcgws/assets/banner-772x250.jpg?rev=1447081\";}s:11:\"banners_rtl\";a:0:{}}s:31:\"multilanguage/multilanguage.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:27:\"w.org/plugins/multilanguage\";s:4:\"slug\";s:13:\"multilanguage\";s:6:\"plugin\";s:31:\"multilanguage/multilanguage.php\";s:11:\"new_version\";s:5:\"1.3.4\";s:3:\"url\";s:44:\"https://wordpress.org/plugins/multilanguage/\";s:7:\"package\";s:62:\"https://downloads.wordpress.org/plugin/multilanguage.1.3.4.zip\";s:5:\"icons\";a:2:{s:2:\"2x\";s:66:\"https://ps.w.org/multilanguage/assets/icon-256x256.png?rev=1619446\";s:2:\"1x\";s:66:\"https://ps.w.org/multilanguage/assets/icon-128x128.png?rev=1619446\";}s:7:\"banners\";a:2:{s:2:\"2x\";s:69:\"https://ps.w.org/multilanguage/assets/banner-1544x500.jpg?rev=1590711\";s:2:\"1x\";s:68:\"https://ps.w.org/multilanguage/assets/banner-772x250.jpg?rev=1590711\";}s:11:\"banners_rtl\";a:0:{}}s:29:\"pressforward/pressforward.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:26:\"w.org/plugins/pressforward\";s:4:\"slug\";s:12:\"pressforward\";s:6:\"plugin\";s:29:\"pressforward/pressforward.php\";s:11:\"new_version\";s:5:\"5.2.2\";s:3:\"url\";s:43:\"https://wordpress.org/plugins/pressforward/\";s:7:\"package\";s:61:\"https://downloads.wordpress.org/plugin/pressforward.5.2.2.zip\";s:5:\"icons\";a:2:{s:2:\"2x\";s:65:\"https://ps.w.org/pressforward/assets/icon-256x256.png?rev=2126384\";s:2:\"1x\";s:65:\"https://ps.w.org/pressforward/assets/icon-128x128.png?rev=2126384\";}s:7:\"banners\";a:1:{s:2:\"1x\";s:67:\"https://ps.w.org/pressforward/assets/banner-772x250.jpg?rev=2126383\";}s:11:\"banners_rtl\";a:0:{}}s:47:\"really-simple-ssl/rlrsssl-really-simple-ssl.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:31:\"w.org/plugins/really-simple-ssl\";s:4:\"slug\";s:17:\"really-simple-ssl\";s:6:\"plugin\";s:47:\"really-simple-ssl/rlrsssl-really-simple-ssl.php\";s:11:\"new_version\";s:5:\"3.2.6\";s:3:\"url\";s:48:\"https://wordpress.org/plugins/really-simple-ssl/\";s:7:\"package\";s:66:\"https://downloads.wordpress.org/plugin/really-simple-ssl.3.2.6.zip\";s:5:\"icons\";a:1:{s:2:\"1x\";s:70:\"https://ps.w.org/really-simple-ssl/assets/icon-128x128.png?rev=1782452\";}s:7:\"banners\";a:1:{s:2:\"1x\";s:72:\"https://ps.w.org/really-simple-ssl/assets/banner-772x250.jpg?rev=1881345\";}s:11:\"banners_rtl\";a:0:{}}s:17:\"schema/schema.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:20:\"w.org/plugins/schema\";s:4:\"slug\";s:6:\"schema\";s:6:\"plugin\";s:17:\"schema/schema.php\";s:11:\"new_version\";s:5:\"1.7.8\";s:3:\"url\";s:37:\"https://wordpress.org/plugins/schema/\";s:7:\"package\";s:49:\"https://downloads.wordpress.org/plugin/schema.zip\";s:5:\"icons\";a:2:{s:2:\"2x\";s:59:\"https://ps.w.org/schema/assets/icon-256x256.png?rev=1750173\";s:2:\"1x\";s:59:\"https://ps.w.org/schema/assets/icon-128x128.png?rev=1750172\";}s:7:\"banners\";a:1:{s:2:\"1x\";s:61:\"https://ps.w.org/schema/assets/banner-772x250.png?rev=1750171\";}s:11:\"banners_rtl\";a:0:{}}s:27:\"sublanguage/sublanguage.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:25:\"w.org/plugins/sublanguage\";s:4:\"slug\";s:11:\"sublanguage\";s:6:\"plugin\";s:27:\"sublanguage/sublanguage.php\";s:11:\"new_version\";s:3:\"2.6\";s:3:\"url\";s:42:\"https://wordpress.org/plugins/sublanguage/\";s:7:\"package\";s:58:\"https://downloads.wordpress.org/plugin/sublanguage.2.6.zip\";s:5:\"icons\";a:1:{s:2:\"1x\";s:64:\"https://ps.w.org/sublanguage/assets/icon-128x128.png?rev=1197494\";}s:7:\"banners\";a:1:{s:2:\"1x\";s:66:\"https://ps.w.org/sublanguage/assets/banner-772x250.png?rev=1197494\";}s:11:\"banners_rtl\";a:0:{}}s:30:\"tag-generator/taggenerator.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:27:\"w.org/plugins/tag-generator\";s:4:\"slug\";s:13:\"tag-generator\";s:6:\"plugin\";s:30:\"tag-generator/taggenerator.php\";s:11:\"new_version\";s:7:\"0.1.3.7\";s:3:\"url\";s:44:\"https://wordpress.org/plugins/tag-generator/\";s:7:\"package\";s:56:\"https://downloads.wordpress.org/plugin/tag-generator.zip\";s:5:\"icons\";a:1:{s:7:\"default\";s:57:\"https://s.w.org/plugins/geopattern-icon/tag-generator.svg\";}s:7:\"banners\";a:0:{}s:11:\"banners_rtl\";a:0:{}}s:46:\"under-construction-page/under-construction.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:37:\"w.org/plugins/under-construction-page\";s:4:\"slug\";s:23:\"under-construction-page\";s:6:\"plugin\";s:46:\"under-construction-page/under-construction.php\";s:11:\"new_version\";s:4:\"3.65\";s:3:\"url\";s:54:\"https://wordpress.org/plugins/under-construction-page/\";s:7:\"package\";s:71:\"https://downloads.wordpress.org/plugin/under-construction-page.3.65.zip\";s:5:\"icons\";a:2:{s:2:\"2x\";s:76:\"https://ps.w.org/under-construction-page/assets/icon-256x256.png?rev=1628376\";s:2:\"1x\";s:76:\"https://ps.w.org/under-construction-page/assets/icon-128x128.png?rev=1567925\";}s:7:\"banners\";a:2:{s:2:\"2x\";s:79:\"https://ps.w.org/under-construction-page/assets/banner-1544x500.png?rev=1628376\";s:2:\"1x\";s:78:\"https://ps.w.org/under-construction-page/assets/banner-772x250.png?rev=1575797\";}s:11:\"banners_rtl\";a:0:{}}s:34:\"updraftcentral/site-management.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:28:\"w.org/plugins/updraftcentral\";s:4:\"slug\";s:14:\"updraftcentral\";s:6:\"plugin\";s:34:\"updraftcentral/site-management.php\";s:11:\"new_version\";s:6:\"0.8.10\";s:3:\"url\";s:45:\"https://wordpress.org/plugins/updraftcentral/\";s:7:\"package\";s:64:\"https://downloads.wordpress.org/plugin/updraftcentral.0.8.10.zip\";s:5:\"icons\";a:2:{s:2:\"2x\";s:67:\"https://ps.w.org/updraftcentral/assets/icon-256x256.png?rev=1382942\";s:2:\"1x\";s:67:\"https://ps.w.org/updraftcentral/assets/icon-128x128.png?rev=1382942\";}s:7:\"banners\";a:2:{s:2:\"2x\";s:70:\"https://ps.w.org/updraftcentral/assets/banner-1544x500.png?rev=1686198\";s:2:\"1x\";s:69:\"https://ps.w.org/updraftcentral/assets/banner-772x250.png?rev=1686198\";}s:11:\"banners_rtl\";a:0:{}}s:27:\"updraftplus/updraftplus.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:25:\"w.org/plugins/updraftplus\";s:4:\"slug\";s:11:\"updraftplus\";s:6:\"plugin\";s:27:\"updraftplus/updraftplus.php\";s:11:\"new_version\";s:7:\"1.16.21\";s:3:\"url\";s:42:\"https://wordpress.org/plugins/updraftplus/\";s:7:\"package\";s:62:\"https://downloads.wordpress.org/plugin/updraftplus.1.16.21.zip\";s:5:\"icons\";a:2:{s:2:\"2x\";s:64:\"https://ps.w.org/updraftplus/assets/icon-256x256.jpg?rev=1686200\";s:2:\"1x\";s:64:\"https://ps.w.org/updraftplus/assets/icon-128x128.jpg?rev=1686200\";}s:7:\"banners\";a:2:{s:2:\"2x\";s:67:\"https://ps.w.org/updraftplus/assets/banner-1544x500.png?rev=1686200\";s:2:\"1x\";s:66:\"https://ps.w.org/updraftplus/assets/banner-772x250.png?rev=1686200\";}s:11:\"banners_rtl\";a:0:{}}s:37:\"user-role-editor/user-role-editor.php\";O:8:\"stdClass\":9:{s:2:\"id\";s:30:\"w.org/plugins/user-role-editor\";s:4:\"slug\";s:16:\"user-role-editor\";s:6:\"plugin\";s:37:\"user-role-editor/user-role-editor.php\";s:11:\"new_version\";s:6:\"4.52.1\";s:3:\"url\";s:47:\"https://wordpress.org/plugins/user-role-editor/\";s:7:\"package\";s:66:\"https://downloads.wordpress.org/plugin/user-role-editor.4.52.1.zip\";s:5:\"icons\";a:2:{s:2:\"2x\";s:69:\"https://ps.w.org/user-role-editor/assets/icon-256x256.jpg?rev=1020390\";s:2:\"1x\";s:69:\"https://ps.w.org/user-role-editor/assets/icon-128x128.jpg?rev=1020390\";}s:7:\"banners\";a:1:{s:2:\"1x\";s:71:\"https://ps.w.org/user-role-editor/assets/banner-772x250.png?rev=1263116\";}s:11:\"banners_rtl\";a:0:{}}}}', 'no');

-- --------------------------------------------------------

--
-- Struktur dari tabel `wp_postmeta`
--

CREATE TABLE `wp_postmeta` (
  `meta_id` bigint(20) UNSIGNED NOT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `meta_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_value` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `wp_postmeta`
--

INSERT INTO `wp_postmeta` (`meta_id`, `post_id`, `meta_key`, `meta_value`) VALUES
(1, 2, '_wp_page_template', 'default'),
(2, 3, '_wp_page_template', 'default');

-- --------------------------------------------------------

--
-- Struktur dari tabel `wp_posts`
--

CREATE TABLE `wp_posts` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `post_author` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `post_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_excerpt` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'publish',
  `comment_status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `ping_status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `post_password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `post_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `to_ping` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `pinged` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_modified_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content_filtered` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_parent` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `guid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `menu_order` int(11) NOT NULL DEFAULT 0,
  `post_type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'post',
  `post_mime_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comment_count` bigint(20) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `wp_posts`
--

INSERT INTO `wp_posts` (`ID`, `post_author`, `post_date`, `post_date_gmt`, `post_content`, `post_title`, `post_excerpt`, `post_status`, `comment_status`, `ping_status`, `post_password`, `post_name`, `to_ping`, `pinged`, `post_modified`, `post_modified_gmt`, `post_content_filtered`, `post_parent`, `guid`, `menu_order`, `post_type`, `post_mime_type`, `comment_count`) VALUES
(1, 1, '2019-11-29 17:11:37', '2019-11-29 17:11:37', '<!-- wp:paragraph -->\n<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p>\n<!-- /wp:paragraph -->', 'Hello world!', '', 'publish', 'open', 'open', '', 'hello-world', '', '', '2019-11-29 17:11:37', '2019-11-29 17:11:37', '', 0, 'http://agc.io/?p=1', 0, 'post', '', 1),
(2, 1, '2019-11-29 17:11:37', '2019-11-29 17:11:37', '<!-- wp:paragraph -->\n<p>This is an example page. It\'s different from a blog post because it will stay in one place and will show up in your site navigation (in most themes). Most people start with an About page that introduces them to potential site visitors. It might say something like this:</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:quote -->\n<blockquote class=\"wp-block-quote\"><p>Hi there! I\'m a bike messenger by day, aspiring actor by night, and this is my website. I live in Los Angeles, have a great dog named Jack, and I like pi&#241;a coladas. (And gettin\' caught in the rain.)</p></blockquote>\n<!-- /wp:quote -->\n\n<!-- wp:paragraph -->\n<p>...or something like this:</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:quote -->\n<blockquote class=\"wp-block-quote\"><p>The XYZ Doohickey Company was founded in 1971, and has been providing quality doohickeys to the public ever since. Located in Gotham City, XYZ employs over 2,000 people and does all kinds of awesome things for the Gotham community.</p></blockquote>\n<!-- /wp:quote -->\n\n<!-- wp:paragraph -->\n<p>As a new WordPress user, you should go to <a href=\"http://agc.io/wp-admin/\">your dashboard</a> to delete this page and create new pages for your content. Have fun!</p>\n<!-- /wp:paragraph -->', 'Sample Page', '', 'publish', 'closed', 'open', '', 'sample-page', '', '', '2019-11-29 17:11:37', '2019-11-29 17:11:37', '', 0, 'http://agc.io/?page_id=2', 0, 'page', '', 0),
(3, 1, '2019-11-29 17:11:37', '2019-11-29 17:11:37', '<!-- wp:heading --><h2>Who we are</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Our website address is: http://agc.io.</p><!-- /wp:paragraph --><!-- wp:heading --><h2>What personal data we collect and why we collect it</h2><!-- /wp:heading --><!-- wp:heading {\"level\":3} --><h3>Comments</h3><!-- /wp:heading --><!-- wp:paragraph --><p>When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor&#8217;s IP address and browser user agent string to help spam detection.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the public in the context of your comment.</p><!-- /wp:paragraph --><!-- wp:heading {\"level\":3} --><h3>Media</h3><!-- /wp:heading --><!-- wp:paragraph --><p>If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.</p><!-- /wp:paragraph --><!-- wp:heading {\"level\":3} --><h3>Contact forms</h3><!-- /wp:heading --><!-- wp:heading {\"level\":3} --><h3>Cookies</h3><!-- /wp:heading --><!-- wp:paragraph --><p>If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select &quot;Remember Me&quot;, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.</p><!-- /wp:paragraph --><!-- wp:heading {\"level\":3} --><h3>Embedded content from other websites</h3><!-- /wp:heading --><!-- wp:paragraph --><p>Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.</p><!-- /wp:paragraph --><!-- wp:heading {\"level\":3} --><h3>Analytics</h3><!-- /wp:heading --><!-- wp:heading --><h2>Who we share your data with</h2><!-- /wp:heading --><!-- wp:heading --><h2>How long we retain your data</h2><!-- /wp:heading --><!-- wp:paragraph --><p>If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.</p><!-- /wp:paragraph --><!-- wp:heading --><h2>What rights you have over your data</h2><!-- /wp:heading --><!-- wp:paragraph --><p>If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.</p><!-- /wp:paragraph --><!-- wp:heading --><h2>Where we send your data</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Visitor comments may be checked through an automated spam detection service.</p><!-- /wp:paragraph --><!-- wp:heading --><h2>Your contact information</h2><!-- /wp:heading --><!-- wp:heading --><h2>Additional information</h2><!-- /wp:heading --><!-- wp:heading {\"level\":3} --><h3>How we protect your data</h3><!-- /wp:heading --><!-- wp:heading {\"level\":3} --><h3>What data breach procedures we have in place</h3><!-- /wp:heading --><!-- wp:heading {\"level\":3} --><h3>What third parties we receive data from</h3><!-- /wp:heading --><!-- wp:heading {\"level\":3} --><h3>What automated decision making and/or profiling we do with user data</h3><!-- /wp:heading --><!-- wp:heading {\"level\":3} --><h3>Industry regulatory disclosure requirements</h3><!-- /wp:heading -->', 'Privacy Policy', '', 'draft', 'closed', 'open', '', 'privacy-policy', '', '', '2019-11-29 17:11:37', '2019-11-29 17:11:37', '', 0, 'http://agc.io/?page_id=3', 0, 'page', '', 0),
(5, 1, '2019-12-11 20:18:54', '0000-00-00 00:00:00', '', 'Auto Draft', '', 'auto-draft', 'open', 'open', '', '', '', '', '2019-12-11 20:18:54', '0000-00-00 00:00:00', '', 0, 'http://agc.io/?p=5', 0, 'post', '', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `wp_termmeta`
--

CREATE TABLE `wp_termmeta` (
  `meta_id` bigint(20) UNSIGNED NOT NULL,
  `term_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `meta_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_value` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `wp_terms`
--

CREATE TABLE `wp_terms` (
  `term_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `slug` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `term_group` bigint(10) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `wp_terms`
--

INSERT INTO `wp_terms` (`term_id`, `name`, `slug`, `term_group`) VALUES
(1, 'Uncategorized', 'uncategorized', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `wp_term_relationships`
--

CREATE TABLE `wp_term_relationships` (
  `object_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `term_taxonomy_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `term_order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `wp_term_relationships`
--

INSERT INTO `wp_term_relationships` (`object_id`, `term_taxonomy_id`, `term_order`) VALUES
(1, 1, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `wp_term_taxonomy`
--

CREATE TABLE `wp_term_taxonomy` (
  `term_taxonomy_id` bigint(20) UNSIGNED NOT NULL,
  `term_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `taxonomy` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `count` bigint(20) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `wp_term_taxonomy`
--

INSERT INTO `wp_term_taxonomy` (`term_taxonomy_id`, `term_id`, `taxonomy`, `description`, `parent`, `count`) VALUES
(1, 1, 'category', '', 0, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `wp_usermeta`
--

CREATE TABLE `wp_usermeta` (
  `umeta_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `meta_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_value` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `wp_usermeta`
--

INSERT INTO `wp_usermeta` (`umeta_id`, `user_id`, `meta_key`, `meta_value`) VALUES
(1, 1, 'nickname', 'dimaslanjaka'),
(2, 1, 'first_name', ''),
(3, 1, 'last_name', ''),
(4, 1, 'description', ''),
(5, 1, 'rich_editing', 'true'),
(6, 1, 'syntax_highlighting', 'true'),
(7, 1, 'comment_shortcuts', 'false'),
(8, 1, 'admin_color', 'fresh'),
(9, 1, 'use_ssl', '0'),
(10, 1, 'show_admin_bar_front', 'true'),
(11, 1, 'locale', ''),
(12, 1, 'wp_capabilities', 'a:1:{s:13:\"administrator\";b:1;}'),
(13, 1, 'wp_user_level', '10'),
(14, 1, 'dismissed_wp_pointers', ''),
(15, 1, 'show_welcome_panel', '0'),
(17, 1, 'wp_dashboard_quick_press_last_post_id', '5'),
(18, 1, 'community-events-location', 'a:1:{s:2:\"ip\";s:9:\"127.0.0.0\";}'),
(19, 1, 'closedpostboxes_dashboard', 'a:4:{i:0;s:19:\"dashboard_right_now\";i:1;s:18:\"dashboard_activity\";i:2;s:21:\"dashboard_quick_press\";i:3;s:17:\"dashboard_primary\";}'),
(20, 1, 'metaboxhidden_dashboard', 'a:0:{}'),
(21, 1, 'blogger_email', 'dimascyber008.superuser@blogger.com'),
(22, 1, 'session_tokens', 'a:2:{s:64:\"6cd1de5451d9863dcdc6fa6c1ad342b51040ef45f44b9296e61884328b5e5f83\";a:4:{s:10:\"expiration\";i:1576439923;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1576267123;}s:64:\"8c1d54c30b2e400df94516e1b86fce6de0d164fb6a091e851f2224ebcb05d2e9\";a:4:{s:10:\"expiration\";i:1576439926;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1576267126;}}'),
(24, 1, 'subscribed', '1'),
(25, 2, 'nickname', 'webmanajemen'),
(26, 2, 'first_name', ''),
(27, 2, 'last_name', ''),
(28, 2, 'description', ''),
(29, 2, 'rich_editing', 'true'),
(30, 2, 'syntax_highlighting', 'true'),
(31, 2, 'comment_shortcuts', 'false'),
(32, 2, 'admin_color', 'fresh'),
(33, 2, 'use_ssl', '0'),
(34, 2, 'show_admin_bar_front', 'true'),
(35, 2, 'locale', ''),
(36, 2, 'wp_capabilities', 'a:1:{s:10:\"subscriber\";b:1;}'),
(37, 2, 'wp_user_level', '0'),
(38, 2, 'session_tokens', 'a:19:{s:64:\"1e5d76b72fb99a75bb740fb1bb6141fda368eade9eb4904c74cbde0c172c1d83\";a:4:{s:10:\"expiration\";i:1576147371;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575974571;}s:64:\"acbd45846bbf38a6f213b737ac90c7883dfad6f694c5e868c84932663272f37a\";a:4:{s:10:\"expiration\";i:1576147371;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575974571;}s:64:\"48c3d423300a206402a9ee75cdddbd2d1ae1c00d373b5277cb2b8bfc39064880\";a:4:{s:10:\"expiration\";i:1576147371;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575974571;}s:64:\"da78e718fbfad99a39462a374ed3e951a9f0007f2f251fa83fbb24c04c90900a\";a:4:{s:10:\"expiration\";i:1576147372;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575974572;}s:64:\"a6a89025ff61171416112042f6ba38753345f957dd49383bbd91290beddd71ae\";a:4:{s:10:\"expiration\";i:1576147372;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575974572;}s:64:\"0e05031936968902e4add9a6022cd888becbf7bd7068c7370100535b8acf45b3\";a:4:{s:10:\"expiration\";i:1576147372;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575974572;}s:64:\"16295b661149ac96eaf514ec1599faf21db8d2c57dc8e82d07def04ff8d8f6db\";a:4:{s:10:\"expiration\";i:1576147373;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575974573;}s:64:\"2d746956ce502772e621bd78acf695c0c51c064fc1b45495c00873a672a71d01\";a:4:{s:10:\"expiration\";i:1576147373;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575974573;}s:64:\"0c34e60467b3052e90358f81aa5c060f6840fc20525662f7093c3a09415b84b6\";a:4:{s:10:\"expiration\";i:1576147373;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575974573;}s:64:\"3dd59cd771e19bb7f463c90314510bc44c2509a44baaf56a7049bab2ba931f04\";a:4:{s:10:\"expiration\";i:1576147374;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575974574;}s:64:\"21b89789eeaca92739ce67bf371223cf78e7e276f306c0c5843d0d1d80ff9b48\";a:4:{s:10:\"expiration\";i:1576267046;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1576094246;}s:64:\"3ef53d694c424b21acc48d8432663ba2c4c65e0c874e77812088627eb9c6a2d5\";a:4:{s:10:\"expiration\";i:1576267047;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1576094247;}s:64:\"b65cce34aec7662657fed84afd0b1fcc281e73c423f7d6c0280f30e8546f788f\";a:4:{s:10:\"expiration\";i:1576267048;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1576094248;}s:64:\"fa0bb0b2151ae55bbc996a41cfaccfdb70ab04c97cc9d69c0e39948c6703635d\";a:4:{s:10:\"expiration\";i:1576267049;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1576094249;}s:64:\"3701d040ea353030b73d6afc731d2bce25b04760740a921fc4d9150a47f3ddeb\";a:4:{s:10:\"expiration\";i:1576267049;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1576094249;}s:64:\"3b7c627ce5070b19c650d87e68c4999f747e38951da823e24b3e245345fb0910\";a:4:{s:10:\"expiration\";i:1576267050;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1576094250;}s:64:\"35535e54f55f3784271adbba73aa8721ef2f1914c61fa56835fa73b2255eb00e\";a:4:{s:10:\"expiration\";i:1576267050;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1576094250;}s:64:\"0fb31674996c80d33443c4916e2e76c59389966f31c2c776afcc97e71f59c7e6\";a:4:{s:10:\"expiration\";i:1576267050;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1576094250;}s:64:\"5e84f68e40ef5aa46efed4913b950561a6d41c5ef8fa2154f60ef61744586eb9\";a:4:{s:10:\"expiration\";i:1576267051;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1576094251;}}'),
(40, 2, 'blogger_email', 'dimascyber008.superuser@blogger.com'),
(41, 2, 'subscribed', '1'),
(42, 3, 'nickname', 'music-only-4798'),
(43, 3, 'first_name', ''),
(44, 3, 'last_name', ''),
(45, 3, 'description', ''),
(46, 3, 'rich_editing', 'true'),
(47, 3, 'syntax_highlighting', 'true'),
(48, 3, 'comment_shortcuts', 'false'),
(49, 3, 'admin_color', 'fresh'),
(50, 3, 'use_ssl', '0'),
(51, 3, 'show_admin_bar_front', 'true'),
(52, 3, 'locale', ''),
(53, 3, 'wp_capabilities', 'a:1:{s:10:\"subscriber\";b:1;}'),
(54, 3, 'wp_user_level', '0'),
(57, 3, 'subscribed', '1'),
(64, 1, 'google_token', 'eyJhY2Nlc3NfdG9rZW4iOiJ5YTI5LkltQzFCd2FDWUxyRi04V1h3bDBFSUptZ25nMFpGMU0zTFhzTEpaNmlUWkdCQkFmOHFJb3o0Z2ZjVG1jdnhScGxMajFiQXVLN0JUZlg5djF2VlRWUm10Y3h2V3VrUktJaU9lZElsbjdtWjBnbUJzb201bGZ5UGhFNGlNbURwOWxCWllZIiwiZXhwaXJlc19pbiI6MzYwMCwic2NvcGUiOiJodHRwczpcL1wvd3d3Lmdvb2dsZWFwaXMuY29tXC9hdXRoXC9hbmFseXRpY3MucmVhZG9ubHkgaHR0cHM6XC9cL3d3dy5nb29nbGVhcGlzLmNvbVwvYXV0aFwvdXNlcmluZm8uZW1haWwgaHR0cHM6XC9cL3d3dy5nb29nbGVhcGlzLmNvbVwvYXV0aFwvZHJpdmUgaHR0cHM6XC9cL3d3dy5nb29nbGVhcGlzLmNvbVwvYXV0aFwvdXNlcmluZm8ucHJvZmlsZSBodHRwczpcL1wvd3d3Lmdvb2dsZWFwaXMuY29tXC9hdXRoXC95b3V0dWJlIGh0dHBzOlwvXC93d3cuZ29vZ2xlYXBpcy5jb21cL2F1dGhcL3lvdXR1YmUucmVhZG9ubHkgaHR0cHM6XC9cL3d3dy5nb29nbGVhcGlzLmNvbVwvYXV0aFwveW91dHViZS5mb3JjZS1zc2wgb3BlbmlkIiwidG9rZW5fdHlwZSI6IkJlYXJlciIsImlkX3Rva2VuIjoiZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNklqSXdNVEV3T1RGa1lUQXpZbUZoTkRBNU1UbGxObVptT0RNMll6aGxOMlk1WVdaaFltRTVZVGdpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBjM01pT2lKb2RIUndjem92TDJGalkyOTFiblJ6TG1kdmIyZHNaUzVqYjIwaUxDSmhlbkFpT2lJME16azBNamswTlRBNE5EY3RNbkl4YjJFM2IybzRjakJvWjJodmNHMWhZWE5wTVdKeVpHSmpNMll5ZG1vdVlYQndjeTVuYjI5bmJHVjFjMlZ5WTI5dWRHVnVkQzVqYjIwaUxDSmhkV1FpT2lJME16azBNamswTlRBNE5EY3RNbkl4YjJFM2IybzRjakJvWjJodmNHMWhZWE5wTVdKeVpHSmpNMll5ZG1vdVlYQndjeTVuYjI5bmJHVjFjMlZ5WTI5dWRHVnVkQzVqYjIwaUxDSnpkV0lpT2lJeE1EWTFPRFk1TkRJd016YzFOams0TURVek5ESWlMQ0psYldGcGJDSTZJbVJwYldGemJHRnVhbUZyWVVCbmJXRnBiQzVqYjIwaUxDSmxiV0ZwYkY5MlpYSnBabWxsWkNJNmRISjFaU3dpWVhSZmFHRnphQ0k2SWtRelduUk9jbTlaWVhOT016STBVVTVtYTBaSE1GRWlMQ0pwWVhRaU9qRTFOell5TmpZME1qWXNJbVY0Y0NJNk1UVTNOakkzTURBeU5uMC5vLW5ySWVOOURCLVlIVENKZzZ1UHJDTkJWN1VzYmJkX2t0WVBzeUZnVmVHY2J3U09sYThld2VWZzBrREhjNkZKSFlOclJJbW5OODE4dXFzc2tLVnUwMVlYUTlqQmhhVTNCMEE0T1hoSGw2Zi1UUVNQS3ZiS29Na2VRaXZ6czdZc3FWekc0M3dPYTMzSTg0WlF6ZGdqWXhQZkRVVnlLaGYyMHlDRGVMVkxFMFpfQnhDaVNLSDVZb2dNZmN1czJQYWdiWV9IQS1uS01tOEE4WDlkNktXR05oMVZvczNlVGpQczJlUHc4aDlHMzlJZ2JMVnhZRVlzaDlrcmlXZzdyYXZyRktPMlFoNDFSZ3FLUHlpTG1sd2lrc1RVZFhBWDJaY29uWkItNjI5d1B2S2loZ0VYWVZveC10R1pwbUVNNy1Va1AwSUw0ck5hQVpVbUJyal9KclltTFEiLCJjcmVhdGVkIjoxNTc2MjY2NDI2LCJyZWZyZXNoX3Rva2VuIjoiMVwvXC8wZzAtMkJFZ0tWUGJnQ2dZSUFSQUFHQkFTTndGLUw5SXJhUWc3eUdLZHlwYnV3WGZwNmZsS0t0ZHdvWHozYzBvSVIwRmhlbXltR3JiQUhTLWNmYzNvVWdIUUgwX0l5M1JOZ1FNIn0='),
(65, 2, 'google_token', 'eyJhY2Nlc3NfdG9rZW4iOiJ5YTI5LkltQzBCMW1la0NiN2lzTHlwcUQ0RjJUOXFHQnkxMWNoTEJ5V01QMlBTdmR4SHliMTJ0c01wWWFDWlhQblJHUUNEWTYtbmNjZmpLNFEtX2tmaDhYUlUwVV9pQ0R4UDNNOHZWT1dfWVUweXpURGthZG42azVIT01MX1I1bXpXRzVmM2NVIiwiZXhwaXJlc19pbiI6MzYwMCwic2NvcGUiOiJodHRwczpcL1wvd3d3Lmdvb2dsZWFwaXMuY29tXC9hdXRoXC95b3V0dWJlIG9wZW5pZCBodHRwczpcL1wvd3d3Lmdvb2dsZWFwaXMuY29tXC9hdXRoXC95b3V0dWJlLmZvcmNlLXNzbCBodHRwczpcL1wvd3d3Lmdvb2dsZWFwaXMuY29tXC9hdXRoXC9hbmFseXRpY3MucmVhZG9ubHkgaHR0cHM6XC9cL3d3dy5nb29nbGVhcGlzLmNvbVwvYXV0aFwvdXNlcmluZm8uZW1haWwgaHR0cHM6XC9cL3d3dy5nb29nbGVhcGlzLmNvbVwvYXV0aFwvZHJpdmUgaHR0cHM6XC9cL3d3dy5nb29nbGVhcGlzLmNvbVwvYXV0aFwvdXNlcmluZm8ucHJvZmlsZSBodHRwczpcL1wvd3d3Lmdvb2dsZWFwaXMuY29tXC9hdXRoXC95b3V0dWJlLnJlYWRvbmx5IiwidG9rZW5fdHlwZSI6IkJlYXJlciIsImlkX3Rva2VuIjoiZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNklqVmlOV1JrT1dKbE5EQmlOV1V4WTJZeE1qRmxNelUzTTJNNFpUUTVaakV5TlRJM01UZ3paRE1pTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBjM01pT2lKb2RIUndjem92TDJGalkyOTFiblJ6TG1kdmIyZHNaUzVqYjIwaUxDSmhlbkFpT2lJME16azBNamswTlRBNE5EY3RNbkl4YjJFM2IybzRjakJvWjJodmNHMWhZWE5wTVdKeVpHSmpNMll5ZG1vdVlYQndjeTVuYjI5bmJHVjFjMlZ5WTI5dWRHVnVkQzVqYjIwaUxDSmhkV1FpT2lJME16azBNamswTlRBNE5EY3RNbkl4YjJFM2IybzRjakJvWjJodmNHMWhZWE5wTVdKeVpHSmpNMll5ZG1vdVlYQndjeTVuYjI5bmJHVjFjMlZ5WTI5dWRHVnVkQzVqYjIwaUxDSnpkV0lpT2lJeE1EQTNORGMxT0RRNE56RXdNRGN5TURrd09USWlMQ0psYldGcGJDSTZJbmRsWW0xaGJtRnFaVzFsYmtCbmJXRnBiQzVqYjIwaUxDSmxiV0ZwYkY5MlpYSnBabWxsWkNJNmRISjFaU3dpWVhSZmFHRnphQ0k2SW14ekxXUjRWMlkxU1dOc1ZFZHdhVUpFTlZoRk1tY2lMQ0pwWVhRaU9qRTFOell3T1RFd09UQXNJbVY0Y0NJNk1UVTNOakE1TkRZNU1IMC5UbGVYSDd0Qm90OC14U0FKWjE1TFlxSmVEV0Jxd185aEpZLXk2MzZTMEdCQnBSd2oySDAyUUppWWk4S2U0Tmt1Q29pc0p5eHpPeWd0eFZfdzNUNV9La3QtTURoWnFWWTYwSVg3Yk54aDJ4QkUyS0RjY0RvbFVCQndnbmY1Z0JvWW9NY3VsTmVhS0lBSUpvYklGRzlHSjhfenJPYjZQV1NHZnNIcTNBVFNHcEF2TmpLbk9KLUxPdHNvMjlfVUhvUVBmdzBjUzhzbUE4RXdsNmtMbWcwWGk5R1A5bkFHV0RJRnZ4VFR0X3YzRFNFbEVEWjU0cl9RYWVlclJvQ21jbXRsRkVHTnlKcjdPdjRIZkFrZGtqejR1NWU4UmtXN1drU1VfYWx0UnJWMGZKZVVjanFfdTRaRHNIa3piU09MX0tFaFZtb0lfcmRYX1piUkc2R3FnRDNGRkEiLCJjcmVhdGVkIjoxNTc2MDkxMDkwLCJyZWZyZXNoX3Rva2VuIjoiMVwvXC8wZ3pKdzRrdllBMXhFQ2dZSUFSQUFHQkFTTndGLUw5SXJHbkdNc0RFeHV1Wi1MOF8yZjRMdWNLTFQ3VmtqVVF0VGFLSW50d2VEQm1VdlN5dDVMb19uM21NcExaeVF5M1VRUi1zIn0='),
(66, 4, 'nickname', 'mobile-legends-5906'),
(67, 4, 'first_name', ''),
(68, 4, 'last_name', ''),
(69, 4, 'description', ''),
(70, 4, 'rich_editing', 'true'),
(71, 4, 'syntax_highlighting', 'true'),
(72, 4, 'comment_shortcuts', 'false'),
(73, 4, 'admin_color', 'fresh'),
(74, 4, 'use_ssl', '0'),
(75, 4, 'show_admin_bar_front', 'true'),
(76, 4, 'locale', ''),
(77, 4, 'wp_capabilities', 'a:1:{s:10:\"subscriber\";b:1;}'),
(78, 4, 'wp_user_level', '0'),
(80, 4, 'google_token', 'eyJhY2Nlc3NfdG9rZW4iOiJ5YTI5LklsLTBCX2VqRzY4NGlvU1BobVhCcXhaQXVzUk1hNUl6dlVCalBwOHp1aE9zTTRoMGtMV1RnU1RUS21sTkN3ZXF0VGw1ZlM3ODJPZ3pYVGEzS3AzZnY0Q1A4cnpkZFktN0UwNi1FRDYxVDE1TjNDYXB6MTRFLWtTTXJaaXBLZTllTGciLCJleHBpcmVzX2luIjozNjAwLCJyZWZyZXNoX3Rva2VuIjoiMVwvXC8wZzRNWklvcGNweUtSQ2dZSUFSQUFHQkFTTndGLUw5SXI3cWJvbWlRYWlBLV9YekJaNVZRbGh0anpGUmVXRmdtX0Y1a1BFeHFZc0pzY0pqdFRkM2JvcmZLSUhOMmtHVG9fcXZJIiwic2NvcGUiOiJodHRwczpcL1wvd3d3Lmdvb2dsZWFwaXMuY29tXC9hdXRoXC91c2VyaW5mby5lbWFpbCBodHRwczpcL1wvd3d3Lmdvb2dsZWFwaXMuY29tXC9hdXRoXC95b3V0dWJlLnJlYWRvbmx5IGh0dHBzOlwvXC93d3cuZ29vZ2xlYXBpcy5jb21cL2F1dGhcL3VzZXJpbmZvLnByb2ZpbGUgaHR0cHM6XC9cL3d3dy5nb29nbGVhcGlzLmNvbVwvYXV0aFwveW91dHViZSBodHRwczpcL1wvd3d3Lmdvb2dsZWFwaXMuY29tXC9hdXRoXC95b3V0dWJlLmZvcmNlLXNzbCBodHRwczpcL1wvd3d3Lmdvb2dsZWFwaXMuY29tXC9hdXRoXC9kcml2ZSBvcGVuaWQiLCJ0b2tlbl90eXBlIjoiQmVhcmVyIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWpWaU5XUmtPV0psTkRCaU5XVXhZMll4TWpGbE16VTNNMk00WlRRNVpqRXlOVEkzTVRnelpETWlMQ0owZVhBaU9pSktWMVFpZlEuZXlKcGMzTWlPaUpvZEhSd2N6b3ZMMkZqWTI5MWJuUnpMbWR2YjJkc1pTNWpiMjBpTENKaGVuQWlPaUkwTXprME1qazBOVEE0TkRjdE1uSXhiMkUzYjJvNGNqQm9aMmh2Y0cxaFlYTnBNV0p5WkdKak0yWXlkbW91WVhCd2N5NW5iMjluYkdWMWMyVnlZMjl1ZEdWdWRDNWpiMjBpTENKaGRXUWlPaUkwTXprME1qazBOVEE0TkRjdE1uSXhiMkUzYjJvNGNqQm9aMmh2Y0cxaFlYTnBNV0p5WkdKak0yWXlkbW91WVhCd2N5NW5iMjluYkdWMWMyVnlZMjl1ZEdWdWRDNWpiMjBpTENKemRXSWlPaUl4TVRjeU1EazFNamcxTURjd05UZ3dPREEwTnpjaUxDSmxiV0ZwYkNJNkltMXZZbWxzWlMxc1pXZGxibVJ6TFRVNU1EWkFjR0ZuWlhNdWNHeDFjMmR2YjJkc1pTNWpiMjBpTENKbGJXRnBiRjkyWlhKcFptbGxaQ0k2ZEhKMVpTd2lZWFJmYUdGemFDSTZJbFk0VG5vNVJFZzBiRE5pTlVGbGQwTnJibEJRZUZFaUxDSnVZVzFsSWpvaVRXOWlhV3hsSUV4bFoyVnVaSE1nVEdsMlpTSXNJbkJwWTNSMWNtVWlPaUpvZEhSd2N6b3ZMMnhvTkM1bmIyOW5iR1YxYzJWeVkyOXVkR1Z1ZEM1amIyMHZMWE5TYjNJMFZFOVNkQzFKTDBGQlFVRkJRVUZCUVVGSkwwRkJRVUZCUVVGQlFVRkJMMEZEU0dremNtTnFZV0pYUWtSRmRuTmZSVmN3UzNKR1FWRmtPVkIzZDJ4TFExRXZjemsyTFdNdmNHaHZkRzh1YW5Cbklpd2laMmwyWlc1ZmJtRnRaU0k2SWsxdlltbHNaU0JNWldkbGJtUnpJRXhwZG1VaUxDSnNiMk5oYkdVaU9pSnBaQ0lzSW1saGRDSTZNVFUzTlRnd05qTXhPQ3dpWlhod0lqb3hOVGMxT0RBNU9URTRmUS56aTBCYlg4LWxiU0J6VGo0bXMyNjQzd1hTWWJmY1FqY2pxQ1hURHMtelNGY2hsdVVfUC04QWxrMmNyQ29kclRHUmVpMVJET1NfUXNUQ0hXSlQyMUd1U0E3Rk51c3hTY0RQMXhvS3RwUnIyNElxT2FWbDJhODZjMTFBTm50NnM4dlA3bms1S0hTb0pLLVB0NkllV25MOFNZZG5IeXN4X0JKMHlfamVnOHd3VWwySkRFSmpVcFU1ZHk4YVZvcHNJSXRoUU5QVWJQR09mdzdzblRwWFBXZnNyU01CWjJJQzU3anh0eFZ5VUpZSVphcmtlMGJRbFpyRmpwa2dGb0ZuOGVINjVxaG1aakRyZEZ2WWxYNFhyeUhCME01ald4WElBM1FKaVh3NzlKOEtaODZWTG9hdjFUYVQtSy00WmZ5ajg5SHJ6U2U4WkN4bXZfT3Bwd0FuMFU2TUEiLCJjcmVhdGVkIjoxNTc1ODA2MzE4fQ=='),
(81, 4, 'subscribed', '1'),
(82, 4, 'session_tokens', 'a:9:{s:64:\"300fb17ec222141eddf4283032cf0ab7021f6dbbd02ff208118edb40f359a04d\";a:4:{s:10:\"expiration\";i:1575981495;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575808695;}s:64:\"89bb7240d1f211533ea9c9bdd6bd18b1e60d7c34601cd2c31216a97e0c9b219f\";a:4:{s:10:\"expiration\";i:1575981495;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575808695;}s:64:\"042cce038375cd1122ebf8affb4e287ea6fd0f1fe212ac6e170174fd1ab4e6f7\";a:4:{s:10:\"expiration\";i:1575981495;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575808695;}s:64:\"c9699453c3619b2021e87821f6a62af016bd17aabde826f497049947a1806e1b\";a:4:{s:10:\"expiration\";i:1575981496;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575808696;}s:64:\"0fe8bbea32c85e153859cf7357d8d2e528670a1ba36173609c4070e810f20a87\";a:4:{s:10:\"expiration\";i:1575981496;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575808696;}s:64:\"1e8e22bbdf550146f01f2c890951d6ef92d1502717682687f433e31e9c94b733\";a:4:{s:10:\"expiration\";i:1575981496;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575808696;}s:64:\"d8e4993d3b94c796716383a6c375c9df728dbef44b19078863e0128c666753c3\";a:4:{s:10:\"expiration\";i:1575981496;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575808696;}s:64:\"472bf51f82031b7d636f092891fffbb0d260c81ace8cafc08e3dc70e2b3cafd5\";a:4:{s:10:\"expiration\";i:1575981497;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575808697;}s:64:\"a6210e4e4a2f6b947b065640796b272758749dd08c0f05317c2af6620fc72e12\";a:4:{s:10:\"expiration\";i:1575981498;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575808698;}}'),
(83, 5, 'nickname', 'dimascyber008'),
(84, 5, 'first_name', ''),
(85, 5, 'last_name', ''),
(86, 5, 'description', ''),
(87, 5, 'rich_editing', 'true'),
(88, 5, 'syntax_highlighting', 'true'),
(89, 5, 'comment_shortcuts', 'false'),
(90, 5, 'admin_color', 'fresh'),
(91, 5, 'use_ssl', '0'),
(92, 5, 'show_admin_bar_front', 'true'),
(93, 5, 'locale', ''),
(94, 5, 'wp_capabilities', 'a:1:{s:10:\"subscriber\";b:1;}'),
(95, 5, 'wp_user_level', '0'),
(97, 5, 'google_token', 'eyJhY2Nlc3NfdG9rZW4iOiJ5YTI5LkltQzBCLTBmQXJidF9xVFZkeEtuV0pKVk85ZTFYSDVJcjgzV2NYS3gwSmQxSVVVNVdMZUl6MVdYeGp2UkltZzhVcGY1aFhlMENOY1BuR0hra0NaY2szb29sa25teW9jRlBzMWVZM2dNN0N3WWZwVHpHZ0pKZkg0WHF3UzByekRVZ3c4IiwiZXhwaXJlc19pbiI6MzYwMCwic2NvcGUiOiJodHRwczpcL1wvd3d3Lmdvb2dsZWFwaXMuY29tXC9hdXRoXC9hbmFseXRpY3MucmVhZG9ubHkgaHR0cHM6XC9cL3d3dy5nb29nbGVhcGlzLmNvbVwvYXV0aFwvZHJpdmUgaHR0cHM6XC9cL3d3dy5nb29nbGVhcGlzLmNvbVwvYXV0aFwvdXNlcmluZm8ucHJvZmlsZSBodHRwczpcL1wvd3d3Lmdvb2dsZWFwaXMuY29tXC9hdXRoXC95b3V0dWJlLnJlYWRvbmx5IG9wZW5pZCBodHRwczpcL1wvd3d3Lmdvb2dsZWFwaXMuY29tXC9hdXRoXC95b3V0dWJlIGh0dHBzOlwvXC93d3cuZ29vZ2xlYXBpcy5jb21cL2F1dGhcL3lvdXR1YmUuZm9yY2Utc3NsIGh0dHBzOlwvXC93d3cuZ29vZ2xlYXBpcy5jb21cL2F1dGhcL3VzZXJpbmZvLmVtYWlsIiwidG9rZW5fdHlwZSI6IkJlYXJlciIsImlkX3Rva2VuIjoiZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNklqVmlOV1JrT1dKbE5EQmlOV1V4WTJZeE1qRmxNelUzTTJNNFpUUTVaakV5TlRJM01UZ3paRE1pTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBjM01pT2lKb2RIUndjem92TDJGalkyOTFiblJ6TG1kdmIyZHNaUzVqYjIwaUxDSmhlbkFpT2lJME16azBNamswTlRBNE5EY3RNbkl4YjJFM2IybzRjakJvWjJodmNHMWhZWE5wTVdKeVpHSmpNMll5ZG1vdVlYQndjeTVuYjI5bmJHVjFjMlZ5WTI5dWRHVnVkQzVqYjIwaUxDSmhkV1FpT2lJME16azBNamswTlRBNE5EY3RNbkl4YjJFM2IybzRjakJvWjJodmNHMWhZWE5wTVdKeVpHSmpNMll5ZG1vdVlYQndjeTVuYjI5bmJHVjFjMlZ5WTI5dWRHVnVkQzVqYjIwaUxDSnpkV0lpT2lJeE1EZ3hOekUwT0RrM01EZ3lNVGcyTkRnMk9ERWlMQ0psYldGcGJDSTZJbVJwYldGelkzbGlaWEl3TURoQVoyMWhhV3d1WTI5dElpd2laVzFoYVd4ZmRtVnlhV1pwWldRaU9uUnlkV1VzSW1GMFgyaGhjMmdpT2lKR1ZqZDNZbEI0WHpKMlptNW1TRm8xUlZOamJIaEJJaXdpYVdGMElqb3hOVGMxT1RrMk1qTTBMQ0psZUhBaU9qRTFOelU1T1RrNE16UjkuV0ZBZU45ZzBMQlRpSXdDTlVjbEIyNk1yZ2wyY1NtZEFDZ1dlaWxyZi1nNzhNYUtZeV9BOTFNRXJHR1ZKeDdWVG9CU0FSMlBhdnNpUHFkclhZZlZ0TWRtaFFITlhLcUN3Y1h5ZUVIM3B2dEN3UHBGQ19TV1Qwek1RaS0tXzVuMmlFTUpqZGdmUEt1amV6VGFURXQ0a0xmNVY3Y2xrMFFtVmM3STdWU3Y3UkpweXB0TzBUWGhseEVnN3Y2UzFfb0dxODNEVUNWazhZYkcyVnRWaUI5c3J3QmFjS3pFYk9feWdQU0hvUkJyV19ZMDItWC1fWDI2WDFGWG9pWDdJaVREVUItRTcxWlVNRWxrR3BqTEUxN1RsTlppV0NJT3pMbEpTdm5CSHZZcFhHU0RJS01MMjVsWWZWeWNLRlI4aW0wY2xvVnUyeUtzNjlfTWFSZVRPMzRPWW1nIiwiY3JlYXRlZCI6MTU3NTk5NjIzNywicmVmcmVzaF90b2tlbiI6IjFcL1wvMGd1cW9xTEtET29ENUNnWUlBUkFBR0JBU053Ri1MOUlycXI0eXVpNjJuS3EtbmFzLWlVZy1WX04xR3REX095NTdXSXdRT25oN0hMVzA3c3BaOEp6TTNHUUxibkNRUUZiQm1VdyJ9'),
(98, 5, 'blogger_email', 'dimascyber008.superuser@blogger.com'),
(99, 5, 'subscribed', '1'),
(100, 5, 'session_tokens', 'a:9:{s:64:\"f3c99f9d4fe979cf8015123e564d149d82b151129042e91979c0b5827858ef0f\";a:4:{s:10:\"expiration\";i:1576170722;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575997922;}s:64:\"d070e873f869bb5b865d2010806ab63b466cdd44de99b46371385c98e4b08206\";a:4:{s:10:\"expiration\";i:1576170723;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575997923;}s:64:\"143a343cad4c682b782a84edb74f4e1057920a12ccda823083b89fb0d5948ff3\";a:4:{s:10:\"expiration\";i:1576170725;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575997925;}s:64:\"2db661083d74d7a16a90ceacc9bf9a31a8c3b0301624a81a31fae54815a75402\";a:4:{s:10:\"expiration\";i:1576170726;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575997926;}s:64:\"ed3c80520c2d2a158cfe712fb963573e359e531d783f41d799430b8ad07f799b\";a:4:{s:10:\"expiration\";i:1576170726;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575997926;}s:64:\"e5381ea3c1ca974b3a0316e638750ce0fbcc41ab76dccec6ee04ba6d78ff1bf8\";a:4:{s:10:\"expiration\";i:1576170727;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575997927;}s:64:\"326ca070299b5f5343f1c1ae55ff8d0dc115a71f06e468f26f4c46945f53bf48\";a:4:{s:10:\"expiration\";i:1576170727;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575997927;}s:64:\"7d6b4b000b1795be55b927ddaf360c3f0a83bebb484e7fd3d05c673a8f5b03e0\";a:4:{s:10:\"expiration\";i:1576170727;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575997927;}s:64:\"b916e99488bbff284dcbd3d5341212b0ad00b8fd14d2f1ea023ac826e3071ace\";a:4:{s:10:\"expiration\";i:1576170728;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1575997928;}}'),
(101, 3, 'google_token', 'eyJhY2Nlc3NfdG9rZW4iOiJ5YTI5LklsLTFCeGZNdE14aERmbEtOeEt4TmUzNXZ2ODJoLWJRLWpRWXVFYk44NVAzQmpuYUFpa1pNV2t1NkhLNF9UX3RvYmtLNlBpUEpoS3BEV3lpQnhvRU1za2VVekxnVGNkemhzajdyMnl5WGlUMWViX0Zjc0Zqb1dwZjYyelJqOTFxM3ciLCJleHBpcmVzX2luIjozNjAwLCJyZWZyZXNoX3Rva2VuIjoiMVwvXC8wZ05lUjdqTmY1emlOQ2dZSUFSQUFHQkFTTndGLUw5SXJtdzdyVUxVcmJ1Wll0a2RYbEU0dVZqVERCeTlkUUJmdEpSb2hxaHNFRU8xY1RFSXRlRTZUVTFuODk1XzI1bVkzQkUwIiwic2NvcGUiOiJodHRwczpcL1wvd3d3Lmdvb2dsZWFwaXMuY29tXC9hdXRoXC9kcml2ZSBodHRwczpcL1wvd3d3Lmdvb2dsZWFwaXMuY29tXC9hdXRoXC9hbmFseXRpY3MucmVhZG9ubHkgaHR0cHM6XC9cL3d3dy5nb29nbGVhcGlzLmNvbVwvYXV0aFwveW91dHViZS5yZWFkb25seSBodHRwczpcL1wvd3d3Lmdvb2dsZWFwaXMuY29tXC9hdXRoXC91c2VyaW5mby5lbWFpbCBodHRwczpcL1wvd3d3Lmdvb2dsZWFwaXMuY29tXC9hdXRoXC95b3V0dWJlIGh0dHBzOlwvXC93d3cuZ29vZ2xlYXBpcy5jb21cL2F1dGhcL3lvdXR1YmUuZm9yY2Utc3NsIGh0dHBzOlwvXC93d3cuZ29vZ2xlYXBpcy5jb21cL2F1dGhcL3VzZXJpbmZvLnByb2ZpbGUgb3BlbmlkIiwidG9rZW5fdHlwZSI6IkJlYXJlciIsImlkX3Rva2VuIjoiZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNklqVmlOV1JrT1dKbE5EQmlOV1V4WTJZeE1qRmxNelUzTTJNNFpUUTVaakV5TlRJM01UZ3paRE1pTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBjM01pT2lKb2RIUndjem92TDJGalkyOTFiblJ6TG1kdmIyZHNaUzVqYjIwaUxDSmhlbkFpT2lJME16azBNamswTlRBNE5EY3RNbkl4YjJFM2IybzRjakJvWjJodmNHMWhZWE5wTVdKeVpHSmpNMll5ZG1vdVlYQndjeTVuYjI5bmJHVjFjMlZ5WTI5dWRHVnVkQzVqYjIwaUxDSmhkV1FpT2lJME16azBNamswTlRBNE5EY3RNbkl4YjJFM2IybzRjakJvWjJodmNHMWhZWE5wTVdKeVpHSmpNMll5ZG1vdVlYQndjeTVuYjI5bmJHVjFjMlZ5WTI5dWRHVnVkQzVqYjIwaUxDSnpkV0lpT2lJeE1EY3hOekV4TWpFNU5qUTFPVFl3TkRBek5qRWlMQ0psYldGcGJDSTZJbTExYzJsakxXOXViSGt0TkRjNU9FQndZV2RsY3k1d2JIVnpaMjl2WjJ4bExtTnZiU0lzSW1WdFlXbHNYM1psY21sbWFXVmtJanAwY25WbExDSmhkRjlvWVhOb0lqb2lWbEZMZW5kek5GUTBkVWxHTUZWV01GWkJhWHAxZHlJc0ltNWhiV1VpT2lKTmRYTnBZeUJQYm14NUlpd2ljR2xqZEhWeVpTSTZJbWgwZEhCek9pOHZiR2d6TG1kdmIyZHNaWFZ6WlhKamIyNTBaVzUwTG1OdmJTOWhMUzlCUVhWRk4yMUVWRlkwY0RSV01HWm5VRE5xTjJsZlRUaFFkWFZxVlVVNGJWOXFZVGxxVDNabVVrdFZWVDF6T1RZdFl5SXNJbWRwZG1WdVgyNWhiV1VpT2lKTmRYTnBZeUJQYm14NUlpd2liRzlqWVd4bElqb2lhV1FpTENKcFlYUWlPakUxTnpZd09UUXlPREVzSW1WNGNDSTZNVFUzTmpBNU56ZzRNWDAuVGhzLVhPdzBoa0NESUN1cnZzdmhsOERweGtkVEstUTF5NVI0MVV1RmxPRXQxUXV6T2ZZb0ROUVFYV3MyYmQ2WnNrMGJBZDZnSU5SbXdDamxYbmhCRXd5Y1NaNTlGYnJWdTFOay0xOFBNU3hZVWdDc3hmU04tcWhjTG9nU19ScjlYZHVRZFpaV3Y1dWliOUd1ZjNZaEVoNlZ4N0pWZkk3ZE5ITVp5N3k2dW43YlFyY0JyY0lPREFaUnYwdFJuR2J5QXZfU0M3RlVSNk9Sc3NTODE0RG5OUVU1aWRXd1VKSkdqOERpa3lFTnljQVJOLWlvWE9vOGdkajF6dXNLMVMzWHJ4UjVXcG5rcVg1NnRHUEJ1ekpRX0hrOUZBN0lVb1N5c1hzbExMUEFmZ2ZfamNUc085RHIyNkxNS09mMFN2R0tOM1BYczNzbm1lbWpacXJmQnNLOGV3IiwiY3JlYXRlZCI6MTU3NjA5NDI4MX0='),
(102, 3, 'session_tokens', 'a:9:{s:64:\"5eaf04920060e31a60efea5edb386a4842b25a16be1f2e5347d314d9eb12e5c9\";a:4:{s:10:\"expiration\";i:1576267096;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1576094296;}s:64:\"7d8b95a8930b423125a186d6f736b1a85ee83b5c0bf4ebaf6659c568e139cfa8\";a:4:{s:10:\"expiration\";i:1576267097;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1576094297;}s:64:\"4c331791d73bde931486d163c3f6d9d3ca18dfdb892afdd9b62561889685fd9e\";a:4:{s:10:\"expiration\";i:1576267098;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1576094298;}s:64:\"b0ae13744e39f60a6ce20039a3d7f11db41288e989679aacc65c4e9171bcff77\";a:4:{s:10:\"expiration\";i:1576267099;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1576094299;}s:64:\"29b5f871e4e15884079e5e41b39a19cc0b56e10a4784cdc024d43e428fb0e9f9\";a:4:{s:10:\"expiration\";i:1576267099;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1576094299;}s:64:\"a1bc9df95b0ad6f1be6221ecb3a370f7337a5c26e736ae21e244cb621fb53840\";a:4:{s:10:\"expiration\";i:1576267099;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1576094299;}s:64:\"9a8917404f692d5377a6eb7a1ac8c56242cd991ba9338b743832be1b27ca2af2\";a:4:{s:10:\"expiration\";i:1576267100;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1576094300;}s:64:\"135ea45a4276d6c9d825dbb66f7b4790b0e229ef59833863cf18dec00ff301dd\";a:4:{s:10:\"expiration\";i:1576267100;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1576094300;}s:64:\"ad4fae9a593f3aedcee4ab4ffd048c53e1df79b39193fb59d8fb5d94e1ae1ce1\";a:4:{s:10:\"expiration\";i:1576267101;s:2:\"ip\";s:9:\"127.0.0.1\";s:2:\"ua\";s:115:\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\";s:5:\"login\";i:1576094301;}}');

-- --------------------------------------------------------

--
-- Struktur dari tabel `wp_users`
--

CREATE TABLE `wp_users` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `user_login` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_pass` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_nicename` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_url` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_registered` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_activation_key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_status` int(11) NOT NULL DEFAULT 0,
  `display_name` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `wp_users`
--

INSERT INTO `wp_users` (`ID`, `user_login`, `user_pass`, `user_nicename`, `user_email`, `user_url`, `user_registered`, `user_activation_key`, `user_status`, `display_name`) VALUES
(1, 'dimaslanjaka', '$P$Bp.Jrywx.10w12YsPBKageF4fsHvfj/', 'dimaslanjaka', 'dimaslanjaka@gmail.com', '', '2019-11-29 17:11:35', '', 0, 'dimaslanjaka'),
(2, 'webmanajemen', '$P$BRegTC2FSBnUYYFk5zEB4yEu/wvRuH1', 'webmanajemen', 'webmanajemen@gmail.com', '', '2019-12-04 03:56:16', '', 0, 'webmanajemen'),
(3, 'music-only-4798', '$P$BK/i6TV6jYLbhwI2XRZMGBAra8/Jc61', 'music-only-4798', 'music-only-4798@pages.plusgoogle.com', '', '2019-12-08 07:11:11', '', 0, 'music-only-4798'),
(4, 'mobile-legends-5906', '$P$BPHL8GsTqLKr./hDKb22bqnelb6AiJ.', 'mobile-legends-5906', 'mobile-legends-5906@pages.plusgoogle.com', '', '2019-12-08 11:58:38', '', 0, 'mobile-legends-5906'),
(5, 'dimascyber008', '$P$B1jD1BUg58aZbqbd40on7jdPa/Ee.D0', 'dimascyber008', 'dimascyber008@gmail.com', '', '2019-12-10 10:43:28', '', 0, 'dimascyber008');

-- --------------------------------------------------------

--
-- Struktur dari tabel `wp_youtube`
--

CREATE TABLE `wp_youtube` (
  `id` mediumint(9) NOT NULL,
  `time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ids` varchar(255) NOT NULL,
  `visit` mediumint(11) NOT NULL DEFAULT 0,
  `mp3` mediumint(11) NOT NULL DEFAULT 0,
  `mp4` mediumint(11) NOT NULL DEFAULT 0,
  `google_drive` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `agc`
--
ALTER TABLE `agc`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `bubo9_commentmeta`
--
ALTER TABLE `bubo9_commentmeta`
  ADD PRIMARY KEY (`meta_id`),
  ADD KEY `comment_id` (`comment_id`),
  ADD KEY `meta_key` (`meta_key`(191));

--
-- Indeks untuk tabel `bubo9_comments`
--
ALTER TABLE `bubo9_comments`
  ADD PRIMARY KEY (`comment_ID`),
  ADD KEY `comment_post_ID` (`comment_post_ID`),
  ADD KEY `comment_approved_date_gmt` (`comment_approved`,`comment_date_gmt`),
  ADD KEY `comment_date_gmt` (`comment_date_gmt`),
  ADD KEY `comment_parent` (`comment_parent`),
  ADD KEY `comment_author_email` (`comment_author_email`(10));

--
-- Indeks untuk tabel `bubo9_links`
--
ALTER TABLE `bubo9_links`
  ADD PRIMARY KEY (`link_id`),
  ADD KEY `link_visible` (`link_visible`);

--
-- Indeks untuk tabel `bubo9_options`
--
ALTER TABLE `bubo9_options`
  ADD PRIMARY KEY (`option_id`),
  ADD UNIQUE KEY `option_name` (`option_name`),
  ADD KEY `autoload` (`autoload`);

--
-- Indeks untuk tabel `bubo9_postmeta`
--
ALTER TABLE `bubo9_postmeta`
  ADD PRIMARY KEY (`meta_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `meta_key` (`meta_key`(191));

--
-- Indeks untuk tabel `bubo9_posts`
--
ALTER TABLE `bubo9_posts`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `post_name` (`post_name`(191)),
  ADD KEY `type_status_date` (`post_type`,`post_status`,`post_date`,`ID`),
  ADD KEY `post_parent` (`post_parent`),
  ADD KEY `post_author` (`post_author`);

--
-- Indeks untuk tabel `bubo9_termmeta`
--
ALTER TABLE `bubo9_termmeta`
  ADD PRIMARY KEY (`meta_id`),
  ADD KEY `term_id` (`term_id`),
  ADD KEY `meta_key` (`meta_key`(191));

--
-- Indeks untuk tabel `bubo9_terms`
--
ALTER TABLE `bubo9_terms`
  ADD PRIMARY KEY (`term_id`),
  ADD KEY `slug` (`slug`(191)),
  ADD KEY `name` (`name`(191));

--
-- Indeks untuk tabel `bubo9_term_relationships`
--
ALTER TABLE `bubo9_term_relationships`
  ADD PRIMARY KEY (`object_id`,`term_taxonomy_id`),
  ADD KEY `term_taxonomy_id` (`term_taxonomy_id`);

--
-- Indeks untuk tabel `bubo9_term_taxonomy`
--
ALTER TABLE `bubo9_term_taxonomy`
  ADD PRIMARY KEY (`term_taxonomy_id`),
  ADD UNIQUE KEY `term_id_taxonomy` (`term_id`,`taxonomy`),
  ADD KEY `taxonomy` (`taxonomy`);

--
-- Indeks untuk tabel `bubo9_usermeta`
--
ALTER TABLE `bubo9_usermeta`
  ADD PRIMARY KEY (`umeta_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `meta_key` (`meta_key`(191));

--
-- Indeks untuk tabel `bubo9_users`
--
ALTER TABLE `bubo9_users`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `user_login_key` (`user_login`),
  ADD KEY `user_nicename` (`user_nicename`),
  ADD KEY `user_email` (`user_email`);

--
-- Indeks untuk tabel `wp_commentmeta`
--
ALTER TABLE `wp_commentmeta`
  ADD PRIMARY KEY (`meta_id`),
  ADD KEY `comment_id` (`comment_id`),
  ADD KEY `meta_key` (`meta_key`(191));

--
-- Indeks untuk tabel `wp_comments`
--
ALTER TABLE `wp_comments`
  ADD PRIMARY KEY (`comment_ID`),
  ADD KEY `comment_post_ID` (`comment_post_ID`),
  ADD KEY `comment_approved_date_gmt` (`comment_approved`,`comment_date_gmt`),
  ADD KEY `comment_date_gmt` (`comment_date_gmt`),
  ADD KEY `comment_parent` (`comment_parent`),
  ADD KEY `comment_author_email` (`comment_author_email`(10));

--
-- Indeks untuk tabel `wp_links`
--
ALTER TABLE `wp_links`
  ADD PRIMARY KEY (`link_id`),
  ADD KEY `link_visible` (`link_visible`);

--
-- Indeks untuk tabel `wp_options`
--
ALTER TABLE `wp_options`
  ADD PRIMARY KEY (`option_id`),
  ADD UNIQUE KEY `option_name` (`option_name`),
  ADD KEY `autoload` (`autoload`);

--
-- Indeks untuk tabel `wp_postmeta`
--
ALTER TABLE `wp_postmeta`
  ADD PRIMARY KEY (`meta_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `meta_key` (`meta_key`(191));

--
-- Indeks untuk tabel `wp_posts`
--
ALTER TABLE `wp_posts`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `post_name` (`post_name`(191)),
  ADD KEY `type_status_date` (`post_type`,`post_status`,`post_date`,`ID`),
  ADD KEY `post_parent` (`post_parent`),
  ADD KEY `post_author` (`post_author`);

--
-- Indeks untuk tabel `wp_termmeta`
--
ALTER TABLE `wp_termmeta`
  ADD PRIMARY KEY (`meta_id`),
  ADD KEY `term_id` (`term_id`),
  ADD KEY `meta_key` (`meta_key`(191));

--
-- Indeks untuk tabel `wp_terms`
--
ALTER TABLE `wp_terms`
  ADD PRIMARY KEY (`term_id`),
  ADD KEY `slug` (`slug`(191)),
  ADD KEY `name` (`name`(191));

--
-- Indeks untuk tabel `wp_term_relationships`
--
ALTER TABLE `wp_term_relationships`
  ADD PRIMARY KEY (`object_id`,`term_taxonomy_id`),
  ADD KEY `term_taxonomy_id` (`term_taxonomy_id`);

--
-- Indeks untuk tabel `wp_term_taxonomy`
--
ALTER TABLE `wp_term_taxonomy`
  ADD PRIMARY KEY (`term_taxonomy_id`),
  ADD UNIQUE KEY `term_id_taxonomy` (`term_id`,`taxonomy`),
  ADD KEY `taxonomy` (`taxonomy`);

--
-- Indeks untuk tabel `wp_usermeta`
--
ALTER TABLE `wp_usermeta`
  ADD PRIMARY KEY (`umeta_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `meta_key` (`meta_key`(191));

--
-- Indeks untuk tabel `wp_users`
--
ALTER TABLE `wp_users`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `user_login_key` (`user_login`),
  ADD KEY `user_nicename` (`user_nicename`),
  ADD KEY `user_email` (`user_email`);

--
-- Indeks untuk tabel `wp_youtube`
--
ALTER TABLE `wp_youtube`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `agc`
--
ALTER TABLE `agc`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `bubo9_commentmeta`
--
ALTER TABLE `bubo9_commentmeta`
  MODIFY `meta_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `bubo9_comments`
--
ALTER TABLE `bubo9_comments`
  MODIFY `comment_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `bubo9_links`
--
ALTER TABLE `bubo9_links`
  MODIFY `link_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `bubo9_options`
--
ALTER TABLE `bubo9_options`
  MODIFY `option_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=185;

--
-- AUTO_INCREMENT untuk tabel `bubo9_postmeta`
--
ALTER TABLE `bubo9_postmeta`
  MODIFY `meta_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `bubo9_posts`
--
ALTER TABLE `bubo9_posts`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `bubo9_termmeta`
--
ALTER TABLE `bubo9_termmeta`
  MODIFY `meta_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `bubo9_terms`
--
ALTER TABLE `bubo9_terms`
  MODIFY `term_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `bubo9_term_taxonomy`
--
ALTER TABLE `bubo9_term_taxonomy`
  MODIFY `term_taxonomy_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `bubo9_usermeta`
--
ALTER TABLE `bubo9_usermeta`
  MODIFY `umeta_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT untuk tabel `bubo9_users`
--
ALTER TABLE `bubo9_users`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `wp_commentmeta`
--
ALTER TABLE `wp_commentmeta`
  MODIFY `meta_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `wp_comments`
--
ALTER TABLE `wp_comments`
  MODIFY `comment_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `wp_links`
--
ALTER TABLE `wp_links`
  MODIFY `link_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `wp_options`
--
ALTER TABLE `wp_options`
  MODIFY `option_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=417;

--
-- AUTO_INCREMENT untuk tabel `wp_postmeta`
--
ALTER TABLE `wp_postmeta`
  MODIFY `meta_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `wp_posts`
--
ALTER TABLE `wp_posts`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `wp_termmeta`
--
ALTER TABLE `wp_termmeta`
  MODIFY `meta_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `wp_terms`
--
ALTER TABLE `wp_terms`
  MODIFY `term_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `wp_term_taxonomy`
--
ALTER TABLE `wp_term_taxonomy`
  MODIFY `term_taxonomy_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `wp_usermeta`
--
ALTER TABLE `wp_usermeta`
  MODIFY `umeta_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT untuk tabel `wp_users`
--
ALTER TABLE `wp_users`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `wp_youtube`
--
ALTER TABLE `wp_youtube`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
