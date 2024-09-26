import {Instance} from './Instance';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const userlogin = async (email, password) => {
  try {
    const response = await Instance.post('/api/user/login', {email, password});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userSingup = async (name, email, password) => {
  try {
    const response = await Instance.post('/api/user/register', {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

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
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const SubmitReview = async review => {
  try {
    const response = await Instance.post('/api/blog/review', review);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReview = async blogid => {
  try {
    const response = await Instance.get(`/api/blog/review/${blogid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFlashDeals = async () => {
  try {
    const response = await Instance.get('/api/product/flash/prod');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRecommended = async () => {
  try {
    const response = await Instance.get('/api/product/recomended/prod');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CreateUserPost = async (content, image_url, user_id, category) => {
  try {
    const response = await Instance.post('/api/post', {
      content,
      image_url,
      user_id,
      category,
    });

    return response.data;
  } catch (error) {
    console.error('Error creating post:', {
      message: error.message,
      response: error.response ? error.response.data : 'No response data',
      config: error.config,
    });
    throw error;
  }
};

export const getUserPost = async () => {
  try {
    const response = await Instance.get('/api/post/bycategory/all');
    console.log('Get All Post Data', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch posts', error);
    throw error;
  }
};

export const getRegisterdetails = async () => {
  try {
    const response = await Instance.get('/api/user/get-myself');
    return response.data;
  } catch (error) {
    console.error(
      'Failed to fetch user data',
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};
export const likePost = async postId => {
  try {
    const response = await Instance.put(`/api/post/${postId}/like`);
    return response.data;
  } catch (error) {
    console.error('Failed to like post', error);
    throw error;
  }
};
export const AllPostCategory = async () => {
  try {
    const response = await Instance.get('/api/admin/post/category');
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const DeletePost = async postId => {
  try {
    const response = await Instance.delete(`/api/post/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const PostComment = async (postId, commentText) => {
  try {
    const response = await Instance.post(`/api/post/${postId}/comment`, {
      comment: commentText,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const savePost = async postId => {
  try {
    const response = await Instance.put(`/api/post/${postId}/save`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getSavedPosts = async () => {
  try {
    const response = await Instance.get('/api/post/saved');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendEmailVerification = async email => {
  try {
    const response = await Instance.post('/api/user/forgetpassword', {email});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtpAndResetPassword = async (email, otp, newPassword) => {
  try {
    const response = await Instance.post('/api/user/forgot/verifyotp', {
      email,
      otp,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('API call failed:', error.response || error.message || error);
    throw error;
  }
};
export const updateProfile = async username => {
  try {
    const response = await Instance.put('/api/user/update-profile', {
      name: username,
    });
    return response.data;
  } catch (error) {
    console.error('API call failed:', error.response || error.message || error);
    throw error;
  }
};
export const createClaim = async claimData => {
  try {
    const response = await Instance.post('/api/claim', claimData);
    return response.data;
  } catch (error) {
    console.error('API call failed:', error.response || error.message || error);
    throw error;
  }
};

export const GetClaimUser = async () => {
  try {
    const response = await Instance.get('/api/claim/get/user');
    console.log('ClaimData', response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
