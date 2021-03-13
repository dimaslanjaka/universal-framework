<?php
/*
 * It will convert all the img tags to amp-img to make it AMP compatible.
 */
function wpamp_get_the_content( $sContent ) {
	$sContent = apply_filters( 'the_content', $sContent );
	$sContent = wp_amp_sanitize_attributes( $sContent );
	
	$html = new simple_html_dom();
	$sDomContent = $html->load( $sContent );
	
	wp_amp_sanitize_image( $html, $sDomContent );
	wp_amp_sanitize_video( $html, $sDomContent );
	wp_amp_sanitize_iframe( $html, $sDomContent );
	wp_amp_sanitize_audio( $html, $sDomContent );
	wp_amp_sanitize_tags( $html, $sDomContent );
	return $sDomContent;
}

/*
 * This function will sanitize the tags to make AMP compatible content
 */
function wp_amp_sanitize_tags( $html, $sDomContent ) {
	$aBlkTags = array( 
		'script', 
		'noscript', 
		'style', 
		'frame', 
		'frameset', 
		'object', 
		'param', 
		'applet', 
		'form', 
		'label', 
		'input', 
		'textarea', 
		'select', 
		'option', 
		'link', 
		'picture', 
		'embed', 
		'embedvideo', 
		'fb:like',
		'fb:comment',
		'base' 
	);
	
	foreach( $aBlkTags as $sTag ) {
		foreach ( $sDomContent->find( $sTag ) as $element ) {
			$element->outertext = '';
		}
	}
	
	foreach ( $sDomContent->find( 'a' ) as $element ) {		
		if( !$element->hasAttribute( 'href' ) ) {
			$element->setAttribute( 'href', '#' );
		} else {
			$temp = 0;
			$element_href = strtolower( $element->getAttribute( 'href' ) );
			$valid_protocol = array( 
				'http', 
				'https', 
				'mailto', 
				'sms', 
				'tel', 
				'viber', 
				'whatsapp' 
			);
			foreach( $valid_protocol as $key => $val ) {
				$perma = strpos( $element_href, $valid_protocol[$key] );
				if ( $perma !== false ) {
					$temp = 1;
					break;
				}
			}
			if( $temp == 0 ) {
				$element->setAttribute( 'href', '#' );
				$element->setAttribute( 'target', '_blank' );
			}
		}
		
		$allowed_tags = array( 
			'href', 
			'target', 
			'rel',  
			'name', 
			'id',
			'class', 
		);
		foreach( $element->getAllAttributes() as $attrKey => $attrVal ) {
			if( !in_array( $attrKey, $allowed_tags ) ) {
				$element->removeAttribute( $attrKey );
			}
		}
	}
	return $html->save();
}

/*
 * This function will sanitize the video to make AMP compatible
 */
function wp_amp_sanitize_video( $html, $sDomContent ) {
	foreach ( $sDomContent->find( 'video' ) as $element ) {
		
		$noSrc = 0;
		$element_src = '';
		foreach( $element->find( 'source' ) as $eleSource ) {
			if( $eleSource->hasAttribute( 'src' ) ) {
				$eleSource->outertext = '';
				$element_src = $eleSource->getAttribute( 'src' );
				$element->setAttribute( 'src', $element_src );
				$noSrc = 1;
			}
		}
		
		if( !$element->hasAttribute( 'src' ) && $noSrc == 0 ) {
			$element->outertext = '';
			continue;
		} 
		
		if( $element_src == '' ) {
			$element_src = $element->getAttribute( 'src' );
		}
		if ( strpos( $element_src, '//' ) !== false ) {
			$protocol = explode( "//", $element_src );
			$perma = strpos( $protocol[0], 'https' );
			if ( $perma === false && $protocol[0] != '' ) {
				$new_src = '//';
				foreach( $protocol as $pro => $proval ) {
					if( $pro == 0 ) { continue; }
					$new_src .= $protocol[$pro];
				}
				$element->setAttribute( 'src', $new_src );
			}
		}
		
		$allowed_tags = array( 
			'src', 
			'poster',  
			'autoplay',
			'controls', 
			'loop',  
			'layout', 
			'class',
			'width', 
			'height', 
			'id' 
		);
		foreach( $element->getAllAttributes() as $attrKey => $attrVal ) {
			if( !in_array( $attrKey, $allowed_tags ) ) {
				$element->removeAttribute( $attrKey );
			}
		}
		
		$new_tag = 'amp-video';
		$element->outertext = strtr( $element->outertext, array( '<video' => '<' . $new_tag ) );
		$element->outertext = strtr( $element->outertext, array( '</video' => '</' . $new_tag ) );
	}
	return $html->save();
}

