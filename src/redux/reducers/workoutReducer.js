import { combineReducers } from 'redux';

const workoutReducer = (state=[], action) =>{
    switch (action.type) {
        case 'SET_WORKOUTS':
            return action.payload
    
        default:
                return state;
    }
}





export default combineReducers({
    workoutReducer,
});