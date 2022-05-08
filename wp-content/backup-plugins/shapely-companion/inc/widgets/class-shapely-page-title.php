<?php

/**
 * Page Title Widget
 * shapely Theme
 */
class Shapely_Page_Title extends WP_Widget {

	function __construct() {

		$widget_ops = array(
			'classname'                   => 'shapely-page-title',
			'description'                 => esc_html__( 'This widget is used only in pages with Template Widget', 'shapely-companion' ),
			'customize_selective_refresh' => true,
		);
		parent::__construct( 'shapely-page-title', esc_html__( '[Shapely] Page Title', 'shapely-companion' ), $widget_ops );
	}

	function widget( $args, $instance ) {

		if ( ! function_exists( 'shapely_top_callout' ) ) {
			echo __( 'This widget works only with Shapely theme. Please install and activate it first.', 'shapely-companion' );
		}
		echo $args['before_widget'];

		?>

		<div class="header-callout">
			<?php shapely_top_callout(); ?>
		</div>

		<?php

		echo $args['after_widget'];
	}


	function form( $instance ) {
	}

	public function update( $new_instance, $old_instance ) {

		$instance = $new_instance;

		return $instance;
	}

}
