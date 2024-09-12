// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Instance = axios.create({
//   baseURL: 'http://192.168.1.18:8000',
// });

// Instance.interceptors.request.use(
//   async config => {
//     const token = await AsyncStorage.getItem('userToken');
//     console.log('Interceptor token:', token);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error),
// );

// export {Instance};

import axios from 'axios';

const Instance = axios.create({
  baseURL: 'http://192.168.1.18:8000',
  //  baseURL: 'https://lazy-app-n1h9.onrender.com',
  headers: {
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmUyOGJlMjM2ZDRiNmNjZDZiNDViNzkiLCJlbWFpbCI6Imtpc2hhbkBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcyNjEyMjk5NSwiZXhwIjoxNzI5NTA2OTk1fQ.Kc7I1O1rOxbXCyNU3DhkwHldR-EdP1DwraODXbFJqOI',
  },
});

export {Instance};
