import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { FilterOptions } from '../components/CoursesFilter';
import { fetchCourses } from '../courses.service';

export const useInfiniteCourses = (page: number, opts: FilterOptions) => {
  const {
    data,
    error,
    isLoading,
    isFetching,
    isRefetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['courses', page, opts],
    async ({ pageParam = 1 }) => {
      const { data } = await fetchCourses({ page: pageParam, ...opts });
      return data;
    },
    {
      getNextPageParam: (data) =>
        data.pageNumber >= data.totalPages ? undefined : data.pageNumber + 1,
    },
  );

  return {
    data,
    error,
    isLoading,
    isFetching,
    isRefetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
};
