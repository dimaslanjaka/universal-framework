<?php

/**
 * Homepage parallax section Widget
 * Shapely Theme
 */
class Shapely_Home_Contact extends WP_Widget {

	private $defaults = array();

	function __construct() {
		add_action( 'admin_init', array( $this, 'enqueue' ) );
		add_action( 'customize_controls_enqueue_scripts', array( $this, 'enqueue' ) );
		add_action( 'customize_preview_init', array( $this, 'enqueue' ) );

		$widget_ops = array(
			'classname'                   => 'shapely_home_contact',
			'description'                 => esc_html__( 'Shapely FrontPage Contact Section', 'shapely-companion' ),
			'customize_selective_refresh' => true,
		);
		parent::__construct( 'shapely_home_contact', esc_html__( '[Shapely] Contact Section For FrontPage', 'shapely-companion' ), $widget_ops );

		$this->defaults = array(
			'title'        => '',
			'body_content' => '',
			'image_src'    => '',
			'phone'        => '',
			'email'        => '',
			'address'      => '',
			'contactform'  => '',
			'socialicons'  => '',
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

		$title        = $instance['title'];
		$body_content = $instance['body_content'];
		$image_src    = $instance['image_src'];
		$phone        = $instance['phone'];
		$email        = $instance['email'];
		$address      = $instance['address'];
		$contactform  = $instance['contactform'];
		$socialicons  = $instance['socialicons'];

		$atts  = '';
		$class = '';
		if ( '' != $image_src ) {
			$atts  = 'data-parallax="scroll" data-image-src="' . esc_url( $image_src ) . '" class="parallax-window"';
			$class = ' image-bg cover';
		}

		echo $args['before_widget'];
		/**
		 * Widget Content
		 */
		?>

		<section class="contact-section<?php echo $class; ?>">
			<div <?php echo $atts; ?>>
				<div class="container">
					<div class="text-center">
						<?php

						if ( '' != $title ) {
							echo '<h1>' . wp_kses_post( $title ) . '</h1>';
						}

						if ( '' != $body_content ) {
							echo '<p class="mb64">' . wp_kses_post( nl2br( $body_content ) ) . '</p>';
						}

						?>
					</div>
					<div class="row">
						<div class="col-md-4">
							<?php

							if ( '' != $phone ) {
								echo '<p class="mb0"><strong>' . __( 'Phone :', 'shapely-companion' ) . '</strong></p>';
								echo '<p class="mb32"><a href="tel:' . esc_attr( $phone ) . '">' . esc_html( $phone ) . '</a></p>';
							}

							if ( '' != $email ) {
								echo '<p class="mb0"><strong>' . __( 'Email :', 'shapely-companion' ) . '</strong></p>';
								echo '<p class="mb32"><a href="mailto:' . esc_attr( $email ) . '">' . esc_html( antispambot( $email ) ) . '</a></p>';
							}

							if ( '' != $address ) {
								echo '<p class="mb0"><strong>' . __( 'Address :', 'shapely-companion' ) . '</strong></p>';
								echo '<p class="mb32">' . wp_kses_post( nl2br( $address ) ) . '</p>';
							}

							if ( 'on' == $socialicons ) {
								echo '<div class="social-icons sticky-sidebar-social">';
								shapely_social_icons();
								echo '</div>';
							}

							?>
						</div>
						<div class="col-md-8">
							<?php

							if ( '' != $contactform ) {
								echo do_shortcode( '[contact-form-7 id="' . absint( $contactform ) . '"]' );
							}

							?>
						</div>
					</div>
				</div>
			</div>
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

		parent::form( $instance );

		$instance        = wp_parse_args( $instance, $this->defaults );
		$placeholder_url = plugins_url( 'shapely-companion/assets/img/placeholder-image.jpg' );

		?>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php echo esc_html__( 'Title ', 'shapely-companion' ); ?></label>
			<input type="text" value="<?php echo esc_attr( $instance['title'] ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" class="widefat" />
		</p>

		<p class="shapely-editor-container">
			<label for="<?php echo esc_attr( $this->get_field_id( 'body_content' ) ); ?>">
				<?php echo esc_html__( 'Subtitle ', 'shapely-companion' ); ?>
			</label>
			<textarea name="<?php echo esc_attr( $this->get_field_name( 'body_content' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'body_content' ) ); ?>" class="widefat">
				<?php echo wp_kses_post( $instance['body_content'] ); ?>
			</textarea>
		</p>

		<p class="shapely-media-control" data-delegate-container="<?php echo esc_attr( $this->get_field_id( 'image_src' ) ); ?>">
			<label for="<?php echo esc_attr( $this->get_field_id( 'image_src' ) ); ?>"><?php echo esc_html__( 'Background image', 'shapely-companion' ); ?>:</label>

			<img data-default="<?php echo esc_url_raw( $placeholder_url ); ?>" src="<?php echo '' != $instance['image_src'] ? esc_url_raw( $instance['image_src'] ) : esc_url_raw( $placeholder_url ); ?>" />

			<input type="hidden" name="<?php echo esc_attr( $this->get_field_name( 'image_src' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'image_src' ) ); ?>" value="<?php echo esc_url( $instance['image_src'] ); ?>" class="image-id blazersix-media-control-target">

			<button class="button upload-button"><?php echo esc_html__( 'Choose Image', 'shapely-companion' ); ?></button>
			<button class="button remove-button"><?php echo esc_html__( 'Remove Image', 'shapely-companion' ); ?></button>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'contactform' ) ); ?>">
				<?php echo esc_html__( 'Contact Form ', 'shapely-companion' ); ?>
			</label>
			<?php

