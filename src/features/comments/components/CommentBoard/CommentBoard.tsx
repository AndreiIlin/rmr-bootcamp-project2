import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { IReviews } from '@features/comments/auth.entity';
import { useReviews } from '@features/comments/hooks/useReviews';
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import styles from './style.module.scss';
import dayjs from 'dayjs';

interface CommentsProps {
  courseId: string;
}

export const CommentBoard = ({ courseId }: CommentsProps) => {
  const { comments, isLoading, error } = useReviews(courseId);

  function buildComment(data: IReviews[]) {
    return data.map((item) => {
      return (
        <Card
          key={`comment${item.id}`}
          sx={{ minWidth: 275 }}
          className={styles.commentBox}
        >
          <CardContent>
            <Typography gutterBottom variant="h6" className={styles.commentTitle}>
              {item.userInfoName} {item.userInfoSurname}{' '}
              <Rating value={item.rating} readOnly />
            </Typography>

            <Typography
              variant="caption"
              display="block"
              gutterBottom
              className={styles.commentDate}
            >
              {dayjs(item.created).format('DD.MM.YYYY')}
            </Typography>

            <Typography variant="body2" gutterBottom>
              {item.textReview}
            </Typography>
          </CardContent>
        </Card>
      );
    });
  }

  return (
    <article>
      <>
        {isLoading && (
          <Box sx={{ mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Box sx={{ mt: 3 }}>
            <Alert severity="error">
              Ой! Кажется произошла ошибка. Попробуйте перезагрузить страницу.
            </Alert>
          </Box>
        )}
        {comments && <Grid paddingRight={{ lg: '100px' }}>{buildComment(comments)}</Grid>}
        {error && (
          <Box sx={{ mt: 3 }}>
            <Alert severity="error">
              Ой! Кажется произошла ошибка. Попробуйте перезагрузить страницу.
            </Alert>
          </Box>
        )}
      </>
    </article>
  );
};
