import {
  StudyFilterOptions,
  UsersStudyFilter,
} from '@features/courses/components/admin/UsersStudyInfo/UsersStudyFilter';
import { UserStudyTable } from '@features/courses/components/admin/UsersStudyInfo/UserStudyTable';
import {
  fetchUsersStudyInfo,
  UserStudyInfoResponse,
} from '@features/courses/courses.service';
import { useInfiniteCourses } from '@features/courses/hooks/useInfiniteCourses';
import { Alert, AlertTitle, Box, Button, CircularProgress, Link } from '@mui/material';
import { InfiniteData } from '@tanstack/react-query';
import React, { FC, MouseEvent, useState } from 'react';

export const UsersStudyInfo: FC = () => {
  const [options, setOptions] = useState<StudyFilterOptions>({
    courseTitle: '',
    profession: '',
    isFinished: undefined,
    score: '',
    endsAt: '',
  });

  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useInfiniteCourses(1, options, fetchUsersStudyInfo);

  console.log(data, 'students');

  const handleStudyFilterChange = (filterOptions: StudyFilterOptions) => {
    setOptions((prev) => ({ ...prev, ...filterOptions }));
  };

  const clearStudyFilters = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    setOptions({ courseTitle: '', profession: '', score: '', endsAt: '' });
  };

  return (
    <>
      <UsersStudyFilter
        options={options}
        onChange={handleStudyFilterChange}
        clearFilters={clearStudyFilters}
      />
      {isLoading && <CircularProgress sx={{ mt: 3 }} />}
      {isError && (
        <Alert severity="error" sx={{ mt: 3 }}>
          <AlertTitle>Произошла непредвиденная ошибка!</AlertTitle>
          {error?.message}
        </Alert>
      )}
      {data && <UserStudyTable data={data as InfiniteData<UserStudyInfoResponse>} />}
      {hasNextPage && (
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ maxWidth: 300, py: 2 }}
            onClick={() => (isFetchingNextPage ? null : fetchNextPage())}
          >
            {isFetchingNextPage ? 'Загрузка...' : 'Загрузить еще'}
          </Button>
        </Box>
      )}
      {data?.pages && data?.pages[0].content.length === 0 && (
        <Box sx={{ mt: 3 }}>
          <Alert severity="info">
            К сожалению, курсы по заданным фильтрам не найдены.{' '}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
            <Link
              variant="body2"
              color={'inherit'}
              component="button"
              onClick={clearStudyFilters}
            >
              Очистить фильтры
            </Link>
          </Alert>
        </Box>
      )}
    </>
  );
};
