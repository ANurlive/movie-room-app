import getShortMovieList from '../helpers/getShortMovieList';
import handleApiErrors from '../helpers/handleAPIErrors';

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

export const getMoviesList = async (page: number = 1) => {
  const response = await handleApiErrors(
    await fetch(URL + `/movie/popular?language=en-US&page=${page}`, options)
  );
  const results = await response.json();
  console.log(results);
  return getShortMovieList(results?.results);
};

export const searchMovie = async (title: string, page: number = 1) => {
  if (title === '') return getMoviesList();
  const response = await handleApiErrors(
    await fetch(
      URL +
        `/search/movie?query=${title}&include_adult=false&language=en-US&page=${page}`,
      options
    )
  );
  const results = await response.json();
  return getShortMovieList(results?.results);
};
