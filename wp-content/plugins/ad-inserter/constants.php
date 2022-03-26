<?php

//ini_set ('display_errors', 1);
//error_reporting (E_ALL);

define ('AI_OPTION_NAME',                'ad_inserter');
define ('AI_EXTRACT_NAME',               'ad_inserter_extract');
define ('AI_FLAGS_NAME',                 'ad_inserter_flags');
define ('AI_INSTALL_NAME',               'ai-install');
define ('AI_ADS_TXT_NAME',               'ai-ads-txt');
define ('AI_OPTION_GLOBAL',              'global');
define ('AI_OPTION_EXTRACT',             'extract');
define ('AI_ADSENSE_CLIENT_IDS',         'ai-adsense-client-ids');
define ('AI_ADSENSE_AUTH_CODE',          'ai-adsense-auth-code');
define ('AI_ADSENSE_OWN_IDS',            'ai-adsense-own-ids');
define ('AI_ADSENSE_API_IDS',            true);

if (!defined ('AD_INSERTER_PLUGIN_DIR'))
  define ('AD_INSERTER_PLUGIN_DIR', plugin_dir_path (__FILE__));

if (!defined ('AD_INSERTER_FILE'))
  define ('AD_INSERTER_FILE', AD_INSERTER_PLUGIN_DIR.'ad-inserter.php');

define ('AD_INSERTER_SLUG', str_replace ('/'.basename (AD_INSERTER_FILE), '', plugin_basename (AD_INSERTER_FILE)));

if (file_exists (AD_INSERTER_PLUGIN_DIR.'includes/functions.php')) {
  include_once AD_INSERTER_PLUGIN_DIR.'includes/functions.php';
}

if (!defined( 'AD_INSERTER_NAME'))
  define ('AD_INSERTER_NAME', 'Ad Inserter');

if (!defined( 'AD_INSERTER_VERSION'))
  define ('AD_INSERTER_VERSION', '2.7.12');

if (!defined ('AD_INSERTER_PLUGIN_BASENAME'))
  define ('AD_INSERTER_PLUGIN_BASENAME', plugin_basename (__FILE__));

if (!defined ('AD_INSERTER_PLUGIN_DIRNAME'))
  define ('AD_INSERTER_PLUGIN_DIRNAME', dirname (AD_INSERTER_PLUGIN_BASENAME));

if (!defined ('AD_INSERTER_PLUGIN_URL'))
  define ('AD_INSERTER_PLUGIN_URL', plugin_dir_url ( __FILE__));

if (!defined ('AD_INSERTER_PLUGIN_IMAGES_URL'))
  define ('AD_INSERTER_PLUGIN_IMAGES_URL', AD_INSERTER_PLUGIN_URL. 'images/');

define ('AD_EMPTY_DATA',  '');
define ('AD_ZERO',        '0');
define ('AD_ONE',         '1');
define ('AD_TWO',         '2');

define ('AD_FLAGS_BLOCKS_STICKY',        0x01);
define ('AI_MAX_LIST_ITEMS',            2000);

// Old options
define ('AD_OPTIONS',     'AdInserterOptions');   // general plugin options
define ('AD_ADx_OPTIONS', 'AdInserter#Options');

// Options
define ('WP_FORM_FIELD_POSTFIX',                 '_block_');
define ('AI_HEADER_OPTION_NAME',                 'h');
define ('AI_FOOTER_OPTION_NAME',                 'f');
define ('AI_ADB_MESSAGE_OPTION_NAME',            'a');

define ('AI_OPTION_CODE',                        'code');
define ('AI_OPTION_ENABLE_MANUAL',               'enable_manual');
define ('AI_OPTION_ENABLE_AMP',                  'enable_amp');
define ('AI_OPTION_ENABLE_WIDGET',               'enable_widget');
define ('AI_OPTION_PROCESS_PHP',                 'process_php');
define ('AI_OPTION_DISABLE_INSERTION',           'disable_insertion');
define ('AI_OPTION_SHOW_LABEL',                  'show_label');
define ('AI_OPTION_BLOCK_WIDTH',                 'block_width');
define ('AI_OPTION_BLOCK_HEIGHT',                'block_height');
define ('AI_OPTION_BLOCK_BACKGROUND_COLOR',      'block-background-color');
define ('AI_OPTION_LAZY_LOADING',                'lazy_loading');
define ('AI_OPTION_WAIT_FOR_INTERACTION',        'wait_for_interaction');
define ('AI_OPTION_PROTECTED',                   'protected');
define ('AI_OPTION_MANUAL_LOADING',              'manual_loading');
define ('AI_OPTION_IFRAME',                      'iframe');
define ('AI_OPTION_IFRAME_WIDTH',                'iframe_width');
define ('AI_OPTION_IFRAME_HEIGHT',               'iframe_height');
define ('AI_OPTION_LABEL_IN_IFRAME',             'label_in_iframe');
define ('AI_OPTION_TRACKING',                    'tracking');
define ('AI_OPTION_ENABLE_AJAX',                 'enable_ajax');
define ('AI_OPTION_ENABLE_FEED',                 'enable_feed');
define ('AI_OPTION_ENABLE_404',                  'enable_404');
define ('AI_OPTION_DISABLE_CACHING',             'disable_caching');
define ('AI_OPTION_MAX_PAGE_BLOCKS_ENABLED',     'max_page_blocks');
define ('AI_OPTION_ONLY_IN_THE_LOOP',            'only_in_the_loop');
define ('AI_OPTION_EMBED_JS_CODE',               'embed_js');
define ('AI_OPTION_BLOCK_NAME',                  'name');
define ('AI_OPTION_AUTOMATIC_INSERTION',         'display_type');
define ('AI_OPTION_PARAGRAPH_NUMBER',            'paragraph_number');
define ('AI_OPTION_MIN_PARAGRAPHS',              'min_paragraphs');
define ('AI_OPTION_MAX_PARAGRAPHS',              'max_paragraphs');
define ('AI_OPTION_SKIP_FIRST_PARAGRAPHS',       'skip_first_paragraphs');
define ('AI_OPTION_SKIP_LAST_PARAGRAPHS',        'skip_last_paragraphs');
define ('AI_OPTION_MIN_WORDS_ABOVE',             'min_words_above');
define ('AI_OPTION_COUNT_INSIDE_BLOCKQUOTE',     'count_inside_blockquote');
define ('AI_OPTION_COUNT_INSIDE',                'count_inside');
define ('AI_OPTION_COUNT_INSIDE_ELEMENTS',       'count_inside_el');
define ('AI_OPTION_COUNT_INSIDE_ELEMENTS_CONTAIN','count_inside_el_contain');
define ('AI_OPTION_COUNT_INSIDE_ELEMENTS_TEXT',  'count_inside_el_text');
define ('AI_OPTION_CHECK_ONLY_TAG_ATTRIBUTES',   'check_only_tag_attr');
define ('AI_OPTION_MIN_WORDS',                   'min_words');
define ('AI_OPTION_MAX_WORDS',                   'max_words');
define ('AI_OPTION_MIN_PARAGRAPH_WORDS',         'min_paragraph_words');
define ('AI_OPTION_MAX_PARAGRAPH_WORDS',         'max_paragraph_words');
define ('AI_OPTION_PARAGRAPH_TAGS',              'paragraph_tags');
define ('AI_OPTION_AVOID_PARAGRAPHS_ABOVE',      'avoid_paragraphs_above');
define ('AI_OPTION_AVOID_PARAGRAPHS_BELOW',      'avoid_paragraphs_below');
define ('AI_OPTION_AVOID_TEXT_ABOVE',            'avoid_text_above');
define ('AI_OPTION_AVOID_TEXT_BELOW',            'avoid_text_below');
define ('AI_OPTION_AVOID_ACTION',                'avoid_action');
define ('AI_OPTION_AVOID_TRY_LIMIT',             'avoid_try_limit');
define ('AI_OPTION_AVOID_DIRECTION',             'avoid_direction');
define ('AI_OPTION_HTML_SELECTOR',               'html_selector');
define ('AI_OPTION_SERVER_SIDE_INSERTION',       'server_side_insertion');
define ('AI_OPTION_WAIT_FOR_DELAY',              'wait_for_delay');
define ('AI_OPTION_WAIT_FOR',                    'wait_for');
define ('AI_OPTION_INSIDE_ELEMENT',              'inside_element');
define ('AI_OPTION_HTML_ELEMENT_INSERTION',      'html_insertion');
define ('AI_OPTION_EXCERPT_NUMBER',              'excerpt_number'); // needs to be renamed
define ('AI_OPTION_FILTER_TYPE',                 'filter_type');
define ('AI_OPTION_INVERTED_FILTER',             'inverted_filter');
define ('AI_OPTION_DIRECTION_TYPE',              'direction_type');
define ('AI_OPTION_ALIGNMENT_TYPE',              'alignment_type');
define ('AI_OPTION_HORIZONTAL_POSITION',         'horizontal_position');
define ('AI_OPTION_VERTICAL_POSITION',           'vertical_position');
define ('AI_OPTION_GENERAL_TAG',                 'general_tag');
define ('AI_OPTION_SCHEDULING',                  'scheduling');
define ('AI_OPTION_AFTER_DAYS',                  'after_days');
define ('AI_OPTION_START_DATE',                  'start_date');
define ('AI_OPTION_END_DATE',                    'end_date');
define ('AI_OPTION_START_TIME',                  'start_time');
define ('AI_OPTION_END_TIME',                    'end_time');
define ('AI_OPTION_WEEKDAYS',                    'weekdays');
define ('AI_OPTION_SCHEDULING_FALLBACK',         'fallback');
define ('AI_OPTION_LIMITS_FALLBACK',             'limits_fallback');
define ('AI_OPTION_MAXIMUM_INSERTIONS',          'maximum_insertions');
define ('AI_OPTION_ID_LIST',                     'id_list');
define ('AI_OPTION_ID_LIST_TYPE',                'id_list_type');
define ('AI_OPTION_URL_LIST',                    'url_list');
define ('AI_OPTION_URL_LIST_TYPE',               'url_list_type');
define ('AI_OPTION_URL_PARAMETER_LIST',          'url_parameter_list');
define ('AI_OPTION_URL_PARAMETER_LIST_TYPE',     'url_parameter_list_type');
define ('AI_OPTION_COOKIE_LIST',                 'cookie_list');
define ('AI_OPTION_COOKIE_LIST_TYPE',            'cookie_list_type');
define ('AI_OPTION_DOMAIN_LIST',                 'domain_list');
define ('AI_OPTION_DOMAIN_LIST_TYPE',            'domain_list_type');
define ('AI_OPTION_CLIENT_LIST',                 'client_list');
define ('AI_OPTION_CLIENT_LIST_TYPE',            'client_list_type');
define ('AI_OPTION_IP_ADDRESS_LIST',             'ip_address_list');
define ('AI_OPTION_IP_ADDRESS_LIST_TYPE',        'ip_address_list_type');
define ('AI_OPTION_COUNTRY_LIST',                'country_list');
define ('AI_OPTION_COUNTRY_LIST_TYPE',           'country_list_type');
define ('AI_OPTION_CATEGORY_LIST',               'category_list');
define ('AI_OPTION_CATEGORY_LIST_TYPE',          'category_list_type');
define ('AI_OPTION_TAG_LIST',                    'tag_list');
define ('AI_OPTION_TAG_LIST_TYPE',               'tag_list_type');
define ('AI_OPTION_TAXONOMY_LIST',               'taxonomy_list');
define ('AI_OPTION_TAXONOMY_LIST_TYPE',          'taxonomy_list_type');
define ('AI_OPTION_DISPLAY_ON_HOMEPAGE',         'display_on_homepage');
define ('AI_OPTION_DISPLAY_ON_PAGES',            'display_on_pages');
define ('AI_OPTION_DISPLAY_ON_POSTS',            'display_on_posts');
define ('AI_OPTION_DISPLAY_ON_CATEGORY_PAGES',   'display_on_category_pages');
define ('AI_OPTION_DISPLAY_ON_SEARCH_PAGES',     'display_on_search_pages');
define ('AI_OPTION_DISPLAY_ON_ARCHIVE_PAGES',    'display_on_archive_pages');
define ('AI_OPTION_ENABLED_ON_WHICH_PAGES',      'enabled_on_which_pages');
define ('AI_OPTION_ENABLED_ON_WHICH_POSTS',      'enabled_on_which_posts');
define ('AI_OPTION_EXCEPTIONS_ENABLED',          'exceptions_enabled');
define ('AI_OPTION_EXCEPTIONS_FUNCTION',         'exceptions_function');
define ('AI_OPTION_ENABLE_PHP_CALL',             'enable_php_call');
define ('AI_OPTION_PARAGRAPH_TEXT',              'paragraph_text');
define ('AI_OPTION_PARAGRAPH_TEXT_TYPE',         'paragraph_text_type');
define ('AI_OPTION_CUSTOM_CSS',                  'custom_css');
define ('AI_OPTION_DISPLAY_FOR_USERS',           'display_for_users');
define ('AI_OPTION_DISPLAY_FOR_DEVICES',         'display_for_devices');
define ('AI_OPTION_DETECT_SERVER_SIDE',          'detect_server_side');
define ('AI_OPTION_DETECT_CLIENT_SIDE',          'detect_client_side');
define ('AI_OPTION_CLIENT_SIDE_ACTION',          'client_side_action');
define ('AI_OPTION_DETECT_VIEWPORT',             'detect_viewport');
define ('AI_OPTION_ADB_BLOCK_ACTION',            'adb-block-action');
define ('AI_OPTION_ADB_BLOCK_REPLACEMENT',       'adb-block-replacement');
define ('AI_OPTION_CLOSE_BUTTON',                'close-button');
define ('AI_OPTION_AUTO_CLOSE_TIME',             'auto-close-time');
define ('AI_OPTION_STAY_CLOSED_TIME',            'stay-closed-time');
define ('AI_OPTION_HORIZONTAL_MARGIN',           'horizontal-margin');
define ('AI_OPTION_VERTICAL_MARGIN',             'vertical-margin');
define ('AI_OPTION_ANIMATION',                   'animation');
define ('AI_OPTION_ANIMATION_TRIGGER',           'animation-trigger');
define ('AI_OPTION_ANIMATION_TRIGGER_VALUE',     'animation-trigger-value');
define ('AI_OPTION_ANIMATION_TRIGGER_OFFSET',    'animation-trigger-offset');
define ('AI_OPTION_ANIMATION_TRIGGER_DELAY',     'animation-trigger-delay');

