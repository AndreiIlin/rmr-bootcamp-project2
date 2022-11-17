import { StyledTableCell } from '@features/courses/components/admin/CoursesTable';
import { UserStudyInfoResponse } from '@features/courses/courses.service';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { InfiniteData } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React, { FC } from 'react';

interface UserStudyTableProps {
  data: InfiniteData<UserStudyInfoResponse>;
}

export const UserStudyTable: FC<UserStudyTableProps> = ({ data }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell colSpan={3}>Имя и Фамилия</StyledTableCell>
            <StyledTableCell colSpan={3}>Адрес электронной почты</StyledTableCell>
            <StyledTableCell colSpan={3}>Название курса</StyledTableCell>
            <StyledTableCell colSpan={3}>Профессии</StyledTableCell>
            <StyledTableCell colSpan={3}>Количество баллов</StyledTableCell>
            <StyledTableCell colSpan={3}>Статус обучения</StyledTableCell>
            <StyledTableCell colSpan={3}>Дата окончания</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.pages[0].content.map((userInfo) => (
            <TableRow key={userInfo.email}>
              <StyledTableCell colSpan={3}>
                {userInfo.userInfoNameAndSurname}
              </StyledTableCell>
              <StyledTableCell colSpan={3}>{userInfo.email}</StyledTableCell>
              <StyledTableCell colSpan={3}>{userInfo.courseTitle}</StyledTableCell>
              <StyledTableCell colSpan={3}>{userInfo.professions}</StyledTableCell>
              <StyledTableCell colSpan={3}>{userInfo.score}</StyledTableCell>
              <StyledTableCell colSpan={3}>
                {!userInfo.courseFinished ? 'В процессе обучения' : 'Окончил(а) обучение'}
              </StyledTableCell>
              <StyledTableCell colSpan={3}>
                {dayjs(userInfo.finishedAt).format('DD.MM.YYYY')}
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
