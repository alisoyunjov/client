import axios from "axios";

const API_URL = "http://18.167.118.133:8082/api/users/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, email, password, password2) {
    return axios.post(API_URL + "register", {
      name,
      email,
      password,
      password2
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
