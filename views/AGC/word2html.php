<?php
if (isset($_POST["source"])){
include("dom.php");
$html = str_get_html($_POST["source"]);
foreach ($html->find("*") as $tag){
  if ($tag->hasAttribute("style")){
    $tag->removeAttribute("style");
  }
}
$r = $html->outertext;
$r = str_replace("&nbsp;", " ", $r);
$r = preg_replace('/(<[^>]+) style=".*?"/i', '$1', $r);
$r = preg_replace('/(\<font\>|\<\/font\>)/mi', '$1', $r);
echo $r;
die();
}
?>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <title>Convert Word Documents to Clean HTML</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <link rel="stylesheet" href="https://codepen.io/dimaslanjaka/pen/mQPLzN.css"/> <!-- https://word2cleanhtml.com/s/all.css?8cc94266 -->
        <style>
div.result textarea {
  overflow-y: scroll;
  height:300px;
  width:800px;
  /*resize: none; Remove this if you want the user to resize the textarea */
}
clear {
  clear: both;
}
div.result { margin-top: 50px }
        </style>
    </head>
    <body>
    <div class="l-container">
        <i class="l-ollie"></i><i class="l-sleepy"></i><!--h1 class="logotype">
            <a href="/">
            <b class="logotype-firstline">
                <b class="logotype-outdent">Convert</b>
                <b class="logotype-1">Word</b> documents
            </b>
            <b class="logotype-secondline">
                <b class="logotype-2">to</b> Clean <b class="logotype-3">HTML</b>
            </b>
            </a>
        </h1-->
        <div class="l-content-main">
        <form id="form" method="post" action="">
            <input type="hidden" name="source" value=""/>
            <iframe id="word-input" class="editor" srcdoc="&lt;?xml version=&#34;1.0&#34; encoding=&#34;utf-8&#34; ?&gt;
&lt;!DOCTYPE html PUBLIC &#34;-//W3C//DTD XHTML 1.0 Strict//EN&#34; &#34;http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd&#34;&gt;
&lt;html xmlns=&#34;http://www.w3.org/1999/xhtml&#34; xml:lang=&#34;en&#34; lang=&#34;en&#34;&gt;
&lt;head&gt;
&lt;title&gt;Transform Word documents into clean HTML&lt;/title&gt;
&lt;meta http-equiv=&#34;Content-Type&#34; content=&#34;text/html; charset=utf-8&#34; /&gt;
&lt;style type=&#34;text/css&#34;&gt;
html {
    height: 100%;
}
body {
    font-family: arial, helvetica, sans-serif;
    margin: 0;
    border: 0;
    padding: 4px;
    min-height: 96%;
}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;Paste your document here&lt;/body&gt;
&lt;/html&gt;
"></iframe>
            <button id="fire" class="p button fr" type="submit"><b class="button-first-word">CONVERT</b></button>
            <!--fieldset class="p">
                <label><input type="checkbox" checked="" name="options" value="strip_empty_paragraphs"/> Remove empty paragraphs</label><br/>
                <label><input type="checkbox" checked="" name="options" value="convert_tags"/> Convert <code>&lt;b&gt;</code> to <code>&lt;strong&gt;</code>, <code>&lt;i&gt;</code> to <code>&lt;em&gt;</code></label><br/>
                <label><input type="checkbox" name="options" value="ascii_safe"/> Replace non-ascii with HTML entities </label><br/>
                <label><input type="checkbox" name="options" value="smart_quotes"/> Replace smart quotes with ascii equivalents </label><br/>
                <label><input type="checkbox" name="options" value="tabs"/> Indent with tabs, not spaces </label><br/>
                <label><input type="checkbox" name="options" value="nbsp" checked="" /> Replace non-breaking spaces with ordinary spaces</label><br/>
            </fieldset!-->
        </form>
    </div>
        <clear/>
        <div class="result">
        <h3 class="">HTML Output</h3>
        <textarea name="result" class="form-control bg-light" readonly></textarea>
        <h3 class="">Clean HTML Output</h3>
        <textarea name="clean-result" class="form-control bg-default"></textarea>
        </div>       
        
    </div>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://codepen.io/dimaslanjaka/pen/mQPLzN.js"></script>
    
        <script>
        //https://word2cleanhtml.com/s/all.js?522bb826
        initEditor('#word-input', $('input[name=source]')[0]);
        $("#form").submit(function(e){
        var bla = $('input[name=source]').val();
        $("textarea[name=result]").val(bla);
        return false;
        });
        setInterval(function(){
         $("#fire").click();
 var str = $('textarea[name=result]').val();
 /*
var regex = /(style\=\".*?\")/img;
var chtml = str.replace(regex, '');
 */
 $.post("word2html.php",
 {
   source: str,
 },
 function (data){
   $("textarea[name=clean-result]").val(data);
 });
        }, 5000);
        </script>
    </body>
</html>