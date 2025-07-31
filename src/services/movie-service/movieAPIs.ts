import { type LoaderFunctionArgs } from 'react-router-dom';
import type {
  LoaderData,
  MovieItem,
  MoviesGetResponse,
  ServerMovieType,
} from '../../types/types';
import { MOVIE_ENDPOINT_TYPE, options } from './constants';
import { getMovieEndpoint } from './utils/getMovieEndpoint';
import handleApiErrors from '../../helpers/handleAPIErrors';
import { LS_KEYS } from '../../constants/shared';
import getShortMovieList from '../../helpers/getShortMovieList';

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

  searchMoviesLoader: async ({
    request,
  }: LoaderFunctionArgs): Promise<LoaderData> => {
    const url = new URL(request.url);
    const searchTerm =
      url.searchParams.get('query') ||
      localStorage.getItem(LS_KEYS.INPUT_VALUE) ||
      '';
    const page = Number(url.searchParams.get('page')) || 1;
    console.log('home loader is executing');

    try {
      const { results, total_pages } = searchTerm
        ? await movieService.getMoviesList(page, searchTerm)
        : await movieService.getMoviesList(page);

      const movies = getShortMovieList(results);
      const totalPages = total_pages;
      return { movies, page, searchTerm, totalPages };
    } catch (error) {
      throw new Response(`Failed to load movies, error: ${error}`, {
        status: 500,
      });
    }
  },

  getDetailsLoader: async ({
    params,
  }: LoaderFunctionArgs): Promise<MovieItem> => {
    const { id: movieId } = params;
    if (!movieId)
      throw new Response('Movie ID is missing in route params', {
        status: 400,
      });

    const result = await handleApiErrors(
      await fetch(
        getMovieEndpoint(MOVIE_ENDPOINT_TYPE.DETAILS, { id: movieId }),
        options
      )
    );

    const data: ServerMovieType = await result.json();
    const { title, overview, poster_path, release_date, id } = data;

    const movie: MovieItem = {
      id,
      title,
      overview,
      posterPath: poster_path,
      releaseDate: release_date,
    };

    return movie;
  },
};

export default movieService;
