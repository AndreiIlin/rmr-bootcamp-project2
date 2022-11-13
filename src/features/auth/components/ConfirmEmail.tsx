import { useAuthStore } from '@features/auth';
import { confirmEmail } from '@features/auth/auth.service';
import { CircularProgress, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ConfirmEmailProps {
  token: string;
}

export const ConfirmEmail: React.FC<ConfirmEmailProps> = ({ token }) => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    try {
      confirmEmail(token)
        .then((response) => {
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          setAuth(true);
          navigate('/');
        })
        .catch(() => {
          setErrorMessage('Токен просрочен.');
        });
    } catch (e) {
      setErrorMessage('Токен просрочен.');
    }
  }, [token]);

  return (
    <Grid container justifyContent="center">
      {errorMessage ? (
        <Typography variant={'body1'}>{errorMessage}</Typography>
      ) : (
        <CircularProgress size="4rem" />
      )}
    </Grid>
  );
};
