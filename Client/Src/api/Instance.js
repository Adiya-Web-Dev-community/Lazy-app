import axios from 'axios';

const Instance = axios.create({
  baseURL: 'https://lazyapp-server.onrender.com/',
});

export { Instance };
