import { fetchCourses } from '@features/courses/courses.service';
import { UserRecommendedCourses } from '../UserRecommendedCourses';
import { UserRecommendedProfessions } from '../UserRecommendedProfessions';
import { useCurrentUserProfile } from '@features/users/hooks/useCurrentUserProfile';
import { Alert, Box, Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useProfession } from '@features/professions/professions.hooks';
import { useInfiniteCourses } from '@features/courses/hooks/useInfiniteCourses';

export const UserRecommendations = () => {
  const {
    profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useCurrentUserProfile();
  const { isLoading: professionsLoading, error: professionsError } = useProfession(
    profile?.professionId?.toString() as string,
    { enabled: !!profile?.professionId },
  );

  const { isLoading: coursesLoading, error: coursesError } = useInfiniteCourses(
    1,
    {
      professionId: profile?.professionId,
    },
    fetchCourses,
    { enabled: !!profile?.professionId },
  );

  const allDataLoaded = !isProfileLoading && !professionsLoading && !coursesLoading;

  return (
    <>
      {profile && !profile?.professionId && (
        <>
          <Alert severity="info">
            Похоже вы еще не прошли тестирование. Пройдите его, чтобы получить ваши личные
            рекомендации.
          </Alert>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={'/survey'}
            sx={{ mt: 2 }}
          >
            Пройти тест
          </Button>
        </>
      )}

      {!allDataLoaded && profile?.professionId && <CircularProgress />}

      {(profileError || professionsError || coursesError) && (
        <Alert severity="error">
          Ой! Кажется произошла ошибка при загрузке рекомендаций
        </Alert>
      )}
      {allDataLoaded && profile && profile?.professionId && (
        <>
          <Box sx={{ mb: 12 }}>
            <UserRecommendedProfessions professionId={profile.professionId.toString()} />
          </Box>
          <UserRecommendedCourses professionId={profile.professionId} />
        </>
      )}
    </>
  );
};
