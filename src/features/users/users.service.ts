import { requestService } from '@infrastructure/request';
import { AxiosResponse } from 'axios';
import { UserInfoFull, UserProfileFull } from './users.entity';

export type GetUserInfoResponse = UserInfoFull;

export const fetchCurrentUser = async (): Promise<AxiosResponse<GetUserInfoResponse>> => {
  return requestService.get(`v1/users/me`);
};

export type GetCurrentUserProfileResponse = UserProfileFull;

export const fetchCurrentUserProfile = async (): Promise<
  AxiosResponse<GetCurrentUserProfileResponse>
> => {
  return requestService.get(`v1/profiles/my`);
};

export const changeCurrentUserProfile = async (
  userProfile: UserProfileFull,
): Promise<AxiosResponse<GetCurrentUserProfileResponse>> => {
  return requestService.post(`v1/profiles/my`, userProfile);
};

export const fetchUserProfileByEmail = async (email: string) =>
  requestService.get<UserProfileFull>('v1/users/find', { params: { email } });

export const changeUserRole = async (id: number, isModerator: boolean) =>
  requestService.put<UserProfileFull>(`v1/users/${id}`, {}, { params: { isModerator } });
