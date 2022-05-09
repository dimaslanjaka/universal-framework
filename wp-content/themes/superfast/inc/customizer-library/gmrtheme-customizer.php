<?php
/**
 * Defines customizer options
 *
 * @package superfast
 */
 
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
 
/**
 * Option array customizer library
 *
 * @since 1.0.0
 */
function gmr_library_options_customizer() {
	
	// Prefix_option
	$gmrprefix = 'gmr';
	
	/*
	 * Theme defaults
	 *
	 * @since v.1.0.0
	 */
	// General
	$color_scheme = '#e74c3c';
	
	/* 
	 * Header Default Options
	 */
	$header_bgcolor = '#ffffff';
	$sitetitle_color = '#e74c3c';
	$menu_bgcolor = '#e74c3c';
	$menu_color = '#ffffff';
	$menu_hoverbgcolor = '#db301e';
	$menu_hovercolor = '#dddddd';
	$sitedesc_color = '#999999';
	
	$default_logo = get_template_directory_uri() .'/images/logo.png';
	
	// content
	$content_bgcolor = '#fff';
	$content_color = '#2c3e50';
	
	// Footer
	$footer_bgcolor = '#3d566e';
	$footer_fontcolor = '#ecf0f1';
	$footer_linkcolor = '#f39c12';
	$footer_hoverlinkcolor = '#f1c40f';
	$copyright_bgcolor = '#2c3e50';
	$copyright_fontcolor = '#f1c40f';
	$copyright_linkcolor = '#ecf0f1';
	$copyright_hoverlinkcolor = '#bdc3c7';
	
	// Stores all the controls that will be added
	$options = array();
	
	// Stores all the sections to be added
	$sections = array();
	
	// Stores all the panels to be added
	$panels = array();
	
	// Adds the sections to the $options array
	$options['sections'] = $sections;
	
	/*
	 * General Section Options
	 *
	 * @since v.1.0.0
	 */
	$panel_general = 'panel-general';
	$panels[] = array(
		'id' => $panel_general,
		'title' => __( 'General', 'superfast' ),
		'priority' => '30'
	);
	
	$section = 'layout_options';
	$sections[] = array(
		'id' => $section,
		'title' => __( 'General Layout', 'superfast' ),
		'priority' => 35,
		'panel' => $panel_general
	);
	
	$layout = array(
		'box-layout' => __( 'Box', 'superfast' ),
		'full-layout' => __( 'Fullwidth', 'superfast' ),
	);
	$options[$gmrprefix . '_layout'] = array(
		'id' => $gmrprefix . '_layout',
		'label'   => __( 'Select Layout', 'superfast' ),
		'section' => $section,
		'type'    => 'select',
		'choices' => $layout,
		'default' => 'box-layout'
	);
	
	$options[$gmrprefix . '_active-logosection'] = array(
		'id' => $gmrprefix . '_active-logosection',
		'label'   => __( 'Disable logo section', 'superfast' ),
		'section' => $section,
		'type'    => 'checkbox',
		'default' => 0,
		'description' => __( 'If you disable logo section, ads side logo will not display.', 'superfast' )
	);
	
	// Colors
	$section = 'colors';
	$sections[] = array(
		'id' => $section,
		'title' => __( 'General Colors', 'superfast' ),
		'panel' => $panel_general,
		'priority' => 40
	);
	
	$options[$gmrprefix . '_scheme-color'] = array(
		'id' => $gmrprefix . '_scheme-color',
		'label'   => __( 'Base Color Scheme', 'superfast' ),
		'section' => $section,
		'type'    => 'color',
		'default' => $color_scheme
	);
	
	$options[$gmrprefix . '_content-bgcolor'] = array(
		'id' => $gmrprefix . '_content-bgcolor',
		'label'   => __( 'Background Color - Content', 'superfast' ),
		'section' => $section,
		'type'    => 'color',
		'default' => $content_bgcolor,
		'priority' => 40
	);
	
	$options[$gmrprefix . '_content-color'] = array(
		'id' => $gmrprefix . '_content-color',
		'label'   => __( 'Font Color - Body', 'superfast' ),
		'section' => $section,
		'type'    => 'color',
		'default' => $content_color,
		'priority' => 40
	);
	
	// Colors
	$section = 'background_image';
	$sections[] = array(
		'id' => $section,
		'title' => __( 'Background Image', 'superfast' ),
		'panel' => $panel_general,
		'description' => __( 'Background Image only display, if using box layout.', 'superfast' ),
		'priority' => 45
	);
	
	// Typography
	$section = 'typography';
	$font_choices = customizer_library_get_font_choices();
	$sections[] = array(
		'id' => $section,
		'title' => __( 'Typography', 'superfast' ),
		'panel' => $panel_general,
		'priority' => 50
	);
	
	$options[$gmrprefix . '_primary-font'] = array(
		'id' => $gmrprefix . '_primary-font',
		'label'   => __( 'Heading Font', 'superfast' ),
		'section' => $section,
		'type'    => 'select',
		'choices' => $font_choices,
		'default' => 'Nunito'
	);
	
	$options[$gmrprefix . '_secondary-font'] = array(
		'id' => $gmrprefix . '_secondary-font',
		'label'   => __( 'Body Font', 'superfast' ),
		'section' => $section,
		'type'    => 'select',
		'choices' => $font_choices,
		'default' => 'sans-serif'
	);
	
	$primaryweight = array(
		'300' => '300',
		'400' => '400',
		'500' => '500',
		'600' => '600',
		'700' => '700',
	);
	
	$options[$gmrprefix . '_body_size'] = array(
		'id' => $gmrprefix . '_body_size',
		'label'   => __( 'Body font size', 'superfast' ),
		'section' => $section,
		'type'    => 'number',
		'default'       => '13',
		'input_attrs' => array(
			'min'   => 12,
			'max'   => 50,
			'step'  => 1
		)
	);
	$options[$gmrprefix . '_secondary-font-weight'] = array(
		'id' => $gmrprefix . '_secondary-font-weight',
		'label'   => __( 'Body font weight', 'superfast' ),
		'section' => $section,
		'type'    => 'select',
		'choices' => $primaryweight,
		'description' => __( 'Note: some font maybe not display properly, if not display properly try to change this font weight.', 'superfast' ),
		'default' => '500'
	);
	
	$options[$gmrprefix . '_h1_size'] = array(
		'id' => $gmrprefix . '_h1_size',
		'label'   => __( 'h1 font size', 'superfast' ),
		'section' => $section,
		'type'    => 'number',
		'default'       => '30',
		'input_attrs' => array(
			'min'   => 12,
			'max'   => 50,
			'step'  => 1
		)
	);
	
	$options[$gmrprefix . '_h2_size'] = array(
		'id' => $gmrprefix . '_h2_size',
		'label'   => __( 'h2 font size', 'superfast' ),
		'section' => $section,
		'type'    => 'number',
		'default'       => '26',
		'input_attrs' => array(
			'min'   => 12,
			'max'   => 50,
			'step'  => 1
		)
	);
	
	$options[$gmrprefix . '_h3_size'] = array(
		'id' => $gmrprefix . '_h3_size',
		'label'   => __( 'h3 font size', 'superfast' ),
		'section' => $section,
		'type'    => 'number',
		'default'       => '24',
		'input_attrs' => array(
			'min'   => 12,
			'max'   => 50,
			'step'  => 1
		)
	);
	
	$options[$gmrprefix . '_h4_size'] = array(
		'id' => $gmrprefix . '_h4_size',
		'label'   => __( 'h4 font size', 'superfast' ),
		'section' => $section,
		'type'    => 'number',
		'default'       => '22',
		'input_attrs' => array(
			'min'   => 12,
			'max'   => 50,
			'step'  => 1
		)
	);
	
	$options[$gmrprefix . '_h5_size'] = array(
		'id' => $gmrprefix . '_h5_size',
		'label'   => __( 'h5 font size', 'superfast' ),
		'section' => $section,
		'type'    => 'number',
		'default'       => '20',
		'input_attrs' => array(
			'min'   => 12,
			'max'   => 50,
			'step'  => 1
		)
	);
	
	$options[$gmrprefix . '_h6_size'] = array(
		'id' => $gmrprefix . '_h6_size',
		'label'   => __( 'h6 font size', 'superfast' ),
		'section' => $section,
		'type'    => 'number',
		'default'       => '18',
		'input_attrs' => array(
			'min'   => 12,
			'max'   => 50,
			'step'  => 1
		)
	);
	
	/*
	 * Header Section Options
	 *
	 * @since v.1.0.0
	 */
	$panel_header = 'panel-header';
	$panels[] = array(
		'id' => $panel_header,
		'title' => __( 'Header', 'superfast' ),
		'priority' => '40'
	);
	
	// Logo
	$section = 'title_tagline';
	$sections[] = array(
		'id' => $section,
		'title' => __( 'Site Identity', 'superfast' ),
		'priority' => 30,
		'panel' => $panel_header,
		'description' => __( 'Allow you to add icon, logo, change site-title and tagline to your website.', 'superfast' )
	);
	
	$options[$gmrprefix . '_logoimage'] = array(
		'id' => $gmrprefix . '_logoimage',
		'label'   => __( 'Logo', 'superfast' ),
		'section' => $section,
		'type'    => 'image',
		'default' => $default_logo,
		'description' => __( 'If using logo, Site Title and Tagline automatic disappear.', 'superfast' )
	);
	
	$options[$gmrprefix . '_logo_margintop'] = array(
		'id' => $gmrprefix . '_logo_margintop',
		'label'   => __( 'Logo Margin Top', 'superfast' ),
		'section' => $section,
		'type'    => 'number',
		'default'       => '15',
		'description' => '',
		'input_attrs' => array(
			'min'   => 0,
			'max'   => 40,
			'step'  => 1
		)
	);
	
	$section = 'header_image';
	$sections[] = array(
		'id' => $section,
		'title' => __( 'Header Image', 'superfast' ),
		'priority' => 40,
		'panel' => $panel_header,
		'description' => __( 'Allow you customize header sections in home page.', 'superfast' )
	);
	
	$options[$gmrprefix . '_active-headerimage'] = array(
		'id' => $gmrprefix . '_active-headerimage',
		'label'   => __( 'Disable header image', 'superfast' ),
		'section' => $section,
		'type'    => 'checkbox',
		'default' => 0,
		'priority' => 25,
		'description' => __( 'If you disable header image, header section will replace with header color.', 'superfast' )
	);
	
	$bgsize = array(
		'auto' => 'Auto',
		'cover' => 'Cover',
		'contain' => 'Contain',
		'initial' => 'Initial',
		'inherit' => 'Inherit',
	);
	$options[$gmrprefix . '_headerimage_bgsize'] = array(
		'id' => $gmrprefix . '_headerimage_bgsize',
		'label'   => __( 'Background Size', 'superfast' ),
		'section' => $section,
		'type'    => 'select',
		'choices' => $bgsize,
		'priority' => 30,
		'description' => __( 'The background-size property specifies the size of the header images.', 'superfast' ) . ' <a href="' . esc_url( __( 'http://www.w3schools.com/cssref/css3_pr_background-size.asp', 'superfast' ) ) . '" target="_blank" rel="nofollow">' . __( 'Learn more!', 'superfast' ) . '</a>',
		'default' => 'auto'
	);
	
	$bgrepeat = array(
		'repeat' => 'Repeat',
		'repeat-x' => 'Repeat X',
		'repeat-y' => 'Repeat Y',
		'initial' => 'Initial',
		'inherit' => 'Inherit',
	);
	$options[$gmrprefix . '_headerimage_bgrepeat'] = array(
		'id' => $gmrprefix . '_headerimage_bgrepeat',
		'label'   => __( 'Background Repeat', 'superfast' ),
		'section' => $section,
		'type'    => 'select',
		'choices' => $bgrepeat,
		'priority' => 35,
		'description' => __( 'The background-repeat property sets if/how a header image will be repeated.', 'superfast' ) . ' <a href="' . esc_url( __( 'http://www.w3schools.com/cssref/pr_background-repeat.asp', 'superfast' ) ) . '" target="_blank" rel="nofollow">' . __( 'Learn more!', 'superfast' ) . '</a>',		
		'default' => 'repeat'
	);
	
	$bgposition = array(
		'left top' => 'left top',
		'left center' => 'left center',
		'left bottom' => 'left bottom',
		'right top' => 'right top',
		'right center' => 'right center',
		'right bottom' => 'right bottom',
		'center top' => 'center top',
		'center center' => 'center center',
		'center bottom' => 'center bottom',
	);
	$options[$gmrprefix . '_headerimage_bgposition'] = array(
		'id' => $gmrprefix . '_headerimage_bgposition',
		'label'   => __( 'Background Position', 'superfast' ),
		'section' => $section,
		'type'    => 'select',
		'choices' => $bgposition,
		'priority' => 40,
		'description' => __( 'The background-position property sets the starting position of a header image.', 'superfast' ) . ' <a href="' . esc_url( __( 'http://www.w3schools.com/cssref/pr_background-position.asp', 'superfast' ) ) . '" target="_blank" rel="nofollow">' . __( 'Learn more!', 'superfast' ) . '</a>',			
		'default' => 'center top'
	);
	
	$bgattachment = array(
		'scroll' => 'Scroll',
		'fixed' => 'Fixed',
		'local' => 'Local',
		'initial' => 'Initial',
		'inherit' => 'Inherit',
	);
	$options[$gmrprefix . '_headerimage_bgattachment'] = array(
		'id' => $gmrprefix . '_headerimage_bgattachment',
		'label'   => __( 'Background Attachment', 'superfast' ),
		'section' => $section,
		'type'    => 'select',
		'choices' => $bgattachment,
		'priority' => 45,
		'description' => __( 'The background-attachment property sets whether a header image is fixed or scrolls with the rest of the page.', 'superfast' ) . ' <a href="' . esc_url( __( 'http://www.w3schools.com/cssref/pr_background-attachment.asp', 'superfast' ) ) . '" target="_blank" rel="nofollow">' . __( 'Learn more!', 'superfast' ) . '</a>',
		'default' => 'scroll'
	);
	
	$section = 'header_color';
	$sections[] = array(
		'id' => $section,
		'title' => __( 'Header Color', 'superfast' ),
		'priority' => 40,
		'panel' => $panel_header,
		'description' => __( 'Allow you customize header color style.', 'superfast' )
	);
	
	$options[$gmrprefix . '_header-bgcolor'] = array(
		'id' => $gmrprefix . '_header-bgcolor',
		'label'   => __( 'Background Color - Header', 'superfast' ),
		'section' => $section,
		'type'    => 'color',
		'default' => $header_bgcolor,
	);
	
	$options[$gmrprefix . '_sitetitle-color'] = array(
		'id' => $gmrprefix . '_sitetitle-color',
		'label'   => __( 'Site title color', 'superfast' ),
		'section' => $section,
		'type'    => 'color',
		'default' => $sitetitle_color,
	);
	
	$options[$gmrprefix . '_sitedesc-color'] = array(
		'id' => $gmrprefix . '_sitedesc-color',
		'label'   => __( 'Site description color', 'superfast' ),
		'section' => $section,
		'type'    => 'color',
		'default' => $sitedesc_color,
	);
	
	$options[$gmrprefix . '_mainmenu-bgcolor'] = array(
		'id' => $gmrprefix . '_mainmenu-bgcolor',
		'label'   => __( 'Background Menu', 'superfast' ),
		'section' => $section,
		'type'    => 'color',
		'default' => $menu_bgcolor,
	);
	
	$options[$gmrprefix . '_mainmenu-hoverbgcolor'] = array(
		'id' => $gmrprefix . '_mainmenu-hoverbgcolor',
		'label'   => __( 'Background Menu Hover and Active', 'superfast' ),
		'section' => $section,
		'type'    => 'color',
		'default' => $menu_hoverbgcolor,
	);
	
	$options[$gmrprefix . '_mainmenu-color'] = array(
		'id' => $gmrprefix . '_mainmenu-color',
		'label'   => __( 'Text color - Menu', 'superfast' ),
		'section' => $section,
		'type'    => 'color',
		'default' => $menu_color,
	);
	
	$options[$gmrprefix . '_hovermenu-color'] = array(
		'id' => $gmrprefix . '_hovermenu-color',
		'label'   => __( 'Text hover color - Menu', 'superfast' ),
		'section' => $section,
		'type'    => 'color',
		'default' => $menu_hovercolor,
	);
	
	$section = 'menu_style';
	$sections[] = array(
		'id' => $section,
		'title' => __( 'Menu Style', 'superfast' ),
		'priority' => 40,
		'panel' => $panel_header,
		'description' => __( 'Allow you customize menu style.', 'superfast' )
	);

	$sticky = array(
		'sticky' => __( 'Sticky', 'superfast' ),
		'nosticky' => __( 'Static', 'superfast' ),
	);
	$options[$gmrprefix . '_sticky_menu'] = array(
		'id' => $gmrprefix . '_sticky_menu',
		'label'   => __( 'Sticky Menu', 'superfast' ),
		'section' => $section,
		'type'    => 'radio',
		'choices' => $sticky,
		'default' => 'sticky'
	);
	
	$menustyle = array(
		'gmr-boxmenu' => __( 'Box Menu', 'superfast' ),
		'gmr-fluidmenu' => __( 'Fluid Menu', 'superfast' ),
	);
	$options[$gmrprefix . '_menu_style'] = array(
		'id' => $gmrprefix . '_menu_style',
		'label'   => __( 'Menu Style', 'superfast' ),
		'section' => $section,
		'type'    => 'select',
		'choices' => $menustyle,
		'default' => 'gmr-boxmenu'
	);
	
	$options[$gmrprefix . '_active-searchbutton'] = array(
		'id' => $gmrprefix . '_active-searchbutton',
		'label'   => __( 'Remove search button', 'superfast' ),
		'section' => $section,
		'type'    => 'checkbox',
		'default' => 0,
	);
	
	$section = 'slider_options';
	$sections[] = array(
		'id' => $section,
		'title' => __( 'Slider Options', 'superfast' ),
		'priority' => 50,
		'panel' => $panel_header,
		'description' => __( 'Allow you add slider shortcode, and display it in front page.', 'superfast' )
	);
	
	$options[$gmrprefix . '_slider_shortcode'] = array(
		'id' => $gmrprefix . '_slider_shortcode',
		'label'   => __( 'Slider Shortcode.', 'superfast' ),
		'section' => $section,
		'type'    => 'textarea',
		'priority' => 30,
		'description' => __( 'Please insert slider shortcode here.', 'superfast' )
	);
	
	/*
	 * Blog Section Options
	 *
	 * @since v.1.0.0
	 */
	 
	$panel_blog = 'panel-blog';
	$panels[] = array(
		'id' => $panel_blog,
		'title' => __( 'Blog', 'superfast' ),
		'priority' => '50'
	);

	$section = 'bloglayout';
	$sections[] = array(
		'id' => $section,
		'title' => __( 'Blog Layout', 'superfast' ),
		'priority' => 50,
		'panel' => $panel_blog
	);
	$bloglayout = array(
		'gmr-default' => __( 'Default', 'superfast' ),
		'gmr-smallthumb' => __( 'Default small thumbnail', 'superfast' ),
		'gmr-masonry' => __( 'Masonry', 'superfast' ),
	);
	$options[$gmrprefix . '_blog_layout'] = array(
		'id' => $gmrprefix . '_blog_layout',
		'label'   => __( 'Blog Layout', 'superfast' ),
		'section' => $section,
		'type'    => 'radio',
		'choices' => $bloglayout,
		'default' => 'gmr-smallthumb'
	);
	$sidebar = array(
		'sidebar' => __( 'Sidebar', 'superfast' ),
		'fullwidth' => __( 'Fullwidth', 'superfast' ),
		'fullwidth-small' => __( 'Fullwidth Small', 'superfast' ),
	);
	$options[$gmrprefix . '_blog_sidebar'] = array(
		'id' => $gmrprefix . '_blog_sidebar',
		'label'   => __( 'Blog Sidebar', 'superfast' ),
		'section' => $section,
		'type'    => 'radio',
		'choices' => $sidebar,
		'default' => 'sidebar'
	);
	
	$options[$gmrprefix . '_single_sidebar'] = array(
		'id' => $gmrprefix . '_single_sidebar',
		'label'   => __( 'Single Sidebar', 'superfast' ),
		'section' => $section,
		'type'    => 'radio',
		'choices' => $sidebar,
		'description' => __( 'Default layout sidebar for single, if you want disable sidebar only in special post or page, you can use post options.', 'superfast' ),
		'default' => 'sidebar'
	);
	
	$section = 'blogcontent';
	$sections[] = array(
		'id' => $section,
		'title' => __( 'Blog Content', 'superfast' ),
		'priority' => 50,
		'panel' => $panel_blog
	);
	$options[$gmrprefix . '_active-blogthumb'] = array(
		'id' => $gmrprefix . '_active-blogthumb',
		'label'   => __( 'Disable Blog Thumbnail', 'superfast' ),
		'section' => $section,
		'type'    => 'checkbox',
		'default' => 0,
	);
	
	$options[$gmrprefix . '_active-singlethumb'] = array(
		'id' => $gmrprefix . '_active-singlethumb',
		'label'   => __( 'Disable Single Thumbnail', 'superfast' ),
		'section' => $section,
		'type'    => 'checkbox',
		'default' => 0,
	);
	
	$options[$gmrprefix . '_active-pagenavposts'] = array(
		'id' => $gmrprefix . '_active-pagenavposts',
		'label'   => __( 'Disable Page Navigation Posts In Archives.', 'superfast' ),
		'section' => $section,
		'type'    => 'checkbox',
		'default' => 0,
	);
	
	$excerpt = array(
		'excerpt' => __( 'Excerpt', 'superfast' ),
		'fullcontent' => __( 'Full Content', 'superfast' ),
	);
	$options[$gmrprefix . '_blog_content'] = array(
		'id' => $gmrprefix . '_blog_content',
		'label'   => __( 'Blog Content', 'superfast' ),
		'section' => $section,
		'type'    => 'radio',
		'choices' => $excerpt,
		'default' => 'excerpt'
	);
	
	$options[$gmrprefix . '_excerpt_number'] = array(
		'id' => $gmrprefix . '_excerpt_number',
		'label'   => __( 'Excerpt length', 'superfast' ),
		'section' => $section,
		'type'    => 'number',
		'default'       => '20',
		'description' => __( 'If you choose excerpt, you can change excerpt lenght (default is 30).', 'superfast' ),
		'input_attrs' => array(
			'min'   => 10,
			'max'   => 100,
			'step'  => 1
		)
	);
	
	$options[$gmrprefix . '_read_more'] = array(
		'id' => $gmrprefix . '_read_more',
		'label'   => __( 'Read more text', 'superfast' ),
		'section' => $section,
		'type'    => 'text',
		'description' => __( 'Add some text here to replace the default [...]. It will automatically be linked to your article.', 'superfast' ),
		'priority' => 90
	);
	
	/*
	 * Footer Section Options
	 *
	 * @since v.1.0.0
	 */
	$panel_footer = 'panel-footer';
	$panels[] = array(
		'id' => $panel_footer,
		'title' => __( 'Footer', 'superfast' ),
		'priority' => '50'
	);
	
	$section = 'widget_section';
	$sections[] = array(
		'id' => $section,
		'title' => __( 'Widgets Footer', 'superfast' ),
		'priority' => 50,
		'panel' => $panel_footer,
		'description' => __( 'Footer widget columns.', 'superfast' )
	);
	
	$columns = array(
		'1' => __( '1 Column', 'superfast' ),
		'2' => __( '2 Columns', 'superfast' ),
		'3' => __( '3 Columns', 'superfast' ),
		'4' => __( '4 Columns', 'superfast' ),
	);
	$options[$gmrprefix . '_footer_column'] = array(
		'id' => $gmrprefix . '_footer_column',
		'label'   => __( 'Widgets Footer', 'superfast' ),
		'section' => $section,
		'type'    => 'radio',
		'choices' => $columns,
		'default' => '3'
	);
	
	$section = 'copyright_section';
	$sections[] = array(
		'id' => $section,
		'title' => __( 'Copyright', 'superfast' ),
		'priority' => 60,
		'panel' => $panel_footer
	);
	
	$options[$gmrprefix . '_copyright'] = array(
		'id' => $gmrprefix . '_copyright',
		'label'   => __( 'Footer Copyright.', 'superfast' ),
		'section' => $section,
		'type'    => 'textarea',
		'priority' => 60,
		'description' => __( 'Display your own copyright text in footer.', 'superfast' )
	);
	
	$section = 'footer_color';
	$sections[] = array(
		'id' => $section,
		'title' => __( 'Footer Color', 'superfast' ),
		'priority' => 60,
		'panel' => $panel_footer,
		'description' => __( 'Allow you customize footer color style.', 'superfast' )
	);
	
	$options[$gmrprefix . '_footer-bgcolor'] = array(
		'id' => $gmrprefix . '_footer-bgcolor',
		'label'   => __( 'Background Color - Footer', 'superfast' ),
		'section' => $section,
		'type'    => 'color',
		'default' => $footer_bgcolor,
	);
	
	$options[$gmrprefix . '_footer-fontcolor'] = array(
		'id' => $gmrprefix . '_footer-fontcolor',
		'label'   => __( 'Font Color - Footer', 'superfast' ),
		'section' => $section,
		'type'    => 'color',
		'default' => $footer_fontcolor,
	);
	
	$options[$gmrprefix . '_footer-linkcolor'] = array(
		'id' => $gmrprefix . '_footer-linkcolor',
		'label'   => __( 'Link Color - Footer', 'superfast' ),
		'section' => $section,
		'type'    => 'color',
		'default' => $footer_linkcolor,
	);
	
	$options[$gmrprefix . '_footer-hoverlinkcolor'] = array(
		'id' => $gmrprefix . '_footer-hoverlinkcolor',
		'label'   => __( 'Hover Link Color - Footer', 'superfast' ),
		'section' => $section,
		'type'    => 'color',
		'default' => $footer_hoverlinkcolor,
	);
	
	$options[$gmrprefix . '_copyright-bgcolor'] = array(
		'id' => $gmrprefix . '_copyright-bgcolor',
		'label'   => __( 'Background Color - Copyright', 'superfast' ),
		'section' => $section,
		'type'    => 'color',
		'default' => $copyright_bgcolor,
	);
	
	$options[$gmrprefix . '_copyright-fontcolor'] = array(
		'id' => $gmrprefix . '_copyright-fontcolor',
		'label'   => __( 'Font Color - Copyright', 'superfast' ),
		'section' => $section,
		'type'    => 'color',
		'default' => $copyright_fontcolor,
	);
	
	$options[$gmrprefix . '_copyright-linkcolor'] = array(
		'id' => $gmrprefix . '_copyright-linkcolor',
		'label'   => __( 'Link Color - Copyright', 'superfast' ),
		'section' => $section,
		'type'    => 'color',
		'default' => $copyright_linkcolor,
	);
	
	$options[$gmrprefix . '_copyright-hoverlinkcolor'] = array(
		'id' => $gmrprefix . '_copyright-hoverlinkcolor',
		'label'   => __( 'Hover Link Color - Copyright', 'superfast' ),
		'section' => $section,
		'type'    => 'color',
		'default' => $copyright_hoverlinkcolor,
	);
	
	/* 
	 * Call if only woocommerce actived
	 *
	 * @since v.1.0.0
	 */
	if ( class_exists( 'WooCommerce' ) ) {
		
		// Woocommerce options
		$section = 'woocommerce';
		$sections[] = array(
			'id' => $section,
			'title' => __( 'Woocommerce', 'superfast' ),
			'priority' => 100
		);
		$columns = array(
			'2' => __( '2 Columns', 'superfast' ),
			'3' => __( '3 Columns', 'superfast' ),
			'4' => __( '4 Columns', 'superfast' ),
			'5' => __( '5 Columns', 'superfast' ),
			'6' => __( '6 Columns', 'superfast' ),
		);
		$options[$gmrprefix . '_wc_column'] = array(
			'id' => $gmrprefix . '_wc_column',
			'label'   => __( 'Product Columns', 'superfast' ),
			'section' => $section,
			'type'    => 'select',
			'choices' => $columns,
			'default' => '3'
		);
		$sidebar = array(
			'sidebar' => __( 'Sidebar', 'superfast' ),
			'fullwidth' => __( 'Fullwidth', 'superfast' ),
		);
		$options[$gmrprefix . '_wc_sidebar'] = array(
			'id' => $gmrprefix . '_wc_sidebar',
			'label'   => __( 'Woocommerce Sidebar', 'superfast' ),
			'section' => $section,
			'type'    => 'radio',
			'choices' => $sidebar,
			'default' => 'sidebar'
		);
		$product_per_page = array(
			'6' => __( '6 Products', 'superfast' ),
			'7' => __( '7 Products', 'superfast' ),
			'8' => __( '8 Products', 'superfast' ),
			'9' => __( '9 Products', 'superfast' ),
			'10' => __( '10 Products', 'superfast' ),
			'11' => __( '11 Products', 'superfast' ),
			'12' => __( '12 Products', 'superfast' ),
			'13' => __( '13 Products', 'superfast' ),
			'14' => __( '14 Products', 'superfast' ),
			'15' => __( '15 Products', 'superfast' ),
			'16' => __( '16 Products', 'superfast' ),
			'17' => __( '17 Products', 'superfast' ),
			'18' => __( '18 Products', 'superfast' ),
			'19' => __( '19 Products', 'superfast' ),
			'20' => __( '20 Products', 'superfast' ),
			'21' => __( '21 Products', 'superfast' ),
			'22' => __( '22 Products', 'superfast' ),
			'23' => __( '23 Products', 'superfast' ),
			'24' => __( '24 Products', 'superfast' ),
			'25' => __( '25 Products', 'superfast' ),
			'26' => __( '26 Products', 'superfast' ),
			'27' => __( '27 Products', 'superfast' ),
			'28' => __( '28 Products', 'superfast' ),
			'29' => __( '29 Products', 'superfast' ),
			'30' => __( '30 Products', 'superfast' ),
		);
		$options[$gmrprefix . '_wc_productperpage'] = array(
			'id' => $gmrprefix . '_wc_productperpage',
			'label'   => __( 'Woocommerce Product Per Page', 'superfast' ),
			'section' => $section,
			'type'    => 'select',
			'choices' => $product_per_page,
			'default' => '9'
		);
		
		$options[$gmrprefix . '_active-cartbutton'] = array(
			'id' => $gmrprefix . '_active-cartbutton',
			'label'   => __( 'Remove Cart button from menu', 'superfast' ),
			'section' => $section,
			'type'    => 'checkbox',
			'default' => 0,
		);
		
	}
	
	// Adds the sections to the $options array
	$options['sections'] = $sections;
	// Adds the panels to the $options array
	$options['panels'] = $panels;
	$customizer_library = Customizer_Library::Instance();
	$customizer_library->add_options( $options );
	// To delete custom mods use: customizer_library_remove_theme_mods();
}
add_action( 'init', 'gmr_library_options_customizer' );

