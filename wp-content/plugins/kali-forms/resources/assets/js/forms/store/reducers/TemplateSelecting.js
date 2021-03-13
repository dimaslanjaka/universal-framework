import { SET_TEMPLATE_SELECTING_TRUE, SET_TEMPLATE_SELECTING_FALSE } from './../actions';

const TemplateSelecting = (state = KaliFormsObject.fieldComponents.length === 0, action) => {
	switch (action.type) {
		case SET_TEMPLATE_SELECTING_TRUE:
			return true;
		case SET_TEMPLATE_SELECTING_FALSE:
			return false;
		default:
			return state;
	}
};

export default TemplateSelecting;
