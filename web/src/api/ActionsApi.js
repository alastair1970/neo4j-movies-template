import settings from '../config/settings';
import axios from './axios';

const {apiBaseURL} = settings;

export default class ActionsApi {

  static getAction            (id){ return axios.get   (`${apiBaseURL}/Actions/${id}`); }
  static deleteAction         (id){ return axios.delete(`${apiBaseURL}/Actions/${id}`); }
  static getActionsForUser      (){ return axios.get   (`${apiBaseURL}/Actions`); }
  static setActionState(id, state){ return axios.post  (`${apiBaseURL}/Actions/${id}/state`, {state}); }
  static createNewAction   (state){ return axios.post  (`${apiBaseURL}/Actions/create`, {state}); }

}


