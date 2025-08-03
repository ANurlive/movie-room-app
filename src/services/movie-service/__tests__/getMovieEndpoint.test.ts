import { API_URL, MOVIE_ENDPOINT_TYPE } from '../constants';
import { getMovieEndpoint } from '../utils/getMovieEndpoint';

describe('getMovieEndpoint', () => {
  it('returns correct URL for POPULAR type', () => {
    const result = getMovieEndpoint(MOVIE_ENDPOINT_TYPE.POPULAR, { page: 2 });
    expect(result).toBe(`${API_URL}/movie/popular?language=en-US&page=2`);
  });

  it('returns correct URL for SEARCH type', () => {
    const result = getMovieEndpoint(MOVIE_ENDPOINT_TYPE.SEARCH, {
      page: 1,
      searchTerm: 'batman',
    });
    expect(result).toBe(
      `${API_URL}/search/movie?query=batman&include_adult=false&language=en-US&page=1`
    );
  });

  it('returns correct URL for DETAILS type', () => {
    const result = getMovieEndpoint(MOVIE_ENDPOINT_TYPE.DETAILS, {
      id: '12345',
    });
    expect(result).toBe(`${API_URL}/movie/12345?language=en-US`);
  });
});
