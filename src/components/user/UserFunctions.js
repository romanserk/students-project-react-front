import axios from "axios";
import jwt_decode from "jwt-decode";

const localUrl = "http://localhost:4000";
const herokuUrl = "https://infinite-plains-84143.herokuapp.com";

export const register = newUser => {
  return axios
    .post(herokuUrl + "/users/register", {
      user_name: newUser.user_name,
      email: newUser.email,
      password: newUser.password,
      github_profile: newUser.github_profile
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
};

export const login = user => {
  return axios
    .post(herokuUrl + "/users/login", {
      user_name: user.user_name,
      password: user.password
    })
    .then(response => {
      localStorage.setItem("usertoken", response.data);
      return response.data;
    })
    .catch(err => {
      return err;
    });
};

export const checkLoggedIn = (setLoggedIn, userData) => {
  const token = localStorage.user_login;
  if (token) {
    const decoded = jwt_decode(token);
    return axios
      .post(herokuUrl + "/users/logged_in", decoded)
      .then(response => {
        if (response.data === true) {
          setLoggedIn(true);
          userData(jwt_decode(localStorage.user_login));
        } else {
          setLoggedIn(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    return false;
  }
};

export const getUserFromServer = user => {
  return axios
    .get(herokuUrl + "/users/profile", {
      params: {
        name: user
      }
    })
    .then(response => {
      return response.data.data;
    })
    .catch(err => {
      return err.response.data;
    });
};