/*
 * This function will sanitize the audio to make AMP compatible
 */
function wp_amp_sanitize_audio( $html, $sDomContent ) {
	foreach ( $sDomContent->find( 'audio' ) as $element ) {
		
		$noSrc = 0;
		$element_src = '';
		foreach( $element->find( 'source' ) as $eleSource ) {
			if( $eleSource->hasAttribute( 'src' ) ) {
				$eleSource->outertext = '';
				$element_src = $eleSource->getAttribute( 'src' );
				$element->setAttribute( 'src', $element_src );
				$noSrc = 1;
			}
		}
		
		if( !$element->hasAttribute( 'src' ) && $noSrc == 0 ) {
			$element->outertext = '';
			continue;
		} 
		
		if( $element_src == '' ) {
			$element_src = $element->getAttribute( 'src' );
		}
		if ( strpos( $element_src, '//' ) !== false ) {
			$protocol = explode( "//", $element_src );
			$perma = strpos( $protocol[0], 'https' );
			if ( $perma === false && $protocol[0] != '' ) {
				$new_src = '//';
				foreach( $protocol as $pro => $proval ) {
					if( $pro == 0 ) { continue; }
					$new_src .= $protocol[$pro];
				}
				$element->setAttribute( 'src', $new_src );
			}
		}
		
		$allowed_tags = array( 
			'src',  
			'autoplay',
			'controls', 
			'loop',  
			'class',
			'width', 
			'height', 
			'id' 
		);
		foreach( $element->getAllAttributes() as $attrKey => $attrVal ) {
			if( !in_array( $attrKey, $allowed_tags ) ) {
				$element->removeAttribute( $attrKey );
			}
		}
		
		$new_tag = 'amp-audio';
		$element->outertext = strtr( $element->outertext, array( '<audio' => '<' . $new_tag ) );
		$element->outertext = strtr( $element->outertext, array( '</audio' => '</' . $new_tag ) );
	}
	return $html->save();
}

/*
 * This function will sanitize the image to make AMP compatible
 */
function wp_amp_sanitize_image( $html, $sDomContent ) {
	
	foreach ( $sDomContent->find( 'img' ) as $element ) {
		
		if( !$element->hasAttribute( 'src' ) ) {
			$element->outertext = '';
			continue;
		}
		
		$element_src = $element->getAttribute( 'src' );
		if ( strpos( $element_src, '//' ) !== false && strpos( $element_src, 'http' ) === false ) {
			$protocol = explode( "/", $_SERVER['SERVER_PROTOCOL'] );
			$element_src = strtolower($protocol[0]) .':'. $element_src;
		} else if ( strpos( $element_src, 'http://' ) === false && strpos( $element_src, 'https://' ) === false ) {
			$element_src = home_url() . $element_src;
			$element->setAttribute( 'src', $element_src );
		}
		 
		list( $width, $height ) = @getimagesize( $element_src );
		if( !$element->hasAttribute( 'width' ) || !$element->hasAttribute( 'height' ) ) {
			if( !$element->hasAttribute( 'width' ) ) {
				if( $width == '' ) { $width = 300; }					
				$element->setAttribute( 'width', $width );
			}
			if( !$element->hasAttribute( 'height' ) ) {
				if( $height == '' ) { $height = 300; }
				$element->setAttribute( 'height', $height );
			}
		}
		if( $width == "" ) {
			$width = $element->getAttribute( 'width' );
			if( trim($width) == '' ) { $width = 300; }
		}
		$element->setAttribute( 'sizes', "(min-width: ".$width."px) ".$width."px, 100vw" ); 
		$element->setAttribute( 'layout', 'responsive' );
		
		$allowed_tags = array( 
			'src', 
			'alt', 
			'class', 
			'width', 
			'height', 
			'layout', 
			'sizes', 
			'id' 
		);
		foreach( $element->getAllAttributes() as $attrKey => $attrVal ) {
			if( !in_array( $attrKey, $allowed_tags ) ) {
				$element->removeAttribute( $attrKey );
			}
		}
		
		$ext = strtolower( end( explode( '.', $element_src ) ) );
		if ( $ext == 'gif' ) {
			$new_tag = 'amp-anim';
		} else {
			$new_tag = 'amp-img';
		}
		$element->outertext = strtr( $element->outertext, array( '<img' => '<' . $new_tag ) )  . '</' . $new_tag . '>';
	}
	return $html->save();
}

