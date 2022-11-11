import { ConfirmEmail } from '@features/auth/components';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

export const ConfirmPage = () => {
  const { token } = useParams();

  return (
    <>
      <Helmet>
        <title>Подтверждение почты {APP_TITLE_WITH_SEPARATOR}</title>
      </Helmet>
      <ConfirmEmail token={token as string} />
    </>
  );
};
