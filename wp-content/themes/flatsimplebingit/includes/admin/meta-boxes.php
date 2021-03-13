<?php
/**
 * Initialize the meta boxes. 
 */
add_action( 'admin_init', '_custom_meta_boxes' );

/**
 * Meta Boxes kentooz code.
 *
 * @return    void
 *
 * @access    private
 * @since     2.0
 */
function _custom_meta_boxes() {
  
  /**
   * Create a custom meta boxes array that we pass to 
   * the OptionTree Meta Box API Class.
   */
  
  $general_page = array(
    'id'          => 'general_page',
    'title'       => 'Page options',
    'desc'        => '',
    'pages'       => array( 'page' ),
    'context'     => 'normal',
    'priority'    => 'high',
    'fields'      => array(
      array(
        'label'       => 'General',
        'id'          => 'general_option',
        'type'        => 'tab'
      ),
      array(
        'label'       => 'Background',
        'id'          => 'ktz_dynamicbg',
        'type'        => 'background',
        'desc'        => 'This setting background for exclusive pages. Please select your background for your background pages.',
        'std'         => '',
      ),
      array(
        'label'       => 'SEO option',
        'id'          => 'seo_option',
        'type'        => 'tab'
      ),
      array(
        'label'       => 'Information',
        'id'          => 'ktz_textblock',
        'type'        => 'textblock',
        'desc'        => __( 'For more information, if you use SEO plugin like yoast or AIO, please disable kentooz SEO, you can disable it via theme option -> SEO and leave blank this options.', 'ktz_theme_textdomain' ),
      ),
      array(
        'label'       => 'Meta Description',
        'id'          => 'ktz_meta_description',
        'type'        => 'textarea-simple',
        'desc'        => 'This Meta Description will be used in facebook share and google search results. If you leave blank this options, so we system will detect your first content. If you use plugin SEO please disable SEO featured via themes options.',
        'std'         => '',
        'rows'        => '5',
      ),
      array(
        'label'       => 'Meta keyword',
        'id'          => 'ktz_meta_keywords',
        'type'        => 'textarea-simple',
        'desc'        => 'This Meta keywords will be used in google search results. If you leave blank this options, so we system will detect automatic keywords for your meta. If you use plugin SEO please disable SEO featured via themes options.',
        'std'         => '',
        'rows'        => '5',
      ),
      array(
        'label'       => __( 'Enable noindex in meta robot?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_meta_noindex',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for to ask search engines not to index this page.', 'ktz_theme_textdomain' ),
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
      ),
      array(
        'label'       => __( 'Enable nofollow in meta robot?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_meta_nofollow',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for to ask search engines not to follow links from this page.', 'ktz_theme_textdomain' ),
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
      ),
      array(
        'label'       => __( 'Enable noodp in meta robot?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_meta_noodp',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for to ask search engines not to use descriptions from the Open Directory Project for this page.', 'ktz_theme_textdomain' ),
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
      ),
      array(
        'label'       => __( 'Enable noydir in meta robot?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_meta_noydir',
        'type'        => 'radio',
        'desc'        => __( 'Check this box to ask Yahoo! not to use descriptions from the Yahoo! directory for this page.', 'ktz_theme_textdomain' ),
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
      ),
      array(
        'label'       => 'Squeeze Page',
        'id'          => 'squeeze_option',
        'type'        => 'tab'
      ),
      array(
        'label'       => 'Information',
        'id'          => 'ktz_textblock',
        'type'        => 'textblock',
        'desc'        => __( 'For information, this is for custom page squeeze page look page atribute in right sidebar change template to squeeze and you can setting squeeze page here. Look this image: http://prntscr.com/3t3zm5 or read this tutorial for page attribute: http://en.support.wordpress.com/pages/page-attributes/', 'ktz_theme_textdomain' ),
      ),
      array(
        'label'       => __( 'Enable menu in squeeze?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_menu_squeeze',
        'type'        => 'radio',
        'desc'        => __( 'Check this for enable menus in squeeze, for menu you can set via appearances -> menus.', 'ktz_theme_textdomain' ),
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
      ),
      array(
        'label'       => __( 'Enable footer copyright in squeeze?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_copyright_squeeze',
        'type'        => 'radio',
        'desc'        => __( 'Check this for enable footer copyright in squeeze, for footer copyright you can set via theme option -> general.', 'ktz_theme_textdomain' ),
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
      ),
      array(
        'label'       => __( 'Enable exit splash page?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_exit_splash_squeeze_enable',
        'type'        => 'radio',
        'desc'        => __( 'Check this for enable exit splash page in squeeze, exit splash page is for boast visitor when exit page.', 'ktz_theme_textdomain' ),
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
      ),
      array(
        'label'       => 'URL exit splash page',
        'id'          => 'ktz_url_splash_squeeze',
        'type'        => 'text',
        'desc'        => 'Please fill with URL exit splash page, please use http:// for example http://kentooz.com',
        'std'         => 'http://kentooz.com',
		'condition'   => 'ktz_exit_splash_squeeze_enable:is(yes),ktz_exit_splash_squeeze_enable:not()',
      ),
      array(
        'label'       => 'URL exit splash page',
        'id'          => 'ktz_text_splash_squeeze',
        'type'        => 'textarea-simple',
        'desc'        => 'Please fill text alert when visitor exit your page.',
        'std'         => 'Wait!!! Before you go please read our another offer, you will be love!!!',
		'condition'   => 'ktz_exit_splash_squeeze_enable:is(yes),ktz_exit_splash_squeeze_enable:not()',
      ),
      array(
        'label'       => 'Width squeeze',
        'id'          => 'ktz_width_squeeze',
        'type'        => 'text',
        'desc'        => 'Please fill with width squeeze you want, for better maximum width is 1100px. Please use px or % for example 800px, 900px etc',
        'std'         => '790px',
      ),
      array(
        'label'       => 'Margin top squeeze',
        'id'          => 'ktz_margintop_squeeze',
        'type'        => 'text',
        'desc'        => 'Please fill with margin-top squeeze you want, for default is 0px. Please use px or % for example 0px, 10px etc, if you use small width you can fill this with 200px, etc',
        'std'         => '0px',
      ),
      array(
        'label'       => 'Header Background',
        'id'          => 'ktz_headbg_squeeze',
        'type'        => 'upload',
        'desc'        => 'This setting for header background your squeeze pages. Please select your background for your header background squeeze pages. For better you can use image width large than width squeeze',
        'std'         => '',
      ),
      array(
        'label'       => 'Background content squeeze',
        'id'          => 'ktz_contentbg_squeeze',
        'type'        => 'background',
        'desc'        => 'This setting background for squeezepage. you can use style with your own background for content. Default #fff (white)',
        'std'         => '',
      ),
      array(
        'label'       => 'Footer Background',
        'id'          => 'ktz_footbg_squeeze',
        'type'        => 'upload',
        'desc'        => 'This setting for Footer background your squeeze pages. Please select your background for your Footer background squeeze pages.  For better you can use image width large than width squeeze',
        'std'         => '',
      ),
  	)
  );  
  
  $general_post = array(
    'id'          => 'post_option',
    'title'       => 'Post options',
    'desc'        => '',
    'pages'       => array( 'post' ),
    'context'     => 'normal',
    'priority'    => 'high',
    'fields'      => array(
      array(
        'label'       => 'General',
        'id'          => 'general_option',
        'type'        => 'tab'
      ),
      array(
        'label'       => 'Background',
        'id'          => 'ktz_dynamicbg',
        'type'        => 'background',
        'desc'        => 'This setting background for exclusive pages. Please select your background for your background pages.',
        'std'         => '',
      ),
      array(
        'label'       => 'SEO option',
        'id'          => 'seo_option',
        'type'        => 'tab'
      ),
      array(
        'label'       => 'Information',
        'id'          => 'ktz_textblock',
        'type'        => 'textblock',
        'desc'        => __( 'For more information, if you use SEO plugin like yoast or AIO, please disable kentooz SEO, you can disable it via theme option -> SEO and leave blank this options.', 'ktz_theme_textdomain' ),
      ),
      array(
        'label'       => 'Meta Description',
        'id'          => 'ktz_meta_description',
        'type'        => 'textarea-simple',
        'desc'        => 'This Meta Description will be used in facebook share and google search results. If you leave blank this options, so we system will detect your first content. If you use plugin SEO please disable SEO featured via themes options.',
        'std'         => '',
        'rows'        => '5',
      ),
      array(
        'label'       => 'Meta keyword',
        'id'          => 'ktz_meta_keywords',
        'type'        => 'textarea-simple',
        'desc'        => 'This Meta keywords will be used in google search results. If you leave blank this options, so we system will detect automatic keywords for your meta. If you use plugin SEO please disable SEO featured via themes options.',
        'std'         => '',
        'rows'        => '5',
      ),
      array(
        'label'       => __( 'Enable noindex in meta robot?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_meta_noindex',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for to ask search engines not to index this page.', 'ktz_theme_textdomain' ),
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
      ),
      array(
        'label'       => __( 'Enable nofollow in meta robot?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_meta_nofollow',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for to ask search engines not to follow links from this page.', 'ktz_theme_textdomain' ),
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
      ),
      array(
        'label'       => __( 'Enable noodp in meta robot?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_meta_noodp',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for to ask search engines not to use descriptions from the Open Directory Project for this page.', 'ktz_theme_textdomain' ),
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
      ),
      array(
        'label'       => __( 'Enable noydir in meta robot?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_meta_noydir',
        'type'        => 'radio',
        'desc'        => __( 'Check this box to ask Yahoo! not to use descriptions from the Yahoo! directory for this page.', 'ktz_theme_textdomain' ),
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
      ),
      array(
        'label'       => __( 'Link', 'ktz_theme_textdomain' ),
        'id'          => 'link_format_option',
        'type'        => 'tab'
      ),
      array(
        'label'       => 'Link post format',
        'id'          => 'ktz_link_postformat',
        'type'        => 'text',
        'desc'        => 'If you use post format link for your post, please fill this with external link. Don\'t forget to use full link example: http://kentooz.com use "http://".',
        'std'         => '',
      ),
      array(
        'label'       => 'Gallery',
        'id'          => 'gallery_format_option',
        'type'        => 'tab'
      ),
	  array(
		'label'       => 'Gallery post format',
		'id'          => 'ktz_gallery_post_postformat',
		'type'        => 'gallery',
		'desc'        => __( 'If you use post format gallery for your post, please click add new and fill box with image and description, this will be display slider in your post.', 'ktz_theme_textdomain' ),
		'std'         => ''
      ),
      array(
        'label'       => 'Video',
        'id'          => 'video_format_option',
        'type'        => 'tab'
      ),
      array(
        'label'       => __( 'Enable social lock for this video post?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_activated_locker',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for enable social lock for this video post and check no for disable social lock. If this enable, visitor must like or share first before play video.', 'ktz_theme_textdomain' ),
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
      ),
      array(
        'label'       => 'Youtube',
        'id'          => 'ktz_youtube_id',
        'type'        => 'text',
        'desc'        => 'Fill this with youtube ID video for example link: http://www.youtube.com/watch?v=HhHqUDKWVx4 just fill with HhHqUDKWVx4, leave blank all field in video option if you use youtube video.',
        'std'         => '',
      ),
      array(
        'label'       => 'Vimeo',
        'id'          => 'ktz_vimeo_id',
        'type'        => 'text',
        'desc'        => 'Fill this with vimeo ID video for example link: http://vimeo.com/86599344 just fill with 86599344, leave blank all field in video option if you use vimeo video.',
        'std'         => '',
      ),
      array(
        'label'       => 'Dailymotion',
        'id'          => 'ktz_dailymotion_url',
        'type'        => 'text',
        'desc'        => 'Fill this with dailymotion video ID for example link: http://www.dailymotion.com/video/xt191t_compilation-34-party-fails_fun fill with id Video here is id video xt191t, leave blank all field in video option if you use dailymotion video.',
        'std'         => '',
      ),
      array(
        'label'       => 'Self video host (MP4 format)',
        'id'          => 'ktz_self_video_mp4',
        'type'        => 'text',
        'desc'        => 'Please insert link with example link:http://www.example.com/video-format.mp4. Support video: MP4 format.',
        'std'         => '',
      ),
      array(
        'label'       => 'Self video host (webm format)',
        'id'          => 'ktz_self_video_webm',
        'type'        => 'text',
        'desc'        => 'Please insert link with example link:http://www.example.com/video-format.webm. Support video: webm format.',
        'std'         => '',
      ),
      array(
        'label'       => 'Self video host (ogg format)',
        'id'          => 'ktz_self_video_ogg',
        'type'        => 'text',
        'desc'        => 'Please insert link with example link:http://www.example.com/video-format.ogg. Support video: ogg format.',
        'std'         => '',
      ),
      array(
        'label'       => 'Video streaming host (rtmp format)',
        'id'          => 'ktz_self_video_rtmp',
        'type'        => 'text',
        'desc'        => 'Please insert link with example link:rtmp://ip/rmtplink. Support video: rtmp format.',
        'std'         => '',
      ),
      array(
        'label'       => 'Other source',
        'id'          => 'ktz_other_video',
        'type'        => 'text',
        'desc'        => 'Fill this with iframe embed code video, for example in metacafe: < iframe src="http://www.metacafe.com/embed/11311715/" width="540" height="304" allowFullScreen frameborder=0> </iframe > you must fill full embed for other source, you can use another embed code from other video source, leave blank all field in video option if you use other source video.',
        'std'         => '',
      ),
    )
  );
 
  $general_product = array(
    'id'          => 'product_option',
    'title'       => 'Product options',
    'desc'        => '',
    'pages'       => array( 'product' ),
    'context'     => 'normal',
    'priority'    => 'high',
    'fields'      => array(
      array(
        'label'       => 'General',
        'id'          => 'general_option',
        'type'        => 'tab'
      ),
      array(
        'label'       => 'Background',
        'id'          => 'ktz_dynamicbg',
        'type'        => 'background',
        'desc'        => 'This setting background for exclusive pages. Please select your background for your background pages.',
        'std'         => '',
      ),
      array(
        'label'       => 'SEO option',
        'id'          => 'seo_option',
        'type'        => 'tab'
      ),
      array(
        'label'       => 'Information',
        'id'          => 'ktz_textblock',
        'type'        => 'textblock',
        'desc'        => __( 'For more information, if you use SEO plugin like yoast or AIO, please disable kentooz SEO, you can disable it via theme option -> SEO and leave blank this options.', 'ktz_theme_textdomain' ),
      ),
      array(
        'label'       => 'Meta Description',
        'id'          => 'ktz_meta_description',
        'type'        => 'textarea-simple',
        'desc'        => 'This Meta Description will be used in facebook share and google search results. If you leave blank this options, so we system will detect your first content. If you use plugin SEO please disable SEO featured via themes options.',
        'std'         => '',
        'rows'        => '5',
      ),
      array(
        'label'       => 'Meta keyword',
        'id'          => 'ktz_meta_keywords',
        'type'        => 'textarea-simple',
        'desc'        => 'This Meta keywords will be used in google search results. If you leave blank this options, so we system will detect automatic keywords for your meta. If you use plugin SEO please disable SEO featured via themes options.',
        'std'         => '',
        'rows'        => '5',
      ),
      array(
        'label'       => __( 'Enable noindex in meta robot?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_meta_noindex',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for to ask search engines not to index this page.', 'ktz_theme_textdomain' ),
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
      ),
      array(
        'label'       => __( 'Enable nofollow in meta robot?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_meta_nofollow',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for to ask search engines not to follow links from this page.', 'ktz_theme_textdomain' ),
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
      ),
      array(
        'label'       => __( 'Enable noodp in meta robot?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_meta_noodp',
        'type'        => 'radio',
        'desc'        => __( 'Please check yes for to ask search engines not to use descriptions from the Open Directory Project for this page.', 'ktz_theme_textdomain' ),
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
      ),
      array(
        'label'       => __( 'Enable noydir in meta robot?', 'ktz_theme_textdomain' ),
        'id'          => 'ktz_meta_noydir',
        'type'        => 'radio',
        'desc'        => __( 'Check this box to ask Yahoo! not to use descriptions from the Yahoo! directory for this page.', 'ktz_theme_textdomain' ),
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
      ),
      array(
        'label'       => __( 'Product setting', 'ktz_theme_textdomain' ),
        'id'          => 'product_option',
        'type'        => 'tab'
      ),
      array(
        'label'       => 'Badge Text',
        'id'          => 'ktz_woo_badge_text',
        'type'        => 'text',
        'desc'        => 'If you want add custom badge text, you can insert text here.',
        'std'         => '',
      ),
      array(
        'label'       => 'Badge Color',
        'id'          => 'ktz_woo_badge_color',
        'type'        => 'colorpicker',
        'desc'        => 'Please select badge color in overlay thumbnail.',
        'std'         => '',
      ),
    )
  );
  
  /**
   * Register our meta boxes using the 
   * ot_register_meta_box() function.
   */
  ot_register_meta_box( $general_post );
  ot_register_meta_box( $general_page );
  ot_register_meta_box( $general_product );

}