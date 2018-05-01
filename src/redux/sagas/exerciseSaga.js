import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* exerciseSaga() {
    yield takeEvery('NEW_EXERCISE', addNewExerciseSaga)
}


function* addNewExerciseSaga(action) {
    try {
        yield call(axios.post, '/api/exercises', action.payload )
    } catch (error) {
    }
}






export default exerciseSaga;