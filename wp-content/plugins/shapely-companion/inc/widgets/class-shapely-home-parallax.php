<?php

/**
 * Homepage parallax section Widget
 * Shapely Theme
 */
class Shapely_Home_Parallax extends WP_Widget {

	private $defaults = array();

	function __construct() {
		add_action( 'admin_init', array( $this, 'enqueue' ) );
		add_action( 'customize_controls_enqueue_scripts', array( $this, 'enqueue' ) );
		add_action( 'customize_preview_init', array( $this, 'enqueue' ) );

		$widget_ops = array(
			'classname'                   => 'shapely_home_parallax',
			'description'                 => esc_html__( 'Shapely FrontPage Parallax Section', 'shapely-companion' ),
			'customize_selective_refresh' => true,
		);
		parent::__construct( 'shapely_home_parallax', esc_html__( '[Shapely] Parallax Section For FrontPage', 'shapely-companion' ), $widget_ops );

		$this->defaults = array(
			'title'         => '',
			'image_src'     => '',
			'image_pos'     => esc_html__( 'left', 'shapely-companion' ),
			'body_content'  => '',
			'button1'       => '',
			'button2'       => '',
			'button1_link'  => '',
			'button2_link'  => '',
			'border_bottom' => '',
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
		$allowed_tags           = wp_kses_allowed_html( 'post' );
		$allowed_tags['iframe'] = array(
			'width'           => array(),
			'height'          => array(),
			'src'             => array(),
			'frameborder'     => array(),
			'allowfullscreen' => array(),
		);

		$instance = wp_parse_args( $instance, $this->defaults );

		echo $args['before_widget'];

		/* Classes */
		$class1 = ( 'background-full' == $instance['image_pos'] ) ? 'cover fullscreen image-bg' : ( ( 'background-small' == $instance['image_pos'] ) ? 'small-screen image-bg p0' : ( ( 'right' == $instance['image_pos'] ) ? 'bg-secondary' : ( ( 'bottom' == $instance['image_pos'] ) ? 'bg-secondary pb0' : '' ) ) );
		$class2 = ( ( 'background-full' == $instance['image_pos'] ) || ( 'background-small' == $instance['image_pos'] ) ) ? 'top-parallax-section' : ( ( 'right' == $instance['image_pos'] ) ? 'col-md-4 col-sm-5 mb-xs-24' : ( ( 'left' == $instance['image_pos'] ) ? 'col-md-4 col-md-offset-1 col-sm-5 col-sm-offset-1' : ( ( 'bottom' == $instance['image_pos'] ) ? 'col-sm-10 col-sm-offset-1 text-center' : ( ( 'top' == $instance['image_pos'] ) ? 'col-sm-10 col-sm-offset-1 text-center mt30' : '' ) ) ) );
		$class3 = ( ( 'background-full' == $instance['image_pos'] ) || ( 'background-small' == $instance['image_pos'] ) ) ? 'col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 text-center' : '';
		$class4 = ( 'left' == $instance['image_pos'] || 'right' == $instance['image_pos'] ) ? 'row align-children' : 'row';
		$class5 = ( 'right' == $instance['image_pos'] ) ? 'col-md-7 col-md-offset-1 col-sm-6 col-sm-offset-1 text-center' : '';
		$class6 = ( 'left' == $instance['image_pos'] ) ? 'col-md-7 col-sm-6 text-center mb-xs-24' : '';
		$class7 = ( 'background-full' == $instance['image_pos'] ) ? 'fullscreen' : '';

		if ( 'on' == $instance['border_bottom'] ) {
			$class1 .= ' border-bottom';
		}
		/**
		 * Widget Content
		 */
		?>
		<section class="<?php echo esc_attr( $class1 ); ?>">
			<?php
			if ( ( 'background-full' == $instance['image_pos'] || 'background-small' == $instance['image_pos'] ) && '' != $instance['image_src'] ) {
			?>
			<div class="parallax-window <?php echo esc_attr( $class7 ); ?>" data-parallax="scroll" data-image-src="<?php echo esc_url( $instance['image_src'] ); ?>" data-ios-fix="true" data-over-scroll-fix="true" data-android-fix="true">
				<div class="<?php echo ( 'background-full' == $instance['image_pos'] ) ? 'align-transform' : ''; ?>">
					<?php } else { ?>
					<div class="container">
						<?php } ?>

						<div class="<?php echo esc_attr( $class4 ); ?>">

							<?php
							if ( ( 'left' == $instance['image_pos'] || 'top' == $instance['image_pos'] ) && '' != $instance['image_src'] ) {
								?>
								<div class="<?php echo esc_attr( $class6 ); ?>">
									<img class="img-responsive" alt="<?php echo esc_attr( $instance['title'] ); ?>" src="<?php echo esc_url( $instance['image_src'] ); ?>">
								</div>
								<?php
							}
							?>

							<div class="<?php echo esc_attr( $class2 ); ?>">
								<div class="<?php echo esc_attr( $class3 ); ?>">
									<?php
									echo ( '' != $instance['title'] ) ? ( ( 'background-full' == $instance['image_pos'] ) || ( 'background-small' == $instance['image_pos'] ) ) ? '<h1>' . wp_kses_post( $instance['title'] ) . '</h1>' : '<h3>' . wp_kses_post( $instance['title'] ) . '</h3>' : '';
									if ( '' != $instance['body_content'] ) {
										echo '<div class="mb32">';
										echo apply_filters( 'the_content', wp_kses( $instance['body_content'], $allowed_tags ) );
										echo '</div>';
									}
									echo ( '' != $instance['button1'] && '' != $instance['button1_link'] ) ? '<a class="btn btn-lg btn-filled" href="' . esc_url( $instance['button1_link'] ) . '">' . wp_kses_post( $instance['button1'] ) . '</a>' : '';
									echo ( '' != $instance['button2'] && '' != $instance['button2_link'] ) ? '<a class="btn btn-lg btn-white" href="' . esc_url( $instance['button2_link'] ) . '">' . wp_kses_post( $instance['button2'] ) . '</a>' : '';
									?>
								</div>
							</div>
							<!--end of row-->
							<?php
							if ( ( 'right' == $instance['image_pos'] || 'bottom' == $instance['image_pos'] ) && '' != $instance['image_src'] ) {
								?>
								<div class="<?php echo esc_attr( $class5 ); ?>">
									<img class="img-responsive" alt="<?php echo esc_attr( $instance['title'] ); ?>" src="<?php echo esc_url( $instance['image_src'] ); ?>">
								</div>
								<?php
							}
							?>
						</div>
					</div>
					<?php if ( 'background-full' == $instance['image_pos'] || 'background-small' == $instance['image_pos'] ) { ?>
				</div>
				<?php } ?>
		</section>
		<div class="clearfix"></div>
		<?php

		echo $args['after_widget'];
	}


	/**
	 * @param array $instance
	 *
	 * @return string|void
	 */
	function form( $instance ) {
		$allowed_tags           = wp_kses_allowed_html( 'post' );
		$allowed_tags['iframe'] = array(
			'width'           => array(),
			'height'          => array(),
			'src'             => array(),
			'frameborder'     => array(),
			'allowfullscreen' => array(),
		);

		$instance = wp_parse_args( $instance, $this->defaults );

		$placeholder_url = plugins_url( 'shapely-companion/assets/img/placeholder-image.jpg' );

		?>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>">
				<?php echo esc_html__( 'Title ', 'shapely-companion' ); ?>
			</label>

			<input type="text" value="<?php echo esc_attr( $instance['title'] ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" class="widefat" />
		</p>

		<p class="shapely-media-control" data-delegate-container="<?php echo esc_attr( $this->get_field_id( 'image_src' ) ); ?>">
			<label
				for="<?php echo esc_attr( $this->get_field_id( 'image_src' ) ); ?>">
				<?php
				echo esc_html__( 'Image', 'shapely-companion' );
				?>
				:</label>

			<img data-default="<?php echo $placeholder_url; ?>" src="<?php echo '' != $instance['image_src'] ? esc_url( $instance['image_src'] ) : $placeholder_url; ?>" />

			<input type="hidden" name="<?php echo esc_attr( $this->get_field_name( 'image_src' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'image_src' ) ); ?>" value="<?php echo esc_url( $instance['image_src'] ); ?>" class="image-id blazersix-media-control-target">

			<button type="button" class="button upload-button"><?php echo esc_html__( 'Choose Image', 'shapely-companion' ); ?></button>
			<button type="button" class="button remove-button"><?php echo esc_html__( 'Remove Image', 'shapely-companion' ); ?></button>
		</p>

		<p class="shapely-editor-container">
			<label for="<?php echo esc_attr( $this->get_field_id( 'body_content' ) ); ?>">
				<?php echo esc_html__( 'Content ', 'shapely-companion' ); ?>
			</label>

			<textarea name="<?php echo esc_attr( $this->get_field_name( 'body_content' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'body_content' ) ); ?>" class="widefat">
				<?php echo wp_kses( nl2br( $instance['body_content'] ), $allowed_tags ); ?>
			</textarea>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'image_pos' ) ); ?>">
				<?php echo esc_html__( 'Image Position ', 'shapely-companion' ); ?>
			</label>