			if ( ! defined( 'WPCF7_LOAD_JS' ) ) {
				echo '<br><span>' . esc_html__( 'Please install Contact Form 7 plugin', 'shapely-companion' ) . '</span>';
				echo '<input type="hidden" id="' . esc_attr( $this->get_field_name( 'contactform' ) ) . '" name="' . esc_attr( $this->get_field_name( 'contactform' ) ) . '" value="0">';
			} else {
				echo '<select id="' . esc_attr( $this->get_field_name( 'contactform' ) ) . '" name="' . esc_attr( $this->get_field_name( 'contactform' ) ) . '" class="widefat">';
				echo '<option value="0">' . esc_html__( 'Select a form ...', 'shapely-companion' ) . '</option>';
				$forms_args = array(
					'post_type'      => 'wpcf7_contact_form',
					'post_status'    => 'publish',
					'posts_per_page' => - 1,
				);

				$forms = get_posts( $forms_args );
				foreach ( $forms as $form ) {
					echo '<option value="' . esc_attr( $form->ID ) . '" ' . selected( $form->ID, $instance['contactform'], false ) . '>' . esc_html( $form->post_title ) . '</option>';
				}

				echo '</select>';
			}

			?>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'phone' ) ); ?>">
				<?php echo esc_html__( 'Phone number ', 'shapely-companion' ); ?>
			</label>
			<input type="text" value="<?php echo esc_attr( $instance['phone'] ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'phone' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'phone' ) ); ?>" class="widefat" />
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'email' ) ); ?>">
				<?php echo esc_html__( 'Email ', 'shapely-companion' ); ?>
			</label>
			<input type="text" value="<?php echo esc_attr( $instance['email'] ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'email' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'email' ) ); ?>" class="widefat" />
		</p>

		<p class="shapely-editor-container">
			<label for="<?php echo esc_attr( $this->get_field_id( 'address' ) ); ?>">
				<?php echo esc_html__( 'Address ', 'shapely-companion' ); ?>
			</label>

			<textarea
				name="<?php echo esc_attr( $this->get_field_name( 'address' ) ); ?>"
				id="<?php echo esc_attr( $this->get_field_id( 'address' ) ); ?>">
				<?php echo wp_kses_post( $instance['address'] ); ?>
			</textarea>
		</p>
		<div class="checkbox_switch wp-clearfix">
				<span class="customize-control-title onoffswitch_label">
					<?php echo esc_html__( 'Show social icons', 'shapely-companion' ); ?>
				</span>
			<div class="onoffswitch">
				<input type="checkbox" id="<?php echo esc_attr( $this->get_field_name( 'socialicons' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'socialicons' ) ); ?>" class="onoffswitch-checkbox" value="on"
					<?php checked( $instance['socialicons'], 'on' ); ?>>
				<label class="onoffswitch-label" for="<?php echo esc_attr( $this->get_field_name( 'socialicons' ) ); ?>"></label>
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
		$instance['title']        = ( ! empty( $new_instance['title'] ) ) ? wp_kses_post( $new_instance['title'] ) : '';
		$instance['image_src']    = ( ! empty( $new_instance['image_src'] ) ) ? esc_url_raw( $new_instance['image_src'] ) : '';
		$instance['body_content'] = ( ! empty( $new_instance['body_content'] ) ) ? wp_kses_post( $new_instance['body_content'] ) : '';
		$instance['phone']        = ( ! empty( $new_instance['phone'] ) ) ? esc_html( $new_instance['phone'] ) : '';
		$instance['address']      = ( ! empty( $new_instance['address'] ) ) ? wp_kses_post( $new_instance['address'] ) : '';
		$instance['email']        = ( ! empty( $new_instance['email'] ) ) ? esc_html( $new_instance['email'] ) : '';
		$instance['contactform']  = ( ! empty( $new_instance['contactform'] ) ) ? absint( $new_instance['contactform'] ) : '';
		$instance['socialicons']  = ( ! empty( $new_instance['socialicons'] ) ) ? esc_html( $new_instance['socialicons'] ) : '';

		return $instance;
	}
}
