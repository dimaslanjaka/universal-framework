<?php
/**
 *
 *  @package HREFLANG Tags Pro\Includes\Functions
 *  @since 1.3.3
 *
 */

if ( ! function_exists( 'add_filter' ) ) {
	header( 'Status: 403 Forbidden' );
	header( 'HTTP/1.1 403 Forbidden' );
	exit();
}

if (!function_exists('hreflang_array_sort')) {
	function hreflang_array_sort($array, $on, $order=SORT_ASC){
	    $new_array = array();
	    $sortable_array = array();
	    if (is_array($array) && !empty($array)) {
	        foreach ($array as $k => $v) {
	            if (!empty($v) && is_array($v)) {
	                foreach ($v as $k2 => $v2) {
	                    if ($k2 == $on) {
	                        $sortable_array[$k] = $v2;
	                    }
	                }
	            } else {
	                $sortable_array[$k] = $v;
	            }
	        }
	        switch ($order) {
	            case SORT_ASC:
	                asort($sortable_array);
	                break;
	            case SORT_DESC:
	                arsort($sortable_array);
	                break;
	        }
					if (is_array($sortable_array) && !empty($sortable_array)) {
						foreach ($sortable_array as $k => $v) {
		            $new_array[$k] = $array[$k];
		        }
					}
	    }
	    return $new_array;
	}
}
if (!function_exists('hreflang_textdomain')) {
	function hreflang_textdomain() {
	   if (function_exists('load_plugin_textdomain')) {
			 load_plugin_textdomain('hreflang-tags-by-dcgws', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
	   }
	}
}
if (!function_exists('hreflang_menu')) {
	function hreflang_menu(){
		include_once(HREFLANG_PLUGIN_MAIN_PATH.'hreflang-main.php');
	}
}
if (!function_exists('hreflang_register_settings')) {
	function hreflang_register_settings() {
		register_setting( 'hreflang-settings-group', 'hreflang_post_types');
	}
}

if (!function_exists('hreflang_admin_bar')) {
	function hreflang_admin_bar() {
		global $wp_admin_bar;

		//Add a link called 'HREFLANG'...
		$wp_admin_bar->add_node(array(
			'id'    => 'hreflang',
			'title' => 'HREFLANG Tags',
			'href'  => admin_url( 'admin.php?page=HREFLANG', 'http' )
		));
	}
}
if (!function_exists('hreflang_plugin_settings_link')) {
	// Add settings link on plugin page
	function hreflang_plugin_settings_link($links) {
	  $links[] = '<a style="color: #ff6600; font-weight: bold" href="https://www.hreflangtags.com/downloads/hreflang-tags-pro-plugin-wordpress/#utm_source=plugin-page&utm_medium=link&utm_campaign=hreflang-tags-pro">Get HREFLANG Tags Premium</a>';
	  $links[] = '<a href="admin.php?page=HREFLANG&tab=hreflang_dashboard">Dashboard</a>';
	  return $links;
	}
}
if (!function_exists('hreflang_admin_actions')) {
	// plugin activation actions
	function hreflang_admin_actions() {
		global $hreflang_settings_page;
		if (current_user_can('manage_options')) {
			if (function_exists('add_meta_box')) {
				$hreflang_settings_page = add_menu_page("HREFLANG", "HREFLANG", "manage_options", "HREFLANG", "hreflang_menu", plugins_url('hreflang-tags-by-dcgws/hreflang.png'));
			} else {
				$hreflang_settings_page = add_submenu_page("index.php", "HREFLANG", "HREFLANG", "manage_options", "HREFLANG", "hreflang_menu", null);
			} // end if addmetabox
		}
	}
}
if (!function_exists('hreflang_enqueue')) {
	function hreflang_enqueue($hook) {
		if (is_admin() && is_user_logged_in())
	    wp_enqueue_script( 'hreflang_tags_js', plugin_dir_url( HREFLANG_PLUGIN_FILE ) . 'assets/js/hreflang-tags-by-dcgws.js',array('jquery') );
			wp_enqueue_style( 'hreflang_tags_styles', plugin_dir_url( HREFLANG_PLUGIN_FILE ) . 'assets/css/hreflang-tags-by-dcgws.css');
	}
}
if (!function_exists('add_hreflang_to_head')) {
	function add_hreflang_to_head() {
		global $post;
		if (is_category() || is_tax() || is_tag()) {
			$terms = get_queried_object();
			if ($terms) {
				$hreflang_data = get_term_meta($terms->term_id);
				$metatag = '<!-- / HREFLANG Tags by DCGWS Version '.HREFLANG_VERSION.' -->'."\n";
				if (is_array($hreflang_data) && !empty($hreflang_data)) {
					foreach($hreflang_data as $key=>$value) {
						if (stristr($key,'hreflang')) {
							$key_array = explode('-',$key);
							if (count($key_array) == 3) {
								$lang = 'x-default';
							}
							else {
								$lang = $key_array[1];
							}
							if ($lang == 'Select one') {
								continue;
							}
							$metatag .= '<link rel="alternate" href="'.$value[0].'" hreflang="'.str_replace('_','-', $lang).'" />'."\n";
						}
					}
					$metatag .= '<!-- / HREFLANG Tags by DCGWS -->'."\n";
					echo $metatag;
				}
			}
		}
		else {
			if ( in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {
				if (!is_home() && !is_author() && !is_tag() && !is_shop()) {
					if ($post) {
						$hreflang_data = get_post_meta($post->ID);
						$metatag = '<!-- / HREFLANG Tags by DCGWS Version '.HREFLANG_VERSION.' -->'."\n";
						if (is_array($hreflang_data) && !empty($hreflang_data)) {
							foreach($hreflang_data as $key=>$value) {
								if (stristr($key,'hreflang')) {
									$key_array = explode('-',$key);
									if (count($key_array) == 3) {
										$lang = 'x-default';
									}
									else {
										$lang = $key_array[1];
									}
									if ($lang == 'Select one') {
										continue;
									}
									$metatag .= '<link rel="alternate" href="'.$value[0].'" hreflang="'.str_replace('_','-', $lang).'" />'."\n";
								}
							}
							$metatag .= '<!-- / HREFLANG Tags by DCGWS -->'."\n";
							echo $metatag;
						}
					}
				}
			} else {
				if (!is_home() && !is_author() && !is_tag()) {
					if ($post) {
						$hreflang_data = get_post_meta($post->ID);
						$metatag = '<!-- / HREFLANG Tags by DCGWS Version '.HREFLANG_VERSION.' -->'."\n";
						if (is_array($hreflang_data) && !empty($hreflang_data)) {
							foreach($hreflang_data as $key=>$value) {
								if (stristr($key,'hreflang')) {
									$key_array = explode('-',$key);
									if (count($key_array) == 3) {
										$lang = 'x-default';
									}
									else {
										$lang = $key_array[1];
									}
									if ($lang == 'Select one') {
										continue;
									}
									$metatag .= '<link rel="alternate" href="'.$value[0].'" hreflang="'.str_replace('_','-', $lang).'" />'."\n";
								}
							}
							$metatag .= '<!-- / HREFLANG Tags by DCGWS -->'."\n";
							echo $metatag;
						}
					}
				}
			}
		}
	}
}
if (!function_exists('hreflang_save_meta_data')) {
	function hreflang_save_meta_data() {
		global $post;
		if (isset($_POST['hreflang-href']) && !empty($_POST['hreflang-href'])) {
			$i = 0;
			if ($post) {
				$hreflang_data = get_post_meta($post->ID);
				if (is_array($hreflang_data) && !empty($hreflang_data)) {
					foreach($hreflang_data as $key=>$value ) {
						if (stristr($key,'hreflang')) {
							$key_array = explode('-',$key);
							if (count($key_array) == 3) {
								$lang = 'x-default';
							}
							else {
								$lang = $key_array[1];
							}
							delete_post_meta($post->ID, 'hreflang-'.$lang);
						}
					}
				}
				if (is_array($_POST['hreflang-href']) && !empty($_POST['hreflang-href'])) {
					foreach($_POST['hreflang-href'] as $href) {
						if (trim($href) == '' || $href == 'Select one') {
							$i++;
							continue;
						}
						else {
							update_post_meta($post->ID,'hreflang-'.$_POST['hreflang-lang'][$i],$href);
							$i++;
						}
					}
				}
			}
		}
	}
}
if (!function_exists('hreflang_meta_box')) {
	function hreflang_meta_box() {
		global $post,$hreflanguages;
		$keys = array();
		wp_nonce_field('hreflang_pro_save_meta_data_action', 'hreflang_pro_nonce');
		if ($post) {
		echo '<style>';
		echo '.hreflang_pro-metabox-buy-pro {float:right;color:#ff6600;}';
		echo '.hreflang_pro-metabox-buy-pro a { text-decoration:none; }';
		echo 'span.hreflang_pro-buy-pro {color: #ff6600; text-decoration:none;}';

		echo '</style>';
		echo '<div class="hreflang_pro-metabox-buy-pro">
		      <a target="_blank" rel="noopener noreferrer" href="http://hreflangtags.com/downloads/hreflang-tags-pro-plugin-wordpress/" class="hreflang_pro-meta-section-link hreflang_pro-tooltip-hidden">
		      <span class="dashicons dashicons-star-filled hreflang_pro-buy-pro">
		      </span>Get HREFLANG Tags Premium</a>
		      </div>
		      <br style="clear:both"/>';
			$hreflang_pro_data = get_post_meta($post->ID);
			$metatag = '';
			echo '<div class="href-container">';
			if (is_array($hreflang_pro_data) && !empty($hreflang_pro_data)) {
				foreach($hreflang_pro_data as $key=>$value ) {
					if (stristr($key,'hreflang')) {
						$keys[] = $key;
						$values[] = $value;
					}
			  	}
		   	}
			if (empty($keys)) {
				echo '<div id="hreflang-1" class="href-lang">';
				echo '<label for="hreflang-href">'.__('Alternative URL','hreflang-tags-by-dcgws').'</label>';
		    	echo '<input name="hreflang-href[]" type="text" value="">';
			    echo '<label for="meta-box-dropdown">'.__('Language','hreflang-tags-by-dcgws').'</label>';
			    echo '<select name="hreflang-lang[]" id="hreflang-lang">';
		       	echo '<option>'.__('Select one','hreflang-tags-by-dcgws').'</option>';
						if (is_array($hreflanguages) && !empty($hreflanguages)) {
							foreach ($hreflanguages as $lang => $lang_array) {
			      		echo '<option value="'.$lang.'">'.$lang_array['english_name'].'</option>';
			 	     }
						}
		    	echo '</select>';
		    	echo '<button class="add-new-hreflang-tag"><span class="dashicons dashicons-plus"></span></button>';
				echo '</div>';
			}
			$n = 0;
			if (is_array($keys) && !empty($keys)) {
				foreach ($keys as $key) {
					$key_array = explode('-',$key);
					$href_lang = $key_array[1];
					if (count($key_array) == 3) {
						$href_lang = 'x-default';
					}
					echo '<div id="hreflang-'.($n+1).'" class="href-lang">';
					echo '<label for="hreflang-href">'.__('Alternative URL','hreflang-tags-by-dcgws').'</label>';
					echo '<input name="hreflang-href[]" type="text" value="'.$values[$n][0].'">';
					echo '<label for="meta-box-dropdown">'.__('Language','hreflang-tags-by-dcgws').'</label>';
				    echo '<select name="hreflang-lang[]" id="hreflang-lang">';
		       		echo '<option>'.__('Select one','hreflang-tags-by-dcgws').'</option>';
					if 	(!empty($hreflanguages) && is_array($hreflanguages)) {
						foreach ($hreflanguages as $lang => $lang_array) {
							echo '<option value="'.$lang.'"';
							if ($lang == $href_lang) {
								 echo ' selected="selected"';
							}
							echo '>'.$lang_array['english_name'].'</option>';
						}
					}
					echo '</select>';
		   			echo '<span id="'.$href_lang.'" class="validation-response-holder">';
		   			if ( ($n+1) == count($keys)) {
		   				echo '<button class="add-new-hreflang-tag"><span class="dashicons dashicons-plus"></span></button>';
		   				echo '<button class="remove-new-hreflang-tag"><span class="dashicons dashicons-minus"></span></button>';
				    }
				    echo '</span>';
					echo '</div>';
			    	$n++;
				}
			}
			echo '</div>';
		}
	}
}
function add_hreflang_meta_box() {
	if (is_array(get_option('hreflang_post_types')) && !empty(get_option('hreflang_post_types'))) {
		foreach (get_option('hreflang_post_types') as $hreflang_post_type) {
	    	add_meta_box('hreflang-meta-box','HREFLANG Tags','hreflang_meta_box',$hreflang_post_type, 'advanced', 'high', null);
		}
	}
}
if (!function_exists('add_hreflang_to_category_form')) {
	function add_hreflang_to_category_form() {
		global $hreflanguages;
		echo '<div class="href-container-cat">';
	  	echo '<h3>'.__('HREFLANG Tags','hreflang-tags-by-dcgws').'</h3>';
	  	echo '<div id="hreflang-cat-1" class="href-lang">';
	    echo '<label for="hreflang-href">'.__('Alternative URL','hreflang-tags-by-dcgws').'</label>';
	    echo '<input name="hreflang-href[]" type="text" value="">';
	    echo '<label for="meta-box-dropdown">'.__('Language','hreflang-tags-by-dcgws').'</label>';
	    echo '<select name="hreflang-lang[]" id="hreflang-lang">';
		echo '<option>'.__('Select one','hreflang-tags-by-dcgws').'</option>';
		if 	(!empty($hreflanguages) && is_array($hreflanguages)) {
			foreach ($hreflanguages as $lang => $lang_array) {
				echo '<option value="'.$lang.'">'.$lang_array['english_name'].'</option>';
			}
		}
		echo '</select>';
		echo '<button class="add-new-cat-hreflang-tag"><span class="dashicons dashicons-plus"></span></button>';
		echo '</div>';
		echo '</div>';
		echo '<br><br>';
	}
}
if (!function_exists('add_hreflang_to_category_edit_form')) {
	function add_hreflang_to_category_edit_form($term) {
		global $hreflanguages;
		$keys = array();
		$hreflang_pro_data = get_term_meta($term->term_id);
		$metatag = '';
		echo '<tr class="term-hreflang-wrap">';
		echo '<th scope="row"><label for="description">'.__('HREFLANG Tags','hreflang-tags-by-dcgws').'</label></th>';
		echo '<td class="term-hreflang-data">';
		if (is_array($hreflang_pro_data) && !empty($hreflang_pro_data)) {
			foreach($hreflang_pro_data as $key=>$value ) {
				if (stristr($key,'hreflang')) {
					$keys[] = $key;
					$values[] = $value;
				}
			}
		}
		if (empty($keys)) {
			echo '<div id="hreflang-cat-edit-1" class="href-lang">';
			echo '<label for="hreflang-href">'.__('Alternative URL','hreflang-tags-by-dcgws').'</label>';
			echo '<input name="hreflang-href[]" type="text" value="">';
			echo '<label for="meta-box-dropdown">'.__('Language','hreflang-tags-by-dcgws').'</label>';
			echo '<select name="hreflang-lang[]" id="hreflang-lang">';
			echo '<option>'.__('Select one','hreflang-tags-by-dcgws').'</option>';
			if 	(!empty($hreflanguages) && is_array($hreflanguages)) {
				foreach ($hreflanguages as $lang => $lang_array) {
					echo '<option value="'.$lang.'"';
					if ($lang == $href_lang) {
						echo ' selected="selected"';
					}
					echo '>'.$lang_array['english_name'].'</option>';
				}
			}
			echo '</select>';
			echo '<button class="add-new-cat-edit-hreflang-tag"><span class="dashicons dashicons-plus"></span></button>';
			echo '</div>';
		}
		$n = 0;
		if (is_array($keys) && !empty($keys)) {
			foreach ($keys as $key) {
				$key_array = explode('-',$key);
				$href_lang = $key_array[1];
				if (count($key_array) == 3) {
					$href_lang = 'x-default';
				}
				echo '<div id="hreflang-cat-edit-'.($n+1).'" class="href-lang">';
				echo '<label for="hreflang-href">'.__('Alternative URL','hreflang-tags-by-dcgws').'</label>';
				echo '<input name="hreflang-href[]" type="text" value="'.$values[$n][0].'">';
				echo '<label for="meta-box-dropdown">'.__('Language','hreflang-tags-by-dcgws').'</label>';
				echo '<select name="hreflang-lang[]" id="hreflang-lang">';
				echo '<option>'.__('Select one','hreflang-tags-by-dcgws').'</option>';
				if 	(!empty($hreflanguages) && is_array($hreflanguages)) {
					foreach ($hreflanguages as $lang => $lang_array) {
						echo '<option value="'.$lang.'"';
						if ($lang == $href_lang) {
							echo ' selected="selected"';
						}
						echo '>'.$lang_array['english_name'].'</option>';
					}
				}
		        echo '</select>';
				if ( ($n+1) == count($keys)) {
					echo '<button class="add-new-cat-edit-hreflang-tag"><span class="dashicons dashicons-plus"></span></button>';
					echo '<button class="remove-new-cat-edit-hreflang-tag"><span class="dashicons dashicons-minus"></span></button>';
				}
				echo '</div>';
			    $n++;
			}
		}
		echo '</td>';
		echo '</tr>';
	}
}
if (!function_exists('hreflang_save_term_meta_data')) {
	function  hreflang_save_term_meta_data($term_id) {
		if (isset($_POST['hreflang-href']) && !empty($_POST['hreflang-href'])) {
			$i = 0;
			$hreflang_data = get_term_meta($term_id);
			if (is_array($hreflang_data) && !empty($hreflang_data)) {
				foreach($hreflang_data as $key=>$value ) {
					if (stristr($key,'hreflang')) {
						$key_array = explode('-',$key);
						if (count($key_array) == 3) {
							$lang = 'x-default';
						}
						else {
							$lang = $key_array[1];
						}
						delete_term_meta($term_id, 'hreflang-'.$lang);
					}
				}
			}
			if (is_array($_POST['hreflang-href']) && !empty($_POST['hreflang-href'])) {
				foreach($_POST['hreflang-href'] as $href) {
					if (trim($href) == '' || $href == 'Select one') {
						$i++;
						continue;
					}
					else {
						update_term_meta($term_id,'hreflang-'.$_POST['hreflang-lang'][$i],$href);
						$i++;
					}
				}
			}
		}
	}
}
if (!function_exists('hreflang_taxonomy_forms')) {
	function hreflang_taxonomy_forms() {
		$types = get_option('hreflang_post_types');
		if (!empty($types) && is_array($types)) {
			foreach($types as $type) {
				if ( !post_type_exists($type) ) {
					add_action($type.'_add_form_fields','add_hreflang_to_category_form',99);
					add_action($type.'_edit_form_fields','add_hreflang_to_category_edit_form',10,1);
				}
			}
		}
	}
}
if (!function_exists('hreflang_version_fix')) {
	function hreflang_version_fix() {
		$types = get_option('hreflang_post_types');
		if (!empty($types) && is_array($types)) {
			$new_types = array();
			foreach($types as $type) {
				if ($type == 'categories') {
					$new_types[] = 'category';
					continue;
				}
				$new_types[] = $type;
			}
			update_option('hreflang_post_types',$new_types);
		}
	}
}
if (!function_exists('hreflang_delete_all_data')) {
	function hreflang_delete_all_data() {
		$all_types = get_option('hreflang_post_types');
		$tax_types = array();
		$post_types = array();
		$taxonomies = get_taxonomies( array( 'public' => true),'objects');
		if (is_array($taxonomies) && $taxonomies !== array()) {
			foreach ($taxonomies as $taxonomy) {
				$tax_name = $taxonomy->name;
				if (in_array($taxonomy->name,$all_types)) {
					if (($key = array_search($tax_name, $all_types)) !== false) {
					    unset($all_types[$key]);
					}
					$tax_types[] = $tax_name;
				}
			}
		}
		$ret = array();
		$ret["args"] = $args;
		$ret["types"] = $all_types;
		$ret["tax_types"] = $tax_types;
		$pages = new WP_Query (array(
			'post_type'    => $all_types,
			'posts_per_page' => -1
		));
		$taxonomies = $tax_types;
		$terms = get_terms( $taxonomies, array(
			'hide_empty' => 0
		));
		$posts = $pages->posts;
		$ret["posts"] = $posts;
		$ret["terms"] = $terms;
		$n = 0;
		$p = 0;
		$t = 0;
		if ( is_array($posts) && !empty($posts) ) {
			foreach ($posts as $post) {
				$p++;
				$hreflang_post_data = get_post_meta($post->ID);
				if (is_array($hreflang_post_data) && !empty($hreflang_post_data)) {
					foreach($hreflang_post_data as $key=>$value ) {
						if (stristr($key,'hreflang-')) {
							if (delete_post_meta($post->ID, $key)) {
								$n++;
							}
						}
					}
				}
			}
		}
		if (is_array($terms) && !empty($terms)) {
			foreach( $terms as $term ){
				$t++;
				$hreflang_term_data = get_term_meta($term->term_id);
				if (is_array($hreflang_term_data) && !empty($hreflang_term_data)) {
					foreach($hreflang_term_data as $key=>$value ) {
						if (stristr($key,'hreflang-')) {
							if (delete_term_meta($term->term_id, $key)) {
								$n++;
							}
						}
					}
				}
			}
		}
		$ret["message"] = __("A total of $n hreflang tags have been deleted from $p posts and $t terms.", 'hreflang-tags-by-dcgws');
		header('Content-Type: application/json');
		echo json_encode($ret);
		exit;
	}
}
