<?php

if (!defined('UD_CENTRAL_DIR')) die('Security check');

/**
 * Currently, UpdraftCentral only supports the following modifier keys CTRL, ALT and SHIFT
 * to be used for shortcut combinations.
 *
 * You can use letters in your shortcut combinations such as "ALT+a", "SHIFT+M" or "CTRL+s"
 * or just plain letters e.g. "U", "C", etc.
 *
 * N.B.
 * 1. Make sure that your shortcut keys does not conflict with
 * common OS or Browser shortcut keys. Your can search the internet
 * for these common keys.
 * 2. The "action" accepts DOM id or classname of the button that triggers the
 * action or a custom function that gets executed when the shortcut key is pressed.
 * 3. You can register you own shortcuts or overwrite existing ones by calling
 * "UpdraftCentral_Keyboard_Shortcuts.register_shortcut" and passing the same
 * shortcut name or identifier (e.g. "add_site", "backup_site", etc.) and add your custom action:
 *
 * UpdraftCentral_Keyboard_Shortcuts.register_shortcut({
 *		name: 'popup_dialog',
 *		key: 'SHIFT+P',
 *		description: 'Shows a custom dialog box.',
 *		action: 'button id or class name or jQuery selector that triggers the element that loads the content or a callback function when registering from javascript',
 *		menu: 'the menu or section where the trigger button resides',
 *		site_required: true //defaults to true if not defined or specified
 * })
 */
return array(
	'keyboard_shortcuts' => apply_filters('updraftcentral_keyboard_shortcuts', array())
);
