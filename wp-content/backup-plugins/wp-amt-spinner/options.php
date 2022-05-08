<?php function wp_auto_spinner_settings(){ ?>

<?php
 
$itm_prefix='wp_auto_spinner';
$itm_id = 4092452 ;
//delete_option($itm_prefix.'_license_active');
$proxify = true;



// v3.2.1
//$license_active=get_option($itm_prefix.'_license_active','');
$license_active = 'yes';


//purchase check
if( isset($_POST[$itm_prefix.'_license']) && trim($license_active) === '' ){

	//save it
	update_option($itm_prefix.'_license' , $_POST[ $itm_prefix.'_license'] );

	//activating
	//curl ini
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_HEADER,0);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
	curl_setopt($ch, CURLOPT_TIMEOUT,20);
	curl_setopt($ch, CURLOPT_REFERER, 'http://www.bing.com/');
	curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.8) Gecko/2009032609 Firefox/3.0.8');
	curl_setopt($ch, CURLOPT_MAXREDIRS, 5); // Good leeway for redirections.
	//curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); // Many login forms redirect at least once.
	curl_setopt($ch, CURLOPT_COOKIEJAR , "cookie.txt");

	//curl get
	$x='error';

	//change domain ?
	$append='';

	if( isset($_POST['wp_auto_spin']) && in_array('OPT_CHANGE_DOMAIN', $_POST['wp_auto_spin']) ){
		$append='&changedomain=yes';
	}

	
	$url='http://wpamt.com/license/index.php?itm='.$itm_id.'&domain='.$_SERVER['HTTP_HOST'].'&purchase='.trim($_POST[$itm_prefix.'_license']).$append;

	if(WP_VALVE_PROXY) $url = 'http://labnol-proxy-server.appspot.com/'.str_replace('http://', '', $url);
	
	curl_setopt($ch, CURLOPT_HTTPGET, 1);
	curl_setopt($ch, CURLOPT_URL, trim($url));
	while (trim($x) != ''  ){
		$exec=curl_exec($ch);
		$x=curl_error($ch);
	}

	$resback=$exec;

	$resarr=json_decode($resback);

	if(isset($resarr->message)){
		$license_message=$resarr->message;

		//activate the plugin
		update_option($itm_prefix.'_license_active', 'active');
		update_option($itm_prefix.'_license_active_date', time());
		$license_active=get_option($itm_prefix.'_license_active','');

	}else{
		if(isset($resarr->error))
			$license_error=$resarr->error;
	}



}else{
	 
}	
	// update options on post
	if (isset ( $_POST ['wp_auto_spinner_lang'] )) {
		
		if (! isset ( $_POST ['wp_auto_spin'] )) {
			update_option ( 'wp_auto_spin', array () );
		} else {
			update_option ( 'wp_auto_spin', $_POST ['wp_auto_spin'] );
		}
		
		if (! isset ( $_POST ['wp_spinner_types'] )) {
			update_option ( 'wp_spinner_types', array (
					'post' 
			) );
		} else {
			update_option ( 'wp_spinner_types', $_POST ['wp_spinner_types'] );
		}
		
		if (! isset ( $_POST ['post_category'] )) {
			update_option ( 'wp_auto_spin_execl', array () );
		} else {
			update_option ( 'wp_auto_spin_execl', $_POST ['post_category'] );
		}
		
		update_option ( 'wp_auto_spinner_lang', $_POST ['wp_auto_spinner_lang'] );
		update_option ( 'wp_auto_spinner_execlude', $_POST ['wp_auto_spinner_execlude'] );
		update_option ( 'wp_auto_spinner_email', $_POST ['wp_auto_spinner_email'] );
		update_option ( 'wp_auto_spinner_password', $_POST ['wp_auto_spinner_password'] );
		update_option ( 'wp_auto_spinner_quality', $_POST ['wp_auto_spinner_quality'] );
		update_option ( 'wp_auto_spinner_license', $_POST ['wp_auto_spinner_license'] );

		
		//wordai
		$fieldsToUpdate = array(
				
				'wp_auto_spinner_wordai_email',
				'wp_auto_spinner_wordai_password',
				'wp_auto_spinner_wordai_quality' ,
				
				
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
				
				'wp_auto_spinner_bot_key'
				  
		);
		
		//updating
		foreach  ( $fieldsToUpdate as $fieldToUpdate){
			update_option($fieldToUpdate, $_POST[$fieldToUpdate]);
		} 
		
		
	 	
		
		echo '<div class="updated" id="message"><p>Plugin settings <strong>updated successfully</strong>. </p></div>';
	}
	
	// data
	$wp_auto_spinner_lang = get_option ( 'wp_auto_spinner_lang', 'en' );
	$wp_auto_spinner_execlude = get_option ( 'wp_auto_spinner_execlude', '' );
	$wp_auto_spinner_email= get_option('wp_auto_spinner_email','');
	$wp_auto_spinner_password=get_option('wp_auto_spinner_password','');
	$wp_auto_spinner_quality = get_option('wp_auto_spinner_quality','medium');
	$queue_url = admin_url('admin.php?page=wp_auto_spinner_queue');
	
	// wordai
	$wp_auto_spinner_wordai_email    = get_option('wp_auto_spinner_wordai_email','');
	$wp_auto_spinner_wordai_password = get_option('wp_auto_spinner_wordai_password','');
	$wp_auto_spinner_wordai_quality  = get_option('wp_auto_spinner_wordai_quality','75');
	
	//tbs
	$wp_auto_spinner_tbs_email 	    = get_option('wp_auto_spinner_tbs_email','');
	$wp_auto_spinner_tbs_password 	= get_option('wp_auto_spinner_tbs_password','');
	$wp_auto_spinner_tbs_maxsyns 	= get_option('wp_auto_spinner_tbs_maxsyns','');
	$wp_auto_spinner_tbs_quality 	= get_option('wp_auto_spinner_tbs_quality','');
	
	
	//contentprofessor 
	$wp_auto_spinner_cp_email 	    = get_option('wp_auto_spinner_cp_email','');
	$wp_auto_spinner_cp_password 	    = get_option('wp_auto_spinner_cp_password','');
	$wp_auto_spinner_cp_language 	    = get_option('wp_auto_spinner_cp_language','en');
	$wp_auto_spinner_cp_limit 	    = get_option('wp_auto_spinner_cp_limit','5');
	$wp_auto_spinner_cp_quality 	    = get_option('wp_auto_spinner_cp_quality','ideal');
	$wp_auto_spinner_cp_synonym_set 	    = get_option('wp_auto_spinner_cp_synonym_set','global');
	$wp_auto_spinner_cp_min_words_count 	    = get_option('wp_auto_spinner_cp_min_words_count','1');
	$wp_auto_spinner_cp_max_words_count 	    = get_option('wp_auto_spinner_cp_max_words_count','7');
	$wp_auto_spinner_cp_type = get_option('wp_auto_spinner_cp_type','free');
	
	//sc spinnerchief
	$wp_auto_spinner_sc_replacetype = get_option('wp_auto_spinner_sc_replacetype','0');
	$wp_auto_spinner_sc_wordquality = get_option('wp_auto_spinner_sc_wordquality','0');
	$wp_auto_spinner_sc_thesaurus = get_option('wp_auto_spinner_sc_thesaurus','English');
	$wp_auto_spinner_sc_Wordscount = get_option('wp_auto_spinner_sc_Wordscount','5');
	$wp_auto_spinner_sc_spinfreq = get_option('wp_auto_spinner_sc_spinfreq','4');
	$wp_auto_spinner_sc_password = get_option('wp_auto_spinner_sc_password','');
	$wp_auto_spinner_sc_email = get_option('wp_auto_spinner_sc_email','');
	
	//cr chimprewriter 
	$wp_auto_spinner_cr_email = get_option('wp_auto_spinner_cr_email','');
	$wp_auto_spinner_cr_apikey = get_option('wp_auto_spinner_cr_apikey','');
	$wp_auto_spinner_cr_quality = get_option('wp_auto_spinner_cr_quality','4');
	$wp_auto_spinner_cr_phrasequality = get_option('wp_auto_spinner_cr_phrasequality','3');
	$wp_auto_spinner_cr_posmatch = get_option('wp_auto_spinner_cr_posmatch','3');
	
	
	?>
	

	
