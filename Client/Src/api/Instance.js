import axios from 'axios';

const Instance = axios.create({
  // baseURL: 'http://192.168.0.116:8000',
   baseURL: 'https://lazy-app-n1h9.onrender.com',
});

export {Instance};