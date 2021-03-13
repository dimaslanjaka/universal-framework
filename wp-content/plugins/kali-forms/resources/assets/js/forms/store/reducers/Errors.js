import { SET_ERROR_IN_APP, REMOVE_ERROR_FROM_APP } from './../actions'

const Errors = (state = [], action) => {
	switch (action.type) {
		case SET_ERROR_IN_APP:
			return [...state, action.payload];

		case REMOVE_ERROR_FROM_APP:
			return state.filter((e, idx) => {
				return idx !== action.payload;
			});
		default:
			return state;
	}
}

export default Errors;
