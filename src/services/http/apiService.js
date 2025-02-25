import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SETTING_BASE_API,
});

export async function request(method, url, data = null) {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance[method](url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
