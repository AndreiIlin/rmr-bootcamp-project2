import { CurrentUserRoles } from '@features/auth';
import { UserProfileFull } from '@features/users';
import { changeUserRole } from '@features/users/users.service';
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Snackbar,
  Typography,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React, { FC } from 'react';

interface UserCardProps {
  user: UserProfileFull;
  refetch: () => void;
}

const roles = {
  ROLE_ADMIN: 'Администратор',
  ROLE_MODERATOR: 'Модератор',
  ROLE_REGULAR: 'Пользователь',
};

export const UserCard: FC<UserCardProps> = ({ user, refetch }) => {
  const isModerator = user.role === CurrentUserRoles.ROLE_MODERATOR;
  const isAdmin = user.role === CurrentUserRoles.ROLE_ADMIN;

  const queryClient = useQueryClient();
  const {
    mutate: changeRole,
    isError,
    isLoading,
    isSuccess,
    reset,
  } = useMutation(async () => await changeUserRole(user.id, !isModerator), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      refetch();
    },
  });

  const handleChangeRole = () => {
    changeRole();
  };

  return (
    <>
      <Card>
        <CardContent>
          <Typography>
            <b>Адрес электронной почты:</b> {user.email}
          </Typography>
          <Typography>
            <b>Статус аккаунта:</b> {user.isConfirmed ? 'Подтверждён' : 'Не подтверждён'}
          </Typography>
          <Typography>
            <b>Статус пользователя:</b> {roles[user.role]}
          </Typography>
          <Typography>
            <b>Зарегистрирован:</b> {dayjs(user.registeredAt).format('DD.MM.YYYY')}
          </Typography>
        </CardContent>
        {!isAdmin && (
          <CardActions sx={{ justifyContent: 'end' }}>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              color={isModerator ? 'error' : 'success'}
              fullWidth
              disabled={isLoading}
              onClick={handleChangeRole}
            >
              {isModerator ? 'Лишить прав модератора' : 'Дать права модератора'}
            </Button>
          </CardActions>
        )}
      </Card>
      <Snackbar
        open={isError || isSuccess}
        onClose={reset}
        autoHideDuration={5000}
        sx={{ height: '20%' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={reset}
          severity={isSuccess ? 'success' : 'error'}
          sx={{ width: '200%', border: 1, borderColor: 'primary.main' }}
        >
          {isSuccess &&
            `Статус пользователя ${user.email} был изменен на "${roles[user.role]}"`}
          {isError && `Пользователь ${user.email} не найден`}
        </Alert>
      </Snackbar>
    </>
  );
};
