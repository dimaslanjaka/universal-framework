<?php

if (!defined('ABSPATH'))
    exit; // Exit if accessed directly

require_once 'html_dom.php';
include_once( ABSPATH . 'wp-admin/includes/plugin.php' );

if (!class_exists('MAMP_Render')) {

    class MAMP_Render {

        public static function initialize() {
            add_action('template_redirect', array('MAMP_Render', 'renderAMP'));
            add_action('admin_post_amp_mobile_test', array('MAMP_Render', 'mobileTest'));
            add_action('wp_head', array('MAMP_Render', 'addTags'));
        }

        // Add tags relevant to AMP
        public static function addTags() {
            global $wp, $post;

            $amps = get_option('amps');


            $amps_disabled_for_this_post = self::amps_custom_amp_enabled($post);

            $amp_tag = '<link rel="amphtml" href="%s">';
            $current_url = add_query_arg($wp->query_string, '', home_url($wp->request));

            $parse = parse_url($current_url);
            $current_url = $parse['scheme'] . '://' . $parse['host'] . $parse['path'] . '/amp/';

            $current_url = sprintf($amp_tag, $current_url);

            if ((!is_front_page() && is_single() && $amps['on_posts'] && !post_password_required() && !$amps_disabled_for_this_post) || (!is_front_page() && is_page() && $amps['on_pages'] && !post_password_required() && !$amps_disabled_for_this_post) || (is_category() && $amps['on_categories']) || (is_tag() && $amps['on_tags']) || ((is_front_page() || is_home()) && $amps['on_home'])
            ) {
                echo $current_url;
            }
        }

        // Determine if AMP is present on the current screen
        public static function renderAMP() {

            $isAMP = self::extractAMP($_SERVER['REQUEST_URI']);
            if ($isAMP && !post_password_required()) {

                $ampType = self::getAMPtype();

                if (is_plugin_active('amp-supremacy-pro/amp-pro.php') && $ampType > 4) {
                    do_action('amp_supremacy_render_amp_ecomm_template', $ampType);
                }

                status_header(200);
                require_once AMP_PATH . DIRECTORY_SEPARATOR . 'amp-template.php';
                die();
            }
        }

        // Extract the AMP url
        public static function extractAMP($url) {
            $par = parse_url($url);
            $pat = $par['path'];
            $las = substr($pat, -4);
            $las = str_replace('/', '', $las);
            if (strtolower($las) == 'amp') {
                return true;
            } else {
                return false;
            }
        }

        // Get the AMP Types
        public static function getAMPtype(&$return = null) {
            $siteurl = get_site_url();
            $realurl = $_SERVER['REQUEST_URI'];
            $realurl = rtrim($realurl, '/');
            $realurl = str_replace('/amp', '', $realurl);
            $pat = explode('/', $realurl);
            if ($pat[sizeof($pat) - 2] == 'category' || is_category()) {
                $return = $pat[sizeof($pat) - 1];
                return 2;
            }
            if ($pat[sizeof($pat) - 2] == 'tag' || is_tag()) {
                $return = $pat[sizeof($pat) - 1];
                return 4;
            }

            if ($pat[sizeof($pat) - 2] == 'product') {
                return 5;
            }

            if (isset($pat[2]) && defined('AMP_SUPREMACY_PRO_ACTIVE')) {
                if ($pat[2] == 'shop' || $pat[1] == 'shop') {
                    return 6;
                }

                if ($pat[2] == 'product-category' || $pat[1] == 'product-category') {
                    return 7;
                }

                if ($pat[2] == 'cart' || $pat[1] == 'cart') {
                    return 8;
                }
            }

            if ($realurl == $siteurl) {
                return 0;
            }
            return -1;
        }

        public static function replaceForAMP($content, $structuredData = false, $menuContent = false, $doShortcodeAgain = true) {
            global $wp, $global_content_specs;

            $current_url = str_replace('/amp', '', add_query_arg('', '', home_url($wp->request)));

            // If no content found return empty string
            if (empty($content)) {
                return '';
            }

            $content = wpautop($content);

            $amps = get_option('amps');

            if ($doShortcodeAgain) {
                $content = do_shortcode($content);
            }

            $removeInputAttributes = array('onchange', 'onclick', 'onmouseover', 'onfocus', 'onblur', 'rel');
            $attributesRemove = array('vocab', 'property', 'style', 'border', 'xml:lang', 'content', 'webkitallowfullscreen', 'mozallowfullscreen', 'onchange', 'onclick', 'onmouseover', 'onfocus', 'onblur', 'rel', 'clear');
            foreach ($attributesRemove as $attribute) {
                $content = preg_replace('/(<[^>]+) ' . $attribute . '=("|\').*?("|\')/i', '$1', $content);
            }

            $tagsRemove = array('script', 'style', 'object', 'param', 'object', 'spantimes', 'spanhelvetica', 'map', 'area', 'spandroid', 'proboto');
            foreach ($tagsRemove as $tag) {
                $content = preg_replace('#<' . $tag . '(.*?)>(.*?)</' . $tag . '>#is', '', $content);
            }

            // Constructing HTML Dom
            $htmlDom = str_get_html($content);

            foreach ($htmlDom->find('audio') as $audio) {

				$srcInSource = array(); $audioSrc = '';
				foreach($audio->find('source') as $source){
					if($source->hasAttribute('src') && !empty($source->src)){
						$srcInSource[] = TRUE;
						$audioSrc = $source->src;
					}
				}

				if (!empty($audio->src) || in_array(TRUE, $srcInSource)) {
                    $global_content_specs['audio'] = TRUE;
                    $audio->removeAttribute('preload');

					if(empty($audio->src) && !empty($audioSrc)){
						$audio->setAttribute('src', $audioSrc);
					}

                    $audio->outertext = preg_replace('#<a (.*?)>(.*?)</a>#is', '', $audio->outertext);
                    $audio->outertext = str_replace('<audio', '<amp-audio', $audio->outertext);
                    $audio->outertext = str_replace('</audio>', '</amp-audio>', $audio->outertext);
                    $audio->outertext = str_replace('/>', '></amp-audio>', $audio->outertext);
                } else {
                    $audio->outertext = '';
                }

            }

            // Processing [image]
            $imgCounter = 1;
            foreach ($htmlDom->find('img') as $img) {

                if (!empty($img->src)) {
                    list($width, $height) = self::aspectRatioImage($img->src);

                    if (isset($width) && isset($height)) {
                        $img->width = str_replace('%', '', $img->width);
                        if (!$img->width) {
                            $img->setAttribute('width', $width);
                        }

                        $img->height = str_replace('%', '', $img->height);
                        if (!$img->height) {
                            $img->setAttribute('height', $height);
                        }
                        if ($img->width > 740) {
                            $img->width = 740;

                            if ($img->height > 430) {
                                $img->height = 430;
                            }
                        }
                    } else {
                        $img->outertext = '';
                        continue;
                    }

                    $operateOnSecureContent = self::decideNonSecureContent($img->src, $amps);

                    $lightBoxEnabled = (!isset($amps['disable_lightbox_on_images']) || empty($amps['disable_lightbox_on_images'])) ? 1 : 0;
                    $global_content_specs['lightbox'] = (bool) $lightBoxEnabled;
                    if (!empty($lightBoxEnabled) && !$menuContent) {
                        $img->setAttribute('on', "tap:lightbox{$imgCounter}");
                        $img->setAttribute('tabindex', $imgCounter);
                        $img->setAttribute('role', "button");
                    }

                    $img->outertext = preg_replace('#<a(.*?)>(.*?)</a>#is', '', $img->outertext);

                    $img->outertext = str_replace('<img', '<amp-img', $img->outertext);
                    $checkTheClosingImageTag = strpos($img->outertext, ">");
                    if ($checkTheClosingImageTag) {
                        $img->outertext = str_replace('>', '></amp-img>', $img->outertext);
                    } else {
                        $img->outertext = str_replace('/>', '/></amp-img>', $img->outertext);
                    }

                    if ($img->width > 400) {
                        $img->setAttribute('layout', 'responsive');
                        $img->class = $img->class . ' img-in-text-lg';
                    } else {
                        $img->class = $img->class . ' img-in-text-sm';
                        $img->outertext = '<div class="img-div">' . $img->outertext . '</div>';
                    }

                    if (!empty($lightBoxEnabled) && !$menuContent) {
                        $img->outertext .= '<amp-image-lightbox id="lightbox' . $imgCounter . '" layout="nodisplay"></amp-image-lightbox>';
                    }


                    if ($operateOnSecureContent['removeImg']) {
                        $img->outertext = '';
                    } else if ($operateOnSecureContent['placehold']) {
                        $img->outertext = SUPREMACY_BANNER_IMAGE;
                    }
                } else {
                    $img->outertext = '';
                }
                $imgCounter++;
            }

            foreach ($htmlDom->find('a') as $anchor) {
                if ($anchor->target && (in_array($anchor->target, array('_top', '_new','popup')) || $anchor->target == '')) {
                    $anchor->removeAttribute('target');
                }

                if (!$anchor->target) {
                    $anchor->removeAttribute('target');
                }

                $anchor->removeAttribute('type');
                $anchor->removeAttribute('rel');

                if (substr_count($anchor->href, 'javascript')) {
                    $anchor->href = '#';
                }

                $lightBoxEnabled = (!isset($amps['disable_lightbox_on_images']) || empty($amps['disable_lightbox_on_images'])) ? 1 : 0;
                if (!empty($anchor->href) && !empty($lightBoxEnabled)) {
                    $imageUrlContainsImg = explode('.', $anchor->href);
                    if (in_array($imageUrlContainsImg[1], array('jpg', 'png', 'jpeg', 'gif'))) {
                        $anchor->href = '#';
                    }
                }

                if (!isset($amps['internal_links_non_amp']) || empty($amps['internal_links_non_amp'])) {
                    if (!empty($anchor->href) && $anchor->href != '#') {

                        $assetUrl = array(
                            strpos($anchor->href, '.pdf'),
                            strpos($anchor->href, '.jpg'),
                            strpos($anchor->href, '.jpeg'),
                            strpos($anchor->href, '.gif'),
                            strpos($anchor->href, '.png'),
                            strpos($anchor->href, '.txt')
                        );
                        $assetUrlAr = array_unique($assetUrl);

                        $isAssetUrl = !(count(array_unique($assetUrl)) == 1 && $assetUrlAr[0] === FALSE);

                        $link_domain = parse_url($anchor->href);

                        $link_domain = preg_replace('#^www\.(.+\.)#i', '$1', $link_domain['host']);

                        $domain = parse_url(get_site_url());
                        $site_domain = preg_replace('#^www\.(.+\.)#i', '$1', $domain['host']);
                        if ($site_domain == $link_domain && !$isAssetUrl) {
                            $p = $anchor->href;

                            $covert_post_link_into_amp = TRUE;

                            if (!empty($p)) {
                                $postid = url_to_postid($p);

                                /* The URL considered is either page or post (not category or tag) */
                                if (!empty($postid)) {
                                    $post_type = get_post_type($postid);
                                    $post_meta = get_post_meta($postid, AMP_CUSTOM_SETTINGS, true);

                                    /* This post have AMP disabled in custom settings */
                                    if ($post_meta['enable'] == 1) {
                                        $covert_post_link_into_amp = FALSE;
                                    } else { /* Let us check for global settings */
                                        $setting_name = ($post_type === 'page') ? 'on_pages' : 'on_posts';

                                        if (isset($amps[$setting_name])) {
                                            $covert_post_link_into_amp = ($amps[$setting_name] == 1) ? TRUE : FALSE;
                                        }
                                    }
                                }
                            }

                            if ($covert_post_link_into_amp === TRUE) {
                                $p = str_replace('\\', '/', trim($p));
                                $anchor->href = (substr($p, -1) != '/') ? $p.='/' : $p;
                                $anchor->href = $anchor->href . 'amp';
                            }
                        }
                    }
                }

                foreach ($removeInputAttributes as $removeInputAttribute) {
                    $anchor->removeAttribute($removeInputAttribute);
                }
            }

            foreach ($htmlDom->find('td') as $td) {
                $td->removeAttribute('nowrap');
            }

            foreach ($htmlDom->find('span') as $span) {
                $span->removeAttribute('color');
            }

            foreach ($htmlDom->find('div') as $div) {
                $div->removeAttribute('alt');
            }

            foreach ($htmlDom->find('button') as $button) {
                $button->removeAttribute('href');
            }

            foreach ($htmlDom->find('video') as $video) {
                foreach ($video->find('source') as $videosource) {
                    $operateOnSecureVdContent = self::decideNonSecureContent($videosource->src, $amps);
                    if ($operateOnSecureVdContent['removeImg']) {
                        $video->outertext = '';
                    } else if ($operateOnSecureVdContent['placehold']) {
                        $video->outertext = SUPREMACY_BANNER_IMAGE;
                    }
                }
                $video->outertext = str_replace('<video', '<amp-video', $img->outertext);
                $video->outertext = str_replace('</video>', '></amp-video>', $img->outertext);
            }

            foreach ($htmlDom->find('th') as $th) {
                $th->removeAttribute('nowrap');
            }

            foreach ($htmlDom->find('font') as $font) {
                $font->outertext = str_replace('<font', '<span', $font->outertext);
                $font->outertext = str_replace('</font>', '</span>', $font->outertext);
            }

            foreach ($htmlDom->find('article') as $article) {
                $article->removeAttribute('style');
            }

            foreach ($htmlDom->find('style') as $style) {
                $style->outertext = '';
            }

            foreach ($htmlDom->find('script') as $script) {
                $style->outertext = '';
            }

            // Processing [iframes]
            $iFrameCounter = 0;
            foreach ($htmlDom->find('iframe') as $iframe) {
                if (!empty($iframe->src)) {
                    $global_content_specs['iframe'][$iFrameCounter] = TRUE;
                    if (!$iframe->width) {
                        $iframe->setAttribute('width', 800);
                    } else {
                        $iframe->width = ($iframe->width > 800) ? 800 : $iframe->width;
                    }
                    $iframe->width = str_replace('%', '', $iframe->width);

                    if (!$iframe->height) {
                        $iframe->setAttribute('height', 500);
                    } else {
                        $iframe->height = ($iframe->height > 500) ? 500 : $iframe->height;
                    }
                    $iframe->height = str_replace('%', '', $iframe->height);

                    $operateOnSecureContentIf = self::decideNonSecureContent($iframe->src, $amps);

                    $iframe->setAttribute('layout', 'responsive');
                    $iframe->removeAttribute('webkitallowfullscreen');
                    $iframe->removeAttribute('mozallowfullscreen');
                    $iframe->setAttribute('sandbox', 'allow-scripts allow-same-origin');
                    $iframe->setAttribute('frameborder', 0);

                    $iframe->outertext = str_replace('<iframe', '<amp-iframe', $iframe->outertext);
                    $iframe->outertext = str_replace('</iframe>', '</amp-iframe>', $iframe->outertext);

                    if (strpos($iframe->src, 'youtube') > 0 || strpos($iframe->src, 'youtu') > 0) {
                        $global_content_specs['youtube'][$iFrameCounter] = TRUE;
                        $global_content_specs['iframe'][$iFrameCounter] = FALSE;
                        $videoId = self::getYouTubeVideoId($iframe->src);
                        $iframe->outertext = '<amp-youtube data-videoid="' . $videoId . '" layout="responsive" width="800" height="500"></amp-youtube>';
                    }

                    if ($operateOnSecureContentIf['removeImg']) {
                        $global_content_specs['iframe'][$iFrameCounter] = FALSE;
                        $iframe->outertext = '';
                    } else if ($operateOnSecureContentIf['placehold']) {
                        $global_content_specs['iframe'][$iFrameCounter] = FALSE;
                        $iframe->outertext = SUPREMACY_BANNER_IMAGE;
                    }
                } else {
                    $global_content_specs['iframe'][$iFrameCounter] = FALSE;
                    $iframe->outertext = '';
                }
                $iFrameCounter++;
            }

            // Processing [forms]
            foreach ($htmlDom->find('form') as $form) {

                if (!$form->hasAttribute('target')) {
                    $form->setAttribute('target', '_blank');
                } else {
                    $form->target = '_blank';
                }

                if (!$form->hasAttribute('method') || $form->method == '') {
                    $form->setAttribute('method', 'GET');
                }

                if (strtoupper($form->method) == 'POST') {

                    if (empty($form->action)) {
                        $form->action = get_permalink();
                    }

                    $form->setAttribute('action-xhr', $form->action);
                    $form->removeAttribute('action');
                }

                if (!$form->hasAttribute('action') || $form->action == '') {
                    $temp_current_url = $current_url;
                    $temp_current_url = str_replace('/amp', '', $temp_current_url);
                    $form->action = $temp_current_url;
                } else {
                    $operateOnSecureContentIf = self::decideNonSecureContent($form->action, $amps);
                    if ($operateOnSecureContentIf['removeImg']) {
                        $form->outertext = '';
                    } else if ($operateOnSecureContentIf['placehold']) {
                        $form->outertext = SUPREMACY_BANNER_IMAGE;
                    }
                }

                if ($form->outertext != '') {
                    $global_content_specs['form'][] = TRUE;
                }
            }

            foreach ($htmlDom->find('input') as $input) {
                foreach ($removeInputAttributes as $removeInputAttribute) {
                    $input->removeAttribute($removeInputAttribute);
                }

                if ($input->type == 'file') {
                    $input->outertext = '';
                }

                if ($input->type == 'password' && isset($amps['password_switch']) && $amps['password_switch'] == 1) {
                    $input->outertext = '';
                }
            }

            if ($structuredData) {
                $htmlDom = strip_tags($htmlDom);
                $htmlDom = addcslashes($htmlDom, '"');
                $htmlDom = str_replace(array("\r", "\n"), "", $htmlDom);
            }

            return $htmlDom;
        }

        // Google Mobile Test
        public static function mobileTest() {
            $website = $_POST['website'];
            if (filter_var($website, FILTER_VALIDATE_URL) === FALSE) {
                wp_send_json(array(
                    'status' => 'ERROR',
                    'message' => "URL that you provided is not a valid URL."
                ));
                wp_die();
            }

            $gurl = "https://www.googleapis.com/pagespeedonline/v3beta1/mobileReady?key=%s&screenshot=true&snapshots=true&locale=en_US&url=%s&strategy=mobile&filter_third_party_resources=true";
            $key = "AIzaSyAwlPiPJIkTejgqqH01v9DmtPoPeOPXDUQ";
            $url = sprintf($gurl, $key, urlencode($website));

            $response = wp_remote_get($url, array('timeout' => 120));
            if (is_array($response)) {
                $body = $response['body']; // use the content
                echo $body;
            } else {
                wp_send_json(array(
                    'status' => 'ERROR',
                    'message' => "There was a problem while testing this URL. Please try again later.",
                    'debug' => $response
                ));
            }
        }

        public static function getImageDimensions($url) {

            $parsed_url = parse_url($url);
            if (!isset($parsed_url['scheme'])) {
                $url = 'http:' . $url;
            }

            list($width, $height) = self::getImageHeightWidth($url);
            if (isset($width) && isset($height)) {
                $result = array(
                    'width' => $width,
                    'height' => $height
                );
            } else {
                $result = array();
            }

            return $result;
        }

        public static function decideNonSecureContent($source_path, $amps) {
            $url = parse_url($source_path);
            $removeImg = false;
            $placehold = false;
            if (!empty($amps['non_secure_content']) && !empty($url['scheme']) && $url['scheme'] == 'http') {
                $operation = $amps['non_secure_content_should_be'];
                if ($operation == 'removed') {
                    $removeImg = true;
                } else if ($operation == 'placeholded') {
                    $placehold = true;
                }
            }
            return array('removeImg' => $removeImg, 'placehold' => $placehold);
        }

        public static function isSlug($defaultValue = -1) {
            $result = $defaultValue;
            $realurl = $_SERVER['REQUEST_URI'];
            $parsedUrl = parse_url($realurl);

            if (!empty($parsedUrl['path'])) {
                $pathArray = explode('/', $parsedUrl['path']);
                $term = $pathArray[1];

                $termCategory = term_exists($term, 'category');
                if ($termCategory !== 0 && $termCategory !== null) {
                    $result = array('term' => $term, 'type' => 2);
                }

                $termTag = term_exists($term, 'post_tag');
                if ($termTag !== 0 && $termTag !== null) {
                    $result = array('term' => $term, 'type' => 4);
                }
            }
            return $result;
        }

        public static function constructAMPmenu($content = '') {
            $htmlDom = str_get_html($content);

            foreach ($htmlDom->find('a') as $anchor) {
                if (!empty($anchor->href)) {
                    $isAMP = self::extractAMP($anchor->href);
                    if (!$isAMP) {
                        $anchor->href = str_replace('//amp', '/amp', $anchor->href . '/amp/');
                    }
                }
                $anchor->class .= ' menu-item';
            }
            foreach ($htmlDom->find('amp-iframe') as $ampiframe) {
                $ampiframe->outertext = '';
            }
            return $htmlDom;
        }

        public static function aspectRatioImage($imageSrc) {

            $parsed_url = parse_url($imageSrc);
            if (!isset($parsed_url['scheme'])) {
                $imageSrc = 'http:' . $imageSrc;
            }

            list($originalWidth, $originalHeight) = self::getImageHeightWidth($imageSrc);

            if (isset($originalWidth) && isset($originalHeight)) {
                if ($originalWidth != 0 && $originalHeight != 0) {
                    $ratio = $originalWidth / $originalHeight;
                } else {
                    $ratio = 0;
                }


                $size = 450;

                $targetWidth = $targetHeight = min($size, max($originalWidth, $originalHeight));

                if ($ratio < 1) {
                    $targetWidth = $targetHeight * $ratio;
                } else {
                    $targetHeight = $targetWidth / $ratio;
                }
                return array(ceil($targetWidth), ceil($targetHeight));
            } else {
                return array();
            }
        }

        private static function getYouTubeVideoId($youTubeVideoUrl) {
            $id = 0;
            if (preg_match('%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i', $youTubeVideoUrl, $match)) {
                $id = $match[1];
            }
            return $id;
        }

        public static function ampSupremacyLoadYoastOgData() {
            if (is_plugin_active('wordpress-seo/wp-seo.php')) {
                $yoastOptions = WPSEO_Options::get_option('wpseo_social');
                if ($yoastOptions['opengraph'] === true) {
                    $GLOBALS['wpseo_og'] = new WPSEO_OpenGraph;
                }
                do_action('wpseo_opengraph');
            }
        }

        public static function amps_load_ps_meta_data($data) {
            $htmlDom = str_get_html($data);
            foreach ($htmlDom->find('link') as $link) {
                $link->outertext = '';
            }

            foreach ($htmlDom->find('meta') as $meta) {
                if ($meta->hasAttribute('name') && (!empty($meta->name) && $meta->name == 'description')) {
                    $meta->content = htmlspecialchars($meta->content);
                }
            }
            echo $htmlDom;
        }

        public function amps_overwrite_with_custom_settings($amps, $post) {

            if (!empty($post)) {
                $custom_global_settings_relationship = array(
                    'on_post_date' => 'hide_post_date',
                    'on_author_name' => 'hide_post_author_name',
                    'on_post_tags' => 'hide_post_tags',
                    'on_post_categories' => 'hide_post_categories',
                    'use_seo_meta' => 'load_seo',
                );

                $amps_use_custom_settings_option = get_post_meta($post->ID, AMP_CUSTOM_SETTINGS_SWITCH, TRUE);
                $amps_use_custom_settings = get_post_meta($post->ID, AMP_CUSTOM_SETTINGS, TRUE);

                if (isset($amps_use_custom_settings_option) && $amps_use_custom_settings_option == 1) {

                    foreach ($custom_global_settings_relationship as $this_key => $this_val) {
                        $amps[$this_key] = (int) !$amps_use_custom_settings[$this_val];
                    }
                }
            }
            return $amps;
        }

        public static function amps_custom_amp_enabled($post) {
            $amps_disabled_for_this_post = 0;
            if (isset($post) && !empty($post->ID)) {
                $amps_use_custom_settings_option = get_post_meta($post->ID, AMP_CUSTOM_SETTINGS_SWITCH, TRUE);
                $amps_use_custom_settings = get_post_meta($post->ID, AMP_CUSTOM_SETTINGS, TRUE);

                if (isset($amps_use_custom_settings['enable']) && $amps_use_custom_settings['enable'] == 1) {
                    $amps_disabled_for_this_post = 1;
                }
            }
            return $amps_disabled_for_this_post;
        }

        public static function getImageHeightWidth($url) {
            $result = array();
            if (ini_get('allow_url_fopen')) {
                list($result[0], $result[1]) = getimagesize($url);
            } else {
                error_log("[AMP SUPREMACY] - Please change your PHP INI settings from 'allow_url_fopen=Off' to  'allow_url_fopen=On'", 0);
            }

            return $result;
        }

        public static function amps_filter_yoast_canonical($url) {
            if (!$url) {
                $current_url = add_query_arg($wp->query_string, '', home_url($wp->request));

                $parse = parse_url($current_url);
                $current_url = $parse['scheme'] . '://' . $parse['host'] . $parse['path'];
                $current_url = str_replace('/amp', '/', $current_url);
                $url = $current_url;
            }
            return $url;
        }

        public static function amps_plugin_trigger_check() {
            if (!empty($_GET['plugin_trigger']) && $_GET['plugin_trigger'] == 'amps_sample') {
                status_header(200);
                require_once AMP_PATH . DIRECTORY_SEPARATOR . 'pages/amps-sample.php';
                die();
            }

            elseif (!empty($_GET['plugin_trigger']) && $_GET['plugin_trigger'] == 'amps_import_setting') {
                 $amps = get_option('amps');

                // print_r($amps);
                // exit;

                $json_data = json_encode($amps);
                // echo $json_data; exit;
                  $myfile = fopen("amps-settings.json", "w") or die("Unable to open file!");

                  fwrite($myfile, $json_data);
                 fclose ($myfile);
                //echo $json_data;
                $file = 'amps-settings.json';
                if (file_exists($file)) {
                    header('Content-Description: File Transfer');
                    header('Content-Type: application/json');
                    header('Content-Disposition: attachment; filename="'.basename($file).'"');
                    header('Expires: 0');
                    header('Cache-Control: must-revalidate');
                    header('Pragma: public');
                    header('Content-Length: ' . filesize($file));
                    readfile($file);

                if (file_exists($file)) {
                   unlink($file);
                }
                exit;
               }


             }
        }

    }

}
