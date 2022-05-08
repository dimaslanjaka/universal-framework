<?php $styles = new PageFrog_Styling_Storage(); ?>
  /* Generic WP styling */
  amp-img.alignright { float: right; margin: 0 0 1em 1em; }
  amp-img.alignleft { float: left; margin: 0 1em 1em 0; }
  amp-img.aligncenter { display: block; margin-left: auto; margin-right: auto; }
  .content amp-img { max-width: 100%; }
  .alignright { float: right; }
  .alignleft { float: left; }
  .aligncenter { display: block; margin-left: auto; margin-right: auto; }
  .wp-caption.alignleft { margin-right: 1em; }
  .wp-caption.alignright { margin-left: 1em; }
  /* Generic WP.com reader style */
  .content, .title-bar div {
    max-width: 600px;
    margin: 0 auto;
  }
  body {
    font-family: <?php echo $styles->get_body_text_font_family(); ?>;
    font-size: 16px;
    line-height: 1.8;
    background: #fff;
    color: <?php echo $styles->get_body_text_font_color(); ?>;
    padding-bottom: 100px;
  }
  .content {
    padding: 16px;
    overflow-wrap: break-word;
    word-wrap: break-word;
    font-weight: 400;
    color:  <?php echo $styles->get_body_text_font_color(); ?>;
  }
  .title {
    margin: 36px 0 0 0;
    font-size: 36px;
    line-height: 1.258;
    font-weight: 700;
    color: <?php echo $styles->get_title_font_color(); ?>;
    font-family: <?php echo $styles->get_title_font_family(); ?>;
  }
  .content h1:not(.title),
  .content h2,
  .content h3,
  .content h4,
  .content h5,
  .content h6 {
    color: <?php echo $styles->get_headings_font_color(); ?>;
    font-family: <?php echo $styles->get_headings_font_family(); ?>;
  }
  .meta {
    margin-bottom: 16px;
  }
  p,
  ol,
  ul,
  figure {
    margin: 0 0 24px 0;
  }
  a,
  a:visited {
    color: <?php echo $styles->get_link_color(); ?>;
    text-decoration: <?php echo $styles->get_link_decoration(); ?>;
  }
  a:hover,
  a:active,
  a:focus {
    color: <?php echo $styles->get_link_color(); ?>;
  }
  /* Open Sans */
  .meta,
  nav.title-bar,
  .wp-caption-text {
    font-family: <?php echo $styles->get_body_text_font_family(); ?>;
    font-size: 12px;
  }
  /* Meta */
  ul.meta {
    padding: 24px 0 0 0;
    margin: 0 0 24px 0;
  }
  ul.meta li {
    list-style: none;
    display: inline-block;
    margin: 0 8px 0 0;
    line-height: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
    text-transform: uppercase;
  }
  .meta,
  .meta a {
    color: #4f748e;
  }
  .byline amp-img {
    border-radius: 50%;
    border: 0;
    background: #f3f6f8;
    position: relative;
    top: 6px;
    margin-right: 6px;
    }
  /* Header Image */
  .thumbnail>amp-img {
    width:100%;
  }
  /* Titlebar */
  nav.title-bar {
    padding: 0 16px;
  }
  <?php if ( $styles->get_id_bar_type() == 'line' ) : ?>
  nav.title-bar {
    border-bottom-width: 1px;
    border-bottom-color: <?php echo $styles->get_id_bar_color(); ?>;
    border-bottom-style: solid;
  }
  nav.title-bar amp-img {
    float:left;
  }
  <?php elseif ( $styles->get_id_bar_type() == 'solid' ) : ?>
  nav.title-bar {
    background-color: <?php echo $styles->get_id_bar_color(); ?>;
  }
  <?php endif; ?>
  nav.title-bar div {
    line-height: 46px;
    color: #fff;
  }
  nav.title-bar a {
    text-decoration: none;
    color: <?php echo $styles->get_id_bar_font_color(); ?>;
  }
  nav.title-bar amp-img {
    float: left;
    margin: 11px 8px 0 0;
  }
  /* Captions */
  .wp-caption-text {
    background: #eaf0f3;
    padding: 8px 16px;
  }
  /* Quotes */
  blockquote {
    padding: 16px;
    padding-top: 0px;
    padding-bottom: 0px;
    margin: 8px 0 24px 0;
    border-left: 2px solid <?php echo $styles->get_quotes_font_color(); ?>;
    color: <?php echo $styles->get_quotes_font_color(); ?>;
    font-family: <?php echo $styles->get_quotes_font_family(); ?>;
  }
  blockquote p:last-child {
    margin-bottom: 0;
  }
  /* Other Elements */
  amp-carousel {
    background: #000;
  }
  .ad-container {
    text-align:center;
  }
