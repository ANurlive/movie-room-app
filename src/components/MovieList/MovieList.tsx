import { Component } from 'react';
import type { MovieItem } from '../../types';
import EmptySearchResult from '../EmptySearchResult';
import MovieCard from '../MovieCard';

export type Props = {
  movieList: MovieItem[];
};

export default class MovieList extends Component<Props> {
  render() {
    const { movieList } = this.props;

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
}
