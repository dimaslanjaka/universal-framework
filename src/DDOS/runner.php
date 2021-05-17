<?php

namespace DDOS;

/**
 * DDOS protector base class.
 *
 * @version 2.1.0
 *
 * @author Dimas Lanjaka (dimaslanjaka@gmail.com)
 * @copyright (C) Dimas Lanjaka (https://dimaslanjaka.github.io)
 * @license GNU/GPL: http://www.gnu.org/copyleft/gpl.html
 */
class runner
{
    public function __construct()
    {
        if (\MVC\helper::cors()) {
            return;
        }
        // Switch to control AntiDDoS state.
        $anti_ddos_protection_enable = true;
        // Activate debug statements.
        $anti_ddos_debug = false;

        if ($anti_ddos_protection_enable) {
            // List of trusted Autonomous systems.
            $not_rated_as = '13238,15169,8075,10310,36647,13335,2635,32934,38365,55967,16509,2559,19500,47764,17012,1449,43247,32734,15768,33512,18730,30148';

            $remote_ip = \MVC\helper::getRequestIP();

            if (!$remote_ip) {
                \JSON\json::json(['error' => true, 'title' => 'DDOS protection', 'message' => 'due security reason please disable your proxy or vpn or ssh or any other third party apps for hidding your ip']);
                header('refresh:5; url=https://www.webmanajemen.com');
                exit;
            }

            $secure_cookie_label = \MVC\helper::ddos_key();

            // Secret key salt to avoid copy/past of the Cookie between visitors.
            // ATTENTION!!!
            // YOU MUST GENERATE NEW $security_cookie_salt BEFORE USE IT ON YOUR OWN SITE.
            // ATTENTION!!!
            $secure_cookie_salt = 'L3n4r0x';

            $secure_cookie_key = md5($remote_ip . ':' . $secure_cookie_salt);

            // Days to use secure cookie.
            $secure_cookie_days = 1;
            // Delay in seconds before redirection to original URL.
            $redirect_delay = 5;

            $test_ip = true;
            $set_secure_cookie = true;
            if (isset($_COOKIE[$secure_cookie_label]) && $_COOKIE[$secure_cookie_label] == $secure_cookie_key) {
                // if cookie exists and match, skip
                $test_ip = false;
                $set_secure_cookie = false;
            }
            if (!$test_ip) {
                //
                // Skiping visitors from trusted AS
                // Example: Google, Microsoft and etc.
                //
                $skip_trusted = true;
                if ($test_ip && function_exists('geoip_org_by_name')) {
                    $visitor_org = call_user_func('geoip_org_by_name', $remote_ip);
                    if (false !== $visitor_org && preg_match("/^AS(\d+)\s/", $visitor_org, $matches)) {
                        $not_rated_as = explode(',', $not_rated_as);
                        foreach ($not_rated_as as $asn) {
                            if ($skip_trusted) {
                                continue;
                            }
                            if ($asn == $matches[1]) {
                                $skip_trusted = true;
                            }
                        }
                        if ($skip_trusted) {
                            if ($anti_ddos_debug) {
                                error_log(sprintf('Skip antiddos protection for %s, because it\'s trusted AS%d.', $remote_ip, $asn));
                            }
                            $test_ip = false;
                        }
                    }
                }
                // another method to skip
                // whitelist ip
                if (\MVC\helper::is_google()) {
                    $test_ip = false;
                }
            }
            $run_stop_action = $test_ip;
            if ($run_stop_action) {
                include __DIR__ . '/page.php';
                if ($anti_ddos_debug) {
                    error_log(sprintf(
                        'Blacklisted IP, drop connection %s to %s.',
                        $remote_ip,
                        $_SERVER['REQUEST_URI']
                    ));
                }

                exit;
            }
            if ($set_secure_cookie && !$run_stop_action) {
                // secure cookie
                setcookie($secure_cookie_label, $secure_cookie_key, null, '/');
            }
        }
    }
}
