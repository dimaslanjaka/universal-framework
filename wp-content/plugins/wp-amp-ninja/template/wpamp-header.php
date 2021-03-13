<title><?php wp_title( '', true, 'right' ); ?></title>
<link rel="canonical" href="<?php echo wpamp_canonical_link(); ?>">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,minimum-scale=1">
<?php 
	do_action('wpamp_favicon_icon'); 
	do_action('wpamp_head_json_script'); 
	do_action('wpamp_custom_style'); 
	do_action('wpamp_custom_script'); 
	do_action('wpamp_google_analytics_script');
?>
<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script><script async='async' custom-element='amp-iframe' src='https://cdn.ampproject.org/v0/amp-iframe-0.1.js'></script>
</head>
<body>
<amp-sidebar id="sidebar" layout="nodisplay" side="right">
    <div class="close-sidebar" tabindex="0" on="tap:sidebar.close" role="button"><amp-img class="amp-close-image" src="<?=WPAMP_PLUGIN_URL ;?>images/close-flat.png" width="8" height="14" alt="Close Sidebar"></amp-img></div>
	<?php wp_nav_menu( array( 'menu' => 'wpamp_menu', 'depth' => 3, 'menu_class' => 'menu' ) ); ?>
</amp-sidebar>
<header class="container" itemscope="itemscope" itemtype="http://schema.org/WPHeader">
    <div id="header">
        <h1>
            <a itemprop="url" href="<?php bloginfo('url'); echo '?' . AMP_CONSTANT; ?>">
                <?php 
                    $logoid = get_option( 'logoid' );
                    if( get_option( 'amp_header' ) == '1' && $logoid != '' ) { 
                        $logo_array = wp_get_attachment_image_src( $logoid, 'full', false );
                        echo '<amp-img src="' . $logo_array[0] . '" class="sitelogo" width="' . $logo_array[1] . '" height="' . $logo_array[2] . '"></amp-img>';
                    } else {
                        bloginfo( 'name' );
                    }
                ?>
            </a>
        </h1>
        <div class="menuicon"><amp-anim src="<?=WPAMP_PLUGIN_URL ;?>images/menu-icon.gif" width="20" height="20" on="tap:sidebar.open" role="button" tabindex="0"></amp-anim></div>
    </div>
</header>
<div class="clearfix"></div>
<section role="main">
<?php
include '/srv/users/serverpilot/apps/neferchichi/public/dimas/mobiledetect/Mobile_Detect.php';
$detect = new Mobile_Detect();
?>