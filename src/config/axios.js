import axios from "axios";

const baseURL = "http://localhost:3001/api/v1/";

const httpInstance = axios.create({ baseURL });

const setToken = (newToken) => {
  if (newToken) {
    httpInstance.defaults.headers.common["Authorization"] =
      "Bearer " + newToken;
  }
};

const defaultHeaders = {
  "Content-Type": "application/json",
};

const postRequest = async (resource, data, headers = null) => {
  return await httpInstance.post(`${resource}`, data, {
    headers: headers || defaultHeaders,
  });
};

const getRequest = async (resource, headers, blob = false) => {
  if (blob) {
    return await httpInstance.get(`${resource}`, headers);
  }
  return await httpInstance.get(`${resource}`, {
    headers: headers || defaultHeaders,
  });
};

const deleteRequest = async (resource) => {
  return await httpInstance.delete(`${resource}`);
};

const putRequest = async (resource, data) => {
  return await httpInstance.put(`${resource}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default {
  postRequest,
  getRequest,
  deleteRequest,
  putRequest,
  baseURL,
  setToken,
};
