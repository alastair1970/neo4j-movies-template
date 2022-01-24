import {all, call, put, takeEvery} from 'redux-saga/effects';
import ActionsApi from '../../api/ActionsApi';
import * as Actions from '../actions/ActionActions';
import * as Types from '../actions/ActionActionTypes';

export default function* actionFlow() {
  yield all([
    takeEvery(Types.GET_ACTION , getAction ),
    takeEvery(Types.GET_ACTIONS, getActions),
    takeEvery(Types.SET_ACTION , setAction ),
    takeEvery(Types.NEW_ACTION , newAction ),
    takeEvery(Types.DEL_ACTION , delAction ),
  ]);
}

function* getAction(action) {
  var {id} = action;
  try {
    const response = yield call(ActionsApi.getAction, id);
    yield put(Actions.getActionSuccess(response));
  }
  catch (error) {
    yield put(Actions.getActionFailure(error));
  }
}

function* setAction(action) {
  var {id,state} = action;
  try {
    const response = yield call(ActionsApi.setAction,id,state);
    yield put(Actions.setActionSuccess(response,state));
  }
  catch (error) {
    yield put(Actions.setActionFailure(error));
  }
}

function* newAction(action) {
  var {state} = action;
  try {
    const response = yield call(ActionsApi.newAction,state);
    yield put(Actions.newActionSuccess(response));
  }
  catch (error) {
    yield put(Actions.newActionFailure(error));
  }
}

function* delAction(action) {
  var {id} = action;
  try {
    const response = yield call(ActionsApi.delAction,id);
    yield put(Actions.delActionSuccess(id,response));
  }
  catch (error) {
    yield put(Actions.delActionFailure(error));
  }
}

function* getActions() {
  try {
    const response = yield call(ActionsApi.getActions);
    yield put(Actions.getActionsSuccess(response));
  }
  catch (error) {
    yield put(Actions.getActionsFailure(error));
  }
}
