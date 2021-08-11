import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://18.167.118.133:8082/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL);
  }

  getAdminBoard() {
    return axios.get(API_URL + 'api/users/current', { headers: authHeader() });
  }
}

export default new UserService();
