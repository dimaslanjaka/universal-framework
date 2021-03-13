<?php
/* Kentooz Framework widget for Facebook Like Box. */


// Do not load directly...
if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

class ktz_facebook extends WP_Widget {
	function __construct() {
		$widget_ops = array( 'classname' => 'ktz_facebook', 'description' => __( 'Facebook like box.','ktz_theme_textdomain') );
		parent::__construct( 'ktz-facebook', __( 'KTZ Facebook Like Box','ktz_theme_textdomain' ), $widget_ops );
	}

    function widget($args, $instance)
    {
        extract( $args );
		$title = apply_filters('widget_title', empty($instance['title']) ? '' : $instance['title']);
        $url = $instance['url'];
        $width = $instance['width'];
        $height = $instance['height'];
        $colorscheme = $instance['colorscheme'];
        $show_faces = $instance['show_faces'] == 'true' ? 'true' : 'false';
        $stream = $instance['stream'] == 'true' ? 'true' : 'false';
        $header = $instance['header'] == 'true' ? 'true' : 'false';
        $border = $instance['border'] == 'true' ? 'true' : 'false';
        ?>
		<?php echo $before_widget; ?>
        <?php if ( $title ) echo $before_title . $title . $after_title; ?>
        <div id="fb-root"></div><div class="ktz-fbbox"><fb:like-box href="<?php echo $url; ?>" data-width="<?php echo $width; ?>" height="<?php echo $height; ?>" colorscheme="<?php echo $colorscheme; ?>" show_faces="<?php echo $show_faces; ?>" stream="<?php echo $stream; ?>" header="<?php echo $header; ?>" show_border="<?php echo $border; ?>"></fb:like-box></div>
		<?php echo $after_widget; ?>
     <?php
    }

	/* Update the widget settings. */
    function update($new_instance, $old_instance) 
    {		
    	$instance = $old_instance;
		$instance['title'] = strip_tags($new_instance['title']);
        $instance['url'] = strip_tags( $new_instance['url'] );
        $instance['width'] = strip_tags( $new_instance['width'] );
        $instance['height'] = strip_tags( $new_instance['height'] );
        $instance['colorscheme'] = strip_tags( $new_instance['colorscheme'] );
		$instance['show_faces'] = isset($new_instance['show_faces']) ? true : false;
		$instance['stream'] = isset($new_instance['stream']) ? true : false;
		$instance['header'] = isset($new_instance['header']) ? true : false;
		$instance['border'] = isset($new_instance['border']) ? true : false;
        return $instance;
    }

	function form( $instance ) {
		$instance = wp_parse_args( (array) $instance, array( 'title' => '','url' => '', 'width' => '', 'height' => '', 'colorscheme' => 'light', 'show_faces' => false, 'stream' => false, 'header' => false, 'border' => true) );
		$title = esc_attr( $instance['title'] );
		$url = esc_attr( $instance['url'] );
		$width = esc_attr( $instance['width'] );
		$height = esc_attr( $instance['height'] );
		$border = esc_attr( $instance['border'] );
		?>

        <p><label for="<?php echo $this->get_field_id('title'); ?>"><?php _e( 'Title:','ktz_theme_textdomain'); ?></label> <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo $title; ?>" />
        </p>
        <p>
			<label for="<?php echo $this->get_field_id('url'); ?>"><?php _e( 'URL:','ktz_theme_textdomain'); ?></label> <input class="widefat" id="<?php echo $this->get_field_id('url'); ?>" name="<?php echo $this->get_field_name('url'); ?>" type="text" value="<?php echo $url; ?>" />
            <br />
            <small><?php _e( 'Fill with your facebook URL fanpage','ktz_theme_textdomain' ); ?></small><br />
			<label for="<?php echo $this->get_field_id('width'); ?>"><?php _e( 'Width:','ktz_theme_textdomain'); ?></label> <input class="widefat" id="<?php echo $this->get_field_id('width'); ?>" name="<?php echo $this->get_field_name('width'); ?>" type="text" value="<?php echo $width; ?>" />
            <br />
            <small><?php _e( 'Fill width like box','ktz_theme_textdomain' ); ?></small>
        </p>
        <p>
			<label for="<?php echo $this->get_field_id('height'); ?>"><?php _e( 'Height:','ktz_theme_textdomain'); ?></label> <input class="widefat" id="<?php echo $this->get_field_id('height'); ?>" name="<?php echo $this->get_field_name('height'); ?>" type="text" value="<?php echo $height; ?>" />
            <br />
            <small><?php _e( 'Fill height like box','ktz_theme_textdomain' ); ?></small>
        </p>
        <p><label for="<?php echo $this->get_field_id('colorscheme'); ?>"><?php _e( 'Colorscheme:','ktz_theme_textdomain' ); ?></label>
            <select name="<?php echo $this->get_field_name('colorscheme'); ?>" id="<?php echo $this->get_field_id('colorscheme','ktz_theme_textdomain'); ?>" class="widefat">
            <option value="light"<?php selected( $instance['colorscheme'], 'light' ); ?>><?php _e( 'light','ktz_theme_textdomain' ); ?></option>
            <option value="dark"<?php selected( $instance['colorscheme'], 'dark' ); ?>><?php _e( 'dark','ktz_theme_textdomain' ); ?></option>
            </select>
            <br/>
            <small><?php _e( 'Select likebox colorscheme.','ktz_theme_textdomain' ); ?></small>
		</p>
        <p><label for="<?php echo $this->get_field_id('show_faces'); ?>"><?php _e( 'Show face:','ktz_theme_textdomain' ); ?></label><br />
            <input class="checkbox" type="checkbox" <?php checked($instance['show_faces'], true) ?> id="<?php echo $this->get_field_id('show_faces'); ?>" name="<?php echo $this->get_field_name('show_faces'); ?>" />
            <small><?php _e( 'Check for show face','ktz_theme_textdomain' ); ?></small><br />
			<label for="<?php echo $this->get_field_id('stream'); ?>"><?php _e( 'Show stream:','ktz_theme_textdomain' ); ?></label><br />
            <input class="checkbox" type="checkbox" <?php checked($instance['stream'], true) ?> id="<?php echo $this->get_field_id('stream'); ?>" name="<?php echo $this->get_field_name('stream'); ?>" />
            <small><?php _e( 'Check for show stream','ktz_theme_textdomain' ); ?></small><br />
			<label for="<?php echo $this->get_field_id('header'); ?>"><?php _e( 'Show header:','ktz_theme_textdomain' ); ?></label><br />
            <input class="checkbox" type="checkbox" <?php checked($instance['header'], true) ?> id="<?php echo $this->get_field_id('header'); ?>" name="<?php echo $this->get_field_name('header'); ?>" />
            <small><?php _e( 'Check for show header','ktz_theme_textdomain' ); ?></small><br />        
			<label for="<?php echo $this->get_field_id('border'); ?>"><?php _e( 'Show border:','ktz_theme_textdomain' ); ?></label><br />
			<input class="checkbox" type="checkbox" <?php checked($instance['border'], true) ?> id="<?php echo $this->get_field_id('border'); ?>" name="<?php echo $this->get_field_name('border'); ?>" />
            <small><?php _e( 'Check for show border','ktz_theme_textdomain' ); ?></small><br />
        </p>
	<?php
	}
}