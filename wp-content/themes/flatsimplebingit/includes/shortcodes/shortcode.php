<?php
/*
/*---------------------------------------------------------*/
/* KENTOOZ SHORTCODE FRAMEWORK - PREMIUM ONLY
/* We have more than 100 Shortcode Not all includes in theme
/* Website: kentooz.com
/* The Author: Gian Mokhammad Ramadhan 
/* Social network :twitter.com/g14nnakal facebook.com/gianmr
/* Version :1.0
/*---------------------------------------------------------*/


// Do not load directly...
if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

function ktz_shortcodes_js() {
	global $pagenow;
  	if ( $pagenow == 'post.php' || $pagenow == 'post-new.php' || $pagenow == 'page-new.php' || $pagenow == 'page.php' || $pagenow == 'themes.php' ) {
		wp_enqueue_script("shortcode_js", ktz_url."includes/shortcodes/js/scripts.js", false, "1.0");
	}
}
add_action( 'admin_enqueue_scripts', 'ktz_shortcodes_js' );

/*******************************************
# Functions add button to tinymce editor
*******************************************/
add_action('init', 'add_buttons');
function add_buttons() {
    if ( current_user_can('edit_posts') &&  current_user_can('edit_pages') )
    {
	  add_filter('mce_external_plugins', 'add_plugins');
      add_filter('mce_buttons', 'register_buttons');	  
    }
 }

function register_buttons( $buttons ) {
	array_push( $buttons, '|', 'ktz_shortcodes' );
	return $buttons;

}

function add_plugins( $plugin_array ) {
	$plugin_array['ktz_shortcodes'] = ktz_url . 'includes/shortcodes/tinymce.js';
	return $plugin_array;

}

/*******************************************
# Functions register shortcode to init
*******************************************/
function kentooz_add_shortcodes() {
	/* General */
	add_shortcode('accordions', 'accordions'); /* For group accordion */
	add_shortcode('accordion', 'accordion'); /* format [accordion title="Title Accordion"][/accordion] */
	add_shortcode('button', 'button'); /* format [button href="" style="" size=""][/button] */
	add_shortcode('coloum_row', 'coloum_row');
	add_shortcode('coloum_one', 'coloum_one');
	add_shortcode('coloum_one_half', 'coloum_one_half');
	add_shortcode('coloum_one_third', 'coloum_one_third');
	add_shortcode('coloum_one_fourth', 'coloum_one_fourth');
	add_shortcode('coloum_one_sixth', 'coloum_one_sixth');
	add_shortcode('coloum_two_third', 'coloum_two_third');
	add_shortcode('coloum_three_fourth', 'coloum_three_fourth');
	add_shortcode('coloum_five_sixth', 'coloum_five_sixth');
	add_shortcode('divider', 'divider'); /* format [divider] */
	add_shortcode('dropcap', 'dropcap'); /* format [dropcap][/dropcap] */
	add_shortcode('highlight', 'highlight'); /* format [highlight type="" style=""][/highlight] */
	add_shortcode('icon', 'icon'); /* format [icon type="" color=""][/icon] */
	add_shortcode('infobox', 'infobox'); /* format [infobox class=""][/infobox] */
	add_shortcode('liststyle', 'liststyle'); /* format [liststyle style=""][/liststyle] */
	add_shortcode('popover', 'popover'); /* format [popover][/tooltips] */
	add_shortcode('progressbar', 'progressbar'); /* format [progressbar][/prettify] */
	add_shortcode('table', 'table'); /* format [table style=""][/table] */
	add_shortcode('tab', 'tab'); /* format [tabgroup button="default"][tab title="Tab1"]content[/tab][tab title="Tab2"]content[/tab][/tabgroup] */
	add_shortcode('tabgroup', 'tabgroup'); /* format [tabgroup][tab title="Tab1"]content[/tab][tab title="Tab2"]content[/tab][/tabgroup] */
	add_shortcode('tooltips', 'tooltips'); /* format [tooltips tips="" position=""][/tooltips] */
	/* Media */
	add_shortcode('image', 'image'); /* format [image src="" style=""][/image] */
	add_shortcode('googlemap', 'googlemap'); /* format [googlemap height="" weight="" src=""][/googlemap] */
	add_shortcode('vimeo', 'vimeo'); /* format [vimeo height="" weight="" url=""][/vimeo] */
	add_shortcode('youtube', 'youtube'); /* format [youtube height="" weight="" url=""][/youtube] */
	add_shortcode('soundcloud', 'soundcloud'); /* format [soundcloud height="" weight="" url=""][/soundcloud] */
	/* Content */
	add_shortcode('sitemap', 'sitemap'); /* format [sitemap] */
	add_shortcode('viral_lock_button', 'viral_lock_button'); /* format [viral_lock_button] */
}
add_action( 'init', 'kentooz_add_shortcodes' );

