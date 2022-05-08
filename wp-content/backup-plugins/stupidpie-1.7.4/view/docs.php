<?php 

?>
 <div class="bootstrap-wpadmin">
    <div class="row">
      <div class="span12">
          <div class="page-header">
            <center><img height="90px" src="<?php echo plugins_url( 'images/StupidPie.png' , __FILE__ );?>"></center>
          </div>
          
      </div>
    </div>
    <div class="row">

      <div class="span9">
        <ul class="nav nav-tabs">
            <li class="active"><a target="_blank" href="#instalasi" data-toggle="tab">Instalasi</a></li>
            <li><a target="_blank" href="#faq" data-toggle="tab">FAQ</a></li>
            <li><a target="_blank" href="#changelog" data-toggle="tab">Changelog</a></li>
            <li><a target="_blank" href="#bonus" data-toggle="tab">Bonus</a></li>
        </ul>
        <div class="row">
          <div class="span9">
            <div class="tab-content">
              <div class="tab-pane active" id="instalasi">
                <div class="page-header"><h4>Basic penggunaan StupidPie</h4></div>
                
                  <ol>
                    <li>Isi keywords di StupidPie/keywords.txt</li>
                    <li>Upload dan aktifkan pluginnya</li>
                    <li>Kopi paste kode
                  <pre>&lt;?php echo spp(get_search_query());?&gt;</pre>
                  taruh pada file search.php themes wordpress Anda. Masukkan kode diatas sebelum code
                  <pre>if have_post();</pre>
                  </li>
                    <li>Kopi paste kode
                  <pre>[spp_random_terms count=3]</pre>
                  di sidebar wordpress, widget text.</li>
                    <li>Secara default kode
                  <pre>&lt;?php echo spp(get_search_query());?&gt;</pre>
                  memanggil template default.html check pada folder (StupidPie\templates\default.h<wbr />tml)</li>
                  </ol>
                <div class="page-header"><h4>Advanced</h4></div>
                Contoh di atas adalah contoh penggunaan tingkat dasar. StupidPie sendiri sebenarnya bisa memakai 3 parameter saat dipanggil. Secara default, spp memanggil parameter keyword, template dan hack:
<pre>&lt;?php
$keyword = get_search_query();
$template = 'default.html';
$hack = '';
echo spp($keyword, $template, $hack);
// bisa disingkat echo spp($keyword);
?&gt;</pre>
<h5>Keyword</h5>
Keyword adalah satu-satunya parameter yang wajib diisi. Karena beda tempat beda cara dapatkan keywordnya. Sebagai contoh, di single.php keyword bisa didapatkan dengan cara:
<pre>$keyword = single_post_title( '', false );</pre>
Kalau di halaman search.php:
<pre>$keyword = get_search_query();</pre>
<h5>Template</h5>
Template adalah tempat kita mengatur tampilan hasil ambil data. Lokasinya di folder StupidPie/templates. Kita bisa membuat template sendiri atau memodifikasi dari yang sudah ada. Template StupidPie memakai standar h2o template engine jadi kalau ada waktu untuk mempelajari syntax templatenya, bisa melihat dokumentasi lebih jelas untuk <a target="_blank" title="h2o template engine" href="http://www.h2o-template.org/">template h2o</a>.

Untuk memanggil template, bisa dimasukkan ke parameter kedua. Misal:
<pre>&lt;?php
$keyword = get_search_query();
$template = 'video.html';
$hack = '';
echo spp($keyword, $template, $hack);
?&gt;</pre>
<h5>Hack</h5>
Hack adalah parameter ketiga yang jarang dipakai namun cukup keren. Dengan memanfaatkan hack, kita bisa membuat hampir semua jenis AGC. Misal, pdf, ppt, doc, amazon, ehow, dll. Fungsinya sendiri semacam filter. Sebagai contoh:
<pre>&lt;?php
$keyword = get_search_query();
$template = 'wiki.html'; // semisal kita bikin template sendiri untuk wikipedia
$hack = 'site:en.wikipedia.org'; // hack ini akan menampilkan konten HANYA dari en.wikipedia.org
echo spp($keyword, $template, $hack);
?&gt;</pre>
Contoh lain untuk pdf search engine:
<pre>&lt;?php
$keyword = get_search_query();
$template = 'pdf.html'; // semisal kita bikin template sendiri untuk pdf
$hack = 'filetype:pdf'; // hack ini akan menampilkan konten HANYA yang berakhiran .pdf
echo spp($keyword, $template, $hack);
?&gt;</pre>
              </div>
              <div class="tab-pane" id="faq">
                <div class="page-header"><h4>Pertanyaan yang sering diajukan</h4></div>
                <ul>
  <li>Ada setting lain yang bisa diutak-atik ndak?<br>
