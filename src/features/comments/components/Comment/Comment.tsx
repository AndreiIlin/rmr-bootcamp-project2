import { useAuthStore } from '@features/auth/auth.hooks';
import { postReviews } from '@features/comments/auth.service';
import { Button, Grid, Rating, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styles from './style.module.scss';

type FormValues = {
  text: string;
  rating: number | null;
};

interface CommentsProps {
  courseId: string;
}

export const Comment = ({ courseId }: CommentsProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormValues>({});

  const isLogged = useAuthStore((store) => store.isAuth);

  const [responseError, setResponseError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function onSubmit(data: FormValues) {
    console.log(data);
    if (data.rating) {
      postReviews(data.rating, data.text, courseId)
        .then((response) => {
          console.log(response);
          setSuccess(true);
        })
        .catch((error) => {
          if (error.response.data.code === 'ITD_REC_1') {
            setResponseError('Вы уже оставляли оценку.');
          } else {
            setResponseError('Что-то пошло не так, попробуйте еще раз позже.');
          }
        });
    }
  }

  return (
    <Grid paddingRight={{ lg: '100px' }}>
      <Typography component={'h3'} variant="h4" sx={{ mb: 3 }}>
        Отзывы
      </Typography>
      <form className={styles.box} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="rating"
          control={control}
          rules={{ required: true }}
          render={() => (
            <Rating
              onChange={(event: React.SyntheticEvent, newValue: number | null) => {
                const value = getValues('rating');
                if (value === newValue) {
                  setValue('rating', null);
                } else {
                  setValue('rating', newValue);
                }
              }}
              className={styles.rating}
            />
          )}
        />
        <TextField
          className={styles.textInput}
          id="outlined-multiline-static"
          label="Комментарий"
          multiline
          rows={6}
          defaultValue=""
          {...register('text', {})}
        />
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          color="red"
          style={{ display: errors?.rating ? 'block' : 'none' }}
        >
          Необходимо выставить оценку.
        </Typography>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          color="darkgreen"
          style={{ display: success ? 'block' : 'none' }}
        >
          Спасибо за оценку!
        </Typography>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          color="red"
          style={{ display: responseError ? 'block' : 'none' }}
        >
          {responseError}
        </Typography>
        <Button
          variant={'contained'}
          size={'large'}
          type={'submit'}
          disabled={!isLogged}
          onClick={() => {
            setResponseError(null);
            setSuccess(false);
          }}
        >
          Оставить отзыв
        </Button>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          style={{ display: !isLogged ? 'block' : 'none' }}
        >
          Чтобы оставить комментарий необходимо авторизироваться.
        </Typography>
      </form>
    </Grid>
  );
};