define ('AI_OPTION_ANIMATION_TRIGGER_ONCE',      'animation-trigger-once');

define ('AI_OPTION_ANIMATION_OUT_TRIGGER',       'animation-out-trigger');
define ('AI_OPTION_ANIMATION_OUT_TRIGGER_VALUE', 'animation-out-trigger-value');
define ('AI_OPTION_ANIMATION_OUT_TRIGGER_OFFSET','animation-out-trigger-offset');

define ('AI_OPTION_BACKGROUND',                  'background');
define ('AI_OPTION_BACKGROUND_COLOR',            'background-color');
define ('AI_OPTION_BACKGROUND_IMAGE',            'background-image');
define ('AI_OPTION_BACKGROUND_SIZE',             'background-size');
define ('AI_OPTION_BACKGROUND_REPEAT',           'background-repeat');
define ('AI_OPTION_SET_BODY_BACKGROUND',         'set-body-background');
define ('AI_OPTION_DELAY_TIME',                  'delay-time');
define ('AI_OPTION_DELAY_SHOWING',               'delay-showing');
define ('AI_OPTION_SHOW_EVERY',                  'show-every');
define ('AI_OPTION_VISITOR_MAX_IMPRESSIONS',                   'visitor-max-imp');
define ('AI_OPTION_VISITOR_LIMIT_IMPRESSIONS_PER_TIME_PERIOD', 'visitor-limit-imp-per-time');
define ('AI_OPTION_VISITOR_LIMIT_IMPRESSIONS_TIME_PERIOD',     'visitor-limit-imp-time');
define ('AI_OPTION_MAX_IMPRESSIONS',                           'max-imp');
define ('AI_OPTION_LIMIT_IMPRESSIONS_PER_TIME_PERIOD',         'limit-imp-per-time');
define ('AI_OPTION_LIMIT_IMPRESSIONS_TIME_PERIOD',             'limit-imp-time');
define ('AI_OPTION_VISITOR_MAX_CLICKS',                        'visitor-max-clicks');
define ('AI_OPTION_VISITOR_LIMIT_CLICKS_PER_TIME_PERIOD',      'visitor-limit-clicks-per-time');
define ('AI_OPTION_VISITOR_LIMIT_CLICKS_TIME_PERIOD',          'visitor-limit-clicks-time');
define ('AI_OPTION_MAX_CLICKS',                                'max-clicks');
define ('AI_OPTION_LIMIT_CLICKS_PER_TIME_PERIOD',              'limit-clicks-per-time');
define ('AI_OPTION_LIMIT_CLICKS_TIME_PERIOD',                  'limit-clicks-time');
define ('AI_OPTION_TRIGGER_CLICK_FRAUD_PROTECTION',            'trigger-cfp');

define ('AI_OPTION_PARALLAX',                    'parallax');
define ('AI_OPTION_PARALLAX_IMAGE',              'parallax-image');
define ('AI_OPTION_PARALLAX_SHIFT',              'parallax-shift');
define ('AI_OPTION_PARALLAX_LINK',               'parallax-link');
define ('AI_OPTION_PARALLAX_LINK_NEW_TAB',       'parallax-link-new-tab');

define ('AI_OPTION_DISABLED',                    'disabled');

define ('AI_OPTION_IMPORT',                      'import');
define ('AI_OPTION_IMPORT_NAME',                 'import_name');

define ('AI_OPTION_ADB_DEVICES',                 'adb-devices');
define ('AI_OPTION_ADB_ACTION',                  'adb-action');
define ('AI_OPTION_ADB_NO_ACTION',               'adb-no-action');
define ('AI_OPTION_ADB_SELECTORS',               'adb-selectors');
define ('AI_OPTION_ADB_DELAY_ACTION',            'adb-delay-action');
define ('AI_OPTION_ADB_NO_ACTION_PERIOD',        'adb-no-action-period');
define ('AI_OPTION_ADB_REDIRECTION_PAGE',        'adb-redirection-page');
define ('AI_OPTION_ADB_CUSTOM_REDIRECTION_URL',  'adb-custom-redirection-url');
define ('AI_OPTION_ADB_MESSAGE_CSS',             'adb-message-css');
define ('AI_OPTION_ADB_OVERLAY_CSS',             'adb-overlay-css');
define ('AI_OPTION_ADB_UNDISMISSIBLE_MESSAGE',   'adb-undismissible-message');
define ('AI_OPTION_ADB_NO_UNDISMISSIBLE_MESSAGE','adb-no-undismissible-message');
define ('AI_OPTION_ADB_EXTERNAL_SCRIPTS',        'adb-external-scripts');

//misc
define('AD_EMPTY_VALUE','');

//define constant variable form
define('AI_FORM_SAVE',              'ai_save');
define('AI_FORM_CLEAR',             'ai_clear');
define('AI_FORM_CLEAR_EXCEPTIONS',  'ai-clear-exceptions');
define('AI_FORM_CLEAR_STATISTICS',  'ai-clear-statistics');

define('AD_AUTHOR_SITE', '<!-- Powered by Ad Inserter Plugin -->');
define('AD_FALLBACK_SEPARATOR', '|fallback|');
define('AD_VIEWPORT_SEPARATOR', '|viewport|');
define('AD_CHECK_SEPARATOR',    '|check|');
define('AD_COUNT_SEPARATOR',    '|count|');
define('AD_ROTATE_SEPARATOR',   '|rotate|');
define('AD_AMP_SEPARATOR',      '|amp|');
define('AD_HEAD_SEPARATOR',     '|head|');
define('AD_HTTP_SEPARATOR',     '|http|');

//form select options
define('AD_SELECT_SELECTED','selected');

//Automatic insertion options - Deprecated
define('AD_SELECT_NONE','None');
define('AD_SELECT_BEFORE_POST','Before Post');
define('AD_SELECT_AFTER_POST','After Post');
define('AD_SELECT_BEFORE_PARAGRAPH','Before Paragraph');
define('AD_SELECT_AFTER_PARAGRAPH','After Paragraph');
define('AD_SELECT_BEFORE_CONTENT','Before Content');
define('AD_SELECT_AFTER_CONTENT','After Content');
define('AD_SELECT_BEFORE_EXCERPT','Before Excerpt');
define('AD_SELECT_AFTER_EXCERPT','After Excerpt');
define('AD_SELECT_BETWEEN_POSTS','Between Posts');
define('AD_SELECT_WIDGET','Widget');              // Deprecated
define('AD_SELECT_BEFORE_TITLE','Before Title');  // Deprecated
define('AD_SELECT_MANUAL','Manual');              // Deprecated

define('AI_AUTOMATIC_INSERTION_DISABLED',             0);
define('AI_AUTOMATIC_INSERTION_BEFORE_POST',          1);
define('AI_AUTOMATIC_INSERTION_AFTER_POST',           2);
define('AI_AUTOMATIC_INSERTION_BEFORE_CONTENT',       3);
define('AI_AUTOMATIC_INSERTION_AFTER_CONTENT',        4);
define('AI_AUTOMATIC_INSERTION_BEFORE_PARAGRAPH',     5);
define('AI_AUTOMATIC_INSERTION_AFTER_PARAGRAPH',      6);
define('AI_AUTOMATIC_INSERTION_BEFORE_EXCERPT',       7);
define('AI_AUTOMATIC_INSERTION_AFTER_EXCERPT',        8);
define('AI_AUTOMATIC_INSERTION_BETWEEN_POSTS',        9);
define('AI_AUTOMATIC_INSERTION_BEFORE_COMMENTS',     10);
define('AI_AUTOMATIC_INSERTION_BETWEEN_COMMENTS',    11);
define('AI_AUTOMATIC_INSERTION_AFTER_COMMENTS',      12);
define('AI_AUTOMATIC_INSERTION_FOOTER',              13);
define('AI_AUTOMATIC_INSERTION_ABOVE_HEADER',        14);
define('AI_AUTOMATIC_INSERTION_BEFORE_HTML_ELEMENT', 15);
define('AI_AUTOMATIC_INSERTION_AFTER_HTML_ELEMENT',  16);
define('AI_AUTOMATIC_INSERTION_INSIDE_HTML_ELEMENT', 17);
define('AI_AUTOMATIC_INSERTION_BEFORE_IMAGE',        18);
define('AI_AUTOMATIC_INSERTION_AFTER_IMAGE',         19);

define('AI_AUTOMATIC_INSERTION_OUTPUT_BUFFERING',    99);
define('AI_AUTOMATIC_INSERTION_CUSTOM_HOOK',        100); // 100 .. 119

