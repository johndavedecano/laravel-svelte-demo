import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api";

const fetch = (params) => {
  return axios.get("/todos", { params });
};

const fetchOne = (id) => {
  return axios.get(`/todos/${id}`);
};

const change = (id, params) => {
  return axios.put(`/todos/${id}`, params);
};

const create = (params) => {
  return axios.post("/todos", params);
};

const destroy = (id) => {
  return axios.delete(`/todos/${id}`);
};

export default {
  fetch,
  fetchOne,
  change,
  create,
  destroy,
};
