import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import workoutReducer from './workoutReducer'

const store = combineReducers({
  user,
  login,
  workoutReducer
});

export default store;
