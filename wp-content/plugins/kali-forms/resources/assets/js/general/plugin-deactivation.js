import './plugin-deactivation.scss';
import UninstallFeedback from './uninstall-feedback';
jQuery(document).ready(_ => {
	const uninstallScript = UninstallFeedback;

	uninstallScript.slug = 'kaliforms';
	uninstallScript.template = KaliFormsPluginDeactivationObject.modalHtml;
	uninstallScript.form = 'kaliforms-deactivate-form';
	uninstallScript.deactivateUrl = jQuery('[data-slug="kali-forms"]').find('a').attr('href');
	uninstallScript.deactivate = false;
	uninstallScript.translations = KaliFormsPluginDeactivationObject.translations;
	uninstallScript.nonce = KaliFormsPluginDeactivationObject.ajax_nonce;
	uninstallScript.init(jQuery('[data-slug="kali-forms"]').find('a'));
});
