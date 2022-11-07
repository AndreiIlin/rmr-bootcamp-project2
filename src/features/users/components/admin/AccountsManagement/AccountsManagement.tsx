import { UserCard } from '@features/users/components/admin/UserCard';
import { fetchUserProfileByEmail } from '@features/users/users.service';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormHelperText,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

export const AccountsManagement: FC = () => {
  const {
    handleSubmit,
    control,
    getValues,
    register,
    formState: { errors },
  } = useForm();

  const rules = {
    pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
  };

  const {
    data: profile,
    isError,
    refetch,
    isInitialLoading,
    remove,
  } = useQuery(
    ['currentUserProfile'],
    async () => {
      const { data } = await fetchUserProfileByEmail(getValues('email'));
      return data;
    },
    {
      enabled: false,
      retry: false,
    },
  );

  const onSubmit = async () => {
    await refetch();
  };

  useEffect(() => {
    return () => remove();
  }, []);

  return (
    <>
      <Container
        maxWidth={false}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ px: '0 !important' }}
      >
        <Controller
          name="email"
          control={control}
          render={({ fieldState: { isDirty, invalid } }) => (
            <TextField
              variant="outlined"
              label="Поиск по электронной почте"
              placeholder="Электронная почта"
              {...register('email', rules)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant={'outlined'}
                      type="submit"
                      disabled={!isDirty || invalid || isInitialLoading}
                    >
                      Найти
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        {(errors.email || isError) && (
          <FormHelperText error sx={{ fontSize: '1rem' }}>
            {errors.email
              ? 'Не валидный формат электронной почты'
              : 'Пользователь с данным адресом электронной почты не найден'}
          </FormHelperText>
        )}
      </Container>
      <Box sx={{ marginTop: 5 }}>
        {isInitialLoading && <CircularProgress />}
        {profile && <UserCard user={profile} refetch={refetch} />}
      </Box>
    </>
  );
};