/*******************************************
# Better cache function shortcode button
*******************************************/
function my_refresh_mce($ver) {
	$ver += 3;
	return $ver;
}

add_filter( 'tiny_mce_version', 'my_refresh_mce');

/*******************************************
# Function shorcode - accordion group
*******************************************/
function Accordions( $atts, $content = null ) {
	extract( shortcode_atts( array(), $atts ) );
	return '<div class="panel-group" id="accordion2">'.ktz_remove_wpautop(do_shortcode($content)).'</div>';
}
/* Accorion single */
function accordion( $atts, $content = null ) {
	extract( shortcode_atts( array(
      'title' => 'Accordion'
      ), $atts ) );
	$acc_id = 'acc-'.rand(2,20000);
	$titles = empty($title) ? '' : $title;
	return '<div class="panel panel-default btn-box"><div class="panel-heading"><h4 class="panel-title"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#'.$acc_id.'">'. esc_attr ( $titles ) .'</a></h4></div><div id="'.$acc_id.'" class="panel-collapse collapse"><div class="panel-body">'.ktz_remove_wpautop(do_shortcode($content)).'</div></div></div>';
}

/*******************************************
# Function shorcode - button
*******************************************/
function button($atts, $content = null) {
	extract(shortcode_atts(array(
      "href" => "",
	  "style" => "",
	  "size" => "",
	  "icon" => "",
	  "rounded" => "",
	  "target" => "",
	), $atts));
	$hrefs = empty($href) ? '' : $href;
	$icons = empty($icon) ? '' : $icon;
	$styles = empty($style) ? '' : $style;
	$roundeds = empty($rounded) ? '' : $rounded;
	$sizes = empty($size) ? '' : $size;
	$targets = empty($target) ? '' : $target;
		$button_array = '';
		$button_array .= '<a href="'. esc_attr ( $hrefs ) .'" class="btn '. esc_attr ( $styles ).' '. esc_attr ( $roundeds ) .' '. esc_attr ( $sizes ) .'" target="'.esc_attr ( $targets ).'" title="' . ktz_remove_wpautop(do_shortcode($content)) . ' for link '. esc_attr ( $hrefs ) .'">';
	if ( $icons != '' ) { 	
		$button_array .= '<span class="'.esc_attr ( $icons ).'"></span> ';
		}
		$button_array .= ktz_remove_wpautop(do_shortcode($content)).'</a>';
	return $button_array;
}

/*******************************************
# Function shorcode - coloum
*******************************************/
function coloum_row( $atts, $content = null ) {
	return '<div class="row">' . do_shortcode( $content ) . '</div>';
}
function coloum_one( $atts, $content = null ) {
	return '<div class="col-md-12">' . do_shortcode( $content ) . '</div>';
}
function coloum_one_half( $atts, $content = null ) {
	return '<div class="col-md-6">' . do_shortcode( $content ) . '</div>';
}
function coloum_one_third( $atts, $content = null ) {
	return '<div class="col-md-4">' . do_shortcode( $content ) . '</div>';
}
function coloum_one_fourth( $atts, $content = null ) {
	return '<div class="col-md-3">' . do_shortcode( $content ) . '</div>';
}
function coloum_one_sixth( $atts, $content = null ) {
	return '<div class="col-md-2">' . do_shortcode( $content ) . '</div>';
}
function coloum_two_third( $atts, $content = null ) {
	return '<div class="col-md-8">' . do_shortcode( $content ) . '</div>';
}
function coloum_three_fourth( $atts, $content = null ) {
	return '<div class="col-md-9">' . do_shortcode( $content ) . '</div>';
}
function coloum_five_sixth( $atts, $content = null ) {
	return '<div class="col-md-10">' . do_shortcode( $content ) . '</div>';
}

