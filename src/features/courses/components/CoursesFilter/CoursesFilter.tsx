import { CoursesSortBy } from '@features/courses/courses.service';
import { ProfessionEntity } from '@features/professions/professions.entity';
import { useAllProfessions } from '@features/professions/professions.hooks';
import {
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
import debounce from 'lodash.debounce';
import { useEffect, useMemo, useRef } from 'react';

export type FilterOptions = {
  professionId?: number;
  search?: string;
  isAdvanced?: boolean;
  sortBy?: CoursesSortBy;
};

interface CourseFilterProps {
  options: FilterOptions;
  disabledControls?: Array<keyof FilterOptions>;
  onChange: (filterOptions: FilterOptions) => void;
}

export const CoursesFilter = ({
  options,
  disabledControls,
  onChange,
}: CourseFilterProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { data } = useAllProfessions();
  const isProfessionsDisabled = disabledControls?.includes('professionId');

  const gridColumnSize = useMemo(() => {
    let columnSize = 3;
    if (isProfessionsDisabled) {
      columnSize += 1;
    }

    return columnSize;
  }, [isProfessionsDisabled, disabledControls]);

  const isAdvancedValue = useMemo(() => {
    if (options.isAdvanced === undefined) {
      return '';
    }

    if (options.isAdvanced) {
      return 'yes';
    }

    if (!options.isAdvanced) {
      return 'no';
    }
  }, [options.isAdvanced]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...options, search: event.target.value });
  };

  const handleProfessionChange = (event: SelectChangeEvent<string>) => {
    onChange({
      ...options,
      professionId: event.target.value ? parseInt(event.target.value) : undefined,
    });
  };

  const handleIsForAdvancedChange = (event: SelectChangeEvent<string>) => {
    onChange({ ...options, isAdvanced: event.target.value === 'yes' });
  };

  const handleSortbyChange = (event: SelectChangeEvent<string>) => {
    onChange({ ...options, sortBy: event.target.value as CoursesSortBy });
  };

  useEffect(() => {
    if ((!options.search || options.search === '') && searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  }, [searchInputRef, options]);

  console.log(isAdvancedValue);

  return (
    <Card>
      <CardHeader title="Фильтры" sx={{ p: { md: 3 }, pb: { md: 1 } }} />
      <CardContent sx={{ p: { md: 3 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} lg={gridColumnSize}>
            <TextField
              variant="outlined"
              label="Поиск по названию курса"
              onChange={debounce(handleSearchChange, 300)}
              defaultValue={options.search}
              inputRef={searchInputRef}
              fullWidth
            />
          </Grid>
          {!isProfessionsDisabled && (
            <Grid item xs={12} sm={6} lg={gridColumnSize}>
              <FormControl fullWidth>
                <InputLabel id="course-profession">Профессия</InputLabel>
                <Select
                  labelId="course-profession"
                  id="course-profession"
                  label="Профессия"
                  defaultValue=""
                  value={options.professionId?.toString() || ''}
                  onChange={handleProfessionChange}
                >
                  <MenuItem value="">
                    <em>Не выбрано</em>
                  </MenuItem>
                  {data?.map((profession: ProfessionEntity) => (
                    <MenuItem key={profession.id} value={profession.id}>
                      {profession.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12} sm={6} lg={gridColumnSize}>
            <FormControl fullWidth>
              <InputLabel id="course-for-advanced">Сложность</InputLabel>
              <Select
                labelId="course-for-advanced"
                id="course-for-advanced"
                label="Сложность"
                value={isAdvancedValue}
                onChange={handleIsForAdvancedChange}
              >
                <MenuItem value="">
                  <em>Не выбрано</em>
                </MenuItem>
                <MenuItem value={'no'}>Для новичков</MenuItem>
                <MenuItem value={'yes'}>Для опытных</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} lg={gridColumnSize}>
            <FormControl fullWidth>
              <InputLabel id="course-sortby">Сортировать по:</InputLabel>
              <Select
                labelId="course-sortby"
                id="course-sortby"
                label="Сортировать по:"
                value={options.sortBy}
                onChange={handleSortbyChange}
                defaultValue="date-start"
              >
                <MenuItem value={'date-start'}>Дате начала</MenuItem>
                <MenuItem value={'date-end'}>Дате окончания</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
