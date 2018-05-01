import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function*  workoutSaga() {
    yield takeEvery('FETCH_WORKOUTS', getWorkoutsSaga);
    yield takeEvery('ADD_WORKOUT', addWorkoutSaga);
}

function* getWorkoutsSaga(action) {
    try {
        const workoutsResponse = yield call(axios.get, '/api/workouts')
        yield put({
            type: 'SET_WORKOUTS',
            payload: workoutsResponse.data
        });
    } catch (error) {
        console.log('error in GET:', error);
    }
}


function* addWorkoutSaga(action) {
    try {
        yield call(axios.post, '/api/workouts', action.payload )

        yield put({
            type: 'FETCH_WORKOUTS'
        })
    } catch (error) {
        console.log('error ADD workout', error);
    }
}


export default workoutSaga;