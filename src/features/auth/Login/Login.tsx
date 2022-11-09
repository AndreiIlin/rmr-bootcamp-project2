import React, { useState } from 'react';
import { login } from '@features/auth/auth.service';
import { useAuthStore } from '@features/auth/auth.hooks';
import {
  Button,
  Container,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Typography,
} from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { StyledBox } from '../components';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const Login = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  const navigate = useNavigate();
  const location = useLocation();

  const [warningMessage, setWarningMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    auth(data.email, data.password);
  };
  const goToRegistration = () => {
    navigate('/registration', { state: { from: location.state?.from } });
  };

  const auth = async (email: string, password: string) => {
    try {
      await login(email, password)
        .then((response) => {
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          setWarningMessage('');
          setAuth(true);
          location.state?.from ? navigate(location.state.from) : navigate('/');
        })
        .catch((error) => {
          if (error.response.data.code === 'ITD_AEC_1')
            setWarningMessage('Логин и пароль не совпадают!');
          else if (error.response.data.code === 'ITD_UEC_1')
            setWarningMessage('Такого пользователя не существует!');
          else if (error.response.data.code === 'ITD_AEC_3')
            setWarningMessage('Вы не подтвердили почту. Зайдите в свой почтовый ящик!');
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container
      maxWidth={'sm'}
      component={'form'}
      onSubmit={handleSubmit((data) => onSubmit(data))}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignItems: 'center',
      }}
    >
      <Typography variant={'h4'}>Войти в систему</Typography>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
          padding: '1.5rem',
          width: '100%',
        }}
        elevation={1}
      >
        <StyledBox>
          <InputLabel htmlFor={'email'}>Email</InputLabel>
          <Input
            {...register('email', {
              required: true,
              pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
            })}
            placeholder={'Ваша электронная почта'}
          />
          {errors.email && (
            <FormHelperText error sx={{ fontSize: '1rem' }}>
              Проверьте почту
            </FormHelperText>
          )}
        </StyledBox>
        <StyledBox>
          <InputLabel
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            htmlFor={'password'}
          >
            Пароль
            {/*TODO: Добавить смену пароля*/}
            {/*<Link component={'button'}>{'Забыли пароль?'}</Link>{' '}*/}
          </InputLabel>
          <Input
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: true,
              pattern: /^.{8,20}$/,
            })}
            placeholder={'Ваш пароль'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.password && (
            <FormHelperText error sx={{ fontSize: '1rem' }}>
              Проверьте пароль
            </FormHelperText>
          )}
        </StyledBox>
        {warningMessage && (
          <FormHelperText error sx={{ fontSize: '1rem' }}>
            {warningMessage}
          </FormHelperText>
        )}
        <Button sx={{ mt: 2 }} variant={'contained'} size={'large'} type={'submit'}>
          Войти
        </Button>
        <Button onClick={() => goToRegistration()}>{'Зарегистрироваться'}</Button>
      </Paper>
    </Container>
  );
};
