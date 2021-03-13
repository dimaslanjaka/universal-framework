<?php
/**
 * A small plugin to exclude WordPress generated image thumbnails from Updraft backups, saving space.
 *
 * @link              https://dream-encode.com
 * @since             1.0.0
 *
 * @wordpress-plugin
 * Plugin Name:       Exclude Image Thumbnails From UpdraftPlus Backups
 * Description:       A small plugin to exclude WordPress generated image thumbnails from Updraft backups.
 * Version:           1.0.2
 * Author:            Dream-Encode
 * Author URI:        https://dream-encode.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

add_filter( 'updraftplus_exclude_file', 'de_updraftplus_exclude_file', 10, 2 );

function de_updraftplus_exclude_file( $filter, $file ) {
    return preg_match( "/-\d+x\d+\.(?:png|jpe?g|bmp|tiff|gif)$/", $file ) ? true : $filter;
}
