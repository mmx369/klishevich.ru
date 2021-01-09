import axios from "axios";
const baseUrl = "/api/goods";
// const imgUrl = "/api/img";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data
};

// const getAllShop = (id) => {
//   const request = axios.get(`${imgUrl}/${id}`);
//   return request.then((response) => response.data);
// }


const createNewItem = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

export default { createNewItem, getAll }
