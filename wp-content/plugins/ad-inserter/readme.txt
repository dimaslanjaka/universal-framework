=== Ad Inserter - Ad Manager & AdSense Ads ===

Contributors: adinserter, spacetime
Donate link: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LHGZEMRTR7WB4
Tags: ads, adsense, ad rotation, ad manager, amp, amazon, ad blocking detection, header code, banners, in-feed ads, sticky fixed widgets, hooks
Requires at least: 4.9
Tested up to: 5.9
Requires PHP: 5.6
Stable tag: 2.7.12
License: GPLv3

Manage Google AdSense, Media.net, Amazon banners, ads.txt, ad rotation, sticky widgets, AMP ads, DFP, tracking, AdSense header and footer code

== Description ==

Ad management plugin with many advanced advertising features to insert ad codes at optimal positions.

Supports all kinds of ads including **Google AdSense**, **Google Ad Manager** (DFP - DoubleClick for publishers), contextual **Amazon Native Shopping Ads**, **Media.net** , **Infolinks** and **rotating banners.**

This plugin is more than AdSense plugin or plugin for ads. It provides many advanced options to insert opt-in forms, header scripts, Javascript, CSS, HTML, PHP, analytics, tracking or advert code anywhere on the page.

**Insert ads where other plugins fail**.
It's all about the [settings](https://adinserter.pro/documentation).


