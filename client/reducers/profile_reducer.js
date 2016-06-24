import { 
  FETCH_VOTE_SMART_BIO,
  FETCH_CANDIDATE_INDUSTRY_CONTRIBUTORS,
  CLEAR_VOTE_SMART_BIO,
  FETCH_COURAGE_SCORE
  } from '../actions/index';

<<<<<<< 5c8e6a22d6bb2c9565330fd953fe8475637141e2
const INITIAL_STATE = { profiles: [], singleProfile: null, zipResponse: [], voteSmartBio: '', contributors: [], courage: [] };
=======
const INITIAL_STATE = { voteSmartBio: '', contributors: [], courage: [] };
>>>>>>> search reducer implemented - candidate courage component implemented (v1) - clean up on superfluous code

// returns results from API call for candidate search, passes to state
export default function( state = INITIAL_STATE, action) {
  switch (action.type) {
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
    return {...state, courage: action.payload.data.npat.section}
  //default:
  default:
    return state;
  }
}
