import { CHANGE_APP_BAR_VALUES } from './../actions';
const AppBar = (state = { activeTab: '' }, action) => {
	switch (action.type) {
		case CHANGE_APP_BAR_VALUES:
			let obj = {};
			obj[action.payload.key] = action.payload.value;
			return { ...state, ...obj }
		default:
			return state;
	}
};

export default AppBar;