define('AI_TEXT_ENG_DISABLED',             'Disabled');
define('AI_TEXT_ENG_BEFORE_POST',          'Before post');
define('AI_TEXT_ENG_AFTER_POST',           'After post');
define('AI_TEXT_ENG_BEFORE_CONTENT',       'Before content');
define('AI_TEXT_ENG_AFTER_CONTENT',        'After content');
define('AI_TEXT_ENG_BEFORE_PARAGRAPH',     'Before paragraph');
define('AI_TEXT_ENG_AFTER_PARAGRAPH',      'After paragraph');
define('AI_TEXT_ENG_BEFORE_EXCERPT',       'Before excerpt');
define('AI_TEXT_ENG_AFTER_EXCERPT',        'After excerpt');
define('AI_TEXT_ENG_BETWEEN_POSTS',        'Between posts');
define('AI_TEXT_ENG_BEFORE_COMMENTS',      'Before comments');
define('AI_TEXT_ENG_BETWEEN_COMMENTS',     'Between comments');
define('AI_TEXT_ENG_AFTER_COMMENTS',       'After comments');
define('AI_TEXT_ENG_ABOVE_HEADER',         'Above header');
define('AI_TEXT_ENG_FOOTER',               'Footer');
define('AI_TEXT_ENG_BEFORE_HTML_ELEMENT',  'Before HTML element');
define('AI_TEXT_ENG_AFTER_HTML_ELEMENT',   'After HTML element');
define('AI_TEXT_ENG_INSIDE_HTML_ELEMENT',  'Inside HTML element');
define('AI_TEXT_ENG_BEFORE_IMAGE',         'Before image');
define('AI_TEXT_ENG_AFTER_IMAGE',          'After image');


// Display options - deprecated
define('AD_DISPLAY_ALL_USERS',                    'all users');
define('AD_DISPLAY_LOGGED_IN_USERS',              'logged in users');
define('AD_DISPLAY_NOT_LOGGED_IN_USERS',          'not logged in users');
define('AD_DISPLAY_ADMINISTRATORS',               'administrators');

define('AI_DISPLAY_ALL_USERS',                    0);
define('AI_DISPLAY_LOGGED_IN_USERS',              1);
define('AI_DISPLAY_NOT_LOGGED_IN_USERS',          2);
define('AI_DISPLAY_ADMINISTRATORS',               3);

define('AI_TEXT_ENG_DISPLAY_ALL_USERS',           'all users');
define('AI_TEXT_ENG_DISPLAY_LOGGED_IN_USERS',     'logged in users');
define('AI_TEXT_ENG_DISPLAY_NOT_LOGGED_IN_USERS', 'not logged in users');
define('AI_TEXT_ENG_DISPLAY_ADMINISTRATORS',      'administrators');

// Deprecated
define('AD_DISPLAY_ALL_DEVICES',                'all');
define('AD_DISPLAY_DESKTOP_DEVICES',            'desktop');
define('AD_DISPLAY_MOBILE_DEVICES',             'mobile');
define('AD_DISPLAY_TABLET_DEVICES',             'tablet');
define('AD_DISPLAY_PHONE_DEVICES',              'phone');
define('AD_DISPLAY_DESKTOP_TABLET_DEVICES',     'desktop and tablet');
define('AD_DISPLAY_DESKTOP_PHONE_DEVICES',      'desktop and phone');

define('AI_INSERT_FOR_DESKTOP_DEVICES',         0);
define('AI_INSERT_FOR_MOBILE_DEVICES',          1);
define('AI_INSERT_FOR_TABLET_DEVICES',          2);
define('AI_INSERT_FOR_PHONE_DEVICES',           3);
define('AI_INSERT_FOR_DESKTOP_TABLET_DEVICES',  4);
define('AI_INSERT_FOR_DESKTOP_PHONE_DEVICES',   5);

define('AI_INSERT_FOR_ALL_DEVICES',             6);

define('AI_TEXT_ENG_DESKTOP_DEVICES',           'desktop devices');
define('AI_TEXT_ENG_MOBILE_DEVICES',            'mobile devices');
define('AI_TEXT_ENG_TABLET_DEVICES',            'tablet devices');
define('AI_TEXT_ENG_PHONE_DEVICES',             'phone devices');
define('AI_TEXT_ENG_DESKTOP_TABLET_DEVICES',    'desktop and tablet devices');
define('AI_TEXT_ENG_DESKTOP_PHONE_DEVICES',     'desktop and phone devices');

//Direction options - deprecated
define('AD_DIRECTION_FROM_TOP',     'From Top');
define('AD_DIRECTION_FROM_BOTTOM',  'From Bottom');

define('AI_DIRECTION_FROM_TOP',       0);
define('AI_DIRECTION_FROM_BOTTOM',    1);

define('AI_TEXT_ENG_DIRECTION_FROM_TOP',       'from top');
define('AI_TEXT_ENG_DIRECTION_FROM_BOTTOM',    'from bottom');

// Post-Page options
// Deprecated
define('AD_ENABLED_ON_ALL',                     'On all');
define('AD_ENABLED_ON_ALL_EXCEPT_ON_SELECTED',  'On all except selected');
define('AD_ENABLED_ONLY_ON_SELECTED',           'Only on selected');

define('AI_IGNORE_EXCEPTIONS',                  0);
define('AI_DEFAULT_INSERTION_ENABLED',          1);
define('AI_DEFAULT_INSERTION_DISABLED',         2);

define('AI_TEXT_ENG_NO_INDIVIDUAL_EXCEPTIONS',  '');

// Deprecated
define('AI_TEXT_NO_INDIVIDUAL_EXCEPTIONS',      '');
define('AI_TEXT_ENG_INDIVIDUALLY_DISABLED',     'Individually disabled');
define('AI_TEXT_ENG_INDIVIDUALLY_ENABLED',      'Individually enabled');

//Alignment options - Deprecated
define('AD_ALIGNMENT_NO_WRAPPING','No Wrapping');
define('AD_ALIGNMENT_CUSTOM_CSS','Custom CSS');
define('AD_ALIGNMENT_NONE','None');
define('AD_ALIGNMENT_LEFT','Align Left');
define('AD_ALIGNMENT_RIGHT','Align Right');
define('AD_ALIGNMENT_CENTER','Center');
define('AD_ALIGNMENT_FLOAT_LEFT','Float Left');
define('AD_ALIGNMENT_FLOAT_RIGHT','Float Right');

define('AI_ALIGNMENT_DEFAULT',        0);
define('AI_ALIGNMENT_LEFT',           1);
define('AI_ALIGNMENT_RIGHT',          2);
define('AI_ALIGNMENT_CENTER',         3);
define('AI_ALIGNMENT_FLOAT_LEFT',     4);
define('AI_ALIGNMENT_FLOAT_RIGHT',    5);
define('AI_ALIGNMENT_NO_WRAPPING',    6);
define('AI_ALIGNMENT_CUSTOM_CSS',     7);

define('AI_ALIGNMENT_STICKY_LEFT',    8);
define('AI_ALIGNMENT_STICKY_RIGHT',   9);
define('AI_ALIGNMENT_STICKY_TOP',    10);
define('AI_ALIGNMENT_STICKY_BOTTOM', 11);

define('AI_ALIGNMENT_STICKY',        12);

// Used also for alignment class names
define('AI_TEXT_ENG_DEFAULT',             'Default');
define('AI_TEXT_ENG_LEFT',                'Align left');
define('AI_TEXT_ENG_RIGHT',               'Align right');
define('AI_TEXT_ENG_CENTER',              'Center');
define('AI_TEXT_ENG_FLOAT_LEFT',          'Float left');
define('AI_TEXT_ENG_FLOAT_RIGHT',         'Float right');
define('AI_TEXT_ENG_NO_WRAPPING',         'No wrapping');
define('AI_TEXT_ENG_CUSTOM_CSS',          'Custom CSS');
define('AI_TEXT_ENG_STICKY_LEFT',         'Sticky left');
define('AI_TEXT_ENG_STICKY_RIGHT',        'Sticky right');
define('AI_TEXT_ENG_STICKY_TOP',          'Sticky top');
define('AI_TEXT_ENG_STICKY_BOTTOM',       'Sticky bottom');
define('AI_TEXT_ENG_STICKY',              'Sticky');

define('AI_STICK_TO_THE_LEFT',          0);
define('AI_STICK_TO_THE_CONTENT_LEFT',  1);
define('AI_STICK_HORIZONTAL_CENTER',    2);
define('AI_STICK_TO_THE_CONTENT_RIGHT', 3);
define('AI_STICK_TO_THE_RIGHT',         4);
//define('AI_STICK_BACKGROUND',           5);

define('AI_TEXT_ENG_STICK_TO_THE_LEFT',           'Stick to the left');
define('AI_TEXT_ENG_STICK_TO_THE_CONTENT_LEFT',   'Stick to the content left');
define('AI_TEXT_ENG_STICK_TO_THE_CONTENT_RIGHT',  'Stick to the content right');
define('AI_TEXT_ENG_STICK_TO_THE_RIGHT',          'Stick to the right');

define('AI_STICK_TO_THE_TOP',           0);
define('AI_STICK_VERTICAL_CENTER',      1);
define('AI_SCROLL_WITH_THE_CONTENT',    2);
define('AI_STICK_TO_THE_BOTTOM',        3);

define('AI_TEXT_ENG_STICK_TO_THE_TOP',        'Stick to the top');
define('AI_TEXT_ENG_SCROLL_WITH_THE_CONTENT', 'Scroll with the content');
define('AI_TEXT_ENG_STICK_TO_THE_BOTTOM',     'Stick to the bottom');

define('AI_ANIMATION_NONE',           0);
define('AI_ANIMATION_FADE',           1);
define('AI_ANIMATION_SLIDE',          2);
define('AI_ANIMATION_SLIDE_FADE',     3);
define('AI_ANIMATION_FLIP',           4);
define('AI_ANIMATION_ZOOM_IN',        5);
define('AI_ANIMATION_ZOOM_OUT',       6);
define('AI_ANIMATION_TURN',           7);

define('AI_TEXT_ENG_FADE',            'Fade');
define('AI_TEXT_ENG_SLIDE',           'Slide');
define('AI_TEXT_ENG_SLIDE_FADE',      'Slide and Fade');
define('AI_TEXT_ENG_FLIP',            'Flip');
define('AI_TEXT_ENG_ZOOM_IN',         'Zoom In');
define('AI_TEXT_ENG_ZOOM_OUT',        'Zoom Out');
define('AI_TEXT_ENG_TURN',            'Turn');

define('AI_TRIGGER_PAGE_LOADED',      0);
define('AI_TRIGGER_PAGE_SCROLLED_PC', 1);
define('AI_TRIGGER_PAGE_SCROLLED_PX', 2);
define('AI_TRIGGER_ELEMENT_SCROLLS_IN',  3);
// Animate out
define('AI_TRIGGER_DISABLED',         4);
define('AI_TRIGGER_ENABLED',          5);
define('AI_TRIGGER_ELEMENT_SCROLLS_OUT',   6);

define('AI_TEXT_ENG_PAGE_LOADED',         'Page loaded');
define('AI_TEXT_ENG_PAGE_SCROLLED_PC',    'Page scrolled (%)');
define('AI_TEXT_ENG_PAGE_SCROLLED_PX',    'Page scrolled (px)');
define('AI_TEXT_ENG_ELEMENT_VISIBLE',     'Element visible');

define('AI_BACKGROUND_REPEAT_DEFAULT',    0);
define('AI_BACKGROUND_REPEAT_NO',         1);
define('AI_BACKGROUND_REPEAT_YES',        2);
define('AI_BACKGROUND_REPEAT_HORIZONTALY',3);
define('AI_BACKGROUND_REPEAT_VERTICALLY', 4);
define('AI_BACKGROUND_REPEAT_SPACE',      5);
define('AI_BACKGROUND_REPEAT_ROUND',      6);

