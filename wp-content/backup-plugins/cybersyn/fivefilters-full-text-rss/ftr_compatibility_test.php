<?php
/*
FULL-TEXT-RSS V3 COMPATIBILITY TEST

1) Upload ftr_compatibility_test.php to the web-accessible root of your website.
For example, if your website is www.example.com, upload it so that you can get
to it at www.example.com/ftr_compatibility_test.php

2) Open your web browser and go to the page you just uploaded.

If things don't look right, have a look at our hosting suggestions:
http://help.fivefilters.org/customer/portal/articles/1143210-hosting

Note: This compatibility test has been borrowed (and slightly adapted) from the one supplied by 
SimplePie.org. We have kept most of their checks intact as we use SimplePie in our application.
http://github.com/simplepie/simplepie/tree/master/compatibility_test/
*/

$app_name = 'Full-Text RSS 3.8';

// Full-Text RSS is not yet compatible with HHVM, that's why we check for it with HHVM_VERSION.
//$php_ok = (function_exists('version_compare') && version_compare(phpversion(), '5.2.0', '>=') && !defined('HHVM_VERSION'));
// HHVM works okay, but no Tidy and autoupdate of site config files not working (tested 3.7.1)
$php_ok = (function_exists('version_compare') && version_compare(phpversion(), '5.4.0', '>='));
$pcre_ok = extension_loaded('pcre');
$zlib_ok = extension_loaded('zlib');
$mbstring_ok = extension_loaded('mbstring');
$iconv_ok = extension_loaded('iconv');
$tidy_ok = function_exists('tidy_parse_string');
$curl_ok = function_exists('curl_exec');
$parallel_ok = ((extension_loaded('http') && class_exists('http\Client\Request')) || ($curl_ok && function_exists('curl_multi_init')));
$allow_url_fopen_ok = (bool)ini_get('allow_url_fopen');
$filter_ok = extension_loaded('filter');
$gumbo_ok = class_exists('Layershifter\Gumbo\Parser');
$idn_ok = function_exists('idn_to_ascii');
$dom_ok = extension_loaded('DOM');

if (extension_loaded('xmlreader')) {
	$xml_ok = true;
} elseif (extension_loaded('xml')) {
	$parser_check = xml_parser_create();
	xml_parse_into_struct($parser_check, '<foo>&amp;</foo>', $values);
	xml_parser_free($parser_check);
	$xml_ok = isset($values[0]['value']);
} else {
	$xml_ok = false;
}

header('Content-type: text/html; charset=UTF-8');

?><!DOCTYPE html>

<html lang="en">
<head>
<title><?php echo $app_name; ?>: Server Compatibility Test</title>

<style type="text/css">
body {
	font:14px/1.4em "Lucida Grande", Verdana, Arial, Helvetica, Clean, Sans, sans-serif;
	letter-spacing:0px;
	color:#333;
	margin:0;
	padding:0;
	background:#fff;
}

div#site {
	width:550px;
	margin:20px auto 0 auto;
}

a {
	color:#000;
	text-decoration:underline;
	padding:0 1px;
}

a:hover {
	color:#fff;
	background-color:#333;
	text-decoration:none;
	padding:0 1px;
}

p {
	margin:0;
	padding:5px 0;
}

em {
	font-style:normal;
	background-color:#ffc;
	padding: 0.1em 0;
}

.success {
  background-color: lightgreen;
}

.highlight {
  background-color: #ffc;
}

ul, ol {
	margin:10px 0 10px 20px;
	padding:0 0 0 15px;
}

ul li, ol li {
	margin:0 0 7px 0;
	padding:0 0 0 3px;
}

h2 {
	font-size:18px;
	padding:0;
	margin:30px 0 20px 0;
}

h3 {
	font-size:16px;
	padding:0;
	margin:20px 0 5px 0;
}

h4 {
	font-size:14px;
	padding:0;
	margin:15px 0 5px 0;
}

code {
	font-size:1.1em;
	color:#000;
}

em strong {
    text-transform: uppercase;
}

table.chart {
	border-collapse:collapse;
}

