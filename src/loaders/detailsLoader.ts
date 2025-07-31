import type { LoaderFunctionArgs } from 'react-router-dom';
import type { MovieItem } from '../types/types';
import movieService from '../services/movie-service/movieAPIs';

export default async ({ params }: LoaderFunctionArgs): Promise<MovieItem> => {
  const { id: movieId } = params;
  if (!movieId)
    throw new Response('Movie ID is missing in route params', {
      status: 400,
    });

  const data = await movieService.getMovieDetails(movieId);

  const { title, overview, poster_path, release_date, id } = data;

  const movie: MovieItem = {
    id,
    title,
    overview,
    posterPath: poster_path,
    releaseDate: release_date,
  };

  return movie;
};
