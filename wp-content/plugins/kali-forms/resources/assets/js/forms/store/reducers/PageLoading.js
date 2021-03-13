import { SET_LOADING, SET_LOADED } from './../actions';

const PageLoading = ( state = false, action ) => {
  switch ( action.type ) {
    case SET_LOADING:
      return true;
    case SET_LOADED:
      return false;
    default:
      return state;
  }
};

export default PageLoading;