table.chart th {
	background-color:#eee;
	padding:2px 3px;
	border:1px solid #fff;
}

table.chart td {
	text-align:center;
	padding:2px 3px;
	border:1px solid #eee;
}

table.chart tr.enabled td {
	/* Leave this alone */
}

table.chart tr.disabled td, 
table.chart tr.disabled td a {
	color:#999;
	font-style:italic;
}

table.chart tr.disabled td a {
	text-decoration:underline;
}

div.chunk {
	margin:20px 0 0 0;
	padding:0 0 10px 0;
	border-bottom:1px solid #ccc;
}

.footnote,
.footnote a {
	font:10px/12px verdana, sans-serif;
	color:#aaa;
}

.footnote em {
	background-color:transparent;
	font-style:italic;
}
</style>

</head>

<body>

<div id="site">
	<div id="content">

		<div class="chunk">
			<h2 style="text-align:center;"><?php echo $app_name; ?>: Compatibility Test</h2>
			<table cellpadding="0" cellspacing="0" border="0" width="100%" class="chart">
				<thead>
					<tr>
						<th>Test</th>
						<th>Should Be</th>
						<th>What You Have</th>
					</tr>
				</thead>
				<tbody>
					<tr class="<?php echo ($php_ok) ? 'enabled' : 'disabled'; ?>">
						<td>PHP</td>
						<td>5.4 or higher</td>
						<td><?php echo phpversion(); ?></td>
					</tr>
					<tr class="<?php echo ($xml_ok) ? 'enabled, and sane' : 'disabled, or broken'; ?>">
						<td><a href="http://php.net/xml">XML</a></td>
						<td>Enabled</td>
						<td><?php echo ($xml_ok) ? 'Enabled, and sane' : 'Disabled, or broken'; ?></td>
					</tr>
					<tr class="<?php echo ($pcre_ok) ? 'enabled' : 'disabled'; ?>">
						<td><a href="http://php.net/pcre">PCRE</a></td>
						<td>Enabled</td>
						<td><?php echo ($pcre_ok) ? 'Enabled' : 'Disabled'; ?></td>
					</tr>
					<tr class="<?php echo ($zlib_ok) ? 'enabled' : 'disabled'; ?>">
						<td><a href="http://php.net/zlib">Zlib</a></td>
						<td>Enabled</td>
						<td><?php echo ($zlib_ok) ? 'Enabled' : 'Disabled'; ?></td>
					</tr>
					<tr class="<?php echo ($mbstring_ok) ? 'enabled' : 'disabled'; ?>">
						<td><a href="http://php.net/mbstring">mbstring</a></td>
						<td>Enabled</td>
						<td><?php echo ($mbstring_ok) ? 'Enabled' : 'Disabled'; ?></td>
					</tr>
					<tr class="<?php echo ($iconv_ok) ? 'enabled' : 'disabled'; ?>">
						<td><a href="http://php.net/iconv">iconv</a></td>
						<td>Enabled</td>
						<td><?php echo ($iconv_ok) ? 'Enabled' : 'Disabled'; ?></td>
					</tr>
					<tr class="<?php echo ($filter_ok) ? 'enabled' : 'disabled'; ?>">
						<td><a href="http://uk.php.net/manual/en/book.filter.php">Data filtering</a></td>
						<td>Enabled</td>
						<td><?php echo ($filter_ok) ? 'Enabled' : 'Disabled'; ?></td>
					</tr>					
					<tr class="<?php echo ($tidy_ok) ? 'enabled' : 'disabled'; ?>">
						<td><a href="http://php.net/tidy">Tidy</a></td>
						<td>Enabled</td>
						<td><?php echo ($tidy_ok) ? 'Enabled' : 'Disabled'; ?></td>
					</tr>
					<tr class="<?php echo ($curl_ok) ? 'enabled' : 'disabled'; ?>">
						<td><a href="http://php.net/curl">cURL</a></td>
						<td>Enabled</td>
						<td><?php echo (extension_loaded('curl')) ? 'Enabled' : 'Disabled'; ?></td>
					</tr>
					<tr class="<?php echo ($parallel_ok) ? 'enabled' : 'disabled'; ?>">
						<td>Parallel URL fetching</td>
						<td>Enabled</td>
						<td><?php echo ($parallel_ok) ? 'Enabled' : 'Disabled'; ?></td>
					</tr>
					<tr class="<?php echo ($allow_url_fopen_ok) ? 'enabled' : 'disabled'; ?>">
						<td><a href="http://www.php.net/manual/en/filesystem.configuration.php#ini.allow-url-fopen">allow_url_fopen</a></td>
						<td>Enabled</td>
						<td><?php echo ($allow_url_fopen_ok) ? 'Enabled' : 'Disabled'; ?></td>
					</tr>
					<tr class="<?php echo ($dom_ok) ? 'enabled' : 'disabled'; ?>">
						<td><a href="http://php.net/manual/en/book.dom.php">DOM / XML extension</a></td>
						<td>Enabled</td>
						<td><?php echo ($dom_ok) ? 'Enabled' : 'Disabled'; ?></td>
					</tr>	
				</tbody>
			</table>
		</div>
		
		<div class="chunk">
			<h3>What does this mean?</h3>
			<ol>
				<?php if ($php_ok && $xml_ok && $pcre_ok && $dom_ok && $mbstring_ok && $iconv_ok && $filter_ok && $zlib_ok && $tidy_ok && $curl_ok && $parallel_ok && $allow_url_fopen_ok): ?>
				<li>You have everything you need to run <?php echo $app_name; ?> properly!  Congratulations!</li>
				<?php else: ?>
					<?php if ($php_ok): ?>
						<li><strong>PHP:</strong> You are running a supported version of PHP.  No problems here.</li>
						<?php if ($xml_ok): ?>
							<li><strong>XML:</strong> You have XMLReader support or a version of XML support that isn't broken installed.  No problems here.</li>
							<?php if ($pcre_ok): ?>
								<li><strong>PCRE:</strong> You have PCRE support installed. No problems here.</li>
								
								<?php if ($allow_url_fopen_ok): ?>
									<li><strong>allow_url_fopen:</strong> You have allow_url_fopen enabled. No problems here.</li>
									
									<?php if ($filter_ok): ?>
										<li><strong>Data filtering:</strong> You have the PHP filter extension enabled. No problems here.</li>
	
										<?php if ($zlib_ok): ?>
											<li><strong>Zlib:</strong> You have <code>Zlib</code> enabled.  This allows SimplePie to support GZIP-encoded feeds.  No problems here.</li>
										<?php else: ?>
											<li class="highlight"><strong>Zlib:</strong> The <code>Zlib</code> extension is not available.  SimplePie will ignore any GZIP-encoding, and instead handle feeds as uncompressed text.</li>
										<?php endif; ?>
			
										<?php if ($mbstring_ok && $iconv_ok): ?>
											<li><strong>mbstring and iconv:</strong> You have both <code>mbstring</code> and <code>iconv</code> installed!  This will allow <?php echo $app_name; ?> to handle the greatest number of languages. No problems here.</li>
										<?php elseif ($mbstring_ok): ?>
											<li class="highlight"><strong>mbstring:</strong> <code>mbstring</code> is installed, but <code>iconv</code> is not.</li>
										<?php elseif ($iconv_ok): ?>
											<li class="highlight"><strong>iconv:</strong> <code>iconv</code> is installed, but <code>mbstring</code> is not.</li>
										<?php else: ?>
											<li class="highlight"><strong>mbstring and iconv:</strong> <em>You do not have either of the extensions installed.</em> This will significantly impair your ability to read non-English feeds, as well as even some English ones.</li>
										<?php endif; ?>

										<?php if ($tidy_ok): ?>
											<li><strong>Tidy:</strong> You have <code>Tidy</code> support installed.  No problems here.</li>
										<?php else: ?>
											<li class="highlight"><strong>Tidy:</strong> The <code>Tidy</code> extension is not available.  <?php echo $app_name; ?> should still work with most feeds/articles, but you may experience problems with some. For problem feeds we recommend you use the HTML5 parser.</li>
										<?php endif; ?>
										
										<?php if ($curl_ok): ?>
											<li><strong>cURL:</strong> You have <code>cURL</code> support installed.  No problems here.</li>
										<?php else: ?>
											<li class="highlight"><strong>cURL:</strong> The <code>cURL</code> extension is not available.  SimplePie will use <code>fsockopen()</code> instead.</li>
										<?php endif; ?>
			
										<?php if ($parallel_ok): ?>
											<li><strong>Parallel URL fetching:</strong> You have PHP's HTTP extension or <code>curl_multi</code> installed.  No problems here.</li>
										<?php else: ?>
											<li class="highlight"><strong>Parallel URL fetching:</strong> HTTP extension or <code>curl_multi</code> support is not available.  <?php echo $app_name; ?> will use <code>file_get_contents()</code> instead to fetch URLs sequentially rather than in parallel.</li>
										<?php endif; ?>

									<?php else: ?>
										<li class="highlight"><strong>Data filtering:</strong> Your PHP configuration has the filter extension disabled.  <em><?php echo $app_name; ?> will not work here.</em></li>
									<?php endif; ?>										
										
								<?php else: ?>
									<li class="highlight"><strong>allow_url_fopen:</strong> Your PHP configuration has allow_url_fopen disabled.  <em><?php echo $app_name; ?> will not work here.</em></li>
								<?php endif; ?>
									
							<?php else: ?>
								<li class="highlight"><strong>PCRE:</strong> Your PHP installation doesn't support Perl-Compatible Regular Expressions.  <em><?php echo $app_name; ?> will not work here.</em></li>
							<?php endif; ?>
						<?php else: ?>
							<li class="highlight"><strong>XML:</strong> Your PHP installation doesn't support XML parsing.  <em><?php echo $app_name; ?> will not work here.</em></li>
						<?php endif; ?>
					<?php else: ?>
						<li class="highlight"><strong>PHP:</strong> You are running an unsupported version of PHP.  <em><?php echo $app_name; ?> will not work here.</em></li>
					<?php endif; ?>
				<?php endif; ?>
			</ol>
		</div>

		<div class="chunk">
			<?php if ($php_ok && $xml_ok && $pcre_ok && $mbstring_ok && $iconv_ok && $filter_ok && $allow_url_fopen_ok) { ?>
				<h3>Bottom Line: Yes, you can!</h3>
				<p><em class="success">Your webhost has its act together!</em></p>
				<p>You can download the latest version of <?php echo $app_name; ?> from <a href="http://fivefilters.org/content-only/#download">FiveFilters.org</a>.</p>
				<p><strong>Note</strong>: Passing this test does not guarantee that <?php echo $app_name; ?> will run on your webhost &mdash; it only ensures that the basic requirements have been addressed. If you experience any problems, please let us know.</p>
			<?php } else if ($php_ok && $xml_ok && $pcre_ok && $mbstring_ok && $allow_url_fopen_ok && $filter_ok) { ?>
				<h3>Bottom Line: Yes, you can!</h3>
				<p><em>For most feeds, it'll run with no problems.</em> There are certain languages that you might have a hard time with though.</p>
				<p>You can download the latest version of <?php echo $app_name; ?> from <a href="http://fivefilters.org/content-only/#download">FiveFilters.org</a>.</p>
				<p><strong>Note</strong>: Passing this test does not guarantee that <?php echo $app_name; ?> will run on your webhost &mdash; it only ensures that the basic requirements have been addressed. If you experience any problems, please let us know.</p>
			<?php } else { ?>
				<h3>Bottom Line: We're sorry…</h3>
				<p><em>Your webhost does not support the minimum requirements for <?php echo $app_name; ?>.</em>  It may be a good idea to contact your webhost and point them to the results of this test. They may be able to enable/install the required components.</p> <p>Alternatively, you can try one of our <a href="http://help.fivefilters.org/customer/portal/articles/1143210-hosting">recommended hosts</a>.</p>
			<?php } ?>
		</div>

		<div class="chunk">
			<h3>Further info</h3>

			<h4>IDN support</h4>
			<p>When treating an <a href="https://en.wikipedia.org/wiki/Internationalized_domain_name">internationalized domain name (IDN)</a> Full-Text RSS will try to make use of PHP's <code>idn_to_ascii</code> function to convert the domain to ASCII. If this function does not exist, you might have trouble retrieving article content from internationalized domains.</p>
			<p class="highlight"><strong>idn_to_ascii</strong> is <?php if (!$idn_ok) echo '<strong>not</strong>'; ?> available on this server.</p>

			<h4>HTTP module</h4>
			<p>Full-Text RSS can make use of PHP's HTTP extension or <code>curl_multi</code> to make parallel HTTP requests when processing feeds. If neither are available, it will make sequential requests using <code>file_get_contents</code>.</p>
			<?php 
			$http_type = 'file_get_contents';
			if (extension_loaded('http') && class_exists('http\Client\Request')) {
				$http_type = 'HTTP extension';
			} elseif ($curl_ok && function_exists('curl_multi_init')) {
				$http_type = 'curl_multi';
			}
			?>
			<p class="highlight"><strong><?php echo $http_type; ?></strong> will be used on this server.</p>
			
			<h4>Alternative PHP Cache (APC/APCu)</h4>
			<p>Full-Text RSS can make use of APC's memory cache to store site config files (when requested for the first time). This is not required, but if available it may improve performance slightly by reducing disk access.</p>
			<?php
			if (function_exists('apc_add')) {
				echo '<p class="highlight"><strong>APC is available</strong> on this server.</p>';
			} else {
				echo '<p class="highlight">APC is not available on this server.</p>';
			}
			?>
			
			<h4>HTML parser</h4>
			<p><?php echo $app_name; ?> uses the fast libxml parser (the default PHP parser) but it will automatically make use of Gumbo (a fast HTML5 parser) if the <a href="https://github.com/layershifter/gumbo-php">Gumbo PHP</a> extension is installed. Alternatively, HTML5-PHP (an HTML5 parser written in PHP) can be used by passing &amp;parser=html5 as a parameter. The latter might produce better results than libxml for some sites, but is a little slower.</p>
			<?php
			if ($gumbo_ok) {
				echo '<p class="highlight"><strong>Gumbo PHP</strong> will be used on this server.</p>';
			} else {
				echo '<p class="highlight">libxml will be used by default, unless HTML5 parsing is requested.</p>';
			}
			?>

