import {all, call, put, takeEvery} from 'redux-saga/effects';
import ActionApi from './ActionApi';
import * as Actions from './ActionActions';
import * as Types from './ActionTypes';

export default function* actionFlow() {
  yield all([
    takeEvery(Types.GET_ACTION , getAction ),
    takeEvery(Types.GET_ACTIONS, getActions),
    takeEvery(Types.SET_ACTION , setAction ),
    takeEvery(Types.SAV_ACTION , savAction ),
    takeEvery(Types.NEW_ACTION , newAction ),
    takeEvery(Types.DEL_ACTION , delAction ),
  ]);
}

function* getAction(action) {
  var {id} = action;
  try {
    const response = yield call(ActionApi.getAction, id);
    yield put(Actions.getActionSuccess(response));
  }
  catch (error) {
    yield put(Actions.getActionFailure(error));
  }
}

function* setAction(action) {
  var {id, state} = action;
  try {
    yield put(Actions.setActionSuccess({id,...state}));
  }
  catch (error) {
    yield put(Actions.setActionFailure(error));
  }
}

function* savAction(action) {
  var {id,state} = action;
  try {
    const response = yield call(ActionApi.savAction,id,state);
    yield put(Actions.savActionSuccess(response,state));
  }
  catch (error) {
    yield put(Actions.savActionFailure(error));
  }
}

function* newAction(action) {
  var {state} = action;
  try {
    const response = yield call(ActionApi.newAction,state);
    yield put(Actions.newActionSuccess(response));
  }
  catch (error) {
    yield put(Actions.newActionFailure(error));
  }
}

function* delAction(action) {
  var {id} = action;
  try {
    const response = yield call(ActionApi.delAction,id);
    yield put(Actions.delActionSuccess(id,response));
  }
  catch (error) {
    yield put(Actions.delActionFailure(error));
  }
}

function* getActions() {
  try {
    const response = yield call(ActionApi.getActions);
    yield put(Actions.getActionsSuccess(response));
  }
  catch (error) {
    yield put(Actions.getActionsFailure(error));
  }
}
