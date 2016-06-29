import { 
  FETCH_PROFILE,
  FETCH_CANDIDATE,
  FETCH_BY_ZIP,
  SHOW_SEARCH,
  SHOW_LIST,
  CLEAR_PROFILES
  } from '../actions/index';

const INITIAL_STATE = { profiles: '', singleProfile: '', zipResponse: '', list: false, search: true};

// returns results from API call for candidate search, passes to state
export default function( state = INITIAL_STATE, action) {
  switch (action.type) {

  // single candidate:
  case FETCH_CANDIDATE:
    return { ...state, singleProfile: action.payload.data['0'] };
  
  // initial search:
  case FETCH_PROFILE:
    return {...state, profiles: action.payload.data};
  
  // search by zipcode:
  case FETCH_BY_ZIP:
    return {...state, zipResponse: action.payload.data};

  // fires to show the search component
  case SHOW_SEARCH:
    return {...state, list: false, search: true};

  // fires to show the profiles list component
  case SHOW_LIST:
    return {...state, list: true, search: false};

  // clears profiles list
  case CLEAR_PROFILES:
    return {...state, zipResponse: action.payload.data};

  // default response
  default:
    return state;
  }
}
