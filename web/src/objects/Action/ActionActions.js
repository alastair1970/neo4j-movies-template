import * as Types from './ActionTypes';

export function clearAction                   (){return{type: Types.CLR_ACTION                        };}

export function getAction                   (id){return{type: Types.GET_ACTION        , id            };}
export function getActionSuccess      (response){return{type: Types.GET_ACTION_SUCCESS, response      };}
export function getActionFailure         (error){return{type: Types.GET_ACTION_FAILURE, error         };}

export function setAction            (id, state){return{type: Types.SET_ACTION        , id, state     };}
export function setActionSuccess         (state){return{type: Types.SET_ACTION_SUCCESS, state         };}
export function setActionFailure         (error){return{type: Types.SET_ACTION_FAILURE, error         };}

export function savAction            (id, state){return{type: Types.SAV_ACTION        , id, state     };}
export function savActionSuccess(response,state){return{type: Types.SAV_ACTION_SUCCESS, response,state};}
export function savActionFailure         (error){return{type: Types.SAV_ACTION_FAILURE, error         };}

export function newAction                (state){return{type: Types.NEW_ACTION        , state         };}
export function newActionSuccess      (response){return{type: Types.NEW_ACTION_SUCCESS, response      };}
export function newActionFailure         (error){return{type: Types.NEW_ACTION_FAILURE, error         };}

export function delAction                   (id){return{type: Types.DEL_ACTION        , id            };}
export function delActionSuccess  (id, response){return{type: Types.DEL_ACTION_SUCCESS, id, response  };}
export function delActionFailure         (error){return{type: Types.DEL_ACTION_FAILURE, error         };}

export function getActions                    (){return{type: Types.GET_ACTIONS                       };}
export function getActionsSuccess     (response){return{type: Types.GET_ACTIONS_SUCCESS, response     };}
export function getActionsFailure        (error){return{type: Types.GET_ACTIONS_FAILURE, error        };}
