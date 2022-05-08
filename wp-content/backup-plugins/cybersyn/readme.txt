=== CyberSEO Lite (CyberSyn) ===
Contributors: CyberSEO
Author: CyberSEO
Author URI: http://www.cyberseo.net/
Donate link: http://www.cyberseo.net/donate/
Plugin URI: http://www.cyberseo.net/cybersyn/
Tags: autoblog, autoblogging, content curation, rss, feed, rss feed to post, syndication, multiple feed import, full text rss, translator, wordai, spinnerchief, spinrewriter
Requires at least: 4.0
Tested up to: 5.2.2
Requires PHP: 5.3
Stable tag: 6.13
License: GPLv3
License URI: http://www.gnu.org/licenses/gpl-3.0.html

== Description ==

CyberSEO Lite is a simplified version of [CyberSEO Pro](http://www.cyberseo.net/) - the most advanced but easy-to-use auto-blogging and content curation plugin for WordPress. CyberSEO Lite is intended to import RSS and Atom feeds and automatically convert the content into WordPress posts at your site. The plugin is equipped with unique and very powerful software tools that you may find in premium solutions only.

[youtube https://www.youtube.com/watch?v=xglRsq4uOsE]

At the current moment, CyberSEO Lite is the only open-source freeware plugin which is able to extract full text articles from shortened feeds, translate the articles from/to over 100 languages with Google Translate and Yandex Translate services, spin it with 3rd-party content spinners* and more. All these features are 100% free and available right after activation of the plugin. No catches, no hidden fees, no limitations!

[youtube https://www.youtube.com/watch?v=uVuYsWNILpE]

== * Important notice regarding 3rd-party content spinners ==

In accordance with the WordPress policy, the content spinning scripts can not be hosted at wordpress.org. Thus you have to manually download the spinners.zip archive from [this page](http://www.cyberseo.net/cyberseo-lite), unpack it and upload the contained spinners.php file into the /wp-content/plugins/cybersyn folder of your site.

Don't worry, it's a freeware GPL script, so it's not a premium (paid) module. Just download it, unpack and upload it into the same folder at your site where cybersyn.php is located, and the content spinning feature will become instantly available.

== Features: ==

* Generate WordPress posts from [Atom](http://en.wikipedia.org/wiki/Atom_%28standard%29 "Atom")/[RSS](http://en.wikipedia.org/wiki/RSS "Really Simple Syndication") feeds and run your site on autopilot.
* Spin post content with [WordAI](http://www.cyberseo.net/partners/wordai.php), [SpinnerChief](http://www.cyberseo.net/partners/spinnerchief.php) and [SpinRewriter](http://www.cyberseo.net/partners/spinrewriter.php) 3rd-party services*.
* Assign a [WPML](https://www.cyberseo.net/partners/wpml.php) language code to generated posts.
* Embed media attachments (images and videos) into the posts.
* Embed videos from YouTube, Vimeo, Flickr, IGN, Ustream.tv and DailyMotion RSS feeds. Just enable the "Embed videos" option and the plugin will embed videos with descriptions directly into your posts.
* Generate featured images (post thumbnails) from post images or media attachments.
* Full Text RSS extractor is 100% free and allows you to import full-text articles. This feature is based on freeware GPL library by fivefilters.org. This built-in feature works right out of the box. No 3rd-party services or paid API keys.
* Hotlink post images or upload them to your host.
* Translate the syndicated articles from and to more than 100 languages via free Yandex Translate and premium Google Translate services.
* Advanced RSS/Atom parsing algorithm has the ability to pull the feeds fully automatically. Furthermore, you can assign the updating period to each particular feed. Also you can set up a maximum number of posts that will be syndicated at once. This is a very useful feature for SEO of your blogs.
* Adjustable post duplicate check by GUID, post title or both.
* Import articles as drafts or publish them immediately.
* Automatically assign post categories and tags.
* Attribute generated posts to selected authors.
* Shorten post excerpts by a given lenght.
* Add a user-defined HTML code (custom footers) to every syndicated post.
* Convert character encoding if the source feed has a non UTF-8 one. E.g. KOI8-R, KOI8-U, Windows-1251, Windows-1256, Windows-1255 etc. Thus the plugin is compatible with all existing national character encoding systems.
* The plugin can be scheduled by a server-side cron and by WordPress pseudo-cron.

> **Missing some features? Consider upgrading to CyberSEO Pro to add the following advanced features:**
>
> * Import with ease XML feeds of any format into WordPress posts and pages. The internal structure of XML feeds is recognized and parsed automatically.
> * Import with ease pipe-delimiter raw text dumps and Excel-style CSV files into WordPress posts and pages.
> * Import with ease HTML and JSON sources into WordPress post and pages. The internal structure of JSON sources is recognized and parsed automatically.
> * Import articles as WordPress posts, pages or as any custom post types.
> * Assign WordPress post format to every post (e.g. Aside, Gallery, Link, Video, Audio etc).
> * Use the built-in synonymizer to synonymize, spin and rewrite the syndicating content in accordance with your own rules.
> * Shuffle paragraphs of the importing articles.
> * Simulate any [user agent](https://en.wikipedia.org/wiki/User_agent) software.
> * Use proxy lists to pull the content sources using different IP's.
> * Create and modify post custom fields on the fly.
> * Take advantage of the additional 3rd-party content spinners, such as The Best Spinner (TBS), Espinner and ChimpRewriter.
> * Import all the published posts from any other WordPress site with a single click. It doesn't matter how many recent posts are included into its RSS feed, because the plugin will pull them all.
> * Define [post templates](http://www.cyberseo.net/content-syndicator/#templates) to define layouts for auto-generated posts and pages.
> * Use predefined [presets](http://www.cyberseo.net/presets/) from the library and create your own ones! With presets you will be able to import various content sources as image galleries, as tube videos, as full text article etc, with just a couple of mouse clicks!
> * Filter articles and other content items according to your rules.
> * Hotlink attached post videos or upload them to your host.
> * Use auto-commenting tool to generate comments for the posts. Important notice: this is NOT a spamming tool because it adds the comments to your own site only.
> * Assign a lifetime period to every post or page.
> * Republish existing posts.
> * Assign content-related tags automatically.
> * Write your own parsing scripts in PHP to alter the syndicating content. With this feature you'll gain an absolute power on content! This is a real no limit feature!
> * Let CyberSEO update itself automatically.
>
> **[Learn more about CyberSEO Pro](http://www.cyberseo.net/cyberseo-plugin/)**

== Live demo: ==

[http://www.manpinner.com/](http://www.manpinner.com/)

== Requirements: ==

* PHP 5.3 or greater
* MySQL 5.0 or greater
* PHP mbstring extension
* PHP cURL extension (recommended)
* PHP variable safe_mode must be disabled (if cURL is not installed)
* PHP variable allow_url_fopen must be enabled (if cURL is not installed)
* Access to cron on server (recommended)

Want to compare CyberSEO Lite with other open-source autoblogging and content curation plugins? Please make sure to check out the following similar plugins: WP-o-Matic, FeedWordPress, RSS Post Importer / FeedsAPI, RSSImport, Syndicate Press, FeedWeb, RSS Just Better, CSV 2 Post, Simple Feed Copyright, WP Syndicate, HungryFEED, Feedzy, WP Pipes.

== Installation ==

1. Upload 'cybersyn' to the '/wp-content/plugins/' directory
2. Activate the plugin through the 'Plugins' menu in WordPress

== Getting started ==

* Go to "CyberSEO Lite -> RSS/Atom Syndicator".
* Find the "New Feed URL:" text field there and copy/paste your RSS feed URL there (e.g.: http://rss.cnn.com/rss/cnn_latest.rss) and click "Syndicate". You should see the feed settings menu.
* Set the necessary options. It's recommended to use the default ones for the first time, till you are not familiar enough with the plugin yet!
* Scroll the page down and click "Syndicate This Feed". Now the feed is added to CyberSEO Lite.
* Select the check box on the left of its name and click "Pull selected feeds now!" Voila, a new post has been added to your blog!

== Screenshots ==

1. Syndicating a new RSS feed.

== Changelog ==

= 6.17 =
* Fully compatible with WordPress 5.3.

= 6.16 =
* Fully compatible with WordPress 5.2.2.
* CSRF protection improved.

= 6.15 =
* Fully compatible with WordPress 5.2.

= 6.14 =
* Fixed bug in the image saving algorithm.

= 6.13 =
* The images listed within the scrset attribute can be stored locally now.

= 6.12 =
* The "Post thumbnail is required" option added.

= 6.11 =
* WPML language select fixed.

= 6.10 =
* Minor bug fix.
* Fully compatible with WordPress 5.1.1.

= 6.09 =
* Fixed "Error Could not insert post into the database".

= 6.08 =
* Fixed "Notice: Undefined index: url in /../cybersyn.php on line 1026".

= 6.07 =
* Minor bug fix.

= 6.06 =
* Full-text-rss updated.

= 6.05 =
* The debug mode is now disabled by default.

= 6.04 =
* WPML support added.

= 6.03 =
* Slightly optimized.

= 6.02 =
* Fixed bug with inclusion of spinners.php.

= 6.00 =
* The plugin has been rebranded. Now it's called CyberSEO Lite.
* The debug mode option has been added.
* Now the plugin is integrated with WordAI, SpinnerChief and SpinRewrited 3rd-party services. You have to download an additional freeware extension module to enable this feature, because it can't be hosted at wordpress.org.

= 5.50 =
* Fully compatible with WordPress 5.1.

= 5.49 =
* Bug fix for https://wordpress.org/support/topic/pull-users-from-current-blog-only/

= 5.48 =
* Fully compatible with WordPress 5.0.3.
* Fixed issue with saving the category selected when setting up a feed.

= 5.47 =
* Fully compatible with WordPress 5.0.1.
* Feed URL can not changed in feed options.

= 5.46 =
* The "Canonical link" option has been added.
* Improved media file cleanup on post removal.

= 5.45 =
* The <updated> tag for Atom feeds now parsed as a post date.
* Fully compatible with WordPress 4.5.0.

= 5.44 =
* Added important text notice in the feed settings.
* Fully compatible with WordPress 4.9.8.

= 5.43 =
* French to Italian and Italian to French translation options are added to Yandex Translate.

= 5.42 =
* Fully compatible with WordPress 4.9.7.

= 5.41 =
* The plugin upgrade price has been reduced.

= 5.40 =
* Fully compatible with WordPress 4.9.6.

= 5.39 =
* The full text RSS script updated to version 3.7.

= 5.38 =
* Fully compatible with WordPress 4.9.1.

= 5.37 =
* Fully compatible with WordPress 4.9.

= 5.36 =
* Fixed issue with "Store Images Locally" feature.

= 5.35 =
* Fully compatible with WordPress 4.8.2.

= 5.34 =
* Yet more bug fix for https://wordpress.org/support/topic/no-feed-found-3/

= 5.33 =
* Bug fix for https://wordpress.org/support/topic/no-feed-found-3/
* Bug fix for https://wordpress.org/support/topic/bug-with-removing-shorten-post-excerpts-value/

= 5.32 =
* Fully compatible with WordPress 4.8.

= 5.31 =
* Fully compatible with WordPress 4.7.4.

= 5.30 =
* Form fields now satitized.
* Fully compatible with WordPress 4.7.3.

= 5.29 =
* The full text RSS script updated to version 3.5.
* A few small bugs fixed.

= 5.28 =
* The full text extraction and translation services usage has been optimized.
* Fixed issue with altering of the full text extractor URL.

= 5.27 =
* Fully compatible with WordPress 4.7.2.

= 5.26 =
* Fixed issue with feed sources that require a browser user agent.

= 5.25 =
* Fixed issue with post thumbnail generation for enclosured images.

= 5.24 =
* Fixed full text RSS feed.

= 5.23 =
* Bug fix for https://wordpress.org/support/topic/problem-with-5-22/.

= 5.22 =
* Google Translate added.

= 5.21 =
* Better media attachment handling.
* Fully compatible with WordPress 4.7.

= 5.20 =
* Fixed issue with permalinks when the "Link to source" option is enabled.

= 5.19 =
* Yandex Translate added.

= 5.18 =
* Fixed issue with media attachments in shortened excerpts.

= 5.17 =
* "Shorten post excerpts" option added.

= 5.16 =
* "[Disable post footers in excerpt](https://wordpress.org/support/topic/cybersyn-disable-post-footer-in-excerpt/)" bug fixed.

= 5.15 =
* Better compatibility with PHP 7.

= 5.14 =
* Added support for Ustream.tv and DailyMotion video feeds.

= 5.13 =
* Improved Flickr and IGN video feed support.

= 5.12 =
* Added support for Vimeo, Flickr and IGN video feeds.

= 5.11 =
* RSS media attachments of the following types are suppoted now: mp4, m4v, webm, ogv, wmv, flv.
* Media attachment thumbnails can be used as featured images.
* Improved compatibility with CyberSEO 7.

= 5.10 =
* Featured image (post thumbnail) generation has been implemented.
* The plugin is now compatibe with CyberSEO 7.

= 5.01 =
* The Full Text RSS engine has been upgraded to version 3.4.1. Backporting Dave Vasilevsky cookie patch. Fixes issues with certain sites. See https://gist.github.com/fivefilters/0a758b6d64ce4fb5728c
* Fully compatible with WordPress 4.6.1.

= 5.00 =
* Free Full Text RSS feed extractor feature added.
* Fully compatible with WordPress 4.5.2.

= 4.02 =
* Fixed the ["cyberseo_post_link custom field not good for first post"](https://wordpress.org/support/topic/cyberseo_post_link-custom-field-not-good-for-first-post "cyberseo_post_link custom field not good for first post") bug. Thanks to marcetin.

= 4.01 =
* Fixed issue with adding of new feeds.

= 4.00 =
* Fixed CSRF vulnerability.
* The content spinning feature has been removed by request of WordPress.org.

= 3.29 =
* Fully compatible with WordPress 4.2.2.
* Video import has been adjusted according to the recent youtube API changes

= 3.28 =
* Fully compatible with WordPress 4.1.1.

= 3.27 =
* Fully compatible with WordPress 4.1.

= 3.26 =
* Fully compatible with WordPress 4.0.1.

= 3.25 =
* Fixed issue with WordAi spinner.

= 3.24 =
* Fully compatible with WordPress 4.0.

= 3.23 =
* WordAi support improved.

= 3.21 =
* Fixed bug that caused "Fatal error: Call to undefined function".
* Fully compatible with WordPress 3.8.1

= 3.20 =
* The plugin is now integrated with WordAi spinner that uses artificial intelligence to understand text and is able to automatically rewrite the syndicated articles with the same readability as a human writer.

= 3.13 =
* Fully compatible with WordPress 3.6.

= 3.12 =
* The default user agent header has been removed from HTTP requests. It was causing problems with FeedBurner feeds.

= 3.11 =
* The Best Spinner integration has been improved.

= 3.10 =
* Added possibility to automatically embed videos from standard YouTube RSS feeds.

= 3.02 =
* Fixed bug which forced the plugin to use "The Best Spinner" even if disabled.

= 3.01 =
* Minor changes.

= 3.00 =
* The plugin is now integrated with TBS (The Best Spinner) - the most popular content spinning service.
* The post images now can be stored locally (copied to your own host).
* The syndicated posts now can be attributed to the chosen author.
* Now one can specify a list of tags for for the each feed.
* The media attachment handling has been sufficiently improved.
* The character encoding conversion has been added.
* Now one can specify the HTML code with will be inserted to the bottom of each syndicated post (so-called post footers).

= 2.11 =
* The "[loss of permalink](http://www.cyberseo.net/forum/support-eng/loss-of-permalink/)" issue fixed.

= 2.10 =
* The "Link syndicated posts to the original source" option has been added.
* The RSS auto pull mode now uses the built-in WP pseudo cron.
* Minor bugs fixed.

= 2.01 =
* All known bugs were fixed.

= 2.00 =
* The CyberSEO Lite plugin is now 100% compatible with WordPress 3.3.
* The UI has been improved.
* Default settings have been removed from the "XML Syndicator" page. Use the "Alter default settings" button instead.

= 1.40 =
* The feed import function has been improved. Now the status of 'safe_mode' and 'allow_url_fopen' PHP variables is not important in case if the PHP cURL extension is installed.
* The user interface has been slightly improved.

= 1.30 =
* "RSS Pull Mode" option switching issue has been fixed.

= 1.20 =
* First public GPL release.

== Upgrade Notice ==

Upgrade using the automatic upgrade in WordPress Admin.