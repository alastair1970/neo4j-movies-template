import * as Types from './ActionActionTypes';

export function clearAction              (){ return {type: Types.ACTION_DETAIL_CLEAR                 }; }
export function getAction              (id){ return {type: Types.ACTION_DETAIL_GET_REQUEST, id       }; } 
export function getActionSuccess (response){ return {type: Types.ACTION_DETAIL_GET_SUCCESS, response }; }
export function getActionFailure    (error){ return {type: Types.ACTION_DETAIL_GET_FAILURE, error    }; }
export function setActionState  (id, state){ return {type: Types.SET_ACTION_STATE         , id, state}; }
export function setActionStateSuccess    (){ return {type: Types.SET_ACTION_STATE_SUCCESS            }; }
export function setActionStateFailure    (){ return {type: Types.SET_ACTION_STATE_FAILURE            }; }
export function createNewAction     (state){ return {type: Types.CREATE_NEW_ACTION            , state}; }
export function createNewActionSuccess   (){ return {type: Types.CREATE_NEW_ACTION_SUCCESS           }; }
export function createNewActionFailure   (){ return {type: Types.CREATE_NEW_ACTION_FAILURE           }; }
export function deleteAction           (id){ return {type: Types.DELETE_ACTION            , id       }; } 
export function deleteActionSuccess      (){ return {type: Types.DELETE_ACTION_SUCCESS               }; }
export function deleteActionFailure      (){ return {type: Types.DELETE_ACTION_FAILURE               }; }
