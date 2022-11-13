import { CurrentUserRoles } from '@features/auth';
import { CurrentUser } from '@features/auth/auth.entity';
import { queryClient } from '@infrastructure/query-client';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

type NavItem = {
  path: string;
  title: string;
};

interface AdminSidebarProps {
  navItems: NavItem[];
}

export const AdminSidebar = ({ navItems }: AdminSidebarProps) => {
  const location = useLocation();
  const currentUser: CurrentUser | undefined = queryClient.getQueryData(['currentUser']);
  const isAdmin = currentUser?.role === CurrentUserRoles.ROLE_ADMIN;

  return (
    <aside>
      <List sx={{ display: { xs: 'flex', md: 'block' }, flexWrap: 'wrap' }}>
        {navItems.map((item) => (
          <ListItem key={item.path} sx={{ width: { xs: '50%', md: '100%' }, px: 0 }}>
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              selected={location.pathname.includes(item.path)}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
        {isAdmin && (
          <ListItem sx={{ width: { xs: '50%', md: '100%' }, px: 0 }}>
            <ListItemButton
              component={Link}
              to="/admin/management"
              selected={location.pathname.includes('/admin/management')}
            >
              <ListItemText primary="Управление пользователями" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </aside>
  );
};
