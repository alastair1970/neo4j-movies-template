import settings from '../../config/settings';
import axios from '../Index/axios';

const {apiBaseURL} = settings;

export default class AuthApi {
  static login(username, password) {
    return axios.post(`${apiBaseURL}/login`, { username, password } );
  }

  static register_0(profile) {
    return axios.post(`${apiBaseURL}/register`, profile);
  }

  static register_1(profile) {
    return axios.post(`${apiBaseURL}/register`, profile);
  }
}
