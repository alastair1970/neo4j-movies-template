import * as Types from '../actions/ActionActionTypes';

const initialState = {
  isFetching: false,
  detail: null,
  actionsList: {}
};

export default function actions(state = initialState, action) {
  switch (action.type) {
    case Types.GET_ACTION:          return  { ...state, isFetching: true                           };
    case Types.GET_ACTION_SUCCESS:  return  { ...state, isFetching: false, detail: action.response };
    case Types.NEW_ACTION:          return  { ...state, isFetching: true                           };
    case Types.NEW_ACTION_SUCCESS:  return  { ...state, isFetching: false, detail: action.response };
    case Types.ACTION_DETAIL_CLEAR: return  { ...state                   , detail: null            };
    case Types.GET_ACTIONS:         return  { ...state, isFetching: true                , isFetchingActions: true };
    case Types.GET_ACTIONS_SUCCESS: return  { ...state, isFetching: getIsFetching(false), isFetchingActions: false, actionsList: action.response };
    default:
      return state;
  }
}

function getIsFetching(state, isFetching) {
  return (state.isFetchingActions || isFetching);
}
