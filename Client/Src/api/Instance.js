import axios from 'axios';

const Instance = axios.create({
  baseURL: 'http://192.168.1.18:8000',
  //  baseURL: 'https://lazy-app-n1h9.onrender.com',
  headers: {
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmU5NmU4YjE1M2NiNDkwZjRiYWMzNTAiLCJlbWFpbCI6Iktpc2hhbkBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcyNjU3NDIzMywiZXhwIjoxNzI5OTU4MjMzfQ.SKwvCNPX6nfXwZ-ZLgFtDbeus7n_Cm6I89saHQxaw_o',
  },
});

export {Instance};
