import { combineReducers } from 'redux';
import ProfileReducer from './profile_reducer';
// import SingleProfileReducer from './single_profile_reducer';

// aggregates all individual reducers
const rootReducer = combineReducers({
  profiles: ProfileReducer
});

export default rootReducer;
