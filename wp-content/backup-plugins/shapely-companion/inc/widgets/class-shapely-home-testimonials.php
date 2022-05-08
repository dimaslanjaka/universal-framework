<?php

/**
 * Homepage parallax section Widget
 * Shapely Theme
 */
class Shapely_Home_Testimonials extends WP_Widget {

	private $defaults = array();

	function __construct() {

		$widget_ops = array(
			'classname'                   => 'shapely_home_testimonial',
			'description'                 => esc_html__( 'Shapely Testimonial Widget Section', 'shapely-companion' ),
			'customize_selective_refresh' => true,
		);
		parent::__construct( 'shapely_home_testimonial', esc_html__( '[Shapely] Testimonial Section For FrontPage', 'shapely-companion' ), $widget_ops );

		$this->defaults = array(
			'title'     => esc_html__( 'People just like you are already loving Colorlib', 'shapely-companion' ),
			'limit'     => 5,
			'image_src' => '',
		);
	}

	/**
	 * @param array $args
	 * @param array $instance
	 */
	function widget( $args, $instance ) {

		$instance = wp_parse_args( $instance, $this->defaults );

		$title     = $instance['title'];
		$limit     = $instance['limit'];
		$image_src = $instance['image_src'];

		echo $args['before_widget'];

		/**
		 * Widget Content
		 */
		?>

		<?php
		$testimonial_args = array(
			'post_type'           => 'jetpack-testimonial',
			'posts_per_page'      => $limit,
			'ignore_sticky_posts' => 1,
		);

		$testimonial_query = new WP_Query( $testimonial_args );

		if ( $testimonial_query->have_posts() ) :
			?>
			<section class="parallax-section testimonial-section">
				<div class="parallax-window" data-parallax="scroll" data-image-src="<?php echo esc_url( $image_src ); ?>" style="height: 500px;">
					<div class="container align-transform">
						<div class="parallax-text image-bg testimonial">
							<div class="row">
								<div class="col-sm-12 text-center">
									<h3><?php echo wp_kses_post( $title ); ?></h3>
								</div>
							</div>
							<!--end of row-->
							<div class="row">
								<div class="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">
									<div class="text-slider slider-arrow-controls text-center relative">
										<ul class="slides" style="overflow: hidden;">
											<?php
											while ( $testimonial_query->have_posts() ) :
												$testimonial_query->the_post();
												?>
												<?php if ( get_the_title() != '' ) : ?>
												<li>
													<p><?php the_content(); ?></p>
													<div class="testimonial-author-section">
														<?php
														the_post_thumbnail( 'thumbnail', array( 'class' => 'testimonial-img' ) );
														?>

														<div class="testimonial-author">
															<strong><?php echo esc_html( get_the_title() ); ?></strong>
														</div>
													</div>
												</li>
											<?php endif; ?>

											<?php endwhile; ?>
										</ul>
									</div>
								</div>
							</div>
							<!--end of row-->
						</div>
					</div>
					<!--end of container-->
				</div>
			</section>
		<?php
		endif;
		wp_reset_postdata();
		echo $args['after_widget'];

	}


	/**
	 * @param array $instance
	 *
	 * @return string|void
	 */
	function form( $instance ) {

		$instance = wp_parse_args( $instance, $this->defaults );

		$placeholder_url = plugins_url( 'shapely-companion/assets/img/placeholder-image.jpg' );

		?>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>">
				<?php esc_html_e( 'Title ', 'shapely-companion' ); ?>
			</label>
			<input type="text" value="<?php echo esc_attr( $instance['title'] ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" class="widefat"/>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'limit' ) ); ?>">
				<?php esc_html_e( 'Limit ', 'shapely-companion' ); ?>
			</label>
			<input type="text" value="<?php echo esc_attr( $instance['limit'] ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'limit' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'limit' ) ); ?>" class="widefat"/>
		</p>

		<p class="shapely-media-control" data-delegate-container="<?php echo esc_attr( $this->get_field_id( 'image_src' ) ); ?>">

			<label for="<?php echo esc_attr( $this->get_field_id( 'image_src' ) ); ?>">
				<?php echo esc_html__( 'Background Parallax Image:', 'shapely-companion' ); ?>
			</label>

			<img data-default="<?php echo $placeholder_url; ?>" src="<?php echo '' != $instance['image_src'] ? esc_url( $instance['image_src'] ) : $placeholder_url; ?>"/>

			<input type="hidden" name="<?php echo esc_attr( $this->get_field_name( 'image_src' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'image_src' ) ); ?>" value="<?php echo esc_url( $instance['image_src'] ); ?>" class="image-id blazersix-media-control-target">

			<button class="button upload-button"><?php echo esc_html__( 'Choose Image', 'shapely-companion' ); ?></button>
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
		$instance              = array();
		$instance['title']     = ( ! empty( $new_instance['title'] ) ) ? wp_kses_post( $new_instance['title'] ) : '';
		$instance['limit']     = ( ! empty( $new_instance['limit'] ) && is_numeric( $new_instance['limit'] ) ) ? absint( $new_instance['limit'] ) : '';
		$instance['image_src'] = ( ! empty( $new_instance['image_src'] ) ) ? esc_url_raw( $new_instance['image_src'] ) : '';

		return $instance;
	}
}
