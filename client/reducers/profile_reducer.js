import { 
  FETCH_VOTE_SMART_BIO,
  FETCH_CANDIDATE_SECTOR_FUNDING,
  CLEAR_VOTE_SMART_BIO,
  FETCH_COURAGE_SCORE,
  FETCH_TWITTER,
  FETCH_CANDIDATE_VIDEO
  } from '../actions/index';

const INITIAL_STATE = { voteSmartBio: '', courage: [], twitterdata: '', sectorFunding: [{sector:'', funding: 0}], video: '' };

// returns results from API call for candidate search, passes to state
export default function( state = INITIAL_STATE, action) {
  switch (action.type) {

  // grab candidate data from vote smart api
  case FETCH_VOTE_SMART_BIO:
    return {...state, voteSmartBio: action.payload.data };
  
  // grab sectorFunding via opensecrets api
  case FETCH_CANDIDATE_SECTOR_FUNDING:
    return {...state, sectorFunding: action.payload.data || [] };
  
  // grab twitter data
  case FETCH_TWITTER:
    return {...state, twitterdata: action.payload.data };

  // clears vote smart bio state
  case CLEAR_VOTE_SMART_BIO:
    return {...state, voteSmartBio: action.payload.data, twitterdata: '', video: action.payload.data };

  // courage test results
  case FETCH_COURAGE_SCORE:
    return {...state, courage: action.payload.data.npat };

  // youtube video results
  case FETCH_CANDIDATE_VIDEO:
    return {...state, video: action.payload.data.selectedVideo}

  default:
    return state;
  }
}
