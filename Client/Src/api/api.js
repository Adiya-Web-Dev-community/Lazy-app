import {Instance} from './Instance';

export const getCategories = async () => {
  try {
    const response = await Instance.get('/api/user/category');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductsByCategory = async categoryName => {
  try {
    const response = await Instance.get(
      `/api/product/bycategory/${categoryName}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async productId => {
  try {
    const response = await Instance.get(`/api/product/${productId}`);
    console.log('all data', response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (imageUrl, productId) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/api/product/user/product/${productId}`,
      {
        image: imageUrl,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
