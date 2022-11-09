import { CourseCreateArgs, createCourse } from '@features/courses/courses.service';
import { ProfessionEntity } from '@features/professions/professions.entity';
import { useAllProfessions } from '@features/professions/professions.hooks';
import { ProviderFull } from '@features/providers';
import { useAllProviders } from '@features/providers/hooks/useAllProviders';
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REQUIRED_DEFAULT_RULE, URL_PATTERN_RULE } from '@utils/formValidationUtils';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export const CoursesNewForm = () => {
  const [providerSearch, setProviderSearch] = useState('');
  const queryClient = useQueryClient();
  const [selectedProvider, setSelectedProvider] = useState<ProviderFull | undefined>(
    undefined,
  );
  const { courseProviders } = useAllProviders();
  const { data: professions } = useAllProfessions();

  const { control, handleSubmit, reset, setValue, getValues } =
    useForm<CourseCreateArgs>();

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const {
    mutate,
    isLoading: isMutationLoading,
    isSuccess: isMutationSuccess,
    isError: isMutationError,
    error: mutationError,
  } = useMutation<void, Error, CourseCreateArgs>((data: CourseCreateArgs) => {
    return createCourse(data).then(() => {
      setSnackbarVisible(true);
      setProviderSearch('');
      setSelectedProvider(undefined);
      reset({
        title: '',
        description: '',
        url: '',
        coverUrl: '',
        providerId: undefined,
        professionId: undefined,
        isAdvanced: false,
        tags: [],
      });
      queryClient.invalidateQueries(['courses']);
      queryClient.invalidateQueries(['all-courses']);
    });
  });

  const onSubmit = useCallback(
    (data: CourseCreateArgs) => {
      if (!isMutationLoading) {
        mutate(data);
      }
    },
    [isMutationLoading, mutate],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <>
        <Card>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            {isMutationError && (
              <Alert color="error">
                <AlertTitle>Ой! Кажется произошла ошибка</AlertTitle>
                {mutationError.message}
              </Alert>
            )}
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="title"
                  control={control}
                  defaultValue={''}
                  rules={{
                    required: REQUIRED_DEFAULT_RULE,
                  }}
                  render={({ field: { value, ...otherFields }, fieldState }) => (
                    <TextField
                      label="Название курса"
                      variant="outlined"
                      defaultValue={''}
                      fullWidth
                      error={!!fieldState.error}
                      value={value}
                      helperText={fieldState.error?.message}
                      {...otherFields}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="url"
                  control={control}
                  defaultValue={''}
                  rules={{
                    required: REQUIRED_DEFAULT_RULE,
                    pattern: URL_PATTERN_RULE,
                  }}
                  render={({ field: { value, ...otherFields }, fieldState }) => (
                    <TextField
                      label="Ссылка на курс"
                      variant="outlined"
                      fullWidth
                      defaultValue={''}
                      value={value}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      {...otherFields}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="coverUrl"
                  control={control}
                  defaultValue={''}
                  rules={{
                    required: REQUIRED_DEFAULT_RULE,
                    pattern: URL_PATTERN_RULE,
                  }}
                  render={({ field: { value, ...otherFields }, fieldState }) => (
                    <TextField
                      label="Ссылка на обложку курса"
                      variant="outlined"
                      fullWidth
                      defaultValue={''}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      value={value}
                      {...otherFields}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="providerId"
                  control={control}
                  rules={{
                    required: REQUIRED_DEFAULT_RULE,
                  }}
                  render={({ fieldState }) => (
                    <Autocomplete
                      options={courseProviders ?? []}
                      getOptionLabel={(option) => option?.name ?? ''}
                      noOptionsText={'Ничего не найдено'}
                      value={selectedProvider}
                      onInputChange={(event, newInputValue, reason) => {
                        if (reason === 'input') {
                          setProviderSearch(newInputValue);
                        }
                      }}
                      onChange={(event, newValue) => {
                        setValue('providerId', newValue?.id as number);
                        setSelectedProvider(newValue ?? undefined);
                        setProviderSearch(newValue?.name ?? '');
                      }}
                      inputValue={providerSearch}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Провайдер"
                          variant="outlined"
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          value={providerSearch}
                        />
                      )}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="professionId"
                  control={control}
                  defaultValue={undefined}
                  rules={{
                    required: REQUIRED_DEFAULT_RULE,
                  }}
                  render={({ field: { value, ...otherFields }, fieldState }) => (
                    <FormControl fullWidth>
                      <InputLabel id="profession-select-label" error={!!fieldState.error}>
                        Профессия
                      </InputLabel>
                      <Select
                        labelId="profession-select-label"
                        id="profession-select"
                        label="Профессия"
                        error={!!fieldState.error}
                        value={value?.toString() ?? ''}
                        defaultValue={''}
                        fullWidth
                        {...otherFields}
                      >
                        {professions?.map((profession: ProfessionEntity) => (
                          <MenuItem key={profession.id} value={profession.id}>
                            {profession.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {fieldState.error && (
                        <FormHelperText error>{fieldState.error.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="tags"
                  control={control}
                  defaultValue={[] as string[]}
                  render={({ field: { value, ...otherFields } }) => (
                    <Autocomplete
                      multiple
                      id="tags-filled"
                      options={[] as readonly string[]}
                      defaultValue={[]}
                      freeSolo
                      {...otherFields}
                      onChange={(e, value) => setValue('tags', value)}
                      renderTags={(value: string[], getTagProps) =>
                        value.map((option: string, index: number) => (
                          // eslint-disable-next-line react/jsx-key
                          <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Метки"
                          placeholder="Введите метку и нажмите Enter"
                        />
                      )}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="startsAt"
                  control={control}
                  defaultValue={''}
                  rules={{
                    required: REQUIRED_DEFAULT_RULE,
                    validate: (value) =>
                      new Date(value) >= new Date() ||
                      'Дата начала курса не может быть меньше текущей даты',
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      id="datetime-start-local"
                      label="Дата начала"
                      type="datetime-local"
                      defaultValue={''}
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      {...field}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        max: '9999-12-31T23:59',
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="endsAt"
                  control={control}
                  defaultValue={''}
                  rules={{
                    required: REQUIRED_DEFAULT_RULE,
                    validate: (value) =>
                      value >= getValues('startsAt') ||
                      'Дата окончания курса не может быть раньше даты начала курса',
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      id="datetime-end-local"
                      label="Дата окончания"
                      type="datetime-local"
                      defaultValue={''}
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      {...field}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        max: '9999-12-31T23:59',
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  defaultValue={''}
                  rules={{
                    required: REQUIRED_DEFAULT_RULE,
                  }}
                  render={({ field: { value, ...otherFields }, fieldState }) => (
                    <TextField
                      label="Описание"
                      variant="outlined"
                      defaultValue={''}
                      multiline
                      rows={6}
                      fullWidth
                      error={!!fieldState.error}
                      value={value}
                      helperText={fieldState.error?.message}
                      {...otherFields}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="isAdvanced"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <>
                      <FormControlLabel
                        label={'Для продвинутых'}
                        control={<Checkbox defaultChecked={field.value ?? false} />}
                        {...field}
                      />
                    </>
                  )}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ p: { xs: 2, md: 5 }, pt: { md: 2 } }}>
            <Button
              type="submit"
              size="large"
              variant="contained"
              sx={{ minHeight: '56px', width: '240px' }}
              startIcon={
                isMutationLoading ? (
                  <CircularProgress color="inherit" sx={{ mr: 1 }} />
                ) : undefined
              }
            >
              {isMutationLoading ? 'Добавление...' : 'Добавить'}
            </Button>
          </CardActions>
        </Card>
        <Snackbar
          open={isMutationSuccess && snackbarVisible}
          autoHideDuration={6000}
          onClick={() => setSnackbarVisible(false)}
          onClose={() => setSnackbarVisible(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            severity="success"
            sx={{ width: '100%', border: 1, borderColor: 'primary.main' }}
          >
            Курс успешно добавлен
          </Alert>
        </Snackbar>
      </>
    </form>
  );
};
