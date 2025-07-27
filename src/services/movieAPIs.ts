import getShortMovieList from '../helpers/getShortMovieList';
import handleApiErrors from '../helpers/handleAPIErrors';
import type { MovieItem, MoviesGetResponse } from '../types';

const URL = 'https://api.themoviedb.org/3';
const API_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDA2MDdkMDJjNzYyNWNhMGFhMWMyNmEwNjMyMDY1MiIsIm5iZiI6MTc1MjA1ODc1Ny41ODYsInN1YiI6IjY4NmU0Yjg1NmQwMDdmMDY2ZDEwNDJhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YaeWD5gU1PiQBcOlqoUsX6dYHG-C6x5pW_ErVBc1CfE';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: API_TOKEN,
  },
};

const movieService = {
  getMoviesList: async (page = 1): Promise<MovieItem[]> => {
    const response = await handleApiErrors(
      await fetch(`${URL}/movie/popular?language=en-US&page=${page}`, options)
    );
    const data: MoviesGetResponse = await response.json();
    return getShortMovieList(data.results);
  },

  searchMovie: async (title: string, page = 1): Promise<MovieItem[]> => {
    const response = await handleApiErrors(
      await fetch(
        `${URL}/search/movie?query=${title}&include_adult=false&language=en-US&page=${page}`,
        options
      )
    );
    const data: MoviesGetResponse = await response.json();
    return getShortMovieList(data.results);
  },
};

export default movieService;