<!--
			<h4>Language detection</h4>
			<p>Full-Text RSS can detect the language of each article processed. This occurs using <a href="http://pear.php.net/package/Text_LanguageDetect">Text_LanguageDetect</a> or <a href="https://github.com/lstrojny/php-cld">PHP-CLD</a> (if available).</p>
			<?php
			if (extension_loaded('cld') && (version_compare(PHP_VERSION, '5.3.0') >= 0)) {
				echo '<p class="highlight"><strong>PHP-CLD</strong> will be used on this server.</p>';
			} else {
				echo '<p class="highlight"><strong>Text_LanguageDetect</strong> will be used on this server.</p>';
			}
			?>
-->
			<h4>Automatic site config updates</h4>
			<p>Full-Text RSS can be configured to update its site config files (which determine how content should be extracted for certain sites) by downloading the latest set from our GitHub repository. This functionaility is not required, and can be done manually. To configure this to occur automatically, you will need zip support enabled in PHP - we make use of the ZipArchive class.</p>
			<?php
			if (!class_exists('ZipArchive')) {
				echo '<p class="highlight">ZipArchive is not available on this server. To update the site config files you will need to do it manually by downloading the latest set and uploading it to your server.</p>';
			} else {
				echo '<p class="highlight"><strong>ZipArchive is available</strong> on this server.</p>';
			}
			?>			
		</div>
		
		<div class="chunk">
			<p class="footnote">This compatibility test has been borrowed (and slightly adapted) from the one supplied by <a href="http://simplepie.org/">SimplePie.org</a>. We have kept most of their checks intact as we use SimplePie in our application.</a></p>
			<p class="footnote">Date: <?php echo date('Y-m-d'); ?></p>
		</div>

	</div>

</div>

</body>
</html>