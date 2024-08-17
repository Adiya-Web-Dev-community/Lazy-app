import axios from 'axios';

const Instance = axios.create({
  baseURL: 'http://192.168.31.104:8000',
  // baseURL: 'https://lazyapp-server.onrender.com/',
});

export {Instance};