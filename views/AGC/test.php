<?php

/**
 * @var wpgoogle $google
 */
$google->setTokenFile('');
$scope = $google->google_scopes('default');
$google->client->setScopes($scope);
$google->client->setApprovalPrompt('force');
$google->client->setAccessType('offline');
$google->google_redir(get_home_url() . '/AGC/test');
$google->google_process_token();

precom($google);
if (!$google->token) {
?>
  <a href="<?= $google->client->createAuthUrl() ?>" id="newtab" data-name="AGC" target="_blank" rel="noopener noreferrer">Login using google</a>
<?php
} else {
  precom($google);
  $sub = $google->check_subscriber($google->client);
  precom($sub);
}
