<?php
/*
  Plugin Name: CyberSEO Lite (CyberSyn)
  Version: 6.17
  Author: CyberSEO.net
  Author URI: http://www.cyberseo.net/
  Plugin URI: http://www.cyberseo.net/cybersyn/
  Description: CyberSEO Lite is a simplified version of CyberSEO Pro - the most advanced but easy-to-use auto-blogging and content curation plugin for WordPress.
 */

if (!function_exists("get_option") || !function_exists("add_filter")) {
    die();
}

define('CSYN_MAX_CURL_REDIRECTS', 10);
define('CSYN_MAX_DONLOAD_ATTEMPTS', 10);
define('CSYN_FEED_OPTIONS', 'cxxx_feed_options');
define('CSYN_SYNDICATED_FEEDS', 'cxxx_syndicated_feeds');
define('CSYN_RSS_PULL_MODE', 'cxxx_rss_pull_mode');
define('CSYN_CRON_MAGIC', 'cxxx_cron_magic');
define('CSYN_PSEUDO_CRON_INTERVAL', 'cxxx_pseudo_cron_interval');
define('CSYN_DISABLE_DUPLICATION_CONTROL', 'cxxx_disable_feed_duplication_control');
define('CSYN_ENABLE_DEBUG_MODE', 'cxxx_enable_debug_mode');
define('CSYN_LINK_TO_SOURCE', 'cxxx_link_to_source');
define('CSYN_CANONICAL_LINK', 'cxxx_canonical_link');
define('CSYN_FULL_TEXT_EXTRACTOR', 'cxxx_full_text_extractor');
define('CSYN_YANDEX_TRANSLATE_LANGS', 'cxxx_yandex_translate_langs');
define('CSYN_GOOGLE_TRANSLATE_LANGS', 'cxxx_google_translate_langs');

if (get_option(CSYN_ENABLE_DEBUG_MODE) == 'on') {
    error_reporting(-1);
    ini_set('display_errors', 'On');
}

@include(DIRNAME(__FILE__) . "/spinners.php");

function csyn_mk_post_data($data) {
    $result = '';
    foreach ($data as $key => $value) {
        $result .= $key . "=" . urlencode($value) . "&";
    }
    return $result;
}

function csyn_curl_post($url, $data, &$info) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_REFERER, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, csyn_mk_post_data($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    $result = trim(curl_exec($ch));
    $info = curl_getinfo($ch);
    curl_close($ch);
    return $result;
}

function csyn_short_str($url, $max = 0) {
    $length = strlen($url);
    if ($max > 1 && $length > $max) {
        $ninety = $max * 0.9;
        $length = $length - $ninety;
        $first = substr($url, 0, -$length);
        $last = substr($url, $ninety - $max);
        $url = $first . "&#8230;" . $last;
    }
    return $url;
}

function csyn_sanitize_checkbox($value) {
    if ($value == 'on') {
        return $value;
    }
    return '';
}

function csyn_REQUEST_URI() {
    return strtok($_SERVER['REQUEST_URI'], "?") . "?" . strtok("?");
}

function csyn_fix_white_spaces($str) {
    return preg_replace('/\s\s+/', ' ', preg_replace('/\s\"/', ' "', preg_replace('/\s\'/', ' \'', $str)));
}

function csyn_delete_post_images($post_id) {
    $post = get_post($post_id, ARRAY_A);
    $wp_upload_dir = wp_upload_dir();

    preg_match_all('/<img(.+?)src=[\'\"](.+?)[\'\"](.*?)>/is', $post['post_content'] . $post['post_excerpt'], $matches);
    $image_urls = $matches[2];

    preg_match_all('/<img(.+?)srcset=[\'\"](.+?)[\'\"](.*?)>/is', $post['post_content'] . $post['post_excerpt'], $matches);
    foreach ($matches[2] as $scrset) {
        $srcset_images = explode(',', $scrset);
        foreach ($srcset_images as $image) {
            if (strpos($image, ' ') !== false) {
                $image = substr($image, 0, strrpos($image, ' '));
            }
            $image_urls[] = trim($image);
        }
    }

    $image_urls = array_values(array_unique($image_urls));

    if (count($image_urls)) {
        $image_urls = array_unique($image_urls);
        foreach ($image_urls as $url) {
            preg_match("/\/wp-content\/(.*?)$/", $url, $link_match);
            preg_match("/.*?\/wp-content\//", $wp_upload_dir['path'], $path_match);
            if (isset($path_match[0]) && isset($link_match[1])) {
                @unlink($path_match[0] . $link_match[1]);
            } else {
                @unlink(str_replace($wp_upload_dir['url'], $wp_upload_dir['path'], $url));
            }
        }
    }
}

function csyn_addslash($url) {
    if ($url[strlen($url) - 1] !== "/") {
        $url .= "/";
    }
    return $url;
}

function csyn_file_get_contents($url, $as_array = false, $useragent = '') {
    global $csyn_last_effective_url;
    if (@parse_url($url, PHP_URL_SCHEME) != "" && function_exists('curl_init')) {
        $max_redirects = CSYN_MAX_CURL_REDIRECTS;
        $ch = curl_init();
        if ($useragent != '') {
            curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
        }
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_REFERER, $url);
        curl_setopt($ch, CURLOPT_ENCODING, 'gzip,deflate');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        if (ini_get('open_basedir') == '' && (ini_get('safe_mode' == 'Off') || !ini_get('safe_mode'))) {
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_MAXREDIRS, $max_redirects);
        } else {
            $base_url = $url;
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
            $rch = curl_copy_handle($ch);
            curl_setopt($rch, CURLOPT_HEADER, true);
            curl_setopt($rch, CURLOPT_NOBODY, true);
            curl_setopt($rch, CURLOPT_FORBID_REUSE, false);
            curl_setopt($rch, CURLOPT_RETURNTRANSFER, true);
            do {
                curl_setopt($rch, CURLOPT_URL, $url);
                curl_setopt($rch, CURLOPT_REFERER, $url);
                $header = curl_exec($rch);
                if (curl_errno($rch)) {
                    $code = 0;
                } else {
                    $code = curl_getinfo($rch, CURLINFO_HTTP_CODE);
                    if ($code == 301 || $code == 302) {
                        preg_match('/Location:(.*?)\n/', $header, $matches);
                        $url = trim(array_pop($matches));
                        if (strlen($url) && substr($url, 0, 1) == '/') {
                            $url = $base_url . $url;
                        }
                    } else {
                        $code = 0;
                    }
                }
            } while ($code && --$max_redirects);
            curl_close($rch);
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_REFERER, $url);
        }
        $attempts = 0;
        $code = 206;
        while ($code == 206 && $attempts++ < CSYN_MAX_DONLOAD_ATTEMPTS) {
            curl_setopt($ch, CURLOPT_HEADER, false);
            $content = curl_exec($ch);
            $csyn_last_effective_url = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
            $c_length = curl_getinfo($ch, CURLINFO_CONTENT_LENGTH_DOWNLOAD);
            $c_download = curl_getinfo($ch, CURLINFO_SIZE_DOWNLOAD);
            if ($c_length > $c_download) {
                $code = 206;
            } else {
                $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            }
        }
        curl_close($ch);

        if ($code != 200 || $c_length > $c_download) {
            $content = false;
        } elseif ($as_array) {
            $content = @explode("\n", trim($content));
        }
    }
    if (!isset($content) || $content === false) {
        if ($as_array) {
            $content = @file($url, FILE_IGNORE_NEW_LINES);
        } else {
            $content = @file_get_contents($url);
        }
        $csyn_last_effective_url = $url;
    }
    return $content;
}

function csyn_update_options(&$options) {
    $defaults = array('interval' => 1440,
        'max_items' => 1,
        'post_status' => 'publish',
        'comment_status' => 'open',
        'ping_status' => 'closed',
        'post_author' => 1,
        'synonymizer_mode' => 0,
        'base_date' => 'post',
        'duplicate_check_method' => 'guid_and_title',
        'undefined_category' => 'use_default',
        'create_tags' => '',
        'post_tags' => '',
        'post_category' => array(),
        'date_min' => 0,
        'date_max' => 0,
        'insert_media_attachments' => 'no',
        'set_thumbnail' => 'no_thumb',
        'convert_encoding' => '',
        'require_thumbnail' => '',
        'store_images' => '',
        'post_footer' => '',
        'extract_full_articles' => '',
        'wpml_language' => '',
        'include_post_footers' => '',
        'shorten_excerpts' => '',
        'embed_videos' => '',
        'translator' => 'none',
        'yandex_translation_dir' => '',
        'yandex_api_key' => '',
        'google_translation_source' => '',
        'google_translation_target' => '',
        'google_api_key' => '');

    $result = 0;

    foreach ($defaults as $key => $value) {
        if (!isset($options[$key])) {
            $options[$key] = $value;
            $result = 1;
        }
    }

    return $result;
}

function csyn_preset_options() {

    $default_url = get_option(CSYN_FULL_TEXT_EXTRACTOR);

    if ($default_url === false || trim($default_url) == "") {
        if (file_exists('../fivefilters-full-text-rss/makefulltextfeed.php')) {
            $default_url = get_site_url() . '/fivefilters-full-text-rss/makefulltextfeed.php';
        } elseif (file_exists('../wp-content/fivefilters-full-text-rss/makefulltextfeed.php')) {
            $default_url = get_site_url() . '/wp-content/fivefilters-full-text-rss/makefulltextfeed.php';
        } elseif (file_exists('../wp-content/plugins/fivefilters-full-text-rss/makefulltextfeed.php')) {
            $default_url = get_site_url() . '/wp-content/plugins/fivefilters-full-text-rss/makefulltextfeed.php';
        } elseif (file_exists('../wp-content/plugins/cybersyn/fivefilters-full-text-rss/makefulltextfeed.php')) {
            $default_url = get_site_url() . '/wp-content/plugins/cybersyn/fivefilters-full-text-rss/makefulltextfeed.php';
        }
        update_option(CSYN_FULL_TEXT_EXTRACTOR, $default_url);
    }

    if (get_option(CSYN_ENABLE_DEBUG_MODE) === false) {
        update_option(CSYN_ENABLE_DEBUG_MODE, '');
    }

    if (get_option(CSYN_SYNDICATED_FEEDS) === false) {
        update_option(CSYN_SYNDICATED_FEEDS, array());
    }

    if (get_option(CSYN_CRON_MAGIC) === false) {
        update_option(CSYN_CRON_MAGIC, md5(time()));
    }

    if (get_option(CSYN_RSS_PULL_MODE) === false) {
        update_option(CSYN_RSS_PULL_MODE, 'auto');
    }

    if (get_option(CSYN_PSEUDO_CRON_INTERVAL) === false) {
        update_option(CSYN_PSEUDO_CRON_INTERVAL, '10');
    }

    if (get_option(CSYN_CANONICAL_LINK) === false) {
        update_option(CSYN_CANONICAL_LINK, 'auto');
    }

    if (get_option(CSYN_LINK_TO_SOURCE) === false) {
        update_option(CSYN_LINK_TO_SOURCE, 'auto');
    }

    if (get_option(CSYN_YANDEX_TRANSLATE_LANGS) === false) {
        $langs = array('az-ru' => 'Azerbaijani-Russian',
            'be-bg' => 'Belarusian-Bulgarian',
            'be-cs' => 'Belarusian-Czech',
            'be-de' => 'Belarusian-German',
            'be-en' => 'Belarusian-English',
            'be-es' => 'Belarusian-Spanish',
            'be-fr' => 'Belarusian-French',
            'be-it' => 'Belarusian-Italian',
            'be-pl' => 'Belarusian-Polish',
            'be-ro' => 'Belarusian-Romanian',
            'be-ru' => 'Belarusian-Russian',
            'be-sr' => 'Belarusian-Serbian',
            'be-tr' => 'Belarusian-Turkish',
            'bg-be' => 'Bulgarian-Belarusian',
            'bg-ru' => 'Bulgarian-Russian',
            'bg-uk' => 'Bulgarian-Ukrainian',
            'ca-en' => 'Catalan-English',
            'ca-ru' => 'Catalan-Russian',
            'cs-be' => 'Czech-Belarusian',
            'cs-en' => 'Czech-English',
            'cs-ru' => 'Czech-Russian',
            'cs-uk' => 'Czech-Ukrainian',
            'da-en' => 'Danish-English',
            'da-ru' => 'Danish-Russian',
            'de-be' => 'German-Belarusian',
            'de-en' => 'German-English',
            'de-es' => 'German-Spanish',
            'de-fr' => 'German-French',
            'de-it' => 'German-Italian',
            'de-ru' => 'German-Russian',
            'de-tr' => 'German-Turkish',
            'de-uk' => 'German-Ukrainian',
            'el-en' => 'Greek-English',
            'el-ru' => 'Greek-Russian',
            'en-be' => 'English-Belarusian',
            'en-ca' => 'English-Catalan',
            'en-cs' => 'English-Czech',
            'en-da' => 'English-Danish',
            'en-de' => 'English-German',
            'en-el' => 'English-Greek',
            'en-es' => 'English-Spanish',
            'en-et' => 'English-Estonian',
            'en-fi' => 'English-Finnish',
            'en-fr' => 'English-French',
            'en-hu' => 'English-Hungarian',
            'en-it' => 'English-Italian',
            'en-lt' => 'English-Lithuanian',
            'en-lv' => 'English-Latvian',
            'en-mk' => 'English-Macedonian',
            'en-nl' => 'English-Dutch',
            'en-no' => 'English-Norwegian',
            'en-pt' => 'English-Portuguese',
            'en-ru' => 'English-Russian',
            'en-sk' => 'English-Slovak',
            'en-sl' => 'English-Slovenian',
            'en-sq' => 'English-Albanian',
            'en-sv' => 'English-Swedish',
            'en-tr' => 'English-Turkish',
            'en-uk' => 'English-Ukrainian',
            'es-be' => 'Spanish-Belarusian',
            'es-de' => 'Spanish-German',
            'es-en' => 'Spanish-English',
            'es-ru' => 'Spanish-Russian',
            'es-uk' => 'Spanish-Ukrainian',
            'et-en' => 'Estonian-English',
            'et-ru' => 'Estonian-Russian',
            'fi-en' => 'Finnish-English',
            'fi-ru' => 'Finnish-Russian',
            'fr-be' => 'French-Belarusian',
            'fr-de' => 'French-German',
            'fr-en' => 'French-English',
            'fr-it' => 'French-Italian',
            'fr-ru' => 'French-Russian',
            'fr-uk' => 'French-Ukrainian',
            'hr-ru' => 'Croatian-Russian',
            'hu-en' => 'Hungarian-English',
            'hu-ru' => 'Hungarian-Russian',
            'hy-ru' => 'Armenian-Russian',
            'it-be' => 'Italian-Belarusian',
            'it-de' => 'Italian-German',
            'it-en' => 'Italian-English',
            'it-fr' => 'Italian-French',
            'it-ru' => 'Italian-Russian',
            'it-uk' => 'Italian-Ukrainian',
            'lt-en' => 'Lithuanian-English',
            'lt-ru' => 'Lithuanian-Russian',
            'lv-en' => 'Latvian-English',
            'lv-ru' => 'Latvian-Russian',
            'mk-en' => 'Macedonian-English',
            'mk-ru' => 'Macedonian-Russian',
            'nl-en' => 'Dutch-English',
            'nl-ru' => 'Dutch-Russian',
            'no-en' => 'Norwegian-English',
            'no-ru' => 'Norwegian-Russian',
            'pl-be' => 'Polish-Belarusian',
            'pl-ru' => 'Polish-Russian',
            'pl-uk' => 'Polish-Ukrainian',
            'pt-en' => 'Portuguese-English',
            'pt-ru' => 'Portuguese-Russian',
            'ro-be' => 'Romanian-Belarusian',
            'ro-ru' => 'Romanian-Russian',
            'ro-uk' => 'Romanian-Ukrainian',
            'ru-az' => 'Russian-Azerbaijani',
            'ru-be' => 'Russian-Belarusian',
            'ru-bg' => 'Russian-Bulgarian',
            'ru-ca' => 'Russian-Catalan',
            'ru-cs' => 'Russian-Czech',
            'ru-da' => 'Russian-Danish',
            'ru-de' => 'Russian-German',
            'ru-el' => 'Russian-Greek',
            'ru-en' => 'Russian-English',
            'ru-es' => 'Russian-Spanish',
            'ru-et' => 'Russian-Estonian',
            'ru-fi' => 'Russian-Finnish',
            'ru-fr' => 'Russian-French',
            'ru-hr' => 'Russian-Croatian',
            'ru-hu' => 'Russian-Hungarian',
            'ru-hy' => 'Russian-Armenian',
            'ru-it' => 'Russian-Italian',
            'ru-lt' => 'Russian-Lithuanian',
            'ru-lv' => 'Russian-Latvian',
            'ru-mk' => 'Russian-Macedonian',
            'ru-nl' => 'Russian-Dutch',
            'ru-no' => 'Russian-Norwegian',
            'ru-pl' => 'Russian-Polish',
            'ru-pt' => 'Russian-Portuguese',
            'ru-ro' => 'Russian-Romanian',
            'ru-sk' => 'Russian-Slovak',
            'ru-sl' => 'Russian-Slovenian',
            'ru-sq' => 'Russian-Albanian',
            'ru-sr' => 'Russian-Serbian',
            'ru-sv' => 'Russian-Swedish',
            'ru-tr' => 'Russian-Turkish',
            'ru-uk' => 'Russian-Ukrainian',
            'sk-en' => 'Slovak-English',
            'sk-ru' => 'Slovak-Russian',
            'sl-en' => 'Slovenian-English',
            'sl-ru' => 'Slovenian-Russian',
            'sq-en' => 'Albanian-English',
            'sq-ru' => 'Albanian-Russian',
            'sr-be' => 'Serbian-Belarusian',
            'sr-ru' => 'Serbian-Russian',
            'sr-uk' => 'Serbian-Ukrainian',
            'sv-en' => 'Swedish-English',
            'sv-ru' => 'Swedish-Russian',
            'tr-be' => 'Turkish-Belarusian',
            'tr-de' => 'Turkish-German',
            'tr-en' => 'Turkish-English',
            'tr-ru' => 'Turkish-Russian',
            'tr-uk' => 'Turkish-Ukrainian',
            'uk-bg' => 'Ukrainian-Bulgarian',
            'uk-cs' => 'Ukrainian-Czech',
            'uk-de' => 'Ukrainian-German',
            'uk-en' => 'Ukrainian-English',
            'uk-es' => 'Ukrainian-Spanish',
            'uk-fr' => 'Ukrainian-French',
            'uk-it' => 'Ukrainian-Italian',
            'uk-pl' => 'Ukrainian-Polish',
            'uk-ro' => 'Ukrainian-Romanian',
            'uk-ru' => 'Ukrainian-Russian',
            'uk-sr' => 'Ukrainian-Serbian',
            'uk-tr' => 'Ukrainian-Turkish');
        update_option(CSYN_YANDEX_TRANSLATE_LANGS, $langs);
    }

    if (get_option(CSYN_GOOGLE_TRANSLATE_LANGS) === false) {
        $langs = array('af' => 'Afrikaans',
            'sq' => 'Albanian',
            'ar' => 'Arabic',
            'az' => 'Azerbaijani',
            'eu' => 'Basque',
            'be' => 'Belarusian',
            'bn' => 'Bengali',
            'bg' => 'Bulgarian',
            'ca' => 'Catalan',
            'zh-CN' => 'Chinese Simplified',
            'zh-TW' => 'Chinese Traditional',
            'hr' => 'Croatian',
            'cs' => 'Czech',
            'da' => 'Danish',
            'nl' => 'Dutch',
            'en' => 'English',
            'eo' => 'Esperanto',
            'et' => 'Estonian',
            'tl' => 'Filipino',
            'fi' => 'Finnish',
            'fr' => 'French',
            'gl' => 'Galician',
            'ka' => 'Georgian',
            'de' => 'German',
            'el' => 'Greek',
            'gu' => 'Gujarati',
            'ht' => 'Haitian Creole',
            'iw' => 'Hebrew',
            'hi' => 'Hindi',
            'hu' => 'Hungarian',
            'is' => 'Icelandic',
            'id' => 'Indonesian',
            'ga' => 'Irish',
            'it' => 'Italian',
            'ja' => 'Japanese',
            'kn' => 'Kannada',
            'ko' => 'Korean',
            'la' => 'Latin',
            'lv' => 'Latvian',
            'lt' => 'Lithuanian',
            'mk' => 'Macedonian',
            'ms' => 'Malay',
            'mt' => 'Maltese',
            'no' => 'Norwegian',
            'fa' => 'Persian',
            'pl' => 'Polish',
            'pt' => 'Portuguese',
            'ro' => 'Romanian',
            'ru' => 'Russian',
            'sr' => 'Serbian',
            'sk' => 'Slovak',
            'sl' => 'Slovenian',
            'es' => 'Spanish',
            'sw' => 'Swahili',
            'sv' => 'Swedish',
            'ta' => 'Tamil',
            'te' => 'Telugu',
            'th' => 'Thai',
            'tr' => 'Turkish',
            'uk' => 'Ukrainian',
            'ur' => 'Urdu',
            'vi' => 'Vietnamese',
            'cy' => 'Welsh',
            'yi' => 'Yiddish');
        update_option(CSYN_GOOGLE_TRANSLATE_LANGS, $langs);
    }
}