/*
 * This function will sanitize the iframe to make AMP compatible
 */
function wp_amp_sanitize_iframe( $html, $sDomContent ) {
	
	foreach ( $sDomContent->find( 'iframe' ) as $element ) {
		
		if( !$element->hasAttribute( 'src' ) ) {
			$element->outertext = '';
			continue;
		}
		
		if( !$element->hasAttribute( 'layout' ) ) {
			$element->setAttribute( 'layout', 'responsive' );
		}
		
		if( !$element->hasAttribute( 'frameborder' ) ) {
			$element->setAttribute( 'frameborder', '0' );
		}
		
		$sandbox_class = array( 'allow-scripts', 'allow-same-origin', 'allow-popups', 'allow-popups-to-escape-sandbox' );
		if( !$element->hasAttribute( 'sandbox' ) ) {
			$element->setAttribute( 'sandbox', implode( " ", $sandbox_class ) );
		} else {
			$sandbox_class_val = '';
			$element_sandbox = explode( " ", $element->getAttribute( 'sandbox' ) );
			foreach( $sandbox_class as $key => $val ) {
				if( !in_array( $sandbox_class[$key], $element_sandbox ) ) {
					$sandbox_class_val .= ' ' . $sandbox_class[$key];
				}
			}
			$element->setAttribute( 'sandbox', implode( " ", $element_sandbox ) . $sandbox_class_val );
		}
		
		$element_src = $element->getAttribute( 'src' );
		if ( strpos( $element_src, '//' ) !== false ) {
			$protocol = explode( "//", $element_src );
			$perma = strpos( $protocol[0], 'https' );
			if ( $perma === false ) {
				$new_src = 'https://';
				foreach( $protocol as $pro => $proval ) {
					if( $pro == 0 ) { continue; }
					$new_src .= $protocol[$pro];
				}
				$element->setAttribute( 'src', $new_src );
			}
		}
		
		if( !$element->hasAttribute( 'width' ) || !$element->hasAttribute( 'height' ) ) {
			if( !$element->hasAttribute( 'width' ) ) {
				$element->setAttribute( 'width', '600px' );
			}
			if( !$element->hasAttribute( 'height' ) ) {
				$element->setAttribute( 'height', '400px' );
			}
		}
		
		if( !$element->hasAttribute( 'layout' ) ) {
			$element->setAttribute( 'layout', 'responsive' );
		}
		
		$allowed_tags = array( 
			'src', 
			'class',
			'frameborder',
			'sandbox',
			'layout', 
			'width', 
			'height', 
			'id' 
		);
		foreach( $element->getAllAttributes() as $attrKey => $attrVal ) {
			if( !in_array( $attrKey, $allowed_tags ) ) {
				$element->removeAttribute( $attrKey );
			}
		}
		
		$new_tag = 'amp-iframe';
		$element->outertext = strtr( $element->outertext, array( '<iframe' => '<' . $new_tag ) );
		$element->outertext = strtr( $element->outertext, array( '</iframe' => '<amp-anim layout="responsive" src="' . WPAMP_PLUGIN_URL . 'images/loader.gif" height="300" width="300" placeholder></amp-anim></' . $new_tag ) );
	}
	return $html->save();
}