define('AI_TEXT_ENG_NO',                  'No');
define('AI_TEXT_ENG_YES',                 'Yes');
define('AI_TEXT_ENG_HORIZONTALY',         'Horizontally');
define('AI_TEXT_ENG_VERTICALLY',          'Vertically');
define('AI_TEXT_ENG_SPACE',               'Space');
define('AI_TEXT_ENG_ROUND',               'Round');

define('AI_BACKGROUND_SIZE_DEFAULT',      0);
define('AI_BACKGROUND_SIZE_COVER',        1);
define('AI_BACKGROUND_SIZE_FIT',          2);
define('AI_BACKGROUND_SIZE_FILL',         3);

define('AI_TEXT_ENG_COVER',               'Cover');
define('AI_TEXT_ENG_FIT_BKG_SIZE',        'Fit');
define('AI_TEXT_ENG_FILL',                'Fill');

define('AI_STICKY_Z_INDEX',               9995);   // update ad-inserter.js

define('AI_ALIGNMENT_CSS_DEFAULT',        'margin: 8px 0; clear: both;');
define('AI_ALIGNMENT_CSS_LEFT',           'margin: 8px auto 8px 0; text-align: left; display: block; clear: both;||margin: 8px 0; text-align: left; clear: both; display: flex; justify-content: flex-start; flex-direction: column; align-items: flex-start;');
define('AI_ALIGNMENT_CSS_RIGHT',          'margin: 8px 0 8px auto; text-align: right; display: block; clear: both;||margin: 8px 0; text-align: right; clear: both; display: flex; justify-content: flex-end; flex-direction: column; align-items: flex-end;');
define('AI_ALIGNMENT_CSS_CENTER',         'margin: 8px auto; text-align: center; display: block; clear: both;||margin: 8px 0; text-align: center; clear: both; display: flex; justify-content: center; flex-direction: column; align-items: center;');
define('AI_ALIGNMENT_CSS_FLOAT_LEFT',     'margin: 8px 8px 8px 0; float: left;');
define('AI_ALIGNMENT_CSS_FLOAT_RIGHT',    'margin: 8px 0 8px 8px; float: right;');
define('AI_ALIGNMENT_CSS_STICKY_LEFT',    'position: fixed; left: 0px; top: 100px; z-index: 9999;');
define('AI_ALIGNMENT_CSS_STICKY_RIGHT',   'position: fixed; right: 0px; top: 100px; z-index: 9999;');
define('AI_ALIGNMENT_CSS_STICKY_TOP',     'position: fixed; top: 0; text-align: center; left: 50%; transform: translate(-50%); width: 100%; z-index: 9999;||position: fixed; top: 0; left: 0; width: 100%; text-align: center; z-index: 9999;||position: fixed; top: 0; left: 0; width: 100%; text-align: center; display: flex; justify-content: center; z-index: 9999;');
define('AI_ALIGNMENT_CSS_STICKY_BOTTOM',  'position: fixed; bottom: 0; text-align: center; left: 50%; transform: translate(-50%); width: 100%; z-index: 9999;||position: fixed; bottom: 0; left: 0; width: 100%; text-align: center; z-index: 9999;||position: fixed; bottom: 0; left: 0; width: 100%; text-align: center; display: flex; justify-content: center; z-index: 9999;');
define('AI_ALIGNMENT_CSS_STICKY',         'position: fixed; z-index: '.AI_STICKY_Z_INDEX.';');

define('AI_ALIGNMENT_CSS_STICK_TO_THE_TOP',             ' top: 0px;');
define('AI_ALIGNMENT_CSS_STICK_TO_THE_TOP_OFFSET',      ' top: 100px;');
define('AI_ALIGNMENT_CSS_CENTER_VERTICAL',              ' top: 50%; transform: translate(0, -50%);');
define('AI_ALIGNMENT_CSS_CENTER_VERTICAL_H_ANIM',       ' top: 50%;');
define('AI_ALIGNMENT_CSS_SCROLL_WITH_THE_CONTENT',      ' position: absolute; margin-bottom: auto; width: fit-content; width: -moz-fit-content; top: 100px; display: none;');
define('AI_ALIGNMENT_CSS_SCROLL_WITH_THE_CONTENT_BKG',  ' position: absolute; margin-bottom: auto; width: fit-content; width: -moz-fit-content; top: 0px; display: none;');
define('AI_ALIGNMENT_CSS_STICK_TO_THE_BOTTOM',          ' bottom: 0px;');
define('AI_ALIGNMENT_CSS_STICK_TO_THE_BOTTOM_OFFSET',   ' bottom: 100px;');

define('AI_ALIGNMENT_CSS_STICK_TO_THE_LEFT',            ' left: 0px;');
define('AI_ALIGNMENT_CSS_STICK_TO_THE_LEFT_BKG',        ' left: 0px; display: none;');
define('AI_ALIGNMENT_CSS_STICK_TO_THE_CONTENT_LEFT',    ' left: auto; margin-right: 10px; width: fit-content; width: -moz-fit-content; display: none;');
define('AI_ALIGNMENT_CSS_STICK_TO_THE_CONTENT_LEFT_BKG',' left: auto; width: fit-content; width: -moz-fit-content; display: none;');
define('AI_ALIGNMENT_CSS_STICK_CENTER_HORIZONTAL',      ' text-align: center; left: 50%; transform: translate(-50%);');
define('AI_ALIGNMENT_CSS_STICK_CENTER_HORIZONTAL_V',    ' text-align: center; left: 50%; transform: translate(-50%, -50%);');
define('AI_ALIGNMENT_CSS_STICK_CENTER_HORIZONTAL_ANIM', ' text-align: center; left: 50%;');
define('AI_ALIGNMENT_CSS_STICK_CENTER_HORIZONTAL_BKG',  ' z-index: -1; top: 0px; left: 0px; width: 100%; height: 100%;');
define('AI_ALIGNMENT_CSS_STICK_BACKGROUND',             ' width: 100%; height: 100%;');
define('AI_ALIGNMENT_CSS_STICK_TO_THE_CONTENT_RIGHT',   ' right: auto; margin-left: 10px; width: fit-content; width: -moz-fit-content; display: none;');
define('AI_ALIGNMENT_CSS_STICK_TO_THE_CONTENT_RIGHT_BKG',' right: auto; width: fit-content; width: -moz-fit-content; display: none;');
define('AI_ALIGNMENT_CSS_STICK_TO_THE_RIGHT',           ' right: 0px;');
define('AI_ALIGNMENT_CSS_STICK_TO_THE_RIGHT_BKG',       ' right: 0px; display: flex; justify-content: flex-end; flex-direction: column; align-items: flex-end; display: none;');
define('AI_ALIGNMENT_CSS_STICK_TO_THE_RIGHT_SCROLL',    ' right: 0px; margin-left: auto;');

define('AI_ALIGNMENT_CSS_STICK_TO_THE_CONTENT_LEFT_W',  ' right: calc(50%); display: block;');
define('AI_ALIGNMENT_CSS_STICK_TO_THE_CONTENT_RIGHT_W', ' left: calc(50%); display: block;');

define('AI_ALIGNMENT_CSS_AMP_LEFT',       'display: flex; justify-content: flex-start;');
define('AI_ALIGNMENT_CSS_AMP_RIGHT',      'display: flex; justify-content: flex-end;');
define('AI_ALIGNMENT_CSS_AMP_CENTER',     'display: flex; justify-content: center;');

define('AI_ALIGNMENT_CSS_HIDDEN_LIST',    'visibility: hidden; position: absolute; width: 50%; height: 1px; top: -1000px; z-index: -9999; margin: 0px!important;');


// List Type - deprecated
define('AD_BLACK_LIST', 'Black List');
define('AD_WHITE_LIST', 'White List');

define('AI_BLACK_LIST', 0);
define('AI_WHITE_LIST', 1);

define('AI_TEXT_ENG_BLACK_LIST', 'Black List');
define('AI_TEXT_ENG_WHITE_LIST', 'White List');


//Filter Type - Deprecated
define ('AI_OPTION_FILTER_AUTO',                    'Auto');
define ('AI_OPTION_FILTER_PHP_FUNCTION_CALLS',      'PHP function calls');
define ('AI_OPTION_FILTER_CONTENT_PROCESSING',      'Content processing');
define ('AI_OPTION_FILTER_EXCERPT_PROCESSING',      'Excerpt processing');
define ('AI_OPTION_FILTER_BEFORE_POST_PROCESSING',  'Before post processing');
define ('AI_OPTION_FILTER_AFTER_POST_PROCESSING',   'After post processing');
define ('AI_OPTION_FILTER_WIDGET_DRAWING',          'Widget drawing');
define ('AI_OPTION_FILTER_SUBPAGES',                'Subpages');
define ('AI_OPTION_FILTER_POSTS',                   'Posts');
define ('AI_OPTION_FILTER_COMMENTS',                'Comments');


//Filter Type
define ('AI_FILTER_AUTO',                    0);
define ('AI_FILTER_PHP_FUNCTION_CALLS',      1);
define ('AI_FILTER_CONTENT_PROCESSING',      2);
define ('AI_FILTER_EXCERPT_PROCESSING',      3);
define ('AI_FILTER_BEFORE_POST_PROCESSING',  4);
define ('AI_FILTER_AFTER_POST_PROCESSING',   5);
define ('AI_FILTER_WIDGET_DRAWING',          6);
define ('AI_FILTER_SUBPAGES',                7);
define ('AI_FILTER_POSTS',                   8);
define ('AI_FILTER_PARAGRAPHS',              9);
define ('AI_FILTER_COMMENTS',               10);
define ('AI_FILTER_IMAGES',                 11);


define ('AI_TEXT_ENG_AUTO_COUNTER',                    'auto counter');
define ('AI_TEXT_ENG_PHP_FUNCTION_CALLS_COUNTER',      'PHP function calls counter');
define ('AI_TEXT_ENG_CONTENT_PROCESSING_COUNTER',      'content processing counter');
define ('AI_TEXT_ENG_EXCERPT_PROCESSING_COUNTER',      'excerpt processing counter');
define ('AI_TEXT_ENG_BEFORE_POST_PROCESSING_COUNTER',  'before post processing counter');
define ('AI_TEXT_ENG_AFTER_POST_PROCESSING_COUNTER',   'after post processing counter');
define ('AI_TEXT_ENG_WIDGET_DRAWING_COUNTER',          'widget drawing counter');
define ('AI_TEXT_ENG_SUBPAGES_COUNTER',                'subpages counter');
define ('AI_TEXT_ENG_POSTS_COUNTER',                   'posts counter');
define ('AI_TEXT_ENG_PARAGRAPHS_COUNTER',              'paragraphs counter');
define ('AI_TEXT_ENG_COMMENTS_COUNTER',                'comments counter');
define ('AI_TEXT_ENG_IMAGES_COUNTER',                  'images counter');


// Text List Type - deprecated
define('AD_CONTAIN',                  'contain');
define('AD_DO_NOT_CONTAIN',           'do not contain');

define('AI_CONTAIN',                  0);
define('AI_DO_NOT_CONTAIN',           1);

define('AI_TEXT_ENG_CONTAIN',         'contain');
define('AI_TEXT_ENG_DO_NOT_CONTAIN',  'do not contain');

define('AI_DO_NOT_COUNT',             0);
define('AI_COUNT_ONLY',               1);

