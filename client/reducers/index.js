import { combineReducers } from 'redux';
import ProfileReducer from './profile_reducer';
import SearchReducer from './search_reducer';

// aggregates all individual reducers
const rootReducer = combineReducers({
  profiles: ProfileReducer,
  search: SearchReducer
});

export default rootReducer;
