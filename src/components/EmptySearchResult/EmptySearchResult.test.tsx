import { render, screen } from '@testing-library/react';
import EmptySearchResult from './EmptySearchResult';
import { EMPTY_RESULT_MESSAGES } from './messages';

describe('EmptySearchResult component', () => {
  test('should render default message about empty result', () => {
    render(<EmptySearchResult />);
    expect(screen.getByText(EMPTY_RESULT_MESSAGES.DEFAULT)).toBeInTheDocument();
  });
});