define('AI_TEXT_ENG_DO_NOT_COUNT',    'Do not count');
define('AI_TEXT_ENG_COUNT_ONLY',      'Count only');


// Avoid text action - deprecated
define('AD_DO_NOT_INSERT',          'do not insert');
define('AD_TRY_TO_SHIFT_POSITION',  'try to shift position');

// Avoid text action
define('AI_DO_NOT_INSERT',                  0);
define('AI_TRY_TO_SHIFT_POSITION',          1);

define('AI_TEXT_ENG_DO_NOT_INSERT',         'do not insert');
define('AI_TEXT_ENG_TRY_TO_SHIFT_POSITION', 'try to shift position');


// Deprecated
define('AD_ABOVE',                'above');
define('AD_BELOW',                'below');
define('AD_ABOVE_AND_THEN_BELOW', 'above and then below');
define('AD_BELOW_AND_THEN_ABOVE', 'below and then above');

define('AI_ABOVE',                0);
define('AI_BELOW',                1);
define('AI_ABOVE_AND_THEN_BELOW', 2);
define('AI_BELOW_AND_THEN_ABOVE', 3);

define('AI_TEXT_ENG_ABOVE',                'above');
define('AI_TEXT_ENG_BELOW',                'below');
define('AI_TEXT_ENG_ABOVE_AND_THEN_BELOW', 'above and then below');
define('AI_TEXT_ENG_BELOW_AND_THEN_ABOVE', 'below and then above');


// Scheduling
define('AI_SCHEDULING_OFF',                       0);
define('AI_SCHEDULING_DELAY_FOR',                 1);
define('AI_SCHEDULING_BETWEEN_DATES',             2);
define('AI_SCHEDULING_INSERT_ONLY_FOR',           3);
define('AI_SCHEDULING_OUTSIDE_DATES',             4);
define('AI_SCHEDULING_PUBLISHED_BETWEEN_DATES',   5);
define('AI_SCHEDULING_PUBLISHED_OUTSIDE_DATES',   6);

define('AI_TEXT_ENG_INSERT_IMMEDIATELY',              'Insert immediately');
define('AI_TEXT_ENG_DELAY_INSERTION',                 'Delay insertion');
define('AI_TEXT_ENG_INSERT_BETWEEN_DATES',            'Insert between dates');
define('AI_TEXT_ENG_INSERT_OUTSIDE_DATES',            'Insert outside dates');
define('AI_TEXT_ENG_INSERT_ONLY',                     'Insert only');
define('AI_TEXT_ENG_INSERT_PUBLISHED_BETWEEN_DATES',  'Insert for posts published between dates');
define('AI_TEXT_ENG_INSERT_PUBLISHED_OUTSIDE_DATES',  'Insert for posts published outside dates');

// Dynamic blocks
define('AI_DYNAMIC_BLOCKS_SERVER_SIDE',        0);
define('AI_DYNAMIC_BLOCKS_CLIENT_SIDE_SHOW',   1);
define('AI_DYNAMIC_BLOCKS_SERVER_SIDE_W3TC',   2);
define('AI_DYNAMIC_BLOCKS_CLIENT_SIDE_INSERT', 3);

define('AI_TEXT_ENG_SERVER_SIDE',           'Server-side');
define('AI_TEXT_ENG_CLIENT_SIDE',           'Client-side');
define('AI_TEXT_ENG_CLIENT_SIDE_SHOW',      'Client-side show');
define('AI_TEXT_ENG_CLIENT_SIDE_INSERT',    'Client-side insert');
define('AI_TEXT_ENG_SERVER_SIDE_W3TC',      'Server-side using W3 Total Cache');

// Paragraph counting functions
define('AI_STANDARD_PARAGRAPH_COUNTING_FUNCTIONS',       0);
define('AI_MULTIBYTE_PARAGRAPH_COUNTING_FUNCTIONS',      1);

define('AI_TEXT_ENG_STANDARD',           'Standard');
define('AI_TEXT_ENG_MULTIBYTE',          'Multibyte');

// Tracking
define('AI_TRACKING_DISABLED',       0);
define('AI_TRACKING_ENABLED',        1);

// Ad Blocking
define ('AI_ADB_ACTION_NONE',             0);
define ('AI_ADB_ACTION_MESSAGE',          1);
define ('AI_ADB_ACTION_REDIRECTION',      2);

define ('AI_TEXT_ENG_NONE',               'None');
define ('AI_TEXT_ENG_POPUP_MESSAGE',      'Popup Message');
define ('AI_TEXT_ENG_REDIRECTION',        'Redirection');

define ('AI_ADB_NO_ACTION_NONE',          0);
define ('AI_ADB_NO_ACTION_LOGGED_IN',     1);
define ('AI_ADB_NO_ACTION_ADMINISTRATORS',2);

define ('AI_ADB_BLOCK_ACTION_DO_NOTHING', 0);
define ('AI_ADB_BLOCK_ACTION_REPLACE',    1);
define ('AI_ADB_BLOCK_ACTION_SHOW',       2);
define ('AI_ADB_BLOCK_ACTION_HIDE',       3);

define ('AI_TEXT_ENG_DO_NOTHING',         'Do nothing');
define ('AI_TEXT_ENG_REPLACE',            'Replace');
define ('AI_TEXT_ENG_SHOW',               'Show');
define ('AI_TEXT_ENG_HIDE',               'Hide');

// Plugin tracking
define ('AI_PLUGIN_TRACKING_DISABLED', 0);
define ('AI_PLUGIN_TRACKING_ENABLED',  1);

// Ad blocking detection
define ('AI_ADB_DETECTION_STANDARD', 0);
define ('AI_ADB_DETECTION_ADVANCED', 1);

// Output buffering
define ('AI_OUTPUT_BUFFERING_DISABLED', 0);
define ('AI_OUTPUT_BUFFERING_ENABLED',  1);

// Disable caching for administrators
define ('AI_DISABLE_CACHING_DISABLED', 0);
define ('AI_DISABLE_CACHING_ENABLED',  1);

// Wait for jQuery
define ('AI_WAIT_FOR_JQUERY_DISABLED', 0);
define ('AI_WAIT_FOR_JQUERY_ENABLED',  1);

// Click detection
define ('AI_CLICK_DETECTION_STANDARD', 0);
define ('AI_CLICK_DETECTION_ADVANCED', 1);

define ('AI_TEXT_ENG_INTERNAL',        'Internal');
define ('AI_TEXT_ENG_ADVANCED',        'Advanced');
define ('AI_TEXT_ENG_ENABLED',         'Enabled');

// Sticky widget mode
define ('AI_STICKY_WIDGET_MODE_CSS', 0);
define ('AI_STICKY_WIDGET_MODE_JS',  1);

define ('AI_TEXT_CSS', 'CSS');
define ('AI_TEXT_JS',  'JavaScript ');

define ('AI_GEO_DB_INTERNAL',        0);
define ('AI_GEO_DB_MAXMIND',         1);

define ('AI_TEXT_MAXMIND',         'MaxMind');

define ('AI_MANUAL_LOADING_DISABLED',     0);
define ('AI_MANUAL_LOADING_AUTO',         1);
define ('AI_MANUAL_LOADING_ENABLED',      2);

define ('AI_TEXT_ENG_AUTO',          'Auto');
define ('AI_TEXT_ENG_ALWAYS',        'Always');

define ('AI_CLOSE_NONE',             0);
define ('AI_CLOSE_TOP_RIGHT',        1);
define ('AI_CLOSE_TOP_LEFT',         2);
define ('AI_CLOSE_BOTTOM_RIGHT',     3);
define ('AI_CLOSE_BOTTOM_LEFT',      4);

define ('AI_TEXT_ENG_TOP_RIGHT',     'Top right');
define ('AI_TEXT_ENG_TOP_LEFT',      'Top left');
define ('AI_TEXT_ENG_BOTTOM_RIGHT',  'Bottom right');
define ('AI_TEXT_ENG_BOTTOM_LEFT',   'Bottom left');

define ('AI_CLIENT_SIDE_ACTION_SHOW',    0);
define ('AI_CLIENT_SIDE_ACTION_INSERT',  1);

define ('AI_TEXT_ENG_INSERT',  'Insert');

define ('AI_HTML_INSERTION_CLIENT_SIDE',            0);
define ('AI_HTML_INSERTION_CLIENT_SIDE_DOM_READY',  1); // Deprecated
define ('AI_HTML_INSERTION_SEREVR_SIDE',            2);

//define('AI_TEXT_ENG_CLIENT_SIDE_DOM_READY',         'Client-side when DOM ready');

define ('AI_HTML_PREPEND_CONTENT',                  1);
define ('AI_HTML_APPEND_CONTENT',                   2);
define ('AI_HTML_REPLACE_CONTENT',                  3);
define ('AI_HTML_REPLACE_ELEMENT',                  4);

define('AI_TEXT_ENG_PREPEND_CONTENT',               'Prepend content');
define('AI_TEXT_ENG_APPEND_CONTENT',                'Append content');
define('AI_TEXT_ENG_REPLACE_CONTENT',               'Replace content');
define('AI_TEXT_ENG_REPLACE_ELEMENT',               'Replace element');

// Counter names
define ('AI_BLOCK_COUNTER_NAME',                    'AI_BLOCK_COUNTER_');
define ('AI_PHP_FUNCTION_CALL_COUNTER_NAME',        'AI_PHP_FUNCTION_CALL_COUNTER_');
define ('AI_CONTENT_COUNTER_NAME',                  'AI_CONTENT_COUNTER');
define ('AI_EXCERPT_COUNTER_NAME',                  'AI_EXCERPT_COUNTER');
define ('AI_LOOP_BEFORE_COUNTER_NAME',              'AI_LOOP_START_COUNTER');
define ('AI_LOOP_AFTER_COUNTER_NAME',               'AI_LOOP_END_COUNTER');
define ('AI_WIDGET_COUNTER_NAME',                   'AI_WIDGET_COUNTER_');
define ('AI_POST_COUNTER_NAME',                     'AI_THE_POST_COUNTER');
define ('AI_COMMENT_COUNTER_NAME',                  'AI_COMMENT_COUNTER');
define ('AI_ADB_FALLBACK_DEPTH_NAME',               'AI_ADB_FALLBACK_DEPTH');
define ('AI_FALLBACK_DEPTH_NAME',                   'AI_FALLBACK_DEPTH');
define ('AI_LIMITS_FALLBACK_DEPTH_NAME',            'AI_LIMITS_FALLBACK_DEPTH');

//Settings
define ('AI_ENABLED',                '1');
define ('AI_DISABLED',               '0');

define ('AI_COOKIE_TIME', 3600);

define ('AI_TRANSIENT_RATING',                  'ai-rating');
define ('AI_TRANSIENT_RATING_EXPIRATION',       48 * 3600);

define ('AI_TRANSIENT_STATISTICS',              'ai-statistics');
define ('AI_TRANSIENT_STATISTICS_EXPIRATION',   20 * 60);

define ('AI_TRANSIENT_CFP_IP_ADDRESS',          'ai-cfp-');

define ('AI_TRANSIENT_ADSENSE_TOKEN_1',         'ai-adsense');
define ('AI_TRANSIENT_ADSENSE_TOKEN',           'ai-adsense-2');

define ('AI_TRANSIENT_ADSENSE_ADS',             'ai-adsense-ads');
define ('AI_TRANSIENT_ADSENSE_ADS_EXPIRATION',  24 * 3600);