function csyn_get_yandex_translate_lang_list($apikey) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://translate.yandex.net/api/v1.5/tr.json/getLangs');
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, 'key=' . $apikey . '&ui=en');
    $json = json_decode(curl_exec($ch), true);
    curl_close($ch);
    if (isset($json['dirs']) && isset($json['langs'])) {
        $langs = array();
        foreach ($json['dirs'] as $dir) {
            list($from, $to) = explode('-', $dir);
            $langs[$dir] = $json['langs'][$from] . '-' . $json['langs'][$to];
        }
        return $langs;
    } else {
        return false;
    }
}

function csyn_yandex_translate($apikey, $text, $dir, $return_emty = false) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://translate.yandex.net/api/v1.5/tr.json/translate');
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, 'key=' . $apikey . '&lang=' . $dir . '&format=html&text=' . urlencode($text));
    $json = json_decode(curl_exec($ch), true);
    curl_close($ch);
    if ($json['code'] == 200) {
        return $json['text'][0];
    } else {
        if ($return_emty) {
            return '';
        } else {
            return $text;
        }
    }
}

function csyn_google_translate($apikey, $text, $source, $target, $return_emty = false) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://translation.googleapis.com/language/translate/v2');
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, 'key=' . $apikey . '&source=' . $source . '&target=' . $target . '&q=' . urlencode($text));
    $json = json_decode(curl_exec($ch), true);
    curl_close($ch);
    if ($json['data']['translations']['0']['translatedText']) {
        return $json['data']['translations']['0']['translatedText'];
    } else {
        if ($return_emty) {
            return '';
        } else {
            return $text;
        }
    }
}

function csyn_compare_files($file_name_1, $file_name_2) {
    $file1 = csyn_file_get_contents($file_name_1);
    $file2 = csyn_file_get_contents($file_name_2);
    if ($file1 && $file2) {
        return (md5($file1) == md5($file2));
    }
    return false;
}

function csyn_save_image($image_url, $preferred_name = '', $width = 0, $height = 0, $compression = 0) {
    $wp_upload_dir = wp_upload_dir();
    $temp_name = wp_unique_filename($wp_upload_dir['path'], md5(time()) . '.tmp');
    $image_url = trim($image_url);
    if (strpos($image_url, '//') === 0) {
        $image_url = 'http:' . $image_url;
    }
    if (is_writable($wp_upload_dir['path']) && function_exists("gd_info") && function_exists("getimagesize") && function_exists("image_type_to_extension")) {
        $image_file = csyn_file_get_contents($image_url);
        file_put_contents($wp_upload_dir['path'] . '/' . $temp_name, $image_file);
        $image_info = @getimagesize($wp_upload_dir['path'] . '/' . $temp_name);
        if ($image_info !== false) {
            $image_type = $image_info[2];
            $ext = str_replace("jpeg", "jpg", image_type_to_extension($image_type, true));
            if ($image_type == IMAGETYPE_JPEG) {
                $image = imagecreatefromjpeg($wp_upload_dir['path'] . '/' . $temp_name);
            } elseif ($image_type == IMAGETYPE_GIF) {
                $image = imagecreatefromgif($wp_upload_dir['path'] . '/' . $temp_name);
            } elseif ($image_type == IMAGETYPE_PNG) {
                $image = imagecreatefrompng($wp_upload_dir['path'] . '/' . $temp_name);
            } elseif ($image_type == IMAGETYPE_BMP) {
                $image = imagecreatefromwbmp($wp_upload_dir['path'] . '/' . $temp_name);
            }

            $doscale = (intval($width) != 0 || intval($height) != 0 || intval($compression) != 0);
            $default_file_name = sanitize_file_name(sanitize_title($preferred_name) . $ext);
            if ($preferred_name != "" && strpos($default_file_name, "%") === false) {
                $file_name = $default_file_name;
            } else {
                $file_name = basename($image_url);
            }
            if (file_exists($wp_upload_dir['path'] . '/' . $file_name)) {
                if (!$doscale && csyn_compare_files($wp_upload_dir['path'] . '/' . $temp_name, $wp_upload_dir['path'] . '/' . $file_name)) {
                    imagedestroy($image);
                    unlink($wp_upload_dir['path'] . '/' . $temp_name);
                    return $wp_upload_dir['url'] . '/' . $file_name;
                }
                $file_name = wp_unique_filename($wp_upload_dir['path'], $file_name);
            }
            $image_path = $wp_upload_dir['path'] . '/' . $file_name;
            $local_image_url = $wp_upload_dir['url'] . '/' . $file_name;

            if ($doscale) {
                $img_width = imagesx($image);
                $img_height = imagesy($image);
                if ($width[strlen($width) - 1] == "%") {
                    $width = $img_width * intval($width) / 100;
                } else {
                    $width = intval($width);
                }
                if ($height[strlen($height) - 1] == "%") {
                    $height = $img_height * intval($height) / 100;
                } else {
                    $height = intval($height);
                }
                if ($width == 0) {
                    $height = $img_height;
                    $width = $img_width * ($height / $img_height);
                }
                if ($height == 0) {
                    $width = $img_width;
                    $height = $img_height * ($width / $img_width);
                }
                if ($compression == 0) {
                    $compression = 95;
                }

                $new_image = imagecreatetruecolor($width, $height);
                imagecopyresampled($new_image, $image, 0, 0, 0, 0, $width, $height, $img_width, $img_height);
                imagedestroy($image);
                unlink($wp_upload_dir['path'] . '/' . $temp_name);

                switch ($image_type) {
                    case IMAGETYPE_JPEG:
                        $result = imagejpeg($new_image, $image_path, intval($compression));
                        break;
                    case IMAGETYPE_GIF:
                        $result = imagegif($new_image, $image_path);
                        break;
                    case IMAGETYPE_PNG:
                        $result = imagepng($new_image, $image_path);
                        break;
                    case IMAGETYPE_BMP:
                        $result = imagewbmp($new_image, $image_path);
                        break;
                    default:
                        $result = false;
                }
                imagedestroy($new_image);

                if ($result) {
                    $default_image_path = $wp_upload_dir['path'] . '/' . $default_file_name;
                    if ($default_file_name != $file_name) {
                        if (csyn_compare_files($default_image_path, $image_path)) {
                            if (@unlink($image_path)) {
                                $local_image_url = $wp_upload_dir['url'] . '/' . $default_file_name;
                            }
                        }
                    }
                    return $local_image_url;
                }
            } else {
                imagedestroy($image);
                if (@rename($wp_upload_dir['path'] . '/' . $temp_name, $image_path)) {
                    return $local_image_url;
                }
            }
        }
        @unlink($wp_upload_dir['path'] . '/' . $temp_name);
    }
    return $image_url;
}

function csyn_add_image_to_library($image_url, $title, $post_id) {
    $title = trim($title);
    $upload_dir = wp_upload_dir();
    if (!file_exists($upload_dir['path'] . '/' . basename($image_url))) {
        $image_url = csyn_save_image($image_url, $title);
    }

    $img_path = str_replace($upload_dir['url'], $upload_dir['path'], $image_url);
    if (file_exists($img_path) && filesize($img_path)) {
        $wp_filetype = wp_check_filetype($upload_dir['path'] . basename($image_url), null);
        $attachment = array(
            'post_mime_type' => $wp_filetype['type'],
            'post_title' => preg_replace('/\.[^.]+$/', '', $title),
            'post_content' => '',
            'post_parent' => $post_id,
            'guid' => $upload_dir['path'] . basename($image_url),
            'post_status' => 'inherit'
        );
        $attach_id = wp_insert_attachment($attachment, $upload_dir['path'] . '/' . basename($image_url), $post_id);
        require_once(ABSPATH . 'wp-admin/includes/image.php');
        $attach_data = wp_generate_attachment_metadata($attach_id, $upload_dir['path'] . '/' . basename($image_url));
        wp_update_attachment_metadata($attach_id, $attach_data);
        return $attach_id;
    }
    return false;
}

function csyn_attach_post_thumbnail($post_id, $image_url, $title) {
    $attach_id = csyn_add_image_to_library($image_url, $title, $post_id);
    if ($attach_id !== false) {
        set_post_thumbnail($post_id, $attach_id);
        return $attach_id;
    }
    return false;
}

class CyberSyn_Syndicator {

    var $post = array();
    var $insideitem;
    var $element_tag;
    var $tag;
    var $count;
    var $failure;
    var $posts_found;
    var $max;
    var $current_feed = array();
    var $current_feed_url = "";
    var $feeds = array();
    var $update_period;
    var $feed_title;
    var $blog_charset;
    var $feed_charset;
    var $feed_charset_convert;
    var $preview;
    var $global_options = array();
    var $edit_existing;
    var $current_category;
    var $current_custom_field;
    var $current_custom_field_attr = array();
    var $generator;
    var $xml_parse_error;
    var $show_report = false;

    function fixURL($url) {
        $url = trim($url);
        if (strlen($url) > 0 && !preg_match('!^https?://.+!i', $url)) {
            $url = "http://" . $url;
        }
        return $url;
    }

    function resetPost() {
        global $csyn_urls_to_check;
        $this->post['post_title'] = "";
        $this->post['post_content'] = "";
        $this->post['post_excerpt'] = "";
        $this->post['media_description'] = "";
        $this->post['guid'] = "";
        $this->post['post_date'] = time();
        $this->post['post_date_gmt'] = time();
        $this->post['post_name'] = "";
        $this->post['categories'] = array();
        $this->post['comments'] = array();
        $this->post['media_content'] = array();
        $this->post['media_thumbnail'] = array();
        $this->post['enclosure_url'] = "";
        $this->post['link'] = "";
        $this->post['options'] = array();
        $csyn_urls_to_check = array();
    }

