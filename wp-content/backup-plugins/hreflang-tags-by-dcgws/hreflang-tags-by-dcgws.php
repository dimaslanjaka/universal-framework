<?php
/*
Plugin Name: HREFLANG Tags Lite
Plugin URI: https://wordpress.org/plugins/hreflang-tags-by-dcgws/
Description: Smart implementation of HREFLANG meta tags into the head section of your WordPress site.
Version: 2.0.0
Author: Vagary Digital
Author URI: http://dcgws.com
License: GPLv2 or later
Text Domain: hreflang-tags-by-dcgws
Domain Path: /languages

    Copyright 2016  Vagary Digital (email : website.solutions@dcgws.com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/
if ('hreflang-tags-by-dcgws.php' == basename($_SERVER['SCRIPT_FILENAME']))
	die ('Please do not access this file directly. Thanks!');


if (! defined('HREFLANG_VERSION'))
    define('HREFLANG_VERSION', '2.0.0');

if (! defined('HREFLANG_PLUGIN_FILE'))
    define('HREFLANG_PLUGIN_FILE', __FILE__);


if (! defined('HREFLANG_PLUGIN_MAIN_PATH'))
	define('HREFLANG_PLUGIN_MAIN_PATH', plugin_dir_path( HREFLANG_PLUGIN_FILE ));

require_once(HREFLANG_PLUGIN_MAIN_PATH.'hreflang-init.php');
