import { AxiosResponse } from 'axios';
import { requestService } from '@infrastructure/request';
import { AuthResponse, CurrentUser, RegistrationUser } from '@features/auth/auth.entity';

export const login = async (
  email: string,
  password: string,
): Promise<AxiosResponse<AuthResponse>> => {
  return await requestService.post('/v1/auth/login', { email, password });
};

export const registration = async (
  user: RegistrationUser,
): Promise<AxiosResponse<RegistrationUser>> => {
  return await requestService.post('/v1/auth/signup', {
    ...user,
  });
};

export const confirmEmail = async (
  token: string,
): Promise<AxiosResponse<AuthResponse>> => {
  return await requestService.post(`/v1/auth/signup/${token}`);
};

export const getUserInfo = async (): Promise<AxiosResponse<CurrentUser>> => {
  return await requestService.get('/v1/users/me');
};
