import type {
  getDetailsResponse,
  MovieItem,
  MoviesGetResponse,
} from '../../types/types';
import { MOVIE_ENDPOINT_TYPE, options } from './constants';
import { getMovieEndpoint } from './utils/getMovieEndpoint';
import handleApiErrors from '../../helpers/handleAPIErrors';

const movieService = {
  getPopularList: async (
    page: number
  ): Promise<Pick<MoviesGetResponse, 'results' | 'total_pages'>> => {
    const url = getMovieEndpoint(MOVIE_ENDPOINT_TYPE.POPULAR, { page });
    const response = await handleApiErrors(await fetch(url, options));
    const { results, total_pages }: MoviesGetResponse = await response.json();
    return {
      results,
      total_pages,
    };
  },

  getSearchList: async (
    page: number,
    searchTerm: string
  ): Promise<Pick<MoviesGetResponse, 'results' | 'total_pages'>> => {
    const url = getMovieEndpoint(MOVIE_ENDPOINT_TYPE.SEARCH, {
      page,
      searchTerm,
    });
    const response = await handleApiErrors(await fetch(url, options));
    const { results, total_pages }: MoviesGetResponse = await response.json();
    return {
      results,
      total_pages,
    };
  },

  getMovieDetails: async (movieId: string): Promise<MovieItem> => {
    const result = await handleApiErrors(
      await fetch(
        getMovieEndpoint(MOVIE_ENDPOINT_TYPE.DETAILS, { id: movieId }),
        options
      )
    );
    const { id, title, overview, poster_path, release_date } =
      (await result.json()) as getDetailsResponse;
    return {
      id,
      title,
      overview,
      posterPath: poster_path,
      releaseDate: release_date,
    };
  },
};

export default movieService;
