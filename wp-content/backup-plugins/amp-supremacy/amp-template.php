<?php
// PHP STARTS HERE

if (!defined('ABSPATH'))
    exit; // Exit if accessed directly


global $global_content_specs;

include_once( ABSPATH . 'wp-admin/includes/plugin.php' );

error_reporting(0);
$thrive_editor = is_plugin_active('thrive-visual-editor/thrive-visual-editor.php');
$is_live_editor = is_plugin_active('ds-live-composer/ds-live-composer.php');
$is_amp_supremacy_lite_active = is_plugin_active('amp-supremacy-sitemap/index-amp.php');
$is_amp_supremacy_pro_active = is_plugin_active('amp-supremacy-pro/amp-pro.php');

global $post, $wp;
        const HOME = 0;
        const POST = 1;
        const CATE = 2;
        const TAXO = 3;
        const TAG = 4;
$current_url = add_query_arg($wp->query_string, '', home_url($wp->request));

$parse = parse_url($current_url);
$current_url = $parse['scheme'] . '://' . $parse['host'] . $parse['path'];
$current_url = str_replace('/amp', '/', $current_url);

$amps = get_option('amps');

$amps = MAMP_Render::amps_overwrite_with_custom_settings($amps, $post);

$networkforAdIsSetupisset = false;
if($is_amp_supremacy_pro_active){
    $networkforAdIsSetupisset = ($params['network_id']) && ($params['network_id'] != '-1');
}

$siteurl = get_site_url();
$type = null;
$structuredData = array(
    'mainEntityOfPage' => $current_url,
    'headline' => 'NewsArticle',
    'imgUrl' => (!empty($amps['structured_data_logo_image'])) ? $amps['structured_data_logo_image'] : AMP_URL . 'assets/img/logo.png',
    'imgWidth' => 100,
    'imgHeight' => 140,
    'personName' => 'Admin',
    'datePublished' => '01-01-2016 00:00:00',
    'dateModified' => '01-01-2016 00:00:00',
    'description' => 'Description Goes Here',
    'publisherName' => 'Admin',
    'logoUrl' => AMP_URL . 'assets/img/user.png',
    'logoWidth' => 16,
    'logoHeight' => 16
);

$homePage = FALSE;

$shortcut_icon = AMP_URL . 'assets/img/logo.png';

