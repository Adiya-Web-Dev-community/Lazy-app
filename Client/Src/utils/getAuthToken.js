import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    console.log('Retrieved token:', token);
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};
