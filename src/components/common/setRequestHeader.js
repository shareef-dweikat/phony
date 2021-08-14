import axios from "axios";

const setRequestHeader = (key, value = null) => {
  if (value) {
    axios.defaults.headers.common[key] = value;
  } else {
    delete axios.defaults.headers.common[key];
  }
};
export default setRequestHeader;
