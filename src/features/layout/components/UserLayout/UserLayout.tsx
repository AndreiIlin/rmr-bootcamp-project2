import { AutoStories, RecommendRounded, Settings } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { UserSidebar } from './UserSidebar';

export const UserLayout = () => {
  const navItems = [
    {
      path: '/user/recommendations',
      title: 'Мои рекомендации',
      renderIcon: () => <RecommendRounded />,
    },
    {
      path: '/user/account',
      title: 'Мой аккаунт',
      renderIcon: () => <Settings />,
    },
    {
      path: '/user/courses',
      title: 'Мои курсы',
      renderIcon: () => <AutoStories />,
    },
  ];

  return (
    <section>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <UserSidebar navItems={navItems} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Outlet />
        </Grid>
      </Grid>
    </section>
  );
};
