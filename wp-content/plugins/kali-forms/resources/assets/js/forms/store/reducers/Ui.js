import { SET_UI_APPBAR, SET_UI_SIDEBAR, SET_UI_SIDEBARSETTINGS } from './../actions';
const Ui = (state = { appBar: 'formBuilder', sidebar: 'formFields', sidebarSettings: 'general' }, action) => {
	switch (action.type) {
		case SET_UI_APPBAR:
			state.appBar = action.payload;
			return {...state}
		case SET_UI_SIDEBAR:
			state.sidebar = action.payload;
			return {...state}
		case SET_UI_SIDEBARSETTINGS:
			state.sidebarSettings = action.payload;
			return {...state}
		default:
			return state;
	}
};

export default Ui;
