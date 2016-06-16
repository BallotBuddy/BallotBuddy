import { FETCH_PROFILE, FETCH_CANDIDATE } from '../actions/index';

const INITIAL_STATE = { profiles: [], singleProfile: null };

// returns results from API call for candidate search, passes to state
export default function( state = INITIAL_STATE, action) {
  switch (action.type) {
  //single candidate:
  case FETCH_CANDIDATE:
    return { ...state, singleProfile: action.payload.data['0'] };
  //initial search:
  case FETCH_PROFILE:
    return {...state, profiles: action.payload.data};
  //default:
  default:
    return state;
  }
}
