<?php function wp_auto_spinner_settings()
{ ?>

	<?php

	$itm_prefix = 'wp_auto_spinner';
	$itm_id = 4092452;
	//delete_option($itm_prefix.'_license_active');
	$proxify = true;



	// v3.2.1
	//$license_active=get_option($itm_prefix.'_license_active','');
	$license_active = 'yes';


	//purchase check
	if (isset($_POST[$itm_prefix . '_license']) && trim($license_active) === '') {

		//save it
		update_option($itm_prefix . '_license', $_POST[$itm_prefix . '_license']);

		//activating
		//curl ini
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
		curl_setopt($ch, CURLOPT_TIMEOUT, 20);
		curl_setopt($ch, CURLOPT_REFERER, 'http://www.bing.com/');
		curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.8) Gecko/2009032609 Firefox/3.0.8');
		curl_setopt($ch, CURLOPT_MAXREDIRS, 5); // Good leeway for redirections.
		//curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); // Many login forms redirect at least once.
		curl_setopt($ch, CURLOPT_COOKIEJAR, "cookie.txt");

		//curl get
		$x = 'error';

		//change domain ?
		$append = '';

		if (isset($_POST['wp_auto_spin']) && in_array('OPT_CHANGE_DOMAIN', $_POST['wp_auto_spin'])) {
			$append = '&changedomain=yes';
		}


		$url = 'http://deandev.com/license/index.php?itm=' . $itm_id . '&domain=' . $_SERVER['HTTP_HOST'] . '&purchase=' . trim($_POST[$itm_prefix . '_license']) . $append;

		if (WP_VALVE_PROXY) $url = 'http://labnol-proxy-server.appspot.com/' . str_replace('http://', '', $url);

		curl_setopt($ch, CURLOPT_HTTPGET, 1);
		curl_setopt($ch, CURLOPT_URL, trim($url));
		while (trim($x) != '') {
			$exec = curl_exec($ch);
			$x = curl_error($ch);
		}

		$resback = $exec;

		$resarr = json_decode($resback);

		if (isset($resarr->message)) {
			$license_message = $resarr->message;

			//activate the plugin
			update_option($itm_prefix . '_license_active', 'active');
			update_option($itm_prefix . '_license_active_date', time());
			$license_active = get_option($itm_prefix . '_license_active', '');
		} else {
			if (isset($resarr->error))
				$license_error = $resarr->error;
		}
	} else {
	}
	// update options on post
	if (isset($_POST['wp_auto_spinner_lang'])) {

		if (!isset($_POST['wp_auto_spin'])) {
			update_option('wp_auto_spin', array());
		} else {
			update_option('wp_auto_spin', $_POST['wp_auto_spin']);
		}

		if (!isset($_POST['wp_spinner_types'])) {
			update_option('wp_spinner_types', array(
				'post'
			));
		} else {
			update_option('wp_spinner_types', $_POST['wp_spinner_types']);
		}

		if (!isset($_POST['post_category'])) {
			update_option('wp_auto_spin_execl', array());
		} else {
			update_option('wp_auto_spin_execl', $_POST['post_category']);
		}

		update_option('wp_auto_spinner_lang', $_POST['wp_auto_spinner_lang']);
		update_option('wp_auto_spinner_execlude', $_POST['wp_auto_spinner_execlude']);
		update_option('wp_auto_spinner_email', $_POST['wp_auto_spinner_email']);
		update_option('wp_auto_spinner_password', $_POST['wp_auto_spinner_password']);
		update_option('wp_auto_spinner_quality', $_POST['wp_auto_spinner_quality']);
		//update_option ( 'wp_auto_spinner_license', $_POST ['wp_auto_spinner_license'] );


		//wordai
		$fieldsToUpdate = array(

			'wp_auto_spinner_wordai_email',
			'wp_auto_spinner_wordai_password',
			'wp_auto_spinner_wordai_quality',


			'wp_auto_spinner_tbs_email',
			'wp_auto_spinner_tbs_password',
			'wp_auto_spinner_tbs_quality',
			'wp_auto_spinner_tbs_maxsyns',


			'wp_auto_spinner_cp_email',
			'wp_auto_spinner_cp_password',
			'wp_auto_spinner_cp_type',
			'wp_auto_spinner_cp_language',
			'wp_auto_spinner_cp_limit',
			'wp_auto_spinner_cp_quality',
			'wp_auto_spinner_cp_synonym_set',
			'wp_auto_spinner_cp_min_words_count',
			'wp_auto_spinner_cp_max_words_count',


			'wp_auto_spinner_sc_replacetype',
			'wp_auto_spinner_sc_wordquality',
			'wp_auto_spinner_sc_thesaurus',
			'wp_auto_spinner_sc_Wordscount',
			'wp_auto_spinner_sc_spinfreq',
			'wp_auto_spinner_sc_password',
			'wp_auto_spinner_sc_email',

			'wp_auto_spinner_cr_email',
			'wp_auto_spinner_cr_apikey',
			'wp_auto_spinner_cr_quality',
			'wp_auto_spinner_cr_phrasequality',
			'wp_auto_spinner_cr_posmatch',

			'wp_auto_spinner_es_email',
			'wp_auto_spinner_es_password',

			'wp_auto_spinner_bot_key',
			'wp_auto_spinner_qu_key'

		);

		//updating
		foreach ($fieldsToUpdate as $fieldToUpdate) {
			update_option($fieldToUpdate, $_POST[$fieldToUpdate]);
		}




		echo '<div class="updated" id="message"><p>Plugin settings <strong>updated successfully</strong>. </p></div>';
	}

	// data
	$wp_auto_spinner_lang = get_option('wp_auto_spinner_lang', 'en');
	$wp_auto_spinner_execlude = get_option('wp_auto_spinner_execlude', '');
	$wp_auto_spinner_email = get_option('wp_auto_spinner_email', '');
	$wp_auto_spinner_password = get_option('wp_auto_spinner_password', '');
	$wp_auto_spinner_quality = get_option('wp_auto_spinner_quality', 'medium');
	$queue_url = admin_url('admin.php?page=wp_auto_spinner_queue');

	// wordai
	$wp_auto_spinner_wordai_email    = get_option('wp_auto_spinner_wordai_email', '');
	$wp_auto_spinner_wordai_password = get_option('wp_auto_spinner_wordai_password', '');
	$wp_auto_spinner_wordai_quality  = get_option('wp_auto_spinner_wordai_quality', 'Regular');

	//tbs
	$wp_auto_spinner_tbs_email 	    = get_option('wp_auto_spinner_tbs_email', '');
	$wp_auto_spinner_tbs_password 	= get_option('wp_auto_spinner_tbs_password', '');
	$wp_auto_spinner_tbs_maxsyns 	= get_option('wp_auto_spinner_tbs_maxsyns', '');
	$wp_auto_spinner_tbs_quality 	= get_option('wp_auto_spinner_tbs_quality', '');


	//contentprofessor
	$wp_auto_spinner_cp_email 	    = get_option('wp_auto_spinner_cp_email', '');
	$wp_auto_spinner_cp_password 	    = get_option('wp_auto_spinner_cp_password', '');
	$wp_auto_spinner_cp_language 	    = get_option('wp_auto_spinner_cp_language', 'en');
	$wp_auto_spinner_cp_limit 	    = get_option('wp_auto_spinner_cp_limit', '5');
	$wp_auto_spinner_cp_quality 	    = get_option('wp_auto_spinner_cp_quality', 'ideal');
	$wp_auto_spinner_cp_synonym_set 	    = get_option('wp_auto_spinner_cp_synonym_set', 'global');
	$wp_auto_spinner_cp_min_words_count 	    = get_option('wp_auto_spinner_cp_min_words_count', '1');
	$wp_auto_spinner_cp_max_words_count 	    = get_option('wp_auto_spinner_cp_max_words_count', '7');
	$wp_auto_spinner_cp_type = get_option('wp_auto_spinner_cp_type', 'free');

	//sc spinnerchief
	$wp_auto_spinner_sc_replacetype = get_option('wp_auto_spinner_sc_replacetype', '0');
	$wp_auto_spinner_sc_wordquality = get_option('wp_auto_spinner_sc_wordquality', '0');
	$wp_auto_spinner_sc_thesaurus = get_option('wp_auto_spinner_sc_thesaurus', 'English');
	$wp_auto_spinner_sc_Wordscount = get_option('wp_auto_spinner_sc_Wordscount', '5');
	$wp_auto_spinner_sc_spinfreq = get_option('wp_auto_spinner_sc_spinfreq', '4');
	$wp_auto_spinner_sc_password = get_option('wp_auto_spinner_sc_password', '');
	$wp_auto_spinner_sc_email = get_option('wp_auto_spinner_sc_email', '');

	//cr chimprewriter
	$wp_auto_spinner_cr_email = get_option('wp_auto_spinner_cr_email', '');
	$wp_auto_spinner_cr_apikey = get_option('wp_auto_spinner_cr_apikey', '');
	$wp_auto_spinner_cr_quality = get_option('wp_auto_spinner_cr_quality', '4');
	$wp_auto_spinner_cr_phrasequality = get_option('wp_auto_spinner_cr_phrasequality', '3');
	$wp_auto_spinner_cr_posmatch = get_option('wp_auto_spinner_cr_posmatch', '3');


	?>



	<div class="wrap">
		<div style="margin-left: 8px" class="icon32" id="icon-options-general">
			<br>
		</div>

		<form method="POST" class="TTWForm-auto-spin">

			<h2>Settings <input type="submit" name="save" value="Save Changes" class="button-primary"></h2>

			<p><strong>Where</strong> you can configure the plugin. Choose your language, spinning method, configure the cron & set things up.</p>

			<div id="dashboard-widgets-wrap">

				<div class="metabox-holder columns-1" id="dashboard-widgets">
					<div class="postbox-container" id="postbox-container-1">
						<div>

							<?php if (trim($license_active) != '') { ?>


								<div class="postbox">
									<h2 class="hndle">
										<span>Basic options</span>
									</h2>
									<div class="inside">
										<!--  insider start -->


										<table class="form-table">
											<tbody>



												<tr>
													<th scope="row"><label>Thesaurus Language</label></th>
													<td>
														<select name="wp_auto_spinner_lang" id="field1zz">
															<option value="en" <?php opt_selected('en', $wp_auto_spinner_lang) ?>>English</option>
															<option value="du" <?php opt_selected('du', $wp_auto_spinner_lang) ?>>Dutch</option>
															<option value="ge" <?php opt_selected('ge', $wp_auto_spinner_lang) ?>>German</option>
															<option value="fr" <?php opt_selected('fr', $wp_auto_spinner_lang) ?>>French</option>
															<option value="it" <?php opt_selected('it', $wp_auto_spinner_lang) ?>>Italian</option>
															<option value="sp" <?php opt_selected('sp', $wp_auto_spinner_lang) ?>>Spanish</option>
															<option value="po" <?php opt_selected('po', $wp_auto_spinner_lang) ?>>Portuguese</option>
															<option value="ro" <?php opt_selected('ro', $wp_auto_spinner_lang) ?>>Romanian</option>
															<option value="tr" <?php opt_selected('tr', $wp_auto_spinner_lang) ?>>Turkish</option>
															<option value="id" <?php opt_selected('id', $wp_auto_spinner_lang) ?>>Indonesian</option>
															<option value="id2" <?php opt_selected('id2', $wp_auto_spinner_lang) ?>>Indonesian 2</option>
															<option value="id3" <?php opt_selected('id3', $wp_auto_spinner_lang) ?>>Indonesian 3</option>
															<option value="id4" <?php opt_selected('id4', $wp_auto_spinner_lang) ?>>Indonesian 4</option>
														</select>

														<div class="description">Choose which language the plugin will rewrite the content in.</div>
													</td>
												</tr>

												<tr>
													<th scope="row"><label>Auto spin?</label></th>
													<td>
														<input name="wp_auto_spin[]" id="field-wp_auto_spin_active-1" value="OPT_AUTO_SPIN_ACTIVE" type="checkbox"> Activate <strong>automatic spining mode</strong> for posts .
														<div style="padding-top:5px" class="description">Activate this option to spin bots posts automatically. When this option is active, any bot post gets added to your WordPress will be sent to the <a href="<?php echo $queue_url ?>">spinning queue</a>. Note that you should <b>set up the cron job below</b> for the plugin to process items that get sent to the <a href="<?php echo $queue_url ?>">spinning queue</a>.</div>


												</tr>



												<tr>
													<th scope="row"><label>Spin the title?</label></th>
													<td>

														<input name="wp_auto_spin[]" id="field-wp_auto_spin_active-1" value="OPT_AUTO_SPIN_ACTIVE_TTL" type="checkbox"> When automatically spinning an article, <strong>rewrite the post title</strong> as well.
												</tr>



												<tr>
													<th scope="row"><label>Don't spin the content?</label></th>
													<td>

														<input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_DEACTIVE_CNT" type="checkbox"> Enable this option to deactivate content spinning. Looks like a weird option but it is suitable if you want to rewrite the title only.
												</tr>

												<tr>
													<th scope="row"><label>Spin the post slug?</label></th>
													<td>

														<input name="wp_auto_spin[]" id="field-wp_auto_spin_active-1" value="OPT_AUTO_SPIN_SLUG" type="checkbox"> Rewrite the <abbr title="Permalink">post slug</abbr>.

												</tr>

												<tr>
													<th scope="row"><label>Spin links anchor text?</label></th>
													<td>

														<input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_LINKS" type="checkbox"> When rewriting an article, <strong>spin links text</strong> as well.
												</tr>

												<tr>
													<th scope="row"><label>Auto spin manual posts?</label></th>
													<td>

														<input name="wp_auto_spin[]" id="field-wp_auto_spin_active-1" value="OPT_AUTO_SPIN_ACTIVE_MANUAL" type="checkbox"> Automatically rewrite <abbr title="(This will spin the posts you write manually so when you write and preview a post, it will get spinned instantly.)(not recommended)"><strong>manually written</strong></abbr> posts.
												</tr>

												<tr>
													<th scope="row"><label>Spin instantly? </label></th>
													<td>

														<input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_PUBLISH" type="checkbox">Auto spin instantly <abbr title="Fires the spinning process once the post gets published. Regularly it gets added to the spinning queue."><strong>on publish</strong></abbr>.
														<div style="padding-top:5px" class="description">By default, Bots posts get added to the <a href="<?php echo $queue_url ?>">spinning queue</a> where the cron do process one post every minute. If you want to rewrite them instantly, activate this option.</div>
												</tr>

												<tr>
													<th scope="row"><label>Activate shuffule mode? (Not recommended)</label></th>
													<td>

														<input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_ACTIVE_SHUFFLE" type="checkbox">Replace <strong>any word</strong> from the synonyms set by any other word from the same set.

														<div class="description">By default, if we have a synonyms set in the form "word1|word2|word3" and the content contains the word "word1" it will be replaced by either "word2" or "word3". But if the post contains the word "word2", it will not be replaced as the plugin replaces the first word of the set, not the counter. By activating this option, if "word2" or "word3" exists in the content, they will be replaced by "word1" or another word from the set.</div>

												</tr>

												<tr>
													<th scope="row"><label>Spin scheduled posts instantly?</label></th>
													<td>

														<input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_SCHEDULED" type="checkbox">By default, scheduled posts get rewritten once published. Activate this if you don't want them to wait till published.

												</tr>

												<tr>
													<th scope="row"><label>Spin draft posts?</label></th>
													<td>

														<input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_DRAFT" type="checkbox">By default, draft posts get spinned once published. Activate this option if you don't want them to wait till published.

												</tr>

												<tr>
													<th scope="row"><label>Disable the spining queue? </label></th>
													<td>
														<input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_QUEUE_DISABLED" type="checkbox"> Disable processing <strong>the spinning queue</strong>.
														<div style="padding-top:5px" class="description">Activate this option if you want to disable the <a href="<?php echo $queue_url ?>">spinning queue</a>. The cron will not process any item from the queue. <br>(<b>Be carefull,</b> this option will <b>stop spinning items from the queue</b>).</div>


												</tr>

												<tr>
													<th scope="row"><label>Disable internal synonyms? </label></th>
													<td>
														<input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_NO_THESAURUS" type="checkbox"> Disable using the plugin synonyms database
														<div style="padding-top:5px" class="description">Activate this option to disable using the internal plugin synonyms in case you will only use your custom added synonyms in the "My Thesaurus" tab. </div>
												</tr>

											</tbody>
										</table>


										<p style="padding-top: 5px">

											<input class="button" name="submit" value="Save Settings" type="submit">

										</p>



									</div>
									<!--/TTWForm-contain-->



									<!-- insider End -->

								</div>
						</div>

						<div class="postbox">
							<h2 class="hndle">
								<span>Custom Post Types <span class="postbox-title-action"></span></span>
							</h2>
							<div class="inside">
								<!-- insider 3 -->

								<table class="form-table">
									<tbody>

										<tr>
											<th scope="row"><label>Post Types?</label></th>
											<td>

												<?php

												$ptype = get_post_types(array(), 'names', 'or');
												foreach ($ptype as $type) {
													if (post_type_supports($type, 'editor')) {
														$post_types[] = $type;
													}
												}

												foreach ($post_types as $post_type) {
												?>



													<input name="wp_spinner_types[]" value="<?php echo $post_type ?>" type="checkbox"> <span class="option-title">
														<?php echo $post_type ?>
													</span>


												<?php
												}

												?>

												<div class="description">Choose which post types the plugin will support, so the plugin will be enabled when editing posts from these post types.</div>


										</tr>

									</tbody>
								</table>



								<p style="padding-top: 5px">
									<input type="submit" value="Save Settings" name="submit" class="button">
								</p>



								<!-- /insider 3 -->
							</div>
						</div>


						<div class="postbox">
							<h2 class="hndle">
								<span>Cron Job Setup<span class="postbox-title-action"></span></span>
							</h2>
							<div class="inside">
								<!-- insider 3 -->

								<?php $lastrun = get_option('wp_auto_spinner_last_run', 1392146043); ?>

								<table class="form-table">
									<tbody>
										<tr>
											<th scope="row"><label>Internal Cron </label></th>
											<td>

												<input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_CRON" type="checkbox"> <span class="option-title"> Use WordPress built-in Cron instead. </span>
										</tr>
										<tr>
											<th scope="row"><label>Cron Status </label></th>
											<td>

												<p style="margin-top: -13px;"><strong>Current</strong> server time is <strong>(<?php echo  date('h:i:s', current_time('timestamp'))  ?>)</strong>, Cron last run at <strong>(<?php echo date("h:i:s", $lastrun) ?> )</strong> this is <strong> (<?php echo $timdiff = current_time('timestamp') - $lastrun ?>)</strong> seconds ago, and it runs every <strong>(60)</strong> seconds to process one item from the <a href="<?php echo $queue_url ?>">Spinning Queue</a>, So it should run again after <strong>(<?php echo (60 - $timdiff)  ?>)</strong> seconds.
										</tr>

										<tr>
											<th scope="row"><label>Run Now </label></th>
											<td>

												<?php $cronurl = site_url('?wp_auto_spinner=cron', __FILE__) ?>
												( <a target="blank" href="<?php echo $cronurl ?>">Start now </a>)

												<div class="description">Open this link to trigger the cron manually which will process one item from the <a href="<?php echo $queue_url ?>">Spinning Queue</a>.</div>
										</tr>

										<tr>
											<th scope="row"><label>Cron Command </label></th>
											<td>

												<div style="background-color: #FFFBCC; border: 1px solid #E6DB55; color: #555555; padding: 5px; width: 97%; margin-top: 10px">

													<?php

													echo 'curl ' . $cronurl;
													?>
												</div>
												<div class="description">Copy this command to your hosting Crontab. Check <a href="http://valvepress.com/wordpress-internal-cron-job-work-may-need-setup-external-cron/" target="_blank">this tutorial</a> on why and how to setup The Cron job</div>

												<p>If the above command didn't work for your host, Use the one mentioned bleow.</p>



										</tr>

										<?php ?>
										<tr>
											<th scope="row"><label>Alternate Command</label></th>
											<td>

												<div style="background-color: #FFFBCC; border: 1px solid #E6DB55; color: #555555; padding: 5px; width: 97%; margin-top: 10px">
													<?php
													//$cronpath = dirname ( __FILE__ ) . '/cron.php';
													echo 'wget -O /dev/null  ' . $cronurl;
													?>
												</div>
												<div class="description">This is another alternative to the above command, In case the above one didn't work on your host.</div>
										</tr>
										<?php  ?>

									</tbody>
								</table>


								<p style="padding-top: 5px">
									<input type="submit" class="button" name="submit" value="Save Settings">
								</p>


								<!-- /insider 3 -->
							</div>
						</div>



						<div class="postbox">
							<h2 class="hndle">
								<span>Exclusion and protected terms <span class="postbox-title-action"></span></span>
							</h2>
							<div class="inside">
								<!-- insider 3 -->

								<table class="form-table">
									<tbody>
										<tr>
											<th scope="row"><label>Exclude title words </label></th>
											<td>

												<input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_TITLE_EX" type="checkbox"> <span class="option-title"> Exclude title words from spinning in the post content . </span>
												<div class="description">Note: Title also will not be spinned if this option is active.</div>
										</tr>

										<tr>
											<th scope="row"><label>Exclude capitals in post content </label></th>
											<td>

												<input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_CAP_EX" type="checkbox"> <span class="option-title"> Exclude words starting with a capital letter. </span>
										</tr>

										<tr>
											<th scope="row"><label>Exclude capitals in post title</label></th>
											<td>

												<input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_CAP_EX_TTL" type="checkbox"> <span class="option-title"> Exclude words starting with a capital letter in title. </span>
										</tr>

										<tr>
											<th scope="row"><label>Exclude textual URLs </label></th>
											<td>

												<input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_URL_EX" type="checkbox"> <span class="option-title">Activate this if you want to skip rewriting the URLs written without the hyperlink HTML tag (i.e., not hyperlinked). </span>
										</tr>

										<tr>
											<th scope="row"><label>Exclude smart quotes </label></th>
											<td>

												<input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_CURLY_EX" type="checkbox"> <span class="option-title">Activating this option will exclude the text inside single quotes (‘ ’), double quotes (“ ”), and curly quotes. </span>
										</tr>

										<tr>
											<th scope="row"><label>Exclude regular quotes </label></th>
											<td>

												<input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_CURLY_EX_R" type="checkbox"> <span class="option-title"> This option will exclude text inside double quotes (" "). </span>
										</tr>



										<tr>
											<th scope="row"><label>Reserved words </label></th>
											<td>

												<textarea style="width: 100%" rows="5" cols="20" name="wp_auto_spinner_execlude" id="field-wp_auto_spinner_execlude"><?php echo stripslashes($wp_auto_spinner_execlude) ?></textarea>
												<div class="description">Words in this box will not be rewritten. Add them one per line.</div>
										</tr>
										<tr>
											<th scope="row"><label>Excluded categories </label></th>
											<td>

												<div id="taxonomy-category" class="categorydiv">
													<div id="category-all" class="tabs-panel">
														<input type="hidden" name="post_category[]" value="0">
														<ul id="categorychecklist" data-wp-lists="list:category" class="categorychecklist form-no-clear">
															<?php wp_category_checklist(); ?>
														</ul>
													</div>

												</div>
												<div class="description">Posts belonging to these categories will not be rewritten.</div>
										</tr>

									</tbody>
								</table>



								<p style="padding-top: 5px">
									<input type="submit" value="Save Settings" name="submit" class="button">
								</p>

								<!-- /insider 3 -->
							</div>
						</div>


						<div class="postbox spinning_method_wrap">
							<h2 class="hndle">
								<span>Spinning method<span class="postbox-title-action"></span></span>
							</h2>
							<div class="inside">
								<!-- insider 3 -->

								<p>By default, the plugin uses its private synonyms database, but you still can use any of the six most popular APIs to rewrite the posts.</p>

								<table class="form-table">


									<tr>
										<th scope="row">Method </td>
										<td>

											<input class="spin_method_selector" name="wp_auto_spin[]" value="OPT_AUTO_INTERNAL" type="radio"> <span class="option-title"> Use built-in synonyms database . </span>
											<br><input class="spin_method_selector" name="wp_auto_spin[]" value="OPT_AUTO_SPIN_REWRITER" type="radio"> <span class="option-title"> Use SpinRewriter.com API </span>
											<br><input class="spin_method_selector" name="wp_auto_spin[]" value="OPT_AUTO_SPIN_CR" type="radio"> <span class="option-title"> Use ChimpRewriter API </span>
											<br><input class="spin_method_selector" name="wp_auto_spin[]" value="OPT_AUTO_SPIN_WORDAI" type="radio"> <span class="option-title"> Use wordai.com API </span>
											<br><input class="spin_method_selector" name="wp_auto_spin[]" value="OPT_AUTO_SPIN_TBS" type="radio"> <span class="option-title"> Use TheBestSpinner API </span>
											<br><input class="spin_method_selector" name="wp_auto_spin[]" value="OPT_AUTO_SPIN_CP" type="radio"> <span class="option-title"> Use ContentProfessor API </span>
											<br><input class="spin_method_selector" name="wp_auto_spin[]" value="OPT_AUTO_SPIN_SC" type="radio"> <span class="option-title"> Use SpinnerChief API</span>
											<br><input class="spin_method_selector" name="wp_auto_spin[]" value="OPT_AUTO_SPIN_BOT" type="radio"> <span class="option-title"> Use SpinBot API</span>
											<br><input class="spin_method_selector" name="wp_auto_spin[]" value="OPT_AUTO_SPIN_QU" type="radio"> <span class="option-title"> Use QuillBot API</span>
											<br><input class="spin_method_selector" name="wp_auto_spin[]" value="OPT_AUTO_SPIN_ES" type="radio"> <span class="option-title"> Use Espinner.net API (Spanish only). </span>
										</td>
									</tr>


								</table>

								<p style="padding-top: 5px">
									<input type="submit" value="Save Settings" name="submit" class="button">
								</p>



								<!-- /insider 3 -->
							</div>
						</div>



						<div class="postbox OPT_AUTO_SPIN_REWRITER spin_method_box">
							<h2 class="hndle">
								<span>Spin Rewriter (OPTIONAL) <span class="postbox-title-action"></span></span>
							</h2>
							<div class="inside">
								<!-- insider 3 -->

								<p>Sign up for <a href="http://www.spinrewriter.com/?ref=11ade">SpinRewiter</a> to rewrite the posts using its API. Spin Rewriter actually understands the text and only suggests meaningful synonyms.</p>



								<table class="form-table">


									<tr>
										<th scope="row">SpinRewriter email </td>
										<td><input style="width:100%" value="<?php echo $wp_auto_spinner_email;  ?>" name="wp_auto_spinner_email" id="field-spinner-email" type="text"></td>
									</tr>

									<tr>
										<th scope="row">SpinRewriter api key </td>
										<td><input style="width:100%" value="<?php echo $wp_auto_spinner_password;  ?>" name="wp_auto_spinner_password" id="field-spinner-password" type="password"></td>
									</tr>

									<?php

									if (trim($wp_auto_spinner_email) != '' && trim($wp_auto_spinner_password) != '') {

										require_once("inc/SpinRewriterAPI.php");

										// Authenticate yourself.
										$spinrewriter_api = new SpinRewriterAPI($wp_auto_spinner_email, $wp_auto_spinner_password);

										// Make the actual API request and save response as a native PHP array.
										$api_response = $spinrewriter_api->getQuota();

										// Output the API response.
										if (isset($api_response['response'])) {
											echo '<tr><th scope="row">Status</th><td>' . $api_response['response'] . '</td></tr>';
										}
									}

									?>

									<tr>
										<th scope="row">Safe mode? </th>
										<td><input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_SR_SAFE" type="checkbox"> <span class="option-title"> In this mode, the plugin will not trust the returned content from the service but will only extract the synonyms and will apply them on the original content. By default, we send the content and recieve it rewritten but sometimes the service may mess with the content by adding unwanted content or removing parts of it. This mode makes sure your content does not get deformed </span></td>
									</tr>
									<tr>

									<tr>
										<th scope="row">Confidence Level</td>
										<td>


											<select name="wp_auto_spinner_quality">
												<option value="low" <?php opt_selected('low', $wp_auto_spinner_quality) ?>>Low</option>
												<option value="medium" <?php opt_selected('medium', $wp_auto_spinner_quality) ?>>Medium</option>
												<option value="high" <?php opt_selected('high', $wp_auto_spinner_quality) ?>>High</option>


											</select>


										</td>
									</tr>
									<?php /*
									<tr>
										<th scope="row">Nested Spin  </th>
										<td><input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_NestedSpintax" type="checkbox"> <span class="option-title"> Set whether the One-Click Rewrite process uses nested spinning syntax (multi-level spinning) or not. . </span></td>
									</tr>
									*/
									?>

									<tr>
										<th scope="row">Note </th>
										<td><span style="color:red">Important:</span> Activating options below may cause html layout to break or result in ***** appearing at the content, So use carefully and if you got html broken,deactivate them. unfortunately html tags locations may get messed using these options.</td>
									</tr>

									<tr>
										<th scope="row">Auto Sentences </th>
										<td><input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_AutoSentences" type="checkbox"> <span class="option-title"> <span style="color:red">[Not recommended]</span> Set whether Spin Rewriter rewrites complete sentences on its own. </span></td>
									</tr>
									<tr>
										<th scope="row">Auto Paragraphs </th>
										<td><input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_AutoParagraphs" type="checkbox"> <span class="option-title"><span style="color:red">[Not recommended]</span> Set whether Spin Rewriter rewrites entire paragraphs on its own. </span></td>
									</tr>
									<tr>
										<th scope="row">Auto New Paragraphs </th>
										<td><input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_AutoNewParagraphs" type="checkbox"> <span class="option-title"><span style="color:red">[Not recommended]</span> Set whether Spin Rewriter writes additional paragraphs on its own. </span></td>
									</tr>
									<tr>
										<th scope="row">Auto Sentence Trees</th>
										<td><input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_AutoSentenceTrees" type="checkbox"> <span class="option-title"><span style="color:red">[Not recommended]</span> Set whether Spin Rewriter changes the entire structure of phrases and sentences.</span></td>
									</tr>

									<tr>
										<th scope="row">Auto Protected Terms</th>
										<td><input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_AutoProtectedTerms" type="checkbox"> <span class="option-title"><span style="color:red">[Not recommended]</span> Set whether Spin Rewriter protect capped letters from spinning.</span></td>
									</tr>




								</table>

								<p style="padding-top: 5px">
									<input type="submit" value="Save Settings" name="submit" class="button">
								</p>



								<!-- /insider 3 -->
							</div>
						</div>




						<div class="postbox OPT_AUTO_SPIN_WORDAI  spin_method_box ">
							<h2 class="hndle">
								<span>WordAI API (OPTIONAL) <span class="postbox-title-action"></span></span>
							</h2>
							<div class="inside">
								<!-- insider 3 -->

								<p>Sign up for <a href="http://wordai.com/?ref=4ha50">WordAI</a> API to spin the posts. WordAi fully understands what each word content means and replace properly.</p>



								<table class="form-table">


									<tr>
										<th scope="row">WordAI email </td>
										<td><input style="width:100%" value="<?php echo $wp_auto_spinner_wordai_email;  ?>" name="wp_auto_spinner_wordai_email" type="text"></td>
									</tr>

									<tr>
										<th scope="row">WordAI password </td>
										<td><input style="width:100%" value="<?php echo $wp_auto_spinner_wordai_password;  ?>" name="wp_auto_spinner_wordai_password" type="password"></td>
									</tr>


									<tr>
										<th scope="row">WordAI Quality </td>
										<td>


											<select name="wp_auto_spinner_wordai_quality">
												<option value="Regular" <?php opt_selected('Regular', $wp_auto_spinner_wordai_quality) ?>>Regular</option>
												<option value="Unique" <?php opt_selected('Unique', $wp_auto_spinner_wordai_quality) ?>>Unique</option>
												<option value="Very Unique" <?php opt_selected('Very Unique', $wp_auto_spinner_wordai_quality) ?>>Very Unique</option>
												<option value="Readable" <?php opt_selected('Readable', $wp_auto_spinner_wordai_quality) ?>>Readable</option>
												<option value="Very Readable" <?php opt_selected('Very Readable', $wp_auto_spinner_wordai_quality) ?>>Very Readable</option>
											</select>

										</td>
									</tr>

									<tr>
										<th scope="row">Safe mode? </th>
										<td><input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_WORDAI_SAFE" type="checkbox"> <span class="option-title"> In this mode, the plugin will not trust the returned content from the service but will only extract the synonyms and will apply them on the original content. By default, we send the content and recieve it rewritten but sometimes the service may mess with the content by adding unwanted content or removing parts of it. This mode makes sure your content does not get deformed </span></td>
									</tr>

									<tr>
										<th scope="row">Perfect tense</th>
										<td><input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_WORDAI_PERFECT" type="checkbox"> <span class="option-title">Perfect Tense automatically fixes any grammar errors. (Additional feature which requies separate subscription If you do not have Perfect Tense API then <a href="https://perfecttense.com/">sign up here</a> if you like + add the perfect tense API key to your WordAI Integrations page) </span></td>
									</tr>

									<tr>
										<th scope="row">Note </th>
										<td><span style="color:red">Important:</span> Activating options below may cause html layout to break or result in ***** appearing at the content, So use carefully and if you got html broken,deactivate them. unfortunately html tags locations may get messed using these options.</td>
									</tr>

									<tr>
										<th scope="row">Sentence</th>
										<td><input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_WORDAI_SENTENCE" type="checkbox"> <span class="option-title"><span style="color:red">[Not recommended]</span> Tick if you want paragraph editing, where WordAi will add, remove, or switch around the order of sentences in a paragraph. </span></td>
									</tr>

									<tr>
										<th scope="row">Paragraph</th>
										<td><input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_WORDAI_PARAGRAPH" type="checkbox"> <span class="option-title"><span style="color:red">[Not recommended]</span> If you want WordAi to do paragraph spinning - perfect for if you plan on using the same spintax many times. </span></td>
									</tr>







								</table>

								<p style="padding-top: 5px">
									<input type="submit" value="Save Settings" name="submit" class="button">
								</p>



								<!-- /insider 3 -->
							</div>
						</div>


						<div class="postbox OPT_AUTO_SPIN_TBS  spin_method_box">
							<h2 class="hndle">
								<span>The Best Spinner (OPTIONAL) <span class="postbox-title-action"></span></span>
							</h2>
							<div class="inside">
								<!-- insider 3 -->

								<p>Sign up for <a href="https://paykstrt.com/10313/57123">TheBestSPinner</a> API to spin the posts using it.</p>



								<table class="form-table">


									<tr>
										<th scope="row">TheBestSpinner email </td>
										<td><input style="width:100%" value="<?php echo $wp_auto_spinner_tbs_email;  ?>" name="wp_auto_spinner_tbs_email" type="text"></td>
									</tr>

									<tr>
										<th scope="row">TheBestSpinner password </td>
										<td><input style="width:100%" value="<?php echo $wp_auto_spinner_tbs_password;  ?>" name="wp_auto_spinner_tbs_password" type="password"></td>
									</tr>


									<tr>
										<th scope="row">TheBestSpinner maxsyns </td>
										<td><input style="width:100%" value="<?php echo $wp_auto_spinner_tbs_maxsyns;  ?>" name="wp_auto_spinner_tbs_maxsyns" type="text">
											<div class="description">(the maximum number of synonyms to return for a word/phrase).</div>
										</td>
									</tr>

									<tr>
										<th scope="row">Quality</td>
										<td>


											<select name="wp_auto_spinner_tbs_quality">
												<option value="1" <?php opt_selected('1', $wp_auto_spinner_tbs_quality) ?>>Good</option>
												<option value="2" <?php opt_selected('2', $wp_auto_spinner_tbs_quality) ?>>Better</option>
												<option value="3" <?php opt_selected('3', $wp_auto_spinner_tbs_quality) ?>>Best</option>
											</select>


										</td>
									</tr>






								</table>

								<p style="padding-top: 5px">
									<input type="submit" value="Save Settings" name="submit" class="button">
								</p>



								<!-- /insider 3 -->
							</div>
						</div>


						<div class="postbox OPT_AUTO_SPIN_BOT  spin_method_box">
							<h2 class="hndle">
								<span>SpinBot.com (OPTIONAL) <span class="postbox-title-action"></span></span>
							</h2>
							<div class="inside">
								<!-- insider 3 -->

								<p>Sign up for <a href="http://spinbot.com/">spinbot.com</a> API to spin your posts.</p>

								<table class="form-table">

									<tr>
										<th scope="row">API key </td>
										<td><input style="width:100%" value="<?php echo get_option('wp_auto_spinner_bot_key', '');  ?>" name="wp_auto_spinner_bot_key" type="text"></td>
									</tr>




								</table>

								<p style="padding-top: 5px">
									<input type="submit" value="Save Settings" name="submit" class="button">
								</p>



								<!-- /insider 3 -->
							</div>
						</div>


						<div class="postbox OPT_AUTO_SPIN_QU  spin_method_box">
							<h2 class="hndle">
								<span>quillbot.com (OPTIONAL) <span class="postbox-title-action"></span></span>
							</h2>
							<div class="inside">
								<!-- insider 3 -->

								<p>Sign up for <a href="https://quillbot.com/api-access">quillbot.com</a> API to spin your posts.</p>

								<table class="form-table">

									<tr>
										<th scope="row">API key </td>
										<td><input style="width:100%" value="<?php echo get_option('wp_auto_spinner_qu_key', '');  ?>" name="wp_auto_spinner_qu_key" type="text"></td>
									</tr>


								</table>

								<p style="padding-top: 5px">
									<input type="submit" value="Save Settings" name="submit" class="button">
								</p>



								<!-- /insider 3 -->
							</div>
						</div>

						<div class="postbox OPT_AUTO_SPIN_ES  spin_method_box">
							<h2 class="hndle">
								<span>Espinner.net (OPTIONAL) <span class="postbox-title-action"></span></span>
							</h2>
							<div class="inside">
								<!-- insider 3 -->

								<p>Sign up for <a href="http://espinner.net/">Espinner.net</a> API to spin your posts in Spanish.</p>



								<table class="form-table">


									<tr>
										<th scope="row">Espinner email </td>
										<td><input style="width:100%" value="<?php echo get_option('wp_auto_spinner_es_email', '');  ?>" name="wp_auto_spinner_es_email" type="text"></td>
									</tr>

									<tr>
										<th scope="row">Espinner API key </td>
										<td><input style="width:100%" value="<?php echo  get_option('wp_auto_spinner_es_password', '');  ?>" name="wp_auto_spinner_es_password"></td>
									</tr>


								</table>

								<p style="padding-top: 5px">
									<input type="submit" value="Save Settings" name="submit" class="button">
								</p>



								<!-- /insider 3 -->
							</div>
						</div>


						<div class="postbox OPT_AUTO_SPIN_CP spin_method_box">
							<h2 class="hndle">
								<span>ContentProfessor API (OPTIONAL) <span class="postbox-title-action"></span></span>
							</h2>
							<div class="inside">
								<!-- insider 3 -->

								<p>By default, the plugin uses its internal synonyms database, but you still can use <a href="http://www.contentprofessor.com/go.php?offer=sweetheatm">ContentProfessor</a> API to spin the posts.</p>



								<table class="form-table">



									<tr>
										<th scope="row">ContentProfessor username </td>
										<td><input style="width:100%" value="<?php echo $wp_auto_spinner_cp_email;  ?>" name="wp_auto_spinner_cp_email" type="text"></td>
									</tr>

									<tr>
										<th scope="row">ContentProfessor password </td>
										<td><input style="width:100%" value="<?php echo $wp_auto_spinner_cp_password;  ?>" name="wp_auto_spinner_cp_password" type="password"></td>
									</tr>

									<tr>
										<th scope="row">Member Type</td>
										<td>


											<select name="wp_auto_spinner_cp_type">
												<option value="free" <?php opt_selected('free', $wp_auto_spinner_cp_type) ?>>Free User</option>
												<option value="pro" <?php opt_selected('pro', $wp_auto_spinner_cp_type) ?>>Pro user (paid)</option>

											</select>


										</td>
									</tr>



									<tr>
										<th scope="row">language</td>
										<td>


											<select name="wp_auto_spinner_cp_language">
												<option value="en" <?php opt_selected('en', $wp_auto_spinner_cp_language) ?>>English</option>
												<option value="es" <?php opt_selected('es', $wp_auto_spinner_cp_language) ?>>Spanish</option>
												<option value="fr" <?php opt_selected('fr', $wp_auto_spinner_cp_language) ?>>French</option>
												<option value="de" <?php opt_selected('de', $wp_auto_spinner_cp_language) ?>>German</option>
												<option value="it" <?php opt_selected('it', $wp_auto_spinner_cp_language) ?>>Italian</option>
											</select>


										</td>
									</tr>


									<tr>
										<th scope="row">ContentProfessor maxsyns </td>
										<td><input style="width:100%" value="<?php echo $wp_auto_spinner_cp_limit;  ?>" name="wp_auto_spinner_cp_limit" type="text">
											<div class="description">(the maximum number of synonyms to return for a word/phrase).</div>
										</td>
									</tr>


									<tr>
										<th scope="row">Quality</td>
										<td>


											<select name="wp_auto_spinner_cp_quality">
												<option value="ok" <?php opt_selected('ok', $wp_auto_spinner_cp_quality) ?>>OK</option>
												<option value="better" <?php opt_selected('better', $wp_auto_spinner_cp_quality) ?>>Better</option>
												<option value="ideal" <?php opt_selected('ideal', $wp_auto_spinner_cp_quality) ?>>Ideal</option>

											</select>


										</td>
									</tr>


									<tr>
										<th scope="row">Synonyms set</td>
										<td>


											<select name="wp_auto_spinner_cp_synonym_set">
												<option value="global" <?php opt_selected('global', $wp_auto_spinner_cp_synonym_set) ?>>Global</option>
												<option value="my" <?php opt_selected('my', $wp_auto_spinner_cp_synonym_set) ?>>My sets</option>
											</select>


											<div class="description">Select "My" only if you want to use your saved synonyms sets at contentProcessor site</div>


										</td>
									</tr>



									<tr>
										<th scope="row">ContentProfessor minimum word count </td>
										<td><input style="width:100%" value="<?php echo $wp_auto_spinner_cp_min_words_count;  ?>" name="wp_auto_spinner_cp_min_words_count" type="text">
											<div class="description">(Minimum word count in a synonym phrase. Default:1).</div>
										</td>
									</tr>

									<tr>
										<th scope="row">ContentProfessor maximum word count </td>
										<td><input style="width:100%" value="<?php echo $wp_auto_spinner_cp_max_words_count;  ?>" name="wp_auto_spinner_cp_max_words_count" type="text">
											<div class="description">(Maximum word count in a synonym phrase. Default:7).</div>
										</td>
									</tr>


									<tr>
										<th scope="row">Disable Removal </td>
										<td><input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_CP_REMOVAL" type="checkbox"> <span class="option-title"> Disable ContentProfessor Removal . </span>
											<div class="description">Disable use current member account removal in method operations.</div>
										</td>

									</tr>

									<tr>
										<th scope="row">Disable excludes </td>
										<td><input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_CP_EXECLUDE" type="checkbox"> <span class="option-title"> Exclude member excludes from spin operations.</span>
											<div class="description">Disable use current member account removal in method operations.</div>
										</td>

									</tr>

									<tr>
										<th scope="row">Disable execluding stop words </td>
										<td><input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_CP_STOP" type="checkbox"> <span class="option-title"> Exclude member excludes from spin operations.</span>
											<div class="description">Disable Exclude stop words from spin operations..</div>
										</td>

									</tr>


								</table>

								<p style="padding-top: 5px">
									<input type="submit" value="Save Settings" name="submit" class="button">
								</p>



								<!-- /insider 3 -->
							</div>
						</div>







						<div class="postbox OPT_AUTO_SPIN_SC  spin_method_box">
							<h2 class="hndle">
								<span>SpinnerChief (OPTIONAL) <span class="postbox-title-action"></span></span>
							</h2>
							<div class="inside">
								<!-- insider 3 -->

								<p>By Default, the plugin uses its internal synonyms database but you still can use <a href="http://www.whitehatbox.com/Agents/SSS?code=o484rg1x4/BSxXSuwed4BY9KWRedbqx1GSapvkPuytaDOooV9SfW4A==">SpinnerChief</a> API to spin the posts .</p>
								<p><b>Alert:</b> ultimate spin (SpinnerChief3) will not work, only Free and Elite Spin work, check this <a target="_blank" href="https://monosnap.com/file/kgw8QmAOZSggR8GVT6OJk0k7T1TaZS">screenshot</a>


								<table class="form-table">



									<tr>
										<th scope="row">SpinnerChief username </td>
										<td><input style="width:100%" value="<?php echo $wp_auto_spinner_sc_email;  ?>" name="wp_auto_spinner_sc_email" type="text"></td>
									</tr>

									<tr>
										<th scope="row">SpinnerChief password </td>
										<td><input style="width:100%" value="<?php echo $wp_auto_spinner_sc_password;  ?>" name="wp_auto_spinner_sc_password" type="password"></td>
									</tr>


									<tr>
										<th scope="row">SpinnerChief spin freqency </td>
										<td><input style="width:100%" value="<?php echo $wp_auto_spinner_sc_spinfreq;  ?>" name="wp_auto_spinner_sc_spinfreq" type="text">
											<div class="description">( The spinfreq means word spin frequency, for example if spinfreq=1, every word will be spun, if spinfreq=3, 1/3 of all words will be spun, etc. Default:4).</div>
										</td>
									</tr>

									<tr>
										<th scope="row">SpinnerChief words count </td>
										<td><input style="width:100%" value="<?php echo $wp_auto_spinner_sc_Wordscount;  ?>" name="wp_auto_spinner_sc_Wordscount" type="text">
											<div class="description">( how many words to use for single synonym. Default:5).</div>
										</td>
									</tr>


									<tr style="display:none;">
										<th scope="row">Language</td>
										<td>

											<?php $sclangs = explode(',', 'Arabic,Belarusian,Bulgarian,Croatian,Danish,Dutch,English,Filipino,Finnish,French,German,Greek,Hebrew,Indonesian,Italian,Lithuanian,Norwegian,Polish,Portuguese,Romanian,Slovak,Slovenian,Spanish,Swedish,Turkish,Vietnamese'); ?>

											<select name="wp_auto_spinner_sc_thesaurus">

												<?php foreach ($sclangs as $lang) {
													echo '<option value="' . $lang . '" ';
													opt_selected($lang, $wp_auto_spinner_sc_thesaurus);
													echo '>' . $lang . '</option>';
												} ?>
											</select>


										</td>
									</tr>



									<tr>
										<th scope="row">Word quality</td>
										<td>


											<select name="wp_auto_spinner_sc_wordquality">
												<option value="0" <?php opt_selected('0', $wp_auto_spinner_sc_wordquality) ?>>Best Thesaurus to spin </option>
												<option value="1" <?php opt_selected('1', $wp_auto_spinner_sc_wordquality) ?>>Better Thesaurus to spin </option>
												<option value="2" <?php opt_selected('2', $wp_auto_spinner_sc_wordquality) ?>>Good Thesaurus to spin </option>
												<option value="3" <?php opt_selected('3', $wp_auto_spinner_sc_wordquality) ?>>All Thesaurus to spin </option>
												<option value="9" <?php opt_selected('9', $wp_auto_spinner_sc_wordquality) ?>>Everyone’s favorite to spin </option>
											</select>


										</td>
									</tr>

									<tr>
										<th scope="row">Replace type</td>
										<td>


											<select name="wp_auto_spinner_sc_replacetype">
												<option value="0" <?php opt_selected('0', $wp_auto_spinner_sc_replacetype) ?>>Replace phrase and word</option>
												<option value="1" <?php opt_selected('1', $wp_auto_spinner_sc_replacetype) ?>>Only replace phrase </option>
												<option value="2" <?php opt_selected('2', $wp_auto_spinner_sc_replacetype) ?>>Only replace word</option>
												<option value="3" <?php opt_selected('3', $wp_auto_spinner_sc_replacetype) ?>>Replace phrase first, then replace word till the article passes copyscape</option>
												<option value="4" <?php opt_selected('4', $wp_auto_spinner_sc_replacetype) ?>>Spin the article to most unique </option>
												<option value="5" <?php opt_selected('5', $wp_auto_spinner_sc_replacetype) ?>>Spin the article to most readable </option>
											</select>


										</td>
									</tr>


									<tr>
										<th scope="row">Use Pos </td>
										<td><input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_SC_POS" type="checkbox"> <span class="option-title"> Use part of speech analysis . </span></td>
									</tr>

									<tr>
										<th scope="row">Use GrammerAI </td>
										<td><input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_SC_GAI" type="checkbox"> <span class="option-title"> Use grammar correction . </span></td>
									</tr>


								</table>

								<p style="padding-top: 5px">
									<input type="submit" value="Save Settings" name="submit" class="button">
								</p>



								<!-- /insider 3 -->
							</div>
						</div>

						<div class="postbox OPT_AUTO_SPIN_CR spin_method_box">
							<h2 class="hndle">
								<span>ChimpRewriter (OPTIONAL) <span class="postbox-title-action"></span></span>
							</h2>
							<div class="inside">
								<!-- insider 3 -->

								<p>Sign up for <a href="http://chimprewriter.com?a_aid=55006517c7d97">ChimpRewriter</a> API to spin the posts. Chimp Rewriter's technology is built upon exhaustive research on Natural Language Processing.</p>



								<table class="form-table">



									<tr>
										<th scope="row">ChimpRewriter email </td>
										<td><input style="width:100%" value="<?php echo $wp_auto_spinner_cr_email;  ?>" name="wp_auto_spinner_cr_email" type="text"></td>
									</tr>

									<tr>
										<th scope="row">ChimpRewriter apikey </td>
										<td><input style="width:100%" value="<?php echo $wp_auto_spinner_cr_apikey;  ?>" name="wp_auto_spinner_cr_apikey" type="password"></td>
									</tr>

									<tr>
										<th scope="row">Quality</td>
										<td>


											<select name="wp_auto_spinner_cr_quality">
												<option value="5" <?php opt_selected('5', $wp_auto_spinner_cr_quality) ?>>Best </option>
												<option value="4" <?php opt_selected('4', $wp_auto_spinner_cr_quality) ?>>Better </option>
												<option value="3" <?php opt_selected('3', $wp_auto_spinner_cr_quality) ?>>Good </option>
												<option value="2" <?php opt_selected('2', $wp_auto_spinner_cr_quality) ?>>Average </option>
												<option value="1" <?php opt_selected('1', $wp_auto_spinner_cr_quality) ?>>All </option>
											</select>


										</td>
									</tr>

									<tr>
										<th scope="row">Phrase quality</td>
										<td>


											<select name="wp_auto_spinner_cr_phrasequality">
												<option value="5" <?php opt_selected('5', $wp_auto_spinner_cr_phrasequality) ?>>Best </option>
												<option value="4" <?php opt_selected('4', $wp_auto_spinner_cr_phrasequality) ?>>Better </option>
												<option value="3" <?php opt_selected('3', $wp_auto_spinner_cr_phrasequality) ?>>Good </option>
												<option value="2" <?php opt_selected('2', $wp_auto_spinner_cr_phrasequality) ?>>Average </option>
												<option value="1" <?php opt_selected('1', $wp_auto_spinner_cr_phrasequality) ?>>All </option>
											</select>

											<div class="description">
												Phrase replacement quality
											</div>


										</td>
									</tr>

									<tr>
										<th scope="row">Pos match</td>
										<td>


											<select name="wp_auto_spinner_cr_posmatch">

												<option value="3" <?php opt_selected('3', $wp_auto_spinner_cr_posmatch) ?>>Full</option>
												<option value="2" <?php opt_selected('2', $wp_auto_spinner_cr_posmatch) ?>>Loose </option>
												<option value="1" <?php opt_selected('1', $wp_auto_spinner_cr_posmatch) ?>>Extremely Loose </option>
												<option value="0" <?php opt_selected('0', $wp_auto_spinner_cr_posmatch) ?>>none </option>

											</select>

											<div class="description">
												Required Part of Speech (POS) match for a spin:
											</div>



										</td>
									</tr>



									<tr>

										<td colspan="2">

											Spins or rewrites an article. Standard spinning costs 1 credit per 5000 words. Advanced spinning costs 1 credit per 500 words. A spin is “advanced” if any of the advanced parameters below are set to 1.

										</td>

									</tr>


									<tr>
										<th scope="row">Use sentencerewrite (Advanced) </td>
										<td><input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_CR_SREWRITE" type="checkbox"> <span class="option-title">Check to use artificial intelligence tools to automatically rewrite sentences . </span></td>
									</tr>

									<tr>
										<th scope="row">Use Grammer Check (Advanced) </td>
										<td><input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_CR_GCHECK" type="checkbox"> <span class="option-title"> Use grammar correction . </span></td>
									</tr>

									<tr>
										<th scope="row">Reorder Paragraphs </td>
										<td><input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_CR_reorderparagraphs" type="checkbox"> <span class="option-title"> Randomly reorder paragraphs . </span></td>
									</tr>

									<tr>
										<th scope="row">Replace phrases with phrases </td>
										<td><input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_CR_replacephraseswithphrases" type="checkbox"> <span class="option-title"> Always replace phrases with equivalent phrases, regardless of quality. Results in a huge amount of spin but may not yield the best quality.</span></td>
									</tr>

									<tr>
										<th scope="row">Disable spintidy</td>
										<td><input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_CR_spintidy" type="checkbox"> <span class="option-title">Runs a spin tidy pass over the result article. This fixes any common a/an type grammar mistakes and repeated words due to phrase spinning. Generally increases the quality of the article.</span></td>
									</tr>


								</table>

								<p style="padding-top: 5px">
									<input type="submit" value="Save Settings" name="submit" class="button">
								</p>



								<!-- /insider 3 -->
							</div>
						</div>

					<?php } ?>

					<?php  /*?>
						<div class="postbox" >
							<h2 class="hndle">
								<span>License<span class="postbox-title-action"></span></span>
							</h2>
							<div class="inside">
								<!-- insider 3 -->

						 		<table class="form-table">
									<tbody>



										<tr>
											<th scope="row"><label>Purchase Code</label></th>
											<td><input class="widefat" name="wp_auto_spinner_license" value="<?php echo get_option('wp_auto_spinner_license','') ?>"   type="text">

												<div class="description">If you don't know what is your purchase code check this <a href="http://www.youtube.com/watch?v=eAHsVR_kO7A">video</a> on how to get it   .</div></td>
										</tr>

										<?php if( isset($license_error) && stristr($license_error,	 'another')  ) {?>

										<tr>
											<th scope="row"><label> Change domain </label></th>
											<td><input name="wp_auto_spin[]"   value="OPT_CHANGE_DOMAIN" type="checkbox"> <span class="option-title"> Disable license at the other domain and use it with this domain </span></td>
										</tr>

										<?php } ?>

										<tr>
											<th scope="row"><label>License Status</label></th>
											<td>

												<div class="description"><?php

												if(trim($license_active) !=''){
													echo 'Active';
												}else{
													echo 'Inactive ';
													if(isset($license_error)) echo '<p><span style="color:red">'.$license_error.'</span></p>';
												}

												?></div></td>
										</tr>


									</tbody>
								</table>

								<p style="padding-top: 5px">
									<input type="submit" class="button" name="submit" value="Save Settings">
								</p>


								<!-- /insider 3 -->
							</div>
						</div>

						<?php */ ?>

					</div>
				</div>


			</div>


			<div class="clear"></div>

		</form>
		<!--/TTWForm-->
	</div>

	<script type="text/javascript">
		<?php $opt = get_option('wp_auto_spin', array());

		if (in_array('OPT_AUTO_SPIN_REWRITER', $opt)) {
		} elseif (in_array('OPT_AUTO_SPIN_WORDAI', $opt)) {
		} elseif (in_array('OPT_AUTO_SPIN_TBS', $opt)) {
		} elseif (in_array('OPT_AUTO_SPIN_CP', $opt)) {
		} elseif (in_array('OPT_AUTO_SPIN_SC', $opt)) {
		} elseif (in_array('OPT_AUTO_SPIN_CR', $opt)) {
		} elseif (in_array('OPT_AUTO_SPIN_ES', $opt)) {
		} elseif (in_array('OPT_AUTO_SPIN_BOT', $opt)) {
		} elseif (in_array('OPT_AUTO_SPIN_QU', $opt)) {
		} else {

			$opt[] = 'OPT_AUTO_INTERNAL';
		}

		?>

		var $vals = '<?php $wp_spinner_types = get_option('wp_spinner_types', array('post', 'product'));
									print_r(implode('|', array_merge($opt, $wp_spinner_types))); ?>';



		//generic options
		$val_arr = $vals.split('|');
		jQuery('input:checkbox').removeAttr('checked');
		jQuery.each($val_arr, function(index, value) {
			if (value != '') {
				jQuery('input:checkbox[value="' + value + '"]').prop('checked', true);
				jQuery('input:radio[value="' + value + '"]').prop('checked', true);
			}
		});

		//spin execludes options
		var $vals = '<?php $opt = get_option('wp_auto_spin_execl', array());
									print_r(implode('|', $opt)); ?>';
		$val_arr = $vals.split('|');

		jQuery.each($val_arr, function(index, value) {
			if (value != '') {
				jQuery('input:checkbox[value="' + value + '"]').prop('checked', true);

			}
		});


		//show hide spinning boxs for other methods

		jQuery('.spinning_method_wrap input[type="radio"]').change(

			function() {
				showHideSpinBox();
			}

		);

		function showHideSpinBox() {

			jQuery('.spin_method_selector:checked').each(function() {

				jQuery('.spin_method_box').hide();

				jQuery('.' + jQuery(this).val()).show();

				console.log(jQuery(this).val());

			});

		}

		//initial trigger
		showHideSpinBox();
	</script>

<?php } ?>