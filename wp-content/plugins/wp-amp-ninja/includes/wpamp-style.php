<?php
	$amp_bg_color = WPAMP_BG_COLOR;
	$amp_text_color = WPAMP_TEXT_COLOR;
	$amp_max_width = WPAMP_MAX_WIDTH;
?>
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
<style amp-custom>
/*Custom Style*/
#stickyfooter {position:fixed;height:auto; width:100%;position: -webkit-sticky;top: 0;}
*,.fa{font-family: FontAwesome}
/*.post_image_full{display:none;visibility:hidden}*/
.none{display:none;visibility:none}
.center{align:center;text-align:center}
pre {
	width: 100%;
	padding: 0;
	margin: 0;
	overflow: auto;
	overflow-y: hidden;
	font-size: 12px;
	line-height: 20px;
	background: #efefef;
	border: 1px solid black;
    color: black;
    font-family: FontAwesome;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
	white-space: -pre-wrap;
	white-space: -o-pre-wrap;
	word-wrap: break-word;
}
pre code {
	padding: 10px;
	color: #333;
}
@media print {
	pre {
		overflow-x: auto;
		white-space: pre-wrap;
		white-space: -moz-pre-wrap;
		white-space: -pre-wrap;
		white-space: -o-pre-wrap;
		word-wrap: break-word;
		background: #fff;
	}
}

