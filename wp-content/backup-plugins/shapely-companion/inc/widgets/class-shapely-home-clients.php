<?php

/**
 * Homepage parallax section Widget
 * Shapely Theme
 */
class Shapely_Home_Clients extends WP_Widget {

	private $defaults = array();

	function __construct() {

		$widget_ops = array(
			'classname'                   => 'shapely_home_clients',
			'description'                 => esc_html__( 'Shapely Client Section That Displays Logos In A Slider', 'shapely-companion' ),
			'customize_selective_refresh' => true,
		);
		parent::__construct( 'shapely_home_clients', esc_html__( '[Shapely] Client Section For FrontPage', 'shapely-companion' ), $widget_ops );

		$this->defaults = array(
			'title'       => __( 'Our Main Clients', 'shapely-companion' ),
			'client_logo' => array(
				'link' => array(),
				'img'  => array(),
			),
		);
	}

	/**
	 * @param array $args
	 * @param array $instance
	 */
	function widget( $args, $instance ) {

		$instance = wp_parse_args( $instance, $this->defaults );

		echo $args['before_widget'];

		if ( gettype( $instance['client_logo'] ) == 'object' ) {
			$instance['client_logo'] = get_object_vars( $instance['client_logo'] );
		}

		/**
		 * Widget Content
		 */
		?>
		<?php if ( isset( $instance['client_logo']['img'] ) && count( $instance['client_logo']['img'] ) > 0 ) { ?>
			<section>
				<div class="container">
					<div class="row">
						<div class="col-sm-12 text-center">
							<h3 class="mb64 mb-xs-40"><?php echo wp_kses_post( $instance['title'] ); ?></h3>
						</div>
					</div>
					<!--end of row-->
					<div class="row">
						<div class="logo-carousel">
							<ul class="slides">
								<?php
								for ( $i = 0; $i < count( $instance['client_logo']['img'] ); $i ++ ) {
									if ( '' != $instance['client_logo']['img'] && '' != $instance['client_logo']['link'] ) {
										?>
										<li>
											<a href="<?php echo esc_url_raw( $instance['client_logo']['link'][ $i ] ); ?>">
												<img alt="<?php _e( 'Logos', 'shapely-companion' ); ?>" src="<?php echo esc_url_raw( $instance['client_logo']['img'][ $i ] ); ?>" />
											</a>
										</li>
										<?php
									}
								}
								?>
							</ul>
						</div>
						<!--end of logo slider-->
					</div>
					<!--end of row-->
				</div>
				<!--end of container-->
			</section>
		<?php } ?>

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

		if ( gettype( $instance['client_logo'] ) == 'object' ) {
			$instance['client_logo'] = get_object_vars( $instance['client_logo'] );
		}

		?>

		<p><label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>">
				<?php echo esc_html__( 'Title ', 'shapely-companion' ); ?>
			</label>
			<input type="text" value="<?php echo esc_attr( $instance['title'] ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" class="widefat" />
		</p>

		<ul class="client-sortable clone-wrapper">
			<?php

			$slider_count    = ( isset( $instance['client_logo']['img'] ) && count( $instance['client_logo']['img'] ) > 0 ) ? count( $instance['client_logo']['img'] ) : 3;
			$placeholder_url = plugins_url( 'shapely-companion/assets/img/placeholder_wide.jpg' );

			for ( $i = 0; $i < $slider_count; $i ++ ) :
				?>
				<li class="toclone">
					<br>
					<p class="shapely-media-control" data-delegate-container="<?php echo esc_attr( $this->get_field_id( 'client_logo' ) . '-' . absint( $i ) ); ?>">
						<label
							class="logo_heading"
							for="<?php echo esc_attr( $this->get_field_id( 'client_logo' ) . '-' . absint( $i ) ); ?>">
							<?php
							_e( 'Logo #', 'shapely-companion' );
							?>
							<span class="count"><?php echo absint( $i ) + 1; ?></span>:</label>

						<img data-default="<?php echo esc_url_raw( $placeholder_url ); ?>" src="<?php echo ( isset( $instance['client_logo']['img'][ $i ] ) && '' != $instance['client_logo']['img'][ $i ] ) ? esc_url( $instance['client_logo']['img'][ $i ] ) : esc_url_raw( $placeholder_url ); ?>" />

						<input type="hidden" name="<?php echo esc_attr( $this->get_field_name( 'client_logo' ) . '[img][' . $i . ']' ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'client_logo' ) . '-' . (int) $i ); ?>" value="<?php echo ( isset( $instance['client_logo']['img'][ $i ] ) ) ? esc_url_raw( $instance['client_logo']['img'][ $i ] ) : ''; ?>" class="image-id blazersix-media-control-target">

						<button class="button upload-button"><?php _e( 'Choose Image', 'shapely-companion' ); ?></button>
					</p>

					<label for="link<?php echo esc_attr( '-' . absint( $i ) ); ?>">
						<?php _e( 'Link:', 'shapely-companion' ); ?>
					</label>
					<input name="<?php echo esc_attr( $this->get_field_name( 'client_logo' ) . '[link][' . $i . ']' ); ?>" id="link<?php echo esc_attr( '-' . absint( $i ) ); ?>" class="widefat client-link" type="text" size="36" value="<?php echo ( isset( $instance['client_logo']['link'][ $i ] ) ) ? esc_url_raw( $instance['client_logo']['link'][ $i ] ) : ''; ?>" /><br><br>

					<a href="#" class="clone button-primary"><?php _e( 'Add', 'shapely-companion' ); ?></a>
					<a href="#" class="delete button"><?php _e( 'Delete', 'shapely-companion' ); ?></a>
				</li>
			<?php endfor; ?>
		</ul>
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
		$instance          = array();
		$instance['title'] = ( ! empty( $new_instance['title'] ) ) ? wp_kses_post( $new_instance['title'] ) : '';

		if ( isset( $new_instance['client_logo']['img'] ) && count( $new_instance['client_logo']['img'] ) != 0 ) {
			for ( $i = 0; $i < count( $new_instance['client_logo']['img'] ); $i ++ ) {
				$instance['client_logo']['img'][ $i ] = ( ! empty( $new_instance['client_logo']['img'][ $i ] ) ) ? esc_url_raw( $new_instance['client_logo']['img'][ $i ] ) : '';
			}
		}
		if ( isset( $new_instance['client_logo']['link'] ) && count( $new_instance['client_logo']['link'] ) != 0 ) {
			for ( $i = 0; $i < count( $new_instance['client_logo']['link'] ); $i ++ ) {
				$instance['client_logo']['link'][ $i ] = ( ! empty( $new_instance['client_logo']['link'][ $i ] ) ) ? esc_url_raw( $new_instance['client_logo']['link'][ $i ] ) : '';
			}
		}

		return $instance;
	}

}
