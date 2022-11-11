import { UserCoursesTable } from '@features/users/components/UserCourses/UserCoursesTable';
import { getStudyInfo } from '@features/users/users.service';
import { Alert, CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';

export const UserCourses: FC = () => {
  const {
    data: userCourses,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['userStudy'],
    queryFn: async () => {
      const { data } = await getStudyInfo();
      return data;
    },
  });

  return (
    <>
      <Typography variant="h3" component={'h1'} marginBottom={3}>
        Мои курсы
      </Typography>
      {isLoading && <CircularProgress />}
      {isError && (
        <Alert severity="error">
          Ошибка соединения с сервером, пожалуйста, попробуйте позже
        </Alert>
      )}
      {isSuccess && !userCourses?.length && (
        <Typography>Вы еще не записались ни на один курс</Typography>
      )}
      {isSuccess && userCourses?.length && <UserCoursesTable userCourses={userCourses} />}
    </>
  );
};
