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

export const UploadImage = async (productId, imageUrl) => {
  try {
    const response = await Instance.put(
      `/api/product/user/product/${productId}`,
      {
        image: imageUrl,
      },
    );
    console.log('All Data image', response);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getPost = async () => {
  try {
    const response = await Instance.get('/api/blog/all/category');
    return response.data;
  } catch (error) {
    throw error;
  }
};