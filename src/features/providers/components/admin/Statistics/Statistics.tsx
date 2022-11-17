import { useAllProviders } from '@features/providers/hooks/useAllProviders';
import { CoursesShort, StatisticsUnique } from '@features/providers/providers.entity';
import {
  getProviderCourses,
  getStatisticsExcel,
  getStatisticsUnique,
} from '@features/providers/providers.service';
import {
  Alert,
  AlertTitle,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const Statistics = () => {
  const { courseProviders, isLoading, error } = useAllProviders();

  const [provider, setProvider] = useState<string>('');
  const [listCourses, setListCourses] = useState<CoursesShort[]>([]);
  const [courses, setCourses] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
  const [dateTo, setDateTo] = useState<Dayjs | null>(null);
  const [openCourses, setOpenCourses] = useState<StatisticsUnique[]>([]);

  const handleChangeCourses = (event: SelectChangeEvent<typeof courses>) => {
    const value = event.target.value;
    setCourses(typeof value === 'string' ? value.split(',') : value);
  };

  useEffect(() => {
    if (provider) {
      getProviderCourses(provider).then((response) => {
        setListCourses(response.data);
      });
    }
  }, [provider]);

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
          <Paper className={styles.filterBox}>
            <div className={styles.filter}>
              <FormControl
                className={styles.inputBox}
                sx={{ m: 1, minWidth: 120, maxWidth: 200 }}
              >
                <InputLabel>Провайдер</InputLabel>
                <Select
                  label="Провайдер"
                  className={styles.input}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxWidth: 200,
                        maxHeight: 200,
                      },
                    },
                  }}
                  value={provider}
                  onChange={({ target }) => {
                    setProvider(target.value);
                    setCourses([]);
                    setOpenCourses([]);
                  }}
                  defaultValue={''}
                >
                  {courseProviders?.map((item) => {
                    return (
                      <MenuItem value={item.id} key={`selectProvider${item.id}`}>
                        <ListItemText primary={item.name} />
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl
                className={styles.inputBox}
                sx={{ m: 1, minWidth: 120, maxWidth: 200 }}
              >
                <InputLabel>Курсы</InputLabel>
                <Select
                  label="Курсы"
                  className={styles.input}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxWidth: 400,
                        maxHeight: 200,
                      },
                    },
                  }}
                  value={courses}
                  onChange={handleChangeCourses}
                  defaultValue={[]}
                  renderValue={(selected) =>
                    listCourses
                      .filter((item) => selected.includes(String(item.id)))
                      .map((item) => item.title)
                      .join(', ')
                  }
                  input={<OutlinedInput label="Tag" />}
                  multiple
                >
                  {listCourses?.map((item) => {
                    return (
                      <MenuItem key={`selectCourses${item.id}`} value={String(item.id)}>
                        <Checkbox checked={courses.indexOf(String(item.id)) > -1} />
                        <ListItemText primary={item.title} />
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  className={styles.date}
                  label="Дата начала"
                  inputFormat="MM/DD/YYYY"
                  value={dateFrom}
                  onChange={(newValue: Dayjs | null) => {
                    setDateFrom(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />

                <DesktopDatePicker
                  className={styles.date}
                  label="Дата окончания"
                  inputFormat="MM/DD/YYYY"
                  value={dateTo}
                  onChange={(newValue: Dayjs | null) => {
                    setDateTo(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <Button
              variant={'contained'}
              size={'large'}
              onClick={() => {
                const transitionedFrom = dayjs(dateFrom).format(
                  'YYYY-MM-DDT00:00:00.000',
                );
                const transitionedTo = dayjs(dateTo).format('YYYY-MM-DDT23:59:59.999');
                getStatisticsUnique({
                  coursesIds: courses.map((i) => Number(i)),
                  transitionedFrom,
                  transitionedTo,
                }).then((i) => {
                  setOpenCourses(i.data);
                });
              }}
            >
              Получить информацию
            </Button>
          </Paper>
          {openCourses.map((item) => (
            <Paper key={item.courseId} className={styles.item}>
              <Typography gutterBottom variant="h6">
                {listCourses.find((course) => course.id == item.courseId)?.title}
              </Typography>

              <Typography variant="body1" gutterBottom>
                Уникальных переходов: {item.transitionsCount}
              </Typography>

              <Button
                variant={'contained'}
                onClick={() => {
                  const transitionedFrom = dayjs(dateFrom).format(
                    'YYYY-MM-DDT00:00:00.000',
                  );
                  const transitionedTo = dayjs(dateTo).format('YYYY-MM-DDT23:59:59.999');
                  getStatisticsExcel({
                    coursesIds: [item.courseId],
                    transitionedFrom,
                    transitionedTo,
                  }).then((i) => {
                    console.log(i);
                  });
                }}
              >
                Получить подробную информацию
              </Button>
            </Paper>
          ))}
          {}
        </>
      )}
    </>
  );
};