    function __construct() {
        $this->blog_charset = strtoupper(get_option('blog_charset'));

        $this->global_options = get_option(CSYN_FEED_OPTIONS);
        if (csyn_update_options($this->global_options)) {
            update_option(CSYN_FEED_OPTIONS, $this->global_options);
        }

        $this->feeds = get_option(CSYN_SYNDICATED_FEEDS);
        $changed = 0;
        for ($i = 0; $i < count($this->feeds); $i++) {
            $changed += csyn_update_options($this->feeds[$i]['options']);
        }
        if ($changed) {
            update_option(CSYN_SYNDICATED_FEEDS, $this->feeds);
        }
    }

    function parse_w3cdtf($w3cdate) {
        if (preg_match("/^\s*(\d{4})(-(\d{2})(-(\d{2})(T(\d{2}):(\d{2})(:(\d{2})(\.\d+)?)?(?:([-+])(\d{2}):?(\d{2})|(Z))?)?)?)?\s*\$/", $w3cdate, $match)) {
            list($year, $month, $day, $hours, $minutes, $seconds) = array($match[1], $match[3], $match[5], $match[7], $match[8], $match[10]);
            if (is_null($month)) {
                $month = (int) gmdate('m');
            }
            if (is_null($day)) {
                $day = (int) gmdate('d');
            }
            if (is_null($hours)) {
                $hours = (int) gmdate('H');
                $seconds = $minutes = 0;
            }
            $epoch = gmmktime($hours, $minutes, $seconds, $month, $day, $year);
            if ($match[14] != 'Z') {
                list($tz_mod, $tz_hour, $tz_min) = array($match[12], $match[13], $match[14]);
                $tz_hour = (int) $tz_hour;
                $tz_min = (int) $tz_min;
                $offset_secs = (($tz_hour * 60) + $tz_min) * 60;
                if ($tz_mod == "+") {
                    $offset_secs *= - 1;
                }
                $offset = $offset_secs;
            }
            $epoch = $epoch + $offset;
            return $epoch;
        } else {
            return -1;
        }
    }

    function parseFeed($feed_url) {
        $this->tag = "";
        $this->insideitem = false;
        $this->element_tag = "";
        $this->feed_title = "";
        $this->generator = "";
        $this->current_feed_url = $feed_url;
        $this->feed_charset_convert = "";
        $this->posts_found = 0;
        $this->failure = false;

        if ($this->preview) {
            $options = $this->global_options;
        } else {
            $options = $this->current_feed['options'];
        }

        $feed_url = $this->current_feed_url;

        $rss_lines = csyn_file_get_contents($feed_url, true, 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.2) Gecko/20090729 Firefox/3.5.2 GTB5');

        if (!is_array($rss_lines) || stripos($rss_lines[0], '<?xml') === false) {
            $rss_lines = csyn_file_get_contents($feed_url, true);
        }

        if (is_array($rss_lines) && count($rss_lines) > 0) {
            preg_match("/encoding[. ]?=[. ]?[\"'](.*?)[\"']/i", $rss_lines[0], $matches);
            if (isset($matches[1]) && $matches[1] != "") {
                $this->feed_charset = trim($matches[1]);
            } else {
                $this->feed_charset = "not defined";
            }

            $xml_parser = xml_parser_create();
            xml_parser_set_option($xml_parser, XML_OPTION_TARGET_ENCODING, $this->blog_charset);
            xml_set_object($xml_parser, $this);
            xml_set_element_handler($xml_parser, "startElement", "endElement");
            xml_set_character_data_handler($xml_parser, "charData");

            $do_mb_convert_encoding = ($options['convert_encoding'] == 'on' && $this->feed_charset != "not defined" && $this->blog_charset != strtoupper($this->feed_charset));

            $this->xml_parse_error = 0;
            foreach ($rss_lines as $line) {
                if ($this->count >= $this->max || $this->failure) {
                    break;
                }
                if ($do_mb_convert_encoding && function_exists("mb_convert_encoding")) {
                    $line = mb_convert_encoding($line, $this->blog_charset, $this->feed_charset);
                }

                if (!xml_parse($xml_parser, $line . "\n")) {
                    $this->xml_parse_error = xml_get_error_code($xml_parser);
                    xml_parser_free($xml_parser);
                    return false;
                }
            }

            xml_parser_free($xml_parser);
            return $this->count;
        } else {
            return false;
        }
    }

    function syndicateFeeds($feed_ids, $check_time) {
        $this->preview = false;
        $feeds_cnt = count($this->feeds);
        if (is_array($feed_ids) && count($feed_ids) > 0) {
            if ($this->show_report) {
                ob_end_flush();
                ob_implicit_flush();
                echo "<div id=\"message\" class=\"updated fade\"><p>\n";
                flush();
            }
            @set_time_limit(60 * 60);
            for ($i = 0; $i < $feeds_cnt; $i++) {
                if (in_array($i, $feed_ids) && !is_object($this->feeds[$i]['updated'])) {
                    if (!$check_time || $this->getUpdateTime($this->feeds[$i]) == "asap") {
                        $this->feeds[$i]['updated'] = time();
                        update_option(CSYN_SYNDICATED_FEEDS, $this->feeds);
                        $this->current_feed = $this->feeds[$i];
                        $this->resetPost();
                        $this->max = (int) $this->current_feed['options']['max_items'];
                        if ($this->show_report) {
                            echo 'Syndicating <a href="' . htmlspecialchars($this->current_feed['url']) . '" target="_blank"><strong>' . $this->current_feed['title'] . "</strong></a>...\n";
                            flush();
                        }
                        if ($this->current_feed['options']['undefined_category'] == 'use_global') {
                            $this->current_feed['options']['undefined_category'] = $this->global_options['undefined_category'];
                        }
                        $this->count = 0;

                        $result = $this->parseFeed($this->current_feed['url']);

                        if ($this->show_report) {
                            if ($this->count == 1) {
                                echo $this->count . " post was added";
                            } else {
                                echo $this->count . " posts were added";
                            }
                            if ($result === false) {
                                echo " [!]";
                            }
                            echo "<br />\n";
                            flush();
                        }
                    }
                }
            }
            if (isset($save_options)) {
                update_option(CSYN_SYNDICATED_FEEDS, $this->feeds);
            }
            if ($this->show_report) {
                echo "</p></div>\n";
            }
        }
    }

    function displayPost() {
        if ($this->generator != "") {
            echo "<strong>Generator:</strong> " . $this->generator . "<br />\n";
        }
        echo "<strong>Charset Encoding:</strong> " . $this->feed_charset . "</p>\n";
        echo '<p><strong>Feed Title:</strong> ' . $this->feed_title . '<br />';
        echo '<strong>URL:</strong> ' . htmlspecialchars($this->current_feed_url) . '<br />';
        if (mb_strlen(trim($this->post['post_content'])) == 0) {
            $this->post['post_content'] = $this->post['post_excerpt'];
        }

        echo '<div style="overflow:auto; max-height:250px; border:1px #ccc solid; background-color:white; padding:8px; margin:8px 0 8px; 0;">';
        echo '<strong>Title:</strong> ' . csyn_fix_white_spaces(trim($this->post['post_title'])) . '<br />';
        echo '<strong>Date:</strong> ' . gmdate('Y-m-d H:i:s', (int) $this->post['post_date']) . '<br /><br />';
        echo csyn_fix_white_spaces(trim($this->post['post_content']));
        echo '</div>';

        $attachment = '';
        $video_extensions = wp_get_video_extensions();
        if ($this->post['enclosure_url'] != '') {
            $ext = mb_strtolower(pathinfo($this->post['enclosure_url'], PATHINFO_EXTENSION));
            if (in_array($ext, $video_extensions)) {
                $video = array('src' => $this->post['enclosure_url']);
                if (isset($this->post['media_thumbnail'][0])) {
                    $video['poster'] = $this->post['media_thumbnail'][0];
                }
                $attachment .= wp_video_shortcode($video);
            } else {
                $attachment .= '<img src="' . $this->post['enclosure_url'] . '">';
            }
        } else {
            if (sizeof($this->post['media_content'])) {
                $attachment .= '<div class="media_block">';
                for ($i = 0; $i < sizeof($this->post['media_content']); $i++) {
                    $ext = mb_strtolower(pathinfo($this->post['media_content'][$i], PATHINFO_EXTENSION));
                    if (in_array($ext, $video_extensions)) {
                        $video = array('src' => $this->post['media_content'][$i]);
                        if (isset($this->post['media_thumbnail'][$i])) {
                            $video['poster'] = $this->post['media_thumbnail'][$i];
                        }
                        $attachment .= wp_video_shortcode($video);
                    } elseif (isset($this->post['media_thumbnail'][$i])) {
                        $attachment .= '<a href="' . $this->post['media_content'][$i] . '"><img src="' . $this->post['media_thumbnail'][$i] . '" class="media_thumbnail"></a>';
                    }
                }
                $attachment .= '</div>';
            } elseif (sizeof($this->post['media_thumbnail'])) {
                $attachment .= '<div class="media_block">';
                for ($i = 0; $i < sizeof($this->post['media_thumbnail']); $i++) {
                    $attachment .= '<img src="' . $this->post['media_thumbnail'][$i] . '" class="media_thumbnail">';
                }
                $attachment .= '</div>';
            }
        }

        if ($attachment != '') {
            echo '<br /><strong>Attachments </strong> (adjust the "Media Attachments" settings to handle them):<br /><br />' . $attachment;
        }
    }

    function feedPreview($feed_url, $edit_existing = false) {
        echo "<br />";
        $this->edit_existing = $edit_existing;
        $no_feed_dupes = get_option(CSYN_DISABLE_DUPLICATION_CONTROL) != "on";
        if (!$this->edit_existing && !is_object($feed_url)) {
            for ($i = 0; $i < count($this->feeds); $i++) {
                if ($no_feed_dupes && isset($this->feeds[$i]['url']) && $this->feeds[$i]['url'] == $feed_url) {
                    echo '<div id="message" class="error"><p><strong>This feed is already in use.</strong></p></div>';
                    return false;
                }
            }
        }
        $this->max = 1;
        $this->preview = true;
        ?>
        <table class="widefat" width="100%">
            <tr valign="top">
                <th>Feed Info and Preview</th>
            </tr>
            <tr>
                <td>
                    <?php
                    $this->resetPost();
                    $this->count = 0;
                    $result = $this->parseFeed($feed_url);
                    if (!$result) {
                        if (!is_object($feed_url)) {
                            echo '<div id="message"><p><strong>No feed found at</strong> <a href="http://validator.w3.org/feed/check.cgi?url=' . urlencode($feed_url) . '" target="_blank">' . htmlspecialchars($feed_url) . '</a><br />';
                            echo 'XML parse error: ' . $this->xml_parse_error . ' (' . xml_error_string($this->xml_parse_error) . ')</p></div>';
                        } else {
                            echo '<div id="message"><p><strong>Parse errror.<strong></p>';
                        }
                    }
                    ?>
                </td>
            </tr>
        </table>
        <?php
        return ($result != 0);
    }

    function startElement($parser, $name, $attribs) {
        $this->tag = $name;

        if ($this->insideitem && $name == "MEDIA:CONTENT" && isset($attribs["URL"])) {
            $this->post['media_content'][] = $attribs["URL"];
        }

        if ($this->insideitem && $name == "MEDIA:THUMBNAIL") {
            $this->post['media_thumbnail'][] = $attribs["URL"];
        }

        if ($name == "ENCLOSURE") {
            if (isset($attribs['URL'])) {
                $this->post['enclosure_url'] = $attribs['URL'];
            }
        }

        if ($this->insideitem && $name == "LINK" && isset($attribs['HREF']) && isset($attribs ["REL"])) {
            if (stripos($attribs ["REL"], "enclosure") !== false) {
                $this->post['enclosure_url'] = $attribs['HREF'];
            } elseif (stripos($attribs ["REL"], "alternate") !== false && $this->post['link'] == '') {
                $this->post['link'] = $attribs['HREF'];
            }
        }

        if ($name == "ITEM" || $name == "ENTRY") {
            $this->insideitem = true;
        } elseif (!$this->insideitem && $name == "TITLE" && strlen(trim($this->feed_title)) != 0) {
            $this->tag = "";
        }
    }

    function endElement($parser, $name) {
        if (($name == "ITEM" || $name == "ENTRY")) {
            $this->posts_found++;
            if (($this->count < $this->max)) {
                if ($this->preview) {
                    $this->displayPost();
                    $this->count++;
                } else {
                    $this->insertPost();
                }
                $this->resetPost();
                $this->insideitem = false;
            }
        } elseif ($name == "CATEGORY") {
            $category = trim(csyn_fix_white_spaces($this->current_category));
            if (strlen($category) > 0) {
                $this->post['categories'][] = $category;
            }
            $this->current_category = "";
        } elseif ($this->count >= $this->max) {
            $this->insideitem = false;
        }
    }

    function charData($parser, $data) {
        if ($this->insideitem) {
            switch ($this->tag) {
                case "TITLE":
                    $this->post['post_title'] .= $data;
                    break;
                case "DESCRIPTION":
                    $this->post['post_excerpt'] .= $data;
                    break;
                case "MEDIA:DESCRIPTION":
                    $this->post['media_description'] .= $data;
                    break;
                case "SUMMARY":
                    $this->post['post_excerpt'] .= $data;
                    break;
                case "LINK":
                    if (trim($data) != "") {
                        $this->post['link'] .= trim($data);
                    }
                    break;
                case "CONTENT:ENCODED":
                    $this->post['post_content'] .= $data;
                    break;
                case "CONTENT":
                    $this->post['post_content'] .= $data;
                    break;
                case "CATEGORY":
                    $this->current_category .= trim($data);
                    break;
                case "GUID":
                    $this->post['guid'] .= trim($data);
                    break;
                case "ID":
                    $this->post['guid'] .= trim($data);
                    break;
                case "ATOM:ID":
                    $this->post['guid'] .= trim($data);
                    break;
                case "DC:IDENTIFIER":
                    $this->post['guid'] .= trim($data);
                    break;
                case "DC:DATE":
                    $this->post['post_date'] = $this->parse_w3cdtf($data);
                    if ($this->post['post_date']) {
                        $this->tag = "";
                    }
                    break;
                case "DCTERMS:ISSUED":
                    $this->post['post_date'] = $this->parse_w3cdtf($data);
                    if ($this->post['post_date']) {
                        $this->tag = "";
                    }
                    break;
                case "PUBLISHED":
                    $this->post['post_date'] = $this->parse_w3cdtf($data);
                    if ($this->post['post_date']) {
                        $this->tag = "";
                    }
                    break;
                case "UPDATED":
                    $this->post['post_date'] = $this->parse_w3cdtf($data);
                    if ($this->post['post_date']) {
                        $this->tag = "";
                    }
                    break;
                case "ISSUED":
                    $this->post['post_date'] = $this->parse_w3cdtf($data);
                    if ($this->post['post_date']) {
                        $this->tag = "";
                    }
                    break;
                case "PUBDATE":
                    $this->post['post_date'] = strtotime($data);
                    if ($this->post['post_date']) {
                        $this->tag = "";
                    }
                    break;
            }
        } elseif ($this->tag == "TITLE") {
            $this->feed_title .= csyn_fix_white_spaces($data);
        } elseif ($this->tag == "GENERATOR") {
            $this->generator .= trim($data);
        }
    }

