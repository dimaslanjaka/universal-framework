<?php

/**
 * [Shapely] Categories Widget
 * shapely Theme
 */
class Shapely_Categories extends WP_Widget {


	private $defaults = array();

	function __construct() {
		add_action( 'admin_init', array( $this, 'enqueue' ) );
		add_action( 'customize_controls_enqueue_scripts', array( $this, 'enqueue' ) );
		add_action( 'customize_preview_init', array( $this, 'enqueue' ) );

		$widget_ops = array(
			'classname'                   => 'shapely-cats',
			'description'                 => esc_html__( 'Shapely Categories', 'shapely-companion' ),
			'customize_selective_refresh' => true,
		);
		parent::__construct( 'shapely-cats', esc_html__( '[Shapely] Categories', 'shapely-companion' ), $widget_ops );

		$this->defaults = array(
			'title'        => esc_html__( 'Categories', 'shapely-companion' ),
			'enable_count' => '',
			'limit'        => 4,
		);
	}

	public function enqueue() {
		if ( is_admin() && ! is_customize_preview() ) {
			wp_enqueue_style( 'epsilon-styles', get_template_directory_uri() . '/inc/libraries/epsilon-framework/assets/css/style.css' );
		}
	}

	/**
	 * @param array $args
	 * @param array $instance
	 */
	function widget( $args, $instance ) {

		$instance = wp_parse_args( $instance, $this->defaults );

		echo $args['before_widget'];
		echo $args['before_title'];
		echo esc_html( $instance['title'] );
		echo $args['after_title'];

		/**
		 * Widget Content
		 */
		?>
		<div class="cats-widget nolist">

			<ul class="category-list">
				<?php

				$categories_args = array(
					'echo'       => 0,
					'show_count' => (int) $instance['limit'],
					'title_li'   => '',
					'depth'      => 1,
					'orderby'    => 'count',
					'order'      => 'DESC',
					'number'     => $instance['limit'],
				);

				$variable = wp_list_categories( $categories_args );

				if ( 'on' == $instance['enable_count'] ) {
					$variable = str_replace( '(', '<span>', $variable );
					$variable = str_replace( ')', '</span>', $variable );
				} else {
					$pattern  = '/\([0-9]+\)/';
					$variable = preg_replace( $pattern, '', $variable );
				}

				echo $variable;
				?>
			</ul>

		</div><!-- end widget content -->

		<?php

		echo $args['after_widget'];
	}


	/**
	 * @param array $instance
	 *
	 * @return string|void
	 */
	function form( $instance ) {

		$instance = wp_parse_args( $instance, $this->defaults );

		?>

		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>">
				<?php echo esc_html__( 'Title ', 'shapely-companion' ); ?>
			</label>
			<input type="text" value="<?php echo esc_attr( $instance['title'] ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" class="widefat"/>
		</p>

		<p>
			<label for="<?php echo $this->get_field_id( 'limit' ); ?>">
				<?php echo esc_html__( 'Limit Categories ', 'shapely-companion' ); ?>
			</label>
			<input type="text" value="<?php echo esc_attr( $instance['limit'] ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'limit' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'limit' ) ); ?>" class="widefat"/>
		</p>

		<div class="checkbox_switch wp-clearfix">
				<span class="customize-control-title onoffswitch_label">
		<?php _e( 'Enable Posts Count', 'shapely-companion' ); ?>
				</span>
			<div class="onoffswitch">
				<input type="checkbox" id="<?php echo esc_attr( $this->get_field_name( 'enable_count' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'enable_count' ) ); ?>" class="onoffswitch-checkbox" value="on"
					<?php checked( $instance['enable_count'], 'on' ); ?>>
				<label class="onoffswitch-label" for="<?php echo esc_attr( $this->get_field_name( 'enable_count' ) ); ?>"></label>
			</div>
		</div>

		<?php
	}

	/**
	 * Sanitize widget form values as they are saved.
	 *
	 * @see WP_Widget::update()
	 *
	 * @param array $new_instance Values just sent to be saved.
	 * @param array $old_instance Previously saved values from database.
	 *
	 * @return array Updated safe values to be saved.
	 */
	public function update( $new_instance, $old_instance ) {
		$instance                 = array();
		$instance['title']        = ( ! empty( $new_instance['title'] ) ) ? esc_html( $new_instance['title'] ) : '';
		$instance['limit']        = ( ! empty( $new_instance['limit'] ) ) ? absint( $new_instance['limit'] ) : '';
		$instance['enable_count'] = ( ! empty( $new_instance['enable_count'] ) ) ? esc_html( $new_instance['enable_count'] ) : '';

		return $instance;
	}
}
