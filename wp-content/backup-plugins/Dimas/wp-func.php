<?php

function get_first_image_from_post($post=null) {
  if (!$post){
    global $post, $posts;
  }
  $first_img = '';
  ob_start();
  ob_end_clean();
  if (isset($post->post_content)){
    if (preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post->post_content, $matches)){
      $first_img = $matches[1][0];
    }
  }

  if(empty($first_img)){ //Defines a default image
    $first_img = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ_GSwBHWgKexKRlrdNTFKAvtv827hyFeGx4dvA4ln2k8UDV1vT";
  }
  return $first_img;
}

/**
* define url is images
* @param string $url
* @return boolean true false
*/
function url_is_image( $url ) {
    if ( ! filter_var( $url, FILTER_VALIDATE_URL ) ) {
        return FALSE;
    }
    $ext = array( 'jpeg', 'jpg', 'gif', 'png' );
    $info = (array) pathinfo( parse_url( $url, PHP_URL_PATH ) );
    return isset( $info['extension'] )
        && in_array( strtolower( $info['extension'] ), $ext, TRUE );
}

function thumbnail_url_field( $html ) {
    global $post;
    $value = get_post_meta( $post->ID, '_thumbnail_ext_url', TRUE ) ? : "";
    $nonce = wp_create_nonce( 'thumbnail_ext_url_' . $post->ID . get_current_blog_id() );
    $html .= '<input type="hidden" name="thumbnail_ext_url_nonce" value="' 
        . esc_attr( $nonce ) . '">';
    $html .= '<div><p>' . __('Or', 'txtdomain') . '</p>';
    $html .= '<p>' . __( 'Enter the url for external image', 'txtdomain' ) . '</p>';
    $html .= '<p><input type="url" name="thumbnail_ext_url" value="' . $value . '"></p>';
    if ( ! empty($value) && url_is_image( $value ) ) {
        $html .= '<p><img style="max-width:150px;height:auto;" src="' 
            . esc_url($value) . '"></p>';
        $html .= '<p>' . __( 'Leave url blank to remove.', 'txtdomain' ) . '</p>';
    }
    $html .= '</div>';
    return $html;
}