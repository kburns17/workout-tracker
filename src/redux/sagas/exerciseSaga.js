import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* exerciseSaga() {
    yield takeEvery('FETCH_EXERCISES', getExercisesSaga)
    yield takeEvery('ADD_EXERCISE', addNewExerciseSaga)
}


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