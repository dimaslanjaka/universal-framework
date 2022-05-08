<?php

/**
 * Homepage parallax section Widget
 * Shapely Theme
 */
class Shapely_Home_Portfolio extends WP_Widget {

	private $defaults = array();

	function __construct() {

		$widget_ops = array(
			'classname'                   => 'shapely_home_portfolio',
			'description'                 => esc_html__( 'Shapely Porfolio for Home Widget Section', 'shapely-companion' ),
			'customize_selective_refresh' => true,
		);
		parent::__construct( 'shapely_home_portfolio', esc_html__( '[Shapely] Porfolio for Home Widget Section', 'shapely-companion' ), $widget_ops );

		$this->defaults = array(
			'title'           => '',
			'body_content'    => '',
			'fullwidth'       => '1',
			'mansonry'        => '1',
			'backgroundcolor' => '#0e1015',
			'textcolor'       => '#ffffff',
			'postsnumber'     => 10,
			'category'        => 0,
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
		<section class="projects pb0" style="background-color:<?php echo esc_attr( $instance['backgroundcolor'] ); ?>">
			<div class="container">
				<div class="col-sm-12 text-center">
					<h3 class="mb32" style="color:<?php echo esc_attr( $instance['textcolor'] ); ?>"><?php echo wp_kses_post( nl2br( $instance['title'] ) ); ?></h3>
					<p class="mb40" style="color:<?php echo esc_attr( $instance['textcolor'] ); ?>"><?php echo wp_kses_post( nl2br( $instance['body_content'] ) ); ?></p>
				</div>
			</div>
			<?php

			$portfolio_args = array(
				'post_type'           => 'jetpack-portfolio',
				'posts_per_page'      => absint( $instance['postsnumber'] ),
				'ignore_sticky_posts' => 1,
			);

			if ( 0 != $instance['category'] ) {
				$portfolio_args['tax_query'] = array(
					array(
						'taxonomy' => 'jetpack-portfolio-type',
						'field'    => 'term_id',
						'terms'    => absint( $instance['category'] ),
					),
				);
			}

			$portfolio_query = new WP_Query( $portfolio_args );

			if ( $portfolio_query->have_posts() ) :
				?>

				<div class="row masonry-loader fixed-center fadeOut">
					<div class="col-sm-12 text-center">
						<div class="spinner"></div>
					</div>
				</div>
				<?php if ( '1' != $instance['fullwidth'] ) : ?>
				<div class="container">
			<?php endif ?>
				<div class="row fadeIn<?php echo $instance['mansonry'] ? ' masonry masonryFlyIn' : ''; ?>">
					<?php

					while ( $portfolio_query->have_posts() ) :
						$portfolio_query->the_post();

						if ( has_post_thumbnail() ) {

							$permalink     = get_the_permalink();
							$thumbnail_url = get_the_post_thumbnail_url( get_the_ID(), 'full' );
							$item_style    = '';
							if ( ! $instance['mansonry'] ) {
								$item_style = 'background-image: url(' . esc_url( $thumbnail_url ) . ')';
							}

							$url = get_post_meta( get_the_ID(), 'shapely_companion_portfolio_link', true );
							if ( $url ) {
								$permalink = $url;
							}

							$args_projects = array(
								'fields' => 'names',
							);
							$project_types = wp_get_post_terms( get_the_ID(), 'jetpack-portfolio-type', $args_projects );

							?>
							<div class="col-md-3 col-sm-6 project fadeIn<?php echo $instance['mansonry'] ? ' masonry-item' : ''; ?>">
								<div class="image-tile inner-title hover-reveal text-center" style="<?php echo esc_attr( $item_style ); ?>">
									<a href="<?php echo esc_url( $permalink ); ?>" title="<?php the_title_attribute(); ?>">
										<?php
										if ( $instance['mansonry'] ) {
											the_post_thumbnail( 'full' );
										}
										?>
										<div class="title">
											<?php
											the_title( '<h5 class="mb0">', '</h5>' );
											if ( ! empty( $project_types ) ) {
												echo '<span>' . implode( ' / ', $project_types ) . '</span>';
											}
											?>
										</div>
									</a>
								</div>
							</div>
							<?php
						}
					endwhile;
					?>
				</div>
				<?php if ( '1' != $instance['fullwidth'] ) : ?>
				</div>
			<?php endif ?>
						<?php
			endif;
			wp_reset_postdata();
			?>
		</section>

		<?php

		echo $args['after_widget'];
	}


	/**
	 * @param array $instance
	 *
	 * @return string|void
	 */
	function form( $instance ) {
		$instance   = wp_parse_args( $instance, $this->defaults );
		$categories = get_terms(
			array(
				'taxonomy' => 'jetpack-portfolio-type',
				'fields'   => 'id=>name',
			)
		);
		?>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php echo esc_html__( 'Title ', 'shapely-companion' ); ?></label>
			<input type="text" value="<?php echo esc_attr( $instance['title'] ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" class="widefat"/>
		</p>

		<p class="shapely-editor-container">
			<label for="<?php echo esc_attr( $this->get_field_id( 'body_content' ) ); ?>"><?php echo esc_html__( 'Content ', 'shapely-companion' ); ?></label>
			<textarea name="<?php echo esc_attr( $this->get_field_name( 'body_content' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'body_content' ) ); ?>" class="widefat">
				<?php echo wp_kses_post( nl2br( $instance['body_content'] ) ); ?>
			</textarea>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'category' ) ); ?>"><?php echo esc_html__( 'Portfolio Types ', 'shapely-companion' ); ?></label>
			<select name="<?php echo esc_attr( $this->get_field_name( 'category' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'category' ) ); ?>" class="widefat">
				<option value="0"><?php echo esc_html__( 'All Types ', 'shapely-companion' ); ?></option>
				<?php

