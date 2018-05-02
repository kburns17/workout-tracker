import { combineReducers } from 'redux';


//sets state of this reducer with action.payload(workouts). Will be used to render on DOM.
const workoutReducer = (state=[], action) =>{
    switch (action.type) {
        case 'SET_WORKOUTS':
            return action.payload
        default:
            return state;
    }
}


const exerciseReducer = ( state =[], action)=>{
    switch (action.type) {
        case 'SET_EXERCISES':
            return action.payload
        default:
            return state;
    }
}



export default combineReducers({
    workoutReducer,
    exerciseReducer,
});