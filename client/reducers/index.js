import { combineReducers } from 'redux';
import ProfileReducer from './profile_reducer';

// aggregates all individual reducers
const rootReducer = combineReducers({
  profile: ProfileReducer
});

export default rootReducer;
