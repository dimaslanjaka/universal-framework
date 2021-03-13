<h1>UpdraftCentral - <?php _e('Remote Control for WordPress', 'updraftcentral');?></h1>

<?php echo $first_link;?> | 
	<a href="https://updraftplus.com/news/"><?php _e('News', 'updraftcentral');?></a>  | 
	<a href="https://twitter.com/updraftplus"><?php _e('Twitter', 'updraftcentral');?></a> | 
	<a href="<?php echo $support_forum;?>"><?php _e('Support forum', 'updraftcentral');?></a> | 
	<a href="<?php echo $idea_suggestion;?>"><?php _e('Suggest idea', 'updraftcentral');?></a> | 
	<a href="https://updraftplus.com/newsletter-signup"><?php _e('Newsletter sign-up', 'updraftcentral');?></a> | 
	<a href="http://david.dw-perspective.org.uk"><?php _e("Lead developer's homepage", 'updraftcentral');?></a> | 
	<a href="<?php echo $faqs;?>">FAQs</a> | <a href="https://www.simbahosting.co.uk/s3/shop/"><?php _e('More plugins', 'updraftcentral');?></a> - <?php _e('Version', 'updraftcentral');?>: <?php echo $updraft_central::VERSION; ?>
	<br>

<div style="width:800px;">

	<h2><?php _e('Getting started', 'updraftcentral');?></h2>

	<p><?php _e('Welcome to UpdraftCentral! This is the dashboard plugin, which you install on the site where you want to have your dashboard for controlling other sites. (On the controlled sites, you install UpdraftPlus).', 'updraftcentral');?></p>
	
	<p><?php echo sprintf(__('UpdraftCentral runs on the front-end of your site. To get started, you must create a front-end page for your site, to contain the dashboard. i.e. Go to %s.'), '<a href="'.admin_url('post-new.php?post_type=page').'">'.htmlspecialchars(__('Pages -> Add New', 'updraftcentral')).'</a>');?></p>

	<p><?php _e('In your new front-end page, put this shortcode: [updraft_central] . This will allow logged-in site administrators, who visit that page, to use UpdraftCentral.', 'updraftcentral');?></p>
	
	<p><a href="https://updraftplus.com/faqs/can-allow-non-admin-users-updraftcentral-dashboard/"><?php _e('If you want users with roles to also be able to use UpdraftCentral (note that every user has their own list of sites - giving users access to UpdraftCentral does not give them access to your sites, only to their own list of sites), then please see this FAQ for instructions.', 'updraftcentral');?></a>
	
	<p><?php _e('Then, to start using UpdraftCentral, simply visit the page, and you can begin adding sites.', 'updraftcentral');?>

</div>