if (is_single() || is_page()) {

    $amps_disabled_for_this_post = MAMP_Render::amps_custom_amp_enabled($post);

    if ((is_single() && empty($amps['on_posts'])) or ( is_page() && empty($amps['on_pages'])) or $amps_disabled_for_this_post) {
        header('location:' . $current_url);
    }

    $type = POST;
    $first_name_author = get_user_meta($post->post_author, 'first_name', true);
    $last_name_author = get_user_meta($post->post_author, 'last_name', true);
	$author = $first_name_author . ' ' . $last_name_author;
    $author_avatar = get_avatar_url($post->post_author, 16);

    $RAWcategories = get_the_category($post->ID);
    $categories = array();
    foreach ($RAWcategories as $c) {
        $categories[] = '<a href="' . str_replace('//amp', '/amp/', get_category_link($c->term_id)) . '/amp/">' . $c->cat_name . '</a>';
    }
    $RAWtags = wp_get_post_tags($post->ID);
    $tags = array();
    foreach ($RAWtags as $t) {
        $tags[] = '<a href="' . str_replace('//amp', '/amp/', get_tag_link($t->term_id)) . '/amp/">' . $t->name . '</a>';
    }
    $image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'single-post-thumbnail');
    $ldImage = !empty($image[0]) ? $image[0] : $shortcut_icon;
    $ldImage = (!empty($amps['structured_data_logo_image'])) ? $amps['structured_data_logo_image'] : $ldImage ;
    $dimensions = array();
    list($dimensions['width'], $dimensions['height']) = MAMP_Render::getImageDimensions($ldImage);
    $structuredData['headline'] = !empty($post->post_title) ? $post->post_title : 'Untitled';
    $structuredData['imgUrl'] = $ldImage;
    $structuredData['imgHeight'] = isset($dimensions['height']) ? $dimensions['height'] : 0;
    $structuredData['imgWidth'] = isset($dimensions['width']) ? $dimensions['width'] : 0;
    $structuredData['personName'] = (!empty($author) && trim($author) != '') ? $author : 'Admin';
    $structuredData['datePublished'] = date('d-m-Y H:i:s', strtotime($post->post_date));
    $structuredData['dateModified'] = date('d-m-Y H:i:s', strtotime($post->post_modified));

    $postContent = $post->post_content;
    if(empty($post->post_content)){
        if($thrive_editor){
            $postContent = get_post_meta( $post->ID, 'tve_content_before_more');
            $postContent = $postContent[0];
        }
        if($is_live_editor){
            $postContent = get_post_meta( $post->ID, 'dslc_code', true);
        }
    }
    $structuredData['description'] = do_shortcode(MAMP_Render::replaceForAMP($postContent, true));
    $structuredData['publisherName'] = (!empty($author) && trim($author) != '') ? $author : 'Admin';
} else {
    $ampType = MAMP_Render::getAMPtype($data);

    if($ampType == -1 && (!is_home() && !is_front_page())){
        $term = MAMP_Render::isSlug();
        if($term != -1){
            $ampType = $term['type'];
            $data = $term['term'];
        }
    }

    if ($ampType == CATE) {

       // MAMP_Model::check_category();

        if (empty($amps['on_categories'])) {
            header('location:' . $current_url);
        }
        $this_object = get_queried_object();
        if(!empty($this_object)){
           $data = $this_object->slug;
        }

        $type = CATE;
        $args = array(
            'posts_per_page' => 5,
            'offset' => 0,
            'category' => '',
            'category_name' => $data,
            'orderby' => 'date',
            'order' => 'DESC',
            'include' => '',
            'exclude' => '',
            'meta_key' => '',
            'meta_value' => '',
            'post_type' => 'post',
            'post_mime_type' => '',
            'post_parent' => '',
            'author' => '',
            'post_status' => 'publish',
            'suppress_filters' => true
        );
        $posts_array = get_posts($args);
        $structuredData['headline'] = 'Category: ' . $data;
        $structuredData['description'] = $data;
    } elseif ($ampType == TAG) {

        if (empty($amps['on_tags'])) {
            header('location:' . $current_url);
        }

        $this_cat_data = get_the_category(get_query_var( 'cat' ));

        $this_object = get_queried_object();
        if(!empty($this_object)){
           $data = $this_object->slug;
        }

        $type = TAG;
        $args = array(
            'tax_query' => array(
                array(
                    'taxonomy' => 'post_tag',
                    'field' => 'slug',
                    'terms' => $data
                )
            )
        );
        $posts_array = get_posts($args);
        $structuredData['headline'] = 'Tag: ' . $data;
        $structuredData['description'] = $data;
    } elseif ($ampType == -1) {
        $homePage = TRUE;
        if (empty($amps['on_home'])) {
            header('location:' . $current_url);
        }
        if (is_front_page()) {
            $type = CATE;
            $args = array('posts_per_page' => 5, 'offset' => 0, 'category' => '', 'category_name' => '', 'orderby' => 'date', 'order' => 'DESC', 'include' => '', 'exclude' => '', 'meta_key' => '', 'meta_value' => '', 'post_type' => 'post', 'post_mime_type' => '', 'post_parent' => '', 'author' => '', 'post_status' => 'publish', 'suppress_filters' => true);
            $posts_array = get_posts($args);
            $structuredData['headline'] = 'Home Page';
            $structuredData['description'] = 'Home Page Posts';
        } else {
            $postId_on_home_page = get_option('page_on_front');
            $post_on_home_page = get_post($postId_on_home_page);
            $post = $post_on_home_page;
            setup_postdata($post);
            $type = POST;
            $author = get_user_meta($post->post_author, 'first_name', true);
            $author_avatar = get_avatar_url($post->post_author, 16);
            $image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'single-post-thumbnail');
            $ldImage = !empty($image[0]) ? $image[0] : $shortcut_icon;
            $ldImage = (!empty($amps['structured_data_logo_image'])) ? $amps['structured_data_logo_image'] : $ldImage ;
            $dimensions = array();
            list($dimensions['width'], $dimensions['height']) = MAMP_Render::getImageDimensions($ldImage);
            $structuredData['headline'] = !empty($post->post_title) ? $post->post_title : 'Untitled';
            $structuredData['imgUrl'] = $ldImage;
            $structuredData['imgHeight'] = isset($dimensions['height']) ? $dimensions['height'] : 0;
            $structuredData['imgWidth'] = isset($dimensions['width']) ? $dimensions['width'] : 0;


            $structuredData['personName'] = (!empty($author) && trim($author) != '') ? $author : 'Admin';
            $structuredData['datePublished'] = date('d-m-Y H:i:s', strtotime($post->post_date));
            $structuredData['dateModified'] = date('d-m-Y H:i:s', strtotime($post->post_modified));
            $postContent = $post->post_content;
            if(empty($post->post_content)){
                if($thrive_editor){
                    $postContent = get_post_meta( $post->ID, 'tve_content_before_more');
                    $postContent = $postContent[0];
                }
                if($is_live_editor){
                    $postContent = get_post_meta( $post->ID, 'dslc_code', true);
                }
            }
            $full_post = $post;
            $structuredData['description'] = do_shortcode(MAMP_Render::replaceForAMP($postContent, true));
            $structuredData['publisherName'] = (!empty($author) && trim($author) != '') ? $author : 'Admin';
            $post = $full_post;
        }
    }
}
$lightBoxEnabled = (!isset($amps['disable_lightbox_on_images']) || empty($amps['disable_lightbox_on_images'])) ? 1 : 0;

if(!empty($posts_array)){
    foreach($posts_array as $this_post){
        MAMP_Render::replaceForAMP($this_post->post_content, false, false, false);
    }
}

if(!in_array(TRUE, $global_content_specs['youtube'])){
    MAMP_Render::replaceForAMP($postContent, false, false, false);
}
?>