    function deleteFeeds($feed_ids, $delete_posts = false, $defele_feeds = false) {
        global $wpdb;
        $feeds_cnt = count($feed_ids);
        if ($feeds_cnt > 0) {

            @set_time_limit(60 * 60);
            ob_end_flush();
            ob_implicit_flush();
            echo "<div id=\"message\" class=\"updated fade\"><p>\n";
            echo "Deleting. Please wait...";
            flush();

            if ($delete_posts) {
                $to_delete = "(";
                $cnt = count($feed_ids);
                for ($i = 0; $i < $cnt; $i++) {
                    $to_delete .= "'" . $this->feeds[$feed_ids[$i]]['url'] . "', ";
                }
                $to_delete .= ")";
                $to_delete = str_replace(", )", ")", $to_delete);
                $post_ids = $wpdb->get_col("SELECT post_id FROM $wpdb->postmeta WHERE meta_key = 'cyberseo_rss_source' AND meta_value IN {$to_delete}");
                if (count($post_ids) > 0) {
                    foreach ($post_ids as $post_id) {
                        @wp_delete_post($post_id, true);
                        echo(str_repeat(' ', 512));
                        flush();
                    }
                }
            }
            if ($defele_feeds) {
                $feeds = array();
                $feeds_cnt = count($this->feeds);
                for ($i = 0; $i < $feeds_cnt; $i++) {
                    if (!in_array($i, $feed_ids)) {
                        $feeds[] = $this->feeds[$i];
                    }
                }
                $this->feeds = $feeds;
                sort($this->feeds);
            }
            update_option(CSYN_SYNDICATED_FEEDS, $this->feeds);

            echo " Done!</p></div>\n";
        }
    }

    function insertPost() {
        global $wpdb, $csyn_last_effective_url;

        if ($this->show_report) {
            echo(str_repeat(' ', 512));
            flush();
        }

        $this->post['post_title'] = trim($this->post['post_title']);

        if (mb_strlen($this->post['post_title'])) {
            $cat_ids = $this->getCategoryIds($this->post['categories']);
            if (empty($cat_ids) && $this->current_feed['options']['undefined_category'] == 'drop') {
                return;
            }
            $post = array();

            if (isset($this->post['tags_input']) && is_array($this->post['tags_input'])) {
                $post['tags_input'] = $this->post['tags_input'];
            } else {
                $post['tags_input'] = array();
            }

            if (mb_strlen($this->post['guid']) < 8) {
                if (strlen($this->post['link'])) {
                    $components = parse_url($this->post['link']);
                    $guid = 'tag:' . $components['host'];
                } else {
                    $guid = 'tag:' . md5($this->post['post_content'] . $this->post['post_excerpt']);
                }
                if ($this->post['post_date'] != "") {
                    $guid .= '://post.' . $this->post['post_date'];
                } else {
                    $guid .= '://' . md5($this->post['link'] . '/' . $this->post['post_title']);
                }
            } else {
                $guid = $this->post['guid'];
            }

            $this->post['post_title'] = csyn_fix_white_spaces($this->post['post_title']);
            $post['post_name'] = sanitize_title($this->post['post_title']);

            $guid = addslashes($guid);
            if (mb_strlen($guid) > 255) {
                $guid = mb_substr($guid, 0, 255);
            }
            $post['guid'] = $guid;

            switch ($this->current_feed['options']['duplicate_check_method']) {
                case "guid":
                    $result_dup = @$wpdb->query("SELECT ID FROM " . $wpdb->posts . " WHERE guid = \"" . $post['guid'] . "\"");
                    break;
                case "title":
                    $result_dup = @$wpdb->query("SELECT ID FROM " . $wpdb->posts . " WHERE post_name = \"" . $post['post_name'] . "\"");
                    break;
                default:
                    $result_dup = @$wpdb->query("SELECT ID FROM " . $wpdb->posts . " WHERE guid = \"" . $post['guid'] . "\" OR post_name = \"" . $post['post_name'] . "\"");
            }

            if (!$result_dup) {

                if ($this->current_feed['options']['extract_full_articles'] == 'on' && get_option(CSYN_FULL_TEXT_EXTRACTOR) != '' && isset($this->post['link'])) {
                    $feed_url = get_option(CSYN_FULL_TEXT_EXTRACTOR) . '?url=' . urlencode($this->post['link']);
                    $feed = csyn_file_get_contents($feed_url);
                    preg_match_all('/<description>(.*?)<\/description>/is', $feed, $matches);
                    if (isset($matches[1][1])) {
                        $this->post['post_content'] = html_entity_decode($matches[1][1]);
                    } else {
                        $feed = csyn_file_get_contents(get_option(CSYN_FULL_TEXT_EXTRACTOR) . '?url=' . urlencode($this->post['link']) . '&links=preserve&exc=1&html=1');
                        preg_match_all('/<description>(.*?)<\/description>/is', $feed, $matches);
                        if (isset($matches[1][1])) {
                            $this->post['post_content'] = html_entity_decode($matches[1][1]);
                        }
                    }
                }

                if (trim(strip_tags($this->post['post_content'])) == '[unable to retrieve full-text content]') {
                    return;
                }

                if (mb_strlen(trim($this->post['post_content'])) == 0) {
                    $this->post['post_content'] = $this->post['post_excerpt'];
                }

                $divider = '888011000110888';

                if ($this->current_feed['options']['translator'] != 'none') {
                    $packet = ' ' . $this->post['post_title'] . ' ' . $divider . ' ' . $this->post['post_content'] . ' ';
                    if (strlen(trim($this->post['post_excerpt']))) {
                        $packet .= $divider . ' ' . $this->post['post_excerpt'] . ' ';
                    }
                    if ($this->current_feed['options']['translator'] == 'yandex_translate') {
                        $packet = csyn_yandex_translate($this->current_feed['options']['yandex_api_key'], $packet, $this->current_feed['options']['yandex_translation_dir']);
                    } elseif ($this->current_feed['options']['translator'] == 'google_translate') {
                        $packet = csyn_google_translate($this->current_feed['options']['google_api_key'], $packet, $this->current_feed['options']['google_translation_source'], $this->current_feed['options']['google_translation_target']);
                    }
                    $translated = explode($divider, $packet);
                    $this->post['post_title'] = $translated[0];
                    $this->post['post_content'] = $translated[1];
                    if (isset($translated[2])) {
                        $this->post['post_excerpt'] = $translated[2];
                    }
                }

                if (function_exists('csyn_spin_content')) {
                    $title = $this->post['post_title'];
                    $packet = ' ' . $this->post['post_title'] . ' ' . $divider . ' ' . csyn_fix_white_spaces($this->post['post_content']) . ' ';
                    if (strlen(trim($this->post['post_excerpt']))) {
                        $packet .= $divider . ' ' . csyn_fix_white_spaces($this->post['post_excerpt']) . ' ';
                    }
                    $packet = csyn_spin_content($packet, $this->current_feed['options']['synonymizer_mode']);
                    if (substr_count($packet, $divider)) {
                        $spun_post = explode($divider, $packet);
                        $this->post['post_title'] = $spun_post[0];
                        $this->post['post_content'] = $spun_post[1];
                        if (isset($spun_post[2])) {
                            $this->post['post_excerpt'] = $spun_post[2];
                        }
                    }
                }

                if ($this->current_feed['options']['base_date'] == 'syndication') {
                    $post_date = time();
                } else {
                    $post_date = ((int) $this->post['post_date']);
                }
                $post_date += 60 * ($this->current_feed['options']['date_min'] + mt_rand(0, $this->current_feed['options']['date_max'] - $this->current_feed['options']['date_min']));
                $post['post_date'] = addslashes(gmdate('Y-m-d H:i:s', $post_date + 3600 * (int) get_option('gmt_offset')));
                $post['post_date_gmt'] = addslashes(gmdate('Y-m-d H:i:s', $post_date));
                $post['post_modified'] = addslashes(gmdate('Y-m-d H:i:s', $post_date + 3600 * (int) get_option('gmt_offset')));
                $post['post_modified_gmt'] = addslashes(gmdate('Y-m-d H:i:s', $post_date));
                $post['post_status'] = $this->current_feed['options']['post_status'];
                $post['comment_status'] = $this->current_feed['options']['comment_status'];
                $post['ping_status'] = $this->current_feed['options']['ping_status'];
                $post['post_type'] = 'post';
                $post['post_author'] = $this->current_feed['options']['post_author'];

                $post['post_title'] = $this->post['post_title'];
                $post['post_content'] = $this->post['post_content'];
                $post['post_excerpt'] = $this->post['post_excerpt'];

                if (!isset($this->post['media_thumbnail'][0]) && $this->post['enclosure_url'] != '') {
                    $this->post['media_thumbnail'][0] = $this->post['enclosure_url'];
                }

                if ($this->current_feed['options']['embed_videos'] == 'on') {
                    $allow_post_kses = true;
                    if (strpos($this->post['link'], 'youtube.com/') !== false) {
                        $post['post_excerpt'] = $post['post_content'] = $this->post['link'] . "\n<br />" . htmlentities($this->post['media_description'], ENT_QUOTES, 'UTF-8');
                    } elseif (strpos($this->post['link'], 'vimeo.com/') !== false) {
                        $post['post_excerpt'] = $post['post_content'] = $this->post['link'] . "\n<br />" . strip_tags($this->post['post_excerpt'], '<br>,<b>,<p>,<a>');
                    } elseif (strpos($this->post['link'], 'flickr.com/') !== false) {
                        $post['post_excerpt'] = $post['post_content'] = $this->post['link'] . "\n<br />" . strip_tags($this->post['post_content'], '<br>,<b>,<p>,<a>');
                    } elseif (strpos($this->post['link'], 'ign.com/') !== false) {
                        $post['post_excerpt'] = $post['post_content'] = $this->post['post_excerpt'];
                        $this->current_feed['options']['insert_media_attachments'] = 'top';
                    } elseif (strpos($this->post['link'], 'dailymotion.com/') !== false) {
                        $post['post_excerpt'] = $post['post_content'] = $this->post['link'] . "\n<br />" . strip_tags($this->post['post_excerpt'], '<br>,<b>,<p>,<a>');
                    } elseif (strpos($this->post['guid'], 'ustream.tv/') !== false) {
                        $post['post_excerpt'] = $post['post_content'] = '<iframe width="480" height="270" src="' . str_replace('/recorded/', '/embed/recorded/', $this->post['guid']) . '" scrolling="no" allowfullscreen webkitallowfullscreen frameborder="0" style="border: 0 none transparent;"></iframe>' . "\n<br />" . strip_tags($this->post['post_excerpt'], '<br>,<b>,<p>,<a>');
                    }
                }
                $attachment = '';
                if ($this->current_feed['options']['insert_media_attachments'] != 'no') {
                    $attachment = '';
                    $video_extensions = wp_get_video_extensions();
                    if ($this->post['enclosure_url'] != '') {
                        $ext = mb_strtolower(pathinfo($this->post['enclosure_url'], PATHINFO_EXTENSION));
                        if (in_array($ext, $video_extensions)) {
                            $attachment .= '[video src="' . $this->post['enclosure_url'] . '"';
                            if (isset($this->post['media_thumbnail'][0])) {
                                if ($this->current_feed['options']['store_images'] == 'on') {
                                    $this->post['media_thumbnail'][0] = csyn_save_image($this->post['media_thumbnail'][0], $this->post['post_title']);
                                }
                                $attachment .= ' poster="' . $this->post['media_thumbnail'][0] . '"';
                            }
                            $attachment .= ']';
                        } else {
                            if ($this->current_feed['options']['store_images'] == 'on') {
                                $this->post['enclosure_url'] = csyn_save_image($this->post['enclosure_url'], $this->post['post_title']);
                            }
                            $attachment .= '<img src="' . $this->post['enclosure_url'] . '">';
                        }
                    } else {
                        if (sizeof($this->post['media_content'])) {
                            $attachment .= '<div class="media_block">';
                            for ($i = 0; $i < sizeof($this->post['media_content']); $i++) {
                                $ext = mb_strtolower(pathinfo($this->post['media_content'][$i], PATHINFO_EXTENSION));
                                if (in_array($ext, $video_extensions)) {
                                    $attachment .= '[video src="' . $this->post['media_content'][$i] . '"';
                                    if (isset($this->post['media_thumbnail'][$i])) {
                                        if ($this->current_feed['options']['store_images'] == 'on') {
                                            $this->post['media_thumbnail'][$i] = csyn_save_image($this->post['media_thumbnail'][$i], $this->post['post_title']);
                                        }
                                        $attachment .= ' poster="' . $this->post['media_thumbnail'][$i] . '"';
                                    }
                                    $attachment .= ']';
                                } elseif (isset($this->post['media_thumbnail'][$i])) {
                                    if ($this->current_feed['options']['store_images'] == 'on') {
                                        $this->post['media_thumbnail'][$i] = csyn_save_image($this->post['media_thumbnail'][$i], $this->post['post_title']);
                                    }
                                    $attachment .= '<a href="' . $this->post['media_content'][$i] . '"><img src="' . $this->post['media_thumbnail'][$i] . '" class="media_thumbnail"></a>';
                                }
                            }
                            $attachment .= '</div>';
                        } elseif (sizeof($this->post['media_thumbnail'])) {
                            $attachment .= '<div class="media_block">';
                            for ($i = 0; $i < sizeof($this->post['media_thumbnail']); $i++) {
                                $attachment .= '<img src="' . $this->post['media_thumbnail'][$i] . '" class="media_thumbnail">';
                            }
                            $attachment .= '</div>';
                        }
                    }
                }

                $attachment_status = $this->current_feed['options']['insert_media_attachments'];

                if ($this->current_feed['options']['set_thumbnail'] == 'first_image') {
                    preg_match('/<img.+?src=["\'](.+?)["\'].*?>/is', $this->post['post_content'] . $this->post['post_excerpt'] . $attachment, $matches);
                    if (isset($matches[1])) {
                        $post_thumb_src = $matches[1];
                        $image_url = csyn_save_image($post_thumb_src, $this->post['post_title']);
                    }
                } elseif ($this->current_feed['options']['set_thumbnail'] == 'last_image') {
                    preg_match('/<img.+?src=["\'](.+?)["\'].*?>/is', $this->post['post_content'] . $this->post['post_excerpt'] . $attachment, $matches);
                    if (count($matches) > 1) {
                        $post_thumb_src = $matches[count($matches) - 1];
                        $image_url = csyn_save_image($post_thumb_src, $this->post['post_title']);
                    }
                } elseif ($this->current_feed['options']['set_thumbnail'] == 'media_attachment' && isset($this->post['media_thumbnail'][0])) {
                    $post_thumb_src = trim($this->post['media_thumbnail'][0]);
                    $image_url = csyn_save_image($post_thumb_src, $this->post['post_title']);
                }

                if ($this->current_feed['options']['store_images'] == 'on') {
                    preg_match_all('/<img(.+?)src=[\'\"](.+?)[\'\"](.*?)>/is', $post['post_content'] . $post['post_excerpt'], $matches);
                    $image_urls = $matches[2];

                    preg_match_all('/<img(.+?)srcset=[\'\"](.+?)[\'\"](.*?)>/is', $post['post_content'] . $post['post_excerpt'], $matches);
                    foreach ($matches[2] as $scrset) {
                        $srcset_images = explode(',', $scrset);
                        foreach ($srcset_images as $image) {
                            if (strpos($image, ' ') !== false) {
                                $image = substr($image, 0, strrpos($image, ' '));
                            }
                            $image_urls[] = trim($image);
                        }
                    }
                    
                    $image_urls = array_values(array_unique($image_urls));
                  
                    $home = get_option('home');
                    if (count($image_urls)) {
                        for ($i = 0; $i < count($image_urls); $i++) {
                            if (isset($image_urls[$i]) && strpos($image_urls[$i], $home) === false && strpos($image_urls[$i], '//') != 0) {
                                $new_image_url = csyn_save_image($image_urls[$i], $post['post_title']);
                                $post['post_content'] = str_replace($image_urls[$i], $new_image_url, $post['post_content']);
                                $post['post_excerpt'] = str_replace($image_urls[$i], $new_image_url, $post['post_excerpt']);
                                if ($this->show_report) {
                                    echo(str_repeat(' ', 256));
                                    flush();
                                }
                            }
                        }
                    }
                }

                $inc_footerss = ($this->current_feed['options']['include_post_footers'] == 'on');

                $title = $post['post_title'];
                $content = csyn_fix_white_spaces($post['post_content']);
                $excerpt = csyn_fix_white_spaces($post['post_excerpt']);

                $post['post_title'] = addslashes($title);
                $post['post_content'] = addslashes(csyn_touch_post_content($content, $attachment, $attachment_status));
                $post['post_excerpt'] = addslashes(csyn_touch_post_content($excerpt, $attachment, $attachment_status, $inc_footerss));

                if (is_numeric($this->current_feed['options']['shorten_excerpts'])) {
                    if ($this->current_feed['options']['shorten_excerpts'] > 0) {
                        $words = explode(' ', strip_tags($post['post_excerpt']));
                        $post['post_excerpt'] = implode(' ', array_slice($words, 0, floor($this->current_feed['options']['shorten_excerpts']) + 1)) . '...';
                    } else {
                        $post['post_excerpt'] = '';
                    }
                }

                $post_categories = array();
                if (is_array($this->current_feed['options']['post_category'])) {
                    $post_categories = $this->current_feed['options']['post_category'];
                }

                if (!empty($cat_ids)) {
                    $post_categories = array_merge($post_categories, $cat_ids);
                } elseif ($this->current_feed['options']['undefined_category'] == 'use_default' && empty($post_categories)) {
                    $post_categories[] = get_option('default_category');
                }

                $post_categories = array_unique($post_categories);

                $post['post_category'] = $post_categories;

                if ($this->current_feed['options']['create_tags'] == 'on') {
                    $post['tags_input'] = array_merge($post['tags_input'], $this->post['categories']);
                }

                if ($this->current_feed['options']['post_tags'] != '') {
                    $tags = explode(',', $this->current_feed['options']['post_tags']);
                    $post['tags_input'] = array_merge($post['tags_input'], $tags);
                }

                $post['tags_input'] = array_unique($post['tags_input']);

                if (!isset($allow_post_kses)) {
                    remove_filter('content_save_pre', 'wp_filter_post_kses');
                    remove_filter('excerpt_save_pre', 'wp_filter_post_kses');
                }

                // WPML switch language
                if (has_action('wpml_switch_language')) {
                    if ($this->current_feed['options']['wpml_language'] == '') {
                        do_action('wpml_switch_language', null);
                    } else {
                        do_action('wpml_switch_language', $this->current_feed['options']['wpml_language']);
                    }
                }

                $post_id = wp_insert_post($post, true);

                // WPML restore language
                if (has_action('wpml_switch_language')) {
                    do_action('wpml_switch_language', null);
                }

                if (is_wp_error($post_id) && $this->show_report) {
                    $this->failure = true;
                    echo "<br /><b>Error:</b> " . $post_id->get_error_message($post_id->get_error_code()) . "<br />\n";
                } else {
                    if ($this->current_feed['options']['set_thumbnail'] != 'no_thumb') {
                        if (isset($image_url)) {
                            $attach_id = csyn_attach_post_thumbnail($post_id, $image_url, $this->post['post_title']);
                        }
                        if (($this->current_feed['options']['require_thumbnail'] == 'on') && (!has_post_thumbnail($post_id) || (isset($attach_id) && $attach_id === false))) {
                            @wp_delete_post($post_id, true);
                            return;
                        }
                    }

                    $this->count++;
                    $this->failure = false;

                    add_post_meta($post_id, 'cyberseo_rss_source', $this->current_feed['url']);
                    add_post_meta($post_id, 'cyberseo_post_link', $this->post['link']);
                }
            }
        }
    }

