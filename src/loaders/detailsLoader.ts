import type { LoaderFunctionArgs } from 'react-router-dom';
import type { MovieItem } from '../types/types';
import movieService from '../services/movie-service/movieAPIs';

export default async ({ params }: LoaderFunctionArgs): Promise<MovieItem> => {
  const { id: movieId } = params;
  if (!movieId) throw new Error('Movie ID is missing in route params');

  const data = await movieService.getMovieDetails(movieId);

  return data;
};
