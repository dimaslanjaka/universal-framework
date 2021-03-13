import { ADD_COMPONENT, REMOVE_COMPONENT, CHANGE_PROPERTY, ADD_MULTIPLE_COMPONENTS, CHANGE_GRID_IN_ITEM } from './../actions';

const FieldComponents = (state = [], action) => {
	switch (action.type) {
		case ADD_COMPONENT:
			return [...state, action.payload];
		case REMOVE_COMPONENT:
			return [...state.filter((e, idx) => {
				return e.internalId !== action.payload;
			})];
		case ADD_MULTIPLE_COMPONENTS:
			return [...state, ...action.payload];
		case CHANGE_PROPERTY:
			state[action.payload.index].properties[action.payload.id] = action.payload.value;
			return state;
		case CHANGE_GRID_IN_ITEM:
			state[action.payload.index].grid = action.payload.value;
			return state;
		default:
			return state;
	}
};

export default FieldComponents;
