import { AxiosResponse } from 'axios';
import { requestService } from '@infrastructure/request';
import { IReviews } from './auth.entity';

export const postReviews = async (
  rating: number,
  textReview: string,
  courseId: string,
): Promise<AxiosResponse<any>> => {
  return await requestService.post(`/v1/courses/${courseId}/reviews`, {
    rating,
    textReview,
  });
};

export const getReviews = async (
  courseId: string,
): Promise<AxiosResponse<IReviews[]>> => {
  return await requestService.get(`/v1/courses/${courseId}/reviews`);
};
