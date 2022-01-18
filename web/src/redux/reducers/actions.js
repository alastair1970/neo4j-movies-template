import * as Types from '../actions/ActionActionTypes';

const initialState = {
  isFetching: false,
  detail: null
};

export default function actions(state = initialState, action) {
  switch (action.type) {
    case Types.ACTION_DETAIL_GET_REQUEST:
      return  {
        ...state,
        isFetching: true
      };
    case Types.ACTION_DETAIL_GET_SUCCESS:
      return  {
        ...state,
        isFetching: false,
        detail: action.response
      };
    case Types.ACTION_DETAIL_CLEAR:
      return  {
        ...state,
        detail: null
      };
    default:
      return state;
  }
}


