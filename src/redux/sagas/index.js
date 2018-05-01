import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import exerciseSaga from './exerciseSaga';
import workoutSaga from './workoutSaga';



export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    exerciseSaga(),
    workoutSaga(),
    // watchIncrementAsync()
  ]);
}
