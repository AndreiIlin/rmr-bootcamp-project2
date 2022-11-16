import { useAllCourses } from '@features/courses/hooks/useAllCourses';
import { Edit } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Link } from 'react-router-dom';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

export const CoursesTable = () => {
  const { courses, isLoading, error } = useAllCourses();

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Alert color="error">
          <AlertTitle>Ой! Кажется произошла ошибка</AlertTitle>
          {error.message}
        </Alert>
      ) : (
        <>
          <Button variant="contained" component={Link} to="/admin/courses/new">
            Добавить курс
          </Button>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell colSpan={2}>Название</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses?.map((course) => (
                  <TableRow key={course.id}>
                    <StyledTableCell>{course.title}</StyledTableCell>
                    <StyledTableCell width={40}>
                      <IconButton
                        component={Link}
                        to={`/admin/courses/${course.id}/edit`}
                      >
                        <Edit />
                      </IconButton>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};
