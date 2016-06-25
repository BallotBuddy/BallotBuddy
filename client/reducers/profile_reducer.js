import { 
  FETCH_VOTE_SMART_BIO,
  FETCH_CANDIDATE_INDUSTRY_CONTRIBUTORS,
  CLEAR_VOTE_SMART_BIO,
  FETCH_COURAGE_SCORE,
  FETCH_TWITTER
  } from '../actions/index';

const INITIAL_STATE = { voteSmartBio: '', contributors: [], courage: [], twitterdata: [] };

// returns results from API call for candidate search, passes to state
export default function( state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_VOTE_SMART_BIO:
    return {...state, voteSmartBio: action.payload.data};
  
  // grab contributors via opensecrets api
  case FETCH_CANDIDATE_INDUSTRY_CONTRIBUTORS:
    return {...state, contributors: action.payload.data || [] };
  
  // grab twitter data
  case FETCH_TWITTER:
    console.log("fetch twitter",action)
    return {...state, twitterdata: action.payload.data};

  // clears vote smart bio state
  case CLEAR_VOTE_SMART_BIO:
    return {...state, voteSmartBio: action.payload.data};
  
  // courage test results
  case FETCH_COURAGE_SCORE:
    return {...state, courage: action.payload.data.npat };

  default:
    return state;
  }
}
