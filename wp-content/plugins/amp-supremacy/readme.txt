=== AMP Supremacy ===
Contributors: Todd Spears
Donate link: http://ampsupremacy.com
Tags: AMP, Accelerated Mobile Pages, AMP Validator, Design your Accelerated Mobile Pages
Requires at least: 1.0.01
Tested up to: 4.8
Stable tag: 2.0.13
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

AMP Supremacy | Accelerated Mobile Pages
By the makers of Project Supremacy.

== Description ==

AMP Supremacy | Accelerated Mobile Pages - By the makers of [Project Supremacy](http://projectsupremacy.com/).

AMP Supremacy is a highly configurable one click install plugin to easily add AMP functionality to your websites pages, posts, categories and even tags!
Custom design features include header logo, favicon and color styling for your page titles and articles.

Easy to set up, easy to configure.  We've even built in a mobile friendly test just because we can!

Enjoy!

== Installation ==

This section describes how to install the plugin and get it working.

e.g.

1. Upload the plugin files to the `/wp-content/plugins/amp-supremacy` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Click on 'AMP Supremacy' menu item at your WP Dashboard to play with settings


== Frequently Asked Questions ==

= What does AMP stand for and why should I use it? =

AMP is Accelerated Mobile Pages. AMP will render your current posts & pages into a text and image only style in which page load times drop drastically.  Google displays AMP related pages in an AMP carousel at the top of their pages increasing your sites traffic.

= How will I be able to see the AMP version of my page? =

After installing and configuring the plugin hit save.  Then just add /amp at end of any page URL on your site and you will see a nice AMPd version of your page.

= Where do I get additional support on this plugin? =

Ask us your query at [AMP Support](http://amp.freshdesk.com) and we will get back to you.

= I have cloudflare working behind my pages, is that fine with AMP? =

No, AMP do not support cloudflare yet so you will need to stop Rocket Loader in your cloud flare to inject scripts on AMP Pages. So that cloudflare is restricted for AMP Pages only with URL ending with `/amp`

= I have AMP Supremacy installed but unable to find AMP Sitemap. Is there something I am missing? =

You are so close to AMP Sitemap. Go to your AMP Settings in dashboard and register for AMP Sitemap Add-on. You will find the instructions to use this add-on while registering. You can got to [Register for AMP Supremacy Sitemap](http://ampsupremacy.com/sitemap-addon) to get a copy of AMP Sitemap Addon as well.

= What is AMP Sitemap. Why do I need it? =

Sitemap carries the list of AMP Pages operating on your website. They must follow the Google Sitemap validation schema. Submission of your sitemap to Google will add to your website's SEO and Google will be able to know what are the links to your AMP Pages so that it can index those pages in Google Search Results.

= How I can display my AMP Sitemap in posts / pages? =

Just add a shortcode `[amp-supremacy-sitemap]` in your posts / pages to display AMP Sitemap.

== Screenshots ==

1. This is settings page.
2. AMP on every device.

== Changelog ==

= 2.0.13 =
*	Tested the plugin compatibility with Wordpress 4.8 and fixed the incompatibility issues which surfaced.
*   Made UI modifications and improvements in AMP Page UI.
*   Bug Fix: The image light box for images was distorted for some websites.
*   Bug Fix: For many HTTPS websites, the mobile screen did not render the AMP page correctly.

= 2.0.12 =
*	New: Users can now add custom Meta description through AMP Settings page to reflect upon AMP Page.
*   Bug Fix: For some websites, the Home Page is loading some other Post page content.

= 2.0.11 =
*	New: Users can now add custom CSS through AMP Settings page to reflect upon AMP Page.
*	Bug Fix: On AMP Supremacy settings page, when trying to switch AMP On/Off for some page object a window opens up asking for file upload.

= 2.0.10 =
*   New: Users can now share the settings from one website to other(s), search for a option on 'Settings' Tab
*   Bug Fix: In an unordered list the list icon is distorted.
*   Bug Fix: For few websites, the content of paragraph tag got overlapped.
*   Bug Fix: For few websites, The related posts section got 'category' relevant posts when 'tag' is selected.

= 2.0.09 =
*	Bug Fix: The audio file when added with custom HTML gets broken on AMP Page for few sites.
*	Bug Fix: Worked and resolved certain GWT critical errors based upon some HTML tags

= 2.0.08 =
*   Feature: HTML Audio objects must be converted into AMP compatible audio objects.
*   Bug Fix: The tag 'map' is disallowed.
*   Bug Fix: The tag 'area' is disallowed.
*   Bug Fix: The tag 'spandroid' is disallowed
*   Bug Fix: The tag 'proboto',' is disallowed

= 2.0.07 =
*   Bug Fix: AMP Template shortcut icon of structured data image/Favicon Image show AMP Logo, even when changed in AMP Supremacy Settings.
*   Bug Fix: The links in header of the AMP page on small mobile devices should respond to header link and menu link seperatly (not overlapped).
*   Bug Fix: The list of posts in 'Recent Posts' section are having wrong post title for few websites.

= 2.0.06 =
*   Bug Fix: The heading of the page when points to some other website, should not be converted to AMP
*   Bug Fix: The attribute 'alt' may not appear in tag 'div'
*   Bug Fix: The attribute 'href' may not appear in tag 'button'.

= 2.0.05 =
*   Bug Fix: Text files must not be converted to AMP when are appearing as internal link in some AMP Page
*   Bug Fix: Category/Tag description not showing up for few websites
*   Bug Fix: Category/Tag description must be validated on AMP rules before loading it up on AMP Page
*   Bug Fix: Made changes so that the internal links must not be converted into AMP links for pages/posts for which AMP is disabled either individually or globally

= 2.0.04 =
*   Feature: users can opt for displaying Category or Tag description in their category or tags AMP pages respectively.
*   Bug Fix: The large resolution image's height needs to be in ratio with its width - this showed up images as stretched
*   Bug Fix: Home, normal page, category pages are not working for few websites when custom permalink is used

= 2.0.03 =
*   Bug Fix: Images are distorted for very small resolution on mobile devices.
*   Bug Fix: For custom permalinks the post, pages, categories and tags AMP pages redirects to wrong content.
*   Bug Fix: The category page bears wrong posts for some websites.

= 2.0.02 =
*   Bug Fix: The amp-form extension is loading up for few cases contributing to a non-critical error
*   Bug Fix: The form action must load the current page URL is action attribute is missing.
*   Bug Fix: Text was getting compressed for few websites when viewed in Mobile emulator

= 2.0.01 =
*   Bug Fix: AMP Page has got few PHP errors showing up after upgrade to 2.0.0
*   Added a option which will let users to opt out of invalid AMP elements to load on AMP Pages

= 2.0.0 =
*   The whole new user interface.
*   Mobile Emulator to experience instant change.

= 1.2.28 =
*   Bug Fix: Hotlinked images are squished and distorted. They should appear fine and follow aspect ratio.
*   Bug Fix: Resolution of couple of non-critical issues related to loading AMP resources.

= 1.2.27 =
*   Bug Fix: form action attribute is invalid for method=POST
*   Bug Fix: Google Verification code is not appearing in AMP Page
*   Bug Fix: Language Attributes in HTML tag on AMP page are not loading for some websites.

= 1.2.26 =
*   Bug Fix: The page links in AMP pages are not responding on some iOS devices.
*   Bug Fix: The heading of the post is distorted and overlaps with other text, for very small devices.
*   Bug Fix: Few posts are missing in category AMP pages for some users' website(s).
*   Code optimizations and changes to remove repetitive code.

= 1.2.25 =
*   Bug Fix: The attribute 'href' may not appear in tag 'button'
*   Bug Fix: Made changes so that image URLs are not converted into AMP URLs. This lead to creation of AMP '/amp' URL for images which then resulted in 404 error generation through Google Crawl.
*   Added a favicon at AMP Supremacy Settings page

= 1.2.24 =
*   Bug Fix: Fixed the wrong generation of closing 'amp-img' tag.
*   Bug Fix: Made fixes in related posts display on AMP Pages.
*   Bug Fix: Logo size of logo image in structured data got distorted, its fixed now.
*   Bug Fix: Made improvements in typography of post content displayed in AMP Pages.

= 1.2.23 =
*   Bug Fix: For many users, there was an error with images, this did not let the load images on AMP Pages for them. Made the required fix.
*   Bug Fix: Their were few issues with page responsiveness for the devices less than 320px resolution.

= 1.2.22 =
*   Bug Fix: Images are not aligned properly at very small screen resolution.
*   Bug Fix: The icons of menu, tags, category were not aligned properly at smaller screens

= 1.2.21 =
*   Bug Fix: Iframes on AMP Pages were distorted in some cases.
*   Bug Fix: The relevancy for recent posts did not follow the selection for some websites.
*   Improvements in AMP Supremacy settings page UI.

= 1.2.20 =
*   Bug Fix: The amp-youtube extension is not loading for few webistes when the post contains youtube content.
*   Bug Fix: For some, websites the Home Page did not load the right content.
*   Bug Fix: The text for the post content text is in blue color for first time users, changed this to black.

= 1.2.19 =
*   Bug Fix: Many users are getting a PHP error logged in their server log file through plugin.
*   Bug Fix: 'Hide Site Name in Header' is not working for few websites
*   Bug Fix: The logo size mentioned through settings is not matching to logo dimensions at AMP Page.

= 1.2.18 =
*   Bug Fix: Yoast is not supplying a canonical URL for few websites. Added a filter to load canonical URL if yoast does not.

= 1.2.17 =
*   Bug Fix: The sidebar extension must not load when 'menu' is disabled in AMP Settings.
*   Bug Fix: The lightbox is not working for some websites.
*   Bug Fix: Title picked up in structured data is wrong for few websites.
*   Bug Fix: From recent release, default menu show up instead of selected AMP menu.

= 1.2.16 =
*   Bug Fix: Fixed color picker issue in AMP Supremacy settings.
*   Bug Fix: Style improvements in AMP Page.

= 1.2.15 =
*   New Feature: Enable/Disable AMP for some post / page via post/page listing.
*   Bug Fix: Fixed AMP Page style after RTL support is enabled.
*   Bug Fix: Issue with image upload for header logo.

= 1.2.14 =
*   Bug Fix: The attribute 'clear' may not appear in tag 'br' and...
*   Bug Fix: The attribute 'action' may not appear in tag 'FORM [method=POST]'.
*   Minor instruction modifications at settings page.

= 1.2.13 =
*   The page is loading 'amphtml' URL at home page when custom page is set to home page even when home page is dropped in settings
*   Bug Fix: The home page loads wrong content for some websites.

= 1.2.12 =
*   WMT Error Fix: The tag 'spanhelvetica' is disallowed.
*   Added lang attribute in HTML tag of AMP page
*   Added a SEO pointer for language in HEAD of AMP Page
*   Bug Fix: The 'amp-lightbox' not loaded but required for some websites.

= 1.2.11 =
*   Bug Fix: Few PHP methods which took longer execution time and sometimes not allowed by user's server configurations and environment.
*   Minor design and performance improvements.

= 1.2.10 =
*   Bug Fix: Image width bug with structured data.
*   Bug Fix: Lightbox on Images is not working for few websites.
*   Bug Fix: The menu being displayed in sidebar loads distorted.
*   Bug Fix: Post/Page settings not overwriting the global settings for some websites.

= 1.2.9 =
*   Bug Fix: AMP Page is not loading up for some websites.
*   Bug Fix: Add/Edit of Post/Page is erroneous when plugin is active for some websites.
*   Change: Changes the URL for AMP Supremacy Banner Image

= 1.2.8 =
*   Bug Fix: Canonical URL appears more than once for Project Supremacy Users (in case user still find this error, please upgrade to latest version of 'Project Supremacy').
*   Bug Fix: The target attribute in anchor tag has got invalid value ''.

= 1.2.7 =
*   Bug Fix: Unwanted PHP Notice showing up

= 1.2.6 =
*   Update: Endpoint to know if AMP page is loaded is renamed from 'is_amp_endpoint' to 'is_amp_supremacy_endpoint'.
*   New: Users will be able to set post / page specific settings, search for 'AMP Supremacy Options' in sidebar of your post's / page's edit page.
*   New: Ability to disable or enable AMP for some particular post or page.
*   Bug Fix: Few AMP external resources did not load when required on Tags / Categories AMP Page.

= 1.2.5 =
*   Major code optimizations and improvements

= 1.2.4 =
*   Bug Fix: The tag 'spantimes' is disallowed.
*   Code optimizations and performance monitored / improved.
*   Bug Fix: URL construction showed up issues for some websites in AMP Page

= 1.2.3 =
*   Bug Fix: Fixed several GWT Non-Critical Errors.

= 1.2.2 =
*   Bug Fix: Fixed AMP Warnings based upon library inclusion.

= 1.2.1 =
*   Added a 'Scroll to Top' link in the footer of the AMP Page
*   Bug Fix: Division by Zero warning showing up.

= 1.2.0 =
*   Several GWT Validation issue fixes.
*   Unwanted PHP notices displayed for some specific settings
*   Resolution to issue that registered users are able to see the message saying tha you are unregistered for AMP Supremacy Lite.

= 1.0.99 =
*   New: Added a section for 'Related Posts' and these can be controlled through AMP Settings.
*   Minor Style improvements.

= 1.0.98 =
*   Bug Fix: The capability for users to hide the site name did not work for some website.
*   Bug Fix: Couple of PHP Notices showed up through menu on AMP Pages for a non conventional case.
*   Bug Fix: Structured Data improvements and modifications.

= 1.0.97 =
*   There were couple of PHP7 compatibility issues and they are resolved.
*   Code Optimizations and improvements so that plugin runs faster.
*   Bug Fix: Yoast Plugin and Project Supremacy SEO data fetching on AMP Pages had few issues.
*   Few AMP validation issues surfaced through some recent releases were resolved.

= 1.0.96 =
*   Bug Fix: The amp-image-lightbox> must not be a decendent of <amp-sidebar> element.
*   Bug Fix: Lightbox effect is not working for featured images at many sites.

= 1.0.95 =
*   Minor bug fixes

= 1.0.94 =
*   For some websites the AMP Supremacy Lite settings on AMP Settings Page is showing non-authorized message.

= 1.0.93 =
*   Minor bug fixes and improvements

= 1.0.92 =
*   Bug Fix: The high resolution images with greater width are exceeding the parent container.
*   Bug Fix: For some websites the pages are not loading the AMP version of the page.
*   Bug Fix: For some websites the intended page redirects to some other page.
*   The structured data should carry the site image if supplied through AMP Supremacy Settings.
*   Bug Fix: The color pickers on AMP Settings Page are not opening up for few users due to JS confliction through other plugin.
*   A hook signalling that AMP Page is being loading will now consider the protected posts and pages while giving the response.

= 1.0.91 =
*   Bug Fix: The AMP is not working for custom permalinks
*   Other minor style related improvements.

= 1.0.90 =
*   Bug Fix: The menu links in AMP Page are not rendering with a trailing slash for some websites.
*   Bug Fix: The menu for some websites is loading with non-AMP Links

= 1.0.89 =
*   Minor bug fixes and style improvements

= 1.0.88 =
*   Bug Fix: Some users facing error with SEO data load on AMP Pages.
*   Other Design related minor fixes.

= 1.0.87 =
*   Bug Fix: The AMP Pages are not loading up for some websites and going to original post page instead.
*   Bug Fix: Tags like p, a, etc are loading up non required attributes.

= 1.0.86 =
*   New: The canonical URL must not load on post / page which is password protected untill user supplies a valid password for the post.
*   New: In the tags and categories page(s), if the any of the listed post(s) is password protected then it should not be displayed.
*   New: The featured image appearing in the AMP Page must be lightbox featured.
*   New: If the post / page is password protected, its AMP version will not be loaded and the user will be redirected to original page instead.

= 1.0.85 =
*   New: User can now switch the AMP Menu on/off through AMP Supremacy Settings
*   New: Added a capability for user to select the menu which he want to be displayed on AMP Page.
*   Bug Fix: Clicking on Title of the post through AMP reports as a unexpected redirect.
*   Bug Fix: Canonical URL trimming of hyper referance is erroneous for some link texts.

= 1.0.84 =
*   New: User can add/edit a logo to be displayed through Structured Data on AMP Google Search Results through AMP Supremacy Settings Page.
*   Bug Fix: Sometimes the logo image in structured data do not gets its dimensions
*   New: Added a hook 'is_amp_endpoint' so themes and plugins can check if AMP Page is being served or not.

= 1.0.83 =
*   Bug Fix: The footer content control and the additional text displayed in footer contains backslashes.
*   Bug Fix: For RTL supporting websites, the page's meta information is distorted.

= 1.0.82 =
*   Bug Fix: The youtube videos are not loading fine for some websites as video ID extraction was broken for few cases.
*   Bug Fix: Forms on AMP pages are contributing to Google AMP Errors.
*   New: The lightbox for images has got some styling improvements.

= 1.0.81 =
*   Bug Fix: AMP pages are not loading for some users or some users are able to see blank screen instead of AMP Page.
*   New Feature: The images in post content will be showed up in lightbox when clicked.
*   New Feature: User can switch Lightbox on/off for his AMP Pages.

= 1.0.80 =
*   Bug Fix: For some users (especially the ones having older version of PHP) the 'AMP Settings' are not loading up.
*   Bug Fix: For some users the AMP settings are showing up couple of PHP warnings.
*   Addition: Added a link to AMP Settings under 'AMP Supremacy' bar in Plugins Page.

= 1.0.79 =
*   New: User can now add text to his AMP Page Footer through AMP Supremacy Settings Page.
*   New: If plugin finds youtube video link in post/page content, it will now render through `amp-youtube` instead of `amp-iframe`.

= 1.0.78 =
*   Bug Fix: The Form action URL should not point to AMP Pages but to real pages.
*   Bug Fix: The menu is not opening up for some websites when menu button is clicked through header.

= 1.0.77 =
*   User can switch whether to convert internal links to AMP or not.
*   Bug Fix: Some customers are facing PHP Warnings through RTL support.
*   Bug Fix: The author name, categories and tags is displaced in RTL Page.

= 1.0.76 =
*   RTL compatibility.

= 1.0.75 =
*   Bug Fix: The issue with forms been loading wrongly when 'action' is empty.

= 1.0.74 =
*   Bug Fix: The text formatting issue.

= 1.0.73 =
*   Bug Fix: The images with width less than 500px is not responsive or device friendly.
*   Bug Fix: Structured Data is broken for some websites.
*   Bug Fix: The author image is overlapping with text coming after it.
*   Bug Fix: Tags count differs from the original count for some pages.

= 1.0.72 =
*   Bug Fix: For some websites the plugin is picking up wrong menu for navigation bar.
*   Bug Fix: The text indentation is appearing to be wrong for the text loaded through Thrive Content Builder.
*   Bug Fix: The images being loaded through Thrive Content Builder are displaced and their aspect ratio is disturbed.
*   Bug Fix: In some cases Thrive Content Builder content is still bearing shortcodes.

= 1.0.71 =
*   Bug Fix: The featured image is not aligned in center of the page for users.
*   The users will be able to avail Google Analytics service through AMP Supremacy Lite

= 1.0.70 =
*   Added capability to switch visibility of featured image on AMP Page

= 1.0.69 =
*   Bug Fix: In case some link inside the post content is some download link then it must not be AMP'd.
*   Bug Fix: The text for some websites distored due to wrong image placements.
*   Bug Fix: Some website's internal links got '/amp' when there is already '/' at the end of the URL.
*   Bug Fix: Add Logo Image and favicon image functionality was broken for some websites because of some recent changes.

= 1.0.68 =
*   Bug Fix: The header logo image and site name must redirect to AMP version instead of non-AMP version
*   Added a capability for user to hide the site name to be displayed through header.
*   Bug Fix: The menu for some websites is loading AMP link source as extended with /ampamp instead of /amp

= 1.0.67 =
*   Modifications made to the tags and category pages' styles - changes 'Written By' to 'Author', the post seperator style changes.
*   If the post is not having the title a placeholder 'Untitled' will appear in place of it.
*   Bug Fix: Sometimes the child cat and tag page redirects back to non-AMP page OR do not loads the AMP page.
*   Bug Fix: The video tag is not allowed and it should be 'amp-video' instead of it.
*   Bug Fix: The 'source' under 'amp-video' tag must not be HTTP sourced - AMP Settings will reach this including form, iframes and videos.

= 1.0.66 =
*   Bug Fix: The Category and Tags pages got some distorted styles as the images and text appeared to be out of parent container.
*   Bug Fix: The link to AMP version of some page is showing up as META in the pages where AMP is made off through AMP Settings.
*   Bug Fix: Child Categories and tags are not loading up the right content but the parent objects are loading the pages right.
*   Bug Fix: Smaller images in the content of page are bouncing up and getting very enlarged.

= 1.0.65 =
*  The links which appear in page content of AMP Pages and are pointing to same website's some other page, should be AMP links.

= 1.0.64 =
* User will be now able to deal with forms as like other secure content (iframe & img) through AMP Settings.
* Bug Fix: The attribute 'type' in tag 'input' is set to the invalid value 'file'.
* Bug Fix: Invalid URL protocol 'http:' for attribute 'action' in tag 'form'.

= 1.0.63 =
* Dealt with the issue that content is not being loaded for the pages contructed via Live Composer.
* UI and AMP Page Style Improvements based on the data being loaded through Live Composer Posts/Pages.
* Bug Fix: The attributes like 'onclick', 'onfocus', 'onsubmit' etc should not appear in any tag.
* Bug Fix: The attribute 'onclick' may not appear in tag 'textarea'.
* Bug Fix: The attribute 'onclick' may not appear in tag 'input'.

= 1.0.62 =
*   Bug Fix: The featured image sometimes is detected but the source URL for the same is not found - this results in GWT Error.
*   Bug Fix: The AMP Page title (when longer title) is exceeding its container.
*   Bug Fix: The AMP Pages are appearing broken for devices with 4 inch screen/display.
*   Compatibility with `Beaver Builder Plugin` - AMP Supremacy will now render the pages constructed with Beaver Page Builder fine.
*   Amazon Affiliate Links - The plugin shows up some errors for Amazon affiliate links being used as Image source.

= 1.0.61 =
*   Bug Fix: Missing URL for attribute 'src' in tag 'amp-img'.
*   Bug Fix: Issue with Publisher Name in Structured Data.
*   Bug Fix: The tag 'amp-iframe' may not appear as a descendant of tag 'amp-sidebar'.
*   Bug Fix: The Navbar for some websites is broken and redirects to a page saying 'Page not found'.
*   Bug Fix: The tables being loaded at AMP pages are not loading data for some websites

= 1.0.60 =
*   The images being loaded on AMP pages will now be following aspect ratio of their actual size.
*   User can now switch on/off the AMP for Home Page of their website.

= 1.0.59 =
*   Bug Fix: The Logo Image in header, when size is increased the image alignment is disturbed and it exceeds header container.
*   Bug Fix: The height/width of the logo is not pre-loaded in AMP settings when once provided.
*   Bug Fix: Visual Editor users didn't get their post content showing up in AMP Pages.
*   Bug Fix: The content and title on AMP pages is not matching the actual one for some websites.
*   Bug Fix: The number categories and tags being displayed under title are not matching the exact/expected number for some websites.

= 1.0.58 =
*   Added a menu on AMP page which will allow users to go to various AMP pages on their website.
*   Added a footer on AMP pages which will bear the Website name and tagline.

= 1.0.57 =
* Bug Fix: The input tags must not bear JS event attributes.
* Bug Fix: 'src' attribute must not be empty for 'iframe'.
* Feature Added: User can now adjust height and width of the logo image being displayed on AMP Page.
* Feature Added: User can input the color code and adjust the darkness of the color being selected in AMP Settings for header, article text color.

= 1.0.56 =
* Minor Bug Fix: AMP pages are not loading for some websites.

= 1.0.55 =
*   Bug Fix : Invalid URL protocol 'javascript:' for attribute 'href' in tag 'a'.
*   Bug Fix : Invalid URL protocol '<amp-img alt='' src='https:'' for attribute 'src' in tag 'amp-img'.
*   Bug Fix : The tag 'font' is disallowed.
*   Bug Fix : The attribute 'nowrap' may not appear in tag 'td'.
*   Bug Fix : Errors with structured data, some users have author and publisher name as " " (space) which is not validated form
*   Bug Fix : The text is exceeding the container. This fix will not let the text to exceed the container boundary and it (text) will be justified now.
*   Bug Fix : Cannot redeclare plugin_get_version()...
*   Added theme color for the users opening AMP pages in Chrome browser / Google App. This color will match to header color of the page.

= 1.0.54 =
*   Bug Fix : The attribute 'style' may not appear in tag 'article'.
*   Bug Fix : The attribute 'type' in tag 'a' is set to the invalid value 'button'.
*   Bug Fix : The attribute 'rel' in tag 'a' is set to the invalid value ''.
*   Bug Fix : The thrive content editor users are able to see no content is loading for AMP pages.
*   All new design of AMP page to appear more decent and more device friendly.

= 1.0.53 =
*   Resolution to error : The attribute 'width' in tag 'amp-iframe' is set to the invalid value '100%'.

= 1.0.52 =
*   Now AMP will run for category and tags pages which do not carry phrase `/category/` and `/tag/` in it.

= 1.0.51 =
*   Bug Fix: The AMP page is loading some unwanted scripts.
*   Bug Fix: Author name, post tags and post categories are breaking.

= 1.0.50 =
*   Resolved the following issue from GWT `The attribute 'target' in tag 'a' is set to the invalid value '_top'.`
*   If the content for some post is empty the it should not display a message saying 'http://www.example.com/amp' could not be found.
*   Added changes to deal with the content loading issue with the posts/pages loaded through 'Thrive Content Builder'.

= 1.0.49 =
*   Minor Bug Fixes.

= 1.0.48 =
*   Added a option so that user can opt to display author name, date of post, post tags or post categories.

= 1.0.47 =
*   Bug Fix: Many HTML Errors reported by Google Webmaster Tool

= 1.0.46 =
*   Bug Fix: Many HTML Errors reported by Google Webmaster Tool

= 1.0.45 =
*   Bug Fix: User is unable to edit, add or remove the feature image in posts and pages when AMP Supremacy is active.
*   Bug Fix: Plugin Activation Error appears (saying unexpected '[') while activating the plugin and plugin activation fails.
*   Bug Fix: When using the shortcodes in posts and pages, Google reporting AMP HTML Validation Errors.

= 1.0.44 =
*   Addon Plugin will create sitemap file for user.
*   Added instructions for user to add their sitemap to Google.

= 1.0.43 =
*   Changes related to Register for Advanced Supremacy Sitemap.

= 1.0.42 =
*   Minor HTML AMP Validation Error fixing
*   Register for Advanced Supremacy Sitemap.

= 1.0.41 =
*   Minor HTML AMP Validation Error fixing

= 1.0.40 =
*   Minor HTML AMP Validation Error fixing

= 1.0.39 =
*   Fixes to the issue with selecting the image for favicon and logo to be displayed on AMP Pages.
*   Fixes an issue with the `Manage Non-Secure Content` control panel .

= 1.0.38 =
*   Improvement to the responsiveness of the pages.
*   Fixes to many errors through Google AMP.

= 1.0.37 =
*   Fixed a issue with AMP Page Responsiveness for some mobile devices.
*   Added a functionality that users can manage loading of images and iframes coming through non-secure sources (http).
*   Improvements to the post content which is removing AMP violating content while parsing.

= 1.0.36 =
*   Improvement to display of tags and categories in post body
*   Fixed a issue that AMP is not loading for some blogs and websites.
*   Fixed issue that plugin is not getting activated in some cases.

= 1.0.35 =
*   Bug fixes to switch between different locations where AMP should apply
*   Added helping window for users to obtain Google Site Verification Code.

= 1.0.34 =
*   Parse user's content of post and correct the violations that can be corrected
*   Support to the images, iframes and form coming up through posts / user content.

= 1.0.33 =
*   Resolution to the issue that AMP Pages are not loading up at Home Pages of websites.

= 1.0.32 =
*   Resolution to issue with structured data coming up on tags and category pages
*   Added up a Facebook Feed from AMP Supremacy Page and 'Ask for Support' button on AMP Settings Page

= 1.0.31 =
*   Resolution to the issue with images through post content which led post not to load

= 1.0.3 =
*   Minor improvement fixes

= 1.0.2 =
*   Adjustments and distribution of AMP Supremacy Logo through the plugin.

= 1.0.1 =
*   The first stable version
*   Allows you to tweak the settings from above to set up how the AMP will be used on your website.
*   Lets you validate your AMP powered pages

== Upgrade Notice ==

= 1.0.2 =
   Minor Bug Fixes

= 1.0.3 =
   Minor Fixes and Improvements to AMP Settings and rendering