/*******************************************
# Function shorcode - divider
*******************************************/
function divider($atts) {
	extract( shortcode_atts( array(
		'style' => '',
		'id' => '',
	), $atts ) );
	$out ='<hr ';
	if ($id !='') {$out .='id="' . esc_attr ( $id ) . '"';} 
	$out .=' class="' . esc_attr ( $style ) . '" />';
	return $out;
}

/*******************************************
# Function shorcode - dropcap
*******************************************/
function dropcap($atts, $content = null) {
	extract(shortcode_atts(array(
	"style" => '',
	"rounded" => ''
	), $atts));
	$styles = empty($style) ? '' : $style;
	$roundeds = empty($rounded) ? '' : $rounded;
	return '<span class="dropcap '. esc_attr ( $styles ) .' '. esc_attr ( $roundeds ) .'">'. ktz_remove_wpautop(do_shortcode($content)).'</span>';
}

/*******************************************
# Function shorcode - highlight text
*******************************************/
function highlight($atts, $content = null) {
	extract(shortcode_atts(array(
		"style" => 'success',
	), $atts));
	$styles = empty($style) ? '' : $style;
return '<span class="label '.esc_attr ( $styles ) .'">'.ktz_remove_wpautop(do_shortcode($content)).'</span>';
}

/*******************************************
# Function shorcode - icon
*******************************************/
function icon( $atts, $content = null ) {
	extract( shortcode_atts( array(
      'type' => 'icon-search',
      'color' => '#474747',
      'size' => '18px',
      ), $atts ) );
	$colors = empty($color) ? '' : $color;
	$sizes = empty($size) ? '' : $size;
	$types = empty($type) ? '' : $type;
	return '<span class="'. esc_attr ( $types ) .'" style="color:'. esc_attr ( $colors ) .';font-size:'. esc_attr ( $sizes ) .';"></span>';
}

/*******************************************
# Function shorcode - infobox
*******************************************/
function infobox($atts, $content = null) {
	extract(shortcode_atts(array(
		"style" => '',
	), $atts));
	$styles = empty($style) ? '' : $style;
return '<div class="alert alert-block btn-box '. esc_attr ( $styles ) .'">'.ktz_remove_wpautop(do_shortcode($content)).'</div>';
}

/*******************************************
# Function shorcode - list
*******************************************/
function liststyle( $atts, $content = null ) {
   extract( shortcode_atts( array(
      'style' => '',
      'color' => ''
      ), $atts ) );
	$styles = empty($style) ? '' : $style;
	$colors = empty($color) ? '' : $color;
	return '<div class="sc-list ' . esc_attr ( $styles ) . ' ' . esc_attr ( $colors ) . '">' . ktz_remove_wpautop(do_shortcode($content)) . '</div>';
}

/*******************************************
# Function shorcode - popover
*******************************************/
function popover($atts, $content = null) {
	extract(shortcode_atts(array(
      "title" => "The title",
	  "style" => "",
	  "size" => "",
	  "icon" => "",
	  "rounded" => "",
	  "desc" => "",
	  "position" => "top",
	  "trigger" => "",
	), $atts));
   	$titles = empty($title) ? '' : $title;
	$icons = empty($icon) ? '' : $icon;
	$styles = empty($style) ? '' : $style;
	$roundeds = empty($rounded) ? '' : $rounded;
	$sizes = empty($size) ? '' : $size;
	$triggers = empty($trigger) ? '' : $trigger;
	$positions = empty($position) ? '' : $position;
	$descs = empty($desc) ? '' : $desc;
		$buttonpop_array = '';
		$buttonpop_array .= '<a data-original-title="'. esc_attr ( $titles ) .'" href="#" class="btn '. esc_attr ( $styles ).' '. esc_attr ( $roundeds ) .' '. esc_attr ( $sizes ) .'"  rel="popover" data-trigger="'. esc_attr ( $triggers ).'" data-placement="'. esc_attr ( $positions ).'" data-content="' . esc_attr ( $descs ) . '">';
	if ( $icons != '' ) { 	
		$buttonpop_array .= '<span class="'.esc_attr ( $icons ).'"></span> ';
		}
		$buttonpop_array .= ktz_remove_wpautop(do_shortcode($content)).'</a>';
	return $buttonpop_array;
}

