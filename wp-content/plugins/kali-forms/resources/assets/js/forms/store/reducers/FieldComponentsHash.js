import { SET_FIELD_COMPONENTS_HASH } from './../actions';

const FieldComponentsHash = ( state = '', action ) => {
  switch ( action.type ) {
    case SET_FIELD_COMPONENTS_HASH:
      return action.payload;
    default:
      return state;
  }
};

export default FieldComponentsHash;
