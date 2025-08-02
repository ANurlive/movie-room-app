import type { MovieItem } from '../../types/types';
import EmptySearchResult from '../EmptySearchResult';
import MovieCard from '../MovieCard';

export type Props = {
  movieList: MovieItem[];
  compactCards?: boolean;
};

export default function MovieList({ movieList, compactCards = false }: Props) {
  if (movieList.length === 0) {
    return <EmptySearchResult />;
  }
  return (
    <ul className="mb-6 flex flex-col gap-4">
      {movieList &&
        movieList.map((movie) => {
          return (
            <li key={movie.id}>
              <MovieCard movie={movie} compact={compactCards} />
            </li>
          );
        })}
    </ul>
  );
}
