import { SET_EMAIL_WIZARD_DIALOG_OFF, SET_EMAIL_WIZARD_DIALOG_ON } from './../actions';

const EmailWizardDialog = (state = false, action) => {
	switch (action.type) {
		case SET_EMAIL_WIZARD_DIALOG_ON:
			return true;
		case SET_EMAIL_WIZARD_DIALOG_OFF:
			return false;
		default:
			return state;
	}
};

export default EmailWizardDialog;
