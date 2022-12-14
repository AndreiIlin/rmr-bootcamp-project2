import { Comment } from '@features/comments';
import { CommentBoard } from '@features/comments/components/CommentBoard';
import { CourseDetailsArticle } from '@features/courses/components/CourseDetailsArticle';
import { CourseDetailsAside } from '@features/courses/components/CourseDetailsAside';
import { Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';

export const CourseScreen = () => {
  const { id } = useParams();

  return (
    <section>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} paddingRight={{ lg: '100px' }}>
          <CourseDetailsArticle courseId={id as string} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ pt: 1 }}>
            <CourseDetailsAside courseId={id as string} />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Comment courseId={id as string} />
        </Grid>
        <Grid item xs={12} md={8}>
          <CommentBoard courseId={id as string} />
        </Grid>
      </Grid>
    </section>
  );
};
