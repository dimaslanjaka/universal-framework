<?php
/**
 *
 *  @package HREFLANG Tags\Includes\Variables
 *  @since 1.3.3
 *
 */

if ( ! function_exists( 'add_filter' ) ) {
	header( 'Status: 403 Forbidden' );
	header( 'HTTP/1.1 403 Forbidden' );
	exit();
}

require_once( ABSPATH . 'wp-admin/includes/translation-install.php' );
$hreflanguages = wp_get_available_translations();
$hreflanguages['it'] = array('language' => 'it','english_name' => 'Italian','native_name' => 'Italiano','iso' => array('it'));
$hreflanguages['it_IT'] = array('language' => 'it_IT','english_name' => 'Italian (Italy)','native_name' => 'Italiano (Italia)','iso' => array('it'));
$hreflanguages['fr'] = array('language' => 'fr','english_name' => 'French','native_name' => 'Français','iso' => array('fr'));
$hreflanguages['fr_CH'] = array('language' => 'fr_CH','english_name' => 'French (Switzerland)','native_name' => 'Français (Suisse)','iso' => array('fr'));
$hreflanguages['es'] = array('language' => 'es','english_name' => 'Spanish','native_name' => 'Español','iso' => array('es'));
$hreflanguages['de'] = array('language' => 'de','english_name' => 'German (DE)','native_name' => 'Deutsch','iso' => array('de'));
$hreflanguages['de_AT'] = array('language' => 'de_AT','english_name' => 'German (Austria)','native_name' => 'Deutsch','iso' => array('de'));
$hreflanguages['kk'] = array('language' => 'kk','english_name' => 'Kazakh','native_name' => 'қазақ тілі','iso' => array('kk'));
$hreflanguages['tk'] = array('language' => 'tk','english_name' => 'Turkmen','native_name' => 'Türkmen','iso' => array('tk'));
$hreflanguages['uz'] = array('language' => 'uz','english_name' => 'Uzbek','native_name' => 'Oʻzbek','iso' => array('uz'));
$hreflanguages['uz_UZ'] = array('language' => 'uz_UZ','english_name' => 'Uzbek (Uzbekistan)','native_name' => 'Oʻzbek','iso' => array('uz'));
$hreflanguages['tg'] = array('language' => 'tg','english_name' => 'Tajik','native_name' => 'тоҷикӣ','iso' => array('tg'));
$hreflanguages['en'] = array('language' => 'en','english_name' => 'English','native_name' => 'English','iso' => array('en','eng','eng'));
$hreflanguages['x-default'] = array('language' => '','english_name' => ' X-Default','native_name' => ' X-Default');
$hreflanguages['en_US'] = array('language' => 'en_US','english_name' => 'English (United States)','native_name' => 'English (United States)','iso' => array('en','eng','eng'));
$hreflanguages['en_BE'] = array('language' => 'en_BE','english_name' => 'English (Belgium)','native_name' => 'English (Belgium)','iso' => array('en','eng','eng'));
$hreflanguages['en_AE'] = array('language' => 'en_AE','english_name' => 'English (United Arab Emirates)','native_name' => 'English (United Arab Emirates)','iso' => array('en','eng','eng'));
$hreflanguages['en_FR'] = array('language' => 'en_FR','english_name' => 'English (France)','native_name' => 'English (France)','iso' => array('en','eng','eng'));
$hreflanguages['en_NL'] = array('language' => 'en_NL','english_name' => 'English (Netherlands)','native_name' => 'English (Netherlands)','iso' => array('en','eng','eng'));
$hreflanguages['en_CH'] = array('language' => 'en_CH','english_name' => 'English (Switzerland)','native_name' => 'English (Switzerland)','iso' => array('en','eng','eng'));
$hreflanguages['en_TH'] = array('language' => 'en_TH','english_name' => 'English (Thailand)','native_name' => 'English (Thailand)','iso' => array('en','eng','eng'));
$hreflanguages['en_IE'] = array('language' => 'en_IE','english_name' => 'English (Ireland)','native_name' => 'English (Ireland)','iso' => array('en','eng','eng'));
$hreflanguages['en_PH'] = array('language' => 'en_PH','english_name' => 'English (Philippines)','native_name' => 'English (Philippines)','iso' => array('en','eng','eng'));
$hreflanguages['en_HK'] = array('language' => 'en_HK','english_name' => 'English (Hong Kong)','native_name' => 'English (Hong Kong)','iso' => array('en','eng','eng'));
$hreflanguages['en_ID'] = array('language' => 'en_ID','english_name' => 'English (Indonesia)','native_name' => 'English (Indonesia)','iso' => array('en','eng','eng'));
$hreflanguages['en_MM'] = array('language' => 'en_MM','english_name' => 'English (Myanmar)','native_name' => 'English (Myanmar)','iso' => array('en','eng','eng'));
$hreflanguages['en_SG'] = array('language' => 'en_SG','english_name' => 'English (Singapore)','native_name' => 'English (Singapore)','iso' => array('en','eng','eng'));
$hreflanguages['en_MY'] = array('language' => 'en_MY','english_name' => 'English (Malaysia)','native_name' => 'English (Malaysia)','iso' => array('en','eng','eng'));
$hreflanguages['en_RO'] = array('language' => 'en_RO','english_name' => 'English (Romania)','native_name' => 'English (Romania)','iso' => array('en','eng','eng'));
$hreflanguages['en_CN'] = array('language' => 'en_CN','english_name' => 'English (China)','native_name' => 'English (China)','iso' => array('en','eng','eng'));
$hreflanguages['en_IN'] = array('language' => 'en_IN','english_name' => 'English (India)','native_name' => 'English (India)','iso' => array('en','eng','eng'));
$hreflanguages['en_NZ'] = array('language' => 'en_NZ','english_name' => 'English (New Zealand)','native_name' => 'English (New Zealand)','iso' => array('en','eng','eng'));
$hreflanguages['en_PK'] = array('language' => 'en_PK','english_name' => 'English (Pakistan)','native_name' => 'English (Pakistan)','iso' => array('en','eng','eng'));
$hreflanguages['en_KE'] = array('language' => 'en_KE','english_name' => 'English (Kenya)','native_name' => 'English (Kenya)','iso' => array('en','eng','eng'));
$hreflanguages['en_SA'] = array('language' => 'en_SA','english_name' => 'English (Saudi Arabia)','native_name' => 'English (Saudi Arabia)','iso' => array('en','eng','eng'));
$hreflanguages['en_SY'] = array('language' => 'en_SY','english_name' => 'English (Syria)','native_name' => 'English (Syria)','iso' => array('en','eng','eng'));
$hreflanguages['en_BH'] = array('language' => 'en_BH','english_name' => 'English (Bahrain)','native_name' => 'English (Bahrain)','iso' => array('en','eng','eng'));
$hreflanguages['en_EG'] = array('language' => 'en_EG','english_name' => 'English (Egypt)','native_name' => 'English (Egypt)','iso' => array('en','eng','eng'));
$hreflanguages['en_IQ'] = array('language' => 'en_IQ','english_name' => 'English (Iraq)','native_name' => 'English (Iraq)','iso' => array('en','eng','eng'));
$hreflanguages['en_JO'] = array('language' => 'en_JO','english_name' => 'English (Jordan)','native_name' => 'English (Jordan)','iso' => array('en','eng','eng'));
$hreflanguages['en_KW'] = array('language' => 'en_KW','english_name' => 'English (Kuwait)','native_name' => 'English (Kuwait)','iso' => array('en','eng','eng'));
$hreflanguages['en_LB'] = array('language' => 'en_LB','english_name' => 'English (Lebanon)','native_name' => 'English (Lebanon)','iso' => array('en','eng','eng'));
$hreflanguages['en_LY'] = array('language' => 'en_LY','english_name' => 'English (Libia)','native_name' => 'English (Libia)','iso' => array('en','eng','eng'));
$hreflanguages['en_MA'] = array('language' => 'en_MA','english_name' => 'English (Morocco)','native_name' => 'English (Morocco)','iso' => array('en','eng','eng'));
$hreflanguages['en_OM'] = array('language' => 'en_OM','english_name' => 'English (Oman)','native_name' => 'English (Oman)','iso' => array('en','eng','eng'));
$hreflanguages['en_QA'] = array('language' => 'en_QA','english_name' => 'English (Qatar)','native_name' => 'English (Qatar)','iso' => array('en','eng','eng'));
$hreflanguages['en_TN'] = array('language' => 'en_TN','english_name' => 'English (Tunisia)','native_name' => 'English (Tunisia)','iso' => array('en','eng','eng'));
$hreflanguages['en_YE'] = array('language' => 'en_YE','english_name' => 'English (Yemen)','native_name' => 'English (Yemen)','iso' => array('en','eng','eng'));
$hreflanguages['en_KR'] = array('language' => 'en_KR','english_name' => 'English (Korea)','native_name' => 'English (Korea)','iso' => array('en','eng','eng'));
$hreflanguages['en_BN'] = array('language' => 'en_BN','english_name' => 'English (Brunei)','native_name' => 'English (Brunei)','iso' => array('en','eng','eng'));
$hreflanguages['en_KH'] = array('language' => 'en_KH','english_name' => 'English (Cambodia)','native_name' => 'English (Cambodia)','iso' => array('en','eng','eng'));
$hreflanguages['en_LA'] = array('language' => 'en_LA','english_name' => 'English (Laos)','native_name' => 'English (Laos)','iso' => array('en','eng','eng'));
$hreflanguages['en_VN'] = array('language' => 'en_VN','english_name' => 'English (Viet Nam)','native_name' => 'English (Viet Nam)','iso' => array('en','eng','eng'));
$hreflanguages['en_MU'] = array('language' => 'en_MU','english_name' => 'English (Mauritius)','native_name' => 'English (Mauritius)','iso' => array('en','eng','eng'));
$hreflanguages['nl_BE'] = array('language' => 'nl_BE','english_name' => 'Dutch (Belgium)','native_name' => 'Vlaams','iso' => array('nl'));
$hreflanguages['tr'] = array('language' => 'tr','english_name' => 'Turkish', 'native_name' => 'Türkçe','iso' => array('tr'));
$hreflanguages['tr_TR'] = array('language' => 'tr_TR','english_name' => 'Turkish (Turkey)', 'native_name' => 'Türkçe','iso' => array('tr'));
$hreflanguages['pl'] = array('language' => 'pl','english_name' => 'Polish','native_name' => 'Polskie','iso' => array('pl'));
$hreflanguages['pl_PL'] = array('language' => 'pl_PL','english_name' => 'Polish (Poland)','native_name' => 'Polskie','iso' => array('pl'));
$hreflanguages['nl'] = array('language' => 'nl','english_name' => 'Dutch','native_name' => 'Vlaams','iso' => array('nl'));
$hreflanguages['nl_NL'] = array('language' => 'nl_NL','english_name' => 'Dutch (Netherlands)','native_name' => 'Vlaams','iso' => array('nl'));
$hreflanguages['no'] = array('language' => 'no','english_name' => 'Norwegian (Default)','native_name' => 'Norweski','iso' => array('no'));
$hreflanguages['fr_LU'] = array('language' => 'fr_LU','english_name' => 'French (Luxembourg)','native_name' => 'Français du Luxembourg','iso' => array('fr'));
$hreflanguages['de_DE'] = array('english_name' => 'German (Germany)');
$hreflanguages['no_NO'] = array('language' => 'no_NO','english_name' => 'Norwegian','iso' => array('no'));
$hreflanguages['pt'] = array('language' => 'pt','english_name' => 'Portuguese','native_name' => 'Português','iso' => array('pt'));
$hreflanguages['zh_Hans'] = array('language' => 'zh_Hans','english_name' => 'Chinese (Simplified)','native_name' => '中文','iso' => array('zh'));
$hreflanguages['zh_Hant'] = array('language' => 'zh_Hant','english_name' => 'Chinese (Traditional)','native_name' => '中文','iso' => array('zh'));
$hreflanguages['zh_FR'] = array('language' => 'zh_FR','english_name' => 'Chinese (France)','native_name' => '中文','iso' => array('zh'));
$hreflanguages['ru_RU'] = array('english_name' => 'Russian (Russia)');
$hreflanguages['ru'] = array('language' => 'ru','english_name' => 'Russian','native_name' => 'Русский','iso' => array('ru'));
$hreflanguages['nl'] = array('language' => 'nl','english_name' => 'Dutch','native_name' => 'Nederlands','iso' => array('nl'));
$hreflanguages['cs'] = array('language' => 'cs','english_name' => 'Czech','native_name' => 'Czech','iso' => array('cs'));
$hreflanguages['cs_CZ'] = array('language' => 'cs_CZ','english_name' => 'Czech (Czechia)','native_name' => 'Czech','iso' => array('cs'));
$hreflanguages['sv'] = array('language' => 'sv','english_name' => 'Swedish','native_name' => 'Svenska','iso' => array('sv'));
$hreflanguages['he'] = array('language' => 'he','english_name' => 'Hebrew','native_name' => 'עִבְרִית','iso' => array('he'));
$hreflanguages['he_IL'] = array('language' => 'he_IL','english_name' => 'Hebrew (Israel)','native_name' => 'עִבְרִית','iso' => array('he'));
$hreflanguages['sv_SE'] = array('language' => 'sv_SE','english_name' => 'Swedish (Sweden) ','native_name' => 'Svenska (Sverige)','iso' => array('sv'));
$hreflanguages['sv_FI'] = array('language' => 'sv_FI','english_name' => 'Swedish (Finland) ','native_name' => 'Svenska (Finland)','iso' => array('sv'));
$hreflanguages['th_TH'] = array('language' => 'th_TH','english_name' => 'Thai (Thailand)','native_name' => 'Thai (Thailand)','iso' => array('th'));
$hreflanguages['es_US'] = array('language' => 'es_US','english_name' => 'Spanish (USA)','native_name' => 'Español (EEUU)','iso' => array('es'));
$hreflanguages['es_EC'] = array('language' => 'es_EC','english_name' => 'Spanish (Ecuador)','native_name' => 'Español (Ecuador)','iso' => array('es'));
$hreflanguages['es_PY'] = array('language' => 'es_PY','english_name' => 'Spanish (Paraguay)','native_name' => 'Español (Paraguay)','iso' => array('es'));
$hreflanguages['es_PA'] = array('language' => 'es_PA','english_name' => 'Spanish (Panama)','native_name' => 'Español (Panama)','iso' => array('es'));
$hreflanguages['en_GI'] = array('language' => 'en_GI','english_name' => 'English (Gibraltar)','native_name' => 'English (Gibraltar)','iso' => array('en','eng','eng'));
$hreflanguages['es_UY'] = array('language' => 'es_UY','english_name' => 'Spanish (Uruguay)','native_name' => 'Español (Uruguay)','iso' => array('es'));
$hreflanguages['es_NI'] = array('language' => 'es_NI','english_name' => 'Spanish (Nicaragua)','native_name' => 'Español (Nicaragua)','iso' => array('es'));
$hreflanguages['es_PR'] = array('language' => 'es_PR','english_name' => 'Spanish (Puerto Rico)','native_name' => 'Español (Puerto Rico)','iso' => array('es'));
$hreflanguages['es_BO'] = array('language' => 'es_BO','english_name' => 'Spanish (Bolivia)','native_name' => 'Español (Bolivia)','iso' => array('es'));
$hreflanguages['es_DO'] = array('language' => 'es_DO','english_name' => 'Spanish (Dominican Republic)','native_name' => 'Español (Dominican Republic)','iso' => array('es'));
$hreflanguages['es_HN'] = array('language' => 'es_HN','english_name' => 'Spanish (Honduras)','native_name' => 'Español (Honduras)','iso' => array('es'));
$hreflanguages['es_SV'] = array('language' => 'es_SV','english_name' => 'Spanish (El Salvador)','native_name' => 'Español (El Salvador)','iso' => array('es'));
$hreflanguages['mt'] = array('language' => 'mt','english_name' => 'Maltese','native_name' => 'Malti','iso' => array('mt'));
$hreflanguages['mt_MT'] = array('language' => 'mt_MT','english_name' => 'Maltese (Malta)','native_name' => 'Malti (Malta)','iso' => array('mt'));
$hreflanguages['en_MT'] = array('language' => 'en_MT','english_name' => 'English (Malta)','native_name' => 'English (Malta)','iso' => array('mt'));
unset($hreflanguages['de_CH_informal']);
unset($hreflanguages['de_DE_formal']);
$hreflanguages = hreflang_array_sort($hreflanguages,'english_name');

global $hreflanguages;
