import { CHANGE_EMAIL_VALUES, ADD_EMAIL } from './../actions';

const FormEmails = (state = [], action) => {
	switch (action.type) {
		case ADD_EMAIL:
		case CHANGE_EMAIL_VALUES:
			return [...action.payload]
		default:
			return state;
	}
}

export default FormEmails
