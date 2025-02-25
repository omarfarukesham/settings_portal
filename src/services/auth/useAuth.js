import { ENDPOINTS } from '@/configuration/endpoints';
import User from '@/model/User';
import { useMutation, useQuery } from '@tanstack/react-query';
import httpService from '../http/httpService';
import authService from './authService';

const setUser = (data) => {
  const token = data.idToken;
  const user = new User({ ...data.userInfo, appMenu: data.appMenu || [] });

  if (token) {
    authService.setToken(token);
    httpService.setHeaderToken(token);
  }

  return user;
};

export const useLogin = (setContextUser) => {
  return useMutation({
    mutationKey: [ENDPOINTS.authenticate],
    mutationFn: authService.login,
    onSuccess: (response) => {
      setContextUser(setUser(response.data?.data?.content[0]));
    },
  });
};
export const useRegistration = () => {
  return useMutation({
    mutationKey: [ENDPOINTS.registration],
    mutationFn: authService.registration,
    onSuccess: (response) => {
      setUser(response.data?.data?.content[0]);
    },
  });
};
export const useUserInfo = (onSuccess) => {
  return useQuery({
    queryKey: [ENDPOINTS.userInfo],
    queryFn: authService.getUserInfo,
    onSuccess: onSuccess,
    select: (response) => setUser(response.data?.data?.content[0]),
    enabled: false,
    retry: false,
  });
};
export const useCheckUser = () => {
  return useMutation({
    mutationKey: [ENDPOINTS.checkUser],
    mutationFn: authService.checkUser,
  });
};
export const useSendOtp = () => {
  return useMutation({
    mutationKey: [ENDPOINTS.sendOtp],
    mutationFn: authService.sendOtp,
  });
};
export const useVerifyOtp = () => {
  return useMutation({
    mutationKey: [ENDPOINTS.verifyOtp],
    mutationFn: authService.verifyOtp,
  });
};
export const useResetPassword = () => {
  return useMutation({
    mutationKey: [ENDPOINTS.resetPassword],
    mutationFn: authService.resetPassword,
  });
};