/*******************************************
# Function shorcode - tooltips
*******************************************/
function progressbar( $atts, $content = null ) {
	extract( shortcode_atts( array(
      'style' => '',
      'striped' => '',
      'percent' => '',
      'text' => ''
      ), $atts ) );
	$styles = empty($style) ? '' : $style;
	$stripeds = empty($striped) ? '' : $striped;
	$percents = empty($percent) ? '100%' : $percent;	
	$texts = empty($text) ? '' : $text;
	return '<div class="progress ' . esc_attr ( $stripeds ) . '"><div class="progress-bar ' . esc_attr ( $styles ) . '" style="width: ' . esc_attr ( $percents ) . '"><div class="bar-text" style="display: block;">' . do_shortcode( $content ) . ' <span>' . esc_attr ( $percents ) . '</span></div></div></div>';
}

/*******************************************
# Function shorcode - table
*******************************************/
function table($atts, $content = null) {
	extract(shortcode_atts(array(
		"style" => 'table-striped'
	), $atts));
	$styles = empty($style) ? '' : $style;
	return '<div class="table '. esc_attr ( $styles ) .'">'. ktz_remove_wpautop(do_shortcode($content)).'</div>';
}

/*******************************************
# Function shorcode - tabs
*******************************************/
function tabgroup( $atts, $content = null ) {
	$tab_id = 'tab-'.rand(2,20000);
	$GLOBALS['tab_count'] = 0;
	do_shortcode( $content );
	$tabs_count = 0;
	if( is_array( $GLOBALS['tabs'] ) ) { 
		foreach( $GLOBALS['tabs'] as $tab ) {
		$tabs_count++;
		$tabs[] = '<li><a href="#'.$tab_id.''.$tabs_count.'" data-toggle="tab">'.$tab['title'].'</a></li>';
		$pane[] = '<div id="'.$tab_id.''.$tabs_count.'" class="tab-pane fade">'.ktz_remove_wpautop(do_shortcode($tab['content'])).'</div>';
		}
	$buttons = empty($button) ? '' : $button;
	$return = "\n". '<div class="tabbable"><ul class="nav nav-tabs" id="ktztab">'.implode( "\n", $tabs ).'</ul>'."\n".'<div class="tab-content">'.implode( "\n",$pane).'</div></div>' ."\n";
	}
	return $return;
}
/* Tabs single */
function tab( $atts, $content = null ) {
		extract( shortcode_atts( array(
			'title' => ''
		), $atts) );
		$i = $GLOBALS['tab_count'];
		$GLOBALS['tabs'][$i] = array( 'title' => sprintf( $title, $GLOBALS['tab_count'] ), 'content' => $content );
		$GLOBALS['tab_count']++;
}

/*******************************************
# Function shorcode - tooltips
*******************************************/
function tooltips( $atts, $content = null ) {
	extract( shortcode_atts( array(
      'tips' => 'Im your tips',
      'position' => 'top',
      ), $atts ) );
	$tipss = empty($tips) ? '' : $tips;
	$positions = empty($position) ? '' : $position;	
	return '<a data-original-title="'. esc_attr ( $tipss ) .'" id="ktztooltips" href="#" rel="tooltip" data-placement="'. esc_attr ( $positions ) .'">'. ktz_remove_wpautop(do_shortcode($content)).'</a>';
}

