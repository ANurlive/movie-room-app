import movieService from './movieAPIs';
import handleApiErrors from '../helpers/handleAPIErrors';
import getShortMovieList from '../helpers/getShortMovieList';
import type { MovieItem } from '../types/types';

global.fetch = jest.fn();
jest.mock('../helpers/handleAPIErrors');
jest.mock('../helpers/getShortMovieList');

const mockedHandleApiErrors = handleApiErrors as jest.Mock;
const mockedGetShortMovieList = getShortMovieList as jest.Mock;

afterAll(() => {
  jest.clearAllMocks();
});

describe('movieService', () => {
  const fakeJson = jest.fn();
  const fakeResponse = {
    json: fakeJson,
  };

  test('getMoviesList fetches movies and returns shortened list', async () => {
    const mockRawData = { results: [{ id: 1, title: 'Movie A' }] };
    const mockShortList: MovieItem[] = [
      {
        id: 1,
        title: 'Short Movie A',
        overview: '',
        posterPath: '',
        releaseDate: '',
      },
    ];

    fakeJson.mockResolvedValue(mockRawData);
    mockedHandleApiErrors.mockResolvedValue(fakeResponse);
    mockedGetShortMovieList.mockReturnValue(mockShortList);

    const result = await movieService.getMoviesList(1);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/movie/popular?language=en-US&page=1'),
      expect.any(Object)
    );

    expect(handleApiErrors).toHaveBeenCalled();
    expect(getShortMovieList).toHaveBeenCalledWith(mockRawData.results);
    expect(result).toEqual(mockShortList);
  });

  test('searchMovie fetches search results and returns shortened list', async () => {
    const mockRawData = { results: [{ id: 2, title: 'Movie B' }] };
    const mockShortList: MovieItem[] = [
      {
        id: 2,
        title: 'Short Movie B',
        overview: '',
        posterPath: '',
        releaseDate: '',
      },
    ];

    fakeJson.mockResolvedValue(mockRawData);
    mockedHandleApiErrors.mockResolvedValue(fakeResponse);
    mockedGetShortMovieList.mockReturnValue(mockShortList);

    const result = await movieService.searchMovie('test', 2);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/search/movie?query=test'),
      expect.any(Object)
    );

    expect(handleApiErrors).toHaveBeenCalled();
    expect(getShortMovieList).toHaveBeenCalledWith(mockRawData.results);
    expect(result).toEqual(mockShortList);
  });
});
