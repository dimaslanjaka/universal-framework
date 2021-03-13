<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
/*
 *  CONFIGURE EVERYTHING HERE
 */

// an email address that will be in the From field of the email.
$from = isset($_REQUEST['from']) ? $_REQUEST['from'] : 'example@mail.com';
$from = filter_var($from, FILTER_VALIDATE_EMAIL) ? $from : null;
// an email address that will receive the email with the output of the form
$sendTo = 'dimaslanjaka.superuser@blogger.com';

// subject of the email
$subject = 'New message';

// form field names and their translations.
// array variable name => Text to appear in the email
$fields = array('name' => 'Name', 'surname' => 'Surname', 'phone' => 'Phone', 'email' => 'Email', 'message' => 'Message');

// message that will be displayed when everything is OK :)
$okMessage = 'Contact form successfully submitted. Thank you, I will get back to you soon!';

// If something goes wrong, we will display this message.
$errorMessage = 'There was an error while submitting the form. Please try again later';

/*
 *  LET'S DO THE SENDING
 */

// if you are not debugging and don't need error reporting, turn this off by error_reporting(0);
error_reporting(E_ALL & ~E_NOTICE);

try {

  if (count($_POST) == 0) throw new \Exception('Form is empty');
  if (!$from) throw new \Exception('Email is invalid');
  $intro = isset($_REQUEST['subject']) ? '[Mail] ' . trim($_REQUEST['subject']) : "You have a new message from {$from}";
  $emailText = "";

  foreach ($_POST as $key => $value) {
    // If the field exists in the $fields array, include it in the email
    if (isset($fields[$key])) {
      if (empty($value)) continue;
      $emailText .= "$fields[$key]: $value\n";
    }
  }

  if (empty(trim($emailText))) throw new \Exception('Messages Empty');

  $emailText = "$intro\n=============================\n\n{$emailText}\n=============================\n";

  // All the neccessary headers for the email.
  $headers = array(
    'Content-Type: text/plain; charset="UTF-8";',
    'From: ' . $from,
    'Reply-To: ' . $from,
    'Return-Path: ' . $from,
  );

  // Send email
  mail($sendTo, $subject, $emailText, implode("\n", $headers));

  $responseArray = array('type' => 'success', 'message' => $okMessage);
} catch (\Exception $e) {
  $responseArray = array('type' => 'danger', 'message' => $errorMessage . '. ' . $e->getMessage());
}


$encoded = json_encode($responseArray);
echo $encoded;
