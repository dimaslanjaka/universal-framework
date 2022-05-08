<?php
/*

- default insertion is hidden when excptions are disabled
- block list keywords for all columns

*/
require_once AD_INSERTER_PLUGIN_DIR.'constants.php';

function generate_settings_form (){

  if (defined ('AI_SAFE_MODE') || isset ($_GET ['ai-safe-mode'])) {
    $url_safe_mode = '&ai-safe-mode';
  } else $url_safe_mode = '';

  if (defined ('AI_ADSENSE_API')) {
    require_once AD_INSERTER_PLUGIN_DIR.'includes/adsense-api.php';
  }

  global $ai_db_options, $block_object, $ai_wp_data, $ai_db_options_extract;
  global $rating_value, $rating_string, $rating_css, $ai_custom_hooks;

  wp_enqueue_media();

  if (isset ($_GET ['ai-demo']) && get_option (AI_OPTION_NAME) === false) {
    $ai_demo = (int) $_GET ['ai-demo'];

    $download_url = "https://adinserter.pro/downloads/ai-demo-{$ai_demo}.txt";
    $ai_demo_settings_file = download_url ($download_url);

    if (is_string ($ai_demo_settings_file) && file_exists ($ai_demo_settings_file)) {
      $ai_demo_settings = file_get_contents ($ai_demo_settings_file);

      if (is_string ($ai_demo_settings) && substr ($ai_demo_settings, 0, 4) === ':AI:') {
        update_option (AI_OPTION_NAME, $ai_demo_settings);
        ai_load_settings ();
      }
    }
    @unlink ($ai_demo_settings_file);
  }

  $save_url = $_SERVER ['REQUEST_URI'];
  if (isset ($_GET ['tab'])) {
    $save_url = preg_replace ("/&tab=\d+/", "", $save_url);
  }

  $generate_all = false;
  if (isset ($_GET ['generate-all']) && $_GET ['generate-all'] == 1) {
    $generate_all = true;
  }

  $subpage = 'main';
  $start =  1;
  $end   = 16;

  if (isset ($_GET ['start']) && is_numeric ($start) && $start >= 1 && $start <= 96) $start = (int) $_GET ['start']; else $start = 1;
  $end = min ($start + 15, 96);

  if (isset ($_POST ['ai-active-tab'])) {
    $active_tabs = json_decode ($_POST ['ai-active-tab']);
    if ($active_tabs == null) $active_tabs = array ($start, 0);
  }

  if (isset ($_GET ['settings']) && is_numeric ($_GET ['settings'])) {
    $active_tab = (int) $_GET ['settings'];
    if ($active_tab < 1 || $active_tab > 96) $active_tab = 1;
    if (isset ($_GET ['single'])) {
      $start = $active_tab;
      $end   = $active_tab;
    } else {
        $start = intval (($active_tab - 1) / 16) * 16 + 1;
        $end   = $start + 15;
      }
  }
  elseif (isset ($_GET ['tab']) && is_numeric ($_GET ['tab'])) {
    $active_tab = (int) $_GET ['tab'];
    $start = intval (($active_tab - 1) / 16) * 16 + 1;
    $end   = $start + 15;
  } else $active_tab = isset ($active_tabs [0]) ? (int) $active_tabs [0] : $start;

  if (!is_numeric ($active_tab)) $active_tab = 1;
  if ($active_tab != 0) {
    if ($active_tab < $start || $active_tab > $end) $active_tab = $start;
  }

  $active_tab_0 = isset ($active_tabs [1]) ? (int) $active_tabs [1] : 0;

  $disable_block_insertions = get_disable_block_insertions ();
  $disable_php_processing   = get_disable_php_processing ();
  $disable_html_code        = get_disable_html_code ();
  $disable_css_code         = get_disable_css_code ();
  $disable_js_code          = get_disable_js_code ();
  $disable_footer_code      = get_disable_footer_code ();
  $disable_header_code      = get_disable_header_code ();

  $insertion_disabled = $disable_block_insertions || $disable_php_processing || $disable_html_code || $disable_css_code || $disable_js_code || $disable_footer_code || $disable_header_code;

  if ($insertion_disabled) {
    $insertion_statuses =  '<span class="ai-insertion-status"'. ($disable_header_code ? ' style="color: #f22"' : '') . '">H</span> &nbsp; ';
    $insertion_statuses .= '<span class="ai-insertion-status"'. ($disable_footer_code ? ' style="color: #f22"' : '') . '">F</span> &nbsp; ';
    $insertion_statuses .= '<span class="ai-insertion-status"'. ($disable_js_code ? ' style="color: #f22"' : '') . '">JS</span> &nbsp; ';
    $insertion_statuses .= '<span class="ai-insertion-status"'. ($disable_css_code ? ' style="color: #f22"' : '') . '">CSS</span> &nbsp; ';
    $insertion_statuses .= '<span class="ai-insertion-status"'. ($disable_html_code ? ' style="color: #f22"' : '') . '">HTML</span> &nbsp; ';
    $insertion_statuses .= '<span class="ai-insertion-status"'. ($disable_php_processing ? ' style="color: #f22"' : '') . '">PHP</span> &nbsp; ';
    $insertion_statuses .= '<span class="ai-insertion-status"'. ($disable_block_insertions ? ' style="color: #f22"' : '') . '">BLOCKS</span>';
  } else $insertion_statuses = '';

  $adH  = $block_object [AI_HEADER_OPTION_NAME];
  $adF  = $block_object [AI_FOOTER_OPTION_NAME];

  if (defined ('AI_ADBLOCKING_DETECTION') && AI_ADBLOCKING_DETECTION) {
    $adA  = $block_object [AI_ADB_MESSAGE_OPTION_NAME];
  }

  $syntax_highlighter_theme = defined ('AI_SAFE_MODE') ? 'disabled' : get_syntax_highlighter_theme ();
  $block_class_name         = get_block_class_name ();
  $block_class              = get_block_class ();
  $block_number_class       = get_block_number_class ();
  $block_name_class         = get_block_name_class ();
  $inline_styles            = get_inline_styles ();

  $default = $block_object [0];

  $exceptions_array = ai_get_exceptions (ai_current_user_role_ok () && (!is_multisite() || is_main_site () || multisite_exceptions_enabled ()));
  $exceptions = $exceptions_array [0];
  $block_exceptions = $exceptions_array [1];

  if (ai_current_user_role_ok () && (!is_multisite() || is_main_site () || multisite_exceptions_enabled ())) {
    if (isset ($_POST [AI_FORM_CLEAR_EXCEPTIONS])) {
      if ($_POST [AI_FORM_CLEAR_EXCEPTIONS] == "\xe2\x9d\x8c" && !empty ($exceptions)) {
        echo '<div class="notice notice-warning is-dismissible" style="margin: 5px 15px 2px 0px;"><p>' . sprintf (__('Warning: only exceptions for %d posts cleared, %d posts still have exceptions', 'ad-inserter'), AI_LIST_EXCEPTIONS_LIMIT, count ($exceptions)) . '</p></div>';
      }
      elseif (is_numeric ($_POST [AI_FORM_CLEAR_EXCEPTIONS]) && !empty ($block_exceptions [$_POST [AI_FORM_CLEAR_EXCEPTIONS]])) {
        echo '<div class="notice notice-warning is-dismissible" style="margin: 5px 15px 2px 0px;"><p>' . sprintf (__('Warning: only exceptions for %d posts cleared, %d posts still have exceptions', 'ad-inserter'), AI_LIST_EXCEPTIONS_LIMIT, count ($block_exceptions [$_POST [AI_FORM_CLEAR_EXCEPTIONS]])) . '</p></div>';
      }
    }
  }

  if (!$ai_wp_data [AI_UNFILTERED_HTML]) {
    // translators: %s: HTML link code
    echo '<div class="notice notice-warning is-dismissible" style="margin: 5px 15px 2px 0px;"><p>' . sprintf (__('Warning: %s Unfiltered HTML %s is disabled for this website - most ad codes can\'t be used', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/troubleshooting#unfiltered-html" class="simple-link" target="_blank">', '</a>') . '</p></div>';
  }

  $rating_string = '';
  if ($rating_string = get_transient (AI_TRANSIENT_RATING)) {
    if ($rating_string < 1 && $rating_string > 5) $rating_string = '';
  }
  $rating_css = $rating_string == '' ? 'width: 100%;' : 'width: '.number_format ($rating_string * 20, 4).'%;';
  $rating_value = $rating_string == '' ? '' : number_format ($rating_string, 1);

  if (isset ($ai_db_options_extract [AI_EXTRACT_USED_BLOCKS]) && is_string ($ai_db_options_extract [AI_EXTRACT_USED_BLOCKS]) && strlen ($ai_db_options_extract [AI_EXTRACT_USED_BLOCKS]) != 0) {
    $used_blocks = unserialize ($ai_db_options_extract [AI_EXTRACT_USED_BLOCKS]);
  } else $used_blocks = array ();

  if (!isset ($_GET ['settings'])): // start of code only for normal settings

  $default_sidebar = isset ($ai_wp_data [AI_DAYS_SINCE_INSTAL]) && $ai_wp_data [AI_DAYS_SINCE_INSTAL] > 19 && count ($used_blocks) >= 4 && function_exists ('ai_settings_side') && function_exists ('ai_admin_settings_notices') ? '1' : '0';

  // Not needed anymore
//  if (is_multisite () && multisite_main_for_all_blogs () && defined ('BLOG_ID_CURRENT_SITE')) {
//    $saved_options = get_blog_option (BLOG_ID_CURRENT_SITE, AI_OPTION_NAME);

//    if (is_string ($saved_options) && substr ($saved_options, 0, 4) === ':AI:') {
//      $saved_options = unserialize (base64_decode (substr ($saved_options, 4), true));
//    }

//  } else $saved_options = ai_get_option (AI_OPTION_NAME);
//  $warning = false;
//  if (!empty ($saved_options))
//    foreach ($saved_options as $block => $block_settings) {
//      if ($block >= $start && $block <= $end) {
//        if (isset ($saved_options [$block]) && strpos (serialize ($saved_options [$block]), '_on_which_') !== false) {
//          $warning = true;
//          break;
//        }
//      }
//    }
//  if ($warning) {
//    echo '<div class="notice notice-warning is-dismissible" style="margin: 5px 15px 2px 0px;"><p>' . __('Settings for individual exceptions have been updated. Please check all blocks that have exceptions and and then save settings.', 'ad-inserter') . '</p></div>';
//  }

  if (function_exists ('ai_admin_settings_notices')) ai_admin_settings_notices ();

?>

<div id="ai-data" style="display: none;" version="<?php echo AD_INSERTER_VERSION; ?>" theme="<?php echo $syntax_highlighter_theme; ?>" tab-setup-delay="<?php echo get_tab_setup_delay (); ?>" safe-mode="<?php echo defined ('AI_SAFE_MODE') || isset ($_GET ['ai-safe-mode']) ? '1' : '0'; ?>" js_debugging="<?php echo $ai_wp_data [AI_BACKEND_JS_DEBUGGING] ? '1' : '0'; ?>"></div>

<?php
  if (function_exists ('ai_data_2')) ai_data_2 ();
?>

<div id="ai-clipboard" style="display: none;"></div>

<div style="clear: both;"></div>

<div id="ai-settings" style="float: left;" data-home-url="<?php echo home_url (); ?>/" data-home-relative-url="<?php echo wp_make_link_relative (get_site_url ()); ?>/">

<form id="ai-form" class="no-select rounded<?php echo function_exists ('ai_settings_flags') ? ai_settings_flags () : ''; ?>" style="float: left;" action="<?php echo esc_attr ($save_url); ?>" method="post" name="ai_form" start="<?php echo $start; ?>" end="<?php echo $end; ?>" gmt="<?php echo get_option ('gmt_offset') * 3600 * 1000; ?>" ai-settings="<?php echo base64_encode (admin_url ('options-general.php?page=ad-inserter.php'.$url_safe_mode)); ?>" ai-value="<?php echo base64_encode (wp_create_nonce ("adinserter_data")); ?>">

<?php if (function_exists ('ai_connected_website')) {ai_connected_website ();} ?>

  <div id="header" class="ai-form header rounded">
    <div id= "ai-settings-header" style="float: left;">
      <h2 id="plugin_name" style="margin: 5px 0;"><?php echo function_exists ('ai_settings_version') ? ai_settings_version () : (AD_INSERTER_NAME . ' ' . AD_INSERTER_VERSION); ?></h2>

      <div id="block-ranges">
<?php
    for ($range = 1; $range <= intval ((96 + 15) / 16); $range ++){
      $range_start = ($range - 1) * 16 + 1;
      $range_end = $range_start + 16 - 1;
      if ($range_end > 96) $range_end = 96;
      if (($active_tab >= $range_start && $active_tab <= $range_end) || ($start == $range_start && $active_tab == 0)) $style = "font-weight: bold; color: #44e; "; else $style = "";
?>
        <button type="button" class="ai-top-button" id="button-range-<?php echo $range; ?>" style="margin-right: 0px; outline: none;" onclick="window.location.href='<?php echo admin_url('options-general.php?page=ad-inserter.php&start='.$range_start.$url_safe_mode); ?>'">
          <span style="<?php echo $style; ?>"><?php echo $range_start, " - ", $range_end; ?></span>
        </button>
<?php   } ?>
      </div>
    </div>

    <div id="header-buttons">
      <img id="ai-loading" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>loading.gif" style="width: 24px; height: 24px; vertical-align: middle; margin-right: 10px; display: none;" />

      <span class="checkbox-button dashicons dashicons-book-alt" onclick="window.open('https://adinserter.pro/documentation')" title="<?php _e ('Online documentation', 'ad-inserter'); ?>"></span>

<?php if (defined ('AI_ADSENSE_API')) : ?>
<?php if (defined ('AI_ADSENSE_AUTHORIZATION_CODE')) : ?>
      <label id="adsense-list" class="checkbox-button" title="<?php _e ('Show AdSense ad units', 'ad-inserter'); ?>" ><span class="checkbox-icon icon-adsense"></span></label>
<?php endif; ?>
<?php endif; ?>

<?php if (!is_multisite() || is_main_site () ) : ?>
<?php if (!function_exists ('ai_data_2') && file_exists (AD_INSERTER_PLUGIN_DIR.'includes/js/ai-load.js')) : ?>
      <span class="checkbox-button dashicons dashicons-buddicons-forums" onclick="window.open('https://adinserter.pro/about')" ></span>
<?php endif; ?>

      <label id="ai-ads-txt" class="checkbox-button iab-ads-txt" title="<?php _e ('Edit ads.txt file', 'ad-inserter'); ?>" ><span class="checkbox-icon icon-ads-txt"></span></label>
<?php endif; ?>

      <span id="page-checker-button" class="checkbox-button dashicons dashicons-editor-justify" title="<?php _e ('Check theme for available positions for automatic insertion', 'ad-inserter'); ?>"></span>

<?php if (function_exists ('websites_list_button')) {websites_list_button ();} ?>

      <span id="ai-list" class="checkbox-button dashicons dashicons-screenoptions" title="<?php _e ('List all blocks', 'ad-inserter'); ?>"></span>
    </div>

    <div style="clear: both;"></div>
  </div>

  <div id="javascript-warning" class="ai-form rounded" style="display: none;">
    <h2 id="javascript-version" style="float: left; margin: 0; max-width: 85px; color: red;" title="<?php _e ('Loaded plugin JavaScript file version', 'ad-inserter'); ?>">&nbsp;</h2>
    <div style="float: right; max-width: 640px; text-align: right;">
        <span id="javascript-version-parameter" style="display: none;"><?php /* translators: %s: HTML tags */ printf (__ ('Wrong or %s missing version parameter %s of the JavaScript file, probably due to inappropriate caching.', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/troubleshooting#missing-version-parameter" class="simple-link" target="_blank">', '</a>'); ?><br /></span>
        <span id="javascript-version-parameter-missing" style="display: none;"><?php _e ('Missing version parameter of the JavaScript file, probably due to inappropriate caching.', 'ad-inserter'); ?><br /></span>
        <?php _e ('Incompatible (old) JavaScript file loaded, probably due to inappropriate caching.', 'ad-inserter'); ?><br />
        <?php _e ("Please delete browser's cache and all other caches used and then reload this page.", 'ad-inserter'); ?>
    </div>
    <div style="clear: both;"></div>
  </div>

  <div id="css-warning" class="ai-form rounded" style="display: none;">
    <h2 id="css-version" style="float: left; margin: 0; max-width: 85px; color: red;" title="<?php _e ('Loaded plugin CSS file version', 'ad-inserter'); ?>">&nbsp;</h2>
    <div style="float: right; max-width: 640px; text-align: right;">
        <span id="css-version-parameter" style="display: none;"><?php /* translators: %s: HTML tags */ printf (__ ('Wrong or %s missing version parameter %s of the CSS file, probably due to inappropriate caching.', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/troubleshooting#missing-version-parameter" class="simple-link" target="_blank">', '</a>'); ?><br /></span>
        <span id="css-version-parameter-missing" style="display: none;"><?php _e ('Missing version parameter of the CSS file, probably due to inappropriate caching.', 'ad-inserter'); ?><br /></span>
        <?php _e ('Incompatible (old) CSS file loaded, probably due to inappropriate caching.', 'ad-inserter'); ?><br />
        <?php _e ("Please delete browser's cache and all other caches used and then reload this page.", 'ad-inserter'); ?>
    </div>
    <div style="clear: both;"></div>
  </div>

  <div id="blocked-warning" class="ai-form warning-enabled rounded">
    <h2 class="blocked-warning-text" style="float: left; color: red; margin: 7px 0;" title="<?php _e ('Error loading page', 'ad-inserter'); ?>"><?php _e ('WARNING', 'ad-inserter'); ?></h2>
    <div style="float: right; text-align: right; width: 630px; margin: 8px 5px 0px 0;">
       <?php /* translators: %s: HTML tags */ printf (__ ('Page may %s not be loaded properly. %s', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/troubleshooting#page-blocked" class="simple-link" target="_blank">', '</a>'); ?>
       <?php _e ('Check ad blocking software that may block CSS, JavaScript or image files.', 'ad-inserter'); ?>
    </div>
    <div style="clear: both;"></div>
  </div>

<?php
  if (defined ('AI_SAFE_MODE') || isset ($_GET ['ai-safe-mode'])) {
?>
  <div class="ai-form warning-enabled rounded">
    <h2 class="blocked-warning-text" style="float: left; color: blue; margin: 7px 0;"><?php _e ('SAFE MODE', 'ad-inserter'); ?></h2>
    <div style="float: right; text-align: right; width: 630px; margin: 8px 5px 0px 0;">
       <?php /* translators: %s: HTML tags */ printf (__ ('Page is loaded in %s safe mode. %s Not all scripts are loaded.', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/troubleshooting#safe-mode" class="simple-link" target="_blank">', '</a>'); ?>
    </div>
    <div style="clear: both;"></div>
  </div>
<?php
  }
?>

<?php
  if ($insertion_disabled):
?>
  <div id="debugging-warning" class="ai-form warning-enabled rounded">
    <h2 class="blocked-warning-text" style="float: left; color: red; margin: 7px 0;" title="<?php _e ('To disable debugging functions and to enable insertions go to tab [*] / tab Debugging', 'ad-inserter'); ?>"><?php _e ('WARNING', 'ad-inserter'); ?></h2>
    <div style="float: right; text-align: right; width: 630px; margin: 8px 5px 0px 0;">
       <?php _e ('Debugging functions enabled - some code is not inserted', 'ad-inserter'); echo ': &nbsp; &nbsp;<span style="font-weight: bold;">', $insertion_statuses, '</span>'; ?>
    </div>
    <div style="clear: both;"></div>
  </div>
<?php
  endif;
?>

  <div id="rotation-tabs" style="display: none;">
    <ul>
      <li class="ai-rotate-option"><a></a></li>
    </ul>

    <div class="responsive-table rounded">
      <table class="ai-settings-table" style="">
        <tr>
          <td style="padding-right: 7px; min-width: 72px">
            <span class="group-name-label" style="display: none;"><?php _e ('Group name', 'ad-inserter'); ?></span>
            <span class="option-name-label"><?php _e ('Option name', 'ad-inserter'); ?></span>
          </td>
          <td style="width: 100%;">
            <input class="option-name" style="width: 100%;" type="text" size="50" maxlength="200" />
          </td>
          <td class="option-parameters" style="padding-left: 7px;">
            <?php _e ('Share', 'ad-inserter'); ?>
          </td>
          <td class="option-parameters">
            <input class="option-share" style="width: 65px;" type="text" maxlength="20" data-title="<?php _e ('Option share in percents - 0 means option is disabled, if share for one option is not defined it will be calculated automatically. Leave all share fields empty for equal option shares.', 'ad-inserter'); ?>" /> %
          </td>
          <td class="option-parameters" style="padding-left: 7px;">
            <?php _e ('Scheduling', 'ad-inserter'); ?>
          </td>
          <td class="option-parameters" style="padding-left: 7px;">
            <input class="option-scheduling" style="width: 78px;" type="text" maxlength="7" data-title="<?php _e ('Scheduling parameters'); ?> [[T%M=N]]" />
          </td>
          <td class="option-parameters" style="padding-left: 7px;">
            <?php _e ('Time', 'ad-inserter'); ?>
          </td>
          <td class="option-parameters">
            <input class="option-time" style="width: 42px;" type="text" maxlength="3" data-title="<?php _e ('Option time in seconds - 0 means option is disabled and will be skipped. Leave all time fields empty for no timed rotation.', 'ad-inserter'); ?>" /> s
          </td>
        </tr>
      </table>
      <div style="clear: both;"></div>
    </div>

  </div>

<div id="ai-error-container" class="rounded" style="border-color: red; display: none;"></div>

<div id="ai-container">

<?php endif; // of code only for normal settings  ?>

  <div id="ai-tab-container" class="ai-form rounded" style="padding-bottom: 1px;">

  <div id="dummy-tabs" style="height: 30px; padding: .2em .2em 0;"></div>

  <div id="ai-scroll-tabs" class="scroll_tabs_theme_light" style="display: none;">
<?php

  for ($block = $start; $block <= $end; $block ++){
    echo "    <span id='ai-scroll-tab-$block' rel='$block'>$block</span>";
  }
?>
    <span rel='0'>0</span>
  </div>

  <ul id="ai-tabs" style="display: none;">
<?php

  $sidebars_with_widget = get_sidebar_widgets ();

//  $sidebar_widgets = wp_get_sidebars_widgets();
//  $widget_options = get_option ('widget_ai_widget');

//  $sidebars_with_widgets = array ();
////  for ($block = $start; $block <= $end; $block ++){
//  for ($block = 1; $block <= 96; $block ++){
//    $sidebars_with_widget [$block]= array ();
//  }
//  foreach ($sidebar_widgets as $sidebar_index => $sidebar_widget) {
//    if (is_array ($sidebar_widget) && isset ($GLOBALS ['wp_registered_sidebars'][$sidebar_index]['name'])) {
//      $sidebar_name = $GLOBALS ['wp_registered_sidebars'][$sidebar_index]['name'];
//      if ($sidebar_name != "") {
//        foreach ($sidebar_widget as $widget) {
//          if (preg_match ("/ai_widget-([\d]+)/", $widget, $widget_id)) {
//            if (isset ($widget_id [1]) && is_numeric ($widget_id [1])) {
//              $widget_option = $widget_options [$widget_id [1]];
//              $widget_block = $widget_option ['block'];
////              if ($widget_block >= $start && $widget_block <= $end && !in_array ($sidebar_name, $sidebars_with_widget [$widget_block])) {
//              if ($widget_block >= 1 && $widget_block <= 96 && !in_array ($sidebar_name, $sidebars_with_widget [$widget_block])) {
//                $sidebars_with_widget [$widget_block] []= $sidebar_name;
//              }
//            }
//          }
//        }
//      }
//    }
//  }

  $manual_widget                = array ();
  $manual_shortcode             = array ();
  $manual_php_function          = array ();
  $manual                       = array ();
  $sidebars                     = array ();
  $scheduling_period_inactive   = array ();

  for ($block = $start; $block <= $end; $block ++) {
    $obj = $block_object [$block];

    $automatic = $obj->get_automatic_insertion() != AI_AUTOMATIC_INSERTION_DISABLED;

    $manual_widget        [$block] = $obj->get_enable_widget()    == AI_ENABLED;
    $manual_shortcode     [$block] = $obj->get_enable_manual()    == AI_ENABLED;
    $manual_php_function  [$block] = $obj->get_enable_php_call()  == AI_ENABLED;
    $manual               [$block] = ($manual_widget [$block] && !empty ($sidebars_with_widget [$block])) || $manual_shortcode [$block] || $manual_php_function [$block];

    $disabled = $obj->get_disable_insertion ();

    switch ($obj->get_scheduling ()) {
      case AI_SCHEDULING_BETWEEN_DATES:
      case AI_SCHEDULING_OUTSIDE_DATES:
//        if (get_dynamic_blocks () != AI_DYNAMIC_BLOCKS_SERVER_SIDE) $scheduling_period_inactive [$block] = false; else
          $scheduling_period_inactive [$block] = $obj->get_schedule_start_date () != '' &&
                                                 $obj->get_schedule_end_date () != '' &&
                                                 !check_scheduling_time (
                                                    $obj->get_schedule_start_date () . ' ' . $obj->get_schedule_start_time (),
                                                    $obj->get_schedule_end_date ()   . ' ' . $obj->get_schedule_end_time (),
                                                    $obj->get_schedule_weekdays (),
                                                    $obj->get_scheduling () == AI_SCHEDULING_BETWEEN_DATES
                                                  );
        break;
      default:
        $scheduling_period_inactive [$block] = false;
        break;
    }

    $style = "";
    $ad_name = "";
    $sidebars [$block] = "";
    if (!$disabled && !($scheduling_period_inactive [$block] && !$obj->get_scheduling_fallback ())) {
      if ($automatic && $manual [$block]) $style = "font-weight: bold; color: #c4f;";
        elseif ($automatic) $style = "font-weight: bold; color: #e44;";
          elseif ($manual [$block]) $style = "font-weight: bold; color: #66f;";
    }

    if (!empty ($sidebars_with_widget [$block])) $sidebars [$block] = implode (", ", $sidebars_with_widget [$block]);

//    if (!wp_is_mobile ()) {
//      $ad_name = $obj->get_ad_name();

//      $ad_name_functions = false;
//      if ($automatic) {
//        $ad_name .= ": ".$obj->get_automatic_insertion_text ();
//        $ad_name_functions = true;
//      }

//      //if (!empty ($sidebars_with_widget [$block])) $sidebars [$block] = implode (", ", $sidebars_with_widget [$block]);
//      if ($manual_widget [$block]) {
//        if ($sidebars [$block] != "") {
//          $ad_name .= $ad_name_functions ? ", " : ": ";
//          $ad_name .= "Widget used in: [".$sidebars [$block]."]";
//          $ad_name_functions = true;
//        }
//      } else {
//          if (!empty ($sidebars_with_widget [$block])) {
//            $ad_name .= $ad_name_functions ? ", " : ": ";
//            $ad_name .= "Widget DISABLED but used in: [".$sidebars [$block]."]";
//            $ad_name_functions = true;
//          }
//        }

//      if ($manual_shortcode     [$block]) {
//        $ad_name .= $ad_name_functions ? ", " : ": ";
//        $ad_name .= "Shortcode";
//        $ad_name_functions = true;
//      }
//      if ($manual_php_function  [$block]) {
//        $ad_name .= $ad_name_functions ? ", " : ": ";
//        $ad_name .= "PHP function";
//        $ad_name_functions = true;
//      }
//    }

    echo "
      <li id=\"ai-tab$block\" class=\"ai-tab\" title=\"$ad_name\"><a href=\"#tab-$block\"><span style=\"", $style, "\">$block</span></a></li>";

  }

  $enabled_k = count ($ai_custom_hooks) != 0;
  $enabled_h = $adH->get_enable_manual () && $adH->get_ad_data() != "";
  $enabled_f = $adF->get_enable_manual () && $adF->get_ad_data() != "";
  if ($enabled_h || $enabled_f) $settings_tab_class = " on"; else $settings_tab_class = "";

  $title_hfa = "";
//  if ($enabled_h) $title_hfa .= ", Header code";
//  if ($enabled_f) $title_hfa .= ", Footer code";
  $header_code_disabled = !$adH->get_enable_manual () && $adH->get_ad_data() != "";
  $footer_code_disabled = !$adF->get_enable_manual () && $adF->get_ad_data() != "";

  if (defined ('AI_ADBLOCKING_DETECTION') && AI_ADBLOCKING_DETECTION) {
    $enabled_a = $ai_wp_data [AI_ADB_DETECTION];
//    if ($enabled_a) $title_hfa .= ", Ad blocking detection code";
    if ($enabled_a) $settings_tab_class = " on";
  }

  if ($insertion_disabled) $settings_tab_class = " red";

?>
      <li id="ai-tab0" class="ai-tab" title="<?php echo AD_INSERTER_NAME, ' ', _e ('General Settings', 'ad-inserter'); ?><?php echo $title_hfa ?>" style=" margin: 1px 0 0 0;"><a href="#tab-0" style="padding: 5px 14px 6px 12px;"><div class="ai-icon-gear<?php echo $settings_tab_class ?>"></div></a></li>
  </ul>

<?php

  for ($block = $start; $block <= $end + 1; $block ++){

    if ($block <= $end) {
      $default->number = $block;
      $default->wp_options [AI_OPTION_BLOCK_NAME] = DEFAULT_AD_NAME." ".$block;

      $tab_visible = $block == $active_tab || $generate_all;

      $obj = $block_object [$block];
    } else {
        $block = 999;

        $sidebars [$block] = "";

        $manual_widget        [$block] = $obj->get_enable_widget()    == AI_ENABLED;
        $manual_shortcode     [$block] = $obj->get_enable_manual()    == AI_ENABLED;
        $manual_php_function  [$block] = $obj->get_enable_php_call()  == AI_ENABLED;
        $manual               [$block] = ($manual_widget [$block] && !empty ($sidebars_with_widget [$block])) || $manual_shortcode [$block] || $manual_php_function [$block];

        $default->number = 0;
        $default->wp_options [AI_OPTION_BLOCK_NAME] = DEFAULT_AD_NAME." 0";

        $tab_visible = false;

        $obj = $default;
      }

    $client_side_devices = $obj->get_detection_client_side () == AI_ENABLED;
    $server_side_devices = $obj->get_detection_server_side () == AI_ENABLED;
    if ($client_side_devices) $client_side_style = "font-weight: bold; color: #66f;"; else $client_side_style = "";
    if ($server_side_devices) $server_side_style = "font-weight: bold; color: #66f;"; else $server_side_style = "";

    $show_devices = $client_side_devices || $server_side_devices == AI_ENABLED;
    if ($show_devices) $devices_style = "font-weight: bold; color: #66f;"; else $devices_style = "";

    $cat_list       = $obj->get_ad_block_cat();
    $tag_list       = $obj->get_ad_block_tag();
    $taxonomy_list  = $obj->get_ad_block_taxonomy();
    $id_list        = $obj->get_id_list();
    $url_list       = $obj->get_ad_url_list();
    $url_parameter_list = $obj->get_url_parameter_list();
    $cookie_list    = $obj->get_cookie_list();
    $domain_list    = $obj->get_ad_domain_list();
    $client_list    = $obj->get_client_list();
    if (function_exists ('ai_lists')) $lists = ai_lists ($obj); else $lists = false;

    $show_cat_list            = $cat_list != '';
    $show_tag_list            = $tag_list != '';
    $show_taxonomy_list       = $taxonomy_list != '';
    $show_id_list             = $id_list != '';
    $show_url_list            = $url_list != '';
    $show_url_parameter_list  = $url_parameter_list != '';
    $show_cookie_list         = $cookie_list != '';
    $show_domain_list         = $domain_list != '';
    $show_client_list         = $client_list != '';

    $show_lists =
      $show_cat_list ||
      $show_tag_list ||
      $show_taxonomy_list ||
      $show_id_list ||
      $show_url_list ||
      $show_url_parameter_list ||
      $show_cookie_list ||
      $show_domain_list ||
      $show_client_list ||
      $lists;

    if ($show_lists) $lists_style = "font-weight: bold; color: #66f;"; else $lists_style = "";

    $show_manual = $manual [$block] ||!empty ($sidebars_with_widget [$block]);
    if ($show_manual) $manual_style = "font-weight: bold; color: " . ($manual_widget [$block] || empty ($sidebars_with_widget [$block]) ? "#66f;" : "#e44;"); else $manual_style = "";

    $insertion_options =
      $obj->get_maximum_insertions () ||
      $obj->get_display_for_users() != AI_DISPLAY_ALL_USERS ||
      $obj->get_enable_amp () == AI_ENABLED ||
      $obj->get_enable_ajax () != AI_ENABLED ||
      $obj->get_enable_404 () == AI_ENABLED ||
      $obj->get_enable_feed () == AI_ENABLED ||
      $obj->get_max_page_blocks_enabled () ||
      $obj->get_only_in_the_loop () ||
      $obj->get_embed_js_code () ||
      $obj->get_disable_caching ();

    $word_count_options =
      intval ($obj->get_minimum_words()) != 0 ||
      intval ($obj->get_maximum_words()) != 0;

    $automatic_insertion = $obj->get_automatic_insertion();

    $paragraph_settings =
      $automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_PARAGRAPH ||
      $automatic_insertion == AI_AUTOMATIC_INSERTION_AFTER_PARAGRAPH;

    $image_settings =
      $automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_IMAGE ||
      $automatic_insertion == AI_AUTOMATIC_INSERTION_AFTER_IMAGE;

    $filter_insertions_settings =
      $automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_EXCERPT ||
      $automatic_insertion == AI_AUTOMATIC_INSERTION_AFTER_EXCERPT ||
      $automatic_insertion == AI_AUTOMATIC_INSERTION_BETWEEN_POSTS ||
      $automatic_insertion == AI_AUTOMATIC_INSERTION_BETWEEN_COMMENTS;

    if ($filter_insertions_settings) {
      $filter_active = $obj->get_filter_type() != AI_FILTER_AUTO || $obj->get_inverted_filter() != 0;
    } else $filter_active = $obj->get_call_filter() || $obj->get_inverted_filter() != 0;

    $adb_block_action_active = $obj->get_adb_block_action () != AI_ADB_BLOCK_ACTION_DO_NOTHING;

    $parallax_options = false;
    for ($index = 1; $index <= 3; $index ++) {
      $parallax_options |= $obj->get_parallax ($index) && $obj->get_parallax_image ($index) != '';
      if ($parallax_options) break;
    }

    $display_options =
      $obj->get_block_width () != '' || $obj->get_block_height () != '' || $obj->get_block_background_color () != '' || $obj->get_show_label () ||
      $obj->get_lazy_loading () || $obj->get_wait_for_interaction () || $obj->get_protected () || $obj->get_manual_loading () != AI_MANUAL_LOADING_DISABLED ||
      $obj->get_close_button () || $obj->get_auto_close_time () || $obj->get_stay_closed_time () ||
      $obj->get_delay_time () || $obj->get_delay_showing () || $obj->get_show_every () ||
      $obj->get_iframe () ||
      $parallax_options;

    $limits_options =
      $obj->get_max_impressions ()         || ($obj->get_limit_impressions_per_time_period ()         && $obj->get_limit_impressions_time_period ()) ||
      $obj->get_max_clicks ()              || ($obj->get_limit_clicks_per_time_period ()              && $obj->get_limit_clicks_time_period ()) ||
      $obj->get_visitor_max_impressions () || ($obj->get_visitor_limit_impressions_per_time_period () && $obj->get_visitor_limit_impressions_time_period ()) ||
      $obj->get_visitor_max_clicks ()      || ($obj->get_visitor_limit_clicks_per_time_period ()      && $obj->get_visitor_limit_clicks_time_period ()) || $obj->get_trigger_click_fraud_protection ();

    $scheduling_active = $obj->get_scheduling () != AI_SCHEDULING_OFF;

    $show_misc =
      $insertion_options ||
      $word_count_options ||
      $scheduling_active ||
      $filter_active ||
      $adb_block_action_active ||
      $display_options ||
      $limits_options;

    if ($show_misc) $misc_style = "font-weight: bold; color: #66f;"; else $misc_style = "";

    if ($insertion_options)       $insertion_style  = "font-weight: bold; color: #66f;"; else $insertion_style = "";
    if ($word_count_options)      $word_count_style = "font-weight: bold; color: #66f;"; else $word_count_style = "";
    if ($scheduling_active)       $scheduling_style = ($scheduling_period_inactive [$block] ? 'font-weight: bold; color: #e44;' : "font-weight: bold; color: #66f;"); else $scheduling_style = "";
    if ($filter_active)           $filter_style     = "font-weight: bold; color: #66f;"; else $filter_style = "";
    if ($adb_block_action_active) $adb_style        = "font-weight: bold; color: #66f;"; else $adb_style = "";
    if ($display_options)         $display_style    = "font-weight: bold; color: #66f;"; else $display_style = "";
    if ($limits_options)          $limits_style     = "font-weight: bold; color: #66f;"; else $limits_style = "";

    $general_style = '';

    $paragraph_counting = $paragraph_settings && (
      $obj->get_direction_type()                != $default->get_direction_type() ||
      $obj->get_paragraph_tags()                != $default->get_paragraph_tags() ||
      $obj->get_minimum_paragraph_words()       != $default->get_minimum_paragraph_words() ||
      $obj->get_maximum_paragraph_words()       != $default->get_maximum_paragraph_words() ||
      $obj->get_paragraph_text_type()           != $default->get_paragraph_text_type() ||
      $obj->get_paragraph_text()                != $default->get_paragraph_text() ||

      $obj->get_count_inside_blockquote()       != $default->get_count_inside_blockquote() ||
      $obj->get_count_inside()                  != $default->get_count_inside() ||
      $obj->get_count_inside_elements()         != $default->get_count_inside_elements() ||
      $obj->get_count_inside_elements_contain() != $default->get_count_inside_elements_contain() ||
      $obj->get_count_inside_elements_text()    != $default->get_count_inside_elements_text() ||

      $obj->get_paragraph_number_minimum()      != $default->get_paragraph_number_minimum() ||
      $obj->get_paragraph_number_maximum()      != $default->get_paragraph_number_maximum() ||
      $obj->get_skip_first_paragraphs()         != $default->get_skip_first_paragraphs() ||
      $obj->get_skip_last_paragraphs()          != $default->get_skip_last_paragraphs() ||
      $obj->get_minimum_words_above()           != $default->get_minimum_words_above()
    );

    $paragraph_clearance = $paragraph_settings && (
      ($obj->get_avoid_text_above() != $default->get_avoid_text_above() && intval ($obj->get_avoid_paragraphs_above()) != 0) ||
      ($obj->get_avoid_text_below() != $default->get_avoid_text_below() && intval ($obj->get_avoid_paragraphs_below()) != 0)
    );

    $html_settings =
      $automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_HTML_ELEMENT ||
      $automatic_insertion == AI_AUTOMATIC_INSERTION_AFTER_HTML_ELEMENT ||
      $automatic_insertion == AI_AUTOMATIC_INSERTION_INSIDE_HTML_ELEMENT;

    $html_element_insertion = $obj->get_html_element_insertion ();
    $server_side_insertion = $obj->get_server_side_insertion ();
    $inside_element = $obj->get_inside_element ();

    $filter_type = $obj->get_filter_type();

    $page_exceptions = array ();
    $post_exceptions = array ();
    if (!empty ($block_exceptions [$block])) {
      $page_index = 0;
      $post_index = 0;
      foreach ($block_exceptions [$block] as $id => $exception) {
        if ($exception ['type'] == 'page') {
          $row_class = $page_index % 2 == 0 ? 'even' : 'odd';
        } else {
            $row_class = $post_index % 2 == 0 ? 'even' : 'odd';
          }

        $exception_line = '<tr class="' . $row_class . '">
          <td class="id" title="View"><a href="' . ai_get_permalink ($id) . '" target="_blank" style="color: #222;">' . $id .'</a></td>
          <td class="type" title="View"><a href="' . ai_get_permalink ($id) . '" target="_blank" style="color: #222;">' . $exception ['name'] . '</a></td>
          <td class="page-title page-only" title="Edit"><a href="' . ai_get_edit_post_link ($id) . '" target="_blank" style="margin-left: 2px; color: #222;">' . $exception ['title'] . '</a></td>
          <td></td>
        </tr>' . "\n";

        if (defined ('AI_CONNECTED_WEBSITE')) {
          $connected_website = get_transient (AI_CONNECTED_WEBSITE);

          if ($connected_website !== false) {
            // No links to the local site
            $exception_line = preg_replace ('#<a.*?'.'>(.*?)</a>#i', '\1', $exception_line);
            $exception_line = preg_replace ('#title="(.*?)"#i', '', $exception_line);
          }
        }

        if ($exception ['type'] == 'page') {
          $page_exceptions []= $exception_line;
          $page_index ++;
        } else {
            $post_exceptions []= $exception_line;
            $post_index ++;
          }
      }
    }

    $exceptions_needs_check = false;
    $option = $obj->import_old_exception_settings ($exceptions_needs_check);

    $exceptions_error =
      $obj->get_exceptions_enabled () && $obj->get_exceptions_function () == AI_DEFAULT_INSERTION_DISABLED && empty ($block_exceptions [$block]);

    $exceptions_shown =
      $exceptions_needs_check ||
      $exceptions_error;

    $exception_button_on =
      $obj->get_exceptions_enabled () && !empty ($block_exceptions [$block]) ||
      $exceptions_shown;

?>
<div id="tab-<?php echo $block; ?>" style="padding: 0;<?php echo $tab_visible ? "" : " display: none;" ?>">

  <input id="block-parameters-<?php echo $block; ?>" style="display: none;" type="text" value="" />

  <div class="ai-toolbars">

    <div id="ai-main-toolbar-<?php echo $block; ?>" class="max-input" style="margin: 8px 0 0 2px; height: 28px; width: 731px;">
      <span id="name-label-container-<?php echo $block; ?>" style="display: table-cell; width: 100%; padding: 0; font-weight: bold; cursor: pointer;">
        <input id="name-edit-<?php echo $block; ?>" style="width: 100%; height: 20px; padding-left: 5px; vertical-align: middle; font-size: 14px; display: none;" type="text" name="<?php echo AI_OPTION_BLOCK_NAME, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_ad_name(); ?>" value="<?php echo $obj->get_ad_name() ?>" size="56" maxlength="120" />
        <span id="name-label-<?php echo $block; ?>" class="no-select" style="width: 100%; max-width: 490px; vertical-align: middle; font-size: 14px; display: inline-block; margin-top: 4px; margin-left: 7px; white-space: nowrap; overflow: hidden;"><?php echo $obj->get_ad_name() ?></span>
      </span>
<?php if (AI_SYNTAX_HIGHLIGHTING) : ?>
      <span class="ai-toolbar-button ai-settings">
        <input type="checkbox" value="0" id="simple-editor-<?php echo $block; ?>" class="simple-editor-button" style="display: none;" />
        <label class="checkbox-button" for="simple-editor-<?php echo $block; ?>" title="<?php _e ('Toggle Syntax Highlighting / Simple editor for mobile devices', 'ad-inserter'); ?>"><span class="checkbox-icon icon-tablet"></span></label>
      </span>
<?php endif; ?>

<?php if (defined ('AI_CODE_GENERATOR')) : ?>
      <span class="ai-toolbar-button ai-settings">
        <input type="checkbox" id="tools-button-<?php echo $block; ?>" style="display: none;" />
        <label class="checkbox-button tools-button" for="tools-button-<?php echo $block; ?>" title="<?php _e ('Toggle tools', 'ad-inserter'); ?>"><span class="checkbox-icon icon-tools"></span></label>
      </span>
<?php endif; ?>

<?php if ($ai_wp_data [AI_PHP_PROCESSING] && (!is_multisite() || is_main_site () || multisite_php_processing ())) : ?>
      <span class="ai-toolbar-button ai-settings">
        <input type="hidden"   name="<?php echo AI_OPTION_PROCESS_PHP, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
        <input type="checkbox" name="<?php echo AI_OPTION_PROCESS_PHP, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo $default->get_process_php (); ?>" id="process-php-<?php echo $block; ?>" <?php if ($obj->get_process_php () == AI_ENABLED) echo 'checked '; ?> style="display: none;" />
        <label class="checkbox-button" for="process-php-<?php echo $block; ?>" title="<?php _e ('Process PHP code in block', 'ad-inserter'); ?>"><span class="checkbox-icon icon-php<?php if ($obj->get_process_php () == AI_ENABLED) echo ' on'; ?>"></span></label>
      </span>
<?php endif; ?>

      <span class="ai-toolbar-button ai-settings">
        <input type="hidden"   name="<?php echo AI_OPTION_DISABLE_INSERTION, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
        <input type="checkbox" name="<?php echo AI_OPTION_DISABLE_INSERTION, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" id="disable-insertion-<?php echo $block; ?>" default="<?php echo $default->get_disable_insertion (); ?>" <?php if ($obj->get_disable_insertion () == AI_ENABLED) echo 'checked '; ?> style="display: none;" />
        <label class="checkbox-button" for="disable-insertion-<?php echo $block; ?>" title="<?php _e ('Disable insertion of this block', 'ad-inserter'); ?>"><span class="checkbox-icon icon-pause<?php if ($obj->get_disable_insertion () == AI_ENABLED) echo ' on'; ?>"></span></label>
      </span>

<?php if (function_exists ('ai_settings_top_buttons_2')) ai_settings_top_buttons_2 ($block, $obj, $default); ?>
    </div>

    <div class="ai-settings">
      <div id="ai-tools-toolbar-<?php echo $block; ?>" class="ai-tools-toolbar max-input" style="margin: 8px 0 0 2px; height: 28px;  width: 729px; padding: 0 0 0 2px; display: none;">
<?php if (function_exists ('ai_settings_top_buttons_1')) ai_settings_top_buttons_1 ($block, $obj, $default); ?>
<?php if (defined ('AI_CODE_GENERATOR')) : ?>
        <span class="ai-toolbar-button ai-button-left">
          <input type="checkbox" id="code-generator-<?php echo $block; ?>" style="display: none;" />
          <label class="checkbox-button code-generator-button" for="code-generator-<?php echo $block; ?>" title="<?php _e ('Toggle code generator', 'ad-inserter'); ?>"><span class="checkbox-icon icon-code"></span></label>
        </span>
        <span class="ai-toolbar-button ai-button-left">
          <input type="checkbox" id="rotation-<?php echo $block; ?>" style="display: none;" />
          <label class="checkbox-button rotation-button" for="rotation-<?php echo $block; ?>" title="<?php _e ('Toggle rotation editor', 'ad-inserter'); ?>"><span class="checkbox-icon icon-rotation"></span></label>
        </span>
        <span class="ai-toolbar-button ai-button-left">
          <input type="checkbox" id="visual-editor-<?php echo $block; ?>" style="display: none;" />
          <label class="checkbox-button" for="visual-editor-<?php echo $block; ?>" title="<?php _e ('Open visual HTML editor', 'ad-inserter'); ?>"><span class="checkbox-icon icon-edit"></span></label>
        </span>


<?php if (defined ('AI_ADSENSE_API')) : ?>
<?php if (defined ('AI_ADSENSE_AUTHORIZATION_CODE')) : ?>
        <span style="display: table-cell; width: 6%;"></span>

        <span class="ai-toolbar-button ai-button-left">
          <input type="checkbox" id="ga-<?php echo $block; ?>" style="display: none;" />
          <label class="checkbox-button adsense-list" for="ga-<?php echo $block; ?>" title="<?php _e ('Show AdSense ad units', 'ad-inserter'); ?>" ><span class="checkbox-icon icon-adsense"></span></label>
        </span>
<?php endif; ?>
<?php endif; ?>

        <span style="display: table-cell; width: 100%;"></span>

        <span class="ai-toolbar-button" style="padding-right: 15px;">
          <input type="checkbox" id="clear-block-<?php echo $block; ?>" style="display: none;" />
          <label class="checkbox-button" for="clear-block-<?php echo $block; ?>" title="<?php _e ('Clear block', 'ad-inserter'); ?>"><span class="checkbox-icon icon-clear"></span></label>
        </span>

        <span class="ai-toolbar-button">
          <input type="checkbox" id="copy-block-<?php echo $block; ?>" class="ai-copy" style="display: none;" />
          <label class="checkbox-button" for="copy-block-<?php echo $block; ?>" title="<?php _e ('Copy block', 'ad-inserter'); ?>"><span class="checkbox-icon icon-copy"></span></label>
        </span>
        <span class="ai-toolbar-button">
          <input type="checkbox" id="paste-name-<?php echo $block; ?>" style="display: none;" />
          <label class="checkbox-button" for="paste-name-<?php echo $block; ?>" title="<?php _e ('Paste name', 'ad-inserter'); ?>"><span class="checkbox-icon icon-paste-name"></span></label>
        </span>
        <span class="ai-toolbar-button">
          <input type="checkbox" id="paste-code-<?php echo $block; ?>" style="display: none;" />
          <label class="checkbox-button" for="paste-code-<?php echo $block; ?>" title="<?php _e ('Paste code', 'ad-inserter'); ?>"><span class="checkbox-icon icon-paste-code"></span></label>
        </span>
        <span class="ai-toolbar-button">
          <input type="checkbox" id="paste-settings-<?php echo $block; ?>" style="display: none;" />
          <label class="checkbox-button" for="paste-settings-<?php echo $block; ?>" title="<?php _e ('Paste settings', 'ad-inserter'); ?>"><span class="checkbox-icon icon-paste-settings"></span></label>
        </span>
        <span class="ai-toolbar-button">
          <input type="checkbox" id="paste-block-<?php echo $block; ?>" style="display: none;" />
          <label class="checkbox-button" for="paste-block-<?php echo $block; ?>" title="<?php _e ('Paste block (name, code and settings)', 'ad-inserter'); ?>"><span class="checkbox-icon icon-paste"></span></label>
        </span>
<?php endif; ?>
      </div>
    </div>

  </div>

<?php if (function_exists ('ai_settings_container')) ai_settings_container ($block, $obj); ?>

  <div id="settings-<?php echo $block; ?>">

<?php if (defined ('AI_CODE_GENERATOR')) : ?>
  <div id="ai-rotation-container-<?php echo $block; ?>" class='ai-rotate' style="padding: 0; margin: 8px 0; border: 0; display: none;">

    <div class="max-input" style="height: 28px; position: absolute; top: 4px; left: -6px;">
      <span style="display: table-cell; width: 100%;"></span>
      <span class="ai-toolbar-button">
        <input type="checkbox" id="rotation-groups-<?php echo $block; ?>" style="display: none;" />
        <label for="rotation-groups-<?php echo $block; ?>" title="<?php _e ('Rotation groups', 'ad-inserter'); ?>"><span class="checkbox-button dashicons dashicons-groups"></span></label>
      </span>
      <span class="ai-toolbar-button">
        <input type="checkbox" id="remove-option-<?php echo $block; ?>" style="display: none;" />
        <label class="checkbox-button" for="remove-option-<?php echo $block; ?>" title="<?php _e ('Remove option', 'ad-inserter'); ?>"><span class="checkbox-icon icon-minus"></span></label>
      </span>
      <span class="ai-toolbar-button">
        <input type="checkbox" id="add-option-<?php echo $block; ?>" style="display: none;" />
        <label class="checkbox-button" for="add-option-<?php echo $block; ?>" title="<?php _e ('Add option', 'ad-inserter'); ?>"><span class="checkbox-icon icon-plus"></span></label>
      </span>
    </div>

    <ul>
    </ul>

  </div>

  <div id="ai-code-generator-container-<?php echo $block; ?>" style="padding: 0; margin: 8px 0; border: 0; display: none;">

    <div class="max-input" style="height: 28px; position: absolute; top: 4px; left: -6px;">
      <span style="display: table-cell; width: 100%;"></span>
      <span class="ai-toolbar-button">
        <input type="checkbox" id="import-code-<?php echo $block; ?>" style="display: none;" />
        <label class="checkbox-button" for="import-code-<?php echo $block; ?>" title="<?php _e ('Import code', 'ad-inserter'); ?>"><span class="checkbox-icon icon-import"></span></label>
      </span>
      <span class="ai-toolbar-button">
        <input type="checkbox" id="generate-code-<?php echo $block; ?>" style="display: none;" />
        <label class="checkbox-button" for="generate-code-<?php echo $block; ?>" title="<?php _e ('Generate code', 'ad-inserter'); ?>"><span class="checkbox-icon icon-generate"></span></label>
      </span>
    </div>

    <ul>
      <li id="ai-banner-<?php echo $block; ?>"><a href="#tab-banner-<?php echo $block; ?>"><?php _e ('Banner', 'ad-inserter'); ?></a></li>
      <li id="ai-adsense-pub-id-<?php echo $block; ?>"><a href="#tab-adsense-<?php echo $block; ?>">AdSense</a></li>
      <li id="ai-amazon-<?php echo $block; ?>"><a href="#tab-amazon-<?php echo $block; ?>">Amazon</a></li>
    </ul>

    <div id="tab-banner-<?php echo $block; ?>" class="ai-banner ai-banner-top responsive-table rounded">
      <div class="banner-preview">
        <a id="banner-link-<?php echo $block; ?>" class="clear-link" target="_blank"><img id="banner-image-<?php echo $block; ?>" src="" style="display: none;" /></a>
      </div>
      <table class="ai-settings-table">
        <tr>
          <td style="padding-right: 7px;">
            <?php _e ('Image', 'ad-inserter'); ?>
          </td>
          <td style="width: 98%;" colspan="2">
            <input id="banner-image-url-<?php echo $block; ?>" style="width: 100%;" type="text" size="50" maxlength="200" />
          </td>
        </tr>
        <tr>
          <td>
            <?php _e ('Alt text', 'ad-inserter'); ?>
          </td>
          <td style="width: 50%;">
            <input id="image-alt-text-<?php echo $block; ?>" style="width: 100%;" type="text" size="50" maxlength="200" />
          </td>
          <td style="text-align: right;">
            <span style="margin-left: 20px;">
              <input type="checkbox" id="lazy-load-image-<?php echo $block; ?>" />
              <label for="lazy-load-image-<?php echo $block; ?>" style="display: inline-block; margin-top: -1px;"><?php _e ('Lazy loading', 'ad-inserter'); ?></label>
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <?php _e ('Link', 'ad-inserter'); ?>
          </td>
          <td colspan="2">
            <input id="banner-url-<?php echo $block; ?>" style="width: 100%;" type="text" size="50" maxlength="200" />
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" id="open-new-tab-<?php echo $block; ?>" />
          </td>
          <td>
            <label for="open-new-tab-<?php echo $block; ?>" style="display: inline-block; margin-top: 6px;"><?php _e ('Open link in a new tab', 'ad-inserter'); ?></label>
          </td>
          <td>
            <button id="select-image-button-<?php echo $block; ?>" type="button" class='ai-button select-image' style="display: none; min-width: 120px; float: right; margin: 7px 0 0 0;"><?php _e ('Select Image', 'ad-inserter'); ?></button>
            <button id="select-placeholder-button-<?php echo $block; ?>" type="button" class='ai-button select-image' style="display: none; min-width: 120px; float: right; margin: 7px 10px 0 0;"><?php _e ('Select Placeholder', 'ad-inserter'); ?></button>
          </td>
        </tr>
      </table>
      <div style="clear: both;"></div>
    </div>

    <div id="tab-adsense-<?php echo $block; ?>" class="responsive-table rounded">

      <table class="ai-settings-table left">
        <tr>
          <td class="label">
            <?php _e ('Comment', 'ad-inserter'); ?>
          </td>
          <td style="width: 100%; padding-left: 7px;">
            <input id="adsense-comment-<?php echo $block; ?>" style="width: 100%;" type="text" size="30" maxlength="50" />
          </td>
        </tr>

        <tr>
          <td class="label" title="Publisher ID">
            <?php _ex ('Publisher ID', 'AdSense', 'ad-inserter'); ?>
          </td>
          <td style="width: 100%; padding-left: 7px;">
            <input id="adsense-publisher-id-<?php echo $block; ?>" style="width: 100%;" type="text" size="30" maxlength="30" title="Publisher ID" />
          </td>
        </tr>

        <tr>
          <td class="label" title="Ad Slot ID">
            <?php _ex ('Ad Slot ID', 'AdSense', 'ad-inserter'); ?>
          </td>
          <td style="padding-left: 7px;">
            <input id="adsense-ad-slot-id-<?php echo $block; ?>" style="width: 100%;" type="text" size="30" maxlength="30"  title="Ad Slot ID" />
          </td>
        </tr>

        <tr>
          <td class="label">
            <?php _e ('Ad Type', 'ad-inserter'); ?>
          </td>
          <td style="padding-left: 7px;">
            <select id="adsense-type-<?php echo $block; ?>">
               <option value="<?php echo AI_ADSENSE_STANDARD; ?>" selected><?php echo AI_TEXT_ADSENSE_STANDARD; ?></option>
<!--               <option value="<?php echo AI_ADSENSE_LINK; ?>"><?php echo AI_TEXT_LINK; ?></option>-->
               <option value="<?php echo AI_ADSENSE_IN_ARTICLE; ?>"><?php echo AI_TEXT_IN_ARTICLE; ?></option>
               <option value="<?php echo AI_ADSENSE_IN_FEED; ?>"><?php echo AI_TEXT_IN_FEED; ?></option>
               <option value="<?php echo AI_ADSENSE_MATCHED_CONTENT; ?>"><?php echo AI_TEXT_MATCHED_CONTENT; ?></option>
               <option value="<?php echo AI_ADSENSE_AUTO; ?>"><?php echo AI_TEXT_ADSENSE_AUTO; ?></option>
               <option value="<?php echo AI_ADSENSE_AMP_ONLY; ?>"><?php echo AI_TEXT_ADSENSE_AMP_ONLY; ?></option>
            </select>
            <div class="adsense-size" style="float: right;">
              <?php _e ('Size', 'ad-inserter'); ?>
              <select id="adsense-size-<?php echo $block; ?>">
                 <option value="<?php echo AI_ADSENSE_SIZE_FIXED; ?>" selected><?php echo AI_TEXT_FIXED; ?></option>
                 <option value="<?php echo AI_ADSENSE_SIZE_FIXED_BY_VIEWPORT; ?>"><?php echo AI_TEXT_FIXED_BY_VIEWPORT; ?></option>
                 <option value="<?php echo AI_ADSENSE_SIZE_RESPONSIVE; ?>"><?php echo AI_TEXT_RESPONSIVE; ?></option>
              </select>
            </div>
          </td>
        </tr>

        <tr>
          <td class="label">
            <?php _e ('AMP Ad', 'ad-inserter'); ?>
          </td>
          <td style="padding-left: 7px;">
            <select id="adsense-amp-<?php echo $block; ?>">
              <option value="<?php echo AI_ADSENSE_AMP_DISABLED; ?>" selected><?php echo AI_TEXT_ADSENSE_DISABLED; ?></option>
              <option value="<?php echo AI_ADSENSE_AMP_ABOVE_THE_FOLD; ?>"><?php echo AI_TEXT_ABOVE_THE_FOLD; ?></option>
              <option value="<?php echo AI_ADSENSE_AMP_BELOW_THE_FOLD; ?>"><?php echo AI_TEXT_BELOW_THE_FOLD; ?></option>
              <option value="<?php echo AI_ADSENSE_AMP_FIXED; ?>"><?php echo AI_TEXT_FIXED; ?></option>
              <option value="<?php echo AI_ADSENSE_AMP_STICKY; ?>"><?php echo AI_TEXT_STICKY_AMP; ?></option>
              <option value="<?php echo AI_ADSENSE_AMP_AUTO; ?>"><?php echo AI_TEXT_ADSENSE_AUTO; ?></option>
            </select>

            <span style="width: 10%; padding-left: 10px;">
              <input type="checkbox" id="adsense-amp-block-on-consent-<?php echo $block; ?>" />
              <label for="adsense-amp-block-on-consent-<?php echo $block; ?>" style="display: inline-block;"><?php _e ('Block on consent', 'ad-inserter'); ?></label>
            </span>
          </td>
        </tr>

        <tr>
          <td>
          </td>
          <td>
<?php if (defined ('AI_ADSENSE_API')) : ?>
<?php if (!defined ('AI_ADSENSE_AUTHORIZATION_CODE')) : ?>
            <button type="button" class='ai-button adsense-list' style="display: none; margin: 2px 0px 0px 7px;" title="<?php _e ('Show ad units from your AdSense account', 'ad-inserter'); ?>"><?php _e ('AdSense ad units', 'ad-inserter'); ?></button>
<?php endif; ?>
<?php endif; ?>
          </td>
        </tr>
      </table>

      <table id="adsense-layout-<?php echo $block; ?>" class="ai-settings-table right">
        <tr>
          <td></td>
          <td>
            <input style="visibility: hidden;" type="text" size="1" maxlength="1" />
          </td>
        </tr>

        <tr>
          <td class="adsense-layout" style="padding-left: 7px;" title="Layout">
            <?php _ex ('Layout', 'AdSense', 'ad-inserter'); ?>
          </td>
          <td class="adsense-layout" style="width: 100%; padding-left: 7px;">
            <input id="adsense-layout-<?php echo $block; ?>" style="width: 100%;" type="text" size="80" maxlength="100"  title="Layout" />
          </td>
        </tr>

        <tr>
          <td class="adsense-layout" style="padding-left: 7px;" title="Layout Key">
            <?php _ex ('Layout Key', 'AdSense', 'ad-inserter'); ?>
          </td>
          <td class="adsense-layout" style="padding-left: 7px;">
            <input id="adsense-layout-key-<?php echo $block; ?>" style="width: 100%;" type="text" size="80" maxlength="100"  title="Layout Key" />
          </td>
        </tr>

        <tr>
          <td style="padding-left: 7px; float: left;">
            <span class="adsense-full-width-responsive">
              <?php _e ('Full width', 'ad-inserter'); ?>
              <select class="adsense-full-width" style="margin-top: 1px;">
                 <option value="enabled"><?php _ex ('Enabled', 'Full width', 'ad-inserter'); ?></option>
                 <option value="disabled" selected><?php _ex ('Disabled', 'Full width', 'ad-inserter'); ?></option>
              </select>
            </span>
            <span class="adsense-fixed-size ad-size">
              <select class="adsense-ad-size fixed" style="padding-top: 1px;">
                 <option value="&nbsp;" selected></option>
                 <option value="300x250">300x250</option>
                 <option value="336x280">336x280</option>
                 <option value="728x90" >728x90</option>
                 <option value="300x600">300x600</option>
                 <option value="320x100">320x100</option>
                 <option value="468x60" >468x60</option>
                 <option value="234x60" >234x60</option>
                 <option value="125x125">125x125</option>
                 <option value="250x250">250x250</option>
                 <option value="200x200">200x200</option>
                 <option value="120x600">120x600</option>
                 <option value="160x600">160x600</option>
                 <option value="300x1050">300x1050</option>
                 <option value="320x50">320x50</option>
                 <option value="970x90">970x90</option>
                 <option value="970x250">970x250</option>
              </select>
            </span>
          </td>
          <td>
          </td>
        </tr>

      </table>

      <table id="adsense-viewports-<?php echo $block; ?>" class="ai-settings-table right" style="display: none; width: auto;">
<?php
      for ($viewport = 1; $viewport <= 6; $viewport ++) {
        $viewport_name  = get_viewport_name ($viewport);
        $viewport_width = get_viewport_width ($viewport);
        if ($viewport_name != '') { ?>
        <tr class="adsense-viewport ad-size">
          <td style="max-width: 210px; padding-left: 10px; overflow: hidden;">
            <?php echo $viewport_name; ?>
          </td>
          <td style="padding-left: 7px;">
            <select class="adsense-ad-size">
               <option value="&nbsp;" selected></option>
               <option value="300x250">300x250</option>
               <option value="336x280">336x280</option>
               <option value="728x90" >728x90</option>
               <option value="300x600">300x600</option>
               <option value="320x100">320x100</option>
               <option value="468x60" >468x60</option>
               <option value="234x60" >234x60</option>
               <option value="125x125">125x125</option>
               <option value="250x250">250x250</option>
               <option value="200x200">200x200</option>
               <option value="120x600">120x600</option>
               <option value="160x600">160x600</option>
               <option value="300x1050">300x1050</option>
               <option value="320x50">320x50</option>
               <option value="970x90">970x90</option>
               <option value="970x250">970x250</option>
            </select>
          </td>
        </tr>
<?php   }
      }
?>
      </table>

      <div style="clear: both;"></div>

    </div>

    <div id="tab-amazon-<?php echo $block; ?>" class="responsive-table rounded">
      <textarea id="amazon-data-<?php echo $block; ?>" style="background-color:#F9F9F9; font-family: monospace, Courier, 'Courier New'; font-weight: bold; width: 100%; height: 240px;"></textarea>

      <table class="ai-settings-table">
        <tr>
          <td class="label" style="padding-right: 10px;">
            <?php _e ('AMP Ad', 'ad-inserter'); ?>
          </td>
          <td>
            <select id="amazon-amp-<?php echo $block; ?>">
              <option value="<?php echo AI_AMAZON_AMP_DISABLED; ?>" selected><?php echo AI_TEXT_DISABLED; ?></option>
              <option value="<?php echo AI_AMAZON_AMP_ENABLED; ?>"><?php echo AI_TEXT_ENABLED; ?></option>
            </select>
          </td>
          <td class="label amazon-amp-data" style="padding-left: 10px;">
            <?php _e ('Width', 'ad-inserter'); ?>
          </td>
          <td class="amazon-amp-data" style="width: 10%;">
            <input id="amazon-width-<?php echo $block; ?>" style="width: 100%;" type="text" size="8" maxlength="8" title="Amazon AMP ad width" />
          </td>
          <td class="label amazon-amp-data" style="padding-left: 10px;">
            <?php _e ('Height', 'ad-inserter'); ?>
          </td>
          <td class="amazon-amp-data" style="width: 10%;">
            <input id="amazon-height-<?php echo $block; ?>" style="width: 100%;" type="text" size="8" maxlength="8" title="Amazon AMP ad height" />
          </td>
          <td class="amazon-amp-data" style="width: 10%; padding-left: 10px;">
            <input type="checkbox" id="amazon-amp-block-on-consent-<?php echo $block; ?>" />
            <label for="amazon-amp-block-on-consent-<?php echo $block; ?>" style="display: inline-block;"><?php _e ('Block on consent', 'ad-inserter'); ?></label>
          </td>
          <td style="width: 50%;">
            &nbsp;
          </td>
        </tr>
      </table>
    </div>

  </div>
<?php endif; ?>

  <div style="margin: 8px 0;">
    <textarea id="block-<?php echo $block; ?>" class="simple-editor" style="background-color:#F9F9F9; font-family: monospace, Courier, 'Courier New'; font-weight: bold;" name="<?php echo AI_OPTION_CODE, WP_FORM_FIELD_POSTFIX, $block; ?>" default=""><?php echo esc_textarea ($obj->get_ad_data()); ?></textarea>
  </div>

  <div style="padding: 0; min-height: 28px;">
    <div style="float: left;">
      <button id="lists-button-<?php echo $block; ?>" type="button" class='ai-button2' style="display: none; margin-right: 4px;" title="<?php _e ('White/Black-list Category, Tag, Taxonomy, Post ID, Url, Url parameter, Cookie or Referer (domain)', 'ad-inserter'); ?>"><span style="<?php echo $lists_style; ?>"><?php _e ('Lists', 'ad-inserter'); ?></span></button>
      <button id="manual-button-<?php echo $block; ?>" type="button" class='ai-button2' style="display: none; margin-right: 4px;" title="<?php _e ('Widget, Shortcode and PHP function call', 'ad-inserter'); ?>"><span style="<?php echo $manual_style; ?>"><?php _e ('Manual', 'ad-inserter'); ?></span></button>
      <button id="device-detection-button-<?php echo $block; ?>" class='ai-button2' type="button" style="display: none; margin-right: 4px;" title="<?php _e ('Client/Server-side Device Detection (Desktop, Tablet, Phone,...)', 'ad-inserter'); ?>"><span style="<?php echo $devices_style; ?>"><?php _e ('Devices', 'ad-inserter'); ?></span></button>
      <button id="misc-button-<?php echo $block; ?>" type="button" class='ai-button2' style="display: none; margin-right: 4px;" title="<?php _e ('Check for user status, Limit insertions (error 404 page, Ajax requests, RSS feeds), Filter, Scheduling, General tag', 'ad-inserter'); ?>"><span style="<?php echo $misc_style; ?>"><?php _e ('Misc', 'ad-inserter'); ?></span></button>
      <button id="preview-button-<?php echo $block; ?>" type="button" class='ai-button2' style="display: none; margin-right: 4px;" title="<?php _e ('Preview code and alignment', 'ad-inserter'); ?>" site-url="<?php echo wp_make_link_relative (get_site_url()); ?>"><?php _e ('Preview', 'ad-inserter'); ?></button>
    </div>
    <div style="float: right;">
      <div title='<?php _e ('Rotation editor active - rotation code not generated! Make sure no rotation editor is active before saving settings.', 'ad-inserter'); ?>' class="ai-rotation-warning" style='float: left; font-size: 18px; font-weight: bold; margin: 5px 5px 0 0; display: none;'>&#x26A0;</div>
<?php if (function_exists ('ai_settings_bottom_buttons')) ai_settings_bottom_buttons ($start, $end); else { ?>
      <input style="display: none; vertical-align: middle; font-weight: bold;" name="<?php echo AI_FORM_SAVE; ?>" value="<?php echo __('Save Settings', 'ad-inserter'), ' ', $start, ' - ', $end; ?>" type="submit" />
<?php } ?>
    </div>
    <div style="clear: both;"></div>
  </div>

  <div class="responsive-table small-button rounded">
    <table id="page-types-<?php echo $block; ?>" class="ai-page-types">
      <tr style="height: 27px;">
        <td class="ai-page-type ai-po" style="width: 30%;">
          <input type="hidden" name="<?php echo AI_OPTION_DISPLAY_ON_POSTS, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
          <input id="display-posts-<?php echo $block; ?>" type="checkbox" name="<?php echo AI_OPTION_DISPLAY_ON_POSTS, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo $default->get_display_settings_post(); ?>" title="<?php _e ('Enable insertion on posts', 'ad-inserter'); ?>" <?php if ($obj->get_display_settings_post()==AI_ENABLED) echo 'checked '; ?> />
          <label for="display-posts-<?php echo $block; ?>" title="<?php _e ('Enable insertion on posts', 'ad-inserter'); ?>"><?php _e ('Posts', 'ad-inserter'); ?></label>
        </td>
        <td class="ai-page-type ai-hp" style="width: 30%; padding-left: 4px;">
          <input type="hidden" name="<?php echo AI_OPTION_DISPLAY_ON_HOMEPAGE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
          <input id= "display-homepage-<?php echo $block; ?>" style="margin-left: 10px;" type="checkbox" name="<?php echo AI_OPTION_DISPLAY_ON_HOMEPAGE, WP_FORM_FIELD_POSTFIX, $block; ?>" title="<?php _e ('Enable insertion on homepage: latest posts (including on sub-pages), static page or theme homepage (available positions may depend on hooks used by the theme)', 'ad-inserter'); ?>" value="1" default="<?php echo $default->get_display_settings_home(); ?>" <?php if ($obj->get_display_settings_home()==AI_ENABLED) echo 'checked '; ?> />
          <label for="display-homepage-<?php echo $block; ?>" title="<?php _e ('Enable insertion on homepage: latest posts (including on sub-pages), static page or theme homepage (available positions may depend on hooks used by the theme)', 'ad-inserter'); ?>"><?php _e ('Homepage', 'ad-inserter'); ?></label>
        </td>
        <td class="ai-page-type ai-cp" style="width: 30%; padding-left: 4px;">
          <input type="hidden" name="<?php echo AI_OPTION_DISPLAY_ON_CATEGORY_PAGES, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
          <input id= "display-category-<?php echo $block; ?>" style="margin-left: 10px;" type="checkbox" name="<?php echo AI_OPTION_DISPLAY_ON_CATEGORY_PAGES, WP_FORM_FIELD_POSTFIX, $block; ?>" title="<?php _e ('Enable insertion on category blog pages (including sub-pages)', 'ad-inserter'); ?>" value="1" default="<?php echo $default->get_display_settings_category(); ?>" <?php if ($obj->get_display_settings_category()==AI_ENABLED) echo 'checked '; ?> />
          <label for="display-category-<?php echo $block; ?>" title="<?php _e ('Enable insertion on category blog pages (including sub-pages)', 'ad-inserter'); ?>"><?php _e ('Category pages', 'ad-inserter'); ?></label>
        </td>
        <td style="padding-left: 6px; text-align: right;">
            <span class="page-checker-button checkbox-button dashicons dashicons-editor-justify" title="<?php _e ('Check theme for available positions for automatic insertion', 'ad-inserter'); ?>"></span>
        </td>
      </tr>

      <tr style="height: 27px;">
        <td class="ai-page-type ai-pa">
          <input type="hidden" name="<?php echo AI_OPTION_DISPLAY_ON_PAGES, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
          <input id="display-pages-<?php echo $block; ?>" type="checkbox" name="<?php echo AI_OPTION_DISPLAY_ON_PAGES, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo $default->get_display_settings_page(); ?>" title="<?php _e ('Enable insertion on static pages', 'ad-inserter'); ?>" <?php if ($obj->get_display_settings_page()==AI_ENABLED) echo 'checked '; ?> />
          <label for="display-pages-<?php echo $block; ?>" title="<?php _e ('Enable insertion on static pages', 'ad-inserter'); ?>"><?php _e ('Static pages', 'ad-inserter'); ?></label>
        </td>
        <td class="ai-page-type ai-sp" style="padding-left: 4px;">
          <input type="hidden" name="<?php echo AI_OPTION_DISPLAY_ON_SEARCH_PAGES, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
          <input id= "display-search-<?php echo $block; ?>" style="margin-left: 10px;" type="checkbox" name="<?php echo AI_OPTION_DISPLAY_ON_SEARCH_PAGES, WP_FORM_FIELD_POSTFIX, $block; ?>" title="<?php _e ('Enable insertion on search blog pages', 'ad-inserter'); ?>" value="1" default="<?php echo $default->get_display_settings_search(); ?>" <?php if ($obj->get_display_settings_search()==AI_ENABLED) echo 'checked '; ?> />
          <label for="display-search-<?php echo $block; ?>" title="<?php _e ('Enable insertion on search blog pages', 'ad-inserter'); ?>"><?php _e ('Search pages', 'ad-inserter'); ?></label>
        </td>
        <td class="ai-page-type ai-ap" style="padding-left: 4px;">
          <input type="hidden" name="<?php echo AI_OPTION_DISPLAY_ON_ARCHIVE_PAGES, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
          <input id= "display-archive-<?php echo $block; ?>" style="margin-left: 10px;" type="checkbox" name="<?php echo AI_OPTION_DISPLAY_ON_ARCHIVE_PAGES, WP_FORM_FIELD_POSTFIX, $block; ?>" title="<?php _e ('Enable insertion on tag or archive blog pages', 'ad-inserter'); ?>" value="1" default="<?php echo $default->get_display_settings_archive(); ?>" <?php if ($obj->get_display_settings_archive()==AI_ENABLED) echo 'checked '; ?> />
          <label for="display-archive-<?php echo $block; ?>" title="<?php _e ('Enable insertion on tag or archive blog pages', 'ad-inserter'); ?>"><?php _e ('Tag / Archive pages', 'ad-inserter'); ?></label>
        </td>
        <td id="exceptions-button-container-<?php echo $block; ?>" style="padding-left: 6px; text-align: right;">
          <span id="exceptions-button-<?php echo $block; ?>" class="checkbox-button dashicons dashicons-forms<?php echo $exception_button_on ? ' on' : ''; ?>" title="<?php _e ('Toggle settings for default insertion and list of individual exceptions', 'ad-inserter'); ?>"></span>
        </td>
      </tr>
    </table>
  </div>

  <div id="block-exceptions-<?php echo $block; ?>" class="responsive-table rounded" style="<?php echo $exceptions_shown ? '' : 'display: none;'; ?>">

    <div style="min-height: 25px;">
      <div style="float: left">
        <span style="display: table-cell;">
          <input type="hidden" name="<?php echo AI_OPTION_EXCEPTIONS_ENABLED, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
          <input id="exceptions-enabled-<?php echo $block; ?>" style="margin-top: -2px;" type="checkbox" name="<?php echo AI_OPTION_EXCEPTIONS_ENABLED, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo $default->get_exceptions_enabled (); ?>" title="<?php _e ('Enable individual post/page exceptions for insertion of this block. They can be configured on the individual post/page editor page (in the settings below the editor).', 'ad-inserter'); ?>" <?php if ($obj->get_exceptions_enabled () == AI_ENABLED) echo 'checked '; ?> />
          <label for="exceptions-enabled-<?php echo $block; ?>" title="<?php _e ('Enable individual post/page exceptions for insertion of this block. When enabled they can be configured on the individual post/page editor page (in the settings below the editor).', 'ad-inserter'); ?>"><?php _e ('Use exceptions for individual posts or pages to change insertion', 'ad-inserter'); ?></label>
          &nbsp;
        </span>
      </div>
      <div id="default-insertion-<?php echo $block; ?>" style="float: right; display: <?php echo $obj->get_exceptions_enabled () == AI_ENABLED ? 'block' : 'none'; ?>;">
        <span style="display: table-cell;">
          <?php echo __('Default insertion', 'ad-inserter'); ?>
          <select id="exceptions-function-<?php echo $block; ?>" style="margin: 0px 0 -1px 0;" name="<?php echo AI_OPTION_EXCEPTIONS_FUNCTION, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_exceptions_function (); ?>" title="<?php echo
                   '[[', AI_TEXT_ENABLED, ']] ', ' ', /* Translators: Enabled means...*/ __('means the insertion for this block is enabled by default and disabled for exceptions.', 'ad-inserter'),
              '[BR] [[', AI_TEXT_DISABLED, ']] ',  ' ', /* Translators: Disabled means...*/ __('means the insertion for this block is disabled by default and enabled for exceptions.', 'ad-inserter'),
              '[BR][HR]', _e ('When individual post/page exceptions are enabled they can be configured on the individual post/page editor page (in the settings below the editor).', 'ad-inserter'); ?>">
             <option value="<?php echo AI_DEFAULT_INSERTION_ENABLED; ?>" <?php echo ($obj->get_exceptions_function () == AI_DEFAULT_INSERTION_ENABLED) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_ENABLED; ?></option>
             <option value="<?php echo AI_DEFAULT_INSERTION_DISABLED; ?>" <?php echo ($obj->get_exceptions_function () == AI_DEFAULT_INSERTION_DISABLED) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DISABLED; ?></option>
          </select>
        </span>
<?php
    if ($exceptions_error) {
?>
        <span title='<?php _e ('No exception for post or static page defined. Block will not be inserted.', 'ad-inserter'); ?>' style='display: table-cell; font-size: 20px; vertical-align: middle; padding: 0;'>&#x26A0;</span>
<?php
    }
    if ($exceptions_needs_check) {
?>
        <span title='<?php _e ('Settings for individual exceptions have been updated. Please check all blocks that have exceptions and and then save settings.', 'ad-inserter'); ?>' style='display: table-cell; font-size: 20px; vertical-align: middle; padding: 0;'>&#x26A0;</span>
<?php
    }
?>
      </div>
      <div style="clear: both;"></div>
    </div>

<?php
    if (!empty ($block_exceptions [$block])) {
?>
    <table class="exceptions" style="margin-top: 10px;" cellspacing=0 cellpadding=0><tbody>
      <tr>
        <th class="id">ID</th><th class="type"><?php _ex ('Type', 'post', 'ad-inserter'); ?></th><th class="page page-only"><?php _e ('Title', 'ad-inserter'); ?></th><th>

          <?php if (!function_exists ('ai_settings_write') || ai_settings_write ()): ?>

          <input id="clear-block-exceptions-<?php echo $block; ?>"
                  onclick="if (confirm('<?php /* translators: %d: block number */ printf (__('Are you sure you want to clear listed exceptions for block %d?', 'ad-inserter'), $block); ?>')) {document.getElementById ('clear-block-exceptions-<?php echo $block; ?>').style.visibility = 'hidden'; document.getElementById ('clear-block-exceptions-<?php echo $block; ?>').style.fontSize = '1px'; document.getElementById ('clear-block-exceptions-<?php echo $block; ?>').value = '<?php echo $block; ?>'; return true;} return false"
                  title="<?php _e ('Clear listed exceptions for block', 'ad-inserter'); echo ' ', $block; ?>"
                  name="<?php echo AI_FORM_CLEAR_EXCEPTIONS; ?>"
                  value="&#x274C;"
                  type="submit"
                  style="padding: 1px 3px; border: 0; background: transparent; font-size: 8px; color: #e44; box-shadow: none; vertical-align: baseline;" />

      <?php endif; ?>

      </th></tr>
<?php
      foreach ($post_exceptions as $exception) {
        echo $exception;
      }
      foreach ($page_exceptions as $exception) {
        echo $exception;
      }
?>
    </tbody></table>
<?php
    }
?>

  </div>

  <div class="responsive-table rounded">
    <table>
      <tbody>
        <tr>
          <td style="width: 5%; overflow: hidden;">
            <?php _e('Insertion', 'ad-inserter'); ?>
            <select class="ai-image-selection" style="margin-bottom: 3px;" id="insertion-type-<?php echo $block; ?>" name="<?php echo AI_OPTION_AUTOMATIC_INSERTION, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_automatic_insertion(); ?>">
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-disabled" value="<?php echo AI_AUTOMATIC_INSERTION_DISABLED; ?>" data-title="<?php echo AI_TEXT_DISABLED; ?>" <?php echo ($automatic_insertion == AI_AUTOMATIC_INSERTION_DISABLED) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DISABLED; ?></option>
               <?php if (defined ('AI_BUFFERING') && get_output_buffering ()) : ?>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-above-header" value="<?php echo AI_AUTOMATIC_INSERTION_ABOVE_HEADER; ?>" data-title="<?php echo AI_TEXT_ABOVE_HEADER; ?>" <?php echo ($automatic_insertion == AI_AUTOMATIC_INSERTION_ABOVE_HEADER) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_ABOVE_HEADER; ?></option>
               <?php endif; ?>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-before-post" value="<?php echo AI_AUTOMATIC_INSERTION_BEFORE_POST; ?>" data-title="<?php echo AI_TEXT_BEFORE_POST; ?>" <?php echo ($automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_POST) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_BEFORE_POST; ?></option>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-before-content" value="<?php echo AI_AUTOMATIC_INSERTION_BEFORE_CONTENT; ?>" data-title="<?php echo AI_TEXT_BEFORE_CONTENT; ?>" <?php echo ($automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_CONTENT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_BEFORE_CONTENT; ?></option>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-before-paragraph" value="<?php echo AI_AUTOMATIC_INSERTION_BEFORE_PARAGRAPH; ?>" data-title="<?php echo AI_TEXT_BEFORE_PARAGRAPH; ?>" <?php echo ($automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_PARAGRAPH) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_BEFORE_PARAGRAPH; ?></option>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-after-paragraph" value="<?php echo AI_AUTOMATIC_INSERTION_AFTER_PARAGRAPH; ?>" data-title="<?php echo AI_TEXT_AFTER_PARAGRAPH; ?>" <?php echo ($automatic_insertion == AI_AUTOMATIC_INSERTION_AFTER_PARAGRAPH) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_AFTER_PARAGRAPH; ?></option>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-before-image" value="<?php echo AI_AUTOMATIC_INSERTION_BEFORE_IMAGE; ?>" data-title="<?php echo AI_TEXT_BEFORE_IMAGE; ?>" <?php echo ($automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_IMAGE) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_BEFORE_IMAGE; ?></option>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-after-image" value="<?php echo AI_AUTOMATIC_INSERTION_AFTER_IMAGE; ?>" data-title="<?php echo AI_TEXT_AFTER_IMAGE; ?>" <?php echo ($automatic_insertion == AI_AUTOMATIC_INSERTION_AFTER_IMAGE) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_AFTER_IMAGE; ?></option>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-after-content" value="<?php echo AI_AUTOMATIC_INSERTION_AFTER_CONTENT; ?>" data-title="<?php echo AI_TEXT_AFTER_CONTENT; ?>" <?php echo ($automatic_insertion == AI_AUTOMATIC_INSERTION_AFTER_CONTENT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_AFTER_CONTENT; ?></option>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-after-post" value="<?php echo AI_AUTOMATIC_INSERTION_AFTER_POST; ?>" data-title="<?php echo AI_TEXT_AFTER_POST; ?>" <?php echo ($automatic_insertion == AI_AUTOMATIC_INSERTION_AFTER_POST) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_AFTER_POST; ?></option>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-before-excerpts" value="<?php echo AI_AUTOMATIC_INSERTION_BEFORE_EXCERPT; ?>" data-title="<?php echo AI_TEXT_BEFORE_EXCERPT; ?>" <?php echo ($automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_EXCERPT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_BEFORE_EXCERPT; ?></option>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-after-excerpts" value="<?php echo AI_AUTOMATIC_INSERTION_AFTER_EXCERPT; ?>" data-title="<?php echo AI_TEXT_AFTER_EXCERPT; ?>" <?php echo ($automatic_insertion == AI_AUTOMATIC_INSERTION_AFTER_EXCERPT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_AFTER_EXCERPT; ?></option>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-between-posts" value="<?php echo AI_AUTOMATIC_INSERTION_BETWEEN_POSTS; ?>" data-title="<?php echo AI_TEXT_BETWEEN_POSTS; ?>" <?php echo ($automatic_insertion == AI_AUTOMATIC_INSERTION_BETWEEN_POSTS) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_BETWEEN_POSTS; ?></option>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-before-comments" value="<?php echo AI_AUTOMATIC_INSERTION_BEFORE_COMMENTS; ?>" data-title="<?php echo AI_TEXT_BEFORE_COMMENTS; ?>" <?php echo ($automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_COMMENTS) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_BEFORE_COMMENTS; ?></option>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-between-comments" value="<?php echo AI_AUTOMATIC_INSERTION_BETWEEN_COMMENTS; ?>" data-title="<?php echo AI_TEXT_BETWEEN_COMMENTS; ?>" <?php echo ($automatic_insertion == AI_AUTOMATIC_INSERTION_BETWEEN_COMMENTS) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_BETWEEN_COMMENTS; ?></option>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-after-comments" value="<?php echo AI_AUTOMATIC_INSERTION_AFTER_COMMENTS; ?>" data-title="<?php echo AI_TEXT_AFTER_COMMENTS; ?>" <?php echo ($automatic_insertion == AI_AUTOMATIC_INSERTION_AFTER_COMMENTS) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_AFTER_COMMENTS; ?></option>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-footer" value="<?php echo AI_AUTOMATIC_INSERTION_FOOTER; ?>" data-title="<?php echo AI_TEXT_FOOTER; ?>" <?php echo ($automatic_insertion == AI_AUTOMATIC_INSERTION_FOOTER) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_FOOTER; ?></option>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-before-html" value="<?php echo AI_AUTOMATIC_INSERTION_BEFORE_HTML_ELEMENT; ?>" data-title="<?php echo AI_TEXT_BEFORE_HTML_ELEMENT; ?>" <?php echo ($automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_HTML_ELEMENT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_BEFORE_HTML_ELEMENT; ?></option>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-inside-html" value="<?php echo AI_AUTOMATIC_INSERTION_INSIDE_HTML_ELEMENT; ?>" data-title="<?php echo AI_TEXT_INSIDE_HTML_ELEMENT; ?>" <?php echo ($automatic_insertion == AI_AUTOMATIC_INSERTION_INSIDE_HTML_ELEMENT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_INSIDE_HTML_ELEMENT; ?></option>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-after-html" value="<?php echo AI_AUTOMATIC_INSERTION_AFTER_HTML_ELEMENT; ?>" data-title="<?php echo AI_TEXT_AFTER_HTML_ELEMENT; ?>" <?php echo ($automatic_insertion == AI_AUTOMATIC_INSERTION_AFTER_HTML_ELEMENT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_AFTER_HTML_ELEMENT; ?></option>
               <?php foreach ($ai_custom_hooks as $hook_index => $custom_hook) { ?>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-custom-hook" value="<?php echo AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + $custom_hook ['index'] - 1; ?>" data-title="<?php echo $custom_hook ['name']; ?>" <?php echo ($automatic_insertion == AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + $custom_hook ['index'] - 1) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo $custom_hook ['name']; ?></option>
               <?php } ?>
            </select>
          </td>
          <td style="width: 50%;">
            <span id="paragraph-settings-<?php echo $block; ?>" style="<?php echo $paragraph_settings ? "" : " display: none;" ?>">
              <input
                type="text"
                id="paragraph-numbers-<?php echo $block; ?>"
                style="width: 100%;"
                name="<?php echo AI_OPTION_PARAGRAPH_NUMBER, WP_FORM_FIELD_POSTFIX, $block; ?>"
                default="<?php echo $default->get_paragraph_number(); ?>"
                value="<?php echo $obj->get_paragraph_number(); ?>"
                data-title-paragraphs="<?php _e('Paragraph number or comma separated paragraph numbers: 1 to N means paragraph number, %N means every N paragraphs, empty means all paragraphs, 0 means random paragraph, value between 0 and 1 means relative position on the page (0.2 means paragraph at 20% of page paragraphs, 0.5 means paragraph halfway down the page, 0.9 means paragraph at 90% of page paragraphs, etc.), negative number means counting from the opposite direction', 'ad-inserter'); ?>"
                data-title-images="<?php _e('Image number or comma separated image numbers: 1 to N means image number, %N means every N images, empty means all images, 0 means random image, value between 0 and 1 means relative position on the page (0.2 means paragraph at 20% of page images, 0.5 means middle image, 0.9 means paragraph at 90% of page images, etc.), negative number means counting from the opposite direction', 'ad-inserter'); ?>"
                size="8"
                maxlength="70" />
            </span>

            <span id="filter-settings-<?php echo $block; ?>" style="<?php echo $filter_insertions_settings ? "" : " display: none;" ?>">
              <input
                type="text"
                id="filter-numbers-insertions-<?php echo $block; ?>"
                style="width: 100%;"
                name="<?php echo AI_OPTION_EXCERPT_NUMBER, WP_FORM_FIELD_POSTFIX, $block; ?>"
                default="<?php echo $default->get_call_filter(); ?>"
                value="<?php echo $obj->get_call_filter(); ?>"
                data-title-excerpts="<?php _e('Insertion Filter Mirror Setting | Excerpt number or comma separated excerpt numbers, %N means every N excerpts, empty means all excerpts', 'ad-inserter'); ?>"
                data-title-posts="<?php _e('Insertion Filter Mirror Setting | Post number or comma separated post numbers, %N means every N posts, empty means all posts', 'ad-inserter'); ?>"
                data-title-comments="<?php _e('Insertion Filter Mirror Setting | Comment number or comma separated comment numbers, %N means every N comments, empty means all comments', 'ad-inserter'); ?>"
                size="8"
                maxlength="70" />
            </span>
          </td>
          <td style="width: 2%; overflow: hidden;">
            <span id="paragraph-buttons-<?php echo $block; ?>" style="padding-left: 10px; display: none;">
              <span id="counting-button-<?php echo $block; ?>" class="checkbox-button dashicons dashicons-editor-paragraph" title="<?php _e ('Toggle paragraph counting settings', 'ad-inserter'); ?>"></span>
              <span id="clearance-button-<?php echo $block; ?>" class="checkbox-button dashicons dashicons-align-right" title="<?php _e ('Toggle paragraph clearance settings', 'ad-inserter'); ?>"></span>
            </span>
            <span id="filter-buttons-<?php echo $block; ?>" style="padding-left: 10px; display: none;">
              <span id="filter-button-<?php echo $block; ?>" class="checkbox-button dashicons dashicons-filter" title="<?php _e ('Toggle insertion filter settings', 'ad-inserter'); ?>"></span>
            </span>
          </td>
          <td style="width: 5%; overflow: hidden; padding-left: 10px;">
            <?php _e('Alignment', 'ad-inserter'); ?>
            <select id="block-alignment-<?php echo $block; ?>" style="margin-bottom: 3px;" name="<?php echo AI_OPTION_ALIGNMENT_TYPE, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_alignment_type(); ?>">
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-default" value="<?php echo AI_ALIGNMENT_DEFAULT; ?>" data-title="<?php echo AI_TEXT_DEFAULT; ?>" <?php echo ($obj->get_alignment_type() == AI_ALIGNMENT_DEFAULT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DEFAULT; ?></option>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-align-left" value="<?php echo AI_ALIGNMENT_LEFT; ?>" data-title="<?php echo AI_TEXT_LEFT; ?>" <?php echo ($obj->get_alignment_type() == AI_ALIGNMENT_LEFT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_LEFT; ?></option>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-center" value="<?php echo AI_ALIGNMENT_CENTER; ?>" data-title="<?php echo AI_TEXT_CENTER; ?>" <?php echo ($obj->get_alignment_type() == AI_ALIGNMENT_CENTER) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_CENTER; ?></option>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-align-right" value="<?php echo AI_ALIGNMENT_RIGHT; ?>" data-title="<?php echo AI_TEXT_RIGHT; ?>" <?php echo ($obj->get_alignment_type() == AI_ALIGNMENT_RIGHT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_RIGHT; ?></option>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-float-left" value="<?php echo AI_ALIGNMENT_FLOAT_LEFT; ?>" data-title="<?php echo AI_TEXT_FLOAT_LEFT; ?>" <?php echo ($obj->get_alignment_type() == AI_ALIGNMENT_FLOAT_LEFT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_FLOAT_LEFT; ?></option>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-float-right" value="<?php echo AI_ALIGNMENT_FLOAT_RIGHT; ?>" data-title="<?php echo AI_TEXT_FLOAT_RIGHT; ?>" <?php echo ($obj->get_alignment_type() == AI_ALIGNMENT_FLOAT_RIGHT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_FLOAT_RIGHT; ?></option>
               <?php if (function_exists ('ai_style_options')) ai_style_options ($obj); ?>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-custom-css" value="<?php echo AI_ALIGNMENT_CUSTOM_CSS; ?>" data-title="<?php echo AI_TEXT_CUSTOM_CSS; ?>" <?php echo ($obj->get_alignment_type() == AI_ALIGNMENT_CUSTOM_CSS) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_CUSTOM_CSS; ?></option>
               <option data-img-src="<?php echo plugins_url ('css/images/blank.png', __FILE__); ?>" data-img-class="automatic-insertion im-no-wrapping" value="<?php echo AI_ALIGNMENT_NO_WRAPPING; ?>" data-title="<?php echo AI_TEXT_NO_WRAPPING; ?>" <?php echo ($obj->get_alignment_type() == AI_ALIGNMENT_NO_WRAPPING) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_NO_WRAPPING; ?></option>
            </select>
          </td>
          <td style="width: 2%; overflow: hidden; padding-left: 10px;">
            <span id="show-css-button-<?php echo $block; ?>" class="checkbox-button dashicons dashicons-editor-kitchensink" title="<?php _e ('Toggle insertion and alignment icons', 'ad-inserter'); ?>"></span>
          </td>
        </tr>
      </tbody>
    </table>

    <div id="icons-css-code-<?php echo $block; ?>" style="margin: 4px 0 0; display: none;">
      <div id="automatic-insertion-<?php echo $block; ?>"></div>
      <div id="alignment-style-<?php echo $block; ?>" style="margin-bottom: 4px;"></div>

<?php if (function_exists ('ai_sticky_positions')) ai_sticky_positions ($block, $obj, $default); ?>

      <div class="max-input" style="min-height: 27px;">
        <span id="css-label-<?php echo $block; ?>" style="display: table-cell; width: 36px; padding: 0; height: 26px; vertical-align: middle; margin: 4px 0 0 0; font-size: 14px; font-weight: bold;">CSS</span>
        <input id="custom-css-<?php echo $block; ?>" style="width: 100%; display: none; font-family: monospace, Courier, 'Courier New'; font-weight: bold;" type="text" name="<?php echo AI_OPTION_CUSTOM_CSS, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_custom_css(); ?>" value="<?php echo $obj->get_custom_css(); ?>" maxlength="500" title="<?php _e ('Custom CSS code for the wrapping div', 'ad-inserter'); ?>" />
        <span style="display: table-cell; font-family: monospace, Courier, 'Courier New'; font-size: 12px; font-weight: bold; cursor: pointer; padding-left: 10px;">
          <span id="css-no-wrapping-<?php echo $block; ?>" class='css-code' style="height: 26px; padding-left: 0px; display: none;"></span>
          <span id="css-none-<?php echo $block; ?>" class='css-code-<?php echo $block; ?>' style="height: 18px; padding-left: 0px; display: none;" title="<?php _e ('CSS code for the wrapping div, click to edit', 'ad-inserter'); ?>"><?php echo $obj->alignment_style (AI_ALIGNMENT_DEFAULT); ?></span>
          <span id="css-left-<?php echo $block; ?>" class='css-code-<?php echo $block; ?>' style="height: 18px; padding-left: 0px; display: none;" title="<?php _e ('CSS code for the wrapping div, click to edit', 'ad-inserter'); ?>"><?php echo $obj->alignment_style (AI_ALIGNMENT_LEFT); ?></span>
          <span id="css-right-<?php echo $block; ?>" class='css-code-<?php echo $block; ?>' style="height: 18px; padding-left: 0px; display: none;" title="<?php _e ('CSS code for the wrapping div, click to edit', 'ad-inserter'); ?>"><?php echo $obj->alignment_style (AI_ALIGNMENT_RIGHT); ?></span>
          <span id="css-center-<?php echo $block; ?>" class='css-code-<?php echo $block; ?>' style="height: 18px; padding-left: 0px; display: none;" title="<?php _e ('CSS code for the wrapping div, click to edit', 'ad-inserter'); ?>"><?php echo $obj->alignment_style (AI_ALIGNMENT_CENTER); ?></span>
          <span id="css-float-left-<?php echo $block; ?>" class='css-code-<?php echo $block; ?>' style="height: 18px; padding-left: 0px; display: none;" title="<?php _e ('CSS code for the wrapping div, click to edit', 'ad-inserter'); ?>"><?php echo $obj->alignment_style (AI_ALIGNMENT_FLOAT_LEFT); ?></span>
          <span id="css-float-right-<?php echo $block; ?>" class='css-code-<?php echo $block; ?>' style="height: 18px; padding-right: 0px; display: none;" title="<?php _e ('CSS code for the wrapping div, click to edit', 'ad-inserter'); ?>"><?php echo $obj->alignment_style (AI_ALIGNMENT_FLOAT_RIGHT); ?></span>
<?php if (function_exists ('ai_style_css')) ai_style_css ($block, $obj); ?>
        </span>
        <span style="display:table-cell; width: 46px; padding-top: 1px;" ><button id="edit-css-button-<?php echo $block; ?>" type="button" class='ai-button' style="display: table-cell; margin: 0 0 0 8px;"><?php _e ('Edit', 'ad-inserter'); ?></button></span>
      </div>
    </div>
  </div>

<?php if (function_exists ('ai_sticky_animation')) ai_sticky_animation ($block, $obj, $default); ?>

  <div id="html-element-settings-<?php echo $block; ?>" class="rounded" style="<?php echo $html_settings ? "" : " display: none;" ?>">
    <div class="max-input" style="margin: 0 0 8px 0; height: 28px;">
      <span style="display: table-cell; width: 1px; white-space: nowrap;">
        <?php _e ('HTML element', 'ad-inserter'); ?>
        &nbsp;&nbsp;
      </span>
      <span style="display: table-cell; width: 20px; vertical-align: middle; padding: 0 2px 2px 0;">
        <button id="html-elements-button-<?php echo $block; ?>" type="button" class='ai-button ai-button-small' style="display: none; outline: transparent; float: right; margin-top: 1px; width: 15px; height: 15px;" title="<?php _e ('Open HTML element selector', 'ad-inserter'); ?>"></button>
      </span>
      <span style="display: table-cell;">
        <input
          type="text"
          id="html-elements-<?php echo $block; ?>"
          name="<?php echo AI_OPTION_HTML_SELECTOR, WP_FORM_FIELD_POSTFIX, $block; ?>"
          default="<?php echo $default->get_html_selector (); ?>"
          value="<?php echo $obj->get_html_selector (); ?>"
          title="<?php _e ('HTML element selector or comma separated list of selectors', 'ad-inserter'); ?> (.class, #id)"
          style="width: 100%;"
          maxlength="80" />
      </span>
      <span id="inside-element-<?php echo $block; ?>" style="display: table-cell; white-space: nowrap; width: 20%;<?php if ($automatic_insertion != AI_AUTOMATIC_INSERTION_INSIDE_HTML_ELEMENT) echo ' display: none;'; ?>">
        &nbsp;
        <?php _e ('Action', 'ad-inserter'); ?>
        <select style="margin: 0 0 2px 0;" name="<?php echo AI_OPTION_INSIDE_ELEMENT, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_inside_element (); ?>">
           <option value="<?php echo AI_HTML_PREPEND_CONTENT; ?>" <?php echo ($inside_element == AI_HTML_PREPEND_CONTENT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_PREPEND_CONTENT; ?></option>
           <option value="<?php echo AI_HTML_APPEND_CONTENT; ?>" <?php echo ($inside_element == AI_HTML_APPEND_CONTENT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_APPEND_CONTENT; ?></option>
           <option value="<?php echo AI_HTML_REPLACE_CONTENT; ?>" <?php echo ($inside_element == AI_HTML_REPLACE_CONTENT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_REPLACE_CONTENT; ?></option>
           <option value="<?php echo AI_HTML_REPLACE_ELEMENT; ?>" <?php echo ($inside_element == AI_HTML_REPLACE_ELEMENT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_REPLACE_ELEMENT; ?></option>
        </select>
      </span>
    </div>
    <div class="max-input" style="margin: 8px 0 0 0;">
      <span style="display: table-cell; width: 1px; white-space: nowrap;">
        <?php _e ('Insertion', 'ad-inserter'); ?>
        <select id="html-element-insertion-<?php echo $block; ?>" style="margin-bottom: 3px;" name="<?php echo AI_OPTION_HTML_ELEMENT_INSERTION, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_html_element_insertion (); ?>" title="<?php _e ('Client-side insertion uses JavaScript to insert block when the page loads. Server-side insertion inserts block when the page is generated but needs Output buffering enabled.', 'ad-inserter'); ?>">
           <option value="<?php echo AI_HTML_INSERTION_CLIENT_SIDE; ?>" <?php echo ($html_element_insertion == AI_HTML_INSERTION_CLIENT_SIDE) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_CLIENT_SIDE; ?></option>
<?php if (defined ('AI_BUFFERING') && get_output_buffering ()) : ?>
           <option value="<?php echo AI_HTML_INSERTION_SEREVR_SIDE; ?>" <?php echo ($html_element_insertion == AI_HTML_INSERTION_SEREVR_SIDE) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_SERVER_SIDE; ?></option>
<?php endif; ?>
        </select>
      </span>

      <span id="server-side-insertion-<?php echo $block; ?>" style="display: table-cell;<?php if ($html_element_insertion == AI_HTML_INSERTION_SEREVR_SIDE) echo ' display: none;'; ?>">
        <span style="display: table-cell; white-space: nowrap; width: 5%; padding-left: 10px;">
          <?php _e ('Wait for', 'ad-inserter'); ?>
        </span>
        <span style="display: table-cell; white-space: nowrap; width: 5%; vertical-align: middle;">
          <button id="wait-for-button-<?php echo $block; ?>" type="button" class='ai-button ai-button-small' style="display: none; outline: transparent; float: right; margin-top: 1px; width: 15px; height: 15px;" title="<?php _e ('Open HTML element selector', 'ad-inserter'); ?>"></button>
        </span>
        <span style="display: table-cell; white-space: nowrap; width: 50%;">
          <input
            type="text"
            id="wait-for-<?php echo $block; ?>"
            name="<?php echo AI_OPTION_WAIT_FOR, WP_FORM_FIELD_POSTFIX, $block; ?>"
            default="<?php echo $default->get_wait_for (); ?>"
            value="<?php echo $obj->get_wait_for (); ?>"
            title="<?php _e ('Wait for HTML element to be loaded', 'ad-inserter'); ?> (.class, #id)"
            style="width: 100%;"
            maxlength="40" />
        </span>

        <span style="display: table-cell; white-space: nowrap; width: 20%; padding-left: 10px;">
        <?php _e ('Delay', 'ad-inserter'); ?>
        <input type="text" name="<?php echo AI_OPTION_WAIT_FOR_DELAY, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_wait_for_delay (); ?>" value="<?php echo $obj->get_wait_for_delay (); ?>" title="<?php _e ('Time in ms to delay insertion', 'ad-inserter'); ?>" size="3" maxlength="5" />
        ms
        </span>

        <span style="display: table-cell; white-space: nowrap; width: 20%; padding-left: 10px;">
        <?php _e ('Code position', 'ad-inserter'); ?>
        <select style="max-width: 140px; margin-bottom: 3px;" name="<?php echo AI_OPTION_SERVER_SIDE_INSERTION, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_server_side_insertion (); ?>" title="<?php _e ('Page position where the code for client-side insertion will be inserted.', 'ad-inserter'); ?>">
           <option value="<?php echo AI_AUTOMATIC_INSERTION_BEFORE_POST; ?>" <?php echo ($server_side_insertion == AI_AUTOMATIC_INSERTION_BEFORE_POST) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_BEFORE_POST; ?></option>
           <option value="<?php echo AI_AUTOMATIC_INSERTION_AFTER_POST; ?>" <?php echo ($server_side_insertion == AI_AUTOMATIC_INSERTION_AFTER_POST) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_AFTER_POST; ?></option>
           <option value="<?php echo AI_AUTOMATIC_INSERTION_FOOTER; ?>" <?php echo ($server_side_insertion == AI_AUTOMATIC_INSERTION_FOOTER) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_FOOTER; ?></option>
<?php foreach ($ai_custom_hooks as $hook_index => $custom_hook) { ?>
           <option value="<?php echo AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + $custom_hook ['index'] - 1; ?>" <?php echo ($server_side_insertion == AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + $custom_hook ['index'] - 1) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo $custom_hook ['name']; ?></option>
<?php } ?>
        </select>
        </span>

        <span style="clear: both;"></span>
      </span>
    </div>
  </div>

  <div id="paragraph-counting-<?php echo $block; ?>" class="rounded" style="<?php echo $paragraph_counting ? "" : "display: none;" ?>">
    <div class="max-input" style="margin: 0 0 8px 0;">
      <span style="display: table-cell; width: 1px; white-space: nowrap;">
        <?php _e ('Count', 'ad-inserter'); ?>
        &nbsp;
        <select name="<?php echo AI_OPTION_DIRECTION_TYPE, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_direction_type(); ?>">
          <option value="<?php echo AI_DIRECTION_FROM_TOP; ?>" <?php echo ($obj->get_direction_type()==AI_DIRECTION_FROM_TOP) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DIRECTION_FROM_TOP; ?></option>
          <option value="<?php echo AI_DIRECTION_FROM_BOTTOM; ?>" <?php echo ($obj->get_direction_type()==AI_DIRECTION_FROM_BOTTOM) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DIRECTION_FROM_BOTTOM; ?></option>
        </select>
        <?php _e ('paragraphs with tags', 'ad-inserter'); ?>
        &nbsp;
      </span>
      <span style="display: table-cell;">
        <input
          style="width: 100%;"
          title="<?php _e ("Comma separated HTML tag names, usually only 'p' tags are used", 'ad-inserter'); ?>"
          type="text" name="<?php echo AI_OPTION_PARAGRAPH_TAGS, WP_FORM_FIELD_POSTFIX, $block; ?>"
          default="<?php echo $default->get_paragraph_tags(); ?>"
          value="<?php echo $obj->get_paragraph_tags(); ?>"
          size="12"
          maxlength="500"/>
      </span>
      <span style="display: table-cell; width: 1px; white-space: nowrap;">
      &nbsp;
      <?php _e ('that have between', 'ad-inserter'); ?>
      <input
        type="text"
        name="<?php echo AI_OPTION_MIN_PARAGRAPH_WORDS, WP_FORM_FIELD_POSTFIX, $block; ?>"
        default="<?php echo $default->get_minimum_paragraph_words(); ?>"
        value="<?php echo $obj->get_minimum_paragraph_words(); ?>"
        title="<?php _e ('Minimum number of paragraph words, leave empty for no limit', 'ad-inserter'); ?>"
        size="4"
        maxlength="5" />
      <?php _e ('and', 'ad-inserter'); ?>
      <input
        type="text"
        name="<?php echo AI_OPTION_MAX_PARAGRAPH_WORDS, WP_FORM_FIELD_POSTFIX, $block; ?>"
        default="<?php echo $default->get_maximum_paragraph_words(); ?>"
        value="<?php echo $obj->get_maximum_paragraph_words(); ?>"
        title="<?php _e ('Maximum number of paragraph words, leave empty for no limit', 'ad-inserter'); ?>"
        size="4"
        maxlength="5" />
      <?php _e ('words', 'ad-inserter'); ?>
      </span>
    </div>

    <div class="max-input" style="margin: 8px 0 8px 0;">
      <span style="display: table-cell; width: 1px; white-space: nowrap;">
      <?php _e ('and', 'ad-inserter'); ?>
        <select style="margin-bottom: 3px;" name="<?php echo AI_OPTION_PARAGRAPH_TEXT_TYPE, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_paragraph_text_type(); ?>">
          <option value="<?php echo AI_CONTAIN; ?>" <?php echo ($obj->get_paragraph_text_type() == AI_CONTAIN) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_CONTAIN; ?></option>
          <option value="<?php echo AI_DO_NOT_CONTAIN; ?>" <?php echo ($obj->get_paragraph_text_type() == AI_DO_NOT_CONTAIN) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DO_NOT_CONTAIN; ?></option>
        </select>
      </span>
      <span style="display: table-cell;">
      <input
        style="width: 100%;"
        title="<?php _e ('Comma separated texts', 'ad-inserter'); ?>"
        type="text"
        name="<?php echo AI_OPTION_PARAGRAPH_TEXT, WP_FORM_FIELD_POSTFIX, $block; ?>"
        default="<?php echo $default->get_paragraph_text(); ?>"
        value="<?php echo $obj->get_paragraph_text(); ?>"
        maxlength="500" />
      </span>
    </div>

    <hr style="margin: 0 -8px;" />

    <div class="max-input" style="margin: 8px 0 0 0;">
      <span style="display: table-cell; width: 1px; white-space: nowrap;">
        <select style="margin-bottom: 3px;" name="<?php echo AI_OPTION_COUNT_INSIDE, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_count_inside (); ?>">
          <option value="<?php echo AI_DO_NOT_COUNT; ?>" <?php echo ($obj->get_count_inside () == AI_DO_NOT_COUNT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DO_NOT_COUNT; ?></option>
          <option value="<?php echo AI_COUNT_ONLY; ?>" <?php echo ($obj->get_count_inside () == AI_COUNT_ONLY) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_COUNT_ONLY; ?></option>
        </select>
      </span>
      <span style="display: table-cell; width: 1px; white-space: nowrap; padding: 0 4px">
      <?php /* translators: inside [HTML tags] elements that contain */ _e ('inside', 'ad-inserter'); ?>
      </span>

      <span style="display: table-cell;">
        <input
          style="width: 100%;"
          title="<?php _e ("Comma separated HTML tag names of container elements", 'ad-inserter'); ?>"
          type="text" name="<?php echo AI_OPTION_COUNT_INSIDE_ELEMENTS, WP_FORM_FIELD_POSTFIX, $block; ?>"
          default="<?php echo $default->get_count_inside_elements (); ?>"
          value="<?php echo $obj->get_count_inside_elements (); ?>"
          size="4"
          maxlength="500"/>
      </span>

      <span style="display: table-cell; width: 1px; white-space: nowrap; padding: 0 4px">
      <?php /* translators: inside [HTML tags] elements that contain */ _e ('elements that', 'ad-inserter'); ?>
      </span>

      <span style="display: table-cell; width: 1px; white-space: nowrap;">
        <select style="margin-bottom: 3px;" name="<?php echo AI_OPTION_COUNT_INSIDE_ELEMENTS_CONTAIN, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_count_inside_elements_contain (); ?>">
          <option value="<?php echo AI_CONTAIN; ?>" <?php echo ($obj->get_count_inside_elements_contain () == AI_CONTAIN) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_CONTAIN; ?></option>
          <option value="<?php echo AI_DO_NOT_CONTAIN; ?>" <?php echo ($obj->get_count_inside_elements_contain () == AI_DO_NOT_CONTAIN) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DO_NOT_CONTAIN; ?></option>
        </select>
      </span>

      <span class="small-input-tags" style="display: table-cell;">
      <input
        style="width: 100%;"
        title="<?php _e ('Comma separated texts', 'ad-inserter'); ?>"
        type="text"
        name="<?php echo AI_OPTION_COUNT_INSIDE_ELEMENTS_TEXT, WP_FORM_FIELD_POSTFIX, $block; ?>"
        default="<?php echo $default->get_count_inside_elements_text (); ?>"
        value="<?php echo $obj->get_count_inside_elements_text (); ?>"
        maxlength="500" />
      </span>
    </div>

<?php
  $title = __('Count also paragraphs inside these elements - defined on general plugin settings page - tab [*] / tab General', 'ad-inserter');
  $elements = get_no_paragraph_counting_inside ();
?>

    <div class="max-input" style="margin: 8px 0 8px 0;">
      <span style="display: table-cell; width: 80%; white-space: nowrap; padding-right: 8px;">
        <input type="hidden" name="<?php echo AI_OPTION_CHECK_ONLY_TAG_ATTRIBUTES, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
        <input id="check-only-tag-attr-<?php echo $block; ?>" type="checkbox" name="<?php echo AI_OPTION_CHECK_ONLY_TAG_ATTRIBUTES, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" title="<?php _e('If checked it will search for the text only in tag attributes like [[id]], [[class]], [[style]], etc. Otherwise the whole tag including its content will be searched.', 'ad-inserter'); ?>" default="<?php echo $default->get_check_only_tag_attributes (); ?>" <?php if ($obj->get_check_only_tag_attributes ()==AI_ENABLED) echo 'checked '; ?> />
        <label for="check-only-tag-attr-<?php echo $block; ?>" style="vertical-align: top;" title="<?php _e('If checked it will search for the text only in tag attributes like [[id]], [[class]], [[style]], etc. Otherwise the whole tag including its content will be searched.', 'ad-inserter'); ?>"><?php _e('Check only tag attributes', 'ad-inserter'); ?></label>
      </span>
      <span style="display: <?php echo $elements == '' ? 'none' : 'table-cell'; ?>; width: 1px; white-space: nowrap;">
        <input type="hidden" name="<?php echo AI_OPTION_COUNT_INSIDE_BLOCKQUOTE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
        <input id="ignore_blockquote-<?php echo $block; ?>" type="checkbox" name="<?php echo AI_OPTION_COUNT_INSIDE_BLOCKQUOTE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" title="<?php echo $title; ?>" default="<?php echo $default->get_count_inside_blockquote(); ?>" <?php if ($obj->get_count_inside_blockquote()==AI_ENABLED) echo 'checked '; ?> />
        <label for="ignore_blockquote-<?php echo $block; ?>" style="vertical-align: top;" title="<?php echo $title; ?>"><?php /* Translators: %s: HTML tags */ echo sprintf (__('Count inside %s elements', 'ad-inserter'), '<strong><pre style="display: inline;"> '.$elements.' </pre></strong>'); ?></label>
      </span>
    </div>

    <hr style="margin: 0 -8px;" />

    <div class="max-input" style="margin: 8px 0 8px 0;">
      <span style="display: table-cell; width: 1px; white-space: nowrap;">
        <?php /* Translators: Do not insert for first X and last Y paragraphs */ echo _n ('Do not insert for first', 'Do not insert for first', (int) $obj->get_skip_first_paragraphs(),'ad-inserter'); ?>
        <input
        type="text"
        name="<?php echo AI_OPTION_SKIP_FIRST_PARAGRAPHS, WP_FORM_FIELD_POSTFIX, $block; ?>"
        default="<?php echo $default->get_skip_first_paragraphs(); ?>"
        value="<?php echo $obj->get_skip_first_paragraphs() ?>"
        title="<?php _e ('Excludes first paragraphs from insertion, leave empty for no exclusion of first paragraphs', 'ad-inserter'); ?>"
        size="2"
        maxlength="3" />
        <?php /* Translators: Do not insert for first X and last Y paragraphs */ echo _n ('and last', 'and last', (int) $obj->get_skip_last_paragraphs(),'ad-inserter'); ?>
        <input
        type="text"
        name="<?php echo AI_OPTION_SKIP_LAST_PARAGRAPHS, WP_FORM_FIELD_POSTFIX, $block; ?>"
        default="<?php echo $default->get_skip_last_paragraphs(); ?>"
        value="<?php echo $obj->get_skip_last_paragraphs() ?>"
        title="<?php _e ('Excludes last paragraphs from insertion, leave empty for no exclusion of last paragraphs', 'ad-inserter'); ?>"
        size="2"
        maxlength="3" />
        <?php /* Translators: Do not insert for first X and last Y paragraphs */ echo _n ('paragraph', 'paragraphs', (int) $obj->get_skip_last_paragraphs(), 'ad-inserter'); ?>
      </span>
    </div>

    <hr style="margin: 0 -8px;" />

    <div class="max-input" style="margin: 8px 0 8px 0;">
      <span style="display: table-cell; width: 1px; white-space: nowrap;">
        <?php _e ('Post/Static page must have between', 'ad-inserter'); ?>
        <input
        type="text"
        name="<?php echo AI_OPTION_MIN_PARAGRAPHS, WP_FORM_FIELD_POSTFIX, $block; ?>"
        default="<?php echo $default->get_paragraph_number_minimum(); ?>"
        value="<?php echo $obj->get_paragraph_number_minimum() ?>"
        title="<?php _e ('Minimum number of paragraphs, leave empty for no limit', 'ad-inserter'); ?>"
        size="2"
        maxlength="3" />
        <?php _e ('and', 'ad-inserter'); ?>
        <input
        type="text"
        name="<?php echo AI_OPTION_MAX_PARAGRAPHS, WP_FORM_FIELD_POSTFIX, $block; ?>"
        default="<?php echo $default->get_paragraph_number_maximum(); ?>"
        value="<?php echo $obj->get_paragraph_number_maximum() ?>"
        title="<?php _e ('Maximum number of paragraphs, leave empty for no limit', 'ad-inserter'); ?>"
        size="2"
        maxlength="3" />
        <?php /* Translators: Post/Static page must have between X and Y paragraphs */ echo _n ('paragraph', 'paragraphs', (int) $obj->get_paragraph_number_maximum(), 'ad-inserter'); ?>
      </span>
    </div>

    <hr style="margin: 0 -8px;" />

    <div class="max-input" style="margin: 8px 0 0 0;">
      <span style="display: table-cell; width: 1px; white-space: nowrap;">
        <?php _e ('Minimum number of words in paragraphs above', 'ad-inserter'); ?>
        <input
        type="text"
        name="<?php echo AI_OPTION_MIN_WORDS_ABOVE, WP_FORM_FIELD_POSTFIX, $block; ?>"
        default="<?php echo $default->get_minimum_words_above(); ?>"
        value="<?php echo $obj->get_minimum_words_above() ?>"
        title="<?php _e ('Used only with automatic insertion After paragraph and empty paragraph numbers', 'ad-inserter'); ?>"
        size="2"
        maxlength="4" />
      </span>
    </div>
  </div>

  <div id="paragraph-clearance-<?php echo $block; ?>" class="rounded" style="<?php echo $paragraph_clearance ? "" : "display: none;" ?>">
    <div class="max-input" style="margin: 0 0 8px 0">
      <span style="display: table-cell; width: 1px; white-space: nowrap;">
        <?php _e ('In', 'ad-inserter'); ?>
        <input
        type="text"
        name="<?php echo AI_OPTION_AVOID_PARAGRAPHS_ABOVE, WP_FORM_FIELD_POSTFIX, $block; ?>"
        default="<?php echo $default->get_avoid_paragraphs_above(); ?>"
        value="<?php echo $obj->get_avoid_paragraphs_above(); ?>"
        title="<?php _e ('Number of paragraphs above to check, leave empty to disable checking', 'ad-inserter'); ?>"
        size="2"
        maxlength="3" />
        <?php _e ('paragraphs above avoid', 'ad-inserter'); ?>
        &nbsp;
      </span>
      <span style="display: table-cell;">
        <input
          style="width: 100%;"
          title="<?php _e ('Comma separated texts', 'ad-inserter'); ?>"
          type="text"
          name="<?php echo AI_OPTION_AVOID_TEXT_ABOVE, WP_FORM_FIELD_POSTFIX, $block; ?>"
          default="<?php echo $default->get_avoid_text_above(); ?>"
          value="<?php echo $obj->get_avoid_text_above(); ?>"
          maxlength="500" />
      </span>
    </div>

    <div class="max-input" style="margin: 8px 0">
      <span style="display: table-cell; width: 1px; white-space: nowrap;">
        <?php _e ('In', 'ad-inserter'); ?>
        <input
        type="text"
        name="<?php echo AI_OPTION_AVOID_PARAGRAPHS_BELOW, WP_FORM_FIELD_POSTFIX, $block; ?>"
        default="<?php echo $default->get_avoid_paragraphs_below(); ?>"
        value="<?php echo $obj->get_avoid_paragraphs_below(); ?>"
        title="<?php _e ('Number of paragraphs below to check, leave empty to disable checking', 'ad-inserter'); ?>"
        size="2"
        maxlength="3" />
        <?php _e ('paragraphs below avoid', 'ad-inserter'); ?>
        &nbsp;
      </span>
      <span style="display: table-cell;">
        <input
          style="width: 100%;"
          title="<?php _e ('Comma separated texts', 'ad-inserter'); ?>"
          type="text"
          name="<?php echo AI_OPTION_AVOID_TEXT_BELOW, WP_FORM_FIELD_POSTFIX, $block; ?>"
          default="<?php echo $default->get_avoid_text_below(); ?>"
          value="<?php echo $obj->get_avoid_text_below(); ?>"
          maxlength="500" />
      </span>
    </div>

    <div style="margin: 8px 0 0 0;">
      <?php _e ('If text is found', 'ad-inserter'); ?>
      <select  id="avoid-action-<?php echo $block; ?>" style="margin-bottom: 3px;" name="<?php echo AI_OPTION_AVOID_ACTION, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_avoid_action(); ?>">
        <option value="<?php echo AI_DO_NOT_INSERT; ?>" <?php echo ($obj->get_avoid_action() == AI_DO_NOT_INSERT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DO_NOT_INSERT; ?></option>
        <option value="<?php echo AI_TRY_TO_SHIFT_POSITION; ?>" <?php echo ($obj->get_avoid_action() == AI_TRY_TO_SHIFT_POSITION) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_TRY_TO_SHIFT_POSITION; ?></option>
      </select>
      <span id="check-up-to-<?php echo $block; ?>">
        &mdash;
        <?php _e ('check up to', 'ad-inserter'); ?>
        <input
        type="text"
        name="<?php echo AI_OPTION_AVOID_TRY_LIMIT, WP_FORM_FIELD_POSTFIX, $block; ?>"
        default="<?php echo $default->get_avoid_try_limit(); ?>"
        value="<?php echo $obj->get_avoid_try_limit(); ?>"
        size="2"
        maxlength="3" />
        <?php _ex ('paragraphs', 'check up to', 'ad-inserter'); ?>
        <select style="margin-bottom: 3px;" name="<?php echo AI_OPTION_AVOID_DIRECTION, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_avoid_direction(); ?>">
          <option value="<?php echo AI_ABOVE; ?>" <?php echo ($obj->get_avoid_direction() == AI_ABOVE) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_ABOVE; ?></option>
          <option value="<?php echo AI_BELOW; ?>" <?php echo ($obj->get_avoid_direction() == AI_BELOW) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_BELOW; ?></option>
          <option value="<?php echo AI_ABOVE_AND_THEN_BELOW; ?>" <?php echo ($obj->get_avoid_direction() == AI_ABOVE_AND_THEN_BELOW) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_ABOVE_AND_THEN_BELOW; ?></option>
          <option value="<?php echo AI_BELOW_AND_THEN_ABOVE; ?>" <?php echo ($obj->get_avoid_direction() == AI_BELOW_AND_THEN_ABOVE) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_BELOW_AND_THEN_ABOVE; ?></option>
        </select>
      </span>
    </div>
  </div>

  <div class="responsive-table rounded" id="list-settings-<?php echo $block; ?>" style="<?php if (!$show_lists) echo ' display: none;'; ?>">
    <table class="ai-lists" style="border-spacing: 0;">
      <tbody>
        <tr class="<?php if ($show_cat_list) echo 'list-items'; ?>" style="<?php if (!$show_cat_list) echo ' display: none;'; ?>">
          <td>
            <?php _e ('Categories', 'ad-inserter'); ?>
          </td>
          <td>
            <button id="category-button-<?php echo $block; ?>" type="button" class='ai-button ai-button-small' title="<?php _e ('Toggle category editor', 'ad-inserter'); ?>"></button>
          </td>
          <td style="padding-right: 7px; width: 92%;">
            <input id="category-list-<?php echo $block; ?>" class="ai-list-lowercase ai-list-filter-cat ai-list-custom" style="width: 100%;" title="<?php _e ('Comma separated category slugs', 'ad-inserter'); ?>" type="text" name="<?php echo AI_OPTION_CATEGORY_LIST, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_ad_block_cat(); ?>" value="<?php echo $cat_list; ?>" size="54" maxlength="1500" />
          </td>
          <td>
            <input type="hidden"   name="<?php echo AI_OPTION_CATEGORY_LIST_TYPE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
            <input type="checkbox" name="<?php echo AI_OPTION_CATEGORY_LIST_TYPE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo AI_BLACK_LIST; ?>" id="category-list-input-<?php echo $block; ?>" <?php if ($obj->get_ad_block_cat_type() == AI_WHITE_LIST) echo 'checked '; ?> style="display: none;" />
            <span class="checkbox-button checkbox-list-button dashicons dashicons-<?php echo $obj->get_ad_block_cat_type() == AI_BLACK_LIST ? 'no' : 'yes'; ?>" title="<?php _e ('Click to select black or white list', 'ad-inserter'); ?>"></span>
          </td>
        </tr>
        <tr class="<?php if ($show_cat_list) echo 'list-items'; ?>" style="<?php if (!$show_cat_list) echo ' display: none;'; ?>">
          <td colspan="5">
            <select id="category-select-<?php echo $block; ?>" multiple="multiple" style="display: none;">
            </select>
          </td>
        </tr>

        <tr class="<?php if ($show_tag_list) echo 'list-items'; ?>" style="<?php if (!$show_tag_list) echo ' display: none;'; ?>">
          <td>
            <?php _e ('Tags', 'ad-inserter'); ?>
          </td>
          <td>
            <button id="tag-button-<?php echo $block; ?>" type="button" class='ai-button ai-button-small' title="<?php _e ('Toggle tag editor', 'ad-inserter'); ?>"></button>
          </td>
          <td style="padding-right: 7px; width: 92%;">
            <input id="tag-list-<?php echo $block; ?>" class="ai-list-lowercase ai-list-filter ai-list-custom" style="width: 100%;" title="<?php _e ('Comma separated tag slugs', 'ad-inserter'); ?>" type="text" name="<?php echo AI_OPTION_TAG_LIST, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_ad_block_tag(); ?>" value="<?php echo $tag_list; ?>" size="54" maxlength="1500"/>
          </td>
          <td>
            <input type="hidden"   name="<?php echo AI_OPTION_TAG_LIST_TYPE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
            <input type="checkbox" name="<?php echo AI_OPTION_TAG_LIST_TYPE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo AI_BLACK_LIST; ?>" id="tag-list-input-<?php echo $block; ?>" <?php if ($obj->get_ad_block_tag_type() == AI_WHITE_LIST) echo 'checked '; ?> style="display: none;" />
            <span class="checkbox-button checkbox-list-button dashicons dashicons-<?php echo $obj->get_ad_block_tag_type() == AI_BLACK_LIST ? 'no' : 'yes'; ?>" title="<?php _e ('Click to select black or white list', 'ad-inserter'); ?>"></span>
          </td>
        </tr>
        <tr class="<?php if ($show_tag_list) echo 'list-items'; ?>" style="<?php if (!$show_tag_list) echo ' display: none;'; ?>">
          <td colspan="5">
            <select id="tag-select-<?php echo $block; ?>" multiple="multiple" style="display: none;">
            </select>
          </td>
        </tr>

        <tr class="<?php if ($show_taxonomy_list) echo 'list-items'; ?>" style="<?php if (!$show_taxonomy_list) echo ' display: none;'; ?>">
          <td>
            <?php _e ('Taxonomies', 'ad-inserter'); ?>
          </td>
          <td>
            <button id="taxonomy-button-<?php echo $block; ?>" type="button" class='ai-button ai-button-small' title="<?php _e ('Toggle taxonomy editor', 'ad-inserter'); ?>"></button>
          </td>
          <td style="padding-right: 7px; width: 92%;">
            <input id="taxonomy-list-<?php echo $block; ?>" class="ai-list-lowercase ai-list-custom" style="width: 100%;" title="<?php _e ('Comma separated slugs: taxonomy, term or taxonomy:term', 'ad-inserter'); ?>" type="text" name="<?php echo AI_OPTION_TAXONOMY_LIST, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_ad_block_taxonomy(); ?>" value="<?php echo $taxonomy_list; ?>" size="54" maxlength="500" />
          </td>
          <td>
            <input type="hidden"   name="<?php echo AI_OPTION_TAXONOMY_LIST_TYPE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
            <input type="checkbox" name="<?php echo AI_OPTION_TAXONOMY_LIST_TYPE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo AI_BLACK_LIST; ?>" id="taxonomy-list-input-<?php echo $block; ?>" <?php if ($obj->get_ad_block_taxonomy_type() == AI_WHITE_LIST) echo 'checked '; ?> style="display: none;" />
            <span class="checkbox-button checkbox-list-button dashicons dashicons-<?php echo $obj->get_ad_block_taxonomy_type() == AI_BLACK_LIST ? 'no' : 'yes'; ?>" title="<?php _e ('Click to select black or white list', 'ad-inserter'); ?>"></span>
          </td>
        </tr>
        <tr class="<?php if ($show_taxonomy_list) echo 'list-items'; ?>" style="<?php if (!$show_taxonomy_list) echo ' display: none;'; ?>">
          <td colspan="5">
            <select id="taxonomy-select-<?php echo $block; ?>" multiple="multiple" style="display: none;">
            </select>
          </td>
        </tr>

        <tr class="<?php if ($show_id_list) echo 'list-items'; ?>" style="<?php if (!$show_id_list) echo ' display: none;'; ?>">
          <td>
            <?php _e ('Post IDs', 'ad-inserter'); ?>
          </td>
          <td>
            <button id="id-button-<?php echo $block; ?>" type="button" class='ai-button ai-button-small' title="<?php _e ('Toggle post/page ID editor', 'ad-inserter'); ?>"></button>
          </td>
          <td style="padding-right: 7px; width: 92%;">
            <input id="id-list-<?php echo $block; ?>" class="ai-list-lowercase ai-list-custom" style="width: 100%;" title="<?php _e ('Comma separated post/page IDs', 'ad-inserter'); ?>" type="text" name="<?php echo AI_OPTION_ID_LIST, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_id_list(); ?>" value="<?php echo $id_list; ?>" size="54" maxlength="2500"/>
          </td>
          <td>
            <input type="hidden"   name="<?php echo AI_OPTION_ID_LIST_TYPE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
            <input type="checkbox" name="<?php echo AI_OPTION_ID_LIST_TYPE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo AI_BLACK_LIST; ?>" id="id-list-input-<?php echo $block; ?>" <?php if ($obj->get_id_list_type() == AI_WHITE_LIST) echo 'checked '; ?> style="display: none;" />
            <span class="checkbox-button checkbox-list-button dashicons dashicons-<?php echo $obj->get_id_list_type() == AI_BLACK_LIST ? 'no' : 'yes'; ?>" title="<?php _e ('Click to select black or white list', 'ad-inserter'); ?>"></span>
          </td>
        </tr>
        <tr class="<?php if ($show_id_list) echo 'list-items'; ?>" style="<?php if (!$show_id_list) echo ' display: none;'; ?>">
          <td colspan="5">
            <select id="id-select-<?php echo $block; ?>" multiple="multiple" style="display: none;">
            </select>
          </td>
        </tr>

        <tr class="<?php if ($show_url_list) echo 'list-items'; ?>" style="<?php if (!$show_url_list) echo ' display: none;'; ?>">
          <td>
            <?php _e ('Urls', 'ad-inserter'); ?>
          </td>
          <td>
            <button id="url-button-<?php echo $block; ?>" type="button" class='ai-button ai-button-small' title="<?php _e ('Toggle url editor', 'ad-inserter'); ?>"></button>
          </td>
          <td style="padding-right: 7px; width: 92%;">
            <input id="url-list-<?php echo $block; ?>" class="ai-list-space ai-clean-protocol ai-clean-domain" style="width: 100%;" type="text" name="<?php echo AI_OPTION_URL_LIST, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_ad_url_list(); ?>" value="<?php echo $url_list; ?>" size="54" maxlength="2500" title="<?php _e ('Comma separated urls (page addresses) starting with / after domain name (e.g. /permalink-url, use only when you need to taget a specific url not accessible by other means). You can also use partial urls with * (/url-start*. *url-pattern*, *url-end)', 'ad-inserter'); ?>" />
          </td>
          <td>
            <input type="hidden"   name="<?php echo AI_OPTION_URL_LIST_TYPE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
            <input type="checkbox" name="<?php echo AI_OPTION_URL_LIST_TYPE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo AI_BLACK_LIST; ?>" id="url-list-input-<?php echo $block; ?>" <?php if ($obj->get_ad_url_list_type() == AI_WHITE_LIST) echo 'checked '; ?> style="display: none;" />
            <span class="checkbox-button checkbox-list-button dashicons dashicons-<?php echo $obj->get_ad_url_list_type() == AI_BLACK_LIST ? 'no' : 'yes'; ?>" title="<?php _e ('Click to select black or white list', 'ad-inserter'); ?>"></span>
          </td>
        </tr>
        <tr class="<?php if ($show_url_list) echo 'list-items'; ?>" style="<?php if (!$show_url_list) echo ' display: none;'; ?>">
          <td colspan="5">
            <textarea id="url-editor-<?php echo $block; ?>" style="width: 100%; height: 220px; font-family: monospace, Courier, 'Courier New'; font-weight: bold; display: none;"></textarea>
          </td>
        </tr>

        <tr class="<?php if ($show_url_parameter_list) echo 'list-items'; ?>" style="<?php if (!$show_url_parameter_list) echo ' display: none;'; ?>">
          <td>
            <?php _e ('Url parameters', 'ad-inserter'); ?>
            &nbsp;
          </td>
          <td>
            <button id="url-parameter-button-<?php echo $block; ?>" type="button" class='ai-button ai-button-small' title="<?php _e ('Toggle url parameter and cookie editor', 'ad-inserter'); ?>"></button>
          </td>
          <td style="padding-right: 7px; width: 92%;">
            <input id="url-parameter-list-<?php echo $block; ?>" style="width: 100%;" title="<?php _e ("Comma separated url query parameters or cookies with optional values (use 'parameter', 'parameter=value', 'cookie' or 'cookie=value')", 'ad-inserter'); ?>" type="text" name="<?php echo AI_OPTION_URL_PARAMETER_LIST, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_url_parameter_list(); ?>" value="<?php echo $url_parameter_list; ?>" size="54" maxlength="1500"/>
          </td>
          <td>
            <input type="hidden"   name="<?php echo AI_OPTION_URL_PARAMETER_LIST_TYPE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
            <input type="checkbox" name="<?php echo AI_OPTION_URL_PARAMETER_LIST_TYPE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo AI_BLACK_LIST; ?>" id="url-parameter-list-input-<?php echo $block; ?>" <?php if ($obj->get_url_parameter_list_type() == AI_WHITE_LIST) echo 'checked '; ?> style="display: none;" />
            <span class="checkbox-button checkbox-list-button dashicons dashicons-<?php echo $obj->get_url_parameter_list_type() == AI_BLACK_LIST ? 'no' : 'yes'; ?>" title="<?php _e ('Click to select black or white list', 'ad-inserter'); ?>"></span>
          </td>
        </tr>
        <tr class="<?php if ($show_url_parameter_list) echo 'list-items'; ?>" style="<?php if (!$show_url_parameter_list) echo ' display: none;'; ?>">
          <td colspan="5">
            <textarea id="url-parameter-editor-<?php echo $block; ?>" style="width: 100%; height: 220px; font-family: monospace, Courier, 'Courier New'; font-weight: bold; display: none;"></textarea>
          </td>
        </tr>

        <tr class="<?php if ($show_cookie_list) echo 'list-items'; ?>" style="<?php if (!$show_cookie_list) echo ' display: none;'; ?>">
          <td>
            <?php _e ('Cookies', 'ad-inserter'); ?>
            &nbsp;
          </td>
          <td>
            <button id="cookie-button-<?php echo $block; ?>" type="button" class='ai-button ai-button-small' title="<?php _e ('Toggle cookie editor', 'ad-inserter'); ?>"></button>
          </td>
          <td style="padding-right: 7px; width: 92%;">
            <input id="cookie-list-<?php echo $block; ?>" style="width: 100%;" title="<?php _e ("Comma separated cookies with optional values (use 'cookie' or 'cookie=value')", 'ad-inserter'); ?>" type="text" name="<?php echo AI_OPTION_COOKIE_LIST, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_cookie_list(); ?>" value="<?php echo $cookie_list; ?>" size="54" maxlength="1500"/>
          </td>
          <td>
            <input type="hidden"   name="<?php echo AI_OPTION_COOKIE_LIST_TYPE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
            <input type="checkbox" name="<?php echo AI_OPTION_COOKIE_LIST_TYPE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo AI_BLACK_LIST; ?>" id="cookie-list-input-<?php echo $block; ?>" <?php if ($obj->get_cookie_list_type() == AI_WHITE_LIST) echo 'checked '; ?> style="display: none;" />
            <span class="checkbox-button checkbox-list-button dashicons dashicons-<?php echo $obj->get_cookie_list_type() == AI_BLACK_LIST ? 'no' : 'yes'; ?>" title="<?php _e ('Click to select black or white list', 'ad-inserter'); ?>"></span>
          </td>
        </tr>
        <tr class="<?php if ($show_cookie_list) echo 'list-items'; ?>" style="<?php if (!$show_cookie_list) echo ' display: none;'; ?>">
          <td colspan="5">
            <textarea id="cookie-editor-<?php echo $block; ?>" style="width: 100%; height: 220px; font-family: monospace, Courier, 'Courier New'; font-weight: bold; display: none;"></textarea>
          </td>
        </tr>

        <tr class="<?php if ($show_domain_list) echo 'list-items'; ?>" style="<?php if (!$show_domain_list) echo ' display: none;'; ?>">
          <td>
            <?php _e ('Referrers', 'ad-inserter'); ?>
          </td>
          <td>
            <button id="referer-button-<?php echo $block; ?>" type="button" class='ai-button ai-button-small' title="<?php _e ('Toggle referrer editor', 'ad-inserter'); ?>"></button>
          </td>
          <td style="padding-right: 7px; width: 92%;">
            <input id="referer-list-<?php echo $block; ?>" class="ai-clean-protocol ai-only-domain ai-list-sort" style="width: 100%;" title="<?php _e ('Comma separated domains, use # for no referrer, you can also use partial domains with * (domain-start*. *domain-pattern*, *domain-end)', 'ad-inserter'); ?>" type="text" name="<?php echo AI_OPTION_DOMAIN_LIST, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_ad_domain_list(); ?>" value="<?php echo $domain_list; ?>" size="54" maxlength="1500"/>
          </td>
          <td>
            <input type="hidden"   name="<?php echo AI_OPTION_DOMAIN_LIST_TYPE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
            <input type="checkbox" name="<?php echo AI_OPTION_DOMAIN_LIST_TYPE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo AI_BLACK_LIST; ?>" id="referer-list-input-<?php echo $block; ?>" <?php if ($obj->get_ad_domain_list_type() == AI_WHITE_LIST) echo 'checked '; ?> style="display: none;" />
            <span class="checkbox-button checkbox-list-button dashicons dashicons-<?php echo $obj->get_ad_domain_list_type() == AI_BLACK_LIST ? 'no' : 'yes'; ?>" title="<?php _e ('Click to select black or white list', 'ad-inserter'); ?>"></span>
          </td>
        </tr>
        <tr class="<?php if ($show_domain_list) echo 'list-items'; ?>" style="<?php if (!$show_domain_list) echo ' display: none;'; ?>">
          <td colspan="5">
            <textarea id="referer-editor-<?php echo $block; ?>" style="width: 100%; height: 220px; font-family: monospace, Courier, 'Courier New'; font-weight: bold; display: none;"></textarea>
          </td>
        </tr>

        <tr class="<?php if ($show_client_list) echo 'list-items'; ?>" style="<?php if (!$show_client_list) echo ' display: none;'; ?>">
          <td>
            <?php _e ('Clients', 'ad-inserter'); ?>
          </td>
          <td>
            <button id="client-button-<?php echo $block; ?>" type="button" class='ai-button ai-button-small' title="<?php _e ('Toggle client editor', 'ad-inserter'); ?>"></button>
          </td>
          <td style="padding-right: 7px; width: 92%;">
            <input id="client-list-<?php echo $block; ?>" class="ai-list-custom" style="width: 100%;" title="<?php _e ('Comma separated names (operating systems, browsers, devices). You can also list partial user agent strings with * (user-agent-start*. *user-agent-pattern*, *user-agent-end)', 'ad-inserter'); ?>" type="text" name="<?php echo AI_OPTION_CLIENT_LIST, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_client_list(); ?>" value="<?php echo $client_list; ?>" size="54" maxlength="1500"/>
          </td>
          <td>
            <input type="hidden"   name="<?php echo AI_OPTION_CLIENT_LIST_TYPE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
            <input type="checkbox" name="<?php echo AI_OPTION_CLIENT_LIST_TYPE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo AI_BLACK_LIST; ?>" id="client-list-input-<?php echo $block; ?>" <?php if ($obj->get_client_list_type() == AI_WHITE_LIST) echo 'checked '; ?> style="display: none;" />
            <span class="checkbox-button checkbox-list-button dashicons dashicons-<?php echo $obj->get_client_list_type() == AI_BLACK_LIST ? 'no' : 'yes'; ?>" title="<?php _e ('Click to select black or white list', 'ad-inserter'); ?>"></span>
          </td>
        </tr>
        <tr class="<?php if ($show_client_list) echo 'list-items'; ?>" style="<?php if (!$show_client_list) echo ' display: none;'; ?>">
          <td colspan="5">
            <select id="client-select-<?php echo $block; ?>" multiple="multiple" style="display: none;">
            </select>
          </td>
        </tr>

<?php if (function_exists ('ai_list_rows_2')) ai_list_rows_2 ($block, $default, $obj); ?>
      </tbody>
    </table>
  </div>

  <div id="manual-settings-<?php echo $block; ?>" class="small-button rounded" style="text-align: left;<?php if (!$show_manual) echo ' display: none;'; ?>">
    <table>
      <tr>
        <td style="padding: 4px 10px 4px 0;">
          <input type="hidden" name="<?php echo AI_OPTION_ENABLE_WIDGET, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
          <input id="enable-widget-<?php echo $block; ?>" type="checkbox" name="<?php echo AI_OPTION_ENABLE_WIDGET, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo $default->get_enable_widget(); ?>" <?php if ($obj->get_enable_widget () == AI_ENABLED) echo 'checked '; ?> />
          <label for="enable-widget-<?php echo $block; ?>" title="<?php _e ('Enable widget for this block', 'ad-inserter'); ?>">
            <?php _e ('Widget', 'ad-inserter'); ?>
          </label>
        </td>
        <td>
          <pre class="ai-sidebars" style= "margin: 0; display: inline; color: blue; white-space: pre-wrap; word-wrap: break-word;" title="<?php _e ('Sidebars (or widget positions) where this widget is used'); ?>"><?php echo $sidebars [$block], !empty ($sidebars [$block]) ? " &nbsp;" : ""; ?></pre>
        </td>
      </tr>
      <tr>
        <td style="padding: 4px 10px 4px 0;">
          <input type="hidden"   name="<?php echo AI_OPTION_ENABLE_MANUAL, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
          <input type="checkbox" id="enable-shortcode-<?php echo $block; ?>" name="<?php echo AI_OPTION_ENABLE_MANUAL, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo $default->get_enable_manual(); ?>" <?php if ($obj->get_enable_manual () == AI_ENABLED) echo 'checked '; ?> />
          <label for="enable-shortcode-<?php echo $block; ?>" title="<?php _e ('Enable shortcode for manual insertion of this block in posts and pages', 'ad-inserter'); ?>">
            <?php _e ('Shortcode', 'ad-inserter'); ?>
          </label>
        </td>
        <td>
          <pre class="select ai-block-number" style="margin: 0 5px 0 0; display: inline; color: blue; font-size: 11px; white-space: pre-wrap; word-wrap: break-word;">[adinserter block="<?php echo $block; ?>"]</pre>
          <div class="copy-blocker"></div>
          <span class="copy-blocker">or</span>
          <pre class="select ai-block-name" style="margin: 0 0 0 20px; display: inline; color: blue; white-space: pre-wrap; word-wrap: break-word;">[adinserter name="<?php echo $obj->get_ad_name(); ?>"]</pre>
          <div class="copy-blocker"></div>
        </td>
      </tr>
      <tr>
        <td style="padding: 4px 10px 4px 0;">
          <input type="hidden" name="<?php echo AI_OPTION_ENABLE_PHP_CALL, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
          <input id="enable-php-call-<?php echo $block; ?>" type="checkbox" name="<?php echo AI_OPTION_ENABLE_PHP_CALL, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo $default->get_enable_php_call(); ?>" <?php if ($manual_php_function [$block] == AI_ENABLED) echo 'checked '; ?> />
          <label for="enable-php-call-<?php echo $block; ?>" title="<?php _e ('Enable PHP function call to insert this block at any position in theme file. If function is disabled for block it will return empty string.', 'ad-inserter'); ?>">
            <?php _e ('PHP function', 'ad-inserter'); ?>
          </label>
        </td>
        <td class="select">
          <pre class="ai-block-number" style="margin: 0; display: inline; color: blue; font-size: 11px; white-space: pre-wrap; word-wrap: break-word;">&lt;?php if (function_exists ('adinserter')) echo adinserter (<?php echo $block; ?>); ?&gt;</pre>
          <div class="copy-blocker"></div>
        </td>
      </tr>
    </table>
  </div>

  <div id="device-detection-settings-<?php echo $block; ?>" style="<?php if (!$show_devices) echo 'display: none;'; ?>">

    <div id="ai-devices-container-<?php echo $block; ?>" style="padding: 0; margin: 8px 0 0 0; border: 0;">
      <ul id="ai-devices-tabs-<?php echo $block; ?>" style="display: none;">
        <li id="ai-client-side-detection-<?php echo $block; ?>"><a href="#tab-client-side-<?php echo $block; ?>"><span style="<?php echo $client_side_style; ?>"><?php _e ('Client-side device detection', 'ad-inserter'); ?></span></a></li>
        <li id="ai-server-side-detection<?php echo $block; ?>"><a href="#tab-server-side-<?php echo $block; ?>"><span style="<?php echo $server_side_style; ?>"><?php _e ('Server-side device detection', 'ad-inserter'); ?></span></a></li>
      </ul>

      <div id="tab-client-side-<?php echo $block; ?>" class="rounded" style="padding-top: 0;">
        <div style="float: left; margin-top: 10px;">
          <input type="hidden" name="<?php echo AI_OPTION_DETECT_CLIENT_SIDE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
          <input id="client-side-detection-<?php echo $block; ?>" type="checkbox" name="<?php echo AI_OPTION_DETECT_CLIENT_SIDE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo $default->get_detection_client_side(); ?>" <?php if ($obj->get_detection_client_side ()==AI_ENABLED) echo 'checked '; ?> />
          <label for="client-side-detection-<?php echo $block; ?>" style="vertical-align: baseline;"><?php _e ('Use client-side detection to', 'ad-inserter'); ?> </label>

          <select id="client-side-action-<?php echo $block; ?>" name="<?php echo AI_OPTION_CLIENT_SIDE_ACTION, WP_FORM_FIELD_POSTFIX, $block; ?>" style="margin: -4px 1px -2px 1px;" default="<?php echo $default->get_client_side_action (); ?>" title="<?php _e ('Either show/hide or insert when the page is loaded on wanted viewports', 'ad-inserter'); ?>">
            <option value="<?php echo AI_CLIENT_SIDE_ACTION_SHOW; ?>" <?php echo ($obj->get_client_side_action () == AI_CLIENT_SIDE_ACTION_SHOW) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo strtolower (AI_TEXT_SHOW); ?></option>
            <option value="<?php echo AI_CLIENT_SIDE_ACTION_INSERT; ?>" <?php echo ($obj->get_client_side_action () == AI_CLIENT_SIDE_ACTION_INSERT) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo strtolower (AI_TEXT_INSERT); ?></option>
          </select>

          <label style="vertical-align: baseline;"> <?php /* Translators: only on (the following devices): viewport names (devices) listed */ _e ('only on', 'ad-inserter'); ?></label>
        </div>

        <div style="float: left; margin: 7px 0 -2px 0;">
<?php

  $viewports = array ();
  for ($viewport = 1; $viewport <= 6; $viewport ++) {
    $viewport_name = get_viewport_name ($viewport);
    if ($viewport_name != '') $viewports [$viewport] = $viewport_name;
  }
  $columns = 3;

?>
          <table>
            <tbody>
<?php
      $column = 0;
      foreach ($viewports as $viewport => $viewport_name) {
        if ($column % $columns == 0) {
?>
              <tr>
<?php
        }
?>
                <td style='padding: 0 0 0 20px;'>
                  <input type="hidden" name="<?php echo AI_OPTION_DETECT_VIEWPORT, '_', $viewport, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
                  <input type="checkbox" name="<?php echo AI_OPTION_DETECT_VIEWPORT, '_', $viewport, WP_FORM_FIELD_POSTFIX, $block; ?>" id="viewport-<?php echo $viewport, "-", $block; ?>" value="1" default="<?php echo $default->get_detection_viewport ($viewport); ?>" <?php if ($obj->get_detection_viewport ($viewport)==AI_ENABLED) echo 'checked '; ?> />
                  <label for="viewport-<?php echo $viewport, "-", $block; ?>" title="<?php printf (__('Device min width %s px', 'ad-inserter'), get_viewport_width ($viewport)); ?>"><?php echo $viewport_name; ?></label>
                </td>
<?php
        $column ++;
      }
      if ($column % $columns != 0) {
        for ($fill = 1; $fill <= $columns - $column % $columns; $fill++) {
?>
                <td> </td>
<?php
        }
?>
              </tr>
<?php
      }
?>
            </tbody>
          </table>

        </div>
        <div style="clear: both"></div>
      </div>

      <div id="tab-server-side-<?php echo $block; ?>" class="rounded">
        <input type="hidden" name="<?php echo AI_OPTION_DETECT_SERVER_SIDE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
        <input type="checkbox" name="<?php echo AI_OPTION_DETECT_SERVER_SIDE, WP_FORM_FIELD_POSTFIX, $block; ?>" id="server-side-detection-<?php echo $block; ?>" value="1" default="<?php echo $default->get_detection_server_side(); ?>" <?php if ($obj->get_detection_server_side ()==AI_ENABLED) echo 'checked '; ?> />
        <label for="server-side-detection-<?php echo $block; ?>" style="vertical-align: baseline;"><?php _e ('Use server-side detection to insert block only for', 'ad-inserter'); ?> </label>

          <select id="display-for-devices-<?php echo $block; ?>" name="<?php echo AI_OPTION_DISPLAY_FOR_DEVICES, WP_FORM_FIELD_POSTFIX, $block; ?>" style="margin: -4px 1px -2px 1px;" default="<?php echo $default->get_display_for_devices(); ?>">
            <option value="<?php echo AI_INSERT_FOR_DESKTOP_DEVICES; ?>" <?php echo ($obj->get_display_for_devices() == AI_INSERT_FOR_DESKTOP_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DESKTOP_DEVICES; ?></option>
            <option value="<?php echo AI_INSERT_FOR_MOBILE_DEVICES; ?>" <?php echo ($obj->get_display_for_devices() == AI_INSERT_FOR_MOBILE_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_MOBILE_DEVICES; ?></option>
            <option value="<?php echo AI_INSERT_FOR_TABLET_DEVICES; ?>" <?php echo ($obj->get_display_for_devices() == AI_INSERT_FOR_TABLET_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_TABLET_DEVICES; ?></option>
            <option value="<?php echo AI_INSERT_FOR_PHONE_DEVICES; ?>" <?php echo ($obj->get_display_for_devices() == AI_INSERT_FOR_PHONE_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_PHONE_DEVICES; ?></option>
            <option value="<?php echo AI_INSERT_FOR_DESKTOP_TABLET_DEVICES; ?>" <?php echo ($obj->get_display_for_devices() == AI_INSERT_FOR_DESKTOP_TABLET_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DESKTOP_TABLET_DEVICES; ?></option>
            <option value="<?php echo AI_INSERT_FOR_DESKTOP_PHONE_DEVICES; ?>" <?php echo ($obj->get_display_for_devices() == AI_INSERT_FOR_DESKTOP_PHONE_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DESKTOP_PHONE_DEVICES; ?></option>
          </select>
      </div>
    </div>

  </div>

  <div id="misc-settings-<?php echo $block; ?>" style="<?php if (!$show_misc) echo 'display: none;'; ?>">
    <div id="ai-misc-container-<?php echo $block; ?>" style="padding: 0; margin: 8px 0 0 0; border: 0;">
      <ul id="ai-misc-tabs-<?php echo $block; ?>" style="display: none;">
        <li id="ai-misc-insertion-<?php echo $block; ?>"><a href="#tab-insertion-<?php echo $block; ?>"><span style="<?php echo $insertion_style; ?>"><?php _e ('Insertion', 'ad-inserter'); ?></span></a></li>
        <li id="ai-misc-filter-<?php echo $block; ?>"><a href="#tab-filter-<?php echo $block; ?>"><span style="<?php echo $filter_style; ?>"><?php _e ('Filter', 'ad-inserter'); ?></span></a></li>
        <li id="ai-misc-word-count-<?php echo $block; ?>"><a href="#tab-word-count-<?php echo $block; ?>"><span style="<?php echo $word_count_style; ?>"><?php _e ('Word Count', 'ad-inserter'); ?></span></a></li>
        <li id="ai-misc-scheduling-<?php echo $block; ?>"><a href="#tab-scheduling-<?php echo $block; ?>"><span style="<?php echo $scheduling_style; ?>"><?php _e ('Scheduling', 'ad-inserter'); ?></span></a></li>
        <li id="ai-misc-display-<?php echo $block; ?>"><a href="#tab-display-<?php echo $block; ?>"><span style="<?php echo $display_style; ?>"><?php _e ('Display', 'ad-inserter'); ?></span></a></li>
        <?php if (function_exists ('ai_limits_adb_action_0')) ai_limits_adb_action_0 ($block, $adb_style, $limits_style); ?>
        <li id="ai-misc-general-<?php echo $block; ?>"><a href="#tab-general-<?php echo $block; ?>"><span style="<?php echo $general_style; ?>"><?php _e ('General', 'ad-inserter'); ?></span></a></li>
      </ul>

      <div id="tab-insertion-<?php echo $block; ?>" class="max-input" style="padding: 0;">
        <div class="rounded">
          <table class="responsive-table" style="width: 70%">
            <tbody>
              <tr>
                <td>
                  <input type="hidden" name="<?php echo AI_OPTION_ENABLE_AMP, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
                  <input style="" id="enable-amp-<?php echo $block; ?>" type="checkbox" name="<?php echo AI_OPTION_ENABLE_AMP, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo $default->get_enable_amp(true); ?>" <?php if ($obj->get_enable_amp (true) == AI_ENABLED) echo 'checked '; ?> />
                  <label for="enable-amp-<?php echo $block; ?>" style="<?php if (!$obj->get_enable_amp (true) && $obj->get_enable_amp ()) echo ' color: red;' ?>"
                  title="<?php if (!$obj->get_enable_amp (true) && $obj->get_enable_amp ()) {_e ('Old settings for AMP pages detected', 'ad-inserter'); echo ". ";}  _e ('To insert different codes on normal and AMP pages separate them with [ADINSERTER AMP] separator. Here you can enable insertion on AMP pages only when you need to insert THE SAME CODE also on AMP pages (no AMP separator).', 'ad-inserter'); ?>"><?php _e ('AMP pages', 'ad-inserter'); ?></label>
                </td>
                <td>
                  <input type="hidden" name="<?php echo AI_OPTION_ENABLE_AJAX, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
                  <input style="margin-left: 10px;" id="enable-ajax-<?php echo $block; ?>" type="checkbox" name="<?php echo AI_OPTION_ENABLE_AJAX, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo $default->get_enable_ajax(); ?>" <?php if ($obj->get_enable_ajax () == AI_ENABLED) echo 'checked '; ?> />
                  <label for="enable-ajax-<?php echo $block; ?>" title="<?php _e ('Enable insertion for Ajax requests', 'ad-inserter'); ?>"><?php _e ('Ajax requests', 'ad-inserter'); ?></label>
                </td>
                <td>
                  <input type="hidden" name="<?php echo AI_OPTION_ENABLE_FEED, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
                  <input style="margin-left: 10px;" id="enable-feed-<?php echo $block; ?>" type="checkbox" name="<?php echo AI_OPTION_ENABLE_FEED, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo $default->get_enable_feed(); ?>" <?php if ($obj->get_enable_feed () == AI_ENABLED) echo 'checked '; ?> />
                  <label for="enable-feed-<?php echo $block; ?>" title="<?php _e ('Enable insertion in RSS feeds', 'ad-inserter'); ?>"><?php _e ('RSS Feed', 'ad-inserter'); ?></label>
                </td>
                <td>
                  <input type="hidden" name="<?php echo AI_OPTION_ENABLE_404, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
                  <input style="margin-left: 10px;" id="enable-404-<?php echo $block; ?>" type="checkbox" name="<?php echo AI_OPTION_ENABLE_404, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo $default->get_enable_404(); ?>" <?php if ($obj->get_enable_404 () == AI_ENABLED) echo 'checked '; ?> />
                  <label for="enable-404-<?php echo $block; ?>" title="<?php _e ('Enable insertion on page for Error 404: Page not found', 'ad-inserter'); ?>"><?php _e ('Error 404 page', 'ad-inserter'); ?></label>
                </td>
                <td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="rounded">
          <table class="responsive-table" style="width: 100%">
            <tbody>
              <tr>
                <td style="width: 20%; padding-right: 10px;" title="<?php _e ('Maximum number of insertions of this block. Empty or 0 means no limit.', 'ad-inserter'); ?>">
                  <?php _e ('Max', 'ad-inserter'); ?> <input type="text" name="<?php echo AI_OPTION_MAXIMUM_INSERTIONS, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_maximum_insertions (); ?>" value="<?php echo $obj->get_maximum_insertions (); ?>" size="1" maxlength="3" /> <?php _e ('insertions', 'ad-inserter'); ?>
                </td>
                <td title="<?php _e ('Count this block for Max blocks per page limit (defined on the tab [*] / tab General)', 'ad-inserter'); ?>">
                  <input type="hidden" name="<?php echo AI_OPTION_MAX_PAGE_BLOCKS_ENABLED, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
                  <input id="max-page-blocks-<?php echo $block; ?>" type="checkbox" name="<?php echo AI_OPTION_MAX_PAGE_BLOCKS_ENABLED, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo $default->get_max_page_blocks_enabled (); ?>" <?php if ($obj->get_max_page_blocks_enabled () == AI_ENABLED) echo 'checked '; ?> />
                  <label for="max-page-blocks-<?php echo $block; ?>"><?php _e ('Max blocks per page', 'ad-inserter'); ?></label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="rounded">
          <table class="responsive-table" style="width: 100%">
            <tbody>
              <tr>
                <td>
                  <?php _e ('Insert for', 'ad-inserter'); ?>
                  <select id="display-for-users-<?php echo $block; ?>" style="margin: 0 1px; width:160px" name="<?php echo AI_OPTION_DISPLAY_FOR_USERS, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_display_for_users(); ?>">
                     <option value="<?php echo AI_DISPLAY_ALL_USERS; ?>" <?php echo ($obj->get_display_for_users()==AI_DISPLAY_ALL_USERS) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DISPLAY_ALL_USERS; ?></option>
                     <option value="<?php echo AI_DISPLAY_LOGGED_IN_USERS; ?>" <?php echo ($obj->get_display_for_users()==AI_DISPLAY_LOGGED_IN_USERS) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DISPLAY_LOGGED_IN_USERS; ?></option>
                     <option value="<?php echo AI_DISPLAY_NOT_LOGGED_IN_USERS; ?>" <?php echo ($obj->get_display_for_users()==AI_DISPLAY_NOT_LOGGED_IN_USERS) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DISPLAY_NOT_LOGGED_IN_USERS; ?></option>
                     <option value="<?php echo AI_DISPLAY_ADMINISTRATORS; ?>" <?php echo ($obj->get_display_for_users()==AI_DISPLAY_ADMINISTRATORS) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DISPLAY_ADMINISTRATORS; ?></option>
                  </select>
                </td>
                <td title="<?php _e ('Insert block only when WP function [[in_the_loop ()]] returns true (WP loop is currently active). Might speed up insertion on content pages when [[the_content]] filter hook is called multiple times.', 'ad-inserter'); ?>" >
                  <span style="margin-left: 10px;">
                    <input type="hidden" name="<?php echo AI_OPTION_ONLY_IN_THE_LOOP, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
                    <input id="only-in-the-loop-<?php echo $block; ?>" type="checkbox" name="<?php echo AI_OPTION_ONLY_IN_THE_LOOP, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo $default->get_only_in_the_loop (); ?>" <?php if ($obj->get_only_in_the_loop () == AI_ENABLED) echo 'checked '; ?> />
                    <label for="only-in-the-loop-<?php echo $block; ?>"><?php _e ('Insert only in the loop', 'ad-inserter'); ?></label>
                  </span>
                </td>
                <td title="<?php _e ('When enabled, Javascript code (if needed for the blok) will be inserted next to the block HTML code. Otherwise, the Javascript code will be inserted in the page footer. Plugin Javascript functions will still be inserted in the footer.', 'ad-inserter'); ?>">
                  <span style="margin-left: 10px;">
                    <input type="hidden" name="<?php echo AI_OPTION_EMBED_JS_CODE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
                    <input id="embed-js-<?php echo $block; ?>" type="checkbox" name="<?php echo AI_OPTION_EMBED_JS_CODE, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo $default->get_embed_js_code (); ?>" <?php if ($obj->get_embed_js_code () == AI_ENABLED) echo 'checked '; ?> />
                    <label for="embed-js-<?php echo $block; ?>"><?php _e ('Embed JS code', 'ad-inserter'); ?></label>
                  </span>
                </td>
                <td style="width: 35%" title="<?php _e ('Disable caching for WP Super Cache, W3 Total Cache and WP Rocket plugins', 'ad-inserter'); ?>">
                  <span style="float: right;">
                    <input type="hidden" name="<?php echo AI_OPTION_DISABLE_CACHING, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
                    <input id="disable-caching-<?php echo $block; ?>" type="checkbox" name="<?php echo AI_OPTION_DISABLE_CACHING, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo $default->get_disable_caching (); ?>" <?php if ($obj->get_disable_caching () == AI_ENABLED) echo 'checked '; ?> />
                    <label for="disable-caching-<?php echo $block; ?>"><?php _e ('Disable caching', 'ad-inserter'); ?></label>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div id="tab-filter-<?php echo $block; ?>" class="rounded">
        <div class="max-input">
          <span style="display: table-cell; width: 1px; white-space: nowrap; padding-right: 10px;">
            <?php _e('Filter insertions', 'ad-inserter'); ?>
          </span>
          <span style="display: table-cell;">
            <input id="filter-numbers-<?php echo $block; ?>" style="width: 100%;" type="text" name="<?php echo AI_OPTION_EXCERPT_NUMBER, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_call_filter(); ?>" value="<?php echo $obj->get_call_filter(); ?>" title= "<?php _e ('Filter multiple insertions by specifying wanted insertions for this block - single number, comma separated numbers or %N for every N insertions - empty means all insertions / no filter. Set Counter for filter to Auto if you are using only one insertion type.', 'ad-inserter'); ?>" size="12" maxlength="36" />
          </span>
          <span style="display: table-cell; padding-left: 10px;">
            <?php _e('using', 'ad-inserter'); ?>
            <select id="filter-type-<?php echo $block; ?>" class="filter-type-select" style="padding-left: 10px; margin: 0 1px; max-width: 260px;" name="<?php echo AI_OPTION_FILTER_TYPE, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_filter_type(); ?>">
               <option value="<?php echo AI_FILTER_AUTO; ?>" <?php echo ($filter_type == AI_FILTER_AUTO) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_AUTO_COUNTER; ?></option>
               <option value="<?php echo AI_FILTER_PHP_FUNCTION_CALLS; ?>" <?php echo ($filter_type == AI_FILTER_PHP_FUNCTION_CALLS) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_PHP_FUNCTION_CALLS_COUNTER; ?></option>
               <option value="<?php echo AI_FILTER_CONTENT_PROCESSING; ?>" <?php echo ($filter_type == AI_FILTER_CONTENT_PROCESSING) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_CONTENT_PROCESSING_COUNTER; ?></option>
               <option value="<?php echo AI_FILTER_EXCERPT_PROCESSING; ?>" <?php echo ($filter_type == AI_FILTER_EXCERPT_PROCESSING) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_EXCERPT_PROCESSING_COUNTER; ?></option>
               <option value="<?php echo AI_FILTER_BEFORE_POST_PROCESSING; ?>" <?php echo ($filter_type == AI_FILTER_BEFORE_POST_PROCESSING) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_BEFORE_POST_PROCESSING_COUNTER; ?></option>
               <option value="<?php echo AI_FILTER_AFTER_POST_PROCESSING; ?>" <?php echo ($filter_type == AI_FILTER_AFTER_POST_PROCESSING) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_AFTER_POST_PROCESSING_COUNTER; ?></option>
               <option value="<?php echo AI_FILTER_WIDGET_DRAWING; ?>" <?php echo ($filter_type == AI_FILTER_WIDGET_DRAWING) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_WIDGET_DRAWING_COUNTER; ?></option>
               <option value="<?php echo AI_FILTER_SUBPAGES; ?>" <?php echo ($filter_type == AI_FILTER_SUBPAGES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_SUBPAGES_COUNTER; ?></option>
               <option value="<?php echo AI_FILTER_POSTS; ?>" <?php echo ($filter_type == AI_FILTER_POSTS) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_POSTS_COUNTER; ?></option>
               <option value="<?php echo AI_FILTER_PARAGRAPHS; ?>" <?php echo ($filter_type == AI_FILTER_PARAGRAPHS) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_PARAGRAPHS_COUNTER; ?></option>
               <option value="<?php echo AI_FILTER_IMAGES; ?>" <?php echo ($filter_type == AI_FILTER_IMAGES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_IMAGES_COUNTER; ?></option>
               <option value="<?php echo AI_FILTER_COMMENTS; ?>" <?php echo ($filter_type == AI_FILTER_COMMENTS) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_COMMENTS_COUNTER; ?></option>
            </select>
          </span>
          <span style="display: table-cell; text-align: right;">
            <input type="hidden" name="<?php echo AI_OPTION_INVERTED_FILTER, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
            <input id="invert-filter-<?php echo $block; ?>" style="margin-left: 10px;" type="checkbox" name="<?php echo AI_OPTION_INVERTED_FILTER, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo $default->get_inverted_filter(); ?>" <?php if ($obj->get_inverted_filter () == AI_ENABLED) echo 'checked '; ?> />
            <label for="invert-filter-<?php echo $block; ?>" style="vertical-align: top;" title="<?php _e ('Checked means specified calls are unwanted', 'ad-inserter'); ?>"><?php _e ('Invert filter', 'ad-inserter'); ?></label>
          </span>
        </div>
      </div>

      <div id="tab-word-count-<?php echo $block; ?>" class="rounded">
        <?php _e ('Post/Static page must have between', 'ad-inserter'); ?>
        <input type="text" name="<?php echo AI_OPTION_MIN_WORDS, WP_FORM_FIELD_POSTFIX, $block; ?>" style="margin: 0 1px;" default="<?php echo $default->get_minimum_words(); ?>" value="<?php echo $obj->get_minimum_words(); ?>" title="<?php _e ('Minimum number of post/static page words, leave empty for no limit', 'ad-inserter'); ?>" size="4" maxlength="6" />
        <?php _e ('and', 'ad-inserter'); ?>
        <input type="text" name="<?php echo AI_OPTION_MAX_WORDS, WP_FORM_FIELD_POSTFIX, $block; ?>" style="margin: 0 1px;" default="<?php echo $default->get_maximum_words(); ?>" value="<?php echo $obj->get_maximum_words(); ?>" title="<?php _e ('Maximum number of post/static page words, leave empty for no limit', 'ad-inserter'); ?>" size="4" maxlength="6" />
        <?php /* Translators: Post/Static page must have between X and Y words */ echo _n ('word', 'words', (int) $obj->get_maximum_words(), 'ad-inserter'); ?>
      </div>

      <div id="tab-scheduling-<?php echo $block; ?>" class="rounded" style="min-height: 24px;">
        <select id="scheduling-<?php echo $block; ?>" style="margin: 2px 1px; max-width: 340px;" name="<?php echo AI_OPTION_SCHEDULING, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_scheduling(); ?>">
          <option value="<?php echo AI_SCHEDULING_OFF; ?>" <?php echo ($obj->get_scheduling() == AI_SCHEDULING_OFF) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_INSERT_IMMEDIATELY; ?></option>
          <option value="<?php echo AI_SCHEDULING_DELAY_FOR; ?>" <?php echo ($obj->get_scheduling() == AI_SCHEDULING_DELAY_FOR) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DELAY_INSERTION; ?></option>
          <option value="<?php echo AI_SCHEDULING_INSERT_ONLY_FOR; ?>" <?php echo ($obj->get_scheduling() == AI_SCHEDULING_INSERT_ONLY_FOR) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_INSERT_ONLY; ?></option>
<?php if (function_exists ('ai_scheduling_options')) ai_scheduling_options ($obj); ?>
        </select>

        <span id="scheduling-delay-<?php echo $block; ?>">
          <?php _e ('for', 'ad-inserter'); ?> <input type="text" name="<?php echo AI_OPTION_AFTER_DAYS, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_ad_after_day(); ?>" value="<?php echo $obj->get_ad_after_day(); ?>" title="Time period in days. Use decimal value (with decimal point) for shorter periods." size="3" maxlength="6" /> <?php _e ('days after publishing', 'ad-inserter'); ?>
        </span>
<!--        <span id="scheduling-delay-warning-<?php echo $block; ?>" style="color: #d00; display: none;">&nbsp;&nbsp; <?php _e ('Not available', 'ad-inserter'); ?></span>-->

<?php if (function_exists ('ai_scheduling_data')) ai_scheduling_data ($block, $obj, $default); ?>
      </div>

      <div id="tab-display-<?php echo $block; ?>" style="padding: 0;">
        <div class="rounded">
          <table class="responsive-table" style="width: 100%;" cellspacing=0 cellpadding=0 >
            <tbody>
              <tr>
                <td style="width: 10%;">
                  <?php _e ('Width', 'ad-inserter'); ?>
                  <input type="text" name="<?php echo AI_OPTION_BLOCK_WIDTH, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_block_width (); ?>" value="<?php echo $obj->get_block_width (); ?>" title= "<?php /* Translators: do not translate [[width]] - it is a CSS property */ _e ('Block width: empty means width not defined, number means width in pixels, any other value means CSS [[width]] property', 'ad-inserter'); ?>" size="3" maxlength="8" />
                </td>
                <td style="padding-left: 20px; width: 10%;">
                  <?php _e ('Height', 'ad-inserter'); ?>
                  <input type="text" name="<?php echo AI_OPTION_BLOCK_HEIGHT, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_block_height (); ?>" value="<?php echo $obj->get_block_height (); ?>" title= "<?php /* Translators: do not translate [[height]] - it is a CSS property */ _e ('Block height: empty means height not defined, number means height in pixels, any other value means CSS [[height]] property', 'ad-inserter'); ?>" size="3" maxlength="8" />
                </td>

                <td style="padding-left: 20px; width: 70%;">
                  <?php _e ('Background color', 'ad-inserter'); ?>

                  <input id="block-bkg-color-<?php echo $block; ?>" style="font-family: monospace;" type="text" title= "<?php _e ('Block background: empty means background not defined, #hex number means HTML color', 'ad-inserter'); ?>" size="24" maxlength="26" name="<?php echo AI_OPTION_BLOCK_BACKGROUND_COLOR, WP_FORM_FIELD_POSTFIX, $block; ?>" value="<?php echo $obj->get_block_background_color (); ?>" default="<?php echo $default->get_block_background_color (); ?>" />
                  <span class="ai-colorpicker-alpha" style="position: relative; display: inline-block; width: 24px; height: 24px; border: 1px solid #ddd; border-radius: 4px; vertical-align: top; margin-left: 10px;">
                    <span id="block-color-<?php echo $block; ?>" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; cursor: pointer;"></span>
                  </span>
                </td>

                <td style="padding-left: 20px; width: 10%;">
                  <input type="hidden" name="<?php echo AI_OPTION_SHOW_LABEL, WP_FORM_FIELD_POSTFIX, $block; ?>" value="0" />
                  <input id="show-label-<?php echo $block; ?>" type="checkbox" name="<?php echo AI_OPTION_SHOW_LABEL, WP_FORM_FIELD_POSTFIX, $block; ?>" value="1" default="<?php echo $default->get_show_label (); ?>" <?php if ($obj->get_show_label () == AI_ENABLED) echo 'checked '; ?> />
                  <label for="show-label-<?php echo $block; ?>"><?php _e ('Ad label', 'ad-inserter'); ?></label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

<?php if (function_exists ('ai_display_loading')) ai_display_loading ($block, $obj, $default); ?>

<?php if (function_exists ('ai_close_button')) ai_close_button ($block, $obj, $default); ?>

<?php if (function_exists ('ai_delay_showing')) ai_delay_showing ($block, $obj, $default); ?>

<?php if (function_exists ('ai_iframes')) ai_iframes ($block, $obj, $default); ?>

<?php if (function_exists ('ai_parallax')) ai_parallax ($block, $obj, $default); ?>
      </div>

<?php if (function_exists ('ai_limits_adb_action')) ai_limits_adb_action ($block, $obj, $default); ?>

      <div id="tab-general-<?php echo $block; ?>" class="rounded">
        <div class="max-input">
          <span style="display: table-cell; width: 1px; white-space: nowrap;">
            <?php _e ('General tag', 'ad-inserter'); ?>
            &nbsp;
          </span>
          <span style="display: table-cell;">
            <input style="width: 100%; max-width: 140px;" type="text" name="<?php echo AI_OPTION_GENERAL_TAG, WP_FORM_FIELD_POSTFIX, $block; ?>" default="<?php echo $default->get_ad_general_tag(); ?>" value="<?php echo $obj->get_ad_general_tag(); ?>" size="12" maxlength="40" title="<?php _e ("Used for [adinserter data=''] shortcodes when no data is found", 'ad-inserter'); ?>" />
          </span>
        </div>
      </div>

    </div>
  </div>

  <div id="no-wrapping-warning-<?php echo $block; ?>" class="rounded" style="display: none;">
     <span style="margin-top: 5px;"><?php /* translators: %s: HTML tags */ printf (__('%s WARNING: %s %s No Wrapping %s style has no wrapping code needed for client-side device detection!', 'ad-inserter'), '<span style="color: red;">', '</span>', '<strong>', '</strong>'); ?></span>
  </div>

<?php

  $client_side_insertion_warning = (
    $automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_HTML_ELEMENT ||
    $automatic_insertion == AI_AUTOMATIC_INSERTION_INSIDE_HTML_ELEMENT ||
    $automatic_insertion == AI_AUTOMATIC_INSERTION_AFTER_HTML_ELEMENT) &&
    ($html_element_insertion == AI_HTML_INSERTION_CLIENT_SIDE) &&
    ($obj->get_call_filter() != '' || $obj->get_maximum_insertions () != '');
?>

  <div id="client-side-insertion-warning-<?php echo $block; ?>" class="rounded" style="<?php echo $client_side_insertion_warning ? '' : 'display: none;'; ?>">
     <span style="margin-top: 5px;"><?php /* translators: %s: HTML tags for text and link */ printf (__('%s WARNING: %s Settings Filter or Max insertions can\'t work with %s Client-side %s insertion. Use %s Server-side %s insertion.', 'ad-inserter'),
     '<span style="color: red;">', '</span>', '<strong>', '</strong>',
     '<a href="https://adinserter.pro/documentation/insertion-before-inside-after-html-element#insertion" class="simple-link" target="_blank">',
     '</a>'
     ); ?></span>
  </div>

<?php if (function_exists ('ai_warnings')) ai_warnings ($block); ?>

  </div>
</div>
<?php
  }
?>
<div id="tab-0" style="padding: 0;<?php echo $tab_visible ? "" : " display: none;" ?>">
  <div style="margin: 16px 0 16px 4px;">
    <h3 style="margin: 0; float: left;"><?php echo AD_INSERTER_NAME, ' ', __('Settings', 'ad-inserter'); ?> <?php if (isset ($ai_db_options [AI_OPTION_GLOBAL]['VERSION'])) echo (int) ($ai_db_options [AI_OPTION_GLOBAL]['VERSION'][0].$ai_db_options [AI_OPTION_GLOBAL]['VERSION'][1]), '.',
                                        (int) ($ai_db_options [AI_OPTION_GLOBAL]['VERSION'][2].$ai_db_options [AI_OPTION_GLOBAL]['VERSION'][3]), '.',
                                        (int) ($ai_db_options [AI_OPTION_GLOBAL]['VERSION'][4].$ai_db_options [AI_OPTION_GLOBAL]['VERSION'][5]); ?></h3>
    <h4 style="margin: 0px; float: right;<?php if (defined ('AI_EXTRACT_GENERATED')) echo ' color: #00f;'; ?>" title="<?php _e ('Settings timestamp', 'ad-inserter'); ?>"><?php echo isset ($ai_db_options [AI_OPTION_GLOBAL]['TIMESTAMP']) ? date ("Y-m-d H:i:s", $ai_db_options [AI_OPTION_GLOBAL]['TIMESTAMP'] + get_option ('gmt_offset') * 3600) : "";?></h4>
    <div style="clear: both;"></div>
  </div>

  <div style="margin: 16px 0;">
<?php if (!function_exists ('ai_settings_write') || ai_settings_write ()): ?>
    <div style="float: right;">
      <div title='<?php _e ('Rotation editor active - rotation code not generated! Make sure no rotation editor is active before saving settings.', 'ad-inserter'); ?>' class="ai-rotation-warning" style='float: left; font-size: 18px; font-weight: bold; margin: 5px 5px 0 0; display: none;'>&#x26A0;</div>

      <input style="display: none; font-weight: bold; margin-left: 5px;" name="<?php echo AI_FORM_SAVE; ?>" value="<?php _e ('Save Settings', 'ad-inserter'); ?>" type="submit" style="width:120px; font-weight: bold;" />
    </div>
<?php endif; ?>

    <div style="float: left;">
<?php if (!function_exists ('ai_settings_write') || ai_settings_write ()): ?>
      <div style="min-width: 130px; display: inline-block;">
        <input onclick="if (confirm('<?php _e ('Are you sure you want to reset all settings?', 'ad-inserter'); ?>')) return true; return false;" name="<?php echo AI_FORM_CLEAR; ?>" value="<?php _e ('Reset All Settings', 'ad-inserter'); ?>" type="submit" style="display: none; min-width:125px; font-weight: bold; color: #e44;" />
      </div>
<?php endif;
      if (function_exists ('ai_settings_global_actions')) ai_settings_global_actions (); ?>

<?php if (function_exists ('ai_settings_global_buttons')) ai_settings_global_buttons (); ?>

<?php if (defined ('AI_ADSENSE_API')) : ?>
<?php if (!defined ('AI_ADSENSE_AUTHORIZATION_CODE')) : ?>
      <span style="vertical-align: top; margin-left: 5px;">
        <label id="ga-0" class="checkbox-button adsense-list" title="<?php _e ('Show AdSense ad units', 'ad-inserter'); ?>" ><span class="checkbox-icon image icon-adsense"></span></label>
      </span>
<?php endif; ?>
<?php endif; ?>
    </div>

    <div style="clear: both;"></div>
  </div>

<?php
  if (function_exists ('ai_global_settings')) ai_global_settings ();

  if ($enabled_k) $style_k = "font-weight: bold; color: #66f;"; else $style_k = "";
  if ($enabled_h) $style_h = "font-weight: bold; color: #66f;"; else if ($header_code_disabled) $style_h = "font-weight: bold; color: #f66;"; else $style_h = "";
  if ($enabled_f) $style_f = "font-weight: bold; color: #66f;"; else if ($footer_code_disabled) $style_f = "font-weight: bold; color: #f66;"; else $style_f = "";
  if (defined ('AI_ADBLOCKING_DETECTION') && AI_ADBLOCKING_DETECTION) {
    $adb_devices = get_adb_devices ();
    $adb_action = get_adb_action (true);
    $adb_no_action = get_adb_no_action (true);
    $no_undismissible_message = get_no_undismissible_message (true);
    if ($enabled_a) $style_a = "font-weight: bold; color: " . ($adb_action == AI_ADB_ACTION_NONE ? "#66f;" : "#c0f;"); else $style_a = "";
  }
  if ($insertion_disabled) $style_d = "font-weight: bold; color: #e44;"; else $style_d = "";
?>

  <div id="ai-plugin-settings-tab-container" style="padding: 0; margin: 8px 0 0 0; border: 0;">
    <ul id="ai-plugin-settings-tabs" style="display: none;">
      <li id="ai-g" class="ai-plugin-tab"><a href="#tab-general"><?php _e ('General', 'ad-inserter'); ?></a></li>
      <li id="ai-v" class="ai-plugin-tab"><a href="#tab-viewports"><?php _e ('Viewports', 'ad-inserter'); ?></a></li>
      <li id="ai-k" class="ai-plugin-tab"><a href="#tab-hooks"><span style="<?php echo $style_k ?>"><?php _e ('Hooks', 'ad-inserter'); ?></span></a></li>
      <li id="ai-h" class="ai-plugin-tab"><a href="#tab-header"><span style="<?php echo $style_h ?>"><?php _e ('Header', 'ad-inserter'); ?></span></a></li>
      <li id="ai-f" class="ai-plugin-tab"><a href="#tab-footer"><span style="<?php echo $style_f ?>"><?php _e ('Footer', 'ad-inserter'); ?></span></a></li>
<?php if (function_exists ('ai_plugin_settings_tab')) ai_plugin_settings_tab ($exceptions); ?>
<?php if (defined ('AI_ADBLOCKING_DETECTION') && AI_ADBLOCKING_DETECTION) { ?>
      <li id="ai-a" class="ai-plugin-tab"><a href="#tab-adblocking"><span style="<?php echo $style_a ?>"><?php _e ('Ad Blocking', 'ad-inserter'); ?></span></a></li>
<?php } ?>
      <li id="ai-d" class="ai-plugin-tab"><a href="#tab-debugging"><span style="<?php echo $style_d ?>"><?php _e ('Debugging', 'ad-inserter'); ?></span></a></li>
    </ul>

    <div id="tab-general" style="padding: 0;">

    <div class="rounded">
      <table class="ai-settings-table ai-values" style="width: 100%;">
<?php if (function_exists ('ai_general_settings')) ai_general_settings (); ?>
        <tr>
          <td>
          <?php _e ('Plugin priority', 'ad-inserter'); ?>
          </td>
          <td>
            <input type="text" name="plugin_priority" value="<?php echo get_plugin_priority (); ?>"  default="<?php echo DEFAULT_PLUGIN_PRIORITY; ?>" size="6" maxlength="6" />
          </td>
        </tr>
        <tr>
          <td>
          <?php _e ('Output buffering', 'ad-inserter'); ?>
          </td>
          <td>
            <select id="output-buffering" name="output-buffering"  default="<?php echo DEFAULT_OUTPUT_BUFFERING; ?>" title="<?php _e ('Needed for position Above header but may not work with all themes', 'ad-inserter'); ?>">
              <option value="<?php echo AI_OUTPUT_BUFFERING_DISABLED; ?>" <?php echo get_output_buffering()  == AI_OUTPUT_BUFFERING_DISABLED ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DISABLED; ?></option>
              <option value="<?php echo AI_OUTPUT_BUFFERING_ENABLED; ?>" <?php echo get_output_buffering() == AI_OUTPUT_BUFFERING_ENABLED ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_ENABLED; ?></option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <?php _e ('Syntax highlighting theme', 'ad-inserter'); ?>
          </td>
          <td>
            <select
                id="syntax-highlighter-theme"
                name="syntax-highlighter-theme"
                value="Value">
                <optgroup label="<?php _ex ('None', 'no syntax highlighting themes', 'ad-inserter'); ?>">
                    <option value="<?php echo AI_OPTION_DISABLED; ?>" <?php echo ($syntax_highlighter_theme == AI_OPTION_DISABLED) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php _e ('No Syntax Highlighting', 'ad-inserter'); ?></option>
                </optgroup>
                <optgroup label="<?php _ex ('Light', 'syntax highlighting themes', 'ad-inserter'); ?>">
                    <option value="chrome" <?php echo ($syntax_highlighter_theme == 'chrome') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Chrome</option>
                    <option value="clouds" <?php echo ($syntax_highlighter_theme == 'clouds') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Clouds</option>
                    <option value="crimson_editor" <?php echo ($syntax_highlighter_theme == 'crimson_editor') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Crimson Editor</option>
                    <option value="dawn" <?php echo ($syntax_highlighter_theme == 'dawn') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Dawn</option>
                    <option value="dreamweaver" <?php echo ($syntax_highlighter_theme == 'dreamweaver') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Dreamweaver</option>
                    <option value="eclipse" <?php echo ($syntax_highlighter_theme == 'eclipse') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Eclipse</option>
                    <option value="github" <?php echo ($syntax_highlighter_theme == 'github') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>GitHub</option>
                    <option value="katzenmilch" <?php echo ($syntax_highlighter_theme == 'katzenmilch') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Katzenmilch</option>
                    <option value="kuroir" <?php echo ($syntax_highlighter_theme == 'kuroir') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Kuroir</option>
                    <option value="solarized_light" <?php echo ($syntax_highlighter_theme == 'solarized_light') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Solarized Light</option>
                    <option value="textmate" <?php echo ($syntax_highlighter_theme == 'textmate') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Textmate</option>
                    <option value="tomorrow" <?php echo ($syntax_highlighter_theme == 'tomorrow') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Tomorrow</option>
                    <option value="xcode" <?php echo ($syntax_highlighter_theme == 'xcode') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>XCode</option>
                </optgroup>
                <optgroup label="<?php _ex ('Dark', 'syntax highlighting themes', 'ad-inserter'); ?>">
                    <option value="ad_inserter" <?php echo ($syntax_highlighter_theme == 'ad_inserter') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Ad Inserter</option>
                    <option value="chaos" <?php echo ($syntax_highlighter_theme == 'chaos') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Chaos</option>
                    <option value="clouds_midnight" <?php echo ($syntax_highlighter_theme == 'clouds_midnight') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Clouds Midnight</option>
                    <option value="cobalt" <?php echo ($syntax_highlighter_theme == 'cobalt') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Cobalt</option>
                    <option value="idle_fingers" <?php echo ($syntax_highlighter_theme == 'idle_fingers') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Idle Fingers</option>
                    <option value="kr_theme" <?php echo ($syntax_highlighter_theme == 'kr_theme') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>krTheme</option>
                    <option value="merbivore" <?php echo ($syntax_highlighter_theme == 'merbivore') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Merbivore</option>
                    <option value="merbivore_soft" <?php echo ($syntax_highlighter_theme == 'merbivore_soft') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Merbivore Soft</option>
                    <option value="mono_industrial" <?php echo ($syntax_highlighter_theme == 'mono_industrial') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Mono Industrial</option>
                    <option value="monokai" <?php echo ($syntax_highlighter_theme == 'monokai') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Monokai</option>
                    <option value="pastel_on_dark" <?php echo ($syntax_highlighter_theme == 'pastel_on_dark') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Pastel on Dark</option>
                    <option value="solarized_dark" <?php echo ($syntax_highlighter_theme == 'solarized_dark') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Solarized Dark</option>
                    <option value="terminal" <?php echo ($syntax_highlighter_theme == 'terminal') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Terminal</option>
                    <option value="tomorrow_night" <?php echo ($syntax_highlighter_theme == 'tomorrow_night') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Tomorrow Night</option>
                    <option value="tomorrow_night_blue" <?php echo ($syntax_highlighter_theme == 'tomorrow_night_blue') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Tomorrow Night Blue</option>
                    <option value="tomorrow_night_bright" <?php echo ($syntax_highlighter_theme == 'tomorrow_night_bright') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Tomorrow Night Bright</option>
                    <option value="tomorrow_night_eighties" <?php echo ($syntax_highlighter_theme == 'tomorrow_night_eighties') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Tomorrow Night 80s</option>
                    <option value="twilight" <?php echo ($syntax_highlighter_theme == 'twilight') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Twilight</option>
                    <option value="vibrant_ink" <?php echo ($syntax_highlighter_theme == 'vibrant_ink') ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>>Vibrant Ink</option>
                </optgroup>
            </select>
          </td>
        </tr>
        <tr>
          <td>
          <?php _e ('Tab setup delay', 'ad-inserter'); ?>
          </td>
          <td>
            <input type="text" name="tab-setup-delay" value="<?php echo get_tab_setup_delay (); ?>"  default="<?php echo DEFAULT_TAB_SETUP_DELAY; ?>" size="6" maxlength="6" />
          </td>
        </tr>
        <tr>
          <td>
            <?php _e ('Min. user role for ind. exceptions editing', 'ad-inserter'); ?>
          </td>
          <td>
            <select style="margin-bottom: 3px;" id="minimum-user-role" name="minimum-user-role" selected-value="1" data="<?php echo get_minimum_user_role (); ?>" default="<?php echo DEFAULT_MINIMUM_USER_ROLE; ?>" style="width:300px">
              <?php wp_dropdown_roles (get_minimum_user_role ()); ?>
            </select>
          </td>
        </tr>
        <tr>
          <td>
          <?php _e ('Disable caching for logged in administrators', 'ad-inserter'); ?>
          </td>
          <td>
            <select id="disable-caching-admin" name="disable-caching-admin"  default="<?php echo DEFAULT_DISABLE_CACHING; ?>" title="<?php _e ('Enabled means that logged in administrators will see non-cached (live) pages (applies to WP Super Cache, W3 Total Cache and WP Rocket plugins)', 'ad-inserter'); ?>">
              <option value="<?php echo AI_DISABLE_CACHING_DISABLED; ?>" <?php echo get_disable_caching ()  == AI_DISABLE_CACHING_DISABLED ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DISABLED; ?></option>
              <option value="<?php echo AI_DISABLE_CACHING_ENABLED; ?>" <?php echo get_disable_caching () == AI_DISABLE_CACHING_ENABLED ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_ENABLED; ?></option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
          <?php _e ('Wait for jQuery', 'ad-inserter'); ?>
          </td>
          <td>
            <select id="wait-for-jquery" name="wait-for-jquery"  default="<?php echo DEFAULT_WAIT_FOR_JQUERY; ?>" title="<?php _e ('When enabled, Ad Inserter will wait for jQuery library to be loaded before it will run the scripts that may need it', 'ad-inserter'); ?>">
              <option value="<?php echo AI_WAIT_FOR_JQUERY_DISABLED; ?>" <?php echo get_wait_for_jquery ()  == AI_WAIT_FOR_JQUERY_DISABLED ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DISABLED; ?></option>
              <option value="<?php echo AI_WAIT_FOR_JQUERY_ENABLED; ?>" <?php echo get_wait_for_jquery () == AI_WAIT_FOR_JQUERY_ENABLED ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_ENABLED; ?></option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
          <?php _e ('Sticky widget mode', 'ad-inserter'); ?>
          </td>
          <td>
            <select name="sticky-widget-mode"  default="<?php echo DEFAULT_STICKY_WIDGET_MODE; ?>" title="<?php _e ('CSS mode is the best approach but may not work with all themes. JavaScript mode works with most themes but may reload ads on page load.', 'ad-inserter'); ?>">
              <option value="<?php echo AI_STICKY_WIDGET_MODE_CSS; ?>" <?php echo get_sticky_widget_mode()  == AI_STICKY_WIDGET_MODE_CSS ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_CSS; ?></option>
              <option value="<?php echo AI_STICKY_WIDGET_MODE_JS; ?>" <?php echo get_sticky_widget_mode() == AI_STICKY_WIDGET_MODE_JS ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_JS; ?></option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
          <?php _e ('Sticky widget top margin', 'ad-inserter'); ?>
          </td>
          <td>
            <input type="text" name="sticky-widget-margin" value="<?php echo get_sticky_widget_margin (); ?>"  default="<?php echo DEFAULT_STICKY_WIDGET_MARGIN; ?>" size="6" maxlength="4" /> px
          </td>
        </tr>
        <tr>
          <td>
          <?php _e ('Dynamic blocks', 'ad-inserter'); ?>
          </td>
          <td>
            <select id="dynamic_blocks" name="dynamic_blocks" default="<?php echo DEFAULT_DYNAMIC_BLOCKS; ?>">
              <option value="<?php echo AI_DYNAMIC_BLOCKS_SERVER_SIDE; ?>" <?php echo get_dynamic_blocks()      == AI_DYNAMIC_BLOCKS_SERVER_SIDE ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_SERVER_SIDE; ?></option>
              <option value="<?php echo AI_DYNAMIC_BLOCKS_SERVER_SIDE_W3TC; ?>" <?php echo get_dynamic_blocks() == AI_DYNAMIC_BLOCKS_SERVER_SIDE_W3TC ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_SERVER_SIDE_W3TC; ?></option>
              <option value="<?php echo AI_DYNAMIC_BLOCKS_CLIENT_SIDE_SHOW; ?>" <?php echo get_dynamic_blocks() == AI_DYNAMIC_BLOCKS_CLIENT_SIDE_SHOW ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_CLIENT_SIDE_SHOW; ?></option>
              <option value="<?php echo AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT; ?>" <?php echo get_dynamic_blocks() == AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_CLIENT_SIDE_INSERT; ?></option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
          <?php _e ('Functions for paragraph counting', 'ad-inserter'); ?>
          </td>
          <td>
            <select id="paragraph_counting_functions" name="paragraph_counting_functions"  default="<?php echo DEFAULT_PARAGRAPH_COUNTING_FUNCTIONS; ?>" title="<?php _e ('Standard PHP functions are faster and work in most cases, use Multibyte functions if paragraphs are not counted properly on non-english pages.', 'ad-inserter'); ?>">
              <option value="<?php echo AI_STANDARD_PARAGRAPH_COUNTING_FUNCTIONS; ?>" <?php echo get_paragraph_counting_functions()  == AI_STANDARD_PARAGRAPH_COUNTING_FUNCTIONS ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_FUNCTIONS_STANDARD; ?></option>
              <option value="<?php echo AI_MULTIBYTE_PARAGRAPH_COUNTING_FUNCTIONS; ?>" <?php echo get_paragraph_counting_functions() == AI_MULTIBYTE_PARAGRAPH_COUNTING_FUNCTIONS ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_MULTIBYTE; ?></option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
          <?php _e ('No paragraph counting inside', 'ad-inserter'); ?>
          </td>
          <td>
            <input type="text" name="no-paragraph-counting-inside" style="width: 100%;" value="<?php echo get_no_paragraph_counting_inside (); ?>"  default="<?php echo DEFAULT_NO_PARAGRAPH_COUNTING_INSIDE; ?>" size="60" maxlength="500" />
          </td>
        </tr>
        <tr>
          <td>
          <?php _e ('Ad label', 'ad-inserter'); ?>
          </td>
          <td>
            <input id="ad-label-text" type="text" name="ad-label" style="width: 100%;" value="<?php echo get_ad_label (); ?>"  default="<?php echo DEFAULT_AD_TITLE; ?>" title="<?php _e ('Label text or HTML code', 'ad-inserter'); ?>" size="60" maxlength="500" />
          </td>
        </tr>
        <tr>
          <td>
          <?php _e ('Max blocks per page', 'ad-inserter'); ?>
          </td>
          <td>
            <input type="text" name="max-page-blocks" value="<?php echo get_max_page_blocks (); ?>"  default="<?php echo DEFAULT_MAX_PAGE_BLOCKS; ?>" title="<?php _e ('Maximum number of inserted blocks per page. You need to enable Max page insertions (button Misc / tab Insertion) to count block for this limit.', 'ad-inserter'); ?>" size="6" maxlength="4" />
          </td>
        </tr>

<?php if (function_exists ('ai_general_settings_2')) ai_general_settings_2 ();

      if (defined ('AI_PLUGIN_TRACKING') && AI_PLUGIN_TRACKING) {
        if (!function_exists ('ai_general_settings_2')) {
          global $ai_dst;
          if (isset ($ai_dst) && is_object ($ai_dst) && $ai_dst->get_plugin_tracking () !== null) {
            $plugin_tracking = $ai_dst->get_tracking ();
?>
        <tr>
          <td>
          <?php _e ('Plugin usage tracking', 'ad-inserter'); ?>
          </td>
          <td>
            <select id="plugin-usage-tracking" name="plugin-usage-tracking"  default="#" title="<?php /* translators: %s: Ad Inserter */ printf (__ ('Enable tracking of %s usage and help us to make improvements to the plugin. Only information regarding the WordPress environment and %s usage is recorded (once per month and on events like plugin activation/deactivation).', 'ad-inserter'), AD_INSERTER_NAME, AD_INSERTER_NAME); ?>">
              <option value="<?php echo AI_PLUGIN_TRACKING_DISABLED; ?>" <?php echo $plugin_tracking == AI_PLUGIN_TRACKING_DISABLED ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DISABLED; ?></option>
              <option value="<?php echo AI_PLUGIN_TRACKING_ENABLED; ?>" <?php echo $plugin_tracking == AI_PLUGIN_TRACKING_ENABLED ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_ENABLED; ?></option>
            </select>
          </td>
        </tr>
<?php
          }
        }
      }
?>
      </table>
    </div>

    <div class="rounded">
      <table class="ai-settings-table" style="width: 100%;">
        <tr>
          <td>
            <span title="<?php _e ('CSS class name for the wrapping div', 'ad-inserter'); ?>"><?php _e ('Block class name', 'ad-inserter'); ?></span>
            <input id="block-class-name" class="ai-block-code-demo" style="margin-left: 5px;" type="text" name="block-class-name" value="<?php echo $block_class_name; ?>" default="<?php echo DEFAULT_BLOCK_CLASS_NAME; ?>" size="12" maxlength="40" />
            <input type="hidden" name="block-class" value="0" />
            <input id="block-class" class="ai-block-code-demo" style="margin-left: 5px;" type="checkbox" name="block-class" value="1" default="<?php echo DEFAULT_BLOCK_CLASS; ?>" <?php if ($block_class == AI_ENABLED) echo 'checked '; ?> />
          </td>
          <td>
            <span title="<?php _e ('Include block number class', 'ad-inserter'); ?>"><?php _e ('Block number class', 'ad-inserter'); ?></span>
            <input type="hidden" name="block-number-class" value="0" />
            <input id="block-number-class" class="ai-block-code-demo" style="margin-left: 5px;" type="checkbox" name="block-number-class" value="1" default="<?php echo DEFAULT_BLOCK_NUMBER_CLASS; ?>" <?php if ($block_number_class == AI_ENABLED) echo 'checked '; ?> />
          </td>
          <td>
            <span title="<?php _e ('Include block name class', 'ad-inserter'); ?>"><?php _e ('Block name class', 'ad-inserter'); ?></span>
            <input type="hidden" name="block-name-class" value="0" />
            <input id="block-name-class" class="ai-block-code-demo" style="margin-left: 5px;" type="checkbox" name="block-name-class" value="1" default="<?php echo DEFAULT_BLOCK_NAME_CLASS; ?>" <?php if ($block_name_class == AI_ENABLED) echo 'checked '; ?> />
          </td>
          <td>
            <span title="<?php _e ('Instead of alignment classes generate inline alignment styles for blocks', 'ad-inserter'); ?>"><?php _e ('Inline styles', 'ad-inserter'); ?></span>
            <input type="hidden" name="inline-styles" value="0" />
            <input id="inline-styles" class="ai-block-code-demo" style="margin-left: 5px;" type="checkbox" name="inline-styles" value="1" default="<?php echo DEFAULT_INLINE_STYLES; ?>" <?php if ($inline_styles == AI_ENABLED) echo 'checked '; ?> />
          </td>
        </tr>
      </table>
      <div style="margin-top: 8px;"><?php _e ('Preview of the block wrapping code', 'ad-inserter'); ?></div>
      <pre class="ai-page-code" title="<?php _e ('Wrapping div', 'ad-inserter'); ?>"><span id="ai-block-code-demo" ><?php echo ai_block_code_demo ($block_class_name, $block_class, $block_number_class, $block_name_class, $inline_styles); ?></span>
  <span style="color: #222;"><?php _e ('BLOCK CODE', 'ad-inserter'); ?></span>
&lt;/div&gt;</pre>
    </div>

    </div>

    <div id="tab-viewports" class="rounded">
      <div style="margin: 0 0 8px 0;">
        <strong><?php _e ('Viewport Settings used for client-side device detection', 'ad-inserter'); ?></strong>
      </div>
<?php

  for ($viewport = 1; $viewport <= 6; $viewport ++) {
    $bottom_margin = $viewport == 6 ? 0 : 4;
?>
      <div style="margin: 4px 0 <?php echo $bottom_margin; ?>px 0;">
          <?php /* Translators: %d: viewport number */ printf (__('Viewport %d name', 'ad-inserter'), $viewport); ?>&nbsp;&nbsp;&nbsp;
            <input style="margin-left: 0px;" type="text" name="viewport-name-<?php echo $viewport; ?>" value="<?php echo get_viewport_name ($viewport); ?>" default="<?php echo defined ("DEFAULT_VIEWPORT_NAME_" . $viewport) ? constant ("DEFAULT_VIEWPORT_NAME_" . $viewport) : ""; ?>" size="15" maxlength="40" />
            <?php if ($viewport == 6) echo '<span style="display: none;">' ?>
             &nbsp;&nbsp; <?php _e ('min width', 'ad-inserter'); ?>
            <input type="text" id="option-length-<?php echo $viewport; ?>" name="viewport-width-<?php echo $viewport; ?>" value="<?php echo get_viewport_width ($viewport); ?>" default="<?php echo defined ("DEFAULT_VIEWPORT_WIDTH_" . $viewport) ? constant ("DEFAULT_VIEWPORT_WIDTH_" . $viewport) : ""; ?>" size="4" maxlength="4" /> px
            <?php if ($viewport == 6) echo '</span>' ?>
      </div>
<?php
  }
?>
    </div>

    <div id="tab-hooks" class="rounded">
      <div style="margin: 0 0 8px 0;">
        <strong><?php _e ('Custom Hooks', 'ad-inserter'); ?></strong>
      </div>

      <table>
        <tbody>
<?php

  for ($hook = 1; $hook <= 20; $hook ++) {
?>
          <tr>
            <td style="padding: 0 0 2px 0;">
              <input type="hidden"   name="hook-enabled-<?php echo $hook; ?>" value="0" />
              <input type="checkbox" name="hook-enabled-<?php echo $hook; ?>" value="1" default="<?php echo AI_DISABLED; ?>" id="hook-enabled-<?php echo $hook; ?>" title="<?php _e ('Enable hook', 'ad-inserter'); ?>" <?php if (get_hook_enabled ($hook) == AI_ENABLED) echo 'checked '; ?> />
            </td>
            <td style="white-space: nowrap;">
              <label for="hook-enabled-<?php echo $hook; ?>" title="<?php _e ('Enable hook', 'ad-inserter'); ?>"><?php /* translators: %d: hook number */ printf (__('Hook %d name', 'ad-inserter'), $hook); ?></label>
            </td>
            <td style="width: 25%;">
              <input style="width: 100%;" title="<?php _e ('Hook name for automatic insertion selection', 'ad-inserter'); ?>" type="text" name="hook-name-<?php echo $hook; ?>" default="" value="<?php echo get_hook_name ($hook); ?>" size="30" maxlength="80" />
            </td>
            <td style="padding-left: 7px;">
              <?php _e ('action', 'ad-inserter'); ?>
            </td>
            <td style="">
              <input style="width: 100%;" title="<?php _e ('Action name as used in the do_action () function', 'ad-inserter'); ?>" type="text" name="hook-action-<?php echo $hook; ?>" default="" value="<?php echo get_hook_action ($hook); ?>" size="30" maxlength="80" />
            </td>
            <td style="padding-left: 7px;">
              <?php _e ('priority', 'ad-inserter'); ?>
            </td>
            <td>
              <input title="<?php _e ('Priority for the hook (default is 10)', 'ad-inserter'); ?>" type="text" name="hook-priority-<?php echo $hook; ?>" default="<?php echo DEFAULT_CUSTOM_HOOK_PRIORITY; ?>" value="<?php echo get_hook_priority ($hook); ?>" size="5" maxlength="9" />
            </td>
          </tr>
<?php
  }

?>
        </tbody>
      </table>
    </div>

    <div id="tab-header" style="margin: 0px 0; padding: 0; ">
      <div style="margin: 8px 0 0; line-height: 24px;">
        <div style="float: right;">
      <?php if (AI_SYNTAX_HIGHLIGHTING) : ?>
          <input type="checkbox" value="0" id="simple-editor-h" class="simple-editor-button" style="display: none;" />
          <label class="checkbox-button" style="margin-left: 10px;" for="simple-editor-h" title="<?php _e ('Toggle Syntax Highlighting / Simple editor for mobile devices', 'ad-inserter'); ?>"><span class="checkbox-icon icon-tablet"></span></label>
      <?php endif; ?>

          <input type="hidden"   name="<?php echo AI_OPTION_ENABLE_MANUAL, '_block_h'; ?>" value="0" />
          <input type="checkbox" name="<?php echo AI_OPTION_ENABLE_MANUAL, '_block_h'; ?>" id="enable-header" value="1" default="<?php echo $default->get_enable_manual(); ?>" <?php if ($adH->get_enable_manual () == AI_ENABLED) echo 'checked '; ?> style="display: none;" />
          <label class="checkbox-button" style="margin-left: 10px;" for="enable-header" title="<?php _e ('Enable insertion of this code into HTML page header', 'ad-inserter'); ?>"><span class="checkbox-icon icon-enabled<?php if ($adH->get_enable_manual () == AI_ENABLED) echo ' on'; ?>"></span></label>

<?php if ($ai_wp_data [AI_PHP_PROCESSING] && (!is_multisite() || is_main_site () || multisite_php_processing ())) : ?>
          <input type="hidden"   name="<?php echo AI_OPTION_PROCESS_PHP, '_block_h'; ?>" value="0" />
          <input type="checkbox" name="<?php echo AI_OPTION_PROCESS_PHP, '_block_h'; ?>" value="1" id="process-php-h" default="<?php echo $default->get_process_php (); ?>" <?php if ($adH->get_process_php () == AI_ENABLED) echo 'checked '; ?> style="display: none;" />
          <label class="checkbox-button" style="margin-left: 10px;" for="process-php-h" title="<?php _e ('Process PHP code', 'ad-inserter'); ?>"><span class="checkbox-icon icon-php<?php if ($adH->get_process_php () == AI_ENABLED) echo ' on'; ?>"></span></label>
<?php endif; ?>
        </div>

        <div style="vertical-align: sub; display: inline-block;">
          <h3 style="margin: 0;"><?php _e ('HTML Page Header Code', 'ad-inserter'); ?></h3>
        </div>

        <div style="clear: both;"></div>
      </div>

      <div style="width: 100%;">
        <div style="float: left;">
          <?php printf (__('Code in the %s section of the HTML page', 'ad-inserter'), '<pre style="display: inline; color: blue;">&lt;head&gt;&lt;/head&gt;</pre>'); ?>
          <?php if ($header_code_disabled) echo '<span style="color: #f00;">', _x ('NOT ENABLED', 'code in the header', 'ad-inserter'), '</span>'; ?>
        </div>

        <div style="clear: both;"></div>
      </div>

      <div style="margin: 8px 0;">
        <textarea id="block-h" name="<?php echo AI_OPTION_CODE, '_block_h'; ?>" class="simple-editor" style="background-color:#F9F9F9; font-family: monospace, Courier, 'Courier New'; font-weight: bold;" default=""><?php echo esc_textarea ($adH->get_ad_data()); ?></textarea>
      </div>

      <div id="device-detection-settings-h" class="rounded">
        <table>
          <tbody>
            <tr>
              <td>
                <input type="hidden" name="<?php echo AI_OPTION_DETECT_SERVER_SIDE, WP_FORM_FIELD_POSTFIX, AI_HEADER_OPTION_NAME; ?>" value="0" />
                <input type="checkbox" name="<?php echo AI_OPTION_DETECT_SERVER_SIDE, WP_FORM_FIELD_POSTFIX, AI_HEADER_OPTION_NAME; ?>" id="server-side-detection-h" value="1" default="<?php echo $default->get_detection_server_side(); ?>" <?php if ($adH->get_detection_server_side ()==AI_ENABLED) echo 'checked '; ?> />
                <label for="server-side-detection-h"><?php _e ('Use server-side detection to insert code only for', 'ad-inserter'); ?> </label>
                <select id="display-for-devices-h" name="<?php echo AI_OPTION_DISPLAY_FOR_DEVICES, WP_FORM_FIELD_POSTFIX, AI_HEADER_OPTION_NAME; ?>" default="<?php echo $default->get_display_for_devices(); ?>" >
                  <option value="<?php echo AI_INSERT_FOR_DESKTOP_DEVICES; ?>" <?php echo ($adH->get_display_for_devices() == AI_INSERT_FOR_DESKTOP_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DESKTOP_DEVICES; ?></option>
                  <option value="<?php echo AI_INSERT_FOR_MOBILE_DEVICES; ?>" <?php echo ($adH->get_display_for_devices() == AI_INSERT_FOR_MOBILE_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_MOBILE_DEVICES; ?></option>
                  <option value="<?php echo AI_INSERT_FOR_TABLET_DEVICES; ?>" <?php echo ($adH->get_display_for_devices() == AI_INSERT_FOR_TABLET_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_TABLET_DEVICES; ?></option>
                  <option value="<?php echo AI_INSERT_FOR_PHONE_DEVICES; ?>" <?php echo ($adH->get_display_for_devices() == AI_INSERT_FOR_PHONE_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_PHONE_DEVICES; ?></option>
                  <option value="<?php echo AI_INSERT_FOR_DESKTOP_TABLET_DEVICES; ?>" <?php echo ($adH->get_display_for_devices() == AI_INSERT_FOR_DESKTOP_TABLET_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DESKTOP_TABLET_DEVICES; ?></option>
                  <option value="<?php echo AI_INSERT_FOR_DESKTOP_PHONE_DEVICES; ?>" <?php echo ($adH->get_display_for_devices() == AI_INSERT_FOR_DESKTOP_PHONE_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DESKTOP_PHONE_DEVICES; ?></option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <input type="hidden" name="<?php echo AI_OPTION_ENABLE_404, '_block_h'; ?>" value="0" />
                <input type="checkbox" name="<?php echo AI_OPTION_ENABLE_404, '_block_h'; ?>" id="enable-header-404" value="1" default="<?php echo $default->get_enable_404(); ?>" <?php if ($adH->get_enable_404 () == AI_ENABLED) echo 'checked '; ?> />
                <label for="enable-header-404" title="<?php _e ('Enable insertion of this code into HTML page header on page for Error 404: Page not found', 'ad-inserter'); ?>"><?php _e ('Insert on Error 404 page', 'ad-inserter'); ?></label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div id="tab-footer" style="margin: 0px 0; padding: 0; ">
      <div style="margin: 8px 0 0; line-height: 24px;">
        <div style="float: right;">
    <?php if (AI_SYNTAX_HIGHLIGHTING) : ?>
          <input type="checkbox" value="0" id="simple-editor-f" class="simple-editor-button" style="display: none;" />
          <label class="checkbox-button" style="margin-left: 10px;" for="simple-editor-f" title="<?php _e ('Toggle Syntax Highlighting / Simple editor for mobile devices', 'ad-inserter'); ?>"><span class="checkbox-icon icon-tablet"></span></label>
    <?php endif; ?>

          <input type="hidden"   name="<?php echo AI_OPTION_ENABLE_MANUAL, '_block_f'; ?>" value="0" />
          <input type="checkbox" name="<?php echo AI_OPTION_ENABLE_MANUAL, '_block_f'; ?>" id="enable-footer" value="1" default="<?php echo $default->get_enable_manual(); ?>" <?php if ($adF->get_enable_manual () == AI_ENABLED) echo 'checked '; ?> style="display: none;" />
          <label class="checkbox-button" style="margin-left: 10px;" for="enable-footer" title="<?php _e ('Enable insertion of this code into HTML page footer', 'ad-inserter'); ?>"><span class="checkbox-icon icon-enabled<?php if ($adF->get_enable_manual () == AI_ENABLED) echo ' on'; ?>"></span></label>

<?php if ($ai_wp_data [AI_PHP_PROCESSING] && (!is_multisite() || is_main_site () || multisite_php_processing ())) : ?>
          <input type="hidden"   name="<?php echo AI_OPTION_PROCESS_PHP, '_block_f'; ?>" value="0" />
          <input type="checkbox" name="<?php echo AI_OPTION_PROCESS_PHP, '_block_f'; ?>" value="1" id="process-php-f" default="<?php echo $default->get_process_php (); ?>" <?php if ($adF->get_process_php () == AI_ENABLED) echo 'checked '; ?> style="display: none;" />
          <label class="checkbox-button" style="margin-left: 10px;" for="process-php-f" title="<?php _e ('Process PHP code', 'ad-inserter'); ?>"><span class="checkbox-icon icon-php<?php if ($adF->get_process_php () == AI_ENABLED) echo ' on'; ?>"></span></label>
<?php endif; ?>
        </div>

        <div style="vertical-align: sub; display: inline-block;">
          <h3 style="margin: 0;"><?php _e ('HTML Page Footer Code', 'ad-inserter'); ?></h3>
        </div>

        <div style="clear: both;"></div>
      </div>

      <div style="width: 100%;">
        <div style="float: left;">
          <?php /* translators: %s: HTML tags */ printf (__('Code before the %s tag of the HTML page', 'ad-inserter'), '<pre style="display: inline; color: blue;">&lt;/body&gt;</pre>'); ?>
          <?php if ($footer_code_disabled) echo '<span style="color: #f00;">', _x ('NOT ENABLED', 'code in the footer', 'ad-inserter'), '</span>'; ?>
        </div>

        <div style="clear: both;"></div>
      </div>

      <div style="margin: 8px 0;">
        <textarea id="block-f" name="<?php echo AI_OPTION_CODE, '_block_f'; ?>" class="simple-editor" style="background-color:#F9F9F9; font-family: monospace, Courier, 'Courier New'; font-weight: bold;" default=""><?php echo esc_textarea ($adF->get_ad_data()); ?></textarea>
      </div>

      <div id="device-detection-settings-f" class="rounded">

        <table>
          <tbody>
            <tr>
              <td>
                <input type="hidden" name="<?php echo AI_OPTION_DETECT_SERVER_SIDE, WP_FORM_FIELD_POSTFIX, AI_FOOTER_OPTION_NAME; ?>" value="0" />
                <input type="checkbox" name="<?php echo AI_OPTION_DETECT_SERVER_SIDE, WP_FORM_FIELD_POSTFIX, AI_FOOTER_OPTION_NAME; ?>" id="server-side-detection-f" value="1" default="<?php echo $default->get_detection_server_side(); ?>" <?php if ($adF->get_detection_server_side ()==AI_ENABLED) echo 'checked '; ?> />
                <label for="server-side-detection-f"><?php _e ('Use server-side detection to insert code only for', 'ad-inserter'); ?> </label>
                <select id="display-for-devices-f" name="<?php echo AI_OPTION_DISPLAY_FOR_DEVICES, WP_FORM_FIELD_POSTFIX, AI_FOOTER_OPTION_NAME; ?>" default="<?php echo $default->get_display_for_devices(); ?>" >
                  <option value="<?php echo AI_INSERT_FOR_DESKTOP_DEVICES; ?>" <?php echo ($adF->get_display_for_devices() == AI_INSERT_FOR_DESKTOP_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DESKTOP_DEVICES; ?></option>
                  <option value="<?php echo AI_INSERT_FOR_MOBILE_DEVICES; ?>" <?php echo ($adF->get_display_for_devices() == AI_INSERT_FOR_MOBILE_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_MOBILE_DEVICES; ?></option>
                  <option value="<?php echo AI_INSERT_FOR_TABLET_DEVICES; ?>" <?php echo ($adF->get_display_for_devices() == AI_INSERT_FOR_TABLET_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_TABLET_DEVICES; ?></option>
                  <option value="<?php echo AI_INSERT_FOR_PHONE_DEVICES; ?>" <?php echo ($adF->get_display_for_devices() == AI_INSERT_FOR_PHONE_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_PHONE_DEVICES; ?></option>
                  <option value="<?php echo AI_INSERT_FOR_DESKTOP_TABLET_DEVICES; ?>" <?php echo ($adF->get_display_for_devices() == AI_INSERT_FOR_DESKTOP_TABLET_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DESKTOP_TABLET_DEVICES; ?></option>
                  <option value="<?php echo AI_INSERT_FOR_DESKTOP_PHONE_DEVICES; ?>" <?php echo ($adF->get_display_for_devices() == AI_INSERT_FOR_DESKTOP_PHONE_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DESKTOP_PHONE_DEVICES; ?></option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <input type="hidden" name="<?php echo AI_OPTION_ENABLE_404, '_block_f'; ?>" value="0" />
                <input type="checkbox" name="<?php echo AI_OPTION_ENABLE_404, '_block_f'; ?>" id="enable-footer-404" value="1" default="<?php echo $default->get_enable_404(); ?>" <?php if ($adF->get_enable_404 () == AI_ENABLED) echo 'checked '; ?> />
                <label for="enable-footer-404" title="<?php _e ('Enable insertion of this code into HTML page footer on page for Error 404: Page not found', 'ad-inserter'); ?>"><?php _e ('Insert on Error 404 page', 'ad-inserter'); ?></label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

<?php if (function_exists ('ai_plugin_settings')) ai_plugin_settings ($start, $end, $exceptions); ?>

<?php if (defined ('AI_ADBLOCKING_DETECTION') && AI_ADBLOCKING_DETECTION) { ?>

    <div id="tab-adblocking" style="margin: 0; padding: 0;">
      <div style="margin: 8px 0; line-height: 24px;">
        <div style="float: right;">
          <?php if ($adA->get_enable_manual () == AI_ENABLED): ?>
          <span class="ai-toolbar-button text" title='<?php _e ('Code for ad blocking detection inserted. Click for details.', 'ad-inserter'); ?>' style='display: inline-block; font-size: 20px; vertical-align: bottom; padding: 0;'><a href="https://adinserter.pro/documentation/ad-blocking-detection#detection" class="clear-link" target="_blank">&#x26A0;</a></span>
          <?php endif; ?>

          <input type="hidden"   name="<?php echo AI_OPTION_ENABLE_MANUAL, '_block_a'; ?>" value="0" />
          <input type="checkbox" name="<?php echo AI_OPTION_ENABLE_MANUAL, '_block_a'; ?>" id="enable-adb-detection" value="1" default="<?php echo $default->get_enable_manual(); ?>" <?php if ($adA->get_enable_manual () == AI_ENABLED) echo 'checked '; ?> style="display: none;" />
          <label class="checkbox-button" style="margin-left: 10px;" for="enable-adb-detection" title="<?php _e ('Enable detection of ad blocking', 'ad-inserter'); ?>"><span class="checkbox-icon icon-enabled<?php if ($adA->get_enable_manual () == AI_ENABLED) echo ' on'; ?>"></span></label>
        </div>

        <div style="vertical-align: sub; display: inline-block;">
          <h3 style="margin: 0; display: inline-block;"><?php _e ('Ad Blocking Detection', 'ad-inserter'); ?></h3>
          <?php if (!$enabled_a && $adb_action != AI_ADB_ACTION_NONE) echo '<span style="color: #f00;"> &nbsp; ', _x ('NOT ENABLED', 'ad blocking detection', 'ad-inserter'), '</span>'; ?>
        </div>

        <div style="clear: both;"></div>
      </div>

      <div class="rounded" style="margin: 8px 0 8px;">
        <table class="ai-settings-table" style="width: 100%;" cellpadding="0">
          <tr>
            <td style="width: 25%;">
              <label for="adb-devices" style="vertical-align: baseline;"><?php _e ('Enabled for', 'ad-inserter'); ?></label>
            </td>
            <td>
              <select id="adb-devices" name="<?php echo AI_OPTION_ADB_DEVICES; ?>" default="<?php echo AI_DEFAULT_ADB_DEVICES; ?>">
                <option value="<?php echo AI_INSERT_FOR_ALL_DEVICES; ?>" <?php echo ($adb_devices == AI_INSERT_FOR_ALL_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_ALL_DEVICES; ?></option>
                <option value="<?php echo AI_INSERT_FOR_DESKTOP_DEVICES; ?>" <?php echo ($adb_devices == AI_INSERT_FOR_DESKTOP_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DESKTOP_DEVICES; ?></option>
                <option value="<?php echo AI_INSERT_FOR_MOBILE_DEVICES; ?>" <?php echo ($adb_devices == AI_INSERT_FOR_MOBILE_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_MOBILE_DEVICES; ?></option>
                <option value="<?php echo AI_INSERT_FOR_TABLET_DEVICES; ?>" <?php echo ($adb_devices == AI_INSERT_FOR_TABLET_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_TABLET_DEVICES; ?></option>
                <option value="<?php echo AI_INSERT_FOR_PHONE_DEVICES; ?>" <?php echo ($adb_devices == AI_INSERT_FOR_PHONE_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_PHONE_DEVICES; ?></option>
                <option value="<?php echo AI_INSERT_FOR_DESKTOP_TABLET_DEVICES; ?>" <?php echo ($adb_devices == AI_INSERT_FOR_DESKTOP_TABLET_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DESKTOP_TABLET_DEVICES; ?></option>
                <option value="<?php echo AI_INSERT_FOR_DESKTOP_PHONE_DEVICES; ?>" <?php echo ($adb_devices == AI_INSERT_FOR_DESKTOP_PHONE_DEVICES) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DESKTOP_PHONE_DEVICES; ?></option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label for="adb-action"><?php _e ('Action', 'ad-inserter'); ?></label>
            </td>
            <td>
              <select id="adb-action" name="<?php echo AI_OPTION_ADB_ACTION; ?>" title="<?php _e ('Global action when ad blocking is detected', 'ad-inserter'); ?>" default="<?php echo AI_DEFAULT_ADB_ACTION; ?>" >
                <option value="<?php echo AI_ADB_ACTION_NONE; ?>" <?php echo ($adb_action == AI_ADB_ACTION_NONE) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_NONE; ?></option>
                <option value="<?php echo AI_ADB_ACTION_MESSAGE; ?>" <?php echo ($adb_action == AI_ADB_ACTION_MESSAGE) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_POPUP_MESSAGE; ?></option>
                <option value="<?php echo AI_ADB_ACTION_REDIRECTION; ?>" <?php echo ($adb_action == AI_ADB_ACTION_REDIRECTION) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_REDIRECTION; ?></option>
              </select>
              <span style="float: right">
                <span style="vertical-align: middle;"><?php _e ('No action for', 'ad-inserter'); ?></span>
                <select id="adb-no-action" name="<?php echo AI_OPTION_ADB_NO_ACTION; ?>" title="<?php _e ('Exceptions for global action when ad blocking is detected.', 'ad-inserter'); ?>" default="<?php echo AI_DEFAULT_ADB_NO_ACTION; ?>" >
                  <option value="<?php echo AI_ADB_NO_ACTION_NONE; ?>" <?php echo ($adb_no_action == AI_ADB_NO_ACTION_NONE) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>> </option>
                  <option value="<?php echo AI_ADB_NO_ACTION_LOGGED_IN; ?>" <?php echo ($adb_no_action == AI_ADB_NO_ACTION_LOGGED_IN) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DISPLAY_LOGGED_IN_USERS; ?></option>
                  <option value="<?php echo AI_ADB_NO_ACTION_ADMINISTRATORS; ?>" <?php echo ($adb_no_action == AI_ADB_NO_ACTION_ADMINISTRATORS) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DISPLAY_ADMINISTRATORS; ?></option>
                </select>
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <?php _e ('Delay Action', 'ad-inserter'); ?>
            </td>
            <td>
              <input style="width: 60px;" type="text" name="<?php echo AI_OPTION_ADB_DELAY_ACTION; ?>" title="<?php _e ('Number of page views to delay action when ad blocking is detected. Leave empty for no delay (action fires on first page view). Sets cookie.', 'ad-inserter'); ?>" value="<?php echo get_delay_action (); ?>"  default="" size="3" maxlength="8" /> <?php _ex ('page views', 'Delay Action for x ', 'ad-inserter'); ?>
            </td>
          </tr>
          <tr>
            <td>
              <?php _e ('No Action Period', 'ad-inserter'); ?>
            </td>
            <td>
              <input style="width: 60px;" type="text" name="<?php echo AI_OPTION_ADB_NO_ACTION_PERIOD; ?>" title="<?php _e ('Number of days to supress action when ad blocking is detected. Leave empty for no no-action period (action fires always after defined page view delay). Sets cookie.', 'ad-inserter'); ?>" value="<?php echo get_no_action_period (); ?>"  default="<?php echo AI_DEFAULT_ADB_NO_ACTION_PERIOD; ?>" size="3" maxlength="5" /> <?php _ex ('days', 'no action period', 'ad-inserter'); ?>
            </td>
          </tr>
          <tr>
            <td>
              <?php _e ('Custom Selectors', 'ad-inserter'); ?>
            </td>
            <td>
              <input id="custom-selectors" style="width: 95%;" type="text" name="<?php echo AI_OPTION_ADB_SELECTORS; ?>" title="<?php _e ('Comma seprarated list of selectors (.class, #id) used for additional ad blocking detection. Invisible element or element with zero height means ad blocking is present.', 'ad-inserter'); ?>" value="<?php echo get_adb_selectors (); ?>"  default="" size="50" maxlength="200" />
              <button id="custom-selectors-button" type="button" class='ai-button ai-button-small' style="display: none; outline: transparent; float: right; margin-top: 4px; width: 15px; height: 15px;" title="<?php _e ('Open HTML element selector', 'ad-inserter'); ?>"></button>
            </td>
          </tr>
<?php if (function_exists ('ai_adb_settings')) ai_adb_settings (); ?>
          <tr style="height: 26px;">
            <td>
              <label for="adb-external-scripts" title="<?php _e ('Use external scripts for ad blocking detection. Disable when you need to obtain user consent before collecting personal information. In such case use shortcut to insert external scripts after the consent is given.', 'ad-inserter'); ?>"><?php _e ('Use external scripts', 'ad-inserter'); ?></label>
            </td>
            <td>
              <input type="hidden" name="<?php echo AI_OPTION_ADB_EXTERNAL_SCRIPTS; ?>" value="0" />
              <input type="checkbox" name="<?php echo AI_OPTION_ADB_EXTERNAL_SCRIPTS; ?>" id="adb-external-scripts" value="1" default="<?php echo AI_DEFAULT_ADB_EXTERNAL_SCRIPTS; ?>" <?php if (get_adb_external_scripts () == AI_ENABLED) echo 'checked '; ?> />
            </td>
          </tr>
        </table>
      </div>

      <div id="adb-page-redirection" class="rounded">
        <table class="ai-settings-table" style="width: 100%;">
          <tr>
            <td style="width: 25%;">
              <label for="redirection-page"><?php _e ('Redirection Page', 'ad-inserter'); ?></label>
            </td>
            <td>
<?php
  $args = array(
    'depth'                 => 0,
    'child_of'              => 0,
    'selected'              => get_redirection_page (true),
    'echo'                  => 0,
    'name'                  => AI_OPTION_ADB_REDIRECTION_PAGE,
    'id'                    => 'redirection-page',
    'class'                 => null,
    'show_option_none'      => __('Custom Url', 'ad-inserter'),
    'show_option_no_change' => null,
    'option_none_value'     => '0',
  );
  $dropdown_pages = wp_dropdown_pages ($args);
  $dropdown_title = __ ('Static page for redirection when ad blocking is detected. For other pages select Custom url and set it below.', 'ad-inserter');
  $dropdown_pages = str_replace ('<select ', '<select default="'.AI_DEFAULT_ADB_REDIRECTION_PAGE.'" title="'.$dropdown_title.'" ', $dropdown_pages);

  echo $dropdown_pages;
?>
            </td>
          </tr>
        <tr>
          <td>
          <?php _e ('Custom Redirection Url', 'ad-inserter'); ?>
          </td>
          <td>
            <input id="custom-redirection-url" style="width: 100%;" type="text" name="<?php echo AI_OPTION_ADB_CUSTOM_REDIRECTION_URL; ?>" value="<?php echo get_custom_redirection_url (); ?>"  default="" size="50" maxlength="200" />
          </td>
        </tr>
        </table>
      </div>

      <div id="adb-message">
        <div style="padding: 0; min-height: 28px;">
          <div style="float: left; margin: 10px 0 0 3px;">
            <?php _e ('Message HTML code', 'ad-inserter'); ?>
          </div>
          <div style="float: right;">

      <?php if (AI_SYNTAX_HIGHLIGHTING) : ?>
            <input type="checkbox" value="0" id="simple-editor-a" class="simple-editor-button" style="display: none;" />
            <label class="checkbox-button" style="margin-left: 10px;" for="simple-editor-a" title="<?php _e ('Toggle Syntax Highlighting / Simple editor for mobile devices', 'ad-inserter'); ?>"><span class="checkbox-icon icon-tablet"></span></label>
      <?php endif; ?>

<?php if ($ai_wp_data [AI_PHP_PROCESSING] && (!is_multisite() || is_main_site () || multisite_php_processing ())) : ?>
            <input type="hidden"   name="<?php echo AI_OPTION_PROCESS_PHP, '_block_a'; ?>" value="0" />
            <input type="checkbox" name="<?php echo AI_OPTION_PROCESS_PHP, '_block_a'; ?>" value="1" id="process-php-a" default="<?php echo $default->get_process_php (); ?>" <?php if ($adA->get_process_php () == AI_ENABLED) echo 'checked '; ?> style="display: none;" />
            <label class="checkbox-button" style="margin-left: 10px;" for="process-php-a" title="<?php _e ('Process PHP code', 'ad-inserter'); ?>"><span class="checkbox-icon icon-php<?php if ($adA->get_process_php () == AI_ENABLED) echo ' on'; ?>"></span></label>
<?php endif; ?>

            <button id="preview-button-adb" type="button" class='ai-button' style="display: none; margin: 0 4px 0 10px;" title="<?php _e ('Preview message when ad blocking is detected', 'ad-inserter'); ?>" nonce="<?php echo wp_create_nonce ("adinserter_data"); ?>" site-url="<?php echo wp_make_link_relative (get_site_url()); ?>"><?php _e ('Preview', 'ad-inserter'); ?></button>
          </div>
          <div style="clear: both;"></div>
        </div>

        <div style="margin: 8px 0;">
          <textarea id="block-a" name="<?php echo AI_OPTION_CODE, '_block_a'; ?>" class="simple-editor small" style="background-color:#F9F9F9; font-family: monospace, Courier, 'Courier New'; font-weight: bold;" default="<?php echo esc_textarea (AI_DEFAULT_ADB_MESSAGE); ?>"><?php echo esc_textarea ($adA->get_ad_data()); ?></textarea>
        </div>

        <div class="rounded">
          <table class="ai-settings-table" style="width: 100%;">
            <tr>
              <td style="width: 20%;">
              <?php _e ('Message CSS', 'ad-inserter'); ?>
              </td>
              <td>
                <input id="message-css" style="width: 100%;" type="text" name="<?php echo AI_OPTION_ADB_MESSAGE_CSS; ?>" value="<?php echo get_message_css (); ?>"  default="<?php echo AI_DEFAULT_ADB_MESSAGE_CSS; ?>" size="50" maxlength="200" />
              </td>
            </tr>
            <tr>
              <td>
              <?php _e ('Overlay CSS', 'ad-inserter'); ?>
              </td>
              <td>
                <input id="overlay-css" style="width: 100%;" type="text" name="<?php echo AI_OPTION_ADB_OVERLAY_CSS; ?>" value="<?php echo get_overlay_css (); ?>"  default="<?php echo AI_DEFAULT_ADB_OVERLAY_CSS; ?>" size="50" maxlength="200" />
              </td>
            </tr>
            <tr>
              <td>
                <label for="undismissible-message" title="<?php _e ('Prevent visitors from closing the warning message', 'ad-inserter'); ?>"><?php _e ('Undismissible Message', 'ad-inserter'); ?></label>
              </td>
              <td>
                <input type="hidden" name="<?php echo AI_OPTION_ADB_UNDISMISSIBLE_MESSAGE; ?>" value="0" />
                <input type="checkbox" name="<?php echo AI_OPTION_ADB_UNDISMISSIBLE_MESSAGE; ?>" id="undismissible-message" value="1" default="<?php echo AI_DEFAULT_ADB_UNDISMISSIBLE_MESSAGE; ?>" <?php if (get_undismissible_message (true) == AI_ENABLED) echo 'checked '; ?> />
                <span style="float: right">
                  <span style="vertical-align: middle;"><?php _e ('Not undismissible for', 'ad-inserter'); ?></span>
                  <select id="not-undismissible" name="<?php echo AI_OPTION_ADB_NO_UNDISMISSIBLE_MESSAGE; ?>" title="<?php _e ('Users which can close the warning message.', 'ad-inserter'); ?>" default="<?php echo AI_DEFAULT_ADB_NO_UNDISMISSIBLE_MESSAGE; ?>" >
                    <option value="<?php echo AI_ADB_NO_ACTION_NONE; ?>" <?php echo ($no_undismissible_message == AI_ADB_NO_ACTION_NONE) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>> </option>
                    <option value="<?php echo AI_ADB_NO_ACTION_LOGGED_IN; ?>" <?php echo ($no_undismissible_message == AI_ADB_NO_ACTION_LOGGED_IN) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DISPLAY_LOGGED_IN_USERS; ?></option>
                    <option value="<?php echo AI_ADB_NO_ACTION_ADMINISTRATORS; ?>" <?php echo ($no_undismissible_message == AI_ADB_NO_ACTION_ADMINISTRATORS) ? AD_SELECT_SELECTED : AD_EMPTY_VALUE; ?>><?php echo AI_TEXT_DISPLAY_ADMINISTRATORS; ?></option>
                  </select>
                </span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

<?php }

    $install_timestamp = get_option (AI_INSTALL_NAME, '');
    $install_time = isset ($ai_wp_data [AI_INSTALL_TIME_DIFFERENCE]) ? $ai_wp_data [AI_INSTALL_TIME_DIFFERENCE] : '';
    $since_install = isset ($ai_wp_data [AI_DAYS_SINCE_INSTAL]) ? $ai_wp_data [AI_DAYS_SINCE_INSTAL] : null;
    $review = get_option ('ai-notice-review', '');

    if (defined ('AI_PLUGIN_TRACKING') && AI_PLUGIN_TRACKING) {
      global $ai_dst;

      $tracking = $ai_dst->get_tracking ();
    }


    if (function_exists ('ai_remote_plugin_data')) {
      $install_timestamp = ai_remote_plugin_data ('install', $install_timestamp);
      $install_time = ai_remote_plugin_data ('install-time', $install_time);
      $since_install = ai_remote_plugin_data ('since-install', $since_install);
      $review = ai_remote_plugin_data ('review', $review);
      if (defined ('AI_PLUGIN_TRACKING') && AI_PLUGIN_TRACKING) {
        $tracking = ai_remote_plugin_data ('tracking', $tracking);
      }
    }

    $d1 = __ ("Force showing admin toolbar for administrators when viewing site. Enable this option when you are logged in as admin and you don't see admin toolbar.", 'ad-inserter');
  // Preview of client-side dynamic blocks
?>
    <div id="tab-debugging" style="margin: 0; padding: 0;">
      <div style="margin: 8px 0; line-height: 24px;">
        <div style="float: right;">
          <input type="hidden"   name="disable-header-code" value="0" />
          <input type="checkbox" name="disable-header-code" value="1" id="disable-header-code" default="<?php echo DEFAULT_DISABLE_HEADER_CODE; ?>" <?php if ($disable_header_code == AI_ENABLED) echo 'checked '; ?> style="display: none;" />
          <label class="checkbox-button" style="margin-left: 10px;" for="disable-header-code" title="<?php _e ('Disable header code (Header tab)', 'ad-inserter'); ?>"><span class="checkbox-icon icon-h<?php if ($disable_header_code == AI_ENABLED) echo ' on'; ?>"></span></label>

          <input type="hidden"   name="disable-footer-code" value="0" />
          <input type="checkbox" name="disable-footer-code" value="1" id="disable-footer-code" default="<?php echo DEFAULT_DISABLE_FOOTER_CODE; ?>" <?php if ($disable_footer_code == AI_ENABLED) echo 'checked '; ?> style="display: none;" />
          <label class="checkbox-button" style="margin-left: 10px;" for="disable-footer-code" title="<?php _e ('Disable footer code (Footer tab)', 'ad-inserter'); ?>"><span class="checkbox-icon icon-f<?php if ($disable_footer_code == AI_ENABLED) echo ' on'; ?>"></span></label>

          <input type="hidden"   name="disable-js-code" value="0" />
          <input type="checkbox" name="disable-js-code" value="1" id="disable-js-code" default="<?php echo DEFAULT_DISABLE_JS_CODE; ?>" <?php if ($disable_js_code == AI_ENABLED) echo 'checked '; ?> style="display: none;" />
          <label class="checkbox-button" style="margin-left: 10px;" for="disable-js-code" title="<?php /* translators: %s: Ad Inserter */ printf (__ ('Disable %s JavaScript code', 'ad-inserter'), AD_INSERTER_NAME); ?>"><span class="checkbox-icon icon-js<?php if ($disable_js_code == AI_ENABLED) echo ' on'; ?>"></span></label>

          <input type="hidden"   name="disable-css-code" value="0" />
          <input type="checkbox" name="disable-css-code" value="1" id="disable-css-code" default="<?php echo DEFAULT_DISABLE_CSS_CODE; ?>" <?php if ($disable_css_code == AI_ENABLED) echo 'checked '; ?> style="display: none;" />
          <label class="checkbox-button" style="margin-left: 10px;" for="disable-css-code" title="<?php /* translators: %s: Ad Inserter */ printf (__ ('Disable %s CSS code', 'ad-inserter'), AD_INSERTER_NAME); ?>"><span class="checkbox-icon icon-css<?php if ($disable_css_code == AI_ENABLED) echo ' on'; ?>"></span></label>

          <input type="hidden"   name="disable-html-code" value="0" />
          <input type="checkbox" name="disable-html-code" value="1" id="disable-html-code" default="<?php echo DEFAULT_DISABLE_HTML_CODE; ?>" <?php if ($disable_html_code == AI_ENABLED) echo 'checked '; ?> style="display: none;" />
          <label class="checkbox-button" style="margin-left: 10px;" for="disable-html-code" title="<?php /* translators: %s: Ad Inserter */ printf (__ ('Disable %s HTML code', 'ad-inserter'), AD_INSERTER_NAME); ?>"><span class="checkbox-icon icon-html<?php if ($disable_html_code == AI_ENABLED) echo ' on'; ?>"></span></label>

          <input type="hidden"   name="disable-php-processing" value="0" />
          <input type="checkbox" name="disable-php-processing" value="1" id="disable-php-processing" default="<?php echo DEFAULT_DISABLE_PHP_PROCESSING; ?>" <?php if ($disable_php_processing == AI_ENABLED) echo 'checked '; ?> style="display: none;" />
          <label class="checkbox-button" style="margin-left: 10px;" for="disable-php-processing" title="<?php _e ('Disable PHP code processing (in all blocks including header and footer code)', 'ad-inserter'); ?>"><span class="checkbox-icon icon-php-red<?php if ($disable_php_processing == AI_ENABLED) echo ' on'; ?>"></span></label>

          <input type="hidden"   name="disable-blocks" value="0" />
          <input type="checkbox" name="disable-blocks" value="1" id="disable-blocks" default="<?php echo DEFAULT_DISABLE_BLOCK_INSERTIONS; ?>" <?php if ($disable_block_insertions == AI_ENABLED) echo 'checked '; ?> style="display: none;" />
          <label class="checkbox-button" style="margin-left: 10px;" for="disable-blocks" title="<?php _e ('Disable insertion of all blocks', 'ad-inserter'); ?>"><span class="checkbox-icon icon-pause<?php if ($disable_block_insertions == AI_ENABLED) echo ' on'; ?>"></span></label>
        </div>

        <div style="vertical-align: sub; display: inline-block;">
          <h3 style="margin: 0"><?php _e ('Disable insertions', 'ad-inserter'); ?></h3>
        </div>

        <div style="clear: both;"></div>
      </div>

      <div class="rounded" style="margin: 8px 0 8px;">
        <pre class="ai-page-code">
&lt;html&gt;
&lt;head&gt;
  ...
  <span id="ai-page-css"<?php if ($disable_css_code) echo ' class="ai-page-code-disabled"'; ?>>&lt;style&gt;
    <?php /* translators: %s: Ad Inserter */ printf (__ ('%s CSS CODE', 'ad-inserter'), strtoupper (AD_INSERTER_NAME)); ?>

  &lt;/style&gt;</span>
  <span id="ai-page-header"<?php if ($disable_header_code) echo ' class="ai-page-code-disabled"'; ?>><?php _e ('HEADER CODE', 'ad-inserter'); ?></span>
&lt;/head&gt;
&lt;body&gt;
  ...
  <span id="ai-page-block"<?php if ($disable_block_insertions) echo ' class="ai-page-code-disabled"'; ?>><?php echo ai_block_code_demo ($block_class_name, $block_class, $block_number_class, $block_name_class, $inline_styles); ?>

    <span id="ai-page-php"<?php if ($disable_php_processing) echo ' class="ai-page-code-disabled"'; ?>>&lt;?php <?php /* translators: %s: PHP tags */ printf (__ ('BLOCK PHP CODE', 'ad-inserter'), '', ''); ?> ?&gt;</span>
    <?php _e ('BLOCK CODE', 'ad-inserter'); ?>

  &lt;/div&gt;</span>
  ...
  <span id="ai-page-html"<?php if ($disable_html_code) echo ' class="ai-page-code-disabled"'; ?>>&lt;span&gt;<?php /* translators: %s: Ad Inserter */ printf (__ ('%s HTML CODE', 'ad-inserter'), strtoupper (AD_INSERTER_NAME)); ?>&lt;/span&gt;</span>
  <span id="ai-page-js"<?php if ($disable_js_code) echo ' class="ai-page-code-disabled"'; ?>>&lt;script&gt;
    <?php /* translators: %s: Ad Inserter */ printf (__ ('%s JS CODE', 'ad-inserter'), strtoupper (AD_INSERTER_NAME)); ?>

  &lt;/script&gt;</span>
  <span id="ai-page-footer"<?php if ($disable_footer_code) echo ' class="ai-page-code-disabled"'; ?>><?php _e ('FOOTER CODE', 'ad-inserter'); ?></span>
&lt;/body&gt;
&lt;/html&gt;</pre>
      </div>

      <div class="rounded" style="margin: 8px 0 8px;">
        <table class="ai-settings-table" style="width: 100%;">
          <tr title="<?php echo $d1; ?>">
            <td style="width: 45%;">
              <label for="force-admin-toolbar"><?php _e ('Force showing admin toolbar when viewing site', 'ad-inserter'); ?></label>
            </td>
            <td>
              <input type="hidden" name="force_admin_toolbar" value="0" />
              <input type="checkbox" name="force_admin_toolbar" id="force-admin-toolbar" value="1" default="<?php echo DEFAULT_FORCE_ADMIN_TOOLBAR; ?>" <?php if (get_force_admin_toolbar () == AI_ENABLED) echo 'checked '; ?> />
            </td>
          </tr>
          <tr title="<?php _e ('Enable debugging functions in admin toolbar', 'ad-inserter'); ?>">
            <td>
              <label for="admin-toolbar-debugging"><?php _e ('Debugging functions in admin toolbar', 'ad-inserter'); ?></label>
            </td>
            <td>
              <input type="hidden" name="admin_toolbar_debugging" value="0" />
              <input type="checkbox" name="admin_toolbar_debugging" id="admin-toolbar-debugging" value="1" default="<?php echo DEFAULT_ADMIN_TOOLBAR_DEBUGGING; ?>" <?php if (get_admin_toolbar_debugging ()==AI_ENABLED) echo 'checked '; ?> />
            </td>
          </tr>
          <tr title="<?php _e ('Enable debugging functions in admin toolbar on mobile screens', 'ad-inserter'); ?>">
            <td>
              <label for="admin-toolbar-mobile"><?php _e ('Debugging functions on mobile screens', 'ad-inserter'); ?></label>
            </td>
            <td>
              <input type="hidden" name="admin_toolbar_mobile" value="0" />
              <input type="checkbox" name="admin_toolbar_mobile" id="admin-toolbar-mobile" value="1" default="<?php echo DEFAULT_ADMIN_TOOLBAR_MOBILE; ?>" <?php if (get_admin_toolbar_mobile ()==AI_ENABLED) echo 'checked '; ?> />
            </td>
          </tr>

  <?php if (function_exists ('ai_system_remote_debugging')) ai_system_remote_debugging (); else { ?>
          <tr title="<?php _e ('Enable Debugger widget and code insertion debugging (blocks, positions, tags, processing) by url parameters for non-logged in users. Enable this option to allow other users to see Debugger widget, labeled blocks and positions in order to help you to diagnose problems. For logged in administrators debugging is always enabled.', 'ad-inserter'); ?>">
            <td>
              <label for="remote-debugging"><?php _e ('Remote debugging', 'ad-inserter'); ?></label>
            </td>
            <td>
              <input type="hidden" name="remote_debugging" value="0" />
              <input type="checkbox" name="remote_debugging" id="remote-debugging" value="1" default="<?php echo DEFAULT_REMOTE_DEBUGGING; ?>" <?php if (get_remote_debugging ()==AI_ENABLED) echo 'checked '; ?> />
            </td>
          </tr>
  <?php } ?>

          <tr title="Disable translation - <?php _e ('Disable translation to see original texts for the settings and messages in English', 'ad-inserter'); ?>">
            <td>
              <label for="disable-translation"><?php _e ('Disable translation', 'ad-inserter'); ?></label>
            </td>
            <td>
              <input type="hidden" name="disable_translation" value="0" />
              <input type="checkbox" name="disable_translation" id="disable-translation" value="1" default="<?php echo DEFAULT_DISABLE_TRANSLATION; ?>" <?php if (get_disable_translation ()==AI_ENABLED) echo 'checked '; ?> />
            </td>
          </tr>
          <tr class="system-debugging" style="display: none;">
            <td>
              <label for="backend-js-debugging" title="Enable backend javascript console output">Backend javascript debugging</label>
            </td>
            <td>
              <input type="hidden" name="backend_js_debugging" value="0" />
              <input type="checkbox" name="backend_js_debugging" id="backend-js-debugging" value="1" default="<?php echo DEFAULT_BACKEND_JS_DEBUGGING; ?>" <?php if (get_backend_javascript_debugging ()==AI_ENABLED) echo 'checked '; ?> />
            </td>
          </tr>
          <tr class="system-debugging" style="display: none;">
            <td>
              <label for="frontend-js-debugging" title="Enable frontend javascript console output">Frontend javascript debugging</label>
            </td>
            <td>
              <input type="hidden" name="frontend_js_debugging" value="0" />
              <input type="checkbox" name="frontend_js_debugging" id="frontend-js-debugging" value="1" default="<?php echo DEFAULT_FRONTEND_JS_DEBUGGING; ?>" <?php if (get_frontend_javascript_debugging ()==AI_ENABLED) echo 'checked '; ?> />
            </td>
          </tr>
          <tr class="system-debugging" style="display: none;">
            <td>
              Installation
            </td>
            <td>
              <?php echo $install_timestamp != '' ? date ("Y-m-d H:i:s", $install_timestamp + get_option ('gmt_offset') * 3600) : "???"; ?>
            </td>
          </tr>
          <tr class="system-debugging" style="display: none;">
            <td>
              Age
            </td>
            <td>
             <?php if ($install_time != '') printf ('%04d-%02d-%02d %02d:%02d:%02d (%d days)',
                                                                                        $install_time->y,
                                                                                        $install_time->m,
                                                                                        $install_time->d,
                                                                                        $install_time->h,
                                                                                        $install_time->i,
                                                                                        $install_time->s,
                                                                                        $since_install); ?>
            </td>
          </tr>

  <?php if (defined ('AI_PLUGIN_TRACKING') && AI_PLUGIN_TRACKING) { ?>
          <tr class="system-debugging" style="display: none;">
            <td>
              Tracking
            </td>
            <td>
              <?php echo $tracking ? 'on' : 'off'; ?>
            </td>
          </tr>
  <?php } ?>

          <tr class="system-debugging" style="display: none;">
            <td>
              Review
            </td>
            <td>
              <?php echo $review; ?>
            </td>
          </tr>
  <?php if (function_exists ('ai_system_debugging')) ai_system_debugging (); ?>
        </table>
      </div>

     <?php if (function_exists ('ai_remote_management')) ai_remote_management (); ?>

    </div>

  </div>
</div> <!-- tab-0 -->

  </div> <!-- ai-tab-container -->

<?php  if (!isset ($_GET ['settings'])): // start of code only for normal settings ?>

</div> <!-- ai-container -->
<img id="ai-dummy-1" src="<?php echo AD_INSERTER_PLUGIN_URL, 'css/images/'; ?>blank.png" style="width: 1px; height: 1px; display: block; margin-top: -1px;" />

<?php

  $sidebar = 0;
  $number_of_used_blocks = count ($used_blocks);

  if (isset ($ai_wp_data [AI_DAYS_SINCE_INSTAL])) {
    if ($ai_wp_data [AI_DAYS_SINCE_INSTAL] >  2)
      $sidebar = 1;

    if ($number_of_used_blocks >=  4 && $ai_wp_data [AI_DAYS_SINCE_INSTAL] >  5 ||
                                        $ai_wp_data [AI_DAYS_SINCE_INSTAL] > 10)
      $sidebar = 2;

    if ($number_of_used_blocks >= 12 && $ai_wp_data [AI_DAYS_SINCE_INSTAL] >  7 ||
        $number_of_used_blocks >=  8 && $ai_wp_data [AI_DAYS_SINCE_INSTAL] > 10 ||
                                        $ai_wp_data [AI_DAYS_SINCE_INSTAL] > 15)
      $sidebar = 3;

    if ($ai_wp_data [AI_DAYS_SINCE_INSTAL] > 20)
      $sidebar = 4;

  } else {
      if ($number_of_used_blocks >= 1) $sidebar = 4;
    }

//  $sidebar = 0;

  if (!function_exists ('ai_settings_side'))  {

    switch ($sidebar) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        sidebar_addense_alternative ();
        break;
      case 3:
        sidebar_support_review ();
        sidebar_addense_alternative ();
        break;
      case 4:
        sidebar_addense_alternative ();
        break;
    }

  }
?>

<input id="ai-active-tab" type="hidden" name="ai-active-tab" value="[<?php echo $active_tab, ',', $active_tab_0; ?>]" />
<?php wp_nonce_field ('save_adinserter_settings'); ?>

<?php if (function_exists ('ai_mark_remote_connection')) ai_mark_remote_connection (); ?>

</form>

</div> <!-- #ai-settings -->

<div id="ai-sidebar" style="float: left;">

<?php
  if ($subpage == 'main') {
    page_checker_container ();
    ads_txt_container ();
    if (defined ('AI_ADSENSE_API')) {
      adsense_list_container ();
    }
    if (function_exists ('websites_list_container')) {
      websites_list_container ();
    }
    code_block_list_container ($start, $end, $active_tab);

    if (function_exists ('ai_settings_side')) {
      ai_settings_side ();
    } else {
      switch ($sidebar) {
        case 0:
          sidebar_help ();
//          sidebar_pro ();
          break;
        case 1:
//          sidebar_support_plugin ();
          sidebar_help ();
          sidebar_pro ();
          break;
        case 2:
//          sidebar_support_plugin ();
          sidebar_help ();
          sidebar_pro ();
          break;
        case 3:
//          sidebar_support_plugin ();
          sidebar_help ();
          sidebar_pro ();
          break;
        case 4:
//          sidebar_support_plugin ();
          sidebar_support_review ();
          sidebar_help ();
          sidebar_pro ();
          break;
      }
    }
  }
?>

  <img id="ai-dummy-2" src="<?php echo AD_INSERTER_PLUGIN_URL, 'css/images/'; ?>blank.png" style="width: 1px; height: 1px; display: block; margin-top: -1px;" />
</div>

<script type="text/javascript">
  jQuery(document).ready(function($) {
    setTimeout (check_blocked_images, 400);
  });

  function check_blocked_images () {

    function replace_blocked_image (image_id, image_src, css_display) {
      var image_selector = "#" + image_id;
      if (jQuery (image_selector).length && !jQuery(image_selector + ":visible").length) {
        blocking_counter ++;
        if (image_src != '') {
          var image = jQuery(image_selector);
          image.hide ().after (image.clone ().attr ('class', '').attr ("id", image_id + '-ajax').
          attr ('src', ajaxurl+'?action=ai_ajax_backend&image=' + image_src + '&ai_check=<?php echo wp_create_nonce ('adinserter_data'); ?>').
          css ('display', css_display));
        }
      }
    }

    function replace_blocked_css (css_id, css_src) {
      var css_selector = "#" + css_id;
      if (jQuery (css_selector).length) {
        var css = jQuery(css_selector);
        css.after (css.clone ().attr ("id", css_id + '-ajax').
        attr ('href', ajaxurl+'?action=ai_ajax_backend&css=' + css_src + '&ai_check=<?php echo wp_create_nonce ('adinserter_data'); ?>'));
      }
    }

    function replace_blocked_js (js_src) {
//      var js_selector = 'script[src*="'+js_src+'"]';
//      if (jQuery (js_selector).length) {
//        var js = jQuery(js_selector);
//        console.log ('src', ajaxurl+'?action=ai_ajax_backend&js=' + js_src + '&ai_check=<?php echo wp_create_nonce ('adinserter_data'); ?>');
//        js.after (js.clone ().attr ('src', ajaxurl+'?action=ai_ajax_backend&js=' + js_src + '&ai_check=<?php echo wp_create_nonce ('adinserter_data'); ?>'));
//      }

      var script = ajaxurl+'?action=ai_ajax_backend&js=' + js_src + '&ai_check=<?php echo wp_create_nonce ('adinserter_data'); ?>';
      jQuery.getScript (script, function (data, textStatus, jqxhr) {
//        console.log( data ); // Data returned
//        console.log( textStatus ); // Success
//        console.log( jqxhr.status ); // 200
//        console.log( "Load was performed." );
//      }).fail(function( jqxhr, settings, exception ) {
//        console.log ('FAIL');
//        console.log( jqxhr ); // Data returned
//        console.log( settings ); // Success
//        console.log( exception ); // 200
      });
    }

    function show_warining () {
      jQuery("#blocked-warning").attr ('title', message).show ();
      jQuery("#blocked-warning .blocked-warning-text").css ('color', '#00f');
    }

    jQuery("#blocked-warning.warning-enabled").show ();
    jQuery("#blocked-warning.warning-enabled .blocked-warning-text").css ('color', '#00f');

    var blocking_counter = 0;

<?php
    if (!function_exists ('ai_settings_side')) {
?>
    replace_blocked_image ('ai-media-1',    'contextual-1.gif',     'block');
    replace_blocked_image ('ai-media-2',    'contextual-2.jpg',     'block');
    replace_blocked_image ('ai-media-3',    'contextual-3.png',     'block');
    replace_blocked_image ('ai-media-4',    'contextual-4.gif',     'block');
    replace_blocked_image ('ai-media-5',    'contextual-5.png',     'block');
    replace_blocked_image ('ai-media-6',    'contextual-6.gif',     'block');
    replace_blocked_image ('ai-media-7',    'contextual-7.gif',     'block');
    replace_blocked_image ('ai-media-8',    'contextual-8.gif',     'block');
    replace_blocked_image ('ai-media-9',    'contextual-9.jpg',     'block');
    replace_blocked_image ('ai-info-1',     'info-1.jpg',           'block');
    replace_blocked_image ('ai-info-2',     'info-2.jpg',           'block');
    replace_blocked_image ('ai-info-3',     'info-3.jpg',           'block');
    replace_blocked_image ('ai-ez-1',       'ez-1.jpg',             'block');
    replace_blocked_image ('ai-ez-2',       'ez-2.jpg',             'block');
    replace_blocked_image ('ai-ez-3',       'ez-3.png',             'block');
    replace_blocked_image ('ai-ez-4',       'ez-4.png',             'block');
    replace_blocked_image ('ai-ez-5',       'ez-5.png',             'block');
    replace_blocked_image ('ai-ez-6',       'ez-6.png',             'block');
    replace_blocked_image ('ai-ez-7',       'ez-7.jpg',             'block');
    replace_blocked_image ('ai-ez-8',       'ez-8.jpg',             'block');
    replace_blocked_image ('ai-sa-1',       'sa-1.png',             'block');
    replace_blocked_image ('ai-sa-2',       'sa-2.gif',             'block');
    replace_blocked_image ('ai-ap-1',       'ap-1.png',             'block');
    replace_blocked_image ('ai-ap-2',       'ap-2.png',             'block');
    replace_blocked_image ('ai-um-1',       'um-1.png',             'block');
    replace_blocked_image ('ai-um-2',       'um-2.png',             'block');
    replace_blocked_image ('ai-pro-1',      'icon-256x256.jpg',     'block');
    replace_blocked_image ('ai-pro-2',      'ai-charts-250.png',    'block');
    replace_blocked_image ('ai-pro-3',      'ai-countries-250.png', 'block');
    replace_blocked_image ('ai-preview',    'ai-preview-250.png',   'block');
    replace_blocked_image ('ai-adb',        'ai-adb.png',           'block');
    replace_blocked_image ('ai-amp',        'ai-amp.png',           'block');
    replace_blocked_image ('ai-stars-img',  'stars.png',            'inline');
<?php
    } else {
?>
    replace_blocked_image ('ai-dummy-1', '', '');
    replace_blocked_image ('ai-dummy-2', '', '');
<?php
      }
?>

    if (blocking_counter >= 2) {
      var message = 'Ad blocking test: ' + blocking_counter + ' images not loaded';
      console.log ('AI AD BLOCKING:', blocking_counter, 'images not loaded');

      show_warining ();

      setTimeout (function() {
        show_warining ();
      }, 2000);

      setTimeout (function() {
        show_warining ();
      }, 5000);

//      replace_blocked_image ('ai-loading',    'loading.gif',     'block'); // new ids not used in js
//      replace_blocked_image ('ai-loading-2',  'loading.gif',     'block');

      replace_blocked_css ('ai-admin-css',                'ai-settings.css');
      replace_blocked_css ('ai-admin-jquery-ui-css',      'jquery-ui-1.10.3.custom.min.css');
      replace_blocked_css ('ai-admin-flags-css',          'flags.css');
      replace_blocked_css ('ai-admin-multi-select-css',   'multi-select.css');
      replace_blocked_css ('ai-image-picker-css',         'image-picker.css');
      replace_blocked_css ('ai-combobox-css-css',         'jquery.scombobox.min.css');
      replace_blocked_css ('ai-admin-gen-css',            'ai-admin.css');
//      replace_blocked_css ('puc-debug-bar-style-v4-css',  'includes/update-checker/css/puc-debug-bar.css');

//      replace_blocked_js ('ad-inserter.js');
    }
  }
</script>

<?php

  endif; // end of code only for normal settings

  if (isset ($_POST [AI_FORM_SAVE])) {
    if (function_exists ('ai_save_settings')) ai_save_settings ();
  }

} // generate_settings_form ()

function get_sidebar_widgets () {

  if (function_exists ('ai_sidebar_widgets')) {
    $sidebar_widgets = ai_sidebar_widgets ();
    if (is_array ($sidebar_widgets)) return $sidebar_widgets;
  }

  $sidebar_widgets = wp_get_sidebars_widgets();
  $widget_options = get_option ('widget_ai_widget');

  $sidebars_with_widgets = array ();
//  for ($block = $start; $block <= $end; $block ++){
  for ($block = 1; $block <= 96; $block ++){
    $sidebars_with_widget [$block]= array ();
  }
  foreach ($sidebar_widgets as $sidebar_index => $sidebar_widget) {
    if (is_array ($sidebar_widget) && isset ($GLOBALS ['wp_registered_sidebars'][$sidebar_index]['name'])) {
      $sidebar_name = $GLOBALS ['wp_registered_sidebars'][$sidebar_index]['name'];
      if ($sidebar_name != "") {
        foreach ($sidebar_widget as $widget) {
          if (preg_match ("/ai_widget-([\d]+)/", $widget, $widget_id)) {
            if (isset ($widget_id [1]) && is_numeric ($widget_id [1])) {
              $widget_option = $widget_options [$widget_id [1]];
              $widget_block = $widget_option ['block'];
//              if ($widget_block >= $start && $widget_block <= $end && !in_array ($sidebar_name, $sidebars_with_widget [$widget_block])) {
              if ($widget_block >= 1 && $widget_block <= 96 && !in_array ($sidebar_name, $sidebars_with_widget [$widget_block])) {
                $sidebars_with_widget [$widget_block] []= $sidebar_name;
              }
            }
          }
        }
      }
    }
  }

  return $sidebars_with_widget;
}

function page_checker_container () {
  global $ai_custom_hooks;

  if (function_exists ('ai_settings_theme')) {
    $current_theme = ai_settings_theme ();
  } else $current_theme = wp_get_theme ();

?>
  <div id="page-checker-container" class="ai-check-pages ai-form responsive-table rounded" style="background: rgb(255, 255, 255); display: none;">
    <div style="margin-bottom: 10px; min-height: 24px;">
      <?php echo __('Available positions for current theme', 'ad-inserter'), " <strong>", $current_theme->get ('Name'), " ", $current_theme->get ('Version'); ?></strong>
      <span class="ai-error-message" style="margin-left: 30px; color: #f00; display: none;"><?php _e ('Error checking pages', 'ad-inserter'); ?>: <span class="ai-error-message-text"></span></span>
      <div style="float: right;">
        <img id="ai-loading-2" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>loading.gif" style="width: 24px; height: 24px; vertical-align: middle; margin-right: 10px; display: none;" />
        <button type="button" id="check-pages-button" style="display: none; margin-right: 4px;" title="<?php _e ('Toggle theme checker for available positions for automatic insertion', 'ad-inserter'); ?>"><?php _ex ('Check', 'Button', 'ad-inserter'); ?></button>
      </div>
      <div style="clear: both;"></div>
    </div>
    <table cellspacing="0" cellpadding="0" class="check-pages">
      <tbody>
        <tr>
          <th style="width: 10%; text-align: left;"><?php _e ('Position', 'ad-inserter'); ?></th>
          <th style="width: 15%;"><?php _e ('Posts', 'ad-inserter'); ?></th>
          <th style="width: 15%;"><?php _e ('Static pages', 'ad-inserter'); ?></th>
          <th style="width: 15%;"><?php _e ('Homepage', 'ad-inserter'); ?></th>
          <th style="width: 15%;"><?php _e ('Category pages', 'ad-inserter'); ?></th>
          <th style="width: 15%;"><?php _e ('Archive pages', 'ad-inserter'); ?></th>
          <th style="width: 15%;"><?php _e ('Search pages', 'ad-inserter'); ?></th>
        </tr>
        <tr>
          <th style="min-height: 18px;">&nbsp;</th>
          <th><a class="simple-link ai-po" target="_blank"><span class="dashicons dashicons-external"></span></a><a class="simple-link ai-po" target="_blank"><span class="dashicons dashicons-external"></span></a></th>
          <th><a class="simple-link ai-pa" target="_blank"><span class="dashicons dashicons-external"></span></a><a class="simple-link ai-po" target="_blank"><span class="dashicons dashicons-external"></span></a></th>
          <th><a class="simple-link ai-hp" target="_blank"><span class="dashicons dashicons-external"></span></a><a class="simple-link ai-po" target="_blank"><span class="dashicons dashicons-external"></span></a></th>
          <th><a class="simple-link ai-cp" target="_blank"><span class="dashicons dashicons-external"></span></a><a class="simple-link ai-po" target="_blank"><span class="dashicons dashicons-external"></span></a></th>
          <th><a class="simple-link ai-ap" target="_blank"><span class="dashicons dashicons-external"></span></a><a class="simple-link ai-po" target="_blank"><span class="dashicons dashicons-external"></span></a></th>
          <th><a class="simple-link ai-sp" target="_blank"><span class="dashicons dashicons-external"></span></a><a class="simple-link ai-po" target="_blank"><span class="dashicons dashicons-external"></span></a></th>
        </tr>
<?php

// To check
// ai-button2
// ai-button-updating

  $insertions = array ();
  $insertions [AI_AUTOMATIC_INSERTION_ABOVE_HEADER] = AI_TEXT_ABOVE_HEADER;
  $insertions [AI_AUTOMATIC_INSERTION_BEFORE_POST] = AI_TEXT_BEFORE_POST;
  $insertions [AI_AUTOMATIC_INSERTION_BEFORE_CONTENT] = AI_TEXT_BEFORE_CONTENT;
  $insertions [AI_AUTOMATIC_INSERTION_BEFORE_PARAGRAPH] = AI_TEXT_BEFORE_PARAGRAPH;
  $insertions [AI_AUTOMATIC_INSERTION_AFTER_PARAGRAPH] = AI_TEXT_AFTER_PARAGRAPH;
  $insertions [AI_AUTOMATIC_INSERTION_BEFORE_IMAGE] = AI_TEXT_BEFORE_IMAGE;
  $insertions [AI_AUTOMATIC_INSERTION_AFTER_IMAGE] = AI_TEXT_AFTER_IMAGE;
  $insertions [AI_AUTOMATIC_INSERTION_AFTER_CONTENT] = AI_TEXT_AFTER_CONTENT;
  $insertions [AI_AUTOMATIC_INSERTION_AFTER_POST] = AI_TEXT_AFTER_POST;
  $insertions [AI_AUTOMATIC_INSERTION_FOOTER] = AI_TEXT_FOOTER;
  $insertions [AI_AUTOMATIC_INSERTION_BETWEEN_POSTS] = AI_TEXT_BETWEEN_POSTS;
  $insertions [AI_AUTOMATIC_INSERTION_BEFORE_EXCERPT] = AI_TEXT_BEFORE_EXCERPT;
  $insertions [AI_AUTOMATIC_INSERTION_AFTER_EXCERPT] = AI_TEXT_AFTER_EXCERPT;
  $insertions [AI_AUTOMATIC_INSERTION_BEFORE_COMMENTS] = AI_TEXT_BEFORE_COMMENTS;
  $insertions [AI_AUTOMATIC_INSERTION_BETWEEN_COMMENTS] = AI_TEXT_BETWEEN_COMMENTS;
  $insertions [AI_AUTOMATIC_INSERTION_AFTER_COMMENTS] = AI_TEXT_AFTER_COMMENTS;
  foreach ($ai_custom_hooks as $hook_index => $custom_hook) {
    $insertions [AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + $custom_hook ['index'] - 1] = $custom_hook ['name'];
  }

  $counter = 0;
  foreach ($insertions as $insertion_type => $insertion_name) {
//    $single = true;
//    $blog = true;
//    switch ($insertion_type) {
//      case AI_AUTOMATIC_INSERTION_BEFORE_EXCERPT:
//      case AI_AUTOMATIC_INSERTION_AFTER_EXCERPT:
//      case AI_AUTOMATIC_INSERTION_BETWEEN_POSTS:
//        $single = false;
//        break;

//      case AI_AUTOMATIC_INSERTION_BEFORE_COMMENTS:
//      case AI_AUTOMATIC_INSERTION_BETWEEN_COMMENTS:
//      case AI_AUTOMATIC_INSERTION_AFTER_COMMENTS:
//        $blog = false;
//        break;
//    }

  if ($insertion_type == AI_AUTOMATIC_INSERTION_ABOVE_HEADER && (!defined ('AI_BUFFERING') || !get_output_buffering ())) {
    $class = '';
    $title = __('Position not available because output buffering (tab [*]) is not enabled', 'ad-inserter');
  } else {
      $class = 'ai-position ';
      $title = __('Position not checked yet', 'ad-inserter');;
    }
?>
        <tr style="background: <?php echo $counter %2 == 0 ? '#eee' : '#fff'; ?>">
          <td data-insertion="<?php echo $insertion_type; ?>" class="ai-position-name" style="text-align: left; padding-right: 10px;"><?php echo $insertion_name; ?></td>
          <td data-insertion="<?php echo $insertion_type; ?>" class="<?php echo $class; ?>ai-po ai-not-checked" style="" title="<?php echo $title; ?>">&#9679;</td>
          <td data-insertion="<?php echo $insertion_type; ?>" class="<?php echo $class; ?>ai-pa ai-not-checked" style="" title="<?php echo $title; ?>">&#9679;</td>
          <td data-insertion="<?php echo $insertion_type; ?>" class="<?php echo $class; ?>ai-hp ai-not-checked" style="" title="<?php echo $title; ?>">&#9679;</td>
          <td data-insertion="<?php echo $insertion_type; ?>" class="<?php echo $class; ?>ai-cp ai-not-checked" style="" title="<?php echo $title; ?>">&#9679;</td>
          <td data-insertion="<?php echo $insertion_type; ?>" class="<?php echo $class; ?>ai-ap ai-not-checked" style="" title="<?php echo $title; ?>">&#9679;</td>
          <td data-insertion="<?php echo $insertion_type; ?>" class="<?php echo $class; ?>ai-sp ai-not-checked" style="" title="<?php echo $title; ?>">&#9679;</td>
        </tr>
<?php
    $counter ++;
  }
?>
      </tbody>
    </table>
  </div>
<?php
}

function code_block_list_container ($start, $end, $active_block) {
  $blocks_sticky = function_exists ('ai_block_list_buttons') ? get_blocks_sticky () : false;
?>
  <div id="ai-list-container" class="ai-form rounded" style="background: #fff; <?php echo $blocks_sticky ? '' : 'display: none;'; ?>">
    <div id='ai-list-controls' class='ui-widget' style='margin: 0 auto 8px;'>
      <span style="vertical-align: middle; float: left;">
        <input id="ai-list-search" type="text" value="" size="35" maxlength="40" />
      </span>

<?php
    if (function_exists ('ai_block_list_buttons')) ai_block_list_buttons ($blocks_sticky);
?>

      <span style="float: right;">
        <span id="ai-load-all" class="checkbox-button dashicons dashicons-lightbulb light-blue" title="<?php _e ('Toggle active/all blocks', 'ad-inserter'); ?>"></span>
      </span>

<?php if (!function_exists ('ai_settings_write') || ai_settings_write ()): ?>
      <span style="margin-right: 10px; float: right;">
        <span id="ai-rearrange" class="checkbox-button dashicons dashicons-sort" title="<?php _e ('Rearrange block order', 'ad-inserter'); ?>"></span>
      </span>
<?php endif; ?>

      <span id='list-rearrange-controls' style="margin-right: 10px; float: right; display: none;">
        <span id="list-save" style="display: none;">
          <span id="ai-save-changes" class="checkbox-button dashicons dashicons-yes-alt green" title="<?php _e ('Save new block order', 'ad-inserter'); ?>"></span>
        </span>
      </span>

      <div style="clear: both;"></div>
    </div>

    <div id="ai-list-data"<?php echo $blocks_sticky ? ' class="ai-sticky"' :''; ?>>
      <?php echo $blocks_sticky ? code_block_list ($start, $end, '', false, $active_block) : __ ('Loading...', 'ad-inserter'); ?>
    </div>
  </div>
<?php
}

if (defined ('AI_ADSENSE_API')) {

function adsense_list_container () {
?>
  <div id="adsense-list-container" class="ai-form rounded" style="background: #fff; display: none;">
    <div id='adsense-list-controls' class='ui-widget' style='margin: 0 auto 8px; display: none;'>
      <span style="vertical-align: middle; float: left;">
        <input id="adsense-list-search" type="text" value="" size="40" maxlength="40" />
      </span>

      <span class="ai-toolbar-button small" style="vertical-align: middle; float: right;">
        <input type="checkbox" value="0" id="adsense-load-all" style="display: none;" />
        <label class="checkbox-button" for="adsense-load-all" title="<?php _e ('Toggle active/all ad units', 'ad-inserter'); ?>"><span class="checkbox-icon size-16 icon-enabled-all on"></span></label>
      </span>
      <span class="ai-toolbar-button small" style="vertical-align: middle; float: right;">
        <input type="checkbox" value="0" id="adsense-reload" style="display: none;" />
        <label class="checkbox-button" for="adsense-reload" title="<?php _e ('Reload AdSense ad units', 'ad-inserter'); ?>"><span class="checkbox-icon size-16w icon-reload"></span></label>
      </span>
      <span class="ai-toolbar-button small" style="vertical-align: middle; float: right;">
          <input type="checkbox" value="" id="clear-adsense-authorization" style="display: none;" />
          <label class="checkbox-button" for="clear-adsense-authorization" title="<?php _e ('Clear authorization to access AdSense account', 'ad-inserter'); ?>"><span class="list-button lb-size-16 ui-icon ui-icon-power"></span></label>
      </span>
      <span class="ai-toolbar-button small" style="vertical-align: middle; float: right;">
        <input type="checkbox" value="0" id="google-adsense" style="display: none;" />
        <label class="checkbox-button" id="google-adsense-button" for="google-adsense" title="<?php _e ('Google AdSense Homepage', 'ad-inserter'); ?>" onclick="window.open('https://www.google.com/adsense/login')" ><span class="checkbox-icon size-img16 size-img16a icon-adsense"></span></label>
      </span>
      <div style="clear: both;"></div>
    </div>

    <div id="adsense-list-data">
      <?php _e ('Loading...', 'ad-inserter'); ?>
    </div>
  </div>
<?php
}

}

function ads_txt_container () {
  $rw = !function_exists ('ai_settings_write') || ai_settings_write ();

  if (function_exists ('ai_settings_virtual_ads_txt')) {
    $virtual_ads_txt = ai_settings_virtual_ads_txt ();
  } else $virtual_ads_txt = get_option (AI_ADS_TXT_NAME) !== false;

  $virtual_text  = $rw ? __ ('Switch to physical ads.txt file', 'ad-inserter') : '';
  $physical_text = $rw ? __ ('Switch to virtual ads.txt file', 'ad-inserter') : '';
  $virtual_title = $virtual_ads_txt ? $virtual_text : $physical_text;
  $virtual_id    = $rw ? 'id="ads-txt-virtual"' : '';

  if (function_exists ('ai_home_url')) {
    $home_url = ai_home_url ();
  } else $home_url = home_url ();

  $url_data = parse_url ($home_url);

  $ads_txt_file = $url_data ['scheme'] . '://' . $url_data ['host'] . '/ads.txt';

?>
  <div id="ads-txt-container" class="ai-form rounded" style="background: #fff; display: none;">
    <div id='ads-txt-controls' class='ui-widget' style='margin: 0 auto 8px; display: none;'>
      <span style="vertical-align: middle; float: left;">
        <input id="ads-txt-search" type="text" value="" size="40" maxlength="40" />
      </span>

      <span style="float: right;">
        <label class="checkbox-button iab-ads-txt" title="<?php /* translators: %s: ads.txt */ echo sprintf (__('Open %s', 'ad-inserter'), $ads_txt_file); ?>" onclick="window.open('<?php echo $ads_txt_file; ?>')"><span class="checkbox-icon icon-ads-txt"></span></label>
      </span>

      <span style="margin-right: 10px; float: right;">
        <span <?php echo $virtual_id; ?> class="checkbox-button dashicons dashicons-shield<?php echo $virtual_ads_txt ? ' violet' : ''; ?>" title="<?php echo $virtual_title; ?>" title-virtual="<?php echo $virtual_text; ?>" title-physical="<?php echo $physical_text; ?>"></span>
      </span>

      <span style="margin-right: 10px; float: right;">
        <span id="ads-txt-reload" class="checkbox-button dashicons dashicons-download" title="<?php _e ('Reload ads.txt file', 'ad-inserter'); ?>" title-editor="<?php _e ('Cancel', 'ad-inserter'); ?>" title-table="<?php _e ('Reload ads.txt file', 'ad-inserter'); ?>"></span>
      </span>

      <?php if ($rw): ?>

      <span style="margin-right: 10px; float: right;">
        <span id="ads-txt-editor" class="checkbox-button dashicons dashicons-edit" title="<?php _e ('Edit', 'ad-inserter'); ?>" title-editor="<?php _e ('Save', 'ad-inserter'); ?>" title-table="<?php _e ('Edit', 'ad-inserter'); ?>" ></span>
      </span>

      <?php endif; ?>

      <div style="clear: both;"></div>
    </div>

    <div id="ads-txt-error" style="margin: 0 0 8px; color: red;"></div>

    <div id="ads-txt-data">
      <?php _e ('Loading...', 'ad-inserter'); ?>
    </div>
  </div>
<?php
}


function ads_txt ($action) {
  global $block_object;

  $block_ads = array ();

  for ($block = 1; $block <= 96 + 3; $block ++) {
    switch ($block) {
      case 96 + 1:
        $obj = $block_object [AI_HEADER_OPTION_NAME];
        break;
      case 96 + 2:
        $obj = $block_object [AI_FOOTER_OPTION_NAME];
        break;
      case 96 + 3:
        $obj = $block_object [AI_ADB_MESSAGE_OPTION_NAME];
        break;
      default:
        $obj = $block_object [$block];
        break;
    }
    $block_code = $obj->get_ad_data ();

//  data-ad-client="ca-pub-3118622027477755"
    if (preg_match_all ('#data-ad-client\s*=\s*"(.+?)"#', $block_code, $adsense_matches)) {
      foreach ($adsense_matches [1] as $adsense_match) {
        if (preg_match ('#(pub-[0-9]+)#', $adsense_match, $adsense_pub_id)) {
          $found = false;
          foreach ($block_ads as $block_ad) {
            if ($block_ad ['ads_data'][1] == $adsense_pub_id [1]) {
              $found = true;
              break;
            }
          }
          if (!$found) {
            $block_ads [] = array ('ads_data' => array ('google.com', $adsense_pub_id [1], 'DIRECT', 'f08c47fec0942fa0'), 'found' => false);
          }
        }
      }
    }

//  google_ad_client = "ca-pub-3118622027477755";
    if (preg_match_all ('#google_ad_client\s*=\s*"(.+?)"#', $block_code, $adsense_matches)) {
      foreach ($adsense_matches [1] as $adsense_match) {
        if (preg_match ('#(pub-[0-9]+)#', $adsense_match, $adsense_pub_id)) {
          $found = false;
          foreach ($block_ads as $block_ad) {
            if ($block_ad ['ads_data'][1] == $adsense_pub_id [1]) {
              $found = true;
              break;
            }
          }
          if (!$found) {
            $block_ads [] = array ('ads_data' => array ('google.com', $adsense_pub_id [1], 'DIRECT', 'f08c47fec0942fa0'), 'found' => false);
          }
        }
      }
    }
  }

  $site_url = site_url ();
  $home_url = home_url ();

  $url_parts = explode (DIRECTORY_SEPARATOR, str_replace (array ('https', 'http', '://'), '', $site_url));
  $ads_txt_home = 'http' . (is_ssl() ? 's' : '') . '://'. $url_parts [0];
  $ads_txt_url = $ads_txt_home . DIRECTORY_SEPARATOR . 'ads.txt';

  $wp_content_dir_array = explode ('/', WP_CONTENT_DIR);
  $wp_content_dir = $wp_content_dir_array [count ($wp_content_dir_array) - 1];

  $root_path = str_replace ($wp_content_dir, '', WP_CONTENT_DIR);
  $ads_txt_file = $root_path . 'ads.txt';

  $wp_folder = '';
  if (count ($url_parts) > 1) {
    $wp_folder = str_replace ($ads_txt_home, '', $site_url);
    $wp_folder = str_replace ('/', DIRECTORY_SEPARATOR, $wp_folder);
  }

  echo '<div class="rounded system-debugging" style="display: none;">';
  echo "<pre style='margin: 0;'>\n";
  echo "site_url       ", site_url (), "\n";
  echo "home_url       ", home_url (), "\n";
  echo "ads_txt_home   ", $ads_txt_home, "\n";
  echo "wp_folder      ", $wp_folder, "\n";
  echo "ABSPATH        ", ABSPATH, "\n";
  echo "WP_CONTENT_DIR ", WP_CONTENT_DIR, "\n";
  echo "root_path      ", $root_path, "\n";
  echo "</pre>\n";
  echo '</div>';

  $virtual = isset ($_GET ["virtual"]) && $_GET ["virtual"];
  $virtual_file_missing = false;

  if ($virtual) {
    $ads = get_option (AI_ADS_TXT_NAME);
    if ($ads === false) {
      $virtual_file_missing = true;
      $ads = '';
      if ($action == 'table') {
        $action = 'text';
      }
    }
  } else {
      if (file_exists ($ads_txt_file)) {
        $ads = file_get_contents ($ads_txt_file);
      } else {
          $ads = '';
          if ($action == 'table') {
            $action = 'text';
          }
        }
    }

  $ads_lines = explode ("\n", $ads);

  $rows = array ();
  foreach ($ads_lines as $ads_line) {
    if (trim ($ads_line) == '') continue;

    $ads_data = explode ('#', str_replace (array ("\r", ' '), '', $ads_line));
    $ads_elements = explode (',', $ads_data [0]);

    if (count ($ads_elements) == 0) continue;

    $found = false;
    foreach ($block_ads as $index => $block_ad) {
      if (!isset ($ads_elements [1])) continue;

      if ($block_ad ['ads_data'][1] == $ads_elements [1]) {
        $found = true;
        $block_ads [$index]['found'] = true;
        break;
      }
    }

    $rows []= array ('ads_elements' => $ads_elements, 'status' => $found ? 'F' : '');
  }

  $missing_lines = array ();
  foreach ($block_ads as $block_ad) {
    if (!$block_ad ['found']) {
      array_unshift ($rows, array ('ads_elements' => $block_ad ['ads_data'], 'status' => 'M'));
      $missing_lines []= implode (', ', $block_ad ['ads_data']);
    }
  }

  $search_text = isset ($_GET ["search"]) ? trim (esc_html ($_GET ["search"])) : '';
  if ($search_text != '') $search_array = explode (' ', $search_text); else $search_array = array ();
  foreach ($rows as $index => $row) {
    $ads_line = implode (' ', $row ['ads_elements']);
    foreach ($search_array as $search_item) {
      if (stripos ($ads_line, trim ($search_item)) === false) {
        unset ($rows [$index]);
        continue 2;
      }
    }
  }

  switch ($virtual) {
    case true:
      echo '<div class="rounded">';
                         // translators: %s: Ad Inserter
      echo '<div>', sprintf (__('ads.txt file: %s virtual ads.txt file', 'ad-inserter'), AD_INSERTER_NAME), '</div>';
      echo '</div>';

      if ($virtual_file_missing) {
        echo '<div id="ads-txt-missing" class="rounded">';
        echo '<div><strong><span style="color: red;">', __('Warning', 'ad-inserter'), ':</span></strong> ', /* translators: %s: Ad Inserter */ sprintf (__('%s virtual file ads.txt not found', 'ad-inserter'), AD_INSERTER_NAME), '</div>';
        echo '</div>';
      }
      break;
    default:
      echo '<div class="rounded">';

      if ($wp_folder != '') {
        echo '<div><strong><span style="color: red;">', __('IMPORTANT', 'ad-inserter'), '</span>: ', __('ads.txt file must be placed on the root domain', 'ad-inserter'), ' <a href="', $ads_txt_url, '" target="_blank" class="simple-link">', $ads_txt_url, '</a></strong></div>';
        echo '<hr>';
      }
      echo '<table border-spacing="0" cell-spacing="0"><tbody>';
      echo '<tr><td style="padding-right: 20px; font-weight: bold;">WordPress</td><td>', ABSPATH, '</td></tr>';
      echo '<tr><td style="padding-right: 20px; font-weight: bold;">', __('ads.txt file', 'ad-inserter'), '</td><td>', $ads_txt_file, is_writable ($ads_txt_file) ? '' : '<span style="margin-left: 20px; color: red;">'.__('NOT WRITABLE', 'ad-inserter').'</span>', '</td></tr>';
      echo '</tbody></table>';

      echo '</div>';

      if (!file_exists ($ads_txt_file)) {
        echo '<div id="ads-txt-missing" class="rounded">';
        echo '<div><strong><span style="color: red;">', __('Warning', 'ad-inserter'), ':</span></strong> ', sprintf (__('file %s not found', 'ad-inserter'), $ads_txt_file), '</div>';
        echo '</div>';
      }
      break;
  }

//  $missing_lines = array ();
  switch ($action) {
    case 'text':
      if (count ($missing_lines)) {
        echo '<div>', __('Account IDs found in blocks but not present in the ads.txt file', 'ad-inserter'), '</div>';
        echo '<textarea disabled style="width: 100%; font-family: monospace, Courier, \'Courier New\'; font-size: 12px;" rows="', count ($missing_lines), '">';
        echo implode ("\n", $missing_lines);
        echo '</textarea>';
        if ($virtual) {
                                              // translators: %s: Ad Inserter
          echo '<div style="margin-top: 8px;">', sprintf (__('%s virtual ads.txt file', 'ad-inserter'), AD_INSERTER_NAME), '</div>';
        } else {
            echo '<div style="margin-top: 8px;">', $ads_txt_file, '</div>';
          }
      }
      echo '<textarea id="ads-txt-text" style="width: 100%; height: 700px; font-family: monospace, Courier, \'Courier New\'; font-size: 12px;">';
      echo $ads;
      echo '</textarea>';

      if (!$virtual) {
        delete_option (AI_ADS_TXT_NAME);
      }
      ai_add_rewrite_rules ();
      flush_rewrite_rules();

      break;
    case 'table':

?>
    <table id="ads-txt-table" class="exceptions" cellspacing=0 cellpadding=0 style="width: 100%;">
      <thead>
        <tr>
          <th style="text-align: left;"><?php _e ('Advertising system', 'ad-inserter'); ?></th>
          <th style="text-align: left;"><?php _e ('Account ID', 'ad-inserter'); ?></th>
          <th style="text-align: left;"><?php _e ('Type', 'ad-inserter'); ?></th>
          <th style="text-align: left;"><?php _e ('Certification authority ID', 'ad-inserter'); ?></th>
        </tr>
      </thead>
      <tbody>
<?php

      $row_counter = 0;
      foreach ($rows as $row) {
        $row_counter ++;

        $ads_elements = $row ['ads_elements'];

        switch ($row ['status']) {
          case 'F':
            $row_color = $row_counter % 2 == 0 ? '#D4FFD8' : '#CDF7D1';
            $title = __('Account ID found in block and present in ads.txt', 'ad-inserter');
            break;
          case 'M':
            $row_color = $row_counter % 2 == 0 ? '#FFC9C9' : '#F7C2C2';
            $title = __('Account ID found in block but not present in ads.txt', 'ad-inserter');
            break;
          default:
            $row_color = $row_counter % 2 == 0 ? '#eee' : '#fff';
            $title = '';
            break;
        }

        $variable = count ($ads_elements) == 1 && strpos ($ads_elements [0], '=') !== false;

        if (isset ($ads_elements [3])) {
          if (strlen ($ads_elements [3]) == 16) {
            $element3 = '<a href="https://tag-members-prod.herokuapp.com/registry/lookup?q='.$ads_elements [3].'" class="simple-link" style="color: #021b79;" target="_blank">'.$ads_elements [3] .'</a>';
          } else $element3 = $ads_elements [3];
        } else $element3 = '';

?>
        <tr style="background: <?php echo $row_color; ?>" title="<?php echo $title; ?>">
          <td style="padding-right: 10px;<?php echo $variable ? ' color: #3959ff;' : ''; ?>" <?php echo $variable ? ' colspan="4"' : ''; ?>>
            <?php echo isset ($ads_elements [0]) ? $ads_elements [0] : ''; ?>
          </td>
<?php
        if (!$variable):
?>
          <td style="padding-right: 10px;">
            <?php echo isset ($ads_elements [1]) ? $ads_elements [1] : ''; ?>
          </td>
          <td style="padding-right: 10px;">
            <?php echo isset ($ads_elements [2]) ? $ads_elements [2] : ''; ?>
          </td>
          <td>
            <?php echo $element3; ?>
          </td>
<?php
        endif;
?>
        </tr>
<?php
      }
?>
      </tbody>
    </table>
<?php
      if (!$virtual) {
        delete_option (AI_ADS_TXT_NAME);
      }
      ai_add_rewrite_rules ();
      flush_rewrite_rules();

      break;
    case 'save':
      if (isset ($_POST ['text'])) {
        $text = esc_html (@base64_decode ($_POST ['text']));
      } else $text = '';

      if ($virtual) {
        if (isset ($_POST ['text'])) {
          if ($text != '') {
            update_option (AI_ADS_TXT_NAME, $text);
          } else {
              delete_option (AI_ADS_TXT_NAME);
            }
          ai_add_rewrite_rules ();
          flush_rewrite_rules();
        }
      } else {
          if (isset ($_POST ['text']) && is_writable (dirname ($ads_txt_file))) {
            @file_put_contents ($ads_txt_file, $text);
          }
        }
      break;
  }
}

function ai_change_settings () {
  global $block_object, $ai_db_options_extract;

  if (!function_exists ('ai_settings_write') || (ai_settings_write ())) {
    $command = isset ($_GET ["cmd"]) ? esc_html ($_GET ["cmd"]) : null;
    $block = isset ($_GET ["cmd-block"]) ? (int) $_GET ["cmd-block"] : null;

    if ($block === null || $block < 1 || $block > 96 || $command === null) {
      return;
    }

    $ai_options = false;

    if (function_exists ('ai_raw_remote_options')) {
      $ai_options = ai_raw_remote_options ();
    }

    if ($ai_options === false) $ai_options = ai_get_option (AI_OPTION_NAME, array ());

    $update_settings = false;

    switch ($command) {
      case 'pause':
        $value = $block_object [$block]->get_disable_insertion () == AI_DISABLED ? AI_ENABLED : AI_DISABLED;
        $ai_options [$block][AI_OPTION_DISABLE_INSERTION] = $value;

        $update_settings = true;
        break;
    }

    if ($update_settings) {
      ai_save_options ($ai_options);
    }
  }
}

function ai_update_block_numbers ($blocks_org, $blocks_new) {
  global $wpdb;

  $ai_widgets = get_option ('widget_ai_widget');
  if (is_array ($ai_widgets))
    foreach ($ai_widgets as $widget_index => $ai_widget) {
      if (isset ($ai_widget ['block'])) {
        $widget_block = $ai_widget ['block'];
        if ($widget_block >= 1 && $widget_block <= 96) {
          foreach ($blocks_new as $index => $org_block) {
            if ($widget_block == $org_block) {
              $ai_widgets [$widget_index]['block'] = $blocks_org [$index];
              break;
            }
          }
        }
      }
    }
  update_option ('widget_ai_widget', $ai_widgets);

  if (defined ('AI_STATISTICS') && AI_STATISTICS) {
    // Update statistics - two passes to avoid duplicate entries

    $offset = 1000;

    // Lock table to prevent updates of old blocks
    $query  = 'LOCK TABLES ' . AI_STATISTICS_DB_TABLE . ' WRITE;';
    $update = $wpdb->query ($query);

    // Pass 1 - new blocks with offset
    $query  = 'UPDATE ' . AI_STATISTICS_DB_TABLE . ' SET block= CASE ';
    foreach ($blocks_new as $index => $org_block) {
      $new_block = $blocks_org [$index] + $offset;
      $query .= "WHEN block= $org_block THEN $new_block ";
    }
    $query .= 'ELSE block END;';
    $update = $wpdb->query ($query);

    // Pass 2 - remove offset
    $query  = 'UPDATE ' . AI_STATISTICS_DB_TABLE . " SET block = block - $offset WHERE block >= $offset;";
    $update = $wpdb->query ($query);

    // Unlock table
    $query  = 'UNLOCK TABLES;';
    $update = $wpdb->query ($query);
  }
}

function code_block_list ($start, $end, $search_text, $show_all_blocks, $active_block) {
  global $block_object, $ai_db_options_extract;

  if (defined ('AI_SAFE_MODE') || isset ($_GET ['safe-mode'])) {
    $url_safe_mode = '&ai-safe-mode';
  } else $url_safe_mode = '';

  if (isset ($_GET ["cmd"])) {
    ai_change_settings ();
  }

  if (isset ($_GET ["blocks-org"]) && isset ($_GET ["blocks-new"])) {
    $blocks_org = json_decode ($_GET ["blocks-org"]);
    $blocks_new = json_decode ($_GET ["blocks-new"]);

    if (!empty ($blocks_org) && count ($blocks_org) == count ($blocks_new)) {
      // Update widgets

      $current_options = false;

      if (function_exists ('ai_raw_remote_options')) {
        $current_options = ai_raw_remote_options ();
      }

      if ($current_options === false) $current_options = ai_get_option (AI_OPTION_NAME, array ());

      $new_options = $current_options;

      $error = false;
      foreach ($blocks_org as $index => $block) {
        $new_block = $blocks_new [$index];
        if ($block >= 1 && $block <= 96 && $new_block >= 1 && $new_block <= 96) {
          if (isset ($current_options [$new_block])) {
            $new_options [$block] = $current_options [$new_block];
          } else {
              unset ($new_options [$block]);
            }
        } else $error = true;
      }

      if (!$error) {
        // Update AI_OPTION_SCHEDULING_FALLBACK, AI_OPTION_LIMITS_FALLBACK and AI_OPTION_ADB_BLOCK_REPLACEMENT
        for ($block = 1; $block <= 96; $block ++) {

          if (isset ($new_options [$block][AI_OPTION_SCHEDULING_FALLBACK])) {
            $ai_option_fallback = $new_options [$block][AI_OPTION_SCHEDULING_FALLBACK];
            if ($ai_option_fallback != '')
              foreach ($blocks_new as $index => $org_block) {
                if ($ai_option_fallback == $org_block) {
                  $new_options [$block][AI_OPTION_SCHEDULING_FALLBACK] = $blocks_org [$index];
                }
              }
          }

          if (isset ($new_options [$block][AI_OPTION_LIMITS_FALLBACK])) {
            $ai_option_fallback = $new_options [$block][AI_OPTION_LIMITS_FALLBACK];
            if ($ai_option_fallback != '')
              foreach ($blocks_new as $index => $org_block) {
                if ($ai_option_fallback == $org_block) {
                  $new_options [$block][AI_OPTION_LIMITS_FALLBACK] = $blocks_org [$index];
                }
              }
          }

          if (isset ($new_options [$block][AI_OPTION_ADB_BLOCK_REPLACEMENT])) {
            $ai_option_adb_block_replacement = $new_options [$block][AI_OPTION_ADB_BLOCK_REPLACEMENT];
            if ($ai_option_adb_block_replacement != '')
              foreach ($blocks_new as $index => $org_block) {
                if ($ai_option_adb_block_replacement == $org_block) {
                  $new_options [$block][AI_OPTION_ADB_BLOCK_REPLACEMENT] = $blocks_org [$index];
                }
              }
          }
        }

        ai_save_options ($new_options, null, $blocks_org, $blocks_new);
      }
    }
  }

  $sidebars_with_widget = get_sidebar_widgets ();

  ob_start ();

  if ($search_text != '') $search_array = explode (' ', $search_text); else $search_array = array ();

  $blocks = array ();
  $row_counter = 0;
  for ($block = 1; $block <= 96; $block ++) {
    $obj = $block_object [$block];

    $automatic_insertion  = $obj->get_automatic_insertion () != AI_AUTOMATIC_INSERTION_DISABLED;

    $manual_widget        = $obj->get_enable_widget()    == AI_ENABLED;
    $manual_shortcode     = $obj->get_enable_manual()    == AI_ENABLED;
    $manual_php_function  = $obj->get_enable_php_call()  == AI_ENABLED;

    $disabled = $obj->get_disable_insertion ();

    $block_used = /*!$disabled &&*/ ($automatic_insertion || $manual_php_function || $manual_shortcode || $manual_widget && !empty ($sidebars_with_widget [$block]));

    if (!$show_all_blocks && !$block_used) continue;

    $process_php = $obj->get_process_php ();

    $exceptions = $obj->get_exceptions_enabled ();

    $devices = $obj->get_detection_server_side () || $obj->get_detection_client_side ();

    $scheduling = $obj->get_scheduling() != AI_SCHEDULING_OFF;
    $scheduling_period = '';

    switch ($obj->get_scheduling ()) {
      case AI_SCHEDULING_BETWEEN_DATES:
      case AI_SCHEDULING_OUTSIDE_DATES:
        $scheduling_period_inactive = !check_scheduling_time (
                                        $obj->get_schedule_start_date () . ' ' . $obj->get_schedule_start_time (),
                                        $obj->get_schedule_end_date ()   . ' ' . $obj->get_schedule_end_time (),
                                        $obj->get_schedule_weekdays (),
                                        $obj->get_scheduling () == AI_SCHEDULING_BETWEEN_DATES
                                      );
          $scheduling_period = $obj->get_schedule_start_date () . ($obj->get_schedule_start_time () != '' ? ' ' . $obj->get_schedule_start_time () : ''). '[BR]' . $obj->get_schedule_end_date ()   . ($obj->get_schedule_end_time () != '' ? ' ' . $obj->get_schedule_end_time () : '');
        break;
      default:
        $scheduling_period_inactive = false;
        break;
    }

    $tracking = $obj->get_tracking (true);

    if (ai_pro ()) {
      $limits =
        $obj->get_visitor_max_impressions () || ($obj->get_visitor_limit_impressions_per_time_period () && $obj->get_visitor_limit_impressions_time_period ()) ||
        $obj->get_visitor_max_clicks ()      || ($obj->get_visitor_limit_clicks_per_time_period () && $obj->get_visitor_limit_clicks_time_period ());

    }

    $block_text = $block . ' '. $obj->get_ad_name () . ' ' . $obj->get_automatic_insertion_text() . ' ' . implode (', ', $sidebars_with_widget [$block]);
    if ($process_php) $block_text .= ' php';
    if ($exceptions) $block_text .= ' exceptions';
    if ($devices) $block_text .= ' device';
    if ($scheduling) $block_text .= ' scheduling';
    if (ai_pro ()) {
      if ($limits) $block_text .= ' limits';
    }
    if ($tracking) $block_text .= ' tracking';
    if (!empty ($sidebars_with_widget [$block])) $block_text .= ' widget';
    if ($manual_shortcode) $block_text .= ' shortcode';
    if ($manual_php_function) $block_text .= ' function';

    foreach ($search_array as $search_item) {
      if (stripos ($block_text, trim ($search_item)) === false) continue 2;
    }

    $blocks []= $block;
    $row_counter ++;
    $row_class = $row_counter % 2 == 0 ? 'even' : 'odd';
    if ($block == $active_block) {
      $row_class .= ' ai-block-active';
    }

    $edit_url = admin_url ('options-general.php?page=ad-inserter.php') . '&start=' . (intval (($block - 1) / 16) * 16 + 1) . '&tab=' . $block . $url_safe_mode;

    $visible_tab = $block >= $start && $block <= $end;

    $insertion_parameter = '';
    $insertion_title = '';
    switch ($obj->get_automatic_insertion()) {
      case AI_AUTOMATIC_INSERTION_BEFORE_PARAGRAPH:
      case AI_AUTOMATIC_INSERTION_AFTER_PARAGRAPH:
      case AI_AUTOMATIC_INSERTION_BEFORE_IMAGE:
      case AI_AUTOMATIC_INSERTION_AFTER_IMAGE:
        $insertion_parameter = ' ' . $obj->get_paragraph_number ();
        break;
      case AI_AUTOMATIC_INSERTION_BEFORE_EXCERPT:
      case AI_AUTOMATIC_INSERTION_AFTER_EXCERPT:
      case AI_AUTOMATIC_INSERTION_BETWEEN_POSTS:
      case AI_AUTOMATIC_INSERTION_BETWEEN_COMMENTS:
        $insertion_parameter = ' ' . $obj->get_call_filter ();
        break;
      case AI_AUTOMATIC_INSERTION_BEFORE_HTML_ELEMENT:
      case AI_AUTOMATIC_INSERTION_AFTER_HTML_ELEMENT:
      case AI_AUTOMATIC_INSERTION_INSIDE_HTML_ELEMENT:
        $insertion_title = $obj->get_html_selector ();
        break;
    }

?>
        <tr class="ai-block-list ai-block-<?php echo $block, ' ', $row_class; ?>" data-block="<?php echo $block; ?>">
          <td style="min-width: 55px; color: <?php echo $block_used ? '#444' : '#ccc'; ?>;">
            <span class="ai-list-button">
              <label class="checkbox-button ai-preview-block" style="margin-top: -1px;" title="<?php _e ('Preview block', 'ad-inserter'); ?>"><span class="checkbox-icon size-8 icon-preview"></span></label>
            </span>
            <span class="ai-list-button">
              <label class="checkbox-button ai-copy-block" style="margin-top: -1px;" title="<?php _e ('Copy block', 'ad-inserter'); ?>"><span class="checkbox-icon size-8 icon-text">&#9609;</span></label>
            </span>

            <span class="ai-list-button">
              <label class="checkbox-button ai-pause-block<?php echo $disabled ? ' ai-paused' : ''; ?>" style="margin-top: -1px;" title="<?php _e ('Pause block', 'ad-inserter'); ?>"><span class="checkbox-icon size-8 icon-text" style="<?php echo $disabled ? 'color: #d00;' : ''; ?>">&#10074;&#10074;</span></label>
            </span>

            <span  class="ai-list-button" style="text-align: right; width: 16px;"><?php echo $block; ?></span>
          </td>
<?php if ($visible_tab): ?>
          <td class="ai-tab-link" data-tab="<?php echo $block; ?>" style=" min-width: 120px; color: #0073aa; cursor: pointer; text-align: left; padding-left: 5px; max-width: 220px; white-space: nowrap; overflow: hidden;"><?php echo $obj->get_ad_name(); ?></td>
<?php else: ?>
          <td style="min-width: 120px; text-align: left;  padding-left: 5px; max-width: 250px; white-space: nowrap; overflow: hidden;"><a href="<?php echo $edit_url; ?>" style="text-decoration: none; box-shadow: 0 0 0;"><?php echo $obj->get_ad_name(); ?></a></td>
<?php endif ?>
          <td style="min-width: 80px; text-align: left; padding-left: 5px; max-width: 130px; white-space: nowrap; overflow: hidden; color: <?php echo $automatic_insertion ? '#666' : '#ccc'; ?>" title="<?php echo $insertion_title; ?>"><?php echo $obj->get_automatic_insertion_text(), $insertion_parameter; ?></td>
          <td style="min-width: 15px; text-align: center; padding-left: 5px; vertical-align: top;"><span class="<?php echo $process_php ? 'checkbox-icon size-img16 icon-php on' : ''; ?>" style="margin-top: 1px;"></span></td>
          <td style="min-width: 15px; text-align: center; padding-left: 5px; vertical-align: top; color: #66f;"><span class="<?php echo $exceptions ? 'dashicons dashicons-forms' : ''; ?>" style="font-size: 16px; width: 16px; height: 16px; margin-top: 1px;"></span></td>
          <td style="min-width: 15px; text-align: center; padding-left: 5px; vertical-align: top; color: #0df;"><span class="<?php echo $devices ? 'dashicons dashicons-desktop' : ''; ?>" style="font-size: 16px; width: 16px; height: 16px; margin-top: 1px;"></span></td>
          <td style="min-width: 15px; text-align: center; padding-left: 5px; vertical-align: top; color: <?php echo $scheduling_period_inactive ? '#e44' : '#00f'; ?>;" title="<?php echo $scheduling_period != '' ? $scheduling_period : ''; ?>"><?php echo $scheduling ? '&#9200;' : ''; ?></td>
<?php
  if (ai_pro ()) {
?>
          <td style="min-width: 15px; text-align: center; padding-left: 5px; vertical-align: top;"><span class="<?php echo $tracking ? 'checkbox-icon size-img16 icon-tracking on' : ''; ?>" style="margin-top: 1px;"></span></td>
          <td style="min-width: 15px; text-align: center; padding-left: 5px; vertical-align: top; color: #70f;"><?php echo $limits ? '&#11027;' : ''; ?></td>
<?php
  }
?>
          <td style="min-width: 15px; text-align: center; padding-left: 5px; vertical-align: top; font-weight: bold; color: <?php echo $manual_php_function ? '#8080ff' : 'transparent'; ?>;">fn</td>
          <td style="min-width: 15px; text-align: center; padding-left: 5px; vertical-align: top; font-weight: bold; color: <?php echo $manual_shortcode ? '#f66' : 'transparent'; ?>;">[s]</td>
          <td style="min-width: 15px; text-align: center; padding-left: 5px; vertical-align: top; font-weight: bold; color: <?php echo $manual_widget ? (count ($sidebars_with_widget [$block]) ? '#7cda7c' : '#aaa') : 'transparent'; ?>;">w</td>
          <td style="text-align: left; padding-left: 5px; max-width: 100px; white-space: nowrap; overflow: hidden; color: <?php echo $manual_widget ? '#666' : '#ccc'; ?>;"><?php echo implode (', ', $sidebars_with_widget [$block]); ?></td>
        </tr>
<?php
  }
  $table_rows = ob_get_clean ();
?>

    <table id="ai-list-table" class="exceptions ai-sortable<?php if (ai_pro () && !get_global_tracking ()) echo ' tracking-disabled'; ?>" cellspacing=0 cellpadding=0 style="width: 100%;" data-blocks="<?php echo json_encode ($blocks); ?>">
      <thead>
        <tr>
          <th style="text-align: left;"><?php _e ('Block', 'ad-inserter'); ?></th>
          <th style="text-align: left; padding-left: 5px;"><?php _e ('Name', 'ad-inserter'); ?></th>
<!--          <th style="text-align: left; padding-left: 10px;"></th>-->
          <th style="text-align: left; padding-left: 5px;"><?php _e ('Automatic insertion', 'ad-inserter'); ?></th>
          <th style="text-align: center; padding-left: 5px;" title="<?php _e ('PHP code processing', 'ad-inserter'); ?>"><span class="checkbox-icon size-img16 icon-php"></span></th>
          <th style="text-align: center; padding-left: 5px;" title="<?php _e ('Exceptions', 'ad-inserter'); ?>"><span class="dashicons dashicons-forms" style="font-size: 16px; width: 16px; height: 16px; margin-top: 1px; color: #999;"></span></th>
          <th style="text-align: center; padding-left: 5px;" title="<?php _e ('Device detection', 'ad-inserter'); ?>"><span class="dashicons dashicons-desktop" style="font-size: 16px; width: 16px; height: 16px; margin-top: 1px; color: #999;"></span></th>
          <th style="text-align: center; padding-left: 5px; color: #aaa;" title="<?php _e ('Scheduling', 'ad-inserter'); ?>">&#9200;</th>
<?php
  if (ai_pro ()) {
?>
          <th style="text-align: center; padding-left: 5px;" title="<?php _e ('Tracking', 'ad-inserter'); ?>"><span class="checkbox-icon size-img16 icon-tracking" style="margin-top: 1px;"></span></th>
          <th style="text-align: center; padding-left: 5px; color: #999;" title="<?php _e ('Limits', 'ad-inserter'); ?>">&#11027;</th>
<?php
  }
?>
          <th style="text-align: center; padding-left: 5px; color: #999;" title="<?php _e ('PHP function call', 'ad-inserter'); ?>">fn</th>
          <th style="text-align: center; padding-left: 5px; color: #999;" title="<?php _e ('Shortcode', 'ad-inserter'); ?>">[s]</th>
          <th style="text-align: center; padding-left: 5px; color: #999;" title="<?php _e ('Widget', 'ad-inserter'); ?>">W</th>
          <th style="text-align: left; padding-left: 5px; color: #999;"><?php //_e ('Widget positions', 'ad-inserter'); ?></th>
        </tr>
      </thead>
      <tbody>
<?php echo $table_rows; ?>
      </tbody>
    </table>
<?php
  if ($row_counter == 0) {
    if ($search_text == '')
      echo "<div style='margin: 10px 0 0 20px;'>", __ ('No active block', 'ad-inserter'), "</div>"; else
        echo "<div style='margin: 10px 0 0 20px;'>", __ ('No block matches search keywords', 'ad-inserter'), "</div>";
  }
}

if (defined ('AI_ADSENSE_API')) {

function ai_adsense_data (&$error) {
  require_once AD_INSERTER_PLUGIN_DIR.'includes/adsense-api.php';

  $error = 'AdSense not authorized';
  $ad_data = false;

  if (defined ('AI_ADSENSE_AUTHORIZATION_CODE')) {
    $error = '';

    $update_ad_units = isset ($_GET ["update_ad_units"]) ? $_GET ["update_ad_units"] ==  1 : false;

    $adsense = new adsense_api ();

    $ad_data = get_transient (AI_TRANSIENT_ADSENSE_ADS);

    if ($ad_data === false || $update_ad_units) {
      $ad_units = $adsense->getAdUnits();
      $error    = $adsense->getError ();
      if ($error == '' && is_array ($ad_units)) {
        $ad_data = array ($adsense->getAdSensePublisherID (), $ad_units);
        set_transient (AI_TRANSIENT_ADSENSE_ADS, $ad_data, AI_TRANSIENT_ADSENSE_ADS_EXPIRATION);
      }
    }
  }

  return $ad_data;
}

function adsense_list () {
  require_once AD_INSERTER_PLUGIN_DIR.'includes/adsense-api.php';

  if (defined ('AI_ADSENSE_AUTHORIZATION_CODE')) {

    if (get_transient (AI_TRANSIENT_ADSENSE_TOKEN_1) !== false) {
      // Old token for API version 1
      $error = 'unauthorized_client_2';
    } else {
        $publisher_id = '';
        $ad_units = array ();
        $error = '';

        $ad_data = ai_adsense_data ($error);
      }

    if ($error == '') {

      $publisher_id = $ad_data [0];
      $ad_units     = $ad_data [1];

      $show_all_ad_units = isset ($_GET ["all"]) && $_GET ["all"];
?>
    <table id="ai-adsense-ad-units-table" class="exceptions" cellspacing=0 cellpadding=0 style="width: 100%;">
      <thead>
        <tr>
          <th style="text-align: left; width: 66px;"><?php _e ('Ad unit', 'ad-inserter'); ?></th>
          <th style="text-align: left;"><?php _e ('Name', 'ad-inserter'); ?></th>
          <th style="text-align: left;"><?php _e ('Slot ID', 'ad-inserter'); ?></th>
          <th style="text-align: left;"><?php _e ('Type', 'ad-inserter'); ?></th>
          <th style="text-align: left;"><?php _e ('Size', 'ad-inserter'); ?></th>
        </tr>
      </thead>
      <tbody>
<?php
      $row_counter = 0;
      foreach ($ad_units as $ad_unit) {

        if (!$show_all_ad_units && !$ad_unit ['active']) continue;

        $search_text = trim (esc_html ($_GET ["adsense-list"]));
        if ($search_text != '') $search_array = explode (' ', $search_text); else $search_array = array ();
        $block_text = $ad_unit ['name'] . ' ' . $ad_unit ['code'] . ' ' . $ad_unit ['type'] . ' ' . $ad_unit ['size'];
        foreach ($search_array as $search_item) {
          if (stripos ($block_text, trim ($search_item)) === false) continue 2;
        }

        $row_counter ++;
        $row_color = $row_counter % 2 == 0 ? '#eee' : '#fff';

?>
<!--        <tr style="background: <?php echo $row_color; ?>" data-id="ca-<?php echo $publisher_id, ':', $ad_unit ['code']; ?>" data-name="<?php echo base64_encode ($ad_unit ['name']); ?>">-->
        <tr style="background: <?php echo $row_color; ?>" data-id="<?php echo $ad_unit ['id']; ?>" data-name="<?php echo base64_encode ($ad_unit ['name']); ?>">
          <td>
            <span class="ai-list-button">
              <label class="checkbox-button adsense-copy-code" style="margin-top: -1px;" title="<?php _e ('Copy AdSense code', 'ad-inserter'); ?>"><span class="checkbox-icon size-8"></span></label>
            </span>
            <span class="ai-list-button">
              <label class="checkbox-button adsense-preview-code" style="margin-top: -1px;" title="<?php _e ('Preview AdSense ad', 'ad-inserter'); ?>"><span class="checkbox-icon size-8 icon-preview"></span></label>
            </span>
            <span class="ai-list-button">
              <label class="checkbox-button adsense-get-code" style="margin-top: -1px;" title="<?php _e ('Get AdSense code', 'ad-inserter'); ?>"><span class="checkbox-icon size-8 icon-get"></span></label>
            </span>
          </td>
          <td style="color: <?php echo $ad_unit ['active'] ? '#444' : '#ccc'; ?>;">
            <?php echo $ad_unit ['name']; ?>
          </td>
          <td class="select" style="text-align: left; color: <?php echo $ad_unit ['active'] ? '#444' : '#ccc'; ?>;">
            <span><?php echo $ad_unit ['code']; ?></span>
          </td>
          <td style="color: <?php echo $ad_unit ['active'] ? '#444' : '#ccc'; ?>;">
            <?php echo ucwords (strtolower (str_replace ('_', ', ', $ad_unit ['type']))); ?>
          </td>
          <td style="color: <?php echo $ad_unit ['active'] ? '#444' : '#ccc'; ?>;">
            <?php echo ucwords (strtolower ($ad_unit ['size'])); ?>
          </td>
        </tr>
<?php
     }
?>
      </tbody>
    </table>

    <div id="adsense-data" style="display: none;" data-publisher-id="<?php echo $publisher_id; ?>"></div>

<?php
    } else {
        if ($error != 'unauthorized_client_2')
          echo "<div style='margin: 10px 0 0 20px;'>$error</div>";

        if (strpos ($error, 'unauthorized_client') !== false) {
          echo '<div style="margin-top: 10px; border: 1px solid #ddd; border-radius: 5px; padding: 10px;">',
                     // translators: %s: HTML tags
            sprintf (__('Please %s clear authorization %s with the button %s above and once again authorize access to your AdSense account.', 'ad-inserter'),
              '<strong>',
              '</strong>',
              '<span class="list-button lb-size-16 ui-icon ui-icon-power" style="display: inline-block; margin-bottom: -3px;"></span>'
            ), '</div>';
        }
      }
  }

  elseif (defined ('AI_ADSENSE_CLIENT_ID')) {
      $adsense = new adsense_api();
      $adsense_ids = defined ('AI_CI_STRING') && get_option (AI_ADSENSE_OWN_IDS) === false;
?>
    <table class="responsive-table" cellspacing=0 cellpadding=0 style="width: 100%;">
      <tbody>
        <tr>
          <td colspan="2" style="white-space: inherit;">
            <div class="rounded" style="margin: 0;">
<?php if ($adsense_ids): ?>
              <h2 style="margin: 5px 0; float: left;"><strong><?php echo AD_INSERTER_NAME; ?></strong> <?php _e ('AdSense Integration', 'ad-inserter'); ?></h2>
<?php else: ?>
              <h2 style="margin: 5px 0; float: left;"><strong><?php echo AD_INSERTER_NAME; ?></strong> <?php _e ('AdSense Integration - Step 2', 'ad-inserter'); ?></h2>
<?php endif; ?>
              <a href="https://www.google.com/adsense/login" class="simple-link" style="float: right;" target="_blank" title="<?php _e ('Google AdSense Homepage', 'ad-inserter'); ?>"><span class="checkbox-icon icon-adsense on" style="margin: 4px 0;"></span></a>
              <div style="clear: both;"></div>
            </div>
<?php if ($adsense_ids): ?>
            <p style="text-align: justify;"><?php /* translators: %s: HTML tags */ printf (__('Authorize %s to access your AdSense account. Click on the %s Get Authorization Code %s button to open a new window where you can allow access. When you get the code copy it to the field below and click on the button %s Authorize. %s', 'ad-inserter'),
            AD_INSERTER_NAME,
            '<strong>',
            '</strong>',
            '<strong>',
            '</strong>'
            ); ?></p>
            <p style="text-align: justify;"><?php /* translators: %s: HTML tags */ printf (__("If you get error, can't access ad units or would like to use own Google API IDs click on the button %s Use own API IDs %s to enter Client ID and Client Secret.", 'ad-inserter'), '<strong>', '</strong>'); ?></p>
<?php else: ?>
            <p style="text-align: justify;"><?php /* translators: %s: HTML tags */ printf (__('Now you can authorize %s to access your AdSense account. Click on the %s Get Authorization Code %s button to open a new window where you can allow access. When you get the code copy it to the field below and click on the button %s Authorize. %s', 'ad-inserter'),
            AD_INSERTER_NAME,
            '<strong>',
            '</strong>',
            '<strong>',
            '</strong>'
            ); ?></p>
            <p style="text-align: justify;"><?php /* translators: %s: HTML tags */ printf (__('If you get error %s invalid client %s click on the button %s Clear and return to Step 1 %s to re-enter Client ID and Client Secret.', 'ad-inserter'),
              '<strong>',
              '</strong>',
              '<strong>',
              '</strong>'
              ); ?></p>
<?php endif; ?>
          </td>
        </tr>
        <tr>
          <td style="padding-right: 10px;">
            <button type="button" class="ai-top-button" style="display: none; width: 162px; outline: none;" onclick="window.open('<?php echo $adsense->getAuthUrl (); ?>')"><?php _e ('Get Authorization Code', 'ad-inserter'); ?></button>
          </td>
          <td>
            <input id="adsense-authorization-code" style="width: 100%;" type="text" value="" size="100" maxlength="200" title="<?php _e ('Enter Authorization Code', 'ad-inserter'); ?>"/>
          </td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>
<?php if ($adsense_ids): ?>
            <button type="button" class="ai-top-button authorize-adsense own-ids" style="display: none; float: left; width: 162px; outline: none;"><?php _e ('Use own API IDs', 'ad-inserter'); ?></button>
<?php else: ?>
            <button type="button" class="ai-top-button authorize-adsense clear-adsense" style="display: none; float: left; width: 162px; outline: none;"><?php _e ('Clear and return to Step 1', 'ad-inserter'); ?></button>
<?php endif; ?>
          </td>
          <td>
            <button type="button" class="ai-top-button authorize-adsense" style="display: none; float: right; width: 162px; outline: none;"><?php _e ('Authorize', 'ad-inserter'); ?></button>
          </td>
        </tr>
      </tbody>
    </table>

<?php
  }

  else {
?>
    <table class="responsive-table" cellspacing=0 cellpadding=0 style="width: 100%;">
      <tbody>
        <tr>
          <td colspan="2" style="white-space: inherit;">
            <div class="rounded" style="margin: 0;">
              <h2 style="margin: 5px 0; float: left;"><strong><?php echo AD_INSERTER_NAME; ?></strong> <?php _e ('AdSense Integration - Step 1', 'ad-inserter'); ?></h2>
              <a href="https://www.google.com/adsense/login" class="simple-link" style="float: right;" target="_blank" title="<?php _e ('Google AdSense Homepage', 'ad-inserter'); ?>"><span class="checkbox-icon icon-adsense on" style="margin: 4px 0;"></span></a>
              <div style="clear: both;"></div>
            </div>
            <p style="text-align: justify;"><?php /* translators: %s: Ad Inserter */ printf (__('Here can %s list configured AdSense ad units and get code for AdSense ads. To do this you need to authorize %s to access your AdSense account. The first step is to create a Google API project in order to get Client ID and Client Secret.', 'ad-inserter'),
            '<strong>'.AD_INSERTER_NAME.'</strong>',
            AD_INSERTER_NAME
            ); ?></p>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="white-space: inherit;">
            <ol>
              <li title="Google APIs and Services console"><?php /* translators: %s: HTML tags */ printf (__('Go to %s Google APIs and Services console %s', 'ad-inserter'), '<a href="https://console.developers.google.com/" target="_blank">', '</a>'); ?></li>
              <li title="Credentials"><?php /* translators: %1: Ad Inserter, 2, 3: HTML tags */ printf (__('Create %1$s project - if the project and IDs are already created click on the %2$s Credentials %3$s in the sidebar and go to step 21', 'ad-inserter'), '<strong>Ad Inserter</strong>', '<strong>', '</strong>'); ?></li>
              <li title="Select a project"><?php /* translators: %s: HTML tags */ printf (__('Click on project selection and then click on the %s NEW PROJECT %s button to create a new project', 'ad-inserter'), '<strong>', '</strong>'); ?></li>
              <li title="Create"><?php /* translators: 1: Ad Inserter, 2, 3: HTML tags */ printf (__('Enter %1$s for project name and click on the %2$s Create %3$s button', 'ad-inserter'), '<strong>Ad Inserter</strong>', '<strong>', '</strong>'); ?></li>
              <li><?php /* translators: %s: HTML tags */ printf (__('Click on project selection, wait for the project to be created and then and select %s as the current project', 'ad-inserter'), '<strong>Ad Inserter</strong>'); ?></li>
              <li title="ENABLE APIS AND SERVICES"><?php /* translators: %s: HTML tags */ printf (__('Click on %s ENABLE APIS AND SERVICES %s', 'ad-inserter'), '<strong>', '</strong>'); ?></li>
              <li title="AdSense Management API"><?php /* translators: %s: HTML tags */ printf (__('Search for adsense and enable %s', 'ad-inserter'), '<strong>AdSense Management API</strong>'); ?></li>
              <li title="Create credentials"><?php /* translators: %s: HTML tags */ printf (__('Click on %s CREATE CREDENTIALS %s', 'ad-inserter'), '<strong>', '</strong>'); ?></li>
              <li title="Which API are you using?"><?php /* translators: %s: HTML tags */ printf (__('For %s Which API are you using? %s select %s AdSense Management API %s', 'ad-inserter'), '<strong>', '</strong>', '<strong>', '</strong>'); ?></li>
              <li title="Where will you be calling the API from?"><?php /* translators: %s: HTML tags */ printf (__('For %s Where will you be calling the API from? %s select %s Other UI %s', 'ad-inserter'), '<strong>', '</strong>', '<strong>', '</strong>'); ?></li>
              <li title="What data will you be accessing?"><?php /* translators: %s: HTML tags */ printf (__('For %s What data will you be accessing? %s select %s User data %s', 'ad-inserter'), '<strong>', '</strong>', '<strong>', '</strong>'); ?></li>
              <li title="What credentials do I need?"><?php /* translators: %s: HTML tags */ printf (__('Click on %s What credentials do I need? %s', 'ad-inserter'), '<strong>', '</strong>'); ?></li>
              <li title="Set up OAuth consent screen"><?php /* translators: %s: HTML tags */ printf (__('When %s Set up OAuth consent screen %s window is displayed select %s Setup Consent Screen %s', 'ad-inserter'), '<strong>', '</strong>', '<strong>', '</strong>'); ?></li>
              <li title="Set up OAuth consent screen"><?php /* translators: %s: HTML tags */ printf (__('For %s User Type %s select %s External %s and click on %s CREATE %s', 'ad-inserter'), '<strong>', '</strong>', '<strong>', '</strong>', '<strong>', '</strong>'); ?></li>
              <li title="Set up OAuth consent screen"><?php /* translators: %s: HTML tags */ printf (__('For %s App name %s enter %s and for %s User support email %s select your Google account email address', 'ad-inserter'), '<strong>', '</strong>', '<strong>Ad Inserter</strong>', '<strong>', '</strong>'); ?></li>
              <li title="Set up OAuth consent screen"><?php /* translators: %s: HTML tags */ printf (__('For %s Developer contact information %s enter your email address and click on %s SAVE AND CONTINUE %s', 'ad-inserter'), '<strong>', '</strong>', '<strong>', '</strong>'); ?></li>
              <li title="Set up OAuth consent screen"><?php /* translators: %s: HTML tags */ printf (__('Click again on %s SAVE AND CONTINUE %s and then click on %s ADD USERS %s and add your Google account email address', 'ad-inserter'), '<strong>', '</strong>', '<strong>', '</strong>'); ?></li>
              <li title="Set up OAuth consent screen"><?php /* translators: %s: HTML tags */ printf (__('Click again on %s SAVE AND CONTINUE %s and then on %s BACK TO DASHBOARD %s', 'ad-inserter'), '<strong>', '</strong>', '<strong>', '</strong>'); ?></li>
              <li title="Create an OAuth 2.0 client ID"><?php /* translators: %s: HTML tags */ printf (__('Create an OAuth 2.0 client ID: For %s OAuth 2.0 client ID %s name enter %s Ad Inserter client %s and then click on %s REFRESH %s', 'ad-inserter'), '<strong>', '</strong>', '<strong>', '</strong>', '<strong>', '</strong>'); ?></li>
              <li title="Create OAuth client ID"><?php /* translators: %s: HTML tags */ printf (__('Click on %s Create OAuth client ID %s and then click on %s DONE %s', 'ad-inserter'), '<strong>', '</strong>', '<strong>', '</strong>'); ?></li>
              <li title=""><?php /* translators: %s: HTML tags */ printf (__('Click on %s Ad Inserter client %s to get %s Client ID %s and %s Client secret %s', 'ad-inserter'), '<strong>', '</strong>', '<strong>', '</strong>', '<strong>', '</strong>'); ?></li>
              <li><?php _e ('Copy them to the appropriate fields below', 'ad-inserter'); ?></li>
            </ol>
          </td>
        </tr>
        <tr>
          <td style="padding-right: 10px;">
            <?php _e ('Client ID', 'ad-inserter'); ?>
          </td>
          <td>
            <input id="adsense-client-id" style="width: 100%;" type="text" value="" size="100" maxlength="200" title="<?php _e ('Enter Client ID', 'ad-inserter'); ?>"/>
          </td>
        </tr>
        <tr>
          <td style="padding-right: 10px;">
            <?php _e ('Client secret', 'ad-inserter'); ?>
          </td>
          <td>
            <input id="adsense-client-secret" style="width: 100%;" type="text" value="" size="100" maxlength="200" title="<?php _e ('Enter Client secret', 'ad-inserter'); ?>"/>
          </td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>
<?php if (defined ('AI_ADSENSE_API_IDS') && defined ('AI_CI_STRING')): ?>
            <button type="button" class="ai-top-button authorize-adsense clear-adsense" style="display: none; float: left; width: 162px; outline: none;"><?php _e ('Use default API IDs', 'ad-inserter'); ?></button>
<?php else: ?>
<?php endif; ?>
          </td>
          <td>
            <button type="button" id="save-client-ids" class="ai-top-button" style="display: none; float: right; width: 162px; outline: none;"><?php _e ('Save', 'ad-inserter'); ?></button>
          </td>
        </tr>
      </tbody>
    </table>

<?php
  }

}

}

function ai_adsense_code ($ad_slot_id) {
  if (defined ('AI_ADSENSE_API')) {
    require_once AD_INSERTER_PLUGIN_DIR.'includes/adsense-api.php';

    if (defined ('AI_ADSENSE_AUTHORIZATION_CODE')) {
      $adsense = new adsense_api();
      $code = $adsense->getAdCode ($ad_slot_id);
      echo json_encode (array ('code' => $code, 'error-message' => $adsense->getError ()));
    }
  }
}

function adsense_ad_name () {
  if (defined ('AI_ADSENSE_API')) {
    $publisher_id = '';
    $ad_units = array ();
    $error = '';

    $ad_data = ai_adsense_data ($error);

    if ($error == '') {
      $publisher_id = $ad_data [0];
      $ad_units     = $ad_data [1];
      $ad_slot_names = array ('publisher_id' => $publisher_id);

      foreach ($ad_units as $ad_unit) {
        if ($ad_unit ['active'])
          $ad_slot_names [$ad_unit ['code']] = $ad_unit ['name'];

      }
      echo json_encode ($ad_slot_names);
    }
  }
}

function generate_list_options ($options) {
  switch ($options) {
    case 'category':
      $category_data = ai_get_category_list ();
      foreach ($category_data as $category) {
        echo "              <option value='{$category->slug}'>{$category->slug} ({$category->name})</option>\n";

        $category_to_check = get_term_by ('slug', $category->slug, 'category');
        if ($category_to_check) {
          $descendants = get_term_children ($category_to_check->term_id, 'category');
          if ($descendants) {
                                                                                                           // Translators: %s: category name
            echo "              <option value='{$category->slug}*'>{$category->slug}* ("._x(sprintf ('%s or children', $category->name), 'Category children', 'ad-inserter').")</option>\n";
                                                                                                           // Translators: %s: category name
            echo "              <option value='{$category->slug}+'>{$category->slug}+ ("._x(sprintf ('%s children only', $category->name), 'Category children', 'ad-inserter').")</option>\n";
          }
        }
      }
      break;

    case 'tag':
      $tag_data = ai_get_tag_list ();
      foreach ($tag_data as $tag) {
        echo "              <option value='{$tag->slug}'>{$tag->slug} ({$tag->name})</option>\n";
      }
      break;

    case 'taxonomy':
      $taxonomies = ai_get_taxonomy_list ();

      foreach ($taxonomies as $taxonomy => $taxonomy_name) {
        if ($taxonomy_name != '')
          echo "              <option value='{$taxonomy}'>{$taxonomy} ({$taxonomy_name})</option>\n"; else
            echo "              <option value='{$taxonomy}'>{$taxonomy}</option>\n";
      }

      break;

    case 'id':
      $posts_pages = ai_get_post_id_list ();

      $counter = 0;
      foreach ($posts_pages as $post_page) {
        if ($post_page->post_title == '') continue;
        echo "              <option value='{$post_page->ID}'>{$post_page->ID} ({$post_page->post_type} \"{$post_page->post_title}\")</option>\n";
        $counter ++;
        if ($counter >= AI_MAX_LIST_ITEMS) break;
      }
      echo "              <option value='posts'>posts (", __('All posts', 'ad-inserter'), ")</option>\n";
      echo "              <option value='pages'>pages (", __('All static pages', 'ad-inserter'), ")</option>\n";
      break;

    case 'client':
        $languages = array (
          'af' => 'Afrikaans',
          'sq' => 'Albanian',
          'an' => 'Aragonese',
          'ar*' => 'Arabic (Standard)',
          'ar-dz' => 'Arabic (Algeria)',
          'ar-bh' => 'Arabic (Bahrain)',
          'ar-eg' => 'Arabic (Egypt)',
          'ar-iq' => 'Arabic (Iraq)',
          'ar-jo' => 'Arabic (Jordan)',
          'ar-kw' => 'Arabic (Kuwait)',
          'ar-lb' => 'Arabic (Lebanon)',
          'ar-ly' => 'Arabic (Libya)',
          'ar-ma' => 'Arabic (Morocco)',
          'ar-om' => 'Arabic (Oman)',
          'ar-qa' => 'Arabic (Qatar)',
          'ar-sa' => 'Arabic (Saudi Arabia)',
          'ar-sy' => 'Arabic (Syria)',
          'ar-tn' => 'Arabic (Tunisia)',
          'ar-ae' => 'Arabic (U.A.E.)',
          'ar-ye' => 'Arabic (Yemen)',
          'hy' => 'Armenian',
          'as' => 'Assamese',
          'ast' => 'Asturian',
          'az' => 'Azerbaijani',
          'eu' => 'Basque',
          'bg' => 'Bulgarian',
          'be' => 'Belarusian',
          'bn' => 'Bengali',
          'bs' => 'Bosnian',
          'br' => 'Breton',
          'my' => 'Burmese',
          'ca' => 'Catalan',
          'ch' => 'Chamorro',
          'ce' => 'Chechen',
          'zh*' => 'Chinese',
          'zh-hk' => 'Chinese (Hong Kong)',
          'zh-cn' => 'Chinese (PRC)',
          'zh-sg' => 'Chinese (Singapore)',
          'zh-tw' => 'Chinese (Taiwan)',
          'cv' => 'Chuvash',
          'co' => 'Corsican',
          'cr' => 'Cree',
          'hr' => 'Croatian',
          'cs' => 'Czech',
          'da' => 'Danish',
          'nl*' => 'Dutch (Standard)',
          'nl-be' => 'Dutch (Belgian)',
          'en*' => 'English',
          'en-au' => 'English (Australia)',
          'en-bz' => 'English (Belize)',
          'en-ca' => 'English (Canada)',
          'en-ie' => 'English (Ireland)',
          'en-jm' => 'English (Jamaica)',
          'en-nz' => 'English (New Zealand)',
          'en-ph' => 'English (Philippines)',
          'en-za' => 'English (South Africa)',
          'en-tt' => 'English (Trinidad & Tobago)',
          'en-gb' => 'English (United Kingdom)',
          'en-us' => 'English (United States)',
          'en-zw' => 'English (Zimbabwe)',
          'eo' => 'Esperanto',
          'et' => 'Estonian',
          'fo' => 'Faeroese',
          'fa' => 'Persian',
          'fj' => 'Fijian',
          'fi' => 'Finnish',
          'fr*' => 'French (Standard)',
          'fr-be' => 'French (Belgium)',
          'fr-ca' => 'French (Canada)',
          'fr-fr' => 'French (France)',
          'fr-lu' => 'French (Luxembourg)',
          'fr-mc' => 'French (Monaco)',
          'fr-ch' => 'French (Switzerland)',
          'fy' => 'Frisian',
          'fur' => 'Friulian',
          'gd*' => 'Scots Gaelic',
          'gd-ie' => 'Gaelic (Irish)',
          'gl' => 'Galacian',
          'ka' => 'Georgian',
          'de*' => 'German (Standard)',
          'de-at' => 'German (Austria)',
          'de-de' => 'German (Germany)',
          'de-li' => 'German (Liechtenstein)',
          'de-lu' => 'German (Luxembourg)',
          'de-ch' => 'German (Switzerland)',
          'el' => 'Greek',
          'gu' => 'Gujurati',
          'ht' => 'Haitian',
          'he' => 'Hebrew',
          'hi' => 'Hindi',
          'hu' => 'Hungarian',
          'is' => 'Icelandic',
          'id' => 'Indonesian',
          'iu' => 'Inuktitut',
          'ga' => 'Irish',
          'it*' => 'Italian (Standard)',
          'it-ch' => 'Italian (Switzerland)',
          'ja' => 'Japanese',
          'kn' => 'Kannada',
          'ks' => 'Kashmiri',
          'kk' => 'Kazakh',
          'km' => 'Khmer',
          'ky' => 'Kirghiz',
          'tlh' => 'Klingon',
          'ko*' => 'Korean',
          'ko-kp' => 'Korean (North Korea)',
          'ko-kr' => 'Korean (South Korea)',
          'la' => 'Latin',
          'lv' => 'Latvian',
          'lt' => 'Lithuanian',
          'lb' => 'Luxembourgish',
          'mk' => 'FYRO Macedonian',
          'ms' => 'Malay',
          'ml' => 'Malayalam',
          'mt' => 'Maltese',
          'mi' => 'Maori',
          'mr' => 'Marathi',
          'mo' => 'Moldavian',
          'nv' => 'Navajo',
          'ng' => 'Ndonga',
          'ne' => 'Nepali',
          'no' => 'Norwegian',
          'nb' => 'Norwegian (Bokmal)',
          'nn' => 'Norwegian (Nynorsk)',
          'oc' => 'Occitan',
          'or' => 'Oriya',
          'om' => 'Oromo',
          'fa-ir' => 'Persian/Iran',
          'pl' => 'Polish',
          'pt*' => 'Portuguese',
          'pt-br' => 'Portuguese (Brazil)',
          'pa*' => 'Punjabi',
          'pa-in' => 'Punjabi (India)',
          'pa-pk' => 'Punjabi (Pakistan)',
          'qu' => 'Quechua',
          'rm' => 'Rhaeto-Romanic',
          'ro*' => 'Romanian',
          'ro-mo' => 'Romanian (Moldavia)',
          'ru*' => 'Russian',
          'ru-mo' => 'Russian (Moldavia)',
          'sz' => 'Sami (Lappish)',
          'sg' => 'Sango',
          'sa' => 'Sanskrit',
          'sc' => 'Sardinian',
          'sd' => 'Sindhi',
          'si' => 'Singhalese',
          'sr' => 'Serbian',
          'sk' => 'Slovak',
          'sl' => 'Slovenian',
          'so' => 'Somani',
          'sb' => 'Sorbian',
          'es*' => 'Spanish',
          'es-ar' => 'Spanish (Argentina)',
          'es-bo' => 'Spanish (Bolivia)',
          'es-cl' => 'Spanish (Chile)',
          'es-co' => 'Spanish (Colombia)',
          'es-cr' => 'Spanish (Costa Rica)',
          'es-do' => 'Spanish (Dominican Republic)',
          'es-ec' => 'Spanish (Ecuador)',
          'es-sv' => 'Spanish (El Salvador)',
          'es-gt' => 'Spanish (Guatemala)',
          'es-hn' => 'Spanish (Honduras)',
          'es-mx' => 'Spanish (Mexico)',
          'es-ni' => 'Spanish (Nicaragua)',
          'es-pa' => 'Spanish (Panama)',
          'es-py' => 'Spanish (Paraguay)',
          'es-pe' => 'Spanish (Peru)',
          'es-pr' => 'Spanish (Puerto Rico)',
          'es-es' => 'Spanish (Spain)',
          'es-uy' => 'Spanish (Uruguay)',
          'es-ve' => 'Spanish (Venezuela)',
          'sx' => 'Sutu',
          'sw' => 'Swahili',
          'sv*' => 'Swedish',
          'sv-fi' => 'Swedish (Finland)',
          'sv-sv' => 'Swedish (Sweden)',
          'ta' => 'Tamil',
          'tt' => 'Tatar',
          'te' => 'Teluga',
          'th' => 'Thai',
          'tig' => 'Tigre',
          'ts' => 'Tsonga',
          'tn' => 'Tswana',
          'tr' => 'Turkish',
          'tk' => 'Turkmen',
          'uk' => 'Ukrainian',
          'hsb' => 'Upper Sorbian',
          'ur' => 'Urdu',
          've' => 'Venda',
          'vi' => 'Vietnamese',
          'vo' => 'Volapuk',
          'wa' => 'Walloon',
          'cy' => 'Welsh',
          'xh' => 'Xhosa',
          'ji' => 'Yiddish',
          'zu' => 'Zulu',
        );

      $clients = array ();

      if (version_compare (phpversion (), "5.6", ">=")) {
        require_once AD_INSERTER_PLUGIN_DIR.'includes/agent/Agent.php';
        $agent = new Agent();

        $clients = array_merge (
          array_keys ($agent->getOperatingSystems ()),
          array_keys ($agent->getBrowsers ()),
          array_keys ($agent->getPhoneDevices ()),
          array_keys ($agent->getTabletDevices ()),
          array_keys ($agent->getUtilities ())
        );

        foreach ($clients as $client) {
          echo "              <option value='$client'>$client</option>\n";
        }

      } else {
        }


      foreach ($languages as $language_id => $language) {
        echo "              <option value='language:{$language_id}'>{$language}</option>\n";
      }


      $clients = array_merge (
        $clients,
        $languages
      );

      break;

    default:
      if (function_exists ('ai_generate_list_options')) ai_generate_list_options ($options);
      break;
  }
}


function ai_get_posts_pages_with_exceptions () {
  $args = array (
    'public'    => true,
    '_builtin'  => false
  );
  $custom_post_types = get_post_types ($args, 'names', 'and');
  $screens = array_values (array_merge (array ('post', 'page'), $custom_post_types));

  $args = array (
    'posts_per_page'   => AI_LIST_EXCEPTIONS_LIMIT,
    'offset'           => 0,
    'category'         => '',
    'category_name'    => '',
    'orderby'          => 'type',
    'order'            => 'ASC',
    'include'          => '',
    'exclude'          => '',
    'meta_query' => array (
      array (
        'key' => '_adinserter_block_exceptions',
        'value' => '',
        'compare' => '!='
      )
    ),
    'post_type'        => $screens,
    'post_mime_type'   => '',
    'post_parent'      => '',
    'author'           => '',
    'author_name'      => '',
    'post_status'      => '',
    'suppress_filters' => true
  );
  return (get_posts ($args));
}

function ai_get_exceptions ($conditions) {
  if (function_exists ('ai_get_exceptions_2')) {
    $exceptions = ai_get_exceptions_2 ();
    if (is_array ($exceptions)) return $exceptions;
  }

  $exceptions = false;
  $block_exceptions = array ();

  if ($conditions) {
    $posts_pages = ai_get_posts_pages_with_exceptions ();

    $exceptions = array ();
    foreach ($posts_pages as $page) {
      $post_meta = get_post_meta ($page->ID, '_adinserter_block_exceptions', true);
      if ($post_meta == '') continue;
      $post_type_object = get_post_type_object ($page->post_type);
      $exceptions [$page->ID] = array ('type' => $page->post_type, 'name' => $post_type_object->labels->singular_name, 'title' => $page->post_title, 'blocks' => $post_meta);

      $selected_blocks = explode (",", $post_meta);
      foreach ($selected_blocks as $selected_block) {
        $block_exceptions [$selected_block][$page->ID] = array ('type' => $page->post_type, 'name' => $post_type_object->labels->singular_name, 'title' => $page->post_title);
      }
    }
  }

  return array ($exceptions, $block_exceptions);
}

function ai_clear_exceptions () {
  $clear = $_POST [AI_FORM_CLEAR_EXCEPTIONS];
  $posts_pages = ai_get_posts_pages_with_exceptions ();

  // All exceptions
  if ($clear == "\xe2\x9d\x8c") {
    foreach ($posts_pages as $page) {
      delete_post_meta ($page->ID, '_adinserter_block_exceptions');
    }
  }
  // Exceptions for post id
  elseif (strpos ($clear, 'id=') === 0) {
    $id = str_replace ('id=', '', $clear);
    if (is_numeric ($id)) {
      delete_post_meta ($id, '_adinserter_block_exceptions');
    }
  }
  // Block exceptions
  elseif (is_numeric ($clear)) {
    foreach ($posts_pages as $page) {
      $post_meta = get_post_meta ($page->ID, '_adinserter_block_exceptions', true);
      $selected_blocks = explode (",", $post_meta);
      if (($key = array_search ($clear, $selected_blocks)) !== false) {
        unset ($selected_blocks [$key]);
        update_post_meta ($page->ID, '_adinserter_block_exceptions', implode (",", $selected_blocks));
      }
    }
  }
}

function ai_clear_settings () {
  global $ai_db_options, $block_object, $wpdb, $ai_db_options_extract;

  if (defined ('AI_CONNECTED_MANAGER')) {
    $connected_manager = get_transient (AI_CONNECTED_MANAGER);
  } else $connected_manager = false;

  for ($block = 1; $block <= 96; $block ++) {
    delete_option (str_replace ("#", $block, AD_ADx_OPTIONS));
  }

  $saved_management_key = isset ($ai_db_options [AI_OPTION_GLOBAL]['MANAGEMENT_KEY']) ? $ai_db_options [AI_OPTION_GLOBAL]['MANAGEMENT_KEY'] : '';

  delete_option (str_replace ("#", "Header", AD_ADx_OPTIONS));
  delete_option (str_replace ("#", "Footer", AD_ADx_OPTIONS));
  delete_option (AD_OPTIONS);

  delete_option (AI_OPTION_NAME);
  delete_option (AI_EXTRACT_NAME);
  delete_option (AI_FLAGS_NAME);

  if (is_multisite () && is_main_site ()) {
    delete_site_option (AI_OPTION_NAME);
  }

  delete_option (AI_ADSENSE_CLIENT_IDS);
  delete_option (AI_ADSENSE_AUTH_CODE);
  delete_option (AI_ADSENSE_OWN_IDS);

  delete_option (AI_ADS_TXT_NAME);

  delete_transient (AI_TRANSIENT_ADSENSE_TOKEN_1);
  delete_transient (AI_TRANSIENT_ADSENSE_TOKEN);
  delete_transient (AI_TRANSIENT_ADSENSE_ADS);

  delete_transient ('ai-close');

  if (function_exists ('ai_load_globals')) {
    delete_option (WP_AD_INSERTER_PRO_LICENSE);
    if ($connected_manager === false) {
      delete_option (WP_AD_INSERTER_PRO_KEY);
    }
    delete_option (WP_AD_INSERTER_PRO_CLIENT);
    $wpdb->query ("DROP TABLE IF EXISTS " . AI_STATISTICS_DB_TABLE);

    if (defined ('AI_CONNECTED_WEBSITE')) {
      delete_transient (AI_CONNECTED_WEBSITE);
      delete_option (AI_WEBSITES);
    }

    delete_transient (AI_TRANSIENT_ADB_CLASS_1);
    delete_transient (AI_TRANSIENT_ADB_CLASS_2);
    delete_transient (AI_TRANSIENT_ADB_CLASS_3);
    delete_transient (AI_TRANSIENT_ADB_CLASS_4);
    delete_transient (AI_TRANSIENT_ADB_CLASS_5);
    delete_transient (AI_TRANSIENT_ADB_CLASS_6);
    delete_transient (AI_TRANSIENT_ADB_FILES_VERSION);
  }

//  if (/*ai_current_user_role_ok () && */(!is_multisite() || is_main_site () || multisite_exceptions_enabled ())) {
    $posts_pages = ai_get_posts_pages_with_exceptions ();

    foreach ($posts_pages as $page) {
      delete_post_meta ($page->ID, '_adinserter_block_exceptions');
    }
//  }

  ai_load_settings ();

  $options = $ai_db_options;

  $options [AI_OPTION_EXTRACT] = ai_generate_extract ($options);
  $ai_db_options_extract = $options [AI_OPTION_EXTRACT];

  $options [AI_OPTION_GLOBAL]['VIEWPORT_CSS']  = generate_viewport_css ();
  $options [AI_OPTION_GLOBAL]['ALIGNMENT_CSS'] = generate_alignment_css ();

  $options [AI_OPTION_GLOBAL]['TIMESTAMP'] = time ();

  if ($connected_manager !== false) {
    $options [AI_OPTION_GLOBAL]['REMOTE_DEBUGGING'] = AI_ENABLED;
    $options [AI_OPTION_GLOBAL]['REMOTE_MANAGEMENT'] = AI_ENABLED;
    $options [AI_OPTION_GLOBAL]['MANAGEMENT_KEY'] = $saved_management_key;
  }

  ai_update_option (AI_OPTION_NAME, $options);

  update_option (AI_EXTRACT_NAME, $ai_db_options_extract);

  ai_load_settings ();

  if (function_exists ('ai_load_globals')) ai_load_globals ();
}

function ai_clear_statistics () {
  global $wpdb;

  if (isset ($_POST [AI_FORM_CLEAR_STATISTICS]) &&is_numeric ($_POST [AI_FORM_CLEAR_STATISTICS])) {
    if ($_POST [AI_FORM_CLEAR_STATISTICS] != 0) {
      $wpdb->query ("DELETE FROM " . AI_STATISTICS_DB_TABLE . " WHERE block = " . ((int) $_POST [AI_FORM_CLEAR_STATISTICS]));
    } else $wpdb->query ("DROP TABLE IF EXISTS " . AI_STATISTICS_DB_TABLE);
  }
}

function ai_check_page () {
  $download_urls = array ();

//    echo '["1","2","3","4"]';
//    return;

  switch ($_GET ["check-page"]) {
    case 'po':
    case 'pa':
      $args = array (
        'public'    => true,
        '_builtin'  => false
      );
      $custom_post_types = get_post_types ($args, 'names', 'and');
      $screens = array_values (array_merge (array ($_GET ["check-page"] == 'po' ? 'post' : 'page'), $custom_post_types));

      $args = array (
        'posts_per_page'   => 1,
        'offset'           => 0,
        'category'         => '',
        'category_name'    => '',
        'orderby'          => 'ID',
        'order'            => 'DESC',
        'include'          => '',
        'exclude'          => '',
        'meta_key'         => '',
        'meta_value'       => '',
        'post_type'        => $screens,
        'post_mime_type'   => '',
        'post_parent'      => '',
        'author'           => '',
        'author_name'      => '',
        'post_status'      => '',
        'suppress_filters' => true,
      );
      $posts_pages = get_posts ($args);

      if (isset ($posts_pages [0])) {
        $download_urls []= get_permalink ($posts_pages [0]->ID);
      }

      // Check also post/page with comments
      $args = array ('post_type' => $_GET ["check-page"] == 'po' ? 'post' : 'page', 'number' => 1);
      $comment_data = get_comments ($args);
      if (isset ($comment_data [0])) {
        $download_urls []= get_permalink ($comment_data [0]->comment_post_ID);
      }
      break;
    case 'hp':
      $download_urls []= home_url () . '/';
      break;
    case 'cp':
      $args = array ('hide_empty' => 0, 'orderby' => 'count', 'order' => 'DESC', 'number' => 1);
      $category_data = get_categories ($args);
      if (isset ($category_data [0])) {
        $download_urls []= get_category_link ($category_data [0]->cat_ID) . '/';
      }
      break;
    case 'ap':
      $args = array ('hide_empty' => 0, 'orderby' => 'count', 'order' => 'DESC', 'number' => 1);
      $tag_data = get_tags ($args);
      if (isset ($tag_data [0])) {
        $download_urls []= get_tag_link ($tag_data [0]->term_taxonomy_id) . '/';
      }
      break;
    case 'sp':
      $download_urls []= home_url () . '/?s=a';
      break;
  }

  if (!empty ($download_urls)) {
    $positions = array ();
    $secret_key = ai_secret_key ();
    foreach ($download_urls as $download_url) {
      $tmp_file = download_url (add_query_arg (array (AI_URL_DEBUG_POSITIONS  => '0', 'ai-secret' => $secret_key), $download_url));
      if (!is_wp_error ($tmp_file) && file_exists ($tmp_file)) {
        $page = file_get_contents ($tmp_file);
        preg_match_all ('#data-ai-position=[\'\"](.+?)[\'\"]#', $page, $matches);
        foreach (array_unique ($matches [1]) as $position) {
          $positions [] = (int) $position;
        }
      } else {
          @unlink ($tmp_file);
          $error_string = $tmp_file->get_error_message();
          echo $error_string;
          return;
        }

      @unlink ($tmp_file);
    }

    switch ($_GET ["check-page"]) {
      case 'po':
      case 'pa':
        if (in_array (AI_AUTOMATIC_INSERTION_BEFORE_CONTENT, $positions) && in_array (AI_AUTOMATIC_INSERTION_AFTER_CONTENT, $positions)) {
          $positions [] = AI_AUTOMATIC_INSERTION_BEFORE_PARAGRAPH;
          $positions [] = AI_AUTOMATIC_INSERTION_AFTER_PARAGRAPH;
          $positions [] = AI_AUTOMATIC_INSERTION_BEFORE_IMAGE;
          $positions [] = AI_AUTOMATIC_INSERTION_AFTER_IMAGE;
        }
        if (in_array (AI_AUTOMATIC_INSERTION_BEFORE_COMMENTS, $positions) && in_array (AI_AUTOMATIC_INSERTION_AFTER_COMMENTS, $positions)) {
          $positions [] = AI_AUTOMATIC_INSERTION_BETWEEN_COMMENTS;
        }
        break;
    }

    $positions = array_unique ($positions);
    sort ($positions);

    foreach ($download_urls as $index => $download_url) {
      $download_urls [$index] = add_query_arg (array (AI_URL_DEBUG_POSITIONS  => '0', 'no-cookie' => '1'), $download_url);
    }

    echo json_encode (array ('positions' => $positions, 'urls' => $download_urls));
  }
}

function sidebar_addense_alternative () { ?>

<?php
  switch (rand (1, 16)) {
    case 1:
    case 2:
    case 3:
    case 4:
?>
      <div class="ai-form header rounded">
        <div style="float: left;">
          <h2 style="display: inline-block; margin: 5px 0;"><?php _e ('Maximize Your Ad Revenue With Header Bidding', 'ad-inserter'); ?></h2>
        </div>
        <div style="clear: both;"></div>
      </div>
      <div class="ai-form rounded" style="height: 90px; padding: 8px 4px 8px 12px;">
        <a href='https://setupad.com/maximise-your-ad-revenue-with-header-bidding/?utm_source=ad-inserter-plugin&utm_medium=banner&utm_campaign=728x90-Maximise-Your-Ad-Revenue' class="clear-link" title="<?php _e ('Maximize Your Ad Revenue', 'ad-inserter'); ?>" target="_blank"><img id="ai-sa-2" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>sa-2.gif" /></a>
      </div>
<?php
      break;
    case 5:
    case 6:
?>
      <div class="ai-form header rounded">
        <div style="float: left;">
          <h2 style="display: inline-block; margin: 5px 0;"><?php _e ('Blank ad blocks? Looking for AdSense alternative?', 'ad-inserter'); ?></h2>
        </div>
        <div style="clear: both;"></div>
      </div>
      <div class="ai-form rounded" style="height: 90px; padding: 8px 4px 8px 12px;">
        <a href='https://www.ezoic.com/?utm_source=ad-inserter&utm_medium=ads&utm_campaign=ad-inserter-ads&utm_term=adinserter&utm_content=ezoic' class="clear-link" title="<?php _e ('Looking for AdSense alternative?', 'ad-inserter'); ?>" target="_blank"><img id="ai-ez-8" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>ez-8.jpg" /></a>
      </div>
<?php
      break;
    case 7:
    case 8:
?>
      <div class="ai-form header rounded">
        <div style="float: left;">
          <h2 style="display: inline-block; margin: 5px 0;"><?php _e ('Blank ad blocks? Looking for AdSense alternative?', 'ad-inserter'); ?></h2>
        </div>
        <div style="clear: both;"></div>
      </div>
      <div class="ai-form rounded" style="height: 90px; padding: 8px 4px 8px 12px;">
        <a href='https://www.ezoic.com/?utm_source=ad-inserter&utm_medium=ads&utm_campaign=ad-inserter-ads&utm_term=adinserter&utm_content=ezoic' class="clear-link" title="<?php _e ('Looking for AdSense alternative?', 'ad-inserter'); ?>" target="_blank"><img id="ai-ez-6" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>ez-6.png" /></a>
      </div>
<?php
      break;

    case 9:
    case 10:
    case 11:
    case 12:
?>
      <div class="ai-form header rounded">
        <div style="float: left;">
          <h2 style="display: inline-block; margin: 5px 0;"><?php _e ('Try Infolinks Ads with Adsense or Media.net ads', 'ad-inserter'); ?></h2>
        </div>
        <div style="clear: both;"></div>
      </div>
      <div class="ai-form rounded" style="height: 90px; padding: 8px 4px 8px 12px;">
        <a href='https://www.infolinks.com/publishers/?kid=3114832&loc=2' class="clear-link" title="<?php _e ('Use Infolinks ads with Adsense to earn more', 'ad-inserter'); ?>" target="_blank"><img id="ai-info-1" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>info-1.jpg" /></a>
      </div>
<?php
      break;

    case 13:
    case 14:
    case 15:
    case 16:
?>
      <div class="ai-form header rounded">
        <div style="float: left;">
          <h2 style="display: inline-block; margin: 5px 0;"><?php _e ('Maximize Revenue', 'ad-inserter'); ?></h2>
        </div>
        <div style="clear: both;"></div>
      </div>
      <div class="ai-form rounded" style="height: 90px; padding: 8px 4px 8px 12px;">
        <a href="https://underdogmedia.com/edge-publisher-adinserter/" class="clear-link" title="<?php _e ('Maximize Revenue', 'ad-inserter'); ?>" target="_blank"><img id="ai-um-1" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>um-1.png" /></a>
      </div>
<?php
      break;
  }
?>



<?php
}




function sidebar_support_review () {
  global $rating_value, $rating_string, $rating_css;

  if (!wp_is_mobile () && is_super_admin ()) {
?>
      <div class="ai-form header no-select rounded" style="position: relative; text-align: justify;">

        <div style="float: left;">
          <h2 style="display: inline-block; margin: 7px 0;"><?php _e ('Support plugin development', 'ad-inserter'); ?></h2>
<?php
    switch ($text = rand (1,2)) {
      case 1:
?>
          <button type="button" class="ai-top-button" style="display: none; margin: -5px 0px 0px 15px; min-width; 156px; width: 140px; outline: none;" onclick="window.open('https://wordpress.org/support/plugin/ad-inserter/reviews/?filter=5#new-post')" title="<?php _e ('If you like Ad Inserter and have a moment, please help me spread the word by reviewing the plugin on WordPres', 'ad-inserter'); ?>"><?php _ex ('Review', 'Review Ad Inserter', 'ad-inserter'); ?> Ad Inserter</button>
<?php
        break;
      default:
?>
          <button type="button" class="ai-top-button" style="display: none; margin: -5px 0px 0px 15px; min-width; 156px; width: 140px; outline: none;" onclick="window.open('https://wordpress.org/support/plugin/ad-inserter/reviews/?filter=5#new-post')" title="<?php _e ('If you like Ad Inserter and have a moment, please help me spread the word by rating the plugin on WordPres', 'ad-inserter'); ?>"><?php _ex ('Rate', 'Rate Ad Inserter', 'ad-inserter'); ?> Ad Inserter</button>
<?php
        break;
    }
?>
          <button type="button" class="ai-top-button" style="display: none; margin: -5px 0px 0px 15px; width: 100px; outline: none;" onclick="window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LHGZEMRTR7WB4')" title="<?php _e ('Support free Ad Inserter development. If you are making money with Ad Inserter consider donating some small amount. Even 1 dollar counts. Thank you!', 'ad-inserter'); ?>"><?php _e ('Donate', 'ad-inserter'); ?></button>
        </div>

        <div style="float: right; margin: 7px 10px 0 0;">
            <div id="ai-stars" style="float: right; margin: 0 0 -3px 0; cursor: pointer; font-size: 11px;"><span><?php //echo $rating_value; ?></span><img id="ai-stars-img" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>stars.png" style="margin: 0 0 -3px 10px;"/></div>

            <div id="ai-rating-bar" class="header" style="float: right; cursor: pointer; margin: 3px 0 0 0; width: 148px; display: none;" nonce="<?php echo wp_create_nonce ("adinserter_data"); ?>" site-url="<?php echo wp_make_link_relative (get_site_url()); ?>">
              <div class="header" style="background: #ccc;" title="<?php _e ('Average rating of the plugin - Thank you!', 'ad-inserter'); ?>">
                <a href="https://wordpress.org/support/plugin/ad-inserter/reviews/?filter=5#new-post" style="text-decoration: none; box-shadow: 0 0 0;" target="_blank">
                  <div id="rating-value" style="text-align: center; font-size: 11px; line-height: 12px; border-radius: 2px; background: #fddf87; <?php echo $rating_css; ?>"><span style=""><?php echo $rating_string; ?></span></div>
                </a>
              </div>
            </div>
        </div>

        <div style="clear: both;"></div>
        <hr />

        <?php /* translators: %s: Ad Inserter, HTML tags */ printf (__("You've been using %s for a while now, and I hope you're happy with it. Positive %s reviews %s are a great way to show your appreciation for my work. Besides being an incredible boost to my morale, they are also a great incentive to fix bugs and to add new features for better monetization of your website. When you rate it with 5 stars it's like saying 'Thank you'.", 'ad-inserter'),
        '<strong>Ad Inserter</strong>',
        '<a href="https://wordpress.org/support/plugin/ad-inserter/reviews/?filter=5#new-post" style="text-decoration: none; box-shadow: 0 0 0;" target="_blank">',
        '</a>',
        ' '
        ); ?>
      </div>

<?php
  }
}

function sidebar_support_plugin () {
  global $rating_value, $rating_string, $rating_css;
?>
      <div class="ai-form header rounded no-select">
        <div style="float: left;">
          <h2 style="display: inline-block; margin: 7px 0;"><?php _e ('Support plugin development', 'ad-inserter'); ?></h2>
          <button type="button" class="ai-top-button" style="display: none; margin: -5px 0px 0px 15px; min-width; 165px; width: 62px; outline: none;" onclick="window.open('https://wordpress.org/support/plugin/ad-inserter/reviews/?filter=5#new-post')" title="<?php _e ('If you like Ad Inserter and have a moment, please help me spread the word by reviewing the plugin on WordPres', 'ad-inserter'); ?>"><?php _e ('Review', 'ad-inserter'); ?></button>
        </div>

        <div style="float: right;">
          <a href="https://twitter.com/AdInserter" class="clear-link" target="_blank"><img id="ai-tw" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>twitter.png" style="vertical-align: middle; margin: 0 0 0 20px;" title="<?php _e ('Ad Inserter on Twitter', 'ad-inserter'); ?>" alt="<?php _e ('Ad Inserter on Twitter', 'ad-inserter'); ?>" /></a>
          <a href="https://www.facebook.com/AdInserter/" class="clear-link" target="_blank"><img id="ai-fb" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>facebook.png" style="vertical-align: middle; margin: 0 0 0 10px;" title="<?php _e ('Ad Inserter on Facebook', 'ad-inserter'); ?>" alt="<?php _e ('Ad Inserter on Facebook', 'ad-inserter'); ?>" /></a>
        </div>
        <div style="float: right; margin-top: 2px;">
          <h2 style="display: inline-block; margin: 5px 0;"><?php _e ('Follow Ad Inserter', 'ad-inserter'); ?></h2>
        </div>

        <div style="float: right; margin: 8px 20px 0 0;">
            <div id="ai-stars" style="float: right; margin: 0 0 -3px 0; cursor: pointer; font-size: 11px;"><span><?php //echo $rating_value; ?></span><img id="ai-stars-img" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>stars.png" style="margin: 0 0 -3px 10px;"/></div>

            <div id="ai-rating-bar" class="header" style="float: right; cursor: pointer; margin: 3px 0 0 0; width: 148px; display: none;" nonce="<?php echo wp_create_nonce ("adinserter_data"); ?>" site-url="<?php echo wp_make_link_relative (get_site_url()); ?>">
              <div class="header" style="background: #ccc;" title="<?php _e ('Average rating of the plugin - Thank you!', 'ad-inserter'); ?>">
                <a href="https://wordpress.org/support/plugin/ad-inserter/reviews/?filter=5#new-post" style="text-decoration: none; box-shadow: 0 0 0;" target="_blank">
                  <div id="rating-value" style="text-align: center; font-size: 11px; line-height: 12px; border-radius: 2px; background: #fddf87; height: 100%; <?php echo $rating_css; ?>"><span style=""><?php echo $rating_string; ?></span></div>
                </a>
              </div>
            </div>

        </div>

        <div style="clear: both;"></div>
      </div>

<?php
}

function sidebar_help () { ?>

      <div class="ai-form header rounded ai-help">
        <div style="float: left;">
          <div>
          <?php /* translators: %s: HTML tags */ printf (__('Need help with %s settings? %s Check %s Quick Start, %s %s Code Editing %s and %s Common Settings %s pages', 'ad-inserter'),
            '<a href="https://adinserter.pro/documentation" style="text-decoration: none; box-shadow: 0 0 0;" target="_blank">',
            '</a>',
            '<a href="https://adinserter.pro/documentation/quick-start" style="text-decoration: none; box-shadow: 0 0 0;" target="_blank">',
            '</a>',
            '<a href="https://adinserter.pro/documentation/code-editing" style="text-decoration: none; box-shadow: 0 0 0;" target="_blank">',
            '</a>',
            '<a href="https://adinserter.pro/documentation/common-settings" style="text-decoration: none; box-shadow: 0 0 0;" target="_blank">',
            '</a>'
            ); ?>
          </div>
          <div>
            <?php /* translators: %s: HTML tags */ printf (__('%s New to %s AdSense? %s %s %s Connect your site %s - %s In-feed ads, %s %s Auto ads, %s %s AMP ads %s', 'ad-inserter'),
            '<strong>',
            '<a href="https://adinserter.pro/documentation/adsense-ads" style="text-decoration: none; box-shadow: 0 0 0;" target="_blank">',
            '</a>',
            '</strong>',
            '<a href="https://adinserter.pro/documentation/adsense-ads#connect-your-site" style="text-decoration: none; box-shadow: 0 0 0;" target="_blank">',
            '</a>',
            '<a href="https://adinserter.pro/documentation/adsense-ads#in-feed-ads" style="text-decoration: none; box-shadow: 0 0 0;" target="_blank">',
            '</a>',
            '<a href="https://adinserter.pro/documentation/adsense-ads#auto-ads" style="text-decoration: none; box-shadow: 0 0 0;" target="_blank">',
            '</a>',
            '<a href="https://adinserter.pro/documentation/adsense-ads#amp" style="text-decoration: none; box-shadow: 0 0 0;" target="_blank">',
            '</a>'
            ); ?>

          </div>
          <hr />
          <div><?php /* translators: %s: HTML tags */ printf (__('Become an %s affiliate %s for Ad Inserter Pro and earn commission for each purchase you refer to us', 'ad-inserter'),
          '<a href="https://affiliate.adinserter.pro/" style="text-decoration: none; box-shadow: 0 0 0;" target="_blank">',
          '</a>'
          ); ?>
          <img draggable="false" class="emoji" alt="happy" src="https://s.w.org/images/core/emoji/2.3/svg/1f642.svg" style="margin-left: 5px!important;">
          </div>
          <hr />
          <div><?php /* translators: %s: HTML tags */ printf (__('Ads are not showing? Check %s troubleshooting guide %s to find out how to diagnose and fix the problem.', 'ad-inserter'),
          '<a href="https://adinserter.pro/documentation/adsense-ads#ads-not-displayed" style="text-decoration: none; box-shadow: 0 0 0;" target="_blank">',
          '</a>'
          ); ?></div>
          <div><?php /* translators: %s: HTML tags */ printf (__('If you need any kind of help or support, please do not hesitate to open a thread on the %s support forum. %s', 'ad-inserter'),
          '<a href="https://wordpress.org/support/plugin/ad-inserter/" style="text-decoration: none; box-shadow: 0 0 0;" target="_blank">',
          '</a>'
          ); ?></div>
        </div>
<!--        <div style="float: right; margin: -5px -5px 0 0;">-->
<!--          <a href="https://adinserter.pro/Ad_Inserter_User_Manual.pdf" class="clear-link" target="_blank"><img id="ai-pdf" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>manual.png" title="Download user manual"/></a>-->
<!--          <div style="text-align: center; font-size: 12px;">User Manual</div>-->
<!--        </div>-->
        <div style="clear: both;"></div>
      </div>

<?php
}

function sidebar_pro () {
  $version = rand (0, 3);

?>

      <div class="ai-form rounded no-select feature-list" style="background: #fff;">

<?php if (!wp_is_mobile()): ?>
        <div id="ai-sidebar-right">
          <div class="ai-image-left">
<?php switch ($version) {
        case 0: ?>
<!--            <a href='https://adinserter.pro/documentation/code-preview' class="clear-link" title="<?php _e ('Code preview with visual CSS editor', 'ad-inserter'); ?>" target="_blank"><img id="ai-preview" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>ai-preview-250.png" /></a>-->
            <a href='https://www.infolinks.com/publishers/?kid=3114832&loc=2' class="clear-link" title="<?php _e ('Use Infolinks ads with Adsense to earn more', 'ad-inserter'); ?>" target="_blank"><img id="ai-info-3" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>info-3.jpg"  /></a>
<?php   break; case 1: ?>
<!--            <a href='https://adinserter.pro/documentation/ad-blocking-detection' class="clear-link" title="<?php _e ('Ad blocking detection and content protection', 'ad-inserter'); ?>" target="_blank"><img id="ai-adb" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>ai-adb.png" /></a>-->
            <a href='https://setupad.com/maximise-your-ad-revenue-with-header-bidding/?utm_source=ad-inserter-plugin&utm_medium=banner&utm_campaign=250x250-Maximise-Your-Ad-Revenue' class="clear-link" title="<?php _e ('Maximize Your Ad Revenue', 'ad-inserter'); ?>" target="_blank"><img id="ai-sa-1" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>sa-1.png" /></a>
<?php   break; case 2: ?>
<!--            <a href="https://adinserter.pro/documentation/ad-impression-and-click-tracking" class="clear-link" title="<?php _e ('A/B testing - Track ad impressions and clicks', 'ad-inserter'); ?>" target="_blank"><img id="ai-pro-2" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>ai-charts-250.png" /></a>-->
            <a href="https://underdogmedia.com/edge-publisher-adinserter/" class="clear-link" title="<?php _e ('Maximize Revenue', 'ad-inserter'); ?>" target="_blank"><img id="ai-um-2" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>um-2.png" /></a>
<?php   break; case 3: ?>
            <a href="https://www.ezoic.com/?utm_source=ad-inserter&utm_medium=ads&utm_campaign=ad-inserter-ads&utm_term=adinserter&utm_content=ezoic&loc=2" class="clear-link" title="<?php _e ('Looking for AdSense alternative?', 'ad-inserter'); ?>" target="_blank"><img id="ai-ez-7" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>ez-7.jpg" /></a>
<?php   break;
      } ?>
          </div>
          <div class="ai-image-right">
<?php switch ($version) {
        case 0:
        ?>
<!--            <a href="https://adinserter.pro/documentation/black-and-white-lists#geo-targeting" class="clear-link" title="Geotargeting - black/white-list countries" target="_blank"><img id="ai-pro-3" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>ai-countries-250.png" /></a>-->
            <a href='https://setupad.com/maximise-your-ad-revenue-with-header-bidding/?utm_source=ad-inserter-plugin&utm_medium=banner&utm_campaign=250x250-Maximise-Your-Ad-Revenue' class="clear-link" title="<?php _e ('Maximize Your Ad Revenue', 'ad-inserter'); ?>" target="_blank"><img id="ai-sa-1" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>sa-1.png" /></a>
<?php   break;
        case 1:
        ?>
            <a href='https://www.infolinks.com/publishers/?kid=3114832&loc=2' class="clear-link" title="<?php _e ('Use Infolinks ads with Adsense to earn more', 'ad-inserter'); ?>" target="_blank"><img id="ai-info-3" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>info-3.jpg" /></a>
<!--            <a href="https://adinserter.pro/documentation/amp-pages" class="clear-link" title="<?php _e ('Insert ads on AMP pages', 'ad-inserter'); ?>" target="_blank"><img id="ai-amp" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>ai-amp.png" /></a>-->
<?php   break;
        case 2:
        ?>
            <a href="https://www.ezoic.com/?utm_source=ad-inserter&utm_medium=ads&utm_campaign=ad-inserter-ads&utm_term=adinserter&utm_content=ezoic&loc=2" class="clear-link" title="<?php _e ('Looking for AdSense alternative?', 'ad-inserter'); ?>" target="_blank"><img id="ai-ez-5" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>ez-5.png" /></a>
<?php   break;
        case 3:
?>
<!--            <a href='https://adinserter.pro/documentation/ad-blocking-detection' class="clear-link" title="<?php _e ('Ad blocking detection and content protection', 'ad-inserter'); ?>" target="_blank"><img id="ai-adb" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>ai-adb.png" /></a>-->
            <a href="https://underdogmedia.com/edge-publisher-adinserter/" class="clear-link" title="<?php _e ('Maximize Revenue', 'ad-inserter'); ?>" target="_blank"><img id="ai-um-2" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>um-2.png" /></a>
<?php   break;
      } ?>
          </div>
          <div style="clear: both;"></div>
          <div class="ai-image-left">
<?php switch ($version) {
        case 0: ?>
<!--            <a href='https://www.media.net/program?ha=e9Pw4uwo2Uw/5xjjsB3lnYZZWUI+hzRSONzDaYA9EwX+3jg/PJYwFshOFEjop5NH2wRNDfr357ZTY1zlhCk7zw%3D%3D&loc=2' class="clear-link" title="<?php _e ('Looking for AdSense alternative?', 'ad-inserter'); ?>" target="_blank"><img id="ai-media-9" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>contextual-9.gif" /></a>-->
            <a href="https://www.ezoic.com/?utm_source=ad-inserter&utm_medium=ads&utm_campaign=ad-inserter-ads&utm_term=adinserter&utm_content=ezoic&loc=2" class="clear-link" title="<?php _e ('Looking for AdSense alternative?', 'ad-inserter'); ?>" target="_blank"><img id="ai-ez-7" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>ez-7.jpg" /></a>
<?php   break; case 1: ?>
<!--            <a href="https://adinserter.pro/documentation/black-and-white-lists#geo-targeting" class="clear-link" title="Geotargeting - black/white-list countries" target="_blank"><img id="ai-pro-3" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>ai-countries-250.png" /></a>-->
            <a href="https://underdogmedia.com/edge-publisher-adinserter/" class="clear-link" title="<?php _e ('Maximize Revenue', 'ad-inserter'); ?>" target="_blank"><img id="ai-um-2" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>um-2.png" /></a>
<?php   break; case 2: ?>
<!--            <a href="https://adinserter.pro/documentation/black-and-white-lists#geo-targeting" class="clear-link" title="Geotargeting - black/white-list countries" target="_blank"><img id="ai-pro-3" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>ai-countries-250.png" /></a>-->
            <a href='https://setupad.com/maximise-your-ad-revenue-with-header-bidding/?utm_source=ad-inserter-plugin&utm_medium=banner&utm_campaign=250x250-Maximise-Your-Ad-Revenue' class="clear-link" title="<?php _e ('Maximize Your Ad Revenue', 'ad-inserter'); ?>" target="_blank"><img id="ai-sa-1" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>sa-1.png" /></a>
<?php   break; case 3: ?>
<!--            <a href="https://adinserter.pro/documentation/black-and-white-lists#geo-targeting" class="clear-link" title="Geotargeting - black/white-list countries" target="_blank"><img id="ai-pro-3" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>ai-countries-250.png" /></a>-->
            <a href='https://www.infolinks.com/publishers/?kid=3114832&loc=2' class="clear-link" title="<?php _e ('Use Infolinks ads with Adsense to earn more', 'ad-inserter'); ?>" target="_blank"><img id="ai-info-2" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>info-2.jpg" /></a>
<!--            <a href='https://www.media.net/program?ha=e9Pw4uwo2Uw/5xjjsB3lnYZZWUI+hzRSONzDaYA9EwX+3jg/PJYwFshOFEjop5NH2wRNDfr357ZTY1zlhCk7zw%3D%3D&loc=2' class="clear-link" title="<?php _e ('Looking for AdSense alternative?', 'ad-inserter'); ?>" target="_blank"><img id="ai-media-10" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>contextual-10.gif" /></a>-->
<?php   break;
      } ?>
          </div>
          <div class="ai-image-right">
<?php switch ($version) {
        case 0:
?>
<!--            <a href='https://adinserter.pro/documentation/code-preview' class="clear-link" title="<?php _e ('Code preview with visual CSS editor', 'ad-inserter'); ?>" target="_blank"><img id="ai-preview" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>ai-preview-250.png" /></a>-->
            <a href="https://underdogmedia.com/edge-publisher-adinserter/" class="clear-link" title="<?php _e ('Maximize Revenue', 'ad-inserter'); ?>" target="_blank"><img id="ai-um-2" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>um-2.png" /></a>
<!--            <a href="https://adinserter.pro/documentation/ad-impression-and-click-tracking" class="clear-link" title="<?php _e ('A/B testing - Track ad impressions and clicks', 'ad-inserter'); ?>" target="_blank"><img id="ai-pro-2" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>ai-charts-250.png" /></a>-->
<!--            <a href="https://adinserter.pro/" class="clear-link" title="Automate ad placement on posts and pages" target="_blank"><img id="ai-pro-1" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>icon-256x256.jpg" /></a>-->
<?php   break;
        case 1:
        ?>
            <a href="https://www.ezoic.com/?utm_source=ad-inserter&utm_medium=ads&utm_campaign=ad-inserter-ads&utm_term=adinserter&utm_content=ezoic&loc=2" class="clear-link" title="<?php _e ('Looking for AdSense alternative?', 'ad-inserter'); ?>" target="_blank"><img id="ai-ez-5" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>ez-5.png" /></a>
<?php   break;
        case 2:
?>
            <a href='https://www.infolinks.com/publishers/?kid=3114832&loc=2' class="clear-link" title="<?php _e ('Use Infolinks ads with Adsense to earn more', 'ad-inserter'); ?>" target="_blank"><img id="ai-info-2" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>info-2.jpg" /></a>
<!--            <a href='https://adinserter.pro/documentation/code-preview' class="clear-link" title="<?php _e ('Code preview with visual CSS editor', 'ad-inserter'); ?>" target="_blank"><img id="ai-preview" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>ai-preview-250.png" /></a>-->
<?php   break;
        case 3:
?>
            <a href='https://setupad.com/maximise-your-ad-revenue-with-header-bidding/?utm_source=ad-inserter-plugin&utm_medium=banner&utm_campaign=250x250-Maximise-Your-Ad-Revenue' class="clear-link" title="<?php _e ('Maximize Your Ad Revenue', 'ad-inserter'); ?>" target="_blank"><img id="ai-sa-1" src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>sa-1.png" /></a>
<?php   break;
      } ?>
          </div>
          <div style="clear: both;"></div>
        </div>
<?php endif; ?>

        <h3 style="text-align: justify;"><?php _e('Looking for Pro Ad Management plugin?', 'ad-inserter'); ?></h3>
        <h4 style="text-align: justify;"><?php _e ('To Optimally Monetize your WordPress website?', 'ad-inserter'); ?></h4>
        <h4 style="text-align: justify;"><?php /* Translators: %s: price of Ad Inserter Pro*/ echo sprintf (__('Different license types starting from %s', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/features" class="simple-link" target="_blank">20 EUR</a>'); ?></h4>

        <ul class="ai-help">
          <li><?php /* translators: %s HTML tags */ printf (__('%s AdSense Integration %s', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/adsense-ads#integration" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Syntax highlighting %s editor %s', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/code-editing" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Code preview %s with visual CSS editor', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/code-preview" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Simple user interface - all settings on a single page', 'ad-inserter')); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Automatic insertion %s before or after post / content / %s paragraph %s / image / excerpt', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/automatic-insertion" class="simple-link" target="_blank">', '</a>', '<a href="https://adinserter.pro/documentation/paragraph-settings" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Automatic insertion %s between posts on blog pages', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/automatic-insertion" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Automatic insertion %s before, between and after comments', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/automatic-insertion" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Automatic insertion %s after %s or before %s tag', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/automatic-insertion" class="simple-link" target="_blank">', '</a>', '<code>&lt;body&gt;</code>', '<code>&lt;/body&gt;</code>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Automatic insertion at %s custom hook positions %s', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/automatic-insertion#custom-hooks" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Insertion %s before or after any HTML element on the page %s (using CSS selectors)', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/automatic-insertion#before-after-html-element" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Insertion exceptions %s for individual posts and pages', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/individual-post-and-page-exceptions" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Manual insertion: %s widgets, shortcodes, PHP function call', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/manual-insertion" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Sticky ads %s with optional close button (ads stay fixed when the page scrolls)', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/sticky-ads" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Background ads %s with one or left and right background images', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/sticky-ads#background-ads" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Sticky sidebar ads %s (stick to the screen or to the content)', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/sticky-ads" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Sticky ad animations %s (fade, slide, turn, flip, zoom)', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/sticky-ads" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Sticky ad trigger %s (page scroll in %% or px, HTML element becomes visible)', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/sticky-ads" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Sticky (fixed) widgets %s (sidebar does not move when the page scrolls)', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/manual-insertion" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Block %s alignment and style %s customizations', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/alignments-and-styles" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Clearance %s options to avoid insertion near images or headers (AdSense TOS)', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/paragraph-settings" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Options to %s disable insertion %s on Ajax calls, 404 error pages or in RSS feeds', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/additional-block-settings" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Ad rotation %s (works also with caching)', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/ad-rotation" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Ad rotation %s optimization based on CTR %s', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/ad-rotation#ctr-optimization" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Create, edit and check %s ads.txt %s file', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/ads-txt" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Ad impression and click %s tracking %s (works also with Javascript ads like AdSense)', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/ad-impression-and-click-tracking" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Internal or external %s tracking %s (via Google Analytics or Matomo)', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/ad-impression-and-click-tracking" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Public web reports %s for clients, export to PDF', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/ad-impression-and-click-tracking#reports" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Support for %s A/B testing %s', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/ad-impression-and-click-tracking#ab-testing" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Frequency capping - %s limit impressions or clicks %s', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/ad-impression-and-click-limiting" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Click fraud %s protection %s', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/ad-impression-and-click-limiting#click-fraud-protection" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Support for %s GDPR consent cookie checks %s', 'ad-inserter'), '<a href="https://adinserter.pro/faq/gdpr-compliance-cookies-consent" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Support for %s lazy loading %s', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/additional-block-settings#lazy-loading" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Support for ads on %s AMP pages %s', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/amp-pages" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Support for contextual %s Amazon Native Shopping Ads %s (responsive)', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/common-settings#amazon" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Custom CSS class name for wrapping divs to avoid ad blockers', 'ad-inserter')); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('PHP code processing', 'ad-inserter')); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Banner %s code generator', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/code-editing#banners" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Support for %s header and footer %s code', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/plugin-settings#header-footer" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Support for Google Analytics, Matomo or any other web analytics code', 'ad-inserter')); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Desktop, tablet and phone server-side %s device detection %s', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/device-detection" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Client-side %s mobile device detection %s (works with caching)', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/device-detection" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Ad blocking detection %s - popup message, ad replacement, content protection', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/ad-blocking-detection" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Ad blocking statistics %s', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/ad-impression-and-click-tracking#ad-blocking-statistics" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Black/White-list %s categories, tags, taxonomies, users, post IDs, urls, referrers, operating systems, browsers', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/black-and-white-lists" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Black/White-list %s IP addresses or countries (works also with caching)', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/black-and-white-lists#geo-targeting" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Multisite options %s to limit settings on the sites', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/plugin-settings#multisite" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Import/Export %s block or plugin settings', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/code-editing#export-import" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Insertion scheduling %s with fallback option', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/additional-block-settings#scheduling" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Country-level %s GEO targeting %s (works also with caching)', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/black-and-white-lists#geo-targeting" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Simple troubleshooting with many %s debugging functions %s', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/debugging" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Visualization %s of inserted blocks or ads for easier placement', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/debugging#visualization" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Visualization %s of available positions for automatic ad insertion', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/debugging#visualization" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Visualization %s of HTML tags for easier ad placement between paragraphs', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/debugging#visualization" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('%s Clipboard support %s to easily copy blocks or settings', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/code-editing#clipboard" class="simple-link" target="_blank">', '</a>'); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('No ads on the settings page', 'ad-inserter')); ?></li>
          <li><?php /* translators: %s HTML tags */ printf (__('Premium support', 'ad-inserter')); ?></li>
        </ul>

        <p style="text-align: justify;"><?php /* translators: %s HTML tags */ printf (__('Ad Inserter Pro is a complete all-in-one ad management plugin for WordPress website with many advertising features to automatically insert adverts on posts and pages. With Ad Inserter Pro you also get <strong>one year of free updates and support via email</strong>. If you find Ad Inserter useful and need ad statistics for impressions and clicks, A/B testing, sticky ads, slider ads, pop-up ads, geotargeting or geolocation to serve country-specific ads, to protect content or to serve different ads for users using ad blockers, multisite options to limit settings for ads, to block some IP addresses, to schedule ads, then you can simply upgrade to %s Ad Inserter Pro %s (existing settings will be preserved).', 'ad-inserter'), '<a href="https://adinserter.pro/" style="text-decoration: none;" target="_blank">', '</a>'); ?></p>
      </div>

<?php
}

function sidebar_pro_small () { ?>

      <div class="ai-form header rounded" style="padding-bottom: 0;">
        <div style="float: left;">
          <a href="https://adinserter.pro/" class="simple-link" target="_blank"><img src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>icon-256x256.jpg" style="width: 100px;" /></a>
        </div>
        <div class="feature-list" style="float: right;">
          <h3 style="text-align: center; margin: 0;"><?php /* translators: %s HTML tags */ printf (__('Looking for %s Pro Ad Management plugin? %s', 'ad-inserter'), '<a href="https://adinserter.pro/" class="simple-link" target="_blank">', '</a>'); ?></h3>
          <hr style="margin-bottom: 0;" />

          <div style="float: right; margin-left: 15px;">
            <ul>
              <li><?php /* translators: %s HTML tags */ printf (__('Ads between posts', 'ad-inserter')); ?></li>
              <li><?php /* translators: %s HTML tags */ printf (__('Ads between comments', 'ad-inserter')); ?></li>
              <li><?php /* translators: %s HTML tags */ printf (__('Support via email', 'ad-inserter')); ?></li>
            </ul>
          </div>

          <div style="float: right; margin-left: 15px;">
            <ul>
              <li><?php /* translators: %s HTML tags */ printf (__('%s Sticky positions %s', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/alignments-and-styles" class="simple-link" target="_blank">', '</a>'); ?></li>
              <li><?php /* translators: %s HTML tags */ printf (__('%s Limit insertions %s', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/black-and-white-lists" class="simple-link" target="_blank">', '</a>'); ?></li>
              <li><?php /* translators: %s HTML tags */ printf (__('%s Clearance %s options', 'ad-inserter'), '<a href="https://adinserter.pro/documentation#paragraphs" class="simple-link" target="_blank">', '</a>'); ?></li>
            </ul>
          </div>

          <div style="float: right; margin-left: 15px;">
            <ul>
              <li><?php /* translators: %s HTML tags */ printf (__('Ad rotation', 'ad-inserter')); ?></li>
              <li><?php /* translators: %s HTML tags */ printf (__('%s A/B testing %s', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/ad-impression-and-click-tracking#ab-testing" class="simple-link" target="_blank">', '</a>'); ?></li>
              <li><?php /* translators: %s HTML tags */ printf (__('%s Ad tracking %s', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/ad-impression-and-click-tracking" class="simple-link" target="_blank">', '</a>'); ?></li>
            </ul>
          </div>

          <div style="float: right; margin-left: 15px;">
            <ul>
              <li><?php /* translators: %s HTML tags */ printf (__('Support for %s AMP pages %s', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/amp-pages" class="simple-link" target="_blank">', '</a>'); ?></li>
              <li><?php /* translators: %s HTML tags */ printf (__('%s Ad blocking detection %s', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/ad-blocking-detection" class="simple-link" target="_blank">', '</a>'); ?></li>
              <li><?php /* translators: %s HTML tags */ printf (__('%s Mobile device detection %s', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/device-detection" class="simple-link" target="_blank">', '</a>'); ?></li>

            </ul>
          </div>

          <div style="float: right; margin-left: 15px;">
            <ul>
              <li><?php /* translators: %s HTML tags */ printf (__('64 code blocks', 'ad-inserter')); ?></li>
              <li><?php /* translators: %s HTML tags */ printf (__('%s GEO targeting %s', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/black-and-white-lists#geo-targeting" class="simple-link" target="_blank">', '</a>'); ?></li>
              <li><?php /* translators: %s HTML tags */ printf (__('%s Scheduling %s', 'ad-inserter'), '<a href="https://adinserter.pro/documentation/additional-block-settings#scheduling" class="simple-link" target="_blank">', '</a>'); ?></li>
            </ul>
          </div>

          <div style="clear: both;"></div>
        </div>
        <div style="clear: both;"></div>
      </div>

<?php
}

function ai_block_code_demo ($block_class_name, $block_class, $block_number_class, $block_name_class, $inline_styles) {
  global $block_object;
  $default = $block_object [0];

  $block_class_name = sanitize_html_class ($block_class_name);

  $classes = array ();
  if ($block_class_name != '' && $block_class) $classes []= $block_class_name;
  if (defined ('AI_NORMAL_HEADER_STYLES') && AI_NORMAL_HEADER_STYLES && !$inline_styles) $classes []= $default->generate_alignment_class ($block_class_name);
  if ($block_class_name != '' && $block_number_class) $classes []= $block_class_name . '-n';
  if ($block_class_name != '' && $block_name_class) $classes []= $block_class_name . '-name';

  $class = count ($classes) ? ' class="' . implode (' ', $classes) . '"' : '';
  $style = $inline_styles || !defined ('AI_NORMAL_HEADER_STYLES') ? ' style="' . AI_ALIGNMENT_CSS_DEFAULT . '"' : '';

  echo "&lt;div$class$style&gt;";
}
