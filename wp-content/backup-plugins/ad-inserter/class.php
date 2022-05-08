<?php

if (!defined ('ABSPATH')) exit;

require_once AD_INSERTER_PLUGIN_DIR.'constants.php';

abstract class ai_BaseCodeBlock {
  var $number;

  var $wp_options;
  var $fallback;
  var $client_side_list_detection;
  var $w3tc_code;
  var $w3tc_debug;
  var $w3tc_fallback_code;
  var $before_w3tc_fallback_code;
  var $needs_class;
  var $code_version;
  var $version_name;
  var $additional_code_before; // For server-side dynamic PHP code and debugging labels
  var $additional_code_after;  // For server-side dynamic PHP code and debugging labels
  var $additional_code_before_block; // For clint-side manual insertion set to auto
  var $counters;
  var $client_side_cookie_check;
  var $hide_debug_labels;
  var $demo_debugging;
  var $hidden_viewports;
  var $head_code_written;
  var $wrapping_div_classes;
  var $code_empty;

  var $check_statistics;

  var $check_block;
  var $check_block_style;
  var $check_block_classes;
  var $check_block_parameters;
  var $check_block_additional_code;

  var $check_codes;
  var $check_codes_index;
  var $check_codes_data;
  var $check_code_empty;
  var $check_code_insertions;

  var $check_css;
  var $check_url_parameters;
  var $check_url_parameter_list_type;
  var $check_cookies;
  var $check_cookie_list_type;
  var $check_referers;
  var $check_referers_list_type;
  var $check_clients;
  var $check_clients_list_type;
  var $check_ip_addresses;
  var $check_ip_addresses_list_type;
  var $check_countries;
  var $check_countries_list_type;
  var $check_viewports;
  var $check_viewports_list_type;
  var $check_scheduling_start_time;
  var $check_scheduling_end_time;
  var $check_scheduling_days_in_week;
  var $check_scheduling_type;
  var $check_scheduling_fallback_block;

  var $check_names;
  var $count_names;
  var $roate_names;
  var $viewport_names;
  var $fallback_names;

  var $check_index;
  var $count_index;
  var $rotate_index;
  var $viewport_index;
  var $fallback_index;

  var $shortcodes;

  var $client_side_filter_hook_check;

  var $no_insertion_text;

  var $label;

  function __construct () {

    $this->number = 0;

    $this->wp_options = array ();
    $this->fallback = 0;
    $this->client_side_list_detection = false;
    $this->w3tc_code = '';
    $this->w3tc_debug = array ();
    $this->w3tc_fallback_code = '';
    $this->before_w3tc_fallback_code = '';
    $this->needs_class = false;
    $this->code_version = 0;
    $this->version_name = '';
    $this->additional_code_before = '';
    $this->additional_code_after = '';
    $this->additional_code_before_block = '';
    $this->counters = '';
    $this->client_side_cookie_check = false;
    $this->hide_debug_labels = false;
    $this->demo_debugging = false;
    $this->hidden_viewports = '';
    $this->head_code_written = false;
    $this->wrapping_div_classes = array ();
    $this->code_empty = false;

    $this->check_statistics = false;

    $this->check_block = false;
    $this->check_block_style = '';
    $this->check_block_classes = array ();
    $this->check_block_parameters = '';
    $this->check_block_additional_code = '';

    $this->check_codes = null;
    $this->check_codes_index = 0;
    $this->check_codes_data = null;
    $this->check_code_empty = false;
    $this->check_code_insertions = null;

    $this->check_names = null;
    $this->count_names = null;
    $this->roate_names = null;
    $this->viewport_names = null;
    $this->fallback_names = null;

    $this->check_index  = 0;
    $this->count_index  = 0;
    $this->rotate_index = 0;
    $this->viewport_index = 0;
    $this->fallback_index = 0;

    $this->client_side_filter_hook_check = false;

    $this->no_insertion_text = '';

    $this->labels = new ai_block_labels ();

    $this->wp_options [AI_OPTION_CODE]                = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_PROCESS_PHP]         = AI_DISABLED;
    $this->wp_options [AI_OPTION_ENABLE_MANUAL]       = AI_DISABLED;
    $this->wp_options [AI_OPTION_ENABLE_AMP]          = AI_DISABLED;
    $this->wp_options [AI_OPTION_ENABLE_404]          = AI_DISABLED;
    $this->wp_options [AI_OPTION_DETECT_SERVER_SIDE]  = AI_DISABLED;
    $this->wp_options [AI_OPTION_DISPLAY_FOR_DEVICES] = DEFAULT_DISPLAY_FOR_DEVICES;
  }

  public function load_options ($block) {
    global $ai_db_options;

    if (isset ($ai_db_options [$block])) $options = $ai_db_options [$block]; else $options = array ();

    // Convert old options
    if (empty ($options) && !isset ($ai_db_options [AI_OPTION_GLOBAL]['VERSION'])) {

      if     ($block == "h") $options = ai_get_old_option (str_replace ("#", "Header", AD_ADx_OPTIONS));
      elseif ($block == "f") $options = ai_get_old_option (str_replace ("#", "Footer", AD_ADx_OPTIONS));
      else                   $options = ai_get_old_option (str_replace ("#", $block, AD_ADx_OPTIONS));

      if (is_array ($options)) {

        $old_name = "ad" . $block . "_data";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_CODE] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_enable_manual";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_ENABLE_MANUAL] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_process_php";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_PROCESS_PHP] = $options [$old_name];
          unset ($options [$old_name]);
        }

        $old_name = "adH_data";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_CODE] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "adH_enable";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_ENABLE_MANUAL] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "adH_process_php";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_PROCESS_PHP] = $options [$old_name];
          unset ($options [$old_name]);
        }

        $old_name = "adF_data";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_CODE] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "adF_enable";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_ENABLE_MANUAL] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "adF_process_php";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_PROCESS_PHP] = $options [$old_name];
          unset ($options [$old_name]);
        }

        $old_name = "ad" . $block . "_name";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_BLOCK_NAME] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_displayType";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_AUTOMATIC_INSERTION] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_paragraphNumber";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_PARAGRAPH_NUMBER] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_minimum_paragraphs";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_MIN_PARAGRAPHS] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_minimum_words";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_MIN_WORDS] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_excerptNumber";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_EXCERPT_NUMBER] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_directionType";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_DIRECTION_TYPE] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_floatType";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_ALIGNMENT_TYPE] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_general_tag";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_GENERAL_TAG] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_after_day";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_AFTER_DAYS] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_block_user";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_DOMAIN_LIST] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_domain_list_type";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_DOMAIN_LIST_TYPE] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_block_cat";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_CATEGORY_LIST] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_block_cat_type";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_CATEGORY_LIST_TYPE] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_block_tag";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_TAG_LIST] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_block_tag_type";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_TAG_LIST_TYPE] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_widget_settings_home";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_DISPLAY_ON_HOMEPAGE] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_widget_settings_page";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_DISPLAY_ON_PAGES] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_widget_settings_post";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_DISPLAY_ON_POSTS] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_widget_settings_category";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_DISPLAY_ON_CATEGORY_PAGES] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_widget_settings_search";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_DISPLAY_ON_SEARCH_PAGES] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_widget_settings_archive";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_DISPLAY_ON_ARCHIVE_PAGES] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_enabled_on_which_pages";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_ENABLED_ON_WHICH_PAGES] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_enabled_on_which_posts";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_ENABLED_ON_WHICH_POSTS] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_enable_php_call";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_ENABLE_PHP_CALL] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_paragraph_text";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_PARAGRAPH_TEXT] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_custom_css";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_CUSTOM_CSS] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_display_for_users";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_DISPLAY_FOR_USERS] = $options [$old_name];
          unset ($options [$old_name]);
        }
        $old_name = "ad" . $block . "_display_for_devices";
        if (isset ($options [$old_name])) {
          $options [AI_OPTION_DISPLAY_FOR_DEVICES] = $options [$old_name];
          unset ($options [$old_name]);
        }
      }
    }

    if (!empty ($options)) $this->wp_options = array_merge ($this->wp_options, $options);
    unset ($this->wp_options ['']);
  }

  public function get_ad_name(){
     $name = isset ($this->wp_options [AI_OPTION_BLOCK_NAME]) ? $this->wp_options [AI_OPTION_BLOCK_NAME] : "";
     return $name;
  }

  public function get_ad_data(){
    $ad_data = isset ($this->wp_options [AI_OPTION_CODE]) ? $this->wp_options [AI_OPTION_CODE] : '';
    return $ad_data;
  }

  public function get_ad_code_hash () {
    $block_code = $this->get_ad_data ();
    $hash = strlen ($block_code);
    $length = strlen ($block_code);
    for ($i = 0; $i < $length; $i ++) {
      $hash += ord ($block_code [$i]);
    }
    return $hash;
  }

  public function get_enable_manual (){
    $enable_manual = isset ($this->wp_options [AI_OPTION_ENABLE_MANUAL]) ? $this->wp_options [AI_OPTION_ENABLE_MANUAL] : AI_DISABLED;
    if ($enable_manual == '') $enable_manual = AI_DISABLED;
    return $enable_manual;
  }

  public function get_enable_amp ($return_saved_value = false){
    $enable_amp = isset ($this->wp_options [AI_OPTION_ENABLE_AMP]) ? $this->wp_options [AI_OPTION_ENABLE_AMP] : AI_DISABLED;

    if ($return_saved_value) return $enable_amp;

    // Fix for AMP code blocks with whitelisted url */amp
    $urls = $this->get_ad_url_list();
    $url_type = $this->get_ad_url_list_type();
    if ($url_type == AI_WHITE_LIST && strpos ($urls, '/amp') !== false) {
      $enable_amp = true;
    }
    // Fix for code blocks using PHP function is_amp_endpoint
    elseif ($this->get_process_php() && strpos ($this->get_ad_data (), 'is_amp_endpoint') !== false) {
      $enable_amp = true;
    }

    return $enable_amp;
  }

  public function get_process_php (){
    $process_php = isset ($this->wp_options [AI_OPTION_PROCESS_PHP]) ? $this->wp_options [AI_OPTION_PROCESS_PHP] : AI_DISABLED;
    if ($process_php == '') $process_php = AI_DISABLED;
    return $process_php;
  }

  public function get_enable_404 (){
    $enable_404 = isset ($this->wp_options [AI_OPTION_ENABLE_404]) ? $this->wp_options [AI_OPTION_ENABLE_404] : AI_DISABLED;
    if ($enable_404 == '') $enable_404 = AI_DISABLED;
    return $enable_404;
  }

  public function get_detection_server_side(){
    // Check old settings for all devices
    if (isset ($this->wp_options [AI_OPTION_DISPLAY_FOR_DEVICES])) {
      $display_for_devices = $this->wp_options [AI_OPTION_DISPLAY_FOR_DEVICES];
    } else $display_for_devices = '';

    if ($display_for_devices === AD_DISPLAY_ALL_DEVICES) $option = AI_DISABLED; else

      $option = isset ($this->wp_options [AI_OPTION_DETECT_SERVER_SIDE]) ? $this->wp_options [AI_OPTION_DETECT_SERVER_SIDE] : AI_DISABLED;

    return $option;
  }

  function check_filter_hook ($debug_processing) {
    global $ai_wp_data, $ai_last_check, $ai_total_hook_php_time, $filter_hooks;

    $ai_last_check = AI_CUSTOM_FILTER_CHECK;

    $hook_start_time = microtime (true);                                     // Server-side chack, false = client-side check or W3TC check
    $check = apply_filters ("ai_block_insertion_check", true, $this->number, true);
    $ai_total_hook_php_time += microtime (true) - $hook_start_time;

    if ($check === null) {
      $ai_wp_data [AI_CLIENT_SIDE_FILTER_CHECKS] = true;
      $this->client_side_filter_hook_check = true;
      return true;
    }

    if ($debug_processing && !$check) {
      $filter_hooks []= array ("ai_block_insertion_check", $this->number);
    }

    return $check;
  }

  function check_server_side_detection () {
    global $ai_last_check;

    if ($this->get_detection_server_side ()) {
      $display_for_devices = $this->get_display_for_devices ();

      $ai_last_check = AI_CHECK_DESKTOP_DEVICES;
      if ($display_for_devices == AI_INSERT_FOR_DESKTOP_DEVICES && !AI_DESKTOP) return false;
      $ai_last_check = AI_CHECK_MOBILE_DEVICES;
      if ($display_for_devices == AI_INSERT_FOR_MOBILE_DEVICES && !AI_MOBILE) return false;
      $ai_last_check = AI_CHECK_TABLET_DEVICES;
      if ($display_for_devices == AI_INSERT_FOR_TABLET_DEVICES && !AI_TABLET) return false;
      $ai_last_check = AI_CHECK_PHONE_DEVICES;
      if ($display_for_devices == AI_INSERT_FOR_PHONE_DEVICES && !AI_PHONE) return false;
      $ai_last_check = AI_CHECK_DESKTOP_TABLET_DEVICES;
      if ($display_for_devices == AI_INSERT_FOR_DESKTOP_TABLET_DEVICES && !(AI_DESKTOP || AI_TABLET)) return false;
      $ai_last_check = AI_CHECK_DESKTOP_PHONE_DEVICES;
      if ($display_for_devices == AI_INSERT_FOR_DESKTOP_PHONE_DEVICES && !(AI_DESKTOP || AI_PHONE)) return false;
    }
    return true;
  }

  public function get_display_for_devices () {
    $option = isset ($this->wp_options [AI_OPTION_DISPLAY_FOR_DEVICES]) ? $this->wp_options [AI_OPTION_DISPLAY_FOR_DEVICES] : DEFAULT_DISPLAY_FOR_DEVICES;
    //                                convert old option
    if ($option == '' || $option == AD_DISPLAY_ALL_DEVICES) $option = DEFAULT_DISPLAY_FOR_DEVICES;

    elseif ($option == AD_DISPLAY_DESKTOP_DEVICES)         $option = AI_INSERT_FOR_DESKTOP_DEVICES;
    elseif ($option == AD_DISPLAY_MOBILE_DEVICES)          $option = AI_INSERT_FOR_MOBILE_DEVICES;
    elseif ($option == AD_DISPLAY_TABLET_DEVICES)          $option = AI_INSERT_FOR_TABLET_DEVICES;
    elseif ($option == AD_DISPLAY_PHONE_DEVICES)           $option = AI_INSERT_FOR_PHONE_DEVICES;
    elseif ($option == AD_DISPLAY_DESKTOP_TABLET_DEVICES)  $option = AI_INSERT_FOR_DESKTOP_TABLET_DEVICES;
    elseif ($option == AD_DISPLAY_DESKTOP_PHONE_DEVICES)   $option = AI_INSERT_FOR_DESKTOP_PHONE_DEVICES;

    return $option;
  }

  public function get_display_for_devices_text ($translate = true) {
    switch ($this->get_display_for_devices ()) {
      case AI_INSERT_FOR_DESKTOP_DEVICES:
        if (!$translate) return AI_TEXT_ENG_DESKTOP_DEVICES;
        return AI_TEXT_DESKTOP_DEVICES;
        break;
      case AI_INSERT_FOR_MOBILE_DEVICES:
        if (!$translate) return AI_TEXT_ENG_MOBILE_DEVICES;
        return AI_TEXT_MOBILE_DEVICES;
        break;
      case AI_INSERT_FOR_TABLET_DEVICES:
        if (!$translate) return AI_TEXT_ENG_TABLET_DEVICES;
        return AI_TEXT_TABLET_DEVICES;
        break;
      case AI_INSERT_FOR_PHONE_DEVICES:
        if (!$translate) return AI_TEXT_ENG_PHONE_DEVICES;
        return AI_TEXT_PHONE_DEVICES;
        break;
      case AI_INSERT_FOR_DESKTOP_TABLET_DEVICES:
        if (!$translate) return AI_TEXT_ENG_DESKTOP_TABLET_DEVICES;
        return AI_TEXT_DESKTOP_TABLET_DEVICES;
        break;
      case AI_INSERT_FOR_DESKTOP_PHONE_DEVICES:
        if (!$translate) return AI_TEXT_ENG_DESKTOP_PHONE_DEVICES;
        return AI_TEXT_DESKTOP_PHONE_DEVICES;
        break;
      default:
        return '';
        break;
    }
  }

  public function get_debug_disable_insertion (){
    global $ai_wp_data;

    if (defined ('AI_DEBUGGING_DEMO') && !$this->demo_debugging) {
      return false;
    }

    return ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_NO_INSERTION) != 0;
  }

  public function clear_code_cache (){
    unset ($this->wp_options ['GENERATED_CODE']);
  }

  public function empty_code ($code = null) {
    global $ai_last_check, $ai_wp_data;

    $ai_last_check = AI_CHECK_CODE;

    if (isset ($ai_wp_data [AI_BLOCK_PHP_CODE_CACHING][$this->number]) && !$ai_wp_data [AI_BLOCK_PHP_CODE_CACHING][$this->number]) {
      return false;
    }

    if ($this->get_automatic_insertion () == AI_AUTOMATIC_INSERTION_INSIDE_HTML_ELEMENT &&
        ($this->get_inside_element () == AI_HTML_REPLACE_CONTENT ||
         $this->get_inside_element () == AI_HTML_REPLACE_ELEMENT)) {
      return false;
    }

    if ($this->get_background () &&
        $this->get_horizontal_position () == AI_STICK_HORIZONTAL_CENTER) {
      return false;
    }

    $parallax_options = false;
    for ($index = 1; $index <= 3; $index ++) {
      $parallax_options |= $this->get_parallax ($index) && $this->get_parallax_image ($index) != '';
      if ($parallax_options) return false;
    }

    if ($code === null) {
      $code = $this->ai_getCode ();
    }

    $empty = $code == '';

    return $empty;
  }

  public function ai_getCode (){
    global $block_object, $ai_total_block_php_time, $ai_wp_data, $ad_inserter_globals, $ai_total_hook_php_time, $filter_hooks;

    if ($this->fallback != 0 && $this->fallback <= 96 && $this->fallback != $this->number) {

      $globals_name = AI_FALLBACK_DEPTH_NAME;
      if (!isset ($ad_inserter_globals [$globals_name])) {
        $ad_inserter_globals [$globals_name] = 0;
      }

      if ($ad_inserter_globals [$globals_name] < 3) {
        $ad_inserter_globals [$globals_name] ++;

        $fallback_code = $block_object [$this->fallback]->ai_getCode ();

        $ad_inserter_globals [$globals_name] --;

        return $fallback_code;
      }
    }

    $debug_processing = ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0;

    $obj = $this;
    $code_org = $obj->get_ad_data();

    $hook_start_time = microtime (true);
    $code = apply_filters ("ai_block_code", $code_org, $this->number);
    if ($debug_processing && $code != $code_org) {
      $filter_hooks []= array ("ai_block_code", $this->number);
    }
    $ai_total_hook_php_time += microtime (true) - $hook_start_time;

    $php_enabled = $ai_wp_data [AI_PHP_PROCESSING];
    if (!ai_php_enabled ()) {
      $php_enabled = false;
    }

    if ($php_enabled && $obj->get_process_php () && !get_disable_php_processing () && (!is_multisite() || is_main_site () || multisite_php_processing ()) && !defined ('AI_NO_PHP_PROCESSING')) {
      $global_name = 'GENERATED_CODE';

      if (isset ($obj->wp_options [$global_name]) && (!isset ($ai_wp_data [AI_BLOCK_PHP_CODE_CACHING][$this->number]) || $ai_wp_data [AI_BLOCK_PHP_CODE_CACHING][$this->number])) {
        $code = $obj->wp_options [$global_name];

        $unfiltered_html = $ai_wp_data [AI_UNFILTERED_HTML];
        if (defined ('DISALLOW_UNFILTERED_HTML') && DISALLOW_UNFILTERED_HTML) {
          $unfiltered_html = false;
        }

        if (!$unfiltered_html) {
          $code = wp_kses ($code, 'post');
        }

        return $code;
      }

      $start_time = microtime (true);

      $php_error = "";
      ob_start ();

      try {
        eval ("?>". $code . "<?php ");
      } catch (Exception $e) {
                                // translators: %s: Ad Inserter
          $php_error = sprintf (__("PHP error in %s block", 'ad-inserter') . AD_INSERTER_NAME) . ' ' . ($obj->number == 0 ? '' : $obj->number . " - ") . $obj->get_ad_name() . "<br />\n" .  $e->getMessage();
      }

      $processed_code = ob_get_clean ();

      if (strpos ($processed_code, __FILE__) || $php_error != "") {

        if (preg_match ("%(.+) in ".__FILE__."%", strip_tags($processed_code), $error_message))
                           // translators: %s: Ad Inserter
          $code = sprintf (__("PHP error in %s block", 'ad-inserter'), AD_INSERTER_NAME) . ' '. ($obj->number == 0 ? '' : $obj->number . " - ") . $obj->get_ad_name() . "<br />\n" . $error_message [1];
        elseif (preg_match ("%(.+) in ".__FILE__."%", $php_error, $error_message))
                           // translators: %s: Ad Inserter
          $code = sprintf (__("PHP error in %s block", 'ad-inserter'), AD_INSERTER_NAME) . ' ' .($obj->number == 0 ? '' : $obj->number . " - ") . $obj->get_ad_name() . "<br />\n" . $error_message [1];

        else $code = $processed_code;
      } else $code = $processed_code;

      // Cache generated code
      if (!isset ($ai_wp_data [AI_BLOCK_PHP_CODE_CACHING][$this->number]) || $ai_wp_data [AI_BLOCK_PHP_CODE_CACHING][$this->number]) {

        $obj->wp_options [$global_name] = $code;
      }

      $ai_total_block_php_time += microtime (true) - $start_time;
    }

    $code_org = $code;

    $hook_start_time = microtime (true);
    $code = apply_filters ("ai_block_code_after_php", $code_org, $this->number);
    if ($debug_processing && $code != $code_org) {
      $filter_hooks []= array ("ai_block_code_after_php", $this->number);
    }
    $ai_total_hook_php_time += microtime (true) - $hook_start_time;

    $unfiltered_html = $ai_wp_data [AI_UNFILTERED_HTML];
    if (defined ('DISALLOW_UNFILTERED_HTML') && DISALLOW_UNFILTERED_HTML) {
      $unfiltered_html = false;
    }

    if (!$unfiltered_html) {
      $code = wp_kses ($code, 'post');
    }

    return $code;
  }
}

abstract class ai_CodeBlock extends ai_BaseCodeBlock {

  function __construct () {

    parent::__construct();

    $this->wp_options [AI_OPTION_BLOCK_NAME]                 = '';
    $this->wp_options [AI_OPTION_DISABLE_INSERTION]          = AI_DISABLED;
    $this->wp_options [AI_OPTION_SHOW_LABEL]                 = AI_DISABLED;
    $this->wp_options [AI_OPTION_BLOCK_WIDTH]                = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_BLOCK_HEIGHT]               = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_BLOCK_BACKGROUND_COLOR]     = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_LAZY_LOADING]               = AI_DISABLED;
    $this->wp_options [AI_OPTION_WAIT_FOR_INTERACTION]       = AI_DISABLED;
    $this->wp_options [AI_OPTION_PROTECTED]                  = AI_DISABLED;
    $this->wp_options [AI_OPTION_MANUAL_LOADING]             = AI_MANUAL_LOADING_DISABLED;
    $this->wp_options [AI_OPTION_IFRAME]                     = AI_DISABLED;
    $this->wp_options [AI_OPTION_LABEL_IN_IFRAME]            = AI_DISABLED;
    $this->wp_options [AI_OPTION_IFRAME_WIDTH]               = DEFAULT_IFRAME_WIDTH;
    $this->wp_options [AI_OPTION_IFRAME_HEIGHT]              = DEFAULT_IFRAME_HEIGHT;
    $this->wp_options [AI_OPTION_TRACKING]                   = AI_DISABLED;
    $this->wp_options [AI_OPTION_AUTOMATIC_INSERTION]        = AI_AUTOMATIC_INSERTION_DISABLED;
    $this->wp_options [AI_OPTION_HTML_SELECTOR]              = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_SERVER_SIDE_INSERTION]      = DEFAULT_SERVER_SIDE_INSERTION;
    $this->wp_options [AI_OPTION_HTML_ELEMENT_INSERTION]     = DEFAULT_HTML_ELEMENT_INSERTION;
    $this->wp_options [AI_OPTION_WAIT_FOR]                   = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_WAIT_FOR_DELAY]             = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_INSIDE_ELEMENT]             = DEFAULT_INSIDE_ELEMENT;
    $this->wp_options [AI_OPTION_PARAGRAPH_NUMBER]           = AD_ONE;
    $this->wp_options [AI_OPTION_MIN_PARAGRAPHS]             = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_MAX_PARAGRAPHS]             = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_SKIP_FIRST_PARAGRAPHS]      = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_SKIP_LAST_PARAGRAPHS]       = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_MIN_WORDS_ABOVE]            = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_MIN_WORDS]                  = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_MAX_WORDS]                  = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_MIN_PARAGRAPH_WORDS]        = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_MAX_PARAGRAPH_WORDS]        = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_COUNT_INSIDE_BLOCKQUOTE]    = AI_DISABLED;
    $this->wp_options [AI_OPTION_COUNT_INSIDE]               = DEFAULT_COUNT_INSIDE;
    $this->wp_options [AI_OPTION_COUNT_INSIDE_ELEMENTS]      = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_COUNT_INSIDE_ELEMENTS_CONTAIN] = DEFAULT_COUNT_INSIDE_ELEMENTS_CONTAIN;
    $this->wp_options [AI_OPTION_COUNT_INSIDE_ELEMENTS_TEXT] = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_CHECK_ONLY_TAG_ATTRIBUTES]  = AI_DISABLED;
    $this->wp_options [AI_OPTION_PARAGRAPH_TAGS]             = DEFAULT_PARAGRAPH_TAGS;
    $this->wp_options [AI_OPTION_AVOID_PARAGRAPHS_ABOVE]     = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_AVOID_PARAGRAPHS_BELOW]     = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_AVOID_TEXT_ABOVE]           = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_AVOID_TEXT_BELOW]           = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_AVOID_ACTION]               = DEFAULT_AVOID_ACTION;
    $this->wp_options [AI_OPTION_AVOID_TRY_LIMIT]            = AD_ONE;
    $this->wp_options [AI_OPTION_AVOID_DIRECTION]            = DEFAULT_AVOID_DIRECTION;
    $this->wp_options [AI_OPTION_EXCERPT_NUMBER]             = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_FILTER_TYPE]                = AI_FILTER_AUTO;
    $this->wp_options [AI_OPTION_INVERTED_FILTER]            = AI_DISABLED;
    $this->wp_options [AI_OPTION_DIRECTION_TYPE]             = DEFAULT_DIRECTION_TYPE;
    $this->wp_options [AI_OPTION_ALIGNMENT_TYPE]             = AI_ALIGNMENT_DEFAULT;

    if (defined ('AI_STICKY_SETTINGS') && AI_STICKY_SETTINGS) {
      $this->wp_options [AI_OPTION_HORIZONTAL_POSITION]        = DEFAULT_HORIZONTAL_POSITION;
      $this->wp_options [AI_OPTION_VERTICAL_POSITION]          = DEFAULT_VERTICAL_POSITION;
      $this->wp_options [AI_OPTION_HORIZONTAL_MARGIN]          = DEFAULT_HORIZONTAL_MARGIN;
      $this->wp_options [AI_OPTION_VERTICAL_MARGIN]            = DEFAULT_VERTICAL_MARGIN;
      $this->wp_options [AI_OPTION_ANIMATION]                  = DEFAULT_ANIMATION;
      $this->wp_options [AI_OPTION_ANIMATION_TRIGGER]          = DEFAULT_ANIMATION_TRIGGER;
      $this->wp_options [AI_OPTION_ANIMATION_TRIGGER_VALUE]    = DEFAULT_ANIMATION_TRIGGER_VALUE;
      $this->wp_options [AI_OPTION_ANIMATION_TRIGGER_OFFSET]   = DEFAULT_ANIMATION_TRIGGER_OFFSET;
      $this->wp_options [AI_OPTION_ANIMATION_TRIGGER_DELAY]    = DEFAULT_ANIMATION_TRIGGER_DELAY;

      $this->wp_options [AI_OPTION_ANIMATION_TRIGGER_ONCE]     = DEFAULT_ANIMATION_TRIGGER_ONCE;

      $this->wp_options [AI_OPTION_ANIMATION_OUT_TRIGGER]          = AI_TRIGGER_ENABLED;
      $this->wp_options [AI_OPTION_ANIMATION_OUT_TRIGGER_VALUE]    = DEFAULT_ANIMATION_TRIGGER_VALUE;
      $this->wp_options [AI_OPTION_ANIMATION_OUT_TRIGGER_OFFSET]   = DEFAULT_ANIMATION_TRIGGER_OFFSET;
    }
    $this->wp_options [AI_OPTION_GENERAL_TAG]                = DEFAULT_GENERAL_TAG;
    $this->wp_options [AI_OPTION_SCHEDULING]                 = AI_SCHEDULING_OFF;
    $this->wp_options [AI_OPTION_AFTER_DAYS]                 = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_START_DATE]                 = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_END_DATE]                   = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_START_TIME]                 = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_END_TIME]                   = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_WEEKDAYS]                   = DEFAULT_WEEKDAYS;
    $this->wp_options [AI_OPTION_SCHEDULING_FALLBACK]        = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_ADB_BLOCK_ACTION]           = DEFAULT_ADB_BLOCK_ACTION;
    $this->wp_options [AI_OPTION_ADB_BLOCK_REPLACEMENT]      = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_MAXIMUM_INSERTIONS]         = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_ID_LIST]                    = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_ID_LIST_TYPE]               = AI_BLACK_LIST;
    $this->wp_options [AI_OPTION_URL_LIST]                   = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_URL_LIST_TYPE]              = AI_BLACK_LIST;
    $this->wp_options [AI_OPTION_URL_PARAMETER_LIST]         = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_URL_PARAMETER_LIST_TYPE]    = AI_BLACK_LIST;
    $this->wp_options [AI_OPTION_COOKIE_LIST]                = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_COOKIE_LIST_TYPE]           = AI_BLACK_LIST;
    $this->wp_options [AI_OPTION_DOMAIN_LIST]                = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_DOMAIN_LIST_TYPE]           = AI_BLACK_LIST;
    $this->wp_options [AI_OPTION_CLIENT_LIST]                = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_CLIENT_LIST_TYPE]           = AI_BLACK_LIST;
    $this->wp_options [AI_OPTION_IP_ADDRESS_LIST]            = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_IP_ADDRESS_LIST_TYPE]       = AI_BLACK_LIST;
    $this->wp_options [AI_OPTION_COUNTRY_LIST]               = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_COUNTRY_LIST_TYPE]          = AI_BLACK_LIST;
    $this->wp_options [AI_OPTION_CATEGORY_LIST]              = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_CATEGORY_LIST_TYPE]         = AI_BLACK_LIST;
    $this->wp_options [AI_OPTION_TAG_LIST]                   = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_TAG_LIST_TYPE]              = AI_BLACK_LIST;
    $this->wp_options [AI_OPTION_TAXONOMY_LIST]              = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_TAXONOMY_LIST_TYPE]         = AI_BLACK_LIST;
    $this->wp_options [AI_OPTION_DISPLAY_ON_POSTS]           = AI_ENABLED;
    $this->wp_options [AI_OPTION_DISPLAY_ON_PAGES]           = AI_DISABLED;
    $this->wp_options [AI_OPTION_DISPLAY_ON_HOMEPAGE]        = AI_DISABLED;
    $this->wp_options [AI_OPTION_DISPLAY_ON_CATEGORY_PAGES]  = AI_DISABLED;
    $this->wp_options [AI_OPTION_DISPLAY_ON_SEARCH_PAGES]    = AI_DISABLED;
    $this->wp_options [AI_OPTION_DISPLAY_ON_ARCHIVE_PAGES]   = AI_DISABLED;
    $this->wp_options [AI_OPTION_ENABLE_AJAX]                = AI_ENABLED;
    $this->wp_options [AI_OPTION_DISABLE_CACHING]            = AI_DISABLED;
    $this->wp_options [AI_OPTION_MAX_PAGE_BLOCKS_ENABLED]    = AI_DISABLED;
    $this->wp_options [AI_OPTION_ONLY_IN_THE_LOOP]           = AI_DISABLED;
    $this->wp_options [AI_OPTION_EMBED_JS_CODE]              = AI_DISABLED;
    $this->wp_options [AI_OPTION_ENABLE_FEED]                = AI_DISABLED;
//    $this->wp_options [AI_OPTION_ENABLED_ON_WHICH_PAGES]     = AI_IGNORE_EXCEPTIONS;
//    $this->wp_options [AI_OPTION_ENABLED_ON_WHICH_POSTS]     = AI_IGNORE_EXCEPTIONS;
    $this->wp_options [AI_OPTION_EXCEPTIONS_ENABLED]         = AI_DISABLED;
    $this->wp_options [AI_OPTION_EXCEPTIONS_FUNCTION]        = AI_DEFAULT_INSERTION_ENABLED;
    $this->wp_options [AI_OPTION_ENABLE_PHP_CALL]            = AI_DISABLED;
    $this->wp_options [AI_OPTION_ENABLE_WIDGET]              = AI_ENABLED;
    $this->wp_options [AI_OPTION_PARAGRAPH_TEXT]             = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_PARAGRAPH_TEXT_TYPE]        = DEFAULT_PARAGRAPH_TEXT_TYPE;
    $this->wp_options [AI_OPTION_CUSTOM_CSS]                 = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_DISPLAY_FOR_USERS]          = DEFAULT_DISPLAY_FOR_USERS;
    $this->wp_options [AI_OPTION_DETECT_CLIENT_SIDE]         = AI_DISABLED;
    $this->wp_options [AI_OPTION_CLIENT_SIDE_ACTION]         = DEFAULT_CLIENT_SIDE_ACTION;
    $this->wp_options [AI_OPTION_CLOSE_BUTTON]               = DEFAULT_CLOSE_BUTTON;
    $this->wp_options [AI_OPTION_BACKGROUND]                 = DEFAULT_BACKGROUND;
    $this->wp_options [AI_OPTION_BACKGROUND_IMAGE]           = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_BACKGROUND_COLOR]           = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_BACKGROUND_REPEAT]          = DEFAULT_BACKGROUND_REPEAT;
    $this->wp_options [AI_OPTION_BACKGROUND_SIZE]            = DEFAULT_BACKGROUND_SIZE;
    $this->wp_options [AI_OPTION_SET_BODY_BACKGROUND]        = DEFAULT_SET_BODY_BACKGROUND;
    $this->wp_options [AI_OPTION_AUTO_CLOSE_TIME]            = DEFAULT_AUTO_CLOSE_TIME;
    $this->wp_options [AI_OPTION_STAY_CLOSED_TIME]           = DEFAULT_STAY_CLOSED_TIME;
    $this->wp_options [AI_OPTION_DELAY_TIME]                 = DEFAULT_DELAY_TIME;
    $this->wp_options [AI_OPTION_DELAY_SHOWING]              = DEFAULT_DELAY_SHOWING;
    $this->wp_options [AI_OPTION_SHOW_EVERY]                 = DEFAULT_SHOW_EVERY;
    $this->wp_options [AI_OPTION_VISITOR_MAX_IMPRESSIONS]                   = DEFAULT_VISITOR_MAX_IMPRESSIONS;
    $this->wp_options [AI_OPTION_VISITOR_LIMIT_IMPRESSIONS_PER_TIME_PERIOD] = DEFAULT_VISITOR_LIMIT_IMPRESSIONS_PER_TIME_PERIOD;
    $this->wp_options [AI_OPTION_VISITOR_LIMIT_IMPRESSIONS_TIME_PERIOD]     = DEFAULT_VISITOR_LIMIT_IMPRESSIONS_TIME_PERIOD;
    $this->wp_options [AI_OPTION_MAX_IMPRESSIONS]                           = DEFAULT_MAX_IMPRESSIONS;
    $this->wp_options [AI_OPTION_LIMIT_IMPRESSIONS_PER_TIME_PERIOD]         = DEFAULT_LIMIT_IMPRESSIONS_PER_TIME_PERIOD;
    $this->wp_options [AI_OPTION_LIMIT_IMPRESSIONS_TIME_PERIOD]             = DEFAULT_LIMIT_IMPRESSIONS_TIME_PERIOD;
    $this->wp_options [AI_OPTION_VISITOR_MAX_CLICKS]                   = DEFAULT_VISITOR_MAX_CLICKS;
    $this->wp_options [AI_OPTION_VISITOR_LIMIT_CLICKS_PER_TIME_PERIOD] = DEFAULT_VISITOR_LIMIT_CLICKS_PER_TIME_PERIOD;
    $this->wp_options [AI_OPTION_VISITOR_LIMIT_CLICKS_TIME_PERIOD]     = DEFAULT_VISITOR_LIMIT_CLICKS_TIME_PERIOD;
    $this->wp_options [AI_OPTION_MAX_CLICKS]                           = DEFAULT_MAX_CLICKS;
    $this->wp_options [AI_OPTION_LIMIT_CLICKS_PER_TIME_PERIOD]         = DEFAULT_LIMIT_CLICKS_PER_TIME_PERIOD;
    $this->wp_options [AI_OPTION_LIMIT_CLICKS_TIME_PERIOD]             = DEFAULT_LIMIT_CLICKS_TIME_PERIOD;
    $this->wp_options [AI_OPTION_TRIGGER_CLICK_FRAUD_PROTECTION]       = DEFAULT_TRIGGER_CLICK_FRAUD_PROTECTION;
    $this->wp_options [AI_OPTION_LIMITS_FALLBACK]                      = AD_EMPTY_DATA;

    for ($viewport = 1; $viewport <= 6; $viewport ++) {
      $this->wp_options [AI_OPTION_DETECT_VIEWPORT . '_' . $viewport] = AI_DISABLED;
    }

    for ($index = 1; $index <= 3; $index ++) {
      $this->wp_options [AI_OPTION_PARALLAX       . '_' . $index] = AI_DISABLED;
      $this->wp_options [AI_OPTION_PARALLAX_IMAGE . '_' . $index] = AD_EMPTY_DATA;
      $this->wp_options [AI_OPTION_PARALLAX_SHIFT . '_' . $index] = AD_EMPTY_DATA;
    }

    $this->wp_options [AI_OPTION_PARALLAX_LINK]              = AD_EMPTY_DATA;
    $this->wp_options [AI_OPTION_PARALLAX_LINK_NEW_TAB]      = AI_DISABLED;
  }

  public function get_disable_insertion (){

    if (isset ($_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS]) && get_remote_debugging ()) {
      if (is_numeric ($_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS]) && $_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS] == $this->number) return true;
      if (strpos ($_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS], '-') !== false) {
        $blocks = explode ('-', $_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS]);
        if (in_array ($this->number, $blocks)) return true;
      }
    }

    $disable_insertion = isset ($this->wp_options [AI_OPTION_DISABLE_INSERTION]) ? $this->wp_options [AI_OPTION_DISABLE_INSERTION] : AI_DISABLED;
    return $disable_insertion;
  }

  public function get_block_width (){
    $option = isset ($this->wp_options [AI_OPTION_BLOCK_WIDTH]) ? $this->wp_options [AI_OPTION_BLOCK_WIDTH] : AD_EMPTY_DATA;
    return $option;
  }

  public function get_block_height (){
    $option = isset ($this->wp_options [AI_OPTION_BLOCK_HEIGHT]) ? $this->wp_options [AI_OPTION_BLOCK_HEIGHT] : AD_EMPTY_DATA;
    return $option;
  }

  public function get_show_label (){
    $show_label = isset ($this->wp_options [AI_OPTION_SHOW_LABEL]) ? $this->wp_options [AI_OPTION_SHOW_LABEL] : AI_DISABLED;
    if ($show_label == '') $show_label = AI_DISABLED;
    return $show_label;
  }

  public function get_block_background_color (){
    $option = isset ($this->wp_options [AI_OPTION_BLOCK_BACKGROUND_COLOR]) ? $this->wp_options [AI_OPTION_BLOCK_BACKGROUND_COLOR] : AD_EMPTY_DATA;
    return $option;
  }

  public function get_lazy_loading (){
    $lazy_loading = isset ($this->wp_options [AI_OPTION_LAZY_LOADING]) ? $this->wp_options [AI_OPTION_LAZY_LOADING] : AI_DISABLED;
    if ($lazy_loading == '') $lazy_loading = AI_DISABLED;
    return $lazy_loading;
  }

  public function get_wait_for_interaction (){
    $wait_for_interaction = isset ($this->wp_options [AI_OPTION_WAIT_FOR_INTERACTION]) ? $this->wp_options [AI_OPTION_WAIT_FOR_INTERACTION] : AI_DISABLED;
    if ($wait_for_interaction == '') $wait_for_interaction = AI_DISABLED;
    return $wait_for_interaction;
  }

  public function get_protected (){
    $protected = isset ($this->wp_options [AI_OPTION_PROTECTED]) ? $this->wp_options [AI_OPTION_PROTECTED] : AI_DISABLED;
    return $protected;
  }

  public function get_manual_loading (){
    $manual_loading = isset ($this->wp_options [AI_OPTION_MANUAL_LOADING]) ? $this->wp_options [AI_OPTION_MANUAL_LOADING] : AI_MANUAL_LOADING_DISABLED;
    if ($manual_loading == '') $manual_loading = AI_MANUAL_LOADING_DISABLED;
    return $manual_loading;
  }

  public function get_iframe (){
    $option = isset ($this->wp_options [AI_OPTION_IFRAME]) ? $this->wp_options [AI_OPTION_IFRAME] : AI_DISABLED;
    if ($option == '') $option = AI_DISABLED;
    return $option;
  }

  public function get_iframe_width (){
    $option = isset ($this->wp_options [AI_OPTION_IFRAME_WIDTH]) ? $this->wp_options [AI_OPTION_IFRAME_WIDTH] : DEFAULT_IFRAME_WIDTH;
    return $option;
  }

  public function get_iframe_height (){
    $option = isset ($this->wp_options [AI_OPTION_IFRAME_HEIGHT]) ? $this->wp_options [AI_OPTION_IFRAME_HEIGHT] : DEFAULT_IFRAME_HEIGHT;
    return $option;
  }

  public function get_label_in_iframe (){
    $option = isset ($this->wp_options [AI_OPTION_LABEL_IN_IFRAME]) ? $this->wp_options [AI_OPTION_LABEL_IN_IFRAME] : AI_DISABLED;
    if ($option == '') $option = AI_DISABLED;
    return $option;
  }

  public function get_automatic_insertion (){
    global $ai_db_options;

    $option = isset ($this->wp_options [AI_OPTION_AUTOMATIC_INSERTION]) ? $this->wp_options [AI_OPTION_AUTOMATIC_INSERTION] : AI_AUTOMATIC_INSERTION_DISABLED;

    if     ($option == '')                          $option = AI_AUTOMATIC_INSERTION_DISABLED;
    elseif ($option == AD_SELECT_MANUAL)            $option = AI_AUTOMATIC_INSERTION_DISABLED;
    elseif ($option == AD_SELECT_BEFORE_TITLE)      $option = AI_AUTOMATIC_INSERTION_BEFORE_POST;
    elseif ($option == AD_SELECT_WIDGET)            $option = AI_AUTOMATIC_INSERTION_DISABLED;

    if     ($option == AD_SELECT_NONE)              $option = AI_AUTOMATIC_INSERTION_DISABLED;
    elseif ($option == AD_SELECT_BEFORE_POST)       $option = AI_AUTOMATIC_INSERTION_BEFORE_POST;
    elseif ($option == AD_SELECT_AFTER_POST)        $option = AI_AUTOMATIC_INSERTION_AFTER_POST;
    elseif ($option == AD_SELECT_BEFORE_PARAGRAPH)  $option = AI_AUTOMATIC_INSERTION_BEFORE_PARAGRAPH;
    elseif ($option == AD_SELECT_AFTER_PARAGRAPH)   $option = AI_AUTOMATIC_INSERTION_AFTER_PARAGRAPH;
    elseif ($option == AD_SELECT_BEFORE_CONTENT)    $option = AI_AUTOMATIC_INSERTION_BEFORE_CONTENT;
    elseif ($option == AD_SELECT_AFTER_CONTENT)     $option = AI_AUTOMATIC_INSERTION_AFTER_CONTENT;
    elseif ($option == AD_SELECT_BEFORE_EXCERPT)    $option = AI_AUTOMATIC_INSERTION_BEFORE_EXCERPT;
    elseif ($option == AD_SELECT_AFTER_EXCERPT)     $option = AI_AUTOMATIC_INSERTION_AFTER_EXCERPT;
    elseif ($option == AD_SELECT_BETWEEN_POSTS)     $option = AI_AUTOMATIC_INSERTION_BETWEEN_POSTS;

    return $option;
  }

  public function get_automatic_insertion_text ($server_side_insertion = false, $translate = true){

    if ($server_side_insertion)
      $automatic_insertion = $this->get_server_side_insertion (); else
        $automatic_insertion = $this->get_automatic_insertion();

    if ($automatic_insertion == null) $automatic_insertion = $this->get_automatic_insertion();
    switch ($automatic_insertion) {
      case AI_AUTOMATIC_INSERTION_DISABLED:
        if (!$translate) return AI_TEXT_ENG_DISABLED;
        return AI_TEXT_DISABLED;
        break;
      case AI_AUTOMATIC_INSERTION_BEFORE_POST:
        if (!$translate) return AI_TEXT_ENG_BEFORE_POST;
        return AI_TEXT_BEFORE_POST;
        break;
      case AI_AUTOMATIC_INSERTION_AFTER_POST:
        if (!$translate) return AI_TEXT_ENG_AFTER_POST;
        return AI_TEXT_AFTER_POST;
        break;
      case AI_AUTOMATIC_INSERTION_BEFORE_CONTENT:
        if (!$translate) return AI_TEXT_ENG_BEFORE_CONTENT;
        return AI_TEXT_BEFORE_CONTENT;
        break;
      case AI_AUTOMATIC_INSERTION_AFTER_CONTENT:
        if (!$translate) return AI_TEXT_ENG_AFTER_CONTENT;
        return AI_TEXT_AFTER_CONTENT;
        break;
      case AI_AUTOMATIC_INSERTION_BEFORE_PARAGRAPH:
        if (!$translate) return AI_TEXT_ENG_BEFORE_PARAGRAPH;
        return AI_TEXT_BEFORE_PARAGRAPH;
        break;
      case AI_AUTOMATIC_INSERTION_AFTER_PARAGRAPH:
        if (!$translate) return AI_TEXT_ENG_AFTER_PARAGRAPH;
        return AI_TEXT_AFTER_PARAGRAPH;
        break;
      case AI_AUTOMATIC_INSERTION_BEFORE_IMAGE:
        if (!$translate) return AI_TEXT_ENG_BEFORE_IMAGE;
        return AI_TEXT_BEFORE_IMAGE;
        break;
      case AI_AUTOMATIC_INSERTION_AFTER_IMAGE:
        if (!$translate) return AI_TEXT_ENG_AFTER_IMAGE;
        return AI_TEXT_AFTER_IMAGE;
        break;
      case AI_AUTOMATIC_INSERTION_BEFORE_EXCERPT:
        if (!$translate) return AI_TEXT_ENG_BEFORE_EXCERPT;
        return AI_TEXT_BEFORE_EXCERPT;
        break;
      case AI_AUTOMATIC_INSERTION_AFTER_EXCERPT:
        if (!$translate) return AI_TEXT_ENG_AFTER_EXCERPT;
        return AI_TEXT_AFTER_EXCERPT;
        break;
      case AI_AUTOMATIC_INSERTION_BETWEEN_POSTS:
        if (!$translate) return AI_TEXT_ENG_BETWEEN_POSTS;
        return AI_TEXT_BETWEEN_POSTS;
        break;
      case AI_AUTOMATIC_INSERTION_BEFORE_COMMENTS:
        if (!$translate) return AI_TEXT_ENG_BEFORE_COMMENTS;
        return AI_TEXT_BEFORE_COMMENTS;
        break;
      case AI_AUTOMATIC_INSERTION_BETWEEN_COMMENTS:
        if (!$translate) return AI_TEXT_ENG_BETWEEN_COMMENTS;
        return AI_TEXT_BETWEEN_COMMENTS;
        break;
      case AI_AUTOMATIC_INSERTION_AFTER_COMMENTS:
        if (!$translate) return AI_TEXT_ENG_AFTER_COMMENTS;
        return AI_TEXT_AFTER_COMMENTS;
        break;
      case AI_AUTOMATIC_INSERTION_FOOTER:
        if (!$translate) return AI_TEXT_ENG_FOOTER;
        return AI_TEXT_FOOTER;
        break;
      case AI_AUTOMATIC_INSERTION_ABOVE_HEADER:
        if (!$translate) return AI_TEXT_ENG_ABOVE_HEADER;
        return AI_TEXT_ABOVE_HEADER;
        break;
      case AI_AUTOMATIC_INSERTION_BEFORE_HTML_ELEMENT:
        if (!$translate) return AI_TEXT_ENG_BEFORE_HTML_ELEMENT;
        return AI_TEXT_BEFORE_HTML_ELEMENT;
        break;
      case AI_AUTOMATIC_INSERTION_INSIDE_HTML_ELEMENT:
        if (!$translate) return AI_TEXT_ENG_INSIDE_HTML_ELEMENT;
        return AI_TEXT_INSIDE_HTML_ELEMENT;
        break;
      case AI_AUTOMATIC_INSERTION_AFTER_HTML_ELEMENT:
        if (!$translate) return AI_TEXT_ENG_AFTER_HTML_ELEMENT;
        return AI_TEXT_AFTER_HTML_ELEMENT;
        break;
      default:
        if ($automatic_insertion >= AI_AUTOMATIC_INSERTION_CUSTOM_HOOK && $automatic_insertion < AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + 20) {
          $hook_index = $automatic_insertion - AI_AUTOMATIC_INSERTION_CUSTOM_HOOK;
          return get_hook_name ($hook_index + 1);
        }

        return '';
        break;
    }
  }

  public function get_alignment_type (){
    $option = isset ($this->wp_options [AI_OPTION_ALIGNMENT_TYPE]) ? $this->wp_options [AI_OPTION_ALIGNMENT_TYPE] : AI_ALIGNMENT_DEFAULT;

    if ($option == '') $option = AI_ALIGNMENT_DEFAULT;

    if     ($option == AD_ALIGNMENT_NONE)              $option = AI_ALIGNMENT_DEFAULT;
    elseif ($option == AD_ALIGNMENT_LEFT)              $option = AI_ALIGNMENT_LEFT;
    elseif ($option == AD_ALIGNMENT_RIGHT)             $option = AI_ALIGNMENT_RIGHT;
    elseif ($option == AD_ALIGNMENT_CENTER)            $option = AI_ALIGNMENT_CENTER;
    elseif ($option == AD_ALIGNMENT_FLOAT_LEFT)        $option = AI_ALIGNMENT_FLOAT_LEFT;
    elseif ($option == AD_ALIGNMENT_FLOAT_RIGHT)       $option = AI_ALIGNMENT_FLOAT_RIGHT;
    elseif ($option == AD_ALIGNMENT_NO_WRAPPING)       $option = AI_ALIGNMENT_NO_WRAPPING;
    elseif ($option == AD_ALIGNMENT_CUSTOM_CSS)        $option = AI_ALIGNMENT_CUSTOM_CSS;

    if (defined ('AI_STICKY_SETTINGS') && AI_STICKY_SETTINGS) {
          if ($option == AI_ALIGNMENT_STICKY_LEFT)     $option = AI_ALIGNMENT_STICKY;
      elseif ($option == AI_ALIGNMENT_STICKY_RIGHT)    $option = AI_ALIGNMENT_STICKY;
      elseif ($option == AI_ALIGNMENT_STICKY_TOP)      $option = AI_ALIGNMENT_STICKY;
      elseif ($option == AI_ALIGNMENT_STICKY_BOTTOM)   $option = AI_ALIGNMENT_STICKY;
    }

    return $option;
  }

  public function get_alignment_type_text ($translate = true){
    switch ($this->get_alignment_type ()) {
      case AI_ALIGNMENT_DEFAULT:
        if (!$translate) return AI_TEXT_ENG_DEFAULT;
        return AI_TEXT_DEFAULT;
        break;
      case AI_ALIGNMENT_LEFT:
        if (!$translate) return AI_TEXT_ENG_LEFT;
        return AI_TEXT_LEFT;
        break;
      case AI_ALIGNMENT_RIGHT:
        if (!$translate) return AI_TEXT_ENG_RIGHT;
        return AI_TEXT_RIGHT;
        break;
      case AI_ALIGNMENT_CENTER:
        if (!$translate) return AI_TEXT_ENG_CENTER;
        return AI_TEXT_CENTER;
        break;
      case AI_ALIGNMENT_FLOAT_LEFT:
        if (!$translate) return AI_TEXT_ENG_FLOAT_LEFT;
        return AI_TEXT_FLOAT_LEFT;
        break;
      case AI_ALIGNMENT_FLOAT_RIGHT:
        if (!$translate) return AI_TEXT_ENG_FLOAT_RIGHT;
        return AI_TEXT_FLOAT_RIGHT;
        break;
      case AI_ALIGNMENT_STICKY_LEFT:
        if (!$translate) return AI_TEXT_ENG_STICKY_LEFT;
        return AI_TEXT_STICKY_LEFT;
        break;
      case AI_ALIGNMENT_STICKY_RIGHT:
        if (!$translate) return AI_TEXT_ENG_STICKY_RIGHT;
        return AI_TEXT_STICKY_RIGHT;
        break;
      case AI_ALIGNMENT_STICKY_TOP:
        if (!$translate) return AI_TEXT_ENG_STICKY_TOP;
        return AI_TEXT_STICKY_TOP;
        break;
      case AI_ALIGNMENT_STICKY_BOTTOM:
        if (!$translate) return AI_TEXT_ENG_STICKY_BOTTOM;
        return AI_TEXT_STICKY_BOTTOM;
        break;
      case AI_ALIGNMENT_STICKY:
        if (!$translate) return AI_TEXT_ENG_STICKY;
        return AI_TEXT_STICKY;
        break;
      case AI_ALIGNMENT_NO_WRAPPING:
        if (!$translate) return AI_TEXT_ENG_NO_WRAPPING;
        return AI_TEXT_NO_WRAPPING;
        break;
      case AI_ALIGNMENT_CUSTOM_CSS:
        if (!$translate) return AI_TEXT_ENG_CUSTOM_CSS;
        return AI_TEXT_CUSTOM_CSS;
        break;
      default:
        return '';
        break;
    }
  }

  public function sticky_style ($horizontal_position, $vertical_position, $horizontal_margin = null, $vertical_margin = null) {
    global $ai_wp_data;

    $style = "";

    $animation = $this->get_animation () != AI_ANIMATION_NONE;
    $sticky_background = $this->get_background ();

    if ($horizontal_margin === null)  $horizontal_margin = trim ($this->get_horizontal_margin ());
    if ($vertical_margin === null)    $vertical_margin   = trim ($this->get_vertical_margin ());

    if ($sticky_background) $horizontal_margin = '';

    $main_content_fixed_width = is_numeric (get_main_content_element ());
    if ($main_content_fixed_width) {
      $main_content_shift = (int) (get_main_content_element () / 2);
    }

    if ($horizontal_position == AI_STICK_HORIZONTAL_CENTER && $sticky_background && $this->get_set_body_background ()) {
      $style = AI_ALIGNMENT_CSS_STICK_TO_THE_TOP;
    } else
        switch ($vertical_position) {
          case AI_STICK_TO_THE_TOP:
            switch ($horizontal_position) {
              case AI_STICK_HORIZONTAL_CENTER:
                $style = AI_ALIGNMENT_CSS_STICK_TO_THE_TOP;
                break;
              default:
                if ($sticky_background) {
                  $style = AI_ALIGNMENT_CSS_STICK_TO_THE_TOP;
                } else $style = AI_ALIGNMENT_CSS_STICK_TO_THE_TOP_OFFSET;
                break;
            }
            if ($vertical_margin != '') {
              $style = ai_change_css ($style, 'top', $vertical_margin . 'px');
            }
            break;
          case AI_STICK_VERTICAL_CENTER:
            if ($animation) $style .= AI_ALIGNMENT_CSS_CENTER_VERTICAL_H_ANIM; else
              switch ($horizontal_position) {
                case AI_STICK_HORIZONTAL_CENTER:
                  $style = AI_ALIGNMENT_CSS_CENTER_VERTICAL_H_ANIM;
                  break;
                default:
                  $style = AI_ALIGNMENT_CSS_CENTER_VERTICAL;
                  break;
              }
            break;
          case AI_SCROLL_WITH_THE_CONTENT:
            if ($sticky_background) {
              $style = AI_ALIGNMENT_CSS_SCROLL_WITH_THE_CONTENT_BKG;
            } else $style = AI_ALIGNMENT_CSS_SCROLL_WITH_THE_CONTENT;
            if ($vertical_margin != '') {
              $style = ai_change_css ($style, 'top', $vertical_margin . 'px');
            }
            break;
          case AI_STICK_TO_THE_BOTTOM:
            switch ($horizontal_position) {
              case AI_STICK_HORIZONTAL_CENTER:
                $style = AI_ALIGNMENT_CSS_STICK_TO_THE_BOTTOM;
                break;
              default:
                if ($sticky_background) {
                  $style = AI_ALIGNMENT_CSS_STICK_TO_THE_BOTTOM;
                } else $style = AI_ALIGNMENT_CSS_STICK_TO_THE_BOTTOM_OFFSET;
                break;
            }
            if ($vertical_margin != '') {
              $style = ai_change_css ($style, 'bottom', $vertical_margin . 'px');
            }
            break;
        }

    switch ($horizontal_position) {
      case AI_STICK_TO_THE_LEFT:
        if ($sticky_background) {
          $style .= AI_ALIGNMENT_CSS_STICK_TO_THE_LEFT_BKG;
        } else $style .= AI_ALIGNMENT_CSS_STICK_TO_THE_LEFT;
        if ($horizontal_margin != '') {
          $style = ai_change_css ($style, 'left', $horizontal_margin . 'px');
        }
        break;
      case AI_STICK_TO_THE_CONTENT_LEFT:
        if ($sticky_background) {
          $style .= AI_ALIGNMENT_CSS_STICK_TO_THE_CONTENT_LEFT_BKG;
        } else $style .= AI_ALIGNMENT_CSS_STICK_TO_THE_CONTENT_LEFT;
        if ($horizontal_margin != '') {
          $style = ai_change_css ($style, 'margin-right', $horizontal_margin . 'px');
        }
        if ($main_content_fixed_width) {
          $style = $style . ai_change_css (AI_ALIGNMENT_CSS_STICK_TO_THE_CONTENT_LEFT_W, 'right', 'calc(50% + ' . $main_content_shift . 'px)');
        }
        break;
      case AI_STICK_HORIZONTAL_CENTER:
        if ($sticky_background) {
          $style .= AI_ALIGNMENT_CSS_STICK_CENTER_HORIZONTAL_BKG;

          $background_css = '';

          $background_color = trim ($this->get_background_color ());
          if ($background_color != '') {
            $background_css .= ' background-color: ' . $background_color . ';';
          }

          $background_image = trim ($this->get_background_image ());
          if ($background_image != '') {
            $background_css .= ' background-image: url(' . $background_image . ');';
          }

          $background_size = $this->get_background_size ();
          if ($background_size != AI_BACKGROUND_SIZE_DEFAULT) {
            switch ($background_size) {
              case AI_BACKGROUND_SIZE_COVER:
                $background_css .= ' background-size: cover;';
                break;
              case AI_BACKGROUND_SIZE_FIT:
                $background_css .= ' background-size: contain;';
                break;
              case AI_BACKGROUND_SIZE_FILL:
                $background_css .= ' background-size: 100% 100%;';
                break;
            }
          }

          $background_repeat = $this->get_background_repeat ();
          if ($background_repeat != AI_BACKGROUND_REPEAT_DEFAULT) {
            switch ($background_repeat) {
              case AI_BACKGROUND_REPEAT_NO:
                $background_css .= ' background-repeat: no-repeat;';
                break;
              case AI_BACKGROUND_REPEAT_YES:
                $background_css .= ' background-repeat: repeat;';
                break;
              case AI_BACKGROUND_REPEAT_HORIZONTALY:
                $background_css .= ' background-repeat: repeat-x;';
                break;
              case AI_BACKGROUND_REPEAT_VERTICALLY:
                $background_css .= ' background-repeat: repeat-y;';
                break;
              case AI_BACKGROUND_REPEAT_SPACE:
                $background_css .= ' background-repeat: space;';
                break;
              case AI_BACKGROUND_REPEAT_ROUND:
                $background_css .= ' background-repeat: round;';
                break;
            }
          }

          $style .= $background_css;
          if ($this->get_set_body_background ()) {
            $ai_wp_data [AI_BODY_STYLE] = trim ('background-attachment: fixed; ' . $background_css);
            $style .= 'display: none;';
          }
        }
        elseif ($animation) $style .= AI_ALIGNMENT_CSS_STICK_CENTER_HORIZONTAL_ANIM; else
          switch ($vertical_position) {
            case AI_STICK_VERTICAL_CENTER:
              $style .= AI_ALIGNMENT_CSS_STICK_CENTER_HORIZONTAL_V;
              break;
            default:
              $style .= AI_ALIGNMENT_CSS_STICK_CENTER_HORIZONTAL;
              break;
          }
        break;
      case AI_STICK_TO_THE_CONTENT_RIGHT:
        if ($sticky_background) {
          $style .= AI_ALIGNMENT_CSS_STICK_TO_THE_CONTENT_RIGHT_BKG;
        } else $style .= AI_ALIGNMENT_CSS_STICK_TO_THE_CONTENT_RIGHT;
        if ($horizontal_margin != '') {
          $style = ai_change_css ($style, 'margin-left', $horizontal_margin . 'px');
        }
        if ($main_content_fixed_width) {
          $style = $style . ai_change_css (AI_ALIGNMENT_CSS_STICK_TO_THE_CONTENT_RIGHT_W, 'left', 'calc(50% + ' . $main_content_shift . 'px)');
        }
        break;
      case AI_STICK_TO_THE_RIGHT:
        switch ($vertical_position) {
          case AI_SCROLL_WITH_THE_CONTENT:
            $style .= AI_ALIGNMENT_CSS_STICK_TO_THE_RIGHT_SCROLL;
            if ($horizontal_margin != '') {
              $style = ai_change_css ($style, 'right', $horizontal_margin . 'px');
            }
            break;
          default:
            if ($sticky_background) {
              $style .= AI_ALIGNMENT_CSS_STICK_TO_THE_RIGHT_BKG;
            } else $style .= AI_ALIGNMENT_CSS_STICK_TO_THE_RIGHT;
            if ($horizontal_margin != '') {
              $style = ai_change_css ($style, 'right', $horizontal_margin . 'px');
            }
            break;
        }
        break;
    }

    return $style;
  }

  public function stick_to_the_content_class () {
    $classes = array ();

    $alignment_type = $this->get_alignment_type ();
    $custom_css = $this->get_custom_css ();
    $horizontal_position = $this->get_horizontal_position ();
    $vertical_position = $this->get_vertical_position ();
    $sticky_background = $this->get_background ();

    $main_content_fixed_width = is_numeric (get_main_content_element ());

    switch ($alignment_type) {
      case AI_ALIGNMENT_STICKY:
        if (!$main_content_fixed_width) {
          switch ($horizontal_position) {
            case AI_STICK_TO_THE_CONTENT_LEFT:
              $classes []= 'ai-sticky-content';
              $classes []= 'ai-sticky-left';
              break;
            case AI_STICK_TO_THE_CONTENT_RIGHT:
              $classes []= 'ai-sticky-content';
              $classes []= 'ai-sticky-right';
              break;
          }

          if ($sticky_background) {
            switch ($horizontal_position) {
              case AI_STICK_TO_THE_LEFT:
              case AI_STICK_TO_THE_CONTENT_LEFT:
                $classes [] = 'ai-sticky-background';
                $classes [] = 'ai-sticky-left';
                break;
              case AI_STICK_TO_THE_RIGHT:
              case AI_STICK_TO_THE_CONTENT_RIGHT:
                $classes [] = 'ai-sticky-background';
                $classes [] = 'ai-sticky-right';
                break;
//              case AI_STICK_HORIZONTAL_CENTER:
//                $classes [] = 'ai-fixed-background';
//                break;
            }
          }
        }

        switch ($vertical_position) {
          case AI_SCROLL_WITH_THE_CONTENT:
            if ($sticky_background)
              $classes []= 'ai-sticky-background';
            else
              $classes []= 'ai-sticky-content';

            $classes []= 'ai-sticky-scroll';
            break;
        }
        break;
      case AI_ALIGNMENT_CUSTOM_CSS:
        $clean_custom_css_code = str_replace (' ', '', $custom_css);

        if (!$main_content_fixed_width &&
            strpos ($clean_custom_css_code, 'position:fixed') !== false &&
            strpos ($clean_custom_css_code, 'z-index:') !== false) {

              if (strpos ($clean_custom_css_code, 'display:none') !== false) {
                    if (strpos ($clean_custom_css_code, ';left:auto') !== false) {$classes []= 'ai-sticky-content'; $classes []= 'ai-sticky-left';} // to avoid margin-left:auto
                elseif (strpos ($clean_custom_css_code, 'right:auto') !== false) {$classes []= 'ai-sticky-content'; $classes []= 'ai-sticky-right';}

                if (strpos ($clean_custom_css_code, 'margin-bottom:auto') !== false) {$classes []= 'ai-sticky-content'; $classes []= 'ai-sticky-scroll';}
              }

              elseif ($sticky_background && strpos ($clean_custom_css_code, 'z-index:-') === false) {

//                if (strpos ($clean_custom_css_code, ';top:0;left:0') !== false) $classes []= 'ai-fixed-background'; // to avoid detecting ai-sticky-left
//                else
                if (strpos ($clean_custom_css_code, ';left:0') !== false) {$classes [] = 'ai-sticky-background'; $classes []= 'ai-sticky-left';}
                elseif (strpos ($clean_custom_css_code, ';right:0') !== false) {$classes [] = 'ai-sticky-background'; $classes []= 'ai-sticky-right';}
              }

        }
        break;
    }

    $classes = array_unique ($classes);

    return implode (' ', $classes);
  }

  public function is_sticky () {
    $custom_sticky_css = false;
    if ($this->get_alignment_type () == AI_ALIGNMENT_CUSTOM_CSS) {
      $clean_custom_css_code = str_replace (' ', '', $this->get_custom_css ());
      if (strpos ($clean_custom_css_code, 'position:fixed') !== false && strpos ($clean_custom_css_code, 'z-index:') !== false) $custom_sticky_css = true;
    }

    return ($custom_sticky_css || $this->get_alignment_type () == AI_ALIGNMENT_STICKY);
  }

  public function sticky_parameters (&$classes, $preview = false) {
    global $ai_wp_data;

    $sticky_parameters = '';

    if ($this->is_sticky ()) {

      $horizontal_position = $this->get_horizontal_position ();
      $vertical_position = $this->get_vertical_position ();
      $animation = $this->get_animation ();
      $sticky_background = $this->get_background ();

      $stick_to_the_content_class = $this->stick_to_the_content_class ();

      if ($stick_to_the_content_class != '') {
//        if (!$sticky_background) {
//          $classes [] = 'ai-sticky-content';
//        }
        $classes [] = $stick_to_the_content_class;
      }
      if ($this->get_set_body_background ()) {
        // Not used
        $classes [] = 'ai-body-background';
      }

      $direction = '';

      switch ($horizontal_position) {
        case AI_STICK_TO_THE_LEFT:
        case AI_STICK_TO_THE_CONTENT_LEFT:
          $direction = 'right';
          break;
        case AI_STICK_HORIZONTAL_CENTER:
          $classes [] = 'ai-center-h';
          switch ($vertical_position) {
            case AI_STICK_TO_THE_TOP:
            case AI_SCROLL_WITH_THE_CONTENT:
              $direction = 'down';
              break;
            case AI_STICK_VERTICAL_CENTER:
              $direction = 'left';
              switch ($animation) {
                case AI_ANIMATION_SLIDE:
                case AI_ANIMATION_SLIDE_FADE:
                  $animation = AI_ANIMATION_FADE;
                  break;
                case AI_ANIMATION_ZOOM_IN:
                case AI_ANIMATION_ZOOM_OUT:
                  $direction = 'up';
                  break;
              }
              break;
            case AI_STICK_TO_THE_BOTTOM:
              $direction = 'up';
              break;
          }
          break;
        case AI_STICK_TO_THE_CONTENT_RIGHT:
        case AI_STICK_TO_THE_RIGHT:
          $direction = 'left';
          break;
      }

      if ($vertical_position == AI_STICK_VERTICAL_CENTER) $classes [] = 'ai-center-v';

      if (!$sticky_background) {
        switch ($horizontal_position) {
          case AI_STICK_TO_THE_LEFT:
            if ($animation == AI_ANIMATION_TURN) $direction = 'left';
            break;
          case AI_STICK_TO_THE_RIGHT:
            if ($animation == AI_ANIMATION_TURN) $direction = 'right';
            break;
          case AI_STICK_TO_THE_CONTENT_LEFT:
          case AI_STICK_TO_THE_CONTENT_RIGHT:
            if ($animation == AI_ANIMATION_SLIDE) $animation = AI_ANIMATION_SLIDE_FADE;
            break;
        }

        switch ($animation) {
          case AI_ANIMATION_FADE:
            $sticky_parameters .= ' data-aos="fade"';
            break;
          case AI_ANIMATION_SLIDE:
            $sticky_parameters .= ' data-aos="slide-'.$direction.'"';
            break;
          case AI_ANIMATION_SLIDE_FADE:
            $sticky_parameters .= ' data-aos="fade-'.$direction.'"';
            break;
          case AI_ANIMATION_TURN:
            $classes [] = 'ai-sticky-turn';
            $sticky_parameters .= ' data-aos="flip-'.$direction.'"';
            break;
          case AI_ANIMATION_FLIP:
            if ($direction == 'right') $direction = 'left';
            elseif ($direction == 'left') $direction = 'right';
            $sticky_parameters .= ' data-aos="flip-'.$direction.'"';
            break;
          case AI_ANIMATION_ZOOM_IN:
            $sticky_parameters .= ' data-aos="zoom-in-'.$direction.'"';
            break;
          case AI_ANIMATION_ZOOM_OUT:
            $sticky_parameters .= ' data-aos="zoom-out-'.$direction.'"';
            break;
        }

        if (!$preview) {
          switch ($this->get_animation_trigger ()) {
            case AI_TRIGGER_PAGE_SCROLLED_PC:
              $pc = $this->get_animation_trigger_value ();
              if (!is_numeric ($pc)) $pc = 0;
              $pc = intval ($pc);
              if ($pc < 0) $pc = 0;
              if ($pc > 100) $pc = 100;
              $pc = number_format ($pc / 100, 2);
              if (!isset ($ai_wp_data [AI_TRIGGER_ELEMENTS])) $ai_wp_data [AI_TRIGGER_ELEMENTS] = array ();
              $ai_wp_data [AI_TRIGGER_ELEMENTS][$this->number] = $pc;
              $sticky_parameters .= ' data-aos-anchor="#ai-position-'.$this->number.'" data-aos-anchor-placement="top-top"';
              break;
            case AI_TRIGGER_PAGE_SCROLLED_PX:
              $px = $this->get_animation_trigger_value ();
              if (!is_numeric ($px)) $px = 0;
              $px = intval ($px);
              if ($px < 0) $px = 0;
              if (!isset ($ai_wp_data [AI_TRIGGER_ELEMENTS])) $ai_wp_data [AI_TRIGGER_ELEMENTS] = array ();
              $ai_wp_data [AI_TRIGGER_ELEMENTS][$this->number] = $px;
              $sticky_parameters .= ' data-aos-anchor="#ai-position-'.$this->number.'" data-aos-anchor-placement="top-top"';
              break;
            case AI_TRIGGER_ELEMENT_SCROLLS_IN:
              $sticky_parameters .= ' data-aos-anchor="'.$this->get_animation_trigger_value ().'"';
              break;
            case AI_TRIGGER_ELEMENT_SCROLLS_OUT:
              $sticky_parameters .= ' data-aos-anchor="'.$this->get_animation_trigger_value ().'" data-aos-anchor-placement="bottom-top" ';
              break;
          }

          $offset = $this->get_animation_trigger_offset ();
          if (is_numeric ($offset)) {
            $offset = intval ($offset);
            if ($offset < -1000) $offset = - 1000;
            elseif ($offset > 1000) $offset = 1000;

            $sticky_parameters .= ' data-aos-offset="'.$offset.'"';
          }

          $delay = $this->get_animation_trigger_delay ();
          if (is_numeric ($delay) && $delay > 0) {
            $delay = 50 * intval ($delay / 50);

            // Limitation of AOS
            if ($delay > 3000) $delay = 3000;
            $sticky_parameters .= ' data-aos-delay="'.$delay.'"';
          }

          switch ($this->get_animation_out_trigger ()) {
            case AI_TRIGGER_DISABLED:
              $sticky_parameters .= ' data-aos-once="true"';
              break;
            case AI_TRIGGER_ENABLED:
              break;
            case AI_TRIGGER_ELEMENT_SCROLLS_OUT:
              $sticky_parameters .= ' data-aos-anchor-out="'.$this->get_animation_out_trigger_value ().'" data-aos-anchor-placement-out="bottom-top" data-aos-mirror="true"';
              break;
            case AI_TRIGGER_PAGE_SCROLLED_PC:
              $pc = $this->get_animation_out_trigger_value ();
              if (!is_numeric ($pc)) $pc = 0;
              $pc = intval ($pc);
              if ($pc < 0) $pc = 0;
              if ($pc > 100) $pc = 100;
              $pc = number_format ($pc / 100, 2);
              if (!isset ($ai_wp_data [AI_TRIGGER_ELEMENTS])) $ai_wp_data [AI_TRIGGER_ELEMENTS] = array ();
              $ai_wp_data [AI_TRIGGER_ELEMENTS][$this->number . '-out'] = $pc;
              $sticky_parameters .= ' data-aos-anchor-out="#ai-position-'.$this->number.'-out" data-aos-anchor-placement-out="top-top" data-aos-mirror="true"';
              break;
            case AI_TRIGGER_PAGE_SCROLLED_PX:
              $px = $this->get_animation_out_trigger_value ();
              if (!is_numeric ($px)) $px = 0;
              $px = intval ($px);
              if ($px < 0) $px = 0;
              if (!isset ($ai_wp_data [AI_TRIGGER_ELEMENTS])) $ai_wp_data [AI_TRIGGER_ELEMENTS] = array ();
              $ai_wp_data [AI_TRIGGER_ELEMENTS][$this->number . '-out'] = $px;
              $sticky_parameters .= ' data-aos-anchor-out="#ai-position-'.$this->number.'-out" data-aos-anchor-placement-out="top-top" data-aos-mirror="true"';
              break;
            case AI_TRIGGER_ELEMENT_SCROLLS_IN:
              $sticky_parameters .= ' data-aos-anchor-out="'.$this->get_animation_out_trigger_value ().'" data-aos-mirror="true"';
              break;
          }

          $offset = $this->get_animation_out_trigger_offset ();
          if (is_numeric ($offset)) {
            $offset = intval ($offset);
            if ($offset < -1000) $offset = - 1000;
            elseif ($offset > 1000) $offset = 1000;

            $sticky_parameters .= ' data-aos-offset-out="'.$offset.'"';
          }
        }
      }
    }

    return $sticky_parameters;
  }

  public function size_background_style () {
    $style = '';

    $width = trim ($this->get_block_width ());
    $height = trim ($this->get_block_height ());
    $background = trim ($this->get_block_background_color ());

    $parallax_options = false;
    for ($index = 1; $index <= 3; $index ++) {
      $parallax_options |= $this->get_parallax ($index) && $this->get_parallax_image ($index) != '';
      if ($parallax_options) break;
    }

    if ($width != '' && !$this->get_close_button ()) {
      if (is_numeric ($width)) {
        $width .= 'px';
      }
      $style .= ' width: ' . $width . ';';
    }

    if ($height != '' && !$parallax_options) {
      if (is_numeric ($height)) {
        $height .= 'px';
      }
      $style .= ' height: ' . $height . ';';
    }

    $sticky_background =
      $this->is_sticky () &&
      $this->get_horizontal_position () == AI_STICK_HORIZONTAL_CENTER &&
      ($this->get_vertical_position () == AI_STICK_VERTICAL_CENTER || $this->get_vertical_position () == AI_STICK_TO_THE_TOP || $this->get_vertical_position () == AI_STICK_TO_THE_BOTTOM);

    if ($background != '' && !$sticky_background) {
      $style .= ' background-color: ' . $background . ';';
    }

    return trim ($style);
  }

  public function alignment_style_for_amp ($alignment_style) {
    global $ai_wp_data;

    // Remove display property on AMP pages when using client-side device detection
    if ($ai_wp_data [AI_WP_AMP_PAGE] && $this->get_detection_client_side()) {
      return (str_replace ('display: block; ', '', $alignment_style));
    }

    return $alignment_style;
  }

  public function alignment_style ($alignment_type, $all_styles = false, $full_sticky_style = true) {
    global $ai_wp_data;

    $style = "";
    switch ($alignment_type) {
      case AI_ALIGNMENT_DEFAULT:
        $style = AI_ALIGNMENT_CSS_DEFAULT;
        break;
      case AI_ALIGNMENT_LEFT:
        $style = $this->alignment_style_for_amp (AI_ALIGNMENT_CSS_LEFT);
        break;
      case AI_ALIGNMENT_RIGHT:
        $style = $this->alignment_style_for_amp (AI_ALIGNMENT_CSS_RIGHT);
        break;
      case AI_ALIGNMENT_CENTER:
        $style = $this->alignment_style_for_amp (AI_ALIGNMENT_CSS_CENTER);
        break;
      case AI_ALIGNMENT_FLOAT_LEFT:
        $style = AI_ALIGNMENT_CSS_FLOAT_LEFT;
        break;
      case AI_ALIGNMENT_FLOAT_RIGHT:
        $style = AI_ALIGNMENT_CSS_FLOAT_RIGHT;
        break;
      case AI_ALIGNMENT_STICKY_LEFT:
        $style = AI_ALIGNMENT_CSS_STICKY_LEFT;
        break;
      case AI_ALIGNMENT_STICKY_RIGHT:
        $style = AI_ALIGNMENT_CSS_STICKY_RIGHT;
        break;
      case AI_ALIGNMENT_STICKY_TOP:
        $style = AI_ALIGNMENT_CSS_STICKY_TOP;
        break;
      case AI_ALIGNMENT_STICKY_BOTTOM:
        $style = AI_ALIGNMENT_CSS_STICKY_BOTTOM;
        break;
      case AI_ALIGNMENT_STICKY:
        $style = AI_ALIGNMENT_CSS_STICKY;
        if ($full_sticky_style) {
          $style .= $this->sticky_style ($this->get_horizontal_position (), $this->get_vertical_position ());
        }
        break;
      case AI_ALIGNMENT_CUSTOM_CSS:
        $style = $this->get_custom_css ();
        break;
      default:
        $style = '';
        break;
    }

    if ($alignment_type != AI_ALIGNMENT_CUSTOM_CSS) {
      $size_background_style = $this->size_background_style ();
      if ($size_background_style != '') {
        $size_background_style = ' ' . $size_background_style;
        if (strpos ($style, "||") !== false) {
          $styles = explode ("||", $style);
          $style = implode ($size_background_style . "||", $styles);
        }
        $style .= $size_background_style;
      }
    }

    if (!$all_styles && strpos ($style, "||") !== false) {
      $styles = explode ("||", $style);
      if (isset ($styles [0])) {
        $style = trim ($styles [0]);
      }
    }

    return $style;
  }

  public function get_horizontal_position (){
    $option = - 1;

    if (isset ($this->wp_options [AI_OPTION_ALIGNMENT_TYPE])) {
      switch ($this->wp_options [AI_OPTION_ALIGNMENT_TYPE]) {
        case AI_ALIGNMENT_STICKY_LEFT:
          $option = AI_STICK_TO_THE_LEFT;
          break;
        case AI_ALIGNMENT_STICKY_RIGHT:
          $option = AI_STICK_TO_THE_RIGHT;
          break;
        case AI_ALIGNMENT_STICKY_TOP:
          $option = AI_STICK_HORIZONTAL_CENTER;
          break;
        case AI_ALIGNMENT_STICKY_BOTTOM:
          $option = AI_STICK_HORIZONTAL_CENTER;
          break;
      }
    }

    if ($option == - 1) {
      $option = isset ($this->wp_options [AI_OPTION_HORIZONTAL_POSITION]) ? $this->wp_options [AI_OPTION_HORIZONTAL_POSITION] : DEFAULT_HORIZONTAL_POSITION;
    }

    return $option;
  }

  public function get_vertical_position (){
    $option = - 1;

    if (isset ($this->wp_options [AI_OPTION_ALIGNMENT_TYPE])) {
      switch ($this->wp_options [AI_OPTION_ALIGNMENT_TYPE]) {
        case AI_ALIGNMENT_STICKY_LEFT:
          $option = AI_STICK_TO_THE_TOP;
          break;
        case AI_ALIGNMENT_STICKY_RIGHT:
          $option = AI_STICK_TO_THE_TOP;
          break;
        case AI_ALIGNMENT_STICKY_TOP:
          $option = AI_STICK_TO_THE_TOP;
          break;
        case AI_ALIGNMENT_STICKY_BOTTOM:
          $option = AI_STICK_TO_THE_BOTTOM;
          break;
      }
    }

    if ($option == - 1) {
      $option = isset ($this->wp_options [AI_OPTION_VERTICAL_POSITION]) ? $this->wp_options [AI_OPTION_VERTICAL_POSITION] : DEFAULT_VERTICAL_POSITION;
    }

    return $option;
  }

  public function get_tracking ($saved_value = false){
    $tracking = AI_DISABLED;
    if (ai_pro ()) {
      if (get_global_tracking () || $saved_value) {
        $tracking = isset ($this->wp_options [AI_OPTION_TRACKING]) ? $this->wp_options [AI_OPTION_TRACKING] : AI_DISABLED;
      }
    }
    return $tracking;
  }

  public function get_alignment_style (){
    return $this->alignment_style ($this->get_alignment_type());
  }

  public function get_html_selector ($decode = false){
    $option = isset ($this->wp_options [AI_OPTION_HTML_SELECTOR]) ? $this->wp_options [AI_OPTION_HTML_SELECTOR] : "";
    if ($decode) $option = html_entity_decode ($option);
    return $option;
  }

  public function get_server_side_insertion (){
    $option = isset ($this->wp_options [AI_OPTION_SERVER_SIDE_INSERTION]) ? $this->wp_options [AI_OPTION_SERVER_SIDE_INSERTION] : DEFAULT_SERVER_SIDE_INSERTION;
    return $option;
  }

  public function get_html_element_insertion () {
    $option = isset ($this->wp_options [AI_OPTION_HTML_ELEMENT_INSERTION]) ? $this->wp_options [AI_OPTION_HTML_ELEMENT_INSERTION] : DEFAULT_HTML_ELEMENT_INSERTION;

    if ($option == AI_HTML_INSERTION_CLIENT_SIDE_DOM_READY) {
      $option = AI_HTML_INSERTION_CLIENT_SIDE;
    }

    return $option;
  }

  public function get_wait_for () {
    $option = isset ($this->wp_options [AI_OPTION_WAIT_FOR]) ? $this->wp_options [AI_OPTION_WAIT_FOR] : '';

    return $option;
  }

  public function get_wait_for_delay () {
    $option = isset ($this->wp_options [AI_OPTION_WAIT_FOR_DELAY]) ? $this->wp_options [AI_OPTION_WAIT_FOR_DELAY] : '';

    if ($option === '0') {
      $option = '';
    }

    return $option;
  }

  public function get_html_element_insertion_text ($translate = true) {
    switch ($this->get_html_element_insertion ()) {
      case AI_HTML_INSERTION_CLIENT_SIDE:
        if (!$translate) return AI_TEXT_ENG_CLIENT_SIDE;
        return AI_TEXT_CLIENT_SIDE;
        break;
//      case AI_HTML_INSERTION_CLIENT_SIDE_DOM_READY:
//        if (!$translate) return AI_TEXT_ENG_CLIENT_SIDE_DOM_READY;
//        return AI_TEXT_CLIENT_SIDE_DOM_READY;
//        break;
      case AI_HTML_INSERTION_SEREVR_SIDE:
        if (!$translate) return AI_TEXT_ENG_SERVER_SIDE;
        return AI_TEXT_SERVER_SIDE;
        break;
      default:
        return '';
        break;
    }
  }

  public function get_inside_element (){
    $option = isset ($this->wp_options [AI_OPTION_INSIDE_ELEMENT]) ? $this->wp_options [AI_OPTION_INSIDE_ELEMENT] : DEFAULT_INSIDE_ELEMENT;
    return $option;
  }

  public function get_paragraph_number(){
    $option = isset ($this->wp_options [AI_OPTION_PARAGRAPH_NUMBER]) ? $this->wp_options [AI_OPTION_PARAGRAPH_NUMBER] : "";
    return $option;
  }

  public function get_paragraph_number_minimum(){
    $option = isset ($this->wp_options [AI_OPTION_MIN_PARAGRAPHS]) ? $this->wp_options [AI_OPTION_MIN_PARAGRAPHS] : "";
    if ($option == '0') $option = '';
    return $option;
  }

  public function get_paragraph_number_maximum(){
    $option = isset ($this->wp_options [AI_OPTION_MAX_PARAGRAPHS]) ? $this->wp_options [AI_OPTION_MAX_PARAGRAPHS] : "";
    if ($option == '0') $option = '';
    return $option;
  }

  public function get_skip_first_paragraphs (){
    $option = isset ($this->wp_options [AI_OPTION_SKIP_FIRST_PARAGRAPHS]) ? $this->wp_options [AI_OPTION_SKIP_FIRST_PARAGRAPHS] : "";
    if ($option == '0') $option = '';
    return $option;
  }

  public function get_skip_last_paragraphs (){
    $option = isset ($this->wp_options [AI_OPTION_SKIP_LAST_PARAGRAPHS]) ? $this->wp_options [AI_OPTION_SKIP_LAST_PARAGRAPHS] : "";
    if ($option == '0') $option = '';
    return $option;
  }

  public function get_minimum_words_above (){
    $option = isset ($this->wp_options [AI_OPTION_MIN_WORDS_ABOVE]) ? $this->wp_options [AI_OPTION_MIN_WORDS_ABOVE] : "";
    return $option;
  }

  public function get_minimum_words(){
    $option = isset ($this->wp_options [AI_OPTION_MIN_WORDS]) ? $this->wp_options [AI_OPTION_MIN_WORDS] : "";
    if ($option == '0') $option = '';
    return $option;
  }

  public function get_maximum_words(){
    $option = isset ($this->wp_options [AI_OPTION_MAX_WORDS]) ? $this->wp_options [AI_OPTION_MAX_WORDS] : "";
    return $option;
  }

  public function get_paragraph_tags(){
     $option = isset ($this->wp_options [AI_OPTION_PARAGRAPH_TAGS]) ? $this->wp_options [AI_OPTION_PARAGRAPH_TAGS] : DEFAULT_PARAGRAPH_TAGS;
     return str_replace (array ('<', '>'), '', $option);
  }

  public function get_minimum_paragraph_words(){
    $option = isset ($this->wp_options [AI_OPTION_MIN_PARAGRAPH_WORDS]) ? $this->wp_options [AI_OPTION_MIN_PARAGRAPH_WORDS] : "";
    if ($option == '0') $option = '';
    return $option;
   }

  public function get_maximum_paragraph_words(){
    $option = isset ($this->wp_options [AI_OPTION_MAX_PARAGRAPH_WORDS]) ? $this->wp_options [AI_OPTION_MAX_PARAGRAPH_WORDS] : "";
    return $option;
   }

  public function get_count_inside_blockquote(){
    $option = isset ($this->wp_options [AI_OPTION_COUNT_INSIDE_BLOCKQUOTE]) ? $this->wp_options [AI_OPTION_COUNT_INSIDE_BLOCKQUOTE] : "";
    if ($option == '') $option = AI_DISABLED;
    return $option;
   }

  public function get_count_inside (){
    $option = isset ($this->wp_options [AI_OPTION_COUNT_INSIDE]) ? $this->wp_options [AI_OPTION_COUNT_INSIDE] : DEFAULT_COUNT_INSIDE;
    return $option;
   }

  public function get_count_inside_text ($translate = true){
    switch ($this->get_count_inside ()) {
      case AI_DO_NOT_COUNT:
        if (!$translate) return AI_TEXT_ENG_DO_NOT_COUNT;
        return AI_TEXT_DO_NOT_COUNT;
        break;
      case AI_COUNT_ONLY:
        if (!$translate) return AI_TEXT_ENG_COUNT_ONLY;
        return AI_TEXT_COUNT_ONLY;
        break;
      default:
        return '';
        break;
    }
  }

  public function get_count_inside_elements (){
    $option = isset ($this->wp_options [AI_OPTION_COUNT_INSIDE_ELEMENTS]) ? $this->wp_options [AI_OPTION_COUNT_INSIDE_ELEMENTS] : "";
    return $option;
   }

  public function get_count_inside_elements_contain (){
    $option = isset ($this->wp_options [AI_OPTION_COUNT_INSIDE_ELEMENTS_CONTAIN]) ? $this->wp_options [AI_OPTION_COUNT_INSIDE_ELEMENTS_CONTAIN] : DEFAULT_COUNT_INSIDE_ELEMENTS_CONTAIN;
    return $option;
   }

  public function get_count_inside_elements_contain_text ($translate = true){
    switch ($this->get_count_inside_elements_contain ()) {
      case AI_CONTAIN:
        if (!$translate) return AI_TEXT_ENG_CONTAIN;
        return AI_TEXT_CONTAIN;
        break;
      case AI_DO_NOT_CONTAIN:
        if (!$translate) return AI_TEXT_ENG_DO_NOT_CONTAIN;
        return AI_TEXT_DO_NOT_CONTAIN;
        break;
      default:
        return '';
        break;
    }
  }

  public function get_count_inside_elements_text (){
    $option = isset ($this->wp_options [AI_OPTION_COUNT_INSIDE_ELEMENTS_TEXT]) ? $this->wp_options [AI_OPTION_COUNT_INSIDE_ELEMENTS_TEXT] : "";
    return $option;
   }

  public function get_check_only_tag_attributes (){
    $option = isset ($this->wp_options [AI_OPTION_CHECK_ONLY_TAG_ATTRIBUTES]) ? $this->wp_options [AI_OPTION_CHECK_ONLY_TAG_ATTRIBUTES] : AI_DISABLED;
    return $option;
   }


  public function get_avoid_paragraphs_above(){
    $option = isset ($this->wp_options [AI_OPTION_AVOID_PARAGRAPHS_ABOVE]) ? $this->wp_options [AI_OPTION_AVOID_PARAGRAPHS_ABOVE] : "";
    return $option;
   }

  public function get_avoid_paragraphs_below(){
    $option = isset ($this->wp_options [AI_OPTION_AVOID_PARAGRAPHS_BELOW]) ? $this->wp_options [AI_OPTION_AVOID_PARAGRAPHS_BELOW] : "";
    return $option;
   }

  public function get_avoid_text_above(){
    $option = isset ($this->wp_options [AI_OPTION_AVOID_TEXT_ABOVE]) ? $this->wp_options [AI_OPTION_AVOID_TEXT_ABOVE] : "";
    return $option;
   }

  public function get_avoid_text_below(){
    $option = isset ($this->wp_options [AI_OPTION_AVOID_TEXT_BELOW]) ? $this->wp_options [AI_OPTION_AVOID_TEXT_BELOW] : "";
    return $option;
   }

  public function get_avoid_action(){
    $option = isset ($this->wp_options [AI_OPTION_AVOID_ACTION]) ? $this->wp_options [AI_OPTION_AVOID_ACTION] : DEFAULT_AVOID_ACTION;
    if ($option == '') $option = DEFAULT_AVOID_ACTION;

    elseif ($option == AD_DO_NOT_INSERT)             $option = AI_DO_NOT_INSERT;
    elseif ($option == AD_TRY_TO_SHIFT_POSITION)     $option = AI_TRY_TO_SHIFT_POSITION;

    return $option;
  }

  public function get_avoid_action_text ($translate = true) {
    switch ($this->get_avoid_action()) {
      case AI_DO_NOT_INSERT:
        if (!$translate) return AI_TEXT_ENG_DO_NOT_INSERT;
        return AI_TEXT_DO_NOT_INSERT;
        break;
      case AI_TRY_TO_SHIFT_POSITION:
        if (!$translate) return AI_TEXT_ENG_TRY_TO_SHIFT_POSITION;
        return AI_TEXT_TRY_TO_SHIFT_POSITION;
        break;
      default:
        return '';
        break;
    }
  }

  public function get_avoid_try_limit(){
    $option = isset ($this->wp_options [AI_OPTION_AVOID_TRY_LIMIT]) ? $this->wp_options [AI_OPTION_AVOID_TRY_LIMIT] : "";
    if ($option == '') $option = AD_ZERO;
    return $option;
   }

  public function get_avoid_direction(){
    $option = isset ($this->wp_options [AI_OPTION_AVOID_DIRECTION]) ? $this->wp_options [AI_OPTION_AVOID_DIRECTION] : DEFAULT_AVOID_DIRECTION;
    if ($option == '') $option = DEFAULT_AVOID_DIRECTION;

    elseif ($option == AD_ABOVE)                  $option = AI_ABOVE;
    elseif ($option == AD_BELOW)                  $option = AI_BELOW;
    elseif ($option == AD_ABOVE_AND_THEN_BELOW)   $option = AI_ABOVE_AND_THEN_BELOW;
    elseif ($option == AD_BELOW_AND_THEN_ABOVE)   $option = AI_BELOW_AND_THEN_ABOVE;

    return $option;
  }

  public function get_avoid_direction_text ($translate = true){
    switch ($this->get_avoid_direction()) {
      case AI_ABOVE:
        if (!$translate) return AI_TEXT_ENG_ABOVE;
        return AI_TEXT_ABOVE;
        break;
      case AI_BELOW:
        if (!$translate) return AI_TEXT_ENG_BELOW;
        return AI_TEXT_BELOW;
        break;
      case AI_ABOVE_AND_THEN_BELOW:
        if (!$translate) return AI_TEXT_ENG_ABOVE_AND_THEN_BELOW;
        return AI_TEXT_ABOVE_AND_THEN_BELOW;
        break;
      case AI_BELOW_AND_THEN_ABOVE:
        if (!$translate) return AI_TEXT_ENG_BELOW_AND_THEN_ABOVE;
        return AI_TEXT_BELOW_AND_THEN_ABOVE;
        break;
      default:
        return '';
        break;
    }
  }

  public function get_call_filter(){
    $option = isset ($this->wp_options [AI_OPTION_EXCERPT_NUMBER]) ? $this->wp_options [AI_OPTION_EXCERPT_NUMBER] : "";
    if ($option == '0') $option = '';
    return $option;
  }

  public function get_filter_type(){
    $option = isset ($this->wp_options [AI_OPTION_FILTER_TYPE]) ? $this->wp_options [AI_OPTION_FILTER_TYPE] : AI_FILTER_AUTO;

    if ($option == '')                                          $option = AI_FILTER_AUTO;

    elseif ($option == AI_OPTION_FILTER_AUTO)                   $option = AI_FILTER_AUTO;
    elseif ($option == AI_OPTION_FILTER_PHP_FUNCTION_CALLS)     $option = AI_FILTER_PHP_FUNCTION_CALLS;
    elseif ($option == AI_OPTION_FILTER_CONTENT_PROCESSING)     $option = AI_FILTER_CONTENT_PROCESSING;
    elseif ($option == AI_OPTION_FILTER_EXCERPT_PROCESSING)     $option = AI_FILTER_EXCERPT_PROCESSING;
    elseif ($option == AI_OPTION_FILTER_BEFORE_POST_PROCESSING) $option = AI_FILTER_BEFORE_POST_PROCESSING;
    elseif ($option == AI_OPTION_FILTER_AFTER_POST_PROCESSING)  $option = AI_FILTER_AFTER_POST_PROCESSING;
    elseif ($option == AI_OPTION_FILTER_WIDGET_DRAWING)         $option = AI_FILTER_WIDGET_DRAWING;
    elseif ($option == AI_OPTION_FILTER_SUBPAGES)               $option = AI_FILTER_SUBPAGES;
    elseif ($option == AI_OPTION_FILTER_POSTS)                  $option = AI_FILTER_POSTS;
    elseif ($option == AI_OPTION_FILTER_COMMENTS)               $option = AI_FILTER_COMMENTS;

    return $option;
  }

  public function get_filter_type_text ($translate = true){
    switch ($this->get_filter_type()) {
      case AI_FILTER_AUTO:
        if (!$translate) return AI_TEXT_ENG_AUTO_COUNTER;
        return AI_TEXT_AUTO_COUNTER;
        break;
      case AI_FILTER_PHP_FUNCTION_CALLS:
        if (!$translate) return AI_TEXT_ENG_PHP_FUNCTION_CALLS_COUNTER;
        return AI_TEXT_PHP_FUNCTION_CALLS_COUNTER;
        break;
      case AI_FILTER_CONTENT_PROCESSING:
        if (!$translate) return AI_TEXT_ENG_CONTENT_PROCESSING_COUNTER;
        return AI_TEXT_CONTENT_PROCESSING_COUNTER;
        break;
      case AI_FILTER_EXCERPT_PROCESSING:
        if (!$translate) return AI_TEXT_ENG_EXCERPT_PROCESSING_COUNTER;
        return AI_TEXT_EXCERPT_PROCESSING_COUNTER;
        break;
      case AI_FILTER_BEFORE_POST_PROCESSING:
        if (!$translate) return AI_TEXT_ENG_BEFORE_POST_PROCESSING_COUNTER;
        return AI_TEXT_BEFORE_POST_PROCESSING_COUNTER;
        break;
      case AI_FILTER_AFTER_POST_PROCESSING:
        if (!$translate) return AI_TEXT_ENG_AFTER_POST_PROCESSING_COUNTER;
        return AI_TEXT_AFTER_POST_PROCESSING_COUNTER;
        break;
      case AI_FILTER_WIDGET_DRAWING:
        if (!$translate) return AI_TEXT_ENG_WIDGET_DRAWING_COUNTER;
        return AI_TEXT_WIDGET_DRAWING_COUNTER;
        break;
      case AI_FILTER_SUBPAGES:
        if (!$translate) return AI_TEXT_ENG_SUBPAGES_COUNTER;
        return AI_TEXT_SUBPAGES_COUNTER;
        break;
      case AI_FILTER_POSTS:
        if (!$translate) return AI_TEXT_ENG_POSTS_COUNTER;
        return AI_TEXT_POSTS_COUNTER;
        break;
      case AI_FILTER_PARAGRAPHS:
        if (!$translate) return AI_TEXT_ENG_PARAGRAPHS_COUNTER;
        return AI_TEXT_PARAGRAPHS_COUNTER;
        break;
      case AI_FILTER_IMAGES:
        if (!$translate) return AI_TEXT_ENG_IMAGES_COUNTER;
        return AI_TEXT_IMAGES_COUNTER;
        break;
      case AI_FILTER_COMMENTS:
        if (!$translate) return AI_TEXT_ENG_COMMENTS_COUNTER;
        return AI_TEXT_COMMENTS_COUNTER;
        break;
      default:
        return '';
        break;
    }
  }

  public function get_inverted_filter (){
    $inverted_filter = isset ($this->wp_options [AI_OPTION_INVERTED_FILTER]) ? $this->wp_options [AI_OPTION_INVERTED_FILTER] : AI_DISABLED;
    if ($inverted_filter == '') $inverted_filter = AI_DISABLED;
    return $inverted_filter;
  }

  public function get_direction_type () {
    $option = isset ($this->wp_options [AI_OPTION_DIRECTION_TYPE]) ? $this->wp_options [AI_OPTION_DIRECTION_TYPE] : DEFAULT_DIRECTION_TYPE;
    if ($option == '') $option = DEFAULT_DIRECTION_TYPE;

    elseif ($option == AD_DIRECTION_FROM_TOP)       $option = AI_DIRECTION_FROM_TOP;
    elseif ($option == AD_DIRECTION_FROM_BOTTOM)    $option = AI_DIRECTION_FROM_BOTTOM;

    return $option;
   }

  public function get_direction_type_text ($translate = true){
    switch ($this->get_direction_type ()) {
      case AI_DIRECTION_FROM_TOP:
        if (!$translate) return AI_TEXT_ENG_DIRECTION_FROM_TOP;
        return AI_TEXT_DIRECTION_FROM_TOP;
        break;
      case AI_DIRECTION_FROM_BOTTOM:
        if (!$translate) return AI_TEXT_ENG_DIRECTION_FROM_BOTTOM;
        return AI_TEXT_DIRECTION_FROM_BOTTOM;
        break;
      default:
        return '';
        break;
    }
  }

  public function get_display_settings_post(){
    $option = isset ($this->wp_options [AI_OPTION_DISPLAY_ON_POSTS]) ? $this->wp_options [AI_OPTION_DISPLAY_ON_POSTS] : "";
    if ($option == '') $option = AI_ENABLED;
    return $option;
  }

  public function get_display_settings_page(){
    $option = isset ($this->wp_options [AI_OPTION_DISPLAY_ON_PAGES]) ? $this->wp_options [AI_OPTION_DISPLAY_ON_PAGES] : "";
    if ($option == '') $option = AI_DISABLED;
    return $option;
  }

  public function get_display_settings_home(){
    global $ai_db_options;

    $option = isset ($this->wp_options [AI_OPTION_DISPLAY_ON_HOMEPAGE]) ? $this->wp_options [AI_OPTION_DISPLAY_ON_HOMEPAGE] : "";
    if ($option == '') $option = AI_DISABLED;

    if (isset ($ai_db_options [AI_OPTION_GLOBAL]['VERSION']) && $ai_db_options [AI_OPTION_GLOBAL]['VERSION'] < '010605') {
      if (isset ($this->wp_options [AI_OPTION_AUTOMATIC_INSERTION])) {
        $automatic_insertion = $this->wp_options [AI_OPTION_AUTOMATIC_INSERTION];
      } else $automatic_insertion = '';

      if ($automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_PARAGRAPH ||
          $automatic_insertion == AI_AUTOMATIC_INSERTION_AFTER_PARAGRAPH ||
          $automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_CONTENT ||
          $automatic_insertion == AI_AUTOMATIC_INSERTION_AFTER_CONTENT)
        $option = AI_DISABLED;
    }

    return $option;
  }

  public function get_display_settings_category(){
    global $ai_db_options;

    $option = isset ($this->wp_options [AI_OPTION_DISPLAY_ON_CATEGORY_PAGES]) ? $this->wp_options [AI_OPTION_DISPLAY_ON_CATEGORY_PAGES] : "";
    if ($option == '') $option = AI_DISABLED;

    if (isset ($ai_db_options [AI_OPTION_GLOBAL]['VERSION']) && $ai_db_options [AI_OPTION_GLOBAL]['VERSION'] < '010605') {
      if (isset ($this->wp_options [AI_OPTION_AUTOMATIC_INSERTION])) {
        $automatic_insertion = $this->wp_options [AI_OPTION_AUTOMATIC_INSERTION];
      } else $automatic_insertion = '';

      if ($automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_PARAGRAPH ||
          $automatic_insertion == AI_AUTOMATIC_INSERTION_AFTER_PARAGRAPH ||
          $automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_CONTENT ||
          $automatic_insertion == AI_AUTOMATIC_INSERTION_AFTER_CONTENT)
        $option = AI_DISABLED;
    }

    return $option;
  }

  public function get_display_settings_search(){
    global $ai_db_options;

    $option = isset ($this->wp_options [AI_OPTION_DISPLAY_ON_SEARCH_PAGES]) ? $this->wp_options [AI_OPTION_DISPLAY_ON_SEARCH_PAGES] : "";
    if ($option == '') $option = AI_DISABLED;

    if (isset ($ai_db_options [AI_OPTION_GLOBAL]['VERSION']) && $ai_db_options [AI_OPTION_GLOBAL]['VERSION'] < '010605') {
      if (isset ($this->wp_options [AI_OPTION_AUTOMATIC_INSERTION])) {
        $automatic_insertion = $this->wp_options [AI_OPTION_AUTOMATIC_INSERTION];
      } else $automatic_insertion = '';

      if ($automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_PARAGRAPH ||
          $automatic_insertion == AI_AUTOMATIC_INSERTION_AFTER_PARAGRAPH ||
          $automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_CONTENT ||
          $automatic_insertion == AI_AUTOMATIC_INSERTION_AFTER_CONTENT)
        $option = AI_DISABLED;
    }

    return $option;
  }

  public function get_display_settings_archive(){
    global $ai_db_options;

    $option = isset ($this->wp_options [AI_OPTION_DISPLAY_ON_ARCHIVE_PAGES]) ? $this->wp_options [AI_OPTION_DISPLAY_ON_ARCHIVE_PAGES] : "";
    if ($option == '') $option = AI_DISABLED;

    if (isset ($ai_db_options [AI_OPTION_GLOBAL]['VERSION']) && $ai_db_options [AI_OPTION_GLOBAL]['VERSION'] < '010605') {
      if (isset ($this->wp_options [AI_OPTION_AUTOMATIC_INSERTION])) {
        $automatic_insertion = $this->wp_options [AI_OPTION_AUTOMATIC_INSERTION];
      } else $automatic_insertion = '';

      if ($automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_PARAGRAPH ||
          $automatic_insertion == AI_AUTOMATIC_INSERTION_AFTER_PARAGRAPH ||
          $automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_CONTENT ||
          $automatic_insertion == AI_AUTOMATIC_INSERTION_AFTER_CONTENT)
        $option = AI_DISABLED;
    }

    return $option;
  }

  public function get_enable_feed (){
    $enable_feed = isset ($this->wp_options [AI_OPTION_ENABLE_FEED]) ? $this->wp_options [AI_OPTION_ENABLE_FEED] : "";
    if ($enable_feed == '') $enable_feed = AI_DISABLED;
    return $enable_feed;
  }

  public function get_enable_ajax (){
    $enable_ajax = isset ($this->wp_options [AI_OPTION_ENABLE_AJAX]) ? $this->wp_options [AI_OPTION_ENABLE_AJAX] : "";
    if ($enable_ajax == '') $enable_ajax = AI_ENABLED;
    return $enable_ajax;
  }

  public function get_disable_caching (){
    $option = isset ($this->wp_options [AI_OPTION_DISABLE_CACHING]) ? $this->wp_options [AI_OPTION_DISABLE_CACHING] : AI_DISABLED;
    return $option;
  }

  public function get_max_page_blocks_enabled (){
    $option = isset ($this->wp_options [AI_OPTION_MAX_PAGE_BLOCKS_ENABLED]) ? $this->wp_options [AI_OPTION_MAX_PAGE_BLOCKS_ENABLED] : AI_DISABLED;
    return $option;
  }

  public function get_only_in_the_loop (){
    $option = isset ($this->wp_options [AI_OPTION_ONLY_IN_THE_LOOP]) ? $this->wp_options [AI_OPTION_ONLY_IN_THE_LOOP] : AI_DISABLED;
    return $option;
  }

  public function get_embed_js_code (){
    $option = isset ($this->wp_options [AI_OPTION_EMBED_JS_CODE]) ? $this->wp_options [AI_OPTION_EMBED_JS_CODE] : AI_DISABLED;
    return $option;
  }

   // Used for shortcodes
   public function get_enable_manual (){
     $option = isset ($this->wp_options [AI_OPTION_ENABLE_MANUAL]) ? $this->wp_options [AI_OPTION_ENABLE_MANUAL] : AI_DISABLED;

     if ($option == '') $option = AI_DISABLED;

     return $option;
   }

   public function get_enable_widget (){
     global $ai_db_options;

     $enable_widget = isset ($this->wp_options [AI_OPTION_ENABLE_WIDGET]) ? $this->wp_options [AI_OPTION_ENABLE_WIDGET] : "";
     if ($enable_widget == '') $enable_widget = AI_ENABLED;

     return $enable_widget;
   }

   public function get_enable_php_call (){
     $option = isset ($this->wp_options [AI_OPTION_ENABLE_PHP_CALL]) ? $this->wp_options [AI_OPTION_ENABLE_PHP_CALL] : "";
     if ($option == '') $option = AI_DISABLED;
     return $option;
   }

   public function get_paragraph_text (){
     $paragraph_text = isset ($this->wp_options [AI_OPTION_PARAGRAPH_TEXT]) ? $this->wp_options [AI_OPTION_PARAGRAPH_TEXT] : "";
     return $paragraph_text;
   }

  public function get_paragraph_text_type () {
    $option = isset ($this->wp_options [AI_OPTION_PARAGRAPH_TEXT_TYPE]) ? $this->wp_options [AI_OPTION_PARAGRAPH_TEXT_TYPE] : DEFAULT_PARAGRAPH_TEXT_TYPE;
    if ($option == '') $option = DEFAULT_PARAGRAPH_TEXT_TYPE;

    elseif ($option == AD_CONTAIN)          $option = AI_CONTAIN;
    elseif ($option == AD_DO_NOT_CONTAIN)   $option = AI_DO_NOT_CONTAIN;

    return $option;
  }

  public function get_paragraph_text_type_text ($translate = true){
    switch ($this->get_paragraph_text_type ()) {
      case AI_CONTAIN:
        if (!$translate) return AI_TEXT_ENG_CONTAIN;
        return AI_TEXT_CONTAIN;
        break;
      case AI_DO_NOT_CONTAIN:
        if (!$translate) return AI_TEXT_ENG_DO_NOT_CONTAIN;
        return AI_TEXT_DO_NOT_CONTAIN;
        break;
      default:
        return '';
        break;
    }
  }

   public function get_custom_css (){
      global $ai_db_options;

      $option = isset ($this->wp_options [AI_OPTION_CUSTOM_CSS]) ? $this->wp_options [AI_OPTION_CUSTOM_CSS] : "";

      // Fix for old bug
      if (isset ($ai_db_options [AI_OPTION_GLOBAL]['VERSION']) && $ai_db_options [AI_OPTION_GLOBAL]['VERSION'] < '010605' && strpos ($option, "Undefined index")) $option = "";

      return $option;
   }

  public function get_display_for_users (){
    $option = isset ($this->wp_options [AI_OPTION_DISPLAY_FOR_USERS]) ? $this->wp_options [AI_OPTION_DISPLAY_FOR_USERS] : DEFAULT_DISPLAY_FOR_USERS;
    if ($option == '') $option = DEFAULT_DISPLAY_FOR_USERS;

    elseif ($option == 'all')                           $option = AI_DISPLAY_ALL_USERS;
    elseif ($option == 'logged in')                     $option = AI_DISPLAY_LOGGED_IN_USERS;
    elseif ($option == 'not logged in')                 $option = AI_DISPLAY_NOT_LOGGED_IN_USERS;

    elseif ($option == AD_DISPLAY_ALL_USERS)            $option = AI_DISPLAY_ALL_USERS;
    elseif ($option == AD_DISPLAY_LOGGED_IN_USERS)      $option = AI_DISPLAY_LOGGED_IN_USERS;
    elseif ($option == AD_DISPLAY_NOT_LOGGED_IN_USERS)  $option = AI_DISPLAY_NOT_LOGGED_IN_USERS;
    elseif ($option == AD_DISPLAY_ADMINISTRATORS)       $option = AI_DISPLAY_ADMINISTRATORS;

    return $option;
  }

  public function get_display_for_users_text ($translate = true){
    switch ($this->get_display_for_users ()) {
      case AI_DISPLAY_ALL_USERS:
        if (!$translate) return AI_TEXT_ENG_DISPLAY_ALL_USERS;
        return AI_TEXT_DISPLAY_ALL_USERS;
        break;
      case AI_DISPLAY_LOGGED_IN_USERS:
        if (!$translate) return AI_TEXT_ENG_DISPLAY_LOGGED_IN_USERS;
        return AI_TEXT_DISPLAY_LOGGED_IN_USERS;
        break;
      case AI_DISPLAY_NOT_LOGGED_IN_USERS:
        if (!$translate) return AI_TEXT_ENG_DISPLAY_NOT_LOGGED_IN_USERS;
        return AI_TEXT_DISPLAY_NOT_LOGGED_IN_USERS;
        break;
      case AI_DISPLAY_ADMINISTRATORS:
        if (!$translate) return AI_TEXT_ENG_DISPLAY_ADMINISTRATORS;
        return AI_TEXT_DISPLAY_ADMINISTRATORS;
        break;
      default:
        return '';
        break;
    }
  }

   public function get_detection_client_side(){
     global $ai_db_options;

     $option = isset ($this->wp_options [AI_OPTION_DETECT_CLIENT_SIDE]) ? $this->wp_options [AI_OPTION_DETECT_CLIENT_SIDE] : AI_DISABLED;

      if (isset ($ai_db_options [AI_OPTION_GLOBAL]['VERSION']) && $ai_db_options [AI_OPTION_GLOBAL]['VERSION'] < '010605') {
        if (isset ($this->wp_options [AI_OPTION_DISPLAY_FOR_DEVICES])) {
         $display_for_devices = $this->wp_options [AI_OPTION_DISPLAY_FOR_DEVICES];
        } else $display_for_devices = '';

        if ($display_for_devices == AD_DISPLAY_ALL_DEVICES) $option = AI_DISABLED;
      }

     return $option;
   }

   public function get_client_side_action (){
     global $ai_db_options;

     $option = isset ($this->wp_options [AI_OPTION_CLIENT_SIDE_ACTION]) ? $this->wp_options [AI_OPTION_CLIENT_SIDE_ACTION] : DEFAULT_CLIENT_SIDE_ACTION;

     return $option;
   }

  public function get_detection_viewport ($viewport){
    global $ai_db_options;

    $option_name = AI_OPTION_DETECT_VIEWPORT . '_' . $viewport;
    $option = isset ($this->wp_options [$option_name]) ? $this->wp_options [$option_name] : AI_DISABLED;

    if (isset ($ai_db_options [AI_OPTION_GLOBAL]['VERSION']) && $ai_db_options [AI_OPTION_GLOBAL]['VERSION'] < '010605' && $this->get_detection_client_side()) {
      if (isset ($this->wp_options [AI_OPTION_DISPLAY_FOR_DEVICES])) {
       $display_for_devices = $this->wp_options [AI_OPTION_DISPLAY_FOR_DEVICES];
      } else $display_for_devices = '';

      if ($display_for_devices == AD_DISPLAY_DESKTOP_DEVICES ||
          $display_for_devices == AD_DISPLAY_DESKTOP_TABLET_DEVICES ||
          $display_for_devices == AD_DISPLAY_DESKTOP_PHONE_DEVICES) {
           switch ($viewport) {
             case 1:
               $option = AI_ENABLED;
               break;
             default:
               $option = AI_DISABLED;
           }
      }
      elseif ($display_for_devices == AD_DISPLAY_TABLET_DEVICES ||
              $display_for_devices == AD_DISPLAY_MOBILE_DEVICES ||
              $display_for_devices == AD_DISPLAY_DESKTOP_TABLET_DEVICES) {
           switch ($viewport) {
             case 2:
               $option = AI_ENABLED;
               break;
             default:
               $option = AI_DISABLED;
           }
      }
      elseif ($display_for_devices == AD_DISPLAY_PHONE_DEVICES ||
              $display_for_devices == AD_DISPLAY_MOBILE_DEVICES ||
              $display_for_devices == AD_DISPLAY_DESKTOP_PHONE_DEVICES) {
           switch ($viewport) {
             case 3:
               $option = AI_ENABLED;
               break;
             default:
               $option = AI_DISABLED;
           }
      }
      elseif ($display_for_devices == AD_DISPLAY_ALL_DEVICES) $option = AI_DISABLED;
    }

    return $option;
  }

  public function ai_get_counters (&$title) {
    global $ai_wp_data, $ad_inserter_globals, $ai_custom_hooks;

    $predefined_counters_text = $this->counters;
    if ($predefined_counters_text != '') {
      $this->counters = '';
      return $predefined_counters_text;
    }

    $counters = '';
    $title = __('Counters', 'ad-inserter') . ':';

    if (isset ($ad_inserter_globals [AI_CONTENT_COUNTER_NAME]) && ($ai_wp_data [AI_CONTEXT] == AI_CONTEXT_CONTENT || $ai_wp_data [AI_CONTEXT] == AI_CONTEXT_SHORTCODE)) {
      $counters .= ' C='.$ad_inserter_globals [AI_CONTENT_COUNTER_NAME];
      $title .= ' C= ' . __('Content', 'ad-inserter') . ', ';
    }

    if (isset ($ad_inserter_globals [AI_EXCERPT_COUNTER_NAME]) && $ai_wp_data [AI_CONTEXT] == AI_CONTEXT_EXCERPT) {
      $counters .= ' X='.$ad_inserter_globals [AI_EXCERPT_COUNTER_NAME];
      $title .= ' X = ' . __('Excerpt', 'ad-inserter') . ', ';
    }

    if (isset ($ad_inserter_globals [AI_LOOP_BEFORE_COUNTER_NAME]) && $ai_wp_data [AI_CONTEXT] == AI_CONTEXT_BEFORE_POST) {
      $counters .= ' B='.$ad_inserter_globals [AI_LOOP_BEFORE_COUNTER_NAME];
      $title .= ' B = ' . __('Before post', 'ad-inserter') . ', ';
    }

    if (isset ($ad_inserter_globals [AI_LOOP_AFTER_COUNTER_NAME]) && $ai_wp_data [AI_CONTEXT] == AI_CONTEXT_AFTER_POST) {
      $counters .= ' A='.$ad_inserter_globals [AI_LOOP_AFTER_COUNTER_NAME];
      $title .= ' A = ' . __('After post', 'ad-inserter') . ', ';
    }

    if (isset ($ad_inserter_globals [AI_POST_COUNTER_NAME]) && $ai_wp_data [AI_CONTEXT] == AI_CONTEXT_BETWEEN_POSTS) {
      $counters .= ' L='.$ad_inserter_globals [AI_POST_COUNTER_NAME];
      $title .= ' L = ' . __('Between posts', 'ad-inserter') . ', ';
    }

    if (isset ($ad_inserter_globals [AI_WIDGET_COUNTER_NAME . $this->number]) && $ai_wp_data [AI_CONTEXT] == AI_CONTEXT_WIDGET) {
      $counters .= ' W='.$ad_inserter_globals [AI_WIDGET_COUNTER_NAME . $this->number];
      $title .= ' W = ' . __('Widget', 'ad-inserter') . ', ';
    }

    if (isset ($ad_inserter_globals [AI_PHP_FUNCTION_CALL_COUNTER_NAME . $this->number])) {
      $counters .= ' P='.$ad_inserter_globals [AI_PHP_FUNCTION_CALL_COUNTER_NAME . $this->number];
      $title .= ' P = ' . __('PHP function call', 'ad-inserter') . ', ';
    }

    foreach ($ai_custom_hooks as $index => $custom_hook) {
      if ($index >= 20) break;

      $globals_name = 'AI_' . strtoupper ($custom_hook ['action']) . '_' . (AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + $index) . '_COUNTER';
      if (isset ($ad_inserter_globals [$globals_name]) && $ai_wp_data [AI_CONTEXT] == AI_CONTEXT_CUSTOM_HOOK + $index) {
        $counters .= ' H'.$custom_hook ['index'].'='.$ad_inserter_globals [$globals_name];
        // Translators: %s: custom hook name
        $title .= ' H'.$custom_hook ['index'].' = ' . sprintf (__('Custom hook %s call', 'ad-inserter'), $custom_hook ['name']) . ', ';
      }
    }

    if (isset ($ad_inserter_globals [AI_BLOCK_COUNTER_NAME . $this->number])) {
      $counters .= ' N='.$ad_inserter_globals [AI_BLOCK_COUNTER_NAME . $this->number];
      $title .= ' N = ' . __('Block', 'ad-inserter');
    }

    return $counters;
  }

  public function ai_getAdLabel () {
    global $ai_wp_data;

    $label_enabled = $this->get_show_label ();

    if (!$label_enabled) return '';

    $ad_label = get_ad_label (true);
    if (strpos ($ad_label, '<') === false && strpos ($ad_label, '>') === false) {
      $ad_label = '<div class="' . get_block_class_name (true) . '-label">' . $ad_label . '</div>';
    }

    $unfiltered_html = $ai_wp_data [AI_UNFILTERED_HTML];
    if (defined ('DISALLOW_UNFILTERED_HTML') && DISALLOW_UNFILTERED_HTML) {
      $unfiltered_html = false;
    }

    if (!$unfiltered_html) {
      $ad_label = wp_kses ($ad_label, 'post');
    }

    return $ad_label .= "\n";
  }

  public function ai_generateDebugLabel ($class = '', $title = '') {
    global $ai_wp_data, $block_object;

    $right_title = '';

    $fallback_block_name = '';
    if ($class != '') {
      $this->labels->class = $class;
    }

    if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_AJAX) {
      $this->labels->class = 'ai-debug-ajax';
      $title = __('AJAX REQUEST', 'ad-inserter');
      if (isset ($_GET ["block"])) {
        $this->counters = 'IFRAME';
        $right_title = __('Ajax request for block in iframe', 'ad-inserter');
      }
    }
    elseif ($this->get_iframe ()) {
      $this->labels->class = 'ai-debug-iframe';
    }

    if ($this->fallback != 0) {
      $this->labels->class = 'ai-debug-fallback';
      $fallback_block = $block_object [$this->fallback];
      $fallback_block_name = ' &nbsp;&#8678;&nbsp; '. $this->fallback . ' &nbsp; ' . $fallback_block->get_ad_name ();
    }

    if ($this->get_alignment_type() == AI_ALIGNMENT_NO_WRAPPING) {
      $this->labels->class .= ' ai-debug-no-wrapping';
    }

    $counters = $this->ai_get_counters ($right_title);

    if (is_array ($this->check_codes_data) && isset ($this->check_codes_data [$this->check_codes_index])) {
      $check_data = '';
      foreach ($this->check_codes_data [$this->check_codes_index] as $check_type => $check_list) {
        if ($check_list != '') {
          if ($check_type == 'block') continue;
          if ($check_type == 'name') continue;
          if ($check_type == 'check') continue;
          $check_data .= ' '. $check_type . '="' . $check_list . '"';
        }
      }
      $check_text = is_array ($this->check_codes) ? ' - [CHECK' . $check_data. ']' : '';
    } else $check_text = '';

    $version_name = $this->version_name == '' ? '' : ' - ' . $this->version_name;
    $block_name = $this->number . ' &nbsp; ' . $this->get_ad_name () . $check_text . '<kbd data-separator=" - " class="ai-option-name">' . $version_name . '</kbd>' . $fallback_block_name;

    if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_AJAX) {
      $left_text = '<a href="//'. esc_attr ($_SERVER ['HTTP_HOST']) . esc_attr ($_SERVER ['REQUEST_URI']) .'" style="text-decoration: none; box-shadow: 0 0 0;" target="_blank">'.esc_attr ($_SERVER ['HTTP_HOST']) . esc_attr ($_SERVER ['REQUEST_URI']).'</a>';
      $left_title =  __('Ajax request url, click to open it in a new tab', 'ad-inserter');
      if (isset ($_GET ["block"]))
        $ajax_bar = $this->labels->bar ($left_text, $left_title); else
          $ajax_bar = $this->labels->bar ($left_text, $left_title, '', __('IN THE LOOP', 'ad-inserter') . ': ' . (in_the_loop() ? __('YES', 'ad-inserter') : __('NO', 'ad-inserter')), 'in_the_loop ()');
    } else $ajax_bar = '';

    $this->hidden_viewports = '';
    if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0 && $this->get_detection_client_side() && $this->get_client_side_action () == AI_CLIENT_SIDE_ACTION_SHOW) {

      $alignment_class = $this->get_alignment_class ();
      $alignment_style = $this->get_alignment_style ();

      $label_bars = '';
      for ($viewport = 1; $viewport <= 6; $viewport ++) {
        $viewport_name = get_viewport_name ($viewport);
        if ($viewport_name != '') {
          $viewport_class_name = 'ai-viewport-' . $viewport;

          if ($this->get_detection_viewport ($viewport)) {
            $label_bars .=
              $this->labels->bar (
                $block_name, '',
                $viewport_name . ' <kbd class="ai-debug-name ai-main"></kbd>',
                $counters, $right_title,
                $viewport_class_name);
          } else {
                if (defined ('AI_NORMAL_HEADER_STYLES') && AI_NORMAL_HEADER_STYLES && !get_inline_styles ()) {
                  $hidden_wrapper_start = '<section class="' . $viewport_class_name .' ai-debug-block ai-debug-viewport-invisible '. $alignment_class . '">';
                } else {
                    $hidden_wrapper_start = '<section class="' . $viewport_class_name .' ai-debug-block ai-debug-viewport-invisible" style="' . $alignment_style . '">';
                  }

                $this->hidden_viewports .=
                  $hidden_wrapper_start .
                  $this->labels->bar_hidden_viewport (
                    $block_name, '',
                    $viewport_name . ' <kbd class="ai-debug-name ai-main"></kbd>',
                    $counters, $right_title) .
                    $this->labels->message (__('BLOCK', 'ad-inserter').' '._x('INSERTED BUT NOT VISIBLE', 'block or widget', 'ad-inserter')) .
                  '</section>';
            }
        }
      }
    } else $label_bars = $this->labels->bar ($block_name, '', '<kbd class="ai-debug-name ai-main">' . $title . '</kbd>', $counters, $right_title);

    if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
      $w3tc_debug_info = '<!-- AI-W3TC-LOG -->';
      if (!empty ($this->w3tc_debug)) {
        $w3tc_debug_info .= ai_w3tc_debug_info ($this->w3tc_debug);
      }
    } else $w3tc_debug_info = '';

    $this->additional_code_before =
      $this->labels->block_start () .
      $label_bars .
      $ajax_bar .
      $w3tc_debug_info .
      $this->additional_code_before;

    $this->additional_code_after .= $this->labels->block_end ();
  }

  public function generate_html_from_w3tc_code ($code = '') {
    global $ai_wp_data;

    if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
      $this->w3tc_debug []= '  GENERATE HTML';
    }

    if ($code == '') {
      $code = $this->w3tc_code;
    }

    return (
      '<!-- mfunc '.W3TC_DYNAMIC_SECURITY.' ' . $code . ' if (!isset ($ai_enabled) || $ai_enabled) echo $ai_code; else {echo ai_extract_debug_bar ($ai_code);}' . ' --><!-- /mfunc '. W3TC_DYNAMIC_SECURITY.' -->'
    );
  }

  public function generate_w3tc_code_from_html ($code) {
    global $ai_wp_data;

    if ($this->w3tc_code == '') {

      if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
        $this->w3tc_debug []= 'GENERATE W3TC FROM HTML';
      }

      $this->w3tc_code = '$ai_code = base64_decode (\''.base64_encode ($code).'\'); $ai_enabled = true;';
    }
  }

  public function regenerate_w3tc_code ($code, $update_w3tc = true) {
    global $ai_wp_data;

    if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
      $this->w3tc_debug []= '  REGENERATE W3TC';
    }

    preg_match_all ('#<!-- mfunc '.W3TC_DYNAMIC_SECURITY.' (.*?) --><!-- /mfunc '.W3TC_DYNAMIC_SECURITY.' -->#', $code, $php_codes);
    $html_codes = explode ('[?#?]', preg_replace ('#<!-- mfunc '.W3TC_DYNAMIC_SECURITY.' (.*?) --><!-- /mfunc '.W3TC_DYNAMIC_SECURITY.' -->#', '[?#?]', $code));

    $w3tc_code = 'ob_start (); $ai_enabled = true;';

    foreach ($html_codes as $index => $html_code) {
      if ($html_code != '') {
        $w3tc_code .= 'echo base64_decode (\'' . base64_encode ($html_code) . '\');';
      }
      if ($index < count ($html_codes) - 1) {
        $w3tc_code .= $php_codes [1][$index];
      }
    }

    $w3tc_code .= '$ai_code = ob_get_clean();';

    if ($update_w3tc) {
      $this->w3tc_code = $w3tc_code;
    }

    return ($this->generate_html_from_w3tc_code ($w3tc_code));
  }

  public function base64_encode_w3tc ($code, $w3tc = true) {
    global $ai_wp_data;

    if ($w3tc && $this->w3tc_code != '') {
      if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
        $this->w3tc_debug []= '  BASE64 ENCODE W3TC';
      }

      $base64_code  = '<!-- mfunc '.W3TC_DYNAMIC_SECURITY.' ';
      $base64_code .= $this->w3tc_code . ' if (!isset ($ai_enabled) || $ai_enabled) echo base64_encode ($ai_code);';
      $base64_code .= ' --><!-- /mfunc '.W3TC_DYNAMIC_SECURITY.' -->';

      return ($base64_code);
    }

    elseif (strpos ($code, '<!-- mfunc') !== false) {
      if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
        $this->w3tc_debug []= '  BASE64 ENCODE FROM HTML';
      }

      preg_match_all ('#<!-- mfunc '.W3TC_DYNAMIC_SECURITY.' (.*?) --><!-- /mfunc '.W3TC_DYNAMIC_SECURITY.' -->#', $code, $php_codes);
      $html_codes = explode ('[?#?]', preg_replace ('#<!-- mfunc '.W3TC_DYNAMIC_SECURITY.' (.*?) --><!-- /mfunc '.W3TC_DYNAMIC_SECURITY.' -->#', '[?#?]', $code));

      $base64_code  = '<!-- mfunc '.W3TC_DYNAMIC_SECURITY.' ';
      $base64_code .= 'ob_start ();';

      foreach ($html_codes as $index => $html_code) {
        if ($html_code != '') {
          $base64_code .= 'echo base64_decode (\'' . base64_encode ($html_code) . '\');';
        }
        if ($index < count ($html_codes) - 1) {
          $base64_code .= $php_codes [1][$index];
        }
      }

      $base64_code .= 'echo base64_encode (ob_get_clean());';
      $base64_code .= ' --><!-- /mfunc '.W3TC_DYNAMIC_SECURITY.' -->';

      return ($base64_code);
    }

    if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
      $this->w3tc_debug []= '  BASE64 ENCODE';
    }

    return (base64_encode ($code));
  }

  public function ai_js_dom_ready ($js_code, $script_tag = true, $script_class = '') {
    global $ai_wp_data;

    if ($this->get_embed_js_code ()) {
      $id = rand (100000, 999999) . rand (100000, 999999);

      if ($script_class != '') {
         $script_class = ' class="' . $script_class . '"';
      }

      $code = "<script{$script_class}>". ai_get_js ('ai-base64') . "
  ai_run_{$id} = function(){if (typeof ai_js_code == 'boolean') {{$js_code}};};
  if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) ai_run_{$id} (); else document.addEventListener ('DOMContentLoaded', ai_run_{$id});
</script>
";
    } else $code = ai_js_dom_ready ($js_code, $script_tag, $script_class);

    return $code;
  }

  public function ai_check_wait_for ($js_code) {
    global $ai_wp_data;

    $wait_for = trim ($this->get_wait_for ());
    $delay = intval ($this->get_wait_for_delay ());

    if ($wait_for != '' && $delay == 0) {
      $delay = 50;
    }

    if ($delay != 0) {
      if ($ai_wp_data [AI_FRONTEND_JS_DEBUGGING]) {
        $js_code = "console.log ('AI WAIT FOR DELAY ".$delay." ms');\n" . $js_code;
      }

      $js_code = 'setTimeout (function () {'.$js_code.'}, '.$delay.');';
    }

    if ($wait_for != '') {
      if ($ai_wp_data [AI_FRONTEND_JS_DEBUGGING]) {
        $js_code = "console.log ('AI WAIT FOR ".$wait_for." LOADED');\n" . $js_code;
      }

      $js_code = 'document.arrive ("'.$wait_for.'", function () {'.$js_code.'});';
    }

    return $js_code;
  }

  public function ai_processViewportSeparators ($processed_code) {
    global $ai_wp_data;

    preg_match_all ('/\|viewport([0-9]+?)\|/', $processed_code, $matches);
    if (count ($matches [1]) != 0) {
      $viewport_parameters = array ();
      foreach ($matches [1] as $match) {
//        $viewport_parameters []= $ai_wp_data [AI_SHORTCODES]['viewport'][$match];
        $viewport_parameters []= $this->shortcodes ['viewport'][$match];
      }
      if ($ai_wp_data [AI_WP_AMP_PAGE]) {
        $processed_code = preg_replace ('/\|viewport([0-9]+?)\|/', '', $processed_code);
      } else $processed_code = preg_replace ('/\|viewport([0-9]+?)\|/', AD_VIEWPORT_SEPARATOR, $processed_code);
    }

    $this->viewport_names = null;

    if (strpos ($processed_code, AD_VIEWPORT_SEPARATOR) !== false) {
      $codes = explode (AD_VIEWPORT_SEPARATOR, $processed_code);

      if (trim ($codes [0]) == '') {
        unset ($codes [0]);
        $codes = array_values ($codes);
      } else array_unshift ($viewport_parameters,  array ('viewport' => '', 'code' => ''));

      if ($ai_wp_data [AI_FORCE_SERVERSIDE_CODE]) {
        // Code for preview
        if ($this->viewport_index >= count ($codes)) {
          $this->viewport_index = 0;
        }
        $processed_code = trim ($codes [$this->viewport_index]);

        foreach ($viewport_parameters as $index => $viewport_name) {
          $name = $viewport_name ['viewport'];
          if ($name == '') {
            $name = _x('ALL', 'viewports', 'ad-inserter');
          }
          $this->viewport_names []= $name;
        }
      } else {
          $processed_code = '';
          foreach ($codes as $viewport_code_index => $viewport_code) {

            $viewport_code = $this->ai_processFallbackSeparator ($viewport_code);

            $separator_viewports = explode (',', strtolower ($viewport_parameters [$viewport_code_index]['viewport']));
            foreach ($separator_viewports as $index => $separator_viewport) {
              $separator_viewports [$index] = trim ($separator_viewport);
            }

            $viewport_classes = '';
            $invisible_viewport_classes = '';
            for ($viewport = 1; $viewport <= 6; $viewport ++) {
              $viewport_name  = strtolower (get_viewport_name ($viewport));

              if ($viewport_name != '') {
                $viewport_found = in_array ($viewport_name, $separator_viewports);
                if ($viewport_found) {
                  $viewport_classes .= " ai-viewport-" . $viewport;
                } else {
                    $invisible_viewport_classes .= " ai-viewport-" . $viewport;
                  }
              }
            }

            if ($viewport_classes == '') {
              if ($viewport_parameters [$viewport_code_index]['viewport'] != '') {
                // Invalid viewport - Code will never be inserted

                if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0 && !$this->hide_debug_labels && !get_disable_js_code ()) {
                  $invisible_debug_viewport = new ai_block_labels ('ai-debug-viewport-invisible');
                  $invisible_label = $invisible_debug_viewport->bar ("VIEWPORT='".$viewport_parameters [$viewport_code_index]['viewport']."'", '', _x('HIDDEN', 'Block', 'ad-inserter'), '&nbsp;');

                  $code_id = 'ai-viewport-code-' . rand (1000, 9999) . rand (1000, 9999);

                  $ai_dbg_code = base64_encode ($invisible_label);
                  $processed_code .= "<div class='{$code_id}-dbg' data-insertion='after' data-selector='.{$code_id}-dbg' data-insertion-no-dbg data-code='$ai_dbg_code'></div>\n";
                  $js_code = "ai_insert_code_by_class ('{$code_id}-dbg');";
                  $processed_code .= $this->ai_js_dom_ready ($js_code);
                }

                continue;
              }
              $invisible_viewport_classes = '';
            }
            $viewport_classes = trim ($viewport_classes);
            $invisible_viewport_classes = trim ($invisible_viewport_classes);

            if ($ai_wp_data [AI_CODE_FOR_IFRAME]) {
              $viewport_classes = '';
              $invisible_viewport_classes = 'ai-viewport-0';
            }

            if ($viewport_classes != '') {
              $viewport_class = " class='" . $viewport_classes . "'";
            } else $viewport_class = '';

            $insert_code = get_dynamic_blocks () == AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT;
            switch (strtolower ($viewport_parameters [$viewport_code_index]['code'])) {
              case 'insert':
                $insert_code = true;
                break;
              case 'show':
                $insert_code = false;
                break;
            }

            $invisible_label = '';
            if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0 && !$this->hide_debug_labels && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
              if ($invisible_viewport_classes != '') {
                $invisible_label_classes = $insert_code ? '' : $invisible_viewport_classes;
                $invisible_debug_viewport = new ai_block_labels ('ai-debug-viewport-invisible '. $invisible_label_classes);
                $invisible_label = $invisible_debug_viewport->bar ("VIEWPORT='".$viewport_parameters [$viewport_code_index]['viewport']."'", '', _x('HIDDEN', 'Block', 'ad-inserter'), '&nbsp;');
              }

              $debug_viewport = new ai_block_labels ('ai-debug-lists');
              if ($viewport_parameters [$viewport_code_index]['viewport'] == '') {
                $viewport_text = "ALL VIEWPORTS";
              } else $viewport_text = "VIEWPORT='".$viewport_parameters [$viewport_code_index]['viewport']."'";
              $viewport_code = $debug_viewport->bar ($viewport_text, '', _x('VISIBLE', 'Block', 'ad-inserter'), '&nbsp;') . $viewport_code;
            }

            if ($insert_code) {
              $code_id = 'ai-viewport-code-' . rand (1000, 9999) . rand (1000, 9999);

              if ($viewport_classes != '') {
                $viewport_classes = 'ai-viewports ' . $viewport_classes . ' ';
              }

              $ai_code = $this->base64_encode_w3tc (ai_strip_js_markers ($viewport_code), false);

              $style_attribute = '';
              if (isset ($viewport_parameters [$viewport_code_index]['css'])) {
                // Style is removed in ai-insert.js !!!
                $style_attribute = " style='" . $viewport_parameters [$viewport_code_index]['css'] . "'";
//                $style_attribute = " data-css='" . $viewport_parameters [$viewport_code_index]['css'] . "'";
              }

              $processed_code .= "<div class='{$viewport_classes} {$code_id}'{$style_attribute} data-insertion='after' data-selector='.{$code_id}' data-insertion-no-dbg data-code='$ai_code'></div>\n";
              if (!get_disable_js_code ()) {
                $js_code = "ai_insert_viewport_code ('$code_id');";

                $processed_code .= $this->ai_js_dom_ready ($js_code);

                if ($invisible_label != '') {
                  if ($invisible_viewport_classes != '') {
                    $invisible_viewport_classes = 'ai-viewports ' . $invisible_viewport_classes . ' ';
                  }
                  $ai_dbg_code = base64_encode ($invisible_label);
                  $processed_code .= "<div class='$invisible_viewport_classes {$code_id}-dbg' data-insertion='after' data-selector='.{$code_id}-dbg' data-insertion-no-dbg data-code='$ai_dbg_code'></div>\n";
                  $js_code = "ai_insert_code_by_class ('{$code_id}-dbg');";
                  $processed_code .= $this->ai_js_dom_ready ($js_code);
                }
              }
            } else {
                if ($viewport_class != '') {
                  $processed_code .= $invisible_label . "<div{$viewport_class}>\n" . $viewport_code . "\n</div>\n";
                } else $processed_code .= $invisible_label . $viewport_code;
              }
          }
        }
    }

    return $processed_code;
  }

  public function ai_processFallbackSeparator ($processed_code) {
    global $ai_wp_data;

    $this->fallback_names = null;

    if (strpos ($processed_code, AD_FALLBACK_SEPARATOR) !== false) {
      $codes = explode (AD_FALLBACK_SEPARATOR, $processed_code);

      if ($ai_wp_data [AI_FORCE_SERVERSIDE_CODE]) {
        // Code for preview
        if ($this->fallback_index >= count ($codes)) {
          $this->fallback_index = 0;
        }
        $processed_code = trim ($codes [$this->fallback_index]);

        $this->fallback_names []= _x('INACTIVE', 'fallback', 'ad-inserter');
        $this->fallback_names []= _x('ACTIVE', 'fallback', 'ad-inserter');

      } else {
          $processed_code = $codes [0];

          if (!$ai_wp_data [AI_WP_AMP_PAGE]) {
            // AdSense unfilled
            if (strtolower ($this->shortcodes ['fallback'][0]['fallback']) == 'adsense') {

              $insert_code = get_dynamic_blocks () == AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT;
              switch (strtolower ($this->shortcodes ['fallback'][0]['code'])) {
                case 'insert':
                  $insert_code = true;
                  break;
                case 'show':
                  $insert_code = false;
                  break;
              }

              $debug_fallback_code = '';
              if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0 && !$this->hide_debug_labels && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
                $debug_fallback = new ai_block_labels ('ai-debug-fallback');
                $debug_fallback_code = $debug_fallback->bar (_x('FALLBACK CODE', 'Block', 'ad-inserter'), '', 'AdSense UNFILLED', '&nbsp;');
              }

              $processed_code = "<div class='ai-fallback-adsense'>" . $processed_code . "</div>\n";

              if ($insert_code) {
                $ai_code = $this->base64_encode_w3tc (ai_strip_js_markers ($debug_fallback_code . trim ($codes [1])), false);

                $processed_code .= "<div data-code='$ai_code'></div>\n";
              } else {
                  $processed_code .= "<div style='display: none;'>\n" . $debug_fallback_code . trim ($codes [1]) . "\n</div>\n";
                }
            }
          }
        }
    }

    return $processed_code;
  }

  public function ai_getProcessedCode ($force_close_button = false) {
    global $ai_wp_data, $ad_inserter_globals, $block_object, $ai_total_hook_php_time, $filter_hooks;

    // Clear the codes for cases when the code block is called more than once
    $this->additional_code_before = '';
    $this->additional_code_after = '';
    $this->additional_code_before_block = '';
    $this->w3tc_code = '';
    $this->w3tc_debug = array ();
    $this->no_insertion_text = '';

    $not_iframe_or_inside = !$this->get_iframe () || $ai_wp_data [AI_CODE_FOR_IFRAME];

    $debug_processing = ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0;

    // Code for ad label, close button
    $label_code = '';
    $additional_code = '';
    $check_block_code = false;

    if ($this->get_iframe () ? ($this->get_label_in_iframe () ? $ai_wp_data [AI_CODE_FOR_IFRAME] : !$ai_wp_data [AI_CODE_FOR_IFRAME]) : true) {
      $label_code = $this->ai_getAdLabel ();
    }

    $close_button = $this->get_close_button ();
    $auto_close_time = $this->get_auto_close_time ();
    $stay_closed_time = $this->get_stay_closed_time ();

    $closed_code = '';

    if (!$ai_wp_data [AI_CODE_FOR_IFRAME]) {
      $alignment_type = $this->get_alignment_type ();
      if ($force_close_button ||
          (($close_button != AI_CLOSE_NONE || $auto_close_time) &&
           !$ai_wp_data [AI_WP_AMP_PAGE] &&
           $alignment_type != AI_ALIGNMENT_NO_WRAPPING &&
           !(($alignment_type == AI_ALIGNMENT_STICKY) && $this->get_background ())
          )
         ) {

        switch ($close_button) {
          case AI_CLOSE_TOP_RIGHT:
            $button_class = 'ai-close-button ai-close-unprocessed';
            break;
          case AI_CLOSE_TOP_LEFT:
            $button_class = 'ai-close-button ai-close-unprocessed ai-close-left';
            break;
          case AI_CLOSE_BOTTOM_RIGHT:
            $button_class = 'ai-close-button ai-close-unprocessed ai-close-bottom';
            break;
          case AI_CLOSE_BOTTOM_LEFT:
            $button_class = 'ai-close-button ai-close-unprocessed ai-close-bottom ai-close-left';
            break;
          default:
            $button_class = 'ai-close-button ai-close-unprocessed ai-close-none';
            break;
        }

        $timeout_code = '';
        if ($auto_close_time) {
          $timeout_code = " data-ai-close-timeout='{$auto_close_time}'";
        }

        if ($stay_closed_time) {
          $closed_code = " data-ai-closed-time='{$stay_closed_time}'";
        }

        $closed_block_code = '';
        if ($closed_code != '' || $timeout_code != '') {
          $closed_block_code = " data-ai-block='{$this->number}'";
        }

        $additional_code .= "<span class='$button_class'{$timeout_code}{$closed_code}{$closed_block_code}></span>\n";
      }

      $parallax_code = '';
      for ($index = 1; $index <= 3; $index ++) {
        if ($this->get_parallax ($index) && $this->get_parallax_image ($index) != '') {
          $shift = (int) $this->get_parallax_shift ($index);

          $style = "background-image: url(\"".$this->get_parallax_image ($index)."\"); background-size: auto calc(100% + ".$shift."px);";


          $parallax_code .= "<div class='ai-parallax-background' data-shift='$shift' style='$style'></div>\n";
        }
      }

      if ($parallax_code != '') {
        $link = trim ($this->get_parallax_link ());
        if ($link != '') {
          $target = '';
          if ($this->get_parallax_link_new_tab ()) {
            $target = " target='_blank'";
          }
          $parallax_code .= "<a class='ai-parallax-background' href='$link'$target></a>\n";
        }

        $height = trim ($this->get_block_height ());

        $height_style = '';
        if ($height != '') {
          if (is_numeric ($height)) {
            $height .= 'px';
          }
          $height_style = 'height: ' . $height . ';';
        }

        $additional_code .= "<div class='ai-parallax' style='$height_style'>$parallax_code</div>\n";
      }

      $background_color = trim ($this->get_block_background_color ());
      if ($this->is_sticky () && $this->get_horizontal_position () == AI_STICK_HORIZONTAL_CENTER && $background_color != '') {
        $sticky_pop_up = $this->get_vertical_position () == AI_STICK_VERTICAL_CENTER;

        if ($sticky_pop_up) {
          $additional_code .= "<div style='position: fixed; top: -100vh; left: -100vw; width: 200vw; height: 200vh; z-index: -1; user-select: none; background: " . trim ($this->get_block_background_color ()) . ";'></div>\n";
        }

        $sticky_top_bottom = $this->get_vertical_position () == AI_STICK_TO_THE_TOP || $this->get_vertical_position () == AI_STICK_TO_THE_BOTTOM;

        if ($sticky_top_bottom) {
          $this->additional_code_before .= "<div style='width: 100vw; z-index: -1; user-select: none; background: " . trim ($this->get_block_background_color ()) . ";'>\n";
          $this->additional_code_after = "</div>\n";
        }
      }
    }

    $delay_showing_pageviews = $this->get_delay_showing ();
    $show_every_pageviews    = $this->get_show_every ();

    $visitor_max_impressions                    = $this->get_visitor_max_impressions ();
    $visitor_limit_impressions_per_time_period  = $this->get_visitor_limit_impressions_per_time_period ();
    $visitor_limit_impressions_time_period      = $this->get_visitor_limit_impressions_time_period ();
    $visitor_max_clicks                         = $this->get_visitor_max_clicks ();
    $visitor_limit_clicks_per_time_period       = $this->get_visitor_limit_clicks_per_time_period ();
    $visitor_limit_clicks_time_period           = $this->get_visitor_limit_clicks_time_period ();
    $trigger_click_fraud_protection             = $this->get_trigger_click_fraud_protection () && get_click_fraud_protection ();

    $global_visitor_limit_clicks_per_time_period  = get_global_visitor_limit_clicks_per_time_period ();
    $global_visitor_limit_clicks_time_period      = get_global_visitor_limit_clicks_time_period ();

    $ai_check_block_js_code = '';
    $ai_check_block_html_code = '';
    $ai_check_block_w3tc_code = '';

    if ($not_iframe_or_inside) {
      $delay_showing_pageviews_code = '';
      if ($delay_showing_pageviews != '') {
        $delay_showing_pageviews_code = " data-ai-delay-pv='{$delay_showing_pageviews}'";
        $ai_check_block_js_code   .= 'ai_delay_showing_pageviews = ' . round ($delay_showing_pageviews) .'; ';
        $ai_check_block_w3tc_code .= 'global $ai_delay_showing_pageviews; $ai_delay_showing_pageviews = ' . round ($delay_showing_pageviews) . '; ';
      }

      $show_every_pageviews_code = '';
      if ($show_every_pageviews != '') {
        $show_every_pageviews_code = " data-ai-every-pv='{$show_every_pageviews}'";
      }

      $visitor_max_impressions_code = '';
      if ($visitor_max_impressions != '') {
        $visitor_max_impressions_code = " data-ai-max-imp='{$visitor_max_impressions}'";
      }

      $visitor_limit_impressions_per_time_period_code = '';
      if ($visitor_limit_impressions_per_time_period != '' && $visitor_limit_impressions_time_period != '') {
        $visitor_limit_impressions_per_time_period_code = " data-ai-limit-imp-per-time='{$visitor_limit_impressions_per_time_period}' data-ai-limit-imp-time='{$visitor_limit_impressions_time_period}'";
      }

      $visitor_max_clicks_code = '';
      if ($visitor_max_clicks != '') {
        $visitor_max_clicks_code = " data-ai-max-clicks='{$visitor_max_clicks}'";
      }

      $visitor_limit_clicks_per_time_period_code = '';
      if ($visitor_limit_clicks_per_time_period != '' && $visitor_limit_clicks_time_period != '') {
        $visitor_limit_clicks_per_time_period_code = " data-ai-limit-clicks-per-time='{$visitor_limit_clicks_per_time_period}' data-ai-limit-clicks-time='{$visitor_limit_clicks_time_period}'";
      }

      $global_visitor_limit_clicks_per_time_period_code = '';
      if ($trigger_click_fraud_protection && $global_visitor_limit_clicks_per_time_period != '' && $global_visitor_limit_clicks_time_period != '') {
        $global_visitor_limit_clicks_per_time_period_code = " data-ai-global-limit-clicks-per-time='{$global_visitor_limit_clicks_per_time_period}' data-ai-global-limit-clicks-time='{$global_visitor_limit_clicks_time_period}'";
      }

      $hash_code = '';
      if ($stay_closed_time != '' || $visitor_max_impressions != '' || $visitor_max_clicks != '') {
        $hash = $this->get_ad_code_hash ();
        $hash_code = " data-ai-hash='{$hash}'";
      }

      switch (get_dynamic_blocks ()) {
        case AI_DYNAMIC_BLOCKS_CLIENT_SIDE_SHOW:
        case AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT:
        case AI_DYNAMIC_BLOCKS_SERVER_SIDE_W3TC:
          $check_client_side_limits = $this->get_max_impressions () || $this->get_max_clicks ();
          break;
        default:
          $check_client_side_limits = false;
      }

      // Update also ai_extract_features_2
      $check_block_code =
        $check_client_side_limits || $closed_code || $delay_showing_pageviews_code || $show_every_pageviews_code ||
        $visitor_max_impressions_code || $visitor_limit_impressions_per_time_period_code ||
        $visitor_max_clicks_code || $visitor_limit_clicks_per_time_period_code || $global_visitor_limit_clicks_per_time_period_code || $hash_code || $trigger_click_fraud_protection;

      if ($check_block_code) {
        $classes = '';
        $click_fraud_protection_time_code = '';
        if ($trigger_click_fraud_protection) {
          $classes = ' ai-cfp';
          $click_fraud_protection_time_code = " data-ai-cfp-time='".get_click_fraud_protection_time ()."'";
        }
        $ai_check_block_html_code =
          "<span class='ai-check-block{$classes}' data-ai-block='{$this->number}'".
          "{$delay_showing_pageviews_code}{$show_every_pageviews_code}{$visitor_max_impressions_code}{$visitor_limit_impressions_per_time_period_code}{$visitor_max_clicks_code}{$visitor_limit_clicks_per_time_period_code}{$global_visitor_limit_clicks_per_time_period_code}{$hash_code}{$click_fraud_protection_time_code}></span>";
        $additional_code .= $ai_check_block_html_code . "\n";
      }
    }


    if ($label_code != '' || $additional_code != '') {
      $additional_code_org = '';
      if ($label_code      != '') $additional_code_org .= $label_code;
      if ($additional_code != '') $additional_code_org .= '<div class="ai-attributes" style="position: relative;">'."\n" . $additional_code . '</div>'."\n";

      $hook_start_time = microtime (true);
      $additional_code = apply_filters ("ai_block_additional_code", $additional_code_org, $this->number);
      if ($debug_processing && $additional_code != $additional_code_org) {
        $filter_hooks []= array ("ai_block_additional_code", $this->number);
      }
      $ai_total_hook_php_time += microtime (true) - $hook_start_time;
    }


    $processed_code = '';


     // TODO single CHECK block
//    do {

    if ($this->get_iframe () && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
      $width  = trim ($this->get_iframe_width ());
      $height = trim ($this->get_iframe_height ());
      $iframe_style = ($width != '' ? 'width: ' . $width . 'px; ' : 'width: 100%; ') . ($height != '' ? 'height: ' . $height . 'px;' : 'height: 0px;');

      $iframe_parameters = '';

      if (get_dynamic_blocks () != AI_DYNAMIC_BLOCKS_SERVER_SIDE) {
        if (isset ($_SERVER['HTTP_REFERER'])) {
            $referer_host = strtolower (parse_url ($_SERVER['HTTP_REFERER'], PHP_URL_HOST));
        } else $referer_host = '';
        $iframe_parameters .= '&referrer='.urlencode_deep ($referer_host);
      }

      if ($this->client_side_cookie_check) {
        $iframe_parameters .= '&cookie_check=1';
      }

      if ($this->hide_debug_labels) {
        $iframe_parameters .= '&hide-debug-labels=1';
      }

      $iframe_parameters .= '&rnd=' . rand (1, 10000000000);

      foreach ($_GET as $url_parameter => $url_parameter_value) {
        if (in_array ($url_parameter, array ('action', 'block', 'referrer', 'cookie_check', 'hide-debug-labels', 'rnd'))) continue;
        $iframe_parameters .= '&'. $url_parameter . '=' . $url_parameter_value;
      }

      $attributes = '';
      if (!get_disable_js_code () && ($height == '' || ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0)) {
        $attributes = ' onload="ai_resize_iframe (this);"';
      }

      $code = '<iframe style="' . $iframe_style. '" src="' . get_home_url (null, 'wp-admin/admin-ajax.php?action=ai_ajax&block=') . $this->number . $iframe_parameters .'" marginheight="0" marginwidth="0" frameborder="0" scrolling="no"' . $attributes . '></iframe>' . "\n";
    } else {
        if (is_array ($this->check_codes)) {
          $this->check_codes_index ++;
          $code = $this->check_codes [$this->check_codes_index];
        } else {
            unset ($ai_wp_data [AI_SHORTCODES]['check']);
            unset ($ai_wp_data [AI_SHORTCODES]['count']);
            unset ($ai_wp_data [AI_SHORTCODES]['rotate']);
            unset ($ai_wp_data [AI_SHORTCODES]['head']);
            unset ($ai_wp_data [AI_SHORTCODES]['viewport']);

            $ai_wp_data [AI_CURRENT_BLOCK_NUMBER] = $this->number;

//            $code = $this->replace_ai_tags (do_shortcode ($this->ai_getCode (), true)); // Does not expand shortcodes inside HTML <div id='div-gpt-ad-1234567890-[ADINSERTER counter="block"]'>
//            $ai_code = do_shortcode ($this->ai_getCode (), true); // Does not expand shortcodes inside HTML <div id='div-gpt-ad-1234567890-[ADINSERTER counter="block"]'>
//            $ai_code = str_replace ('<', '<ad-inserter-dummy-tag>', $ai_code); // Causes issues with [su_list] shortcodes
            $ai_code = $this->ai_getCode ();

            $replace_embed = false;
            if (stripos ($ai_code, 'embed]') !== false) {
              $replace_embed = true;

              $ai_code = str_ireplace (array ('[embed]', '[/embed]'), array ('[#embed#]', '[#/embed#]'), $ai_code);
            }

            $code = do_shortcode (replace_ai_tags ($ai_code, $this->get_ad_general_tag()));

            if ($replace_embed) {
              $code = str_ireplace (array ('[#embed#]', '[#/embed#]'), array ('[embed]', '[/embed]'), $code);

              $code = $GLOBALS[ 'wp_embed']->run_shortcode ($code);
            }

//            $code = str_replace ('<ad-inserter-dummy-tag>', '<', $code);

            unset ($ai_wp_data [AI_CURRENT_BLOCK_NUMBER]);

            if (isset ($ai_wp_data [AI_SHORTCODES])) {
              $this->shortcodes = $ai_wp_data [AI_SHORTCODES];
            }
          }
      }

    $processed_code .= $code;

    $this->needs_class = true;
    $this->wrapping_div_classes = array ();

    $dynamic_blocks = get_dynamic_blocks ();
    if ($ai_wp_data [AI_FORCE_SERVERSIDE_CODE] || ($dynamic_blocks == AI_DYNAMIC_BLOCKS_SERVER_SIDE_W3TC && defined ('AI_NO_W3TC'))) $dynamic_blocks = AI_DYNAMIC_BLOCKS_SERVER_SIDE;

    if ($not_iframe_or_inside) {

      // [ADINSERTER CHECK]

      if (function_exists ('ai_check_separators')) {
        $processed_code = ai_check_separators ($this, $processed_code);
        if ($this->check_code_empty && $processed_code == '') {
          return '';
        }
      }

      // [ADINSERTER COUNT]

      preg_match_all ('/\|count([0-9]+?)\|/', $processed_code, $matches);
      if (count ($matches [1]) != 0) {
        $count_parameters = array ();
        foreach ($matches [1] as $match) {
//          $count_parameters []= $ai_wp_data [AI_SHORTCODES]['count'][$match];
          $count_parameters []= $this->shortcodes ['count'][$match];
        }
        $processed_code = preg_replace ('/\|count([0-9]+?)\|/', AD_COUNT_SEPARATOR, $processed_code);
//      } else if (isset ($ai_wp_data [AI_SHORTCODES]['count'])) $count_parameters = $ai_wp_data [AI_SHORTCODES]['count'];
      } else if (isset ($this->shortcodes ['count'])) $count_parameters = $this->shortcodes ['count'];

      if (strpos ($processed_code, AD_COUNT_SEPARATOR) !== false) {
        $ads = explode (AD_COUNT_SEPARATOR, $processed_code);

        $allow_empty = false;
        if (isset ($count_parameters [0]['count'])) {
          if (strpos (strtolower ($count_parameters [0]['count']), 'empty') !== false) {
            $allow_empty = true;
          }
        }

        if (trim ($ads [0]) == '' && !$allow_empty) {
          unset ($ads [0]);
          $ads = array_values ($ads);
          // $count_parameters are shifted (the first $count_parameters is for the deleted empty option)
        }

        $this->count_names = null;

        if ($ai_wp_data [AI_FORCE_SERVERSIDE_CODE]) {
          // Code for preview
          $processed_code = $ads [$this->count_index];
          foreach ($ads as $index => $ad) $this->count_names []= $index + 1;
        } else {
            if (isset ($ad_inserter_globals [AI_BLOCK_COUNTER_NAME . $this->number])) {
              $block_counter = $ad_inserter_globals [AI_BLOCK_COUNTER_NAME . $this->number];
              $option_index = $block_counter - 1;

              if (isset ($count_parameters [$block_counter - 1]['count'])) {
                if (strpos (strtolower ($count_parameters [$block_counter - 1]['count']), 'shuffle') !== false) {
                  $ai_wp_data [AI_COUNT_SHUFFLE][$this->number] = $ads;
                  shuffle ($ai_wp_data [AI_COUNT_SHUFFLE][$this->number]);
                }
                if (strpos (strtolower ($count_parameters [$block_counter - 1]['count']), 'repeat') !== false) {
                  $ai_wp_data [AI_COUNT_REPEAT][$this->number] = true;
                }
              }

              if (isset ($ai_wp_data [AI_COUNT_SHUFFLE][$this->number])) {
                $ads = $ai_wp_data [AI_COUNT_SHUFFLE][$this->number];
              }
              if (isset ($ai_wp_data [AI_COUNT_REPEAT][$this->number])) {
                $option_index = $option_index % count ($ads);
              }

              if ($option_index >= 0 && $option_index < count ($ads)) {
                $processed_code = $ads [$option_index];
              } else {
                  $processed_code = '';
                  $additional_code = '';
                }
            } else $processed_code = $ads [rand (0, count ($ads) - 1)];
          }
      }


      // [ADINSERTER ROTATE]

      // (Re)set option index and name
      $check_options_for_statistics = $this->check_statistics;
      $check_option_always = isset ($this->check_codes_data [0]) && empty ($this->check_codes_data [0]);

      if ($check_options_for_statistics) {

        $option_index = isset ($this->check_codes_data [$this->check_codes_index]['name']) ? $this->check_codes_data [$this->check_codes_index]['name'] : $this->check_codes_index;

        if ($check_option_always) {
          // first option with index 0 is always inserted
          // first check option has index 1
          $this->code_version = isset ($this->check_codes_data [$this->check_codes_index]['index']) && trim ($this->check_codes_data [$this->check_codes_index]['index']) != '' ? (int) $this->check_codes_data [$this->check_codes_index]['index'] : $this->check_codes_index;
          $this->version_name = isset ($this->check_codes_data [$this->check_codes_index]['name']) ? $this->check_codes_data [$this->check_codes_index]['name'] : '';
        } else {
            // first check option has index 0
            $this->code_version = isset ($this->check_codes_data [$this->check_codes_index]['index']) && trim ($this->check_codes_data [$this->check_codes_index]['index']) != '' ? (int) $this->check_codes_data [$this->check_codes_index]['index'] : $this->check_codes_index + 1;
            $this->version_name = isset ($this->check_codes_data [$this->check_codes_index]['name']) ? $this->check_codes_data [$this->check_codes_index]['name'] : '';
          }

      } else {
          // Clear for ROTATE in case of multiple block insertions (CHECK separator)
          $this->code_version = 0;
          $this->version_name = '';
        }


      preg_match_all ('/\|rotate([0-9]+?)\|/', $processed_code, $matches);

      if (count ($matches [1]) != 0) {

        $rotate_parameters = array ();
        foreach ($matches [1] as $match) {
//          $rotate_parameters []= $ai_wp_data [AI_SHORTCODES]['rotate'][$match];
          $rotate_parameters []= $this->shortcodes ['rotate'][$match];
        }
        $processed_code = preg_replace ('/\|rotate([0-9]+?)\|/', AD_ROTATE_SEPARATOR, $processed_code);
//      } else if (isset ($ai_wp_data [AI_SHORTCODES]['rotate'])) $rotate_parameters = $ai_wp_data [AI_SHORTCODES]['rotate'];
      } else if (isset ($this->shortcodes ['rotate'])) $rotate_parameters = $this->shortcodes ['rotate'];

      if (strpos ($processed_code, AD_ROTATE_SEPARATOR) !== false) {
        $ads = explode (AD_ROTATE_SEPARATOR, $processed_code);

        if (!isset ($rotate_parameters)) {
          // using old separator |rotate|
          $rotate_parameters = array ();
          foreach ($ads as $index => $ad) {
            // Skip parameters for first option (it will be added with array_unshift below)
            if ($index == 0) continue;
            $rotate_parameters []= array ();
          }
        }

        if (trim ($ads [0]) == '') {
          unset ($ads [0]);
          $ads = array_values ($ads);
        } else array_unshift ($rotate_parameters,  array ('name' => ''));

        $shares = false;
        $ctr_shares = false;
        $ctr_min_impressions = 1000;
        $ctr_days = 30;
        $ctr_top_share = 75;
        $times = false;
        $scheduling = false;
        $groups = false;
        $unique = false;
        $version_names = array ();
        $version_shares = array ();
        $version_times = array ();
        $version_scheduling = array ();
        $version_groups = array ();

        foreach ($rotate_parameters as $index => $option) {
          if ((isset ($option ['group']) && trim ($option ['group']) != '') || $groups) {
            $groups = true;
            $shares = false;
            $times = false;

            $version_groups []= mb_strtolower (trim ($option ['group']));
            $version_names []= isset ($option ['group']) && trim ($option ['group']) != '' ? $option ['group'] : chr (ord ('A') + $index);

            $version_shares []= - 1;
            $version_times []= - 1;
            $version_scheduling []= - 1;
          } else {
              $version_names []= isset ($option ['name']) && trim ($option ['name']) != '' ? $option ['name'] : chr (ord ('A') + $index);

              // Just in case there will be a ROTATE group option
              $version_groups []= '';

              if (isset ($option ['share']) && strpos ($share_option = strtolower ($option ['share']), 'ctr') === 0 && function_exists ('ai_get_impressions_and_clicks')) {
                $ctr_options = explode (':', $share_option);

                if (isset ($ctr_options [1]) && $ctr_options [1] > 0 && $ctr_options [1] < 366) {
                  $ctr_days = (int) $ctr_options [1];
                }

                if (isset ($ctr_options [2]) && $ctr_options [2] > 1 && $ctr_options [2] < 10000000) {
                  $ctr_min_impressions = (int) $ctr_options [2];
                }

                if (isset ($ctr_options [3]) && $ctr_options [3] > 1 && $ctr_options [3] < 100) {
                  $ctr_top_share = (int) $ctr_options [3];
                }

                $shares = true;
                $ctr_shares = true;
                $version_shares []= - 1;
              } else {
                  $option_share = isset ($option ['share']) && is_numeric ($option ['share']);
                  if ($option_share) $shares = true;
                  $version_shares []= $option_share ? intval ($option ['share']) : - 1;
                }

              $option_time = isset ($option ['time']) && is_numeric ($option ['time']);
              if ($option_time) $times = true;
              $version_times []= $option_time ? intval ($option ['time']) : - 1;

              $option_scheduling = isset ($option ['scheduling']) && strpos ($option ['scheduling'], '=') !== false;
              if ($option_scheduling) $scheduling = true;
              $version_scheduling []= $option_scheduling ? trim ($option ['scheduling']) : - 1;
            }

          if (isset ($option ['rotate']) && strtolower ($option ['rotate']) == 'unique') $unique = true;
        }

        if ($unique && !isset ($ai_wp_data [AI_ROTATION_SEED])) {
          $ai_wp_data [AI_ROTATION_SEED] = mt_rand (1, time ()) % count ($ads);
        }

        $this->roate_names = $version_names;

        if ($groups) {
          // Clear in case there were mixed rotate options
          foreach ($rotate_parameters as $index => $option) {
            $version_shares [$index] - 1;
            $version_times  [$index] - 1;
            $version_scheduling [$index] - 1;
          }
        }

        if ($shares) {
          $total_share = 0;
          $no_share = 0;

          if ($ctr_shares) {
            $disabled_shares = 0;
            foreach ($version_shares as $index => $share) {
              if ($share == 0) {
                $disabled_shares ++;
              }
            }

            if ($disabled_shares < count ($rotate_parameters) - 1) {
              // Default state (no CTR data yet) is equal shares
              foreach ($version_shares as $index => $share) {
                if ($share != 0) {
                  $version_shares [$index] = number_format (100 / (count ($rotate_parameters) - $disabled_shares), 2);
                }
              }

              if (count ($rotate_parameters) > 1 && $this->get_tracking () && get_internal_tracking ()) {
                $tracking_data = ai_get_impressions_and_clicks ($this->number, $ctr_days, false, true);

                if ($tracking_data [2] >= $ctr_min_impressions) {

                  $max_ctr = 0;
                  $max_ctr_option = 0;
                  foreach ($tracking_data [4] as $option => $ctr) {
                    if ($option == 0) continue;
                    if ($ctr > $max_ctr) {
                      $max_ctr = $ctr;
                      $max_ctr_option = $option;
                    }
                  }

                  // We have a winner
                  if ($max_ctr_option != 0) {
                    foreach ($version_shares as $index => $share) {
                      if ($version_shares [$index] != 0) {
                        if ($index + 1 == $max_ctr_option) $version_shares [$index] = $ctr_top_share;
                          else $version_shares [$index] = number_format ((100 - $ctr_top_share) / (count ($rotate_parameters) - $disabled_shares - 1), 2);
                      }
                    }
                  }
                }
              } else $ctr_shares = false;
            }

          }

          foreach ($version_shares as $index => $share) {
            if ($share < 0) $no_share ++; else $total_share += $share;
          }

          if ($total_share > 100 || $no_share == 0) {
            $scale = $total_share / 100;
          } else $scale = 1;

          foreach ($version_shares as $index => $share) {
            // Disable options with share 0
            if ($share == 0) $version_shares [$index] = - 1; else
              if ($share < 0) $version_shares [$index] = (100 - $total_share / $scale) / $no_share; else
                $version_shares [$index] = $share / $scale;
          }

          $thresholds = array ();
          $total_share = 0;
          foreach ($version_shares as $index => $share) {
            if ($share >= 0) {
              $total_share += $share;
              $thresholds [] = round ($total_share);
            } else $thresholds [] = - 1;
          }
        }

        if ($times) {
          if ($dynamic_blocks != AI_DYNAMIC_BLOCKS_CLIENT_SIDE_SHOW && $dynamic_blocks != AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT) $dynamic_blocks = AI_DYNAMIC_BLOCKS_CLIENT_SIDE_SHOW;
          $ai_wp_data [AI_CLIENT_SIDE_ROTATION] = true;
        }

        $rotation_dynamic_blocks = $dynamic_blocks;
        if ($ai_wp_data [AI_FORCE_SERVERSIDE_CODE] || ($rotation_dynamic_blocks == AI_DYNAMIC_BLOCKS_CLIENT_SIDE_SHOW || $rotation_dynamic_blocks == AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT) && $ai_wp_data [AI_WP_AMP_PAGE]) $rotation_dynamic_blocks = AI_DYNAMIC_BLOCKS_SERVER_SIDE;

        $groups_marker = "#<span data-ai-groups=\"([^\"]+?)\"></span>#";
        switch ($rotation_dynamic_blocks) {
          case AI_DYNAMIC_BLOCKS_SERVER_SIDE:

            if ($ai_wp_data [AI_FORCE_SERVERSIDE_CODE]) {
              // Code for preview
              if ($this->rotate_index >= count ($ads)) {
                $this->rotate_index = 0;
              }
              $this->code_version = $this->rotate_index + 1;
            }
            elseif ($shares) {
              $random_threshold = mt_rand (0, 100);
              foreach ($thresholds as $index => $threshold) {
                $this->code_version = $index + 1;
                if ($threshold < 0) continue;
                if ($random_threshold <= $threshold) break;
              }
            }
            elseif ($groups) {
              $this->code_version = 0;
              $processed_code = '';
              $this->version_name = '';

              if (count ($ai_wp_data [AI_ACTIVE_GROUP_NAMES]) != 0) {
                $this->check_code_empty = true;
                foreach ($ai_wp_data [AI_ACTIVE_GROUP_NAMES] as $group_name) {
                  foreach ($version_groups as $index => $version_group) {
                    if ($version_group == trim ($group_name)) {
                      $this->code_version = $index + 1;

                      if ($debug_processing) ai_log ('GROUP NAME FOUND: "' . trim ($group_name) . '"');

                      break 2;
                    }
                  }
                }

                if ($this->code_version == 0) {
                  if ($debug_processing) {
                    $this->no_insertion_text = 'GROUP NAMES NOT FOUND IN "' . $ai_wp_data [AI_ACTIVE_GROUP_NAMES] . '"';
                    ai_log ($this->no_insertion_text);
                  }
                  return '';
                }

                $this->check_code_empty = false;
              }
            }
            elseif ($scheduling) {
              $this->code_version = 0;
              foreach ($version_scheduling as $index => $scheduling_data) {
                if (check_scheduled_rotation ($scheduling_data)) {
                  $this->code_version = $index + 1;
                  break;
                }
              }
            }
            else {
              if ($unique) {
                $block_counter = isset ($ad_inserter_globals [AI_BLOCK_COUNTER_NAME . $this->number]) ? $ad_inserter_globals [AI_BLOCK_COUNTER_NAME . $this->number] : 0;

                $this->code_version = $ai_wp_data [AI_ROTATION_SEED] + $block_counter;
                if ($this->code_version > count ($ads)) $this->code_version -= count ($ads);
              }
              else $this->code_version = mt_rand (1, count ($ads));
            }

            if ($this->code_version != 0) {
              $processed_code = trim ($ads [$this->code_version - 1]);
              $this->version_name = $version_names [$this->code_version - 1];
            }

            if (preg_match ($groups_marker, $processed_code, $matches)) {
              $ai_wp_data [AI_ACTIVE_GROUP_NAMES] = json_decode (base64_decode ($matches [1]));
              $processed_code = preg_replace ($groups_marker, '', $processed_code);

              if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) ai_log ('GROUP NAMES SET: "' . implode (', ', $ai_wp_data [AI_ACTIVE_GROUP_NAMES]) . '"');

              if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0 && !$this->hide_debug_labels) {
                $debug_list = new ai_block_labels ('ai-debug-iframe');
                $processed_code = $debug_list->bar (__('ACTIVE GROUPS', 'ad-inserter') . ': ' . implode (', ', $ai_wp_data [AI_ACTIVE_GROUP_NAMES]), '', '') . $processed_code;
              }
            }

            if ($processed_code == '') {
              $additional_code = '';
            }

            break;

          case AI_DYNAMIC_BLOCKS_CLIENT_SIDE_SHOW:
          case AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT:
            $this->code_version = '""';

            $rotation_data = '';
            if ($shares) {
              $rotation_data = " data-shares='".base64_encode (json_encode ($thresholds))."'";
            }

            // Additional class to identify rotation code block in case of timed rotation
            $rotation_class = '';
            if ($groups) {
              $rotation_class = ' ai-rotation-groups ai-'.$this->number;
            }

            if ($times) {
              // Add block insertion counter fo rrotation id - block might be inserted more than once and each insertion has different starting option and time
              $block_counter = 0;
              if (isset ($ad_inserter_globals [AI_BLOCK_COUNTER_NAME . $this->number])) {
                $block_counter = $ad_inserter_globals [AI_BLOCK_COUNTER_NAME . $this->number];
              }

//              $rotation_class .= ' ai-'.$this->number;
              $rotation_class .= ' ai-'.$this->number.'-'.$block_counter;


//              $rotation_data .= " data-info='".base64_encode ('['.$this->number.','.count ($ads).']')."'";
              $rotation_data .= " data-info='".base64_encode ('["'.$this->number.'-'.$block_counter.'",'.count ($ads).']')."'";
            }

            if ($scheduling) {
              $rotation_class .= ' ai-rotation-scheduling';

              $gmt = get_option ('gmt_offset') * 3600 * 1000;

              $rotation_data .= " data-gmt='$gmt'";
            }

            $processed_code = '';
            if (($times || $scheduling) && !isset ($ai_wp_data [AI_CLIENT_SIDE_CSS])) {
              $processed_code = "\n<style>\n" . ai_get_client_side_styles () . "</style>";
            }

            if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_AJAX) {
              $block_id = 'ai-rotate-' . $this->number . '-' . rand (1000, 9999) . rand (1000, 9999);
              $rotation_class = ' ' . $block_id . $rotation_class;
            }

            if ($unique) {
              $rotation_class .= ' ai-unique';
              $block_counter = isset ($ad_inserter_globals [AI_BLOCK_COUNTER_NAME . $this->number]) ? $ad_inserter_globals [AI_BLOCK_COUNTER_NAME . $this->number] : 0;
              $rotation_data .= " data-counter='".$block_counter."'";
            }

            if (defined ('AI_NORMAL_HEADER_STYLES') && AI_NORMAL_HEADER_STYLES && !get_inline_styles ()) {
              $processed_code .= "\n<div class='ai-rotate ai-unprocessed{$rotation_class}'".$rotation_data.">\n";
            } else $processed_code .= "\n<div class='ai-rotate ai-unprocessed{$rotation_class}'".$rotation_data." style='position: relative;'>\n";

            foreach ($ads as $index => $ad) {

              // If AMP separator is present use only code for normal pages
              if (strpos ($ad, AD_AMP_SEPARATOR) !== false) {
                $codes = explode (AD_AMP_SEPARATOR, $ad);
                $ad = trim ($codes [0]);
              }

              if (strpos ($ad, AD_HEAD_SEPARATOR) !== false) {
                $head_body_code = explode (AD_HEAD_SEPARATOR, $ad );
                $ad  = trim ($head_body_code [1]);

                // Insert all HEAD codes for all options into <head> section
//                if ($ai_wp_data [AI_SHORTCODES]['head'][0]['group'] != '') {
                if ($this->shortcodes ['head'][0]['group'] != '') {
//                  $ai_wp_data [AI_HEAD_GROUPS][strtolower ($ai_wp_data [AI_SHORTCODES]['head'][0]['group'])] []= trim ($head_body_code [0]);
                  $ai_wp_data [AI_HEAD_GROUPS][strtolower ($this->shortcodes ['head'][0]['group'])] []= trim ($head_body_code [0]);
                } else $ai_wp_data [AI_HEAD_CODES] []= trim ($head_body_code [0]);
              }

              $ad = $this->ai_processViewportSeparators ($ad);
              $ad = $this->ai_processFallbackSeparator ($ad);

              if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0 && !$this->hide_debug_labels) {
                $debug_list = new ai_block_labels ('ai-debug-iframe');

                if (preg_match ($groups_marker, $ad, $matches)) {
                  $current_group_name = implode (', ', json_decode (base64_decode ($matches [1])));
                } else $current_group_name = '';

                $ad = preg_replace ("#(<span data-ai-groups=\"[^\"]+?\"></span>)#", '$1' . $debug_list->bar (__('ACTIVE GROUPS', 'ad-inserter') . ': ' . $current_group_name, '', ''), $ad);
              }

              $version_name_data  = ' data-name="'.base64_encode ($version_names [$index]).'"';
              $version_time_data  = $version_times [$index] >= 0 ? ' data-time="'.base64_encode ($version_times [$index]).'"' : '';
              $version_scheduling_data = $version_scheduling [$index] != - 1 ? ' data-scheduling="'.base64_encode ($version_scheduling [$index]).'"' : '';
              $version_group_data = $groups ? ' data-group="'.base64_encode ($version_groups [$index]).'"' : '';

              switch ($rotation_dynamic_blocks) {
                case AI_DYNAMIC_BLOCKS_CLIENT_SIDE_SHOW:
                  switch ($index) {
                    case 0:
                      if (defined ('AI_NORMAL_HEADER_STYLES') && AI_NORMAL_HEADER_STYLES && !get_inline_styles ()) {
                        $processed_code .= "<div class='ai-rotate-option ai-rotate-hidden'".$version_name_data.$version_time_data.$version_scheduling_data.$version_group_data.">\n".trim ($ad, "\n\r")."</div>\n";
                      } else
                        $processed_code .= "<div class='ai-rotate-option' style='visibility: hidden;'".$version_name_data.$version_time_data.$version_scheduling_data.$version_group_data.">\n".trim ($ad, "\n\r")."</div>\n";
                      break;
                    default:
                      if (defined ('AI_NORMAL_HEADER_STYLES') && AI_NORMAL_HEADER_STYLES && !get_inline_styles ()) {
                        $processed_code .= "<div class='ai-rotate-option ai-rotate-hidden ai-rotate-hidden-2'".$version_name_data.$version_time_data.$version_scheduling_data.$version_group_data.">\n".trim ($ad, "\n\r")."</div>\n";
                      } else
                        $processed_code .= "<div class='ai-rotate-option' style='visibility: hidden; position: absolute; top: 0; left: 0; width: 100%; height: 100%;'".$version_name_data.$version_time_data.$version_scheduling_data.$version_group_data.">\n".trim ($ad, "\n\r")."</div>\n";
                      break;
                  }
                  break;
                case AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT:
                  $version_code_data = ' data-code="'.base64_encode (ai_strip_js_markers ($ad)).'"';
                  $processed_code .= '<div class="ai-rotate-option"'.$version_name_data.$version_time_data.$version_scheduling_data.$version_group_data.$version_code_data.">\n</div>\n";
                  break;
              }

            }
            $processed_code .= "</div>\n";

            if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_AJAX && !$ai_wp_data [AI_CODE_FOR_IFRAME] && !get_disable_js_code ()) {
              $processed_code .= "<script>if (typeof ai_js_code == 'boolean') {var ai_block_div = jQuery ('.{$block_id}'); ai_process_rotation (ai_block_div); ai_block_div.removeClass ('{$block_id}');};</script>\n";
            }

            break;

          case AI_DYNAMIC_BLOCKS_SERVER_SIDE_W3TC:
            if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
              $this->w3tc_debug []= 'PROCESS ROTATE';
            }

            if ($groups) {
              $ad_index_code = ' global $ai_groups; $ai_index = 0; if (isset ($ai_groups) && count ($ai_groups) != 0) {foreach ($ai_groups as $group_name) {foreach (unserialize (base64_decode (\''.
                base64_encode (serialize ($version_groups)).'\')) as $index => $version_group) {if ($version_group == trim ($group_name)) {$ai_index = $index + 1; break 2;}}}}';
            }
            elseif ($shares) {
              $ad_index_code = ' $ai_random_threshold = mt_rand (0, 100); $ai_thresholds = unserialize (\''.
                                 serialize ($thresholds).'\'); foreach ($ai_thresholds as $ai_option_index => $ai_threshold) {$ai_index = $ai_option_index + 1; if ($ai_random_threshold <= $ai_threshold) break;}';
            }
            elseif ($scheduling) {
              $ad_index_code = ' $ai_index = 0; $ai_scheduling_data = unserialize (\''.
                                 serialize ($version_scheduling).'\'); foreach ($ai_scheduling_data as $ai_option_index => $ai_scheduling_data_item) {if (check_scheduled_rotation ($ai_scheduling_data_item)) {$ai_index = $ai_option_index + 1; break;}}';
            }
            elseif ($unique) {
              $ad_index_code  = ' if (!defined (\'AI_W3TC_ROTATION_SEED\')) define (\'AI_W3TC_ROTATION_SEED\', mt_rand (1, time ()) % '.count ($ads).');';
              $ad_index_code .= ' $ai_block_counter = '.(isset ($ad_inserter_globals [AI_BLOCK_COUNTER_NAME . $this->number]) ? $ad_inserter_globals [AI_BLOCK_COUNTER_NAME . $this->number] : 0).';';
              $ad_index_code .= ' $ai_index = AI_W3TC_ROTATION_SEED + $ai_block_counter; if ($ai_index > '.count ($ads).') $ai_index -= '.count ($ads).';';

              if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
                $ad_index_code .= 'ai_w3tc_log_run (\'PROCESS UNIQUE, SEED: \' . AI_W3TC_ROTATION_SEED . \', \' . $ai_block_counter);';
              }
            }

            else $ad_index_code = ' $ai_index = mt_rand (1, '.count ($ads).');';

            $this->w3tc_code .= '$ai_code = unserialize (base64_decode (\''.base64_encode (serialize ($ads)).'\'));'.$ad_index_code;

            if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
              $this->w3tc_code .= 'ai_w3tc_log_run (\'PROCESS ROTATE: \' . $ai_index);';
            }

            $this->w3tc_code .= ' if ($ai_index != 0) {$ai_dummy1 = $ai_dummy2 = null; $ai_code = ai_w3tc_execute_php ($ai_code [$ai_index - 1], $ai_dummy1, $ai_dummy2); $ai_enabled = true;} else {$ai_code = \'\'; $ai_enabled = false;}';

            $this->w3tc_code .= ' if ($ai_enabled) {$groups_marker = base64_decode (\'' . base64_encode ($groups_marker) .
                '\'); global $ai_groups; if (preg_match ($groups_marker, $ai_code, $matches)) {$ai_groups = json_decode (base64_decode ($matches [1])); $ai_code = preg_replace ($groups_marker, \'\', $ai_code);}}';

            $processed_code = $this->generate_html_from_w3tc_code ();
            break;
        }
      }

      // [ADINSERTER AMP]
      // [ADINSERTER HEAD]

      $this->labels->class = 'ai-debug-default'; // If previously inserted block with AMP separator (multiple CHECK insertions)
      $amp_head_dynamic_blocks = $dynamic_blocks;
          if ($ai_wp_data [AI_FORCE_SERVERSIDE_CODE])                                                     $amp_head_dynamic_blocks = AI_DYNAMIC_BLOCKS_SERVER_SIDE;
      elseif ($amp_head_dynamic_blocks == AI_DYNAMIC_BLOCKS_SERVER_SIDE_W3TC && $this->w3tc_code == '')   $amp_head_dynamic_blocks = AI_DYNAMIC_BLOCKS_SERVER_SIDE;
      elseif ($amp_head_dynamic_blocks == AI_DYNAMIC_BLOCKS_CLIENT_SIDE_SHOW)                             $amp_head_dynamic_blocks = AI_DYNAMIC_BLOCKS_SERVER_SIDE;
      elseif ($amp_head_dynamic_blocks == AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT)                           $amp_head_dynamic_blocks = AI_DYNAMIC_BLOCKS_SERVER_SIDE;

      switch ($amp_head_dynamic_blocks) {
        case AI_DYNAMIC_BLOCKS_SERVER_SIDE:
          if (strpos ($processed_code, AD_AMP_SEPARATOR) !== false) {
            $codes = explode (AD_AMP_SEPARATOR, $processed_code);
            $code_index = $ai_wp_data [AI_WP_AMP_PAGE] ? 1 : 0;
            $this->labels->class = $code_index ? 'ai-debug-amp' : 'ai-debug-default';
            if ($code_index == 1) {
              ai_log ('BLOCK ' . $this->number . ' AMP CODE USED');
            }
            $processed_code = trim ($codes [$code_index]);

            if ($this->empty_code ($processed_code)) {
              ai_log ('AMP SEPARATOR ' . ($ai_wp_data [AI_WP_AMP_PAGE] ? '[AMP]' : '[NORMAL]') . ': EMPTY CODE FOR BLOCK ' . $this->number);

              $this->code_empty = true;
            }
          } else {
              // AMP page but No AMP separator - don't insert code unless enabled
              if ($ai_wp_data [AI_WP_AMP_PAGE]) {
                if (!$this->get_enable_amp ()) {
                  $processed_code = '';
                  $additional_code = '';
                  $this->hide_debug_labels = true;
                  ai_log ('BLOCK ' . $this->number . ' NOT ENABLED FOR AMP PAGES - EMPTY CODE');
                }
              }
            }

          if (strpos ($processed_code, AD_HEAD_SEPARATOR) !== false) {
            ai_log ('BLOCK ' . $this->number . ' HEAD CODE');
            $head_body_code = explode (AD_HEAD_SEPARATOR, $processed_code);
            $processed_code = trim ($head_body_code [1]);

//            $once = isset ($ai_wp_data [AI_SHORTCODES]['head'][0]['head']) && strtolower ($ai_wp_data [AI_SHORTCODES]['head'][0]['head']) == 'once';
            $once = isset ($this->shortcodes ['head'][0]['head']) && strtolower ($this->shortcodes ['head'][0]['head']) == 'once';

            if (!$once || !$this->head_code_written) {
//              if ($ai_wp_data [AI_SHORTCODES]['head'][0]['group'] != '') {
              if ($this->shortcodes ['head'][0]['group'] != '') {
//                $ai_wp_data [AI_HEAD_GROUPS][strtolower ($ai_wp_data [AI_SHORTCODES]['head'][0]['group'])] []= trim ($head_body_code [0], "\n\r");
                $ai_wp_data [AI_HEAD_GROUPS][strtolower ($this->shortcodes ['head'][0]['group'])] []= trim ($head_body_code [0], "\n\r");
              } else $ai_wp_data [AI_HEAD_CODES] []= trim ($head_body_code [0]);
              $this->head_code_written = true;
            }
          }

//          $processed_code = $additional_code . $processed_code;

          break;
        case AI_DYNAMIC_BLOCKS_SERVER_SIDE_W3TC:
          if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
            $this->w3tc_debug []= 'PROCESS AMP, HEAD';
          }

          if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0 && !$this->hide_debug_labels) {
            $this->labels->class = $ai_wp_data [AI_WP_AMP_PAGE] ? 'ai-debug-amp' : 'ai-debug-default';
          }

          $this->w3tc_code .= '$ai_amp_separator = base64_decode (\'' . base64_encode (AD_AMP_SEPARATOR) . '\'); $ai_amp_page = ' . ($ai_wp_data [AI_WP_AMP_PAGE] ? 'true' : 'false') . '; $ai_amp_enabled = ' . $this->get_enable_amp () . ';';

          $this->w3tc_code .= '$ai_dummy1 = $ai_dummy2 = null; $ai_code = ai_w3tc_execute_php ($ai_code, $ai_dummy1, $ai_dummy2);';

          // Fix to prevent converting && into &amp;&amp; on AMP pages
  //        $this->w3tc_code .= 'if (strpos ($ai_code, $ai_amp_separator) !== false) {$codes = explode ($ai_amp_separator, $ai_code); $ai_code = trim ($codes [$ai_amp_page ? 1 : 0]); } else {if ($ai_amp_page && !$ai_amp_enabled) $ai_code = \'\';} $ai_enabled = true;';
          $this->w3tc_code .= 'if (strpos ($ai_code, $ai_amp_separator) !== false) {$codes = explode ($ai_amp_separator, $ai_code); $ai_code = trim ($codes [$ai_amp_page ? 1 : 0]); } else {if ($ai_amp_page + !$ai_amp_enabled == 2) $ai_code = \'\';} $ai_enabled = true;';

          if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
            $this->w3tc_code .= ' ai_w3tc_log_run (\'PROCESS AMP: \' . ($ai_amp_page ? \'AMP PAGE\' : \'NORMAL PAGE\'));';
          }

          // Process HEAD separator
          $this->w3tc_code .= '$ai_head_separator = base64_decode (\'' . base64_encode (AD_HEAD_SEPARATOR) . '\');';

          if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
            $this->w3tc_code .= ' ai_w3tc_log_run (\'PROCESS HEAD: \' . (strpos ($ai_code, $ai_head_separator) !== false ? \'CODE\' : \'-\'));';
          }

          $this->w3tc_code .= 'if (strpos ($ai_code, $ai_head_separator) !== false) {$codes = explode ($ai_head_separator, $ai_code); $ai_code = trim ($codes [1]);} $ai_enabled = true;';

          $processed_code = $this->generate_html_from_w3tc_code ();
          break;
      }


      // [ADINSERTER VIEWPORT]

      if ($this->w3tc_code != '') {
//        if (isset ($ai_wp_data [AI_SHORTCODES]['viewport'])) {
        if (isset ($this->shortcodes ['viewport'])) {
          if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
            $this->w3tc_debug []= 'PROCESS VIEWPORT SEPARATORS';
          }

//          $this->w3tc_code .= 'if ($ai_enabled) $ai_code = ai_process_viewport_separators ($ai_code, unserialize (base64_decode (\''.base64_encode (serialize ($ai_wp_data [AI_SHORTCODES]['viewport'])).'\')));';
          $this->w3tc_code .= 'if ($ai_enabled) $ai_code = ai_process_viewport_separators ($ai_code, unserialize (base64_decode (\''.base64_encode (serialize ($this->shortcodes)).'\')));';

          $processed_code = $this->generate_html_from_w3tc_code ();
        }
      } else $processed_code = $this->ai_processViewportSeparators ($processed_code);



      // [ADINSERTER FALLBACK]

      if ($this->w3tc_code != '') {
        if (isset ($this->shortcodes ['fallback'])) {
          if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
            $this->w3tc_debug []= 'PROCESS FALLBACK SEPARATOR';
          }

          $this->w3tc_code .= 'if ($ai_enabled) $ai_code = ai_process_fallback_separator ($ai_code, unserialize (base64_decode (\''.base64_encode (serialize ($this->shortcodes)).'\')));';

          $processed_code = $this->generate_html_from_w3tc_code ();
        }
      } else $processed_code = $this->ai_processFallbackSeparator ($processed_code);
    }


    if ($this->check_block) {
      $this->check_block_additional_code = $additional_code;
      $additional_code = '';
    }


    // Additional code (Ad label, close button, parallax backgrounds)
    if ($dynamic_blocks == AI_DYNAMIC_BLOCKS_SERVER_SIDE_W3TC && $this->w3tc_code != '' && !defined ('AI_NO_W3TC') && $additional_code != '') {
      if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
        $this->w3tc_debug []= 'PROCESS ADDITIONAL CODE';
      }

      $this->w3tc_code .= 'if ($ai_code != \'\') $ai_code = base64_decode (\''.base64_encode ($additional_code).'\') . $ai_code;';

      $processed_code = $this->generate_html_from_w3tc_code ();
    } else $processed_code = $additional_code . $processed_code;


    if (!$ai_wp_data [AI_CODE_FOR_IFRAME] && !$ai_wp_data [AI_FORCE_SERVERSIDE_CODE]) {

      // PROTECTED
      if (function_exists ('ai_process_protected_code')) $processed_code = ai_process_protected_code ($this, $processed_code);

      // LAZY LOADING
      if ($this->get_lazy_loading () && !$ai_wp_data [AI_WP_AMP_PAGE]) {

        if ($this->w3tc_code != '') {
          if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
            $this->w3tc_debug []= 'PROCESS LAZY LOADING';
          }
        }

        $lazy_code = $this->base64_encode_w3tc ($processed_code);
        $wrapper_class = base64_encode (get_block_class_name (true));
        $processed_code = '<div class="ai-lazy" data-code="'.$lazy_code.'" data-class="'.$wrapper_class.'"></div>'."\n";

        // Recreate W3TC code
        if ($this->w3tc_code != '') {
          $processed_code = $this->regenerate_w3tc_code ($processed_code);
        }
      }

      // MANUAL LOADING ENABLED
      if ($this->get_manual_loading () == AI_MANUAL_LOADING_ENABLED && !$ai_wp_data [AI_WP_AMP_PAGE]) {

        if ($this->w3tc_code != '') {
          if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
            $this->w3tc_debug []= 'PROCESS MANUAL LOADING ALWAYS';
          }
        }

        $manual_code = $this->base64_encode_w3tc ($processed_code);
        $wrapper_class = base64_encode (get_block_class_name (true));
        $processed_code = '<div class="ai-manual ai-manual-' . $this->number . '" data-code="'.$manual_code.'" data-class="'.$wrapper_class.'"></div>'."\n";

        // Recreate W3TC code
        if ($this->w3tc_code != '') {
          $processed_code = $this->regenerate_w3tc_code ($processed_code);
        }
      }
    }

    if ($not_iframe_or_inside) {

      if (function_exists ('ai_adb_check') && !$ai_wp_data [AI_FORCE_SERVERSIDE_CODE] && $not_iframe_or_inside) $processed_code = ai_adb_check ($this, $processed_code);

      // Reset if multiple block insertions
      $this->client_side_list_detection = false;

      $lists_dynamic_blocks = $dynamic_blocks;       // replace with $this->server_side_check
      if ($ai_wp_data [AI_FORCE_SERVERSIDE_CODE] || ($lists_dynamic_blocks == AI_DYNAMIC_BLOCKS_CLIENT_SIDE_SHOW || $lists_dynamic_blocks == AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT) && $ai_wp_data [AI_WP_AMP_PAGE]) $lists_dynamic_blocks = AI_DYNAMIC_BLOCKS_SERVER_SIDE;

      // LISTS, COOKIE, SCHEDULING
      if ($lists_dynamic_blocks != AI_DYNAMIC_BLOCKS_SERVER_SIDE) {
        // Url parameters, cookies, referrers, clients
        do {
          $scheduling_start_time      = '';
          $scheduling_end_time        = '';
          $scheduling_days_in_week    = '';
          $scheduling_type            = null;
          $scheduling_fallback_block  = 0;

          $check_again = false;
          if (isset ($this->check_url_parameters) || isset ($this->check_cookies) || isset ($this->check_referers) || isset ($this->check_clients) || isset ($this->check_scheduling_start_time)) {

            $url_parameters_raw = '';
            $url_parameter_list_type = '';
            $cookies_raw = '';
            $cookie_list_type = '';
            $referers_raw = '';
            $referer_list_type = '';
            $clients_raw = '';
            $client_list_type = '';

            if (isset ($this->check_url_parameters)) {
              $url_parameters_raw = trim ($this->check_url_parameters);
              $url_parameter_list_type = $this->check_url_parameter_list_type;
            }

            if (isset ($this->check_cookies)) {
              $cookies_raw = trim ($this->check_cookies);
              $cookie_list_type = $this->check_cookie_list_type;
            }

            if (isset ($this->check_referers)) {
              $referers_raw = trim (str_replace (' ', '', strtolower ($this->check_referers)));
              $referer_list_type = $this->check_referers_list_type;
            }

            if (isset ($this->check_clients)) {
//              $clients_raw = trim (str_replace (' ', '', strtolower ($this->check_clients)));
              $clients_raw = trim ($this->check_clients);
              $client_list_type = $this->check_clients_list_type;
            }

            if (isset ($this->check_scheduling_start_time)) {
              $scheduling_start_time_raw    = trim ($this->check_scheduling_start_time);
              $scheduling_start_time        = base64_encode ($scheduling_start_time_raw);
              $scheduling_end_time_raw      = trim ($this->check_scheduling_end_time);
              $scheduling_end_time          = base64_encode ($scheduling_end_time_raw);
              $scheduling_days_in_week_raw  = $this->check_scheduling_days_in_week;
              $scheduling_days_in_week      = base64_encode ($scheduling_days_in_week_raw);
              $scheduling_type              = $this->check_scheduling_type;
              $scheduling_fallback_block    = $this->check_scheduling_fallback_block;
            }

            unset ($this->check_url_parameters);
            unset ($this->check_url_parameter_list_type);
            unset ($this->check_cookies);
            unset ($this->check_cookie_list_type);
            unset ($this->check_referers);
            unset ($this->check_referers_list_type);
            unset ($this->check_clients);
            unset ($this->check_clients_list_type);
            unset ($this->check_scheduling_start_time);
            unset ($this->check_scheduling_end_time);
            unset ($this->check_scheduling_days_in_week);
            unset ($this->check_scheduling_type);
            unset ($this->check_scheduling_fallback_block);

            $check_again = true;
          } else {
              $url_parameters_raw = trim ($this->get_url_parameter_list ());
              $url_parameter_list_type = $this->get_url_parameter_list_type ();

              $cookies_raw = trim ($this->get_cookie_list ());
              $cookie_list_type = $this->get_cookie_list_type ();

              $referers_raw = trim (str_replace (' ', '', strtolower ($this->get_ad_domain_list ())));
              $referer_list_type = $this->get_ad_domain_list_type ();

//              $clients_raw = trim (str_replace (' ', '', strtolower ($this->get_client_list ())));
              $clients_raw = trim ($this->get_client_list ());
              $client_list_type = $this->get_client_list_type ();

              switch ($this->get_scheduling ()) {
                case AI_SCHEDULING_BETWEEN_DATES:
                case AI_SCHEDULING_OUTSIDE_DATES:
                  $scheduling_start_time_raw    = trim ($this->get_schedule_start_date () . ' ' . $this->get_schedule_start_time ());
                  $scheduling_start_time        = base64_encode ($scheduling_start_time_raw);
                  $scheduling_end_time_raw      = trim ($this->get_schedule_end_date ()   . ' ' . $this->get_schedule_end_time ());
                  $scheduling_end_time          = base64_encode ($scheduling_end_time_raw);
                  $scheduling_days_in_week_raw  = $this->get_schedule_weekdays ();
                  $scheduling_days_in_week      = base64_encode ($scheduling_days_in_week_raw);
                  $scheduling_type              = $this->get_scheduling();
                  $scheduling_fallback_block    = intval ($this->get_scheduling_fallback());
                  break;
              }
            }

          $url_parameters = base64_encode (html_entity_decode ($url_parameters_raw));
          $cookies        = base64_encode (html_entity_decode ($cookies_raw));
          $referers       = base64_encode ($referers_raw);
          $clients        = base64_encode (html_entity_decode ($clients_raw));

          if (($this->client_side_cookie_check && $url_parameters != '') || ($this->client_side_cookie_check && $cookies != '') || $referers != '' || $clients != '' || $scheduling_type !== null) {
            switch ($dynamic_blocks) {
              case AI_DYNAMIC_BLOCKS_CLIENT_SIDE_SHOW:
              case AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT:
                if ($url_parameter_list_type == AI_BLACK_LIST) $url_parameter_list_type = 'B'; else $url_parameter_list_type = 'W';
                if ($cookie_list_type        == AI_BLACK_LIST) $cookie_list_type        = 'B'; else $cookie_list_type        = 'W';
                if ($referer_list_type       == AI_BLACK_LIST) $referer_list_type       = 'B'; else $referer_list_type       = 'W';
                if ($client_list_type        == AI_BLACK_LIST) $client_list_type        = 'B'; else $client_list_type        = 'W';
                if ($scheduling_type == AI_SCHEDULING_OUTSIDE_DATES) {
                  $scheduling_type_code = 'B';
                  $scheduling_type_text = 'OUT';
                } else {
                    $scheduling_type_code   = 'W';
                    $scheduling_type_text   = 'IN';
                  }
                $gmt = get_option ('gmt_offset') * 3600 * 1000;

                $fallback_code = '';
                $fallback_code_data = '';
                $fallback_block_data = 0;
                $fallback_level = '';
                $fallback_tracking_data = '';
                if ($scheduling_type !== null) {
                  $fallback_block = $scheduling_fallback_block;

                  if ($fallback_block != $this->number && $fallback_block >= 1 && $fallback_block <= 96) {

                    $globals_name = AI_FALLBACK_DEPTH_NAME;
                    if (!isset ($ad_inserter_globals [$globals_name])) {
                      $ad_inserter_globals [$globals_name] = 0;
                    }

                    if ($ad_inserter_globals [$globals_name] < 3) {
                      $ad_inserter_globals [$globals_name] ++;

                      $fallback_level = $ad_inserter_globals [$globals_name];

                      $fallback_block_data = $fallback_block;
                      $fallback_obj = $block_object [$fallback_block];
                      $fallback_code = $fallback_obj->ai_getProcessedCode ();
                      $fallback_code_data = " data-fallback-code='" . base64_encode ($fallback_code) . "'";

                      $fallback_tracking_block = $fallback_obj->get_tracking () ? $fallback_obj->number : 0;
                      $fallback_tracking_data = base64_encode ("[{$fallback_tracking_block},{$fallback_obj->code_version},\"{$fallback_obj->get_ad_name ()}\",\"{$fallback_obj->version_name}\"]");

                      $ad_inserter_globals [$globals_name] --;
                    }

                  }
                }

                if ($this->client_side_cookie_check && $url_parameters != '') $url_parameter_attributes  = " parameter-list='$url_parameters' parameter-list-type='$url_parameter_list_type'"; else $url_parameter_attributes = '';
                if ($this->client_side_cookie_check && $cookies        != '') $cookie_attributes         = " cookie-list='$cookies' cookie-list-type='$cookie_list_type'";                     else $cookie_attributes = '';
                if (                                   $referers       != '') $referer_attributes        = " referer-list='$referers' referer-list-type='$referer_list_type'";                 else $referer_attributes       = '';
                if (                                   $clients        != '') $client_attributes         = " client-list='$clients' client-list-type='$client_list_type'";                     else $client_attributes        = '';
                if ($scheduling_type !== null                               ) $scheduling_attributes     = " scheduling-start='$scheduling_start_time' scheduling-end='$scheduling_end_time' scheduling-days='$scheduling_days_in_week' scheduling-type='$scheduling_type_code' gmt='$gmt' scheduling-fallback='$fallback_block_data' fallback_level='$fallback_level' fallback-tracking='$fallback_tracking_data'"; else $scheduling_attributes = '';


                // Deprecated
                $this->client_side_list_detection = true;

                // ??? If $ai_wp_data [AI_WP_AMP_PAGE] is set it will not get here
                if ($ai_wp_data [AI_WP_AMP_PAGE]) $this->needs_class = true;

                // Hide block only when no block height is defined - for check options don't hide the first one
                if (trim ($this->get_block_height ()) == '' || isset ($this->check_codes) && $this->check_codes_index != 0) {
                  $this->wrapping_div_classes []= 'ai-list-block';
                }


                if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0 && !$this->hide_debug_labels) {
                  $debug_id = 'ai-debug-info-' . $this->number . '-' . rand (1000, 9999) . rand (1000, 9999);
                  $debug_id_data = " data-debug-info='$debug_id'";
                } else $debug_id_data = '';

                switch ($dynamic_blocks) {
                  case AI_DYNAMIC_BLOCKS_CLIENT_SIDE_SHOW:
                    if (($url_parameter_attributes != '' || $cookie_attributes != '') && $this->get_manual_loading () == AI_MANUAL_LOADING_AUTO) {
                      $list_class = ' ai-list-manual';
                    } else $list_class = '';

                    $processed_code = "\n<div class='ai-dynamic{$list_class} ai-list-data'{$referer_attributes}{$client_attributes}{$url_parameter_attributes}{$cookie_attributes}{$scheduling_attributes}{$debug_id_data}>{$processed_code}</div>\n";

                    if ($scheduling_type !== null) {
                      $processed_code .= "<div class='ai-fallback'>{$fallback_code}</div>\n";
                    }
                    break;
                  case AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT:
                    $code_data = " data-code='".base64_encode ($processed_code)."'";

                    if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_AJAX && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
                      $block_id = 'ai-list-' . $this->number . '-' . rand (1000, 9999) . rand (1000, 9999);
                      $list_class = ' ' . $block_id ;
                    } else $list_class = '';

                    if (($url_parameter_attributes != '' || $cookie_attributes != '') && $this->get_manual_loading () == AI_MANUAL_LOADING_AUTO) {
                      $list_class .= ' ai-list-manual';
                    }

                    $processed_code = "\n<div class='ai-dynamic{$list_class} ai-list-data'{$referer_attributes}{$client_attributes}{$url_parameter_attributes}{$cookie_attributes}{$scheduling_attributes}{$debug_id_data}{$code_data}{$fallback_code_data}></div>\n";

                    if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_AJAX && !$ai_wp_data [AI_CODE_FOR_IFRAME] && !get_disable_js_code ()) {
                      $processed_code .= "<script>if (typeof ai_js_code == 'boolean') {var ai_block_div = jQuery ('.{$block_id}'); ai_process_lists (ai_block_div); ai_block_div.removeClass ('{$block_id}');};</script>\n";
                    }

                    break;
                }

                if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0 && !$this->hide_debug_labels) {
                  if ($scheduling_type !== null) {
                    $scheduling_attributes_dbg = sprintf (__ ("start='%s' end='%s' days='%s' type='%s'", 'ad-inserter'), $scheduling_start_time_raw, $scheduling_end_time_raw, $scheduling_days_in_week_raw, $scheduling_type_text);

                    $debug_scheduling = new ai_block_labels ('ai-debug-scheduling');
                    $debug_processed_code = $debug_scheduling->bar ($scheduling_attributes_dbg, 'OUT = ' . AI_TEXT_INSERT_OUTSIDE_DATES .', IN = ' . AI_TEXT_INSERT_BETWEEN_DATES, '<kbd class="ai-debug-name ai-scheduling-status"></kbd>', '<kbd class="ai-debug-name ai-scheduling-info"></kbd>');

                    $processed_code = $debug_processed_code . $processed_code;
                  }

                  if ($this->client_side_cookie_check && ($url_parameters != '')) $url_parameter_attributes_dbg  = sprintf (__ ("parameters='%s' type='%s'", 'ad-inserter'), $url_parameters_raw, $url_parameter_list_type); else $url_parameter_attributes_dbg = '';

                  if ($this->client_side_cookie_check && ($cookies != ''))        $cookie_attributes_dbg         = sprintf (__ ("cookies='%s' type='%s'", 'ad-inserter'), $cookies_raw, $cookie_list_type); else $cookie_attributes_dbg = '';
                                                                                                                            // translators: %s: list parameters and type
                  if (                                    $referers       != '')  $referer_attributes_dbg        = sprintf (__ ("referers='%s' type='%s'", 'ad-inserter'), $referers_raw, $referer_list_type); else $referer_attributes_dbg       = '';
                                                                                                                            // translators: %s: list parameters and type
                  if (                                    $clients        != '')  $client_attributes_dbg         = sprintf (__ ("clients='%s' type='%s'", 'ad-inserter'), $clients_raw, $client_list_type); else $client_attributes_dbg       = '';

                  if ($url_parameter_attributes_dbg != '' || $cookie_attributes_dbg != '' || $referer_attributes_dbg != '' || $client_attributes_dbg) {
                    $debug_list = new ai_block_labels ('ai-debug-lists');
                    $debug_processed_code = $debug_list->bar ($url_parameter_attributes_dbg . ' ' . $cookie_attributes_dbg . ' ' . $referer_attributes_dbg . ' ' . $client_attributes_dbg, 'B = ' . AI_TEXT_BLACK_LIST .', W = ' . AI_TEXT_WHITE_LIST, '<kbd class="ai-debug-name ai-list-status"></kbd>', '<kbd class="ai-debug-name ai-list-info"></kbd>');

                    $processed_code = $debug_processed_code . $processed_code;
                  }

                  if ($url_parameter_attributes_dbg != '' && ($this->get_manual_loading () == AI_MANUAL_LOADING_AUTO || strpos ($url_parameters_raw, 'tcf-') !== false || strpos ($url_parameters_raw, 'euconsent-v2') !== false) ||
                      $cookie_attributes_dbg != ''        && ($this->get_manual_loading () == AI_MANUAL_LOADING_AUTO || strpos ($cookies_raw,        'tcf-') !== false || strpos ($cookies_raw,        'euconsent-v2') !== false)) {
                    $debug_manual_loading = new ai_block_labels ('ai-debug-lists');

                    $version_name = $this->version_name == '' ? '' : ' - ' . $this->version_name;
                    $block_name = $this->number . ' &nbsp; ' . $this->get_ad_name () . '<kbd data-separator=" - " class="ai-option-name">' . $version_name . '</kbd>';

                    $status = $this->get_manual_loading () == AI_MANUAL_LOADING_AUTO ? 'MANUAL LOADING' : 'NOT ENABLED';
                    // Debugging label before the hidden block in case manual loading is set to Auto and the block has not been enabled yet
                    $this->additional_code_before_block = $debug_manual_loading->bar ($block_name, '', 'NOT LOADED', $status, '', $debug_id);
                  }
                }

                break;
              case AI_DYNAMIC_BLOCKS_SERVER_SIDE_W3TC:
                if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
                  $this->w3tc_debug []= 'PROCESS LISTS';
                }

                $this->generate_w3tc_code_from_html ($processed_code);

                if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
                  $this->w3tc_code .= ' ai_w3tc_log_run (\'PROCESS LISTS\' . ($ai_enabled ? \'\' : \', NOT ENABLED\'));';
                }

                if ($referers != '') {
                  if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
                    $this->w3tc_code .= ' if ($ai_enabled) ai_w3tc_log_run (\'  REFERRERS: \\\'\' . base64_decode (\'' . $referers . '\').\'\\\' ' . ($referer_list_type == AI_WHITE_LIST ? 'W':'B'). '\');';
                    $w3tc_status = ' if (!$ai_enabled) ai_w3tc_log_run (\'  FAILED\', \'color: red;\');';
                  } else $w3tc_status = '';

                  $this->w3tc_code .= ' if ($ai_enabled) {$ai_enabled = check_referer_list (base64_decode (\''.$referers.'\'), '.($referer_list_type == AI_WHITE_LIST ? 'true':'false').');'.$w3tc_status.'};';
                }

                if ($clients != '') {
                  if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
                    $this->w3tc_code .= ' if ($ai_enabled) ai_w3tc_log_run (\'  CLIENTS: \\\'\' . base64_decode (\'' . $clients . '\').\'\\\' ' . ($client_list_type == AI_WHITE_LIST ? 'W':'B'). '\');';
                    $w3tc_status = ' if (!$ai_enabled) ai_w3tc_log_run (\'  FAILED\', \'color: red;\');';
                  } else $w3tc_status = '';

                  $this->w3tc_code .= ' if ($ai_enabled) {$ai_enabled = check_client_list (base64_decode (\''.$clients.'\'), '.($client_list_type == AI_WHITE_LIST ? 'true':'false').');'.$w3tc_status.'};';
                }

                if ($this->client_side_cookie_check) {
                  if ($url_parameters != '') {
                    if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
                      $this->w3tc_code .= ' if ($ai_enabled) ai_w3tc_log_run (\'  URL PARAMETERS: \\\'\' . base64_decode (\'' . $url_parameters . '\').\'\\\' ' . ($url_parameter_list_type == AI_WHITE_LIST ? 'W':'B'). '\');';
                      $w3tc_status = ' if (!$ai_enabled) ai_w3tc_log_run ("  FAILED", "color: red;");';
                    } else $w3tc_status = '';

                    $this->w3tc_code .= ' if ($ai_enabled) {$ai_enabled = check_cookie_list (base64_decode (\''.$url_parameters.'\'), '.($url_parameter_list_type == AI_WHITE_LIST ? 'true':'false').');'.$w3tc_status.'};';
                  }

                  if ($cookies != '') {
                    if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
                      $this->w3tc_code .= ' if ($ai_enabled) ai_w3tc_log_run (\'  COOKIES: \\\'\' . base64_decode (\'' . $cookies . '\').\'\\\' ' . ($cookie_list_type == AI_WHITE_LIST ? 'W':'B'). '\');';
                      $w3tc_status = ' if (!$ai_enabled) ai_w3tc_log_run ("  FAILED", "color: red;");';
                    } else $w3tc_status = '';

                    $this->w3tc_code .= ' if ($ai_enabled) {$ai_enabled = check_cookie_list (base64_decode (\''.$cookies.'\'), '.($cookie_list_type == AI_WHITE_LIST ? 'true':'false').');'.$w3tc_status.'};';
                  }
                }

                if ($scheduling_type !== null) {
                  if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
                    $this->w3tc_code .= ' if ($ai_enabled) ai_w3tc_log_run (\'  SCHEDULING: \' . base64_decode (\'' . $scheduling_start_time . '\') . \', \' . base64_decode (\'' . $scheduling_end_time . '\'). \' [\' . base64_decode (\'' . $scheduling_days_in_week . '\') . \'] ' . ($scheduling_type == AI_SCHEDULING_BETWEEN_DATES ? 'IN':'OUT'). '\');';
                    $w3tc_status = ' if (!$ai_enabled) ai_w3tc_log_run (\'  FAILED\', \'color: red;\');';
                  } else $w3tc_status = '';

                  $fallback_block = intval ($this->get_scheduling_fallback());
                  if ($fallback_block != $this->number && $fallback_block >= 1 && $fallback_block <= 96) {
                    $fallback_obj = $block_object [$fallback_block];
                    $fallback_obj->hide_debug_labels = true;
                    $fallback_block_code = base64_encode ($fallback_obj->ai_getProcessedCode ()); // Encode HTML + W3TC PHP
                    $fallback_obj->hide_debug_labels = false;

                    if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
                      $w3tc_fallback_status = ' ai_w3tc_log_run (\'  FALLBACK BLOCK: ' . $fallback_block . '\');';

                      array_unshift ($fallback_obj->w3tc_debug,  'FALLBACK BLOCK ' . $fallback_block);
                      $fallback_obj->w3tc_debug []= 'FALLBACK BLOCK END';

                      $this->w3tc_debug = array_merge ($this->w3tc_debug, $fallback_obj->w3tc_debug);
                    } else $w3tc_fallback_status = '';



                    if ($fallback_obj->get_tracking ()) {
                     $fallback_tracking_block = $fallback_block;
                    } else $fallback_tracking_block = '0';

                    $fallback_code = ' if (!$ai_enabled) {'.$w3tc_fallback_status.' $ai_enabled = true; if (!isset ($ai_index)) $ai_index = 0; $ai_fallback = '.$fallback_tracking_block.'; $ai_code = ai_w3tc_execute_php (base64_decode (\''. $fallback_block_code . '\'), $ai_index, $ai_fallback);}';
                  } else $fallback_code = '';

                  $this->w3tc_code .= ' if ($ai_enabled) {$ai_enabled = check_scheduling_time (base64_decode (\''. $scheduling_start_time.'\'), base64_decode (\''.$scheduling_end_time.'\'), base64_decode (\''.$scheduling_days_in_week.'\'), '.($scheduling_type == AI_SCHEDULING_BETWEEN_DATES ? 'true':'false').');' . $w3tc_status . $fallback_code . '};';
                }

                $processed_code = $this->generate_html_from_w3tc_code ();
                break;
            }
          }
        } while ($check_again);

        // Countries, IP addresses
        do {
          $check_again = false;
          if (isset ($this->check_countries) || isset ($this->check_ip_addresses)) {
            $countries = '';
            $country_list_type = '';
            $ip_addresses = '';
            $ip_address_list_type = '';

            if (isset ($this->check_countries)) {
              $countries = trim (strtoupper ($this->check_countries));
              $country_list_type = $this->check_countries_list_type;
            }

            if (isset ($this->check_ip_addresses)) {
              $ip_addresses = trim (str_replace (' ', '', strtolower ($this->check_ip_addresses)));
              $ip_address_list_type = $this->check_ip_addresses_list_type;
            }

            unset ($this->check_countries);
            unset ($this->check_countries_list_type);
            unset ($this->check_ip_addresses);
            unset ($this->check_ip_addresses_list_type);

            $check_again = true;
          } else {
              $countries = trim (strtoupper ($this->get_ad_country_list (true)));
              $country_list_type = $this->get_ad_country_list_type ();

              $ip_addresses = trim (str_replace (' ', '', strtolower ($this->get_ad_ip_address_list ())));
              $ip_address_list_type = $this->get_ad_ip_address_list_type ();
            }

//        $countries = trim (strtoupper (isset ($this->check_countries) ? $this->check_countries : $this->get_ad_country_list (true)));
//        $country_list_type = isset ($this->check_countries_list_type) ? $this->check_countries_list_type : $this->get_ad_country_list_type ();

//        $ip_addresses = trim (str_replace (' ', '', strtolower (isset ($this->check_ip_addresses) ? $this->check_ip_addresses : $this->get_ad_ip_address_list ())));
//        $ip_address_list_type = isset ($this->check_ip_addresses_list_type) ? $this->check_ip_addresses_list_type : $this->get_ad_ip_address_list_type ();

          if ($countries != '' || $ip_addresses != '') {
            switch ($dynamic_blocks) {
              case AI_DYNAMIC_BLOCKS_CLIENT_SIDE_SHOW:
              case AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT:
                if ($country_list_type    == AI_BLACK_LIST) $country_list_type    = 'B'; else $country_list_type = 'W';
                if ($ip_address_list_type == AI_BLACK_LIST) $ip_address_list_type = 'B'; else $ip_address_list_type = 'W';

                if ($countries    != '')  $country_attributes     = "countries='$countries' country-list='$country_list_type'";             else $country_attributes    = '';
                if ($ip_addresses != '')  $ip_address_attributes  = "ip-addresses='$ip_addresses' ip-address-list='$ip_address_list_type'"; else $ip_address_attributes = '';

                // Deprecated
                $this->client_side_list_detection = true;

                // ??? If $ai_wp_data [AI_WP_AMP_PAGE] is set it will not get here
                if ($ai_wp_data [AI_WP_AMP_PAGE]) $this->needs_class = true;

                // Hide block only when no block height is defined - for check options don't hide the first one
                if (trim ($this->get_block_height ()) == '' || isset ($this->check_codes) && $this->check_codes_index != 0) {
                  $this->wrapping_div_classes []= 'ai-list-block-ip';
                }

                switch ($dynamic_blocks) {
                  case AI_DYNAMIC_BLOCKS_CLIENT_SIDE_SHOW:
                    $processed_code = "\n<div class='ai-dynamic ai-ip-data' $ip_address_attributes $country_attributes>$processed_code</div>\n";
                    break;
                  case AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT:
                    $code_data = "data-code='".base64_encode ($processed_code)."'";

                    if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_AJAX && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
                      $block_id = 'ai-ip-' . $this->number . '-' . rand (1000, 9999) . rand (1000, 9999);
                      $ip_class = ' ' . $block_id ;
                    } else $ip_class = '';

                    $processed_code = "\n<div class='ai-dynamic{$ip_class} ai-ip-data' $ip_address_attributes $country_attributes $code_data></div>\n";

                    if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_AJAX && !$ai_wp_data [AI_CODE_FOR_IFRAME] && function_exists ('add_footer_inline_scripts_2') && !get_disable_js_code ()) {
                      $processed_code .= "<script>if (typeof ai_js_code == 'boolean') {var ai_block_div = jQuery ('.{$block_id}'); ai_process_ip_addresses (ai_block_div); ai_block_div.removeClass ('{$block_id}');};</script>\n";
                    }
                    break;
                }

                if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0 && !$this->hide_debug_labels) {

                                                                                    // translators: %s: list parameters and type
                  if ($countries    != '' )  $country_attributes_dbg     = sprintf (__("countries='%s' type='%s'", 'ad-inserter'), $countries, $country_list_type);          else $country_attributes_dbg    = '';
                                                                                    // translators: %s: list parameters and type
                  if ($ip_addresses != '' )  $ip_address_attributes_dbg  = sprintf (__("ip addresses='%s' type='%s'", 'ad-inserter'), $ip_addresses, $ip_address_list_type); else $ip_address_attributes_dbg = '';

                  $debug_ip = new ai_block_labels ('ai-debug-lists');
                  $processed_code = $debug_ip->bar ($country_attributes_dbg . ' ' . $ip_address_attributes_dbg, 'B = ' . AI_TEXT_BLACK_LIST .', W = ' . AI_TEXT_WHITE_LIST, '<kbd class="ai-debug-name ai-ip-status"></kbd>', '<kbd class="ai-debug-name ai-ip-country"></kbd>') . $processed_code;
                }

                break;
              case AI_DYNAMIC_BLOCKS_SERVER_SIDE_W3TC:
                if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
                  $this->w3tc_debug []= 'PROCESS IP ADDRESSES';
                }

                $this->generate_w3tc_code_from_html ($processed_code);

                $this->w3tc_code .= ' require_once \''.AD_INSERTER_PLUGIN_DIR.'includes/geo/Ip2Country.php\';';

                if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
                  $this->w3tc_code .= ' if ($ai_enabled) ai_w3tc_log_run (\'PROCESS IP ADDRESSES\' . ($ai_enabled ? \'\' : \', NOT ENABLED\'));';
                }

                if ($ip_addresses != '') {
                  if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
                    $this->w3tc_code .= ' if ($ai_enabled) ai_w3tc_log_run (\'  IP ADDRESSES: \\\'\' . base64_decode (\'' . base64_encode ($ip_addresses) . '\').\'\\\' ' . ($ip_address_list_type == AI_WHITE_LIST ? 'W':'B'). '\');';
                    $w3tc_status = ' if (!$ai_enabled) ai_w3tc_log_run (\'  FAILED\', \'color: red;\');';
                  } else $w3tc_status = '';

                  $this->w3tc_code .= ' if ($ai_enabled) {$ai_enabled = check_ip_address_list (base64_decode (\''.base64_encode ($ip_addresses).'\'), '.($ip_address_list_type == AI_WHITE_LIST ? 'true':'false').');'.$w3tc_status.'};';
                }

                if ($countries != '') {
                  if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
                    $this->w3tc_code .= ' if ($ai_enabled) ai_w3tc_log_run (\'  COUNTRIES: \\\'\' . base64_decode (\'' . base64_encode ($countries) . '\').\'\\\' ' . ($country_list_type == AI_WHITE_LIST ? 'W':'B'). '\');';
                    $w3tc_status = ' if (!$ai_enabled) ai_w3tc_log_run (\'  FAILED\', \'color: red;\');';
                  } else $w3tc_status = '';

                  $this->w3tc_code .= ' if ($ai_enabled) {$ai_enabled = check_country_list (base64_decode (\''.base64_encode ($countries).'\'), '.($country_list_type == AI_WHITE_LIST ? 'true':'false').');'.$w3tc_status.'};';
                }

                $processed_code = $this->generate_html_from_w3tc_code ();

                break;
            }
          }
        } while ($check_again);
      }

      // Viewports
      if (!$ai_wp_data [AI_FORCE_SERVERSIDE_CODE] && !$ai_wp_data [AI_WP_AMP_PAGE]) {
        $viewports_code = false;
        do {
          $check_again = false;
          if (isset ($this->check_viewports)) {
            $viewports          = $this->check_viewports;
            $viewport_list_type = $this->check_viewports_list_type;

            unset ($this->check_viewports);
            unset ($this->check_viewports_list_type);

            // Not needed as only check possible is from the CHECK separator
//            $check_again = true;
          } else {
              $viewports = '';
              $viewport_list_type = '';
            }

          if ($viewports != '') {
            $separator_viewports = explode (',', strtolower ($viewports));
            foreach ($separator_viewports as $index => $separator_viewport) {
              $separator_viewports [$index] = trim ($separator_viewport);
            }

            $viewport_classes = '';
            $invisible_viewport_classes = '';
            for ($viewport = 1; $viewport <= 6; $viewport ++) {
              $viewport_name  = strtolower (get_viewport_name ($viewport));
              $viewport_width = get_viewport_width ($viewport);

              if ($viewport_name != '') {
                $viewport_found = in_array ($viewport_name, $separator_viewports);

                if ($viewport_list_type == AI_BLACK_LIST) {
                  $viewport_found = !$viewport_found;
                }
                if ($viewport_found) {
                  $viewport_classes .= " ai-viewport-" . $viewport;
                } else {
                    $invisible_viewport_classes .= " ai-viewport-" . $viewport;
                  }
              }
            }

            if ($ai_wp_data [AI_CODE_FOR_IFRAME]) {
              $viewport_classes = '';
              $invisible_viewport_classes = 'ai-viewport-0';
            }
            elseif ($viewport_classes == '') {
              $viewport_classes = 'ai-viewport-0';
              $invisible_viewport_classes = '';
            }
            elseif ($invisible_viewport_classes == '') {
              $viewport_classes = '';
              $invisible_viewport_classes = 'ai-viewport-0';
            }
            $viewport_classes = trim ($viewport_classes);
            $invisible_viewport_classes = trim ($invisible_viewport_classes);

            if ($viewport_classes != '') {
              $viewport_class = " class='" . $viewport_classes . "'";
            } else $viewport_class = '';

            $invisible_label = '';
            if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0 && !$this->hide_debug_labels && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
              if ($viewport_list_type == AI_BLACK_LIST) $list_type = 'B'; else $list_type = 'W';

              $invisible_label_classes = $dynamic_blocks == AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT ? '' : $invisible_viewport_classes;
              $invisible_debug_viewport = new ai_block_labels ('ai-debug-viewport-invisible '. $invisible_label_classes);
              $invisible_label = $invisible_debug_viewport->bar (sprintf (__("viewport='%s' type='%s'", 'ad-inserter'), $viewports, $list_type), '', _x('HIDDEN', 'Block', 'ad-inserter'), '&nbsp;');

              $debug_viewport = new ai_block_labels ('ai-debug-lists');
              $processed_code = $debug_viewport->bar (sprintf (__("viewport='%s' type='%s'", 'ad-inserter'), $viewports, $list_type), '', _x('VISIBLE', 'Block', 'ad-inserter'), '&nbsp;') . $processed_code;
            }

            $viewports_code = true;

            if ($dynamic_blocks == AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT) {
              $class_id = 'ai-insert-' . $this->number . '-' . rand (1000, 9999) . rand (1000, 9999);

              if ($viewport_classes != '') {
                $viewport_classes = 'ai-viewports ' . $viewport_classes;
              }

              $ai_code = $this->base64_encode_w3tc (ai_strip_w3tc_markers ($processed_code), false); // Use W3TC code in case W3TC was used before and insert was specified for CHECK

              $processed_code = "<div class='{$viewport_classes} {$class_id}' data-insertion='after' data-selector='.{$class_id}' data-insertion-no-dbg data-code='$ai_code'></div>\n";

              if (!get_disable_js_code ()) {
                $js_code = "ai_insert_list_code ('{$class_id}');";

                $processed_code .= $this->ai_js_dom_ready ($js_code);

                if ($invisible_label != '') {
                  if ($invisible_viewport_classes != '') {
                    $invisible_viewport_classes = 'ai-viewports ' . $invisible_viewport_classes . ' ';
                  }
                  $ai_dbg_code = base64_encode ($invisible_label);
                  $processed_code .= "<div class='{$invisible_viewport_classes} {$class_id}-dbg' data-insertion='after' data-selector='.{$class_id}-dbg' data-insertion-no-dbg data-code='$ai_dbg_code'></div>\n";
                  $js_code = "ai_insert_code_by_class ('{$class_id}-dbg');";
                  $processed_code .= $this->ai_js_dom_ready ($js_code);
                }
              }
            } else {
                if ($this->get_alignment_type () == AI_ALIGNMENT_NO_WRAPPING || $invisible_label != '') {
                  if ($viewport_class != '') {
                    $processed_code = $invisible_label . "<div{$viewport_class}>\n" . $processed_code . "\n</div>\n";
                  } else $processed_code = $invisible_label . $processed_code;
                } else $this->wrapping_div_classes = array_merge ($this->wrapping_div_classes, explode (' ', $viewport_classes));
              }
          }
        } while ($check_again);

        // Recreate W3TC code
        if ($viewports_code && $this->w3tc_code != '') {
          if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
            $this->w3tc_debug []= 'PROCESS VIEWPORT CHECKS';
          }

          $processed_code = $this->regenerate_w3tc_code ($processed_code);
        }
      }


      // LIMITS + COOKIE
      if ($check_block_code && !$ai_wp_data [AI_FORCE_SERVERSIDE_CODE] && !$ai_wp_data [AI_WP_AMP_PAGE]) {
        // Check for cookie
        if (get_dynamic_blocks () == AI_DYNAMIC_BLOCKS_SERVER_SIDE_W3TC && !defined ('AI_NO_W3TC')) {

          if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
            $this->w3tc_debug []= 'PROCESS LIMITS AND COOKIE';
            $this->generate_w3tc_code_from_html ($processed_code);
            $this->w3tc_code .= 'if ($ai_enabled) ai_w3tc_log_run (\'PROCESS LIMITS AND COOKIE\');';
            $w3tc_status = ' if (!$ai_enabled) ai_w3tc_log_run (\'  FAILED\', \'color: red;\');';
          } else $w3tc_status = '';

          $fallback_block = intval ($this->get_limits_fallback ());
          if ($fallback_block != $this->number && $fallback_block >= 1 && $fallback_block <= 96) {

            $fallback_obj = $block_object [$fallback_block];
            $fallback_obj->hide_debug_labels = true;
            $fallback_block_code = base64_encode ($fallback_obj->ai_getProcessedCode ()); // Encode HTML + W3TC PHP
            $fallback_obj->hide_debug_labels = false;

            if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
              $w3tc_fallback_status = ' ai_w3tc_log_run (\'  FALLBACK BLOCK: ' . $fallback_block . '\');';

              array_unshift ($fallback_obj->w3tc_debug,  'FALLBACK BLOCK ' . $fallback_block);
              $fallback_obj->w3tc_debug []= 'FALLBACK BLOCK END';

              $this->w3tc_debug = array_merge ($this->w3tc_debug, $fallback_obj->w3tc_debug);
            } else $w3tc_fallback_status = '';



            if ($fallback_obj->get_tracking ()) {
             $fallback_tracking_block = $fallback_block;
            } else $fallback_tracking_block = '0';

            $fallback_code = ' if (!$ai_enabled) {'.$w3tc_fallback_status.' $ai_enabled = true; if (!isset ($ai_index)) $ai_index = 0; $ai_fallback = '.$fallback_tracking_block.'; $ai_code = ai_w3tc_execute_php (base64_decode (\''. $fallback_block_code . '\'), $ai_index, $ai_fallback);}';
          } else $fallback_code = '';

          $this->generate_w3tc_code_from_html ($processed_code);

          $this->w3tc_code .= $ai_check_block_w3tc_code;
          $this->w3tc_code .= 'if ($ai_enabled) {$ai_enabled = ai_check_impression_and_click_limits (' . $this->number . ', false); if ($ai_enabled) {$ai_enabled = ai_check_block (' . $this->number . ');}; '. $w3tc_status . $fallback_code . '};';

          $processed_code = $this->generate_html_from_w3tc_code ();

        } else {
            $debug_html_code = '';
            $block_id = $this->number . '-' . rand (1000, 9999) . rand (1000, 9999);

            $fallback_data = '';
            $fallback_block = $this->get_limits_fallback ();
            if ($fallback_block != $this->number && $fallback_block >= 1 && $fallback_block <= 96) {

              $globals_name = AI_FALLBACK_DEPTH_NAME;
              if (!isset ($ad_inserter_globals [$globals_name])) {
                $ad_inserter_globals [$globals_name] = 0;
              }

              if ($ad_inserter_globals [$globals_name] < 3) {
                $ad_inserter_globals [$globals_name] ++;

                $fallback_level = $ad_inserter_globals [$globals_name];

                $fallback_obj = $block_object [$fallback_block];
                $fallback_code = $fallback_obj->ai_getProcessedCode ();

                $fallback_tracking_block = $fallback_obj->get_tracking () ? $fallback_obj->number : 0;
                $fallback_tracking_data = base64_encode ("[{$fallback_tracking_block},{$fallback_obj->code_version},\"{$fallback_obj->get_ad_name ()}\",\"{$fallback_obj->version_name}\"]");

                if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0 && !$this->hide_debug_labels) {
                  $debug_fallback = new ai_block_labels ('ai-debug-fallback');
                  $debug_fallback_code = $debug_fallback->bar ('', '', _x ('FALLBACK', 'alternative block', 'ad-inserter') . " = {$fallback_block}", '');
                } else $debug_fallback_code = '';

                $fallback_data = " data-fallback-code='" . base64_encode ($debug_fallback_code . $fallback_code) . "' limits-fallback='$fallback_block' fallback_level='$fallback_level' fallback-tracking='$fallback_tracking_data'";

                $ad_inserter_globals [$globals_name] --;
              }
            }

            if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0 && !$this->hide_debug_labels) {
              $debug_label = new ai_block_labels ('ai-debug-cookie');

              $debug_html_code =
                $debug_label->block_start () .
                $debug_label->bar ('COOKIE CHECK', '', '<span class="ai-status"></span>', '<span class="ai-cookie-data"></span>', '', 'ai-check-' . $block_id . '-dbg') .
                $debug_label->block_end ();
            }

            $processed_code =
              $debug_html_code .
              "<div class='no-visibility-check ai-check-{$block_id}' data-insertion='after' data-selector='.ai-check-{$block_id}' data-code='" .
              base64_encode (ai_strip_w3tc_markers (ai_strip_js_markers ($processed_code))) .
              "'{$fallback_data} data-block='{$this->number}'>{$ai_check_block_html_code}</div>\n";

            if (!get_disable_js_code ()) {
              $js_code = "{$ai_check_block_js_code}ai_check_and_insert_block ({$this->number}, 'ai-check-{$block_id}');";
              $processed_code .= $this->ai_js_dom_ready ($js_code);
            }
          }
      }


      // FILTER HOOK
      if ($this->client_side_filter_hook_check && !$ai_wp_data [AI_FORCE_SERVERSIDE_CODE] && !$ai_wp_data [AI_WP_AMP_PAGE]) {
        // Check filter hook
            if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0 && !$this->hide_debug_labels) {
              $debug_label = new ai_block_labels ('ai-debug-filter');
              $debug_html_code = $debug_label->bar ('FILTER HOOK CHECK', '', '<span class="ai-status"></span>', '<span class="ai-filter-data">ai_block_insertion_check</span>');
            } else  $debug_html_code = '';

            $dynamic_blocks_filetr_check = $dynamic_blocks;

            if ($dynamic_blocks_filetr_check == AI_DYNAMIC_BLOCKS_SERVER_SIDE && $this->client_side_filter_hook_check) {
              // if filter ai_block_insertion_check returns null on server-side check, it means it needs client-side check
              $dynamic_blocks_filetr_check = AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT;
            }

            switch ($dynamic_blocks_filetr_check) {
              case AI_DYNAMIC_BLOCKS_CLIENT_SIDE_SHOW:
                // Hide block only when no block height is defined - for check options don't hide the first one
                if (trim ($this->get_block_height ()) == '' || isset ($this->check_codes) && $this->check_codes_index != 0) {
                  $this->wrapping_div_classes []= 'ai-list-block-filter';
                }

                $processed_code = $debug_html_code . "\n<div class='ai-dynamic ai-filter-check' data-block='{$this->number}'>$processed_code</div>\n";
                break;
              case AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT:
                // Hide block only when no block height is defined - for check options don't hide the first one
                if (trim ($this->get_block_height ()) == '' || isset ($this->check_codes) && $this->check_codes_index != 0) {
                  $this->wrapping_div_classes []= 'ai-list-block-filter';
                }

                $code_data = "data-code='".base64_encode ($processed_code)."'";

                if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_AJAX && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
                  $block_id = 'ai-filter-' . $this->number . '-' . rand (1000, 9999) . rand (1000, 9999);
                  $filter_class = ' ' . $block_id ;
                } else $filter_class = '';

                $processed_code = $debug_html_code . "\n<div class='ai-dynamic{$filter_class} ai-filter-check' $code_data data-block='{$this->number}'></div>\n";

                if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_AJAX && !$ai_wp_data [AI_CODE_FOR_IFRAME] && !get_disable_js_code ()) {
                  $processed_code .= "<script>if (typeof ai_js_code == 'boolean') {var ai_block_div = jQuery ('.{$block_id}'); ai_process_ip_addresses (ai_block_div); ai_block_div.removeClass ('{$block_id}');};</script>\n";
                }
                break;
              case AI_DYNAMIC_BLOCKS_SERVER_SIDE_W3TC:
                if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
                  $this->w3tc_debug []= 'PROCESS FILTER HOOK';
                  $this->generate_w3tc_code_from_html ($processed_code);
                  $this->w3tc_code .= 'if ($ai_enabled) ai_w3tc_log_run (\'PROCESS FILTER HOOK: \' . (ai_check_filter_hook (' . $this->number . ') ? \'ENABLED\' : \'NOT ENABLED\'));';
                  $w3tc_status = ' if (!$ai_enabled) ai_w3tc_log_run (\'  FAILED\', \'color: red;\');';
                } else $w3tc_status = '';

                $this->generate_w3tc_code_from_html ($processed_code);

                $this->w3tc_code .= $ai_check_block_w3tc_code;
                $this->w3tc_code .= 'if ($ai_enabled) {$ai_enabled = ai_check_filter_hook (' . $this->number . ');'.$w3tc_status.'};';

                $processed_code = $this->generate_html_from_w3tc_code ();
              break;
            }
      }
    }


    if (!$ai_wp_data [AI_CODE_FOR_IFRAME] && !$ai_wp_data [AI_FORCE_SERVERSIDE_CODE]) {

      // DELAY
      if ((int) $this->get_delay_time () != 0 && !$ai_wp_data [AI_WP_AMP_PAGE]) {

        if ($this->w3tc_code != '') {
          if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
            $this->w3tc_debug []= 'PROCESS DELAY';
          }
        }

        $manual_code = $this->base64_encode_w3tc ($processed_code);
        $wrapper_class = base64_encode (get_block_class_name (true));
        $processed_code = '<div class="ai-delayed ai-delayed-' . $this->number . '" data-delay="'.((int) $this->get_delay_time ()).'" data-block="'. $this->number .'" data-code="'.$manual_code.'" data-class="'.$wrapper_class.'"></div>'."\n";

        // Recreate W3TC code
        if ($this->w3tc_code != '') {
          $processed_code = $this->regenerate_w3tc_code ($processed_code);
        }
      }

      // WAIT FOR INTERACTION
      if ($this->get_wait_for_interaction () && !$ai_wp_data [AI_WP_AMP_PAGE]) {

        if ($this->w3tc_code != '') {
          if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
            $this->w3tc_debug []= 'PROCESS WAIT FOR INTERACTION';
          }
        }

        $manual_code = $this->base64_encode_w3tc ($processed_code);
        $wrapper_class = base64_encode (get_block_class_name (true));
        $processed_code = '<div class="ai-wait-for-interaction ai-wait-for-interaction-' . $this->number . '" data-code="'.$manual_code.'" data-class="'.$wrapper_class.'"></div>'."\n";

        // Recreate W3TC code
        if ($this->w3tc_code != '') {
          $processed_code = $this->regenerate_w3tc_code ($processed_code);
        }
      }
    }


     // TODO single CHECK block
//    } while (is_array ($this->check_codes) && isset ($this->check_codes [$this->check_codes_index + 1]));




    if (defined ('AI_DEBUGGING_DEMO') && !$this->demo_debugging) {
      $this->hide_debug_labels = true;
    }



    if ($close_button && ($width = trim ($this->get_block_width ())) != '' && $this->get_alignment_type() != AI_ALIGNMENT_NO_WRAPPING) {
      if (is_numeric ($width)) {
        $width .= 'px';
      }
      $style .= 'width: ' . $width . ';';

      $processed_code =  "<div style='$style'>\n" . $processed_code ."\n</div>\n";
    }


    if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0 && !$this->hide_debug_labels) {
      $processed_code =  "<div class='ai-code'>\n" . $processed_code ."\n</div>\n";
    }


    // Process W3TC filter hook
    if ($this->w3tc_code != '') {
      $processed_code = $this->regenerate_w3tc_code ($processed_code);

      $this->w3tc_code .= ' $ai_code_org = $ai_code; if (!isset ($ai_enabled) || $ai_enabled) {$ai_code = apply_filters ("ai_block_w3tc_code_after_processing", $ai_code_org, ' . $this->number . ');}';
      if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
        $this->w3tc_code .= ' if ($ai_code != $ai_code_org) {ai_w3tc_log_run ("PROCESS HOOK FILTER ai_block_w3tc_code_after_processing");}';
      }
      $processed_code = $this->generate_html_from_w3tc_code ();
    }

    if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0 && !$this->hide_debug_labels) {
      $this->ai_generateDebugLabel ();
    }

    $code = $this->additional_code_before . $processed_code . $this->additional_code_after;

    // $this->additional_code_after may contain W3TC code because of ai_adb_block_actions ()
    if ($this->w3tc_code != '' || strpos ($this->additional_code_after, '<!-- mfunc') !== false)  {
      $code = $this->regenerate_w3tc_code ($code);
      $this->additional_code_before = '';
      $this->additional_code_after = '';

      if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
        $this->w3tc_code .= ' ai_w3tc_log_run ("REGENERATE PROCESSED CODE");';
        $code = $this->generate_html_from_w3tc_code ();
      }
    }

    if ($this->w3tc_code != '' && $ai_wp_data [AI_W3TC_DEBUGGING]) {
      $code = $this->regenerate_w3tc_code ($code);
      $this->additional_code_before = '';
      $this->additional_code_after = '';

      $this->w3tc_code  = ' ai_w3tc_block_start ('.$this->number.');' . $this->w3tc_code . ' $ai_code = ai_w3tc_block_end ('.$this->number.', $ai_code, $ai_enabled, (isset ($ai_fallback) ? $ai_fallback : \'\'), (isset ($ai_index) ? $ai_index : \'\'));';

      $code = $this->generate_html_from_w3tc_code ();
    }

    $code_org = $code;

    $hook_start_time = microtime (true);
    $code = apply_filters ("ai_block_code_after_processing", $code_org, $this->number);
    if ($debug_processing && $code != $code_org) {
      $filter_hooks []= array ("ai_block_code_after_processing", $this->number);
    }
    $ai_total_hook_php_time += microtime (true) - $hook_start_time;

    return $code;
  } // ai_getProcessedCode

  public function get_code_for_single_insertion ($include_viewport_classes = true, $hidden_widgets = false, $code_only = false) {
    global $ai_wp_data, $block_object, $ad_inserter_globals, $ai_total_hook_php_time, $filter_hooks;

    if ($this->get_disable_caching ()) $ai_wp_data [AI_DISABLE_CACHING] = true;

    if ($this->get_lazy_loading () || $this->get_manual_loading () != AI_MANUAL_LOADING_DISABLED || $ai_wp_data [AI_CLIENT_SIDE_INSERTION]) $this->needs_class = true;
//    if ($this->client_side_list_detection && !$ai_wp_data [AI_WP_AMP_PAGE]) $this->needs_class = true;

    // Must be before $this->get_size_class () to detect CHECK options
    $code = $this->ai_getProcessedCode ();

    $block_class_name = get_block_class_name ($this->needs_class);

    $block_class              = get_block_class () || ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0;
    $block_number_class       = get_block_number_class () || ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0;
    $block_name_class         = get_block_name_class ();

    $alignment_class = $ai_wp_data [AI_CODE_FOR_IFRAME] ? '' : $this->get_alignment_class ();
    $size_class      = $ai_wp_data [AI_CODE_FOR_IFRAME] ? '' : $this->get_size_class ();
    $alignment_style = $ai_wp_data [AI_CODE_FOR_IFRAME] ? '' : $this->get_alignment_style ();

    if ($this->get_client_side_action () == AI_CLIENT_SIDE_ACTION_INSERT) $include_viewport_classes = false;
    $viewport_classes = $include_viewport_classes ? trim ($this->get_viewport_classes ()) : "";

    $check_block_classes = array ();
    $classes = array ();
    if ($block_class_name != '' && ($block_class || $block_number_class || $block_name_class) || $alignment_class != '' || $size_class != '' || $viewport_classes != '') {

      if ($block_class_name != '' && ($block_class || $this->needs_class)) {
        $classes []= $block_class_name;
        $check_block_classes []= $block_class_name;
      }

      if ($alignment_class && !get_inline_styles ()) {
        if ($this->check_block) {
          $check_block_classes []= $alignment_class;
        } else {
            $classes []= $alignment_class;
          }
      }

      if ($size_class) {
        if ($this->check_block) {
          $check_block_classes []= $size_class;
        } else {
            $classes []= $size_class;
          }
      }

      if ($block_class_name != '' && ($block_number_class || $this->needs_class)) {
        if ($this->check_block) {
          $check_block_classes []= $block_class_name . "-" . $this->number;
        } else {
            $classes []= $block_class_name . "-" . $this->number;
          }
      }

      if ($block_class_name != '' && $block_name_class) {
        if ($this->check_block) {
          $check_block_classes []= $block_class_name . "-" . $this->get_name_class ();
        } else {
            $classes []= $block_class_name . "-" . $this->get_name_class ();
          }
      }

      if ($viewport_classes) $classes []= $viewport_classes;
    }

    $sticky_parameters = '';

    if (!$ai_wp_data [AI_WP_AMP_PAGE] && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
      $sticky_parameters = $this->sticky_parameters ($classes);
    }

//    $code = $this->ai_getProcessedCode ();

    $not_iframe_or_inside = !$this->get_iframe () || $ai_wp_data [AI_CODE_FOR_IFRAME];

    $w3tc = $this->w3tc_code != '' && get_dynamic_blocks () == AI_DYNAMIC_BLOCKS_SERVER_SIDE_W3TC && !defined ('AI_NO_W3TC');

    if ($this->get_alignment_type() == AI_ALIGNMENT_NO_WRAPPING || $code_only || $this->check_code_empty || $this->code_empty) {
      return $code;
    }

    // Prevent empty wrapping div on AMP pages
//    if ($ai_wp_data [AI_WP_AMP_PAGE] && $code == '') return '';

    if ($hidden_widgets) return $this->hidden_viewports;

    if (!empty ($this->wrapping_div_classes)) {
      $classes = array_merge ($classes, $this->wrapping_div_classes);
    }

    if (($this->get_close_button () || $this->get_auto_close_time ()) && !$ai_wp_data [AI_WP_AMP_PAGE] && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
      if ($this->check_block) {
        $check_block_classes []= 'ai-close';
      } else {
          $classes [] = 'ai-close';
        }
    }

    $parallax_options = false;
    for ($index = 1; $index <= 3; $index ++) {
      $parallax_options |= $this->get_parallax ($index) && $this->get_parallax_image ($index) != '';
      if ($parallax_options) break;
    }

    if ($this->check_block) {
      $this->check_block_style      = $alignment_style;
      $this->check_block_classes    = $check_block_classes;
      $this->check_block_parameters = $sticky_parameters;

      $alignment_style   = '';
      $sticky_parameters = '';
    }

    $tracking_block     = 0;
    $tracking_code_pre  = '';
    $tracking_code_data = '';
    $tracking_code_post = '';
    $tracking_code      = '';

    if ($not_iframe_or_inside) {

      if ($w3tc) {
        $classes [] = 'ai-track';
        if ($this->get_tracking ()) {
          $tracking_block = $this->number;
        }

        $tracking_code_pre = " data-ai='";
        $tracking_code_data = '[#AI_DATA#]';
        $tracking_code_post = "'";
      }
      elseif ($this->fallback != 0) {
        if ($block_object [$this->fallback]->get_tracking ()) {
          $classes [] = 'ai-track';
          $tracking_block = $this->fallback;
          $block_counter = isset ($ad_inserter_globals [AI_BLOCK_COUNTER_NAME . $block_object [$this->fallback]->number]) ? $ad_inserter_globals [AI_BLOCK_COUNTER_NAME . $block_object [$this->fallback]->number] : 0;

          $tracking_code_pre = " data-ai='";
          $tracking_code_data = "[{$this->fallback},{$this->code_version},\"{$block_object [$this->fallback]->get_ad_name ()}\",\"{$this->version_name}\",{$block_counter}]";
          $tracking_code_post = "'";

          $tracking_code = $tracking_code_pre . base64_encode ($tracking_code_data) . $tracking_code_post;
        }
      }
      elseif ($this->get_tracking ()) {
          $classes [] = 'ai-track';
          $tracking_block = $this->number;
          $block_counter = isset ($ad_inserter_globals [AI_BLOCK_COUNTER_NAME . $this->number]) ? $ad_inserter_globals [AI_BLOCK_COUNTER_NAME . $this->number] : 0;

          $tracking_code_pre = " data-ai='";
          $tracking_code_data = "[{$this->number},{$this->code_version},\"{$this->get_ad_name ()}\",\"{$this->version_name}\",{$block_counter}]";
          $tracking_code_post = "'";

          $tracking_code = $tracking_code_pre . base64_encode ($tracking_code_data) . $tracking_code_post;
        }
    }

    $classes = array_unique ($classes);

    foreach ($classes as $index => $class_name) {
      if (trim ($class_name) == '') unset ($classes [$index]);
    }
    if (count ($classes) != 0) {
      $class = " class='" . trim (implode (' ', $classes)) . "'";
    } else $class = "";

    $check_option_css = '';
    $check_option_style = '';
    if (isset ($this->check_css)) {
      $check_option_css = ' '. $this->check_css;
      $check_option_style = ' style="' . $check_option_css . '"';
      unset ($this->check_css);
    }

    if ($w3tc) {
      if (($alignment_class != '' && defined ('AI_NORMAL_HEADER_STYLES') && AI_NORMAL_HEADER_STYLES && !get_inline_styles ())) {
        $wrapper_before = $this->hidden_viewports . "<div" . $class . $tracking_code_pre . $tracking_code_data . $tracking_code_post . $sticky_parameters . $check_option_style . ">\n";
      } else {
          $css = trim ($alignment_style . $check_option_css);
          if ($css != '') {
            $style = " style='" . $css . "'";
          } else $style = "";

          $wrapper_before = $this->hidden_viewports . "<div" . $class . $tracking_code_pre . $tracking_code_data . $tracking_code_post . $sticky_parameters . $style .">\n";
        }


//          TO TEST
//        $wrapper_before = $this->hidden_viewports . "<div" . $class . $tracking_code_pre . $tracking_code_data . $tracking_code_post .

//        if ($ai_wp_data [AI_WP_AMP_PAGE] || ($alignment_class != '' && defined ('AI_NORMAL_HEADER_STYLES') && AI_NORMAL_HEADER_STYLES && !get_inline_styles ())) {
//          $wrapper_before .= " style='" . $alignment_style;

//        $wrapper_before .=  ">\n";



      $wrapper_after  = "</div>\n";

      $wrapper_before .= $this->additional_code_before;
      $wrapper_after = $this->additional_code_after . $wrapper_after;

      $this->w3tc_code .= ' if (!isset ($ai_fallback)) $ai_fallback = null; if (!isset ($ai_index)) $ai_index = ' . $this->code_version . ';';
      $this->w3tc_code .= ' if ($ai_fallback === null) $ai_tracking_data = \'['.$tracking_block.',\'.$ai_index.\']\'; else $ai_tracking_data = \'[\'.$ai_fallback.\',\'.$ai_index.\']\';';
      $this->w3tc_code .= ' $ai_code = str_replace (\'[#AI_DATA#]\', base64_encode ($ai_tracking_data), base64_decode (\''.base64_encode ($wrapper_before).'\')) . $ai_code . base64_decode (\''.$this->base64_encode_w3tc ($wrapper_after, false).'\');';

      // Process W3TC filter hook
      $this->w3tc_code .= ' $ai_code_org = $ai_code; if (!isset ($ai_enabled) || $ai_enabled) {$ai_code = apply_filters ("ai_block_w3tc_code_single_insertion", $ai_code_org, ' . $this->number . ');}';
      if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
        $this->w3tc_code .= ' if ($ai_code != $ai_code_org) {$ai_code = ai_w3tc_block_end_message ("PROCESS HOOK FILTER ai_block_w3tc_code_single_insertion", $ai_code);}';
      }

      $code = $this->generate_html_from_w3tc_code ();
    } else {
        if (($alignment_class != '' && defined ('AI_NORMAL_HEADER_STYLES') && AI_NORMAL_HEADER_STYLES && !get_inline_styles ())) {
          $wrapper_before = $this->hidden_viewports . "<div" . $class . $tracking_code . $sticky_parameters . $check_option_style . ">\n";
        } else {
            $css = trim ($alignment_style . $check_option_css);
            if ($css != '') {
              $style = " style='" . $css . "'";
            } else $style = "";

            $wrapper_before = $this->hidden_viewports . "<div" . $class . $tracking_code . $sticky_parameters . $style . ">\n";
          }

//          TO TEST
//          $wrapper_before = $this->hidden_viewports . "<div" . $class . $tracking_code;
//          if ($ai_wp_data [AI_WP_AMP_PAGE] || ($alignment_class != '' && defined ('AI_NORMAL_HEADER_STYLES') && AI_NORMAL_HEADER_STYLES && !get_inline_styles ()))
//            $wrapper_before .= $this->hidden_viewports . "<div" . $class . $tracking_code . " style='" . $alignment_style . "'>\n";
//          $wrapper_before .= "'>\n";

        $wrapper_after  = "</div>\n";

        $code = $wrapper_before . $code . $wrapper_after;

        // Debugging label before the hidden block in case manual loading is set to Auto and the block has not been enabled yet
        if ($this->additional_code_before_block != '') {
          $classes = array ('ai-debug-info');

          if ($alignment_class) $classes []= $alignment_class;

          if (!$ai_wp_data [AI_WP_AMP_PAGE] && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
            $this->sticky_parameters ($classes);
          }

          $classes = array_unique ($classes);

          foreach ($classes as $index => $class_name) {
            if (trim ($class_name) == '') unset ($classes [$index]);
          }

          $class = " class='" . trim (implode (' ', $classes)) . "'";

          $code = "<div" . $class . ">\n" . $this->additional_code_before_block . "</div>\n" . $code;
        }
      }

    $debug_processing = ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0;
    $code_org = $code;

    $hook_start_time = microtime (true);
    $code = apply_filters ("ai_block_code_single_insertion", $code_org, $this->number);
    if ($debug_processing && $code != $code_org) {
      $filter_hooks []= array ("ai_block_code_single_insertion", $this->number);
    }
    $ai_total_hook_php_time += microtime (true) - $hook_start_time;

    return $code;
  }

  public function get_code_for_insertion ($include_viewport_classes = true, $hidden_widgets = false, $code_only = false) {
    global $ai_wp_data, $ai_total_hook_php_time, $filter_hooks;

    $code = '';
    $this->check_code_insertions = null;

    $check_options = 0;
    $w3tc_options = false;
    $w3tc_codes = '';

    do {
      $code_for_single_insertion = $this->get_code_for_single_insertion ($include_viewport_classes, $hidden_widgets, $code_only);

      $check_options ++;
      if ($this->w3tc_code != '') {
        $w3tc_options = true;
        $w3tc_code = $this->w3tc_code;
      } else {
          // Gnerate W3TC code if W3TC was not used for the option
          $w3tc_code = '$ai_code = base64_decode (\''.base64_encode ($code).'\'); $ai_enabled = true;';
        }

      // $w3tc_codes will be used only if any of the options uses W3TC
      $w3tc_codes .= $w3tc_code . ' if (!isset ($ai_check_code)) $ai_check_code = \'\'; $ai_check_code .= $ai_code;';

      $code .= $code_for_single_insertion;
    } while (is_array ($this->check_codes) && isset ($this->check_codes [$this->check_codes_index + 1]));

    if ($w3tc_options) {
      switch ($check_options) {
        case 1:
          // Nothing to do - leave the object as it is including $this->w3tc_code
          break;
        default:
          // Put merged options into $ai_code
          $this->w3tc_code = $w3tc_codes . ' $ai_code = $ai_check_code; $ai_enabled = true;';
          break;
      }
    } else $this->w3tc_code = '';

    if (is_array ($this->check_codes)) {
      if ($this->check_code_insertions === null) {
        $this->no_insertion_text = 'CHECK OPTIONS FAILED';
        ai_log ($this->no_insertion_text);
      }

      $this->check_codes = null;
      $this->check_codes_index = 0;
      $this->check_codes_data = null;
    }


    if ($this->check_block) {
      $w3tc = get_dynamic_blocks () == AI_DYNAMIC_BLOCKS_SERVER_SIDE_W3TC && $this->w3tc_code != '' && !defined ('AI_NO_W3TC');

      // Additional code (ad label, close button) for a CHECK block
      if ($this->check_block_additional_code != '') {
        // Close button will not be inserted on empty block
        if ($w3tc) {
          if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
            $this->w3tc_debug []= 'PROCESS ADDITIONAL CODE';
          }

          $this->w3tc_code .= 'if ($ai_code != \'\') $ai_code = base64_decode (\''.base64_encode ($this->check_block_additional_code).'\') . $ai_code;';

          $code = $this->generate_html_from_w3tc_code ();
        } else $code = $this->check_block_additional_code . $code;
      }

      // Wrapping div for a CHECK block
      if ($this->get_alignment_type () != AI_ALIGNMENT_NO_WRAPPING) {
        $classes = array_unique ($this->check_block_classes);

        foreach ($classes as $index => $class_name) {
          if (trim ($class_name) == '') unset ($classes [$index]);
        }
        if (count ($classes) != 0) {
          $class = " class='" . trim (implode (' ', $classes)) . "'";
        } else $class = "";

        if ((defined ('AI_NORMAL_HEADER_STYLES') && AI_NORMAL_HEADER_STYLES && !get_inline_styles ())) {
          $wrapper_before = "<div" . $class . $this->check_block_parameters . ">\n";
        } else {
            $wrapper_before = "<div" . $class . $this->check_block_parameters . " style='" . $this->check_block_style . "'>\n";
          }

        $wrapper_after  = "</div>\n";

        if ($w3tc) {
          $this->w3tc_code .= ' $ai_code = base64_decode (\''.base64_encode ($wrapper_before).'\') . $ai_code . base64_decode (\''.$this->base64_encode_w3tc ($wrapper_after, false).'\');';

          $code = $this->generate_html_from_w3tc_code ();
        } else $code = $wrapper_before . $code . $wrapper_after;
      }
    }


    $debug_processing = ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0;
    $code_org = $code;

    $hook_start_time = microtime (true);
    $code = apply_filters ("ai_block_code_insertion", $code_org, $this->number);
    if ($debug_processing && $code != $code_org) {
      $filter_hooks []= array ("ai_block_code_insertion", $this->number);
    }
    $ai_total_hook_php_time += microtime (true) - $hook_start_time;

    return $code;
  }

  public function get_html_js_code_for_serverside_insertion ($include_viewport_classes = true, $hidden_widgets = false, $code_only = false) {
    global $ai_wp_data, $block_object, $ai_total_hook_php_time, $filter_hooks;

    $html_element_insertion     = false;
    $viewports_insertion        = $this->get_detection_client_side() && $this->get_client_side_action () == AI_CLIENT_SIDE_ACTION_INSERT;
    $server_side_html_insertion = $this->get_html_element_insertion () == AI_HTML_INSERTION_SEREVR_SIDE;

    $insertion_name = '';
    switch ($this->get_automatic_insertion()) {
      case AI_AUTOMATIC_INSERTION_BEFORE_HTML_ELEMENT:
        $insertion = 'before';
        $insertion_name = __('BEFORE', 'ad-inserter');
        if ($server_side_html_insertion && !$viewports_insertion) return $this->get_code_for_insertion ($include_viewport_classes, $hidden_widgets, $code_only);
        $html_element_insertion = !$server_side_html_insertion;
        break;
      case AI_AUTOMATIC_INSERTION_INSIDE_HTML_ELEMENT:
        switch ($this->get_inside_element ()) {
          case AI_HTML_PREPEND_CONTENT:
            $insertion = 'prepend';
            $insertion_name = __('PREPEND CONTENT', 'ad-inserter');
            break;
          case AI_HTML_APPEND_CONTENT:
            $insertion = 'append';
            $insertion_name = __('APPEND CONTENT', 'ad-inserter');
            break;
          case AI_HTML_REPLACE_CONTENT:
            $insertion = 'replace-content';
            $insertion_name = __('REPLACE CONTENT', 'ad-inserter');
            break;
          case AI_HTML_REPLACE_ELEMENT:
            $insertion = 'replace-element';
            $insertion_name = __('REPLACE ELEMENT', 'ad-inserter');
            break;
          default:
            $insertion = '';
            break;
        }
        if ($server_side_html_insertion && !$viewports_insertion) return $this->get_code_for_insertion ($include_viewport_classes, $hidden_widgets, $code_only);
        $html_element_insertion = !$server_side_html_insertion;
        break;
      case AI_AUTOMATIC_INSERTION_AFTER_HTML_ELEMENT:
        $insertion = 'after';
        $insertion_name = __('AFTER', 'ad-inserter');
        if ($server_side_html_insertion && !$viewports_insertion) return $this->get_code_for_insertion ($include_viewport_classes, $hidden_widgets, $code_only);
        $html_element_insertion = !$server_side_html_insertion;
        break;
      default:
        $insertion = '';
        if (!$viewports_insertion) return $this->get_code_for_insertion ($include_viewport_classes, $hidden_widgets, $code_only);
        break;
    }

    if ($ai_wp_data [AI_WP_AMP_PAGE] || $ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_FEED /*|| $ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_AJAX*/) return '';

    $block_id = 'ai-insert-' . $this->number . '-' . rand (1000, 9999) . rand (1000, 9999);

    if ($viewports_insertion && !$html_element_insertion) {
      $block_code = $this->base64_encode_w3tc (ai_strip_js_markers ($this->get_code_for_insertion ($include_viewport_classes, $hidden_widgets, $code_only)));
      $selector = $this->get_viewport_names ();
      $viewport_classes = trim ($this->get_viewport_classes ());

      $style_attribute = "style='" . $this->get_alignment_style () . "'";

//      $serverside_insertion_code = "<div class='ai-viewports $viewport_classes $block_id' {$style_attribute} data-insertion='after' data-selector='.{$block_id}' data-insertion-no-dbg data-code='[#AI_CODE#]' data-block='{$this->number}'></div>\n";
      // Insert inside to prevent CLS
      $serverside_insertion_code = "<div class='ai-viewports $viewport_classes $block_id' {$style_attribute} data-insertion='prepend' data-selector='.{$block_id}' data-insertion-no-dbg data-code='[#AI_CODE#]' data-block='{$this->number}'></div>\n";
      if (!get_disable_js_code ()) {
        $js_code = "ai_insert_viewport_code ('$block_id');";

        $serverside_insertion_code .= $this->ai_js_dom_ready ($js_code);
      }
    }
    elseif ($viewports_insertion && $html_element_insertion) {
      $this->counters = '<span class="ai-selector-counter"></span>';
      $block_code = $this->base64_encode_w3tc (ai_strip_js_markers ($this->get_code_for_insertion ($include_viewport_classes, $hidden_widgets, $code_only)));
      $selector = trim ($this->get_html_selector (true));
      $viewport_classes = trim ($this->get_viewport_classes ());

      $serverside_insertion_code = "<div class='ai-viewports $viewport_classes $block_id' data-insertion='$insertion' data-selector='$selector' data-code='[#AI_CODE#]' data-block='{$this->number}'></div>\n";
      if (!empty ($selector) && !get_disable_js_code ()) {
        // Try to insert it immediately. If the code is server-side inserted before the HTML element, it will be client-side inserted after DOM ready (remaining .ai-viewports)
        $js_code = "ai_insert_viewport_code ('$block_id');";
        $js_code = $this->ai_check_wait_for ($js_code);
        $serverside_insertion_code .= $this->ai_js_dom_ready ($js_code);
      }
    }
    else { // only HTML element insertion
      $this->counters = '<span class="ai-selector-counter"></span>';
      $block_code = $this->base64_encode_w3tc (ai_strip_js_markers ($this->get_code_for_insertion ($include_viewport_classes, $hidden_widgets, $code_only)));
      $selector = trim ($this->get_html_selector (true));

      $serverside_insertion_code = '';
      if (!empty ($selector) && !get_disable_js_code ()) {
        $js_code = "ai_insert ('$insertion', '$selector', b64d ('[#AI_CODE#]'));";
        $js_code = $this->ai_check_wait_for ($js_code);
        $serverside_insertion_code .= $this->ai_js_dom_ready ($js_code);
      }
    }

    if (!get_disable_js_code () && ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS)) {
      $title = '';
      $fallback_block_name = '';

      if ($this->fallback != 0) {
        $fallback_block = $block_object [$this->fallback];
        $fallback_block_name = ' &nbsp;&#8678;&nbsp; '. $this->fallback . ' &nbsp; ' . $fallback_block->get_ad_name ();
      }

      $counters = $this->ai_get_counters ($title);

      $version_name = $this->version_name == '' ? '' : ' - ' . $this->version_name;

      $tag = __('Code', 'ad-inserter');
      $debug_script = new ai_block_labels ('ai-debug-script');
      $serverside_insertion_code =
        $debug_script->bar (" $tag " . __('for block', 'ad-inserter') . " " . $this->number . ' &nbsp; ' . $this->get_ad_name () . $version_name . ' ' . $fallback_block_name, '', $insertion_name . ' ' . $selector, $counters, $title) .
        $serverside_insertion_code;
    }

    $dynamic_blocks_w3tc = get_dynamic_blocks () == AI_DYNAMIC_BLOCKS_SERVER_SIDE_W3TC && !defined ('AI_NO_W3TC');

    if ($this->w3tc_code != '' && $dynamic_blocks_w3tc) {

      // Check to replace " with  \'
      $this->w3tc_code .= ' $ai_code = str_replace ("[#AI_CODE#]", base64_encode ($ai_code), base64_decode ("'. base64_encode (ai_strip_js_markers ($serverside_insertion_code)) . '"));';

//      $serverside_insertion_code = '<!-- mfunc '.W3TC_DYNAMIC_SECURITY.' -->';
//      $serverside_insertion_code .= $this->w3tc_code.' if ($ai_enabled) echo $ai_code;';
//      $serverside_insertion_code .= '<!-- /mfunc '.W3TC_DYNAMIC_SECURITY.' -->';

      $serverside_insertion_code = '<!-- mfunc '.W3TC_DYNAMIC_SECURITY.' ';
      $serverside_insertion_code .= $this->w3tc_code.' if ($ai_enabled) echo $ai_code;';
      $serverside_insertion_code .= ' --><!-- /mfunc '.W3TC_DYNAMIC_SECURITY.' -->';

    } else {
//        if ($this->w3tc_fallback_code != '' && $dynamic_blocks_w3tc) {
//          $this->w3tc_fallback_code .= ' $ai_code = str_replace ("[#AI_CODE2#]", $ai_enabled ? $ai_code : "", base64_decode ("'. base64_encode ($this->before_w3tc_fallback_code) . '"));';
//          $this->w3tc_fallback_code .= ' $ai_code = str_replace ("[#AI_CODE#]", base64_encode ($ai_code), base64_decode ("'. base64_encode ($serverside_insertion_code) . '"));';

//          $serverside_insertion_code = '<!-- mfunc '.W3TC_DYNAMIC_SECURITY.' -->';
//          $serverside_insertion_code .= $this->w3tc_fallback_code .' echo $ai_code;';
//          $serverside_insertion_code .= '<!-- /mfunc '.W3TC_DYNAMIC_SECURITY.' -->';
//        } else

        $serverside_insertion_code = str_replace ('[#AI_CODE#]', $block_code, $serverside_insertion_code);
      }

    $debug_processing = ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0;
    $serverside_insertion_code_org = $serverside_insertion_code;

    $hook_start_time = microtime (true);
    $serverside_insertion_code = apply_filters ("ai_block_code_serverside_html_js", $serverside_insertion_code_org, $this->number);
    if ($debug_processing && $serverside_insertion_code != $serverside_insertion_code_org) {
      $filter_hooks []= array ("ai_block_code_serverside_html_js", $this->number);
    }
    $ai_total_hook_php_time += microtime (true) - $hook_start_time;

    return $serverside_insertion_code;
  }

  public function get_code_for_serverside_insertion ($include_viewport_classes = true, $hidden_widgets = false, $code_only = false) {
    global $ai_wp_data, $ai_total_hook_php_time, $filter_hooks;

    if (!isset ($ai_wp_data [AI_NESTING_LEVEL])) $ai_wp_data [AI_NESTING_LEVEL] = 0; else $ai_wp_data [AI_NESTING_LEVEL] ++;

    $code = $this->get_html_js_code_for_serverside_insertion ($include_viewport_classes, $hidden_widgets, $code_only);

    if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_AJAX || $ai_wp_data [AI_NESTING_LEVEL] != 0) {
      // For Ajax pages and nested blocks do not extract JS code
      $code = ai_strip_js_markers ($code);
    } else {
        $code = ai_extract_js_code ($code);
      }

    $ai_wp_data [AI_NESTING_LEVEL] --;

    $debug_processing = ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0;
    $code_org = $code;

    $hook_start_time = microtime (true);
    $code = apply_filters ("ai_block_code_serverside_insertion", $code_org, $this->number);
    if ($debug_processing && $code != $code_org) {
      $filter_hooks []= array ("ai_block_code_serverside_insertion", $this->number);
    }
    $ai_total_hook_php_time += microtime (true) - $hook_start_time;

    return $code;
  }

  public function get_iframe_page () {
    global $ai_wp_data, $wp_version, $wp_scripts;

    $adb_code = defined ('AI_ADBLOCKING_DETECTION') && AI_ADBLOCKING_DETECTION && $ai_wp_data [AI_ADB_DETECTION] && !isset ($ai_wp_data [AI_ADB_SHORTCODE_DISABLED]);

    if (isset ($wp_scripts->registered ['jquery']->ver)) {
      $jquery_version = $wp_jquery_ver = $wp_scripts->registered ['jquery']->ver;
    } else $jquery_version = $wp_version;

    if (isset ($wp_scripts->registered ['jquery-migrate']->ver)) {
      $jquery_migrate_version = $wp_jquery_ver = $wp_scripts->registered ['jquery-migrate']->ver;
    } else $jquery_migrate_version = $wp_version;

    $ai_wp_data [AI_CODE_FOR_IFRAME] = true;
    ob_start ();

    echo '<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
';
    echo "<script type='text/javascript' src='", includes_url ('js/jquery/jquery.js'), "?ver=", $jquery_version, "'></script>\n";
    echo "<script type='text/javascript' src='", includes_url ('js/jquery/jquery-migrate.min.js'), "?ver=", $jquery_migrate_version, "'></script>\n";

    ai_wp_head_hook ();
    echo '<style>
  body {margin: 0; padding: 0; font-family: arial;}
</style>
<title>Ad Inserter Pro - Advanced WordPress Ads Management Plugin</title>
</head>
<body>
';
    $ai_wp_data [AI_NESTING_LEVEL] = 0;
                                                       // $include_viewport_classes = true, $hidden_widgets = false, $code_only = false
    echo ai_extract_js_code ($this->get_code_for_insertion (false, false, false));

    echo "<script>\n";
    echo "var ai_iframe = true;\n";
    echo "</script>\n";

    ai_set_footer_inline_scripts ();
    ai_wp_footer_hook_end_buffering ();
    ai_wp_footer_hook ();
echo '</body>
</html>';

    $page = ob_get_clean ();
    $ai_wp_data [AI_CODE_FOR_IFRAME] = false;

    $page = ai_process_head_codes ($page);

    return $page;
  }

  public function get_close_button (){
     $option = isset ($this->wp_options [AI_OPTION_CLOSE_BUTTON]) ? $this->wp_options [AI_OPTION_CLOSE_BUTTON] : DEFAULT_CLOSE_BUTTON;
     return $option;
  }

  public function get_auto_close_time () {
     $option = isset ($this->wp_options [AI_OPTION_AUTO_CLOSE_TIME]) ? $this->wp_options [AI_OPTION_AUTO_CLOSE_TIME] : DEFAULT_AUTO_CLOSE_TIME;
     if ($option == '0') $option = '';
     return $option;
  }

  public function get_stay_closed_time () {
     $option = isset ($this->wp_options [AI_OPTION_STAY_CLOSED_TIME]) ? $this->wp_options [AI_OPTION_STAY_CLOSED_TIME] : DEFAULT_STAY_CLOSED_TIME;
     if ($option == '0') $option = '';
     return $option;
  }

  public function get_delay_time () {
     $option = isset ($this->wp_options [AI_OPTION_DELAY_TIME]) ? $this->wp_options [AI_OPTION_DELAY_TIME] : DEFAULT_DELAY_TIME;
     if ($option == '0') $option = '';
     return $option;
  }

  public function get_delay_showing () {
     $option = isset ($this->wp_options [AI_OPTION_DELAY_SHOWING]) ? $this->wp_options [AI_OPTION_DELAY_SHOWING] : DEFAULT_DELAY_SHOWING;
     if ($option == '0') $option = '';
     return $option;
  }

  public function get_show_every () {
     $option = isset ($this->wp_options [AI_OPTION_SHOW_EVERY]) ? $this->wp_options [AI_OPTION_SHOW_EVERY] : DEFAULT_SHOW_EVERY;
     if ($option == '0') $option = '';
     return $option;
  }

  public function get_background (){
     $option = isset ($this->wp_options [AI_OPTION_BACKGROUND]) ? $this->wp_options [AI_OPTION_BACKGROUND] : DEFAULT_BACKGROUND;
     return $option;
  }

  public function get_background_image (){
     $option = isset ($this->wp_options [AI_OPTION_BACKGROUND_IMAGE]) ? $this->wp_options [AI_OPTION_BACKGROUND_IMAGE] : AD_EMPTY_DATA;
     return $option;
  }

  public function get_background_color (){
     $option = isset ($this->wp_options [AI_OPTION_BACKGROUND_COLOR]) ? $this->wp_options [AI_OPTION_BACKGROUND_COLOR] : AD_EMPTY_DATA;
     return $option;
  }

  public function get_background_repeat (){
     $option = isset ($this->wp_options [AI_OPTION_BACKGROUND_REPEAT]) ? $this->wp_options [AI_OPTION_BACKGROUND_REPEAT] : DEFAULT_BACKGROUND_REPEAT;
     return $option;
  }

  public function get_background_size (){
     $option = isset ($this->wp_options [AI_OPTION_BACKGROUND_SIZE]) ? $this->wp_options [AI_OPTION_BACKGROUND_SIZE] : DEFAULT_BACKGROUND_SIZE;
     return $option;
  }

  public function get_set_body_background (){
    if (!get_output_buffering ()) {
      return false;
    }
     $option = isset ($this->wp_options [AI_OPTION_SET_BODY_BACKGROUND]) ? $this->wp_options [AI_OPTION_SET_BODY_BACKGROUND] : DEFAULT_SET_BODY_BACKGROUND;
     return $option;
  }


  public function get_parallax ($index) {
     $option_name = AI_OPTION_PARALLAX . '_' . $index;
     $option = isset ($this->wp_options [$option_name]) ? $this->wp_options [$option_name] : AI_DISABLED;
     return $option;
  }

  public function get_parallax_image ($index) {
     $option_name = AI_OPTION_PARALLAX_IMAGE . '_' . $index;
     $option = isset ($this->wp_options [$option_name]) ? $this->wp_options [$option_name] : AD_EMPTY_DATA;
     return $option;
  }

  public function get_parallax_shift ($index) {
     $option_name = AI_OPTION_PARALLAX_SHIFT . '_' . $index;
     $option = isset ($this->wp_options [$option_name]) ? $this->wp_options [$option_name] : AD_EMPTY_DATA;
     if ($option == '0') $option = '';
     return $option;
  }

  public function get_parallax_link () {
     $option = isset ($this->wp_options [AI_OPTION_PARALLAX_LINK]) ? $this->wp_options [AI_OPTION_PARALLAX_LINK] : AD_EMPTY_DATA;
     return $option;
  }

  public function get_parallax_link_new_tab () {
     $option = isset ($this->wp_options [AI_OPTION_PARALLAX_LINK_NEW_TAB]) ? $this->wp_options [AI_OPTION_PARALLAX_LINK_NEW_TAB] : AD_EMPTY_DATA;
     return $option;
  }



  public function get_visitor_max_impressions () {
     $option = isset ($this->wp_options [AI_OPTION_VISITOR_MAX_IMPRESSIONS]) ? $this->wp_options [AI_OPTION_VISITOR_MAX_IMPRESSIONS] : DEFAULT_VISITOR_MAX_IMPRESSIONS;
     if ($option == '0') $option = '';
     return $option;
  }

  public function get_visitor_limit_impressions_per_time_period () {
     $option = isset ($this->wp_options [AI_OPTION_VISITOR_LIMIT_IMPRESSIONS_PER_TIME_PERIOD]) ? $this->wp_options [AI_OPTION_VISITOR_LIMIT_IMPRESSIONS_PER_TIME_PERIOD] : DEFAULT_VISITOR_LIMIT_IMPRESSIONS_PER_TIME_PERIOD;
     if ($option == '0') $option = '';
     return $option;
  }

  public function get_visitor_limit_impressions_time_period () {
     $option = isset ($this->wp_options [AI_OPTION_VISITOR_LIMIT_IMPRESSIONS_TIME_PERIOD]) ? $this->wp_options [AI_OPTION_VISITOR_LIMIT_IMPRESSIONS_TIME_PERIOD] : DEFAULT_VISITOR_LIMIT_IMPRESSIONS_TIME_PERIOD;
     if ($option == '0') $option = '';
     return $option;
  }

  public function get_max_impressions () {
     $option = isset ($this->wp_options [AI_OPTION_MAX_IMPRESSIONS]) ? $this->wp_options [AI_OPTION_MAX_IMPRESSIONS] : DEFAULT_MAX_IMPRESSIONS;
     if ($option == '0') $option = '';
     return $option;
  }

  public function get_limit_impressions_per_time_period () {
     $option = isset ($this->wp_options [AI_OPTION_LIMIT_IMPRESSIONS_PER_TIME_PERIOD]) ? $this->wp_options [AI_OPTION_LIMIT_IMPRESSIONS_PER_TIME_PERIOD] : DEFAULT_LIMIT_IMPRESSIONS_PER_TIME_PERIOD;
     if ($option == '0') $option = '';
     return $option;
  }

  public function get_limit_impressions_time_period () {
     $option = isset ($this->wp_options [AI_OPTION_LIMIT_IMPRESSIONS_TIME_PERIOD]) ? $this->wp_options [AI_OPTION_LIMIT_IMPRESSIONS_TIME_PERIOD] : DEFAULT_LIMIT_IMPRESSIONS_TIME_PERIOD;
     if ($option == '0') $option = '';
     return $option;
  }

  public function get_visitor_max_clicks () {
     $option = isset ($this->wp_options [AI_OPTION_VISITOR_MAX_CLICKS]) ? $this->wp_options [AI_OPTION_VISITOR_MAX_CLICKS] : DEFAULT_VISITOR_MAX_CLICKS;
     if ($option == '0') $option = '';
     return $option;
  }

  public function get_visitor_limit_clicks_per_time_period () {
     $option = isset ($this->wp_options [AI_OPTION_VISITOR_LIMIT_CLICKS_PER_TIME_PERIOD]) ? $this->wp_options [AI_OPTION_VISITOR_LIMIT_CLICKS_PER_TIME_PERIOD] : DEFAULT_VISITOR_LIMIT_CLICKS_PER_TIME_PERIOD;
     if ($option == '0') $option = '';
     return $option;
  }

  public function get_visitor_limit_clicks_time_period () {
     $option = isset ($this->wp_options [AI_OPTION_VISITOR_LIMIT_CLICKS_TIME_PERIOD]) ? $this->wp_options [AI_OPTION_VISITOR_LIMIT_CLICKS_TIME_PERIOD] : DEFAULT_VISITOR_LIMIT_CLICKS_TIME_PERIOD;
     if ($option == '0') $option = '';
     return $option;
  }

  public function get_max_clicks () {
     $option = isset ($this->wp_options [AI_OPTION_MAX_CLICKS]) ? $this->wp_options [AI_OPTION_MAX_CLICKS] : DEFAULT_MAX_CLICKS;
     if ($option == '0') $option = '';
     return $option;
  }

  public function get_limit_clicks_per_time_period () {
     $option = isset ($this->wp_options [AI_OPTION_LIMIT_CLICKS_PER_TIME_PERIOD]) ? $this->wp_options [AI_OPTION_LIMIT_CLICKS_PER_TIME_PERIOD] : DEFAULT_LIMIT_CLICKS_PER_TIME_PERIOD;
     if ($option == '0') $option = '';
     return $option;
  }

  public function get_limit_clicks_time_period () {
     $option = isset ($this->wp_options [AI_OPTION_LIMIT_CLICKS_TIME_PERIOD]) ? $this->wp_options [AI_OPTION_LIMIT_CLICKS_TIME_PERIOD] : DEFAULT_LIMIT_CLICKS_TIME_PERIOD;
     if ($option == '0') $option = '';
     return $option;
  }

  public function get_trigger_click_fraud_protection () {
     $option = isset ($this->wp_options [AI_OPTION_TRIGGER_CLICK_FRAUD_PROTECTION]) ? $this->wp_options [AI_OPTION_TRIGGER_CLICK_FRAUD_PROTECTION] : DEFAULT_TRIGGER_CLICK_FRAUD_PROTECTION;
     if ($option == '0') $option = '';
     return $option;
  }

  public function get_limits_fallback () {
    $option = isset ($this->wp_options [AI_OPTION_LIMITS_FALLBACK]) ? $this->wp_options [AI_OPTION_LIMITS_FALLBACK] : "";
    return $option;
  }


  public function get_horizontal_margin (){
     $option = isset ($this->wp_options [AI_OPTION_HORIZONTAL_MARGIN]) ? $this->wp_options [AI_OPTION_HORIZONTAL_MARGIN] : DEFAULT_HORIZONTAL_MARGIN;
     return $option;
  }

  public function get_vertical_margin () {
    $option = isset ($this->wp_options [AI_OPTION_VERTICAL_MARGIN]) ? $this->wp_options [AI_OPTION_VERTICAL_MARGIN] : DEFAULT_VERTICAL_MARGIN;
    return $option;
  }

  public function get_animation () {
    $option = isset ($this->wp_options [AI_OPTION_ANIMATION]) ? $this->wp_options [AI_OPTION_ANIMATION] : DEFAULT_ANIMATION;
    return $option;
  }

  public function get_animation_trigger () {
    $option = isset ($this->wp_options [AI_OPTION_ANIMATION_TRIGGER]) ? $this->wp_options [AI_OPTION_ANIMATION_TRIGGER] : DEFAULT_ANIMATION_TRIGGER;
    return $option;
  }

  public function get_animation_trigger_value () {
    $option = isset ($this->wp_options [AI_OPTION_ANIMATION_TRIGGER_VALUE]) ? $this->wp_options [AI_OPTION_ANIMATION_TRIGGER_VALUE] : DEFAULT_ANIMATION_TRIGGER_VALUE;
    return $option;
  }

  public function get_animation_trigger_offset () {
    $option = isset ($this->wp_options [AI_OPTION_ANIMATION_TRIGGER_OFFSET]) ? $this->wp_options [AI_OPTION_ANIMATION_TRIGGER_OFFSET] : DEFAULT_ANIMATION_TRIGGER_OFFSET;
    return $option;
  }

  public function get_animation_trigger_delay () {
    $option = isset ($this->wp_options [AI_OPTION_ANIMATION_TRIGGER_DELAY]) ? $this->wp_options [AI_OPTION_ANIMATION_TRIGGER_DELAY] : DEFAULT_ANIMATION_TRIGGER_DELAY;
    return $option;
  }




  // Deprecated
  public function get_animation_trigger_once () {
    $option = isset ($this->wp_options [AI_OPTION_ANIMATION_TRIGGER_ONCE]) ? $this->wp_options [AI_OPTION_ANIMATION_TRIGGER_ONCE] : DEFAULT_ANIMATION_TRIGGER_ONCE;
    return $option;
  }

  public function get_animation_out_trigger () {
    if ($this->get_animation_trigger_once ()) {
      return AI_TRIGGER_DISABLED;
    }
    $option = isset ($this->wp_options [AI_OPTION_ANIMATION_OUT_TRIGGER]) ? $this->wp_options [AI_OPTION_ANIMATION_OUT_TRIGGER] : AI_TRIGGER_ENABLED;
    return $option;
  }

  public function get_animation_out_trigger_value () {
    $option = isset ($this->wp_options [AI_OPTION_ANIMATION_OUT_TRIGGER_VALUE]) ? $this->wp_options [AI_OPTION_ANIMATION_OUT_TRIGGER_VALUE] : DEFAULT_ANIMATION_TRIGGER_VALUE;
    return $option;
  }

  public function get_animation_out_trigger_offset () {
    $option = isset ($this->wp_options [AI_OPTION_ANIMATION_OUT_TRIGGER_OFFSET]) ? $this->wp_options [AI_OPTION_ANIMATION_OUT_TRIGGER_OFFSET] : DEFAULT_ANIMATION_TRIGGER_OFFSET;
    return $option;
  }




  public function get_ad_general_tag(){
    $option = isset ($this->wp_options [AI_OPTION_GENERAL_TAG]) ? $this->wp_options [AI_OPTION_GENERAL_TAG] : DEFAULT_GENERAL_TAG;
//    if ($option == '') $option = DEFAULT_GENERAL_TAG;
    return $option;
  }

  public function get_adb_block_action (){
     $option = isset ($this->wp_options [AI_OPTION_ADB_BLOCK_ACTION]) ? $this->wp_options [AI_OPTION_ADB_BLOCK_ACTION] : DEFAULT_ADB_BLOCK_ACTION;
     return $option;
  }

  public function get_adb_block_replacement (){
     $option = isset ($this->wp_options [AI_OPTION_ADB_BLOCK_REPLACEMENT]) ? $this->wp_options [AI_OPTION_ADB_BLOCK_REPLACEMENT] : AD_EMPTY_DATA;
     return $option;
  }

  public function get_scheduling(){
     $option = isset ($this->wp_options [AI_OPTION_SCHEDULING]) ? $this->wp_options [AI_OPTION_SCHEDULING] : "";

     // Convert old option
     if ($option == '' && intval ($this->get_ad_after_day()) != 0) $option = AI_SCHEDULING_DELAY_FOR;

     if ($option == '') $option = AI_SCHEDULING_OFF;

     return $option;
  }

  public function get_ad_after_day(){
     $option = isset ($this->wp_options [AI_OPTION_AFTER_DAYS]) ? $this->wp_options [AI_OPTION_AFTER_DAYS] : "";
//     if ($option == '') $option = AD_ZERO;

     if ($option == '0') $option = '';

     return $option;
  }

  public function get_schedule_start_date(){
    $option = isset ($this->wp_options [AI_OPTION_START_DATE]) ? $this->wp_options [AI_OPTION_START_DATE] : "";
    return $option;
  }

  public function get_schedule_end_date(){
    $option = isset ($this->wp_options [AI_OPTION_END_DATE]) ? $this->wp_options [AI_OPTION_END_DATE] : "";
    return $option;
  }

  public function get_schedule_start_time(){
    $option = isset ($this->wp_options [AI_OPTION_START_TIME]) ? $this->wp_options [AI_OPTION_START_TIME] : "";
    return $option;
  }

  public function get_schedule_end_time(){
    $option = isset ($this->wp_options [AI_OPTION_END_TIME]) ? $this->wp_options [AI_OPTION_END_TIME] : "";
    return $option;
  }

  public function get_schedule_weekdays (){
    $option = isset ($this->wp_options [AI_OPTION_WEEKDAYS]) ? $this->wp_options [AI_OPTION_WEEKDAYS] : DEFAULT_WEEKDAYS;
    return $option;
  }

  public function get_scheduling_fallback(){
    $option = isset ($this->wp_options [AI_OPTION_SCHEDULING_FALLBACK]) ? $this->wp_options [AI_OPTION_SCHEDULING_FALLBACK] : "";
    return $option;
  }

  public function get_maximum_insertions (){
    $option = isset ($this->wp_options [AI_OPTION_MAXIMUM_INSERTIONS]) ? $this->wp_options [AI_OPTION_MAXIMUM_INSERTIONS] : "";
    if ($option == '0') $option = '';
    return $option;
  }

  public function get_id_list(){
    $option = isset ($this->wp_options [AI_OPTION_ID_LIST]) ? $this->wp_options [AI_OPTION_ID_LIST] : "";
    return $option;
  }

  public function get_id_list_type (){
    $option = isset ($this->wp_options [AI_OPTION_ID_LIST_TYPE]) ? $this->wp_options [AI_OPTION_ID_LIST_TYPE] : AI_BLACK_LIST;
    if ($option == '') $option = AI_BLACK_LIST;

    elseif ($option == AD_BLACK_LIST)     $option = AI_BLACK_LIST;
    elseif ($option == AD_WHITE_LIST)     $option = AI_WHITE_LIST;

    return $option;
  }

  public function get_ad_url_list(){
    $option = isset ($this->wp_options [AI_OPTION_URL_LIST]) ? $this->wp_options [AI_OPTION_URL_LIST] : "";
    return $option;
  }

  public function get_ad_url_list_type (){
    $option = isset ($this->wp_options [AI_OPTION_URL_LIST_TYPE]) ? $this->wp_options [AI_OPTION_URL_LIST_TYPE] : AI_BLACK_LIST;
    if ($option == '') $option = AI_BLACK_LIST;

    elseif ($option == AD_BLACK_LIST)     $option = AI_BLACK_LIST;
    elseif ($option == AD_WHITE_LIST)     $option = AI_WHITE_LIST;

    return $option;
  }

  public function get_url_parameter_list(){
    $option = isset ($this->wp_options [AI_OPTION_URL_PARAMETER_LIST]) ? $this->wp_options [AI_OPTION_URL_PARAMETER_LIST] : "";
    return $option;
  }

  public function get_url_parameter_list_type (){
    $option = isset ($this->wp_options [AI_OPTION_URL_PARAMETER_LIST_TYPE]) ? $this->wp_options [AI_OPTION_URL_PARAMETER_LIST_TYPE] : AI_BLACK_LIST;
    if ($option == '') $option = AI_BLACK_LIST;

    elseif ($option == AD_BLACK_LIST)     $option = AI_BLACK_LIST;
    elseif ($option == AD_WHITE_LIST)     $option = AI_WHITE_LIST;

    return $option;
  }

  public function get_cookie_list(){
    $option = isset ($this->wp_options [AI_OPTION_COOKIE_LIST]) ? $this->wp_options [AI_OPTION_COOKIE_LIST] : "";
    return $option;
  }

  public function get_cookie_list_type (){
    $option = isset ($this->wp_options [AI_OPTION_COOKIE_LIST_TYPE]) ? $this->wp_options [AI_OPTION_COOKIE_LIST_TYPE] : AI_BLACK_LIST;
    if ($option == '') $option = AI_BLACK_LIST;

    return $option;
  }

  public function get_ad_domain_list(){
     $option = isset ($this->wp_options [AI_OPTION_DOMAIN_LIST]) ? $this->wp_options [AI_OPTION_DOMAIN_LIST] : "";
     return $option;
  }

  public function get_ad_domain_list_type (){
    $option = isset ($this->wp_options [AI_OPTION_DOMAIN_LIST_TYPE]) ? $this->wp_options [AI_OPTION_DOMAIN_LIST_TYPE] : AI_BLACK_LIST;
    if ($option == '') $option = AI_BLACK_LIST;

    elseif ($option == AD_BLACK_LIST)     $option = AI_BLACK_LIST;
    elseif ($option == AD_WHITE_LIST)     $option = AI_WHITE_LIST;

    return $option;
  }

  public function get_client_list(){
     $option = isset ($this->wp_options [AI_OPTION_CLIENT_LIST]) ? $this->wp_options [AI_OPTION_CLIENT_LIST] : "";
     return $option;
  }

  public function get_client_list_type (){
    $option = isset ($this->wp_options [AI_OPTION_CLIENT_LIST_TYPE]) ? $this->wp_options [AI_OPTION_CLIENT_LIST_TYPE] : AI_BLACK_LIST;
    if ($option == '') $option = AI_BLACK_LIST;
    return $option;
  }

  public function get_ad_ip_address_list (){
     $option = isset ($this->wp_options [AI_OPTION_IP_ADDRESS_LIST]) ? $this->wp_options [AI_OPTION_IP_ADDRESS_LIST] : "";
     return $option;
  }

  public function get_ad_ip_address_list_type (){
    $option = isset ($this->wp_options [AI_OPTION_IP_ADDRESS_LIST_TYPE]) ? $this->wp_options [AI_OPTION_IP_ADDRESS_LIST_TYPE] : AI_BLACK_LIST;
    if ($option == '') $option = AI_BLACK_LIST;

    elseif ($option == AD_BLACK_LIST)     $option = AI_BLACK_LIST;
    elseif ($option == AD_WHITE_LIST)     $option = AI_WHITE_LIST;

    return $option;
  }

  public function get_ad_country_list ($expand = false){
     $option = isset ($this->wp_options [AI_OPTION_COUNTRY_LIST]) ? $this->wp_options [AI_OPTION_COUNTRY_LIST] : "";
     if ($expand && function_exists ('expanded_country_list')) return expanded_country_list ($option);
     return $option;
  }

  public function get_ad_country_list_type (){
    $option = isset ($this->wp_options [AI_OPTION_COUNTRY_LIST_TYPE]) ? $this->wp_options [AI_OPTION_COUNTRY_LIST_TYPE] : AI_BLACK_LIST;
    if ($option == '') $option = AI_BLACK_LIST;

    elseif ($option == AD_BLACK_LIST)     $option = AI_BLACK_LIST;
    elseif ($option == AD_WHITE_LIST)     $option = AI_WHITE_LIST;

    return $option;
  }

  public function get_ad_name(){
     $option = isset ($this->wp_options [AI_OPTION_BLOCK_NAME]) ? $this->wp_options [AI_OPTION_BLOCK_NAME] : "";
     if ($option == '') $option = DEFAULT_AD_NAME. " " . $this->number;
     return $option;
  }

  public function get_ad_block_cat(){
     $option = isset ($this->wp_options [AI_OPTION_CATEGORY_LIST]) ? $this->wp_options [AI_OPTION_CATEGORY_LIST] : "";
     return $option;
  }

  public function get_ad_block_cat_type(){
    $option = isset ($this->wp_options [AI_OPTION_CATEGORY_LIST_TYPE]) ? $this->wp_options [AI_OPTION_CATEGORY_LIST_TYPE] : AI_BLACK_LIST;

    // Update old data
    if ($option == ''){
      $option = AI_BLACK_LIST;
      $this->wp_options [AI_OPTION_CATEGORY_LIST_TYPE] = AI_BLACK_LIST;
    }

    if ($option == '') $option = AI_BLACK_LIST;

    elseif ($option == AD_BLACK_LIST)     $option = AI_BLACK_LIST;
    elseif ($option == AD_WHITE_LIST)     $option = AI_WHITE_LIST;

    return $option;
  }

  public function get_ad_block_tag(){
     $option = isset ($this->wp_options [AI_OPTION_TAG_LIST]) ? $this->wp_options [AI_OPTION_TAG_LIST] : "";
     return $option;
  }

  public function get_ad_block_tag_type(){
    $option = isset ($this->wp_options [AI_OPTION_TAG_LIST_TYPE]) ? $this->wp_options [AI_OPTION_TAG_LIST_TYPE] : AI_BLACK_LIST;
    if ($option == '') $option = AI_BLACK_LIST;

    elseif ($option == AD_BLACK_LIST)     $option = AI_BLACK_LIST;
    elseif ($option == AD_WHITE_LIST)     $option = AI_WHITE_LIST;

    return $option;
  }

  public function get_ad_block_taxonomy(){
     $option = isset ($this->wp_options [AI_OPTION_TAXONOMY_LIST]) ? $this->wp_options [AI_OPTION_TAXONOMY_LIST] : "";
     return $option;
  }

  public function get_ad_block_taxonomy_type(){
    $option = isset ($this->wp_options [AI_OPTION_TAXONOMY_LIST_TYPE]) ? $this->wp_options [AI_OPTION_TAXONOMY_LIST_TYPE] : AI_BLACK_LIST;
    if ($option == '') $option = AI_BLACK_LIST;

    elseif ($option == AD_BLACK_LIST)     $option = AI_BLACK_LIST;
    elseif ($option == AD_WHITE_LIST)     $option = AI_WHITE_LIST;

    return $option;
  }

  public function get_ad_enabled_on_which_pages (){
    // Old option
    if (isset ($this->wp_options [AI_OPTION_ENABLED_ON_WHICH_PAGES])) {
      $option = isset ($this->wp_options [AI_OPTION_ENABLED_ON_WHICH_PAGES]) ? $this->wp_options [AI_OPTION_ENABLED_ON_WHICH_PAGES] : AI_IGNORE_EXCEPTIONS;

      if ($option == '') $option = AI_IGNORE_EXCEPTIONS;

      elseif ($option == AD_ENABLED_ON_ALL)                       $option = AI_IGNORE_EXCEPTIONS;
      elseif ($option == AD_ENABLED_ON_ALL_EXCEPT_ON_SELECTED)    $option = AI_DEFAULT_INSERTION_ENABLED;
      elseif ($option == AD_ENABLED_ONLY_ON_SELECTED)             $option = AI_DEFAULT_INSERTION_DISABLED;

      return $option;
    }

    if (!$this->get_exceptions_enabled ()) {
      return AI_IGNORE_EXCEPTIONS;
    }

    return $this->get_exceptions_function ();
  }

  public function get_ad_enabled_on_which_pages_text ($translated = true){
    switch ($this->get_ad_enabled_on_which_pages ()) {
      case AI_IGNORE_EXCEPTIONS:
        if (!$translated) return AI_TEXT_ENG_NO_INDIVIDUAL_EXCEPTIONS;
        return AI_TEXT_PAGES_NO_INDIVIDUAL_EXCEPTIONS;
        break;
      case AI_DEFAULT_INSERTION_ENABLED:
        if (!$translated) return AI_TEXT_ENG_INDIVIDUALLY_DISABLED;
        return AI_TEXT_PAGES_INDIVIDUALLY_DISABLED;
        break;
      case AI_DEFAULT_INSERTION_DISABLED:
        if (!$translated) return AI_TEXT_ENG_INDIVIDUALLY_ENABLED;
        return AI_TEXT_PAGES_INDIVIDUALLY_ENABLED;
        break;
      default:
        return '';
        break;
    }
  }

  public function get_ad_enabled_on_which_posts (){
    // Old option
    if (isset ($this->wp_options [AI_OPTION_ENABLED_ON_WHICH_POSTS])) {
      $option = $this->wp_options [AI_OPTION_ENABLED_ON_WHICH_POSTS];
      if ($option == '') $option = AI_IGNORE_EXCEPTIONS;

      elseif ($option == AD_ENABLED_ON_ALL)                       $option = AI_IGNORE_EXCEPTIONS;
      elseif ($option == AD_ENABLED_ON_ALL_EXCEPT_ON_SELECTED)    $option = AI_DEFAULT_INSERTION_ENABLED;
      elseif ($option == AD_ENABLED_ONLY_ON_SELECTED)             $option = AI_DEFAULT_INSERTION_DISABLED;

      return $option;
    }

    if (!$this->get_exceptions_enabled ()) {
      return AI_IGNORE_EXCEPTIONS;
    }

    return $this->get_exceptions_function ();
  }

  public function get_ad_enabled_on_which_posts_text ($translated = true){
    switch ($this->get_ad_enabled_on_which_posts ()) {
      case AI_IGNORE_EXCEPTIONS:
        if (!$translated) return AI_TEXT_ENG_NO_INDIVIDUAL_EXCEPTIONS;
        return AI_TEXT_POSTS_NO_INDIVIDUAL_EXCEPTIONS;
        break;
      case AI_DEFAULT_INSERTION_ENABLED:
        if (!$translated) return AI_TEXT_ENG_INDIVIDUALLY_DISABLED;
        return AI_TEXT_POSTS_INDIVIDUALLY_DISABLED;
        break;
      case AI_DEFAULT_INSERTION_DISABLED:
        if (!$translated) return AI_TEXT_ENG_INDIVIDUALLY_ENABLED;
        return AI_TEXT_POSTS_INDIVIDUALLY_ENABLED;
        break;
      default:
        return '';
        break;
    }
  }

  public function import_old_exception_settings (&$needs_check){
    $needs_check = false;
    if (isset ($this->wp_options [AI_OPTION_ENABLED_ON_WHICH_POSTS]) || isset ($this->wp_options [AI_OPTION_ENABLED_ON_WHICH_PAGES])) {
      // Import old settings

      $posts = isset ($this->wp_options [AI_OPTION_ENABLED_ON_WHICH_POSTS]) ? $this->get_ad_enabled_on_which_posts () : AI_IGNORE_EXCEPTIONS;
      $pages = isset ($this->wp_options [AI_OPTION_ENABLED_ON_WHICH_PAGES]) ? $this->get_ad_enabled_on_which_pages () : AI_IGNORE_EXCEPTIONS;

      if ($posts == $pages) {
        return $posts;
      }

      if (!$this->get_display_settings_page ()) {
        return $posts;
      }

      if (!$this->get_display_settings_post ()) {
        return $pages;
      }

      $needs_check = true;

//      POSTS = AI_DEFAULT_INSERTION_DISABLED   NO INSERTION ON PAGES
//      POSTS = AI_DEFAULT_INSERTION_ENABLED    OK

      if ($pages == AI_IGNORE_EXCEPTIONS) {
        return $posts;
      }

//      PAGES = AI_DEFAULT_INSERTION_DISABLED   NO INSERTION ON POSTS
//      PAGES = AI_DEFAULT_INSERTION_ENABLED    OK

      if ($posts == AI_IGNORE_EXCEPTIONS) {
        return $pages;
      }

//      POSTS = AI_DEFAULT_INSERTION_DISABLED   NO INSERTION ON PAGES
//      PAGES = AI_DEFAULT_INSERTION_ENABLED

//      POSTS = AI_DEFAULT_INSERTION_ENABLED    INVERTED INSERTION ON PAGES
//      PAGES = AI_DEFAULT_INSERTION_DISABLED

      return $posts;
    }

    return - 1;
  }

  public function get_exceptions_enabled (){
    $needs_check = false;
    $option = $this->import_old_exception_settings ($needs_check);
    if ($option >= 0) {
      return $option != AI_IGNORE_EXCEPTIONS;
    }

    $option = isset ($this->wp_options [AI_OPTION_EXCEPTIONS_ENABLED]) ? $this->wp_options [AI_OPTION_EXCEPTIONS_ENABLED] : AI_DISABLED;
    return $option;
  }

  public function get_exceptions_function (){
    $needs_check = false;
    $option = $this->import_old_exception_settings ($needs_check);
    if ($option >= 0) {
      if ($option == AI_IGNORE_EXCEPTIONS) $option == AI_DEFAULT_INSERTION_ENABLED;
      return $option;
    }

    $option = isset ($this->wp_options [AI_OPTION_EXCEPTIONS_FUNCTION]) ? $this->wp_options [AI_OPTION_EXCEPTIONS_FUNCTION] : AI_DEFAULT_INSERTION_ENABLED;
    return $option;
  }

  public function get_exceptions_function_text ($translated = true){
    switch ($this->get_exceptions_function ()) {
      case AI_DEFAULT_INSERTION_ENABLED:
        if (!$translated) return AI_TEXT_ENG_ENABLED;
        return AI_TEXT_ENABLED;
        break;
      case AI_DEFAULT_INSERTION_DISABLED:
        if (!$translated) return AI_TEXT_ENG_DISABLED;
        return AI_TEXT_DISABLED;
        break;
      default:
        return '';
        break;
    }
  }

  public function get_name_class () {
    $name = $this->get_ad_name ();

    if ($name == '') return '';

    return strtolower (str_replace ('--', '-', preg_replace ('/[^\-_a-zA-Z0-9]/', '', str_replace (' ', '-', html_entity_decode ($name)))));
  }

  public function get_viewport_classes () {
    global $ai_wp_data;

//    if ($ai_wp_data [AI_WP_AMP_PAGE]) return '';

    $viewport_classes = "";
    if ($this->get_detection_client_side ()) {
      $all_viewports = true;
      for ($viewport = 1; $viewport <= 6; $viewport ++) {
        $viewport_name = get_viewport_name ($viewport);
        if ($viewport_name != '') {
          if ($this->get_detection_viewport ($viewport)) $viewport_classes .= " ai-viewport-" . $viewport; else $all_viewports = false;
        }
      }
      if ($viewport_classes == "") $viewport_classes = " ai-viewport-0";
        elseif ($all_viewports) $viewport_classes = "";
    }
    return ($viewport_classes);
  }

  public function get_viewport_names () {
    global $ai_wp_data;

    if ($ai_wp_data [AI_WP_AMP_PAGE]) return '';

    $viewport_names = array ();
    if ($this->get_detection_client_side ()) {
      for ($viewport = 1; $viewport <= 6; $viewport ++) {
        $viewport_name = get_viewport_name ($viewport);
        if ($viewport_name != '') {
          if ($this->get_detection_viewport ($viewport)) $viewport_names []= $viewport_name;
        }
      }
    }
    return (implode (', ', $viewport_names));
  }

  public function get_alignment_class ($block_class_name = null){
    global $ai_wp_data;

    if (defined ('AI_AMP_HEADER_STYLES')    && AI_AMP_HEADER_STYLES     &&  $ai_wp_data [AI_WP_AMP_PAGE] ||
        defined ('AI_NORMAL_HEADER_STYLES') && AI_NORMAL_HEADER_STYLES  && !$ai_wp_data [AI_WP_AMP_PAGE] && !get_inline_styles ()) {
      return $this->generate_alignment_class ($block_class_name);
    }

    return '';
  }

  public function generate_alignment_class ($block_class_name = null){

    if ($block_class_name == null) $block_class_name = get_block_class_name (true);
    $block_class_name .= '-';

    switch ($this->get_alignment_type ()) {
      case AI_ALIGNMENT_DEFAULT:
      case AI_ALIGNMENT_LEFT:
      case AI_ALIGNMENT_RIGHT:
      case AI_ALIGNMENT_CENTER:
      case AI_ALIGNMENT_FLOAT_LEFT:
      case AI_ALIGNMENT_FLOAT_RIGHT:
      case AI_ALIGNMENT_STICKY_LEFT:
      case AI_ALIGNMENT_STICKY_RIGHT:
      case AI_ALIGNMENT_STICKY_TOP:
      case AI_ALIGNMENT_STICKY_BOTTOM:
        return $block_class_name . str_replace (' ', '-', strtolower ($this->get_alignment_type_text (false)));
        break;
      case AI_ALIGNMENT_STICKY:
//        return $block_class_name . str_replace (' ', '-', strtolower (md5 ($this->alignment_style ($this->get_alignment_type ()))));
        return $block_class_name . strtolower (md5 ($this->alignment_style ($this->get_alignment_type ())));
        break;
      case AI_ALIGNMENT_CUSTOM_CSS:
//        return $block_class_name . str_replace (' ', '-', strtolower (md5 ($this->get_custom_css ())));
        return $block_class_name . strtolower (md5 ($this->get_custom_css ()));
        break;
    }

    return '';
  }

  public function get_size_class ($block_class_name = null){
    global $ai_wp_data;

    if (defined ('AI_AMP_HEADER_STYLES')    && AI_AMP_HEADER_STYLES     &&  $ai_wp_data [AI_WP_AMP_PAGE] ||
        defined ('AI_NORMAL_HEADER_STYLES') && AI_NORMAL_HEADER_STYLES  && !$ai_wp_data [AI_WP_AMP_PAGE] && !get_inline_styles ()) {
      return $this->generate_size_class ($block_class_name);
    }

    return '';
  }

  public function generate_size_class ($block_class_name = null) {

    $size_background_style = $this->size_background_style ();

    if ($this->get_alignment_type () != AI_ALIGNMENT_CUSTOM_CSS && $size_background_style != '') {
      if ($block_class_name == null) $block_class_name = get_block_class_name (true);
      $block_class_name .= '-';

      return $block_class_name . ai_css_to_name ($size_background_style);
    }

    return '';
  }

  public function before_image ($content, $position_preview = false) {
    return $this->before_paragraph ($content, $position_preview, true);
  }

  public function before_paragraph ($content, $position_preview = false, $before_image = false) {
    global $ai_wp_data, $ai_last_check, $special_element_tags, $ad_inserter_globals;

    $debug_processing = ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0;

    $multibyte = $ai_wp_data [AI_MBSTRING_LOADED] && get_paragraph_counting_functions() == AI_MULTIBYTE_PARAGRAPH_COUNTING_FUNCTIONS;

    $paragraph_positions = array ();
    $active_paragraph_positions = array ();

    $dummy = array ();

    if ($before_image) {
      $paragraph_tags = 'figure,img,amp-img';
    } else $paragraph_tags = trim ($this->get_paragraph_tags());
    if ($paragraph_tags == '') return $content;

    $paragraph_start_strings = explode (",", $paragraph_tags);

    $ai_last_check = AI_CHECK_PARAGRAPH_TAGS;
    if (count ($paragraph_start_strings) == 0) return $content;

    get_paragraph_start_positions ($content, $multibyte, $dummy, $paragraph_start_strings, $paragraph_positions, $active_paragraph_positions);

    // Nothing to do
    $ai_last_check = AI_CHECK_PARAGRAPHS_WITH_TAGS;
    if (array_sum ($active_paragraph_positions) == 0) return $content;

    sort ($paragraph_positions);
    ksort ($active_paragraph_positions);
    $new_active_paragraph_positions = array ();
    foreach ($active_paragraph_positions as $active_paragraph_position) {
      $new_active_paragraph_positions [] = $active_paragraph_position;
    }
    $active_paragraph_positions = $new_active_paragraph_positions;


    if (!$this->get_count_inside_blockquote () || $before_image) {

      $special_element_offsets = array ();

      if ($before_image) {
        $special_element_tags_array = array_unique (array_merge ($special_element_tags, array ('figure', 'amp-img')));
      } else $special_element_tags_array = $special_element_tags;

      foreach ($special_element_tags_array as $special_element_tag) {
        preg_match_all ("/<\/?$special_element_tag/i", $content, $special_elements, PREG_OFFSET_CAPTURE);

        $nesting = array ();
        $special_elements = $special_elements [0];
        foreach ($special_elements as $index => $special_element) {
          if (isset ($special_elements [$index + 1][0])) {
            $tag1 = strtolower ($special_element [0]);
            $tag2 = strtolower ($special_elements [$index + 1][0]);

            $start_offset = $special_element [1];
            $nesting_ended = false;

            $tag1_start = $tag1 == "<$special_element_tag";
            $tag2_start = $tag2 == "<$special_element_tag";
            $tag1_end   = $tag1 == "</$special_element_tag";
            $tag2_end   = $tag2 == "</$special_element_tag";

            if ($tag1_start && $tag2_start) {
              array_push ($nesting, $start_offset);
              continue;
            }
            elseif ($tag1_end && $tag2_end) {
              $start_offset = array_pop ($nesting);
              if (count ($nesting) == 0) $nesting_ended = true;
            }

            if (count ($nesting) != 0) continue;

            if (($nesting_ended || $tag1_start) && $tag2_end) {

              if ($multibyte) {
                $special_element_offsets []= array (mb_strlen (substr ($content, 0, $start_offset)) + 1, mb_strlen (substr ($content, 0, $special_elements [$index + 1][1])));
              } else {
                  $special_element_offsets []= array ($start_offset + 1, $special_elements [$index + 1][1]);
                }
            }
          }
        }
      }

      if (count ($special_element_offsets) != 0) {

        $inside_special_element = array ();

        foreach ($special_element_offsets as $special_element_offset) {
          foreach ($paragraph_positions as $paragraph_position) {
            if ($paragraph_position >= $special_element_offset [0] && $paragraph_position <= $special_element_offset [1]) $inside_special_element [] = $paragraph_position;
          }
        }

        foreach ($paragraph_positions as $index => $paragraph_position) {
          if (in_array ($paragraph_position, $inside_special_element)) $active_paragraph_positions [$index] = 0;
        }
      }

      $ai_last_check = AI_CHECK_PARAGRAPHS_AFTER_NO_COUNTING_INSIDE;
      if (array_sum ($active_paragraph_positions) == 0) return $content;
    }

    $element_tags = $this->get_count_inside_elements ();
    if ($element_tags != '') {
      $special_element_tags_array = explode (',', str_replace (' ', '', $element_tags));

      $count_inside               = $this->get_count_inside ();
      $element_text_type          = $this->get_count_inside_elements_contain ();
      $check_only_tag_attributes  = $this->get_check_only_tag_attributes ();

      $element_text = str_replace (' ', '', html_entity_decode ($this->get_count_inside_elements_text ()));
      if (strpos ($element_text, ",") !== false) {
        $element_texts = explode (',', $element_text);
      }
      elseif (trim ($element_text) != '') $element_texts = array (trim ($element_text)); else $element_texts = array ();

      $special_element_offsets = array ();

      foreach ($special_element_tags_array as $special_element_tag) {
        preg_match_all ("/<\/?$special_element_tag/i", $content, $special_elements, PREG_OFFSET_CAPTURE);
        $special_elements = $special_elements [0];

        if (count ($special_elements) % 2 != 0) {
          if ($debug_processing) ai_log ('INVALID TAGS: ODD NUMBER OF ' . $special_element_tag . ' TAGS');
        }

        $elements = array ();
        $nesting = array ();
        foreach ($special_elements as $index => $special_element) {
          $tag = strtolower ($special_element [0]);
          $tag_start = $tag == "<$special_element_tag";
          $tag_end   = $tag == "</$special_element_tag";

          if ($tag_start) {
            array_push ($nesting, $index);
            continue;
          }

          if ($tag_end) {
            if (count ($nesting) != 0) {
              $start_tag_index = array_pop ($nesting);

              $elements []= array ($special_elements [$start_tag_index], $special_element);
            } else if ($debug_processing) ai_log ('INVALID TAGS: MISSING OPENING ' . $special_element_tag);
          }
        }

        foreach ($elements as $element) {
          $start_offset = $element [0][1];
          $end_offset   = $element [1][1];

          if ($multibyte) {
            $element_offsets = array (mb_strlen (substr ($content, 0, $start_offset)) + 1, mb_strlen (substr ($content, 0, $end_offset)));
          } else {
              $element_offsets = array ($start_offset + 1, $end_offset);
            }

          if (!empty ($element_texts)) {
            $check = false;
            foreach ($element_texts as $element_text) {
              $search_content = substr ($content, $element_offsets [0], $element_offsets [1] - $element_offsets [0]);

              if ($check_only_tag_attributes) {
                preg_match ('#([^>]+?)>#', $search_content, $search_content_tag);
                if (isset ($search_content_tag [1])) {
                  $search_content = $search_content_tag [1];
                }
              }

              if (stripos ($search_content, $element_text)) {
                $check = true;
                break;
              }
            }
            switch ($element_text_type) {
              case AI_CONTAIN:
                if ($check) {
                  $special_element_offsets []= $element_offsets;
                }
                break;
              default:
                if (!$check) {
                  $special_element_offsets []= $element_offsets;
                }
                break;
            }
          } else {
              $special_element_offsets []= $element_offsets;
            }
        }
      }

      $inside_special_element = array ();

      if (count ($special_element_offsets) != 0) {
        foreach ($special_element_offsets as $special_element_offset) {
          foreach ($paragraph_positions as $paragraph_position) {
            if ($paragraph_position >= $special_element_offset [0] + 1 && $paragraph_position <= $special_element_offset [1]) $inside_special_element [] = $paragraph_position;
          }
        }
      }

      foreach ($paragraph_positions as $index => $paragraph_position) {
        $paragraph_inside = in_array ($paragraph_position, $inside_special_element);
        switch ($count_inside) {
          case AI_COUNT_ONLY:
            if (!$paragraph_inside) $active_paragraph_positions [$index] = 0;
            break;
          default:
            if ($paragraph_inside) $active_paragraph_positions [$index] = 0;
            break;
        }
      }

      $ai_last_check = AI_CHECK_PARAGRAPHS_AFTER_NO_COUNTING_INSIDE_ELEMENTS;
      if (array_sum ($active_paragraph_positions) == 0) return $content;
    }


    if (!$before_image) {
      $paragraph_min_words = intval ($this->get_minimum_paragraph_words());
      $paragraph_max_words = intval ($this->get_maximum_paragraph_words());

      if ($paragraph_min_words != 0 || $paragraph_max_words != 0) {

        if (!isset ($paragraph_end_positions)) {
          $paragraph_end_positions = array ();
          get_paragraph_end_positions ($content, $multibyte, $paragraph_positions, $paragraph_start_strings, $paragraph_end_positions, $dummy);
        }

        foreach ($paragraph_positions as $index => $paragraph_position) {

          if ($active_paragraph_positions [$index] == 0) continue;

          if ($multibyte) {
            $paragraph_code = mb_substr ($content, $paragraph_position, $paragraph_end_positions [$index] - $paragraph_position + 1);
          } else {
              $paragraph_code = substr ($content, $paragraph_position, $paragraph_end_positions [$index] - $paragraph_position + 1);
            }

          if (!$this->check_number_of_words_in_paragraph ($paragraph_code, $paragraph_min_words, $paragraph_max_words)) $active_paragraph_positions [$index] = 0;
        }
      }

      // Nothing to do
      $ai_last_check = AI_CHECK_PARAGRAPHS_AFTER_MIN_MAX_WORDS;
      if (array_sum ($active_paragraph_positions) == 0) return $content;


      $paragraph_texts = explode (",", html_entity_decode ($this->get_paragraph_text()));
      if ($this->get_paragraph_text() != "" && count ($paragraph_texts) != 0) {

        if (!isset ($paragraph_end_positions)) {
          $paragraph_end_positions = array ();
          get_paragraph_end_positions   ($content, $multibyte, $paragraph_positions, $paragraph_start_strings, $paragraph_end_positions, $dummy);
        }

        $paragraph_text_type = $this->get_paragraph_text_type ();

        foreach ($paragraph_positions as $index => $paragraph_position) {

          if ($active_paragraph_positions [$index] == 0) continue;

          if ($multibyte) {
            $paragraph_code = mb_substr ($content, $paragraph_position, $paragraph_end_positions [$index] - $paragraph_position + 1);
          } else {
              $paragraph_code = substr ($content, $paragraph_position, $paragraph_end_positions [$index] - $paragraph_position + 1);
            }

          if ($paragraph_text_type == AI_CONTAIN) {
            $found = true;
            foreach ($paragraph_texts as $paragraph_text) {
              if (trim ($paragraph_text) == '') continue;

              $paragraph_text = trim ($paragraph_text);

              $invert = false;
              if ($paragraph_text [0] == '^') {
                $paragraph_text = substr ($paragraph_text, 1);
                $invert = true;
              }

              if ($multibyte) {
                $paragraph_text_found = mb_stripos ($paragraph_code, $paragraph_text) !== false;

                if ($invert) {
                  $paragraph_text_found = !$paragraph_text_found;
                }

                if (!$paragraph_text_found) {
                  $found = false;
                  break;
                }
              } else {
                  $paragraph_text_found = stripos ($paragraph_code, $paragraph_text) !== false;

                  if ($invert) {
                    $paragraph_text_found = !$paragraph_text_found;
                  }

                  if (!$paragraph_text_found) {
                    $found = false;
                    break;
                  }
                }
            }

            if (!$found) $active_paragraph_positions [$index] = 0;
          } elseif ($paragraph_text_type == AI_DO_NOT_CONTAIN) {
              $found = false;
              foreach ($paragraph_texts as $paragraph_text) {
                if (trim ($paragraph_text) == '') continue;

                $paragraph_text = trim ($paragraph_text);

                $invert = false;
                if ($paragraph_text [0] == '^') {
                  $paragraph_text = substr ($paragraph_text, 1);
                  $invert = true;
                }

                if ($multibyte) {
                  $paragraph_text_found = mb_stripos ($paragraph_code, $paragraph_text) !== false;

                  if ($invert) {
                    $paragraph_text_found = !$paragraph_text_found;
                  }

                  if ($paragraph_text_found) {
                    $found = true;
                    break;
                  }
                } else {
                    $paragraph_text_found = stripos ($paragraph_code, $paragraph_text) !== false;

                    if ($invert) {
                      $paragraph_text_found = !$paragraph_text_found;
                    }

                    if ($paragraph_text_found) {
                      $found = true;
                      break;
                    }
                  }
              }

              if ($found) $active_paragraph_positions [$index] = 0;
            }
        }
      }

      // Nothing to do
      $ai_last_check = AI_CHECK_PARAGRAPHS_AFTER_TEXT;
      if (array_sum ($active_paragraph_positions) == 0) return $content;
    } // !$before_image


    $position_text = trim ($this->get_paragraph_number());

    if ($before_image) {
      $direction_type = AI_DIRECTION_FROM_TOP;
    } else $direction_type = $this->get_direction_type();


    // Prepare $paragraph_end_positions
//    if ($position_preview || $position_text == '') {        // Prepare always
      if (!isset ($paragraph_end_positions)) {
        $paragraph_end_positions = array ();
        get_paragraph_end_positions ($content, $multibyte, $paragraph_positions, $paragraph_start_strings, $paragraph_end_positions, $dummy);
      }

      $filtered_paragraph_end_positions = array ();
      // Use $paragraph_positions for counting as it is checked for consistency
      foreach ($paragraph_positions as $index => $paragraph_position) {
        if ($active_paragraph_positions [$index]) $filtered_paragraph_end_positions [] = $paragraph_end_positions [$index];
      }
      $paragraph_end_positions = $filtered_paragraph_end_positions;

      if ($direction_type == AI_DIRECTION_FROM_BOTTOM) {
        $paragraph_end_positions = array_reverse ($paragraph_end_positions);
      }
//    }


    $filtered_paragraph_positions = array ();
    foreach ($paragraph_positions as $index => $paragraph_position) {
      if ($active_paragraph_positions [$index]) $filtered_paragraph_positions [] = $paragraph_position;
    }
    $paragraph_positions = $filtered_paragraph_positions;


    if ($direction_type == AI_DIRECTION_FROM_BOTTOM) {
      $paragraph_positions = array_reverse ($paragraph_positions);
    }

//  $positions contains indexes in $paragraph_positions
    $positions = array ();

    if (!$position_preview) {
      $position = $position_text;

      if (is_numeric ($position)) {
        if ($position > 0 && $position < 1) {
          $position = intval ($position * (count ($paragraph_positions) - 1) + 0.5);
        }
        elseif ($position > - 1 && $position < 0) {
          $position = intval (count ($paragraph_positions) + $position * (count ($paragraph_positions) - 1) - 0.5);
        }
        elseif ($position <= - 1) {
          $position = count ($paragraph_positions) + $position;
        }
        elseif ($position == 0) {
          $position = mt_rand (0, count ($paragraph_positions) - 1);
        }
        else $position --;

        $positions = array ($position);
      }
      elseif (strpos ($position_text, ',') !== false) {
        $new_positions = array ();
        $positions = explode (',', str_replace (' ', '', $position_text));
        foreach ($positions as $index => $position) {
          if (isset ($position [0]) && $position [0] == '%') {
            unset ($positions [$index]);

            $position = substr ($position, 1);
            $mod_value = $position;
            $offset_value = 0;

            if (strpos ($mod_value, '@') !== false) {
              $mod_value_array = explode ('@', $mod_value);
              $mod_value = $mod_value_array [0];
              $offset_value = $mod_value_array [1];
            }

            if (is_numeric ($mod_value) && $mod_value > 0 && is_numeric ($offset_value)) {
              foreach ($paragraph_positions as $index => $paragraph_position) {
                if ($index + 1 < $offset_value) continue;
                if (($index + 1 - $offset_value) % $mod_value == 0) $new_positions []= $index;
              }
            }
          }
          elseif (is_numeric ($position) && $position > 0 && $position < 1) {
            $positions [$index] = intval ($position * (count ($paragraph_positions) - 1) + 0.5);
          }
          elseif (is_numeric ($position) && $position > - 1 && $position < 0) {
            $positions [$index] = intval (count ($paragraph_positions) + $position * (count ($paragraph_positions) - 1) - 0.5);
          }
          elseif (is_numeric ($position) && $position <= - 1) {
            $positions [$index] = count ($paragraph_positions) + $position;
          }
          elseif ($position == 0) {
            $positions [$index] = mt_rand (0, count ($paragraph_positions) - 1);
          }
          else $positions [$index] = (int) $position - 1;
        }
        $positions = array_unique (array_merge ($positions, $new_positions));
        sort ($positions);
      }
      elseif (isset ($position_text [0]) && $position_text [0] == '%') {
        $position_text = substr ($position_text, 1);
        $mod_value = $position_text;
        $offset_value = 0;

        if (strpos ($mod_value, '@') !== false) {
          $mod_value_array = explode ('@', $mod_value);
          $mod_value = $mod_value_array [0];
          $offset_value = $mod_value_array [1];
        }

        if (is_numeric ($mod_value) && $mod_value > 0 && is_numeric ($offset_value)) {
          foreach ($paragraph_positions as $index => $paragraph_position) {
            if ($index + 1 < $offset_value) continue;
            if (($index + 1 - $offset_value) % $mod_value == 0) $positions []= $index;
          }
        }
      }
      elseif ($position_text == '') {
        $positions = array ();

        $min_words_above = $this->get_minimum_words_above ();
        if (!empty ($min_words_above) && !$before_image) {
          $words_above = 0;
          foreach ($paragraph_positions as $index => $paragraph_position) {

            if ($direction_type != AI_DIRECTION_FROM_BOTTOM) {
              if ($words_above >= $min_words_above) {
                $positions []= $index;
                $words_above = 0;
              }
            }

            if ($multibyte) {
              $paragraph_code = mb_substr ($content, $paragraph_position, $paragraph_end_positions [$index] - $paragraph_position + 1);
            } else {
                $paragraph_code = substr ($content, $paragraph_position, $paragraph_end_positions [$index] - $paragraph_position + 1);
              }

            $words_above += number_of_words ($paragraph_code);

            if ($direction_type == AI_DIRECTION_FROM_BOTTOM) {
              if ($words_above >= $min_words_above) {
                $positions []= $index;
                $words_above = 0;
              }
            }

          }
        } else
        foreach ($paragraph_positions as $index => $paragraph_position) {
          $positions []= $index;
        }

        $filter_settings = trim (str_replace (' ', '', $this->get_call_filter()));
        if (!empty ($filter_settings)) {

          $filter_counter = $before_image ? AI_FILTER_IMAGES : AI_FILTER_PARAGRAPHS;

          if ($this->get_filter_type() == $filter_counter) {
            $filter_values = array ();
            if (strpos ($filter_settings, ",") !== false) {
              $filter_values = explode (",", $filter_settings);
            } else $filter_values []= $filter_settings;

            $inverted_filter = $this->get_inverted_filter();
            $filtered_positions = array ();

            foreach ($positions as $index => $position) {
              $insert = false;
              if (in_array ($index + 1, $filter_values)) {
                $insert = true;
              } else {
                  foreach ($filter_values as $filter_value) {
                    $filter_value = trim ($filter_value);
                    if (isset ($filter_value [0]) && $filter_value [0] == '%') {
                      $mod_value = substr ($filter_value, 1);
                      if (is_numeric ($mod_value) && $mod_value > 0) {
                        if (($index + 1) % $mod_value == 0) {
                          $insert = true;
                          break;
                        }
                      }
                    }
                  }
                }
              if ($insert xor $inverted_filter) $filtered_positions []= $position;
            }
            $positions = $filtered_positions;
          }
        }
      }
    }


    $debug_processing = ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0;

    if (!empty ($positions) && !$before_image) {

//      if (!isset ($paragraph_end_positions)) {
//        $paragraph_end_positions = array ();
//        get_paragraph_end_positions ($content, $multibyte, $paragraph_positions, $paragraph_start_strings, $paragraph_end_positions, $dummy);
//      }

      $avoid_paragraphs_above = intval ($this->get_avoid_paragraphs_above());
      $avoid_paragraphs_below = intval ($this->get_avoid_paragraphs_below());

      $avoid_text_above = $this->get_avoid_text_above();
      $avoid_text_below = $this->get_avoid_text_below();
      $avoid_paragraph_texts_above = explode (",", html_entity_decode (trim ($avoid_text_above)));
      $avoid_paragraph_texts_below = explode (",", html_entity_decode (trim ($avoid_text_below)));

      $check_direction = $this->get_avoid_direction();
      $max_checks      = $this->get_avoid_try_limit();

      $check_strictly_inside_paragraphs = false;

      $failed_clearance_positions = array ();

      foreach ($positions as $position_index => $position) {

        $direction = $check_direction;

        if (($avoid_paragraphs_above != 0 || $avoid_paragraphs_below != 0) && count ($paragraph_positions) > $position) {

          if ($debug_processing && $this->number != 0) {
            ai_log ('---------------------------------');
            ai_log ('BLOCK ' . $this->number . ' CLEARANCE CHECK POSITION ' . ($position + 1));
          }

          $checks = $max_checks;
          $saved_position = $position;
          do {

            $found_above = false;
            $paragraph_text_found_above = '';
            if ($position != 0 && $avoid_paragraphs_above != 0 && $avoid_text_above != "" && is_array ($avoid_paragraph_texts_above) && count ($avoid_paragraph_texts_above) != 0) {

              for ($avoid_paragraph_above = $avoid_paragraphs_above; $avoid_paragraph_above > 0; $avoid_paragraph_above --) {
                $paragraph_position_above = $position - $avoid_paragraph_above;

                if (!$check_strictly_inside_paragraphs) {
                  if ($paragraph_position_above < 0) {
                    // If paragraph position is not the first one start with the first paragraph
                    if ($position != 0) $paragraph_position_above = 0;
                    // Othewise do not check anything
                  }
                }

                if ($paragraph_position_above >= 0) {

                  if ($check_strictly_inside_paragraphs) {
                    $start_position_above = $paragraph_positions     [$paragraph_position_above];
                    $end_position_above   = $paragraph_end_positions [$paragraph_position_above];
                  } else {
                      $start_position_above = $paragraph_positions [$paragraph_position_above];
                      $end_position_above   = $paragraph_positions [$position];
                    }

                  if ($multibyte) {
                    $paragraph_code = mb_substr ($content, $start_position_above, $end_position_above - $start_position_above);
                  } else {
                      $paragraph_code = substr ($content, $start_position_above, $end_position_above - $start_position_above);
                    }

                  foreach ($avoid_paragraph_texts_above as $paragraph_text_above) {
                    if (trim ($paragraph_text_above) == '') continue;
                    if ($multibyte) {
                      if (mb_stripos ($paragraph_code, trim ($paragraph_text_above)) !== false) {
                        $found_above = true;
                        $paragraph_text_found_above = $paragraph_text_above;
                        break;
                      }
                    } else {
                        if (stripos ($paragraph_code, trim ($paragraph_text_above)) !== false) {
                          $found_above = true;
                          $paragraph_text_found_above = $paragraph_text_above;
                          break;
                        }
                      }
                  }
                }

                if ($found_above || !$check_strictly_inside_paragraphs) break;
              }
            }

            $found_below = false;
            $paragraph_text_found_below = '';
            if ($avoid_paragraphs_below != 0 && $avoid_text_below != "" && is_array ($avoid_paragraph_texts_below) && count ($avoid_paragraph_texts_below) != 0) {

              for ($avoid_paragraph_below = $avoid_paragraphs_below; $avoid_paragraph_below > 0; $avoid_paragraph_below --) {
                $paragraph_position_below = $position + $avoid_paragraph_below - 1;

                if (!$check_strictly_inside_paragraphs) {
                  if ($paragraph_position_below >= count ($paragraph_positions)) $paragraph_position_below = count ($paragraph_positions) - 1;
                }

                if ($paragraph_position_below < count ($paragraph_positions)) {

                  if ($check_strictly_inside_paragraphs) {
                    $start_position_below = $paragraph_positions     [$paragraph_position_below];
                    $end_position_below   = $paragraph_end_positions [$paragraph_position_below];
                  } else {
                      $start_position_below = $paragraph_positions     [$position];
                      $end_position_below   = $paragraph_end_positions [$paragraph_position_below];
                    }

                  if ($multibyte) {
                    $paragraph_code = mb_substr ($content, $start_position_below, $end_position_below - $start_position_below);
                  } else {
                      $paragraph_code = substr ($content, $start_position_below, $end_position_below - $start_position_below);
                    }

                  foreach ($avoid_paragraph_texts_below as $paragraph_text_below) {
                    if (trim ($paragraph_text_below) == '') continue;

                    if ($multibyte) {
                      if (mb_stripos ($paragraph_code, trim ($paragraph_text_below)) !== false) {
                        $found_below = true;
                        $paragraph_text_found_below = $paragraph_text_below;
                        break;
                      }
                    } else {
                        if (stripos ($paragraph_code, trim ($paragraph_text_below)) !== false) {
                          $found_below = true;
                          $paragraph_text_found_below = $paragraph_text_below;
                          break;
                        }
                      }
                  }
                }

                if ($found_below || !$check_strictly_inside_paragraphs) break;
              }
            }


//            echo "position: $position = before #", $position + 1, "<br />\n";
//            echo "checks: $checks<br />\n";
//            echo "direction: $direction<br />\n";
//            if ($found_above)
//            echo "found_above<br />\n";
//            if ($found_below)
//            echo "found_below<br />\n";
//            echo "=================<br />\n";


            if ($found_above || $found_below) {

              if ($debug_processing && $this->number != 0) ai_log ('BLOCK ' . $this->number . ' CLEARANCE CHECK POSITION ' . ($position + 1) .
                ' FAILED (' . ($found_above ? 'ABOVE: ' . $paragraph_text_found_above .($found_below ? ', ' : '') : '') . ($found_below ? 'BELOW: ' . $paragraph_text_found_below : '') . ')');

              $ai_last_check = AI_CHECK_DO_NOT_INSERT;
              if ($this->get_avoid_action() == AI_DO_NOT_INSERT) {
                $failed_clearance_positions [$positions [$position_index]] = $ai_last_check;
                $positions [$position_index] = - 1;
                break;
              }

              switch ($direction) {
                case AI_ABOVE: // Try above
                  $ai_last_check = AI_CHECK_AD_ABOVE;
                  // Already at the top - do not insert
                  if ($position == 0) {
                    $failed_clearance_positions [$positions [$position_index]] = $ai_last_check;
                    $positions [$position_index] = - 1;
                    break 2;
                  }

                  $position --;
                  break;
                case AI_BELOW: // Try below
                  $ai_last_check = AI_CHECK_AD_BELOW;
                  // Already at the bottom - do not insert
                  if ($position >= count ($paragraph_positions) - 1) {
                    $failed_clearance_positions [$positions [$position_index]] = $ai_last_check;
                    $positions [$position_index] = - 1;
                    break 2;
                  }

                  $position ++;
                  break;
                case AI_ABOVE_AND_THEN_BELOW: // Try first above and then below
                  if ($position == 0 || $checks == 0) {
                    // Try below
                    $direction = AI_BELOW;
                    $checks = $max_checks;
                    $position = $saved_position;
                    $ai_last_check = AI_CHECK_AD_BELOW;
                    // Already at the bottom - do not insert
                    if ($position >= count ($paragraph_positions) - 1) {
                      $failed_clearance_positions [$positions [$position_index]] = $ai_last_check;
                      $positions [$position_index] = - 1;
                      break 2;
                    }

                    $position ++;
                  } else $position --;
                  break;
                case AI_BELOW_AND_THEN_ABOVE: // Try first below and then above
                  if ($position >= count ($paragraph_positions) - 1 || $checks == 0) {
                    // Try above
                    $direction = AI_ABOVE;
                    $checks = $max_checks;
                    $position = $saved_position;
                    $ai_last_check = AI_CHECK_AD_ABOVE;
                    // Already at the top - do not insert
                    if ($position == 0) {
                      $failed_clearance_positions [$positions [$position_index]] = $ai_last_check;
                      $positions [$position_index] = - 1;
                      break 2;
                    }

                    $position --;
                  } else $position ++;
                  break;
              }
            } else {
                if ($debug_processing && $this->number != 0) ai_log ('BLOCK ' . $this->number . ' CLEARANCE CHECK POSITION ' . ($position + 1) . ' OK');

                // Text not found - insert
                $positions [$position_index] = $position;
                break;
              }

            // Try next position
            if ($checks <= 0) {
              // Suitable position not found - do not insert
              $failed_clearance_positions [$positions [$position_index]] = $ai_last_check;
              $positions [$position_index] = - 1;
              break;
            }

            $checks --;
          } while (true);
        }

        // Nothing to do
        $ai_last_check = AI_CHECK_PARAGRAPHS_AFTER_CLEARANCE;
        if (count ($paragraph_positions) == 0) return $content;
      }

      if ($debug_processing && $this->number != 0) ai_log ('---------------------------------');
    }


    if (!$before_image) {
      $no_insertion_first_paragraphs = intval ($this->get_skip_first_paragraphs ());
      $no_insertion_last_paragraphs  = intval ($this->get_skip_last_paragraphs ());

      if ($no_insertion_first_paragraphs != 0 /*&& $no_insertion_first_paragraphs <= count ($paragraph_positions)*/) {
        foreach ($positions as $index => $position) {
          if ($position < $no_insertion_first_paragraphs) unset ($positions [$index]);
        }
        $positions = array_values ($positions);
      }

      if ($no_insertion_last_paragraphs != 0 /*&& $no_insertion_last_paragraphs <= count ($paragraph_positions)*/) {
        foreach ($positions as $index => $position) {
          if ($position >= count ($paragraph_positions) - $no_insertion_last_paragraphs) unset ($positions [$index]);
        }
        $positions = array_values ($positions);
      }
    }


    if ($position_preview || !empty ($positions)) {
      $offset = 0;
      if (!empty ($positions)) $ai_last_check = AI_CHECK_PARAGRAPH_NUMBER;

      $real_positions = array ();
      foreach ($positions as $position_index) $real_positions []= $position_index >= 0 ? $position_index + 1 : '*';
      if ($debug_processing && $this->number != 0 && count ($real_positions) != 0) ai_log ('BLOCK ' . $this->number . ' INSERTION POSITIONS: ' . implode (', ', $real_positions));

      $min_paragraphs = intval ($this->get_paragraph_number_minimum());
      $max_paragraphs = intval ($this->get_paragraph_number_maximum());
      $max_page_blocks_enabled = $this->get_max_page_blocks_enabled ();

      foreach ($paragraph_positions as $counter => $paragraph_position) {
        if ($position_preview) {
          if ($multibyte) {
            $paragraph_code = mb_substr ($content, $paragraph_position + $offset, $paragraph_end_positions [$counter] - $paragraph_position + 1);
          } else {
              $paragraph_code = substr ($content, $paragraph_position + $offset, $paragraph_end_positions [$counter] - $paragraph_position + 1);
            }

          $paragraph_words = number_of_words ($paragraph_code);
          $debug_label = $before_image ? 'BI' : 'BP';
          $inserted_code = "[[AI_".$debug_label.($counter + 1)."=".$paragraph_words."]]";
        }
        elseif (!empty ($positions) && in_array ($counter, $positions)) {

          $inserted = false;

          $ai_last_check = AI_CHECK_PARAGRAPHS_MIN_NUMBER;
          if (count ($paragraph_positions) >= $min_paragraphs) {

            $ai_last_check = AI_CHECK_PARAGRAPHS_MAX_NUMBER;
            if ($max_paragraphs <= 0 || count ($paragraph_positions) <= $max_paragraphs) {

              $ai_last_check = AI_CHECK_MAX_PAGE_BLOCKS;
              if (!$max_page_blocks_enabled || $ai_wp_data [AI_PAGE_BLOCKS] < get_max_page_blocks ()) {
                // Last check before insertion
                if ($this->check_and_increment_block_counter ()) {
                  // Increment page block counter
                  if ($max_page_blocks_enabled) $ai_wp_data [AI_PAGE_BLOCKS] ++;

                  $ai_last_check = AI_CHECK_DEBUG_NO_INSERTION;
                  if (!$this->get_debug_disable_insertion ()) {
                    $inserted_code = $this->get_code_for_serverside_insertion ();
                    $ai_last_check = AI_CHECK_INSERTED;
                    $this->clear_code_cache ();
                    $inserted = true;
                  }
                }
              }
            }
          }

          if ($debug_processing) ai_log (ai_log_block_status ($this->number, $ai_last_check));

          if (!$inserted) continue;
        }
        else {
          if ($debug_processing && isset ($failed_clearance_positions [$counter])) ai_log (ai_log_block_status ($this->number, $failed_clearance_positions [$counter]));
          continue;
        }

        if ($multibyte) {
          if ($direction_type == AI_DIRECTION_FROM_BOTTOM) {
            $content = mb_substr ($content, 0, $paragraph_position) . $inserted_code . mb_substr ($content, $paragraph_position);
          } else {
              $content = mb_substr ($content, 0, $paragraph_position + $offset) . $inserted_code . mb_substr ($content, $paragraph_position + $offset);
              $offset += mb_strlen ($inserted_code);
            }
        } else {
            if ($direction_type == AI_DIRECTION_FROM_BOTTOM) {
              $content = substr_replace ($content, $inserted_code, $paragraph_position, 0);
            } else {
                $content = substr_replace ($content, $inserted_code, $paragraph_position + $offset, 0);
                $offset += strlen ($inserted_code);
              }
          }
      }

      $ai_last_check = AI_CHECK_NONE;  // Already logged on each insertion
      return $content;
    }

    // empty $positions
    $ai_last_check = AI_CHECK_NO_PARAGRAPHS;
    return $content;
  }

  public function after_image ($content, $position_preview = false) {
    return $this->after_paragraph ($content, $position_preview, true);
  }

  public function after_paragraph ($content, $position_preview = false, $after_image = false) {
    global $ai_wp_data, $ai_last_check, $special_element_tags;

    $debug_processing = ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0;

    $multibyte = $ai_wp_data [AI_MBSTRING_LOADED] && get_paragraph_counting_functions() == AI_MULTIBYTE_PARAGRAPH_COUNTING_FUNCTIONS;

    $paragraph_positions = array ();
    $active_paragraph_positions = array ();

    $dummy = array ();

    if ($multibyte) {
      $last_content_position = mb_strlen ($content) - 1;
    } else {
        $last_content_position = strlen ($content) - 1;
      }

    if ($after_image) {
      $paragraph_tags = 'figure,img,amp-img';
    } else $paragraph_tags = trim ($this->get_paragraph_tags());
    if ($paragraph_tags == '') return $content;

    $paragraph_end_strings = explode (",", $paragraph_tags);

    $ai_last_check = AI_CHECK_PARAGRAPH_TAGS;
    if (count ($paragraph_end_strings) == 0) return $content;

    get_paragraph_end_positions ($content, $multibyte, $dummy, $paragraph_end_strings, $paragraph_positions, $active_paragraph_positions);

    // Nothing to do
    $ai_last_check = AI_CHECK_PARAGRAPHS_WITH_TAGS;
    if (array_sum ($active_paragraph_positions) == 0) return $content;

    sort ($paragraph_positions);
    ksort ($active_paragraph_positions);
    $new_active_paragraph_positions = array ();
    foreach ($active_paragraph_positions as $active_paragraph_position) {
      $new_active_paragraph_positions [] = $active_paragraph_position;
    }
    $active_paragraph_positions = $new_active_paragraph_positions;


    if (!$this->get_count_inside_blockquote () || $after_image) {

      $special_element_offsets = array ();

      if ($after_image) {
        $special_element_tags_array = array_unique (array_merge ($special_element_tags, array ('figure', 'amp-img')));
      } else $special_element_tags_array = $special_element_tags;

      foreach ($special_element_tags_array as $special_element_tag) {
        preg_match_all ("/<\/?$special_element_tag/i", $content, $special_elements, PREG_OFFSET_CAPTURE);

        $nesting = array ();
        $special_elements = $special_elements [0];
        foreach ($special_elements as $index => $special_element) {
          if (isset ($special_elements [$index + 1][0])) {
            $tag1 = strtolower ($special_element [0]);
            $tag2 = strtolower ($special_elements [$index + 1][0]);

            $start_offset = $special_element [1];
            $nesting_ended = false;

            $tag1_start = $tag1 == "<$special_element_tag";
            $tag2_start = $tag2 == "<$special_element_tag";
            $tag1_end   = $tag1 == "</$special_element_tag";
            $tag2_end   = $tag2 == "</$special_element_tag";

            if ($tag1_start && $tag2_start) {
              array_push ($nesting, $start_offset);
              continue;
            }
            elseif ($tag1_end && $tag2_end) {
              $start_offset = array_pop ($nesting);
              if (count ($nesting) == 0) $nesting_ended = true;
            }

            if (count ($nesting) != 0) continue;

            if (($nesting_ended || $tag1_start) && $tag2_end) {

              if ($multibyte) {
                $special_element_offsets []= array (mb_strlen (substr ($content, 0, $start_offset)), mb_strlen (substr ($content, 0, $special_elements [$index + 1][1])));
              } else {
                  $special_element_offsets []= array ($start_offset, $special_elements [$index + 1][1]);
                }
            }
          }
        }
      }

      if (count ($special_element_offsets) != 0) {

        $inside_special_element = array ();

        foreach ($special_element_offsets as $special_element_offset) {
          foreach ($paragraph_positions as $paragraph_position) {
            if ($paragraph_position >= $special_element_offset [0] && $paragraph_position <= $special_element_offset [1]) $inside_special_element [] = $paragraph_position;
          }
        }

        foreach ($paragraph_positions as $index => $paragraph_position) {
          if (in_array ($paragraph_position, $inside_special_element)) $active_paragraph_positions [$index] = 0;
        }
      }

      $ai_last_check = AI_CHECK_PARAGRAPHS_AFTER_NO_COUNTING_INSIDE;
      if (array_sum ($active_paragraph_positions) == 0) return $content;
    }

    $element_tags = $this->get_count_inside_elements ();
    if ($element_tags != '') {
      $special_element_tags_array = explode (',', str_replace (' ', '', $element_tags));

      $count_inside               = $this->get_count_inside ();
      $element_text_type          = $this->get_count_inside_elements_contain ();
      $check_only_tag_attributes  = $this->get_check_only_tag_attributes ();

      $element_text = str_replace (' ', '', html_entity_decode ($this->get_count_inside_elements_text ()));
      if (strpos ($element_text, ",") !== false) {
        $element_texts = explode (',', $element_text);
      }
      elseif (trim ($element_text) != '') $element_texts = array (trim ($element_text)); else $element_texts = array ();

      $special_element_offsets = array ();

      foreach ($special_element_tags_array as $special_element_tag) {
        preg_match_all ("/<\/?$special_element_tag/i", $content, $special_elements, PREG_OFFSET_CAPTURE);
        $special_elements = $special_elements [0];

        if (count ($special_elements) % 2 != 0) {
          if ($debug_processing) ai_log ('INVALID TAGS: ODD NUMBER OF ' . $special_element_tag . ' TAGS');
        }

        $elements = array ();
        $nesting = array ();
        foreach ($special_elements as $index => $special_element) {
          $tag = strtolower ($special_element [0]);
          $tag_start = $tag == "<$special_element_tag";
          $tag_end   = $tag == "</$special_element_tag";

          if ($tag_start) {
            array_push ($nesting, $index);
            continue;
          }

          if ($tag_end) {
            if (count ($nesting) != 0) {
              $start_tag_index = array_pop ($nesting);

              $elements []= array ($special_elements [$start_tag_index], $special_element);
            } else if ($debug_processing) ai_log ('INVALID TAGS: MISSING OPENING ' . $special_element_tag);
          }
        }

        foreach ($elements as $element) {
          $start_offset = $element [0][1];
          $end_offset   = $element [1][1];

          if ($multibyte) {
            $element_offsets = array (mb_strlen (substr ($content, 0, $start_offset)), mb_strlen (substr ($content, 0, $end_offset)));
          } else {
              $element_offsets = array ($start_offset, $end_offset);
            }

          if (!empty ($element_texts)) {
            $check = false;
            foreach ($element_texts as $element_text) {
              $search_content = substr ($content, $element_offsets [0], $element_offsets [1] - $element_offsets [0]);

              if ($check_only_tag_attributes) {
                preg_match ('#([^>]+?)>#', $search_content, $search_content_tag);
                if (isset ($search_content_tag [1])) {
                  $search_content = $search_content_tag [1];
                }
              }

              if (stripos ($search_content, $element_text)) {
                $check = true;
                break;
              }
            }
            switch ($element_text_type) {
              case AI_CONTAIN:
                if ($check) {
                  $special_element_offsets []= $element_offsets;
                }
                break;
              default:
                if (!$check) {
                  $special_element_offsets []= $element_offsets;
                }
                break;
            }
          } else {
              $special_element_offsets []= $element_offsets;
            }
        }
      }

      $inside_special_element = array ();

      if (count ($special_element_offsets) != 0) {
        foreach ($special_element_offsets as $special_element_offset) {
          foreach ($paragraph_positions as $paragraph_position) {
            if ($paragraph_position >= $special_element_offset [0] && $paragraph_position <= $special_element_offset [1]) $inside_special_element [] = $paragraph_position;
          }
        }
      }

      foreach ($paragraph_positions as $index => $paragraph_position) {
        $paragraph_inside = in_array ($paragraph_position, $inside_special_element);
        switch ($count_inside) {
          case AI_COUNT_ONLY:
            if (!$paragraph_inside) $active_paragraph_positions [$index] = 0;
            break;
          default:
            if ($paragraph_inside) $active_paragraph_positions [$index] = 0;
            break;
        }
      }

      $ai_last_check = AI_CHECK_PARAGRAPHS_AFTER_NO_COUNTING_INSIDE_ELEMENTS;
      if (array_sum ($active_paragraph_positions) == 0) return $content;
    }

    if (!$after_image) {
      $paragraph_min_words = intval ($this->get_minimum_paragraph_words());
      $paragraph_max_words = intval ($this->get_maximum_paragraph_words());

      if ($paragraph_min_words != 0 || $paragraph_max_words != 0) {

        if (!isset ($paragraph_start_positions)) {
          $paragraph_start_positions = array ();
          get_paragraph_start_positions ($content, $multibyte, $paragraph_positions, $paragraph_end_strings, $paragraph_start_positions, $dummy);
        }

        foreach ($paragraph_positions as $index => $paragraph_position) {

          if ($active_paragraph_positions [$index] == 0) continue;

          if ($multibyte) {
            $paragraph_code = mb_substr ($content, $paragraph_start_positions [$index], $paragraph_position - $paragraph_start_positions [$index] + 1);
          } else {
              $paragraph_code = substr ($content, $paragraph_start_positions [$index], $paragraph_position - $paragraph_start_positions [$index] + 1);
            }

          if (!$this->check_number_of_words_in_paragraph ($paragraph_code, $paragraph_min_words, $paragraph_max_words)) $active_paragraph_positions [$index] = 0;
        }

      }

      // Nothing to do
      $ai_last_check = AI_CHECK_PARAGRAPHS_AFTER_MIN_MAX_WORDS;
      if (array_sum ($active_paragraph_positions) == 0) return $content;


      $paragraph_texts = explode (",", html_entity_decode ($this->get_paragraph_text()));
      if ($this->get_paragraph_text() != "" && count ($paragraph_texts) != 0) {

        if (!isset ($paragraph_start_positions)) {
          $paragraph_start_positions = array ();
          get_paragraph_start_positions ($content, $multibyte, $paragraph_positions, $paragraph_end_strings, $paragraph_start_positions, $dummy);
        }

        $paragraph_text_type = $this->get_paragraph_text_type ();

        foreach ($paragraph_positions as $index => $paragraph_position) {

          if ($active_paragraph_positions [$index] == 0) continue;

          if ($multibyte) {
            $paragraph_code = mb_substr ($content, $paragraph_start_positions [$index], $paragraph_position - $paragraph_start_positions [$index] + 1);
          } else {
              $paragraph_code = substr ($content, $paragraph_start_positions [$index], $paragraph_position - $paragraph_start_positions [$index] + 1);
            }

          if ($paragraph_text_type == AI_CONTAIN) {
            $found = true;
            foreach ($paragraph_texts as $paragraph_text) {
              if (trim ($paragraph_text) == '') continue;

              $paragraph_text = trim ($paragraph_text);

              $invert = false;
              if ($paragraph_text [0] == '^') {
                $paragraph_text = substr ($paragraph_text, 1);
                $invert = true;
              }

              if ($multibyte) {
                $paragraph_text_found = mb_stripos ($paragraph_code, $paragraph_text) !== false;

                if ($invert) {
                  $paragraph_text_found = !$paragraph_text_found;
                }

                if (!$paragraph_text_found) {
                  $found = false;
                  break;
                }
              } else {
                  $paragraph_text_found = stripos ($paragraph_code, $paragraph_text) !== false;

                  if ($invert) {
                    $paragraph_text_found = !$paragraph_text_found;
                  }

                  if (!$paragraph_text_found) {
                    $found = false;
                    break;
                  }
                }
            }

            if (!$found) $active_paragraph_positions [$index] = 0;
          } elseif ($paragraph_text_type == AI_DO_NOT_CONTAIN) {
              $found = false;
              foreach ($paragraph_texts as $paragraph_text) {
                if (trim ($paragraph_text) == '') continue;

                $paragraph_text = trim ($paragraph_text);

                $invert = false;
                if ($paragraph_text [0] == '^') {
                  $paragraph_text = substr ($paragraph_text, 1);
                  $invert = true;
                }

                if ($multibyte) {
                  $paragraph_text_found = mb_stripos ($paragraph_code, $paragraph_text) !== false;

                  if ($invert) {
                    $paragraph_text_found = !$paragraph_text_found;
                  }

                  if ($paragraph_text_found) {
                    $found = true;
                    break;
                  }
                } else {
                    $paragraph_text_found = stripos ($paragraph_code, $paragraph_text) !== false;

                    if ($invert) {
                      $paragraph_text_found = !$paragraph_text_found;
                    }

                    if ($paragraph_text_found) {
                      $found = true;
                      break;
                    }
                  }
              }
              if ($found) $active_paragraph_positions [$index] = 0;
            }
        }
      }

      // Nothing to do
      $ai_last_check = AI_CHECK_PARAGRAPHS_AFTER_TEXT;
      if (array_sum ($active_paragraph_positions) == 0) return $content;
    } // !$after_image


    $position_text = trim ($this->get_paragraph_number());

    if ($after_image) {
      $direction_type = AI_DIRECTION_FROM_TOP;
    } else $direction_type = $this->get_direction_type();


    // Prepare $paragraph_start_positions
//    if ($position_preview || $position_text == '') {            // Prepare always
      if (!isset ($paragraph_start_positions)) {
        $paragraph_start_positions = array ();
        get_paragraph_start_positions ($content, $multibyte, $paragraph_positions, $paragraph_end_strings, $paragraph_start_positions, $dummy);
      }

      $filtered_paragraph_positions = array ();
      // Use $paragraph_positions for counting as it is checked for consistency
      foreach ($paragraph_positions as $index => $paragraph_position) {
        if ($active_paragraph_positions [$index]) $filtered_paragraph_positions [] = $paragraph_start_positions [$index];
      }
      $paragraph_start_positions = $filtered_paragraph_positions;

      if ($direction_type == AI_DIRECTION_FROM_BOTTOM) {
        $paragraph_start_positions = array_reverse ($paragraph_start_positions);
      }
//    }


    $filtered_paragraph_positions = array ();
    foreach ($paragraph_positions as $index => $paragraph_position) {
      if ($active_paragraph_positions [$index]) $filtered_paragraph_positions [] = $paragraph_position;
    }
    $paragraph_positions = $filtered_paragraph_positions;


    if ($direction_type == AI_DIRECTION_FROM_BOTTOM) {
      $paragraph_positions = array_reverse ($paragraph_positions);
    }

//  $positions contains indexes in $paragraph_positions
    $positions = array ();

    if (!$position_preview) {
      $position = $position_text;

      if (is_numeric ($position)) {
        if ($position > 0 && $position < 1) {
          $position = intval ($position * (count ($paragraph_positions) - 1) + 0.5);
        }
        elseif ($position > - 1 && $position < 0) {
          $position = intval (count ($paragraph_positions) + $position * (count ($paragraph_positions) - 1) - 0.5);
        }
        elseif ($position <= - 1) {
          $position = count ($paragraph_positions) + $position;
        }
        elseif ($position == 0) {
          $position = mt_rand (0, count ($paragraph_positions) - 1);
        }
        else $position --;

        $positions = array ($position);
      }
      elseif (strpos ($position_text, ',') !== false) {
        $new_positions = array ();
        $positions = explode (',', str_replace (' ', '', $position_text));
        foreach ($positions as $index => $position) {
          if (isset ($position [0]) && $position [0] == '%') {
            unset ($positions [$index]);

            $position = substr ($position, 1);
            $mod_value = $position;
            $offset_value = 0;

            if (strpos ($mod_value, '@') !== false) {
              $mod_value_array = explode ('@', $mod_value);
              $mod_value = $mod_value_array [0];
              $offset_value = $mod_value_array [1];
            }

            if (is_numeric ($mod_value) && $mod_value > 0 && is_numeric ($offset_value)) {
              foreach ($paragraph_positions as $index => $paragraph_position) {
                if ($index + 1 < $offset_value) continue;
                if (($index + 1 - $offset_value) % $mod_value == 0) $new_positions []= $index;
              }
            }
          }
          elseif (is_numeric ($position) && $position > 0 && $position < 1) {
            $positions [$index] = intval ($position * (count ($paragraph_positions) - 1) + 0.5);
          }
          elseif (is_numeric ($position) && $position > - 1 && $position < 0) {
            $positions [$index] = intval (count ($paragraph_positions) + $position * (count ($paragraph_positions) - 1) - 0.5);
          }
          elseif (is_numeric ($position) && $position <= - 1) {
            $positions [$index] = count ($paragraph_positions) + $position;
          }
          elseif ($position == 0) {
            $positions [$index] = mt_rand (0, count ($paragraph_positions) - 1);
          }
          else $positions [$index] = (int) $position - 1;
        }
        $positions = array_unique (array_merge ($positions, $new_positions));
        sort ($positions);
      }
      elseif (isset ($position_text [0]) && $position_text [0] == '%') {
        $position_text = substr ($position_text, 1);
        $mod_value = $position_text;
        $offset_value = 0;

        if (strpos ($mod_value, '@') !== false) {
          $mod_value_array = explode ('@', $mod_value);
          $mod_value = $mod_value_array [0];
          $offset_value = $mod_value_array [1];
        }

        if (is_numeric ($mod_value) && $mod_value > 0 && is_numeric ($offset_value)) {
          foreach ($paragraph_positions as $index => $paragraph_position) {
            if ($index + 1 < $offset_value) continue;
            if (($index + 1 - $offset_value) % $mod_value == 0) $positions []= $index;
          }
        }
      }
      elseif ($position_text == '') {
        $positions = array ();

        $min_words_above = $this->get_minimum_words_above ();
        if (!empty ($min_words_above) && !$after_image) {
          $words_above = 0;
          foreach ($paragraph_positions as $index => $paragraph_position) {

            if ($direction_type == AI_DIRECTION_FROM_BOTTOM) {
              if ($words_above >= $min_words_above) {
                $positions []= $index;
                $words_above = 0;
              }
            }

            if ($multibyte) {
              $paragraph_code = mb_substr ($content, $paragraph_start_positions [$index], $paragraph_position - $paragraph_start_positions [$index] + 1);
            } else {
                $paragraph_code = substr ($content, $paragraph_start_positions [$index], $paragraph_position - $paragraph_start_positions [$index] + 1);
              }

            $words_above += number_of_words ($paragraph_code);

            if ($direction_type != AI_DIRECTION_FROM_BOTTOM) {
              if ($words_above >= $min_words_above) {
                $positions []= $index;
                $words_above = 0;
              }
            }

          }
        } else
        foreach ($paragraph_positions as $index => $paragraph_position) {
          $positions []= $index;
        }

        $filter_settings = trim (str_replace (' ', '', $this->get_call_filter()));
        if (!empty ($filter_settings)) {

          $filter_counter = $after_image ? AI_FILTER_IMAGES : AI_FILTER_PARAGRAPHS;

          if ($this->get_filter_type() == $filter_counter) {
            $filter_values = array ();
            if (strpos ($filter_settings, ",") !== false) {
              $filter_values = explode (",", $filter_settings);
            } else $filter_values []= $filter_settings;

            $inverted_filter = $this->get_inverted_filter();
            $filtered_positions = array ();

            foreach ($positions as $index => $position) {
              $insert = false;
              if (in_array ($index + 1, $filter_values)) {
                $insert = true;
              } else {
                  foreach ($filter_values as $filter_value) {
                    $filter_value = trim ($filter_value);
                    if (isset ($filter_value [0]) && $filter_value [0] == '%') {
                      $mod_value = substr ($filter_value, 1);
                      if (is_numeric ($mod_value) && $mod_value > 0) {
                        if (($index + 1) % $mod_value == 0) {
                          $insert = true;
                          break;
                        }
                      }
                    }
                  }
                }
              if ($insert xor $inverted_filter) $filtered_positions []= $position;
            }
            $positions = $filtered_positions;
          }
        }
      }
    }


    $debug_processing = ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0;

    if (!empty ($positions) && !$after_image) {

      // Not needed anymore
//      if (!isset ($paragraph_start_positions)) {
//        $paragraph_start_positions = array ();
//        get_paragraph_start_positions ($content, $multibyte, $paragraph_positions, $paragraph_end_strings, $paragraph_start_positions, $dummy);
//      }

      $avoid_paragraphs_above = intval ($this->get_avoid_paragraphs_above());
      $avoid_paragraphs_below = intval ($this->get_avoid_paragraphs_below());

      $avoid_text_above = $this->get_avoid_text_above();
      $avoid_text_below = $this->get_avoid_text_below();
      $avoid_paragraph_texts_above = explode (",", html_entity_decode (trim ($avoid_text_above)));
      $avoid_paragraph_texts_below = explode (",", html_entity_decode (trim ($avoid_text_below)));

      $check_direction = $this->get_avoid_direction();
      $max_checks      = $this->get_avoid_try_limit();

      $check_strictly_inside_paragraphs = false;

      $failed_clearance_positions = array ();

      foreach ($positions as $position_index => $position) {

        $direction = $check_direction;

        if (($avoid_paragraphs_above != 0 || $avoid_paragraphs_below != 0) && count ($paragraph_positions) > $position) {

          if ($debug_processing && $this->number != 0) {
            ai_log ('---------------------------------');
            ai_log ('BLOCK ' . $this->number . ' CLEARANCE CHECK POSITION ' . ($position + 1));
          }

          $checks = $max_checks;
          $saved_position = $position;
          do {

            $found_above = false;
            $paragraph_text_found_above = '';
            if ($avoid_paragraphs_above != 0 && $avoid_text_above != "" && is_array ($avoid_paragraph_texts_above) && count ($avoid_paragraph_texts_above) != 0) {

              for ($avoid_paragraph_above = $avoid_paragraphs_above; $avoid_paragraph_above > 0; $avoid_paragraph_above --) {
                $paragraph_position_above = $position - $avoid_paragraph_above + 1;

                if (!$check_strictly_inside_paragraphs) {
                  if ($paragraph_position_above < 0) $paragraph_position_above = 0;
                }

                if ($paragraph_position_above >= 0) {

                  if ($check_strictly_inside_paragraphs) {
                    $start_position_above = $paragraph_start_positions [$paragraph_position_above];
                    $end_position_above   = $paragraph_positions       [$paragraph_position_above];
                  } else {
                      $start_position_above = $paragraph_start_positions [$paragraph_position_above];
                      $end_position_above   = $paragraph_positions       [$position];
                    }

                  if ($multibyte) {
                    $paragraph_code = mb_substr ($content, $start_position_above, $end_position_above - $start_position_above);
                  } else {
                      $paragraph_code = substr ($content, $start_position_above, $end_position_above - $start_position_above);
                    }

                  foreach ($avoid_paragraph_texts_above as $paragraph_text_above) {
                    if (trim ($paragraph_text_above) == '') continue;

                    if ($multibyte) {
                      if (mb_stripos ($paragraph_code, trim ($paragraph_text_above)) !== false) {
                        $found_above = true;
                        $paragraph_text_found_above = $paragraph_text_above;
                        break;
                      }
                    } else {
                        if (stripos ($paragraph_code, trim ($paragraph_text_above)) !== false) {
                          $found_above = true;
                          $paragraph_text_found_above = $paragraph_text_above;
                          break;
                        }
                      }
                  }
                }

                if ($found_above || !$check_strictly_inside_paragraphs) break;
              }
            }

            $found_below = false;
            $paragraph_text_found_below = '';
            if ($avoid_paragraphs_below != 0 && $position != count ($paragraph_positions) - 1 && $avoid_text_below != "" && is_array ($avoid_paragraph_texts_below) && count ($avoid_paragraph_texts_below) != 0) {

              for ($avoid_paragraph_below = $avoid_paragraphs_below; $avoid_paragraph_below > 0; $avoid_paragraph_below --) {
                $paragraph_position_below = $position + $avoid_paragraph_below;

                if (!$check_strictly_inside_paragraphs) {
                  if ($paragraph_position_below >= count ($paragraph_positions)) {
                    // If paragraph position is not the last one end with the last paragraph
                    if ($position != count ($paragraph_positions) - 1) $paragraph_position_below = count ($paragraph_positions) - 1;
                    // Othewise do not check anything
                  }
                }

                if ($paragraph_position_below < count ($paragraph_positions)) {

                  if ($check_strictly_inside_paragraphs) {
                    $start_position_below = $paragraph_start_positions [$paragraph_position_below];
                    $end_position_below   = $paragraph_positions       [$paragraph_position_below];
                  } else {
                      $start_position_below = $paragraph_positions [$position];
                      $end_position_below   = $paragraph_positions [$paragraph_position_below];
                    }

                  if ($multibyte) {
                    $paragraph_code = mb_substr ($content, $start_position_below, $end_position_below - $start_position_below);
                  } else {
                      $paragraph_code = substr ($content, $start_position_below, $end_position_below - $start_position_below);
                    }

                  foreach ($avoid_paragraph_texts_below as $paragraph_text_below) {
                    if (trim ($paragraph_text_below) == '') continue;

                    if ($multibyte) {
                      if (mb_stripos ($paragraph_code, trim ($paragraph_text_below)) !== false) {
                        $found_below = true;
                        $paragraph_text_found_below = $paragraph_text_below;
                        break;
                      }
                    } else {
                        if (stripos ($paragraph_code, trim ($paragraph_text_below)) !== false) {
                          $found_below = true;
                          $paragraph_text_found_below = $paragraph_text_below;
                          break;
                        }
                      }
                  }
                }

                if ($found_below || !$check_strictly_inside_paragraphs) break;
              }
            }


//            echo "position: $position = after #", $position + 1, "<br />\n";
//            echo "checks: $checks<br />\n";
//            echo "direction: $direction<br />\n";
//            if ($found_above)
//            echo "found_above<br />\n";
//            if ($found_below)
//            echo "found_below<br />\n";
//            echo "=================<br />\n";


            if ($found_above || $found_below) {

              if ($debug_processing && $this->number != 0) ai_log ('BLOCK ' . $this->number . ' CLEARANCE CHECK POSITION ' . ($position + 1) .
                ' FAILED (' . ($found_above ? 'ABOVE: ' . $paragraph_text_found_above .($found_below ? ', ' : '') : '') . ($found_below ? 'BELOW: ' . $paragraph_text_found_below : '') . ')');

              $ai_last_check = AI_CHECK_DO_NOT_INSERT;
              if ($this->get_avoid_action() == AI_DO_NOT_INSERT) {
                $failed_clearance_positions [$positions [$position_index]] = $ai_last_check;
                $positions [$position_index] = - 1;
                break;
              }

              switch ($direction) {
                case AI_ABOVE: // Try above
                  $ai_last_check = AI_CHECK_AD_ABOVE;
                  // Already at the top - do not insert
                  if ($position == 0) {
                    $failed_clearance_positions [$positions [$position_index]] = $ai_last_check;
                    $positions [$position_index] = - 1;
                    break 2;
                  }

                  $position --;
                  break;
                case AI_BELOW: // Try below
                  $ai_last_check = AI_CHECK_AD_BELOW;
                  // Already at the bottom - do not insert
                  if ($position >= count ($paragraph_positions) - 1) {
                    $failed_clearance_positions [$positions [$position_index]] = $ai_last_check;
                    $positions [$position_index] = - 1;
                    break 2;
                  }

                  $position ++;
                  break;
                case AI_ABOVE_AND_THEN_BELOW: // Try first above and then below
                  if ($position == 0 || $checks == 0) {
                    // Try below
                    $direction = AI_BELOW;
                    $checks = $max_checks;
                    $position = $saved_position;
                    $ai_last_check = AI_CHECK_AD_BELOW;
                    // Already at the bottom - do not insert
                    if ($position >= count ($paragraph_positions) - 1) {
                      $failed_clearance_positions [$positions [$position_index]] = $ai_last_check;
                      $positions [$position_index] = - 1;
                      break 2;
                    }

                    $position ++;
                  } else $position --;
                  break;
                case AI_BELOW_AND_THEN_ABOVE: // Try first below and then above
                  if ($position >= count ($paragraph_positions) - 1 || $checks == 0) {
                    // Try above
                    $direction = AI_ABOVE;
                    $checks = $max_checks;
                    $position = $saved_position;
                 $ai_last_check = AI_CHECK_AD_ABOVE;
                    // Already at the top - do not insert
                    if ($position == 0) {
                      $failed_clearance_positions [$positions [$position_index]] = $ai_last_check;
                      $positions [$position_index] = - 1;
                      break 2;
                    }

                    $position --;
                  } else $position ++;
                  break;
              }
            } else {
                if ($debug_processing && $this->number != 0) ai_log ('BLOCK ' . $this->number . ' CLEARANCE CHECK POSITION ' . ($position + 1) . ' OK');

                // Text not found - insert
                $positions [$position_index] = $position;
                break;
              }

            // Try next position
            if ($checks <= 0) {
              // Suitable position not found - do not insert
              $failed_clearance_positions [$positions [$position_index]] = $ai_last_check;
              $positions [$position_index] = - 1;
              break;
            }

            $checks --;
          } while (true);
        }

        // Nothing to do
        $ai_last_check = AI_CHECK_PARAGRAPHS_AFTER_CLEARANCE;
        if (count ($paragraph_positions) == 0) return $content;
      }

      if ($debug_processing && $this->number != 0) ai_log ('---------------------------------');
    }


    if (!$after_image) {
      $no_insertion_first_paragraphs = intval ($this->get_skip_first_paragraphs ());
      $no_insertion_last_paragraphs  = intval ($this->get_skip_last_paragraphs ());

      if ($no_insertion_first_paragraphs != 0 /*&& $no_insertion_first_paragraphs <= count ($paragraph_positions)*/) {
        foreach ($positions as $index => $position) {
          if ($position < $no_insertion_first_paragraphs) unset ($positions [$index]);
        }
        $positions = array_values ($positions);
      }

      if ($no_insertion_last_paragraphs != 0 /*&& $no_insertion_last_paragraphs <= count ($paragraph_positions)*/) {
        foreach ($positions as $index => $position) {
          if ($position >= count ($paragraph_positions) - $no_insertion_last_paragraphs) unset ($positions [$index]);
        }
        $positions = array_values ($positions);
      }
    }


    if ($position_preview || !empty ($positions)) {
      $offset = 0;
      if (!empty ($positions)) $ai_last_check = AI_CHECK_PARAGRAPH_NUMBER;

      $real_positions = array ();
      foreach ($positions as $position_index) $real_positions []= $position_index >= 0 ? $position_index + 1 : '*';
      if ($debug_processing && $this->number != 0 && count ($real_positions) != 0) ai_log ('BLOCK ' . $this->number . ' INSERTION POSITIONS: ' . implode (', ', $real_positions));

      $min_paragraphs = intval ($this->get_paragraph_number_minimum());
      $max_paragraphs = intval ($this->get_paragraph_number_maximum());
      $max_page_blocks_enabled = $this->get_max_page_blocks_enabled ();

      foreach ($paragraph_positions as $counter => $paragraph_position) {
        $debug_label = $after_image ? 'AI' : 'AP';
        if ($position_preview) $inserted_code = "[[AI_".$debug_label.($counter + 1)."]]";
        elseif (!empty ($positions) && in_array ($counter, $positions)) {

          $inserted = false;

          $ai_last_check = AI_CHECK_PARAGRAPHS_MIN_NUMBER;
          if (count ($paragraph_positions) >= $min_paragraphs) {

            $ai_last_check = AI_CHECK_PARAGRAPHS_MAX_NUMBER;
            if ($max_paragraphs <= 0 || count ($paragraph_positions) <= $max_paragraphs) {

              $ai_last_check = AI_CHECK_MAX_PAGE_BLOCKS;
              if (!$max_page_blocks_enabled || $ai_wp_data [AI_PAGE_BLOCKS] < get_max_page_blocks ()) {
                // Last check before insertion
                if ($this->check_and_increment_block_counter ()) {
                  // Increment page block counter
                  if ($max_page_blocks_enabled) $ai_wp_data [AI_PAGE_BLOCKS] ++;

                  $ai_last_check = AI_CHECK_DEBUG_NO_INSERTION;
                  if (!$this->get_debug_disable_insertion ()) {
                    $inserted_code = $this->get_code_for_serverside_insertion ();
                    $ai_last_check = AI_CHECK_INSERTED;
                    $this->clear_code_cache ();
                    $inserted = true;
                  }
                }
              }
            }
          }

          if ($debug_processing) ai_log (ai_log_block_status ($this->number, $ai_last_check));

          if (!$inserted) continue;
        }
        else {
          if ($debug_processing && isset ($failed_clearance_positions [$counter])) ai_log (ai_log_block_status ($this->number, $failed_clearance_positions [$counter]));
          continue;
        }

        if ($multibyte) {
          if ($direction_type == AI_DIRECTION_FROM_BOTTOM) {
            $content = mb_substr ($content, 0, $paragraph_position + 1) . $inserted_code . mb_substr ($content, $paragraph_position + 1);
          } else {
              $content = mb_substr ($content, 0, $paragraph_position + $offset + 1) . $inserted_code . mb_substr ($content, $paragraph_position + $offset + 1);
              $offset += mb_strlen ($inserted_code);
            }
        } else {
            if ($direction_type == AI_DIRECTION_FROM_BOTTOM) {
              $content = substr_replace ($content, $inserted_code, $paragraph_position + 1, 0);
            } else {
                $content = substr_replace ($content, $inserted_code, $paragraph_position + $offset + 1, 0);
                $offset += strlen ($inserted_code);
              }
          }
      }

      $ai_last_check = AI_CHECK_NONE;  // Already logged on each insertion
      return $content;
    }

    // empty $positions
    $ai_last_check = AI_CHECK_NO_PARAGRAPHS;
    return $content;
  }


//  Deprecated
  function manual ($content){

    if (preg_match_all("/{adinserter (.+?)}/", $content, $tags)){

      $block_class_name = get_block_class_name ();
      $viewport_classes = $this->get_viewport_classes ();
      if ($block_class_name != '' || $viewport_classes != '') {
        if ($block_class_name =='') $viewport_classes = trim ($viewport_classes);
        $class = " class='" . ($block_class_name != '' ? $block_class_name . " " . $block_class_name . "-" . $this->number : '') . $viewport_classes ."'";
      } else $class = '';

//      $display_for_devices = $this->get_display_for_devices ();

      foreach ($tags [1] as $tag) {
         $ad_tag = strtolower (trim ($tag));
         $ad_name = strtolower (trim ($this->get_ad_name()));
         if ($ad_tag == $ad_name || $ad_tag == $this->number) {
          if ($this->get_alignment_type() == AI_ALIGNMENT_NO_WRAPPING) $ad_code = $this->ai_getProcessedCode (); else
            $ad_code = "<div" . $class . " style='" . $this->get_alignment_style() . "'>" . $this->ai_getProcessedCode () . "</div>";
          $content = preg_replace ("/{adinserter " . $tag . "}/", $ad_code, $content);
         }
      }
    }

    return $content;
  }

//  Deprecated
  function display_disabled ($content){

    $ad_name = $this->get_ad_name();

    if (preg_match ("/<!-- +Ad +Inserter +Ad +".($this->number)." +Disabled +-->/i", $content)) return true;

    if (preg_match ("/<!-- +disable +adinserter +\* +-->/i", $content)) return true;

    if (preg_match ("/<!-- +disable +adinserter +".($this->number)." +-->/i", $content)) return true;

    if (strpos ($content, "<!-- disable adinserter " . $ad_name . " -->") != false) return true;

    return false;
  }

  function check_disabled () {
    global $ai_wp_data;

    if (isset ($ai_wp_data [AI_DISABLED_BLOCKS])) {
      if (in_array ($this->number, $ai_wp_data [AI_DISABLED_BLOCKS])) {
        return false;
      }
      if (in_array ('#', $ai_wp_data [AI_DISABLED_BLOCKS])) {
        return false;
      }
    }

    return true;
  }

  function check_category ($categories = null, $cat_type = AI_WHITE_LIST) {
    global $ai_wp_data;

    if ($categories === null) {
      $categories = trim (strtolower ($this->get_ad_block_cat()));
      $cat_type = $this->get_ad_block_cat_type();
    }

    if ($categories == AD_EMPTY_DATA) return true;

    switch ($ai_wp_data [AI_WP_PAGE_TYPE]) {
      case AI_PT_STATIC:
      case AI_PT_POST:
        $wp_categories = get_the_category ();
        break;
      default:
        $wp_categories = get_queried_object();

        if ($wp_categories instanceof WP_Term) {
          $wp_categories = array ($wp_categories);
        } else $wp_categories = array ();
        break;
    }

    if ($cat_type == AI_BLACK_LIST) {

//      if ($categories == AD_EMPTY_DATA) return true;

      $cats_listed = explode (",", $categories);

      foreach ($wp_categories as $wp_category) {

        if (isset ($wp_category->cat_name) && isset ($wp_category->slug))
          foreach ($cats_listed as $cat_disabled) {

            $check_parent = true;
            $check_childern = false;

            $cat_disabled = trim ($cat_disabled);
            if (substr ($cat_disabled, - 1) == '*') {
              $check_childern = true;
              $cat_disabled = rtrim ($cat_disabled, '*');
            }
            elseif (substr ($cat_disabled, - 1) == '+') {
              $check_parent = false;
              $check_childern = true;
              $cat_disabled = rtrim ($cat_disabled, '+');
            }

            $wp_category_name = strtolower ($wp_category->cat_name);
            $wp_category_slug = strtolower ($wp_category->slug);

            if ($check_parent) {
              if ($wp_category_name == $cat_disabled || $wp_category_slug == $cat_disabled) {
                return false;
              }
            }

            if ($check_childern) {
              if (ai_post_is_in_child_categories ($cat_disabled)) {
                return false;
              }
            }
          }
      }
      return true;

    } else {

//        if ($categories == AD_EMPTY_DATA) return false;

        $cats_listed = explode (",", $categories);

        foreach ($wp_categories as $wp_category) {

          if (isset ($wp_category->cat_name) && isset ($wp_category->slug))
            foreach ($cats_listed as $cat_enabled) {

              $check_parent = true;
              $check_childern = false;

              $cat_enabled = trim ($cat_enabled);

              if (substr ($cat_enabled, - 1) == '*') {
                $check_childern = true;
                $cat_enabled = rtrim ($cat_enabled, '*');
              }
              elseif (substr ($cat_enabled, - 1) == '+') {
                $check_parent = false;
                $check_childern = true;
                $cat_enabled = rtrim ($cat_enabled, '+');
              }

              $wp_category_name = strtolower ($wp_category->cat_name);
              $wp_category_slug = strtolower ($wp_category->slug);

              if ($check_parent) {
                if ($wp_category_name == $cat_enabled || $wp_category_slug == $cat_enabled) {
                  return true;
                }
              }

              if ($check_childern) {
                if (ai_post_is_in_child_categories ($cat_enabled)) {
                  return true;
                }
              }
            }
        }
        return false;
      }
  }

  function check_tag ($tags = null, $tag_type = AI_WHITE_LIST) {

    if ($tags === null) {
      $tags     = $this->get_ad_block_tag();
      $tag_type = $this->get_ad_block_tag_type();
    }

    $tags = trim ($tags);

    if ($tags == AD_EMPTY_DATA) return true;

    $tags_listed = explode (",", $tags);
    foreach ($tags_listed as $index => $tag_listed) {
      $tags_listed [$index] = trim ($tag_listed);
    }
    $has_any_of_the_given_tags = has_tag ($tags_listed);

    if ($tag_type == AI_BLACK_LIST) {

//      if ($tags == AD_EMPTY_DATA) return true;

      if (is_tag()) {
        foreach ($tags_listed as $tag_listed) {
          if (is_tag ($tag_listed)) return false;
        }
        return true;
      }

      return !$has_any_of_the_given_tags;

    } else {

//        if ($tags == AD_EMPTY_DATA) return false;

        if (is_tag()) {
          foreach ($tags_listed as $tag_listed) {
            if (is_tag ($tag_listed)) return true;
          }
          return false;
        }

        return $has_any_of_the_given_tags;
      }
  }

  function check_taxonomy ($taxonomies = null, $taxonomy_type = AI_WHITE_LIST) {
    global $ai_wp_data;

    if ($taxonomies === null) {
      $taxonomies     = trim ($this->get_ad_block_taxonomy ());
      $taxonomy_type  = $this->get_ad_block_taxonomy_type();
    }

    if ($taxonomies == AD_EMPTY_DATA) return true;

    if ($taxonomy_type == AI_BLACK_LIST) {

      $taxonomies_listed = explode (",", $taxonomies);
      foreach ($taxonomies_listed as $taxonomy_disabled) {
        $taxonomy_disabled_org = trim ($taxonomy_disabled);
        $taxonomy_disabled = strtolower ($taxonomy_disabled_org);

        if (strpos ($taxonomy_disabled, 'user:') === 0) {
          $current_user = wp_get_current_user();
          $terms = explode (':', $taxonomy_disabled);

          if ($terms [1] == 'logged-in') {
            return !is_user_logged_in ();
          }
          elseif ($terms [1] == 'not-logged-in') {
            return is_user_logged_in ();
          }

          if ($terms [1] == $current_user->user_login) return false;
        }
        elseif (strpos ($taxonomy_disabled, 'author:') === 0) {
          if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_POST || $ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_STATIC)
            $current_author = strtolower (get_the_author_meta ('user_login')); else
              $current_author = '';
          $terms = explode (':', $taxonomy_disabled);
          if ($terms [1] == $current_author) return false;
        }
        elseif (strpos ($taxonomy_disabled, 'user-role:') === 0) {
          $current_user = wp_get_current_user();
          $terms = explode (':', $taxonomy_disabled);
          foreach (wp_get_current_user()->roles as $role) {
            if ($terms [1] == $role) return false;
          }
        }
        elseif (strpos ($taxonomy_disabled, 'post-type:') === 0) {
          $post_type = get_post_type ();
          $terms = explode (':', $taxonomy_disabled);
          if ($terms [1] == $post_type) return false;
        }
        elseif (strpos ($taxonomy_disabled, 'primary-category:') === 0) {
          $primary_category = explode (':', $taxonomy_disabled);
          if ($primary_category [1] == ai_primary_category ()) return false;
        }
        elseif (strpos ($taxonomy_disabled, 'yoast-primary-category:') === 0) {
          $primary_category = explode (':', $taxonomy_disabled);
          if ($primary_category [1] == ai_yoast_primary_category ()) return false;
        }
        elseif (strpos ($taxonomy_disabled, 'multisite:') === 0) {
          if (is_multisite () && function_exists ('ai_plugin_settings')) {
            $site_id = explode (':', $taxonomy_disabled);
            if ($site_id [1] == '#' && is_main_site ()) return false;
            if (get_current_blog_id () == $site_id [1]) return false;
          } else return true;
        }
        elseif (strpos ($taxonomy_disabled_org, 'meta:') === 0) {
          $meta_data = explode (':', str_replace ('meta:', '', $taxonomy_disabled_org));
          if (count ($meta_data) == 2) {
            if (get_post_meta (get_the_id (), $meta_data [0], true) == $meta_data [1]) return false;
          } else {
              if (get_post_meta (get_the_id (), $meta_data [0], true) != '') return false;
            }
        }

        $taxonomy_names = get_post_taxonomies ();
        foreach ($taxonomy_names as $taxonomy_name) {
          $terms = get_the_terms (0, $taxonomy_name);
          if (is_array ($terms)) {
            foreach ($terms as $term) {
              $post_term_name = strtolower ($term->name);
              $post_term_slug = strtolower ($term->slug);
              $post_taxonomy  = strtolower ($term->taxonomy);

              if ($post_term_name == $taxonomy_disabled || $post_term_slug == $taxonomy_disabled) return false;

              $post_taxonomy  = strtolower ($term->taxonomy);
              if ($post_taxonomy == $taxonomy_disabled) return false;

              $check_parent = true;
              $check_childern = false;

              if (substr ($taxonomy_disabled, - 1) == '*') {
                $check_childern = true;
                $taxonomy_disabled = rtrim ($taxonomy_disabled, '*');
              }
              elseif (substr ($taxonomy_disabled, - 1) == '+') {
                $check_parent = false;
                $check_childern = true;
                $taxonomy_disabled = rtrim ($taxonomy_disabled, '+');
              }

              if ($check_parent) {
                if ($taxonomy_disabled == $post_taxonomy . ':' . $post_term_slug) {
                  return false;
                }
              }

              if ($check_childern) {
                if (strpos ($taxonomy_disabled, ':') !== false) {
                  $taxonomy_data = explode (':', $taxonomy_disabled);
                  if (count ($taxonomy_data) == 2 && ai_post_is_in_child_taxonomies ($taxonomy_data [0], $taxonomy_data [1])) {
                    return false;
                  }
                }
              }
            }
          }
        }
      }

      return true;

    } else {
        $taxonomies_listed = explode (",", $taxonomies);
        foreach ($taxonomies_listed as $taxonomy_enabled) {
          $taxonomy_enabled_org = trim ($taxonomy_enabled);
          $taxonomy_enabled = strtolower ($taxonomy_enabled_org);

          if (strpos ($taxonomy_enabled, 'user:') === 0) {
            $current_user = wp_get_current_user();
            $terms = explode (':', $taxonomy_enabled);

            if ($terms [1] == 'logged-in') {
              return is_user_logged_in ();
            }
            elseif ($terms [1] == 'not-logged-in') {
              return !is_user_logged_in ();
            }

            if ($terms [1] == $current_user->user_login) return true;
          }
          elseif (strpos ($taxonomy_enabled, 'author:') === 0) {
            if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_POST || $ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_STATIC)
              $current_author = strtolower (get_the_author_meta ('user_login')); else
                $current_author = '';
            $terms = explode (':', $taxonomy_enabled);
            if ($terms [1] == $current_author) return true;
          }
          elseif (strpos ($taxonomy_enabled, 'user-role:') === 0) {
            $current_user = wp_get_current_user();
            $terms = explode (':', $taxonomy_enabled);
            foreach (wp_get_current_user()->roles as $role) {
              if ($terms [1] == $role) return true;
            }
          }
          elseif (strpos ($taxonomy_enabled, 'post-type:') === 0) {
            $post_type = get_post_type ();
            $terms = explode (':', $taxonomy_enabled);
            if ($terms [1] == $post_type) return true;
          }
          elseif (strpos ($taxonomy_enabled, 'primary-category:') === 0) {
            $primary_category = explode (':', $taxonomy_enabled);
            if ($primary_category [1] == ai_primary_category ()) return true;
          }
          elseif (strpos ($taxonomy_enabled, 'yoast-primary-category:') === 0) {
            $primary_category = explode (':', $taxonomy_enabled);
            if ($primary_category [1] == ai_yoast_primary_category ()) return true;
          }
          elseif (strpos ($taxonomy_enabled, 'multisite:') === 0) {
            if (is_multisite () && function_exists ('ai_plugin_settings')) {
              $site_id = explode (':', $taxonomy_enabled);
              if ($site_id [1] == '#' && is_main_site ()) return true;
              if (get_current_blog_id () == $site_id [1]) return true;
            } else return false;
          }
          elseif (strpos ($taxonomy_enabled_org, 'meta:') === 0) {
            $meta_data = explode (':', str_replace ('meta:', '', $taxonomy_enabled_org));
            if (count ($meta_data) == 2) {
              if (get_post_meta (get_the_id (), $meta_data [0], true) == $meta_data [1]) return true;
            } else {
                if (get_post_meta (get_the_id (), $meta_data [0], true) != '') return true;
              }
          }

          $taxonomy_names = get_post_taxonomies ();
          foreach ($taxonomy_names as $taxonomy_name) {
            $terms = get_the_terms (0, $taxonomy_name);
            if (is_array ($terms)) {
              foreach ($terms as $term) {
                $post_term_name = strtolower ($term->name);
                $post_term_slug = strtolower ($term->slug);
                $post_taxonomy  = strtolower ($term->taxonomy);

                if ($post_term_name == $taxonomy_enabled || $post_term_slug == $taxonomy_enabled) return true;

                $post_taxonomy  = strtolower ($term->taxonomy);
                if ($post_taxonomy == $taxonomy_enabled) return true;

                $check_parent = true;
                $check_childern = false;

                if (substr ($taxonomy_enabled, - 1) == '*') {
                  $check_childern = true;
                  $taxonomy_enabled = rtrim ($taxonomy_enabled, '*');
                }
                elseif (substr ($taxonomy_enabled, - 1) == '+') {
                  $check_parent = false;
                  $check_childern = true;
                  $taxonomy_enabled = rtrim ($taxonomy_enabled, '+');
                }

                if ($check_parent) {
                  if ($taxonomy_enabled == $post_taxonomy . ':' . $post_term_slug) {
                    return true;
                  }
                }

                if ($check_childern) {
                  if (strpos ($taxonomy_enabled, ':') !== false) {
                    $taxonomy_data = explode (':', $taxonomy_enabled);
                    if (count ($taxonomy_data) == 2 && ai_post_is_in_child_taxonomies ($taxonomy_data [0], $taxonomy_data [1])) {
                      return true;
                    }
                  }
                }
              }
            }
          }
        }

        return false;
      }
  }

  function check_id ($ids = null, $id_type = AI_WHITE_LIST) {
    global $ai_wp_data;

    if ($ids === null) {
      $ids     = trim ($this->get_id_list());
      $id_type = $this->get_id_list_type();
    }

    if ($ids == AD_EMPTY_DATA) return true;

    $page_id = get_the_ID();

    if ($id_type == AI_BLACK_LIST) $return = false; else $return = true;

    if (/*$ids == AD_EMPTY_DATA ||*/ $page_id === false) {
      return !$return;
    }

    $ids_listed = explode (",", $ids);
    foreach ($ids_listed as $index => $id_listed) {
      if (trim ($id_listed) == "") unset ($ids_listed [$index]); else
        $ids_listed [$index] = trim ($id_listed);
    }

    foreach ($ids_listed as $index => $id_listed) {
      switch ($ai_wp_data [AI_WP_PAGE_TYPE]) {
        case AI_PT_POST:
          if ($ids_listed [$index] == 'posts') return $return;
          break;
        case AI_PT_STATIC:
          if ($ids_listed [$index] == 'pages') return $return;
          break;
      }

      if (strpos ($ids_listed [$index], '-') !== false) {
        $id_limits = explode ('-', str_replace (' ', '', $ids_listed [$index]));
        if ($page_id >= $id_limits [0] && $page_id <= $id_limits [1]) return $return;
      }
    }

    if (in_array ($page_id, $ids_listed)) return $return;

    return !$return;
  }

  function check_url ($urls = null, $url_type = AI_WHITE_LIST) {
    global $ai_wp_data;

    if ($urls === null) {
      $urls     = trim ($this->get_ad_url_list());
      $url_type = $this->get_ad_url_list_type();
    }

    $page_url = $ai_wp_data [AI_WP_URL];

    if ($url_type == AI_BLACK_LIST) $return = false; else $return = true;

    if ($urls == AD_EMPTY_DATA) return true;

    $list_separator = ',';
    if (strpos ($urls, ' ') !== false && strpos ($urls, ',') === false) $list_separator = ' ';

    $urls_listed = explode ($list_separator, $urls);
    foreach ($urls_listed as $index => $url_listed) {
      if (trim ($url_listed) == "") unset ($urls_listed [$index]); else
        $urls_listed [$index] = trim ($url_listed);
    }

//    print_r ($urls_listed);
//    echo "<br />\n";
//    echo ' page url: ' . $page_url, "<br />\n";
//    echo ' listed urls: ' . $urls, "\n";
//    echo "<br />\n";

    foreach ($urls_listed as $url_listed) {
      if ($url_listed == '*') return $return;

      if ($url_listed [0] == '*') {
        if ($url_listed [strlen ($url_listed) - 1] == '*') {
          $url_listed = substr ($url_listed, 1, strlen ($url_listed) - 2);
          if (strpos ($page_url, $url_listed) !== false) return $return;
        } else {
            $url_listed = substr ($url_listed, 1);
            if (substr ($page_url, - strlen ($url_listed)) == $url_listed) return $return;
          }
      }
      elseif ($url_listed [strlen ($url_listed) - 1] == '*') {
        $url_listed = substr ($url_listed, 0, strlen ($url_listed) - 1);
        if (strpos ($page_url, $url_listed) === 0) return $return;
      }
      elseif ($url_listed == $page_url) return $return;
    }
    return !$return;
  }

  function check_scheduling ($server_side_check) {
    global $block_object, $ai_wp_data;

    switch ($this->get_scheduling()) {
      case AI_SCHEDULING_OFF:
        return true;
        break;

      case AI_SCHEDULING_DELAY_FOR:
        $after_days = trim ($this->get_ad_after_day());
        if ($after_days == '') return true;
        $after_days = $after_days;

        $post_date = get_the_date ('U');
        if ($post_date === false) return true;

        return (date ('U', current_time ('timestamp')) >= $post_date + $after_days * 86400);
        break;

      case AI_SCHEDULING_INSERT_ONLY_FOR:
        $after_days = trim ($this->get_ad_after_day());
        if ($after_days == '') return false;
        $after_days = $after_days;

        $post_date = get_the_date ('U');
        if ($post_date === false) return false;

        return (date ('U', current_time ('timestamp')) < $post_date + $after_days * 86400);
        break;

      case AI_SCHEDULING_BETWEEN_DATES:
        if (!function_exists ('ai_scheduling_options')) return true;

        if (!$server_side_check) return true;

        $start_time   = $this->get_schedule_start_date () . ' ' . $this->get_schedule_start_time ();
        $end_time     = $this->get_schedule_end_date ()   . ' ' . $this->get_schedule_end_time ();
        $days_in_week = $this->get_schedule_weekdays ();

        $insertion_enabled = check_scheduling_time ($start_time, $end_time, $days_in_week, true);

        if (!$insertion_enabled) {
          if (!isset ($ai_wp_data [AI_FALLBACK_LEVEL])) $ai_wp_data [AI_FALLBACK_LEVEL] = 1; else $ai_wp_data [AI_FALLBACK_LEVEL] ++;

          $fallback = intval ($this->get_scheduling_fallback());
          if ($fallback != $this->number && $fallback != 0 && $fallback <= 96 && $ai_wp_data [AI_FALLBACK_LEVEL] <= 2) {
            $fallback_obj = $block_object [$fallback];
            if ($fallback_obj->check_scheduling ($server_side_check) && ai_check_impression_and_click_limits ($fallback, true)) {
              $this->fallback = $fallback_obj->fallback != 0 ? $fallback_obj->fallback : $fallback;
              $insertion_enabled = true;
            }
          }

          $ai_wp_data [AI_FALLBACK_LEVEL] --;
        }

        return ($insertion_enabled);
        break;

      case AI_SCHEDULING_OUTSIDE_DATES:
        if (!function_exists ('ai_scheduling_options')) return true;

        if (!$server_side_check) return true;

        $start_time   = $this->get_schedule_start_date () . ' ' . $this->get_schedule_start_time ();
        $end_time     = $this->get_schedule_end_date ()   . ' ' . $this->get_schedule_end_time ();
        $days_in_week = $this->get_schedule_weekdays ();

        $insertion_enabled = check_scheduling_time ($start_time, $end_time, $days_in_week, false);

        if (!$insertion_enabled) {
          if (!isset ($ai_wp_data [AI_FALLBACK_LEVEL])) $ai_wp_data [AI_FALLBACK_LEVEL] = 1; else $ai_wp_data [AI_FALLBACK_LEVEL] ++;

          $fallback = intval ($this->get_scheduling_fallback());
          if ($fallback != $this->number && $fallback != 0 && $fallback <= 96 && $ai_wp_data [AI_FALLBACK_LEVEL] <= 2) {
            $fallback_obj = $block_object [$fallback];
            if ($fallback_obj->check_scheduling ($server_side_check) && ai_check_impression_and_click_limits ($fallback, true)) {
              $this->fallback = $fallback_obj->fallback != 0 ? $fallback_obj->fallback : $fallback;
              $insertion_enabled = true;
            }
          }

          $ai_wp_data [AI_FALLBACK_LEVEL] --;
        }

        return ($insertion_enabled);
        break;

      case AI_SCHEDULING_PUBLISHED_BETWEEN_DATES:
        if (!function_exists ('ai_scheduling_options')) return true;

        $post_date = get_the_date ('U');
        if ($post_date === false) return false;

        $post_weekday = date ('w', $post_date);
        if ($post_weekday == 0) $post_weekday = 6; else $post_weekday --;

        $current_time = current_time ('timestamp');
        $current_weekday = date ('w', $current_time);
        if ($current_weekday == 0) $current_weekday = 6; else $current_weekday --;
        $start_date   = strtotime ($this->get_schedule_start_date () . ' ' . $this->get_schedule_start_time (), $current_time);
        $end_date     = strtotime ($this->get_schedule_end_date ()   . ' ' . $this->get_schedule_end_time (),   $current_time);
        $weekdays     = explode (',', $this->get_schedule_weekdays ());
        if (isset ($weekdays [0]) and $weekdays [0] === '') $weekdays = array ();

        $insertion_enabled = $post_date >= $start_date && $post_date < $end_date && in_array ($post_weekday, $weekdays);

        if (!$insertion_enabled) {
          if (!isset ($ai_wp_data [AI_FALLBACK_LEVEL])) $ai_wp_data [AI_FALLBACK_LEVEL] = 1; else $ai_wp_data [AI_FALLBACK_LEVEL] ++;

          $fallback = intval ($this->get_scheduling_fallback());
          if ($fallback != $this->number && $fallback != 0 && $fallback <= 96 && $ai_wp_data [AI_FALLBACK_LEVEL] <= 2) {
            $this->fallback = $fallback;
            return true;
          }

          $ai_wp_data [AI_FALLBACK_LEVEL] --;
        }

        return ($insertion_enabled);
        break;

      case AI_SCHEDULING_PUBLISHED_OUTSIDE_DATES:
        if (!function_exists ('ai_scheduling_options')) return true;

        $post_date = get_the_date ('U');
        if ($post_date === false) return true;

        $post_weekday = date ('w', $post_date);
        if ($post_weekday == 0) $post_weekday = 6; else $post_weekday --;

        $current_time = current_time ('timestamp');
        $current_weekday = date ('w', $current_time);
        if ($current_weekday == 0) $current_weekday = 6; else $current_weekday --;
        $start_date   = strtotime ($this->get_schedule_start_date () . ' ' . $this->get_schedule_start_time (), $current_time);
        $end_date     = strtotime ($this->get_schedule_end_date ()   . ' ' . $this->get_schedule_end_time (),   $current_time);
        $weekdays     = explode (',', $this->get_schedule_weekdays ());
        if (isset ($weekdays [0]) and $weekdays [0] === '') $weekdays = array ();

//        echo "<pre>";
//        echo "current_time ", $current_time, " ", date ("Y-m-d H:i:s", $current_time), "<br />";
//        echo "start_date   ", $start_date, " ", date ("Y-m-d H:i:s", $start_date), "<br />";
//        echo "end_date     ", $end_date, " ", date ("Y-m-d H:i:s", $end_date), "<br />";
//        echo "post_date    ", $post_date, " ", date ("Y-m-d H:i:s", $post_date), "<br />";
//        echo "</pre>";

        $insertion_enabled = $post_date < $start_date || $post_date >= $end_date || !in_array ($post_weekday, $weekdays);

        if (!$insertion_enabled) {
          if (!isset ($ai_wp_data [AI_FALLBACK_LEVEL])) $ai_wp_data [AI_FALLBACK_LEVEL] = 1; else $ai_wp_data [AI_FALLBACK_LEVEL] ++;

          $fallback = intval ($this->get_scheduling_fallback());
          if ($fallback != $this->number && $fallback != 0 && $fallback <= 96 && $ai_wp_data [AI_FALLBACK_LEVEL] <= 2) {
            $this->fallback = $fallback;
            return true;
          }

          $ai_wp_data [AI_FALLBACK_LEVEL] --;
        }

        return ($insertion_enabled);
        break;

      default:
        return true;
        break;
    }
  }

  function check_referer () {
    return check_referer_list ($this->get_ad_domain_list(), $this->get_ad_domain_list_type() == AI_WHITE_LIST);
  }

  function check_client () {
    return check_client_list ($this->get_client_list(), $this->get_client_list_type() == AI_WHITE_LIST);
  }

  function check_number_of_words (&$content = null, $number_of_words = 0) {
    global $ai_last_check, $ai_wp_data;

    $minimum_words = intval ($this->get_minimum_words());
    $maximum_words = intval ($this->get_maximum_words());

    if ($minimum_words == 0 && $maximum_words == 0) return true;

//    if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_POST || $ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_STATIC) {
    if ($number_of_words == 0) {
      if (!isset ($ai_wp_data [AI_WORD_COUNT])) {
        if ($content === null) {
          $content = '';
          $content_post = get_post ();
          if (isset ($content_post->post_content)) $content = $content_post->post_content;
        }

        $number_of_words = number_of_words ($content);
      } else $number_of_words = $ai_wp_data [AI_WORD_COUNT];
    }
//    } else $number_of_words = 0;

    // Cache word count only on single pages
    if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_POST || $ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_STATIC)
      $ai_wp_data [AI_WORD_COUNT] = $number_of_words;

    $ai_last_check = AI_CHECK_MIN_NUMBER_OF_WORDS;
    if ($number_of_words < $minimum_words) return false;

    if ($maximum_words <= 0) $maximum_words = 1000000;

    $ai_last_check = AI_CHECK_MAX_NUMBER_OF_WORDS;
    if ($number_of_words > $maximum_words) return false;

    return true;
  }

  function check_number_of_words_in_paragraph ($content, $min, $max) {

    $number_of_words = number_of_words ($content);

    if ($max <= 0) $max = 1000000;

    if ($number_of_words < $min || $number_of_words > $max) return false;

    return true;
  }

  function server_side_check () {
    global $ai_wp_data;

    return get_dynamic_blocks () == AI_DYNAMIC_BLOCKS_SERVER_SIDE || ((get_dynamic_blocks () == AI_DYNAMIC_BLOCKS_CLIENT_SIDE_SHOW || get_dynamic_blocks () == AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT) && $ai_wp_data [AI_WP_AMP_PAGE]);
  }

  function check_page_types_lists_users ($ignore_page_types = false) {
    global $ai_last_check, $ai_wp_data;

    if (!$ignore_page_types) {
      if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_HOMEPAGE){
         $ai_last_check = AI_CHECK_PAGE_TYPE_FRONT_PAGE;
         if (!$this->get_display_settings_home()) return false;
      }
      elseif ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_STATIC){
         $ai_last_check = AI_CHECK_PAGE_TYPE_STATIC_PAGE;
         if (!$this->get_display_settings_page()) return false;
      }
      elseif ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_POST){
         $ai_last_check = AI_CHECK_PAGE_TYPE_POST;
         if (!$this->get_display_settings_post()) return false;
      }
      elseif ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_CATEGORY){
         $ai_last_check = AI_CHECK_PAGE_TYPE_CATEGORY;
         if (!$this->get_display_settings_category()) return false;
      }
      elseif ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_SEARCH){
         $ai_last_check = AI_CHECK_PAGE_TYPE_SEARCH;
         if (!$this->get_display_settings_search()) return false;
      }
      elseif ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_ARCHIVE){
         $ai_last_check = AI_CHECK_PAGE_TYPE_ARCHIVE;
         if (!$this->get_display_settings_archive()) return false;
      }
      elseif ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_FEED){
         $ai_last_check = AI_CHECK_PAGE_TYPE_FEED;
        if (!$this->get_enable_feed()) return false;
      }
      elseif ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_404){
         $ai_last_check = AI_CHECK_PAGE_TYPE_404;
        if (!$this->get_enable_404()) return false;
      }
    }

    $ai_last_check = AI_CHECK_CATEGORY;
    if (!$this->check_category ()) return false;

    $ai_last_check = AI_CHECK_TAG;
    if (!$this->check_tag ()) return false;

    $ai_last_check = AI_CHECK_TAXONOMY;
    if (!$this->check_taxonomy ()) return false;

    $ai_last_check = AI_CHECK_ID;
    if (!$this->check_id ()) return false;

    $ai_last_check = AI_CHECK_URL;
    if (!$this->check_url ()) return false;

    $server_side_check = $this->server_side_check ();

    $ai_last_check = AI_CHECK_URL_PARAMETER;
    switch ($server_side_check) {
      case true:
        if (!check_url_parameter_and_cookie_list ($this->get_url_parameter_list(), $this->get_url_parameter_list_type() == AI_WHITE_LIST)) return false;
        break;
      default:
        $url_parameter_found = false;
        $url_parameter_list_pass = check_url_parameter_list ($this->get_url_parameter_list(), $this->get_url_parameter_list_type() == AI_WHITE_LIST, $url_parameter_found);

        if ($url_parameter_found && !$url_parameter_list_pass) return false;

        if (!$url_parameter_found) $this->client_side_cookie_check = true;
        break;
    }

    $ai_last_check = AI_CHECK_COOKIE;
    switch ($server_side_check) {
      case true:
        if (!check_cookie_list ($this->get_cookie_list(), $this->get_cookie_list_type() == AI_WHITE_LIST)) return false;
        break;
      default:
        $this->client_side_cookie_check = true;
        break;
    }

    if ($server_side_check) {
      $ai_last_check = AI_CHECK_REFERER;
      if (!$this->check_referer ()) return false;
    }

    if ($server_side_check) {
      $ai_last_check = AI_CHECK_CLIENT;
      if (!$this->check_client ()) return false;
    }

    if (function_exists ('ai_check_lists')) {
      if (!ai_check_lists ($this, $server_side_check)) return false;
    }

    $ai_last_check = AI_CHECK_SCHEDULING;
    if (!$this->check_scheduling ($server_side_check)) return false;

    $display_for_users = $this->get_display_for_users ();

    $ai_last_check = AI_CHECK_LOGGED_IN_USER;
    if ($display_for_users == AI_DISPLAY_LOGGED_IN_USERS && ($ai_wp_data [AI_WP_USER] & AI_USER_LOGGED_IN) != AI_USER_LOGGED_IN) return false;
    $ai_last_check = AI_CHECK_NOT_LOGGED_IN_USER;
    if ($display_for_users == AI_DISPLAY_NOT_LOGGED_IN_USERS && ($ai_wp_data [AI_WP_USER] & AI_USER_LOGGED_IN) == AI_USER_LOGGED_IN) return false;
    $ai_last_check = AI_CHECK_ADMINISTRATOR;
    if ($display_for_users == AI_DISPLAY_ADMINISTRATORS && ($ai_wp_data [AI_WP_USER] & AI_USER_ADMINISTRATOR) != AI_USER_ADMINISTRATOR) return false;

    if (function_exists ('ai_check_impression_and_click_limits')) {
      if ($server_side_check && !ai_check_impression_and_click_limits ($this->number)) return false;
    }

    return true;
  }

  function check_post_page_exceptions ($selected_blocks) {
    global $ai_last_check, $ai_wp_data;

    if (isset ($this->wp_options [AI_OPTION_ENABLED_ON_WHICH_POSTS]) || isset ($this->wp_options [AI_OPTION_ENABLED_ON_WHICH_PAGES])) {
      // Use old settings
      if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_POST) {
        $enabled_on = $this->get_ad_enabled_on_which_posts ();
        if ($enabled_on == AI_DEFAULT_INSERTION_ENABLED) {
          $ai_last_check = AI_CHECK_INDIVIDUALLY_DISABLED;
          if (in_array ($this->number, $selected_blocks)) return false;
        }
        elseif ($enabled_on == AI_DEFAULT_INSERTION_DISABLED) {
          $ai_last_check = AI_CHECK_INDIVIDUALLY_ENABLED;
          if (!in_array ($this->number, $selected_blocks)) return false;
        }
      } elseif ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_STATIC) {
        $enabled_on = $this->get_ad_enabled_on_which_pages ();
        if ($enabled_on == AI_DEFAULT_INSERTION_ENABLED) {
          $ai_last_check = AI_CHECK_INDIVIDUALLY_DISABLED;
          if (in_array ($this->number, $selected_blocks)) return false;
        }
        elseif ($enabled_on == AI_DEFAULT_INSERTION_DISABLED) {
          $ai_last_check = AI_CHECK_INDIVIDUALLY_ENABLED;
          if (!in_array ($this->number, $selected_blocks)) return false;
        }
      }
      return true;
    }

    if (!$this->get_exceptions_enabled ()) return true;

    switch ($this->get_exceptions_function ()) {
      case AI_DEFAULT_INSERTION_ENABLED:
        $ai_last_check = AI_CHECK_INDIVIDUALLY_DISABLED;
        if (in_array ($this->number, $selected_blocks)) return false;
        break;
      case AI_DEFAULT_INSERTION_DISABLED:
        $ai_last_check = AI_CHECK_INDIVIDUALLY_ENABLED;
        if (!in_array ($this->number, $selected_blocks)) return false;
        break;
    }

    return true;
  }

  function check_filter ($counter_for_filter) {
    global $ai_last_check, $ad_inserter_globals, $page;

    $filter_ok = $this->get_inverted_filter() ? false : true;

    $ai_last_check = AI_CHECK_FILTER;
    $filter_settings = trim (str_replace (' ', '', $this->get_call_filter()));
    if (empty ($filter_settings)) return $filter_ok;

    switch ($this->get_filter_type ()) {
      case AI_FILTER_PHP_FUNCTION_CALLS:
        if (isset ($ad_inserter_globals [AI_PHP_FUNCTION_CALL_COUNTER_NAME . $this->number]))
          $counter_for_filter = $ad_inserter_globals [AI_PHP_FUNCTION_CALL_COUNTER_NAME . $this->number]; else return !$filter_ok;
        break;
      case AI_FILTER_CONTENT_PROCESSING:
        if (isset ($ad_inserter_globals [AI_CONTENT_COUNTER_NAME]))
          $counter_for_filter = $ad_inserter_globals [AI_CONTENT_COUNTER_NAME]; else return !$filter_ok;
        break;
      case AI_FILTER_EXCERPT_PROCESSING:
        if (isset ($ad_inserter_globals [AI_EXCERPT_COUNTER_NAME]))
          $counter_for_filter = $ad_inserter_globals [AI_EXCERPT_COUNTER_NAME]; else return !$filter_ok;
        break;
      case AI_FILTER_BEFORE_POST_PROCESSING:
        if (isset ($ad_inserter_globals [AI_LOOP_BEFORE_COUNTER_NAME]))
          $counter_for_filter = $ad_inserter_globals [AI_LOOP_BEFORE_COUNTER_NAME]; else return !$filter_ok;
        break;
      case AI_FILTER_AFTER_POST_PROCESSING:
        if (isset ($ad_inserter_globals [AI_LOOP_AFTER_COUNTER_NAME]))
          $counter_for_filter = $ad_inserter_globals [AI_LOOP_AFTER_COUNTER_NAME]; else return !$filter_ok;
        break;
      case AI_FILTER_WIDGET_DRAWING:
        if (isset ($ad_inserter_globals [AI_WIDGET_COUNTER_NAME . $this->number]))
          $counter_for_filter = $ad_inserter_globals [AI_WIDGET_COUNTER_NAME . $this->number]; else return !$filter_ok;
        break;
      case AI_FILTER_SUBPAGES:
        if (isset ($page))
          $counter_for_filter = $page; else return !$filter_ok;
        break;
      case AI_FILTER_POSTS:
        if (isset ($ad_inserter_globals [AI_POST_COUNTER_NAME]))
          $counter_for_filter = $ad_inserter_globals [AI_POST_COUNTER_NAME]; else return !$filter_ok;
        break;
      case AI_FILTER_PARAGRAPHS:
      case AI_FILTER_IMAGES:
          return true;
        break;
      case AI_FILTER_COMMENTS:
        if (isset ($ad_inserter_globals [AI_COMMENT_COUNTER_NAME]))
          $counter_for_filter = $ad_inserter_globals [AI_COMMENT_COUNTER_NAME]; else return !$filter_ok;
        break;
    }

    $filter_values = array ();
    if (strpos ($filter_settings, ",") !== false) {
      $filter_values = explode (",", $filter_settings);
    } else $filter_values []= $filter_settings;

    foreach ($filter_values as $filter_value) {
      $filter_value = trim ($filter_value);
      if (isset ($filter_value [0]) && $filter_value [0] == '%') {
        $mod_value = substr ($filter_value, 1);
        if (is_numeric ($mod_value) && $mod_value > 0) {
          if ($counter_for_filter % $mod_value == 0) return $filter_ok;
        }
      }
    }

    return in_array ($counter_for_filter, $filter_values) xor !$filter_ok;
  }

  function check_and_increment_block_counter () {
    global $ad_inserter_globals, $ai_last_check;

    $global_name = AI_BLOCK_COUNTER_NAME . $this->number;
    $max_insertions = intval ($this->get_maximum_insertions ());
    if (!isset ($ad_inserter_globals [$global_name])) {
      $ad_inserter_globals [$global_name] = 0;
    }
    $ai_last_check = AI_CHECK_MAX_INSERTIONS;
    if ($max_insertions != 0 && $ad_inserter_globals [$global_name] >= $max_insertions) return false;
    $ad_inserter_globals [$global_name] ++;

    return true;
  }

  function check_block_counter () {
    global $ad_inserter_globals, $ai_last_check;

    $global_name = AI_BLOCK_COUNTER_NAME . $this->number;
    $max_insertions = intval ($this->get_maximum_insertions ());
    if (!isset ($ad_inserter_globals [$global_name])) {
      $ad_inserter_globals [$global_name] = 0;
    }
    $ai_last_check = AI_CHECK_MAX_INSERTIONS;
    if ($max_insertions != 0 && $ad_inserter_globals [$global_name] >= $max_insertions) return false;
    return true;
  }

  function increment_block_counter () {
    global $ad_inserter_globals;

    if ($this->number == 0) return;

    $global_name = AI_BLOCK_COUNTER_NAME . $this->number;
    if (!isset ($ad_inserter_globals [$global_name])) {
      $ad_inserter_globals [$global_name] = 0;
    }
    $ad_inserter_globals [$global_name] ++;
    return;
  }

  function extract_features (){
    global $ai_wp_data;

//  AI_SERVER_SIDE_DETECTION
//  AI_CLIENT_SIDE_DETECTION
//  AI_CLIENT_SIDE_INSERTION
//  AI_STICK_TO_THE_CONTENT
//  AI_TRACKING
//  AI_CLOSE_BUTTONS
//  AI_IFRAMES
//  AI_ANIMATION
//  AI_LAZY_LOADING
//  AI_GEOLOCATION

//    if ($this->get_detection_server_side()) echo "#", $this->number;
//    echo "#", $this->number;
//    return;

    if ($this->get_detection_server_side()) $ai_wp_data [AI_SERVER_SIDE_DETECTION] = true;

    if (trim ($this->get_client_list ()) != '') $ai_wp_data [AI_MOBILE_DETECT_JS] = true;

    if ($this->get_detection_client_side ()) {
      $ai_wp_data [AI_CLIENT_SIDE_DETECTION] = true;

      if ($this->get_client_side_action () == AI_CLIENT_SIDE_ACTION_INSERT) {
        $ai_wp_data [AI_CLIENT_SIDE_INSERTION] = true;
      }
    } else {
        $code = $this->get_ad_data();
        if (stripos ($code, '[adinserter') !== false) {
          if (stripos ($code, 'viewport=') !== false) {
            $ai_wp_data [AI_CLIENT_SIDE_DETECTION] = true;
            $ai_wp_data [AI_CLIENT_SIDE_INSERTION] = true;
          }
          if (stripos ($code, 'fallback=') !== false) {
            $ai_wp_data [AI_CLIENT_SIDE_INSERTION] = true;
          }
        }
      }

    if (function_exists ('ai_extract_features_2')) ai_extract_features_2 ($this);

    if ($this->stick_to_the_content_class () != '' || $this->get_background ()) $ai_wp_data [AI_STICK_TO_THE_CONTENT] = true;

    switch ($this->get_automatic_insertion()) {
      case AI_AUTOMATIC_INSERTION_BEFORE_HTML_ELEMENT:
      case AI_AUTOMATIC_INSERTION_INSIDE_HTML_ELEMENT:
      case AI_AUTOMATIC_INSERTION_AFTER_HTML_ELEMENT:
        if ($this->get_html_element_insertion () != AI_HTML_INSERTION_SEREVR_SIDE) $ai_wp_data [AI_CLIENT_SIDE_INSERTION] = true;
        break;
    }
  }
}


class ai_Block extends ai_CodeBlock {

    public function __construct ($number) {
      parent::__construct();

      $this->number = $number;
    }
}

class ai_AdH extends ai_BaseCodeBlock {

  public function __construct () {
    parent::__construct();

    $this->number = 'H';
    $this->wp_options [AI_OPTION_BLOCK_NAME] = 'HEADER';
  }
}

class ai_AdF extends ai_BaseCodeBlock {

  public function __construct () {
    parent::__construct();

    $this->number = 'F';
    $this->wp_options [AI_OPTION_BLOCK_NAME] = 'FOOTER';
  }
}

class ai_AdA extends ai_BaseCodeBlock {

  public function __construct () {
    parent::__construct();

    $this->number = 'A';
    $this->wp_options [AI_OPTION_BLOCK_NAME] = 'AD BLOCKING MESSAGE';
  }

  public function get_ad_data (){
    $option = isset ($this->wp_options [AI_OPTION_CODE]) ? $this->wp_options [AI_OPTION_CODE] : AI_DEFAULT_ADB_MESSAGE;

    if ($option == AD_EMPTY_DATA) $option = AI_DEFAULT_ADB_MESSAGE;

    return $option;
  }
}

class ai_Walker_Comment extends Walker_Comment {

    public function comment_callback ($comment, $args, $depth) {
      if (($comment->comment_type == 'pingback' || $comment->comment_type == 'trackback') && $args ['short_ping']) {
        $this->ping ($comment, $depth, $args);
      } elseif ($args['format'] === 'html5') {
        $this->html5_comment ($comment, $depth, $args);
      } else {
        $this->comment ($comment, $depth, $args);
      }
    }

}

class ai_code_generator {

  public function __construct () {
  }

  public function generate ($data){
    $code = '';

    switch ($data ['generate-code']) {
      case AI_CODE_BANNER:
        $code = '';
        if (isset ($data ['image']) && $data ['image'] != '') {
          $attributes = '';
          if (isset ($data ['loading']) && $data ['loading'] != '') {
            $attributes .= ' loading="'.esc_html ($data ['loading']).'"';
          }
          if (isset ($data ['alt']) && $data ['alt'] != '') {
            $attributes .= ' alt="'.esc_html ($data ['alt']).'"';
          }
          $code = '<img src="' . esc_html ($data ['image']) . '"'.$attributes.'>';
        }
        if (isset ($data ['link']) && $data ['link'] != '') {
          $code = '<a href="' . esc_html ($data ['link']) . '"' .(isset ($data ['target']) ? ' target="' . esc_html ($data ['target']) . '"' : '') . '>' . $code . '</a>';
        }
        break;
      case AI_CODE_ADSENSE:
        $adsense_size = ($data ['adsense-width']  != '' ? ' width: '. esc_html ($data ['adsense-width']). 'px;' : '') . ($data ['adsense-height'] != '' ? ' height: '.esc_html ($data ['adsense-height']).'px;' : '');

        switch ($data ['adsense-type']) {
          case AI_ADSENSE_AMP_ONLY:
            $code = '';
            break;
          default:
              $code = '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>';
              if ($data ['adsense-comment']) $code .= "\n<!-- " . $data ['adsense-comment'] . " -->";

              $adsense_full_width_responsive = $data ['adsense-full-width-responsive'] != '' ? "\n".'     data-full-width-responsive="' . esc_html ($data ['adsense-full-width-responsive']) . '"' : '';
            break;
        }

        switch ($data ['adsense-type']) {
          case AI_ADSENSE_STANDARD:

            switch ($data ['adsense-size']) {
              case AI_ADSENSE_SIZE_FIXED:

                // Normal
                $code .= '
<ins class="adsbygoogle"
     style="display: inline-block;'.$adsense_size.'"
     data-ad-client="ca-'.esc_html ($data ['adsense-publisher-id']).'"
     data-ad-slot="'.esc_html ($data ['adsense-ad-slot-id']).'"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>';
                break;

              case AI_ADSENSE_SIZE_FIXED_BY_VIEWPORT:

                $code = $this->adsense_size_styles ($data) . $code;

                // Normal
                $code .= '
<ins class="adsbygoogle ' . AI_ADSENSE_BLOCK_CLASS  .$data ['block'].'"
     data-ad-client="ca-'.esc_html ($data ['adsense-publisher-id']).'"
     data-ad-slot="'.esc_html ($data ['adsense-ad-slot-id']).'"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>';
                break;

              case AI_ADSENSE_SIZE_RESPONSIVE:

                // Responsive
                $code .= '
<ins class="adsbygoogle"
     style="display: block;"
     data-ad-client="ca-'.esc_html ($data ['adsense-publisher-id']).'"
     data-ad-slot="'.esc_html ($data ['adsense-ad-slot-id']).'"
     data-ad-format="auto"'.$adsense_full_width_responsive.'></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>';
                break;
            }
            break;

          case AI_ADSENSE_LINK:
            switch ($data ['adsense-size']) {
              case AI_ADSENSE_SIZE_FIXED:

                // Normal
                $code .= '
<ins class="adsbygoogle"
     style="display: inline-block;'.$adsense_size.'"
     data-ad-client="ca-'.esc_html ($data ['adsense-publisher-id']).'"
     data-ad-slot="'.esc_html ($data ['adsense-ad-slot-id']).'"
     data-ad-format="link"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>';
                break;

              case AI_ADSENSE_SIZE_FIXED_BY_VIEWPORT:

                $code = $this->adsense_size_styles ($data) . $code;

                // Normal
                $code .= '
<ins class="adsbygoogle ' . AI_ADSENSE_BLOCK_CLASS  .$data ['block'].'"
     data-ad-client="ca-'.esc_html ($data ['adsense-publisher-id']).'"
     data-ad-slot="'.esc_html ($data ['adsense-ad-slot-id']).'"
     data-ad-format="link"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>';
                break;

              case AI_ADSENSE_SIZE_RESPONSIVE:

                // Responsive
                $code .= '
<ins class="adsbygoogle"
     style="display: block;"
     data-ad-client="ca-'.esc_html ($data ['adsense-publisher-id']).'"
     data-ad-slot="'.esc_html ($data ['adsense-ad-slot-id']).'"
     data-ad-format="link"'.$adsense_full_width_responsive.'></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>';
                break;
            }
            break;

          case AI_ADSENSE_IN_ARTICLE:
            $code .= '
<ins class="adsbygoogle"
     style="display: block; text-align: center;"
     data-ad-client="ca-'.esc_html ($data ['adsense-publisher-id']).'"
     data-ad-slot="'.esc_html ($data ['adsense-ad-slot-id']).'"
     data-ad-layout="in-article"
     data-ad-format="fluid"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>';
            break;

          case AI_ADSENSE_IN_FEED:
            $code .= '
<ins class="adsbygoogle"
     style="display: block;"
     data-ad-client="ca-'.esc_html ($data ['adsense-publisher-id']).'"
     data-ad-slot="'.esc_html ($data ['adsense-ad-slot-id']).'"
     data-ad-layout="'.esc_html ($data ['adsense-layout']).'"
     data-ad-layout-key="'.esc_html ($data ['adsense-layout-key']).'"
     data-ad-format="fluid"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>';
            break;

          case AI_ADSENSE_MATCHED_CONTENT:
            $code .= '
<ins class="adsbygoogle"
     style="display: block;"
     data-ad-client="ca-'.esc_html ($data ['adsense-publisher-id']).'"
     data-ad-slot="'.esc_html ($data ['adsense-ad-slot-id']).'"
     data-ad-format="autorelaxed"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>';
            break;
          case AI_ADSENSE_AUTO:
            $code .= '
<script>
   (adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: "ca-'.esc_html ($data ['adsense-publisher-id']).'",
      enable_page_level_ads: true
   });
</script>';

            break;
        }

        if ($data ['adsense-amp'] != AI_ADSENSE_AMP_DISABLED) {
          if ($code != '') {
            $code .= '

';
          }

              switch ($data ['adsense-amp']) {
                case AI_ADSENSE_AMP_AUTO:
                  $code .= '[ADINSERTER AMP]

<amp-auto-ads
';
                  if ($data ['adsense-amp-block-on-consent'] != '#') $code .= '  data-block-on-consent
';
                  $code .= '  type="adsense"
  data-ad-client="'.esc_html ($data ['adsense-publisher-id']).'">
</amp-auto-ads>';
              break;
                case AI_ADSENSE_AMP_ABOVE_THE_FOLD:
                  $code .= '[ADINSERTER AMP]

<amp-ad
';
                  if ($data ['adsense-amp-block-on-consent'] != '#') $code .= '  data-block-on-consent
';
                  $code .= '  layout="fixed-height"
  height=100
  type="adsense"
  data-ad-client="ca-'.esc_html ($data ['adsense-publisher-id']).'"
  data-ad-slot="'.esc_html ($data ['adsense-ad-slot-id']).'">
</amp-ad>';
                  break;
                case AI_ADSENSE_AMP_FIXED:
                  $code .= '[ADINSERTER AMP]

<amp-ad
';
                  if ($data ['adsense-amp-block-on-consent'] != '#') $code .= '  data-block-on-consent
';
                  $code .= '  layout="fixed"
  height=250
  width=300
  type="adsense"
  data-ad-client="ca-'.esc_html ($data ['adsense-publisher-id']).'"
  data-ad-slot="'.esc_html ($data ['adsense-ad-slot-id']).'">
</amp-ad>';
                  break;
                case AI_ADSENSE_AMP_BELOW_THE_FOLD:
                  $code .= '[ADINSERTER AMP]

<amp-ad
';
                  if ($data ['adsense-amp-block-on-consent'] != '#') $code .= '  data-block-on-consent
';
                  $code .= '  width="100vw"
  height="320"
  type="adsense"
  data-ad-client="ca-'.esc_html ($data ['adsense-publisher-id']).'"
  data-ad-slot="'.esc_html ($data ['adsense-ad-slot-id']).'"
  data-auto-format="rspv"
  data-full-width="">
  <div overflow=""></div>
</amp-ad>';
                  break;
                case AI_ADSENSE_AMP_STICKY:
                  if ($data ['adsense-width'] == '') {
                    $data ['adsense-width'] = 320;
                  }
                  if ($data ['adsense-height'] == '') {
                    $data ['adsense-height'] = 50;
                  }
                  $code .= '[ADINSERTER AMP]

<amp-sticky-ad layout="nodisplay">
  <amp-ad
';
                  if ($data ['adsense-amp-block-on-consent'] != '#') $code .= '    data-block-on-consent
';
                  $code .= '    width="'.esc_html ($data ['adsense-width']).'"
    height="'.esc_html ($data ['adsense-height']).'"
    type="adsense"
    data-ad-client="ca-'.esc_html ($data ['adsense-publisher-id']).'"
    data-slot="'.esc_html ($data ['adsense-ad-slot-id']).'">
  </amp-ad>
</amp-sticky-ad>';
                  break;
              }
        }
        break;
      case AI_CODE_AMAZON:
        $code_lines = explode ("\n", stripslashes ($data ['amazon-data']));
        $clean_code = '';
        $regionurl = '';
        $amp_lines = array ();
        foreach ($code_lines as $index => $code_line) {
          if (strpos ($code_line, 'regionurl') !== false) {
            unset ($code_lines [$index]);
            $regionurl = trim (str_replace ('regionurl', '', $code_line));
            $regionurl = trim (ltrim ($regionurl, '='));
          } else {
              $amp_lines [] = '  data-' . $code_lines [$index];
              $code_lines [$index] = '  ' . $code_lines [$index] . ';';
            }
        }
        $amazon_data = implode ("\n", $code_lines);

        $code .= '<script type="text/javascript">
'.$amazon_data.'
</script>
<script src='.$regionurl.'></script>';

        if ($data ['amazon-amp']) {
          $code .= '

[ADINSERTER AMP]

<amp-ad
'. ($data ['amazon-amp-block-on-consent'] != '#' ? '  data-block-on-consent
' : '') .
($data ['amazon-width'] != '' ? '  width = "'.esc_html ($data ['amazon-width']).'"
' : '') .
'  height = "'.esc_html ($data ['amazon-height']).'"
  type = "a9"
'.(implode ("\n", $amp_lines)).'
  data-regionurl='.$regionurl.'>
</amp-ad>';

        }

        break;
    }

    return $code;
  }

  public function adsense_size_styles ($data){
    $code = '<style>
';
    $display_inline = false;

    $viewport_data = array ();
    for ($viewport = 1; $viewport <= 6; $viewport ++) {
      $viewport_name  = get_viewport_name ($viewport);
      $viewport_width = get_viewport_width ($viewport);
      if ($viewport_name != '') {
        $viewport_data []= array ('index' => $viewport, 'name' => $viewport_name, 'width' => $viewport_width);
      }
    }

    usort ($viewport_data, 'ai_compare_viewport');
    $viewport_data = array_reverse ($viewport_data);

//    for ($viewport = 6; $viewport >= 1; $viewport --) {
    foreach ($viewport_data as $index => $viewport) {
      $viewport_name  = $viewport ['name'];
      $viewport_width = $viewport ['width'];

      if (!isset ($data ['adsense-viewports'][$index])) continue;

      $adsense_width  = $data ['adsense-viewports'][$viewport ['index'] - 1]['width'];
      $adsense_height = $data ['adsense-viewports'][$viewport ['index'] - 1]['height'];

      if ($viewport_name != '') {
        if ($adsense_width > 0 && $adsense_height > 0) {
          if (!$display_inline) {
            $size_style = 'display: inline-block; ';
            $display_inline = true;
          } else $size_style = '';

          $size_style .= 'width: ' . $adsense_width . 'px; height: ' .$adsense_height . 'px;';
        } else {
            $size_style = 'display: none;';
            $display_inline = false;
          }

        switch ($viewport_width) {
          case 0:
              $code .= '.' . AI_ADSENSE_BLOCK_CLASS . $data ['block']. ' {' . $size_style . '}';
            break;
          default:
              $code .= '@media (min-width: '.$viewport_width.'px) {.' . AI_ADSENSE_BLOCK_CLASS . $data ['block']. ' {' . $size_style . '}}';
            break;
        }

        $code .= ' /* ' . $viewport_name . ($viewport_width == 0 ? ', default' : '') . ' */' . "\n";
      }
    }
    $code .= '</style>
';
    return $code;
  }


  public function import ($code){

    if (trim ($code) == '') {
      return array ('type' => AI_CODE_UNKNOWN);
    }

    $code_expanded_shortodes = do_shortcode ($code);

    $amp = false;
    $adsense_amp = AI_ADSENSE_AMP_DISABLED;
    if (strpos ($code_expanded_shortodes, AD_AMP_SEPARATOR) !== false) {
      $amp = true;
      $adsense_amp = AI_ADSENSE_AMP_ABOVE_THE_FOLD;
    }

    if (!class_exists ('DOMDocument')) {
      echo  __('ERROR: class DOMDocument not found. Your webhost needs to install the DOM extension for PHP.', 'ad-inserter');
      wp_die ();
    }

    try {
      $dom = new DOMDocument ();
      libxml_use_internal_errors (true);
      $dom->loadHTML ($code);
      libxml_clear_errors ();
    } catch (Exception $e) {
        echo 'ERROR: ', $e->getMessage();
        wp_die ();
    }

    // AdSense
    if (strpos ($code, 'data-ad-client') !== false) {
      $adsense_code     = $dom->getElementsByTagName ('ins');
      $adsense_code_amp = $dom->getElementsByTagName ('amp-ad');
      $adsense_code_amp_sticky = $dom->getElementsByTagName ('amp-sticky-ad');
      $adsense_code_amp_auto   = $dom->getElementsByTagName ('amp-auto-ads');

      if ($adsense_code_amp_sticky->length != 0) {
        $adsense_amp = AI_ADSENSE_AMP_STICKY;
      }
      elseif ($adsense_code_amp_auto->length != 0) {
        $adsense_amp = AI_ADSENSE_AMP_AUTO;
      }

      if ($adsense_code_amp->length == 0) {
        if ($adsense_code_amp_auto->length != 0) {
          $adsense_code_amp = $adsense_code_amp_auto;
        }
      }

      if ($adsense_code_amp->length != 0) {
//        $layout = $adsense_code_amp [0]->getAttribute ('layout');               // PHP 5.6.3
        $layout = $adsense_code_amp->item (0)->getAttribute ('layout');
        if ($adsense_amp != AI_ADSENSE_AMP_DISABLED) {
          switch ($layout) {
            case 'fixed-height':
              $adsense_amp = AI_ADSENSE_AMP_ABOVE_THE_FOLD;
              break;
            case 'fixed':
              $adsense_amp = AI_ADSENSE_AMP_FIXED;
              break;
            case 'nodisplay':
              $adsense_amp = AI_ADSENSE_AMP_STICKY;
              break;
            default:
              $auto_format = $adsense_code_amp->item (0)->getAttribute ('data-auto-format');
              if ($auto_format == "rspv") {
                $adsense_amp = AI_ADSENSE_AMP_BELOW_THE_FOLD;
              }
              break;
          }
        }

        if ($adsense_code->length == 0) $adsense_code = $adsense_code_amp;
      }

      if ($adsense_code->length != 0) {
        $data = array (
          'type' => AI_CODE_ADSENSE,
          'adsense-publisher-id' => '',
          'adsense-ad-slot-id' => '',
          'adsense-type' => AI_ADSENSE_STANDARD,
          'adsense-size' => AI_ADSENSE_SIZE_FIXED,
          'adsense-width' => '',
          'adsense-height' => '',
          'adsense-layout' => '',
          'adsense-layout-key' => '',
          'adsense-full-width-responsive' => '',
          'adsense-comment' => '',
          'adsense-amp' => $adsense_amp,
          'adsense-amp-block-on-consent' => '#',
        );

//        $data ['adsense-publisher-id'] = str_replace ('ca-', '', $adsense_code [0]->getAttribute ('data-ad-client'));
        $data ['adsense-publisher-id'] = str_replace ('ca-', '', $adsense_code->item (0)->getAttribute ('data-ad-client'));
//        $data ['adsense-ad-slot-id']   = $adsense_code [0]->getAttribute ('data-ad-slot');
        $data ['adsense-ad-slot-id']   = $adsense_code->item (0)->getAttribute ('data-ad-slot');
        if ($data ['adsense-ad-slot-id'] == '') {
          $data ['adsense-ad-slot-id']   = $adsense_code->item (0)->getAttribute ('data-slot');
        }

//        $adsense_style = $adsense_code [0]->getAttribute ('style');
        $adsense_style = $adsense_code->item (0)->getAttribute ('style');

        $style_width  = preg_match ("/width\s*:\s*(\d+)px/",  $adsense_style, $width_match);
        if ($style_width) $data ['adsense-width'] = $width_match [1];
        if ($data ['adsense-width'] == '') {
          $data ['adsense-width'] = $adsense_code->item (0)->getAttribute ('width');
        }

        $style_height = preg_match ("/height\s*:\s*(\d+)px/", $adsense_style, $height_match);
        if ($style_height) $data ['adsense-height'] = $height_match [1];
        if ($data ['adsense-height'] == '') {
          $data ['adsense-height'] = $adsense_code->item (0)->getAttribute ('height');
        }

        $display = '';
        $style_display = preg_match ("/display\s*:\s*([a-z\-]+)/", $adsense_style, $display_match);
        if ($style_display) $display = $display_match [1];

        $adsense_class = trim ($adsense_code->item (0)->getAttribute ('class'));
        $adsense_classes = explode (' ', $adsense_class);

        $adsense_size = !$style_width && !$style_height && $display == 'block' ? AI_ADSENSE_SIZE_RESPONSIVE : AI_ADSENSE_SIZE_FIXED;

        if (count ($adsense_classes) == 2 && !$style_width && !$style_height) {
          $adsense_size = AI_ADSENSE_SIZE_FIXED_BY_VIEWPORT;

          $viewport_class = $adsense_classes [1];

          $style  = preg_match ("#<style>(.+?)</style>#s",  $code, $style_match);
          $style_lines = explode ("\n", trim ($style_match [1]));


          $viewport_data = array ();
          for ($viewport = 1; $viewport <= 6; $viewport ++) {
            $viewport_name  = get_viewport_name ($viewport);
            $viewport_width = get_viewport_width ($viewport);
            if ($viewport_name != '') {
              $viewport_data []= array ('index' => $viewport, 'name' => $viewport_name, 'width' => $viewport_width);
            }
          }

          usort ($viewport_data, 'ai_compare_viewport');
          $viewport_data = array_reverse ($viewport_data);

          $sizes = array ();
          $viewport_widths = array ();
          $viewport_indexes = array ();
          foreach ($viewport_data as $index => $viewport) {
            $viewport_name  = $viewport ['name'];
            $viewport_width = $viewport ['width'];
            $viewport_index = $viewport ['index'];
            if ($viewport_name != '') {
              $viewport_widths [] = $viewport_width;
              $viewport_indexes [] = $viewport_index;
              $sizes []= array (0 => '', 1 => '');
            }
          }

          if (count ($style_lines) == count ($sizes)) {
            foreach ($style_lines as $index => $style_line) {
              $viewport_index = $viewport_indexes [$index] - 1;

              if (strpos ($style_line, $viewport_class) !== false) {

                $min_width  = preg_match ("/min-width\s*:\s*(\d+)px/",  $style_line, $min_width_match);
                $viewport_width = $min_width ? $min_width_match [1] : '';

                if ($viewport_width == $viewport_widths [$index]) {
                  $styles = explode ($viewport_class, $style_line);
                  $style_line = $styles [1];

                  $style_width  = preg_match ("/width\s*:\s*(\d+)px/",  $style_line, $width_match);
                  $adsense_width = $style_width ? $width_match [1] : '';

                  $style_height  = preg_match ("/height\s*:\s*(\d+)px/",  $style_line, $height_match);
                  $adsense_height = $style_height ? $height_match [1] : '';

                  $sizes [$viewport_index] = array (0 => $adsense_width, 1 => $adsense_height);
                }

              } else $sizes [$viewport_index] = array ('', '');
            }
          }

          $data ['adsense-sizes'] = $sizes;
        }

        $data ['adsense-size'] = $adsense_size;

        $comment = preg_match ("#<!--(.+?)-->#",  $code, $comment_match);
        if ($comment) $data ['adsense-comment'] = trim ($comment_match [1]);

//        $adsense_ad_format = $adsense_code [0]->getAttribute ('data-ad-format');
        $adsense_ad_format = $adsense_code->item (0)->getAttribute ('data-ad-format');

        if ($adsense_amp == AI_ADSENSE_AMP_STICKY) {
          $data ['adsense-type'] = AI_ADSENSE_AMP_ONLY;
        }
        elseif ($adsense_amp == AI_ADSENSE_AMP_AUTO) {
          $data ['adsense-type'] = AI_ADSENSE_AMP_ONLY;
        } else
          switch ($adsense_ad_format) {
            case '':
              break;
            case 'auto':
              break;
            case 'autorelaxed':
              $data ['adsense-type'] = AI_ADSENSE_MATCHED_CONTENT;
              break;
//            case 'link':
//              $data ['adsense-type'] = AI_ADSENSE_LINK;
//              break;
            case 'fluid':
  //            $adsense_ad_layout = $adsense_code [0]->getAttribute ('data-ad-layout');
              $adsense_ad_layout = $adsense_code->item (0)->getAttribute ('data-ad-layout');

              switch ($adsense_ad_layout) {
                case 'in-article':
                  $data ['adsense-type'] = AI_ADSENSE_IN_ARTICLE;
                  break 2;
              }

              $data ['adsense-type']        = AI_ADSENSE_IN_FEED;

              $data ['adsense-layout']      = $adsense_ad_layout;
  //            $data ['adsense-layout-key']  = urlencode ($adsense_code [0]->getAttribute ('data-ad-layout-key'));
              $data ['adsense-layout-key']  = urlencode ($adsense_code->item (0)->getAttribute ('data-ad-layout-key'));

              break;
          }

        $data ['adsense-full-width-responsive'] = $adsense_code->item (0)->getAttribute ('data-full-width-responsive');

        if ($adsense_code_amp->item (0) != null) {
          if ($adsense_code_amp->item (0)->hasAttribute ('data-block-on-consent')) {
            $data ['adsense-amp-block-on-consent'] = $adsense_code->item (0)->getAttribute ('data-block-on-consent');
          }
        }

        return $data;
      }
    }

    // Old AdSense / AdSense Auto ads
    if (strpos ($code, 'google_ad_client') !== false) {

      $data = array (
        'type' => AI_CODE_ADSENSE,
        'adsense-publisher-id' => '',
        'adsense-ad-slot-id' => '',
        'adsense-type' => AI_ADSENSE_STANDARD,
        'adsense-size' => AI_ADSENSE_SIZE_FIXED,
        'adsense-width' => '',
        'adsense-height' => '',
        'adsense-layout' => '',
        'adsense-layout-key' => '',
        'adsense-amp' => $adsense_amp,
        'adsense-amp-block-on-consent' => '#',
      );

      $comment = preg_match ("#<!--(.+?)-->#",  $code, $comment_match);
      if ($comment) $data ['adsense-comment'] = trim ($comment_match [1]);

      if (preg_match ("/google_ad_client.+[\"\'](.+?)[\"\']/", $code, $match)) {
        $data ['adsense-publisher-id'] = str_replace ('ca-', '', $match [1]);
      }

      if (preg_match ("/google_ad_slot.+[\"\'](.+?)[\"\']/", $code, $match)) {
        $data ['adsense-ad-slot-id'] = $match [1];
      }

      if (preg_match ("/google_ad_width[^\d]+(\d+)/", $code, $match)) {
        $data ['adsense-width'] = $match [1];
      }

      if (preg_match ("/google_ad_height[^\d]+(\d+)/", $code, $match)) {
        $data ['adsense-height'] = $match [1];
      }

      if (preg_match ("/enable_page_level_ads[^\d]+true/", $code, $match)) {
        $data ['adsense-type'] = AI_ADSENSE_AUTO;
      }

      return $data;
    }

    // Amazon
    if (strpos ($code, 'amzn_assoc_') !== false) {

      $data = array (
        'type' => AI_CODE_AMAZON,
        'amazon-amp' => AI_AMAZON_AMP_DISABLED,
        'amazon-width' => '',
        'amazon-height' => '200',
        'amazon-amp-block-on-consent' => '#',
      );

      if (strpos ($code, 'data-amzn_assoc_') !== false) {
        $data ['amazon-amp'] = AI_AMAZON_AMP_ENABLED;

        $amazon_amp_ad = $dom->getElementsByTagName ('amp-ad');
        if ($amazon_amp_ad->item (0)->getAttribute ('width') != '') {
          $data ['amazon-width'] = $amazon_amp_ad->item (0)->getAttribute ('width');
        }
        if ($amazon_amp_ad->item (0)->getAttribute ('height') != '') {
          $data ['amazon-height'] = $amazon_amp_ad->item (0)->getAttribute ('height');
        }
        if ($amazon_amp_ad->item (0)->hasAttribute  ('data-block-on-consent')) {
          $data ['amazon-amp-block-on-consent'] = $amazon_amp_ad->item (0)->getAttribute ('data-block-on-consent');
        }
      }

      if (preg_match_all ("/(amzn_assoc_[^\s=]+?)\s*=\s*[\"](.+?)[\"]/", $code, $matches)) {
        $unique_matches = array ();
        $unique_matches_values = array ();
        foreach ($matches [1] as $index => $match) {
          $found = false;
          foreach ($unique_matches as $unique_match) {
            if ($match == $unique_match) {
              $found = true;
              break;
            }
          }

          if (!$found) {
            $unique_matches [] = $match;
            $unique_matches_values [] = $matches [2][$index];
          }
        }

        $amazon_data = '';
        foreach ($unique_matches as $index => $unique_match) {
          if ($amazon_data != '') $amazon_data .= "\n";
          $amazon_data .= $unique_match . ' = "' . $unique_matches_values [$index] . '"';
        }

        $amazon_script = $dom->getElementsByTagName ('script');
        if ($amazon_script-> length >= 2) {
          $amazon_data .= "\n".'regionurl' . ' = "' . $amazon_script->item (1)->getAttribute ('src') . '"';
        }

        $data ['amazon-data'] = $amazon_data;
      }


      return $data;
    }

    // Banner
    $links  = $dom->getElementsByTagName ('a');
    $images = $dom->getElementsByTagName ('img');

    if ($links->length != 0 || $images->length != 0) {
      $data = array ('type' => AI_CODE_BANNER, 'image' => '', 'link' => '', 'target' => '');

      if ($images->length != 0) {
//        $data ['image']   = $images [0]->getAttribute ('src');
        $data ['image']   = $images->item (0)->getAttribute ('src');
        $data ['alt']     = $images->item (0)->getAttribute ('alt');
        $data ['loading'] = $images->item (0)->getAttribute ('loading');
      }

      if ($links->length != 0) {
//        $data ['link']    = $links [0]->getAttribute ('href');
        $data ['link']    = $links->item (0)->getAttribute ('href');
//        $data ['target']  = $links [0]->getAttribute ('target');
        $data ['target']  = $links->item (0)->getAttribute ('target');
      }

      return $data;
    }

    return array ('type' => AI_CODE_UNKNOWN);
  }

  public function import_rotation ($code, $extract_check_names = false){
    global $ai_expand_only_rotate_count_check, $ai_wp_data;

    $data = array (
      'options' => array (
          array (
            'code' => $code,
            'name' => '',
            'share' => '',
            'time' => '',
          ),
        ),
    );

    $ai_expand_only_rotate_count_check = true;
    unset ($ai_wp_data [AI_SHORTCODES]['rotate']);
    $code = do_shortcode ($code);
    $ai_expand_only_rotate_count_check = false;

    if (strpos ($code, AD_CHECK_SEPARATOR) !== false) {
      if (!$extract_check_names) {
        return $data;
      }

      if (function_exists ('ai_check_separators') && isset ($ai_wp_data [AI_SHORTCODES]['check'][0]['check']) && $ai_wp_data [AI_SHORTCODES]['check'][0]['check'] == 'statistics') {
        $check_parameters = $ai_wp_data [AI_SHORTCODES]['check'];

        $options = explode (AD_CHECK_SEPARATOR, $code);
        $data ['options'] = array ();
        foreach ($options as $index => $option) {
          $option_code = trim ($option, "\n");
          $option_name = isset ($check_parameters [$index - 1]['name']) ? $check_parameters [$index - 1]['name'] : '';
          $option_index = isset ($check_parameters [$index - 1]['index']) && $check_parameters [$index - 1]['index'] != '' ? (int) $check_parameters [$index - 1]['index'] : $index;

          // Skip option before first CHECK shortcode (always inserted)
          if ($option_index == 0) continue;

          $data ['options'][$option_index - 1] = array ('name' => $option_name);
        }
      }

      return $data;
    }

    preg_match_all ('/\|count([0-9]+?)\|/', $code, $matches);
    if (count ($matches [1]) != 0) {
      return $data;
    }

    preg_match_all ('/\|rotate([0-9]+?)\|/', $code, $matches);
    if (count ($matches [1]) != 0) {
      $rotate_parameters = array ();
      foreach ($matches [1] as $match) {
        $rotate_parameters []= $ai_wp_data [AI_SHORTCODES]['rotate'][$match];
      }
      $code = preg_replace ('/\|rotate([0-9]+?)\|/', AD_ROTATE_SEPARATOR, $code);
    } else if (isset ($ai_wp_data [AI_SHORTCODES]['rotate'])) $rotate_parameters = $ai_wp_data [AI_SHORTCODES]['rotate'];

    if (strpos ($code, AD_ROTATE_SEPARATOR) !== false) {
      $options = explode (AD_ROTATE_SEPARATOR, $code);
      $data ['options'] = array ();
      foreach ($options as $index => $option) {
        $option_code = trim ($option, "\n");

        $rotation_groups = 0;
        if (isset ($rotate_parameters [$index - 1]['group']) && $rotate_parameters [$index - 1]['group'] != '') {
          $rotation_groups = 1;
          $option_name = $rotate_parameters [$index - 1]['group'];
          $option_share = '';
          $option_time  = '';
          $option_scheduling  = '';
        } else {
            $option_name = isset ($rotate_parameters [$index - 1]['name']) ? $rotate_parameters [$index - 1]['name'] : '';
            if (isset ($rotate_parameters [$index - 1]['share'])) {
              if (is_numeric ($rotate_parameters [$index - 1]['share'])) {
                $option_share = intval ($rotate_parameters [$index - 1]['share']);
              }
              elseif (strpos (strtolower ($rotate_parameters [$index - 1]['share']), 'ctr') === 0) {
                $option_share = $rotate_parameters [$index - 1]['share'];
              } else $option_share = '';
            }
//            $option_share = isset ($rotate_parameters [$index - 1]['share']) && is_numeric ($rotate_parameters [$index - 1]['share']) ? intval ($rotate_parameters [$index - 1]['share']) : '';
            $option_time  = isset ($rotate_parameters [$index - 1]['time']) && is_numeric ($rotate_parameters [$index - 1]['time']) ? intval ($rotate_parameters [$index - 1]['time']) : '';
            $option_scheduling = isset ($rotate_parameters [$index - 1]['scheduling']) && strpos ($rotate_parameters [$index - 1]['scheduling'], '%') !== false && strpos ($rotate_parameters [$index - 1]['scheduling'], '=') !== false ? $rotate_parameters [$index - 1]['scheduling'] : '';
          }

        if ($index == 0 && $option_code == '') continue;
        $data ['options'] []= array ('code' => $option_code, 'name' => $option_name, 'share' => $option_share, 'time' => $option_time, 'scheduling' => $option_scheduling, 'groups' => $rotation_groups);
      }
    }

    return $data;
  }

  public function generate_rotation ($rotation_data){

    if (count ($rotation_data) == 1) {
      $rotation_code = trim ($rotation_data [0]['code']);
    } else {
        $rotation_code = '';
        $rotation_groups = $rotation_data [0]['groups'];

        foreach ($rotation_data as $index => $rotation_data_row) {

          $name = trim ($rotation_data_row ['name']);
          $share = trim ($rotation_data_row ['share']);
          $scheduling  = trim ($rotation_data_row ['scheduling']);
          $time  = trim ($rotation_data_row ['time']);
          $code = trim ($rotation_data_row ['code'], "\n");

          if ($index != 0 || $name != '' || $share != '' || $scheduling != ''|| $time != '') {

            $shortcode = "" ;
            if ($index != 0) $shortcode .= "\n\n";

            $shortcode .= '[ADINSERTER ROTATE';

            if ($rotation_groups) {
              if ($name != '') $shortcode .= ' group="'.str_replace ('"', '\'', $name).'"';
            } else {
                if ($name != '') $shortcode .= ' name="'.str_replace ('"', '\'', $name).'"';
                if ($share != '') $shortcode .= ' share="'.str_replace ('"', '\'', $share).'"';
                if ($scheduling  != '') $shortcode .= ' scheduling="'.str_replace ('"', '\'', $scheduling).'"';
                if ($time  != '') $shortcode .= ' time="'.str_replace ('"', '\'', $time).'"';
              }
            $shortcode .= "]\n\n";
          } else $shortcode = '';

          $rotation_code .= $shortcode . $code;
        }
      }

    return $rotation_code;
  }
}

class ai_block_labels {

  var $class;
  var $text_color;
  var $left_text;
  var $right_text;

  public function __construct ($class = '') {
    $this->class = $class == '' ? 'ai-debug-default' : $class;
    $this->text_color = '';
    $this->left_text = '';
    $this->right_text = '';
  }

  public function block_start () {
    return "<section class='ai-debug-block $this->class'>\n";
  }

  public function block_end () {
    return "</section>\n";
  }

  public function bar ($left_text, $left_title = '', $center_text = '', $right_text = '', $right_title = '', $additional_class = '') {
    return
      "<section class='ai-debug-bar $this->class $additional_class'>" .
        $this->invisible_start () .
        $this->bar_text_left ($left_text, $left_title) .
        $this->bar_text_center ($center_text) .
        $this->bar_text_right ($right_text, $right_title) .
        $this->invisible_end () .
      "</section>\n";
  }

  public function bar_hidden_viewport ($left_text, $left_title = '', $center_text = '', $right_text = '', $right_title = '') {
    return
      "<section class='ai-debug-bar ai-debug-viewport-invisible'>" .
        $this->invisible_start () .
        $this->bar_text_left ($left_text, $left_title) .
        $this->bar_text_center ($center_text) .
        $this->bar_text_right ($right_text, $right_title) .
        $this->invisible_end () .
      "</section>\n";
  }

  public function center_bar ($center_text) {
    return
      "<section class='ai-debug-bar $this->class'>" . $this->left_text .
        $this->invisible_start () .
//        "<kbd style='visibility: hidden;'>".$this->left_text."</kbd>" .
        $this->bar_text_center ($center_text) .
//        "<kbd style='visibility: hidden;'>".$this->right_text."</kbd>" .
        $this->invisible_end () .
      "</section>\n";
  }

  public function bar_text_left ($text, $title) {
//    $this->left_text = $text;
    return "<kbd class='ai-debug-text-left' title='$title'>$text</kbd>";
  }

  public function bar_text_center ($text) {
    return "<kbd class='ai-debug-text-center'>&nbsp;$text&nbsp;</kbd>";
  }

  public function bar_text_right ($text, $title) {
//    $this->right_text = $text;
    return "<kbd class='ai-debug-text-right' title='$title'>$text</kbd>";
  }

  public function invisible_start () {
    return '<kbd class="ai-debug-invisible">[AI]</kbd>';
  }

  public function invisible_end () {
    return '<kbd class="ai-debug-invisible">[/AI]</kbd>';
  }

  public function message ($text, $attr = '') {
    return
      "<section class='ai-debug-adb-center' $attr>" .
      $this->invisible_start () .
      $text .
      $this->invisible_end () .
      "</section>\n";
  }

  public function adb_hidden_section_start () {
    return "<section class='ai-adb-show ai-debug-adb-hidden'>";
  }

  public function adb_hidden_section_end () {
    return "</section>\n";
  }

  public function adb_visible_section_start () {
    return "<section class='ai-adb-hide'>";
  }

  public function adb_visible_section_end () {
    return "</section>\n";
  }

}