define ('AI_TRANSIENT_ADB_CLASS_1',             'ai-adb-class-1');
define ('AI_TRANSIENT_ADB_CLASS_2',             'ai-adb-class-2');
define ('AI_TRANSIENT_ADB_CLASS_3',             'ai-adb-class-3');
define ('AI_TRANSIENT_ADB_CLASS_4',             'ai-adb-class-4');
define ('AI_TRANSIENT_ADB_CLASS_5',             'ai-adb-class-5');
define ('AI_TRANSIENT_ADB_CLASS_6',             'ai-adb-class-6');
define ('AI_TRANSIENT_ADB_CLASS_EXPIRATION',    48 * 3600);

define ('AI_TRANSIENT_SERVER_CHECK_EXPIRATION', 48 * 3600);

define ('AI_TRANSIENT_ADB_FILES_VERSION',       'ai-adb-version');
define ('AI_TRANSIENT_ADB_SEED',                'ai-adb-seed');

define ('AI_TRANSIENT_VERSION_CHECK',           'ai-version-check');
define ('AI_TRANSIENT_PHP_CHECK',               'ai-php-check');
define ('AI_TRANSIENT_WP_CHECK',                'ai-wp-check');

define ('AI_SYNTAX_HIGHLIGHTER_THEME',          'ad_inserter');
define ('DEFAULT_SYNTAX_HIGHLIGHTER_THEME',     AI_SYNTAX_HIGHLIGHTER_THEME);
define ('DEFAULT_BLOCK_CLASS_NAME',             'code-block');
define ('DEFAULT_BLOCK_CLASS',                  AI_ENABLED);
define ('DEFAULT_BLOCK_NUMBER_CLASS',           AI_ENABLED);
define ('DEFAULT_BLOCK_NAME_CLASS',             AI_DISABLED);
define ('DEFAULT_INLINE_STYLES',                AI_ENABLED);
define ('DEFAULT_MINIMUM_USER_ROLE',            'administrator');
define ('DEFAULT_STICKY_WIDGET_MODE',           AI_STICKY_WIDGET_MODE_CSS);
define ('DEFAULT_STICKY_WIDGET_MARGIN',         15);
define ('DEFAULT_LAZY_LOADING_OFFSET',          600);
define ('DEFAULT_CLICK_FRAUD_PROTECTION',       AI_DISABLED);
define ('DEFAULT_CFP_BLOCK_IP_ADDRESS',         AI_DISABLED);
define ('DEFAULT_CLICK_FRAUD_PROTECTION_TIME',  1);
define ('DEFAULT_GLOBAL_VISITOR_LIMIT_CPT',     '');
define ('DEFAULT_GLOBAL_VISITOR_LIMIT_TIME',    '');
define ('DEFAULT_MAX_PAGE_BLOCKS',              3);
define ('DEFAULT_PLUGIN_PRIORITY',              99999);
define ('DEFAULT_DYNAMIC_BLOCKS',               AI_DYNAMIC_BLOCKS_SERVER_SIDE);
define ('DEFAULT_PARAGRAPH_COUNTING_FUNCTIONS', AI_STANDARD_PARAGRAPH_COUNTING_FUNCTIONS);
define ('DEFAULT_NO_PARAGRAPH_COUNTING_INSIDE', 'blockquote, figure, li');
define ('DEFAULT_PARAGRAPH_TAGS',               'p');
define ('DEFAULT_FORCE_ADMIN_TOOLBAR',          AI_DISABLED);
define ('DEFAULT_ADMIN_TOOLBAR_DEBUGGING',      AI_ENABLED);
define ('DEFAULT_ADMIN_TOOLBAR_MOBILE',         AI_DISABLED);
define ('DEFAULT_REMOTE_DEBUGGING',             AI_DISABLED);
define ('DEFAULT_DISABLE_TRANSLATION',          AI_DISABLED);
define ('DEFAULT_BACKEND_JS_DEBUGGING',         AI_DISABLED);
define ('DEFAULT_FRONTEND_JS_DEBUGGING',        AI_DISABLED);
define ('DEFAULT_MULTISITE_SETTINGS_PAGE',      AI_ENABLED);
define ('DEFAULT_MULTISITE_WIDGETS',            AI_ENABLED);
define ('DEFAULT_MULTISITE_PHP_PROCESSING',     AI_DISABLED);
define ('DEFAULT_MULTISITE_EXCEPTIONS',         AI_ENABLED);
define ('DEFAULT_MULTISITE_MAIN_FOR_ALL_BLOGS', AI_DISABLED);
define ('DEFAULT_MULTISITE_SITE_ADMIN_PAGE',    AI_DISABLED);
define ('DEFAULT_TRACKING',                     AI_TRACKING_DISABLED);
define ('DEFAULT_INTERNAL_TRACKING',            AI_ENABLED);
define ('DEFAULT_EXTERNAL_TRACKING',            AI_DISABLED);
define ('DEFAULT_TRACKING_LOGGED_IN',           AI_TRACKING_ENABLED);
define ('DEFAULT_TRACK_PAGEVIEWS',              AI_TRACKING_DISABLED);
define ('DEFAULT_CLICK_DETECTION',              AI_CLICK_DETECTION_STANDARD);
define ('DEFAULT_ADB_BLOCK_ACTION',             AI_ADB_BLOCK_ACTION_DO_NOTHING);
define ('DEFAULT_ADB_DETECTION',                AI_ADB_DETECTION_ADVANCED);
define ('DEFAULT_CUSTOM_HOOK_PRIORITY',         10);
define ('DEFAULT_OUTPUT_BUFFERING',             AI_OUTPUT_BUFFERING_DISABLED);
define ('DEFAULT_DISABLE_CACHING',              AI_DISABLE_CACHING_ENABLED);
define ('DEFAULT_TAB_SETUP_DELAY',              100);
define ('DEFAULT_WAIT_FOR_JQUERY',              AI_WAIT_FOR_JQUERY_ENABLED);
define ('DEFAULT_GEO_DB',                       AI_GEO_DB_INTERNAL);
define ('DEFAULT_GEO_DB_UPDATES',               AI_DISABLED);
define ('DEFAULT_CLOSE_BUTTON',                 AI_CLOSE_NONE);
define ('DEFAULT_AUTO_CLOSE_TIME',              '');
define ('DEFAULT_BACKGROUND',                   AI_DISABLED);
define ('DEFAULT_STAY_CLOSED_TIME',             '');
define ('DEFAULT_SERVER_SIDE_INSERTION',        AI_AUTOMATIC_INSERTION_FOOTER);
define ('DEFAULT_HTML_ELEMENT_INSERTION',       AI_HTML_INSERTION_CLIENT_SIDE);
define ('DEFAULT_INSIDE_ELEMENT',               AI_HTML_PREPEND_CONTENT);
define ('DEFAULT_CLIENT_SIDE_ACTION',           AI_CLIENT_SIDE_ACTION_SHOW);
define ('DEFAULT_HORIZONTAL_POSITION',          AI_STICK_TO_THE_LEFT);
define ('DEFAULT_VERTICAL_POSITION',            AI_STICK_TO_THE_TOP);
define ('DEFAULT_HORIZONTAL_MARGIN',            '');
define ('DEFAULT_VERTICAL_MARGIN',              '');
define ('DEFAULT_MAIN_CONTENT_ELEMENT',         '');
define ('DEFAULT_ANIMATION',                    AI_ANIMATION_NONE);
define ('DEFAULT_ANIMATION_TRIGGER',            AI_TRIGGER_PAGE_LOADED);
define ('DEFAULT_ANIMATION_TRIGGER_VALUE',      '');
define ('DEFAULT_ANIMATION_TRIGGER_OFFSET',     '');
define ('DEFAULT_ANIMATION_TRIGGER_DELAY',      '');
define ('DEFAULT_ANIMATION_TRIGGER_ONCE',       AI_DISABLED);
define ('DEFAULT_AVOID_ACTION',                 AI_TRY_TO_SHIFT_POSITION);
define ('DEFAULT_AVOID_DIRECTION',              AI_BELOW_AND_THEN_ABOVE);
define ('DEFAULT_DIRECTION_TYPE',               AI_DIRECTION_FROM_TOP);
define ('DEFAULT_PARAGRAPH_TEXT_TYPE',          AI_DO_NOT_CONTAIN);
define ('DEFAULT_DISPLAY_FOR_USERS',            AI_DISPLAY_ALL_USERS);
define ('DEFAULT_DISPLAY_FOR_DEVICES',          AI_INSERT_FOR_DESKTOP_DEVICES);
define ('DEFAULT_GENERAL_TAG',                  '');
define ('DEFAULT_DISABLE_BLOCK_INSERTIONS',     AI_DISABLED);
define ('DEFAULT_DISABLE_PHP_PROCESSING',       AI_DISABLED);
define ('DEFAULT_DISABLE_HTML_CODE',            AI_DISABLED);
define ('DEFAULT_DISABLE_CSS_CODE',             AI_DISABLED);
define ('DEFAULT_DISABLE_JS_CODE',              AI_DISABLED);
define ('DEFAULT_DISABLE_FOOTER_CODE',          AI_DISABLED);
define ('DEFAULT_DISABLE_HEADER_CODE',          AI_DISABLED);
define ('DEFAULT_IFRAME_WIDTH',                 '');
define ('DEFAULT_IFRAME_HEIGHT',                '');
define ('DEFAULT_DELAY_TIME',                   '');
define ('DEFAULT_DELAY_SHOWING',                '');
define ('DEFAULT_SHOW_EVERY',                   '');
define ('DEFAULT_VISITOR_MAX_IMPRESSIONS',                   '');
define ('DEFAULT_VISITOR_LIMIT_IMPRESSIONS_PER_TIME_PERIOD', '');
define ('DEFAULT_VISITOR_LIMIT_IMPRESSIONS_TIME_PERIOD',     '');
define ('DEFAULT_MAX_IMPRESSIONS',                           '');
define ('DEFAULT_LIMIT_IMPRESSIONS_PER_TIME_PERIOD',         '');
define ('DEFAULT_LIMIT_IMPRESSIONS_TIME_PERIOD',             '');
define ('DEFAULT_VISITOR_MAX_CLICKS',                   '');
define ('DEFAULT_VISITOR_LIMIT_CLICKS_PER_TIME_PERIOD', '');
define ('DEFAULT_VISITOR_LIMIT_CLICKS_TIME_PERIOD',     '');
define ('DEFAULT_MAX_CLICKS',                           '');
define ('DEFAULT_LIMIT_CLICKS_PER_TIME_PERIOD',         '');
define ('DEFAULT_LIMIT_CLICKS_TIME_PERIOD',             '');
define ('DEFAULT_TRIGGER_CLICK_FRAUD_PROTECTION', AI_DISABLED);
define ('DEFAULT_COUNT_INSIDE',                 AI_DO_NOT_COUNT);
define ('DEFAULT_COUNT_INSIDE_ELEMENTS_CONTAIN', AI_CONTAIN);
define ('DEFAULT_WEEKDAYS',                     '0,1,2,3,4,5,6');
define ('DEFAULT_EXTERNAL_TRACKING_CATEGORY',   'Ad Inserter Pro');
define ('DEFAULT_EXTERNAL_TRACKING_ACTION',     '[EVENT]');
define ('DEFAULT_EXTERNAL_TRACKING_LABEL',      '[BLOCK_NUMBER] - [BLOCK_VERSION_NAME]');
define ('DEFAULT_MAXMIND_LICENSE_KEY',          '');
define ('DEFAULT_BACKGROUND_REPEAT',            AI_BACKGROUND_REPEAT_DEFAULT);
define ('DEFAULT_BACKGROUND_SIZE',              AI_BACKGROUND_SIZE_DEFAULT);
define ('DEFAULT_SET_BODY_BACKGROUND',          AI_DISABLED);
define ('DEFAULT_REMOTE_MANAGEMENT',            AI_DISABLED);
define ('DEFAULT_MANAGEMENT_IP_CHECK',          AI_DISABLED);

