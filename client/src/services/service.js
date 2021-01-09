import axios from "axios";
const baseUrl = "/api/";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export default { setToken };

