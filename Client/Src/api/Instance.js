import axios from 'axios';

const Instance = axios.create({
  // baseURL: 'http://192.168.1.18:8000',
  baseURL:'https://lazy-app-n1h9.onrender.com',
  headers: {
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY3OWFjNThjYjQyNWJiNzVlMTk2OGEiLCJlbWFpbCI6IkRpdnllc2hAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3Mjc1MDMwNjgsImV4cCI6MTczMDg4NzA2OH0.q83IBnxOCeQ07aimjNhqcDrO3apsjwe3NevM5Klrn8s',
  },
});

export {Instance};
