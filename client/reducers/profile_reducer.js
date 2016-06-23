import { 
  FETCH_PROFILE,
  FETCH_CANDIDATE,
  FETCH_BY_ZIP,
  FETCH_VOTE_SMART_BIO,
  FETCH_CANDIDATE_INDUSTRY_CONTRIBUTORS,
  CLEAR_VOTE_SMART_BIO,
  FETCH_COURAGE_SCORE
  } from '../actions/index';

const INITIAL_STATE = { profiles: [], singleProfile: null, zipResponse: [], voteSmartBio: '', contributors: [], courage: [] };

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
  // grab contributors via opensecrets api
  case FETCH_CANDIDATE_INDUSTRY_CONTRIBUTORS:
    return {...state, contributors: action.payload.data || [] };
  // clears vote smart bio state
  case CLEAR_VOTE_SMART_BIO:
    return {...state, voteSmartBio: action.payload.data};
  // courage test results
  case FETCH_COURAGE_SCORE:
    console.log('courage action: ', action);
    return {...state, courage: action.payload.data}
  //default:
  default:
    return state;
  }
}
