import settings from '../../config/settings';
import axios from '../Index/axios';

const {apiBaseURL} = settings;

export default class ActionApi {

static getAction       (id){ return axios.get   (`${apiBaseURL}/actions/${id}`               );}
static delAction       (id){ return axios.delete(`${apiBaseURL}/actions/${id}`               );}
static getActions        (){ return axios.get   (`${apiBaseURL}/actions`                     );}
static savAction(id, state){ return axios.post  (`${apiBaseURL}/actions/${id}/state`, {state});}
static newAction    (state){ return axios.post  (`${apiBaseURL}/actions/create`     , {state});}

}