/*******************************************
# Function shorcode - image styling
*******************************************/
function image($atts, $content = null) {
	extract(shortcode_atts(array(
      "src" => "http://yourlink.com/imagepath/image.jpg",
	  "style" => "img-rounded",
	), $atts));
	$srcs = empty($src) ? '' : $src;
	$styles = empty($style) ? '' : $style;
return '<img src="'. esc_url ( $srcs ) .'" class="'. esc_attr ( $styles ).'" alt="image preview" />';
}

/*******************************************
# Function shorcode - googlemap
# iframe is get warning in theme check
*******************************************/
function googlemap($atts) {
	extract(shortcode_atts(array(
				"width" => '100%',
				"height" => '',
				"src" => ''
		 ), $atts));
	$widths = empty($width) ? '' : $width;
	$heights = empty($height) ? '' : $height;
	$srcs = empty($src) ? '' : $src;
	return '<iframe width="'. esc_attr ( $widths ).'" height="'. esc_attr ( $heights ) .'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="'. esc_attr ( $srcs ) .'&amp;output=embed" ></iframe>';
}

/*******************************************
# Function shorcode - youtube
# iframe is get warning in theme check
*******************************************/
function youtube($atts) {
	extract(shortcode_atts(array(
				"width" => '100%',
				"height" => '300',
				"src" => ''
		 ), $atts));
	$widths = empty($width) ? '' : $width;
	$heights = empty($height) ? '' : $height;
	$srcs = empty($src) ? '' : $src;
	return '<div class="video-container" style="margin-top:20px;"><iframe width="'. esc_attr ( $widths ) .'" height="'. esc_attr ( $heights ) .'" src="http://www.youtube.com/embed/' . esc_attr ( $srcs ) . '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowfullscreen></iframe></div>';
}

/*******************************************
# Function shorcode - vimeo
# iframe is get warning in theme check
*******************************************/
function vimeo($atts) {
	extract(shortcode_atts(array(
				"width" => '100%',
				"height" => '300',
				"src" => ''
		 ), $atts));
	$widths = empty($width) ? '' : $width;
	$heights = empty($height) ? '' : $height;
	$srcs = empty($src) ? '' : $src;
	return '<div class="video-container" style="margin-top:20px;"><iframe width="'. esc_attr ( $widths ) .'" height="'. esc_attr ( $heights ) .'" src="http://player.vimeo.com/video/' . esc_attr ( $srcs ) . '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>';
}

/*******************************************
# Function shorcode - souncloud
# With iframe now with better speed
*******************************************/
function soundcloud($atts) {
	extract(shortcode_atts(array(
				"url" => ''
		 ), $atts));
	$urls = empty($url) ? '' : $url;
	return '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="http://w.soundcloud.com/player/?url=' . esc_url ( $urls ) . '&amp;auto_play=false&amp;show_artwork=true&amp;color=ff7700"></iframe>';
}

/*******************************************
# Function shorcode - sitemap
*******************************************/
function sitemap( $atts, $content = null ) {
	$out ='<div class="row sitemap">';	
	$out .='<div class="col-md-6">';
	$out .='<h4><span class="ktz-blocktitle">' . __('Pages','ktz_theme_textdomain') . '</span></h4><ul>';
	ob_start(); // fix list in sitemap
	$out .='' . wp_list_pages('title_li=');
	$out .= ob_get_contents();
	ob_end_clean();
    $out .='</ul><h4><span class="ktz-blocktitle">' . __('Categories','ktz_theme_textdomain') . '</span></h4><ul>';
	ob_start(); // fix list in sitemap
    $out .= wp_list_categories('title_li=');
	$out .= ob_get_contents();
	ob_end_clean();
    $out .='</ul><h4><span class="ktz-blocktitle">' . __('Archives','ktz_theme_textdomain') . '</span></h4><ul>';
	ob_start(); // fix list in sitemap
    $out .= wp_get_archives('type=monthly&show_post_count=0');
	$out .= ob_get_contents();
	ob_end_clean();
    $out .='</ul></div><div class="col-md-6">';
	$cats = get_categories();
	    foreach ( $cats as $cat ) {
	    query_posts( 'cat=' . $cat->cat_ID );
		$out .='<h4><span class="ktz-blocktitle">' . $cat->cat_name . '</span></h4>';
		$out .='<ul>';
		while ( have_posts() ) { the_post();
	    $out .='<li><a href="' . get_permalink() . '">' . get_the_title() . '</a></li>';
	    } wp_reset_query();
		$out .='</ul>';
	    }
	$out .='</div></div>';
	return $out;
}

