import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api.com/api',
});

export default api;
