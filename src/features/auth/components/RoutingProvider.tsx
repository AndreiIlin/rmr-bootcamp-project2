import { useAuthStore, useCurrentUser } from '@features/auth/auth.hooks';
import { CurrentUserRoles } from '@features/auth';
import React, { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

interface ProtectedRouteProps {
  restriction?: string;
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  restriction,
  children,
}) => {
  const currentUser = useCurrentUser();
  const { isAuth } = useAuthStore();

  const isAdmin = currentUser.data?.role === CurrentUserRoles.ROLE_ADMIN;
  const isUser = currentUser.data?.role === CurrentUserRoles.ROLE_REGULAR;

  const location = useLocation();

  return (
    <>
      {currentUser.isInitialLoading && (
        <Box sx={{ position: 'absolute', left: '50%', top: '40%' }}>
          <CircularProgress size="8rem" />
        </Box>
      )}
      {!isAuth && <Navigate to={'/login'} replace state={{ from: location }} />}
      {restriction === 'adminOnly' && !isAdmin && <Navigate to={'/404'} replace />}
      {restriction === 'notForUsers' && isUser && <Navigate to={'/404'} replace />}
      {children}
    </>
  );
};
