<?php 
/**
 * KENTOOZ ATTACHMENT TEMPLATE
**/
get_header(); ?>

	<section class="col-md-12">
		<div role="main" class="main-attachment">
		<section class="new-content">
		<?php while ( have_posts() ) : the_post(); ?>
			<article id="post-<?php the_ID(); ?>" <?php post_class('ktz-single'); ?>>
			<?php ktz_setPostViews(get_the_ID()); //get view for single post ?>
			<div class="ktz-single-box"><div class="entry-body">
				<h1 class="entry-title clearfix"><?php the_title(); ?></h1>
				<div class="metasingle-aftertitle">
					<div class="ktz-inner-metasingle">
						<?php do_action( 'ktz_author_by' ); // function in _loop_ktz.php ?>
						<?php do_action( 'ktz_posted_on' ); // function in _loop_ktz.php ?>
						<?php do_action( 'ktz_getPostViews', $post->ID ); // function in _loop_ktz.php  ?>
						<?php do_action( 'ktz_ajaxstar_SEO_single' ); // function in _rating_ktz.php ?>
						<?php edit_post_link( __( 'Edit', 'ktz_theme_textdomain' ), '<span class="entry-edit"><span class="glyphicon glyphicon-edit"></span> ', '</span>' ); ?>
					</div>
				</div>
				<?php $attachments = array_values( get_children( array( 'post_parent' => $post->post_parent, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => 'ASC', 'orderby' => 'menu_order ID' ) ) );
				foreach ( $attachments as $k => $attachment ) {
					if ( $attachment->ID == $post->ID )
						break;
				}
				$k++;
				if ( count( $attachments ) > 1 ) {
					if ( isset( $attachments[ $k ] ) )
						$next_attachment_url = get_attachment_link( $attachments[ $k ]->ID );
					else
						$next_attachment_url = get_attachment_link( $attachments[ 0 ]->ID );
				}
				else {
					$next_attachment_url = wp_get_attachment_url();
				}
				?>
				<div class="entry-content clearfix">
					<p class="attachment"><a href="<?php echo $next_attachment_url; ?>" title="<?php echo esc_attr( get_the_title() ); ?>" rel="attachment"><?php echo wp_get_attachment_image( $post->ID, 'full' ); // filterable image width with, essentially, no limit for image height. ?></a></p>
					<?php the_content(); ?>
					<?php 
					$attachment_meta = wp_get_attachment_metadata($post->ID, 'full');
					$image_attributes = wp_get_attachment_image_src( $post->ID, 'full' ); // returns an array
					echo '<h2 class="related-title"><span>' . __('Description for ', 'ktz_theme_textdomain') . ' ' . get_the_title() . '</span></h2>';
					echo '<table class="table table-striped">';
					echo '<thead>
						<tr>
						<th>No</th>
						<th>Image atribute</th>
						<th>Value</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>1</td>
							<td>Title:</td>
							<td>';
						echo get_the_title();
						echo '</td>
						</tr>
						<tr>
							<td>2</td>
							<td>Upload by:</td>
							<td>';
						echo get_the_author();
						echo '</td>
						</tr>
						<tr>
							<td>3</td>
							<td>Upload date:</td>
							<td>';
						echo get_the_date();
						echo '</td>
						</tr>
						<tr>
							<td>4</td>
							<td>Image link:</td>
							<td>';
						echo $image_attributes[0];
						echo '</td>
						</tr>
						<tr>
							<td>5</td>
							<td>Location:</td>
							<td>';
						echo $attachment_meta['file'];
						echo '</td>
						</tr>
						<tr>
							<td>6</td>
							<td>Width:</td>
							<td>';
						echo $attachment_meta['width'] . ' px';
						echo '</td>
						</tr>
						<tr>
							<td>7</td>
							<td>Height:</td>
							<td>';
						echo $attachment_meta['width'] . ' px';
						echo '</td>
						</tr>';
						echo '</tbody>';	
					echo '</table>';
					?>
				</div>
		<?php do_action( 'ktz_attachment_banner' ); // function in _banner_ktz.php   ?>
		<?php if ( ot_get_option('ktz_active_download') == 'yes' ) {
			echo do_action( 'ktz_get_dl_image' ); // function in _thumbnail_ktz.php 
		} ?>
				<div class="wrapcomment-attachment">
					<?php do_action( 'ktz_comments_facebook' ); // function in _comment_ktz.php ?>
				</div>
			</div></div>
			</article><!-- #post-<?php the_ID(); ?> -->
			<?php endwhile; // end of the loop. ?>
		</section>

			<?php $args = array(
			'orderby'           => 'rand',
			'post_type'         => 'attachment',
			'post_status'       => 'inherit',
			'posts_per_page'    => 4
			);
			$query = new WP_Query($args);
			echo '<h3 class="related-title"><span>' . __('Random attachment', 'ktz_theme_textdomain') . ' ' . get_the_title() . '</span></h3>';
			echo '<div class="row">';
			if($query->have_posts()) : 
			while($query->have_posts()) : $query->the_post();
			echo '<div class="col-md-3 ktz-random-attachment">';
			echo '<a href="' . get_permalink() . '" title="' . get_the_title() . '">';
			echo ktz_featured_just_img( 245, 150 );
			echo '</a>';
			echo '</div>';
			endwhile;
			wp_reset_postdata();
			endif; 			
			echo '</div>';
			?>
		</div>
	</section>
<?php get_footer(); ?>
