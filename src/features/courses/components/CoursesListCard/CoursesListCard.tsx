import { CourseFull } from '@features/courses/cources.entity';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

type CoursesListCardProps = CourseFull;

export const CoursesListCard = ({
  id,
  title,
  coverUrl,
  providerName,
  startsAt,
  endsAt,
}: CoursesListCardProps) => {
  const formattedDateStart = dayjs(startsAt).format('DD.MM.YYYY');
  const formattedDateEnd = dayjs(endsAt).format('DD.MM.YYYY');
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardActionArea component={Link} to={`/courses/${id}`}>
        <CardMedia
          component={'img'}
          image={coverUrl}
          alt={title}
          width={672}
          height={320}
          sx={{ maxHeight: 160 }}
        />
      </CardActionArea>
      <CardContent sx={{ p: { md: 3 } }}>
        <Typography component="p" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {providerName}
        </Typography>
        <Box sx={{ mb: 1 }} typography={'body2'}>
          {formattedDateStart} – {formattedDateEnd}
        </Box>
        <Typography
          variant="h5"
          component="h3"
          sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {title}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: { md: 2 }, mt: 'auto' }}>
        <Button variant="outlined" component={Link} to={`/courses/${id}`} fullWidth>
          Открыть курс
        </Button>
      </CardActions>
    </Card>
  );
};
