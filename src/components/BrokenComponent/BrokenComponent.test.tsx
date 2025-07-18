import { render } from '@testing-library/react';
import BrokenComponent from './BrokenComponent';

describe('BrokenComponent', () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = (...args) => {
      if (/test error/i.test(args[0])) return;
      originalError(...args);
    };
  });
  afterAll(() => {
    console.error = originalError;
  });

  test('It should throw error on mount', () => {
    const errorMessage = 'test error';
    expect(() =>
      render(<BrokenComponent errorMessage={errorMessage} />)
    ).toThrow(errorMessage);
  });
});
