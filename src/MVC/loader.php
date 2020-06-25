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

$zone_division = \Cookie\helper::get("zone{$uri}", false);
switch ($zone_division) {
	case 'coupon':
		//maintenance();
		break;
	case 'telkomsel':
		maintenance();
		break;
	default:
		if (!\MVC\helper::isLocal()) {
			//maintenance();
		}
}

/**
 * Get folder session
 *
 * @return string|null
 */
function folder_session()
{
	global $folder_session;
	return $folder_session;
}
