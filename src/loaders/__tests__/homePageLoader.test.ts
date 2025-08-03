import movieService from '../../services/movie-service/movieAPIs';
import type { ServerMovieType } from '../../types/types';
import homeLoader from '../homePageLoader';
import type { LoaderFunctionArgs } from 'react-router-dom';

jest.mock('../../services/movie-service/movieAPIs', () => ({
  getSearchList: jest.fn(),
  getPopularList: jest.fn(),
}));

jest.mock('../../helpers/getShortMovieList', () => ({
  __esModule: true,
  default: jest.fn((results: ServerMovieType[]) =>
    results.map(({ id, title }) => ({ id, title }))
  ),
}));

describe('homeLoader', () => {
  const mockSearchResult = {
    results: [{ id: 1, title: 'Search Movie' }],
    total_pages: 10,
  };

  const mockPopularResult = {
    results: [{ id: 2, title: 'Popular Movie' }],
    total_pages: 5,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function createMockRequest(url: string) {
    return { request: { url } } as unknown as LoaderFunctionArgs;
  }

  it('calls getSearchList if query param is present', async () => {
    (movieService.getSearchList as jest.Mock).mockResolvedValue(
      mockSearchResult
    );

    const loaderArgs = createMockRequest(
      'https://localhost/?query=test&page=2'
    );
    const result = await homeLoader(loaderArgs);

    expect(movieService.getSearchList).toHaveBeenCalledWith(2, 'test');
    expect(result).toEqual({
      movies: [{ id: 1, title: 'Search Movie' }],
      page: 2,
      totalPages: 10,
    });
  });

  it('calls getPopularList if query param is missing', async () => {
    (movieService.getPopularList as jest.Mock).mockResolvedValue(
      mockPopularResult
    );

    const loaderArgs = createMockRequest('https://localhost/');
    const result = await homeLoader(loaderArgs);

    expect(movieService.getPopularList).toHaveBeenCalledWith(1);
    expect(result).toEqual({
      movies: [{ id: 2, title: 'Popular Movie' }],
      page: 1,
      totalPages: 5,
    });
  });

  it('defaults to page 1 if page param is invalid', async () => {
    (movieService.getPopularList as jest.Mock).mockResolvedValue(
      mockPopularResult
    );

    const loaderArgs = createMockRequest('https://localhost/?page=abc');
    const result = await homeLoader(loaderArgs);

    expect(movieService.getPopularList).toHaveBeenCalledWith(1);
    expect(result.page).toBe(1);
  });
});
