// services/forklift.js
import API from './api';

export async function getForklifts() {
  const res = await API.get('/api/forklifts');
  return res.data;
}

export async function getForkliftsDetail(id) {
  const res = await API.get(`/api/forklifts/${id}`);
  return res.data;
}
