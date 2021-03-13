<?php
/*
 * Declare the settings page and link
 */
function fn_wpamp_settings_menu() {
	$plugin_info = get_plugin_data( WPAMP_PLUGIN_PATH.'/wp-amp-ninja.php');
	add_menu_page( $plugin_info['Name'], $plugin_info['Name'], 'manage_options', 'wp-amp-settings', 'fn_wpamp_settings_page', WPAMP_PLUGIN_URL . '/images/wpamp-icon.png' );
}
add_action('admin_menu', 'fn_wpamp_settings_menu');

/*
 * Form for AMP Settings Page
 */
function fn_wpamp_settings_page(){
	?>
    <div class="wrap wpampninja-settigns">
    	<h1>WP AMP Settings</h1>
	    <form method="post" name="amp_settigns" id="amp_settigns" action="options.php" enctype="multipart/form-data">
			
			<?php settings_fields("wpamp_settings"); ?>
            
			<?php if( get_transient('wpamp_notification') != '1' ) { ?>
                <div class="wpamp-container" id="wpamp_notification">
                    <h3><span class="dashicons dashicons-flag"></span> Notification </h3>
                    <div class="container">
                        <div class="wpamp-alert">
                            <p>We've noticed you've been using WP AMP Ninja for some time now; we hope you love it!</p>
                            <p>We'd be thrilled if you could <a href="https://wordpress.org/support/plugin/wp-amp-ninja/reviews/?rate=5#new-post" target="_blank">give us a 5* rating on WordPress.org</a>! If you are experiencing issues, <a href="https://wordpress.org/support/plugin/wp-amp-ninja" target="_blank">please create new topic</a> and we'll do our best to help you out.</p>
                            <p><a class="button" href="javascript:void(0);" id="hide_notification">Please don't show me this notification anymore</a></p>
                        </div>
                    </div>
                </div>
			<?php } ?>
                        
            <h2 class="nav-tab-wrapper">
                <a href="javascript:void(0);" id="tab-1" class="nav-tab nav-tab-active">Basic</a>
            </h2>
            
            <div class="tab-content">
                <div class="tab active" id="tab-1">
                    <table class="form-table wc_status_table widefat">
                        <tbody>
                        <tr>
                            <td width="350" valign="top"><b>Metadata Logo</b></td>
                            <td>
                                <?php $amplogo = get_option('amplogo'); ?>
                                <?php $logoid = get_option('logoid'); ?>
                                <input id="upload-button" type="button" class="button" value="Upload Image" />
                                <input id="amplogo" type="text" name="amplogo" value="<?=$amplogo;?>" readonly="readonly" size="50" />
                                <input id="logoid" type="hidden" name="logoid" value="<?=get_option('logoid');?>" />
                                <?php
                                    $logo_array = wp_get_attachment_image_src($logoid, 'thumbnail', false);
                                    $thumb_url = $logo_array[0];
                                    if($thumb_url != '' && $amplogo != '') {
                                        echo '<div class="showlogo"><img src="'.$thumb_url.'" id="mainsrc" /><span class="removeimg" id="removeimage"><img src="'.WPAMP_PLUGIN_URL.'images/close.png" /></span></div>';
                                    }
                                ?>
                            </td>
                        </tr>
                        <tr>
                            <td width="350" valign="top"><b>Favicon Icon</b></td>
                            <td>
                                <?php $ampfavicon = get_option('ampfavicon'); ?>
                                <?php $faviconid = get_option('faviconid'); ?>
                                <input id="upload-icon" type="button" class="button" value="Upload Icon" />
                                <input id="ampfavicon" type="text" name="ampfavicon" value="<?=$ampfavicon;?>" readonly="readonly" size="50" />
                                <input id="faviconid" type="hidden" name="faviconid" value="<?=get_option('faviconid');?>" />
                                <?php
                                    $logo_array = wp_get_attachment_image_src($faviconid, 'full', false);
                                    $thumb_url = $logo_array[0];
                                    if($thumb_url != '' && $ampfavicon != '') {
                                        echo '<div class="showicon"><img src="'.$thumb_url.'" id="mainsrc" /><span class="removeimg" id="removeicon"><img src="'.WPAMP_PLUGIN_URL.'images/close.png" /></span></div>';
                                    }
                                ?>
                            </td>
                        </tr>
                        <tr>
                            <td valign="top"><b>Display AMP Header</b></td>
                            <td>
                                <input type="radio" name="amp_header" id="amp_header_0" value="0" <?php if(get_option('amp_header')!='1'){ echo 'checked';} ?> /> <label for="amp_header_0">Site Title</label>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="radio" name="amp_header" id="amp_header_1" value="1" <?php if(get_option('amp_header')=='1'){ echo 'checked';} ?> /> <label for="amp_header_1">Logo</label>
                            </td>
                        </tr>
                        <tr>
                            <td valign="top"><b>Google Analytics ID</b></td>
                            <td><input type="text" name="amp_gaid" id="amp_gaid" value="<?php echo get_option('amp_gaid'); ?>" placeholder="UA-XXXXX-X" /></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <?php submit_button("Save Settings"); ?>
            
            <h4>If you like this plug-in, please support us by leaving review with 5 stars rating at <a href="https://wordpress.org/support/plugin/wp-amp-ninja/reviews/?rate=5#new-post" target="_blank">here</a>.</h4>
            <span>We see suggestions as an opportunity to improve our services. Your suggestion are valuable to us and will be considered as part of our ongoing activities to improve our services. <br />If you would like to make a suggestion, please write us an email to - <a href="mailto:support@wpampninja.com">support@wpampninja.com</a></span>
            
	    </form>
    </div>
	<?php
}

/*
 * Form for AMP Settings Page
 */
function activate_wpamp_panel_fields()
{
	add_settings_section("wpamp_settings", null, null, "wpamp-settings");
	
    register_setting("wpamp_settings", "amp_gaid");
    register_setting("wpamp_settings", "amplogo");
    register_setting("wpamp_settings", "logoid");
    register_setting("wpamp_settings", "ampfavicon");
    register_setting("wpamp_settings", "faviconid");
	register_setting("wpamp_settings", "amp_header");
}
add_action("admin_init", "activate_wpamp_panel_fields");
 
/*
 * Include script to admin
 */
function load_wpamp_admin_script() {
	wp_enqueue_media();
	wp_register_script( 'wpamp_admin_js', WPAMP_PLUGIN_URL. 'js/script.js' , array('jquery') );
	wp_enqueue_script( 'wpamp_admin_js' );
}
add_action('admin_enqueue_scripts', 'load_wpamp_admin_script');

/*
 * Include style to admin
 */
function load_wpamp_admin_style() {
	wp_register_style( 'wpamp_admin_css', WPAMP_PLUGIN_URL . '/css/style.css', false, '1.0.0' );
	wp_enqueue_style( 'wpamp_admin_css' ); 
}
add_action( 'admin_enqueue_scripts', 'load_wpamp_admin_style' );

/*
 * Settings link to plug-ins page
 */
add_filter( 'plugin_action_links_' . WPAMP_PLUGIN_BASENAME, 'wpamp_plugin_action_links' );
function wpamp_plugin_action_links( $links ) {
	$links[] = '<a href="'. esc_url( get_admin_url(null, 'admin.php?page=wp-amp-settings') ) .'">Settings</a>';
	return $links;
}