import axios from 'axios';
import history from '../services/history';

// Add a request interceptor
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken'); 
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(response => {
  return response;
}, async error => {
  if (error.response && error.response.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');

    // Attempt to refresh the token here
    const response = await axios.post('/token/refresh/', { refresh: refreshToken });

    if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.access);
        // Retry the original request
        error.config.headers['Authorization'] = 'Bearer ' + response.data.access;
        return axios(error.config);
    } else {
        // Handle token refresh failure (e.g., redirect to login)
        alert('Your session has expired. Please log in again.');
        history.push('/login');
    }
  }
  
  return Promise.reject(error);
});