/*Default Style*/
	@font-face { font-family: 'LatoRegular'; font-style: normal; font-weight: 400; src: local('LatoRegular'), url(<?=WPAMP_PLUGIN_URL;?>/fonts/Lato-Regular.ttf) format('truetype'); }
	body{ font-family: LatoRegular; font-size: 14px; color: <?=$amp_text_color;?>; width:100%; margin:0 auto; background: #f2f2f2; }
	a { color: <?=$amp_bg_color;?>; text-decoration: none; -webkit-transition: all .4s ease; -moz-transition: all .4s ease; -o-transition: all .4s ease; transition: all .4s ease; }
	a:hover { color: <?=$amp_text_color;?>; text-decoration: none; }
	body > header { width: 100%; margin:0 auto; padding: 11px 0px 8px 0px; float:left; background: <?=$amp_bg_color;?>; }
	body > header #header { margin: 0 auto; max-width: <?=$amp_max_width;?>px; }
	body > header #header h1{ font-size: 20px; font-weight: bold; line-height: 1; margin: 0px; width: 84%; float:left; padding-left:10px; }
	body > header #header h1 a{ color:#FFF; }
	body > header #header .menuicon{ width: 10%; float:right; text-align:right; cursor: pointer; padding-right:10px; }
	body > section{ margin: 0 auto; padding: 0; min-height:400px; max-width: <?=$amp_max_width;?>px; }
	body > section article.post, nav.navigation.pagination{ -moz-border-radius: 2px; -webkit-border-radius: 2px; border-radius: 2px; -moz-box-shadow: 0 2px 3px rgba(0,0,0,.05); -webkit-box-shadow: 0 2px 3px rgba(0,0,0,.05); box-shadow: 0 2px 3px rgba(0,0,0,.05); padding: 14px; background: #FFF; margin: 20px 0px; }
	nav.navigation.pagination{ text-align: center; }
	nav.pagination .nav-links a, nav.pagination .nav-links span.current { border: 1px solid; padding: 3px 6px; border-radius: 5px; }
	body > section article.post .post_image{ float: right; margin: 13px 0px 0px 15px; width: 130px; }
	body > section article.post .post_image_full{ float: none; margin: 0 auto; width: 100%; text-align:center; }
	body > section article.post h2, body > section article.post h2 a{ line-height: 20px; font-size: 20px; margin: 5px 0 5px 0px; text-align:center; }
	body > section article.post h3, body > section article.post h3 a{ line-height: 20px; font-size: 18px; margin: 10px 0 10px 0px; }
	body > section > #main > h2 { padding: 0px 10px; }
	body > section article.post p{ margin-top: 5px; font-size: 15px; line-height: 20px; margin-bottom: 15px; text-align: justify; }
	body > section article.post ul.amp-wp-meta { padding: 5px 0; margin: 0 0 10px 0; border-bottom: 1px solid #EAEAEA;}
	body > section article.post ul.amp-wp-meta li { list-style: none; display: inline-block; margin: 0; line-height: 24px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; font-size: 12px;}
	body > section article.post ul.amp-wp-meta li.amp-wp-byline { font-size: 13px; color:#949494;}
	body > section article.post ul.amp-wp-meta li.amp-wp-byline .amp-wp-author { text-transform: capitalize; }
	body > section article.post .amp-wp-byline amp-img { border-radius: 50%; border: 0; position: relative; top: 6px; margin-right: 6px; }
	.clearfix{ clear: both; }
	body > section article.post #amp-pagination{ width: 100%; padding-top: 20px; border-top: 1px solid #EAEAEA; margin-bottom: 12px; }
	body > section article.post #amp-pagination .next{ float: right; width:50%; text-align: right; }
	body > section article.post #amp-pagination .prev{ float: left; width:50%; text-align: left; }
	body > section article.post #amp-pagination .nav-next a, 
	body > section article.post #amp-pagination .nav-previous a{ margin-bottom: 12px; background: #fefefe; -moz-border-radius: 2px; -webkit-border-radius: 2px; border-radius: 2px;	-moz-box-shadow: 0 2px 3px rgba(0,0,0,.05); -webkit-box-shadow: 0 2px 3px rgba(0,0,0,.05); box-shadow: 0 2px 3px rgba(0,0,0,.05); }
	body > footer > #footer{ font-size: 13px; text-align: center; padding: 15px 0; }
	body > footer > #footer p{ margin: 0; }
	body > footer > #footer a:hover { text-decoration: underline; }
	body > section article.post .catlisting{ margin-bottom:10px;}
	body > section article.post .catlisting a{ display: inline-block; padding: 0 11px; border: 1px solid #dcdcdc; font-size: 12px; text-decoration: none; margin-right: 4px; border-radius: 33px; color: <?=$amp_text_color;?>;}
	body > section article.post .catlisting a:hover{ color: #fff; border-color: transparent; background: #FF9800;}
	body > section article.post .catlisting p{margin-bottom: 5px; font-size:12px;}
	.single_img img{ width: 100%; height: 100%; }
	#title h2{ margin: 20px 0px 18px 0px; text-align: center; }
	.postmeta{ font-size: 12px; padding-bottom: 10px; border-bottom: 1px solid #DADADA; }
	.postmeta p{ margin: 0; }
	.postmeta span{ float: right; }
	.single_img{ text-align: center; }
	amp-img, img, object, video { max-width: 100%; height: auto; }
	h2.screen-reader-text{ display:none; }
	.sitelogo{ max-width:250px; max-height:150px; }
	body > #sidebar { background: #f8f8ff; width: 200px; }
	#sidebar .close-sidebar{ margin: 10px 10px 7px 5px; padding: 8px 10px 5px 10px; display: inline-block; cursor: pointer;}
	#sidebar .close-sidebar:hover{ background: rgba(0,0,0,0.1);}	
	#sidebar .close-sidebar img{ cursor:pointer; }
	#sidebar ul.menu, #sidebar ul.menu li ul.sub-menu, #sidebar ul.menu li ul.sub-menu li ul.sub-menu, #sidebar .menu ul{ list-style:none; margin: 0px; padding: 0; }
	#sidebar ul.menu li, #sidebar .menu ul li{ background: #FFF; }
	#sidebar ul.menu li a, #sidebar .menu ul li a{ padding: 10px 15px; width: 100%; display: inline-block; font-size: 14px; border-bottom: 1px solid #efefef; }
	#sidebar ul.menu li ul.sub-menu li a { padding: 10px 15px 10px 30px; }
	#sidebar ul.menu li ul.sub-menu li ul.sub-menu li a { padding: 10px 15px 10px 45px; }
	body > section #amp-pagination .next a, body > section #amp-pagination .prev a{display: inline-block; padding: 3px 11px; border: 1px solid #dcdcdc; text-decoration: none; margin-right: 4px; border-radius: 33px; color: #666;}
	body > section #amp-pagination .next a:hover, body > section #amp-pagination .prev a:hover{ color: #fff; border-color: transparent; background: #FF9800;}
</style>
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"/>