			<select name="<?php echo esc_attr( $this->get_field_name( 'image_pos' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'image_pos' ) ); ?>" class="widefat">
				<option value="left" <?php selected( $instance['image_pos'], 'left' ); ?>><?php echo esc_html__( 'Left', 'shapely-companion' ); ?></option>
				<option value="right" <?php selected( $instance['image_pos'], 'right' ); ?>><?php echo esc_html__( 'Right', 'shapely-companion' ); ?></option>
				<option value="top" <?php selected( $instance['image_pos'], 'top' ); ?>><?php echo esc_html__( 'Top', 'shapely-companion' ); ?></option>
				<option value="bottom" <?php selected( $instance['image_pos'], 'bottom' ); ?>><?php echo esc_html__( 'Bottom', 'shapely-companion' ); ?></option>
				<option value="background-full" <?php selected( $instance['image_pos'], 'background-full' ); ?>><?php echo esc_html__( 'Background Full', 'shapely-companion' ); ?></option>
				<option value="background-small" <?php selected( $instance['image_pos'], 'background-small' ); ?>><?php echo esc_html__( 'Background Small', 'shapely-companion' ); ?></option>
			</select>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'button1' ) ); ?>">
				<?php echo esc_html__( 'Button 1 Text ', 'shapely-companion' ); ?>
			</label>

			<input type="text" value="<?php echo esc_attr( $instance['button1'] ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'button1' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'button1' ) ); ?>" class="widefat" />
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'button1_link' ) ); ?>">
				<?php echo esc_html__( 'Button 1 Link ', 'shapely-companion' ); ?>
			</label>

			<input type="text" value="<?php echo esc_url( $instance['button1_link'] ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'button1_link' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'button1_link' ) ); ?>" class="widefat" />
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'button2' ) ); ?>">
				<?php echo esc_html__( 'Button 2 Text ', 'shapely-companion' ); ?>
			</label>

			<input type="text" value="<?php echo esc_attr( $instance['button2'] ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'button2' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'button2' ) ); ?>" class="widefat" />
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'button2_link' ) ); ?>">
				<?php echo esc_html__( 'Button 2 Link ', 'shapely-companion' ); ?>
			</label>

			<input type="text" value="<?php echo esc_url( $instance['button2_link'] ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'button2_link' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'button2_link' ) ); ?>" class="widefat" />
		</p>

		<div class="checkbox_switch wp-clearfix">
				<span class="customize-control-title onoffswitch_label">
					<?php echo esc_html__( 'Border bottom', 'shapely-companion' ); ?>
				</span>
			<div class="onoffswitch">
				<input type="checkbox" id="<?php echo esc_attr( $this->get_field_name( 'border_bottom' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'border_bottom' ) ); ?>" class="onoffswitch-checkbox" value="on"
					<?php checked( $instance['border_bottom'], 'on' ); ?>>
				<label class="onoffswitch-label" for="<?php echo esc_attr( $this->get_field_name( 'border_bottom' ) ); ?>"></label>
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
		$instance                  = array();
		$allowed_tags              = wp_kses_allowed_html( 'post' );
		$allowed_tags['iframe']    = array(
			'width'           => array(),
			'height'          => array(),
			'src'             => array(),
			'frameborder'     => array(),
			'allowfullscreen' => array(),
		);
		$instance['title']         = ( ! empty( $new_instance['title'] ) ) ? wp_kses_post( $new_instance['title'] ) : '';
		$instance['image_src']     = ( ! empty( $new_instance['image_src'] ) ) ? esc_url_raw( $new_instance['image_src'] ) : '';
		$instance['image_pos']     = ( ! empty( $new_instance['image_pos'] ) ) ? esc_html( $new_instance['image_pos'] ) : '';
		$instance['body_content']  = ( ! empty( $new_instance['body_content'] ) ) ? wp_kses( $new_instance['body_content'], $allowed_tags ) : '';
		$instance['button1']       = ( ! empty( $new_instance['button1'] ) ) ? esc_html( $new_instance['button1'] ) : '';
		$instance['button2']       = ( ! empty( $new_instance['button2'] ) ) ? esc_html( $new_instance['button2'] ) : '';
		$instance['button1_link']  = ( ! empty( $new_instance['button1_link'] ) ) ? esc_url_raw( $new_instance['button1_link'] ) : '';
		$instance['button2_link']  = ( ! empty( $new_instance['button2_link'] ) ) ? esc_url_raw( $new_instance['button2_link'] ) : '';
		$instance['border_bottom'] = ( ! empty( $new_instance['border_bottom'] ) ) ? esc_html( $new_instance['border_bottom'] ) : '';

		return $instance;
	}
}
