import { 
  FETCH_VOTE_SMART_BIO,
  FETCH_CANDIDATE_INDUSTRY_CONTRIBUTORS,
  CLEAR_VOTE_SMART_BIO,
  FETCH_COURAGE_SCORE,
  FETCH_TWITTER,
  FETCH_CANDIDATE_VIDEO
  } from '../actions/index';

const INITIAL_STATE = { voteSmartBio: '', contributors: [], courage: [], twitterdata: '', video: '' };

// returns results from API call for candidate search, passes to state
export default function( state = INITIAL_STATE, action) {
  switch (action.type) {

  // grab candidate data from vote smart api
  case FETCH_VOTE_SMART_BIO:
    return {...state, voteSmartBio: action.payload.data };
  
  // grab contributors via opensecrets api
  case FETCH_CANDIDATE_INDUSTRY_CONTRIBUTORS:
    return {...state, contributors: action.payload.data || [] };
  
  // grab twitter data
  case FETCH_TWITTER:
    return {...state, twitterdata: action.payload.data };

  // clears vote smart bio state
  case CLEAR_VOTE_SMART_BIO:
    return {...state, voteSmartBio: action.payload.data, twitterdata: '' };
  
  // courage test results
  case FETCH_COURAGE_SCORE:
    return {...state, courage: action.payload.data.npat };

  // youtube video results
  case FETCH_CANDIDATE_VIDEO:
  console.log('profile_reducer state:', action.payload.data)
    return {...state, video: action.payload.data.selectedVideo}

  default:
    return state;
  }
}