define ('AI_ADBLOCKING_DETECTION',              true);
define ('AI_NORMAL_HEADER_STYLES',              true);
define ('AI_AMP_HEADER_STYLES',                 true);
define ('AI_CODE_GENERATOR',                    true);
define ('AI_BUFFERING',                         true);
if (version_compare (phpversion (), "5.6", ">=")) {
  define ('AI_ADSENSE_API',                       true);
}
define ('AI_ADSENSE_OVERLAY',                   true);
define ('AI_STICKY_SETTINGS',                   true);
define ('AI_PLUGIN_TRACKING',                   true);
define ('AI_BLOCKS_IN_IFRAMES',                 true);
define ('AI_ADB_1_NAME',                        'dqwpediwqswqma');
define ('AI_ADB_2_DEFAULT_NAME',                'lfoswyekaaslsd');
define ('AI_ADB_CONTENT_CSS_BEGIN',             'ai-adb-content-begin');
define ('AI_ADB_CONTENT_CSS_END',               'ai-adb-content-end');
define ('AI_ADB_CONTENT_DELETE_BEGIN',          'ai-adb-delete-begin');
define ('AI_ADB_CONTENT_DELETE_END',            'ai-adb-delete-end');
define ('AI_ADB_CONTENT_REPLACE_BEGIN',         'ai-adb-replace-begin');
define ('AI_ADB_CONTENT_REPLACE_END',           'ai-adb-replace-end');
define ('AI_BASIC_ADB_OVERLAY_CSS',             "position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 99998; user-select: none; cursor: pointer;");
define ('AI_DEFAULT_ADB_OVERLAY_CSS',           "background: #000; opacity: 0.85;");
define ('AI_BASIC_ADB_MESSAGE_CSS',             "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 99999999; background: #000; color: #fff; user-select: none; cursor: pointer; text-decoration: none;");
define ('AI_DEFAULT_ADB_MESSAGE_CSS',           "width: 300px; padding: 10px; border: 5px solid #f00; border-radius: 5px;");
//define ('AI_DEFAULT_ADB_MESSAGE',               "<p><strong>Blocked because of Ad Blocker</strong></p>\n<p>It seems that you are using some ad blocking software which is preventing the page from fully loading. Please whitelist this website or disable ad blocking software.</p>");
define ('AI_DEFAULT_ADB_DEVICES',               AI_INSERT_FOR_ALL_DEVICES);
define ('AI_DEFAULT_ADB_ACTION',                AI_ADB_ACTION_NONE);
define ('AI_DEFAULT_ADB_NO_ACTION',             AI_ADB_NO_ACTION_NONE);
define ('AI_DEFAULT_ADB_NO_ACTION_PERIOD',      30);
define ('AI_DEFAULT_ADB_REDIRECTION_PAGE',      0);
define ('AI_DEFAULT_ADB_EXTERNAL_SCRIPTS',      AI_ENABLED);
define ('AI_DEFAULT_ADB_UNDISMISSIBLE_MESSAGE', AI_DISABLED);
define ('AI_DEFAULT_ADB_NO_UNDISMISSIBLE_MESSAGE', AI_ADB_NO_ACTION_NONE);
define ('AI_ADB_VERSION_MASK',                  0x7F);
define ('AI_ADB_FLAG_BLOCKED',                  0x80);
define ('AI_LIST_EXCEPTIONS_LIMIT',             100);

define ('DEFAULT_VIEWPORT_WIDTH_1', 980);
define ('DEFAULT_VIEWPORT_WIDTH_2', 768);
define ('DEFAULT_VIEWPORT_WIDTH_3', 0);

//define ('DEFAULT_COUNTRY_GROUP_NAME', "Group");

define ('AI_MARKER_START',              '%##');
define ('AI_MARKER_END',                '##%');
define ('AI_CONTENT_MARKER',            'AI CONTENT END');

define ('CONTENT_HOOK_BLOCKS',          'content_hook');
define ('EXCERPT_HOOK_BLOCKS',          'excerpt_hook');
define ('LOOP_START_HOOK_BLOCKS',       'loop_start_hook');
define ('LOOP_END_HOOK_BLOCKS',         'loop_end_hook');
define ('POST_HOOK_BLOCKS',             'the_post_hook');
define ('BEFORE_COMMENTS_HOOK_BLOCKS',  'before_comments_hook');
define ('BETWEEN_COMMENTS_HOOK_BLOCKS', 'between_comments_hook');
define ('AFTER_COMMENTS_HOOK_BLOCKS',   'after_comments_hook');
define ('FOOTER_HOOK_BLOCKS',           'wp_footer_hook');
define ('ABOVE_HEADER_HOOK_BLOCKS',     'above_header_hook');
define ('HTML_ELEMENT_HOOK_BLOCKS',     'html_element_hook');
define ('CUSTOM_HOOK_BLOCKS',           '_hook');
define ('AI_EXTRACT_USED_BLOCKS',       'used_blocks');
define ('AI_EXTRACT_FEATURES',          'features');

define ('AI_CHECK_NONE',                  - 1);
define ('AI_CHECK_INSERTED',              0);

define ('AI_CHECK_PAGE_TYPE_FRONT_PAGE',  1);
define ('AI_CHECK_PAGE_TYPE_STATIC_PAGE', 2);
define ('AI_CHECK_PAGE_TYPE_POST',        3);
define ('AI_CHECK_PAGE_TYPE_CATEGORY',    4);
define ('AI_CHECK_PAGE_TYPE_SEARCH',      5);
define ('AI_CHECK_PAGE_TYPE_ARCHIVE',     6);
define ('AI_CHECK_PAGE_TYPE_FEED',        7);
define ('AI_CHECK_PAGE_TYPE_404',         8);

define ('AI_CHECK_DESKTOP_DEVICES',       9);
define ('AI_CHECK_MOBILE_DEVICES',        10);
define ('AI_CHECK_TABLET_DEVICES',        11);
define ('AI_CHECK_PHONE_DEVICES',         12);
define ('AI_CHECK_DESKTOP_TABLET_DEVICES',13);
define ('AI_CHECK_DESKTOP_PHONE_DEVICES', 14);

define ('AI_CHECK_CATEGORY',              15);
define ('AI_CHECK_TAG',                   16);
define ('AI_CHECK_URL',                   17);
define ('AI_CHECK_REFERER',               18);
define ('AI_CHECK_SCHEDULING',            19);
define ('AI_CHECK_CODE',                  20);
define ('AI_CHECK_LOGGED_IN_USER',        21);
define ('AI_CHECK_NOT_LOGGED_IN_USER',    22);
define ('AI_CHECK_ADMINISTRATOR',         23);

define ('AI_CHECK_INDIVIDUALLY_DISABLED', 24);
define ('AI_CHECK_INDIVIDUALLY_ENABLED',  25);
define ('AI_CHECK_DISABLED_MANUALLY',     26);
define ('AI_CHECK_MAX_INSERTIONS',        27);
define ('AI_CHECK_FILTER',                28);
define ('AI_CHECK_PARAGRAPH_COUNTING',    29);
define ('AI_CHECK_ENABLED_PHP',           30);
define ('AI_CHECK_ENABLED_SHORTCODE',     31);
define ('AI_CHECK_PARAGRAPHS_MIN_NUMBER', 32);
define ('AI_CHECK_MAX_PAGE_BLOCKS',       33);

define ('AI_CHECK_PARAGRAPH_TAGS',        34);
define ('AI_CHECK_PARAGRAPHS_WITH_TAGS',  35);
define ('AI_CHECK_PARAGRAPHS_AFTER_NO_COUNTING_INSIDE',  36);
define ('AI_CHECK_PARAGRAPHS_AFTER_MIN_MAX_WORDS', 37);
define ('AI_CHECK_PARAGRAPHS_AFTER_TEXT', 38);
define ('AI_CHECK_PARAGRAPHS_AFTER_CLEARANCE',     39);
define ('AI_CHECK_ID',                    40);
define ('AI_CHECK_URL_PARAMETER',         41);
define ('AI_CHECK_DO_NOT_INSERT',         42);
define ('AI_CHECK_AD_ABOVE',              43);
define ('AI_CHECK_AD_BELOW',              44);
define ('AI_CHECK_SHORTCODE_ATTRIBUTES',  45);
define ('AI_CHECK_COUNTRY',               46);
define ('AI_CHECK_IP_ADDRESS',            47);
define ('AI_CHECK_PARAGRAPH_NUMBER',      48);
define ('AI_CHECK_MIN_NUMBER_OF_WORDS',   49);
define ('AI_CHECK_MAX_NUMBER_OF_WORDS',   50);
define ('AI_CHECK_TAXONOMY',              51);
define ('AI_CHECK_ENABLED_WIDGET',        52);
define ('AI_CHECK_INSERTION_NOT_DISABLED', 53);
define ('AI_CHECK_IMAGE_COUNTING',        54);
define ('AI_CHECK_NO_PARAGRAPHS',         55);
define ('AI_CHECK_DEBUG_NO_INSERTION',    56);
define ('AI_CHECK_MAX_IMPRESSIONS' ,      57);
define ('AI_CHECK_LIMIT_IMPRESSIONS_PER_TIME_PERIOD', 58);
define ('AI_CHECK_MAX_CLICKS',            59);
define ('AI_CHECK_LIMIT_CLICKS_PER_TIME_PERIOD', 60);
define ('AI_CHECK_PARAGRAPHS_AFTER_NO_COUNTING_INSIDE_ELEMENTS',  61);
define ('AI_CHECK_PARAGRAPHS_MAX_NUMBER', 62);
define ('AI_CHECK_CLIENT',                63);
define ('AI_CUSTOM_FILTER_CHECK',         64);
define ('AI_CHECK_CFP_IP_ADDRESS',        65);
define ('AI_CHECK_COOKIE',                66);


define ('AI_PT_NONE',                   - 1);
define ('AI_PT_ANY',                      0);
define ('AI_PT_STATIC',                   1);
define ('AI_PT_POST',                     2);
define ('AI_PT_HOMEPAGE',                 3);
define ('AI_PT_CATEGORY',                 4);
define ('AI_PT_ARCHIVE',                  5);
define ('AI_PT_SEARCH',                   6);
define ('AI_PT_404',                      7);
define ('AI_PT_FEED',                     8);
define ('AI_PT_ADMIN',                    9);
define ('AI_PT_AJAX',                    10);

define ('AI_USER_NOT_LOGGED_IN',          0);
define ('AI_USER_LOGGED_IN',              1);
define ('AI_USER_ADMINISTRATOR',          2);