    function getCategoryIds($category_names) {
        global $wpdb;

        $cat_ids = array();
        foreach ($category_names as $cat_name) {
            if (function_exists('term_exists')) {
                $cat_id = term_exists($cat_name, 'category');
                if ($cat_id) {
                    $cat_ids[] = $cat_id['term_id'];
                } elseif ($this->current_feed['options']['undefined_category'] == 'create_new') {
                    $term = wp_insert_term($cat_name, 'category');
                    $cat_ids[] = $term['term_id'];
                }
            } else {
                $cat_name_escaped = addslashes($cat_name);
                $results = $wpdb->get_results("SELECT cat_ID FROM $wpdb->categories WHERE (LOWER(cat_name) = LOWER('$cat_name_escaped'))");

                if ($results) {
                    foreach ($results as $term) {
                        $cat_ids[] = (int) $term->cat_ID;
                    }
                } elseif ($this->current_feed['options']['undefined_category'] == 'create_new') {
                    if (function_exists('wp_insert_category')) {
                        $cat_id = wp_insert_category(array('cat_name' => $cat_name));
                    } else {
                        $cat_name_sanitized = sanitize_title($cat_name);
                        $wpdb->query("INSERT INTO $wpdb->categories SET cat_name='$cat_name_escaped', category_nicename='$cat_name_sanitized'");
                        $cat_id = $wpdb->insert_id;
                    }
                    $cat_ids[] = $cat_id;
                }
            }
        }
        if ((count($cat_ids) != 0)) {
            $cat_ids = array_unique($cat_ids);
        }
        return $cat_ids;
    }

    function categoryChecklist($post_id = 0, $descendents_and_self = 0, $selected_cats = false) {
        wp_category_checklist($post_id, $descendents_and_self, $selected_cats);
    }

    function categoryListBox($checked, $title) {
        echo '<div id="categorydiv" class="postbox">' . "\n";
        echo '<ul id="category-tabs">' . "\n";
        echo '<li class="ui-tabs-selected">' . "\n";
        echo '<p>' . $title . '</p>' . "\n";
        echo '</li>' . "\n";
        echo '</ul>' . "\n";

        echo '<div id="categories-all" class="cybersyn-ui-tabs-panel">' . "\n";
        echo '<ul id="categorychecklist" class="list:category categorychecklist form-no-clear">' . "\n";
        $this->categoryChecklist(NULL, false, $checked);
        echo '</ul>' . "\n";
        echo '</div><br />' . "\n";
        echo '</div>' . "\n";
    }

