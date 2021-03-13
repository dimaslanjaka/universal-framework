<?php

if (!defined('ABSPATH'))
    exit; // Exit if accessed directly

if (!class_exists('MAMP_Model')) {

    class MAMP_Model {

        public static function insertData($data) {
            global $wpdb;

            $query = "INSERT INTO " . static::$TABLE_NAME;
            $names = '(';
            $values = '(';
            foreach ($data as $k => $v) {
                $v = str_replace('\'', '\\\'', $v);
                $v = str_replace('"', '\\"', $v);
                $names .= $k . ',';
                $values .= "'$v',";
            }
            $names = rtrim($names, ',') . ')';
            $values = rtrim($values, ',') . ')';
            $query .= $names . ' VALUES ' . $values;
            try {
                $wpdb->query($query);
                $index = $wpdb->get_var('SELECT LAST_INSERT_ID();');
            } catch (Exception $ex) {
                return $ex->getMessage();
            }

            return $index;
        }

        public static function querySingle($query) {
            global $wpdb;
            $query = str_replace('TABLE_NAME', static::$TABLE_NAME, $query);
            $results = $wpdb->get_results($query, ARRAY_A);

            if (is_array($results))
                return $results[0];
            else
                return false;
        }

        public static function check_category () {
           $amps = get_option('amps'); 
           //print_r($amps);
          if($amps['on_category_description'] == 1){
            //$slug=amp-cat;
            //echo get_category_by_slug( $slug );
            echo category_description( get_category_by_slug('category-slug')->term_id );
         }
          
        }

        public static function check_tag () {
           $amps = get_option('amps'); 
           //print_r($amps);
          if($amps['on_tag_description'] == 1){
            //$slug=amp-cat;
            //echo get_category_by_slug( $slug );
          $description = tag_description(); 
          echo $description ;
         }
          
        }
        public static function query($query) {
            global $wpdb;
            $query = str_replace('TABLE_NAME', static::$TABLE_NAME, $query);
            $results = $wpdb->get_results($query, ARRAY_A);

            if (is_array($results))
                return $results;
            else
                return false;
        }

        public static function updateData($what, $where) {
            global $wpdb;

            $query = "UPDATE " . static::$TABLE_NAME . " SET ";
            foreach ($what as $k => $v) {
                $v = str_replace('\'', '\\\'', $v);
                $v = str_replace('"', '\\"', $v);
                $query .= "$k = '$v',";
            }
            $query = rtrim($query, ',');
            $query .= " WHERE ";
            $c = 0;
            foreach ($where as $k => $v) {
                $c++;
                $AND = ' AND ';
                if ($c == sizeof($where))
                    $AND = '';
                $query .= "$k = '$v'$AND";
            }

            $wpdb->query($query);
            return true;
        }

        public static function getCount() {
            global $wpdb;
            $query = 'select count(*) from ' . static::TABLE_NAME . ';';
            $count = $wpdb->get_var($query);
            return $count;
        }
        
        public static function communicateWithAMPServer($data){
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, "http://sitemap.ampsupremacy.com/api/index.php");
            curl_setopt($ch, CURLOPT_POST, 1);

            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));

            // receive server response ...
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $server_output = curl_exec($ch);

            curl_close($ch);

            return json_decode($server_output);
        }
        
        public static function writeInstallationStatusActivated($params = array()) {
            $data_object = new stdClass();
            $amp_supremacy_stat_id = get_option( 'amp_supremacy_stat_id', 0);
            
            /* Saved a new record for this user */
            if(empty($amp_supremacy_stat_id)){
                $data_object->site_url = get_site_url();
                $data_object->product_name = 'AMP Supremacy';
                $data_object->admin_mail = get_bloginfo('admin_email');
                $data_object->site_name = get_bloginfo('name');
                $data_object->last_activity_datetime = current_time( 'mysql', 1 );
                $data_object->version = !empty($params['plugin_version']) ? $params['plugin_version'] : 'Not Specified';
                $data_object->action =  'amp_installed';
                $data_object = (array) $data_object;

                $server_says = self::communicateWithAMPServer($data_object);
                if(is_object($server_says)){
                    if($server_says->status == 1){
                        add_option( 'amp_supremacy_stat_id', $server_says->stat_id);
                    }
                }
            } else {
                self::updateInstallationStatus(1, $params['plugin_version']);  /* Updates the status to 1 */
            }
        }
        
        public static function updateInstallationStatus($status = null, $version = 0){
            $amp_supremacy_stat_id = get_option('amp_supremacy_stat_id', -1);
            if($amp_supremacy_stat_id > 0){
                $params = array(
                    'action' => 'update_stat',
                    'last_activity_datetime' => current_time( 'mysql', 1 ),
                    'stat_id' => $amp_supremacy_stat_id
                );
                if(!empty($version)){
                    $params['version'] = $version;
                }
                if(in_array($status, array(0,1,2)) && !is_null($status)){
                    $params['status'] = $status;
                }
                $server_says = self::communicateWithAMPServer($params); 
            }
        }
        
        public static function getAMPSupremacyRelatedPosts($post, $relevancy = 'tag'){
            $objects = ($relevancy != 'category') ? wp_get_post_tags($post->ID) : wp_get_post_categories($post->ID);
            $all_tags = array();
            if ($objects) {
                if($relevancy != 'category'){
                    foreach($objects as $object){
                        $all_objects[] = $object->term_id;
                    }
                } else {
                    $all_objects = $objects;
                }
                
                $args=array(
                    $relevancy.'__in' => $all_objects,
                    'post__not_in' => array($post->ID),
                    'posts_per_page'=>5,
                    'caller_get_posts'=>1
                );
                $my_query = new WP_Query($args);
                
                if( $my_query->have_posts() ) {
                    echo '<div class="amp-related-posts">';
                    echo '<h3>Related Posts</h3><ul>';
                    while ($my_query->have_posts()) : $my_query->the_post(); ?>
                        <li><a href="<?php the_permalink() ?>amp/" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a></li>
                    <?php
                    endwhile;
                    echo '</ul></div>';
                }
                wp_reset_query();
            }
        }
    }
}