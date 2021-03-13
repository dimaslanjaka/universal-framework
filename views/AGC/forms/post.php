<div dir="ltr" style="text-align: left;" trbidi="on">
  <h3>Basic Mailer</h3>
  <p>basic php mailer</p>
  <b>php</b>
  <pre>&lt;?php
header(&apos;Access-Control-Allow-Origin: *&apos;);
header(&apos;Content-Type: application/json&apos;);
/*
 *  CONFIGURE EVERYTHING HERE
 */

// an email address that will be in the From field of the email.
$from = isset($_REQUEST[&apos;from&apos;]) ? $_REQUEST[&apos;from&apos;] : &apos;example@mail.com&apos;;
$from = filter_var($from, FILTER_VALIDATE_EMAIL) ? $from : null;
// an email address that will receive the email with the output of the form
$sendTo = &apos;dimaslanjaka.superuser@blogger.com&apos;;

// subject of the email
$subject = &apos;New message&apos;;

// form field names and their translations.
// array variable name =&gt; Text to appear in the email
$fields = array(&apos;name&apos; =&gt; &apos;Name&apos;, &apos;surname&apos; =&gt; &apos;Surname&apos;, &apos;phone&apos; =&gt; &apos;Phone&apos;, &apos;email&apos; =&gt; &apos;Email&apos;, &apos;message&apos; =&gt; &apos;Message&apos;);

// message that will be displayed when everything is OK :)
$okMessage = &apos;Contact form successfully submitted. Thank you, I will get back to you soon!&apos;;

// If something goes wrong, we will display this message.
$errorMessage = &apos;There was an error while submitting the form. Please try again later&apos;;

/*
 *  LET&apos;S DO THE SENDING
 */

// if you are not debugging and don&apos;t need error reporting, turn this off by error_reporting(0);
error_reporting(E_ALL &amp; ~E_NOTICE);

try {

  if (count($_POST) == 0) throw new \Exception(&apos;Form is empty&apos;);
  if (!$from) throw new \Exception(&apos;Email is invalid&apos;);
  $intro = isset($_REQUEST[&apos;subject&apos;]) ? &apos;[Mail] &apos; . trim($_REQUEST[&apos;subject&apos;]) : &quot;You have a new message from {$from}&quot;;
  $emailText = &quot;&quot;;

  foreach ($_POST as $key =&gt; $value) {
    // If the field exists in the $fields array, include it in the email
    if (isset($fields[$key])) {
      if (empty($value)) continue;
      $emailText .= &quot;$fields[$key]: $value\n&quot;;
    }
  }

  if (empty(trim($emailText))) throw new \Exception(&apos;Messages Empty&apos;);

  $emailText = &quot;$intro\n=============================\n\n{$emailText}\n=============================\n&quot;;

  // All the neccessary headers for the email.
  $headers = array(
    &apos;Content-Type: text/plain; charset=&quot;UTF-8&quot;;&apos;,
    &apos;From: &apos; . $from,
    &apos;Reply-To: &apos; . $from,
    &apos;Return-Path: &apos; . $from,
  );

  // Send email
  mail($sendTo, $subject, $emailText, implode(&quot;\n&quot;, $headers));

  $responseArray = array(&apos;type&apos; =&gt; &apos;success&apos;, &apos;message&apos; =&gt; $okMessage);
} catch (\Exception $e) {
  $responseArray = array(&apos;type&apos; =&gt; &apos;danger&apos;, &apos;message&apos; =&gt; $errorMessage . &apos;. &apos; . $e-&gt;getMessage());
}


$encoded = json_encode($responseArray);
echo $encoded;
</pre>
  <b>html form</b>
  <pre>
    &lt;form class=&quot;p-5 grey-text&quot; id=&quot;cForm&quot;&gt;
      &lt;div class=&quot;md-form form-sm&quot;&gt; &lt;i class=&quot;fa fa-user prefix&quot;&gt;&lt;/i&gt;
        &lt;input type=&quot;text&quot; id=&quot;form3&quot; name=&quot;name&quot; class=&quot;form-control form-control-sm&quot;&gt;
        &lt;label for=&quot;form3&quot;&gt;Your name&lt;/label&gt;
      &lt;/div&gt;
      &lt;div class=&quot;md-form form-sm&quot;&gt; &lt;i class=&quot;fa fa-envelope prefix&quot;&gt;&lt;/i&gt;
        &lt;input type=&quot;text&quot; id=&quot;form2&quot; name=&quot;email&quot; class=&quot;form-control form-control-sm&quot;&gt;
        &lt;label for=&quot;form2&quot;&gt;Your email&lt;/label&gt;
      &lt;/div&gt;
      &lt;div class=&quot;md-form form-sm&quot;&gt; &lt;i class=&quot;fa fa-tag prefix&quot;&gt;&lt;/i&gt;
        &lt;input type=&quot;text&quot; id=&quot;form32&quot; name=&quot;subject&quot; class=&quot;form-control form-control-sm&quot;&gt;
        &lt;label for=&quot;form34&quot;&gt;Subject&lt;/label&gt;
      &lt;/div&gt;
      &lt;div class=&quot;md-form form-sm&quot;&gt; &lt;i class=&quot;fa fa-pencil-alt prefix&quot;&gt;&lt;/i&gt;
        &lt;textarea name=&quot;message&quot; type=&quot;text&quot; id=&quot;form8&quot; class=&quot;md-textarea form-control form-control-sm&quot;
          rows=&quot;4&quot;&gt;&lt;/textarea&gt;
        &lt;label for=&quot;form8&quot;&gt;Your message&lt;/label&gt;
      &lt;/div&gt;
      &lt;div class=&quot;text-center mt-4&quot;&gt;
        &lt;button class=&quot;btn btn-primary waves-effect waves-light&quot;&gt;Send &lt;i class=&quot;fa fa-paper-plane ml-1&quot;&gt;&lt;/i&gt;&lt;/button&gt;
      &lt;/div&gt;
    &lt;/form&gt;
