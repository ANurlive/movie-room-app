import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '../useLocalStorage';
import { LS_KEYS } from '../../../constants/shared';
import { useNavigate, useSearchParams } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('useLocalStorage', () => {
  const mockNavigate = jest.fn();
  const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
  const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('returns initial input value from localStorage', () => {
    getItemSpy.mockReturnValueOnce('test input');
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams('')]);

    const { result } = renderHook(() => useLocalStorage());

    expect(result.current.inputValue).toBe('test input');
  });

  it('updates inputValue with setInputValue', () => {
    getItemSpy.mockReturnValueOnce('');
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams('')]);

    const { result } = renderHook(() => useLocalStorage());

    act(() => {
      result.current.setInputValue('new value');
    });

    expect(result.current.inputValue).toBe('new value');
  });

  it('does not call navigate if query param exists', () => {
    getItemSpy.mockReturnValueOnce('savedValue');
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('query=existing'),
    ]);

    renderHook(() => useLocalStorage());

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('saves trimmed value to localStorage with saveValueToLS', () => {
    getItemSpy.mockReturnValueOnce('');
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams('')]);

    const { result } = renderHook(() => useLocalStorage());

    act(() => {
      result.current.saveValueToLS('  some text  ');
    });

    expect(setItemSpy).toHaveBeenCalledWith(LS_KEYS.INPUT_VALUE, 'some text');
  });
});
