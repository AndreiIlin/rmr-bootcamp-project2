import { Statistics } from '@features/providers/components/admin/Statistics';
import { Box, Typography } from '@mui/material';

export const AdminStatisticsScreen = () => {
  return (
    <>
      <Typography component={'h1'} variant="h3">
        Статистика переходов
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Statistics />
      </Box>
    </>
  );
};
