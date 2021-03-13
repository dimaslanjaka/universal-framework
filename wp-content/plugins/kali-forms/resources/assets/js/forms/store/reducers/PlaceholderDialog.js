import { SET_PLACEHOLDER_DIALOG_OFF, SET_PLACEHOLDER_DIALOG_ON } from './../actions';

const PlaceholderDialog = (state = false, action) => {
	switch (action.type) {
		case SET_PLACEHOLDER_DIALOG_ON:
			return true;
		case SET_PLACEHOLDER_DIALOG_OFF:
			return false;
		default:
			return state;
	}
};

export default PlaceholderDialog;
