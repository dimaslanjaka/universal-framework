import { SET_FORM_FIELD_IN_EDITOR } from './../actions';

const FormFieldEditor = ( state = { display: false, activeFormField: 0 }, action ) => {
  switch ( action.type ) {
    case SET_FORM_FIELD_IN_EDITOR:
      return { ...state, activeFormField: action.payload };
    default:
      return state;
  }
};

export default FormFieldEditor;
