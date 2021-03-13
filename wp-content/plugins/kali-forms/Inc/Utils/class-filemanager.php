<?php
namespace KaliForms\Inc\Utils;

trait FileManager
{
    /**
     * Load files needed for image upload
     *
     * @return void
     */
    public function load_files()
    {
        require_once ABSPATH . 'wp-admin/includes/file.php';
        require_once ABSPATH . 'wp-admin/includes/post.php';
        require_once ABSPATH . 'wp-admin/includes/image.php';
        require_once ABSPATH . 'wp-admin/includes/media.php';
    }
    /**
     * Runs security checks, should improve
     *
     * @return void
     */
    public function run_checks()
    {
        if (empty($_FILES)) {
            $this->display_error(esc_html__('There are no files', 'kaliforms'));
        }
    }
    /**
     * File upload
     *
     * @return void
     */
    public function upload_file()
    {
        /**
         * Run checks so we dont have any surprises
         */
        $this->run_checks();

        /**
         * Load files needed for the media handling
         */
        $this->load_files();

        // Is multiple? Split
        $uploaded = count($_FILES) > 1 ? $this->_upload_multiple() : $this->_upload_single();

        // SCHEDULE IT FOR DELETE
        wp_schedule_single_event(time() + 900, $this->slug . '_delete_transient_file', [$uploaded]);

        wp_die($uploaded);
    }
    /**
     * Filters extensions for this particular form id, if needed
     *
     * @return void
     */
    // private function _filter_extensions()
    // {
    //     $default = null;
    //     $fields = get_post_meta(17, $this->slug . '_field_components', true);
    //     $fields = json_decode($fields, false, 512, JSON_HEX_QUOT);
    //     $currentField = $this->_get_current_field('fileUpload', $fields);
    //     if ($currentField === null || !isset($currentField->properties->acceptedExtensions) || empty($currentField->properties->acceptedExtensions)) {
    //         return;
    //     }
    //     $neededExtensions = explode(',', $currentField->properties->acceptedExtensions);

    //     add_action('mime_types', function ($mimes) use ($neededExtensions) {
    //         $mimes['eps'] = 'application/postscript';
    //         return $mimes;
    //     });
    // }
    /**
     * Returns the current field
     *
     * @param [string] $id
     * @param [array] $fields
     * @return void
     */
    private function _get_current_field($id, $fields)
    {
        $returnObj = null;
        foreach ($fields as $field) {
            if ($field->properties->name === $id) {
                $returnObj = $field;
            }
        }
        return $returnObj;
    }
    /**
     * Upload single file
     *
     * @return void
     */
    private function _upload_single()
    {
        $file = reset($_FILES);
        // Do we need to filter extensions?
        // $this->_filter_extensions();

        $obj = apply_filters(
            $this->slug . '_before_file_upload',
            [
                'file' => $file,
				'continue' => true,
				'post' => $_POST,
            ]
		);

        if (!$obj['continue']) {
            wp_die(
                wp_json_encode(['errors' => esc_html__('Something went wrong', 'kaliforms')])
            );
        }

        $id = media_handle_sideload($file, 0, sanitize_file_name($file['name']));
        if (is_wp_error($id)) {
            unlink($file['tmp_name']);
            wp_die(
                wp_json_encode(['errors' => $id->get_error_message()])
            );
        }

        return $id;
    }

    private function _upload_multiple()
    {

    }

    /**
     * Deletes a files from wp
     *
     * @return void
     */
    public function delete_file()
    {
        $_POST['id'] = absint(wp_unslash($_POST['id']));
        return wp_delete_post($_POST['id'], true);
    }
}
