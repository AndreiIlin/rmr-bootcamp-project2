import { CurrentUserRoles, useCurrentUser } from '@features/auth';
import { AutoStories } from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

type NavItem = {
  path: string;
  title: string;
  renderIcon: () => JSX.Element;
};

interface UserSidebarProps {
  navItems: NavItem[];
}

export const UserSidebar = ({ navItems }: UserSidebarProps) => {
  const location = useLocation();
  const { data: currentUser } = useCurrentUser();
  const isUser = currentUser?.role === CurrentUserRoles.ROLE_REGULAR;

  return (
    <aside>
      <List sx={{ display: { xs: 'flex', md: 'block' }, flexWrap: 'wrap' }}>
        {navItems.map((item) => (
          <ListItem
            key={item.path}
            sx={{ width: { xs: '100%', sm: '50%', md: '100%' }, px: 1 }}
          >
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              selected={location.pathname.includes(item.path)}
            >
              <ListItemIcon color="primary" sx={{ minWidth: '38px' }}>
                {item.renderIcon()}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
        {isUser && (
          <ListItem sx={{ width: { xs: '100%', sm: '50%', md: '100%' }, px: 1 }}>
            <ListItemButton
              component={Link}
              to={'/user/courses'}
              selected={location.pathname.includes('/user/courses')}
            >
              <ListItemIcon color="primary" sx={{ minWidth: '38px' }}>
                <AutoStories />
              </ListItemIcon>
              <ListItemText primary={'Моё обучение'} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </aside>
  );
};
