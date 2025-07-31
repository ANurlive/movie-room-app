import type { MoviesGetResponse, ServerMovieType } from '../../types/types';
import { MOVIE_ENDPOINT_TYPE, options } from './constants';
import { getMovieEndpoint } from './utils/getMovieEndpoint';
import handleApiErrors from '../../helpers/handleAPIErrors';

const movieService = {
  getMoviesList: async (
    page: number,
    searchTerm?: string
  ): Promise<Pick<MoviesGetResponse, 'results' | 'total_pages'>> => {
    const url = searchTerm
      ? getMovieEndpoint(MOVIE_ENDPOINT_TYPE.SEARCH, { page, searchTerm })
      : getMovieEndpoint(MOVIE_ENDPOINT_TYPE.POPULAR, { page });

    const response = await handleApiErrors(await fetch(url, options));
    const { results, total_pages }: MoviesGetResponse = await response.json();
    return {
      results,
      total_pages,
    };
  },

  getMovieDetails: async (id: string): Promise<ServerMovieType> => {
    const result = await handleApiErrors(
      await fetch(
        getMovieEndpoint(MOVIE_ENDPOINT_TYPE.DETAILS, { id }),
        options
      )
    );
    return await result.json();
  },
};

export default movieService;
