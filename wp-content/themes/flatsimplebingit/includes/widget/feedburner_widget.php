<?php
/* Kentooz Framework widget for FeedBurner Box. */


// Do not load directly...
if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

class ktz_feedburner extends WP_Widget {
	function __construct() {
		$widget_ops = array( 'classname' => 'ktz_feedburner', 'description' => __( 'Social Feedburner box.','ktz_theme_textdomain') );
		parent::__construct( 'ktz-feedburner', __( 'KTZ Social Feed','ktz_theme_textdomain' ), $widget_ops );
	}

	function widget( $args, $instance ) {
		extract( $args );
		$title = apply_filters('widget_title', empty( $instance['title'] ) ? '' : $instance['title'], $instance, $this->id_base);
		$text = $instance['text'];
		$feedburnerid = $instance['feedburnerid'];
		$bloginfo = get_template_directory_uri();
		echo $before_widget;
		/* Start output */
			echo '<div class="widget_feedburner clearfix">';
			if ( $title ) :
			echo $before_title; 
			echo $title;
			echo $after_title;
			endif;
			if ( $text ) :
			echo '<div class="feedburner_text">'.$text.'</div>';	
			endif;
			echo '<div class="feedburner_box">';
			echo '<form role="form" action="https://feedburner.google.com/fb/a/mailverify" method="post" target="popupwindow" onsubmit="window.open(\'http://feedburner.google.com/fb/a/mailverify?uri='.$feedburnerid.'\', \'popupwindow\', \'scrollbars=yes,width=550,height=520\');return true">';
			echo '<div class="form-group has-feedback">';
			echo '<label class="control-label sr-only" for="email">Email</label>';
			echo '<input type="text" class="form-control btn-box" placeholder="Email address" name="email" />';
			echo '<span class="glyphicon glyphicon-envelope form-control-feedback"></span>';
	  		echo '<input type="hidden" value="'.$feedburnerid.'" name="uri"/><input type="hidden" name="loc" value="en_US"/></div>';
			echo '<button class="btn btn-default btn-block btn-box">'. __('Submit', 'ktz_theme_textdomain') .'</button>';
			echo '</form>';
			echo '</div>';
			echo '</div>';
			echo $after_widget;
	}

	/* Update the widget settings. */
	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		$instance['title'] = strip_tags( $new_instance['title'] );
		$instance['text'] = strip_tags( $new_instance['text'] );
		$instance['feedburnerid'] = strip_tags( $new_instance['feedburnerid'] );
		return $instance;
	}

	function form( $instance ) {
		$instance = wp_parse_args( (array) $instance, array( 'title' => '','feedburnerid' => '', 'text' => '') );
		$title = esc_attr( $instance['title'] );
		$text = esc_attr( $instance['text'] );
		$feedburnerid = esc_attr( $instance['feedburnerid'] );
		?>

        <p><label for="<?php echo $this->get_field_id('title'); ?>"><?php _e( 'Title:','ktz_theme_textdomain'); ?></label> <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo $title; ?>" />
        </p>
        <p>
			<label for="<?php echo $this->get_field_id('text'); ?>"><?php _e( 'Text:','ktz_theme_textdomain'); ?></label> <input class="widefat" id="<?php echo $this->get_field_id('text'); ?>" name="<?php echo $this->get_field_name('text'); ?>" type="text" value="<?php echo $text; ?>" />
            <br />
            <small><?php _e( 'Fill with text description before input value','ktz_theme_textdomain' ); ?></small>
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('feedburnerid'); ?>"><?php _e( 'Feedburnerid','ktz_theme_textdomain' ); ?></label>
            <input type="text" value="<?php echo $feedburnerid; ?>" name="<?php echo $this->get_field_name('feedburnerid'); ?>" id="<?php echo $this->get_field_id('twitter_url'); ?>" class="widefat" />
            <br />
            <small><?php _e( 'Fill feedburner id example http://feedburner.google.com/fb/a/mailverify?uri=yourfeedburnerid','ktz_theme_textdomain' ); ?>
            </small>
        </p>
	<?php
	}
}