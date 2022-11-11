import { useAuthStore } from '@features/auth/auth.hooks';
import { Box, Button, Grid, Rating, TextField, Typography } from '@mui/material';
import { TypographyContainer } from '@ui-library/components/TypographyContainer';
import { FC, PropsWithChildren, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styles from './style.module.scss';

type FormValues = {
  text: string;
  rating: number | null;
};

export const Comments: FC<PropsWithChildren> = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormValues>({});

  const [rating, setRating] = useState<number | null>(null);
  const [text, setText] = useState('');

  const isLogged = useAuthStore((store) => store.isAuth);

  console.log(isLogged);

  function onSubmit(data: FormValues) {
    console.log(data);
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
              onChange={(i) => {
                const newValue = i.target.value;
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
          visibility={errors?.rating ? 'visible' : 'hidden'}
        >
          Необходимо выставить оценку.
        </Typography>
        <Button variant={'contained'} size={'large'} type={'submit'}>
          Оставить комментарий
        </Button>
      </form>
    </Grid>
  );
};
