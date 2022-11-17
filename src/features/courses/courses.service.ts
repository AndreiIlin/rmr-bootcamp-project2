import { UserStudyInfo } from '@features/users';
import { requestService } from '@infrastructure/request';
import { PaginatedResult } from '@infrastructure/types';
import { AxiosResponse } from 'axios';
import { CourseFull, CourseStudyInfo } from './cources.entity';

export type CoursesSortBy = 'startsAt' | 'endsAt';

export type CoursesListArgs = {
  page: string;
  search?: string;
  sortBy?: CoursesSortBy;
  directionId?: string;
  isAdvanced?: boolean;
  courseTitle?: string;
  score?: number | string;
  profession?: string;
  endsAt?: string;
  isFinished?: boolean;
};

export type CoursesListResponse = PaginatedResult<CourseFull>;

export const fetchCourses = (
  args: CoursesListArgs,
): Promise<AxiosResponse<CoursesListResponse>> => {
  return requestService.get(`v1/courses`, { params: args });
};

export type CoursesAllResponse = CourseFull[];

export const fetchAllCourses = (): Promise<AxiosResponse<CoursesAllResponse>> => {
  return requestService.get(`v1/courses/all`);
};

export type CourseDetailsResponse = CourseFull;

export type CourseDetailsArgs = {
  id: string;
};

export const fetchCourse = (
  args: CourseDetailsArgs,
): Promise<AxiosResponse<CourseDetailsResponse>> => {
  return requestService.get(`v1/courses/${args.id}`);
};

export type CourseUpdateArgs = CourseCreateArgs & { id: number };
export type CourseUpdateResponse = {
  type: 'success' | 'error';
  message: string;
};

export const updateCourse = (args: CourseUpdateArgs): Promise<CourseUpdateResponse> => {
  return requestService.put(`v1/courses/${args.id}`, args);
};

export type CourseCreateArgs = {
  title: string;
  url: string;
  coverUrl: string;
  description: string;
  startsAt: string;
  endsAt: string;
  isAdvanced: boolean;
  courseId: string;
  providerId: number;
  professionId: number;
  tags: string[];
};

export type CourseCreateResponse = {
  type: 'success' | 'error';
  message: string;
};

export const createCourse = (args: CourseCreateArgs): Promise<CourseCreateResponse> => {
  return requestService.post(`v1/courses`, args);
};

export type signUpForCourseArgs = {
  courseId: number;
  startsAt: string;
};

export const signUpForCourse = ({ courseId, startsAt }: signUpForCourseArgs) =>
  requestService.post<CourseStudyInfo, AxiosResponse<CourseStudyInfo>>(
    `v1/courses/${courseId}/start-study`,
    { startsAt },
  );

export type UserStudyInfoResponse = PaginatedResult<UserStudyInfo>;

export const fetchUsersStudyInfo = (
  args: CoursesListArgs,
): Promise<AxiosResponse<UserStudyInfoResponse>> => {
  return requestService.get(`v1/courses/study-information`, { params: args });
};

export const fetchUsersStudyInfoPDF = (
  args: CoursesListArgs,
): Promise<AxiosResponse<UserStudyInfoResponse>> => {
  return requestService.get(`v1/courses/study-information/export/pdf`, {
    params: args,
    responseType: 'blob',
  });
};

export const writeCourseForStats = (courseId: number): Promise<AxiosResponse<string>> => {
  return requestService.post(`/v1/statistics/course/${courseId}`);
};
