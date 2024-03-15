import { getCSRFToken } from '@components/Headers';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-CSRF-Token': getCSRFToken() || '',
  }
});

export default axiosInstance;
