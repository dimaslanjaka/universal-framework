<?php
if ( defined( 'WP_UNINSTALL_PLUGIN' ) ) {
    global $wpdb;
    $wpdb->query( 'DELETE FROM wp_options WHERE option_name LIKE "hreflangtags_dismissed_%";' );
}