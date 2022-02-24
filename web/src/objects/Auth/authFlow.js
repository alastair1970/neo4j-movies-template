import {all, call, put, takeEvery} from 'redux-saga/effects';
import AuthApi from './AuthApi';
import * as Actions from './AuthActions';
import * as ProfileActions from '../Profile/ProfileActions';
import * as Types from './AuthTypes';
import UserSession from '../../UserSession';

export default function* authFlow() {
  yield all([
    takeEvery(Types.LOGIN, login),
    takeEvery(Types.LOGOUT, logout)
  ]);
}

function* login(action) {
  var {username, password} = action;
  try {
    const response = yield call(AuthApi.login, username, password);
    UserSession.setToken(response.token);

    yield put(Actions.loginSuccess(response.token));
    yield put(ProfileActions.getProfile());
  }
  catch (error) {
    yield put(Actions.loginFailure(error));
  }
}

function* logout() {
  yield UserSession.setToken(null);
}
