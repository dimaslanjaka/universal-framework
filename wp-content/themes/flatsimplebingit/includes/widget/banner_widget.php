<?php
/* Kentooz Framework widget for Facebook Like Box. */


// Do not load directly...
if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

class ktz_banner extends WP_Widget {
	function __construct() {
		$widget_ops = array( 'classname' => 'ktz_banner', 'description' => __( 'Banner Widget.','ktz_theme_textdomain') );
		parent::__construct( 'ktz-banner', __( 'KTZ Banner','ktz_theme_textdomain' ), $widget_ops );
	}

    function widget($args, $instance)
    {
        extract( $args );
 		$title = apply_filters('widget_title', empty($instance['title']) ? '' : $instance['title']);
        $get_banners = $instance['banners'];
		if ( !is_search() ) {
		echo $before_widget;
		if ( $title )
			echo $before_title . $title . $after_title;
			echo '<div class="box-banner">';
			echo $get_banners;		
			echo '</div>';
			echo $after_widget;
		}
	}

    function update($new_instance, $old_instance) 
    {				
    	$instance = $old_instance;
		$instance['title'] = strip_tags( $new_instance['title'] );
		if ( current_user_can('unfiltered_html') )
			$instance['banners'] =  $new_instance['banners'];
		else
			$instance['banners'] = stripslashes( $new_instance['banners'] );
        return $instance;
    }

	function form( $instance ) {
		$instance = wp_parse_args( (array) $instance, array( 'banners' => '<a href="http://kentooz.com" title="example banner link"><img src="https://farm8.staticflickr.com/7535/15499746090_945c908d3a_o.png" alt="example banner" title="example banner" width="200" height="200"/></a>') );
		$title 			= 	isset($instance['title']) ? esc_attr($instance['title']) : '';
		$get_banners = $instance['banners'];
		?>
        <script type="text/javascript">
		 $kentoozjQ=jQuery.noConflict();           
            function kentooz_banner_preview(id)
            {
                $kentoozjQ('#preview_'+id+'').fadeOut();
                
                $kentoozjQ('#preview_'+id+'').fadeIn();
                $kentoozjQ('#preview_'+id+'').empty();
                var bannersource = $kentoozjQ('textarea#source_'+id+'').val();
                $kentoozjQ('#preview_'+id+'').append(''+bannersource+'');
            }
            
        </script>
        <p><label for="<?php echo $this->get_field_id('title'); ?>"><?php _e( 'Title:','ktz_theme_textdomain'); ?></label> <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo $title; ?>" />
        </p>
		<div id="container_<?php echo $this->get_field_id('banners'); ?>">
		<label for="<?php echo $this->get_field_id('banners'); ?>"><?php _e( 'Banner Code:','ktz_theme_textdomain' ); ?></label>
        <textarea class="widefat" rows="5" cols="20" id="source_<?php echo $this->get_field_id('banners','ktz_theme_textdomain'); ?>" name="<?php echo $this->get_field_name('banners'); ?>"><?php echo $get_banners; ?></textarea><br />
		<small><?php _e( 'Fill with text banner or JS PTC, you can use HTML code.','ktz_theme_textdomain' ); ?></small><br />
		<label for="preview"><?php _e( 'Preview:','ktz_theme_textdomain' ); ?></label><br />
		<div class="widefat" id="preview_<?php echo $this->get_field_id('banners'); ?>"><?php echo $get_banners; ?></div><br />
        <div>
		<a class="button"  onclick="kentooz_banner_preview('<?php echo $this->get_field_id('banners'); ?>');"><?php _e( 'Preview','ktz_theme_textdomain' ); ?></a> 
		</div>
		</div>
		<?php } 
}