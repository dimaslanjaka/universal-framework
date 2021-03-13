<?php
class AGCJS
{
  function trjs($sl, $tl)
  {
    //echo ($sl . '-' . $tl);
    $trjs = '
<style>
*[dir~="ltr"],*[id~="goog"],*[class~="goog"],#goog-gt-tt,#google_translate_element,.skiptranslate{display:none !important;}
html,body{top:0 !important;}
</style>
<div id="google_translate_element"></div><script type="text/javascript">
function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: "' . $sl . '", layout: google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: true, multilanguagePage: true}, \'google_translate_element\');
}
</script><script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
<div id="google_translate_element"></div>
<script>
    function googleTranslateElementInit() {
        new google.translate.TranslateElement({pageLanguage: \'auto\', includedLanguages: "' . $tl . '", autoDisplay: false}, \'google_translate_element\');
        var a = document.querySelector("#google_translate_element select");
        a.selectedIndex=1;
        a.dispatchEvent(new Event(\'change\'));
    }
</script>
<script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>';
    return $trjs;
  }
}
