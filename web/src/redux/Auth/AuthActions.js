import * as Types from './AuthTypes';

export function login (username, password){return{type: Types.LOGIN, username, password};}
export function loginSuccess       (token){return{type: Types.LOGIN_SUCCESS, token};}
export function loginFailure       (error){return{type: Types.LOGIN_FAILURE, error};}
export function logout                  (){return{type: Types.LOGOUT};}
