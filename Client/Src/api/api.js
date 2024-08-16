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
    const response = await Instance.put(`/api/product/image/${productId}`, {
      image: imageUrl,
    });
    console.log('Upload successful:', response);
    return response.data;
  } catch (error) {
    console.error(
      'Error uploading image:',
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};

export const getPost = async () => {
  try {
    const response = await Instance.get('/api/blog/all/category');
    console.log('Fetched posts:', response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getBlogByCategory = async categoryName => {
  try {
    const response = await Instance.get(
      `/api/blog/blogby_category/${categoryName}`,
    );
    console.log('getBlogByCategory', response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const SubmitReview = async review => {
  try {
    const response = await Instance.post('/api/blog/review', review);
    console.log('Review', response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReview = async blogid => {
  try {
    const response = await Instance.get(`/api/blog/review/${blogid}`);
    console.log('getreview..........', response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFlashDeals = async () => {
  try {
    const response = await Instance.get('/api/product/flash/prod');
    console.log('Flash Deals:', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRecommended = async () => {
  try {
    const response = await Instance.get('/api/product/recomended/prod');
    console.log('Recommended Deals:', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const getPost = async () => {
//   try {
//     const response = await Instance.get('/api/blog/all/category');
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
