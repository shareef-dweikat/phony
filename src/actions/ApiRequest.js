import axios from "axios";

axios.interceptors.response.use(function (config) {

  if (config.data?.reason  === "token expired") {
            window.location.href = '/signin?token-expired'

    }
  return config;
}, function (error) {

  return Promise.reject(error);
});

axios.defaults.baseURL = process.env.REACT_APP_BASE_API;

export default axios;