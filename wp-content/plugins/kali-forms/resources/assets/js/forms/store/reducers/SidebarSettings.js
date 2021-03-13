import { SET_ACTIVE_SETTINGS_TAB_IN_SIDEBAR } from './../actions';

const SidebarSettings = (state = { activeTab: 'general' }, action) => {
	switch (action.type) {
		case SET_ACTIVE_SETTINGS_TAB_IN_SIDEBAR:
			return { ...state, activeTab: action.payload };
		default:
			return state;
	}
};

export default SidebarSettings;
