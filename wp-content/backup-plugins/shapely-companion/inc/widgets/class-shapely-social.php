<?php

/**
 * Social  Widget
 * shapely Theme
 */
class Shapely_Social extends WP_Widget {

	private $defaults;

	function __construct() {
		$widget_ops = array(
			'classname'                   => 'widget-shapely-social',
			'description'                 => esc_html__( 'Shapely Social Widget', 'shapely-companion' ),
			'customize_selective_refresh' => true,
		);
		parent::__construct( 'shapely-social', esc_html__( '[Shapely] Social Widget', 'shapely-companion' ), $widget_ops );

		$this->defaults = array(
			'title' => esc_html__( 'Follow us', 'shapely-companion' ),
		);
	}

	function widget( $args, $instance ) {

		$defaults = array(
			'title'    => __( 'We are social', 'shapely-companion' ),
			'nav_menu' => 0,
			'alignment' => 'text-center',
		);
		$instance = wp_parse_args( (array) $instance, $defaults );

		$title = apply_filters( 'widget_title', $instance['title'] );

		echo $args['before_widget'];
		echo '<section class="shapely-social-links ' . $instance['alignment'] . '">';
		if ( '' != $title ) {
			echo '<h3 class="cfa-text">' . esc_html( $title ) . '</h3>';
		}
		
		wp_nav_menu(
			array(
				'menu'            => absint($instance['nav_menu']),
				'container'       => 'nav',
				'container_id'    => 'social',
				'container_class' => 'social-icons',
				'menu_id'         => 'menu-social-items',
				'menu_class'      => 'list-inline social-list',
				'depth'           => 1,
				'fallback_cb'     => '',
				'link_before'     => '<i class="social_icon fa"><span>',
				'link_after'      => '</span></i>',
			)
		);
		echo '</section>';

		echo $args['after_widget'];
	}


	function update( $new_instance, $old_instance ) {
		$instance              = $old_instance;
		$instance['title']     = sanitize_text_field( $new_instance['title'] );
		$instance['nav_menu']  = absint( $new_instance['nav_menu'] );
		$instance['alignment'] = sanitize_text_field( $new_instance['alignment'] );

		return $instance;
	}

	function form( $instance ) {

		$defaults = array(
			'title'    => __( 'We are social', 'shapely-companion' ),
			'nav_menu' => 0,
			'alignment' => 'text-center',
		);
		$menus = wp_get_nav_menus();
		$instance = wp_parse_args( (array) $instance, $defaults );

		?>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php esc_html_e( 'Title', 'shapely-companion' ); ?></label>
			<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" type="text" value="<?php echo esc_attr( $instance['title'] ); ?>" />
		</p>

		<p>
			<label for="<?php echo $this->get_field_id( 'nav_menu' ); ?>"><?php _e( 'Select Menu:', 'shapely-companion' ); ?></label>
			<select id="<?php echo $this->get_field_id( 'nav_menu' ); ?>" name="<?php echo $this->get_field_name( 'nav_menu' ); ?>">
				<option value="0"><?php _e( '&mdash; Select &mdash;', 'shapely-companion' ); ?></option>
				<?php foreach ( $menus as $menu ) : ?>
					<option value="<?php echo esc_attr( $menu->term_id ); ?>" <?php selected( $instance['nav_menu'], $menu->term_id ); ?>>
						<?php echo esc_html( $menu->name ); ?>
					</option>
				<?php endforeach; ?>
			</select>
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'alignment' ); ?>"><?php _e( 'Alignment:', 'shapely-companion' ); ?></label>
			<select id="<?php echo $this->get_field_id( 'alignment' ); ?>" name="<?php echo $this->get_field_name( 'alignment' ); ?>">
				<option value="text-left" <?php selected( $instance['alignment'], 'text-left' ); ?>>
					<?php esc_html_e( 'Left', 'shapely-companion' ); ?>
				</option>
				<option value="text-center" <?php selected( $instance['alignment'], 'text-center' ); ?>>
					<?php esc_html_e( 'Center', 'shapely-companion' ); ?>
				</option>
				<option value="text-right" <?php selected( $instance['alignment'], 'text-right' ); ?>>
					<?php esc_html_e( 'Right', 'shapely-companion' ); ?>
				</option>
			</select>
		</p>

		<?php
	}

}
