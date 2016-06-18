import { FETCH_PROFILE, FETCH_CANDIDATE, FETCH_BY_ZIP } from '../actions/index';

const INITIAL_STATE = { profiles: [], singleProfile: null, zipResponse: [] };

// returns results from API call for candidate search, passes to state
export default function( state = INITIAL_STATE, action) {
  switch (action.type) {
  //single candidate:
  case FETCH_CANDIDATE:
    return { ...state, singleProfile: action.payload.data['0'] };
  //initial search:
  case FETCH_PROFILE:
    return {...state, profiles: action.payload.data};
  //search by zipcode:
  case FETCH_BY_ZIP:
    console.log('LOG 5: this.state', state);
    console.log('LOG 6: profile_reducer FETCH_BY_ZIP action: ', action);
    return {...state, zipResponse: action.payload.data};
  //default:
  default:
    return state;
  }
}