if ( ! function_exists( 'customizer_library_demo_build_styles' ) && class_exists( 'Customizer_Library_Styles' ) ) :
/**
 * Process user options to generate CSS needed to implement the choices.
 *
 * @since 1.0.0
 *
 * @return void
 */
function gmr_library_customizer_build_styles() {
	
	// Content Background Color
	$setting = 'gmr_content-color';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$color = sanitize_hex_color( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'body'
			),
			'declarations' => array(
				'color' => $color
			)
		) );
	}
	
	// Color scheme
	$setting = 'gmr_scheme-color';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$color = sanitize_hex_color( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'kbd',
				'a.button:hover',
				'button:hover',
				'.button:hover',
				'button.button:hover',
				'input[type="button"]:hover',
				'input[type="reset"]:hover',
				'input[type="submit"]:hover',
				'a.button:focus',
				'button:focus',
				'.button:focus',
				'button.button:focus',
				'input[type="button"]:focus',
				'input[type="reset"]:focus',
				'input[type="submit"]:focus',
				'a.button:active',
				'button:active',
				'.button:active',
				'button.button:active',
				'input[type="button"]:active',
				'input[type="reset"]:active',
				'input[type="submit"]:active',
				'.tagcloud a:hover',
				'.tagcloud a:focus',
				'.tagcloud a:active'
			),
			'declarations' => array(
				'background-color' => $color
			)
		) );
		
		if ( class_exists( 'WooCommerce' ) ) {
			
			$color = sanitize_hex_color( $mod );
			Customizer_Library_Styles()->add( array(
				'selectors' => array(
					'.woocommerce #respond input#submit', 
					'.woocommerce a.button', 
					'.woocommerce button.button', 
					'.woocommerce input.button'
				),
				'declarations' => array(
					'border-color' => $color
				)
			) );
		
			$color = sanitize_hex_color( $mod );
			Customizer_Library_Styles()->add( array(
				'selectors' => array(
					'.woocommerce #respond input#submit:hover', 
					'.woocommerce a.button:hover', 
					'.woocommerce button.button:hover', 
					'.woocommerce input.button:hover',
					'.woocommerce #respond input#submit:focus', 
					'.woocommerce a.button:focus', 
					'.woocommerce button.button:focus', 
					'.woocommerce input.button:focus',	
					'.woocommerce #respond input#submit:active', 
					'.woocommerce a.button:active', 
					'.woocommerce button.button:active', 
					'.woocommerce input.button:active',
					'.woocommerce #respond input#submit.alt:hover', 
					'.woocommerce a.button.alt:hover', 
					'.woocommerce button.button.alt:hover', 
					'.woocommerce input.button.alt:hover',
					'.woocommerce #respond input#submit.alt:focus', 
					'.woocommerce a.button.alt:focus', 
					'.woocommerce button.button.alt:focus', 
					'.woocommerce input.button.alt:focus',
					'.woocommerce #respond input#submit.alt:active', 
					'.woocommerce a.button.alt:active', 
					'.woocommerce button.button.alt:active', 
					'.woocommerce input.button.alt:active'
				),
				'declarations' => array(
					'background-color' => $color
				)
			) );
		
		}
		
		$color = sanitize_hex_color( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'a',
				'a:hover',
				'a:focus',
				'a:active'
			),
			'declarations' => array(
				'color' => $color
			)
		) );
		
		$color = sanitize_hex_color( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'ul.page-numbers li span.page-numbers',
				'ul.page-numbers li a:hover',
				'.page-links a .page-link-number:hover',
				'a.button',
				'button',
				'.button',
				'button.button',
				'input[type="button"]',
				'input[type="reset"]',
				'input[type="submit"]',
				'.tagcloud a',
				'.sticky .gmr-box-content',
				'.gmr-theme div.sharedaddy h3.sd-title:before',
				'.gmr-theme div.idblog-related-post h3.related-title:before',
				'.idblog-social-share h3:before',
				'.bypostauthor > .comment-body'
			),
			'declarations' => array(
				'border-color' => $color
			)
		) );
		
	}

	// Header Background image
	$url = has_header_image() ? get_header_image() : get_theme_support( 'custom-header', 'default-image' );
	$setting = 'gmr_active-headerimage';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod === 0 ) {
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'.site-header'
			),
			'declarations' => array(
				'background-image' => 'url(' . $url . ')',
			)
		) );
	}
	
	// Header Background Size
	$setting = 'gmr_headerimage_bgsize';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$bgsize = wp_filter_nohtml_kses( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'.site-header'
			),
			'declarations' => array(
				'-webkit-background-size' => $bgsize,
				'-moz-background-size' => $bgsize,
				'-o-background-size' => $bgsize,
				'background-size' => $bgsize
			)
		) );
	}
	
	// Header Background Repeat
	$setting = 'gmr_headerimage_bgrepeat';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$bgrepeat = wp_filter_nohtml_kses( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'.site-header'
			),
			'declarations' => array(
				'background-repeat' => $bgrepeat
			)
		) );
	}
	
	// Header Background Position
	$setting = 'gmr_headerimage_bgposition';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$bgposition = wp_filter_nohtml_kses( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'.site-header'
			),
			'declarations' => array(
				'background-position' => $bgposition
			)
		) );
	}

	// Header Background Position
	$setting = 'gmr_headerimage_bgattachment';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$bgattachment = wp_filter_nohtml_kses( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'.site-header'
			),
			'declarations' => array(
				'background-attachment' => $bgattachment
			)
		) );
	}
	
	// Header Background Color
	$setting = 'gmr_header-bgcolor';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );

	if ( $mod ) {
		$color = sanitize_hex_color( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'.site-header'
			),
			'declarations' => array(
				'background-color' => $color
			)
		) );
	}

	// site title
	$setting = 'gmr_sitetitle-color';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$color = sanitize_hex_color( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'.site-title a'
			),
			'declarations' => array(
				'color' => $color
			)
		) );
	}
	
	// site description
	$setting = 'gmr_sitedesc-color';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$color = sanitize_hex_color( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'.site-description'
			),
			'declarations' => array(
				'color' => $color
			)
		) );
	}
	
	// body size
	$setting = 'gmr_logo_margintop';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$size = absint( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'.gmr-logo'
			),
			'declarations' => array(
				'margin-top' => $size . 'px'
			)
		) );
	}
	
	$setting = 'gmr_mainmenu-bgcolor';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );

	if ( $mod ) {
		$color = sanitize_hex_color( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'.gmr-menuwrap'
			),
			'declarations' => array(
				'background-color' => $color
			)
		) );
	}
	
	// Menu text color
	$setting = 'gmr_mainmenu-color';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$color = sanitize_hex_color( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'#gmr-responsive-menu',
				'#primary-menu > li > a', 
				'.search-trigger .gmr-icon'
			),
			'declarations' => array(
				'color' => $color
			)
		) );
		
		$color = sanitize_hex_color( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'#primary-menu > li.menu-border > a span'
			),
			'declarations' => array(
				'border-color' => $color
			)
		) );
		
		
	}
	
	// Hover text color
	$setting = 'gmr_hovermenu-color';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$color = sanitize_hex_color( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'#gmr-responsive-menu:hover',
				'#primary-menu > li:hover > a',
				'#primary-menu .current-menu-item > a',
				'#primary-menu .current-menu-ancestor > a',
				'#primary-menu .current_page_item > a',
				'#primary-menu .current_page_ancestor > a',
				'.search-trigger .gmr-icon:hover'
			),
			'declarations' => array(
				'color' => $color
			)
		) );
		
		$color = sanitize_hex_color( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'#primary-menu > li.menu-border:hover > a span',
				'#primary-menu > li.menu-border.current-menu-item > a span',
				'#primary-menu > li.menu-border.current-menu-ancestor > a span',
				'#primary-menu > li.menu-border.current_page_item > a span',
				'#primary-menu > li.menu-border.current_page_ancestor > a span'
			),
			'declarations' => array(
				'border-color' => $color
			)
		) );
		
	}
	
	$setting = 'gmr_mainmenu-hoverbgcolor';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );

	if ( $mod ) {
		$color = sanitize_hex_color( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'#primary-menu > li:hover > a',
				'#primary-menu .current-menu-item > a',
				'#primary-menu .current-menu-ancestor > a',
				'#primary-menu .current_page_item > a',
				'#primary-menu .current_page_ancestor > a'
			),
			'declarations' => array(
				'background-color' => $color
			)
		) );
	}
	
	// Content Background Color
	$setting = 'gmr_content-bgcolor';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$color = sanitize_hex_color( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'.gmr-content'
			),
			'declarations' => array(
				'background-color' => $color
			)
		) );
	}

	// Primary Font
	$setting = 'gmr_primary-font';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	$stack = customizer_library_get_font_stack( $mod );
	if ( $mod ) {
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'h1',
				'h2',
				'h3',
				'h4',
				'h5',
				'h6',
				'.h1',
				'.h2',
				'.h3',
				'.h4',
				'.h5',
				'.h6',
				'.site-title',
				'#gmr-responsive-menu',
				'#primary-menu > li > a'
			),
			'declarations' => array(
				'font-family' => $stack
			)
		) );
	}
	
	// Secondary Font
	$setting = 'gmr_secondary-font';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	$stack = customizer_library_get_font_stack( $mod );
	if ( $mod ) {
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'body',
			),
			'declarations' => array(
				'font-family' => $stack
			)
		) );
	}
	
	$setting = 'gmr_secondary-font-weight';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$size = absint( $mod );	
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'body',
			),
			'declarations' => array(
				'font-weight' => $size
			)
		) );
	}
	
	// body size
	$setting = 'gmr_body_size';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$size = absint( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'body'
			),
			'declarations' => array(
				'font-size' => $size . 'px'
			)
		) );
	}
	
	// h1 size
	$setting = 'gmr_h1_size';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$size = absint( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'h1'
			),
			'declarations' => array(
				'font-size' => $size . 'px'
			)
		) );
	}
	
	// h2 size
	$setting = 'gmr_h2_size';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$size = absint( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'h2'
			),
			'declarations' => array(
				'font-size' => $size . 'px'
			)
		) );
	}
	
	// h3 size
	$setting = 'gmr_h3_size';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$size = absint( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'h3'
			),
			'declarations' => array(
				'font-size' => $size . 'px'
			)
		) );
	}
	
	// h4 size
	$setting = 'gmr_h4_size';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$size = absint( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'h4'
			),
			'declarations' => array(
				'font-size' => $size . 'px'
			)
		) );
	}
	
	// h5 size
	$setting = 'gmr_h5_size';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$size = absint( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'h5'
			),
			'declarations' => array(
				'font-size' => $size . 'px'
			)
		) );
	}
	
	// h6 size
	$setting = 'gmr_h6_size';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$size = absint( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'h6'
			),
			'declarations' => array(
				'font-size' => $size . 'px'
			)
		) );
	}
	
	// Footer Background Color
	$setting = 'gmr_footer-bgcolor';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$color = sanitize_hex_color( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'.widget-footer'
			),
			'declarations' => array(
				'background-color' => $color
			)
		) );
	}
	
	// Footer Font Color
	$setting = 'gmr_footer-fontcolor';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$color = sanitize_hex_color( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'.widget-footer'
			),
			'declarations' => array(
				'color' => $color
			)
		) );
	}
	
	// Footer Link Color
	$setting = 'gmr_footer-linkcolor';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$color = sanitize_hex_color( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'.widget-footer a'
			),
			'declarations' => array(
				'color' => $color
			)
		) );
	}
	
	// Footer Hover Link Color
	$setting = 'gmr_footer-hoverlinkcolor';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$color = sanitize_hex_color( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'.widget-footer a:hover'
			),
			'declarations' => array(
				'color' => $color
			)
		) );
	}
	
	// Copyright Background Color
	$setting = 'gmr_copyright-bgcolor';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$color = sanitize_hex_color( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'.site-footer'
			),
			'declarations' => array(
				'background-color' => $color
			)
		) );
	}
	
	// Copyright Font Color
	$setting = 'gmr_copyright-fontcolor';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$color = sanitize_hex_color( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'.site-footer'
			),
			'declarations' => array(
				'color' => $color
			)
		) );
	}
	
	// Copyright Link Color
	$setting = 'gmr_copyright-linkcolor';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$color = sanitize_hex_color( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'.site-footer a'
			),
			'declarations' => array(
				'color' => $color
			)
		) );
	}
	
	// copyright Hover Link Color
	$setting = 'gmr_copyright-hoverlinkcolor';
	$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
	if ( $mod ) {
		$color = sanitize_hex_color( $mod );
		Customizer_Library_Styles()->add( array(
			'selectors' => array(
				'.site-footer a:hover'
			),
			'declarations' => array(
				'color' => $color
			)
		) );
	}
}
endif; // endif gmr_library_customizer_build_styles
add_action( 'customizer_library_styles', 'gmr_library_customizer_build_styles' );

if ( ! function_exists( 'customizer_library_demo_styles' ) ) :
/**
 * Generates the style tag and CSS needed for the theme options.
 *
 * By using the "Customizer_Library_Styles" filter, different components can print CSS in the header.
 * It is organized this way to ensure there is only one "style" tag.
 *
 * @since 1.0.0
 *
 * @return void
 */
function gmr_library_customizer_styles() {
	do_action( 'customizer_library_styles' );
	// Echo the rules
	$css = Customizer_Library_Styles()->build();
	if ( ! empty( $css ) ) {
		wp_add_inline_style( 'superfast-style', $css );
	}
}
endif; // endif gmr_library_customizer_styles
add_action( 'wp_enqueue_scripts', 'gmr_library_customizer_styles' );

if ( ! function_exists( 'gmr_remove_customizer_register' ) ) :
/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @since 1.0.0
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object
 */
function gmr_remove_customizer_register( $wp_customize ) {
    $wp_customize->remove_control( 'display_header_text' );
}
endif; // endif gmr_remove_customizer_register
add_action( 'customize_register', 'gmr_remove_customizer_register' );