import { API_URL, MOVIE_ENDPOINT_TYPE } from '../constants';

export const getMovieEndpoint = (
  type: MOVIE_ENDPOINT_TYPE,
  params: { page?: number; searchTerm?: string; id?: string }
) => {
  const origin = API_URL;
  const { page, searchTerm, id } = params;
  let path: string;

  switch (type) {
    case MOVIE_ENDPOINT_TYPE.POPULAR:
      path = `/movie/popular?language=en-US&page=${page}`;
      break;
    case MOVIE_ENDPOINT_TYPE.SEARCH:
      path = `/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=${page}`;
      break;
    case MOVIE_ENDPOINT_TYPE.DETAILS:
      path = `/movie/${id}?language=en-US`;
  }
  return `${origin}${path}`;
};
