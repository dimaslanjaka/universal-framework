Usage:
======

Simple:
* Place <?php echo spp(get_search_query());?> in search.php in your theme file. Usually before if have_post();
* Place [spp_random_terms count=10] in your text widget

Jika setelah masang spp, situs anda kebanjiran traffic, jangan lupa pasang w3 total cache, aktifkan object cache dan db cache :)

More examples:

* <?php echo spp(single_post_title( '', false ), 'custom_template.html', ' site:wikipedia.org' ) ;?> in single.php
It will generate content in single post using post title, and template called custom_template.html in stupidpie templates folder and the source is limited to wikipedia.org
Template Engine used: h2o http://www.h2o-template.org/

* <?php echo spp(single_post_title( '', false ), 'another_template.html', ' filetype:doc' ) ;?> in single.php
It will generate content in single post using post title, and template called another_template.html in stupidpie templates folder and the filetype is limited to .doc files

* <?php echo spp(single_post_title( '', false ), 'another_template.html', ' filetype:pdf' ) ;?> in single.php
It will generate content in single post using post title, and template called another_template.html in stupidpie templates folder and the filetype is limited to .pdf files

Additional settings like modifications of permalinks, can be done at StupidPie/settings.php