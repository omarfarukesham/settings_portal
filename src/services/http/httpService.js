import { PORTAL_NAME, USER_SERVICE_BASE_URL } from '@/configuration/config';
import ErrorResponse from '@/model/ErrorResponse';
import objectToFormData from '@/utilities/objectToFormData';
import axios from 'axios';

const instance = axios.create({
  baseURL: USER_SERVICE_BASE_URL,
  headers: {
    'Portal-Name': PORTAL_NAME,
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(new ErrorResponse(error.response.data)),
);

instance.interceptors.request.use((config) => {
  if (
    config.data instanceof Object &&
    config.headers['Content-Type'] === 'multipart/form-data'
  ) {
    config.data = objectToFormData(config.data);
  }
  return config;
});

function setHeaderToken(token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
function removeHeaderToken() {
  delete instance.defaults.headers.common['Authorization'];
}

const httpService = {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  patch: instance.patch,
  delete: instance.delete,
  setHeaderToken,
  removeHeaderToken,
};

export default httpService;
