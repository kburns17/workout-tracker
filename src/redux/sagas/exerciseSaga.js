import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// exercise saga listens for calls and runs generator functions when called.
function* exerciseSaga() {
    yield takeEvery('FETCH_EXERCISES', getExercisesSaga)
    yield takeEvery('ADD_EXERCISE', addNewExerciseSaga)
}

// when called on mount, or refresh, gets exercises and dispatches call to reducer to set them on DOM 
function* getExercisesSaga(action){
    try {
        const exercisesResponse = yield call(axios.get, '/api/exercises')
        yield put({
            type: 'SET_EXERCISES',
            payload: exercisesResponse.data
        });
    } catch (error) {
        console.log('error in GET:', error);
    }
};

//  when called places a new exercise into database, then calls for state change to re-render
function* addNewExerciseSaga(action) {
    try {
        yield call(axios.post, '/api/exercises', action.payload )
        yield put({
            type: 'FETCH_EXERCISES'
        })
    } catch (error) {
        console.log('error in GET exercise', error); 
    }
};



export default exerciseSaga;