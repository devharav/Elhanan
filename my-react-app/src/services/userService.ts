// src/services/userService.ts
import api from '../lib/axios';

export const getUsers = () => api.get('/users');
