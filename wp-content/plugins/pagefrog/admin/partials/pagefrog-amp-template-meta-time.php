<li class="posted-on">
  <time datetime="<?php echo esc_attr( date( 'c', $this->get( 'post_publish_timestamp' ) ) ); ?>">
    <?php
    echo esc_html( get_the_date( 'j M Y', $this->get('post')->ID ) );
    ?>
  </time>
</li>