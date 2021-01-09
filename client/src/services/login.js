import axios from "axios";
const baseUrl = "/api/login";

const log = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { log }
