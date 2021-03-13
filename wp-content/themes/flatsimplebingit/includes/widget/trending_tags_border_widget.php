<?php
/* Kentooz Framework widget for tags posts. */


// Do not load directly...
if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

class ktz_tags_border_posts extends WP_Widget {
	function __construct() {
		$widget_ops = array( 'classname' => 'widget_tag_cloud clearfix', 'description' => __( 'Trending tags.','ktz_theme_textdomain' ) );
		parent::__construct('ktz-tags-border-posts', __( 'KTZ Trending tag','ktz_theme_textdomain' ), $widget_ops);
	}
	
	function widget($args, $instance) {
		global $wpdb;
		extract($args);
		$title = apply_filters('widget_title', empty($instance['title']) ? '' : $instance['title']);
		$number = empty( $instance['number'] ) ? '5' : $instance['number']; 
		echo $before_widget; 
        if ( $title ) :
			echo '<h4 class="widget-title"><span class="ktz-blocktitle">';
			echo $title;
			echo '</span>';
			echo '</h4>';
		endif;
		$tags = get_tags();
		if (empty($tags))
			return;
		$counts = $tag_links = array();
		foreach ( (array) $tags as $tag ) {
			$counts[$tag->name] = $tag->count;
			$tag_links[$tag->name] = get_tag_link( $tag->term_id );
		}
		asort($counts);
		$counts = array_reverse( $counts, true );
		$i = 0;
		echo '<div class="ktz-tagcloud">';
			foreach ( $counts as $tag => $count ) {
			$i++;
			$tag_link = esc_url($tag_links[$tag]);
			if($i <= $number){
				echo '<a href="' . $tag_link . '" title="Tag '. $tag_link .'">#' . $tag . '</a> ';
				}
			}
		echo '</div>';
		echo $after_widget;
	}

	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		$instance['title'] = strip_tags($new_instance['title']);
		$instance['number'] = (int) $new_instance['number'];
		return $instance;
	}

	function form( $instance ) {
		$instance = wp_parse_args( (array) $instance, array( 'title' => '') );
		$title = esc_attr( $instance['title'] );
		if ( !isset($instance['number']) || !$number = (int) $instance['number'] )
			$number = 5; ?>
		<p><label for="<?php echo $this->get_field_id('title','ktz_theme_textdomain' ); ?>"><?php _e( 'Title:','ktz_theme_textdomain' ); ?></label>
		<input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo $title; ?>" />
		</p>
		<p><label for="<?php echo $this->get_field_id('number','ktz_theme_textdomain' ); ?>"><?php _e( 'Number of posts to show:','ktz_theme_textdomain' ); ?></label>
		<input id="<?php echo $this->get_field_id('number'); ?>" name="<?php echo $this->get_field_name('number'); ?>" type="text" value="<?php echo $number; ?>" size="3" /><br />
		<small><?php _e( '(at most 15)','ktz_theme_textdomain' ); ?></small>
        </p>
	<?php }
}