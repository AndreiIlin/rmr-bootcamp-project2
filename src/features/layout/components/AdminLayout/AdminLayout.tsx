import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';

export const AdminLayout = () => {
  const navItems = [
    { path: '/admin/courses', title: 'Курсы' },
    { path: '/admin/professions', title: 'Профессии' },
    { path: '/admin/providers', title: 'Создатели курсов' },
    { path: '/admin/statistics', title: 'Статистика переходов' },
  ];

  return (
    <section>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <AdminSidebar navItems={navItems} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Outlet />
        </Grid>
      </Grid>
    </section>
  );
};