				foreach ( $categories as $id => $category ) {
					echo '<option value="' . $id . '" ' . selected( $instance['category'], $id ) . '>' . $category . '</option>';
				}

				?>
			</select>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'postsnumber' ) ); ?>"><?php echo esc_html__( 'Number of Projects ', 'shapely-companion' ); ?></label>
			<input id="<?php echo esc_attr( $this->get_field_id( 'postsnumber' ) ); ?>" type="text" value="<?php echo esc_attr( $instance['postsnumber'] ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'postsnumber' ) ); ?>" class="widefat"/>
		</p>

		<div class="checkbox_switch wp-clearfix">
				<span class="customize-control-title onoffswitch_label">
					<?php echo esc_html__( 'Full Width Container', 'shapely-companion' ); ?>
				</span>
			<div class="onoffswitch">
				<input type="checkbox" id="<?php echo esc_attr( $this->get_field_name( 'fullwidth' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'fullwidth' ) ); ?>" class="onoffswitch-checkbox" value="1"
					<?php checked( $instance['fullwidth'], '1' ); ?>>
				<label class="onoffswitch-label" for="<?php echo esc_attr( $this->get_field_name( 'fullwidth' ) ); ?>"></label>
			</div>
		</div>

		<div class="checkbox_switch wp-clearfix">
				<span class="customize-control-title onoffswitch_label">
					<?php echo esc_html__( 'Mansonry Layout', 'shapely-companion' ); ?>
				</span>
			<div class="onoffswitch">
				<input type="checkbox" id="<?php echo esc_attr( $this->get_field_name( 'mansonry' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'mansonry' ) ); ?>" class="onoffswitch-checkbox" value="1"
					<?php checked( $instance['mansonry'], '1' ); ?>>
				<label class="onoffswitch-label" for="<?php echo esc_attr( $this->get_field_name( 'mansonry' ) ); ?>"></label>
			</div>
		</div>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'backgroundcolor' ) ); ?>"><?php echo esc_html__( 'Background Color ', 'shapely-companion' ); ?></label><br>
			<input type="text" value="<?php echo esc_attr( $instance['backgroundcolor'] ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'backgroundcolor' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'backgroundcolor' ) ); ?>" class="widefat shapely-color-picker"/>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'textcolor' ) ); ?>"><?php echo esc_html__( 'Text Color ', 'shapely-companion' ); ?></label><br>
			<input type="text" value="<?php echo esc_attr( $instance['textcolor'] ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'textcolor' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'textcolor' ) ); ?>" class="widefat shapely-color-picker"/>
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
		$instance                    = array();
		$instance['title']           = ( ! empty( $new_instance['title'] ) ) ? wp_kses_post( $new_instance['title'] ) : '';
		$instance['postsnumber']     = ( ! empty( $new_instance['postsnumber'] ) ) ? absint( $new_instance['postsnumber'] ) : '10';
		$instance['body_content']    = ( ! empty( $new_instance['body_content'] ) ) ? wp_kses_post( $new_instance['body_content'] ) : '';
		$instance['fullwidth']       = ( ! empty( $new_instance['fullwidth'] ) ) ? absint( $new_instance['fullwidth'] ) : 0;
		$instance['mansonry']        = ( ! empty( $new_instance['mansonry'] ) ) ? absint( $new_instance['mansonry'] ) : 0;
		$instance['category']        = ( ! empty( $new_instance['category'] ) ) ? absint( $new_instance['category'] ) : 0;
		$instance['backgroundcolor'] = ( ! empty( $new_instance['backgroundcolor'] ) ) ? sanitize_hex_color( $new_instance['backgroundcolor'] ) : '#0e1015';
		$instance['textcolor']       = ( ! empty( $new_instance['textcolor'] ) ) ? sanitize_hex_color( $new_instance['textcolor'] ) : '#ffffff';

		return $instance;
	}

}
