<?php 
class PageFrog_Amp_Header_Image_Sanitizer extends AMP_Base_Sanitizer {
    public function sanitize() {
        $new_post = $this->args['new_posts'];
        $post = $this->args['post'];

        if ( ! $new_post->get_amp_show_header_images_bool() ) {
            return;
        }

        // get the url for the header image
        $img_urls = self::get_header_img_srcs_possible( $post->ID );

        // find if that image is also in the blog content
        $body = $this->get_body_node();
        $imgs = $body->getElementsByTagName( 'amp-img' );
        $duplicate = NULL;
        foreach ( $imgs as $img ) {
            foreach( $img_urls as $img_url ) {
                if ( $img->getAttribute( 'src' ) === $img_url ) {
                    $duplicate = $img;
                    break;
                }
            }
        }

        if ( $duplicate != NULL ) {
            $result = $this->number_of_ps_to( $duplicate, $body );
            if ( $result['count'] > 2 ) {
                // the header image should be removed.

            } else {
                // the image in the post should be removed and the header image should stay
                if ( $duplicate->parentNode != NULL ) {
                    $duplicate->parentNode->removeChild( $duplicate );
                }
            }
        }
    }

    static function get_header_img_srcs_possible( $post_id ) {
        $img_urls = array();
        if ( has_post_thumbnail( $post_id ) ) {
            $valid_image_sizes = array('full', 'thumbnail', 'medium', 'large');
            $post_thumbnail_id = get_post_thumbnail_id( $post_id );
            foreach( $valid_image_sizes as $valid_image_size ) {
                 $attachement = wp_get_attachment_image_src( $post_thumbnail_id, $valid_image_size );
                 $img_urls[] = $attachement[0];
            }
        }
        return $img_urls;
    }

    private function number_of_ps_to( $node, $current_node, $current_count = 0 ) {
        if ( $node->isSameNode( $current_node ) ) {
            return array( 'count' => $current_count, 'found' => true);
        }
        if ( $current_node->nodeName !== '#text' && $current_node->tagName === 'p' ) {
            $current_count++;
        }
        if ( $current_node->hasChildNodes() ) {
            foreach( $current_node->childNodes as $child ) {
                $result = $this->number_of_ps_to( $node, $child, $current_count );
                if ( $result['found'] === true ) {
                    return $result;
                } else {
                    $current_count = $result['count'];
                }
            }
        }
        return array( 'count' => $current_count, 'found' => false );
    }
}
?>