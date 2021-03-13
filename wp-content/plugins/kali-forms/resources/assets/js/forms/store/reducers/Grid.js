import { SET_GRID } from './../actions';

const Grid = ( state = [], action ) => {
  switch ( action.type ) {
    case SET_GRID:
      return [ ...action.payload ];
    default:
      return state;
  }
};

export default Grid;