<!DOCTYPE html>
<html class="no-js" amp lang="<?php echo AMPS_SITE_LANGUAGE ?>">
    <head>
        <meta charset="utf-8">

        <title><?php echo $structuredData['headline']; ?></title>
        <meta name="description" content="">
        <meta name="HandheldFriendly" content="True">
        <meta name="MobileOptimized" content="320">
        <!-- HTML custom meta start -->
        <?php // echo stripslashes($amps['custom-meta']); ?>
        <!-- HTML custom meta end -->



        <?php if (isset($amps['color_header'])) { ?>
            <meta name="theme-color" content="<?php echo $amps['color_header']; ?>">
        <?php } ?>
        <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, minimal-ui">
        <?php if (!empty($amps['site_verification'])) { ?>
            <meta name="google-site-verification" content="<?php echo $amps['site_verification']; ?>" />
        <?php } ?>
        <link rel="apple-touch-icon-precomposed" sizes="144x144"
              href="<?php echo AMP_URL . 'assets/'; ?>img/touch/apple-touch-icon-144x144-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="114x114"
              href="<?php echo AMP_URL . 'assets/'; ?>img/touch/apple-touch-icon-114x114-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="72x72"
              href="<?php echo AMP_URL . 'assets/'; ?>img/touch/apple-touch-icon-72x72-precomposed.png">
        <link rel="apple-touch-icon-precomposed"
              href="<?php echo AMP_URL . 'assets/'; ?>img/touch/apple-touch-icon-57x57-precomposed.png">
        <?php
            $favicon_url = (isset($amps['favico']) && !empty($amps['favico'])) ? $amps['favico'] : $shortcut_icon ;
        ?>
        <link rel="shortcut icon" sizes="196x196" href="<?php echo $favicon_url; ?>">
        <link rel="shortcut icon" href="<?php echo $favicon_url; ?>">
        <!-- Tile icon for Win8 (144x144 + tile color) -->
        <meta name="msapplication-TileImage" content="<?php echo AMP_URL . 'assets/'; ?>img/touch/apple-touch-icon-144x144-precomposed.png">
        <meta name="msapplication-TileColor" content="#222222">

        <?php if(defined('AMPS_SITE_LANGUAGE')):
            echo '<link rel="alternate" hreflang="'.AMPS_SITE_LANGUAGE.'" href="'.$current_url.'amp/" />';
         endif; ?>

        <!-- SEO: If mobile URL is different from desktop URL, add a canonical link to the desktop page -->
        <!---->
        <?php
            if(isset($amps['use_seo_meta']) && !empty($amps['use_seo_meta'])){
               if(is_plugin_active( 'project-supremacy/google_keyword_tool.php' ) && GKTY_Manager::valid_license()){
                    GKTY_Page_Project::changeMeta();
                    echo "<link rel='canonical' href=\"{$current_url}\">";
                } else {
                    if ( is_plugin_active( 'wordpress-seo/wp-seo.php' ) ) {
                        do_action('wpseo_head');
                    } else {
                        echo "<link rel='canonical' href=\"{$current_url}\">";
                    }
                }
                if ( is_plugin_active( 'wordpress-seo/wp-seo.php' ) ) {MAMP_Render::ampSupremacyLoadYoastOgData();}
            } else {
                echo "<link rel='canonical' href=\"{$current_url}\">";
            }
        ?>
        <!-- Add to homescreen for Chrome on Android -->
        <meta name="mobile-web-app-capable" content="yes">

        <!-- For iOS web apps. Delete if not needed. https://github.com/h5bp/mobile-boilerplate/issues/94 -->
        <!--
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta name="apple-mobile-web-app-title" content="">
        -->

        <!-- This script prevents links from opening in Mobile Safari. https://gist.github.com/1042026 -->
        <!--
        <script>(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone")</script>
        -->

        <script type="application/ld+json">
            {
                "@context": "http://schema.org",
                "@type": "NewsArticle",
                "mainEntityOfPage": "<?php echo $current_url; ?>",
                "headline": "<?php echo $structuredData['headline']; ?>",
                "image": {
                    "@type": "ImageObject",
                    "url": "<?php echo  $structuredData['imgUrl']; ?>",
                    "width": "<?php echo !empty($structuredData['imgWidth']) ? $structuredData['imgWidth'] : 100 ; ?>",
                    "height": "<?php echo !empty($structuredData['imgHeight']) ? $structuredData['imgHeight'] : 140 ; ?>"
                },
                "author": {
                    "@type": "Person",
                    "name": "<?php echo $structuredData['personName']; ?>"
                },
                "datePublished": "<?php echo $structuredData['datePublished']; ?>",
                "dateModified": "<?php echo $structuredData['dateModified']; ?>",
                "description": "<?php echo $structuredData['description']; ?>",
                "publisher" : {
                    "@type": "Organization",
                    "name": "<?php echo $structuredData['publisherName']; ?>",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "<?php echo $structuredData['logoUrl']; ?>",
                        "width": "16",
                        "height": "16"
                    }
                }
            }
        </script>

        <?php if(!isset($amps['disable_menu_display']) || $amps['disable_menu_display'] == 0): ?>
            <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
        <?php endif; ?>

        <?php if(in_array(TRUE, $global_content_specs['form'])): ?>
            <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
        <?php endif; ?>

         <?php if(($is_amp_supremacy_pro_active) && ($amps['on_twitter'] == 1||$amps['on_google_plus'] == 1||$amps['on_mail'] == 1||$amps['on_pinterest'] == 1||$amps['on_linkedin'] == 1||$amps['on_facebook'] == 1)): ?>
            <script async custom-element="amp-social-share" src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"></script>
        <?php endif; ?>

        <?php if($is_amp_supremacy_pro_active && !empty($amps['header']['network_name']) || !empty($amps['footer']['network_name']) ||  !empty($amps['postcontent']['network_name'])): ?>
            <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
        <?php endif; ?>

       <?php if($is_amp_supremacy_pro_active && !empty($amps['show_as_sticky_ad'])): ?>
            <script async custom-element="amp-sticky-ad" src="https://cdn.ampproject.org/v0/amp-sticky-ad-1.0.js"></script>
        <?php endif; ?>

        <?php if($is_amp_supremacy_lite_active && !empty($amps['google_analytics_tracking_id'])): ?>
            <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
        <?php endif; ?>

        <?php if(in_array(TRUE, $global_content_specs['youtube'])): ?>
            <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
        <?php endif; ?>

       <?php if($global_content_specs['audio']): ?>
            <script async custom-element="amp-audio" src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script>
        <?php endif; ?>

        <?php if(in_array(TRUE, $global_content_specs['iframe'])): ?>
            <script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
        <?php endif; ?>

        <?php if(!empty($global_content_specs['lightbox']) || (empty($amps['featured_image_hide']) && $lightBoxEnabled) && has_post_thumbnail($post->ID)): ?>
            <script async custom-element="amp-image-lightbox" src="https://cdn.ampproject.org/v0/amp-image-lightbox-0.1.js"></script>
        <?php endif; ?>

        <script async src="https://cdn.ampproject.org/v0.js"></script>

        <!-- AMP Boilerplate -->
        <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>

        <!-- Custom Design Changes -->
        <style amp-custom>

            html{ font:400 14px/20px "Helvetica Neue",Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background:#fff;color:#666;background-image:-webkit-radial-gradient(100% 100%,center,#fff,#fff);background-image:radial-gradient(100% 100% at center,#fff,#fff)}.uk-article:after,.uk-container:after,.uk-grid:after{clear:both}.uk-nav-offcanvas .uk-nav-header,.uk-nav-offcanvas>li>a{border-top:1px solid rgba(0,0,0,.3);text-shadow:0 1px 0 rgba(0,0,0,.5)}.uk-container{box-sizing:border-box;max-width:980px;padding:0 25px}@media (min-width:1220px){.uk-container{max-width:1200px;padding:0 35px}}.uk-container:after,.uk-container:before{content:"";display:table}.uk-container-center{margin-left:auto;margin-right:auto}.uk-article>:last-child,.uk-grid>*>:last-child{margin-bottom:0}.uk-grid{display:-ms-flexbox;display:-webkit-flex;display:flex;-ms-flex-wrap:wrap;-webkit-flex-wrap:wrap;flex-wrap:wrap;margin:0;padding:0;list-style:none}.uk-grid:after,.uk-grid:before{content:"";display:block;overflow:hidden}.uk-grid>*{-ms-flex:none;-webkit-flex:none;flex:none;margin:0;float:left;padding-left:14px}.uk-grid{margin-left:-25px}.uk-grid+.uk-grid,.uk-grid-margin,.uk-grid>*>.uk-panel+.uk-panel{margin-top:25px}@media (min-width:1220px){.uk-grid{margin-left:-35px}.uk-grid+.uk-grid,.uk-grid-margin,.uk-grid>*>.uk-panel+.uk-panel{margin-top:35px}}@media (min-width:200px){.uk-grid-divider>[class*=uk-width-medium-]:not(.uk-width-medium-1-1):nth-child(n+2){border-left:1px solid #e5e5e5}.uk-width-medium-1-1{width:100%}}.uk-article:after,.uk-article:before{content:"";display:table}.uk-article+.uk-article{margin-top:50px}.uk-article-title{font-size:36px;line-height:42px;font-weight:300;text-transform:none}.uk-article-meta,.uk-nav li>a>div{font-size:12px;line-height:18px}.uk-article-title a{color:inherit;text-decoration:none}.uk-article-meta{color:#999}.uk-offcanvas-bar{position:fixed;top:0;bottom:0;left:0;-webkit-transform:translateX(-100%);transform:translateX(-100%);z-index:1001;width:270px;max-width:100%;background:#333;overflow-y:auto;-webkit-overflow-scrolling:touch;-webkit-transition:-webkit-transform .3s ease-in-out;transition:transform .3s ease-in-out;-ms-scroll-chaining:none}.uk-offcanvas-bar-flip:after,.uk-offcanvas-bar:after{width:1px;background:rgba(0,0,0,.6);box-shadow:0 0 5px 2px rgba(0,0,0,.6)}.uk-offcanvas.uk-active .uk-offcanvas-bar.uk-offcanvas-bar-show{-webkit-transform:translateX(0);transform:translateX(0)}.uk-offcanvas-bar-flip{left:auto;right:0;-webkit-transform:translateX(100%);transform:translateX(100%)}.uk-offcanvas .uk-panel{margin:20px 15px;color:#777;text-shadow:0 1px 0 rgba(0,0,0,.5)}.uk-offcanvas .uk-panel a:not([class]),.uk-offcanvas .uk-panel-title{color:#ccc}.uk-offcanvas .uk-panel a:not([class]):hover{color:#fff}.uk-offcanvas-bar:after{content:"";display:block;position:absolute;top:0;bottom:0;right:0}.uk-offcanvas-bar-flip:after{right:auto;left:0}.uk-nav,.uk-nav ul{margin:0;padding:0;list-style:none}.uk-nav li>a{display:block;text-decoration:none}.uk-nav>li>a{padding:3px 15px}.uk-nav ul{padding-left:15px}.uk-nav ul a{padding:2px 0}.uk-nav-offcanvas>li>a{color:#ccc;padding:10px 15px;box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}.uk-nav-offcanvas>.uk-open>a,html:not(.uk-touch) .uk-nav-offcanvas>li>a:focus,html:not(.uk-touch) .uk-nav-offcanvas>li>a:hover{background:#404040;color:#fff;outline:0}html .uk-nav.uk-nav-offcanvas>li.uk-active>a{background:#1a1a1a;color:#fff;box-shadow:inset 0 1px 3px rgba(0,0,0,.3)}.uk-nav-offcanvas .uk-nav-header{color:#777;margin-top:0;background:#404040;box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}.uk-nav-offcanvas .uk-nav-divider{border-top:1px solid rgba(255,255,255,.01);margin:0;height:4px;background:rgba(0,0,0,.2);box-shadow:inset 0 1px 3px rgba(0,0,0,.3)}.uk-nav-offcanvas ul a{color:#ccc}html:not(.uk-touch) .uk-nav-offcanvas ul a:hover{color:#fff}.uk-nav-offcanvas{border-bottom:1px solid rgba(0,0,0,.3);box-shadow:0 1px 0 rgba(255,255,255,.05)}.uk-nav-offcanvas .uk-nav-sub{border-top:1px solid rgba(0,0,0,.3);box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}.uk-nav-side>li.uk-active>a{background:#009dd8;color:#fff;box-shadow:inset 0 2px 4px rgba(0,0,0,.2);text-shadow:0 -1px 0 rgba(0,0,0,.2)}
            @font-face{font-family:'Droid Sans';font-style:normal;font-weight:400;src:local('Droid Sans'),local('DroidSans'),url(https://fonts.gstatic.com/s/droidsans/v6/s-BiyweUPV0v-yRb-cjciPk_vArhqVIZ0nv9q090hN8.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000}@font-face{font-family:Pacifico;font-style:normal;font-weight:400;src:local('Pacifico Regular'),local('Pacifico-Regular'),url(https://fonts.gstatic.com/s/pacifico/v7/Q_Z9mv4hySLTMoMjnk_rCfesZW2xOQ-xsNqO47m55DA.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000}input[type=checkbox]:checked:before{margin:1px 0 0}input[type=checkbox]{width:15px;height:15px}.uk-grid *{font-family:'Droid Sans',sans-serif}small.hand{font-family:Pacifico,cursive;color:#98AC29}small.text-desc{font-size:12px;font-style:italic;font-weight:400}nav.navbar.amp{height:auto;box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);}.amp-container,.amp-site-name{max-width:840px}.amp-site-name{margin-left:auto;margin-right:auto;padding:15px 35px 15px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;font-size:20px;font-weight:700;color:#fff;padding-left: 15px;}.uk-article-title{font-size:28px;font-weight:700;margin:25px 25px 15px 0;font: 300 27px/34px;}.uk-article-content{font-size:16px;font-weight:400;word-spacing:1px;margin-right: 25px;}p.uk-article-meta{font-size:15px;margin-bottom:25px; line-height:25px;margin-right: 25px;}img.alignleft{float:left}img.alignright{float:right}img.aligncenter{clear:both;display:block;margin:0 auto 28px}body:not(.custom-background-image):after,body:not(.custom-background-image):before{height:0}.uk-article{margin-bottom:35px; text-align: justify;}input#mobile-test-url{width:270px}.avatar-16{margin:0 5px;border-radius:5px}.sp-replacer {height: 15px;border-radius: 5px;}.sp-preview-inner,.sp-preview {height: 12px ;}
                    .uk-grid{margin-left:0;padding-bottom:15px;background-color:#fff;width:100%;margin:auto;box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);}
                    body{background-color: #F5F5F5; }h3{font:400 20px/32px;} h1{font:400 24px/36px;}@media only screen and (max-width: 800px){.uk-container{ padding: 0px; }} amp-iframe{margin: 10px 0;}
                      amp-sidebar {width: 250px;padding-right: 10px;} .amp-close-image {top: 15px;left: 225px;cursor: pointer;} li {margin-bottom: 10px; float: left;} button {margin-left: 20px;} .amp-logo-image{margin-left: 10px;}.menu-icon{cursor:pointer;}
                      .amp-site-footer {padding: 20px;} a.menu-item {text-decoration: none; color: #4BA0CC; font-weight:bold;}table{border: 1px solid #cccccc; margin-bottom: 10px; width: 100%;border-collapse: collapse;}td, th{border: 1px solid #cccccc; padding: 15px;} .img-in-text-sm{margin: 0px 33.33%;} .img-in-text-lg{float: left;width: 100%;margin: 10px 0px;}.img-div{width: 100%; float:left;margin-left:25%;} .seperator{border: 2px solid <?php echo !empty($amps['color_header_text']) ? $amps['color_header_text'] : '#4BA0CC' ; ?>; width: 95%; box-shadow: 2px 2px 4px #ccc;} .margin-right-5{margin-right:5px;}.img-div > a{float:left;}.uk-article-content, .uk-article-content a{color: #000000;}.amp-related-posts{background-color:#EEE;padding:0 15px 20px;border-radius:5px;border:1px solid #ccc}.amp-related-posts h3{margin-bottom:10px}.amp-related-posts ul li{margin-bottom:5px; list-style: none;}.amp-related-posts ul{padding:0}amp-sidebar li{list-style: none;}
                      #beginPageLink{float:right; text-decoration: underline;}.original-page{margin: 15px 0 -15px 0}

                      .adsetting{text-align: center;margin-top: 10px;width: 100%;margin-left: -15px;}

                      @media screen and (max-width:360px){.img-div {margin-left: 5%}}
                      @media screen and (max-width:320px){ .img-div {margin-left: 0} .uk-article-title, .uk-grid h1{font-size: 20px;} .uk-article-content, .uk-aticle-meta{font-size: 14px;} }div.setleft{float: left; width: 15%;}div.setright{text-align: center; width: 85%;}div.textright{margin-left: 19%; }
            <?php if (isset($amps['color_header'])) { ?>
                .navbar.amp {
                    background: <?php echo $amps['color_header']; ?> ;
                }
            <?php } ?>
            <?php if (isset($amps['color_header_text'])) { ?>
                .amp-site-name a, .amp-site-footer, .amp-site-footer a {
                    color: <?php echo $amps['color_header_text']; ?> ;
                    text-decoration: none ;
                }
            <?php } ?>
            <?php if (isset($amps['color_article_title'])) { ?>
                .uk-article-title a, .uk-article-title {
                    color: <?php echo $amps['color_article_title']; ?> ;
                }
            <?php } ?>
            <?php if (isset($amps['color_article_text'])) { ?>
                .uk-article-content, .uk-article-content *{
                    color: <?php echo $amps['color_article_text']; ?> ;
                }
            <?php } ?>
            <?php if (isset($amps['rtl_switch']) && !empty($amps['rtl_switch'])) { ?>
                html{
                    direction: rtl;
                }
                .uk-article-content{
                    margin-left: 20px;
                }
            <?php } ?>
            <?php echo $amps['custom-css']; ?>
        </style>
    </head>
    <body>
    <?php
    $theme_locations = get_nav_menu_locations();
    $menu_obj = get_term( $theme_locations['primary'], 'nav_menu' );

    /* If AMP Menu is not disabled */
    if(!isset($amps['disable_menu_display']) || $amps['disable_menu_display'] == 0):
        $amp_selected_menu = (isset($amps['select_amp_menu']) && $amps['select_amp_menu'] != 'default') ? $amps['select_amp_menu'] : $menu_obj->term_id;
        $menu_args = array(
             'echo' => false,
             'menu' => $amp_selected_menu,
             'menu_class' => '',
             'container' => '',
             'link_before' => '- '
         );
             $siteMenu = wp_nav_menu($menu_args);
             if(!empty($siteMenu)):
     ?>
        <amp-sidebar id='sidebar'
          layout="nodisplay"
          side="right">
            <amp-img class='amp-close-image'
            src="<?php echo AMP_URL; ?>assets/img/close-menu.png"
            width="20"
            height="20"
            alt="close sidebar"
            on="tap:sidebar.close"
            role="button"
            tabindex="0"></amp-img>

            <?php
                $menu_list = MAMP_Render::replaceForAMP($siteMenu, false, true);
                $menu_list = MAMP_Render::constructAMPmenu($menu_list);
                echo $menu_list;
            ?>
        </amp-sidebar>
  <?php endif; endif; ?>

    <!-- Content -->

    <div class="uk-container uk-container-center uk-margin-top uk-margin-large-bottom amp-container" id="beginPage">
    <!-- Header -->
            <nav class="navbar amp <?php echo plugin_get_version(); ?>">

                <div class="amp-site-name">
                    <div class="setleft"> <?php if(!empty($siteMenu) && (!isset($amps['disable_menu_display']) || $amps['disable_menu_display'] == 0)): ?>
                        <a on='tap:sidebar.toggle' class="menu-icon"><amp-img src="<?php echo AMP_URL; ?>assets/img/menu-icon.png" height="30" width="30"></amp-img></a>
                    <?php endif; ?></div>
                    <div class="setright"><a class="amp-logo-heading" href="<?php echo $siteurl.'/amp/'; ?>"><?php
                        if (isset($amps['logo_image']) && !empty($amps['logo_image'])) {
                            ?>
                        <amp-img src="<?php echo $amps['logo_image']; ?>" alt="Logo" height="<?php echo !empty($amps['logo_image_height']) ? $amps['logo_image_height'] : 20; ?>" width="<?php echo !empty($amps['logo_image_width']) ? $amps['logo_image_width'] : 25; ?>" class="amp-logo-image"></amp-img>
                            <?php
                        }
                        ?>
                        <div class="textright"><?php if(empty($amps['sitename_hide'])) echo get_bloginfo("name"); ?></a>  </div>
                        </div>
                </div>
            </nav>

            <div class="uk-grid" data-uk-grid-margin>
             <div class="adsetting">
                    <?php
                     do_action('amp_supremacy_render_amp_ad', $amps, 'header' );
                 // do_action('amp_supremacy_render_amp_ad', $amps, 'footer' );

                    ?>
                </div>
                <!--<p class="original-page"><a href="#">Visit Original Page</a></p>-->
                <div class="uk-width-medium-1-1">


                    <?php if ($type == POST || $type == HOME) { ?>
                        <article class="uk-article">

                            <h1 class="uk-article-title">
                              <?php
                                $url = get_permalink($post);
                                $link_domain_title = parse_url($url);
                                $link_domain_title = preg_replace('#^www\.(.+\.)#i', '$1', $link_domain_title['host']);
                                $domain = parse_url(get_site_url());
                                $site_domain_title = preg_replace('#^www\.(.+\.)#i', '$1', $domain['host']);;
                                if ($site_domain_title == $link_domain_title)
                                {
                               ?>
                                <a href="<?php echo str_replace('//amp', '/amp', get_permalink($post).'/amp/'); ?>"><?php
                                    if ($type == POST) {
                                       echo !empty($post->post_title) ? $post->post_title : 'Untitled';
                                    }
                                    ?></a>
                            </h1>
                        <?php }
                            else{?>
                            <a href="<?php echo str_replace('//amp', '/amp', get_permalink($post)); ?>"><?php
                                    if ($type == POST) {
                                       echo !empty($post->post_title) ? $post->post_title : 'Untitled';
                                    }
                                    ?></a>

                            <?php }?>
                            <?php if ($type == POST) {
                                if(!empty($amps['on_author_name'])){ ?>
                                    <p class="uk-article-meta">Author: &nbsp;<amp-img src="<?php echo $author_avatar; ?>" height="16" width="16" class='margin-right-5'></amp-img>&nbsp;<?php echo $author; ?>
                                <?php }
                                    if(!empty($amps['on_post_date']))  echo 'on '.date('d F Y', strtotime($post->post_date));
                                    if(!empty($amps['on_post_categories']) && !empty($categories) && is_array($categories)) echo '&nbsp;<amp-img src="'.AMP_URL.'assets/img/category-icon.png" width="16" height="16" title="Categories"></amp-img> '. implode(', ', $categories).'&nbsp;';
                                    if(!empty($amps['on_post_tags']) && !empty($tags) && is_array($tags)) echo '<amp-img src="'.AMP_URL.'assets/img/tags-icon.png" width="16" height="16" title="Tags"></amp-img>&nbsp;'.join(', ', $tags);
                                ?></p>
                            <?php } ?>

                            <div class="uk-article-content">
                                <?php   ?>
                                <?php do_action('amp_load_social_sharing', $amps);  ?>
                                <?php if (has_post_thumbnail($post->ID) && empty($amps['featured_image_hide'])):
                                        $image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'single-post-thumbnail');
                                        if(isset($image[0]) && !empty($image[0])):
                                    ?>
                                    <p>
                                        <?php if(!empty($lightBoxEnabled)){  ?>
                                            <amp-img height="400" width="800" src="<?php echo $image[0]; ?>" alt="" layout="responsive" on="tap:lightbox<?php $post->ID ?>" tabindex="<?php $post->ID ?>" role="button"></amp-img>
                                            <amp-image-lightbox id="lightbox<?php $post->ID ?>" layout="nodisplay"></amp-image-lightbox>
                                        <?php } else { ?>
                                            <amp-img height="400" width="800" src="<?php echo $image[0]; ?>" alt="" layout="responsive"></amp-img>
                                        <?php }  ?>
                                    </p>
                                <?php endif; endif; ?>
                                <div class="adsetting">
                                <?php
                                do_action('amp_supremacy_render_amp_ad', $amps, 'postcontent' );
                                ?>
                                </div>
                                <?php
                                if ($type == POST) {

                                    $postContent = $post->post_content;
                                    if(empty($post->post_content)){
                                        if($thrive_editor){
                                            $postContent = get_post_meta( $post->ID, 'tve_content_before_more');
                                            $postContent = $postContent[0];
                                        }
                                        if($is_live_editor){
                                            $postContent = get_post_meta( $post->ID, 'dslc_code', true);
                                        }
                                    }
                                    echo do_shortcode(MAMP_Render::replaceForAMP($postContent));
                                }
                                if(!isset($amps['disable_recent_posts']) || empty($amps['disable_recent_posts'])){
                                    MAMP_Model::getAMPSupremacyRelatedPosts($post, $amps['relevant_posts_to']);
                                }
                                ?>
                            </div>
                        </article>
                    <?php } elseif ($type == CATE || $type == TAG) {
                            if ($type == CATE && !$homePage) { ?>
                            <h1 class="uk-article-title">Category: <?php echo $data; ?></h1>
                            <?php if($amps['on_category_description'] == 1){ ?>
                            <div class="uk-article-content"><?php MAMP_Model::check_category(); ?></div>
                            <div class='seperator'></div>
                            <h1 class="uk-article-title">Related Posts</h1>
                            <?php }?>
                             <div class='seperator'></div>
                        <?php } elseif ($type == TAG) { ?>
                            <h1 class="uk-article-title">Tag: <?php echo $data; ?></h1>
                            <?php if($amps['on_tag_description'] == 1){ ?>
                            <div class="uk-article-content"><?php MAMP_Model::check_tag(); ?></div>
                            <div class='seperator'></div>
                            <h1 class="uk-article-title">Related Posts</h1>
                            <?php }?>
                            <div class='seperator'></div>
                        <?php }

                        foreach ($posts_array as $k => $post) {
                            $first_name_author = get_user_meta($post->post_author, 'first_name', true);
                            $last_name_author = get_user_meta($post->post_author, 'last_name', true);
                            $author = $first_name_author . ' ' . $last_name_author;
                            $author_avatar = get_avatar_url($post->post_author, 16);
                            $RAWcategories = get_the_category($post->ID);
                            $categories = array();
                            foreach ($RAWcategories as $c) {
                                $categories[] = '<a href="' . str_replace('//amp', '/amp', get_category_link($c->term_id)) . '/amp/">' . $c->cat_name . '</a>';
                            }
                            $RAWtags = wp_get_post_tags($post->ID);
                            $tags = array();
                            foreach ($RAWtags as $t) {
                                $tags[] = '<a href="' . str_replace('//amp', '/amp', get_tag_link($t->term_id)) . '/amp/">' . $t->name . '</a>';
                            }
                            ?>
                            <article class="uk-article">
                                <?php if(!post_password_required($post->ID)){ ?>

                                <h1 class="uk-article-title">
                              <?php
                                $url = get_permalink($post);
                                $link_domain_title = parse_url($url);
                                $link_domain_title = preg_replace('#^www\.(.+\.)#i', '$1', $link_domain_title['host']);
                                $domain = parse_url(get_site_url());
                                $site_domain_title = preg_replace('#^www\.(.+\.)#i', '$1', $domain['host']);;
                                if ($site_domain_title == $link_domain_title)
                                {
                               ?>
                                <a href="<?php echo str_replace('//amp', '/amp', get_permalink($post).'/amp/'); ?>"><?php

                                       echo !empty($post->post_title) ? $post->post_title : 'Untitled';

                                    ?></a>
                            </h1>
                        <?php }
                            else{?>
                            <a href="<?php echo str_replace('//amp', '/amp', get_permalink($post)); ?>"><?php

                                       echo !empty($post->post_title) ? $post->post_title : 'Untitled';
                                    ?></a>

                            <?php }?>

                                        <?php if(!empty($amps['on_author_name'])){ ?>
                                            <p class="uk-article-meta">Author: <amp-img src="<?php echo $author_avatar; ?>" height="16" width="16" class='margin-right-5'></amp-img><?php echo $author; ?>
                                        <?php }
                                            if(!empty($amps['on_post_date']))  echo 'on '.date('d F Y', strtotime($post->post_date));
                                            if(!empty($amps['on_post_categories']) && !empty($categories) && is_array($categories)) echo '&nbsp;<amp-img src="'.AMP_URL.'assets/img/category-icon.png" width="16" height="16" title="Categories"></amp-img> '. implode(', ', $categories).'&nbsp;';
                                            if(!empty($amps['on_post_tags']) && !empty($tags) && is_array($tags)) echo '<amp-img src="'.AMP_URL.'assets/img/tags-icon.png" width="16" height="16" title="Tags"></amp-img>&nbsp;'.join(', ', $tags);
                                        ?></p>

                                    <div class="uk-article-content">
                                        <?php if (has_post_thumbnail($post->ID) && empty($amps['featured_image_hide'])):
                                                $image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'single-post-thumbnail');
                                                if(isset($image[0]) && !empty($image[0])):
                                            ?>
                                            <p>
                                                <?php if(!empty($lightBoxEnabled)){  ?>
                                                    <amp-img height="400" width="800" src="<?php echo $image[0]; ?>" alt="" layout="responsive" on="tap:lightbox<?php $post->ID ?>" tabindex="<?php $post->ID ?>" role="button"></amp-img>
                                                    <amp-image-lightbox id="lightbox<?php $post->ID ?>" layout="nodisplay"></amp-image-lightbox>
                                                <?php } else { ?>
                                                    <amp-img height="400" width="800" src="<?php echo $image[0]; ?>" alt="" layout="responsive"></amp-img>
                                                <?php }  ?>
                                            </p>

                                            <?php // ........?>
                                        <?php
                                            endif;
                                            endif;

                                        $postContent = $post->post_content;
                                        if(empty($post->post_content)){
                                            if($thrive_editor){
                                                $postContent = get_post_meta( $post->ID, 'tve_content_before_more');
                                                $postContent = $postContent[0];
                                            }
                                            if($is_live_editor){
                                                $postContent = get_post_meta( $post->ID, 'dslc_code', true);
                                            }
                                        }
                                        echo do_shortcode(MAMP_Render::replaceForAMP($postContent));
                                        ?>
                                    </div>
                                <?php } else { ?>

                                <?php // ..?>
         ?>
                                        <h1 class="uk-article-title">
                                            <a href="<?php echo str_replace('//amp', '/amp', get_permalink($post).'/amp/'); ?>" >Protected: <?php echo !empty($post->post_title) ? $post->post_title : 'Untitled'; ?></a>
                                        </h1>
                                        <a target="_blank" href="<?php echo get_permalink($post) ?>">Click here to unlock this post</a>
                                <?php } ?>
                            </article>
                            <?php if(count($posts_array) != ($k + 1) ){?>
                                <div class='seperator'></div>
                        <?php }}} ?>
                </div>
                <?php if(!empty($supremacy_ads)){ ?>
			<div class="uk-width-medium-1-1">
				<article class="uk-article">
					<?php foreach($supremacy_ads as $supremacy_ad){
						if (is_array(getimagesize($supremacy_ad))) {?>
						<p>
							<amp-img width="800" layout="responsive" src="<?php echo $supremacy_ad; ?>" alt="Supremacy Ads" height="150" class="amp-logo-image"></amp-img>
						</p>
					<?php }} ?>
				</article>
            </div>
		<?php } ?>

        <div class="adsetting">
                    <?php
                     do_action('amp_supremacy_render_amp_ad', $amps, 'footer' );
                 // do_action('amp_supremacy_render_amp_ad', $amps, 'footer' );

                    ?>
                </div>
            </div>

            <nav class="navbar amp <?php echo plugin_get_version(); ?> footer">
                <div class="amp-site-footer">
                    <a class="amp-logo-heading" href="<?php echo $siteurl; ?>">
                        <?php echo get_bloginfo('name'); if(get_bloginfo('description') != '') echo ' | '.get_bloginfo('description'); ?>
                    </a>
                    <?php if(!empty($amps['footer-extra-content'])){ ?>
                        <br/><span class="amp-logo-heading"><?php echo preg_replace('/\\\\/', '', $amps['footer-extra-content']); ?></span>
                    <?php } ?>
                        <a href="#beginPage" id="beginPageLink">Scroll to Top</a>
                </div>
            </nav>
        </div>

        <?php
            if(!empty($amps['google_analytics_tracking_id'])):
                do_action('amp_supremacy_load_analytics', $amps);
            endif;
        ?>
    </body>
</html>
