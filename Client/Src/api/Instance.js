import axios from 'axios';

const Instance = axios.create({
  baseURL: 'http://192.168.1.18:8000',
  // baseURL:'https://lazy-app-n1h9.onrender.com',
  headers: {
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY1MzhjMjhjNTJjMzBiODliZDg5MjgiLCJlbWFpbCI6IlRoZXNreUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcyNzM1MTk3NCwiZXhwIjoxNzMwNzM1OTc0fQ.gorM15lBlzCypNr5hXDrRbxPGLmaUStAp3kcA3J8gt8',
  },
});

export {Instance};
// erning ka or transection order ka 