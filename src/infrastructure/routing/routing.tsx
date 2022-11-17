import { ProtectedRoute } from '@features/auth';
import { MainLayout } from '@features/layout';
import { AdminLayout } from '@features/layout/components/AdminLayout';
import { UserLayout } from '@features/layout/components/UserLayout';
import { SurveyGuard } from '@features/survey/components/SurveyGuard';
import { AboutUs } from '@screens/AboutUs';
import { AdminAccountsManagement } from '@screens/admin/AdminAccountsManagement';
import { AdminCoursesEditScreen } from '@screens/admin/AdminCoursesEditScreen';
import { AdminCoursesNewScreen } from '@screens/admin/AdminCoursesNewScreen';
import { AdminCoursesScreen } from '@screens/admin/AdminCoursesScreen';
import { AdminProfessionsEditScreen } from '@screens/admin/AdminProfessionsEditScreen';
import { AdminProfessionsNewScreen } from '@screens/admin/AdminProfessionsNewScreen';
import { AdminProfessionsScreen } from '@screens/admin/AdminProfessionsScreen';
import { AdminProviderEditScreen } from '@screens/admin/AdminProviderEditScreen';
import { AdminProviderNewScreen } from '@screens/admin/AdminProviderNewScreen';
import { AdminProvidersScreen } from '@screens/admin/AdminProvidersScreen';
import { AdminUsersStudyInfo } from '@screens/admin/AdminUsersStudyInfo';
import { AdminStatisticsScreen } from '@screens/admin/AdminStatisticsScreen';
import { ConfirmPage } from '@screens/ConfirmPage';
import { CourseScreen } from '@screens/CourseScreen';
import { CoursesScreen } from '@screens/CoursesScreen';
import {
  LoginScreen,
  MainScreen,
  ProfessionsScreen,
  RegistrationScreen,
} from '@screens/index';
import { NotFound } from '@screens/NotFound';
import { PageScreen } from '@screens/PageScreen';
import { ProfessionScreen } from '@screens/ProfessionScreen';
import { SurveyFinishScreen } from '@screens/SurveyFinishScreen';
import { SurveyScreen } from '@screens/SurveyScreen';
import { SurveyStepScreen } from '@screens/SurveyStepScreen';
import { UserAccountScreen } from '@screens/UserAccountScreen';
import { UserCoursesScreen } from '@screens/UserCoursesScreen';
import { UserRecommendationsScreen } from '@screens/UserRecommendationsScreen';
import { Route, Routes } from 'react-router-dom';

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
              <ProtectedRoute restriction="notForUsers">
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

            <Route path={'statistics'} element={<AdminStatisticsScreen />} />
            <Route path={'providers'} element={<AdminProvidersScreen />} />
            <Route path={'providers/:id/edit'} element={<AdminProviderEditScreen />} />
            <Route path={'providers/new'} element={<AdminProviderNewScreen />} />
            <Route path={'study'} element={<AdminUsersStudyInfo />} />
            <Route
              path={'management'}
              element={
                <ProtectedRoute restriction="adminOnly">
                  <AdminAccountsManagement />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* User */}
          <Route
            path={'user/*'}
            element={
              <ProtectedRoute>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route path={'recommendations'} element={<UserRecommendationsScreen />} />
            <Route path={'account'} element={<UserAccountScreen />} />
            <Route path={'courses'} element={<UserCoursesScreen />} />
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
