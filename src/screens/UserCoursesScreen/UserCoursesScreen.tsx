import { UserCourses } from '@features/users/components/UserCourses';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

export const UserCoursesScreen: FC = () => {
  return (
    <>
      <Helmet>
        <title>Моё обучение {APP_TITLE_WITH_SEPARATOR}</title>
      </Helmet>
      <UserCourses />
    </>
  );
};
