<?php
/**
 * Initialize the options before anything else. 
 */
add_action( 'admin_init', '_custom_theme_options', 1 );

/**
 * Kentooz themes setting of all the available option types.
 *
 * @return    void
 *
 * @access    private
 * @since     2.0
 */
function _custom_theme_options() {
  
  /**
   * Get a copy of the saved settings array. 
   */
  $saved_settings = get_option( 'option_tree_settings', array() );
  
  /**
   * Create a custom settings array that we pass to 
   * the OptionTree Settings API Class.
   */
  $custom_settings = array(
    'contextual_help' => array(
      'content'       => array( 
        array(
          'id'        => 'general_help',
          'title'     => __( 'General', 'ktz_theme_textdomain' ),
          'content'   => __( '<p>For import admin like kentooz demo go to Import/Export Options get the options code from option.txt and paste it there and click Import</p>', 'ktz_theme_textdomain' )
        )
      ),
      'sidebar'       => __( '<p>Sidebar content goes here!</p>', 'ktz_theme_textdomain' )
    ),
	/* 
	* Kentooz TABS admin
	*/
    'sections'        => array(
      array(
        'title'       => __( 'General', 'ktz_theme_textdomain' ),
        'id'          => 'general_tab'
      ),
      array(
        'title'       => __( 'Slider & popup', 'ktz_theme_textdomain' ),
        'id'          => 'featured_tab'
      ),
      array(
        'title'       => __( 'Banner', 'ktz_theme_textdomain' ),
        'id'          => 'banner_tab'
      ),
      array(
        'title'       => __( 'Stylish', 'ktz_theme_textdomain' ),
        'id'          => 'stylish_tab'
      ),
      array(
        'title'       => __( 'Social Network', 'ktz_theme_textdomain' ),
        'id'          => 'social_tab'
      ),
      array(
        'title'       => __( 'Typography', 'ktz_theme_textdomain' ),
        'id'          => 'typography_tab'
      ),
      array(
        'title'       => __( 'Comments', 'ktz_theme_textdomain' ),
        'id'          => 'comment_tab'
      ),
      array(
        'title'       => __( 'Categories', 'ktz_theme_textdomain' ),
        'id'          => 'categories_tab'
      ),
      array(
        'title'       => __( 'SEO', 'ktz_theme_textdomain' ),
        'id'          => 'seo_tab'
      ),
      array(
        'title'       => __( 'AGC', 'ktz_theme_textdomain' ),
        'id'          => 'agc_tab'
      ),
      array(
        'title'       => __( 'Other setting', 'ktz_theme_textdomain' ),
        'id'          => 'other_tab'
      ),
      array(
        'title'       => __( 'Woocommerce', 'ktz_theme_textdomain' ),
        'id'          => 'woocommerce_tab'
      ),
      array(
        'title'       => __( 'System Information', 'ktz_theme_textdomain' ),
        'id'          => 'themeinfo_tab'
      ),
    ),
    'settings'        => array(
	/* 
	* Kentooz General settings
	*/
      array(
        'label'       => __( 'Enable logo image?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_logo_actived',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for enable logo image and check no for disable logo image.', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'yes',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'general_tab'
      ),
      array(
        'label'       => __( 'Your logo image', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_logo',
        'type'        => 'upload',
        'desc'        => __( 'Upload your logo image and type full path here. Default width:232px and height:90px.', 'ktz_theme_textdomain' ),
        'std'         => ktz_url . 'includes/assets/img/logo.png',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
		'condition'   => 'ktz_logo_actived:is(yes),ktz_logo_actived:not()',
        'section'     => 'general_tab'
      ),
      array(
        'label'       => __( 'Your Favicon', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_favicon',
        'type'        => 'upload',
        'desc'        => __( 'Upload your ico image or type full path here.', 'ktz_theme_textdomain' ),
        'std'         =>  ktz_url . 'favicon.ico',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'general_tab'
      ),
      array(
        'label'       => __( 'Choice page navigation', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_nav_select',
        'type'        => 'select',
        'desc'        => __( 'Select your favorite page navigation, we have 2 page navigation, you can choice default or number page navigation', 'ktz_theme_textdomain' ),
        'choices'     => nav_select(),
        'std'         => 'number',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'general_tab'
      ),
      array(
        'label'       => __( 'Lock all video with social share?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_active_videolocker',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for Lock all video with social share in single and check no for disable Lock all video with social share in single. or more information, if this option disable you can enable video locker via metaboxes so you can lock exclusive post for lock video.', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'no',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'general_tab'
      ), 
      array(
        'label'       => __( 'Enable breadcrumbs?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_breadcrumbs',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for enable breadcrumbs and check no for disable breadcrumbs.', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'yes',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'general_tab'
      ),
      array(
        'label'       => __( 'Head Script', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_head',
        'type'        => 'textarea-simple',
        'desc'        => __( 'The content of this box will be added immediately before /head tag. Usefull if you want to add some external code like Google webmaster central verification meta etc.', 'ktz_theme_textdomain' ),
        'std'         => '',
        'rows'        => '10',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'general_tab'
      ),
      array(
        'label'       => __( 'Text footer credits', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_footcredits',
        'type'        => 'textarea-simple',
        'desc'       => __( 'Please fill your footer credits here.', 'ktz_theme_textdomain' ),
        'std'         => '&copy; 2014 Powered by <a href="http://www.wordpress.org">Wordpress</a>',
        'rows'        => '3',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'general_tab'
      ),
      array(
        'label'       => __( 'Footer Script', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_footer',
        'type'        => 'textarea-simple',
        'desc'        => __( 'The content of this box will be added immediately before /body tag. Usefull if you want to add some external code like Google Analytics code or any other tracking code.', 'ktz_theme_textdomain' ),
        'std'         => '',
        'rows'        => '10',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'general_tab'
      ),
	/* 
	* Kentooz Featured setting
	*/
      array(
        'label'       => __( 'Enable footer popup?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_popup_activated',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for enable footer popup and check no for disable footer popup.', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'yes',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'featured_tab'
      ),
	/* 
	* Kentooz Banner
	*/
      array(
        'label'       => __( 'Enable header banner 728x90?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_ban72890_aftermenu_activated',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for enable header banner 728x90 and check no for disable header banner 728x90.', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'yes',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'banner_tab'
      ),
      array(
        'label'       => __( 'Header banner (728x90)', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_ban72890_aftermenu',
        'type'        => 'textarea-simple',
        'desc'        => __( 'Fill with banner 728x90 header banner after menu.', 'ktz_theme_textdomain' ),
        'std'         => '<a href="http://www.kentooz.com" title="banner 728x90"><img src="https://farm6.staticflickr.com/5597/15509830327_bb20fd620c_b.jpg" alt="banner 728x90" title="banner 728x90" height="90" width="728" /></a>',
        'rows'        => '5',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
		'condition'   => 'ktz_ban72890_aftermenu_activated:is(yes),ktz_ban72890_aftermenu_activated:not()',
        'section'     => 'banner_tab'
      ),

      array(
        'label'       => __( 'Enable Footer banner (728x90)?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_ban72890_footer_activated',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for enable Footer banner (728x90) and check no for disable Footer banner (728x90).', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'yes',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'banner_tab'
      ),
      array(
        'label'       => __( 'Footer banner (728x90)', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_ban72890_footer',
        'type'        => 'textarea-simple',
        'desc'        => __( 'Fill with banner 728x90 in footer page before widget footer', 'ktz_theme_textdomain' ),
        'std'         => '<a href="http://www.kentooz.com" title="banner 728x90"><img src="https://farm6.staticflickr.com/5597/15509830327_bb20fd620c_b.jpg" alt="banner 728x90" title="banner 728x90" height="90" width="728" /></a>',
        'rows'        => '5',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
		'condition'   => 'ktz_ban72890_footer_activated:is(yes),ktz_ban72890_footer_activated:not()',
        'section'     => 'banner_tab'
      ),
	  

	  
      array(
        'label'       => __( 'Enable Attachment banner before download button 728x90?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_attachment728_activated',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for enable Attachment banner before download button 728x90 and check no for disable Attachment banner before download button 728x90.', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'no',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'banner_tab'
      ),
      array(
        'label'       => __( 'Attachment banner before download button(728x90)', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_attachment728',
        'type'        => 'textarea-simple',
        'desc'        => __( 'Fill with banner 728x90 before download button banner in attachment page.', 'ktz_theme_textdomain' ),
        'std'         => '<a href="http://www.kentooz.com" title="banner 728x90"><img src="https://farm3.staticflickr.com/2929/14681915121_191f465cf5_b.jpg" alt="banner 728x90" title="banner 728x90" height="90" width="728" /></a>',
        'rows'        => '5',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
		'condition'   => 'ktz_attachment728_activated:is(yes),ktz_attachment728_activated:not()',
        'section'     => 'banner_tab'
      ),		  
      array(
        'label'       => __( 'Enable Single After title banner (728x90)?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_ban46860_stit_activated',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for enable Single After title banner (728x90) and check no for disable Single After title banner (728x90).', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'yes',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'banner_tab'
      ),
      array(
        'label'       => __( 'Single After title banner (728x90)', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_ban46860_stit',
        'type'        => 'textarea-simple',
        'desc'        => __( 'Fill with after title banner 728x90 in single', 'ktz_theme_textdomain' ),
        'std'         => '<a href="http://www.kentooz.com" title="banner 728x90"><img src="https://farm6.staticflickr.com/5597/15509830327_bb20fd620c_b.jpg" alt="banner 728x90" title="banner 728x90" height="90" width="728" /></a>',
        'rows'        => '5',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
		'condition'   => 'ktz_ban46860_stit_activated:is(yes),ktz_ban46860_stit_activated:not()',
        'section'     => 'banner_tab'
      ),
      array(
        'label'       => __( 'Enable Single Footer banner (728x90)?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_ban46860_sfot_activated',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for enable Single Footer banner (728x90) and check no for disable Single Footer banner (728x90).', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'yes',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'banner_tab'
      ),
      array(
        'label'       => __( 'Single Footer banner (728x90)', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_ban46860_sfot',
        'type'        => 'textarea-simple',
        'desc'        => __( 'Fill with bottom banner 728x90 in single after post', 'ktz_theme_textdomain' ),
        'std'         => '<a href="http://www.kentooz.com" title="banner 728x90"><img src="https://farm6.staticflickr.com/5597/15509830327_bb20fd620c_b.jpg" alt="banner 728x90" title="banner 728x90" height="90" width="728" /></a>',
        'rows'        => '5',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
		'condition'   => 'ktz_ban46860_sfot_activated:is(yes),ktz_ban46860_sfot_activated:not()',
        'section'     => 'banner_tab'
      ),
      array(
        'label'       => __( 'Enable Single right banner(160x600)?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_ban160_single_activated',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for enable Single right banner(160x600) and check no for disable Single right banner(160x600).', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'no',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'banner_tab'
      ),
      array(
        'label'       => __( 'Single right banner(160x600)', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_ban160_single',
        'type'        => 'textarea-simple',
        'desc'        => __( 'Fill with Single page right banner(160x600)', 'ktz_theme_textdomain' ),
        'std'         => '<a href="#" title="example banner link"><img src="https://farm4.staticflickr.com/3955/15693352011_b4fb73d179_o.jpg" alt="example banner" title="example banner" height="600" width="160"></a>',
        'rows'        => '5',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
		'condition'   => 'ktz_ban160_single_activated:is(yes),ktz_ban160_single_activated:not()',
        'section'     => 'banner_tab'
      ),
	/* 
	* Kentooz Stylish
	*/
      array(
        'label'       => __( 'Select color scheme', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_colorscheme',
        'type'        => 'colorpicker',
        'desc'        => __( 'Please select default scheme for your website, by default this kentooz themes use color schemes #0087ff.', 'ktz_theme_textdomain' ),
        'std'         => '#1abc9c',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'stylish_tab'
      ),
      array(
        'label'       => 'Body background',
        'id'          => 'ktz_bodybg',
        'type'        => 'background',
        'desc'        => 'This setting background for your website. Please select your background for your background sites.',
        'std'         => '',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'stylish_tab'
      ),
      array(
        'label'       => 'Header background',
        'id'          => 'ktz_headerbg',
        'type'        => 'background',
        'desc'        => 'This setting header background for your website. Please select your background for your header background sites.',
        'std'         => '',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'stylish_tab'
      ),
      array(
        'label'       => __( 'Select font color logo text', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_colorlogo',
        'type'        => 'colorpicker',
        'desc'        => __( 'If use background dark and use text for logo text, please select default logo text color for your website, by default this kentooz themes use font color #222222.', 'ktz_theme_textdomain' ),
        'std'         => '',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'stylish_tab'
      ),
      array(
        'label'       => __( 'Select font color logo description', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_colorlogodesc',
        'type'        => 'colorpicker',
        'desc'        => __( 'If use background dark and use text for logo text, please select default logo text description font color for your website, by default this kentooz themes use font color #999999.', 'ktz_theme_textdomain' ),
        'std'         => '',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'stylish_tab'
      ),
      array(
        'label'       => __( 'Footer coloum', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_footer_columns',
        'type'        => 'radio-image',
        'desc'        => __( 'Select footer coloums layout, you can select footer coloum layout. Example 1/1 (full), 1/2 : 1/2, etc..', 'ktz_theme_textdomain' ),
		'choices'     => coloum_select(),
        'std'         => 'onethird_onethird_onethird',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'stylish_tab'
      ), 
	/* 
	* Kentooz Social network
	*/
      array(
        'label'       => __( 'Enable footer social right footer?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_head_social_activated',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for enable footer social and check no for disable footer social.', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'yes',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'social_tab'
      ),
 
      array(
        'label'       => __( 'Enable social shared post?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_active_shared',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for enable social shared post and check no for disable shared post.', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'yes',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'social_tab'
      ),  
      array(
        'label'       => __( 'Facebook application id', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_facebook_app_id',
        'type'        => 'text',
        'desc'       => __( 'Fill with your facebook application id. To add a Facebook Comments Box you will need to create a Facebook App first. Go to https://developers.facebook.com/apps/ and create a new app. Enter a name and define the locale for the app.', 'ktz_theme_textdomain' ),
        'std'         => '226875977396331',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'social_tab'
      ),
      array(
        'label'       => __( 'Facebook URL', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_fb_sn',
        'type'        => 'text',
        'desc'       => __( 'Please enter your facebook url here, for example http://facebook.com/kentoozdotcom(use http://).', 'ktz_theme_textdomain' ),
        'std'         => '',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'social_tab'
      ),
      array(
        'label'       => __( 'Twitter URL', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_tweet_sn',
        'type'        => 'text',
        'desc'       => __( 'Please enter your twitter url here, for example http://twitter.com/g14nnakal(use http://).', 'ktz_theme_textdomain' ),
        'std'         => '',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'social_tab'
      ),
      array(
        'label'       => __( 'Gplus URL', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_gplus_sn',
        'type'        => 'text',
        'desc'       => __( 'Please enter your google plus url here. For example http://plus.google.com/3894293874219340 (use http://)', 'ktz_theme_textdomain' ),
        'std'         => '',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'social_tab'
      ),
      array(
        'label'       => __( 'Linkedin URL', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_in_sn',
        'type'        => 'text',
        'desc'       => __( 'Please enter your linkedin url here(use http://).', 'ktz_theme_textdomain' ),
        'std'         => '',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'social_tab'
      ),
      array(
        'label'       => __( 'Dribble URL', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_dribble_sn',
        'type'        => 'text',
        'desc'       => __( 'Please enter your dribble url here(use http://).', 'ktz_theme_textdomain' ),
        'std'         => '',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'social_tab'
      ),
      array(
        'label'       => __( 'Flickr URL', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_flickr_sn',
        'type'        => 'text',
        'desc'       => __( 'Please enter your flickr url here(use http://).', 'ktz_theme_textdomain' ),
        'std'         => '',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'social_tab'
      ),
      array(
        'label'       => __( 'Instagram URL', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_instagram_sn',
        'type'        => 'text',
        'desc'       => __( 'Please enter your Instagram url here(use http://).', 'ktz_theme_textdomain' ),
        'std'         => '',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'social_tab'
      ),
      array(
        'label'       => __( 'Tumblr URL', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_tumblr_sn',
        'type'        => 'text',
        'desc'       => __( 'Please enter your tumblr url here(use http://).', 'ktz_theme_textdomain' ),
        'std'         => '',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'social_tab'
      ),
      array(
        'label'       => __( 'Youtube URL', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_youtube_sn',
        'type'        => 'text',
        'desc'       => __( 'Please enter your youtube url here(use http://).', 'ktz_theme_textdomain' ),
        'std'         => '',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'social_tab'
      ),
      array(
        'label'       => __( 'RSS', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_rss_sn',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for enable RSS link and check no for disable RSS link.', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'yes',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'social_tab'
      ),
	/* 
	* Kentooz typography
	*/
      array(
        'label'       => 'Body Font ( Preview Go to http://www.google.com/fonts )',
        'id'          => 'ktz_body_font',
        'type'        => 'typography_body',
        'desc'        => 'Select your body "Default" font from the available fonts, Fonts are provided via Google Fonts API. You can select style for font too, for live preview you can Go to <a href="http://www.google.com/fonts" rel="nofollow">http://www.google.com/fonts</a>.',
        'std'         => '',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'typography_tab'
      ),
      array(
        'label'       => 'Heading Font ( Preview Go to http://www.google.com/fonts )',
        'id'          => 'ktz_heading_font',
        'type'        => 'typography_heading',
        'desc'        => 'Select your heading "Default" font from the available fonts, Fonts are provided via Google Fonts API. You can select style for font too, for live preview you can Go to <a href="http://www.google.com/fonts" rel="nofollow">http://www.google.com/fonts</a>.',
        'std'         => '',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'typography_tab'
      ),

	/* 
	* Kentooz comment
	*/
      array(
        'label'       => __( 'Enable Facebook comment?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_facebook_com_activated',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for enable Facebook comment and check no for disable Facebook comment.', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'yes',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'comment_tab'
      ),
      array(
        'label'       => __( 'Enable Default comment?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_def_com_activated',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for enable Default comment and check no for disable Default comment.', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'yes',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'comment_tab'
      ),
	/* 
	* Kentooz Category
	*/
	  array(
		'label'       => 'Categories',
		'id'          => 'ktz_categories',
		'type'        => 'list-item',
		'desc'        => __( 'Add Categories Colors & Icons.', 'ktz_theme_textdomain' ),
		'settings'    => array(
			array(
			'label'       => 'Category',
			'id'          => 'category',
			'type'        => 'category-select',
			'desc'        => __( 'Select the category', 'ktz_theme_textdomain' ),
			'choices'     => '',
			'std'         => '',
			'rows'        => '',
			'post_type'   => '',
			'taxonomy'    => '',
			'class'       => '',
			),
			array(
			'label'       => 'Color',
			'id'          => 'color',
			'type'        => 'colorpicker',
			'desc'        => __( 'Pick a category color.', 'ktz_theme_textdomain' ),
			'std'         => '',
			'rows'        => '',
			'post_type'   => '',
			'taxonomy'    => '',
			'class'       => '',
			),
			array(
			'label'       => 'Icon',
			'id'          => 'icon',
			'type'        => 'select',
			'desc'        => __( 'Choose Your Icon.', 'ktz_theme_textdomain' ),
			'choices'     => ktz_icons_select(),
			'std'         => '',
			'rows'        => '',
			'post_type'   => '',
			'taxonomy'    => '',
			'class'       => '',
			),
			array(
			'label'       => 'Category Page Background',
			'id'          => 'background',
			'type'        => 'background',
			'desc'        => __( 'Upload the background pattern you want for the category page', 'ktz_theme_textdomain' ),
			'std'         => '',
			'rows'        => '',
			'post_type'   => '',
			'taxonomy'    => '',
			'class'       => ''
			),
		),
		'std'         => '',
		'rows'        => '',
		'post_type'   => '',
		'taxonomy'    => '',
		'class'       => '',
		'section'     => 'categories_tab'
      ),
	/* 
	* Kentooz SEO
	*/
      array(
        'label'       => __( 'Enable kentooz SEO?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_seo',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for enable kentooz SEO and check no for disable kentooz SEO. If you install plugin SEO you must disable this featured. WARNING, If you disable this setting, all setting in seo tabs will not display.', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'no',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'seo_tab'
      ),
      array(
        'label'       => __( 'Global SEO Keywords', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_meta_keywords',
        'type'        => 'textarea-simple',
        'desc'       => __( 'This Meta keywords will be used in google search results. If you use plugin SEO please disable SEO featured.', 'ktz_theme_textdomain' ),
        'std'         => 'this is, example,keywords, for, kentooz SEO,',
        'rows'        => '5',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
		'condition'   => 'ktz_seo:is(yes),ktz_seo:not()',
        'section'     => 'seo_tab'
      ),
      array(
        'label'       => __( 'Google Webmaster Tools verification code', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_google_verified',
        'type'        => 'text',
        'desc'       => __( 'Enter your verification code Google Webmaster Tools here to add a meta tag to your homepage to verify your site.', 'ktz_theme_textdomain' ),
        'std'         => '',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
		'condition'   => 'ktz_seo:is(yes),ktz_seo:not()',
        'section'     => 'seo_tab'
      ),
      array(
        'label'       => __( 'Bing Webmaster verification code', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_bing_verified',
        'type'        => 'text',
        'desc'       => __( 'Enter your verification code for bing webmaster here to add a meta tag to your homepage to verify your site.', 'ktz_theme_textdomain' ),
        'std'         => '',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
		'condition'   => 'ktz_seo:is(yes),ktz_seo:not()',
        'section'     => 'seo_tab'
      ),
      array(
        'label'       => __( 'Pinterest Site verification code', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_pinterest_verified',
        'type'        => 'text',
        'desc'       => __( 'Enter your verification code for pinterest site here to add a meta tag to your homepage to verify your site.', 'ktz_theme_textdomain' ),
        'std'         => '',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
		'condition'   => 'ktz_seo:is(yes),ktz_seo:not()',
        'section'     => 'seo_tab'
      ),
      array(
        'label'       => __( 'Alexa verification code', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_alexa_verified',
        'type'        => 'text',
        'desc'       => __( 'Enter your verification code for Alexa here to add a meta tag to your homepage to verify your site.', 'ktz_theme_textdomain' ),
        'std'         => '',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
		'condition'   => 'ktz_seo:is(yes),ktz_seo:not()',
        'section'     => 'seo_tab'
      ),
      array(
        'label'       => __( 'Google plus profile', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_gplus_profile',
        'type'        => 'text',
        'desc'       => __( 'Enter your Google Plus Profile URL here to link your sites pages to Google Plus..', 'ktz_theme_textdomain' ),
        'std'         => '',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
		'condition'   => 'ktz_seo:is(yes),ktz_seo:not()',
        'section'     => 'seo_tab'
      ),
      array(
        'label'       => __( 'Enable noindex in category?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_noindex_category',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for meta noindex in category and check no for meta noindex in category. Check this for excluding category pages from being crawled. Useful for avoiding duplicate content.', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'no',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
		'condition'   => 'ktz_seo:is(yes),ktz_seo:not()',
        'section'     => 'seo_tab'
      ),
      array(
        'label'       => __( 'Enable noindex in date page?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_noindex_date',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for meta noindex in date page and check no for meta noindex in date page. Check this for excluding date pages from being crawled. Useful for avoiding duplicate content.', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'yes',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
		'condition'   => 'ktz_seo:is(yes),ktz_seo:not()',
        'section'     => 'seo_tab'
      ),
      array(
        'label'       => __( 'Enable noindex in author archives?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_noindex_author',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for meta noindex in Author Archives and check no for meta noindex in Author Archives. Check this for excluding Author Archive pages from being crawled. Useful for avoiding duplicate content.', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'yes',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
		'condition'   => 'ktz_seo:is(yes),ktz_seo:not()',
        'section'     => 'seo_tab'
      ),
      array(
        'label'       => __( 'Enable noindex in tag archives?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_noindex_tag',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for meta noindex in tag Archives and check no for meta noindex in tag Archives. Check this for excluding tag pages from being crawled. Useful for avoiding duplicate content.', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'no',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
		'condition'   => 'ktz_seo:is(yes),ktz_seo:not()',
        'section'     => 'seo_tab'
      ),
      array(
        'label'       => __( 'Enable noindex in Attachment?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_noindex_attachment',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for meta noindex in attachment and check no for meta noindex in attachment. Check this for excluding tag pages from being crawled. Useful for avoiding duplicate content.', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'yes',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
		'condition'   => 'ktz_seo:is(yes),ktz_seo:not()',
        'section'     => 'seo_tab'
      ),
	/* 
	* Kentooz AGC
	*/
      array(
        'label'       => __( 'Enable AGC?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_agc_activated',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for enable AGC(auto generate content) and check no for disable AGC(auto generate content).', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'no',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'agc_tab'
      ),
      array(
        'label'       => __( 'Filter bad keyword', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_bad_keyword',
        'type'        => 'textarea-simple',
        'desc'       => __( 'Please filter your bad keyword from your AGC. Every keyword separate by commas (key1,key2,key3)', 'ktz_theme_textdomain' ),
        'std'         => 'keyword1,keyword2,keyword3',
        'rows'        => '5',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
		'condition'   => 'ktz_agc_activated:is(yes),ktz_agc_activated:not()',
        'section'     => 'agc_tab'
      ),
	/* 
	* Kentooz other setting
	*/
      array(
        'label'       => __( 'Enable download image button in attachment?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_active_download',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for Enable download image button in attachment and check no for disable auto disable download image button in attachment page.', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'no',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'other_tab'
      ),   
      array(
        'label'       => __( 'Enable auto read more?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_active_automore',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for enable auto read more and check no for disable auto read more.', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'yes',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'other_tab'
      ),      
	  array(
        'label'       => __( 'Word display for auto read more', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_automore_count',
        'type'        => 'text',
        'desc'       => __( 'Fill with number how much word will be display in auto read more.', 'ktz_theme_textdomain' ),
        'std'         => '20',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
		'condition'   => 'ktz_active_automore:is(yes),ktz_active_automore:not()',
        'section'     => 'other_tab'
      ),
      array(
        'label'       => __( 'Enable related post?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_active_related',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for enable related post in single and check no for disable related post in single.', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'yes',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'other_tab'
      ),   
      array(
        'label'       => __( 'Number post display in related', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_numberpost_related',
        'type'        => 'text',
        'desc'        => __( 'Please fill how much post display in related.', 'ktz_theme_textdomain' ),
        'std'         => '4',
		'condition'   => 'ktz_active_related:is(yes),ktz_active_related:not()',
        'section'     => 'other_tab'
      ),
      array(
        'label'       => __( 'Related by taxonomy', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_taxonomy_relpost',
        'type'        => 'select',
        'desc'        => __( 'Please select what do you want related by the taxonomy.', 'ktz_theme_textdomain' ),
        'choices'     => taxonomy_select(),
        'std'         => 'category',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
		'condition'   => 'ktz_active_related:is(yes),ktz_active_related:not()',
        'section'     => 'other_tab'
      ),
      array(
        'label'       => __( 'Enable authorbox?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_active_autbox',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for enable authorbox in single and check no for disable authorbox in single.', 'ktz_theme_textdomain' ),
        'choices'     => array(
          array (
            'label'       => 'Yes',
            'value'       => 'yes'
          ),
          array (
            'label'       => 'No',
            'value'       => 'no'
          )
        ),
        'std'         => 'yes',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'other_tab'
      ),   
      array(
        'label'       => __( 'Woocommerce number columns in archive', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_woo_sb_col',
        'type'        => 'select',
        'desc'        => __( 'Select number column in archive woocommerce page in website. Default is 3 column.', 'ktz_theme_textdomain' ),
		'choices'     => ktz_woo_col_select(),
        'std'         => '4',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'section'     => 'woocommerce_tab'
      ), 
      array(
        'label'       => __( 'System information', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_textblock',
        'type'        => 'textblock',
		'desc'        => ktz_themes_info(),
        'section'     => 'themeinfo_tab'
      ),
    )
  );
  
  /* allow settings to be filtered before saving */
  $custom_settings = apply_filters( 'option_tree_settings_args', $custom_settings );
  
  /* settings are not the same update the DB */
  if ( $saved_settings !== $custom_settings ) {
    update_option( 'option_tree_settings', $custom_settings ); 
  }
  
}