define ('AI_WP_DEBUGGING',                0); // AI_WP_DEBUGGING_
define ('AI_WP_PAGE_TYPE',                1);
define ('AI_WP_USER_SET',                 2);
define ('AI_WP_USER',                     3);
define ('AI_WP_DEBUG_BLOCK',              4);
define ('AI_WP_URL',                      5);
define ('AI_SERVER_SIDE_DETECTION',       6);
define ('AI_CLIENT_SIDE_DETECTION',       7);
define ('AI_CONTEXT',                     8);
define ('AI_TRACKING',                    9);
define ('AI_STICKY_WIDGETS',             10);
define ('AI_NUMBER_OF_COMMENTS',         11);
define ('AI_COMMENTS_SAVED_CALLBACK',    12);
define ('AI_COMMENTS_SAVED_END_CALLBACK',13);
define ('AI_ADB_DETECTION',              14);
define ('AI_BACKEND_JS_DEBUGGING',       15);
define ('AI_FRONTEND_JS_DEBUGGING',      16);
define ('AI_WP_AMP_PAGE',                17);
define ('AI_INSTALL_TIME_DIFFERENCE',    18);
define ('AI_DAYS_SINCE_INSTAL',          19);
define ('AI_TAGS',                       20);
define ('AI_VIEWPORT_WIDTHS',            21);
define ('AI_WORD_COUNT',                 22);
define ('AI_ADB_SHORTCODE_ACTION',       23);
define ('AI_SHORTCODES',                 24);
define ('AI_VIEWPORT_NAMES',             25);
define ('AI_CLOSE_BUTTONS',              26);
define ('AI_DISABLE_CACHING',            27);
define ('AI_COUNT_SHUFFLE',              28);
define ('AI_CLIENT_SIDE_INSERTION',      29);
define ('AI_USER_AGENT',                 30);
define ('AI_STICK_TO_THE_CONTENT',       31);
define ('AI_DEBUG_MENU_ITEMS',           32);
define ('AI_ANIMATION',                  33);
define ('AI_TRIGGER_ELEMENTS',           34);
define ('AI_CLIENT_SIDE_ROTATION',       35);
define ('AI_CLIENT_SIDE_CSS',            36);
define ('AI_LAZY_LOADING',               37);
define ('AI_PAGE_BLOCKS',                38);
define ('AI_GEOLOCATION',                39);
define ('AI_HTML_ELEMENT_SELECTION',     40);
define ('AI_DISABLE_TRANSLATION',        41);
define ('AI_MBSTRING_LOADED',            42);
define ('AI_PROCESSING_TIME',            43);
define ('AI_FORCE_SERVERSIDE_CODE',      44);
define ('AI_CODE_FOR_IFRAME',            45);
define ('AI_IFRAMES',                    46);
define ('AI_HEAD_CODES',                 47);
define ('AI_HEAD_GROUPS',                48);
define ('AI_CURRENT_BLOCK_NUMBER',       50);
define ('AI_ACTIVE_GROUP_NAMES',         51);
define ('AI_ADB_SHORTCODE_DISABLED',     52);
define ('AI_CHECK_BLOCK',                53);
define ('AI_CUSTOM_FIELDS',              54);
define ('AI_AGENT',                      55);
define ('AI_CLIENTS',                    56);
define ('AI_MOBILE_DETECT_JS',           57);
define ('AI_POST_POSITION',              58);
define ('AI_TRACKING_SHORTCODE_DISABLED',59);
define ('AI_FOOTER_JS_CODE_DOM_READY',   60);
define ('AI_FOOTER_INLINE_SCRIPTS',      61);
define ('AI_NESTING_LEVEL',              62);
define ('AI_W3TC_DEBUGGING',             63);
define ('AI_BLOCK_PHP_CODE_CACHING',     64);
define ('AI_FALLBACK_LEVEL',             65);
define ('AI_HEAD',                       66);
define ('AI_DISABLED_BLOCKS',            67);
define ('AI_BODY_STYLE',                 68);
define ('AI_COUNT_REPEAT',               69);
define ('AI_VIEWPORT_INDEXES',           70);
define ('AI_ROTATION_SEED',              71);
define ('AI_AMP_CSS',                    72);
define ('AI_DYNAMIC_BLOCKS',             73);
define ('AI_IP_TO_COUNTRY',              74);  // Used in Ip2Country.php
define ('AI_CLIENT_SIDE_FILTER_CHECKS',  75);
define ('AI_LIMITS_FALLBACK_LEVEL',      76);
define ('AI_PARALLAX',                   77);
define ('AI_PHP_PROCESSING',             78);
define ('AI_UNFILTERED_HTML',            79);

define ('AI_CONTEXT_NONE',                0);
define ('AI_CONTEXT_CONTENT',             1);
define ('AI_CONTEXT_EXCERPT',             2);
define ('AI_CONTEXT_BEFORE_POST',         3);
define ('AI_CONTEXT_AFTER_POST',          4);
define ('AI_CONTEXT_WIDGET',              5);
define ('AI_CONTEXT_PHP_FUNCTION',        6);
define ('AI_CONTEXT_SHORTCODE',           7);
define ('AI_CONTEXT_HTTP_HEADER',         8);
define ('AI_CONTEXT_HEADER',              9);
define ('AI_CONTEXT_FOOTER',             10);
define ('AI_CONTEXT_BETWEEN_POSTS',      11);
define ('AI_CONTEXT_BEFORE_COMMENTS',    12);
define ('AI_CONTEXT_BETWEEN_COMMENTS',   13);
define ('AI_CONTEXT_AFTER_COMMENTS',     14);
define ('AI_CONTEXT_CUSTOM_HOOK',        100);

define ('AI_URL_DEBUG',                      'ai-debug');               // AI_URL_DEBUG_
define ('AI_URL_DEBUG_PROCESSING',           'ai-debug-processing');    // AI_URL_DEBUG_PROCESSING_
define ('AI_URL_DEBUG_PROCESSING_FE',        'ai-debug-processing-fe'); // AI_URL_DEBUG_PROCESSING_FE_
define ('AI_URL_DEBUG_PHP',                  'ai-debug-php');           // AI_URL_DEBUG_PHP
define ('AI_URL_DEBUG_BLOCKS',               'ai-debug-blocks');
define ('AI_URL_DEBUG_CODE',                 'ai-debug-code');
define ('AI_URL_DEBUG_USER',                 'ai-debug-user');
define ('AI_URL_DEBUG_TAGS',                 'ai-debug-tags');
define ('AI_URL_DEBUG_POSITIONS',            'ai-debug-positions');
define ('AI_URL_DEBUG_NO_INSERTION',         'ai-debug-no-insertion');
define ('AI_URL_DEBUG_COUNTRY',              'ai-debug-country');
define ('AI_URL_DEBUG_IP_ADDRESS',           'ai-debug-ip-address');
define ('AI_URL_DEBUG_AD_BLOCKING' ,         'ai-debug-adb');
define ('AI_URL_DEBUG_AD_BLOCKING_STATUS',   'ai-debug-adb-status');
define ('AI_URL_DEBUG_JAVASCRIPT',           'ai-debug-js');
define ('AI_URL_DEBUG_META',                 'ai-debug-meta');
define ('AI_URL_DEBUG_TRANSLATION',          'ai-debug-translation');
define ('AI_URL_DEBUG_TRACKING',             'ai-debug-tracking');

define ('AI_URL_DEBUG_DISABLE_HTML_CODE',        'ai-debug-disable-html-code');
define ('AI_URL_DEBUG_DISABLE_CSS_CODE',         'ai-debug-disable-css-code');
define ('AI_URL_DEBUG_DISABLE_JS_CODE',          'ai-debug-disable-js-code');
define ('AI_URL_DEBUG_DISABLE_PHP_PROCESSING',   'ai-debug-disable-php-processing');
define ('AI_URL_DEBUG_DISABLE_BLOCK_INSERTIONS', 'ai-debug-disable-block-insertions');
define ('AI_URL_DEBUG_DISABLE_HEADER_CODE',      'ai-debug-disable-header-code');
define ('AI_URL_DEBUG_DISABLE_FOOTER_CODE',      'ai-debug-disable-footer-code');

define ('AI_DEBUG_PROCESSING',            0x01); // AI_DEBUG_PROCESSING_
define ('AI_DEBUG_BLOCKS',                0x02);
define ('AI_DEBUG_TAGS',                  0x04);
define ('AI_DEBUG_POSITIONS',             0x08);
define ('AI_DEBUG_NO_INSERTION',          0x10);
define ('AI_DEBUG_AD_BLOCKING',           0x20);
define ('AI_DEBUG_AD_BLOCKING_STATUS',    0x40);

if (defined ('AI_ADSENSE_API_IDS')) {
  if (!defined ('AI_CI_STRING')) {
    define ('AI_CI_STRING',                    'MzUwNTk3MTU2NDMwLWJzdWU1ODdmbzFjdTU4NDk1Z3B2amoxaHBnYWJ1OGpsLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29t');
    define ('AI_CS_STRING',                    'eFMwZ2I1bzNWVmtRZ29RRGpEOVl6Yk96');
  }
}

define ('AI_DEBUG_WIDGET_STYLE',         'margin: 0; padding: 0 5px; font-size: 10px; white-space: pre; overflow-x: auto; overflow-y: hidden;');

define ('AI_DEBUG_TAGS_CLASS',           'ai-debug-tags');
define ('AI_DEBUG_POSITIONS_CLASS',      'ai-debug-positions');
define ('AI_DEBUG_PAGE_TYPE_CLASS',      'ai-debug-page-type');
define ('AI_DEBUG_STATUS_CLASS',         'ai-debug-status');
define ('AI_DEBUG_ADB_CLASS',            'ai-debug-adb');
define ('AI_ADSENSE_BLOCK_CLASS',        'ai-adsense-');

define ('AI_POST_POSITION_BEFORE_POST',  0);
define ('AI_POST_POSITION_IN_POST',      1);
define ('AI_POST_POSITION_AFTER_POST',   2);

define ('AI_CODE_UNKNOWN',               100);
define ('AI_CODE_BANNER',                0);
define ('AI_CODE_ADSENSE',               1);
define ('AI_CODE_AMAZON',                2);

define ('AI_ADSENSE_STANDARD',           0);
define ('AI_ADSENSE_LINK',               1);
define ('AI_ADSENSE_IN_ARTICLE',         2);
define ('AI_ADSENSE_IN_FEED',            3);
define ('AI_ADSENSE_MATCHED_CONTENT',    4);
define ('AI_ADSENSE_AUTO',               5);
define ('AI_ADSENSE_AMP_ONLY',           6);

define ('AI_ADSENSE_AMP_DISABLED',       0);
define ('AI_ADSENSE_AMP_ABOVE_THE_FOLD', 1);
define ('AI_ADSENSE_AMP_BELOW_THE_FOLD', 2);
define ('AI_ADSENSE_AMP_STICKY',         3);
define ('AI_ADSENSE_AMP_AUTO',           4);
define ('AI_ADSENSE_AMP_FIXED',          5);

define ('AI_ADSENSE_SIZE_FIXED',              0);
define ('AI_ADSENSE_SIZE_RESPONSIVE',         1);
define ('AI_ADSENSE_SIZE_FIXED_BY_VIEWPORT',  2);

define ('AI_AMAZON_AUTO',                0);
define ('AI_AMAZON_SEARCH',              1);
define ('AI_AMAZON_MANUAL',              2);

define ('AI_AMAZON_AMP_DISABLED',        0);
define ('AI_AMAZON_AMP_ENABLED',         1);

define ('AI_TEXT_ENG_LINK',                 'Link');
define ('AI_TEXT_ENG_IN_ARTICLE',           'In-article');
define ('AI_TEXT_ENG_IN_FEED',              'In-feed');
define ('AI_TEXT_ENG_MATCHED_CONTENT',      'Matched content');
define ('AI_TEXT_ENG_ADSENSE_AUTO',         'Auto');

define ('AI_TEXT_ENG_ABOVE_THE_FOLD',       'Above the fold');
define ('AI_TEXT_ENG_BELOW_THE_FOLD',       'Below the fold');

define ('AI_TEXT_ENG_FIXED',                'Fixed');
define ('AI_TEXT_ENG_RESPONSIVE',           'Responsive');
define ('AI_TEXT_ENG_FIXED_BY_VIEWPORT',    'Fixed by viewport');