<div class="wrap">
	<div style="margin-left: 8px" class="icon32" id="icon-options-general">
		<br>
	</div>

	<form method="POST" class="TTWForm-auto-spin">
	
	<h2>Settings <input type="submit" name="save" value="Save Changes" class="button-primary"></h2>
	
	<p><strong>Disini</strong> kamu dapat melakukan konfigurasi WP AMT Spinner menjadwalkan spin dan pengaturan lainnya</p>
	
		<div id="dashboard-widgets-wrap">

			<div class="metabox-holder columns-1" id="dashboard-widgets">
				<div class="postbox-container" id="postbox-container-1">
					<div>
						
						<?php if(trim($license_active) !='') {?>
						
						
						<div class="postbox">
							<h2 class="hndle">
								<span>Pilihan Pengaturan</span>
							</h2>
							<div class="inside">
								<!--  insider start -->

								 
								<table class="form-table">
									<tbody>
										
										
									
										<tr>
											<th scope="row"><label>Pilih Bahasa</label></th>
											<td>
												<select name="wp_auto_spinner_lang" id="field1zz"> 
													<option value="en" <?php opt_selected('en',$wp_auto_spinner_lang) ?>>English</option>
													<option value="id2" <?php opt_selected('id2',$wp_auto_spinner_lang) ?>>Endonesian</option>
													<option value="id3" <?php opt_selected('id3',$wp_auto_spinner_lang) ?>>Endonesah</option>
													<option value="ms" <?php opt_selected('ms',$wp_auto_spinner_lang) ?>>Malaysian</option>
													<option value="du" <?php opt_selected('du',$wp_auto_spinner_lang) ?>>Dutch</option>
													<option value="ge" <?php opt_selected('ge',$wp_auto_spinner_lang) ?>>German</option>
													<option value="fr" <?php opt_selected('fr',$wp_auto_spinner_lang) ?>>French</option>
													<option value="it" <?php opt_selected('it',$wp_auto_spinner_lang) ?>>Italian</option>
													<option value="sp" <?php opt_selected('sp',$wp_auto_spinner_lang) ?>>Spanish</option>
													<option value="po" <?php opt_selected('po',$wp_auto_spinner_lang) ?>>Portuguese</option>
													<option value="ro" <?php opt_selected('ro',$wp_auto_spinner_lang) ?>>Romanian</option>
													<option value="tr" <?php opt_selected('tr',$wp_auto_spinner_lang) ?>>Turkish</option>
		
												</select>
			
												<div class="description">Pilih bahasa yang sesuai dengan konten yang ingin kamu spin.</div></td>
										</tr>
										
										<tr>
											<th scope="row"><label>Spin Otomatis?</label></th>
											<td>
												<input name="wp_auto_spin[]" id="field-wp_auto_spin_active-1" value="OPT_AUTO_SPIN_ACTIVE" type="checkbox">  Aktifkan <strong>Spin Otomatis</strong> Untuk Semua Postingan.
												<div style="padding-top:5px" class="description">Aktifkan opsi ini untuk memutar posting bot secara otomatis. Ketika opsi ini aktif, setiap postingan bot yang ditambahkan ke WordPress Anda akan dikirim ke   <a href="<?php echo $queue_url ?>">Spin Terjadwal</a>. Perhatikan bahwa Anda harus mengatur <b> cron job </b> di bawah ini untuk plugin untuk memproses item yang dikirim ke  <a href="<?php echo $queue_url ?>">spin terjadwal</a>.</div>
											
												
										</tr>
										
										
										
										<tr>
											<th scope="row"><label>Spin Judul artikel?</label></th>
											<td>
			
												<input name="wp_auto_spin[]" id="field-wp_auto_spin_active-1" value="OPT_AUTO_SPIN_ACTIVE_TTL" type="checkbox">   Jika kamu mengaktifkan fitur ini maka  <strong>judul artikel juga akan di spin</strong>.
										</tr>
										
									
										
										<tr>
											<th scope="row"><label>Jangan Spin Artikel</label></th>
											<td>
			
												<input name="wp_auto_spin[]"  value="OPT_AUTO_SPIN_DEACTIVE_CNT" type="checkbox"> Aktifkan opsi ini untuk menonaktifkan pemintalan konten. Sepertinya opsi yang aneh tapi cocok jika Anda ingin menulis ulang judul saja.
										</tr>
			 
										<tr>
											<th scope="row"><label>Spin slug artikel?</label></th>
											<td>
			
												<input name="wp_auto_spin[]" id="field-wp_auto_spin_active-1" value="OPT_AUTO_SPIN_SLUG" type="checkbox">   Spin <abbr title="Permalink">post slug</abbr>.
									
										</tr>
										
										<tr>
											<th scope="row"><label>Spin links anchor text?</label></th>
											<td>
			
												<input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_LINKS" type="checkbox"> aktifkan  Jika anda ingin, <strong>spin links text</strong>.
										</tr>
										
										<tr>
											<th scope="row"><label>Auto spin manual post?</label></th>
											<td>
			
												<input name="wp_auto_spin[]" id="field-wp_auto_spin_active-1" value="OPT_AUTO_SPIN_ACTIVE_MANUAL" type="checkbox">   <abbr title="(Jika anda ingin melakuakn spin secara manual )(tidak direkomendasikan)"><strong>Spin Artikel secara manual</strong></abbr>
										</tr>
										
										<tr>
											<th scope="row"><label>Spin langsung? </label></th>
											<td>
			
												<input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_PUBLISH" type="checkbox">Auto spin langsung <abbr title="Fires the spinning process once the post gets published. Regularly it gets added to the spinning queue."><strong>saat publis</strong></abbr>.
												<div style="padding-top:5px" class="description">Secara default, posting Bot ditambahkan ke <a href="<?php echo $queue_url ?>">antrian spin </a> dimana cron melakukan proses satu posting setiap menit. Jika Anda ingin menulis ulang secara instan, aktifkan opsi ini.</div> 
										</tr>
										
										<tr>
											<th scope="row"><label>Aktifkan mode shuffule? (Tidak Disarankan)</label></th>
											<td>
			
												<input name="wp_auto_spin[]"  value="OPT_AUTO_SPIN_ACTIVE_SHUFFLE" type="checkbox">Timpa <strong>Setiap Kata</strong> dari sinonim yang ditetapkan oleh kata lain dari set yang sama.
												
												<div class="description">Secara default, jika kita memiliki sinonim yang ditetapkan dalam bentuk "word1 | word2 | word3" dan konten berisi kata "word1" itu akan diganti dengan "word2" atau "word3". Tetapi jika posting berisi kata "word2", itu tidak akan diganti karena plugin menggantikan kata pertama dari set, bukan penghitung. Dengan mengaktifkan opsi ini, jika "word2" atau "word3" ada di konten, mereka akan diganti dengan "word1" atau kata lain dari set.</div> 
												
										</tr>
										
										<tr>
											<th scope="row"><label>Spin pos terjadwal secara instan?</label></th>
											<td>
			
												<input name="wp_auto_spin[]"  value="OPT_AUTO_SPIN_SCHEDULED" type="checkbox">Secara default, posting yang dijadwalkan akan ditulis ulang setelah dipublikasikan. Aktifkan ini jika Anda tidak ingin mereka menunggu sampai diterbitkan.    
												
										</tr>
										
										<tr>
											<th scope="row"><label>Spin draft posts?</label></th>
											<td>
			
												<input name="wp_auto_spin[]"  value="OPT_AUTO_SPIN_DRAFT" type="checkbox">Secara default, draft postingan dispin setelah dipublikasikan. Aktifkan opsi ini jika Anda tidak ingin mereka menunggu sampai diterbitkan.    
												
										</tr>
										
										<tr>
											<th scope="row"><label>Nonaktifkan antrian spining? </label></th>
											<td>
												<input name="wp_auto_spin[]"   value="OPT_AUTO_SPIN_QUEUE_DISABLED" type="checkbox">  Nonaktifkan pemrosesan <strong>antrian spin</strong>.
												<div style="padding-top:5px" class="description">Aktifkan opsi ini jika Anda ingin menonaktifkan <a href="<?php echo $queue_url ?>">antrian spin</a>. Cron tidak akan memproses item apa pun dari antrian. <br>(<b>Hati-hati,</b> opsi ini akan<b>menghentikan proses spin</b>).</div>
											
												
										</tr>
										
										<tr>
											<th scope="row"><label>Nonaktifkan sinonim internal? </label></th>
											<td>
												<input name="wp_auto_spin[]"   value="OPT_AUTO_SPIN_NO_THESAURUS" type="checkbox">  Nonaktifkan menggunakan basis data sinonim plugin
												<div style="padding-top:5px" class="description">Aktifkan opsi ini untuk menonaktifkan menggunakan sinonim plugin internal jika Anda hanya akan menggunakan sinonim ditambahkan kustom di tab "Kamus Ku". </div>
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

						<div class="postbox" >
							<h2 class="hndle">
								<span>Jenis Posting Kustom <span class="postbox-title-action"></span></span>
							</h2>
							<div class="inside">
								<!-- insider 3 -->
								
								<table class="form-table">
									<tbody>
								
										<tr>
											<th scope="row"><label> Type Post?</label></th>
											<td>
			
												<?php
						
														$ptype = get_post_types ( array (), 'names', 'or' );
														foreach ( $ptype as $type ) {
															if (post_type_supports ( $type, 'editor' )) {
																$post_types [] = $type;
															}
														}
														
														foreach ( $post_types as $post_type ) {
												?>
					
														
																 
																<input name="wp_spinner_types[]" value="<?php echo $post_type ?>" type="checkbox"> <span class="option-title">
													       			 <?php echo $post_type ?> 
													                </span>
																 
																
												 <?php
														}
															
												?>
												
												<div class="description">Pilih jenis posting mana yang akan didukung plugin, sehingga plugin akan diaktifkan ketika mengedit posting dari jenis posting ini.</div>
									
		
										</tr>
										
									</tbody>
								</table>
									

								
															<p style="padding-top: 5px">
									<input type="submit" value="Save Settings" name="submit" class="button">
								</p>



								<!-- /insider 3 -->
							</div>
						</div>
						
						
						<div class="postbox" >
							<h2 class="hndle">
								<span>Atur Cron Job<span class="postbox-title-action"></span></span>
							</h2>
							<div class="inside">
								<!-- insider 3 -->
								
								<?php $lastrun=get_option('wp_auto_spinner_last_run',1392146043); ?>
	
								<table class="form-table">
									<tbody>
									    <tr>
											<th scope="row"><label>Internal Cron </label></th>
											<td>
			
											<input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_CRON" type="checkbox"> <span class="option-title"> Gunakan WordPress bawaan Cron sebagai gantinya. </span>
										</tr>
										<tr>
											<th scope="row"><label>Status  Cron </label></th>
											<td>
			
												<p style="margin-top: -13px;"><strong>Asal</strong> Waktu server  <strong>(<?php echo  date( 'h:i:s' , current_time('timestamp') )  ?>)</strong>, Cron terakhir jalan <strong>(<?php echo date("h:i:s",$lastrun ) ?> )</strong> disini <strong> (<?php echo $timdiff = current_time('timestamp') - $lastrun ?>)</strong> Beberapa detik yang lalu, jalankan setiap <strong>(60)</strong> detik untuk memproses satu item dari <a href="<?php echo $queue_url ?>">Spinning Antrian</a>, Jadi harus dijalankan lagi setelahnya <strong>(<?php echo( 60 - $timdiff )  ?>)</strong> seconds.
										</tr>
										
										<tr>
											<th scope="row"><label>Jalankan Sekarang </label></th>
											<td>
			
												<?php $cronurl=site_url('?wp_auto_spinner=cron',__FILE__)?>
												( <a target="blank" href="<?php echo $cronurl ?>">Mulai Sekarang </a>)
												
												<div class="description">Buka tautan ini untuk memicu cron secara manual yang akan memproses satu item dari <a href="<?php echo $queue_url ?>">Spinning Antrian</a>.</div>
										</tr>
										
										<tr>
											<th scope="row"><label>Cron Command </label></th>
											<td>
												
												    <div style="background-color: #FFFBCC; border: 1px solid #E6DB55; color: #555555; padding: 5px; width: 97%; margin-top: 10px">
														
														<?php
								
															echo 'curl ' . $cronurl;
														?> 
													</div>
													<div class="description">Salin perintah ini ke Crontab hosting Anda. Memeriksa <a href="http://valvepress.com/wordpress-internal-cron-job-work-may-need-setup-external-cron/" target="_blank">tutorial ini</a> tentang mengapa dan bagaimana mengatur Cron job</div>
													
													<p>Jika perintah di atas tidak bekerja untuk host Anda, Gunakan yang disebutkan di bawah ini.</p>

																		
								
										</tr>
										
										<?php ?>
										<tr>
											<th scope="row"><label>Perintah Alternatif</label></th>
											<td>
			
													<div style="background-color: #FFFBCC; border: 1px solid #E6DB55; color: #555555; padding: 5px; width: 97%; margin-top: 10px">
													<?php
														//$cronpath = dirname ( __FILE__ ) . '/cron.php';
														echo 'wget -O /dev/null  ' . $cronurl;
														?>
													</div>												
												<div class="description">Ini adalah alternatif lain dari perintah di atas, Jika yang di atas tidak berfungsi pada host Anda.</div>
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


 
						<div class="postbox" >
							<h2 class="hndle">
								<span>Pengecualian dan ketentuan yang dilindungi <span class="postbox-title-action"></span></span>
							</h2>
							<div class="inside">
								<!-- insider 3 -->
								
								<table class="form-table">
									<tbody>
									    <tr>
											<th scope="row"><label>Kecualikan kata dalam judul</label></th>
											<td>
			
											<input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_TITLE_EX" type="checkbox"> <span class="option-title"> Kecualikan kata-kata judul saat spin artikel  dalam sebuah konten.</span>
											<div class="description">Catatan: Judul juga tidak akan dispin jika opsi ini aktif.</div>
										</tr>
										
										<tr>
											<th scope="row"><label>Kecualikan huruf kapital </label></th>
											<td>
			
											<input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_CAP_EX" type="checkbox"> <span class="option-title"> Kecualikan kata-kata yang dimulai dengan huruf kapital. </span>
										</tr>
										
										<tr>
											<th scope="row"><label>Kecualikan URL tekstual</label></th>
											<td>
			
											<input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_URL_EX" type="checkbox"> <span class="option-title">Aktifkan ini jika Anda ingin melewatkan penulisan ulang URL yang ditulis tanpa tag HTML hyperlink (mis., Bukan hyperlink). </span>
										</tr>
										
										<tr>
											<th scope="row"><label>Kecualikan kutipan langsung  </label></th>
											<td>
			
											<input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_CURLY_EX" type="checkbox"> <span class="option-title">Mengaktifkan opsi ini akan mengecualikan teks di dalam tanda kutip tunggal (‘’), tanda kutip ganda (""), dan tanda kutip keriting. </span>
										</tr>
										
										<tr>
											<th scope="row"><label>Kecualikan kutipan reguler  </label></th>
											<td>
			
											<input name="wp_auto_spin[]" value="OPT_AUTO_SPIN_CURLY_EX_R" type="checkbox"> <span class="option-title"> Opsi ini akan mengecualikan teks di dalam tanda kutip ganda (""). </span>
										</tr>
										
																	
										
										<tr>
											<th scope="row"><label>Kata-kata yang dicadangkan </label></th>
											<td>
			
											<textarea style="width: 100%" rows="5" cols="20" name="wp_auto_spinner_execlude" id="field-wp_auto_spinner_execlude"><?php echo stripslashes($wp_auto_spinner_execlude) ?></textarea>
											<div class="description">Kata-kata dalam kotak ini tidak akan ditulis ulang. Tambahkan satu per baris.</div>
										</tr>
										<tr>
											<th scope="row"><label>Kategori yang dikecualikan</label></th>
											<td>
			
											<div id="taxonomy-category" class="categorydiv">
												<div id="category-all" class="tabs-panel">
													<input type="hidden" name="post_category[]" value="0">
													<ul id="categorychecklist" data-wp-lists="list:category" class="categorychecklist form-no-clear">
														<?php wp_category_checklist(); ?>
													</ul>
												</div>
			
											</div>
											<div class="description">Posting yang termasuk dalam kategori ini tidak akan ditulis ulang.</div>
										</tr>
										
										</tbody>
									</table>

								 

								<p style="padding-top: 5px">
									<input type="submit" value="Save Settings" name="submit" class="button">
								</p>

								<!-- /insider 3 -->
							</div>
						</div>

						
												<div class="postbox spinning_method_wrap" >
							<h2 class="hndle">
								<span>Metode spin<span class="postbox-title-action"></span></span>
							</h2>
							<div class="inside">
								<!-- insider 3 -->

								<p>Secara default, plugin menggunakan database sinonim pribadinya, tetapi Anda masih dapat menggunakan salah satu dari enam API paling populer untuk menulis ulang posting.</p>
 
 								<table  class="form-table">
								
								
								<tr>
										<th scope="row">Metode </td>
										<td>
										
										<input  class="spin_method_selector" name="wp_auto_spin[]" value="OPT_AUTO_INTERNAL" type="radio"> <span class="option-title"> Gunakan basis data sinonim bawaan. </span>
										</td>
								</tr>
									
 
 								</table>

 								<p style="padding-top: 5px">
									<input type="submit" value="Save Settings" name="submit" class="button">
								</p>



								
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

<?php  $opt= get_option('wp_auto_spin',array()); 

if( in_array( 'OPT_AUTO_SPIN_REWRITER' , $opt)){
		
	 
		
}elseif( in_array( 'OPT_AUTO_SPIN_WORDAI' , $opt) ){

 

}elseif( in_array( 'OPT_AUTO_SPIN_TBS' , $opt) ){
		
 


}elseif( in_array( 'OPT_AUTO_SPIN_CP' , $opt) ){

 
		
}elseif( in_array( 'OPT_AUTO_SPIN_SC' , $opt) ){

 

}elseif( in_array( 'OPT_AUTO_SPIN_CR' , $opt) ){
		
 
}elseif( in_array( 'OPT_AUTO_SPIN_ES' , $opt) ){
	
}elseif( in_array( 'OPT_AUTO_SPIN_BOT' , $opt) ){
		
}else{
		
	$opt[] = 'OPT_AUTO_INTERNAL';
		
}

?>
												
    var $vals = '<?php   $wp_spinner_types = get_option('wp_spinner_types',array('post','product') ) ; print_r( implode('|',array_merge($opt,$wp_spinner_types) ) ); ?>';

	
    
    //generic options
    $val_arr = $vals.split('|');
    jQuery('input:checkbox').removeAttr('checked');
    jQuery.each($val_arr, function (index, value) {
        if (value != '') {
            jQuery('input:checkbox[value="' + value + '"]').attr('checked', 'checked');
            jQuery('input:radio[value="' + value + '"]').attr('checked', 'checked');
        }
    });

    //spin execludes options
    var $vals = '<?php  $opt= get_option('wp_auto_spin_execl',array()); print_r(implode('|',$opt)); ?>';
    $val_arr = $vals.split('|');

    jQuery.each($val_arr, function (index, value) {
        if (value != '') {
            jQuery('input:checkbox[value="' + value + '"]').attr('checked', 'checked');
   
        }
    });


    //show hide spinning boxs for other methods
    
    jQuery('.spinning_method_wrap input[type="radio"]').change(

    		function(){
    		 showHideSpinBox();
    		}

    );

    function showHideSpinBox(){

    		jQuery('.spin_method_selector:checked').each(function(){
    		  
    		  jQuery('.spin_method_box').hide();
    		  
    		  jQuery('.' + jQuery(this).val() ).show();
    		  
    		  console.log(jQuery(this).val());
    		  
    		}); 

    }

    //initial trigger
    showHideSpinBox();
    		    
    
</script>

<?php } ?>