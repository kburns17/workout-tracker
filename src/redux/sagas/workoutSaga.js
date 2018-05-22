import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


// exercise saga listens for calls and runs generator functions when called.
function*  workoutSaga() {
    yield takeEvery('FETCH_WORKOUTS', getWorkoutSaga);
    yield takeEvery('ADD_WORKOUT', addWorkoutSaga);
    yield takeEvery('DELETE_WORKOUT', deleteWorkoutSaga);
    yield takeEvery('FAVORITE_WORKOUT', favoriteWorkoutSaga);
    yield takeEvery('UPDATE_WORKOUT', updateWorkoutSaga);
}
// when called on mount, or refresh, gets workouts and dispatches call to reducer to set them on DOM 
function* getWorkoutSaga(action) {
    try {
        const workoutsResponse = yield call(axios.get, '/api/workouts')   
        yield put({
            type: 'SET_WORKOUTS',
            payload: workoutsResponse.data
        });
    } catch (error) {
        console.log('error in GET:', error);
    }
};

//  when called places a new workout into database, then calls for state change to re-render
function* addWorkoutSaga(action) {
    try {
        yield call(axios.post, '/api/workouts', action.payload )
        yield put({
            type: 'FETCH_WORKOUTS'
        })
    } catch (error) {
        console.log('error ADD workout', error);
    }
};

// when called deletes specified workout from database, then calls for re-render
function* deleteWorkoutSaga(action){
    console.log(action.payload);
    try {
        yield call(axios.delete, '/api/workouts/' + action.payload.item.id, action.payload.user )
        yield put({
            type: 'FETCH_WORKOUTS'
        })
    } catch (error) {
        console.log('error DELETE at saga:', error);
    }
}
// when called updates a workout as a favorite in database, then calls for re-render
function* favoriteWorkoutSaga(action){
    try {
        yield call(axios.put, 'api/workouts/favorite/' + action.payload.id, action.payload)
        yield put({
            type: 'FETCH_WORKOUTS'
        })
    } catch (error) {
        console.log('error FAV saga:', error);
    }
}
// when called updates requested specifics of workout, then calls for re-render
function* updateWorkoutSaga(action){
    try {
        yield call(axios.put, 'api/workouts/' + action.payload.id, action.payload)
        yield put({
            type: 'FETCH_WORKOUTS'
        })
    } catch (error) {
        console.log('error UPDATE saga:', error);
    }
}

export default workoutSaga;