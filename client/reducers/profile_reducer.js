import { FETCH_PROFILE, FETCH_CANDIDATE, FETCH_BY_ZIP, FETCH_VOTE_SMART_BIO } from '../actions/index';

const INITIAL_STATE = { profiles: [], singleProfile: null, zipResponse: [], voteSmartBio: null };

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
    return {...state, zipResponse: action.payload.data};
  // grab candidate bio from votesmart's api
  case FETCH_VOTE_SMART_BIO:
    return {...state, voteSmartBio: action.payload.data};
  //default:
  default:
    return state;
  }
}
