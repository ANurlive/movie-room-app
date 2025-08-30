import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { DEFAULT_ERROR_MESSAGE, ERROR_MESSAGES } from './messages';
import type { SerializedError } from '@reduxjs/toolkit';

type Props = {
  error: FetchBaseQueryError | SerializedError;
};

const getErrorMessage = (error: FetchBaseQueryError | SerializedError) => {
  if ('status' in error) {
    const statusCode =
      typeof error.status === 'number' ? error.status : undefined;

    if (statusCode) {
      return {
        code: statusCode,
        message: ERROR_MESSAGES[statusCode] || DEFAULT_ERROR_MESSAGE,
      };
    }

    if (error.status === 'FETCH_ERROR') {
      return {
        code: undefined,
        message: 'Network error. Please check connection.',
      };
    }
  }

  return {
    code: undefined,
    message: DEFAULT_ERROR_MESSAGE,
  };
};

export default function ErrorMessage({ error }: Props) {
  const { code, message } = getErrorMessage(error);

  return (
    <div className="messageContainer font-bold text-red-600">
      {code && <h2 className="font-inherit">{code}</h2>}
      <h3 className="font-inherit">{message}</h3>
    </div>
  );
}
