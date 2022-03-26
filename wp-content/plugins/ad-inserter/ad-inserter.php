<?php

/*
Plugin Name: Ad Inserter
Version: 2.7.12
Description: Ad management with many advanced advertising features to insert ads at optimal positions
Author: Igor Funa
Author URI: http://igorfuna.com/
Plugin URI: https://adinserter.pro/documentation
Text Domain: ad-inserter
Domain Path: /languages
Requires at least: 4.9
Requires PHP: 5.6
*/

/*

Change Log

Ad Inserter 2.7.12 - 2022-03-09
- Security fix for settings page save url
- Added support to disable ad blocking detection for specific devices
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.7.11 - 2022-01-28
- Security fix for sites using constants to prevent file editing or unfiltered HTML
- Added filters before the options are saved
- Added support for a shortcode for comma separated list of categories with quotes (for Google Ad Manager)
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.7.10 - 2022-01-19
- Security fix for XSS (Reported by Krzysztof Zajac via WPScan)
- Added support to detect and replace blank AdSense blocks
- Added support to load and save plugins settings to a file (Pro only)
- Added support for parallax ads (Pro only)
- Few fixes

Ad Inserter 2.7.9 - 2022-01-05
- Bug fix for timed rotations
- Bug fix for tr_TR translation
- Improved checks for cookies
- Improved compatibility with PHP 8.1
- Added separate list for cookies
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.7.8 - 2021-12-01
- Bug fix for paragraph counting and clearance
- Bug fix for undefined constant error

Ad Inserter 2.7.7 - 2021-11-30
- Few bug fixes

Ad Inserter 2.7.6 - 2021-11-28
- Improved compatibility with PHP 8
- Added translation for tr_TR
- Added support to wait for an interaction before the block is loaded (Pro only)
- Added support to delay insertion of the block (Pro only)
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.7.5 - 2021-10-20
- Added support for fallback block for limits (Pro only)
- Added support to optimize rotation shares by CTR (Pro only)
- Added support to animate out sticky ads (Pro only)
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.7.4 - 2021-09-16
- Updated Google API
- Improved labels for AdSense Auto ads
- Added external tracking support for WP username (Pro only)
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.7.3 - 2021-08-10
- Improved ad blocking detection
- Improved compatibility with PHP 8
- Improved check for update server accessibility (Pro only)
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.7.2 - 2021-07-05
- Added shortcuts for TCF v2 consent cookie checks
- Added support for adinserter shortcode to get post ID
- Improved ad blocking detection
- Changed internal IP to country database (Pro only)
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.7.1 - 2021-06-16
- Improved ad blocking detection
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.7.0 - 2021-05-30
- Added support to list range of post IDs
- Added support for browser language in client lists
- Added support for client-side checks for filter hook ai_block_insertion_check
- Added support for remote plugin managenent (Pro only)
- Added support for scheduling check shortcode (Pro only)
- Added support for daily scheduling time (Pro onlyl)
- Added support for css attribute in check options (Pro only)
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.6.27 - 2021-05-29
- Added support for scheduled rotation
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.6.26 - 2021-05-27
- Few bug fixes (Pro only)

Ad Inserter 2.6.25 - 2021-05-24
- Added support for block names in adinserter shortcode block attributes
- Added support for browser language in client list (experimental)
- Added support for client-side checks for filter hook ai_block_insertion_check (experimental)
- Added support for remote plugin managenent (Pro only, experimental)
- Added support for default custom field values
- Added support for scheduled rotation (experimental)
- Added support for scheduling check shortcode (Pro only, experimental)
- Added support for daily scheduling time (Pro only, experimental)
- Added support for css attribute in check options (Pro only, experimental)
- Added support to list range of post IDs
- Improved ad blocking detection
- Reduced layout shift when using CHECK shortcodes
- Fix for expanded shortcodes in the rotate code generator
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.6.24 - 2021-04-19
- Added support for consent attribute for code generator for AdSense and Amazon AMP ads
- Added support for random number shortcode
- Added support for && and !! operators in client-side client list checks
- Added scheduling time on blocks list (Pro only)
- Improved undismissible message when ad blocking is detected
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.6.23 - 2021-03-17
- Reduced layout shift when using lists and client-side dynamic blocks
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.6.22 - 2021-02-17
- Various security fixes
- Updated AdSense API authorization process
- Reduced layout shift when using client-side device detection
- Added option to block IP addresses for click fraud protection (Pro only)
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.6.21 - 2021-01-24
- Improved compatibility with PHP 8
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.6.20 - 2021-01-06
- Added support for alt text and lazy loading for banner code generator
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.6.19 - 2020-12-16
- Improved code to reduce layout shift when using client-side device detection
- Added translation for es_ES
- Added translation for fr_FR
- Added translation for it_IT
- Improved compatibility with PHP 8
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.6.18 - 2020-11-21
- Added support to change Dynamic blocks setting for adinserter PHP function call
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.6.17 - 2020-10-31
- Fix for ADINSERTER shortcodes in block codes
- Fix for double client-side insertions when using geolocation (Pro only)

Ad Inserter 2.6.16 - 2020-10-20
- Added support for ad blocking detection action every n pageviews
- Added support to individually disable pageview or click tracking (Pro only)
- Changed IAB TCF v2 cookie check name from euconsent-v2 to tcf-v2 (euconsent-v2 will still work)
- Fix for category check on category pages
- Fix for issues with Safari browser
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.6.15 - 2020-10-02
- No ad blocking detection actions for crawlers and bots
- Fix for processing Ad Inserter shortcodes inside HTML tags
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.6.14 - 2020-09-07
- Added support to insert [embed] shortcodes
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.6.13 - 2020-08-26
- Few minor bug fixes

Ad Inserter 2.6.12 - 2020-08-23
- Support for PHP 7.4
- Improved ad blocking detection
- Added options to delay client-side insertions at HTML element
- Added support to check for multiple cookie values (needed for IAB TCF 2.0)
- Added filter hooks for block processing
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.6.11 - 2020-07-23
- Added support for IAB Transparency & Consent Framework 2.0
- Added support for taxonomy for primary category
- Added support for taxonomy for post meta data
- Added support to invert contain/do not contain text condition for paragraph counting
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.6.10 - 2020-06-25
- Added user taxonomy items for logged-in and not logged-in users
- Added option to define tab setup delay (for the plugin settings page)
- Added option to insert unique ad rotation options when block is inserted more than once
- Added support for client-side device detection for AMP pages (for method Show)
- Added support for code generator for Amazon AMP ads
- Added support for custom tracking events (Pro only)
- Few minor bug fixes, cosmetic changes and code improvements

Ad Inserter 2.6.9 - 2020-05-22
- Added option for paragraph counting to search only tag attributes for text
- Added option to embed block Javascript code (to be loaded with Ajax calls)
- Added support to prevent duplicate insertions when the_content filter is called more than once (experimental)
- Added support for the client list to check for partial user agent strings
- Added support for check of cookie object properties
- Improved ad blocking detection
- Viewports no longer need to be in descending width order
- Added option to protect inserted block content (Pro only)
- Added support for adb scripts path filter hook (Pro only)
- Added support to export statistics data to CSV file (Pro only)
- Few minor bug fixes, cosmetic changes and code improvements

*/


if (!defined ('ABSPATH')) exit;

if (!defined ('AD_INSERTER_VERSION')) {


function ai_wp_default_editor () {
  return 'tinymce';
}

function ai_wp_default_editor_html () {
  return 'html';
}

function ai_disable_caching () {
  // WP Super Cache, W3 Total Cache, WP Rocket
  if (!defined('DONOTCACHEPAGE'))
    define('DONOTCACHEPAGE', true);

  if (!defined('DONOTCACHEOBJECT'))
    define('DONOTCACHEOBJECT', true);

  if (!defined('DONOTCACHEDB'))
    define('DONOTCACHEDB', true);

  if (!headers_sent () && !is_user_logged_in ()) {
    header('Cache-Control: private, proxy-revalidate, s-maxage=0');
  }
}

function ai_toolbar_menu_items () {
  global $block_object, $ai_wp_data;

  if (isset ($ai_wp_data [AI_DEBUG_MENU_ITEMS])) return;

  $disable_block_insertions = get_disable_block_insertions ();
  $disable_php_processing   = get_disable_php_processing ();
  $disable_html_code         = get_disable_html_code ();
  $disable_css_code         = get_disable_css_code ();
  $disable_js_code          = get_disable_js_code ();
  $disable_footer_code      = get_disable_footer_code ();
  $disable_header_code      = get_disable_header_code ();

  $statuses =  '<span class="ai-insertion-status"'. ($disable_header_code ? ' style="color: #f22"' : '') . '">H</span> &nbsp; ';
  $statuses .= '<span class="ai-insertion-status"'. ($disable_footer_code ? ' style="color: #f22"' : '') . '">F</span> &nbsp; ';
  $statuses .= '<span class="ai-insertion-status"'. ($disable_js_code ? ' style="color: #f22"' : '') . '">JS</span> &nbsp; ';
  $statuses .= '<span class="ai-insertion-status"'. ($disable_css_code ? ' style="color: #f22"' : '') . '">CSS</span> &nbsp; ';
  $statuses .= '<span class="ai-insertion-status"'. ($disable_html_code ? ' style="color: #f22"' : '') . '">HTML</span> &nbsp; ';
  $statuses .= '<span class="ai-insertion-status"'. ($disable_php_processing ? ' style="color: #f22"' : '') . '">PHP</span> &nbsp; ';
  $statuses .= '<span class="ai-insertion-status"'. ($disable_block_insertions ? ' style="color: #f22"' : '') . '">BLOCKS</span>';

  $insertion_disabled = $disable_block_insertions || $disable_php_processing || $disable_html_code || $disable_css_code || $disable_js_code || $disable_footer_code || $disable_header_code;

  $ai_wp_data [AI_DEBUG_MENU_ITEMS] = array ();

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) == 0) $debug_blocks = 1; else $debug_blocks = 0;
  $debug_blocks_class = $debug_blocks == 0 ? ' on' : '';

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_POSITIONS) == 0) $debug_positions = 0; else $debug_positions = '';
  $debug_positions_class = $debug_positions === '' ? ' on' : '';

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_TAGS) == 0) $debug_tags = 1; else $debug_tags = 0;
  $debug_tags_class = $debug_tags == 0 ? ' on' : '';

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) == 0) $debug_processing = 1; else $debug_processing = 0;
  $debug_processing_class = $debug_processing == 0 ? ' on' : '';

  if (!isset ($_GET [AI_URL_DEBUG_PROCESSING_FE_]) || $_GET [AI_URL_DEBUG_PROCESSING_FE_] == 0) $debug_processing_fe = 1; else $debug_processing_fe = 0;
  $debug_processing__fe_class = $debug_processing_fe == 0 ? ' on' : '';

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_NO_INSERTION) == 0) $debug_no_insertion = 1; else $debug_no_insertion = 0;
  $debug_no_insertion_class = $debug_no_insertion == 0 ? ' on' : '';

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_AD_BLOCKING) == 0) $debug_ad_blocking = 1; else $debug_ad_blocking = 0;
  $debug_ad_blocking_class = $debug_ad_blocking == 0 ? ' on' : '';

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_AD_BLOCKING_STATUS) == 0) $debug_ad_blocking_status = 1; else $debug_ad_blocking_status = 0;
  $debug_ad_blocking_status_class = $debug_ad_blocking_status == 0 ? ' on' : '';

  $debug_settings_on = $debug_blocks == 0 || $debug_positions === '' || $debug_tags == 0 || $debug_processing == 0 || $debug_no_insertion == 0 || $debug_ad_blocking == 0 || $debug_ad_blocking_status == 0;

  $debug_settings_class = $debug_settings_on ? ' on' : '';
  if ($insertion_disabled) $debug_settings_class .= ' red';

  $top_menu_url = $debug_settings_on ? (defined ('AI_DEBUGGING_DEMO') ? get_permalink () : add_query_arg (AI_URL_DEBUG, '0', remove_debug_parameters_from_url ())) :
                                       add_query_arg (array (AI_URL_DEBUG_BLOCKS => '1', AI_URL_DEBUG_POSITIONS => '0'), remove_debug_parameters_from_url ());

  $ai_wp_data [AI_DEBUG_MENU_ITEMS][] = array (
    'id' => 'ai-toolbar',
    'group' => true
  );

  $ai_wp_data [AI_DEBUG_MENU_ITEMS][] = array (
    'id' => 'ai-toolbar-settings',
//    'parent' => 'ai-toolbar',
//    'title' => '<span class="ab-icon'.$debug_settings_class.'"></span>'.AD_INSERTER_NAME . (defined ('AI_DEBUGGING_DEMO') ? ' Debugging DEMO' : ($debug_settings_on ? ' Debugging' : '')),
    'title' => '<span class="ab-icon'.$debug_settings_class.'"></span>'.AD_INSERTER_NAME . (defined ('AI_DEBUGGING_DEMO') ? ' ' . _x('Debugging DEMO', 'Menu item', 'ad-inserter') : ($debug_settings_on ? '' : '')),
    'href' => $top_menu_url,
//    'meta' => $debug_settings_on ? array ('title' => 'Turn Debugging Off') : array (),
  );

  if ($insertion_disabled) {
    $ai_wp_data [AI_DEBUG_MENU_ITEMS][] = array (
      'id' => 'ai-toolbar-status',
      'parent' => 'ai-toolbar-settings',
      'title' => '&nbsp;'.$statuses,
    );
  }

  $ai_wp_data [AI_DEBUG_MENU_ITEMS][] = array (
    'id' => 'ai-toolbar-blocks',
    'parent' => 'ai-toolbar-settings',
    'title' => '<span class="ab-icon'.$debug_blocks_class.'"></span>' . _x('Label Blocks', 'Menu item', 'ad-inserter'),
    'href' => set_url_parameter (AI_URL_DEBUG_BLOCKS, $debug_blocks),
  );

  $ai_wp_data [AI_DEBUG_MENU_ITEMS][] = array (
    'id' => 'ai-toolbar-positions',
    'parent' => 'ai-toolbar-settings',
    'title' => '<span class="ab-icon'.$debug_positions_class.'"></span>' . _x('Show Positions', 'Menu item', 'ad-inserter'),
    'href' => set_url_parameter (AI_URL_DEBUG_POSITIONS, $debug_positions),
  );

  $paragraph_blocks = array ();
  for ($block = 0; $block <= 96; $block ++) {
    $obj = $block_object [$block];
    $automatic_insertion = $obj->get_automatic_insertion();
    if ($block == 0 || !$obj->get_disable_insertion () && ($automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_PARAGRAPH || $automatic_insertion == AI_AUTOMATIC_INSERTION_AFTER_PARAGRAPH)) {

      $block_tags             = trim ($block_object [$block]->get_paragraph_tags ());
      $direction              = $block_object [$block]->get_direction_type() == AI_DIRECTION_FROM_TOP ? 't' : 'b';
      $paragraph_min_words    = intval ($obj->get_minimum_paragraph_words());
      $paragraph_max_words    = intval ($obj->get_maximum_paragraph_words());
      $paragraph_text_type    = $obj->get_paragraph_text_type ();
      $paragraph_text         = trim (html_entity_decode ($obj->get_paragraph_text()));
      $inside_blockquote      = $obj->get_count_inside_blockquote ();
      $count_inside_type      = $obj->get_count_inside ();
      $count_inside_elements  = $obj->get_count_inside_elements ();
      $that_contain_type      = $obj->get_count_inside_elements_contain ();
      $that_contain_text      = trim (html_entity_decode ($obj->get_count_inside_elements_text ()));

      if ($block_tags != '') {
        $found = false;
        foreach ($paragraph_blocks as $index => $paragraph_block) {
          if ($paragraph_block ['tags']           == $block_tags &&
              $paragraph_block ['direction']      == $direction &&
              $paragraph_block ['min']            == $paragraph_min_words &&
              $paragraph_block ['max']            == $paragraph_max_words &&
              $paragraph_block ['text_type']      == $paragraph_text_type &&
              $paragraph_block ['text']           == $paragraph_text &&
              $paragraph_block ['blockquote']     == $inside_blockquote &&
              $paragraph_block ['inside_type']    == $count_inside_type &&
              $paragraph_block ['inside_elemets'] == $count_inside_elements &&
              $paragraph_block ['contain_type']   == $that_contain_type &&
              $paragraph_block ['contain_text']   == $that_contain_text
             ) {
            $found = true;
            break;
          }
        }
        if ($found) array_push ($paragraph_blocks [$index]['blocks'], $block); else
          $paragraph_blocks []= array ('blocks' => array ($block),
            'tags'            => $block_tags,
            'direction'       => $direction,
            'min'             => $paragraph_min_words,
            'max'             => $paragraph_max_words,
            'text_type'       => $paragraph_text_type,
            'text'            => $paragraph_text,
            'blockquote'      => $inside_blockquote,
            'inside_type'     => $count_inside_type,
            'inside_elemets'  => $count_inside_elements,
            'contain_type'    => $that_contain_type,
            'contain_text'    => $that_contain_text,
          );
      }
    }
  }

  $no_paragraph_counting_inside = get_no_paragraph_counting_inside ();

  foreach ($paragraph_blocks as $index => $paragraph_block) {
    $debug_block_active = $debug_positions === '' && in_array ($ai_wp_data [AI_WP_DEBUG_BLOCK], $paragraph_block ['blocks']);
    $block_class = $debug_block_active ? ' on' : '';
//    $block_class = $debug_positions === '' && in_array ($ai_wp_data [AI_WP_DEBUG_BLOCK], $paragraph_block ['blocks']) ? ' on' : '';
    $ai_wp_data [AI_DEBUG_MENU_ITEMS][] = array (
      'id' => 'ai-toolbar-positions-'.$index,
      'parent' => 'ai-toolbar-positions',
      'title' => '<span class="ab-icon'.$block_class.'"></span>'.
         $paragraph_block ['tags'].
        ($paragraph_block ['direction'] == 'b' ? ' <span class="dashicons dashicons-arrow-up-alt up-icon"></span>' : '').
        ($paragraph_block ['min'] != 0 ? ' min '.$paragraph_block ['min']. ' ' : '').
        ($paragraph_block ['max'] != 0 ? ' max '.$paragraph_block ['max']. ' ' : '').
        ($paragraph_block ['blockquote']  ? ' +[' . $no_paragraph_counting_inside . '] ' : '').
        ($paragraph_block ['text'] != '' ? ($paragraph_block ['text_type'] == AI_DO_NOT_CONTAIN ? ' !has ' : ' has ').' ['.htmlentities ($paragraph_block ['text']).']' : '').
        ($paragraph_block ['inside_elemets'] != '' ? ($paragraph_block ['inside_type'] == AI_COUNT_ONLY ? ' insEL' : ' !insEL ').' ['.$paragraph_block ['inside_elemets'].']' : '').
        ($paragraph_block ['contain_text'] != '' ? ($paragraph_block ['contain_type'] == AI_CONTAIN ? ' elHAS' : ' !elHAS ').' ['.htmlentities ($paragraph_block ['contain_text']).']' : ''),

//      'href' => set_url_parameter (AI_URL_DEBUG_POSITIONS, $paragraph_block ['blocks'][0]),
      'href' => set_url_parameter (AI_URL_DEBUG_POSITIONS, $debug_block_active ? '' : $paragraph_block ['blocks'][0]),
    );
  }

  $ai_wp_data [AI_DEBUG_MENU_ITEMS][] = array (
    'id' => 'ai-toolbar-tags',
    'parent' => 'ai-toolbar-settings',
    'title' => '<span class="ab-icon'.$debug_tags_class.'"></span>' . _x('Show HTML Tags', 'Menu item', 'ad-inserter'),
    'href' => set_url_parameter (AI_URL_DEBUG_TAGS, $debug_tags),
  );

  $ai_wp_data [AI_DEBUG_MENU_ITEMS][] = array (
    'id' => 'ai-toolbar-no-insertion',
    'parent' => 'ai-toolbar-settings',
    'title' => '<span class="ab-icon'.$debug_no_insertion_class.'"></span>' . _x('Disable Insertion', 'Menu item', 'ad-inserter'),
    'href' => set_url_parameter (AI_URL_DEBUG_NO_INSERTION, $debug_no_insertion),
  );

  if (defined ('AI_ADBLOCKING_DETECTION') && AI_ADBLOCKING_DETECTION) {
    if ($ai_wp_data [AI_ADB_DETECTION]) {
      $ai_wp_data [AI_DEBUG_MENU_ITEMS][] = array (
        'id' => 'ai-toolbar-adb-status',
        'parent' => 'ai-toolbar-settings',
        'title' => '<span class="ab-icon'.$debug_ad_blocking_status_class.'"></span>' . _x('Ad Blocking Status', 'Menu item', 'ad-inserter'),
        'href' => set_url_parameter (AI_URL_DEBUG_AD_BLOCKING_STATUS, $debug_ad_blocking_status),
      );

      $ai_wp_data [AI_DEBUG_MENU_ITEMS][] = array (
        'id' => 'ai-toolbar-adb',
        'parent' => 'ai-toolbar-settings',
        'title' => '<span class="ab-icon'.$debug_ad_blocking_class.'"></span>' . _x('Simulate Ad Blocking', 'Menu item', 'ad-inserter'),
        'href' => set_url_parameter (AI_URL_DEBUG_AD_BLOCKING, $debug_ad_blocking),
      );
    }
  }

  if (!defined ('AI_DEBUGGING_DEMO')) {

    $ai_wp_data [AI_DEBUG_MENU_ITEMS][] = array (
      'id' => 'ai-toolbar-processing',
      'parent' => 'ai-toolbar-settings',
      'title' => '<span class="ab-icon'.$debug_processing_class.'"></span>' . _x('Log Processing', 'Menu item', 'ad-inserter'),
      'href' => set_url_parameter (AI_URL_DEBUG_PROCESSING, $debug_processing),
    );

    $ai_wp_data [AI_DEBUG_MENU_ITEMS][] = array (
      'id' => 'ai-toolbar-processing-fe',
      'parent' => 'ai-toolbar-processing',
      'title' => '<span class="ab-icon'.$debug_processing__fe_class.'"></span>' . _x('Show Log', 'Menu item', 'ad-inserter'),
      'href' => set_url_parameter (AI_URL_DEBUG_PROCESSING_FE, $debug_processing_fe),
    );
  }
}

function ai_toolbar ($wp_admin_bar) {
  global $ai_wp_data;

  ai_toolbar_menu_items ();

  foreach ($ai_wp_data [AI_DEBUG_MENU_ITEMS] as $menu_item) {
    $wp_admin_bar->add_node ($menu_item);
  }
}

function set_user () {
  global $ai_wp_data;

  if ($ai_wp_data [AI_WP_USER_SET]) return;

  if (is_user_logged_in ())       $ai_wp_data [AI_WP_USER] |= AI_USER_LOGGED_IN;
  if (current_user_role () >= 5)  $ai_wp_data [AI_WP_USER] |= AI_USER_ADMINISTRATOR;

//  if (isset ($_GET [AI_URL_DEBUG_USER]) && $_GET [AI_URL_DEBUG_USER] != 0) $ai_wp_data [AI_WP_USER] = $_GET [AI_URL_DEBUG_USER];

  $ai_wp_data [AI_WP_USER_SET] = true;
}

function set_page_type () {
  global $ai_wp_data, $wp_query;

  if ($ai_wp_data [AI_WP_PAGE_TYPE] != AI_PT_NONE) return;

      if (is_front_page ())                                         $ai_wp_data [AI_WP_PAGE_TYPE] = AI_PT_HOMEPAGE;
  elseif (is_single())                                              $ai_wp_data [AI_WP_PAGE_TYPE] = AI_PT_POST;
  elseif (is_page())                                                $ai_wp_data [AI_WP_PAGE_TYPE] = AI_PT_STATIC;
  elseif (is_feed())                                                $ai_wp_data [AI_WP_PAGE_TYPE] = AI_PT_FEED;
  elseif (is_category())                                            $ai_wp_data [AI_WP_PAGE_TYPE] = AI_PT_CATEGORY;
  elseif (is_archive() || (is_home () && !is_front_page ()))        $ai_wp_data [AI_WP_PAGE_TYPE] = AI_PT_ARCHIVE;
  elseif (is_admin())                                               $ai_wp_data [AI_WP_PAGE_TYPE] = AI_PT_ADMIN;  // Admin pages may also be search pages or ajax requests
  elseif (is_search())                                              $ai_wp_data [AI_WP_PAGE_TYPE] = AI_PT_SEARCH;
  elseif (is_404())                                                 $ai_wp_data [AI_WP_PAGE_TYPE] = AI_PT_404;

  if (
    // AMP, AMP WP
    function_exists ('is_amp_endpoint') && is_amp_endpoint () ||

    // AMP WP
    function_exists ('is_amp_wp') && is_amp_wp ($wp_query) ||

    // AMP for WP - Accelerated Mobile Pages for WordPress
    function_exists ('ampforwp_is_amp_endpoint') && ampforwp_is_amp_endpoint () ||

    // WP AMP Ninja
    isset ($_GET ['wpamp']) ||

    // WP AMP - Accelerated Mobile Pages for WordPress
    function_exists ('is_wp_amp') && is_wp_amp () ||

    // Better AMP - WordPress Complete AMP
    function_exists ('is_better_amp') && is_better_amp ($wp_query) ||

    // PenCi Soledad AMP - WordPress Complete AMP
    function_exists ('is_penci_amp') && is_penci_amp ($wp_query)
  ) {
    $ai_wp_data [AI_WP_AMP_PAGE] = true;
    define ('AI_AMP_PAGE', true);
  }
}

function ai_log_message ($message) {
  global $ai_last_time, $ai_processing_log;
  $ai_processing_log []= rtrim (sprintf ("%4d  %-50s", (microtime (true) - $ai_last_time) * 1000, $message));
}

function ai_log_filter_content ($content_string) {

  $content_string = preg_replace ("/\[\[AI_[A|B]P([\d].?)\]\]/", "", $content_string);
  return str_replace (array ("<!--", "-->", "\n", "\r"), array ("<!++", "++>", "*n", "*r"), $content_string);
}

function ai_log_content (&$content) {
  if (strlen ($content) < 100) ai_log (ai_log_filter_content ($content) . '  ['.number_of_words ($content).' words]'); else
    ai_log (ai_log_filter_content (html_entity_decode (substr ($content, 0, 60))) . ' ... ' . ai_log_filter_content (html_entity_decode (substr ($content, - 60))) . '  ['.number_of_words ($content).' words]');
}

function ai_filter_code ($code) {
  $code = preg_replace ("/\[\[AI_[A|B]P([\d].?)\]\]/", "", $code);
  return str_replace (array ("<!--", "-->"), array ("<!++", "++>"), $code);
}

function ai_dump_code ($code, $max_size = 0) {
  if ($max_size == 0) return ai_filter_code ($code); else
    if ($max_size != 0 && strlen ($code) < $max_size) return ai_filter_code ($code); else
      return ai_filter_code (html_entity_decode (substr ($code, 0, 120))) . ' ... ' . ai_filter_code (html_entity_decode (substr ($code, - 120)));
}

function ai_block_insertion_status ($block, $ai_last_check) {
  global $block_object;

  if ($block < 1 || $block > 96) $block = 0;

  if ($ai_last_check == AI_CHECK_INSERTED) return "INSERTED";
  $status = "FAILED CHECK: ";
  $obj = $block_object [$block];
  switch ($ai_last_check) {
    case AI_CHECK_PAGE_TYPE_FRONT_PAGE:  $status .= "ENABLED ON HOMEPAGE"; break;
    case AI_CHECK_PAGE_TYPE_STATIC_PAGE: $status .= "ENABLED ON STATIC PAGE"; break;
    case AI_CHECK_PAGE_TYPE_POST:        $status .= "ENABLED ON POST"; break;
    case AI_CHECK_PAGE_TYPE_CATEGORY:    $status .= "ENABLED ON CATEGORY"; break;
    case AI_CHECK_PAGE_TYPE_SEARCH:      $status .= "ENABLED ON SEARCH"; break;
    case AI_CHECK_PAGE_TYPE_ARCHIVE:     $status .= "ENABLED ON ARCHIVE"; break;
    case AI_CHECK_PAGE_TYPE_FEED:        $status .= "ENABLED ON FEED"; break;
    case AI_CHECK_PAGE_TYPE_404:         $status .= "ENABLED ON 404"; break;

    case AI_CHECK_DESKTOP_DEVICES:          $status .= "DESKTOP DEVICES"; break;
    case AI_CHECK_MOBILE_DEVICES:           $status .= "MOBILE DEVICES"; break;
    case AI_CHECK_TABLET_DEVICES:           $status .= "TABLET DEVICES"; break;
    case AI_CHECK_PHONE_DEVICES:            $status .= "PHONE DEVICES"; break;
    case AI_CHECK_DESKTOP_TABLET_DEVICES:   $status .= "DESKTOP TABLET DEVICES"; break;
    case AI_CHECK_DESKTOP_PHONE_DEVICES:    $status .= "DESKTOP PHONE DEVICES"; break;

    case AI_CHECK_CATEGORY:                 $status .= "CATEGORY"; break;
    case AI_CHECK_TAG:                      $status .= "TAG"; break;
    case AI_CHECK_TAXONOMY:                 $status .= "TAXONOMY"; break;
    case AI_CHECK_ID:                       $status .= "ID"; break;
    case AI_CHECK_URL:                      $status .= "URL"; break;
    case AI_CHECK_URL_PARAMETER:            $status .= "URL PARAMETER"; break;
    case AI_CHECK_COOKIE:                   $status .= "COOKIE"; break;
    case AI_CHECK_REFERER:                  $status .= "REFERRER ". $obj->get_ad_domain_list(); break;
    case AI_CHECK_CLIENT:                   $status .= "CLIENT ". $obj->get_client_list(); break;
    case AI_CHECK_IP_ADDRESS:               $status .= "IP ADDRESS ". $obj->get_ad_ip_address_list(); break;
    case AI_CHECK_COUNTRY:                  $status .= "COUNTRY ". $obj->get_ad_country_list (true); break;

    case AI_CHECK_SCHEDULING:               $status .= "SCHEDULING"; break;
    case AI_CHECK_CODE:                     $status .= "CODE EMPTY"; break;
    case AI_CHECK_LOGGED_IN_USER:           $status .= "LOGGED-IN USER"; break;
    case AI_CHECK_NOT_LOGGED_IN_USER:       $status .= "NOT LOGGED-IN USER"; break;
    case AI_CHECK_ADMINISTRATOR:            $status .= "ADMINISTRATOR"; break;

    case AI_CHECK_INDIVIDUALLY_DISABLED:    $status .= "INDIVIDUALLY DISABLED"; break;
    case AI_CHECK_INDIVIDUALLY_ENABLED:     $status .= "INDIVIDUALLY ENABLED"; break;
    case AI_CHECK_DISABLED_MANUALLY:        $status .= "DISABLED BY SHORTCODE"; break;

    case AI_CHECK_MAX_INSERTIONS:           $status .= "MAX INSERTIONS " . $obj->get_maximum_insertions (); break;
    case AI_CHECK_MAX_PAGE_BLOCKS:          $status .= "MAX PAGE BLOCKS " . get_max_page_blocks (); break;
    case AI_CHECK_FILTER:                   $status .= ($obj->get_inverted_filter() ? 'INVERTED ' : '') . "FILTER " . $obj->get_call_filter(); break;
    case AI_CHECK_PARAGRAPH_COUNTING:       $status .= "PARAGRAPH COUNTING"; break;
    case AI_CHECK_IMAGE_COUNTING:           $status .= "IMAGE COUNTING"; break;
    case AI_CHECK_MIN_NUMBER_OF_WORDS:      $status .= "MIN NUMBER OF WORDS " . intval ($obj->get_minimum_words()); break;
    case AI_CHECK_MAX_NUMBER_OF_WORDS:      $status .= "MAX NUMBER OF WORDS " . (intval ($obj->get_maximum_words()) == 0 ? 1000000 : intval ($obj->get_maximum_words())); break;
    case AI_CHECK_DEBUG_NO_INSERTION:       $status .= "DEBUG NO INSERTION"; break;
    case AI_CHECK_MAX_IMPRESSIONS:          $status .= "MAX IMPRESSIONS"; break;
    case AI_CHECK_LIMIT_IMPRESSIONS_PER_TIME_PERIOD: $status .= "LIMIT IMPRESSIONS PER TIME PERIOD"; break;
    case AI_CHECK_MAX_CLICKS:               $status .= "MAX CLICKS"; break;
    case AI_CHECK_LIMIT_CLICKS_PER_TIME_PERIOD:      $status .= "LIMIT CLICKS PER TIME PERIOD"; break;
    case AI_CHECK_CFP_IP_ADDRESS:           $status .= "CLICK FRAUD PROTECTION IP ADDRESS"; break;
    case AI_CHECK_INSERTION_NOT_DISABLED:   $status .= "INSERTION PAUSED"; break;
    case AI_CHECK_PARAGRAPH_TAGS:           $status .= "PARAGRAPH TAGS"; break;
    case AI_CHECK_PARAGRAPHS_WITH_TAGS:     $status .= "PARAGRAPHS WITH TAGS"; break;
    case AI_CHECK_PARAGRAPHS_AFTER_NO_COUNTING_INSIDE: $status .= "PARAGRAPHS AFTER NO COUNTING INSIDE"; break;
    case AI_CHECK_PARAGRAPHS_AFTER_NO_COUNTING_INSIDE_ELEMENTS: $status .= "PARAGRAPHS AFTER NO COUNTING INSIDE ELEMENTS"; break;
    case AI_CHECK_PARAGRAPHS_AFTER_MIN_MAX_WORDS:    $status .= "PARAGRAPHS AFTER MIN MAX WORDS"; break;
    case AI_CHECK_PARAGRAPHS_AFTER_TEXT:             $status .= "PARAGRAPHS AFTER TEXT"; break;
    case AI_CHECK_PARAGRAPHS_AFTER_CLEARANCE:        $status .= "PARAGRAPHS AFTER CLEARANCE"; break;
    case AI_CHECK_PARAGRAPHS_MIN_NUMBER:             $status .= "PARAGRAPHS MIN NUMBER"; break;
    case AI_CHECK_PARAGRAPHS_MAX_NUMBER:             $status .= "PARAGRAPHS MAX NUMBER"; break;
    case AI_CHECK_PARAGRAPH_NUMBER:                  $status .= "PARAGRAPH NUMBER " . $obj->get_paragraph_number(); break;
    case AI_CHECK_NO_PARAGRAPHS:            $status .= "NO PARAGRAPHS"; break;

    case AI_CHECK_DO_NOT_INSERT:            $status .= "PARAGRAPH CLEARANCE"; break;
    case AI_CHECK_AD_ABOVE:                 $status .= "PARAGRAPH CLEARANCE ABOVE"; break;
    case AI_CHECK_AD_BELOW:                 $status .= "PARAGRAPH CLEARANCE BELOW"; break;
    case AI_CHECK_SHORTCODE_ATTRIBUTES:     $status .= "SHORTCODE ATTRIBUTES"; break;

    case AI_CHECK_ENABLED_PHP:              $status .= "PHP FUNCTION ENABLED"; break;
    case AI_CHECK_ENABLED_SHORTCODE:        $status .= "SHORTCODE ENABLED"; break;
    case AI_CHECK_ENABLED_WIDGET:           $status .= "WIDGET ENABLED"; break;

    case AI_CUSTOM_FILTER_CHECK:            $status .= "CUSTOM FILTER HOOK CHECK"; break;

    case AI_CHECK_NONE:                     $status = "BLOCK $block"; break;
    default: $status .= "?"; break;
  }
  $ai_last_check = AI_CHECK_NONE;
  return $status;
}

function ai_log_block_status ($block, $ai_last_check) {
  global $block_object, $block_insertion_log, $ad_inserter_globals, $ai_wp_data;

  if ($block >= 1 && $ai_last_check == AI_CHECK_INSERTED) {
    $obj = $block_object [$block];
    $global_name = AI_BLOCK_COUNTER_NAME . $block;

    if ($obj->check_code_insertions !== null) {
      $block_insertion_log [] = sprintf ("% 2d BLOCK % 2d %s %s%s", $block, $block, 'CHECK', '('.$obj->check_code_insertions . ')', $ad_inserter_globals [$global_name] != 1 ? '['.$ad_inserter_globals [$global_name] . ']' : '');
      return '';
    }
    elseif ($obj->no_insertion_text != '') {
      $block_insertion_log [] = sprintf ("% 2d BLOCK % 2d %s %s", $block, $block, $obj->no_insertion_text, $ad_inserter_globals [$global_name] != 1 ? '['.$ad_inserter_globals [$global_name] . ']' : '');
      return '';
    }
  }

  return ai_log_block_insertion_status ($block, $ai_last_check);
}

function ai_log_block_insertion_status ($block, $ai_last_check) {
  global $block_insertion_log, $ad_inserter_globals;

  if ($block < 1) return 'NO BLOCK SHORTCODE';

  $global_name = AI_BLOCK_COUNTER_NAME . $block;

  $block_status = ai_block_insertion_status ($block, $ai_last_check);
  $block_insertion_log [] = sprintf ("% 2d BLOCK % 2d %s %s", $block, $block, $block_status, $ai_last_check == AI_CHECK_INSERTED && $ad_inserter_globals [$global_name] != 1 ? '['.$ad_inserter_globals [$global_name] . ']' : '');

  return "BLOCK $block " . $block_status;
}

function ai_log ($message = "") {
  global $ai_last_time, $ai_processing_log;

  if ($message != "") {
    if ($message [strlen ($message) - 1] == "\n") {
      ai_log_message (str_replace ("\n", "", $message));
      $ai_processing_log []= "";
    } else ai_log_message ($message);
  } else $ai_processing_log []= "";
  $ai_last_time = microtime (true);
}

function remove_debug_parameters_from_url ($url = false) {
  if (defined ('AI_DEBUGGING_DEMO')) {
    $parameters = array (AI_URL_DEBUG, AI_URL_DEBUG_PROCESSING, AI_URL_DEBUG_PROCESSING_FE);
  } else {
      $parameters = array (
        AI_URL_DEBUG,
        AI_URL_DEBUG_PROCESSING,
        AI_URL_DEBUG_PROCESSING_FE,
        AI_URL_DEBUG_PHP,
        AI_URL_DEBUG_BLOCKS,
        AI_URL_DEBUG_CODE,
        AI_URL_DEBUG_USER,
        AI_URL_DEBUG_TAGS,
        AI_URL_DEBUG_POSITIONS,
        AI_URL_DEBUG_NO_INSERTION,
        AI_URL_DEBUG_JAVASCRIPT,
        AI_URL_DEBUG_AD_BLOCKING,
        AI_URL_DEBUG_AD_BLOCKING_STATUS,
        AI_URL_DEBUG_COUNTRY,
        AI_URL_DEBUG_IP_ADDRESS,

        AI_URL_DEBUG_DISABLE_CSS_CODE,
        AI_URL_DEBUG_DISABLE_JS_CODE,
        AI_URL_DEBUG_DISABLE_PHP_PROCESSING,
        AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS,
        AI_URL_DEBUG_DISABLE_HEADER_CODE,
        AI_URL_DEBUG_DISABLE_FOOTER_CODE,
      );

      if (defined ('AI_ADBLOCKING_DETECTION') && AI_ADBLOCKING_DETECTION) {
        $parameters = array_merge ($parameters, array (AI_URL_DEBUG_AD_BLOCKING, AI_URL_DEBUG_AD_BLOCKING_STATUS));
      }
  }

  return remove_query_arg ($parameters, $url);
}

function set_url_parameter ($parameter, $value) {
  return add_query_arg ($parameter, $value, remove_debug_parameters_from_url ());
}

function number_of_words (&$content) {
  $text = str_replace ("\r", "", $content);
  $text = str_replace (array ("\n", "  "), " ", $text);
  $text = preg_replace('#<style.*?'.'>(.*?)</style>#i', '', $text);
  $text = preg_replace('#<script.*?'.'>(.*?)</script>#i', '', $text);
  $text = htmlspecialchars_decode ($text);
  $text = trim (strip_tags ($text));
  $text = preg_replace ('#\s+#', ' ', $text);

  if ($text == '') return 0;

  return count (explode (' ', $text));
}

function ai_loop_check ($query, $action) {
  global $ai_wp_data;

  $ai_wp_data [AI_CONTEXT] = $action == 'loop_start' ? AI_CONTEXT_BEFORE_POST : AI_CONTEXT_AFTER_POST;

  if ($ai_wp_data [AI_WP_AMP_PAGE]) return true;

  if ($action == 'loop_end' && !method_exists ($query, 'is_main_query') && method_exists ($wp_query, 'is_main_query')) {
    $query = $wp_query;
  }

  if (isset ($query) && method_exists ($query, 'is_main_query')) {
    if ($query->is_main_query()) {
      if (isset ($ai_wp_data [AI_HEAD]) && !$ai_wp_data [AI_HEAD]) {
        return true;
      }
    }
  }

  return false;
}


function ai_process_head_codes ($head) {
  global $ai_wp_data;

  if (!get_disable_header_code ()) {
    if (!empty ($ai_wp_data [AI_HEAD_CODES])) {
      $head = str_replace ("<!--[AI_HEAD_CODES]-->", implode ("\n", $ai_wp_data [AI_HEAD_CODES]) . "\n", $head);

      if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0) {
        $head = str_replace ("&lt;!--[AI_HEAD_CODES]--&gt;", '<span style=\'color: #00f;\'>' . str_replace (array ('<', '>'), array ('&lt;', '&gt;'), implode ("\\n", $ai_wp_data [AI_HEAD_CODES])) . '</span>', $head);
      }
    }

    foreach ($ai_wp_data [AI_HEAD_GROUPS] as $group_name => $group_codes) {
      $group_code = implode ("\n", $group_codes);
      $head = str_replace ("<!--[AI_HEAD_GROUPS $group_name]-->", $group_code, $head);

      if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0) {
        $head = str_replace ("&lt;!--[AI_HEAD_GROUPS $group_name]--&gt;", str_replace (array ('<', '>'), array ('<span style=\'color: #c0f;\'>&lt;', '&gt;</span>'), implode ("\\n", $group_codes)), $head);
      }
    }
  }

  $head = preg_replace ("#<!--\[AI(.+?)\]-->#", '', $head);

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0) {
    $head = preg_replace ("#&lt;!--\[AI(.+?)\]--&gt;#", '', $head);
  }

  $head = preg_replace ("#<script .+js/ai\-jquery\.js.+></script>\n#", '', $head);

  return ($head);
}

function ai_buffering_start_hook () {
  global $ai_wp_data;

  if (defined ('AI_BUFFERING')) {
    if (get_output_buffering ()) {
      if ($ai_wp_data [AI_WP_PAGE_TYPE] != AI_PT_AJAX && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
        ai_buffering_start ();
      }
    }
  }
}

function ai_buffering_start () {
  global $ai_wp_data;

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
    ai_log ("BUFFERING START: level " . ob_get_level () );
  }

  ob_start ();

  if (!defined ('AI_BUFFERING_START')) define ('AI_BUFFERING_START', true);
}

function ai_buffering_end () {
  global $ai_wp_data, $ai_total_plugin_time, $ai_db_options_extract, $block_object, $ad_inserter_globals;

  if (!defined ('AI_BUFFERING_START')) return;

  $page = ob_get_clean();

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
    ai_log ("BUFFERING END: level " . ob_get_level ());
    $start_time = microtime (true);
  }

  $matches = preg_split ('/(<body.*?'.'>)/i', $page, - 1, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE);

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
    ai_log ("BUFFER body tag matches: " . (count ($matches) - 1) / 2);
    ai_log ("PHP VERSION COMPARE to 5.4: " . (version_compare (phpversion (), "5.4", ">=") ? 'YES' : 'NO'));

    if (count ($matches) > 3) {
      ai_log ("NO BUFFER PROCESSING - more than one body tag found");
    }
    if (version_compare (phpversion (), "5.4", "<")) {
      ai_log ("NO BUFFER PROCESSING - PHP version below 5.4");
    }
  }

  if (version_compare (phpversion (), "5.4", ">=") && count ($matches) == 3) {
    if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
      ai_log ("BUFFER PROCESSING");
    }

    $head     = $matches [0];
    $body_tag = $matches [1];
    $body     = $matches [2];

    if (isset ($ai_wp_data [AI_BODY_STYLE])) {
      if (preg_match ('#style=[\'"](.*?)[\'"]#i', $body_tag, $body_style)) {
        $old_style = $body_style [1];
        if ($old_style != '') {
          $old_style = trim ($old_style, ' ;');
          if ($old_style != '') {
            $old_style .= '; ';
          }
        }
        $new_style = $old_style . $ai_wp_data [AI_BODY_STYLE];

        $body_tag = str_ireplace ($body_style [0], 'style="'.$new_style.'"', $body_tag);
      } else {
          $body_tag = str_replace ('>', ' style="' . $ai_wp_data [AI_BODY_STYLE] . '">', $body_tag);
        }
    }

    if (isset ($ai_db_options_extract [HTML_ELEMENT_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) && class_exists ('DOMDocument')) {

      $php_version = explode ('.', PHP_VERSION);
      if ($php_version [0] >= 8) {
        // phpQuery for PHP 8
        require_once ('includes/phpQuery_8.php');
      } else
     // phpQuery for PHP 5.6 to PHP 7
     require_once ('includes/phpQuery.php');

      $no_closing_tag = array ('img', 'hr', 'br');
      $multibyte = $ai_wp_data [AI_MBSTRING_LOADED] && get_paragraph_counting_functions() == AI_MULTIBYTE_PARAGRAPH_COUNTING_FUNCTIONS;

      foreach ($ai_db_options_extract [HTML_ELEMENT_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]] as $block) {

        $obj = $block_object [$block];
        $obj->clear_code_cache ();

        switch ($obj->get_automatic_insertion ()) {
          case AI_AUTOMATIC_INSERTION_BEFORE_HTML_ELEMENT:
            $insertion_position = 'before';
            break;
          case AI_AUTOMATIC_INSERTION_AFTER_HTML_ELEMENT:
            $insertion_position = 'after';
            break;
          case AI_AUTOMATIC_INSERTION_INSIDE_HTML_ELEMENT:
            switch ($obj->get_inside_element ()) {
              case AI_HTML_PREPEND_CONTENT:
                $insertion_position = 'prepend';
                break;
              case AI_HTML_APPEND_CONTENT:
                $insertion_position = 'append';
                break;
              case AI_HTML_REPLACE_CONTENT:
                $insertion_position = 'replace-content';
                break;
              case AI_HTML_REPLACE_ELEMENT:
                $insertion_position = 'replace-element';
                break;
            }
            break;
        }

        $selector = $obj->get_html_selector ();

        libxml_use_internal_errors (true);
        $content = phpQuery::newDocumentHTML ($body);
        libxml_use_internal_errors (false);

        foreach (pq ($selector) as $element) {

          if (in_array ($element->tagName, $no_closing_tag)) {
            switch ($insertion_position) {
              case 'replace-content':
              case 'prepend':
              case 'append':
                $insertion_position = 'after';
                break;
            }
          }

          switch ($insertion_position) {
            case 'before':
              pq ($element)->before (AI_MARKER_START.$element->tagName.AI_MARKER_END);
              break;
            case 'after':
              pq ($element)->after (AI_MARKER_START.$element->tagName.AI_MARKER_END);
              break;
            case 'prepend':
              pq ($element)->prepend (AI_MARKER_START.$element->tagName.AI_MARKER_END);
              break;
            case 'append':
              pq ($element)->append (AI_MARKER_START.$element->tagName.AI_MARKER_END);
              break;
            case 'replace-content':
              pq ($element)->prepend (AI_MARKER_START.'-'.$element->tagName.'-'.AI_MARKER_END);
              pq ($element)->append  (AI_MARKER_START.'='.$element->tagName.'='.AI_MARKER_END);
              break;
            case 'replace-element':
              pq ($element)->before (AI_MARKER_START.'-'.$element->tagName.'-'.AI_MARKER_END);
              pq ($element)->after  (AI_MARKER_START.'='.$element->tagName.'='.AI_MARKER_END);
              break;
          }
        }

        switch ($insertion_position) {
          case 'replace-content':
          case 'replace-element':
            $markers  = preg_split ('/('.AI_MARKER_START.'-.*?-'.AI_MARKER_END.')/', $content->htmlOuter (), - 1, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE);
            $markers2 = preg_split ('/('.AI_MARKER_START.'=.*?='.AI_MARKER_END.')/', $content->htmlOuter (), - 1, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE);
            break;
          default:
            $markers = preg_split ('/('.AI_MARKER_START.'.*?'.AI_MARKER_END.')/', $content->htmlOuter (), - 1, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE);
            break;
        }

        $content_before = '';
        $insertions = array ();
        foreach ($markers as $marker) {
          switch ($insertion_position) {
            case 'replace-content':
            case 'replace-element':
              $marker_start_string = AI_MARKER_START.'-';
              break;
            default:
              $marker_start_string = AI_MARKER_START;
              break;
          }
          if (strpos ($marker, $marker_start_string) === 0) {
            switch ($insertion_position) {
              case 'replace-content':
              case 'replace-element':
                $tag = str_replace (array (AI_MARKER_START.'-', '-'.AI_MARKER_END), '', $marker);
                break;
              default:
                $tag = str_replace (array (AI_MARKER_START, AI_MARKER_END), '', $marker);
                break;
            }

            switch ($insertion_position) {
              case 'before':
              case 'replace-element':
                $tag_string = "<{$tag}";
                break;
              case 'after':
                if (in_array ($tag, $no_closing_tag)) $tag_string = '>'; else $tag_string = "</{$tag}>";
                break;
              case 'prepend':
              case 'replace-content':
                $tag_string = "<{$tag}[^>]*>";
                break;
              case 'append':
                $tag_string = "</{$tag}>";
                break;
            }

            preg_match_all ("#{$tag_string}#i", $content_before, $tag_matches);

            switch ($insertion_position) {
              case 'before':
              case 'replace-element':
                $insertions []= array ($tag_string, count ($tag_matches [0]) + 1);
                break;
              case 'after':
                $insertions []= array ($tag_string, count ($tag_matches [0]));
                break;
              case 'replace-content':
              case 'prepend':
                $insertions []= array ($tag_string, count ($tag_matches [0]));
                break;
              case 'append':
                $insertions []= array ($tag_string, count ($tag_matches [0]) + 1);
                break;
            }

            continue;
          }
          $content_before .= $marker;
        }

        switch ($insertion_position) {
          case 'replace-content':
          case 'replace-element':
            $content_before = '';
            $insertions2 = array ();
            foreach ($markers2 as $marker) {
              if (strpos ($marker, AI_MARKER_START.'=') === 0) {
                $tag = str_replace (array (AI_MARKER_START.'=', '='.AI_MARKER_END), '', $marker);
                $tag_string = "</{$tag}>";
                preg_match_all ("#{$tag_string}#i", $content_before, $tag_matches);

                switch ($insertion_position) {
                  case 'replace-content':
                    $insertions2 []= array ($tag_string, count ($tag_matches [0]) + 1);
                    break;
                  case 'replace-element':
                    $insertions2 []= array ($tag_string, count ($tag_matches [0]));
                    break;
                }

                continue;
              }
              $content_before .= $marker;
            }
            break;
        }

        $insertion_offsets = array ();
        foreach ($insertions as $insertion) {
          $tag          = $insertion [0];
          $tag_counter  = $insertion [1];
          preg_match_all ("#$tag#i", $body, $org_tag_matches, PREG_OFFSET_CAPTURE);
          if (isset ($org_tag_matches [0][$tag_counter - 1])) {

            switch ($insertion_position) {
              case 'before':
              case 'replace-element':
                $insertion_offsets []= $org_tag_matches [0][$tag_counter - 1][1];
                break;
              case 'after':
                $insertion_offsets []= $org_tag_matches [0][$tag_counter - 1][1] + strlen ($tag);
                break;
              case 'prepend':
              case 'replace-content':
                $insertion_offsets []= $org_tag_matches [0][$tag_counter - 1][1] + strlen ($org_tag_matches [0][$tag_counter - 1][0]);
                break;
              case 'append':
                $insertion_offsets []= $org_tag_matches [0][$tag_counter - 1][1];
                break;
            }
          }
        }

        sort ($insertion_offsets);

        switch ($insertion_position) {
          case 'replace-content':
          case 'replace-element':
            $insertion_offsets2 = array ();
            foreach ($insertions2 as $insertion) {
              $tag          = $insertion [0];
              $tag_counter  = $insertion [1];
              preg_match_all ("#$tag#i", $body, $org_tag_matches, PREG_OFFSET_CAPTURE);
              if (isset ($org_tag_matches [0][$tag_counter - 1])) {

                switch ($insertion_position) {
                  case 'replace-content':
                    $insertion_offsets2 []= $org_tag_matches [0][$tag_counter - 1][1];
                    break;
                  case 'replace-element':
                    $insertion_offsets2 []= $org_tag_matches [0][$tag_counter - 1][1] + strlen ($tag);
                    break;
                }
              }
            }

            sort ($insertion_offsets2);

            break;
        }

        $new_content = '';
        $current_offset = 0;

        switch ($insertion_position) {
          case 'before':
            $action       = 'before_html_element';
            // translators: Debugging position name Before HTML element
            $action_name  = __('Before', 'ad-inserter') . ' ' . $selector;
            break;
          case 'after':
            $action       = 'after_html_element';
            // translators: Debugging position name After HTML element
            $action_name  = __('After', 'ad-inserter') . ' ' . $selector;
            break;
          case 'prepend':
            $action       = 'prepend_html_element';
            // translators: Debugging position name Prepend content of HTML element (before the content of the HTML element)
            $action_name  = __('Prepend content', 'ad-inserter') . ' ' . $selector;
            break;
          case 'append':
            $action       = 'append_html_element';
            // translators: Debugging position name Append content of HTML element (after the content of the HTML element)
            $action_name  = __('Append content', 'ad-inserter') . ' ' . $selector;
            break;
          case 'replace-content':
            $action       = 'replace_content_html_element';
            // translators: Debugging position name Replace content of HTML element
            $action_name  = __('Replace content', 'ad-inserter') . ' ' . $selector;
            break;
          case 'replace-element':
            // translators: Debugging position name Replace HTML element
            $action       = 'replace_html_element';
            $action_name  = __('Replace', 'ad-inserter') . ' ' . $selector;
            break;
        }

        $globals_name = 'AI_' . strtoupper ($action) . '_COUNTER';
        unset ($ad_inserter_globals [$globals_name]);
        $ai_db_options_extract [$action . CUSTOM_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]] = array ($block);

        foreach ($insertion_offsets as $index => $insertion_offset) {
          if ($multibyte)
            $new_content .= mb_substr ($body, $current_offset, $insertion_offset - $current_offset);
              $new_content .= substr ($body, $current_offset, $insertion_offset - $current_offset);

          switch ($insertion_position) {
            case 'replace-content':
            case 'replace-element':
              if (isset ($insertion_offsets2 [$index])) {
                $current_offset = $insertion_offsets2 [$index];
              } else $current_offset = $insertion_offset;
              break;
            default:
              $current_offset = $insertion_offset;
              break;
          }

          ob_start ();
                                   // Dummy
          ai_custom_hook ($action, AI_AUTOMATIC_INSERTION_DISABLED, $action_name);

          $new_content .= ob_get_clean();
        }

        unset ($ai_db_options_extract [$action . CUSTOM_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]);

        $new_content .= substr ($body, $current_offset);

        $body = $new_content;
      }
    }

    $head = ai_process_head_codes ($head);

    echo $head, $body_tag;

    if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_POSITIONS) != 0) {
      $class = AI_DEBUG_STATUS_CLASS.' status-ok';
      // translators: Debugging message when output buffering is enabled
      echo "<section class='$class'>" . __('OUTPUT BUFFERING', 'ad-inserter') . '</section>';
    }

    // translators: Debugging position
    ai_custom_hook ('above_header', AI_AUTOMATIC_INSERTION_ABOVE_HEADER, 'Above Header', __('Above Header', 'ad-inserter'));
    echo $body;
  } else echo $page;

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
    ai_log ("BUFFER PROCESSING END: ". number_format (1000 * (microtime (true) - $start_time), 2)." ms\n");
//    $ai_wp_data [AI_PROCESSING_TIME] = false;
  }
}

function ai_post_check ($post, $action) {
  global $ai_wp_data, $ad_inserter_globals;

  if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_POST) return false;
  if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_STATIC) return false;

  // Don't use the hook before the wp_head hook ends
  if (!isset ($ai_wp_data [AI_HEAD]) || $ai_wp_data [AI_HEAD]) {
    return false;
  }

  // in_the_loop () is not used on AMP pages (however, AMP plugin uses it)
  switch ($ai_wp_data [AI_WP_AMP_PAGE]) {
    case true:
          if ($ai_wp_data [AI_POST_POSITION] != AI_POST_POSITION_IN_POST) return false;

//      include_once (ABSPATH . 'wp-admin/includes/plugin.php');
//      if (is_plugin_active ('amp/amp.php')) {
//        if (!in_the_loop()) return false;
//      } else {
//          // For other AMP plugins
//          if ($ai_wp_data [AI_POST_POSITION] != AI_POST_POSITION_IN_POST) return false;
//        }
      break;
    default:
      if (!in_the_loop()) return false;
      break;
  }

  // Skip insertion before the first post
  if (!defined ('AI_POST_CHECK')) {
    define ('AI_POST_CHECK', true);
    return false;
  }

  $ai_wp_data [AI_CONTEXT] = AI_CONTEXT_BETWEEN_POSTS;

  return true;
}

function ai_content_marker () {
  global $ai_wp_data;

  if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_AJAX ||
      get_disable_html_code ()) return;

  echo '<span class="ai-content"></span>', "\n";
}

function ai_mark_loop_start () {
  global $ai_wp_data;
  $ai_wp_data [AI_POST_POSITION] = AI_POST_POSITION_IN_POST;
}

function ai_mark_loop_end () {
  global $ai_wp_data;
  $ai_wp_data [AI_POST_POSITION] = AI_POST_POSITION_AFTER_POST;
}

function ai_hook_function_loop_start ($hook_parameter) {
  ai_custom_hook ('loop_start', AI_AUTOMATIC_INSERTION_BEFORE_POST, AI_TEXT_ENG_BEFORE_POST, AI_TEXT_BEFORE_POST, $hook_parameter, 'ai_loop_check');
}

function ai_hook_function_loop_end ($hook_parameter) {
  ai_custom_hook ('loop_end', AI_AUTOMATIC_INSERTION_AFTER_POST, AI_TEXT_ENG_AFTER_POST, AI_TEXT_AFTER_POST, $hook_parameter, 'ai_loop_check');
}

function ai_hook_function_post ($hook_parameter) {
  ai_custom_hook ('the_post', AI_AUTOMATIC_INSERTION_BETWEEN_POSTS, AI_TEXT_ENG_BETWEEN_POSTS, AI_TEXT_BETWEEN_POSTS, $hook_parameter, 'ai_post_check');
}

function ai_hook_function_footer () {
  ai_custom_hook ('wp_footer', AI_AUTOMATIC_INSERTION_FOOTER, AI_TEXT_ENG_FOOTER, AI_TEXT_FOOTER);
}


// Code for PHP VERSION >= 5.3.0
//function ai_get_custom_hook_function ($action, $insertion_type, $name) {
//  return function () use ($action, $insertion_type, $name) {
//    ai_custom_hook ($action, $insertion_type, $name);
//  };
//}


// Code for PHP VERSION < 5.3.0
function ai_custom_hook_function_0 () {
  global $ai_custom_hooks;
  ai_custom_hook ($ai_custom_hooks [0]['action'], AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + 0, $ai_custom_hooks [0]['name']);
}

function ai_custom_hook_function_1 () {
  global $ai_custom_hooks;
  ai_custom_hook ($ai_custom_hooks [1]['action'], AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + 1, $ai_custom_hooks [1]['name']);
}

function ai_custom_hook_function_2 () {
  global $ai_custom_hooks;
  ai_custom_hook ($ai_custom_hooks [2]['action'], AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + 2, $ai_custom_hooks [2]['name']);
}

function ai_custom_hook_function_3 () {
  global $ai_custom_hooks;
  ai_custom_hook ($ai_custom_hooks [3]['action'], AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + 3, $ai_custom_hooks [3]['name']);
}

function ai_custom_hook_function_4 () {
  global $ai_custom_hooks;
  ai_custom_hook ($ai_custom_hooks [4]['action'], AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + 4, $ai_custom_hooks [4]['name']);
}

function ai_custom_hook_function_5 () {
  global $ai_custom_hooks;
  ai_custom_hook ($ai_custom_hooks [5]['action'], AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + 5, $ai_custom_hooks [5]['name']);
}

function ai_custom_hook_function_6 () {
  global $ai_custom_hooks;
  ai_custom_hook ($ai_custom_hooks [6]['action'], AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + 6, $ai_custom_hooks [6]['name']);
}

function ai_custom_hook_function_7 () {
  global $ai_custom_hooks;
  ai_custom_hook ($ai_custom_hooks [7]['action'], AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + 7, $ai_custom_hooks [7]['name']);
}

function ai_custom_hook_function_8 () {
  global $ai_custom_hooks;
  ai_custom_hook ($ai_custom_hooks [8]['action'], AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + 8, $ai_custom_hooks [8]['name']);
}

function ai_custom_hook_function_9 () {
  global $ai_custom_hooks;
  ai_custom_hook ($ai_custom_hooks [9]['action'], AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + 9, $ai_custom_hooks [9]['name']);
}

function ai_custom_hook_function_10 () {
  global $ai_custom_hooks;
  ai_custom_hook ($ai_custom_hooks [10]['action'], AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + 10, $ai_custom_hooks [10]['name']);
}

function ai_custom_hook_function_11 () {
  global $ai_custom_hooks;
  ai_custom_hook ($ai_custom_hooks [11]['action'], AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + 11, $ai_custom_hooks [11]['name']);
}

function ai_custom_hook_function_12 () {
  global $ai_custom_hooks;
  ai_custom_hook ($ai_custom_hooks [12]['action'], AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + 12, $ai_custom_hooks [12]['name']);
}

function ai_custom_hook_function_13 () {
  global $ai_custom_hooks;
  ai_custom_hook ($ai_custom_hooks [13]['action'], AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + 13, $ai_custom_hooks [13]['name']);
}

function ai_custom_hook_function_14 () {
  global $ai_custom_hooks;
  ai_custom_hook ($ai_custom_hooks [14]['action'], AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + 14, $ai_custom_hooks [14]['name']);
}

function ai_custom_hook_function_15 () {
  global $ai_custom_hooks;
  ai_custom_hook ($ai_custom_hooks [15]['action'], AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + 15, $ai_custom_hooks [15]['name']);
}

function ai_custom_hook_function_16 () {
  global $ai_custom_hooks;
  ai_custom_hook ($ai_custom_hooks [16]['action'], AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + 16, $ai_custom_hooks [16]['name']);
}

function ai_custom_hook_function_17 () {
  global $ai_custom_hooks;
  ai_custom_hook ($ai_custom_hooks [17]['action'], AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + 17, $ai_custom_hooks [17]['name']);
}

function ai_custom_hook_function_18 () {
  global $ai_custom_hooks;
  ai_custom_hook ($ai_custom_hooks [18]['action'], AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + 18, $ai_custom_hooks [18]['name']);
}

function ai_custom_hook_function_19 () {
  global $ai_custom_hooks;
  ai_custom_hook ($ai_custom_hooks [19]['action'], AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + 19, $ai_custom_hooks [19]['name']);
}

function ai_wp_hook () {
  global $ai_wp_data, $ai_db_options_extract, $ad_inserter_globals, $ai_total_plugin_time, $ai_walker, $ai_custom_hooks;

  if (defined ('AI_WP_HOOK')) return;
  define ('AI_WP_HOOK', true);

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
    ai_log ("WP HOOK START");
    $ai_processing_time_active = $ai_wp_data [AI_PROCESSING_TIME];
    $ai_wp_data [AI_PROCESSING_TIME] = true;
    $start_time = microtime (true);
  }

  set_page_type ();
  set_user ();

  ai_http_header ();

  if (($ai_wp_data [AI_WP_USER] & AI_USER_ADMINISTRATOR) != 0 && get_disable_caching ()) ai_disable_caching ();

  if (($ai_wp_data [AI_WP_USER] & AI_USER_ADMINISTRATOR) != 0) {
    $ai_wp_data [AI_HTML_ELEMENT_SELECTION] = isset ($_POST ['html_element_selection']) ? (bool) $_POST ['html_element_selection'] : false;
  }


  if ($ai_wp_data [AI_WP_PAGE_TYPE] != AI_PT_ADMIN &&
      ($ai_wp_data [AI_WP_USER] & AI_USER_ADMINISTRATOR) != 0 &&
      get_admin_toolbar_debugging () &&
      (!is_multisite() || is_main_site () || multisite_settings_page_enabled ()))
    add_action ('admin_bar_menu', 'ai_toolbar', 9920);

  $url_debugging = get_remote_debugging () || ($ai_wp_data [AI_WP_USER] & AI_USER_ADMINISTRATOR) != 0 || defined ('AI_DEBUGGING_DEMO');

  if (!is_admin() || defined ('DOING_AJAX') || defined ('AI_DEBUGGING_DEMO')) {
    if (isset ($_GET [AI_URL_DEBUG]) && $_GET [AI_URL_DEBUG] == 0) {
      if (isset ($_COOKIE ['AI_WP_DEBUGGING'])) {
        unset ($_COOKIE ['AI_WP_DEBUGGING']);
        ai_setcookie ('AI_WP_DEBUGGING', '', time() - (15 * 60), COOKIEPATH);
      }
      if (isset ($_COOKIE ['AI_WP_DEBUG_BLOCK'])) {
        unset ($_COOKIE ['AI_WP_DEBUG_BLOCK']);
        ai_setcookie ('AI_WP_DEBUG_BLOCK', '', time() - (15 * 60), COOKIEPATH);
      }
    } else {
        $ai_wp_data [AI_WP_DEBUGGING]   = isset ($_COOKIE ['AI_WP_DEBUGGING'])   ? $ai_wp_data [AI_WP_DEBUGGING] | ($_COOKIE ['AI_WP_DEBUGGING'] & ~AI_DEBUG_PROCESSING) : $ai_wp_data [AI_WP_DEBUGGING];
        $ai_wp_data [AI_WP_DEBUG_BLOCK] = isset ($_COOKIE ['AI_WP_DEBUG_BLOCK']) ? $_COOKIE ['AI_WP_DEBUG_BLOCK'] : 0;

        if (isset ($_GET [AI_URL_DEBUG_BLOCKS]))
          if ($_GET [AI_URL_DEBUG_BLOCKS] && $url_debugging) $ai_wp_data [AI_WP_DEBUGGING] |= AI_DEBUG_BLOCKS; else $ai_wp_data [AI_WP_DEBUGGING] &= ~AI_DEBUG_BLOCKS;

        if (isset ($_GET [AI_URL_DEBUG_TAGS]))
          if ($_GET [AI_URL_DEBUG_TAGS] && $url_debugging) $ai_wp_data [AI_WP_DEBUGGING] |= AI_DEBUG_TAGS; else $ai_wp_data [AI_WP_DEBUGGING] &= ~AI_DEBUG_TAGS;

        if (isset ($_GET [AI_URL_DEBUG_NO_INSERTION]))
          if ($_GET [AI_URL_DEBUG_NO_INSERTION] && $url_debugging) $ai_wp_data [AI_WP_DEBUGGING] |= AI_DEBUG_NO_INSERTION; else $ai_wp_data [AI_WP_DEBUGGING] &= ~AI_DEBUG_NO_INSERTION;

        if (isset ($_GET [AI_URL_DEBUG_AD_BLOCKING_STATUS]))
          if ($_GET [AI_URL_DEBUG_AD_BLOCKING_STATUS] && $url_debugging) $ai_wp_data [AI_WP_DEBUGGING] |= AI_DEBUG_AD_BLOCKING_STATUS; else $ai_wp_data [AI_WP_DEBUGGING] &= ~AI_DEBUG_AD_BLOCKING_STATUS;

        if (isset ($_GET [AI_URL_DEBUG_AD_BLOCKING]))
          if ($_GET [AI_URL_DEBUG_AD_BLOCKING] && $url_debugging) $ai_wp_data [AI_WP_DEBUGGING] |= AI_DEBUG_AD_BLOCKING; else $ai_wp_data [AI_WP_DEBUGGING] &= ~AI_DEBUG_AD_BLOCKING;

        if (isset ($_GET [AI_URL_DEBUG_POSITIONS])) {
          $secret = isset ($_GET ['ai-secret']) && $_GET ['ai-secret'] == ai_secret_key ();
          if ($secret) {
            ai_disable_caching ();
          }
          if ($_GET [AI_URL_DEBUG_POSITIONS] !== '' && ($url_debugging || $secret)) $ai_wp_data [AI_WP_DEBUGGING] |= AI_DEBUG_POSITIONS; else $ai_wp_data [AI_WP_DEBUGGING] &= ~AI_DEBUG_POSITIONS;
          if (is_numeric ($_GET [AI_URL_DEBUG_POSITIONS])) $ai_wp_data [AI_WP_DEBUG_BLOCK] = intval ($_GET [AI_URL_DEBUG_POSITIONS]);
          if ($ai_wp_data [AI_WP_DEBUG_BLOCK] < 0 || $ai_wp_data [AI_WP_DEBUG_BLOCK] > 96) $ai_wp_data [AI_WP_DEBUG_BLOCK] = 0;
        }

        if (!defined ('AI_DEBUGGING_DEMO')) {
          if ($ai_wp_data [AI_WP_DEBUGGING] != 0) {
            if (!isset ($_GET ['no-cookie'])) {
              ai_setcookie ('AI_WP_DEBUGGING',   $ai_wp_data [AI_WP_DEBUGGING],   time() + AI_COOKIE_TIME, COOKIEPATH);
            }
          } else if (isset ($_COOKIE ['AI_WP_DEBUGGING'])) ai_setcookie ('AI_WP_DEBUGGING', '', time() - (15 * 60), COOKIEPATH);

          if ($ai_wp_data [AI_WP_DEBUG_BLOCK] != 0) {
            if (!isset ($_GET ['no-cookie'])) {
              ai_setcookie ('AI_WP_DEBUG_BLOCK', $ai_wp_data [AI_WP_DEBUG_BLOCK], time() + AI_COOKIE_TIME, COOKIEPATH);
            }
          } else if (isset ($_COOKIE ['AI_WP_DEBUG_BLOCK'])) ai_setcookie ('AI_WP_DEBUG_BLOCK', '', time() - (15 * 60), COOKIEPATH);

          if ($ai_wp_data [AI_WP_DEBUGGING] != 0 || isset ($_GET [AI_URL_DEBUG])) {
            ai_disable_caching ();
          }

          if ($ai_wp_data [AI_FRONTEND_JS_DEBUGGING] && ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0 && get_dynamic_blocks () == AI_DYNAMIC_BLOCKS_SERVER_SIDE_W3TC && !defined ('AI_NO_W3TC')) {
            $ai_wp_data [AI_W3TC_DEBUGGING] = true;
          }
        } else {
            if ($ai_wp_data [AI_WP_DEBUGGING] != 0) {
              ai_disable_caching ();
            }
          }
      }
  }

  if ($ai_wp_data [AI_HTML_ELEMENT_SELECTION]) {
    add_filter ('show_admin_bar', '__return_false', 999999);
    $ai_wp_data [AI_WP_DEBUGGING] = 0;
  }
  elseif (($ai_wp_data [AI_WP_USER] & AI_USER_LOGGED_IN) == 0 &&
        ((get_remote_debugging () && ($ai_wp_data [AI_WP_DEBUGGING] != 0 || (isset ($_GET [AI_URL_DEBUG]) && $_GET [AI_URL_DEBUG] == 1))) ||
          defined ('AI_DEBUGGING_DEMO'))) {
    function ai_login_adminbar ($wp_admin_bar) {
      $wp_admin_bar->add_menu (array ('id' => 'ai-toolbar-login', 'title' => _x('Log In', 'Menu item', 'ad-inserter'), 'href' => wp_login_url()));
    }

    add_filter ('show_admin_bar', '__return_true', 999999);
    add_action ('admin_bar_menu', 'ai_toolbar', 9920);
    if (!defined ('AI_DEBUGGING_DEMO')) {
      add_action ('admin_bar_menu', 'ai_login_adminbar' );
    }
  }

  if (($ai_wp_data [AI_WP_USER] & AI_USER_ADMINISTRATOR) != 0 && get_force_admin_toolbar ()) {
    add_filter ('show_admin_bar', '__return_true', 999999);
  }

  $debug_positions             = ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_POSITIONS) != 0;
  $debug_tags_positions        = ($ai_wp_data [AI_WP_DEBUGGING] & (AI_DEBUG_POSITIONS | AI_DEBUG_TAGS)) != 0;
  $debug_tags_positions_blocks = ($ai_wp_data [AI_WP_DEBUGGING] & (AI_DEBUG_POSITIONS | AI_DEBUG_TAGS | AI_DEBUG_BLOCKS)) != 0;

  $plugin_priority = get_plugin_priority ();

  if (isset ($ai_db_options_extract [CONTENT_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) && count ($ai_db_options_extract [CONTENT_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) != 0 || $debug_tags_positions)
    add_filter ('the_content',        'ai_content_hook', $plugin_priority);

  if (isset ($ai_db_options_extract [EXCERPT_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) && count ($ai_db_options_extract [EXCERPT_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) != 0 || $debug_tags_positions_blocks)
    add_filter ('the_excerpt',        'ai_excerpt_hook', $plugin_priority);

  add_action ('loop_start', 'ai_mark_loop_start');
  if (isset ($ai_db_options_extract [LOOP_START_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) && count ($ai_db_options_extract [LOOP_START_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) != 0 || $debug_positions)
    add_action ('loop_start',         'ai_hook_function_loop_start');

  add_action ('loop_end', 'ai_mark_loop_end');
  if (isset ($ai_db_options_extract [LOOP_END_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) && count ($ai_db_options_extract [LOOP_END_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) != 0 || $debug_positions)
    add_action ('loop_end',           'ai_hook_function_loop_end');

  if (isset ($ai_db_options_extract [POST_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) && count ($ai_db_options_extract [POST_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) != 0 || $debug_positions)
    add_action ('the_post',           'ai_hook_function_post');

  if ((isset ($ai_db_options_extract [BETWEEN_COMMENTS_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) && count ($ai_db_options_extract [BETWEEN_COMMENTS_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) != 0) ||
      (isset ($ai_db_options_extract [BEFORE_COMMENTS_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) && count ($ai_db_options_extract [BEFORE_COMMENTS_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) != 0) ||
      (isset ($ai_db_options_extract [AFTER_COMMENTS_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) && count ($ai_db_options_extract [AFTER_COMMENTS_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) != 0) ||
      $debug_positions) {
    $ai_wp_data [AI_NUMBER_OF_COMMENTS] = 0;
    add_filter ('comments_array' ,        'ai_comments_array', 10, 2);
    add_filter ('wp_list_comments_args' , 'ai_wp_list_comments_args');
    $ai_walker = new ai_Walker_Comment;
  }


  // Code for PHP VERSION >= 5.3.0
//  foreach ($ai_custom_hooks as $index => $custom_hook) {
//    if (isset ($ai_db_options_extract [$custom_hook ['action'] . CUSTOM_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) && count ($ai_db_options_extract [$custom_hook ['action'] . CUSTOM_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) != 0 || $debug_positions)
//      add_action ($custom_hook ['action'], ai_get_custom_hook_function ($custom_hook ['action'], AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + $custom_hook ['index'] - 1, $custom_hook ['name']), $custom_hook ['priority']);
//  }

  // Code for PHP VERSION < 5.3.0
  foreach ($ai_custom_hooks as $index => $custom_hook) {
    if ($index >= 20) break;

    // Skip custom hooks on standard WP hooks - they will be processed anyway
    switch ($custom_hook ['action']) {
      case 'wp_footer':
//      case 'wp_head':   // no block processing on wp_head
      case 'the_content':
      case 'the_excerpt':
      case 'loop_start':
      case 'loop_end':
//      case 'the_post':  // ai_custom_hook distinguishes between custom hooks and Between posts
        continue 2;
    }

    if (isset ($ai_db_options_extract [$custom_hook ['action'] . CUSTOM_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) && count ($ai_db_options_extract [$custom_hook ['action'] . CUSTOM_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) != 0 || $debug_positions)
      add_action ($custom_hook ['action'], 'ai_custom_hook_function_' . $index, $custom_hook ['priority']);
  }


  if ($ai_wp_data [AI_STICK_TO_THE_CONTENT]) {
    if (trim (get_main_content_element () == '')) {
      if (!defined ('AI_CONTENT_MARKER_NO_LOOP_START')) {
        add_action ('loop_start',    'ai_content_marker');
      }
      if (!defined ('AI_CONTENT_MARKER_NO_LOOP_END')) {
        add_action ('loop_end',      'ai_content_marker');
      }
      if (!defined ('AI_CONTENT_MARKER_NO_GET_SIDEBAR')) {
        add_action ('get_sidebar',   'ai_content_marker');
      }
    }
  }

  if ($ai_wp_data [AI_WP_AMP_PAGE] ) {
    // AMP, Accelerated Mobile Pages
    add_action ('amp_post_template_head', 'ai_amp_head_hook', 99999);
    add_action ('amp_post_template_css',  'ai_amp_css_hook',  99999);
    add_action ('wp_head',                'ai_amp_head_hook', 99999);
    add_action ('wp_head',                'ai_amp_css_hook_style',  99999);

    // WP AMP Ninja
    add_action ('wpamp_custom_script',    'ai_amp_head_hook', 99999);
    // No usable hook for custom CSS
//    add_action ('wpamp_custom_style',     'ai_amp_css_hook', 99999);

    // WP AMP - Accelerated Mobile Pages for WordPress
    add_action ('amphtml_template_head',  'ai_amp_head_hook', 99999);
    add_action ('amphtml_template_css',   'ai_amp_css_hook', 99999);

    // Better AMP - WordPress Complete AMP
    add_action ('better-amp/template/head', 'ai_amp_head_hook', 99999);
    // No usable hook for custom CSS
//    add_action ('better-amp/template/css',  'ai_amp_css_hook', 99999);

    // AMP WP - Google AMP For WordPress
    add_action ('amp_wp_template_head', 'ai_amp_head_hook', 99999);
    // No usable hook for custom CSS
//    add_action ('amp_wp_template_head', 'ai_amp_css_hook', 99999);
  } else
  // WP
  add_action ('wp_head',                  'ai_wp_head_hook', 99999);

  $automatic_insertion_footer_hook = isset ($ai_db_options_extract [FOOTER_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) && count ($ai_db_options_extract [FOOTER_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) != 0 || $debug_positions;
  if ($ai_wp_data [AI_WP_AMP_PAGE]) {
    // AMP, Accelerated Mobile Pages
    if ($automatic_insertion_footer_hook) {
      add_action ('amp_post_template_footer',     'ai_hook_function_footer', 5);
      add_action ('wp_footer',                    'ai_hook_function_footer', 5);
    }
    add_action ('amp_post_template_footer',     'ai_amp_footer_hook', 5);
    add_action ('wp_footer',                    'ai_amp_footer_hook', 5);

    // WP AMP Ninja
    if ($automatic_insertion_footer_hook)
      add_action ('wpamp_google_analytics_code',  'ai_hook_function_footer', 5);
    add_action ('wpamp_google_analytics_code',  'ai_amp_footer_hook', 5);

    // WP AMP - Accelerated Mobile Pages for WordPress
    if ($automatic_insertion_footer_hook)
      add_action ('amphtml_after_footer',         'ai_hook_function_footer', 5);
    add_action ('amphtml_after_footer',         'ai_amp_footer_hook', 5);

    // Better AMP - WordPress Complete AMP
    if ($automatic_insertion_footer_hook)
      add_action ('better-amp/template/footer', 'ai_hook_function_footer', 5);
    add_action ('better-amp/template/footer', 'ai_amp_footer_hook', 5);

    // AMP WP - Google AMP For WordPress
    if ($automatic_insertion_footer_hook)
      add_action ('amp_wp_template_footer', 'ai_hook_function_footer', 5);
    add_action ('amp_wp_template_footer', 'ai_amp_footer_hook', 5);

  } else {
      // WP
      if ($automatic_insertion_footer_hook)
        add_action ('wp_footer', 'ai_hook_function_footer', 5);
      add_action ('wp_footer', 'ai_wp_footer_hook_end_buffering', 5);
      add_action ('wp_footer', 'ai_wp_footer_hook', 9999999);
    }

  if ($ai_wp_data [AI_WP_AMP_PAGE]) {
    // No scripts on AMP pages
    if (defined ('AI_ADBLOCKING_DETECTION') && AI_ADBLOCKING_DETECTION) {
      $ai_wp_data [AI_ADB_DETECTION] = false;
      $ai_wp_data [AI_TRACKING]      = false;
    }
  }

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
    if (!$ai_processing_time_active) {
      $ai_total_plugin_time += microtime (true) - $start_time;
      $ai_wp_data [AI_PROCESSING_TIME] = false;
    }
    ai_log ("WP HOOK END: ". number_format (1000 * (microtime (true) - $start_time), 2)." ms\n");
  }
};

function ai_load_plugin_textdomain_hook () {
  unload_textdomain ('ad-inserter');
  load_plugin_textdomain ('ad-inserter', false, basename (dirname (__FILE__)) . '/languages/');
}

function ai_load_textdomain_mofile ($mo_file, $domain) {
  global $ai_wp_data;

  if (strpos ($mo_file, 'ad-inserter') !== false) {
    if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
      switch (file_exists ($mo_file)) {
        case true:
          ai_log ("TRANSLATION FILE:     " . $mo_file);
          break;
        default:
          ai_log ("FILE NOT FOUND:       " . $mo_file);
          break;
      }
    }

    $path = explode ('/', $mo_file);
    $new_mo_file = dirname (__FILE__) . '/languages/' . end ($path);

    if (file_exists ($new_mo_file)) {
      if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
        ai_log ("USING FILE:           " . $new_mo_file);
      }
      return ($new_mo_file);
    }
  }

  return ($mo_file);
}


function ai_plugins_loaded () {
  global $ai_wp_data, $ai_total_plugin_time;

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
    ai_log ("PLUGINS LOADED START");
    $ai_processing_time_active = $ai_wp_data [AI_PROCESSING_TIME];
    $ai_wp_data [AI_PROCESSING_TIME] = true;
    $start_time = microtime (true);
  }

  add_shortcode ('adinserter', 'ai_process_shortcodes');
  add_shortcode ('ADINSERTER', 'ai_process_shortcodes');

  // TO DO: check referrer

  add_filter ('pre_do_shortcode_tag', 'ai_pre_do_shortcode_tag', 10, 4);

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
    if (!$ai_processing_time_active) {
      $ai_total_plugin_time += microtime (true) - $start_time;
      $ai_wp_data [AI_PROCESSING_TIME] = false;
    }
    ai_log ("PLUGINS LOADED END: ". number_format (1000 * (microtime (true) - $start_time), 2)." ms\n");
  }
}

function ai_init_hook () {
  global $block_object, $ai_wp_data, $ai_db_options_extract, $ai_total_plugin_time;

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
    ai_log ("INIT HOOK START");
    $ai_processing_time_active = $ai_wp_data [AI_PROCESSING_TIME];
    $ai_wp_data [AI_PROCESSING_TIME] = true;
    $start_time = microtime (true);
  }

  if ($ai_wp_data [AI_DISABLE_TRANSLATION]) {
    unload_textdomain ('ad-inserter');

    if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
      ai_log ("TRANSLATION UNLOADED");
    }
  }

  require_once AD_INSERTER_PLUGIN_DIR.'strings.php';

  if (defined ('DOING_AJAX') && DOING_AJAX) {
    $ai_wp_data [AI_WP_PAGE_TYPE] = AI_PT_AJAX;

    ai_load_extract ();

    ai_wp_hook ();
  }

  if (defined ('AI_ADBLOCKING_DETECTION') && AI_ADBLOCKING_DETECTION) {
    if ($ai_wp_data [AI_ADB_DETECTION]) {
      if (function_exists ('ai_check_files')) ai_check_files ();
    }
  }


//  add_shortcode ('adinserter', 'ai_process_shortcodes');
//  add_shortcode ('ADINSERTER', 'ai_process_shortcodes');

//  // TO DO: check referrer

//  add_filter ('pre_do_shortcode_tag', 'ai_pre_do_shortcode_tag', 10, 4);



//  if (defined ('AI_BUFFERING')) {
//    if (get_output_buffering ()) {
//      if ($ai_wp_data [AI_WP_PAGE_TYPE] != AI_PT_AJAX && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
//        ai_buffering_start ();
//      }
//    }
//  }

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
    if (!$ai_processing_time_active) {
      $ai_total_plugin_time += microtime (true) - $start_time;
      $ai_wp_data [AI_PROCESSING_TIME] = false;
    }
    ai_log ("INIT HOOK END: ". number_format (1000 * (microtime (true) - $start_time), 2)." ms\n");
  }
}

//function ai_upgrader_process_complete_hook ($upgrader_object, $options) {
//  global $ai_db_options, $ai_db_options_extract;

//  if (is_array ($options) && array_key_exists ('action', $options) && $options ['action'] == 'update' && array_key_exists ('type', $options)) {
//    if ($options ['type'] == 'plugin' && array_key_exists ('plugins', $options) && is_array ($options ['plugins']) && !empty ($options ['plugins'])) {
//      $this_plugin = plugin_basename (__FILE__);
//      foreach ($options ['plugins'] as $plugin) {
//        if ($plugin == $this_plugin) {
//          if (defined ('AI_EXTRACT_GENERATED') && isset ($ai_db_options [AI_OPTION_GLOBAL]['VERSION'])) {
//            $ai_db_options [AI_OPTION_EXTRACT] = $ai_db_options_extract;
//            ai_update_option (AI_OPTION_NAME, $ai_db_options);
//          }
//          break;
//        }
//      }
//    }
//  }
//}

function ai_load_extract ($recreate = true) {
  global $ai_db_options, $ai_db_options_extract, $version_string, $subversion_string;

  if (isset ($ai_db_options_extract)) return true;

  $expected_extract_version = $version_string . $subversion_string . '-' . '96';
  if (function_exists ('ai_system_output_check')) {
    $expected_extract_version .= 'P';
  }

  if (isset ($ai_db_options [AI_OPTION_EXTRACT]['VERSION']) && $ai_db_options [AI_OPTION_EXTRACT]['VERSION'] == $expected_extract_version) {
    $ai_db_options_extract = $ai_db_options [AI_OPTION_EXTRACT];
    return true;
  } else {
      if (($saved_extract = get_option (AI_EXTRACT_NAME)) === false || $saved_extract ['VERSION'] != $expected_extract_version) {
        if ($recreate) {
          $ai_db_options_extract = ai_generate_extract ($ai_db_options);
          $ai_db_options [AI_OPTION_EXTRACT] = $ai_db_options_extract;
          if (get_option (AI_OPTION_NAME) !== false && !defined ('AI_LOADED_REMOTE_SETTINGS')) {
            update_option (AI_EXTRACT_NAME, $ai_db_options_extract);
          }
          return true;
        }
      } else {
          $ai_db_options_extract = $saved_extract;
          $ai_db_options [AI_OPTION_EXTRACT] = $ai_db_options_extract;
          return true;
        }
    }
  return false;
}

function ai_wp_loaded_hook () {
  global $ai_total_plugin_time, $ai_wp_data;

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
    ai_log ("WP LOADED HOOK START");
    $ai_processing_time_active = $ai_wp_data [AI_PROCESSING_TIME];
    $ai_wp_data [AI_PROCESSING_TIME] = true;
    $start_time = microtime (true);
  }

  ai_load_extract ();

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
    if (!$ai_processing_time_active) {
      $ai_total_plugin_time += microtime (true) - $start_time;
      $ai_wp_data [AI_PROCESSING_TIME] = false;
    }
    if (defined ('AI_EXTRACT_GENERATED')) ai_log ("EXTRACT GENERATED");
    ai_log ("WP LOADED HOOK END: ". number_format (1000 * (microtime (true) - $start_time), 2)." ms\n");
  }
}

function ai_admin_menu_hook () {
  global $ai_settings_page;

  if (is_multisite() && !is_main_site () && !multisite_settings_page_enabled ()) return;

                                                                        // translators: %s: Ad Inserter
  $ai_settings_page = add_submenu_page ('options-general.php', sprintf (__('%s Settings', 'ad-inserter'), AD_INSERTER_NAME), AD_INSERTER_NAME, 'manage_options', basename (__FILE__), 'ai_settings');
  add_action ('admin_enqueue_scripts',  'ai_admin_enqueue_scripts');
  add_action ('admin_enqueue_scripts',  'ai_admin_enqueue_scripts_late', 99999);
  add_action ('admin_enqueue_scripts',  'ai_admin_remove_scripts', 99999);
  add_action ('admin_head',             'ai_admin_head');
  add_filter ('clean_url',              'ai_clean_url', 999999, 2);
}

function ai_admin_head () {
  global $ai_settings_page, $hook_suffix;

  if ($hook_suffix == $ai_settings_page && wp_is_mobile()) {
    echo '<meta name="viewport" content="width=762">', PHP_EOL;
  }
}

function ai_admin_enqueue_scripts ($hook_suffix) {
  global $ai_settings_page, $ai_admin_translations;

  if ($hook_suffix == $ai_settings_page) {
    wp_enqueue_style  ('ai-admin-jquery-ui', plugins_url ('css/jquery-ui-1.10.3.custom.min.css', __FILE__), array (), null);

    wp_enqueue_style ('ai-colorpicker-css',  plugins_url ('includes/colorpicker/css/bootstrap-colorpicker.min.css',    AD_INSERTER_FILE), array (), AD_INSERTER_VERSION);

    if (function_exists ('ai_admin_enqueue_scripts_1')) ai_admin_enqueue_scripts_1 ();

    wp_enqueue_style  ('ai-admin-multi-select', plugins_url ('css/multi-select.css', AD_INSERTER_FILE),     array (), AD_INSERTER_VERSION);
    wp_enqueue_style  ('ai-image-picker',    plugins_url ('css/image-picker.css', __FILE__),                array (), AD_INSERTER_VERSION);
    wp_add_inline_style ('ai-image-picker', '.thumbnail {border-radius: 6px;}');

    wp_enqueue_style  ('ai-combobox-css',    plugins_url ('css/jquery.scombobox.min.css', __FILE__),        array (), AD_INSERTER_VERSION);

    if (function_exists ('ai_admin_enqueue_scripts_2')) ai_admin_enqueue_scripts_2 ();

    wp_enqueue_script ('ai-colorpicker-js',  plugins_url ('includes/colorpicker/js/bootstrap-colorpicker.min.js', AD_INSERTER_FILE ), array (), AD_INSERTER_VERSION, true);

    wp_enqueue_script ('ai-multi-select',    plugins_url ('includes/js/jquery.multi-select.js', AD_INSERTER_FILE ),  array (), AD_INSERTER_VERSION, true);
    wp_enqueue_script ('ai-quicksearch',     plugins_url ('includes/js/jquery.quicksearch.js', AD_INSERTER_FILE ),   array (), AD_INSERTER_VERSION, true);

    // Located in the header to load  datepicker js file to prevent error when async tags used
    wp_enqueue_script ('ai-image-picker-js', plugins_url ('includes/js/image-picker.min.js', __FILE__ ),    array (
      'jquery',
      'jquery-ui-datepicker',
    ), AD_INSERTER_VERSION, false);

    if (AI_SYNTAX_HIGHLIGHTING && !defined ('AI_SAFE_MODE')) {
      wp_enqueue_script ('ai-ace',           plugins_url ('includes/ace/ace.js', __FILE__ ),                array (), AD_INSERTER_VERSION, true);
//      wp_enqueue_script ('ai-ace-ext-modelist', plugins_url ('includes/ace/ext-modelist.js', __FILE__ ),    array (), AD_INSERTER_VERSION, true);
      wp_enqueue_script ('ai-ace-html',      plugins_url ('includes/ace/mode-html.js', __FILE__ ),          array (), AD_INSERTER_VERSION, true);
      wp_enqueue_script ('ai-ace-php',       plugins_url ('includes/ace/mode-php.js',  __FILE__ ), array (), AD_INSERTER_VERSION, true);

      if (get_syntax_highlighter_theme () == AI_SYNTAX_HIGHLIGHTER_THEME || isset ($_POST ["syntax-highlighter-theme"]) && $_POST ["syntax-highlighter-theme"] == AI_SYNTAX_HIGHLIGHTER_THEME)
        wp_enqueue_script ('ai-ace-theme',   plugins_url ('includes/ace/theme-ad_inserter.js', __FILE__ ),  array (), AD_INSERTER_VERSION, true);
    }

    wp_enqueue_script  ('ai-combobox',       plugins_url ('includes/js/jquery.scombobox.min.js', __FILE__), array (
      'jquery',
    ), AD_INSERTER_VERSION , true);

    $admin_script = get_backend_javascript_debugging () ? 'js/ad-inserter.js' : 'js/ad-inserter.min.js';
    wp_enqueue_script ('ai-admin',        plugins_url ($admin_script, __FILE__), array (
      'jquery',
      'jquery-ui-tabs',
      'jquery-ui-button',
      'jquery-ui-tooltip',
      'jquery-ui-datepicker',
      'jquery-ui-dialog',
     ), AD_INSERTER_VERSION, true);

    wp_localize_script ('ai-admin', 'ai_admin', $ai_admin_translations);

    wp_enqueue_script  ('ai-missed',         plugins_url ('includes/js/missed.js', __FILE__), array (), AD_INSERTER_VERSION , true);
  }

  wp_enqueue_style  ('ai-admin-gen',         plugins_url ('css/ai-admin.css', __FILE__),                      array (), AD_INSERTER_VERSION);
  wp_enqueue_script ('ai-admin-gen',         plugins_url ('includes/js/ai-admin.js', __FILE__ ),              array (), AD_INSERTER_VERSION, true);
}

function ai_admin_enqueue_scripts_late ($hook_suffix) {
  global $ai_settings_page;

  if ($hook_suffix == $ai_settings_page) {
//    wp_enqueue_style  ('ai-admin',       plugins_url ('css/ad-inserter.css', __FILE__),                 array (), AD_INSERTER_VERSION);
    wp_enqueue_style  ('ai-admin',       plugins_url ('css/ai-settings.css', __FILE__),                 array (), AD_INSERTER_VERSION);
    wp_add_inline_style ('ai-admin', '.notice {margin: 5px 15px 15px 0;}');
  }
}

function ai_admin_remove_scripts ($hook_suffix) {
  global $ai_settings_page;

  if ($hook_suffix == $ai_settings_page) {

    // Prevent converting emojis to images
    remove_action ('admin_print_scripts', 'print_emoji_detection_script');

    // Fix for Publisher theme: remove scripts loaded on Ad Inserter admin page
    wp_deregister_script ('ace-editor-script');
    wp_dequeue_script ('publisher-admin');

    // Fix for Shell ClubSmart theme (titan framework)
    wp_dequeue_script ('tf-ace');
    // Default settings
    wp_dequeue_script ('tf-ace-theme-chrome');
    wp_dequeue_script ('tf-ace-mode-css');

    // Fix for JNews theme
    wp_dequeue_style ('global-admin');
    wp_dequeue_style ('selectize');
    wp_dequeue_style ('select2');
    wp_dequeue_style ('tooltipster');
    wp_dequeue_style ('jnews-admin');
    wp_dequeue_style ('vex');

    // Fix for OptimizePress plugin: remove styles loaded on Ad Inserter admin page
    wp_dequeue_style ('optimizepress-admin-assets');
    wp_dequeue_style ('optimizepress-admin-common');
    wp_dequeue_style ('optimizepress-tiny-mce-css');
    wp_dequeue_style ('optimizepress-dashicons');

    // Fix for WP Nav Manager plugin: remove styles loaded on Ad Inserter admin page
    wp_dequeue_style ('wp-nav-manager-admin-style');

    // Fix for Booking.com Product Helper plugin: remove styles loaded on Ad Inserter admin page
    wp_dequeue_style ('bookingcom-product-helper-css');

    // Fix for WP BotWatch plugin: remove styles loaded on Ad Inserter admin page
    wp_dequeue_style ('wp-botwatch');

    // Fix for All in One Schema.org Rich Snippets plugin: remove styles loaded on Ad Inserter admin page
    wp_dequeue_style ('admin_style');
    wp_deregister_style ('admin_style');

    // Fix for ACF for AMP plugin: remove styles loaded on Ad Inserter admin page
    wp_dequeue_style ('amp-acf-admin');
    wp_deregister_style ('amp-acf-admin');
    wp_dequeue_script ('ace_code_highlighter_js');
    wp_dequeue_script ('ace_mode_js');
    wp_dequeue_script ('custom_css_js');
    wp_dequeue_script ('field-creator');
    wp_dequeue_script ('amp_acf_field');

    // Fix for WP Lightbox 2 plugin: remove styles loaded on Ad Inserter admin page
    wp_dequeue_style ('jquery-ui-style');
    wp_deregister_style ('jquery-ui-style');

    // Fix for Widget Options plugin: remove styles loaded on Ad Inserter admin page
    wp_dequeue_style ('widgetopts-jquery-ui');
    wp_deregister_style ('widgetopts-jquery-ui');
  }
}

function ai_set_footer_inline_scripts () {
  global $ai_wp_data;

  $adb_code = defined ('AI_ADBLOCKING_DETECTION') && AI_ADBLOCKING_DETECTION && $ai_wp_data [AI_ADB_DETECTION] && !isset ($ai_wp_data [AI_ADB_SHORTCODE_DISABLED]);

  // Check again later in the footer
  $ai_wp_data [AI_FOOTER_INLINE_SCRIPTS] =
    get_dynamic_blocks () == AI_DYNAMIC_BLOCKS_CLIENT_SIDE_SHOW ||
    get_dynamic_blocks () == AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT || //  alerady in $ai_wp_data [AI_CLIENT_SIDE_INSERTION]
    isset ($ai_wp_data [AI_CLIENT_SIDE_ROTATION]) ||
    ($ai_wp_data [AI_TRACKING] && !isset ($ai_wp_data [AI_TRACKING_SHORTCODE_DISABLED])) ||
    $ai_wp_data [AI_STICKY_WIDGETS] ||
    $ai_wp_data [AI_STICK_TO_THE_CONTENT] ||
    $ai_wp_data [AI_ANIMATION] ||
    $ai_wp_data [AI_CLOSE_BUTTONS] ||
    $ai_wp_data [AI_HTML_ELEMENT_SELECTION] ||
    $ai_wp_data [AI_LAZY_LOADING] ||
    $ai_wp_data [AI_CLIENT_SIDE_INSERTION] ||
    $adb_code ||
    ($ai_wp_data [AI_WP_DEBUGGING] & (AI_DEBUG_BLOCKS | AI_DEBUG_POSITIONS)) != 0 ||
    $ai_wp_data [AI_FRONTEND_JS_DEBUGGING] ||
    $ai_wp_data [AI_CHECK_BLOCK] ||
    $ai_wp_data [AI_CLIENT_SIDE_FILTER_CHECKS] ||
    $ai_wp_data [AI_FOOTER_JS_CODE_DOM_READY] != '';
}

function ai_wp_enqueue_scripts_hook () {
  global $ai_wp_data, $wp_version, $wp_scripts, $ai_front_translations;

  // TEST
//  wp_deregister_script ('jquery');

  ai_set_footer_inline_scripts ();

  if ($ai_wp_data [AI_FOOTER_INLINE_SCRIPTS] ||
      ($ai_wp_data [AI_WP_DEBUGGING] & (AI_DEBUG_POSITIONS | AI_DEBUG_BLOCKS)) != 0 ||
      !empty ($_GET) ||
      get_remote_debugging () || ($ai_wp_data [AI_WP_USER] & AI_USER_ADMINISTRATOR) != 0 ||
      $ai_wp_data [AI_ANIMATION]) {

//  Load jQuery on frontend when needed
    if (!get_wait_for_jquery () && isset ($wp_scripts->registered ['jquery'])) {
      wp_enqueue_script ('jquery');
    }

    if ($ai_wp_data [AI_HTML_ELEMENT_SELECTION]) {
      wp_enqueue_script ('ai-jquery-js', plugins_url ('includes/js/ai-jquery.js', __FILE__), array ('jquery', 'jquery-ui-button'), $wp_version . '+' . AD_INSERTER_VERSION);
      wp_enqueue_style  ('ai-html-jquery-ui', plugins_url ('css/jquery-ui-1.10.3.custom.min.css', __FILE__), array (), null);
    }

//    if (!$ai_wp_data [AI_WP_AMP_PAGE]) {
//      wp_enqueue_script ('ai-jquery-js', plugins_url ('includes/js/ai-jquery.js', __FILE__), $jquery_required, $wp_version . '+' . AD_INSERTER_VERSION);

//      wp_localize_script ('ai-jquery-js', 'ai_front', $ai_front_translations);
//    }

    if (!get_disable_css_code () && (get_remote_debugging () || ($ai_wp_data [AI_WP_USER] & AI_USER_ADMINISTRATOR) != 0)) {
      wp_enqueue_style ('dashicons');

      if (get_remote_debugging () && isset ($_GET [AI_URL_DEBUG]) && $_GET [AI_URL_DEBUG]) {
        wp_enqueue_style ('ai-dashicons',         includes_url ('css/dashicons.min.css'), array (), $wp_version);
        wp_enqueue_style ('ai-admin-bar',         includes_url ('css/admin-bar.min.css'), array (), $wp_version);
      }
    }

    if (!get_disable_js_code () && $ai_wp_data [AI_ANIMATION]) {
      if (defined ('AI_STICKY_SETTINGS') && AI_STICKY_SETTINGS) {
        wp_enqueue_style  ('ai-aos',    plugins_url ('includes/aos/ai-aos.css', __FILE__), array (), AD_INSERTER_VERSION);
        wp_enqueue_script ('ai-aos-js', plugins_url ('includes/aos/aos.js', AD_INSERTER_FILE ),  array (), AD_INSERTER_VERSION, true);
      }
    }
  }
}

function ai_clean_url ( $url, $original_url){
  if (strpos ($url, 'async=') !== false && strpos ($url, '/plugins/ad-inserter') !== false) {
//    $url = $original_url;
    $url = str_replace ("' async='async", '', $url);
  }
 return $url;
}

function ai_get_client_side_styles () {
  return
    ".ai-rotate {position: relative;}\n" .
    ".ai-rotate-hidden {visibility: hidden;}\n" .
    ".ai-rotate-hidden-2 {position: absolute; top: 0; left: 0; width: 100%; height: 100%;}\n" .
    ".ai-list-data, .ai-ip-data, .ai-filter-check, .ai-fallback, .ai-list-block, .ai-list-block-ip, .ai-list-block-filter {".AI_ALIGNMENT_CSS_HIDDEN_LIST."}\n" .
    ".ai-list-data, .ai-ip-data, .ai-filter-check, .ai-fallback {min-width: 1px;}\n" .
    "";
}

function ai_get_admin_toolbar_debugging_styles () {
  global $ai_wp_data;

  $css = '';

  if (((get_admin_toolbar_debugging () && ((get_remote_debugging () && $ai_wp_data [AI_WP_DEBUGGING] != 0) || ($ai_wp_data [AI_WP_USER] & AI_USER_LOGGED_IN) != 0)) || defined ('AI_DEBUGGING_DEMO')) && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
    $css .= "#wp-admin-bar-ai-toolbar-settings .ab-icon:before {
  content: '\\f111';
  top: 2px;
  color: rgba(240,245,250,.6)!important;
}
#wp-admin-bar-ai-toolbar-settings-default .ab-icon:before {
  top: 0px;
}
#wp-admin-bar-ai-toolbar-settings .ab-icon.on:before {
  color: #00f200!important;
}
#wp-admin-bar-ai-toolbar-settings .ab-icon.red:before {
  color: #f22!important;
}
#wp-admin-bar-ai-toolbar-settings-default li, #wp-admin-bar-ai-toolbar-settings-default a,
#wp-admin-bar-ai-toolbar-settings-default li:hover, #wp-admin-bar-ai-toolbar-settings-default a:hover {
  border: 1px solid transparent;
}
ul li#wp-admin-bar-ai-toolbar-status {
  margin: 0 0 5px 0;
}
#wp-admin-bar-ai-toolbar-blocks .ab-icon:before {
  content: '\\f135';
}
#wp-admin-bar-ai-toolbar-positions .ab-icon:before {
  content: '\\f207';
}
#wp-admin-bar-ai-toolbar-positions-default .ab-icon:before {
  content: '\\f522';
}
#wp-admin-bar-ai-toolbar-tags .ab-icon:before {
  content: '\\f475';
}
#wp-admin-bar-ai-toolbar-no-insertion .ab-icon:before {
  content: '\\f214';
}
#wp-admin-bar-ai-toolbar-adb-status .ab-icon:before {
  content: '\\f223';
}
#wp-admin-bar-ai-toolbar-adb .ab-icon:before {
  content: '\\f160';
}
#wp-admin-bar-ai-toolbar-processing .ab-icon:before {
  content: '\\f464';
}
#wp-admin-bar-ai-toolbar-processing-fe .ab-icon:before {
  content: '\\f464';
}
#wp-admin-bar-ai-toolbar-positions span.up-icon {
  padding-top: 2px;
}
#wp-admin-bar-ai-toolbar-positions .up-icon:before {
  font: 400 20px/1 dashicons;
}
.ai-insertion-status {
  line-height: 26px!important;
  height: 26px!important;
  white-space: nowrap;
  min-width: 140px;
}
#wp-admin-bar-ai-toolbar-settings .ab-sub-wrapper {
  width: max-content;
  width: -moz-max-content;
}
";
  }

  if (get_admin_toolbar_mobile () && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
    $css .= "@media screen and (max-width: 782px) {
  #wpadminbar #wp-admin-bar-ai-toolbar-settings {
    display: block;
    position: static;
  }

  #wpadminbar #wp-admin-bar-ai-toolbar-settings > .ab-item {
    white-space: nowrap;
    overflow: hidden;
    width: 52px;
    padding: 0;
    color: #a0a5aa;
    position: relative;
  }

  #wpadminbar .quicklinks .menupop ul li .ab-item, #wpadminbar .quicklinks .menupop.hover ul li .ab-item {
    min-height: 28px;
  }
}
";
  }

  return $css;
}


function add_head_inline_styles () {
  global $ai_wp_data;

  if (get_disable_css_code ()) return; // Needed for iframes? $ai_wp_data [AI_CODE_FOR_IFRAME]

  $debugging =
    $ai_wp_data [AI_WP_DEBUGGING] != 0 ||
    (get_remote_debugging () || ($ai_wp_data [AI_WP_USER] & AI_USER_LOGGED_IN) != 0) &&
      (isset ($_GET [AI_URL_DEBUG_PROCESSING_FE]) && $_GET [AI_URL_DEBUG_PROCESSING_FE] != 0 ||
       isset ($_GET [AI_URL_DEBUG_CODE]));

  if ($ai_wp_data [AI_CLIENT_SIDE_DETECTION] ||
      get_dynamic_blocks () == AI_DYNAMIC_BLOCKS_CLIENT_SIDE_SHOW ||
      isset ($ai_wp_data [AI_CLIENT_SIDE_ROTATION]) ||
      $ai_wp_data [AI_CLOSE_BUTTONS] ||
      $ai_wp_data [AI_PARALLAX] ||
      $ai_wp_data [AI_HTML_ELEMENT_SELECTION] ||
      !get_inline_styles () ||
      get_admin_toolbar_debugging () && (get_remote_debugging () || ($ai_wp_data [AI_WP_USER] & AI_USER_LOGGED_IN) != 0) ||
      $debugging) {

    echo "<style>\n";

    if ($ai_wp_data [AI_CLIENT_SIDE_DETECTION] && !$ai_wp_data [AI_CODE_FOR_IFRAME]) echo get_viewport_css ();

    if (get_dynamic_blocks () == AI_DYNAMIC_BLOCKS_CLIENT_SIDE_SHOW || get_dynamic_blocks () == AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT || isset ($ai_wp_data [AI_CLIENT_SIDE_ROTATION])) {
      echo ai_get_client_side_styles ();

      $ai_wp_data [AI_CLIENT_SIDE_CSS] = true;
    }

    if ($ai_wp_data [AI_CLOSE_BUTTONS] && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
//      echo ".ai-close {position: relative;}\n";
//      echo ".ai-close-width {width: auto !important;}\n";
      echo ".ai-close-button {position: absolute; top: -8px; right: -8px; width: 24px; height: 24px; background: url(".plugins_url ('css/images/close-button.png', AD_INSERTER_FILE).") no-repeat center center; cursor: pointer; z-index: 9; display: none;}\n";
      echo ".ai-close-show {display: block;}\n";
      echo ".ai-close-left {right: unset; left: -10px;}\n";
      echo ".ai-close-bottom {top: unset; bottom: -11px;}\n";
      echo ".ai-close-none {visibility: hidden;}\n";
    }

    if ($ai_wp_data [AI_PARALLAX] && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
//      echo ".ai-parallax {width: 100%;}\n";
      echo ".ai-parallax-background {position: absolute; width: 100%; height: 100%; background-attachment: fixed; background-position: center; background-repeat: no-repeat;}\n";
    }

    // Before alignment CSS to not override alignment margin
    if ($debugging) generate_debug_css_base ();

    if (!get_inline_styles () && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
      echo get_alignment_css ();
    }

    // After alignment CSS to override width
    if ($ai_wp_data [AI_CLOSE_BUTTONS] && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
      echo ".ai-close-fit {width: fit-content; width: -moz-fit-content;}\n";
    }

    if ($debugging) generate_debug_css ();

    if ($ai_wp_data [AI_HTML_ELEMENT_SELECTION]) generate_selection_css ();

    echo ai_get_admin_toolbar_debugging_styles ();

    echo "</style>\n";
  }
}

function ai_get_js ($js_name, $replace_js_data = true) {
  global $ai_wp_data;

  if ($ai_wp_data [AI_FRONTEND_JS_DEBUGGING]) {
    $script = @file_get_contents (AD_INSERTER_PLUGIN_DIR."includes/js/$js_name.js");
  } else $script = @file_get_contents (AD_INSERTER_PLUGIN_DIR."includes/js/$js_name.min.js");

  if (!$replace_js_data) return $script;
  return ai_replace_js_data ($script);
}

function ai_randomize_properties ($style, $z_index_min = null, $z_index_max = null) {
  $style = str_replace ('&#039;', '\'', $style);

  $style_array = explode (';', trim ($style, ';'));
  foreach ($style_array as $index => $property) {
    $property = trim ($property);
    if ($z_index_min != null && $z_index_max != null && strpos ($property, 'z-index') === 0) {
      $style_array [$index] = 'z-index: ' . rand ($z_index_min, $z_index_max);
    }
    if (strpos ($property, 'opacity') === 0) {
      $value = str_replace (array ('opacity', ':', ' ', ';'), '', $property);
      if (is_numeric ($value)) {
        $value = 100 * $value - 5 + rand (0, 10);
        if ($value > 100) $value = 100;
        $style_array [$index] = 'opacity: ' . ($value / 100);
      }
    }
    elseif (strpos ($property, '50%') !== false) {
      $style_array [$index] = str_replace ('50%', (47 + rand (0, 6)) . '.' . rand (1, 99) . '%', $style_array [$index]);
    }
    elseif (strpos ($property, '100%') !== false) {
      $style_array [$index] = str_replace ('100%', '100.' . rand (1, 99) . '%', $style_array [$index]);
    }
    elseif (strpos ($property, '#000') !== false) {
      $color = rand (0, 2) . rand (0, 9);
      $style_array [$index] = str_replace ('#000', '#' . $color . $color . $color, $style_array [$index]);
    }
  }
  shuffle ($style_array);
  return trim (implode ('; ', $style_array)) . ';';
}

function ai_replace_js_data ($js) {
  global $block_object, $ai_wp_data;

  if (preg_match_all ('/AI_CONST_([_A-Z0-9]+)/', $js, $match)) {
    foreach ($match [1] as $index => $constant) {
      if (defined ($constant))
        $js = str_replace ($match [0][$index], constant ($constant), $js);
    }
  }

  if (preg_match_all ('/AI_DATA_([_A-Z0-9]+)/', $js, $match)) {
    foreach ($match [1] as $index => $constant) {
      if (defined ($constant) && isset ($ai_wp_data [constant ($constant)]))
        $js = str_replace ($match [0][$index], $ai_wp_data [constant ($constant)], $js);
    }
  }

  if (preg_match_all ('/AI_DATAB_([_A-Z0-9]+)/', $js, $match)) {
    foreach ($match [1] as $index => $constant) {
      if (defined ($constant) && isset ($ai_wp_data [constant ($constant)]))
        $js = str_replace ($match [0][$index], $ai_wp_data [constant ($constant)] ? 1 : 0, $js);
    }
  }

  if (preg_match_all ('/AI_DBG_([_A-Z0-9]+)/', $js, $match)) {
    foreach ($match [1] as $index => $constant) {
      if (defined ($constant))
        $js = str_replace ($match [0][$index], ($ai_wp_data [AI_WP_DEBUGGING] & constant ($constant)) != 0 ? 1 : 0, $js);
    }
  }

  if (preg_match_all ('/AI_FUNC_([_A-Z0-9]+)/', $js, $match)) {
    foreach ($match [1] as $index => $function) {
      $function = strtolower ($function);
      if (function_exists ($function))
        $js = str_replace ($match [0][$index], call_user_func ($function), $js);
    }
  }

  if (preg_match_all ('/AI_FUNCH_([_A-Z0-9]+)/', $js, $match)) {
    foreach ($match [1] as $index => $function) {
      $function = strtolower ($function);
      if (function_exists ($function))
        $js = str_replace ($match [0][$index], html_entity_decode (call_user_func ($function)), $js);
    }
  }

  if (preg_match_all ('/AI_FUNCB_([_A-Z0-9]+)/', $js, $match)) {
    foreach ($match [1] as $index => $function) {
      $function = strtolower ($function);
      if (function_exists ($function))
        $js = str_replace ($match [0][$index], call_user_func ($function) ? 1 : 0, $js);
    }
  }

  if (preg_match_all ('/AI_FUNCT_([_A-Z0-9]+)/', $js, $match)) {
    foreach ($match [1] as $index => $function) {
      $function = strtolower ($function);
      if (function_exists ($function))
        $js = str_replace ($match [0][$index], call_user_func ($function, true), $js);
    }
  }

  if (preg_match_all ('/AI_POST_([_A-Z0-9]+)/', $js, $match)) {
    foreach ($match [1] as $index => $post) {
      $post_name = strtolower ($post);
      $js = str_replace ($match [0][$index], isset ($_POST [$post_name]) ? sanitize_text_field (urldecode ($_POST [$post_name])) : '', $js);
    }
  }

  if (defined ('AI_ADBLOCKING_DETECTION') && AI_ADBLOCKING_DETECTION) {
    if (strpos ($js, 'AI_ADB_OVERLAY_WINDOW') !== false || strpos ($js, 'AI_ADB_MSG_HTML') !== false) {
      $adb = $block_object [AI_ADB_MESSAGE_OPTION_NAME];
      $tags = array ('div', 'span', 'ins', 'section', 'kbd');
      $message_tag = $tags [rand (0, count ($tags) - 1)];
      $overlay_tag = $tags [rand (0, count ($tags) - 1)];

      $basic_adb_overlay_css = AI_BASIC_ADB_OVERLAY_CSS;
      $basic_adb_message_css = AI_BASIC_ADB_MESSAGE_CSS;

      if (strpos ($js, 'AI_ADB_STATUS_MESSAGE') === false) {
        $basic_adb_overlay_css = str_replace ('pointer', 'no-drop', $basic_adb_overlay_css);
        $basic_adb_message_css = str_replace ('pointer', 'no-drop', $basic_adb_message_css);
      }

//      $js = str_replace ('AI_ADB_OVERLAY_WINDOW', "jQuery ('<div>', {attr: {'id': 'ai-adb-overlay', 'style': b64d ('" . base64_encode (str_replace (array ("'", "\r", "\n"), array ("\'", '', ''), $basic_adb_overlay_css) . get_overlay_css ()) . "')}})", $js);
//      $overlay_code = "jQuery ('<".$overlay_tag.">', {attr: {'style': b64d ('" . base64_encode (str_replace (array ("'", "\r", "\n"), array ("\'", '', ''), ai_randomize_properties ($basic_adb_overlay_css, 1110002, 9914998)) . ai_randomize_properties (get_overlay_css ())) . "')}})";
      $overlay_code = "jQuery ('<".$overlay_tag.">', {attr: {'style': b64d ('" . base64_encode (str_replace (array ("\r", "\n"), array ('', ''), ai_randomize_properties ($basic_adb_overlay_css, 1110002, 9914998)) . ai_randomize_properties (get_overlay_css ())) . "')}})";

      for ($level = 1; $level <= 5; $level ++) {
        switch (rand (1, 10)) {
          case 1:
          case 2:
          case 3:
          case 4:
            $tag = 'div';
            break;
          case 5:
          case 6:
          case 7:
            $tag = $tags [rand (0, count ($tags) - 1)];
            break;
          default:
            continue 2;
        }

//        $overlay_code .= ".append (jQuery ('<div>')).append (jQuery ('<div>', {attr: {'style': b64d ('" . base64_encode (str_replace (array ("'", "\r", "\n"), array ("\'", '', ''), ai_randomize_properties ($basic_adb_overlay_css, 100, 99999))) . "')}}))";
        $overlay_code .= ".append (jQuery ('<div>')).append (jQuery ('<div>', {attr: {'style': b64d ('" . base64_encode (str_replace (array ("\r", "\n"), array ('', ''), ai_randomize_properties ($basic_adb_overlay_css, 100, 99999))) . "')}}))";

        $overlay_code = "jQuery ('<".$tag.">').append (" . $overlay_code . ')';

//        if (rand (1, 10) > 5) $overlay_code .= ".append (jQuery ('<div>', {attr: {'style': b64d ('" . base64_encode (str_replace (array ("'", "\r", "\n"), array ("\'", '', ''), ai_randomize_properties ($basic_adb_overlay_css, 100, 99999))) . "')}}))";
        if (rand (1, 10) > 5) $overlay_code .= ".append (jQuery ('<div>', {attr: {'style': b64d ('" . base64_encode (str_replace (array ("\r", "\n"), array ('', ''), ai_randomize_properties ($basic_adb_overlay_css, 100, 99999))) . "')}}))";
        if (rand (1, 10) > 5) $overlay_code .= ".append (jQuery ('<div>'))";
//        if (rand (1, 10) > 5) $overlay_code .= ".prepend (jQuery ('<div>', {attr: {'style': b64d ('" . base64_encode (str_replace (array ("'", "\r", "\n"), array ("\'", '', ''), ai_randomize_properties ($basic_adb_overlay_css, 100, 99999))) . "')}}))";
        if (rand (1, 10) > 5) $overlay_code .= ".prepend (jQuery ('<div>', {attr: {'style': b64d ('" . base64_encode (str_replace (array ("\r", "\n"), array ('', ''), ai_randomize_properties ($basic_adb_overlay_css, 100, 99999))) . "')}}))";
        if (rand (1, 10) > 5) $overlay_code .= ".prepend (jQuery ('<div>'))";
      }

      $js = str_replace ('AI_ADB_OVERLAY_WINDOW', $overlay_code, $js);

//      $js = str_replace ('AI_ADB_MESSAGE_WINDOW', "jQuery ('<div>', {attr: {'id': 'ai-adb-message', 'style': b64d ('" . base64_encode (str_replace (array ("'", "\r", "\n"), array ("\'", '', ''), $basic_adb_message_css) . get_message_css ()) . "')}, 'html': b64d ('" .
//      $message_code = "jQuery ('<".$message_tag.">', {attr: {'style': b64d ('" . base64_encode (str_replace (array ("'", "\r", "\n"), array ("\'", '', ''), ai_randomize_properties ($basic_adb_message_css, 96610999, 99919998)) . ai_randomize_properties (get_message_css ())) . "')}, 'html': b64d ('" .
      $message_code = "jQuery ('<".$message_tag.">', {attr: {'style': b64d ('" . base64_encode (str_replace (array ("\r", "\n"), array ('', ''), ai_randomize_properties ($basic_adb_message_css, 96610999, 99919998)) . ai_randomize_properties (get_message_css ())) . "')}, 'html': b64d ('" .
//        base64_encode (str_replace (array ("'", "\r", "\n"), array ("\'", '', ''), do_shortcode ($adb->ai_getCode ()))) . "')})"; // No need to escape '
        base64_encode (str_replace (array ("\r", "\n"), array ('', ''), do_shortcode ($adb->ai_getCode ()))) . "')})";

      for ($level = 1; $level <= 5; $level ++) {
        switch (rand (1, 10)) {
          case 1:
          case 2:
          case 3:
            $tag = 'div';
            break;
          case 4:
          case 5:
            $tag = 'p';
            break;
          case 6:
          case 7:
            $tag = $tags [rand (0, count ($tags) - 1)];
            break;
          default:
            continue 2;
        }

//        $message_code .= ".append (jQuery ('<p>')).append (jQuery ('<div>', {attr: {'style': b64d ('" . base64_encode (str_replace (array ("'", "\r", "\n"), array ("\'", '', ''), ai_randomize_properties ($basic_adb_message_css, 10000, 999999))) . "')}}))";
        $message_code .= ".append (jQuery ('<p>')).append (jQuery ('<div>', {attr: {'style': b64d ('" . base64_encode (str_replace (array ("\r", "\n"), array ('', ''), ai_randomize_properties ($basic_adb_message_css, 10000, 999999))) . "')}}))";

        $message_code = "jQuery ('<".$tag.">').append (" . $message_code . ')';
//        if (rand (1, 10) > 7) $message_code .= ".append (jQuery ('<div>', {attr: {'style': b64d ('" . base64_encode (str_replace (array ("'", "\r", "\n"), array ("\'", '', ''), ai_randomize_properties ($basic_adb_message_css, 10000, 999999))) . "')}}))";
        if (rand (1, 10) > 7) $message_code .= ".append (jQuery ('<div>', {attr: {'style': b64d ('" . base64_encode (str_replace (array ("\r", "\n"), array ('', ''), ai_randomize_properties ($basic_adb_message_css, 10000, 999999))) . "')}}))";
        if (rand (1, 10) > 7) $message_code .= ".append (jQuery ('<p>'))";
//        if (rand (1, 10) > 7) $message_code .= ".prepend (jQuery ('<div>', {attr: {'style': b64d ('" . base64_encode (str_replace (array ("'", "\r", "\n"), array ("\'", '', ''), ai_randomize_properties ($basic_adb_message_css, 10000, 999999))) . "')}}))";
        if (rand (1, 10) > 7) $message_code .= ".prepend (jQuery ('<div>', {attr: {'style': b64d ('" . base64_encode (str_replace (array ("\r", "\n"), array ('', ''), ai_randomize_properties ($basic_adb_message_css, 10000, 999999))) . "')}}))";
        if (rand (1, 10) > 7) $message_code .= ".prepend (jQuery ('<p>'))";
        if (rand (1, 10) > 3) $message_code .= ".prepend (jQuery ('<p>'))";
      }

      $js = str_replace ('AI_ADB_MESSAGE_WINDOW', $message_code, $js);

//      $js = str_replace ('AI_ADB_MSG_HTML',  base64_encode (str_replace (array ("\r", "\n"), array ('', ''), do_shortcode ($adb->ai_getCode ()))), $js);
      $js = str_replace ('AI_ADB_MSG_HTML',  str_replace (array ("\r", "\n", '"'), array ('', '', '&quot;'), do_shortcode ($adb->ai_getCode ())), $js);
//      $js = str_replace ('AI_ADB_MSG_STYLE', base64_encode (str_replace (array ("\r", "\n"), array ('', ''), ai_randomize_properties ($basic_adb_message_css, 100000, 9999999) . ai_randomize_properties (get_message_css ()))), $js);
      $js = str_replace ('AI_ADB_MSG_STYLE', str_replace (array ("\r", "\n", '"'), array ('', '', '&quot;'), ai_randomize_properties ($basic_adb_message_css, 100000, 9999999) . ai_randomize_properties (get_message_css ())), $js);


      switch (rand (1, 20)) {
        case 1:
          $message_tag = 'section';
          break;
        case 2:
          $message_tag = 'article';
          break;
        case 3:
          $message_tag = 'span';
          break;
        case 4:
          $message_tag = 'header';
          break;
        case 5:
          $message_tag = 'footer';
          break;
        case 6:
          $message_tag = 'nav';
          break;
        case 7:
          $message_tag = 'aside';
          break;
        case 8:
          $message_tag = 'h5';
          break;
        case 9:
          $message_tag = 'h6';
          break;
        default:
          $message_tag = 'div';
          break;
      }

      $js = str_replace ('AI_ADB_MSG_TAG', $message_tag, $js);


      $js_name_node  = 'n'.rand (10000, 10000000);
      $js_name_index = 'i'.rand (10000, 10000000);

      $html_tags = array ();
      if (rand (1, 10) > 3) $html_tags []= 'DIV';
      if (rand (1, 10) > 4) $html_tags []= 'P';
      if (rand (1, 10) > 5) $html_tags []= 'SPAN';
      if (rand (1, 10) > 5) $html_tags []= 'A';
      if (rand (1, 10) > 5) $html_tags []= 'ARTICLE';
      if (rand (1, 10) > 5) $html_tags []= 'H1';
      if (rand (1, 10) > 5) $html_tags []= 'H2';
      if (rand (1, 10) > 5) $html_tags []= 'H3';
      if (rand (1, 10) > 5) $html_tags []= 'H4';
      if (rand (1, 10) > 5) $html_tags []= 'H5';
      if (rand (1, 10) > 5) $html_tags []= 'H6';
      if (rand (1, 10) > 5) $html_tags []= 'BUTTON';
      if (rand (1, 10) > 6) $html_tags []= 'IFRAME';
      if (rand (1, 10) > 6) $html_tags []= 'HEADER';
      if (rand (1, 10) > 5) $html_tags []= 'FOOTER';
      if (rand (1, 10) > 7) $html_tags []= 'UL';
      if (rand (1, 10) > 7) $html_tags []= 'OL';
      if (rand (1, 10) > 5) $html_tags []= 'LI';
      if (rand (1, 10) > 5) $html_tags []= 'NAV';
      if (rand (1, 10) > 5) $html_tags []= 'SECTION';
      if (rand (1, 10) > 5) $html_tags []= 'ASIDE';
      if (empty ($html_tags)) $html_tags = array ('DIV, P, LI');

      shuffle ($html_tags);

      switch (rand (1, 10)) {
        case 1:
          $js_code_1 = 'var '.$js_name_node.' = document.getElementsByTagName ("'. ($html_tags [0]) .'"); for (var '.$js_name_index.'=0; '.$js_name_index.' < '.$js_name_node.'.length; '.$js_name_index.'++) {';
          break;
        default:
          $js_code_1 = 'var '.$js_name_node.' = document.body.querySelectorAll ("'.(implode (', ', $html_tags)).'"); for (var '.$js_name_index.'=0; '.$js_name_index.' < '.$js_name_node.'.length; '.$js_name_index.'++) {';
          break;
      }

      $js_code_3 = '}';

      $js_code_css = array ();
      if (rand (1, 10) > 2) $js_code_css []= 'style.filter = "blur('.rand (1, 4).'px) brightness('.rand (60, 80).'%)"';
      if (rand (1, 10) > 4) $js_code_css []= 'style.cursor = "no-drop"';
      if (rand (1, 10) > 3) $js_code_css []= 'style.cursor = "grab"';
      if (rand (1, 10) > 5) $js_code_css []= 'style.cursor = "grabbing"';
      if (rand (1, 10) > 6) $js_code_css []= 'style.cursor = "wait"';
      if (rand (1, 10) > 7) $js_code_css []= 'style.cursor = "not-allowed"';
      if (rand (1, 10) > 8) $js_code_css []= 'style.cursor = "cell"';
      if (rand (1, 10) > 9) $js_code_css []= 'style.cursor = "all-scroll"';
      if (rand (1, 10) > 2) $js_code_css []= 'style.background = "rgba('.rand (31, 55).', '.rand (31, 55).', '.rand (31, 55).', '.(rand (50, 80)/100).')"';
      if (rand (1, 10) > 6) $js_code_css []= 'style.opacity = "0.'.rand (55, 84).'"';
      if (rand (1, 10) > 6) $js_code_css []= 'style.zIndex = "'.rand (1, 12345).'"';
      if (rand (1, 10) > 7) $js_code_css []= 'style.textTransform = "uppercase"';
      if (rand (1, 10) > 8) $js_code_css []= 'style.letterSpacing = "'.rand (0, 5).'px"';
      if (rand (1, 10) > 8) $js_code_css []= 'style.border = "'.rand (2, 25).'px solid"';
      if (rand (1, 10) > 8) $js_code_css []= 'style.color = "rgba('.rand (1, 255).', '.rand (1, 255).', '.rand (1, 255).', '.(rand (20, 50)/100).')"';
      if (rand (1, 10) > 6) $js_code_css []= 'style.fontFamily = "sans-serif"';
      if (rand (1, 10) > 7) $js_code_css []= 'style.fontFamily = "serif"';
      if (rand (1, 10) > 8) $js_code_css []= 'style.fontFamily = "sans-serif"';
      if (rand (1, 10) > 6) $js_code_css []= 'style.fontFamily = "arial"';
      if (rand (1, 10) > 6) $js_code_css []= 'style.fontFamily = "monospace"';
      if (rand (1, 10) > 8) $js_code_css []= 'style.visibility = "hidden"';
      if (rand (1, 10) > 8) $js_code_css []= 'style.visibility = "collapse"';
      if (rand (1, 10) > 9) $js_code_css []= 'style.display = "list-item"';
      if (rand (1, 10) > 9) $js_code_css []= 'style.display = "inline"';

      if (rand (1, 10) > 3) $js_code_css []= 'style.margin = "'.rand (500, 2345).'px"';
      if (rand (1, 10) > 4) $js_code_css []= 'style.padding = "'.rand (500, 2345).'px"';

      if (rand (1, 10) > 7) $js_code_css []= 'remove ()'; else
      if (rand (1, 10) > 7) $js_code_css []= 'parentNode.removeChild (@@)';
      $js_code_2 = '';
      foreach ($js_code_css as $js_code_css_line) {
        $js_code_css_line = str_replace ('@@', $js_name_node.'['.$js_name_index.']', $js_code_css_line);
        $js_code_2 .= $js_name_node.'['.$js_name_index.'].'.$js_code_css_line.';';
      }

//      $js = str_replace ('AI_ADB_HTML', base64_encode ($js_code_1.$js_code_2.$js_code_3), $js);
      $js = str_replace ('var AI_ADB_HTML=1;', $js_code_1.$js_code_2.$js_code_3, $js);

      $body_js_code = '';
      if (rand (1, 10) > 5) $body_js_code .= 'document.body.style.background = "rgba('.rand (11, 35).', '.rand (11, 35).', '.rand (11, 35).', '.(rand (60, 90)/100).')";';
      if (rand (1, 10) > 6) $body_js_code .= 'document.body.style.backgroundColor = "rgba('.rand (21, 45).', '.rand (21, 45).', '.rand (21, 45).', '.(rand (60, 90)/100).')";';
      if (rand (1, 10) > 6) $body_js_code .= 'document.body.style.margin = "'.rand (400, 4345).'px"';

      $js = str_replace ('var AI_ADB_HTML=2;', $body_js_code, $js);

      $js = str_replace ('AI_ADB_SELECTORS', get_adb_selectors (true), $js);

      $redirection_page = get_redirection_page ();
      if ($redirection_page != 0) $url = get_permalink ($redirection_page); else $url = trim (get_custom_redirection_url ());
      $js = str_replace ('AI_ADB_REDIRECTION_PAGE', $url, $js);

      if (($ai_wp_data [AI_WP_DEBUGGING] & (AI_DEBUG_AD_BLOCKING_STATUS | AI_DEBUG_POSITIONS | AI_DEBUG_BLOCKS)) != 0) {
        // translators: AD BLOCKING DETECTED, PAGE VIEWS: n - NO ACTION
        $js = str_replace ('window.AI_ADB_STATUS_MESSAGE=1', '(jQuery("#ai-adb-status").text ("' . __('AD BLOCKING DETECTED, PAGE VIEWS', 'ad-inserter') . '" + ": " + window.ai_d1 + " - " + "' . __('NO ACTION', 'ad-inserter') . '"),jQuery("#ai-adb-bar").addClass ("adb-on"))', $js);
        $js = str_replace ('window.AI_ADB_STATUS_MESSAGE=2', '(jQuery("#ai-adb-status").text ("' . __('AD BLOCKING DETECTED, COOKIE DETECTED - NO ACTION', 'ad-inserter') . '"),jQuery("#ai-adb-bar").addClass ("adb-on"))', $js);
        $js = str_replace ('window.AI_ADB_STATUS_MESSAGE=3', '(jQuery("#ai-adb-status").text ("' . __('AD BLOCKING DETECTED - ACTION', 'ad-inserter') . '"),jQuery("#ai-adb-bar").addClass ("adb-on"))', $js);
        $js = str_replace ('window.AI_ADB_STATUS_MESSAGE=4', '(jQuery("#ai-adb-status").text ("' . __('AD BLOCKING NOT DETECTED', 'ad-inserter') . '"),jQuery("#ai-adb-bar").addClass ("adb-off"))', $js);
        $js = str_replace ('window.AI_ADB_STATUS_MESSAGE=5', '(jQuery("#ai-adb-status").text ("' . __('AD BLOCKING DETECTION COOKIES DELETED', 'ad-inserter') . '"))', $js);
        $js = str_replace ('window.AI_ADB_STATUS_MESSAGE=6', '(jQuery("#ai-adb-status").text ("' . __('AD BLOCKING DETECTED - NO ACTION', 'ad-inserter') . '"),jQuery("#ai-adb-bar").addClass ("adb-on"))', $js);
      } else {
          $js = str_replace ('window.AI_ADB_STATUS_MESSAGE=1', '(0)', $js);
          $js = str_replace ('window.AI_ADB_STATUS_MESSAGE=2', '(0)', $js);
          $js = str_replace ('window.AI_ADB_STATUS_MESSAGE=3', '(0)', $js);
          $js = str_replace ('window.AI_ADB_STATUS_MESSAGE=4', '(0)', $js);
          $js = str_replace ('window.AI_ADB_STATUS_MESSAGE=5', '(0)', $js);
          $js = str_replace ('window.AI_ADB_STATUS_MESSAGE=6', '(0)', $js);
        }
    }
  }

  $js = str_replace ('AI_ADB_ATTR_NAME', "b64d ('" . base64_encode ('data-'.(defined ('AI_ADB_ATTR') ? AI_ADB_ATTR : 'data-mask')) . "')", $js);

  $js = str_replace ('AI_NONCE', wp_create_nonce ("adinserter_data"), $js);
  $js = str_replace ('AI_AJAXURL', admin_url ('admin-ajax.php'), $js);
  $js = str_replace ('AI_SITE_URL', wp_make_link_relative (get_site_url()), $js);
  $js = str_replace ('AI_HOME_URL', home_url (), $js);

  if (defined ('AI_STATISTICS') && AI_STATISTICS) {
    $js = str_replace ('AI_INTERNAL_TRACKING',          get_internal_tracking () == AI_ENABLED ? 1 : 0, $js);
    $js = str_replace ('AI_EXTERNAL_TRACKING',          get_external_tracking () == AI_ENABLED ? 1 : 0, $js);
    $js = str_replace ('AI_DEBUG_TRACKING',             isset ($_GET [AI_URL_DEBUG_TRACKING]) && $_GET [AI_URL_DEBUG_TRACKING] ? 1 : 0, $js);

    $js = str_replace ('AI_EXT_CATEGORY',               get_external_tracking_category (), $js);
    $js = str_replace ('AI_EXT_ACTION',                 get_external_tracking_action (), $js);
    $js = str_replace ('AI_EXT_LABEL',                  get_external_tracking_label (), $js);

    $current_user = wp_get_current_user ();
    $wp_username = $current_user->user_login;
    $js = str_replace ('WP_USERNAME',                   $wp_username, $js);

    $js = str_replace ('AI_TRACK_PAGEVIEWS',            get_track_pageviews () == AI_TRACKING_ENABLED && $ai_wp_data [AI_WP_PAGE_TYPE] != AI_PT_AJAX && !$ai_wp_data [AI_CODE_FOR_IFRAME] ? 1 : 0, $js);
    $js = str_replace ('AI_ADVANCED_CLICK_DETECTION',   get_click_detection () == AI_CLICK_DETECTION_ADVANCED ? 1 : 0, $js);

    if (!isset ($ai_wp_data [AI_VIEWPORT_WIDTHS])) {

      $viewport_data = array ();
      for ($viewport = 1; $viewport <= 6; $viewport ++) {
        $viewport_name  = get_viewport_name ($viewport);
        $viewport_width = get_viewport_width ($viewport);
        if ($viewport_name != '') {
          $viewport_data []= array ('index' => $viewport, 'name' => $viewport_name, 'width' => $viewport_width);
        }
      }

      usort ($viewport_data, 'ai_compare_viewport');

      $viewport_widthss = array ();
      $viewport_indexes = array ();
      $viewport_names   = array ();
      foreach ($viewport_data as $viewport) {
        $viewport_widthss []= $viewport ['width'];
        $viewport_indexes []= $viewport ['index'];
        $viewport_names   []= $viewport ['name'];
      }
      $ai_wp_data [AI_VIEWPORT_WIDTHS]  = $viewport_widthss;
      $ai_wp_data [AI_VIEWPORT_INDEXES] = $viewport_indexes;
      $ai_wp_data [AI_VIEWPORT_NAMES]   = $viewport_names;
    }
    $js = str_replace ('AI_VIEWPORT_WIDTHS', '[' . implode (',', $ai_wp_data [AI_VIEWPORT_WIDTHS]) . ']', $js);
    $js = str_replace ('AI_VIEWPORT_INDEXES', '[' . implode (',', $ai_wp_data [AI_VIEWPORT_INDEXES]) . ']', $js);
    $js = str_replace ('AI_VIEWPORT_NAMES', base64_encode ('["' . implode ('","', $ai_wp_data [AI_VIEWPORT_NAMES]) . '"]'), $js);
  }
  // Deprecated
  $js = str_replace ('AI_BLOCK_CLASS_NAME', get_block_class_name (true), $js);

  if (function_exists ('ai_replace_js_data_2')) ai_replace_js_data_2 ($js); else {
    $js = str_replace ('AI_ADB_CONTENT_CSS_BEGIN_CLASS',      'wp-slider0-pre90', $js);
    $js = str_replace ('AI_ADB_CONTENT_CSS_END_CLASS',        'wp-slider1-pre91', $js);
    $js = str_replace ('AI_ADB_CONTENT_DELETE_BEGIN_CLASS',   'wp-slider2-pre92', $js);
    $js = str_replace ('AI_ADB_CONTENT_DELETE_END_CLASS',     'wp-slider3-pre93', $js);
    $js = str_replace ('AI_ADB_CONTENT_REPLACE_BEGIN_CLASS',  'wp-slider4-pre94', $js);
    $js = str_replace ('AI_ADB_CONTENT_REPLACE_END_CLASS',    'wp-slider5-pre95', $js);
    $js = str_replace ('ai-adb-url',    AD_INSERTER_PLUGIN_URL . 'js/', $js);
  }

  return $js;
}

function ai_adb_code () {
  return ai_get_js ('ai-adb', false);
}

//function ai_ao_override_js_replacetag ($replacetag) {
//  return array ("<span ai-ao></span>","replace");
//}

function ai_adb_external_scripts () {
  $code = '';

  if (!defined ('AI_ADB_NO_DOUBLECLICK_NET')) {
    $code .= '<object id="ai-adb-dblclk" data="https://securepubads.g.doubleclick.net/tag/js/gpt.js" style="position:absolute; z-index: -100; top: -1000px; left: -1000px; visibility: hidden;"></object>' . "\n";
  }
  if (!defined ('AI_ADB_NO_GOOGLE_ANALYTICS')) {
    $code .= '<object id="ai-adb-ga" data="https://www.google-analytics.com/analytics.js" style="position:absolute; z-index: -100; top: -1000px; left: -1000px; visibility: hidden;"></object>' . "\n";
  }
  if (!defined ('AI_ADB_NO_MEDIA_NET')) {
    $code .= '<object id="ai-adb-mn" data="//contextual.media.net/dmedianet.js" style="position:absolute; z-index: -100; 1px; top: -1000px; left: -1000px; visibility: hidden;"></object>' . "\n";
  }

  return $code;
}

//function ai_replace_prefix ($js_code) {

//  if (!defined ('AI_ADB_PREFIX')) {
//    $seed = date ('Y-m-d H');

//    $key = $seed.'AI_';
//    if (defined ('NONCE_KEY')) {
//      $key .= NONCE_KEY;
//    }
//    if (defined ('AUTH_KEY')) {
//      $key .= AUTH_KEY;
//      $auth_key = $seed.AUTH_KEY;
//    } else $auth_key = $seed.'#AI_';

//    define ('AI_ADB_PREFIX', substr (substr (preg_replace ("/[^A-Za-z]+/", '', strtolower (md5 ($seed.$auth_key))), 0, 4) . preg_replace ("/[^A-Za-z0-9]+/", '', strtolower (md5 ($seed.$key))), 0, 8) . '_');
//  }

////  return preg_replace ("/ai_/", AI_ADB_PREFIX, $js_code);
//  return preg_replace ("/ai_adb/", AI_ADB_PREFIX, $js_code);
//}

function add_footer_inline_scripts () {
  global $ai_wp_data, $wp_version;

  if (get_disable_js_code ()) return;

  $adb_code = defined ('AI_ADBLOCKING_DETECTION') && AI_ADBLOCKING_DETECTION && $ai_wp_data [AI_ADB_DETECTION] && !isset ($ai_wp_data [AI_ADB_SHORTCODE_DISABLED]) && !$ai_wp_data [AI_WP_AMP_PAGE];

  if ($adb_code) {
    if (function_exists ('add_footer_inline_scripts_1')) add_footer_inline_scripts_1 (); else {
      echo '<!-- Code for ad blocking detection -->', "\n";
      echo '<!--noptimize-->', "\n";

      if (get_adb_external_scripts ()) {
        echo ai_adb_external_scripts ();
      }

      if (!defined ('AI_ADB_NO_BANNER_AD')) {
        echo '<div id="banner-advert-container" class="ad-inserter infolinks-ad" style="position:absolute; z-index: -10; height: 1px; width: 1px; top: -100px; left: -100px;"><img id="adsense" class="SponsorAds adsense" src="', AD_INSERTER_PLUGIN_IMAGES_URL, 'ads.png" width="1" height="1" alt="pixel"></div>', "\n";
      }
      if (!defined ('AI_ADB_NO_ADS_JS')) {
        echo '<script async id="ai-adb-ads" src="', plugins_url ('js/ads.js',       __FILE__ ), "?ver=", AD_INSERTER_VERSION, '"></script>', "\n";
      }
      if (!defined ('AI_ADB_NO_SPONSORS_JS')) {
        echo '<script async id="ai-adb-sponsors" src="', plugins_url ('js/sponsors.js',  __FILE__ ), "?ver=", AD_INSERTER_VERSION, '"></script>', "\n";
      }
      if (!defined ('AI_ADB_NO_BANNER_JS')) {
        echo '<script async id="ai-adb-banner" src="', plugins_url ('js/banner.js',  __FILE__ ), "?ver=", AD_INSERTER_VERSION, '"></script>', "\n";
      }
      if (!defined ('AI_ADB_NO_300x250_JS')) {
        echo '<script async id="ai-adb-300x250" src="', plugins_url ('js/300x250.js',  __FILE__ ), "?ver=", AD_INSERTER_VERSION, '"></script>', "\n";
      }
      echo '<!--/noptimize-->', "\n";
      echo '<!-- Code for ad blocking detection END -->', "\n";
    }
  }

  // Use updated flags
  ai_set_footer_inline_scripts ();

  if ($ai_wp_data [AI_FOOTER_INLINE_SCRIPTS]) {
    echo "<script>\n";

    $client_side_dynamic_blocks = get_dynamic_blocks () == AI_DYNAMIC_BLOCKS_CLIENT_SIDE_SHOW || get_dynamic_blocks () == AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT;
    $wait_for_jquery = get_wait_for_jquery () && !$ai_wp_data [AI_WP_AMP_PAGE];

    ob_start ();

    if ($ai_wp_data [AI_FRONTEND_JS_DEBUGGING]) {
      $js_code = "";

      if (function_exists ('add_footer_inline_scripts_3')) {
        $js_code .= add_footer_inline_scripts_3 ($js_code);
      }

      $js_code .= "ai_debugging = true;\n";

      echo $js_code;
    }

    if ($client_side_dynamic_blocks ||
        $ai_wp_data [AI_CLIENT_SIDE_DETECTION] ||
        $ai_wp_data [AI_CLIENT_SIDE_INSERTION] ||
        isset ($ai_wp_data [AI_CLIENT_SIDE_ROTATION]) ||
        $ai_wp_data [AI_CLIENT_SIDE_DETECTION] ||
        ($ai_wp_data [AI_CLOSE_BUTTONS] && !$ai_wp_data [AI_CODE_FOR_IFRAME]) ||
        $ai_wp_data [AI_PARALLAX] ||
        $ai_wp_data [AI_CHECK_BLOCK] ||
        $ai_wp_data [AI_LAZY_LOADING] ||
        ($ai_wp_data [AI_TRACKING] && !isset ($ai_wp_data [AI_TRACKING_SHORTCODE_DISABLED])) ||
        $adb_code
       ) {
      echo ai_get_js ('ai-base64');
    }

    if ($adb_code) {
      if (get_adb_action () == AI_ADB_ACTION_MESSAGE && /*get_undismissible_message ()*/ !defined ('AI_ADB_NO_JS_CHECK')) {
        echo ai_get_js ('ai-adb-try');

        // Prevent replacing prefix
//        echo '[[ai-adb-try]]';
      }
    }

    echo ai_front_translations_code ();

    // Wait for jQuery
    if ($wait_for_jquery && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
      $jquery_ready_code = explode ("AI_JS_CODE=1", ai_get_js ('ai-wait-jquery', false));

      echo $jquery_ready_code [0];
    }

    if ($ai_wp_data [AI_STICKY_WIDGETS] && get_sticky_widget_mode() == AI_STICKY_WIDGET_MODE_JS) {
      echo ai_get_js ('ResizeSensor');
      echo ai_get_js ('theia-sticky-sidebar');
    }

    if ($ai_wp_data [AI_STICKY_WIDGETS] && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
      echo ai_get_js ('ai-sidebar');
    }

    if (($ai_wp_data [AI_CLOSE_BUTTONS]  && !$ai_wp_data [AI_CODE_FOR_IFRAME]) ||
        $ai_wp_data [AI_CHECK_BLOCK] ||
        ($ai_wp_data [AI_TRACKING] && !isset ($ai_wp_data [AI_TRACKING_SHORTCODE_DISABLED])) ||
        $adb_code ||
        $client_side_dynamic_blocks ||
        $ai_wp_data [AI_CLIENT_SIDE_DETECTION] ||
        $ai_wp_data [AI_CLIENT_SIDE_INSERTION]) {
      echo ai_get_js ('ai-cookie');
    }

    if ($ai_wp_data [AI_CLIENT_SIDE_FILTER_CHECKS]) {
      echo ai_get_js ('ai-filter');
    }

    if (($ai_wp_data [AI_CLIENT_SIDE_INSERTION] || $ai_wp_data [AI_CHECK_BLOCK])) {
      echo ai_get_js ('ai-insert');
    }

    if (function_exists ('add_footer_inline_scripts_2') && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
      if ($ai_wp_data [AI_LAZY_LOADING]) {
        echo ai_get_js ('ai-load');
      }

      if ($ai_wp_data [AI_STICK_TO_THE_CONTENT] || $ai_wp_data [AI_ANIMATION]) {
        echo ai_get_js ('ai-sticky');
      }
    }

    if (function_exists ('add_footer_inline_scripts_2') && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
      if ($ai_wp_data [AI_PARALLAX]) {
        echo ai_get_js ('ai-parallax');
      }
    }

    if ($client_side_dynamic_blocks || isset ($ai_wp_data [AI_CLIENT_SIDE_ROTATION])) {
      echo ai_get_js ('ai-rotation');
    }
                                       // VIEWPORT separators or CHECK viewport
    if ($client_side_dynamic_blocks || $ai_wp_data [AI_CLIENT_SIDE_DETECTION] || $ai_wp_data [AI_CLIENT_SIDE_INSERTION] || $adb_code) {
//      if ($ai_wp_data [AI_MOBILE_DETECT_JS] || $adb_code) { // ADB needs it
        echo ai_get_js ('ai-mobile-detect');
//      }
      echo ai_get_js ('ai-lists');
    }

    if ($ai_wp_data [AI_CLOSE_BUTTONS] && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
      echo ai_get_js ('ai-close');
    }

    if ($ai_wp_data [AI_HTML_ELEMENT_SELECTION]) {
      echo ai_get_js ('ai-select');
    }

    if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0) {
      if (defined ('AI_ADSENSE_OVERLAY') && !(isset ($_GET ["hide-debug-labels"]) && $_GET ["hide-debug-labels"] == 1)) {
        echo ai_get_js ('ai-ads');
      }

      echo ai_get_js ('ai-auto-ads', false);
    }

    if ($adb_code) {
      if (!function_exists ('add_footer_inline_scripts_2')) echo ai_replace_js_data (ai_adb_code ());
    }

    if (function_exists ('add_footer_inline_scripts_2')) {
      add_footer_inline_scripts_2 ();
    }

    if ($ai_wp_data [AI_FOOTER_JS_CODE_DOM_READY] != '') {
      $ai_wp_data [AI_FOOTER_JS_CODE_DOM_READY] = ai_get_js ('ai-errors', false) . $ai_wp_data [AI_FOOTER_JS_CODE_DOM_READY];


      if ($ai_wp_data [AI_FRONTEND_JS_DEBUGGING]) {
        $ai_wp_data [AI_FOOTER_JS_CODE_DOM_READY] = "  var ai_debug = typeof ai_debugging !== 'undefined';
  if (typeof ai_debugging !== 'undefined') console.log ('AI DOM READY JS CODE RUN');
  " . $ai_wp_data [AI_FOOTER_JS_CODE_DOM_READY] . "  if (typeof ai_debugging !== 'undefined') console.log ('AI DOM READY JS CODE END');
";
      }

      echo ai_js_dom_ready ("\n".$ai_wp_data [AI_FOOTER_JS_CODE_DOM_READY], false);
    }

    echo ("\nai_js_code = true;\n");

    // Wait for jQuery - for iframe pages it is always loaded
    if ($wait_for_jquery && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
      global $wp_scripts;

      if (isset ($wp_scripts->registered ['jquery']->ver)) {
        $ver = $wp_scripts->registered ['jquery']->ver;
      } else {
          $ver = $wp_version;
      }

      echo str_replace (array (
        'AI_JS_JQUERY0',
        'AI_JS_JQUERY1',
//        "AI_JS_CODE=2"
        ), array (
        includes_url ('js/jquery/jquery.min.js') . '?ver=' . $ver,
        includes_url ('js/jquery/jquery-migrate.min.js') . '?ver=' . $wp_version,
//        trim (ai_front_translations_code ())
        ), $jquery_ready_code [1]);
    }

    $footer_js_code = ob_get_clean ();


    if (function_exists ('check_footer_inline_scripts')) {
      $footer_js_code = check_footer_inline_scripts ($footer_js_code);
    }

//    if ($adb_code) {
//      $footer_js_code = str_replace ('ai_ajax', '[[ai-ajax]]', $footer_js_code);
//      $footer_js_code = ai_replace_prefix ($footer_js_code);
//      $footer_js_code = str_replace ('[[ai-ajax]]', 'ai_ajax', $footer_js_code);
//    }

//    $footer_js_code = str_replace ('[[ai-adb-try]]', ai_get_js ('ai-adb-try'), $footer_js_code);

    echo $footer_js_code;

    echo "\n</script>\n";
  }
}

function ai_admin_notice_hook () {
  global $current_screen, $ai_db_options, $ai_wp_data, $ai_db_options_extract;
  global $ai_settings_page, $hook_suffix;

//  $sidebar_widgets = wp_get_sidebars_widgets();
//  $sidebars_with_deprecated_widgets = array ();

//  foreach ($sidebar_widgets as $sidebar_widget_index => $sidebar_widget) {
//    if (is_array ($sidebar_widget))
//      foreach ($sidebar_widget as $widget) {
//        if (preg_match ("/ai_widget([\d]+)/", $widget, $widget_number)) {
//          if (isset ($widget_number [1]) && is_numeric ($widget_number [1])) {
//            $is_widget = $ai_db_options [$widget_number [1]][AI_OPTION_AUTOMATIC_INSERTION] == AD_SELECT_WIDGET;
//          } else $is_widget = false;
//          $sidebar_name = $GLOBALS ['wp_registered_sidebars'][$sidebar_widget_index]['name'];
//          if ($is_widget && $sidebar_name != "")
//            $sidebars_with_deprecated_widgets [$sidebar_widget_index] = $sidebar_name;
//        }
//      }
//  }

//  if (!empty ($sidebars_with_deprecated_widgets)) {
//    echo "<div class='notice notice-warning'><p><strong>Warning</strong>: You are using deprecated Ad Inserter widgets in the following sidebars: ",
//    implode (", ", $sidebars_with_deprecated_widgets),
//    ". Please replace them with the new 'Ad Inserter' code block widget. See <a href='https://wordpress.org/plugins/ad-inserter/faq/' target='_blank'>FAQ</a> for details.</p></div>";
//  }

  if (function_exists ('ai_admin_notices')) ai_admin_notices (); else {
    if (/*$hook_suffix == $ai_settings_page &&*/ is_super_admin () && !wp_is_mobile () && isset ($ai_wp_data [AI_DAYS_SINCE_INSTAL])) {

      if (isset ($ai_db_options_extract [AI_EXTRACT_USED_BLOCKS]) && is_string ($ai_db_options_extract [AI_EXTRACT_USED_BLOCKS]) && strlen ($ai_db_options_extract [AI_EXTRACT_USED_BLOCKS]) != 0) {
        $used_blocks = count (unserialize ($ai_db_options_extract [AI_EXTRACT_USED_BLOCKS]));
      } else $used_blocks = 0;

      $notice_option = get_option ('ai-notice-review');

      if ($notice_option === false && $ai_wp_data [AI_DAYS_SINCE_INSTAL] > 20) $notice_option = 'later';

      if (($notice_option === false  && $used_blocks >= 2 && $ai_wp_data [AI_DAYS_SINCE_INSTAL] > 2) || ($notice_option == 'later' && $used_blocks >= 2 && $ai_wp_data [AI_DAYS_SINCE_INSTAL] > 20)) {
        if ($notice_option == 'later') {
               // Translators: 1: number of blocks, 2: Ad Inserter
               $message = sprintf (_n('Hey, you are now using %1$s %2$s block.', 'Hey, you are now using %1$s %2$s blocks.', $used_blocks, 'ad-inserter'), "<strong>{$used_blocks}</strong>", "<strong>Ad Inserter</strong>");
               $option = '<div class="ai-notice-text-button ai-notice-dismiss" data-notice="no">
          <button class="button-primary ai-notice-dismiss" data-notice="no">
            <a href="https://adinserter.pro/contact?ref=notice#help" class="ai-notice-dismiss" target="_blank" data-notice="no">' . __("Please help me to solve a problem first", "ad-inserter") . '</a>
          </button>
        </div><div class="ai-notice-text-button ai-notice-dismiss" data-notice="no">
          <button class="button-primary ai-notice-dismiss" data-notice="no">
            ' . __("Maybe later", "ad-inserter") . '
          </button>
        </div>';
        } else {
            // Translators: %s: Ad Inserter
            $message = sprintf (__("Hey, you are using %s and I hope you're happy with it.", 'ad-inserter'), '<strong>Ad Inserter</strong>');
            $option = '<div class="ai-notice-text-button ai-notice-dismiss" data-notice="later">
          <button class="button-primary ai-notice-dismiss" data-notice="later">
            <a href="https://adinserter.pro/contact?ref=notice#help" class="ai-notice-dismiss" target="_blank" data-notice="later">' . __("OK, but please help me with the settings first", "ad-inserter") . '</a>
          </button>
        </div>';

          }
?>
    <div class="notice notice-info ai-notice ai-no-phone" style="display: none;" data-notice="review" data-value="<?php echo base64_encode (wp_create_nonce ("adinserter_data")); ?>" nonce="<?php echo wp_create_nonce ("adinserter_data"); ?>" >
      <div class="ai-notice-element">
        <img src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>icon-50x50.jpg" style="width: 50px; margin: 5px 10px 0px 10px;" />
      </div>
      <div class="ai-notice-element" style="width: 100%; padding: 0 10px 0;">
        <p><?php
          echo $message, ' ';
          _e("Please take a moment to rate the plugin. When you rate it with 5 stars it's like saying 'Thank you'. Somebody will be happy.", 'ad-inserter');
          echo '<br />';
          _e("Positive reviews are a great incentive to fix bugs and to add new features for better monetization of your website.", 'ad-inserter');
          ?></p>
      </div>
      <div class="ai-notice-element ai-notice-buttons last">
        <div class="ai-notice-text-button ai-notice-dismiss" data-notice="yes">
          <button class="button-primary ai-notice-dismiss" data-notice="yes">
            <a href="https://wordpress.org/support/plugin/ad-inserter/reviews/?filter=5#new-post" class="ai-notice-dismiss" target="_blank" data-notice="yes"><?php _e ("Sure", 'ad-inserter'); ?></a>
          </button>
        </div>

        <?php echo $option; ?>
      </div>
    </div>

<?php
      }
    }
  }

  if ($hook_suffix == $ai_settings_page) {
    if (ai_ampforwp_check_disabled ()) {
      echo '<div class="notice notice-warning is-dismissible" style="margin: 5px 15px 2px 0px;"><p>',
        /* translators: 1: AMPforWP Plugin Manager, 2: Ad Inserter */
        sprintf (__('Warning: %1$s %3$s disabled %4$s %2$s on AMP pages.', 'ad-inserter'), 'AMPforWP Plugin Manager', AD_INSERTER_NAME, '<a href="https://adinserter.pro/documentation/amp-pages#ampforwp" target="_blank" style="text-decoration: none; box-shadow: 0 0 0;">', '</a>'),
      '</p></div>';
    }

    if (version_compare (phpversion (), "5.6", "<")) {
      echo '<div class="notice notice-warning is-dismissible" style="margin: 5px 15px 2px 0px;"><p>',
        /* translators: 1: Ad Inserter, 2, 3: HTML tags */
        sprintf (__('Warning: %1$s requires PHP 5.6 or newer. %2$s Please update! %3$s', 'ad-inserter'), AD_INSERTER_NAME, '<a href="https://wordpress.org/support/update-php/" target="_blank" style="text-decoration: none; box-shadow: 0 0 0;">', '</a>'),
      '</p></div>';
    }

    if (defined ('AI_SETTINGS_ERROR')) {
      echo '<div class="notice notice-error is-dismissible" style="margin: 5px 15px 2px 0px;"><p>',
        /* translators: 1: Ad Inserter, 2, 3: HTML tags */
        _e ('Error: plugin settings corrupt', 'ad-inserter'),
      '</p></div>';
    }

  }
}

function ai_plugin_action_links ($links) {
  if (is_multisite() && !is_main_site () && !multisite_settings_page_enabled ()) return $links;

  $settings_link = '<a href="'.admin_url ('options-general.php?page=ad-inserter.php').'">'._x('Settings', 'Menu item', 'ad-inserter') . '</a>';
  array_unshift ($links, $settings_link);
  return $links;
}

function ai_after_plugin_row_1 ($plugin_file, $plugin_data, $status) {
  global $ad_inserter_globals;

  if (ai_ampforwp_check_disabled ()) {
    $plugins_css = "\n" . '<style>
.plugins tr.active[data-slug=ad-inserter] th, .plugins tr.active[data-slug=ad-inserter] td {box-shadow: none;}
</style>'."\n";

    echo $plugins_css;
    echo '<tr class="plugin-update-tr active';
    if (isset ($plugin_data ['update']) && $plugin_data ['update']) echo ' update';
    echo '"><td colspan="3" class="plugin-update colspanchange ai-message"><div class="update-message notice inline notice-warning notice-alt"><p> ',
      /* translators: 1: AMPforWP Plugin Manager, 2: Ad Inserter, 3, 4: HTML tags */
      sprintf (__('Warning: %1$s %3$s disabled %4$s %2$s on AMP pages.', 'ad-inserter'), 'AMPforWP Plugin Manager', AD_INSERTER_NAME, '<a href="https://adinserter.pro/documentation/amp-pages#ampforwp" target="_blank" style="text-decoration: none; box-shadow: 0 0 0;">', '</a>'),
      '</p></div></td></tr>';
  }
}

function ai_set_plugin_meta ($links, $file) {
  if ($file == plugin_basename (__FILE__)) {
    if (is_multisite() && !is_main_site ()) {
      foreach ($links as $index => $link) {
        if (stripos ($link, "update") !== false) unset ($links [$index]);
      }
    }

    if (!is_multisite () || is_main_site ()) {
      $inserted = '<a href="'.admin_url ('options-general.php?page=ad-inserter.php&ai-safe-mode').'" title="'.__('Load settings page in safe mode to avoid collisions with other plugins or theme', 'ad-inserter').'">' . __('Safe mode', 'ad-inserter') . '</a>';
      array_splice ($links, 4, 0, $inserted);

      if (function_exists ('ai_set_plugin_meta_2')) {
        ai_set_plugin_meta_2 ($links);
      }
      elseif (file_exists (AD_INSERTER_PLUGIN_DIR.'includes/js/ai-load.js')) {
        $inserted = 'WP';
        array_splice ($links, 1, 0, $inserted);
      }
    }
  }
  return $links;
}


function current_user_role ($user_role_name = "") {
  $role_values = array ("super-admin" => 6, "administrator" => 5, "editor" => 4, "author" => 3, "contributor" => 2, "subscriber" => 1);
  global $wp_roles;

  if ($user_role_name != "") {
    return isset ($role_values [$user_role_name]) ? $role_values [$user_role_name] : 0;
  }

  $user_role = 0;
  $current_user = wp_get_current_user();
  $roles = $current_user->roles;

  // Fix for empty roles
  if (isset ($current_user->caps) && count ($current_user->caps) != 0) {
    $caps = $current_user->caps;
    foreach ($role_values as $role_name => $role_value) {
      if (isset ($caps [$role_name]) && $caps [$role_name]) $roles []= $role_name;
    }
  }

  foreach ($roles as $role) {
    $current_user_role = isset ($role_values [$role]) ? $role_values [$role] : 0;
    if ($current_user_role > $user_role) $user_role = $current_user_role;
  }

  return $user_role;
}


function ai_current_user_role_ok () {
  return current_user_role () >= current_user_role (get_minimum_user_role ());
}


function ai_add_meta_box_hook() {
  global $ai_wp_data, $block_object;

  if (!ai_current_user_role_ok ()) return;

  if (is_multisite() && !is_main_site () && !multisite_exceptions_enabled ()) return;

  $exceptions_posts = false;
  $exceptions_pages = false;
  for ($block = 1; $block <= 96; $block ++) {
    $obj = $block_object [$block];
    if ($obj->get_exceptions_enabled ()) {
      if ($obj->get_display_settings_post ()) {
        $exceptions_posts = true;
      }
      if ($obj->get_display_settings_page ()) {
        $exceptions_pages = true;
      }
      if ($exceptions_posts && $exceptions_pages) {
        break;
      }
    }
  }

  $screens = array ();
  if ($exceptions_posts) {
    $screens []= 'post';
  }
  if ($exceptions_pages) {
    $screens []= 'page';
  }

  if (empty ($screens)) return;

  $args = array (
    'public'    => true,
    '_builtin'  => false
  );
  $custom_post_types = get_post_types ($args, 'names', 'and');
  $screens = array_values (array_merge ($screens, $custom_post_types));

  foreach ($screens as $screen) {
    add_meta_box (
      'adinserter_sectionid',
      // translators: %s: Ad Inserter
      sprintf (_x('%s Individual Exceptions', 'Meta box name', 'ad-inserter'), AD_INSERTER_NAME),
      'ai_meta_box_callback',
      $screen
    );
  }
}

function ai_meta_box_callback ($post) {
  global $block_object;

  // Add an nonce field so we can check for it later.
  wp_nonce_field ('adinserter_meta_box', 'adinserter_meta_box_nonce');

  $post_type        = get_post_type ($post);
  $post_type_object = get_post_type_object ($post_type);
  $page_type_name   = $post_type_object->labels->name;
  $page_type_name1  = $post_type_object->labels->singular_name;

  /*
   * Use get_post_meta() to retrieve an existing value
   * from the database and use the value for the form.
   */
  $post_meta = get_post_meta ($post->ID, '_adinserter_block_exceptions', true);
  $selected_blocks = explode (",", $post_meta);

  ob_start ();

  echo '<table>';
  echo '<thead style="font-weight: bold;">';
    echo '  <td>', __('Block', 'ad-inserter') . '</td>';
    echo '  <td style="padding: 0 10px 0 10px;">', __('Name', 'ad-inserter') . '</td>';
//    echo '  <td style="padding: 0 10px 0 10px;">', __('Automatic insertion', 'ad-inserter') . '</td>';

    echo '  <td style="padding: 0 10px 0 10px;">', __('Default insertion', 'ad-inserter') . '</td>';
                                                      // translators: For this post or page
    if ($post_type == 'page')
      echo '  <td style="padding: 0 10px 0 10px;">', _x('For this', 'Page', 'ad-inserter'), ' ', $page_type_name1, '</td>'; else
        echo '  <td style="padding: 0 10px 0 10px;">', _x('For this', 'Post', 'ad-inserter'), ' ', $page_type_name1, '</td>';

  echo '</thead>';
  echo '<tbody>';
  $rows = 0;
  for ($block = 1; $block <= 96; $block ++) {
    $obj = $block_object [$block];

    $exceptions_enabled = $obj->get_exceptions_enabled ();
    $exceptions_function = $obj->get_exceptions_function ();

    if ($post_type == 'page') {
      $page_name1 = _x('pages', 'Enabled/disabled on all', 'ad-inserter');
      $general_enabled = $obj->get_display_settings_page();
    } else {
        $page_name1 = _x('posts', 'Enabled/disabled on all', 'ad-inserter');
        $general_enabled  = $obj->get_display_settings_post();
      }

    if (!$general_enabled || !$exceptions_enabled) continue;

    $individual_option_enabled  = $general_enabled && $exceptions_enabled;
    $individual_text_enabled    = $exceptions_function == AI_DEFAULT_INSERTION_ENABLED;

    if ($rows % 2 != 0) $background = "#F0F0F0"; else $background = "#FFF";
    echo '<tr style="background: ', $background, ';">';
    echo '  <td style="text-align: right; padding: 0 10px 0 0;">', $obj->number, '</td>';
    echo '  <td style="padding: 0 10px 0 10px;"><a href="', admin_url ('options-general.php?page=ad-inserter.php'), '&start=' . (intval (($block - 1) / 16) * 16 + 1), '&tab=', $block, '" style="text-decoration: none; box-shadow: 0 0 0;" target="_blank">', $obj->get_ad_name(), '</a></td>';
//    echo '  <td style="padding: 0 10px 0 10px;">', $obj->get_automatic_insertion_text(), '</td>';
    echo '  <td style="padding: 0 10px 0 10px; text-align: left;">';

    if ($individual_option_enabled) {
      if ($individual_text_enabled) echo __('Enabled', 'ad-inserter'); else echo __('Disabled', 'ad-inserter');
    } else {
        if ($general_enabled) echo __('No individual exceptions', 'ad-inserter'); else
          // translators: Not enabled for pages or posts
          echo __('Not enabled for', 'ad-inserter') . ' ', $page_name1;
      }
    echo '  </td>';
    echo '  <td style="padding: 0 10px 0 10px; text-align: left;">';

    if ($individual_option_enabled) {
      echo '<input type="checkbox" style="border-radius: 5px;" name="adinserter_selected_block_', $block, '" id="ai-selected-block-', $block, '" value="1"', in_array ($block, $selected_blocks) ? ' checked': '', ' />';
      echo '<label for="ai-selected-block-', $block, '">';
      if (!$individual_text_enabled) echo __('Enabled', 'ad-inserter'); else echo __('Disabled', 'ad-inserter');
      echo '</label>';
    } else {
        if (in_array ($block, $selected_blocks)) {
          echo '<span style="margin-left: 6px;">&bull;</span>';
        }
      }

    echo '  </td>';
    echo '</tr>';
    $rows ++;
  }

  echo '</tbody>';
  echo '</table>';

  $exceptions_table = ob_get_clean ();

  if ($rows == 0) {
    // translators: No individual exceptions enabled for pages or posts
    echo '<p><strong>', __('No block has individual exceptions enabled', 'ad-inserter'), '</strong></p>';
  } else echo $exceptions_table;

  // translators: 1: Ad Inserter Settings (page), 2: Tag / Archive pages
  echo '<p>',                                                                                                                      //;
    sprintf (__('Default insertion can be configured for each block on %1$s page - button next to %2$s checkbox.', 'ad-inserter'),
                                                                                                                                                        // translators: %s: Ad Inserter
      '<a href="' . admin_url ('options-general.php?page=ad-inserter.php') . '" style="text-decoration: none; box-shadow: 0 0 0;" target="_blank">' . sprintf (__('%s Settings', 'ad-inserter'), AD_INSERTER_NAME) . '</a>',
      '<strong>'.__('Tag / Archive pages', 'ad-inserter').'</strong>'), '<br />',

  __('When individual exceptions for a block are enabled, a checkbox will be listed here to change default insertion for this post or page.', 'ad-inserter'), '<br />',
  __('This way you can individually enable or disable blocks on specific posts or pages.', 'ad-inserter'), '<br />';

  printf (__('For more information check page %s', 'ad-inserter'),
   // translators: Ad Inserter Exceptions documentation page
   '<a href="https://adinserter.pro/documentation/individual-post-and-page-exceptions" style="text-decoration: none; box-shadow: 0 0 0;" target="_blank">Ad Inserter ' . __('Individual Exceptions', 'ad-inserter') . '</a>.</p>');
}

function ai_save_meta_box_data_hook ($post_id) {
  // Check if our nonce is set.
  if (!isset ($_POST ['adinserter_meta_box_nonce'])) return;

  // Verify that the nonce is valid.
  if (!wp_verify_nonce ($_POST ['adinserter_meta_box_nonce'], 'adinserter_meta_box')) return;

  // If this is an autosave, our form has not been submitted, so we don't want to do anything.
  if (defined ('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;

  // Check the user's permissions.
  if (isset ($_POST ['post_type'])) {
    if ($_POST ['post_type'] == 'page') {
      if (!current_user_can ('edit_page', $post_id)) return;
    } else {
      if (!current_user_can ('edit_post', $post_id)) return;
    }
  }

  /* OK, it's safe for us to save the data now. */

  $selected = array ();
  for ($block = 1; $block <= 96; $block ++) {
    $option_name = 'adinserter_selected_block_' . $block;
    if (isset ($_POST [$option_name]) && $_POST [$option_name]) $selected []= $block;
  }

  if (!empty ($selected)) {
    // Update the meta field in the database.
    update_post_meta ($post_id, '_adinserter_block_exceptions', implode (",", $selected));
  } else delete_post_meta ($post_id, '_adinserter_block_exceptions');
}

function ai_widgets_init_hook () {
  if (is_multisite() && !is_main_site () && !multisite_widgets_enabled ()) return;
  register_widget ('ai_widget');
}

function get_page_type_debug_info ($text = '') {
  global $ai_wp_data;

  switch ($ai_wp_data [AI_WP_PAGE_TYPE]) {
    case AI_PT_STATIC:
      $page_type = __('STATIC PAGE', 'ad-inserter');
      break;
    case AI_PT_POST:
      $page_type = __('POST', 'ad-inserter');
      break;
    case AI_PT_HOMEPAGE:
      $page_type = __('HOMEPAGE', 'ad-inserter');
      break;
    case AI_PT_CATEGORY:
      $page_type = __('CATEGORY PAGE', 'ad-inserter');
      break;
    case AI_PT_SEARCH:
      $page_type = __('SEARCH PAGE', 'ad-inserter');
      break;
    case AI_PT_ARCHIVE:
      $page_type = __('ARCHIVE PAGE', 'ad-inserter');
      break;
    case AI_PT_404:
      $page_type = __('ERROR 404 PAGE', 'ad-inserter');
      break;
    case AI_PT_AJAX:
      $page_type = __('AJAX CALL', 'ad-inserter');
      break;
    default:
      $page_type = __('UNKNOWN PAGE TYPE', 'ad-inserter');
      break;
  }
  $class = AI_DEBUG_PAGE_TYPE_CLASS;

  $page_type = "<section class='$class'>".$text.$page_type."</section>";

  return $page_type;
}

function get_adb_status_debug_info () {
  global $ai_wp_data;

  $page_type = '';

  if (defined ('AI_ADBLOCKING_DETECTION') && AI_ADBLOCKING_DETECTION) {
    if ($ai_wp_data [AI_ADB_DETECTION]) {
      $title  = __('Click to delete ad blocking detection cokies', 'ad-inserter');
      $status = __('AD BLOCKING STATUS UNKNOWN', 'ad-inserter');

      $events = '';
      if (isset ($_GET ['ai-debug-adb-events']) && $_GET ['ai-debug-adb-events']) {
        $events = "<span id='ai-adb-events'></span>";
      }
      $page_type = "<section id='ai-adb-bar' class='".AI_DEBUG_STATUS_CLASS.' '.AI_DEBUG_ADB_CLASS."' title='$title'><span id='ai-adb-status'>$status</span>$events</section>";
    }
  }

  return $page_type;
}


function ai_header_noindex () {
  global $ai_wp_data;

  if ($ai_wp_data [AI_WP_DEBUGGING] != 0 || $ai_wp_data [AI_CODE_FOR_IFRAME]) {
    echo '<meta name="robots" content="noindex">';
    if ($ai_wp_data [AI_WP_DEBUGGING] != 0) {
      echo ' <!-- ', AD_INSERTER_NAME, ' debugging enabled (', substr ('00000000' . strtoupper (decbin ($ai_wp_data [AI_WP_DEBUGGING])), - 8), ') -->';
    }
    echo "\n";
  }
}

function get_code_debug_block ($name, $message, $right_text, $code, $inserted_code, $javascript = false) {
  if (strpos ($code, 'enable_page_level_ads') !== false)
    // translators: %s: AdSense Auto Ads
    $message = sprintf (__('Code for %s detected - Code will automatically insert AdSense ads at optimal positions', 'ad-inserter') . ' ',
      '<a style="text-decoration: none; color: #fff; font-weight: bold; box-shadow: none;" href="https://adinserter.pro/documentation/adsense-ads#auto-ads" target="_blank">AdSense Auto Ads</a>');

  $debug_script = new ai_block_labels ('ai-debug-script');
  $debug_block_start = $debug_script->block_start ();
  $debug_block_start .= $debug_script->bar ($name, '', $message, $right_text);
  if ($javascript) $debug_block_start = str_replace (array ('"', "\n", "\r"), array ("'", "\\n", ''), $debug_block_start);

  $debug_block_end = $debug_script->block_end ();
  if ($javascript) $debug_block_end = str_replace (array ('"', "\n", "\r"), array ("'", "\\n", ''), $debug_block_end);

  $html_code = htmlspecialchars ($code);
  if ($javascript) $html_code = str_replace (array ("\n", "\r"), array ("\\n", ''), $html_code);

  $html_inserted_code = htmlspecialchars ($inserted_code);
  if ($javascript) $html_inserted_code = str_replace (array ("\n", "\r"), array ("\\n", ''), $html_inserted_code);

  return $debug_block_start . "<pre class='ai-debug-code ai-code-org'>" . $html_code . "</pre><pre class='ai-debug-code ai-code-inserted'>" . $html_inserted_code . "</pre><div style='clear: both;'></div>" . $debug_block_end;
}

function ai_http_header () {
  global $block_object, $ai_wp_data;

  $ai_wp_data [AI_CONTEXT] = AI_CONTEXT_HTTP_HEADER;

  $obj = $block_object [AI_HEADER_OPTION_NAME];
  $obj->clear_code_cache ();

  if ($obj->get_enable_manual ()) {
    if ($ai_wp_data [AI_WP_PAGE_TYPE] != AI_PT_404 || $obj->get_enable_404()) {
      $processed_code = do_shortcode ($obj->ai_getCode ());

      if (strpos ($processed_code, AD_HTTP_SEPARATOR) !== false) {
        $codes = explode (AD_HTTP_SEPARATOR, $processed_code);
        $processed_code = $codes [0];
      } else $processed_code = '';

      $header_lines = explode ("\n", $processed_code);

      foreach ($header_lines as $header_line) {
        if (trim ($header_line) != '' && strpos ($header_line, ':') !== false) {
          header (trim ($header_line));
        }
      }
    }
  }
}

function ai_wp_head_hook () {
  global $block_object, $ai_wp_data, $ai_total_plugin_time/*, $ai_front_translations*/;

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
    ai_log ("HEAD HOOK START");
    $ai_processing_time_active = $ai_wp_data [AI_PROCESSING_TIME];
    $ai_wp_data [AI_PROCESSING_TIME] = true;
    $start_time = microtime (true);
  }

  $ai_wp_data [AI_HEAD] = true;

//  $adb_code = defined ('AI_ADBLOCKING_DETECTION') && AI_ADBLOCKING_DETECTION && $ai_wp_data [AI_ADB_DETECTION] && !isset ($ai_wp_data [AI_ADB_SHORTCODE_DISABLED]);

  if (defined ('AI_BUFFERING')) {
    if (get_output_buffering ()) {
      if ($ai_wp_data [AI_WP_PAGE_TYPE] != AI_PT_AJAX && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
        ai_buffering_start ();
      }
    }
  }

  if (!get_disable_js_code () &&
      (get_remote_debugging () || ($ai_wp_data [AI_WP_USER] & AI_USER_LOGGED_IN) != 0) &&
      (($ai_wp_data [AI_WP_DEBUGGING] & (AI_DEBUG_POSITIONS | AI_DEBUG_BLOCKS)) != 0 || (isset ($_GET [AI_URL_DEBUG_PROCESSING_FE]) && $_GET [AI_URL_DEBUG_PROCESSING_FE] != 0))) {

//    if ($adb_code) {
//      echo "<script>\n", ai_replace_prefix (ai_get_js ('ai-errors-head', false)), "</script>\n";
//    } else {
        echo "<script>\n", ai_get_js ('ai-errors-head', false), "</script>\n";
//      }

  }

  $ai_wp_data [AI_CONTEXT] = AI_CONTEXT_NONE;

  ai_header_noindex ();

  add_head_inline_styles ();

  $header_code = '';

  $header = $block_object [AI_HEADER_OPTION_NAME];

  if ($header->get_enable_manual ()) {
    if (!$header->get_debug_disable_insertion () && !get_disable_header_code ()) {
      if ($header->check_server_side_detection ()) {
        if ($ai_wp_data [AI_WP_PAGE_TYPE] != AI_PT_404 || $header->get_enable_404()) {

          $processed_code = do_shortcode ($header->ai_getCode ());

          if (strpos ($processed_code, AD_HTTP_SEPARATOR) !== false) {
            $codes = explode (AD_HTTP_SEPARATOR, $processed_code);
            $processed_code = ltrim ($codes [1]);
          }

          if (strpos ($processed_code, AD_AMP_SEPARATOR) !== false) {
            $codes = explode (AD_AMP_SEPARATOR, $processed_code);
            $processed_code = $codes [0];
          } elseif ($ai_wp_data [AI_WP_AMP_PAGE]) $processed_code = '';

          $header_code = $processed_code;

          echo $processed_code;

          if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
            if (strlen ($processed_code) != 0)
              ai_log ("HEAD CODE: " . strlen ($processed_code) . ' characters');
          }
        }
      }
    } else {
        if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
          ai_log ('HEAD CODE DEBUG NO INSERTION');
        }
      }
  }

  if (defined ('AI_BUFFERING')) {
    if (get_output_buffering () && !get_disable_header_code ()) {
      $ai_head_codes = "<!--[AI_HEAD_CODES]-->";
      echo $ai_head_codes;
//      $header_code .= $ai_head_codes; // Don't count this code
    }
  }

  if (!$ai_wp_data [AI_CODE_FOR_IFRAME]) {
    if ($ai_wp_data [AI_WP_DEBUGGING] != 0 && isset ($_GET ['ai-debug-code']) && !defined ('AI_DEBUGGING_DEMO')) {
      if (is_numeric ($_GET ['ai-debug-code']) && $_GET ['ai-debug-code'] >= 1 && $_GET ['ai-debug-code'] <= 96) {
        $obj = $block_object [(int) $_GET ['ai-debug-code']];
        $block_name = $obj->number . ' &nbsp; ' . $obj->get_ad_name ();
        if (!$header->get_debug_disable_insertion ()) {
          $ai_wp_debugging = $ai_wp_data [AI_WP_DEBUGGING];
          $ai_wp_data [AI_WP_DEBUGGING] = 0;
          $code_for_insertion = $obj->get_code_for_insertion ();
          $ai_wp_data [AI_WP_DEBUGGING] = $ai_wp_debugging;
        } else $code_for_insertion = '';

        $ai_wp_data [AI_FOOTER_JS_CODE_DOM_READY] .= "  jQuery('body').prepend (\"" . get_code_debug_block (' ' . $block_name, '', __('Code for insertion', 'ad-inserter') . ' ' . strlen ($code_for_insertion) . ' ' . _n('character', 'characters', strlen ($code_for_insertion), 'ad-inserter') . ' ', $obj->ai_getCode (), $code_for_insertion, true) . "\");
";
      }
    }

    if (!get_disable_js_code () && $ai_wp_data [AI_IFRAMES]) {
      echo "<script>\n", ai_get_js ('ai-iframes', false), "</script>\n";
    }

    if (!get_disable_js_code () && ($ai_wp_data [AI_WP_DEBUGGING] & (AI_DEBUG_POSITIONS | AI_DEBUG_BLOCKS)) != 0) {
      $ai_wp_data [AI_FOOTER_JS_CODE_DOM_READY] .= '  setTimeout (function(){jQuery(\'body\').prepend ("' . get_page_type_debug_info () . '");}, 1);
';
    }

    if (!get_disable_header_code () && isset ($_GET ['ai-debug-code']) && !defined ('AI_DEBUGGING_DEMO')) {
      $ai_wp_data [AI_FOOTER_JS_CODE_DOM_READY] .= "  jQuery('body').prepend (\"" . get_code_debug_block (' ' . __('Header code', 'ad-inserter') . ' ' . ($header->get_enable_manual () ? '' : ' ' . _x('DISABLED', 'Header code', 'ad-inserter')), '&lt;head&gt;...&lt;/head&gt;', strlen ($header_code) . ' ' . _n('character inserted', 'characters inserted', strlen ($header_code), 'ad-inserter') . ' ', $header->ai_getCode (), $header_code, true) . "\");
";
    }
  }



  // After Header code info
  if (!$ai_wp_data [AI_CODE_FOR_IFRAME]) {
    if (defined ('AI_ADBLOCKING_DETECTION') && AI_ADBLOCKING_DETECTION) {
      // No scripts on AMP pages
      if (($ai_wp_data [AI_WP_DEBUGGING] & (AI_DEBUG_AD_BLOCKING_STATUS | AI_DEBUG_POSITIONS | AI_DEBUG_BLOCKS)) != 0 && $ai_wp_data [AI_ADB_DETECTION]) {
        $ai_wp_data [AI_FOOTER_JS_CODE_DOM_READY] .= "  jQuery('body').prepend (\"" . get_adb_status_debug_info () . "\");
";
      }
    }

    if (($ai_wp_data [AI_WP_DEBUGGING] & (AI_DEBUG_AD_BLOCKING_STATUS | AI_DEBUG_BLOCKS)) != 0) {
      $ai_wp_data [AI_FOOTER_JS_CODE_DOM_READY] .= "  jQuery('body').prepend (\"<section id='ai-iab-tcf-bar' class='".AI_DEBUG_STATUS_CLASS."' style='cursor: pointer; display: none;' title='". __('Click to delete the cookie for the consents', 'ad-inserter') ."'><span id='ai-iab-tcf-status'>IAB TCF 2.0</span></section>\");
";

      if (!$ai_wp_data [AI_UNFILTERED_HTML]) {
        $ai_wp_data [AI_FOOTER_JS_CODE_DOM_READY] .= "  jQuery('body').prepend (\"<section class='".AI_DEBUG_STATUS_CLASS." status-error'>".__('UNFILTERED HTML DISABLED', 'ad-inserter')."</section>\");
";
      }
    }

  }

//  if (!get_disable_js_code () && $ai_wp_data [AI_CODE_FOR_IFRAME]) {
//    echo '<script>', "\n", ai_front_translations_code (), '</script>', "\n";
//  }

  $ai_wp_data [AI_HEAD] = false;

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
    if (!$ai_processing_time_active) {
      $ai_total_plugin_time += microtime (true) - $start_time;
      $ai_wp_data [AI_PROCESSING_TIME] = false;
    }
    ai_log ("HEAD HOOK END: ". number_format (1000 * (microtime (true) - $start_time), 2)." ms\n");
  }
}

function ai_amp_head_hook () {
  global $block_object, $ai_wp_data, $ai_total_plugin_time;

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
    ai_log ("AMP HEAD HOOK START");
    $ai_processing_time_active = $ai_wp_data [AI_PROCESSING_TIME];
    $ai_wp_data [AI_PROCESSING_TIME] = true;
    $start_time = microtime (true);
  }

  $ai_wp_data [AI_HEAD] = true;

  if (defined ('AI_BUFFERING')) {
    if (get_output_buffering ()) {
      if ($ai_wp_data [AI_WP_PAGE_TYPE] != AI_PT_AJAX) {
        ai_buffering_start ();
      }
    }
  }

  $ai_wp_data [AI_CONTEXT] = AI_CONTEXT_NONE;

  ai_header_noindex ();

  $header = $block_object [AI_HEADER_OPTION_NAME];

  if ($header->get_enable_manual ()) {
    if (!$header->get_debug_disable_insertion () && !get_disable_header_code ()) {
      if ($header->check_server_side_detection ()) {
        if ($ai_wp_data [AI_WP_PAGE_TYPE] != AI_PT_404 || $header->get_enable_404()) {
          $processed_code = do_shortcode ($header->ai_getCode ());

          if (strpos ($processed_code, AD_HTTP_SEPARATOR) !== false) {
            $codes = explode (AD_HTTP_SEPARATOR, $processed_code);
            $processed_code = ltrim ($codes [1]);
          }

//    ai_log ("ai_amp_head_hook ");

          if (strpos ($processed_code, AD_AMP_SEPARATOR) !== false) {
            $codes = explode (AD_AMP_SEPARATOR, $processed_code);
            $processed_code = ltrim ($codes [1]);
            echo $processed_code;

//    ai_log ("ai_amp_head_hook " . $processed_code);

            if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
              if (strlen ($processed_code) != 0)
                ai_log ("HEAD CODE: " . strlen ($processed_code) . ' bytes');
            }
          }
        }
      }
    }
  }

  if (defined ('AI_BUFFERING')) {
    if (get_output_buffering () && !get_disable_header_code ()) {
      $ai_head_codes = "<!--[AI_HEAD_CODES]-->";
      echo $ai_head_codes;
    }
  }

  $ai_wp_data [AI_HEAD] = false;

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
    if (!$ai_processing_time_active) {
      $ai_total_plugin_time += microtime (true) - $start_time;
      $ai_wp_data [AI_PROCESSING_TIME] = false;
    }
    ai_log ("AMP HEAD HOOK END: ". number_format (1000 * (microtime (true) - $start_time), 2)." ms\n");
  }
}


function ai_front_translations_code () {
  global $ai_front_translations;

  $object_name = 'ai_front';
  $l10n = $ai_front_translations;

  $code = '/* <![CDATA[ */
';

  foreach ($l10n as $key => $value) {
    if (!is_scalar ($value)) continue;
    $l10n [$key] = html_entity_decode ((string) $value, ENT_QUOTES, 'UTF-8');
  }
//  $code .= "var $object_name = " . wp_json_encode ($l10n) . ";\n";
  $code .= "$object_name = " . wp_json_encode ($l10n) . ";\n";
  $code .= '/* ]]> */
';

  return ($code);
}

function ai_amp_css_hook () {
  global $ai_wp_data;

  if (get_disable_css_code ()) return;

  $ai_wp_data [AI_AMP_CSS] = 'AMP CSS HOOK';

  if ($ai_wp_data [AI_CLIENT_SIDE_DETECTION] && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
    $viewport_css = get_viewport_css ();
    $viewport_css = str_replace ('!important', '', $viewport_css);
    echo $viewport_css;
  }

  if (defined ('AI_AMP_HEADER_STYLES') && AI_AMP_HEADER_STYLES || $ai_wp_data [AI_WP_DEBUGGING] != 0) {

    if (defined ('AI_AMP_HEADER_STYLES') && AI_AMP_HEADER_STYLES) {
      if ($ai_wp_data [AI_WP_DEBUGGING] != 0) generate_debug_css_base ();

      echo get_alignment_css ();

      echo str_replace ('!important', '', ai_get_admin_toolbar_debugging_styles ());

      echo ".ai-align-left * {margin: 0 auto 0 0; text-align: left;}\n";
      echo ".ai-align-right * {margin: 0 0 0 auto; text-align: right;}\n";
      echo ".ai-center * {margin: 0 auto; text-align: center; }\n";
    }

    if ($ai_wp_data [AI_WP_DEBUGGING] != 0) generate_debug_css ();
  }
}

function ai_amp_css_hook_style () {
  echo "<style>\n";
  ai_amp_css_hook ();
  echo "</style>\n";
}

function ai_wp_footer_hook_end_buffering () {
  global $ai_wp_data, $ai_total_plugin_time;

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
    ai_log ("FOOTER HOOK TO END BUFFERING START");
    $ai_processing_time_active = $ai_wp_data [AI_PROCESSING_TIME];
    $ai_wp_data [AI_PROCESSING_TIME] = true;
    $start_time = microtime (true);
  }

  if (defined ('AI_BUFFERING')) {
    if (get_output_buffering ()) {
      if ($ai_wp_data [AI_WP_PAGE_TYPE] != AI_PT_AJAX && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
        ai_buffering_end ();
      }
    }
  }

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
    if (!$ai_processing_time_active) {
      $ai_total_plugin_time += microtime (true) - $start_time;
      $ai_wp_data [AI_PROCESSING_TIME] = false;
    }
    ai_log ("FOOTER HOOK TO END BUFFERING END: ". number_format (1000 * (microtime (true) - $start_time), 2)." ms\n");
  }
}

function ai_wp_footer_hook () {
  global $block_object, $ai_wp_data, $ad_inserter_globals, $ai_total_plugin_time;

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
    ai_log ("FOOTER HOOK START");
    $ai_processing_time_active = $ai_wp_data [AI_PROCESSING_TIME];
    $ai_wp_data [AI_PROCESSING_TIME] = true;
    $start_time = microtime (true);
  }

//  if (defined ('AI_BUFFERING')) {
//    if (get_output_buffering ()) {
//      if ($ai_wp_data [AI_WP_PAGE_TYPE] != AI_PT_AJAX && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
//        ai_buffering_end ();
//      }
//    }
//  }

  if ($ai_wp_data [AI_DISABLE_CACHING]) ai_disable_caching ();

  $ai_wp_data [AI_CONTEXT] = AI_CONTEXT_FOOTER;
  $footer_code = '';

  $footer = $block_object [AI_FOOTER_OPTION_NAME];
  $footer->clear_code_cache ();

  if ($footer->get_enable_manual ()) {
    if (!$footer->get_debug_disable_insertion () && !get_disable_footer_code ()) {
      if ($footer->check_server_side_detection ()) {
        if ($ai_wp_data [AI_WP_PAGE_TYPE] != AI_PT_404 || $footer->get_enable_404()) {

          $processed_code = do_shortcode ($footer->ai_getCode ());

          if (strpos ($processed_code, AD_AMP_SEPARATOR) !== false) {
            $codes = explode (AD_AMP_SEPARATOR, $processed_code);
            $processed_code = $codes [0];
          } elseif ($ai_wp_data [AI_WP_AMP_PAGE]) $processed_code = '';

          $footer_code = $processed_code;

          echo $processed_code;

          if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
            if (strlen ($processed_code) != 0)
              ai_log ("FOOTER CODE: " . strlen ($processed_code) . ' characters');
          }
        }
      }
    } else {
        if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
          ai_log ('FOOTER CODE DEBUG NO INSERTION');
        }
      }
  }

  if (!$ai_wp_data [AI_CODE_FOR_IFRAME]) {
    if (!get_disable_footer_code () && isset ($_GET ['ai-debug-code']) && !defined ('AI_DEBUGGING_DEMO')) {
      echo get_code_debug_block (' ' . __('Footer code', 'ad-inserter') . ' ' . ($footer->get_enable_manual () ? '' : ' ' . _x('DISABLED', 'Footer code', 'ad-inserter')), '...&lt;/body&gt;', strlen ($footer_code).' ' . _n('character inserted', 'characters inserted', strlen ($footer_code), 'ad-inserter'), $footer->ai_getCode (), $footer_code);
    }

    if (!get_disable_js_code () &&
        (get_remote_debugging () || ($ai_wp_data [AI_WP_USER] & AI_USER_LOGGED_IN) != 0) &&
        (($ai_wp_data [AI_WP_DEBUGGING] & (AI_DEBUG_POSITIONS | AI_DEBUG_BLOCKS)) != 0 || (isset ($_GET [AI_URL_DEBUG_PROCESSING_FE]) && $_GET [AI_URL_DEBUG_PROCESSING_FE] != 0))) {


      if (!$ai_wp_data [AI_UNFILTERED_HTML]) {
        echo "<section class='".AI_DEBUG_STATUS_CLASS." status-error'>".__('UNFILTERED HTML DISABLED', 'ad-inserter')."</section>\n";
      }

      $class_0 = AI_DEBUG_STATUS_CLASS.' status-error';
      $class_1 = AI_DEBUG_STATUS_CLASS.' status-ok';
      $javascript_text = "<section class='ai-js-0 $class_0'>" . __('JAVASCRIPT NOT WORKING', 'ad-inserter') . "</section><section class='ai-js-1 $class_1' style='display: none;'>" . __('NO JAVASCRIPT ERRORS', 'ad-inserter') . "</section><section class='ai-js-2 $class_0' style='display: none;'>" . __('JAVASCRIPT ERRORS', 'ad-inserter') . "</section>";

      $ai_wp_data [AI_FOOTER_JS_CODE_DOM_READY] .= str_replace ('AI_HTML_CODE', $javascript_text, ai_get_js ('ai-errors-footer', false));

      echo $javascript_text, "\n";
      echo get_page_type_debug_info () , "\n";

      if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0 && isset ($_GET [AI_URL_DEBUG_PROCESSING_FE]) && $_GET [AI_URL_DEBUG_PROCESSING_FE] != 0) {
        echo "\n<pre class='ai-processing-log'>\n\n";
        ai_write_debug_info (true);
        echo "\n</pre>\n";
      }
    }
  }

  if (!(defined ('DOING_AJAX') && DOING_AJAX) || $ai_wp_data [AI_CODE_FOR_IFRAME]) {
    add_footer_inline_scripts ();

    if (function_exists ('ai_add_footer_html')) {
      ai_add_footer_html ();
    }
  }

  if (function_exists ('ai_debug_footer')) {
    ai_debug_footer ();
  }

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
    if (!$ai_processing_time_active) {
      $ai_total_plugin_time += microtime (true) - $start_time;
      $ai_wp_data [AI_PROCESSING_TIME] = false;
    }
    ai_log ("FOOTER HOOK END: ". number_format (1000 * (microtime (true) - $start_time), 2)." ms\n");
  }
}

function ai_amp_footer_hook () {
  global $block_object, $ai_wp_data, $ai_total_plugin_time;

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
    ai_log ("AMP FOOTER HOOK START");
    $ai_processing_time_active = $ai_wp_data [AI_PROCESSING_TIME];
    $ai_wp_data [AI_PROCESSING_TIME] = true;
    $start_time = microtime (true);
  }

  if (defined ('AI_BUFFERING')) {
    if (get_output_buffering ()) {
      if ($ai_wp_data [AI_WP_PAGE_TYPE] != AI_PT_AJAX) {
        ai_buffering_end ();
      }
    }
  }

  $ai_wp_data [AI_CONTEXT] = AI_CONTEXT_FOOTER;

  $footer = $block_object [AI_FOOTER_OPTION_NAME];
  $footer->clear_code_cache ();

  if ($footer->get_enable_manual ()) {
    if (!$footer->get_debug_disable_insertion () && !get_disable_footer_code ()) {
      if ($footer->check_server_side_detection ()) {
        if ($ai_wp_data [AI_WP_PAGE_TYPE] != AI_PT_404 || $footer->get_enable_404()) {
          $processed_code = do_shortcode ($footer->ai_getCode ());

          if (strpos ($processed_code, AD_AMP_SEPARATOR) !== false) {
            $codes = explode (AD_AMP_SEPARATOR, $processed_code);
            $processed_code = ltrim ($codes [1]);
            echo $processed_code;
          }
        }
      }
    }
  }

  if (!isset ($ai_wp_data [AI_AMP_CSS])) {
    if (ai_amp_plugin_custom_css ()) {
      ai_amp_css_hook_style ();
      $ai_wp_data [AI_AMP_CSS] = 'AMP FOOTER STYLE';
    }
  }

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_POSITIONS) != 0) {
    echo get_page_type_debug_info ('AMP ') , "\n";
  }

  if ((get_remote_debugging () || ($ai_wp_data [AI_WP_USER] & AI_USER_LOGGED_IN) != 0) &&
      ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0 &&
      isset ($_GET [AI_URL_DEBUG_PROCESSING_FE]) && $_GET [AI_URL_DEBUG_PROCESSING_FE] != 0) {
    echo "\n<pre class='ai-processing-log'>\n\n";
    ai_write_debug_info (true);
    echo "\n</pre>\n";
  }

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
    if (!$ai_processing_time_active) {
      $ai_total_plugin_time += microtime (true) - $start_time;
      $ai_wp_data [AI_PROCESSING_TIME] = false;
    }
    ai_log ("AMP FOOTER HOOK END: ". number_format (1000 * (microtime (true) - $start_time), 2)." ms\n");
  }
}

function ai_write_debug_info ($write_processing_log = false) {
  global $block_object, $ai_last_time, $ai_total_plugin_time, $ai_total_block_php_time, $ai_total_hook_php_time, $ai_processing_log, $ai_db_options_extract, $ai_wp_data, $ai_db_options, $block_insertion_log,
         $ai_custom_hooks, $version_string, $subversion_string, $filter_hooks, $wpdb;

  ob_start ();

  echo sprintf ("%-25s%s", AD_INSERTER_NAME, AD_INSERTER_VERSION);
  if (function_exists ('ai_debug_log')) {
    ai_debug_log ();
  }
  echo "\n\n";
  if (($install_timestamp = get_option (AI_INSTALL_NAME)) !== false) {
    echo "INSTALLED:               ", date ("Y-m-d H:i:s", $install_timestamp + get_option ('gmt_offset') * 3600);
    if (isset ($ai_wp_data [AI_INSTALL_TIME_DIFFERENCE])) {
      printf (' (%04d-%02d-%02d %02d:%02d:%02d, %d days ago)', $ai_wp_data [AI_INSTALL_TIME_DIFFERENCE]->y,
                                                  $ai_wp_data [AI_INSTALL_TIME_DIFFERENCE]->m,
                                                  $ai_wp_data [AI_INSTALL_TIME_DIFFERENCE]->d,
                                                  $ai_wp_data [AI_INSTALL_TIME_DIFFERENCE]->h,
                                                  $ai_wp_data [AI_INSTALL_TIME_DIFFERENCE]->i,
                                                  $ai_wp_data [AI_INSTALL_TIME_DIFFERENCE]->s,
                                                  isset ($ai_wp_data [AI_DAYS_SINCE_INSTAL]) ? $ai_wp_data [AI_DAYS_SINCE_INSTAL] : null);
    }
    echo "\n";
  }
  echo "GENERATED (WP time):     ", date ("Y-m-d H:i:s", time() + get_option ('gmt_offset') * 3600), "\n";
  echo "GENERATED (Server time): ", date ("Y-m-d H:i:s", time()), "\n";
  echo "PLUGIN CODE PROCESSING:  ", number_format (($ai_total_plugin_time - $ai_total_block_php_time - $ai_total_hook_php_time) * 1000, 2, '.' , ''), " ms\n";
  echo "PLUGIN HOOKS PROCESSING: ", number_format ($ai_total_hook_php_time * 1000, 2, '.' , ''), " ms\n";
  echo "BLOCK CODE PROCESSING:   ", number_format ($ai_total_block_php_time * 1000, 2, '.' , ''), " ms\n";
  echo "TOTAL PROCESSING TIME:   ", number_format ($ai_total_plugin_time * 1000, 2, '.' , ''), " ms\n";
//  echo "MEMORY USED:             ", number_format (memory_get_usage (true) / 1024 / 1024, 2, '.' , ''), " MB\n";
//  echo "PEAK MEMORY USED:        ", number_format (memory_get_peak_usage (true) / 1024 / 1024, 2, '.' , ''), " MB\n";

  echo "SETTINGS:                ";
  if (isset ($ai_db_options [AI_OPTION_GLOBAL]['VERSION']))
    echo (int) ($ai_db_options [AI_OPTION_GLOBAL]['VERSION'][0].$ai_db_options [AI_OPTION_GLOBAL]['VERSION'][1]), '.',
         (int) ($ai_db_options [AI_OPTION_GLOBAL]['VERSION'][2].$ai_db_options [AI_OPTION_GLOBAL]['VERSION'][3]), '.',
         (int) ($ai_db_options [AI_OPTION_GLOBAL]['VERSION'][4].$ai_db_options [AI_OPTION_GLOBAL]['VERSION'][5]);

  echo "\n";
  echo "SETTINGS SIZE:           ", strlen (serialize (ai_get_option (AI_OPTION_NAME))), "\n";
  echo "SETTINGS TIMESTAMP:      ";
  echo isset ($ai_db_options [AI_OPTION_GLOBAL]['TIMESTAMP']) ? date ("Y-m-d H:i:s", $ai_db_options [AI_OPTION_GLOBAL]['TIMESTAMP'] + get_option ('gmt_offset') * 3600) : "", "\n";

  $expected_extract_version = $version_string . $subversion_string . '-' . '96';
  if (function_exists ('ai_system_output_check')) {
    $expected_extract_version .= 'P';
  }

  $extract_source = '';
  $saved_settings = ai_get_option (AI_OPTION_NAME);
  if (isset ($saved_settings [AI_OPTION_EXTRACT]['VERSION']) && $saved_settings [AI_OPTION_EXTRACT]['VERSION'] == $expected_extract_version) {
    $saved_extract = $saved_settings [AI_OPTION_EXTRACT];
    $extract_source = 'SAVED SETTINGS';
  } else {
      $saved_extract = get_option (AI_EXTRACT_NAME);
      $extract_source = defined ('AI_EXTRACT_GENERATED') ? "REGENERATED" : 'SAVED EXTRACT';
    }
  echo "SETTINGS EXTRACT:        ";
  if (isset ($saved_extract ['VERSION'])) {
    $extract_subversion_blocks = explode ('-', $saved_extract ['VERSION']);
    array_shift ($extract_subversion_blocks);
    echo (int) ($saved_extract ['VERSION'][0].$saved_extract ['VERSION'][1]), '.',
         (int) ($saved_extract ['VERSION'][2].$saved_extract ['VERSION'][3]), '.',
         (int) ($saved_extract ['VERSION'][4].$saved_extract ['VERSION'][5]), '-', implode ('-', $extract_subversion_blocks);
  }
  echo"\n";
  echo "EXTRACT TIMESTAMP:       ";
  echo isset ($saved_extract ['TIMESTAMP']) ? date ("Y-m-d H:i:s", $saved_extract ['TIMESTAMP'] + get_option ('gmt_offset') * 3600) : "", "\n";
  echo "EXTRACT SOURCE:          ", $extract_source, "\n";

  echo "USER:                    ";
  if (($ai_wp_data [AI_WP_USER] & AI_USER_LOGGED_IN)     == AI_USER_LOGGED_IN) echo "LOGGED-IN "; else echo "NOT LOGGED-IN ";
  if (($ai_wp_data [AI_WP_USER] & AI_USER_ADMINISTRATOR) == AI_USER_ADMINISTRATOR) echo "ADMINISTRATOR";
  $current_user = wp_get_current_user();
  echo "\n";
  echo "USERNAME:                ", $current_user->user_login, "\n";
  echo 'USER ROLES:              ', implode (', ', $current_user->roles), "\n";

  echo 'MIN.USER FOR EXCEPTIONS: ', get_minimum_user_role (), "\n";
  echo "PAGE TYPE:               ";
  switch ($ai_wp_data [AI_WP_PAGE_TYPE]) {
    case AI_PT_STATIC:    echo "STATIC PAGE"; break;
    case AI_PT_POST:      echo "POST"; break;
    case AI_PT_HOMEPAGE:  echo "HOMEPAGE"; break;
    case AI_PT_CATEGORY:  echo "CATEGORY PAGE"; break;
    case AI_PT_ARCHIVE:   echo "ARCHIVE PAGE"; break;
    case AI_PT_SEARCH:    echo "SEARCH PAGE"; break;
    case AI_PT_404:       echo "404 PAGE"; break;
    case AI_PT_ADMIN:     echo "ADMIN"; break;
    case AI_PT_FEED:      echo "FEED"; break;
    case AI_PT_AJAX:      echo "AJAX"; break;
    case AI_PT_ANY:       echo "ANY ?"; break;
    case AI_PT_NONE:      echo "NONE ?"; break;
    default:              echo "?"; break;
  }
  echo "\n";

  switch ($ai_wp_data [AI_WP_PAGE_TYPE]) {
    case AI_PT_STATIC:
    case AI_PT_POST:
      $queried_object_id = '';
      $queried_object = get_queried_object ();
      if ($queried_object) {
        $queried_object_id = $queried_object->ID;
      }

      echo 'PUBLISHED:               ', date ("Y-m-d H:i:s", get_the_date ('U')), "\n";
      echo 'ID:                      ', ai_get_post_id ();
      echo " (get_the_ID: ", get_the_ID (), ", get_queried_object: ", $queried_object_id, ")";
      echo "\n";
      echo 'POST TYPE:               ', get_post_type (), "\n";
      echo 'AUTHOR:                  ', strtolower (get_the_author_meta ('user_login')), "\n";

      $category_data = get_the_category();
      $categories = array ();
      foreach ($category_data as $category) {
        $categories []= $category->name . ' ('.$category->slug.')';
      }
      echo 'CATEGORIES:              ', implode (', ', $categories), "\n";

      $category_data = get_categories ();
      $categories = array ();
      foreach ($category_data as $category) {
        if (ai_post_is_in_child_categories ($category->slug)) {
          $categories []= $category->name . ' ('.$category->slug.')';
        }
      }
      echo 'PARENT CATEGORIES:       ', implode (', ', $categories), "\n";
      echo 'PRIMARY CATEGORY:        ', ai_primary_category (), "\n";
      $tag_data = wp_get_post_tags (get_the_ID());
      $tags = array ();
      foreach ($tag_data as $tag) {
        $tags []= $tag->name . ' ('.$tag->slug.')';
      }
      echo 'TAGS:                    ', implode (', ', $tags), "\n";

      $taxonomies = array ();
      $taxonomy_names = get_post_taxonomies ();
      foreach ($taxonomy_names as $taxonomy_name) {
        $terms = get_the_terms (0, $taxonomy_name);
        if (is_array ($terms)) {
          foreach ($terms as $term) {
            $taxonomies [] = strtolower ($term->taxonomy) . ':' . strtolower ($term->slug);
          }
        }
      }
      echo 'TAXONOMIES:              ', implode (', ', $taxonomies), "\n";

      $taxonomy_data = get_taxonomies ();
      $taxonomies = array ();
      foreach ($taxonomy_data as $taxonomy) {
        $terms = get_terms ($taxonomy);
        foreach ($terms as $term) {
          if (ai_post_is_in_child_taxonomies ($taxonomy, $term->slug)) {
            $taxonomies []= $term->name . ' ('.$taxonomy.':'.$term->slug.')';
          }
        }
      }
      echo 'PARENT TAXONOMIES:       ', implode (', ', $taxonomies), "\n";

      if (isset ($_GET [AI_URL_DEBUG_META])) {
        $post_meta = get_post_meta (get_the_ID());
        $meta_string = array ();
        foreach ($post_meta as $key => $post_meta_field) {
          foreach ($post_meta_field as $post_meta_field_item) {
            $meta_string []= $key . ':' . $post_meta_field_item;
          }
        }
        echo 'POST META:               ', str_replace (array ("<!--", "-->", "\n", "\r"), array ("[!--", "--]", "*n", "*r"), implode (', ', $meta_string)), "\n";
      }

      break;
    case AI_PT_CATEGORY:
      $category_data = get_queried_object();
      $categories = array ();
      if ($category_data instanceof WP_Term) {
        $categories []= $category_data->slug;
      }
      echo 'CATEGORY:                ', implode (', ', $categories), "\n";
      break;
    case AI_PT_ARCHIVE:
      $tag_data = wp_get_post_tags (get_the_ID());
      $tags = array ();
      foreach ($tag_data as $tag) {
        $tags []= $tag->slug;
      }
      echo 'TAG:                     ', implode (', ', $tags), "\n";
      break;
  }


  echo 'AMP PAGE:                ', ($ai_wp_data [AI_WP_AMP_PAGE] ? 'YES' : 'NO'), "\n";
  if ($ai_wp_data [AI_WP_AMP_PAGE]) {
  echo 'AMP CSS:                 ', (isset ($ai_wp_data [AI_AMP_CSS]) ? $ai_wp_data [AI_AMP_CSS] : ''), "\n";
  }

  echo 'URL:                     ', esc_attr ($ai_wp_data [AI_WP_URL]), "\n";
  echo 'REFERRER:                ', isset ($_SERVER['HTTP_REFERER']) ? strtolower (parse_url ($_SERVER['HTTP_REFERER'], PHP_URL_HOST)) . ' ('. remove_debug_parameters_from_url ($_SERVER['HTTP_REFERER']).')' : "", "\n";
  if (function_exists ('ai_debug')) ai_debug ();

  if ($ai_wp_data [AI_CLIENT_SIDE_DETECTION] || 1) {
    for ($viewport = 1; $viewport <= 6; $viewport ++) {
      $viewport_name  = get_viewport_name ($viewport);
      $viewport_width = get_viewport_width ($viewport);
      if ($viewport_name != '') {
        echo 'VIEWPORT ', $viewport, ':              ', sprintf ("%-16s min width %s", $viewport_name.' ', $viewport_width), " px\n";
      }
    }
  }

  echo 'SERVER-SIDE DETECTION:   ', $ai_wp_data [AI_SERVER_SIDE_DETECTION] ? 'USED' : "NOT USED", "\n";
  if ($ai_wp_data [AI_SERVER_SIDE_DETECTION]) {
    echo 'SERVER-SIDE DEVICE:      ';
    if (AI_DESKTOP) echo "DESKTOP\n";
    elseif (AI_TABLET) echo "TABLET\n";
    elseif (AI_PHONE) echo "PHONE\n";
    else echo "?\n";
  }

  echo 'CLIENT-SIDE DETECTION:   ', $ai_wp_data [AI_CLIENT_SIDE_DETECTION] ? 'USED' : "NOT USED", "\n";
  echo 'DISABLE CACHING:         ', $ai_wp_data [AI_DISABLE_CACHING] ? 'USED' : "NOT USED", "\n";
  echo 'STICKY WIDGETS:          ', $ai_wp_data [AI_STICKY_WIDGETS] ? 'USED' : "NOT USED", "\n";

  if (function_exists ('ai_debug_features')) ai_debug_features ();

  $enabled_custom_hooks = array ();
  foreach ($ai_custom_hooks as $ai_custom_hook) {
    $hook = $ai_custom_hook ['index'];
    $enabled_custom_hooks [] = $ai_custom_hook ['action'];
  }
  for ($hook = 1; $hook <= 20; $hook ++) {
    $name       = str_replace (array ('&lt;', '&gt;'), array ('<', '>'), get_hook_name ($hook));
    $action     = get_hook_action ($hook);
    if (get_hook_enabled ($hook) /*&& $name != '' && $action != ''*/) {
      $priority   = get_hook_priority ($hook);
      echo 'CUSTOM HOOK ', sprintf ("%2d", $hook), ':          ', sprintf ("%-30s %-35s %d %s", $name, $action, $priority, !in_array ($action, $enabled_custom_hooks) ? 'INVALID' : ''), "\n";
    }
  }
  echo 'BLOCK CLASS NAME:        ', get_block_class_name (), "\n";
  echo 'INLINE STYLES:           ', get_inline_styles () ? 'ENABLED' : 'DISABLED', "\n";
  echo 'DYNAMIC BLOCKS:          ';
  switch (get_dynamic_blocks()) {
    case AI_DYNAMIC_BLOCKS_SERVER_SIDE:
      echo AI_TEXT_ENG_SERVER_SIDE;
      break;
    case AI_DYNAMIC_BLOCKS_SERVER_SIDE_W3TC:
      echo AI_TEXT_ENG_SERVER_SIDE_W3TC;
      break;
    case AI_DYNAMIC_BLOCKS_CLIENT_SIDE_SHOW:
      echo AI_TEXT_ENG_CLIENT_SIDE_SHOW;
      break;
    case AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT:
      echo AI_TEXT_ENG_CLIENT_SIDE_INSERT;
      break;
  }
  echo "\n";
  echo 'STICKY WIDGET MODE:      ';
  switch (get_sticky_widget_mode ()) {
    case AI_STICKY_WIDGET_MODE_CSS:
      echo AI_TEXT_CSS;
      break;
    case AI_STICKY_WIDGET_MODE_JS:
      echo AI_TEXT_JS;
      break;
  }
  echo "\n";
  echo 'PARAGRAPH COUNTING:      ';
  switch (get_paragraph_counting_functions()) {
    case AI_STANDARD_PARAGRAPH_COUNTING_FUNCTIONS:
      echo AI_TEXT_ENG_STANDARD;
      break;
    case AI_MULTIBYTE_PARAGRAPH_COUNTING_FUNCTIONS:
      echo AI_TEXT_ENG_MULTIBYTE;
      break;
  }
  echo "\n";
  echo 'NO PAR. COUNTING INSIDE: ', get_no_paragraph_counting_inside (), "\n";
  if (defined ('AI_BUFFERING')) {
    echo 'OUTPUT BUFFERING:        ';
    switch (get_output_buffering()) {
      case AI_OUTPUT_BUFFERING_DISABLED:
        echo AI_TEXT_ENG_DISABLED;
        break;
      case AI_OUTPUT_BUFFERING_ENABLED:
        echo AI_TEXT_ENG_ENABLED;
        break;
    }
    echo "\n";
  }
  echo 'AD LABEL:                ', get_ad_label (), "\n";
  if (defined ('AI_STICKY_SETTINGS') && AI_STICKY_SETTINGS) {
    echo 'MAIN CONTENT:            ', get_main_content_element (), "\n";
  }
  echo 'PLUGIN PRIORITY:         ', get_plugin_priority (), "\n";
  echo 'TAB SETUP DELAY:         ', get_tab_setup_delay (), "\n";
  echo 'ADMIN DISABLE CACHING:   ', get_disable_caching () ? 'ENABLED' : 'DISABLED', "\n";
  echo 'WAIT FOR JQUERY:         ', get_wait_for_jquery () ? 'ENABLED' : 'DISABLED', "\n";
  echo 'DO NOT CACHE CONSTANTS:  ', defined ('DONOTCACHEPAGE') ? 'DONOTCACHEPAGE ' : '', defined ('DONOTCACHEOBJECT') ? 'DONOTCACHEOBJECT ' : '', defined ('DONOTCACHEDB') ? 'DONOTCACHEDB ' : '', "\n";
  $virtual_ads_txt = get_option (AI_ADS_TXT_NAME);
  $virtual_ads_txt_lines = explode ("\n", $virtual_ads_txt);
  echo 'VIRTUAL ADS.TXT:         ', $virtual_ads_txt !== false ? count ($virtual_ads_txt_lines). ' LINES' : 'NOT USED', "\n";
  echo 'HEADER:                  ', $block_object [AI_HEADER_OPTION_NAME]->get_enable_manual () ? 'ENABLED' : 'DISABLED', "\n";
  echo 'FOOTER:                  ', $block_object [AI_FOOTER_OPTION_NAME]->get_enable_manual () ? 'ENABLED' : 'DISABLED', "\n";
  if (defined ('AI_ADBLOCKING_DETECTION') && AI_ADBLOCKING_DETECTION) {
    echo 'AD BLOCKING DETECTION:   ', $ai_wp_data [AI_ADB_DETECTION] ? 'ENABLED' : 'DISABLED', "\n";
    echo 'DISABLED BY SHORTCODE:   ', isset ($ai_wp_data [AI_ADB_SHORTCODE_DISABLED]) ? 'YES' : "NO", "\n";

    if ($ai_wp_data [AI_ADB_DETECTION]) {
      echo 'ADB ACTION:              ';
      switch (get_adb_action (true)) {
        case AI_ADB_ACTION_NONE:
          echo AI_TEXT_ENG_NONE;
          break;
        case AI_ADB_ACTION_MESSAGE:
          echo AI_TEXT_ENG_POPUP_MESSAGE;
          break;
        case AI_ADB_ACTION_REDIRECTION:
          echo AI_TEXT_ENG_REDIRECTION;
          break;
      }
      echo "\n";
      echo 'ADB NO ACTION:           ';
      switch (get_adb_no_action (true)) {
        case AI_ADB_NO_ACTION_NONE:
          echo AI_TEXT_ENG_NONE;
          break;
        case AI_ADB_NO_ACTION_LOGGED_IN:
          echo AI_TEXT_ENG_DISPLAY_LOGGED_IN_USERS;
          break;
        case AI_ADB_NO_ACTION_ADMINISTRATORS:
          echo AI_TEXT_ENG_DISPLAY_ADMINISTRATORS;
          break;
      }
      echo "\n";
      echo 'ADB DELAY ACTION:        ', get_delay_action (), "\n";
      echo 'ADB NO ACTION PERIOD:    ', get_no_action_period (), "\n";
      echo 'ADB SELECTORS:           ', get_adb_selectors (true), "\n";
      if (function_exists ('ai_debug')) {
        echo 'ADB DETECTION:           ', get_adb_detection () == AI_ADB_DETECTION_ADVANCED ? 'ADVANCED' : 'STANDARD', "\n";
      }
      echo 'ADB EXTERNAL SCRIPTS:    ', get_adb_external_scripts () ? 'ON' : 'OFF', "\n";

      $redirection_page = get_redirection_page ();
      echo 'ADB REDIRECTION PAGE:    ', $redirection_page != 0 ? get_the_title ($redirection_page) . ' (' . get_permalink ($redirection_page) . ')' : 'Custom Url', "\n";
      echo 'ADB REDIRECTION URL:     ', get_custom_redirection_url (), "\n";
      echo 'ADB MESSAGE:             ', str_replace (array ("<!--", "-->"), array ("<!++", "++>"), $block_object [AI_ADB_MESSAGE_OPTION_NAME]->ai_getCode ()), "\n";
      echo 'ADB MESSAGE CSS:         ', get_message_css (), "\n";
      echo 'ADB OVERLAY CSS:         ', get_overlay_css (), "\n";
      echo 'ADB UNDISMISSIBLE:       ', get_undismissible_message (true) ? 'ON' : 'OFF', "\n";
    }
  }

  if (isset ($_SERVER ['HTTP_USER_AGENT'])) {
    echo 'USER AGENT:              ', $_SERVER ['HTTP_USER_AGENT'], "\n";
  }

  if (isset ($_SERVER ['HTTP_ACCEPT_LANGUAGE'])) {
    echo 'LANGUAGE:                ', $_SERVER ['HTTP_ACCEPT_LANGUAGE'], "\n";
  }

  if (isset ($ai_wp_data [AI_CLIENTS]) && isset ($ai_wp_data [AI_AGENT])) {
    $agent = $ai_wp_data [AI_AGENT];
    if (!empty ($ai_wp_data [AI_CLIENTS])) {
      $ai_wp_data [AI_CLIENTS] = array_unique ($ai_wp_data [AI_CLIENTS]);
      foreach ($ai_wp_data [AI_CLIENTS] as $client) {
        echo sprintf ("  %-23s", $client.':'), check_client_list ($client, true) ? 'YES' : 'NO', "\n";
      }
    }
  }

  if (!empty ($filter_hooks)) {
    echo "\n";
    foreach ($filter_hooks as $filter_hook) {
      echo "ACTIVE FILTER HOOK:      ";
      foreach ($filter_hook as $index => $filter_hook_data) {
        if ($index != 0) echo ", ";
        echo $filter_hook_data;
      }
      echo "\n";
    }
  }

  if (isset ($_GET [AI_URL_DEBUG_TRACKING]) && $_GET [AI_URL_DEBUG_TRACKING]) {
    if ($log = get_transient ('ai_debug_tracking')) {
      echo 'TRACKING LOG:            ', "\n";
      echo $log;
      echo "\n";
    }
  }

  echo "\n";


//  if ($block_object [AI_HEADER_OPTION_NAME]->get_enable_manual ()) {
//    echo "HEADER CODE ========================================================\n";
//    echo ai_dump_code ($block_object [AI_HEADER_OPTION_NAME]->ai_getCode ());
//    echo "\n====================================================================\n\n";
//  }
//  if ($block_object [AI_FOOTER_OPTION_NAME]->get_enable_manual ()) {
//    echo "FOOTER CODE ========================================================\n";
//    echo ai_dump_code ($block_object [AI_FOOTER_OPTION_NAME]->ai_getCode ());
//    echo "\n====================================================================\n\n";
//  }

  $default = new ai_Block (1);

  echo "BLOCK SETTINGS           Po Pa Hp Cp Ap Sp AM Aj Fe 404 Wi Sh PHP\n";
  for ($block = 1; $block <= 96; $block ++) {
    $obj = $block_object [$block];

    $settings = "";
    $insertion_settings = '';
    $alignment_settings = '';
    $default_settings = true;
//    $display_type = '';
    foreach (array_keys ($default->wp_options) as $key){
      switch ($key) {
        case AI_OPTION_CODE:
        case AI_OPTION_BLOCK_NAME:
          continue 2;
        case AI_OPTION_DISPLAY_ON_PAGES:
        case AI_OPTION_DISPLAY_ON_POSTS:
        case AI_OPTION_DISPLAY_ON_HOMEPAGE:
        case AI_OPTION_DISPLAY_ON_CATEGORY_PAGES:
        case AI_OPTION_DISPLAY_ON_SEARCH_PAGES:
        case AI_OPTION_DISPLAY_ON_ARCHIVE_PAGES:
        case AI_OPTION_ENABLE_AMP:
        case AI_OPTION_ENABLE_AJAX:
        case AI_OPTION_ENABLE_FEED:
        case AI_OPTION_ENABLE_404:
        case AI_OPTION_ENABLE_MANUAL:
        case AI_OPTION_ENABLE_WIDGET:
        case AI_OPTION_ENABLE_PHP_CALL:
          if ($obj->wp_options [$key] != $default->wp_options [$key]) $default_settings = false;
          continue 2;
      }

//      if (gettype ($obj->wp_options [$key]) == 'string' && gettype ($default->wp_options [$key]) == 'integer') {
//        $default->wp_options [$key] = strval ($default->wp_options [$key]);
//      }
//      elseif (gettype ($obj->wp_options [$key]) == 'integer' && gettype ($default->wp_options [$key]) == 'string') {
//        $default->wp_options [$key] = intval ($default->wp_options [$key]);
//      }

//      if ($obj->wp_options [$key] !== $default->wp_options [$key]) {
      if ($obj->wp_options [$key] != $default->wp_options [$key]) {
        $default_settings = false;
        switch ($key) {
          case AI_OPTION_AUTOMATIC_INSERTION:
            $insertion_settings = $obj->get_automatic_insertion_text (false, false);
            break;
          case AI_OPTION_SERVER_SIDE_INSERTION:
            $settings .= "[" . $key . ": " . $obj->get_automatic_insertion_text (true, false) . ']';
            break;
          case AI_OPTION_ALIGNMENT_TYPE:
            $alignment_settings = $obj->get_alignment_type_text (false);
            break;
          case AI_OPTION_ENABLED_ON_WHICH_PAGES:
            $settings .= "[" . $key . ": " . $obj->get_ad_enabled_on_which_pages_text (false) . ']';
            break;
          case AI_OPTION_ENABLED_ON_WHICH_POSTS:
            $settings .= "[" . $key . ": " . $obj->get_ad_enabled_on_which_posts_text (false) . ']';
            break;
          case AI_OPTION_EXCEPTIONS_FUNCTION:
            $settings .= "[" . $key . ": " . $obj->get_exceptions_function_text (false) . ']';
            break;
          case AI_OPTION_FILTER_TYPE:
            $settings .= "[" . $key . ": " . $obj->get_filter_type_text (false) . ']';
            break;
          case AI_OPTION_AVOID_ACTION:
            $settings .= "[" . $key . ": " . $obj->get_avoid_action_text (false) . ']';
            break;
          case AI_OPTION_AVOID_DIRECTION:
            $settings .= "[" . $key . ": " . $obj->get_avoid_direction_text (false) . ']';
            break;
          case AI_OPTION_DIRECTION_TYPE:
            $settings .= "[" . $key . ": " . $obj->get_direction_type_text (false) . ']';
            break;
          case AI_OPTION_PARAGRAPH_TEXT_TYPE:
            $settings .= "[" . $key . ": " . $obj->get_paragraph_text_type_text (false) . ']';
            break;
          case AI_OPTION_COUNT_INSIDE:
            $settings .= "[" . $key . ": " . $obj->get_count_inside_text (false) . ']';
            break;
          case AI_OPTION_COUNT_INSIDE_ELEMENTS_CONTAIN:
            $settings .= "[" . $key . ": " . $obj->get_count_inside_elements_contain_text (false) . ']';
            break;
          case AI_OPTION_DISPLAY_FOR_USERS:
            $settings .= "[" . $key . ": " . $obj->get_display_for_users_text (false) . ']';
            break;
          case AI_OPTION_DISPLAY_FOR_DEVICES:
            $settings .= "[" . $key . ": " . $obj->get_display_for_devices_text (false) . ']';
            break;
          case AI_OPTION_PARAGRAPH_TEXT:
          case AI_OPTION_COUNT_INSIDE_ELEMENTS_TEXT:
          case AI_OPTION_AVOID_TEXT_ABOVE:
          case AI_OPTION_AVOID_TEXT_BELOW:
          case AI_OPTION_HTML_SELECTOR:
            if ($write_processing_log)
              $settings .= "[" . $key . ": " . ai_log_filter_content (html_entity_decode ($obj->wp_options [$key])) . ']'; else
                $settings .= "[" . $key . ": " . $obj->wp_options [$key] . ']';
            break;
          default:
            $settings .= "[" . $key . ": " . $obj->wp_options [$key] . ']';
            break;
        }

//        $settings .= ' ['.gettype ($obj->wp_options [$key]).':'.$obj->wp_options [$key].'#'.gettype ($default->wp_options [$key]).':'.$default->wp_options [$key].'] ';

      } else
        switch ($key) {
          case AI_OPTION_AUTOMATIC_INSERTION:
            $insertion_settings = $obj->get_automatic_insertion_text (false, false);
            break;
          case AI_OPTION_ALIGNMENT_TYPE:
            $alignment_settings = $obj->get_alignment_type_text (false);
            break;
        }
    }
    if ($default_settings && $settings == '') continue;
    $settings = ' [' . $insertion_settings . '][' . $alignment_settings . ']' . $settings;

    echo sprintf ("%2d %-21s ", $block, $ai_wp_data [AI_MBSTRING_LOADED] ? mb_substr ($obj->get_ad_name(), 0, 21) : substr ($obj->get_ad_name(), 0, 21));

    echo $obj->get_display_settings_post()     ? "o" : ".", "  ";
    echo $obj->get_display_settings_page()     ? "o" : ".", "  ";
    echo $obj->get_display_settings_home()     ? "o" : ".", "  ";
    echo $obj->get_display_settings_category() ? "o" : ".", "  ";
    echo $obj->get_display_settings_archive()  ? "o" : ".", "  ";
    echo $obj->get_display_settings_search()   ? "o" : ".", "  ";
    echo $obj->get_enable_amp()                ? "o" : ".", "  ";
    echo $obj->get_enable_ajax()               ? "o" : ".", "  ";
    echo $obj->get_enable_feed()               ? "o" : ".", "  ";
    echo $obj->get_enable_404()                ? "o" : ".", "   ";
    echo $obj->get_enable_widget()             ? "x" : ".", "  ";
    echo $obj->get_enable_manual()             ? "x" : ".", "  ";
    echo $obj->get_enable_php_call()           ? "x" : ".", "  ";

    echo $settings, "\n";
  }
  echo "\n";


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
  $posts_pages = get_posts ($args);

  if (count ($posts_pages) != 0) {
    echo "EXCEPTIONS FOR BLOCKS    ID     TYPE                      TITLE                                                            URL\n";
    foreach ($posts_pages as $page) {
      $post_meta = get_post_meta ($page->ID, '_adinserter_block_exceptions', true);
      if ($post_meta == '') continue;
      $post_type_object = get_post_type_object ($page->post_type);
      echo sprintf ("%-24s %-6s %-24s  %-64s %s", $post_meta, $page->ID, $post_type_object->labels->singular_name, mb_substr ($page->post_title, 0, 64), get_permalink ($page->ID)), "\n";
    }
    echo "\n";
  }

  echo "TOTAL BLOCKS\n";
  if (count ($ai_db_options_extract [ABOVE_HEADER_HOOK_BLOCKS][AI_PT_ANY]))
    echo "ABOVE HEADER:            ", implode (", ", $ai_db_options_extract [ABOVE_HEADER_HOOK_BLOCKS][AI_PT_ANY]), "\n";
  if (count ($ai_db_options_extract [CONTENT_HOOK_BLOCKS][AI_PT_ANY]))
    echo "CONTENT HOOK:            ", implode (", ", $ai_db_options_extract [CONTENT_HOOK_BLOCKS][AI_PT_ANY]), "\n";
  if (count ($ai_db_options_extract [EXCERPT_HOOK_BLOCKS][AI_PT_ANY]))
    echo "EXCERPT HOOK:            ", implode (", ", $ai_db_options_extract [EXCERPT_HOOK_BLOCKS][AI_PT_ANY]), "\n";
  if (count ($ai_db_options_extract [LOOP_START_HOOK_BLOCKS][AI_PT_ANY]))
    echo "LOOP START HOOK:         ", implode (", ", $ai_db_options_extract [LOOP_START_HOOK_BLOCKS][AI_PT_ANY]), "\n";
  if (count ($ai_db_options_extract [LOOP_END_HOOK_BLOCKS][AI_PT_ANY]))
    echo "LOOP END HOOK:           ", implode (", ", $ai_db_options_extract [LOOP_END_HOOK_BLOCKS][AI_PT_ANY]), "\n";
  if (count ($ai_db_options_extract [POST_HOOK_BLOCKS][AI_PT_ANY]))
    echo "POST HOOK:               ", implode (", ", $ai_db_options_extract [POST_HOOK_BLOCKS][AI_PT_ANY]), "\n";
  if (count ($ai_db_options_extract [BEFORE_COMMENTS_HOOK_BLOCKS][AI_PT_ANY]))
    echo "BEFORE COMMENTS HOOK:     ", implode (", ", $ai_db_options_extract [BEFORE_COMMENTS_HOOK_BLOCKS][AI_PT_ANY]), "\n";
  if (count ($ai_db_options_extract [BETWEEN_COMMENTS_HOOK_BLOCKS][AI_PT_ANY]))
    echo "BETWEEN COMMENTS HOOK    ", implode (", ", $ai_db_options_extract [BETWEEN_COMMENTS_HOOK_BLOCKS][AI_PT_ANY]), "\n";
  if (count ($ai_db_options_extract [AFTER_COMMENTS_HOOK_BLOCKS][AI_PT_ANY]))
    echo "AFTER COMMENTS HOOK:     ", implode (", ", $ai_db_options_extract [AFTER_COMMENTS_HOOK_BLOCKS][AI_PT_ANY]), "\n";
  if (count ($ai_db_options_extract [FOOTER_HOOK_BLOCKS][AI_PT_ANY]))
    echo "FOOTER HOOK:             ", implode (", ", $ai_db_options_extract [FOOTER_HOOK_BLOCKS][AI_PT_ANY]), "\n";
  foreach ($ai_custom_hooks as $hook_index => $custom_hook) {

    switch ($custom_hook ['action']) {
      case 'wp_footer':
//      case 'wp_head':
      case 'the_content':
      case 'the_excerpt':
      case 'loop_start':
      case 'loop_end':
//      case 'the_post':
        continue 2;
    }

    if (count ($ai_db_options_extract [$custom_hook ['action'] . CUSTOM_HOOK_BLOCKS][AI_PT_ANY]))
      echo substr (strtoupper (str_replace (array ('&lt;', '&gt;'), array ('<', '>'), get_hook_name ($custom_hook ['index']))) . " HOOK:                   ", 0, 25), implode (", ", $ai_db_options_extract [$custom_hook ['action'] . CUSTOM_HOOK_BLOCKS][AI_PT_ANY]), "\n";
  }
  if (count ($ai_db_options_extract [HTML_ELEMENT_HOOK_BLOCKS][AI_PT_ANY]))
    echo "HTML ELEMENT:            ", implode (", ", $ai_db_options_extract [HTML_ELEMENT_HOOK_BLOCKS][AI_PT_ANY]), "\n";

  echo "\nBLOCKS FOR THIS PAGE TYPE\n";
  if (isset ($ai_db_options_extract [ABOVE_HEADER_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) && count ($ai_db_options_extract [ABOVE_HEADER_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]))
    echo "ABOVE HEADER:            ", implode (", ", $ai_db_options_extract [ABOVE_HEADER_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]), "\n";
  if (isset ($ai_db_options_extract [CONTENT_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) && count ($ai_db_options_extract [CONTENT_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]))
    echo "CONTENT HOOK:            ", implode (", ", $ai_db_options_extract [CONTENT_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]), "\n";
  if (isset ($ai_db_options_extract [EXCERPT_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) && count ($ai_db_options_extract [EXCERPT_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]))
    echo "EXCERPT HOOK:            ", implode (", ", $ai_db_options_extract [EXCERPT_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]), "\n";
  if (isset ($ai_db_options_extract [LOOP_START_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) && count ($ai_db_options_extract [LOOP_START_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]))
    echo "LOOP START HOOK:         ", implode (", ", $ai_db_options_extract [LOOP_START_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]), "\n";
  if (isset ($ai_db_options_extract [LOOP_END_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) && count ($ai_db_options_extract [LOOP_END_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]))
    echo "LOOP END HOOK:           ", implode (", ", $ai_db_options_extract [LOOP_END_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]), "\n";
  if (isset ($ai_db_options_extract [POST_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) && count ($ai_db_options_extract [POST_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]))
    echo "POST HOOK:               ", implode (", ", $ai_db_options_extract [POST_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]), "\n";
  if (isset ($ai_db_options_extract [BEFORE_COMMENTS_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) && count ($ai_db_options_extract [BEFORE_COMMENTS_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]))
    echo "AFTER COMMENTS HOOK:     ", implode (", ", $ai_db_options_extract [BEFORE_COMMENTS_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]), "\n";
  if (isset ($ai_db_options_extract [BETWEEN_COMMENTS_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) && count ($ai_db_options_extract [BETWEEN_COMMENTS_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]))
    echo "BETWEEN COMMENTS HOOK:   ", implode (", ", $ai_db_options_extract [BETWEEN_COMMENTS_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]), "\n";
  if (isset ($ai_db_options_extract [AFTER_COMMENTS_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) && count ($ai_db_options_extract [AFTER_COMMENTS_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]))
    echo "AFTER COMMENTS HOOK:     ", implode (", ", $ai_db_options_extract [AFTER_COMMENTS_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]), "\n";
  if (isset ($ai_db_options_extract [FOOTER_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) && count ($ai_db_options_extract [FOOTER_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]))
    echo "FOOTER HOOK              ", implode (", ", $ai_db_options_extract [FOOTER_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]), "\n";
  foreach ($ai_custom_hooks as $hook_index => $custom_hook) {

    switch ($custom_hook ['action']) {
      case 'wp_footer':
//      case 'wp_head':
      case 'the_content':
      case 'the_excerpt':
      case 'loop_start':
      case 'loop_end':
//      case 'the_post':
        continue 2;
    }

    if (isset ($ai_db_options_extract [$custom_hook ['action'] . CUSTOM_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) && count ($ai_db_options_extract [$custom_hook ['action'] . CUSTOM_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]))
      echo substr (strtoupper (str_replace (array ('&lt;', '&gt;'), array ('<', '>'), get_hook_name ($custom_hook ['index']))) . " HOOK:                   ", 0, 25), implode (", ", $ai_db_options_extract [$custom_hook ['action'] . CUSTOM_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]), "\n";
  }
  if (isset ($ai_db_options_extract [HTML_ELEMENT_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) && count ($ai_db_options_extract [HTML_ELEMENT_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]))
    echo "HTML ELEMENT:            ", implode (", ", $ai_db_options_extract [HTML_ELEMENT_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]), "\n";

  echo "\nDISABLED BLOCKS:         ", isset ($ai_wp_data [AI_DISABLED_BLOCKS]) ? implode (', ', $ai_wp_data [AI_DISABLED_BLOCKS]) : '', "\n";

  if ($write_processing_log) {
    echo "\nTIME  EVENT\n";
    echo "======================================\n";

    foreach ($ai_processing_log as $log_line) {
      echo $log_line, "\n";
    }

    sort ($block_insertion_log);
    echo "\nINSERTION SUMMARY\n";
    echo "======================================\n";
    foreach ($block_insertion_log as $log_line) {
      echo substr ($log_line, 3), "\n";
    }

    echo "\n\n";


    echo "SERVER_ADDR:             ", isset ($_SERVER ['SERVER_ADDR']) ? $_SERVER ['SERVER_ADDR'] : '', "\n";
    echo "HTTP_CF_CONNECTING_IP:   ", isset ($_SERVER ['HTTP_CF_CONNECTING_IP']) ? $_SERVER ['HTTP_CF_CONNECTING_IP'] : '', "\n";
    echo "HTTP_CLIENT_IP:          ", isset ($_SERVER ['HTTP_CLIENT_IP']) ? $_SERVER ['HTTP_CLIENT_IP'] : '', "\n";
    echo "HTTP_INCAP_CLIENT_IP:    ", isset ($_SERVER ['HTTP_INCAP_CLIENT_IP']) ? $_SERVER ['HTTP_INCAP_CLIENT_IP'] : '', "\n";
    echo "HTTP_X_FORWARDED_FOR:    ", isset ($_SERVER ['HTTP_X_FORWARDED_FOR']) ? $_SERVER ['HTTP_X_FORWARDED_FOR'] : '', "\n";
    echo "HTTP_X_FORWARDED:        ", isset ($_SERVER ['HTTP_X_FORWARDED']) ? $_SERVER ['HTTP_X_FORWARDED'] : '', "\n";
    echo "HTTP_X_CLUSTER_CLIENT_IP:", isset ($_SERVER ['HTTP_X_CLUSTER_CLIENT_IP']) ? $_SERVER ['HTTP_X_CLUSTER_CLIENT_IP'] : '', "\n";
    echo "HTTP_FORWARDED_FOR:      ", isset ($_SERVER ['HTTP_FORWARDED_FOR']) ? $_SERVER ['HTTP_FORWARDED_FOR'] : '', "\n";
    echo "HTTP_FORWARDED:          ", isset ($_SERVER ['HTTP_FORWARDED']) ? $_SERVER ['HTTP_FORWARDED'] : '', "\n";
    echo "REMOTE_ADDR:             ", isset ($_SERVER ['REMOTE_ADDR']) ? $_SERVER ['REMOTE_ADDR'] : '', "\n";

    echo "\n";

    echo 'PHP PROCESSING DISABLED: ', defined ('AI_NO_PHP_PROCESSING')       ? 'SET'  : "NO", "\n";
    echo 'DISALLOW_FILE_EDIT:      ', defined ('DISALLOW_FILE_EDIT') && DISALLOW_FILE_EDIT ? 'SET'  : "NO", "\n";
    echo 'DISALLOW_FILE_MODS:      ', defined ('DISALLOW_FILE_MODS') && DISALLOW_FILE_MODS ? 'SET'  : "NO", "\n";
    echo 'DISALLOW_UNFILTERED_HTML:', defined ('DISALLOW_UNFILTERED_HTML') && DISALLOW_UNFILTERED_HTML ? 'SET'  : "NO", "\n";

    echo "\n";

    echo "MULTISITE:               ", is_multisite() ? "YES" : "NO", "\n";
    if (is_multisite()) {
      echo "MAIN SITE:               ", is_main_site () ? "YES" : "NO", "\n";
      echo "SITE COUNT:              ", get_blog_count(), "\n";
    }

    echo "OPTIONS DATABASE TABLE:  ", $wpdb->prefix, "options\n";

    echo "site_url:                ", site_url (), "\n";
    echo "home_url:                ", home_url (), "\n";
    if (is_multisite()) {
      echo "network_home_url:        ", network_home_url (), "\n";
    }
    echo "ABSPATH:                 ", ABSPATH, "\n";
    echo "WP_CONTENT_DIR:          ", WP_CONTENT_DIR, "\n";

    echo "\n";

    echo "PHP:                     ", phpversion(), "\n";
    echo "mbstring:                ", $ai_wp_data [AI_MBSTRING_LOADED] ? 'LOADED' : 'NO', "\n";
    echo "Default charset:         ", ini_get ("default_charset"), "\n";
    echo "Memory Limit:            ", ini_get ('memory_limit'), "\n";
    echo "Upload Max Filesize:     ", ini_get ('upload_max_filesize'), "\n";
    echo "Post Max Size:           ", ini_get ('post_max_size'), "\n";
    echo "Max Execution Time:      ", ini_get ('max_execution_time'), "\n";
    echo "Max Input Vars:          ", ini_get ('max_input_vars'), "\n";
    echo "Display Errors:          ", ini_get ('display_errors'), "\n";
    echo "cURL:                    ", function_exists ('curl_version') ? 'ENABLED' : 'DISABLED', "\n";
    echo "fsockopen:               ", function_exists ('fsockopen') ? 'ENABLED' : 'DISABLED', "\n";
    echo "DOMDocument:             ", class_exists ('DOMDocument') ? 'YES' : 'NO', "\n";
    echo "\n\n";

    global $wp_version;
    echo "Wordpress:               ", $wp_version, "\n";
    $current_theme = wp_get_theme();

    echo "Current Theme:           ", $current_theme->get ('Name') . " " . $current_theme->get ('Version'), "\n";
    echo "\n";
    echo "A INSTALLED PLUGINS\n";
    echo "======================================\n";

    if ( ! function_exists( 'get_plugins' ) ) {
      require_once ABSPATH . 'wp-admin/includes/plugin.php';
    }
    $all_plugins = get_plugins();
    $active_plugins = get_option ('active_plugins');
    $active_sitewide_plugins = is_multisite () ? get_site_option ('active_sitewide_plugins') : false;

    foreach ($all_plugins as $plugin_path => $plugin) {
      $multisite_status = '  ';
      if ($active_sitewide_plugins !== false) {
        $multisite_status = array_key_exists  ($plugin_path, $active_sitewide_plugins) ? '# ' : '  ';
      }
      echo in_array ($plugin_path, $active_plugins) ? '* ' : $multisite_status, html_entity_decode ($plugin ["Name"]), ' ', $plugin ["Version"], "\n";
    }
  }

  $log = ob_get_clean ();

  $log = str_replace (array ('<', '>'), array ('&lt;', '&gt;'), $log);
  echo $log;
}

function ai_shutdown_hook () {
  global $ai_wp_data, $ad_inserter_globals;

  $global_name = implode ('_', array (
    'AI',
    'STATUS')
  );

  if (function_exists ('ai_system_output')) ai_system_output ();

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0 && (get_remote_debugging () || (isset ($ad_inserter_globals [$global_name]) && $ad_inserter_globals [$global_name] == 1) || ($ai_wp_data [AI_WP_USER] & AI_USER_LOGGED_IN) != 0)) {
    if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_HOMEPAGE ||
        $ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_STATIC ||
        $ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_POST ||
        $ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_CATEGORY ||
        $ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_SEARCH ||
        $ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_ARCHIVE ||
        $ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_404 ||
        $ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_NONE ||
        $ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_ANY) {
      echo "\n<!--\n\n";
      ai_write_debug_info (true);
      echo "\n-->\n";
    }
  }
}

function ai_activation_hook () {
  ai_add_rewrite_rules ();
  flush_rewrite_rules();
}

function ai_deactivation_hook () {
  flush_rewrite_rules();
}


function ai_check_multisite_options (&$multisite_options) {
  if (!isset ($multisite_options ['MULTISITE_SETTINGS_PAGE']))      $multisite_options ['MULTISITE_SETTINGS_PAGE']      = DEFAULT_MULTISITE_SETTINGS_PAGE;
  if (!isset ($multisite_options ['MULTISITE_WIDGETS']))            $multisite_options ['MULTISITE_WIDGETS']            = DEFAULT_MULTISITE_WIDGETS;
  if (!isset ($multisite_options ['MULTISITE_PHP_PROCESSING']))     $multisite_options ['MULTISITE_PHP_PROCESSING']     = DEFAULT_MULTISITE_PHP_PROCESSING;
  if (!isset ($multisite_options ['MULTISITE_EXCEPTIONS']))         $multisite_options ['MULTISITE_EXCEPTIONS']         = DEFAULT_MULTISITE_EXCEPTIONS;
  if (!isset ($multisite_options ['MULTISITE_MAIN_FOR_ALL_BLOGS'])) $multisite_options ['MULTISITE_MAIN_FOR_ALL_BLOGS'] = DEFAULT_MULTISITE_MAIN_FOR_ALL_BLOGS;
  if (!isset ($multisite_options ['MULTISITE_SITE_ADMIN_PAGE']))    $multisite_options ['MULTISITE_SITE_ADMIN_PAGE']    = DEFAULT_MULTISITE_SITE_ADMIN_PAGE;

  if (function_exists ('ai_check_multisite_options_2')) ai_check_multisite_options_2 ($multisite_options);
}

function ai_check_limits ($value, $min, $max, $default) {
  if (!is_numeric ($value)) {
    $value = $default;
  }
  $value = intval ($value);
  if ($value < $min) {
    $value = $min;
  }
  if ($value > $max) {
    $value = $max;
  }
  return $value;
}

function ai_check_plugin_options ($plugin_options = array ()) {
  global $version_string;

  $plugin_options ['VERSION'] = $version_string;

  if (!isset ($plugin_options ['SYNTAX_HIGHLIGHTER_THEME']))      $plugin_options ['SYNTAX_HIGHLIGHTER_THEME']      = DEFAULT_SYNTAX_HIGHLIGHTER_THEME;

  if (!isset ($plugin_options ['BLOCK_CLASS_NAME']))              $plugin_options ['BLOCK_CLASS_NAME']              = DEFAULT_BLOCK_CLASS_NAME;
  if (!isset ($plugin_options ['BLOCK_CLASS']))                   $plugin_options ['BLOCK_CLASS']                   = DEFAULT_BLOCK_CLASS;
  if (!isset ($plugin_options ['BLOCK_NUMBER_CLASS']))            $plugin_options ['BLOCK_NUMBER_CLASS']            = DEFAULT_BLOCK_NUMBER_CLASS;
  if (!isset ($plugin_options ['BLOCK_NAME_CLASS']))              $plugin_options ['BLOCK_NAME_CLASS']              = DEFAULT_BLOCK_NAME_CLASS;
  if (!isset ($plugin_options ['INLINE_STYLES']))                 $plugin_options ['INLINE_STYLES']                 = DEFAULT_INLINE_STYLES;

  if (!isset ($plugin_options ['MINIMUM_USER_ROLE']))             $plugin_options ['MINIMUM_USER_ROLE']             = DEFAULT_MINIMUM_USER_ROLE;

  if (!isset ($plugin_options ['STICKY_WIDGET_MODE']))            $plugin_options ['STICKY_WIDGET_MODE']            = DEFAULT_STICKY_WIDGET_MODE;

  if (!isset ($plugin_options ['STICKY_WIDGET_MARGIN']))          $plugin_options ['STICKY_WIDGET_MARGIN']          = DEFAULT_STICKY_WIDGET_MARGIN;
  $plugin_options ['STICKY_WIDGET_MARGIN'] =                      ai_check_limits ($plugin_options ['STICKY_WIDGET_MARGIN'], 0, 999, DEFAULT_STICKY_WIDGET_MARGIN);

  if (!isset ($plugin_options ['LAZY_LOADING_OFFSET']))           $plugin_options ['LAZY_LOADING_OFFSET']           = DEFAULT_LAZY_LOADING_OFFSET;
  $plugin_options ['LAZY_LOADING_OFFSET'] =                       ai_check_limits ($plugin_options ['LAZY_LOADING_OFFSET'], 0, 9999, DEFAULT_LAZY_LOADING_OFFSET);

  if (!isset ($plugin_options ['MAX_PAGE_BLOCKS']))               $plugin_options ['MAX_PAGE_BLOCKS']               = DEFAULT_MAX_PAGE_BLOCKS;
  $plugin_options ['MAX_PAGE_BLOCKS'] =                           ai_check_limits ($plugin_options ['MAX_PAGE_BLOCKS'], 0, 9999, DEFAULT_MAX_PAGE_BLOCKS);

  if (!isset ($plugin_options ['PLUGIN_PRIORITY']))               $plugin_options ['PLUGIN_PRIORITY']               = DEFAULT_PLUGIN_PRIORITY;
  $plugin_options ['PLUGIN_PRIORITY'] =                           ai_check_limits ($plugin_options ['PLUGIN_PRIORITY'], 0, 999999, DEFAULT_PLUGIN_PRIORITY);

  if (!isset ($plugin_options ['TAB_SETUP_DELAY']))               $plugin_options ['TAB_SETUP_DELAY']               = DEFAULT_TAB_SETUP_DELAY;
  $plugin_options ['TAB_SETUP_DELAY'] =                           ai_check_limits ($plugin_options ['TAB_SETUP_DELAY'], 0, 9999, DEFAULT_TAB_SETUP_DELAY);

  if (!isset ($plugin_options ['CLICK_FRAUD_PROTECTION']))        $plugin_options ['CLICK_FRAUD_PROTECTION']        = DEFAULT_CLICK_FRAUD_PROTECTION;
  if (!isset ($plugin_options ['CLICK_FRAUD_PROTECTION_TIME']))   $plugin_options ['CLICK_FRAUD_PROTECTION_TIME']   = DEFAULT_CLICK_FRAUD_PROTECTION_TIME;
  if (!isset ($plugin_options ['GLOBAL_VISITOR_LIMIT_CPT']))      $plugin_options ['GLOBAL_VISITOR_LIMIT_CPT']      = DEFAULT_GLOBAL_VISITOR_LIMIT_CPT;
  if (!isset ($plugin_options ['GLOBAL_VISITOR_LIMIT_TIME']))     $plugin_options ['GLOBAL_VISITOR_LIMIT_TIME']     = DEFAULT_GLOBAL_VISITOR_LIMIT_TIME;
  if (!isset ($plugin_options ['CFP_BLOCK_IP_ADDRESS']))          $plugin_options ['CFP_BLOCK_IP_ADDRESS']          = DEFAULT_CFP_BLOCK_IP_ADDRESS;
  if (!isset ($plugin_options ['DYNAMIC_BLOCKS']))                $plugin_options ['DYNAMIC_BLOCKS']                = DEFAULT_DYNAMIC_BLOCKS;
  if (!isset ($plugin_options ['PARAGRAPH_COUNTING_FUNCTIONS']))  $plugin_options ['PARAGRAPH_COUNTING_FUNCTIONS']  = DEFAULT_PARAGRAPH_COUNTING_FUNCTIONS;
  if (!isset ($plugin_options ['OUTPUT_BUFFERING']))              $plugin_options ['OUTPUT_BUFFERING']              = DEFAULT_OUTPUT_BUFFERING;
  if (!isset ($plugin_options ['DISABLE_CACHING']))               $plugin_options ['DISABLE_CACHING']               = DEFAULT_DISABLE_CACHING;
  if (!isset ($plugin_options ['WAIT_FOR_JQUERY']))               $plugin_options ['WAIT_FOR_JQUERY']               = DEFAULT_WAIT_FOR_JQUERY;
  if (!isset ($plugin_options ['NO_PARAGRAPH_COUNTING_INSIDE']))  $plugin_options ['NO_PARAGRAPH_COUNTING_INSIDE']  = DEFAULT_NO_PARAGRAPH_COUNTING_INSIDE;
  if (!isset ($plugin_options ['AD_LABEL']))                      $plugin_options ['AD_LABEL']                      = DEFAULT_AD_TITLE;
  if (!isset ($plugin_options ['MAIN_CONTENT_ELEMENT']))          $plugin_options ['MAIN_CONTENT_ELEMENT']          = DEFAULT_MAIN_CONTENT_ELEMENT;
  if (!isset ($plugin_options ['ADB_DEVICES']))                   $plugin_options ['ADB_DEVICES']                   = AI_DEFAULT_ADB_DEVICES;
  if (!isset ($plugin_options ['ADB_ACTION']))                    $plugin_options ['ADB_ACTION']                    = AI_DEFAULT_ADB_ACTION;
  if (!isset ($plugin_options ['ADB_NO_ACTION']))                 $plugin_options ['ADB_NO_ACTION']                 = AI_DEFAULT_ADB_NO_ACTION;
  if (!isset ($plugin_options ['ADB_DELAY_ACTION']))              $plugin_options ['ADB_DELAY_ACTION']              = '';
  if (!isset ($plugin_options ['ADB_NO_ACTION_PERIOD']))          $plugin_options ['ADB_NO_ACTION_PERIOD']          = AI_DEFAULT_ADB_NO_ACTION_PERIOD;
  if (!isset ($plugin_options ['ADB_SELECTORS']))                 $plugin_options ['ADB_SELECTORS']                 = '';
  if (!isset ($plugin_options ['ADB_REDIRECTION_PAGE']))          $plugin_options ['ADB_REDIRECTION_PAGE']          = AI_DEFAULT_ADB_REDIRECTION_PAGE;
  if (!isset ($plugin_options ['ADB_CUSTOM_REDIRECTION_URL']))    $plugin_options ['ADB_CUSTOM_REDIRECTION_URL']    = '';
  if (!isset ($plugin_options ['ADB_OVERLAY_CSS']))               $plugin_options ['ADB_OVERLAY_CSS']               = AI_DEFAULT_ADB_OVERLAY_CSS;
  if (!isset ($plugin_options ['ADB_MESSAGE_CSS']))               $plugin_options ['ADB_MESSAGE_CSS']               = AI_DEFAULT_ADB_MESSAGE_CSS;
  if (!isset ($plugin_options ['ADB_UNDISMISSIBLE_MESSAGE']))     $plugin_options ['ADB_UNDISMISSIBLE_MESSAGE']     = AI_DEFAULT_ADB_UNDISMISSIBLE_MESSAGE;
  if (!isset ($plugin_options ['ADB_EXTERNAL_SCRIPTS']))          $plugin_options ['ADB_EXTERNAL_SCRIPTS']          = AI_DEFAULT_ADB_EXTERNAL_SCRIPTS;
  if (!isset ($plugin_options ['ADB_NO_UNDISMISSIBLE_MESSAGE']))  $plugin_options ['ADB_NO_UNDISMISSIBLE_MESSAGE']  = AI_DEFAULT_ADB_NO_UNDISMISSIBLE_MESSAGE;
  if (!isset ($plugin_options ['ADMIN_TOOLBAR_DEBUGGING']))       $plugin_options ['ADMIN_TOOLBAR_DEBUGGING']       = DEFAULT_ADMIN_TOOLBAR_DEBUGGING;
  if (!isset ($plugin_options ['ADMIN_TOOLBAR_MOBILE']))          $plugin_options ['ADMIN_TOOLBAR_MOBILE']          = DEFAULT_ADMIN_TOOLBAR_MOBILE;
  if (!isset ($plugin_options ['FORCE_ADMIN_TOOLBAR']))           $plugin_options ['FORCE_ADMIN_TOOLBAR']           = DEFAULT_FORCE_ADMIN_TOOLBAR;
  if (!isset ($plugin_options ['REMOTE_DEBUGGING']))              $plugin_options ['REMOTE_DEBUGGING']              = DEFAULT_REMOTE_DEBUGGING;
  if (!isset ($plugin_options ['DISABLE_TRANSLATION']))           $plugin_options ['DISABLE_TRANSLATION']           = DEFAULT_DISABLE_TRANSLATION;
  if (!isset ($plugin_options ['BACKEND_JS_DEBUGGING']))          $plugin_options ['BACKEND_JS_DEBUGGING']          = DEFAULT_BACKEND_JS_DEBUGGING;
  if (!isset ($plugin_options ['FRONTEND_JS_DEBUGGING']))         $plugin_options ['FRONTEND_JS_DEBUGGING']         = DEFAULT_FRONTEND_JS_DEBUGGING;
  if (!isset ($plugin_options ['DISABLE_BLOCK_INSERTIONS']))      $plugin_options ['DISABLE_BLOCK_INSERTIONS']      = DEFAULT_DISABLE_BLOCK_INSERTIONS;
  if (!isset ($plugin_options ['DISABLE_PHP_PROCESSING']))        $plugin_options ['DISABLE_PHP_PROCESSING']        = DEFAULT_DISABLE_PHP_PROCESSING;
  if (!isset ($plugin_options ['DISABLE_HTML_CODE']))             $plugin_options ['DISABLE_HTML_CODE']             = DEFAULT_DISABLE_HTML_CODE;
  if (!isset ($plugin_options ['DISABLE_CSS_CODE']))              $plugin_options ['DISABLE_CSS_CODE']              = DEFAULT_DISABLE_CSS_CODE;
  if (!isset ($plugin_options ['DISABLE_JS_CODE']))               $plugin_options ['DISABLE_JS_CODE']               = DEFAULT_DISABLE_JS_CODE;
  if (!isset ($plugin_options ['DISABLE_HEADER_CODE']))           $plugin_options ['DISABLE_HEADER_CODE']           = DEFAULT_DISABLE_HEADER_CODE;
  if (!isset ($plugin_options ['DISABLE_FOOTER_CODE']))           $plugin_options ['DISABLE_FOOTER_CODE']           = DEFAULT_DISABLE_FOOTER_CODE;

  $min_width_0_defined = false;
  for ($viewport = 1; $viewport <= 6; $viewport ++) {
    $viewport_name_option_name   = 'VIEWPORT_NAME_'  . $viewport;
    $viewport_width_option_name  = 'VIEWPORT_WIDTH_' . $viewport;

    if (!isset ($plugin_options [$viewport_name_option_name]))     $plugin_options [$viewport_name_option_name] =
      defined ("DEFAULT_VIEWPORT_NAME_" . $viewport) ? constant ("DEFAULT_VIEWPORT_NAME_" . $viewport) : "";

    if ($viewport == 1 && $plugin_options [$viewport_name_option_name] == '')
      $plugin_options [$viewport_name_option_name] = constant ("DEFAULT_VIEWPORT_NAME_1");

    if ($plugin_options [$viewport_name_option_name] != '') {
      $last_viewport_width_option_name = $viewport_width_option_name;

      if (!isset ($plugin_options [$viewport_width_option_name]))  $plugin_options [$viewport_width_option_name] =
        defined ("DEFAULT_VIEWPORT_WIDTH_" . $viewport) ? constant ("DEFAULT_VIEWPORT_WIDTH_" . $viewport) : 0;

      $viewport_width = $plugin_options [$viewport_width_option_name];

      if ($viewport > 1) {
        $previous_viewport_option_width = $plugin_options ['VIEWPORT_WIDTH_' . ($viewport - 1)];
      }

      if (!is_numeric ($viewport_width)) {
        if ($viewport == 1)
          $viewport_width = constant ("DEFAULT_VIEWPORT_WIDTH_1"); else
            $viewport_width = $previous_viewport_option_width - 1;

      }
      if ($viewport_width > 9999) {
        $viewport_width = 9999;
      }

//      if ($viewport > 1) {
//        if ($viewport_width >= $previous_viewport_option_width)
//          $viewport_width = $previous_viewport_option_width - 1;
//      }

      $viewport_width = intval ($viewport_width);
      if ($viewport_width < 0) {
        $viewport_width = 0;
      }

      if ($viewport_width == 0) {
        $min_width_0_defined = true;
      }

      $plugin_options [$viewport_width_option_name] = $viewport_width;
    } else $plugin_options [$viewport_width_option_name] = '';
  }
  if (!$min_width_0_defined) {
    $plugin_options [$last_viewport_width_option_name] = 0;
  }

  for ($hook = 1; $hook <= 20; $hook ++) {
    $hook_enabled_settins_name  = 'HOOK_ENABLED_' . $hook;
    $hook_name_settins_name     = 'HOOK_NAME_' . $hook;
    $hook_action_settins_name   = 'HOOK_ACTION_' . $hook;
    $hook_priority_settins_name = 'HOOK_PRIORITY_' . $hook;

    if (!isset ($plugin_options [$hook_enabled_settins_name]))  $plugin_options [$hook_enabled_settins_name] = AI_DISABLED;
    if (!isset ($plugin_options [$hook_name_settins_name]))     $plugin_options [$hook_name_settins_name] = '';
    if (!isset ($plugin_options [$hook_action_settins_name]))   $plugin_options [$hook_action_settins_name] = '';
    if (!isset ($plugin_options [$hook_priority_settins_name]) || !is_numeric ($plugin_options [$hook_priority_settins_name])) $plugin_options [$hook_priority_settins_name] = DEFAULT_CUSTOM_HOOK_PRIORITY;
  }

  if (function_exists ('ai_check_options')) ai_check_options ($plugin_options);

  return ($plugin_options);
}

function option_stripslashes (&$options) {
  $options = wp_unslash ($options);
}

// Deprecated
function ai_get_old_option ($option_name) {
  $options = get_option ($option_name);
  option_stripslashes ($options);
  return ($options);
}

function ai_get_option ($option_name, $default = false) {
  $ai_db_options = get_option ($option_name, $default);

  if ($ai_db_options === false) {
    return $ai_db_options;
  }

  if (is_string ($ai_db_options) && substr ($ai_db_options, 0, 4) === ':AI:') {
    $ai_db_options = unserialize (base64_decode (substr ($ai_db_options, 4), true));
  }

  return $ai_db_options;
}

function ai_update_option ($option_name, $value) {
  update_option ($option_name, ':AI:'. base64_encode (serialize ($value)));
}

function ai_save_options ($options, $multisite_options = null, $blocks_org = null, $blocks_new = null) {

  if (function_exists ('ai_save_remote_settings')) {
    if (ai_save_remote_settings ($options, $multisite_options, $blocks_org, $blocks_new)) return;
  }

  $options           = apply_filters ('ai_save_options',           $options);
  $multisite_options = apply_filters ('ai_save_multisite_options', $multisite_options);

  // Generate and save extract
  ai_update_option (AI_OPTION_NAME, $options);
  ai_load_settings ();

  $options [AI_OPTION_EXTRACT] = ai_generate_extract ($options);
  $ai_db_options_extract = $options [AI_OPTION_EXTRACT];

  $options [AI_OPTION_GLOBAL]['VIEWPORT_CSS']  = generate_viewport_css ();
  $options [AI_OPTION_GLOBAL]['ALIGNMENT_CSS'] = generate_alignment_css ();

  $options [AI_OPTION_GLOBAL]['TIMESTAMP'] = time ();

  if (!get_option (AI_INSTALL_NAME)) {
    update_option (AI_INSTALL_NAME, time ());
  }

  if (is_multisite () && !is_main_site ()) {
    unset ($options [AI_OPTION_GLOBAL]['PLUGIN_TYPE']);
    unset ($options [AI_OPTION_GLOBAL]['PLUGIN_STATUS']);
    unset ($options [AI_OPTION_GLOBAL]['PLUGIN_STATUS_COUNTER']);
  }

  ai_update_option (AI_OPTION_NAME, $options);

  update_option (AI_EXTRACT_NAME, $ai_db_options_extract);

  // Multisite
  if (is_array ($multisite_options) && is_multisite () && is_main_site ()) {
    update_site_option (AI_OPTION_NAME, $multisite_options);
  }

  ai_load_settings ();

  if (is_array ($blocks_org) && is_array ($blocks_new)) {
    ai_update_block_numbers ($blocks_org, $blocks_new);
  }
}

function ai_load_options () {
  global $ai_db_options, $ai_db_options_multisite, $ai_wp_data;

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) ai_log ("LOAD OPTIONS START");

  if (function_exists ('ai_load_remote_settings')) {
    if (ai_load_remote_settings ()) {
      if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) ai_log ("LOAD OPTIONS END");

      return;
    }
  }

  if (is_multisite ()) {
    $ai_db_options_multisite = get_site_option (AI_OPTION_NAME, array ());
    option_stripslashes ($ai_db_options_multisite);
  }

  if (is_multisite () && multisite_main_for_all_blogs () && defined ('BLOG_ID_CURRENT_SITE')) {
    $ai_db_options = get_blog_option (BLOG_ID_CURRENT_SITE, AI_OPTION_NAME, array ());

    if (is_string ($ai_db_options) && substr ($ai_db_options, 0, 4) === ':AI:') {
      $ai_db_options = unserialize (base64_decode (substr ($ai_db_options, 4), true));
    }

    option_stripslashes ($ai_db_options);
  } else {
      $ai_db_options = ai_get_option (AI_OPTION_NAME, array ());

      option_stripslashes ($ai_db_options);
    }

  if (is_multisite () && !is_main_site () && defined ('BLOG_ID_CURRENT_SITE')) {
    $ai_db_options_main = get_blog_option (BLOG_ID_CURRENT_SITE, AI_OPTION_NAME, array ());

    if (is_string ($ai_db_options_main) && substr ($ai_db_options_main, 0, 4) === ':AI:') {
      $ai_db_options_main = unserialize (base64_decode (substr ($ai_db_options_main, 4), true));
    }

    if (isset ($ai_db_options_main [AI_OPTION_GLOBAL]['PLUGIN_TYPE']))            $ai_db_options [AI_OPTION_GLOBAL]['PLUGIN_TYPE']            = $ai_db_options_main [AI_OPTION_GLOBAL]['PLUGIN_TYPE'];
    if (isset ($ai_db_options_main [AI_OPTION_GLOBAL]['PLUGIN_STATUS']))          $ai_db_options [AI_OPTION_GLOBAL]['PLUGIN_STATUS']          = $ai_db_options_main [AI_OPTION_GLOBAL]['PLUGIN_STATUS'];
    if (isset ($ai_db_options_main [AI_OPTION_GLOBAL]['PLUGIN_STATUS_COUNTER']))  $ai_db_options [AI_OPTION_GLOBAL]['PLUGIN_STATUS_COUNTER']  = $ai_db_options_main [AI_OPTION_GLOBAL]['PLUGIN_STATUS_COUNTER'];
  }

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) ai_log ("LOAD OPTIONS END");
}

function get_viewport_css () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['VIEWPORT_CSS'])) $ai_db_options [AI_OPTION_GLOBAL]['VIEWPORT_CSS'] = generate_viewport_css ();

  return ($ai_db_options [AI_OPTION_GLOBAL]['VIEWPORT_CSS']);
}

function get_alignment_css () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['ALIGNMENT_CSS']) ||
    isset ($ai_db_options [AI_OPTION_GLOBAL]['VERSION']) && $ai_db_options [AI_OPTION_GLOBAL]['VERSION'] < '020211'
  ) $ai_db_options [AI_OPTION_GLOBAL]['ALIGNMENT_CSS'] = generate_alignment_css ();

  return (str_replace ('&#039;', "'", $ai_db_options [AI_OPTION_GLOBAL]['ALIGNMENT_CSS']));
}

function get_syntax_highlighter_theme () {
  global $ai_db_options;

//  return 'ad-inserter';

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['SYNTAX_HIGHLIGHTER_THEME'])) $ai_db_options [AI_OPTION_GLOBAL]['SYNTAX_HIGHLIGHTER_THEME'] = DEFAULT_SYNTAX_HIGHLIGHTER_THEME;

  return ($ai_db_options [AI_OPTION_GLOBAL]['SYNTAX_HIGHLIGHTER_THEME']);
}

function get_block_class_name ($default_if_empty = false) {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['BLOCK_CLASS_NAME'])) $ai_db_options [AI_OPTION_GLOBAL]['BLOCK_CLASS_NAME'] = DEFAULT_BLOCK_CLASS_NAME;

  if ($default_if_empty && $ai_db_options [AI_OPTION_GLOBAL]['BLOCK_CLASS_NAME'] == '') return (DEFAULT_BLOCK_CLASS_NAME);

  return ($ai_db_options [AI_OPTION_GLOBAL]['BLOCK_CLASS_NAME']);
}

function get_block_class () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['BLOCK_CLASS'])) $ai_db_options [AI_OPTION_GLOBAL]['BLOCK_CLASS'] = DEFAULT_BLOCK_CLASS;

  return ($ai_db_options [AI_OPTION_GLOBAL]['BLOCK_CLASS']);
}

function get_block_number_class () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['BLOCK_NUMBER_CLASS'])) $ai_db_options [AI_OPTION_GLOBAL]['BLOCK_NUMBER_CLASS'] = DEFAULT_BLOCK_NUMBER_CLASS;

  return ($ai_db_options [AI_OPTION_GLOBAL]['BLOCK_NUMBER_CLASS']);
}

function get_block_name_class () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['BLOCK_NAME_CLASS'])) $ai_db_options [AI_OPTION_GLOBAL]['BLOCK_NAME_CLASS'] = DEFAULT_BLOCK_NAME_CLASS;

  return ($ai_db_options [AI_OPTION_GLOBAL]['BLOCK_NAME_CLASS']);
}

function get_inline_styles () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['INLINE_STYLES'])) $ai_db_options [AI_OPTION_GLOBAL]['INLINE_STYLES'] = DEFAULT_INLINE_STYLES;

  return ($ai_db_options [AI_OPTION_GLOBAL]['INLINE_STYLES']);
}

function get_minimum_user_role () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['MINIMUM_USER_ROLE'])) $ai_db_options [AI_OPTION_GLOBAL]['MINIMUM_USER_ROLE'] = DEFAULT_MINIMUM_USER_ROLE;

  return ($ai_db_options [AI_OPTION_GLOBAL]['MINIMUM_USER_ROLE']);
}

function get_sticky_widget_mode () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['STICKY_WIDGET_MODE'])) $ai_db_options [AI_OPTION_GLOBAL]['STICKY_WIDGET_MODE'] = DEFAULT_STICKY_WIDGET_MODE;

  return ($ai_db_options [AI_OPTION_GLOBAL]['STICKY_WIDGET_MODE']);
}

function get_sticky_widget_margin () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['STICKY_WIDGET_MARGIN'])) $ai_db_options [AI_OPTION_GLOBAL]['STICKY_WIDGET_MARGIN'] = DEFAULT_STICKY_WIDGET_MARGIN;

  return ($ai_db_options [AI_OPTION_GLOBAL]['STICKY_WIDGET_MARGIN']);
}

function get_lazy_loading_offset () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['LAZY_LOADING_OFFSET'])) $ai_db_options [AI_OPTION_GLOBAL]['LAZY_LOADING_OFFSET'] = DEFAULT_LAZY_LOADING_OFFSET;

  return ($ai_db_options [AI_OPTION_GLOBAL]['LAZY_LOADING_OFFSET']);
}

function get_click_fraud_protection () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['CLICK_FRAUD_PROTECTION'])) $ai_db_options [AI_OPTION_GLOBAL]['CLICK_FRAUD_PROTECTION'] = DEFAULT_CLICK_FRAUD_PROTECTION;

  return ($ai_db_options [AI_OPTION_GLOBAL]['CLICK_FRAUD_PROTECTION']);
}

function get_click_fraud_protection_time () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['CLICK_FRAUD_PROTECTION_TIME'])) $ai_db_options [AI_OPTION_GLOBAL]['CLICK_FRAUD_PROTECTION_TIME'] = DEFAULT_CLICK_FRAUD_PROTECTION_TIME;

  return ($ai_db_options [AI_OPTION_GLOBAL]['CLICK_FRAUD_PROTECTION_TIME']);
}

function get_global_visitor_limit_clicks_per_time_period () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['GLOBAL_VISITOR_LIMIT_CPT'])) $ai_db_options [AI_OPTION_GLOBAL]['GLOBAL_VISITOR_LIMIT_CPT'] = DEFAULT_GLOBAL_VISITOR_LIMIT_CPT;

  $option = $ai_db_options [AI_OPTION_GLOBAL]['GLOBAL_VISITOR_LIMIT_CPT'];
  if ($option == '0') $option = '';

  return ($option);
}

function get_global_visitor_limit_clicks_time_period () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['GLOBAL_VISITOR_LIMIT_TIME'])) $ai_db_options [AI_OPTION_GLOBAL]['GLOBAL_VISITOR_LIMIT_TIME'] = DEFAULT_GLOBAL_VISITOR_LIMIT_TIME;

  $option = $ai_db_options [AI_OPTION_GLOBAL]['GLOBAL_VISITOR_LIMIT_TIME'];
  if ($option == '0') $option = '';

  return ($option);
}

function get_cfp_block_ip_address () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['CFP_BLOCK_IP_ADDRESS'])) $ai_db_options [AI_OPTION_GLOBAL]['CFP_BLOCK_IP_ADDRESS'] = DEFAULT_CFP_BLOCK_IP_ADDRESS;

  return ($ai_db_options [AI_OPTION_GLOBAL]['CFP_BLOCK_IP_ADDRESS']);
}

function get_max_page_blocks () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['MAX_PAGE_BLOCKS'])) $ai_db_options [AI_OPTION_GLOBAL]['MAX_PAGE_BLOCKS'] = DEFAULT_MAX_PAGE_BLOCKS;

  return ($ai_db_options [AI_OPTION_GLOBAL]['MAX_PAGE_BLOCKS']);
}

function get_plugin_priority () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['PLUGIN_PRIORITY'])) $ai_db_options [AI_OPTION_GLOBAL]['PLUGIN_PRIORITY'] = DEFAULT_PLUGIN_PRIORITY;

  return ($ai_db_options [AI_OPTION_GLOBAL]['PLUGIN_PRIORITY']);
}

function get_tab_setup_delay () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['TAB_SETUP_DELAY'])) $ai_db_options [AI_OPTION_GLOBAL]['TAB_SETUP_DELAY'] = DEFAULT_TAB_SETUP_DELAY;

  return ($ai_db_options [AI_OPTION_GLOBAL]['TAB_SETUP_DELAY']);
}

function get_dynamic_blocks(){
  global $ai_db_options, $ai_wp_data;

  if (isset ($ai_wp_data [AI_DYNAMIC_BLOCKS])) {
    return ($ai_wp_data [AI_DYNAMIC_BLOCKS]);
  }

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['DYNAMIC_BLOCKS'])) $ai_db_options [AI_OPTION_GLOBAL]['DYNAMIC_BLOCKS'] = DEFAULT_DYNAMIC_BLOCKS;

  return ($ai_db_options [AI_OPTION_GLOBAL]['DYNAMIC_BLOCKS']);
}

function get_paragraph_counting_functions(){
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['PARAGRAPH_COUNTING_FUNCTIONS'])) $ai_db_options [AI_OPTION_GLOBAL]['PARAGRAPH_COUNTING_FUNCTIONS'] = DEFAULT_PARAGRAPH_COUNTING_FUNCTIONS;

  return ($ai_db_options [AI_OPTION_GLOBAL]['PARAGRAPH_COUNTING_FUNCTIONS']);
}

function get_output_buffering(){
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['OUTPUT_BUFFERING'])) $ai_db_options [AI_OPTION_GLOBAL]['OUTPUT_BUFFERING'] = DEFAULT_OUTPUT_BUFFERING;

  return ($ai_db_options [AI_OPTION_GLOBAL]['OUTPUT_BUFFERING']);
}

function get_disable_caching (){
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['DISABLE_CACHING'])) $ai_db_options [AI_OPTION_GLOBAL]['DISABLE_CACHING'] = DEFAULT_DISABLE_CACHING;

  return ($ai_db_options [AI_OPTION_GLOBAL]['DISABLE_CACHING']);
}

function get_wait_for_jquery (){
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['WAIT_FOR_JQUERY'])) $ai_db_options [AI_OPTION_GLOBAL]['WAIT_FOR_JQUERY'] = DEFAULT_WAIT_FOR_JQUERY;

  return ($ai_db_options [AI_OPTION_GLOBAL]['WAIT_FOR_JQUERY']);
}

function get_no_paragraph_counting_inside () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['NO_PARAGRAPH_COUNTING_INSIDE'])) $ai_db_options [AI_OPTION_GLOBAL]['NO_PARAGRAPH_COUNTING_INSIDE'] = DEFAULT_NO_PARAGRAPH_COUNTING_INSIDE;

  return (str_replace (array ('<', '>'), '', $ai_db_options [AI_OPTION_GLOBAL]['NO_PARAGRAPH_COUNTING_INSIDE']));
}

function get_ad_label ($decode = false) {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['AD_LABEL'])) $ai_db_options [AI_OPTION_GLOBAL]['AD_LABEL'] = DEFAULT_AD_TITLE;

  if ($decode) return (html_entity_decode ($ai_db_options [AI_OPTION_GLOBAL]['AD_LABEL']));

  return ($ai_db_options [AI_OPTION_GLOBAL]['AD_LABEL']);
}

function get_main_content_element () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['MAIN_CONTENT_ELEMENT'])) $ai_db_options [AI_OPTION_GLOBAL]['MAIN_CONTENT_ELEMENT'] = DEFAULT_MAIN_CONTENT_ELEMENT;

  return ($ai_db_options [AI_OPTION_GLOBAL]['MAIN_CONTENT_ELEMENT']);
}

function get_force_admin_toolbar () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['FORCE_ADMIN_TOOLBAR'])) $ai_db_options [AI_OPTION_GLOBAL]['FORCE_ADMIN_TOOLBAR'] = DEFAULT_FORCE_ADMIN_TOOLBAR;

  return ($ai_db_options [AI_OPTION_GLOBAL]['FORCE_ADMIN_TOOLBAR']);
}

function get_admin_toolbar_debugging () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['ADMIN_TOOLBAR_DEBUGGING'])) $ai_db_options [AI_OPTION_GLOBAL]['ADMIN_TOOLBAR_DEBUGGING'] = DEFAULT_ADMIN_TOOLBAR_DEBUGGING;

  return ($ai_db_options [AI_OPTION_GLOBAL]['ADMIN_TOOLBAR_DEBUGGING']);
}

function get_admin_toolbar_mobile () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['ADMIN_TOOLBAR_MOBILE'])) $ai_db_options [AI_OPTION_GLOBAL]['ADMIN_TOOLBAR_MOBILE'] = DEFAULT_ADMIN_TOOLBAR_MOBILE;

  return ($ai_db_options [AI_OPTION_GLOBAL]['ADMIN_TOOLBAR_MOBILE']);
}

function get_remote_debugging () {
  global $ai_db_options;

  if (function_exists ('ai_remote_debugging')) return ai_remote_debugging ();

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['REMOTE_DEBUGGING'])) $ai_db_options [AI_OPTION_GLOBAL]['REMOTE_DEBUGGING'] = DEFAULT_REMOTE_DEBUGGING;

  return ($ai_db_options [AI_OPTION_GLOBAL]['REMOTE_DEBUGGING']);
}

function get_disable_translation () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['DISABLE_TRANSLATION'])) $ai_db_options [AI_OPTION_GLOBAL]['DISABLE_TRANSLATION'] = DEFAULT_DISABLE_TRANSLATION;

  return ($ai_db_options [AI_OPTION_GLOBAL]['DISABLE_TRANSLATION']);
}

function get_backend_javascript_debugging () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['BACKEND_JS_DEBUGGING'])) $ai_db_options [AI_OPTION_GLOBAL]['BACKEND_JS_DEBUGGING'] = DEFAULT_BACKEND_JS_DEBUGGING;

  return ($ai_db_options [AI_OPTION_GLOBAL]['BACKEND_JS_DEBUGGING']);
}

function get_frontend_javascript_debugging () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['FRONTEND_JS_DEBUGGING'])) $ai_db_options [AI_OPTION_GLOBAL]['FRONTEND_JS_DEBUGGING'] = DEFAULT_FRONTEND_JS_DEBUGGING;

  return ($ai_db_options [AI_OPTION_GLOBAL]['FRONTEND_JS_DEBUGGING']);
}

function get_disable_block_insertions () {
  global $ai_db_options;

  if (isset ($_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS]) && $_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS] == 'all' && get_remote_debugging ()) return true;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['DISABLE_BLOCK_INSERTIONS'])) $ai_db_options [AI_OPTION_GLOBAL]['DISABLE_BLOCK_INSERTIONS'] = DEFAULT_DISABLE_BLOCK_INSERTIONS;

  return ($ai_db_options [AI_OPTION_GLOBAL]['DISABLE_BLOCK_INSERTIONS']);
}

function get_disable_php_processing () {
  global $ai_db_options;

  if (isset ($_GET [AI_URL_DEBUG_DISABLE_PHP_PROCESSING]) && $_GET [AI_URL_DEBUG_DISABLE_PHP_PROCESSING] && get_remote_debugging ()) return true;

  if (isset ($_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS]) && get_remote_debugging ()) {
    if ($_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS] == 'php') return true;
    if (strpos ($_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS], '-') !== false) {
      $blocks = explode ('-', $_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS]);
      if (in_array ('php', $blocks)) return true;
    }
  }

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['DISABLE_PHP_PROCESSING'])) $ai_db_options [AI_OPTION_GLOBAL]['DISABLE_PHP_PROCESSING'] = DEFAULT_DISABLE_PHP_PROCESSING;

  return ($ai_db_options [AI_OPTION_GLOBAL]['DISABLE_PHP_PROCESSING']);
}

function get_disable_html_code () {
  global $ai_db_options;

  if (isset ($_GET [AI_URL_DEBUG_DISABLE_HTML_CODE]) && $_GET [AI_URL_DEBUG_DISABLE_HTML_CODE] && get_remote_debugging ()) return true;

  if (isset ($_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS]) && get_remote_debugging ()) {
    if ($_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS] == 'html') return true;
    if (strpos ($_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS], '-') !== false) {
      $blocks = explode ('-', $_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS]);
      if (in_array ('html', $blocks)) return true;
    }
  }

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['DISABLE_HTML_CODE'])) $ai_db_options [AI_OPTION_GLOBAL]['DISABLE_HTML_CODE'] = DEFAULT_DISABLE_CSS_CODE;

  return ($ai_db_options [AI_OPTION_GLOBAL]['DISABLE_HTML_CODE']);
}

function get_disable_css_code () {
  global $ai_db_options;

  if (isset ($_GET [AI_URL_DEBUG_DISABLE_CSS_CODE]) && $_GET [AI_URL_DEBUG_DISABLE_CSS_CODE] && get_remote_debugging ()) return true;

  if (isset ($_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS]) && get_remote_debugging ()) {
    if ($_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS] == 'css') return true;
    if (strpos ($_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS], '-') !== false) {
      $blocks = explode ('-', $_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS]);
      if (in_array ('css', $blocks)) return true;
    }
  }

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['DISABLE_CSS_CODE'])) $ai_db_options [AI_OPTION_GLOBAL]['DISABLE_CSS_CODE'] = DEFAULT_DISABLE_CSS_CODE;

  return ($ai_db_options [AI_OPTION_GLOBAL]['DISABLE_CSS_CODE']);
}

function get_disable_js_code () {
  global $ai_db_options;

  if (isset ($_GET [AI_URL_DEBUG_DISABLE_JS_CODE]) && $_GET [AI_URL_DEBUG_DISABLE_JS_CODE] && get_remote_debugging ()) return true;

  if (isset ($_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS]) && get_remote_debugging ()) {
    if ($_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS] == 'js') return true;
    if (strpos ($_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS], '-') !== false) {
      $blocks = explode ('-', $_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS]);
      if (in_array ('js', $blocks)) return true;
    }
  }

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['DISABLE_JS_CODE'])) $ai_db_options [AI_OPTION_GLOBAL]['DISABLE_JS_CODE'] = DEFAULT_DISABLE_JS_CODE;

  return ($ai_db_options [AI_OPTION_GLOBAL]['DISABLE_JS_CODE']);
}

function get_disable_header_code () {
  global $ai_db_options;

  if (isset ($_GET [AI_URL_DEBUG_DISABLE_HEADER_CODE]) && $_GET [AI_URL_DEBUG_DISABLE_HEADER_CODE] && get_remote_debugging ()) return true;

  if (isset ($_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS]) && get_remote_debugging ()) {
    if ($_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS] == 'h') return true;
    if (strpos ($_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS], '-') !== false) {
      $blocks = explode ('-', $_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS]);
      if (in_array ('h', $blocks)) return true;
    }
  }

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['DISABLE_HEADER_CODE'])) $ai_db_options [AI_OPTION_GLOBAL]['DISABLE_HEADER_CODE'] = DEFAULT_DISABLE_HEADER_CODE;

  return ($ai_db_options [AI_OPTION_GLOBAL]['DISABLE_HEADER_CODE']);
}

function get_disable_footer_code () {
  global $ai_db_options;

  if (isset ($_GET [AI_URL_DEBUG_DISABLE_FOOTER_CODE]) && $_GET [AI_URL_DEBUG_DISABLE_FOOTER_CODE] && get_remote_debugging ()) return true;

  if (isset ($_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS]) && get_remote_debugging ()) {
    if ($_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS] == 'f') return true;
    if (strpos ($_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS], '-') !== false) {
      $blocks = explode ('-', $_GET [AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS]);
      if (in_array ('f', $blocks)) return true;
    }
  }

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['DISABLE_FOOTER_CODE'])) $ai_db_options [AI_OPTION_GLOBAL]['DISABLE_FOOTER_CODE'] = DEFAULT_DISABLE_FOOTER_CODE;

  return ($ai_db_options [AI_OPTION_GLOBAL]['DISABLE_FOOTER_CODE']);
}

function get_blocks_sticky () {
  if (!function_exists ('ai_block_list_buttons')) return false;

  $current_flags = get_option (AI_FLAGS_NAME, 0);
  return (($current_flags & AD_FLAGS_BLOCKS_STICKY) != 0);
}

function get_viewport_name ($viewport_number) {
  global $ai_db_options;

  $viewport_settins_name = 'VIEWPORT_NAME_' . $viewport_number;
  if (!isset ($ai_db_options [AI_OPTION_GLOBAL][$viewport_settins_name]))
    $ai_db_options [AI_OPTION_GLOBAL][$viewport_settins_name] = defined ("DEFAULT_VIEWPORT_NAME_" . $viewport_number) ? constant ("DEFAULT_VIEWPORT_NAME_" . $viewport_number) : "";

  return ($ai_db_options [AI_OPTION_GLOBAL][$viewport_settins_name]);
}

function get_viewport_width ($viewport_number) {
  global $ai_db_options;

  $viewport_settins_name = 'VIEWPORT_WIDTH_' . $viewport_number;
  if (!isset ($ai_db_options [AI_OPTION_GLOBAL][$viewport_settins_name]))
    $ai_db_options [AI_OPTION_GLOBAL][$viewport_settins_name] = defined ("DEFAULT_VIEWPORT_WIDTH_" . $viewport_number) ? constant ("DEFAULT_VIEWPORT_WIDTH_" . $viewport_number) : "";

  return ($ai_db_options [AI_OPTION_GLOBAL][$viewport_settins_name]);
}

function get_hook_enabled ($hook_number) {
  global $ai_db_options;

  $hook_settins_name = 'HOOK_ENABLED_' . $hook_number;
  if (!isset ($ai_db_options [AI_OPTION_GLOBAL][$hook_settins_name])) $ai_db_options [AI_OPTION_GLOBAL][$hook_settins_name] = AI_DISABLED;

  return ($ai_db_options [AI_OPTION_GLOBAL][$hook_settins_name]);
}

function get_hook_name ($hook_number) {
  global $ai_db_options;

  $hook_settins_name = 'HOOK_NAME_' . $hook_number;
  if (!isset ($ai_db_options [AI_OPTION_GLOBAL][$hook_settins_name])) $ai_db_options [AI_OPTION_GLOBAL][$hook_settins_name] = "";

  return ($ai_db_options [AI_OPTION_GLOBAL][$hook_settins_name]);
}

function get_hook_action ($hook_number) {
  global $ai_db_options;

  $hook_settins_name = 'HOOK_ACTION_' . $hook_number;
  if (!isset ($ai_db_options [AI_OPTION_GLOBAL][$hook_settins_name])) $ai_db_options [AI_OPTION_GLOBAL][$hook_settins_name] = "";

  return ($ai_db_options [AI_OPTION_GLOBAL][$hook_settins_name]);
}

function get_hook_priority ($hook_number) {
  global $ai_db_options;

  $hook_settins_name = 'HOOK_PRIORITY_' . $hook_number;
  if (!isset ($ai_db_options [AI_OPTION_GLOBAL][$hook_settins_name])) $ai_db_options [AI_OPTION_GLOBAL][$hook_settins_name] = DEFAULT_CUSTOM_HOOK_PRIORITY;

  return ($ai_db_options [AI_OPTION_GLOBAL][$hook_settins_name]);
}

function get_country_group_name ($group_number) {
  global $ai_db_options;

  $country_group_settins_name = 'COUNTRY_GROUP_NAME_' . $group_number;
  if (!isset ($ai_db_options [AI_OPTION_GLOBAL][$country_group_settins_name])) $ai_db_options [AI_OPTION_GLOBAL][$country_group_settins_name] = DEFAULT_COUNTRY_GROUP_NAME . ' ' . $group_number;

  return ($ai_db_options [AI_OPTION_GLOBAL][$country_group_settins_name]);
}

function get_group_country_list ($group_number) {
  global $ai_db_options;

  $group_countries_settins_name = 'GROUP_COUNTRIES_' . $group_number;
  if (!isset ($ai_db_options [AI_OPTION_GLOBAL][$group_countries_settins_name])) $ai_db_options [AI_OPTION_GLOBAL][$group_countries_settins_name] = '';

  return ($ai_db_options [AI_OPTION_GLOBAL][$group_countries_settins_name]);
}

function multisite_settings_page_enabled () {
  global $ai_db_options_multisite;

  if (ai_remote ('multisite', is_multisite ())) {
    if (!isset ($ai_db_options_multisite ['MULTISITE_SETTINGS_PAGE'])) $ai_db_options_multisite ['MULTISITE_SETTINGS_PAGE'] = DEFAULT_MULTISITE_SETTINGS_PAGE;
    if ($ai_db_options_multisite ['MULTISITE_SETTINGS_PAGE'] == '')    $ai_db_options_multisite ['MULTISITE_SETTINGS_PAGE'] = DEFAULT_MULTISITE_SETTINGS_PAGE;

    if (multisite_main_for_all_blogs ()) $ai_db_options_multisite ['MULTISITE_SETTINGS_PAGE'] = AI_DISABLED;
    elseif (current_user_can ('manage_network_plugins')) $ai_db_options_multisite ['MULTISITE_SETTINGS_PAGE'] = AI_ENABLED;

    return ($ai_db_options_multisite ['MULTISITE_SETTINGS_PAGE']);
  }

  return DEFAULT_MULTISITE_SETTINGS_PAGE;
}

function multisite_widgets_enabled () {
  global $ai_db_options_multisite;

  if (ai_remote ('multisite', is_multisite ())) {
    if (!isset ($ai_db_options_multisite ['MULTISITE_WIDGETS'])) $ai_db_options_multisite ['MULTISITE_WIDGETS'] = DEFAULT_MULTISITE_WIDGETS;
    if ($ai_db_options_multisite ['MULTISITE_WIDGETS'] == '')    $ai_db_options_multisite ['MULTISITE_WIDGETS'] = DEFAULT_MULTISITE_WIDGETS;

    return ($ai_db_options_multisite ['MULTISITE_WIDGETS']);
  }

  return DEFAULT_MULTISITE_WIDGETS;
}

function multisite_php_processing () {
  global $ai_db_options_multisite;

  if (ai_remote ('multisite', is_multisite ())) {
    if (function_exists ('ai_filter_multisite_settings')) {
      if (!isset ($ai_db_options_multisite ['MULTISITE_PHP_PROCESSING'])) $ai_db_options_multisite ['MULTISITE_PHP_PROCESSING'] = DEFAULT_MULTISITE_PHP_PROCESSING;
      if ($ai_db_options_multisite ['MULTISITE_PHP_PROCESSING'] == '')    $ai_db_options_multisite ['MULTISITE_PHP_PROCESSING'] = DEFAULT_MULTISITE_PHP_PROCESSING;

      return ($ai_db_options_multisite ['MULTISITE_PHP_PROCESSING']);
    }

    return AI_ENABLED;
  }

  return DEFAULT_MULTISITE_PHP_PROCESSING;
}

function multisite_exceptions_enabled () {
  global $ai_db_options_multisite;

  if (ai_remote ('multisite', is_multisite ())) {
    if (!isset ($ai_db_options_multisite ['MULTISITE_EXCEPTIONS'])) $ai_db_options_multisite ['MULTISITE_EXCEPTIONS'] = DEFAULT_MULTISITE_EXCEPTIONS;
    if ($ai_db_options_multisite ['MULTISITE_EXCEPTIONS'] == '')    $ai_db_options_multisite ['MULTISITE_EXCEPTIONS'] = DEFAULT_MULTISITE_EXCEPTIONS;

    return ($ai_db_options_multisite ['MULTISITE_EXCEPTIONS']);
  }

  return DEFAULT_MULTISITE_EXCEPTIONS;
}

function multisite_main_for_all_blogs () {
  global $ai_db_options_multisite;

  if (ai_remote ('multisite', is_multisite ())) {
    if (!isset ($ai_db_options_multisite ['MULTISITE_MAIN_FOR_ALL_BLOGS'])) $ai_db_options_multisite ['MULTISITE_MAIN_FOR_ALL_BLOGS'] = DEFAULT_MULTISITE_MAIN_FOR_ALL_BLOGS;
    if ($ai_db_options_multisite ['MULTISITE_MAIN_FOR_ALL_BLOGS'] == '')    $ai_db_options_multisite ['MULTISITE_MAIN_FOR_ALL_BLOGS'] = DEFAULT_MULTISITE_MAIN_FOR_ALL_BLOGS;

    return ($ai_db_options_multisite ['MULTISITE_MAIN_FOR_ALL_BLOGS']);
  }

  return DEFAULT_MULTISITE_MAIN_FOR_ALL_BLOGS;
}

function multisite_site_admin_page () {
  global $ai_db_options_multisite;

  if (ai_remote ('multisite', is_multisite ())) {
    if (!isset ($ai_db_options_multisite ['MULTISITE_SITE_ADMIN_PAGE'])) $ai_db_options_multisite ['MULTISITE_SITE_ADMIN_PAGE'] = DEFAULT_MULTISITE_SITE_ADMIN_PAGE;

    if (multisite_main_for_all_blogs ()) $ai_db_options_multisite ['MULTISITE_SITE_ADMIN_PAGE'] = AI_DISABLED;

    return ($ai_db_options_multisite ['MULTISITE_SITE_ADMIN_PAGE']);
  }

  return DEFAULT_MULTISITE_SITE_ADMIN_PAGE;
}

function get_adb_devices () {
  global $ai_db_options, $ai_wp_data;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['ADB_DEVICES'])) $ai_db_options [AI_OPTION_GLOBAL]['ADB_DEVICES'] = AI_DEFAULT_ADB_DEVICES;

  return ($ai_db_options [AI_OPTION_GLOBAL]['ADB_DEVICES']);
}

function get_adb_action ($saved_value = false) {
  global $ai_db_options, $ai_wp_data;

  if (!$saved_value) {
    if ($ai_wp_data [AI_CODE_FOR_IFRAME]) return AI_ADB_ACTION_NONE;

    switch (get_adb_no_action ()) {
      case AI_ADB_NO_ACTION_LOGGED_IN:
        if (($ai_wp_data [AI_WP_USER] & AI_USER_LOGGED_IN) != 0) return AI_ADB_ACTION_NONE;
        break;
      case AI_ADB_NO_ACTION_ADMINISTRATORS:
        if (($ai_wp_data [AI_WP_USER] & AI_USER_ADMINISTRATOR) != 0) return AI_ADB_ACTION_NONE;
        break;
    }

    if (isset ($ai_wp_data [AI_ADB_SHORTCODE_ACTION])) return ($ai_wp_data [AI_ADB_SHORTCODE_ACTION]);
  }

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['ADB_ACTION'])) $ai_db_options [AI_OPTION_GLOBAL]['ADB_ACTION'] = AI_DEFAULT_ADB_ACTION;

  return ($ai_db_options [AI_OPTION_GLOBAL]['ADB_ACTION']);
}

function get_adb_no_action ($saved_value = false) {
  global $ai_db_options, $ai_wp_data;

  if (!$saved_value) {
    if ($ai_wp_data [AI_CODE_FOR_IFRAME]) return AI_ADB_NO_ACTION_NONE;
  }

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['ADB_NO_ACTION'])) $ai_db_options [AI_OPTION_GLOBAL]['ADB_NO_ACTION'] = AI_DEFAULT_ADB_NO_ACTION;

  return ($ai_db_options [AI_OPTION_GLOBAL]['ADB_NO_ACTION']);
}

function get_delay_action ($return_number = false) {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['ADB_DELAY_ACTION'])) $ai_db_options [AI_OPTION_GLOBAL]['ADB_DELAY_ACTION'] = '';

  if ($return_number) {
    $value = trim ($ai_db_options [AI_OPTION_GLOBAL]['ADB_DELAY_ACTION']);
    if ($value == '') $value = 0;
//    if (is_numeric ($value)) return $value; else return 0;
  }

  return ($ai_db_options [AI_OPTION_GLOBAL]['ADB_DELAY_ACTION']);
}

function get_no_action_period ($return_number = false) {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['ADB_NO_ACTION_PERIOD'])) $ai_db_options [AI_OPTION_GLOBAL]['ADB_NO_ACTION_PERIOD'] = AI_DEFAULT_ADB_NO_ACTION_PERIOD;

  if ($return_number) {
    $value = trim ($ai_db_options [AI_OPTION_GLOBAL]['ADB_NO_ACTION_PERIOD']);
    if ($value == '') $value = 0;
    if (is_numeric ($value)) return $value; else return AI_DEFAULT_ADB_NO_ACTION_PERIOD;
  }

  return ($ai_db_options [AI_OPTION_GLOBAL]['ADB_NO_ACTION_PERIOD']);
}

function get_adb_selectors ($decode = false) {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['ADB_SELECTORS'])) $ai_db_options [AI_OPTION_GLOBAL]['ADB_SELECTORS'] = '';

  if ($decode)
    return (html_entity_decode ($ai_db_options [AI_OPTION_GLOBAL]['ADB_SELECTORS'])); else
      return ($ai_db_options [AI_OPTION_GLOBAL]['ADB_SELECTORS']);
}

function get_redirection_page ($return_number = false) {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['ADB_REDIRECTION_PAGE'])) $ai_db_options [AI_OPTION_GLOBAL]['ADB_REDIRECTION_PAGE'] = AI_DEFAULT_ADB_REDIRECTION_PAGE;

  if ($return_number) {
    $value = trim ($ai_db_options [AI_OPTION_GLOBAL]['ADB_REDIRECTION_PAGE']);
    if ($value == '') $value = 0;
    if (is_numeric ($value)) return $value; else return AI_DEFAULT_ADB_REDIRECTION_PAGE;
  }

  return ($ai_db_options [AI_OPTION_GLOBAL]['ADB_REDIRECTION_PAGE']);
}

function get_custom_redirection_url () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['ADB_CUSTOM_REDIRECTION_URL'])) $ai_db_options [AI_OPTION_GLOBAL]['ADB_CUSTOM_REDIRECTION_URL'] = '';

  return ($ai_db_options [AI_OPTION_GLOBAL]['ADB_CUSTOM_REDIRECTION_URL']);
}

function get_adb_external_scripts () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['ADB_EXTERNAL_SCRIPTS'])) $ai_db_options [AI_OPTION_GLOBAL]['ADB_EXTERNAL_SCRIPTS'] = AI_DEFAULT_ADB_EXTERNAL_SCRIPTS;

  return ($ai_db_options [AI_OPTION_GLOBAL]['ADB_EXTERNAL_SCRIPTS']);
}

function get_message_css () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['ADB_MESSAGE_CSS'])) $ai_db_options [AI_OPTION_GLOBAL]['ADB_MESSAGE_CSS'] = AI_DEFAULT_ADB_MESSAGE_CSS;

  return ($ai_db_options [AI_OPTION_GLOBAL]['ADB_MESSAGE_CSS']);
}

function get_overlay_css () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['ADB_OVERLAY_CSS'])) $ai_db_options [AI_OPTION_GLOBAL]['ADB_OVERLAY_CSS'] = AI_DEFAULT_ADB_OVERLAY_CSS;

  return ($ai_db_options [AI_OPTION_GLOBAL]['ADB_OVERLAY_CSS']);
}

function get_undismissible_message ($saved_value = false) {
  global $ai_db_options, $ai_wp_data;

  if (!$saved_value) {
    switch (get_no_undismissible_message ()) {
      case AI_ADB_NO_ACTION_LOGGED_IN:
        if (($ai_wp_data [AI_WP_USER] & AI_USER_LOGGED_IN) != 0) return AI_DISABLED;
        break;
      case AI_ADB_NO_ACTION_ADMINISTRATORS:
        if (($ai_wp_data [AI_WP_USER] & AI_USER_ADMINISTRATOR) != 0) return AI_DISABLED;
        break;
    }
  }

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['ADB_UNDISMISSIBLE_MESSAGE'])) $ai_db_options [AI_OPTION_GLOBAL]['ADB_UNDISMISSIBLE_MESSAGE'] = AI_DEFAULT_ADB_UNDISMISSIBLE_MESSAGE;

  return ($ai_db_options [AI_OPTION_GLOBAL]['ADB_UNDISMISSIBLE_MESSAGE']);
}

function get_no_undismissible_message () {
  global $ai_db_options;

  if (!isset ($ai_db_options [AI_OPTION_GLOBAL]['ADB_NO_UNDISMISSIBLE_MESSAGE'])) $ai_db_options [AI_OPTION_GLOBAL]['ADB_NO_UNDISMISSIBLE_MESSAGE'] = AI_DEFAULT_ADB_NO_UNDISMISSIBLE_MESSAGE;

  return ($ai_db_options [AI_OPTION_GLOBAL]['ADB_NO_UNDISMISSIBLE_MESSAGE']);
}

function filter_html_class ($str){

  $str = str_replace (array ("\\\""), array ("\""), $str);
  $str = sanitize_html_class ($str);

  return $str;
}

function filter_string ($str){

  $str = str_replace (array ("\\\""), array ("\""), $str);
  $str = str_replace (array ("\"", "<", ">"), "", $str);
  $str = trim (esc_html ($str));

  return $str;
}

function filter_string_tags ($str){

  $str = str_replace (array ("\\\""), array ("\""), $str);
  $str = str_replace (array ("\""), "", $str);
  $str = str_replace (array ("<", ">"), array ("&lt;", "&gt;"), $str);
  $str = trim (esc_html ($str));

  return $str;
}

function filter_option ($option, $value, $delete_escaped_backslashes = true){
  if ($delete_escaped_backslashes)
    $value = str_replace (array ("\\\""), array ("\""), $value);

  if ($option == 'ADB_SELECTORS' ||
      $option == AI_OPTION_HTML_SELECTOR ||
      $option == AI_OPTION_ANIMATION_TRIGGER_VALUE ||
      $option == 'MAIN_CONTENT_ELEMENT') {
    $value = str_replace (array ("\\", "/", "?", "\"", "'", "'", '"'), "", $value);
    $value = esc_html ($value);
  }
  elseif ($option == AI_OPTION_DOMAIN_LIST ||
          $option == 'NO_PARAGRAPH_COUNTING_INSIDE' ||
          $option == AI_OPTION_BACKGROUND_COLOR ||
          $option == AI_OPTION_BLOCK_BACKGROUND_COLOR ||
          $option == AI_OPTION_PARAGRAPH_TAGS ||
          $option == AI_OPTION_COUNT_INSIDE_ELEMENTS ||
          $option == AI_OPTION_IP_ADDRESS_LIST ||
          $option == AI_OPTION_COUNTRY_LIST) {
    $value = str_replace (array ("\\", "/", "?", "\"", "'", "<", ">", "[", "]", "'", '"'), "", $value);
    $value = esc_html ($value);
  }
  elseif ($option == AI_OPTION_BLOCK_WIDTH ||
          $option == AI_OPTION_BLOCK_HEIGHT) {
    $value = str_replace (array ("\"", "'", "<", ">", "[", "]", "'", '"'), "", $value);
    $value = esc_html ($value);
  }
  elseif (
    $option == AI_OPTION_PARAGRAPH_TEXT ||
    $option == AI_OPTION_COUNT_INSIDE_ELEMENTS_TEXT ||
    $option == AI_OPTION_AVOID_TEXT_ABOVE ||
    $option == AI_OPTION_AVOID_TEXT_BELOW ||
    $option == AI_OPTION_CLIENT_LIST
  ) {
    $value = esc_html ($value);
  }
  elseif ($option == AI_OPTION_BLOCK_NAME ||
          $option == AI_OPTION_GENERAL_TAG ||
          $option == AI_OPTION_DOMAIN_LIST ||
          $option == AI_OPTION_CATEGORY_LIST ||
          $option == AI_OPTION_TAG_LIST ||
          $option == AI_OPTION_TAXONOMY_LIST ||
          $option == AI_OPTION_ID_LIST ||
          $option == AI_OPTION_URL_LIST ||
          $option == AI_OPTION_PARAGRAPH_NUMBER ||
          $option == AI_OPTION_MIN_PARAGRAPHS ||
          $option == AI_OPTION_MAX_PARAGRAPHS ||
          $option == AI_OPTION_SKIP_FIRST_PARAGRAPHS ||
          $option == AI_OPTION_SKIP_LAST_PARAGRAPHS ||
          $option == AI_OPTION_MIN_WORDS_ABOVE ||
          $option == AI_OPTION_AVOID_PARAGRAPHS_ABOVE ||
          $option == AI_OPTION_AVOID_PARAGRAPHS_BELOW ||
          $option == AI_OPTION_AVOID_TRY_LIMIT ||
          $option == AI_OPTION_MIN_WORDS ||
          $option == AI_OPTION_MAX_WORDS ||
          $option == AI_OPTION_MIN_PARAGRAPH_WORDS ||
          $option == AI_OPTION_MAX_PARAGRAPH_WORDS ||
          $option == AI_OPTION_MAXIMUM_INSERTIONS ||
          $option == AI_OPTION_AFTER_DAYS ||
          $option == AI_OPTION_START_DATE ||
          $option == AI_OPTION_END_DATE ||
          $option == AI_OPTION_SCHEDULING_FALLBACK ||
          $option == AI_OPTION_LIMITS_FALLBACK ||
          $option == AI_OPTION_EXCERPT_NUMBER ||
          $option == AI_OPTION_WAIT_FOR_DELAY ||
          $option == AI_OPTION_HORIZONTAL_MARGIN ||
          $option == AI_OPTION_VERTICAL_MARGIN ||
          $option == AI_OPTION_ANIMATION_TRIGGER_OFFSET ||
          $option == AI_OPTION_ANIMATION_TRIGGER_DELAY ||
          $option == AI_OPTION_IFRAME_WIDTH ||
          $option == AI_OPTION_IFRAME_HEIGHT ||

          $option == AI_OPTION_AUTO_CLOSE_TIME ||
          $option == AI_OPTION_STAY_CLOSED_TIME ||
          $option == AI_OPTION_DELAY_SHOWING ||
          $option == AI_OPTION_SHOW_EVERY ||
          $option == AI_OPTION_VISITOR_MAX_IMPRESSIONS ||
          $option == AI_OPTION_VISITOR_LIMIT_IMPRESSIONS_PER_TIME_PERIOD ||
          $option == AI_OPTION_VISITOR_LIMIT_IMPRESSIONS_TIME_PERIOD ||
          $option == AI_OPTION_MAX_IMPRESSIONS ||
          $option == AI_OPTION_LIMIT_IMPRESSIONS_PER_TIME_PERIOD ||
          $option == AI_OPTION_LIMIT_IMPRESSIONS_TIME_PERIOD ||
          $option == AI_OPTION_VISITOR_MAX_CLICKS ||
          $option == AI_OPTION_VISITOR_LIMIT_CLICKS_PER_TIME_PERIOD ||
          $option == AI_OPTION_VISITOR_LIMIT_CLICKS_TIME_PERIOD ||
          $option == AI_OPTION_MAX_CLICKS ||
          $option == AI_OPTION_LIMIT_CLICKS_PER_TIME_PERIOD ||
          $option == AI_OPTION_LIMIT_CLICKS_TIME_PERIOD ||
          $option == AI_OPTION_BACKGROUND_IMAGE ||
          $option == AI_OPTION_PARALLAX . '_1' ||
          $option == AI_OPTION_PARALLAX . '_2' ||
          $option == AI_OPTION_PARALLAX . '_3' ||
          $option == AI_OPTION_PARALLAX_IMAGE . '_1' ||
          $option == AI_OPTION_PARALLAX_IMAGE . '_2' ||
          $option == AI_OPTION_PARALLAX_IMAGE . '_3' ||
          $option == AI_OPTION_PARALLAX_SHIFT . '_1' ||
          $option == AI_OPTION_PARALLAX_SHIFT . '_2' ||
          $option == AI_OPTION_PARALLAX_SHIFT . '_3' ||
          $option == AI_OPTION_PARALLAX_LINK ||
          $option == 'CLICK_FRAUD_PROTECTION_TIME' ||
          $option == 'GLOBAL_VISITOR_LIMIT_CPT' ||
          $option == 'GLOBAL_VISITOR_LIMIT_TIME' ||
          $option == 'ADB_DELAY_ACTION' ||
          $option == 'ADB_NO_ACTION_PERIOD' ||
          $option == 'ADB_REDIRECTION_PAGE' ||
          $option == 'ADB_CUSTOM_REDIRECTION_URL' ||
          $option == AI_OPTION_CUSTOM_CSS ||
          $option == 'HOOK_PRIORITY' ||
          $option == 'ADB_OVERLAY_CSS' ||
          $option == 'ADB_MESSAGE_CSS') {
    $value = str_replace (array ("\"", "<", ">", "[", "]"), "", $value);
    $value = esc_html ($value);
  }
  elseif ($option == AI_OPTION_URL_PARAMETER_LIST ||
          $option == AI_OPTION_COOKIE_LIST) {
    $value = str_replace (array ("\"", "<", ">"), "", $value);
    $value = esc_html ($value);
  }
  elseif ($option == 'AD_LABEL' ||
          $option == 'REPORT_HEADER_TITLE' ||
          $option == 'REPORT_HEADER_DESCRIPTION' ||
          $option == 'EXTERNAL_TRACKING_CATEGORY' ||
          $option == 'EXTERNAL_TRACKING_ACTION' ||
          $option == 'EXTERNAL_TRACKING_LABEL' ||
          $option == 'REPORT_FOOTER') {
    $value = str_replace (array ("\\", "?"), "", $value);
    $value = esc_html ($value);
  }
  elseif (
    $option == 'REPORT_HEADER_IMAGE') {
    $value = str_replace (home_url () . '/', '', $value);
    $value = str_replace (array ("http://", "https://", ":". "\"", "<", ">", "[", "]"), "", $value);
    $value = esc_html ($value);
  }
  elseif (
    $option == 'MAXMIND_LICENSE_KEY' ||
    $option == 'GEO_DB'
  ) {
    $value = str_replace (array (":". "\"", "<", ">", "[", "]"), "", $value);
  }

  return $value;
}

function filter_option_hf ($option, $value){
  $value = str_replace (array ("\\\""), array ("\""), $value);

//        if ($option == AI_OPTION_CODE ) {
//  } elseif ($option == AI_OPTION_ENABLE_MANUAL) {
//  } elseif ($option == AI_OPTION_PROCESS_PHP) {
//  } elseif ($option == AI_OPTION_ENABLE_404) {
//  } elseif ($option == AI_OPTION_DETECT_SERVER_SIDE) {
//  } elseif ($option == AI_OPTION_DISPLAY_FOR_DEVICES) {
//  }

  return $value;
}

function ai_ajax () {
  global $ai_wp_data;

//  check_ajax_referer ("adinserter_data", "ai_check");
//  check_admin_referer ("adinserter_data", "ai_check");

  if (isset ($_POST ["adsense-ad-units"])) {
    if (defined ('AI_ADSENSE_API')) {
      adsense_ad_name ();
    }
  }

  elseif (isset ($_GET ["block"])) {
    $block = sanitize_text_field ((int) $_GET ["block"]);
    if (is_numeric ($block) && $block >= 1 && $block <= 96) {
      global $block_object;
      $block = $block_object [$block];
      if (isset ($_GET ["cookie_check"]) && $_GET ["cookie_check"] == 1) {
        $block->client_side_cookie_check = true;
      }
      if (isset ($_GET ["hide-debug-labels"]) && $_GET ["hide-debug-labels"] == 1) {
        $block->hide_debug_labels = true;
      }
      if ($block->get_iframe ())
        echo $block->get_iframe_page ();
    }
  }

  elseif (isset ($_GET ["ads-txt"])) {
    $ads_txt = get_option (AI_ADS_TXT_NAME);
    if ($ads_txt === false) {
      wp_die ('Page not found', 404);
    }

    header ('Content-Type: text/plain');
    echo esc_html ($ads_txt);
    wp_die ();
  }

  elseif (isset ($_GET ["remote-ads-txt"]) && !function_exists ('ai_ajax_processing_2')) {
    if (get_remote_debugging ()) {
      // Read-only access
      if ($_GET ["remote-ads-txt"] == 'save') {
        wp_die ();
      }

      $_GET ["virtual"] = get_option (AI_ADS_TXT_NAME) !== false ? '1' : '0';

      ads_txt (sanitize_text_field ($_GET ["remote-ads-txt"]));
    }
  }

  elseif (isset ($_GET ["ai-get-settings"])) {
    if (get_remote_debugging ()) {
      global $ai_db_options, $ai_db_options_multisite;

      if (function_exists ('ai_check_remote_settings')) {
        ai_check_remote_settings ();
      }

      $tracking = false;
      if (defined ('AI_PLUGIN_TRACKING') && AI_PLUGIN_TRACKING) {
        global $ai_dst;
        if (isset ($ai_dst) && is_object ($ai_dst) && $ai_dst->get_plugin_tracking () !== null) {
          $tracking = $ai_dst->get_tracking ();
        }
      }

      $plugin_data = array (
        'version' => AD_INSERTER_NAME . ' ' . AD_INSERTER_VERSION,
        'install' => get_option (AI_INSTALL_NAME),
        'install-time' => isset ($ai_wp_data [AI_INSTALL_TIME_DIFFERENCE]) ? $ai_wp_data [AI_INSTALL_TIME_DIFFERENCE] : '',
        'since-install' => isset ($ai_wp_data [AI_DAYS_SINCE_INSTAL]) ? $ai_wp_data [AI_DAYS_SINCE_INSTAL] : null,
        'tracking' => $tracking,
        'review' => get_option ('ai-notice-review', ''),
        'pro' => false,
        'write' => false,
        'sidebar-widgets' => get_sidebar_widgets (),
        'exceptions' => ai_get_exceptions (/*ai_current_user_role_ok () && */(!is_multisite() || is_main_site () || multisite_exceptions_enabled ())),
        'current-theme' => wp_get_theme (),
        'virtual-ads-txt' => get_option (AI_ADS_TXT_NAME) !== false,
        'categories' => ai_get_category_list (),
        'tags' => ai_get_tag_list (),
        'taxonomies' => ai_get_taxonomy_list (),
        'post-ids' => ai_get_post_id_list (),

        'license-key' => '',
        'type' => '',
        'status' => '',
        'last-update' => '',
        'client' => false,
        'counter' => '',
      );

      if (function_exists ('ai_plugin_data')) {
        ai_plugin_data ($plugin_data);
      }

      echo '#', base64_encode (serialize ($plugin_data)), '#';

      if (is_multisite()) {
        echo base64_encode (serialize ($ai_db_options_multisite));
      }

      echo "#";

      if (is_multisite() && multisite_main_for_all_blogs () && defined ('BLOG_ID_CURRENT_SITE')) {
        echo BLOG_ID_CURRENT_SITE;
      }

      echo "#";

      if (function_exists ('ai_filter_remote_settings')) {
        ai_filter_remote_settings ($ai_db_options);
      }

      echo base64_encode (serialize ($ai_db_options));
    }
  }

  elseif (isset ($_GET ["check-page"])) {
    if (get_remote_debugging ()) {
      ai_check_page ();
    }
  }

  elseif (function_exists ('ai_ajax_processing_2')) {
    ai_ajax_processing_2 ();
  }

  wp_die ();
}


function ai_ajax_backend () {
  global $preview_name, $preview_alignment, $preview_css;

//  check_ajax_referer ("adinserter_data", "ai_check");
  check_admin_referer ("adinserter_data", "ai_check");

  if (is_multisite() && !is_main_site () && !multisite_settings_page_enabled ()) {
    wp_die ();
  }

  if (!current_user_can ('manage_options')) {
    wp_die ();
  }

  if (isset ($_POST ["preview"])) {
    $block = urldecode ((int) $_POST ["preview"]);
    if (is_numeric ($block) && $block >= 1 && $block <= 96) {
      $preview_parameters = array ();

      if (isset ($_POST ['name']))              $preview_parameters ['name']              = base64_decode ($_POST ['name']);
      if (isset ($_POST ['code']))              $preview_parameters ['code']              = base64_decode ($_POST ['code']);
      if (isset ($_POST ['alignment']))         $preview_parameters ['alignment']         = base64_decode ($_POST ['alignment']);
      if (isset ($_POST ['horizontal']))        $preview_parameters ['horizontal']        = base64_decode ($_POST ['horizontal']);
      if (isset ($_POST ['vertical']))          $preview_parameters ['vertical']          = base64_decode ($_POST ['vertical']);
      if (isset ($_POST ['horizontal_margin'])) $preview_parameters ['horizontal_margin'] = base64_decode ($_POST ['horizontal_margin']);
      if (isset ($_POST ['vertical_margin']))   $preview_parameters ['vertical_margin']   = base64_decode ($_POST ['vertical_margin']);
      if (isset ($_POST ['animation']))         $preview_parameters ['animation']         = base64_decode ($_POST ['animation']);
      if (isset ($_POST ['alignment_css']))     $preview_parameters ['alignment_css']     = base64_decode ($_POST ['alignment_css']);
      if (isset ($_POST ['custom_css']))        $preview_parameters ['custom_css']        = base64_decode ($_POST ['custom_css']);
      if (isset ($_POST ['php']))               $preview_parameters ['php']               = $_POST ['php'];
      if (isset ($_POST ['close']))             $preview_parameters ['close']             = $_POST ['close'];
      if (isset ($_POST ['background']))        $preview_parameters ['background']        = $_POST ['background'];
      if (isset ($_POST ['body_background']))   $preview_parameters ['body_background']   = $_POST ['body_background'];
      if (isset ($_POST ['background_image']))  $preview_parameters ['background_image']  = base64_decode ($_POST ['background_image']);
      if (isset ($_POST ['background_color']))  $preview_parameters ['background_color']  = base64_decode ($_POST ['background_color']);
      if (isset ($_POST ['background_size']))   $preview_parameters ['background_size']   = base64_decode ($_POST ['background_size']);
      if (isset ($_POST ['background_repeat'])) $preview_parameters ['background_repeat'] = base64_decode ($_POST ['background_repeat']);
      if (isset ($_POST ['label']))             $preview_parameters ['label']             = $_POST ['label'];
      if (isset ($_POST ['read_only']))         $preview_parameters ['read_only']         = $_POST ['read_only'];
      if (isset ($_POST ['iframe']))            $preview_parameters ['iframe']            = $_POST ['iframe'];
      if (isset ($_POST ['check']))             $preview_parameters ['check']             = $_POST ['check'];
      if (isset ($_POST ['count']))             $preview_parameters ['count']             = $_POST ['count'];
      if (isset ($_POST ['rotate']))            $preview_parameters ['rotate']            = $_POST ['rotate'];
      if (isset ($_POST ['viewport']))          $preview_parameters ['viewport']          = $_POST ['viewport'];
      if (isset ($_POST ['fallback']))          $preview_parameters ['fallback']          = $_POST ['fallback'];

      if (function_exists ('ai_remote_preview')) {
        ai_remote_preview ($block, $preview_parameters);
      }

      require_once AD_INSERTER_PLUGIN_DIR.'includes/preview.php';

      generate_code_preview (
        $block,
        $preview_parameters
      );
    }
    elseif ($_POST ["preview"] == 'adb') {
      require_once AD_INSERTER_PLUGIN_DIR.'includes/preview-adb.php';

      $message = base64_decode ($_POST ["code"]);
      $process_php = isset ($_POST ["php"]) && $_POST ["php"] == 1;
      $head = null;
      $processed_message = null;
      $footer = null;

      if (function_exists ('ai_remote_preview_adb')) {
        ai_remote_preview_adb ($message, $process_php, $head, $processed_message, $footer);
      }

      generate_code_preview_adb ($message, $process_php, false, $head, $processed_message, $footer);
    }
    elseif ($_POST ["preview"] == 'adsense') {

      if (defined ('AI_ADSENSE_API')) {
        require_once AD_INSERTER_PLUGIN_DIR.'includes/preview.php';
        require_once AD_INSERTER_PLUGIN_DIR.'includes/adsense-api.php';

        if (defined ('AI_ADSENSE_AUTHORIZATION_CODE')) {

          $adsense = new adsense_api();

          $adsense_code   = $adsense->getAdCode (base64_decode ($_POST ["slot_id"]));
          $adsense_error  = $adsense->getError ();

          $preview_parameters = array (
            "name"          => isset ($_POST ["name"]) ? base64_decode ($_POST ["name"]) : 'ADSENSE CODE',
            "alignment"     => '',
            "horizontal"    => '',
            "vertical"      => '',
            "alignment_css" => '',
            "custom_css"    => '',
            "code"          => $adsense_error == '' ? $adsense_code : '<div style="color: red;">'.$adsense_error.'</div>',
            "php"           => false,
            "label"         => false,
            "close"         => AI_CLOSE_NONE,
            "read_only"     => true,
          );

          generate_code_preview (
            0, // Default settings
            $preview_parameters
          );

        }
      }
    }
  }

  elseif (isset ($_POST ["edit"])) {
    if (is_numeric ($_POST ["edit"]) && $_POST ["edit"] >= 1 && $_POST ["edit"] <= 96) {
      require_once AD_INSERTER_PLUGIN_DIR.'includes/editor.php';

      $process_php = isset ($_POST ["php"]) && $_POST ["php"] == 1;

      generate_code_editor ((int) $_POST ["edit"], base64_decode ($_POST ["code"]), $process_php);
    }
  }

  if (isset ($_POST ["placeholder"])) {
    $block = urldecode ((int) $_POST ["block"]);
    if (is_numeric ($block) && $block >= 1 && $block <= 96) {
      require_once AD_INSERTER_PLUGIN_DIR.'includes/placeholders.php';

      generate_placeholder_editor (str_replace (array ('"', "\\'"), array ('&quot', '&#039'), urldecode ($_POST ["placeholder"])), $block);
    }
  }

  elseif (isset ($_POST ["generate-code"])) {
    $code_generator = new ai_code_generator ();

    echo json_encode ($code_generator->generate ($_POST));
  }

  elseif (isset ($_POST ["import-code"])) {
    $code_generator = new ai_code_generator ();

    echo json_encode ($code_generator->import (base64_decode ($_POST ["import-code"])));
  }

  elseif (isset ($_POST ["import-rotation-code"])) {
    $code_generator = new ai_code_generator ();

    echo json_encode ($code_generator->import_rotation (base64_decode ($_POST ["import-rotation-code"])));
  }

  elseif (isset ($_POST ["generate-rotation-code"])) {
    $code_generator = new ai_code_generator ();

    echo json_encode ($code_generator->generate_rotation (json_decode (base64_decode ($_POST ['generate-rotation-code']), true)));
  }

  elseif (isset ($_GET ["image"])) {
    $filename = sanitize_file_name ($_GET ["image"]);
    header ("Content-Type: image/png");
    header ("Content-Length: " . filesize (AD_INSERTER_PLUGIN_DIR.'images/'.$filename));
    readfile  (AD_INSERTER_PLUGIN_DIR.'images/'.$filename);
  }
  elseif (isset ($_GET ["css"])) {
    $filename = sanitize_file_name ($_GET ["css"]);
    header ("Content-Type: text/css");
    header ("Content-Length: " . filesize (AD_INSERTER_PLUGIN_DIR.'css/'.$filename));
    readfile  (AD_INSERTER_PLUGIN_DIR.'css/'.$filename);
  }
  elseif (isset ($_GET ["js"])) {
    $filename = sanitize_file_name ($_GET ["js"]);
    header ("Content-Type: application/javascript");
    header ("Content-Length: " . filesize (AD_INSERTER_PLUGIN_DIR.'js/'.$filename));
    readfile  (AD_INSERTER_PLUGIN_DIR.'js/'.$filename);
  }

  elseif (isset ($_GET ["rating"])) {
    $cache_time = $_GET ["rating"] == 'update' ? 0 * 60 : AI_TRANSIENT_RATING_EXPIRATION;
    if (!get_transient (AI_TRANSIENT_RATING) || !($transient_timeout = get_option ('_transient_timeout_' . AI_TRANSIENT_RATING)) || AI_TRANSIENT_RATING_EXPIRATION - ($transient_timeout - time ()) > $cache_time) {
      $args = (object) array ('slug' => 'ad-inserter');
      $request = array ('action' => 'plugin_information', 'timeout' => 5, 'request' => serialize ($args));
      $url = 'http://api.wordpress.org/plugins/info/1.0/';
      $response = wp_remote_post ($url, array ('body' => $request));
      $plugin_info = @unserialize ($response ['body']);
      if (isset ($plugin_info->ratings)) {
        $total_rating = 0;
        $total_count = 0;
        foreach ($plugin_info->ratings as $rating => $count) {
          $total_rating += $rating * $count;
          $total_count += $count;
        }
        $rating = number_format ($total_rating / $total_count, 4);
        set_transient (AI_TRANSIENT_RATING, $rating, AI_TRANSIENT_RATING_EXPIRATION);
      }
    }
    if ($rating = get_transient (AI_TRANSIENT_RATING)) {
      if ($rating > 1 && $rating <= 5) echo $rating;
    }
  }

  elseif (isset ($_POST ["notice"])) {
    update_option ('ai-notice-' . esc_html ($_POST ["notice"]), esc_html ($_POST ["click"]));
  }

  elseif (isset ($_POST ["notice-check"])) {
    echo esc_html ($_POST ["notice-check"]);
  }

  elseif (isset ($_GET ["list"])) {
    $search_text = esc_html (trim ($_GET ["list"]));

    $show_all_blocks = isset ($_GET ["all"]) && $_GET ["all"];

    $start = (int) $_GET ["start"];
    if ($start < 1 || $start > 96) $start = 1;

    $end = (int) $_GET ["end"];
    if ($end < 1 || $end > 96 || $end < $start) $end = 16;

    $active = (int) $_GET ["active"];
    if ($active < 1 || $active > 96) $active = 1;

    code_block_list ($start, $end, $search_text, $show_all_blocks, $active);
  }

  elseif (isset ($_GET ["adsense-list"])) {
    if (defined ('AI_ADSENSE_API')) {
      adsense_list ();
    }
  }

  elseif (isset ($_GET ["adsense-code"])) {
    if (defined ('AI_ADSENSE_API')) {
      ai_adsense_code (esc_html ($_GET ["adsense-code"]));
    }
  }

  elseif (isset ($_GET ["adsense-authorization-code"])) {
    if (defined ('AI_ADSENSE_API')) {
      if ($_GET ['adsense-authorization-code'] == '') {
        delete_option (AI_ADSENSE_CLIENT_IDS);
        delete_option (AI_ADSENSE_AUTH_CODE);
        delete_option (AI_ADSENSE_OWN_IDS);

        delete_transient (AI_TRANSIENT_ADSENSE_TOKEN_1);
        delete_transient (AI_TRANSIENT_ADSENSE_TOKEN);
        delete_transient (AI_TRANSIENT_ADSENSE_ADS);
      }
      elseif (base64_decode ($_GET ['adsense-authorization-code']) == 'own-ids') {
        update_option (AI_ADSENSE_OWN_IDS, '1');

        delete_option (AI_ADSENSE_CLIENT_IDS);
        delete_option (AI_ADSENSE_AUTH_CODE);

        delete_transient (AI_TRANSIENT_ADSENSE_TOKEN_1);
        delete_transient (AI_TRANSIENT_ADSENSE_TOKEN);
        delete_transient (AI_TRANSIENT_ADSENSE_ADS);
      }
      else update_option (AI_ADSENSE_AUTH_CODE, base64_decode ($_GET ['adsense-authorization-code']));
    }
  }

  elseif (isset ($_GET ["adsense-client-id"])) {
    if (defined ('AI_ADSENSE_API')) {
      if ($_GET ['adsense-client-id'] == '') {
        delete_option (AI_ADSENSE_CLIENT_IDS);
        delete_option (AI_ADSENSE_AUTH_CODE);

        delete_transient (AI_TRANSIENT_ADSENSE_TOKEN_1);
        delete_transient (AI_TRANSIENT_ADSENSE_TOKEN);
        delete_transient (AI_TRANSIENT_ADSENSE_ADS);
      } else update_option (AI_ADSENSE_CLIENT_IDS, array ('ID' => base64_decode ($_GET ['adsense-client-id']), 'SECRET' => base64_decode ($_GET ['adsense-client-secret'])));
    }
  }

  elseif (isset ($_GET ["ads-txt"])) {
    if (!is_multisite() || is_main_site ()) {
      if (function_exists ('ai_remote_ads_txt') && ai_remote_ads_txt ()) {
        wp_die ();
      }

      ads_txt (esc_html ($_GET ["ads-txt"]));
    }
  }

  elseif (isset ($_GET ["settings"])) {
    generate_settings_form ();
  }

  elseif (isset ($_GET ["list-options"])) {
    generate_list_options (esc_html ($_GET ["list-options"]));
  }

  elseif (isset ($_GET ["update"])) {
    if ($_GET ["update"] == 'block-code-demo') {
      ai_block_code_demo (urldecode ($_GET ["block_class_name"]), esc_html ($_GET ["block_class"]), esc_html ($_GET ["block_number_class"]), esc_html ($_GET ["block_name_class"]), esc_html ($_GET ["inline_styles"]));
    }
    elseif (function_exists ('ai_ajax_backend_2')) {
      ai_ajax_backend_2 ();
    }
  }

  elseif (isset ($_GET ["check-page"])) {
    if (function_exists ('ai_check_remote_page') && ai_check_remote_page ()) {
      wp_die ();
    }

    ai_check_page ();
  }

  elseif (function_exists ('ai_ajax_backend_2')) {
    ai_ajax_backend_2 ();
  }

  wp_die ();
}

function ai_generate_extract (&$settings) {
  global $ai_custom_hooks, $ai_wp_data, $version_string, $subversion_string;

  if (!defined ('AI_EXTRACT_GENERATED'))
    define ('AI_EXTRACT_GENERATED', true);

  $obj = new ai_Block (1);

  $extract = array ();

  if (defined ('AI_BUFFERING')) {
    $above_header_hook_blocks     = array (AI_PT_ANY => array (), AI_PT_HOMEPAGE => array(), AI_PT_CATEGORY => array(), AI_PT_SEARCH => array(), AI_PT_ARCHIVE => array(), AI_PT_STATIC => array(), AI_PT_POST => array(), AI_PT_404 => array(), AI_PT_FEED => array(), AI_PT_AJAX => array());
    $html_element_hook_blocks     = array (AI_PT_ANY => array (), AI_PT_HOMEPAGE => array(), AI_PT_CATEGORY => array(), AI_PT_SEARCH => array(), AI_PT_ARCHIVE => array(), AI_PT_STATIC => array(), AI_PT_POST => array(), AI_PT_404 => array(), AI_PT_FEED => array(), AI_PT_AJAX => array());
  }

  $content_hook_blocks          = array (AI_PT_ANY => array (), AI_PT_HOMEPAGE => array(), AI_PT_CATEGORY => array(), AI_PT_SEARCH => array(), AI_PT_ARCHIVE => array(), AI_PT_STATIC => array(), AI_PT_POST => array(), AI_PT_404 => array(), AI_PT_FEED => array(), AI_PT_AJAX => array());
  $excerpt_hook_blocks          = array (AI_PT_ANY => array (), AI_PT_HOMEPAGE => array(), AI_PT_CATEGORY => array(), AI_PT_SEARCH => array(), AI_PT_ARCHIVE => array(), AI_PT_STATIC => array(), AI_PT_POST => array(), AI_PT_404 => array(), AI_PT_FEED => array(), AI_PT_AJAX => array());
  $loop_start_hook_blocks       = array (AI_PT_ANY => array (), AI_PT_HOMEPAGE => array(), AI_PT_CATEGORY => array(), AI_PT_SEARCH => array(), AI_PT_ARCHIVE => array(), AI_PT_STATIC => array(), AI_PT_POST => array(), AI_PT_404 => array(), AI_PT_FEED => array(), AI_PT_AJAX => array());
  $loop_end_hook_blocks         = array (AI_PT_ANY => array (), AI_PT_HOMEPAGE => array(), AI_PT_CATEGORY => array(), AI_PT_SEARCH => array(), AI_PT_ARCHIVE => array(), AI_PT_STATIC => array(), AI_PT_POST => array(), AI_PT_404 => array(), AI_PT_FEED => array(), AI_PT_AJAX => array());
  $post_hook_blocks             = array (AI_PT_ANY => array (), AI_PT_HOMEPAGE => array(), AI_PT_CATEGORY => array(), AI_PT_SEARCH => array(), AI_PT_ARCHIVE => array(), AI_PT_STATIC => array(), AI_PT_POST => array(), AI_PT_404 => array(), AI_PT_FEED => array(), AI_PT_AJAX => array());
  $before_comments_hook_blocks  = array (AI_PT_ANY => array (), AI_PT_HOMEPAGE => array(), AI_PT_CATEGORY => array(), AI_PT_SEARCH => array(), AI_PT_ARCHIVE => array(), AI_PT_STATIC => array(), AI_PT_POST => array(), AI_PT_404 => array(), AI_PT_FEED => array(), AI_PT_AJAX => array());
  $between_comments_hook_blocks = array (AI_PT_ANY => array (), AI_PT_HOMEPAGE => array(), AI_PT_CATEGORY => array(), AI_PT_SEARCH => array(), AI_PT_ARCHIVE => array(), AI_PT_STATIC => array(), AI_PT_POST => array(), AI_PT_404 => array(), AI_PT_FEED => array(), AI_PT_AJAX => array());
  $after_comments_hook_blocks   = array (AI_PT_ANY => array (), AI_PT_HOMEPAGE => array(), AI_PT_CATEGORY => array(), AI_PT_SEARCH => array(), AI_PT_ARCHIVE => array(), AI_PT_STATIC => array(), AI_PT_POST => array(), AI_PT_404 => array(), AI_PT_FEED => array(), AI_PT_AJAX => array());
  $footer_hook_blocks           = array (AI_PT_ANY => array (), AI_PT_HOMEPAGE => array(), AI_PT_CATEGORY => array(), AI_PT_SEARCH => array(), AI_PT_ARCHIVE => array(), AI_PT_STATIC => array(), AI_PT_POST => array(), AI_PT_404 => array(), AI_PT_FEED => array(), AI_PT_AJAX => array());
  $custom_hook_blocks           = array ();
  for ($custom_hook = 1; $custom_hook <= 20; $custom_hook ++) {
    $custom_hook_blocks     []  = array (AI_PT_ANY => array (), AI_PT_HOMEPAGE => array(), AI_PT_CATEGORY => array(), AI_PT_SEARCH => array(), AI_PT_ARCHIVE => array(), AI_PT_STATIC => array(), AI_PT_POST => array(), AI_PT_404 => array(), AI_PT_FEED => array(), AI_PT_AJAX => array());
  }

  // Get blocks used in sidebar widgets
  $sidebar_widgets = wp_get_sidebars_widgets();
  $widget_options = get_option ('widget_ai_widget');

  $widget_blocks = array ();
  foreach ($sidebar_widgets as $sidebar_index => $sidebar_widget) {
    if (is_array ($sidebar_widget) && isset ($GLOBALS ['wp_registered_sidebars'][$sidebar_index]['name'])) {
      $sidebar_name = $GLOBALS ['wp_registered_sidebars'][$sidebar_index]['name'];
      if ($sidebar_name != "") {
        foreach ($sidebar_widget as $widget) {
          if (preg_match ("/ai_widget-([\d]+)/", $widget, $widget_id)) {
            if (isset ($widget_id [1]) && is_numeric ($widget_id [1])) {
              $widget_option = $widget_options [$widget_id [1]];
              $widget_block = $widget_option ['block'];
              if ($widget_block >= 1 && $widget_block <= 96) {
                $widget_blocks [] = $widget_block;
              }
            }
          }
        }
      }
    }
  }
  $widget_blocks = array_unique ($widget_blocks);

  // Generate extracted data
  $active_blocks = array ();

  $temp_ai_wp_data = $ai_wp_data;

  $ai_wp_data [AI_MOBILE_DETECT_JS]          = false;
  $ai_wp_data [AI_SERVER_SIDE_DETECTION]     = false;
  $ai_wp_data [AI_CLIENT_SIDE_DETECTION]     = false;
  $ai_wp_data [AI_CLIENT_SIDE_INSERTION]     = get_dynamic_blocks () == AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT;
  $ai_wp_data [AI_STICK_TO_THE_CONTENT]      = false;
  $ai_wp_data [AI_TRACKING]                  = false;
  $ai_wp_data [AI_CLOSE_BUTTONS]             = false;
  $ai_wp_data [AI_PARALLAX]                  = false;
  $ai_wp_data [AI_CHECK_BLOCK]               = false;
  $ai_wp_data [AI_IFRAMES]                   = false;
  $ai_wp_data [AI_ANIMATION]                 = false;
  $ai_wp_data [AI_LAZY_LOADING]              = false;
  $ai_wp_data [AI_GEOLOCATION]               = false;

  for ($block = 1; $block <= 96; $block ++) {

    if (!isset ($settings [$block])) continue;

    $obj->number = $block;
    $obj->wp_options = $settings [$block];

    $page_types = array ();
    if ($obj->get_display_settings_home())     $page_types []= AI_PT_HOMEPAGE;
    if ($obj->get_display_settings_page())     $page_types []= AI_PT_STATIC;
    if ($obj->get_display_settings_post())     $page_types []= AI_PT_POST;
    if ($obj->get_display_settings_category()) $page_types []= AI_PT_CATEGORY;
    if ($obj->get_display_settings_search())   $page_types []= AI_PT_SEARCH;
    if ($obj->get_display_settings_archive())  $page_types []= AI_PT_ARCHIVE;
    if ($obj->get_enable_ajax())               $page_types []= AI_PT_AJAX;
    if ($obj->get_enable_feed())               $page_types []= AI_PT_FEED;
    if ($obj->get_enable_404())                $page_types []= AI_PT_404;

    $automatic_insertion = $obj->get_automatic_insertion();
    $enabled_insertion   = $obj->get_disable_insertion() == AI_DISABLED;

    if ($page_types && $enabled_insertion) {

      // Change insertion position to actual server-side insertion position
      switch ($automatic_insertion) {
        case AI_AUTOMATIC_INSERTION_BEFORE_HTML_ELEMENT:
        case AI_AUTOMATIC_INSERTION_INSIDE_HTML_ELEMENT:
        case AI_AUTOMATIC_INSERTION_AFTER_HTML_ELEMENT:
          switch ($obj->get_html_element_insertion ()) {
            case AI_HTML_INSERTION_SEREVR_SIDE:
              $automatic_insertion = AI_AUTOMATIC_INSERTION_OUTPUT_BUFFERING;
              break;
            default:
              $automatic_insertion = $obj->get_server_side_insertion ();
              break;
          }
          break;
      }

      switch ($automatic_insertion) {
        case AI_AUTOMATIC_INSERTION_ABOVE_HEADER:
          if (defined ('AI_BUFFERING')) {
            foreach ($page_types as $block_page_type) $above_header_hook_blocks [$block_page_type][]= $block;
            $above_header_hook_blocks [AI_PT_ANY][]= $block;
          }
          break;
        case AI_AUTOMATIC_INSERTION_OUTPUT_BUFFERING:
          if (defined ('AI_BUFFERING')) {
            foreach ($page_types as $block_page_type) $html_element_hook_blocks [$block_page_type][]= $block;
            $html_element_hook_blocks [AI_PT_ANY][]= $block;
          }
          break;
        case AI_AUTOMATIC_INSERTION_BEFORE_PARAGRAPH:
        case AI_AUTOMATIC_INSERTION_AFTER_PARAGRAPH:
        case AI_AUTOMATIC_INSERTION_BEFORE_IMAGE:
        case AI_AUTOMATIC_INSERTION_AFTER_IMAGE:
        case AI_AUTOMATIC_INSERTION_BEFORE_CONTENT:
        case AI_AUTOMATIC_INSERTION_AFTER_CONTENT:
          foreach ($page_types as $block_page_type) $content_hook_blocks [$block_page_type][]= $block;
          $content_hook_blocks [AI_PT_ANY][]= $block;
          break;
        case AI_AUTOMATIC_INSERTION_BEFORE_EXCERPT:
        case AI_AUTOMATIC_INSERTION_AFTER_EXCERPT:
          foreach ($page_types as $block_page_type) $excerpt_hook_blocks [$block_page_type][]= $block;
          $excerpt_hook_blocks [AI_PT_ANY][]= $block;
          break;
        case AI_AUTOMATIC_INSERTION_BEFORE_POST:
          foreach ($page_types as $block_page_type) $loop_start_hook_blocks [$block_page_type][]= $block;
          $loop_start_hook_blocks [AI_PT_ANY][]= $block;
          break;
        case AI_AUTOMATIC_INSERTION_AFTER_POST:
          foreach ($page_types as $block_page_type) $loop_end_hook_blocks [$block_page_type][]= $block;
          $loop_end_hook_blocks [AI_PT_ANY][]= $block;
          break;
        case AI_AUTOMATIC_INSERTION_BETWEEN_POSTS:
          foreach ($page_types as $block_page_type) $post_hook_blocks [$block_page_type][]= $block;
          $post_hook_blocks [AI_PT_ANY][]= $block;
          break;
        case AI_AUTOMATIC_INSERTION_BEFORE_COMMENTS:
          foreach ($page_types as $block_page_type) $before_comments_hook_blocks [$block_page_type][]= $block;
          $before_comments_hook_blocks [AI_PT_ANY][]= $block;
          break;
        case AI_AUTOMATIC_INSERTION_BETWEEN_COMMENTS:
          foreach ($page_types as $block_page_type) $between_comments_hook_blocks [$block_page_type][]= $block;
          $between_comments_hook_blocks [AI_PT_ANY][]= $block;
          break;
        case AI_AUTOMATIC_INSERTION_AFTER_COMMENTS:
          foreach ($page_types as $block_page_type) $after_comments_hook_blocks [$block_page_type][]= $block;
          $after_comments_hook_blocks [AI_PT_ANY][]= $block;
          break;
        case AI_AUTOMATIC_INSERTION_FOOTER:
          foreach ($page_types as $block_page_type) $footer_hook_blocks [$block_page_type][]= $block;
          $footer_hook_blocks [AI_PT_ANY][]= $block;
          break;
        default:
          if ($automatic_insertion >= AI_AUTOMATIC_INSERTION_CUSTOM_HOOK && $automatic_insertion < AI_AUTOMATIC_INSERTION_CUSTOM_HOOK + 20) {
            $hook_index = $automatic_insertion - AI_AUTOMATIC_INSERTION_CUSTOM_HOOK;
            foreach ($page_types as $block_page_type) $custom_hook_blocks [$hook_index][$block_page_type][]= $block;
            $custom_hook_blocks [$hook_index][AI_PT_ANY][]= $block;
          }
          break;
      }
    }

    $automatic           = $automatic_insertion         != AI_AUTOMATIC_INSERTION_DISABLED;
    $manual_widget       = $obj->get_enable_widget()     == AI_ENABLED;
    $manual_shortcode    = $obj->get_enable_manual()     == AI_ENABLED;
    $manual_php_function = $obj->get_enable_php_call()   == AI_ENABLED;
    if ($enabled_insertion && ($automatic || ($manual_widget && in_array ($block, $widget_blocks)) || $manual_shortcode || $manual_php_function)) {
      $active_blocks []= $block;

      $obj->extract_features ();
    }
  }

  $extract [AI_EXTRACT_USED_BLOCKS] = serialize ($active_blocks);

  if (isset ($settings [AI_HEADER_OPTION_NAME])) {
    $obj->wp_options = $settings [AI_HEADER_OPTION_NAME];
    if ($obj->get_enable_manual () && $obj->get_detection_server_side())  $ai_wp_data [AI_SERVER_SIDE_DETECTION] = true;
  }

  if (isset ($settings [AI_FOOTER_OPTION_NAME])) {
    $obj->wp_options = $settings [AI_FOOTER_OPTION_NAME];
    if ($obj->get_enable_manual () && $obj->get_detection_server_side())  $ai_wp_data [AI_SERVER_SIDE_DETECTION] = true;
  }

  $extract [AI_EXTRACT_FEATURES] = array (
    AI_MOBILE_DETECT_JS           => $ai_wp_data [AI_MOBILE_DETECT_JS],
    AI_SERVER_SIDE_DETECTION      => $ai_wp_data [AI_SERVER_SIDE_DETECTION],
    AI_CLIENT_SIDE_DETECTION      => $ai_wp_data [AI_CLIENT_SIDE_DETECTION],
    AI_CLIENT_SIDE_INSERTION      => $ai_wp_data [AI_CLIENT_SIDE_INSERTION],
    AI_STICK_TO_THE_CONTENT       => $ai_wp_data [AI_STICK_TO_THE_CONTENT],
    AI_TRACKING                   => $ai_wp_data [AI_TRACKING],
    AI_CLOSE_BUTTONS              => $ai_wp_data [AI_CLOSE_BUTTONS],
    AI_PARALLAX                   => $ai_wp_data [AI_PARALLAX],
    AI_CHECK_BLOCK                => $ai_wp_data [AI_CHECK_BLOCK],
    AI_IFRAMES                    => $ai_wp_data [AI_IFRAMES],
    AI_ANIMATION                  => $ai_wp_data [AI_ANIMATION],
    AI_LAZY_LOADING               => $ai_wp_data [AI_LAZY_LOADING],
    AI_GEOLOCATION                => $ai_wp_data [AI_GEOLOCATION]
  );

  $ai_wp_data = $temp_ai_wp_data;


  if (defined ('AI_BUFFERING')) {
    $extract [ABOVE_HEADER_HOOK_BLOCKS] = $above_header_hook_blocks;
    $extract [HTML_ELEMENT_HOOK_BLOCKS] = $html_element_hook_blocks;
  }

  $extract [CONTENT_HOOK_BLOCKS]          = $content_hook_blocks;
  $extract [EXCERPT_HOOK_BLOCKS]          = $excerpt_hook_blocks;
  $extract [LOOP_START_HOOK_BLOCKS]       = $loop_start_hook_blocks;
  $extract [LOOP_END_HOOK_BLOCKS]         = $loop_end_hook_blocks;
  $extract [POST_HOOK_BLOCKS]             = $post_hook_blocks;
  $extract [BEFORE_COMMENTS_HOOK_BLOCKS]  = $before_comments_hook_blocks;
  $extract [BETWEEN_COMMENTS_HOOK_BLOCKS] = $between_comments_hook_blocks;
  $extract [AFTER_COMMENTS_HOOK_BLOCKS]   = $after_comments_hook_blocks;
  $extract [FOOTER_HOOK_BLOCKS]           = $footer_hook_blocks;

  for ($custom_hook = 1; $custom_hook <= 20; $custom_hook ++) {
    $action = get_hook_action ($custom_hook);

    if (get_hook_enabled ($custom_hook) && get_hook_name ($custom_hook) != '' && $action != '') {

      $custom_hook_extract_index = $action . CUSTOM_HOOK_BLOCKS;

      if (isset ($extract [$custom_hook_extract_index])) {
        // Custom hook on WP hook used by the plugin - merge blocks
        foreach ($extract [$custom_hook_extract_index] as $page_type => $blocks) {
          $extract [$custom_hook_extract_index][$page_type] = array_merge ($blocks, $custom_hook_blocks [$custom_hook - 1][$page_type]);
        }
      } else $extract [$custom_hook_extract_index] = $custom_hook_blocks [$custom_hook - 1];

    }
  }


  $extract_version = $version_string . $subversion_string . '-' . '96';
  if (function_exists ('ai_system_output_check')) {
    $extract_version .= 'P';
  }
  $extract ['VERSION'] = $extract_version;

  $extract ['TIMESTAMP'] = time ();

  return ($extract);
}

function ai_load_settings () {
  global $ai_db_options, $block_object, $ai_wp_data, $version_string, $ai_custom_hooks;

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) ai_log ("LOAD SETTINGS START");

  ai_load_options ();

  if (!is_array ($ai_db_options)) {
    $ai_db_options = array ();
    define ('AI_SETTINGS_ERROR', true);
  }

  $extract_ok = ai_load_extract (false);

  $ai_custom_hooks = array ();
  for ($hook = 1; $hook <= 20; $hook ++) {
    $name   = get_hook_name   ($hook);
    $action = get_hook_action ($hook);

    if (get_hook_enabled ($hook) && $name != '' && $action != '') {
      $ai_custom_hooks [] = array ('index' => $hook, 'name' => $name, 'action' => $action, 'priority' => get_hook_priority ($hook));
    }
  }

  $features_in_extract = $extract_ok && isset ($ai_db_options [AI_OPTION_EXTRACT][AI_EXTRACT_FEATURES]);

  if (isset ($ai_db_options [AI_OPTION_EXTRACT][AI_EXTRACT_USED_BLOCKS]) && is_string ($ai_db_options [AI_OPTION_EXTRACT][AI_EXTRACT_USED_BLOCKS]) && strlen ($ai_db_options [AI_OPTION_EXTRACT][AI_EXTRACT_USED_BLOCKS]) != 0) {
    $used_blocks = @unserialize ($ai_db_options [AI_OPTION_EXTRACT][AI_EXTRACT_USED_BLOCKS]);
  } else $used_blocks = false;

  $obj = new ai_Block (0);                  // translators: block name (block with default settings)
  $obj->wp_options [AI_OPTION_BLOCK_NAME] = _x('Default', 'Block name', 'ad-inserter');
  $block_object [0] = $obj;

  for ($block = 1; $block <= 96; $block ++) {
    $obj = new ai_Block ($block);

    $obj->load_options ($block);
    $block_object [$block] = $obj;

    if (!$features_in_extract && (!is_array ($used_blocks) || in_array ($block, $used_blocks))) $obj->extract_features ();
  }

  $adH  = new ai_AdH();
  $adF  = new ai_AdF();
  $adH->load_options (AI_HEADER_OPTION_NAME);
  $adF->load_options (AI_FOOTER_OPTION_NAME);
  $block_object [AI_HEADER_OPTION_NAME]       = $adH;
  $block_object [AI_FOOTER_OPTION_NAME]       = $adF;

  if ($features_in_extract) {
    $ai_wp_data [AI_MOBILE_DETECT_JS]          = $ai_db_options [AI_OPTION_EXTRACT][AI_EXTRACT_FEATURES][AI_MOBILE_DETECT_JS];
    $ai_wp_data [AI_SERVER_SIDE_DETECTION]     = $ai_db_options [AI_OPTION_EXTRACT][AI_EXTRACT_FEATURES][AI_SERVER_SIDE_DETECTION];
    $ai_wp_data [AI_CLIENT_SIDE_DETECTION]     = $ai_db_options [AI_OPTION_EXTRACT][AI_EXTRACT_FEATURES][AI_CLIENT_SIDE_DETECTION];
    $ai_wp_data [AI_CLIENT_SIDE_INSERTION]     = $ai_db_options [AI_OPTION_EXTRACT][AI_EXTRACT_FEATURES][AI_CLIENT_SIDE_INSERTION];
    $ai_wp_data [AI_STICK_TO_THE_CONTENT]      = $ai_db_options [AI_OPTION_EXTRACT][AI_EXTRACT_FEATURES][AI_STICK_TO_THE_CONTENT];
    $ai_wp_data [AI_TRACKING]                  = $ai_db_options [AI_OPTION_EXTRACT][AI_EXTRACT_FEATURES][AI_TRACKING];
    $ai_wp_data [AI_CLOSE_BUTTONS]             = $ai_db_options [AI_OPTION_EXTRACT][AI_EXTRACT_FEATURES][AI_CLOSE_BUTTONS];
    $ai_wp_data [AI_PARALLAX]                  = $ai_db_options [AI_OPTION_EXTRACT][AI_EXTRACT_FEATURES][AI_PARALLAX];
    $ai_wp_data [AI_CHECK_BLOCK]               = $ai_db_options [AI_OPTION_EXTRACT][AI_EXTRACT_FEATURES][AI_CHECK_BLOCK];
    $ai_wp_data [AI_IFRAMES]                   = $ai_db_options [AI_OPTION_EXTRACT][AI_EXTRACT_FEATURES][AI_IFRAMES];
    $ai_wp_data [AI_ANIMATION]                 = $ai_db_options [AI_OPTION_EXTRACT][AI_EXTRACT_FEATURES][AI_ANIMATION];
    $ai_wp_data [AI_LAZY_LOADING]              = $ai_db_options [AI_OPTION_EXTRACT][AI_EXTRACT_FEATURES][AI_LAZY_LOADING];
    $ai_wp_data [AI_GEOLOCATION]               = $ai_db_options [AI_OPTION_EXTRACT][AI_EXTRACT_FEATURES][AI_GEOLOCATION];
  } else {
      if ($adH->get_enable_manual () && $adH->get_detection_server_side())  $ai_wp_data [AI_SERVER_SIDE_DETECTION] = true;
      if ($adF->get_enable_manual () && $adF->get_detection_server_side())  $ai_wp_data [AI_SERVER_SIDE_DETECTION] = true;
    }

  if (defined ('AI_ADBLOCKING_DETECTION') && AI_ADBLOCKING_DETECTION) {
    $adA  = new ai_AdA();
    $adA->load_options (AI_ADB_MESSAGE_OPTION_NAME);
    $block_object [AI_ADB_MESSAGE_OPTION_NAME]  = $adA;
    $ai_wp_data [AI_ADB_DETECTION] = $adA->get_enable_manual ();
  }

  if (($install_timestamp = get_option (AI_INSTALL_NAME)) !== false) {
    $install    = new DateTime (date('Y-m-d H:i:s', $install_timestamp));
    $now        = new DateTime (date('Y-m-d H:i:s', time()));
    if (method_exists ($install, 'diff')) {
      $ai_wp_data [AI_INSTALL_TIME_DIFFERENCE] = $install->diff ($now);
      $ai_wp_data [AI_DAYS_SINCE_INSTAL]       = $ai_wp_data [AI_INSTALL_TIME_DIFFERENCE]->days;
    }
  }

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) ai_log ("LOAD SETTINGS END");
}


function ai_compare_viewport ($a, $b) {

 if ($a ['width'] == $b ['width']) return 0;
 return ($a ['width'] > $b ['width']) ? - 1 : 1;
}

function generate_viewport_css () {

  $viewports = array ();
  for ($viewport = 1; $viewport <= 6; $viewport ++) {
    $viewport_name  = get_viewport_name ($viewport);
    $viewport_width = get_viewport_width ($viewport);
    if ($viewport_name != '') {
      $viewports []= array ('index' => $viewport, 'name' => $viewport_name, 'width' => $viewport_width);
    }
  }

  usort ($viewports, 'ai_compare_viewport');

  $viewport_styles = '';
  $number_of_viewports = count ($viewports);
  if ($number_of_viewports != 0) {
    $viewport_styles = ".ai-viewports                 {--ai: 1;}\n";  // Mark unprocessed block for viewports, also dummy style to prevent not loading viewport rules when optimizers join them with other (broken) styles on the page
    foreach ($viewports as $index => $viewport) {
      if ($index == 0) {
        foreach (array_reverse ($viewports) as $index2 => $viewport2) {
          if ($index2 != $number_of_viewports - 1) {
            $viewport_styles .= ".ai-viewport-" . $viewport2 ['index'] . "                { display: none !important;}\n";
          }
        }
        $viewport_styles .= ".ai-viewport-".$viewports [0]['index']."                { display: inherit !important;}\n";
        $viewport_styles .= ".ai-viewport-0                { display: none !important;}\n";
      } else {
          $viewport_styles .= "@media ";
          if ($viewport ['width'] != 0)
            $viewport_styles .= "(min-width: " . $viewport ['width'] . "px) and ";
          $viewport_styles .= "(max-width: " . ($viewports [$index - 1]['width'] - 1) . "px) {\n";
          foreach ($viewports as $index2 => $viewport2) {
            if ($index2 == 0)
              $viewport_styles .= ".ai-viewport-" . $viewport2 ['index'] . "                { display: none !important;}\n";
            elseif ($index == $index2)
              $viewport_styles .= ".ai-viewport-" . $viewport2 ['index'] . "                { display: inherit !important;}\n";

          }
          $viewport_styles .= "}\n";
        }
    }
  }
  return ($viewport_styles);
}

function get_main_alignment_css ($alt_styles_text) {
  if (strpos ($alt_styles_text, "||") !== false) {
    $styles = explode ("||", $alt_styles_text);
    return $styles [0];
  }
  return $alt_styles_text;
}

function ai_change_css ($css, $property, $value) {
  $styles = explode (';', $css);
  $replaced = false;
  foreach ($styles as $index => $style) {
    if (strpos (trim ($style), $property) === 0) {
      $styles [$index] = preg_replace ('/\:\s*(.+)/', ': ' . $value, $styles [$index]);
      $replaced = true;
      break;
    }
  }

  $new_style = implode (';', $styles);

  if (!$replaced) {
    $new_style = rtrim ($new_style, '; ');
    return  $new_style . '; ' . $property . ': ' . $value . ';';
  }

  return  $new_style;
}

function generate_alignment_css () {
  global $ai_db_options_extract, $block_object;

  $block_class_name = get_block_class_name (true) . '-';

  $styles = array ();

  $styles [AI_ALIGNMENT_DEFAULT]      = array (AI_TEXT_ENG_DEFAULT,      get_main_alignment_css (AI_ALIGNMENT_CSS_DEFAULT));
  $styles [AI_ALIGNMENT_LEFT]         = array (AI_TEXT_ENG_LEFT,         get_main_alignment_css (AI_ALIGNMENT_CSS_LEFT));
  $styles [AI_ALIGNMENT_RIGHT]        = array (AI_TEXT_ENG_RIGHT,        get_main_alignment_css (AI_ALIGNMENT_CSS_RIGHT));
  $styles [AI_ALIGNMENT_CENTER]       = array (AI_TEXT_ENG_CENTER,       get_main_alignment_css (AI_ALIGNMENT_CSS_CENTER));
  $styles [AI_ALIGNMENT_FLOAT_LEFT]   = array (AI_TEXT_ENG_FLOAT_LEFT,   get_main_alignment_css (AI_ALIGNMENT_CSS_FLOAT_LEFT));
  $styles [AI_ALIGNMENT_FLOAT_RIGHT]  = array (AI_TEXT_ENG_FLOAT_RIGHT,  get_main_alignment_css (AI_ALIGNMENT_CSS_FLOAT_RIGHT));

  if (function_exists ('generate_alignment_css_2')) $styles = array_replace ($styles, generate_alignment_css_2 ());

  $alignment_css = '';
  $alignments = array ();
  $used_blocks = unserialize ($ai_db_options_extract [AI_EXTRACT_USED_BLOCKS]);
  foreach ($used_blocks as $used_block) {
    $obj = $block_object [$used_block];
    $alignment_type = $obj->get_alignment_type ();

    switch ($alignment_type) {
      case AI_ALIGNMENT_DEFAULT:
      case AI_ALIGNMENT_LEFT:
      case AI_ALIGNMENT_RIGHT:
      case AI_ALIGNMENT_CENTER:
      case AI_ALIGNMENT_FLOAT_LEFT:
      case AI_ALIGNMENT_FLOAT_RIGHT:
//      case AI_ALIGNMENT_STICKY_LEFT:
//      case AI_ALIGNMENT_STICKY_RIGHT:
//      case AI_ALIGNMENT_STICKY_TOP:
//      case AI_ALIGNMENT_STICKY_BOTTOM:
        $alignment_name = strtolower ($styles [$alignment_type][0]);
        if (!in_array ($alignment_name, $alignments)) {
          $alignments []= $alignment_name;
          $alignment_css .= '.' . $block_class_name . str_replace (' ', '-', $alignment_name) .' {' . $styles [$alignment_type][1] . "}\n";
        }
        break;
      case AI_ALIGNMENT_STICKY:
        $sticky_css = $obj->alignment_style ($alignment_type);
        $alignment_name = strtolower (md5 ($sticky_css));
        if (!in_array ($alignment_name, $alignments)) {
          $alignments []= $alignment_name;
//          $alignment_css .= '.' . $block_class_name . str_replace (' ', '-', $alignment_name) .' {' . $sticky_css . "}\n";
          $alignment_css .= '.' . $block_class_name . $alignment_name .' {' . $sticky_css . "}\n";
        }
        break;
      case AI_ALIGNMENT_CUSTOM_CSS:
        $custom_css = $obj->get_custom_css ();
        $alignment_name = strtolower (md5 ($custom_css));
        if (!in_array ($alignment_name, $alignments)) {
          $alignments []= $alignment_name;
//          $alignment_css .= '.' . $block_class_name . str_replace (' ', '-', $alignment_name) .' {' . str_replace ('&#039;', "'", $custom_css) . "}\n";
          $alignment_css .= '.' . $block_class_name . $alignment_name .' {' . str_replace ('&#039;', "'", $custom_css) . "}\n";
        }
        break;
    }

    if ($alignment_type != AI_ALIGNMENT_CUSTOM_CSS) {
      $size_css = $obj->size_background_style ();
//      $size_name = strtolower (md5 ($size_css));
      $size_name = ai_css_to_name ($size_css);
      if (!in_array ($size_name, $alignments)) {
        $alignments []= $size_name;
        $alignment_css .= '.' . $block_class_name . $size_name .' {' . str_replace ('&#039;', "'", $size_css) . "}\n";
      }
    }
  }

  return $alignment_css;
}

function generate_debug_css_base () {
?>

.ai-debug-block {padding: 0; margin: 0;}

<?php
}

function generate_debug_css () {
?>

.ai-debug-tags {font-weight: bold; color: white; padding: 2px;}
.ai-debug-positions {clear: both; text-align: center; padding: 10px 0; font-family: arial; font-weight: bold; line-height: 20px; border: 1px solid blue; color: blue; background: #eef;}
.ai-debug-positions.ai-images {border: 1px solid #444; color: #444; background: #fff9ab;}
.ai-debug-page-type {text-align: center; padding: 10px 0; font-family: arial; font-weight: bold; line-height: 20px; border: 1px solid #000; color: #000; background: #fff;}
.ai-debug-status {clear: both; text-align: center; padding: 10px 0; font-family: arial; font-weight: bold; line-height: 20px; border: 1px solid #eee; color: #666; background: #eee;}
.ai-debug-status.status-ok, .ai-debug-status.adb-off {border: 1px solid green; color: green; background: #efe;}
.ai-debug-status.status-error, .ai-debug-status.adb-on {border: 1px solid red; color: red; background: #fee;}
.ai-debug-adb {opacity: 0.85; cursor: pointer;}
.ai-debug-widget {margin: 0; padding: 0 5px; font-size: 10px; white-space: pre; overflow-x: auto; overflow-y: hidden;}
a.ai-debug-left {float: left; cursor: default; font-size: 10px; text-decoration: none; color: transparent; padding: 0px 10px 0 0; border: 0; box-shadow: none;}
a.ai-debug-right {float: right; cursor: default; font-size: 10px; text-decoration: none; color: #88f; padding: 0px 10px 0 0; border: 0; box-shadow: none;}
a.ai-debug-center {text-align: center; cursor: default; font-size: 10px; text-decoration: none; color: white; padding: 0px 10px 0 0; border: 0; box-shadow: none;}
.ai-debug-invisible {display: none;}
.ai-debug-content-hook-positions {color: blue;}
.ai-debug-removed-html-tags {color: red;}
.ai-debug-rnrn {background: #0ff; color: #000;}
.ai-debug-p {background: #0a0;}
.ai-debug-div {background: #46f;}
.ai-debug-h {background: #d4e;}
.ai-debug-img {background: #ee0; color: #000;}
.ai-debug-pre {background: #222;}
.ai-debug-span {background: #cff; color: #000;}
.ai-debug-special {background: #fb0; color: #000;}

.ai-debug-ad-overlay {position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #8f8; opacity: 0.6; z-index: 999999990}

.ai-debug-block ins.adsbygoogle[data-ad-status="unfilled"] .ai-debug-ad-overlay {display: none;}
.ai-debug-block ins.adsbygoogle[data-ad-status="unfilled"] {background: url(http://via.placeholder.com/800x800/aaffaa/000000.png?text=NO%20AD%20SERVED); background-size: cover; background-repeat: no-repeat; background-position: center;}

.ai-auto-ads {background-color: #84f;}
.ai-no-slot {background-color: #48f;}
.ai-debug-ad-info {position: absolute; top: 0; left: 0; overflow: hidden; width: auto; height: auto; font-family: arial; font-size: 11px; line-height: 11px; text-align: left; z-index: 999999991;}
.ai-info {display: inline-block; padding: 2px 4px;}
.ai-info-1 {background: #000; color: #fff;}
.ai-info-2 {background: #fff; color: #000;}

.ai-debug-block {outline: 1px solid;}
.ai-debug-bar {background: #666;}

.ai-debug-block kbd kbd {font-weight: normal;}

.ai-debug-code {margin: 0; padding: 0; border: 0; font-family: monospace, sans-serif; font-size: 12px; line-height: 13px; background: #fff; color: #000;}

.ai-debug-code.ai-code-org {float: left; max-width: 47%;}
.ai-debug-code.ai-code-inserted {float: right; max-width: 47%;}

.ai-debug-block.ai-debug-default {border-color: #e00; outline-color: #e00;}
.ai-debug-bar.ai-debug-default {background: #e00;}

.ai-debug-bar.ai-debug-no-wrapping kbd {color: #ff0;}

.ai-debug-block.ai-debug-viewport-invisible {border-color: #00f; outline-color: #00f;}
.ai-debug-bar.ai-debug-viewport-invisible {background: #00f;}

.ai-debug-block.ai-debug-amp {border-color: #0c0; outline-color: #0c0;}
.ai-debug-bar.ai-debug-amp {background: #0c0;}

.ai-debug-block.ai-debug-fallback {border-color: #a0f; outline-color: #a0f;}
.ai-debug-bar.ai-debug-fallback {background: #a0f;}

.ai-debug-block.ai-debug-script {border-color: #00bae6; outline-color: #00bae6; background: #eee;}
.ai-debug-bar.ai-debug-script {background: #00bae6;}

.ai-debug-block.ai-debug-cookie {border-color: #9be3ff; outline-color: #9be3ff; background: #eee;}
.ai-debug-bar.ai-debug-cookie {background: #9be3ff;}
.ai-debug-bar.ai-debug-cookie kbd {color: #000;}

.ai-debug-block.ai-debug-filter {border-color: #9be3ff; outline-color: #9be3ff; background: #eee;}
.ai-debug-bar.ai-debug-filter {background: #9be3ff;}
.ai-debug-bar.ai-debug-filter kbd {color: #000;}

.ai-debug-block.ai-debug-adb-status {border-color: #000; outline-color: #000;}
.ai-debug-bar.ai-debug-adb-status {background: #000;}

.ai-debug-block.ai-debug-adsense {border-color: #e0a; outline-color: #e0a;}
.ai-debug-bar.ai-debug-adsense {background: #e0a;}

.ai-debug-block.ai-debug-adsense.ai-adsense-auto-ads {position: absolute; top: -20px; width: 100%;}

.ai-debug-block.ai-debug-ajax {border-color: #ffd600; outline-color: #ffd600;}
.ai-debug-bar.ai-debug-ajax {background: #ffd600;}
.ai-debug-bar.ai-debug-ajax kbd {color: #000;}

.ai-debug-block.ai-debug-iframe {border-color: #ff9e38; outline-color: #ff9e38; line-height: 1px;}
.ai-debug-bar.ai-debug-iframe {background: #ff9e38;}
.ai-debug-bar.ai-debug-iframe kbd {color: #000;}
.ai-debug-block.ai-debug-iframe .ai-attributes {line-height: initial;}

.ai-debug-adb-status.on kbd {color: #f00;}
.ai-debug-adb-status.off kbd {color: #0f0;}

.ai-debug-block.ai-debug-lists {border-color: #00c5be; outline-color: #00c5be;}
.ai-debug-bar.ai-debug-lists {background: #00c5be;}

.ai-debug-block.ai-debug-scheduling {border-color: #00c5be; outline-color: #00c5be;}
.ai-debug-bar.ai-debug-scheduling {background: #00c5be;}

.ai-debug-adb-hidden {visibility: hidden; display: none;}
.ai-debug-adb-center {text-align: center; font-weight: bold; margin: 0; padding: 4px 0;}

.ai-debug-bar {margin: 0; padding: 1px 0 1px 5px; color: white; font-size: 12px; font-family: arial; font-weight: normal; line-height: 20px; text-align: center; overflow: hidden; word-break: break-word;}

.ai-debug-bar .ai-debug-text-left {float: left; text-align: left;}
.ai-debug-bar .ai-debug-text-right {float: right; text-align: right; padding-right: 3px;}
.ai-debug-bar .ai-debug-text-center {text-align: center;}

.ai-debug-lists .ai-debug-text-left, .ai-debug-viewport-invisible .ai-debug-text-left, .ai-debug-filter .ai-debug-text-left {min-width: 40%;}
.ai-debug-lists .ai-debug-text-right, .ai-debug-viewport-invisible .ai-debug-text-right, .ai-debug-filter .ai-debug-text-right {min-width: 40%;}

.ai-debug-message {text-align: center; font-weight: bold;}

.ai-debug-bar kbd {margin: 0; padding: 0; color: #fff; font-size: inherit; font-family: arial; background-color: transparent; text-shadow: none; border: 0; box-shadow: none;}

.ai-debug-visibility-hidden {visibility: hidden}

.ai-debug-display-none {display: none}

.ai-debug-block pre {direction: ltr; text-align: left; margin: 0; padding: 2px 5px 2px; line-height: 14px; background: #fff; color: #000; font-family: monospace; font-size: 12px;}

pre.ai-w3tc-debug {font-size: 12px;}

pre.ai-w3tc-debug.ai-w3tc-run {color: #00f;}

pre.ai-processing-log {direction: ltr; text-align: left; padding: 10px; background: #eee; color: #000; font-family: monospace; font-size: 12px; line-height: 18px; white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap; word-wrap: break-word;}

.ai-debug-bar.ai-debug-lists.ai-debug-iab-tcf-2 kbd.ai-debug-text-left, .ai-debug-bar.ai-debug-lists.ai-debug-iab-tcf-2 kbd.ai-debug-text-right {
  min-width: 10%;
}

<?php
}


function ai_css_to_name ($css) {
  return strtolower (rtrim (str_replace (array ('width', 'height', 'background', ' ', ':', ';', '#'), array ('w', 'h', 'b', '', '-', '-', ''), $css), '-'));
}

function generate_selection_css () {
?>
#ai-selector-data {
  position: fixed;
  top: 0;
  z-index: 999999;
  background: #fff;
  width: 100%;
  border: 1px solid #000;
}
#ai-selector-data kbd {
  background-color: #fff;
  box-shadow: none;
}
#ai-selector-data table {
  width: 100%;
  margin: 5px;
}
#ai-selector-data td {
  padding: 5px 10px;
  vertical-align: middle;
}
#ai-selector-data td button {
  margin: 0 15px;
}
#ai-selector-data .ui-button-text-only .ui-button-text {
  padding: 3px 10px;
}
#ai-selector-data td.data-name {
  width: 100px;
}
#ai-selector-element, #ai-selector-path {
  user-select: text;
}
#ai-selector {
  width: 100%;
  display: inline-block;
  border-radius: 4px;
  font-size: 12px;
  font-family: Courier, 'Courier New', monospace;
  font-weight: bold;
}
.ai-highlighted {
  outline: 3px dashed #00f;
  background: rgba(50, 140, 220, 0.2);
  cursor: default;
}
.ai-selected {
  outline: 3px dashed #f00;
  background: rgba(255, 0, 0, 0.2);
}
.ai-highlighted.ai-selected {
}
.ai-html-element {
  color: #00a;
  cursor: pointer;
}
.ai-html-element:hover {
  color: #00f;
}

#ai-selector-data .ui-button.ui-corner-all.ui-widget {
  border: 1px solid #d3d3d3;
  background: #e6e6e6 url(<?php echo plugins_url ('css/images/ui-bg_glass_75_e6e6e6_1x400.png', __FILE__); ?>) 50% 50% repeat-x;
  color: rgb(85, 85, 85);
}


<?php
}

function ai_settings () {
  global $ai_db_options, $block_object, $wpdb, $ai_db_options_extract;

  if (is_multisite() && !is_main_site () && !multisite_settings_page_enabled ()) return;

  if (!current_user_can ('manage_options')) {
    return;
  }

  $settings_data_valid = true;
  if (function_exists ('ai_check_remote_connection')) {
    if (!ai_check_remote_connection ()) {
      if (isset ($_POST [AI_FORM_SAVE]) ||
          isset ($_POST [AI_FORM_CLEAR]) ||
          isset ($_POST [AI_FORM_CLEAR_EXCEPTIONS]) ||
          isset ($_POST [AI_FORM_CLEAR_STATISTICS])
         ) {
                                                                                                                            // translators: %s: Ad Inserter
        echo '<div class="notice notice-error is-dismissible" style="margin: 5px 15px 2px 0px;"><p>' . sprintf (__('Invalid data received - %s settings not saved.', 'ad-inserter'), AD_INSERTER_NAME) . '</p></div>';
      }
      $settings_data_valid = false;
    }
  }

  if (isset ($_POST [AI_FORM_SAVE]) && $settings_data_valid) {

    check_admin_referer ('save_adinserter_settings');

    $subpage = 'main';
    $start =  1;
    $end   = 16;

    $button_keys = array (AI_FORM_SAVE, AI_FORM_CLEAR_EXCEPTIONS);

    $settings_ok = true;
    $settings_errors = array ();

    if (isset ($_GET ['start']) && is_numeric ($start) && $start >= 1 && $start <= 96) $start = (int) $_GET ['start']; else $start = 1;
    $end = min ($start + 15, 96);

    $invalid_blocks = array ();

    $import_switch_name = AI_OPTION_IMPORT . WP_FORM_FIELD_POSTFIX . '0';
    if (isset ($_POST [$import_switch_name]) && $_POST [$import_switch_name] == "1") {
      // Import Ad Inserter settings

      $settings = str_replace (array ("\\\""), array ("\""), $_POST ["export_settings_0"]);
      if (substr ($settings, 0, 4) === ':AI:') {
        $settings = substr ($settings, 4);
      }

      $ai_options = @unserialize (base64_decode ($settings));

      if ($ai_options === false) {
        // Use saved settings
        $ai_options = wp_slash ($ai_db_options);
        $invalid_blocks []= 0;
        $settings_ok = false;
        $settings_errors []= 'Import plugin settings: unserialize failed';
      } else $ai_options = wp_slash ($ai_options);
    } else {
        // Try to import individual settings
        $ai_options = array ();

        $default_block = new ai_Block (1);
        for ($block = 1; $block <= 96; $block ++) {
          if (isset ($ai_db_options [$block])) $saved_settings = wp_slash ($ai_db_options [$block]); else
            $saved_settings = array ();

          if ($block < $start || $block > $end) {
            // Block not on the settings page
            $ai_options [$block] = $saved_settings;
            continue;
          }

          $import_switch_name      = AI_OPTION_IMPORT      . WP_FORM_FIELD_POSTFIX . $block;
          $import_name_switch_name = AI_OPTION_IMPORT_NAME . WP_FORM_FIELD_POSTFIX . $block;
          if (isset ($_POST [$import_switch_name]) && $_POST [$import_switch_name] == "1") {
            // Try to import block settings
            $exported_settings = @unserialize (base64_decode (str_replace (array ("\\\""), array ("\""), $_POST ["export_settings_" . $block])));

            if ($exported_settings !== false) {
              $exported_settings = wp_slash ($exported_settings);
              foreach (array_keys ($default_block->wp_options) as $key){
                if ($key == AI_OPTION_BLOCK_NAME && isset ($_POST [$import_name_switch_name]) && $_POST [$import_name_switch_name] != "1") {
                  $form_field_name = $key . WP_FORM_FIELD_POSTFIX . $block;
                  if (isset ($_POST [$form_field_name])){
                    $ai_options [$block][$key] = filter_option ($key, $_POST [$form_field_name]);
                  }
                } else {
                    if (isset ($exported_settings [$key])) {
                      $ai_options [$block][$key] = filter_option ($key, $exported_settings [$key], false);
                    }
                  }
              }
            } else {
                // Block import failed - use existing settings
                $ai_options [$block] = $saved_settings;
                $invalid_blocks []= $block;
              }
          } else {
              // Process block settings
              foreach (array_keys ($default_block->wp_options) as $key){
                $form_field_name = $key . WP_FORM_FIELD_POSTFIX . $block;
                if (isset ($_POST [$form_field_name])){
                  $field_value = $_POST [$form_field_name];

//                  if ($key == AI_OPTION_CODE && strpos ($field_value, ':AI:') === 0) {
                  if ($key == AI_OPTION_CODE && substr ($field_value, 0, 4) === ':AI:') {
                    $code = base64_decode (substr ($field_value, 4), true);

                    if ($code !== false) {
                      $field_value = wp_slash ($code);
                    } else {
                        $field_value = '';
                        $settings_ok = false;
                        $settings_errors []= "Block $block code: base64_decode failed";
                      }
                  }

                  $ai_options [$block][$key] = filter_option ($key, $field_value);
                }
              }


              if (!isset ($ai_options [$block]) || count ($ai_options [$block]) == 0) {
                if (isset ($_POST ['block-parameters-' . $block])) {
                  $block_options = json_decode (base64_decode ($_POST ['block-parameters-' . $block]));

                  if (is_array ($block_options)) {
                    foreach ($button_keys as $button_key) {
                      $button_index = array_search ($button_key, $block_options);
                      if ($button_index !== false) {
                        unset ($block_options [$button_index]);
                      }
                    }

                    if (count ($block_options) != 0) {
                      $settings_ok = false;
                      $settings_errors []= "Missing settings for block $block: " . implode (', ', $block_options);
                    }
                  } else {
                      $settings_ok = false;
                      $settings_errors []= "Invalid parameter names for block $block";
                    }
                } else {
                    $settings_ok = false;
                    $settings_errors []= "Missing parameter names for block $block";
                  }
              }
            }

          delete_option (str_replace ("#", $block, AD_ADx_OPTIONS));
        }

        $default_block_H  = new ai_AdH();
        $wp_options = array ();
        foreach(array_keys ($default_block_H->wp_options) as $key){
          $form_field_name = $key . WP_FORM_FIELD_POSTFIX . AI_HEADER_OPTION_NAME;
          if(isset ($_POST [$form_field_name])){
            $field_value = $_POST [$form_field_name];

            if ($key == AI_OPTION_CODE && strpos ($field_value, ':AI:') === 0) {
              $code = base64_decode (substr ($field_value, 4), true);
              if ($code !== false) {
                $field_value = wp_slash ($code);
              } else {
                  $field_value = '';
                  $settings_ok = false;
                  $settings_errors []= "Header code: base64_decode failed";
                }
            }

            $wp_options [$key] = filter_option_hf ($key, $field_value);
          }
        }
        $ai_options [AI_HEADER_OPTION_NAME] = $wp_options;

        $default_block_F  = new ai_AdF();
        $wp_options = array ();
        foreach(array_keys($default_block_F->wp_options) as $key){
          $form_field_name = $key . WP_FORM_FIELD_POSTFIX . AI_FOOTER_OPTION_NAME;
          if(isset ($_POST [$form_field_name])){
            $field_value = $_POST [$form_field_name];

            if ($key == AI_OPTION_CODE && strpos ($field_value, ':AI:') === 0) {
              $code = base64_decode (substr ($field_value, 4), true);
              if ($code !== false) {
                $field_value = wp_slash ($code);
              } else {
                  $field_value = '';
                  $settings_ok = false;
                  $settings_errors []= "Footer code: base64_decode failed";
                }

            }

            $wp_options [$key] = filter_option_hf ($key, $field_value);
          }
        }
        $ai_options [AI_FOOTER_OPTION_NAME] = $wp_options;

        if (defined ('AI_ADBLOCKING_DETECTION') && AI_ADBLOCKING_DETECTION) {
          $default_block_A  = new ai_AdA();
          $wp_options = array ();
          foreach(array_keys($default_block_A->wp_options) as $key){
            $form_field_name = $key . WP_FORM_FIELD_POSTFIX . AI_ADB_MESSAGE_OPTION_NAME;
            if(isset ($_POST [$form_field_name])){
              $field_value = $_POST [$form_field_name];

              if ($key == AI_OPTION_CODE && strpos ($field_value, ':AI:') === 0) {
                $code = base64_decode (substr ($field_value, 4), true);
                if ($code !== false) {
                  $field_value = wp_slash ($code);
                } else {
                    $field_value = '';
                    $settings_ok = false;
                  $settings_errors []= "Ad blocking message code: base64_decode failed";
                  }
                }

              $wp_options [$key] = filter_option_hf ($key, $field_value);
            }
          }
          $ai_options [AI_ADB_MESSAGE_OPTION_NAME]  = $wp_options;
        }

        $options = array ();

        $ai_options = apply_filters ('ai_save_settings', $ai_options);

        if (function_exists ('ai_filter_global_settings')) ai_filter_global_settings ($options);

        if (isset ($_POST ['syntax-highlighter-theme']))            $options ['SYNTAX_HIGHLIGHTER_THEME']     = filter_string ($_POST ['syntax-highlighter-theme']);
        if (isset ($_POST ['block-class-name']))                    $options ['BLOCK_CLASS_NAME']             = filter_html_class ($_POST ['block-class-name']);
        if (isset ($_POST ['block-class']))                         $options ['BLOCK_CLASS']                  = filter_option ('BLOCK_CLASS',                   $_POST ['block-class']);
        if (isset ($_POST ['block-number-class']))                  $options ['BLOCK_NUMBER_CLASS']           = filter_option ('BLOCK_NUMBER_CLASS',            $_POST ['block-number-class']);
        if (isset ($_POST ['block-name-class']))                    $options ['BLOCK_NAME_CLASS']             = filter_option ('BLOCK_NAME_CLASS',              $_POST ['block-name-class']);
        if (isset ($_POST ['inline-styles']))                       $options ['INLINE_STYLES']                = filter_option ('INLINE_STYLES',                 $_POST ['inline-styles']);
        if (isset ($_POST ['minimum-user-role']))                   $options ['MINIMUM_USER_ROLE']            = filter_string ($_POST ['minimum-user-role']);
        if (isset ($_POST ['sticky-widget-mode']))                  $options ['STICKY_WIDGET_MODE']           = filter_option ('STICKY_WIDGET_MODE',            $_POST ['sticky-widget-mode']);
        if (isset ($_POST ['sticky-widget-margin']))                $options ['STICKY_WIDGET_MARGIN']         = filter_option ('STICKY_WIDGET_MARGIN',          $_POST ['sticky-widget-margin']);
        if (isset ($_POST ['lazy-loading-offset']))                 $options ['LAZY_LOADING_OFFSET']          = filter_option ('LAZY_LOADING_OFFSET',           $_POST ['lazy-loading-offset']);
        if (isset ($_POST ['cfp']))                                 $options ['CLICK_FRAUD_PROTECTION']       = filter_option ('CLICK_FRAUD_PROTECTION',        $_POST ['cfp']);
        if (isset ($_POST ['cfp-time']))                            $options ['CLICK_FRAUD_PROTECTION_TIME']  = filter_option ('CLICK_FRAUD_PROTECTION_TIME',   $_POST ['cfp-time']);
        if (isset ($_POST ['global-visitor-limit-cpt']))            $options ['GLOBAL_VISITOR_LIMIT_CPT']     = filter_option ('GLOBAL_VISITOR_LIMIT_CPT',      $_POST ['global-visitor-limit-cpt']);
        if (isset ($_POST ['global-visitor-limit-time']))           $options ['GLOBAL_VISITOR_LIMIT_TIME']    = filter_option ('GLOBAL_VISITOR_LIMIT_TIME',     $_POST ['global-visitor-limit-time']);
        if (isset ($_POST ['cfp-block-ip-address']))                $options ['CFP_BLOCK_IP_ADDRESS']         = filter_option ('CFP_BLOCK_IP_ADDRESS',          $_POST ['cfp-block-ip-address']);
        if (isset ($_POST ['max-page-blocks']))                     $options ['MAX_PAGE_BLOCKS']              = filter_option ('MAX_PAGE_BLOCKS',               $_POST ['max-page-blocks']);
        if (isset ($_POST ['plugin_priority']))                     $options ['PLUGIN_PRIORITY']              = filter_option ('PLUGIN_PRIORITY',               $_POST ['plugin_priority']);
        if (isset ($_POST ['tab-setup-delay']))                     $options ['TAB_SETUP_DELAY']              = filter_option ('TAB_SETUP_DELAY',               $_POST ['tab-setup-delay']);
        if (isset ($_POST ['dynamic_blocks']))                      $options ['DYNAMIC_BLOCKS']               = filter_option ('DYNAMIC_BLOCKS',                $_POST ['dynamic_blocks']);
        if (isset ($_POST ['paragraph_counting_functions']))        $options ['PARAGRAPH_COUNTING_FUNCTIONS'] = filter_option ('PARAGRAPH_COUNTING_FUNCTIONS',  $_POST ['paragraph_counting_functions']);
        if (isset ($_POST ['output-buffering']))                    $options ['OUTPUT_BUFFERING']             = filter_option ('OUTPUT_BUFFERING',              $_POST ['output-buffering']);
        if (isset ($_POST ['disable-caching-admin']))               $options ['DISABLE_CACHING']              = filter_option ('DISABLE_CACHING',               $_POST ['disable-caching-admin']);
        if (isset ($_POST ['wait-for-jquery']))                     $options ['WAIT_FOR_JQUERY']              = filter_option ('WAIT_FOR_JQUERY',               $_POST ['wait-for-jquery']);
        if (isset ($_POST ['no-paragraph-counting-inside']))        $options ['NO_PARAGRAPH_COUNTING_INSIDE'] = filter_option ('NO_PARAGRAPH_COUNTING_INSIDE',  $_POST ['no-paragraph-counting-inside']);
        if (isset ($_POST ['ad-label']))                            $options ['AD_LABEL']                     = filter_option ('AD_LABEL',                      $_POST ['ad-label']);
        if (isset ($_POST ['main-content-element']))                $options ['MAIN_CONTENT_ELEMENT']         = filter_option ('MAIN_CONTENT_ELEMENT',          $_POST ['main-content-element']);
        if (isset ($_POST [AI_OPTION_ADB_DEVICES]))                 $options ['ADB_DEVICES']                  = filter_option ('ADB_DEVICES',                   $_POST [AI_OPTION_ADB_DEVICES]);
        if (isset ($_POST [AI_OPTION_ADB_ACTION]))                  $options ['ADB_ACTION']                   = filter_option ('ADB_ACTION',                    $_POST [AI_OPTION_ADB_ACTION]);
        if (isset ($_POST [AI_OPTION_ADB_NO_ACTION]))               $options ['ADB_NO_ACTION']                = filter_option ('ADB_NO_ACTION',                 $_POST [AI_OPTION_ADB_NO_ACTION]);
        if (isset ($_POST [AI_OPTION_ADB_DELAY_ACTION]))            $options ['ADB_DELAY_ACTION']             = filter_option ('ADB_DELAY_ACTION',              $_POST [AI_OPTION_ADB_DELAY_ACTION]);
        if (isset ($_POST [AI_OPTION_ADB_NO_ACTION_PERIOD]))        $options ['ADB_NO_ACTION_PERIOD']         = filter_option ('ADB_NO_ACTION_PERIOD',          $_POST [AI_OPTION_ADB_NO_ACTION_PERIOD]);
        if (isset ($_POST [AI_OPTION_ADB_SELECTORS]))               $options ['ADB_SELECTORS']                = filter_option ('ADB_SELECTORS',                 $_POST [AI_OPTION_ADB_SELECTORS]);
        if (isset ($_POST [AI_OPTION_ADB_REDIRECTION_PAGE]))        $options ['ADB_REDIRECTION_PAGE']         = filter_option ('ADB_REDIRECTION_PAGE',          $_POST [AI_OPTION_ADB_REDIRECTION_PAGE]);
        if (isset ($_POST [AI_OPTION_ADB_CUSTOM_REDIRECTION_URL]))  $options ['ADB_CUSTOM_REDIRECTION_URL']   = filter_option ('ADB_CUSTOM_REDIRECTION_URL',    $_POST [AI_OPTION_ADB_CUSTOM_REDIRECTION_URL]);
        if (isset ($_POST [AI_OPTION_ADB_MESSAGE_CSS]))             $options ['ADB_MESSAGE_CSS']              = filter_option ('ADB_MESSAGE_CSS',               $_POST [AI_OPTION_ADB_MESSAGE_CSS]);
        if (isset ($_POST [AI_OPTION_ADB_OVERLAY_CSS]))             $options ['ADB_OVERLAY_CSS']              = filter_option ('ADB_OVERLAY_CSS',               $_POST [AI_OPTION_ADB_OVERLAY_CSS]);
        if (isset ($_POST [AI_OPTION_ADB_UNDISMISSIBLE_MESSAGE]))   $options ['ADB_UNDISMISSIBLE_MESSAGE']    = filter_option ('ADB_UNDISMISSIBLE_MESSAGE',     $_POST [AI_OPTION_ADB_UNDISMISSIBLE_MESSAGE]);
        if (isset ($_POST [AI_OPTION_ADB_EXTERNAL_SCRIPTS]))        $options ['ADB_EXTERNAL_SCRIPTS']         = filter_option ('ADB_EXTERNAL_SCRIPTS',          $_POST [AI_OPTION_ADB_EXTERNAL_SCRIPTS]);
        if (isset ($_POST [AI_OPTION_ADB_NO_UNDISMISSIBLE_MESSAGE]))$options ['ADB_NO_UNDISMISSIBLE_MESSAGE'] = filter_option ('ADB_NO_UNDISMISSIBLE_MESSAGE',  $_POST [AI_OPTION_ADB_NO_UNDISMISSIBLE_MESSAGE]);
        if (isset ($_POST ['force_admin_toolbar']))                 $options ['FORCE_ADMIN_TOOLBAR']          = filter_option ('FORCE_ADMIN_TOOLBAR',           $_POST ['force_admin_toolbar']);
        if (isset ($_POST ['admin_toolbar_debugging']))             $options ['ADMIN_TOOLBAR_DEBUGGING']      = filter_option ('ADMIN_TOOLBAR_DEBUGGING',       $_POST ['admin_toolbar_debugging']);
        if (isset ($_POST ['admin_toolbar_mobile']))                $options ['ADMIN_TOOLBAR_MOBILE']         = filter_option ('ADMIN_TOOLBAR_MOBILE',          $_POST ['admin_toolbar_mobile']);
        if (isset ($_POST ['remote_debugging']))                    $options ['REMOTE_DEBUGGING']             = filter_option ('REMOTE_DEBUGGING',              $_POST ['remote_debugging']);
        if (isset ($_POST ['disable_translation']))                 $options ['DISABLE_TRANSLATION']          = filter_option ('DISABLE_TRANSLATION',           $_POST ['disable_translation']);
        if (isset ($_POST ['backend_js_debugging']))                $options ['BACKEND_JS_DEBUGGING']         = filter_option ('BACKEND_JS_DEBUGGING',          $_POST ['backend_js_debugging']);
        if (isset ($_POST ['frontend_js_debugging']))               $options ['FRONTEND_JS_DEBUGGING']        = filter_option ('FRONTEND_JS_DEBUGGING',         $_POST ['frontend_js_debugging']);
        if (isset ($_POST ['disable-blocks']))                      $options ['DISABLE_BLOCK_INSERTIONS']     = filter_option ('DISABLE_BLOCK_INSERTIONS',      $_POST ['disable-blocks']);
        if (isset ($_POST ['disable-php-processing']))              $options ['DISABLE_PHP_PROCESSING']       = filter_option ('DISABLE_PHP_PROCESSING',        $_POST ['disable-php-processing']);
        if (isset ($_POST ['disable-html-code']))                   $options ['DISABLE_HTML_CODE']            = filter_option ('DISABLE_HTML_CODE',             $_POST ['disable-html-code']);
        if (isset ($_POST ['disable-css-code']))                    $options ['DISABLE_CSS_CODE']             = filter_option ('DISABLE_CSS_CODE',              $_POST ['disable-css-code']);
        if (isset ($_POST ['disable-js-code']))                     $options ['DISABLE_JS_CODE']              = filter_option ('DISABLE_JS_CODE',               $_POST ['disable-js-code']);
        if (isset ($_POST ['disable-footer-code']))                 $options ['DISABLE_FOOTER_CODE']          = filter_option ('DISABLE_FOOTER_CODE',           $_POST ['disable-footer-code']);
        if (isset ($_POST ['disable-header-code']))                 $options ['DISABLE_HEADER_CODE']          = filter_option ('DISABLE_HEADER_CODE',           $_POST ['disable-header-code']);

        for ($viewport = 1; $viewport <= 6; $viewport ++) {
          if (isset ($_POST ['viewport-name-'.$viewport]))  $options ['VIEWPORT_NAME_'.$viewport]   = filter_string ($_POST ['viewport-name-'.$viewport]);
          if (isset ($_POST ['viewport-width-'.$viewport])) $options ['VIEWPORT_WIDTH_'.$viewport]  = filter_option ('viewport_width', $_POST ['viewport-width-'.$viewport]);
        }

        for ($hook = 1; $hook <= 20; $hook ++) {
          if (isset ($_POST ['hook-enabled-'.$hook]))  $options ['HOOK_ENABLED_'.$hook]   = filter_option ('HOOK_ENABLED', $_POST ['hook-enabled-'.$hook]);
          if (isset ($_POST ['hook-name-'.$hook]))     $options ['HOOK_NAME_'.$hook]      = filter_string_tags ($_POST ['hook-name-'.$hook]);
          if (isset ($_POST ['hook-action-'.$hook]))   $options ['HOOK_ACTION_'.$hook]    = filter_string ($_POST ['hook-action-'.$hook]);
          if (isset ($_POST ['hook-priority-'.$hook])) $options ['HOOK_PRIORITY_'.$hook]  = filter_option ('HOOK_PRIORITY', $_POST ['hook-priority-'.$hook]);
        }

        $ai_options [AI_OPTION_GLOBAL] = ai_check_plugin_options ($options);
      }

    if (!empty ($invalid_blocks)) {
      if ($invalid_blocks [0] == 0) {                                                               // translators: %s: Ad Inserter
             echo '<div class="notice notice-error is-dismissible" style="margin: 5px 15px 2px 0px;"><p>'. sprintf (__('Error importing %s settings.', 'ad-inserter'), AD_INSERTER_NAME) . '</p></div>';
      } else echo '<div class="notice notice-error is-dismissible" style="margin: 5px 15px 2px 0px;"><p>'. _n('Error importing settings for block', 'Error importing settings for blocks:', count ($invalid_blocks), 'ad-inserter') , ' ', implode (', ', $invalid_blocks) . '</p></div>';
    }

    if ($settings_ok) {

      // Multisite
      $multisite_options = array ();
      if (function_exists ('ai_filter_multisite_settings')) ai_filter_multisite_settings ($multisite_options);
      ai_check_multisite_options ($multisite_options);

      ai_save_options ($ai_options, $multisite_options);

      if (function_exists ('ai_load_globals')) ai_load_globals ();

      if (defined ('AI_PLUGIN_TRACKING') && AI_PLUGIN_TRACKING) {
        if (isset ($_POST ['plugin-usage-tracking'])) {
          global $ai_dst;
          if (isset ($ai_dst) && is_object ($ai_dst)) {
            $ai_dst->set_tracking ((bool) $_POST ['plugin-usage-tracking']);
          }
        }
      }

      echo '<div class="notice notice-success is-dismissible" style="margin: 5px 15px 2px 0px;"><p>' . __('Settings saved.', 'ad-inserter') . '</p></div>';
    } else {                                                                                                    // translators: %s: Ad Inserter
        echo '<div class="notice notice-error is-dismissible" style="margin: 5px 15px 2px 0px;"><p>' . sprintf (__('Invalid data received - %s settings not saved.', 'ad-inserter'), AD_INSERTER_NAME) . '</p>';
        if (!empty ($settings_errors)) {
          foreach ($settings_errors as $settings_error) {
            echo '<div>', $settings_error, '</div>';
          }
        }
        echo '</div>';
      }
  } elseif (isset ($_POST [AI_FORM_CLEAR]) && $settings_data_valid) {

      check_admin_referer ('save_adinserter_settings');

      if (function_exists ('ai_clear_settings_2')) {
        $remote_cleared = ai_clear_settings_2 ();
      } else $remote_cleared = false;

      if (!$remote_cleared) {
        ai_clear_settings ();
      }

      echo '<div class="notice notice-warning is-dismissible" style="margin: 5px 15px 2px 0px;"><p><strong>' . __('Settings cleared.', 'ad-inserter') . '</strong></p></div>';
  } elseif (isset ($_POST [AI_FORM_CLEAR_EXCEPTIONS]) && $settings_data_valid) {

      check_admin_referer ('save_adinserter_settings');

      if (ai_current_user_role_ok () && (!is_multisite() || is_main_site () || multisite_exceptions_enabled ())) {

        if (function_exists ('ai_clear_exceptions_2')) {
          $remote_cleared = ai_clear_exceptions_2 ();
        } else $remote_cleared = false;

        if (!$remote_cleared) {
          ai_clear_exceptions ();
        }
      }
  } elseif (isset ($_POST [AI_FORM_CLEAR_STATISTICS]) && is_numeric ($_POST [AI_FORM_CLEAR_STATISTICS]) && $settings_data_valid) {

      check_admin_referer ('save_adinserter_settings');

      if (function_exists ('ai_clear_statistics_2')) {
        $remote_cleared = ai_clear_statistics_2 ();
      } else $remote_cleared = false;

      if (!$remote_cleared) {
        ai_clear_statistics ();
      }
  }

  generate_settings_form ();
}


function ai_adinserter ($block_parameter, $options, &$block) {
  global $block_object, $ad_inserter_globals, $ai_wp_data, $ai_last_check;

  $debug_processing = ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0;

  if ($block_parameter == "") return "";
  $block_number = $block_parameter;

  if (!is_numeric ($block_parameter)) {
    $function_block_parameter = strtolower ($block_parameter);
    for ($counter = 1; $counter <= 96; $counter ++) {
      $obj = $block_object [$counter];
      $ad_name = strtolower (trim ($obj->get_ad_name()));
      if ($function_block_parameter == $ad_name) {
        $block_number = $counter;
        break;
      }
    }
  }

  if (!is_numeric ($block_number)) return "";

  $block = (int) $block_number;

  if ($block < 1 || $block > 96) return "";

  $globals_name = AI_PHP_FUNCTION_CALL_COUNTER_NAME . $block;

  if (!isset ($ad_inserter_globals [$globals_name])) {
    $ad_inserter_globals [$globals_name] = 1;
  } else $ad_inserter_globals [$globals_name] ++;

  if ($debug_processing) ai_log ("PHP FUNCTION CALL adinserter ($block_parameter".($options == '' ? '' : (', \''.$options.'\''))."), block $block [" . $ad_inserter_globals [$globals_name] . ']');

  $ai_wp_data [AI_CONTEXT] = AI_CONTEXT_PHP_FUNCTION;

  $options_array = array ();
  if (trim ($options) != '') {
    $options_array = explode (",", str_replace (" ", "", $options));

    if (in_array ("server-side", $options_array)) {
      $ai_wp_data [AI_DYNAMIC_BLOCKS] = AI_DYNAMIC_BLOCKS_SERVER_SIDE;
    }
    elseif (in_array ("client-side-show", $options_array)) {
      $ai_wp_data [AI_DYNAMIC_BLOCKS] = AI_DYNAMIC_BLOCKS_CLIENT_SIDE_SHOW;
    }
    elseif (in_array ("client-side-insert", $options_array)) {
      $ai_wp_data [AI_DYNAMIC_BLOCKS] = AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT;
    }
    elseif (in_array ("server-side-w3c", $options_array)) {
      $ai_wp_data [AI_DYNAMIC_BLOCKS] = AI_DYNAMIC_BLOCKS_SERVER_SIDE_W3TC;
    }
  }

  $obj = $block_object [$block];
  $obj->clear_code_cache ();

  $ai_last_check = AI_CHECK_ENABLED_PHP;
  if (!$obj->get_enable_php_call ()) return "";
  if (!$obj->check_server_side_detection ()) return "";
                                                   /* Deprecated */
  if (!$obj->check_page_types_lists_users (in_array ("page-type", $options_array) || in_array ("ignore-page-type", $options_array))) return "";
  if (!$obj->check_filter ($ad_inserter_globals [$globals_name])) return "";
  if (!$obj->check_number_of_words ()) return "";

  if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_POST || $ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_STATIC) {
//    $meta_value = get_post_meta (get_the_ID (), '_adinserter_block_exceptions', true);
    $meta_value = ai_get_post_meta ();

    $selected_blocks = explode (",", $meta_value);

    if (!$obj->check_post_page_exceptions ($selected_blocks)) return "";
  }

  $ai_last_check = AI_CHECK_DISABLED_MANUALLY;
  if (!$obj->check_disabled ()) return "";

  $ai_last_check = AI_CHECK_INSERTION_NOT_DISABLED;
  if ($obj->get_disable_insertion () || get_disable_block_insertions ()) return "";

  // Last check before counter check before insertion
//  $ai_last_check = AI_CHECK_CODE;
//  if ($obj->ai_getCode () == '') return "";
  if ($obj->empty_code ()) return "";

  $max_page_blocks_enabled = $obj->get_max_page_blocks_enabled ();

  if ($max_page_blocks_enabled) {
    $ai_last_check = AI_CHECK_MAX_PAGE_BLOCKS;
    if ($ai_wp_data [AI_PAGE_BLOCKS] >= get_max_page_blocks ()) return "";
  }

  if (!$obj->check_filter_hook ($debug_processing)) return "";

  // Last check before insertion
  if (!$obj->check_and_increment_block_counter ()) return "";

  // Increment page block counter
  if ($max_page_blocks_enabled) $ai_wp_data [AI_PAGE_BLOCKS] ++;

  $ai_last_check = AI_CHECK_DEBUG_NO_INSERTION;
  if ($obj->get_debug_disable_insertion ()) return "";

  $code = $obj->get_code_for_serverside_insertion ();
  // Must be after get_code_for_serverside_insertion ()
  $ai_last_check = AI_CHECK_INSERTED;

  unset ($ai_wp_data [AI_DYNAMIC_BLOCKS]);

  return $code;
}

function adinserter ($block = '', $options = '') {
  global $ai_last_check, $ai_wp_data, $ai_total_plugin_time;

  $debug_processing = ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0;
  if ($debug_processing) {
    $ai_processing_time_active = $ai_wp_data [AI_PROCESSING_TIME];
    $ai_wp_data [AI_PROCESSING_TIME] = true;
    $start_time = microtime (true);
  }


  $ai_last_check = AI_CHECK_NONE;
  $block_number = 0;
  $code = ai_adinserter ($block, $options, $block_number);

  if ($debug_processing) {
    if (!$ai_processing_time_active) {
      $ai_total_plugin_time += microtime (true) - $start_time;
      $ai_wp_data [AI_PROCESSING_TIME] = false;
    }
    if ($ai_last_check != AI_CHECK_NONE) ai_log (ai_log_block_status ($block_number, $ai_last_check));
    ai_log ("PHP FUNCTION CALL END: ". number_format (1000 * (microtime (true) - $start_time), 2)." ms\n");
  }

  return $code;
}



function ai_content_hook ($content = '') {
  global $block_object, $ad_inserter_globals, $ai_db_options_extract, $ai_wp_data, $ai_last_check, $ai_total_plugin_time, $special_element_tags;

  if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_ADMIN) return $content;

  $debug_processing = ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0;

  // TEMP CHECK
  if (get_plugin_priority () % 2 == 1) {
    if (strpos ($content, '<!-- ' . AI_CONTENT_MARKER) !== false) {
      if ($debug_processing) {
        ai_log ("THE CONTENT ALREADY PROCESSED\n");
      }

      return $content;
    }
  }

  $globals_name = AI_CONTENT_COUNTER_NAME;

  $special_element_tags = explode (',', str_replace (' ', '', get_no_paragraph_counting_inside ()));

  if (!isset ($ad_inserter_globals [$globals_name])) {
    $ad_inserter_globals [$globals_name] = 1;
  } else $ad_inserter_globals [$globals_name] ++;

  if ($debug_processing) {
    ai_log ("CONTENT HOOK START [" . $ad_inserter_globals [$globals_name]  . (in_the_loop () ? ', IN THE LOOP' : ', NOT IN THE LOOP') . ']');
    $ai_processing_time_active = $ai_wp_data [AI_PROCESSING_TIME];
    $ai_wp_data [AI_PROCESSING_TIME] = true;
    $start_time = microtime (true);
  }

  $ai_wp_data [AI_CONTEXT] = AI_CONTEXT_CONTENT;

  $content_words = number_of_words ($content);
  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_POSITIONS) != 0) {
    $preview = $block_object [0];
    $positions_inserted = false;

    if ($ai_wp_data [AI_WP_DEBUG_BLOCK] == 0) {
      $content = $preview->before_paragraph ($content, true);
      $content = $preview->after_paragraph ($content, true);
      $positions_inserted = true;
    }

    $content = $preview->before_paragraph ($content, true, true);
    $content = $preview->after_paragraph ($content, true, true);
  }

  if ($ai_db_options_extract [CONTENT_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) {
    if ($debug_processing) ai_log_content ($content);

    if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_POST || $ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_STATIC) {
//      $meta_value = get_post_meta (get_the_ID (), '_adinserter_block_exceptions', true);
      $meta_value = ai_get_post_meta ();

      $selected_blocks = explode (",", $meta_value);

      ai_log ("INDIVIDUAL EXCEPTIONS [" . $meta_value . ']');

    } else $selected_blocks = array ();

    $ai_last_check = AI_CHECK_NONE;
    $current_block = 0;
    $in_the_loop = in_the_loop ();

    if (isset ($ai_db_options_extract [CONTENT_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]))
    foreach ($ai_db_options_extract [CONTENT_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]] as $block) {
      if ($debug_processing && $ai_last_check != AI_CHECK_NONE) ai_log (ai_log_block_status ($current_block, $ai_last_check));

      if (!isset ($block_object [$block])) continue;

      $ai_last_check = AI_CHECK_NONE;
      $current_block = $block;

      $obj = $block_object [$block];
      $obj->clear_code_cache ();

      if ($in_the_loop || !$obj->get_only_in_the_loop ()) {
        if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_POSITIONS) != 0 && !$positions_inserted && $ai_wp_data [AI_WP_DEBUG_BLOCK] <= $block) {
          $preview = $block_object [$ai_wp_data [AI_WP_DEBUG_BLOCK]];

          $content = $preview->before_paragraph ($content, true);
          $content = $preview->after_paragraph ($content, true);

          $positions_inserted = true;
        }

        if (!$obj->check_server_side_detection ()) continue;
        if (!$obj->check_page_types_lists_users ()) continue;
        if (!$obj->check_post_page_exceptions ($selected_blocks)) continue;
        if (!$obj->check_filter ($ad_inserter_globals [$globals_name])) continue;
        if (!$obj->check_number_of_words ($content, $content_words)) continue;

        $ai_last_check = AI_CHECK_DISABLED_MANUALLY;
        if (!$obj->check_disabled ()) continue;

        // Deprecated
        if ($obj->display_disabled ($content)) continue;

        $ai_last_check = AI_CHECK_INSERTION_NOT_DISABLED;
        if ($obj->get_disable_insertion () || get_disable_block_insertions ()) continue;

        // Last check before counter check before insertion
        if ($obj->empty_code ()) continue;

        $max_page_blocks_enabled = $obj->get_max_page_blocks_enabled ();
        if ($max_page_blocks_enabled) {
          $ai_last_check = AI_CHECK_MAX_PAGE_BLOCKS;
          if ($ai_wp_data [AI_PAGE_BLOCKS] >= get_max_page_blocks ()) continue;
        }

        if (!$obj->check_filter_hook ($debug_processing)) continue;

        $automatic_insertion = $obj->get_automatic_insertion();

        if ($automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_PARAGRAPH) {
          $ai_last_check = AI_CHECK_PARAGRAPH_COUNTING;
          $content = $obj->before_paragraph ($content);
        }
        elseif ($automatic_insertion == AI_AUTOMATIC_INSERTION_AFTER_PARAGRAPH) {
          $ai_last_check = AI_CHECK_PARAGRAPH_COUNTING;
          $content = $obj->after_paragraph ($content);
        }
        if ($automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_IMAGE) {
          $ai_last_check = AI_CHECK_IMAGE_COUNTING;
          $content = $obj->before_image ($content);
        }
        elseif ($automatic_insertion == AI_AUTOMATIC_INSERTION_AFTER_IMAGE) {
          $ai_last_check = AI_CHECK_IMAGE_COUNTING;
          $content = $obj->after_image ($content);
        }
        elseif ($automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_CONTENT) {
          // Last check before insertion
          if (!$obj->check_and_increment_block_counter ()) continue;

          // Increment page block counter
          if ($max_page_blocks_enabled) $ai_wp_data [AI_PAGE_BLOCKS] ++;

          $ai_last_check = AI_CHECK_DEBUG_NO_INSERTION;
          if (!$obj->get_debug_disable_insertion ()) {
            $content = $obj->get_code_for_serverside_insertion () . $content;
            $ai_last_check = AI_CHECK_INSERTED;
          }
        }
        elseif ($automatic_insertion == AI_AUTOMATIC_INSERTION_AFTER_CONTENT) {
          // Last check before insertion
          if (!$obj->check_and_increment_block_counter ()) continue;

          // Increment page block counter
          if ($max_page_blocks_enabled) $ai_wp_data [AI_PAGE_BLOCKS] ++;

          $ai_last_check = AI_CHECK_DEBUG_NO_INSERTION;
          if (!$obj->get_debug_disable_insertion ()) {
            $content = $content . $obj->get_code_for_serverside_insertion ();
            $ai_last_check = AI_CHECK_INSERTED;
          }
        }
      }
    }
    if ($debug_processing && $ai_last_check != AI_CHECK_NONE) ai_log (ai_log_block_status ($current_block, $ai_last_check));
  }


  if (function_exists ('ai_content')) ai_content ($content);

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_TAGS) != 0) {
    $class = AI_DEBUG_TAGS_CLASS;

    $content = preg_replace ("/\r\n\r\n/", "\r\n\r\n<kbd class='$class ai-debug-rnrn'>\\r\\n\\r\\n</kbd>", $content);

//    $content = preg_replace ("/<p>/i", "<p><kbd class='$class ai-debug-p'>&lt;p&gt;</kbd>", $content);
//    $content = preg_replace ("/<p ([^>]*?)>/i", "<p$1><kbd class='$class ai-debug-p'>&lt;p$1&gt;</kbd>", $content);          // Full p tags
    $content = preg_replace ("/<p([^>]*?)>/i", "<p$1><kbd class='$class ai-debug-p'>&lt;p&gt;</kbd>", $content);
//      $content = preg_replace ("/<div([^>]*?)>/i", "<div$1><kbd class='$class ai-debug-div'>&lt;div$1&gt;</kbd>", $content);  // Full div tags
    $content = preg_replace ("/<div([^>]*?)>/i", "<div$1><kbd class='$class ai-debug-div'>&lt;div&gt;</kbd>", $content);
    $content = preg_replace ("/<h([1-6])([^>]*?)>/i", "<h$1$2><kbd class='$class ai-debug-h'>&lt;h$1&gt;</kbd>", $content);
    $content = preg_replace ("/<img([^>]*?)>/i", "<img$1><kbd class='$class ai-debug-img'>&lt;img$1&gt;</kbd>", $content);
    $content = preg_replace ("/<pre([^>]*?)>/i", "<pre$1><kbd class='$class ai-debug-pre'>&lt;pre&gt;</kbd>", $content);
    $content = preg_replace ("/<span([^>]*?)>/i", "<kbd class='$class ai-debug-span'>&lt;span&gt;</kbd><span$1>", $content);
    $content = preg_replace ("/<(?!section|ins|script|kbd|a|strong|pre|span|p|div|h[1-6]|img)([a-z0-9]+)([^>]*?)>/i", "<$1$2><kbd class='$class ai-debug-special'>&lt;$1$2&gt;</kbd>", $content);

    $content = preg_replace ("/<\/p>/i", "<kbd class='$class ai-debug-p'>&lt;/p&gt;</kbd></p>", $content);
    $content = preg_replace ("/<\/div>/i", "<kbd class='$class ai-debug-div'>&lt;/div&gt;</kbd></div>", $content);
    $content = preg_replace ("/<\/h([1-6])>/i", "<kbd class='$class ai-debug-h'>&lt;/h$1&gt;</kbd></h$1>", $content);
    $content = preg_replace ("/<\/pre>/i", "<kbd class='$class ai-debug-pre'>&lt;/pre&gt;</kbd></pre>", $content);
    $content = preg_replace ("/<\/span>/i", "</span><kbd class='$class ai-debug-span'>&lt;/span&gt;</kbd>", $content);
    $content = preg_replace ("/<\/(?!section|ins|script|kbd|a|strong|pre|span|p|div|h[1-6])([a-z0-9]+)>/i", "<kbd class='$class ai-debug-special'>&lt;/$1&gt;</kbd></$1>", $content);
  }

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_POSITIONS) != 0) {
    $class = AI_DEBUG_POSITIONS_CLASS;

    if (!$positions_inserted) {
      $preview = $block_object [$ai_wp_data [AI_WP_DEBUG_BLOCK]];
      $content = $preview->before_paragraph ($content, true);
      $content = $preview->after_paragraph ($content, true);
    }

    if (preg_match_all ("/\[\[AI_BP([\d]+?)=([\d]+?)\]\]/", $content, $matches)) {
      foreach ($matches [0] as $index => $match) {
        $content = str_replace ($match,
          "<section data-ai-position='" .AI_AUTOMATIC_INSERTION_BEFORE_PARAGRAPH ."' class='$class'><a href='#' class='ai-debug-left ai-debug-visibility-hidden'><span class='ai-debug-display-none'>[(]</span>" . $matches [2][$index] . " " . _n('word', 'words', $matches [2][$index], 'ad-inserter') . '<span class="ai-debug-display-none">[)]</span></a>' .
          ($ai_wp_data [AI_MBSTRING_LOADED] ? mb_strtoupper (AI_TEXT_BEFORE_PARAGRAPH) : strtoupper (AI_TEXT_BEFORE_PARAGRAPH)) . ' ' . $matches [1][$index] .
          "<a href='#' class='ai-debug-right'><span class='ai-debug-display-none'>[(]</span>" . $matches [2][$index] . ' ' . _n('word', 'words', $matches [2][$index], 'ad-inserter') . '<span class="ai-debug-display-none">[)]</span></a></section>',
          $content);
      }
    }

    if (preg_match_all ("/\[\[AI_BI([\d]+?)=([\d]+?)\]\]/", $content, $matches)) {
      foreach ($matches [0] as $index => $match) {
        $content = str_replace ($match,
          "<section data-ai-position='" .AI_AUTOMATIC_INSERTION_BEFORE_IMAGE ."' class='$class ai-images'><a href='#' class='ai-debug-left ai-debug-visibility-hidden'><span class='ai-debug-display-none'>[(]</span>".'<span class="ai-debug-display-none">[)]</span></a>' .
          ($ai_wp_data [AI_MBSTRING_LOADED] ? mb_strtoupper (AI_TEXT_BEFORE_IMAGE) : strtoupper (AI_TEXT_BEFORE_IMAGE)) . ' ' . $matches [1][$index] .
          "<a href='#' class='ai-debug-right'><span class='ai-debug-display-none'>[(]</span>" . '<span class="ai-debug-display-none">[)]</span></a></section>',
          $content);
      }
    }

//    $content = preg_replace ("/\[\[AI_BP([\d]+?)=([\d]+?)\]\]/", "<section class='$class'><a class='ai-debug-left' style='visibility: hidden;'><span style='display: none'>[(]</span>$2 " . __('words', 'ad-inserter') . '[)]</a>' . ($ai_wp_data [AI_MBSTRING_LOADED] ? mb_strtoupper (AI_TEXT_BEFORE_PARAGRAPH) : strtoupper (AI_TEXT_BEFORE_PARAGRAPH)) . " $1<a class='ai-debug-right'><span style='display: none'>[(]</span>$2 " . __('word', 'words', 'ad-inserter') . '<span style="display: none">[)]</span></a></section>', $content);
    $content = preg_replace ("/\[\[AI_AP([\d]+?)\]\]/", "<section data-ai-position='" .AI_AUTOMATIC_INSERTION_AFTER_PARAGRAPH ."' class='$class'>" . ($ai_wp_data [AI_MBSTRING_LOADED] ? mb_strtoupper (AI_TEXT_AFTER_PARAGRAPH) : strtoupper (AI_TEXT_AFTER_PARAGRAPH)) . " $1</section>", $content);

    $content = preg_replace ("/\[\[AI_AI([\d]+?)\]\]/", "<section data-ai-position='" .AI_AUTOMATIC_INSERTION_AFTER_IMAGE ."' class='$class ai-images'>" . ($ai_wp_data [AI_MBSTRING_LOADED] ? mb_strtoupper (AI_TEXT_AFTER_IMAGE) : strtoupper (AI_TEXT_AFTER_IMAGE)) . " $1</section>", $content);

    $counter = $ad_inserter_globals [$globals_name];
    if ($counter == 1) $counter = '';

    $content = "<section data-ai-position='" .AI_AUTOMATIC_INSERTION_BEFORE_CONTENT ."' class='$class'><a href='#' class='ai-debug-left ai-debug-visibility-hidden'><span class='ai-debug-display-none'>[(]</span>".$content_words . ' ' . _n('word', 'words', $content_words, 'ad-inserter') . '</a> ' . ($ai_wp_data [AI_MBSTRING_LOADED] ? mb_strtoupper (AI_TEXT_BEFORE_CONTENT): strtoupper (AI_TEXT_BEFORE_CONTENT)) . ' '.$counter."<a href='#' class='ai-debug-right'>".$content_words.' ' . _n('word', 'words', $content_words, 'ad-inserter') . '<span class="ai-debug-display-none">[)]</span></a></section>'. $content;

    if ($ai_wp_data [AI_WP_AMP_PAGE]) {
      $content = get_page_type_debug_info ('AMP ') . $content;
    }

    $content = $content . "<section data-ai-position='" .AI_AUTOMATIC_INSERTION_AFTER_CONTENT ."' class='$class'>" . ($ai_wp_data [AI_MBSTRING_LOADED] ? mb_strtoupper (AI_TEXT_AFTER_CONTENT) : strtoupper (AI_TEXT_AFTER_CONTENT)) . ' '.$counter."</section>";

    if ($ai_wp_data [AI_WP_AMP_PAGE]) {
      $content = $content . get_page_type_debug_info ('AMP ');
    } else $content = $content . get_page_type_debug_info ('');
  }

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_TAGS) != 0) {
    $content = '<kbd class="ai-debug-invisible">[' . __('HTML TAGS REMOVED', 'ad-inserter') . ']</kbd>' . $content;
  }

  if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_AJAX && !$ai_wp_data [AI_CODE_FOR_IFRAME]) {
    if ($ai_wp_data [AI_CLOSE_BUTTONS]) {
      $content .= '<script>if (typeof ai_install_close_buttons == "function") {ai_install_close_buttons (document);}</script>';
    }
  }

  $content .= '<!-- ' . AI_CONTENT_MARKER . ' ' . $ad_inserter_globals [$globals_name] . " -->\n";

  if ($debug_processing) {
    if (!$ai_processing_time_active) {
      $ai_total_plugin_time += microtime (true) - $start_time;
      $ai_wp_data [AI_PROCESSING_TIME] = false;
    }
    ai_log ("CONTENT HOOK END: ". number_format (1000 * (microtime (true) - $start_time), 2)." ms\n");
  }

  return $content;
}

// Process Before/After Excerpt postion
function ai_excerpt_hook ($content = '') {
  global $ad_inserter_globals, $block_object, $ai_db_options_extract, $ai_wp_data, $ai_last_check, $ai_total_plugin_time;

  if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_ADMIN) return;

  $debug_processing = ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0;
  $globals_name = AI_EXCERPT_COUNTER_NAME;

  if (!isset ($ad_inserter_globals [$globals_name])) {
    $ad_inserter_globals [$globals_name] = 1;
  } else $ad_inserter_globals [$globals_name] ++;

  if ($debug_processing) {
    ai_log ("EXCERPT HOOK START [" . $ad_inserter_globals [$globals_name] . ']');
    $ai_processing_time_active = $ai_wp_data [AI_PROCESSING_TIME];
    $ai_wp_data [AI_PROCESSING_TIME] = true;
    $start_time = microtime (true);
  }

  $ai_wp_data [AI_CONTEXT] = AI_CONTEXT_EXCERPT;

  $ai_last_check = AI_CHECK_NONE;
  $current_block = 0;

  if (isset ($ai_db_options_extract [EXCERPT_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]))
  foreach ($ai_db_options_extract [EXCERPT_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]] as $block) {
    if ($debug_processing && $ai_last_check != AI_CHECK_NONE) ai_log (ai_log_block_status ($current_block, $ai_last_check));

    if (!isset ($block_object [$block])) continue;

    $current_block = $block;
    $obj = $block_object [$block];
    $obj->clear_code_cache ();

    if (!$obj->check_server_side_detection ()) continue;
    if (!$obj->check_page_types_lists_users ()) continue;
    if (!$obj->check_filter ($ad_inserter_globals [$globals_name])) continue;

    $ai_last_check = AI_CHECK_DISABLED_MANUALLY;
    if (!$obj->check_disabled ()) continue;

    // Deprecated
    if ($obj->display_disabled ($content)) continue;

    $ai_last_check = AI_CHECK_INSERTION_NOT_DISABLED;
    if ($obj->get_disable_insertion () || get_disable_block_insertions ()) continue;

    // Last check before counter check before insertion
//    $ai_last_check = AI_CHECK_CODE;
//    if ($obj->ai_getCode () == '') continue;
    if ($obj->empty_code ()) continue;

    $max_page_blocks_enabled = $obj->get_max_page_blocks_enabled ();
    if ($max_page_blocks_enabled) {
      $ai_last_check = AI_CHECK_MAX_PAGE_BLOCKS;
      if ($ai_wp_data [AI_PAGE_BLOCKS] >= get_max_page_blocks ()) continue;
    }

    if (!$obj->check_filter_hook ($debug_processing)) continue;

    // Last check before insertion
    if (!$obj->check_and_increment_block_counter ()) continue;

    // Increment page block counter
    if ($max_page_blocks_enabled) $ai_wp_data [AI_PAGE_BLOCKS] ++;

    $ai_last_check = AI_CHECK_DEBUG_NO_INSERTION;
    if (!$obj->get_debug_disable_insertion ()) {

      $automatic_insertion = $obj->get_automatic_insertion ();
      if ($automatic_insertion == AI_AUTOMATIC_INSERTION_BEFORE_EXCERPT)
        $content = $obj->get_code_for_serverside_insertion () . $content; else
          $content = $content . $obj->get_code_for_serverside_insertion ();

      $ai_last_check = AI_CHECK_INSERTED;
    }
  }

  if ($debug_processing && $ai_last_check != AI_CHECK_NONE) ai_log (ai_log_block_status ($current_block, $ai_last_check));

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_POSITIONS) != 0) {
    $class = AI_DEBUG_POSITIONS_CLASS;

    $content = "<section data-ai-position='" .AI_AUTOMATIC_INSERTION_BEFORE_EXCERPT ."' class='$class'>" . ($ai_wp_data [AI_MBSTRING_LOADED] ? mb_strtoupper (AI_TEXT_BEFORE_EXCERPT) : strtoupper (AI_TEXT_BEFORE_EXCERPT)) . ' ' . $ad_inserter_globals [$globals_name]."</section>".
      $content . "<section data-ai-position='" .AI_AUTOMATIC_INSERTION_AFTER_EXCERPT ."' class='$class'>" . ($ai_wp_data [AI_MBSTRING_LOADED] ? mb_strtoupper (AI_TEXT_AFTER_EXCERPT) : strtoupper (AI_TEXT_AFTER_EXCERPT)) . ' ' .$ad_inserter_globals [$globals_name]."</section>";


    // Remove word counts
    $content = preg_replace ("/\[\(\](.+?)\[\)\]/", "", $content);
    $content = preg_replace ("/\[\(\].*/", "", $content);

    // Color positions from the content hook
//    $content = preg_replace ("/((BEFORE|AFTER) (CONTENT|PARAGRAPH) ?[\d]*)/", "<span class='ai-debug-content-hook-positions'> [$1] </span>", $content);
    $content = preg_replace ("/(" . ($ai_wp_data [AI_MBSTRING_LOADED] ? mb_strtoupper (AI_TEXT_BEFORE_CONTENT) :   strtoupper (AI_TEXT_BEFORE_CONTENT)) . " ?[\d]*)/", "<span class='ai-debug-content-hook-positions'> [$1] </span>", $content);
    $content = preg_replace ("/(" . ($ai_wp_data [AI_MBSTRING_LOADED] ? mb_strtoupper (AI_TEXT_AFTER_CONTENT) :    strtoupper (AI_TEXT_AFTER_CONTENT)) . " ?[\d]*)/", "<span class='ai-debug-content-hook-positions'> [$1] </span>", $content);
    $content = preg_replace ("/(" . ($ai_wp_data [AI_MBSTRING_LOADED] ? mb_strtoupper (AI_TEXT_BEFORE_PARAGRAPH) : strtoupper (AI_TEXT_BEFORE_PARAGRAPH)) . " ?[\d]*)/", "<span class='ai-debug-content-hook-positions'> [$1] </span>", $content);
    $content = preg_replace ("/(" . ($ai_wp_data [AI_MBSTRING_LOADED] ? mb_strtoupper (AI_TEXT_AFTER_PARAGRAPH) :  strtoupper (AI_TEXT_AFTER_PARAGRAPH)) . " ?[\d]*)/", "<span class='ai-debug-content-hook-positions'> [$1] </span>", $content);
  }

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_TAGS) != 0) {
    // Remove marked tags from the content hook
    $content = preg_replace ("/&lt;(.+?)&gt;/", "", $content);

    // Color text to mark removed HTML tags
    $content = str_replace ('[' . __('HTML TAGS REMOVED', 'ad-inserter') . ']', '<span class="ai-debug-removed-html-tags">[' . __('HTML TAGS REMOVED', 'ad-inserter') . ']</span>', $content);
  }

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0) {
    // Remove block labels from the content hook
    if (strpos ($content, '>[AI]<') === false)
      $content = preg_replace ("/\[AI\](.+?)\[\/AI\]/", "", $content);
  }

  if ($debug_processing) {
    if (!$ai_processing_time_active) {
      $ai_total_plugin_time += microtime (true) - $start_time;
      $ai_wp_data [AI_PROCESSING_TIME] = false;
    }
    ai_log ("EXCERPT HOOK END: ". number_format (1000 * (microtime (true) - $start_time), 2)." ms\n");
  }

  return $content;
}

function ai_comments_array ($comments , $post_id ){
  global $ai_wp_data;

  $thread_comments = get_option ('thread_comments');
  $comment_counter = 0;
  foreach ($comments as $comment) {
    if (!$thread_comments || empty ($comment->comment_parent))
      $comment_counter ++;
  }
  $ai_wp_data [AI_NUMBER_OF_COMMENTS] = $comment_counter;

  return $comments;
}

function ai_wp_list_comments_args ($args) {
  global $ai_wp_data;

//  print_r ($args);
//  $args['per_page'] = 3;
//  $args['page'] = 2;

  $ai_wp_data ['AI_COMMENTS_SAVED_CALLBACK'] = $args ['callback'];
  $args ['callback'] = 'ai_comment_callback';

  $ai_wp_data ['AI_COMMENTS_SAVED_END_CALLBACK'] = $args ['end-callback'];
  $args ['end-callback'] = 'ai_comment_end_callback';

  return $args;
}

// Process comments counter + Before Comments postion
function ai_comment_callback ($comment, $args, $depth) {
  global $block_object, $ad_inserter_globals, $ai_db_options_extract, $ai_wp_data, $ai_last_check, $ai_total_plugin_time, $ai_walker;

  if ($depth == 1) {
    if (!isset ($ad_inserter_globals [AI_COMMENT_COUNTER_NAME])) {
      $ad_inserter_globals [AI_COMMENT_COUNTER_NAME] = 1;
    } else $ad_inserter_globals [AI_COMMENT_COUNTER_NAME] ++;
  }

  $debug_processing = ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0;
  if ($debug_processing) {
    ai_log ('COMMENT START HOOK START [' . $ad_inserter_globals [AI_COMMENT_COUNTER_NAME] . ':'. $depth . ']');
    $ai_processing_time_active = $ai_wp_data [AI_PROCESSING_TIME];
    $ai_wp_data [AI_PROCESSING_TIME] = true;
    $start_time = microtime (true);
  }

  if ($depth == 1 && $ad_inserter_globals [AI_COMMENT_COUNTER_NAME] == 1) {

    $ai_wp_data [AI_CONTEXT] = AI_CONTEXT_BEFORE_COMMENTS;

    if ($args ['style'] == 'div') $tag = 'div'; else $tag = 'li';

    if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_POSITIONS) != 0) {

      $class = AI_DEBUG_POSITIONS_CLASS;

      echo "<$tag>\n";
      echo "<section data-ai-position='" .AI_AUTOMATIC_INSERTION_BEFORE_COMMENTS ."' class='$class'>" . __('BEFORE COMMENTS', 'ad-inserter') . '</section>';
      echo "</$tag>\n";
    }

    $ad_code = "";

    $ai_last_check = AI_CHECK_NONE;
    $current_block = 0;

    if (isset ($ai_db_options_extract [BEFORE_COMMENTS_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]))
    foreach ($ai_db_options_extract [BEFORE_COMMENTS_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]] as $block) {
      if ($debug_processing && $ai_last_check != AI_CHECK_NONE) ai_log (ai_log_block_status ($current_block, $ai_last_check));

      if (!isset ($block_object [$block])) continue;

      $current_block = $block;

      $obj = $block_object [$block];
      $obj->clear_code_cache ();

      if (!$obj->check_server_side_detection ()) continue;
      if (!$obj->check_page_types_lists_users ()) continue;
      // No filter check
      if (!$obj->check_number_of_words ()) continue;

      if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_POST || $ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_STATIC) {
        $meta_value = ai_get_post_meta ();
        $selected_blocks = explode (",", $meta_value);
        if (!$obj->check_post_page_exceptions ($selected_blocks)) continue;
      }

      $ai_last_check = AI_CHECK_DISABLED_MANUALLY;
      if (!$obj->check_disabled ()) continue;

      $ai_last_check = AI_CHECK_INSERTION_NOT_DISABLED;
      if ($obj->get_disable_insertion () || get_disable_block_insertions ()) continue;

      // Last check before counter check before insertion
//      $ai_last_check = AI_CHECK_CODE;
//      if ($obj->ai_getCode () == '') continue;
      if ($obj->empty_code ()) continue;

      $max_page_blocks_enabled = $obj->get_max_page_blocks_enabled ();
      if ($max_page_blocks_enabled) {
        $ai_last_check = AI_CHECK_MAX_PAGE_BLOCKS;
        if ($ai_wp_data [AI_PAGE_BLOCKS] >= get_max_page_blocks ()) continue;
      }

      if (!$obj->check_filter_hook ($debug_processing)) continue;

      // Last check before insertion
      if (!$obj->check_and_increment_block_counter ()) continue;

      // Increment page block counter
      if ($max_page_blocks_enabled) $ai_wp_data [AI_PAGE_BLOCKS] ++;

      $ai_last_check = AI_CHECK_DEBUG_NO_INSERTION;
      if (!$obj->get_debug_disable_insertion ()) {
        $ad_code .= $obj->get_code_for_serverside_insertion ();
        $ai_last_check = AI_CHECK_INSERTED;
      }
    }
    if ($debug_processing && $ai_last_check != AI_CHECK_NONE) ai_log (ai_log_block_status ($current_block, $ai_last_check));

    if ($ad_code != '') {
      echo "<$tag>\n";
      echo $ad_code;
      echo "</$tag>\n";
    }
  }

  if ($debug_processing) {
    if (!$ai_processing_time_active) {
      $ai_total_plugin_time += microtime (true) - $start_time;
      $ai_wp_data [AI_PROCESSING_TIME] = false;
    }
    ai_log ("COMMENT START HOOK END: ". number_format (1000 * (microtime (true) - $start_time), 2)." ms\n");
  }

  if (!empty ($ai_wp_data ['AI_COMMENTS_SAVED_CALLBACK'])) {
    echo call_user_func ($ai_wp_data ['AI_COMMENTS_SAVED_CALLBACK'], $comment, $args, $depth );
  } else {
      $ai_walker->comment_callback ($comment, $args, $depth);
    }
}

// Process Between Comments postion
function ai_comment_end_callback ($comment, $args, $depth) {
  global $block_object, $ad_inserter_globals, $ai_db_options_extract, $ai_wp_data, $ai_last_check, $ai_total_plugin_time;

  if ($args ['style'] == 'div') $tag = 'div'; else $tag = 'li';

  if (!empty ($ai_wp_data ['AI_COMMENTS_SAVED_END_CALLBACK'])) {
    echo call_user_func ($ai_wp_data ['AI_COMMENTS_SAVED_END_CALLBACK'], $comment, $args, $depth);
  } else echo "</$tag><!-- #comment-## -->\n";

  $debug_processing = ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0;
  if ($debug_processing) {
    ai_log ('COMMENT END HOOK START [' . $ad_inserter_globals [AI_COMMENT_COUNTER_NAME] . ':'. ($depth + 1) . ']');
    $ai_processing_time_active = $ai_wp_data [AI_PROCESSING_TIME];
    $ai_wp_data [AI_PROCESSING_TIME] = true;
    $start_time = microtime (true);
  }

  if ($depth == 0) {

    if (isset ($ai_db_options_extract [AFTER_COMMENTS_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]) &&
        $ai_db_options_extract [AFTER_COMMENTS_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]] != 0 &&
        !empty ($args ['per_page']) && !empty ($args ['page'])) {
      $number_of_comments_mod_per_page = $ai_wp_data [AI_NUMBER_OF_COMMENTS] % $args ['per_page'];
      if ($number_of_comments_mod_per_page != 0) {
        $last_page = (int) ($ai_wp_data [AI_NUMBER_OF_COMMENTS] / $args ['per_page']) + 1;
        $last_comment_number = $args ['page'] == $last_page ? $number_of_comments_mod_per_page : $args ['per_page'];
      } else $last_comment_number = $args ['per_page'];
    } else $last_comment_number = $ai_wp_data [AI_NUMBER_OF_COMMENTS];

    if ($ad_inserter_globals [AI_COMMENT_COUNTER_NAME] == $last_comment_number) {

      $ai_wp_data [AI_CONTEXT] = AI_CONTEXT_AFTER_COMMENTS;

      if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_POSITIONS) != 0) {

        $class = AI_DEBUG_POSITIONS_CLASS;

        echo "<$tag>\n";
        echo "<section data-ai-position='" .AI_AUTOMATIC_INSERTION_AFTER_COMMENTS ."' class='$class'>" . __('AFTER COMMENTS', 'ad-inserter') . '</section>';
        echo "</$tag>\n";
      }

      $ad_code = "";

      $ai_last_check = AI_CHECK_NONE;
      $current_block = 0;

      if (isset ($ai_db_options_extract [AFTER_COMMENTS_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]))
      foreach ($ai_db_options_extract [AFTER_COMMENTS_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]] as $block) {
        if ($debug_processing && $ai_last_check != AI_CHECK_NONE) ai_log (ai_log_block_status ($current_block, $ai_last_check));

        if (!isset ($block_object [$block])) continue;

        $current_block = $block;

        $obj = $block_object [$block];
        $obj->clear_code_cache ();

        if (!$obj->check_server_side_detection ()) continue;
        if (!$obj->check_page_types_lists_users ()) continue;
        // No filter check
        if (!$obj->check_number_of_words ()) continue;

        if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_POST || $ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_STATIC) {
          $meta_value = ai_get_post_meta ();
          $selected_blocks = explode (",", $meta_value);
          if (!$obj->check_post_page_exceptions ($selected_blocks)) continue;
        }

        $ai_last_check = AI_CHECK_DISABLED_MANUALLY;
        if (!$obj->check_disabled ()) continue;

        $ai_last_check = AI_CHECK_INSERTION_NOT_DISABLED;
        if ($obj->get_disable_insertion () || get_disable_block_insertions ()) continue;

        // Last check before counter check before insertion
//        $ai_last_check = AI_CHECK_CODE;
//        if ($obj->ai_getCode () == '') continue;
        if ($obj->empty_code ()) continue;

        $max_page_blocks_enabled = $obj->get_max_page_blocks_enabled ();
        if ($max_page_blocks_enabled) {
          $ai_last_check = AI_CHECK_MAX_PAGE_BLOCKS;
          if ($ai_wp_data [AI_PAGE_BLOCKS] >= get_max_page_blocks ()) continue;
        }

        if (!$obj->check_filter_hook ($debug_processing)) continue;

        // Last check before insertion
        if (!$obj->check_and_increment_block_counter ()) continue;

        // Increment page block counter
        if ($max_page_blocks_enabled) $ai_wp_data [AI_PAGE_BLOCKS] ++;

        $ai_last_check = AI_CHECK_DEBUG_NO_INSERTION;
        if (!$obj->get_debug_disable_insertion ()) {
          $ad_code .= $obj->get_code_for_serverside_insertion ();
          $ai_last_check = AI_CHECK_INSERTED;
        }
      }
      if ($debug_processing && $ai_last_check != AI_CHECK_NONE) ai_log (ai_log_block_status ($current_block, $ai_last_check));

      if ($ad_code != '') {
        echo "<$tag>\n";
        echo $ad_code;
        echo "</$tag>\n";
      }
    } else {
        $ai_wp_data [AI_CONTEXT] = AI_CONTEXT_BETWEEN_COMMENTS;

        if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_POSITIONS) != 0) {

          $class = AI_DEBUG_POSITIONS_CLASS;

          echo "<$tag>\n";
          echo "<section data-ai-position='" .AI_AUTOMATIC_INSERTION_BETWEEN_COMMENTS ."' class='$class'>" . __('BETWEEN COMMENTS', 'ad-inserter') . ' ' . $ad_inserter_globals [AI_COMMENT_COUNTER_NAME]."</section>";
          echo "</$tag>\n";
        }

        $ad_code = "";

        $ai_last_check = AI_CHECK_NONE;
        $current_block = 0;

        if (isset ($ai_db_options_extract [BETWEEN_COMMENTS_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]))
        foreach ($ai_db_options_extract [BETWEEN_COMMENTS_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]] as $block) {
          if ($debug_processing && $ai_last_check != AI_CHECK_NONE) ai_log (ai_log_block_status ($current_block, $ai_last_check));

          if (!isset ($block_object [$block])) continue;

          $current_block = $block;

          $obj = $block_object [$block];
          $obj->clear_code_cache ();

          if (!$obj->check_server_side_detection ()) continue;
          if (!$obj->check_page_types_lists_users ()) continue;
          if (!$obj->check_filter ($ad_inserter_globals [AI_COMMENT_COUNTER_NAME])) continue;
          if (!$obj->check_number_of_words ()) continue;

          if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_POST || $ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_STATIC) {
            $meta_value = ai_get_post_meta ();
            $selected_blocks = explode (",", $meta_value);
            if (!$obj->check_post_page_exceptions ($selected_blocks)) continue;
          }

          $ai_last_check = AI_CHECK_DISABLED_MANUALLY;
          if (!$obj->check_disabled ()) continue;

          $ai_last_check = AI_CHECK_INSERTION_NOT_DISABLED;
          if ($obj->get_disable_insertion () || get_disable_block_insertions ()) continue;

          // Last check before counter check before insertion
//          $ai_last_check = AI_CHECK_CODE;
//          if ($obj->ai_getCode () == '') continue;
          if ($obj->empty_code ()) continue;

          $max_page_blocks_enabled = $obj->get_max_page_blocks_enabled ();
          if ($max_page_blocks_enabled) {
            $ai_last_check = AI_CHECK_MAX_PAGE_BLOCKS;
            if ($ai_wp_data [AI_PAGE_BLOCKS] >= get_max_page_blocks ()) continue;
          }

          if (!$obj->check_filter_hook ($debug_processing)) continue;

          // Last check before insertion
          if (!$obj->check_and_increment_block_counter ()) continue;

          // Increment page block counter
          if ($max_page_blocks_enabled) $ai_wp_data [AI_PAGE_BLOCKS] ++;

          $ai_last_check = AI_CHECK_DEBUG_NO_INSERTION;
          if (!$obj->get_debug_disable_insertion ()) {
            $ad_code .= $obj->get_code_for_serverside_insertion ();
            $ai_last_check = AI_CHECK_INSERTED;
          }
        }
        if ($debug_processing && $ai_last_check != AI_CHECK_NONE) ai_log (ai_log_block_status ($current_block, $ai_last_check));

        if ($ad_code != '') {
          echo "<$tag>\n";
          echo $ad_code;
          echo "</$tag>\n";
        }
      }
  }

  if ($debug_processing) {
    if (!$ai_processing_time_active) {
      $ai_total_plugin_time += microtime (true) - $start_time;
      $ai_wp_data [AI_PROCESSING_TIME] = false;
    }
    ai_log ("COMMENT END HOOK END: ". number_format (1000 * (microtime (true) - $start_time), 2)." ms\n");
  }
}

function ai_custom_hook ($action, $insertion_type, $name, $translated_name = '', $hook_parameter = null, $hook_check = null) {
  global $block_object, $ad_inserter_globals, $ai_db_options_extract, $ai_wp_data, $ai_last_check, $ai_total_plugin_time;

  $debug_processing = ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0;

  if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_ADMIN) return;
  if (is_admin()) return;

  if ($insertion_type < AI_AUTOMATIC_INSERTION_CUSTOM_HOOK) {
    $globals_name = 'AI_' . strtoupper ($action) .'_COUNTER';
    $ai_wp_data [AI_CONTEXT] = AI_CONTEXT_NONE;
  } else {
      $globals_name = 'AI_' . strtoupper ($action) . '_' . $insertion_type . '_COUNTER';
      $ai_wp_data [AI_CONTEXT] = AI_CONTEXT_CUSTOM_HOOK + $insertion_type - AI_AUTOMATIC_INSERTION_CUSTOM_HOOK;
    }

  if (isset ($hook_check) && $insertion_type < AI_AUTOMATIC_INSERTION_CUSTOM_HOOK) {
    if (!call_user_func ($hook_check, $hook_parameter, $action)) return;
  }

  if ($debug_processing) {
    $hook_name = $ai_wp_data [AI_MBSTRING_LOADED] ? mb_strtoupper ($name) : strtoupper ($name);

    ai_log (str_replace (array ('&LT;', '&GT;'), array ('<', '>'), $hook_name) . " HOOK START");
    $ai_processing_time_active = $ai_wp_data [AI_PROCESSING_TIME];
    $ai_wp_data [AI_PROCESSING_TIME] = true;
    $start_time = microtime (true);
  }

  if (!isset ($ad_inserter_globals [$globals_name])) {
    $ad_inserter_globals [$globals_name] = 1;
  } else $ad_inserter_globals [$globals_name] ++;

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_POSITIONS) != 0) {

    $counter = $ad_inserter_globals [$globals_name];
    if ($counter == 1) $counter = '';

    $class = AI_DEBUG_POSITIONS_CLASS;
    if ($translated_name == '') $translated_name = $name;
    $translated_hook_name = $ai_wp_data [AI_MBSTRING_LOADED] ? mb_strtoupper ($translated_name) : strtoupper ($translated_name);

    echo "<section data-ai-position='$insertion_type' class='$class'>".$translated_hook_name." ".$counter."</section>";
  }

  if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_POST || $ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_STATIC) {
//    $meta_value = get_post_meta (get_the_ID (), '_adinserter_block_exceptions', true);
    $meta_value = ai_get_post_meta ();

    $selected_blocks = explode (",", $meta_value);
  } else $selected_blocks = array ();

  $ad_code = "";

  $ai_last_check = AI_CHECK_NONE;
  $current_block = 0;

  if (isset ($ai_db_options_extract [$action . CUSTOM_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]]))
  foreach ($ai_db_options_extract [$action . CUSTOM_HOOK_BLOCKS][$ai_wp_data [AI_WP_PAGE_TYPE]] as $block) {
    if ($debug_processing && $ai_last_check != AI_CHECK_NONE) ai_log (ai_log_block_status ($current_block, $ai_last_check));

    $ai_last_check = AI_CHECK_NONE;

    if (!isset ($block_object [$block])) continue;

    $current_block = $block;

    $obj = $block_object [$block];

    if (!in_the_loop () && $obj->get_only_in_the_loop ()) continue;

    $obj->clear_code_cache ();

    // Action can be called as insertion Between posts or as custom hook - uses the same $ai_db_options_extract index
    if ($action == 'the_post' && $insertion_type != $obj->get_automatic_insertion ()) continue;

    if (!$obj->check_server_side_detection ()) continue;
    if (!$obj->check_page_types_lists_users ()) continue;
    if (!$obj->check_post_page_exceptions ($selected_blocks)) continue;
    if (!$obj->check_filter ($ad_inserter_globals [$globals_name])) continue;
    if (!$obj->check_number_of_words ()) continue;

    $ai_last_check = AI_CHECK_DISABLED_MANUALLY;
    if (!$obj->check_disabled ()) continue;

    $ai_last_check = AI_CHECK_INSERTION_NOT_DISABLED;
    if ($obj->get_disable_insertion () || get_disable_block_insertions ()) continue;

    // Last check before counter check before insertion
    if ($obj->empty_code ()) continue;

    $max_page_blocks_enabled = $obj->get_max_page_blocks_enabled ();
    if ($max_page_blocks_enabled) {
      $ai_last_check = AI_CHECK_MAX_PAGE_BLOCKS;
      if ($ai_wp_data [AI_PAGE_BLOCKS] >= get_max_page_blocks ()) continue;
    }

    if (!$obj->check_filter_hook ($debug_processing)) continue;

    // Last check before insertion
    if (!$obj->check_and_increment_block_counter ()) continue;

    // Increment page block counter
    if ($max_page_blocks_enabled) $ai_wp_data [AI_PAGE_BLOCKS] ++;

    $ai_last_check = AI_CHECK_DEBUG_NO_INSERTION;
    if (!$obj->get_debug_disable_insertion ()) {
      $block_code = $obj->get_code_for_serverside_insertion ();

      if ($action == 'wp_head') {
        // Replace div tag in the head with meta tag
        $block_code = preg_replace ("#<div class='ai-dynamic (.+?)></div>#", "<meta class='ai-dynamic $1 />", $block_code);
      }

      $ad_code .= $block_code;
      $ai_last_check = AI_CHECK_INSERTED;
    }
  }
  if ($debug_processing && $ai_last_check != AI_CHECK_NONE) ai_log (ai_log_block_status ($current_block, $ai_last_check));

  echo $ad_code;

  if ($debug_processing) {
    if (!$ai_processing_time_active) {
      $ai_total_plugin_time += microtime (true) - $start_time;
      $ai_wp_data [AI_PROCESSING_TIME] = false;
    }
    ai_log (str_replace (array ('&LT;', '&GT;'), array ('<', '>'), $hook_name) . " HOOK END: ". number_format (1000 * (microtime (true) - $start_time), 2)." ms\n");
  }
}


function ai_pre_do_shortcode_tag ($return, $tag, $attr, $m) {
    global $ai_expand_only_rotate_count_check, $ai_wp_data;

//    Array
//(
//    [0] => [ADINSERTER ROTATE='1']
//    [1] =>
//    [2] => ADINSERTER
//    [3] =>  ROTATE='1'
//    [4] =>
//    [5] =>
//    [6] =>

  if ($ai_expand_only_rotate_count_check) {
    if (strtolower ($tag) == 'adinserter') {
      // Expand only ROTATE / COUNT / CHECK
      if (isset ($attr ['rotate']) || in_array ('ROTATE', $attr) || in_array ('rotate', $attr)) {
        return false;
      }
      elseif (isset ($attr ['count']) || in_array ('COUNT', $attr) || in_array ('count', $attr)) {
        return false;
      }
      elseif (isset ($attr ['check']) || in_array ('CHECK', $attr) || in_array ('check', $attr)) {
        return false;
      }
      else return $m [0];
    } else return $m [0];
  }

  return $return;
}

function ai_process_shortcode (&$block, $atts) {
  global $block_object, $ai_last_check, $ai_wp_data, $ad_inserter_globals;

  if ($atts == '') return '';

  $parameters = shortcode_atts (array (
    "block" => "",
    "code" => "",
    "name" => "",
    "group" => "",
    "ignore" => "",
    "disable" => "",
    "check" => "",
    "viewport" => "",
    "fallback" => "",
    "adb" => "",
    "tracking" => "",
    "css" => "",
    "text" => "",
    "selectors" => "",
    "amp" => "",
    "head" => "",
    "rotate" => "",
    "count" => "",
    "counter" => "",
    "http" => "",
    "custom-field" => "",
    "random" => "",
    "data" => "",
    "share" => "",
    "time" => "",
    "category" => "",
    "tag" => "",
    "taxonomy" => "",
    "id" => "",
    "url" => "",
    "url-parameter" => "",
    "cookie" => "",
    "referrer" => "",
    "client" => "",
    "scheduling" => "",
    "ip-address" => "",
    "country" => "",
  ), $atts);


  $output = "";
  if (function_exists ('ai_shortcode')) {
    $output = ai_shortcode ($parameters);
    if ($output != '') return $output;
  }

  if (($adb = trim ($parameters ['adb'])) != '') {
//    message html
//    message css
//    overlay css
//    undismissible

//    redirection page
//    redirection url

    switch (strtolower ($adb)) {
      case 'message':
        $ai_wp_data [AI_ADB_SHORTCODE_ACTION] = AI_ADB_ACTION_MESSAGE;
        break;
      case 'redirection':
        $ai_wp_data [AI_ADB_SHORTCODE_ACTION] = AI_ADB_ACTION_REDIRECTION;
        break;
      case 'no-action':
        $ai_wp_data [AI_ADB_SHORTCODE_ACTION] = AI_ADB_ACTION_NONE;
        break;
      case 'disabled':
        $ai_wp_data [AI_ADB_SHORTCODE_DISABLED] = true;
        break;
      case 'external-scripts':
        if (!get_adb_external_scripts ()) {
          return ai_adb_external_scripts ();
        }
    }
    return  "";
  }

  if (($tracking = trim ($parameters ['tracking'])) != '') {
    switch (strtolower ($tracking)) {
      case 'disabled':
        $ai_wp_data [AI_TRACKING_SHORTCODE_DISABLED] = true;
        break;
    }
    return  "";
  }

  $block = - 1;
  $code_only = false;
  $name_only = false;

  $debug_processing = ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0;

  if ($parameters ['block'] == '' && $parameters ['code'] != '' && !($parameters ['viewport'] != '' || in_array ('VIEWPORT', $atts) || in_array ('viewport', $atts))) {
    $parameters ['block'] = $parameters ['code'];
    $code_only = true;
  }

  // To convert name attribute to block
  elseif ($parameters ['block'] == '' && $parameters ['name'] != '' && !($parameters ['rotate'] != '' || in_array ('ROTATE', $atts) || in_array ('rotate', $atts))) {
    $parameters ['block'] = $parameters ['name'];
    $name_only = true;
  }

  if (is_numeric ($parameters ['block']) && !$name_only) {
    $block = intval ($parameters ['block']);

//  } elseif ($parameters ['name'] != '' && !($parameters ['rotate'] != '' || in_array ('ROTATE', $atts) || in_array ('rotate', $atts))) {
//      $shortcode_name = strtolower ($parameters ['name']);

  } elseif ($parameters ['block'] != '' && !($parameters ['rotate'] != '' || in_array ('ROTATE', $atts) || in_array ('rotate', $atts))) {
      $shortcode_name = strtolower ($parameters ['block']);
      for ($counter = 1; $counter <= 96; $counter ++) {
        $obj = $block_object [$counter];
        $ad_name = strtolower (trim ($obj->get_ad_name()));
        if ($shortcode_name == $ad_name && $obj->get_enable_manual ()) {
          $block = $counter;
          break;
        }
      }
    }

  if ($block == - 1) {
    if (function_exists ('ai_check_separators')) {
      if ($parameters ['check'] != '' || in_array ('CHECK', $atts) || in_array ('check', $atts)) {
        if (!isset ($ai_wp_data [AI_SHORTCODES]['check'])) $ai_wp_data [AI_SHORTCODES]['check'] = array ();
        $ai_wp_data [AI_SHORTCODES]['check'] []= $parameters;
        return AD_CHECK_SEPARATOR;
      }
    }
    if ($parameters ['viewport'] != '' || in_array ('VIEWPORT', $atts) || in_array ('viewport', $atts)) {
      if (!isset ($ai_wp_data [AI_SHORTCODES]['viewport'])) $ai_wp_data [AI_SHORTCODES]['viewport'] = array ();
      $ai_wp_data [AI_SHORTCODES]['viewport'] []= $parameters;
      return '|viewport'. (count ($ai_wp_data [AI_SHORTCODES]['viewport']) - 1). '|';
    }
    if ($parameters ['count'] != '' || in_array ('COUNT', $atts) || in_array ('count', $atts)) {
      if (!isset ($ai_wp_data [AI_SHORTCODES]['count'])) $ai_wp_data [AI_SHORTCODES]['count'] = array ();
      $ai_wp_data [AI_SHORTCODES]['count'] []= $parameters;
//      return AD_COUNT_SEPARATOR;
      return '|count'. (count ($ai_wp_data [AI_SHORTCODES]['count']) - 1). '|';
    }
    if ($parameters ['rotate'] != '' || in_array ('ROTATE', $atts) || in_array ('rotate', $atts)) {
      if (!isset ($ai_wp_data [AI_SHORTCODES]['rotate'])) $ai_wp_data [AI_SHORTCODES]['rotate'] = array ();
      $ai_wp_data [AI_SHORTCODES]['rotate'] []= $parameters;
//      return AD_ROTATE_SEPARATOR;
      return '|rotate'. (count ($ai_wp_data [AI_SHORTCODES]['rotate']) - 1). '|';
    }
    if ($parameters ['amp'] != '' || in_array ('AMP', $atts) || in_array ('amp', $atts)) {
      return AD_AMP_SEPARATOR;
    }
    if ($parameters ['head'] != '' || in_array ('HEAD', $atts) || in_array ('head', $atts)) {
      if (!isset ($ai_wp_data [AI_SHORTCODES]['head'])) $ai_wp_data [AI_SHORTCODES]['head'] = array ();
      $ai_wp_data [AI_SHORTCODES]['head'] []= $parameters;
      return AD_HEAD_SEPARATOR;
    }
    if ($parameters ['http'] != '' || in_array ('HTTP', $atts) || in_array ('http', $atts)) {
      return AD_HTTP_SEPARATOR;
    }
    if ($parameters ['fallback'] != '' || in_array ('FALLBACK', $atts) || in_array ('fallback', $atts)) {
      if (!isset ($ai_wp_data [AI_SHORTCODES]['fallback'])) $ai_wp_data [AI_SHORTCODES]['fallback'] = array ();
      $ai_wp_data [AI_SHORTCODES]['fallback'] []= $parameters;
      return AD_FALLBACK_SEPARATOR;
    }
    if ($parameters ['group'] != '' || in_array ('GROUP', $atts) || in_array ('group', $atts)) {
      if ($parameters ['group'] != '') {
        $parameters ['group'] = mb_strtolower ($parameters ['group']);
        if (strpos ($parameters ['group'], ',') !== false) {
          $group_names = explode (',', $parameters ['group']);
          foreach ($group_names as $index => $group_name) {
            $group_names [$index] = trim ($group_names [$index]);
          }
        } else $group_names = array (trim ($parameters ['group']));
      } else $group_names = array ();

      return '<span data-ai-groups="' . base64_encode (json_encode ($group_names)) . '"></span>';
    }
    if ($parameters ['disable'] != '' || in_array ('DISABLE', $atts) || in_array ('disable', $atts)) {
      if (!isset ($ai_wp_data [AI_DISABLED_BLOCKS])) $ai_wp_data [AI_DISABLED_BLOCKS] = array ();

      $shortcode_disabled = explode (',', strtolower (str_replace (' ', '', $parameters ['disable'])));
      $ai_wp_data [AI_DISABLED_BLOCKS] = array_unique (array_merge ($ai_wp_data [AI_DISABLED_BLOCKS], $shortcode_disabled));

      if ($debug_processing) {
        ai_log ('DISABLED BLOCKS: ' . implode (', ', $ai_wp_data [AI_DISABLED_BLOCKS]));
      }

      return '';
    }

    if ($parameters ['custom-field'] != '') {
      $custom_field_name = trim ($parameters ['custom-field']);

      $default_value = null;
      if (trim ($parameters ['data']) != '') {
        $custom_field_value = trim ($parameters ['data']);

        if ($parameters ['data'][0] == ':') {
          $default_value = substr ($parameters ['data'], 1);
        } else {
            $ai_wp_data [AI_CUSTOM_FIELDS][$custom_field_name] = $custom_field_value;

            return '';
          }
      }

      if (isset ($ai_wp_data [AI_CUSTOM_FIELDS][$custom_field_name])) {
        return $ai_wp_data [AI_CUSTOM_FIELDS][$custom_field_name];
      }

      $post_meta = get_post_meta (get_the_ID (), $parameters ['custom-field']);

      if (is_array ($post_meta)) {
        $post_meta = implode (', ', $post_meta);
      }

      return empty ($post_meta) && $default_value !== null ? $default_value : $post_meta;
    }

    if ($parameters ['random'] != '' || isset ($atts ['RANDOM']) || isset ($atts ['random'])) {
      $random_value_limits = trim ($parameters ['random']);
      $random_value = '';
      if ($random_value_limits == '') {
        $random_value = rand ();
      } else {
          if (strpos ($random_value_limits, ',') !== false) {
            $limits = explode (',', $random_value_limits);
            $random_value = rand ($limits [0], $limits [1]);
          } else $random_value = rand (0, $random_value_limits);
        }

      return ($random_value);
    }

    if ($parameters ['data'] != '') {
      if (strpos ($parameters ['data'], ',') !== false) {
        $data_tags = explode (',', $parameters ['data']);
        $data = array ();
        foreach ($data_tags as $data_tag) {
          $data []= replace_ai_tags ('{'.trim ($data_tag).'}');
        }
        return implode (', ', $data);
      }
      return replace_ai_tags ('{'.$parameters ['data'].'}');
    }
    if ($parameters ['counter'] != '') {
      $counter_name = strtolower ($parameters ['counter']);

      switch ($counter_name) {
        case 'block':
          if (isset ($ai_wp_data [AI_CURRENT_BLOCK_NUMBER]) && isset ($ad_inserter_globals [AI_BLOCK_COUNTER_NAME . $ai_wp_data [AI_CURRENT_BLOCK_NUMBER]])) {
            return $ad_inserter_globals [AI_BLOCK_COUNTER_NAME . $ai_wp_data [AI_CURRENT_BLOCK_NUMBER]];
          }
          break;
        case 'content':
          if (isset ($ad_inserter_globals [AI_CONTENT_COUNTER_NAME])) {
            return $ad_inserter_globals [AI_CONTENT_COUNTER_NAME];
          }
          break;
        case 'excerpt':
          if (isset ($ad_inserter_globals [AI_EXCERPT_COUNTER_NAME])) {
            return $ad_inserter_globals [AI_EXCERPT_COUNTER_NAME];
          }
          break;
        case 'before-post':
          if (isset ($ad_inserter_globals [AI_LOOP_BEFORE_COUNTER_NAME])) {
            return $ad_inserter_globals [AI_LOOP_BEFORE_COUNTER_NAME];
          }
          break;
        case 'after-post':
          if (isset ($ad_inserter_globals [AI_LOOP_AFTER_COUNTER_NAME])) {
            return $ad_inserter_globals [AI_LOOP_AFTER_COUNTER_NAME];
          }
          break;
        case 'widget':
          if (isset ($ai_wp_data [AI_CURRENT_BLOCK_NUMBER]) && isset ($ad_inserter_globals [AI_WIDGET_COUNTER_NAME . $ai_wp_data [AI_CURRENT_BLOCK_NUMBER]])) {
            return $ad_inserter_globals [AI_WIDGET_COUNTER_NAME . $ai_wp_data [AI_CURRENT_BLOCK_NUMBER]];
          }
          break;
        case 'php':
          if (isset ($ai_wp_data [AI_CURRENT_BLOCK_NUMBER]) && isset ($ad_inserter_globals [AI_PHP_FUNCTION_CALL_COUNTER_NAME . $ai_wp_data [AI_CURRENT_BLOCK_NUMBER]])) {
            return $ad_inserter_globals [AI_PHP_FUNCTION_CALL_COUNTER_NAME . $ai_wp_data [AI_CURRENT_BLOCK_NUMBER]];
          }
          break;
      }
      return '';
    }
    if ($parameters ['name'] != '') {
      $shortcode_name = strtolower ($parameters ['name']);
      switch ($shortcode_name) {
        case 'processing-log':
          if (/*get_remote_debugging () ||*/ ($ai_wp_data [AI_WP_USER] & AI_USER_ADMINISTRATOR) != 0) {
            ob_start ();
            echo "<pre style='", AI_DEBUG_WIDGET_STYLE, "'>\n";
            ai_write_debug_info ();
            echo "</pre>";
            return ob_get_clean ();
          }
          return "";
        case 'debugging-tools':
          if (($ai_wp_data [AI_WP_USER] & AI_USER_ADMINISTRATOR) != 0 || defined ('AI_DEBUGGING_DEMO')) {
            ob_start ();
            ai_write_debugging_tools ();
            return ob_get_clean ();
          }
        default:
          if (defined ('AI_BUFFERING')) {
            if (get_output_buffering () && !get_disable_header_code ()) {
              return "<!--[AI_HEAD_GROUPS $shortcode_name]-->";
            }
          }
          return "";
      }
    }
  }

  $ai_last_check = AI_CHECK_SHORTCODE_ATTRIBUTES;
  if ($block < 1 || $block > 96) return "";

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) ai_log ("SHORTCODE $block (".($parameters ['block'] != '' ? 'block="'.$parameters ['block'].'"' : '').($parameters ['name'] != '' ? 'name="'.$parameters ['name'].'"' : '').")");

//  IGNORE SETTINGS
//  page-type
//  *block-counter

//  CHECK SETTINGS
//  exceptions

  $ignore_array = array ();
  if (trim ($parameters ['ignore']) != '') {
    $ignore_array = explode (",", str_replace (" ", "", $parameters ['ignore']));
  }

  $check_array = array ();
  if (trim ($parameters ['check']) != '') {
    $check_array = explode (",", str_replace (" ", "", $parameters ['check']));
  }

  $ai_wp_data [AI_CONTEXT] = AI_CONTEXT_SHORTCODE;

  $obj = $block_object [$block];
  $obj->clear_code_cache ();

  $ai_last_check = AI_CHECK_ENABLED_SHORTCODE;
  if (!$obj->get_enable_manual ()) return "";

  if (!$obj->check_server_side_detection ()) return "";
  if (!$obj->check_page_types_lists_users (in_array ("page-type", $ignore_array))) return "";

  if (in_array ("exceptions", $check_array)) {
    if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_POST || $ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_STATIC) {
//      $meta_value = get_post_meta (get_the_ID (), '_adinserter_block_exceptions', true);
      $meta_value = ai_get_post_meta ();

      $selected_blocks = explode (",", $meta_value);
      if (!$obj->check_post_page_exceptions ($selected_blocks)) return "";
    }
  }

  $ai_last_check = AI_CHECK_DISABLED_MANUALLY;
  if (!$obj->check_disabled ()) return "";

  $ai_last_check = AI_CHECK_INSERTION_NOT_DISABLED;
  if ($obj->get_disable_insertion () || get_disable_block_insertions ()) return "";

  // Last check before counter check before insertion
//  $ai_last_check = AI_CHECK_CODE;
//  if ($obj->ai_getCode () == '') return "";
  if ($obj->empty_code ()) return "";

  $max_page_blocks_enabled = $obj->get_max_page_blocks_enabled ();
  if ($max_page_blocks_enabled) {
    $ai_last_check = AI_CHECK_MAX_PAGE_BLOCKS;
    if ($ai_wp_data [AI_PAGE_BLOCKS] >= get_max_page_blocks ()) return "";
  }

  if (!$obj->check_filter_hook ($debug_processing)) return "";

  // Last check before insertion
  if (!$obj->check_and_increment_block_counter ()) return "";

  // Increment page block counter
  if ($max_page_blocks_enabled) $ai_wp_data [AI_PAGE_BLOCKS] ++;

  $ai_last_check = AI_CHECK_DEBUG_NO_INSERTION;
  if (!$obj->get_debug_disable_insertion ()) {

    if (isset ($ai_wp_data [AI_SHORTCODES]['force_serverside'])) {
      $saved_force_serverside = $ai_wp_data [AI_SHORTCODES]['force_serverside'];
    }
    if (isset ($ai_wp_data [AI_SHORTCODES]['viewport'])) {
      $saved_viewport = $ai_wp_data [AI_SHORTCODES]['viewport'];
    }
    if (isset ($ai_wp_data [AI_SHORTCODES]['check'])) {
      $saved_check = $ai_wp_data [AI_SHORTCODES]['check'];
    }
    if (isset ($ai_wp_data [AI_SHORTCODES]['count'])) {
      $saved_count = $ai_wp_data [AI_SHORTCODES]['count'];
    }
    if (isset ($ai_wp_data [AI_SHORTCODES]['rotate'])) {
      $saved_rotate = $ai_wp_data [AI_SHORTCODES]['rotate'];
    }
    if (isset ($ai_wp_data [AI_SHORTCODES]['head'])) {
      $saved_head = $ai_wp_data [AI_SHORTCODES]['head'];
    }
    if (isset ($ai_wp_data [AI_SHORTCODES]['fallback'])) {
      $saved_fallback = $ai_wp_data [AI_SHORTCODES]['fallback'];
    }
    if (isset ($ai_wp_data [AI_SHORTCODES]['atts'])) {
      $saved_atts = $ai_wp_data [AI_SHORTCODES]['atts'];
    }
    $ai_wp_data [AI_SHORTCODES]['atts'] = $atts;
    if (isset ($ai_wp_data [AI_CURRENT_BLOCK_NUMBER])) {
      $saved_block_number = $ai_wp_data [AI_CURRENT_BLOCK_NUMBER];
    }

    $code = $obj->get_code_for_serverside_insertion (true, false, $code_only);

    if (isset ($saved_force_serverside)) {
      $ai_wp_data [AI_SHORTCODES]['force_serverside'] = $saved_force_serverside;
    } else unset ($ai_wp_data [AI_SHORTCODES]['force_serverside']);
    if (isset ($saved_viewport)) {
      $ai_wp_data [AI_SHORTCODES]['viewport'] = $saved_viewport;
    } else unset ($ai_wp_data [AI_SHORTCODES]['viewport']);
    if (isset ($saved_check)) {
      $ai_wp_data [AI_SHORTCODES]['check'] = $saved_check;
    } else unset ($ai_wp_data [AI_SHORTCODES]['check']);
    if (isset ($saved_count)) {
      $ai_wp_data [AI_SHORTCODES]['count'] = $saved_count;
    } else unset ($ai_wp_data [AI_SHORTCODES]['count']);
    if (isset ($saved_rotate)) {
      $ai_wp_data [AI_SHORTCODES]['rotate'] = $saved_rotate;
    } else unset ($ai_wp_data [AI_SHORTCODES]['rotate']);
    if (isset ($saved_fallback)) {
      $ai_wp_data [AI_SHORTCODES]['fallback'] = $saved_fallback;
    } else unset ($ai_wp_data [AI_SHORTCODES]['fallback']);
    if (isset ($saved_head)) {
      $ai_wp_data [AI_SHORTCODES]['head'] = $saved_head;
    } else unset ($ai_wp_data [AI_SHORTCODES]['head']);
    if (isset ($saved_atts)) {
      $ai_wp_data [AI_SHORTCODES]['atts'] = $saved_atts;
    } else unset ($ai_wp_data [AI_SHORTCODES]['atts']);
    if (isset ($saved_block_number)) {
      $ai_wp_data [AI_CURRENT_BLOCK_NUMBER] = $saved_block_number;
    } else unset ($ai_wp_data [AI_CURRENT_BLOCK_NUMBER]);

    // Must be after get_code_for_serverside_insertion ()
    $ai_last_check = AI_CHECK_INSERTED;
    return $code;
  }
}

function ai_process_shortcodes ($atts, $content, $tag) {
  global $ai_last_check, $ai_wp_data, $ai_total_plugin_time;

  $debug_processing = ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0;
  if ($debug_processing) {
    $atts_string = '';
    if (is_array ($atts))
      foreach ($atts as $index => $att) {
        if (is_numeric ($index))
          $atts_string .= $att.' '; else
            $atts_string .= $index.("='".$att."'").' ';
      }
    ai_log ("PROCESS SHORTCODES [$tag ".trim ($atts_string).']');
    $ai_processing_time_active = $ai_wp_data [AI_PROCESSING_TIME];
    $ai_wp_data [AI_PROCESSING_TIME] = true;
    $start_time = microtime (true);
  }
  $ai_last_check = AI_CHECK_NONE;
  $block = - 1;
  $shortcode = ai_process_shortcode ($block, $atts);

  if ($debug_processing) {
    if ($block == - 1) {
      if (strlen ($shortcode) < 100) ai_log ('SHORTCODE TEXT: "' . ai_log_filter_content ($shortcode) . '"'); else
        ai_log ('SHORTCODE TEXT: "' . ai_log_filter_content (html_entity_decode (substr ($shortcode, 0, 60))) . ' ... ' . ai_log_filter_content (html_entity_decode (substr ($shortcode, - 60))) . '"');
    }
    elseif ($ai_last_check != AI_CHECK_NONE) ai_log (ai_log_block_status ($block, $ai_last_check));
    if (!$ai_processing_time_active) {
      $ai_total_plugin_time += microtime (true) - $start_time;
      $ai_wp_data [AI_PROCESSING_TIME] = false;
    }
    ai_log ("SHORTCODE END: ". number_format (1000 * (microtime (true) - $start_time), 2)." ms\n");
  }

  return $shortcode;
}


function ai_add_attr_data (&$tag, $attr, $new_data) {

  if (trim ($tag) != '' && strpos ($tag,  '<!--') === false) {
    if (stripos ($tag, $attr."=") !== false) {
      preg_match ("/$attr=[\'\"](.+?)[\'\"]/", $tag, $classes);
      $tag = str_replace ($classes [1], $classes [1]. ' ' . $new_data, $tag);
      return true;
    }
    elseif (strpos ($tag, ">") !== false) {
      $tag = str_replace ('>', ' ' . $attr . '="' . $new_data . '">', $tag);
      return true;
    }
  }

  return false;
}

function ai_debug_widget_comment ($label, $end = false) {
  $end_label = '';
  if ($end) {
    $end_label = '/';
  }
  echo "<!-- {$end_label}AI $label -->";
}

function ai_widget_draw ($args, $instance, &$block) {
  global $block_object, $ad_inserter_globals, $ai_wp_data, $ai_last_check;

  $debug_processing = ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0;

  $block  = isset ($instance ['block'])  ? $instance ['block']  : 1;
  $sticky = isset ($instance ['sticky']) ? $instance ['sticky'] : 0;

  if ($block == 0 || $block == - 2) {
    if (!get_disable_block_insertions () && (($ai_wp_data [AI_WP_USER] & AI_USER_ADMINISTRATOR) != 0 || defined ('AI_DEBUGGING_DEMO'))) {
      ai_special_widget ($args, $instance, $block);
    }
    return;
  }

  if ($sticky) {
    $ai_wp_data [AI_STICKY_WIDGETS] = true;
    if ($block == - 1 && !get_disable_block_insertions ()) {
      $before_widget = $args ['before_widget'];
      ai_add_attr_data ($before_widget, 'style', 'padding: 0; border: 0; margin: 0; color: transparent; background: transparent;');
      ai_add_attr_data ($before_widget, 'class', 'ai-sticky-widget');

      if ($debug_processing) echo ai_debug_widget_comment ('before_widget');
      echo $before_widget;
      if ($debug_processing) echo ai_debug_widget_comment ('before_widget', true);

      if ($debug_processing) echo ai_debug_widget_comment ('after_widget');
      echo $args ['after_widget'];
      if ($debug_processing) echo ai_debug_widget_comment ('after_widget', true);

      return;
    }
  }

  if ($block < 1 || $block > 96) return;

  $title = !empty ($instance ['widget-title']) ? $instance ['widget-title'] : '';

  $obj = $block_object [$block];
  $obj->clear_code_cache ();

  $globals_name = AI_WIDGET_COUNTER_NAME . $block;

  if (!isset ($ad_inserter_globals [$globals_name])) {
    $ad_inserter_globals [$globals_name] = 1;
  } else $ad_inserter_globals [$globals_name] ++;

  if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0)
    ai_log ("WIDGET (". $obj->number . ') ['.$ad_inserter_globals [$globals_name] . ']');

  $ai_wp_data [AI_CONTEXT] = AI_CONTEXT_WIDGET;

  $ai_last_check = AI_CHECK_ENABLED_WIDGET;
  if (!$obj->get_enable_widget ()) return;
  if (!$obj->check_server_side_detection ()) return;
  if (!$obj->check_page_types_lists_users ()) return;
  if (!$obj->check_filter ($ad_inserter_globals [$globals_name])) return;
  if (!$obj->check_number_of_words ()) return;

  if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_POST || $ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_STATIC) {
//    $meta_value = get_post_meta (get_the_ID (), '_adinserter_block_exceptions', true);
    $meta_value = ai_get_post_meta ();

    $selected_blocks = explode (",", $meta_value);
    if (!$obj->check_post_page_exceptions ($selected_blocks)) return;
  }

  $ai_last_check = AI_CHECK_DISABLED_MANUALLY;
  if (!$obj->check_disabled ()) return;

  $ai_last_check = AI_CHECK_INSERTION_NOT_DISABLED;
  if ($obj->get_disable_insertion () || get_disable_block_insertions ()) return;

  // Last check before counter check before insertion
  $ai_last_check = AI_CHECK_CODE;
  if ($obj->ai_getCode () == '') {
    if ($sticky) {
      $before_widget = $args ['before_widget'];
      ai_add_attr_data ($before_widget, 'style', 'padding: 0; border: 0; margin: 0; color: transparent; background: transparent;');
      ai_add_attr_data ($before_widget, 'class', 'ai-sticky-widget');

      if ($debug_processing) echo ai_debug_widget_comment ('before_widget');
      echo $before_widget;
      if ($debug_processing) echo ai_debug_widget_comment ('before_widget', true);

      if ($debug_processing) echo ai_debug_widget_comment ('after_widget');
      echo $args ['after_widget'];
      if ($debug_processing) echo ai_debug_widget_comment ('after_widget', true);
    }
    return;
  }

  $max_page_blocks_enabled = $obj->get_max_page_blocks_enabled ();
  if ($max_page_blocks_enabled) {
    $ai_last_check = AI_CHECK_MAX_PAGE_BLOCKS;
    if ($ai_wp_data [AI_PAGE_BLOCKS] >= get_max_page_blocks ()) return;
  }

  if (!$obj->check_filter_hook ($debug_processing)) return;

  // Last check before insertion
  if (!$obj->check_and_increment_block_counter ()) return;

  // Increment page block counter
  if ($max_page_blocks_enabled) $ai_wp_data [AI_PAGE_BLOCKS] ++;

  $ai_last_check = AI_CHECK_DEBUG_NO_INSERTION;
  if (!$obj->get_debug_disable_insertion ()) {

    $viewport_classes = $obj->get_client_side_action () == AI_CLIENT_SIDE_ACTION_INSERT ? '' : trim ($obj->get_viewport_classes ());
    $sticky_class = $sticky ? ' ai-sticky-widget' : '';
    $widget_classes = trim ($viewport_classes . $sticky_class);

    $before_widget = $args ['before_widget'];
    if ($widget_classes != "") {
      ai_add_attr_data ($before_widget, 'class', $widget_classes);
    }
    if ($debug_processing) echo ai_debug_widget_comment ('before_widget');
    echo $before_widget;
    if ($debug_processing) echo ai_debug_widget_comment ('before_widget', true);

    if (!empty ($title)) {
      if ($debug_processing) echo ai_debug_widget_comment ('before_title');
      echo $args ['before_title'];
      if ($debug_processing) echo ai_debug_widget_comment ('before_title', true);

      echo apply_filters ('widget_title', $title);

      if ($debug_processing) echo ai_debug_widget_comment ('after_title');
      echo $args ['after_title'];
      if ($debug_processing) echo ai_debug_widget_comment ('after_title', true);
    }

    echo $obj->get_code_for_serverside_insertion (false);

    if ($debug_processing) echo ai_debug_widget_comment ('after_widget');
    echo $args ['after_widget'];
    if ($debug_processing) echo ai_debug_widget_comment ('after_widget', true);

    if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_BLOCKS) != 0 && $obj->get_detection_client_side () && $obj->get_client_side_action () == AI_CLIENT_SIDE_ACTION_SHOW)
      echo $obj->get_code_for_serverside_insertion (false, true);

    $ai_last_check = AI_CHECK_INSERTED;
  }
}

function ai_write_debugging_tools () {
  global $ai_wp_data;

  ai_toolbar_menu_items ();


  echo "<style>

ul.ai-debug-tools {
  list-style: none;
  background: #000;
  color: #eee;
  margin: 0;
  padding: 10px;
  font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif;
  font-size: 14px;
  line-height: 22px;
  -webkit-user-select: none;  /* Chrome all / Safari all */
  -moz-user-select: none;     /* Firefox all */
  -ms-user-select: none;      /* IE 10+ */
  user-select: none;
}

ul.ai-debug-tools li {
  margin: 0;
  padding: 0;
  border: 0;
}

ul.ai-debug-tools a, ul.ai-debug-tools a:link, ul.ai-debug-tools a:visited {
  text-decoration: none;
  color: #aaa;
}

ul.ai-debug-tools a:hover {
  color: #5faff9!important;
}

ul.ai-debug-tools .ab-icon {
  position: relative;
  font: 400 20px/1 dashicons;
  speak: none;
  padding: 4px 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: none!important;
  margin-right: 6px;
  vertical-align: text-top;
}

ul.ai-debug-tools .ai-debug-tools-title {
  padding-bottom: 10px;
}

.ai-debug-tools-title .ab-icon:before {
  content: '\\f111';
  top: 2px;
  color: rgba(240,245,250,.6)!important;
}
ul.ai-debug-tools .ab-icon.on:before {
  color: #00f200!important;
}
ul.ai-debug-tools .ab-icon.red:before {
  color: #f22!important;
}
ul li.ai-debug-ai-toolbar-status {
  color: #aaa;
  margin: 0 0 10px 0;
}
.ai-debug-ai-toolbar-blocks .ab-icon:before {
  content: '\\f135';
}
.ai-debug-ai-toolbar-positions .ab-icon:before {
  content: '\\f207';
}
ul.ai-debug-tools .ai-debug-tools-positions {
  margin-left: 22px;
}
.ai-debug-tools-positions .ab-icon:before {
  content: '\\f522';
}
.ai-debug-ai-toolbar-tags .ab-icon:before {
  content: '\\f475';
}
.ai-debug-ai-toolbar-no-insertion .ab-icon:before {
  content: '\\f214';
}
.ai-debug-ai-toolbar-adb-status .ab-icon:before {
  content: '\\f223';
}
.ai-debug-ai-toolbar-adb .ab-icon:before {
  content: '\\f160';
}
.ai-debug-ai-toolbar-processing .ab-icon:before {
  content: '\\f464';
}
</style>
";
  echo '
<ul class="ai-debug-tools">
';
  foreach ($ai_wp_data [AI_DEBUG_MENU_ITEMS] as $menu_item) {
    if (isset ($menu_item ['parent'])) {
      if ($menu_item ['parent'] == 'ai-toolbar-settings') {
        if ($menu_item ['id'] == 'ai-toolbar-status') {
          echo '  <li class="ai-debug-', $menu_item ['id'], '">';
          echo $menu_item ['title'];
          echo "</li>\n";
        } else {
            echo '  <li class="ai-debug-', $menu_item ['id'], '">';
            echo '<a href="', $menu_item ['href'], '">', $menu_item ['title'], '</a>';
            echo "</li>\n";
          }
      }
      elseif ($menu_item ['parent'] == 'ai-toolbar-positions') {
        echo '  <li class="ai-debug-', $menu_item ['id'], ' ai-debug-tools-positions">';
        echo '<a href="', $menu_item ['href'], '">', $menu_item ['title'], '</a>';
        echo "</li>\n";
      }
    } else if ($menu_item ['id'] == 'ai-toolbar-settings') {
        echo '  <li class="ai-debug-', $menu_item ['id'], ' ai-debug-tools-title">';
        echo '<a href="', $menu_item ['href'], '">', $menu_item ['title'], '</a>';
        echo "</li>\n";
      }
  }

  echo '</ul>
';
}

function ai_special_widget ($args, $instance, $block) {
  global $ai_wp_data, $ai_db_options, $block_object;

  $debug_processing = ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0;

  $sticky = isset ($instance ['sticky']) ? $instance ['sticky'] : 0;

  if ($sticky) {
    $ai_wp_data [AI_STICKY_WIDGETS] = true;
    ai_add_attr_data ($args ['before_widget'], 'class', 'ai-sticky-widget');
  }

  if ($debug_processing) echo ai_debug_widget_comment ('before_widget');
  echo $args ['before_widget'];
  if ($debug_processing) echo ai_debug_widget_comment ('before_widget', true);

  $title = !empty ($instance ['widget-title']) ? $instance ['widget-title'] : '';

  if (!empty ($title)) {
    if ($debug_processing) echo ai_debug_widget_comment ('before_title');
    echo $args ['before_title'];
    if ($debug_processing) echo ai_debug_widget_comment ('before_title', true);

    echo apply_filters ('widget_title', $title);

    if ($debug_processing) echo ai_debug_widget_comment ('after_title');
    echo $args ['after_title'];
    if ($debug_processing) echo ai_debug_widget_comment ('after_title', true);
  }

  switch ($block) {
    case 0:
      echo "<pre style='", AI_DEBUG_WIDGET_STYLE, "'>\n";
      ai_write_debug_info ();
      echo "</pre>";

      if ($ai_wp_data [AI_CLIENT_SIDE_DETECTION]) {
        for ($viewport = 1; $viewport <= 6; $viewport ++) {
          $viewport_name = get_viewport_name ($viewport);
          if ($viewport_name != '') {
            echo "<pre class='ai-viewport-" . $viewport ."' style='", AI_DEBUG_WIDGET_STYLE, "'>\n";
            echo "CLIENT-SIDE DEVICE:      ", $viewport_name;
            echo "</pre>";
          }
        }
      }
      break;
    case - 2:
      ai_write_debugging_tools ();
      break;
  }

  if ($debug_processing) echo ai_debug_widget_comment ('after_widget');
  echo $args ['after_widget'];
  if ($debug_processing) echo ai_debug_widget_comment ('after_widget', true);
}

function ai_pro () {
  if (!function_exists ('ai_remote_plugin_data')) return false;
  return ai_remote_plugin_data ('pro', true);
}

function ai_remote ($name, $default_data = false) {
  if (!function_exists ('ai_remote_plugin_data')) return $default_data;
  return ai_remote_plugin_data ($name, $default_data);
}

function ai_is_json ($string, $return_data = false) {
  $data = json_decode ($string);
  return (json_last_error () == JSON_ERROR_NONE) ? ($return_data ? $data : true) : false;
}

function ai_structured_data_item ($indexes, $data, $value = '!@!') {
  if (is_object ($data)) $data = (array) $data;

  if (empty ($indexes)) {
    if ($value == '!@!') return true;

    return $data == $value;
  }

  if (!is_array ($data)) return false;

  // Workaround because after json decode array indexes are strings and can't be accessed
  $data = array_combine (array_keys ($data), array_values ($data));

  $index = array_shift ($indexes);

  if ($index == '*') {
    foreach ($data as $data_index => $data_item) {
      if (ai_structured_data_item ($indexes, $data_item, $value)) return true;
    }
  }
  elseif (isset ($data [$index])) {
    return ai_structured_data_item ($indexes, $data [$index], $value);
  }

  return false;
}

function ai_structured_data ($data, $selector, $value = '') {
  if (!is_array ($data)) return false;
  if (strpos ($selector, '[') === false) return false;

  $indexes = explode ('[', str_replace (array (']', ' '), '', $selector));

  return ai_structured_data_item ($indexes, $data, $value);
}

function check_url_parameter_cookie_list ($list, $white_list, $parameters, &$found) {
  $parameter_list = trim ($list);
  $return = $white_list;
  $found = false;
  $query_string = isset ($_SERVER ['QUERY_STRING']) ? trim ($_SERVER ['QUERY_STRING']) != '' : false;

  if ($parameter_list == AD_EMPTY_DATA) return true;

  if (count ($parameters) == 0 && strpos ($list, '#') === false) {
    return !$return;
  }

  $found = true;

  $parameter_data = array ();
  foreach ($parameters as $index => $parameter) {
    $parameter_data [$index] = false;
    if (is_string ($parameter)) {
      $data = trim (stripslashes ($parameter));
      if (strpos ($data, '{') === 0) {
        $parameter_data [$index] = ai_is_json ($data, true);
      }
      $parameters [$index] = urlencode ($parameter);
    }
  }

  $parameters_listed = explode (",", $parameter_list);
  foreach ($parameters_listed as $index => $parameter_listed) {
    if (trim ($parameter_listed) == "") unset ($parameters_listed [$index]); else
      $parameters_listed [$index] = trim ($parameter_listed);
  }

  foreach ($parameters_listed as $parameter) {
    if ($parameter == '#') {
      if (!$query_string) return $return;
    }
    elseif (strpos ($parameter, "=") !== false) {
      $parameter_value = explode ("=", $parameter);

      if (array_key_exists ($parameter_value [0], $parameters) && $parameters [$parameter_value [0]] == $parameter_value [1]) return $return;

      if (ai_structured_data ($parameter_data, $parameter_value [0], $parameter_value [1])) return $return;
    }
    else {
      if (array_key_exists ($parameter, $parameters)) return $return;

      if (ai_structured_data ($parameter_data, $parameter)) return $return;
    }
  }

  $found = false;
  return !$return;
}


function check_url_parameter_list ($url_parameters, $white_list, &$found) {
  return check_url_parameter_cookie_list ($url_parameters, $white_list, $_GET, $found);
}

function check_cookie_list ($url_parameters, $white_list) {
  $dummy = false;
  return check_url_parameter_cookie_list ($url_parameters, $white_list, $_COOKIE, $dummy);
}

function check_url_parameter_and_cookie_list ($url_parameters, $white_list) {
  $dummy = false;
  return check_url_parameter_cookie_list ($url_parameters, $white_list, array_merge ($_COOKIE, $_GET), $dummy);
}

function check_scheduled_rotation ($scheduling) {
  If (strpos ($scheduling, '=') === false) return false;

  $result = true;
  if (strpos ($scheduling, '^') !== false) {
    $result = false;
    $scheduling = substr ($scheduling, 1);
  }

  $scheduling_data_array = explode ('=', $scheduling);

  if (strpos ($scheduling_data_array [0], '%') !== false) {
    $scheduling_data_time = explode ('%', $scheduling_data_array [0]);
  } else $scheduling_data_time = array ($scheduling_data_array [0]);

  $time_unit = strtolower (trim ($scheduling_data_time [0]));

  $time_division = isset ($scheduling_data_time [1]) ? trim ($scheduling_data_time [1]) : 0;
  $scheduling_time_option = str_replace (' ', '',  ($scheduling_data_array [1]));

  $current_time = current_time ('timestamp');

  $time_value = 0;
  switch ($time_unit) {
    case 's':
      $time_value = ltrim (date ('s', $current_time), '0');
      break;
    case 'i':
      $time_value = ltrim (date ('i', $current_time), '0');
      break;
    case 'h':
      $time_value = date ('G', $current_time);
      break;
    case 'd':
      $time_value = date ('j', $current_time);
      break;
    case 'm':
      $time_value = date ('n', $current_time);
      break;
    case 'y':
      $time_value = date ('Y', $current_time);
      break;
    case 'w':
      $time_value = date ('w', $current_time);
      if ($time_value == 0) $time_value = 6; else $time_value = $time_value - 1;
  }

  $time_modulo = $time_division != 0 ? $time_value % $time_division : $time_value;

  $scheduling_time_options = explode (',', $scheduling_time_option);
  foreach ($scheduling_time_options as $time_option) {
    if (strpos ($time_option, '-') !== false) {
      $time_limits = explode ('-', $time_option);
      if ($time_modulo >= $time_limits [0] && $time_modulo <= $time_limits [1]) return $result;
    } else if ($time_modulo == $time_option) return $result;
  }

  return !$result;
}

function check_scheduling_time ($start_time, $end_time, $days_in_week, $between) {
  if (!function_exists ('ai_scheduling_options')) return true;

  $current_time = current_time ('timestamp');

  if (strpos ($start_time, '-') === false && strpos ($end_time, '-') === false) {
    $current_time -= (strtotime (current_time ('Y-m-d')));
    if ($current_time < 0) {
      $current_time += 24 * 3600;
    }
  }

  $start_time   = strtotime ($start_time, $current_time);
  $end_time     = strtotime ($end_time,   $current_time);

  $current_weekday = date ('w', $current_time);
  if ($current_weekday == 0) $current_weekday = 6; else $current_weekday --;
  $weekdays = explode (',', $days_in_week);
  if (isset ($weekdays [0]) and $weekdays [0] === '') $weekdays = array ();

  $insertion_enabled = $current_time >= $start_time && $current_time < $end_time && in_array ($current_weekday, $weekdays);

  return ($between ? $insertion_enabled : !$insertion_enabled);
}

function check_referer_list ($referers, $white_list) {

  if (isset ($_GET ['referrer'])) {
    $referer_host = esc_html ($_GET ['referrer']);
  }
  elseif (isset ($_SERVER['HTTP_REFERER'])) {
      $referer_host = strtolower (parse_url ($_SERVER['HTTP_REFERER'], PHP_URL_HOST));
  }
  else $referer_host = '';

//  echo " referers='$referers' referer_host='$referer_host' ";

  $return = $white_list;

  $domains = strtolower (trim ($referers));
  if ($domains == AD_EMPTY_DATA) return true;
  $domains = explode (",", $domains);

  foreach ($domains as $domain) {
    $domain = trim ($domain);
    if ($domain == "") continue;

    if ($domain [0] == '*') {
      if ($domain [strlen ($domain) - 1] == '*') {
        $domain = substr ($domain, 1, strlen ($domain) - 2);
        if (strpos ($referer_host, $domain) !== false) return $return;
      } else {
          $domain = substr ($domain, 1);
          if (substr ($referer_host, - strlen ($domain)) == $domain) return $return;
        }
    }
    elseif ($domain [strlen ($domain) - 1] == '*') {
      $domain = substr ($domain, 0, strlen ($domain) - 1);
      if (strpos ($referer_host, $domain) === 0) return $return;
    }

    if ($domain == "#") {
      if ($referer_host == "") return $return;
    } elseif ($domain == $referer_host) return $return;
  }
  return !$return;
}

function check_client_list ($clients, $white_list) {
  global $ai_wp_data;

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

  if (version_compare (phpversion (), "5.6", ">=")) {
    if (!isset ($ai_wp_data [AI_AGENT])) {
      require_once AD_INSERTER_PLUGIN_DIR.'includes/agent/Agent.php';
      $agent = new Agent();
      $ai_wp_data [AI_AGENT] = $agent;
    } else $agent = $ai_wp_data [AI_AGENT];

    $language  = isset ($_SERVER ['HTTP_ACCEPT_LANGUAGE']) ? $_SERVER ['HTTP_ACCEPT_LANGUAGE'] : '';

    $return = $white_list;

    if ($clients == AD_EMPTY_DATA) return true;
    $clients = explode (",", $clients);

    if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
      if (!isset ($ai_wp_data [AI_CLIENTS])) $ai_wp_data [AI_CLIENTS] = array ();
      foreach ($clients as $client) {
        $client = trim ($client);
        if ($client == "") continue;
        $ai_wp_data [AI_CLIENTS][] = $client;
      }
    }

    foreach ($clients as $client) {
      $client = trim ($client);
      if ($client == "") continue;

      $check_language = false;
      if (strpos ($client, 'language:') === 0) {
        $check_language = true;
        $client = substr ($client, 9);
      }

      if ($check_language) {
        if ($client [0] == '*') {
          if ($client [strlen ($client) - 1] == '*') {
            $client = substr ($client, 1, strlen ($client) - 2);
            if (stripos ($language, $client) !== false) return $return;
          } else {
              $client = substr ($client, 1);
              if (strtolower (substr ($language, - strlen ($client))) == strtolower ($client)) return $return;
            }
        }
        elseif ($client [strlen ($client) - 1] == '*') {
          $client = substr ($client, 0, strlen ($client) - 1);
          if (stripos ($language, $client) === 0) return $return;
        }
        elseif (strtolower ($client) == strtolower ($language)) return $return;
      } else {
          if ($client [0] == '*') {
            if ($client [strlen ($client) - 1] == '*') {
              $client = substr ($client, 1, strlen ($client) - 2);
              if (stripos ($agent->getUserAgent (), $client) !== false) return $return;
            } else {
                $client = substr ($client, 1);
                if (strtolower (substr ($agent->getUserAgent (), - strlen ($client))) == strtolower ($client)) return $return;
              }
          }
          elseif ($client [strlen ($client) - 1] == '*') {
            $client = substr ($client, 0, strlen ($client) - 1);
            if (stripos ($agent->getUserAgent (), $client) === 0) return $return;
          }
          elseif ($agent->is ($client)) return $return;
        }

    }
    return !$return;
  } else {
      return true;
    }
}

function ai_check_block ($block) {
  global $ai_delay_showing_pageviews;

  $ai_cookie_name = 'aiBLOCKS';

  if (isset ($_COOKIE [$ai_cookie_name])) {
    $ai_cookie = json_decode (stripslashes ($_COOKIE [$ai_cookie_name]));
  } else $ai_cookie = new stdClass();

  if (isset ($ai_delay_showing_pageviews)) {
    if (!isset ($ai_cookie->$block)) {
      $ai_cookie->$block = new stdClass();
    }

    if (!isset ($ai_cookie->$block->d)) {
      $ai_cookie->$block->d = $ai_delay_showing_pageviews;
    }

    unset ($ai_delay_showing_pageviews);
  }

  if (isset ($ai_cookie)) {
    if (isset ($ai_cookie->$block) && is_object ($ai_cookie->$block)) {
      foreach ($ai_cookie->$block as $property => $value) {
        switch ($property) {
          case 'x':
            $closed_for = $value - time ();

            if ($closed_for > 0) {
              return false;
            } else {
                ai_set_cookie ($block, 'x', '');
              }
            break;
          case 'd':
            if ($value != 0) {
              return false;
            }
            break;
          case 'i':
            if ($value == 0) {
              return false;
            }
            elseif ($value < 0) {
              $closed_for = - $value - time ();

              if ($closed_for > 0) {
                return false;
              } else {
                  ai_set_cookie ($block, 'i', '');
                  if (!isset ($ai_cookie->$block->c) && !isset ($ai_cookie->$block->x)) {
                    ai_set_cookie ($block, 'h', '');
                  }
                }
            }
            break;
          case 'ipt':
            if ($value == 0 && isset ($ai_cookie->$block->it)) {
              $closed_for = $ai_cookie->$block->it - time ();
              if ($closed_for > 0) {
                return false;
              }
            }
            break;
          case 'c':
            if ($value == 0) {
              return false;
            }
            elseif ($value < 0) {
              $closed_for = - $value - time ();

              if ($closed_for > 0) {
                return false;
              } else {
                  ai_set_cookie ($block, 'c', '');
                  if (!isset ($ai_cookie->$block->i) && !isset ($ai_cookie->$block->x)) {
                    ai_set_cookie ($block, 'h', '');
                  }
                }
            }
            break;
          case 'cpt':
            if ($value == 0 && isset ($ai_cookie->$block->ct)) {
              $closed_for = $ai_cookie->$block->ct - time ();
              if ($closed_for > 0) {
                return false;
              }
            }
            break;
        }
      }

      if (isset ($ai_cookie->G) && is_object ($ai_cookie->G) && isset ($ai_cookie->G->cpt)) {
        if ($ai_cookie->G->cpt == 0 && isset ($ai_cookie->$block->ct)) {
          $closed_for = $ai_cookie->$block->ct - time ();
          if ($closed_for > 0) {
            return false;
          }
        }
      }
    }
  }

  return true;
}

function ai_get_category_list () {
  if (function_exists ('ai_remote_plugin_data')) {
    $data = ai_remote_plugin_data ('categories');
    if (is_array ($data)) return $data;
  }

  $args = array ("hide_empty" => 0, 'number' => AI_MAX_LIST_ITEMS);
  return (get_categories ($args));
}

function ai_get_tag_list () {
  if (function_exists ('ai_remote_plugin_data')) {
    $data = ai_remote_plugin_data ('tags');
    if (is_array ($data)) return $data;
  }

  $args = array ('number' => AI_MAX_LIST_ITEMS);
  return (get_tags ($args));
}

function ai_get_taxonomy_list () {
  if (function_exists ('ai_remote_plugin_data')) {
    $data = ai_remote_plugin_data ('taxonomies');
    if (is_array ($data)) return $data;
  }

  $term_data = get_terms ();
  $taxonomies = array ();
  foreach ($term_data as $term) {
    if ($term->taxonomy == 'category') continue;
    if ($term->taxonomy == 'post_tag') continue;
    $taxonomies [strtolower ($term->taxonomy) . ':' . strtolower ($term->slug)] = $term->name;
    if (count ($taxonomies) >= AI_MAX_LIST_ITEMS) break;
  }

  $args = array (
    'public'    => true,
  );
  $custom_post_types = get_post_types ($args, 'objects', 'and');
  foreach ($custom_post_types as $custom_post_type => $custom_post_data) {
    $taxonomies ['post-type:' . strtolower ($custom_post_type)] = $custom_post_data->labels->singular_name;
  }

  $editable_roles = get_editable_roles ();
  foreach ($editable_roles as $editable_role_slug => $editable_role) {
    $taxonomies ['user-role:' . strtolower ($editable_role_slug)] = $editable_role ['name'];
  }

  $taxonomies ['user:logged-in'] = 'User logged in';
  $taxonomies ['user:not-logged-in'] = 'User not logged in';

  $users = get_users ();
  foreach ($users as $user) {
    $taxonomies ['user:'   . strtolower ($user->data->user_login)] = $user->data->display_name;
    $taxonomies ['author:' . strtolower ($user->data->user_login)] = $user->data->display_name;
    if (count ($taxonomies) >= AI_MAX_LIST_ITEMS) break;
  }

  ksort ($taxonomies);

  return $taxonomies;
}

function ai_get_post_id_list () {
  if (function_exists ('ai_remote_plugin_data')) {
    $data = ai_remote_plugin_data ('post-ids');
    if (is_array ($data)) return $data;
  }

  $args = array (
    'public'    => true,
    '_builtin'  => false
  );
  $custom_post_types = get_post_types ($args, 'names', 'and');
  $screens = array_values (array_merge (array ('post', 'page'), $custom_post_types));

  $args = array (
    'posts_per_page'   => 3 * AI_MAX_LIST_ITEMS,
    'offset'           => 0,
    'category'         => '',
    'category_name'    => '',
    'orderby'          => 'ID',
    'order'            => 'ASC',
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
  $posts_pages = array_slice ($posts_pages, 0, AI_MAX_LIST_ITEMS);

  foreach ($posts_pages as $index => $post_page) {
    unset ($posts_pages [$index]->post_content);
  }

  return $posts_pages;
}

function ai_check_filter_hook ($block) {
  // Called by W3TC code and Ajax requests

  $check = apply_filters ("ai_block_insertion_check", true, $block, false);

  // Called with false as $server_side_check = client-side check or W3TC check so null should not be returned from the filter hook - return false
  if ($check === null) {
    return false;
  }

  return $check;
}

function ai_set_cookie ($block, $property, $value) {
  $ai_cookie_name = 'aiBLOCKS';

  if (isset ($_COOKIE [$ai_cookie_name])) {
    $ai_cookie = json_decode (stripslashes ($_COOKIE [$ai_cookie_name]));
  } else $ai_cookie = new stdClass();

//  print_r ($ai_cookie);

  if ($value == '') {
    if (isset ($ai_cookie->$block) && is_object ($ai_cookie->$block)) {
      unset ($ai_cookie->$block->$property);
      $ai_cookie_array = (array) $ai_cookie->$block;
      if (empty ($ai_cookie_array)) {
        unset ($ai_cookie->$block);
      }
    }
  } else {
      if (!isset ($ai_cookie->$block)) {
        $ai_cookie->$block = new stdClass();
      }
      $ai_cookie->$block->$property = $value;
    }

  $ai_cookie_array = (array) $ai_cookie;
  if (empty ($ai_cookie_array)) {
    unset ($_COOKIE [$ai_cookie_name]);
    ai_setcookie ($ai_cookie_name, null, - 1, '/');
  } else {
      $_COOKIE [$ai_cookie_name] = addslashes (json_encode ($ai_cookie));
      ai_setcookie ($ai_cookie_name, $_COOKIE [$ai_cookie_name], time () + 365 * 24 * 3600, '/');
    }

//    if (isset ($_COOKIE [$ai_cookie_name])) {
//      print_r ($_COOKIE [$ai_cookie_name]);
//    } else echo "NO COOKIE <br />";
}

function get_paragraph_start_positions ($content, $multibyte, $paragraph_end_positions, $paragraph_start_strings, &$paragraph_positions, &$active_paragraph_positions) {
  foreach ($paragraph_start_strings as $paragraph_start_string) {
    if (trim ($paragraph_start_string) == '') continue;

    $last_position = - 1;

    $paragraph_start_string = trim ($paragraph_start_string);
    if ($paragraph_start_string == "#") {
      $paragraph_start = "\r\n\r\n";
      if (!in_array (0, $paragraph_positions)) {
        $paragraph_positions [] = 0;
        $active_paragraph_positions [0] = 1;
      }
    } else $paragraph_start = '<' . $paragraph_start_string;

    if ($multibyte) {
      $paragraph_start_len = mb_strlen ($paragraph_start);
      while (mb_stripos ($content, $paragraph_start, $last_position + 1) !== false) {
        $last_position = mb_stripos ($content, $paragraph_start, $last_position + 1);
        if ($paragraph_start_string == "#") {
          $paragraph_positions [] = $last_position + 4;
          $active_paragraph_positions [$last_position + 4] = 1;
        } elseif (mb_substr ($content, $last_position + $paragraph_start_len, 1) == ">" || mb_substr ($content, $last_position + $paragraph_start_len, 1) == " ") {
            $paragraph_positions [] = $last_position;
            $active_paragraph_positions [$last_position] = 1;
          }
      }
    } else {
        $paragraph_start_len = strlen ($paragraph_start);
        while (stripos ($content, $paragraph_start, $last_position + 1) !== false) {
          $last_position = stripos ($content, $paragraph_start, $last_position + 1);
          if ($paragraph_start_string == "#") {
            $paragraph_positions [] = $last_position + 4;
            $active_paragraph_positions [$last_position + 4] = 1;
          } elseif ($content [$last_position + $paragraph_start_len] == ">" || $content [$last_position + $paragraph_start_len] == " ") {
              $paragraph_positions [] = $last_position;
              $active_paragraph_positions [$last_position] = 1;
            }
        }
      }
  }

  // Consistency check
  if (count ($paragraph_end_positions) != 0) {
    foreach ($paragraph_end_positions as $index => $paragraph_end_position) {
      if ($index == 0) {
        if (!isset ($paragraph_positions [$index]) || $paragraph_positions [$index] >= $paragraph_end_position) {
          $paragraph_positions [$index] = 0;
        }
      } else {
          if (!isset ($paragraph_positions [$index]) || $paragraph_positions [$index] >= $paragraph_end_position || $paragraph_positions [$index] <= $paragraph_end_positions [$index - 1]) {
            $paragraph_positions [$index] = $paragraph_end_positions [$index - 1] + 1;
          }
        }
    }
  }
}

function get_paragraph_end_positions ($content, $multibyte, $paragraph_start_positions, $paragraph_end_strings, &$paragraph_positions, &$active_paragraph_positions) {

  $no_closing_tag = array ('img', 'hr', 'br');

  foreach ($paragraph_end_strings as $paragraph_end_string) {

    $last_position = - 1;

    $paragraph_end_string = trim ($paragraph_end_string);
    if ($paragraph_end_string == '') continue;

    if (in_array ($paragraph_end_string, $no_closing_tag)) {
      if (preg_match_all ("/<$paragraph_end_string([^>]*?)>/", $content, $images)) {
        foreach ($images [0] as $paragraph_end) {
          if ($multibyte) {
            $last_position = mb_stripos ($content, $paragraph_end, $last_position + 1) + mb_strlen ($paragraph_end) - 1;
            $paragraph_positions [] = $last_position;
            $active_paragraph_positions [$last_position] = 1;
          } else {
              $last_position = stripos ($content, $paragraph_end, $last_position + 1) + strlen ($paragraph_end) - 1;
              $paragraph_positions [] = $last_position;
              $active_paragraph_positions [$last_position] = 1;
            }
        }
      }
      continue;
    }
    elseif ($paragraph_end_string == "#") {
      $paragraph_end = "\r\n\r\n";
      if (!in_array ($last_content_position, $paragraph_positions)) {
        $paragraph_positions [] = $last_content_position;
        $active_paragraph_positions [$last_content_position] = 1;
      }
    } else $paragraph_end = '</' . $paragraph_end_string . '>';

    if ($multibyte) {
      while (mb_stripos ($content, $paragraph_end, $last_position + 1) !== false) {
        $last_position = mb_stripos ($content, $paragraph_end, $last_position + 1) + mb_strlen ($paragraph_end) - 1;
        if ($paragraph_end_string == "#") {
          $paragraph_positions [] = $last_position - 4;
          $active_paragraph_positions [$last_position - 4] = 1;
        } else {
            $paragraph_positions [] = $last_position;
            $active_paragraph_positions [$last_position] = 1;
          }
      }
    } else {
        while (stripos ($content, $paragraph_end, $last_position + 1) !== false) {
          $last_position = stripos ($content, $paragraph_end, $last_position + 1) + strlen ($paragraph_end) - 1;
          if ($paragraph_end_string == "#") {
            $paragraph_positions [] = $last_position - 4;
            $active_paragraph_positions [$last_position - 4] = 1;
          } else {
              $paragraph_positions [] = $last_position;
              $active_paragraph_positions [$last_position] = 1;
            }
        }
      }
  }

  // Consistency check
  if (count ($paragraph_start_positions) != 0) {
    foreach ($paragraph_start_positions as $index => $paragraph_start_position) {
      if ($index == count ($paragraph_start_positions) - 1) {
        if (!isset ($paragraph_positions [$index]) || $paragraph_positions [$index] <= $paragraph_start_position) {
          $paragraph_positions [$index] = strlen ($content) - 1;
        }
      } else {
          if (!isset ($paragraph_positions [$index]) || $paragraph_positions [$index] <= $paragraph_start_position || $paragraph_positions [$index] >= $paragraph_start_positions [$index + 1]) {
            $paragraph_positions [$index] = $paragraph_start_positions [$index + 1] - 1;
          }
        }
    }
  }
}

function ai_secret_key () {
  $key = '';
  if (defined ('NONCE_KEY')) {
    $key = NONCE_KEY;
  }
  $key .= AD_INSERTER_VERSION;
  return (substr (preg_replace ("/[^A-Za-z]+/", '', base64_encode ($key)), 0, 16));
}

//function ai_the_generator ($generator) {
////  return preg_replace ('/content="(.*?)"/', 'content="$1, '.AD_INSERTER_NAME.' '. AD_INSERTER_VERSION.'"', $generator);
//  return $generator . PHP_EOL . '<meta name="generator" content="'.AD_INSERTER_NAME.' '.AD_INSERTER_VERSION.'" />';
//}

function ai_ampforwp_check_disabled () {
  if (is_multisite()) {
    $option_active_plugins = array_merge (array_flip (get_site_option ('active_sitewide_plugins', array ())), get_option ('active_plugins', array ()));
  } else $option_active_plugins = get_option ('active_plugins');

  $present = false;
  foreach ($option_active_plugins as $option_active_plugin) {
    if ($option_active_plugin == AD_INSERTER_SLUG . '/ad-inserter.php') {
      $present = true;
      break;
    }
  }

  if (!$present) return false;

  if (function_exists ('ampforwp_api_request_disable_plugin')) {
    $option_active_plugins = ampforwp_api_request_disable_plugin ($option_active_plugins);
  }

  $disabled = true;
  foreach ($option_active_plugins as $option_active_plugin) {
    if ($option_active_plugin == AD_INSERTER_SLUG . '/ad-inserter.php') {
      $disabled = false;
      break;
    }
  }

  return $disabled;
}


function ai_amp_plugin_custom_css () {
  if (is_multisite()) {
    $option_active_plugins = array_merge (array_flip (get_site_option ('active_sitewide_plugins', array ())), get_option ('active_plugins', array ()));
  } else $option_active_plugins = get_option ('active_plugins');

//  echo "<pre>";
//  print_r ($option_active_plugins);
//  echo "</pre>";

  foreach ($option_active_plugins as $option_active_plugin) {
    if ($option_active_plugin == 'amp-wp/amp-wp.php') {
      return true;
    }
    if ($option_active_plugin == 'better-amp/better-amp.php') {
      return true;
    }
  }

  return false;
}

function ai_primary_category () {
  $primary_category = ai_rank_math_primary_category ();
  if ($primary_category != '') {
    return $primary_category;
  }
  // Returns the first category if primary category is not defined
  $primary_category = ai_yoast_primary_category ();
  return $primary_category;
}

function ai_yoast_primary_category () {
  $primary_category = '';
  $category = get_the_category ();
  // If post has a category assigned.
  if ($category) {
    if (class_exists ('WPSEO_Primary_Term')) {
      // Show the post's 'Primary' category, if this Yoast feature is available, & one is set
      $wpseo_primary_term = new WPSEO_Primary_Term ('category', get_the_id ());
      $wpseo_primary_term = $wpseo_primary_term->get_primary_term ();
      $term = get_term ($wpseo_primary_term);

      if (is_wp_error ($term)) {
        // Default to first category (not Yoast) if an error is returned
        $primary_category = $category [0]->slug;
      } else {
        // Yoast Primary category
        $primary_category = $term->slug;
      }
    } else {
        // Default, display the first category in WP's list of assigned categories
        $primary_category = $category [0]->slug;
      }
  }
  return $primary_category;
}

function ai_rank_math_primary_category () {
  $primary_category = '';
  if (class_exists ('RankMath')) {
    $primary_cat_id = get_post_meta (get_the_id (), 'rank_math_primary_category', true);
    if ($primary_cat_id) {
      $category = get_term ($primary_cat_id, 'category');
      $primary_category = $category->slug;
    }
  }
  return $primary_category;
}

function ai_is_page_builder () {
//  echo $_SERVER ['HTTP_HOST'], ' ', $_SERVER ['REQUEST_URI'], "<br />\n";
//  global $ai_wp_data;
//  echo $ai_wp_data [AI_WP_PAGE_TYPE], "<br />\n";

  // Elemetor
  if (class_exists ('Elementor\Plugin') && (\Elementor\Plugin::$instance->editor->is_edit_mode () || \Elementor\Plugin::$instance->preview->is_preview_mode ())) {
    return true;
  }

  return false;
}


function ai_add_rewrite_rules () {
  if (get_option (AI_ADS_TXT_NAME) !== false) {
    add_rewrite_rule ('ads\.txt', str_replace (home_url () .'/', '', admin_url ('admin-ajax.php?action=ai_ajax&ads-txt=')), 'top');
  }

  if (function_exists ('ai_add_rewrite_rules_2')) ai_add_rewrite_rules_2 ();
}

function ai_js_dom_ready ($js_code, $script_tag = true, $script_class = '') {
  $id = rand (100000, 999999) . rand (100000, 999999);
  $code = '';

  if ($script_class != '') {
     $script_class = ' class="' . $script_class . '"';
  }

  if ($script_tag) {
    $code .= "<!-- AI_JS --><script{$script_class}>
  ";

    $js_code = '/* AI_JS */' . $js_code . '/* AI_JS */';
  }

  $code .= "ai_run_{$id} = function(){{$js_code}};";

  $code .= "
";

  if ($script_tag) {
    $code .= "  ";
  }

  $code .= "if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) ai_run_{$id} (); else document.addEventListener ('DOMContentLoaded', ai_run_{$id});";

  if ($script_tag) {
    $code .= "
</script><!-- AI_JS -->
";
  }
  return ($code);
}

function ai_extract_js_code ($code) {
  global $ai_wp_data;

  if (strpos ($code, '<!-- AI_JS -->') !== false) {
    if (preg_match_all ('#/\* AI_JS \*/(.+?)/\* AI_JS \*/#s', $code, $js_matches)) {
      $js_code_dom_ready = '';
      foreach ($js_matches [1] as $js_code) {
        $js_code_dom_ready .= $js_code."\n";
      }
      $ai_wp_data [AI_FOOTER_JS_CODE_DOM_READY] = $js_code_dom_ready . $ai_wp_data [AI_FOOTER_JS_CODE_DOM_READY];
    }

    $code = preg_replace ('#<!-- AI_JS -->(.+?)<!-- AI_JS -->#s', '', $code);
  }
  return $code;
}

function ai_strip_js_markers ($code) {
  $code = preg_replace ('#<!-- AI_JS -->#s', '', $code);
  $code = preg_replace ('#/\* AI_JS \*/#s', '', $code);

  return ($code);
}

function ai_strip_w3tc_markers ($code) {
  if (defined ('W3TC_DYNAMIC_SECURITY')) {
//    $code = preg_replace ('#<!-- mfunc '.W3TC_DYNAMIC_SECURITY.' -->(.+?)<!-- /mfunc '.W3TC_DYNAMIC_SECURITY.' -->#s', '', $code);
    $code = preg_replace ('#<!-- mfunc '.W3TC_DYNAMIC_SECURITY.' (.+?) --><!-- /mfunc '.W3TC_DYNAMIC_SECURITY.' -->#s', '', $code);
  }

  return ($code);
}

function ai_extract_debug_bar ($ai_code) {
  if (preg_match ('#<section class=["\']ai-debug-bar.*?</section>#s', $ai_code, $match)) {
    $debug_bar = str_replace (array ('ai-debug-default', 'debug-viewport-invisible'), '', $match [0]);
    $debug_bar = preg_replace ('#<kbd class=["\']ai-debug-text-center["\']>(.*?)<kbd#s', '<kbd class="ai-debug-text-center"><kbd', $debug_bar);

    if (preg_match ('#<pre class=["\']ai-w3tc-debug ai-w3tc-run.*?</pre>#s', $ai_code, $match)) {
      $w3tc_debug = $match [0];
    } else $w3tc_debug = '';

    return '<section class="ai-debug-block">' . $debug_bar . $w3tc_debug . '</section><!-- AI-W3TC-LOG -->';
  }
}

function ai_w3tc_debug_info ($w3tc_debug, $class = '') {
  return '<pre class="ai-w3tc-debug '.$class.'">' . implode ("\n", $w3tc_debug) . "</pre>\n";
}

function ai_w3tc_block_start ($block) {
  global $ai_w3tc_nesting_level;

  if (!isset ($ai_w3tc_nesting_level)) {
    $ai_w3tc_nesting_level = 0;
  }

  $ai_w3tc_nesting_level ++;

  if ($ai_w3tc_nesting_level > 1) {
    ai_w3tc_log_run ('');
  }

  ai_w3tc_log_run ("BLOCK $block W3TC START");
}

function ai_w3tc_block_end ($block, $ai_code, $ai_enabled, $ai_fallback, $ai_index) {
  global $ai_w3tc_debugging, $ai_w3tc_nesting_level;

  if (!isset ($ai_w3tc_nesting_level)) {
    $ai_w3tc_nesting_level = 0;
  }

  ai_w3tc_log_run ("BLOCK $block W3TC END" . ($ai_enabled ? '' : ': NOT ENABLED') . ' [' . (isset ($ai_fallback) ? $ai_fallback : '') . ',' . (isset ($ai_index) ? $ai_index : '') . ']');

  $ai_w3tc_nesting_level --;

  if ($ai_w3tc_nesting_level != 0) {
    ai_w3tc_log_run ('');
    return $ai_code = str_replace ("<!-- AI-W3TC-LOG -->", '', $ai_code);
  }

  // Placeholder for additional messages
  $ai_w3tc_debugging []= "<!-- AI-W3TC-LOG-END -->";

  $new_code = str_replace ("<!-- AI-W3TC-LOG -->", ai_w3tc_debug_info ($ai_w3tc_debugging, "ai-w3tc-run"), $ai_code);

  $ai_w3tc_debugging = array ();

  return $new_code;
}

function ai_w3tc_block_end_message ($message, $ai_code) {
  return str_replace ("<!-- AI-W3TC-LOG-END -->", $message . "<!-- AI-W3TC-LOG-END -->\n", $ai_code);
}


function ai_w3tc_log_run ($w3tc_debug_text, $css = '') {
  global $ai_w3tc_debugging, $ai_w3tc_nesting_level;

  if (!isset ($ai_w3tc_debugging)) {
    $ai_w3tc_debugging = array ();
  }

  if (!isset ($ai_w3tc_nesting_level)) {
    $ai_w3tc_nesting_level = 0;
  }

  if ($css != '') {
    if (is_array ($w3tc_debug_text)) {
      foreach ($w3tc_debug_text as $index => $w3tc_debug_line) {
        $w3tc_debug_text [$index] = "<span style='$css'>" . $w3tc_debug_text [$index] . '</span>';
      }
      array_unshift ($w3tc_debug_text, "\n");
    } else $w3tc_debug_text = "<span style='$css'>" . $w3tc_debug_text . '</span>';
  }

  if (isset ($ai_w3tc_nesting_level) && $ai_w3tc_nesting_level > 1) {
    if (is_array ($w3tc_debug_text)) {
      foreach ($w3tc_debug_text as $index => $w3tc_debug_line) {
        $w3tc_debug_text [$index] = str_repeat ('  ', $ai_w3tc_nesting_level - 1) . $w3tc_debug_text [$index];
      }
      array_unshift ($w3tc_debug_text, "\n");
    } else $w3tc_debug_text = str_repeat ('  ', $ai_w3tc_nesting_level - 1) . $w3tc_debug_text;
  }

  if (is_array ($w3tc_debug_text)) {
    $ai_w3tc_debugging = array_merge ($ai_w3tc_debugging, $w3tc_debug_text);
  } else $ai_w3tc_debugging []= $w3tc_debug_text;
}

function ai_w3tc_execute_php ($code, &$ai_index, &$ai_fallback) {
  global $ai_wp_data;

  if (strpos ($code, '<!-- mfunc') === false) return $code;

//  preg_match_all ('#<!-- mfunc '.W3TC_DYNAMIC_SECURITY.' -->(.*?)<!-- /mfunc '.W3TC_DYNAMIC_SECURITY.' -->#', $code, $php_codes);
//  $html_codes = explode ('[?#?]', preg_replace ('#<!-- mfunc '.W3TC_DYNAMIC_SECURITY.' -->(.*?)<!-- /mfunc '.W3TC_DYNAMIC_SECURITY.' -->#', '[?#?]', $code));

  preg_match_all ('#<!-- mfunc '.W3TC_DYNAMIC_SECURITY.' (.*?) --><!-- /mfunc '.W3TC_DYNAMIC_SECURITY.' -->#', $code, $php_codes);
  $html_codes = explode ('[?#?]', preg_replace ('#<!-- mfunc '.W3TC_DYNAMIC_SECURITY.' (.*?) --><!-- /mfunc '.W3TC_DYNAMIC_SECURITY.' -->#', '[?#?]', $code));

  ob_start ();

  if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
    ai_w3tc_log_run ('  EXECUTE PHP' . ' ['.(isset ($ai_fallback) ? $ai_fallback : '') . ',' . (isset ($ai_index) ? $ai_index : '').']');
  }

  foreach ($html_codes as $index => $html_code) {
    if ($html_code != '') {
      if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
        ai_w3tc_log_run ('  HTML: ' . strlen ($html_code) . ' bytes');
      }

      echo $html_code;
    }
    if ($index < count ($html_codes) - 1) {
      if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
        ai_w3tc_log_run ($w3tc_info []= '  PHP:  ' . strlen ($php_codes [1][$index]) . ' bytes');
      }

      eval ($php_codes [1][$index]);
    }
  }

  $html = ob_get_clean();

  if ($ai_wp_data [AI_W3TC_DEBUGGING]) {
    ai_w3tc_log_run ('  EXECUTE END' . ' ['.(isset ($ai_fallback) ? $ai_fallback : '')  . ',' . (isset ($ai_index) ? $ai_index : '').']');
  }

  return ($html);
}

function ai_get_post_id () {
  $queried_object = get_queried_object ();
  $post_id = get_the_ID ();

  if ($queried_object && $post_id) {
    return $post_id;
  }

  if ($queried_object && isset ($queried_object->ID)) {
    return $queried_object->ID;
  }

  return $post_id;
}

function ai_get_post_meta () {
  $meta_value = get_post_meta (ai_get_post_id (), '_adinserter_block_exceptions', true);
  return $meta_value;
}

function ai_post_is_in_child_categories ($category) {
  $category_to_check = get_term_by ('slug', $category, 'category');
  if ($category_to_check) {
    $post_id = ai_get_post_id ();
    $children = get_term_children ($category_to_check->term_id, 'category');
    if ($children && in_category ($children, $post_id)) return true;
  }
  return false;
}

function ai_post_is_in_child_taxonomies ($taxonomy, $term) {
  $taxonomy_to_check = get_term_by ('slug', $term, $taxonomy);
  if ($taxonomy_to_check) {
    $post_id = ai_get_post_id ();
    $children = get_term_children ($taxonomy_to_check->term_id, $taxonomy);
    if ($children && has_term ($children, $taxonomy, $post_id)) return true;
  }
  return false;
}

function ai_get_permalink ($id) {
  if (defined ('AI_CONNECTED_WEBSITE')) {
    $connected_website = get_transient (AI_CONNECTED_WEBSITE);

    if ($connected_website !== false) return '';
  }

  return (get_permalink ($id));
}

function ai_get_edit_post_link ($id) {
  if (defined ('AI_CONNECTED_WEBSITE')) {
    $connected_website = get_transient (AI_CONNECTED_WEBSITE);

    if ($connected_website !== false) return '';
  }

  return (get_edit_post_link ($id));
}


function ai_setcookie ($name, $value, $expire, $path, $samesite = 'Lax') {
  if (PHP_VERSION_ID < 70300) {
    setcookie ($name, $value, $expire, $path . '; samesite=' . $samesite);
    return;
  }

  setcookie ($name, $value, [
    'expires' => $expire,
    'path' => $path,
    'samesite' => $samesite,
  ]);
}


function ai_process_viewport_separators ($code, $shortcode_data) {
  global $ai_wp_data;

  $viewport_shortcode_data = $shortcode_data ['viewport'];

  preg_match_all ('/\|viewport([0-9]+?)\|/', $code, $matches);
  if (count ($matches [1]) != 0) {
    $viewport_parameters = array ();
    foreach ($matches [1] as $match) {
      $viewport_parameters []= $viewport_shortcode_data [$match];
    }
    if ($ai_wp_data [AI_WP_AMP_PAGE]) {
      $code = preg_replace ('/\|viewport([0-9]+?)\|/', '', $code);
    } else $code = preg_replace ('/\|viewport([0-9]+?)\|/', AD_VIEWPORT_SEPARATOR, $code);
  }

  $processed_code = $code;

  if (strpos ($code, AD_VIEWPORT_SEPARATOR) !== false) {

    $processed_code = '';

    $codes = explode (AD_VIEWPORT_SEPARATOR, $code);

    if (trim ($codes [0]) == '') {
      unset ($codes [0]);
      $codes = array_values ($codes);
    } else array_unshift ($viewport_parameters, array ('viewport' => '', 'code' => ''));

    foreach ($codes as $viewport_code_index => $viewport_code) {

      $viewport_code = ai_process_fallback_separator ($viewport_code, $shortcode_data);

      $separator_viewports = explode (',', strtolower ($viewport_parameters [$viewport_code_index]['viewport']));
      foreach ($separator_viewports as $index => $separator_viewport) {
        $separator_viewports [$index] = trim ($separator_viewport);
      }

      $viewport_classes = '';
      for ($viewport = 1; $viewport <= 6; $viewport ++) {
        $viewport_name  = strtolower (get_viewport_name ($viewport));

        if ($viewport_name != '') {
          $viewport_found = in_array ($viewport_name, $separator_viewports);
          if ($viewport_found) {
            $viewport_classes .= " ai-viewport-" . $viewport;
          }
        }
      }

      if ($viewport_classes == '') {
        if ($viewport_parameters [$viewport_code_index]['viewport'] != '') {
          // Invalid viewport - Code will never be inserted
          continue;
        }
      }
      $viewport_classes = trim ($viewport_classes);

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

      if ($insert_code) {
        $code_id = 'ai-viewport-code-' . rand (1000, 9999) . rand (1000, 9999);

        if ($viewport_classes != '') {
          $viewport_classes = 'ai-viewports ' . $viewport_classes . ' ';
        }

        $ai_code = base64_encode (ai_strip_js_markers ($viewport_code));

        $processed_code .= "<div class='{$viewport_classes} {$code_id}' data-insertion='after' data-selector='.{$code_id}' data-insertion-no-dbg data-code='$ai_code'></div>\n";
        if (!get_disable_js_code ()) {
//          $js_code = "ai_insert_code (document.getElementsByClassName ('$code_id') [0]);";
          $js_code = "ai_insert_code_by_class ('$code_id');";

          $processed_code .= ai_strip_js_markers (ai_js_dom_ready ($js_code));
        }
      } else {
          if ($viewport_class != '') {
            $processed_code .= "<div{$viewport_class}>\n" . $viewport_code . "\n</div>\n";
          } else $processed_code .= $viewport_code;
        }
    }
  }

  return $processed_code;
}


function ai_process_fallback_separator ($code, $shortcode_data) {
  global $ai_wp_data;

  $fallback_shortcode_data = $shortcode_data ['fallback'];

  $processed_code = $code;

  if (strpos ($code, AD_FALLBACK_SEPARATOR) !== false) {

    $codes = explode (AD_FALLBACK_SEPARATOR, $code);

    $processed_code = $codes [0];

    // AdSense unfilled
    if (strtolower ($fallback_shortcode_data [0]['fallback']) == 'adsense') {

      $insert_code = get_dynamic_blocks () == AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT;
      switch (strtolower ($fallback_shortcode_data [0]['code'])) {
        case 'insert':
          $insert_code = true;
          break;
        case 'show':
          $insert_code = false;
          break;
      }

      $processed_code = "<div class='ai-fallback-adsense'>" . $processed_code . "</div>\n";

      if ($insert_code) {
        $ai_code = base64_encode (ai_strip_js_markers (trim ($codes [1])));

        $processed_code .= "<div data-code='$ai_code'></div>\n";
      } else {
          $processed_code .= "<div style='display: none;'>\n" . trim ($codes [1]) . "\n</div>\n";
        }
    }
  }

  return $processed_code;
}


function replace_ai_tags ($content, $general_tag = '') {
  global $ai_wp_data;

  if (preg_match_all ('#\[ADINSERTER (.+)\]#i', $content, $matches)) {
    if (count ($matches [0])) {
      foreach ($matches [0] as $match) {
        $content = str_replace ($match, do_shortcode ($match), $content);
      }
    }
  }

  if (strpos ($content, '{') === false) return $content;

  if (isset ($ai_wp_data [AI_SHORTCODES]['atts']) && is_array ($ai_wp_data [AI_SHORTCODES]['atts']) && !empty ($ai_wp_data [AI_SHORTCODES]['atts'])) {
    foreach ($ai_wp_data [AI_SHORTCODES]['atts'] as $name => $value) {
      $content = preg_replace ("/\{\#$name(\:[^{}]*?)?\#\}/i", $value, $content);
    }
  }

  if (!isset ($ai_wp_data [AI_TAGS])) {
    $general_tag = str_replace ("&amp;", " and ", $general_tag);
    $title = $general_tag;
    $short_title = $general_tag;
    $category = $general_tag;
    $categories = $general_tag;
    $categories_array = array ();
    $category_slugs_array = array ();
    $categories_spaces = $general_tag;
    $short_category = $general_tag;
    $tag = $general_tag;
    $tags = $general_tag;
    $tags_array = array ();
    $tag_slugs_array = array ();
    $tags_spaces = $general_tag;
    $categories_single_quotes = $general_tag;
    $categories_double_quotes = $general_tag;
    $smart_tag = $general_tag;
    if ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_CATEGORY) {
        $wp_categories = get_queried_object ();
        if (!empty ($wp_categories) && $wp_categories instanceof WP_Term) {
          $first_category = $wp_categories;
          $category = str_replace ("&amp;", "and", $first_category->name);
          if ($category == _x('Uncategorized', 'category name', 'ad-inserter')) $category = $general_tag;
        } else {
            $category = $general_tag;
        }
        if (strpos ($category, ",") !== false) {
          $short_category = trim (substr ($category, 0, strpos ($category, ",")));
        } else $short_category = $category;
        if (strpos ($short_category, "and") !== false) {
          $short_category = trim (substr ($short_category, 0, strpos ($short_category, "and")));
        }

        $title = $category;
        $title = str_replace ("&amp;", "and", $title);
        $short_title = implode (" ", array_slice (explode (" ", $title), 0, 3));
        $tag = $short_title;
        $smart_tag = $short_title;

//        $wp_categories = get_the_category();
//        if (!empty ($wp_categories)) {
//          foreach ($wp_categories as $single_category) {
//            $categories_array [] = str_replace (array ("&amp;", "#"), array ("and", ""), isset ($single_category->name) ? $single_category->name : '');
//            $category_slugs_array [] = $single_category->slug;
//          }
        $wp_categories = get_queried_object();
        if ($wp_categories instanceof WP_Term) {
          $categories_array [] = str_replace (array ("&amp;", "#"), array ("and", ""), isset ($wp_categories->name) ? $wp_categories->name : '');
          $category_slugs_array [] = $wp_categories->slug;

          $categories               = implode (',',     $categories_array);
          $categories_spaces        = implode (' ',     $categories_array);

          $categories_single_quotes = implode ("','", $categories_array);
          if ($categories_single_quotes != '') $categories_single_quotes = "'".$categories_single_quotes."'";

          $categories_double_quotes = implode ('","', $categories_array);
          if ($categories_double_quotes != '') $categories_double_quotes = '"'.$categories_double_quotes.'"';
        }
    } elseif (is_tag ()) {
        $title = single_tag_title('', false);
        $title = str_replace (array ("&amp;", "#", '"', "'"), array ("and", "", '', ''), $title);
        $short_title = implode (" ", array_slice (explode (" ", $title), 0, 3));
        $category = $short_title;
        if (strpos ($category, ",") !== false) {
          $short_category = trim (substr ($category, 0, strpos ($category, ",")));
        } else $short_category = $category;
        if (strpos ($short_category, "and") !== false) {
          $short_category = trim (substr ($short_category, 0, strpos ($short_category, "and")));
        }
        $tag = $short_title;
        $smart_tag = $short_title;

        $wp_tags = get_the_tags ();
        if (!empty ($wp_tags)) {
          foreach ($wp_tags as $single_tag) {
            $tags_array [] = str_replace (array ("&amp;", "#"), array ("and", ""), isset ($single_tag->name) ? $single_tag->name : '');
            $tag_slugs_array [] = $single_tag->slug;
          }

          $tags = implode (',', $tags_array);
          $tags_spaces = implode (' ', $tags_array);
        }
    } elseif ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_SEARCH) {
        $title = get_search_query();
        $title = str_replace ("&amp;", "and", $title);
        $short_title = implode (" ", array_slice (explode (" ", $title), 0, 3));
        $category = $short_title;
        if (strpos ($category, ",") !== false) {
          $short_category = trim (substr ($category, 0, strpos ($category, ",")));
        } else $short_category = $category;
        if (strpos ($short_category, "and") !== false) {
          $short_category = trim (substr ($short_category, 0, strpos ($short_category, "and")));
        }
        $tag = $short_title;
        $smart_tag = $short_title;
    } elseif ($ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_STATIC || $ai_wp_data [AI_WP_PAGE_TYPE] == AI_PT_POST) {
        $title = get_the_title();
        $title = str_replace (array ("&amp;", '"', "'"), array ("and", '', ''), $title);

        $short_title = implode (" ", array_slice (explode (" ", $title), 0, 3));

        $wp_categories = get_the_category();
        if (!empty ($wp_categories)) {
          foreach ($wp_categories as $single_category) {
            if (isset ($single_category->slug)) {
              $categories_array [] = str_replace (array ("&amp;", "#"), array ("and", ""), isset ($single_category->name) ? $single_category->name : '');
              $category_slugs_array [] = $single_category->slug;
            }
          }

          $categories               = implode (',',   $categories_array);
          $categories_spaces        = implode (' ',   $categories_array);

          $categories_single_quotes = implode ("','", $categories_array);
          if ($categories_single_quotes != '') $categories_single_quotes = "'".$categories_single_quotes."'";

          $categories_double_quotes = implode ('","', $categories_array);
          if ($categories_double_quotes != '') $categories_double_quotes = '"'.$categories_double_quotes.'"';

          $first_category = $categories_array [0];
          $category = $first_category;

          if ($category == _x('Uncategorized', 'category name', 'ad-inserter')) $category = $general_tag;
        } else {
            $category = $short_title;
        }
        if (strpos ($category, ",") !== false) {
          $short_category = trim (substr ($category, 0, strpos ($category, ",")));
        } else $short_category = $category;
        if (strpos ($short_category, "and") !== false) {
          $short_category = trim (substr ($short_category, 0, strpos ($short_category, "and")));
        }

        $wp_tags = get_the_tags();
        if (!empty ($wp_tags)) {
          foreach ($wp_tags as $single_tag) {
            $tags_array [] = str_replace (array ("&amp;", "#"), array ("and", ""), isset ($single_tag->name) ? $single_tag->name : '');
            $tag_slugs_array [] = $single_tag->slug;
          }

          $tags = implode (',', $tags_array);
          $tags_spaces = implode (' ', $tags_array);

          $first_tag = $tags_array [0];
          $tag = $first_tag;

          $tag_array = array ();
          foreach ($wp_tags as $tag_data) {
            if (isset ($tag_data->name))
              $tag_array [] = explode (" ", $tag_data->name);
          }

          $selected_tag = '';

          if (count ($tag_array [0]) == 2) $selected_tag = $tag_array [0];
          elseif (count ($tag_array) > 1 && count ($tag_array [1]) == 2) $selected_tag = $tag_array [1];
          elseif (count ($tag_array) > 2 && count ($tag_array [2]) == 2) $selected_tag = $tag_array [2];
          elseif (count ($tag_array) > 3 && count ($tag_array [3]) == 2) $selected_tag = $tag_array [3];
          elseif (count ($tag_array) > 4 && count ($tag_array [4]) == 2) $selected_tag = $tag_array [4];


          if ($selected_tag == '' && count ($tag_array) >= 2 && count ($tag_array [0]) == 1 && count ($tag_array [1]) == 1) {

            if (isset ($tag_array [0][0]) && isset ($tag_array [1][0])) {
              if (strpos ($tag_array [0][0], $tag_array [1][0]) !== false) $tag_array = array_slice ($tag_array, 1, count ($tag_array) - 1);
            }

            if (isset ($tag_array [0][0]) && isset ($tag_array [1][0])) {
              if (strpos ($tag_array [1][0], $tag_array [0][0]) !== false) $tag_array = array_slice ($tag_array, 1, count ($tag_array) - 1);
            }

            if (isset ($tag_array [0][0]) && isset ($tag_array [1][0])) {
              if (count ($tag_array) >= 2 && count ($tag_array [0]) == 1 && count ($tag_array [1]) == 1) {
                $selected_tag = array ($tag_array [0][0], $tag_array [1][0]);
              }
            }
          }

          if ($selected_tag == '') {
            $first_tag = $tags_array [0];
            $smart_tag = implode (" ", array_slice (explode (" ", $first_tag), 0, 3));
          } else $smart_tag = implode (" ", $selected_tag);

          $smart_tag = str_replace (array ("&amp;", "#"), array ("and", ""), $smart_tag);

        } else {
            $tag = $category;
            $smart_tag = $category;
        }
    }

    $title = str_replace (array ("'", '"'), array ("&#8217;", "&#8221;"), $title);
    $title = html_entity_decode ($title, ENT_QUOTES, "utf-8");

    $short_title = str_replace (array ("'", '"'), array ("&#8217;", "&#8221;"), $short_title);
    $short_title = html_entity_decode ($short_title, ENT_QUOTES, "utf-8");

    $search_query = "";
    if (isset ($_SERVER['HTTP_REFERER'])) {
      $referrer = $_SERVER['HTTP_REFERER'];
    } else $referrer = '';

    if (preg_match ("/[\.\/](google|yahoo|bing|ask)\.[a-z\.]{2,5}[\/]/i", $referrer, $search_engine)){
       $referrer_query = parse_url ($referrer);
       $referrer_query = isset ($referrer_query ["query"]) ? $referrer_query ["query"] : "";
       parse_str ($referrer_query, $value);
       $search_query = isset ($value ["q"]) ? $value ["q"] : "";
       if ($search_query == "") {
         $search_query = isset ($value ["p"]) ? $value ["p"] : "";
       }
    }
    if ($search_query == "") $search_query = $smart_tag;

    $author = get_the_author_meta ('display_name');
    $author_name = get_the_author_meta ('first_name') . " " . get_the_author_meta ('last_name');
    if ($author_name == '') $author_name = $author;

    $url = remove_debug_parameters_from_url ((isset ($_SERVER ['HTTPS']) && $_SERVER ['HTTPS'] === 'on' ? "https" : "http") . '://'. $_SERVER ['HTTP_HOST'] . $_SERVER ['REQUEST_URI']);

    $post_id = ai_get_post_id ();

    $ai_wp_data [AI_TAGS]['TITLE']                = $title;
    $ai_wp_data [AI_TAGS]['SHORT_TITLE']          = $short_title;
    $ai_wp_data [AI_TAGS]['CATEGORY']             = $category;
    $ai_wp_data [AI_TAGS]['CATEGORIES']           = $categories;
    $ai_wp_data [AI_TAGS]['CATEGORIES_ARRAY']     = $categories_array;
    $ai_wp_data [AI_TAGS]['CATEGORY_SLUGS_ARRAY'] = $category_slugs_array;
    $ai_wp_data [AI_TAGS]['CATEGORIES_SPACES']        = $categories_spaces;
    $ai_wp_data [AI_TAGS]['CATEGORIES_SINGLE_QUOTES'] = $categories_single_quotes;
    $ai_wp_data [AI_TAGS]['CATEGORIES_DOUBLE_QUOTES'] = $categories_double_quotes;
    $ai_wp_data [AI_TAGS]['SHORT_CATEGORY']       = $short_category;
    $ai_wp_data [AI_TAGS]['TAG']                  = $tag;
    $ai_wp_data [AI_TAGS]['TAGS']                 = $tags;
    $ai_wp_data [AI_TAGS]['TAGS_ARRAY']           = $tags_array;
    $ai_wp_data [AI_TAGS]['TAG_SLUGS_ARRAY']      = $tag_slugs_array;
    $ai_wp_data [AI_TAGS]['TAGS_SPACES']          = $tags_spaces;
    $ai_wp_data [AI_TAGS]['SMART_TAG']            = $smart_tag;
    $ai_wp_data [AI_TAGS]['SEARCH_QUERY']         = $search_query;
    $ai_wp_data [AI_TAGS]['AUTHOR']               = $author;
    $ai_wp_data [AI_TAGS]['AUTHOR_NAME']          = $author_name;
    $ai_wp_data [AI_TAGS]['POST_ID']              = $post_id;
    $ai_wp_data [AI_TAGS]['URL']                  = $url;
  }

  $ad_data = preg_replace ("/{title}/i",              $ai_wp_data [AI_TAGS]['TITLE'],             $content);
  $ad_data = preg_replace ("/{short-title}/i",        $ai_wp_data [AI_TAGS]['SHORT_TITLE'],       $ad_data);
  $ad_data = preg_replace ("/{category}/i",           $ai_wp_data [AI_TAGS]['CATEGORY'],          $ad_data);
  $ad_data = preg_replace ("/{categories}/i",         $ai_wp_data [AI_TAGS]['CATEGORIES'],        $ad_data);
  $ad_data = preg_replace ("/{categories-spaces}/i",          $ai_wp_data [AI_TAGS]['CATEGORIES_SPACES'], $ad_data);
  $ad_data = preg_replace ("/{categories-single-quotes}/i",   $ai_wp_data [AI_TAGS]['CATEGORIES_SINGLE_QUOTES'], $ad_data);
  $ad_data = preg_replace ("/{categories-double-quotes}/i",   $ai_wp_data [AI_TAGS]['CATEGORIES_DOUBLE_QUOTES'], $ad_data);
  $ad_data = preg_replace ("/{short-category}/i",     $ai_wp_data [AI_TAGS]['SHORT_CATEGORY'],    $ad_data);
  $ad_data = preg_replace ("/{tag}/i",                $ai_wp_data [AI_TAGS]['TAG'],               $ad_data);
  $ad_data = preg_replace ("/{tags}/i",               $ai_wp_data [AI_TAGS]['TAGS'],              $ad_data);
  $ad_data = preg_replace ("/{tags-spaces}/i",        $ai_wp_data [AI_TAGS]['TAGS_SPACES'],       $ad_data);
  $ad_data = preg_replace ("/{smart-tag}/i",          $ai_wp_data [AI_TAGS]['SMART_TAG'],         $ad_data);
  $ad_data = preg_replace ("/{search-query}/i",       $ai_wp_data [AI_TAGS]['SEARCH_QUERY'],      $ad_data);
  $ad_data = preg_replace ("/{author}/i",             $ai_wp_data [AI_TAGS]['AUTHOR'],            $ad_data);
  $ad_data = preg_replace ("/{author-name}/i",        $ai_wp_data [AI_TAGS]['AUTHOR_NAME'],       $ad_data);
  $ad_data = preg_replace ("/{post-id}/i",            $ai_wp_data [AI_TAGS]['POST_ID'],           $ad_data);

  $ad_data = preg_replace ("/{short_title}/i",        $ai_wp_data [AI_TAGS]['SHORT_TITLE'],       $ad_data);
  $ad_data = preg_replace ("/{short_category}/i",     $ai_wp_data [AI_TAGS]['SHORT_CATEGORY'],    $ad_data);
  $ad_data = preg_replace ("/{smart_tag}/i",          $ai_wp_data [AI_TAGS]['SMART_TAG'],         $ad_data);
  $ad_data = preg_replace ("/{search_query}/i",       $ai_wp_data [AI_TAGS]['SEARCH_QUERY'],      $ad_data);
  $ad_data = preg_replace ("/{author_name}/i",        $ai_wp_data [AI_TAGS]['AUTHOR_NAME'],       $ad_data);

  $ad_data = preg_replace ("/{url}/i",                $ai_wp_data [AI_TAGS]['URL'],               $ad_data);

  if (preg_match_all ("/{tag-([\d+])}/i", $ad_data, $tag_matches)) {
    foreach ($tag_matches [1] as $tag_index) {
      $tag_to_replace = isset ($ai_wp_data [AI_TAGS]['TAGS_ARRAY'][$tag_index - 1]) ? $ai_wp_data [AI_TAGS]['TAGS_ARRAY'][$tag_index - 1] : '';
      $ad_data = preg_replace ("/{tag-$tag_index}/i", $tag_to_replace, $ad_data);
    }
  }

  if (preg_match_all ("/{tag-slug-([\d+])}/i", $ad_data, $tag_matches)) {
    foreach ($tag_matches [1] as $tag_index) {
      $tag_to_replace = isset ($ai_wp_data [AI_TAGS]['TAG_SLUGS_ARRAY'][$tag_index - 1]) ? $ai_wp_data [AI_TAGS]['TAG_SLUGS_ARRAY'][$tag_index - 1] : '';
      $ad_data = preg_replace ("/{tag-slug-$tag_index}/i", $tag_to_replace, $ad_data);
    }
  }

  if (preg_match_all ("/{category-([\d+])}/i", $ad_data, $category_matches)) {
    foreach ($category_matches [1] as $category_index) {
      $category_to_replace = isset ($ai_wp_data [AI_TAGS]['CATEGORIES_ARRAY'][$category_index - 1]) ? $ai_wp_data [AI_TAGS]['CATEGORIES_ARRAY'][$category_index - 1] : '';
      $ad_data = preg_replace ("/{category-$category_index}/i", $category_to_replace, $ad_data);
    }
  }

  if (preg_match_all ("/{category-slug-([\d+])}/i", $ad_data, $category_matches)) {
    foreach ($category_matches [1] as $category_index) {
      $category_to_replace = isset ($ai_wp_data [AI_TAGS]['CATEGORY_SLUGS_ARRAY'][$category_index - 1]) ? $ai_wp_data [AI_TAGS]['CATEGORY_SLUGS_ARRAY'][$category_index - 1] : '';
      $ad_data = preg_replace ("/{category-slug-$category_index}/i", $category_to_replace, $ad_data);
    }
  }

  if (function_exists ('ai_tags')) ai_tags ($ad_data);

  // Replace default values {tag:default}
  $default_value_tags = preg_match_all ("/\{\#[a-zA-Z\-_][a-zA-Z0-9\-_]*?\:(.*?)\#\}/", $ad_data, $matches);
  if ($default_value_tags) {
    foreach ($matches [0] as $index => $match) {
      $ad_data = str_replace ($match, $matches [1][$index], $ad_data);
    }
  }

  return $ad_data;
}


// ===========================================================================================


global $block_object, $ai_wp_data, $ad_inserter_globals, $ai_last_check, $ai_last_time, $ai_total_plugin_time, $ai_total_block_php_time, $ai_total_hook_php_time, $ai_processing_log, $ai_db_options_extract, $ai_db_options, $block_insertion_log;

if (!defined ('AD_INSERTER_PLUGIN_DIR'))
  define ('AD_INSERTER_PLUGIN_DIR', plugin_dir_path (__FILE__));

define ('AI_WP_DEBUGGING_',                0);
define ('AI_DEBUG_PROCESSING_',            0x01);
define ('AI_URL_DEBUG_',                   'ai-debug');
define ('AI_URL_DEBUG_PROCESSING_',        'ai-debug-processing');
define ('AI_URL_DEBUG_PROCESSING_FE_',     'ai-debug-processing-fe');
define ('AI_URL_DEBUG_PHP_',               'ai-debug-php');

if (isset ($_GET [AI_URL_DEBUG_PHP_]) && $_GET [AI_URL_DEBUG_PHP_] != '') {
  if (isset ($_COOKIE ['AI_WP_DEBUGGING'])) {
    ini_set ('display_errors', 1);
    error_reporting (E_ALL);
  }
}

$ai_wp_data [AI_WP_DEBUGGING_] = 0;

if (!is_admin()) {
  if (!isset ($_GET [AI_URL_DEBUG_]) || $_GET [AI_URL_DEBUG_] != 0)
    if (isset ($_GET [AI_URL_DEBUG_PROCESSING_]) || isset ($_GET [AI_URL_DEBUG_PROCESSING_FE_]) || (isset ($_COOKIE ['AI_WP_DEBUGGING']) && ($_COOKIE ['AI_WP_DEBUGGING'] & AI_DEBUG_PROCESSING_) != 0))  {
      if ((isset ($_GET [AI_URL_DEBUG_PROCESSING_]) && $_GET [AI_URL_DEBUG_PROCESSING_] == 1) || (isset ($_GET [AI_URL_DEBUG_PROCESSING_FE_]) && $_GET [AI_URL_DEBUG_PROCESSING_FE_] == 1)) {
        $ai_wp_data [AI_WP_DEBUGGING_] |= AI_DEBUG_PROCESSING_;

        $ai_total_plugin_time = 0;
        $start_time = microtime (true);
        $ai_total_block_php_time = 0;
        $ai_total_hook_php_time = 0;
        $ai_last_time = microtime (true);
        $ai_processing_log = array ();
        ai_log ('INITIALIZATION START');
      }
    }
}


// Version check
global $wp_version, $version_string, $subversion_string, $filter_hooks;

if (version_compare ($wp_version, "4.6", "<")) {
  exit ('Ad Inserter ' . __('requires WordPress 4.6 or newer', 'ad-inserter') . '. <a href="https://wordpress.org/support/article/updating-wordpress/" target=_blank">'. __('Please update!', 'ad-inserter') . '</a>');
}

//if (version_compare (phpversion (), "5.6", "<")) {
//  exit ('Ad Inserter ' . __('requires PHP 5.6 or newer', 'ad-inserter') . '. <a href="https://wordpress.org/support/update-php/" target=_blank">'. __('Please update!', 'ad-inserter') . '</a>');
//}

$filter_hooks = array ();

if (isset ($_GET ['ai-safe-mode'])) {
  define ('AI_SAFE_MODE', 1);
}

//include required files
require_once AD_INSERTER_PLUGIN_DIR.'class.php';
require_once AD_INSERTER_PLUGIN_DIR.'constants.php';
require_once AD_INSERTER_PLUGIN_DIR.'settings.php';

if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0)
  ai_log ("AFTER REQUIRE: ". number_format (1000 * (microtime (true) - $start_time), 2)." ms");

$subversion_array = explode ("-", AD_INSERTER_VERSION);
$subversion_string = isset ($subversion_array [1]) ? '-'.$subversion_array [1] : '';
$version_array = explode (".", $subversion_array [0]);
$version_string = "";
foreach ($version_array as $number) {
  $version_string .= sprintf ("%02d", $number);
}

$ai_wp_data [AI_WP_URL] = remove_debug_parameters_from_url ();

$ad_inserter_globals = array ();
$block_object = array ();
$block_insertion_log = array ();

$ai_wp_data [AI_WP_PAGE_TYPE]           = AI_PT_NONE;
$ai_wp_data [AI_WP_AMP_PAGE]            = false;
$ai_wp_data [AI_WP_USER_SET]            = false;
$ai_wp_data [AI_WP_USER]                = AI_USER_NOT_LOGGED_IN;
$ai_wp_data [AI_CONTEXT]                = AI_CONTEXT_NONE;

$ai_wp_data [AI_SERVER_SIDE_DETECTION]  = false;
$ai_wp_data [AI_CLIENT_SIDE_DETECTION]  = false;
$ai_wp_data [AI_MOBILE_DETECT_JS]       = false;
$ai_wp_data [AI_TRACKING]               = false;
$ai_wp_data [AI_STICKY_WIDGETS]         = false;
$ai_wp_data [AI_STICK_TO_THE_CONTENT]   = false;
$ai_wp_data [AI_ANIMATION]              = false;
$ai_wp_data [AI_CLOSE_BUTTONS]          = false;
$ai_wp_data [AI_IFRAMES]                = false;
$ai_wp_data [AI_DISABLE_CACHING]        = false;
$ai_wp_data [AI_CLIENT_SIDE_INSERTION]  = false;
$ai_wp_data [AI_LAZY_LOADING]           = false;
$ai_wp_data [AI_PAGE_BLOCKS]            = 0;
$ai_wp_data [AI_GEOLOCATION]            = false;
//$ai_wp_data [AI_HTML_ELEMENT_SELECTION] = isset ($_POST ['html_element_selection']) ? (bool) $_POST ['html_element_selection'] : false;
$ai_wp_data [AI_HTML_ELEMENT_SELECTION] = false;
$ai_wp_data [AI_MBSTRING_LOADED]        = extension_loaded ('mbstring');
$ai_wp_data [AI_PROCESSING_TIME]        = false;
$ai_wp_data [AI_FORCE_SERVERSIDE_CODE]  = false;
$ai_wp_data [AI_CODE_FOR_IFRAME]        = false;
$ai_wp_data [AI_HEAD_CODES]             = array ();
$ai_wp_data [AI_HEAD_GROUPS]            = array ();
$ai_wp_data [AI_ACTIVE_GROUP_NAMES]     = array ();
$ai_wp_data [AI_CHECK_BLOCK]            = false;
$ai_wp_data [AI_POST_POSITION]          = AI_POST_POSITION_BEFORE_POST;
$ai_wp_data [AI_FOOTER_JS_CODE_DOM_READY] = '';
$ai_wp_data [AI_FOOTER_INLINE_SCRIPTS]  = false;
$ai_wp_data [AI_W3TC_DEBUGGING]         = false;
$ai_wp_data [AI_CLIENT_SIDE_FILTER_CHECKS] = false;
$ai_wp_data [AI_PARALLAX]               = false;
$ai_wp_data [AI_PHP_PROCESSING]         = !(defined ('DISALLOW_FILE_EDIT') && DISALLOW_FILE_EDIT) && !(defined ('DISALLOW_FILE_MODS') && DISALLOW_FILE_MODS);
$ai_wp_data [AI_UNFILTERED_HTML]        = !(defined ('DISALLOW_UNFILTERED_HTML') && DISALLOW_UNFILTERED_HTML);


ai_load_settings ();

if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0)
  ai_log ("AFTER LOAD SETTINGS: ". number_format (1000 * (microtime (true) - $start_time), 2)." ms");

$ai_wp_data [AI_BACKEND_JS_DEBUGGING]  = get_backend_javascript_debugging ();
$ai_wp_data [AI_FRONTEND_JS_DEBUGGING] = get_frontend_javascript_debugging ();

if (isset ($_GET [AI_URL_DEBUG_PHP]) && $_GET [AI_URL_DEBUG_PHP] == '1') {
  if (get_remote_debugging ()) {
    ini_set ('display_errors', 1);
    error_reporting (E_ALL);
  }
}

if (isset ($_GET [AI_URL_DEBUG_JAVASCRIPT]) && $_GET [AI_URL_DEBUG_JAVASCRIPT] == '1' || isset ($_GET [AI_URL_DEBUG_TRACKING]) && $_GET [AI_URL_DEBUG_TRACKING] == '1') {
  if (get_remote_debugging ()) {
    $ai_wp_data [AI_FRONTEND_JS_DEBUGGING] = true;
  }
}

if (defined ('AI_ADBLOCKING_DETECTION') && AI_ADBLOCKING_DETECTION) {
  $ai_wp_data [AI_ADB_DETECTION] = $block_object [AI_ADB_MESSAGE_OPTION_NAME]->get_enable_manual ();

  $logged_in_key = defined ('LOGGED_IN_KEY') ? LOGGED_IN_KEY : 'key';

  if ($ai_wp_data [AI_ADB_DETECTION]) {

    $key = '#AI';
    if (defined ('AUTH_KEY')) {
      $key .= AUTH_KEY;
    }
    if (defined ('NONCE_KEY')) {
      $key .= NONCE_KEY;
    }

    $adb_2_name = AI_ADB_2_DEFAULT_NAME;
    define ('AI_ADB_COOKIE_VALUE', substr (preg_replace ("/[^A-Za-z]+/", '', strtolower (md5 ($logged_in_key.md5 ($key)))), 0, 8));

    $script_path = AD_INSERTER_PLUGIN_DIR.'js';
    $script = $script_path.'/sponsors.js';

    if (is_writable ($script_path) && is_writable ($script)) {
      $adb_2_name = substr (preg_replace ("/[^A-Za-z]+/", '', strtolower (md5 ($logged_in_key).md5 ($key))), 0, 8);

      $js_ok = false;
      if (file_exists ($script)) {
        if (strpos (file_get_contents ($script), $adb_2_name) !== false) $js_ok = true;
      }

      if (!$js_ok) {
        file_put_contents ($script, 'window.' . $adb_2_name . '=true;');
        define ('AI_ADB_2_FILE_RECREATED', true);
      }
    }

    define ('AI_ADB_2_NAME', $adb_2_name);
  }
}

if (function_exists ('ai_load_globals')) ai_load_globals ();

if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0)
  ai_log ("AFTER LOAD GLOBALS: ". number_format (1000 * (microtime (true) - $start_time), 2)." ms");

if (get_dynamic_blocks () == AI_DYNAMIC_BLOCKS_SERVER_SIDE_W3TC) {
  if (!in_array ('w3-total-cache/w3-total-cache.php', get_option ('active_plugins'))) {
    define ('AI_NO_W3TC', true);
    if (!defined ('W3TC_DYNAMIC_SECURITY')) define ('W3TC_DYNAMIC_SECURITY', 'W3 Total Cache plugin not active');
  }
  if (!defined ('W3TC_DYNAMIC_SECURITY')) {
    $string = AD_INSERTER_PLUGIN_DIR;
    if (defined ('AUTH_KEY'))      $string .= AUTH_KEY;
    if (defined ('LOGGED_IN_KEY')) $string .= LOGGED_IN_KEY;

    define ('W3TC_DYNAMIC_SECURITY', md5 ($string));
  }
}

if ($ai_wp_data [AI_SERVER_SIDE_DETECTION] && !is_admin ()) {
  require_once AD_INSERTER_PLUGIN_DIR.'includes/mobiledetect/Mobile_Detect.php';

  $detect = new ai_Mobile_Detect;

  define ('AI_MOBILE',   $detect->isMobile ());
  define ('AI_TABLET',   $detect->isTablet ());
  define ('AI_PHONE',    AI_MOBILE && !AI_TABLET);
  define ('AI_DESKTOP',  !AI_MOBILE);
} else {
    define ('AI_MOBILE',   true);
    define ('AI_TABLET',   true);
    define ('AI_PHONE',    true);
    define ('AI_DESKTOP',  true);
  }

if (isset ($_POST [AI_FORM_SAVE]))
  define ('AI_SYNTAX_HIGHLIGHTING', isset ($_POST ["syntax-highlighter-theme"]) && $_POST ["syntax-highlighter-theme"] != AI_OPTION_DISABLED); else
    define ('AI_SYNTAX_HIGHLIGHTING', get_syntax_highlighter_theme () != AI_OPTION_DISABLED);

if (isset ($_POST [AI_FORM_SAVE])) {
  $ai_wp_data [AI_DISABLE_TRANSLATION] = isset ($_POST ['disable_translation']) ? $_POST ['disable_translation'] : DEFAULT_DISABLE_TRANSLATION;
} else $ai_wp_data [AI_DISABLE_TRANSLATION] = get_disable_translation () || (isset ($_GET [AI_URL_DEBUG_TRANSLATION]) && get_remote_debugging ());

if (!$ai_wp_data [AI_DISABLE_TRANSLATION]) {
  add_action ('plugins_loaded',             'ai_load_plugin_textdomain_hook');
  add_filter ('load_textdomain_mofile',     'ai_load_textdomain_mofile', 10, 2);
}


add_action ('plugins_loaded',             'ai_plugins_loaded');
add_action ('init',                       'ai_init_hook');
add_action ('wp_loaded',                  'ai_wp_loaded_hook');
add_action ('admin_menu',                 'ai_admin_menu_hook');
add_action ('admin_notices',              'ai_admin_notice_hook');
add_action ('wp',                         'ai_wp_hook');
add_action ('wp_enqueue_scripts',         'ai_wp_enqueue_scripts_hook' );
//add_action ('upgrader_process_complete',  'ai_upgrader_process_complete_hook', 10, 2);

if (function_exists ('ai_system_output_check')) $ai_system_output = ai_system_output_check (); else $ai_system_output = false;

//if (defined ('AI_BUFFERING')) {
//  add_action ('get_header',       'ai_buffering_start_hook', 99999);
//}

if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0 || $ai_system_output) {
  add_action ('shutdown',         'ai_shutdown_hook', 0);
}

register_activation_hook    (AD_INSERTER_PLUGIN_DIR.'ad-inserter.php', 'ai_activation_hook');
register_deactivation_hook  (AD_INSERTER_PLUGIN_DIR.'ad-inserter.php', 'ai_deactivation_hook' );

add_action ('widgets_init',       'ai_widgets_init_hook');
add_action ('add_meta_boxes',     'ai_add_meta_box_hook');
add_action ('save_post',          'ai_save_meta_box_data_hook');

if (function_exists ('ai_hooks')) ai_hooks ();

add_filter ('plugin_action_links_'.plugin_basename (__FILE__), 'ai_plugin_action_links');
add_action ('after_plugin_row_' . AD_INSERTER_SLUG . '/ad-inserter.php', 'ai_after_plugin_row_1', 10, 3);

add_filter ('plugin_row_meta',    'ai_set_plugin_meta', 99999, 2);
//add_filter ('the_generator',      'ai_the_generator');

// If using Autoptimize plugin
//add_filter ('autoptimize_filter_js_replacetag','ai_ao_override_js_replacetag', 10, 1);

if (is_admin () === true) {
  add_action ('wp_ajax_ai_ajax_backend', 'ai_ajax_backend');
  add_action ('wp_ajax_ai_ajax',         'ai_ajax');
  add_action ('wp_ajax_nopriv_ai_ajax',  'ai_ajax');
}


if (!get_option (AI_INSTALL_NAME)) {
  update_option (AI_INSTALL_NAME, time ());
}


if (defined ('AI_PLUGIN_TRACKING') && AI_PLUGIN_TRACKING) {

  add_action ('plugins_loaded', 'ai_install_dst');

  function ai_install_dst () {
    global $ai_wp_data, $ai_total_plugin_time;

    if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
      ai_log ("PLUGINS LOADED INSTALL DST START");
      $ai_processing_time_active = $ai_wp_data [AI_PROCESSING_TIME];
      $ai_wp_data [AI_PROCESSING_TIME] = true;
      $start_time = microtime (true);
    }

    if (!class_exists ('DST_Client')) {
      require_once dirname (__FILE__) . '/includes/dst/dst.php';
    }

    if (!function_exists ('ai_start_dst') && defined ('DST_Client::DST_FILTER_OPTIONS')) {
      function ai_start_dst () {
        global $ai_dst;

        $dst_settings = array (
            'main_file'           => __FILE__,
            'tracking_url'        => 'https://analytics.adinserter.pro/',
            'track_local'         => true,
            'tracking'            => DST_Client::DST_TRACKING_OPTIN,
            'use_email'           => DST_Client::DST_USE_EMAIL_OFF,
            'multisite_tracking'  => DST_Client::DST_MULTISITE_SITES_TRACKING_WAIT_FOR_MAIN,
            'deactivation_form'   => true,
            'admin_ip_tracking'   => true,
            'notice_icon'         => AD_INSERTER_PLUGIN_IMAGES_URL.'icon-50x50.jpg',
          );

        if (function_exists ('ai_dst_settings')) ai_dst_settings ($dst_settings);

        $ai_dst = new DST_Client ($dst_settings);
      }

      function ai_notice_text ($text) {
        $text =
          // translators: Opt-in message: Thank you for installing Ad Inserter (plugin name with HTML tags will be added)
          __("Thank you for installing", 'ad-inserter') . ' [STRONG][NAME][/STRONG]. ' .
          // translators: Opt-in message: %s: HTML tags
          sprintf (__("We would like to %s track its usage %s on your site. This is completely optional and can be disabled at any time.", 'ad-inserter'),
            '<a href="https://wordpress.org/plugins/ad-inserter/#privacy%20policy%20%E2%80%93%20plugin%20usage%20tracking" target=_blank" style="text-decoration: none; box-shadow: 0 0 0;">', '</a>') . '[P]' .
          __("We don't record any sensitive data, only information regarding the WordPress environment and plugin usage, which will help us to make improvements to the plugin.", 'ad-inserter');

        return $text;
      }

      function ai_dst_options ($options) {
        global $ai_db_options, $ai_db_options_extract;

        if (isset ($ai_db_options_extract [AI_EXTRACT_USED_BLOCKS]) && is_string ($ai_db_options_extract [AI_EXTRACT_USED_BLOCKS]) && strlen ($ai_db_options_extract [AI_EXTRACT_USED_BLOCKS]) != 0) {
          $used_blocks = count (unserialize ($ai_db_options_extract [AI_EXTRACT_USED_BLOCKS]));
        } else $used_blocks = '';

        $install_timestamp = get_option (AI_INSTALL_NAME);
        if ($install_timestamp) {
          $install_date = $install_timestamp;
        } else $install_date = '';

        if (isset ($ai_db_options [AI_OPTION_GLOBAL]['TIMESTAMP'])) {
          $settings_date = $ai_db_options [AI_OPTION_GLOBAL]['TIMESTAMP'];
        } else $settings_date = '';

        $count_posts = wp_count_posts ();

        $options ['posts']             = is_numeric ($count_posts->publish) ? $count_posts->publish : 0;
        $options ['blocks']            = $used_blocks;
        $options ['installation']      = $install_date;
        $options ['settings']          = $settings_date;
        $options ['notice_review']     = ($review = get_option ('ai-notice-review')) ? $review : '';
        $options ['remote_debugging']  = get_remote_debugging ();
        $options ['block_class']       = get_block_class_name ();

        if (function_exists ('ai_dst_options_2')) ai_dst_options_2 ($options);

        return ($options);
      }

      function ai_dst_form_text ($form) {
        $form ['body'] =
          '</p>' .
          // translators: Deactivation message: %s: HTML tags
          sprintf (__("Looking for %s Documentation, %s %s Common Settings, %s %s Quick Start %s or help for %s AdSense ads? %s The plugin doesn't work with your theme? %s Let us know %s and we'll try to help you.", 'ad-inserter'),
          '<a href="https://adinserter.pro/documentation" target="_blank" style="text-decoration: none; box-shadow: 0 0 0;">', '</a>',
          '<a href="https://adinserter.pro/documentation/common-settings" target="_blank" style="text-decoration: none; box-shadow: 0 0 0;">', '</a>',
          '<a href="https://adinserter.pro/documentation/quick-start" target="_blank" style="text-decoration: none; box-shadow: 0 0 0;">', '</a>',
          '<a href="https://adinserter.pro/documentation/adsense-ads" target="_blank" style="text-decoration: none; box-shadow: 0 0 0;">', '</a>',
          '<a href="https://adinserter.pro/contact#help" target="_blank" style="text-decoration: none; box-shadow: 0 0 0;">', '</a>') .
          '<hr /><p>' .
          $form ['body'];
        return ($form);
      }

      add_filter (DST_Client::DST_FILTER_OPTIN_NOTICE_TEXT . AD_INSERTER_SLUG, 'ai_notice_text');
      add_filter (DST_Client::DST_FILTER_OPTIONS .           AD_INSERTER_SLUG, 'ai_dst_options');
      add_filter (DST_Client::DST_FILTER_FORM_TEXT .         AD_INSERTER_SLUG, 'ai_dst_form_text');

      ai_start_dst ();
    }

    if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
      if (!$ai_processing_time_active) {
        $ai_total_plugin_time += microtime (true) - $start_time;
        $ai_wp_data [AI_PROCESSING_TIME] = false;
      }
      ai_log ("PLUGINS LOADED INSTALL DST END: ". number_format (1000 * (microtime (true) - $start_time), 2)." ms\n");
    }
  }
}


if (($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0) {
  $ai_total_plugin_time += microtime (true) - $start_time;
  ai_log ("INITIALIZATION END: ". number_format (1000 * (microtime (true) - $start_time), 2)." ms\n");
}

// ===========================================================================================

if (!class_exists ('ai_widget')) {
  class ai_widget extends WP_Widget {

    function __construct () {
      parent::__construct (
        false,                                  // Base ID
        AD_INSERTER_NAME,                       // Name
        array (                                 // Args
          'classname'   => 'ai_widget',
                                    // translators: %s: Ad Inserter
          'description' => sprintf (__('%s block.', 'ad-inserter'), AD_INSERTER_NAME)
        )
      );
    }

    function form ($instance) {
      global $block_object;

      // Output admin widget options form

      $widget_title = !empty ($instance ['widget-title']) ? $instance ['widget-title'] : '';
      $block  = isset ($instance ['block'])   ? $instance ['block']   : 1;
      if ($block > 96) $block = 1;
      $sticky = isset ($instance ['sticky'])  ? $instance ['sticky']  : 0;

      // translators: widget title
      if ($block == 0) $title = __('Processing log', 'ad-inserter');
      // translators: widget title
      elseif ($block == - 1) $title = __('Dummy widget', 'ad-inserter');
      // translators: widget title
      elseif ($block == - 2) $title = __('Debugging tools', 'ad-inserter');
      elseif ($block >= 1) {
        $obj = $block_object [$block];

        $title = '[' . $block . '] ' . $obj->get_ad_name();
        if (!empty ($widget_title)) $title .= ' - ' . $widget_title;
        // translators: block status (widget title)
        if ($obj->get_disable_insertion ()) $title .= ' - ' . _x('PAUSED', 'block', 'ad-inserter') . ' ';
        if (!$obj->get_enable_widget ()) $title .= ' - ' . __('WIDGET DISABLED', 'ad-inserter');
      } else $title = __('Unknown block', 'ad-inserter');

      $url_parameters = '&start=' . (intval (($block - 1) / 16) * 16 + 1);

      ?>
      <input id="<?php echo $this->get_field_id ('title'); ?>" name="<?php echo $this->get_field_name ('title'); ?>" type="hidden" value="<?php echo esc_attr ($title); ?>">

      <p>
        <label for="<?php echo $this->get_field_id ('widget-title'); ?>"><?php _e('Title', 'ad-inserter'); ?>: &nbsp;</label>
        <input id="<?php echo $this->get_field_id ('widget-title'); ?>" name="<?php echo $this->get_field_name ('widget-title'); ?>" type="text" value="<?php echo esc_attr ($widget_title); ?>" style="width: 100%;">
      </p>

      <p>
        <label for="<?php echo $this->get_field_id ('block'); ?>"><a href='<?php echo admin_url ('options-general.php?page=ad-inserter.php'), $url_parameters, "&tab=", $block; ?>' title='Click for block settings' style='text-decoration: none;'><?php _e('Block', 'ad-inserter'); ?></a>:</label>
        <select id="<?php echo $this->get_field_id ('block'); ?>" name="<?php echo $this->get_field_name('block'); ?>" style="width: 100%;">
          <?php
            for ($block_index = 1; $block_index <= 96; $block_index ++) {
              $obj = $block_object [$block_index];
          ?>
          <option value='<?php echo $block_index; ?>' <?php if ($block_index == $block) echo 'selected="selected"'; ?>><?php echo $block_index, ' - ', $obj->get_ad_name(), $obj->get_disable_insertion () ? ' - PAUSED' : ''; ?></option>
          <?php } ?>
          <option value='-2' <?php if ($block == - 2) echo 'selected="selected"'; ?>><?php _e('Debugging tools', 'ad-inserter'); ?></option>
          <option value='0' <?php if ($block == 0) echo 'selected="selected"'; ?>><?php _e('Processing log', 'ad-inserter'); ?></option>
          <option value='-1' <?php if ($block == - 1) echo 'selected="selected"'; ?>><?php _e('Dummy widget', 'ad-inserter'); ?></option>
        </select>
      </p>

      <p>
        <input type="hidden"   name='<?php echo $this->get_field_name ('sticky'); ?>' value="0" />
        <input type='checkbox' id='<?php echo $this->get_field_id ('sticky'); ?>' name='<?php echo $this->get_field_name ('sticky'); ?>' value='1' <?php if ($sticky) echo 'checked '; ?>>
        <label for='<?php echo $this->get_field_id ('sticky'); ?>'><?php _ex('Sticky', 'Widget', 'ad-inserter'); ?></label>
      </p>
      <?php
    }

    function update ($new_instance, $old_instance) {
      // Save widget options
      $instance = $old_instance;

      $instance ['widget-title'] = (!empty ($new_instance ['widget-title'])) ? strip_tags ($new_instance ['widget-title']) : '';
      $instance ['title']   = (!empty ($new_instance ['title'])) ?  ($new_instance ['title']) : '';
      $instance ['block']   = (isset ($new_instance ['block'])) ? $new_instance ['block'] : 1;
      $instance ['sticky']  = (isset ($new_instance ['sticky'])) ? $new_instance ['sticky'] : 0;

      return $instance;
    }

    function widget ($args, $instance) {
      global $ai_last_check, $ai_wp_data, $ai_total_plugin_time;

      $debug_processing = ($ai_wp_data [AI_WP_DEBUGGING] & AI_DEBUG_PROCESSING) != 0;
      if ($debug_processing) $start_time = microtime (true);

      $ai_last_check = AI_CHECK_NONE;

      $block = 0;
      if ($debug_processing) ai_debug_widget_comment ('widget');
      ai_widget_draw ($args, $instance, $block);
      if ($debug_processing) ai_debug_widget_comment ('widget', true);

      if ($debug_processing) {
        $ai_total_plugin_time += microtime (true) - $start_time;
        if ($ai_last_check != AI_CHECK_NONE) ai_log (ai_log_block_status ($block, $ai_last_check));
        ai_log ("WIDGET END: ". number_format (1000 * (microtime (true) - $start_time), 2)." ms\n");
      }
    }
  }
}


} else {
    if (!function_exists ('ai_activation_error')) {
      require_once ABSPATH . 'wp-admin/includes/plugin.php';

      function ai_activation_error () {
?>
        <div class="notice notice-error is-dismissible">
          <div class="ai-notice-element">
            <img src="<?php echo AD_INSERTER_PLUGIN_IMAGES_URL; ?>icon-50x50.jpg" style="width: 50px; margin: 5px 10px 0px 10px;" />
          </div>
          <div class="ai-notice-element" style="width: 100%; padding: 0 10px 0;">
            <p><?php _e("Ad Inserter can't be used while Ad Inserter Pro is active! To activate Ad Inserter you need to first deactivate Ad Inserter Pro.", 'ad-inserter'); ?></p>
            <p><?php _e("<strong>WARNING</strong>: Please note that saving settings in Ad Inserter will clear all settings that are available only in the Pro version (additional block and plugin settings)!", 'ad-inserter'); ?></p>
          </div>
        </div>
<?php
      }

      unset ($_GET ['activate']);
      deactivate_plugins ('ad-inserter/ad-inserter.php');
      add_action ('admin_notices', 'ai_activation_error');
    }
  }


