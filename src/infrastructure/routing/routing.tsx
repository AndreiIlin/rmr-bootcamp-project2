import { MainLayout } from '@features/layout';
import { AdminLayout } from '@features/layout/components/AdminLayout';
import { UserLayout } from '@features/layout/components/UserLayout';
import { SurveyGuard } from '@features/survey/components/SurveyGuard';
import { AdminProviderEditScreen } from '@screens/admin/AdminProviderEditScreen';
import { AdminProviderNewScreen } from '@screens/admin/AdminProviderNewScreen';
import { AdminProvidersScreen } from '@screens/admin/AdminProvidersScreen';
import { AdminCoursesEditScreen } from '@screens/admin/AdminCoursesEditScreen';
import { AdminCoursesNewScreen } from '@screens/admin/AdminCoursesNewScreen';
import { AdminCoursesScreen } from '@screens/admin/AdminCoursesScreen';
import { CourseScreen } from '@screens/CourseScreen';
import { CoursesScreen } from '@screens/CoursesScreen';
import { PageScreen } from '@screens/PageScreen';
import { SurveyFinishScreen } from '@screens/SurveyFinishScreen';
import { SurveyScreen } from '@screens/SurveyScreen';
import { SurveyStepScreen } from '@screens/SurveyStepScreen';
import { UserAccountScreen } from '@screens/UserAccountScreen';
import { UserRecommendationsScreen } from '@screens/UserRecommendationsScreen';
import { Route, Routes } from 'react-router-dom';
import { CurrentUserRoles, ProtectedRoute } from '@features/auth';
import {
  MainScreen,
  LoginScreen,
  RegistrationScreen,
  ProfessionsScreen,
} from '@screens/index';
import { ProfessionScreen } from '@screens/ProfessionScreen';
import { AdminProfessionsEditScreen } from '@screens/admin/AdminProfessionsEditScreen';
import { AdminProfessionsScreen } from '@screens/admin/AdminProfessionsScreen';
import { AdminProfessionsNewScreen } from '@screens/admin/AdminProfessionsNewScreen';
import { NotFound } from '@screens/NotFound';
import { ConfirmPage } from '@screens/ConfirmPage';
import { AboutUs } from '@screens/AboutUs';

export const Routing = () => {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<MainLayout />}>
          <Route index element={<MainScreen />} />
          <Route path={'courses'} element={<CoursesScreen />} />
          <Route path={'about-us'} element={<AboutUs />} />
          <Route path={'courses/:id'} element={<CourseScreen />} />
          <Route path={'/professions'} element={<ProfessionsScreen />} />
          <Route path={'professions/:id'} element={<ProfessionScreen />} />
          <Route path={'pages/:slug'} element={<PageScreen />} />
          <Route path={'confirm/:token'} element={<ConfirmPage />} />
          <Route
            path={'survey'}
            element={
              <SurveyGuard>
                <SurveyScreen />
              </SurveyGuard>
            }
          />
          <Route
            path={'survey/step/:step'}
            element={
              <SurveyGuard>
                <SurveyStepScreen />
              </SurveyGuard>
            }
          />
          <Route
            path={'survey/finish'}
            element={
              <SurveyGuard>
                <SurveyFinishScreen />
              </SurveyGuard>
            }
          />

          {/* Admin */}
          <Route
            path={'admin/*'}
            element={
              <ProtectedRoute role={CurrentUserRoles.ROLE_MODERATOR}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path={'courses'} element={<AdminCoursesScreen />} />
            <Route path={'courses/:id/edit'} element={<AdminCoursesEditScreen />} />
            <Route path={'courses/new'} element={<AdminCoursesNewScreen />} />

            <Route path={'professions'} element={<AdminProfessionsScreen />} />
            <Route
              path={'professions/:id/edit'}
              element={<AdminProfessionsEditScreen />}
            />
            <Route path={'professions/new'} element={<AdminProfessionsNewScreen />} />

            <Route path={'providers'} element={<AdminProvidersScreen />} />
            <Route path={'providers/:id/edit'} element={<AdminProviderEditScreen />} />
            <Route path={'providers/new'} element={<AdminProviderNewScreen />} />
          </Route>

          {/* User */}
          <Route
            path={'user/*'}
            element={
              <ProtectedRoute role={CurrentUserRoles.ROLE_REGULAR}>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route path={'recommendations'} element={<UserRecommendationsScreen />} />
            <Route path={'account'} element={<UserAccountScreen />} />
          </Route>

          {/* Auth */}
          <Route path={'login'} element={<LoginScreen />} />
          <Route path={'registration'} element={<RegistrationScreen />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default Routing;
