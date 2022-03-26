<?php
// don't load directly
defined( 'ABSPATH' ) || die( '-1' );

if ( ! class_exists( 'HREFLangTags_Admin_Notices' ) ) {

    class HREFLangTags_Admin_Notices {

        private static $_instance;
        private $admin_notices;
        const TYPES = 'error,warning,info,success';

        private function __construct() {
            $this->admin_notices = new stdClass();
            foreach ( explode( ',', self::TYPES ) as $type ) {
                $this->admin_notices->{$type} = array();
            }
            add_action( 'admin_init', array( &$this, 'action_admin_init' ) );
            add_action( 'admin_notices', array( &$this, 'action_admin_notices' ) );
            add_action( 'admin_enqueue_scripts', array( &$this, 'action_admin_enqueue_scripts' ) );
        }

        public static function get_instance() {
            if ( ! ( self::$_instance instanceof self ) ) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function action_admin_init() {
            $dismiss_option = filter_input( INPUT_GET, 'hreflangtags_dismiss', FILTER_SANITIZE_STRING );
            if ( is_string( $dismiss_option ) ) {
                update_option( "hreflangtags_dismissed_$dismiss_option", true );
                wp_die();
            }
        }

        public function action_admin_enqueue_scripts() {
            wp_enqueue_script( 'jquery' );
            wp_enqueue_script('hreflangtags-notify', plugins_url( '../assets/js/scripts/hreflangtags-notify.js', __FILE__ ), array( 'jquery' ));
        }

        public function action_admin_notices() {
            foreach ( explode( ',', self::TYPES ) as $type ) {
                foreach ( $this->admin_notices->{$type} as $admin_notice ) {
                    $dismiss_url = add_query_arg( array('hreflangtags_dismiss' => $admin_notice->dismiss_option), admin_url() );
                    if ( ! get_option( "hreflangtags_dismissed_{$admin_notice->dismiss_option}" ) ) { ?>
                      <div class="notice hreflangtags-notice notice-<?php echo $type;
                      if ( $admin_notice->dismiss_option ) {
                          echo ' is-dismissible" data-dismiss-url="' . esc_url( $dismiss_url );
                      } ?>">
                        <h2><?php _e('HREFLANG Tags Information','hreflang-tags-by-dcgws'); ?></h2>
                        <p><?php echo $admin_notice->message; ?></p>
                      </div><?php
                    }
                }
            }
        }

        public function error( $message, $dismiss_option = false ) {
            $this->notice( 'error', $message, $dismiss_option );
        }

        public function warning( $message, $dismiss_option = false ) {
            $this->notice( 'warning', $message, $dismiss_option );
        }

        public function success( $message, $dismiss_option = false ) {
            $this->notice( 'success', $message, $dismiss_option );
        }

        public function info( $message, $dismiss_option = false ) {
            $this->notice( 'info', $message, $dismiss_option );
        }

        private function notice( $type, $message, $dismiss_option ) {
            $notice = new stdClass();
            $notice->message = $message;
            $notice->dismiss_option = $dismiss_option;

            $this->admin_notices->{$type}[] = $notice;
        }

	public static function error_handler( $errno, $errstr, $errfile, $errline, $errcontext ) {
		if ( ! ( error_reporting() & $errno ) ) {
			// This error code is not included in error_reporting
			return;
		}

		$message = "errstr: $errstr, errfile: $errfile, errline: $errline, PHP: " . PHP_VERSION . " OS: " . PHP_OS;

		$self = self::get_instance();

		switch ($errno) {
			case E_USER_ERROR:
				$self->error( $message );
				break;

			case E_USER_WARNING:
				$self->warning( $message );
				break;

			case E_USER_NOTICE:
			default:
				$self->notice( $message );
				break;
		}

		// write to wp-content/debug.log if logging enabled
		error_log( $message );

		// Don't execute PHP internal error handler
		return true;
	}
    }
}
