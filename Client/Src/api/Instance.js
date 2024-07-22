import axios from 'axios';

const Instance = axios.create({
  baseURL: 'http://192.168.235.164:8000',
  // baseURL: 'https://lazyapp-server.onrender.com/',
});

export {Instance};

// import axios from 'axios';
// const Instance = axios.create({
//   baseURL: 'http://192.168.137.164:8000',
//   timeout: 1000,
//   headers: {'Content-Type': 'application/json'},
// });

// export const getCategories = async () => {
//   try {
//     const response = await Instance.get('/api/user/category');
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getProductsByCategory = async category => {
//   try {
//     const response = await Instance.get(`/api/product/bycategory/${category}`);
//     return response.data;
//   } catch (error) {
//     console.log('Error fetching products by category:', error);
//     throw error;
//   }
// };

// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Instance = axios.create({
//   baseURL: 'http://192.168.235.164:8000',
//   timeout: 1000,
//   headers: {'Content-Type': 'application/json'},
// });

// const getToken = async () => {
//   try {
//     return await AsyncStorage.getItem(
//       'http://localhost:8000/api/user/get-myself ',
//     );
//   } catch (e) {
//     console.log('Failed to fetch the token from storage', e);
//   }
// };



// export default Instance;

// export const getCategories = async () => {
//   try {
//     const response = await Instance.get('/api/user/category');
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getProductsByCategory = async categoryName => {
//   try {
//     const response = await Instance.get(
//       `/api/product/bycategory/${categoryName}`,
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
