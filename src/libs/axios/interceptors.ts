import { auth } from '@libs/firebase-sdk/firebase-sdk';
import { parseModel } from '@utils/model-parser';
import axios from 'axios';

axios.interceptors.request.use(
  async (config) => {
    if (auth.currentUser) {
      const idToken = await auth.currentUser.getIdToken();
      config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  async (response) => {
    response.data = await parseModel(response.data);
    return response;
  },
  (error) => Promise.reject(error)
);
