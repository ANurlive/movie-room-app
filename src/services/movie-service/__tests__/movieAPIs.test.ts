import handleApiErrors from '../../../helpers/handleAPIErrors';
import { MOVIE_ENDPOINT_TYPE } from '../constants';
import movieService from '../movieAPIs';
import { getMovieEndpoint } from '../utils/getMovieEndpoint';

jest.mock('../../../helpers/handleAPIErrors');
jest.mock('../utils/getMovieEndpoint');

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('movieService', () => {
  const mockJson = jest.fn();
  const mockResponse = { json: mockJson };

  beforeEach(() => {
    jest.clearAllMocks();
    (handleApiErrors as jest.Mock).mockResolvedValue(mockResponse);
  });

  describe('getPopularList', () => {
    it('fetches popular movies and returns correct data', async () => {
      (getMovieEndpoint as jest.Mock).mockReturnValue('https://popular-url');
      mockJson.mockResolvedValue({
        results: [{ id: 1, title: 'Popular' }],
        total_pages: 10,
      });

      const data = await movieService.getPopularList(2);

      expect(getMovieEndpoint).toHaveBeenCalledWith(
        MOVIE_ENDPOINT_TYPE.POPULAR,
        { page: 2 }
      );
      expect(fetch).toHaveBeenCalledWith(
        'https://popular-url',
        expect.anything()
      );
      expect(data).toEqual({
        results: [{ id: 1, title: 'Popular' }],
        total_pages: 10,
      });
    });
  });

  describe('getSearchList', () => {
    it('fetches search results and returns correct data', async () => {
      (getMovieEndpoint as jest.Mock).mockReturnValue('https://search-url');
      mockJson.mockResolvedValue({
        results: [{ id: 2, title: 'Search Result' }],
        total_pages: 5,
      });

      const data = await movieService.getSearchList(1, 'spider');

      expect(getMovieEndpoint).toHaveBeenCalledWith(
        MOVIE_ENDPOINT_TYPE.SEARCH,
        {
          page: 1,
          searchTerm: 'spider',
        }
      );
      expect(fetch).toHaveBeenCalledWith(
        'https://search-url',
        expect.anything()
      );
      expect(data).toEqual({
        results: [{ id: 2, title: 'Search Result' }],
        total_pages: 5,
      });
    });
  });

  describe('getMovieDetails', () => {
    it('fetches movie details and maps fields correctly', async () => {
      (getMovieEndpoint as jest.Mock).mockReturnValue('https://details-url');
      mockJson.mockResolvedValue({
        id: 3,
        title: 'Movie Title',
        overview: 'Some overview',
        poster_path: '/poster.jpg',
        release_date: '2023-01-01',
      });

      const data = await movieService.getMovieDetails('3');

      expect(getMovieEndpoint).toHaveBeenCalledWith(
        MOVIE_ENDPOINT_TYPE.DETAILS,
        { id: '3' }
      );
      expect(fetch).toHaveBeenCalledWith(
        'https://details-url',
        expect.anything()
      );
      expect(data).toEqual({
        id: 3,
        title: 'Movie Title',
        overview: 'Some overview',
        posterPath: '/poster.jpg',
        releaseDate: '2023-01-01',
      });
    });
  });
});
