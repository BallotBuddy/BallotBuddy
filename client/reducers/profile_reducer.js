<<<<<<< b69a2f27aeeb38dd2fb773231fb323b37ca4c187
import { 
  FETCH_PROFILE,
  FETCH_CANDIDATE,
  FETCH_BY_ZIP,
  FETCH_VOTE_SMART_BIO,
  FETCH_CANDIDATE_INDUSTRY_CONTRIBUTORS,
  CLEAR_VOTE_SMART_BIO
  } from '../actions/index';

<<<<<<< 278bde5bb5b331bd089fc05d5164abbc54badaab
const INITIAL_STATE = { profiles: [], singleProfile: null, zipResponse: [], voteSmartBio: '', contributors: [] };
=======
const INITIAL_STATE = { profiles: [], singleProfile: null, zipResponse: [], voteSmartBio: null, contributors: [] };
=======
import { FETCH_PROFILE, FETCH_CANDIDATE, FETCH_BY_ZIP, FETCH_VOTE_SMART_BIO} from '../actions/index';
const INITIAL_STATE = { profiles: [], singleProfile: null, zipResponse: [], voteSmartBio: null };
>>>>>>> refactor to display just the video player
>>>>>>> refactor to display just the video player

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
<<<<<<< 278bde5bb5b331bd089fc05d5164abbc54badaab
  // clears vote smart bio state
  case CLEAR_VOTE_SMART_BIO:
    return {...state, voteSmartBio: action.payload.data};
=======
  //default:
  // case FETCH_CANDIDATE_VIDEO:
  //   console.log('fetch candidate from reducer : action', action);
  //   return {...state, candidateVideo: action.payload.data};
>>>>>>> refactor to display just the video player
  default:
    return state;
  }
}
