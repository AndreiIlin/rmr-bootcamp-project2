import { StudyFilterOptions } from '@features/courses/components/admin/UsersStudyInfo/UsersStudyFilter';
import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { FilterOptions } from '../components/CoursesFilter';
import {
  CoursesListArgs,
  CoursesListResponse,
  UserStudyInfoResponse,
} from '../courses.service';

export const useInfiniteCourses = (
  page: number,
  opts: FilterOptions | StudyFilterOptions,
  queryFn: (
    args: CoursesListArgs,
  ) => Promise<AxiosResponse<CoursesListResponse | UserStudyInfoResponse>>,
  queryOpts?: Omit<
    UseInfiniteQueryOptions<
      any,
      Error,
      CoursesListResponse | UserStudyInfoResponse,
      any,
      any
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  const {
    data,
    error,
    isLoading,
    isFetching,
    isRefetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useInfiniteQuery<CoursesListResponse | UserStudyInfoResponse, Error>(
    ['courses', page, opts],
    async ({ pageParam = 1 }) => {
      const { data } = await queryFn({ page: pageParam, ...opts });
      return data;
    },
    {
      ...queryOpts,
      getNextPageParam: (data) =>
        data.content.length === 0 || data.pageNumber >= data.totalPages
          ? undefined
          : data.pageNumber + 1,
    },
  );

  return {
    data,
    error,
    isLoading,
    isFetching,
    isRefetching,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
};