[Plugin reviews](https://wordpress.org/support/topic/wow-684/):

> I've been using another ad placement manager for a couple years and just recently started using Ad Inserter.
>
> I'm blown AWAY with the power and flexibility of it.
>
> I can HIGHLY recommend this plugin to anyone looking for an easy way to manage ads within WordPress.
>
> Difficult to choose, but certainly top 3 plugins I've ever used in WordPress, ever.


**Features** - check [documentation](https://adinserter.pro/documentation/features) for the complete list

*   [AdSense integration](https://adinserter.pro/documentation/adsense-ads)
*   Support for [Google Ad Manager](https://adinserter.pro/documentation/ad-manager-ads) (DoubleClick for publishers)
*   Syntax highlighting [editor](https://adinserter.pro/documentation/code-editing)
*   Code preview with visual CSS editor
*   Automatically inserts ads on posts and pages
*   Insert before or after post
*   Insert before or after content
*   Insert before or after paragraph
*   Insert before or after random paragraph
*   Insert before or after multiple paragraphs
*   Insert before or after image
*   Insert before or after comments
*   Insert before or after excerpt
*   Insert near any element on the page (using CSS selectors)
*   Insert above the header (after `<body>` tag)
*   Insert in the footer (before `</body>` tag)
*   Insert at relative positions in posts
*   Insert between posts on blog pages (in-feed AdSense)
*   Insert between excerpts on blog pages
*   Insert between comments
*   Insert at custom hook positions (`do_action ()` WP function)
*   Insert before or after any HTML element using CSS selectors
*   Visual HTML element selector (DOM explorer)
*   Avoid inserting ads near images or headers (AdSense TOS)
*   Disable ads on individual posts or pages
*   Insert header (`<head>` section) and footer code
*   Insert raw HTTP response header lines
*   Insert Google Analytics, Matomo (Piwik) or any other tracking code
*   Insert images, HTML, CSS, Javascript or PHP code
*   Code generator for banners and placeholders
*   AdSense code generator
*   Support to detect, hide or replace blank AdSense blocks
*   Visual advert editor - create adverts from scratch
*   Manual insertion: widgets, shortcodes, PHP function call
*   Sticky (fixed) widgets (sticky sidebar - the sidebar does not move when the page is scrolled)
*   Custom alignments and styles
*   Insert different ad codes on AMP pages
*   Custom CSS class name for wrapping divs to avoid ad blockers
*   Use shortcodes from other plugins
*   Use custom fields as defined in posts
*   Use post title, tags or category names to create contextual adverts
*   PHP code processing
*   Ad labels - show customized label above adverts
*   ads.txt editor
*   Support for [GDPR consent checks](https://adinserter.pro/faq/gdpr-compliance-cookies-consent)
*   Support for IAB TCF 2.0 GDPR consent API (used by Quantcast Choice)
*   Ad rotation (server-side and client-side - works with caching)
*   Timed ad rotation - define times to rotate adverts in a single ad block
*   Create rich media ads with standard WordPress TinyMCE editor
*   Ad blocking detection - popup message, page redirection
*   Desktop/mobile device detection (server-side and client-side - works with caching)
*   [Blacklist/Whitelist](https://adinserter.pro/documentation/black-and-white-lists) categories, tags, taxonomies, post IDs, urls, url query parameters, cookies, referrers, browsers, operating systems
*   Easy copying and pasting ads or settings using internal clipboard
*   Can wait for jQuery when it is deferred
*   Use it with Google Site Kit or replace it to have more control over ad placement
*   Simple troubleshooting with many debugging functions
*   Function to visualize inserted blocks
*   Function to visualize AdSense ads with ad names and IDs
*   Function to visualize available insertion positions
*   Function to visualize HTML tags
*   You name it :)

[Review on WP Mayor](https://wpmayor.com/ad-inserter-review-the-best-wordpress-ad-management-plugin/)

> The Best WordPress Ad Management Plugin?

[Review on ShoutMeLoud](https://www.shoutmeloud.com/ad-inserter-review.html)

> Both Google and Amazon recommend this plugin for inserting ads, which is a testament to its quality

**Endorsed by Google** - [How to insert ad code in your WordPress site](https://support.google.com/adsense/answer/7527509)

> If you're new to AdSense, one of your first tasks is to connect your site to AdSense. This requires you to copy the code on your AdSense homepage and paste it into the HTML of your page, between the `<head>` and `</head>` tags.

**Endorsed by Amazon** - <a href="https://affiliate-program.amazon.com/help/topic/t405" target="_blank">Wordpress Integration Guide for Native Shopping Ads</a>.

> Native Shopping Ads provide highly relevant and dynamic product recommendations in a stylishly designed and responsive ad unit that can be placed at the end or within your content to create a more compelling visitor experience and shopping opportunity.

**Pro version** supports additional [advanced features](https://adinserter.pro/documentation/features):

*   Geolocation using internal or [MaxMind](http://www.maxmind.com/) databases (works also with caching)
*   Country, state, region and city level geotargeting
*   Blacklist/Whitelist IP addresses or countries/cities (works also with caching)
*   Ad impression and click statistics (works also with `<iframe>` Javascript ads like Google AdSense)
*   Statistics reports for clients in PDF format or public web pages
*   External tracking via Google Analytics or Matomo (Piwik)
*   A/B testing - discover adverts and settings that perform best
*   Frequency capping - limit impressions or clicks
*   Click fraud protection
*   Lazy loading
*   [Sticky ads](https://adinserter.pro/documentation/sticky-ads) with optional close button
*   Sticky sidebar ads (stick to the screen or to the content)
*   Floating slide-in banner adverts
*   [Sticky (floating) ads](https://adinserter.pro/documentation/sticky-ads) with animations (fade, slide, turn, flip, zoom)
*   Animation trigger for sticky ads (page scroll in % or px, HTML element becomes visible)
*   [background ads (skin ads)](https://adinserter.pro/documentation/sticky-ads#background-ads)
*   Parallax ads
*   Support for sticky ad bar
*   Support for scheduling date and time with fallback option
*   Support to show ads as soon as the GDPR consent is given
*   Support for ads in iframes
*   Anti ad blocking features - replace ads, protect content
*   Ad blocking statistics
*   Multisite options to limit settings on the sites
*   Individual post/page exception management
*   Export and import of settings
*   Support via email

Run a WordPress related blog? Have experience with AdSense? Interested in reviewing the plugin or would like to become an affiliate? [Introduce yourself](https://adinserter.pro/contact).

Have experience with WordPress theme or plugin translation? We are looking for translators! [Contact us](https://adinserter.pro/contact).

Check [documentation pages](https://adinserter.pro/documentation) for detailed description of all the features and some [common settings](https://adinserter.pro/documentation/common-settings) for quick start.

You can also use shortcodes from other plugins (for example, to insert content from other plugins).

Looking for AdSense plugin with simple setup for ads at best positions?

**Ad Inserter can insert ads where other plugins fail**.
It's all about the settings.

Average Rating: 5 out of 5 stars - check <a href="https://wordpress.org/support/plugin/ad-inserter/reviews/">Ad Inserter reviews</a>

> One of the best adsense plugins [...](https://wordpress.org/support/topic/one-of-the-best-adsense-plugins/)
> Most comprehensive Ad plugin available [...](https://wordpress.org/support/topic/most-comprehensive-ad-plugin-available/)
> Better than the old Google adsense plugin [...](https://wordpress.org/support/topic/better-than-the-old-google-adsense-plugin/)
> The best WP Ad management plugin [...](https://wordpress.org/support/topic/the-best-wp-ad-management-plugin/)
> Very flexible and excellent documentation [...](https://wordpress.org/support/topic/very-flexible-and-excellent-documentation/)
> Excellent Ad Plugin [...](https://wordpress.org/support/topic/excellent-ad-plugin-2/)
> Easy to use and also does more than I need [...](https://wordpress.org/support/topic/easy-to-use-and-also-does-more-than-i-need/)
> Exactly what I needed to sell advertising spots [...](https://wordpress.org/support/topic/exactly-what-i-needed-to-sell-advertising-spots-on-our-site/)
> Awesome Plugin and Super Support! [...](https://wordpress.org/support/topic/awesome-plugin-and-super-support/)
> Lots of options and easy to use [...](https://wordpress.org/support/topic/lots-of-options-and-easy-to-use/)
> Crazy flexible [...](https://wordpress.org/support/topic/crazy-flexible/)
> Great plugin that makes it simple [...](https://wordpress.org/support/topic/great-plugin-that-makes-it-simple/)
> Superb Plugin and Support team also so good [...](https://wordpress.org/support/topic/superb-plugin-and-support-team-also-so-good/)
> Best in same kind of plugins [...](https://wordpress.org/support/topic/best-in-same-kind-of-plugins/)
> Must Have Plugin for Each WP Site [...](https://wordpress.org/support/topic/must-have-plugin-for-each-wp-site/)
> Best Ad Placement Plugin [...](https://wordpress.org/support/topic/best-ad-placement-plugin/)
> Best Solution for Advertisement Management [...](https://wordpress.org/support/topic/best-solution-for-advertisement-management/)
> Comprehensive, flexible and well supported [...](https://wordpress.org/support/topic/comprehensive-flexible-and-well-supported/)
> God bless these guys! [...](https://wordpress.org/support/topic/god-bless-these-guys-2/)
> PRO for Free [...](https://wordpress.org/support/topic/pro-for-free/)

**Please support plugin development**

Support the advancement of this plugin:

*   <a href="https://wordpress.org/support/plugin/ad-inserter/reviews/?filter=5#new-post">Rate it</a> - positive ratings and reviews are a great way to show your appreciation for my work. Besides being an incredible boost to my morale, they are also a great incentive to fix any bug found in the software and to add new features for better monetization of your website.
*   <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LHGZEMRTR7WB4">Donate</a> if Ad Inserter helps you to make money with advertising
*   Register for [Ad Inserter Pro Affiliate](https://affiliate.adinserter.pro/), promote the plugin on your website and earn commission for each purchase you refer
*   Buy license for [Ad Inserter Pro](https://adinserter.pro/)

== Installation ==

[Plugin installation](https://adinserter.pro/documentation/plugin-installation)

**Online Documentation**

*   [Documentation](https://adinserter.pro/documentation)
*   [Ads not displayed](https://adinserter.pro/documentation/troubleshooting#ads-not-displayed)
*   [Troubleshooting](https://adinserter.pro/documentation/troubleshooting)
*   [Code Editing](https://adinserter.pro/documentation/code-editing)
*   [Common Settings](https://adinserter.pro/documentation/common-settings)
*   [Automatic Insertion](https://adinserter.pro/documentation/automatic-insertion)
*   [Block Alignment and Style](https://adinserter.pro/documentation/alignments-and-styles)
*   [AdSense Ads](https://adinserter.pro/documentation/adsense-ads)
*   [WordPress Page Types](https://adinserter.pro/documentation/wordpress-page-types)
*   [Black and White Lists](https://adinserter.pro/documentation/black-and-white-lists)
*   [Post and Page Exceptions](https://adinserter.pro/documentation/individual-post-and-page-exceptions)
*   [Debugging](https://adinserter.pro/documentation/debugging)


== Frequently Asked Questions ==

= Settings for ... =

Check <a href="https://adinserter.pro/documentation/common-settings" target="_blank">common settings</a>

= Does Ad Inserter insert any internal ads? =

No revenue sharing and no such thing as "internal ads" or "our ads" on your website. Period. What you configure is what will be inserted (+ some internal scripts for plugin features).
Ad Inserter is free, open source plugin and inserts only the code you configure (blocks, Header, Footer). The code you see is the code that will be inserted. Please check page source code before you make any conclusion.
Of course, if you configure block with some JavaScript ad code, then this code may insert some additional code or show ads. But please, don't blame the plugin for this.
You can also use this plugin to insert code for AdSense Auto ads on each page (usually in the header). However, **the exact placement of ads will be done by the ad code, not Ad Inserter!**
[https://adinserter.pro/documentation/adsense-ads#auto-ads](https://adinserter.pro/documentation/adsense-ads#auto-ads)

The easiest way to check inserted blocks is to use **Label blocks** debugging function:
[https://adinserter.pro/documentation/debugging](https://adinserter.pro/documentation/debugging)

Please note that when you disable the plugin you also disable insertion of all codes and blocks you have configured.
Therefore, if your issues go away when you disable the plugin THIS DOES NOT INDICATE any issue with the plugin! You need to try to [disable individual codes](https://adinserter.pro/documentation/debugging#back-end) to see which one is causing trouble.

= What is remote debugging? =

Ad Inserter is basically used to insert ad codes according to the settings.
When the code is not inserted where it is expected or the inserted HTML/Javascript code does not display anything, you as the site administrator can use [debugging functions](https://adinserter.pro/documentation/debugging) to diagnose insertions.

Those tools are normally available to the administrator of the website and are shown as a menu item in the admin bar.
When you will ask for help on the [support forum](https://wordpress.org/support/plugin/ad-inserter/) we'll ask you to enable remote debugging so the support team will be able to access debugging tools via url.

This will allow the support team to:

*   Label inserted blocks - a border will be drawn around the blocks and a bar will be shown above them so the support will be able to see if/where and which blocks are inserted.
*   Show possible positions for automatic insertion - in places where WP hooks are called a label is placed so the support will be able to see where your theme calls WP hooks
*   See processing log - the log is inserted as HTML comment at the end of the page and shows data and settings used by Ad Inserter and the log of the plugin functions/hooks called during page generation - the support will be able to see the reason why some block was not inserted, how many times `the_content` hook is called, etc.
*   Disable block insertions - sometimes the issues are caused by the inserted code - this way the support will be able to quickly disable insertions of Ad Inserter blocks to see the difference

Pages with debugging info are not cached - the debugging process will not be visible to anybody else. Once the help is not needed anymore you can disable remote debugging.

= I have installed code for AdSense and I see ads placed at random positions. =

You are probably using code for [AdSense Auto ads](https://adinserter.pro/documentation/adsense-ads#auto-ads).

Auto ads (known also as Page Level Ads) is a code that you insert on every page once and it will automatically display ads on positions chosen by the code.
The code uses Google's machine learning to pick the best placements on your pages to show adverts.

Auto ads may not be suitable for some WordPress themes or layouts. In such cases it is easier to place ads at wanted locations by using [normal AdSense code](https://adinserter.pro/documentation/adsense-ads#ad-unit) and specifying exact locations where the code should be inserted.

= I have installed code for AdSense but the ad blocks are blank. =

Blank ad block means that the code is inserted properly, only the ad code doesn't display ads.
This happens when Google for some reason does not serve ads for the website, page or specific ad block - the block remains unfilled.
Ad Inserter can detect, [hide](https://adinserter.pro/documentation/adsense-ads#hiding-blank-adsense-blocks) or [replace](https://adinserter.pro/documentation/adsense-ads#replacing-blank-adsense-blocks) blank AdSense blocks.
Please check <a href="https://adinserter.pro/documentation/troubleshooting#ads-not-displayed">Ads Not Displayed</a> for more information.

= What is GDPR? =

The GDPR (General Data Protection Regulation) is a regulation in European Union (EU) on data protection and privacy for all individuals within the EU and the European Economic Area (EEA) that was designed to harmonize data privacy laws across Europe. If you collect personal information from any EU citizen (within or outside the EU), you must first obtain explicit and unambiguous consent.

= GDPR compliance: What cookies does the plugin use =

Ad Inserter itself does not use cookies except for ad blocking detection when you use delayed action.

In this case 3 cookies may be used (to store pageviews and action settings): `aiADB`, `aiADB_PV` and `aiADB_PR`. However, no personal data is stored in the cookies.

Of course, the ads you may insert with the plugin may use own cookies - please check with ad networks for details.

= How to display a GDPR compliant cookie message? =

You can use any plugin for GDPR compliance / cookie consent. You can also prevent inserting ad codes and displaying ads before the consent is given - check [How to show ads based on visitors' consent](https://adinserter.pro/faq/gdpr-compliance-cookies-consent).

PLEASE NOTE: Installing GDPR plugin alone does not make your site GDPR compliant. Since ads you insert may use various cookies, you may need to make sure you have necessary configurations in place. Please check next question regarding showing ads based on visitor's consent.

= How to show ads based on visitor's consent? =

Ad Inserter supports inserting ad codes (and showing ads) based on cookies or cookie values. You can define cookie conditions by black/whitelisting *Url parameters* (where also [cookies are checked](https://adinserter.pro/documentation/black-and-white-lists#cookies)).

PLEASE NOTE: If you are using caching (very likely) you also need to set **Dynamic blocks** to **Client-side insert** (tab &#9881; / tab General) in order to check cookies in visitor's browser and not when the page is generated.

For example, If you are using one of the following plugins for the consents you need to **whitelist the following cookie and value in Url parameter list**:

*   [CookieYes | GDPR Cookie Consent & Compliance Notice](https://wordpress.org/plugins/cookie-law-info/) - Whitelist `cookielawinfo-checkbox-advertisement=yes`
*   [Cookie Notice for GDPR](https://wordpress.org/plugins/cookie-notice/) - Whitelist `cookie_notice_accepted=true`
*   [Cookie Consent](https://wordpress.org/plugins/uk-cookie-consent/) - Whitelist `catAccCookies=1`
*   [Quantcast Choice](https://wordpress.org/plugins/quantcast-choice/) or any other solution based on IAB TCF 2.0 - For Google ads (AdSense) whitelist `tcf-google, tcf-no-gdpr`

Make sure **Dynamic blocks** are set to **Client-side insert** (tab &#9881; / tab General). For more details please check [How to show ads based on visitors' consent](https://adinserter.pro/faq/gdpr-compliance-cookies-consent).

= Will Ad Inserter work when jQuery is deferred? =

Yes!

Make sure **Wait for jQuery** is set to Enabled in [general plugin settings](https://adinserter.pro/documentation/plugin-settings#wait-for-jquery) (tab &#9881; / tab General).

= How to minimize redirects? =

Ad Inserter does not do any redirects, it only inserts ad codes as configured.

If you see any report (for example from GTmetrix) suggesting to minimize redirects you need to first check where the redirects are located (on which page or domain) - if they are on other (ad network) domains you don't control, then there is nothing you can do (nobody except ad network can change this).

For details please check this page: [How to optimize plugin settings](https://adinserter.pro/faq/how-to-optimize-plugin-settings)

= What is plugin usage tracking? =

When enabled, the information regarding WordPress environment and Ad Inserter usage will be collected and sent to plugin developers (once per month and on events like plugin activation/deactivation). See detailed explanation below.

= Privacy Policy - Plugin Usage Tracking =

When enabled, the information regarding WordPress environment and Ad Inserter usage will be collected and sent to plugin developers (once per month and on events like plugin activation/deactivation).

This is completely optional and can be disabled at any time. So if you have opted in (by clicking Allow when asked for permission) and now you would like to disable tracking, you should go to tab &#9881; / tab General, select **Disable** for Plugin usage tracking and save settings.

If this setting is not available then you have not selected any option yet - **tracking is disabled unless explicitly enabled** by clicking Allow when asked for permission (or when this setting is set to Enable).

What data is collected: Ad Inserter version, activation status, number of active blocks, date of installation, date of last saved settings, status of review notice and remote debugging, block class name, location, website url and name, WordPress version, language, text direction, charset, number of posts, active theme and version, list of installed plugins, PHP version, server name, IP address (used to determine country), site count for multisite installations, deactivation reasons and details (if provided).

Ad Inserter is only a plugin for WordPress content management software. It works together with WordPress, other installed plugins and selected theme.

This data provides information to make the plugin to be compatible with as many environments as possible, to test the plugin with commonly used plugins and themes, to understand why users deativate (and uninstall) the plugin and to get ideas to make improvements to the plugin.

If you are not happy to reveal this information and you have opted in, simply disable usage tracking as described above.

**Your decision will be respected.**


== Screenshots ==

1. Settings for one code block (Before content).
2. Code preview with visual CSS editor
3. Code preview with visual CSS editor - highlighted code
4. Post / Page Ad Inserter Individual Exceptions
5. Some <a href="https://adinserter.pro/" target="_blank">Ad Inserter Pro</a> features: IP address and country lists, Scheduling between dates with fallback
6. Ad Inserter plugin settings
7. Visualization of HTML tags in post
8. Visualization of positions for automatic insertion in post
9. Visualization of inserted block in post
10. Automatic insertion, Alignment and Style settings
11. Rotation code editor and banner code generator
12. Settings for automatic insertion before/after paragraphs
13. Settings for custom hooks
14. Settings automatic insertion at custom hook positions
15. Settings ad blocking detection
16. AdSense code generator
17. Complete settings for one code block (Before Paragraph)


== Changelog ==

= 2.7.12 =
- Security fix for settings page save url
- Added support to disable ad blocking detection for specific devices
- Few minor bug fixes, cosmetic changes and code improvements

= 2.7.11 =
- Security fix for sites using constants to prevent file editing or unfiltered HTML
- Added filters before the options are saved
- Added support for a shortcode for comma separated list of categories with quotes (for Google Ad Manager)
- Few minor bug fixes, cosmetic changes and code improvements

= 2.7.10 =
- Security fix for XSS (Reported by Krzysztof Zajac via WPScan)
- Added support to detect and replace blank AdSense blocks
- Added support to load and save plugins settings to a file (Pro only)
- Added support for parallax ads (Pro only)
- Few fixes

= 2.7.9 =
- Bug fix for timed rotations
- Bug fix for tr_TR translation
- Improved checks for cookies
- Improved compatibility with PHP 8.1
- Added separate list for cookies
- Few minor bug fixes, cosmetic changes and code improvements

= 2.7.8 =
- Bug fix for paragraph counting and clearance
- Bug fix for undefined constant error

= 2.7.7 =
- Few bug fixes

= 2.7.6 =
- Improved compatibility with PHP 8
- Added translation for tr_TR
- Added support to wait for an interaction before the block is loaded (Pro only)
- Added support to delay insertion of the block (Pro only)
- Few minor bug fixes, cosmetic changes and code improvements

= 2.7.5 =
- Few minor bug fixes, cosmetic changes and code improvements

= 2.7.4 =
- Updated Google API
- Improved labels for AdSense Auto ads
- Added external tracking support for WP username (Pro only)
- Few minor bug fixes, cosmetic changes and code improvements

= 2.7.3 =
- Improved ad blocking detection
- Improved compatibility with PHP 8
- Improved check for update server accessibility (Pro only)
- Few minor bug fixes, cosmetic changes and code improvements

= 2.7.2 =
- Added shortcuts for TCF v2 consent cookie checks
- Added support for adinserter shortcode to get post ID
- Improved ad blocking detection
- Changed internal IP to country database (Pro only)
- Few minor bug fixes, cosmetic changes and code improvements

= 2.7.1 =
- Added shortcuts for TCF v2 consent cookie checks
- Improved ad blocking detection
- Changed internal IP to country database (Pro only)
- Few minor bug fixes, cosmetic changes and code improvements

= 2.7.1 =
- Improved ad blocking detection
- Few minor bug fixes, cosmetic changes and code improvements

= 2.7.0 =
- Added support to list range of post IDs
- Added support for browser language in client lists
- Added support for client-side checks for filter hook ai_block_insertion_check
- Added support for remote plugin managenent (Pro only)
- Added support for scheduling check shortcode (Pro only)
- Added support for daily scheduling time (Pro onlyl)
- Added support for css attribute in check options (Pro only)
- Few minor bug fixes, cosmetic changes and code improvements

= 2.6.27 =
- Added support for scheduled rotation
- Few minor bug fixes, cosmetic changes and code improvements

= 2.6.26 =
- Few bug fixes (Pro only)

= 2.6.25 =
- Added support for block names in adinserter shortcode block attributes
- Added support for default custom field values
- Added support to list post ID range
- Improved ad blocking detection
- Reduced layout shift when using CHECK shortcodes
- Fix for expanded shortcodes in the rotate code generator
- Few minor bug fixes, cosmetic changes and code improvements

= 2.6.24 =
- Added support for consent attribute for code generator for AdSense and Amazon AMP ads
- Added support for random number shortcode
- Added support for && and !! operators in client-side client list checks
- Added scheduling time on blocks list (Pro only)
- Improved undismissible message when ad blocking is detected
- Few minor bug fixes, cosmetic changes and code improvements

= 2.6.23 =
- Reduced layout shift when using lists and client-side dynamic blocks
- Few minor bug fixes, cosmetic changes and code improvements

= 2.6.22 =
- Various security fixes
- Updated AdSense API authorization process
- Reduced layout shift when using client-side device detection
- Added option to block IP addresses for click fraud protection (Pro only)
- Few minor bug fixes, cosmetic changes and code improvements

= 2.6.21 =
- Improved compatibility with PHP 8
- Few minor bug fixes, cosmetic changes and code improvements

= 2.6.20 =
- Added support for alt text and lazy loading for banner code generator
- Few minor bug fixes, cosmetic changes and code improvements

= 2.6.19 =
- Improved code to reduce layout shift when using client-side device detection
- Added translation for es_ES
- Added translation for fr_FR
- Added translation for it_IT
- Improved compatibility with PHP 8
- Few minor bug fixes, cosmetic changes and code improvements

= 2.6.18 =
- Added support to change Dynamic blocks setting for adinserter PHP function call
- Few minor bug fixes, cosmetic changes and code improvements

= 2.6.17 =
- Fix for double client-side insertions when using geolocation (Pro only)

= 2.6.16 =
- Added support for ad blocking detection action every n pageviews
- Added support to individually disable pageview or click tracking (Pro only)
- Changed IAB TCF v2 cookie check name from euconsent-v2 to tcf-v2 (euconsent-v2 will still work)
- Fix for category check on category pages
- Fix for issues with Safari browser
- Few minor bug fixes, cosmetic changes and code improvements

= 2.6.15 =
- No ad blocking detection actions for crawlers and bots
- Fix for processing Ad Inserter shortcodes inside HTML tags
- Few minor bug fixes, cosmetic changes and code improvements

= 2.6.14 =
- Added support to insert [embed] shortcodes
- Few minor bug fixes, cosmetic changes and code improvements

= 2.6.13 =
- Few minor bug fixes

= 2.6.12 =
- Improved ad blocking detection
- Added options to delay client-side insertions at HTML element
- Added support to check for multiple cookie values (needed for IAB TCF 2.0)
- Added filter hooks for block processing
- Few minor bug fixes, cosmetic changes and code improvements

= 2.6.11 =
- Added support for IAB Transparency & Consent Framework 2.0
- Added support for taxonomy for primary category
- Added support for taxonomy for post meta data
- Added support to invert contain/do not contain text condition for paragraph counting
- Few minor bug fixes, cosmetic changes and code improvements

= 2.6.10 =
- Added user taxonomy items for logged-in and not logged-in users
- Added option to define tab setup delay (for the plugin settings page)
- Added option to insert unique ad rotation options when block is inserted more than once
- Added support for client-side device detection for AMP pages (for method Show)
- Added support for code generator for Amazon AMP ads
- Added support for custom tracking events (Pro only)
- Few minor bug fixes, cosmetic changes and code improvements

= 2.6.9 =
- Added option for paragraph counting to search only tag attributes for text
- Added option to embed block Javascript code (to be loaded with Ajax calls)
- Added support to prevent duplicate insertions when the_content filter is called more than once (experimental)
- Added support for the client list to check for partial user agent strings
- Added support for check of cookie object properties
- Improved ad blocking detection
- Viewports no longer need to be in descending width order
- Added option to protect inserted block content (Pro only)
- Added support for adb scripts path filter hook (Pro only)
- Added support to export statistics data to CSV file (Pro only)
- Few minor bug fixes, cosmetic changes and code improvements

= 2.6.8 =
- Added support to disable PHP processing by PHP constant
- Added support to repeat COUNT options
- Added support for offset for %n paragraph number (%n@o)
- Added support for options to skip insertion for first and last paragraphs
- Added support for hook filter 'ai_block_insertion_check'
- Added support for background ads (Pro only)
- Few minor bug fixes, cosmetic changes and code improvements

= 2.6.7 =
- Added support for various shortcodes for post categories
- Added support for various shortcodes for post tags
- Added support for user action on click (Pro only)
- Added support for manual loading (Pro only)
- Few minor bug fixes, cosmetic changes and code improvements

= 2.6.6 =
- Fix for exceptions list not showing all exceptions
- Improved ad blocking detection
- Fix for close button in preview window (Pro only)
- Few minor bug fixes, cosmetic changes and code improvements

= 2.6.5 =
- Added support for url data shortcode
- Added warning if not all exceptions were cleared
- Added support for MaxMind country only database (Pro only)
- Added support for ip to country lookup filter hook (Pro only)
- Fix for country groups in CHECK separators (Pro only)
- Few minor bug fixes, cosmetic changes and code improvements

= 2.6.4 =
- Fix for use of undefined constant warning (Pro only)

= 2.6.3 =
- Added support for shortcodes to disable block insertion
- Added support for child taxonomy list items
- Added random parameter to Ajax requests for geolocation (Pro only)
- Added options to define external tracking event category, action and label (Pro only)
- Number of custom hooks increased to 20
- Fix to prevent insertion into head section when using Rank Math plugin
- Few minor bug fixes, cosmetic changes and code improvements

= 2.6.2 =
- Added support to disable caching of block PHP code
- Added support to pause blocks on the blocks list
- Added support for no url parameters list item
- Added support for client-side scheduling (Pro only)
- Added support for server-side scheduling using W3TC (Pro only)
- Added support for multisite:site-id taxonomy list item (Pro only)
- Updated MaxMind GeoLite2 database download using license key (Pro only)
- Changed settings format in the database to prevent export/import issues with MySQL/PhpMyAdmin
- Fix for [ADINSERTER counter] shortcode not expanding inside HTML tags
- Few minor bug fixes, cosmetic changes and code improvements

= 2.6.1 =
- Fix for errors on the settings page
- Fix for non English characters in ads
- Fix for sticky widgets
- Few minor bug fixes

= 2.6.0 =
- Added support for VIEWPORT separator
- Added support for viewport check in CHECK separators (Pro only)
- Added support to show processing log on front-end
- Added support to show link to the Ad Inserter Pro settings page on multisite Sites page (Pro only)
- Added support to detect and prevent document.write after DOM is ready
- Added support for scheduling hours (Pro only)
- Added support for scheduling days in week (Pro only)
- Added support for W3TC insertion debugging info
- Improved Javascript code for client-side functions
- Improved ad blocking detection
- Default value for Wait for jQuery set to Enabled
- Few minor bug fixes, cosmetic changes and code improvements

= Earlier versions =

For the changelog of earlier versions, please refer to the separate changelog.txt file.

== Upgrade Notice ==

= 2.7.12 =
Security fix for settings page save url;
Added support to disable ad blocking detection for specific devices;
Few minor bug fixes, cosmetic changes and code improvements

= 2.7.11 =
Security fix for sites using constants to prevent file editing or unfiltered HTML;
Added filters before the options are saved;
Added support for a shortcode for comma separated list of categories with quotes (for Google Ad Manager);
Few minor bug fixes, cosmetic changes and code improvements

= 2.7.10 =
Security fix for XSS (Reported by Krzysztof Zajac via WPScan);
Added support to detect and replace blank AdSense blocks;
Added support to load and save plugins settings to a file (Pro only);
Added support for parallax ads (Pro only);
Few fixes

= 2.7.9 =
Bug fix for timed rotations;
Bug fix for tr_TR translation;
Improved checks for cookies;
Improved compatibility with PHP 8.1;
Added separate list for cookies;
Few minor bug fixes, cosmetic changes and code improvements

= 2.7.8 =
Bug fix for paragraph counting and clearance;
Bug fix for undefined constant error

= 2.7.7 =
Few bug fixes

= 2.7.6 =
Improved compatibility with PHP 8;
Added translation for tr_TR;
Added support to wait for an interaction before the block is loaded (Pro only);
Added support to delay insertion of the block (Pro only);
Few minor bug fixes, cosmetic changes and code improvements

= 2.7.5 =
Few minor bug fixes, cosmetic changes and code improvements

= 2.7.4 =
Updated Google API;
Improved labels for AdSense Auto ads;
Added external tracking support for WP username (Pro only);
Few minor bug fixes, cosmetic changes and code improvements

= 2.7.3 =
Improved ad blocking detection;
Improved compatibility with PHP 8;
Improved check for update server accessibility (Pro only);
Few minor bug fixes, cosmetic changes and code improvements

= 2.7.2 =
Added shortcuts for TCF v2 consent cookie checks;
Added support for adinserter shortcode to get post ID;
Improved ad blocking detection;
Changed internal IP to country database (Pro only);
Few minor bug fixes, cosmetic changes and code improvements

= 2.7.1 =
Added shortcuts for TCF v2 consent cookie checks;
Improved ad blocking detection;
Changed internal IP to country database (Pro only);
Few minor bug fixes, cosmetic changes and code improvements;

= 2.7.1 =
Improved ad blocking detection;
Few minor bug fixes, cosmetic changes and code improvements

= 2.7.0 =
Added support to list range of post IDs;
Added support for browser language in client lists;
Added support for client-side checks for filter hook ai_block_insertion_check;
Added support for remote plugin managenent (Pro only);
Added support for scheduling check shortcode (Pro only);
Added support for daily scheduling time (Pro onlyl);
Added support for css attribute in check options (Pro only);
Few minor bug fixes, cosmetic changes and code improvements

= 2.6.27 =
Added support for scheduled rotation;
Few minor bug fixes, cosmetic changes and code improvements

= 2.6.26 =
Few bug fixes (Pro only)

= 2.6.25 =
Added support for block names in adinserter shortcode block attributes;
Added support for default custom field values;
Added support to list post ID range;
Improved ad blocking detection;
Reduced layout shift when using CHECK shortcodes;
Fix for expanded shortcodes in the rotate code generator;
Few minor bug fixes, cosmetic changes and code improvements

= 2.6.24 =
Added support for consent attribute for code generator for AdSense and Amazon AMP ads;
Added support for random number shortcode;
Added support for && and !! operators in client-side client list checks;
Added scheduling time on blocks list (Pro only);
Improved undismissible message when ad blocking is detected;
Few minor bug fixes, cosmetic changes and code improvements;

= 2.6.23 =
Reduced layout shift when using lists and client-side dynamic blocks;
Few minor bug fixes, cosmetic changes and code improvements

= 2.6.22 =
Various security fixes;
Updated AdSense API authorization process;
Reduced layout shift when using client-side device detection;
Added option to block IP addresses for click fraud protection (Pro only);
Few minor bug fixes, cosmetic changes and code improvements

= 2.6.21 =
Improved compatibility with PHP 8;
Few minor bug fixes, cosmetic changes and code improvements

= 2.6.20 =
Added support for alt text and lazy loading for banner code generator;
Few minor bug fixes, cosmetic changes and code improvements

