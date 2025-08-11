import axios from 'axios';

export const apiKey = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: apiKey,
});

export default api;
