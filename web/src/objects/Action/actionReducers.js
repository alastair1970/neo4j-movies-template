import * as Types from './ActionTypes';
import _ from 'lodash';

const initialState = {
  isFetching: false,
  isFetchingActions: false,
  detail: {},
  actionsList: {}
};

export default function actions(state = initialState, action) {
  switch (action.type) {
    case Types.CLR_ACTION         :return{...state                  , detail: null          };
    case Types.GET_ACTION         :return{...state, isFetching:true                         };
    case Types.GET_ACTION_SUCCESS :return{...state, isFetching:false, detail:action.response};
    case Types.NEW_ACTION         :return{...state, isFetching:true                         };
    case Types.NEW_ACTION_SUCCESS :return{...state, isFetching:false, detail:action.response, actionsList:[...state.actionsList,action.response]};
    case Types.DEL_ACTION         :return{...state, isFetching:true                         };
    case Types.DEL_ACTION_SUCCESS :_.remove(state.actionsList,{id:state.detail.id});
                                   return{...state, isFetching:false, detail:null           };
    case Types.GET_ACTIONS        :return{...state, isFetching:true                , isFetchingActions: true};
    case Types.GET_ACTIONS_SUCCESS:return{...state, isFetching:getIsFetching(false), isFetchingActions: false, actionsList: action.response};
    case Types.SET_ACTION         :return{...state, isFetching:true                         };
    case Types.SET_ACTION_SUCCESS :return{...state, isFetching:false, detail:action.state };
    case Types.SAV_ACTION         :return{...state, isFetching:true                         };
    case Types.SAV_ACTION_SUCCESS :
      var i = state.actionsList.findIndex(o => o.id === state.detail.id);
      if (state.actionsList[i]) {
        state.actionsList[i] = {...(state.actionsList[i]), ...(action.state)}
      };
                                   return{...state
                                          , isFetching:false
                                          , detail:{...(state.detail),...(action.state)}
                                          ,actionsList:state.actionsList
                                        };
    default:
                                   return state;
 }
}

function getIsFetching(state, isFetching) {
  return (state.isFetchingActions || isFetching);
}
