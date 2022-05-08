<?php class AMPFORWP_Button_Widget extends WP_Widget {

	/*--------------------------------------------------*/
	/* Constructor
	/*--------------------------------------------------*/

	/**
	 * Specifies the classname and description, instantiates the widget,
	 * loads localization files, and includes necessary stylesheets and JavaScript.
	 */
	public function __construct() {

		// Hooks fired when the Widget is activated and deactivated
		register_activation_hook( __FILE__, array( $this, 'activate' ) );
		register_deactivation_hook( __FILE__, array( $this, 'deactivate' ) );

		parent::__construct(
			'ampforwp-button',
			__( 'AMP Button Module', 'accelerated-mobile-pages' ),
			array( 
				'classname'		=>	'ampforwp-button', 
				'description'	=>	__( 'Displays Button with text and link options.', 'accelerated-mobile-pages' )
			)
		);

		add_action( 'admin_enqueue_scripts', array( $this, 'register_admin_scripts' ) );

		// Add static written Jquery
		add_action( 'admin_footer', array( $this, 'footer_scritps') );


	} // end constructor

	/*--------------------------------------------------*/
	/* Widget API Functions
	/*--------------------------------------------------*/

	/**
	 * Outputs the content of the widget.
	 *
	 * @param	array	args		The array of form elements
	 * @param	array	instance	The current instance of the widget
	 */
	public function widget( $args, $instance ) {
		$target = "";
        $output = "";

		extract( $args, EXTR_SKIP );

		$title = ( ! empty( $instance['title'] ) ) ? $instance['title'] : __( 'Classes' );
		$title = apply_filters( 'widget_title', $title, $instance, $this->id_base );

		$features = ( ! empty( $instance['features'] ) ) ? $instance['features'] : array();


		
		echo $before_widget;
        $output .= '<div class="amp-wp-content amp_cb_module amp_cb_btn">';
        
		foreach( $features as $feature ) {
            
            if ( $feature['radio'] == 'radio-off'){
                $target = "_self";
            } elseif( $feature['radio'] == 'radio-on' ){ 
                $target = "_blank";
            }
            
            if ( $feature['size'] == '1'){
                $size = "s_btn";
            } elseif( $feature['size'] == '2' ){
                $size = "m_btn";
            } elseif( $feature['size'] == '3' ){
                $size = "l_btn";
            }
            //Corrected the URL in button module and breaking of desing and link issue #951 & #972
            $output .= '<a href="'.esc_url($feature['url']).'" class="' . $size . '" target="' . $target . '" >'. $feature['title'] .'</a>';
		}
        $output .= '</div>';
        
		$sanitizer = new AMPFORWP_Content( $output, array(), 
			apply_filters( 'ampforwp_content_sanitizers',array( 'AMP_Img_Sanitizer' => array(),'AMP_Style_Sanitizer' => array() ) ) );
		$sanitized_output 		= $sanitizer->get_amp_content();

		if( $sanitized_output ) {  
			echo $sanitized_output;
		} 

		echo $after_widget;

	} // end widget

	/**
	 * Processes the widget's options to be saved.
	 *
	 * @param	array	new_instance	The new instance of values to be generated via the update.
	 * @param	array	old_instance	The previous instance of values before the update.
	 */
	public function update( $new_instance, $old_instance ) {

		$instance = $old_instance;
		
		$instance['title'] = strip_tags($new_instance['title']);

		foreach($new_instance['features'] as $feature){
			$feature['title'] = strip_tags($feature['title']);
			$feature['description'] = strip_tags($feature['description']);
			$feature['image'] = strip_tags($feature['image']);
		}
		$instance['features'] = $new_instance['features'];

		return $instance;

	} // end widget

	/**
	 * Generates the administration form for the widget.
	 *
	 * @param	array	instance	The array of keys and values for the widget.
	 */
	public function form( $instance ) {

		$instance = wp_parse_args(
			(array) $instance
		); 

		$title = isset( $instance['title'] ) ? esc_attr( $instance['title'] ) : ''; ?>
		<p> </p>


		<?php

		$features = ( ! empty( $instance['features'] ) ) ? $instance['features'] : array(); ?>
		<span class="ampforwp-button-additional"> <?php
		    $c = 0; ?>
		
			<?php
		
		    if ( count( $features ) > 0 ) {
		        foreach( $features as $feature ) {
		            if ( isset( $feature['title'] ) || isset( $feature['description'] ) ) { ?>
		            <div class="widget">
		            	<div class="widget-top"><div class="widget-title"><h3><?php echo $feature['title'];?><span class="in-widget-title"></span></h3></div>
		            	</div>

			            <div class="widget-inside">
			            <div class="widget-content">
							<p>
								<label for="<?php echo $this->get_field_name( 'features' ) . '['.$c.'][title]'; ?>"><?php _e( 'Button Text:' ); ?></label>
                                <input class="widefat" id="<?php echo $this->get_field_id( 'features' ) .'-'. $c.'-title'; ?>" name="<?php echo $this->get_field_name( 'features' ) . '['.$c.'][title]'; ?>" type="text" value="<?php echo $feature['title']; ?>" /> </p>

                            <p><label for="<?php echo $this->get_field_name( 'features' ) . '['.$c.'][url]'; ?>"><?php _e( 'Url:' ); ?></label>
								<input class="widefat" id="<?php echo $this->get_field_id( 'features' ) .'-'. $c.'-url'; ?>" name="<?php echo $this->get_field_name( 'features' ) . '['.$c.'][url]'; ?>" type="text" value="<?php echo $feature['url']; ?>" />
							</p>


							<p><label><?php _e('URL Target:'); ?> </label><br />
                        <label class="radio_label" for="<?php echo $this->get_field_id('id') . "-on"; ?>"><?php _e('New Tab'); ?> </label> 
                            <input class="widefat" id="<?php echo $this->get_field_id('id') . "-on";  ?>" name="<?php echo $this->get_field_name( 'features' ) . '['.$c.'][radio]'; ?>" type="radio" value="radio-on"  <?php if ( $feature['radio'] == 'radio-on'): ?> checked <?php endif ?> />						
 
                        <label class="radio_label" for="<?php echo $this->get_field_id('id') . "-off"; ?>"> <?php _e('Current'); ?> </label>	 						

								<input class="widefat" id="<?php echo $this->get_field_id('id') . "-off";  ?>" name="<?php echo $this->get_field_name( 'features' ) . '['.$c.'][radio]'; ?>" type="radio" value="radio-off"  <?php if ( $feature['radio'] ==  'radio-off' || $feature['radio'] ==  ''): ?> checked <?php endif ?> /> 
							</p>
<!-- done -->	
							<p>
								<label for="<?php echo $this->get_field_id('id') . "-size"; ?>"> <?php _e('Select Size:'); ?> </label>
								<select id="<?php echo $this->get_field_id('id') . "-size"; ?>" class="widefat"  name="<?php echo $this->get_field_name( 'features' ) . '['.$c.'][size]'; ?>">
								    <option value="1" <?php selected( $feature['size'], 1 ); ?>>Small</option>
								    <option value="2" <?php selected( $feature['size'], 2 ); ?>>Medium</option>
								    <option value="3" <?php selected( $feature['size'], 3 ); ?>>Large</option>
								</select>
							</p>		

							<p>	<a class="ampforwp-button-remove delete button left"><?php _e('Remove Feature','accelerated-mobile-pages')?></a> </p>
						</div>
						</div>
					</div>
					<?php
		                $c = $c +1;
		            }
		        }
		    }  ?>
		</span>

	<a class="ampforwp-button-add button left">  <?php _e('Add Feature','accelerated-mobile-pages'); ?> </a>
<p>	</p>
		<?php 

	} // end form

	/*--------------------------------------------------*/
	/* Public Functions
	/*--------------------------------------------------*/

	/**
	 * Fired when the plugin is activated.
	 *
	 * @param		boolean	$network_wide	True if WPMU superadmin uses "Network Activate" action, false if WPMU is disabled or plugin is activated on an individual blog.
	 */
	public function activate( $network_wide ) {

	} // end activate

	/**
	 * Fired when the plugin is deactivated.
	 *
	 * @param	boolean	$network_wide	True if WPMU superadmin uses "Network Activate" action, false if WPMU is disabled or plugin is activated on an individual blog
	 */
	public function deactivate( $network_wide ) {

	} // end deactivate

	/**
	 * Registers and enqueues admin-specific styles.
	 */
	public function register_admin_styles() {

	} // end register_admin_styles

	/**
	 * Registers and enqueues admin-specific JavaScript.
	 */
	public function register_admin_scripts() {

		wp_enqueue_script( 'ampforwp-builder-script',  plugins_url('/modules/js/amp.js' , dirname(__FILE__) ) , array( 'jquery' ), false, true );

	} // end register_admin_scripts

	public function footer_scritps() { ?>
<style>.radio_label{}</style>
<?php }

	/**
	 * Registers and enqueues widget-specific styles.
	 */
	public function register_widget_styles() {

	} // end register_widget_styles

	/**
	 * Registers and enqueues widget-specific scripts.
	 */
	public function register_widget_scripts() {

	} // end register_widget_scripts

} // end class


add_action( 'widgets_init', function(){
	register_widget( 'AMPFORWP_Button_Widget' );
});