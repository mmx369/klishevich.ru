import axios from "axios";

const baseUrl = "/api/goods";
const orderUrl = "/api/orders"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getItem = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createNewOrder = async (newObject) => {
  const response = await axios.post(orderUrl, newObject);
  return response.data;
};

const cartService = { getAll, getItem, createNewOrder }

export default cartService
