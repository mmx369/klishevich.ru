import axios from 'axios';
const baseUrl = '/api/goods';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getAllCountries = async () => {
  const response = await axios.get('api/getCountryId');
  return response.data;
};

const createNewItem = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const shopService = { createNewItem, getAll, setToken, getAllCountries };

export default shopService;