/*
 * This function will sanitize the Attributes to make AMP compatible content
 */
function wp_amp_sanitize_attributes( $sContent ) {
	$aBlkAttr = array( 'style', 'content', 'size', 'onclick', 'onmouseover', 'onmouseout' );
	foreach( $aBlkAttr as $sAttr ) {
		$sContent = preg_replace( '/(<[^>]+) ' . $sAttr . '=".*?"/i', '$1', $sContent );
		$sContent = preg_replace( '#(<[a-z ]*)(' . $sAttr . '=("|\')(.*?)("|\'))([a-z ]*>)#', '\\1\\6', $sContent );
		$sContent = preg_replace( "/(<[^>]+) " . $sAttr . "='.*?'/i", "$1", $sContent );
		$sContent = preg_replace( "#(<[a-z ]*)(" . $sAttr . "=('|\')(.*?)('|\'))([a-z ]*>)#", "\\1\\6", $sContent );
	}
	return $sContent;
}

/*
 * This function will generate link in based on current permalink settings
 */
function wp_amp_permalink( $the_id, $sConstant, $sPermalink = '' ) {  
	if( $sPermalink != '' ) {
		$the_permalink = $sPermalink;
	} else {
		$the_permalink = get_the_permalink( $the_id );
	}
	$the_permalink = rtrim( $the_permalink, '/' ) . '/';
	$perma = strpos( $the_permalink, "?" );
	if ( $perma === false ) {
		$sConnector = "?";
	} else {
		$sConnector = "&";
	}
	return $the_permalink . $sConnector . $sConstant;
}

/*
 * This function will add custom style required for AMP Pages to display
 */
add_action( 'wpamp_custom_style', 'wpamp_custom_style' );
function wpamp_custom_style() {
	include( WPAMP_PLUGIN_PATH . 'includes/wpamp-style.php');
} 

/*
 * This function will generate AMP reference URL to all the Menus
 */
function wpamp_change_menu_href( $items ){
	foreach( $items as $item ){
		$item->url = wp_amp_permalink( '', AMP_CONSTANT, $item->url );
	}
	return $items;
}
add_filter('wp_nav_menu_objects', 'wpamp_change_menu_href');

/*
 * This function will add required attribute to the script tag
 */
add_filter('script_loader_tag', 'wpamp_async_attribute', 10, 2);
function wpamp_async_attribute($tag, $handle) {
    if ( 'ampproject' !== $handle ) {
        return '';
	} else {
		return str_replace( " type='text/javascript'", "", str_replace( ' src', ' async src', $tag ) );
	}
}

/*
 * This function will filter unnecessary data from the head tag and returns the required code only.
 */
add_action( 'wpamp_custom_script', 'wpamp_custom_script' );
function wpamp_custom_script() { 
	global $post;
	echo '<script async src="https://cdn.ampproject.org/v0.js"></script>';
	echo '<script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>';
	echo '<script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>';
	if ( is_single() || is_page() ) {
		$sContent = apply_filters( 'the_content', $post->post_content );
		if ( strpos( $sContent, '<amp-iframe' ) !== false || strpos( $sContent, '<iframe' ) !== false ) {
			echo '<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>';			
		}
		if ( strpos( $sContent, '<amp-audio' ) !== false || strpos( $sContent, '<audio' ) !== false ) {
			echo '<script async custom-element="amp-audio" src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script>';	
		}
		if ( strpos( $sContent, '<amp-video' ) !== false || strpos( $sContent, '<video' ) !== false ) {
			echo '<script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>';
		}
	}
}

/*
 * This function will generate script code for head section
 */
