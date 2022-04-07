import {all, call, put, takeEvery} from 'redux-saga/effects';
import AuthApi          from '../Auth/AuthApi';
import * as Actions     from './ProfileActions';
import * as Types       from './ProfileTypes';
import * as AuthActions from '../Auth/AuthActions';
import { push }         from 'connected-react-router'

export default function* signupFlow() {
  yield all([
    takeEvery(Types.PROFILE_CREATE, createProfile_0),
  ]);
}

function* createProfile_0(action) {
  var {payload} = action;
  try {
    const response = yield call(AuthApi.register_0, payload);
    yield put(Actions.createProfileSuccess_0(response));
    yield put(AuthActions.login(payload.username, payload.password));
    yield put(push('/signup-status'));
  }
  catch (error) {
    yield put(Actions.createProfileFailure_0(error));
  }
}

