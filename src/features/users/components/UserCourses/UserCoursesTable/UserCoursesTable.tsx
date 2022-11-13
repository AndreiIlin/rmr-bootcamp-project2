import { CourseStudyInfo } from '@features/courses';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserCoursesTableProps {
  userCourses: CourseStudyInfo[];
}

export const UserCoursesTable: FC<UserCoursesTableProps> = ({ userCourses }) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Название курса</TableCell>
            <TableCell align="right">Провайдер</TableCell>
            <TableCell align="right">Дата начала</TableCell>
            <TableCell align="right">Дата окончания</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userCourses.map((course) => (
            <TableRow
              key={course.courseStudyInfoDto.courseId}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/courses/${course.courseStudyInfoDto.courseId}`)}
            >
              <TableCell
                sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}
                align="left"
              >
                {course.courseStudyInfoDto.courseName}
              </TableCell>
              <TableCell
                sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}
                align="right"
              >
                {course.courseStudyInfoDto.courseProviderName}
              </TableCell>
              <TableCell align="right">
                {dayjs(course.startsAt).format('DD.MM.YYYY')}
              </TableCell>
              <TableCell align="right">
                {course.endsAt
                  ? dayjs(course.endsAt).format('DD.MM.YYYY')
                  : 'В процессе прохождения'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
