import type { MovieItem } from '../../types';
import EmptySearchResult from '../EmptySearchResult';
import MovieCard from '../MovieCard';

export type Props = {
  movieList: MovieItem[];
};

export default function MovieList({ movieList }: Props) {
  if (movieList.length === 0) {
    return <EmptySearchResult />;
  }
  return (
    <ul className="flex flex-col gap-4 mb-6">
      {movieList &&
        movieList.map(({ id, ...rest }) => {
          return (
            <li key={id}>
              <MovieCard {...rest} />
            </li>
          );
        })}
    </ul>
  );
}
