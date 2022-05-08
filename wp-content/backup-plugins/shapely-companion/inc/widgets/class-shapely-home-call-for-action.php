<?php

/**
 * Homepage Call for Action section Widget
 * Shapely Theme
 */
class Shapely_Home_Call_For_Action extends WP_Widget {

	private $defaults = array();

	function __construct() {

		$widget_ops = array(
			'classname'                   => 'shapely_home_CFA',
			'description'                 => esc_html__( '[Shapely] Call for Action Section', 'shapely-companion' ),
			'customize_selective_refresh' => true,
		);
		parent::__construct( 'shapely_home_CFA', esc_html__( '[Shapely] Call for Action Section For FrontPage', 'shapely-companion' ), $widget_ops );

		$this->defaults = array(
			'title'       => '',
			'button'      => '',
			'button_link' => '',
		);
	}

	/**
	 * @param array $args
	 * @param array $instance
	 */
	function widget( $args, $instance ) {

		$instance = wp_parse_args( $instance, $this->defaults );

		echo $args['before_widget'];

		/**
		 * Widget Content
		 */
		?>
		<?php if ( '' != $instance['title'] ) : ?>
			<section class="cfa-section bg-secondary">
				<div class="container">
					<div class="row">
						<div class="col-sm-12 text-center p0">
							<div class="overflow-hidden">
								<div class="col-sm-9">
									<h3 class="cfa-text"><?php echo wp_kses_post( $instance['title'] ); ?></h3>
								</div>
								<div class="col-sm-3">
									<a href="<?php echo esc_url_raw( $instance['button_link'] ); ?>" class="mb0 btn btn-lg btn-filled cfa-button"><?php echo esc_html( $instance['button'] ); ?></a>
								</div>
							</div>
						</div>
					</div>
					<!--end of row-->
				</div>
				<!--end of container-->
			</section>
		<?php
		endif;

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

		<p class="shapely-editor-container">
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>">
				<?php echo esc_html__( 'Callout Text ', 'shapely-companion' ); ?>
			</label>
			<textarea
				name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>"
				id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"
				class="widefat">
			<?php echo wp_kses_post( nl2br( $instance['title'] ) ); ?>
			</textarea>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'button' ) ); ?>">
				<?php echo esc_html__( 'Button Text ', 'shapely-companion' ); ?>
			</label>
			<input type="text" value="<?php echo esc_attr( $instance['button'] ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'button' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'button' ) ); ?>" class="widefat" />
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'button_link' ) ); ?>">
				<?php echo esc_html__( 'Button Link ', 'shapely-companion' ); ?>
			</label>
			<input type="text" value="<?php echo esc_url( $instance['button_link'] ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'button_link' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'button_link' ) ); ?>" class="widefat" />
		</p>
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
		$instance                = array();
		$instance['title']       = ( ! empty( $new_instance['title'] ) ) ? wp_kses_post( $new_instance['title'] ) : '';
		$instance['button']      = ( ! empty( $new_instance['button'] ) ) ? esc_html( $new_instance['button'] ) : '';
		$instance['button_link'] = ( ! empty( $new_instance['button_link'] ) ) ? esc_url_raw( $new_instance['button_link'] ) : '';

		return $instance;
	}
}