Coba liat file <a target="_blank" href="plugin-editor.php?file=StupidPie%2Fsettings.php&plugin=StupidPie%2Fstupidpie.php">StupidPie/settings.php</a></li>
<li>Gimana cara nambahin bad words biar diblacklist?<br>
Coba edit $bad_words di file <a target="_blank" href="plugin-editor.php?file=StupidPie%2Fsettings.php&plugin=StupidPie%2Fstupidpie.php">StupidPie/settings.php</a></li>
<li>Dapet komplain DMCA nih, ada cara ngatasin?<br>
Coba masukkan kata-kata ke $bad_words di file <a target="_blank" href="plugin-editor.php?file=StupidPie%2Fsettings.php&plugin=StupidPie%2Fstupidpie.php">StupidPie/settings.php</a> atau pake plugin <a target="_blank" href="http://wordpress.org/extend/plugins/redirection/">Redirection</a>, redirect aja ke homepage url yang dikomplain.</li>
  <li>Gimana kalau themeku ndak ada search.php?<br>
Coba kopi index.php ke file search.php dan edit.</li>
  <li>Kata ente redirect itu ampuh buat indexing. Kodenya plis?<br>
<pre>RewriteEngine on
RewriteCond %{HTTP_HOST} ^webutama\.com$ [NC]
RewriteRule ^(.*)$ http://subdomain.domainente.com/$1 [R,L]</pre>
</li>
  <li>Gw ditendang nih ma hosting A. Gimana dong, ada rekomendasi pake hosting apa?<br>
Syukurin. Dibilangin jangan main AGC.
Eh, yang jelas banyak opsi hosting lain. <a href="http://goo.gl/Ng2Jy" title="Hosting Kuat Hostgator">Hostgator</a> katanya kuat sampai 10K/day, Beberapa teman memakai <a href="http://goo.gl/yOehW" title="VPS Kuat Knownhost">VPS Knownhost</a>, aku pribadi menggunakan <a href="http://goo.gl/kE6R4" title="Hosting Hawkhost">Hawkhost</a> dan <a href="http://goo.gl/kKYVe" title="Hosting Kuat Indonesia">Webhostnix</a>.</li>
  <li>Situs gw trafficnya meledak nih. Ada cara optimasi speednya ndak?<br>
By default, spp sudah banter dan ringan. Namun nggak ada salahnya optimasi biar tahan banting:
- <a target="_blank" href="http://wordpress.org/extend/plugins/w3-total-cache/">w3 total cache</a>, aktifkan db cache, object cache dan browser cache. Jangan aktifkan page cache.
- Daftarin ke <a target="_blank" href="https://www.cloudflare.com/my-websites.html">CloudFlare</a>, aktifkan CDN + Basic Caching. Cukup make yang free.</li>
  <li>Gimana caranya biar web baruku keindex dengan cepat?<br>
Redirect paling ampuh, ping lebih lamban. Atau bisa mencoba <a target="_blank" title="Cara indexing" href="http://googlewebmastercentral.blogspot.com/2011/08/submit-urls-to-google-with-fetch-as.html">fetch as google bot</a>.</li>
  <li>Apa resiko main AGC?<br>
Deindex, banned adsense, diusir hosting. Itu hal paling sering yang dialami pemain agc.</li>
  <li>Bisa ndak SPP dipakai buat AGC Amazon, PDF, PPT, DOC, wiki, eHow, mp3?<br>
