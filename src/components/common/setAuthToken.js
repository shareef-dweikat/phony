import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    //apply to every request
    axios.defaults.headers.common["Authorization"] = token; // between the square pracets is name in the headers
  } else {
    //Delete auth headers authorization
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;