    function showSettings($islocal, $settings) {
        global $wpdb;
        echo '<form name="feed_settings" action="' . preg_replace('/\&edit-feed-id\=[0-9]+/', '', csyn_REQUEST_URI()) . '" method="post">' . "\n";
        ?>

        <script type='text/javascript'>
            function changeTranslator() {
                var mode = document.feed_settings.translator.value;
                var yandex_translate = document.getElementById("yandex_translate_settings");
                var google_translate = document.getElementById("google_translate_settings");
                yandex_translate.style.display = 'none';
                google_translate.style.display = 'none';
                if (mode == "yandex_translate") {
                    yandex_translate.style.display = 'inline';
                }
                if (mode == "google_translate") {
                    google_translate.style.display = 'inline';
                }
            }
        </script>

        <table class="form-table">
            <tbody>
                <?php
                if ($islocal && !is_object($this->current_feed_url)) {
                    ?>
                    <tr>
                        <th scope="row">Feed title:</th>
                        <td>
                            <input type="text" name="feed_title" size="132" value="<?php echo ($this->edit_existing) ? $this->feeds [(int) $_GET["edit-feed-id"]]['title'] : $this->feed_title; ?>">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Feed URL</th>
                        <td><input type="text" name="new_feed_url" size="132" value="<?php echo htmlspecialchars($this->current_feed_url); ?>" disabled>
                        </td>
                    </tr>
                    <?php
                }
                ?>

                <tr>
                    <th scope="row"><?php
                        if ($islocal) {
                            echo "Syndicate this feed to the following categories";
                        } else {
                            echo "Syndicate new feeds to the following categories";
                        }
                        ?>
                    </th>
                    <td>
                        <div id="categorydiv">
                            <div id="categories-all" class="cybersyn-ui-tabs-panel">
                                <ul id="categorychecklist" class="list:category categorychecklist form-no-clear">
                                    <?php
                                    $this->categoryChecklist(NULL, false, $settings['post_category']);
                                    ?>
                                </ul>
                            </div>
                        </div>
                    </td>
                </tr>

                <?php if (get_option(CSYN_FULL_TEXT_EXTRACTOR)) { ?>
                    <tr>
                        <th scope="row">Extract full articles</th>
                        <td><?php echo '<input type="checkbox" name="extract_full_articles" ' . (($settings['extract_full_articles'] == 'on') ? 'checked ' : '') . '>'; ?>
                            <label>when enabled, CyberSEO will try to extract the full articles from shortened RSS feeds.</label>
                            <p class="description"><strong>Important: if the plugin will not be able to retrieve the full-text article, the post won't be added.</strong></p>
                        </td>
                    </tr>
                    <?php
                }
                ?>

                <?php
                if (has_filter('wpml_active_languages')) {
                    $languages = apply_filters('wpml_active_languages', NULL, 'orderby=id&order=desc');
                } else {
                    $languages = array();
                }
                ?> 
                <tr>
                    <th scope="row"><a href="https://www.cyberseo.net/partners/wpml.php" target="_blank" rel="nofollow">WPML</a> language</th>
                    <td>
                        <select name="wpml_language" size="1" if <?php if (!count($languages)) echo 'disabled'; ?>>
                            <?php
                            echo '<option ' . (($settings["wpml_language"] == '') ? 'selected ' : '') . 'value="">Default WPLM language</option>';
                            echo '<option ' . (($settings["wpml_language"] == 'all') ? 'selected ' : '') . 'value="all">All WPLM languages</option>';
                            if (count($languages)) {
                                foreach ($languages as $l) {
                                    echo '<option ' . (($settings["wpml_language"] == $l['language_code']) ? 'selected ' : '') . 'value = "' . $l['language_code'] . '" style = "background-image:url(' . $l['country_flag_url'] . ');">' . $l['native_name'] . '</option>';
                                }
                                echo '</select>';
                            }
                            ?>  
                        </select>   
                        <p class="description">assign a WPML language to every post or page generated from this content source.</p>
                    </td>
                </tr>  

                <?php
                if (function_exists('csyn_spinners_dropbox')) {
                    csyn_spinners_dropbox($settings);
                }
                ?>

                <tr>
                    <th scope="row">Attribute all posts to the following user</th>
                    <td><select name="post_author" size="1">
                            <?php
                            $wp_user_search = get_users();
                            foreach ($wp_user_search as $userid) {
                                echo '<option ' . (($settings["post_author"] == $userid->ID) ? 'selected ' : '') . 'value="' . $userid->ID . '">' . $userid->display_name . "\n";
                            }
                            ?>
                        </select></td>
                </tr>

                <tr>
                    <th scope="row">Undefined categories</th>
                    <td><select name="undefined_category" size="1">
                            <?php
                            if ($islocal) {
                                echo '<option ' . (($settings["undefined_category"] == "use_global") ? 'selected ' : '') . 'value="use_global">Use RSS/Atom default settings</option>' . "\n";
                            }
                            echo '<option ' . (($settings["undefined_category"] == "use_default") ? 'selected ' : '') . 'value="use_default">Post to default WordPress category</option>' . "\n";
                            echo '<option ' . (($settings["undefined_category"] == "create_new") ? 'selected ' : '') . 'value="create_new">Create new categories defined in syndicating post</option>' . "\n";
                            echo '<option ' . (($settings["undefined_category"] == "drop") ? 'selected ' : '') . 'value="drop">Do not syndicate post that doesn\'t match at least one category defined above</option>' . "\n";
                            ?>
                        </select></td>
                </tr>
                <tr>
                    <th scope="row">Create tags from category names</th>
                    <td><?php
                        echo '<input type="checkbox" name="create_tags" ' . (($settings['create_tags'] == 'on') ? 'checked ' : '') . '> if enabled, post category names will be added as post tags.';
                        ?>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Post tags (separate with commas)</th>
                    <td><?php
                        echo '<input type="text" name="post_tags" value="' . stripslashes($settings['post_tags']) . '" size="60">';
                        ?>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Check for duplicate posts by</th>
                    <td><select name="duplicate_check_method" size="1">
                            <?php
                            echo '<option ' . (($settings["duplicate_check_method"] == "guid_and_title") ? 'selected ' : '') . 'value="guid_and_title">GUID and title</option>' . "\n";
                            echo '<option ' . (($settings["duplicate_check_method"] == "guid") ? 'selected ' : '') . 'value="guid">GUID only</option>' . "\n";
                            echo '<option ' . (($settings["duplicate_check_method"] == "title") ? 'selected ' : '') . 'value="title">Title only</option>' . "\n";
                            ?>
                        </select></td>
                </tr>
                <tr>
                    <th scope="row"><?php
                        if ($islocal) {
                            echo 'Check this feed for updates every</td><td><input type="text" name="update_interval" value="' . $settings['interval'] . '" size="4"> minutes. If you don\'t need automatic updates set this parameter to 0.';
                        } else {
                            echo 'Check syndicated feeds for updates every</td><td><input type="text" name="update_interval" value="' . $settings['interval'] . '" size="4"> minutes. If you don\'t need auto updates, just set this parameter to 0.';
                        }
                        if (defined("CSYN_MIN_UPDATE_TIME")) {
                            echo " <strong>This option is limited by Administrator:<strong> the update period can not be less than " . CSYN_MIN_UPDATE_TIME . " minutes.";
                        }
                        ?>
                    </th>
                </tr>
                <tr>
                    <th scope="row">Maximum number of posts to be syndicated from each feed at once</th>
                    <td><?php
                        echo '<input type="text" name="max_items" value="' . $settings['max_items'] . '" size="3">' . " - use low values to decrease the syndication time and improve SEO of your blog.";
                        ?>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Posts status</th>
                    <td><select name="post_status" size="1">
                            <?php
                            echo '<option ' . (($settings["post_status"] == "publish") ? 'selected ' : '') . 'value="publish">Publish immediately</option>' . "\n";
                            echo '<option ' . (($settings["post_status"] == "pending") ? 'selected ' : '') . 'value="pending">Hold for review</option>' . "\n";
                            echo '<option ' . (($settings["post_status"] == "draft") ? 'selected ' : '') . 'value="draft">Save as draft</option>' . "\n";
                            echo '<option ' . (($settings["post_status"] == "private") ? 'selected ' : '') . 'value="private">Save as private</option>' . "\n";
                            ?>
                        </select></td>
                </tr>
                <tr>
                    <th scope="row">Comments</th>
                    <td><select name="post_comments" size="1">
                            <?php
                            echo '<option ' . (($settings['comment_status'] == 'open') ? 'selected ' : '') . 'value="open">Allow comments on syndicated posts</option>' . "\n";
                            echo '<option ' . (($settings['comment_status'] == 'closed') ? 'selected ' : '') . 'value="closed">Disallow comments on syndicated posts</option>' . "\n";
                            ?>
                        </select></td>
                </tr>
                <tr>
                    <th scope="row">Pings</th>
                    <td><select name="post_pings" size="1">
                            <?php
                            echo '<option ' . (($settings['ping_status'] == 'open') ? 'selected ' : '') . 'value="open">Accept pings</option>' . "\n";
                            echo '<option ' . (($settings['ping_status'] == 'closed') ? 'selected ' : '') . 'value="closed">Don\'t accept pings</option>' . "\n";
                            ?>
                        </select></td>
                </tr>
                <tr>
                    <th scope="row">Base date</th>
                    <td><select name="post_publish_date" size="1">
                            <?php
                            echo '<option ' . (($settings['base_date'] == 'post') ? 'selected ' : '') . 'value="post">Get date from post</option>' . "\n";
                            echo '<option ' . (($settings['base_date'] == 'syndication') ? 'selected ' : '') . 'value="syndication">Use syndication date</option>' . "\n";
                            ?>
                        </select></td>
                </tr>

                <tr>
                    <th scope="row">Media attachments</th>
                    <td><select name="insert_media_attachments" size="1">
                            <?php
                            echo '<option ' . (($settings["insert_media_attachments"] == "no") ? 'selected ' : '') . 'value="no">Do not insert attachments</option>' . "\n";
                            echo '<option ' . (($settings["insert_media_attachments"] == "top") ? 'selected ' : '') . 'value="top">Insert attachments at the top of the post</option>' . "\n";
                            echo '<option ' . (($settings["insert_media_attachments"] == "bottom") ? 'selected ' : '') . 'value="bottom">Insert attachments at the bottom of the post</option>' . "\n";
                            ?>
                        </select> - if enabled CyberSEO syndicator will insert media attachments (if available) into the aggregating post.
                        <p class="description">The following types of attachments are supported: <strong>&lt;media:content&gt;</strong>, <strong>&lt;media:thumbnail&gt;</strong> and <strong>&lt;enclosure&gt;.</strong> All the aggregated images will contain <strong>class="media_thumbnail"</strong> in the <strong>&lt;img&gt;</strong> tag.</p>
                    </td>
                </tr>

                <tr>
                    <th scope="row">Post thumbnail source</th>
                    <td><select name="set_thumbnail" size="1">
                            <?php
                            echo '<option ' . (($settings["set_thumbnail"] == "no_thumb") ? 'selected ' : '') . 'value="no_thumb">Do not generate</option>';
                            echo '<option ' . (($settings["set_thumbnail"] == "first_image") ? 'selected ' : '') . 'value="first_image">Generate from the first post image</option>';
                            echo '<option ' . (($settings["set_thumbnail"] == "last_image") ? 'selected ' : '') . 'value="last_image">Generate from the last post image</option>';
                            echo '<option ' . (($settings["set_thumbnail"] == "media_attachment") ? 'selected ' : '') . 'value="media_attachment">Generate from media attachment thumbnail</option>';
                            ?>
                        </select>
                        <p class="description">Select the source image for the post thumbnail.</p>
                    </td>
                </tr>

                <tr>
                    <th scope="row">Post thumbnail is required</th>
                    <td><?php
                        echo '<input type="checkbox" name="require_thumbnail" ' . (($settings['require_thumbnail'] == 'on') ? 'checked ' : '') . '> - if the plugin will not be able to create post thumbnail 
                            as specifiedabove (e.g. the source image is missing or broken), <strong>the post will be deleted!</strong>';
                        ?>
                    </td>
                </tr>                

                <tr>
                    <th scope="row">Convert character encoding</th>
                    <td><?php
                        echo '<input type="checkbox" name="convert_encoding" ' . (($settings['convert_encoding'] == 'on') ? 'checked ' : '') . '> - enables character encoding conversion. This option might be useful when parsing XML/RSS feeds in national charsets different than UTF-8.';
                        ?>
                    </td>
                </tr>

                <tr>
                    <th scope="row">Store images locally</th>
                    <td><?php
                        echo '<input type="checkbox" name="store_images" ' . (($settings['store_images'] == 'on') ? 'checked ' : '') . '> - if enabled, all images from the syndicating feeds will be copied into the default uploads folder of this blog. Make sure that your /wp-content/uploads folder is writable.';
                        ?>
                    </td>
                </tr>

                <tr>
                    <th scope="row">Post date adjustment range</th>
                    <td><?php
                        echo '[<input type="text" name="date_min" value="' . $settings['date_min'] . '" size="6"> .. <input type="text" name="date_max" value="' . $settings['date_max'] . '" size="6">]';
                        ?> - here you can set the syndication date adjustment range in minutes.
                        <p class="description">This range will be used to randomly adjust the publication date for every aggregated post. For example, if you set the adjustment range as [0..60], the post dates will be increased by a random value between 0 and 60 minutes.</p>
                    </td>
                </tr>

                <tr>
                    <th scope="row">Post footer</th>
                    <td><?php
                        echo '<input type="text" name="post_footer" value="' . htmlspecialchars(stripslashes($settings['post_footer']), ENT_QUOTES) . '" size="60">';
                        echo ' - the HTML code wich will be inserted into the bottom of each syndicated post.';
                        ?>
                        <p class="description">Use a <strong>%link%</strong> keyword for a link to the original article. E.g.: <strong>&lt;a href="%link%"&gt;Source&lt;/a&gt;</strong></p>
                    </td>
                </tr>

                <tr>
                    <th scope="row">Insert post footer into excerpts</th>
                    <td><?php
                        echo '<input type="checkbox" name="include_post_footers" ' . (($settings['include_post_footers'] == 'on') ? 'checked ' : '') . '> - enable this option if you want to insert the post footer into the post excerpt.';
                        ?>
                    </td>
                </tr>

                <tr>
                    <th scope="row">Shorten post excerpts</th>
                    <td><?php
                        echo '<input type="text" name="shorten_excerpts" value="' . $settings['shorten_excerpts'] . '" size="3">' . " - set the max number of words to be left in the post excerpts. Use 0 to remove the excerpts completely or leave it blank to keep the excerpts untouched.";
                        ?>
                    </td>
                </tr>

                <tr>
                    <th scope="row">Embed videos</th>
                    <td><?php
                        echo '<input type="checkbox" name="embed_videos" ' . (($settings['embed_videos'] == 'on') ? 'checked ' : '') . '> - the embeddable videos will be automatically extracted and inserted into the posts. Supported feed sources: YouTube, Vimeo, Flickr, IGN, DailyMotion, Ustream.tv.';
                        ?>
                        <p class="description">Video feed examples: https://www.youtube.com/feeds/videos.xml?user=vevo, https://vimeo.com/channels/wefoundthese/videos/rss etc</p>
                    </td>
                </tr>

                <tr>
                    <th scope="row">Translation</th>
                    <td>
                        <select name="translator" size="1" onchange="changeTranslator();">
                            <?php
                            echo '<option ' . (($settings["translator"] == "none") ? 'selected ' : '') . 'value="none">Do not translate</option>';
                            echo '<option ' . (($settings["translator"] == "yandex_translate") ? 'selected ' : '') . 'value="yandex_translate">Use Yandex Translate</option>';
                            echo '<option ' . (($settings["translator"] == "google_translate") ? 'selected ' : '') . 'value="google_translate">Use Google Translate</option>';
                            ?>
                        </select>

                        <span id="yandex_translate_settings">
                            &nbsp;&nbsp;&nbsp;
                            Direction:
                            <select name="yandex_translation_dir">
                                <?php
                                $langs = get_option(CSYN_YANDEX_TRANSLATE_LANGS);
                                asort($langs);
                                foreach ($langs as $dir => $lang) {
                                    echo '<option ' . (($settings["yandex_translation_dir"] == $dir) ? 'selected ' : '') . 'value="' . $dir . '">' . $lang . '</option>';
                                }
                                ?>
                            </select>
                            &nbsp;&nbsp;&nbsp;
                            Yandex API key:
                            <?php
                            echo '<input type="text" name="yandex_api_key" value="' . htmlspecialchars(stripslashes($settings['yandex_api_key']), ENT_QUOTES) . '" size="60">';
                            ?>
                            <br />
                            <p class="description">Enter your API key above in order to use Yandex Translate. If you don't have one, <a href="https://tech.yandex.com/key/form.xml?service=trnsl" target="_blank" title="Get Yandex API key">get it here</a>. Don't worry, it's free ;)</p>
                        </span>

                        <span id="google_translate_settings">
                            &nbsp;&nbsp;&nbsp;
                            Source:
                            <select name="google_translation_source">
                                <?php
                                $langs = get_option(CSYN_GOOGLE_TRANSLATE_LANGS);
                                asort($langs);
                                foreach ($langs as $dir => $lang) {
                                    echo '<option ' . (($settings["google_translation_source"] == $dir) ? 'selected ' : '') . 'value="' . $dir . '">' . $lang . '</option>';
                                }
                                ?>
                            </select>
                            &nbsp;&nbsp;&nbsp;
                            Target:
                            <select name="google_translation_target">
                                <?php
                                foreach ($langs as $dir => $lang) {
                                    echo '<option ' . (($settings["google_translation_target"] == $dir) ? 'selected ' : '') . 'value="' . $dir . '">' . $lang . '</option>';
                                }
                                ?>
                            </select>
                            &nbsp;&nbsp;&nbsp;
                            Google API key:
                            <?php
                            echo '<input type="text" name="google_api_key" value="' . htmlspecialchars(stripslashes($settings['google_api_key']), ENT_QUOTES) . '" size="60">';
                            ?>
                            <br />
                            <p class="description">Enter your API key above in order to use Google Translate. If you don't have one, <a href="https://cloud.google.com/translate/docs/getting-started" target="_blank" title="Get Google API key">get it here</a>. Please note: this is a paid service.</p>
                        </span>

                    </td>
                </tr>

            </tbody>
        </table>
        <?php
        wp_nonce_field('xml_syndicator');
        echo '<div class="submit">' . "\n";
        if ($islocal) {
            if ($this->edit_existing) {
                echo '<input class="button-primary" name="update_feed_settings" value="Update Feed Settings" type="submit">' . "\n";
                echo '<input class="button" name="cancel" value="Cancel" type="submit">' . "\n";
                echo '<input type="hidden" name="feed_id" value="' . (int) $_GET["edit-feed-id"] . '">' . "\n";
            } else {
                echo '<input class="button-primary" name="syndicate_feed" value="Syndicate This Feed" type="submit">' . "\n";
                echo '<input class="button" name="cancel" value="Cancel" type="submit">' . "\n";
                echo '<input type="hidden" name="feed_url" value="' . $this->current_feed_url . '">' . "\n";
            }
        } else {
            echo '<input class="button-primary" name="update_default_settings" value="Update Default Settings" type="submit">' . "\n";
        }
        ?>
        </div>
        </form>
        <script type='text/javascript'>
            changeTranslator();
        </script>
        <?php
    }

    function getUpdateTime($feed) {
        $time = time();
        $interval = 60 * (int) $feed['options']['interval'];
        $updated = (int) $feed['updated'];
        if ($feed['options']['interval'] == 0) {
            return "never";
        } elseif (($time - $updated) >= $interval) {
            return "asap";
        } else {
            return "in " . (int) (($interval - ($time - $updated)) / 60) . " minutes";
        }
    }

    function showMainPage($showsettings = true) {
        if (defined('CSYN_SPINNER_VERSION')) {
            $args = '&spinner_ver=' . CSYN_SPINNER_VERSION;
        } else {
            $args = '';
        }
        echo csyn_file_get_contents('http://www.cyberseo.net/info/CyberSEO/ad-lite.php?site=' . urlencode(site_url()) . $args);
        echo '<form action="' . csyn_REQUEST_URI() . '" method="post">' . "\n";
        echo '<table class="form-table" width="100%">';
        echo "<tr><td align=\"right\">\n";
        echo 'New Feed URL: <input type="text" name="feed_url" value="" size="100">' . "\n";
        echo '&nbsp;<input class="button-primary" name="new_feed" value="Syndicate &raquo;" type="submit">' . "\n";
        echo "</td></tr>\n";
        echo "</table>\n";
        echo "</form>";
        echo '<form id="syndycated_feeds" action="' . csyn_REQUEST_URI() . '" method="post">' . "\n";
        if (count($this->feeds) > 0) {
            echo '<table class="widefat" style="margin-top: .5em" width="100%">' . "\n";
            echo '<thead>' . "\n";
            echo '<tr>' . "\n";
            echo '<th scope="row" width="3%"><input type="checkbox" onclick="checkAll(document.getElementById(\'syndycated_feeds\'));"></th>' . "\n";
            echo '<th scope="row" width="25%">Feed title</th>' . "\n";
            echo '<th scope="row" width="50%">URL</th>' . "\n";
            echo '<th scope="row" width="10%">Next update</th>' . "\n";
            echo '<th scope="row" width="12%">Last update</th>' . "\n";
            echo "</tr>\n";
            echo '</thead>' . "\n";
            for ($i = 0; $i < count($this->feeds); $i++) {
                if (isset($this->feeds[$i]['url']) && is_string($this->feeds[$i]['url'])) {
                    if ($i % 2) {
                        echo "<tr>\n";
                    } else {
                        echo '<tr class="alternate">' . "\n";
                    }
                    echo '<th align="center"><input name="feed_ids[]" value="' . $i . '" type="checkbox"></th>' . "\n";
                    echo '<td>' . $this->feeds[$i]['title'] . ' [<a href="' . csyn_REQUEST_URI() . '&edit-feed-id=' . $i . '">edit</a>]</td>' . "\n";
                    echo '<td>' . '<a href="' . $this->feeds[$i]['url'] . '" target="_blank">' . csyn_short_str(htmlspecialchars($this->feeds[$i]['url']), 100) . '</a></td>' . "\n";
                    echo "<td>" . $this->getUpdateTime($this->feeds[$i]) . "</td>\n";
                    $last_update = $this->feeds[$i]['updated'];
                    if ($last_update) {
                        echo "<td>" . intval((time() - $last_update) / 60) . " minutes ago</td>\n";
                    } else {
                        echo "<td> - </td>\n";
                    }
                    echo "</tr>\n";
                }
            }
            echo "</table>\n";
        }
        ?>
        <div class="submit">
            <table width="100%">
                <tr>
                    <td>
                        <div align="left">
                            <input class="button-primary" name="check_for_updates" value="Pull selected feeds now!" type="submit">
                        </div>
                    </td>
                    <td>
                        <div align="right">
                            <input class="button secondary" name="delete_feeds_and_posts" value="Delete selected feeds and syndicated posts" type="submit">
                            <input class="button secondary" name="delete_feeds" value="Delete selected feeds" type="submit">
                            <input class="button secondary" name="delete_posts" value="Delete posts syndycated from selected feeds" type="submit">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td><br />
                        <div align="right">
                            <input class="button secondary" name="alter_default_settings" value="Alter default settings" type="submit">
                        </div>
                    </td>
                </tr>
            </table>
            <?php wp_nonce_field('xml_syndicator'); ?>
        </form>
        </div>
        <?php
        if ($showsettings) {
            $this->showSettings(false, $this->global_options);
        }
    }

}

function csyn_parse_special_words($content) {
    global $csyn_syndicator;
    $content = str_replace('####post_link####', $csyn_syndicator->post['link'], $content);
    $content = str_replace('%link%', $csyn_syndicator->post['link'], $content);
    return $content;
}

