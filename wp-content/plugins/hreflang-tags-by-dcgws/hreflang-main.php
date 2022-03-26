<?php
/**
 *
 *  @package HREFLANG Tags Pro\Main
 *  @since 1.3.3
 *
 */

if ( ! function_exists( 'add_filter' ) ) {
	header( 'Status: 403 Forbidden' );
	header( 'HTTP/1.1 403 Forbidden' );
	exit();
}

$active_tab = isset($_GET['tab']) ? $_GET['tab'] : 'hreflang_dashboard';
?>

<div class="wrap hreflang-tags-wrap">
	<div class="header-banner">
		<img src="<?php echo plugin_dir_url( HREFLANG_PLUGIN_FILE ) . 'assets/images/header-banner.png'; ?>">
	</div>
	<?php
	require_once (ABSPATH . 'wp-admin/options-head.php');
 ?>
	<h1 id="hreflang-title"><?php
	_e('HREFLANG Tags', 'hreflang-tags-by-dcgws');
	if (defined('HREFLANG_VERSION')) {
		echo ' ' . HREFLANG_VERSION;
	}
        ?></h1>
<style type="text/css">
	.hreflang-container {
		display: table;
		width: 100%;
	}
	.hreflang-content {
		display: table-cell;
		height: 500px;
		margin: 0;
		padding: 0;
		vertical-align: top;
	}
	#hreflang-main-content {
		min-width: 800px;
	}
	#hreflang-sidebar-content {
		width: 261px;
		padding:0 0 0 20px;
	}
	.remove-ads {
	    margin-top: 0;
	    padding: 12px;
	    border: 1px solid #0075b3;
	    border-radius: 20px 20px 0;
	    background-color: #fff
	}
	</style>
<div class="hreflang-container">
	<div class="hreflang-content" id="hreflang-main-content">
<h2 class="nav-tab-wrapper">
		<a href="?page=HREFLANG&tab=hreflang_dashboard" class="nav-tab <?php echo $active_tab == 'hreflang_dashboard' ? 'nav-tab-active' : ''; ?>"><?php _e('Dashboard', 'hreflang-tags-by-dcgws') ?></a>
		<a href="?page=HREFLANG&tab=hreflang_generator" class="nav-tab <?php echo $active_tab == 'hreflang_generator' ? 'nav-tab-active' : ''; ?>"><?php _e('HTML Code Generator', 'hreflang-tags-by-dcgws') ?></a>
		<a href="?page=HREFLANG&tab=hreflang_bulk_editor" class="nav-tab <?php echo $active_tab == 'hreflang_bulk_editor' ? 'nav-tab-active' : ''; ?>"><?php _e('Bulk Editor', 'hreflang-tags-by-dcgws') ?></a>
		<a href="?page=HREFLANG&tab=hreflang_validation_tool" class="nav-tab <?php echo $active_tab == 'hreflang_validation_tool' ? 'nav-tab-active' : ''; ?>"><?php _e('Validation Tool', 'hreflang-tags-by-dcgws') ?></a>
		<a href="?page=HREFLANG&tab=hreflang_go_pro" class="nav-tab <?php echo $active_tab == 'hreflang_go_pro' ? 'nav-tab-active' : ''; ?>"><?php _e('Go Pro!', 'hreflang-tags-by-dcgws') ?></a>
</h2>
		<?php
		if (!defined('HREFLANG_PLUGIN_MAIN_PATH'))
			define('HREFLANG_PLUGIN_MAIN_PATH', plugin_dir_path(__FILE__));

		if ($active_tab == 'hreflang_dashboard') {
			if (file_exists(HREFLANG_PLUGIN_MAIN_PATH . 'tabs/dashboard.php')) {
				include_once (HREFLANG_PLUGIN_MAIN_PATH . 'tabs/dashboard.php');
			} else {
				echo 'File is missing';
			}
		}

		if ($active_tab == 'hreflang_generator') {

			if (file_exists(HREFLANG_PLUGIN_MAIN_PATH . 'tabs/generator.php')) {
				include_once (HREFLANG_PLUGIN_MAIN_PATH . 'tabs/generator.php');
			} else {
				echo 'File is missing';
			}

		}

		if ($active_tab == 'hreflang_bulk_editor') {

			if (file_exists(HREFLANG_PLUGIN_MAIN_PATH . 'tabs/bulk_editor.php')) {
				include_once (HREFLANG_PLUGIN_MAIN_PATH . 'tabs/bulk_editor.php');
			} else {
				echo 'File is missing';
			}

		}

		if ($active_tab == 'hreflang_validation_tool') {

			if (file_exists(HREFLANG_PLUGIN_MAIN_PATH . 'tabs/validation_tool.php')) {
				include_once (HREFLANG_PLUGIN_MAIN_PATH . 'tabs/validation_tool.php');
			} else {
				echo 'File is missing';
			}

		}

		if ($active_tab == 'hreflang_go_pro') {

			if (file_exists(HREFLANG_PLUGIN_MAIN_PATH . 'tabs/go_pro.php')) {
				include_once (HREFLANG_PLUGIN_MAIN_PATH . 'tabs/go_pro.php');
			} else {
				echo 'File is missing';
			}

		}
		?>
</div>
<div id="hreflang-sidebar-content" class="hreflang-content">
	<a target="_blank" href="http://dcgws.com/product/premium-seo-review/#utm_source=hreflang-config-main&utm_medium=banner&utm_campaign=premium-seo-review"><img src="//dcgws.com/wp-content/uploads/2016/06/website-review-button.png" width="261"/></a>
	<br>
	<br>
	<a target="_blank" href="https://www.hreflangtags.com/downloads/hreflang-tags-pro-plugin-wordpress/#utm_source=hreflang-config-main&utm_medium=banner&utm_campaign=hreflang-tags-pro"><img src="//dcgws.com/wp-content/uploads/2016/07/reflang-adds.jpg" width="261"/></a>
	<br>
	<br>
	<p class="remove-ads">
				<strong><?php _e('Remove this ad?','hreflang-tags-by-dcgws'); ?></strong><br>
				<a target="_blank" href="https://www.hreflangtags.com/downloads/hreflang-tags-pro-plugin-wordpress/#utm_source=hreflang-config-main&utm_medium=banner&utm_campaign=hreflang-tags-pro"><?php _e('Upgrade to HREFLANG Tags Pro','hreflang-tags-by-dcgws'); ?> »</a>
			</p>
</div>
</div>
</div>
