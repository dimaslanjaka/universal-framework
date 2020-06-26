<?php
include __DIR__ . '/function.php';

/**
 * Session zones.
 */
$folder_session = null;
$uri = \MVC\helper::get_clean_uri();
if (!\Cookie\helper::has("zone{$uri}", false)) {
  $zone = \MVC\helper::parse_url2(\MVC\helper::geturl());
  if (isset($zone['path'])) {
    $zone = $zone['path'];
    $zone = array_values(array_filter(explode('/', $zone)));
    if (isset($zone[0])) {
      \Cookie\helper::hours("zone{$uri}", $zone[0], 24, $uri);
    }
  }
}

/**
 * Get zone
 * @example https://localhost/THIS_IS_ZONE/path/etc/file
 * @return string|null
 */
function get_zone()
{
  global $zone_division;
  if (!$zone_division) {
    $uri = \MVC\helper::get_clean_uri();
    $zone_division = \Cookie\helper::get("zone{$uri}", false);
  }
  return $zone_division;
}

/**
 * Get folder session
 *
 * @return string|null
 */
function folder_session()
{
  global $folder_session, $zone_division;
  return $folder_session;
}