add_action('wpamp_head_json_script', 'wpamp_head_json_script');
function wpamp_head_json_script() { 
	$sOutput = '';
	$amplogo = get_option( 'amplogo' );
	global $post;
	$thumb_url_array = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'full', false );	
	if( $amplogo == "" ) { $amplogo = WPAMP_PLUGIN_URL . 'images/logo.png'; }
	$author_name = get_the_author_meta( 'display_name', $post->post_author );
	$get_permalink = get_permalink( $post->ID );
	$get_the_excerpt = esc_html( str_replace('\\', '&#92;', wpamp_get_the_excerpt( get_the_excerpt( $post->ID ), 45 ) ) );
	if ( function_exists( 'get_avatar_url' ) ) {
		$author_image = esc_url( get_avatar_url( get_the_author_meta( 'user_email', $post->post_author ), array('size' => 60) ) );
    } else {
		$author_image = WPAMP_PLUGIN_URL . 'images/placeholder.png';
	}
	
	$sOutput = '<script type="application/ld+json">{';
	$sOutput .= '"@context":"http:\/\/schema.org",';
	$sOutput .= '"@type":"BlogPosting",';
	$sOutput .= '"mainEntityOfPage":"' . $get_permalink . '",';
	$sOutput .= '"headline":"' . $post->post_title . '",';
	$sOutput .= '"datePublished":"' . get_the_date( 'c' ) . '",';
	$sOutput .= '"dateModified":"' . get_the_modified_date( 'c' ) . '",';
	$sOutput .= '"publisher":{"@type":"Organization", "name":"' . $author_name . '", "image": { "@type":"ImageObject", "url":"' . $author_image . '", "width":"60", "height":"60" }, "logo": { "@type":"ImageObject", "url":"' . $author_image . '", "width":"60", "height":"60" } },';
	$sOutput .= '"author":{"@type":"Person", "name":"' . $author_name . '"},';
	$sOutput .= '"description": "' . $get_the_excerpt . '",';
	if( !empty( $thumb_url_array ) ) {
		$sOutput .= '"image":{ "@type":"ImageObject", "url":"' . $thumb_url_array[0] . '", "width": "' . $thumb_url_array[1] . '", "height": "' . $thumb_url_array[2] . '" }';
	} else {
		$sOutput .= '"image":{ "@type":"ImageObject", "url":"' . WPAMP_PLUGIN_URL . 'images/placeholder.png", "width":"622", "height":"415"}';
	}
	$sOutput .= '}</script>';
	echo $sOutput;
}

/*
 * Include favicon icon in head section
 */
add_action( 'wpamp_favicon_icon', 'wpamp_favicon_icon' );
function wpamp_favicon_icon() { 
    $faviconid = get_option( 'faviconid' );
	if( $faviconid != '' ) { 
		$logo_array = wp_get_attachment_image_src( $faviconid, 'full', false );
		echo '<link rel="icon" type="image/png" href="' . $logo_array[0] . '">';
	}
}

/*
 * Include Google Analytics script in head section
 */
add_action('wpamp_google_analytics_script', 'wpamp_google_analytics_script');
function wpamp_google_analytics_script() { 
	$amp_gaid = get_option( 'amp_gaid' );
	if( $amp_gaid != '' ) {
		echo '<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>';
	}
}

/*
 * Implement Google Analytics code
 */
add_action('wpamp_google_analytics_code', 'wpamp_google_analytics_code');
function wpamp_google_analytics_code() {
	$amp_gaid = get_option( 'amp_gaid' );
	if( $amp_gaid != '' ) {
		echo '<amp-analytics type="googleanalytics" id="analytics1">
		<script type="application/json">
		{
		  "vars": {
			"account": "' . $amp_gaid . '"
		  },
		  "triggers": {
			"trackPageview": {
			  "on": "visible",
			  "request": "pageview"
			}
		  }
		}
		</script>
		</amp-analytics>';
	}
}

/*
 * Filter the wp_title to add blog name if no title found
 */
function wpamp_filter_title( $title, $sep ) {
	if( empty( $title ) ) {
		$title .= get_bloginfo( 'name' );
	}
	return $title;
}
add_filter( 'wp_title', 'wpamp_filter_title', 10, 2 );

/*
 * Return excerpt from the content
 */
function wpamp_get_the_excerpt( $sContent, $iWords ) {
	global $post;
	$sSummary = $sContent ? $sContent : $post->post_content;
	$sContent = strip_tags( str_replace( ']]>', ']]&gt;', strip_shortcodes( $sSummary ) ) );
	return wp_trim_words( $sContent, $iWords, '...' );
}

