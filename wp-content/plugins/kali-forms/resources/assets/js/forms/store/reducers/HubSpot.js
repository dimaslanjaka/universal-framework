import { SET_HUBSPOT_DATA } from './../actions';

const HubSpot = ( state = [], action ) => {
  switch ( action.type ) {
    case SET_HUBSPOT_DATA:
			return [ ...action.payload ];
    default:
      return state;
  }
};

export default HubSpot;
