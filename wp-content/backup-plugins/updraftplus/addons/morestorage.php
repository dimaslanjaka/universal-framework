<?php
// @codingStandardsIgnoreStart
/*
UpdraftPlus Addon: morestorage:Multiple storage options
Description: Provides the ability to back up to multiple remote storage facilities, not just one
Version: 1.3
Shop: /shop/morestorage/
Latest Change: 1.11.28
*/
// @codingStandardsIgnoreEnd

if (!defined('UPDRAFTPLUS_DIR')) die('No direct access allowed');

$updraftplus_addon_morestorage = new UpdraftPlus_Addon_MoreStorage;

class UpdraftPlus_Addon_MoreStorage {

	public function __construct() {
		add_filter('updraftplus_storage_printoptions', array($this, 'storage_printoptions'), 10, 2);
		add_filter('updraftplus_storage_printoptions_multi', array($this, 'storage_printoptions_multi'), 10, 1);
		// add_action('updraftplus_config_print_after_storage', array($this, 'config_print_after_storage'));
		add_action('updraftplus_config_print_before_storage', array($this, 'config_print_before_storage'), 10, 2);
		add_filter('updraftplus_savestorage', array($this, 'savestorage'), 10, 2);
		add_action('updraftplus_after_remote_storage_heading_message', array($this, 'after_remote_storage_heading_message'));
	}

	public function after_remote_storage_heading_message($message) {
		return '<em>'.__('(as many as you like)', 'updraftplus').'</em>';
	}

	public function admin_print_footer_scripts() {
		?>
		<script>
		jQuery(document).ready(function() {
			
			jQuery('.remote-tab').click(function(event) {
				//Close other tabs and open the clicked one
				event.preventDefault();
				var the_method = jQuery(this).attr('name');
				updraft_remote_storage_tab_activation(the_method);
			});
			
		});
		
		</script>
		<?php
	}

	public function config_print_before_storage($storage, $storage_object = null) {
		global $updraftplus;
		?><tr class="<?php echo is_object($storage_object) ? $storage_object->get_css_classes() : "updraftplusmethod $storage";?>">
			<th><h3><?php echo $updraftplus->backup_methods[$storage]; ?></h3></th>
			<td></td>
		</tr><?php
	}

	public function savestorage($rinput, $input) {
		return $input;
	}

	public function storage_printoptions_multi($ret) {
		return 'multi';
	}
	
	public function storage_printoptions($ret, $active_service) {
		global $updraftplus;
		add_action('admin_print_footer_scripts', array($this, 'admin_print_footer_scripts'));

		?>
		</div></td></tr>
		<tr>
			<th colspan="2"><h2 class="updraft_settings_sectionheading"><?php _e('Remote Storage Options', 'updraftplus');?></h2>
		</tr>
		<tr id="remote_storage_tabs" style="border-bottom: 1px solid #ccc">
			<td colspan="2" style="padding:0px">
	<?php
		foreach ($updraftplus->backup_methods as $method => $description) {
		echo "<a class=\"nav-tab remote-tab updraft-hidden remote-tab-$method\" id=\"remote-tab-$method\" name=\"$method\" href=\"#\" ";
		// if ((!is_array($active_service) && $active_service !== $method) || !(is_array($active_service) && in_array($method, $active_service))) echo 'style="display:none;"';
		echo 'style="display:none;"';
		echo ">".htmlspecialchars($description)."</a>";
		}
	?>
			</td>
		</tr>
		
		<?php
		return true;

	}
}
