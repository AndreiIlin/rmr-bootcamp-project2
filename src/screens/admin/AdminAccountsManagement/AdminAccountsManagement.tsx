import { AccountsManagement } from '@features/users/components/admin/AccountsManagement';
import { Box, Typography } from '@mui/material';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

export const AdminAccountsManagement: FC = () => {
  return (
    <>
      <Helmet>
        <title>Управление пользователями {APP_TITLE_WITH_SEPARATOR}</title>
      </Helmet>
      <Typography component={'h1'} variant="h3">
        Управление пользователями
      </Typography>
      <Box sx={{ mt: 3 }}>
        <AccountsManagement />
      </Box>
    </>
  );
};
