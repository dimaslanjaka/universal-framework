<?php

if (!defined('ABSPATH'))
    exit; // Exit if accessed directly

include_once( ABSPATH . 'wp-admin/includes/plugin.php' );

if (!class_exists('AMP_Init')) {

    class AMP_Init {

        // When plugin is activated
        public static function activate() {
            $amp_supremacy_data = get_plugin_data(AMP_FILE);
			$plugin_version = $amp_supremacy_data['Version'];

            MAMP_Model::writeInstallationStatusActivated(array('plugin_version' => $plugin_version));
        }

        // When plugin is de-activated
        public static function deactivate() {
            $amp_supremacy_data = get_plugin_data(AMP_FILE);
			$plugin_version = $amp_supremacy_data['Version'];

            MAMP_Model::updateInstallationStatus(0, $plugin_version);
        }

        // When plugin is uninstalled
        public static function uninstall() {
            $amp_supremacy_data = get_plugin_data(AMP_FILE);
			$plugin_version = $amp_supremacy_data['Version'];

            MAMP_Model::updateInstallationStatus(2, $plugin_version);
            self::removeTables();
        }

        // When plugin is upgraded
        public static function upgrade() {
            $amp_supremacy_stat_id = get_option('amp_supremacy_stat_id', -1);
            $plugin_version = plugin_get_version();
            if ($amp_supremacy_stat_id == -1) {
                MAMP_Model::writeInstallationStatusActivated(array('plugin_version' => $plugin_version));
            } else {
                MAMP_Model::updateInstallationStatus(null, $plugin_version);
            }
        }

        // Endpoint
        public static function addEndPoint() {
            add_rewrite_endpoint('amp', EP_PAGES | EP_PERMALINK | EP_ALL_ARCHIVES | EP_ROOT);

            add_post_type_support('post', 'amp');
            add_filter('request', array('AMP_Init', 'checkIfRequestHasAmp'));

            flush_rewrite_rules();
        }

        public static function checkIfRequestHasAmp($query_vars) {
            if (isset($query_vars['amp']) && '' === $query_vars['amp']) {
                $query_vars['amp'] = 1;
            }
            return $query_vars;
        }

        // Init hooks
        public static function hooks() {
            add_action('admin_menu', array('AMP_Init', 'createPages'));
            add_action('admin_init', array('AMP_Init', 'loadAssets'));
            add_action('init', array('AMP_Init', 'addEndPoint'));

            // AMP_Post
            add_action('admin_post_amp_save_options', array('AMP_Post', 'saveOptions'));
            add_action('admin_enqueue_scripts', array('AMP_Init', 'my_plugin_assets_in_admin'));
            add_action('admin_notices', array('AMP_Init', 'get_amp_sitemap_notice'));
        }

        // Register all Scripts and Styles that are being used somewhere
        public static function loadAssets() {
            // Scripts
            wp_register_script('amp_uikit', AMP_URL . 'assets/js/uikit/uikit.min.js', array('jquery'), true);
            wp_register_script('amp_uikit_notify', AMP_URL . 'assets/js/uikit/components/notify.min.js', array('jquery'), true);
            wp_register_script('amp_uikit_accordion', AMP_URL . 'assets/js/uikit/components/accordion.min.js', array('jquery'), true);
            wp_register_script('amp_uikit_lightbox', AMP_URL . 'assets/js/uikit/components/lightbox.min.js', array('jquery'), true);
            wp_register_script('amp_ajaxq', AMP_URL . 'assets/js/ajaxq.js', array('jquery'), true);
            wp_register_script('amp_spectrum', AMP_URL . 'assets/js/vendor/spectrum.js', array('jquery'), true);

			//new scripts(wp-2nd-jan)
			wp_register_script('amp_sticky', AMP_URL . 'assets/src/js/components/sticky.js', array('jquery'), true);

            wp_register_script('amp_uikit_tooltip', AMP_URL . 'assets/js/uikit/components/tooltip.min.js', array('jquery'), true);

            // Page Specific Scripts

            /** Load Global JS * */
            wp_register_script('amp_main', AMP_URL . 'assets/js/main.js', array('jquery'), true);

            /**
             *  Add a global JS object to main script
             */
            wp_localize_script('amp_main', 'amp_data', array(
                'wp_get' => admin_url('admin-ajax.php'),
                'wp_post' => admin_url('admin-post.php'),
                'plugins_url' => plugins_url()
                    )
            );

            // Styles
            wp_register_style('amp_uikit', AMP_URL . 'assets/css/uikit/uikit.gradient.min.css');

            wp_register_style('amp_uikit_progress', AMP_URL . 'assets/css/uikit/components/progress.gradient.min.css');
            wp_register_style('amp_uikit_notify', AMP_URL . 'assets/css/uikit/components/notify.min.css');
            wp_register_style('amp_font-awesome', AMP_URL . 'assets/css/vendor/font-awesome.min.css');
            wp_register_style('amp_spectrum', AMP_URL . 'assets/css/vendor/spectrum.css');
            wp_register_style('amp_main', AMP_URL . 'assets/css/main.css');
        }

        public static function my_plugin_assets_in_admin() {
            wp_register_script('amp_admin_js', AMP_URL . 'assets/js/amp_admin.js', array('jquery'), '1.0', true);

            wp_localize_script('amp_admin_js', 'amp_data', array(
                'wp_get' => admin_url('admin-ajax.php'),
                'wp_post' => admin_url('admin-post.php'),
                'plugins_url' => plugins_url()
                    )
            );

            wp_enqueue_script('amp_admin_js', AMP_URL . 'assets/js/amp_admin.js', array('jquery'), '1.0', true);
            wp_enqueue_style('amp_admin_css', AMP_URL . 'assets/css/amp_admin.css');
        }

        public static function addPagePostCustomOptionsBox() {
            $amp_supremacy_menu_logo = plugins_url('amp-supremacy/assets/img/logo_menu.png');
            $amp_settings_page_url = admin_url('admin.php?page=amp-settings');
            $amp_settings_page_head = '<span><img src="' . $amp_supremacy_menu_logo . '" /></span> <span style="position: absolute;">&nbsp;AMP Supremacy Options</span>';
            add_meta_box('ampsupremacy_object_custom_options', __($amp_settings_page_head), 'AMP_Init::pagePostCustomOptionsBoxWidget', 'post', 'side');
            add_meta_box('ampsupremacy_object_custom_options', __($amp_settings_page_head), 'AMP_Init::pagePostCustomOptionsBoxWidget', 'page', 'side');
        }

        public static function saveCustomBoxData($post) {

            if(isset($_POST['amps_use_custom_settings']) && isset($_POST['amps'])){
                $amps_use_custom_settings = $_POST['amps_use_custom_settings'];
                $custom_options = $_POST['amps'];

                if (isset($amps_use_custom_settings) && $amps_use_custom_settings == 0) {
                    foreach ($custom_options as $this_key => $this_val) {

                        $custom_options[$this_key] = 0;
                    }
                }

                update_post_meta($post, AMP_CUSTOM_SETTINGS_SWITCH, $amps_use_custom_settings);

                update_post_meta($post, AMP_CUSTOM_SETTINGS, $custom_options);
            }
        }

        /**
         * Outputs the content of the meta box for AMP on-off on specific pages
         */
        public static function pagePostCustomOptionsBoxWidget($post) {
            $amps_use_custom_settings_option = get_post_meta($post->ID, AMP_CUSTOM_SETTINGS_SWITCH, TRUE);
            $amps_use_custom_settings = get_post_meta($post->ID, AMP_CUSTOM_SETTINGS, TRUE);

            $thisCustomSettingsCheckBoxChecked = (isset($amps_use_custom_settings_option) && !empty($amps_use_custom_settings_option)) ? 'checked' : '';
            echo '<ul id="useAmpSupremacyCustomSettings">'
            . '<li class="popular-category"><label class="selectit">'
            . '<input type="hidden" name="amps_use_custom_settings" value="0"><input type="checkbox" id="amps_use_custom_settings" name="amps_use_custom_settings" value="1" ' . $thisCustomSettingsCheckBoxChecked . '>Overwrite Global Settings'
            . '</label></li>'
            . '</ul>';

            $checkBoxControls = array(
                'enable' => 'Disable AMP',
                'load_seo' => 'Load SEO Data',
                'hide_post_date' => 'Hide Post Date',
                'hide_post_author_name' => 'Hide Post Author Name',
                'hide_post_tags' => 'Hide Post Tags',
                'hide_post_categories' => 'Hide Post Categories',
            );

            $dispayOptions = array();
            foreach ($checkBoxControls as $kControlName => $checkBoxControl) {
                $thisCheckBoxChecked = (isset($amps_use_custom_settings[$kControlName]) && !empty($amps_use_custom_settings[$kControlName])) ? 'checked' : '';
                $dispayOptions[] = '<li id="amp_supremacy_li_' . $kControlName . '" class="popular-category">
                            <label class="selectit">
                                <input id="amp_supremacy_checkbox_' . $kControlName . '_hidden" type="hidden" value="0" name="amps[' . $kControlName . ']">
                                <input id="amp_supremacy_checkbox_' . $kControlName . '" type="checkbox" value="1" ' . $thisCheckBoxChecked . ' name="amps[' . $kControlName . ']">' . $checkBoxControl . '
                            </label>
                        </li>';
            }
            $displayListOfOptions = (isset($amps_use_custom_settings_option) && !empty($amps_use_custom_settings_option)) ? 'block' : 'none';
            echo '<ul id="ampSupremacyCustomOptions" class="categorychecklist form-no-clear" style="display:' . $displayListOfOptions . '">' . implode('', $dispayOptions) . '</ul>';
        }

        // Create Admin Menu Pages
        public static function createPages() {
            global $amp_pages, $global_js, $global_css;
            foreach ($amp_pages as $p) {
                $page_hook_suffix = null;
                if ($p['Type'] == 'MENU') {
                    $page_hook_suffix = add_menu_page($p['Page_Title'], $p['Menu_Title'], $p['Capability'], $p['Slug'], array('AMP_Init', 'loadPage'), AMP_URL . $p['Icon']);
                } else {
                    $page_hook_suffix = add_submenu_page($p['Parent_Slug'], $p['Page_Title'], $p['Menu_Title'], $p['Capability'], $p['Slug'], array('AMP_Init', 'loadPage'));
                }
                add_action('admin_print_scripts-' . $page_hook_suffix, function() use($p, $global_js) {
                    foreach ($global_js as $enqueueName) {
                        wp_enqueue_script($enqueueName);
                    }
                    foreach ($p['JavaScript'] as $enqueueName) {
                        wp_enqueue_script($enqueueName);
                    }
                });
                add_action('admin_print_styles-' . $page_hook_suffix, function() use($p, $global_css) {
                    foreach ($global_css as $enqueueName) {
                        wp_enqueue_style($enqueueName);
                    }
                    foreach ($p['Css'] as $enqueueName) {
                        wp_enqueue_style($enqueueName);
                    }
                });
            }
            add_action('admin_enqueue_scripts', function() {
                $screen = get_current_screen();
                if ('toplevel_page_amp-settings' == $screen->base) {
                    wp_enqueue_media();
                } else
                    return;
            });
        }

        // Load a Page
        public static function loadPage() {
            $page = $_GET['page'];
            // $page = 'page_' . str_replace('amp-', '', $page) . '.php';
             $page = 'amp_' . str_replace('amp-', '', $page) . '.php';
            $page = AMP_PATH . '/pages/' . $page;
            if (file_exists($page)) {
                require_once ( $page );
            } else {
                echo "<h1>404 - Page not Found!</h1>";
            }
        }

        // Verify if site has what it takes to run a plugin
        public static function verify_requirements() {
            global $wp_version;
            if (version_compare(PHP_VERSION, AMP_REQUIRED_PHP_VERSION, '<')) {
                return false;
            }
            if (version_compare($wp_version, AMP_REQUIRED_WP_VERSION, '<')) {
                return false;
            }
            if (is_multisite() != AMP_REQUIRED_WP_NETWORK) {
                return false;
            }

            return true;
        }

        // Load all Models and init them
        public static function loadModels() {
            $models = glob(AMP_PATH . '/models/wp_*');
            foreach ($models as $m) {
                require_once ( $m );

                // Init the model
                $x = explode('wp_', $m);
                $class = 'MAMP_' . ucfirst(str_replace('.php', '', $x[1]));
                if (method_exists($class, 'initialize')) {
                    call_user_func(array($class, 'initialize'));
                }
            }
        }

        // Create/Modify Tables
        public static function createTables() {
            $models = glob(AMP_PATH . '/models/wp_*');
            foreach ($models as $m) {
                $x = explode('wp_', $m);
                $class = 'MAMP_' . ucfirst(str_replace('.php', '', $x[1]));

                if (method_exists($class, 'createTable')) {
                    call_user_func(array($class, 'createTable'));
                }
            }
        }

        // Remove Tables
        public static function removeTables() {
            $models = glob(AMP_PATH . '/models/wp_*');
            foreach ($models as $m) {

                require_once ( $m );

                $x = explode('wp_', $m);
                $class = 'MAMP_' . ucfirst(str_replace('.php', '', $x[1]));
                if (method_exists($class, 'removeTable')) {
                    call_user_func(array($class, 'removeTable'));
                }
            }
        }

        // Init the plugin
        public static function init() {
            // Init the models
            self::loadModels();

            // Init the hooks
            self::hooks();
        }

        public static function addMetaTag() {
            $amps = get_option('amps');
            if (!empty($amps['site_verification'])) {
                echo '<meta name="google-site-verification" content="' . $amps['site_verification'] . '" />';
            }
        }

        public static function register_advanced_amp() {
            global $wpdb;
            $email = $_POST['email'];

            $domain = parse_url(get_site_url());
            $this_domain = preg_replace('#^www\.(.+\.)#i', '$1', $domain['host']);
            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, "http://ampsupremacy.com/sitemap/api/index.php");
            curl_setopt($ch, CURLOPT_POST, 1);

            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array('email' => $email, 'domain' => $this_domain, 'action' => 'register')));

            // receive server response ...
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            $server_output = curl_exec($ch);

            $amp_supremacy_lite_check_key = 'amp_supremacy_lite_register_check';

            $amp_supremacy_current_time = time();
            $amp_supremacy_lite_stored = get_option($amp_supremacy_lite_check_key, 0);
            if (!empty($amp_supremacy_lite_stored)) {
                update_option($amp_supremacy_lite_check_key, array('status' => 1, 'checked_on' => $amp_supremacy_current_time));
            } else {
                add_option($amp_supremacy_lite_check_key, array('status' => 1, 'checked_on' => $amp_supremacy_current_time));
            }

            echo $server_output;

            curl_close($ch);

            wp_die();
        }

        public static function get_registration_status() {

            $domain = parse_url(get_site_url());
            $this_domain = preg_replace('#^www\.(.+\.)#i', '$1', $domain['host']);

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, "http://ampsupremacy.com/sitemap/api/index.php");
            curl_setopt($ch, CURLOPT_POST, 1);

            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array('domain' => $this_domain, 'action' => 'registered')));

            // receive server response ...
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $server_output = curl_exec($ch);

            curl_close($ch);

            return $server_output;
        }

        public static function get_amp_sitemap_notice() {

            if (!isset($_COOKIE['amp_sitemap_admin_notice_cookie']) || $_COOKIE['amp_sitemap_admin_notice_cookie'] != 0) {
                $amp_sitemap_exists = file_exists(ABSPATH . 'wp-content/plugins/amp-supremacy-sitemap');
                $amp_supremacy_url = get_site_url() . '/wp-admin/admin.php?page=amp-settings';
                if (!$amp_sitemap_exists) {
                    echo '<div class="notice is-dismissible amp-sitemap-notice" style="background-color: #FCF8E3; border: 1px solid #FAEBCC; color: #8A6D3B;">
                         <p><a href="' . $amp_supremacy_url . '" style="text-decoration:none;"><b>AMP Supremacy Lite</b></a>:  Install it for free and get AMP Sitemap and AMP Google Analytics!</p>
                     </div>';
                }
            }
        }

        public static function amp_settings_plugin_action_links($links) {
            array_unshift($links, '<a href="admin.php?page=amp-settings">' . __('Settings', 'amp-supremacy') . '</a>');
            return $links;
        }

        public static function load_analytics_widget($amps, $is_amp_lite_active){
            echo '<div class="uk-panel uk-panel-box" style="border-top-color: #ccc !important;">
                    <div class="uk-form">
                        <fieldset>
                    <legend><i class="fa fa-bar-chart"></i>&nbsp; Analytics</legend>
                    <div class="uk-form-row">
                        <label><i class="fa fa-google"></i> Google Analytics Tracking ID:</label>
                        <input id="logo_image" type="text" style="margin-left: 10px; width: 120px;" placeholder="Tracking ID">
                    </div>
                        </fieldset>
                    </div>
                </div>';
        }

        public static function add_amps_custom_columns($columns) {
            return array_merge($columns, array(
                'amps_disable' => '<img style="width: 25px;" src="' . AMP_URL . '/assets/img/logo.png' . '" title="Disable AMP for this Post">'
            ));
        }

        public static function render_amps_custom_column_content($column, $post_id) {
            if ($column == 'amps_disable') {
                $amps_use_custom_settings_option = get_post_meta($post_id, AMP_CUSTOM_SETTINGS_SWITCH, TRUE);
                $amps_use_custom_settings = get_post_meta($post_id, AMP_CUSTOM_SETTINGS, TRUE);
                $amps_disable_checkbox_checked = '';
                if (isset($amps_use_custom_settings_option) && $amps_use_custom_settings_option == 1) {
                    $amps_disable_checkbox_checked = (isset($amps_use_custom_settings['enable']) && $amps_use_custom_settings['enable'] == 1) ? 'checked' : '';
                }
                echo '<input type="checkbox" data-postid="' . $post_id . '" class="amps_disable_checkbox" ' . $amps_disable_checkbox_checked . '>';
            }
        }

        public static function disable_amps_for_this_post() {
            $post_id = $_POST['post_id'];
            $disable_status = ($_POST['disable_status'] == 'YES') ? 1 : 0;

            $amps_use_custom_settings_option = get_post_meta($post_id, AMP_CUSTOM_SETTINGS_SWITCH, TRUE);
            $amps_use_custom_settings = get_post_meta($post_id, AMP_CUSTOM_SETTINGS, TRUE);

            $amp_settings = get_option('amps');

            $checkBoxControls = array(
                'enable' => 0,
                'load_seo' => 0,
                'hide_post_date' => 0,
                'hide_post_author_name' => 0,
                'hide_post_tags' => 0,
                'hide_post_categories' => 0,
            );

            /* IF Custom settings are already on for this post */
            if ($amps_use_custom_settings_option == 1) {
                $checkBoxControls = $amps_use_custom_settings;
                $checkBoxControls['enable'] = $disable_status;
            } else {
                if(is_array($amp_settings)){
                    $checkBoxControls['load_seo'] = $amp_settings['use_seo_meta'];
                    $checkBoxControls['hide_post_date'] = !$amp_settings['on_posts'];
                    $checkBoxControls['hide_post_author_name'] = !$amp_settings['on_author_name'];
                    $checkBoxControls['hide_post_tags'] = !$amp_settings['on_post_tags'];
                    $checkBoxControls['hide_post_categories'] = !$amp_settings['on_post_categories'];
                }
                $checkBoxControls['enable'] = $disable_status;
            }
            update_post_meta($post_id, AMP_CUSTOM_SETTINGS_SWITCH, 1);
            update_post_meta($post_id, AMP_CUSTOM_SETTINGS, $checkBoxControls);
            exit;
        }


        public function load_amp_pro_dummy_controls(){
            echo '<div class=uk-width-2-4><div class=uk-form><fieldset><legend><i class="fa fa-globe"></i>Social Share</legend><div class="uk-form-row uk-grid"><div class=uk-width-1-4><input name=""value=0 type=hidden><label class=switch><input name=""value=1 type=checkbox checked><div class="round slider"></div></label></div><div class="label-instruction uk-width-3-4"><label class="margin-left-20 switch_button">Twitter</label></div></div><div class="uk-form-row uk-grid"><div class=uk-width-1-4><input name=""value=0 type=hidden><label class=switch><input name=""value=1 type=checkbox checked><div class="round slider"></div></label></div><div class="label-instruction uk-width-3-4"><label class="margin-left-20 switch_button">Google Plus</label></div></div><div class="uk-form-row uk-grid"><div class=uk-width-1-4><input name=""value=0 type=hidden><label class=switch><input name=""value=1 type=checkbox><div class="round slider"></div></label></div><div class="label-instruction uk-width-3-4"><label class="margin-left-20 switch_button">Mail</label></div></div><div class="uk-form-row uk-grid"><div class=uk-width-1-4><input name=""value=0 type=hidden><label class=switch><input name=""value=1 type=checkbox checked><div class="round slider"></div></label></div><div class="label-instruction uk-width-3-4"><label class="margin-left-20 switch_button">Pinterest</label></div></div><div class="uk-form-row uk-grid"><div class=uk-width-1-4><input name=""value=0 type=hidden><label class=switch><input name=""value=1 type=checkbox><div class="round slider"></div></label></div><div class="label-instruction uk-width-3-4"><label class="margin-left-20 switch_button">Linked In</label></div></div><div class="uk-form-row uk-grid"><div class=uk-width-1-4><input name=""value=0 type=hidden><label class=switch><input name=""value=1 type=checkbox checked><div class="round slider"></div></label></div><div class="label-instruction uk-width-3-4"><label class="margin-left-20 switch_button">Facebook</label></div></div></fieldset></div></div><div class=uk-width-2-4><div class=uk-form><fieldset><legend><i class="fa fa-file-code-o"></i> Advertisements:</legend><div class=uk-form-row><label for=mobile-test-url><i class="fa fa-bell"></i> Choose your social network(s)?</label><br></div><div class=uk-form-row><label for=mobile-test-url>Choose your Network:</label><input name=amps[network_name] value=doubleclick type=hidden id=networkNameStr><select id=networkName name=amps[network_id]><option value=-1>--Select Network--</select></div><div class=uk-form-row><i class="fa fa-arrows-h"></i><label>Width:</label><input name=""value=320 class=short-field maxlength=3> <i class="fa fa-arrows-v"></i><label>Height:</label><input name=""value=50 class=short-field maxlength=3></div><div class=uk-form-row><input name=amps[show_as_sticky_ad] value=0 type=hidden><label><input name=amps[show_as_sticky_ad] value=1 type=checkbox> Add this Ad as Sticky Ad as well <i class="fa fa-info-circle"title="By checking this, AMP will load your Ads to stick to page as well"></i></label></div><h4>Configurations</h4><div id=networkConfigurations><div class=uk-form-row><label for=slot>slot</label><input name=""value=/4119129/mobile_ad_banner id=slot placeholder=slot></div></div></fieldset></div></div>';
        }

        public static function amps_add_my_favicon() {
            $favicon_path = AMP_URL . 'assets/img/favicon.ico';
            if(!empty($_GET['page']) && $_GET['page']=="amp-settings"){
                echo '<link rel="shortcut icon" href="' . $favicon_path . '" />';
            }
         }
    }
}