</pre>

  <h3>Google SMTP</h3>
  <p>Send mail using google smtp with php</p>
  <i>Requirement:
    <ol>
      <li>
        <a href="https://pear.php.net/package/Mail/">PHP PEAR MAIL</a>
        or install using composer
        <pre>
        composer require phpmailer/phpmailer
        composer require pear/net_smtp
        composer require pear/mail
        </pre>
        or install using pear
        <pre>
        pear install mail
        </pre>
      </li>
    </ol>
  </i>
  <b>php</b>
  <pre>
  &lt;?php
  $subject = isset($_REQUEST[&apos;subject&apos;]) ? trim($_REQUEST[&apos;subject&apos;]) : &apos;Subject Mail&apos;;
  $body = isset($_REQUEST[&apos;body&apos;]) ? trim($_REQUEST[&apos;body&apos;]) : &apos;Body Mail&apos;;
  $from = isset($_REQUEST[&apos;from&apos;]) ? trim($_REQUEST[&apos;from&apos;]) : &apos;dimascyber008@gmail.com&apos;;

  $body = &quot;$body\n#end&quot;;

  $headers = [
    &apos;From&apos; =&gt; $from,
    &apos;To&apos; =&gt; $to,
    &apos;Subject&apos; =&gt; $subject,
    &apos;MIME-Version&apos; =&gt; &apos;1.0&apos;,
    &apos;Content-Type&apos; =&gt; &apos;text/html; charset=UTF-8&apos;,
  ];

  $smtp = Mail::factory(&apos;smtp&apos;, [
    &apos;host&apos; =&gt; &apos;ssl://smtp.gmail.com&apos;,
    &apos;port&apos; =&gt; &apos;465&apos;,
    &apos;auth&apos; =&gt; true,
    &apos;username&apos; =&gt; &apos;dimascyber008@gmail.com&apos;,
    &apos;password&apos; =&gt; &apos;oacjnzwovgejrdjb&apos;,
  ]);

  $mail = $smtp-&gt;send($to, $headers, $body);
  $result = [];
  if (PEAR::isError($mail)) {
    $result[&apos;error&apos;] = true;
    $result[&apos;message&apos;] = $mail-&gt;getMessage();
    $result[&apos;header&apos;] = json_encode($headers);
  } else {
    try {
      $result[&apos;success&apos;] = true;
      $result[&apos;message&apos;] = &apos;Message successfully sent&apos;;
    } catch (Exception $e) {
      $result[&apos;error&apos;] = true;
      $result[&apos;message&apos;] = $e-&gt;getMessage();
    }
  }
  echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
  ?&gt;
</pre>
  <b>html form</b>
  <pre>
  &lt;form action=&quot;namefile.php&quot; method=&quot;post&quot;&gt;
    &lt;input type=&quot;email&quot; name=&quot;from&quot; placeholder=&quot;Your email&quot; class=&quot;form-control&quot;&gt;
    &lt;input type=&quot;text&quot; name=&quot;subject&quot; placeholder=&quot;Subject Mail&quot; class=&quot;form-control&quot;&gt;
    &lt;textarea name=&quot;body&quot; id=&quot;&quot; cols=&quot;30&quot; rows=&quot;10&quot; class=&quot;form-control&quot; placeholder=&quot;your messages&quot;&gt;&lt;/textarea&gt;
  &lt;/form&gt;
</pre>
  <div>
    <i>Incoming terms:</i>
    <ul>
      <li>php mail ajax</li>
      <li>send mail using php</li>
      <li>easy send mail with php</li>
      <li>php mail with ajax</li>
      <li>php mail using ajax</li>
      <li>how to send mail with ajax</li>
      <li>how to send mail using ajax</li>
    </ul>
    <i>thumbnails</i>
    <div class="row">
      <div class="col-md-3">
        <img src="https://pear.php.net/gifs/pearsmall.gif" alt="pear">
      </div>
      <div class="col-md-3">
        <img src="https://www.php.net/images/logos/new-php-logo.svg" alt="php">
      </div>
      <div class="col-md-3">
        <img src="https://miro.medium.com/max/4000/1*v3b022s2UAyhVAFLUtzhJg.png" alt="ajax">
      </div>
    </div>
  </div>
</div>