import { combineReducers } from 'redux';
import ProfileReducer from './profile_reducer';
import LandingReducer from './landing_reducer';

// aggregates all individual reducers
const rootReducer = combineReducers({
  profiles: ProfileReducer,
  landing: LandingReducer
});

export default rootReducer;
