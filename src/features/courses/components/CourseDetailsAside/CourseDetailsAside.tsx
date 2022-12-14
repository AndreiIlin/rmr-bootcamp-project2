import { CurrentUserRoles, useCurrentUser } from '@features/auth';
import { signUpForCourse, writeCourseForStats } from '@features/courses/courses.service';
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

  const handleOpenCourse = async () => {
    if (course) {
      await writeCourseForStats(course.id);
    }
  };

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
                {isUserSignedUp ? '???? ???????????????? ???? ????????' : '???????????????????? ???? ????????'}
              </Button>
            )}
            <Stack spacing={8} direction="column">
              <Box>
                <Typography component={'h5'} variant="h6" marginBottom={2}>
                  ?????????????????? ??????????
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
                  ???????????? ???? ????????
                </Typography>
                <Button
                  variant="outlined"
                  size="large"
                  component={'a'}
                  target="_blank"
                  href={course.url}
                  onClick={handleOpenCourse}
                >
                  ?????????????? ????????
                </Button>
              </Box>
              <Box>
                <Typography
                  component={'h5'}
                  variant="h6"
                  marginBottom={2}
                  sx={{ maxWidth: { md: 270, lineHeight: 1.4 } }}
                >
                  ???????????????????? ???? ?????????????????????? ????????????????
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/pages/finance"
                  sx={{ textAlign: 'center', py: 2 }}
                  fullWidth
                >
                  ?????? ???????????? ?????????? ??????????????????
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
          ???? ?????????????? ???????????????????? ???? ????????!
        </Alert>
      </Snackbar>
    </aside>
  );
};
