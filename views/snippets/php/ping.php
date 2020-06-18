<section>
  <div class="card">
    <div class="card-body">
      <pre title="check website up">
      function checkStatus($url) {
    $agent = "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_8; pt-pt) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27";

    // initializes curl session
    $ch = curl_init();

    // sets the URL to fetch
    curl_setopt($ch, CURLOPT_URL, $url);

    // sets the content of the User-Agent header
    curl_setopt($ch, CURLOPT_USERAGENT, $agent);

    // make sure you only check the header - taken from the answer above
    curl_setopt($ch, CURLOPT_NOBODY, true);

    // follow "Location: " redirects
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

    // return the transfer as a string
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    // disable output verbose information
    curl_setopt($ch, CURLOPT_VERBOSE, false);

    // max number of seconds to allow cURL function to execute
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);

    // execute
    curl_exec($ch);

    // get HTTP response code
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    curl_close($ch);

    if ($httpcode >= 200 && $httpcode < 300)
        return true;
    else
        return false;
}

// how to use
//===================
if ($this->checkStatus("http://www.dineshrabara.in"))
    echo "Website is up";
else
    echo "Website is down";
exit;
      </pre>
    </div>
  </div>
</section>