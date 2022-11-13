import React from 'react';
import { Professions } from '@features/professions';
import { Helmet } from 'react-helmet';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';

export const ProfessionsScreen = () => {
  return (
    <>
      <Helmet>
        <title>Профессии {APP_TITLE_WITH_SEPARATOR}</title>
      </Helmet>
      <Professions />
    </>
  );
};
