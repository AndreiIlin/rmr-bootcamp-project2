import { CoursesFilter } from '@features/courses/components/CoursesFilter';
import { CoursesView } from '@features/courses/components/CoursesView';
import { Box, Typography } from '@mui/material';

export const CoursesScreen = () => {
  return (
    <section>
      <Typography variant="h3" component={'h1'}>
        Курсы
      </Typography>
      <Typography variant="subtitle1" component={'h2'} sx={{ mt: 1, mb: 1 }}>
        Лучшие курсы от лидеров рынка
      </Typography>
      <Box sx={{ mt: 3 }}>
        <CoursesView />
      </Box>
    </section>
  );
};