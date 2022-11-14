import { CurrentUserRoles, useCurrentUser } from '@features/auth';
import { signUpForCourse } from '@features/courses/courses.service';
import { useCourse } from '@features/courses/hooks/useCourse';
import { getStudyInfo } from '@features/users/users.service';
import {
  Alert,
  Box,
  Button,
  Card,
  Snackbar,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface CourseDetailsAsideProps {
  courseId: string;
}

const ImgWrapper = styled('div')(() => ({
  width: '100%',
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
}));

const CourseProviderCoverImg = styled('img')(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  position: 'absolute',
}));

export const CourseDetailsAside = ({ courseId }: CourseDetailsAsideProps) => {
  const { course } = useCourse(courseId);
  const queryClient = useQueryClient();

  const { data: currentUser } = useCurrentUser();

  const isUser = currentUser?.role === CurrentUserRoles.ROLE_REGULAR;

  const [isSnackbarOpened, setIsSnackbarOpened] = useState(false);

  const handleCloseSnackbar = () => {
    setIsSnackbarOpened(false);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: signUpForCourse,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['userStudy'] });
      setIsSnackbarOpened(true);
    },
  });

  const { data: userCourses } = useQuery({
    queryKey: ['userStudy'],
    enabled: isUser,
    queryFn: async () => {
      const { data } = await getStudyInfo();
      return data;
    },
  });

  const handleCourseSignUp = () => {
    const currentTime = new Date().toISOString();
    mutate({
      courseId: Number(courseId),
      startsAt: currentTime,
    });
  };

  const isUserSignedUp = !!userCourses?.find(
    (userCourse) => userCourse.courseStudyInfoDto.courseId === course?.id,
  );

  return (
    <aside>
      <>
        {course && (
          <>
            {isUser && (
              <Button
                variant="contained"
                size="large"
                sx={{ mb: 3 }}
                disabled={isLoading || isUserSignedUp}
                onClick={handleCourseSignUp}
              >
                {isUserSignedUp ? 'Вы записаны на курс' : 'Записаться на курс'}
              </Button>
            )}
            <Stack spacing={8} direction="column">
              <Box>
                <Typography component={'h5'} variant="h6" marginBottom={2}>
                  Создатель курса
                </Typography>
                <Card sx={{ p: 3 }}>
                  <ImgWrapper>
                    <CourseProviderCoverImg
                      alt={course.providerName}
                      src={course.providerCoverUrl}
                    />
                  </ImgWrapper>
                </Card>
              </Box>
              <Box>
                <Typography component={'h5'} variant="h6" sx={{ mb: 2 }}>
                  Ссылка на курс
                </Typography>
                <Button variant="outlined" size="large" component={'a'} href={course.url}>
                  Открыть курс
                </Button>
              </Box>
              <Box>
                <Typography
                  component={'h5'}
                  variant="h6"
                  marginBottom={2}
                  sx={{ maxWidth: { md: 270, lineHeight: 1.4 } }}
                >
                  Информация по бесплатному обучению
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/pages/finance"
                  sx={{ textAlign: 'center', py: 2 }}
                  fullWidth
                >
                  Как пройти курсы бесплатно
                </Button>
              </Box>
            </Stack>
          </>
        )}
      </>
      <Snackbar
        open={isSnackbarOpened}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Вы успешно записались на курс!
        </Alert>
      </Snackbar>
    </aside>
  );
};
