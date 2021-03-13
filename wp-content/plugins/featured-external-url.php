<?php 
namespace GM\WWWPostThumbnail;
/**
 * Plugin Name: WWW Post Thumbnail
 * Description: Allow to use an external image url as featured image.
 * Plugin URI: https://gist.github.com/Giuseppe-Mazzapica/928bc22e5f49a654cf7c
 * Author: Giuseppe Mazzapica
 * Author URI: https://github.com/Giuseppe-Mazzapica
 * License: MIT
 * Version: 0.1.0
 *
 */
 
/*
MIT License (MIT)

Copyright (c) 2014 Giuseppe Mazzapica

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

add_action( 'plugins_loaded', 'GM\WWWPostThumbnail\txtdomain' );

function txtdomain() {
  load_plugin_textdomain( 'www-post-thumb', FALSE, dirname( plugin_basename( __FILE__ ) ) . '/' ); 
}

add_filter( 'admin_post_thumbnail_html', 'GM\WWWPostThumbnail\field' );

add_action( 'save_post', 'GM\WWWPostThumbnail\save', 10, 2 );

add_filter( 'post_thumbnail_html', 'GM\WWWPostThumbnail\markup', 10, PHP_INT_MAX );

function is_image( $url ) {
  $ext = array( 'jpeg', 'jpg', 'gif', 'png' );
  $info = (array) pathinfo( parse_url( $url, PHP_URL_PATH ) );
  return isset( $info['extension'] ) && in_array( strtolower( $info['extension'] ), $ext, TRUE );
}

function field( $html ) {
  global $post;
  $value = get_post_meta( $post->ID, '_thumbnail_ext_url', TRUE ) ? : "";
  $nonce = wp_create_nonce( 'thumbnail_ext_url_' . $post->ID . get_current_blog_id() );
  $html .= '<input type="hidden" name="thumbnail_ext_url_nonce" value="' . esc_attr( $nonce ) . '">';
  $html .= '<div><p>' . __('Or', 'www-post-thumb') . '</p>';
  $html .= '<p>' . __( 'Enter the url for external featured image', 'www-post-thumb' ) . '</p>';
  $html .= '<p><input type="url" name="thumbnail_ext_url" value="' . $value . '"></p>';
  if ( ! empty($value) && is_image( $value ) ) {
    $html .= '<p><img style="max-width:150px;height:auto;" src="' . esc_url($value) . '"></p>';
    $html .= '<p>' . __( 'Leave url blank to remove.', 'www-post-thumb' ) . '</p>';
  }
  $html .= '</div>';
  return $html;
}

function save( $pid, $post ) {
  $cap = $post->post_type === 'page' ? 'edit_page' : 'edit_post';
  if (
    ! current_user_can( $cap, $pid )
    || ! post_type_supports( $post->post_type, 'thumbnail' )
    || defined( 'DOING_AUTOSAVE' )
  ) {
    return;
  }
  $action = 'thumbnail_ext_url_' . $pid . get_current_blog_id();
  $nonce = filter_input( INPUT_POST,  'thumbnail_ext_url_nonce', FILTER_SANITIZE_STRING );
  $url = filter_input( INPUT_POST,  'thumbnail_ext_url', FILTER_VALIDATE_URL );
  if (
    empty( $nonce )
    || ! wp_verify_nonce( $nonce, $action )
    || ( ! empty( $url ) && ! is_image( $url ) )
  ) {
    return;
  }
  if ( ! empty( $url ) ) {
    update_post_meta( $pid, '_thumbnail_ext_url', esc_url($url) );
    if ( ! get_post_meta( $pid, '_thumbnail_id', TRUE ) ) {
      update_post_meta( $pid, '_thumbnail_id', 'by_url' );
    }
  } elseif ( get_post_meta( $pid, '_thumbnail_ext_url', TRUE ) ) {
    delete_post_meta( $pid, '_thumbnail_ext_url' );
    if ( get_post_meta( $pid, '_thumbnail_id', TRUE ) === 'by_url' ) {
      delete_post_meta( $pid, '_thumbnail_id' );
    }
  }
}

function markup( $html, $post_id ) {
  $url =  get_post_meta( $post_id, '_thumbnail_ext_url', TRUE );
  if ( empty( $url ) || ! is_image( $url ) ) {
    return $html;
  }
  $alt = get_post_field( 'post_title', $post_id ) . ' ' .  __( 'thumbnail', 'www-post-thumb' );
  $attr = array( 'alt' => $alt );
  $attr = apply_filters( 'wp_get_attachment_image_attributes', $attr, NULL );
  $attr = array_map( 'esc_attr', $attr );
  $html = sprintf( '<img src="%s"', esc_url($url) );
  foreach ( $attr as $name => $value ) {
    $html .= " $name=" . '"' . $value . '"';
  }
  $html .= ' />';
  return $html;
}