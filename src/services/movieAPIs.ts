import { type LoaderFunctionArgs, defer } from 'react-router-dom';
import getShortMovieList from '../helpers/getShortMovieList';
import handleApiErrors from '../helpers/handleAPIErrors';
import type { LoaderData, MoviesGetResponse, ServerMovieType } from '../types';
import { LS_KEYS } from '../constants';

const API_URL = 'https://api.themoviedb.org/3';
const API_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDA2MDdkMDJjNzYyNWNhMGFhMWMyNmEwNjMyMDY1MiIsIm5iZiI6MTc1MjA1ODc1Ny41ODYsInN1YiI6IjY4NmU0Yjg1NmQwMDdmMDY2ZDEwNDJhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YaeWD5gU1PiQBcOlqoUsX6dYHG-C6x5pW_ErVBc1CfE';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: API_TOKEN,
  },
};

const getEndpoint = (
  type: 'search' | 'popular' | 'details',
  params: { page?: number; searchTerm?: string; id?: string }
) => {
  const { page, searchTerm, id } = params;
  let path: string;

  switch (type) {
    case 'popular':
      path = `/movie/popular?language=en-US&page=${page}`;
      break;
    case 'search':
      path = `/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=${page}`;
      break;
    case 'details':
      path = `/movie/${id}?language=en-US`;
  }
  return path;
};

const movieService = {
  getMoviesList: async (
    page: number,
    searchTerm?: string
  ): Promise<Partial<MoviesGetResponse>> => {
    const finalURL = `${API_URL}${searchTerm ? getEndpoint('search', { page, searchTerm }) : getEndpoint('popular', { page })}`;
    const response = await handleApiErrors(await fetch(finalURL, options));
    const data: MoviesGetResponse = await response.json();
    return {
      results: data.results,
      total_pages: data.total_pages,
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

    try {
      const { results, total_pages } = searchTerm
        ? await movieService.getMoviesList(page, searchTerm)
        : await movieService.getMoviesList(page);

      const movies = getShortMovieList(results as ServerMovieType[]);
      const totalPages = total_pages as number;
      return { movies, page, searchTerm, totalPages };
    } catch (error) {
      throw new Response(`Failed to load movies, error: ${error}`, {
        status: 500,
      });
    }
  },

  getDetailsLoader: async ({ params }: LoaderFunctionArgs) => {
    const { id } = params;
    if (!id)
      throw new Response('Movie ID is missing in route params', {
        status: 400,
      });

    const result = await handleApiErrors(
      await fetch(`${API_URL}${getEndpoint('details', { id })}`, options)
    );

    const data = await result.json();
    const { title, overview, poster_path, release_date } = data;

    const movie = {
      id,
      title,
      overview,
      posterPath: poster_path,
      releaseDate: release_date,
    };
    console.log(movie);
    return defer({ movie });
  },
};

export default movieService;
