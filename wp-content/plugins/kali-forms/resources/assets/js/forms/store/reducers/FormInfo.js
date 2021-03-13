import { CHANGE_FORM_INFORMATION_VALUES } from './../actions';
const initialState = {
	requiredFieldMark: '',
	globalErrorMessage: '',
	multipleSelectionsSeparator: '',
	removeCaptchaForLoggedUsers: '',
	cssId: '',
	cssClass: '',
	googleSiteKey: '',
	googleSecretKey: '',
	formName: '',
	showThankYouMessage: '',
	thankYouMessage: '',
	redirectUrl: '',
	paymentsLive: '',
	payPalClientId: '',
	payPalClientIdSandBox: '',
};

// Optional
if (KaliFormsObject.hasOwnProperty('saveFormSubmissions')) {
	initialState.saveFormSubmissions = '';
	initialState.submissionViewPage = '';
}

if (KaliFormsObject.hasOwnProperty('payments')) {
	initialState.stripeKey = '';
	initialState.stripeKeySandBox = '';
}

const FormInfo = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_FORM_INFORMATION_VALUES:
			if (typeof action.payload.key === 'undefined') {
				return { ...state };
			}

			if (state.hasOwnProperty(action.payload.key)) {
				state[action.payload.key] = action.payload.value;
			}

			return { ...state }
		default:
			return state;
	}
};

export default FormInfo;
