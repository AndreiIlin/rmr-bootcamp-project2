import { UsersStudyInfo } from '@features/courses/components/admin/UsersStudyInfo';
import { Typography } from '@mui/material';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

export const AdminUsersStudyInfo: FC = () => {
  return (
    <>
      <Helmet>
        <title>Информация об обучении пользователей {APP_TITLE_WITH_SEPARATOR}</title>
      </Helmet>
      <Typography component={'h1'} variant="h3">
        Информация об обучении пользователей
      </Typography>
      <UsersStudyInfo />
    </>
  );
};
