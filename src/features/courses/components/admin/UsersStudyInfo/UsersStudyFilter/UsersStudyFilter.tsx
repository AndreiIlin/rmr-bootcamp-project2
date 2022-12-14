import { PDFDownloadButton } from '@features/courses/components/admin/UsersStudyInfo/PDFDownloadButton';
import { ProfessionEntity } from '@features/professions/professions.entity';
import { useAllProfessions } from '@features/professions/professions.hooks';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import React, { FC, MouseEvent, useMemo } from 'react';

export type StudyFilterOptions = {
  courseTitle?: string;
  score?: number | string;
  profession?: string;
  endsAt?: string;
  isFinished?: boolean;
};

interface UsersStudyFilterProps {
  options: StudyFilterOptions;
  onChange: (filterOptions: StudyFilterOptions) => void;
  clearFilters: (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

export const UsersStudyFilter: FC<UsersStudyFilterProps> = ({
  clearFilters,
  options,
  onChange,
}) => {
  const { data: professions } = useAllProfessions();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...options, courseTitle: e.target.value });
  };

  const handleProfessionChange = (event: SelectChangeEvent) => {
    onChange({
      ...options,
      profession: event.target.value,
    });
  };

  const isCourseFinished = useMemo(() => {
    if (options.isFinished === undefined) {
      return '';
    }

    if (options.isFinished) {
      return 'yes';
    }

    if (!options.isFinished) {
      return 'no';
    }
  }, [options.isFinished]);

  const handleCourseFinishedChange = (event: SelectChangeEvent) => {
    let result = undefined;
    if (event.target.value === 'yes') {
      result = true;
    } else if (event.target.value === 'no') {
      result = false;
    }

    onChange({
      ...options,
      isFinished: result,
    });
  };

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '0') {
      return;
    }
    onChange({ ...options, score: e.target.value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...options, endsAt: e.target.value });
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardHeader
        title="??????????????"
        sx={{ p: { md: 3 }, pb: { md: 1 } }}
        action={<Button onClick={clearFilters}>???????????????? ??????????????</Button>}
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} lg={4}>
            <TextField
              variant="outlined"
              label="?????????? ???? ???????????????? ??????????"
              placeholder="???????????????? ??????????"
              onChange={handleTitleChange}
              value={options.courseTitle}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <FormControl fullWidth>
              <InputLabel id="course-profession">??????????????????</InputLabel>
              <Select
                labelId="course-profession"
                id="course-profession"
                label="??????????????????"
                defaultValue=""
                value={options.profession}
                onChange={handleProfessionChange}
              >
                <MenuItem value="">
                  <em>???? ??????????????</em>
                </MenuItem>
                {professions?.map((profession: ProfessionEntity) => (
                  <MenuItem key={profession.id} value={profession.name}>
                    {profession.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <FormControl fullWidth>
              <InputLabel id="is-course-finished">???????? ???????????????</InputLabel>
              <Select
                labelId="is-course-finished"
                id="is-course-finished"
                label="???????? ???????????????"
                value={isCourseFinished}
                onChange={handleCourseFinishedChange}
              >
                <MenuItem value={''}>
                  <em>???? ??????????????</em>
                </MenuItem>
                <MenuItem value={'yes'}>??????????????</MenuItem>
                <MenuItem value={'no'}>?? ???????????????? ????????????????</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <TextField
              variant="outlined"
              label="???????????????????? ???????????? ????"
              type={'number'}
              placeholder="???????????? ????"
              onChange={handleScoreChange}
              value={options.score}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <TextField
              id="datetime-endsAt"
              label="???????? ??????????????????"
              type="datetime-local"
              value={options.endsAt}
              onChange={handleDateChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: '9999-12-31T23:59',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <PDFDownloadButton options={options} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
