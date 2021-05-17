<?php

include __DIR__ . '/function.php';

$zone_division = null;
/**
 * Session zones.
 */
$folder_session = null;
$uri = \MVC\helper::get_clean_uri();

//ev(fetch_zone(true));

/**
 * Get zone.
 *
 * @example https://localhost/THIS_IS_ZONE/path/etc/file
 *
 * @return string|null
 */
function get_zone()
{
    global $zone_division;
    for ($i = 0; $i < 5; ++$i) {
        if (!$zone_division) {
            $zone_division = fetch_zone();
        }
        if ($zone_division) {
            break;
        } else {
            fetch_zone();
        }
    }

    return $zone_division;
}

/**
 * Get folder session.
 *
 * @return string|null
 */
function folder_session()
{
    global $folder_session, $zone_division;

    return $folder_session;
}

$GLOBALS['fetch_zone'] = null;
function fetch_zone($dump = false)
{
    if (isset($GLOBALS['fetch_zone'])) {
        if ($dump) {
            var_dump('from global');
        }

        return $GLOBALS['fetch_zone'];
    }
    $uri = \MVC\helper::get_clean_uri();
    $zone = \MVC\helper::parse_url2(\MVC\helper::geturl());
    if (isset($zone['path'])) {
        $zone = $zone['path'];
        $zone = array_values(array_filter(explode('/', $zone)));
        if (isset($zone[0])) {
            \Cookie\helper::hours("zone{$uri}", $zone[0], 24, $uri);
            $GLOBALS['fetch_zone'] = $zone[0];
            if ($dump) {
                var_dump('from fetch');
            }
        }

        return $GLOBALS['fetch_zone'];
    }
}
