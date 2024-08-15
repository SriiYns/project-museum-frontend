import { API_URL } from './constants';
import base from 'axios';

const axios = base.create({
	baseURL: API_URL,
});

axios.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

export default axios;
