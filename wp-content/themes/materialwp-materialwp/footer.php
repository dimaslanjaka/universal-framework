<?php

/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package MaterialWP
 */

?>

</div><!-- #content -->

<footer id="colophon" class="site-footer" role="contentinfo">
	<div class="container">
		<div class="site-info d-flex justify-content-between">
			<div>
				&copy; <?php bloginfo('name');
								echo ' - ';
								echo date("Y"); ?>
			</div>
			<div>
				<span>
					<small>This site is protected by reCAPTCHA and the Google
						<a href="https://policies.google.com/privacy">Privacy Policy</a> and
						<a href="https://policies.google.com/terms">Terms of Service</a> apply.
					</small>
				</span>
			</div>
		</div><!-- .site-info -->
	</div><!--  .container -->
</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>

</html>