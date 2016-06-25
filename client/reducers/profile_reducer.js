import { 
  FETCH_VOTE_SMART_BIO,
  FETCH_CANDIDATE_INDUSTRY_CONTRIBUTORS,
  CLEAR_VOTE_SMART_BIO,
<<<<<<< 63fdea70f9717cb3b7aed7604670f44080e56601
  FETCH_COURAGE_SCORE,
  FETCH_TWITTER
  } from '../actions/index';

const INITIAL_STATE = { voteSmartBio: '', contributors: [], courage: [], twitterdata: [] };

// returns results from API call for candidate search, passes to state
export default function( state = INITIAL_STATE, action) {
  switch (action.type) {
=======
  FETCH_TWITTER } from '../actions/index'
const INITIAL_STATE = { profiles: [], singleProfile: '', zipResponse: [], voteSmartBio: '', contributors: [] , twitterdata: '' };
// returns results from API call for candidate search, passes to state
export default function( state = INITIAL_STATE, action) {
  switch (action.type) {
  //single candidate:
  case FETCH_CANDIDATE:
  console.log("This is the profile reducer firing for FETCH_CANDIDATE", action.payload.data['0']);
    return { ...state, singleProfile: action.payload.data['0'] }; //undefined
  //initial search:
  case FETCH_PROFILE:
    return {...state, profiles: action.payload.data};
  //search by zipcode:
  case FETCH_BY_ZIP:
    return {...state, zipResponse: action.payload.data};
  // grab candidate bio from votesmart's api
>>>>>>> got singleProfile to hold candidate information including youtube id and youtube links
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
