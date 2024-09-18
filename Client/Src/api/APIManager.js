import axios from 'axios';
import {BASE_URL} from './APIConst';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('userToken');
  if (!token) {
    return;
  }
  config.headers.Authorization = token;
  console.log('Config', JSON.stringify(config));
  return config;
});

export const getRequest = async (url, params = {}) => {
  try {
    const response = await apiClient.get(url, {params});
    console.log(
      '-------------------------------------- URL --------------------------------------------------\n',
    );
    console.log(`${BASE_URL + url}\n`);
    console.log(
      '\n------------------------------------- Params ------------------------------------------------\n',
    );
    console.log(`${JSON.stringify(params)}\n`);
    console.log(
      '\n------------------------------------- Response ------------------------------------------------\n',
    );
    console.log(`${JSON.stringify(response.data)}\n`);
    console.log(
      '---------------------------------------------------------------------------------------------\n\n',
    );

    return {data: response.data, status: response?.success};
  } catch (e) {
    console.log(
      '-------------------------------------- URL --------------------------------------------------\n',
    );
    console.log(`${BASE_URL + url}\n`);
    console.log(
      '\n------------------------------------- Params ------------------------------------------------\n',
    );
    console.log(`${JSON.stringify(params)}\n`);
    console.log(
      '\n------------------------------------- Response ------------------------------------------------\n',
    );
    console.log(`${JSON.stringify(response.data)}\n`);
    console.log(
      '---------------------------------------------------------------------------------------------\n\n',
    );
    return {data: e.response, status: false};
  } finally {
  }
};

export const postReques = async (uri, data, params = {}) => {
  try {
    const response = await apiClient.post(uri, (data = {}), {params});
    console.log(
      '-------------------------------------- URL --------------------------------------------------\n',
    );
    console.log(`${BASE_URL + url}\n`);
    console.log(
      '\n------------------------------------- Params ------------------------------------------------\n',
    );
    console.log(`${JSON.stringify(params)}\n`);
    console.log(
      '\n------------------------------------- Data ------------------------------------------------\n',
    );
    console.log(`${JSON.stringify(data)}\n`);
    console.log(
      '\n------------------------------------- Response ------------------------------------------------\n',
    );
    console.log(`${JSON.stringify(response.data)}\n`);
    console.log(
      '---------------------------------------------------------------------------------------------\n\n',
    );
    return {data: response.data, status: response?.success};
  } catch (e) {
    console.log(
      '-------------------------------------- URL --------------------------------------------------\n',
    );
    console.log(`${BASE_URL + url}\n`);
    console.log(
      '\n------------------------------------- Params ------------------------------------------------\n',
    );
    console.log(`${JSON.stringify(params)}\n`);
    console.log(
      '\n------------------------------------- Response ------------------------------------------------\n',
    );
    console.log(`${JSON.stringify(response.data)}\n`);
    console.log(
      '---------------------------------------------------------------------------------------------\n\n',
    );
    return {data: e.response, status: false};
  } finally {
  }
};
