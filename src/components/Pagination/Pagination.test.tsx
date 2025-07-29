import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: jest.fn(),
    useSearchParams: jest.fn(),
  };
});

const mockNavigate = jest.fn();
const mockSearchParams = new URLSearchParams({ page: '2' });

beforeEach(() => {
  (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  (useSearchParams as jest.Mock).mockReturnValue([mockSearchParams]);
  mockNavigate.mockClear();
});

const renderPagination = (currentPage: number, totalPages: number) => {
  render(
    <BrowserRouter>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageTurn={() => {}}
      />
    </BrowserRouter>
  );
};

describe('Pagination component', () => {
  it('renders current page number', () => {
    renderPagination(2, 5);
    expect(screen.getByText('Page #2')).toBeInTheDocument();
  });

  it('disables Prev button on the first page', () => {
    renderPagination(1, 5);
    const prevButton = screen.getByText('Prev') as HTMLButtonElement;
    expect(prevButton).toBeDisabled();
  });

  it('disables Next button on the last page', () => {
    renderPagination(5, 5);
    const nextButton = screen.getByText('Next') as HTMLButtonElement;
    expect(nextButton).toBeDisabled();
  });

  it('calls navigate with correct page when clicking Next', () => {
    renderPagination(2, 5);
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(mockNavigate).toHaveBeenCalledWith('/?page=3');
  });

  it('calls navigate with correct page when clicking Prev', () => {
    renderPagination(3, 5);
    const prevButton = screen.getByText('Prev');
    fireEvent.click(prevButton);
    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
  });
});
