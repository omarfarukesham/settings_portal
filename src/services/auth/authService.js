import { TOKEN_KEY } from '@/configuration/config';
import { ENDPOINTS } from '@/configuration/endpoints';
import httpService from '../http/httpService';

class AuthService {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }
  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    httpService.removeHeaderToken();
  }
  login({ username, password }) {
    return httpService.post(ENDPOINTS.authenticate, { username, password });
  }
  getUserInfo = () => {
    const token = this.getToken();
    httpService.setHeaderToken(token);
    return httpService.get(ENDPOINTS.userInfo);
  };
  registration(data) {
    return httpService.post(ENDPOINTS.registration, data);
  }
  checkUser(data) {
    return httpService
      .post(ENDPOINTS.checkUser, data)
      .then((response) => response?.data?.data?.content[0]);
  }
  sendOtp(data) {
    return httpService.post(ENDPOINTS.sendOtp, data);
  }
  verifyOtp(data) {
    return httpService.post(ENDPOINTS.verifyOtp, data);
  }
  resetPassword(data) {
    return httpService.post(ENDPOINTS.resetPassword, data);
  }
}

const authService = new AuthService();

export default authService;
