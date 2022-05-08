<?php

if (!defined('ABSPATH'))
    exit; // Exit if accessed directly


if (!class_exists('AMP_Post')) {

    class AMP_Post {

        /** GENERAL ---------------------------------------------------------------------------- */
        // Save Options
        public static function saveOptions() {
            $amps = $_POST['amps'];

            if (!is_array($amps))
                wp_die('Invalid data received.');
            if (!is_admin())
                wp_die('You are not an administrator.');
            $amp_option = get_option('amps');
            foreach ($amps as $key => $value) {
                if(!in_array($key, array('custom-meta'))){
                    $amp_option[sanitize_text_field($key)] = sanitize_text_field($value);
                } else {
                    $amp_option[sanitize_text_field($key)] = $value;
                }
            }
            update_option('amps', $amp_option);
        }

        public static function amps_get_entity_options($entity = null, $type = 'json') {
            $result = array('status' => false, 'payload' => '');

            if (!isset($_POST['entity']) && empty($_POST['entity']) && empty($entity)) {
                $result['message'] = 'Entity is required';
                if($type == 'json'){
                    echo json_encode($result);
                    exit;
                }
            }

            $postParameterEntity = isset($_POST['entity']) ? $_POST['entity'] : (!empty($entity) ? $entity : '');
            if (empty($postParameterEntity)) {
                $result['message'] = 'Entity is required';
                if($type == 'json'){
                    echo json_encode($result);
                    exit;
                }
            }


            $args = array(
                'posts_per_page' => -1,
                'orderby' => 'date',
                'order' => 'DESC',
                'post_type' => 'post',
                'post_status' => 'publish',
                'suppress_filters' => true
            );

            switch ($postParameterEntity) {
                case 'post':
                    $posts_array = get_posts($args);
                    $posts_array_filtered = self::amps_filter_posts_for_custom_disable($posts_array);
                    $result['status'] = true;
                    $result['payload'] = self::amps_generate_names_array($posts_array_filtered);
                    break;
                case 'page':
                    $args['post_type'] = 'page';
                    $posts_array = get_posts($args);
                    $posts_array_filtered = self::amps_filter_posts_for_custom_disable($posts_array);
                    $result['status'] = true;
                    $result['payload'] = self::amps_generate_names_array($posts_array_filtered);
                    break;
                case 'tag':
                    $tags_array = get_tags();
                    $result['status'] = true;
                    $result['payload'] = self::amps_generate_names_array($tags_array, 'tag');
                    break;
                case 'category':
                    $categories_array = get_categories();
                    $result['status'] = true;
                    $result['payload'] = self::amps_generate_names_array($categories_array, 'category');
                    break;
                default:
                    $result = array('status' => false, 'payload' => '', 'message' => 'Invalid Entity');
                    break;
            }
            if($type == 'json'){
                echo json_encode($result);
            } else {
                return $result;
            }

            exit;
        }

        public static function amps_filter_posts_for_custom_disable($posts) {
            if (!empty($posts)) {
                foreach ($posts as $post_array_key => $post) {
                    $amps_use_custom_settings_option = get_post_meta($post->ID, AMP_CUSTOM_SETTINGS_SWITCH, TRUE);
                    $amps_use_custom_settings = get_post_meta($post->ID, AMP_CUSTOM_SETTINGS, TRUE);

                    /* Custom Settings are enabled for this post */
                    if (!empty($amps_use_custom_settings_option)) {
                        if (
                            !empty($amps_use_custom_settings) &&
                            is_array($amps_use_custom_settings) &&
                            isset($amps_use_custom_settings['enable']) &&
                            !empty($amps_use_custom_settings['enable'])
                        ) {
                            unset($posts[$post_array_key]);
                        }
                    }
                }
            }
            return $posts;
        }

        public static function amps_generate_names_array($entities, $type = 'post') {
            $result = array();
            if (!empty($entities)) {
                switch ($type) {
                    case 'tag':
                        foreach ($entities as $tags_array_key => $tag) {
                            $result[$tag->term_id] = array(
                                'name' => $tag->name,
                                'permalink' => str_replace('//amp', '/amp', get_tag_link($tag->term_id).'/amp')
                            );
                        }
                        break;
                    case 'category':
                        foreach ($entities as $categories_array_key => $category) {
                            $result[$category->term_id] = array(
                                'name' => $category->name,
                                'permalink' => str_replace('//amp', '/amp', get_category_link($category->term_id).'/amp')
                            );
                        }
                        break;
                    default:
                        foreach ($entities as $post_array_key => $post) {
                            $result[$post->ID] = array(
                                'name' => $post->post_title,
                                'permalink' => str_replace('//amp', '/amp/', get_permalink($post->ID).'/amp')
                            );
                        }
                        break;
                }
            }
            return $result;
        }

        public static function import_amps_settings(){
            $result = array(
                'status' => false,
                'message' => 'Import Initialization failed'
            );

           $file = $_FILES;

           if (empty($file['export_settings_file']['name']) || !strpos($file['export_settings_file']['name'], '.json')) {
               $result = array(
                   'status' => false,
                   'message' => 'File is Invalid'
               );
               echo json_encode($result);
               exit;
           }

           $path = get_home_path().'/amps-settings.json';

             if (move_uploaded_file($_FILES['export_settings_file']['tmp_name'], $path)) {
                $file_save_in_variable = file_get_contents(get_home_path().'/amps-settings.json');

                $decode_variable = json_decode($file_save_in_variable, TRUE);

                if(is_array($decode_variable )){

                    $setvalue_array_rev = array("on_pages", "on_posts", "on_categories", "on_tags", "logo_image", "favico", "on_author_name", "on_category_description", "disable_recent_posts");

                    $setvalue_array=array_flip($setvalue_array_rev);

                    $result_diff=array_diff_key($setvalue_array,$decode_variable);

                    if (!empty($result_diff)) {
                        $result = array(
                            'status' => false,
                            'message' => 'Settings are Invalid'
                        );
                    } else {

                        update_option( 'amps', $decode_variable );
                        $result = array(
                            'status' => true,
                            'message' => 'Settings Import Successful'
                        );
                    }
                } else {
                    $result = array(
                        'status' => false,
                        'message' => 'File is Invalid'
                    );
                }
                if (file_exists($path)) {
                    unlink($path);
                }
            } else {
                $result = array(
                    'status' => false,
                    'message' => 'File Upload Unsuccessful'
                );
            }
            echo json_encode($result);
            exit;
        }
    }
}
