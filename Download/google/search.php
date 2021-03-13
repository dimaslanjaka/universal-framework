<?php
if(!isset($_POST['search'])){
echo '<form method="post">
Query / keyword :<br>
<input type="text" name="query"><br>
<input type="submit" name="search" value="Search !!">
</form>';
}else{
$query = $_POST['query'];
fetch_google($query);
}

function fetch_google($query){
$cleanQuery = str_replace(" ","+",$query);
$url = 'http://www.google.com/search?q='.$cleanQuery;
$scrape = file_get_contents($url);
$scrapedItem = preg_match_all('/About.*?results/i' , $scrape, $matches, PREG_PATTERN_ORDER);
$results = $matches[0][0]; $scrapedItem2 = preg_match_all('/[1-9](?:\d{0,2})(?:,\d{3})*(?:\.\d*[1-9])?|0?\.\d*[1-9]|0/i' , $results, $matches2, PREG_PATTERN_ORDER);
$finalResult = $matches2[0][0];
echo '<div style="position: aboslute;top: 0px; left: 0px; color: #bada55; background: #000; padding:65px; z-index: 9999999999999;">';
echo '<h3>The Search Query (ie,Title of rss post)</h3><pre>';
print_r($query);
echo '</pre><br/>';
echo '<h3>Google Result for the query</h3>';
echo $results;
echo '<br />';
echo '<h3>Scraped Total</ h3>';
echo $finalResult;
echo '<br />';
echo '</div><pre>';
print_r($scrape);
echo '</pre><br/>';
}
?>