import { SET_CONDITIONAL_LOGIC, SET_CONDITIONED_FIELD } from './../actions';

const ConditionalLogic = ( state = [], action ) => {
  switch ( action.type ) {
    case SET_CONDITIONAL_LOGIC:
			return [ ...action.payload ];
    default:
      return state;
  }
};

export default ConditionalLogic;
