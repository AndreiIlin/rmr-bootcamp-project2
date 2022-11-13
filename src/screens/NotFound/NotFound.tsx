import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import dyno from '@ui-library/components/NotFound/dyno.svg';
import { Helmet } from 'react-helmet';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';

export const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Страница не найдена {APP_TITLE_WITH_SEPARATOR}</title>
      </Helmet>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <Typography variant={'h1'}>Ошибка 404</Typography>
          <Box component={'img'} width={200} src={dyno} alt="404 картинка" />
        </Box>
        <Typography variant={'h5'}>
          Эта страница не найдена... Может вернётесь на{' '}
          {
            <Link to={'/'} replace>
              главную
            </Link>
          }
          ?
        </Typography>
      </Box>
    </>
  );
};
