import { FETCH_PROFILE } from '../actions/index';

export default function( state = [] , action) {
  
  switch (action.type) {
  case FETCH_PROFILE:
    return action.payload.response.legislator;
  }
  return state;
}