<?php

/**
 * Shapely Top Posts Widget
 * Shapely Theme
 */
class Shapely_Recent_Posts extends WP_Widget {

	private $defaults = array();

	function __construct() {

		$widget_ops = array(
			'classname'                   => 'shapely-recent-posts text-center',
			'description'                 => esc_html__( 'Widget to show recent posts with thumbnails', 'shapely-companion' ),
			'customize_selective_refresh' => true,
		);
		parent::__construct( 'shapely_recent_posts', esc_html__( '[Shapely] Recent Posts', 'shapely-companion' ), $widget_ops );

		$this->defaults = array(
			'title'   => esc_html__( 'Recent Posts', 'shapely-companion' ),
			'limit'   => 5,
			'excerpt' => 0,
		);
	}

	/**
	 * @param array $args
	 * @param array $instance
	 */
	function widget( $args, $instance ) {

		$instance = wp_parse_args( $instance, $this->defaults );

		echo $args['before_widget'];
		?>
		<section>
			<?php
			echo $args['before_title'];
			echo '<h3 class="mb32">' . wp_kses_post( $instance['title'] ) . '</h3>';
			echo $args['after_title'];

			/**
			 * Widget Content
			 */
			?>

			<!-- recent posts -->
			<div class="recent-posts-wrapper nolist">

				<?php
				$featured_args = array(
					'posts_per_page'      => $instance['limit'],
					'post_type'           => 'post',
					'ignore_sticky_posts' => 1,
				);

				$featured_query      = new WP_Query( $featured_args );
				$bootstrap_col_width = floor( 12 / $featured_query->post_count );
				if ( $featured_query->have_posts() ) :
					?>

					<ul class="link-list recent-posts">
						<?php

						while ( $featured_query->have_posts() ) :
							$featured_query->the_post();
							?>

							<?php if ( get_the_content() != '' ) : ?>

							<!-- content -->
							<li class="post-content col-sm-<?php echo esc_attr( $bootstrap_col_width ); ?>">
								<a class="widget-post-thumbnail" href="<?php echo esc_url( get_permalink() ); ?>">
									<?php
									if ( has_post_thumbnail() ) {
										the_post_thumbnail();
									}
									?>
								</a>
								<h4 class="widget-post-title">
									<a href="<?php echo esc_url( get_permalink() ); ?>">
										<?php echo esc_html( get_the_title() ); ?>
									</a>
								</h4>
								<span class="date"><?php echo esc_html( get_the_date( 'd M , Y' ) ); ?></span>

								<?php if ( $instance['excerpt'] ) : ?>
									<div class="widget-post-excerpt"><?php the_excerpt(); ?></div>
								<?php endif ?>

							</li>							<!-- end content -->

						<?php endif; ?>

						<?php endwhile; ?>
					</ul>
				<?php

				endif;
				wp_reset_query();
				?>

			</div> <!-- end posts wrapper -->
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

		$instance = wp_parse_args( $instance, $this->defaults );

		?>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>">
				<?php echo esc_html__( 'Title', 'shapely-companion' ); ?>
			</label>
			<input type="text" value="<?php echo esc_attr( $instance['title'] ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" class="widefat"/>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'excerpt' ) ); ?>">
				<?php echo esc_html__( 'Show Excerpt', 'shapely-companion' ); ?>
			</label>
			<input type="checkbox" value="1" name="<?php echo esc_attr( $this->get_field_name( 'excerpt' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'excerpt' ) ); ?>" <?php checked( 1, $instance['excerpt'] ); ?> class="widefat"/>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'limit' ) ); ?>">
				<?php echo esc_html__( 'Limit Posts Number', 'shapely-companion' ); ?>
			</label>
			<input type="text" value="<?php echo esc_attr( $instance['limit'] ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'limit' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'limit' ) ); ?>" class="widefat"/>
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
		$instance            = array();
		$instance['title']   = ( ! empty( $new_instance['title'] ) ) ? wp_kses_post( $new_instance['title'] ) : '';
		$instance['limit']   = ( ! empty( $new_instance['limit'] ) && is_numeric( $new_instance['limit'] ) ) ? absint( $new_instance['limit'] ) : '';
		$instance['excerpt'] = empty( $new_instance['excerpt'] ) ? 0 : 1;

		return $instance;
	}

}
