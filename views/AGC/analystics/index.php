<?php

$analytics = initializeAnalytics();
$profile_v3 = getProfiles($analytics['v3']);
foreach ($profile_v3 as $key => $value) {
  $profileId = $profile_v3[$key]['id_profile'];
  echo '<a href="/AGC/analystics/?profile_id=' . $profileId . '">' . $key . ' - ' . $profileId . '</a><br/>';
  //$report = getReport($analytics['v4'], $profileId);
  //echo '<pre>' . $core->cj($report->getReports()) . '</pre>';
}
//$profile = getFirstProfileId($analytics);
//$results = getResults($analytics, $profile);
//printResults($results);

function initializeAnalytics()
{
  global $request;
  $google = new wpgoogle(['redirect_uri' => (isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http') . '://' . WP_HOST . '/' . $request]);
  $client = $google->client;
  $_SESSION['token'] = $client->getAccessToken();
  $v3 = new Google_Service_Analytics($client);
  $v4 = new Google_Service_AnalyticsReporting($client);

  return ['v3' => $v3, 'v4' => $v4];
}

function getProfiles($analytics)
{
  global $core;
  $result = [];
  $accounts = $analytics->management_accounts->listManagementAccounts();

  if (count($accounts->getItems()) > 0) {
    $items = $accounts->getItems();
    for ($i = 0; $i < count($items); ++$i) {
      $firstAccountId = $items[$i]->getId();

      // Get the list of properties for the authorized user.
      $properties = $analytics->management_webproperties->listManagementWebproperties($firstAccountId);
      if (count($properties->getItems()) > 0) {
        $items_properties = $properties->getItems();
        for ($ii = 0; $ii < count($items_properties); ++$ii) {
          $firstPropertyId = $items_properties[$ii]->getId();
          $result[$items_properties[$ii]->getId()]['property'] = $items_properties[$ii];
          //$result['id_property'][] = $items_properties[$ii]->getId();
          // Get the list of views (profiles) for the authorized user.
          $profiles = $analytics->management_profiles->listManagementProfiles($firstAccountId, $firstPropertyId);

          if (count($profiles->getItems()) > 0) {
            $items_profiles = $profiles->getItems();
            for ($iii = 0; $iii < count($items_profiles); ++$iii) {
              // $items_profiles[$iii]->getId();
              $result[$items_properties[$ii]->getId()]['profile'] = $items_profiles[$iii];
              $result[$items_properties[$ii]->getId()]['id_profile'] = $items_profiles[$iii]->getId();
            }
          } else {
            throw new Exception('No views (profiles) found for this user.');
          }
        }
      } else {
        throw new Exception('No properties found for this user.');
      }
      //echo '<pre>' . $core->cj([$items, $properties]) . '</pre><hr>';
    }
  }
  //sort($result);
  if (isreq('profile')) {
    echo '<pre>' . $core->cj($result) . '</pre>';
  }

  return $result;
}
/*
function getFirstProfileId($analytics)
{
  global $core;
  // Get the user's first view (profile) ID.

  // Get the list of accounts for the authorized user.
  $accounts = $analytics->management_accounts->listManagementAccounts();

  if (count($accounts->getItems()) > 0) {
  $items = $accounts->getItems();
  $firstAccountId = $items[1]->getId();

  // Get the list of properties for the authorized user.
  $properties = $analytics->management_webproperties
  ->listManagementWebproperties($firstAccountId);
  echo '<pre>' . $core->cj([$items, $properties]) . '</pre>';

  if (count($properties->getItems()) > 0) {
  $items = $properties->getItems();
  $firstPropertyId = $items[0]->getId();

  // Get the list of views (profiles) for the authorized user.
  $profiles = $analytics->management_profiles
  ->listManagementProfiles($firstAccountId, $firstPropertyId);

  if (count($profiles->getItems()) > 0) {
  $items = $profiles->getItems();

  // Return the first view (profile) ID.
  return $items[0]->getId();
  } else {
  throw new Exception('No views (profiles) found for this user.');
  }
  } else {
  throw new Exception('No properties found for this user.');
  }
  } else {
  throw new Exception('No accounts found for this user.');
  }
}
*/
function getReport($analytics, $profileId)
{
  // Replace with your view ID, for example XXXX.
  $VIEW_ID = $profileId; //View ID replaced

  // Create the DateRange objects.
  $monthly = new Google_Service_AnalyticsReporting_DateRange();
  $monthly->setStartDate('30daysAgo');
  $monthly->setEndDate('today');

  $quarterly = new Google_Service_AnalyticsReporting_DateRange();
  $quarterly->setStartDate('120daysAgo');
  $quarterly->setEndDate('today');

  // Create the Metrics objects.
  $sessions = new Google_Service_AnalyticsReporting_Metric();
  $sessions->setExpression('ga:sessions');
  $sessions->setAlias('sessions');

  // Create the Dimensions object.
  $fullReferrer = new Google_Service_AnalyticsReporting_Dimension();
  //$fullReferrer->setName('ga:fullReferrer');
  $fullReferrer->setName('ga:date');

  // Create the ReportRequest object.
  $request = new Google_Service_AnalyticsReporting_ReportRequest();
  $request->setViewId($VIEW_ID);
  $request->setDateRanges([$monthly, $quarterly]);
  $request->setMetrics([$sessions]);
  $request->setDimensions([$fullReferrer]);

  //Call the batchGet method.
  $body = new Google_Service_AnalyticsReporting_GetReportsRequest();
  $body->setReportRequests([$request]);

  return $analytics->reports->batchGet($body);
}

/*
function getResults($analytics, $profileId)
{
  // Calls the Core Reporting API and queries for the number of sessions
  // for the last seven days.
  return $analytics->data_ga->get(
  ['ga:' . $profileId,
  '30daysAgo',
  'today',
  'ga:sessions',
  'ga:date']
  );
}
*/
/*
function printResults($results)
{
  var_dump($results);
  // Parses the response from the Core Reporting API and prints
  // the profile name and total sessions.
  if (count($results->getRows()) > 0) {
  // Get the profile name.
  $profileName = $results->getProfileInfo()->getProfileName();

  // Get the entry for the first entry in the first row.
  $rows = $results->getRows();
  $sessions = $rows[0][0];

  // Print the results.
  echo "First view (profile) found: $profileName\n";
  echo "Total sessions: $sessions\n";
  } else {
  echo "No results found.\n";
  }
}
*/

function printResults($reports)
{
  for ($reportIndex = 0; $reportIndex < count($reports); ++$reportIndex) {
    $report = $reports[$reportIndex];
    $header = $report->getColumnHeader();
    $dimensionHeaders = $header->getDimensions();
    $metricHeaders = $header->getMetricHeader()->getMetricHeaderEntries();
    $rows = $report->getData()->getRows();
    for ($rowIndex = 0; $rowIndex < count($rows); ++$rowIndex) {
      $row = $rows[$rowIndex];
      $dimensions = $row->getDimensions();
      $metrics = $row->getMetrics();
      for ($i = 0; $i < count($dimensionHeaders) && $i < count($dimensions); ++$i) {
        $items_dim = [];
        foreach ($dimensions as $k => $data) {
          $items_dim[] = $data;
        }
        print_r($items_dim);
      }

      for ($j = 0; $j < count($metrics); ++$j) {
        $values = $metrics[$j]->getValues();
        for ($k = 0; $k < count($values); ++$k) {
          $entry = $metricHeaders[$k];

          $items_val = [];
          foreach ($values as $k => $data) {
            $items_val[] = $data;
          }
          print_r($items_val);
        }
      }
    }
  }
}

if (isreq('profile_id') && isses('token')) :
  ?>

  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <section id="auth-button"></section>
      </div>
      <div class="col-md-6">
        <section id="view-selector"></section>

        <div class="col-md-6">
          <section id="timeline"></section>
        </div>
      </div>
    </div>
  </div>
  <script>
    (function(w, d, s, g, js, fjs) {
      g = w.gapi || (w.gapi = {});
      g.analytics = {
        q: [],
        ready: function(cb) {
          this.q.push(cb);
        }
      };
      js = d.createElement(s);
      fjs = d.getElementsByTagName(s)[0];
      js.src = 'https://apis.google.com/js/platform.js';
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = function() {
        g.load('analytics');
      };
    }(window, document, 'script'));
  </script>
  <script>
    gapi.analytics.ready(function() {

      // Step 3: Authorize the user.

      var CLIENT_ID = '439429450847-2r1oa7oj8r0hghopmaasi1brdbc3f2vj.apps.googleusercontent.com';

      gapi.analytics.auth.authorize({
        container: 'auth-button',
        clientid: CLIENT_ID,
      });

      // Step 4: Create the view selector.

      var viewSelector = new gapi.analytics.ViewSelector({
        container: 'view-selector'
      });

      // Step 5: Create the timeline chart.

      var timeline = new gapi.analytics.googleCharts.DataChart({
        reportType: 'ga',
        query: {
          'dimensions': 'ga:date',
          'metrics': 'ga:sessions',
          'start-date': '30daysAgo',
          'end-date': 'yesterday',
        },
        chart: {
          type: 'LINE',
          container: 'timeline'
        }
      });

      // Step 6: Hook up the components to work together.

      gapi.analytics.auth.on('success', function(response) {
        viewSelector.execute();
      });

      viewSelector.on('change', function(ids) {
        var newIds = {
          query: {
            ids: ids
          }
        }
        timeline.set(newIds).execute();
      });
    });
  </script>

<?php
endif;
