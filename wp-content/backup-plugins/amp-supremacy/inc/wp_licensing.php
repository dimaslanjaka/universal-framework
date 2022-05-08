<?php

if (!defined('ABSPATH'))
    exit; // Exit if accessed directly

include_once( ABSPATH . 'wp-admin/includes/plugin.php' );

if (!class_exists('AMP_Licensing')) {

    class AMP_Licensing {

        public static function process_licensing() {
            self::updateOption('collect_live', FALSE);
            $sPassPhrase = AMPS_PARAPHRASE;

            $sProdCode = $_POST['product'];

            $sLicense = $_POST['licenseKey'];

            // FIND URL TO CONNECT BACK TO FROM /* PLUGIN DATA */ SECTION

            $sBaseURL = AMPS_LICENSING_URL;
            if (empty($sBaseURL)) {
                $result = array(
                    'status' => 'false',
                    'message' => "Sorry, but there was a problem reaching the remote server."
                );
                exit(json_encode($result));
            }
            $sURL = $sBaseURL . '/members/api';

            $v = plugin_get_version();

            // GET THIS INSTALL LOCATION
            $sLocation = site_url();
            $sLocation = rtrim($sLocation, '/');
            $sLocation = strtolower($sLocation);
            $sLocation = str_replace('%3A%2F%2', '://', $sLocation);

            // GET DOMAIN
            $sDomain = self::getSDomain();

            // IF KEY IS FAILSAFE
            if ($sLicense == 'XXXX-4444-4444-3333') {
                self::updateOption('idx', md5($sPassPhrase . $sDomain)); // good
                self::updateOption('registered_to', 'failsafe@' . $sDomain);
                self::updateOption('license', $sLicense);
                self::updateOption('status', md5($sLicense . 'VALID'));

                update_option('license_recent_amps', $sLicense);
                update_option('registered_to_recent_amps', 'failsafe@' . $sDomain);
                delete_option('fifteen_days_over_amps');

                $result = array(
                    'status' => 'true',
                    'message' => "This product is properly registered"
                );
                exit(json_encode($result));
            }

            $sFolder = 'amplite';

            // (t)ask = (r)egister
            // (l)ocation = location
            // (k)ey = license
            // (p)product code
            $asVars = array(
                't' => 'r',
                'l' => urlencode($sLocation),
                'k' => urlencode($sLicense),
                'p' => $sProdCode,
                'f' => $sFolder,
                'v' => $v
            );
            //$s = var_export($asVars,TRUE);
            //die("|||ERROR: $s####");

            $bRequireResult = TRUE;
            $sResult = self::doGet($sURL, $asVars, $bRequireResult);

            // IF WE GET THE WRONG KIND OF RESPONSE BACK FROM THE SERVER, THEN MARK AS UNREGISTERED
            if (strpos($sResult, '|||') === FALSE) {
                self::updateOption('idx', 'IL'); // incorrect login
                self::updateOption('registered_to', '');
                self::updateOption('license', '');
                self::updateOption('status', '');
                $result = array(
                    'status' => 'false',
                    'message' => 'Sorry, but that License appears incorrect. Please try again. If still not able to login after a few attempts, please contact technical support for this product.'
                );
                exit(json_encode($result));
            }

            // BREAK UP OUR RESPONSE INTO ITS TWO PARTS -- STATUS AND EMAIL
            $asResult = explode('|||', $sResult);
            $sStatus = @ $asResult[0];
            $sEmail = @ $asResult[1];
            $sExpireOnTimeStamp = @ $asResult[2];

            // INVALID LICENSE
            if ($sStatus == md5($sLicense . 'INVALID')) {
                self::updateOption('idx', 'IL'); // incorrect login
                self::updateOption('registered_to', '');
                self::updateOption('license', '');
                self::updateOption('status', '');
                $result = array(
                    'status' => 'false',
                    'message' => 'Sorry, but that License appears incorrect. Please try again. If still not able to login after a few attempts, please contact technical support for this product.'
                );
                exit(json_encode($result));
            }

            // REACHED MAXIMUM NUMBER OF POTENTIAL INSTALL SLOTS -- MUST PURCHASE MORE
            if ($sStatus == md5($sLicense . 'MAX')) {
                self::updateOption('idx', 'MX'); // incorrect login
                self::updateOption('registered_to', '');
                self::updateOption('license', '');
                self::updateOption('status', '');
                $result = array(
                    'status' => 'false',
                    'message' => 'Sorry, but that License has reached the maximum installs. You must purchase more install slots in order to register this plugin.'
                );
                exit(json_encode($result));
//                die("|||ERROR: Sorry, but that License has reached the maximum installs. You must purchase more install slots in order to register this plugin.####");
            }

            // USED AN AVAILABLE INSTALL SLOT -- VALID LICENSE
            if ($sStatus == md5($sLicense . 'VALID')) {
                self::updateOption('idx', md5($sPassPhrase . $sDomain)); // good
                self::updateOption('registered_to', $sEmail);
                //update_option('ssnuke_xstat',$sLicense . '|||' . $sStatus . '|||' . $sEmail);
                self::updateOption('license', $sLicense);
                self::updateOption('status', $sStatus);

                update_option('license_recent_amps', $sLicense);
                update_option('registered_to_recent_amps', $sEmail);
                update_option('expireon_recent_amps', $sExpireOnTimeStamp);
                delete_option('fifteen_days_over_amps');

                self::downloadInstallActivatePlugin();

                $result = array(
                    'status' => 'true',
                    'message' => "This product is registered to: $sEmail"
                );
                exit(json_encode($result));
            }

            // SOMETHING ELSE WAS WRONG -- INVALID LICENSE
            self::updateOption('idx', 'IL'); // incorrect login
            self::updateOption('registered_to', '');
            self::updateOption('license', '');
            self::updateOption('status', '');

            $result = array(
                'status' => 'false',
                'message' => 'Sorry, but that License appears incorrect. Please try again. If still not able to login after a few attempts, please contact technical support for this product.'
            );
            exit(json_encode($result));
        }

        public static function process_licensing_request() {

            $already_requested = get_option(AMPS_LITE_LICENSE_REQUESTED, 0);
            if (!$already_requested) {
                $sPassPhrase = AMPS_PARAPHRASE;

                $sCustomerName = $_POST['licenseName'];
                $sCustomerEmail = $_POST['licenseEmail'];

                if (empty($sCustomerEmail) || empty($sCustomerName)) {
                    $result = array(
                        'status' => 'false',
                        'message' => "Email and Name are required"
                    );
                    exit(json_encode($result));
                }

                $sProdCode = 'amplite';

                $sBaseURL = AMPS_LICENSING_URL;
                if (empty($sBaseURL)) {
                    $result = array(
                        'status' => 'false',
                        'message' => "Sorry, but there was a problem reaching the remote server."
                    );
                    exit(json_encode($result));
                }
                $sURL = $sBaseURL . '/members/api';

                $v = plugin_get_version();

                // GET THIS INSTALL LOCATION
                $sLocation = site_url();
                $sLocation = rtrim($sLocation, '/');
                $sLocation = strtolower($sLocation);
                $sLocation = str_replace('%3A%2F%2', '://', $sLocation);

                // GET DOMAIN
                $sDomain = self::getSDomain();

                // (t)ask = (m)ake(p)ayment
                // (l)ocation = location
                // (p)product code
                // (v)version
                $asVars = array(
                    't' => 'mp',
                    'l' => urlencode($sLocation),
                    'p' => $sProdCode,
                    'v' => $v,
                    'e' => $sCustomerEmail,
                    'cn' => $sCustomerName
                );
                //$s = var_export($asVars,TRUE);
                //die("|||ERROR: $s####");

                $bRequireResult = TRUE;
                $sResult = self::doGet($sURL, $asVars, $bRequireResult);

                $sResult = json_decode($sResult);
                if ($sResult->status == 'true') {
                    update_option(AMPS_LITE_LICENSE_REQUESTED, 1);
                    update_option(AMPS_LITE_LICENSE_REQUEST_EMAIL, $sCustomerEmail);
                    self::downloadInstallActivatePlugin();
                    $result = array(
                        'status' => 'true',
                        'message' => "License key is shared with you at " . $sCustomerEmail
                    );
                    exit(json_encode($result));
                }
            } else {
                $requestEmail = get_option(AMPS_LITE_LICENSE_REQUEST_EMAIL);
                $result = array(
                    'status' => 'false',
                    'message' => "You have already requested for email: " . $requestEmail
                );
                exit(json_encode($result));
            }
            exit;
        }

        public static function updateOption($sKey, $sVal) {
            $asOptions = get_option(AMPS_LITE_REGISTRATION_KEY, true);
            $asOptions = (!empty($asOptions) && is_array($asOptions)) ? $asOptions : array();
            $sKey = strtolower($sKey);
            $asOptions[$sKey] = $sVal;
            // no longer need to serialize before storage after WP3+
            update_option(AMPS_LITE_REGISTRATION_KEY, $asOptions);
        }

        public static function doGet($sURL, $asVars, $bRequireResult = FALSE) {
            $sURL .= '?' . http_build_query($asVars);
            $asOptions = array('timeout' => 120);
            $asResponse = @ wp_remote_get($sURL, $asOptions);
            $sResponse = @ $asResponse['body'];
            if ($bRequireResult) {
                if (empty($sResponse)) {
                    sleep(1);
                    $asResponse = @ wp_remote_get($sURL, $asOptions);
                    $sResponse = @ $asResponse['body'];

                    if ($bRequireResult) {
                        if (empty($sResponse)) {
                            sleep(2);
                            $asResponse = @ wp_remote_get($sURL, $asOptions);
                            $sResponse = @ $asResponse['body'];
                        }
                    }
                }
            }
            return $sResponse;
        }

        public static function getSDomain() {
            // GET THIS INSTALL LOCATION
            $sLocation = site_url();
            $sLocation = rtrim($sLocation, '/');
            $sLocation = strtolower($sLocation);
            $sLocation = str_replace('%3A%2F%2', '://', $sLocation);

            // GET DOMAIN
            $sDomain = $sLocation;
            $sDomain = str_replace('http://', '', $sDomain);
            $sDomain = str_replace('https://', '', $sDomain);
            $sDomain = strrev($sDomain);
            $sDomain = basename($sDomain);
            $sDomain = strrev($sDomain);
            $sDomain = trim($sDomain);
            $sDomain = str_replace('www.', '', $sDomain);

            return $sDomain;
        }

        public static function isAMPLiteRegistered() {
            $sDomain = self::getSDomain();
            $paraphraseDomainMd5 = md5(AMPS_PARAPHRASE . $sDomain);

            $ampLiteRegisteredAr = get_option(AMPS_LITE_REGISTRATION_KEY, true);
            if (!empty($ampLiteRegisteredAr) && is_array($ampLiteRegisteredAr)) {
                return ($ampLiteRegisteredAr['idx'] == $paraphraseDomainMd5);
            }
            return FALSE;
        }

        public static function downloadWordPressPlugin($version = '5.3') {

            $link = 'http://sitemap.ampsupremacy.com/read_plugin.php';

            $root_directory = get_home_path();
            $plugin_path = $root_directory . 'AMPSupremacyLite.zip';

            //echo $link  ; exit;

            $data = array(
                'ampslrk' => 'bd0b57808a74461cceccd77e409020a2'
            );

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
            curl_setopt($ch, CURLOPT_URL, $link);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            $data = curl_exec($ch);

            $error = curl_error($ch);
            if (!empty($error)) {
                return false;
            }
            curl_close($ch);

            $destination = $plugin_path;
            $file = fopen($destination, "w+");
            fputs($file, $data);
            fclose($file);

            return $plugin_path;
        }

        public static function installWordPressPlugin($path) {
            $zip = new ZipArchive;
            if ($zip->open($path) === TRUE) {
                $zip->extractTo(SITE_FULL_PLUGIN_PATH);
                $zip->close();
                @unlink($path);
                return true;
            } else {
                return false;
            }
        }

        public static function downloadInstallActivatePlugin() {
            $plugin_path = self::downloadWordPressPlugin($php_version);

            if ($plugin_path) {
                $result = self::installWordPressPlugin($plugin_path);

                if ($result) {
                    wp_clean_plugins_cache();
                    $activate = activate_plugin(AMP_LITE_PLUGIN_PATH);

                    if (!is_wp_error($activate)) {
                        // All good
                        unset($plugin_path);
                    } else {
                        wp_send_json($activate);
                    }
                }
            }
        }

    }
}
