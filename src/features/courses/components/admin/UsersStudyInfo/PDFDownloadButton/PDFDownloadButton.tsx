import { StudyFilterOptions } from '@features/courses/components/admin/UsersStudyInfo/UsersStudyFilter';
import { fetchUsersStudyInfoPDF } from '@features/courses/courses.service';
import { Alert, Button, Snackbar } from '@mui/material';
import FileSaver from 'file-saver';
import React, { FC, useState } from 'react';

interface PDFDownloadButtonProps {
  options: StudyFilterOptions;
}

export const PDFDownloadButton: FC<PDFDownloadButtonProps> = ({ options }) => {
  const [disabled, setDisabled] = useState(false);
  const [isSnackbarOpened, setIsSnackbarOpened] = useState(false);

  const handleCloseSnackbar = () => {
    setIsSnackbarOpened(false);
  };

  const downloadPdf = async () => {
    try {
      setDisabled(true);
      const response = await fetchUsersStudyInfoPDF({ page: '1', ...options });
      const file = new File([response.data as unknown as BlobPart], 'User_courses.pdf', {
        type: 'application/pdf;base64',
      });
      FileSaver.saveAs(file);
    } catch (err) {
      setIsSnackbarOpened(true);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <>
      <Button
        variant={'contained'}
        disabled={disabled}
        fullWidth
        sx={{ height: '100%' }}
        onClick={downloadPdf}
      >
        Скачать в PDF
      </Button>
      <Snackbar
        open={isSnackbarOpened}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          Произошла непредвиденная ошибка! Попробуйте скачать ещё раз
        </Alert>
      </Snackbar>
    </>
  );
};
