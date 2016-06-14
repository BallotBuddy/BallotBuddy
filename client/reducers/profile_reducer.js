import { FETCH_PROFILE } from '../actions/index';

// returns results from API call for candidate search, passes to state
export default function( state = [] , action) {
  switch (action.type) {
  case FETCH_PROFILE:
    return action.payload.data;
  }
  return state;
}