function csyn_touch_post_content($content, $attachment = "", $attachment_status = "no", $inc_footers = true) {
    global $csyn_syndicator;

    if ($attachment != "") {
        if ($attachment_status == "top") {
            $content = $attachment . $content;
        } elseif ($attachment_status == "bottom") {
            $content .= $attachment;
        }
    }

    $footer = stripslashes($csyn_syndicator->current_feed['options']['post_footer']);

    if ($inc_footers && strlen($footer)) {
        $content .= csyn_parse_special_words(trim($footer));
    }

    return $content;
}

function csyn_syndicator_menu() {
    global $csyn_syndicator;
    if (!function_exists("get_option") || !function_exists("add_filter")) {
        die();
    }
    if (isset($_POST["update_feed_settings"]) || isset($_POST["check_for_updates"]) || isset($_POST["delete_feeds"]) || isset($_POST["delete_posts"]) || isset($_POST["feed_ids"]) || isset($_POST["syndicate_feed"]) || isset($_POST["update_default_settings"]) || isset($_POST["alter_default_settings"])) {
        if (!check_admin_referer('xml_syndicator')) {
            echo 'Sorry, your nonce did not verify.';
            die();
        }
    }
    ?>

    <style type="text/css">
        div.cybersyn-ui-tabs-panel {
            margin: 0 5px 0 0px;
            padding: .5em .9em;
            height: 11em;
            width: 675px;
            overflow: auto;
            border: 1px solid #dfdfdf;
        }

        .error a {
            color: #100;
        }
    </style>

    <script type="text/javascript">
        function checkAll(form) {
            for (i = 0, n = form.elements.length; i < n; i++) {
                if (form.elements[i].type == "checkbox" && !(form.elements[i].getAttribute('onclick', 2))) {
                    if (form.elements[i].checked == true)
                        form.elements[i].checked = false;
                    else
                        form.elements[i].checked = true;
                }
            }
        }
    </script>

    <div class="wrap">
        <?php
        if (isset($_POST["alter_default_settings"])) {
            echo('<h2>CyberSEO Lite RSS/Atom Syndicator - Default Settings</h2>');
        } else {
            echo('<h2>CyberSEO Lite RSS/Atom Syndicator</h2>');
        }
        if (isset($_GET["edit-feed-id"])) {
            $csyn_syndicator->feedPreview($csyn_syndicator->fixURL($csyn_syndicator->feeds[(int) $_GET["edit-feed-id"]]['url']), true);
            $csyn_syndicator->showSettings(true, $csyn_syndicator->feeds[(int) $_GET["edit-feed-id"]]['options']);
        } elseif (isset($_POST["update_feed_settings"])) {
            $date_min = (int) $_POST['date_min'];
            $date_max = (int) $_POST['date_max'];
            if ($date_min > $date_max) {
                $date_min = $date_max;
            }
            if (mb_strlen(trim(stripslashes(htmlspecialchars($_POST['feed_title'], ENT_NOQUOTES)))) == 0) {
                $_POST['feed_title'] = "no name";
            }
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['title'] = trim(stripslashes(htmlspecialchars($_POST['feed_title'], ENT_NOQUOTES)));

            if ((int) $_POST['update_interval'] == 0) {
                $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['interval'] = 0;
            } else {
                $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['interval'] = abs((int) $_POST['update_interval']);
            }
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['post_status'] = sanitize_text_field($_POST['post_status']);
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['comment_status'] = sanitize_text_field($_POST['post_comments']);
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['ping_status'] = sanitize_text_field($_POST['post_pings']);
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['post_author'] = intval($_POST['post_author']);
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['base_date'] = sanitize_text_field($_POST['post_publish_date']);
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['max_items'] = abs(intval($_POST['max_items']));
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['post_category'] = @$_POST['post_category'];
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['duplicate_check_method'] = sanitize_text_field($_POST['duplicate_check_method']);
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['undefined_category'] = sanitize_text_field($_POST['undefined_category']);
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['date_min'] = $date_min;
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['date_max'] = $date_max;
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['insert_media_attachments'] = sanitize_text_field($_POST['insert_media_attachments']);
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['set_thumbnail'] = sanitize_text_field($_POST['set_thumbnail']);
            if (isset($csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['synonymizer_mode'])) {
                $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['synonymizer_mode'] = sanitize_text_field($_POST['synonymizer_mode']);
            }
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['convert_encoding'] = csyn_sanitize_checkbox(@$_POST['convert_encoding']);
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['require_thumbnail'] = csyn_sanitize_checkbox(@$_POST['require_thumbnail']);
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['store_images'] = csyn_sanitize_checkbox(@$_POST['store_images']);
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['include_post_footers'] = csyn_sanitize_checkbox(@$_POST['include_post_footers']);
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['embed_videos'] = csyn_sanitize_checkbox(@$_POST['embed_videos']);
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['translator'] = sanitize_text_field($_POST['translator']);
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['yandex_translation_dir'] = sanitize_text_field($_POST['yandex_translation_dir']);
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['yandex_api_key'] = sanitize_text_field($_POST['yandex_api_key']);
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['google_translation_source'] = sanitize_text_field($_POST['google_translation_source']);
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['google_translation_target'] = sanitize_text_field($_POST['google_translation_target']);
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['google_api_key'] = sanitize_text_field($_POST['google_api_key']);
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['create_tags'] = csyn_sanitize_checkbox(@$_POST['create_tags']);
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['extract_full_articles'] = csyn_sanitize_checkbox(@$_POST['extract_full_articles']);
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['wpml_language'] = sanitize_text_field(@$_POST['wpml_language']);
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['post_tags'] = sanitize_text_field($_POST['post_tags']);
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['post_footer'] = $_POST['post_footer'];
            $csyn_syndicator->feeds[intval($_POST["feed_id"])]['options']['shorten_excerpts'] = sanitize_text_field($_POST['shorten_excerpts']);
            update_option(CSYN_SYNDICATED_FEEDS, $csyn_syndicator->feeds);
            $csyn_syndicator->showMainPage(false);
        } elseif (isset($_POST["check_for_updates"])) {
            $csyn_syndicator->show_report = true;
            $csyn_syndicator->syndicateFeeds(@array_map('absint', $_POST["feed_ids"]), false);
            $csyn_syndicator->showMainPage(false);
        } elseif (isset($_POST["delete_feeds"]) && isset($_POST["feed_ids"])) {
            $csyn_syndicator->deleteFeeds(@array_map('absint', $_POST["feed_ids"]), false, true);
            $csyn_syndicator->showMainPage(false);
        } elseif (isset($_POST["delete_posts"]) && isset($_POST["feed_ids"])) {
            $csyn_syndicator->deleteFeeds(@array_map('absint', $_POST["feed_ids"]), true, false);
            $csyn_syndicator->showMainPage(false);
        } elseif (isset($_POST["delete_feeds_and_posts"]) && isset($_POST["feed_ids"])) {
            $csyn_syndicator->deleteFeeds(@array_map('absint', $_POST["feed_ids"]), true, true);
            $csyn_syndicator->showMainPage(false);
        } elseif (isset($_POST["new_feed"]) && strlen($_POST["feed_url"]) > 0) {
            if ($csyn_syndicator->feedPreview($csyn_syndicator->fixURL($_POST["feed_url"]), false)) {
                $options = $csyn_syndicator->global_options;
                $options['undefined_category'] = 'use_global';
                $csyn_syndicator->showSettings(true, $options);
            } else {
                $csyn_syndicator->showMainPage(false);
            }
        } elseif (isset($_POST["syndicate_feed"])) {
            $date_min = (int) $_POST['date_min'];
            $date_max = (int) $_POST['date_max'];
            if ($date_min > $date_max) {
                $date_min = $date_max;
            }
            if (mb_strlen(trim(stripslashes(htmlspecialchars($_POST['feed_title'], ENT_NOQUOTES)))) == 0) {
                $_POST['feed_title'] = "no name";
            }

            if ((int) $_POST['update_interval'] == 0) {
                $update_interval = 0;
            } else {
                $update_interval = abs((int) $_POST['update_interval']);
            }
            $feed = array();
            $feed['title'] = trim(stripslashes(htmlspecialchars($_POST['feed_title'], ENT_NOQUOTES)));
            $feed['url'] = esc_url_raw($_POST['feed_url']);
            $feed['updated'] = 0;
            $feed['options']['interval'] = $update_interval;
            if (isset($_POST['post_category'])) {
                $feed['options']['post_category'] = array_map('absint', $_POST['post_category']);
            } else {
                $feed['options']['post_category'] = array();
            }
            $feed['options']['post_status'] = sanitize_text_field($_POST['post_status']);
            $feed['options']['comment_status'] = sanitize_text_field($_POST['post_comments']);
            $feed['options']['ping_status'] = sanitize_text_field($_POST['post_pings']);
            $feed['options']['post_author'] = intval($_POST['post_author']);
            $feed['options']['base_date'] = sanitize_text_field($_POST['post_publish_date']);
            $feed['options']['duplicate_check_method'] = sanitize_text_field($_POST['duplicate_check_method']);
            $feed['options']['undefined_category'] = sanitize_text_field($_POST['undefined_category']);
            $feed['options']['date_min'] = $date_min;
            $feed['options']['date_max'] = $date_max;
            $feed['options']['insert_media_attachments'] = sanitize_text_field($_POST['insert_media_attachments']);
            $feed['options']['set_thumbnail'] = sanitize_text_field($_POST['set_thumbnail']);
            if (isset($feed['options']['synonymizer_mode'])) {
                $feed['options']['synonymizer_mode'] = sanitize_text_field($_POST['synonymizer_mode']);
            }
            $feed['options']['convert_encoding'] = csyn_sanitize_checkbox(@$_POST['convert_encoding']);
            $feed['options']['require_thumbnail'] = csyn_sanitize_checkbox(@$_POST['require_thumbnail']);
            $feed['options']['store_images'] = csyn_sanitize_checkbox(@$_POST['store_images']);
            $feed['options']['include_post_footers'] = csyn_sanitize_checkbox(@$_POST['include_post_footers']);
            $feed['options']['embed_videos'] = csyn_sanitize_checkbox(@$_POST['embed_videos']);
            $feed['options']['translator'] = sanitize_text_field($_POST['translator']);
            $feed['options']['yandex_translation_dir'] = sanitize_text_field($_POST['yandex_translation_dir']);
            $feed['options']['yandex_api_key'] = sanitize_text_field($_POST['yandex_api_key']);
            $feed['options']['google_translation_source'] = sanitize_text_field($_POST['google_translation_source']);
            $feed['options']['google_translation_target'] = sanitize_text_field($_POST['google_translation_target']);
            $feed['options']['google_api_key'] = sanitize_text_field($_POST['google_api_key']);
            $feed['options']['create_tags'] = csyn_sanitize_checkbox(@$_POST['create_tags']);
            $feed['options']['extract_full_articles'] = csyn_sanitize_checkbox(@$_POST['extract_full_articles']);
            $feed['options']['wpml_language'] = sanitize_text_field(@$_POST['wpml_language']);
            $feed['options']['max_items'] = abs((int) $_POST['max_items']);
            $feed['options']['post_tags'] = sanitize_text_field($_POST['post_tags']);
            $feed['options']['post_footer'] = $_POST['post_footer'];
            $feed['options']['shorten_excerpts'] = abs(intval($_POST['shorten_excerpts']));
            $feed['options']['last_archive_page'] = 2;
            $id = array_push($csyn_syndicator->feeds, $feed);
            if ((intval($update_interval)) != 0) {
                $csyn_syndicator->show_report = false;
                $csyn_syndicator->syndicateFeeds(array($id), false);
            }
            sort($csyn_syndicator->feeds);
            update_option(CSYN_SYNDICATED_FEEDS, $csyn_syndicator->feeds);
            $csyn_syndicator->showMainPage(false);
        } elseif (isset($_POST["update_default_settings"])) {
            $date_min = (int) $_POST['date_min'];
            $date_max = (int) $_POST['date_max'];
            if ($date_min > $date_max) {
                $date_min = $date_max;
            }
            $csyn_syndicator->global_options['interval'] = abs((int) $_POST['update_interval']);
            $csyn_syndicator->global_options['post_status'] = sanitize_text_field($_POST['post_status']);
            $csyn_syndicator->global_options['comment_status'] = sanitize_text_field($_POST['post_comments']);
            $csyn_syndicator->global_options['ping_status'] = sanitize_text_field($_POST['post_pings']);
            $csyn_syndicator->global_options['post_author'] = intval($_POST['post_author']);
            $csyn_syndicator->global_options['base_date'] = sanitize_text_field($_POST['post_publish_date']);
            $csyn_syndicator->global_options['max_items'] = abs((int) $_POST['max_items']);
            if (isset($_POST['post_category'])) {
                $csyn_syndicator->global_options['post_category'] = array_map('absint', $_POST['post_category']);
            } else {
                $csyn_syndicator->global_options['post_category'] = array();
            }
            $csyn_syndicator->global_options['duplicate_check_method'] = sanitize_text_field($_POST['duplicate_check_method']);
            $csyn_syndicator->global_options['undefined_category'] = sanitize_text_field($_POST['undefined_category']);
            $csyn_syndicator->global_options['date_min'] = $date_min;
            $csyn_syndicator->global_options['date_max'] = $date_max;
            $csyn_syndicator->global_options['insert_media_attachments'] = sanitize_text_field($_POST['insert_media_attachments']);
            $csyn_syndicator->global_options['set_thumbnail'] = sanitize_text_field($_POST['set_thumbnail']);
            if (isset($csyn_syndicator->global_options['synonymizer_mode'])) {
                $csyn_syndicator->global_options['synonymizer_mode'] = sanitize_text_field($_POST['synonymizer_mode']);
            }
            $csyn_syndicator->global_options['convert_encoding'] = csyn_sanitize_checkbox(@$_POST['convert_encoding']);
            $csyn_syndicator->global_options['require_thumbnail'] = csyn_sanitize_checkbox(@$_POST['require_thumbnail']);
            $csyn_syndicator->global_options['store_images'] = csyn_sanitize_checkbox(@$_POST['store_images']);
            $csyn_syndicator->global_options['include_post_footers'] = csyn_sanitize_checkbox(@$_POST['include_post_footers']);
            $csyn_syndicator->global_options['embed_videos'] = csyn_sanitize_checkbox(@$_POST['embed_videos']);
            $csyn_syndicator->global_options['translator'] = sanitize_text_field($_POST['translator']);
            $csyn_syndicator->global_options['yandex_translation_dir'] = sanitize_text_field($_POST['yandex_translation_dir']);
            $csyn_syndicator->global_options['yandex_api_key'] = sanitize_text_field($_POST['yandex_api_key']);
            $csyn_syndicator->global_options['google_translation_source'] = sanitize_text_field($_POST['google_translation_source']);
            $csyn_syndicator->global_options['google_translation_target'] = sanitize_text_field($_POST['google_translation_target']);
            $csyn_syndicator->global_options['google_api_key'] = sanitize_text_field($_POST['google_api_key']);
            $csyn_syndicator->global_options['create_tags'] = csyn_sanitize_checkbox(@$_POST['create_tags']);
            $csyn_syndicator->global_options['extract_full_articles'] = csyn_sanitize_checkbox(@$_POST['extract_full_articles']);
            $csyn_syndicator->global_options['wpml_language'] = sanitize_text_field(@$_POST['wpml_language']);
            $csyn_syndicator->global_options['post_tags'] = sanitize_text_field($_POST['post_tags']);
            $csyn_syndicator->global_options['post_footer'] = $_POST['post_footer'];
            $csyn_syndicator->global_options['shorten_excerpts'] = abs(intval($_POST['shorten_excerpts']));
            update_option(CSYN_FEED_OPTIONS, $csyn_syndicator->global_options);
            $csyn_syndicator->showMainPage(false);
        } elseif (isset($_POST["alter_default_settings"])) {
            $csyn_syndicator->showSettings(false, $csyn_syndicator->global_options);
        } else {
            $csyn_syndicator->showMainPage(false);
        }
        ?>
    </div>        
    <?php
}

