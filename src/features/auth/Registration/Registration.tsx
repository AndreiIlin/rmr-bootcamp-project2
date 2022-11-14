import React, { useMemo, useState } from 'react';
import { registration } from '@features/auth/auth.service';
import {
  Alert,
  Button,
  Container,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Snackbar,
  Typography,
} from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledBox } from '@features/auth/components';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const Registration = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [warningMessage, setWarningMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const titleText = useMemo(() => {
    if (location.state?.from === '/survey') {
      return 'Для прохождения теста, пожалуйста, зарегистрируйтесь';
    }
    return 'Регистрация';
  }, [location.state]);

  const registrationSchema = yup.object().shape({
    email: yup
      .string()
      .max(255, 'Слишком много символов.')
      .matches(
        /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/,
        'Вы должны ввести действительную почту.',
      ),
    surname: yup
      .string()
      .required('Вы не ввели фамилию!')
      .max(50, 'Вы превысили максимальное количество символов.')
      .matches(
        /^([А-Я]([а-яё]*[\s-]?[А-Я]?[а-яё]+){0,49}|[A-Z]([a-z]*[\s-]?[A-Z]?[a-z]+){0,49})$/,
        'Проверьте фамилию. Она должна начинаться с большой буквы.',
      ),
    name: yup
      .string()
      .required('Вы не ввели имя!')
      .max(50, 'Вы превысили максимальное количество символов.')
      .matches(
        /^([А-Я]([а-яё]*[\s-]?[А-Я]?[а-яё]+){0,49}|[A-Z]([a-z]*[\s-]?[A-Z]?[a-z]+){0,49})$/,
        'Проверьте имя. Оно должно начинаться с большой буквы.',
      ),
    password: yup
      .string()
      .required('Вы не ввели пароль!')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
        'Пароль должен содержать от 8 до 20 символов, состоять из латинских букв, содержать как минимум 1 прописную и 1 заглавную буквы, 1 цифру.',
      ),
    passwordRepeat: yup
      .string()
      .required('Вы не ввели пароль!')
      .oneOf([yup.ref('password')], 'Пароли не совпадают!'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registrationSchema) });

  const onSubmit = (data: FieldValues) => {
    setWarningMessage('');
    commitRegistration(data);
  };

  const goToLogin = () => {
    navigate('/login', { state: { from: location.state?.from } });
  };

  const commitRegistration = async (user: FieldValues) => {
    try {
      await registration({
        email: user.email,
        password: user.password,
        name: user.name,
        surname: user.surname,
      })
        .then((response) => {
          setEmail(response.data.email);
          setSnackbarVisible(true);
        })
        .catch((error) => {
          if (error.response?.data.code === 'ITD_UEC_2')
            setWarningMessage('Пользователь с таким email уже существует!');
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
      <Typography variant={'h4'} textAlign="center" maxWidth={570}>
        {titleText}
      </Typography>
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
            })}
            placeholder={'Ваша электронная почта'}
          />
          {errors.email && (
            <FormHelperText error sx={{ fontSize: '1rem' }}>
              {errors.email.message?.toString()}
            </FormHelperText>
          )}
        </StyledBox>
        <StyledBox>
          <InputLabel htmlFor={'surname'}>Фамилия</InputLabel>
          <Input
            inputProps={{ number: 50 }}
            {...register('surname', {
              required: true,
            })}
            placeholder={'Ваша фамилия'}
          />
          {errors.surname && (
            <FormHelperText error sx={{ fontSize: '1rem' }}>
              {errors.surname.message?.toString()}
            </FormHelperText>
          )}
        </StyledBox>
        <StyledBox>
          <InputLabel htmlFor={'name'}>Имя</InputLabel>
          <Input
            inputProps={{ number: 50 }}
            {...register('name', {
              required: true,
            })}
            placeholder={'Ваше имя'}
          />
          {errors.name && (
            <FormHelperText error sx={{ fontSize: '1rem' }}>
              {errors.name.message?.toString()}
            </FormHelperText>
          )}
        </StyledBox>
        <StyledBox>
          <InputLabel htmlFor={'password'}>Пароль</InputLabel>
          <Input
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: true,
            })}
            placeholder={'Ваш пароль'}
            title={
              'Пароль должен содержать от 8 до 20 символов, состоять из латинских букв, содержать как минимум 1 прописную и 1 заглавную буквы, 1 цифру.'
            }
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
              {errors.password.message?.toString()}
            </FormHelperText>
          )}
        </StyledBox>
        <StyledBox>
          <InputLabel htmlFor={'passwordRepeat'}>Повторите пароль</InputLabel>
          <Input
            type={showRepeatPassword ? 'text' : 'password'}
            {...register('passwordRepeat', {
              required: true,
            })}
            placeholder={'Ваш пароль'}
            title={
              'Пароль должен содержать от 8 до 20 символов, состоять из латинских букв, содержать как минимум 1 прописную и 1 заглавную буквы, 1 цифру.'
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  edge="end"
                >
                  {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.passwordRepeat && (
            <FormHelperText error sx={{ fontSize: '1rem' }}>
              {errors.passwordRepeat.message?.toString()}
            </FormHelperText>
          )}
        </StyledBox>
        {warningMessage && (
          <FormHelperText error sx={{ fontSize: '1rem' }}>
            {warningMessage}
          </FormHelperText>
        )}
        <Button
          variant={'contained'}
          size={'large'}
          type={'submit'}
          sx={{ mt: 2, width: 320 }}
        >
          Зарегистрироваться
        </Button>
        <Button sx={{ width: 320 }} size={'small'} onClick={() => goToLogin()}>
          {'Уже зарегистрированы?'}
        </Button>
      </Paper>
      <Snackbar
        open={snackbarVisible}
        autoHideDuration={10000}
        onClick={() => setSnackbarVisible(false)}
        onClose={() => setSnackbarVisible(false)}
        sx={{ height: '40%' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          sx={{ width: '200%', border: 1, borderColor: 'primary.main' }}
        >
          {`Вы успешно зарегистрировались. Мы отправили вам письмо на ${email} для
          подтверждения аккаунта.`}
        </Alert>
      </Snackbar>
    </Container>
  );
};