Bisa.</li>
  <li>Ane ada pertanyaan lain nih, dimana tanyanya?<br>
Via grup <a target="_blank" href="http://www.facebook.com/groups/ninjaplugins/">NinjaPlugins</a> dong.</li>
  <li>Invite ane ke grup dong?<br>
Kontak aja mastah <a target="_blank" href="http://www.facebook.com/moeghan/">Moeghan</a>.</li>
  <li>Gw pingin pamer earning + traffic. Boleh?<br>
Boleh :D, jangan lupa makan2.</li>
</ul>
              </div>
              <div class="tab-pane" id="changelog">
                <div class="page-header"><h4>Changelog History</h4></div>
                <?php echo nl2br('
## 1.7.4 Release Notes:
* Truncate keywords.txt

## 1.7.3 Release Notes:
* Fix stupidbot
* fix css conflict with papercut
				
## 1.7.2 Release Notes:
* Feature: Papercut Support                

## 1.7.1 Release Notes:
* Bugfix: Campaign 0 Created
* Bugfix: Cannot read terms from database

## 1.7 Release Notes:
* Bisa mengatasi update bing image terakhir
* Menambah dan modifikasi beberapa struktur permalink
* Keyword support, sekarang cukup isi keywords.txt


## 1.6 Release Notes:
* Fix "Call to a member function xpath() on a non-object" bug
* Fix "Fatal error " Bug
* Fix "parser error : Entity \'nbsp\' not defined" bug
* Optimize "Order By Rand()" in SQL
* Sebelum nyimpen term, ditrim + lower case biar ndak banyak makan space DB
* Nambah fungsi permalink statis, random dan dinamis
* Nambah style
* Nambah dokumentasi+admin panel

## 1.5 Release Notes:
* Added Bing Image RSS, StupidPie now able to fetch images ＼(^ω^＼)
* Added Youtube video template ＼(^ω^＼)
* Modify default template so it includes video and SEO Friendly images ＼(^ω^＼)

## 1.4 Release Notes:
* Bing API deprecated, now using Bing RSS
* Since we are using Bing RSS, StupidPie no longer able to fetch image (ㄒ_ㄒ)
* Since we are using Bing RSS, We no longer limited to 5000 query per month ＼(^ω^＼)

## 1.1 Release Notes:
* Private release
* Limit google bot indexing

## 1.0 Release Notes:
* Private release
* Improvement: remove Search Term Tagging 2 & SimplePie dependencies
* Modular design

## 0.7 Release Notes
* Improvement: Bad Keywords
* Improvement: encoded link out

## 0.5 Release Notes
* Initial Release

')?>
              </div>
              <div class="tab-pane" id="bonus">
<ul>
	<li>Jika ingin memakai permalink statis seperti <span style="color: #ff0000;">domain.com/tag/keyword1-keyword2</span></li>
</ul>
Buka file <strong>/Stupidpie/templates/widget.html</strong> lihat kode:
<pre>&lt;a href="{{ term.term | build_permalink_for 'tag' }}"&gt;{{ term.term }}&lt;/a&gt;</pre>
Pastikan setelah build_permalink_for nilainya 'tag'
<br><br>
<ul>
	<li>Jika ingin memakai permalink random seperti <span style="color: #ff0000;">domain.com/abcdefg/keyword1-keyword2</span></li>
</ul>
Buka file <strong>/<strong>Stupidpie/</strong>templates/widget.html</strong> lihat kode:
<pre>&lt;a href="{{ term.term | build_permalink_for 'random' }}"&gt;{{ term.term }}&lt;/a&gt;</pre></span>
Pastikan setelah build_permalink_for nilainya 'random'
<br><br>
<ul>
	<li>Jika ingin memakai permalink dinamis seperti <span style="color: #ff0000;">domain.com/keyword1/keyword1-keyword2-keyword3</span></li>
</ul>
Buka file <strong>/<strong>Stupidpie/</strong>templates/widget.html</strong> lihat kode <pre>&lt;a href="{{ term.term | build_permalink_for 'first_word' }}"&gt;{{ term.term }}&lt;/a&gt;</pre>
Pastikan setelah build_permalink_for nilainya 'first_word'
<br><br>
                <div class="page-header"><h4>Tutorial lain!!!</h4></div>
            <a href="http://www.dojo.cc/category/stupidpie-tutorial/">Tutorial StupidPie</a>
              </div>
            </div>
          </div>
        </div>
      </div>
        
      <div class="span3">
        <div class="well">
          <a target="_blank" id="postnow" href="plugin-editor.php?file=StupidPie%2Fsettings.php&plugin=StupidPie%2Fstupidpie.php" class="btn btn-primary btn-large">Ubah Setting</a>
        </div>
        <div class="">
          <div class="page-header"><h3>Sponsor</h3></div>
          <ul class="nav nav-tabs nav-stacked">
            <?php
            $sponsors = '
            <li><a target="_blank" href="http://handokotantra.net/?ref=stupidpie" title="Panduan Internet Marketing Newbie"><i class="icon-chevron-right"></i> Panduan Internet Marketing Newbie</a></li>
            <li><a target="_blank" href="http://webdijual.com/" title="Website Brokerage &amp; Consultations"><i class="icon-chevron-right"></i> Layanan Jual Web Paling Maknyus</a></li>
            
            <li><a target="_blank" href="http://www.facebook.com/l.php?u=http%3A%2F%2Fwww.sugeng.org%2Fcara-membuat-aplikasi-android-berbasis-rss-feed%2F&h=QAQGD0_rk" title="Tuyul Android Creator"><i class="icon-chevron-right"></i> Tuyul Android Creator</a></li>
            ';
            $sponsors = explode("\n", $sponsors);
            shuffle($sponsors);
            for ($i=0; $i < 5; $i++) { 
              echo $sponsors[$i];
            }

            ?>
          </ul>
          <div class="page-header"><h3>Bookmark</h3></div>
          <ul class="nav nav-tabs nav-stacked">
            <li><a target="_blank" href="http://www.facebook.com/groups/ninjaplugins/"><i class="icon-chevron-right"></i> Grup Dojo</a></li>
            <li><a target="_blank" href="http://www.facebook.com/mochammad.masbuchin/"><i class="icon-chevron-right"></i> Blom Diinvite Kegrup? Hub. Buchin</a></li>
              <li><a target="_blank" href="http://www.dojo.cc/category/kw/"><i class="icon-chevron-right"></i> Keyword Siap Pakai</a></li>
              <li><a target="_blank" href="http://www.dojo.cc/category/pd/stupidpie-templates/"><i class="icon-chevron-right"></i> StupidPie Templates</a></li>
              <li><a target="_blank" href="http://www.dojo.cc/category/pd/agc-theme/"><i class="icon-chevron-right"></i> AGC Theme</a></li>
              <li><a target="_blank" href="http://www.dojo.cc"><i class="icon-chevron-right"></i> Produk Dojo lainnya</a></li>
            
          </ul>
          <div class="page-header"><h3>Tutorial</h3></div>
          <ul class="nav nav-tabs nav-stacked">
            <li><a target="_blank" href="http://www.dojo.cc/category/pd/stupidpie-tutorial/"><i class="icon-chevron-right"></i> Tutorial StupidPie</a></li>
            <li><a target="_blank" href="http://www.facebook.com/groups/ninjaplugins/files/"><i class="icon-chevron-right"></i> Tutorial Kontribusi Member </a></li>
            
          </ul>
         
        </div>
      </div>
        
    </div>
    <?php global $current_user; 
  
get_currentuserinfo() ; 
if($current_user->allcaps['administrator']):
?>
<script id="IntercomSettingsScriptTag">
  var intercomSettings = {
    // TODO: The current logged in user's email address.
    email: "<?php echo $current_user->data->user_email; ?>",
    // TODO: The current logged in user's sign-up date as a Unix timestamp.
    created_at: <?php echo strtotime($current_user->data->user_registered);?>,
    app_id: "m9y7r9ro",
    custom_data: {
       site_url: '<?= site_url(); ?>',
    }
  };
</script>
<script>(function(){var w=window;var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://api.intercom.io/api/js/library.js';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}})();</script>

<?php endif;