/*
 * Return feature image of thumb id
 */
function wpamp_get_featured_image( $thumbnail_id, $size ) {
	$sOutput = '';
	$thumb_url_array = wp_get_attachment_image_src( $thumbnail_id, $size, false );
	$thumb_url = $thumb_url_array[0];
	if( $thumb_url != '' ) { 
		if( $size == 'thumbnail' ) {
			$width = '130';
			$height = '130';
			$class = 'post_image';
		} else {
			$width = $thumb_url_array[1];
			$height = $thumb_url_array[2];
			$class = 'post_image_full';
		}
		$sOutput = '<div class="' . $class . '"><amp-img src="' . $thumb_url .'" width="' . $width . '" height="' . $height . '"></amp-img></div>';
	}
	return $sOutput;
}

/*
 * Return page header
 */
function wpamp_page_header(){
	$sOutput = '';
	if( is_404() ) {
		$sOutput = '<h2>404 - Not found</h2><article class="post"><p>Oops! That page can&rsquo;t be found.</p><p><a href="' . wp_amp_permalink( NULL, AMP_CONSTANT, home_url() ) . '">Go to Home</a></p></article>';
	} else if( is_search() ){
		$sOutput = '<h2>Search: ' . get_query_var('s') . '</h2>';
	} else if( is_archive()){
		$sOutput = the_archive_title( '<h2>', '</h2>' );
		$sOutput .= the_archive_description( '<p>', '</p>' );
	}
	return $sOutput;
}

/*
 * Include canonical tag to header
 */
function wpamp_canonical_link() { 
	global $post, $wp;
	$the_permalink = '';
	$page_for_posts = get_option( 'page_for_posts' );
	$frontpage_id = get_option( 'page_on_front' );
	$queried_object = get_queried_object();

	if( ( ($page_for_posts == 0 || $page_for_posts == "") && ($frontpage_id == 0 || $frontpage_id == "") ) && is_home() ) {
		//	Home page is the blog page
		$the_permalink = home_url();
	} else if( ($page_for_posts == 0 || $page_for_posts == "") && ($frontpage_id != 0 && $frontpage_id != "") ) {
		//	There is no blog page available in the site
		$the_permalink = get_the_permalink( $post->ID );
	} else if( $queried_object->ID == $page_for_posts ) {
		//	Current page is blog page
		$the_permalink = home_url( add_query_arg( array(), $wp->request ) );
	} else if( is_archive() ) {
		//	if its archive page
		$the_permalink = home_url( add_query_arg( array(), $wp->request ) );
	} else if( is_404() ) {
		//	if its 404 page
		$the_permalink = home_url();
	} else {
		$the_permalink = get_the_permalink( $post->ID );
	}
	$the_permalink = rtrim( $the_permalink, '/' ) . '/';
	return $the_permalink;
}

/*
 * Display post categories
 */
add_action( 'wpamp_display_categories', 'wpamp_display_categories' );
function wpamp_display_categories() { 
	$sOutput = '';
	global $post;
	$sOutput .= '<div class="catlisting">';
	$taxonomy_objects = get_object_taxonomies( $post->post_type );
	foreach( $taxonomy_objects as $taxonomy ) {
		$termsArray = get_the_terms( $post->ID, $taxonomy);
		if( $termsArray ) {
			$taxonomy_detail = get_taxonomy( $taxonomy );
			if( $taxonomy_detail->labels->name != '' ) {
				$amp_title = $taxonomy_detail->labels->name;
			} else {
				$amp_title = WPAMP_CATEGORY_TITLE;
			}
			$linkList = array();
			$sOutput .= '<p>' . $amp_title . ': ';
			foreach( $termsArray as $term ) {
				$linkList[] = '<a href="' . wp_amp_permalink( NULL, AMP_CONSTANT, get_term_link( $term->term_id, $taxonomy ) ) .'">'. $term->name . '</a>';
			}
			$sOutput .= implode( '', $linkList );
			$sOutput .= '</p>';
		}
	}
	$sOutput .= '</div>';
	$sOutput .= '<div class="clearfix"></div>';
	echo $sOutput;
}
?>