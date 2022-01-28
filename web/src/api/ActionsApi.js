import settings from '../config/settings';
import axios from './axios';

const {apiBaseURL} = settings;

export default class ActionsApi {

static getAction       (id){ return axios.get   (`${apiBaseURL}/Actions/${id}`               );}
static delAction       (id){ return axios.delete(`${apiBaseURL}/Actions/${id}`               );}
static getActions        (){ return axios.get   (`${apiBaseURL}/Actions`                     );}
static savAction(id, state){ return axios.post  (`${apiBaseURL}/Actions/${id}/state`, {state});}
static newAction    (state){ return axios.post  (`${apiBaseURL}/Actions/create`     , {state});}

}


