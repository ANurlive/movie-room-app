import { Component } from 'react';
import { DEFAULT_ERROR_MESSAGE, ERROR_MESSAGES } from './messages';

type Props = {
  errorCode: number | 'unexpected';
};

const getErrorMessage = (code?: number | 'unexpected'): string => {
  if (typeof code !== 'number') return DEFAULT_ERROR_MESSAGE;
  return ERROR_MESSAGES[code] || DEFAULT_ERROR_MESSAGE;
};

export default class ErrorMessage extends Component<Props> {
  render() {
    const { errorCode } = this.props;
    return (
      <div className="messageContainer font-bold text-red-600">
        {typeof errorCode === 'number' && (
          <h2 className="font-inherit">{errorCode}</h2>
        )}
        <h3 className="font-inherit">{getErrorMessage(errorCode)}</h3>
      </div>
    );
  }
}
