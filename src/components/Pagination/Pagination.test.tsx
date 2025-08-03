import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('Pagination', () => {
  const mockNavigate = jest.fn();
  const mockLocation = { pathname: '/movies' };
  const mockSearchParams = new URLSearchParams('page=2');

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue(mockLocation);
    (useSearchParams as jest.Mock).mockReturnValue([
      mockSearchParams,
      jest.fn(),
    ]);
    jest.clearAllMocks();
  });

  it('renders current page and total pages', () => {
    render(<Pagination currentPage={2} totalPages={5} />);
    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
  });

  it('disables "Prev" button on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} />);
    expect(screen.getByText('Prev')).toBeDisabled();
  });

  it('disables "Next" button on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} />);
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('navigates to previous page when "Prev" is clicked', () => {
    render(<Pagination currentPage={3} totalPages={5} />);
    fireEvent.click(screen.getByText('Prev'));
    expect(mockNavigate).toHaveBeenCalledWith('/movies?page=2');
  });

  it('navigates to next page when "Next" is clicked', () => {
    render(<Pagination currentPage={3} totalPages={5} />);
    fireEvent.click(screen.getByText('Next'));
    expect(mockNavigate).toHaveBeenCalledWith('/movies?page=4');
  });

  it('includes additional className if provided', () => {
    render(
      <Pagination currentPage={2} totalPages={5} className="custom-class" />
    );
    expect(screen.getByText('Page 2 of 5').parentElement).toHaveClass(
      'custom-class'
    );
  });
});
