<div class="cssout-post-inner cssout-article">
  <h1 id="h1_0">CSS Out! | remove inline CSS</h1>
  <h2 class="cssout-postheader"> CSS Out! &trade; | Get inline CSS Out of your HTML document</h2>
  <div class="cleared">
  </div>
  <div class="cssout-postcontent">
    <form method="post" action="/clean/#step3" id="frmOrigHTMLCode" enctype="multipart/form-data">
      <p>CSS Out! &trade; is efficient conversion &amp; optimization tool for web-masters &amp;
        web-designers, when it comes to remove inline CSS out of HTML document. Target of the tool is to
        separate Cascading Style Sheet (CSS) information from the HTML document, providing more clear code
        structure and certain level of SEO optimization. HTML without inline CSS could result in better
        readability by major Search Engines &amp; optimize the usage of critical resources (server,
        network, etc.). CSS Out! &trade; is FREE, online CSS/HTML optimization tool.
      </p>
      <p>It is highly recommended to check the validity of your code using
        <a href="http://validator.w3.org/" rel="nofollow" target="_blank">HTML</a> &amp;
        <a href="http://jigsaw.w3.org/css-validator/" rel="nofollow" target="_blank">CSS</a> validator,
        before you go to the next step. It is always good idea to choose reliable hosting.
      </p>
      <h3>How to remove inline CSS?</h3>
      <h4 id="h4_2c82_0">High quality SEO.</h4>
      <h5>1. Paste your code (HTML, XHTML, PHP, etc.) into textarea (max <?php echo $maxDocLen; ?> chars).</h5>
      <p>
        <textarea rows="18" cols="117" id="txtOrigHTMLCode"
          name="txtOrigHTMLCode"><?php echo htmlentities($txtOrigHTMLCode); ?></textarea>
      </p>
      <p>
        <span id="span_1">2. Push the magical button:
        </span>
        <span class="cssout-button-wrapper">
          <span class="cssout-button-l">
          </span>
          <span class="cssout-button-r">
          </span>
          <a class="cssout-button"
            onclick="if (document.getElementById('txtOrigHTMLCode').value.length><?php echo $maxDocLen; ?>){alert('Sorry, <?php echo $maxDocLen; ?> char is max.');}else{document.getElementById('frmOrigHTMLCode').submit();}">CSS
            Out!</a>
        </span> <br />
        <h5>3. Your new &amp; optimized code (HTML, XHTML, PHP, etc.)
          <a href="/clean/download?q=html">
            <img src="/views/clean/images/down.png" class="down" alt="download HTML" title="Download HTML!" /></a>:</h5>
        <textarea readonly="readonly" rows="18" cols="117" name="txtNewHTML" id="textarea_1"
          onclick="SelectAll('textarea_1')"><?php echo htmlentities($cDocument); ?></textarea>
        <h5 id="step4">4. Your new external CSS, you can place it in the header section or in external
          file
          <a href="/clean/download?q=css">
            <img src="/views/clean/images/down.png" class="down" alt="download CSS" title="Dwonload CSS!" /></a>:<br />
          <textarea readonly="readonly" rows="18" cols="117" name="txtExternalCSS" id="textarea_2"
            onclick="SelectAll('textarea_2')"><?php echo htmlentities($cAdStyle); ?></textarea>
          <h5>5. Verify changes using <a href="http://winmerge.org/" target="_blank" rel="nofollow">WinMerge</a></h5>
    </form>
  </div>
  <div class="cleared">
  </div>
</div>