/*******************************************
# Function VIRAL LOCK BUTTON
*******************************************/
function viral_lock_button($atts, $content){
	extract(shortcode_atts(array(
				"show_facebook" => 'yes',
				"show_gplus" => 'yes',
				"show_twitter" => 'yes'
		 ), $atts));
	global $post;
	$thepost_id = get_the_ID();
	$dlgroup = 'ktz_like_to_download';
	$href = get_permalink(get_the_ID());
	$cookiehash = md5($href);
	$cookiename = 'ktz_cookie_'.$cookiehash;
	if (isset($_COOKIE[$cookiename]) == 'downloaded_'.$thepost_id) {
		?>
		<script type="text/javascript">
		jQuery(document).ready(function() {
				jQuery('.ktz_like_to_download_message .ktztext').html("Thanks for share!");
				jQuery('.ktz_like_to_download').show();
				jQuery('.ktz_like_to_download_message_container').hide('slow');
		});
		</script>
		<?php
	}
	?>
		<script type="text/javascript">
		function ktz_callback(response) {
				jQuery('.ktz_like_to_download_message .ktztext').html("Thanks for share!");
				jQuery('.ktz_like_to_download').show('slow');
				jQuery('.ktz_like_to_download_message_container').hide('slow');
				var data = {
					dlgroup: '<?php echo $dlgroup; ?>',
					href: '<?php echo $href; ?>',
					action: 'ktz_setcookie'
				};
				jQuery.post('<?php echo admin_url('admin-ajax.php'); ?>', data, function(response) {
					// alert(response);
				});
		}
		function ktz_gplus(plusone) {
				if (plusone.state == "on") {
					ktz_callback(null, null);
				}
		}
		window.fbAsyncInit = function() {
			FB.init({
				status     : true, // check login status
				cookie     : true, // enable cookies to allow the server to access the session
				xfbml      : true  // parse XFBML
			});
			FB.Event.subscribe('edge.create', function(response) {
				ktz_callback(response);
			});
			twttr.ready(function (twttr) {
				twttr.events.bind("tweet", function(event) {
					ktz_callback(null, null);
				});
			});
		};
		</script>
	<?php
	$show_facebooks = empty($show_facebook) ? '' : $show_facebook;
	$show_gpluss = empty($show_gplus) ? '' : $show_gplus;
	$show_twitters = empty($show_twitter) ? '' : $show_twitter;
	$viralout = '<div class="ktz_like_to_download_message_container clearfix"><div class="ktz_like_to_download_message">';
	$viralout .= '<div class="ktztext" style="margin-bottom: 8px;"><b>You must like for see the content!!</b></div>';
	if ( $show_facebooks == "yes" ) :
		$viralout .= '<div class="socialwrap pull-left">';
		$viralout .= '<fb:like href="'.$href.'" layout="box_count" show_faces="false" send="false" width="55"></fb:like>';
		$viralout .= '</div>';
	endif;
	if ( $show_gpluss == "yes" ) :
		$viralout .= '<div class="socialwrap pull-left">';
		$viralout .= '<g:plusone size="tall" annotation="bubble" callback="ktz_gplus" href="'.$href.'"></g:plusone>';
		$viralout .= '</div>';
	endif;
	if ( $show_twitters == "yes" ) :
		$viralout .= '<div class="socialwrap pull-left">';
		$viralout .= '<a href="http://twitter.com/share" class="twitter-share-button" data-url="'.$href.'" data-size="medium" data-count="vertical" data-lang="en">Tweet</a>';
		$viralout .= '</div>';
	endif;
	$viralout .= '</div>';
	$viralout .= '</div><div style="display: none;" class="ktz_like_to_download">'. ktz_remove_wpautop(do_shortcode( $content )) .'</div>';
	return $viralout;
}