function csyn_options_menu() {
    if (!function_exists("get_option") || !function_exists("add_filter")) {
        die();
    }
    ?>
    <script type='text/javascript'>
        function changeMode() {
            var mode = document.general_settings.<?php echo CSYN_RSS_PULL_MODE; ?>.value;
            var auto = document.getElementById("auto");
            var cron = document.getElementById("cron");
            if (mode == "auto") {
                auto.style.display = 'block';
                cron.style.display = 'none';
            } else {
                auto.style.display = 'none';
                cron.style.display = 'block';
            }
        }
    </script>
    <?php
    if (isset($_POST['Submit'])) {
        
        if (!check_admin_referer('options')) {
            echo 'Sorry, your nonce did not verify.';
            die();
        }

        $pseudo_cron_interval = intval(@$_POST[CSYN_PSEUDO_CRON_INTERVAL]);
        if ($pseudo_cron_interval < 1) {
            $pseudo_cron_interval = 1;
        }

        $update_csyn_text = array();
        $update_csyn_queries[] = update_option(CSYN_RSS_PULL_MODE, sanitize_text_field($_POST[CSYN_RSS_PULL_MODE]));
        $update_csyn_queries[] = update_option(CSYN_PSEUDO_CRON_INTERVAL, abs(intval($pseudo_cron_interval)));
        $update_csyn_queries[] = update_option(CSYN_DISABLE_DUPLICATION_CONTROL, csyn_sanitize_checkbox(@$_POST[CSYN_DISABLE_DUPLICATION_CONTROL]));
        $update_csyn_queries[] = update_option(CSYN_ENABLE_DEBUG_MODE, csyn_sanitize_checkbox(@$_POST[CSYN_ENABLE_DEBUG_MODE]));
        $update_csyn_queries[] = update_option(CSYN_FULL_TEXT_EXTRACTOR, esc_url_raw($_POST[CSYN_FULL_TEXT_EXTRACTOR]));
        $update_csyn_queries[] = update_option(CSYN_CANONICAL_LINK, csyn_sanitize_checkbox(@$_POST[CSYN_CANONICAL_LINK]));
        $update_csyn_queries[] = update_option(CSYN_LINK_TO_SOURCE, csyn_sanitize_checkbox(@$_POST[CSYN_LINK_TO_SOURCE]));
        $update_csyn_text[] = __('RSS pull mode');
        $update_csyn_text[] = __('Pseudo cron interval');
        $update_csyn_text[] = __('Feed duplication control');
        $update_csyn_text[] = __('Debug mode');
        $update_csyn_text[] = __('Full article extrator path');
        $update_csyn_text[] = __('Canonical link');
        $update_csyn_text[] = __('Link to source');
        $i = 0;
        $text = '';
        foreach ($update_csyn_queries as $update_csyn_query) {
            if ($update_csyn_query) {
                $text .= $update_csyn_text[$i] . ' ' . __('Updated') . '<br />';
                if ($update_csyn_text[$i] == 'RSS pull mode' || $update_csyn_text[$i] == 'Pseudo cron interval') {
                    wp_clear_scheduled_hook('update_by_wp_cron');
                }
            }
            $i++;
        }
        if (empty($text)) {
            $text = __('No Option Updated');
        }
    }

    if (!empty($text)) {
        echo '<div id="message" class="updated fade"><p>' . $text . '</p></div>';
    }
    ?>
    <div class="wrap">
        <?php
        $problems = "";
        $upload_path = wp_upload_dir();
        if (!is_writable($upload_path['path'])) {
            $problems .= "Your " . $upload_path['path'] . " folder is not writable. You must chmod it to 777 if you want to use the \"Store Images Locally\" option.\n<br />";
        }
        if (!function_exists('mb_convert_case')) {
            $problems .= "The required <a href=\"http://php.net/manual/en/book.mbstring.php\" target=\"_blank\">mbstring</a> PHP extension is not installed. You must install it in order to make CyberSEO work properly.\n<br />";
        }
        if (!function_exists('curl_init') && ini_get('safe_mode')) {
            $problems .= "PHP variable <a href=\"http://php.net/manual/en/features.safe-mode.php\" target=\"_blank\">safe_mode</a> is enabled. You must disable it in order to make CyberSEO work properly.\n<br />";
        }
        if (!function_exists('curl_init') && !ini_get('allow_url_fopen')) {
            $problems .= "PHP variable <a href=\"http://php.net/manual/en/filesystem.configuration.php#ini.allow-url-fopen\" target=\"_blank\">allow_url_fopen</a> is disabled. You must enable it in order to make CyberSEO work properly.\n<br />";
        }
        if ($problems != "") {
            echo "<div id=\"message\" class=\"error\"><p>$problems</p></div>\n";
        }
        ?>

        <h2>General Settings</h2>

        <form method="post" action="<?php echo csyn_REQUEST_URI(); ?>" name="general_settings">

            <table class="form-table">
                <tr valign="top">
                    <th align="left">RSS pull mode</th>
                    <td align="left">
                        <select style="width: 160px;" name="<?php echo CSYN_RSS_PULL_MODE; ?>" onchange="changeMode();"<?php
                        if (defined('CSYN_ENABLE_RSS_PULL_MODE') && !CSYN_ENABLE_RSS_PULL_MODE) {
                            echo "disabled";
                        }
                        ?> size="1"><?php
                                    echo '<option ' . ((get_option(CSYN_RSS_PULL_MODE) == "auto") ? 'selected ' : '') . 'value="auto">auto</option>';
                                    echo '<option ' . ((get_option(CSYN_RSS_PULL_MODE) == "cron") ? 'selected ' : '') . 'value="cron">by cron job or manually</option>';
                                    ?></select> set the RSS pulling mode. If you have no access to a crontab, or not sure on how to set a cron job, set the RSS Pull Mode to "auto".
                        <br />

                        <p id="auto">
                            In this mode, the CyberSEO plugin uses WordPress pseudo cron, which will be executed by the WordPress every <input type="text" name="<?php echo CSYN_PSEUDO_CRON_INTERVAL; ?>" size="1" value="<?php echo get_option(CSYN_PSEUDO_CRON_INTERVAL); ?>"> minutes.
                            <br />
                            The pseudo cron will trigger when someone visits your WordPress site, if the scheduled time has passed.
                        </p>

                        <p id="cron">
                            In this mode, you need to manually configure <strong><a href="http://en.wikipedia.org/wiki/Cron" target="_blank">cron</a></strong> at your host. For example, if you want run a cron job once a hour, just add the following line into your crontab:
                            <strong><?php echo "0 * * * * /usr/bin/curl --silent " . get_option('siteurl') . "/?pull-feeds=" . get_option(CSYN_CRON_MAGIC); ?></strong>
                        </p>

                        <?php
                        if (defined('CSYN_ENABLE_RSS_PULL_MODE') && !CSYN_ENABLE_RSS_PULL_MODE) {
                            echo "<strong>This option is blocked by Administrator.</strong>";
                        }
                        ?>
                    </td>
                </tr>

                <tr valign="top">
                    <th align="left">Canonical link</th>
                    <td align="left"><input type="checkbox" name="<?php echo CSYN_CANONICAL_LINK; ?>"
                        <?php
                        if (get_option(CSYN_CANONICAL_LINK) == "on") {
                            echo "checked";
                        }
                        ?> /> when enabled the canonical link to source will be added to the post head metadata. Use this option to give a credit to the original content owner.</td>
                </tr>            

                <tr valign="top">
                    <th align="left">Link to source</th>
                    <td align="left"><input type="checkbox" name="<?php echo CSYN_LINK_TO_SOURCE; ?>"
                        <?php
                        if (get_option(CSYN_LINK_TO_SOURCE) == "on") {
                            echo "checked";
                        }
                        ?> /> when enabled the post titles will be linked to their source pages.</td>
                </tr>

                <tr valign="top">
                    <th scope="row">Full text extractor URL</th>
                    <td>
                        <input type="text" name="<?php echo CSYN_FULL_TEXT_EXTRACTOR; ?>" size="80" value="<?php echo get_option(CSYN_FULL_TEXT_EXTRACTOR); ?>">
                        <p class="description">URL of the full text extracting script.</p>
                    </td>
                </tr>

                <tr valign="top">
                    <th align="left">Disable feed duplication control</th>
                    <td align="left"><input type="checkbox" name="<?php echo CSYN_DISABLE_DUPLICATION_CONTROL; ?>"
                        <?php
                        if (get_option(CSYN_DISABLE_DUPLICATION_CONTROL) == "on") {
                            echo "checked";
                        }
                        ?> /> allows the CyberSEO plugin to add more than one copy of the same feed / content source. Don't confuse it with duplicate post check, which is a different option.
                    </td>
                </tr>

                <tr>
                    <th scope="row">Enable debug mode</th>
                    <td><input type="checkbox" name="<?php echo CSYN_ENABLE_DEBUG_MODE; ?>"
                        <?php
                        if (get_option(CSYN_ENABLE_DEBUG_MODE) == "on") {
                            echo "checked";
                        }
                        ?> />
                        <label>enables PHP debug mode even if it's disabled in "wp-config.php".</label>
                    </td>
                </tr>                   

            </table>

            <br />
            <div align="center">
                <input type="submit" name="Submit" class="button-primary"
                       value="Update Options" />&nbsp;&nbsp;<input type="button"
                       name="cancel" value="Cancel" class="button"
                       onclick="javascript:history.go(-1)" />
            </div>
            <?php wp_nonce_field('options'); ?>
        </form>
    </div>

    <script type='text/javascript'>
        changeMode();
    </script>
    <?php
}

function csyn_spinners_stub() {
    ?>
    <div class="wrap">
        <div class="metabox-holder postbox-container">
            <h2>Content Spinners</h2>
            <table style="width:60%;">
                <tr>
                    <td>
                        In accordance with the WordPress policy, the content spinning scripts can not be hosted at wordpress.org. Thus you have to manually download the spinners.zip
                        archive from <a href="http://www.cyberseo.net/cyberseo-lite" target="_blank"><strong>this page</strong></a>, unpack it and upload the containing 
                        <strong>spinners.php</strong> file to the /wp-content/plugins/cybersyn folder of your site.<br /><br />Don't worry, it's a freeware GPL script, so you don't have
                        to pay for anything. Just download it, unpack and upload into the same folder at your site where cybersyn.php is located.  After that just refresh this page in
                        the browser and the content spinning feature will be instantly available.<br /><br />Sorry for the inconvenience.
                    </td>
                </tr>
            </table>
        </div>    
    </div>    
    <?php
}

function csyn_main_menu() {
    if (function_exists('add_menu_page')) {
        add_menu_page('RSS Feed Syndicator', 'CyberSEO Lite', 'manage_options', 'cyberseo_lite', 'csyn_syndicator_menu');
        add_submenu_page('cyberseo_lite', 'General Settings', 'General Settings', 'manage_options', 'cyberseo_lite_general_settings', 'csyn_options_menu');
        if (function_exists('csyn_spinners_menu')) {
            add_submenu_page('cyberseo_lite', 'Content Spinners', 'Content Spinners', 'manage_options', 'cyberseo_lite_spinners', 'csyn_spinners_menu');
        } else {
            add_submenu_page('cyberseo_lite', 'Content Spinners', 'Content Spinners', 'manage_options', 'cyberseo_lite_spinners', 'csyn_spinners_stub');
        }
    }
}

function csyn_update_feeds() {
    global $csyn_syndicator;
    $feed_cnt = count($csyn_syndicator->feeds);
    if ($feed_cnt > 0) {
        $feed_ids = range(0, $feed_cnt - 1);
        $csyn_syndicator->show_report = false;
        $csyn_syndicator->syndicateFeeds($feed_ids, true);
    }
}

if (is_admin()) {
    csyn_preset_options();
}
$csyn_syndicator = new CyberSyn_Syndicator();
$csyn_rss_pull_mode = get_option(CSYN_RSS_PULL_MODE);

function csyn_deactivation() {
    wp_clear_scheduled_hook('update_by_wp_cron');
}

register_deactivation_hook(__FILE__, 'csyn_deactivation');

function csyn_get_cuctom_cron_interval_name() {
    return 'every ' . get_option(CSYN_PSEUDO_CRON_INTERVAL) . ' minutes';
}

function csyn_add_cuctom_cron_interval($schedules) {
    $name = csyn_get_cuctom_cron_interval_name();
    $schedules[$name] = array(
        'interval' => intval(get_option(CSYN_PSEUDO_CRON_INTERVAL)) * 60,
        'display' => __($name)
    );
    return $schedules;
}

function csyn_rel_canonical() {
    global $post;
    if (isset($post->ID)) {
        $link = get_post_meta($post->ID, 'cyberseo_post_link', true);
        if (is_singular()) {
            if (strlen($link)) {
                echo apply_filters('csyn_rel_canonical', '<link rel="canonical" href="' . $link . '"/>' . "\n");
            } else {
                echo apply_filters('csyn_rel_canonical', '<link rel="canonical" href="' . get_permalink($post->ID) . '"/>' . "\n");
            }
        }
    }
}

function csyn_permalink($permalink) {
    global $post;
    $link = get_post_meta($post->ID, 'cyberseo_post_link', true);
    if (strlen($link)) {
        if (filter_var($link, FILTER_VALIDATE_URL)) {
            $permalink = $link;
        } elseif (filter_var($post->guid, FILTER_VALIDATE_URL)) {
            $permalink = $post->guid;
        }
    }
    return $permalink;
}

add_filter('cron_schedules', 'csyn_add_cuctom_cron_interval');

if (isset($_GET['pull-feeds']) && $_GET['pull-feeds'] == get_option(CSYN_CRON_MAGIC)) {
    if (!is_admin()) {
        require_once(ABSPATH . 'wp-admin/includes/taxonomy.php');
        add_action('shutdown', 'csyn_update_feeds');
    }
} else {
    if (is_admin()) {
        add_action('admin_menu', 'csyn_main_menu');
        add_action('before_delete_post', 'csyn_delete_post_images');
    } else {
        if (get_option(CSYN_CANONICAL_LINK) == 'on') {
            remove_action('wp_head', 'rel_canonical');
            add_action('wp_head', 'csyn_rel_canonical');
        }
        if (get_option(CSYN_LINK_TO_SOURCE) == 'on') {
            add_filter('post_link', 'csyn_permalink', 1);
        }
        if (strpos($csyn_rss_pull_mode, "auto") !== false) {
            if (function_exists('wp_next_scheduled')) {
                add_action('update_by_wp_cron', 'csyn_update_feeds');
                if (!wp_next_scheduled('update_by_wp_cron')) {
                    wp_schedule_event(time(), csyn_get_cuctom_cron_interval_name(), 'update_by_wp_cron');
                }
            } else {
                add_action('shutdown', 'csyn_update_feeds');
            }
        } else {
            if (function_exists('wp_clear_scheduled_hook') && wp_next_scheduled('update_by_wp_cron')) {
                wp_clear_scheduled_hook('update_by_wp_cron');
            }
        }
    }
}
?>