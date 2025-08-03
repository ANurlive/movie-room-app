import { render, screen, fireEvent } from '@testing-library/react';
import Flyout from './Flyout';
import { useSelector, useDispatch } from 'react-redux';
import { saveAs } from 'file-saver';
import { messages } from './messages';
import { unselectAll } from '../../store/selectedCards/reducer';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

describe('Flyout', () => {
  const mockDispatch = jest.fn();

  const mockCards = {
    '1': {
      id: '1',
      title: 'Movie 1',
      overview: 'Overview 1',
      releaseDate: '2024-01-01',
    },
    '2': {
      id: '2',
      title: 'Movie 2',
      overview: 'Overview 2',
      releaseDate: '2024-02-01',
    },
  };
  const mockedUseDispatch = useDispatch as unknown as jest.Mock;
  const mockedUseSelector = useSelector as unknown as jest.Mock;
  const mockedSaveAs = saveAs as unknown as jest.Mock;

  beforeEach(() => {
    mockedUseSelector.mockReset();
    mockedUseDispatch.mockReturnValue(mockDispatch);
    mockDispatch.mockReset();
    mockedSaveAs.mockReset();
  });

  it('does not render if no selected cards', () => {
    mockedUseSelector.mockReturnValue({});
    const { container } = render(<Flyout />);
    expect(container.firstChild).toBeNull();
  });

  it('renders if there are selected cards', () => {
    mockedUseSelector.mockReturnValue(mockCards);
    render(<Flyout />);
    expect(screen.getByText(/2 item\(s\) selected/i)).toBeInTheDocument();
    expect(screen.getByText(messages.UNSELECT_BUTTON)).toBeInTheDocument();
    expect(screen.getByText(messages.DOWNLOAD_BUTTON)).toBeInTheDocument();
  });

  it('dispatches unselectAll when Unselect button clicked', () => {
    mockedUseSelector.mockReturnValue(mockCards);
    render(<Flyout />);

    fireEvent.click(screen.getByText(messages.UNSELECT_BUTTON));
    expect(mockDispatch).toHaveBeenCalledWith(unselectAll());
  });

  it('calls saveAs when Download button clicked', async () => {
    mockedUseSelector.mockReturnValue(mockCards);
    render(<Flyout />);

    fireEvent.click(screen.getByText(messages.DOWNLOAD_BUTTON));

    expect(saveAs).toHaveBeenCalledTimes(1);
  });
});
