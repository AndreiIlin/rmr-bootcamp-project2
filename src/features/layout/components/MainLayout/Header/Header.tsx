import { CurrentUserRoles, useAuthStore, useCurrentUser } from '@features/auth';
import { logOut } from '@features/auth/components';
import { useSurveyResultsStore } from '@features/survey/hooks';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
} from '@mui/material';
import { styled } from '@mui/system';
import { useQueryClient } from '@tanstack/react-query';
import { Logo } from '@ui-library/components/Logo';
import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

type NavLink = {
  title: string;
  path: string;
  variant: 'text' | 'outlined' | 'contained';
};

const navLinks: NavLink[] = [
  { title: 'Профессии', path: '/professions', variant: 'text' },
  { title: 'Курсы', path: '/courses', variant: 'text' },
  { title: 'О нас', path: '/about-us', variant: 'text' },
  { title: 'Пройти тест', path: '/survey', variant: 'contained' },
];

const StyledNav = styled('nav')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

const StyledLeftStack = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    justifyContent: 'space-between',
  },
}));

const StyledLogoLink = styled(Link)(() => ({
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  color: 'inherit',
  '&:hover': {
    opacity: 0.7,
  },
  '&:visited': {
    color: 'inherit',
  },
}));

export const Header = () => {
  const queryClient = useQueryClient();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const resetSurveyResultsStore = useSurveyResultsStore((state) => state.reset);
  const currentUser = useCurrentUser();
  const location = useLocation();

  const [currentStep, surveyState] = useSurveyResultsStore((state) => [
    state.currentStep,
    state.surveyState,
  ]);

  const surveyPath = useMemo(() => {
    if (surveyState === 'in-progress') {
      return `/survey/step/${currentStep + 1}`;
    }

    if (surveyState === 'completed') {
      return `/survey/finish`;
    }
    return '/survey';
  }, [currentStep, surveyState]);

  const isLogged = useAuthStore((store) => store.isAuth);

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
    setUserMenuOpen(false);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
    setUserMenuOpen(true);
  };

  const isUser = currentUser.data?.role === CurrentUserRoles.ROLE_REGULAR;

  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ py: 1, backgroundColor: 'background.paper' }}
    >
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between' }} disableGutters>
          <StyledLeftStack>
            <IconButton
              edge="start"
              color="primary"
              aria-label="open mobile menu"
              size="large"
              sx={{ display: { xs: 'flex', md: 'none' }, mr: { sm: 2 } }}
              onClick={() => setMobileDrawerOpen(true)}
            >
              <MenuIcon sx={{ width: 30, height: 30 }} />
            </IconButton>
            <StyledLogoLink to="/">
              <Logo />
            </StyledLogoLink>
          </StyledLeftStack>

          <StyledNav>
            <Stack
              direction={'row'}
              spacing={2}
              component="ul"
              sx={{ pl: 0, listStyle: 'none' }}
              flexGrow={1}
            >
              {navLinks.map((link) => (
                <li key={link.title}>
                  <Button
                    key={link.title}
                    component={Link}
                    to={link.path.includes('survey') ? surveyPath : link.path}
                    variant={link.variant}
                    sx={{ py: 1 }}
                    disabled={location.pathname === link.path}
                  >
                    {link.title}
                  </Button>
                </li>
              ))}
            </Stack>
          </StyledNav>
          <Stack direction="row" spacing={'0.5rem'}>
            {isLogged ? (
              <>
                <IconButton
                  size="large"
                  edge="end"
                  aria-haspopup="true"
                  aria-expanded={userMenuOpen ? 'true' : undefined}
                  onClick={handleUserMenuOpen}
                >
                  <AccountCircle color="primary" fontSize="inherit"></AccountCircle>
                </IconButton>
                <Menu
                  anchorEl={userMenuAnchorEl}
                  open={userMenuOpen}
                  onClose={handleUserMenuClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem
                    onClick={handleUserMenuClose}
                    component={Link}
                    to="/user/account"
                  >
                    Мой аккаунт
                  </MenuItem>
                  {currentUser && (
                    <MenuItem
                      onClick={handleUserMenuClose}
                      component={Link}
                      to="/user/recommendations"
                    >
                      Мои рекомендации
                    </MenuItem>
                  )}
                  {isUser && (
                    <MenuItem
                      onClick={handleUserMenuClose}
                      component={Link}
                      to="/user/courses"
                    >
                      Моё обучение
                    </MenuItem>
                  )}
                  {(currentUser?.data?.role === CurrentUserRoles.ROLE_MODERATOR ||
                    currentUser?.data?.role === CurrentUserRoles.ROLE_ADMIN) && (
                    <MenuItem
                      onClick={handleUserMenuClose}
                      component={Link}
                      to="/admin/courses"
                    >
                      Административная панель
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={() => {
                      handleUserMenuClose();
                      resetSurveyResultsStore();
                      logOut();
                      queryClient.invalidateQueries(['currentUser']);
                      queryClient.invalidateQueries(['currentUserProfile']);
                      queryClient.clear();
                    }}
                  >
                    Выход
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box display={{ xs: 'none', sm: 'flex' }}>
                <Button
                  size={'small'}
                  component={Link}
                  to={'/login'}
                  variant={'outlined'}
                  sx={{ py: 1, ml: 2 }}
                >
                  Войти
                </Button>
                <Button
                  size={'small'}
                  component={Link}
                  to={'/registration'}
                  variant={'outlined'}
                  sx={{ py: 1, ml: 2 }}
                >
                  Регистрация
                </Button>
              </Box>
            )}
          </Stack>
        </Toolbar>
      </Container>
      <Drawer
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        sx={{ p: 3, display: 'flex', flexDirection: 'column' }}
      >
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.title} disablePadding>
              <Button
                sx={{
                  width: '200px',
                  p: 2,
                  justifyContent: 'flex-start',
                  borderRadius: 0,
                }}
                component={Link}
                to={link.path}
                variant={link.variant}
                onClick={() => setMobileDrawerOpen(false)}
              >
                {link.title}
              </Button>
            </ListItem>
          ))}
        </List>
        {!isLogged && (
          <Stack direction={'column'} sx={{ p: 2, mt: 'auto' }} spacing={2}>
            <Button
              size={'large'}
              component={Link}
              to={'/login'}
              variant={'outlined'}
              fullWidth
              sx={{ py: 1 }}
              onClick={() => setMobileDrawerOpen(false)}
            >
              Войти
            </Button>
            <Button
              size={'large'}
              component={Link}
              to={'/registration'}
              variant={'outlined'}
              fullWidth
              sx={{ py: 1 }}
              onClick={() => setMobileDrawerOpen(false)}
            >
              Регистрация
            </Button>
          </Stack>
        )}
      </Drawer>
    </AppBar>
  );
};
