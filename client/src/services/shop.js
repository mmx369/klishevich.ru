import axios from "axios";
const baseUrl = "/api/goods";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data
};

const createNewItem = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const shopService = { createNewItem, getAll }

export default shopService
