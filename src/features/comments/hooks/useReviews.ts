import { useQuery } from '@tanstack/react-query';
import { IReviews } from '../auth.entity';
import { getReviews } from '../auth.service';

export const useReviews = (courseId: string) => {
  const { data, error, isLoading } = useQuery<IReviews[], Error>(
    ['comments'],
    async () => {
      const { data } = await getReviews(courseId);
      return data;
    },
  );
  return {
    comments: data,
    error,
    isLoading,
  };
};
