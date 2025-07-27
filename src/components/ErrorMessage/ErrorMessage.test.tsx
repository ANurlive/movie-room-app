import { render, screen } from '@testing-library/react';
import ErrorMessage from '.';
import { DEFAULT_ERROR_MESSAGE, ERROR_MESSAGES } from './messages';

describe('ErrorMessage component', () => {
  const testCases = [
    {
      name: 'known error code',
      errorCode: 404,
      expectedCodeText: '404',
      expectedMessage: ERROR_MESSAGES[404],
    },
    {
      name: 'unexpected code',
      errorCode: 'unexpected',
      expectedCodeText: null,
      expectedMessage: DEFAULT_ERROR_MESSAGE,
    },
    {
      name: 'unknown numeric code',
      errorCode: 999,
      expectedCodeText: '999',
      expectedMessage: DEFAULT_ERROR_MESSAGE,
    },
  ];

  test.each(testCases)(
    `renders correctly when ${name}`,
    ({ errorCode, expectedCodeText, expectedMessage }) => {
      render(<ErrorMessage errorCode={errorCode as number | 'unexpected'} />);

      const codeElement = screen.queryByRole('heading', { level: 2 });
      const messageElement = screen.queryByRole('heading', { level: 3 });

      if (expectedCodeText) {
        expect(codeElement).toBeInTheDocument();
        expect(codeElement).toHaveTextContent(expectedCodeText);
      } else {
        expect(codeElement).not.toBeInTheDocument();
      }

      expect(messageElement).toHaveTextContent(expectedMessage);
    }
  );
});
