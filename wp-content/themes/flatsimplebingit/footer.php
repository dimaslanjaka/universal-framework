	</div> <!-- .row on head -->
	</div> <!-- .container on head -->
	</div> <!-- .ktz-inner-content head -->
	<footer class="footer">
	
	<div class="container">
	<?php do_action( 'ktz_footerbanner' ); // Function in _banner_ktz.php ?>
	</div>
	
	<?php if ( is_active_sidebar('widget_fot1') ): ?>
	<div class="wrapfootwidget">
		<div class="container">
			<?php do_action( 'ktz_mainfooter' ); // Function in _footer_ktz.php ?>
		</div>
	</div>
	<?php endif; ?>
	<div class="copyright">
	<nav class="ktz-footermenu">
		<div class="container">
			<?php do_action( 'ktz_fourthmenu' ); // Function in _navigation_ktz.php ?>
		</div>	
	</nav>
		<div class="container">
				<?php do_action( 'ktz_subfooter' ); // function in _footer_ktz.php ?>
				<?php do_action( 'ktz_social_icon' ); // function in _social_ktz.php ?>
		</div>
	</div>
	</footer>
	</div> <!-- .all-wrapper on head -->
	
	<?php do_action( 'ktz_mustread_content' ); // function in _slider_ktz.php ?>
	
	<div id="ktz-backtotop"><a href="#"><span class="fontawesome ktzfo-double-angle-up"></span><br />Top</a></div>
	
	<?php 
		wp_footer();
		echo ot_get_option("ktz_footer")  . "\n"; 
	?>
</body>
</html>