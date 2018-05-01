import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import exerciseSaga from './exerciseSaga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    exerciseSaga(),
    // watchIncrementAsync()
  ]);
}
