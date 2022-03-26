<?php

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

/** Site protocol */
$host = $_SERVER['HTTP_HOST'];
define('ROOT', $_SERVER['DOCUMENT_ROOT']);
define('WP_PROTOCOL', (isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http'));
define('WP_HOST', $host);
define('WP_ORIGIN', WP_PROTOCOL . '://' . WP_HOST);
define('REQUEST', $_SERVER['REQUEST_URI']);
define('FULL_URL', WP_PROTOCOL . "://" . WP_HOST . REQUEST);

// ** MySQL settings ** //
require __DIR__ . '/wp-key.php';
$hostname = 'localhost';
$user = 'root';
$pass = '';
$name = 'agcontents';

/*
if (preg_match('/localhost|127\.0\.0\.1|.*\.io/s', $host)) {
	$user = 'root';
	$pass = '';
	$name = 'agcontents';
} elseif ('agc.akarmas.com' == $host) {
	$name = 'aboutdev_wp';
	$user = 'aboutdev_agc';
	$pass = '[bangsadpo0l]';
} else if ($host == 'wp.webmanajemen.com') {
	//$hostname = 'localhost:3306';
	$name = 'wp497405_WMI';
	$user = 'wp497_WMI';
	$pass = 'X2^u2a3jfVhFqouc';
}*/

// ftp localhost fix
define('FS_METHOD', 'direct');

/* The name of the database for WordPress */
define('DB_NAME', $name);

/* MySQL database username */
define('DB_USER', $user);

/* MySQL database password */
define('DB_PASSWORD', $pass);

/* MySQL hostname */
define('DB_HOST', $hostname);

/* Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/* The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/** Repair DB */
define('WP_ALLOW_REPAIR', true);

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'a-YZxl=B&7j+Id^)2 hlxeidm[j5x{)+2B?F57|qhLq?ftYKY+u.K8eTS,*`6rKX');
define('SECURE_AUTH_KEY',  '_xDdu$)%%v/qQKj78O[r5F8ySdn<Sv`W-6rMNycZz00zhfMou /,Jp{2:[-yM4jQ');
define('LOGGED_IN_KEY',    '%,p-yTy`o!hUeE^Bei5MWVbr5]htj]K+4yFPqz.vc;8pQ>:WR>)Wd{A1#T`Wb0dX');
define('NONCE_KEY',        'R6d@B^GLp{=uo0s!,KC;{3vGYlsFi~6]AWG`$da+cm?8 ~HvM:2]dOq05D^{[wF[');
define('AUTH_SALT',        'B>iA`d(`/~#aWCIW1+hTVG1HDFg4mT2f!+#Lpj[S(m|!7)l20`V.|=_HU@Dm(H&&');
define('SECURE_AUTH_SALT', '~QYxyJ$CM-wDNW-Fry]nZ< i+RA^o<UB?/9$x?M&ijo7sVUx9>gJi8;/7!E)5<CV');
define('LOGGED_IN_SALT',   'Aq2BTU.)oDXiYquC1<|-~&Dn0 %sc,[g0)/WapzN?_%SK^n,(oQx,]~9bplX+OU-');
define('NONCE_SALT',       '/v~ 1i/<l9R[io*YOuNW$Q-F;A=mAinCh:NOZ>(TRj*vIq=z#KrXkklyL+!0=~2]');

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

define('WP_ALLOW_MULTISITE', true);
/*
define('MULTISITE', true);
define('SUBDOMAIN_INSTALL', false);
define('DOMAIN_CURRENT_SITE', $_SERVER['HTTP_HOST']);
define('PATH_CURRENT_SITE', '/');
define('SITE_ID_CURRENT_SITE', 1);
define('BLOG_ID_CURRENT_SITE', 1);
*/
//define('COOKIE_DOMAIN', $_SERVER['HTTP_HOST']);
define('WPMS_ON', true);
define('WPMS_SMTP_PASS', 'tvyjcdoawjrkvwxx');
define('WP_SITEURL', WP_PROTOCOL . '://' . $_SERVER['HTTP_HOST']);
define('WP_HOME', WP_PROTOCOL . '://' . $_SERVER['HTTP_HOST']);
//define('DISALLOW_FILE_EDIT', true);

/** Google API */

if (preg_match('/^(localhost|127\.0\.0\.1|agc\.io)/m', $_SERVER['HTTP_HOST'])) {
	$googleId = '974269993480-30i5epi0r6a9uiafq3rkpgsjuooe2t3q.apps.googleusercontent.com';
	$googleKey = 'AIzaSyDm21ZMgT6KQpjo3T0BFVH3DjhykYU5bXM';
	//'AIzaSyA7A6yPL2V8OBGh-DsQ1spG0suJfe5ZJaw';
	$googleSecret = 'hr0fWpSvBv3gkR3eMD93j6qS';
	$googleCallback = '';
} else {
	$googleId = '974269993480-7atd9c46sr0jaq21fauuoibrllqlqqja.apps.googleusercontent.com';
	$googleKey = 'AIzaSyDm21ZMgT6KQpjo3T0BFVH3DjhykYU5bXM';
	//'AIzaSyAk9Bw63Ew3tt4xogaaDJvM1Tt_TGRRNo0';
	$googleSecret = 'RvrAkt9Myftej6xK3t-AZGqy';
	$googleCallback = '';
}
define('GOOGLE_CLIENT_ID', $googleId);
define('GOOGLE_CLIENT_SECRET', $googleSecret);
define('GOOGLE_CLIENT_KEY', $googleKey);
define('GOOGLE_REDIRECT_URL', 'http://' . WP_HOST . '/AGC/callback');
define('DB_USER_TBL', 'users');
define('TEMP', ROOT . '/tmp');
define('COOKIEFILE', TEMP . '/cookie.txt');

/** DEBUG */
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', ROOT . '/tmp/wp-errors.log');
define('WP_DEBUG_DISPLAY', false);
define('SCRIPT_DEBUG', true);
define('SAVEQUERIES', true);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if (!defined('ABSPATH')) {
	define('ABSPATH', dirname(__FILE__) . '/');
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
