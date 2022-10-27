import { useInfiniteCourses } from '@features/courses/hooks/useInfiniteCourses';
import { Alert, AlertTitle, Box, Button, CircularProgress, Link } from '@mui/material';
import { MouseEventHandler, useState } from 'react';
import { CoursesFilter, FilterOptions } from '../CoursesFilter';
import { CoursesList } from '../CoursesList';

interface CoursesViewProps {
  filterOptions?: FilterOptions;
  itemsPerRow?: number;
  disabledFilterControls?: Array<keyof FilterOptions>;
}

export const CoursesView = ({
  filterOptions = {},
  disabledFilterControls,
  itemsPerRow,
}: CoursesViewProps) => {
  const [options, setOptions] = useState<FilterOptions>({
    ...filterOptions,
    sortBy: 'startsAt',
    search: '',
  });

  const { data, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteCourses(1, options);

  const handleFilterChange = (filterOptions: FilterOptions) => {
    setOptions((prev) => ({ ...prev, ...filterOptions }));
  };

  const clearFilters: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    setOptions({ ...filterOptions, sortBy: 'startsAt', search: '' });
  };

  return (
    <>
      <CoursesFilter
        options={options}
        onChange={handleFilterChange}
        disabledControls={disabledFilterControls}
      />
      {isLoading && !data && (
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Box sx={{ mt: 3 }}>
          <Alert color="error">
            <AlertTitle>Ой! Кажется произошла ошибка</AlertTitle>
            {error.message}
          </Alert>
        </Box>
      )}
      {data && data.pages && data.pages.length > 0 && (
        <>
          <Box sx={{ mt: 4 }}>
            {data.pages?.map((page, idx) => (
              <Box sx={{ mb: 4 }} key={idx}>
                <CoursesList items={page.content} itemsPerRow={itemsPerRow} />
              </Box>
            ))}
            {hasNextPage && (
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ maxWidth: 300, py: 2 }}
                  onClick={() => (isFetchingNextPage ? null : fetchNextPage())}
                >
                  {isFetchingNextPage ? 'Загрузка...' : 'Загрузить еще'}
                </Button>
              </Box>
            )}
          </Box>
        </>
      )}
      {data?.pages && data?.pages[0].content.length === 0 && (
        <Box sx={{ mt: 3 }}>
          <Alert severity="info">
            К сожалению, курсы по заданым фильтрам не найдены.{' '}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
            <Link
              variant="body2"
              color={'inherit'}
              component="button"
              onClick={clearFilters}
            >
              Очистить фильтры
            </Link>
          </Alert>
        </Box>
      )}
    </>
  );
};
