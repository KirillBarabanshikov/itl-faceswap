import axios from 'axios';

import { API_URL } from '@/shared/consts';

const baseURL = API_URL + '/api';

export const apiInstance = axios.create({
  baseURL,
});
