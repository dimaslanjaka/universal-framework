import { SET_ACTIVE_TAB_IN_SIDEBAR } from './../actions';

const Sidebar = (state = { activeTab: 'formFields', fieldComponents: [] }, action) => {
	switch (action.type) {
		case SET_ACTIVE_TAB_IN_SIDEBAR:
			return { ...state, activeTab: action.payload };
		default:
			return state;
	}
};

export default Sidebar;
