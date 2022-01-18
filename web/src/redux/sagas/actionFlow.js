import {all, call, put, takeEvery} from 'redux-saga/effects';
import ActionsApi from '../../api/ActionsApi';
import * as Actions from '../actions/ActionActions';
import * as Types from '../actions/ActionActionTypes';

export default function* actionFlow() {
  yield all([
    takeEvery(Types.ACTION_DETAIL_GET_REQUEST, getAction),
    takeEvery(Types.SET_ACTION_STATE         , setActionState),
    takeEvery(Types.CREATE_NEW_ACTION        , createNewAction),
    takeEvery(Types.DELETE_ACTION            , deleteAction),
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

function* setActionState(action) {
  var {id,state} = action;
  try {
    const response = yield call(ActionsApi.setActionState,id,state);
    yield put(Actions.setActionStateSuccess(response));
  }
  catch (error) {
    yield put(Actions.setActionStateFailure(error));
  }
}

function* createNewAction(action) {
  var {state} = action;
  try {
    const response = yield call(ActionsApi.createNewAction,state);
    yield put(Actions.createNewActionSuccess(response));
  }
  catch (error) {
    yield put(Actions.createNewActionFailure(error));
  }
}

function* deleteAction(action) {
  var {id} = action;
  try {
    const response = yield call(ActionsApi.deleteAction,id);
    yield put(Actions.deleteActionSuccess(response));
  }
  catch (error) {
    yield put(Actions.deleteActionFailure(error));
  }
}
