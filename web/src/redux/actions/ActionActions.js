import * as Types from './ActionActionTypes';

export function clearAction              (){ return {type: Types.ACTION_DETAIL_CLEAR             }; }

export function getAction              (id){ return {type: Types.GET_ACTION           , id       }; }
export function getActionSuccess (response){ return {type: Types.GET_ACTION_SUCCESS   , response }; }
export function getActionFailure    (error){ return {type: Types.GET_ACTION_FAILURE   , error    }; }

export function setAction       (id, state){ return {type: Types.SET_ACTION           , id, state}; }
export function setActionSuccess         (){ return {type: Types.SET_ACTION_SUCCESS              }; }
export function setActionFailure         (){ return {type: Types.SET_ACTION_FAILURE              }; }

export function newAction           (state){ return {type: Types.NEW_ACTION           , state    }; }
export function newActionSuccess (response){ return {type: Types.NEW_ACTION_SUCCESS   , response }; }
export function newActionFailure    (error){ return {type: Types.NEW_ACTION_FAILURE   , error    }; }

export function deleteAction           (id){ return {type: Types.DELETE_ACTION        , id       }; }
export function deleteActionSuccess      (){ return {type: Types.DELETE_ACTION_SUCCESS           }; }
export function deleteActionFailure      (){ return {type: Types.DELETE_ACTION_FAILURE           }; }

export function getActions               (){ return {type: Types.GET_ACTIONS                     }; }
export function getActionsSuccess(response){ return {type: Types.GET_ACTIONS_SUCCESS  , response }; }
export function getActionsFailure   (error){ return {type: Types.GET_ACTIONS_FAILURE  , error    }; }
