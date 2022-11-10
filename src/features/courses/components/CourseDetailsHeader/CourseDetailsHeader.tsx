import { Box, Grid, Rating, Typography } from '@mui/material';
import dayjs from 'dayjs';

interface CourseDetailsHeaderProps {
  title: string;
  isForAdvancedStudents: boolean;
  profession: string;
  dateStart: string;
  dateEnd: string;
  averageRating: number;
}

export const CourseDetailsHeader = ({
  title,
  isForAdvancedStudents,
  profession,
  dateStart,
  dateEnd,
  averageRating,
}: CourseDetailsHeaderProps) => {
  const formattedDateStart = dayjs(dateStart).format('DD.MM.YYYY');
  const formattedDateEnd = dayjs(dateEnd).format('DD.MM.YYYY');
  return (
    <header>
      <Typography component={'h1'} variant="h3">
        {title}
      </Typography>
      <Grid container spacing={2} marginTop={1}>
        <Grid item xs={12} sm={6} lg={4}>
          <Typography component={'h5'} variant="h6">
            Дата проведения:
          </Typography>
          <Typography component={'p'} variant="subtitle1">
            {formattedDateStart} - {formattedDateEnd}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Typography component={'h5'} variant="h6">
            Сложность:
          </Typography>
          <Typography component={'p'} variant="subtitle1">
            {isForAdvancedStudents ? 'Для опытных' : 'Для новичков'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Typography component={'h5'} variant="h6">
            Профессия:
          </Typography>
          <Typography component={'p'} variant="subtitle1">
            {profession}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={2}>
          <Typography component={'h5'} variant="h6">
            Рейтинг:
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'end' }}>
            <Typography sx={{ mr: 1, lineHeight: 1.2 }}>
              {averageRating.toFixed(1)}
            </Typography>
            <Rating name="card-raiting" value={averageRating} precision={0.1} readOnly />
          </Box>
        </Grid>
      </Grid>
    </header>
  );
};
